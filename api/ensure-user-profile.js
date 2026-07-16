const { db, FieldValue } = require("./_firebase");
const {
  withAuth, getAuthProfile, buildDefaultUserProfile, buildPublicProfile,
  sanitizeUserProfile, normalizeTimezone
} = require("./_lib");

module.exports = withAuth(async (data, token) => {
  const authProfile = getAuthProfile(token);
  const timezone = normalizeTimezone(data.timezone);
  const badgesSnap = await db.collection(`users/${token.uid}/badges`).get();
  const badges = badgesSnap.docs.map(doc => doc.id);

  return db.runTransaction(async transaction => {
    const userRef = db.doc(`users/${token.uid}`);
    const publicRef = db.doc(`publicProfiles/${token.uid}`);
    const userSnap = await transaction.get(userRef);
    const baseProfile = buildDefaultUserProfile(token.uid, authProfile, timezone);
    const now = FieldValue.serverTimestamp();

    const rawExisting = userSnap.exists ? userSnap.data() : null;
    const userProfile = rawExisting
      ? { ...baseProfile, ...rawExisting, email: rawExisting.email || authProfile.email, timezone }
      : baseProfile;

    // One-time migration: coins used to be a single balance shared across
    // every language: now each course has its own (see start-course.js/
    // buy-key.js). Copy the legacy balance onto every course already in
    // progress, rather than splitting it, so nobody feels like they lost
    // coins. A brand-new account never has this field, so this only ever
    // runs once per pre-existing player.
    const legacyCoins = typeof rawExisting?.coins === "number" ? Math.max(0, Math.trunc(rawExisting.coins)) : null;
    if (legacyCoins !== null) {
      userProfile.courses = Object.fromEntries(
        Object.entries(userProfile.courses || {}).map(([courseId, course]) => [
          courseId,
          { ...course, coins: (course.coins || 0) + legacyCoins }
        ])
      );
    }
    delete userProfile.coins;

    if (!userSnap.exists) {
      transaction.set(userRef, { ...userProfile, createdAt: now, updatedAt: now, lastActiveAt: now });
    } else {
      const updatePayload = { email: userProfile.email, timezone, updatedAt: now, lastActiveAt: now };
      if (legacyCoins !== null) {
        updatePayload.coins = FieldValue.delete();
        updatePayload.courses = userProfile.courses;
      }
      transaction.set(userRef, updatePayload, { merge: true });
    }

    const publicProfile = buildPublicProfile(
      token.uid,
      userProfile,
      authProfile
    );
    transaction.set(publicRef, { ...publicProfile, updatedAt: now }, { merge: true });

    return {
      user: { ...sanitizeUserProfile(userProfile), badges },
      publicProfile
    };
  });
});
