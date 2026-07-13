const { db } = require("./_firebase");
const {
  withAuth,
  normalizeSearchQuery,
  getFriendPairId,
  pickFriendProfile,
  SEARCH_RESULTS_LIMIT,
  MIN_SEARCH_LENGTH
} = require("./_lib");

module.exports = withAuth(async (data, token) => {
  const query = normalizeSearchQuery(data.query);

  if (query.length < MIN_SEARCH_LENGTH) {
    return { results: [] };
  }

  const usernameSnap = await db.collection("usernames")
    .orderBy("handle")
    .startAt(query)
    .endAt(query + "")
    .limit(SEARCH_RESULTS_LIMIT)
    .get();

  const candidateUids = usernameSnap.docs
    .map(doc => doc.data().uid)
    .filter(uid => uid && uid !== token.uid);

  if (!candidateUids.length) {
    return { results: [] };
  }

  const results = await Promise.all(
    candidateUids.map(uid => buildSearchResult(token.uid, uid))
  );

  return { results: results.filter(Boolean) };
});

async function buildSearchResult(myUid, uid) {
  const [publicSnap, friendSnap, requestSnap] = await Promise.all([
    db.doc(`publicProfiles/${uid}`).get(),
    db.doc(`users/${myUid}/friends/${uid}`).get(),
    db.doc(`friendRequests/${getFriendPairId(myUid, uid)}`).get()
  ]);

  if (!publicSnap.exists) return null;

  let relationship = "none";
  let requestId = null;

  if (friendSnap.exists) {
    relationship = "friends";
  } else if (requestSnap.exists && requestSnap.data().status === "pending") {
    requestId = requestSnap.id;
    relationship = requestSnap.data().fromUid === myUid ? "pending_outgoing" : "pending_incoming";
  }

  return { ...pickFriendProfile(publicSnap.data()), relationship, requestId };
}
