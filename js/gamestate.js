(function () {
    const CACHE_KEY = "polytype-gamestate-cache";

    const state = {
        loaded: false,
        chestReady: false,
        missions: [],
        friendsPreview: []
    };
    const listeners = new Set();

    // Seed synchronously from the last successful fetch (if any) so every
    // page that reads gamestate - Home's chest/missions/friends preview, the
    // header's coin counter - paints real numbers on the very first frame
    // instead of the 0/empty defaults while the network round trip catches
    // up.
    restoreFromCache();

    window.PolytypeGameState = {
        state,
        onChange(listener) {
            listeners.add(listener);
            listener({ ...state });
            return () => listeners.delete(listener);
        },
        refresh,
        claimDailyChest,
        completePracticeSession
    };

    let refreshedForUid = null;

    document.addEventListener("DOMContentLoaded", () => {
        window.PolytypeFirebase?.onChange?.(authState => {
            // onChange now notifies once immediately on sign-in (before the
            // profile fetch resolves) and again once it completes, so this
            // can fire twice per login - only kick off one overview fetch
            // per signed-in uid.
            if (authState.ready && authState.user && refreshedForUid !== authState.user.uid) {
                refreshedForUid = authState.user.uid;
                refresh();
            }
            if (authState.ready && !authState.user) {
                refreshedForUid = null;
                reset();
            }
        });
    });

    function restoreFromCache() {
        try {
            const raw = localStorage.getItem(CACHE_KEY);
            const cached = raw ? JSON.parse(raw) : null;
            if (!cached) return;
            Object.assign(state, cached);
            state.loaded = true;
        } catch {}
    }

    function saveToCache() {
        try {
            localStorage.setItem(CACHE_KEY, JSON.stringify({
                chestReady: state.chestReady,
                missions: state.missions,
                friendsPreview: state.friendsPreview
            }));
        } catch {}
    }

    async function refresh() {
        const firebaseClient = window.PolytypeFirebase;
        if (!firebaseClient?.isSignedIn?.()) return null;

        try {
            const result = await firebaseClient.getHomeOverview();
            Object.assign(state, result.data || {});
            state.loaded = true;
            saveToCache();
            notify();
            return result.data;
        } catch {
            return null;
        }
    }

    async function claimDailyChest(courseId) {
        const result = await window.PolytypeFirebase.claimDailyChest(courseId);
        // Re-fetch chestReady from the server rather than assuming false -
        // in the DEBUG_ALWAYS_CLAIM_CHEST test mode it stays claimable so
        // the reward animation can be replayed on demand.
        refresh();
        return result.data;
    }

    async function completePracticeSession(payload) {
        const result = await window.PolytypeFirebase.completePracticeSession(payload);
        refresh();
        return result.data;
    }

    function reset() {
        state.loaded = false;
        state.chestReady = false;
        state.missions = [];
        state.friendsPreview = [];
        try { localStorage.removeItem(CACHE_KEY); } catch {}
        notify();
    }

    function notify() {
        const snapshot = { ...state };
        listeners.forEach(listener => listener(snapshot));
    }
})();
