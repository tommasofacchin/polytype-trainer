const themeStorageKey = "polytype-theme";
const CACHE_KEY = "polytype-friends-cache";

function tr(key, params = {}) {
    return window.PolytypeI18n?.t?.(key, params) || key;
}

function goTo(path) {
    if (window.PolytypeRouter?.navigate) window.PolytypeRouter.navigate(path);
    else window.location.href = path;
}

function initFriendsPage() {
    applyStoredTheme();
    setupLeaderboardTabs();
    renderFromCache();
    setupAuthGate();

    // Delegated through js/router.js's shared hook slot instead of a direct
    // document-level listener - see js/main.js's identical comment for why.
    window.__polytypePageHooks = window.__polytypePageHooks || {};
    window.__polytypePageHooks.onLanguageChanged = () => {
        if (window.PolytypeFirebase?.isSignedIn?.()) loadOverview();
    };
}

function applyStoredTheme() {
    const storedTheme = localStorage.getItem(themeStorageKey);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.dataset.theme = storedTheme || (prefersDark ? "dark" : "light");
}

// Render whatever we already have cached (from this page's last visit, or a
// background prefetch from app-shell.js on another page) immediately, before
// any network round trip - the fresh fetch below then quietly reconciles it.
function renderFromCache() {
    const cached = readCache();
    if (!cached) return;
    renderIncoming(cached.incomingRequests || []);
    renderOutgoing(cached.outgoingRequests || []);
    renderLeaderboard(cached.leaderboard || []);
    renderActivityFeed(cached.activity || []);
}

function readCache() {
    try {
        const raw = localStorage.getItem(CACHE_KEY);
        const entry = raw ? JSON.parse(raw) : null;
        return entry?.data || null;
    } catch {
        return null;
    }
}

function writeCache(data) {
    try {
        localStorage.setItem(CACHE_KEY, JSON.stringify({ savedAt: Date.now(), data }));
    } catch {}
}

let hasLoadedOverview = false;

function setupAuthGate() {
    const firebaseClient = window.PolytypeFirebase;

    if (!firebaseClient) return;

    firebaseClient.onChange(authState => {
        const signedIn = Boolean(authState.user);

        // onChange fires synchronously with the *unresolved* state before
        // Firebase has even checked whether there's a session - don't treat
        // that as "signed out" and wipe out what renderFromCache() just
        // painted. Only clear once we've definitively confirmed no session.
        if (!authState.ready) return;

        if (!signedIn) {
            hasLoadedOverview = false;
            renderIncoming([]);
            renderOutgoing([]);
            renderLeaderboard([]);
            renderActivityFeed([]);
            return;
        }

        // Fire as soon as we know we're signed in - don't wait for the full
        // profile round trip too, that just adds a second sequential fetch
        // on top of an already-slow cold start. The cache render above
        // already covers the "looks instant" case for repeat visits.
        if (!hasLoadedOverview) {
            hasLoadedOverview = true;
            loadOverview();
        }
    });
}

async function loadOverview() {
    const firebaseClient = window.PolytypeFirebase;
    if (!firebaseClient?.isSignedIn?.()) return;

    try {
        // Independent reads (overview's leaderboard/requests vs the activity
        // feed) - run in parallel rather than one after another, same reason
        // js/app-shell.js's prefetch runs alongside the router's page fetch.
        const [overviewResult, activityResult] = await Promise.all([
            firebaseClient.getSocialOverview(),
            firebaseClient.getActivityFeed().catch(() => null)
        ]);
        const data = {
            ...(overviewResult.data || {}),
            activity: activityResult?.data?.activities || []
        };
        renderIncoming(data.incomingRequests || []);
        renderOutgoing(data.outgoingRequests || []);
        renderLeaderboard(data.leaderboard || []);
        renderActivityFeed(data.activity);
        writeCache(data);
    } catch (error) {
        setPageStatus(getFriendsErrorMessage(error));
    }
}

async function handleRespond(requestId, accept) {
    try {
        await window.PolytypeFirebase.respondFriendRequest(requestId, accept);
        await loadOverview();
    } catch (error) {
        setPageStatus(getFriendsErrorMessage(error));
    }
}

