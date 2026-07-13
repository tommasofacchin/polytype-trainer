const themeStorageKey = "polytype-theme";
const searchDebounceMs = 300;
const minSearchLength = 2;

let searchInput;
let searchToken = 0;

function tr(key, params = {}) {
    return window.PolytypeI18n?.t?.(key, params) || key;
}

document.addEventListener("DOMContentLoaded", () => {
    applyStoredTheme();
    searchInput = document.getElementById("friends-search-input");
    setupSearch();
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

function setupSearch() {
    if (!searchInput) return;

    let debounceId = null;
    searchInput.addEventListener("input", () => {
        clearTimeout(debounceId);
        const value = searchInput.value;
        debounceId = setTimeout(() => runSearch(value), searchDebounceMs);
    });
}

function setupAuthGate() {
    const firebaseClient = window.PolytypeFirebase;
    const notice = document.getElementById("friends-signin-notice");
    const searchCard = document.getElementById("friends-search-card");

    if (!firebaseClient) {
        if (notice) notice.hidden = false;
        if (searchCard) searchCard.hidden = true;
        return;
    }

    firebaseClient.onChange(authState => {
        const signedIn = Boolean(authState.user);
        if (notice) notice.hidden = signedIn;
        if (searchCard) searchCard.hidden = !signedIn;

        if (signedIn) {
            loadOverview();
        } else {
            renderIncoming([]);
            renderOutgoing([]);
            renderLeaderboard([]);
        }
    });
}

async function runSearch(value) {
    const query = value.trim();
    searchToken += 1;
    const requestToken = searchToken;

    if (query.length < minSearchLength) {
        setSearchStatus(tr("friends.searchHint"));
        renderSearchResults([]);
        return;
    }

    if (!window.PolytypeFirebase?.isSignedIn?.()) return;

    setSearchStatus(tr("friends.searching"));

    try {
        const result = await window.PolytypeFirebase.searchUsers(query);
        if (requestToken !== searchToken) return;

        const results = result.data?.results || [];
        renderSearchResults(results);
        setSearchStatus(results.length ? "" : tr("friends.searchEmpty"));
    } catch (error) {
        if (requestToken !== searchToken) return;
        setSearchStatus(getFriendsErrorMessage(error));
    }
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

async function handleAdd(uid, button) {
    if (button) button.disabled = true;

    try {
        await window.PolytypeFirebase.sendFriendRequest(uid);
        await Promise.all([refreshVisibleSearch(), loadOverview()]);
    } catch (error) {
        setPageStatus(getFriendsErrorMessage(error));
        if (button) button.disabled = false;
    }
}

async function handleRespond(requestId, accept) {
    try {
        await window.PolytypeFirebase.respondFriendRequest(requestId, accept);
        await Promise.all([refreshVisibleSearch(), loadOverview()]);
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

function refreshVisibleSearch() {
    if (searchInput && searchInput.value.trim().length >= minSearchLength) {
        return runSearch(searchInput.value);
    }
    return Promise.resolve();
}

function renderSearchResults(results) {
    const container = document.getElementById("friends-search-results");
    if (!container) return;

    container.replaceChildren(...results.map(renderResultRow));
}

function renderResultRow(result) {
    const row = document.createElement("div");
    row.className = "friends-row";
    row.append(
        buildAvatar(result),
        buildNameCopy(result, `${tr("common.levelNumber", { level: result.globalLevel || 1 })} · ${result.totalXp || 0} XP`),
        buildRelationshipAction(result)
    );
    return row;
}

function buildRelationshipAction(result) {
    if (result.relationship === "friends") {
        return buildStatusBadge(tr("friends.alreadyFriends"));
    }

    if (result.relationship === "pending_outgoing") {
        return buildStatusBadge(tr("friends.pendingSent"));
    }

    if (result.relationship === "pending_incoming") {
        const wrap = document.createElement("span");
        wrap.className = "friends-row-actions";
        wrap.append(
            buildActionButton(tr("friends.accept"), "btn-solid", () => handleRespond(result.requestId, true)),
            buildActionButton(tr("friends.decline"), "btn", () => handleRespond(result.requestId, false))
        );
        return wrap;
    }

    const button = buildActionButton(tr("friends.add"), "btn-solid", event => handleAdd(result.uid, event.currentTarget));
    return button;
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

function displayName(profileData) {
    return profileData.handle ? `@${profileData.handle}` : (profileData.displayName || tr("profile.courseFallback"));
}

function getInitial(profileData) {
    const source = profileData.handle || profileData.displayName || "P";
    return source.trim().charAt(0).toUpperCase() || "P";
}

function setSearchStatus(value) {
    const el = document.getElementById("friends-search-status");
    if (el) el.textContent = value;
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
