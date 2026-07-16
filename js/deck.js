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

// Dungeon-door lock plate - a shield-shaped plate with corner rivets and a
// keyhole, heavier/more ornate than a plain padlock (Zelda Twilight
// Princess dungeon-door styling). Iron/bronze for a door with no key
// available; the same shape gets a gold treatment via CSS (.is-key-ready)
// when the player can afford to open it. Parts are classed so CSS can style
// the rivets/plate/keyhole slot independently.
const DOOR_LOCK_SVG =
    '<svg viewBox="0 0 24 24" aria-hidden="true">' +
    '<path class="dl-plate" d="M12 2.4 20.5 6v6.4c0 5-3.6 8.4-8.5 9.6-4.9-1.2-8.5-4.6-8.5-9.6V6L12 2.4Z"></path>' +
    '<circle class="dl-rivet" cx="6.2" cy="6.6" r="0.9"></circle>' +
    '<circle class="dl-rivet" cx="17.8" cy="6.6" r="0.9"></circle>' +
    '<circle class="dl-rivet" cx="6.2" cy="15.5" r="0.9"></circle>' +
    '<circle class="dl-rivet" cx="17.8" cy="15.5" r="0.9"></circle>' +
    '<circle class="dl-hole" cx="12" cy="11.4" r="3.1"></circle>' +
    '<path class="dl-slot" d="M12 12.6v2.6"></path>' +
    "</svg>";

// Same door plate, shackle open at the keyhole - signals "you hold a key
// that fits this door".
const DOOR_KEY_SVG =
    '<svg viewBox="0 0 24 24" aria-hidden="true">' +
    '<path class="dl-plate" d="M12 2.4 20.5 6v6.4c0 5-3.6 8.4-8.5 9.6-4.9-1.2-8.5-4.6-8.5-9.6V6L12 2.4Z"></path>' +
    '<circle class="dl-rivet" cx="6.2" cy="6.6" r="0.9"></circle>' +
    '<circle class="dl-rivet" cx="17.8" cy="6.6" r="0.9"></circle>' +
    '<circle class="dl-rivet" cx="6.2" cy="15.5" r="0.9"></circle>' +
    '<circle class="dl-rivet" cx="17.8" cy="15.5" r="0.9"></circle>' +
    '<circle class="dl-hole" cx="12" cy="11.4" r="3.1"></circle>' +
    '<path class="dl-slot" d="M12.9 9.6 15 7.5"></path>' +
    "</svg>";

// Classic fantasy key (ring + shaft + teeth) for the keys-held counter badge.
const KEY_SVG =
    '<svg viewBox="0 0 24 24" aria-hidden="true">' +
    '<circle class="k-ring" cx="7" cy="12" r="4.2"></circle>' +
    '<circle class="k-hole" cx="7" cy="12" r="1.4"></circle>' +
    '<path class="k-shaft" d="M10.6 12h10"></path>' +
    '<path class="k-tooth" d="M17 12v3"></path>' +
    '<path class="k-tooth" d="M20 12v2.4"></path>' +
    "</svg>";

const xpPerDrop = 50; // keep in sync with XP_PER_DROP in api/_lib.js
const maxKeys = 5; // keep in sync with MAX_KEYS in api/_lib.js

let activeDeckMeta = null;
let activeLanguage = FALLBACK_LANGUAGE;
let vocab = [];
let activeAudio = null;
let isConfirmingUnlock = false;
let pendingCourseKey = null;
let pendingUnlockWord = null;
let pendingKeysHeld = 0;

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
    el.keysIcon = document.getElementById("deck-keys-icon");
    el.keysCount = document.getElementById("deck-keys-count");
    el.emptyHint = document.getElementById("deck-empty-hint");
    el.groups = document.getElementById("deck-groups");
    el.unlockOverlay = document.getElementById("unlock-confirm-overlay");
    el.unlockBody = document.getElementById("unlock-confirm-body");
    el.unlockError = document.getElementById("unlock-confirm-error");
    el.unlockNoKeys = document.getElementById("unlock-confirm-no-keys");
    el.unlockConfirmBtn = document.getElementById("unlock-confirm-btn");
    el.unlockShopLink = document.getElementById("unlock-go-shop-link");
    if (el.keysIcon) el.keysIcon.innerHTML = KEY_SVG;

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

