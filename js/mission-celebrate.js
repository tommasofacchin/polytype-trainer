(function () {
    function tr(key, params) {
        return window.PolytypeI18n?.t?.(key, params) || key;
    }

    window.PolytypeMissionCelebrate = { show };
    window.PolytypeBadgeCelebrate = { show: showBadges };

    // Mirrors BADGE_DEFINITIONS in api/_lib.js (also duplicated in
    // js/profile.js and js/visit-profile.js) - icon/labels only, unlock
    // logic is server-side. This file is loaded on every game page (Trainer,
    // Memory, Dictate, Sprint, Lessons), so newBadges ids coming back from
    // completePracticeSession can be resolved to an icon/name/description
    // right where a session just finished.
    const BADGE_DEFINITIONS = [
        { id: "first_steps", icon: "star", labelKey: "badge.firstSteps", descriptionKey: "badge.firstStepsDesc" },
        { id: "streak_5", icon: "flame", labelKey: "badge.streak5", descriptionKey: "badge.streak5Desc" },
        { id: "streak_30", icon: "flame", labelKey: "badge.streak30", descriptionKey: "badge.streak30Desc" },
        { id: "word_master", icon: "book", labelKey: "badge.wordMaster", descriptionKey: "badge.wordMasterDesc" },
        { id: "chest_hunter", icon: "chest", labelKey: "badge.chestHunter", descriptionKey: "badge.chestHunterDesc" },
        { id: "level_10", icon: "star", labelKey: "badge.level10", descriptionKey: "badge.level10Desc" },
        { id: "lessons_10", icon: "book", labelKey: "badge.lessons10", descriptionKey: "badge.lessons10Desc" },
        { id: "lessons_25", icon: "book", labelKey: "badge.lessons25", descriptionKey: "badge.lessons25Desc" },
        { id: "lessons_all", icon: "crown", labelKey: "badge.lessonsAll", descriptionKey: "badge.lessonsAllDesc" },
        { id: "streak_50", icon: "flame", labelKey: "badge.streak50", descriptionKey: "badge.streak50Desc" },
        { id: "streak_100", icon: "flame", labelKey: "badge.streak100", descriptionKey: "badge.streak100Desc" },
        { id: "streak_365", icon: "flame", labelKey: "badge.streak365", descriptionKey: "badge.streak365Desc" },
        { id: "words_50", icon: "book", labelKey: "badge.words50", descriptionKey: "badge.words50Desc" },
        { id: "deck_complete", icon: "crown", labelKey: "badge.deckComplete", descriptionKey: "badge.deckCompleteDesc" },
        { id: "chest_30", icon: "chest", labelKey: "badge.chest30", descriptionKey: "badge.chest30Desc" },
        { id: "chest_100", icon: "chest", labelKey: "badge.chest100", descriptionKey: "badge.chest100Desc" },
        { id: "polyglot", icon: "globe", labelKey: "badge.polyglot", descriptionKey: "badge.polyglotDesc" },
        { id: "social_butterfly", icon: "friends", labelKey: "badge.socialButterfly", descriptionKey: "badge.socialButterflyDesc" },
        { id: "friend_squad", icon: "friends", labelKey: "badge.friendSquad", descriptionKey: "badge.friendSquadDesc" },
        { id: "combo_master", icon: "bolt", labelKey: "badge.comboMaster", descriptionKey: "badge.comboMasterDesc" },
        { id: "flawless_round", icon: "target", labelKey: "badge.flawlessRound", descriptionKey: "badge.flawlessRoundDesc" },
        { id: "night_owl", icon: "moon", labelKey: "badge.nightOwl", descriptionKey: "badge.nightOwlDesc" },
        { id: "well_rounded", icon: "grid", labelKey: "badge.wellRounded", descriptionKey: "badge.wellRoundedDesc" },
        { id: "veteran", icon: "medal", labelKey: "badge.veteran", descriptionKey: "badge.veteranDesc" }
    ];

    const BADGE_ICONS = {
        star: '<svg width="26" height="26" viewBox="0 0 24 24" fill="#ffc73a"><path d="M12 2l2.9 6.2 6.6.7-4.9 4.5 1.3 6.6L12 17.8 6.1 20.6l1.3-6.6L2.5 8.9l6.6-.7z"/></svg>',
        flame: '<svg width="26" height="26" viewBox="0 0 24 24" fill="var(--color-streak)"><path d="M12 2c3 4 5 6 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 1 2 2 2 3 2 0-3-1-5 0-8z"/></svg>',
        book: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-secondary)" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
        chest: '<svg width="24" height="24" viewBox="0 0 48 48"><rect x="6" y="20" width="36" height="20" rx="4" fill="var(--color-secondary)"/><path d="M6 22a18 12 0 0 1 36 0z" fill="var(--color-secondary-light)"/><rect x="6" y="25" width="36" height="4" fill="var(--color-secondary-deep)"/></svg>',
        crown: '<svg width="24" height="24" viewBox="0 0 24 24" fill="#ffc73a"><path d="M3 9l4.5 2.7L12 4l4.5 7.7L21 9l-2 9H5L3 9z"/><rect x="5.6" y="20" width="12.8" height="2" rx="0.6" fill="#d99a1c"/></svg>',
        globe: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 4 6 4 9s-1.5 6.5-4 9c-2.5-2.5-4-6-4-9s1.5-6.5 4-9z"/></svg>',
        friends: '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><circle cx="8.5" cy="7.5" r="3.3"/><path d="M2 20c0-3.6 2.9-5.8 6.5-5.8S15 16.4 15 20z"/><circle cx="17" cy="8.5" r="2.6"/><path d="M15.2 13.6c2.9.4 4.8 2.4 4.8 6.4h-3.4z"/></svg>',
        bolt: '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2 4 14h6l-1 8 9-12h-6z"/></svg>',
        target: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none"/></svg>',
        moon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"/></svg>',
        grid: '<svg width="22" height="22" viewBox="0 0 24 24" fill="var(--color-secondary)"><rect x="3" y="4" width="7" height="7" rx="1.6"/><rect x="14" y="4" width="7" height="7" rx="1.6"/><rect x="3" y="14" width="7" height="7" rx="1.6"/><rect x="14" y="14" width="7" height="7" rx="1.6"/></svg>',
        medal: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M8 2h3l1 4-3 2z" fill="var(--color-secondary)"/><path d="M16 2h-3l-1 4 3 2z" fill="var(--color-secondary-light)"/><circle cx="12" cy="15" r="7" fill="#ffc73a" stroke="#d99a1c" stroke-width="1.5"/><circle cx="12" cy="15" r="3" fill="none" stroke="#d99a1c" stroke-width="1.2"/></svg>'
    };

    function showBadges(newBadges) {
        if (!newBadges || !newBadges.length) return Promise.resolve();

        const earned = newBadges
            .map(badge => BADGE_DEFINITIONS.find(def => def.id === badge.id))
            .filter(Boolean);
        if (!earned.length) return Promise.resolve();

        document.querySelector(".badge-overlay")?.remove();

        const overlay = document.createElement("div");
        overlay.className = "badge-overlay";

        const title = earned.length > 1 ? tr("badge.earnedTitlePlural") : tr("badge.earnedTitle");

        overlay.innerHTML = `
            <div class="badge-overlay-art">
                <div class="badge-overlay-rays"></div>
                <div class="badge-overlay-flash"></div>
                <svg class="badge-overlay-icon" width="110" height="110" viewBox="0 0 24 24" fill="#ffc73a">
                    <path d="M12 1l3.5 7.4 8 1-5.8 5.5 1.5 7.9L12 18.9 4.8 22.8l1.5-7.9L.5 9.4l8-1z"/>
                </svg>
            </div>
            <div class="badge-overlay-title">${title}</div>
            <div class="badge-overlay-subtitle">${tr("badge.earnedSubtitle")}</div>
            <div class="badge-rewards-list"></div>
            <button class="badge-collect-btn" type="button">${tr("badge.collectBtn")}</button>
        `;

        const list = overlay.querySelector(".badge-rewards-list");
        earned.forEach((badge, index) => {
            const row = document.createElement("div");
            row.className = "badge-reward-row";
            row.style.setProperty("--delay", `${0.35 + index * 0.15}s`);
            row.innerHTML = `
                <span class="badge-reward-icon">${BADGE_ICONS[badge.icon] || ""}</span>
                <span class="badge-reward-copy">
                    <strong>${tr(badge.labelKey)}</strong>
                    <span>${tr(badge.descriptionKey)}</span>
                </span>
            `;
            list.appendChild(row);
        });

        document.body.append(overlay);

        return new Promise(resolve => {
            overlay.querySelector(".badge-collect-btn").addEventListener("click", () => {
                overlay.remove();
                resolve();
            });
        });
    }

    const COIN_ICON =
        '<svg width="14" height="14" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#ffc73a"/><circle cx="12" cy="12" r="6.5" fill="none" stroke="#d99a1c" stroke-width="2"/></svg>';
    const KEY_ICON =
        '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold-text)" stroke-width="1.9" stroke-linecap="round"><circle cx="7" cy="12" r="4.2"></circle><path d="M10.6 12h10"></path><path d="M17 12v3"></path><path d="M20 12v2.4"></path></svg>';
    const FREEZE_ICON =
        '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-secondary)" stroke-width="2" stroke-linecap="round"><path d="M12 2v20M3.4 7l17.2 10M20.6 7 3.4 17"/></svg>';

    // A mission's payout is rolled, not fixed (MISSION_REWARD_TABLE in
    // api/_lib.js), so the row has to show what actually dropped: the coins
    // paid, plus a chip for a key or freeze when one came with them. The
    // Home card advertised `baseCoinReward`, so anything above it is called
    // out as a bonus rather than left to look like a different number.
    function buildRewardChips(mission) {
        const paid = Number(mission.coinReward) || 0;
        const base = Number(mission.baseCoinReward) || paid;
        const chips = [
            `<span class="mission-reward-coin${paid > base ? " is-bonus" : ""}">${COIN_ICON}+${paid}</span>`
        ];

        if (Number(mission.keysEarned) > 0) {
            chips.push(`<span class="mission-reward-extra">${KEY_ICON}+${mission.keysEarned}</span>`);
        }
        if (Number(mission.streakFreezesEarned) > 0) {
            chips.push(`<span class="mission-reward-extra">${FREEZE_ICON}+${mission.streakFreezesEarned}</span>`);
        }

        return chips.join("");
    }

    // `options.xpBoostStarted` comes straight off the session response - the
    // server decides when the day's set is cleared, so the overlay never has
    // to work out whether all three are done from the rows it was handed
    // (which only ever carry the ones that completed in *this* session).
    function show(missions, options = {}) {
        if (!missions || !missions.length) return Promise.resolve();

        document.querySelector(".mission-overlay")?.remove();

        const overlay = document.createElement("div");
        overlay.className = "mission-overlay";

        const title = missions.length > 1 ? tr("mission.completedTitlePlural") : tr("mission.completedTitle");

        overlay.innerHTML = `
            <div class="mission-overlay-art">
                <div class="mission-overlay-rays"></div>
                <div class="mission-overlay-flash"></div>
                <svg class="mission-overlay-icon" width="110" height="110" viewBox="0 0 24 24" fill="none" stroke="var(--accent-ink)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M8 21h8"/>
                    <path d="M12 17v4"/>
                    <path d="M7 4h10v5a5 5 0 0 1-10 0z" fill="rgba(77, 159, 255,0.18)"/>
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
            // The bar under the label runs empty-to-full here rather than
            // arriving already finished, and the coin only lands once it gets
            // there - so the reward reads as paid out by the mission
            // completing. Both are pure CSS off --delay (see
            // mission-bar-complete / mission-coin-land in style.css), which
            // keeps the whole stagger in one place instead of split between a
            // timer here and a transition there.
            row.innerHTML = `
                <div class="mission-reward-head">
                    <strong>${tr(mission.labelKey)}</strong>
                    <span class="mission-reward-amounts">${buildRewardChips(mission)}</span>
                </div>
                <div class="mission-bar"><div class="mission-bar-fill"></div></div>
            `;
            if (mission.rarity && mission.rarity !== "common") row.classList.add("is-rare-roll");
            list.appendChild(row);
        });

        // Clearing all three arms the 2x XP window. Announced here, in the
        // same breath as the last mission completing, because that is the
        // only moment it is caused - the header pill takes over from here and
        // carries the countdown for the rest of it.
        if (options.xpBoostStarted) {
            const boost = document.createElement("div");
            boost.className = "mission-boost-banner";
            boost.style.setProperty("--delay", `${0.35 + missions.length * 0.15}s`);
            boost.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2 4 14h6l-1 8 9-12h-6z"/></svg>
                <span>
                    <strong>${tr("boost.startedTitle")}</strong>
                    <span>${tr("boost.startedBody", { minutes: 10 })}</span>
                </span>
            `;
            overlay.querySelector(".mission-rewards-list").after(boost);
        }

        document.body.append(overlay);

        // The pill is normally painted by the next profile update, which for
        // Trainer's buffered flush can be a while - light it now so the
        // banner above and the header agree from this frame on.
        if (options.xpBoostStarted) window.PolytypeAppShell?.paintXpBoost?.({ xpBoostExpiresAt: options.xpBoostExpiresAt });

        return new Promise(resolve => {
            let closed = false;
            overlay.querySelector(".mission-collect-btn").addEventListener("click", () => {
                if (closed) return;
                closed = true;

                // Slides out the way the streak screen before it does, so the
                // hand-off to the next page is a turn rather than a hard cut.
                // Matches .mission-overlay.is-leaving's duration in style.css.
                overlay.classList.add("is-leaving");
                window.setTimeout(() => {
                    overlay.remove();
                    resolve();
                }, 280);
            });
        });
    }
})();
