(function () {
    const state = {
        configured: false,
        ready: false,
        user: null,
        profile: null,
        error: null
    };
    const listeners = new Set();

    let auth = null;

    function tr(key, params = {}) {
        return window.PolytypeI18n?.t?.(key, params) || key;
    }

    window.PolytypeFirebase = {
        state,
        onChange(listener) {
            listeners.add(listener);
            listener({ ...state });
            return () => listeners.delete(listener);
        },
        signIn,
        register,
        signInWithGoogle,
        signOut,
        isSignedIn,
        refreshProfile,
        completePracticeSession,
        previewSprintEnd,
        unlockWord,
        buyKey,
        buyWordChest,
        buyStreakFreeze,
        startCourse,
        advanceTutorial,
        skipTutorial,
        setUserHandle,
        setDisplayName,
        setDailyGoal,
        uploadProfileAvatar,
        getAuthProvider,
        hasPasswordProvider,
        reauthenticate,
        setPassword,
        deleteAccount,
        getErrorMessage: getAuthErrorMessage,
        searchUsers,
        sendFriendRequest,
        respondFriendRequest,
        removeFriend,
        getSocialOverview,
        getActivityFeed,
        getFriendProfile,
        getHomeOverview,
        getActivityHistory,
        claimDailyChest
    };

    document.addEventListener("DOMContentLoaded", () => {
        initFirebase();
        initAuthUi();
    });

    function initFirebase() {
        const config = window.POLYTYPE_FIREBASE_CONFIG;
        const hasFirebaseSdk = Boolean(window.firebase?.initializeApp);
        const hasConfig = Boolean(config?.apiKey && config?.projectId && config?.authDomain);

        if (!hasFirebaseSdk || !hasConfig) {
            state.ready = true;
            state.error = tr("auth.firebaseMissing");
            notify();
            return;
        }

        try {
            const app = window.firebase.apps.length
                ? window.firebase.app()
                : window.firebase.initializeApp(config);

            auth = app.auth();
            state.configured = true;

            auth.onAuthStateChanged(handleAuthStateChanged);
        } catch (error) {
            state.ready = true;
            state.error = getAuthErrorMessage(error);
            notify();
        }
    }

    async function callApi(endpoint, data) {
        const token = await auth.currentUser.getIdToken();
        const response = await fetch(`/api/${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const err = await response.json().catch(() => ({}));
            const error = new Error(err.error || tr("auth.requestFailed"));
            error.code = `api/${response.status}`;
            throw error;
        }

        return response.json();
    }

    async function handleAuthStateChanged(user) {
        state.user = user;
        state.ready = true;
        state.error = null;

        if (!user) {
            state.profile = null;
            notify();
            return;
        }

        // Notify now, before the profile fetch resolves, so listeners that
        // only need `ready`+`user` (e.g. gamestate's coin/chest/missions
        // fetch) can start their own request in parallel instead of
        // waiting on ensure-user-profile to finish first - that serial
        // chain was the main cause of the slow post-login paint.
        notify();

        try {
            const result = await callApi("ensure-user-profile", {
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
            });
            state.profile = result.data?.user || null;
            syncProfileToLocalStorage(state.profile);
        } catch (error) {
            state.error = getAuthErrorMessage(error);
        }

        notify();
    }

    async function refreshProfile() {
        if (!state.user) return null;

        try {
            const result = await callApi("ensure-user-profile", {
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
            });
            state.profile = result.data?.user || null;
            syncProfileToLocalStorage(state.profile);
            notify();
            return state.profile;
        } catch {
            return null;
        }
    }

    async function signIn(email, password) {
        assertConfigured();
        return auth.signInWithEmailAndPassword(email, password);
    }

    async function register(email, password) {
        assertConfigured();
        return auth.createUserWithEmailAndPassword(email, password);
    }

    async function signInWithGoogle() {
        assertConfigured();
        const provider = new window.firebase.auth.GoogleAuthProvider();
        return auth.signInWithPopup(provider);
    }

    async function signOut() {
        assertConfigured();
        return auth.signOut();
    }

    function isSignedIn() {
        return Boolean(state.user);
    }

    async function completePracticeSession(payload) {
        assertConfigured();
        if (!state.user) throw new Error(tr("auth.signInBeforeSaving"));

        const result = await callApi("complete-practice-session", {
            ...payload,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        });
        const progress = result.data;

        if (progress) {
            state.profile = applyProgressToProfile(state.profile, progress);
            syncProfileToLocalStorage(state.profile);
            notify();
        }

        return result;
    }

    // Read-only companion to the call above: what the end-of-sprint screens
    // will say, asked while the run is still being played - see
    // api/preview-sprint-end.js. Deliberately does NOT touch state.profile:
    // nothing has been earned yet, and the sprint page only feeds the answer
    // to its celebration screens.
    async function previewSprintEnd() {
        assertConfigured();
        if (!state.user) throw new Error(tr("auth.signInRequired"));

        return callApi("preview-sprint-end", {
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        });
    }

    async function unlockWord(courseId, wordSuffix) {
        assertConfigured();
        if (!state.user) throw new Error(tr("auth.signInRequired"));

        const result = await callApi("unlock-word", { courseId, wordSuffix });
        const progress = result.data;

        if (progress) {
            state.profile = applyProgressToProfile(state.profile, progress);
            syncProfileToLocalStorage(state.profile);
            notify();
        }

        return result;
    }

    async function buyKey(courseId) {
        assertConfigured();
        if (!state.user) throw new Error(tr("auth.signInRequired"));

        const result = await callApi("buy-key", { courseId });
        const progress = result.data;

        if (progress) {
            state.profile = applyProgressToProfile(state.profile, progress);
            syncProfileToLocalStorage(state.profile);
            notify();
        }

        return result;
    }

    async function buyWordChest(courseId) {
        assertConfigured();
        if (!state.user) throw new Error(tr("auth.signInRequired"));

        const result = await callApi("buy-word-chest", { courseId });
        const progress = result.data;

        if (progress) {
            state.profile = applyProgressToProfile(state.profile, progress);
            syncProfileToLocalStorage(state.profile);
            notify();
        }

        return result;
    }

    async function buyStreakFreeze(courseId) {
        assertConfigured();
        if (!state.user) throw new Error(tr("auth.signInRequired"));

        const result = await callApi("buy-streak-freeze", { courseId });
        const progress = result.data;

        if (progress) {
            state.profile = applyProgressToProfile(state.profile, progress);
            syncProfileToLocalStorage(state.profile);
            notify();
        }

        return result;
    }

    async function startCourse(courseId) {
        assertConfigured();
        if (!state.user) throw new Error(tr("auth.signInRequired"));

        const result = await callApi("start-course", { courseId });
        const progress = result.data;

        if (progress) {
            state.profile = applyProgressToProfile(state.profile, progress);
            syncProfileToLocalStorage(state.profile);
            notify();
        }

        return result;
    }

    async function advanceTutorial() {
        assertConfigured();
        if (!state.user) throw new Error(tr("auth.signInRequired"));

        const result = await callApi("update-profile", { action: "advanceTutorial" });

        if (result.data?.tutorial) {
            state.profile = { ...(state.profile || {}), tutorial: result.data.tutorial };
            syncProfileToLocalStorage(state.profile);
            notify();
        }

        return result;
    }

    // Abandons the tutorial for good (see the skip branch in js/tutorial.js).
    // The sync below is what releases the nav rail and the spotlight
    // everywhere - it fires polytype-profile-updated, which js/tutorial.js
    // re-evaluates against a profile that no longer has an active run.
    async function skipTutorial() {
        assertConfigured();
        if (!state.user) throw new Error(tr("auth.signInRequired"));

        const result = await callApi("update-profile", { action: "skipTutorial" });

        if (result.data?.tutorial) {
            state.profile = { ...(state.profile || {}), tutorial: result.data.tutorial };
            syncProfileToLocalStorage(state.profile);
            notify();
        }

        return result;
    }

    async function setUserHandle(handle) {
        assertConfigured();
        if (!state.user) throw new Error(tr("auth.signInRequired"));

        const result = await callApi("update-profile", { action: "handle", handle });
        const savedHandle = result.data?.handle || null;

        if (savedHandle) {
            state.profile = {
                ...(state.profile || {}),
                handle: savedHandle
            };
            syncProfileToLocalStorage(state.profile);
            notify();
        }

        return result;
    }

    async function setDisplayName(name) {
        assertConfigured();
        if (!state.user) throw new Error(tr("auth.signInRequired"));

        const result = await callApi("update-profile", { action: "name", name });
        const savedName = result.data?.displayName || null;

        if (savedName) {
            state.profile = {
                ...(state.profile || {}),
                displayName: savedName
            };
            syncProfileToLocalStorage(state.profile);
            notify();
        }

        return result;
    }

    async function setDailyGoal(dailyGoalXp) {
        assertConfigured();
        if (!state.user) throw new Error(tr("auth.signInRequired"));

        const result = await callApi("update-profile", { action: "dailyGoal", dailyGoalXp });
        const savedGoal = result.data?.dailyGoalXp;

        if (typeof savedGoal === "number") {
            state.profile = { ...(state.profile || {}), dailyGoalXp: savedGoal };
            syncProfileToLocalStorage(state.profile);
            notify();
        }

        return result;
    }

    // "password" | "google.com" | null (no signed-in user) - the provider
    // used for the current sign-in. Only meaningful for choosing HOW to
    // reauthenticate a stale session (reauthenticate/deleteAccount below);
    // it does not mean the account only has that one provider linked - see
    // hasPasswordProvider, which checks all of them.
    function getAuthProvider() {
        return state.user?.providerData?.[0]?.providerId || null;
    }

    // Whether this account already has an email/password credential linked,
    // regardless of which provider the current session signed in with -
    // this app lets an account carry both Google and password sign-in at
    // once (see setPassword below), so a Google-session user can still
    // already have one.
    function hasPasswordProvider() {
        return Boolean(state.user?.providerData?.some(entry => entry.providerId === "password"));
    }

    // Required by Firebase before either updatePassword or delete() below
    // will succeed if the session isn't fresh (auth/requires-recent-login) -
    // callers should always call this right before, not cache the result.
    async function reauthenticate(currentPassword) {
        assertConfigured();
        if (!state.user) throw new Error(tr("auth.signInRequired"));

        const provider = getAuthProvider();
        if (provider === "google.com") {
            const googleProvider = new window.firebase.auth.GoogleAuthProvider();
            return state.user.reauthenticateWithPopup(googleProvider);
        }

        const credential = window.firebase.auth.EmailAuthProvider.credential(state.user.email, currentPassword);
        return state.user.reauthenticateWithCredential(credential);
    }

    // Adds or updates this account's email/password credential - links one
    // for the first time on an account that only ever signed in with Google
    // (so it can then sign in either way, per settings.html's Account
    // section), or updates the existing one otherwise. Either path can hit
    // auth/requires-recent-login on a stale session; every account here can
    // sign in with Google (see auth.html), so that's always a safe way to
    // silently refresh the session without asking for a password the user
    // may not remember - or, in the linking case, doesn't have yet.
    async function setPassword(newPassword) {
        assertConfigured();
        if (!state.user) throw new Error(tr("auth.signInRequired"));

        const apply = () => hasPasswordProvider()
            ? state.user.updatePassword(newPassword)
            : state.user.linkWithCredential(window.firebase.auth.EmailAuthProvider.credential(state.user.email, newPassword));

        try {
            await apply();
        } catch (error) {
            if (error?.code !== "auth/requires-recent-login") throw error;
            await state.user.reauthenticateWithPopup(new window.firebase.auth.GoogleAuthProvider());
            await apply();
        }
    }

    // Deletes all server-side data first (api/update-profile.js's "delete"
    // action, which also deletes the Auth user via the admin SDK), then
    // tears down the local client session - in that order, so a failure
    // partway through the API call leaves the user still signed in with
    // their data intact instead of locked out with an orphaned account.
    async function deleteAccount() {
        assertConfigured();
        if (!state.user) throw new Error(tr("auth.signInRequired"));

        await callApi("update-profile", { action: "delete" });
        await signOut();
    }

    async function uploadProfileAvatar(imageDataUrl) {
        assertConfigured();
        if (!state.user) throw new Error(tr("auth.signInRequired"));

        const result = await callApi("update-profile", {
            action: "avatar",
            imageDataUrl,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        });
        const user = result.data?.user;
        const avatarUrl = result.data?.avatarUrl || user?.avatarUrl || null;

        if (avatarUrl || user) {
            state.profile = {
                ...(state.profile || {}),
                ...(user || {}),
                avatarUrl
            };
            syncProfileToLocalStorage(state.profile);
            notify();
        }

        return result;
    }

    async function searchUsers(query) {
        assertConfigured();
        if (!state.user) throw new Error(tr("auth.signInRequired"));

        return callApi("friends", { action: "search", query });
    }

    async function sendFriendRequest(toUid) {
        assertConfigured();
        if (!state.user) throw new Error(tr("auth.signInRequired"));

        return callApi("friends", { action: "send", toUid });
    }

    async function respondFriendRequest(requestId, accept) {
        assertConfigured();
        if (!state.user) throw new Error(tr("auth.signInRequired"));

        return callApi("friends", { action: "respond", requestId, accept });
    }

    async function removeFriend(friendUid) {
        assertConfigured();
        if (!state.user) throw new Error(tr("auth.signInRequired"));

        return callApi("friends", { action: "remove", friendUid });
    }

    async function getSocialOverview() {
        assertConfigured();
        if (!state.user) throw new Error(tr("auth.signInRequired"));

        return callApi("friends", { action: "overview" });
    }

    async function getActivityFeed() {
        assertConfigured();
        if (!state.user) throw new Error(tr("auth.signInRequired"));

        return callApi("friends", { action: "activity" });
    }

    async function getFriendProfile(uid) {
        assertConfigured();
        if (!state.user) throw new Error(tr("auth.signInRequired"));

        return callApi("friends", { action: "profile", uid });
    }

    async function getHomeOverview() {
        assertConfigured();
        if (!state.user) throw new Error(tr("auth.signInRequired"));

        return callApi("get-home-overview", {
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        });
    }

    async function getActivityHistory() {
        assertConfigured();
        if (!state.user) throw new Error(tr("auth.signInRequired"));

        // Shares get-home-overview rather than owning an endpoint: the Hobby
        // plan caps the deployment at 12 serverless functions.
        return callApi("get-home-overview", {
            action: "activity",
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        });
    }

    async function claimDailyChest(courseId) {
        assertConfigured();
        if (!state.user) throw new Error(tr("auth.signInRequired"));

        const result = await callApi("claim-daily-chest", {
            courseId,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        });

        if (result.data) {
            // Reuses the same course-merge logic as buy-key/unlock-word/etc
            // - the reward lands on courseId's own coin balance (see
            // api/claim-daily-chest.js), not a shared user-level total.
            state.profile = applyProgressToProfile(state.profile, result.data);
            syncProfileToLocalStorage(state.profile);
            notify();
        }

        return result;
    }

    function initAuthUi() {
        initHeaderAuthLink();
        initAuthPageUi();
    }

    function initHeaderAuthLink() {
        const authLink = document.getElementById("auth-link");
        const authDropdown = document.getElementById("auth-dropdown");
        const signOutBtn = document.getElementById("auth-signout-btn");
        if (!authLink) return;

        let isSignedIn = false;

        function closeDropdown() {
            if (authDropdown) authDropdown.hidden = true;
        }

        authLink.addEventListener("click", event => {
            if (!isSignedIn || !authDropdown) return;
            event.preventDefault();
            authDropdown.hidden = !authDropdown.hidden;
        });

        if (signOutBtn) {
            signOutBtn.addEventListener("click", async () => {
                closeDropdown();
                await signOut();
                window.location.href = "auth.html";
            });
        }

        document.addEventListener("click", event => {
            if (authDropdown && !authDropdown.hidden &&
                !authLink.contains(event.target) &&
                !authDropdown.contains(event.target)) {
                closeDropdown();
            }
        });

        window.PolytypeFirebase.onChange(nextState => {
            const user = nextState.user;
            isSignedIn = Boolean(user);
            const label = user
                ? getShortAuthLabel(nextState.profile?.handle ? `@${nextState.profile.handle}` : nextState.profile?.displayName || user.email)
                : tr("auth.signIn");

            authLink.textContent = label;
            authLink.setAttribute(
                "aria-label",
                user ? tr("auth.openAccount") : tr("auth.openSignin")
            );
            authLink.classList.toggle("is-signed-in", isSignedIn);
            if (!isSignedIn) closeDropdown();
        });
    }

    function initAuthPageUi() {
        const page = document.getElementById("auth-page");
        if (!page) return;

        const form = document.getElementById("auth-form");
        const email = document.getElementById("auth-email");
        const password = document.getElementById("auth-password");
        const confirmLabel = document.getElementById("auth-confirm-label");
        const confirmPassword = document.getElementById("auth-confirm-password");
        const switchBtn = document.getElementById("auth-switch-btn");
        const switchText = document.getElementById("auth-switch-text");
        const submitBtn = document.getElementById("auth-submit-btn");
        const panelTitle = document.getElementById("auth-panel-title");
        const panelCopy = document.getElementById("auth-panel-copy");
        const status = document.getElementById("auth-status");
        const googleBtn = document.getElementById("auth-google-btn");

        if (
            !form ||
            !email ||
            !password ||
            !confirmLabel ||
            !confirmPassword ||
            !switchBtn ||
            !switchText ||
            !submitBtn ||
            !panelTitle ||
            !panelCopy ||
            !status
        ) {
            return;
        }

        let mode = "signin";

        function setMode(nextMode) {
            mode = nextMode;
            page.dataset.mode = mode;
            submitBtn.textContent = mode === "signin" ? tr("auth.signIn") : tr("auth.createAccount");
            panelTitle.textContent = mode === "signin" ? tr("auth.signIn") : tr("auth.register");
            panelCopy.textContent = mode === "signin"
                ? tr("auth.signInCopy")
                : tr("auth.registerCopy");
            switchText.textContent = mode === "signin"
                ? tr("auth.noAccount")
                : tr("auth.hasAccount");
            switchBtn.textContent = mode === "signin" ? tr("auth.register") : tr("auth.signIn");
            password.autocomplete = mode === "signin" ? "current-password" : "new-password";
            confirmLabel.hidden = mode !== "register";
            confirmPassword.required = mode === "register";
            if (mode !== "register") confirmPassword.value = "";
            status.textContent = "";
        }

        switchBtn.addEventListener("click", () => {
            setMode(mode === "signin" ? "register" : "signin");
        });

        form.addEventListener("submit", async event => {
            event.preventDefault();

            if (mode === "register" && password.value !== confirmPassword.value) {
                status.textContent = tr("auth.passwordMismatch");
                confirmPassword.focus();
                return;
            }

            const action = mode === "signin"
                ? () => signIn(email.value, password.value)
                : () => register(email.value, password.value);
            const successMessage = mode === "signin" ? tr("auth.signedIn") : tr("auth.accountCreated");
            const didSucceed = await runAuthAction(status, action, successMessage);

            if (didSucceed) {
                window.location.href = "index.html";
            }
        });

        if (googleBtn) {
            googleBtn.addEventListener("click", async () => {
                const didSucceed = await runAuthAction(status, signInWithGoogle, tr("auth.signedIn"));
                if (didSucceed) window.location.href = "index.html";
            });
        }

        setMode("signin");

        window.PolytypeFirebase.onChange(nextState => {
            if (nextState.ready && nextState.user) {
                window.location.href = "index.html";
                return;
            }

            if (!nextState.configured) {
                status.textContent = tr("auth.configMissing");
            } else if (nextState.error) {
                status.textContent = nextState.error;
            }
        });
    }

    async function runAuthAction(status, action, successMessage) {
        status.textContent = "";

        try {
            await action();
            status.textContent = successMessage;
            return true;
        } catch (error) {
            status.textContent = getAuthErrorMessage(error);
            return false;
        }
    }

    function syncProfileToLocalStorage(remoteProfile) {
        if (!remoteProfile) return;

        const localProfile = {
            name: remoteProfile.displayName || "Player",
            handle: remoteProfile.handle || null,
            email: remoteProfile.email || null,
            avatarUrl: remoteProfile.avatarUrl || null,
            xp: remoteProfile.totalXp || 0,
            dayStreak: remoteProfile.currentStreak || 0,
            // Mirrored so the header can paint the flame lit/grey from cache
            // on the very first frame, before auth resolves - see
            // isStreakAtRisk in js/app-shell.js.
            lastPracticeDate: remoteProfile.lastPracticeDate || null,
            streakFreezes: remoteProfile.streakFreezes || 0,
            maxStreakFreezes: remoteProfile.maxStreakFreezes || 2,
            dailyGoalXp: remoteProfile.dailyGoalXp || 50,
            tutorial: remoteProfile.tutorial || null,
            badges: remoteProfile.badges || [],
            courses: remoteProfile.courses || {}
        };

        localStorage.setItem("polytype-profile", JSON.stringify(localProfile));
        document.dispatchEvent(new CustomEvent("polytype-profile-updated", {
            detail: localProfile
        }));
    }

    function notify() {
        const snapshot = { ...state };
        listeners.forEach(listener => listener(snapshot));
    }

    function applyProgressToProfile(currentProfile, progress) {
        const profile = {
            ...(currentProfile || {}),
            totalXp: progress.totalXp || currentProfile?.totalXp || 0,
            globalLevel: progress.globalLevel || currentProfile?.globalLevel || 1,
            currentStreak: progress.streak?.currentStreak ?? currentProfile?.currentStreak ?? 0,
            longestStreak: progress.streak?.longestStreak ?? currentProfile?.longestStreak ?? 0,
            // A completed session reports the day it counted for under `streak`
            // (calculateStreakUpdate's todayKey); other actions (unlock, buy)
            // carry no streak block, so the existing date is preserved. Without
            // this the live profile kept a stale lastPracticeDate and the
            // header flame stayed grey until a hard reload, even though the
            // player had just practised (see paintStreak in js/app-shell.js).
            lastPracticeDate: progress.streak?.lastPracticeDate ?? currentProfile?.lastPracticeDate ?? null,
            // Session saves report freezes nested under `streak` (that's where
            // calculateStreakUpdate puts them); buy-streak-freeze reports the
            // new count at the top level, since it isn't a streak update.
            streakFreezes:
                progress.streak?.streakFreezes ?? progress.streakFreezes ?? currentProfile?.streakFreezes ?? 0,
            maxStreakFreezes: progress.maxStreakFreezes ?? currentProfile?.maxStreakFreezes ?? 2,
            tutorial: "tutorial" in progress ? progress.tutorial : (currentProfile?.tutorial ?? null),
            courses: {
                ...(currentProfile?.courses || {})
            }
        };

        if (progress.course?.courseId) {
            const incoming = progress.course;
            const cached = profile.courses[incoming.courseId];
            // xp and unlockedWords only ever grow for a course, so a reply
            // reporting fewer of either than what's already cached must be
            // an out-of-order response (e.g. a Trainer autosave that was
            // in flight when a Deck-page unlock committed, or two tabs
            // open on the same course) - applying it would revert the
            // newer state and desync the cache from what the server
            // actually has, which is exactly what caused unlocked cards to
            // render as locked and "already unlocked"/"no keys" errors.
            const incomingIsFresh = !cached ||
                ((incoming.xp || 0) >= (cached.xp || 0) &&
                    (incoming.unlockedWords?.length || 0) >= (cached.unlockedWords?.length || 0));
            if (incomingIsFresh) profile.courses[incoming.courseId] = incoming;
        }

        return profile;
    }

    function assertConfigured() {
        if (!state.configured || !auth) {
            throw new Error(tr("auth.firebaseNotConfigured"));
        }
    }

    function getShortAuthLabel(label) {
        if (!label) return tr("auth.account");
        if (label.includes("@")) return label.split("@")[0];
        return label.length > 14 ? `${label.slice(0, 13)}...` : label;
    }

    function getAuthErrorMessage(error) {
        const code = error?.code || "";

        const messages = {
            "auth/email-already-in-use": tr("auth.emailUsed"),
            "auth/invalid-email": tr("auth.invalidEmail"),
            "auth/invalid-login-credentials": tr("auth.wrongLogin"),
            "auth/missing-password": tr("auth.passwordRequired"),
            "auth/weak-password": tr("auth.weakPassword"),
            "auth/user-not-found": tr("auth.accountNotFound"),
            "auth/wrong-password": tr("auth.wrongLogin"),
            "auth/invalid-credential": tr("auth.wrongLogin"),
            "auth/requires-recent-login": tr("auth.reauthRequired"),
            "auth/too-many-requests": tr("auth.tooManyRequests"),
            "auth/user-mismatch": tr("auth.reauthRequired"),
            "auth/popup-blocked": tr("auth.popupBlocked"),
            "auth/credential-already-in-use": tr("auth.credentialInUse"),
            "auth/operation-not-allowed": tr("auth.googleNotEnabled"),
            "auth/popup-closed-by-user": tr("auth.googlePopupClosed"),
            "api/401": tr("auth.signInRequired"),
            "api/409": tr("auth.chestAlreadyClaimed"),
            "api/503": tr("auth.serviceUnavailable")
        };

        return messages[code] || error?.message || tr("auth.firebaseError");
    }
})();
