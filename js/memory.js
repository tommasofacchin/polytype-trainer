"use strict";

(function () {
    const THEME_KEY = "polytype-theme";
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
    // Higher difficulty = more pairs and a bigger score multiplier, so a
    // cleared Hard board always beats Medium, and Medium always beats Easy.
    const DIFFICULTIES = {
        easy:   { id: "easy",   label: "Easy",   pairs: 5,  multiplier: 1,   unlock: 1 },
        medium: { id: "medium", label: "Medium", pairs: 10, multiplier: 1.5, unlock: 3 },
        hard:   { id: "hard",   label: "Hard",   pairs: 15, multiplier: 2,   unlock: 10 }
    };

    const FLIP_BACK_DELAY = 850;

    const state = {
        vocab: [],          // every parsed word
        unlocked: [],       // words unlocked at the player's level
        unlockedLevel: 1,   // player's current course level
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
    let activeDeckMeta = null;
    let activeLanguage = FALLBACK_LANGUAGE;
    let scriptFlag = LANGUAGE_FLAGS[FALLBACK_LANGUAGE];

    document.addEventListener("DOMContentLoaded", init);

    function tr(key, params = {}) {
        return window.PolytypeI18n?.t?.(key, params) || key;
    }

    function getAppLanguage() {
        return window.PolytypeI18n?.getLanguage?.() || "en";
    }

    function getMeaningFlag() {
        return getAppLanguage() === "it"
            ? "assets/flags/italy.svg"
            : "assets/flags/english.svg";
    }

    function getActiveDeckMeta() {
        const decks = window.DECK_INDEX || [];
        const requestedLanguage = getRequestedLanguage(decks);
        const deck =
            decks.find(item => item.language === requestedLanguage) ||
            decks.find(item => item.language === FALLBACK_LANGUAGE) ||
            decks[0] ||
            null;

        if (deck?.language) {
            try {
                localStorage.setItem(LANGUAGE_KEY, deck.language);
            } catch (e) {}
        }

        return deck;
    }

    function getRequestedLanguage(decks) {
        const supported = new Set(decks.map(deck => deck.language));
        const params = new URLSearchParams(window.location.search);
        const urlLanguage = params.get("language");
        const storedLanguage = localStorage.getItem(LANGUAGE_KEY);

        if (supported.has(urlLanguage)) return urlLanguage;
        if (supported.has(storedLanguage)) return storedLanguage;
        if (supported.has(FALLBACK_LANGUAGE)) return FALLBACK_LANGUAGE;
        return decks[0]?.language || FALLBACK_LANGUAGE;
    }

    function syncLanguageUi() {
        const label = getLanguageLabel(activeLanguage);

        if (el.heading) el.heading.textContent = tr("memory.headingForLanguage", { language: label });
        if (el.subtitle) el.subtitle.textContent = tr("memory.subtitleForLanguage", { language: label });
        document.title = tr("memory.titleForLanguage", { language: label });

        const icon = document.querySelector('link[rel="icon"]');
        if (icon) icon.href = scriptFlag;
    }

    function getLanguageFlagSrc(language) {
        return LANGUAGE_FLAGS[language] || LANGUAGE_FLAGS[FALLBACK_LANGUAGE];
    }

    function getLanguageLabel(language) {
        return window.PolytypeI18n?.languageLabel?.(language) || language || tr("language.fallback");
    }

    function init() {
        activeDeckMeta = getActiveDeckMeta();
        activeLanguage = activeDeckMeta?.language || FALLBACK_LANGUAGE;
        scriptFlag = getLanguageFlagSrc(activeLanguage);

        el.board = document.getElementById("memory-board");
        el.grid = document.getElementById("memory-grid");
        el.heading = document.getElementById("memory-heading");
        el.subtitle = document.getElementById("memory-subtitle");
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
        syncLanguageUi();

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
        el.themeToggle.setAttribute("aria-label", isDark ? tr("common.switchLight") : tr("common.switchDark"));
    }

    // ── Vocabulary loading ──────────────────────────────────
    async function loadVocab() {
        if (!activeDeckMeta) {
            el.difficultyModal.hidden = true;
            el.grid.innerHTML = `<p class="memory-empty">${tr("memory.loadError")}</p>`;
            return;
        }

        const path = activeDeckMeta.path;
        const cols = activeDeckMeta.columns;

        try {
            const response = await fetch(path);
            if (!response.ok) throw new Error("Could not load " + path);
            state.vocab = parseDeckCsv(await response.text(), cols);
            if (!state.vocab.length) throw new Error("Empty deck");

            // Only words unlocked at the player's current level are playable,
            // matching the trainer's level gating.
            state.unlockedLevel = getUnlockedLevel(activeDeckMeta.id);
            state.unlocked = state.vocab.filter(item => item.unlockLevel <= state.unlockedLevel);

            applyDifficultyLocks();
            updateDifficultyHint(state.unlockedLevel);
            openDifficulty();
        } catch (error) {
            console.error(error);
            el.difficultyModal.hidden = true;
            el.grid.innerHTML = `<p class="memory-empty">${tr("memory.loadError")}</p>`;
        }
    }

    // Lock Medium (level 3) and Hard (level 10) until the player reaches them.
    function applyDifficultyLocks() {
        el.difficultyModal.querySelectorAll("[data-difficulty]").forEach(btn => {
            const cfg = DIFFICULTIES[btn.dataset.difficulty];
            if (!cfg) return;
            const locked = state.unlockedLevel < cfg.unlock;
            btn.classList.toggle("is-locked", locked);
            btn.disabled = locked;
            const meta = btn.querySelector(".mem-diff-meta");
            if (meta) {
                meta.textContent = locked
                    ? tr("trainer.unlocksAtLevel", { level: cfg.unlock })
                    : tr("memory.pairCount", { count: cfg.pairs });
            }
        });
    }

    function updateDifficultyHint(unlockedLevel) {
        if (!el.difficultySub) return;
        el.difficultySub.textContent = tr("memory.unlockedHint", {
            count: state.unlocked.length,
            level: unlockedLevel
        });
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
            record[meaningColumn] ||
            record[columns.meaning] ||
            record[columns.italianMeaning] ||
            ""
        );
    }

    // ── Level gating (mirrors the trainer's profile + XP math) ──
    function getUnlockedLevel(deckId) {
        const profile = getStoredProfile();
        const courses = profile.courses || {};
        // The trainer may key course progress by language or by deck id.
        const course = courses[activeLanguage] || (deckId && courses[deckId]);
        if (course && course.unlockedLevel) return course.unlockedLevel;
        if (course && course.level) return course.level;
        if (course && course.xp) return getLevelInfo(course.xp).level;
        return 1;
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
        el.grid.innerHTML = "";
        el.difficultyModal.hidden = false;
    }

    function startGame(difficultyId) {
        const cfg = DIFFICULTIES[difficultyId] || DIFFICULTIES.easy;
        if (state.unlockedLevel < cfg.unlock) return; // locked at this level
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
        // Drives the per-difficulty grid (columns/rows) in CSS.
        el.grid.dataset.pairs = String(state.pairCount);

        const fragment = document.createDocumentFragment();

        state.deck.forEach((card, index) => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "mem-card";
            button.dataset.pair = String(card.pairId);
            button.dataset.type = card.type;
            button.setAttribute("aria-label", tr("memory.hiddenCard"));
            const flag = card.type === "script" ? scriptFlag : getMeaningFlag();
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

        el.grid.innerHTML = "";
        el.grid.appendChild(fragment);
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
        button.setAttribute("aria-label", faceUp ? text : tr("memory.hiddenCard"));
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

        el.resultScore.textContent = score + " " + tr("common.points");
        el.resultDetail.textContent = tr("memory.resultDetail", {
            difficulty: tr(`memory.${state.cfg.id}`),
            time: formatTime(ms),
            moves: state.moves
        });
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
