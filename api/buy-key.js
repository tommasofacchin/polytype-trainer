const { db, FieldValue, Timestamp } = require("./_firebase");
const {
  withAuth, normalizeCourseId, resolveUnlockedWords, getKeysHeld,
  KEY_PRICE_COINS, MAX_KEYS,
  ApiError
} = require("./_lib");

// Spends coins to buy one key for a course, up to MAX_KEYS held. Coins are a
// user-level balance; purchasedKeys is per-course (keys only ever unlock
// words within the course they belong to, same as XP-earned keys).
module.exports = withAuth(async (data, token) => {
  const courseId = normalizeCourseId(data.courseId);

  return db.runTransaction(async transaction => {
    const userRef = db.doc(`users/${token.uid}`);
    const courseRef = userRef.collection("courses").doc(courseId);

    const userSnap = await transaction.get(userRef);
    const courseSnap = await transaction.get(courseRef);

    const existingUser = userSnap.exists ? userSnap.data() : null;
    const existingCourse = courseSnap.exists
      ? courseSnap.data()
      : existingUser?.courses?.[courseId] || null;

    if (!existingCourse) {
      throw new ApiError(404, "Course not found. Play a session in this language first.");
    }

    const coins = existingUser?.coins || 0;
    if (coins < KEY_PRICE_COINS) {
      throw new ApiError(409, "Not enough coins.");
    }

    const courseXp = existingCourse.xp || 0;
    const purchasedKeys = existingCourse.purchasedKeys || 0;
    const unlockedWords = resolveUnlockedWords(existingCourse, false);
    const keysHeld = getKeysHeld(courseXp, unlockedWords.length, purchasedKeys);

    if (keysHeld >= MAX_KEYS) {
      throw new ApiError(409, "Keys are already full.");
    }

    const nextCoins = coins - KEY_PRICE_COINS;
    const nextPurchasedKeys = purchasedKeys + 1;
    const now = FieldValue.serverTimestamp();
    const courseResponse = {
      courseId,
      xp: courseXp,
      level: existingCourse.level || 1,
      unlockedLevel: existingCourse.unlockedLevel || existingCourse.level || 1,
      unlockedWords,
      wordsUnlocked: unlockedWords.length,
      wordsMastered: existingCourse.wordsMastered || 0,
      purchasedKeys: nextPurchasedKeys
    };

    transaction.set(userRef, {
      coins: nextCoins,
      courses: {
        ...(existingUser?.courses || {}),
        [courseId]: { ...courseResponse, updatedAt: Timestamp.now() }
      },
      updatedAt: now
    }, { merge: true });

    transaction.set(courseRef, { ...courseResponse, updatedAt: now }, { merge: true });

    return {
      coins: nextCoins,
      course: courseResponse,
      keys: getKeysHeld(courseXp, unlockedWords.length, nextPurchasedKeys)
    };
  });
});
