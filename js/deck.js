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
let pendingCourseKey = null;
let pendingUnlockWord = null;
let pendingKeysHeld = 0;
// Word suffix whose card should break its lock open on the next render pass.
// Set just before the local unlock write, consumed (and cleared) by the first
// render that draws that card unlocked - which is the one that write's own
// profile update triggers - so the burst plays exactly once, on exactly the
// right card, on the click rather than a round trip later.
let justUnlockedSuffix = null;
// renderDeck() rebuilds every card from scratch (replaceChildren), so a render
// that lands while the unlock burst is playing tears the animating card out
// mid-flight and puts a finished-looking one in its place - the animation just
// stops and snaps to the unlocked card. Any profile update at all does that,
// and an unlock is exactly the moment profile updates are in flight. So while
// a burst is running, renders are deferred rather than dropped: the flag below
// records that one was wanted, and it runs the moment the burst is done.
let unlockBurstEndsAt = 0;
let deckRenderDeferred = false;

const el = {};

function tr(key, params = {}) {
    return window.PolytypeI18n?.t?.(key, params) || key;
}

function initDeckPage() {
    el.progressFill = document.getElementById("deck-progress-fill");
    el.progressText = document.getElementById("deck-progress-text");
    el.masteredText = document.getElementById("deck-mastered-text");
    el.groups = document.getElementById("deck-groups");
    el.unlockOverlay = document.getElementById("unlock-confirm-overlay");
    el.unlockBody = document.getElementById("unlock-confirm-body");
    el.unlockError = document.getElementById("unlock-confirm-error");
    el.unlockNoKeys = document.getElementById("unlock-confirm-no-keys");
    el.unlockConfirmBtn = document.getElementById("unlock-confirm-btn");
    el.detailOverlay = document.getElementById("word-detail-overlay");
    el.detailScript = document.getElementById("word-detail-script");
    el.detailRoman = document.getElementById("word-detail-roman");
    el.detailMeaning = document.getElementById("word-detail-meaning");
    el.detailAudioBtn = document.getElementById("word-detail-audio");
    el.detailExamples = document.getElementById("word-detail-example-list");
    el.detailNoExamples = document.getElementById("word-detail-no-examples");

    resolveActiveLanguage();
    setupUnlockConfirm();
    setupWordDetail();
    preloadUnlockSfx();
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

    // Goes through the shared window-level cache (js/deck-cache.js) instead
    // of fetching directly. On a revisit peek() returns the parsed rows right
    // here, in this same frame - no fetch, no parse, and crucially no await,
    // so the page never gets a chance to commit an empty first paint. That
    // empty-then-populated flash on every single visit is what this fixes.
    const cache = window.PolytypeDeckCache;
    const alreadyLoaded = cache?.peek(activeDeckMeta);

    if (alreadyLoaded) {
        vocab = alreadyLoaded;
        renderDeck();
        return;
    }

    try {
        vocab = await cache.load(activeDeckMeta);
    } catch {
        vocab = [];
    }

    renderDeck();
    playDemoUnlock();
}

