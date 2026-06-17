const { db, FieldValue } = require("./_firebase");
const { withAuth, normalizeHandle, ApiError } = require("./_lib");

module.exports = withAuth(async (data, token) => {
  const handle = normalizeHandle(data.handle);

  return db.runTransaction(async transaction => {
    const userRef = db.doc(`users/${token.uid}`);
    const publicRef = db.doc(`publicProfiles/${token.uid}`);
    const usernameRef = db.doc(`usernames/${handle}`);
    const userSnap = await transaction.get(userRef);
    const usernameSnap = await transaction.get(usernameRef);

    if (usernameSnap.exists && usernameSnap.data().uid !== token.uid) {
      throw new ApiError(409, "This handle is already taken.");
    }

    const previousHandle = userSnap.exists ? userSnap.data().handle : null;
    const previousHandleRef = previousHandle && previousHandle !== handle
      ? db.doc(`usernames/${previousHandle}`)
      : null;

    if (previousHandleRef) transaction.delete(previousHandleRef);

    const now = FieldValue.serverTimestamp();
    transaction.set(usernameRef, { uid: token.uid, handle, updatedAt: now });
    transaction.set(userRef, { handle, updatedAt: now }, { merge: true });
    transaction.set(publicRef, { handle, updatedAt: now }, { merge: true });

    return { handle };
  });
});
