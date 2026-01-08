// ------- Settings & state -------

const settings = {
  deckName: "topik1",
  useRomanization: true,
  infiniteRun: true,
  maxWords: 20
};

const state = {
  fullDeck: [],
  currentDeck: [],
  currentIndex: 0,
  totalChecked: 0,
  totalCorrectFields: 0,
  wordsUsed: 0
};

// DOM references
let deckSelect;
let romajiToggle;
let rowsContainer;
let progressText;
let scoreText;
let restartBtn;

// Deck index from decks/index.js
const AVAILABLE_DECKS = window.DECK_INDEX || [];

// ------- Init -------

document.addEventListener("DOMContentLoaded", () => {
  deckSelect    = document.getElementById("deck-select");
  romajiToggle  = document.getElementById("romaji-toggle");
  rowsContainer = document.getElementById("rows-container");
  progressText  = document.getElementById("progress-text");
  scoreText     = document.getElementById("score-text");
  restartBtn    = document.getElementById("restart-btn");

  deckSelect.addEventListener("change", onDeckChange);
  romajiToggle.addEventListener("change", onRomajiToggle);
  restartBtn.addEventListener("click", onRestartClick);

  // initial deck from select
  settings.deckName = deckSelect.value;

  loadDeckFromCsv(settings.deckName).then(() => {
    prepareCurrentDeck();
    clearRows();
    spawnNextRow();
    spawnNextRow();

    const rows = Array.from(rowsContainer.querySelectorAll(".row"));
    rows.forEach(r => r.classList.remove("next-preview"));
    if (rows[1]) rows[1].classList.add("next-preview");

    updateStats();
  });
});

// ------- UI handlers -------

function onDeckChange() {
  settings.deckName = deckSelect.value;
  resetState();
  clearRows();

  loadDeckFromCsv(settings.deckName).then(() => {
    prepareCurrentDeck();
    clearRows();
    spawnNextRow();
    spawnNextRow();

    const rows = Array.from(rowsContainer.querySelectorAll(".row"));
    rows.forEach(r => r.classList.remove("next-preview"));
    if (rows[1]) rows[1].classList.add("next-preview");

    updateStats();
  });
}

function onRomajiToggle() {
  settings.useRomanization = romajiToggle.checked;
  if (settings.useRomanization) {
    document.body.classList.remove("hide-romaji");
  } else {
    document.body.classList.add("hide-romaji");
  }
}

function onRestartClick() {
  resetState();
  clearRows();

  loadDeckFromCsv(settings.deckName).then(() => {
    prepareCurrentDeck();
    clearRows();
    spawnNextRow();
    spawnNextRow();

    const rows = Array.from(rowsContainer.querySelectorAll(".row"));
    rows.forEach(r => r.classList.remove("next-preview"));
    if (rows[1]) rows[1].classList.add("next-preview");

    updateStats();
  });
}

// ------- Deck loading -------

async function loadDeckFromCsv(deckId) {
  const deckMeta = AVAILABLE_DECKS.find(d => d.id === deckId);
  if (!deckMeta) {
    console.error("Deck not found:", deckId, AVAILABLE_DECKS);
    state.fullDeck = [];
    return;
  }

  const response = await fetch(deckMeta.file);
  const text = await response.text();

  const lines = text.split(/\r?\n/).filter(l => l.trim().length > 0);
  const dataLines = lines.slice(1); // skip header line

  const deck = dataLines.map(line => {
    const parts = line.split(",");
    const script = (parts[0] || "").trim();
    const romanization = (parts[1] || "").trim();
    const meaning = parts.slice(2).join(",").trim();
    return { script, romanization, meaning };
  });

  state.fullDeck = deck;
  state.currentDeck = [];
  state.currentIndex = 0;
  state.wordsUsed = 0;

  console.log("Loaded deck", deckId, "size:", state.fullDeck.length);
}

function prepareCurrentDeck() {
  const shuffled = shuffleArray([...state.fullDeck]);
  state.currentDeck = shuffled;
  state.currentIndex = 0;
  state.wordsUsed = 0;
}

function resetState() {
  state.currentIndex = 0;
  state.totalChecked = 0;
  state.totalCorrectFields = 0;
  state.wordsUsed = 0;
}

