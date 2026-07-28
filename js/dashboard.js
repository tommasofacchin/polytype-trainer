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

function goTo(path) {
    if (window.PolytypeRouter?.navigate) window.PolytypeRouter.navigate(path);
    else window.location.href = path;
}

function initDashboardPage() {
    initProfile();
    setupProfileSync();
    setupGameStateSync();

    // Delegated through js/router.js's shared hook slot instead of a direct
    // document-level listener - see js/main.js's identical comment for why.
    window.__polytypePageHooks = window.__polytypePageHooks || {};
    window.__polytypePageHooks.onLanguageChanged = () => {
        renderGreeting(Boolean(window.PolytypeFirebase?.isSignedIn?.()));
    };
}

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
    window.__polytypePageHooks = window.__polytypePageHooks || {};
    window.__polytypePageHooks.onProfileUpdated = event => {
        profile = { ...defaultProfile, ...profile, ...event.detail };
        // event.detail is the trimmed localStorage mirror (js/firebase-
        // client.js's syncProfileToLocalStorage) and has no
        // lastPracticeDate - read the live Firebase state instead, which by
        // this point already reflects whatever session/chest action just
        // fired this event, so a session played just now immediately clears
        // the banner instead of waiting for the next full page load.
        renderStreakRiskBanner(window.PolytypeFirebase?.state?.profile);
    };

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
        renderStreakRiskBanner(authState.profile);
    });
}

// Same "you haven't practiced today yet" check the server does when a
// session completes (see calculateStreakUpdate in api/_lib.js), computed
// here purely to decide whether to show a reminder - never trust this for
// anything that actually touches XP/coins/streak, only the API is
// authoritative for that. Uses the browser's own timezone, matching what
// every completePracticeSession call already sends the server.
function getTodayKeyForBrowserTimezone() {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return new Intl.DateTimeFormat("en-CA", { timeZone: timezone }).format(new Date());
}

function renderStreakRiskBanner(profile) {
    const banner = document.getElementById("home-streak-risk-banner");
    if (!banner) return;

    const streak = profile?.currentStreak || 0;
    const alreadyPracticedToday = profile?.lastPracticeDate === getTodayKeyForBrowserTimezone();
    const atRisk = streak > 0 && !alreadyPracticedToday;

    banner.hidden = !atRisk;
    if (!atRisk) return;

    const titleEl = document.getElementById("home-streak-risk-title");
    if (titleEl) titleEl.textContent = tr("home.streakRiskTitle", { count: streak });
}

function setupGameStateSync() {
    const gameState = window.PolytypeGameState;
    if (!gameState) return;

    gameState.onChange(state => {
        renderChest(state);
        renderDemoChest();
        renderDemoSprint();
        renderMissions(state);
        renderFriendsPreview(state);
        renderDailyGoal(state);
    });

    // The open button's click handler is bound in renderChest, which rebuilds
    // the button on every state change. A second binding used to live here
    // too, and whenever renderChest had already run by this point both landed
    // on the same node - so one tap opened two stacked chest overlays.
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

    // Show the Lessons CTA only for study languages that actually have a
    // lessons curriculum (decks/lessons-*.js). This page doesn't load those
    // data files, so the set is listed here explicitly - keep it in sync when
    // a new language's lessons ship. No onLanguageChanged wiring needed, since
    // picking a different study language always does a full page reload
    // (js/app-shell.js's flag menu), so a one-time check reflects what's active.
    const LANGS_WITH_LESSONS = new Set(["norwegian", "swedish", "german", "italian", "chinese", "japanese", "spanish"]);
    const lessonsBtn = document.getElementById("home-lessons-btn");
    if (lessonsBtn) lessonsBtn.hidden = !LANGS_WITH_LESSONS.has(localStorage.getItem("polytype-language"));
}

