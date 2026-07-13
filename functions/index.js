const { initializeApp } = require("firebase-admin/app");
const {
  FieldValue,
  Timestamp,
  getFirestore
} = require("firebase-admin/firestore");
const { HttpsError, onCall } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

initializeApp();

const db = getFirestore();

const REGION = "europe-west1";
const DEFAULT_TIMEZONE = "UTC";
const MAX_STREAK_FREEZES = 2;
const WORDS_PER_LEVEL = 5;
const MAX_SESSION_XP = 500;
const SEARCH_RESULTS_LIMIT = 10;
const MIN_SEARCH_LENGTH = 2;
const HANDLE_PATTERN = /^[a-z0-9_]{3,20}$/;
const COURSE_LEVEL_CAPS = {
  chinese: 60,
  german: 60,
  italian: 60,
  japanese: 60,
  norwegian: 60,
  spanish: 60,
  swedish: 60
};
const CALLABLE_OPTIONS = {
  region: REGION,
  cors: true,
  invoker: "public"
};

exports.ensureUserProfile = onCall(CALLABLE_OPTIONS, async request => {
  const auth = requireAuth(request);
  const timezone = normalizeTimezone(request.data?.timezone);
  const authProfile = getAuthProfile(auth);

  const result = await db.runTransaction(async transaction => {
    const userRef = db.doc(`users/${auth.uid}`);
    const publicRef = db.doc(`publicProfiles/${auth.uid}`);
    const userSnap = await transaction.get(userRef);

    const baseProfile = buildDefaultUserProfile(auth.uid, authProfile, timezone);
    const now = FieldValue.serverTimestamp();

    const userProfile = userSnap.exists
      ? { ...baseProfile, ...userSnap.data(), email: userSnap.data().email || authProfile.email, timezone }
      : baseProfile;

    if (!userSnap.exists) {
      transaction.set(userRef, {
        ...userProfile,
        createdAt: now,
        updatedAt: now,
        lastActiveAt: now
      });
    } else {
      transaction.set(userRef, {
        email: userProfile.email,
        timezone,
        updatedAt: now,
        lastActiveAt: now
      }, { merge: true });
    }

    const publicProfile = buildPublicProfile(
      auth.uid,
      userProfile,
      authProfile
    );

    transaction.set(publicRef, {
      ...publicProfile,
      updatedAt: now
    }, { merge: true });

    return {
      user: sanitizeUserProfile(userProfile),
      publicProfile
    };
  });

  return result;
});

exports.setUserHandle = onCall(CALLABLE_OPTIONS, async request => {
  const auth = requireAuth(request);
  const handle = normalizeHandle(request.data?.handle);

  const result = await db.runTransaction(async transaction => {
    const userRef = db.doc(`users/${auth.uid}`);
    const publicRef = db.doc(`publicProfiles/${auth.uid}`);
    const usernameRef = db.doc(`usernames/${handle}`);
    const userSnap = await transaction.get(userRef);
    const usernameSnap = await transaction.get(usernameRef);

    if (usernameSnap.exists && usernameSnap.data().uid !== auth.uid) {
      throw new HttpsError("already-exists", "This handle is already taken.");
    }

    const previousHandle = userSnap.exists ? userSnap.data().handle : null;
    const previousHandleRef =
      previousHandle && previousHandle !== handle
        ? db.doc(`usernames/${previousHandle}`)
        : null;

    if (previousHandleRef) {
      transaction.delete(previousHandleRef);
    }

    transaction.set(usernameRef, {
      uid: auth.uid,
      handle,
      updatedAt: FieldValue.serverTimestamp()
    });

    transaction.set(userRef, {
      handle,
      updatedAt: FieldValue.serverTimestamp()
    }, { merge: true });

    transaction.set(publicRef, {
      handle,
      updatedAt: FieldValue.serverTimestamp()
    }, { merge: true });

    return { handle };
  });

  return result;
});

