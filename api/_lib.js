const DEFAULT_TIMEZONE = "UTC";
const DEFAULT_DAILY_GOAL_XP = 50;
const DAILY_GOAL_XP_OPTIONS = new Set([20, 50, 100, 200]);
const MAX_STREAK_FREEZES = 2;
const WORDS_PER_LEVEL = 5;
const MAX_SESSION_XP = 500;
const SEARCH_RESULTS_LIMIT = 10;
const MIN_SEARCH_LENGTH = 2;
const HANDLE_PATTERN = /^[a-z0-9_]{3,20}$/;
// Real category/word-suffix data, sorted by `order` - same file the browser
// loads as window.POLYTYPE_CATEGORIES (see scripts/generate-categories.cjs,
// which emits both a browser global and this CommonJS export).
const CATEGORIES = require("../decks/categories.js").slice().sort((a, b) => a.order - b.order);
const CATEGORY_SIZES = CATEGORIES.map(category => category.size);
const TOTAL_CATEGORY_WORDS = CATEGORY_SIZES.reduce((sum, size) => sum + size, 0);
const VALID_WORD_SUFFIXES = new Set(CATEGORIES.flatMap(category => category.wordSuffixes));
// Same files the browser merges into window.POLYTYPE_LESSONS (see
// decks/lessons-norwegian.js / decks/lessons-swedish.js) - lesson id order IS
// unlock order, so this is the one place a lessonId's position in the sequence
// is validated against. Each file exports its own { <course>: [...] } slice;
// merge them into one map keyed by course.
const LESSONS_BY_COURSE = {
  ...require("../decks/lessons-norwegian.js"),
  ...require("../decks/lessons-swedish.js"),
  ...require("../decks/lessons-german.js"),
  ...require("../decks/lessons-italian.js"),
  ...require("../decks/lessons-chinese.js"),
  ...require("../decks/lessons-japanese.js"),
  ...require("../decks/lessons-spanish.js")
};
const LESSON_IDS_BY_COURSE = Object.fromEntries(
  Object.entries(LESSONS_BY_COURSE).map(([courseId, lessons]) => [courseId, lessons.map(lesson => lesson.id)])
);
// Flat coin bonus for a lesson's very first completion (see
// api/complete-practice-session.js) - on top of that session's normal
// sessionCoins, same "small but real" scale as a single daily mission.
const LESSON_COIN_REWARD = 15;
const XP_PER_DROP = 50;
// A brand-new course needs a handful of words unlocked before any XP exists,
// otherwise there is nothing to practice to earn that first XP at all.
const STARTER_WORDS = 5;
// Words are earned automatically by XP but only become playable once the
// player spends a key to unlock a specific one (see api/unlock-word.js). At
// most this many keys can be held at once - earning more XP beyond that
// point doesn't grant additional keys until one is spent.
const MAX_KEYS = 5;
// Coins price of one shop-bought key (api/buy-key.js). Roughly "2 daily
// chests" - a meaningful but not trivial trade against XP-earned keys.
const KEY_PRICE_COINS = 100;
// Coins price of a word chest (api/buy-word-chest.js) - unlocks one random
// still-locked word directly, no key/hand-picking involved. Same price as a
// key today but tracked as its own constant so the two can diverge later.
const WORD_CHEST_PRICE_COINS = 100;
// Coins price of a streak freeze (api/buy-streak-freeze.js). Deliberately
// dearer than a key: a freeze protects a streak the player would otherwise
// have to re-earn, so it should stay a rare purchase rather than a routine
// way to buy back consistency. Charged against the *active course's* coin
// balance even though the freeze itself is user-level.
const STREAK_FREEZE_PRICE_COINS = 500;
// One level per 5 words of the deck, so this tracks the deck size: 500 words
// = 100 levels (see scripts/generate-categories.cjs).
const COURSE_LEVEL_CAPS = {
  chinese: 100,
  german: 100,
  italian: 100,
  japanese: 100,
  norwegian: 100,
  spanish: 100,
  swedish: 100
};

const GAME_TYPES = ["trainer", "memory", "dictate", "sprint", "lesson"];
// Guided first-course tutorial (see api/start-course.js): deck-intro (read
// the Deck explainer) -> buy-keys (spend the gifted 500 coins on 5 keys in
// the Shop) -> choose-words (spend those keys on 5 chosen words in the
// Deck) -> play-sprint (finish one Sprint session) -> done. Only ever
// started for a brand-new account's very first course - every other course
// (this one included, for returning players) just gets 5 keys silently.
const TUTORIAL_STEPS = ["deck-intro", "buy-keys", "choose-words", "play-sprint", "done"];
const TUTORIAL_STARTER_COINS = 500;
const TUTORIAL_STARTER_KEYS = 5;
const CHEST_COIN_REWARD = 50;
const CHEST_XP_REWARD = 20;
// Debug-only: set DEBUG_ALWAYS_CLAIM_CHEST=true in the environment to let the
// daily chest be reopened on every claim instead of once per day. Never set
// this in production - it lets any signed-in user farm coins/XP at will.
const DEBUG_ALWAYS_CLAIM_CHEST = process.env.DEBUG_ALWAYS_CLAIM_CHEST === "true";

