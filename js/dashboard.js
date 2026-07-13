const themeStorageKey = "polytype-theme";
const profileStorageKey = "polytype-profile";

const defaultProfile = {
    name: "Polytype Learner",
    handle: null,
    avatarUrl: null,
    xp: 0,
    dayStreak: 0,
    courses: {}
};

let profile = { ...defaultProfile };
let themeToggle;

function tr(key, params = {}) {
    return window.PolytypeI18n?.t?.(key, params) || key;
}

document.addEventListener("DOMContentLoaded", () => {
    themeToggle = document.getElementById("theme-toggle");

    initTheme();
    initProfile();
    setupProfileSync();

    document.addEventListener("polytype-app-language-changed", () => {
        renderProfilePill();
        updateWelcome(Boolean(window.PolytypeFirebase?.isSignedIn?.()));
    });
});

function initTheme() {
    const storedTheme = localStorage.getItem(themeStorageKey);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(storedTheme || (prefersDark ? "dark" : "light"));

    themeToggle.addEventListener("click", () => {
        const currentTheme = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
        applyTheme(currentTheme === "dark" ? "light" : "dark");
    });
}

function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(themeStorageKey, theme);

    const isDark = theme === "dark";
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute(
        "aria-label",
        isDark ? tr("common.switchLight") : tr("common.switchDark")
    );
}

function initProfile() {
    const storedProfile = localStorage.getItem(profileStorageKey);

    if (storedProfile) {
        try {
            profile = { ...defaultProfile, ...JSON.parse(storedProfile) };
        } catch {
            profile = { ...defaultProfile };
        }
    }

    renderProfilePill();
}

function setupProfileSync() {
    document.addEventListener("polytype-profile-updated", event => {
        profile = { ...defaultProfile, ...profile, ...event.detail };
        renderProfilePill();
    });

    const firebaseClient = window.PolytypeFirebase;
    if (!firebaseClient) {
        updateWelcome(false);
        return;
    }

    firebaseClient.onChange(authState => {
        updateWelcome(Boolean(authState.user));
        loadSocialBadge(Boolean(authState.user));
    });
}

function renderProfilePill() {
    const levelInfo = getLevelInfo(profile.xp);

    setText("mini-profile-level", tr("common.levelNumber", { level: levelInfo.level }));
    setText("mini-profile-xp", `${levelInfo.currentXp} / ${levelInfo.nextXp} XP`);
    setText("mini-profile-streak", `\u{1F525} ${profile.dayStreak}`);
    renderProfileAvatar(document.getElementById("mini-profile-avatar"), profile);
}

function updateWelcome(signedIn) {
    const el = document.getElementById("dashboard-welcome");
    if (!el) return;

    el.textContent = signedIn
        ? tr("dashboard.welcome", { name: profile.name || tr("dashboard.player") })
        : tr("dashboard.welcomeGuest");
}

async function loadSocialBadge(signedIn) {
    if (!signedIn) {
        setPendingBadge(0);
        return;
    }

    const firebaseClient = window.PolytypeFirebase;
    if (!firebaseClient?.getSocialOverview) return;

    try {
        const result = await firebaseClient.getSocialOverview();
        setPendingBadge(result.data?.incomingRequests?.length || 0);
    } catch {
        setPendingBadge(0);
    }
}

function setPendingBadge(count) {
    const badge = document.getElementById("dashboard-pending-badge");
    if (!badge) return;

    if (count > 0) {
        badge.textContent = tr("dashboard.pendingRequests", { count });
        badge.hidden = false;
    } else {
        badge.hidden = true;
    }
}

function renderProfileAvatar(element, profileData) {
    if (!element) return;

    if (profileData.avatarUrl) {
        const image = document.createElement("img");
        image.src = profileData.avatarUrl;
        image.alt = "";
        element.classList.add("has-image");
        element.replaceChildren(image);
        return;
    }

    element.classList.remove("has-image");
    const source = profileData.handle || profileData.name || "P";
    element.textContent = source.trim().charAt(0).toUpperCase() || "P";
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

    return { level, currentXp, nextXp };
}

function getXpForLevel(level) {
    return 200 + (level - 1) * 120;
}
