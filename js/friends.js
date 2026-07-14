const themeStorageKey = "polytype-theme";

function tr(key, params = {}) {
    return window.PolytypeI18n?.t?.(key, params) || key;
}

document.addEventListener("DOMContentLoaded", () => {
    applyStoredTheme();
    setupAuthGate();

    document.addEventListener("polytype-app-language-changed", () => {
        if (window.PolytypeFirebase?.isSignedIn?.()) loadOverview();
    });
});

function applyStoredTheme() {
    const storedTheme = localStorage.getItem(themeStorageKey);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.dataset.theme = storedTheme || (prefersDark ? "dark" : "light");
}

let hasLoadedOverview = false;

function setupAuthGate() {
    const firebaseClient = window.PolytypeFirebase;
    const notice = document.getElementById("friends-signin-notice");
    const findBtn = document.getElementById("find-friends-btn");

    if (!firebaseClient) {
        if (notice) notice.hidden = false;
        if (findBtn) findBtn.hidden = true;
        return;
    }

    firebaseClient.onChange(authState => {
        const signedIn = Boolean(authState.user);
        if (notice) notice.hidden = signedIn;
        if (findBtn) findBtn.hidden = !signedIn;

        if (!signedIn) {
            hasLoadedOverview = false;
            renderIncoming([]);
            renderOutgoing([]);
            renderLeaderboard([]);
            return;
        }

        // Wait for the full profile (not just the auth user) before the first
        // fetch: publicProfiles/{uid} is only guaranteed to exist once
        // ensure-user-profile has completed, otherwise the leaderboard can
        // come back incomplete and then "pop in" again once it catches up.
        if (authState.profile && !hasLoadedOverview) {
            hasLoadedOverview = true;
            loadOverview();
        }
    });
}

async function loadOverview() {
    const firebaseClient = window.PolytypeFirebase;
    if (!firebaseClient?.isSignedIn?.()) return;

    try {
        const result = await firebaseClient.getSocialOverview();
        const data = result.data || {};
        renderIncoming(data.incomingRequests || []);
        renderOutgoing(data.outgoingRequests || []);
        renderLeaderboard(data.leaderboard || []);
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

async function handleRemove(uid, name) {
    const confirmed = window.confirm(tr("friends.removeConfirm", { name: name || tr("profile.courseFallback") }));
    if (!confirmed) return;

    try {
        await window.PolytypeFirebase.removeFriend(uid);
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

function renderLeaderboard(list) {
    const container = document.getElementById("friends-leaderboard-list");
    if (!container) return;

    if (!list.length) {
        const empty = document.createElement("p");
        empty.className = "profile-muted";
        empty.textContent = tr("friends.leaderboardEmpty");
        container.replaceChildren(empty);
        return;
    }

    container.replaceChildren(...list.map(entry => {
        const row = document.createElement("div");
        row.className = entry.isSelf ? "friends-leaderboard-row is-self" : "friends-leaderboard-row";

        const rank = document.createElement("span");
        rank.className = "friends-rank";
        rank.textContent = `#${entry.rank}`;

        const streak = document.createElement("span");
        streak.className = "friends-row-streak";
        streak.textContent = `\u{1F525} ${entry.currentStreak || 0}`;

        row.append(
            rank,
            buildAvatar(entry),
            buildNameCopy(entry, `${tr("common.levelNumber", { level: entry.globalLevel || 1 })} · ${entry.totalXp || 0} XP`, entry.isSelf),
            streak
        );

        if (!entry.isSelf) {
            row.append(buildActionButton(tr("friends.remove"), "friends-remove-btn", () => handleRemove(entry.uid, displayName(entry))));
        }

        return row;
    }));
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
    button.addEventListener("click", onClick);
    return button;
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