// Small fixed pool; 3 are picked deterministically per (uid, date) so the set
// rotates daily without needing a cron job or extra Firestore writes.
const MISSION_POOL = [
  { id: "earn_30_xp", metric: "xp", target: 30, coinReward: 30, labelKey: "mission.earn30Xp" },
  { id: "earn_50_xp", metric: "xp", target: 50, coinReward: 40, labelKey: "mission.earn50Xp" },
  { id: "earn_100_xp", metric: "xp", target: 100, coinReward: 70, labelKey: "mission.earn100Xp" },
  { id: "play_trainer", metric: "gameSessions.trainer", target: 1, coinReward: 40, labelKey: "mission.playTrainer" },
  { id: "play_memory", metric: "gameSessions.memory", target: 1, coinReward: 60, labelKey: "mission.playMemory" },
  { id: "play_dictate", metric: "gameSessions.dictate", target: 1, coinReward: 50, labelKey: "mission.playDictate" },
  { id: "play_sprint", metric: "gameSessions.sprint", target: 1, coinReward: 50, labelKey: "mission.playSprint" },
  { id: "correct_20", metric: "correctAnswers", target: 20, coinReward: 50, labelKey: "mission.correct20" }
];

// Evaluated (in order) against the updated user profile after every session;
// the first time a condition is met the badge is written and stays earned.
const BADGE_DEFINITIONS = [
  { id: "first_steps", icon: "star", labelKey: "badge.firstSteps", descriptionKey: "badge.firstStepsDesc", condition: user => (user.totalXp || 0) > 0 },
  { id: "streak_5", icon: "flame", labelKey: "badge.streak5", descriptionKey: "badge.streak5Desc", condition: user => (user.currentStreak || 0) >= 5 },
  { id: "streak_30", icon: "flame", labelKey: "badge.streak30", descriptionKey: "badge.streak30Desc", condition: user => (user.currentStreak || 0) >= 30 },
  { id: "word_master", icon: "book", labelKey: "badge.wordMaster", descriptionKey: "badge.wordMasterDesc", condition: user => Object.values(user.courses || {}).some(course => (course.wordsUnlocked || 0) >= 100) },
  { id: "chest_hunter", icon: "chest", labelKey: "badge.chestHunter", descriptionKey: "badge.chestHunterDesc", condition: (user, extra) => (extra.chestsClaimed || 0) >= 7 },
  { id: "level_10", icon: "star", labelKey: "badge.level10", descriptionKey: "badge.level10Desc", condition: user => (user.globalLevel || 1) >= 10 },
  { id: "lessons_10", icon: "book", labelKey: "badge.lessons10", descriptionKey: "badge.lessons10Desc", condition: user => Object.values(user.courses || {}).some(course => (course.lessonsCompleted?.length || 0) >= 10) },
  { id: "lessons_25", icon: "book", labelKey: "badge.lessons25", descriptionKey: "badge.lessons25Desc", condition: user => Object.values(user.courses || {}).some(course => (course.lessonsCompleted?.length || 0) >= 25) },
  // Only courses with an authored lesson sequence (LESSON_IDS_BY_COURSE) can
  // ever satisfy this - a course with 0 lessons defined must never read as
  // "all lessons complete" by vacuous truth.
  { id: "lessons_all", icon: "crown", labelKey: "badge.lessonsAll", descriptionKey: "badge.lessonsAllDesc", condition: user => Object.entries(user.courses || {}).some(([courseId, course]) => {
    const total = LESSON_IDS_BY_COURSE[courseId]?.length || 0;
    return total > 0 && (course.lessonsCompleted?.length || 0) >= total;
  }) },

  // Streak tiers above streak_30.
  { id: "streak_50", icon: "flame", labelKey: "badge.streak50", descriptionKey: "badge.streak50Desc", condition: user => (user.currentStreak || 0) >= 50 },
  { id: "streak_100", icon: "flame", labelKey: "badge.streak100", descriptionKey: "badge.streak100Desc", condition: user => (user.currentStreak || 0) >= 100 },
  { id: "streak_365", icon: "flame", labelKey: "badge.streak365", descriptionKey: "badge.streak365Desc", condition: user => (user.currentStreak || 0) >= 365 },

  // Vocabulary tiers around word_master (100): a lighter one below it, and
  // full-deck completion above it. TOTAL_CATEGORY_WORDS is the same constant
  // that caps how many words a course can ever have unlocked.
  { id: "words_50", icon: "book", labelKey: "badge.words50", descriptionKey: "badge.words50Desc", condition: user => Object.values(user.courses || {}).some(course => (course.wordsUnlocked || 0) >= 50) },
  { id: "deck_complete", icon: "crown", labelKey: "badge.deckComplete", descriptionKey: "badge.deckCompleteDesc", condition: user => Object.values(user.courses || {}).some(course => (course.wordsUnlocked || 0) >= TOTAL_CATEGORY_WORDS) },

  // Chest tiers above chest_hunter (7).
  { id: "chest_30", icon: "chest", labelKey: "badge.chest30", descriptionKey: "badge.chest30Desc", condition: (user, extra) => (extra.chestsClaimed || 0) >= 30 },
  { id: "chest_100", icon: "chest", labelKey: "badge.chest100", descriptionKey: "badge.chest100Desc", condition: (user, extra) => (extra.chestsClaimed || 0) >= 100 },

  // Languages studied and friends made.
  { id: "polyglot", icon: "globe", labelKey: "badge.polyglot", descriptionKey: "badge.polyglotDesc", condition: user => Object.keys(user.courses || {}).length >= 3 },
  { id: "social_butterfly", icon: "friends", labelKey: "badge.socialButterfly", descriptionKey: "badge.socialButterflyDesc", condition: user => (user.friendCount || 0) >= 5 },
  { id: "friend_squad", icon: "friends", labelKey: "badge.friendSquad", descriptionKey: "badge.friendSquadDesc", condition: user => (user.friendCount || 0) >= 20 },

  // In-session skill - only complete-practice-session.js's extra bag carries
  // sessionBestCombo/sessionCorrectAnswers/sessionWrongAnswers/practiceHour,
  // so these can only ever be newly earned from a practice session, never
  // from a daily chest claim (extra.foo defaults to falsy there, same as an
  // account that just hasn't played yet).
  { id: "combo_master", icon: "bolt", labelKey: "badge.comboMaster", descriptionKey: "badge.comboMasterDesc", condition: (user, extra) => (extra.sessionBestCombo || 0) >= 20 },
  { id: "flawless_round", icon: "target", labelKey: "badge.flawlessRound", descriptionKey: "badge.flawlessRoundDesc", condition: (user, extra) => (extra.sessionCorrectAnswers || 0) >= 20 && extra.sessionWrongAnswers === 0 },
  { id: "night_owl", icon: "moon", labelKey: "badge.nightOwl", descriptionKey: "badge.nightOwlDesc", condition: (user, extra) => typeof extra.practiceHour === "number" && extra.practiceHour < 7 },

  // Lifetime play patterns (see sessionsCompleted/gameTypesPlayed in
  // buildDefaultUserProfile and their updates in complete-practice-session.js).
  { id: "well_rounded", icon: "grid", labelKey: "badge.wellRounded", descriptionKey: "badge.wellRoundedDesc", condition: user => ["trainer", "memory", "dictate", "sprint"].every(type => user.gameTypesPlayed?.[type]) },
  { id: "veteran", icon: "medal", labelKey: "badge.veteran", descriptionKey: "badge.veteranDesc", condition: user => (user.sessionsCompleted || 0) >= 100 }
];

