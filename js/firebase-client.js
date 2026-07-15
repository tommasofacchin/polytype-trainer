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
        completePracticeSession,
        unlockWord,
        setUserHandle,
        setDisplayName,
        uploadProfileAvatar,
        searchUsers,
        sendFriendRequest,
        respondFriendRequest,
        removeFriend,
        getSocialOverview,
        getFriendProfile,
        getHomeOverview,
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

    async function unlockWord(courseId) {
        assertConfigured();
        if (!state.user) throw new Error(tr("auth.signInRequired"));

        const result = await callApi("unlock-word", { courseId });
        const progress = result.data;

        if (progress) {
            state.profile = applyProgressToProfile(state.profile, progress);
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

    async function claimDailyChest() {
        assertConfigured();
        if (!state.user) throw new Error(tr("auth.signInRequired"));

        const result = await callApi("claim-daily-chest", {
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        });

        if (result.data) {
            state.profile = {
                ...(state.profile || {}),
                totalXp: result.data.totalXp,
                globalLevel: result.data.globalLevel,
                coins: result.data.coins
            };
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
            streakFreezes: remoteProfile.streakFreezes || 0,
            maxStreakFreezes: remoteProfile.maxStreakFreezes || 2,
            coins: remoteProfile.coins || 0,
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
            streakFreezes: progress.streak?.streakFreezes ?? currentProfile?.streakFreezes ?? 0,
            coins: progress.coins ?? currentProfile?.coins ?? 0,
            courses: {
                ...(currentProfile?.courses || {})
            }
        };

        if (progress.course?.courseId) {
            profile.courses[progress.course.courseId] = progress.course;
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
            "auth/operation-not-allowed": tr("auth.googleNotEnabled"),
            "auth/popup-closed-by-user": tr("auth.googlePopupClosed"),
            "api/401": tr("auth.signInRequired"),
            "api/409": tr("auth.chestAlreadyClaimed"),
            "api/503": tr("auth.serviceUnavailable")
        };

        return messages[code] || error?.message || tr("auth.firebaseError");
    }
})();
