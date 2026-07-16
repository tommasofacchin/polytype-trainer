const DEFAULT_TIMEZONE = "UTC";
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
const COURSE_LEVEL_CAPS = {
  chinese: 60,
  german: 60,
  italian: 60,
  japanese: 60,
  norwegian: 60,
  spanish: 60,
  swedish: 60
};

const GAME_TYPES = ["trainer", "memory", "dictate", "sprint"];
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
  { id: "level_10", icon: "star", labelKey: "badge.level10", descriptionKey: "badge.level10Desc", condition: user => (user.globalLevel || 1) >= 10 }
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
    currentStreak: 0,
    longestStreak: 0,
    lastPracticeDate: null,
    streakFreezes: 0,
    maxStreakFreezes: MAX_STREAK_FREEZES,
    friendCount: 0,
    coins: 0,
    lastChestClaimedDate: null,
    chestsClaimed: 0,
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
    currentStreak: user.currentStreak || 0,
    friendCount: user.friendCount || 0
  };
}

function sanitizeUserProfile(user) {
  return {
    uid: user.uid,
    handle: user.handle || null,
    displayName: user.displayName || "Player",
    avatarUrl: user.avatarUrl || null,
    timezone: user.timezone || DEFAULT_TIMEZONE,
    totalXp: user.totalXp || 0,
    globalLevel: user.globalLevel || 1,
    currentStreak: user.currentStreak || 0,
    longestStreak: user.longestStreak || 0,
    lastPracticeDate: user.lastPracticeDate || null,
    streakFreezes: user.streakFreezes || 0,
    maxStreakFreezes: user.maxStreakFreezes || MAX_STREAK_FREEZES,
    friendCount: user.friendCount || 0,
    coins: user.coins || 0,
    lastChestClaimedDate: user.lastChestClaimedDate || null,
    chestsClaimed: user.chestsClaimed || 0,
    courses: sanitizeCoursesSummary(user.courses)
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
          purchasedKeys: Math.max(0, Math.trunc(Number(course.purchasedKeys) || 0))
        }
      ];
    })
  );
}

function sanitizeUnlockedWords(value) {
  if (!Array.isArray(value)) return [];
  return value.filter(suffix => Number.isInteger(suffix) && VALID_WORD_SUFFIXES.has(suffix));
}

function getAuthProfile(token) {
  return {
    displayName: cleanOptionalString(token.name) || "Player",
    avatarUrl: cleanOptionalString(token.picture) || null,
    email: cleanOptionalString(token.email) || null
  };
}

function normalizeSessionPayload(data = {}) {
  return {
    courseId: normalizeCourseId(data.courseId),
    timezone: cleanOptionalString(data.timezone),
    gameType: GAME_TYPES.includes(data.gameType) ? data.gameType : "trainer",
    correctAnswers: clampInteger(data.correctAnswers, 0, 1000),
    wrongAnswers: clampInteger(data.wrongAnswers, 0, 1000),
    bestCombo: clampInteger(data.bestCombo, 0, 1000),
    wordsUsed: clampInteger(data.wordsUsed, 0, 1000),
    sessionSeconds: clampInteger(data.sessionSeconds, 0, 86400)
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
    currentStreak: profile.currentStreak || 0
  };
}

function buildLeaderboard(entries) {
  const sorted = [...entries].sort((a, b) => (b.totalXp || 0) - (a.totalXp || 0));
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
  getLevelInfo,
  getCourseLevel,
  getUnlockedWordSuffixesFromPrefix,
  resolveUnlockedWords,
  sanitizeUnlockedWords,
  getKeysHeld,
  normalizeCourseId,
  normalizeUid,
  normalizeHandle,
  normalizeDisplayName,
  normalizeTimezone,
  normalizeSearchQuery,
  cleanRequiredString,
  cleanOptionalString,
  clampInteger,
  getDateKeyForTimezone,
  diffDateKeys,
  getFriendPairId,
  pickFriendProfile,
  buildLeaderboard,
  pickDailyMissions,
  evaluateMissions,
  getNewlyCompletedMissions,
  evaluateNewBadges,
  MAX_STREAK_FREEZES,
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
  GAME_TYPES,
  CHEST_COIN_REWARD,
  CHEST_XP_REWARD,
  DEBUG_ALWAYS_CLAIM_CHEST,
  MISSION_POOL,
  BADGE_DEFINITIONS
};
