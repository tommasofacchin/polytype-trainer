const settings = {
    language: "ko",
    deckName: "koBase",
    useRomanization: true,
    infiniteRun: true,
    maxWords: 20
};

const state = {
    fullDeck: [],
    currentDeck: [],
    currentIndex: 0,        // indice logico nel deck corrente
    totalChecked: 0,
    totalCorrectFields: 0,
    wordsUsed: 0
};

let languageSelect;
let deckSelect;
let romajiToggle;
let rowsContainer;
let progressText;
let scoreText;

let modeSelect;
let maxWordsInput;

document.addEventListener("DOMContentLoaded", () => {
    languageSelect = document.getElementById("language-select");
    deckSelect = document.getElementById("deck-select");
    romajiToggle = document.getElementById("romaji-toggle");
    rowsContainer = document.getElementById("rows-container");
    progressText = document.getElementById("progress-text");
    scoreText = document.getElementById("score-text");

    modeSelect = document.getElementById("mode-select");
    maxWordsInput = document.getElementById("max-words-input");

    languageSelect.addEventListener("change", onLanguageChange);
    deckSelect.addEventListener("change", onDeckChange);
    romajiToggle.addEventListener("change", onRomajiToggle);
    modeSelect.addEventListener("change", onModeChange);
    maxWordsInput.addEventListener("change", onMaxWordsChange);

    loadDeck();
    prepareCurrentDeck();
    spawnNextRow();
    updateStats();
});

function onLanguageChange() {
    settings.language = languageSelect.value;
    if (settings.language === "ko") {
        deckSelect.value = "koBase";
        settings.deckName = "koBase";
    } else {
        deckSelect.value = "hsk1";
        settings.deckName = "hsk1";
    }
    resetState();
    loadDeck();
    prepareCurrentDeck();
    clearRows();
    spawnNextRow();
    updateStats();
}

function onDeckChange() {
    settings.deckName = deckSelect.value;
    resetState();
    loadDeck();
    prepareCurrentDeck();
    clearRows();
    spawnNextRow();
    updateStats();
}

function onRomajiToggle() {
    settings.useRomanization = romajiToggle.checked;
}

function onModeChange() {
    settings.infiniteRun = modeSelect.value === "infinite";
    resetState();
    prepareCurrentDeck();
    clearRows();
    spawnNextRow();
    updateStats();
}

function onMaxWordsChange() {
    const val = parseInt(maxWordsInput.value, 10);
    if (!isNaN(val) && val > 0) {
        settings.maxWords = val;
        if (!settings.infiniteRun) {
            resetState();
            prepareCurrentDeck();
            clearRows();
            spawnNextRow();
            updateStats();
        }
    }
}

function loadDeck() {
    let deck = [];
    if (settings.language === "ko") {
        deck = (window.KOREAN_DECKS && window.KOREAN_DECKS[settings.deckName]) || [];
    } else {
        deck = (window.CHINESE_DECKS && window.CHINESE_DECKS[settings.deckName]) || [];
    }
    state.fullDeck = [...deck];
}


function prepareCurrentDeck() {
    const shuffled = shuffleArray([...state.fullDeck]);
    if (settings.infiniteRun) {
        state.currentDeck = shuffled;
    } else {
        state.currentDeck = shuffled.slice(0, settings.maxWords);
    }
    state.currentIndex = 0;
    state.wordsUsed = 0;
}

function resetState() {
    state.currentIndex = 0;
    state.totalChecked = 0;
    state.totalCorrectFields = 0;
    state.wordsUsed = 0;
}

function clearRows() {
    rowsContainer.innerHTML = "";
}

