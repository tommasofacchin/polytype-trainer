const settings = {
    deckName: "",
    language: "",
    level: "",
    showRomanization: true,
    useMeaning: true,
    infiniteRun: true,
    timeLimitSeconds: 120
};

const state = {
    fullDeck: [],
    currentDeck: [],
    currentIndex: 0,
    totalChecked: 0,
    totalCorrectFields: 0,
    wordsUsed: 0,
    streak: 0,
    bestStreak: 0,
    score: 0,
    sessionXp: 0,
    unsavedCorrectFields: 0,
    unsavedWrongFields: 0,
    unsavedWordsUsed: 0,
    unsavedBestStreak: 0,
    // Per-word correct/wrong tally, sent alongside each autosave so the
    // server can track real mastery per word (api/_lib.js's
    // applyWordResults) - reconciled after a successful save the same way
    // the unsaved* counters above are (see saveCurrentSessionProgress).
    unsavedWordResults: [],
    unsavedCourseId: null,
    remainingSeconds: 0,
    timerId: null,
    answerTimeoutId: null,
    sessionStarted: false,
    lastAnswerAutoTimedOut: false,
    sessionEnded: false,
    progressSaved: false,
    saveInFlight: false,
    savePromise: null,
    pendingSessionCoins: 0,
    pendingCompletedMissions: [],
    pendingNewBadges: [],
    // Same accumulate-then-flush rule as the two above. Holds the server's
    // `streak` block from whichever autosave first reported the flame going
    // up; at most one autosave per day ever can, so this is a single value
    // rather than a list.
    pendingStreakAdvance: null
};

const defaultProfile = {
    name: "Player",
    handle: null,
    avatarUrl: null,
    xp: 0,
    dayStreak: 0,
    courses: {}
};

let rowsContainer;
let themeToggle;
let timerText;
let hudScoreText;
let streakText;
let streakChip;
let streakHud;
let timerResultModal;
let timedResultScore;
let timedResultDetail;
let timedResultCoins;
let timedResultSaveStatus;
let timedPlayAgainBtn;
let timedGamesBtn;
let trainerStartGate;
let profile = { ...defaultProfile };
// Last level reflected in the UI. Used to detect level-ups in renderProfile.
// null until the first render so we don't celebrate on initial load/hydration.
let lastShownLevel = null;
let lastShownCourseKey = null;
// Becomes true once the player picks a duration from the mandatory start
// gate (see showStartGate/hideStartGate) - startSession() no-ops before
// that, so the gate can't be bypassed by any of the other events that
// trigger a (re)start (account switch, language change, etc.).
let gateResolved = false;

const AVAILABLE_DECKS = window.DECK_INDEX || [];
const errorColor = "var(--danger)";
const themeStorageKey = "polytype-theme";
const profileStorageKey = "polytype-profile";
const audioBaseUrl = stripTrailingSlash(window.POLYTYPE_AUDIO_BASE_URL || "");
const audioPrefix = stripSlashes(window.POLYTYPE_AUDIO_PREFIX || "audio/v1");
const audioPreloadConcurrency = 4;
const higherUnlockedLevelDrawBoost = 1;
const answerTimeoutMs = 10000;
const timedAnswerTimeoutMs = 5000;
const audioPreloadCache = new Map();
const correctSfxUrl = "assets/sfx/correct3.mp3";
const correctSfxVolume = 0.28;
const errorSfxUrl = "assets/sfx/error1.mp3";
const errorSfxVolume = 0.22;
// Same clip js/levelup.js plays for the global level-up: the two celebrations
// are different levels (course vs global) but the same moment to the player,
// and they used to sound like two unrelated events.
const levelUpSfxUrl = "assets/sfx/new-level.mp3";
const levelUpSfxVolume = 0.38;
const sfxMutedKey = "polytype-sfx-muted";
let correctSfxAudio = null;
let errorSfxAudio = null;
let levelUpSfxAudio = null;
let activeWordAudio = null;

function tr(key, params = {}) {
    return window.PolytypeI18n?.t?.(key, params) || key;
}

function getAppLanguage() {
    return window.PolytypeI18n?.getLanguage?.() || "en";
}

// Runs immediately if the DOM is already parsed (true whenever js/router.js
// re-injects this file on a soft navigation, since DOMContentLoaded already
// fired long ago for the live document) and waits for DOMContentLoaded
// otherwise (a genuine hard page load, where the script tag - placed at the
// end of <body> - still runs before the event fires in practice, but this
// keeps the two paths symmetric and correct either way).
function initTrainerPage() {
    rowsContainer = document.getElementById("rows-container");
    themeToggle = document.getElementById("theme-toggle");
    timerText = document.getElementById("timer-text");
    hudScoreText = document.getElementById("hud-score-text");
    streakText = document.getElementById("streak-text");
    streakChip = document.getElementById("streak-chip");
    streakHud = document.getElementById("streak-hud");
    timerResultModal = document.getElementById("timer-result-modal");
    timedResultScore = document.getElementById("timed-result-score");
    timedResultDetail = document.getElementById("timed-result-detail");
    timedResultCoins = document.getElementById("timed-result-coins");
    timedResultSaveStatus = document.getElementById("timed-result-save-status");
    timedPlayAgainBtn = document.getElementById("timed-play-again-btn");
    timedGamesBtn = document.getElementById("timed-games-btn");
    trainerStartGate = document.getElementById("trainer-start-gate");

    trainerStartGate.querySelectorAll("[data-gate-seconds]").forEach(btn => {
        btn.addEventListener("click", () => {
            gateResolved = true;
            hideStartGate();
            startSession(Number(btn.dataset.gateSeconds));
        });
    });
    timedPlayAgainBtn.addEventListener("click", () => startSession());
    // Delegated through js/router.js's shared hook slot (see there) instead
    // of a direct document-level listener - this file gets re-executed on
    // every soft-navigation visit to trainer.html, and a plain
    // addEventListener here would pile up one more handler (each calling
    // startSession() again) per revisit.
    window.__polytypePageHooks = window.__polytypePageHooks || {};
    window.__polytypePageHooks.onLanguageChanged = onAppLanguageChange;
    document.addEventListener("pointerdown", unlockAudioPlayback, true);
    document.addEventListener("keydown", unlockAudioPlayback, true);

    document.querySelector(".list-card").addEventListener("click", event => {
        if (event.target.closest(".timer-modal")) return;
        if (!event.target.closest("input")) focusActiveRow();
    });

    initProfile();
    setupFirebaseProfileSync();
    preloadSfx();
    populateLanguageSelect();
    updateRomajiUI();
    renderProfile();
    applyInitialVisibilityClasses();
    showStartGate();
}

function initProfile() {
    const storedProfile = localStorage.getItem(profileStorageKey);

    if (storedProfile) {
        try {
            profile = { ...defaultProfile, ...JSON.parse(storedProfile) };
        } catch {
            profile = { ...defaultProfile };
        }
    }

    renderProfile();
}

