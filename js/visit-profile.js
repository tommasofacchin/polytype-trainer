// Mirrors BADGE_DEFINITIONS in api/_lib.js (also duplicated in js/profile.js) — icon/labels only.
const BADGE_DEFINITIONS = [
    { id: "first_steps", icon: "star", labelKey: "badge.firstSteps" },
    { id: "streak_5", icon: "flame", labelKey: "badge.streak5" },
    { id: "streak_30", icon: "flame", labelKey: "badge.streak30" },
    { id: "word_master", icon: "book", labelKey: "badge.wordMaster" },
    { id: "chest_hunter", icon: "chest", labelKey: "badge.chestHunter" },
    { id: "level_10", icon: "star", labelKey: "badge.level10" },
    { id: "lessons_10", icon: "book", labelKey: "badge.lessons10" },
    { id: "lessons_25", icon: "book", labelKey: "badge.lessons25" },
    { id: "lessons_all", icon: "crown", labelKey: "badge.lessonsAll" },
    { id: "streak_50", icon: "flame", labelKey: "badge.streak50" },
    { id: "streak_100", icon: "flame", labelKey: "badge.streak100" },
    { id: "streak_365", icon: "flame", labelKey: "badge.streak365" },
    { id: "words_50", icon: "book", labelKey: "badge.words50" },
    { id: "deck_complete", icon: "crown", labelKey: "badge.deckComplete" },
    { id: "chest_30", icon: "chest", labelKey: "badge.chest30" },
    { id: "chest_100", icon: "chest", labelKey: "badge.chest100" },
    { id: "polyglot", icon: "globe", labelKey: "badge.polyglot" },
    { id: "social_butterfly", icon: "friends", labelKey: "badge.socialButterfly" },
    { id: "friend_squad", icon: "friends", labelKey: "badge.friendSquad" },
    { id: "combo_master", icon: "bolt", labelKey: "badge.comboMaster" },
    { id: "flawless_round", icon: "target", labelKey: "badge.flawlessRound" },
    { id: "night_owl", icon: "moon", labelKey: "badge.nightOwl" },
    { id: "well_rounded", icon: "grid", labelKey: "badge.wellRounded" },
    { id: "veteran", icon: "medal", labelKey: "badge.veteran" }
];

const BADGE_ICONS = {
    star: '<svg width="24" height="24" viewBox="0 0 24 24" fill="#ffc73a"><path d="M12 2l2.9 6.2 6.6.7-4.9 4.5 1.3 6.6L12 17.8 6.1 20.6l1.3-6.6L2.5 8.9l6.6-.7z"/></svg>',
    flame: '<svg width="24" height="24" viewBox="0 0 24 24" fill="#ff7a2d"><path d="M12 2c3 4 5 6 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 1 2 2 2 3 2 0-3-1-5 0-8z"/></svg>',
    book: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8b6cff" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
    chest: '<svg width="22" height="22" viewBox="0 0 48 48"><rect x="6" y="20" width="36" height="20" rx="4" fill="#8b6cff"/><path d="M6 22a18 12 0 0 1 36 0z" fill="#a084ff"/><rect x="6" y="25" width="36" height="4" fill="#6b4dff"/></svg>',
    crown: '<svg width="22" height="22" viewBox="0 0 24 24" fill="#ffc73a"><path d="M3 9l4.5 2.7L12 4l4.5 7.7L21 9l-2 9H5L3 9z"/><rect x="5.6" y="20" width="12.8" height="2" rx="0.6" fill="#d99a1c"/></svg>',
    globe: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4dabf7" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 4 6 4 9s-1.5 6.5-4 9c-2.5-2.5-4-6-4-9s1.5-6.5 4-9z"/></svg>',
    friends: '<svg width="22" height="22" viewBox="0 0 24 24" fill="#ff6b9d"><circle cx="8.5" cy="7.5" r="3.3"/><path d="M2 20c0-3.6 2.9-5.8 6.5-5.8S15 16.4 15 20z"/><circle cx="17" cy="8.5" r="2.6"/><path d="M15.2 13.6c2.9.4 4.8 2.4 4.8 6.4h-3.4z"/></svg>',
    bolt: '<svg width="20" height="20" viewBox="0 0 24 24" fill="#ff9f1c"><path d="M13 2 4 14h6l-1 8 9-12h-6z"/></svg>',
    target: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1.2" fill="#22c55e" stroke="none"/></svg>',
    moon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="#2dd4bf"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"/></svg>',
    grid: '<svg width="20" height="20" viewBox="0 0 24 24" fill="#8b6cff"><rect x="3" y="4" width="7" height="7" rx="1.6"/><rect x="14" y="4" width="7" height="7" rx="1.6"/><rect x="3" y="14" width="7" height="7" rx="1.6"/><rect x="14" y="14" width="7" height="7" rx="1.6"/></svg>',
    medal: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M8 2h3l1 4-3 2z" fill="#ff7a2d"/><path d="M16 2h-3l-1 4 3 2z" fill="#ff4d4d"/><circle cx="12" cy="15" r="7" fill="#ffc73a" stroke="#d99a1c" stroke-width="1.5"/><circle cx="12" cy="15" r="3" fill="none" stroke="#d99a1c" stroke-width="1.2"/></svg>',
    locked: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>'
};

