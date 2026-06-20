"use strict";

(function () {
    const THEME_KEY = "polytype-theme";
    const PROFILE_KEY = "polytype-profile";
    const LANGUAGE = "norwegian";

    const SCRIPT_FLAG = "assets/flags/norway.svg";
    const MEANING_FLAG = "assets/flags/english.svg";

    // Higher difficulty = more pairs and a bigger score multiplier, so a
    // cleared Hard board always beats Medium, and Medium always beats Easy.
    const DIFFICULTIES = {
        easy:   { id: "easy",   label: "Easy",   pairs: 5,  multiplier: 1 },
        medium: { id: "medium", label: "Medium", pairs: 10, multiplier: 1.5 },
        hard:   { id: "hard",   label: "Hard",   pairs: 15, multiplier: 2 }
    };

    const FLIP_BACK_DELAY = 850;

    const state = {
        vocab: [],          // every parsed word
        unlocked: [],       // words unlocked at the player's level
        cfg: null,
        pairCount: 0,       // pairs actually in play (capped to unlocked pool)
        deck: [],
        first: null,
        lock: false,
        matched: 0,
        moves: 0,
        startTime: 0,
        timerId: null,
        started: false
    };

    const el = {};

    document.addEventListener("DOMContentLoaded", init);

    function init() {
        el.board = document.getElementById("memory-board");
        el.hud = document.getElementById("memory-hud");
        el.hudTime = document.getElementById("hud-time");
        el.hudMoves = document.getElementById("hud-moves");
        el.hudPairs = document.getElementById("hud-pairs");
        el.difficultyModal = document.getElementById("difficulty-modal");
        el.resultModal = document.getElementById("result-modal");
        el.resultScore = document.getElementById("result-score");
        el.resultDetail = document.getElementById("result-detail");
        el.playAgainBtn = document.getElementById("play-again-btn");
        el.changeDiffBtn = document.getElementById("change-difficulty-btn");
        el.themeToggle = document.getElementById("theme-toggle");
        el.difficultySub = document.getElementById("difficulty-sub");

        initTheme();

        el.difficultyModal.querySelectorAll("[data-difficulty]").forEach(btn => {
            btn.addEventListener("click", () => startGame(btn.dataset.difficulty));
        });
        el.playAgainBtn.addEventListener("click", () => startGame(state.cfg.id));
        el.changeDiffBtn.addEventListener("click", openDifficulty);

        loadVocab();
    }

    // ── Theme ───────────────────────────────────────────────
    function initTheme() {
        const stored = localStorage.getItem(THEME_KEY);
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        applyTheme(stored || (prefersDark ? "dark" : "light"));

        el.themeToggle.addEventListener("click", () => {
            const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
            applyTheme(next);
        });
    }

    function applyTheme(theme) {
        document.documentElement.dataset.theme = theme;
        try {
            localStorage.setItem(THEME_KEY, theme);
        } catch (e) {}
        const isDark = theme === "dark";
        el.themeToggle.setAttribute("aria-pressed", String(isDark));
        el.themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    }

    // ── Vocabulary loading ──────────────────────────────────
    async function loadVocab() {
        const deckMeta = (window.DECK_INDEX || []).find(d => d.language === LANGUAGE);
        const path = deckMeta ? deckMeta.path : "decks/norwegian_a1.csv";
        const cols = deckMeta
            ? deckMeta.columns
            : { script: "norwegian", meaning: "english", unlockLevel: "unlock_level" };

        try {
            const response = await fetch(path);
            if (!response.ok) throw new Error("Could not load " + path);
            state.vocab = parseDeckCsv(await response.text(), cols);
            if (!state.vocab.length) throw new Error("Empty deck");

            // Only words unlocked at the player's current level are playable,
            // matching the trainer's level gating.
            const unlockedLevel = getUnlockedLevel(deckMeta && deckMeta.id);
            state.unlocked = state.vocab.filter(item => item.unlockLevel <= unlockedLevel);

            updateDifficultyHint(unlockedLevel);
            openDifficulty();
        } catch (error) {
            console.error(error);
            el.difficultyModal.hidden = true;
            el.board.innerHTML =
                '<p class="memory-empty">Could not load the vocabulary. Start a local server ' +
                "(e.g. <code>python -m http.server</code>) and reopen this page.</p>";
        }
    }

    function updateDifficultyHint(unlockedLevel) {
        if (!el.difficultySub) return;
        el.difficultySub.textContent =
            state.unlocked.length + " words unlocked (level " + unlockedLevel +
            "). Harder = more cards and more points.";
    }

    function parseDeckCsv(csvText, columns) {
        const rows = parseCsv(csvText.trim());
        const headers = (rows.shift() || []).map(h => h.trim());

        return rows
            .map(row => {
                const record = {};
                headers.forEach((header, i) => { record[header] = (row[i] || "").trim(); });
                const unlockLevel = Number.parseInt(record[columns.unlockLevel], 10);
                return {
                    script: record[columns.script] || "",
                    meaning: record[columns.meaning] || "",
                    unlockLevel: Number.isFinite(unlockLevel) && unlockLevel > 0 ? unlockLevel : 1
                };
            })
            .filter(item => item.script && item.meaning);
    }

    // ── Level gating (mirrors the trainer's profile + XP math) ──
    function getUnlockedLevel(deckId) {
        const profile = getStoredProfile();
        const courses = profile.courses || {};
        // The trainer may key course progress by language or by deck id.
        const course = courses[LANGUAGE] || (deckId && courses[deckId]);
        if (course && course.unlockedLevel) return course.unlockedLevel;
        if (course && course.level) return course.level;
        return getLevelInfo(profile.xp || 0).level;
    }

    function getStoredProfile() {
        try {
            return JSON.parse(localStorage.getItem(PROFILE_KEY)) || {};
        } catch (e) {
            return {};
        }
    }

    function getXpForLevel(level) {
        return 400 + (level - 1) * 250;
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
        return { level };
    }

    // Minimal CSV parser (mirrors the trainer's, handles quoted fields).
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

    // ── Game flow ───────────────────────────────────────────
    function openDifficulty() {
        stopTimer();
        el.resultModal.hidden = true;
        el.hud.hidden = true;
        el.board.innerHTML = "";
        el.difficultyModal.hidden = false;
    }

    function startGame(difficultyId) {
        const cfg = DIFFICULTIES[difficultyId] || DIFFICULTIES.easy;
        state.cfg = cfg;

        el.difficultyModal.hidden = true;
        el.resultModal.hidden = true;

        // Draw only from unlocked words; cap pairs to what is available.
        const pairCount = Math.min(cfg.pairs, state.unlocked.length);
        state.pairCount = pairCount;
        const picked = shuffle(state.unlocked.slice()).slice(0, pairCount);

        const cards = [];
        picked.forEach((vocab, index) => {
            cards.push({ pairId: index, type: "script", text: vocab.script });
            cards.push({ pairId: index, type: "meaning", text: vocab.meaning });
        });
        state.deck = shuffle(cards);

        state.first = null;
        state.lock = false;
        state.matched = 0;
        state.moves = 0;
        state.started = false;
        state.startTime = 0;
        stopTimer();

        renderBoard();
        updateHud();
        el.hud.hidden = false;
    }

    function renderBoard() {
        // Drives the fixed column counts in CSS (5 / 10 / 15 pairs).
        el.board.dataset.pairs = String(state.pairCount);

        const fragment = document.createDocumentFragment();

        state.deck.forEach((card, index) => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "mem-card";
            button.dataset.pair = String(card.pairId);
            button.dataset.type = card.type;
            button.setAttribute("aria-label", "Hidden card");
            const flag = card.type === "script" ? SCRIPT_FLAG : MEANING_FLAG;
            const fontCqw = wordFontCqw(card.text);
            button.innerHTML =
                '<span class="mem-card-inner">' +
                '<span class="mem-card-face mem-card-front" aria-hidden="true">?</span>' +
                '<span class="mem-card-face mem-card-back">' +
                '<span class="mem-card-content">' +
                '<span class="mem-card-word" style="font-size:' + fontCqw + 'cqw">' +
                escapeHtml(card.text) + "</span>" +
                '<img class="mem-card-flag" src="' + flag + '" alt="" aria-hidden="true">' +
                "</span>" +
                "</span>" +
                "</span>";
            button.addEventListener("click", () => onCardClick(button, card));
            fragment.appendChild(button);
        });

        el.board.innerHTML = "";
        el.board.appendChild(fragment);
    }

    function onCardClick(button, card) {
        if (state.lock) return;
        if (button.classList.contains("is-flipped") || button.classList.contains("is-matched")) return;

        if (!state.started) {
            state.started = true;
            startTimer();
        }

        flip(button, true);

        if (!state.first) {
            state.first = { button, card };
            return;
        }

        state.moves += 1;
        updateHud();

        const firstButton = state.first.button;
        const isMatch = state.first.card.pairId === card.pairId;

        if (isMatch) {
            markMatched(firstButton);
            markMatched(button);
            state.first = null;
            state.matched += 1;
            updateHud();
            if (state.matched === state.pairCount) finish();
        } else {
            state.lock = true;
            const secondButton = button;
            setTimeout(() => {
                flip(firstButton, false);
                flip(secondButton, false);
                state.first = null;
                state.lock = false;
            }, FLIP_BACK_DELAY);
        }
    }

    function flip(button, faceUp) {
        button.classList.toggle("is-flipped", faceUp);
        const text = button.querySelector(".mem-card-back").textContent;
        button.setAttribute("aria-label", faceUp ? text : "Hidden card");
    }

    function markMatched(button) {
        button.classList.add("is-matched");
        button.disabled = true;
    }

    // ── Timer ───────────────────────────────────────────────
    function startTimer() {
        state.startTime = performance.now();
        state.timerId = window.setInterval(updateHud, 250);
    }

    function stopTimer() {
        if (state.timerId) {
            window.clearInterval(state.timerId);
            state.timerId = null;
        }
    }

    function elapsedMs() {
        return state.startTime ? performance.now() - state.startTime : 0;
    }

    function updateHud() {
        el.hudTime.textContent = formatTime(elapsedMs());
        el.hudMoves.textContent = String(state.moves);
        el.hudPairs.textContent = state.matched + " / " + state.pairCount;
    }

    // ── Result + scoring ────────────────────────────────────
    function finish() {
        stopTimer();
        const ms = elapsedMs();
        const score = computeScore(ms, state.cfg, state.pairCount);

        el.resultScore.textContent = score + " pts";
        el.resultDetail.textContent =
            state.cfg.label + " · " + formatTime(ms) + " · " + state.moves + " moves";
        el.resultModal.hidden = false;
    }

    // Perfect (instant) play scores pairs * 100, scaled by difficulty.
    // Every second costs points (more on bigger boards), with a 20% floor so
    // finishing always rewards something. The difficulty multiplier keeps the
    // ordering (Hard > Medium > Easy) even when a board is capped by unlocks.
    function computeScore(ms, cfg, pairs) {
        const seconds = ms / 1000;
        const maxScore = pairs * 100;
        const penalty = seconds * pairs * 1.4;
        const raw = Math.max(maxScore * 0.2, maxScore - penalty);
        return Math.round(raw * cfg.multiplier);
    }

    // ── Utils ───────────────────────────────────────────────
    // Font size as a share of the card width (cqw), larger for short words.
    function wordFontCqw(text) {
        const length = text.trim().length;
        if (length <= 3) return 34;
        if (length <= 5) return 27;
        if (length <= 7) return 21;
        if (length <= 9) return 17;
        if (length <= 12) return 14;
        return 11;
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i -= 1) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function formatTime(ms) {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return minutes + ":" + String(seconds).padStart(2, "0");
    }

    function escapeHtml(value) {
        return value.replace(/[&<>"']/g, ch => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        })[ch]);
    }
})();
