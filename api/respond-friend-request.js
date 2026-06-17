const { db, FieldValue } = require("./_firebase");
const { withAuth, cleanRequiredString, pickFriendProfile, ApiError } = require("./_lib");

module.exports = withAuth(async (data, token) => {
  const requestId = cleanRequiredString(data.requestId, "requestId");
  const accept = Boolean(data.accept);

  return db.runTransaction(async transaction => {
    const requestRef = db.doc(`friendRequests/${requestId}`);
    const requestSnap = await transaction.get(requestRef);

    if (!requestSnap.exists) throw new ApiError(404, "Friend request not found.");

    const friendRequest = requestSnap.data();
    if (friendRequest.toUid !== token.uid) throw new ApiError(403, "Only the recipient can respond.");
    if (friendRequest.status !== "pending") throw new ApiError(422, "This request is no longer pending.");

    const fromPublicSnap = await transaction.get(db.doc(`publicProfiles/${friendRequest.fromUid}`));
    const toPublicSnap = await transaction.get(db.doc(`publicProfiles/${friendRequest.toUid}`));

    const nextStatus = accept ? "accepted" : "declined";
    const now = FieldValue.serverTimestamp();

    transaction.update(requestRef, { status: nextStatus, respondedAt: now, updatedAt: now });

    if (accept) {
      transaction.set(db.doc(`users/${friendRequest.fromUid}/friends/${friendRequest.toUid}`), {
        friendUid: friendRequest.toUid,
        profile: toPublicSnap.exists ? pickFriendProfile(toPublicSnap.data()) : null,
        since: now
      });
      transaction.set(db.doc(`users/${friendRequest.toUid}/friends/${friendRequest.fromUid}`), {
        friendUid: friendRequest.fromUid,
        profile: fromPublicSnap.exists ? pickFriendProfile(fromPublicSnap.data()) : null,
        since: now
      });
      transaction.set(db.doc(`users/${friendRequest.fromUid}`), { friendCount: FieldValue.increment(1), updatedAt: now }, { merge: true });
      transaction.set(db.doc(`users/${friendRequest.toUid}`), { friendCount: FieldValue.increment(1), updatedAt: now }, { merge: true });
    }

    return { requestId, status: nextStatus };
  });
});
