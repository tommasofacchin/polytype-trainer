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

// Open-shackle padlock - distinguishes a "ready to unlock" card from a fully
// locked one (LOCK_SVG's closed shackle) at a glance.
const UNLOCK_SVG =
    '<svg viewBox="0 0 24 24" aria-hidden="true">' +
    '<rect x="4.5" y="10.5" width="15" height="10" rx="2.4"></rect>' +
    '<path d="M8 10.5V8a4 4 0 0 1 7.4-2.2"></path>' +
    '<circle cx="12" cy="15" r="1.5"></circle>' +
    "</svg>";

const xpPerDrop = 50; // keep in sync with XP_PER_DROP in api/_lib.js
const maxPendingWords = 5; // keep in sync with MAX_PENDING_WORDS in api/_lib.js

let activeDeckMeta = null;
let activeLanguage = FALLBACK_LANGUAGE;
let vocab = [];
let activeAudio = null;
let isConfirmingUnlock = false;
let pendingCourseKey = null;
let nextPendingWord = null;

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
    el.pendingSummary = document.getElementById("deck-pending-summary");
    el.emptyHint = document.getElementById("deck-empty-hint");
    el.groups = document.getElementById("deck-groups");
    el.unlockOverlay = document.getElementById("unlock-confirm-overlay");
    el.unlockBody = document.getElementById("unlock-confirm-body");
    el.unlockError = document.getElementById("unlock-confirm-error");
    el.unlockConfirmBtn = document.getElementById("unlock-confirm-btn");

    setupLanguageMenu();
    setupUnlockConfirm();
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
        return { courseKey: activeLanguage, categoryIndex: 0, categoryUnlocked: getStarterWordCount(), xp: 0 };
    }

    return {
        courseKey: course.courseId || activeLanguage,
        categoryIndex: Math.max(0, Math.trunc(Number(course.categoryIndex) || 0)),
        categoryUnlocked: Math.max(0, Math.trunc(Number(course.categoryUnlocked) || 0)),
        xp: Math.max(0, Number(course.xp) || 0)
    };
}

// Mirrors getEarnedWordTotal()/getPendingWordCount() in api/_lib.js for the
// Deck page's own render pass.
function getEarnedWordTotal(courseXp, confirmedTotal) {
    const totalWords = getSortedCategories().reduce((sum, category) => sum + category.size, 0);
    const xpEarned = Math.min(totalWords, Math.floor(courseXp / xpPerDrop));
    return Math.max(confirmedTotal, xpEarned);
}

function getPendingWordCount(courseXp, confirmedTotal) {
    return Math.max(0, Math.min(maxPendingWords, getEarnedWordTotal(courseXp, confirmedTotal) - confirmedTotal));
}

