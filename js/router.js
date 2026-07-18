// Lightweight client-side router: intercepts clicks on internal links to
// SPA-registered pages, fetches the target HTML, swaps <main> in place, and
// re-runs that page's own script(s) - no full document reload, no re-init
// of Firebase/i18n/gamestate/app-shell (those stay loaded once, for the
// life of the tab).
//
// Page-specific scripts are re-executed on every visit by fetching their
// source text and eval-ing it wrapped in a fresh IIFE (see runScript
// below) - this isolates each run's top-level const/let so re-visiting the
// same page repeatedly can never throw "already declared", regardless of
// whether the underlying file itself is IIFE-wrapped. It does NOT solve
// "this script's document-level listeners pile up on every re-visit" on
// its own - see window.__polytypePageHooks for the two cross-cutting
// events (language change, profile update) most pages care about; that
// mechanism is reset before every navigation instead of accumulating.
(function () {
    // Beyond the shared shell scripts (Firebase SDKs, i18n, firebase-client,
    // gamestate, app-shell, tutorial, this file) already loaded once on the
    // very first hard page load and never touched again.
    const PAGE_SCRIPTS = {
        "index.html": ["js/chest.js", "js/dashboard.js"],
        "trainer.html": ["decks/index.js", "decks/categories.js", "js/mission-celebrate.js", "js/main.js"],
        "dictate.html": ["decks/index.js", "decks/categories.js", "js/mission-celebrate.js", "js/dictate.js"],
        "memory.html": ["decks/index.js", "decks/categories.js", "js/mission-celebrate.js", "js/memory.js"],
        "sprint.html": ["decks/index.js", "decks/categories.js", "js/mission-celebrate.js", "js/sprint.js"],
        "deck.html": ["decks/index.js", "decks/categories.js", "js/deck.js"],
        "categories.html": ["decks/index.js", "decks/categories.js", "js/categories.js"],
        "shop.html": ["decks/index.js", "decks/categories.js", "js/shop.js"],
        "lessons.html": ["decks/lessons-norwegian.js", "decks/lessons-swedish.js", "js/mission-celebrate.js", "js/lessons.js"],
        "friends.html": ["js/friends.js"],
        "find-friends.html": ["js/find-friends.js"],
        "visit-profile.html": ["js/visit-profile.js"],
        "profile.html": ["js/profile.js"],
        "settings.html": ["js/settings.js"],
        "languages.html": ["decks/index.js", "js/languages.js"],
        "games.html": []
    };

    const LOADING_CLASS = "is-route-loading";
    let currentPage = getPageName(location.pathname);
    let navToken = 0;

    // In-memory caches of in-flight/finished fetches, keyed by request URL.
    // A hover-triggered prefetch and the real navigation that follows it
    // share the same Promise here instead of firing two separate requests,
    // and a rejected fetch removes its own entry so one transient failure
    // never poisons a later real navigation. Entries are consumed (deleted)
    // by the navigation that uses them, so a later visit still refetches
    // fresh HTML/script text - matching the original always-fetch behaviour.
    const htmlPrefetch = new Map();
    const scriptPrefetch = new Map();

    function fetchText(cache, key, url) {
        let promise = cache.get(key);
        if (!promise) {
            promise = fetch(url).then(response => {
                if (!response.ok) throw new Error(`fetch failed ${url}: ${response.status}`);
                return response.text();
            });
            promise.catch(() => cache.delete(key));
            cache.set(key, promise);
        }
        return promise;
    }

    // Two events almost every page listens for (language switch, profile
    // sync) - rather than each page's own document.addEventListener call
    // piling up one more handler per revisit, pages register themselves
    // here instead, and this file owns the single real listener for each
    // (added once, since this file is never re-injected). Reset before
    // every navigation so a page that doesn't care about an event doesn't
    // leave a stale, previous page's handler dangling.
    window.__polytypePageHooks = {};
    document.addEventListener("polytype-app-language-changed", event => {
        window.__polytypePageHooks?.onLanguageChanged?.(event);
    });
    document.addEventListener("polytype-profile-updated", event => {
        window.__polytypePageHooks?.onProfileUpdated?.(event);
    });

    // Accepts either a bare pathname or a pathname+query/hash string (navigate()
    // is called both ways) - stripping ?/# first keeps the two call sites
    // from ever disagreeing about which page a URL belongs to.
    function getPageName(pathname) {
        const withoutQuery = pathname.split(/[?#]/)[0];
        const last = withoutQuery.split("/").pop() || "";
        return last && last.includes(".") ? last : "index.html";
    }

    function isRoutable(page) {
        return Object.prototype.hasOwnProperty.call(PAGE_SCRIPTS, page);
    }

    document.addEventListener("click", event => {
        if (event.defaultPrevented || event.button !== 0) return;
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

        const link = event.target.closest("a[href]");
        if (!link || (link.target && link.target !== "_self") || link.hasAttribute("download")) return;

        let url;
        try {
            url = new URL(link.href, location.href);
        } catch {
            return;
        }
        if (url.origin !== location.origin) return;

        const page = getPageName(url.pathname);
        if (!isRoutable(page)) return;

        // Same page, no real navigation needed (e.g. a stray link back to
        // the current page) - just let the click no-op rather than re-fetch.
        if (page === currentPage && url.pathname === location.pathname && url.search === location.search) {
            event.preventDefault();
            return;
        }

        event.preventDefault();
        navigate(url.pathname + url.search, { push: true });
    });

    window.addEventListener("popstate", () => {
        navigate(location.pathname + location.search, { push: false });
    });

    // Warm the HTML + page-script caches the moment a routable internal link
    // is hovered, focused, or touched - the click / Enter / tap that usually
    // follows within a few hundred ms then reuses an already in-flight (or
    // finished) fetch instead of starting from cold, which is what made
    // navigation feel laggy. Cheap to fire on every hover: each target is
    // fetched at most once (fetchText dedups), and external, non-routable, or
    // current-page links no-op immediately.
    let lastPrefetchedKey = "";
    function prefetchFromEvent(event) {
        const link = event.target.closest?.("a[href]");
        if (!link || (link.target && link.target !== "_self") || link.hasAttribute("download")) return;

        let url;
        try {
            url = new URL(link.href, location.href);
        } catch {
            return;
        }
        if (url.origin !== location.origin) return;

        const page = getPageName(url.pathname);
        if (!isRoutable(page) || page === currentPage) return;

        const key = url.pathname + url.search;
        if (key === lastPrefetchedKey) return;
        lastPrefetchedKey = key;

        fetchText(htmlPrefetch, key, key).catch(() => {});
        for (const src of PAGE_SCRIPTS[page] || []) {
            if (STATIC_DATA_SCRIPTS.has(src) && loadedStaticScripts.has(src)) continue;
            fetchText(scriptPrefetch, src, src).catch(() => {});
        }
    }
    document.addEventListener("mouseover", prefetchFromEvent);
    document.addEventListener("focusin", prefetchFromEvent);
    document.addEventListener("touchstart", prefetchFromEvent, { passive: true });

    // Exposed for other shell scripts (js/tutorial.js's "keep the player on
    // rails" redirect and its intro CTA) that need to trigger a soft
    // navigation programmatically instead of only reacting to link clicks.
    window.PolytypeRouter = { navigate: path => navigate(path, { push: true }) };

    async function navigate(path, { push }) {
        const page = getPageName(path);
        if (!isRoutable(page)) {
            window.location.href = path;
            return;
        }

        // Guards against overlapping navigations (double-click, or a popstate
        // firing while a click-triggered fetch is still in flight) - only the
        // most recent call is allowed to actually apply its result.
        const token = ++navToken;
        document.body.classList.add(LOADING_CLASS);

        // Runs in parallel with the page fetch below, on every navigation -
        // keeps friends.html's cache warm regardless of how long someone
        // browses before actually opening it (see js/app-shell.js's own
        // comment on prefetchFriendsOverview for why the DOMContentLoaded-
        // only trigger isn't enough on its own). Self-throttled and
        // no-ops for signed-out users, so this is cheap to call on every
        // single navigation.
        window.PolytypeAppShell?.prefetchFriendsOverview?.(window.PolytypeFirebase?.state || {});

        let html;
        try {
            html = await fetchText(htmlPrefetch, path, path);
        } catch {
            window.location.href = path; // Best-effort fallback: a real navigation always works.
            return;
        } finally {
            htmlPrefetch.delete(path); // Consume: the next visit refetches fresh HTML.
        }
        if (token !== navToken) return;

        const doc = new DOMParser().parseFromString(html, "text/html");
        const newMain = doc.querySelector("main");
        const oldMain = document.querySelector("main");
        if (!newMain || !oldMain) {
            window.location.href = path;
            return;
        }

        if (push) history.pushState({ polytypeRoute: true }, "", path);

        // Swap every body node this page owns, not just <main>: several
        // pages (trainer.html's start gate, memory.html's difficulty/result
        // modals, deck.html's unlock-confirm dialog) place full-screen
        // overlay markup as a <main> *sibling*, not inside it - swapping
        // <main> alone silently lost those on a revisit. #app-header/
        // #app-bottom-nav/#polytype-vkbd are the only nodes that belong to
        // the persistent shell and must survive untouched; <script> tags
        // are left alone too (already executed - removing the tag wouldn't
        // undo that, and page scripts are re-run explicitly via
        // loadPageScripts below).
        const SHELL_IDS = new Set(["app-header", "app-bottom-nav", "polytype-vkbd"]);
        const ownedNodes = root => Array.from(root.children).filter(node =>
            node.tagName !== "SCRIPT" && !SHELL_IDS.has(node.id));

        const anchor = document.getElementById("app-bottom-nav");
        ownedNodes(document.body).forEach(node => node.remove());
        ownedNodes(doc.body).forEach(node => {
            document.body.insertBefore(node, anchor);
        });

        document.body.className = doc.body.className;
        if (doc.body.dataset.tab) document.body.dataset.tab = doc.body.dataset.tab;
        else delete document.body.dataset.tab;

        const newTitleEl = doc.querySelector("title[data-i18n]");
        const liveTitleEl = document.querySelector("title");
        if (newTitleEl && liveTitleEl) {
            liveTitleEl.dataset.i18n = newTitleEl.dataset.i18n;
            document.title = window.PolytypeI18n?.t?.(newTitleEl.dataset.i18n) || newTitleEl.textContent;
        } else {
            document.title = doc.title;
        }

        window.PolytypeI18n?.applyStaticTranslations?.(document.body);
        window.scrollTo(0, 0);
        window.PolytypeAppShell?.renderBottomNav?.();

        currentPage = page;
        window.__polytypePageHooks = {};
        // The next page re-attaches it (on focus, or explicitly for
        // callback-mode exercises) only if it actually needs it - without
        // this it would linger, still targeting an input/callback that just
        // got ripped out of the DOM above.
        window.PolytypeKeyboard?.hide?.();
        await loadPageScripts(page);
        if (token !== navToken) return;

        window.PolytypeTutorial?.evaluate?.();
        document.body.classList.remove(LOADING_CLASS);
    }

    // These two only ever define static global data (window.DECK_INDEX /
    // window.POLYTYPE_CATEGORIES) - no per-page listeners, no DOM
    // dependencies, nothing that needs a fresh run per visit the way every
    // other page script does. Re-fetching and re-evaling the same data on
    // every single visit to any of the many pages that list them (Shop,
    // Deck, Trainer, Sprint, Dictate, Memory, Categories, Languages) was a
    // real, visible delay in front of content that's otherwise already
    // sitting in localStorage and could render instantly (e.g. Shop's coin
    // balance, already shown in the header) - loaded once per tab session,
    // skipped on every visit after that.
    const STATIC_DATA_SCRIPTS = new Set(["decks/index.js", "decks/categories.js", "decks/lessons-norwegian.js", "decks/lessons-swedish.js"]);
    const loadedStaticScripts = new Set();

    async function loadPageScripts(page) {
        const scripts = PAGE_SCRIPTS[page] || [];

        // Kick every script's fetch off up front, in parallel (reusing any
        // hover-prefetched request already in flight), then execute them in
        // strict document order below. Fetching is side-effect-free, so
        // overlapping the downloads is safe; only *execution* order matters,
        // for the const/let and global-dependency reasons runScript
        // documents. The old code fetched-then-ran one script at a time, so a
        // page like Trainer (four scripts, main.js ~60KB) paid four serial
        // round trips end to end before its first line ran.
        const pending = scripts.map(src => {
            if (STATIC_DATA_SCRIPTS.has(src) && loadedStaticScripts.has(src)) return null;
            return fetchText(scriptPrefetch, src, src).catch(err => {
                console.error("router: script load failed", src, err);
                return null;
            });
        });

        for (let i = 0; i < scripts.length; i++) {
            if (pending[i] === null) continue;
            const src = scripts[i];
            const code = await pending[i];
            scriptPrefetch.delete(src);
            if (code === null) continue;
            runScript(src, code);
            if (STATIC_DATA_SCRIPTS.has(src)) loadedStaticScripts.add(src);
        }
    }

    // Executes already-fetched script source wrapped in a fresh IIFE via an
    // inline <script> tag (not src=) - this is what makes it safe to
    // re-execute the same file on every revisit: each run's top-level
    // const/let live in their own function scope, never colliding with a
    // previous run's now-orphaned bindings the way two plain <script src>
    // insertions of the same file would (a second "already declared"
    // SyntaxError, since classic scripts share one global scope). The
    // sourceURL comment keeps the file identifiable in DevTools despite
    // being inlined. The fetch itself now happens up front in
    // loadPageScripts, so every script a page needs downloads in parallel.
    function runScript(src, code) {
        const script = document.createElement("script");
        script.textContent = `(function () {\n${code}\n})();\n//# sourceURL=${location.origin}/${src}`;
        document.body.appendChild(script);
        script.remove();
    }
})();
