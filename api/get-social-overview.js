const { db } = require("./_firebase");
const { withAuth, pickFriendProfile, buildLeaderboard } = require("./_lib");

module.exports = withAuth(async (data, token) => {
  const [selfSnap, friendsSnap, incomingSnap, outgoingSnap] = await Promise.all([
    db.doc(`publicProfiles/${token.uid}`).get(),
    db.collection(`users/${token.uid}/friends`).get(),
    db.collection("friendRequests").where("toUid", "==", token.uid).get(),
    db.collection("friendRequests").where("fromUid", "==", token.uid).get()
  ]);

  const friendUids = friendsSnap.docs.map(doc => doc.id);
  const friendProfileSnaps = friendUids.length
    ? await db.getAll(...friendUids.map(uid => db.doc(`publicProfiles/${uid}`)))
    : [];

  const leaderboardEntries = [];

  if (selfSnap.exists) {
    leaderboardEntries.push({ ...pickFriendProfile(selfSnap.data()), isSelf: true });
  }

  friendProfileSnaps.forEach(snap => {
    if (snap.exists) {
      leaderboardEntries.push({ ...pickFriendProfile(snap.data()), isSelf: false });
    }
  });

  const leaderboard = buildLeaderboard(leaderboardEntries);

  const incomingRequests = incomingSnap.docs
    .filter(doc => doc.data().status === "pending")
    .map(doc => ({
      requestId: doc.id,
      fromUid: doc.data().fromUid,
      profile: doc.data().fromProfile || null,
      createdAt: toMillis(doc.data().createdAt)
    }));

  const outgoingRequests = outgoingSnap.docs
    .filter(doc => doc.data().status === "pending")
    .map(doc => ({
      requestId: doc.id,
      toUid: doc.data().toUid,
      profile: doc.data().toProfile || null,
      createdAt: toMillis(doc.data().createdAt)
    }));

  return {
    leaderboard,
    incomingRequests,
    outgoingRequests,
    friendCount: friendUids.length
  };
});

function toMillis(timestamp) {
  return timestamp && typeof timestamp.toMillis === "function" ? timestamp.toMillis() : null;
}