exports.completePracticeSession = onCall(CALLABLE_OPTIONS, async request => {
  const auth = requireAuth(request);
  const session = normalizeSessionPayload(request.data);
  const xpEarned = calculateSessionXp(session);

  if (xpEarned <= 0) {
    throw new HttpsError(
      "failed-precondition",
      "A session needs at least one correct answer to update progress."
    );
  }

  const result = await db.runTransaction(async transaction => {
    const userRef = db.doc(`users/${auth.uid}`);
    const courseRef = userRef.collection("courses").doc(session.courseId);
    const publicRef = db.doc(`publicProfiles/${auth.uid}`);

    const userSnap = await transaction.get(userRef);
    const courseSnap = await transaction.get(courseRef);

    const authProfile = getAuthProfile(auth);
    const existingUser = userSnap.exists ? userSnap.data() : null;
    const timezone = normalizeTimezone(session.timezone || existingUser?.timezone);
    const todayKey = getDateKeyForTimezone(new Date(), timezone);
    const previousTotalXp = existingUser?.totalXp || 0;
    const existingCourse = existingUser?.courses?.[session.courseId] || null;
    const previousCourseXp = courseSnap.exists
      ? courseSnap.data().xp || 0
      : existingCourse?.xp || 0;

    const totalXp = previousTotalXp + xpEarned;
    const courseXp = previousCourseXp + xpEarned;
    const globalLevel = getLevelInfo(totalXp).level;
    const courseLevel = getCourseLevel(session.courseId, courseXp);
    const streak = calculateStreakUpdate({
      currentStreak: existingUser?.currentStreak || 0,
      longestStreak: existingUser?.longestStreak || 0,
      lastPracticeDate: existingUser?.lastPracticeDate || null,
      streakFreezes: existingUser?.streakFreezes || 0,
      todayKey
    });

    const now = FieldValue.serverTimestamp();
    const userData = {
      ...buildDefaultUserProfile(auth.uid, authProfile, timezone),
      ...existingUser,
      displayName: existingUser?.displayName || authProfile.displayName,
      avatarUrl: existingUser?.avatarUrl || authProfile.avatarUrl,
      email: existingUser?.email || authProfile.email,
      timezone,
      totalXp,
      globalLevel,
      currentStreak: streak.currentStreak,
      longestStreak: streak.longestStreak,
      lastPracticeDate: todayKey,
      streakFreezes: streak.streakFreezes,
      maxStreakFreezes: existingUser?.maxStreakFreezes || MAX_STREAK_FREEZES,
      updatedAt: now,
      lastActiveAt: now
    };

    const previousCourseLevel = courseSnap.exists
      ? courseSnap.data().level || 1
      : existingCourse?.level || 1;
    const courseData = {
      courseId: session.courseId,
      xp: courseXp,
      level: courseLevel,
      unlockedLevel: courseLevel,
      wordsUnlocked: courseLevel * WORDS_PER_LEVEL,
      wordsMastered: courseSnap.exists ? courseSnap.data().wordsMastered || 0 : 0,
      lastPlayedAt: now,
      updatedAt: now
    };
    const courseResponse = {
      courseId: session.courseId,
      xp: courseXp,
      level: courseLevel,
      unlockedLevel: courseLevel,
      wordsUnlocked: courseData.wordsUnlocked,
      wordsMastered: courseData.wordsMastered
    };
    const coursesSummary = {
      ...(existingUser?.courses || {}),
      [session.courseId]: {
        ...courseResponse,
        updatedAt: Timestamp.now()
      }
    };

    userData.courses = coursesSummary;

    if (!userSnap.exists) {
      userData.createdAt = now;
    }

    if (!courseSnap.exists) {
      courseData.createdAt = now;
    }

    transaction.set(userRef, userData, { merge: true });
    transaction.set(courseRef, courseData, { merge: true });
    transaction.set(publicRef, {
      ...buildPublicProfile(auth.uid, userData, authProfile),
      updatedAt: now
    }, { merge: true });

    const dailyRef = userRef.collection("dailyStats").doc(todayKey);
    transaction.set(dailyRef, {
      date: todayKey,
      timezone,
      practiced: true,
      xp: FieldValue.increment(xpEarned),
      sessions: FieldValue.increment(1),
      correctAnswers: FieldValue.increment(session.correctAnswers),
      wrongAnswers: FieldValue.increment(session.wrongAnswers),
      freezeUsed: FieldValue.increment(streak.freezeUsed),
      updatedAt: now,
      createdAt: now
    }, { merge: true });

    const shouldPublishActivity =
      courseLevel > previousCourseLevel ||
      streak.currentStreak > 0 && streak.currentStreak % 7 === 0 ||
      xpEarned >= 100;

    if (shouldPublishActivity) {
      const activityRef = db.collection("activities").doc();
      transaction.set(activityRef, {
        uid: auth.uid,
        type: courseLevel > previousCourseLevel ? "level_up" : "practice_session",
        courseId: session.courseId,
        xp: xpEarned,
        totalXp,
        courseLevel,
        streak: streak.currentStreak,
        visibility: "friends",
        createdAt: now
      });
    }

    return {
      xpEarned,
      totalXp,
      globalLevel,
      course: courseResponse,
      streak,
      unlockedWords: courseData.wordsUnlocked
    };
  });

  logger.info("Practice session completed", {
    uid: auth.uid,
    courseId: session.courseId,
    correctAnswers: session.correctAnswers,
    wrongAnswers: session.wrongAnswers
  });

  return result;
});