function renderIncoming(list) {
    const card = document.getElementById("friends-incoming-card");
    const container = document.getElementById("friends-incoming-list");
    if (!card || !container) return;

    card.hidden = list.length === 0;
    if (!list.length) {
        container.replaceChildren();
        return;
    }

    container.replaceChildren(...list.map(item => {
        const row = document.createElement("div");
        row.className = "friends-row";
        if (item.profile?.uid) {
            makeRowVisitable(row, { ...item.profile, relationship: "pending_incoming", requestId: item.requestId });
        }

        const actions = document.createElement("span");
        actions.className = "friends-row-actions";
        actions.append(
            buildActionButton(tr("friends.accept"), "btn-solid", () => handleRespond(item.requestId, true)),
            buildActionButton(tr("friends.decline"), "btn", () => handleRespond(item.requestId, false))
        );

        row.append(buildAvatar(item.profile || {}), buildNameCopy(item.profile || {}), actions);
        return row;
    }));
}

function renderOutgoing(list) {
    const card = document.getElementById("friends-outgoing-card");
    const container = document.getElementById("friends-outgoing-list");
    if (!card || !container) return;

    card.hidden = list.length === 0;
    if (!list.length) {
        container.replaceChildren();
        return;
    }

    container.replaceChildren(...list.map(item => {
        const chip = document.createElement("span");
        chip.className = "friends-chip";
        chip.textContent = tr("friends.pendingWith", { name: displayName(item.profile || {}) });
        return chip;
    }));
}

// Which of the two leaderboard tabs is showing: "total" (all-time XP) or
// "weekly". The server only ever sends one list, ranked by weekly XP (see
// buildLeaderboard in api/_lib.js), but every entry carries totalXp too - so
// the all-time view is just the same entries re-sorted and re-ranked here,
// with no extra request.
let activeLeaderboard = "total";
let lastLeaderboard = [];

function setupLeaderboardTabs() {
    document.querySelectorAll("[data-leaderboard]").forEach(tab => {
        tab.addEventListener("click", () => {
            if (activeLeaderboard === tab.dataset.leaderboard) return;
            activeLeaderboard = tab.dataset.leaderboard;
            syncLeaderboardTabs();
            renderLeaderboard(lastLeaderboard);
        });
    });
    syncLeaderboardTabs();
}

function syncLeaderboardTabs() {
    document.querySelectorAll("[data-leaderboard]").forEach(tab => {
        const isActive = tab.dataset.leaderboard === activeLeaderboard;
        tab.classList.toggle("is-active", isActive);
        tab.setAttribute("aria-selected", String(isActive));
    });
}

function renderLeaderboard(list) {
    const container = document.getElementById("friends-leaderboard-list");
    if (!container) return;

    lastLeaderboard = list;

    if (!list.length) {
        const empty = document.createElement("p");
        empty.className = "profile-muted";
        empty.textContent = tr("friends.leaderboardEmpty");
        container.replaceChildren(empty);
        return;
    }

    const isWeekly = activeLeaderboard === "weekly";
    // Re-rank for the all-time view; the incoming ranks are weekly ones.
    const rows = isWeekly
        ? list
        : [...list]
            .sort((a, b) => ((b.totalXp || 0) - (a.totalXp || 0)) || ((b.weeklyXp || 0) - (a.weeklyXp || 0)))
            .map((entry, index) => ({ ...entry, rank: index + 1 }));

    container.replaceChildren(...rows.map(entry => {
        const row = document.createElement("div");
        row.className = entry.isSelf ? "friends-leaderboard-row is-self" : "friends-leaderboard-row";
        if (!entry.isSelf) makeRowVisitable(row, { ...entry, relationship: "friends" });

        const xp = isWeekly ? (entry.weeklyXp || 0) : (entry.totalXp || 0);
        const meta = `${tr("common.levelNumber", { level: entry.globalLevel || 1 })} · ${xp.toLocaleString()} XP`;

        row.append(buildRank(entry.rank), buildAvatar(entry), buildNameCopy(entry, meta, entry.isSelf));
        // Streak flames only belong on the all-time board - a weekly ranking
        // is about this week's XP, and a lifetime streak next to it invites
        // the wrong comparison.
        if (!isWeekly) row.append(buildStreakPill(entry.currentStreak || 0));

        return row;
    }));
}

// Rank chip: a plain circle from 4th place on, gold/silver/bronze for the
// podium. The leaderboard row is now display-only - removing a friend lives
// solely on their profile page (see js/visit-profile.js).
function buildRank(rank) {
    const chip = document.createElement("span");
    chip.className = "friends-rank";
    if (rank >= 1 && rank <= 3) chip.classList.add(`is-medal-${rank}`);
    chip.textContent = String(rank);
    return chip;
}

// Streak as a flame pill using the app's flame glyph (not the 🔥 emoji, which
// renders differently across platforms) - dimmed to a neutral pill at 0.
function buildStreakPill(streak) {
    const pill = document.createElement("span");
    pill.className = streak > 0 ? "friends-streak-pill" : "friends-streak-pill is-zero";
    pill.innerHTML = '<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M12 2c3 4 5 6 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 1 2 2 2 3 2 0-3-1-5 0-8z"/></svg>';
    const count = document.createElement("span");
    count.textContent = String(streak);
    pill.append(count);
    return pill;
}

