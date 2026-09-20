const handlePattern = /^[a-z0-9_]{3,20}$/;
const supportedAvatarTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
const maxSourceAvatarBytes = 10 * 1024 * 1024;
const maxUploadAvatarBytes = 2 * 1024 * 1024;
const avatarCanvasSize = 512;
const sfxMutedKey = "polytype-sfx-muted";
let isSavingProfile = false;
let isPreparingAvatar = false;
// The cropped photo waiting for Save. Picking one only ever gets this far:
// nothing leaves the device until the form is submitted, so a wrong file
// picked by accident is undone by walking away rather than by uploading a
// second photo over it.
let pendingAvatarDataUrl = null;

function tr(key, params = {}) {
    return window.PolytypeI18n?.t?.(key, params) || key;
}

function initSettingsPage() {
    renderFromCache();
    setupProfileControls();
    setupFirebaseSync();
    setupSoundToggle();
    setupThemeToggle();
    setupLanguageSelect();
    setupDailyGoalSelect();
    setupPasswordForm();
    setupDeleteAccount();

    document.getElementById("settings-logout-btn")?.addEventListener("click", async () => {
        await window.PolytypeFirebase?.signOut?.();
        window.location.href = "auth.html";
    });
}

function setupThemeToggle() {
    const button = document.getElementById("settings-theme-toggle");
    if (!button || !window.PolytypeTheme) return;

    button.setAttribute("aria-pressed", String(window.PolytypeTheme.getTheme() === "light"));

    button.addEventListener("click", () => {
        const isLight = button.getAttribute("aria-pressed") === "true";
        window.PolytypeTheme.setTheme(isLight ? "dark" : "light");
        button.setAttribute("aria-pressed", String(!isLight));
    });
}

// Generic custom dropdown backing both settings-select-menu rows below (see
// .settings-select-* / .language-menu-* in style.css) - same
// open/close/outside-click pattern as the topbar's study-language switcher
// in js/app-shell.js, just driven by an options array instead of a fixed
// set of studied languages. Returns { setValue } so callers can resync the
// displayed label when the profile loads from Firebase after the initial
// (possibly cache-only) render.
function setupCustomSelect({ toggleId, labelId, panelId, options, initialValue, onSelect }) {
    const toggle = document.getElementById(toggleId);
    const label = document.getElementById(labelId);
    const panel = document.getElementById(panelId);
    if (!toggle || !label || !panel) return null;

    let currentValue = initialValue;

    function renderPanel() {
        panel.replaceChildren(
            ...options.map(option => {
                const item = document.createElement("button");
                item.type = "button";
                item.className = `language-menu-item${option.value === currentValue ? " is-active" : ""}`;
                item.setAttribute("role", "menuitemradio");
                item.setAttribute("aria-checked", String(option.value === currentValue));
                item.textContent = option.label;
                item.addEventListener("click", () => {
                    closePanel();
                    if (option.value === currentValue) return;
                    setValue(option.value);
                    onSelect(option.value);
                });
                return item;
            })
        );
    }

    // Opens upward by default (these rows sit low on the page, close to the
    // fixed bottom nav - see the panel's own CSS comment) but flips downward
    // when there isn't enough room above the toggle, e.g. this row is near
    // the top of the screen.
    function pickDirection() {
        const rect = toggle.getBoundingClientRect();
        const spaceAbove = rect.top;
        const spaceBelow = window.innerHeight - rect.bottom;
        const PANEL_ROOM_NEEDED = 220;
        return spaceAbove < PANEL_ROOM_NEEDED && spaceBelow > spaceAbove ? "down" : "up";
    }

    function openPanel() {
        renderPanel();
        const direction = pickDirection();
        panel.classList.toggle("opens-down", direction === "down");
        toggle.dataset.direction = direction;
        panel.hidden = false;
        toggle.setAttribute("aria-expanded", "true");
    }

    function closePanel() {
        panel.hidden = true;
        toggle.setAttribute("aria-expanded", "false");
    }

    function setValue(value) {
        currentValue = value;
        const match = options.find(option => option.value === value);
        if (match) label.textContent = match.label;
    }

    toggle.addEventListener("click", () => {
        if (panel.hidden) openPanel(); else closePanel();
    });

    document.addEventListener("click", event => {
        if (panel.hidden) return;
        if (toggle.contains(event.target) || panel.contains(event.target)) return;
        closePanel();
    });

    setValue(initialValue);
    return { setValue };
}