// ------- Rows -------

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
  colRom.className = "rom-col";

  const romInput = document.createElement("input");
  romInput.type = "text";
  romInput.className = "rom-input";
  romInput.autocomplete = "off";
  romInput.dataset.logicIndex = String(state.currentIndex);

  const romFeedback = document.createElement("div");
  romFeedback.className = "feedback feedback-rom";
  romFeedback.id = `feedback-rom-${visualIndex}`;

  if (!settings.useRomanization) {
    document.body.classList.add("hide-romaji");
  }

  colRom.appendChild(romInput);
  colRom.appendChild(romFeedback);

  const colMeaning = document.createElement("div");
  const meaningInput = document.createElement("input");
  meaningInput.type = "text";
  meaningInput.className = "meaning-input";
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

  const isFirstRow = state.wordsUsed === 1;
  state.currentIndex += 1;

  romInput.addEventListener("keydown", e =>
    onKeyDownRom(
      e,
      Number(romInput.dataset.logicIndex),
      romInput,
      meaningInput
    )
  );

  meaningInput.addEventListener("keydown", e =>
    onKeyDownMeaning(
      e,
      Number(meaningInput.dataset.logicIndex),
      romInput,
      meaningInput
    )
  );

  requestAnimationFrame(() => {
    row.classList.add("visible");
    centerRowInViewport(row);
    if (isFirstRow) {
      if (settings.useRomanization) romInput.focus();
      else meaningInput.focus();
    }
  });
}

// ------- Keyboard handling -------

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

    const currentRow = meaningInput.closest(".row");
    if (!currentRow) return;

    let rows = Array.from(rowsContainer.querySelectorAll(".row"));

    // mark all rows up to current as "past"
    rows.forEach(r => {
      if (Number(r.dataset.index) <= Number(currentRow.dataset.index)) {
        r.classList.add("past-row");
      }
    });

    const idx = rows.indexOf(currentRow);

    // if on last row, create a new one
    if (idx === rows.length - 1) {
      spawnNextRow();
      rows = Array.from(rowsContainer.querySelectorAll(".row"));
    }

    const nextRow = rows[idx + 1];
    if (!nextRow) return;

    // ensure there is always a preview row after nextRow
    if (idx + 2 === rows.length) {
      spawnNextRow();
      rows = Array.from(rowsContainer.querySelectorAll(".row"));
    }

    const previewRow = rows[idx + 2] || null;

    rows.forEach(r => r.classList.remove("next-preview"));
    if (previewRow) {
      previewRow.classList.add("next-preview");
    }

    const nextRom = nextRow.querySelector(".rom-input");
    const nextMeaning = nextRow.querySelector(".meaning-input");

    if (settings.useRomanization && nextRom) {
      nextRom.focus();
    } else if (nextMeaning) {
      nextMeaning.focus();
    }

    centerRowInViewport(nextRow);
  }
}

// ------- Checking & stats -------

const errorColor = "#f87171";

function checkRomajiField(logicIndex, romInput) {
  if (!settings.useRomanization) return;

  const item = state.currentDeck[logicIndex];
  if (!item) return;

  const userRom = romInput.value.trim();
  const okRom =
    normalizeString(userRom) === normalizeString(item.romanization || "");

  romInput.style.color = okRom ? "inherit" : errorColor;

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

  meaningInput.style.color = okMeaning ? "inherit" : errorColor;

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
  const perc =
    state.totalChecked > 0
      ? Math.round((state.totalCorrectFields / state.totalChecked) * 100)
      : 0;

  progressText.textContent =
    `${state.totalCorrectFields} correct / ${state.totalChecked} fields`;
  scoreText.textContent = `Score: ${perc}% `;
}

// ------- Helpers -------

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

function centerRowInViewport(row) {
  const container = rowsContainer;
  const rowRect = row.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();

  const offsetFromBottom = 40;
  const targetScrollTop =
    container.scrollTop +
    (rowRect.bottom - containerRect.bottom) +
    offsetFromBottom;

  smoothScrollTo(container, targetScrollTop, 600);
}

function smoothScrollTo(container, targetTop, duration = 500) {
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