// Sourced from the `activities` collection (api/complete-practice-session.js
// publishes one whenever a session levels a course up, lands a streak
// multiple of 7, or earns 100+ XP in one go) via friends.js's "activity"
// action - previously written on every qualifying session but never read
// back anywhere.
function renderActivityFeed(list) {
    const card = document.getElementById("friends-activity-card");
    const container = document.getElementById("friends-activity-list");
    if (!card || !container) return;

    card.hidden = list.length === 0;
    if (!list.length) {
        container.replaceChildren();
        return;
    }

    container.replaceChildren(...list.map(activity => {
        const actor = activity.actor || {};
        const row = document.createElement("div");
        row.className = "friends-row";
        if (!activity.isSelf) makeRowVisitable(row, { ...actor, relationship: "friends" });

        row.append(buildAvatar(actor), buildNameCopy(actor, getActivityText(activity), activity.isSelf));
        return row;
    }));
}

function getActivityText(activity) {
    if (activity.type === "level_up" && activity.courseLevel) {
        return tr("friends.activityLevelUp", { level: activity.courseLevel });
    }
    if (activity.streak > 0 && activity.streak % 7 === 0) {
        return tr("friends.activityStreak", { streak: activity.streak });
    }
    return tr("friends.activityXp", { xp: activity.xp || 0 });
}

function buildAvatar(profileData) {
    const avatar = document.createElement("span");
    avatar.className = "profile-pill-avatar friends-row-avatar";
    avatar.setAttribute("aria-hidden", "true");

    if (profileData.avatarUrl) {
        const image = document.createElement("img");
        image.src = profileData.avatarUrl;
        image.alt = "";
        avatar.classList.add("has-image");
        avatar.append(image);
    } else {
        avatar.textContent = getInitial(profileData);
    }

    return avatar;
}

function buildNameCopy(profileData, metaText, isSelf) {
    const copy = document.createElement("span");
    copy.className = "friends-row-copy";

    const name = document.createElement("strong");
    name.textContent = isSelf ? tr("friends.you") : displayName(profileData);
    copy.append(name);

    if (metaText) {
        const meta = document.createElement("small");
        meta.textContent = metaText;
        copy.append(meta);
    }

    return copy;
}

function buildActionButton(label, className, onClick) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = className;
    button.textContent = label;
    button.addEventListener("click", event => {
        event.stopPropagation();
        onClick(event);
    });
    return button;
}

function makeRowVisitable(row, profile) {
    const uid = profile?.uid;
    if (!uid) return;
    row.classList.add("is-clickable");
    row.addEventListener("click", () => {
        stashProfilePreview(profile);
        goTo(`visit-profile.html?uid=${encodeURIComponent(uid)}`);
    });
}

// Stash whatever profile fields the row already has (avatar/name/level/xp/
// streak/relationship) so visit-profile.html can paint instantly instead of
// waiting on auth + a network round trip for the exact same data.
function stashProfilePreview(profile) {
    try {
        sessionStorage.setItem("polytype-visit-profile-cache", JSON.stringify({
            uid: profile.uid,
            savedAt: Date.now(),
            data: profile
        }));
    } catch {}
}

function displayName(profileData) {
    return profileData.handle ? `@${profileData.handle}` : (profileData.displayName || tr("profile.courseFallback"));
}

function getInitial(profileData) {
    const source = profileData.handle || profileData.displayName || "P";
    return source.trim().charAt(0).toUpperCase() || "P";
}

function setPageStatus(value) {
    const el = document.getElementById("friends-page-status");
    if (el) el.textContent = value;
}

function getFriendsErrorMessage(error) {
    const code = error?.code || "";
    const messages = {
        "api/401": tr("auth.signInRequired"),
        "api/404": tr("friends.userNotFound"),
        "api/409": tr("friends.alreadyRequested"),
        "api/503": tr("auth.serviceUnavailable")
    };

    return messages[code] || error?.message || tr("friends.genericError");
}

// Runs after every function/let/const above is defined - initFriendsPage
// (and anything it calls synchronously, like setupAuthGate's Firebase
// onChange callback firing immediately on registration) can reference
// module-level bindings declared anywhere in this file, so this trigger has
// to sit at the very bottom, same reasoning as js/app-shell.js.
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFriendsPage, { once: true });
} else {
    initFriendsPage();
}