class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

function withAuth(handler) {
  return async (req, res) => {
    if (req.method !== "POST") return res.status(405).end();

    const token = (req.headers.authorization || "").replace("Bearer ", "");
    if (!token) return res.status(401).json({ error: "Unauthenticated." });

    const { auth } = require("./_firebase");
    let decodedToken;
    try {
      decodedToken = await auth.verifyIdToken(token);
    } catch {
      return res.status(401).json({ error: "Unauthenticated." });
    }

    try {
      const result = await handler(req.body || {}, decodedToken);
      return res.json({ data: result });
    } catch (err) {
      const status = Number(err?.status);
      if (err instanceof ApiError || (Number.isInteger(status) && status >= 400 && status < 600)) {
        return res.status(status).json({ error: err.message });
      }
      console.error(err);
      return res.status(500).json({ error: "Internal error." });
    }
  };
}

function buildDefaultUserProfile(uid, authProfile, timezone) {
  return {
    uid,
    handle: null,
    displayName: authProfile.displayName,
    avatarUrl: authProfile.avatarUrl,
    email: authProfile.email,
    timezone,
    totalXp: 0,
    globalLevel: 1,
    // Friends-leaderboard-only counter, reset lazily every Monday (see
    // getWeekKey/calculateWeeklyXpUpdate) - totalXp above never resets and
    // stays the source of truth for level/XP everywhere else.
    weeklyXp: 0,
    weekKey: null,
    currentStreak: 0,
    longestStreak: 0,
    lastPracticeDate: null,
    streakFreezes: 0,
    maxStreakFreezes: MAX_STREAK_FREEZES,
    friendCount: 0,
    lastChestClaimedDate: null,
    chestsClaimed: 0,
    dailyGoalXp: DEFAULT_DAILY_GOAL_XP,
    // Both are pure server bookkeeping for badge conditions below (well_
    // rounded / veteran) - never sanitized into the client-facing profile,
    // since the client only ever needs the resulting earned-badge ids.
    sessionsCompleted: 0,
    gameTypesPlayed: {},
    tutorial: null,
    courses: {}
  };
}

