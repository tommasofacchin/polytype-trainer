const { db } = require("./_firebase");
const {
  withAuth, calculateStreakUpdate, getDateKeyForTimezone, normalizeTimezone
} = require("./_lib");
const {
  readFriendshipStateForSprint, projectFriendshipStreaksForSprint
} = require("./_sprint-end");

// What the end-of-sprint screens will say, asked for at the *start* of a run.
//
// The flame page and the friends page are pure consequences of state that's
// already settled when the run begins - whether today has been practised yet,
// and which friends have played their own sprint - so js/sprint.js prefetches
// them here while the player is on round one. That way both screens open the
// instant the last round ends instead of after the save round trip, which is
// what used to leave the result "loading" for a couple of seconds.
//
// Read-only on purpose: nothing here commits the session, and the save is
// still the only thing that advances a streak or a friendship. It runs the
// exact same calculateStreakUpdate / projectFriendshipStreaksForSprint the
// save does (against the same stored state), so the preview and the
// authoritative answer agree unless something actually changed in between -
// e.g. a session played on another device mid-run, which the save's own
// numbers then correct.
module.exports = withAuth(async (data, token) => {
  const [userSnap, friendsReadState] = await Promise.all([
    db.doc(`users/${token.uid}`).get(),
    readFriendshipStateForSprint(token.uid).catch(err => {
      console.error("friendship streak preview read failed", err);
      return null;
    })
  ]);

  const user = userSnap.exists ? userSnap.data() : null;
  const timezone = normalizeTimezone(data.timezone || user?.timezone);
  const todayKey = getDateKeyForTimezone(new Date(), timezone);

  const streak = calculateStreakUpdate({
    currentStreak: user?.currentStreak || 0,
    longestStreak: user?.longestStreak || 0,
    lastPracticeDate: user?.lastPracticeDate || null,
    streakFreezes: user?.streakFreezes || 0,
    todayKey
  });

  return {
    streak,
    friendsStatus: projectFriendshipStreaksForSprint(token.uid, friendsReadState).statuses
  };
});
