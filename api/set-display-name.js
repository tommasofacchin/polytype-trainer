const { db, FieldValue } = require("./_firebase");
const { withAuth, normalizeDisplayName } = require("./_lib");

module.exports = withAuth(async (data, token) => {
  const displayName = normalizeDisplayName(data.name);
  const now = FieldValue.serverTimestamp();

  const userRef = db.doc(`users/${token.uid}`);
  const publicRef = db.doc(`publicProfiles/${token.uid}`);

  await Promise.all([
    userRef.set({ displayName, updatedAt: now }, { merge: true }),
    publicRef.set({ displayName, updatedAt: now }, { merge: true })
  ]);

  return { displayName };
});
