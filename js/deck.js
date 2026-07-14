const PROFILE_KEY = "polytype-profile";
const LANGUAGE_KEY = "polytype-language";
const FALLBACK_LANGUAGE = "norwegian";

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

let activeDeckMeta = null;
let activeLanguage = FALLBACK_LANGUAGE;
let vocab = [];
let activeAudio = null;

const el = {};

function tr(key, params = {}) {
    return window.PolytypeI18n?.t?.(key, params) || key;
}

document.addEventListener("DOMContentLoaded", () => {
    el.languageMenuToggle = document.getElementById("language-menu-toggle");
    el.languageMenu = document.getElementById("language-menu");
    el.currentLanguageFlag = document.getElementById("current-language-flag");
    el.progressFill = document.getElementById("deck-progress-fill");
    el.progressText = document.getElementById("deck-progress-text");
    el.emptyHint = document.getElementById("deck-empty-hint");
    el.groups = document.getElementById("deck-groups");

    setupLanguageMenu();
    loadDeck();

    document.addEventListener("polytype-app-language-changed", renderDeck);
    document.addEventListener("polytype-profile-updated", renderDeck);
});

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
    if (!el.languageMenuToggle || !el.languageMenu) return;

    const languages = getAvailableLanguages();
    const savedLanguage = localStorage.getItem(LANGUAGE_KEY);
    activeLanguage = languages.includes(savedLanguage) ? savedLanguage : (languages[0] || FALLBACK_LANGUAGE);

    el.languageMenu.replaceChildren(
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
                activeLanguage = language;
                localStorage.setItem(LANGUAGE_KEY, language);
                closeLanguageMenu();
                syncLanguageMenu();
                loadDeck();
            });
            return item;
        })
    );

    syncLanguageMenu();

    el.languageMenuToggle.addEventListener("click", () => {
        const isOpen = !el.languageMenu.hidden;
        el.languageMenu.hidden = isOpen;
        el.languageMenuToggle.setAttribute("aria-expanded", String(!isOpen));
    });

    document.addEventListener("click", event => {
        if (el.languageMenu.hidden) return;
        if (el.languageMenuToggle.contains(event.target) || el.languageMenu.contains(event.target)) return;
        closeLanguageMenu();
    });
}

function closeLanguageMenu() {
    if (!el.languageMenu) return;
    el.languageMenu.hidden = true;
    el.languageMenuToggle?.setAttribute("aria-expanded", "false");
}

function syncLanguageMenu() {
    if (el.currentLanguageFlag) el.currentLanguageFlag.src = LANGUAGE_FLAGS[activeLanguage] || "";

    const languages = getAvailableLanguages();
    el.languageMenu?.querySelectorAll(".language-menu-item").forEach((item, index) => {
        const isActive = languages[index] === activeLanguage;
        item.classList.toggle("is-active", isActive);
        item.setAttribute("aria-checked", String(isActive));
    });
}

function getLanguageLabel(language) {
    return window.PolytypeI18n?.languageLabel?.(language) || language;
}

async function loadDeck() {
    const decks = window.DECK_INDEX || [];
    activeDeckMeta = decks.find(deck => deck.language === activeLanguage) || decks[0] || null;
    syncLanguageMenu();

    if (!activeDeckMeta) {
        vocab = [];
        renderDeck();
        return;
    }

    try {
        const response = await fetch(activeDeckMeta.path);
        if (!response.ok) throw new Error("fetch failed");
        vocab = parseDeckCsv(await response.text(), activeDeckMeta.columns);
    } catch {
        vocab = [];
    }

    renderDeck();
}

function parseDeckCsv(csvText, columns) {
    const rows = parseCsv(csvText.trim());
    const headers = (rows.shift() || []).map(h => h.trim());

    return rows
        .map((row, i) => {
            const record = {};
            headers.forEach((header, j) => { record[header] = (row[j] || "").trim(); });
            return {
                id: record[columns.wordId]?.trim() || `w-${i}`,
                script: record[columns.script] || "",
                romanization: record[columns.romanization] || "",
                meaning: getRecordMeaning(record, columns)
            };
        })
        .filter(item => item.script && item.meaning);
}

function getRecordMeaning(record, columns) {
    return record[columns.meaning] || record[columns.italianMeaning] || "";
}

function parseCsv(csvText) {
    const rows = [];
    let row = [];
    let field = "";
    let inQuotes = false;

    for (let i = 0; i < csvText.length; i += 1) {
        const char = csvText[i];
        const nextChar = csvText[i + 1];

        if (char === '"' && inQuotes && nextChar === '"') {
            field += '"';
            i += 1;
        } else if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === "," && !inQuotes) {
            row.push(field);
            field = "";
        } else if ((char === "\n" || char === "\r") && !inQuotes) {
            if (char === "\r" && nextChar === "\n") i += 1;
            row.push(field);
            rows.push(row);
            row = [];
            field = "";
        } else {
            field += char;
        }
    }

    row.push(field);
    rows.push(row);
    return rows.filter(values => values.some(value => value.trim() !== ""));
}

function getStoredProfile() {
    try {
        return JSON.parse(localStorage.getItem(PROFILE_KEY)) || {};
    } catch {
        return {};
    }
}

function getSortedCategories() {
    return [...(window.POLYTYPE_CATEGORIES || [])].sort((a, b) => a.order - b.order);
}

function getStarterWordCount() {
    return Math.min(5, getSortedCategories()[0]?.size || 0);
}

