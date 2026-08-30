const { db, FieldPath } = require("./_firebase");
const {
  withAuth, pickFriendProfile, buildLeaderboard, evaluateMissions,
  getDateKeyForTimezone, normalizeTimezone, normalizeDailyGoalXp, shiftDateKey,
  DEBUG_ALWAYS_CLAIM_CHEST
} = require("./_lib");

// Dispatches on data.action for exactly the reason api/friends.js does: the
// Hobby plan caps a deployment at 12 serverless functions, and this file is
// already the "read-only per-user page data, keyed by timezone" endpoint - so
// the Profile heatmap's history shares it rather than adding a 13th function.
module.exports = withAuth(async (data, token) => {
  if (data.action === "activity") return getActivityHistory(data, token);
  return getHomeOverview(data, token);
});

async function getHomeOverview(data, token) {
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
    friendsPreview,
    todayXp: dailyStats.xp || 0,
    dailyGoalXp: normalizeDailyGoalXp(user.dailyGoalXp)
  };
}

// 53 weeks x 7 rows - the widest grid the Profile page can draw. It picks how
// many of those weeks to show from the card's width (activityWeeksThatFit in
// js/profile.js) and always draws the trailing end, so this is the ceiling
// rather than a fixed frame. Sent whole so widening the window - a desktop
// card, or a rotation - never needs a second round trip.
const HISTORY_DAYS = 371;

async function getActivityHistory(data, token) {
  const timezone = normalizeTimezone(data.timezone);
  const todayKey = getDateKeyForTimezone(new Date(), timezone);
  const startKey = shiftDateKey(todayKey, -(HISTORY_DAYS - 1));

  // dailyStats doc ids *are* the date keys (see complete-practice-session.js),
  // so a documentId() range is the whole query - no extra field, no composite
  // index, and days the player never practised simply aren't there. Those come
  // back as gaps and the client fills them in as empty cells.
  const snapshot = await db.collection(`users/${token.uid}/dailyStats`)
    .orderBy(FieldPath.documentId())
    .startAt(startKey)
    .endAt(todayKey)
    .get();

  const days = snapshot.docs.map(doc => {
    const stats = doc.data();
    return {
      date: doc.id,
      xp: stats.xp || 0,
      sessions: stats.sessions || 0,
      correctAnswers: stats.correctAnswers || 0,
      wrongAnswers: stats.wrongAnswers || 0
    };
  });

  return { todayKey, windowDays: HISTORY_DAYS, days };
}