function spawnNextRow() {
    if (!settings.infiniteRun && state.wordsUsed >= state.currentDeck.length) {
        return;
    }

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
    colScript.textContent = item.script;

    const colRom = document.createElement("div");
    const romInput = document.createElement("input");
    romInput.type = "text";
    romInput.className = "rom-input";
    romInput.placeholder = "Romaji / Pinyin";
    romInput.autocomplete = "off";
    romInput.dataset.logicIndex = String(state.currentIndex);

    const romFeedback = document.createElement("div");
    romFeedback.className = "feedback";
    romFeedback.id = `feedback-rom-${visualIndex}`;

    if (!settings.useRomanization) {
        romInput.style.display = "none";
        romFeedback.style.display = "none";
    }

    colRom.appendChild(romInput);
    colRom.appendChild(romFeedback);

    const colMeaning = document.createElement("div");
    const meaningInput = document.createElement("input");
    meaningInput.type = "text";
    meaningInput.className = "meaning-input";
    meaningInput.placeholder = "Traduzione (italiano)";
    meaningInput.autocomplete = "off";
    meaningInput.dataset.logicIndex = String(state.currentIndex);

    const meaningFeedback = document.createElement("div");
    meaningFeedback.className = "feedback";
    meaningFeedback.id = `feedback-meaning-${visualIndex}`;

    colMeaning.appendChild(meaningInput);
    colMeaning.appendChild(meaningFeedback);

    row.appendChild(colScript);
    row.appendChild(colRom);
    row.appendChild(colMeaning);
    rowsContainer.appendChild(row);

    // fade‑in
    requestAnimationFrame(() => {
        row.classList.add("visible");
    });

    // nuova riga sempre alla stessa Y: scrollala verso il centro della viewport [web:186][web:197]
    centerRowInViewport(row);

    romInput.addEventListener("keydown", (e) =>
        onKeyDownRom(e, Number(romInput.dataset.logicIndex), romInput, meaningInput)
    );
    meaningInput.addEventListener("keydown", (e) =>
        onKeyDownMeaning(
            e,
            Number(meaningInput.dataset.logicIndex),
            romInput,
            meaningInput
        )
    );

    if (settings.useRomanization) romInput.focus();
    else meaningInput.focus();

    state.currentIndex += 1;
}

function onKeyDownRom(event, logicIndex, romInput, meaningInput) {
    if (event.key === "Enter" || event.key === "Tab") {
        event.preventDefault();
        checkRomajiField(logicIndex, romInput);
        meaningInput.focus();
    }
}

function onKeyDownMeaning(event, logicIndex, romInput, meaningInput) {
    if (event.key === "Enter" || event.key === "Tab") {
        event.preventDefault();
        checkMeaningField(logicIndex, meaningInput);
        spawnNextRow(); // subito nuova parola
    }
}

function checkRomajiField(logicIndex, romInput) {
    if (!settings.useRomanization) return;

    const item = state.currentDeck[logicIndex];
    if (!item) return;

    const userRom = romInput.value.trim();
    const okRom =
        normalizeString(userRom) === normalizeString(item.romanization || "");

    romInput.style.borderColor = okRom ? "#4ade80" : "#f87171";

    // mostra la risposta corretta solo se sbagliato
    const row = romInput.closest(".row");
    const visualIndex = row ? row.dataset.index : null;
    if (visualIndex !== null) {
        const feedback = document.getElementById(`feedback-rom-${visualIndex}`);
        if (feedback) {
            feedback.textContent = okRom ? "" : item.romanization;
        }
    }

    state.totalChecked += 1;
    if (okRom) state.totalCorrectFields += 1;
    updateStats();
}

function checkMeaningField(logicIndex, meaningInput) {
    const item = state.currentDeck[logicIndex];
    if (!item) return;

    const userMeaning = meaningInput.value.trim().toLowerCase();
    const okMeaning =
        userMeaning.length > 0 &&
        normalizeString(userMeaning) === normalizeString(item.meaning);

    meaningInput.style.borderColor = okMeaning ? "#4ade80" : "#f87171";

    const row = meaningInput.closest(".row");
    const visualIndex = row ? row.dataset.index : null;
    if (visualIndex !== null) {
        const feedback = document.getElementById(
            `feedback-meaning-${visualIndex}`
        );
        if (feedback) {
            feedback.textContent = okMeaning ? "" : item.meaning;
        }
    }

    state.totalChecked += 1;
    if (okMeaning) state.totalCorrectFields += 1;
    updateStats();
}

function updateStats() {
    const maxFields =
        state.currentDeck.length * (settings.useRomanization ? 2 : 1);

    const perc =
        state.totalChecked > 0
            ? Math.round((state.totalCorrectFields / state.totalChecked) * 100)
            : 0;

    progressText.textContent = `${state.totalCorrectFields} corrette / ${state.totalChecked} campi`;
    scoreText.textContent = `Score: ${perc}% (max teorico: ${maxFields})`;
}

function normalizeString(str) {
    return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
}

function shuffleArray(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// centra la riga in verticale nella viewport (nuova parola sempre stessa Y) [web:186][web:197]
function centerRowInViewport(row) {
    const rect = row.getBoundingClientRect();
    const rowCenter = rect.top + rect.height / 2;
    const viewportCenter = window.innerHeight / 2;
    const delta = rowCenter - viewportCenter;
    window.scrollBy({
        top: delta,
        left: 0,
        behavior: "smooth"
    });
}
