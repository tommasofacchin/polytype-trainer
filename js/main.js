const settings = {
    deckName: "",
    language: "",
    level: "",
    showRomanization: true,
    useMeaning: true,
    infiniteRun: true,
    timeLimitSeconds: 0,
    focusMode: false
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
    remainingSeconds: 0,
    timerId: null,
    answerTimeoutId: null,
    sessionStarted: false,
    lastAnswerAutoTimedOut: false,
    sessionEnded: false,
    progressSaved: false,
    saveInFlight: false,
    savePromise: null
};

const defaultProfile = {
    name: "Polytype Learner",
    xp: 0,
    dayStreak: 0,
    courses: {}
};

let levelSelect;
let levelField;
let romajiField;
let romajiToggle;
let rowsContainer;
let restartBtn;
let themeToggle;
let timeSelect;
let focusToggle;
let timerText;
let hudScoreText;
let streakText;
let streakChip;
let streakHud;
let sessionResult;
let resultScore;
let resultDetail;
let resultSaveStatus;
let playAgainBtn;
let languageMenuToggle;
let languageMenu;
let currentLanguageFlag;
let miniProfileLevel;
let miniProfileXp;
let miniProfileStreak;
let myDeckBtn;
let myDeckOverlay;
let deckGroups;
let deckModalSub;
let deckProgressFill;
let deckProgressText;
let timerStartModal;
let timerStartLabel;
let timerGoBtn;
let timerResultModal;
let timedResultScore;
let timedResultDetail;
let timedResultSaveStatus;
let timedPlayAgainBtn;
let profile = { ...defaultProfile };
// Last level reflected in the UI. Used to detect level-ups in renderProfile.
// null until the first render so we don't celebrate on initial load/hydration.
let lastShownLevel = null;

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
const levelUpSfxUrl = "assets/sfx/levelup2.mp3";
const levelUpSfxVolume = 0.38;
let correctSfxAudio = null;
let errorSfxAudio = null;
let levelUpSfxAudio = null;
let activeWordAudio = null;

document.addEventListener("DOMContentLoaded", () => {
    levelSelect = document.getElementById("level-select");
    levelField = document.getElementById("level-field");
    romajiField = document.getElementById("romaji-field");
    romajiToggle = document.getElementById("romaji-toggle");
    rowsContainer = document.getElementById("rows-container");
    restartBtn = document.getElementById("restart-btn");
    themeToggle = document.getElementById("theme-toggle");
    timeSelect = document.getElementById("time-select");
    focusToggle = document.getElementById("focus-toggle");
    timerText = document.getElementById("timer-text");
    hudScoreText = document.getElementById("hud-score-text");
    streakText = document.getElementById("streak-text");
    streakChip = document.getElementById("streak-chip");
    streakHud = document.getElementById("streak-hud");
    sessionResult = document.getElementById("session-result");
    resultScore = document.getElementById("result-score");
    resultDetail = document.getElementById("result-detail");
    resultSaveStatus = document.getElementById("result-save-status");
    playAgainBtn = document.getElementById("play-again-btn");
    languageMenuToggle = document.getElementById("language-menu-toggle");
    languageMenu = document.getElementById("language-menu");
    currentLanguageFlag = document.getElementById("current-language-flag");
    miniProfileLevel = document.getElementById("mini-profile-level");
    miniProfileXp = document.getElementById("mini-profile-xp");
    miniProfileStreak = document.getElementById("mini-profile-streak");
    myDeckBtn = document.getElementById("my-deck-btn");
    myDeckOverlay = document.getElementById("my-deck-overlay");
    deckGroups = document.getElementById("deck-groups");
    deckModalSub = document.getElementById("deck-modal-sub");
    deckProgressFill = document.getElementById("deck-progress-fill");
    deckProgressText = document.getElementById("deck-progress-text");
    timerStartModal = document.getElementById("timer-start-modal");
    timerStartLabel = document.getElementById("timer-start-label");
    timerGoBtn = document.getElementById("timer-go-btn");
    timerResultModal = document.getElementById("timer-result-modal");
    timedResultScore = document.getElementById("timed-result-score");
    timedResultDetail = document.getElementById("timed-result-detail");
    timedResultSaveStatus = document.getElementById("timed-result-save-status");
    timedPlayAgainBtn = document.getElementById("timed-play-again-btn");

    myDeckBtn.addEventListener("click", openMyDeck);
    myDeckOverlay.addEventListener("click", event => {
        if (event.target.closest("[data-deck-close]")) closeMyDeck();
    });

    levelSelect.addEventListener("change", onLevelChange);
    romajiToggle.addEventListener("change", onRomajiToggle);
    restartBtn.addEventListener("click", startSession);
    themeToggle.addEventListener("click", toggleTheme);
    timeSelect.addEventListener("change", onTimeChange);
    focusToggle.addEventListener("click", toggleFocusMode);
    playAgainBtn.addEventListener("click", startSession);
    timerGoBtn.addEventListener("click", onTimerGoClick);
    timedPlayAgainBtn.addEventListener("click", startSession);
    languageMenuToggle.addEventListener("click", toggleLanguageMenu);
    document.addEventListener("keydown", onGlobalKeyDown);
    document.addEventListener("click", onDocumentClick);
    document.addEventListener("pointerdown", unlockAudioPlayback, true);
    document.addEventListener("keydown", unlockAudioPlayback, true);

    document.querySelector(".list-card").addEventListener("click", event => {
        if (event.target.closest(".timer-modal")) return;
        if (!event.target.closest("input")) focusActiveRow();
    });

    initTheme();
    initProfile();
    setupFirebaseProfileSync();
    preloadSfx();
    populateLanguageSelect();
    updateRomajiUI();
    applyInitialVisibilityClasses();
    startSession();
});

