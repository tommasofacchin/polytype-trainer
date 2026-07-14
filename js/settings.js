const handlePattern = /^[a-z0-9_]{3,20}$/;
const supportedAvatarTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
const maxSourceAvatarBytes = 10 * 1024 * 1024;
const maxUploadAvatarBytes = 2 * 1024 * 1024;
const avatarCanvasSize = 512;
let isSavingHandle = false;
let isUploadingAvatar = false;

function tr(key, params = {}) {
    return window.PolytypeI18n?.t?.(key, params) || key;
}

document.addEventListener("DOMContentLoaded", () => {
    setupProfileControls();
    setupFirebaseSync();

    document.getElementById("settings-logout-btn")?.addEventListener("click", async () => {
        await window.PolytypeFirebase?.signOut?.();
        window.location.href = "auth.html";
    });
});

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

        const emailEl = document.getElementById("settings-account-email");
        if (emailEl) emailEl.textContent = authState.profile?.email || authState.user?.email || "-";

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
    const busy = isSavingHandle || isUploadingAvatar;
    const handleInput = document.getElementById("profile-handle-input");
    const handleButton = document.getElementById("profile-handle-save-btn");
    const avatarButton = document.getElementById("profile-avatar-upload-btn");

    if (handleInput) handleInput.disabled = !signedIn || busy;
    if (handleButton) handleButton.disabled = !signedIn || busy || isUploadingAvatar;
    if (avatarButton) avatarButton.disabled = !signedIn || busy || isSavingHandle;
}

function setEditStatus(value, tone = "") {
    const element = document.getElementById("profile-edit-status");
    if (!element) return;

    element.textContent = value;
    element.dataset.tone = tone;
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

function normalizeHandleInput(value) {
    return typeof value === "string"
        ? value.trim().replace(/^@+/, "").toLowerCase()
        : "";
}
