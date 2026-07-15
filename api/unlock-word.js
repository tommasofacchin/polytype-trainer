const { db, FieldValue, Timestamp } = require("./_firebase");
const {
  withAuth, normalizeCourseId, resolveUnlockedWords,
  getEarnedWordTotal, getKeysHeld, VALID_WORD_SUFFIXES,
  ApiError
} = require("./_lib");

// Spends one key to unlock a single, player-chosen word. Unlike XP (which
// only grows the pool of keys - see getKeysHeld), unlockedWords only ever
// changes here (plus the one-time starter grant / legacy migration in
// resolveUnlockedWords). The player may pick ANY currently-locked word in
// the course, in any order - there is no per-category gating.
module.exports = withAuth(async (data, token) => {
  const courseId = normalizeCourseId(data.courseId);
  const wordSuffix = normalizeWordSuffix(data.wordSuffix);

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
      throw new ApiError(404, "Course not found.");
    }

    const courseXp = existingCourse.xp || 0;
    const purchasedKeys = existingCourse.purchasedKeys || 0;
    const unlockedWords = resolveUnlockedWords(existingCourse, false);

    if (unlockedWords.includes(wordSuffix)) {
      throw new ApiError(409, "Word already unlocked.");
    }

    // Earned-via-XP keys aren't a stored number - growing unlockedWords by 1
    // below automatically reduces getEarnedWordTotal(...)-unlockedCount by 1
    // on its own. Only draw down the separately-stored purchasedKeys pool
    // when the earned pool was already at its floor (0) *before* this spend
    // - otherwise both pools would shrink for the same single spend, or (if
    // purchasedKeys were folded directly into the earned formula instead of
    // being spent explicitly) a bought key would regenerate forever once
    // unlockedCount overtakes the XP-justified total. See getKeysHeld().
    const earnedKeysBefore = Math.max(0, getEarnedWordTotal(courseXp, unlockedWords.length) - unlockedWords.length);
    const keysHeld = getKeysHeld(courseXp, unlockedWords.length, purchasedKeys);
    if (keysHeld <= 0) {
      throw new ApiError(409, "No keys available.");
    }
    const nextPurchasedKeys = earnedKeysBefore > 0 ? purchasedKeys : Math.max(0, purchasedKeys - 1);

    const nextUnlockedWords = [...unlockedWords, wordSuffix];
    const now = FieldValue.serverTimestamp();
    const courseResponse = {
      courseId,
      xp: courseXp,
      level: existingCourse.level || 1,
      unlockedLevel: existingCourse.unlockedLevel || existingCourse.level || 1,
      unlockedWords: nextUnlockedWords,
      wordsUnlocked: nextUnlockedWords.length,
      wordsMastered: existingCourse.wordsMastered || 0,
      purchasedKeys: nextPurchasedKeys
    };

    transaction.set(userRef, {
      courses: {
        ...(existingUser?.courses || {}),
        [courseId]: { ...courseResponse, updatedAt: Timestamp.now() }
      },
      updatedAt: now
    }, { merge: true });

    transaction.set(courseRef, { ...courseResponse, updatedAt: now }, { merge: true });

    return {
      course: courseResponse,
      keys: getKeysHeld(courseXp, nextUnlockedWords.length, nextPurchasedKeys)
    };
  });
});

function normalizeWordSuffix(value) {
  const suffix = Number(value);
  if (!Number.isInteger(suffix) || !VALID_WORD_SUFFIXES.has(suffix)) {
    throw new ApiError(400, "Invalid wordSuffix.");
  }
  return suffix;
}