function setupFirebaseProfileSync() {
    const firebaseClient = window.PolytypeFirebase;
    let lastFirebaseUid = null;

    if (!firebaseClient) {
        window.__polytypePageHooks = window.__polytypePageHooks || {};
        window.__polytypePageHooks.onProfileUpdated = event => {
            profile = { ...defaultProfile, ...profile, ...event.detail };
            renderProfile();
            applyAccountLanguage();
            startSession();
        };
        return;
    }

    firebaseClient.onChange(authState => {
        if (!authState.profile) return;

        const uid = authState.user?.uid || null;
        const shouldRestart = uid && uid !== lastFirebaseUid;
        lastFirebaseUid = uid;

        profile = {
            ...defaultProfile,
            ...profile,
            name: authState.profile.displayName || profile.name,
            handle: authState.profile.handle || null,
            avatarUrl: authState.profile.avatarUrl || null,
            xp: authState.profile.totalXp || 0,
            dayStreak: authState.profile.currentStreak || 0,
            streakFreezes: authState.profile.streakFreezes || 0,
            maxStreakFreezes: authState.profile.maxStreakFreezes || 2,
            courses: authState.profile.courses || profile.courses || {}
        };
        // On login / user change the profile is hydrated to its saved XP, which
        // is not a real level-up: adopt the level silently so renderProfile does
        // not fire the celebration. In-session XP gains (same user) still do.
        if (shouldRestart) {
            lastShownLevel = getLevelInfo(profile.xp).level;
        }

        saveProfile();
        renderProfile();
        if (shouldRestart) {
            applyAccountLanguage();
            startSession();
        }
    });
}

function saveProfile() {
    localStorage.setItem(profileStorageKey, JSON.stringify(profile));
}

function isActivelyPlayingSession() {
    return state.sessionStarted && !state.sessionEnded;
}

// Rewards (XP/level/streak/coins) are revealed on the end-of-session result
// screen, not ticking live while a round is in progress - skip the level-up
// celebration check entirely until the session ends.
function renderProfile() {
    if (isActivelyPlayingSession()) return;

    const levelInfo = getCurrentCourseLevelInfo();
    maybeCelebrateLevelUp(levelInfo.level);
}

function maybeCelebrateLevelUp(level) {
    const courseKey = getCurrentCourseKey();
    if (courseKey !== lastShownCourseKey) {
        lastShownCourseKey = courseKey;
        lastShownLevel = null;
    }

    // renderProfile() already only calls this once a session isn't actively
    // in progress, so any level gained during play surfaces here right after
    // the result screen appears, not mid-game.
    if (lastShownLevel !== null && level > lastShownLevel && state.currentDeck.length > 0) {
        celebrateLevelUp(level);
    }
    lastShownLevel = level;
}

function getLevelInfo(totalXp) {
    let level = 1;
    let currentXp = totalXp;
    let nextXp = getXpForLevel(level);

    while (currentXp >= nextXp) {
        currentXp -= nextXp;
        level += 1;
        nextXp = getXpForLevel(level);
    }

    return {
        level,
        currentXp,
        nextXp,
        progress: Math.round((currentXp / nextXp) * 100)
    };
}

function getXpForLevel(level) {
    // Level 1→2 stays at 400 XP. Each higher level grows faster via a mild quadratic term.
    return Math.round(400 + (level - 1) * 250 + (level - 1) * (level - 1) * 15);
}

function getCurrentCourseKey() {
    return settings.language || settings.deckName || "course";
}

function getCurrentCourseProgress() {
    const courses = profile.courses || {};
    return courses[settings.language] || courses[settings.deckName] || null;
}

function getCurrentCourseLevelInfo() {
    const courseProgress = getCurrentCourseProgress();
    return getLevelInfo(Math.max(0, Number(courseProgress?.xp) || 0));
}

// Returns the current course's real unlocked-word set, migrating a legacy
// prefix-based local course (categoryIndex/categoryUnlocked, no
// unlockedWords array yet) on the fly - so a returning guest sees exactly
// the same words already unlocked, nothing reshuffled or reset.
function getCurrentUnlockedWords() {
    const courseProgress = getCurrentCourseProgress();

    // No progress saved for this course yet: fall back to the starter
    // baseline rather than empty, otherwise a brand-new course would have no
    // words to practice with and could never earn the XP for keys.
    if (!courseProgress) {
        return new Set(getSortedCategories()[0]?.wordSuffixes.slice(0, getStarterWordCount()) || []);
    }

    return Array.isArray(courseProgress.unlockedWords)
        ? new Set(courseProgress.unlockedWords)
        : getUnlockedWordSuffixesFromPrefix(
            Math.max(0, Math.trunc(Number(courseProgress.categoryIndex) || 0)),
            Math.max(0, Math.trunc(Number(courseProgress.categoryUnlocked) || 0))
        );
}

function getStarterWordCount() {
    return Math.min(5, getSortedCategories()[0]?.size || 0);
}

// Words the player has hidden from exercises via the Deck page's per-card
// toggle (js/deck.js) - a local/per-device practice preference, not game
// progression, so it lives in its own localStorage key rather than the
// profile cache (which a server refresh can overwrite wholesale).
function getDisabledWordSuffixes(courseKey) {
    try {
        const map = JSON.parse(localStorage.getItem("polytype-disabled-words")) || {};
        return new Set(map[courseKey] || []);
    } catch {
        return new Set();
    }
}

function getWordSuffix(wordId) {
    const match = /(\d+)$/.exec(wordId || "");
    return match ? Number.parseInt(match[0], 10) : 0;
}

function getSortedCategories() {
    return [...(window.POLYTYPE_CATEGORIES || [])].sort((a, b) => a.order - b.order);
}

// Legacy (pre-keys) unlock state was a contiguous prefix: every category
// before `categoryIndex` fully unlocked, plus the first `categoryUnlocked`
// suffixes of the category at `categoryIndex`. Used only to migrate old
// local courses into a real unlockedWords set the first time they're
// touched under the new model.
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

// Study language now comes solely from the shared header's flag switcher
// (app-shell.js), which does a full page reload on change - so this just
// needs to read the value back from localStorage, no in-page menu to build.
function populateLanguageSelect() {
    const languages = uniqueBy(AVAILABLE_DECKS.map(deck => deck.language), value => value);

    const savedLanguage = localStorage.getItem("polytype-language");
    settings.language = languages.includes(savedLanguage) ? savedLanguage : (languages[0] || "");
    populateLevelSelect();
}

// Every language currently ships exactly one level ("A1"), so this just
// picks the first one automatically - no picker needed unless that changes.
function populateLevelSelect() {
    const levels = uniqueBy(getDecksForLanguage(settings.language).map(deck => deck.level), value => value);
    settings.level = levels[0] || "";
    populateDeckSelect();
}

function populateDeckSelect() {
    const allDecks = getDecksForLanguage(settings.language);
    const levelDecks = allDecks.filter(deck => deck.level === settings.level);
    settings.deckName = (levelDecks[0] ?? allDecks[0])?.id || "";
}

function languageHasHints() {
    return settings.language === "chinese" || settings.language === "japanese";
}

// Romanization hints are always shown when the language has them (Pinyin/
// Romaji) - no per-user toggle anymore.
function updateRomajiUI() {
    settings.showRomanization = languageHasHints();
}