let languageSelectApi = null;
let dailyGoalSelectApi = null;
const dailyGoalOptions = [20, 50, 100, 200].map(xp => ({ value: String(xp), label: `${xp} XP` }));

function setupLanguageSelect() {
    if (!window.PolytypeI18n) return;

    languageSelectApi = setupCustomSelect({
        toggleId: "settings-language-toggle",
        labelId: "settings-language-toggle-label",
        panelId: "settings-language-panel",
        options: [
            { value: "en", label: "English" },
            { value: "it", label: "Italiano" }
        ],
        initialValue: window.PolytypeI18n.getLanguage(),
        onSelect: value => window.PolytypeI18n.setLanguage(value)
    });
}

function setupDailyGoalSelect() {
    const cached = readCachedProfile();

    dailyGoalSelectApi = setupCustomSelect({
        toggleId: "settings-daily-goal-toggle",
        labelId: "settings-daily-goal-toggle-label",
        panelId: "settings-daily-goal-panel",
        options: dailyGoalOptions,
        initialValue: String(cached?.dailyGoalXp || 50),
        onSelect: async value => {
            const firebaseClient = window.PolytypeFirebase;
            if (!firebaseClient?.isSignedIn?.()) {
                showToast(tr("profile.signInToEdit"));
                return;
            }

            try {
                await firebaseClient.setDailyGoal(Number(value));
            } catch (error) {
                showToast(getProfileErrorMessage(error));
            }
        }
    });
}

function setupPasswordForm() {
    const form = document.getElementById("settings-password-form");
    if (!form) return;

    form.addEventListener("submit", async event => {
        event.preventDefault();
        await savePassword();
    });
}

async function savePassword() {
    const firebaseClient = window.PolytypeFirebase;
    const newInput = document.getElementById("settings-new-password");
    const confirmInput = document.getElementById("settings-confirm-new-password");
    if (!newInput || !confirmInput) return;

    if (!firebaseClient?.isSignedIn?.()) {
        setPasswordStatus(tr("profile.signInToEdit"), "error");
        return;
    }

    if (newInput.value !== confirmInput.value) {
        setPasswordStatus(tr("auth.passwordMismatch"), "error");
        confirmInput.focus();
        return;
    }

    if (newInput.value.length < 6) {
        setPasswordStatus(tr("auth.weakPassword"), "error");
        newInput.focus();
        return;
    }

    const wasLinking = !firebaseClient.hasPasswordProvider();
    setPasswordStatus(tr("settings.savingPassword"));

    try {
        await firebaseClient.setPassword(newInput.value);
        setPasswordStatus(tr(wasLinking ? "settings.passwordSet" : "settings.passwordUpdated"), "success");
        newInput.value = "";
        confirmInput.value = "";
        refreshPasswordSectionCopy();
    } catch (error) {
        setPasswordStatus(firebaseClient.getErrorMessage(error), "error");
    }
}

// Reflects whether this account already has an email/password credential
// linked - "set" copy (first-time linking, e.g. for a Google-only account)
// vs "change" copy (updating an existing one). Called after sign-in
// resolves and again right after a successful setPassword, since linking
// flips this from false to true without a page reload.
function refreshPasswordSectionCopy() {
    const firebaseClient = window.PolytypeFirebase;
    const labelEl = document.getElementById("settings-password-label");
    const helpEl = document.getElementById("settings-password-help");
    const btn = document.getElementById("settings-password-save-btn");
    if (!firebaseClient || !labelEl || !helpEl || !btn) return;

    const hasPassword = firebaseClient.hasPasswordProvider();
    labelEl.textContent = tr(hasPassword ? "settings.changePassword" : "settings.setPassword");
    helpEl.textContent = tr(hasPassword ? "settings.changePasswordHelp" : "settings.setPasswordHelp");
    btn.textContent = tr(hasPassword ? "settings.updatePassword" : "settings.setPassword");
}

