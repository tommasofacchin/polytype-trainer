const { db, FieldValue } = require("./_firebase");
const {
  withAuth, normalizeUid, normalizeSearchQuery, cleanRequiredString,
  pickFriendProfile, buildLeaderboard, getFriendPairId,
  SEARCH_RESULTS_LIMIT, MIN_SEARCH_LENGTH, ApiError
} = require("./_lib");

// Consolidated so this counts as a single Vercel serverless function
// (Hobby plan caps a deployment at 12) - dispatches on data.action instead
// of one file per friends operation.
module.exports = withAuth(async (data, token) => {
  switch (data.action) {
    case "overview": return getOverview(token);
    case "search": return searchUsers(data, token);
    case "profile": return getPublicProfile(data, token);
    case "send": return sendFriendRequest(data, token);
    case "respond": return respondFriendRequest(data, token);
    case "remove": return removeFriend(data, token);
    default: throw new ApiError(400, "Unknown friends action.");
  }
});

async function getOverview(token) {
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
}

async function searchUsers(data, token) {
  const query = normalizeSearchQuery(data.query);

  if (query.length < MIN_SEARCH_LENGTH) {
    return { results: [] };
  }

  // Firestore has no native LIKE/contains, so we combine an indexed prefix
  // range (cheap, catches "starts with") with a bounded in-memory substring
  // scan (catches matches anywhere in the handle) and merge the two.
  const prefixSnap = await db.collection("usernames")
    .orderBy("handle")
    .startAt(query)
    .endAt(query + "")
    .limit(SEARCH_RESULTS_LIMIT)
    .get();

  const candidateUids = new Set(
    prefixSnap.docs.map(doc => doc.data().uid).filter(uid => uid && uid !== token.uid)
  );

  if (candidateUids.size < SEARCH_RESULTS_LIMIT) {
    const scanSnap = await db.collection("usernames").limit(500).get();
    scanSnap.docs.forEach(doc => {
      const entry = doc.data();
      if (entry.uid && entry.uid !== token.uid && entry.handle?.includes(query)) {
        candidateUids.add(entry.uid);
      }
    });
  }

  const uids = Array.from(candidateUids).slice(0, SEARCH_RESULTS_LIMIT);
  if (!uids.length) {
    return { results: [] };
  }

  const results = await Promise.all(
    uids.map(uid => buildSearchResult(token.uid, uid))
  );

  return { results: results.filter(Boolean) };
}

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

async function getPublicProfile(data, token) {
  const uid = normalizeUid(data.uid);
  if (!uid) throw new ApiError(400, "uid is required.");
  if (uid === token.uid) throw new ApiError(400, "Use your own profile page instead.");

  const [result, badgesSnap] = await Promise.all([
    buildSearchResult(token.uid, uid),
    db.collection(`users/${uid}/badges`).get()
  ]);

  if (!result) throw new ApiError(404, "User not found.");

  return { ...result, badges: badgesSnap.docs.map(doc => doc.id) };
}

async function sendFriendRequest(data, token) {
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
}

async function respondFriendRequest(data, token) {
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
}

async function removeFriend(data, token) {
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
}

function toMillis(timestamp) {
  return timestamp && typeof timestamp.toMillis === "function" ? timestamp.toMillis() : null;
}
