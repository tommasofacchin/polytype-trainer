const defaultProfile = {
    name: "Tommaso",
    xp: 420,
    dayStreak: 5
};

const demoBadges = [
    {
        icon: "\u2605",
        label: "First Run",
        description: "Started the first vocabulary session."
    },
    {
        icon: "\u26A1",
        label: "Combo Starter",
        description: "Built the first clean combo streak."
    },
    {
        icon: "\u5B57",
        label: "HSK Rookie",
        description: "Opened the Chinese practice track."
    },
    {
        icon: "\u2713",
        label: "Clean Round",
        description: "Finished a round with sharp accuracy."
    }
];

const themeStorageKey = "polytype-theme";
const profileStorageKey = "polytype-profile";

document.addEventListener("DOMContentLoaded", () => {
    applyStoredTheme();
    renderProfilePage(loadProfile());
});

function applyStoredTheme() {
    const storedTheme = localStorage.getItem(themeStorageKey);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.dataset.theme = storedTheme || (prefersDark ? "dark" : "light");
}

function loadProfile() {
    const storedProfile = localStorage.getItem(profileStorageKey);

    if (!storedProfile) return { ...defaultProfile };

    try {
        return { ...defaultProfile, ...JSON.parse(storedProfile) };
    } catch {
        return { ...defaultProfile };
    }
}

function renderProfilePage(profile) {
    const levelInfo = getLevelInfo(profile.xp);
    const xpToNextLevel = levelInfo.nextXp - levelInfo.currentXp;

    setText("profile-page-name", profile.name);
    setText("profile-page-level", `Level ${levelInfo.level}`);
    setText("profile-page-xp-title", `${levelInfo.currentXp} / ${levelInfo.nextXp} XP`);
    setText("profile-page-total-xp", `${profile.xp} total XP`);
    setText("profile-page-next-level", `${xpToNextLevel} XP to Level ${levelInfo.level + 1}`);
    setText("profile-page-day-streak", String(profile.dayStreak));
    setText("profile-page-badge-count", `${demoBadges.length} / ${demoBadges.length}`);

    const xpFill = document.getElementById("profile-page-xp-fill");
    if (xpFill) xpFill.style.width = `${levelInfo.progress}%`;

    renderFires(profile.dayStreak);
    renderBadges();
}

function renderFires(dayStreak) {
    const fireRow = document.getElementById("profile-page-fires");
    if (!fireRow) return;

    fireRow.replaceChildren(
        ...Array.from({ length: 7 }, (_, index) => {
            const fire = document.createElement("span");
            fire.className = index < dayStreak ? "fire is-lit" : "fire";
            fire.textContent = "\u{1F525}";
            return fire;
        })
    );
}

function renderBadges() {
    const badgeGrid = document.getElementById("profile-page-badges");
    if (!badgeGrid) return;

    badgeGrid.replaceChildren(
        ...demoBadges.map(badge => {
            const badgeElement = document.createElement("article");
            badgeElement.className = "profile-badge-card";
            badgeElement.innerHTML = `
                <span class="profile-badge-icon" aria-hidden="true">${badge.icon}</span>
                <span>
                    <strong>${badge.label}</strong>
                    <small>${badge.description}</small>
                </span>
            `;
            return badgeElement;
        })
    );
}

function setText(id, value) {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
}

function getLevelInfo(totalXp) {
    let level = 1;
    let currentXp = totalXp;
    let nextXp = getXpForLevel(level);

    while (currentXp >= nextXp) {
        currentXp -= nextXp;
        level += 1;
        nextXp = getXpForLevel(level);
    }

    return {
        level,
        currentXp,
        nextXp,
        progress: Math.round((currentXp / nextXp) * 100)
    };
}

function getXpForLevel(level) {
    return 200 + (level - 1) * 120;
}
