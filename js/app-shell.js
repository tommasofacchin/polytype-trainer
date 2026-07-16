(function () {
    const LANGUAGE_FLAGS = {
        chinese: "assets/flags/china.svg",
        german: "assets/flags/germany.svg",
        italian: "assets/flags/italy.svg",
        japanese: "assets/flags/japan.svg",
        norwegian: "assets/flags/norway.svg",
        spanish: "assets/flags/spain.svg",
        swedish: "assets/flags/sweden.svg"
    };

    const ICONS = {
        streak: '<svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M12 2c3 4 5 6 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 1 2 2 2 3 2 0-3-1-5 0-8z"/></svg>',
        coin: '<svg viewBox="0 0 24 24" width="16" height="16"><circle cx="12" cy="12" r="10" fill="#ffc73a"/><circle cx="12" cy="12" r="6.5" fill="none" stroke="#d99a1c" stroke-width="2"/></svg>',
        key: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="7" cy="12" r="4.2" fill="color-mix(in srgb, currentColor 12%, transparent)"></circle><circle cx="7" cy="12" r="1.4"></circle><path d="M10.6 12h10"></path><path d="M17 12v3"></path><path d="M20 12v2.4"></path></svg>',
        person: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><circle cx="12" cy="9" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6z"/></svg>',
        home: '<svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/></svg>',
        games: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><rect x="3" y="4" width="7" height="7" rx="1.6"/><rect x="14" y="4" width="7" height="7" rx="1.6"/><rect x="3" y="14" width="7" height="7" rx="1.6"/><rect x="14" y="14" width="7" height="7" rx="1.6"/></svg>',
        deck: '<svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',
        shop: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8h12l-1 12H7L6 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
        friends: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.2"/><path d="M2.6 20c0-3.6 3-5.6 6.4-5.6S15.4 16.4 15.4 20"/><path d="M16.5 5.6a2.8 2.8 0 0 1 0 5.4"/><path d="M17 14.5c2.7.3 4.9 2 4.9 5.2"/></svg>',
        profile: '<svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>',
        settings: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>'
    };

    const TABS = [
        { id: "home", href: "index.html", label: "nav.home", icon: ICONS.home },
        { id: "games", href: "games.html", label: "nav.games", icon: ICONS.games },
        { id: "deck", href: "deck.html", label: "nav.deck", icon: ICONS.deck },
        { id: "shop", href: "shop.html", label: "nav.shop", icon: ICONS.shop },
        { id: "friends", href: "friends.html", label: "nav.friends", icon: ICONS.friends },
        { id: "profile", href: "profile.html", label: "nav.profile", icon: ICONS.profile },
        { id: "settings", href: "settings.html", label: "settings.title", icon: ICONS.settings, desktopOnly: true }
    ];

    function tr(key, params) {
        return window.PolytypeI18n?.t?.(key, params) || key;
    }

    // Keeps the friends.html cache warm from every other page, so opening
    // the Friends tab renders instantly instead of waiting on a cold fetch.
    const FRIENDS_CACHE_KEY = "polytype-friends-cache";
    const FRIENDS_CACHE_STALE_MS = 20000;
    let friendsPrefetchInFlight = false;

    function prefetchFriendsOverview(authState) {
        if (!authState.user || friendsPrefetchInFlight) return;

        try {
            const raw = localStorage.getItem(FRIENDS_CACHE_KEY);
            const entry = raw ? JSON.parse(raw) : null;
            if (entry?.savedAt && Date.now() - entry.savedAt < FRIENDS_CACHE_STALE_MS) return;
        } catch {}

        friendsPrefetchInFlight = true;
        window.PolytypeFirebase.getSocialOverview()
            .then(result => {
                if (!result?.data) return;
                try {
                    localStorage.setItem(FRIENDS_CACHE_KEY, JSON.stringify({ savedAt: Date.now(), data: result.data }));
                } catch {}
            })
            .catch(() => {})
            .finally(() => { friendsPrefetchInFlight = false; });
    }

    // Last-known values from firebase-client.js's own localStorage mirror
    // (kept up to date after every session/chest/claim). Painting from this
    // synchronously means the header never has to show 0 while the real
    // auth + network round trip catches up on the next page.
    function readCachedProfile() {
        try {
            return JSON.parse(localStorage.getItem("polytype-profile")) || {};
        } catch {
            return {};
        }
    }

    // Keep in sync with MAX_KEYS in api/_lib.js.
    const MAX_KEYS = 5;

    // Keys are purchase-only (api/buy-key.js) and per-course - the header
    // shows the count for whichever language is currently selected, same
    // language the flag switcher above it reflects.
    function getKeysHeldForLanguage(language, cached) {
        const purchasedKeys = Number(cached.courses?.[language]?.purchasedKeys) || 0;
        return Math.max(0, Math.min(MAX_KEYS, Math.trunc(purchasedKeys)));
    }

    function renderHeader() {
        const mount = document.getElementById("app-header");
        if (!mount) return;

        const language = localStorage.getItem("polytype-language") || "chinese";
        const flagSrc = LANGUAGE_FLAGS[language] || LANGUAGE_FLAGS.chinese;
        const cached = readCachedProfile();
        const avatarInner = cached.avatarUrl ? `<img src="${cached.avatarUrl}" alt="">` : ICONS.person;
        const keysHeld = getKeysHeldForLanguage(language, cached);

        mount.innerHTML = `
            <div class="app-shell-header">
                <div class="app-shell-stats">
                    <span class="app-shell-stat app-shell-stat-streak" id="app-shell-streak">${ICONS.streak}${cached.dayStreak || 0}</span>
                    <span class="app-shell-stat app-shell-stat-coin" id="app-shell-coins">${ICONS.coin}${cached.coins || 0}</span>
                    <span class="app-shell-stat app-shell-stat-key" id="app-shell-keys">${ICONS.key}${keysHeld}</span>
                </div>
                <div class="app-shell-identity">
                    <div class="language-menu app-shell-lang-menu">
                        <span class="app-shell-flag" id="app-shell-flag-toggle" tabindex="0" role="button" aria-haspopup="true" aria-expanded="false"><img src="${flagSrc}" alt=""></span>
                        <div id="app-shell-language-menu" class="language-menu-panel" role="menu" hidden></div>
                    </div>
                    <a id="app-shell-avatar" class="app-shell-avatar${cached.avatarUrl ? " has-image" : ""}" href="profile.html" aria-label="${tr("trainer.openProfile")}">${avatarInner}</a>
                </div>
            </div>
        `;

        renderHeaderAuth(window.PolytypeFirebase?.state || {});
        renderHeaderStats(window.PolytypeGameState?.state || {});
        setupFlagMenu();
    }

    function getLanguageLabel(language) {
        return window.PolytypeI18n?.languageLabel?.(language) || language;
    }

    function renderFlagMenuContent() {
        const panel = document.getElementById("app-shell-language-menu");
        if (!panel) return;

        const activeLanguage = localStorage.getItem("polytype-language") || "chinese";
        const cached = readCachedProfile();
        const studying = Object.keys(cached.courses || {}).filter(lang => LANGUAGE_FLAGS[lang]);
        if (!studying.includes(activeLanguage)) studying.unshift(activeLanguage);

        panel.innerHTML = `
            ${studying.map(lang => `
                <button type="button" class="language-menu-item${lang === activeLanguage ? " is-active" : ""}" data-language="${lang}" role="menuitemradio" aria-checked="${lang === activeLanguage}">
                    <img class="flag-mark" src="${LANGUAGE_FLAGS[lang] || ""}" alt="">
                    <span>${getLanguageLabel(lang)}</span>
                </button>
            `).join("")}
            <div class="language-menu-divider"></div>
            <a class="language-menu-item" href="languages.html">
                <span class="language-menu-plus" aria-hidden="true">+</span>
                <span>${tr("nav.newLanguage")}</span>
            </a>
        `;

        panel.querySelectorAll("[data-language]").forEach(btn => {
            btn.addEventListener("click", () => {
                if (btn.dataset.language === (localStorage.getItem("polytype-language") || "chinese")) {
                    closeFlagMenu();
                    return;
                }
                localStorage.setItem("polytype-language", btn.dataset.language);
                // Full reload, not just a header repaint: whatever page we're
                // on (Trainer, Memory, Deck, Categories...) needs to reload
                // its own deck/progress for the newly selected language too.
                window.location.reload();
            });
        });
    }

    let flagMenuCloseTimer = null;

    function openFlagMenu() {
        clearTimeout(flagMenuCloseTimer);
        const panel = document.getElementById("app-shell-language-menu");
        const toggle = document.getElementById("app-shell-flag-toggle");
        if (!panel || !toggle) return;
        renderFlagMenuContent();
        panel.hidden = false;
        toggle.setAttribute("aria-expanded", "true");
    }

    function closeFlagMenu() {
        const panel = document.getElementById("app-shell-language-menu");
        const toggle = document.getElementById("app-shell-flag-toggle");
        if (panel) panel.hidden = true;
        if (toggle) toggle.setAttribute("aria-expanded", "false");
    }

    function setupFlagMenu() {
        const wrap = document.querySelector(".app-shell-lang-menu");
        const toggle = document.getElementById("app-shell-flag-toggle");
        const panel = document.getElementById("app-shell-language-menu");
        if (!wrap || !toggle || !panel) return;

        wrap.addEventListener("mouseenter", openFlagMenu);
        wrap.addEventListener("mouseleave", () => {
            flagMenuCloseTimer = setTimeout(closeFlagMenu, 150);
        });

        toggle.addEventListener("click", () => {
            if (panel.hidden) openFlagMenu(); else closeFlagMenu();
        });
        toggle.addEventListener("keydown", event => {
            if (event.key !== "Enter" && event.key !== " ") return;
            event.preventDefault();
            if (panel.hidden) openFlagMenu(); else closeFlagMenu();
        });

        document.addEventListener("click", event => {
            if (panel.hidden) return;
            if (wrap.contains(event.target)) return;
            closeFlagMenu();
        });
    }

    function renderHeaderAuth(authState) {
        const avatar = document.getElementById("app-shell-avatar");
        if (!avatar) return;

        avatar.href = authState.user ? "profile.html" : "auth.html";

        // Same "don't stomp the cache with a false default" problem as
        // renderHeaderStats: onChange fires synchronously before Firebase has
        // resolved anything, with profile still null. Only repaint once we
        // have a real profile, or have definitively confirmed signed-out.
        const definitivelySignedOut = authState.ready && !authState.user;
        const hasFreshProfile = Boolean(authState.profile);

        if (hasFreshProfile || definitivelySignedOut) {
            const avatarUrl = authState.profile?.avatarUrl;
            if (avatarUrl) {
                avatar.classList.add("has-image");
                avatar.innerHTML = `<img src="${avatarUrl}" alt="">`;
            } else {
                avatar.classList.remove("has-image");
                avatar.innerHTML = ICONS.person;
            }
        }

        const streakEl = document.getElementById("app-shell-streak");
        if (streakEl && typeof authState.profile?.currentStreak === "number") {
            streakEl.innerHTML = `${ICONS.streak}${authState.profile.currentStreak}`;
        }
    }

    function renderHeaderStats(gameState) {
        // gamestate.js's own state defaults coins to 0 before its first real
        // fetch resolves - only trust it once `loaded` confirms that
        // happened, otherwise this would stomp the cached value renderHeader()
        // just painted with a false zero.
        if (!gameState.loaded) return;

        const coinsEl = document.getElementById("app-shell-coins");
        if (coinsEl && typeof gameState.coins === "number") coinsEl.innerHTML = `${ICONS.coin}${gameState.coins}`;
    }

    function renderHeaderKeys(event) {
        const keysEl = document.getElementById("app-shell-keys");
        if (!keysEl) return;

        const language = localStorage.getItem("polytype-language") || "chinese";
        const cached = event?.detail || readCachedProfile();
        keysEl.innerHTML = `${ICONS.key}${getKeysHeldForLanguage(language, cached)}`;
    }

    function renderBottomNav() {
        const mount = document.getElementById("app-bottom-nav");
        if (!mount) return;

        const activeTab = document.body.dataset.tab || "";

        mount.innerHTML = `
            <a href="index.html" class="app-shell-logo" aria-label="${tr("app.name")}">
                <span class="app-shell-logo-mark">P</span>
                <span class="app-shell-logo-word">polytype</span>
            </a>
            <nav class="app-shell-nav">
                ${TABS.map(tabItem => `
                    <a class="app-shell-nav-item${tabItem.id === activeTab ? " is-active" : ""}${tabItem.desktopOnly ? " app-shell-nav-item-desktop-only" : ""}" href="${tabItem.href}">
                        <span class="app-shell-nav-icon">${tabItem.icon}</span>
                        <span class="app-shell-nav-label">${tr(tabItem.label)}</span>
                    </a>
                `).join("")}
            </nav>
        `;
    }

    // Paint the header/nav immediately instead of waiting for
    // DOMContentLoaded: every *.html that includes this script places its
    // <script> tag right after the #app-header/#app-bottom-nav mounts, and
    // both render functions above only need localStorage + i18n.js (loaded
    // just before this script, see script order in each page) - not
    // Firebase. Waiting for DOMContentLoaded used to mean sitting behind the
    // Firebase SDK <script> tags too (external CDN, sometimes slow), which
    // made the navbar visibly disappear on every page navigation. This has
    // to run after every function/const above it is defined (MAX_KEYS etc.
    // are still in their temporal dead zone earlier in the file), which is
    // exactly why this block sits at the bottom instead of the top.
    renderHeader();
    renderBottomNav();

    document.addEventListener("polytype-app-language-changed", () => {
        renderHeader();
        renderBottomNav();
    });
    // Fires after any unlock/purchase/session-save syncs the local
    // profile cache - keep the header's key count live without needing
    // a full reload (unlike the study-language flag switch, which does
    // reload the page and so re-renders the header from scratch anyway).
    document.addEventListener("polytype-profile-updated", renderHeaderKeys);

    // Unlike the paint above, these need window.PolytypeFirebase /
    // PolytypeGameState to already exist - only DOMContentLoaded guarantees
    // that (it waits for every blocking script, Firebase SDKs included,
    // regardless of where this script tag sits relative to them).
    document.addEventListener("DOMContentLoaded", () => {
        window.PolytypeFirebase?.onChange?.(renderHeaderAuth);
        window.PolytypeFirebase?.onChange?.(prefetchFriendsOverview);
        window.PolytypeGameState?.onChange?.(renderHeaderStats);
    });
})();