function buildPublicProfile(uid, user, authProfile) {
  return {
    uid,
    handle: user.handle || null,
    displayName: user.displayName || authProfile.displayName,
    avatarUrl: user.avatarUrl || authProfile.avatarUrl || null,
    totalXp: user.totalXp || 0,
    globalLevel: user.globalLevel || 1,
    weeklyXp: user.weeklyXp || 0,
    weekKey: typeof user.weekKey === "number" ? user.weekKey : null,
    currentStreak: user.currentStreak || 0,
    friendCount: user.friendCount || 0
  };
}

function sanitizeUserProfile(user) {
  const timezone = user.timezone || DEFAULT_TIMEZONE;

  return {
    uid: user.uid,
    handle: user.handle || null,
    displayName: user.displayName || "Player",
    avatarUrl: user.avatarUrl || null,
    timezone,
    totalXp: user.totalXp || 0,
    globalLevel: user.globalLevel || 1,
    // Resolved rather than echoed: see resolveCurrentStreak. The stored value
    // stays untouched until the next session writes it.
    currentStreak: resolveCurrentStreak({
      currentStreak: user.currentStreak || 0,
      lastPracticeDate: user.lastPracticeDate || null,
      streakFreezes: user.streakFreezes || 0,
      todayKey: getDateKeyForTimezone(new Date(), timezone)
    }),
    longestStreak: user.longestStreak || 0,
    lastPracticeDate: user.lastPracticeDate || null,
    streakFreezes: user.streakFreezes || 0,
    maxStreakFreezes: user.maxStreakFreezes || MAX_STREAK_FREEZES,
    friendCount: user.friendCount || 0,
    lastChestClaimedDate: user.lastChestClaimedDate || null,
    chestsClaimed: user.chestsClaimed || 0,
    dailyGoalXp: normalizeDailyGoalXp(user.dailyGoalXp),
    tutorial: sanitizeTutorial(user.tutorial),
    courses: sanitizeCoursesSummary(user.courses)
  };
}

function normalizeDailyGoalXp(value) {
  const xp = Math.trunc(Number(value));
  return DAILY_GOAL_XP_OPTIONS.has(xp) ? xp : DEFAULT_DAILY_GOAL_XP;
}

// Coins are per-course (see sanitizeCoursesSummary) - XP/level are the only
// progression numbers shared across every language a user studies.
function sanitizeTutorial(tutorial) {
  if (!tutorial || typeof tutorial !== "object") return null;
  if (!TUTORIAL_STEPS.includes(tutorial.step)) return null;
  return {
    active: Boolean(tutorial.active),
    step: tutorial.step,
    courseId: tutorial.courseId || null
  };
}

function sanitizeCoursesSummary(courses) {
  if (!courses || typeof courses !== "object") return {};
  return Object.fromEntries(
    Object.entries(courses).map(([courseId, course]) => {
      // Must round-trip the actual unlockedWords array, not just a count -
      // the trainer/memory/dictate/deck pages all derive their playable word
      // list from this set directly. Dropping it here made every page
      // reload silently reset a real course back to 0 unlocked words, since
      // the client's own "no course yet" starter-word fallback only
      // triggers when the course object is entirely missing, not when it's
      // present but missing this field.
      // Use resolveUnlockedWords (not a raw sanitizeUnlockedWords pass-
      // through) so a course still on the legacy categoryIndex/
      // categoryUnlocked format - never yet migrated to a real
      // unlockedWords array by an unlock/practice-session write - resolves
      // to the same set api/unlock-word.js validates against server-side.
      // Without this, such a course looked permanently locked to the
      // client while the server already considered its words unlocked,
      // producing "already unlocked" errors on cards still showing a lock.
      const unlockedWords = resolveUnlockedWords(course, false);
      return [
        courseId,
        {
          courseId: course.courseId || courseId,
          xp: course.xp || 0,
          level: course.level || 1,
          unlockedLevel: course.unlockedLevel || course.level || 1,
          unlockedWords,
          wordsUnlocked: unlockedWords.length,
          wordsMastered: course.wordsMastered || 0,
          // Must also round-trip purchasedKeys (api/buy-key.js) - otherwise a
          // page reload right after a purchase would silently drop it from
          // the client's cached course until the next full profile fetch.
          purchasedKeys: Math.max(0, Math.trunc(Number(course.purchasedKeys) || 0)),
          // Coins are per-course (this language's own balance), not a
          // shared user-level pool - see start-course.js/buy-key.js.
          coins: Math.max(0, Math.trunc(Number(course.coins) || 0)),
          // Must also round-trip like purchasedKeys above, for the same
          // reason - api/start-course.js, api/buy-key.js, api/unlock-word.js,
          // api/buy-word-chest.js and api/claim-daily-chest.js all copy this
          // field forward unchanged in their own courseResponse for the same
          // reason (see api/complete-practice-session.js for where it's
          // actually appended to).
          lessonsCompleted: sanitizeLessonsCompleted(course.lessonsCompleted, courseId)
        }
      ];
    })
  );
}