function initTheme() {
    const storedTheme = localStorage.getItem(themeStorageKey);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = storedTheme || (prefersDark ? "dark" : "light");

    applyTheme(theme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    applyTheme(currentTheme === "dark" ? "light" : "dark");
}

function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(themeStorageKey, theme);

    const isDark = theme === "dark";
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode"
    );
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
        document.addEventListener("polytype-profile-updated", event => {
            profile = { ...defaultProfile, ...profile, ...event.detail };
            renderProfile();
            startSession();
        });
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
            xp: authState.profile.totalXp || 0,
            dayStreak: authState.profile.currentStreak || 0,
            streakFreezes: authState.profile.streakFreezes || 0,
            maxStreakFreezes: authState.profile.maxStreakFreezes || 2,
            courses: authState.profile.courses || profile.courses || {}
        };
        saveProfile();
        renderProfile();
        if (shouldRestart) startSession();
    });
}

function saveProfile() {
    localStorage.setItem(profileStorageKey, JSON.stringify(profile));
}

function renderProfile() {
    const levelInfo = getLevelInfo(profile.xp);

    miniProfileLevel.textContent = `Level ${levelInfo.level}`;
    miniProfileXp.textContent = `${levelInfo.currentXp} / ${levelInfo.nextXp} XP`;
    miniProfileStreak.textContent = `\u{1F525} ${profile.dayStreak}`;

    maybeCelebrateLevelUp(levelInfo.level);
}