exports.grantStreakFreeze = onCall(CALLABLE_OPTIONS, async request => {
  const auth = requireAuth(request);

  const result = await db.runTransaction(async transaction => {
    const userRef = db.doc(`users/${auth.uid}`);
    const userSnap = await transaction.get(userRef);
    const user = userSnap.exists ? userSnap.data() : {};
    const maxStreakFreezes = user.maxStreakFreezes || MAX_STREAK_FREEZES;
    const current = user.streakFreezes || 0;
    const next = Math.min(maxStreakFreezes, current + 1);

    transaction.set(userRef, {
      streakFreezes: next,
      maxStreakFreezes,
      updatedAt: FieldValue.serverTimestamp()
    }, { merge: true });

    return {
      streakFreezes: next,
      maxStreakFreezes,
      granted: next > current
    };
  });

  return result;
});

exports.sendFriendRequest = onCall(CALLABLE_OPTIONS, async request => {
  const auth = requireAuth(request);
  const toUid = normalizeUid(request.data?.toUid);

  if (toUid === auth.uid) {
    throw new HttpsError("invalid-argument", "You cannot add yourself as a friend.");
  }

  const result = await db.runTransaction(async transaction => {
    const requestRef = db.doc(`friendRequests/${getFriendPairId(auth.uid, toUid)}`);
    const fromPublicRef = db.doc(`publicProfiles/${auth.uid}`);
    const toPublicRef = db.doc(`publicProfiles/${toUid}`);

    const requestSnap = await transaction.get(requestRef);
    const fromPublicSnap = await transaction.get(fromPublicRef);
    const toPublicSnap = await transaction.get(toPublicRef);

    if (!toPublicSnap.exists) {
      throw new HttpsError("not-found", "User not found.");
    }

    if (requestSnap.exists) {
      const status = requestSnap.data().status;
      if (status === "pending") {
        throw new HttpsError("already-exists", "A friend request already exists.");
      }
      if (status === "accepted") {
        throw new HttpsError("already-exists", "You are already friends.");
      }
    }

    const requestData = {
      fromUid: auth.uid,
      toUid,
      status: "pending",
      fromProfile: fromPublicSnap.exists ? pickFriendProfile(fromPublicSnap.data()) : null,
      toProfile: pickFriendProfile(toPublicSnap.data()),
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
      respondedAt: null
    };

    transaction.set(requestRef, requestData);

    return {
      requestId: requestRef.id,
      status: "pending"
    };
  });

  return result;
});

