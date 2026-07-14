(function () {
    const state = {
        loaded: false,
        coins: 0,
        rupees: 0,
        chestReady: false,
        missions: [],
        friendsPreview: []
    };
    const listeners = new Set();

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

    document.addEventListener("DOMContentLoaded", () => {
        window.PolytypeFirebase?.onChange?.(authState => {
            if (authState.ready && authState.user) refresh();
            if (authState.ready && !authState.user) reset();
        });
    });

    async function refresh() {
        const firebaseClient = window.PolytypeFirebase;
        if (!firebaseClient?.isSignedIn?.()) return null;

        try {
            const result = await firebaseClient.getHomeOverview();
            Object.assign(state, result.data || {});
            state.loaded = true;
            notify();
            return result.data;
        } catch {
            return null;
        }
    }

    async function claimDailyChest() {
        const result = await window.PolytypeFirebase.claimDailyChest();
        state.coins = result.data?.coins ?? state.coins;
        state.chestReady = false;
        notify();
        return result.data;
    }

    async function completePracticeSession(payload) {
        const result = await window.PolytypeFirebase.completePracticeSession(payload);
        const progress = result.data;

        if (progress) {
            state.coins = progress.coins ?? state.coins;
            state.rupees = progress.rupees ?? state.rupees;
            notify();
        }

        refresh();
        return progress;
    }

    function reset() {
        state.loaded = false;
        state.coins = 0;
        state.rupees = 0;
        state.chestReady = false;
        state.missions = [];
        state.friendsPreview = [];
        notify();
    }

    function notify() {
        const snapshot = { ...state };
        listeners.forEach(listener => listener(snapshot));
    }
})();
