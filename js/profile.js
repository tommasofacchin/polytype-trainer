const defaultProfile = {
    name: "Player",
    handle: null,
    avatarUrl: null,
    xp: 0,
    dayStreak: 0,
    coins: 0,
    friendCount: 0,
    badges: [],
    courses: {}
};

// Mirrors BADGE_DEFINITIONS in api/_lib.js — icon/labels only, unlock logic is server-side.
const BADGE_DEFINITIONS = [
    { id: "first_steps", icon: "star", labelKey: "badge.firstSteps" },
    { id: "streak_5", icon: "flame", labelKey: "badge.streak5" },
    { id: "streak_30", icon: "flame", labelKey: "badge.streak30" },
    { id: "word_master", icon: "book", labelKey: "badge.wordMaster" },
    { id: "chest_hunter", icon: "chest", labelKey: "badge.chestHunter" },
    { id: "level_10", icon: "star", labelKey: "badge.level10" }
];

const BADGE_ICONS = {
    star: '<svg width="24" height="24" viewBox="0 0 24 24" fill="#ffc73a"><path d="M12 2l2.9 6.2 6.6.7-4.9 4.5 1.3 6.6L12 17.8 6.1 20.6l1.3-6.6L2.5 8.9l6.6-.7z"/></svg>',
    flame: '<svg width="24" height="24" viewBox="0 0 24 24" fill="#ff7a2d"><path d="M12 2c3 4 5 6 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 1 2 2 2 3 2 0-3-1-5 0-8z"/></svg>',
    book: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8b6cff" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
    chest: '<svg width="22" height="22" viewBox="0 0 48 48"><rect x="6" y="20" width="36" height="20" rx="4" fill="#8b6cff"/><path d="M6 22a18 12 0 0 1 36 0z" fill="#a084ff"/><rect x="6" y="25" width="36" height="4" fill="#6b4dff"/></svg>',
    locked: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>'
};

const courseLabels = {
    chinese: "Chinese", german: "German", italian: "Italian", japanese: "Japanese",
    norwegian: "Norwegian", spanish: "Spanish", swedish: "Swedish"
};

let currentProfile = { ...defaultProfile };

function tr(key, params = {}) {
    return window.PolytypeI18n?.t?.(key, params) || key;
}

document.addEventListener("DOMContentLoaded", () => {
    currentProfile = loadProfile();
    renderProfilePage(currentProfile);
    setupFirebaseSync();
    setupLocalProfileSync();

    document.addEventListener("polytype-app-language-changed", () => {
        renderProfilePage(currentProfile);
    });
});

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
        if (!authState.user) {
            setText("profile-page-sync-status", tr("profile.cloudSignin"));
            return;
        }
        if (!authState.profile) {
            setText("profile-page-sync-status", tr("profile.cloudLoading"));
            return;
        }

        currentProfile = sanitizeProfile({
            name: authState.profile.displayName,
            handle: authState.profile.handle,
            avatarUrl: authState.profile.avatarUrl,
            xp: authState.profile.totalXp,
            dayStreak: authState.profile.currentStreak,
            coins: authState.profile.coins,
            friendCount: authState.profile.friendCount,
            badges: authState.profile.badges,
            courses: authState.profile.courses
        });
        renderProfilePage(currentProfile);
        setText("profile-page-sync-status", tr("profile.cloudSynced"));
    });
}

function setupLocalProfileSync() {
    document.addEventListener("polytype-profile-updated", event => {
        currentProfile = sanitizeProfile({ ...currentProfile, ...event.detail });
        renderProfilePage(currentProfile);
    });
}

