const { db, FieldPath } = require("./_firebase");
const { withAuth, getDateKeyForTimezone, normalizeTimezone, shiftDateKey } = require("./_lib");

// 13 weeks x 7 rows - the grid the Profile page draws (.activity-grid). Kept
// here rather than on the client so the query and the drawing can never
// disagree about how far back the window reaches.
const HISTORY_DAYS = 91;

module.exports = withAuth(async (data, token) => {
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
});