// Flattened suffix -> global unlock-order rank across every category, in the
// fixed shuffle order (decks/categories.js). Ported from js/main.js.
function getWordDropRanks() {
    const ranks = new Map();
    let rank = 0;

    getSortedCategories().forEach(category => {
        category.wordSuffixes.forEach(suffix => {
            ranks.set(suffix, rank);
            rank += 1;
        });
    });

    return ranks;
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
        if (el.pendingSummary) el.pendingSummary.hidden = true;
        return;
    }

    const courseProgress = getCategoryProgress();
    const { categoryIndex, categoryUnlocked } = courseProgress;
    const unlockedSuffixes = getUnlockedWordSuffixes(categoryIndex, categoryUnlocked);
    const confirmedTotal = unlockedSuffixes.size;
    const pendingCount = getPendingWordCount(courseProgress.xp, confirmedTotal);
    const dropRanks = getWordDropRanks();
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

    // Order each category's words by their actual unlock sequence
    // (category.wordSuffixes), not by CSV row order - the drop order is a
    // fixed shuffle (see scripts/generate-categories.cjs), so listing by
    // suffix number would show unlocked words scattered through the grid
    // instead of as a clean, in-order block at the top.
    const wordBySuffix = new Map();
    vocab.forEach(word => wordBySuffix.set(getWordSuffix(word.id), word));

    pendingCourseKey = courseProgress.courseKey;
    nextPendingWord = findNextPendingWord(wordBySuffix, dropRanks, confirmedTotal, pendingCount);

    if (el.pendingSummary) {
        el.pendingSummary.hidden = pendingCount <= 0;
        if (pendingCount > 0) {
            el.pendingSummary.textContent = tr("deck.pendingSummary", { count: pendingCount });
        }
    }

    function getCardState(word) {
        const rank = dropRanks.get(getWordSuffix(word.id));
        if (rank === undefined) return "locked";
        if (rank < confirmedTotal) return "unlocked";
        if (rank < confirmedTotal + pendingCount) return "pending";
        return "locked";
    }

    getSortedCategories().forEach(category => {
        const categoryWords = category.wordSuffixes
            .map(suffix => wordBySuffix.get(suffix))
            .filter(Boolean);
        if (!categoryWords.length) return;
        el.groups.appendChild(buildDeckGroup(category, categoryWords, categoryIndex, unlockedSuffixes, getCardState));
    });
}

// Picks the word that will actually unlock next (lowest unlock-order rank
// among the pending band) - since unlocking is strictly sequential, clicking
// any of the (up to 5) pending cards always confirms this same word.
function findNextPendingWord(wordBySuffix, dropRanks, confirmedTotal, pendingCount) {
    if (pendingCount <= 0) return null;

    let best = null;
    let bestRank = Infinity;
    wordBySuffix.forEach((word, suffix) => {
        const rank = dropRanks.get(suffix);
        if (rank === undefined || rank < confirmedTotal || rank >= confirmedTotal + pendingCount) return;
        if (rank < bestRank) {
            bestRank = rank;
            best = word;
        }
    });
    return best;
}

function buildDeckGroup(category, words, courseCategoryIndex, unlockedSuffixes, getCardState) {
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
    words.forEach(word => grid.appendChild(buildDeckCard(word, getCardState(word))));

    group.append(head, grid);
    return group;
}