// On login, adopt the study language from the account's courses (the one with
// the most XP) when the user hasn't picked one on this device. An explicit
// local choice always wins, so manual switches are never overridden.
function applyAccountLanguage() {
    if (localStorage.getItem("polytype-language")) return;

    const availableLanguages = new Set(AVAILABLE_DECKS.map(deck => deck.language));
    let best = null;

    for (const [courseId, course] of Object.entries(profile.courses || {})) {
        if (!availableLanguages.has(courseId)) continue;
        const xp = Number(course?.xp) || 0;
        const level = Number(course?.level) || 0;
        if (!best || xp > best.xp || (xp === best.xp && level > best.level)) {
            best = { language: courseId, xp, level };
        }
    }

    if (!best || best.language === settings.language) return;

    settings.language = best.language;
    localStorage.setItem("polytype-language", best.language);
    populateLevelSelect();
    updateRomajiUI();
}

function onAppLanguageChange() {
    window.PolytypeI18n?.applyStaticTranslations?.();
    populateLanguageSelect();
    updateRomajiUI();
    renderProfile();
    startSession();
}

function showStartGate() {
    if (!trainerStartGate) return;
    trainerStartGate.hidden = false;
    requestAnimationFrame(() => trainerStartGate.classList.add("is-open"));
}

function hideStartGate() {
    if (!trainerStartGate) return;
    trainerStartGate.classList.remove("is-open");
    window.setTimeout(() => { trainerStartGate.hidden = true; }, 240);
}

async function startSession(seconds) {
    // Blocks every (re)start trigger - play-again, language/level changes,
    // account switches - until the player has picked a duration from the
    // mandatory start gate at least once.
    if (!gateResolved) return;
    if (typeof seconds === "number") settings.timeLimitSeconds = seconds;

    await saveCurrentSessionProgress();
    stopTimer();
    resetState();
    showRowsLoading();
    hideSessionResult();
    updateStats();
    updateTimerDisplay();

    await loadDeck(settings.deckName);
    prepareCurrentDeck();
    preloadCurrentDeckAudio();
    spawnInitialRows();
    beginActivePlay();
}

async function loadDeck(deckId) {
    const deckMeta = AVAILABLE_DECKS.find(deck => deck.id === deckId);

    if (!deckMeta) {
        showEmptyState(tr("trainer.noDeck"));
        return;
    }

    try {
        const response = await fetch(deckMeta.path);
        if (!response.ok) {
            throw new Error(`Could not load ${deckMeta.path}`);
        }

        const csvText = await response.text();
        state.fullDeck = parseDeckCsv(csvText, deckMeta.columns);
    } catch (error) {
        console.error(error);
        state.fullDeck = [];
        showEmptyState(tr("trainer.localServer"));
    }
}

function parseDeckCsv(csvText, columns) {
    const rows = parseCsv(csvText.trim());
    const headers = rows.shift() || [];

    return rows
        .map((row, index) => {
            const record = Object.fromEntries(
                headers.map((header, index) => [header.trim(), row[index] || ""])
            );
            const unlockLevel = Number.parseInt(record[columns.unlockLevel], 10);
            const script = record[columns.script]?.trim() || "";

            return {
                id: record[columns.wordId]?.trim() || `${settings.deckName}-${index + 1}`,
                script,
                romanization: record[columns.romanization]?.trim() || "",
                meaning: getRecordMeaning(record, columns),
                unlockLevel: Number.isFinite(unlockLevel) && unlockLevel > 0 ? unlockLevel : 1
            };
        })
        .filter(item => item.script && item.meaning);
}

function getRecordMeaning(record, columns) {
    const meaningColumn = getAppLanguage() === "it"
        ? columns.italianMeaning
        : columns.meaning;

    return (
        record[meaningColumn]?.trim() ||
        record[columns.meaning]?.trim() ||
        record[columns.italianMeaning]?.trim() ||
        ""
    );
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

function prepareCurrentDeck() {
    const unlockedSuffixes = getCurrentUnlockedWords();
    const disabledSuffixes = getDisabledWordSuffixes(getCurrentCourseKey());
    const unlockedWords = state.fullDeck.filter(item =>
        unlockedSuffixes.has(getWordSuffix(item.id)) && !disabledSuffixes.has(getWordSuffix(item.id))
    );
    state.currentDeck = shuffleDeckByUnlockLevel(unlockedWords);
    state.currentIndex = 0;
    // NB: do not reset state.wordsUsed here. It is the monotonic row counter
    // used for each row's dataset.index; resetting it mid-session (infinite-run
    // loop) makes the wrap-around row reuse index 0 and get locked as a
    // "past-row", which skips a word. resetState() zeroes it at session start.
}

function preloadCurrentDeckAudio() {
    scheduleAudioPreload(state.currentDeck);
}

function resetState() {
    state.fullDeck = [];
    state.currentDeck = [];
    state.currentIndex = 0;
    state.totalChecked = 0;
    state.totalCorrectFields = 0;
    state.wordsUsed = 0;
    state.streak = 0;
    state.bestStreak = 0;
    state.score = 0;
    state.sessionXp = 0;
    state.unsavedCorrectFields = 0;
    state.unsavedWrongFields = 0;
    state.unsavedWordsUsed = 0;
    state.unsavedBestStreak = 0;
    state.unsavedWordResults = [];
    state.unsavedCourseId = null;
    state.remainingSeconds = settings.timeLimitSeconds;
    clearAnswerTimeout();
    state.sessionStarted = false;
    state.lastAnswerAutoTimedOut = false;
    state.sessionEnded = false;
    state.progressSaved = false;
    state.saveInFlight = false;
    state.savePromise = null;
    state.pendingSessionCoins = 0;
    state.pendingCompletedMissions = [];
    state.pendingNewBadges = [];
    state.pendingStreakAdvance = null;
}

function clearRows() {
    rowsContainer.innerHTML = "";
}

function showRowsLoading() {
    rowsContainer.innerHTML = `
        <div class="game-loading-screen">
            <div class="game-loading-dots" aria-hidden="true"><span></span><span></span><span></span></div>
            <p class="game-loading-text">${tr("common.loadingWords")}</p>
        </div>
    `;
}

function spawnInitialRows() {
    clearRows();

    if (!state.currentDeck.length) {
        showEmptyState(tr("trainer.noWords"));
        return;
    }

    spawnNextRow();
    spawnNextRow();
    updatePreviewRow();
    syncRowInteractivity();
    startActiveAnswerTimeout();
}

function showEmptyState(message) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = message;
    rowsContainer.replaceChildren(empty);
}

function spawnNextRow() {
    if (state.sessionEnded) return;

    if (settings.infiniteRun && state.currentIndex >= state.currentDeck.length) {
        prepareCurrentDeck();
    }

    const item = state.currentDeck[state.currentIndex];
    if (!item) return;

    const visualIndex = state.wordsUsed;
    state.wordsUsed += 1;

    const row = document.createElement("div");
    row.className = "row";
    row.dataset.index = String(visualIndex);

    const colScript = document.createElement("div");
    colScript.className = "script";
    const scriptText = document.createElement("span");
    scriptText.className = "script-text";
    scriptText.textContent = item.script;

    colScript.append(scriptText);

    if (languageHasHints() && item.romanization) {
        const romanizationHint = document.createElement("span");
        romanizationHint.className = "romanization-hint";
        romanizationHint.textContent = `(${item.romanization})`;
        colScript.append(romanizationHint);
    }

    const colMeaning = document.createElement("div");
    colMeaning.className = "meaning-col";

    const meaningInput = createAnswerInput("meaning-input");
    // Bind the actual deck item to the input. state.currentDeck is reshuffled
    // into a new array when the deck loops (infinite run), which invalidates any
    // numeric index held by rows already on screen. Checking against this bound
    // item keeps the displayed word and its correct meaning in sync.
    meaningInput.deckItem = item;
    const meaningFeedback = document.createElement("div");
    meaningFeedback.className = "feedback feedback-meaning";

    colMeaning.append(meaningInput, meaningFeedback);
    row.append(colScript, colMeaning);
    rowsContainer.appendChild(row);

    const isFirstRow = state.wordsUsed === 1;
    state.currentIndex += 1;

    meaningInput.addEventListener("keydown", event =>
        onKeyDownMeaning(event, meaningInput)
    );

    meaningInput.addEventListener("input", () => {
        if (state.sessionEnded || meaningInput.dataset.autoSubmitted) return;
        if (!settings.useMeaning) return;
        const item = meaningInput.deckItem;
        if (!item || meaningInput.value.trim().length === 0) return;
        if (normalizeString(meaningInput.value) === normalizeString(item.meaning)) {
            meaningInput.dataset.autoSubmitted = "true";
            checkMeaningField(meaningInput);
            moveToNextRow(meaningInput);
        }
    });

    requestAnimationFrame(() => {
        row.classList.add("visible");
        if (isFirstRow) focusFirstEnabledInput(meaningInput);
    });
}