exports.respondFriendRequest = onCall(CALLABLE_OPTIONS, async request => {
  const auth = requireAuth(request);
  const requestId = cleanRequiredString(request.data?.requestId, "requestId");
  const accept = Boolean(request.data?.accept);

  const result = await db.runTransaction(async transaction => {
    const requestRef = db.doc(`friendRequests/${requestId}`);
    const requestSnap = await transaction.get(requestRef);

    if (!requestSnap.exists) {
      throw new HttpsError("not-found", "Friend request not found.");
    }

    const friendRequest = requestSnap.data();

    if (friendRequest.toUid !== auth.uid) {
      throw new HttpsError("permission-denied", "Only the recipient can respond.");
    }

    if (friendRequest.status !== "pending") {
      throw new HttpsError("failed-precondition", "This request is no longer pending.");
    }

    const fromPublicRef = db.doc(`publicProfiles/${friendRequest.fromUid}`);
    const toPublicRef = db.doc(`publicProfiles/${friendRequest.toUid}`);
    const fromPublicSnap = await transaction.get(fromPublicRef);
    const toPublicSnap = await transaction.get(toPublicRef);

    const nextStatus = accept ? "accepted" : "declined";
    const now = FieldValue.serverTimestamp();

    transaction.update(requestRef, {
      status: nextStatus,
      respondedAt: now,
      updatedAt: now
    });

    if (accept) {
      const fromFriendRef = db.doc(`users/${friendRequest.fromUid}/friends/${friendRequest.toUid}`);
      const toFriendRef = db.doc(`users/${friendRequest.toUid}/friends/${friendRequest.fromUid}`);

      transaction.set(fromFriendRef, {
        friendUid: friendRequest.toUid,
        profile: toPublicSnap.exists ? pickFriendProfile(toPublicSnap.data()) : null,
        since: now
      });

      transaction.set(toFriendRef, {
        friendUid: friendRequest.fromUid,
        profile: fromPublicSnap.exists ? pickFriendProfile(fromPublicSnap.data()) : null,
        since: now
      });

      transaction.set(db.doc(`users/${friendRequest.fromUid}`), {
        friendCount: FieldValue.increment(1),
        updatedAt: now
      }, { merge: true });

      transaction.set(db.doc(`users/${friendRequest.toUid}`), {
        friendCount: FieldValue.increment(1),
        updatedAt: now
      }, { merge: true });
    }

    return {
      requestId,
      status: nextStatus
    };
  });

  return result;
});

exports.removeFriend = onCall(CALLABLE_OPTIONS, async request => {
  const auth = requireAuth(request);
  const friendUid = normalizeUid(request.data?.friendUid);

  if (friendUid === auth.uid) {
    throw new HttpsError("invalid-argument", "Invalid friend UID.");
  }

  await db.runTransaction(async transaction => {
    const ownFriendRef = db.doc(`users/${auth.uid}/friends/${friendUid}`);
    const otherFriendRef = db.doc(`users/${friendUid}/friends/${auth.uid}`);
    const ownFriendSnap = await transaction.get(ownFriendRef);
    const otherFriendSnap = await transaction.get(otherFriendRef);
    const now = FieldValue.serverTimestamp();

    if (ownFriendSnap.exists) {
      transaction.delete(ownFriendRef);
      transaction.set(db.doc(`users/${auth.uid}`), {
        friendCount: FieldValue.increment(-1),
        updatedAt: now
      }, { merge: true });
    }

    if (otherFriendSnap.exists) {
      transaction.delete(otherFriendRef);
      transaction.set(db.doc(`users/${friendUid}`), {
        friendCount: FieldValue.increment(-1),
        updatedAt: now
      }, { merge: true });
    }
  });

  return {
    friendUid,
    removed: true
  };
});

exports.searchUsers = onCall(CALLABLE_OPTIONS, async request => {
  const auth = requireAuth(request);
  const query = normalizeSearchQuery(request.data?.query);

  if (query.length < MIN_SEARCH_LENGTH) {
    return { results: [] };
  }

  const usernameSnap = await db.collection("usernames")
    .orderBy("handle")
    .startAt(query)
    .endAt(`${query}`)
    .limit(SEARCH_RESULTS_LIMIT)
    .get();

  const candidateUids = usernameSnap.docs
    .map(doc => doc.data().uid)
    .filter(uid => uid && uid !== auth.uid);

  if (!candidateUids.length) {
    return { results: [] };
  }

  const results = await Promise.all(
    candidateUids.map(uid => buildSearchResult(auth.uid, uid))
  );

  return { results: results.filter(Boolean) };
});

