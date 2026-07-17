const { db, FieldValue, Timestamp } = require("./_firebase");
const {
  withAuth, getAuthProfile, buildDefaultUserProfile, buildPublicProfile,
  normalizeSessionPayload, calculateSessionXp, calculateStreakUpdate,
  getLevelInfo, getCourseLevel, resolveUnlockedWords, getKeysHeld,
  getDateKeyForTimezone, getHourForTimezone, diffDateKeys, normalizeTimezone, getFriendPairId,
  getNewlyCompletedMissions, evaluateNewBadges, sanitizeLessonsCompleted,
  LESSON_COIN_REWARD, LESSON_IDS_BY_COURSE,
  ApiError
} = require("./_lib");

module.exports = withAuth(async (data, token) => {
  const session = normalizeSessionPayload(data);
  const xpEarned = calculateSessionXp(session);

  if (xpEarned <= 0) {
    throw new ApiError(422, "A session needs at least one correct answer to update progress.");
  }

  // Small direct coin reward for any completed session - kept low on
  // purpose so daily missions (see MISSION_POOL) are clearly the bigger
  // payout, not something a single round can match.
  const sessionCoins = Math.max(2, Math.round(xpEarned / 15));

  const result = await db.runTransaction(async transaction => {
    const userRef = db.doc(`users/${token.uid}`);
    const courseRef = userRef.collection("courses").doc(session.courseId);
    const publicRef = db.doc(`publicProfiles/${token.uid}`);

    const userSnap = await transaction.get(userRef);
    const courseSnap = await transaction.get(courseRef);

    const authProfile = getAuthProfile(token);
    const existingUser = userSnap.exists ? userSnap.data() : null;
    const timezone = normalizeTimezone(session.timezone || existingUser?.timezone);
    // One Date instance shared by both reads below (rather than two separate
    // `new Date()` calls) so todayKey and practiceHour can never disagree
    // about "now" if this happens to run right at an hour/day boundary.
    const requestTime = new Date();
    const todayKey = getDateKeyForTimezone(requestTime, timezone);
    const practiceHour = getHourForTimezone(requestTime, timezone);

    const dailyStatsRef = userRef.collection("dailyStats").doc(todayKey);
    const badgesSnap = await transaction.get(userRef.collection("badges"));
    const dailyStatsSnap = await transaction.get(dailyStatsRef);
    const previousDailyStats = dailyStatsSnap.exists ? dailyStatsSnap.data() : {};
    const earnedBadgeIds = badgesSnap.docs.map(doc => doc.id);

    const previousTotalXp = existingUser?.totalXp || 0;
    const existingCourse = existingUser?.courses?.[session.courseId] || null;
    const previousCourseXp = courseSnap.exists
      ? courseSnap.data().xp || 0
      : existingCourse?.xp || 0;

    const totalXp = previousTotalXp + xpEarned;
    const courseXp = previousCourseXp + xpEarned;
    const globalLevel = getLevelInfo(totalXp).level;
    const courseLevel = getCourseLevel(session.courseId, courseXp);
    const hasExistingCourse = courseSnap.exists || Boolean(existingCourse);
    // Earning XP never directly unlocks words - it only grows the pool of
    // keys the player can spend (see getKeysHeld below). unlockedWords only
    // ever changes through an explicit key spend in api/unlock-word.js,
    // except for the one-time starter grant on a brand-new course, or a
    // lazy migration of a legacy prefix-based course (categoryIndex/
    // categoryUnlocked) into a real suffix set the first time it's touched.
    const existingCourseData = courseSnap.exists ? courseSnap.data() : existingCourse;
    const unlockedWords = resolveUnlockedWords(existingCourseData, !hasExistingCourse);
    // Never touched by XP - carried forward unchanged so it survives the
    // round trip to the client (api/buy-key.js is the only writer).
    const purchasedKeys = existingCourseData?.purchasedKeys || 0;

    // Lessons (see decks/lessons-norwegian.js) unlock strictly in sequence:
    // lessonId is only "new" - and only then worth a coin bonus/unlock
    // advance - if it's exactly the next one past everything already
    // completed (its position in the fixed lesson order equals how many the
    // player has completed so far). Replaying an earlier lesson, or a
    // lessonId normalizeSessionPayload already rejected as invalid/
    // out-of-course, still earns normal XP/coins above but leaves the lesson
    // list untouched.
    const existingLessonsCompleted = sanitizeLessonsCompleted(existingCourseData?.lessonsCompleted, session.courseId);
    const courseLessonIds = LESSON_IDS_BY_COURSE[session.courseId] || [];
    const lessonOrderIndex = session.lessonId ? courseLessonIds.indexOf(session.lessonId) : -1;
    const isNewLessonCompletion = lessonOrderIndex !== -1 &&
      !existingLessonsCompleted.includes(session.lessonId) &&
      lessonOrderIndex === existingLessonsCompleted.length;
    const lessonsCompleted = isNewLessonCompletion
      ? [...existingLessonsCompleted, session.lessonId]
      : existingLessonsCompleted;
    const lessonCoinsAwarded = isNewLessonCompletion ? LESSON_COIN_REWARD : 0;

    const streak = calculateStreakUpdate({
      currentStreak: existingUser?.currentStreak || 0,
      longestStreak: existingUser?.longestStreak || 0,
      lastPracticeDate: existingUser?.lastPracticeDate || null,
      streakFreezes: existingUser?.streakFreezes || 0,
      todayKey
    });

    // Compute the *resulting* daily totals ourselves (rather than trusting
    // FieldValue.increment, whose applied value isn't readable within this
    // same transaction) so mission progress/completion can be evaluated now.
    const updatedDailyStats = {
      ...previousDailyStats,
      xp: (previousDailyStats.xp || 0) + xpEarned,
      sessions: (previousDailyStats.sessions || 0) + 1,
      correctAnswers: (previousDailyStats.correctAnswers || 0) + session.correctAnswers,
      wrongAnswers: (previousDailyStats.wrongAnswers || 0) + session.wrongAnswers,
      freezeUsed: (previousDailyStats.freezeUsed || 0) + streak.freezeUsed,
      gameSessions: {
        ...previousDailyStats.gameSessions,
        [session.gameType]: ((previousDailyStats.gameSessions || {})[session.gameType] || 0) + 1
      }
    };

    const completedMissions = getNewlyCompletedMissions(token.uid, todayKey, previousDailyStats, updatedDailyStats);
    const coinsEarned = completedMissions.reduce((sum, mission) => sum + mission.coinReward, 0);
    const missionsCompleted = {
      ...(previousDailyStats.missionsCompleted || {}),
      ...Object.fromEntries(completedMissions.map(mission => [mission.id, true]))
    };
    updatedDailyStats.missionsCompleted = missionsCompleted;

    // Coins are per-course (this language's own balance), not shared across
    // languages the way totalXp/globalLevel are - see start-course.js.
    const previousCourseCoins = existingCourseData?.coins || 0;
    const courseCoins = previousCourseCoins + coinsEarned + sessionCoins + lessonCoinsAwarded;

    const now = FieldValue.serverTimestamp();
    const userData = {
      ...buildDefaultUserProfile(token.uid, authProfile, timezone),
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
      maxStreakFreezes: existingUser?.maxStreakFreezes || 2,
      sessionsCompleted: (existingUser?.sessionsCompleted || 0) + 1,
      gameTypesPlayed: { ...(existingUser?.gameTypesPlayed || {}), [session.gameType]: true },
      updatedAt: now,
      lastActiveAt: now
    };

    const newBadges = evaluateNewBadges(userData, {
      chestsClaimed: userData.chestsClaimed || 0,
      sessionBestCombo: session.bestCombo,
      sessionCorrectAnswers: session.correctAnswers,
      sessionWrongAnswers: session.wrongAnswers,
      practiceHour
    }, earnedBadgeIds);

    const previousCourseLevel = courseSnap.exists
      ? courseSnap.data().level || 1
      : existingCourse?.level || 1;
    const courseData = {
      courseId: session.courseId,
      xp: courseXp,
      level: courseLevel,
      unlockedLevel: courseLevel,
      unlockedWords,
      wordsUnlocked: unlockedWords.length,
      wordsMastered: courseSnap.exists ? courseSnap.data().wordsMastered || 0 : 0,
      purchasedKeys,
      coins: courseCoins,
      lessonsCompleted,
      lastPlayedAt: now,
      updatedAt: now
    };
    const courseResponse = {
      courseId: session.courseId,
      xp: courseXp,
      level: courseLevel,
      unlockedLevel: courseLevel,
      unlockedWords,
      wordsUnlocked: courseData.wordsUnlocked,
      wordsMastered: courseData.wordsMastered,
      purchasedKeys,
      coins: courseCoins,
      lessonsCompleted
    };

    userData.courses = {
      ...(existingUser?.courses || {}),
      [session.courseId]: { ...courseResponse, updatedAt: Timestamp.now() }
    };

    // Tutorial's final step (see api/start-course.js): finishing one Sprint
    // session in the tutorial course completes it.
    if (userData.tutorial?.active && userData.tutorial.step === "play-sprint" &&
        userData.tutorial.courseId === session.courseId && session.gameType === "sprint") {
      userData.tutorial = { ...userData.tutorial, active: false, step: "done" };
    }

    if (!userSnap.exists) courseData.createdAt = now;
    if (!userSnap.exists) userData.createdAt = now;

    transaction.set(userRef, userData, { merge: true });
    transaction.set(courseRef, courseData, { merge: true });
    transaction.set(publicRef, { ...buildPublicProfile(token.uid, userData, authProfile), updatedAt: now }, { merge: true });
    transaction.set(dailyStatsRef, {
      date: todayKey,
      timezone,
      practiced: true,
      xp: updatedDailyStats.xp,
      sessions: updatedDailyStats.sessions,
      correctAnswers: updatedDailyStats.correctAnswers,
      wrongAnswers: updatedDailyStats.wrongAnswers,
      freezeUsed: updatedDailyStats.freezeUsed,
      gameSessions: updatedDailyStats.gameSessions,
      missionsCompleted,
      updatedAt: now,
      createdAt: now
    }, { merge: true });

    newBadges.forEach(badge => {
      transaction.set(userRef.collection("badges").doc(badge.id), {
        badgeId: badge.id,
        earnedAt: now
      });
    });

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

    return {
      xpEarned,
      totalXp,
      globalLevel,
      course: courseResponse,
      streak,
      keys: getKeysHeld(purchasedKeys),
      coinsEarned,
      sessionCoins,
      newLessonCompletion: isNewLessonCompletion,
      lessonCoinsAwarded,
      tutorial: userData.tutorial || null,
      completedMissions: completedMissions.map(mission => ({ id: mission.id, coinReward: mission.coinReward, labelKey: mission.labelKey })),
      newBadges: newBadges.map(badge => ({ id: badge.id }))
    };
  });

  // Sprint-only, best-effort: a failure here should never cost the player
  // their already-committed XP/coins, so it's kept outside the transaction
  // above and never throws.
  const friendsStatus = session.gameType === "sprint"
    ? await updateFriendshipStreaksForSprint(token.uid).catch(err => {
        console.error("friendship streak update failed", err);
        return [];
      })
    : [];

  return { ...result, friendsStatus };
});