function createAnswerInput(className) {
    const input = document.createElement("input");
    input.type = "text";
    input.className = className;
    input.autocomplete = "off";
    // Opts this input into js/virtual-keyboard.js's custom on-screen
    // keyboard (auto-shown on focus) instead of the device's native one -
    // inputmode="none" is what actually suppresses the native keyboard;
    // the rest just stop the OS from second-guessing foreign-language text.
    input.setAttribute("inputmode", "none");
    input.setAttribute("autocapitalize", "off");
    input.setAttribute("autocorrect", "off");
    input.setAttribute("spellcheck", "false");
    input.dataset.vkbd = "true";
    return input;
}

function onKeyDownMeaning(event, meaningInput) {
    if (!isSubmitKey(event)) return;
    if (state.sessionEnded) return;
    if (meaningInput.dataset.autoSubmitted) return;

    event.preventDefault();
    if (settings.useMeaning) {
        checkMeaningField(meaningInput);
    }

    moveToNextRow(meaningInput);
}

function moveToNextRow(meaningInput) {
    if (state.sessionEnded) return;

    const currentRow = meaningInput.closest(".row");
    if (!currentRow) return;

    // Drop the oldest off-screen rows before reading indices below, so the
    // removal never shifts the indices spawnNextRow's re-capture relies on.
    pruneOldRows();

    let rows = Array.from(rowsContainer.querySelectorAll(".row"));

    const currentRowDatasetIndex = Number(currentRow.dataset.index);
    rows.forEach(row => {
        // Rows already settled into the past keep their state; re-marking and
        // re-locking their inputs on every advance was O(n) busywork that grew
        // with the session length.
        if (row.classList.contains("past-row")) return;
        if (Number(row.dataset.index) <= currentRowDatasetIndex) {
            row.classList.add("past-row");
            lockPastRow(row);
        }
    });

    const currentRowIndex = rows.indexOf(currentRow);

    if (currentRowIndex >= rows.length - 2) {
        spawnNextRow();
        rows = Array.from(rowsContainer.querySelectorAll(".row"));
    }

    const nextRow = rows[currentRowIndex + 1];
    if (!nextRow) return;

    updatePreviewRow();
    syncRowInteractivity();
    focusFirstEnabledInput(nextRow.querySelector(".meaning-input"));
    playWordAudio(nextRow.querySelector(".meaning-input")?.deckItem);
    startActiveAnswerTimeout();
    centerRowInViewport(nextRow);
}

function startActiveAnswerTimeout() {
    clearAnswerTimeout();
    if (state.sessionEnded || !state.sessionStarted) return;
    if (isTimedSession() && !state.timerId) return;
    if (!isTimedSession() && state.wordsUsed <= 2) return;

    const activeRow = rowsContainer.querySelector(".row:not(.past-row)");
    const activeInput = activeRow?.querySelector(".meaning-input");
    if (!activeRow || !activeInput || activeInput.disabled || activeInput.readOnly) return;

    const activeIndex = activeRow.dataset.index;
    state.answerTimeoutId = window.setTimeout(() => {
        const currentRow = rowsContainer.querySelector(".row:not(.past-row)");
        const currentInput = currentRow?.querySelector(".meaning-input");
        if (
            state.sessionEnded ||
            !currentRow ||
            !currentInput ||
            currentRow.dataset.index !== activeIndex ||
            currentInput.dataset.autoSubmitted ||
            currentInput.disabled ||
            currentInput.readOnly
        ) {
            return;
        }

        currentInput.dataset.autoSubmitted = "true";
        onAnswerTimeout(currentInput);
        moveToNextRow(currentInput);
    }, getActiveAnswerTimeoutMs());
}

function getActiveAnswerTimeoutMs() {
    if (isTimedSession()) return timedAnswerTimeoutMs;
    const reductionSteps = Math.floor(state.streak / 10);
    const multiplier = Math.max(0.5, 1 - reductionSteps * 0.05);
    return Math.round(answerTimeoutMs * multiplier);
}

function onAnswerTimeout(meaningInput) {
    clearAnswerTimeout();
    const prevStreak = state.streak;
    state.streak = 0;
    updateStats();

    if (prevStreak > 0) animateStreakBreak();

    const item = meaningInput.deckItem;
    if (item) {
        meaningInput.style.color = "var(--text-faint)";
        meaningInput.value = item.meaning;
    }

    const row = meaningInput?.closest(".row");
    if (row) flashRowTimeout(row);
}

function isTimedSession() {
    return settings.timeLimitSeconds > 0;
}

function clearAnswerTimeout() {
    if (!state.answerTimeoutId) return;

    window.clearTimeout(state.answerTimeoutId);
    state.answerTimeoutId = null;
}

function playActiveRowAudio() {
    const activeInput = rowsContainer.querySelector(".row:not(.past-row) .meaning-input");
    playWordAudio(activeInput?.deckItem);
}

function unlockAudioPlayback() {
    document.removeEventListener("pointerdown", unlockAudioPlayback, true);
    document.removeEventListener("keydown", unlockAudioPlayback, true);
    if (!state.sessionStarted) return;
    playActiveRowAudio();
}

function playWordAudio(item) {
    if (!item?.id || !audioBaseUrl) return;

    const audioUrl = getWordAudioUrl(item);
    preloadAudioUrl(audioUrl);

    try {
        if (activeWordAudio) {
            activeWordAudio.pause();
            activeWordAudio.currentTime = 0;
        }

        activeWordAudio = new Audio(audioUrl);
        activeWordAudio.play().catch(() => {});
    } catch {
        // Browsers may block autoplay until the first user gesture.
    }
}

function scheduleAudioPreload(items) {
    if (!audioBaseUrl || !items.length) return;

    const urls = uniqueBy(
        items
            .map(getWordAudioUrl)
            .filter(url => url && !audioPreloadCache.has(url)),
        url => url
    );
    if (!urls.length) return;

    window.setTimeout(() => preloadAudioQueue(urls), 0);
}

