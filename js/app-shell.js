(function () {
    const THEME_KEY = "polytype-theme";

    function getTheme() {
        try {
            return localStorage.getItem(THEME_KEY) === "light" ? "light" : "dark";
        } catch {
            return "dark";
        }
    }

    function applyTheme(theme) {
        document.documentElement.dataset.theme = theme;
    }

    function setTheme(theme) {
        const next = theme === "light" ? "light" : "dark";
        try {
            localStorage.setItem(THEME_KEY, next);
        } catch {}
        applyTheme(next);
    }

    // Runs synchronously, before any markup below paints, so pages never
    // flash the dark default before flipping to a saved light preference.
    applyTheme(getTheme());
    window.PolytypeTheme = { getTheme, setTheme };

    const LANGUAGE_FLAGS = {
        chinese: "assets/flags/china.svg",
        german: "assets/flags/germany.svg",
        italian: "assets/flags/italy.svg",
        japanese: "assets/flags/japan.svg",
        norwegian: "assets/flags/norway.svg",
        spanish: "assets/flags/spain.svg",
        swedish: "assets/flags/sweden.svg"
    };

    // Every *.html ships with the same hardcoded china.svg <link rel="icon">
    // (or, on the two pages with their own favicon logic - js/memory.js and
    // js/lessons.js - norway.svg) as a static fallback for the instant
    // before any script runs. Without this, every other page (Trainer,
    // Sprint, Dictate, Deck, Categories...) just kept that fallback forever,
    // regardless of which course was actually active - the browser tab kept
    // showing China's flag through an entire Norwegian, German... session.
    // Same fallback language as renderHeader's own flagSrc below, so the
    // header pill and the browser tab can never disagree about which flag
    // is "the" one for an unrecognized/missing language.
    function applyFavicon() {
        const language = localStorage.getItem("polytype-language") || "chinese";
        const icon = document.querySelector('link[rel="icon"]');
        if (icon) icon.href = LANGUAGE_FLAGS[language] || LANGUAGE_FLAGS.chinese;
    }

    applyFavicon();

    const ICONS = {
        streak: '<svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M12 2c3 4 5 6 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 1 2 2 2 3 2 0-3-1-5 0-8z"/></svg>',
        coin: '<svg viewBox="0 0 24 24" width="16" height="16"><circle cx="12" cy="12" r="10" fill="#ffc73a"/><circle cx="12" cy="12" r="6.5" fill="none" stroke="#d99a1c" stroke-width="2"/></svg>',
        key: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="7" cy="12" r="4.2" fill="color-mix(in srgb, currentColor 12%, transparent)"></circle><circle cx="7" cy="12" r="1.4"></circle><path d="M10.6 12h10"></path><path d="M17 12v3"></path><path d="M20 12v2.4"></path></svg>',
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

    // Same idea as prefetchFriendsOverview below, for vocabulary: warm the
    // active language's deck from whatever page the player happens to be on,
    // so Deck/Sprint/Memory open against an already-parsed CSV instead of
    // fetching one. Cheap (~11KB, cached per tab by js/deck-cache.js) and
    // idempotent, so it's safe to call on every navigation.
    function prefetchActiveDeck() {
        const cache = window.PolytypeDeckCache;
        const decks = window.DECK_INDEX;
        if (!cache || !decks) return;

        const language = localStorage.getItem("polytype-language") || "chinese";
        const meta = decks.find(deck => deck.language === language);
        if (meta) cache.prefetch(meta);
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

    // Same "you haven't practiced today yet" check the server does when a
    // session completes (see calculateStreakUpdate in api/_lib.js), computed
    // here purely to decide how the header flame is painted - never trust it
    // for anything that actually touches XP/coins/streak, only the API is
    // authoritative for that. Uses the browser's own timezone, matching what
    // every completePracticeSession call already sends the server.
    function getTodayKeyForBrowserTimezone() {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        return new Intl.DateTimeFormat("en-CA", { timeZone: timezone }).format(new Date());
    }

    // A streak the player still has but hasn't fed today. Instead of a banner
    // shouting about it, the header flame just goes grey - it lights back up
    // the moment a session is saved.
    function isStreakAtRisk(profile) {
        const streak = Number(profile?.currentStreak ?? profile?.dayStreak) || 0;
        if (streak <= 0) return false;
        return profile?.lastPracticeDate !== getTodayKeyForBrowserTimezone();
    }

    function paintStreak(profile) {
        const streakEl = document.getElementById("app-shell-streak");
        if (!streakEl) return;

        const streak = Number(profile?.currentStreak ?? profile?.dayStreak) || 0;
        streakEl.innerHTML = `${ICONS.streak}${streak}`;
        streakEl.classList.toggle("is-at-risk", isStreakAtRisk(profile));
    }

    // Lights the flame ahead of the save that will confirm it. The
    // end-of-sprint flame page now opens off a preview rather than off the
    // save's reply (see js/sprint.js), and it points straight at this pill as
    // it closes (pulseHeaderStreak in js/streak-celebrate.js) - without this
    // the pill could still be showing yesterday's grey number at that exact
    // moment. Called from behind the celebration overlay, so the change itself
    // is never seen happening; the next profile update repaints it
    // authoritatively regardless.
    function paintStreakAhead(count) {
        const streakEl = document.getElementById("app-shell-streak");
        if (!streakEl) return;

        streakEl.innerHTML = `${ICONS.streak}${Math.max(0, Math.trunc(Number(count) || 0))}`;
        streakEl.classList.remove("is-at-risk");
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

    // Coins are per-course too (see api/_lib.js/start-course.js) - unlike
    // XP/level, which stay shared across every language the player studies.
    function getCoinsForLanguage(language, cached) {
        const coins = Number(cached.courses?.[language]?.coins) || 0;
        return Math.max(0, Math.trunc(coins));
    }

    // Global (cross-language) level, same curve the server levels users on.
    // Keep in sync with getXpForLevel in api/_lib.js - and with the copies in
    // js/profile.js / js/visit-profile.js, which level the same totalXp.
    function getXpForLevel(level) {
        return 400 + (level - 1) * 250;
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

        return { level, currentXp, nextXp, progress: Math.round((currentXp / nextXp) * 100) };
    }

    function renderHeader() {
        const mount = document.getElementById("app-header");
        if (!mount) return;

        const language = localStorage.getItem("polytype-language") || "chinese";
        const flagSrc = LANGUAGE_FLAGS[language] || LANGUAGE_FLAGS.chinese;
        const cached = readCachedProfile();
        const keysHeld = getKeysHeldForLanguage(language, cached);
        const coinsHeld = getCoinsForLanguage(language, cached);
        const levelInfo = getLevelInfo(cached.xp);

        mount.innerHTML = `
            <div class="app-shell-header">
                <a class="app-shell-level" href="profile.html" aria-label="${tr("common.levelNumber", { level: levelInfo.level })}">
                    <span class="app-shell-level-badge" id="app-shell-level-badge">${levelInfo.level}</span>
                    <span class="app-shell-level-track">
                        <span class="app-shell-level-fill" id="app-shell-level-fill" style="width:${levelInfo.progress}%"></span>
                        <span class="app-shell-level-text" id="app-shell-level-text">${levelInfo.currentXp}/${levelInfo.nextXp}</span>
                    </span>
                </a>
                <div class="app-shell-stats">
                    <span class="app-shell-stat app-shell-stat-streak${isStreakAtRisk(cached) ? " is-at-risk" : ""}" id="app-shell-streak">${ICONS.streak}${cached.dayStreak || 0}</span>
                    <span class="app-shell-stat app-shell-stat-coin" id="app-shell-coins">${ICONS.coin}${coinsHeld}</span>
                    <span class="app-shell-stat app-shell-stat-key" id="app-shell-keys">${ICONS.key}${keysHeld}</span>
                </div>
                <div class="language-menu app-shell-lang-menu">
                    <span class="app-shell-flag" id="app-shell-flag-toggle" tabindex="0" role="button" aria-haspopup="true" aria-expanded="false"><img src="${flagSrc}" alt=""></span>
                    <div id="app-shell-language-menu" class="language-menu-panel" role="menu" hidden></div>
                </div>
            </div>
        `;

        renderHeaderAuth(window.PolytypeFirebase?.state || {});
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
        if (typeof authState.profile?.currentStreak === "number") {
            paintStreak(authState.profile);
        }

        if (typeof authState.profile?.totalXp === "number") {
            renderHeaderLevel(authState.profile.totalXp);
        }
    }

    // The level pill reads totalXp, which - unlike coins/keys - is shared
    // across every language, so it needs no language argument.
    function renderHeaderLevel(totalXp) {
        // While a burst owns the pill, profile updates must not snap it to the
        // final value - the whole point is to show the climb.
        if (xpDisplayHeld) return;
        paintLevel(getLevelInfo(totalXp));
    }

    // Low-level painter, deliberately below the hold check above so the burst
    // can drive the pill while everything else is frozen out.
    function paintLevel(levelInfo) {
        const badge = document.getElementById("app-shell-level-badge");
        if (badge && badge.textContent !== String(levelInfo.level)) {
            badge.textContent = levelInfo.level;
        }

        const fill = document.getElementById("app-shell-level-fill");
        if (fill) fill.style.width = `${levelInfo.progress}%`;

        // Rounded because animateLevelBar walks a *fractional* XP total frame
        // by frame - without this the pill reads "145.4233935687812/900"
        // for the length of the climb.
        const text = document.getElementById("app-shell-level-text");
        if (text) {
            const label = `${Math.round(levelInfo.currentXp)}/${levelInfo.nextXp}`;
            if (text.textContent !== label) text.textContent = label;
        }
    }

    // ── End-of-game XP burst ────────────────────────────────────────────
    // A game that wants to *show* its XP award calls holdXpDisplay() before
    // saving (the save's profile update would otherwise snap the bar to its
    // new value while the result screen is still animating in), then
    // playXpGain() once the result card is on screen.

    let xpDisplayHeld = false;
    // Captured at hold time, not at play time: the save writes the new total
    // into the profile cache well before the result screen asks for the
    // animation, so by then the "before" value is already gone.
    let heldFromXp = 0;

    function holdXpDisplay() {
        heldFromXp = Number(readCachedProfile().xp) || 0;
        xpDisplayHeld = true;
    }

    function releaseXpDisplay() {
        xpDisplayHeld = false;
        renderHeaderLevel(readCachedProfile().xp);
    }

    function prefersReducedMotion() {
        return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches === true;
    }

    function clamp(value, min, max) {
        return Math.min(max, Math.max(min, value));
    }

    // The box every flying thing (XP stars, the purchased key) has to stay
    // inside. `visualViewport` is the actual visible area - it shrinks for an
    // on-screen keyboard or a mobile browser's collapsing URL bar, unlike
    // `innerWidth/innerHeight` which can lag behind. Falling back to the
    // latter only for browsers without it.
    function getViewportBounds(margin = FLIGHT_EDGE_MARGIN) {
        const viewport = window.visualViewport;
        const left = viewport?.offsetLeft ?? 0;
        const top = viewport?.offsetTop ?? 0;
        return {
            minX: left + margin,
            maxX: left + (viewport?.width ?? window.innerWidth) - margin,
            minY: top + margin,
            maxY: top + (viewport?.height ?? window.innerHeight) - margin
        };
    }

    // Reads an element or a pre-captured DOMRect (callers whose origin element
    // is gone by flight time pass the latter) into a plain rect.
    function toRect(origin) {
        if (!origin) return null;
        const rect = typeof origin.getBoundingClientRect === "function"
            ? origin.getBoundingClientRect()
            : origin;
        return (rect.width || rect.height) ? rect : null;
    }

    // Flies a handful of stars from `origin` into the level bar while the
    // bar itself climbs from the held value to `targetXp`. Always releases the
    // hold, including on an early return, so a failure here can never leave
    // the header frozen for the rest of the session.
    // `keepHeld` leaves the pill showing the animated value instead of
    // repainting from the profile cache when the burst ends. Only useful when
    // the cache was never actually updated - i.e. the demo chest, whose gain
    // isn't real; without it the bar would visibly slide back down while the
    // overlay is still open. Callers that pass it own the release.
    // `origin`: the element (or a pre-captured DOMRect) the stars fly from.
    async function playXpGain(targetXp, origin, { keepHeld = false } = {}) {
        const fromXp = heldFromXp;
        const toXp = Number(targetXp) || 0;

        if (!xpDisplayHeld || toXp <= fromXp) {
            releaseXpDisplay();
            return;
        }

        if (prefersReducedMotion()) {
            releaseXpDisplay();
            return;
        }

        try {
            launchStars(origin);
            const crossedLevels = await animateLevelBar(fromXp, toXp);

            // Fired after the bar has settled on the new level, so the
            // celebration lands on top of a pill already showing it rather
            // than racing the climb. Optional: pages that don't load
            // js/levelup.js simply get the bar animation on its own.
            if (crossedLevels) {
                await window.PolytypeLevelUp?.show?.(getLevelInfo(toXp).level);
            }
        } finally {
            if (!keepHeld) releaseXpDisplay();
        }
    }

    const XP_BURST_DURATION = 1150;
    const XP_STAR_COUNT = 14;
    // Stars land over the first stretch of the flight; the bar keeps climbing
    // a little past the last arrival so it settles rather than stopping dead.
    const XP_BAR_LEAD_IN = 260;
    // How many points sample each star's arc (see launchStars). More points
    // = a smoother curve; 10 is already far more than the eye needs for an
    // ~800ms flight, since the browser interpolates linearly between them.
    const XP_STAR_PATH_STEPS = 10;
    // Kept clear of every viewport edge - see launchStars for why this is
    // what actually guarantees a flying element can never leave the screen.
    const FLIGHT_EDGE_MARGIN = 16;

    function animateLevelBar(fromXp, toXp) {
        const fill = document.getElementById("app-shell-level-fill");
        const badge = document.getElementById("app-shell-level-badge");
        fill?.classList.add("is-animating");

        const startLevel = getLevelInfo(fromXp).level;
        let lastLevel = startLevel;

        // Resolves with whether the climb crossed at least one level boundary,
        // so the caller can decide whether to celebrate.
        return new Promise(resolve => {
            const start = performance.now();

            const step = now => {
                const elapsed = now - start - XP_BAR_LEAD_IN;
                const t = Math.max(0, Math.min(1, elapsed / XP_BURST_DURATION));
                // easeOutCubic: quick to move, slow to settle.
                const eased = 1 - Math.pow(1 - t, 3);
                const info = getLevelInfo(fromXp + (toXp - fromXp) * eased);

                // Rollover comes free: getLevelInfo recomputes level and
                // progress from the running total, so the bar fills, flips to
                // the next level and carries on from empty on its own.
                if (info.level !== lastLevel) {
                    lastLevel = info.level;
                    if (badge) {
                        badge.classList.remove("is-levelup");
                        void badge.offsetWidth; // restart the animation
                        badge.classList.add("is-levelup");
                    }
                }

                paintLevel(info);

                if (t < 1) {
                    requestAnimationFrame(step);
                } else {
                    fill?.classList.remove("is-animating");
                    resolve(lastLevel > startLevel);
                }
            };

            requestAnimationFrame(step);
        });
    }

    const STAR_SVG =
        '<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">' +
        '<path d="M12 1.6l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 16.8 5.9 20.2l1.4-6.8L2.2 8.7l6.9-.8z"/>' +
        "</svg>";

    // `origin` is either an element or a plain DOMRect - the chest passes a
    // rect captured before its overlay closes, since by the time the stars
    // fly the element they came from is gone.
    //
    // The flight is a quadratic Bezier (start -> lifted control point ->
    // target), sampled by hand into real keyframes instead of leaning on a
    // single CSS easing curve to fake a curve out of a straight line - that's
    // what used to send stars shooting off the top of the screen: an easing
    // curve chosen to *look* like an arc can overshoot its own endpoints, and
    // with the target sitting right at the top of the viewport, any overshoot
    // there has nowhere to go but off-screen. A sampled Bezier can't do that:
    // every point it ever produces is a weighted average of its three control
    // points (that's the convex-hull property of Bezier curves), so as long
    // as all three are clamped inside the visible viewport, the whole curve
    // is too - no matter how the flight's start/end points end up measured.
    function launchStars(origin) {
        const target = document.querySelector(".app-shell-level-track");
        const from = toRect(origin);
        const to = toRect(target);
        if (!from || !to) return;

        const { minX, maxX, minY, maxY } = getViewportBounds();

        const layer = document.createElement("div");
        layer.className = "xp-star-layer";
        layer.setAttribute("aria-hidden", "true");
        document.body.appendChild(layer);

        const originX = clamp(from.left + from.width / 2, minX, maxX);
        const originY = clamp(from.top + from.height / 2, minY, maxY);
        // Aimed at the left third of the track, where the fill actually grows
        // from - not the track's centre. The bar lives in the top-left corner,
        // so centring the target made the whole flight read as heading for the
        // middle of the screen.
        const targetX = clamp(to.left + to.width * 0.3, minX, maxX);
        const targetY = clamp(to.top + to.height / 2, minY, maxY);

        let longest = 0;

        for (let i = 0; i < XP_STAR_COUNT; i += 1) {
            const star = document.createElement("span");
            star.className = "xp-star";
            star.innerHTML = STAR_SVG;
            layer.appendChild(star);

            // Scatter the launch a little so they don't leave as one clump.
            const spreadX = (Math.random() - 0.5) * clamp(from.width, 40, 70);
            const spreadY = (Math.random() - 0.5) * 26;
            const startX = clamp(originX + spreadX, minX, maxX);
            const startY = clamp(originY + spreadY, minY, maxY);

            // The control point sits above the flight's midpoint, lifted by a
            // fraction of the travel distance (capped so a long flight - say,
            // from a card near the bottom of a tall phone screen - doesn't
            // arc absurdly high). Clamping its Y to `minY`, the same floor
            // every other point respects, is what makes the "no overshoot"
            // guarantee above actually hold: the control point can pull the
            // curve UP, but never past the floor the other two points already
            // live within.
            const liftDistance = Math.min(130, Math.hypot(targetX - startX, targetY - startY) * 0.35);
            const controlX = clamp((startX + targetX) / 2 + (Math.random() - 0.5) * 40, minX, maxX);
            const controlY = Math.max(minY, (startY + targetY) / 2 - liftDistance);

            const delay = i * 40;
            const duration = 760 + Math.random() * 180;
            longest = Math.max(longest, delay + duration);

            // Baking the ease into the sampled points (rather than handing a
            // curve to `.animate()`'s own `easing`) keeps the path's shape
            // fully in our hands: quick off the pad, a confident glide
            // through the arc, a gentle settle into the bar - continuous the
            // whole way, with none of the old "frozen in place while it
            // scales up, then suddenly darts off" hitch.
            const keyframes = [];
            for (let step = 0; step <= XP_STAR_PATH_STEPS; step += 1) {
                const t = step / XP_STAR_PATH_STEPS;
                // easeOutCubic: quick to move, slow to settle - same curve
                // animateLevelBar uses for the fill, so the stars' arrival
                // and the bar's climb feel like one motion.
                const eased = 1 - Math.pow(1 - t, 3);
                const inv = 1 - eased;
                // Quadratic Bezier at parameter `eased`, weighting the three
                // control points - see the function-level comment for why
                // this can never leave the clamped box the points live in.
                const x = inv * inv * startX + 2 * inv * eased * controlX + eased * eased * targetX;
                const y = inv * inv * startY + 2 * inv * eased * controlY + eased * eased * targetY;

                const scale = t < 0.16
                    ? 0.35 + 0.65 * (t / 0.16)
                    : 1 - 0.7 * ((t - 0.16) / (1 - 0.16));
                const rotate = 360 * t; // one lazy spin over the whole flight
                const opacity = t < 0.1
                    ? t / 0.1
                    : (t > 0.82 ? Math.max(0, (1 - t) / 0.18) : 1);

                keyframes.push({
                    transform: `translate3d(${x}px, ${y}px, 0) scale(${scale}) rotate(${rotate}deg)`,
                    opacity
                });
            }

            star.animate(keyframes, {
                duration,
                delay,
                // Deliberately linear: the ease already lives in the sampled
                // `t` values above, so a second curve on top of it would
                // double it up and read as a stall-then-rush.
                easing: "linear",
                // fill:"both", not "forwards": with a stagger delay,
                // "forwards" leaves each not-yet-started star showing its
                // *base* style - no transform and no opacity rule, i.e. fully
                // visible parked in the viewport's top-left corner until its
                // turn comes. "both" applies the first keyframe (opacity 0,
                // at the origin) through the delay too.
                fill: "both"
            });
        }

        window.setTimeout(() => layer.remove(), longest + 200);
    }

    // ── Purchased-key flight ────────────────────────────────────────────
    // Buying a key says nothing: the key itself flies out of the shop tile
    // into the header's key counter, and the counter only ticks up once it
    // lands. The flight *is* the confirmation - no status text involved.
    //
    // Same hold/play split as the XP burst above: the buy call updates the
    // profile cache (and so the header) the moment the server answers, well
    // before the animation gets to run, so the shop calls holdKeyDisplay()
    // *before* buying to keep the old count on screen until the key arrives.

    let keyDisplayHeld = false;

    function holdKeyDisplay() {
        keyDisplayHeld = true;
    }

    function releaseKeyDisplay() {
        keyDisplayHeld = false;
        paintHeaderKeys();
    }

    function paintHeaderKeys(cached) {
        const keysEl = document.getElementById("app-shell-keys");
        if (!keysEl) return;
        const language = localStorage.getItem("polytype-language") || "chinese";
        keysEl.innerHTML = `${ICONS.key}${getKeysHeldForLanguage(language, cached || readCachedProfile())}`;
    }

    const KEY_FLIGHT_DURATION = 1020;
    const KEY_FLIGHT_STEPS = 18;
    // Fraction of the timeline the key spends popping out of the tile before
    // it sets off. Without it the whole flight is over the moment the eye
    // finds it: easeOutCubic covers a third of the distance in its first
    // eighth, so the key read as a glow that was already halfway up the
    // screen rather than as *this* key, leaving *this* tile.
    const KEY_LAUNCH_HOLD = 0.18;

    // Flies one key from `origin` (element or DOMRect) into the header stat,
    // then hands the counter its new value with a pop. Always releases the
    // hold - including on every early return - so a missing target or a
    // reduced-motion preference can never leave the header stuck on a stale
    // count for the rest of the session.
    async function playKeyGain(origin) {
        const target = document.getElementById("app-shell-keys");
        const from = toRect(origin);
        const to = toRect(target);

        if (!from || !to || prefersReducedMotion()) {
            releaseKeyDisplay();
            bumpKeyStat();
            return;
        }

        const { minX, maxX, minY, maxY } = getViewportBounds();
        const startX = clamp(from.left + from.width / 2, minX, maxX);
        const startY = clamp(from.top + from.height / 2, minY, maxY);
        const targetX = clamp(to.left + to.width / 2, minX, maxX);
        const targetY = clamp(to.top + to.height / 2, minY, maxY);

        const layer = document.createElement("div");
        layer.className = "xp-star-layer";
        layer.setAttribute("aria-hidden", "true");
        const flyer = document.createElement("span");
        flyer.className = "key-flight";
        flyer.innerHTML = ICONS.key;
        layer.appendChild(flyer);
        document.body.appendChild(layer);

        // Same sampled quadratic Bezier as launchStars - see the long comment
        // there for why a hand-sampled curve, rather than an easing curve bent
        // to look like one, is what keeps the flight inside the viewport.
        const liftDistance = Math.min(140, Math.hypot(targetX - startX, targetY - startY) * 0.38);
        const controlX = clamp((startX + targetX) / 2, minX, maxX);
        const controlY = Math.max(minY, (startY + targetY) / 2 - liftDistance);

        const keyframes = [];
        for (let step = 0; step <= KEY_FLIGHT_STEPS; step += 1) {
            const t = step / KEY_FLIGHT_STEPS;
            // Travel only starts once the pop-out is done - before that the
            // key sits on the tile, so `eased` stays 0 and every sampled
            // point is the origin.
            const travel = Math.max(0, (t - KEY_LAUNCH_HOLD) / (1 - KEY_LAUNCH_HOLD));
            // easeInOutCubic, not the stars' easeOutCubic: a single carried
            // object wants to gather speed and then set itself down. Front-
            // loading it the way the stars do put the key within a few pixels
            // of the counter halfway through, leaving the rest of the flight
            // looking like a stall.
            const eased = travel < 0.5
                ? 4 * travel * travel * travel
                : 1 - Math.pow(-2 * travel + 2, 3) / 2;
            const inv = 1 - eased;
            const x = inv * inv * startX + 2 * inv * eased * controlX + eased * eased * targetX;
            const y = inv * inv * startY + 2 * inv * eased * controlY + eased * eased * targetY;

            // Swells out of the tile first, then tucks itself down into the
            // counter, ending at roughly the icon size that lives there - so
            // the landing reads as the same object settling in.
            const scale = t < KEY_LAUNCH_HOLD
                ? 0.35 + 1.1 * (t / KEY_LAUNCH_HOLD)
                : 1.45 - 0.95 * eased;
            // One full turn over the flight, landing upright.
            const rotate = 360 * eased;
            const opacity = t < 0.06 ? t / 0.06 : (t > 0.92 ? (1 - t) / 0.08 : 1);

            keyframes.push({
                transform: `translate3d(${x}px, ${y}px, 0) scale(${scale}) rotate(${rotate}deg)`,
                opacity
            });
        }

        try {
            // Deliberately linear: the ease already lives in the sampled `t`
            // values above (same reasoning as the XP stars).
            await flyer.animate(keyframes, { duration: KEY_FLIGHT_DURATION, easing: "linear", fill: "both" }).finished;
        } catch {
            // A page navigation mid-flight cancels the animation - land the
            // count anyway rather than swallowing the purchase.
        } finally {
            layer.remove();
            releaseKeyDisplay();
            bumpKeyStat();
        }
    }

    function bumpKeyStat() {
        const keysEl = document.getElementById("app-shell-keys");
        if (!keysEl) return;
        keysEl.classList.remove("is-bumped");
        void keysEl.offsetWidth; // restart the animation
        keysEl.classList.add("is-bumped");
    }

    // Coins and keys are both per-course, both sourced from the same cached
    // profile, and both change together whenever a purchase/session-save
    // fires polytype-profile-updated - so one function keeps them in sync
    // instead of two separate (and separately wired) renderers.
    function renderHeaderCurrency(event) {
        const language = localStorage.getItem("polytype-language") || "chinese";
        const cached = event?.detail || readCachedProfile();

        const coinsEl = document.getElementById("app-shell-coins");
        if (coinsEl) coinsEl.innerHTML = `${ICONS.coin}${getCoinsForLanguage(language, cached)}`;

        // Held while a purchased key is still in flight - see playKeyGain.
        if (!keyDisplayHeld) paintHeaderKeys(cached);

        // The live Firebase profile is the only place carrying a fresh
        // lastPracticeDate right after a session save, so prefer it over the
        // localStorage mirror for deciding whether the flame is lit.
        paintStreak(window.PolytypeFirebase?.state?.profile || cached);

        // The local mirror calls it `xp`; the remote profile calls the same
        // number `totalXp` (see syncProfileToLocalStorage in firebase-client.js).
        renderHeaderLevel(cached.xp);
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

    // Exposed so js/router.js can re-highlight the active tab after a soft
    // navigation updates document.body.dataset.tab, without a full header
    // re-render (the header itself doesn't depend on which page you're on),
    // and so it can also nudge the friends cache on every navigation - see
    // the call site in js/router.js for why (the DOMContentLoaded prefetch
    // below only ever fires once per tab, on sign-in/out; without a repeat
    // trigger the cache goes stale the moment someone browses for more than
    // FRIENDS_CACHE_STALE_MS before actually opening Friends).
    window.PolytypeAppShell = {
        renderBottomNav,
        prefetchFriendsOverview,
        prefetchActiveDeck,
        holdXpDisplay,
        releaseXpDisplay,
        playXpGain,
        holdKeyDisplay,
        releaseKeyDisplay,
        playKeyGain,
        paintStreakAhead,
        // The level curve, for callers that need to know where the next
        // boundary is rather than just painting the bar - e.g. aiming
        // playXpGain at an XP total that crosses one.
        getLevelInfo
    };

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
    // profile cache - keep the header's coin/key counts live without
    // needing a full reload (unlike the study-language flag switch, which
    // does reload the page and so re-renders the header from scratch
    // anyway).
    document.addEventListener("polytype-profile-updated", renderHeaderCurrency);

    // Unlike the paint above, this needs window.PolytypeFirebase to already
    // exist - only DOMContentLoaded guarantees that (it waits for every
    // blocking script, Firebase SDKs included, regardless of where this
    // script tag sits relative to them).
    document.addEventListener("DOMContentLoaded", () => {
        window.PolytypeFirebase?.onChange?.(renderHeaderAuth);
        window.PolytypeFirebase?.onChange?.(prefetchFriendsOverview);
        // js/router.js warms this on every *soft* navigation, but a cold load
        // (typing a URL, refreshing, following an external link) never goes
        // through the router - without this the very first Deck/Sprint open of
        // a tab would still pay for the fetch.
        prefetchActiveDeck();
    });
})();
