const defaultProfile = {
    name: "Polytype Learner",
    handle: null,
    avatarUrl: null,
    xp: 0,
    dayStreak: 0,
    courses: {}
};

const demoBadges = [
    {
        icon: "1",
        labelKey: "profile.badgeFirstRun",
        descriptionKey: "profile.badgeFirstRunDesc"
    },
    {
        icon: "x",
        labelKey: "profile.badgeCombo",
        descriptionKey: "profile.badgeComboDesc"
    },
    {
        icon: "ZH",
        labelKey: "profile.badgeMandarin",
        descriptionKey: "profile.badgeMandarinDesc"
    },
    {
        icon: "OK",
        labelKey: "profile.badgeClean",
        descriptionKey: "profile.badgeCleanDesc"
    }
];

const courseLabels = {
    chinese: "Chinese",
    german: "German",
    italian: "Italian",
    japanese: "Japanese",
    norwegian: "Norwegian",
    spanish: "Spanish",
    swedish: "Swedish"
};

const themeStorageKey = "polytype-theme";
const profileStorageKey = "polytype-profile";
const handlePattern = /^[a-z0-9_]{3,20}$/;
const supportedAvatarTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
const maxSourceAvatarBytes = 10 * 1024 * 1024;
const maxUploadAvatarBytes = 2 * 1024 * 1024;
const avatarCanvasSize = 512;
let currentProfile = { ...defaultProfile };
let isSavingHandle = false;
let isUploadingAvatar = false;

function tr(key, params = {}) {
    return window.PolytypeI18n?.t?.(key, params) || key;
}

document.addEventListener("DOMContentLoaded", () => {
    applyStoredTheme();
    setupAppLanguageSelect();
    setupProfileControls();
    currentProfile = loadProfile();
    renderProfilePage(currentProfile);
    setupFirebaseSync();
    setupLocalProfileSync();

    document.addEventListener("polytype-app-language-changed", () => {
        renderProfilePage(currentProfile);
        updateEditStatusForAuth();
    });
});

function setupAppLanguageSelect() {
    const select = document.getElementById("app-language-select");
    if (!select) return;

    select.value = window.PolytypeI18n?.getLanguage?.() || "en";
    select.addEventListener("change", () => {
        window.PolytypeI18n?.setLanguage?.(select.value);
    });
}

function setupProfileControls() {
    const handleForm = document.getElementById("profile-handle-form");
    const avatarInput = document.getElementById("profile-avatar-input");
    const avatarButton = document.getElementById("profile-avatar-upload-btn");

    if (handleForm) {
        handleForm.addEventListener("submit", async event => {
            event.preventDefault();
            await saveHandle();
        });
    }

    if (avatarButton && avatarInput) {
        avatarButton.addEventListener("click", () => {
            avatarInput.click();
        });

        avatarInput.addEventListener("change", async () => {
            const file = avatarInput.files?.[0];
            avatarInput.value = "";
            if (file) await uploadAvatar(file);
        });
    }
}

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
        updateEditControls();

        if (authState.error) {
            setText("profile-page-sync-status", authState.error);
            setEditStatus(authState.error, "error");
            return;
        }

        if (!authState.user) {
            setText("profile-page-sync-status", tr("profile.cloudSignin"));
            setEditStatus(tr("profile.signInToEdit"));
            return;
        }

        if (!authState.profile) {
            setText("profile-page-sync-status", tr("profile.cloudLoading"));
            setEditStatus(tr("profile.cloudLoading"));
            return;
        }

        currentProfile = sanitizeProfile({
            name: authState.profile.displayName,
            handle: authState.profile.handle,
            avatarUrl: authState.profile.avatarUrl,
            xp: authState.profile.totalXp,
            dayStreak: authState.profile.currentStreak,
            courses: authState.profile.courses
        });
        localStorage.setItem(profileStorageKey, JSON.stringify(currentProfile));
        renderProfilePage(currentProfile);
        setText("profile-page-sync-status", tr("profile.cloudSynced"));
        setEditStatus(tr("profile.profileReady"), "success");
    });
}

function setupLocalProfileSync() {
    document.addEventListener("polytype-profile-updated", event => {
        currentProfile = sanitizeProfile({
            ...currentProfile,
            ...event.detail
        });
        renderProfilePage(currentProfile);
        setText("profile-page-sync-status", tr("profile.updated"));
    });
}

async function saveHandle() {
    const firebaseClient = window.PolytypeFirebase;
    const input = document.getElementById("profile-handle-input");
    if (!input) return;

    if (!firebaseClient?.isSignedIn?.()) {
        setEditStatus(tr("profile.signInToEdit"), "error");
        return;
    }

    const handle = normalizeHandleInput(input.value);
    if (!handlePattern.test(handle)) {
        setEditStatus(tr("profile.handleInvalid"), "error");
        input.focus();
        return;
    }

    isSavingHandle = true;
    updateEditControls();
    setEditStatus(tr("profile.savingUsername"));

    try {
        const result = await firebaseClient.setUserHandle(handle);
        currentProfile = sanitizeProfile({
            ...currentProfile,
            handle: result.data?.handle || handle
        });
        renderProfilePage(currentProfile);
        setEditStatus(tr("profile.usernameSaved"), "success");
    } catch (error) {
        setEditStatus(getProfileErrorMessage(error), "error");
    } finally {
        isSavingHandle = false;
        updateEditControls();
    }
}