async function preloadAudioQueue(urls) {
    let nextIndex = 0;
    const workerCount = Math.min(audioPreloadConcurrency, urls.length);
    const workers = Array.from({ length: workerCount }, async () => {
        while (nextIndex < urls.length) {
            const url = urls[nextIndex];
            nextIndex += 1;
            await preloadAudioUrl(url);
        }
    });

    await Promise.all(workers);
}

function preloadAudioUrl(url) {
    if (!url) return Promise.resolve();
    const cached = audioPreloadCache.get(url);
    if (cached) return cached.promise;

    const audio = new Audio();
    audio.preload = "auto";
    audio.src = url;

    const promise = new Promise(resolve => {
        let done = false;

        const finish = () => {
            if (done) return;
            done = true;
            audio.removeEventListener("canplaythrough", finish);
            audio.removeEventListener("canplay", finish);
            audio.removeEventListener("error", finish);
            resolve();
        };

        audio.addEventListener("canplaythrough", finish);
        audio.addEventListener("canplay", finish);
        audio.addEventListener("error", finish);
        audio.load();
    });

    audioPreloadCache.set(url, { audio, promise });
    return promise;
}

function getWordAudioUrl(item) {
    return [
        audioBaseUrl,
        audioPrefix,
        encodeURIComponent(settings.deckName),
        `${encodeURIComponent(item.id)}.mp3`
    ].filter(Boolean).join("/");
}

function updatePreviewRow() {
    const rows = Array.from(rowsContainer.querySelectorAll(".row"));
    rows.forEach(row => row.classList.remove("next-preview"));

    const activeIndex = rows.findIndex(row => !row.classList.contains("past-row"));
    const previewRow = rows[activeIndex + 1];
    if (previewRow) previewRow.classList.add("next-preview");
}

function syncRowInteractivity() {
    const rows = Array.from(rowsContainer.querySelectorAll(".row"));
    const activeRow = rows.find(row => !row.classList.contains("past-row"));

    rows.forEach(row => {
        const isActive = row === activeRow;
        row.classList.toggle("inactive-row", !isActive);
        row.querySelectorAll("input").forEach(input => {
            if (row.classList.contains("past-row")) return;
            input.readOnly = !isActive;
            input.tabIndex = isActive ? 0 : -1;
            input.setAttribute("aria-hidden", String(!isActive));
        });
    });
}

function lockPastRow(row) {
    row.querySelectorAll("input").forEach(input => {
        input.readOnly = true;
        input.tabIndex = -1;
    });
}

// Past rows pile up for the whole session and are never otherwise removed.
// Keep a generous scroll-back buffer but drop the oldest rows from the DOM so
// memory use and the per-advance row scans stay bounded in long sessions.
// Removing rows above the viewport would shift everything up, so compensate
// scrollTop by the height we removed to keep the visible position stable.
function pruneOldRows() {
    const MAX_RETAINED_ROWS = 60;
    let excess = rowsContainer.childElementCount - MAX_RETAINED_ROWS;
    if (excess <= 0) return;

    let removedHeight = 0;
    while (excess > 0) {
        const oldest = rowsContainer.firstElementChild;
        // Only ever drop rows that have already settled into the past; never
        // the active row or upcoming ones.
        if (!oldest || !oldest.classList.contains("past-row")) break;
        removedHeight += oldest.offsetHeight;
        oldest.remove();
        excess -= 1;
    }

    if (removedHeight > 0) {
        rowsContainer.scrollTop = Math.max(0, rowsContainer.scrollTop - removedHeight);
    }
}

function checkMeaningField(meaningInput, options = {}) {
    if (!settings.useMeaning) return;

    const item = meaningInput.deckItem;
    if (!item) return;

    const okMeaning =
        meaningInput.value.trim().length > 0 &&
        normalizeString(meaningInput.value) === normalizeString(item.meaning);

    markInput(meaningInput, okMeaning, item.meaning);
    registerAnswer(okMeaning, meaningInput, options);
}

function markInput(input, isCorrect, correctValue) {
    input.style.color = isCorrect ? "inherit" : errorColor;
    if (!isCorrect) input.value = correctValue;
}

function registerAnswer(isCorrect, meaningInput, options = {}) {
    clearAnswerTimeout();
    state.lastAnswerAutoTimedOut = Boolean(options.autoTimedOut);

    const prevStreak = state.streak;
    const prevTier = getComboTier(prevStreak);

    state.unsavedCourseId = state.unsavedCourseId || getCurrentCourseKey();
    state.totalChecked += 1;
    if (meaningInput?.deckItem?.id) {
        state.unsavedWordResults.push({ id: getWordSuffix(meaningInput.deckItem.id), correct: isCorrect });
    }
    if (isCorrect) {
        playCorrectSfx();
        state.totalCorrectFields += 1;
        state.unsavedCorrectFields += 1;
        state.unsavedWordsUsed += 1;
        state.streak += 1;
        state.bestStreak = Math.max(state.bestStreak, state.streak);
        state.unsavedBestStreak = Math.max(state.unsavedBestStreak, state.streak);
        awardComboPoints();
    } else {
        playErrorSfx();
        state.unsavedWrongFields += 1;
        state.streak = 0;
    }
    updateStats();

    const row = meaningInput?.closest(".row");
    if (row) flashRow(row, isCorrect);

    if (isCorrect) {
        const pts = Math.round(10 * getComboMultiplier(state.streak - 1));
        const tier = getComboTier(state.streak);
        if (meaningInput) showXpFloat(pts, tier, meaningInput);
        const tierUp = tier > prevTier;
        animateStreakPop(tierUp);
    } else if (prevStreak > 0) {
        animateStreakBreak();
    }

    if (isFirebaseSignedIn() && getUnsavedAnswerCount() >= 5) {
        saveCurrentSessionProgress();
    }
}

function preloadSfx() {
    correctSfxAudio = new Audio(correctSfxUrl);
    correctSfxAudio.preload = "auto";
    correctSfxAudio.volume = correctSfxVolume;
    correctSfxAudio.load();

    errorSfxAudio = new Audio(errorSfxUrl);
    errorSfxAudio.preload = "auto";
    errorSfxAudio.volume = errorSfxVolume;
    errorSfxAudio.load();

    levelUpSfxAudio = new Audio(levelUpSfxUrl);
    levelUpSfxAudio.preload = "auto";
    levelUpSfxAudio.volume = levelUpSfxVolume;
    levelUpSfxAudio.load();
}

function playCorrectSfx() {
    playSfx(correctSfxAudio, correctSfxVolume);
}

function playErrorSfx() {
    playSfx(errorSfxAudio, errorSfxVolume);
}

function playLevelUpSfx() {
    playSfx(levelUpSfxAudio, levelUpSfxVolume);
}

function playSfx(sourceAudio, volume) {
    if (!sourceAudio || isSfxMuted()) return;

    try {
        const audio = sourceAudio.cloneNode();
        audio.volume = volume;
        audio.play().catch(() => {});
    } catch {
        // Browsers may block audio until the first user gesture.
    }
}

function isSfxMuted() {
    try {
        return localStorage.getItem(sfxMutedKey) === "true";
    } catch {
        return false;
    }
}

function awardComboPoints() {
    const multiplier = getComboMultiplier(state.streak);
    const points = Math.round(10 * multiplier);

    state.score += points;
    state.sessionXp += points;

    if (!isFirebaseSignedIn()) {
        addLocalCourseXp(points);
        saveProfile();
        renderProfile();
    }
}

