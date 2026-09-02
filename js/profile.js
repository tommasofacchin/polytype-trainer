const defaultProfile = {
    name: "Player",
    handle: null,
    avatarUrl: null,
    xp: 0,
    dayStreak: 0,
    friendCount: 0,
    badges: [],
    courses: {}
};

// Mirrors BADGE_DEFINITIONS in api/_lib.js — icon/labels/descriptions only,
// unlock logic is server-side.
const BADGE_DEFINITIONS = [
    { id: "first_steps", icon: "star", labelKey: "badge.firstSteps", descriptionKey: "badge.firstStepsDesc" },
    { id: "streak_5", icon: "flame", labelKey: "badge.streak5", descriptionKey: "badge.streak5Desc" },
    { id: "streak_30", icon: "flame", labelKey: "badge.streak30", descriptionKey: "badge.streak30Desc" },
    { id: "word_master", icon: "book", labelKey: "badge.wordMaster", descriptionKey: "badge.wordMasterDesc" },
    { id: "chest_hunter", icon: "chest", labelKey: "badge.chestHunter", descriptionKey: "badge.chestHunterDesc" },
    { id: "level_10", icon: "star", labelKey: "badge.level10", descriptionKey: "badge.level10Desc" },
    { id: "lessons_10", icon: "book", labelKey: "badge.lessons10", descriptionKey: "badge.lessons10Desc" },
    { id: "lessons_25", icon: "book", labelKey: "badge.lessons25", descriptionKey: "badge.lessons25Desc" },
    { id: "lessons_all", icon: "crown", labelKey: "badge.lessonsAll", descriptionKey: "badge.lessonsAllDesc" },
    { id: "streak_50", icon: "flame", labelKey: "badge.streak50", descriptionKey: "badge.streak50Desc" },
    { id: "streak_100", icon: "flame", labelKey: "badge.streak100", descriptionKey: "badge.streak100Desc" },
    { id: "streak_365", icon: "flame", labelKey: "badge.streak365", descriptionKey: "badge.streak365Desc" },
    { id: "words_50", icon: "book", labelKey: "badge.words50", descriptionKey: "badge.words50Desc" },
    { id: "deck_complete", icon: "crown", labelKey: "badge.deckComplete", descriptionKey: "badge.deckCompleteDesc" },
    { id: "chest_30", icon: "chest", labelKey: "badge.chest30", descriptionKey: "badge.chest30Desc" },
    { id: "chest_100", icon: "chest", labelKey: "badge.chest100", descriptionKey: "badge.chest100Desc" },
    { id: "polyglot", icon: "globe", labelKey: "badge.polyglot", descriptionKey: "badge.polyglotDesc" },
    { id: "social_butterfly", icon: "friends", labelKey: "badge.socialButterfly", descriptionKey: "badge.socialButterflyDesc" },
    { id: "friend_squad", icon: "friends", labelKey: "badge.friendSquad", descriptionKey: "badge.friendSquadDesc" },
    { id: "combo_master", icon: "bolt", labelKey: "badge.comboMaster", descriptionKey: "badge.comboMasterDesc" },
    { id: "flawless_round", icon: "target", labelKey: "badge.flawlessRound", descriptionKey: "badge.flawlessRoundDesc" },
    { id: "night_owl", icon: "moon", labelKey: "badge.nightOwl", descriptionKey: "badge.nightOwlDesc" },
    { id: "well_rounded", icon: "grid", labelKey: "badge.wellRounded", descriptionKey: "badge.wellRoundedDesc" },
    { id: "veteran", icon: "medal", labelKey: "badge.veteran", descriptionKey: "badge.veteranDesc" }
];