function setPasswordStatus(value, tone = "") {
    const element = document.getElementById("settings-password-status");
    if (!element) return;
    element.textContent = value;
    element.dataset.tone = tone;
}

function setupDeleteAccount() {
    const deleteBtn = document.getElementById("settings-delete-account-btn");
    const confirmBox = document.getElementById("settings-delete-confirm");
    const confirmBtn = document.getElementById("settings-delete-confirm-btn");
    const cancelBtn = document.getElementById("settings-delete-cancel-btn");
    const passwordInput = document.getElementById("settings-delete-password");
    if (!deleteBtn || !confirmBox || !confirmBtn || !cancelBtn || !passwordInput) return;

    deleteBtn.addEventListener("click", () => {
        const isGoogleUser = window.PolytypeFirebase?.getAuthProvider?.() === "google.com";
        passwordInput.hidden = isGoogleUser;
        confirmBox.hidden = false;
        deleteBtn.hidden = true;
    });

    cancelBtn.addEventListener("click", () => {
        confirmBox.hidden = true;
        deleteBtn.hidden = false;
        passwordInput.value = "";
        setDeleteStatus("");
    });

    confirmBtn.addEventListener("click", async () => {
        const firebaseClient = window.PolytypeFirebase;
        confirmBtn.disabled = true;
        setDeleteStatus(tr("settings.deletingAccount"));

        try {
            await firebaseClient.reauthenticate(passwordInput.value);
            await firebaseClient.deleteAccount();
            window.location.href = "auth.html";
        } catch (error) {
            setDeleteStatus(firebaseClient.getErrorMessage(error), "error");
            confirmBtn.disabled = false;
        }
    });
}

function setDeleteStatus(value, tone = "") {
    const element = document.getElementById("settings-delete-status");
    if (!element) return;
    element.textContent = value;
    element.dataset.tone = tone;
}

function setupSoundToggle() {
    const button = document.getElementById("settings-sound-toggle");
    if (!button) return;

    let muted = false;
    try {
        muted = localStorage.getItem(sfxMutedKey) === "true";
    } catch (error) {
        muted = false;
    }
    button.setAttribute("aria-pressed", String(!muted));

    button.addEventListener("click", () => {
        const soundOn = button.getAttribute("aria-pressed") === "true";
        muted = soundOn;
        button.setAttribute("aria-pressed", String(!muted));
        try {
            localStorage.setItem(sfxMutedKey, String(muted));
        } catch (error) {
            // localStorage may be unavailable in private browsing.
        }
    });
}

function readCachedProfile() {
    try {
        return JSON.parse(localStorage.getItem("polytype-profile")) || null;
    } catch (error) {
        return null;
    }
}

function renderFromCache() {
    const cached = readCachedProfile();
    if (!cached) return;

    const emailEl = document.getElementById("settings-account-email");
    if (emailEl && cached.email) emailEl.textContent = cached.email;

    const nameInput = document.getElementById("profile-name-input");
    if (nameInput && cached.name) nameInput.value = cached.name;

    const handleInput = document.getElementById("profile-handle-input");
    if (handleInput && cached.handle) handleInput.value = cached.handle;

    renderAvatar(document.getElementById("profile-page-avatar"), cached);
}

function setupProfileControls() {
    const profileForm = document.getElementById("profile-form");
    const avatarInput = document.getElementById("profile-avatar-input");
    const avatarButton = document.getElementById("profile-avatar-upload-btn");

    if (profileForm) {
        profileForm.addEventListener("submit", async event => {
            event.preventDefault();
            await saveProfile();
        });
    }

    if (avatarButton && avatarInput) {
        avatarButton.addEventListener("click", () => avatarInput.click());
        avatarInput.addEventListener("change", async () => {
            const file = avatarInput.files?.[0];
            avatarInput.value = "";
            if (file) await stageAvatar(file);
        });
    }
}

