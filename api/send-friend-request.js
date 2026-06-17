const { db, FieldValue } = require("./_firebase");
const { withAuth, normalizeUid, pickFriendProfile, getFriendPairId, ApiError } = require("./_lib");

module.exports = withAuth(async (data, token) => {
  const toUid = normalizeUid(data.toUid);
  if (toUid === token.uid) throw new ApiError(400, "You cannot add yourself as a friend.");

  return db.runTransaction(async transaction => {
    const requestRef = db.doc(`friendRequests/${getFriendPairId(token.uid, toUid)}`);
    const fromPublicRef = db.doc(`publicProfiles/${token.uid}`);
    const toPublicRef = db.doc(`publicProfiles/${toUid}`);

    const requestSnap = await transaction.get(requestRef);
    const fromPublicSnap = await transaction.get(fromPublicRef);
    const toPublicSnap = await transaction.get(toPublicRef);

    if (!toPublicSnap.exists) throw new ApiError(404, "User not found.");

    if (requestSnap.exists) {
      const status = requestSnap.data().status;
      if (status === "pending") throw new ApiError(409, "A friend request already exists.");
      if (status === "accepted") throw new ApiError(409, "You are already friends.");
    }

    const now = FieldValue.serverTimestamp();
    transaction.set(requestRef, {
      fromUid: token.uid,
      toUid,
      status: "pending",
      fromProfile: fromPublicSnap.exists ? pickFriendProfile(fromPublicSnap.data()) : null,
      toProfile: pickFriendProfile(toPublicSnap.data()),
      createdAt: now,
      updatedAt: now,
      respondedAt: null
    });

    return { requestId: requestRef.id, status: "pending" };
  });
});