function maybeCelebrateLevelUp(level) {
    const isPlaying = !state.sessionEnded && state.currentDeck.length > 0;
    if (lastShownLevel !== null && level > lastShownLevel && isPlaying) {
        for (let nextLevel = lastShownLevel + 1; nextLevel <= level; nextLevel += 1) {
            preloadAudioForLevel(nextLevel);
        }
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
    return 400 + (level - 1) * 250;
}

function populateLanguageSelect() {
    const languages = uniqueBy(
        AVAILABLE_DECKS.map(deck => ({
            value: deck.language,
            label: deck.languageLabel || deck.language,
            flagSrc: getLanguageFlagSrc(deck.language)
        })),
        item => item.value
    );

    languageMenu.replaceChildren(
        ...languages.map(language => {
            const item = document.createElement("button");
            item.type = "button";
            item.className = "language-menu-item";
            item.dataset.language = language.value;
            item.setAttribute("role", "menuitemradio");
            item.setAttribute("aria-checked", "false");
            item.innerHTML = `
                <img class="flag-mark" src="${language.flagSrc}" alt="">
                <span>${language.label}</span>
            `;
            item.addEventListener("click", () => selectLanguage(language.value));
            return item;
        })
    );

    const savedLanguage = localStorage.getItem("polytype-language");
    settings.language = languages.find(l => l.value === savedLanguage) ? savedLanguage : (languages[0]?.value || "");
    syncLanguageMenu();
    populateLevelSelect();
}

function populateLevelSelect() {
    const levels = uniqueBy(
        getDecksForLanguage(settings.language)
            .filter(deck => deck.level !== "A1")
            .map(deck => ({ value: deck.level, label: deck.level })),
        item => item.value
    );

    levelSelect.replaceChildren(
        ...levels.map(level => option(level.value, level.label))
    );

    levelField.hidden = levels.length <= 1;
    settings.level = levelSelect.value;
    populateDeckSelect();
}

function populateDeckSelect() {
    const allDecks = getDecksForLanguage(settings.language);
    const levelDecks = allDecks.filter(deck => deck.level === settings.level);
    settings.deckName = (levelDecks[0] ?? allDecks[0])?.id || "";
}

function languageHasHints() {
    return settings.language !== "norwegian";
}

function updateRomajiUI() {
    const labels = { chinese: "Pinyin", korean: "Romanization" };
    const hasHints = languageHasHints();

    romajiField.hidden = !hasHints;

    if (!hasHints) {
        settings.showRomanization = false;
        document.body.classList.add("hide-romaji");
    } else {
        const label = romajiField.querySelector(".cbx span");
        if (label) label.textContent = labels[settings.language] || "Hints";
    }
}

function onLanguageChange() {
    populateLevelSelect();
    updateRomajiUI();
    startSession();
}

function selectLanguage(language) {
    if (settings.language === language) {
        closeLanguageMenu();
        return;
    }

    settings.language = language;
    localStorage.setItem("polytype-language", language);
    syncLanguageMenu();
    onLanguageChange();
    closeLanguageMenu();
}

function syncLanguageMenu() {
    currentLanguageFlag.src = getLanguageFlagSrc(settings.language);
    languageMenuToggle.setAttribute(
        "aria-label",
        `Study language: ${getLanguageLabel(settings.language)}`
    );

    languageMenu.querySelectorAll(".language-menu-item").forEach(item => {
        const isSelected = item.dataset.language === settings.language;
        item.classList.toggle("is-active", isSelected);
        item.setAttribute("aria-checked", String(isSelected));
    });
}

function toggleLanguageMenu() {
    const willOpen = languageMenu.hidden;
    languageMenu.hidden = !willOpen;
    languageMenuToggle.setAttribute("aria-expanded", String(willOpen));
}

function closeLanguageMenu() {
    languageMenu.hidden = true;
    languageMenuToggle.setAttribute("aria-expanded", "false");
}

function onDocumentClick(event) {
    if (
        languageMenu.hidden ||
        languageMenu.contains(event.target) ||
        languageMenuToggle.contains(event.target)
    ) {
        return;
    }

    closeLanguageMenu();
}

function onLevelChange() {
    settings.level = levelSelect.value;
    populateDeckSelect();
    startSession();
}

function onTimeChange() {
    settings.timeLimitSeconds = Number(timeSelect.value);
    startSession();
}

function toggleFocusMode() {
    settings.focusMode = !settings.focusMode;
    document.body.classList.toggle("focus-mode", settings.focusMode);
    focusToggle.textContent = settings.focusMode ? "Exit focus" : "Focus";
    focusToggle.setAttribute("aria-pressed", String(settings.focusMode));
    focusActiveRow();
}

function onGlobalKeyDown(event) {
    if (event.key === "Escape" && !myDeckOverlay.hidden) {
        closeMyDeck();
        return;
    }

    if (event.key === "Escape" && !languageMenu.hidden) {
        closeLanguageMenu();
        languageMenuToggle.focus();
        return;
    }

    if (event.key === "Escape" && settings.focusMode) {
        toggleFocusMode();
    }
}

function onRomajiToggle() {
    settings.showRomanization = romajiToggle.checked;
    applyInitialVisibilityClasses();
}

async function startSession() {
    await saveCurrentSessionProgress();
    stopTimer();
    resetState();
    clearRows();
    hideSessionResult();
    updateStats();
    updateTimerDisplay();

    await loadDeck(settings.deckName);
    prepareCurrentDeck();
    preloadCurrentDeckAudio();
    spawnInitialRows();
    showSessionStartPrompt();
}

async function loadDeck(deckId) {
    const deckMeta = AVAILABLE_DECKS.find(deck => deck.id === deckId);

    if (!deckMeta) {
        showEmptyState("No deck found.");
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
        showEmptyState("Start a local server to load CSV decks.");
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
                meaning: record[columns.meaning]?.trim() || "",
                unlockLevel: Number.isFinite(unlockLevel) && unlockLevel > 0 ? unlockLevel : 1
            };
        })
        .filter(item => item.script && item.meaning);
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
    const unlockedLevel = getUnlockedLevel();
    const unlockedWords = state.fullDeck.filter(item => item.unlockLevel <= unlockedLevel);
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

