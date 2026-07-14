(function () {
    function tr(key, params) {
        return window.PolytypeI18n?.t?.(key, params) || key;
    }

    window.PolytypeMissionCelebrate = { show };

    function show(missions) {
        if (!missions || !missions.length) return Promise.resolve();

        document.querySelector(".mission-overlay")?.remove();

        const overlay = document.createElement("div");
        overlay.className = "mission-overlay";

        const title = missions.length > 1 ? tr("mission.completedTitlePlural") : tr("mission.completedTitle");

        overlay.innerHTML = `
            <div class="mission-overlay-art">
                <div class="mission-overlay-rays"></div>
                <div class="mission-overlay-flash"></div>
                <svg class="mission-overlay-icon" width="110" height="110" viewBox="0 0 24 24" fill="none" stroke="#2fe6a4" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M8 21h8"/>
                    <path d="M12 17v4"/>
                    <path d="M7 4h10v5a5 5 0 0 1-10 0z" fill="rgba(47,230,164,0.18)"/>
                    <path d="M7 5H4a3 3 0 0 0 3 3"/>
                    <path d="M17 5h3a3 3 0 0 1-3 3"/>
                </svg>
            </div>
            <div class="mission-overlay-title">${title}</div>
            <div class="mission-overlay-subtitle">${tr("mission.completedSubtitle")}</div>
            <div class="mission-rewards-list"></div>
            <button class="mission-collect-btn" type="button">${tr("mission.nice")}</button>
        `;

        const list = overlay.querySelector(".mission-rewards-list");
        missions.forEach((mission, index) => {
            const row = document.createElement("div");
            row.className = "mission-reward-row";
            row.style.setProperty("--delay", `${0.35 + index * 0.15}s`);
            row.innerHTML = `
                <strong>${tr(mission.labelKey)}</strong>
                <span><svg width="14" height="14" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#ffc73a"/><circle cx="12" cy="12" r="6.5" fill="none" stroke="#d99a1c" stroke-width="2"/></svg>+${mission.coinReward}</span>
            `;
            list.appendChild(row);
        });

        document.body.append(overlay);

        return new Promise(resolve => {
            overlay.querySelector(".mission-collect-btn").addEventListener("click", () => {
                overlay.remove();
                resolve();
            });
        });
    }
})();