// Earning XP never directly unlocks words, locally or on the server - it
// only grows the pool of keys the player can spend (see getKeysHeld).
// unlockedWords only ever changes through an explicit key spend on the Deck
// page (see js/deck.js), except for the one-time starter grant here on a
// brand-new course, or lazily migrating a legacy prefix-based course
// (categoryIndex/categoryUnlocked) into a real suffix array - reusing
// getCurrentUnlockedWords() for that means the migration is computed once
// and then persisted here instead of re-derived on every read.
function addLocalCourseXp(points) {
    const courseId = getCurrentCourseKey();
    const currentCourse = getCurrentCourseProgress();
    const isNewCourse = !currentCourse;
    const xp = Math.max(0, Number(currentCourse?.xp) || 0) + points;
    const levelInfo = getLevelInfo(xp);
    const unlockedWords = isNewCourse
        ? (getSortedCategories()[0]?.wordSuffixes.slice(0, getStarterWordCount()) || [])
        : Array.from(getCurrentUnlockedWords());

    profile.xp = Math.max(0, Number(profile.xp) || 0) + points;
    profile.courses = {
        ...(profile.courses || {}),
        [courseId]: {
            ...(currentCourse || {}),
            courseId,
            xp,
            level: levelInfo.level,
            unlockedLevel: levelInfo.level,
            unlockedWords,
            wordsUnlocked: unlockedWords.length
        }
    };
}

function getComboMultiplier(streak) {
    if (streak >= 20) return 3;
    if (streak >= 15) return 2.5;
    if (streak >= 10) return 2;
    if (streak >= 5) return 1.5;
    return 1;
}

function formatMultiplier(multiplier) {
    return Number.isInteger(multiplier) ? String(multiplier) : multiplier.toFixed(1);
}

function getComboTier(streak) {
    if (streak >= 20) return 4;
    if (streak >= 15) return 3;
    if (streak >= 10) return 2;
    if (streak >= 5)  return 1;
    return 0;
}

function updateStats() {
    const multiplier = getComboMultiplier(state.streak);
    const tier = getComboTier(state.streak);

    hudScoreText.textContent = `${state.score} ${tr("common.points")}`;
    streakText.textContent = String(state.streak);

    if (state.streak >= 5) {
        streakChip.hidden = false;
        streakChip.textContent = `×${formatMultiplier(multiplier)}`;
        streakChip.dataset.tier = String(tier);
    } else {
        streakChip.hidden = true;
    }

    if (tier > 0) {
        streakHud.dataset.comboTier = String(tier);
    } else {
        delete streakHud.dataset.comboTier;
    }
}

function animateStreakPop(big) {
    const cls = big ? "streak-pop-big" : "streak-pop";
    streakText.classList.remove("streak-pop", "streak-pop-big", "streak-shake");
    void streakText.offsetWidth;
    streakText.classList.add(cls);
    streakText.addEventListener("animationend", () => streakText.classList.remove(cls), { once: true });
}

function animateStreakBreak() {
    streakText.classList.remove("streak-pop", "streak-pop-big", "streak-shake");
    void streakText.offsetWidth;
    streakText.classList.add("streak-shake");
    streakText.addEventListener("animationend", () => streakText.classList.remove("streak-shake"), { once: true });
}

function flashRow(row, isCorrect) {
    const cls = isCorrect ? "row-flash-correct" : "row-flash-wrong";
    row.classList.remove("row-flash-correct", "row-flash-wrong");
    void row.offsetWidth;
    row.classList.add(cls);
    row.addEventListener("animationend", () => row.classList.remove(cls), { once: true });
}

function flashRowTimeout(row) {
    row.classList.remove("row-flash-timeout");
    void row.offsetWidth;
    row.classList.add("row-flash-timeout");
    row.addEventListener("animationend", () => row.classList.remove("row-flash-timeout"), { once: true });
}

function showXpFloat(pts, tier, inputEl) {
    const rect = inputEl.getBoundingClientRect();
    const el = document.createElement("span");
    el.className = "xp-float";
    el.textContent = `+${pts}`;
    if (tier > 1) el.dataset.tier = String(tier);
    el.style.left = `${rect.left + rect.width / 2 - 18}px`;
    el.style.top = `${rect.top - 4}px`;
    document.body.appendChild(el);
    el.addEventListener("animationend", () => el.remove(), { once: true });
}

function celebrateLevelUp(level) {
    document.querySelector(".levelup-overlay")?.remove();
    playLevelUpSfx();

    const overlay = document.createElement("div");
    overlay.className = "levelup-overlay";

    const card = document.createElement("div");
    card.className = "levelup-card";

    const rays = document.createElement("div");
    rays.className = "levelup-rays";

    const badge = document.createElement("div");
    badge.className = "levelup-badge";
    const badgeLevel = document.createElement("span");
    badgeLevel.className = "levelup-badge-level";
    badgeLevel.textContent = String(level);
    badge.append(badgeLevel);

    const title = document.createElement("div");
    title.className = "levelup-title";
    title.textContent = tr("trainer.levelUp");

    const sub = document.createElement("div");
    sub.className = "levelup-sub";
    sub.textContent = tr("trainer.levelReached", { level });

    card.append(rays, badge, title, sub);

    const confirmBtn = document.createElement("button");
    confirmBtn.type = "button";
    confirmBtn.className = "levelup-confirm-btn";
    confirmBtn.textContent = tr("trainer.gotIt");
    confirmBtn.addEventListener("click", () => {
        overlay.classList.add("is-leaving");
        window.setTimeout(() => overlay.remove(), 480);
    });
    card.appendChild(confirmBtn);

    // Same gold spark burst as js/levelup.js's shared copy (that file's
    // buildSparkBurst comment explains the choreography); inserted before the
    // badge so it emerges from behind the rim. Reduced motion is handled in
    // CSS - .levelup-burst is display:none there.
    const burst = document.createElement("div");
    burst.className = "levelup-burst";
    const sparkColors = [
        "var(--color-gold-text, #ffd268)",
        "#ffffff",
        "var(--accent)",
        "var(--color-gold, #ffc73a)"
    ];
    for (let i = 0; i < 14; i += 1) {
        const spark = document.createElement("span");
        spark.className = "levelup-burst-spark";
        spark.style.setProperty("--a", `${Math.round((360 / 14) * i + (Math.random() * 20 - 10))}deg`);
        spark.style.setProperty("--d", `${112 + Math.round(Math.random() * 68)}px`);
        spark.style.setProperty("--s", `${5 + Math.round(Math.random() * 4)}px`);
        spark.style.setProperty("--delay", `${500 + Math.round(Math.random() * 150)}ms`);
        spark.style.background = sparkColors[i % sparkColors.length];
        burst.appendChild(spark);
    }
    card.insertBefore(burst, badge);

    overlay.appendChild(card);
    document.body.appendChild(overlay);
}

// Same accumulate-then-flush rule as the two below, and flushed ahead of both
// - the flame going up is the day's headline, so it leads (matching the order
// js/sprint.js's finishSession uses).
function flushPendingStreakCelebration() {
    const streak = state.pendingStreakAdvance;
    if (!streak) return Promise.resolve();
    state.pendingStreakAdvance = null;
    return window.PolytypeStreakCelebrate?.show?.(streak) || Promise.resolve();
}