function tr(key, params = {}) {
    return window.PolytypeI18n?.t?.(key, params) || key;
}

const PREVIEW_CACHE_KEY = "polytype-visit-profile-cache";

function initVisitProfilePage() {
    const uid = new URLSearchParams(window.location.search).get("uid");
    if (!uid) {
        setStatus(tr("friends.userNotFound"));
        return;
    }

    // The row the user just tapped (leaderboard/search/friends preview)
    // already carried avatar/name/level/xp/streak - paint that instantly
    // instead of waiting on auth + a network round trip for anything to
    // show up.
    const cached = readPreviewCache(uid);
    if (cached) {
        renderProfile(cached);
        hasCachedPaint = true;
    }

    window.PolytypeFirebase?.onChange?.(authState => {
        if (!authState.ready) return;
        if (!authState.user) {
            setStatus(tr("auth.signInRequired"));
            return;
        }
        loadProfile(uid);
    });
}

function readPreviewCache(uid) {
    try {
        const raw = sessionStorage.getItem(PREVIEW_CACHE_KEY);
        const cached = raw ? JSON.parse(raw) : null;
        if (cached && cached.uid === uid && Date.now() - cached.savedAt < 5 * 60 * 1000) return cached.data;
    } catch {}
    return null;
}

let hasLoaded = false;
let hasCachedPaint = false;

async function loadProfile(uid) {
    if (hasLoaded) return;
    hasLoaded = true;

    if (!hasCachedPaint) setStatus(tr("common.loadingProfile"));

    try {
        const result = await window.PolytypeFirebase.getFriendProfile(uid);
        renderProfile(result.data);
        setStatus("");
    } catch (error) {
        hasLoaded = false;
        setStatus(getErrorMessage(error));
    }
}

function renderProfile(profile) {
    const levelInfo = getLevelInfo(profile.totalXp || 0);

    setText("visit-profile-name", profile.displayName || tr("profile.courseFallback"));
    setText("visit-profile-handle", profile.handle ? `@${profile.handle}` : "");
    setText("visit-profile-level", tr("common.levelNumber", { level: levelInfo.level }));
    setText("visit-profile-total-xp", (profile.totalXp || 0).toLocaleString());
    setText("visit-profile-day-streak", String(profile.currentStreak || 0));

    renderAvatar(document.getElementById("visit-profile-avatar"), profile);
    renderBadges(profile.badges);
    renderAction(profile);
}

function renderAvatar(element, profile) {
    if (!element) return;
    if (profile.avatarUrl) {
        const image = document.createElement("img");
        image.src = profile.avatarUrl;
        image.alt = "";
        element.classList.add("has-image");
        element.replaceChildren(image);
        return;
    }
    element.classList.remove("has-image");
    const source = profile.handle || profile.displayName || "P";
    element.textContent = source.trim().charAt(0).toUpperCase() || "P";
}

function renderBadges(earnedIds) {
    const badgeGrid = document.getElementById("visit-profile-badges");
    if (!badgeGrid) return;

    const earnedSet = new Set(earnedIds || []);
    setText("visit-profile-badge-count", `${earnedSet.size} / ${BADGE_DEFINITIONS.length}`);

    badgeGrid.replaceChildren(
        ...BADGE_DEFINITIONS.map(badge => {
            const isEarned = earnedSet.has(badge.id);
            const wrap = document.createElement("div");
            wrap.style.textAlign = "center";
            // Theme-token backgrounds (not hardcoded white alpha, which was
            // near-invisible in light theme) - matches js/profile.js.
            wrap.innerHTML = `
                <div style="aspect-ratio:1;border-radius:13px;border:1px solid var(--border);background:${isEarned ? "var(--surface-soft)" : "var(--surface-empty)"};display:flex;align-items:center;justify-content:center;margin-bottom:5px;${isEarned ? "" : "color:var(--text-faintest)"}">
                    ${isEarned ? BADGE_ICONS[badge.icon] : BADGE_ICONS.locked}
                </div>
                <div style="font-size:9px;font-weight:800;line-height:1.15;color:${isEarned ? "var(--text-soft)" : "var(--text-faintest)"}">${tr(badge.labelKey)}</div>
            `;
            return wrap;
        })
    );
}

