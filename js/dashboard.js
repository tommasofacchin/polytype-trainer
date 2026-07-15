const profileStorageKey = "polytype-profile";

const defaultProfile = {
    name: "Player",
    handle: null,
    avatarUrl: null,
    xp: 0,
    dayStreak: 0,
    courses: {}
};

let profile = { ...defaultProfile };

function tr(key, params = {}) {
    return window.PolytypeI18n?.t?.(key, params) || key;
}

document.addEventListener("DOMContentLoaded", () => {
    initProfile();
    setupProfileSync();
    setupGameStateSync();

    document.addEventListener("polytype-app-language-changed", () => {
        renderGreeting(Boolean(window.PolytypeFirebase?.isSignedIn?.()));
    });
});

function initProfile() {
    const storedProfile = localStorage.getItem(profileStorageKey);

    if (storedProfile) {
        try {
            profile = { ...defaultProfile, ...JSON.parse(storedProfile) };
        } catch {
            profile = { ...defaultProfile };
        }
    }
}

function setupProfileSync() {
    document.addEventListener("polytype-profile-updated", event => {
        profile = { ...defaultProfile, ...profile, ...event.detail };
    });

    // Optimistic initial paint: a cached profile means we were signed in
    // last time this browser loaded the app, so assume that's still true and
    // show the full Home layout right away instead of the guest/empty state
    // while Firebase spends a moment confirming the session.
    renderGreeting(Boolean(localStorage.getItem(profileStorageKey)));

    const firebaseClient = window.PolytypeFirebase;
    if (!firebaseClient) {
        renderGreeting(false);
        return;
    }

    firebaseClient.onChange(authState => {
        // Ignore the synchronous "not resolved yet" tick - only act once
        // Firebase has actually confirmed signed-in vs signed-out, otherwise
        // this immediately flips the optimistic render above back to guest
        // (or redirects away) before a real session had a chance to load.
        if (!authState.ready) return;

        // Home is the app's main entry point and is gated: signed-out
        // visitors belong on the marketing landing page, not the dashboard.
        if (!authState.user) {
            window.location.href = "landing.html";
            return;
        }

        renderGreeting(true);
    });
}

function setupGameStateSync() {
    const gameState = window.PolytypeGameState;
    if (!gameState) return;

    gameState.onChange(state => {
        renderChest(state);
        renderMissions(state);
        renderFriendsPreview(state);
    });

    const chestCard = document.getElementById("home-chest-open-btn");
    if (chestCard) {
        chestCard.addEventListener("click", async () => {
            chestCard.disabled = true;
            await window.PolytypeChest.open();
            chestCard.disabled = false;
        });
    }
}

function renderGreeting(signedIn) {
    const nameEl = document.getElementById("home-greeting-name");
    if (!nameEl) return;

    nameEl.textContent = signedIn
        ? (profile.name || tr("dashboard.player"))
        : tr("dashboard.player");

    const emptyState = document.getElementById("home-signed-out");
    if (emptyState) emptyState.hidden = signedIn;

    const signedInSections = document.getElementById("home-signed-in");
    if (signedInSections) signedInSections.hidden = !signedIn;
}

function renderChest(state) {
    const mount = document.getElementById("home-chest-card");
    if (!mount || !state.loaded) return;

    if (state.chestReady) {
        mount.className = "chest-card is-ready";
        mount.innerHTML = `
            <svg width="46" height="46" viewBox="0 0 48 48"><rect x="6" y="20" width="36" height="20" rx="4" fill="#8b6cff"/><path d="M6 22a18 12 0 0 1 36 0z" fill="#a084ff"/><rect x="6" y="25" width="36" height="4" fill="#6b4dff"/><rect x="21" y="23" width="6" height="9" rx="2" fill="#ffc73a"/></svg>
            <div class="chest-card-copy">
                <strong>${tr("chest.ready")}</strong>
                <span>${tr("chest.readyDesc")}</span>
            </div>
            <button id="home-chest-open-btn" class="chest-open-btn" type="button">${tr("chest.open")}</button>
        `;
        document.getElementById("home-chest-open-btn").addEventListener("click", async event => {
            event.target.disabled = true;
            await window.PolytypeChest.open();
            event.target.disabled = false;
        });
    } else {
        mount.className = "chest-card is-claimed";
        mount.innerHTML = `
            <svg width="40" height="40" viewBox="0 0 48 48" style="opacity:.5"><rect x="6" y="20" width="36" height="20" rx="4" fill="#8b6cff"/><path d="M6 22a18 12 0 0 1 36 0z" fill="#a084ff"/><rect x="6" y="25" width="36" height="4" fill="#6b4dff"/></svg>
            <div class="chest-card-copy">
                <strong>${tr("chest.claimed")}</strong>
                <span>${tr("chest.claimedDesc")}</span>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2fe6a4" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13l4 4L19 7"/></svg>
        `;
    }
}