function preloadAudioForLevel(level) {
    scheduleAudioPreload(state.fullDeck.filter(item => item.unlockLevel === level));
}

function getUnlockedLevel() {
    const courseProgress = profile.courses?.[settings.language] || profile.courses?.[settings.deckName];

    if (courseProgress?.unlockedLevel) return courseProgress.unlockedLevel;
    if (courseProgress?.level) return courseProgress.level;

    return getLevelInfo(profile.xp).level;
}

const LOCK_SVG =
    '<svg viewBox="0 0 24 24" aria-hidden="true">' +
    '<rect x="4.5" y="10.5" width="15" height="10" rx="2.4"></rect>' +
    '<path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"></path>' +
    '<circle cx="12" cy="15" r="1.5"></circle>' +
    '</svg>';

function openMyDeck() {
    buildMyDeck();
    myDeckOverlay.hidden = false;
    document.body.classList.add("deck-overlay-open");
    requestAnimationFrame(() => myDeckOverlay.classList.add("is-open"));
}

function closeMyDeck() {
    myDeckOverlay.classList.remove("is-open");
    document.body.classList.remove("deck-overlay-open");
    window.setTimeout(() => { myDeckOverlay.hidden = true; }, 240);
    myDeckBtn.focus();
}

function buildMyDeck() {
    const words = state.fullDeck;
    deckGroups.replaceChildren();

    if (!words.length) {
        const empty = document.createElement("p");
        empty.className = "deck-empty";
        empty.textContent = "No words loaded yet. Start a session to load this deck.";
        deckGroups.appendChild(empty);
        deckModalSub.textContent = "";
        deckProgressFill.style.width = "0%";
        deckProgressText.textContent = "";
        return;
    }

    const unlockedLevel = getUnlockedLevel();
    const unlockedCount = words.filter(word => word.unlockLevel <= unlockedLevel).length;
    const pct = Math.round((unlockedCount / words.length) * 100);

    deckModalSub.textContent =
        `${getLanguageLabel(settings.language)} · ${words.length} words`;
    deckProgressFill.style.width = `${pct}%`;
    deckProgressText.textContent = `${unlockedCount} / ${words.length} unlocked`;

    const byLevel = new Map();
    words.forEach(word => {
        if (!byLevel.has(word.unlockLevel)) byLevel.set(word.unlockLevel, []);
        byLevel.get(word.unlockLevel).push(word);
    });

    [...byLevel.keys()].sort((a, b) => a - b).forEach(level => {
        const locked = level > unlockedLevel;
        deckGroups.appendChild(buildDeckGroup(level, byLevel.get(level), locked));
    });
}