async function uploadAvatar(file) {
    const firebaseClient = window.PolytypeFirebase;

    if (!firebaseClient?.isSignedIn?.()) {
        setEditStatus(tr("profile.signInToEdit"), "error");
        return;
    }

    isUploadingAvatar = true;
    updateEditControls();
    setEditStatus(tr("profile.preparingPhoto"));

    try {
        const imageDataUrl = await prepareAvatarDataUrl(file);
        setEditStatus(tr("profile.uploadingPhoto"));

        const result = await firebaseClient.uploadProfileAvatar(imageDataUrl);
        const avatarUrl = result.data?.avatarUrl || result.data?.user?.avatarUrl;
        currentProfile = sanitizeProfile({
            ...currentProfile,
            ...(result.data?.user || {}),
            avatarUrl: avatarUrl || currentProfile.avatarUrl
        });
        renderProfilePage(currentProfile);
        setEditStatus(tr("profile.photoSaved"), "success");
    } catch (error) {
        setEditStatus(getProfileErrorMessage(error), "error");
    } finally {
        isUploadingAvatar = false;
        updateEditControls();
    }
}

async function prepareAvatarDataUrl(file) {
    if (!supportedAvatarTypes.has(file.type)) {
        const error = new Error(tr("profile.photoUnsupported"));
        error.code = "avatar/unsupported";
        throw error;
    }

    if (file.size > maxSourceAvatarBytes) {
        const error = new Error(tr("profile.photoTooLarge"));
        error.code = "avatar/source-too-large";
        throw error;
    }

    const image = await loadImage(file);
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const sourceWidth = image.naturalWidth || image.width;
    const sourceHeight = image.naturalHeight || image.height;

    if (!sourceWidth || !sourceHeight) {
        throw new Error(tr("profile.photoUnreadable"));
    }

    const cropSize = Math.min(sourceWidth, sourceHeight);
    const targetSize = Math.min(avatarCanvasSize, cropSize);

    canvas.width = targetSize;
    canvas.height = targetSize;
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, targetSize, targetSize);
    context.drawImage(
        image,
        Math.max(0, (sourceWidth - cropSize) / 2),
        Math.max(0, (sourceHeight - cropSize) / 2),
        cropSize,
        cropSize,
        0,
        0,
        targetSize,
        targetSize
    );

    for (const quality of [0.86, 0.76, 0.66]) {
        const dataUrl = canvas.toDataURL("image/jpeg", quality);
        if (estimateDataUrlBytes(dataUrl) <= maxUploadAvatarBytes) return dataUrl;
    }

    const error = new Error(tr("profile.photoTooLarge"));
    error.code = "avatar/upload-too-large";
    throw error;
}

function loadImage(file) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        const url = URL.createObjectURL(file);

        image.onload = () => {
            URL.revokeObjectURL(url);
            resolve(image);
        };
        image.onerror = () => {
            URL.revokeObjectURL(url);
            reject(new Error(tr("profile.photoUnreadable")));
        };
        image.src = url;
    });
}

function estimateDataUrlBytes(dataUrl) {
    const base64 = dataUrl.split(",")[1] || "";
    return Math.ceil((base64.length * 3) / 4);
}

function renderProfilePage(profile) {
    const safeProfile = sanitizeProfile(profile);
    const levelInfo = getLevelInfo(safeProfile.xp);
    const xpToNextLevel = levelInfo.nextXp - levelInfo.currentXp;

    setText("profile-page-name", safeProfile.name);
    setText("profile-page-handle", safeProfile.handle ? `@${safeProfile.handle}` : tr("profile.noUsername"));
    setText("profile-page-level", tr("common.levelNumber", { level: levelInfo.level }));
    setText("profile-page-xp-title", `${levelInfo.currentXp} / ${levelInfo.nextXp} XP`);
    setText("profile-page-total-xp", tr("profile.totalXp", { xp: safeProfile.xp }));
    setText("profile-page-next-level", tr("profile.xpToLevel", {
        xp: xpToNextLevel,
        level: levelInfo.level + 1
    }));
    setText("profile-page-day-streak", String(safeProfile.dayStreak));
    setText("profile-page-badge-count", `${demoBadges.length} / ${demoBadges.length}`);

    const xpFill = document.getElementById("profile-page-xp-fill");
    if (xpFill) xpFill.style.width = `${levelInfo.progress}%`;

    renderProfileAvatar(document.getElementById("profile-page-avatar"), safeProfile);
    updateHandleInput(safeProfile);
    renderFires(safeProfile.dayStreak);
    renderBadges();
    renderCourses(safeProfile.courses);
    updateEditControls();
}

