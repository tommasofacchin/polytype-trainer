const themeStorageKey = "polytype-theme";
const profileStorageKey = "polytype-profile";
const languageStorageKey = "polytype-language";

const LANGUAGE_FLAGS = {
    chinese: "assets/flags/china.svg",
    german: "assets/flags/germany.svg",
    italian: "assets/flags/italy.svg",
    japanese: "assets/flags/japan.svg",
    norwegian: "assets/flags/norway.svg",
    spanish: "assets/flags/spain.svg",
    swedish: "assets/flags/sweden.svg"
};

const LOCK_SVG =
    '<svg viewBox="0 0 24 24" aria-hidden="true">' +
    '<rect x="4.5" y="10.5" width="15" height="10" rx="2.4"></rect>' +
    '<path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"></path>' +
    '<circle cx="12" cy="15" r="1.5"></circle>' +
    "</svg>";

let currentLanguage = "";
let languageMenuToggle;
let languageMenu;
let currentLanguageFlag;

function tr(key, params = {}) {
    return window.PolytypeI18n?.t?.(key, params) || key;
}

document.addEventListener("DOMContentLoaded", () => {
    applyStoredTheme();

    languageMenuToggle = document.getElementById("language-menu-toggle");
    languageMenu = document.getElementById("language-menu");
    currentLanguageFlag = document.getElementById("current-language-flag");

    setupLanguageMenu();
    renderCategories();

    document.addEventListener("polytype-app-language-changed", renderCategories);
    document.addEventListener("polytype-profile-updated", renderCategories);
});

function applyStoredTheme() {
    const storedTheme = localStorage.getItem(themeStorageKey);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.dataset.theme = storedTheme || (prefersDark ? "dark" : "light");
}

function getAvailableLanguages() {
    const decks = window.DECK_INDEX || [];
    const seen = new Set();
    const languages = [];

    decks.forEach(deck => {
        if (seen.has(deck.language)) return;
        seen.add(deck.language);
        languages.push(deck.language);
    });

    return languages;
}

function setupLanguageMenu() {
    if (!languageMenuToggle || !languageMenu) return;

    const languages = getAvailableLanguages();
    const savedLanguage = localStorage.getItem(languageStorageKey);
    currentLanguage = languages.includes(savedLanguage) ? savedLanguage : (languages[0] || "");

    languageMenu.replaceChildren(
        ...languages.map(language => {
            const item = document.createElement("button");
            item.type = "button";
            item.className = "language-menu-item";
            item.setAttribute("role", "menuitemradio");
            item.innerHTML = `
                <img class="flag-mark" src="${LANGUAGE_FLAGS[language] || ""}" alt="">
                <span>${getLanguageLabel(language)}</span>
            `;
            item.addEventListener("click", () => {
                currentLanguage = language;
                localStorage.setItem(languageStorageKey, language);
                closeLanguageMenu();
                syncLanguageMenu();
                renderCategories();
            });
            return item;
        })
    );

    syncLanguageMenu();

    languageMenuToggle.addEventListener("click", () => {
        const isOpen = !languageMenu.hidden;
        languageMenu.hidden = isOpen;
        languageMenuToggle.setAttribute("aria-expanded", String(!isOpen));
    });

    document.addEventListener("click", event => {
        if (languageMenu.hidden) return;
        if (languageMenuToggle.contains(event.target) || languageMenu.contains(event.target)) return;
        closeLanguageMenu();
    });
}

function closeLanguageMenu() {
    if (!languageMenu) return;
    languageMenu.hidden = true;
    languageMenuToggle?.setAttribute("aria-expanded", "false");
}

function syncLanguageMenu() {
    if (currentLanguageFlag) currentLanguageFlag.src = LANGUAGE_FLAGS[currentLanguage] || "";

    const languages = getAvailableLanguages();
    languageMenu?.querySelectorAll(".language-menu-item").forEach((item, index) => {
        const isActive = languages[index] === currentLanguage;
        item.classList.toggle("is-active", isActive);
        item.setAttribute("aria-checked", String(isActive));
    });
}

function getLanguageLabel(language) {
    return window.PolytypeI18n?.languageLabel?.(language) || language;
}

function getStoredProfile() {
    try {
        return JSON.parse(localStorage.getItem(profileStorageKey)) || {};
    } catch {
        return {};
    }
}

function getSortedCategories() {
    return [...(window.POLYTYPE_CATEGORIES || [])].sort((a, b) => a.order - b.order);
}

function getCategoryProgress(language) {
    const profile = getStoredProfile();
    const courses = profile.courses || {};
    const course = courses[language];

    if (!course) {
        return { categoryIndex: 0, categoryUnlocked: getStarterWordCount() };
    }

    return {
        categoryIndex: Math.max(0, Math.trunc(Number(course.categoryIndex) || 0)),
        categoryUnlocked: Math.max(0, Math.trunc(Number(course.categoryUnlocked) || 0))
    };
}

function getStarterWordCount() {
    return Math.min(5, getSortedCategories()[0]?.size || 0);
}

function renderCategories() {
    const list = document.getElementById("categories-list");
    const summary = document.getElementById("categories-progress-summary");
    if (!currentLanguage || !list) return;

    const categories = getSortedCategories();
    const progress = getCategoryProgress(currentLanguage);
    const totalWords = categories.reduce((sum, category) => sum + category.size, 0);
    const unlockedWords = categories.reduce((sum, category) => {
        if (category.order < progress.categoryIndex) return sum + category.size;
        if (category.order === progress.categoryIndex) return sum + progress.categoryUnlocked;
        return sum;
    }, 0);

    if (summary) {
        summary.textContent = tr("categories.overallProgress", {
            language: getLanguageLabel(currentLanguage),
            unlocked: unlockedWords,
            total: totalWords
        });
    }

    list.replaceChildren(...categories.map(category => buildCategoryCard(category, progress)));
}

function buildCategoryCard(category, progress) {
    const isComplete = progress.categoryIndex > category.order;
    const isActive = !isComplete && progress.categoryIndex === category.order;
    const unlockedInCategory = isComplete ? category.size : (isActive ? progress.categoryUnlocked : 0);
    const pct = category.size ? Math.round((unlockedInCategory / category.size) * 100) : 0;

    const card = document.createElement("article");
    card.className = "category-card";
    card.classList.add(isComplete ? "is-complete" : (isActive ? "is-active" : "is-locked"));

    const head = document.createElement("div");
    head.className = "category-card-head";

    const badge = document.createElement("span");
    badge.className = "category-card-badge";
    badge.innerHTML = isComplete ? "&#10003;" : (isActive ? String(category.order + 1) : LOCK_SVG);

    const copy = document.createElement("div");
    copy.className = "category-card-copy";

    const title = document.createElement("strong");
    title.textContent = tr(category.labelKey);

    const meta = document.createElement("span");
    meta.className = "category-card-meta";
    meta.textContent = isComplete
        ? tr("categories.completeCount", { count: category.size })
        : tr("categories.progressCount", { unlocked: unlockedInCategory, total: category.size });

    copy.append(title, meta);
    head.append(badge, copy);

    const track = document.createElement("div");
    track.className = "category-progress-track";
    const fill = document.createElement("span");
    fill.className = "category-progress-fill";
    fill.style.width = `${pct}%`;
    track.appendChild(fill);

    card.append(head, track);
    return card;
}