// Keeps only ids that are real, known lessons for this course, in case the
// lesson curriculum is ever trimmed/renamed - an unrecognized id just quietly
// drops instead of corrupting the unlock-frontier math in
// api/complete-practice-session.js (lessonIndex === lessonsCompleted.length).
function sanitizeLessonsCompleted(value, courseId) {
  if (!Array.isArray(value)) return [];
  const validIds = new Set(LESSON_IDS_BY_COURSE[courseId] || []);
  return value.filter(id => typeof id === "string" && validIds.has(id));
}

function sanitizeUnlockedWords(value) {
  if (!Array.isArray(value)) return [];
  return value.filter(suffix => Number.isInteger(suffix) && VALID_WORD_SUFFIXES.has(suffix));
}

// A word is "mastered" once it's been answered correctly this many times
// total (cumulative across sessions, not necessarily consecutive - a wrong
// answer doesn't erase progress already made, it's just a lighter bar than a
// streak-based scheme).
const WORD_MASTERY_THRESHOLD = 3;
// Bounds how many per-word results a single session can report - well above
// what any real session could produce (the longest sprint is ~20 rounds, and
// a course tops out at TOTAL_CATEGORY_WORDS=500 words), just here so a
// malformed/hostile payload can't force an unbounded write.
const MAX_WORD_RESULTS_PER_SESSION = 400;

function sanitizeWordResults(value) {
  if (!Array.isArray(value)) return [];
  return value
    .filter(entry =>
      entry && Number.isInteger(entry.id) && VALID_WORD_SUFFIXES.has(entry.id) && typeof entry.correct === "boolean")
    .slice(0, MAX_WORD_RESULTS_PER_SESSION)
    .map(entry => ({ id: entry.id, correct: entry.correct }));
}

// Pure so complete-practice-session.js can call it inside a transaction
// without any Firestore-specific shape leaking in here. Firestore map keys
// must be strings, hence String(id) - the numeric suffix is still what
// VALID_WORD_SUFFIXES/sanitizeWordResults validate against.
function applyWordResults(previousWordStats, wordResults) {
  const wordStats = { ...(previousWordStats || {}) };
  let wordsMasteredDelta = 0;

  for (const { id, correct } of wordResults) {
    const key = String(id);
    const prev = wordStats[key] || { correct: 0, wrong: 0, mastered: false };
    const nextCorrect = prev.correct + (correct ? 1 : 0);
    const nextMastered = prev.mastered || nextCorrect >= WORD_MASTERY_THRESHOLD;
    if (nextMastered && !prev.mastered) wordsMasteredDelta += 1;
    wordStats[key] = { correct: nextCorrect, wrong: prev.wrong + (correct ? 0 : 1), mastered: nextMastered };
  }

  return { wordStats, wordsMasteredDelta };
}

function getAuthProfile(token) {
  return {
    displayName: cleanOptionalString(token.name) || "Player",
    avatarUrl: cleanOptionalString(token.picture) || null,
    email: cleanOptionalString(token.email) || null
  };
}

function normalizeSessionPayload(data = {}) {
  const courseId = normalizeCourseId(data.courseId);
  const lessonId = cleanOptionalString(data.lessonId);
  const validLessonIds = new Set(LESSON_IDS_BY_COURSE[courseId] || []);

  return {
    courseId,
    timezone: cleanOptionalString(data.timezone),
    gameType: GAME_TYPES.includes(data.gameType) ? data.gameType : "trainer",
    // Only meaningful for gameType "lesson" - an unrecognized/mismatched id
    // (wrong course, typo, stale client) is dropped rather than throwing, so
    // the session's XP/coins/streak still land normally; it just won't
    // advance the lesson-unlock frontier (see complete-practice-session.js).
    lessonId: lessonId && validLessonIds.has(lessonId) ? lessonId : null,
    correctAnswers: clampInteger(data.correctAnswers, 0, 1000),
    wrongAnswers: clampInteger(data.wrongAnswers, 0, 1000),
    bestCombo: clampInteger(data.bestCombo, 0, 1000),
    wordsUsed: clampInteger(data.wordsUsed, 0, 1000),
    sessionSeconds: clampInteger(data.sessionSeconds, 0, 86400),
    wordResults: sanitizeWordResults(data.wordResults)
  };
}

function calculateSessionXp(session) {
  const answered = session.correctAnswers + session.wrongAnswers;
  if (answered === 0 || session.correctAnswers === 0) return 0;

  const accuracy = session.correctAnswers / answered;
  const baseXp = session.correctAnswers * 10;
  const comboBonus = Math.min(session.bestCombo, 20) * 2;
  const accuracyBonus = session.correctAnswers >= 10 && accuracy >= 0.9 ? 25 : 0;
  const perfectBonus = session.correctAnswers >= 20 && accuracy === 1 ? 50 : 0;

  return Math.min(MAX_SESSION_XP, baseXp + comboBonus + accuracyBonus + perfectBonus);
}

