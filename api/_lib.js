const DEFAULT_TIMEZONE = "UTC";
const MAX_STREAK_FREEZES = 2;
const WORDS_PER_LEVEL = 5;
const MAX_SESSION_XP = 500;
const SEARCH_RESULTS_LIMIT = 10;
const MIN_SEARCH_LENGTH = 2;
const HANDLE_PATTERN = /^[a-z0-9_]{3,20}$/;
// Keep in sync with decks/categories.js (see scripts/generate-categories.cjs) -
// these are just the `size` of each generated category, in order.
const CATEGORY_SIZES = [20, 15, 20, 35, 25, 30, 25, 20, 25, 15, 10, 15, 10, 25, 10];
const TOTAL_CATEGORY_WORDS = CATEGORY_SIZES.reduce((sum, size) => sum + size, 0);
const XP_PER_DROP = 50;
// A brand-new course needs a handful of words unlocked before any XP exists,
// otherwise there is nothing to practice to earn that first XP at all.
const STARTER_WORDS = 5;
const COURSE_LEVEL_CAPS = {
  chinese: 60,
  german: 60,
  italian: 60,
  japanese: 60,
  norwegian: 60,
  spanish: 60,
  swedish: 60
};

const GAME_TYPES = ["trainer", "memory", "dictate"];
const CHEST_COIN_REWARD = 50;
const CHEST_XP_REWARD = 20;
const LEVEL_UP_RUPEE_REWARD = 1;
// Debug-only: set DEBUG_ALWAYS_CLAIM_CHEST=true in the environment to let the
// daily chest be reopened on every claim instead of once per day. Never set
// this in production - it lets any signed-in user farm coins/XP at will.
const DEBUG_ALWAYS_CLAIM_CHEST = process.env.DEBUG_ALWAYS_CLAIM_CHEST === "true";

// Small fixed pool; 3 are picked deterministically per (uid, date) so the set
// rotates daily without needing a cron job or extra Firestore writes.
const MISSION_POOL = [
  { id: "earn_30_xp", metric: "xp", target: 30, coinReward: 15, labelKey: "mission.earn30Xp" },
  { id: "earn_50_xp", metric: "xp", target: 50, coinReward: 20, labelKey: "mission.earn50Xp" },
  { id: "earn_100_xp", metric: "xp", target: 100, coinReward: 35, labelKey: "mission.earn100Xp" },
  { id: "play_trainer", metric: "gameSessions.trainer", target: 1, coinReward: 20, labelKey: "mission.playTrainer" },
  { id: "play_memory", metric: "gameSessions.memory", target: 1, coinReward: 30, labelKey: "mission.playMemory" },
  { id: "play_dictate", metric: "gameSessions.dictate", target: 1, coinReward: 25, labelKey: "mission.playDictate" },
  { id: "correct_20", metric: "correctAnswers", target: 20, coinReward: 25, labelKey: "mission.correct20" }
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
    rupees: 0,
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
    rupees: user.rupees || 0,
    lastChestClaimedDate: user.lastChestClaimedDate || null,
    chestsClaimed: user.chestsClaimed || 0,
    courses: sanitizeCoursesSummary(user.courses)
  };
}

function sanitizeCoursesSummary(courses) {
  if (!courses || typeof courses !== "object") return {};
  return Object.fromEntries(
    Object.entries(courses).map(([courseId, course]) => [
      courseId,
      {
        courseId: course.courseId || courseId,
        xp: course.xp || 0,
        level: course.level || 1,
        unlockedLevel: course.unlockedLevel || course.level || 1,
        // Must round-trip categoryIndex/categoryUnlocked (not just
        // wordsUnlocked) - the trainer/memory/dictate/deck pages all derive
        // their actual playable word list from these two fields via
        // getUnlockedWordSuffixes(). Dropping them here made every page
        // reload silently reset a real course back to 0 unlocked words,
        // since the client's own "no course yet" starter-word fallback only
        // triggers when the course object is entirely missing, not when
        // it's present but missing these fields.
        categoryIndex: Math.max(0, Math.trunc(Number(course.categoryIndex) || 0)),
        categoryUnlocked: Math.max(0, Math.trunc(Number(course.categoryUnlocked) || 0)),
        wordsUnlocked: course.wordsUnlocked || WORDS_PER_LEVEL,
        wordsMastered: course.wordsMastered || 0
      }
    ])
  );
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

function getUnlockedWordCount(categoryIndex, categoryUnlocked) {
  let total = 0;
  for (let i = 0; i < categoryIndex && i < CATEGORY_SIZES.length; i += 1) {
    total += CATEGORY_SIZES[i];
  }
  return total + Math.max(0, categoryUnlocked);
}

// Walks a course's category/drop progress forward to match the XP it has
// earned so far. Categories unlock in sequence: a category only starts
// dropping words once every earlier category is fully unlocked. `isNewCourse`
// grants the starter baseline as the walk's starting point (only for a
// course's very first save) so a fresh course isn't stuck with zero words.
function advanceCategoryProgress(categoryIndex, categoryUnlocked, courseXp, isNewCourse) {
  const initialUnlocked = isNewCourse
    ? Math.min(STARTER_WORDS, CATEGORY_SIZES[0] || 0)
    : categoryUnlocked;
  const previousTotal = getUnlockedWordCount(categoryIndex, initialUnlocked);
  const targetTotal = Math.min(TOTAL_CATEGORY_WORDS, Math.floor(courseXp / XP_PER_DROP));
  const newlyUnlocked = Math.max(0, targetTotal - previousTotal);

  let index = Math.min(categoryIndex, CATEGORY_SIZES.length - 1);
  let unlocked = initialUnlocked;
  let remaining = newlyUnlocked;

  while (remaining > 0 && index < CATEGORY_SIZES.length) {
    const capacity = CATEGORY_SIZES[index] - unlocked;
    if (remaining < capacity) {
      unlocked += remaining;
      remaining = 0;
    } else {
      remaining -= capacity;
      index += 1;
      unlocked = 0;
    }
  }

  if (index >= CATEGORY_SIZES.length) {
    index = CATEGORY_SIZES.length - 1;
    unlocked = CATEGORY_SIZES[index];
  }

  return {
    categoryIndex: index,
    categoryUnlocked: unlocked,
    totalWordsUnlocked: getUnlockedWordCount(index, unlocked),
    newlyUnlocked
  };
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
  getUnlockedWordCount,
  advanceCategoryProgress,
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
  CATEGORY_SIZES,
  TOTAL_CATEGORY_WORDS,
  XP_PER_DROP,
  STARTER_WORDS,
  GAME_TYPES,
  CHEST_COIN_REWARD,
  CHEST_XP_REWARD,
  LEVEL_UP_RUPEE_REWARD,
  DEBUG_ALWAYS_CLAIM_CHEST,
  MISSION_POOL,
  BADGE_DEFINITIONS
};