const BADGE_ICONS = {
    star: '<svg width="24" height="24" viewBox="0 0 24 24" fill="#ffc73a"><path d="M12 2l2.9 6.2 6.6.7-4.9 4.5 1.3 6.6L12 17.8 6.1 20.6l1.3-6.6L2.5 8.9l6.6-.7z"/></svg>',
    flame: '<svg width="24" height="24" viewBox="0 0 24 24" fill="var(--color-streak)"><path d="M12 2c3 4 5 6 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 1 2 2 2 3 2 0-3-1-5 0-8z"/></svg>',
    book: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-secondary)" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
    chest: '<svg width="22" height="22" viewBox="0 0 48 48"><rect x="6" y="20" width="36" height="20" rx="4" fill="var(--color-secondary)"/><path d="M6 22a18 12 0 0 1 36 0z" fill="var(--color-secondary-light)"/><rect x="6" y="25" width="36" height="4" fill="var(--color-secondary-deep)"/></svg>',
    crown: '<svg width="22" height="22" viewBox="0 0 24 24" fill="#ffc73a"><path d="M3 9l4.5 2.7L12 4l4.5 7.7L21 9l-2 9H5L3 9z"/><rect x="5.6" y="20" width="12.8" height="2" rx="0.6" fill="#d99a1c"/></svg>',
    globe: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 4 6 4 9s-1.5 6.5-4 9c-2.5-2.5-4-6-4-9s1.5-6.5 4-9z"/></svg>',
    friends: '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><circle cx="8.5" cy="7.5" r="3.3"/><path d="M2 20c0-3.6 2.9-5.8 6.5-5.8S15 16.4 15 20z"/><circle cx="17" cy="8.5" r="2.6"/><path d="M15.2 13.6c2.9.4 4.8 2.4 4.8 6.4h-3.4z"/></svg>',
    bolt: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2 4 14h6l-1 8 9-12h-6z"/></svg>',
    target: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none"/></svg>',
    moon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"/></svg>',
    grid: '<svg width="20" height="20" viewBox="0 0 24 24" fill="var(--color-secondary)"><rect x="3" y="4" width="7" height="7" rx="1.6"/><rect x="14" y="4" width="7" height="7" rx="1.6"/><rect x="3" y="14" width="7" height="7" rx="1.6"/><rect x="14" y="14" width="7" height="7" rx="1.6"/></svg>',
    medal: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M8 2h3l1 4-3 2z" fill="var(--color-secondary)"/><path d="M16 2h-3l-1 4 3 2z" fill="var(--color-secondary-light)"/><circle cx="12" cy="15" r="7" fill="#ffc73a" stroke="#d99a1c" stroke-width="1.5"/><circle cx="12" cy="15" r="3" fill="none" stroke="#d99a1c" stroke-width="1.2"/></svg>',
    locked: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>'
};

const ACTIVITY_ROWS = 7;
// The whole window the API sends (53 x 7 - a year). The grid draws the
// trailing slice of it that fits the card, so a wide desktop card reaches
// further back rather than stretching 13 weeks across the width or leaving
// the rest of it empty.
const ACTIVITY_MAX_WEEKS = 53;
const ACTIVITY_MIN_WEEKS = 13;
// The column pitch the fitter aims for: a ~14px cell plus .activity-grid's
// 4px gap. The cells are 1fr, so choosing the column count is what holds them
// near this size - they end up a shade wider to take up the remainder.
const ACTIVITY_CELL_PX = 14;
const ACTIVITY_GAP_PX = 4;

let currentProfile = { ...defaultProfile };
// null until the history request lands. The grid draws either way - with no
// history every day is simply a rest day, which is also the right picture for
// a signed-out visitor.
let activityHistory = null;
let activityRequested = false;
// How many columns are on screen right now, so the resize observer can tell a
// width change that actually adds a week from one that doesn't.
let activityWeeksDrawn = 0;
let activityResizeObserver = null;

function tr(key, params = {}) {
    return window.PolytypeI18n?.t?.(key, params) || key;
}

function initProfilePage() {
    currentProfile = loadProfile();
    renderProfilePage(currentProfile);
    observeActivityResize();
    setupBadgeDetail();
    setupFirebaseSync();
    setupLocalProfileSync();

    // Delegated through js/router.js's shared hook slot instead of a direct
    // document-level listener - see js/main.js's identical comment for why.
    window.__polytypePageHooks = window.__polytypePageHooks || {};
    window.__polytypePageHooks.onLanguageChanged = () => {
        renderProfilePage(currentProfile);
    };
}

function loadProfile() {
    const stored = localStorage.getItem("polytype-profile");
    if (!stored) return { ...defaultProfile };
    try {
        return sanitizeProfile(JSON.parse(stored));
    } catch {
        return { ...defaultProfile };
    }
}

function setupFirebaseSync() {
    const firebaseClient = window.PolytypeFirebase;
    if (!firebaseClient) return;

    firebaseClient.onChange(authState => {
        if (!authState.user || !authState.profile) return;

        currentProfile = sanitizeProfile({
            name: authState.profile.displayName,
            handle: authState.profile.handle,
            avatarUrl: authState.profile.avatarUrl,
            xp: authState.profile.totalXp,
            dayStreak: authState.profile.currentStreak,
            friendCount: authState.profile.friendCount,
            badges: authState.profile.badges,
            courses: authState.profile.courses
        });
        renderProfilePage(currentProfile);
        loadActivityHistory();
    });
}

