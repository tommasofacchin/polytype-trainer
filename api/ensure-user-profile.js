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

    const userProfile = userSnap.exists
      ? { ...baseProfile, ...userSnap.data(), email: userSnap.data().email || authProfile.email, timezone }
      : baseProfile;

    if (!userSnap.exists) {
      transaction.set(userRef, { ...userProfile, createdAt: now, updatedAt: now, lastActiveAt: now });
    } else {
      transaction.set(userRef, { email: userProfile.email, timezone, updatedAt: now, lastActiveAt: now }, { merge: true });
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
