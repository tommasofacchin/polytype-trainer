const minSearchLength = 2;
let searchToken = 0;

function tr(key, params = {}) {
    return window.PolytypeI18n?.t?.(key, params) || key;
}

function goTo(path) {
    if (window.PolytypeRouter?.navigate) window.PolytypeRouter.navigate(path);
    else window.location.href = path;
}

function initFindFriendsPage() {
    const form = document.getElementById("find-friends-form");
    const input = document.getElementById("find-friends-input");

    if (form && input) {
        form.addEventListener("submit", event => {
            event.preventDefault();
            runSearch(input.value);
        });
    }

    window.PolytypeFirebase?.onChange?.(authState => {
        if (!authState.user) {
            setStatus(tr("auth.signInRequired"));
            renderResults([]);
        }
    });
}

async function runSearch(value) {
    const query = value.trim();
    searchToken += 1;
    const requestToken = searchToken;

    if (query.length < minSearchLength) {
        setStatus(tr("friends.searchHint"));
        renderResults([]);
        return;
    }

    if (!window.PolytypeFirebase?.isSignedIn?.()) {
        setStatus(tr("auth.signInRequired"));
        return;
    }

    setStatus(tr("friends.searching"));

    try {
        const result = await window.PolytypeFirebase.searchUsers(query);
        if (requestToken !== searchToken) return;

        const results = result.data?.results || [];
        renderResults(results);
        setStatus(results.length ? "" : tr("friends.searchEmpty"));
    } catch (error) {
        if (requestToken !== searchToken) return;
        setStatus(getFindFriendsErrorMessage(error));
    }
}

async function handleAdd(uid, button) {
    if (button) button.disabled = true;

    try {
        await window.PolytypeFirebase.sendFriendRequest(uid);
        const input = document.getElementById("find-friends-input");
        if (input && input.value.trim().length >= minSearchLength) await runSearch(input.value);
    } catch (error) {
        setStatus(getFindFriendsErrorMessage(error));
        if (button) button.disabled = false;
    }
}

async function handleRespond(requestId, accept) {
    try {
        await window.PolytypeFirebase.respondFriendRequest(requestId, accept);
        const input = document.getElementById("find-friends-input");
        if (input && input.value.trim().length >= minSearchLength) await runSearch(input.value);
    } catch (error) {
        setStatus(getFindFriendsErrorMessage(error));
    }
}

function renderResults(results) {
    const container = document.getElementById("find-friends-results");
    if (!container) return;
    container.replaceChildren(...results.map(renderResultRow));
}

function renderResultRow(result) {
    const row = document.createElement("div");
    row.className = "friends-row is-clickable";
    row.addEventListener("click", () => {
        stashProfilePreview(result);
        goTo(`visit-profile.html?uid=${encodeURIComponent(result.uid)}`);
    });
    row.append(
        buildAvatar(result),
        buildNameCopy(result, `${tr("common.levelNumber", { level: result.globalLevel || 1 })} - ${result.totalXp || 0} XP`),
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

    return buildActionButton(tr("friends.add"), "btn-solid", event => handleAdd(result.uid, event.currentTarget));
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

function buildNameCopy(profileData, metaText) {
    const copy = document.createElement("span");
    copy.className = "friends-row-copy";

    const name = document.createElement("strong");
    name.textContent = displayName(profileData);
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
    button.addEventListener("click", event => {
        event.stopPropagation();
        onClick(event);
    });
    return button;
}

function displayName(profileData) {
    return profileData.handle ? `@${profileData.handle}` : (profileData.displayName || tr("profile.courseFallback"));
}

function getInitial(profileData) {
    const source = profileData.handle || profileData.displayName || "P";
    return source.trim().charAt(0).toUpperCase() || "P";
}

function setStatus(value) {
    const el = document.getElementById("find-friends-status");
    if (el) el.textContent = value;
}

// So visit-profile.html can paint instantly from the row the user just
// tapped instead of waiting on auth + a network round trip.
function stashProfilePreview(profile) {
    try {
        sessionStorage.setItem("polytype-visit-profile-cache", JSON.stringify({
            uid: profile.uid,
            savedAt: Date.now(),
            data: profile
        }));
    } catch {}
}

function getFindFriendsErrorMessage(error) {
    const code = error?.code || "";
    const messages = {
        "api/401": tr("auth.signInRequired"),
        "api/404": tr("friends.userNotFound"),
        "api/409": tr("friends.alreadyRequested"),
        "api/503": tr("auth.serviceUnavailable")
    };

    return messages[code] || error?.message || tr("friends.genericError");
}

// Runs after every function/let/const above is defined - same reasoning as
// js/app-shell.js and js/main.js.
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFindFriendsPage, { once: true });
} else {
    initFindFriendsPage();
}