// Its own request rather than a field on the profile: the heatmap needs 91
// dailyStats docs, which nothing else on any page wants, and the card is far
// enough down the profile that it can fill in a moment after the hero paints.
function loadActivityHistory() {
    const firebaseClient = window.PolytypeFirebase;
    if (activityRequested || !firebaseClient?.getActivityHistory) return;
    activityRequested = true;

    firebaseClient.getActivityHistory()
        .then(result => {
            activityHistory = result.data || null;
            // The only render worth animating: the card already painted its
            // all-rest-days frame the instant the page opened (renderProfilePage
            // below), so this is real data replacing a placeholder, not the
            // page's own entrance. A resize refit (observeActivityResize)
            // redraws the same way but stays plain - nothing new arrived there.
            renderActivity(sanitizeProfile(currentProfile), { animate: true });
        })
        .catch(() => {
            // Leaves the all-rest-days frame on screen and allows a retry on
            // the next auth tick - an empty grid says "nothing yet" far
            // better than an error message in the middle of the profile.
            activityRequested = false;
        });
}

function setupLocalProfileSync() {
    window.__polytypePageHooks = window.__polytypePageHooks || {};
    window.__polytypePageHooks.onProfileUpdated = event => {
        currentProfile = sanitizeProfile({ ...currentProfile, ...event.detail });
        renderProfilePage(currentProfile);
    };
}

function renderProfilePage(profile) {
    const safeProfile = sanitizeProfile(profile);
    const levelInfo = getLevelInfo(safeProfile.xp);

    setText("profile-page-name", safeProfile.name);
    setText("profile-page-handle", safeProfile.handle ? `@${safeProfile.handle}` : tr("profile.noUsername"));
    // Just the number - the badge around it already says "level".
    setText("profile-page-level", String(levelInfo.level));
    setText("profile-page-xp-title", `${levelInfo.currentXp} / ${levelInfo.nextXp}`);
    setText("profile-page-total-xp", safeProfile.xp.toLocaleString());
    setText("profile-page-day-streak", String(safeProfile.dayStreak));

    const xpFill = document.getElementById("profile-page-xp-fill");
    if (xpFill) xpFill.style.width = `${levelInfo.progress}%`;

    renderAvatar(document.getElementById("profile-page-avatar"), safeProfile);
    renderActivity(safeProfile);
    renderBadges(safeProfile.badges);
}

// How many weekly columns the card is wide enough for. Always whole weeks, so
// every column is a full 7-cell run and today stays on the same row it would
// have been on at any other width.
function activityWeeksThatFit(grid) {
    const width = grid.clientWidth;
    // No layout yet (a display:none ancestor, or a soft nav that runs this
    // before the page is painted): draw the narrow frame and let the resize
    // observer widen it the moment a real width exists.
    if (!width) return ACTIVITY_MIN_WEEKS;

    const weeks = Math.floor((width + ACTIVITY_GAP_PX) / (ACTIVITY_CELL_PX + ACTIVITY_GAP_PX));
    return Math.min(ACTIVITY_MAX_WEEKS, Math.max(ACTIVITY_MIN_WEEKS, weeks));
}

// Redraws only when the width crosses into a different column count - which is
// also what stops the observer from looping, since a redraw changes the grid's
// height (new cell size) and would otherwise notify itself forever.
function observeActivityResize() {
    const grid = document.getElementById("profile-activity-grid");
    if (!grid || typeof ResizeObserver !== "function") return;

    // Disconnect first: js/router.js re-runs this file on every soft nav to
    // the profile, and a second observer on the same element would double
    // every callback.
    activityResizeObserver?.disconnect();
    activityResizeObserver = new ResizeObserver(() => {
        if (activityWeeksThatFit(grid) !== activityWeeksDrawn) renderActivity(currentProfile);
    });
    activityResizeObserver.observe(grid);
}

