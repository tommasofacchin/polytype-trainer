const { db, FieldValue } = require("./_firebase");
const { withAuth, MAX_STREAK_FREEZES } = require("./_lib");

module.exports = withAuth(async (data, token) => {
  return db.runTransaction(async transaction => {
    const userRef = db.doc(`users/${token.uid}`);
    const userSnap = await transaction.get(userRef);
    const user = userSnap.exists ? userSnap.data() : {};
    const maxStreakFreezes = user.maxStreakFreezes || MAX_STREAK_FREEZES;
    const current = user.streakFreezes || 0;
    const next = Math.min(maxStreakFreezes, current + 1);

    transaction.set(userRef, { streakFreezes: next, maxStreakFreezes, updatedAt: FieldValue.serverTimestamp() }, { merge: true });

    return { streakFreezes: next, maxStreakFreezes, granted: next > current };
  });
});