// Returns the active course's real unlocked-word set, migrating a legacy
// prefix-based local course (categoryIndex/categoryUnlocked, no
// unlockedWords array yet) on the fly using the exact same derivation the
// old auto-unlock model used - so a returning guest sees exactly the same
// words already unlocked, nothing reshuffled or reset.
function getCourseProgress() {
    const profile = getStoredProfile();
    const courses = profile.courses || {};
    const course = courses[activeLanguage] || (activeDeckMeta?.id && courses[activeDeckMeta.id]);

    if (!course) {
        return {
            courseKey: activeLanguage,
            xp: 0,
            unlockedWords: new Set(getSortedCategories()[0]?.wordSuffixes.slice(0, getStarterWordCount()) || []),
            purchasedKeys: 0
        };
    }

    const unlockedWords = Array.isArray(course.unlockedWords)
        ? new Set(course.unlockedWords)
        : getUnlockedWordSuffixesFromPrefix(
            Math.max(0, Math.trunc(Number(course.categoryIndex) || 0)),
            Math.max(0, Math.trunc(Number(course.categoryUnlocked) || 0))
        );

    return {
        courseKey: course.courseId || activeLanguage,
        xp: Math.max(0, Number(course.xp) || 0),
        unlockedWords,
        // Guests never have coins/shop access (sign-in required), so this is
        // always 0 for them in practice - just reading it defensively here.
        purchasedKeys: Math.max(0, Math.trunc(Number(course.purchasedKeys) || 0))
    };
}

// Legacy (pre-keys) unlock state was a contiguous prefix: every category
// before `categoryIndex` fully unlocked, plus the first `categoryUnlocked`
// suffixes of the category at `categoryIndex`. Mirrors the same migration
// logic in api/_lib.js, for guest/local courses that never round-trip
// through the server.
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

// Mirrors getKeysHeld() in api/_lib.js for the Deck page's own render pass.
function getKeysHeld(purchasedKeys) {
    return Math.max(0, Math.min(maxKeys, purchasedKeys || 0));
}

function getWordSuffix(wordId) {
    const match = /(\d+)$/.exec(wordId || "");
    return match ? Number.parseInt(match[0], 10) : 0;
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
        if (el.keysCount) el.keysCount.textContent = "";
        return;
    }

    const courseProgress = getCourseProgress();
    const { unlockedWords } = courseProgress;
    const keysHeld = getKeysHeld(courseProgress.purchasedKeys);
    const unlockedCount = vocab.filter(word => unlockedWords.has(getWordSuffix(word.id))).length;
    const pct = Math.round((unlockedCount / vocab.length) * 100);

    if (el.progressFill) el.progressFill.style.width = `${pct}%`;
    if (el.progressText) {
        el.progressText.textContent = tr("trainer.deckProgress", {
            unlocked: unlockedCount,
            total: vocab.length
        });
    }
    if (el.emptyHint) el.emptyHint.hidden = unlockedCount > 0;

    pendingCourseKey = courseProgress.courseKey;

    if (el.keysCount) {
        el.keysCount.textContent = tr("deck.keysBadge", { count: keysHeld });
    }
    document.getElementById("deck-keys-badge")?.classList.toggle("has-keys", keysHeld > 0);

    // Order each category's words by their actual unlock sequence
    // (category.wordSuffixes), not by CSV row order - the drop order is a
    // fixed shuffle (see scripts/generate-categories.cjs), so listing by
    // suffix number would show unlocked words scattered through the grid
    // instead of as a clean, in-order block at the top.
    const wordBySuffix = new Map();
    vocab.forEach(word => wordBySuffix.set(getWordSuffix(word.id), word));

    getSortedCategories().forEach(category => {
        const categoryWords = category.wordSuffixes
            .map(suffix => wordBySuffix.get(suffix))
            .filter(Boolean);
        if (!categoryWords.length) return;
        el.groups.appendChild(buildDeckGroup(category, categoryWords, unlockedWords, keysHeld));
    });
}

function buildDeckGroup(category, words, unlockedWords, keysHeld) {
    const total = words.length;
    const unlockedInCategory = words.filter(word => unlockedWords.has(getWordSuffix(word.id))).length;
    const isComplete = unlockedInCategory === total;

    const group = document.createElement("section");
    group.className = "deck-group";
    if (!isComplete) group.classList.add("is-locked");

    const head = document.createElement("div");
    head.className = "deck-group-head";

    const badge = document.createElement("span");
    badge.className = "deck-group-badge";
    badge.innerHTML = isComplete ? "&#10003;" : DOOR_LOCK_SVG;

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
    words.forEach(word => {
        const isUnlocked = unlockedWords.has(getWordSuffix(word.id));
        grid.appendChild(buildDeckCard(word, isUnlocked, keysHeld));
    });

    group.append(head, grid);
    return group;
}

