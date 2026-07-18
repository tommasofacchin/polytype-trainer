// First-run onboarding: collects the full name + username a brand-new account
// doesn't have yet, then hands off to the language picker (which starts the
// guided tutorial - see api/start-course.js). Reached via the gate in
// js/tutorial.js (shouldForceOnboarding), which redirects any signed-in
// account with no username and no courses here before it can do anything
// else. A standalone page (no app shell / bottom nav), like auth.html, so the
// player stays focused on this one step.
(function () {
    "use strict";

    const handlePattern = /^[a-z0-9_]{3,20}$/;
    let isSaving = false;
    // Set the instant a save succeeds, so the onChange handler below doesn't
    // race our own redirect to languages.html: setUserHandle() notifies with
    // a now-populated handle, which would otherwise trip the "already
    // onboarded -> index.html" branch and steal the navigation.
    let hasCompleted = false;

    function tr(key, params = {}) {
        return window.PolytypeI18n?.t?.(key, params) || key;
    }

    function normalizeHandleInput(value) {
        return typeof value === "string" ? value.trim().replace(/^@+/, "").toLowerCase() : "";
    }

    function init() {
        const form = document.getElementById("onboarding-form");
        form?.addEventListener("submit", event => {
            event.preventDefault();
            save();
        });

        window.PolytypeFirebase?.onChange?.(authState => {
            if (!authState.ready || hasCompleted) return;

            if (!authState.user) {
                window.location.href = "auth.html";
                return;
            }

            // Wait for the profile fetch to resolve before deciding anything -
            // handle is only known once it does.
            if (!authState.profile) return;

            if (authState.profile.handle) {
                // Already has a username (typed this URL directly, or hit back
                // after finishing) - nothing to do here.
                window.location.href = "index.html";
                return;
            }

            // Prefill the name from whatever we already know (a Google account
            // carries its real name; email signups default to "Player", which
            // we don't want to prefill). Don't clobber what they're typing.
            const nameInput = document.getElementById("onboarding-name");
            const displayName = authState.profile.displayName;
            if (nameInput && !nameInput.value && displayName && displayName !== "Player") {
                nameInput.value = displayName;
            }
        });
    }

    async function save() {
        if (isSaving) return;

        const firebaseClient = window.PolytypeFirebase;
        const nameInput = document.getElementById("onboarding-name");
        const handleInput = document.getElementById("onboarding-handle");
        if (!nameInput || !handleInput) return;

        if (!firebaseClient?.isSignedIn?.()) {
            window.location.href = "auth.html";
            return;
        }

        const name = nameInput.value.replace(/\s+/g, " ").trim();
        if (!name) {
            setStatus(tr("profile.nameInvalid"), "error");
            nameInput.focus();
            return;
        }

        const handle = normalizeHandleInput(handleInput.value);
        if (!handlePattern.test(handle)) {
            setStatus(tr("profile.handleInvalid"), "error");
            handleInput.focus();
            return;
        }

        setSaving(true);
        setStatus(tr("onboarding.saving"));

        // Name first, then handle: the handle is the step that can fail on a
        // collision (api/409), and it's the one we gate re-entry on, so it
        // must be the last thing to succeed.
        try {
            await firebaseClient.setDisplayName(name);
            await firebaseClient.setUserHandle(handle);
            hasCompleted = true;
            // On to the language picker, which creates the first course and
            // kicks off the tutorial (api/start-course.js).
            window.location.href = "languages.html";
        } catch (error) {
            setStatus(getErrorMessage(error), "error");
            setSaving(false);
        }
    }

    function setSaving(saving) {
        isSaving = saving;
        const button = document.getElementById("onboarding-submit-btn");
        const nameInput = document.getElementById("onboarding-name");
        const handleInput = document.getElementById("onboarding-handle");
        if (button) button.disabled = saving;
        if (nameInput) nameInput.disabled = saving;
        if (handleInput) handleInput.disabled = saving;
    }

    function setStatus(value, tone = "") {
        const element = document.getElementById("onboarding-status");
        if (!element) return;
        element.textContent = value;
        element.dataset.tone = tone;
    }

    function getErrorMessage(error) {
        const code = error?.code || "";
        const messages = {
            "api/400": tr("profile.handleInvalid"),
            "api/401": tr("auth.signInRequired"),
            "api/409": tr("profile.handleTaken"),
            "api/503": tr("auth.serviceUnavailable")
        };
        return messages[code] || error?.message || tr("profile.profileSaveFailed");
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init, { once: true });
    } else {
        init();
    }
})();
