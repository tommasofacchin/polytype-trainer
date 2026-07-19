(function () {
    function tr(key, params) {
        return window.PolytypeI18n?.t?.(key, params) || key;
    }

    window.PolytypeChest = { open };

    // Fixed, so a replay always looks the same and is easy to compare against
    // the real thing.
    const DEMO_REWARD = { coinsEarned: 50, xpEarned: 20 };

    const CHEST_SVG = `
        <svg class="chest-overlay-icon" width="130" height="130" viewBox="0 0 48 48">
            <rect x="6" y="20" width="36" height="20" rx="4" fill="#8b6cff"/>
            <path d="M6 22a18 12 0 0 1 36 0z" fill="#a084ff"/>
            <rect x="6" y="25" width="36" height="4" fill="#6b4dff"/>
            <rect x="21" y="23" width="6" height="9" rx="2" fill="#ffc73a"/>
        </svg>
    `;

    const COIN_SVG =
        '<svg width="34" height="34" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#ffc73a"/><circle cx="12" cy="12" r="6.5" fill="none" stroke="#d99a1c" stroke-width="2"/></svg>';

    const XP_SVG =
        '<svg width="32" height="32" viewBox="0 0 24 24" fill="#2fe6a4"><path d="M12 2l2.9 6.2 6.6.7-4.9 4.5 1.3 6.6L12 17.8 6.1 20.6l1.3-6.6L2.5 8.9l6.6-.7z"/></svg>';

    function prefersReducedMotion() {
        return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches === true;
    }

    function readCachedXp() {
        try {
            return JSON.parse(localStorage.getItem("polytype-profile"))?.xp || 0;
        } catch {
            return 0;
        }
    }

    // One tap resolves the next step of the sequence. Bound on the overlay
    // itself rather than the item, so anywhere on screen advances - the
    // Clash Royale behaviour, and far easier to hit than a small card.
    function waitForTap(overlay) {
        return new Promise(resolve => {
            const handler = () => {
                overlay.removeEventListener("click", handler);
                resolve();
            };
            overlay.addEventListener("click", handler);
        });
    }

    // Coins and XP are what the daily chest actually contains (see
    // CHEST_COIN_REWARD / CHEST_XP_REWARD in api/_lib.js). Badges can also
    // come back on a claim, but those have their own celebration
    // (PolytypeBadgeCelebrate), so they're deliberately not duplicated here.
    function buildItems(reward) {
        const items = [];

        if (Number(reward?.coinsEarned) > 0) {
            items.push({
                kind: "coin",
                icon: COIN_SVG,
                amount: `+${reward.coinsEarned}`,
                label: tr("chest.itemCoins")
            });
        }

        if (Number(reward?.xpEarned) > 0) {
            items.push({
                kind: "xp",
                icon: XP_SVG,
                amount: `+${reward.xpEarned} XP`,
                label: tr("chest.itemXp")
            });
        }

        return items;
    }

    function buildChip(item) {
        const chip = document.createElement("div");
        chip.className = `chest-reward-chip is-${item.kind}`;
        chip.innerHTML = item.icon;
        const span = document.createElement("span");
        span.textContent = item.amount;
        chip.append(span);
        return chip;
    }

    // `demo: true` runs the whole sequence against a canned reward: no claim
    // request, no XP or coins actually granted, and the header's level bar
    // eases back to its true value when the overlay closes. Purely for
    // previewing the animation - see the debug chest in js/dashboard.js.
    async function open({ demo = false } = {}) {
        const overlay = document.createElement("div");
        overlay.className = `chest-overlay is-closed${demo ? " is-demo" : ""}`;
        overlay.innerHTML = `
            <div class="chest-overlay-art">
                <div class="chest-overlay-rays"></div>
                <div class="chest-overlay-flash"></div>
                ${CHEST_SVG}
            </div>
            <div class="chest-overlay-title">${demo ? tr("chest.demoTitle") : tr("chest.title")}</div>
            <div class="chest-item-stage" aria-live="polite"></div>
            <div class="chest-hint">${tr("chest.tapToOpen")}</div>
            <div class="chest-collected"></div>
        `;
        document.body.append(overlay);

        const art = overlay.querySelector(".chest-overlay-art");
        const stage = overlay.querySelector(".chest-item-stage");
        const hint = overlay.querySelector(".chest-hint");
        const collected = overlay.querySelector(".chest-collected");

        function close() {
            overlay.remove();
        }

        // ── Tap 1: open the chest, which is also when the claim goes out ──
        await waitForTap(overlay);

        overlay.classList.remove("is-closed");
        overlay.classList.add("is-opening");
        hint.textContent = "";

        // Freeze the header's XP bar before the claim lands, so the gain can
        // be animated on the XP item's reveal instead of snapping the moment
        // the response arrives (same contract the sprint result screen uses).
        window.PolytypeAppShell?.holdXpDisplay?.();

        let reward = null;

        if (demo) {
            // A beat of fake latency, so the opening reads the same as a real
            // claim rather than resolving instantly.
            await new Promise(resolve => window.setTimeout(resolve, 450));
            const currentXp = Number(readCachedXp()) || 0;
            reward = { ...DEMO_REWARD, totalXp: currentXp + DEMO_REWARD.xpEarned };
        } else {
            try {
                // Coins land on whichever language is selected (see
                // api/claim-daily-chest.js) - coins are per-language, unlike
                // the claim itself which is one per day for the whole account.
                const courseId = localStorage.getItem("polytype-language") || "chinese";
                reward = await window.PolytypeGameState.claimDailyChest(courseId);
            } catch {
                // Already claimed elsewhere, or offline: nothing to reveal.
                window.PolytypeAppShell?.releaseXpDisplay?.();
                close();
                return;
            }
        }

        const items = buildItems(reward);
        if (!items.length) {
            window.PolytypeAppShell?.releaseXpDisplay?.();
            close();
            return;
        }

        // ── One tap per item ──────────────────────────────────────────────
        for (let i = 0; i < items.length; i += 1) {
            const item = items[i];

            const card = document.createElement("div");
            card.className = `chest-item-card is-${item.kind}`;
            card.innerHTML = `
                <span class="chest-item-icon">${item.icon}</span>
                <strong class="chest-item-amount"></strong>
                <span class="chest-item-label"></span>
            `;
            card.querySelector(".chest-item-amount").textContent = item.amount;
            card.querySelector(".chest-item-label").textContent = item.label;
            stage.replaceChildren(card);

            const isLast = i === items.length - 1;
            hint.textContent = isLast ? tr("chest.tapToFinish") : tr("chest.tapToContinue");

            // The XP card is where the stars launch from, so the burst reads
            // as the reward itself flying into the bar.
            if (item.kind === "xp" && typeof reward?.totalXp === "number") {
                // In demo mode the profile cache never changed, so letting the
                // burst release would slide the bar straight back down while
                // the overlay is still open. Hold it and release on close.
                window.PolytypeAppShell?.playXpGain?.(reward.totalXp, card, { keepHeld: demo });
            }

            await waitForTap(overlay);

            // Settle the revealed item into the row along the bottom, so by
            // the end every item is on screen together.
            card.classList.add("is-collecting");
            collected.append(buildChip(item));
            if (prefersReducedMotion()) stage.replaceChildren();
        }

        stage.replaceChildren();
        hint.textContent = "";

        // ── Final state: everything revealed, plus a way out ──────────────
        const collectBtn = document.createElement("button");
        collectBtn.type = "button";
        collectBtn.className = "chest-collect-btn";
        collectBtn.textContent = tr("chest.collect");
        overlay.append(collectBtn);

        await new Promise(resolve => {
            collectBtn.addEventListener("click", event => {
                // Otherwise the overlay's own tap handler from a previous
                // step could still be listening and swallow this.
                event.stopPropagation();
                resolve();
            }, { once: true });
        });

        // Any level-up the chest triggered is still animating out of
        // playXpGain above; releasing here is a no-op if it already finished.
        window.PolytypeAppShell?.releaseXpDisplay?.();
        close();
    }
})();
