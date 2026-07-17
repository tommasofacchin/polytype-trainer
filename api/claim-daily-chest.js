const { db, FieldValue, Timestamp } = require("./_firebase");
const {
  withAuth, getAuthProfile, buildDefaultUserProfile, buildPublicProfile,
  normalizeCourseId, resolveUnlockedWords, sanitizeLessonsCompleted,
  getLevelInfo, getDateKeyForTimezone, normalizeTimezone, evaluateNewBadges,
  CHEST_COIN_REWARD, CHEST_XP_REWARD, DEBUG_ALWAYS_CLAIM_CHEST, ApiError
} = require("./_lib");

// One claim per day per player (not per language) - the coin reward goes to
// whichever language they're currently studying (see start-course.js for
// why coins are per-course). If that course doesn't exist yet (e.g. signed
// in but never picked a language), it's bootstrapped with defaults first so
// the reward has somewhere to land.
module.exports = withAuth(async (data, token) => {
  const courseId = normalizeCourseId(data.courseId);

  return db.runTransaction(async transaction => {
    const userRef = db.doc(`users/${token.uid}`);
    const courseRef = userRef.collection("courses").doc(courseId);
    const publicRef = db.doc(`publicProfiles/${token.uid}`);

    const userSnap = await transaction.get(userRef);
    const courseSnap = await transaction.get(courseRef);
    const badgesSnap = await transaction.get(userRef.collection("badges"));
    const earnedBadgeIds = badgesSnap.docs.map(doc => doc.id);

    const authProfile = getAuthProfile(token);
    const existingUser = userSnap.exists ? userSnap.data() : null;
    const existingCourse = courseSnap.exists
      ? courseSnap.data()
      : existingUser?.courses?.[courseId] || null;
    const timezone = normalizeTimezone(data.timezone || existingUser?.timezone);
    const todayKey = getDateKeyForTimezone(new Date(), timezone);

    if (!DEBUG_ALWAYS_CLAIM_CHEST && existingUser?.lastChestClaimedDate === todayKey) {
      throw new ApiError(409, "The daily chest has already been claimed today.");
    }

    const totalXp = (existingUser?.totalXp || 0) + CHEST_XP_REWARD;
    const globalLevel = getLevelInfo(totalXp).level;
    const chestsClaimed = (existingUser?.chestsClaimed || 0) + 1;
    const courseCoins = (existingCourse?.coins || 0) + CHEST_COIN_REWARD;

    const now = FieldValue.serverTimestamp();
    const courseResponse = {
      courseId,
      xp: existingCourse?.xp || 0,
      level: existingCourse?.level || 1,
      unlockedLevel: existingCourse?.unlockedLevel || existingCourse?.level || 1,
      unlockedWords: resolveUnlockedWords(existingCourse, !existingCourse),
      wordsUnlocked: 0,
      wordsMastered: existingCourse?.wordsMastered || 0,
      purchasedKeys: existingCourse?.purchasedKeys || 0,
      coins: courseCoins,
      // Same round-trip requirement noted in api/buy-key.js.
      lessonsCompleted: sanitizeLessonsCompleted(existingCourse?.lessonsCompleted, courseId)
    };
    courseResponse.wordsUnlocked = courseResponse.unlockedWords.length;

    const userData = {
      ...buildDefaultUserProfile(token.uid, authProfile, timezone),
      ...existingUser,
      displayName: existingUser?.displayName || authProfile.displayName,
      avatarUrl: existingUser?.avatarUrl || authProfile.avatarUrl,
      email: existingUser?.email || authProfile.email,
      timezone,
      totalXp,
      globalLevel,
      chestsClaimed,
      lastChestClaimedDate: todayKey,
      courses: {
        ...(existingUser?.courses || {}),
        [courseId]: { ...courseResponse, updatedAt: Timestamp.now() }
      },
      updatedAt: now,
      lastActiveAt: now
    };

    if (!userSnap.exists) userData.createdAt = now;

    const newBadges = evaluateNewBadges(userData, { chestsClaimed }, earnedBadgeIds);

    transaction.set(userRef, userData, { merge: true });
    transaction.set(courseRef, { ...courseResponse, updatedAt: now }, { merge: true });
    transaction.set(publicRef, { ...buildPublicProfile(token.uid, userData, authProfile), updatedAt: now }, { merge: true });
    newBadges.forEach(badge => {
      transaction.set(userRef.collection("badges").doc(badge.id), {
        badgeId: badge.id,
        earnedAt: now
      });
    });

    return {
      course: courseResponse,
      totalXp,
      globalLevel,
      coinsEarned: CHEST_COIN_REWARD,
      xpEarned: CHEST_XP_REWARD,
      newBadges: newBadges.map(badge => ({ id: badge.id }))
    };
  });
});