function renderMissions(state) {
    const list = document.getElementById("home-missions-list");
    const countEl = document.getElementById("home-missions-count");
    if (!list || !state.loaded) return;

    const missions = state.missions || [];
    const completedCount = missions.filter(mission => mission.completed).length;
    if (countEl) countEl.textContent = `${completedCount} / ${missions.length}`;

    const icons = ["#2fe6a4", "#8b6cff", "#ffc73a"];
    list.replaceChildren(
        ...missions.map((mission, index) => {
            const row = document.createElement("div");
            const pct = Math.round((mission.progress / mission.target) * 100);
            const color = icons[index % icons.length];
            row.className = "mission-row";
            row.innerHTML = `
                <div class="mission-icon" style="background:${color}26">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="${color}"><path d="M12 2l2.9 6.2 6.6.7-4.9 4.5 1.3 6.6L12 17.8 6.1 20.6l1.3-6.6L2.5 8.9l6.6-.7z"/></svg>
                </div>
                <div class="mission-copy">
                    <strong>${tr(mission.labelKey)}</strong>
                    <div class="mission-bar"><div class="mission-bar-fill" style="width:${pct}%;background:${color}"></div></div>
                </div>
                <span class="mission-reward">
                    <svg width="14" height="14" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#ffc73a"/></svg>${mission.coinReward}
                </span>
            `;
            return row;
        })
    );
}

function renderFriendsPreview(state) {
    const list = document.getElementById("home-friends-preview");
    if (!list || !state.loaded) return;

    const entries = state.friendsPreview || [];
    list.replaceChildren(
        ...entries.map(entry => {
            const row = document.createElement("div");
            row.className = `leaderboard-row${entry.isSelf ? " is-self" : " is-clickable"}`;
            const initial = (entry.handle || entry.displayName || "?").trim().charAt(0).toUpperCase();
            row.innerHTML = `
                <span class="leaderboard-rank is-plain">${entry.rank}</span>
                <span class="leaderboard-avatar" style="background:${entry.isSelf ? "#2fe6a4" : "#8b6cff"};color:${entry.isSelf ? "#0d2b22" : "#fff"}">${initial}</span>
                <span class="leaderboard-name">${entry.isSelf ? tr("common.you") : (entry.displayName || entry.handle || "")}</span>
                <span class="leaderboard-xp"><svg width="14" height="14" viewBox="0 0 24 24" fill="#2fe6a4"><path d="M12 2l2.9 6.2 6.6.7-4.9 4.5 1.3 6.6L12 17.8 6.1 20.6l1.3-6.6L2.5 8.9l6.6-.7z"/></svg>${(entry.totalXp || 0).toLocaleString()}</span>
            `;
            if (!entry.isSelf && entry.uid) {
                row.addEventListener("click", () => {
                    try {
                        sessionStorage.setItem("polytype-visit-profile-cache", JSON.stringify({
                            uid: entry.uid,
                            savedAt: Date.now(),
                            data: { ...entry, relationship: "friends" }
                        }));
                    } catch {}
                    window.location.href = `visit-profile.html?uid=${encodeURIComponent(entry.uid)}`;
                });
            }
            return row;
        })
    );
}