// Draws the trailing whole weeks that fit, oldest at the top left and today at
// the bottom right. .activity-grid flows column by column, so appending the
// days oldest-first is all the ordering this needs.
function renderActivity(profile, { animate = false } = {}) {
    const grid = document.getElementById("profile-activity-grid");
    if (!grid) return;

    const todayKey = activityHistory?.todayKey || getTodayKey();
    const statsByDate = new Map((activityHistory?.days || []).map(day => [day.date, day]));

    activityWeeksDrawn = activityWeeksThatFit(grid);

    const days = [];
    for (let offset = activityWeeksDrawn * ACTIVITY_ROWS - 1; offset >= 0; offset -= 1) {
        const date = shiftDateKey(todayKey, -offset);
        days.push({ date, ...(statsByDate.get(date) || { xp: 0, sessions: 0, correctAnswers: 0, wrongAnswers: 0 }) });
    }

    grid.replaceChildren(
        ...days.map((day, index) => {
            const cell = document.createElement("i");
            cell.className = "activity-cell";
            cell.dataset.level = String(getActivityLevel(day.sessions));
            if (day.date === todayKey) cell.dataset.today = "true";
            cell.title = day.xp
                ? tr("profile.activityDay", { date: formatActivityDate(day.date), xp: day.xp.toLocaleString() })
                : tr("profile.activityRestDay", { date: formatActivityDate(day.date) });
            // Real data landing over the placeholder sweeps in column by
            // column (oldest week first) instead of just popping into place -
            // --col drives each column's delay in .activity-cell.is-revealing
            // (style.css). Index, not offset: it already runs oldest-to-newest,
            // same order the grid's column-flow lays cells out in.
            if (animate) {
                cell.style.setProperty("--col", String(Math.floor(index / ACTIVITY_ROWS)));
                cell.classList.add("is-revealing");
            }
            return cell;
        })
    );

    const weekXp = days.slice(-7).reduce((sum, day) => sum + day.xp, 0);

    setText("profile-activity-streak", String(profile.dayStreak));
    setText("profile-activity-week", weekXp.toLocaleString());
}

// An absolute scale (1 session -> the lowest fill, 5+ -> the highest),
// not one relative to any other day - so a single practice session always
// looks the same regardless of how busy the rest of the window was.
function getActivityLevel(sessions) {
    if (sessions <= 0) return 0;
    if (sessions === 1) return 1;
    if (sessions === 2) return 2;
    if (sessions <= 4) return 3;
    return 4;
}

// Matches getDateKeyForTimezone in api/_lib.js - en-CA is the shortest way to
// an ISO date key in the browser's own timezone, which is the timezone the
// server keyed those dailyStats docs by in the first place.
function getTodayKey() {
    return new Intl.DateTimeFormat("en-CA", { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone }).format(new Date());
}

// UTC arithmetic on the key itself so a DST change can't shift a day - same
// reasoning as shiftDateKey in api/_lib.js.
function shiftDateKey(dateKey, days) {
    const [year, month, day] = dateKey.split("-").map(Number);
    return new Date(Date.UTC(year, month - 1, day) + days * 86400000).toISOString().slice(0, 10);
}

function formatActivityDate(dateKey) {
    const [year, month, day] = dateKey.split("-").map(Number);
    return new Date(Date.UTC(year, month - 1, day))
        .toLocaleDateString(undefined, { timeZone: "UTC", month: "short", day: "numeric" });
}

function renderAvatar(element, profile) {
    if (!element) return;
    if (profile.avatarUrl) {
        const image = document.createElement("img");
        image.src = profile.avatarUrl;
        image.alt = "";
        element.classList.add("has-image");
        element.replaceChildren(image);
        return;
    }
    element.classList.remove("has-image");
    const source = profile.handle || profile.name || "P";
    element.textContent = source.trim().charAt(0).toUpperCase() || "P";
}

function renderBadges(earnedIds) {
    const badgeGrid = document.getElementById("profile-page-badges");
    if (!badgeGrid) return;

    const earnedSet = new Set(earnedIds || []);
    setText("profile-page-badge-count", `${earnedSet.size} / ${BADGE_DEFINITIONS.length}`);

    badgeGrid.replaceChildren(
        ...BADGE_DEFINITIONS.map(badge => {
            const isEarned = earnedSet.has(badge.id);
            // A real button (not a div) - every tile, earned or locked, opens
            // its detail popup (openBadgeDetail) on tap, so a locked one is
            // exactly where you find out what it takes to unlock it.
            const tile = document.createElement("button");
            tile.type = "button";
            tile.className = "badge-tile" + (isEarned ? "" : " is-locked");
            tile.innerHTML = `
                <span class="badge-tile-icon">${isEarned ? BADGE_ICONS[badge.icon] : BADGE_ICONS.locked}</span>
                <span class="badge-tile-label">${tr(badge.labelKey)}</span>
            `;
            tile.addEventListener("click", () => openBadgeDetail(badge, isEarned));
            return tile;
        })
    );
}