exports.getSocialOverview = onCall(CALLABLE_OPTIONS, async request => {
  const auth = requireAuth(request);

  const [selfSnap, friendsSnap, incomingSnap, outgoingSnap] = await Promise.all([
    db.doc(`publicProfiles/${auth.uid}`).get(),
    db.collection(`users/${auth.uid}/friends`).get(),
    db.collection("friendRequests").where("toUid", "==", auth.uid).get(),
    db.collection("friendRequests").where("fromUid", "==", auth.uid).get()
  ]);

  const friendUids = friendsSnap.docs.map(doc => doc.id);
  const friendProfileSnaps = friendUids.length
    ? await db.getAll(...friendUids.map(uid => db.doc(`publicProfiles/${uid}`)))
    : [];

  const leaderboardEntries = [];

  if (selfSnap.exists) {
    leaderboardEntries.push({ ...pickFriendProfile(selfSnap.data()), isSelf: true });
  }

  friendProfileSnaps.forEach(snap => {
    if (snap.exists) {
      leaderboardEntries.push({ ...pickFriendProfile(snap.data()), isSelf: false });
    }
  });

  leaderboardEntries.sort((a, b) => (b.totalXp || 0) - (a.totalXp || 0));
  const leaderboard = leaderboardEntries.map((entry, index) => ({ ...entry, rank: index + 1 }));

  const incomingRequests = incomingSnap.docs
    .filter(doc => doc.data().status === "pending")
    .map(doc => ({
      requestId: doc.id,
      fromUid: doc.data().fromUid,
      profile: doc.data().fromProfile || null,
      createdAt: toMillis(doc.data().createdAt)
    }));

  const outgoingRequests = outgoingSnap.docs
    .filter(doc => doc.data().status === "pending")
    .map(doc => ({
      requestId: doc.id,
      toUid: doc.data().toUid,
      profile: doc.data().toProfile || null,
      createdAt: toMillis(doc.data().createdAt)
    }));

  return {
    leaderboard,
    incomingRequests,
    outgoingRequests,
    friendCount: friendUids.length
  };
});

async function buildSearchResult(myUid, uid) {
  const [publicSnap, friendSnap, requestSnap] = await Promise.all([
    db.doc(`publicProfiles/${uid}`).get(),
    db.doc(`users/${myUid}/friends/${uid}`).get(),
    db.doc(`friendRequests/${getFriendPairId(myUid, uid)}`).get()
  ]);

  if (!publicSnap.exists) return null;

  let relationship = "none";
  let requestId = null;

  if (friendSnap.exists) {
    relationship = "friends";
  } else if (requestSnap.exists && requestSnap.data().status === "pending") {
    requestId = requestSnap.id;
    relationship = requestSnap.data().fromUid === myUid ? "pending_outgoing" : "pending_incoming";
  }

  return { ...pickFriendProfile(publicSnap.data()), relationship, requestId };
}

function toMillis(timestamp) {
  return timestamp && typeof timestamp.toMillis === "function" ? timestamp.toMillis() : null;
}

function normalizeSearchQuery(value) {
  return cleanOptionalString(value).toLowerCase().replace(/^@+/, "").slice(0, 20);
}

function requireAuth(request) {
  if (!request.auth?.uid) {
    throw new HttpsError("unauthenticated", "Sign in before calling this function.");
  }

  return request.auth;
}

function getAuthProfile(auth) {
  return {
    displayName: cleanOptionalString(auth.token.name) || "Polytype Learner",
    avatarUrl: cleanOptionalString(auth.token.picture) || null,
    email: cleanOptionalString(auth.token.email) || null
  };
}

function buildDefaultUserProfile(uid, authProfile, timezone) {
  return {
    uid,
    handle: null,
    displayName: authProfile.displayName,
    avatarUrl: authProfile.avatarUrl,
    email: authProfile.email,
    timezone,
    totalXp: 0,
    globalLevel: 1,
    currentStreak: 0,
    longestStreak: 0,
    lastPracticeDate: null,
    streakFreezes: 0,
    maxStreakFreezes: MAX_STREAK_FREEZES,
    friendCount: 0,
    courses: {}
  };
}