function calculateStreakUpdate({ currentStreak, longestStreak, lastPracticeDate, streakFreezes, todayKey }) {
  if (!lastPracticeDate) {
    return { currentStreak: 1, longestStreak: Math.max(longestStreak, 1), lastPracticeDate: todayKey, streakFreezes, freezeUsed: 0, streakAdvanced: true, streakReset: false };
  }

  const elapsedDays = diffDateKeys(lastPracticeDate, todayKey);

  if (elapsedDays <= 0) {
    return { currentStreak, longestStreak, lastPracticeDate, streakFreezes, freezeUsed: 0, streakAdvanced: false, streakReset: false };
  }

  if (elapsedDays === 1) {
    const nextStreak = currentStreak + 1;
    return { currentStreak: nextStreak, longestStreak: Math.max(longestStreak, nextStreak), lastPracticeDate: todayKey, streakFreezes, freezeUsed: 0, streakAdvanced: true, streakReset: false };
  }

  const missedDays = elapsedDays - 1;

  if (missedDays <= streakFreezes) {
    const nextStreak = currentStreak + 1;
    return { currentStreak: nextStreak, longestStreak: Math.max(longestStreak, nextStreak), lastPracticeDate: todayKey, streakFreezes: streakFreezes - missedDays, freezeUsed: missedDays, streakAdvanced: true, streakReset: false };
  }

  return { currentStreak: 1, longestStreak, lastPracticeDate: todayKey, streakFreezes: 0, freezeUsed: Math.min(streakFreezes, missedDays), streakAdvanced: true, streakReset: true };
}

// calculateStreakUpdate only ever runs when a session completes, so a stored
// currentStreak is a snapshot of the last day the player practised - someone
// who stops playing keeps that number on screen forever. This resolves what
// the stored streak is actually worth *today*.
//
// Read-only on purpose: the write (and the freeze spend) still happens on the
// next session via calculateStreakUpdate, and the two agree by construction -
// the freeze arithmetic below is the same one used there.
function resolveCurrentStreak({ currentStreak, lastPracticeDate, streakFreezes, todayKey }) {
  if (!currentStreak || !lastPracticeDate) return 0;

  const elapsedDays = diffDateKeys(lastPracticeDate, todayKey);

  // Practised today (0), or yesterday with today still open (1) - either way
  // the streak is alive and unchanged until they actually play again.
  if (elapsedDays <= 1) return currentStreak;

  const missedDays = elapsedDays - 1;
  return missedDays <= (streakFreezes || 0) ? currentStreak : 0;
}

function getLevelInfo(totalXp) {
  let level = 1;
  let currentXp = Math.max(0, totalXp);
  let nextXp = getXpForLevel(level);

  while (currentXp >= nextXp) {
    currentXp -= nextXp;
    level += 1;
    nextXp = getXpForLevel(level);
  }

  return { level, currentXp, nextXp, progress: Math.round((currentXp / nextXp) * 100) };
}

function getCourseLevel(courseId, totalXp) {
  const level = getLevelInfo(totalXp).level;
  const cap = COURSE_LEVEL_CAPS[courseId];
  return cap ? Math.min(level, cap) : level;
}

// Legacy (pre-keys) unlock state was a contiguous prefix: every category
// before `categoryIndex` fully unlocked, plus the first `categoryUnlocked`
// suffixes (in that category's fixed drop order) of the category at
// `categoryIndex`. Used only to migrate old course docs into a real
// unlockedWords set the first time they're touched under the new model.
function getUnlockedWordSuffixesFromPrefix(categoryIndex, categoryUnlocked) {
  const suffixes = [];
  CATEGORIES.forEach(category => {
    if (category.order < categoryIndex) {
      suffixes.push(...category.wordSuffixes);
    } else if (category.order === categoryIndex) {
      suffixes.push(...category.wordSuffixes.slice(0, categoryUnlocked));
    }
  });
  return suffixes;
}

// Resolves a course's actual set of unlocked word suffixes, migrating
// legacy prefix-based progress (categoryIndex/categoryUnlocked) or granting
// the fixed starter set for a brand-new course. Never touches courseXp -
// unlockedWords only ever grows through an explicit key spend
// (api/unlock-word.js).
function resolveUnlockedWords(existingCourse, isNewCourse) {
  if (Array.isArray(existingCourse?.unlockedWords)) {
    return sanitizeUnlockedWords(existingCourse.unlockedWords);
  }
  if (existingCourse && !isNewCourse) {
    return getUnlockedWordSuffixesFromPrefix(
      existingCourse.categoryIndex || 0,
      existingCourse.categoryUnlocked || 0
    );
  }
  return (CATEGORIES.find(category => category.order === 0)?.wordSuffixes || []).slice(0, STARTER_WORDS);
}

// How many keys the player currently holds: purchased via the Shop
// (api/buy-key.js) only, capped at MAX_KEYS - buying more beyond that cap
// doesn't grant more until one is spent (api/unlock-word.js).
function getKeysHeld(purchasedKeys) {
  return Math.max(0, Math.min(MAX_KEYS, Math.trunc(purchasedKeys) || 0));
}

function getXpForLevel(level) {
  return 400 + (level - 1) * 250;
}

