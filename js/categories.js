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

function initCategoriesPage() {
    applyStoredTheme();

    languageMenuToggle = document.getElementById("language-menu-toggle");
    languageMenu = document.getElementById("language-menu");
    currentLanguageFlag = document.getElementById("current-language-flag");

    setupLanguageMenu();
    renderCategories();

    // Delegated through js/router.js's shared hook slot instead of a direct
    // document-level listener - see js/main.js's identical comment for why.
    window.__polytypePageHooks = window.__polytypePageHooks || {};
    window.__polytypePageHooks.onLanguageChanged = renderCategories;
    window.__polytypePageHooks.onProfileUpdated = renderCategories;
}

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

// Returns the course's real unlocked-word set, migrating a legacy
// prefix-based local course (categoryIndex/categoryUnlocked, no
// unlockedWords array yet) on the fly.
function getUnlockedWords(language) {
    const profile = getStoredProfile();
    const courses = profile.courses || {};
    const course = courses[language];

    if (!course) {
        return new Set(getSortedCategories()[0]?.wordSuffixes.slice(0, getStarterWordCount()) || []);
    }

    return Array.isArray(course.unlockedWords)
        ? new Set(course.unlockedWords)
        : getUnlockedWordSuffixesFromPrefix(
            Math.max(0, Math.trunc(Number(course.categoryIndex) || 0)),
            Math.max(0, Math.trunc(Number(course.categoryUnlocked) || 0))
        );
}

// Legacy (pre-keys) unlock state was a contiguous prefix. Used only to
// migrate old local courses into a real unlockedWords set the first time
// they're touched under the new model.
function getUnlockedWordSuffixesFromPrefix(categoryIndex, categoryUnlocked) {
    const unlocked = new Set();

    getSortedCategories().forEach(category => {
        if (category.order < categoryIndex) {
            category.wordSuffixes.forEach(suffix => unlocked.add(suffix));
        } else if (category.order === categoryIndex) {
            category.wordSuffixes.slice(0, categoryUnlocked).forEach(suffix => unlocked.add(suffix));
        }
    });

    return unlocked;
}

function getStarterWordCount() {
    return Math.min(5, getSortedCategories()[0]?.size || 0);
}

function renderCategories() {
    const list = document.getElementById("categories-list");
    const summary = document.getElementById("categories-progress-summary");
    if (!currentLanguage || !list) return;

    const categories = getSortedCategories();
    const unlockedWords = getUnlockedWords(currentLanguage);
    const totalWords = categories.reduce((sum, category) => sum + category.size, 0);
    const unlockedCount = categories.reduce(
        (sum, category) => sum + category.wordSuffixes.filter(suffix => unlockedWords.has(suffix)).length,
        0
    );

    if (summary) {
        summary.textContent = tr("categories.overallProgress", {
            language: getLanguageLabel(currentLanguage),
            unlocked: unlockedCount,
            total: totalWords
        });
    }

    // "Active" = the first category (in drop order) that isn't fully
    // unlocked yet - a purely visual progress-ladder indicator now that a
    // key can be spent on any word in any category, not a real gate.
    const activeOrder = categories.find(category =>
        category.wordSuffixes.some(suffix => !unlockedWords.has(suffix))
    )?.order ?? categories.length;

    list.replaceChildren(...categories.map(category => buildCategoryCard(category, unlockedWords, activeOrder)));
}

function buildCategoryCard(category, unlockedWords, activeOrder) {
    const unlockedInCategory = category.wordSuffixes.filter(suffix => unlockedWords.has(suffix)).length;
    const isComplete = unlockedInCategory === category.size;
    const isActive = !isComplete && category.order === activeOrder;
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

// Runs after every function/let/const above is defined - same reasoning as
// js/app-shell.js and js/main.js.
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCategoriesPage, { once: true });
} else {
    initCategoriesPage();
}