function renderProfilePage(profile) {
    const safeProfile = sanitizeProfile(profile);
    const levelInfo = getLevelInfo(safeProfile.xp);
    const xpToNextLevel = levelInfo.nextXp - levelInfo.currentXp;

    setText("profile-page-name", safeProfile.name);
    setText("profile-page-handle", safeProfile.handle ? `@${safeProfile.handle}` : tr("profile.noUsername"));
    setText("profile-page-level", tr("common.levelNumber", { level: levelInfo.level }));
    setText("profile-page-xp-title", `${levelInfo.currentXp} / ${levelInfo.nextXp} XP`);
    setText("profile-page-total-xp", safeProfile.xp.toLocaleString());
    setText("profile-page-next-level", tr("profile.xpToLevel", { xp: xpToNextLevel, level: levelInfo.level + 1 }));
    setText("profile-page-day-streak", String(safeProfile.dayStreak));

    const xpFill = document.getElementById("profile-page-xp-fill");
    if (xpFill) xpFill.style.width = `${levelInfo.progress}%`;

    renderAvatar(document.getElementById("profile-page-avatar"), safeProfile);
    renderBadges(safeProfile.badges);
    renderCourses(safeProfile.courses);
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
            const wrap = document.createElement("div");
            wrap.style.textAlign = "center";
            wrap.innerHTML = `
                <div style="aspect-ratio:1;border-radius:16px;background:${isEarned ? "rgba(255,255,255,.06)" : "rgba(255,255,255,.04)"};display:flex;align-items:center;justify-content:center;margin-bottom:6px;${isEarned ? "" : "color:var(--text-faintest)"}">
                    ${isEarned ? BADGE_ICONS[badge.icon] : BADGE_ICONS.locked}
                </div>
                <div style="font-size:9px;font-weight:800;color:${isEarned ? "var(--text-soft)" : "var(--text-faintest)"}">${tr(badge.labelKey)}</div>
            `;
            return wrap;
        })
    );
}

function renderCourses(courses) {
    const courseGrid = document.getElementById("profile-page-courses");
    if (!courseGrid) return;

    const entries = Object.values(courses || {})
        .filter(course => course && typeof course === "object")
        .sort((a, b) => (b.xp || 0) - (a.xp || 0));

    setText("profile-page-course-count", tr("profile.activeCount", { count: entries.length }));

    if (!entries.length) {
        const empty = document.createElement("p");
        empty.className = "profile-muted";
        empty.textContent = tr("profile.noCourses");
        courseGrid.replaceChildren(empty);
        return;
    }

    courseGrid.replaceChildren(
        ...entries.map(course => {
            const courseId = course.courseId || "course";
            const row = document.createElement("div");
            row.style.cssText = "display:flex;align-items:center;gap:12px;background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:12px 14px;grid-column:1/-1";
            row.innerHTML = `
                <span style="width:30px;height:20px;border-radius:5px;overflow:hidden;display:flex;box-shadow:0 0 0 1px var(--border-strong)"><img src="${getCourseFlag(courseId)}" alt="" style="width:100%;height:100%;object-fit:cover"></span>
                <div style="flex:1">
                    <div style="font-weight:800;font-size:14px;margin-bottom:5px">${getCourseLabel(courseId)} &middot; ${tr("common.levelNumber", { level: course.level || 1 })}</div>
                    <div style="height:6px;background:rgba(255,255,255,.08);border-radius:999px;overflow:hidden"><div style="height:100%;width:${Math.min(100, ((course.level || 1) % 10) * 10 || 10)}%;background:var(--accent);border-radius:999px"></div></div>
                </div>
            `;
            return row;
        })
    );
    courseGrid.style.display = "grid";
    courseGrid.style.gap = "10px";
}

function getCourseFlag(courseId) {
    const flags = {
        chinese: "assets/flags/china.svg", german: "assets/flags/germany.svg", italian: "assets/flags/italy.svg",
        japanese: "assets/flags/japan.svg", norwegian: "assets/flags/norway.svg", spanish: "assets/flags/spain.svg",
        swedish: "assets/flags/sweden.svg"
    };
    return flags[courseId] || "assets/flags/china.svg";
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
        coins: Math.max(0, Math.trunc(Number(value.coins) || 0)),
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

function getCourseLabel(courseId) {
    const safeCourseId = typeof courseId === "string" ? courseId.trim() : "";
    if (!safeCourseId) return tr("profile.courseFallback");
    if (courseLabels[safeCourseId]) {
        return window.PolytypeI18n?.languageLabel?.(safeCourseId) || courseLabels[safeCourseId];
    }
    return `${safeCourseId[0].toUpperCase()}${safeCourseId.slice(1)}`;
}
