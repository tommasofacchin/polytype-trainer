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
let profile = { ...defaultProfile };

const AVAILABLE_DECKS = window.DECK_INDEX || [];
const errorColor = "var(--danger)";
const themeStorageKey = "polytype-theme";
const profileStorageKey = "polytype-profile";

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

    levelSelect.addEventListener("change", onLevelChange);
    romajiToggle.addEventListener("change", onRomajiToggle);
    restartBtn.addEventListener("click", startSession);
    themeToggle.addEventListener("click", toggleTheme);
    timeSelect.addEventListener("change", onTimeChange);
    focusToggle.addEventListener("click", toggleFocusMode);
    playAgainBtn.addEventListener("click", startSession);
    languageMenuToggle.addEventListener("click", toggleLanguageMenu);
    document.addEventListener("keydown", onGlobalKeyDown);
    document.addEventListener("click", onDocumentClick);

    initTheme();
    initProfile();
    setupFirebaseProfileSync();
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
    return 200 + (level - 1) * 120;
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

    settings.language = languages[0]?.value || "";
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

function updateRomajiUI() {
    const labels = { chinese: "Pinyin", korean: "Romanization" };
    const hasHints = settings.language !== "norwegian";

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
    spawnInitialRows();
    startTimerIfNeeded();
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
    state.currentDeck = shuffleArray(
        state.fullDeck.filter(item => item.unlockLevel <= unlockedLevel)
    );
    state.currentIndex = 0;
    state.wordsUsed = 0;
}

function getUnlockedLevel() {
    const courseProgress = profile.courses?.[settings.language] || profile.courses?.[settings.deckName];

    if (courseProgress?.unlockedLevel) return courseProgress.unlockedLevel;
    if (courseProgress?.level) return courseProgress.level;

    return getLevelInfo(profile.xp).level;
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

    const romanizationHint = document.createElement("span");
    romanizationHint.className = "romanization-hint";
    romanizationHint.textContent = `(${item.romanization})`;

    colScript.append(scriptText, romanizationHint);

    const colMeaning = document.createElement("div");
    colMeaning.className = "meaning-col";

    const meaningInput = createAnswerInput("meaning-input", state.currentIndex);
    const meaningFeedback = document.createElement("div");
    meaningFeedback.className = "feedback feedback-meaning";

    colMeaning.append(meaningInput, meaningFeedback);
    row.append(colScript, colMeaning);
    rowsContainer.appendChild(row);

    const isFirstRow = state.wordsUsed === 1;
    state.currentIndex += 1;

    meaningInput.addEventListener("keydown", event =>
        onKeyDownMeaning(event, Number(meaningInput.dataset.logicIndex), meaningInput)
    );

    meaningInput.addEventListener("input", () => {
        if (state.sessionEnded || meaningInput.dataset.autoSubmitted) return;
        if (!settings.useMeaning) return;
        const logicIndex = Number(meaningInput.dataset.logicIndex);
        const item = state.currentDeck[logicIndex];
        if (!item || meaningInput.value.trim().length === 0) return;
        if (normalizeString(meaningInput.value) === normalizeString(item.meaning)) {
            meaningInput.dataset.autoSubmitted = "true";
            checkMeaningField(logicIndex, meaningInput);
            moveToNextRow(meaningInput);
        }
    });

    requestAnimationFrame(() => {
        row.classList.add("visible");
        if (isFirstRow) focusFirstEnabledInput(meaningInput);
    });
}

function createAnswerInput(className, logicIndex) {
    const input = document.createElement("input");
    input.type = "text";
    input.className = className;
    input.autocomplete = "off";
    input.dataset.logicIndex = String(logicIndex);
    return input;
}

