const { db, FieldValue } = require("./_firebase");
const { getDateKeyForTimezone, diffDateKeys, getFriendPairId } = require("./_lib");

// Pair-wise "friendship streak", shown on the sprint result screen: rises by
// 1 for a pair only on a day both members play at least one sprint. Uses a
// UTC day boundary (not each user's own timezone, unlike the personal streak
// in calculateStreakUpdate) so both sides of a friendship agree on what
// "today" means regardless of where each player lives. Updates lazily -
// whichever friend plays sprint *second* on a given day is the one whose
// call actually advances the shared streak.
//
// Split into read / project / commit because two endpoints need different
// parts of it: api/complete-practice-session.js runs all three (the save is
// what actually advances a pair), while api/preview-sprint-end.js runs the
// first two only - the sprint page asks it, at the *start* of a run, what
// the friends screen will say at the end, so that screen can open the moment
// the last round does instead of after the save round trip. Both come out of
// the same projection, so the preview and the real thing can't disagree.

// Read half, safe to run concurrently with the session transaction: whether a
// friend counts as having played today reads *their* lastSprintPlayedDate, and
// the pair docs are only ever touched by this function - neither sees anything
// the transaction writes, and neither depends on this player's own
// lastSprintPlayedDate write (that one exists purely so the *friend's* next
// sprint can see the day as mutual).
async function readFriendshipStateForSprint(uid) {
  // Captured once here and reused for the writes below rather than recomputed
  // after the commit, so `playedToday` and `lastBothPlayedDate` can't end up
  // disagreeing about "today" for a session that straddles UTC midnight.
  const todayKey = getDateKeyForTimezone(new Date(), "UTC");

  const friendsSnap = await db.collection(`users/${uid}/friends`).get();
  const friendUids = friendsSnap.docs.map(doc => doc.id);

  // db.getAll() rejects an empty argument list, hence the early out.
  if (!friendUids.length) {
    return { todayKey, friendUids: [], friendPublicSnaps: [], pairSnaps: [] };
  }

  const [friendPublicSnaps, pairSnaps] = await Promise.all([
    db.getAll(...friendUids.map(friendUid => db.doc(`publicProfiles/${friendUid}`))),
    db.getAll(...friendUids.map(friendUid => db.doc(`friendships/${getFriendPairId(uid, friendUid)}`)))
  ]);

  return { todayKey, friendUids, friendPublicSnaps, pairSnaps };
}

// Pure: what each row of the friends screen reads once a sprint played *now*
// counts, plus the pair docs that has to move. Writes nothing - the caller
// decides whether this is a real session (commit below) or a preview.
function projectFriendshipStreaksForSprint(uid, readState) {
  if (!readState) return { statuses: [], pairUpdates: [] };

  const { todayKey, friendUids, friendPublicSnaps, pairSnaps } = readState;
  const pairUpdates = [];

  const statuses = friendUids.map((friendUid, index) => {
    const friendPublic = friendPublicSnaps[index].exists ? friendPublicSnaps[index].data() : null;
    const playedToday = friendPublic?.lastSprintPlayedDate === todayKey;
    const pairSnap = pairSnaps[index];
    const pairData = pairSnap.exists ? pairSnap.data() : null;
    let streak = pairData?.streak || 0;

    if (playedToday && pairData?.lastBothPlayedDate !== todayKey) {
      const elapsedDays = pairData?.lastBothPlayedDate
        ? diffDateKeys(pairData.lastBothPlayedDate, todayKey)
        : null;
      streak = elapsedDays === 1 ? streak + 1 : 1;
      pairUpdates.push({
        ref: pairSnap.ref,
        data: {
          uids: [uid, friendUid].sort(),
          streak,
          lastBothPlayedDate: todayKey
        }
      });
    }

    return {
      uid: friendUid,
      displayName: friendPublic?.displayName || "Player",
      avatarUrl: friendPublic?.avatarUrl || null,
      handle: friendPublic?.handle || null,
      playedToday,
      friendshipStreak: streak
    };
  });

  statuses.sort((a, b) => {
    if (a.playedToday !== b.playedToday) return a.playedToday ? -1 : 1;
    return (b.friendshipStreak || 0) - (a.friendshipStreak || 0);
  });

  return { statuses, pairUpdates };
}

// Write half, deliberately after the session transaction has committed.
async function commitFriendshipStreaksForSprint(uid, readState) {
  if (!readState) return [];

  const { todayKey, friendUids } = readState;
  const now = FieldValue.serverTimestamp();
  const { statuses, pairUpdates } = projectFriendshipStreaksForSprint(uid, readState);

  const ownWrite = db.doc(`publicProfiles/${uid}`).set(
    { lastSprintPlayedDate: todayKey },
    { merge: true }
  );

  if (!friendUids.length) {
    await ownWrite;
    return [];
  }

  await Promise.all([
    ownWrite,
    ...pairUpdates.map(update => update.ref.set({ ...update.data, updatedAt: now }, { merge: true }))
  ]);

  return statuses;
}

module.exports = {
  readFriendshipStateForSprint,
  projectFriendshipStreaksForSprint,
  commitFriendshipStreaksForSprint
};
