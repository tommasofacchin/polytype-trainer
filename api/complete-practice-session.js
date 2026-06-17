const { db, FieldValue, Timestamp } = require("./_firebase");
const {
  withAuth, getAuthProfile, buildDefaultUserProfile, buildPublicProfile,
  normalizeSessionPayload, calculateSessionXp, calculateStreakUpdate,
  getLevelInfo, getCourseLevel, getDateKeyForTimezone, normalizeTimezone,
  ApiError, WORDS_PER_LEVEL
} = require("./_lib");

module.exports = withAuth(async (data, token) => {
  const session = normalizeSessionPayload(data);
  const xpEarned = calculateSessionXp(session);

  if (xpEarned <= 0) {
    throw new ApiError(422, "A session needs at least one correct answer to update progress.");
  }

  return db.runTransaction(async transaction => {
    const userRef = db.doc(`users/${token.uid}`);
    const courseRef = userRef.collection("courses").doc(session.courseId);
    const publicRef = db.doc(`publicProfiles/${token.uid}`);

    const userSnap = await transaction.get(userRef);
    const courseSnap = await transaction.get(courseRef);

    const authProfile = getAuthProfile(token);
    const existingUser = userSnap.exists ? userSnap.data() : null;
    const timezone = normalizeTimezone(session.timezone || existingUser?.timezone);
    const todayKey = getDateKeyForTimezone(new Date(), timezone);
    const previousTotalXp = existingUser?.totalXp || 0;
    const previousCourseXp = courseSnap.exists ? courseSnap.data().xp || 0 : 0;

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
      ...buildDefaultUserProfile(token.uid, authProfile, timezone),
      ...existingUser,
      displayName: authProfile.displayName,
      avatarUrl: authProfile.avatarUrl,
      timezone,
      totalXp,
      globalLevel,
      currentStreak: streak.currentStreak,
      longestStreak: streak.longestStreak,
      lastPracticeDate: todayKey,
      streakFreezes: streak.streakFreezes,
      maxStreakFreezes: existingUser?.maxStreakFreezes || 2,
      updatedAt: now,
      lastActiveAt: now
    };

    const previousCourseLevel = courseSnap.exists ? courseSnap.data().level || 1 : 1;
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

    userData.courses = {
      ...(existingUser?.courses || {}),
      [session.courseId]: { ...courseResponse, updatedAt: Timestamp.now() }
    };

    if (!userSnap.exists) courseData.createdAt = now;
    if (!userSnap.exists) userData.createdAt = now;

    transaction.set(userRef, userData, { merge: true });
    transaction.set(courseRef, courseData, { merge: true });
    transaction.set(publicRef, { ...buildPublicProfile(token.uid, userData, authProfile), updatedAt: now }, { merge: true });
    transaction.set(userRef.collection("dailyStats").doc(todayKey), {
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
      (streak.currentStreak > 0 && streak.currentStreak % 7 === 0) ||
      xpEarned >= 100;

    if (shouldPublishActivity) {
      transaction.set(db.collection("activities").doc(), {
        uid: token.uid,
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

    return { xpEarned, totalXp, globalLevel, course: courseResponse, streak, unlockedWords: courseData.wordsUnlocked };
  });
});
