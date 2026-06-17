const { db, FieldValue } = require("./_firebase");
const { withAuth, normalizeUid, ApiError } = require("./_lib");

module.exports = withAuth(async (data, token) => {
  const friendUid = normalizeUid(data.friendUid);
  if (friendUid === token.uid) throw new ApiError(400, "Invalid friend UID.");

  await db.runTransaction(async transaction => {
    const ownFriendRef = db.doc(`users/${token.uid}/friends/${friendUid}`);
    const otherFriendRef = db.doc(`users/${friendUid}/friends/${token.uid}`);
    const ownFriendSnap = await transaction.get(ownFriendRef);
    const otherFriendSnap = await transaction.get(otherFriendRef);
    const now = FieldValue.serverTimestamp();

    if (ownFriendSnap.exists) {
      transaction.delete(ownFriendRef);
      transaction.set(db.doc(`users/${token.uid}`), { friendCount: FieldValue.increment(-1), updatedAt: now }, { merge: true });
    }
    if (otherFriendSnap.exists) {
      transaction.delete(otherFriendRef);
      transaction.set(db.doc(`users/${friendUid}`), { friendCount: FieldValue.increment(-1), updatedAt: now }, { merge: true });
    }
  });

  return { friendUid, removed: true };
});
