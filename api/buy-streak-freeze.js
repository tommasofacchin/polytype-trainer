const { db, FieldValue, Timestamp } = require("./_firebase");
const {
  withAuth, normalizeCourseId, sanitizeLessonsCompleted,
  STREAK_FREEZE_PRICE_COINS, MAX_STREAK_FREEZES,
  ApiError
} = require("./_lib");

// Spends coins to buy one streak freeze, up to MAX_STREAK_FREEZES held.
//
// Note the asymmetry: coins are a per-course balance (see start-course.js),
// but streakFreezes is user-level - the streak it protects spans every
// language. So this charges the course the player is currently studying and
// credits a freeze that works everywhere. Freezes are spent automatically by
// calculateStreakUpdate on the next session after a missed day.
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

    const maxStreakFreezes = existingUser?.maxStreakFreezes || MAX_STREAK_FREEZES;
    const streakFreezes = existingUser?.streakFreezes || 0;

    // Checked before the coin balance so a player who is already full gets
    // told that, rather than being told they're short on coins.
    if (streakFreezes >= maxStreakFreezes) {
      throw new ApiError(409, "Streak freezes are already full.");
    }

    const coins = existingCourse.coins || 0;
    if (coins < STREAK_FREEZE_PRICE_COINS) {
      throw new ApiError(409, "Not enough coins.");
    }

    const now = FieldValue.serverTimestamp();
    const nextStreakFreezes = streakFreezes + 1;
    const courseResponse = {
      courseId,
      xp: existingCourse.xp || 0,
      level: existingCourse.level || 1,
      unlockedLevel: existingCourse.unlockedLevel || existingCourse.level || 1,
      unlockedWords: Array.isArray(existingCourse.unlockedWords) ? existingCourse.unlockedWords : [],
      wordsUnlocked: Array.isArray(existingCourse.unlockedWords) ? existingCourse.unlockedWords.length : 0,
      wordsMastered: existingCourse.wordsMastered || 0,
      purchasedKeys: existingCourse.purchasedKeys || 0,
      coins: coins - STREAK_FREEZE_PRICE_COINS,
      // Same reason as buy-key.js: the client swaps its cached course for
      // whatever comes back, so every field has to round-trip or it's lost.
      lessonsCompleted: sanitizeLessonsCompleted(existingCourse.lessonsCompleted, courseId)
    };

    transaction.set(userRef, {
      streakFreezes: nextStreakFreezes,
      maxStreakFreezes,
      courses: {
        ...(existingUser?.courses || {}),
        [courseId]: { ...courseResponse, updatedAt: Timestamp.now() }
      },
      updatedAt: now
    }, { merge: true });

    transaction.set(courseRef, { ...courseResponse, updatedAt: now }, { merge: true });

    return {
      course: courseResponse,
      streakFreezes: nextStreakFreezes,
      maxStreakFreezes
    };
  });
});
