"use strict";

(function () {
    const THEME_KEY = "polytype-theme";
    const LANGUAGE_KEY = "polytype-language";
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

    const audioBaseUrl  = stripTrailingSlash(window.POLYTYPE_AUDIO_BASE_URL  || "");
    const audioPrefix   = stripSlashes(window.POLYTYPE_AUDIO_PREFIX || "audio/v1");
    const errorColor    = "var(--danger)";
    const successColor  = "var(--success)";

    const state = {
        vocab:       [],
        deck:        [],
        currentIndex: 0,
        wordsUsed:   0,
        score:       0,
        streak:      0,
        bestStreak:  0,
        correct:     0,
        total:       0,
        started:     false
    };

    let activeLanguage  = FALLBACK_LANGUAGE;
    let activeDeckMeta  = null;
    let activeWordAudio = null;
    let playingTimeout  = null;
    let scrollFrame     = null;

    const el = {};

    document.addEventListener("DOMContentLoaded", init);

    function init() {
        el.heading     = document.getElementById("dictate-heading");
        el.subtitle    = document.getElementById("dictate-subtitle");
        el.rows        = document.getElementById("dictate-rows");
        el.audioViz    = document.getElementById("audio-viz");
        el.replayBtn   = document.getElementById("replay-btn");
        el.scoreText   = document.getElementById("dictate-score");
        el.streakText  = document.getElementById("dictate-streak");
        el.accuracyText= document.getElementById("dictate-accuracy");
        el.themeToggle = document.getElementById("theme-toggle");
        el.flagImg     = document.getElementById("current-language-flag");
        el.startModal  = document.getElementById("dictate-start-modal");
        el.startBtn    = document.getElementById("dictate-start-btn");
        el.langMenu    = document.getElementById("dictate-lang-menu");
        el.langToggle  = document.getElementById("dictate-lang-toggle");

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

    // ── Theme ────────────────────────────────────────────────────────────────

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

    // ── Language ─────────────────────────────────────────────────────────────

    function getLanguageFlagSrc(language) {
        return LANGUAGE_FLAGS[language] || "assets/flags/norway.svg";
    }

    function languageHasRomanization(language) {
        return language === "chinese" || language === "japanese";
    }

    function getRomanizationLabel(language) {
        return language === "chinese" ? "pinyin" : "romaji";
    }

    function getDeckMeta() {
        const decks = window.DECK_INDEX || [];
        const params = new URLSearchParams(window.location.search);
        const urlLang = params.get("language");
        const storedLang = localStorage.getItem(LANGUAGE_KEY);
        const supported = new Set(decks.map(d => d.language));

        const lang = supported.has(urlLang) ? urlLang
            : supported.has(storedLang) ? storedLang
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

    function onGlobalKeyDown(event) {
        if (event.key === "Escape") { closeLangMenu(); return; }
        // R / Space = replay audio when not typing
        if ((event.key === "r" || event.key === "R") && document.activeElement?.tagName !== "INPUT") {
            replayAudio();
        }
    }

    // ── Data loading ─────────────────────────────────────────────────────────

    async function loadAndStart() {
        activeDeckMeta = getDeckMeta();
        if (!activeDeckMeta) { showEmpty("No deck found."); return; }

        activeLanguage = activeDeckMeta.language;
        syncLangMenu();
        updateHeading();

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

    function updateHeading() {
        const label = activeDeckMeta?.languageLabel || activeLanguage;
        if (el.heading) el.heading.textContent = `Dictate · ${label}`;
        if (el.subtitle) {
            const hasRoman = languageHasRomanization(activeLanguage);
            el.subtitle.textContent = hasRoman
                ? `Listen and type the word — ${getRomanizationLabel(activeLanguage)} accepted.`
                : `Listen and type what you hear.`;
        }
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

    function resetState() {
        state.deck = shuffleArray([...state.vocab]);
        state.currentIndex = 0;
        state.wordsUsed = 0;
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
        spawnRow();
        updatePreview();
        syncRowInteractivity();
        focusActiveInput();
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
            state.deck = shuffleArray([...state.vocab]);
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

        const hint = document.createElement("span");
        hint.className = "dictate-hint";
        hint.textContent = item.meaning;

        const hasRoman = languageHasRomanization(activeLanguage);
        const input = document.createElement("input");
        input.type = "text";
        input.className = "dictate-input";
        input.autocomplete = "off";
        input.spellcheck = false;
        input.setAttribute("autocorrect", "off");
        input.setAttribute("autocapitalize", "off");
        input.placeholder = hasRoman
            ? `Type the word or ${getRomanizationLabel(activeLanguage)}…`
            : "Type the word…";
        input.deckItem = item;

        const feedback = document.createElement("div");
        feedback.className = "dictate-feedback";

        row.append(hint, input, feedback);
        el.rows.appendChild(row);

        requestAnimationFrame(() => row.classList.add("visible"));

        input.addEventListener("keydown", event => onInputKeyDown(event, input));
        input.addEventListener("input", () => onInputChange(input));
    }

    function onInputChange(input) {
        if (!state.started || input.dataset.submitted) return;
        const item = input.deckItem;
        if (!item || !input.value.trim()) return;
        if (isCorrectAnswer(input.value, item)) {
            input.dataset.submitted = "true";
            submitAnswer(input, true);
            advanceRow(input);
        }
    }

    function onInputKeyDown(event, input) {
        if (event.key !== "Enter" && event.key !== "Tab") return;
        if (!state.started || input.dataset.submitted) return;
        event.preventDefault();
        const isCorrect = isCorrectAnswer(input.value, input.deckItem);
        input.dataset.submitted = "true";
        submitAnswer(input, isCorrect);
        advanceRow(input);
    }

    function isCorrectAnswer(value, item) {
        const norm = normalizeString(value);
        if (!norm) return false;
        if (norm === normalizeString(item.script)) return true;
        if (languageHasRomanization(activeLanguage) && item.romanization) {
            if (norm === normalizeString(item.romanization)) return true;
        }
        return false;
    }

    function submitAnswer(input, isCorrect) {
        const item = input.deckItem;
        const feedback = input.closest(".dictate-row")?.querySelector(".dictate-feedback");

        state.total++;

        if (isCorrect) {
            state.correct++;
            state.streak++;
            state.bestStreak = Math.max(state.bestStreak, state.streak);
            state.score += Math.round(10 * getComboMultiplier(state.streak));
            input.classList.add("is-correct");
            const typed = input.value.trim();
            const showScript = normalizeString(typed) !== normalizeString(item.script);
            if (feedback) {
                feedback.className = "dictate-feedback is-correct";
                feedback.textContent = showScript ? `✓ ${item.script}` : `✓`;
                if (languageHasRomanization(activeLanguage) && item.romanization && showScript) {
                    feedback.textContent += `  ${item.romanization}`;
                }
            }
        } else {
            state.streak = 0;
            input.classList.add("is-wrong");
            if (feedback) {
                feedback.className = "dictate-feedback is-wrong";
                feedback.textContent = `${item.script}`;
                if (languageHasRomanization(activeLanguage) && item.romanization) {
                    feedback.textContent += `  (${item.romanization})`;
                }
            }
            if (!input.value.trim()) {
                input.value = item.script;
            }
        }

        updateHud();
        flashRow(input.closest(".dictate-row"), isCorrect);
    }

    function advanceRow(input) {
        const currentRow = input.closest(".dictate-row");
        if (!currentRow) return;

        let rows = Array.from(el.rows.querySelectorAll(".dictate-row"));
        rows.forEach(row => {
            if (Number(row.dataset.index) <= Number(currentRow.dataset.index)) {
                row.classList.add("past-row");
                const inp = row.querySelector("input");
                if (inp) { inp.readOnly = true; inp.tabIndex = -1; }
            }
        });

        const currentIdx = rows.indexOf(currentRow);
        if (currentIdx >= rows.length - 2) spawnRow();

        rows = Array.from(el.rows.querySelectorAll(".dictate-row"));
        const nextRow = rows[currentIdx + 1];
        if (!nextRow) return;

        updatePreview();
        syncRowInteractivity();
        focusFirstInput(nextRow);
        playWordAudio(nextRow.querySelector("input")?.deckItem);
        centerRow(nextRow);
    }

    function updatePreview() {
        const rows = Array.from(el.rows.querySelectorAll(".dictate-row"));
        rows.forEach(r => r.classList.remove("next-preview"));
        const activeIdx = rows.findIndex(r => !r.classList.contains("past-row"));
        if (activeIdx >= 0 && rows[activeIdx + 1]) rows[activeIdx + 1].classList.add("next-preview");
    }

    function syncRowInteractivity() {
        const rows = Array.from(el.rows.querySelectorAll(".dictate-row"));
        const activeRow = rows.find(r => !r.classList.contains("past-row"));
        rows.forEach(row => {
            const isActive = row === activeRow;
            row.classList.toggle("inactive-row", !isActive);
            const inp = row.querySelector("input");
            if (inp && !row.classList.contains("past-row")) {
                inp.readOnly = !isActive;
                inp.tabIndex = isActive ? 0 : -1;
                inp.setAttribute("aria-hidden", String(!isActive));
            }
        });
    }

    function focusActiveInput() {
        const inp = el.rows?.querySelector(".dictate-row:not(.past-row) input");
        if (inp) inp.focus({ preventScroll: true });
    }

    function focusFirstInput(row) {
        row?.querySelector("input")?.focus({ preventScroll: true });
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
        const inp = el.rows?.querySelector(".dictate-row:not(.past-row) input");
        if (inp?.deckItem) playWordAudio(inp.deckItem);
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
            // Keep the animation for a moment so the last ring completes
            playingTimeout = setTimeout(() => {
                el.audioViz?.classList.remove("is-playing");
                playingTimeout = null;
            }, 600);
        }
    }

    // ── HUD ───────────────────────────────────────────────────────────────────

    function updateHud() {
        if (el.scoreText)    el.scoreText.textContent    = `${state.score} pts`;
        if (el.streakText)   el.streakText.textContent   = String(state.streak);
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

    function shuffleArray(arr) {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    function stripSlashes(v)        { return String(v || "").replace(/^\/+|\/+$/g, ""); }
    function stripTrailingSlash(v)  { return String(v || "").replace(/\/+$/, ""); }

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