function flushPendingMissionCelebration() {
    if (!state.pendingCompletedMissions.length) return Promise.resolve();
    const missions = state.pendingCompletedMissions;
    state.pendingCompletedMissions = [];
    return window.PolytypeMissionCelebrate?.show?.(missions) || Promise.resolve();
}

// Same accumulate-then-flush rule as flushPendingMissionCelebration above -
// see the call sites for why (Trainer autosaves mid-session, so a badge
// earned by an early autosave must wait for the session to actually pause
// before it celebrates).
function flushPendingBadgeCelebration() {
    if (!state.pendingNewBadges.length) return Promise.resolve();
    const badges = state.pendingNewBadges;
    state.pendingNewBadges = [];
    return window.PolytypeBadgeCelebrate?.show?.(badges) || Promise.resolve();
}

function getComboColor(tier) {
    return getComputedStyle(document.documentElement)
        .getPropertyValue(`--combo-${tier}`).trim() || "var(--accent)";
}

// Selecting a duration IS starting the session now - no separate "Ready to
// start? Go!" confirmation step.
function beginActivePlay() {
    if (!state.currentDeck.length || state.sessionStarted) return;

    state.remainingSeconds = settings.timeLimitSeconds;
    updateTimerDisplay();
    state.sessionStarted = true;

    if (isTimedSession()) {
        state.timerId = window.setInterval(() => {
            state.remainingSeconds -= 1;
            updateTimerDisplay();
            if (state.remainingSeconds <= 0) endSession();
        }, 1000);
    }

    focusActiveRow();
    playActiveRowAudio();
    startActiveAnswerTimeout();
}

function stopTimer() {
    if (state.timerId) {
        window.clearInterval(state.timerId);
        state.timerId = null;
    }
}

function updateTimerDisplay() {
    if (!settings.timeLimitSeconds) {
        timerText.textContent = tr("trainer.free");
        return;
    }

    timerText.textContent = formatTime(Math.max(0, state.remainingSeconds));
}

async function endSession() {
    stopTimer();
    clearAnswerTimeout();
    state.sessionStarted = false;
    state.sessionEnded = true;

    rowsContainer.querySelectorAll("input").forEach(input => {
        input.disabled = true;
    });

    const percentage =
        state.totalChecked > 0
            ? Math.round((state.totalCorrectFields / state.totalChecked) * 100)
            : 0;
    const scoreText = `${state.score} ${tr("common.points")}`;
    const detailText = tr("trainer.resultDetail", {
        correct: state.totalCorrectFields,
        total: state.totalChecked,
        accuracy: percentage,
        combo: state.bestStreak,
        xp: state.sessionXp
    });

    timedResultScore.textContent = scoreText;
    timedResultDetail.textContent = detailText;
    if (timedResultCoins) timedResultCoins.textContent = "";
    timedResultSaveStatus.textContent = "";
    timerResultModal.hidden = false;

    // Play again/Home stay disabled for at least this long instead of a
    // "Saving progress..." status line - same reasoning as js/sprint.js's
    // finishSession(): the buttons turning clickable again *is* the "you're
    // good to go" signal, so a save that resolves faster than this doesn't
    // just flash text and vanish.
    setResultButtonsBusy(true);
    const minDelay = new Promise(resolve => window.setTimeout(resolve, 1000));

    await saveCurrentSessionProgress();

    // saveCurrentSessionProgress() only reveals these when it actually has
    // something fresh to send - if everything was already flushed by an
    // earlier mid-session autosave, force the reveal here so the pill and
    // header coins always show up once the session truly ends.
    renderProfile();
    window.PolytypeGameState?.refresh?.();
    if (timedResultCoins && state.pendingSessionCoins > 0) {
        timedResultCoins.textContent = tr("trainer.coinsEarned", { count: state.pendingSessionCoins });
    }
    state.pendingSessionCoins = 0;
    await flushPendingStreakCelebration();
    await flushPendingMissionCelebration();
    await flushPendingBadgeCelebration();

    await minDelay;
    setResultButtonsBusy(false);
}

function setResultButtonsBusy(busy) {
    if (timedPlayAgainBtn) timedPlayAgainBtn.disabled = busy;
    // <a> has no disabled attribute - pointer-events:none is what actually
    // blocks the click (including js/router.js's global link interceptor,
    // which never sees a click event to intercept).
    if (timedGamesBtn) timedGamesBtn.classList.toggle("is-disabled", busy);
}

function hideSessionResult() {
    if (timerResultModal) timerResultModal.hidden = true;
    if (timedResultSaveStatus) timedResultSaveStatus.textContent = "";
}

function isAnyResultVisible() {
    return Boolean(timerResultModal && !timerResultModal.hidden);
}

function setResultSaveStatus(text) {
    if (timedResultSaveStatus) timedResultSaveStatus.textContent = text;
}

async function saveCurrentSessionProgress() {
    if (state.saveInFlight) return state.savePromise?.catch(() => {});
    if (state.unsavedCorrectFields <= 0) return;

    const firebaseClient = window.PolytypeFirebase;

    if (!firebaseClient?.isSignedIn?.()) {
        if (isAnyResultVisible()) setResultSaveStatus(tr("trainer.signInSave"));
        return;
    }

    const payload = {
        courseId: state.unsavedCourseId || getCurrentCourseKey(),
        gameType: "trainer",
        correctAnswers: state.unsavedCorrectFields,
        wrongAnswers: state.unsavedWrongFields,
        bestCombo: state.unsavedBestStreak,
        wordsUsed: state.unsavedWordsUsed,
        sessionSeconds: settings.timeLimitSeconds,
        // .slice() copy, not a live reference - callApi awaits an ID token
        // before it actually serializes the request body, and
        // registerAnswer keeps appending to state.unsavedWordResults during
        // that gap; without the copy, a same-tick answer could sneak into
        // this payload yet still get "kept" by the reconciliation slice()
        // below (which trusts sentWordResultCount to match what was really
        // sent).
        wordResults: state.unsavedWordResults.slice()
    };
    const sentWordResultCount = payload.wordResults.length;

    state.saveInFlight = true;

    state.savePromise = (async () => {
        const result = await firebaseClient.completePracticeSession(payload);
        const progress = result.data;

        if (progress) {
            profile = {
                ...profile,
                xp: progress.totalXp || profile.xp,
                dayStreak: progress.streak?.currentStreak ?? profile.dayStreak,
                streakFreezes: progress.streak?.streakFreezes ?? profile.streakFreezes,
                courses: {
                    ...(profile.courses || {})
                }
            };

            if (progress.course?.courseId) {
                const incoming = progress.course;
                const cached = profile.courses[incoming.courseId];
                // xp and unlockedWords only ever grow for a course, so a
                // reply reporting fewer of either than what's already
                // cached must be an out-of-order response (e.g. a mid-game
                // autosave that was in flight when a Deck-page unlock
                // committed) - applying it would revert the newer state.
                const incomingIsFresh = !cached ||
                    ((incoming.xp || 0) >= (cached.xp || 0) &&
                        (incoming.unlockedWords?.length || 0) >= (cached.unlockedWords?.length || 0));
                if (incomingIsFresh) profile.courses[incoming.courseId] = incoming;
            }

            saveProfile();
            renderProfile();
            // Same "not during the match" rule as the pill: the header's
            // coin counter only refreshes once play has actually paused.
            if (!isActivelyPlayingSession()) window.PolytypeGameState?.refresh?.();

            if (typeof progress.sessionCoins === "number") {
                // Same accumulate-then-flush rule as missions below - shown
                // once, when the session actually ends (see endSession).
                state.pendingSessionCoins += progress.sessionCoins;
            }

            if (progress.streak?.streakAdvanced) {
                // Same accumulate-then-flush rule: shown once, when the
                // session actually ends (see endSession).
                state.pendingStreakAdvance = progress.streak;
                if (!isActivelyPlayingSession()) flushPendingStreakCelebration();
            }

            if (progress.completedMissions?.length) {
                // Same accumulate-then-flush rule: shown once, when the
                // session actually ends (see endSession).
                state.pendingCompletedMissions.push(...progress.completedMissions);
                if (!isActivelyPlayingSession()) flushPendingMissionCelebration();
            }

            if (progress.newBadges?.length) {
                state.pendingNewBadges.push(...progress.newBadges);
                if (!isActivelyPlayingSession()) flushPendingBadgeCelebration();
            }
        }

        state.unsavedCorrectFields = Math.max(0, state.unsavedCorrectFields - payload.correctAnswers);
        state.unsavedWrongFields = Math.max(0, state.unsavedWrongFields - payload.wrongAnswers);
        state.unsavedWordsUsed = Math.max(0, state.unsavedWordsUsed - payload.wordsUsed);
        // Same idea as the counters above, but for a list instead of a
        // count: drop exactly the entries this payload sent (always a
        // prefix, since registerAnswer only ever appends) and keep whatever
        // was pushed after this payload was built.
        state.unsavedWordResults = state.unsavedWordResults.slice(sentWordResultCount);
        state.unsavedBestStreak = getUnsavedAnswerCount() > 0 ? state.streak : 0;
        state.progressSaved = getUnsavedAnswerCount() === 0;
        if (state.progressSaved) state.unsavedCourseId = null;
        if (isAnyResultVisible()) setResultSaveStatus("");
    })();

    try {
        await state.savePromise;
    } catch (error) {
        console.error(error);
        if (isAnyResultVisible()) setResultSaveStatus(tr("trainer.progressNotSaved"));
    } finally {
        state.saveInFlight = false;
        state.savePromise = null;
    }
}

