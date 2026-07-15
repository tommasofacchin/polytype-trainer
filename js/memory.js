"use strict";

(function () {
    const THEME_KEY = "polytype-theme";
    const PROFILE_KEY = "polytype-profile";
    const LANGUAGE_KEY = "polytype-language";
    const SFX_MUTED_KEY = "polytype-sfx-muted";
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
        easy:   { id: "easy",   label: "Easy",   pairs: 6,  multiplier: 1,   minWords: 6 },
        medium: { id: "medium", label: "Medium", pairs: 10, multiplier: 1.5, minWords: 12 },
        hard:   { id: "hard",   label: "Hard",   pairs: 15, multiplier: 2,   minWords: 20 }
    };

    const FLIP_BACK_DELAY = 850;

    // Combo tiers scaled down from the main trainer's 5/10/15/20 thresholds
    // (js/main.js) since a memory board tops out at 15 pairs on Hard.
    const COMBO_THRESHOLDS = [3, 6, 9, 12];
    const COMBO_MULTIPLIERS = [1, 1.5, 2, 2.5, 3];
    const COMBO_BASE_POINTS = 4;

    const matchSfxUrl = "assets/sfx/correct3.mp3";
    const matchSfxVolume = 0.28;
    const comboSfxUrl = "assets/sfx/levelup3.mp3";
    const comboSfxVolume = 0.3;
    const victorySfxUrl = "assets/sfx/levelup1.mp3";
    const victorySfxVolume = 0.4;
    let matchSfxAudio = null;
    let comboSfxAudio = null;
    let victorySfxAudio = null;
    let sfxMuted = false;

    const audioBaseUrl = (window.POLYTYPE_AUDIO_BASE_URL || "").replace(/\/+$/, "");
    const audioPrefix  = (window.POLYTYPE_AUDIO_PREFIX || "audio/v1").replace(/^\/+|\/+$/g, "");

    const state = {
        vocab: [],          // every parsed word
        unlocked: [],       // words unlocked so far via category drops
        cfg: null,
        pairCount: 0,       // pairs actually in play (capped to unlocked pool)
        deck: [],
        first: null,
        lock: false,
        matched: 0,
        moves: 0,
        streak: 0,          // consecutive matches without a miss
        maxStreak: 0,
        comboPoints: 0,
        startTime: 0,
        timerId: null,
        started: false
    };

    const el = {};
    let activeDeckMeta = null;
    let activeLanguage = FALLBACK_LANGUAGE;
    let scriptFlag = LANGUAGE_FLAGS[FALLBACK_LANGUAGE];
    let activeAudio = null;

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
        el.difficultySub = document.getElementById("difficulty-sub");
        el.comboPill = document.getElementById("combo-pill");
        el.comboPillValue = document.getElementById("combo-pill-value");
        el.sfxToggle = document.getElementById("sfx-toggle");
        el.resultCombo = document.getElementById("result-combo");
        el.resultPerfect = document.getElementById("result-perfect");
        el.resultSaveStatus = document.getElementById("result-save-status");

        initSfxToggle();
        preloadSfx();
        syncLanguageUi();

        el.difficultyModal.querySelectorAll("[data-difficulty]").forEach(btn => {
            btn.addEventListener("click", () => startGame(btn.dataset.difficulty));
        });
        el.playAgainBtn.addEventListener("click", () => startGame(state.cfg.id));
        el.changeDiffBtn.addEventListener("click", openDifficulty);

        loadVocab();
    }

    // ── Sound effects ───────────────────────────────────────
    function preloadSfx() {
        matchSfxAudio = new Audio(matchSfxUrl);
        matchSfxAudio.preload = "auto";
        matchSfxAudio.volume = matchSfxVolume;
        matchSfxAudio.load();

        comboSfxAudio = new Audio(comboSfxUrl);
        comboSfxAudio.preload = "auto";
        comboSfxAudio.volume = comboSfxVolume;
        comboSfxAudio.load();

        victorySfxAudio = new Audio(victorySfxUrl);
        victorySfxAudio.preload = "auto";
        victorySfxAudio.volume = victorySfxVolume;
        victorySfxAudio.load();
    }

    function playMatchSfx() {
        playSfx(matchSfxAudio, matchSfxVolume);
    }

    function playComboSfx() {
        playSfx(comboSfxAudio, comboSfxVolume);
    }

    function playVictorySfx() {
        playSfx(victorySfxAudio, victorySfxVolume);
    }

    function playSfx(sourceAudio, volume) {
        if (sfxMuted || !sourceAudio) return;
        try {
            const audio = sourceAudio.cloneNode();
            audio.volume = volume;
            audio.play().catch(() => {});
        } catch (e) {
            // Browsers may block audio until the first user gesture.
        }
    }

    function initSfxToggle() {
        let stored = false;
        try {
            stored = localStorage.getItem(SFX_MUTED_KEY) === "true";
        } catch (e) {}
        applySfxMuted(stored);

        el.sfxToggle.addEventListener("click", () => applySfxMuted(!sfxMuted));
    }

    function applySfxMuted(muted) {
        sfxMuted = muted;
        try {
            localStorage.setItem(SFX_MUTED_KEY, String(muted));
        } catch (e) {}
        el.sfxToggle.setAttribute("aria-pressed", String(muted));
        el.sfxToggle.setAttribute("aria-label", muted ? tr("memory.unmuteSound") : tr("memory.muteSound"));
    }

    // ── Combo / streak ──────────────────────────────────────
    function getComboMultiplier(streak) {
        for (let i = COMBO_THRESHOLDS.length - 1; i >= 0; i -= 1) {
            if (streak >= COMBO_THRESHOLDS[i]) return COMBO_MULTIPLIERS[i + 1];
        }
        return COMBO_MULTIPLIERS[0];
    }

    function getComboTier(streak) {
        for (let i = COMBO_THRESHOLDS.length - 1; i >= 0; i -= 1) {
            if (streak >= COMBO_THRESHOLDS[i]) return i + 1;
        }
        return 0;
    }

    function formatMultiplier(multiplier) {
        return Number.isInteger(multiplier) ? String(multiplier) : multiplier.toFixed(1);
    }

    function updateComboHud() {
        const tier = getComboTier(state.streak);
        if (tier > 0) {
            el.comboPill.hidden = false;
            el.comboPill.dataset.tier = String(tier);
            el.comboPillValue.textContent = `×${formatMultiplier(getComboMultiplier(state.streak))}`;
        } else {
            el.comboPill.hidden = true;
            delete el.comboPill.dataset.tier;
        }
    }

    function animateComboPop(big) {
        const cls = big ? "mem-combo-pop-big" : "mem-combo-pop";
        el.comboPill.classList.remove("mem-combo-pop", "mem-combo-pop-big", "mem-combo-shake");
        void el.comboPill.offsetWidth;
        el.comboPill.classList.add(cls);
        el.comboPill.addEventListener("animationend", () => el.comboPill.classList.remove(cls), { once: true });
    }

    function animateComboBreak() {
        el.comboPill.classList.remove("mem-combo-pop", "mem-combo-pop-big", "mem-combo-shake");
        void el.comboPill.offsetWidth;
        el.comboPill.classList.add("mem-combo-shake");
        el.comboPill.addEventListener("animationend", () => el.comboPill.classList.remove("mem-combo-shake"), { once: true });
    }

    // ── Particles / floating popups ─────────────────────────
    function spawnMatchConfetti(cardA, cardB) {
        const rectA = cardA.getBoundingClientRect();
        const rectB = cardB.getBoundingClientRect();
        const x = (rectA.left + rectA.width / 2 + rectB.left + rectB.width / 2) / 2;
        const y = (rectA.top + rectA.height / 2 + rectB.top + rectB.height / 2) / 2;

        const colors = [
            "var(--mem-confetti-1)", "var(--mem-confetti-2)", "var(--mem-confetti-3)",
            "var(--mem-confetti-4)", "var(--mem-confetti-5)", "var(--mem-confetti-6)"
        ];

        const burst = document.createElement("div");
        burst.className = "mem-confetti-burst";
        let maxDur = 0;

        for (let i = 0; i < 9; i += 1) {
            const piece = document.createElement("span");
            piece.className = "mem-confetti-piece";
            const angle = Math.random() * Math.PI * 2;
            const distance = 34 + Math.random() * 34;
            const dur = 0.5 + Math.random() * 0.3;
            piece.style.left = `${x}px`;
            piece.style.top = `${y}px`;
            piece.style.setProperty("--x", `${Math.cos(angle) * distance}px`);
            piece.style.setProperty("--y", `${Math.sin(angle) * distance + 30}px`);
            piece.style.setProperty("--r", `${Math.random() * 480 - 240}deg`);
            piece.style.setProperty("--delay", `${Math.random() * 0.08}s`);
            piece.style.setProperty("--dur", `${dur}s`);
            piece.style.background = colors[i % colors.length];
            burst.appendChild(piece);
            maxDur = Math.max(maxDur, dur * 1000);
        }

        document.body.appendChild(burst);
        window.setTimeout(() => burst.remove(), maxDur + 150);
    }

    function showComboFloat(pts, tier, anchorEl) {
        const rect = anchorEl.getBoundingClientRect();
        const floatEl = document.createElement("span");
        floatEl.className = "mem-xp-float";
        floatEl.textContent = `+${pts}`;
        if (tier > 0) floatEl.dataset.tier = String(tier);
        floatEl.style.left = `${rect.left + rect.width / 2 - 14}px`;
        floatEl.style.top = `${rect.top - 4}px`;
        document.body.appendChild(floatEl);
        floatEl.addEventListener("animationend", () => floatEl.remove(), { once: true });
    }

    function celebrateBoardCleared() {
        playVictorySfx();
        const card = el.resultModal.querySelector(".mem-overlay-card");
        card.classList.add("is-victory");

        const colors = [
            "var(--mem-confetti-1)", "var(--mem-confetti-2)", "var(--mem-confetti-3)",
            "var(--mem-confetti-4)", "var(--mem-confetti-5)", "var(--mem-confetti-6)"
        ];

        const confetti = document.createElement("div");
        confetti.className = "mem-victory-confetti";
        for (let i = 0; i < 18; i += 1) {
            const piece = document.createElement("span");
            piece.className = "mem-confetti-piece";
            piece.style.left = `${10 + Math.random() * 80}%`;
            piece.style.setProperty("--x", `${(Math.random() * 2 - 1) * 60}px`);
            piece.style.setProperty("--fall", `${140 + Math.random() * 80}px`);
            piece.style.setProperty("--r", `${Math.random() * 720 - 360}deg`);
            piece.style.setProperty("--delay", `${Math.random() * 0.25}s`);
            piece.style.setProperty("--dur", `${1 + Math.random() * 0.6}s`);
            piece.style.background = colors[i % colors.length];
            confetti.appendChild(piece);
        }
        card.prepend(confetti);
    }

    function clearVictoryDecorations() {
        const card = el.resultModal.querySelector(".mem-overlay-card");
        card.classList.remove("is-victory");
        card.querySelector(".mem-victory-confetti")?.remove();
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

            // Only words unlocked so far (key spends on the Deck page) are
            // playable, matching the trainer's unlock gating.
            const courseProgress = getCourseProgress(activeDeckMeta.id);
            state.unlocked = state.vocab.filter(item => courseProgress.unlockedWords.has(getWordSuffix(item.id)));

            applyDifficultyLocks();
            updateDifficultyHint();
            openDifficulty();
        } catch (error) {
            console.error(error);
            el.difficultyModal.hidden = true;
            el.grid.innerHTML = `<p class="memory-empty">${tr("memory.loadError")}</p>`;
        }
    }

    // Lock Medium/Hard until enough words are unlocked to fill their board.
    function applyDifficultyLocks() {
        el.difficultyModal.querySelectorAll("[data-difficulty]").forEach(btn => {
            const cfg = DIFFICULTIES[btn.dataset.difficulty];
            if (!cfg) return;
            const locked = state.unlocked.length < cfg.minWords;
            btn.classList.toggle("is-locked", locked);
            btn.disabled = locked;
            const meta = btn.querySelector(".mem-diff-meta");
            if (meta) {
                meta.textContent = locked
                    ? tr("memory.unlocksAtWordCount", { count: cfg.minWords })
                    : tr("memory.pairCount", { count: cfg.pairs });
            }
        });
    }

    function updateDifficultyHint() {
        if (!el.difficultySub) return;
        el.difficultySub.textContent = tr("memory.unlockedHint", {
            count: state.unlocked.length
        });
    }

    function parseDeckCsv(csvText, columns) {
        const rows = parseCsv(csvText.trim());
        const headers = (rows.shift() || []).map(h => h.trim());

        return rows
            .map((row, i) => {
                const record = {};
                headers.forEach((header, j) => { record[header] = (row[j] || "").trim(); });
                const unlockLevel = Number.parseInt(record[columns.unlockLevel], 10);
                return {
                    id: record[columns.wordId]?.trim() || `w-${i}`,
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

    // ── Unlock gating (mirrors the trainer's profile + XP math) ──
    // Returns the course's real unlocked-word set, migrating a legacy
    // prefix-based local course (categoryIndex/categoryUnlocked, no
    // unlockedWords array yet) on the fly.
    function getCourseProgress(deckId) {
        const profile = getStoredProfile();
        const courses = profile.courses || {};
        // The trainer may key course progress by language or by deck id.
        const course = courses[activeLanguage] || (deckId && courses[deckId]);

        // No progress saved for this course yet: fall back to the starter
        // baseline rather than empty (mirrors main.js) so a course the
        // player has never opened in the Trainer still has something to
        // play here.
        if (!course) {
            const sorted = getSortedCategories();
            return { unlockedWords: new Set(sorted[0]?.wordSuffixes.slice(0, getStarterWordCount()) || []), xp: 0, purchasedKeys: 0 };
        }

        const unlockedWords = Array.isArray(course.unlockedWords)
            ? new Set(course.unlockedWords)
            : getUnlockedWordSuffixesFromPrefix(
                Math.max(0, Math.trunc(Number(course.categoryIndex) || 0)),
                Math.max(0, Math.trunc(Number(course.categoryUnlocked) || 0))
            );

        return {
            unlockedWords,
            xp: Math.max(0, Number(course.xp) || 0),
            // Guests never have coins/shop access (sign-in required), so
            // this is always 0 for them in practice.
            purchasedKeys: Math.max(0, Math.trunc(Number(course.purchasedKeys) || 0))
        };
    }

    function getSortedCategories() {
        return [...(window.POLYTYPE_CATEGORIES || [])].sort((a, b) => a.order - b.order);
    }

    function getStarterWordCount() {
        return Math.min(5, getSortedCategories()[0]?.size || 0);
    }

    function getWordSuffix(wordId) {
        const match = /(\d+)$/.exec(wordId || "");
        return match ? Number.parseInt(match[0], 10) : 0;
    }

    // Legacy (pre-keys) unlock state was a contiguous prefix. Used only to
    // migrate old local courses into a real unlockedWords set the first
    // time they're touched under the new model.
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

    function getStoredProfile() {
        try {
            return JSON.parse(localStorage.getItem(PROFILE_KEY)) || {};
        } catch (e) {
            return {};
        }
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
        clearVictoryDecorations();
    }

    function startGame(difficultyId) {
        const cfg = DIFFICULTIES[difficultyId] || DIFFICULTIES.easy;
        if (state.unlocked.length < cfg.minWords) return; // not enough words unlocked yet
        state.cfg = cfg;

        el.difficultyModal.hidden = true;
        el.resultModal.hidden = true;
        clearVictoryDecorations();

        // Draw only from unlocked words; cap pairs to what is available.
        const pairCount = Math.min(cfg.pairs, state.unlocked.length);
        state.pairCount = pairCount;
        const picked = shuffle(state.unlocked.slice()).slice(0, pairCount);

        const cards = [];
        picked.forEach((vocab, index) => {
            cards.push({ pairId: index, type: "script", text: vocab.script, wordId: vocab.id });
            cards.push({ pairId: index, type: "meaning", text: vocab.meaning });
        });
        state.deck = shuffle(cards);

        state.first = null;
        state.lock = false;
        state.matched = 0;
        state.moves = 0;
        state.streak = 0;
        state.maxStreak = 0;
        state.comboPoints = 0;
        state.started = false;
        state.startTime = 0;
        stopTimer();

        el.comboPill.hidden = true;
        delete el.comboPill.dataset.tier;
        if (el.resultSaveStatus) el.resultSaveStatus.textContent = "";

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
            // Random idle-float delay, purely cosmetic and never derived from
            // pairId, so it never leaks which cards match.
            button.style.setProperty("--idle-delay", `${(Math.random() * 2.4).toFixed(2)}s`);
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
        if (card.type === "script" && card.wordId) playCardAudio(card.wordId);

        if (!state.first) {
            state.first = { button, card };
            return;
        }

        state.moves += 1;
        updateHud();

        const firstButton = state.first.button;
        const isMatch = state.first.card.pairId === card.pairId;

        if (isMatch) {
            const prevTier = getComboTier(state.streak);
            state.streak += 1;
            state.maxStreak = Math.max(state.maxStreak, state.streak);
            const tier = getComboTier(state.streak);
            const points = Math.round(COMBO_BASE_POINTS * getComboMultiplier(state.streak));
            state.comboPoints += points;

            markMatched(firstButton);
            markMatched(button);
            state.first = null;
            state.matched += 1;
            updateHud();
            updateComboHud();

            playMatchSfx();
            spawnMatchConfetti(firstButton, button);
            showComboFloat(points, tier, button);
            if (tier > 0) {
                animateComboPop(tier > prevTier);
                if (tier > prevTier) playComboSfx();
            }

            if (state.matched === state.pairCount) finish();
        } else {
            if (state.streak > 0) animateComboBreak();
            state.streak = 0;
            updateComboHud();

            state.lock = true;
            const secondButton = button;
            firstButton.classList.add("is-mismatch");
            secondButton.classList.add("is-mismatch");
            setTimeout(() => {
                flip(firstButton, false);
                flip(secondButton, false);
                firstButton.classList.remove("is-mismatch");
                secondButton.classList.remove("is-mismatch");
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

    // ── Audio ───────────────────────────────────────────────
    function playCardAudio(wordId) {
        if (!audioBaseUrl || !activeDeckMeta) return;
        const url = [audioBaseUrl, audioPrefix, encodeURIComponent(activeDeckMeta.id), encodeURIComponent(wordId) + ".mp3"].join("/");
        try {
            if (activeAudio) { activeAudio.pause(); activeAudio = null; }
            activeAudio = new Audio(url);
            activeAudio.play().catch(() => {});
        } catch {}
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
        const score = computeScore(ms, state.cfg, state.pairCount, state.comboPoints);

        el.resultScore.textContent = score + " " + tr("common.points");
        el.resultDetail.textContent = tr("memory.resultDetail", {
            difficulty: tr(`memory.${state.cfg.id}`),
            time: formatTime(ms),
            moves: state.moves
        });

        if (state.maxStreak >= COMBO_THRESHOLDS[0]) {
            el.resultCombo.hidden = false;
            el.resultCombo.textContent = tr("memory.resultCombo", {
                multiplier: formatMultiplier(getComboMultiplier(state.maxStreak)),
                streak: state.maxStreak
            });
        } else {
            el.resultCombo.hidden = true;
        }

        el.resultPerfect.hidden = state.maxStreak !== state.pairCount;

        celebrateBoardCleared();
        el.resultModal.hidden = false;
        saveSessionProgress(ms);
    }

    // ── Progress sync ────────────────────────────────────────
    async function saveSessionProgress(ms) {
        if (!el.resultSaveStatus) return;

        const firebaseClient = window.PolytypeFirebase;
        if (!firebaseClient?.isSignedIn?.()) {
            el.resultSaveStatus.textContent = tr("trainer.signInSave");
            return;
        }

        el.resultSaveStatus.textContent = tr("trainer.savingProgress");

        const payload = {
            courseId: activeLanguage,
            gameType: "memory",
            correctAnswers: state.matched,
            wrongAnswers: Math.max(0, state.moves - state.matched),
            bestCombo: state.maxStreak,
            wordsUsed: state.pairCount,
            sessionSeconds: Math.round(ms / 1000)
        };

        try {
            const progress = window.PolytypeGameState?.completePracticeSession
                ? await window.PolytypeGameState.completePracticeSession(payload)
                : (await firebaseClient.completePracticeSession(payload))?.data;
            el.resultSaveStatus.textContent = "";

            if (progress?.completedMissions?.length) {
                await window.PolytypeMissionCelebrate?.show?.(progress.completedMissions);
            }
        } catch (error) {
            el.resultSaveStatus.textContent = error?.message || tr("trainer.signInSave");
        }
    }

    // Perfect (instant) play scores pairs * 100, scaled by difficulty.
    // Every second costs points (more on bigger boards), with a 20% floor so
    // finishing always rewards something. The difficulty multiplier keeps the
    // ordering (Hard > Medium > Easy) even when a board is capped by unlocks.
    // Combo bonus is folded in before the multiplier so it scales identically
    // to the base score and can't invert the difficulty ordering.
    function computeScore(ms, cfg, pairs, comboPoints = 0) {
        const seconds = ms / 1000;
        const maxScore = pairs * 100;
        const penalty = seconds * pairs * 1.4;
        const rawBase = Math.max(maxScore * 0.2, maxScore - penalty);
        return Math.round((rawBase + comboPoints) * cfg.multiplier);
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