// The player may open ANY currently-locked door (no forced order/category
// gating) as long as they hold at least one key - so, unlike the old
// sequential model, a card's own suffix (not some globally-computed "next"
// word) is exactly what gets unlocked when this specific card is clicked.
function buildDeckCard(word, isUnlocked, keysHeld) {
    const card = document.createElement("div");
    card.className = "deck-card";

    if (!isUnlocked) {
        const canOpen = keysHeld > 0;
        card.classList.add("is-locked");
        card.setAttribute("aria-label", canOpen ? tr("trainer.pendingWord") : tr("trainer.lockedWord"));

        const lock = document.createElement("span");
        lock.className = "deck-card-lock";
        lock.innerHTML = canOpen ? DOOR_KEY_SVG : DOOR_LOCK_SVG;
        card.append(lock);

        // Shown even while locked (unlike the script/pronunciation, which
        // stays hidden) so the player can pick which word to spend a key on
        // instead of unlocking blind.
        if (word.meaning) {
            const meaning = document.createElement("span");
            meaning.className = "deck-card-meaning";
            meaning.textContent = word.meaning;
            card.append(meaning);
        }

        if (canOpen) card.classList.add("is-key-ready");

        // Every locked card is clickable, even with 0 keys - the confirm
        // dialog itself tells the player they need to buy one instead of
        // the card just doing nothing (see openUnlockConfirm/setNoKeysState).
        card.setAttribute("role", "button");
        card.tabIndex = 0;
        card.addEventListener("click", () => openUnlockConfirm(word, keysHeld));
        card.addEventListener("keydown", event => {
            if (event.key !== "Enter" && event.key !== " ") return;
            event.preventDefault();
            openUnlockConfirm(word, keysHeld);
        });
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

function openUnlockConfirm(word, keysHeld) {
    if (!el.unlockOverlay || !word) return;

    pendingUnlockWord = word;
    pendingKeysHeld = keysHeld || 0;
    if (el.unlockBody) {
        el.unlockBody.textContent = tr("deck.confirmUnlockBody", {
            word: word.script,
            meaning: word.meaning
        });
    }
    setUnlockError("");
    setNoKeysState(pendingKeysHeld <= 0);

    el.unlockOverlay.hidden = false;
    requestAnimationFrame(() => el.unlockOverlay.classList.add("is-open"));
}

// With 0 keys, swap the Unlock button for a "Go to Shop" link and show an
// explanatory note instead - the player can still open the dialog and see
// why they can't unlock yet, rather than the card doing nothing at all.
function setNoKeysState(hasNoKeys) {
    if (el.unlockNoKeys) {
        el.unlockNoKeys.textContent = hasNoKeys ? tr("deck.noKeysMessage") : "";
        el.unlockNoKeys.hidden = !hasNoKeys;
    }
    if (el.unlockConfirmBtn) el.unlockConfirmBtn.hidden = hasNoKeys;
    if (el.unlockShopLink) el.unlockShopLink.hidden = !hasNoKeys;
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
    if (isConfirmingUnlock || !pendingCourseKey || !pendingUnlockWord || pendingKeysHeld <= 0) return;

    const wordSuffix = getWordSuffix(pendingUnlockWord.id);
    isConfirmingUnlock = true;
    if (el.unlockConfirmBtn) el.unlockConfirmBtn.disabled = true;
    setUnlockError("");

    try {
        if (window.PolytypeFirebase?.isSignedIn?.()) {
            await window.PolytypeFirebase.unlockWord(pendingCourseKey, wordSuffix);
        } else {
            confirmUnlockGuest(pendingCourseKey, wordSuffix);
        }
        closeUnlockConfirm(true);
    } catch (error) {
        setUnlockError(error?.message || tr("deck.unlockFailed"));
        // The server rejected this against state we don't have locally
        // (e.g. "already unlocked"/"no keys" while the cache still shows
        // the old numbers) - re-sync from the server so the deck reflects
        // reality right away instead of staying stuck showing stale cards.
        if (window.PolytypeFirebase?.isSignedIn?.()) {
            await window.PolytypeFirebase.refreshProfile?.();
        }
    } finally {
        isConfirmingUnlock = false;
        if (el.unlockConfirmBtn) el.unlockConfirmBtn.disabled = false;
    }
}

// Guest (signed-out) confirm path - no server round trip available, so this
// mutates localStorage["polytype-profile"] directly, matching the shape
// js/firebase-client.js's syncProfileToLocalStorage normally writes. Reuses
// getCourseProgress()'s migration so a legacy prefix-based local course gets
// converted to a real unlockedWords array at the same moment it's first
// spent against, rather than needing a separate migration path.
function confirmUnlockGuest(courseKey, wordSuffix) {
    const { unlockedWords } = getCourseProgress();
    if (unlockedWords.has(wordSuffix)) return;

    const nextUnlockedWords = [...unlockedWords, wordSuffix];
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
                unlockedWords: nextUnlockedWords,
                wordsUnlocked: nextUnlockedWords.length
            }
        }
    };

    localStorage.setItem(PROFILE_KEY, JSON.stringify(nextProfile));
    document.dispatchEvent(new CustomEvent("polytype-profile-updated", { detail: nextProfile }));
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
