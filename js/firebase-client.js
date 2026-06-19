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

    window.PolytypeFirebase = {
        state,
        onChange(listener) {
            listeners.add(listener);
            listener({ ...state });
            return () => listeners.delete(listener);
        },
        signIn,
        register,
        signOut,
        isSignedIn,
        completePracticeSession
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
            state.error = "Firebase config missing.";
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
            const error = new Error(err.error || "Request failed.");
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

    async function signOut() {
        assertConfigured();
        return auth.signOut();
    }

    function isSignedIn() {
        return Boolean(state.user);
    }

    async function completePracticeSession(payload) {
        assertConfigured();
        if (!state.user) throw new Error("Sign in before saving progress.");

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
                ? getShortAuthLabel(nextState.profile?.displayName || user.email)
                : "Sign in";

            authLink.textContent = label;
            authLink.setAttribute(
                "aria-label",
                user ? "Open account options" : "Open sign in page"
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
            submitBtn.textContent = mode === "signin" ? "Sign in" : "Create account";
            panelTitle.textContent = mode === "signin" ? "Sign in" : "Register";
            panelCopy.textContent = mode === "signin"
                ? "Access your saved progress and streaks."
                : "Create a new account and start syncing from the first session.";
            switchText.textContent = mode === "signin"
                ? "Don't have an account?"
                : "Already have an account?";
            switchBtn.textContent = mode === "signin" ? "Register" : "Sign in";
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
                status.textContent = "Passwords do not match.";
                confirmPassword.focus();
                return;
            }

            const action = mode === "signin"
                ? () => signIn(email.value, password.value)
                : () => register(email.value, password.value);
            const successMessage = mode === "signin" ? "Signed in." : "Account created.";
            const didSucceed = await runAuthAction(status, action, successMessage);

            if (didSucceed) {
                window.location.href = "index.html";
            }
        });

        setMode("signin");

        window.PolytypeFirebase.onChange(nextState => {
            if (nextState.ready && nextState.user) {
                window.location.href = "index.html";
                return;
            }

            if (!nextState.configured) {
                status.textContent = "Firebase config missing or emulator not running.";
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
            name: remoteProfile.displayName || "Polytype Learner",
            xp: remoteProfile.totalXp || 0,
            dayStreak: remoteProfile.currentStreak || 0,
            streakFreezes: remoteProfile.streakFreezes || 0,
            maxStreakFreezes: remoteProfile.maxStreakFreezes || 2,
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
            throw new Error("Firebase is not configured.");
        }
    }

    function getShortAuthLabel(label) {
        if (!label) return "Account";
        if (label.includes("@")) return label.split("@")[0];
        return label.length > 14 ? `${label.slice(0, 13)}...` : label;
    }

    function getAuthErrorMessage(error) {
        const code = error?.code || "";

        const messages = {
            "auth/email-already-in-use": "Email already registered.",
            "auth/invalid-email": "Invalid email.",
            "auth/invalid-login-credentials": "Wrong email or password.",
            "auth/missing-password": "Password required.",
            "auth/weak-password": "Password must be at least 6 characters.",
            "auth/user-not-found": "Account not found.",
            "auth/wrong-password": "Wrong email or password.",
            "api/401": "Sign in required.",
            "api/503": "Service temporarily unavailable."
        };

        return messages[code] || error?.message || "Firebase error.";
    }
})();