function renderChest(state) {
    const mount = document.getElementById("home-chest-card");
    if (!mount || !state.loaded) return;

    if (state.chestReady) {
        mount.className = "chest-card is-ready";
        mount.innerHTML = `
            <svg width="46" height="46" viewBox="0 0 48 48"><rect x="6" y="20" width="36" height="20" rx="4" fill="#17b8c9"/><path d="M6 22a18 12 0 0 1 36 0z" fill="#3ed0de"/><rect x="6" y="25" width="36" height="4" fill="#0e8fa0"/><rect x="21" y="23" width="6" height="9" rx="2" fill="#ffc73a"/></svg>
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
            <svg width="40" height="40" viewBox="0 0 48 48" style="opacity:.5"><rect x="6" y="20" width="36" height="20" rx="4" fill="#17b8c9"/><path d="M6 22a18 12 0 0 1 36 0z" fill="#3ed0de"/><rect x="6" y="25" width="36" height="4" fill="#0e8fa0"/></svg>
            <div class="chest-card-copy">
                <strong>${tr("chest.claimed")}</strong>
                <span>${tr("chest.claimedDesc")}</span>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4d9fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13l4 4L19 7"/></svg>
        `;
    }
}

// Debug affordances (the chest replay below, and the first-sprint-of-the-day
// replay after it) are gated on the signed-in handle, which is a *cosmetic*
// gate, not a security one: anyone could claim this handle and see the cards.
// That's acceptable only because every one of these demos grants nothing -
// keep it that way.
const DEBUG_HANDLE = "tommaso";

function isDebugHandle() {
    try {
        const profile = JSON.parse(localStorage.getItem(profileStorageKey)) || {};
        return String(profile.handle || profile.name || "").trim().toLowerCase() === DEBUG_HANDLE;
    } catch {
        return false;
    }
}

// Replays the chest opening as many times as you like, against a canned
// reward. Nothing is claimed and no coins or XP are granted - see the `demo`
// branch in js/chest.js.
function renderDemoChest() {
    const mount = document.getElementById("home-demo-chest");
    if (!mount) return;

    if (!isDebugHandle()) {
        mount.hidden = true;
        mount.replaceChildren();
        return;
    }

    if (mount.dataset.built === "true") return;
    mount.dataset.built = "true";
    mount.hidden = false;
    mount.className = "chest-card is-demo";
    mount.innerHTML = `
        <svg width="46" height="46" viewBox="0 0 48 48"><rect x="6" y="20" width="36" height="20" rx="4" fill="#17b8c9"/><path d="M6 22a18 12 0 0 1 36 0z" fill="#3ed0de"/><rect x="6" y="25" width="36" height="4" fill="#0e8fa0"/><rect x="21" y="23" width="6" height="9" rx="2" fill="#ffc73a"/></svg>
        <div class="chest-card-copy">
            <strong>${tr("chest.demoTitle")}</strong>
            <span>${tr("chest.demoDesc")}</span>
        </div>
        <button id="home-demo-chest-btn" class="chest-open-btn" type="button">${tr("chest.open")}</button>
    `;
    document.getElementById("home-demo-chest-btn").addEventListener("click", async event => {
        event.target.disabled = true;
        await window.PolytypeChest.open({ demo: true });
        event.target.disabled = false;
    });
}

// Canned stand-in for what the server hands back on the first session of a
// day: the flame advancing, plus the two missions a Sprint round typically
// trips. Shapes and ids match api/complete-practice-session.js's response
// (its `streak` block and `completedMissions`) so the replay drives the exact
// same code path the real thing does - see finishSession in js/sprint.js.
const DEMO_SPRINT_MISSIONS = [
    { id: "play_sprint", coinReward: 50, labelKey: "mission.playSprint" },
    { id: "earn_30_xp", coinReward: 30, labelKey: "mission.earn30Xp" }
];

