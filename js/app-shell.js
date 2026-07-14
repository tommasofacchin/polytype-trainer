(function () {
    const LANGUAGE_FLAGS = {
        chinese: "assets/flags/china.svg",
        german: "assets/flags/germany.svg",
        italian: "assets/flags/italy.svg",
        japanese: "assets/flags/japan.svg",
        norwegian: "assets/flags/norway.svg",
        spanish: "assets/flags/spain.svg",
        swedish: "assets/flags/sweden.svg"
    };

    const ICONS = {
        streak: '<svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M12 2c3 4 5 6 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 1 2 2 2 3 2 0-3-1-5 0-8z"/></svg>',
        coin: '<svg viewBox="0 0 24 24" width="16" height="16"><circle cx="12" cy="12" r="10" fill="#ffc73a"/><circle cx="12" cy="12" r="6.5" fill="none" stroke="#d99a1c" stroke-width="2"/></svg>',
        rupee: '<svg viewBox="0 0 24 24" width="15" height="15"><path d="M12 2 L18 8 L15 16 L12 22 L9 16 L6 8 Z" fill="#3fd07a" stroke="#1c9a52" stroke-width="1.2" stroke-linejoin="round"/><path d="M12 2 L18 8 L15 16 L12 22 Z" fill="rgba(0,0,0,.14)"/><path d="M12 8 L15 10 L13.5 15 L12 18 L10.5 15 L9 10 Z" fill="rgba(255,255,255,.35)"/></svg>',
        person: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><circle cx="12" cy="9" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6z"/></svg>',
        home: '<svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/></svg>',
        games: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><rect x="3" y="4" width="7" height="7" rx="1.6"/><rect x="14" y="4" width="7" height="7" rx="1.6"/><rect x="3" y="14" width="7" height="7" rx="1.6"/><rect x="14" y="14" width="7" height="7" rx="1.6"/></svg>',
        deck: '<svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',
        friends: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.2"/><path d="M2.6 20c0-3.6 3-5.6 6.4-5.6S15.4 16.4 15.4 20"/><path d="M16.5 5.6a2.8 2.8 0 0 1 0 5.4"/><path d="M17 14.5c2.7.3 4.9 2 4.9 5.2"/></svg>',
        profile: '<svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>',
        settings: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>'
    };

    const TABS = [
        { id: "home", href: "index.html", label: "nav.home", icon: ICONS.home },
        { id: "games", href: "games.html", label: "nav.games", icon: ICONS.games },
        { id: "deck", href: "deck.html", label: "nav.deck", icon: ICONS.deck },
        { id: "friends", href: "friends.html", label: "nav.friends", icon: ICONS.friends },
        { id: "profile", href: "profile.html", label: "nav.profile", icon: ICONS.profile },
        { id: "settings", href: "settings.html", label: "settings.title", icon: ICONS.settings, desktopOnly: true }
    ];

    function tr(key, params) {
        return window.PolytypeI18n?.t?.(key, params) || key;
    }

    document.addEventListener("DOMContentLoaded", () => {
        renderHeader();
        renderBottomNav();

        window.PolytypeFirebase?.onChange?.(renderHeaderAuth);
        window.PolytypeGameState?.onChange?.(renderHeaderStats);
        document.addEventListener("polytype-app-language-changed", () => {
            renderHeader();
            renderBottomNav();
        });
    });

    function renderHeader() {
        const mount = document.getElementById("app-header");
        if (!mount) return;

        const language = localStorage.getItem("polytype-language") || "chinese";
        const flagSrc = LANGUAGE_FLAGS[language] || LANGUAGE_FLAGS.chinese;

        mount.innerHTML = `
            <div class="app-shell-header">
                <div class="app-shell-stats">
                    <span class="app-shell-stat app-shell-stat-streak" id="app-shell-streak">${ICONS.streak}0</span>
                    <span class="app-shell-stat app-shell-stat-coin" id="app-shell-coins">${ICONS.coin}0</span>
                    <span class="app-shell-stat app-shell-stat-rupee" id="app-shell-rupees">${ICONS.rupee}0</span>
                </div>
                <div class="app-shell-identity">
                    <span class="app-shell-flag"><img src="${flagSrc}" alt=""></span>
                    <a id="app-shell-avatar" class="app-shell-avatar" href="profile.html" aria-label="${tr("trainer.openProfile")}">${ICONS.person}</a>
                </div>
            </div>
        `;

        renderHeaderAuth(window.PolytypeFirebase?.state || {});
        renderHeaderStats(window.PolytypeGameState?.state || {});
    }

    function renderHeaderAuth(authState) {
        const avatar = document.getElementById("app-shell-avatar");
        if (!avatar) return;

        const profile = authState.profile;
        avatar.href = authState.user ? "profile.html" : "auth.html";

        if (profile?.avatarUrl) {
            avatar.classList.add("has-image");
            avatar.innerHTML = `<img src="${profile.avatarUrl}" alt="">`;
        } else {
            avatar.classList.remove("has-image");
            avatar.innerHTML = ICONS.person;
        }

        const streakEl = document.getElementById("app-shell-streak");
        if (streakEl && typeof profile?.currentStreak === "number") {
            streakEl.innerHTML = `${ICONS.streak}${profile.currentStreak}`;
        }
    }

    function renderHeaderStats(gameState) {
        const coinsEl = document.getElementById("app-shell-coins");
        const rupeesEl = document.getElementById("app-shell-rupees");
        if (coinsEl && typeof gameState.coins === "number") coinsEl.innerHTML = `${ICONS.coin}${gameState.coins}`;
        if (rupeesEl && typeof gameState.rupees === "number") rupeesEl.innerHTML = `${ICONS.rupee}${gameState.rupees}`;
    }

    function renderBottomNav() {
        const mount = document.getElementById("app-bottom-nav");
        if (!mount) return;

        const activeTab = document.body.dataset.tab || "";

        mount.innerHTML = `
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
})();
