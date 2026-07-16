const { db, FieldValue, Timestamp } = require("./_firebase");
const {
  withAuth, normalizeCourseId, resolveUnlockedWords,
  WORD_CHEST_PRICE_COINS, VALID_WORD_SUFFIXES,
  ApiError
} = require("./_lib");

// Alternative to buy-key.js + api/unlock-word.js (buy a key, then hand-pick
// a word): spends coins directly on one random still-locked word for
// players who'd rather gamble than choose.
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
    if (coins < WORD_CHEST_PRICE_COINS) {
      throw new ApiError(409, "Not enough coins.");
    }

    const courseXp = existingCourse.xp || 0;
    const unlockedWords = resolveUnlockedWords(existingCourse, false);
    const missingWords = [...VALID_WORD_SUFFIXES].filter(suffix => !unlockedWords.includes(suffix));

    if (!missingWords.length) {
      throw new ApiError(409, "Every word in this course is already unlocked.");
    }

    const wordSuffix = missingWords[Math.floor(Math.random() * missingWords.length)];
    const nextUnlockedWords = [...unlockedWords, wordSuffix];
    const nextCoins = coins - WORD_CHEST_PRICE_COINS;
    const now = FieldValue.serverTimestamp();

    const courseResponse = {
      courseId,
      xp: courseXp,
      level: existingCourse.level || 1,
      unlockedLevel: existingCourse.unlockedLevel || existingCourse.level || 1,
      unlockedWords: nextUnlockedWords,
      wordsUnlocked: nextUnlockedWords.length,
      wordsMastered: existingCourse.wordsMastered || 0,
      purchasedKeys: existingCourse.purchasedKeys || 0
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
      unlockedWordSuffix: wordSuffix
    };
  });
});
