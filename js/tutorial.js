// Guided first-course tutorial (see TUTORIAL_STEPS in api/_lib.js). Runs on
// deck.html/shop.html/sprint.html only - the three pages the tutorial ever
// visits. Fully driven by the cached profile's `tutorial` field (same
// localStorage-mirror pattern as the rest of the app, kept fresh by every
// buy-key/unlock-word/complete-practice-session/start-course response), so
// it resumes correctly on a reload with no server round trip needed to
// decide what to show.
(function () {
    const PROFILE_KEY = "polytype-profile";

    const STEP_PAGES = {
        "deck-intro": "deck.html",
        "buy-keys": "shop.html",
        "choose-words": "deck.html",
        "play-sprint": "sprint.html"
    };

    // Keep in sync with KEY_PRICE_COINS / MAX_KEYS in api/_lib.js - same
    // duplication js/shop.js already carries, for the same reason (these two
    // numbers decide what the player can afford, and both sides have to agree
    // on that to decide whether a step is still completable).
    const KEY_PRICE_COINS = 100;
    const MAX_KEYS = 5;

    // Set by skipTutorial() and read before anything else, so a player who
    // has bailed out is never re-trapped by a cached profile that still says
    // the tutorial is running. Holds the courseId it was skipped for rather
    // than a bare flag: a second account signing in on the same browser gets
    // its own first-course tutorial instead of inheriting this one's exit.
    const SKIP_KEY = "polytype-tutorial-skipped";

    let spotlightHandle = null;

    function tr(key, params) {
        return window.PolytypeI18n?.t?.(key, params) || key;
    }

    function readCachedProfile() {
        try {
            return JSON.parse(localStorage.getItem(PROFILE_KEY)) || {};
        } catch {
            return {};
        }
    }

    function getActiveLanguage() {
        return localStorage.getItem("polytype-language") || "chinese";
    }

    function getCurrentPage() {
        return (window.location.pathname.split("/").pop() || "").toLowerCase();
    }

    function clearStepUi() {
        document.getElementById("tutorial-intro-overlay")?.remove();
        document.getElementById("tutorial-banner")?.remove();
        if (spotlightHandle) {
            spotlightHandle.destroy();
            spotlightHandle = null;
        }
    }

    // Set after the first evaluate() call completes - see the redirect
    // branch below for why this matters.
    let hasEvaluatedOnce = false;

    function getTutorialCourseId(tutorial) {
        return tutorial?.courseId || getActiveLanguage();
    }

    function isTutorialSkipped(tutorial) {
        if (!tutorial?.active) return false;
        return localStorage.getItem(SKIP_KEY) === getTutorialCourseId(tutorial);
    }

    // The buy-keys step is the one place the tutorial can paint itself into a
    // corner. It wants 5 keys; the Shop's buy button disables itself the
    // moment coins run short (see renderShop in js/shop.js), every other card
    // on the page is behind the spotlight mask, and the nav rail is inert -
    // so a player who reaches it with less than one key's worth of coins and
    // fewer than 5 keys has nothing left to click and nowhere to go. The 500
    // gifted coins cover exactly 5 keys, so this only happens when some of
    // them went elsewhere first (a course that predates the gift, a chest
    // bought before the tutorial shipped, a purchase the server refused after
    // the coins were already spent locally) - rare, but a total dead end when
    // it does happen, which is why it's detected here rather than left for
    // the player to discover.
    function isStuckOnBuyKeys(profile, tutorial) {
        if (!tutorial?.active || tutorial.step !== "buy-keys") return false;

        // No cached course record means the profile hasn't landed yet (or is
        // filed under a legacy key) - that's "nothing known", not "no coins",
        // and reading it as a dead end would drop the rail for a step that is
        // very likely still perfectly completable.
        const course = profile?.courses?.[getTutorialCourseId(tutorial)];
        if (!course) return false;

        const purchasedKeys = Math.max(0, Math.trunc(Number(course.purchasedKeys) || 0));
        // One more purchase would finish the step, so this isn't a dead end
        // however few coins are left - the buy that gets them to 5 is the one
        // that advances the tutorial (see api/buy-key.js).
        if (Math.min(MAX_KEYS, purchasedKeys) >= MAX_KEYS) return false;

        return (Number(course.coins) || 0) < KEY_PRICE_COINS;
    }

    // Bails out of the tutorial for good. The local flag lands first so the
    // rail and the masks release on this click rather than a round trip
    // later, and so the exit survives a reload even if the request below
    // never gets through - being unable to reach the server is not a reason
    // to stay trapped. The server call is what makes it stick across devices.
    function skipTutorial(courseId) {
        localStorage.setItem(SKIP_KEY, courseId);
        evaluate(readCachedProfile());
        window.PolytypeFirebase?.skipTutorial?.().catch(() => {
            // Best-effort: the local flag above already freed the player, and
            // the next successful profile sync will report the tutorial as
            // over anyway once this lands.
        });
    }

    // A signed-in player with zero courses has nothing to do anywhere else
    // in the app yet - languages.html is the only page that gets them one
    // (and, for their first ever course, is what starts the tutorial via
    // api/start-course.js). Without this, a brand-new signup just landed on
    // Home with no course, no picker, and no tutorial - see the pages that
    // implicitly create a "chinese" course as a side effect of saving a
    // session (js/main.js's populateLanguageSelect fallback +
    // api/complete-practice-session.js) for how that happened.
    //
    // profile.courses is only ever `undefined` before the very first
    // ensure-user-profile.js response has synced into localStorage
    // (js/firebase-client.js's syncProfileToLocalStorage always sets a real,
    // possibly-empty, object) - checking for the key's presence, not just
    // truthiness, is what keeps this from misfiring during that load window
    // for a *returning* player who does have courses. Guests are
    // intentionally exempt (isSignedIn() false) - the "just start playing"
    // path is how the app lets someone try it before creating an account.
    function shouldForceLanguagePicker(profile) {
        if (!window.PolytypeFirebase?.isSignedIn?.()) return false;
        if (!profile?.courses) return false;
        if (Object.keys(profile.courses).length > 0) return false;
        return getCurrentPage() !== "languages.html";
    }

    // Runs one step earlier than the language picker above: a signed-in
    // account that has never set a username AND has no courses yet is a
    // brand-new signup that still needs to say who they are, so it's sent to
    // onboarding.html (full name + username) before anything else. The
    // no-courses guard keeps pre-existing players (who may also lack a
    // handle) out of this - they already know the app and aren't "new". Once
    // onboarding sets a handle, this returns false and the language-picker
    // gate takes over. Same profile.courses-presence check as above ensures
    // the profile has actually loaded before deciding.
    function shouldForceOnboarding(profile) {
        if (!window.PolytypeFirebase?.isSignedIn?.()) return false;
        if (!profile?.courses) return false;
        if (profile.handle) return false;
        if (Object.keys(profile.courses).length > 0) return false;
        return getCurrentPage() !== "onboarding.html";
    }

    function evaluate(profile) {
        const tutorial = isTutorialSkipped(profile?.tutorial) ? null : profile?.tutorial;
        clearStepUi();

        const currentPage = getCurrentPage();
        // A step this script has no page for (a newer server-side step, a
        // half-written one) can't be drawn or redirected to, so it isn't
        // treated as a running step at all below - locking the rail for one
        // would leave it dead with nothing on screen to explain why.
        const expectedPage = tutorial?.active ? STEP_PAGES[tutorial.step] : null;
        const isStuck = isStuckOnBuyKeys(profile, tutorial);

        // Clicking a nav tab/logo mid-tutorial used to navigate away and
        // then immediately get bounced back by the redirect below - a
        // jarring flash for a click that was never going to work anyway.
        // `inert` makes the whole rail genuinely unclickable and
        // untabbable (same "not just dimmed" reasoning as showBuyKeysCoach
        // below), not just visually disabled - #app-bottom-nav is the one
        // persistent shell element the router never replaces, so this
        // stays correctly set across every soft navigation without needing
        // to be re-applied per page.
        //
        // A step that can no longer be completed hands the rail straight
        // back (see isStuckOnBuyKeys): holding someone on a page whose only
        // control is disabled would brick the app outright.
        const navEl = document.getElementById("app-bottom-nav");
        if (navEl) navEl.inert = Boolean(expectedPage) && !isStuck;

        // Onboarding comes before the language picker (and before any
        // tutorial step). onboarding.html isn't a router page - it has its
        // own script set, not the app shell - so this always uses a full
        // page load, never the soft router.navigate the gates below can use.
        if (shouldForceOnboarding(profile)) {
            window.location.href = "onboarding.html";
            return;
        }

        if (shouldForceLanguagePicker(profile)) {
            // Same hard-vs-soft redirect reasoning as the tutorial step
            // redirect below.
            if (hasEvaluatedOnce && window.PolytypeRouter?.navigate) window.PolytypeRouter.navigate("languages.html");
            else window.location.href = "languages.html";
            return;
        }

        if (!expectedPage) {
            hasEvaluatedOnce = true;
            return;
        }

        // Keeps the player "on rails": manually navigating away from the
        // page the current step needs sends them right back. On a genuine
        // hard page load landing directly on the wrong page (e.g. an old
        // bookmark), this file's own <script> tag runs before that page's
        // *own* script tag does - a soft (router) redirect kicks off an
        // async fetch that can resolve and swap <main> out from under that
        // still-about-to-run script, which then queries for elements that
        // no longer exist. Once this file has evaluated at least once
        // (meaning the page we're currently on already finished its own
        // init - either the hard load completed normally, or the router
        // itself is calling us after loadPageScripts already ran), that
        // race is gone and the instant router redirect is safe to use.
        //
        // Skipped while the step is stuck, for the same reason the rail is
        // handed back up there: sending someone back to a step they can no
        // longer finish is the trap itself. They keep the run of the app,
        // and the step's own page still offers them the way out.
        if (expectedPage !== currentPage) {
            if (isStuck) {
                hasEvaluatedOnce = true;
                return;
            }
            if (hasEvaluatedOnce && window.PolytypeRouter?.navigate) window.PolytypeRouter.navigate(expectedPage);
            else window.location.href = expectedPage;
            return;
        }

        hasEvaluatedOnce = true;

        const courseId = getTutorialCourseId(tutorial);

        if (tutorial.step === "deck-intro") showDeckIntro();
        else if (tutorial.step === "buy-keys") showBuyKeysCoach(profile, courseId, isStuck);
        else if (tutorial.step === "choose-words") showChooseWordsBanner(profile, courseId);
        else if (tutorial.step === "play-sprint") showPlaySprintBanner();
    }

    // Step 1: deck-intro - pure explainer, nothing to spend/choose yet.
    function showDeckIntro() {
        const overlay = document.createElement("div");
        overlay.id = "tutorial-intro-overlay";
        overlay.className = "timer-modal";
        overlay.innerHTML = `
            <div class="timer-modal-backdrop"></div>
            <div class="timer-modal-card">
                <span class="result-label">${tr("tutorial.deckIntroKicker")}</span>
                <strong class="result-score-text" style="font-size:20px;text-align:center">${tr("tutorial.deckIntroTitle")}</strong>
                <span class="result-detail-text">${tr("tutorial.deckIntroBody")}</span>
                <button id="tutorial-deck-intro-btn" class="restart-btn" type="button">${tr("tutorial.deckIntroCta")}</button>
            </div>
        `;
        document.body.appendChild(overlay);

        const btn = document.getElementById("tutorial-deck-intro-btn");
        btn.addEventListener("click", async () => {
            btn.disabled = true;
            try {
                await window.PolytypeFirebase?.advanceTutorial?.();
            } catch {
                // Best-effort - if this fails the player just sees the same
                // intro again on next load, no data lost either way.
            }
            if (window.PolytypeRouter?.navigate) window.PolytypeRouter.navigate("shop.html");
            else window.location.href = "shop.html";
        });
    }

    // Step 2: buy-keys - hard spotlight. The tutorial's 500 gifted coins
    // cover exactly 5 keys (100 each); accidentally buying a word chest
    // instead (also 100 coins) would strand the player short, so everything
    // except the Key card is genuinely unclickable here, not just dimmed.
    function showBuyKeysCoach(profile, courseId, isStuck) {
        const target = document.getElementById("shop-buy-btn")?.closest(".settings-card");
        if (!target) return;

        const purchasedKeys = Math.max(0, Math.trunc(Number(profile?.courses?.[courseId]?.purchasedKeys) || 0));
        spotlightHandle = spotlightElement(target, {
            title: tr("tutorial.buyKeysTitle"),
            // Out of coins short of 5 keys: the card being spotlighted is a
            // disabled button, so the tooltip says why and offers the exit
            // instead of repeating an instruction that can't be followed.
            body: isStuck
                ? tr("tutorial.buyKeysStuckBody", { count: purchasedKeys })
                : tr("tutorial.buyKeysBody", { count: purchasedKeys }),
            action: isStuck
                ? { label: tr("tutorial.skipCta"), onClick: () => skipTutorial(courseId) }
                : null
        });
    }

    // Step 3: choose-words - soft banner only. Any locked card is a valid
    // choice (that's the point - the player picks whatever they like), so
    // there's no single element to spotlight.
    function showChooseWordsBanner(profile, courseId) {
        const unlockedCount = profile?.courses?.[courseId]?.unlockedWords?.length || 0;
        showBanner(tr("tutorial.chooseWordsBanner", { count: Math.min(5, unlockedCount) }));
    }

    // Step 4: play-sprint - just a reminder banner; Sprint's own flow
    // already auto-starts, and completion is detected server-side (see
    // api/complete-practice-session.js), not by this script. Auto-hides
    // shortly after appearing - once the round is actually under way it's
    // the timer/word/input that need the player's attention and the screen
    // space, not a reminder they've already read.
    const PLAY_SPRINT_BANNER_HIDE_MS = 8000;

    function showPlaySprintBanner() {
        showBanner(tr("tutorial.playSprintBanner"), { autoHideMs: PLAY_SPRINT_BANNER_HIDE_MS });
    }

    function showBanner(text, { autoHideMs = null } = {}) {
        const banner = document.createElement("div");
        banner.id = "tutorial-banner";
        banner.className = "tutorial-banner";
        banner.textContent = text;
        document.body.appendChild(banner);

        if (autoHideMs) {
            // Fades out rather than popping away - matches the "is-dismissing"
            // fade timing js/chest.js uses for its own tapped-card cleanup.
            window.setTimeout(() => {
                banner.classList.add("is-hiding");
                window.setTimeout(() => banner.remove(), 260);
            }, autoHideMs);
        }
    }

    // Generic 4-rectangle spotlight: dims everything except `target`'s own
    // rect, which stays genuinely clickable since no overlay element
    // actually covers it (not a visual-only cutout). position:fixed
    // throughout, so coordinates are viewport-relative and get recomputed
    // on resize/scroll rather than needing scroll-offset math.
    function spotlightElement(target, { title, body, action = null }) {
        target.scrollIntoView({ behavior: "smooth", block: "center" });

        const nodes = {
            top: makeNode("tutorial-mask"),
            bottom: makeNode("tutorial-mask"),
            left: makeNode("tutorial-mask"),
            right: makeNode("tutorial-mask"),
            ring: makeNode("tutorial-ring"),
            tooltip: makeNode("tutorial-tooltip")
        };
        nodes.tooltip.innerHTML = `<strong>${title}</strong><p>${body}</p>`;
        // The tooltip outranks the masks (z-index 9002 vs 9000, see
        // style.css) so a button placed in it is genuinely clickable even
        // though everything around it is covered.
        if (action) {
            const actionBtn = document.createElement("button");
            actionBtn.type = "button";
            actionBtn.className = "tutorial-tooltip-btn";
            actionBtn.textContent = action.label;
            actionBtn.addEventListener("click", action.onClick);
            nodes.tooltip.appendChild(actionBtn);
        }
        Object.values(nodes).forEach(node => document.body.appendChild(node));

        function makeNode(className) {
            const node = document.createElement("div");
            node.className = className;
            return node;
        }

        function place(node, left, top, width, height) {
            node.style.cssText = `left:${left}px;top:${top}px;width:${width}px;height:${height}px;`;
        }

        function reposition() {
            const rect = target.getBoundingClientRect();
            const vw = window.innerWidth;
            const vh = window.innerHeight;

            place(nodes.top, 0, 0, vw, Math.max(0, rect.top));
            place(nodes.bottom, 0, rect.bottom, vw, Math.max(0, vh - rect.bottom));
            place(nodes.left, 0, rect.top, Math.max(0, rect.left), rect.height);
            place(nodes.right, rect.right, rect.top, Math.max(0, vw - rect.right), rect.height);

            nodes.ring.style.cssText = `left:${rect.left - 4}px;top:${rect.top - 4}px;width:${rect.width + 8}px;height:${rect.height + 8}px;`;

            const tooltipLeft = Math.max(12, Math.min(rect.left, vw - 300));
            // Measured rather than a fixed reserve: the tooltip is taller
            // when it carries an action button, and guessing low is what
            // would push that button off the bottom of the screen - the one
            // control the player needs when this branch is showing at all.
            const tooltipHeight = nodes.tooltip.offsetHeight || 140;
            const tooltipTop = Math.max(12, Math.min(rect.bottom + 12, vh - tooltipHeight - 12));
            nodes.tooltip.style.cssText = `left:${tooltipLeft}px;top:${tooltipTop}px;`;
        }

        reposition();
        window.addEventListener("resize", reposition);
        window.addEventListener("scroll", reposition, true);

        return {
            destroy() {
                window.removeEventListener("resize", reposition);
                window.removeEventListener("scroll", reposition, true);
                Object.values(nodes).forEach(node => node.remove());
            }
        };
    }

    function init() {
        evaluate(readCachedProfile());
        // Registered once here, not through window.__polytypePageHooks (see
        // js/router.js) - this file is a shell script loaded once for the
        // whole session, never re-injected per page, so unlike a
        // page-specific script this direct listener never needs resetting.
        document.addEventListener("polytype-profile-updated", event => {
            evaluate(event?.detail || readCachedProfile());
        });
    }

    window.PolytypeTutorial = {
        // A soft navigation (js/router.js) doesn't fire polytype-profile-
        // updated on its own, so the router calls this directly after every
        // page swap to re-run the same "is a tutorial active, does it match
        // the page I just landed on" check.
        evaluate: () => evaluate(readCachedProfile())
    };

    // No DOMContentLoaded wait needed: this script tag is placed after all
    // the DOM it reads (same reasoning as js/app-shell.js).
    init();
})();