function getCategoryProgress() {
    const profile = getStoredProfile();
    const courses = profile.courses || {};
    const course = courses[activeLanguage] || (activeDeckMeta?.id && courses[activeDeckMeta.id]);

    if (!course) {
        return { categoryIndex: 0, categoryUnlocked: getStarterWordCount() };
    }

    return {
        categoryIndex: Math.max(0, Math.trunc(Number(course.categoryIndex) || 0)),
        categoryUnlocked: Math.max(0, Math.trunc(Number(course.categoryUnlocked) || 0))
    };
}

function getWordSuffix(wordId) {
    const match = /(\d+)$/.exec(wordId || "");
    return match ? Number.parseInt(match[0], 10) : 0;
}

function getUnlockedWordSuffixes(categoryIndex, categoryUnlocked) {
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

function getCategoryForSuffix(suffix) {
    return getSortedCategories().find(category => category.wordSuffixes.includes(suffix));
}

function languageHasHints() {
    return activeLanguage === "chinese" || activeLanguage === "japanese";
}

function renderDeck() {
    if (!el.groups) return;
    el.groups.replaceChildren();

    if (!vocab.length) {
        const empty = document.createElement("p");
        empty.className = "deck-empty";
        empty.textContent = tr("trainer.noWordsLoaded");
        el.groups.appendChild(empty);
        if (el.progressFill) el.progressFill.style.width = "0%";
        if (el.progressText) el.progressText.textContent = "";
        return;
    }

    const { categoryIndex, categoryUnlocked } = getCategoryProgress();
    const unlockedSuffixes = getUnlockedWordSuffixes(categoryIndex, categoryUnlocked);
    const unlockedCount = vocab.filter(word => unlockedSuffixes.has(getWordSuffix(word.id))).length;
    const pct = Math.round((unlockedCount / vocab.length) * 100);

    if (el.progressFill) el.progressFill.style.width = `${pct}%`;
    if (el.progressText) {
        el.progressText.textContent = tr("trainer.deckProgress", {
            unlocked: unlockedCount,
            total: vocab.length
        });
    }
    if (el.emptyHint) el.emptyHint.hidden = unlockedCount > 0;

    const byCategory = new Map();
    vocab.forEach(word => {
        const category = getCategoryForSuffix(getWordSuffix(word.id));
        if (!category) return;
        if (!byCategory.has(category.id)) byCategory.set(category.id, []);
        byCategory.get(category.id).push(word);
    });

    getSortedCategories().forEach(category => {
        const categoryWords = byCategory.get(category.id);
        if (!categoryWords || !categoryWords.length) return;
        el.groups.appendChild(buildDeckGroup(category, categoryWords, categoryIndex, unlockedSuffixes));
    });
}

function buildDeckGroup(category, words, courseCategoryIndex, unlockedSuffixes) {
    const total = words.length;
    const unlockedInCategory = words.filter(word => unlockedSuffixes.has(getWordSuffix(word.id))).length;
    const isComplete = courseCategoryIndex > category.order;

    const group = document.createElement("section");
    group.className = "deck-group";
    if (!isComplete) group.classList.add("is-locked");

    const head = document.createElement("div");
    head.className = "deck-group-head";

    const badge = document.createElement("span");
    badge.className = "deck-group-badge";
    badge.innerHTML = isComplete ? "&#10003;" : LOCK_SVG;

    const title = document.createElement("span");
    title.className = "deck-group-title";
    title.textContent = tr(category.labelKey);

    const meta = document.createElement("span");
    meta.className = "deck-group-meta";
    meta.textContent = isComplete
        ? tr("trainer.wordCount", { count: total, word: total === 1 ? tr("common.word") : tr("common.words") })
        : tr("trainer.categoryProgress", { unlocked: unlockedInCategory, total });

    head.append(badge, title, meta);

    const grid = document.createElement("div");
    grid.className = "deck-grid";
    words.forEach(word => grid.appendChild(buildDeckCard(word, !unlockedSuffixes.has(getWordSuffix(word.id)))));

    group.append(head, grid);
    return group;
}

function buildDeckCard(word, locked) {
    const card = document.createElement("div");
    card.className = "deck-card";

    if (locked) {
        card.classList.add("is-locked");
        card.setAttribute("aria-label", tr("trainer.lockedWord"));
        const lock = document.createElement("span");
        lock.className = "deck-card-lock";
        lock.innerHTML = LOCK_SVG;
        card.append(lock);
        return card;
    }

    card.setAttribute("role", "button");
    card.tabIndex = 0;
    card.setAttribute("aria-label", tr("trainer.playAudioFor", { word: word.script || word.meaning }));
    card.addEventListener("click", () => playWordAudio(word));
    card.addEventListener("keydown", event => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        playWordAudio(word);
    });

    const script = document.createElement("span");
    script.className = "deck-card-script";
    script.textContent = word.script;
    card.appendChild(script);

    if (languageHasHints() && word.romanization) {
        const roman = document.createElement("span");
        roman.className = "deck-card-roman";
        roman.textContent = word.romanization;
        card.appendChild(roman);
    }

    const meaning = document.createElement("span");
    meaning.className = "deck-card-meaning";
    meaning.textContent = word.meaning;
    card.appendChild(meaning);

    return card;
}

function playWordAudio(word) {
    const audioBaseUrl = (window.POLYTYPE_AUDIO_BASE_URL || "").replace(/\/+$/, "");
    const audioPrefix = (window.POLYTYPE_AUDIO_PREFIX || "audio/v1").replace(/^\/+|\/+$/g, "");
    if (!audioBaseUrl || !activeDeckMeta || !word.id) return;

    const url = [audioBaseUrl, audioPrefix, encodeURIComponent(activeDeckMeta.id), `${encodeURIComponent(word.id)}.mp3`].join("/");
    try {
        if (activeAudio) { activeAudio.pause(); activeAudio = null; }
        activeAudio = new Audio(url);
        activeAudio.play().catch(() => {});
    } catch {}
}