function onKeyDownMeaning(event, logicIndex, meaningInput) {
    if (!isSubmitKey(event)) return;
    if (state.sessionEnded) return;
    if (meaningInput.dataset.autoSubmitted) return;

    event.preventDefault();
    if (settings.useMeaning) {
        checkMeaningField(logicIndex, meaningInput);
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
    focusFirstEnabledInput(nextRow.querySelector(".meaning-input"));
    centerRowInViewport(nextRow);
}

function updatePreviewRow() {
    const rows = Array.from(rowsContainer.querySelectorAll(".row"));
    rows.forEach(row => row.classList.remove("next-preview"));

    const activeIndex = rows.findIndex(row => !row.classList.contains("past-row"));
    const previewRow = rows[activeIndex + 1];
    if (previewRow) previewRow.classList.add("next-preview");
}

function lockPastRow(row) {
    row.querySelectorAll("input").forEach(input => {
        input.readOnly = true;
        input.tabIndex = -1;
    });
}

function checkMeaningField(logicIndex, meaningInput) {
    if (!settings.useMeaning) return;

    const item = state.currentDeck[logicIndex];
    if (!item) return;

    const okMeaning =
        meaningInput.value.trim().length > 0 &&
        normalizeString(meaningInput.value) === normalizeString(item.meaning);

    markInput(meaningInput, okMeaning, item.meaning);
    registerAnswer(okMeaning, meaningInput);
}

function markInput(input, isCorrect, correctValue) {
    input.style.color = isCorrect ? "inherit" : errorColor;
    if (!isCorrect) input.value = correctValue;
}

function registerAnswer(isCorrect, meaningInput) {
    const prevStreak = state.streak;
    const prevTier = getComboTier(prevStreak);

    state.totalChecked += 1;
    if (isCorrect) {
        state.totalCorrectFields += 1;
        state.unsavedCorrectFields += 1;
        state.unsavedWordsUsed += 1;
        state.streak += 1;
        state.bestStreak = Math.max(state.bestStreak, state.streak);
        state.unsavedBestStreak = Math.max(state.unsavedBestStreak, state.streak);
        awardComboPoints();
    } else {
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

function startTimerIfNeeded() {
    if (!settings.timeLimitSeconds || !state.currentDeck.length) return;

    state.remainingSeconds = settings.timeLimitSeconds;
    updateTimerDisplay();

    state.timerId = window.setInterval(() => {
        state.remainingSeconds -= 1;
        updateTimerDisplay();

        if (state.remainingSeconds <= 0) {
            endSession();
        }
    }, 1000);
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
    state.sessionEnded = true;

    rowsContainer.querySelectorAll("input").forEach(input => {
        input.disabled = true;
    });

    const percentage =
        state.totalChecked > 0
            ? Math.round((state.totalCorrectFields / state.totalChecked) * 100)
            : 0;

    resultScore.textContent = `${state.score} pts`;
    resultDetail.textContent =
        `${state.totalCorrectFields} correct / ${state.totalChecked} fields - ${percentage}% accuracy - Best combo ${state.bestStreak} - +${state.sessionXp} XP`;
    resultSaveStatus.textContent = "";
    sessionResult.hidden = false;

    await saveCurrentSessionProgress();
}

function hideSessionResult() {
    sessionResult.hidden = true;
    if (resultSaveStatus) resultSaveStatus.textContent = "";
}

async function saveCurrentSessionProgress() {
    if (state.saveInFlight) return state.savePromise?.catch(() => {});
    if (state.unsavedCorrectFields <= 0) return;

    const firebaseClient = window.PolytypeFirebase;

    if (!firebaseClient?.isSignedIn?.()) {
        if (!sessionResult.hidden && resultSaveStatus) {
            resultSaveStatus.textContent = "Sign in to save XP.";
        }
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
    if (!sessionResult.hidden && resultSaveStatus) {
        resultSaveStatus.textContent = "Saving progress...";
    }

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
        if (!sessionResult.hidden && resultSaveStatus) {
            resultSaveStatus.textContent = "Progress saved.";
        }
    })();

    try {
        await state.savePromise;
    } catch (error) {
        console.error(error);
        if (!sessionResult.hidden && resultSaveStatus) {
            resultSaveStatus.textContent = "Progress not saved. Try again.";
        }
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
    if (meaningInput) meaningInput.focus();
}

function normalizeString(str) {
    return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "")
        .trim();
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

function smoothScrollTo(container, targetTop, duration = 450) {
    const startTop = container.scrollTop;
    const distance = targetTop - startTop;
    const startTime = performance.now();

    function step(now) {
        const elapsed = now - startTime;
        const t = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);

        container.scrollTop = startTop + distance * eased;

        if (elapsed < duration) {
            requestAnimationFrame(step);
        }
    }

    requestAnimationFrame(step);
}