function renderAction(profile) {
    const mount = document.getElementById("visit-profile-action");
    if (!mount) return;
    mount.replaceChildren(buildRelationshipAction(profile));
}

function buildRelationshipAction(profile) {
    // Already friends: say so, and offer the only place to unfriend someone.
    if (profile.relationship === "friends") {
        const wrap = document.createElement("div");
        wrap.className = "visit-profile-friend-actions";
        wrap.append(
            buildFriendsBadge(),
            buildActionButton(tr("friends.removeFriend"), "btn visit-profile-remove-btn", event => handleRemove(profile, event.currentTarget))
        );
        return wrap;
    }

    if (profile.relationship === "pending_outgoing") {
        return buildStatusBadge(tr("friends.pendingSent"));
    }

    if (profile.relationship === "pending_incoming") {
        const wrap = document.createElement("span");
        wrap.className = "friends-row-actions";
        wrap.append(
            buildActionButton(tr("friends.accept"), "btn-solid", () => handleRespond(profile)),
            buildActionButton(tr("friends.decline"), "btn", () => handleRespond(profile, false))
        );
        return wrap;
    }

    // Not connected yet: send a friend request.
    return buildActionButton(tr("friends.add"), "btn-solid", event => handleAdd(profile.uid, event.currentTarget));
}

// "✓ You're friends" pill (check glyph + label).
function buildFriendsBadge() {
    const badge = document.createElement("span");
    badge.className = "friends-status-badge is-friends";
    badge.innerHTML = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';
    const label = document.createElement("span");
    label.textContent = tr("friends.alreadyFriends");
    badge.append(label);
    return badge;
}

async function handleRemove(profile, button) {
    const name = profile.displayName || (profile.handle ? `@${profile.handle}` : tr("profile.courseFallback"));
    if (!window.confirm(tr("friends.removeConfirm", { name }))) return;

    if (button) button.disabled = true;
    try {
        await window.PolytypeFirebase.removeFriend(profile.uid);
        hasLoaded = false;
        await loadProfile(profile.uid);
    } catch (error) {
        setStatus(getErrorMessage(error));
        if (button) button.disabled = false;
    }
}

async function handleAdd(uid, button) {
    if (button) button.disabled = true;
    try {
        await window.PolytypeFirebase.sendFriendRequest(uid);
        hasLoaded = false;
        await loadProfile(uid);
    } catch (error) {
        setStatus(getErrorMessage(error));
        if (button) button.disabled = false;
    }
}

async function handleRespond(profile, accept = true) {
    try {
        await window.PolytypeFirebase.respondFriendRequest(profile.requestId, accept);
        hasLoaded = false;
        await loadProfile(profile.uid);
    } catch (error) {
        setStatus(getErrorMessage(error));
    }
}

function buildStatusBadge(label) {
    const badge = document.createElement("span");
    badge.className = "friends-status-badge";
    badge.textContent = label;
    return badge;
}

function buildActionButton(label, className, onClick) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = className;
    button.textContent = label;
    button.addEventListener("click", onClick);
    return button;
}

function setText(id, value) {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
}

function setStatus(value) {
    const element = document.getElementById("visit-profile-status");
    if (element) element.textContent = value;
}

function getLevelInfo(totalXp) {
    let level = 1;
    let currentXp = Math.max(0, Number(totalXp) || 0);
    let nextXp = getXpForLevel(level);

    while (currentXp >= nextXp) {
        currentXp -= nextXp;
        level += 1;
        nextXp = getXpForLevel(level);
    }

    return { level, currentXp, nextXp };
}

// Keep in sync with getXpForLevel in api/_lib.js.
function getXpForLevel(level) {
    return 400 + (level - 1) * 250;
}

function getErrorMessage(error) {
    const code = error?.code || "";
    const messages = {
        "api/400": tr("friends.userNotFound"),
        "api/401": tr("auth.signInRequired"),
        "api/404": tr("friends.userNotFound"),
        "api/409": tr("friends.alreadyRequested"),
        "api/503": tr("auth.serviceUnavailable")
    };

    return messages[code] || error?.message || tr("friends.genericError");
}

// Runs after every function/let/const above is defined (hasLoaded/
// hasCachedPaint included) - same reasoning as js/app-shell.js and
// js/main.js.
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initVisitProfilePage, { once: true });
} else {
    initVisitProfilePage();
}