// Replays the first-sprint-of-the-day celebrations back to back: the streak
// overlay, then the missions one. Nothing is saved, no coins or XP are
// granted, and the header's flame is only borrowed for the length of the pop
// (see pulseHeaderStreak in js/streak-celebrate.js) - the real streak is
// untouched.
function renderDemoSprint() {
    const mount = document.getElementById("home-demo-sprint");
    if (!mount) return;

    if (!isDebugHandle()) {
        mount.hidden = true;
        mount.replaceChildren();
        return;
    }

    if (mount.dataset.built === "true") return;
    mount.dataset.built = "true";
    mount.hidden = false;
    mount.className = "chest-card is-demo";
    mount.innerHTML = `
        <svg width="42" height="42" viewBox="0 0 24 24" fill="#f2452f"><path d="M12 1.6C13 5 15.4 6.6 17 8.6c1.5 1.9 2.3 3.8 2.3 5.9a7.3 7.3 0 0 1-14.6 0c0-2.3 1-4.4 2.8-6.2-.1 1.2.2 2.2.8 3C7.6 7.6 9.6 4.6 12 1.6z"/></svg>
        <div class="chest-card-copy">
            <strong>${tr("streak.demoTitle")}</strong>
            <span>${tr("streak.demoDesc")}</span>
        </div>
        <button id="home-demo-sprint-btn" class="chest-open-btn" type="button">${tr("streak.demoRun")}</button>
    `;
    document.getElementById("home-demo-sprint-btn").addEventListener("click", async event => {
        event.target.disabled = true;
        // One past whatever the player is actually on, so the roll shows the
        // number they'd really see tomorrow rather than a made-up one.
        const currentStreak = (Number(profile.dayStreak) || 0) + 1;
        await window.PolytypeStreakCelebrate?.show?.(
            { currentStreak, streakAdvanced: true, streakReset: false },
            { demo: true }
        );
        await window.PolytypeMissionCelebrate?.show?.(DEMO_SPRINT_MISSIONS);
        event.target.disabled = false;
    });
}

function renderDailyGoal(state) {
    const textEl = document.getElementById("home-daily-goal-text");
    const fillEl = document.getElementById("home-daily-goal-fill");
    if (!textEl || !fillEl || !state.loaded) return;

    const goal = state.dailyGoalXp || 50;
    const earned = state.todayXp || 0;
    const pct = Math.min(100, Math.round((earned / goal) * 100));

    textEl.textContent = `${Math.min(earned, goal)} / ${goal} XP`;
    fillEl.style.width = `${pct}%`;
    fillEl.style.background = earned >= goal ? "var(--success)" : "var(--accent)";
}

function renderMissions(state) {
    const list = document.getElementById("home-missions-list");
    const countEl = document.getElementById("home-missions-count");
    if (!list || !state.loaded) return;

    const missions = state.missions || [];
    const completedCount = missions.filter(mission => mission.completed).length;
    if (countEl) countEl.textContent = `${completedCount} / ${missions.length}`;

    const icons = ["#4d9fff", "#17b8c9", "#ffc73a"];
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
                <span class="leaderboard-avatar" style="background:${entry.isSelf ? "#4d9fff" : "#17b8c9"};color:${entry.isSelf ? "#05203d" : "#fff"}">${initial}</span>
                <span class="leaderboard-name">${entry.isSelf ? tr("common.you") : (entry.displayName || entry.handle || "")}</span>
                <span class="leaderboard-xp"><span class="leaderboard-xp-value">${(entry.weeklyXp || 0).toLocaleString()}</span><svg width="15" height="15" viewBox="0 0 24 24" fill="#4d9fff"><path d="M12 2l2.9 6.2 6.6.7-4.9 4.5 1.3 6.6L12 17.8 6.1 20.6l1.3-6.6L2.5 8.9l6.6-.7z"/></svg></span>
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
                    goTo(`visit-profile.html?uid=${encodeURIComponent(entry.uid)}`);
                });
            }
            return row;
        })
    );
}

// Runs after every function/let/const above is defined - same reasoning as
// js/app-shell.js and js/main.js.
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initDashboardPage, { once: true });
} else {
    initDashboardPage();
}
