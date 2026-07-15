const { db, FieldValue, Timestamp } = require("./_firebase");
const {
  withAuth, normalizeCourseId, getUnlockedWordCount, getEarnedWordTotal,
  getPendingWordCount, stepCategoryProgress,
  ApiError
} = require("./_lib");

// Advances a single course by exactly one word once the player explicitly
// confirms it - the "earned" word count (from XP, see getEarnedWordTotal) is
// computed automatically by complete-practice-session, but categoryIndex/
// categoryUnlocked (the "confirmed"/actually-playable words) only ever move
// here, one word at a time.
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
      throw new ApiError(404, "Course not found.");
    }

    const courseXp = existingCourse.xp || 0;
    const categoryIndex = existingCourse.categoryIndex || 0;
    const categoryUnlocked = existingCourse.categoryUnlocked || 0;
    const confirmedTotal = getUnlockedWordCount(categoryIndex, categoryUnlocked);
    const earnedTotal = getEarnedWordTotal(courseXp, confirmedTotal);

    if (confirmedTotal >= earnedTotal) {
      throw new ApiError(409, "No word ready to unlock yet.");
    }

    const stepped = stepCategoryProgress(categoryIndex, categoryUnlocked, 1);
    const now = FieldValue.serverTimestamp();
    const courseResponse = {
      courseId,
      xp: courseXp,
      level: existingCourse.level || 1,
      unlockedLevel: existingCourse.unlockedLevel || existingCourse.level || 1,
      categoryIndex: stepped.categoryIndex,
      categoryUnlocked: stepped.categoryUnlocked,
      wordsUnlocked: stepped.totalWordsUnlocked,
      wordsMastered: existingCourse.wordsMastered || 0
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
      pendingWords: getPendingWordCount(courseXp, stepped.totalWordsUnlocked)
    };
  });
});