function setupFirebaseSync() {
    const firebaseClient = window.PolytypeFirebase;
    if (!firebaseClient) return;

    firebaseClient.onChange(authState => {
        updateEditControls();

        // onChange fires synchronously with the *unresolved* state before
        // Firebase has even checked for a session - don't let that blank
        // tick stomp the cache-painted fields from renderFromCache(). Only
        // repaint once we've definitively resolved signed-in (profile
        // loaded) or signed-out (ready, no user).
        const resolved = Boolean(authState.profile) || (authState.ready && !authState.user);
        if (!resolved) return;

        const emailEl = document.getElementById("settings-account-email");
        if (emailEl) emailEl.textContent = authState.profile?.email || authState.user?.email || "-";

        // Skip repainting the inputs mid-save. saveProfile() writes the name
        // and the handle in two sequential API calls, and the first one's
        // notify() lands here with state.profile still holding the OLD handle
        // (the second call hasn't run yet) - repainting then would flash the
        // previous username back into the field for the half-second between
        // the two calls. The field already holds exactly what's being saved,
        // so there's nothing to repaint anyway. (The activeElement guards
        // cover the case where the user is still typing in a field.)
        const nameInput = document.getElementById("profile-name-input");
        if (nameInput && !isSavingProfile && document.activeElement !== nameInput) {
            nameInput.value = authState.profile?.displayName || "";
        }

        const handleInput = document.getElementById("profile-handle-input");
        if (handleInput && !isSavingProfile && document.activeElement !== handleInput) {
            handleInput.value = authState.profile?.handle || "";
        }

        // A photo waiting for Save keeps the avatar: the stored one coming
        // back with any routine profile update (XP, streak, anything) would
        // otherwise wipe the choice off the screen while it is still the thing
        // about to be saved.
        if (pendingAvatarDataUrl) renderPendingAvatar();
        else renderAvatar(document.getElementById("profile-page-avatar"), authState.profile);

        if (authState.user) refreshPasswordSectionCopy();

        if (authState.profile?.dailyGoalXp) {
            dailyGoalSelectApi?.setValue(String(authState.profile.dailyGoalXp));
        }

        setEditStatus(authState.user ? "" : tr("profile.signInToEdit"));
    });
}

async function saveProfile() {
    const firebaseClient = window.PolytypeFirebase;
    const nameInput = document.getElementById("profile-name-input");
    const handleInput = document.getElementById("profile-handle-input");
    if (!nameInput || !handleInput) return;

    if (!firebaseClient?.isSignedIn?.()) {
        setEditStatus(tr("profile.signInToEdit"), "error");
        return;
    }

    const name = nameInput.value.replace(/\s+/g, " ").trim();
    if (!name) {
        setEditStatus(tr("profile.nameInvalid"), "error");
        nameInput.focus();
        return;
    }

    const handle = normalizeHandleInput(handleInput.value);
    if (!handlePattern.test(handle)) {
        setEditStatus(tr("profile.handleInvalid"), "error");
        handleInput.focus();
        return;
    }

    isSavingProfile = true;
    updateEditControls();

    let stage = "name";
    try {
        await firebaseClient.setDisplayName(name);
        stage = "handle";
        await firebaseClient.setUserHandle(handle);
        // Last, and only if one is waiting: the photo is the slow part of the
        // save, and the name and handle shouldn't sit behind an upload. The
        // status line here is progress, not a receipt - it's cleared either
        // way, and the avatar on screen is what says the photo landed.
        if (pendingAvatarDataUrl) {
            stage = "avatar";
            setEditStatus(tr("profile.uploadingPhoto"));
            await firebaseClient.uploadProfileAvatar(pendingAvatarDataUrl);
            pendingAvatarDataUrl = null;
            document.getElementById("profile-page-avatar")?.classList.remove("is-pending");
            setEditStatus("");
        }
        // Repaint once, now, with the canonical values we just saved (handle
        // lowercased / @-stripped by normalizeHandleInput) so the fields show
        // what actually got stored rather than the raw typed text - the
        // onChange repaint that used to do this is intentionally skipped while
        // isSavingProfile is true (see setupFirebaseSync).
        if (document.activeElement !== nameInput) nameInput.value = name;
        if (document.activeElement !== handleInput) handleInput.value = handle;
    } catch (error) {
        showToast(getProfileErrorMessage(error, stage));
    } finally {
        isSavingProfile = false;
        updateEditControls();
    }
}

