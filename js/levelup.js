// Shared level-up celebration.
//
// js/main.js has its own near-identical copy for the Trainer's *course*
// level, wired into that file's combo palette and sfx helpers. This one is
// standalone so any page can fire it - today the Sprint's end-of-game XP
// burst (see playXpGain in js/app-shell.js), which celebrates the *global*
// level the header's pill tracks. Both drive the same .levelup-* CSS.
(function () {
    if (window.PolytypeLevelUp) return;

    const CONFETTI_PIECES = 22;
    const CONFETTI_COLORS = [
        "var(--accent)",
        "var(--success, var(--accent))",
        "var(--color-gold-text, #ffc73a)",
        "var(--color-secondary, #17b8c9)",
        "var(--color-streak, #f2452f)"
    ];

    function tr(key, params = {}) {
        return window.PolytypeI18n?.t?.(key, params) || key;
    }

    function prefersReducedMotion() {
        return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches === true;
    }

    // Resolves once the overlay is gone, so a caller can sequence whatever
    // comes next behind it.
    function show(level) {
        return new Promise(resolve => {
            document.querySelector(".levelup-overlay")?.remove();

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
            const badgeStar = document.createElement("span");
            badgeStar.className = "levelup-badge-star";
            badgeStar.textContent = "★";
            const badgeLevel = document.createElement("span");
            badgeLevel.className = "levelup-badge-level";
            badgeLevel.textContent = String(level);
            badge.append(badgeStar, badgeLevel);

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

            if (!prefersReducedMotion()) {
                const confetti = document.createElement("div");
                confetti.className = "levelup-confetti";
                for (let i = 0; i < CONFETTI_PIECES; i += 1) {
                    const piece = document.createElement("span");
                    piece.className = "levelup-confetti-piece";
                    piece.style.setProperty("--x", `${(Math.random() * 2 - 1) * 42}vw`);
                    piece.style.setProperty("--r", `${Math.random() * 720 - 360}deg`);
                    piece.style.setProperty("--delay", `${Math.random() * 0.25}s`);
                    piece.style.setProperty("--dur", `${1.1 + Math.random() * 0.9}s`);
                    piece.style.left = `${48 + Math.random() * 4}%`;
                    piece.style.background = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
                    confetti.appendChild(piece);
                }
                overlay.appendChild(confetti);
            }

            overlay.appendChild(card);
            document.body.appendChild(overlay);
            confirmBtn.focus?.();
        });
    }

    window.PolytypeLevelUp = { show };
})();