function isFirebaseSignedIn() {
    return Boolean(window.PolytypeFirebase?.isSignedIn?.());
}

function getUnsavedAnswerCount() {
    return state.unsavedCorrectFields + state.unsavedWrongFields;
}

function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    if (minutes === 0) return `${seconds}s`;
    return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function focusActiveRow() {
    const activeRow = rowsContainer.querySelector(".row:not(.past-row)");
    if (!activeRow) return;

    focusFirstEnabledInput(activeRow.querySelector(".meaning-input"));
}

function applyInitialVisibilityClasses() {
    document.body.classList.toggle("hide-romaji", !settings.showRomanization);
}

function getDecksForLanguage(language) {
    return AVAILABLE_DECKS.filter(deck => deck.language === language);
}

function uniqueBy(items, getKey) {
    const seen = new Set();
    return items.filter(item => {
        const key = getKey(item);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });
}

function isSubmitKey(event) {
    return event.key === "Enter" || event.key === "Tab";
}

function focusFirstEnabledInput(meaningInput) {
    // preventScroll stops the mobile browser from instantly jumping to the
    // focused input; centerRowInViewport then drives the scroll smoothly.
    if (meaningInput) meaningInput.focus({ preventScroll: true });
}

function normalizeString(str) {
    return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "")
        .trim();
}

function stripSlashes(value) {
    return String(value || "").replace(/^\/+|\/+$/g, "");
}

function stripTrailingSlash(value) {
    return String(value || "").replace(/\/+$/g, "");
}

function shuffleDeckByUnlockLevel(words) {
    if (words.length <= 1) return [...words];

    const dropRanks = getWordDropRanks();
    const ranks = words.map(word => dropRanks.get(getWordSuffix(word.id)) ?? 0);
    const minLevel = Math.min(...ranks);
    const maxLevel = Math.max(...ranks);

    if (minLevel === maxLevel) return shuffleArray(words);

    return weightedShuffleArray(words, word =>
        getUnlockLevelDrawWeight(dropRanks.get(getWordSuffix(word.id)) ?? 0, minLevel, maxLevel)
    );
}

function getUnlockLevelDrawWeight(level, minLevel, maxLevel) {
    const clampedLevel = Math.min(Math.max(level, minLevel), maxLevel);
    const levelRank = (clampedLevel - minLevel) / (maxLevel - minLevel);
    return 1 + levelRank * higherUnlockedLevelDrawBoost;
}

function weightedShuffleArray(arr, getWeight) {
    const remaining = arr.map(item => ({
        item,
        weight: Math.max(0, getWeight(item) || 0)
    }));
    const shuffled = [];

    while (remaining.length) {
        const totalWeight = remaining.reduce((sum, entry) => sum + entry.weight, 0);

        if (totalWeight <= 0) {
            shuffled.push(...shuffleArray(remaining.map(entry => entry.item)));
            break;
        }

        let roll = Math.random() * totalWeight;
        let pickedIndex = remaining.length - 1;

        for (let i = 0; i < remaining.length; i += 1) {
            roll -= remaining[i].weight;
            if (roll < 0) {
                pickedIndex = i;
                break;
            }
        }

        shuffled.push(remaining.splice(pickedIndex, 1)[0].item);
    }

    return shuffled;
}

function shuffleArray(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function centerRowInViewport(row) {
    const rowRect = row.getBoundingClientRect();
    const containerRect = rowsContainer.getBoundingClientRect();

    // The on-screen keyboard is position:fixed and covers the bottom of the
    // container, so scrolling a row flush with containerRect.bottom parked it
    // underneath the keys. Aim at whichever edge is actually visible.
    const keyboardTop = window.PolytypeKeyboard?.getVisibleBottom?.() ?? Infinity;
    const visibleBottom = Math.min(containerRect.bottom, keyboardTop);

    const targetScrollTop =
        rowsContainer.scrollTop +
        (rowRect.bottom - visibleBottom) +
        40;

    smoothScrollTo(rowsContainer, targetScrollTop, 450);
}

let activeScrollFrame = null;

function smoothScrollTo(container, targetTop, duration = 450) {
    // Cancel any in-flight scroll so overlapping animations don't fight each
    // other (the main cause of jitter when advancing rows quickly on mobile).
    if (activeScrollFrame !== null) {
        cancelAnimationFrame(activeScrollFrame);
        activeScrollFrame = null;
    }

    const startTop = container.scrollTop;
    const distance = targetTop - startTop;

    if (Math.abs(distance) < 1) return;

    const startTime = performance.now();

    function step(now) {
        const elapsed = now - startTime;
        const t = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);

        container.scrollTop = startTop + distance * eased;

        if (elapsed < duration) {
            activeScrollFrame = requestAnimationFrame(step);
        } else {
            activeScrollFrame = null;
        }
    }

    activeScrollFrame = requestAnimationFrame(step);
}

// Runs after every function/let/const above is defined - initTrainerPage
// (and anything it calls synchronously, like a Firebase onChange callback
// firing immediately on registration) can reference module-level bindings
// declared anywhere in this file, so this trigger has to sit at the very
// bottom, same reasoning as js/app-shell.js.
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTrainerPage, { once: true });
} else {
    initTrainerPage();
}
