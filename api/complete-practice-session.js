const { db, FieldValue, Timestamp } = require("./_firebase");
const {
  withAuth, getAuthProfile, buildDefaultUserProfile, buildPublicProfile,
  normalizeSessionPayload, calculateSessionXp, calculateStreakUpdate,
  calculateWeeklyXpUpdate, applyWordResults,
  getLevelInfo, getCourseLevel, resolveUnlockedWords, getKeysHeld,
  getDateKeyForTimezone, getHourForTimezone, diffDateKeys, normalizeTimezone, getFriendPairId,
  getNewlyCompletedMissions, evaluateNewBadges, sanitizeLessonsCompleted,
  pickDailyMissions, rollMissionReward, isXpBoostActive,
  LESSON_COIN_REWARD, LESSON_IDS_BY_COURSE, MAX_STREAK_FREEZES,
  XP_BOOST_MULTIPLIER, XP_BOOST_DURATION_MS,
  ApiError
} = require("./_lib");
const {
  readFriendshipStateForSprint, commitFriendshipStreaksForSprint
} = require("./_sprint-end");

module.exports = withAuth(async (data, token) => {
  const session = normalizeSessionPayload(data);
  // What the session was worth on its own merits. The all-missions XP boost
  // is applied on top inside the transaction below, where the player's boost
  // state can actually be read.
  const baseXpEarned = calculateSessionXp(session);

  if (baseXpEarned <= 0) {
    throw new ApiError(422, "A session needs at least one correct answer to update progress.");
  }

  // Small direct coin reward for any completed session - kept low on
  // purpose so daily missions (see MISSION_POOL) are clearly the bigger
  // payout, not something a single round can match. Deliberately off the
  // unboosted XP: the missions boost multiplies XP, not income.
  const sessionCoins = Math.max(2, Math.round(baseXpEarned / 15));

  // Sprint-only. None of the friends *reads* depend on the transaction below,
  // so they're started here and awaited after it instead of running strictly
  // afterwards - that serial second leg was what left the sprint result
  // screen visibly waiting on its friends list. The writes still happen after
  // the commit (see commitFriendshipStreaksForSprint), so a save that fails
  // never marks the player as having played today.
  const friendsReadPromise = session.gameType === "sprint"
    ? readFriendshipStateForSprint(token.uid).catch(err => {
        console.error("friendship streak read failed", err);
        return null;
      })
    : Promise.resolve(null);

  const result = await db.runTransaction(async transaction => {
    const userRef = db.doc(`users/${token.uid}`);
    const courseRef = userRef.collection("courses").doc(session.courseId);
    const publicRef = db.doc(`publicProfiles/${token.uid}`);

    // One round trip for the two docs (getAll) and a second, concurrent one
    // for the badge ids - they used to be three separate awaits in a row, and
    // inside a transaction each of those is its own trip to Firestore while
    // the player waits on the result screen. Only dailyStats has to follow,
    // since its doc id is the timezone-resolved day key read out of the user
    // doc below.
    const [[userSnap, courseSnap], badgesSnap] = await Promise.all([
      transaction.getAll(userRef, courseRef),
      transaction.get(userRef.collection("badges"))
    ]);

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
    const dailyStatsSnap = await transaction.get(dailyStatsRef);
    const previousDailyStats = dailyStatsSnap.exists ? dailyStatsSnap.data() : {};
    const earnedBadgeIds = badgesSnap.docs.map(doc => doc.id);

    // Read before anything below can grant a new boost, so a session never
    // doubles its own reward by being the one that completed the missions -
    // the multiplier starts on the next session.
    const boostWasActive = isXpBoostActive(existingUser, requestTime.getTime());
    const xpEarned = boostWasActive ? baseXpEarned * XP_BOOST_MULTIPLIER : baseXpEarned;

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
    // Never touched by XP. Normally just carried forward so it survives the
    // round trip to the client; the only thing here that can add to it is a
    // key rolled out of a mission reward below (api/buy-key.js and
    // api/claim-daily-chest.js are the other writers).
    const previousPurchasedKeys = existingCourseData?.purchasedKeys || 0;

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

    const newlyCompleted = getNewlyCompletedMissions(token.uid, todayKey, previousDailyStats, updatedDailyStats);

    // Each mission's payout is rolled rather than paid flat - see
    // MISSION_REWARD_TABLE in api/_lib.js. `held` is threaded through the
    // loop because several missions can complete in the same session: two
    // key rolls must not both see the same last free key slot and grant it
    // twice.
    const maxStreakFreezes = existingUser?.maxStreakFreezes || MAX_STREAK_FREEZES;
    const held = {
      keysHeld: getKeysHeld(previousPurchasedKeys),
      streakFreezes: streak.streakFreezes,
      maxStreakFreezes
    };

    const completedMissions = newlyCompleted.map(mission => {
      const reward = rollMissionReward(token.uid, todayKey, mission, held);
      held.keysHeld += reward.keys;
      held.streakFreezes += reward.streakFreezes;
      return { ...mission, reward };
    });

    const coinsEarned = completedMissions.reduce((sum, mission) => sum + mission.reward.coins, 0);
    const missionKeysEarned = completedMissions.reduce((sum, mission) => sum + mission.reward.keys, 0);
    const missionFreezesEarned = completedMissions.reduce((sum, mission) => sum + mission.reward.streakFreezes, 0);
    const purchasedKeys = previousPurchasedKeys + missionKeysEarned;
    const streakFreezesHeld = streak.streakFreezes + missionFreezesEarned;

    const missionsCompleted = {
      ...(previousDailyStats.missionsCompleted || {}),
      ...Object.fromEntries(completedMissions.map(mission => [mission.id, true]))
    };
    updatedDailyStats.missionsCompleted = missionsCompleted;

    // Clearing the whole day's set - including the hard third mission - arms
    // the XP multiplier. Gated on having *just* completed the last one, so
    // every further session on an already-cleared day doesn't keep renewing
    // a ten-minute window for the rest of the day.
    const dailyMissions = pickDailyMissions(token.uid, todayKey);
    const clearedAllMissions = dailyMissions.length > 0 &&
      dailyMissions.every(mission => missionsCompleted[mission.id]);
    const xpBoostStarted = clearedAllMissions && completedMissions.length > 0;
    const xpBoostExpiresAt = xpBoostStarted
      ? requestTime.getTime() + XP_BOOST_DURATION_MS
      : Number(existingUser?.xpBoostExpiresAt) || 0;

    // Coins are per-course (this language's own balance), not shared across
    // languages the way totalXp/globalLevel are - see start-course.js.
    const previousCourseCoins = existingCourseData?.coins || 0;
    const courseCoins = previousCourseCoins + coinsEarned + sessionCoins + lessonCoinsAwarded;

    const weeklyXpUpdate = calculateWeeklyXpUpdate(existingUser?.weeklyXp, existingUser?.weekKey, xpEarned, requestTime);

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
      weeklyXp: weeklyXpUpdate.weeklyXp,
      weekKey: weeklyXpUpdate.weekKey,
      currentStreak: streak.currentStreak,
      longestStreak: streak.longestStreak,
      lastPracticeDate: todayKey,
      streakFreezes: streakFreezesHeld,
      maxStreakFreezes,
      xpBoostExpiresAt,
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

    // A word is "mastered" once it's been answered correctly
    // WORD_MASTERY_THRESHOLD times total - see applyWordResults. wordStats
    // is per-word bookkeeping only, kept in Firestore but never round-
    // tripped back to the client (courseResponse only needs the aggregate
    // count below, not per-word detail for all 300 words every session).
    const previousWordStats = existingCourseData?.wordStats || {};
    const { wordStats, wordsMasteredDelta } = applyWordResults(previousWordStats, session.wordResults);
    const wordsMastered = (existingCourseData?.wordsMastered || 0) + wordsMasteredDelta;

    const courseData = {
      courseId: session.courseId,
      xp: courseXp,
      level: courseLevel,
      unlockedLevel: courseLevel,
      unlockedWords,
      wordsUnlocked: unlockedWords.length,
      wordsMastered,
      wordStats,
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
      streakFreezes: streakFreezesHeld,
      maxStreakFreezes,
      coinsEarned,
      sessionCoins,
      // The client needs both to be honest about the reward: what the session
      // was worth, and what it actually paid after the multiplier.
      baseXpEarned,
      xpBoostApplied: boostWasActive,
      xpBoostMultiplier: XP_BOOST_MULTIPLIER,
      xpBoostExpiresAt,
      xpBoostStarted,
      newLessonCompletion: isNewLessonCompletion,
      lessonCoinsAwarded,
      tutorial: userData.tutorial || null,
      completedMissions: completedMissions.map(mission => ({
        id: mission.id,
        labelKey: mission.labelKey,
        // coinReward is what was actually paid; baseCoinReward is the amount
        // the Home card advertised, so the overlay can show a rare roll as
        // the bonus it is rather than as a number that came from nowhere.
        coinReward: mission.reward.coins,
        baseCoinReward: mission.reward.baseCoins,
        rarity: mission.reward.rarity,
        keysEarned: mission.reward.keys,
        streakFreezesEarned: mission.reward.streakFreezes
      })),
      newBadges: newBadges.map(badge => ({ id: badge.id }))
    };
  });

  // Best-effort: a failure here should never cost the player their
  // already-committed XP/coins, so it stays outside the transaction above and
  // never throws.
  const friendsStatus = await commitFriendshipStreaksForSprint(token.uid, await friendsReadPromise)
    .catch(err => {
      console.error("friendship streak update failed", err);
      return [];
    });

  return { ...result, friendsStatus };
});