// Pair-wise "friendship streak", shown on the sprint result screen: rises by
// 1 for a pair only on a day both members play at least one sprint. Uses a
// UTC day boundary (not each user's own timezone, unlike the personal streak
// in calculateStreakUpdate) so both sides of a friendship agree on what
// "today" means regardless of where each player lives. Updates lazily -
// whichever friend plays sprint *second* on a given day is the one whose
// call actually advances the shared streak.
async function updateFriendshipStreaksForSprint(uid) {
  const todayKey = getDateKeyForTimezone(new Date(), "UTC");
  const now = FieldValue.serverTimestamp();

  await db.doc(`publicProfiles/${uid}`).set({ lastSprintPlayedDate: todayKey }, { merge: true });

  const friendsSnap = await db.collection(`users/${uid}/friends`).get();
  if (friendsSnap.empty) return [];

  const friendUids = friendsSnap.docs.map(doc => doc.id);

  const [friendPublicSnaps, pairSnaps] = await Promise.all([
    db.getAll(...friendUids.map(friendUid => db.doc(`publicProfiles/${friendUid}`))),
    db.getAll(...friendUids.map(friendUid => db.doc(`friendships/${getFriendPairId(uid, friendUid)}`)))
  ]);

  const statuses = await Promise.all(friendUids.map(async (friendUid, index) => {
    const friendPublic = friendPublicSnaps[index].exists ? friendPublicSnaps[index].data() : null;
    const playedToday = friendPublic?.lastSprintPlayedDate === todayKey;
    const pairSnap = pairSnaps[index];
    const pairData = pairSnap.exists ? pairSnap.data() : null;
    let streak = pairData?.streak || 0;

    if (playedToday && pairData?.lastBothPlayedDate !== todayKey) {
      const elapsedDays = pairData?.lastBothPlayedDate
        ? diffDateKeys(pairData.lastBothPlayedDate, todayKey)
        : null;
      streak = elapsedDays === 1 ? streak + 1 : 1;
      await pairSnap.ref.set({
        uids: [uid, friendUid].sort(),
        streak,
        lastBothPlayedDate: todayKey,
        updatedAt: now
      }, { merge: true });
    }

    return {
      uid: friendUid,
      displayName: friendPublic?.displayName || "Player",
      avatarUrl: friendPublic?.avatarUrl || null,
      handle: friendPublic?.handle || null,
      playedToday,
      friendshipStreak: streak
    };
  }));

  statuses.sort((a, b) => {
    if (a.playedToday !== b.playedToday) return a.playedToday ? -1 : 1;
    return (b.friendshipStreak || 0) - (a.friendshipStreak || 0);
  });

  return statuses;
}