function buildDeckCard(word, cardState) {
    const card = document.createElement("div");
    card.className = "deck-card";

    if (cardState === "locked") {
        card.classList.add("is-locked");
        card.setAttribute("aria-label", tr("trainer.lockedWord"));
        const lock = document.createElement("span");
        lock.className = "deck-card-lock";
        lock.innerHTML = LOCK_SVG;
        card.append(lock);
        return card;
    }

    if (cardState === "pending") {
        card.classList.add("is-pending");
        card.setAttribute("role", "button");
        card.tabIndex = 0;
        card.setAttribute("aria-label", tr("trainer.pendingWord"));
        card.addEventListener("click", openUnlockConfirm);
        card.addEventListener("keydown", event => {
            if (event.key !== "Enter" && event.key !== " ") return;
            event.preventDefault();
            openUnlockConfirm();
        });
        const lock = document.createElement("span");
        lock.className = "deck-card-lock is-pending";
        lock.innerHTML = UNLOCK_SVG;
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

function setupUnlockConfirm() {
    if (!el.unlockOverlay) return;

    el.unlockOverlay.querySelectorAll("[data-unlock-cancel]").forEach(node => {
        node.addEventListener("click", () => closeUnlockConfirm());
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && !el.unlockOverlay.hidden) closeUnlockConfirm();
    });

    el.unlockConfirmBtn?.addEventListener("click", confirmUnlock);
}

function openUnlockConfirm() {
    if (!el.unlockOverlay || !nextPendingWord) return;

    if (el.unlockBody) {
        el.unlockBody.textContent = tr("deck.confirmUnlockBody", {
            word: nextPendingWord.script,
            meaning: nextPendingWord.meaning
        });
    }
    setUnlockError("");

    el.unlockOverlay.hidden = false;
    requestAnimationFrame(() => el.unlockOverlay.classList.add("is-open"));
}

// `force` bypasses the in-flight guard for the programmatic close after a
// successful unlock; without it, this also serves as the cancel/backdrop/
// Escape handler, which should NOT close the dialog while a request is
// still in flight.
function closeUnlockConfirm(force) {
    if (!el.unlockOverlay || (isConfirmingUnlock && !force)) return;

    el.unlockOverlay.classList.remove("is-open");
    window.setTimeout(() => { el.unlockOverlay.hidden = true; }, 240);
}

function setUnlockError(message) {
    if (!el.unlockError) return;
    el.unlockError.textContent = message;
    el.unlockError.hidden = !message;
}

async function confirmUnlock() {
    if (isConfirmingUnlock || !pendingCourseKey) return;

    isConfirmingUnlock = true;
    if (el.unlockConfirmBtn) el.unlockConfirmBtn.disabled = true;
    setUnlockError("");

    try {
        if (window.PolytypeFirebase?.isSignedIn?.()) {
            await window.PolytypeFirebase.unlockWord(pendingCourseKey);
        } else {
            confirmUnlockGuest(pendingCourseKey);
        }
        closeUnlockConfirm(true);
    } catch (error) {
        setUnlockError(error?.message || tr("deck.unlockFailed"));
    } finally {
        isConfirmingUnlock = false;
        if (el.unlockConfirmBtn) el.unlockConfirmBtn.disabled = false;
    }
}

// Guest (signed-out) confirm path - no server round trip available, so this
// mutates localStorage["polytype-profile"] directly, matching the shape
// js/firebase-client.js's syncProfileToLocalStorage normally writes.
function confirmUnlockGuest(courseKey) {
    const { categoryIndex, categoryUnlocked } = getCategoryProgress();
    const stepped = advanceCategoryStateByOne(categoryIndex, categoryUnlocked);

    const profile = getStoredProfile();
    const courses = profile.courses || {};
    const existing = courses[courseKey] || {};

    const nextProfile = {
        ...profile,
        courses: {
            ...courses,
            [courseKey]: {
                ...existing,
                courseId: courseKey,
                categoryIndex: stepped.categoryIndex,
                categoryUnlocked: stepped.categoryUnlocked,
                wordsUnlocked: stepped.totalWordsUnlocked
            }
        }
    };

    localStorage.setItem(PROFILE_KEY, JSON.stringify(nextProfile));
    document.dispatchEvent(new CustomEvent("polytype-profile-updated", { detail: nextProfile }));
}

// Mirrors stepCategoryProgress() in api/_lib.js for the signed-out/local-only
// confirm path (no server round trip available there).
function advanceCategoryStateByOne(categoryIndex, categoryUnlocked) {
    const categories = getSortedCategories();
    let index = Math.min(categoryIndex, categories.length - 1);
    let unlocked = categoryUnlocked;
    let remaining = 1;

    while (remaining > 0 && index < categories.length) {
        const capacity = categories[index].size - unlocked;
        if (remaining < capacity) {
            unlocked += remaining;
            remaining = 0;
        } else {
            remaining -= capacity;
            index += 1;
            unlocked = 0;
        }
    }

    if (index >= categories.length) {
        index = categories.length - 1;
        unlocked = categories[index].size;
    }

    return {
        categoryIndex: index,
        categoryUnlocked: unlocked,
        totalWordsUnlocked: getUnlockedWordCountForCategoryState(index, unlocked)
    };
}

function getUnlockedWordCountForCategoryState(categoryIndex, categoryUnlocked) {
    const categories = getSortedCategories();
    let total = 0;
    for (let i = 0; i < categoryIndex && i < categories.length; i += 1) {
        total += categories[i].size;
    }
    return total + Math.max(0, categoryUnlocked);
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