function buildDeckGroup(level, words, locked) {
    const group = document.createElement("section");
    group.className = "deck-group";
    if (locked) group.classList.add("is-locked");

    const head = document.createElement("div");
    head.className = "deck-group-head";

    const badge = document.createElement("span");
    badge.className = "deck-group-badge";
    badge.innerHTML = locked ? LOCK_SVG : "&#10003;";

    const title = document.createElement("span");
    title.className = "deck-group-title";
    title.textContent = `Level ${level}`;

    const meta = document.createElement("span");
    meta.className = "deck-group-meta";
    meta.textContent = locked
        ? `Unlocks at level ${level}`
        : `${words.length} word${words.length === 1 ? "" : "s"}`;

    head.append(badge, title, meta);

    const grid = document.createElement("div");
    grid.className = "deck-grid";
    words.forEach(word => grid.appendChild(buildDeckCard(word, level, locked)));

    group.append(head, grid);
    return group;
}

function buildDeckCard(word, level, locked) {
    const card = document.createElement("div");
    card.className = "deck-card";

    if (locked) {
        card.classList.add("is-locked");
        card.setAttribute("aria-label", `Locked word, unlocks at level ${level}`);

        const lock = document.createElement("span");
        lock.className = "deck-card-lock";
        lock.innerHTML = LOCK_SVG;

        const tag = document.createElement("span");
        tag.className = "deck-card-locktag";
        tag.textContent = `Lv ${level}`;

        card.append(lock, tag);
        return card;
    }

    card.setAttribute("role", "button");
    card.tabIndex = 0;
    card.setAttribute("aria-label", `Play audio for ${word.script || word.meaning}`);
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

    const lvl = document.createElement("span");
    lvl.className = "deck-card-lv";
    lvl.textContent = `Lv ${level}`;
    card.appendChild(lvl);

    return card;
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
    state.remainingSeconds = settings.timeLimitSeconds;
    clearAnswerTimeout();
    state.sessionStarted = false;
    state.lastAnswerAutoTimedOut = false;
    state.sessionEnded = false;
    state.progressSaved = false;
    state.saveInFlight = false;
    state.savePromise = null;
}

function clearRows() {
    rowsContainer.innerHTML = "";
}

