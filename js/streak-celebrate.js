// Shared daily-streak celebration - the "your flame just went up" moment.
//
// Fires at most once a day, from whichever game happens to finish the first
// session: the server decides, and hands back `streak.streakAdvanced` (see
// calculateStreakUpdate in api/_lib.js). Every game page loads this file and
// passes that block straight through, so no game has to know when the streak
// moved or how the animation works - same standalone-module shape as
// js/levelup.js and js/mission-celebrate.js.
(function () {
    if (window.PolytypeStreakCelebrate) return;

    function tr(key, params = {}) {
        return window.PolytypeI18n?.t?.(key, params) || key;
    }

    function prefersReducedMotion() {
        return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches === true;
    }

    // ── Fire ─────────────────────────────────────────────────────────────
    // Starts with the flame's own entrance (streak-flame-in, style.css), so
    // it's the sound of the flame arriving rather than a cue played over it.
    // Loaded up front for that reason - a crackle that shows up after the
    // flame has landed is just noise. Cloned per play and gated on the shared
    // mute flag js/settings.js owns, same as every other sfx in the app.
    const FIRE_SFX_URL = "assets/sfx/fire.mp3";
    const FIRE_SFX_VOLUME = 0.35;
    const fireSfx = new Audio(FIRE_SFX_URL);
    fireSfx.preload = "auto";
    fireSfx.volume = FIRE_SFX_VOLUME;

    function isSfxMuted() {
        try {
            return localStorage.getItem("polytype-sfx-muted") === "true";
        } catch {
            return false;
        }
    }

    function playFireSfx() {
        if (isSfxMuted()) return;
        try {
            const audio = fireSfx.cloneNode();
            audio.volume = FIRE_SFX_VOLUME;
            audio.play().catch(() => {});
        } catch {
            // Browsers may block audio until the first user gesture.
        }
    }

    const EMBER_COUNT = 16;
    const EMBER_COLORS = ["#ffd268", "#ff9f1c", "#f2452f", "#ff6a52"];

    // The gradient id is document-global, so two overlays alive at once would
    // have the second one's <defs> shadow the first's. show() removes any
    // previous overlay before appending, which is what keeps that from ever
    // happening - keep that removal if this markup is reused elsewhere.
    const FLAME_SVG = `
        <svg class="streak-overlay-flame" width="180" height="180" viewBox="0 0 24 24" aria-hidden="true">
            <defs>
                <linearGradient id="streak-flame-grad" x1="0" y1="1" x2="0" y2="0">
                    <stop offset="0" stop-color="#d92b17"/>
                    <stop offset="0.42" stop-color="#f2452f"/>
                    <stop offset="0.78" stop-color="#ff9f1c"/>
                    <stop offset="1" stop-color="#ffd268"/>
                </linearGradient>
            </defs>
            <path d="M12 1.6C13 5 15.4 6.6 17 8.6c1.5 1.9 2.3 3.8 2.3 5.9a7.3 7.3 0 0 1-14.6 0c0-2.3 1-4.4 2.8-6.2-.1 1.2.2 2.2.8 3C7.6 7.6 9.6 4.6 12 1.6z" fill="url(#streak-flame-grad)"/>
        </svg>
    `;

    const CHECK_SVG =
        '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13l4 4L19 7"/></svg>';

    // Monday-first, which is what both locales this app ships in expect.
    // Date#getDay is Sunday-first, hence the shift.
    function getTodayWeekIndex() {
        return (new Date().getDay() + 6) % 7;
    }

    // The server returns the streak's *length*, never a per-day history, so
    // which days of this week are lit is derived from it: walking back from
    // today, a day was practised for as long as it's still inside the streak.
    // That's exact rather than a guess - an unbroken run is what a streak is.
    function buildWeek(streak) {
        const todayIndex = getTodayWeekIndex();
        return tr("streak.weekdays").split(",").map((letter, index) => ({
            letter: letter.trim(),
            done: index <= todayIndex && todayIndex - index < streak,
            today: index === todayIndex
        }));
    }

    // By the time the overlay is dismissed the header pill already shows the
    // new number (js/app-shell.js repaints it from the profile update the save
    // triggered), so all that's left is to point at it as the overlay clears -
    // the eye follows from the big flame straight to the small one.
    //
    // The demo path has no real change behind it, so the count is swapped in
    // for the length of the pop and put back afterwards. Same idea as the demo
    // chest's `keepHeld` in js/app-shell.js: show the player what the moment
    // will look like without pretending anything was granted.
    function pulseHeaderStreak(streak, demo) {
        const pill = document.getElementById("app-shell-streak");
        if (!pill) return;

        // The pill is rendered as `<svg/>N`, so the count is its trailing text
        // node and can be swapped without rebuilding markup app-shell.js owns.
        const countNode = pill.lastChild;
        const restoreTo = demo && countNode?.nodeType === Node.TEXT_NODE ? countNode.nodeValue : null;
        if (restoreTo !== null) countNode.nodeValue = String(streak);

        // Remove/reflow/re-add restarts the CSS animation on a pill that has
        // very likely popped before (same trick as revealResultReward in
        // js/sprint.js).
        pill.classList.remove("streak-pop-big");
        void pill.offsetWidth;
        pill.classList.add("streak-pop-big");

        window.setTimeout(() => {
            pill.classList.remove("streak-pop-big");
            if (restoreTo !== null) countNode.nodeValue = restoreTo;
        }, 900);
    }

    // `streakInfo` is api/complete-practice-session.js's own `streak` block,
    // passed through untouched. A day that didn't move the flame resolves
    // immediately, so call sites stay a single unconditional line.
    //
    // Resolves once the overlay is gone, so a caller can queue the mission and
    // badge celebrations behind it.
    function show(streakInfo, { demo = false } = {}) {
        const streak = Number(streakInfo?.currentStreak) || 0;
        if (!streakInfo?.streakAdvanced || streak < 1) return Promise.resolve();

        // A streak that reset counts today as day one of a new run, so the
        // roll climbs out of 0 rather than off the broken run's old total.
        const previousStreak = streakInfo.streakReset ? 0 : streak - 1;

        return new Promise(resolve => {
            document.querySelector(".streak-overlay")?.remove();

            const overlay = document.createElement("div");
            overlay.className = "streak-overlay";
            overlay.setAttribute("role", "dialog");
            overlay.setAttribute("aria-modal", "true");

            overlay.innerHTML = `
                <div class="streak-overlay-art">
                    <div class="streak-overlay-rays"></div>
                    <div class="streak-overlay-glow"></div>
                    <div class="streak-overlay-flash"></div>
                    ${FLAME_SVG}
                    <div class="streak-embers"></div>
                    <div class="streak-count" aria-live="polite">
                        <span class="streak-count-prev"></span>
                        <span class="streak-count-next"></span>
                    </div>
                </div>
                <div class="streak-overlay-title"></div>
                <div class="streak-overlay-subtitle"></div>
                <div class="streak-week"></div>
                <button class="streak-continue-btn" type="button"></button>
            `;

            overlay.querySelector(".streak-count-prev").textContent = String(previousStreak);
            overlay.querySelector(".streak-count-next").textContent = String(streak);
            overlay.querySelector(".streak-overlay-title").textContent = streak === 1
                ? tr("streak.celebrateFirstTitle")
                : tr("streak.celebrateTitle", { count: streak });
            overlay.querySelector(".streak-overlay-subtitle").textContent = tr("streak.celebrateSubtitle");
            overlay.querySelector(".streak-continue-btn").textContent = tr("streak.celebrateContinue");

            const week = overlay.querySelector(".streak-week");
            week.replaceChildren(...buildWeek(streak).map(day => {
                const cell = document.createElement("div");
                cell.className = `streak-week-day${day.done ? " is-done" : ""}${day.today ? " is-today" : ""}`;
                cell.innerHTML = `
                    <span class="streak-week-letter"></span>
                    <span class="streak-week-dot">${day.done ? CHECK_SVG : ""}</span>
                `;
                cell.querySelector(".streak-week-letter").textContent = day.letter;
                return cell;
            }));

            // Skipped rather than hidden in CSS under reduced motion: the
            // embers are the one part of this that exists only to move, so
            // there's no reason to put 16 dead nodes in the document.
            if (!prefersReducedMotion()) {
                const embers = overlay.querySelector(".streak-embers");
                for (let i = 0; i < EMBER_COUNT; i += 1) {
                    const ember = document.createElement("span");
                    ember.className = "streak-ember";
                    ember.style.setProperty("--x", `${(Math.random() * 2 - 1) * 62}px`);
                    ember.style.setProperty("--delay", `${Math.random() * 1.6}s`);
                    ember.style.setProperty("--dur", `${1.4 + Math.random() * 1.1}s`);
                    ember.style.setProperty("--size", `${4 + Math.random() * 5}px`);
                    ember.style.background = EMBER_COLORS[i % EMBER_COLORS.length];
                    ember.style.left = `${44 + Math.random() * 12}%`;
                    embers.appendChild(ember);
                }
            }

            const continueBtn = overlay.querySelector(".streak-continue-btn");

            let closed = false;
            continueBtn.addEventListener("click", () => {
                if (closed) return;
                closed = true;

                overlay.classList.add("is-leaving");
                pulseHeaderStreak(streak, demo);

                // Matches .streak-overlay.is-leaving's duration in style.css,
                // so the header pop happens against a fading overlay instead
                // of after a hard cut.
                window.setTimeout(() => {
                    overlay.remove();
                    resolve();
                }, 280);
            });

            // Sound and first frame in the same tick: every animation on this
            // overlay is timed from the moment it lands in the document.
            playFireSfx();
            document.body.append(overlay);
            continueBtn.focus?.();
        });
    }

    window.PolytypeStreakCelebrate = { show };
})();