// ── Badge detail popup ──────────────────────────────────────────────────
// Reuses .confirm-overlay/.confirm-card (deck.html's unlock-confirm shell)
// rather than a bespoke dialog - see profile.html for the markup.

let badgeDetailEl = null;

function setupBadgeDetail() {
    const overlay = document.getElementById("badge-detail-overlay");
    if (!overlay) return;
    badgeDetailEl = {
        overlay,
        icon: document.getElementById("badge-detail-icon"),
        name: document.getElementById("badge-detail-name"),
        desc: document.getElementById("badge-detail-desc"),
        status: document.getElementById("badge-detail-status")
    };

    overlay.querySelectorAll("[data-badge-detail-close]").forEach(node => {
        node.addEventListener("click", closeBadgeDetail);
    });
    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && !overlay.hidden) closeBadgeDetail();
    });
}

function openBadgeDetail(badge, isEarned) {
    if (!badgeDetailEl) return;
    const { overlay, icon, name, desc, status } = badgeDetailEl;

    icon.innerHTML = isEarned ? BADGE_ICONS[badge.icon] : BADGE_ICONS.locked;
    icon.classList.toggle("is-locked", !isEarned);
    name.textContent = tr(badge.labelKey);
    desc.textContent = tr(badge.descriptionKey);
    status.textContent = tr(isEarned ? "badge.detailEarned" : "badge.detailLocked");
    status.classList.toggle("is-locked", !isEarned);

    overlay.hidden = false;
    requestAnimationFrame(() => overlay.classList.add("is-open"));
}

function closeBadgeDetail() {
    if (!badgeDetailEl) return;
    badgeDetailEl.overlay.classList.remove("is-open");
    window.setTimeout(() => { badgeDetailEl.overlay.hidden = true; }, 240);
}

function setText(id, value) {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
}

function getLevelInfo(totalXp) {
    let level = 1;
    let currentXp = Math.max(0, Number(totalXp) || 0);
    let nextXp = getXpForLevel(level);

    while (currentXp >= nextXp) {
        currentXp -= nextXp;
        level += 1;
        nextXp = getXpForLevel(level);
    }

    return { level, currentXp, nextXp, progress: Math.round((currentXp / nextXp) * 100) };
}

// Keep in sync with getXpForLevel in api/_lib.js.
function getXpForLevel(level) {
    return 400 + (level - 1) * 250;
}

function sanitizeProfile(value = {}) {
    const handle = normalizeHandleInput(value.handle);
    const avatarUrl = typeof value.avatarUrl === "string" && value.avatarUrl.trim() ? value.avatarUrl.trim() : null;

    return {
        ...defaultProfile,
        ...value,
        name: typeof value.name === "string" && value.name.trim() ? value.name.trim() : defaultProfile.name,
        handle: /^[a-z0-9_]{3,20}$/.test(handle) ? handle : null,
        avatarUrl,
        xp: Math.max(0, Number(value.xp ?? value.totalXp) || 0),
        dayStreak: Math.max(0, Math.trunc(Number(value.dayStreak ?? value.currentStreak) || 0)),
        friendCount: Math.max(0, Math.trunc(Number(value.friendCount) || 0)),
        badges: Array.isArray(value.badges) ? value.badges : [],
        courses: sanitizeCourses(value.courses)
    };
}

function sanitizeCourses(courses) {
    if (!courses || typeof courses !== "object") return {};
    return Object.fromEntries(
        Object.entries(courses)
            .filter(([, course]) => course && typeof course === "object")
            .map(([courseId, course]) => [
                courseId,
                {
                    courseId: course.courseId || courseId,
                    xp: Math.max(0, Number(course.xp) || 0),
                    level: Math.max(1, Math.trunc(Number(course.level) || 1)),
                    wordsUnlocked: Math.max(0, Math.trunc(Number(course.wordsUnlocked) || 0))
                }
            ])
    );
}

function normalizeHandleInput(value) {
    return typeof value === "string" ? value.trim().replace(/^@+/, "").toLowerCase() : "";
}

// Runs after every function/let/const above is defined - same reasoning as
// js/app-shell.js and js/main.js.
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initProfilePage, { once: true });
} else {
    initProfilePage();
}