function spawnInitialRows() {
    clearRows();

    if (!state.currentDeck.length) {
        showEmptyState("No words available in this deck.");
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

    let rows = Array.from(rowsContainer.querySelectorAll(".row"));

    rows.forEach(row => {
        if (Number(row.dataset.index) <= Number(currentRow.dataset.index)) {
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
    if (!isTimedSession() && state.lastAnswerAutoTimedOut) return;

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
        checkMeaningField(currentInput, { autoTimedOut: true });
        moveToNextRow(currentInput);
    }, getActiveAnswerTimeoutMs());
}

function getActiveAnswerTimeoutMs() {
    return isTimedSession() ? timedAnswerTimeoutMs : answerTimeoutMs;
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

    state.totalChecked += 1;
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
    if (!sourceAudio) return;

    try {
        const audio = sourceAudio.cloneNode();
        audio.volume = volume;
        audio.play().catch(() => {});
    } catch {
        // Browsers may block audio until the first user gesture.
    }
}

function awardComboPoints() {
    const multiplier = getComboMultiplier(state.streak);
    const points = Math.round(10 * multiplier);

    state.score += points;
    state.sessionXp += points;

    if (!isFirebaseSignedIn()) {
        profile.xp += points;
        saveProfile();
        renderProfile();
    }
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

    hudScoreText.textContent = `${state.score} pts`;
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
    const badgeStar = document.createElement("span");
    badgeStar.className = "levelup-badge-star";
    badgeStar.textContent = "★";
    const badgeLevel = document.createElement("span");
    badgeLevel.className = "levelup-badge-level";
    badgeLevel.textContent = String(level);
    badge.append(badgeStar, badgeLevel);

    const title = document.createElement("div");
    title.className = "levelup-title";
    title.textContent = "LEVEL UP";

    const sub = document.createElement("div");
    sub.className = "levelup-sub";
    sub.textContent = `Level ${level} reached`;

    card.append(rays, badge, title, sub);

    const newWords = state.fullDeck.filter(w => w.unlockLevel === level);
    if (newWords.length > 0) {
        const unlockSection = document.createElement("div");
        unlockSection.className = "levelup-unlocks";

        const unlockTitle = document.createElement("p");
        unlockTitle.className = "levelup-unlocks-title";
        unlockTitle.textContent = `${newWords.length} new word${newWords.length === 1 ? "" : "s"} unlocked`;

        const unlockGrid = document.createElement("div");
        unlockGrid.className = "levelup-unlocks-grid";
        newWords.forEach(word => {
            const chip = document.createElement("span");
            chip.className = "levelup-unlock-chip";
            chip.textContent = word.script;
            if (word.meaning) chip.title = word.meaning;
            unlockGrid.appendChild(chip);
        });

        unlockSection.append(unlockTitle, unlockGrid);
        card.appendChild(unlockSection);
    }

    const confirmBtn = document.createElement("button");
    confirmBtn.type = "button";
    confirmBtn.className = "levelup-confirm-btn";
    confirmBtn.textContent = "Got it!";
    confirmBtn.addEventListener("click", () => {
        overlay.classList.add("is-leaving");
        window.setTimeout(() => overlay.remove(), 480);
    });
    card.appendChild(confirmBtn);

    const confetti = document.createElement("div");
    confetti.className = "levelup-confetti";
    const colors = [
        getComboColor(1), getComboColor(2), getComboColor(3), getComboColor(4),
        "var(--accent)", "var(--success)"
    ];
    for (let i = 0; i < 22; i += 1) {
        const piece = document.createElement("span");
        piece.className = "levelup-confetti-piece";
        piece.style.setProperty("--x", `${(Math.random() * 2 - 1) * 42}vw`);
        piece.style.setProperty("--r", `${Math.random() * 720 - 360}deg`);
        piece.style.setProperty("--delay", `${Math.random() * 0.25}s`);
        piece.style.setProperty("--dur", `${1.1 + Math.random() * 0.9}s`);
        piece.style.left = `${48 + Math.random() * 4}%`;
        piece.style.background = colors[i % colors.length];
        confetti.appendChild(piece);
    }

    overlay.append(confetti, card);
    document.body.appendChild(overlay);
}

function getComboColor(tier) {
    return getComputedStyle(document.documentElement)
        .getPropertyValue(`--combo-${tier}`).trim() || "var(--accent)";
}

function showSessionStartPrompt() {
    if (!state.currentDeck.length) return;
    state.remainingSeconds = settings.timeLimitSeconds;
    updateTimerDisplay();
    timerStartLabel.textContent = isTimedSession()
        ? formatTime(settings.timeLimitSeconds)
        : "Free run";
    timerStartModal.hidden = false;
    requestAnimationFrame(() => timerGoBtn.focus());
}

function onTimerGoClick() {
    if (state.sessionStarted) return;

    timerStartModal.hidden = true;
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
        timerText.textContent = "Free";
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
    const scoreText = `${state.score} pts`;
    const detailText =
        `${state.totalCorrectFields} correct / ${state.totalChecked} fields - ${percentage}% accuracy - Best combo ${state.bestStreak} - +${state.sessionXp} XP`;

    if (settings.timeLimitSeconds && timerResultModal) {
        timedResultScore.textContent = scoreText;
        timedResultDetail.textContent = detailText;
        timedResultSaveStatus.textContent = "";
        timerResultModal.hidden = false;
    } else {
        resultScore.textContent = scoreText;
        resultDetail.textContent = detailText;
        resultSaveStatus.textContent = "";
        sessionResult.hidden = false;
    }

    await saveCurrentSessionProgress();
}

function hideSessionResult() {
    sessionResult.hidden = true;
    if (resultSaveStatus) resultSaveStatus.textContent = "";
    if (timerResultModal) timerResultModal.hidden = true;
    if (timedResultSaveStatus) timedResultSaveStatus.textContent = "";
    if (timerStartModal) timerStartModal.hidden = true;
}

function isAnyResultVisible() {
    return !sessionResult.hidden || (timerResultModal && !timerResultModal.hidden);
}

function setResultSaveStatus(text) {
    if (timerResultModal && !timerResultModal.hidden) {
        if (timedResultSaveStatus) timedResultSaveStatus.textContent = text;
    } else if (!sessionResult.hidden) {
        if (resultSaveStatus) resultSaveStatus.textContent = text;
    }
}

async function saveCurrentSessionProgress() {
    if (state.saveInFlight) return state.savePromise?.catch(() => {});
    if (state.unsavedCorrectFields <= 0) return;

    const firebaseClient = window.PolytypeFirebase;

    if (!firebaseClient?.isSignedIn?.()) {
        if (isAnyResultVisible()) setResultSaveStatus("Sign in to save XP.");
        return;
    }

    const payload = {
        courseId: settings.language,
        correctAnswers: state.unsavedCorrectFields,
        wrongAnswers: state.unsavedWrongFields,
        bestCombo: state.unsavedBestStreak,
        wordsUsed: state.unsavedWordsUsed,
        sessionSeconds: settings.timeLimitSeconds
    };

    state.saveInFlight = true;
    if (isAnyResultVisible()) setResultSaveStatus("Saving progress...");

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
                profile.courses[progress.course.courseId] = progress.course;
            }

            saveProfile();
            renderProfile();
        }

        state.unsavedCorrectFields = Math.max(0, state.unsavedCorrectFields - payload.correctAnswers);
        state.unsavedWrongFields = Math.max(0, state.unsavedWrongFields - payload.wrongAnswers);
        state.unsavedWordsUsed = Math.max(0, state.unsavedWordsUsed - payload.wordsUsed);
        state.unsavedBestStreak = getUnsavedAnswerCount() > 0 ? state.streak : 0;
        state.progressSaved = getUnsavedAnswerCount() === 0;
        if (isAnyResultVisible()) setResultSaveStatus("Progress saved.");
    })();

    try {
        await state.savePromise;
    } catch (error) {
        console.error(error);
        if (isAnyResultVisible()) setResultSaveStatus("Progress not saved. Try again.");
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

function getLanguageFlagSrc(language) {
    const flags = {
        chinese: "assets/flags/china.svg",
        korean: "assets/flags/korea.svg",
        norwegian: "assets/flags/norway.svg"
    };

    return flags[language] || "assets/flags/china.svg";
}

function getLanguageLabel(language) {
    const deck = AVAILABLE_DECKS.find(item => item.language === language);
    return deck?.languageLabel || language || "Language";
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

function option(value, label) {
    const optionElement = document.createElement("option");
    optionElement.value = value;
    optionElement.textContent = label;
    return optionElement;
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

    const levels = words.map(word => word.unlockLevel || 1);
    const minLevel = Math.min(...levels);
    const maxLevel = Math.max(...levels);

    if (minLevel === maxLevel) return shuffleArray(words);

    return weightedShuffleArray(words, word =>
        getUnlockLevelDrawWeight(word.unlockLevel || 1, minLevel, maxLevel)
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
    const targetScrollTop =
        rowsContainer.scrollTop +
        (rowRect.bottom - containerRect.bottom) +
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
