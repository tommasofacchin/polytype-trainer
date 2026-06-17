const { db, FieldValue } = require("./_firebase");
const {
  withAuth, getAuthProfile, buildDefaultUserProfile, buildPublicProfile,
  sanitizeUserProfile, normalizeTimezone
} = require("./_lib");

module.exports = withAuth(async (data, token) => {
  const authProfile = getAuthProfile(token);
  const timezone = normalizeTimezone(data.timezone);

  return db.runTransaction(async transaction => {
    const userRef = db.doc(`users/${token.uid}`);
    const publicRef = db.doc(`publicProfiles/${token.uid}`);
    const userSnap = await transaction.get(userRef);
    const baseProfile = buildDefaultUserProfile(token.uid, authProfile, timezone);
    const now = FieldValue.serverTimestamp();

    if (!userSnap.exists) {
      transaction.set(userRef, { ...baseProfile, createdAt: now, updatedAt: now, lastActiveAt: now });
    } else {
      transaction.set(userRef, { displayName: authProfile.displayName, avatarUrl: authProfile.avatarUrl, timezone, updatedAt: now, lastActiveAt: now }, { merge: true });
    }

    const publicProfile = buildPublicProfile(
      token.uid,
      userSnap.exists ? { ...baseProfile, ...userSnap.data() } : baseProfile,
      authProfile
    );
    transaction.set(publicRef, { ...publicProfile, updatedAt: now }, { merge: true });

    return {
      user: sanitizeUserProfile(userSnap.exists ? { ...baseProfile, ...userSnap.data(), ...authProfile, timezone } : baseProfile),
      publicProfile
    };
  });
});
