// Shared level-up celebration.
//
// js/main.js has its own near-identical copy for the Trainer's *course*
// level, wired into that file's combo palette and sfx helpers. This one is
// standalone so any page can fire it - today the Sprint's end-of-game XP
// burst (see playXpGain in js/app-shell.js), which celebrates the *global*
// level the header's pill tracks. Both drive the same .levelup-* CSS.
(function () {
    if (window.PolytypeLevelUp) return;

    const SPARK_COUNT = 14;
    // Gold-heavy on purpose - the sparks are the "you won something" beat,
    // and gold says that faster than the old five-colour confetti mix did.
    const SPARK_COLORS = [
        "var(--color-gold-text, #ffd268)",
        "#ffffff",
        "var(--accent)",
        "var(--color-gold, #ffc73a)"
    ];

    // Radial burst fired from behind the badge as its entrance spring
    // settles - the timing continues .levelup-card's cascade (style.css),
    // which is also where --a/--d/--s/--delay are consumed. Angles are dealt
    // evenly with a little jitter, so the circle always reads full but never
    // mechanical.
    function buildSparkBurst() {
        const burst = document.createElement("div");
        burst.className = "levelup-burst";
        for (let i = 0; i < SPARK_COUNT; i += 1) {
            const spark = document.createElement("span");
            spark.className = "levelup-burst-spark";
            spark.style.setProperty("--a", `${Math.round((360 / SPARK_COUNT) * i + (Math.random() * 20 - 10))}deg`);
            spark.style.setProperty("--d", `${112 + Math.round(Math.random() * 68)}px`);
            spark.style.setProperty("--s", `${5 + Math.round(Math.random() * 4)}px`);
            spark.style.setProperty("--delay", `${500 + Math.round(Math.random() * 150)}ms`);
            spark.style.background = SPARK_COLORS[i % SPARK_COLORS.length];
            burst.appendChild(spark);
        }
        return burst;
    }

    function tr(key, params = {}) {
        return window.PolytypeI18n?.t?.(key, params) || key;
    }

    function prefersReducedMotion() {
        return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches === true;
    }

    // ── Fanfare ──────────────────────────────────────────────────────────
    // Loaded up front rather than on the first level-up: this file is on every
    // page that can level up, the clip is small, and a sound that arrives
    // after its own animation isn't the sound of levelling up. Cloned per play
    // and gated on the same shared mute flag every game reads (js/settings.js
    // owns the toggle) - identical shape to js/main.js's sfx helpers.
    const LEVEL_UP_SFX_URL = "assets/sfx/new-level.mp3";
    const LEVEL_UP_SFX_VOLUME = 0.4;
    const levelUpSfx = new Audio(LEVEL_UP_SFX_URL);
    levelUpSfx.preload = "auto";
    levelUpSfx.volume = LEVEL_UP_SFX_VOLUME;

    function isSfxMuted() {
        try {
            return localStorage.getItem("polytype-sfx-muted") === "true";
        } catch {
            return false;
        }
    }

    function playLevelUpSfx() {
        if (isSfxMuted()) return;
        try {
            const audio = levelUpSfx.cloneNode();
            audio.volume = LEVEL_UP_SFX_VOLUME;
            audio.play().catch(() => {});
        } catch {
            // Browsers may block audio until the first user gesture.
        }
    }

    // Resolves once the overlay is gone, so a caller can sequence whatever
    // comes next behind it.
    function show(level) {
        return new Promise(resolve => {
            document.querySelector(".levelup-overlay")?.remove();
            playLevelUpSfx();

            const overlay = document.createElement("div");
            // is-scrimmed, unlike js/main.js's copy: that one lands on the
            // Trainer's own quiet screen, this one lands on top of a busy
            // result card that would otherwise read straight through the
            // title.
            overlay.className = "levelup-overlay is-scrimmed";
            overlay.setAttribute("role", "dialog");
            overlay.setAttribute("aria-modal", "true");

            const card = document.createElement("div");
            card.className = "levelup-card";

            const rays = document.createElement("div");
            rays.className = "levelup-rays";

            const badge = document.createElement("div");
            badge.className = "levelup-badge";
            const badgeLevel = document.createElement("span");
            badgeLevel.className = "levelup-badge-level";
            badgeLevel.textContent = String(level);
            badge.append(badgeLevel);

            const title = document.createElement("div");
            title.className = "levelup-title";
            title.textContent = tr("trainer.levelUp");

            const sub = document.createElement("div");
            sub.className = "levelup-sub";
            sub.textContent = tr("trainer.levelReached", { level });

            const confirmBtn = document.createElement("button");
            confirmBtn.type = "button";
            confirmBtn.className = "levelup-confirm-btn";
            confirmBtn.textContent = tr("trainer.gotIt");

            let closed = false;
            function close() {
                if (closed) return;
                closed = true;
                overlay.classList.add("is-leaving");
                window.setTimeout(() => {
                    overlay.remove();
                    resolve();
                }, 480);
            }

            confirmBtn.addEventListener("click", close);

            card.append(rays, badge, title, sub, confirmBtn);

            // Before the badge in the DOM, so the sparks paint underneath it
            // and the burst emerges from behind the rim instead of flying
            // across the level number.
            if (!prefersReducedMotion()) {
                card.insertBefore(buildSparkBurst(), badge);
            }

            overlay.appendChild(card);
            document.body.appendChild(overlay);
            confirmBtn.focus?.();
        });
    }

    window.PolytypeLevelUp = { show };
})();
