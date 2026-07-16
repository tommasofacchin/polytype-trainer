const PROFILE_KEY = "polytype-profile";
const LANGUAGE_KEY = "polytype-language";
const FALLBACK_LANGUAGE = "norwegian";

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

// "Included"/"excluded from exercises" eye icon pair for the per-card
// practice toggle - same line-icon style (24x24 viewbox, currentColor
// stroke) as the rest of the app's inline SVGs.
const EYE_SVG =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"></path>' +
    '<circle cx="12" cy="12" r="3"></circle>' +
    "</svg>";
const EYE_OFF_SVG =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M3 3l18 18"></path>' +
    '<path d="M10.6 5.2C11 5.1 11.5 5 12 5c6.5 0 10 7 10 7a15.6 15.6 0 0 1-3.2 4.2M6.6 6.6C4 8.3 2 12 2 12s3.5 7 10 7c1.3 0 2.5-.2 3.6-.6"></path>' +
    '<path d="M9.5 9.5a3 3 0 0 0 4.2 4.2"></path>' +
    "</svg>";

const xpPerDrop = 50; // keep in sync with XP_PER_DROP in api/_lib.js
const maxKeys = 5; // keep in sync with MAX_KEYS in api/_lib.js
// Which unlocked words the player has chosen to exclude from exercises -
// entirely local/per-device by design (a lightweight practice preference,
// not game progression), stored separately from the profile cache so it's
// never wiped by a server profile refresh. Keyed by courseKey, same as
// unlockedWords/purchasedKeys elsewhere in this file.
const DISABLED_WORDS_KEY = "polytype-disabled-words";

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

function initDeckPage() {
    el.progressFill = document.getElementById("deck-progress-fill");
    el.progressText = document.getElementById("deck-progress-text");
    el.groups = document.getElementById("deck-groups");
    el.unlockOverlay = document.getElementById("unlock-confirm-overlay");
    el.unlockBody = document.getElementById("unlock-confirm-body");
    el.unlockError = document.getElementById("unlock-confirm-error");
    el.unlockNoKeys = document.getElementById("unlock-confirm-no-keys");
    el.unlockConfirmBtn = document.getElementById("unlock-confirm-btn");

    resolveActiveLanguage();
    setupUnlockConfirm();
    loadDeck();

    // Delegated through js/router.js's shared hook slot instead of a direct
    // document-level listener - see main.js's identical comment for why.
    window.__polytypePageHooks = window.__polytypePageHooks || {};
    window.__polytypePageHooks.onLanguageChanged = renderDeck;
    window.__polytypePageHooks.onProfileUpdated = renderDeck;
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

// The study-language switcher now lives only in the shared header
// (app-shell.js's flag menu, which reloads the page on change) - this page
// just needs to read whichever language that left in localStorage.
function resolveActiveLanguage() {
    const languages = getAvailableLanguages();
    const savedLanguage = localStorage.getItem(LANGUAGE_KEY);
    activeLanguage = languages.includes(savedLanguage) ? savedLanguage : (languages[0] || FALLBACK_LANGUAGE);
}

function getLanguageLabel(language) {
    return window.PolytypeI18n?.languageLabel?.(language) || language;
}

async function loadDeck() {
    const decks = window.DECK_INDEX || [];
    activeDeckMeta = decks.find(deck => deck.language === activeLanguage) || decks[0] || null;

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

function getDisabledWordsMap() {
    try {
        return JSON.parse(localStorage.getItem(DISABLED_WORDS_KEY)) || {};
    } catch {
        return {};
    }
}

function getDisabledWords(courseKey) {
    return new Set(getDisabledWordsMap()[courseKey] || []);
}

function toggleWordDisabled(courseKey, suffix) {
    const map = getDisabledWordsMap();
    const current = new Set(map[courseKey] || []);
    if (current.has(suffix)) current.delete(suffix); else current.add(suffix);
    map[courseKey] = [...current];
    localStorage.setItem(DISABLED_WORDS_KEY, JSON.stringify(map));
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
    const disabledWords = getDisabledWords(courseProgress.courseKey);
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
    pendingCourseKey = courseProgress.courseKey;

    // category.wordSuffixes is a fixed shuffle (see scripts/generate-
    // categories.cjs) - it decides which key-spend order words unlock in,
    // not display order, and several files (this one's own migration path,
    // js/main.js, js/dictate.js, js/memory.js, js/sprint.js, api/_lib.js)
    // rely on its exact ordering for legacy-course/starter-word logic, so
    // it must never be reordered itself. For DISPLAY, sort by suffix
    // (word_id) ascending instead - words were originally authored in CSV
    // row order for a reason (numbers as 1,2,3..., pronouns as io/tu/lui/
    // lei/noi/voi/loro...), and the shuffle was otherwise just scrambling
    // that for no display benefit.
    const wordBySuffix = new Map();
    vocab.forEach(word => wordBySuffix.set(getWordSuffix(word.id), word));

    getSortedCategories().forEach(category => {
        const categoryWords = category.wordSuffixes
            .map(suffix => wordBySuffix.get(suffix))
            .filter(Boolean)
            .sort((a, b) => getWordSuffix(a.id) - getWordSuffix(b.id));
        if (!categoryWords.length) return;
        el.groups.appendChild(buildDeckGroup(category, categoryWords, unlockedWords, disabledWords, keysHeld, courseProgress.courseKey));
    });
}

function buildDeckGroup(category, words, unlockedWords, disabledWords, keysHeld, courseKey) {
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
        const isDisabled = disabledWords.has(getWordSuffix(word.id));
        grid.appendChild(buildDeckCard(word, isUnlocked, isDisabled, keysHeld, courseKey));
    });

    group.append(head, grid);
    return group;
}

// The player may open ANY currently-locked door (no forced order/category
// gating) as long as they hold at least one key - so, unlike the old
// sequential model, a card's own suffix (not some globally-computed "next"
// word) is exactly what gets unlocked when this specific card is clicked.
function buildDeckCard(word, isUnlocked, isDisabled, keysHeld, courseKey) {
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

    card.classList.toggle("is-disabled", isDisabled);
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

    // Separate control from the card's own click (which plays the word's
    // audio) - toggles whether this word turns up in Trainer/Sprint/Dictate/
    // Memory sessions, without touching its unlock state.
    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "deck-card-toggle";
    toggle.innerHTML = isDisabled ? EYE_OFF_SVG : EYE_SVG;
    toggle.setAttribute("aria-pressed", String(!isDisabled));
    toggle.setAttribute("aria-label", isDisabled ? tr("deck.enableWord") : tr("deck.disableWord"));
    toggle.title = isDisabled ? tr("deck.enableWord") : tr("deck.disableWord");
    toggle.addEventListener("click", event => {
        event.stopPropagation();
        toggleWordDisabled(courseKey, getWordSuffix(word.id));
        renderDeck();
    });
    card.appendChild(toggle);

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

// With 0 keys, hide the Unlock button and show an explanatory note instead
// - the player can still open the dialog and see why they can't unlock
// yet, rather than the card doing nothing at all.
function setNoKeysState(hasNoKeys) {
    if (el.unlockNoKeys) {
        el.unlockNoKeys.textContent = hasNoKeys ? tr("deck.noKeysMessage") : "";
        el.unlockNoKeys.hidden = !hasNoKeys;
    }
    if (el.unlockConfirmBtn) el.unlockConfirmBtn.hidden = hasNoKeys;
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

// Runs after every function/let/const above is defined - same reasoning as
// js/app-shell.js and js/main.js.
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initDeckPage, { once: true });
} else {
    initDeckPage();
}