function normalizeCourseId(value) {
  const courseId = cleanRequiredString(value, "courseId").toLowerCase();
  if (!/^[a-z0-9-]{2,40}$/.test(courseId)) throw new ApiError(400, "Invalid courseId.");
  return courseId;
}

function normalizeUid(value) {
  const uid = cleanRequiredString(value, "uid");
  if (uid.length > 128) throw new ApiError(400, "Invalid uid.");
  return uid;
}

function normalizeHandle(value) {
  const handle = cleanRequiredString(value, "handle").trim().toLowerCase();
  if (!HANDLE_PATTERN.test(handle)) throw new ApiError(400, "Handle must be 3-20 characters and use letters, numbers, or underscores.");
  return handle;
}

function normalizeDisplayName(value) {
  const name = cleanRequiredString(value, "name").replace(/\s+/g, " ").trim();
  if (name.length < 1 || name.length > 40) {
    throw new ApiError(400, "Name must be 1-40 characters.");
  }
  return name;
}

function normalizeSearchQuery(value) {
  return cleanOptionalString(value).toLowerCase().replace(/^@+/, "").slice(0, 20);
}

function normalizeTimezone(value) {
  const timezone = cleanOptionalString(value) || DEFAULT_TIMEZONE;
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: timezone }).format(new Date());
    return timezone;
  } catch {
    return DEFAULT_TIMEZONE;
  }
}

function cleanRequiredString(value, fieldName) {
  const str = cleanOptionalString(value);
  if (!str) throw new ApiError(400, `${fieldName} is required.`);
  return str;
}

function cleanOptionalString(value) {
  return typeof value === "string" ? value.trim() : "";
}

function clampInteger(value, min, max) {
  const number = Number(value);
  if (!Number.isFinite(number)) return min;
  return Math.min(max, Math.max(min, Math.trunc(number)));
}

function getDateKeyForTimezone(date, timezone) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(date);

  const year = parts.find(p => p.type === "year").value;
  const month = parts.find(p => p.type === "month").value;
  const day = parts.find(p => p.type === "day").value;
  return `${year}-${month}-${day}`;
}

// Used only for the "night_owl" badge condition below. hour12:false can
// report midnight as "24" instead of "00" depending on the ICU data the
// runtime ships with - the modulo normalizes that back to 0 either way.
function getHourForTimezone(date, timezone) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    hour: "2-digit",
    hour12: false
  }).formatToParts(date);

  return Number(parts.find(p => p.type === "hour").value) % 24;
}

// Weekly leaderboard boundary: a fixed Monday 00:00 UTC anchor, not each
// player's own timezone - the leaderboard compares players across
// timezones, so everyone needs to share one clock or the reset would land
// on a different real-world moment for each of them. 2024-01-01 was a
// Monday. Only ever used for equality comparisons (see buildLeaderboard and
// the weeklyXp update below), never displayed, so it doesn't need to be a
// real ISO week number - just a value that changes exactly once a week.
const WEEK_EPOCH_MS = Date.UTC(2024, 0, 1);
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

function getWeekKey(date) {
  return Math.floor((date.getTime() - WEEK_EPOCH_MS) / WEEK_MS);
}

// Lazy weekly reset, same shape as calculateStreakUpdate's date-key
// comparison above: no cron job needed, a stale weekKey just means the
// counter restarts from this session's xpEarned instead of adding to it.
function calculateWeeklyXpUpdate(previousWeeklyXp, previousWeekKey, xpEarned, now) {
  const currentWeekKey = getWeekKey(now);
  const weeklyXp = previousWeekKey === currentWeekKey ? (previousWeeklyXp || 0) + xpEarned : xpEarned;
  return { weeklyXp, weekKey: currentWeekKey };
}

function diffDateKeys(fromKey, toKey) {
  return Math.round((dateKeyToUtc(toKey) - dateKeyToUtc(fromKey)) / 86400000);
}

function dateKeyToUtc(dateKey) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return Date.UTC(year, month - 1, day);
}

function getFriendPairId(uidA, uidB) {
  return [uidA, uidB].sort().join("_");
}

function pickFriendProfile(profile) {
  return {
    uid: profile.uid,
    handle: profile.handle || null,
    displayName: profile.displayName || "Player",
    avatarUrl: profile.avatarUrl || null,
    totalXp: profile.totalXp || 0,
    globalLevel: profile.globalLevel || 1,
    weeklyXp: profile.weeklyXp || 0,
    weekKey: typeof profile.weekKey === "number" ? profile.weekKey : null,
    currentStreak: profile.currentStreak || 0
  };
}

// Ranks by weeklyXp, live-zeroing any entry whose weekKey isn't THIS week -
// a publicProfiles doc only gets a fresh weekKey/weeklyXp when its owner
// next completes a practice session (see calculateWeeklyXpUpdate), so
// without this check a player who stopped playing last week would keep
// showing (and ranking on) last week's total forever. Ties - most visibly
// everyone sitting at 0 right after Monday's reset - fall back to totalXp
// so the board doesn't look randomly shuffled before this week's scores
// start coming in.
function buildLeaderboard(entries) {
  const currentWeekKey = getWeekKey(new Date());
  const sorted = entries
    .map(entry => ({
      ...entry,
      weeklyXp: entry.weekKey === currentWeekKey ? (entry.weeklyXp || 0) : 0
    }))
    .sort((a, b) => (b.weeklyXp - a.weeklyXp) || ((b.totalXp || 0) - (a.totalXp || 0)));
  return sorted.map((entry, index) => ({ ...entry, rank: index + 1 }));
}

