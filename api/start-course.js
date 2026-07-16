const { db, FieldValue } = require("./_firebase");
const {
  withAuth, normalizeCourseId,
  TUTORIAL_STARTER_COINS, TUTORIAL_STARTER_KEYS,
  ApiError
} = require("./_lib");

// Called when a signed-in player picks a language in languages.html, before
// they've ever played a session there - unlike the old model, a course no
// longer gets its first 5 words for free on session #1, so it needs to
// exist (with something to spend) before Deck/Shop/Sprint are usable.
//
// A player's very first course ever gets 500 gifted coins and starts the
// guided tutorial (see TUTORIAL_STEPS in api/_lib.js): explain the Deck,
// have them spend those coins on 5 keys in the Shop, have them choose 5
// words to unlock, then have them finish one Sprint. Every course after
// that (this player's 2nd+ language, or literally anyone who already has a
// course from before this feature shipped) just gets 5 keys for free,
// silently - no coins, no tutorial, they already know the ropes.
module.exports = withAuth(async (data, token) => {
  const courseId = normalizeCourseId(data.courseId);

  return db.runTransaction(async transaction => {
    const userRef = db.doc(`users/${token.uid}`);
    const courseRef = userRef.collection("courses").doc(courseId);

    const userSnap = await transaction.get(userRef);
    if (!userSnap.exists) {
      throw new ApiError(409, "Sign in again before picking a language.");
    }

    const existingUser = userSnap.data();
    const existingCourse = existingUser?.courses?.[courseId] || null;

    if (existingCourse) {
      return {
        course: existingCourse,
        tutorial: existingUser?.tutorial || null,
        isFirstCourse: false
      };
    }

    const isFirstCourse = Object.keys(existingUser.courses || {}).length === 0;
    const now = FieldValue.serverTimestamp();

    const courseResponse = {
      courseId,
      xp: 0,
      level: 1,
      unlockedLevel: 1,
      unlockedWords: [],
      wordsUnlocked: 0,
      wordsMastered: 0,
      purchasedKeys: isFirstCourse ? 0 : TUTORIAL_STARTER_KEYS,
      coins: isFirstCourse ? TUTORIAL_STARTER_COINS : 0
    };

    const tutorial = isFirstCourse ? { active: true, step: "deck-intro", courseId } : (existingUser?.tutorial || null);

    transaction.set(userRef, {
      tutorial,
      courses: {
        ...(existingUser?.courses || {}),
        [courseId]: { ...courseResponse, updatedAt: now, createdAt: now }
      },
      updatedAt: now
    }, { merge: true });

    transaction.set(courseRef, { ...courseResponse, updatedAt: now, createdAt: now }, { merge: true });

    return { course: courseResponse, tutorial, isFirstCourse };
  });
});