function buildPublicProfile(uid, user, authProfile) {
  return {
    uid,
    handle: user.handle || null,
    displayName: user.displayName || authProfile.displayName,
    avatarUrl: user.avatarUrl || authProfile.avatarUrl || null,
    totalXp: user.totalXp || 0,
    globalLevel: user.globalLevel || 1,
    currentStreak: user.currentStreak || 0,
    friendCount: user.friendCount || 0
  };
}

function sanitizeUserProfile(user) {
  return {
    uid: user.uid,
    handle: user.handle || null,
    displayName: user.displayName || "Polytype Learner",
    avatarUrl: user.avatarUrl || null,
    timezone: user.timezone || DEFAULT_TIMEZONE,
    totalXp: user.totalXp || 0,
    globalLevel: user.globalLevel || 1,
    currentStreak: user.currentStreak || 0,
    longestStreak: user.longestStreak || 0,
    lastPracticeDate: user.lastPracticeDate || null,
    streakFreezes: user.streakFreezes || 0,
    maxStreakFreezes: user.maxStreakFreezes || MAX_STREAK_FREEZES,
    friendCount: user.friendCount || 0,
    courses: sanitizeCoursesSummary(user.courses)
  };
}

function sanitizeCoursesSummary(courses) {
  if (!courses || typeof courses !== "object") return {};

  return Object.fromEntries(
    Object.entries(courses).map(([courseId, course]) => [
      courseId,
      {
        courseId: course.courseId || courseId,
        xp: course.xp || 0,
        level: course.level || 1,
        unlockedLevel: course.unlockedLevel || course.level || 1,
        wordsUnlocked: course.wordsUnlocked || WORDS_PER_LEVEL
      }
    ])
  );
}

function normalizeSessionPayload(data = {}) {
  return {
    courseId: normalizeCourseId(data.courseId),
    timezone: cleanOptionalString(data.timezone),
    correctAnswers: clampInteger(data.correctAnswers, 0, 1000),
    wrongAnswers: clampInteger(data.wrongAnswers, 0, 1000),
    bestCombo: clampInteger(data.bestCombo, 0, 1000),
    wordsUsed: clampInteger(data.wordsUsed, 0, 1000),
    sessionSeconds: clampInteger(data.sessionSeconds, 0, 86400)
  };
}

function calculateSessionXp(session) {
  const answered = session.correctAnswers + session.wrongAnswers;
  if (answered === 0 || session.correctAnswers === 0) return 0;

  const accuracy = session.correctAnswers / answered;
  const baseXp = session.correctAnswers * 10;
  const comboBonus = Math.min(session.bestCombo, 20) * 2;
  const accuracyBonus = session.correctAnswers >= 10 && accuracy >= 0.9 ? 25 : 0;
  const perfectBonus = session.correctAnswers >= 20 && accuracy === 1 ? 50 : 0;

  return Math.min(MAX_SESSION_XP, baseXp + comboBonus + accuracyBonus + perfectBonus);
}

function calculateStreakUpdate({
  currentStreak,
  longestStreak,
  lastPracticeDate,
  streakFreezes,
  todayKey
}) {
  if (!lastPracticeDate) {
    return {
      currentStreak: 1,
      longestStreak: Math.max(longestStreak, 1),
      lastPracticeDate: todayKey,
      streakFreezes,
      freezeUsed: 0,
      streakAdvanced: true,
      streakReset: false
    };
  }

  const elapsedDays = diffDateKeys(lastPracticeDate, todayKey);

  if (elapsedDays <= 0) {
    return {
      currentStreak,
      longestStreak,
      lastPracticeDate,
      streakFreezes,
      freezeUsed: 0,
      streakAdvanced: false,
      streakReset: false
    };
  }

  if (elapsedDays === 1) {
    const nextStreak = currentStreak + 1;
    return {
      currentStreak: nextStreak,
      longestStreak: Math.max(longestStreak, nextStreak),
      lastPracticeDate: todayKey,
      streakFreezes,
      freezeUsed: 0,
      streakAdvanced: true,
      streakReset: false
    };
  }

  const missedDays = elapsedDays - 1;

  if (missedDays <= streakFreezes) {
    const nextStreak = currentStreak + 1;
    return {
      currentStreak: nextStreak,
      longestStreak: Math.max(longestStreak, nextStreak),
      lastPracticeDate: todayKey,
      streakFreezes: streakFreezes - missedDays,
      freezeUsed: missedDays,
      streakAdvanced: true,
      streakReset: false
    };
  }

  return {
    currentStreak: 1,
    longestStreak,
    lastPracticeDate: todayKey,
    streakFreezes: 0,
    freezeUsed: Math.min(streakFreezes, missedDays),
    streakAdvanced: true,
    streakReset: true
  };
}

