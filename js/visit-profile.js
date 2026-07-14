// Mirrors BADGE_DEFINITIONS in api/_lib.js (also duplicated in js/profile.js) — icon/labels only.
const BADGE_DEFINITIONS = [
    { id: "first_steps", icon: "star", labelKey: "badge.firstSteps" },
    { id: "streak_5", icon: "flame", labelKey: "badge.streak5" },
    { id: "streak_30", icon: "flame", labelKey: "badge.streak30" },
    { id: "word_master", icon: "book", labelKey: "badge.wordMaster" },
    { id: "chest_hunter", icon: "chest", labelKey: "badge.chestHunter" },
    { id: "level_10", icon: "star", labelKey: "badge.level10" }
];

const BADGE_ICONS = {
    star: '<svg width="24" height="24" viewBox="0 0 24 24" fill="#ffc73a"><path d="M12 2l2.9 6.2 6.6.7-4.9 4.5 1.3 6.6L12 17.8 6.1 20.6l1.3-6.6L2.5 8.9l6.6-.7z"/></svg>',
    flame: '<svg width="24" height="24" viewBox="0 0 24 24" fill="#ff7a2d"><path d="M12 2c3 4 5 6 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 1 2 2 2 3 2 0-3-1-5 0-8z"/></svg>',
    book: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8b6cff" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
    chest: '<svg width="22" height="22" viewBox="0 0 48 48"><rect x="6" y="20" width="36" height="20" rx="4" fill="#8b6cff"/><path d="M6 22a18 12 0 0 1 36 0z" fill="#a084ff"/><rect x="6" y="25" width="36" height="4" fill="#6b4dff"/></svg>',
    locked: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>'
};

function tr(key, params = {}) {
    return window.PolytypeI18n?.t?.(key, params) || key;
}

document.addEventListener("DOMContentLoaded", () => {
    const uid = new URLSearchParams(window.location.search).get("uid");
    if (!uid) {
        setStatus(tr("friends.userNotFound"));
        return;
    }

    window.PolytypeFirebase?.onChange?.(authState => {
        if (!authState.ready) return;
        if (!authState.user) {
            setStatus(tr("auth.signInRequired"));
            return;
        }
        loadProfile(uid);
    });
});

let hasLoaded = false;

async function loadProfile(uid) {
    if (hasLoaded) return;
    hasLoaded = true;

    setStatus(tr("common.loadingProfile"));

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
            wrap.innerHTML = `
                <div style="aspect-ratio:1;border-radius:16px;background:${isEarned ? "rgba(255,255,255,.06)" : "rgba(255,255,255,.04)"};display:flex;align-items:center;justify-content:center;margin-bottom:6px;${isEarned ? "" : "color:var(--text-faintest)"}">
                    ${isEarned ? BADGE_ICONS[badge.icon] : BADGE_ICONS.locked}
                </div>
                <div style="font-size:9px;font-weight:800;color:${isEarned ? "var(--text-soft)" : "var(--text-faintest)"}">${tr(badge.labelKey)}</div>
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
    if (profile.relationship === "friends") {
        return buildStatusBadge(tr("friends.alreadyFriends"));
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

    return buildActionButton(tr("friends.add"), "btn-solid", event => handleAdd(profile.uid, event.currentTarget));
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
