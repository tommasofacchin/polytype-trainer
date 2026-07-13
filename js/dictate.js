"use strict";

(function () {
    const THEME_KEY   = "polytype-theme";
    const LANGUAGE_KEY = "polytype-language";
    const PROFILE_KEY  = "polytype-profile";
    const FALLBACK_LANGUAGE = "norwegian";

    const LANGUAGE_FLAGS = {
        chinese:   "assets/flags/china.svg",
        german:    "assets/flags/germany.svg",
        italian:   "assets/flags/italy.svg",
        japanese:  "assets/flags/japan.svg",
        norwegian: "assets/flags/norway.svg",
        spanish:   "assets/flags/spain.svg",
        swedish:   "assets/flags/sweden.svg"
    };

    const audioBaseUrl = stripTrailingSlash(window.POLYTYPE_AUDIO_BASE_URL || "");
    const audioPrefix  = stripSlashes(window.POLYTYPE_AUDIO_PREFIX || "audio/v1");

    const state = {
        vocab:        [],
        deck:         [],
        currentIndex: 0,
        wordsUsed:    0,
        currentTyped: "",
        submitted:    false,
        score:        0,
        streak:       0,
        bestStreak:   0,
        correct:      0,
        total:        0,
        started:      false
    };

    let activeLanguage  = FALLBACK_LANGUAGE;
    let activeDeckMeta  = null;
    let activeWordAudio = null;
    let playingTimeout  = null;
    let scrollFrame     = null;

    const el = {};

    document.addEventListener("DOMContentLoaded", init);

    function init() {
        el.rows         = document.getElementById("dictate-rows");
        el.audioViz     = document.getElementById("audio-viz");
        el.replayBtn    = document.getElementById("replay-btn");
        el.scoreText    = document.getElementById("dictate-score");
        el.streakText   = document.getElementById("dictate-streak");
        el.accuracyText = document.getElementById("dictate-accuracy");
        el.themeToggle  = document.getElementById("theme-toggle");
        el.flagImg      = document.getElementById("current-language-flag");
        el.startModal   = document.getElementById("dictate-start-modal");
        el.startBtn     = document.getElementById("dictate-start-btn");
        el.langMenu     = document.getElementById("dictate-lang-menu");
        el.langToggle   = document.getElementById("dictate-lang-toggle");

        el.themeToggle.addEventListener("click", toggleTheme);
        el.replayBtn.addEventListener("click", replayAudio);
        el.langToggle.addEventListener("click", toggleLangMenu);
        el.startBtn.addEventListener("click", startSession);
        document.addEventListener("click", onDocClick);
        document.addEventListener("keydown", onGlobalKeyDown);
        document.addEventListener("pointerdown", unlockAudio, { once: true });

        initTheme();
        populateLangMenu();
        loadAndStart();
    }

    // ── Theme ─────────────────────────────────────────────────────────────────

    function initTheme() {
        const stored = localStorage.getItem(THEME_KEY);
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        applyTheme(stored || (prefersDark ? "dark" : "light"));
    }

    function toggleTheme() {
        applyTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
    }

    function applyTheme(theme) {
        document.documentElement.dataset.theme = theme;
        localStorage.setItem(THEME_KEY, theme);
        el.themeToggle.setAttribute("aria-pressed", String(theme === "dark"));
        el.themeToggle.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
    }

    // ── Language ──────────────────────────────────────────────────────────────

    function getLanguageFlagSrc(language) {
        return LANGUAGE_FLAGS[language] || "assets/flags/norway.svg";
    }

    function languageHasRomanization(language) {
        return language === "chinese" || language === "japanese";
    }

    function getDeckMeta() {
        const decks = window.DECK_INDEX || [];
        const storedLang = localStorage.getItem(LANGUAGE_KEY);
        const supported = new Set(decks.map(d => d.language));
        const lang = supported.has(storedLang) ? storedLang
            : supported.has(FALLBACK_LANGUAGE) ? FALLBACK_LANGUAGE
            : decks[0]?.language || FALLBACK_LANGUAGE;
        return decks.find(d => d.language === lang) || decks[0] || null;
    }

    function populateLangMenu() {
        const decks = window.DECK_INDEX || [];
        const seen = new Set();
        const languages = decks.filter(d => {
            if (seen.has(d.language)) return false;
            seen.add(d.language);
            return true;
        });

        el.langMenu.replaceChildren(
            ...languages.map(d => {
                const btn = document.createElement("button");
                btn.type = "button";
                btn.className = "language-menu-item";
                btn.dataset.language = d.language;
                btn.setAttribute("role", "menuitemradio");
                btn.setAttribute("aria-checked", "false");
                btn.innerHTML = `<img class="flag-mark" src="${getLanguageFlagSrc(d.language)}" alt=""><span>${d.languageLabel}</span>`;
                btn.addEventListener("click", () => selectLanguage(d.language));
                return btn;
            })
        );
    }

    function syncLangMenu() {
        el.flagImg.src = getLanguageFlagSrc(activeLanguage);
        el.langMenu.querySelectorAll(".language-menu-item").forEach(item => {
            const active = item.dataset.language === activeLanguage;
            item.classList.toggle("is-active", active);
            item.setAttribute("aria-checked", String(active));
        });
    }

    function toggleLangMenu() {
        const willOpen = el.langMenu.hidden;
        el.langMenu.hidden = !willOpen;
        el.langToggle.setAttribute("aria-expanded", String(willOpen));
    }

    function closeLangMenu() {
        el.langMenu.hidden = true;
        el.langToggle.setAttribute("aria-expanded", "false");
    }

    async function selectLanguage(language) {
        activeLanguage = language;
        localStorage.setItem(LANGUAGE_KEY, language);
        closeLangMenu();
        syncLangMenu();
        await loadAndStart();
    }

    function onDocClick(event) {
        if (el.langMenu.hidden) return;
        if (el.langMenu.contains(event.target) || el.langToggle.contains(event.target)) return;
        closeLangMenu();
    }

    // ── Global keyboard capture (no input element needed) ─────────────────────

    function onGlobalKeyDown(event) {
        if (event.key === "Escape") { closeLangMenu(); return; }

        // Don't capture when menu is open or session not started
        if (!state.started || state.submitted) return;
        if (!el.langMenu.hidden) return;

        if (event.key === "Backspace") {
            event.preventDefault();
            state.currentTyped = state.currentTyped.slice(0, -1);
            updateActiveDisplay();
            return;
        }

        if (event.key === "Enter" || event.key === "Tab") {
            event.preventDefault();
            submitActive();
            return;
        }

        // Regular printable character
        if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
            state.currentTyped += event.key;
            updateActiveDisplay();
            autoCheckActive();
        }
    }

    function getActiveRow() {
        return el.rows?.querySelector(".dictate-row:not(.past-row)") || null;
    }

    function getActiveTyped() {
        return getActiveRow()?.querySelector(".dictate-typed") || null;
    }

    function updateActiveDisplay() {
        const typed = getActiveTyped();
        if (typed) typed.textContent = state.currentTyped;
    }

    function autoCheckActive() {
        const typed = getActiveTyped();
        if (!typed?.deckItem) return;
        const norm = normalizeString(state.currentTyped);
        if (!norm) return;
        // Auto-advance on exact OR same-length fuzzy match (guards against premature acceptance of partial words)
        const targets = getAnswerTargets(typed.deckItem);
        const isCorrect = targets.some(t =>
            norm === t || (t.length >= 3 && norm.length >= t.length && levenshtein(norm, t) <= 1)
        );
        if (isCorrect) {
            state.submitted = true;
            submitAnswer(typed, true);
            advanceRow(getActiveRow());
        }
    }

    function submitActive() {
        const row = getActiveRow();
        const typed = row?.querySelector(".dictate-typed");
        if (!typed?.deckItem) return;
        const isCorrect = isCorrectAnswer(state.currentTyped, typed.deckItem);
        state.submitted = true;
        submitAnswer(typed, isCorrect);
        advanceRow(row);
    }

    // ── Data loading ──────────────────────────────────────────────────────────

    async function loadAndStart() {
        activeDeckMeta = getDeckMeta();
        if (!activeDeckMeta) { showEmpty("No deck found."); return; }

        activeLanguage = activeDeckMeta.language;
        syncLangMenu();

        try {
            const response = await fetch(activeDeckMeta.path);
            if (!response.ok) throw new Error("fetch failed");
            state.vocab = parseDeckCsv(await response.text(), activeDeckMeta.columns);
        } catch {
            state.vocab = [];
        }

        resetState();
        clearRows();
        updateHud();
        showStartModal();
    }

    function parseDeckCsv(csv, columns) {
        const rows = parseCsv(csv.trim());
        const headers = rows.shift() || [];
        return rows
            .map((row, i) => {
                const record = Object.fromEntries(headers.map((h, j) => [h.trim(), row[j] || ""]));
                const unlockLevel = Number.parseInt(record[columns.unlockLevel], 10);
                const script = record[columns.script]?.trim() || "";
                return {
                    id: record[columns.wordId]?.trim() || `w-${i}`,
                    script,
                    romanization: record[columns.romanization]?.trim() || "",
                    meaning: getMeaning(record, columns),
                    unlockLevel: Number.isFinite(unlockLevel) && unlockLevel > 0 ? unlockLevel : 1
                };
            })
            .filter(item => item.script && item.meaning);
    }

    function getMeaning(record, columns) {
        const appLang = window.PolytypeI18n?.getLanguage?.() || "en";
        const col = appLang === "it" ? columns.italianMeaning : columns.meaning;
        return record[col]?.trim() || record[columns.meaning]?.trim() || record[columns.italianMeaning]?.trim() || "";
    }

    function parseCsv(text) {
        const rows = [];
        let row = [], field = "", inQuotes = false;
        for (let i = 0; i < text.length; i++) {
            const ch = text[i], next = text[i + 1];
            if (ch === '"' && inQuotes && next === '"') { field += '"'; i++; }
            else if (ch === '"') inQuotes = !inQuotes;
            else if (ch === ',' && !inQuotes) { row.push(field); field = ""; }
            else if ((ch === "\n" || ch === "\r") && !inQuotes) {
                if (ch === "\r" && next === "\n") i++;
                row.push(field); rows.push(row); row = []; field = "";
            } else field += ch;
        }
        row.push(field); rows.push(row);
        return rows.filter(r => r.some(v => v.trim() !== ""));
    }

    // ── Session ───────────────────────────────────────────────────────────────

    // ── Category/drop gating (mirrors the trainer's profile + XP math) ──
    function getCategoryProgress() {
        try {
            const profile = JSON.parse(localStorage.getItem(PROFILE_KEY) || "{}");
            const courses = profile.courses || {};
            const course = courses[activeLanguage] || (activeDeckMeta?.id && courses[activeDeckMeta.id]) || null;

            // No progress saved for this course yet: fall back to the starter
            // baseline rather than zero (mirrors main.js) so a course the
            // player has never opened in the Trainer still has words to play.
            if (!course) {
                return { categoryIndex: 0, categoryUnlocked: getStarterWordCount() };
            }

            return {
                categoryIndex: Math.max(0, Math.trunc(Number(course.categoryIndex) || 0)),
                categoryUnlocked: Math.max(0, Math.trunc(Number(course.categoryUnlocked) || 0))
            };
        } catch {
            return { categoryIndex: 0, categoryUnlocked: getStarterWordCount() };
        }
    }

    function getStarterWordCount() {
        const sorted = [...(window.POLYTYPE_CATEGORIES || [])].sort((a, b) => a.order - b.order);
        return Math.min(5, sorted[0]?.size || 0);
    }

    function getWordSuffix(wordId) {
        const match = /(\d+)$/.exec(wordId || "");
        return match ? Number.parseInt(match[0], 10) : 0;
    }

    function getUnlockedWordSuffixes(categoryIndex, categoryUnlocked) {
        const categories = [...(window.POLYTYPE_CATEGORIES || [])].sort((a, b) => a.order - b.order);
        const unlocked = new Set();

        categories.forEach(category => {
            if (category.order < categoryIndex) {
                category.wordSuffixes.forEach(suffix => unlocked.add(suffix));
            } else if (category.order === categoryIndex) {
                category.wordSuffixes.slice(0, categoryUnlocked).forEach(suffix => unlocked.add(suffix));
            }
        });

        return unlocked;
    }

    function getUnlockedDeck() {
        const progress = getCategoryProgress();
        const unlockedSuffixes = getUnlockedWordSuffixes(progress.categoryIndex, progress.categoryUnlocked);
        const unlocked = state.vocab.filter(item => unlockedSuffixes.has(getWordSuffix(item.id)));
        return unlocked.length > 0 ? unlocked : state.vocab;
    }

    function resetState() {
        state.deck = shuffleArray(getUnlockedDeck());
        state.currentIndex = 0;
        state.wordsUsed = 0;
        state.currentTyped = "";
        state.submitted = false;
        state.score = 0;
        state.streak = 0;
        state.bestStreak = 0;
        state.correct = 0;
        state.total = 0;
        state.started = false;
    }

    function showStartModal() {
        if (el.startModal) {
            el.startModal.hidden = false;
            requestAnimationFrame(() => el.startBtn?.focus());
        }
    }

    function startSession() {
        if (el.startModal) el.startModal.hidden = true;
        state.started = true;
        clearRows();
        spawnRow();
        playCurrentAudio();
    }

    // ── Rows ──────────────────────────────────────────────────────────────────

    function clearRows() {
        if (el.rows) el.rows.innerHTML = "";
    }

    function showEmpty(msg) {
        clearRows();
        const div = document.createElement("div");
        div.className = "dictate-empty";
        div.textContent = msg;
        el.rows?.appendChild(div);
    }

    function spawnRow() {
        if (!state.vocab.length) { showEmpty("No words loaded. Start a local server to load decks."); return; }

        if (state.currentIndex >= state.deck.length) {
            state.deck = shuffleArray(getUnlockedDeck());
            state.currentIndex = 0;
        }

        const item = state.deck[state.currentIndex];
        if (!item) return;

        const visualIndex = state.wordsUsed;
        state.wordsUsed++;
        state.currentIndex++;

        const row = document.createElement("div");
        row.className = "dictate-row";
        row.dataset.index = String(visualIndex);

        // Display div — no <input>, no focus
        const typed = document.createElement("div");
        typed.className = "dictate-typed";
        typed.deckItem = item;

        const feedback = document.createElement("div");
        feedback.className = "dictate-feedback";

        row.append(typed, feedback);
        el.rows.appendChild(row);

        requestAnimationFrame(() => row.classList.add("visible"));
    }

    function submitAnswer(typedDiv, isCorrect) {
        const item = typedDiv.deckItem;
        const row = typedDiv.closest(".dictate-row");
        const feedback = row?.querySelector(".dictate-feedback");

        state.total++;

        if (isCorrect) {
            state.correct++;
            state.streak++;
            state.bestStreak = Math.max(state.bestStreak, state.streak);
            state.score += Math.round(10 * getComboMultiplier(state.streak));
            typedDiv.classList.add("is-correct");
            // If user typed romanization, show the script below
            const showScript = normalizeString(state.currentTyped) !== normalizeString(item.script);
            if (feedback && showScript) {
                feedback.className = "dictate-feedback is-correct";
                feedback.textContent = item.script;
                if (languageHasRomanization(activeLanguage) && item.romanization) {
                    feedback.textContent += `  ${item.romanization}`;
                }
            }
        } else {
            state.streak = 0;
            // Replace typed text with correct word in red
            typedDiv.textContent = item.script;
            typedDiv.classList.add("is-wrong");
            if (feedback && languageHasRomanization(activeLanguage) && item.romanization) {
                feedback.className = "dictate-feedback is-wrong";
                feedback.textContent = item.romanization;
            }
        }

        updateHud();
        if (row) flashRow(row, isCorrect);
    }

    function advanceRow(row) {
        if (!row) return;

        // Mark current row as past
        const rows = Array.from(el.rows.querySelectorAll(".dictate-row"));
        rows.forEach(r => {
            if (Number(r.dataset.index) <= Number(row.dataset.index)) {
                r.classList.add("past-row");
            }
        });

        // Reset typed state for next word
        state.currentTyped = "";
        state.submitted = false;

        // Spawn and scroll to next row
        spawnRow();

        const nextRow = el.rows.querySelector(".dictate-row:not(.past-row)");
        if (!nextRow) return;

        playWordAudio(nextRow.querySelector(".dictate-typed")?.deckItem);
        centerRow(nextRow);
    }

    function flashRow(row, isCorrect) {
        if (!row) return;
        const cls = isCorrect ? "row-flash-correct" : "row-flash-wrong";
        row.classList.remove("row-flash-correct", "row-flash-wrong");
        void row.offsetWidth;
        row.classList.add(cls);
        row.addEventListener("animationend", () => row.classList.remove(cls), { once: true });
    }

    // ── Audio ─────────────────────────────────────────────────────────────────

    function unlockAudio() {
        if (!state.started) return;
        playCurrentAudio();
    }

    function playCurrentAudio() {
        const typed = el.rows?.querySelector(".dictate-row:not(.past-row) .dictate-typed");
        if (typed?.deckItem) playWordAudio(typed.deckItem);
    }

    function replayAudio() {
        playCurrentAudio();
    }

    function getWordAudioUrl(item) {
        if (!audioBaseUrl || !activeDeckMeta) return null;
        return [audioBaseUrl, audioPrefix, encodeURIComponent(activeDeckMeta.id), `${encodeURIComponent(item.id)}.mp3`].join("/");
    }

    function playWordAudio(item) {
        if (!item?.id || !audioBaseUrl) return;
        const url = getWordAudioUrl(item);
        if (!url) return;

        try {
            if (activeWordAudio) {
                activeWordAudio.pause();
                activeWordAudio.currentTime = 0;
            }
            activeWordAudio = new Audio(url);
            activeWordAudio.addEventListener("play",  () => setAudioPlaying(true));
            activeWordAudio.addEventListener("ended", () => setAudioPlaying(false));
            activeWordAudio.addEventListener("pause", () => setAudioPlaying(false));
            activeWordAudio.addEventListener("error", () => setAudioPlaying(false));
            activeWordAudio.play().catch(() => setAudioPlaying(false));
        } catch {
            setAudioPlaying(false);
        }
    }

    function setAudioPlaying(playing) {
        if (playingTimeout) { clearTimeout(playingTimeout); playingTimeout = null; }
        if (playing) {
            el.audioViz?.classList.add("is-playing");
        } else {
            playingTimeout = setTimeout(() => {
                el.audioViz?.classList.remove("is-playing");
                playingTimeout = null;
            }, 600);
        }
    }

    // ── HUD ───────────────────────────────────────────────────────────────────

    function updateHud() {
        if (el.scoreText)    el.scoreText.textContent  = `${state.score} pts`;
        if (el.streakText)   el.streakText.textContent = String(state.streak);
        if (el.accuracyText) {
            const pct = state.total > 0 ? Math.round((state.correct / state.total) * 100) : 100;
            el.accuracyText.textContent = `${pct}%`;
        }
    }

    function getComboMultiplier(streak) {
        if (streak >= 20) return 3;
        if (streak >= 15) return 2.5;
        if (streak >= 10) return 2;
        if (streak >= 5)  return 1.5;
        return 1;
    }

    // ── Utils ─────────────────────────────────────────────────────────────────

    function normalizeString(str) {
        return String(str)
            .toLowerCase()
            .normalize("NFD")
            .replace(/[̀-ͯ]/g, "")
            .replace(/\s+/g, "")
            .trim();
    }

    function getAnswerTargets(item) {
        const targets = [normalizeString(item.script)];
        if (languageHasRomanization(activeLanguage) && item.romanization) {
            targets.push(normalizeString(item.romanization));
        }
        return targets;
    }

    function isCorrectAnswer(typed, item) {
        const norm = normalizeString(typed);
        if (!norm) return false;
        return getAnswerTargets(item).some(t =>
            norm === t || (t.length >= 3 && levenshtein(norm, t) <= 1)
        );
    }

    function levenshtein(a, b) {
        if (a === b) return 0;
        const m = a.length, n = b.length;
        if (m === 0) return n;
        if (n === 0) return m;
        const dp = Array.from({ length: m + 1 }, (_, i) => i);
        for (let j = 1; j <= n; j++) {
            let prev = dp[0];
            dp[0] = j;
            for (let i = 1; i <= m; i++) {
                const temp = dp[i];
                dp[i] = a[i - 1] === b[j - 1] ? prev : 1 + Math.min(prev, dp[i], dp[i - 1]);
                prev = temp;
            }
        }
        return dp[m];
    }

    function shuffleArray(arr) {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    function stripSlashes(v)       { return String(v || "").replace(/^\/+|\/+$/g, ""); }
    function stripTrailingSlash(v) { return String(v || "").replace(/\/+$/, ""); }

    function centerRow(row) {
        if (!el.rows || !row) return;
        const rowRect = row.getBoundingClientRect();
        const containerRect = el.rows.getBoundingClientRect();
        smoothScroll(el.rows, el.rows.scrollTop + (rowRect.bottom - containerRect.bottom) + 40, 450);
    }

    function smoothScroll(container, targetTop, duration) {
        if (scrollFrame !== null) { cancelAnimationFrame(scrollFrame); scrollFrame = null; }
        const startTop = container.scrollTop;
        const distance = targetTop - startTop;
        if (Math.abs(distance) < 1) return;
        const startTime = performance.now();
        function step(now) {
            const t = Math.min((now - startTime) / duration, 1);
            container.scrollTop = startTop + distance * (1 - Math.pow(1 - t, 3));
            scrollFrame = t < 1 ? requestAnimationFrame(step) : null;
        }
        scrollFrame = requestAnimationFrame(step);
    }
})();
