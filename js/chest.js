(function () {
    function tr(key, params) {
        return window.PolytypeI18n?.t?.(key, params) || key;
    }

    window.PolytypeChest = { open };

    function open() {
        const overlay = document.createElement("div");
        overlay.className = "chest-overlay";
        overlay.innerHTML = `
            <div class="chest-overlay-art">
                <div class="chest-overlay-rays"></div>
                <div class="chest-overlay-flash"></div>
                <svg class="chest-overlay-icon" width="130" height="130" viewBox="0 0 48 48">
                    <rect x="6" y="20" width="36" height="20" rx="4" fill="#8b6cff"/>
                    <path d="M6 22a18 12 0 0 1 36 0z" fill="#a084ff"/>
                    <rect x="6" y="25" width="36" height="4" fill="#6b4dff"/>
                    <rect x="21" y="23" width="6" height="9" rx="2" fill="#ffc73a"/>
                </svg>
            </div>
            <div class="chest-overlay-title">${tr("chest.title")}</div>
            <div class="chest-overlay-rewards">
                <div class="chest-reward-chip is-coin">
                    <svg width="20" height="20" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#ffc73a"/><circle cx="12" cy="12" r="6.5" fill="none" stroke="#d99a1c" stroke-width="2"/></svg>
                    <span id="chest-coin-reward">+50</span>
                </div>
                <div class="chest-reward-chip is-xp">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#2fe6a4"><path d="M12 2l2.9 6.2 6.6.7-4.9 4.5 1.3 6.6L12 17.8 6.1 20.6l1.3-6.6L2.5 8.9l6.6-.7z"/></svg>
                    <span id="chest-xp-reward">+20 XP</span>
                </div>
            </div>
            <button class="chest-collect-btn" type="button">${tr("chest.collect")}</button>
        `;
        document.body.append(overlay);

        return new Promise(resolve => {
            const collectBtn = overlay.querySelector(".chest-collect-btn");
            collectBtn.addEventListener("click", async () => {
                collectBtn.disabled = true;
                try {
                    // Reward coins land on whichever language is currently
                    // selected (see api/claim-daily-chest.js) - coins are
                    // per-language, unlike the chest claim itself which
                    // stays one-per-day for the whole account.
                    const courseId = localStorage.getItem("polytype-language") || "chinese";
                    const reward = await window.PolytypeGameState.claimDailyChest(courseId);
                    if (reward) {
                        overlay.querySelector("#chest-coin-reward").textContent = `+${reward.coinsEarned}`;
                        overlay.querySelector("#chest-xp-reward").textContent = `+${reward.xpEarned} XP`;
                    }
                } catch {
                    // Already claimed elsewhere/expired: still dismiss gracefully.
                } finally {
                    overlay.remove();
                    resolve();
                }
            });
        });
    }
})();
