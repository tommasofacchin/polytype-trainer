const handlePattern = /^[a-z0-9_]{3,20}$/;
const supportedAvatarTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
const maxSourceAvatarBytes = 10 * 1024 * 1024;
const maxUploadAvatarBytes = 2 * 1024 * 1024;
const avatarCanvasSize = 512;
const sfxMutedKey = "polytype-sfx-muted";
let isSavingHandle = false;
let isSavingName = false;
let isUploadingAvatar = false;

function tr(key, params = {}) {
    return window.PolytypeI18n?.t?.(key, params) || key;
}

function initSettingsPage() {
    renderFromCache();
    setupProfileControls();
    setupFirebaseSync();
    setupSoundToggle();

    document.getElementById("settings-logout-btn")?.addEventListener("click", async () => {
        await window.PolytypeFirebase?.signOut?.();
        window.location.href = "auth.html";
    });
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
    const nameForm = document.getElementById("profile-name-form");
    const handleForm = document.getElementById("profile-handle-form");
    const avatarInput = document.getElementById("profile-avatar-input");
    const avatarButton = document.getElementById("profile-avatar-upload-btn");

    if (nameForm) {
        nameForm.addEventListener("submit", async event => {
            event.preventDefault();
            await saveName();
        });
    }

    if (handleForm) {
        handleForm.addEventListener("submit", async event => {
            event.preventDefault();
            await saveHandle();
        });
    }

    if (avatarButton && avatarInput) {
        avatarButton.addEventListener("click", () => avatarInput.click());
        avatarInput.addEventListener("change", async () => {
            const file = avatarInput.files?.[0];
            avatarInput.value = "";
            if (file) await uploadAvatar(file);
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

        const nameInput = document.getElementById("profile-name-input");
        if (nameInput && document.activeElement !== nameInput) {
            nameInput.value = authState.profile?.displayName || "";
        }

        const handleInput = document.getElementById("profile-handle-input");
        if (handleInput && document.activeElement !== handleInput) {
            handleInput.value = authState.profile?.handle || "";
        }

        renderAvatar(document.getElementById("profile-page-avatar"), authState.profile);

        if (!authState.user) {
            setEditStatus(tr("profile.signInToEdit"));
        } else if (authState.profile) {
            setEditStatus(tr("profile.profileReady"), "success");
        }
    });
}

async function saveName() {
    const firebaseClient = window.PolytypeFirebase;
    const input = document.getElementById("profile-name-input");
    if (!input) return;

    if (!firebaseClient?.isSignedIn?.()) {
        setEditStatus(tr("profile.signInToEdit"), "error");
        return;
    }

    const name = input.value.replace(/\s+/g, " ").trim();
    if (!name) {
        setEditStatus(tr("profile.nameInvalid"), "error");
        input.focus();
        return;
    }

    isSavingName = true;
    updateEditControls();
    setEditStatus(tr("profile.savingName"));

    try {
        await firebaseClient.setDisplayName(name);
        setEditStatus(tr("profile.nameSaved"), "success");
    } catch (error) {
        setEditStatus(getProfileErrorMessage(error, "name"), "error");
    } finally {
        isSavingName = false;
        updateEditControls();
    }
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
        await firebaseClient.setUserHandle(handle);
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
        await firebaseClient.uploadProfileAvatar(imageDataUrl);
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
    const busy = isSavingHandle || isSavingName || isUploadingAvatar;
    const nameInput = document.getElementById("profile-name-input");
    const nameButton = document.getElementById("profile-name-save-btn");
    const handleInput = document.getElementById("profile-handle-input");
    const handleButton = document.getElementById("profile-handle-save-btn");
    const avatarButton = document.getElementById("profile-avatar-upload-btn");

    if (nameInput) nameInput.disabled = !signedIn || busy;
    if (nameButton) nameButton.disabled = !signedIn || busy;
    if (handleInput) handleInput.disabled = !signedIn || busy;
    if (handleButton) handleButton.disabled = !signedIn || busy;
    if (avatarButton) avatarButton.disabled = !signedIn || busy;
}

function setEditStatus(value, tone = "") {
    const element = document.getElementById("profile-edit-status");
    if (!element) return;

    element.textContent = value;
    element.dataset.tone = tone;
}

function getProfileErrorMessage(error, context = "handle") {
    const code = error?.code || "";
    const messages = {
        "api/400": context === "name" ? tr("profile.nameInvalid") : tr("profile.handleInvalid"),
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
