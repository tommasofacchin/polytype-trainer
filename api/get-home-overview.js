const { db } = require("./_firebase");
const {
  withAuth, pickFriendProfile, buildLeaderboard, evaluateMissions,
  getDateKeyForTimezone, normalizeTimezone, DEBUG_ALWAYS_CLAIM_CHEST
} = require("./_lib");

module.exports = withAuth(async (data, token) => {
  const userRef = db.doc(`users/${token.uid}`);
  const [userSnap, friendsSnap, selfPublicSnap] = await Promise.all([
    userRef.get(),
    db.collection(`users/${token.uid}/friends`).get(),
    db.doc(`publicProfiles/${token.uid}`).get()
  ]);

  const user = userSnap.exists ? userSnap.data() : {};
  const timezone = normalizeTimezone(data.timezone || user.timezone);
  const todayKey = getDateKeyForTimezone(new Date(), timezone);

  const dailyStatsSnap = await userRef.collection("dailyStats").doc(todayKey).get();
  const dailyStats = dailyStatsSnap.exists ? dailyStatsSnap.data() : {};

  const missions = evaluateMissions(token.uid, todayKey, dailyStats);
  const chestReady = DEBUG_ALWAYS_CLAIM_CHEST || user.lastChestClaimedDate !== todayKey;

  const friendUids = friendsSnap.docs.map(doc => doc.id);
  const friendProfileSnaps = friendUids.length
    ? await db.getAll(...friendUids.map(uid => db.doc(`publicProfiles/${uid}`)))
    : [];

  const entries = [];
  if (selfPublicSnap.exists) entries.push({ ...pickFriendProfile(selfPublicSnap.data()), isSelf: true });
  friendProfileSnaps.forEach(snap => {
    if (snap.exists) entries.push({ ...pickFriendProfile(snap.data()), isSelf: false });
  });

  const friendsPreview = buildLeaderboard(entries).slice(0, 3);

  return {
    chestReady,
    missions,
    friendsPreview
  };
});
