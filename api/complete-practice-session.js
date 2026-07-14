const { db, FieldValue, Timestamp } = require("./_firebase");
const {
  withAuth, getAuthProfile, buildDefaultUserProfile, buildPublicProfile,
  normalizeSessionPayload, calculateSessionXp, calculateStreakUpdate,
  getLevelInfo, getCourseLevel, advanceCategoryProgress, getDateKeyForTimezone, normalizeTimezone,
  getNewlyCompletedMissions, evaluateNewBadges,
  ApiError
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
    const previousCategoryIndex = courseSnap.exists
      ? courseSnap.data().categoryIndex || 0
      : existingCourse?.categoryIndex || 0;
    const previousCategoryUnlocked = courseSnap.exists
      ? courseSnap.data().categoryUnlocked || 0
      : existingCourse?.categoryUnlocked || 0;
    const categoryProgress = advanceCategoryProgress(
      previousCategoryIndex,
      previousCategoryUnlocked,
      courseXp,
      !hasExistingCourse
    );
    const streak = calculateStreakUpdate({
      currentStreak: existingUser?.currentStreak || 0,
      longestStreak: existingUser?.longestStreak || 0,
      lastPracticeDate: existingUser?.lastPracticeDate || null,
      streakFreezes: existingUser?.streakFreezes || 0,
      todayKey
    });

    const previousGlobalLevel = existingUser?.globalLevel || 1;
    const leveledUp = globalLevel > previousGlobalLevel;
    const rupeesEarned = leveledUp ? (globalLevel - previousGlobalLevel) : 0;

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

    const previousCoins = existingUser?.coins || 0;
    const previousRupees = existingUser?.rupees || 0;
    const coins = previousCoins + coinsEarned;
    const rupees = previousRupees + rupeesEarned;

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
      coins,
      rupees,
      updatedAt: now,
      lastActiveAt: now
    };

    const newBadges = evaluateNewBadges(userData, { chestsClaimed: userData.chestsClaimed || 0 }, earnedBadgeIds);

    const previousCourseLevel = courseSnap.exists
      ? courseSnap.data().level || 1
      : existingCourse?.level || 1;
    const courseData = {
      courseId: session.courseId,
      xp: courseXp,
      level: courseLevel,
      unlockedLevel: courseLevel,
      categoryIndex: categoryProgress.categoryIndex,
      categoryUnlocked: categoryProgress.categoryUnlocked,
      wordsUnlocked: categoryProgress.totalWordsUnlocked,
      wordsMastered: courseSnap.exists ? courseSnap.data().wordsMastered || 0 : 0,
      lastPlayedAt: now,
      updatedAt: now
    };
    const courseResponse = {
      courseId: session.courseId,
      xp: courseXp,
      level: courseLevel,
      unlockedLevel: courseLevel,
      categoryIndex: categoryProgress.categoryIndex,
      categoryUnlocked: categoryProgress.categoryUnlocked,
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
      unlockedWords: courseData.wordsUnlocked,
      newlyUnlockedWords: categoryProgress.newlyUnlocked,
      coins,
      rupees,
      coinsEarned,
      rupeesEarned,
      completedMissions: completedMissions.map(mission => ({ id: mission.id, coinReward: mission.coinReward, labelKey: mission.labelKey })),
      newBadges: newBadges.map(badge => ({ id: badge.id }))
    };
  });
});