function renderProfileAvatar(element, profile) {
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
    element.textContent = getProfileInitial(profile);
}

function updateHandleInput(profile) {
    const input = document.getElementById("profile-handle-input");
    if (!input || document.activeElement === input) return;
    input.value = profile.handle || "";
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
            const card = document.createElement("article");
            const icon = document.createElement("span");
            const copy = document.createElement("span");
            const title = document.createElement("strong");
            const stats = document.createElement("small");

            card.className = "profile-badge-card";
            icon.className = "profile-badge-icon";
            icon.setAttribute("aria-hidden", "true");
            icon.textContent = getCourseIcon(courseId);
            title.textContent = getCourseLabel(courseId);
            stats.textContent = tr("profile.courseStats", {
                level: course.level || 1,
                xp: course.xp || 0,
                words: course.wordsUnlocked || 0
            });
            copy.append(title, stats);
            card.append(icon, copy);
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
            const icon = document.createElement("span");
            const copy = document.createElement("span");
            const title = document.createElement("strong");
            const description = document.createElement("small");

            badgeElement.className = "profile-badge-card";
            icon.className = "profile-badge-icon";
            icon.setAttribute("aria-hidden", "true");
            icon.textContent = badge.icon;
            title.textContent = tr(badge.labelKey);
            description.textContent = tr(badge.descriptionKey);
            copy.append(title, description);
            badgeElement.append(icon, copy);
            return badgeElement;
        })
    );
}

function updateEditControls() {
    const signedIn = Boolean(window.PolytypeFirebase?.isSignedIn?.());
    const busy = isSavingHandle || isUploadingAvatar;
    const handleInput = document.getElementById("profile-handle-input");
    const handleButton = document.getElementById("profile-handle-save-btn");
    const avatarButton = document.getElementById("profile-avatar-upload-btn");

    if (handleInput) handleInput.disabled = !signedIn || busy;
    if (handleButton) handleButton.disabled = !signedIn || busy || isUploadingAvatar;
    if (avatarButton) avatarButton.disabled = !signedIn || busy || isSavingHandle;
}

function updateEditStatusForAuth() {
    const signedIn = Boolean(window.PolytypeFirebase?.isSignedIn?.());
    if (!signedIn) setEditStatus(tr("profile.signInToEdit"));
}

function setEditStatus(value, tone = "") {
    const element = document.getElementById("profile-edit-status");
    if (!element) return;

    element.textContent = value;
    element.dataset.tone = tone;
}

function setText(id, value) {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
}

function getProfileErrorMessage(error) {
    const code = error?.code || "";
    const messages = {
        "api/400": tr("profile.handleInvalid"),
        "api/409": tr("profile.handleTaken"),
        "api/413": tr("profile.photoTooLarge"),
        "api/503": tr("profile.storageUnavailable"),
        "avatar/source-too-large": tr("profile.photoTooLarge"),
        "avatar/upload-too-large": tr("profile.photoTooLarge"),
        "avatar/unsupported": tr("profile.photoUnsupported")
    };

    return messages[code] || error?.message || tr("profile.profileSaveFailed");
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

function sanitizeProfile(value = {}) {
    const handle = normalizeHandleInput(value.handle);
    const avatarUrl = typeof value.avatarUrl === "string" && value.avatarUrl.trim()
        ? value.avatarUrl.trim()
        : null;

    return {
        ...defaultProfile,
        ...value,
        name: typeof value.name === "string" && value.name.trim()
            ? value.name.trim()
            : defaultProfile.name,
        handle: handlePattern.test(handle) ? handle : null,
        avatarUrl,
        xp: Math.max(0, Number(value.xp ?? value.totalXp) || 0),
        dayStreak: Math.max(0, Math.trunc(Number(value.dayStreak ?? value.currentStreak) || 0)),
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
    return typeof value === "string"
        ? value.trim().replace(/^@+/, "").toLowerCase()
        : "";
}

function getProfileInitial(profile) {
    const source = profile.handle || profile.name || "P";
    return source.trim().charAt(0).toUpperCase() || "P";
}

function getCourseLabel(courseId) {
    const safeCourseId = typeof courseId === "string" ? courseId.trim() : "";
    if (!safeCourseId) return tr("profile.courseFallback");
    if (courseLabels[safeCourseId]) {
        return window.PolytypeI18n?.languageLabel?.(safeCourseId) || courseLabels[safeCourseId];
    }
    const first = safeCourseId[0];
    if (!first) return tr("profile.courseFallback");
    return `${first.toUpperCase()}${safeCourseId.slice(1)}`;
}

function getCourseIcon(courseId) {
    return getCourseLabel(courseId).charAt(0) || "C";
}