function getLevelInfo(totalXp) {
  let level = 1;
  let currentXp = Math.max(0, totalXp);
  let nextXp = getXpForLevel(level);

  while (currentXp >= nextXp) {
    currentXp -= nextXp;
    level += 1;
    nextXp = getXpForLevel(level);
  }

  return {
    level,
    currentXp,
    nextXp,
    progress: Math.round((currentXp / nextXp) * 100)
  };
}

function getCourseLevel(courseId, totalXp) {
  const level = getLevelInfo(totalXp).level;
  const cap = COURSE_LEVEL_CAPS[courseId];
  return cap ? Math.min(level, cap) : level;
}

function getXpForLevel(level) {
  return 400 + (level - 1) * 250;
}

function normalizeCourseId(value) {
  const courseId = cleanRequiredString(value, "courseId").toLowerCase();
  if (!/^[a-z0-9-]{2,40}$/.test(courseId)) {
    throw new HttpsError("invalid-argument", "Invalid courseId.");
  }
  return courseId;
}

function normalizeUid(value) {
  const uid = cleanRequiredString(value, "uid");
  if (uid.length > 128) {
    throw new HttpsError("invalid-argument", "Invalid uid.");
  }
  return uid;
}

function normalizeHandle(value) {
  const handle = cleanRequiredString(value, "handle")
    .trim()
    .toLowerCase();

  if (!HANDLE_PATTERN.test(handle)) {
    throw new HttpsError(
      "invalid-argument",
      "Handle must be 3-20 characters and use letters, numbers, or underscores."
    );
  }

  return handle;
}

function normalizeTimezone(value) {
  const timezone = cleanOptionalString(value) || DEFAULT_TIMEZONE;

  try {
    new Intl.DateTimeFormat("en-US", { timeZone: timezone }).format(new Date());
    return timezone;
  } catch {
    return DEFAULT_TIMEZONE;
  }
}

function cleanRequiredString(value, fieldName) {
  const str = cleanOptionalString(value);
  if (!str) {
    throw new HttpsError("invalid-argument", `${fieldName} is required.`);
  }
  return str;
}

function cleanOptionalString(value) {
  return typeof value === "string" ? value.trim() : "";
}

function clampInteger(value, min, max) {
  const number = Number(value);
  if (!Number.isFinite(number)) return min;
  return Math.min(max, Math.max(min, Math.trunc(number)));
}

function getDateKeyForTimezone(date, timezone) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(date);

  const year = parts.find(part => part.type === "year").value;
  const month = parts.find(part => part.type === "month").value;
  const day = parts.find(part => part.type === "day").value;

  return `${year}-${month}-${day}`;
}

function diffDateKeys(fromKey, toKey) {
  return Math.round((dateKeyToUtc(toKey) - dateKeyToUtc(fromKey)) / 86400000);
}

function dateKeyToUtc(dateKey) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return Date.UTC(year, month - 1, day);
}

function getFriendPairId(uidA, uidB) {
  return [uidA, uidB].sort().join("_");
}

function pickFriendProfile(profile) {
  return {
    uid: profile.uid,
    handle: profile.handle || null,
    displayName: profile.displayName || "Polytype Learner",
    avatarUrl: profile.avatarUrl || null,
    totalXp: profile.totalXp || 0,
    globalLevel: profile.globalLevel || 1,
    currentStreak: profile.currentStreak || 0
  };
}