// ?demo=unlock (from the Home debug card): replays the lock-breaking burst on
// a word that is *already* unlocked, so the animation can be reviewed without
// spending a key or moving progression. Nothing is written anywhere - this
// just arms the same flag a real unlock sets and re-renders.
function playDemoUnlock() {
    if (new URLSearchParams(window.location.search).get("demo") !== "unlock") return;

    const { unlockedWords } = getCourseProgress();
    const word = vocab.find(item => unlockedWords.has(getWordSuffix(item.id)));
    if (!word) return;

    justUnlockedSuffix = getWordSuffix(word.id);
    renderDeck();

    // The starter words sit at the top of the first category, but the deck is
    // taller than the viewport - without this the burst would play off-screen.
    const card = el.groups?.querySelector(".deck-card.is-just-unlocked");
    card?.scrollIntoView({ block: "center", behavior: "auto" });
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

// Practice toggles are keyed by study language - which is what js/main.js,
// js/sprint.js, js/dictate.js and js/memory.js all read this store by.
//
// This page used to key them by getCourseProgress().courseKey instead, and
// that key is not stable: it falls back to the language while the profile
// cache is still empty, then switches to the course's own courseId once the
// profile lands. So a word disabled before that switch got written under one
// key and read back under another - it appeared to turn itself back on a
// moment later - and while the mismatch lasted the games never saw it at all,
// since they were reading the language key the whole time.
function getDisabledWordsKey() {
    return activeLanguage;
}

// Folds anything written under the old unstable keys back into the language
// one, so toggles made before this fix aren't silently lost. Idempotent: once
// the aliases are gone there's nothing left to move.
function migrateDisabledWordsKey() {
    const map = getDisabledWordsMap();
    const target = getDisabledWordsKey();
    const aliases = [activeDeckMeta?.id, getCourseProgress().courseKey]
        .filter(key => key && key !== target && Array.isArray(map[key]));
    if (!aliases.length) return;

    const merged = new Set(map[target] || []);
    aliases.forEach(key => {
        map[key].forEach(suffix => merged.add(suffix));
        delete map[key];
    });
    map[target] = [...merged];
    localStorage.setItem(DISABLED_WORDS_KEY, JSON.stringify(map));
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
            purchasedKeys: 0,
            wordsMastered: 0
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
        purchasedKeys: Math.max(0, Math.trunc(Number(course.purchasedKeys) || 0)),
        wordsMastered: Math.max(0, Math.trunc(Number(course.wordsMastered) || 0))
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

    if (Date.now() < unlockBurstEndsAt) {
        deckRenderDeferred = true;
        return;
    }

    el.groups.replaceChildren();

    if (!vocab.length) {
        const empty = document.createElement("p");
        empty.className = "deck-empty";
        empty.textContent = tr("trainer.noWordsLoaded");
        el.groups.appendChild(empty);
        if (el.progressFill) el.progressFill.style.width = "0%";
        if (el.progressText) el.progressText.textContent = "";
        if (el.masteredText) el.masteredText.textContent = "";
        if (el.keysCount) el.keysCount.textContent = "";
        return;
    }

    const courseProgress = getCourseProgress();
    const { unlockedWords } = courseProgress;
    migrateDisabledWordsKey();
    const disabledWords = getDisabledWords(getDisabledWordsKey());
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
    // wordsMastered only ever grows once a word's been answered correctly
    // WORD_MASTERY_THRESHOLD times (see api/_lib.js's applyWordResults) -
    // hidden until at least one word has actually crossed that bar, rather
    // than cluttering a brand-new course's page with a "0 mastered" line.
    if (el.masteredText) {
        el.masteredText.textContent = courseProgress.wordsMastered > 0
            ? tr("deck.wordsMastered", { count: courseProgress.wordsMastered })
            : "";
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
        // Not courseProgress.courseKey - the toggle must write under the same
        // stable key everything else reads. See getDisabledWordsKey.
        el.groups.appendChild(buildDeckGroup(category, categoryWords, unlockedWords, disabledWords, keysHeld, getDisabledWordsKey()));
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
    card.setAttribute("aria-label", tr("deck.openWord", { word: word.script || word.meaning }));
    card.addEventListener("click", () => openWordDetail(word));
    card.addEventListener("keydown", event => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        openWordDetail(word);
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

    // Appended last so the burst layers over the card's own content while it
    // plays (it's pointer-events: none, so the card stays clickable through it).
    if (justUnlockedSuffix === getWordSuffix(word.id)) {
        justUnlockedSuffix = null;
        card.classList.add("is-just-unlocked");
        card.appendChild(buildUnlockBurst());
        startUnlockBurstWindow();
    }

    return card;
}

// Holds off deck re-renders for as long as the burst needs the card to stay
// put: 240ms of --dub-delay plus dub-half's 700ms, with a little slack. Any
// render that arrives meanwhile is replayed here the moment the window closes,
// so nothing is lost - a coin balance or key count that changed during the
// animation still lands, just a beat later.
const UNLOCK_BURST_WINDOW_MS = 1100;

function startUnlockBurstWindow() {
    // Fired here rather than at confirm time so it lands with the lock
    // actually breaking, and so the ?demo=unlock replay gets it too - this
    // runs exactly once per burst, from whichever path drew it.
    playUnlockSfx();
    unlockBurstEndsAt = Date.now() + UNLOCK_BURST_WINDOW_MS;
    window.setTimeout(() => {
        unlockBurstEndsAt = 0;
        if (!deckRenderDeferred) return;
        deckRenderDeferred = false;
        renderDeck();
    }, UNLOCK_BURST_WINDOW_MS);
}

// The door plate cracking open: the same DOOR_LOCK_SVG drawn twice, each copy
// clipped by CSS to one half of the plate, thrown apart in a flash and a
// spray of shards. Every shard is one keyframe pair aimed by its own --a
// angle. Purely decorative and self-removing, so a re-render mid-flight
// (profile refresh, language change) simply drops it on the floor.
function buildUnlockBurst() {
    const shardCount = 7;
    const shards = Array.from({ length: shardCount }, (unused, i) => {
        const angle = Math.round((360 / shardCount) * i + (i % 2 ? 14 : 0));
        const distance = 30 + (i % 3) * 7;
        return `<span class="dub-shard" style="--a: ${angle}deg; --d: ${distance}px"></span>`;
    }).join("");

    const burst = document.createElement("span");
    burst.className = "deck-unlock-burst";
    burst.setAttribute("aria-hidden", "true");
    burst.innerHTML =
        '<span class="dub-flash"></span>' +
        '<span class="dub-ring"></span>' +
        `<span class="dub-half is-left">${DOOR_LOCK_SVG}</span>` +
        `<span class="dub-half is-right">${DOOR_LOCK_SVG}</span>` +
        shards;

    // Removed when the longest piece (dub-half, 700ms after the 240ms wait)
    // actually finishes, NOT on a wall clock started here. A fixed timer runs
    // from the moment this node is built, while the animation only starts once
    // it has been inserted and painted - so any hitch in between (a big deck
    // rebuild, a slow frame, a backgrounded tab) came straight out of the
    // animation's tail and chopped the ending off.
    // Safety net for the cases where that event never comes at all: reduced
    // motion (the burst is display:none, so nothing animates) or a tab
    // backgrounded before the first frame. Deliberately far out - it must
    // never be what ends a burst that is still legitimately playing.
    const failsafe = window.setTimeout(() => burst.remove(), 5000);

    const lastPiece = burst.querySelector(".dub-half.is-right");
    lastPiece?.addEventListener("animationend", () => {
        window.clearTimeout(failsafe);
        burst.remove();
    }, { once: true });

    return burst;
}

// ---- Word detail: the flashcard, opened big -----------------------------
// Audio only plays from the button in the card, never automatically on open -
// tapping a card to read it shouldn't force the pronunciation to start too.

function setupWordDetail() {
    if (!el.detailOverlay) return;

    el.detailOverlay.querySelectorAll("[data-word-detail-close]").forEach(node => {
        node.addEventListener("click", () => closeWordDetail());
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && !el.detailOverlay.hidden) closeWordDetail();
    });
}

function openWordDetail(word) {
    if (!el.detailOverlay || !word) return;

    if (el.detailScript) el.detailScript.textContent = word.script || "";
    if (el.detailMeaning) el.detailMeaning.textContent = word.meaning || "";
    if (el.detailRoman) {
        const romanization = languageHasHints() ? word.romanization : "";
        el.detailRoman.textContent = romanization || "";
        el.detailRoman.hidden = !romanization;
    }

    // Rebound every open rather than once at setup: the handler closes over
    // whichever word this is, and there is only ever one card on screen.
    if (el.detailAudioBtn) {
        el.detailAudioBtn.onclick = () => playWordAudio(word);
        el.detailAudioBtn.hidden = !getWordAudioUrl(word);
    }

    renderWordExamples(word);

    el.detailOverlay.hidden = false;
    requestAnimationFrame(() => el.detailOverlay.classList.add("is-open"));
}

function closeWordDetail() {
    if (!el.detailOverlay) return;

    el.detailOverlay.classList.remove("is-open");
    window.setTimeout(() => { el.detailOverlay.hidden = true; }, 240);
}

function renderWordExamples(word) {
    if (!el.detailExamples) return;

    const examples = window.DECK_EXAMPLES?.[activeLanguage]?.[getWordSuffix(word.id)] || [];
    if (el.detailNoExamples) el.detailNoExamples.hidden = examples.length > 0;

    el.detailExamples.replaceChildren(
        ...examples.map(example => {
            const item = document.createElement("li");
            item.className = "word-detail-example";

            const text = document.createElement("span");
            text.className = "word-detail-example-text";
            text.replaceChildren(...renderExampleText(example.text));
            item.appendChild(text);

            // Chinese/Japanese only, and only when the entry carries one -
            // a sentence in a script with no spaces is unreadable at this
            // level without it.
            if (example.romanization && languageHasHints()) {
                const roman = document.createElement("span");
                roman.className = "word-detail-example-roman";
                roman.replaceChildren(...renderExampleText(example.romanization));
                item.appendChild(roman);
            }

            const translation = document.createElement("span");
            translation.className = "word-detail-example-translation";
            translation.textContent = example.translation || "";
            item.appendChild(translation);

            return item;
        })
    );
}

// Splits an asterisk-marked sentence into nodes: every odd-numbered piece was
// between a pair of asterisks, so that is the run to highlight. Built as real
// nodes rather than an innerHTML string - the sentences are data, and a word
// with a "<" in it should never become markup.
function renderExampleText(text) {
    return String(text || "").split("*").map((piece, index) => {
        if (index % 2 === 0) return document.createTextNode(piece);
        const mark = document.createElement("mark");
        mark.textContent = piece;
        return mark;
    });
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

    // Head start on the word's audio: the file downloads while the player
    // reads the dialog, so it's there by the time the card exists to be
    // tapped. Free when they cancel - the bytes just sit in the HTTP cache.
    preloadWordAudio(word);

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

// Serves both the cancel/backdrop/Escape handler and the programmatic close on
// confirm. No in-flight guard any more: confirmUnlock applies the unlock
// locally and only then posts it, so the dialog is never waiting on anything.
function closeUnlockConfirm() {
    if (!el.unlockOverlay) return;

    el.unlockOverlay.classList.remove("is-open");
    window.setTimeout(() => { el.unlockOverlay.hidden = true; }, 240);
}

function setUnlockError(message) {
    if (!el.unlockError) return;
    el.unlockError.textContent = message;
    el.unlockError.hidden = !message;
}

// The unlock lands locally on the click and goes to the server behind it.
// Waiting on the round trip meant the dialog sat there with a dead button and
// the card only broke open once the server had agreed - a second or more of
// nothing for an action the player had already committed to. Same trade as the
// shop's key purchase (js/shop.js): the POST still has the final word, and a
// rejection re-syncs and explains itself.
function confirmUnlock() {
    if (!pendingCourseKey || !pendingUnlockWord || pendingKeysHeld <= 0) return;

    const courseKey = pendingCourseKey;
    const word = pendingUnlockWord;
    const wordSuffix = getWordSuffix(word.id);

    // Consumed straight away so the second tap of a double-tap can't spend a
    // second key on the same card while the dialog is still on its way out.
    pendingUnlockWord = null;
    setUnlockError("");

    // Armed before the local write below, which re-renders from inside its own
    // profile-updated dispatch - arming it afterwards would be too late, the
    // card would already have been drawn unlocked and burstless.
    justUnlockedSuffix = wordSuffix;

    // The card's audio is already downloading - openUnlockConfirm started it
    // when this dialog opened, so it's warm by the time the card exists.
    unlockWordLocally(courseKey, wordSuffix);
    closeUnlockConfirm();

    // Guests have no server state to send this to - the local write above is
    // the whole unlock for them.
    if (!window.PolytypeFirebase?.isSignedIn?.()) return;

    sendUnlock(courseKey, wordSuffix, word);
}

// Deliberately not awaited by confirmUnlock: nothing on screen is waiting for
// it. Out-of-order replies are already handled upstream - applyProgressToProfile
// (js/firebase-client.js) drops any course reply carrying fewer unlocked words
// than the cache already has, which is exactly what a reply that lost the race
// against a newer unlock looks like.
async function sendUnlock(courseKey, wordSuffix, word) {
    try {
        await window.PolytypeFirebase.unlockWord(courseKey, wordSuffix);
    } catch (error) {
        // Refused (already unlocked, no keys left, offline). The re-sync undoes
        // the optimistic unlock - card back to locked, key back on the badge -
        // and the dialog returns carrying the reason, so the player isn't left
        // watching a card quietly re-lock itself with no explanation.
        await window.PolytypeFirebase.refreshProfile?.();
        justUnlockedSuffix = null;
        openUnlockConfirm(word, getKeysHeld(getCourseProgress().purchasedKeys));
        setUnlockError(error?.message || tr("deck.unlockFailed"));
    }
}

// Applies an unlock to localStorage["polytype-profile"] - word into
// unlockedWords, one key off purchasedKeys - and hands the result to everything
// that paints from it (this page, the header's key badge), matching the shape
// js/firebase-client.js's syncProfileToLocalStorage writes.
//
// This is both the optimistic write for a signed-in unlock and the *entire*
// unlock for a guest, who has no server state to sync with. Reuses
// getCourseProgress()'s migration so a legacy prefix-based local course gets
// converted to a real unlockedWords array at the same moment it's first spent
// against, rather than needing a separate migration path.
function unlockWordLocally(courseKey, wordSuffix) {
    const { unlockedWords } = getCourseProgress();
    if (unlockedWords.has(wordSuffix)) return;

    const nextUnlockedWords = [...unlockedWords, wordSuffix];
    const profile = getStoredProfile();
    const courses = profile.courses || {};
    // Write back to the entry getCourseProgress read from: a legacy cache can
    // be filed under the deck id rather than the language.
    const cacheKey = courses[activeLanguage]
        ? activeLanguage
        : (activeDeckMeta?.id && courses[activeDeckMeta.id] ? activeDeckMeta.id : courseKey);
    const existing = courses[cacheKey] || {};

    const nextProfile = {
        ...profile,
        courses: {
            ...courses,
            [cacheKey]: {
                ...existing,
                courseId: courseKey,
                unlockedWords: nextUnlockedWords,
                wordsUnlocked: nextUnlockedWords.length,
                purchasedKeys: Math.max(0, (Number(existing.purchasedKeys) || 0) - 1)
            }
        }
    };

    localStorage.setItem(PROFILE_KEY, JSON.stringify(nextProfile));
    document.dispatchEvent(new CustomEvent("polytype-profile-updated", { detail: nextProfile }));
}

// ── Unlock sound ─────────────────────────────────────────────────────────
// The lock breaking has a sound now. Preloaded when the page initialises (the
// deck is where unlocks happen, so it's never a wasted fetch) and cloned per
// play, gated on the same shared mute flag every game reads - js/settings.js
// owns that toggle. Same shape as js/main.js's sfx helpers.
const UNLOCK_SFX_URL = "assets/sfx/unlock-card.mp3";
const UNLOCK_SFX_VOLUME = 0.35;
let unlockSfx = null;

function preloadUnlockSfx() {
    if (unlockSfx) return;
    unlockSfx = new Audio(UNLOCK_SFX_URL);
    unlockSfx.preload = "auto";
    unlockSfx.volume = UNLOCK_SFX_VOLUME;
    unlockSfx.load();
}

function playUnlockSfx() {
    if (!unlockSfx || isSfxMuted()) return;
    try {
        const audio = unlockSfx.cloneNode();
        audio.volume = UNLOCK_SFX_VOLUME;
        audio.play().catch(() => {});
    } catch {
        // Browsers may block audio until the first user gesture.
    }
}

function isSfxMuted() {
    try {
        return localStorage.getItem("polytype-sfx-muted") === "true";
    } catch {
        return false;
    }
}

function getWordAudioUrl(word) {
    const audioBaseUrl = (window.POLYTYPE_AUDIO_BASE_URL || "").replace(/\/+$/, "");
    const audioPrefix = (window.POLYTYPE_AUDIO_PREFIX || "audio/v1").replace(/^\/+|\/+$/g, "");
    if (!audioBaseUrl || !activeDeckMeta || !word?.id) return null;
    return [audioBaseUrl, audioPrefix, encodeURIComponent(activeDeckMeta.id), `${encodeURIComponent(word.id)}.mp3`].join("/");
}

// Pulls a word's mp3 into the browser's HTTP cache without playing it, so the
// first tap on that card starts on the spot. A cold CDN fetch does NOT reject
// play() - it just waits (see the long comment above js/sprint.js's audio
// preloader for the same trap), so an un-warmed card read as "this card has no
// audio" rather than as slow audio. That's why the freshly unlocked card in
// particular sounded broken: it's the one card nobody has ever tapped.
//
// The element is kept in the map on purpose: an unreferenced media element can
// be collected mid-load and take its own fetch with it, and holding it lets
// playWordAudio play the copy that's already loaded.
const preloadedAudio = new Map();

function preloadWordAudio(word) {
    const url = getWordAudioUrl(word);
    if (!url || preloadedAudio.has(url)) return;

    const audio = new Audio();
    audio.preload = "auto";
    // A preload that fails (file not there yet, a network hiccup) must not
    // wedge this word's audio for the rest of the session - drop it so the
    // next play attempt starts over with a fresh element instead of reusing
    // the one that's already known to be broken.
    audio.addEventListener("error", () => {
        if (preloadedAudio.get(url) === audio) preloadedAudio.delete(url);
    });
    audio.src = url;
    preloadedAudio.set(url, audio);
}

function playWordAudio(word, isRetry = false) {
    const url = getWordAudioUrl(word);
    if (!url) return;

    try {
        if (activeAudio) { activeAudio.pause(); activeAudio = null; }

        // Reuses the warmed element when there is one and it hasn't already
        // failed to load, so the second tap on any card is instant too.
        let audio = preloadedAudio.get(url);
        if (!audio || audio.error) {
            audio = new Audio(url);
            preloadedAudio.set(url, audio);
        }
        // Rewind only when there's something to rewind: assigning currentTime
        // before an element has its metadata throws on some browsers, and a
        // freshly created or still-loading one is sitting at 0 anyway.
        if (audio.readyState > 0) audio.currentTime = 0;
        activeAudio = audio;
        audio.play().catch(() => {
            preloadedAudio.delete(url);
            // One retry with a brand-new element covers the common case: the
            // cached one failed because the file wasn't there yet or a
            // one-off network error, and a second attempt just works.
            if (!isRetry) playWordAudio(word, true);
        });
    } catch {}
}

// Runs after every function/let/const above is defined - same reasoning as
// js/app-shell.js and js/main.js.
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initDeckPage, { once: true });
} else {
    initDeckPage();
}
