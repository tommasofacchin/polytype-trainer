const DEFAULT_TIMEZONE = "UTC";
const MAX_STREAK_FREEZES = 2;
const WORDS_PER_LEVEL = 5;
const MAX_SESSION_XP = 500;
const HANDLE_PATTERN = /^[a-z0-9_]{3,20}$/;
const COURSE_LEVEL_CAPS = { norwegian: 20 };

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
      if (err instanceof ApiError) {
        return res.status(err.status).json({ error: err.message });
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
    displayName: user.displayName || "Polytype Learner",
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
        wordsUnlocked: course.wordsUnlocked || WORDS_PER_LEVEL
      }
    ])
  );
}

function getAuthProfile(token) {
  return {
    displayName: cleanOptionalString(token.name) || "Polytype Learner",
    avatarUrl: cleanOptionalString(token.picture) || null,
    email: cleanOptionalString(token.email) || null
  };
}

function normalizeSessionPayload(data = {}) {
  return {
    courseId: normalizeCourseId(data.courseId),
    timezone: cleanOptionalString(data.timezone),
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

function getXpForLevel(level) {
  return 200 + (level - 1) * 120;
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
    displayName: profile.displayName || "Polytype Learner",
    avatarUrl: profile.avatarUrl || null,
    totalXp: profile.totalXp || 0,
    globalLevel: profile.globalLevel || 1,
    currentStreak: profile.currentStreak || 0
  };
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
  normalizeCourseId,
  normalizeUid,
  normalizeHandle,
  normalizeTimezone,
  cleanRequiredString,
  cleanOptionalString,
  clampInteger,
  getDateKeyForTimezone,
  getFriendPairId,
  pickFriendProfile,
  MAX_STREAK_FREEZES,
  WORDS_PER_LEVEL
};