// Picking a photo crops it and puts it straight into the avatar, and stops
// there. That preview *is* the feedback - it's the new face, on the page,
// where the old one was - so there is nothing for a line of text to add.
// Saving it is saveProfile's job, on Save, with the rest of the form.
async function stageAvatar(file) {
    if (!window.PolytypeFirebase?.isSignedIn?.()) {
        setEditStatus(tr("profile.signInToEdit"), "error");
        return;
    }

    isPreparingAvatar = true;
    updateEditControls();
    setEditStatus(tr("profile.preparingPhoto"));

    try {
        pendingAvatarDataUrl = await prepareAvatarDataUrl(file);
        setEditStatus("");
        renderPendingAvatar();
    } catch (error) {
        setEditStatus(getProfileErrorMessage(error, "avatar"), "error");
    } finally {
        isPreparingAvatar = false;
        updateEditControls();
    }
}

// The staged photo, wearing the ring that says Save still has it to store
// (.profile-avatar.is-pending in style.css).
function renderPendingAvatar() {
    const element = document.getElementById("profile-page-avatar");
    if (!element || !pendingAvatarDataUrl) return;

    renderAvatar(element, { avatarUrl: pendingAvatarDataUrl });
    element.classList.add("is-pending");
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

function renderAvatar(element, profile) {
    if (!element) return;

    if (profile?.avatarUrl) {
        const image = document.createElement("img");
        image.src = profile.avatarUrl;
        image.alt = "";
        element.classList.add("has-image");
        element.replaceChildren(image);
        return;
    }

    element.classList.remove("has-image");
    const source = profile?.handle || profile?.displayName || "P";
    element.textContent = source.trim().charAt(0).toUpperCase() || "P";
}

function updateEditControls() {
    const signedIn = Boolean(window.PolytypeFirebase?.isSignedIn?.());
    const busy = isSavingProfile || isPreparingAvatar;
    const nameInput = document.getElementById("profile-name-input");
    const handleInput = document.getElementById("profile-handle-input");
    const saveButton = document.getElementById("profile-save-btn");
    const avatarButton = document.getElementById("profile-avatar-upload-btn");

    if (nameInput) nameInput.disabled = !signedIn || busy;
    if (handleInput) handleInput.disabled = !signedIn || busy;
    if (saveButton) saveButton.disabled = !signedIn || busy;
    if (avatarButton) avatarButton.disabled = !signedIn || busy;
}

function setEditStatus(value, tone = "") {
    const element = document.getElementById("profile-edit-status");
    if (!element) return;

    element.textContent = value;
    element.dataset.tone = tone;
}

let toastHideTimer = null;

function showToast(message) {
    const element = document.getElementById("settings-toast");
    if (!element) return;

    clearTimeout(toastHideTimer);
    element.textContent = message;
    element.classList.add("is-visible");
    toastHideTimer = setTimeout(() => {
        element.classList.remove("is-visible");
    }, 4000);
}

function getProfileErrorMessage(error, context = "handle") {
    const code = error?.code || "";
    // Which field a rejected-input error is about depends on how far the save
    // had got (saveProfile's `stage`), since all three go up one after another.
    const invalidInput = {
        name: "profile.nameInvalid",
        handle: "profile.handleInvalid",
        avatar: "profile.photoUnsupported"
    };
    const messages = {
        "api/400": tr(invalidInput[context] || invalidInput.handle),
        "api/409": tr("profile.handleTaken"),
        "api/413": tr("profile.photoTooLarge"),
        "api/503": tr("profile.storageUnavailable"),
        "avatar/source-too-large": tr("profile.photoTooLarge"),
        "avatar/upload-too-large": tr("profile.photoTooLarge"),
        "avatar/unsupported": tr("profile.photoUnsupported")
    };

    return messages[code] || error?.message || tr("profile.profileSaveFailed");
}

function normalizeHandleInput(value) {
    return typeof value === "string"
        ? value.trim().replace(/^@+/, "").toLowerCase()
        : "";
}

// Runs after every function/let/const above is defined - same reasoning as
// js/app-shell.js and js/main.js.
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSettingsPage, { once: true });
} else {
    initSettingsPage();
}
