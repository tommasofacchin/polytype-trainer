const defaultProfile = {
    name: "Polytype Learner",
    xp: 0,
    dayStreak: 0,
    courses: {}
};

const demoBadges = [
    {
        icon: "★",
        label: "First Run",
        description: "Started the first vocabulary session."
    },
    {
        icon: "⚡",
        label: "Combo Starter",
        description: "Built the first clean combo streak."
    },
    {
        icon: "字",
        label: "HSK Rookie",
        description: "Opened the Chinese practice track."
    },
    {
        icon: "✓",
        label: "Clean Round",
        description: "Finished a round with sharp accuracy."
    }
];

const courseLabels = {
    chinese: "Chinese",
    korean: "Korean",
    norwegian: "Norwegian"
};

const themeStorageKey = "polytype-theme";
const profileStorageKey = "polytype-profile";

document.addEventListener("DOMContentLoaded", () => {
    applyStoredTheme();
    const profile = loadProfile();
    renderProfilePage(profile);
    setupFirebaseSync();
    setupLocalProfileSync();
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
        return sanitizeProfile(JSON.parse(storedProfile));
    } catch {
        return { ...defaultProfile };
    }
}

function setupFirebaseSync() {
    const firebaseClient = window.PolytypeFirebase;
    if (!firebaseClient) return;

    firebaseClient.onChange(authState => {
        if (authState.error) {
            setText("profile-page-sync-status", authState.error);
            return;
        }

        if (!authState.user) {
            setText("profile-page-sync-status", "Sign in from Trainer to sync cloud progress.");
            return;
        }

        if (!authState.profile) {
            setText("profile-page-sync-status", "Loading cloud progress...");
            return;
        }

        const syncedProfile = sanitizeProfile({
            name: authState.profile.displayName,
            xp: authState.profile.totalXp,
            dayStreak: authState.profile.currentStreak,
            courses: authState.profile.courses
        });
        localStorage.setItem(profileStorageKey, JSON.stringify(syncedProfile));
        renderProfilePage(syncedProfile);
        setText("profile-page-sync-status", "Cloud progress synced.");
    });
}

function setupLocalProfileSync() {
    document.addEventListener("polytype-profile-updated", event => {
        renderProfilePage(sanitizeProfile(event.detail));
        setText("profile-page-sync-status", "Profile updated.");
    });
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
    renderCourses(profile.courses);
}

function renderCourses(courses) {
    const courseGrid = document.getElementById("profile-page-courses");
    if (!courseGrid) return;

    const entries = Object.values(courses || {})
        .filter(course => course && typeof course === "object")
        .sort((a, b) => (b.xp || 0) - (a.xp || 0));

    setText(
        "profile-page-course-count",
        entries.length === 1 ? "1 active" : `${entries.length} active`
    );

    if (!entries.length) {
        const empty = document.createElement("p");
        empty.className = "profile-muted";
        empty.textContent = "No course progress yet. Start a practice session to unlock stats.";
        courseGrid.replaceChildren(empty);
        return;
    }

    courseGrid.replaceChildren(
        ...entries.map(course => {
            const courseId = course.courseId || "course";
            const card = document.createElement("article");
            card.className = "profile-badge-card";
            card.innerHTML = `
                <span class="profile-badge-icon" aria-hidden="true">${getCourseIcon(courseId)}</span>
                <span>
                    <strong>${getCourseLabel(courseId)}</strong>
                    <small>Level ${course.level || 1} · ${course.xp || 0} XP · ${course.wordsUnlocked || 0} words</small>
                </span>
            `;
            return card;
        })
    );
}

function renderFires(dayStreak) {
    const fireRow = document.getElementById("profile-page-fires");
    if (!fireRow) return;

    fireRow.replaceChildren(
        ...Array.from({ length: 7 }, (_, index) => {
            const fire = document.createElement("span");
            fire.className = index < dayStreak ? "fire is-lit" : "fire";
            fire.textContent = "🔥";
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
    let currentXp = Math.max(0, Number(totalXp) || 0);
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

function sanitizeProfile(value) {
    return {
        ...defaultProfile,
        ...value,
        name: typeof value?.name === "string" && value.name.trim()
            ? value.name.trim()
            : defaultProfile.name,
        xp: Math.max(0, Number(value?.xp) || 0),
        dayStreak: Math.max(0, Math.trunc(Number(value?.dayStreak) || 0)),
        courses: sanitizeCourses(value?.courses)
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

function getCourseLabel(courseId) {
    const safeCourseId = typeof courseId === "string" ? courseId.trim() : "";
    if (!safeCourseId) return "Course";
    return courseLabels[safeCourseId] || safeCourseId.charAt(0).toUpperCase() + safeCourseId.slice(1);
}

function getCourseIcon(courseId) {
    return getCourseLabel(courseId).charAt(0) || "C";
}