// Deterministic 3-of-N daily pick from (uid, dateKey) so missions rotate
// without needing a scheduled job or extra writes.
function pickDailyMissions(uid, dateKey) {
  const seed = `${uid}:${dateKey}`;
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }

  const pool = [...MISSION_POOL];
  const picked = [];
  for (let i = 0; i < 3 && pool.length; i += 1) {
    hash = (hash * 1103515245 + 12345) >>> 0;
    const index = hash % pool.length;
    picked.push(pool.splice(index, 1)[0]);
  }
  return picked;
}

function getMetricValue(dailyStats, metric) {
  return metric.split(".").reduce((value, key) => (value && typeof value === "object" ? value[key] : undefined), dailyStats) || 0;
}

function evaluateMissions(uid, dateKey, dailyStats) {
  const missions = pickDailyMissions(uid, dateKey);
  const completedFlags = (dailyStats && dailyStats.missionsCompleted) || {};

  return missions.map(mission => {
    const value = getMetricValue(dailyStats || {}, mission.metric);
    const progress = Math.min(mission.target, value);
    const completed = Boolean(completedFlags[mission.id]) || progress >= mission.target;
    return {
      id: mission.id,
      labelKey: mission.labelKey,
      progress,
      target: mission.target,
      coinReward: mission.coinReward,
      completed
    };
  });
}

// Coins are only paid once per mission per day: any mission whose progress
// newly reaches its target this call (and isn't already flagged) pays out.
function getNewlyCompletedMissions(uid, dateKey, previousDailyStats, updatedDailyStats) {
  const missions = pickDailyMissions(uid, dateKey);
  const previousFlags = (previousDailyStats && previousDailyStats.missionsCompleted) || {};

  return missions.filter(mission => {
    if (previousFlags[mission.id]) return false;
    const value = getMetricValue(updatedDailyStats || {}, mission.metric);
    return value >= mission.target;
  });
}

function evaluateNewBadges(userData, extra, alreadyEarnedIds) {
  const earnedSet = new Set(alreadyEarnedIds);
  return BADGE_DEFINITIONS.filter(badge => !earnedSet.has(badge.id) && badge.condition(userData, extra));
}

module.exports = {
  ApiError,
  withAuth,
  buildDefaultUserProfile,
  buildPublicProfile,
  sanitizeUserProfile,
  sanitizeCoursesSummary,
  getAuthProfile,
  normalizeSessionPayload,
  calculateSessionXp,
  calculateStreakUpdate,
  resolveCurrentStreak,
  getLevelInfo,
  getCourseLevel,
  getUnlockedWordSuffixesFromPrefix,
  resolveUnlockedWords,
  sanitizeUnlockedWords,
  applyWordResults,
  WORD_MASTERY_THRESHOLD,
  getKeysHeld,
  normalizeCourseId,
  normalizeUid,
  normalizeHandle,
  normalizeDisplayName,
  normalizeDailyGoalXp,
  normalizeTimezone,
  normalizeSearchQuery,
  cleanRequiredString,
  cleanOptionalString,
  clampInteger,
  getDateKeyForTimezone,
  getHourForTimezone,
  getWeekKey,
  calculateWeeklyXpUpdate,
  diffDateKeys,
  getFriendPairId,
  pickFriendProfile,
  buildLeaderboard,
  pickDailyMissions,
  evaluateMissions,
  getNewlyCompletedMissions,
  evaluateNewBadges,
  MAX_STREAK_FREEZES,
  DEFAULT_DAILY_GOAL_XP,
  DAILY_GOAL_XP_OPTIONS,
  WORDS_PER_LEVEL,
  SEARCH_RESULTS_LIMIT,
  MIN_SEARCH_LENGTH,
  CATEGORIES,
  CATEGORY_SIZES,
  TOTAL_CATEGORY_WORDS,
  VALID_WORD_SUFFIXES,
  XP_PER_DROP,
  STARTER_WORDS,
  MAX_KEYS,
  KEY_PRICE_COINS,
  WORD_CHEST_PRICE_COINS,
  STREAK_FREEZE_PRICE_COINS,
  GAME_TYPES,
  LESSON_IDS_BY_COURSE,
  LESSON_COIN_REWARD,
  sanitizeLessonsCompleted,
  TUTORIAL_STEPS,
  TUTORIAL_STARTER_COINS,
  TUTORIAL_STARTER_KEYS,
  CHEST_COIN_REWARD,
  CHEST_XP_REWARD,
  DEBUG_ALWAYS_CLAIM_CHEST,
  MISSION_POOL,
  BADGE_DEFINITIONS
};
