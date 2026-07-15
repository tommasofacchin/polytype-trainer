"use strict";

(function () {
    const THEME_KEY   = "polytype-theme";
    const LANGUAGE_KEY = "polytype-language";
    const PROFILE_KEY  = "polytype-profile";
    const FALLBACK_LANGUAGE = "norwegian";
    const xpPerDrop = 50; // keep in sync with XP_PER_DROP in api/_lib.js
    const maxKeys = 5; // keep in sync with MAX_KEYS in api/_lib.js

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
        started:      false,
        unsavedCorrect:    0,
        unsavedWrong:      0,
        unsavedWordsUsed:  0,
        unsavedBestStreak: 0,
        saveInFlight:      false,
        batchStartTime:    0
    };
    const SAVE_BATCH_SIZE = 5;

    let activeLanguage  = FALLBACK_LANGUAGE;
    let activeDeckMeta  = null;
    let activeWordAudio = null;
    let playingTimeout  = null;
    let scrollFrame     = null;

    const el = {};

    document.addEventListener("DOMContentLoaded", init);

    function tr(key, params = {}) {
        return window.PolytypeI18n?.t?.(key, params) || key;
    }

    function init() {
        el.rows         = document.getElementById("dictate-rows");
        el.audioViz     = document.getElementById("audio-viz");
        el.replayBtn    = document.getElementById("replay-btn");
        el.scoreText    = document.getElementById("dictate-score");
        el.streakText   = document.getElementById("dictate-streak");
        el.accuracyText = document.getElementById("dictate-accuracy");
        el.flagImg      = document.getElementById("current-language-flag");
        el.startModal   = document.getElementById("dictate-start-modal");
        el.startBtn     = document.getElementById("dictate-start-btn");
        el.langMenu     = document.getElementById("dictate-lang-menu");
        el.langToggle   = document.getElementById("dictate-lang-toggle");
        el.saveStatus   = document.getElementById("dictate-save-status");

        el.replayBtn.addEventListener("click", replayAudio);
        el.langToggle.addEventListener("click", toggleLangMenu);
        el.startBtn.addEventListener("click", startSession);
        document.addEventListener("click", onDocClick);
        document.addEventListener("keydown", onGlobalKeyDown);
        document.addEventListener("pointerdown", unlockAudio, { once: true });

        populateLangMenu();
        loadAndStart();
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
        await flushSessionProgress();
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

    // ── Unlock gating (mirrors the trainer's profile + XP math) ──
    // Returns the course's real unlocked-word set, migrating a legacy
    // prefix-based local course (categoryIndex/categoryUnlocked, no
    // unlockedWords array yet) on the fly.
    function getCourseProgress() {
        try {
            const profile = JSON.parse(localStorage.getItem(PROFILE_KEY) || "{}");
            const courses = profile.courses || {};
            const course = courses[activeLanguage] || (activeDeckMeta?.id && courses[activeDeckMeta.id]) || null;

            // No progress saved for this course yet: fall back to the starter
            // baseline rather than empty (mirrors main.js) so a course the
            // player has never opened in the Trainer still has words to play.
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
        } catch {
            return { unlockedWords: new Set(), xp: 0, purchasedKeys: 0 };
        }
    }

    // Mirrors getEarnedWordTotal()/getKeysHeld() in api/_lib.js - how many
    // keys the player holds, earned via XP but not yet spent on the Deck
    // page (plus any shop-bought keys).
    function getEarnedWordTotal(courseXp, unlockedCount) {
        const totalWords = getSortedCategories().reduce((sum, category) => sum + category.size, 0);
        const xpEarned = Math.min(totalWords, Math.floor(courseXp / xpPerDrop));
        return Math.max(unlockedCount, xpEarned);
    }

    function getKeysHeld(courseXp, unlockedCount, purchasedKeys) {
        const earnedKeys = Math.max(0, getEarnedWordTotal(courseXp, unlockedCount) - unlockedCount);
        return Math.max(0, Math.min(maxKeys, earnedKeys + (purchasedKeys || 0)));
    }

    function getCourseKeysHeld() {
        const progress = getCourseProgress();
        return getKeysHeld(progress.xp, progress.unlockedWords.size, progress.purchasedKeys);
    }

    function getStarterWordCount() {
        return Math.min(5, getSortedCategories()[0]?.size || 0);
    }

    function getWordSuffix(wordId) {
        const match = /(\d+)$/.exec(wordId || "");
        return match ? Number.parseInt(match[0], 10) : 0;
    }

    function getSortedCategories() {
        return [...(window.POLYTYPE_CATEGORIES || [])].sort((a, b) => a.order - b.order);
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

    function getUnlockedDeck() {
        const progress = getCourseProgress();
        const unlocked = state.vocab.filter(item => progress.unlockedWords.has(getWordSuffix(item.id)));
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
        state.unsavedCorrect = 0;
        state.unsavedWrong = 0;
        state.unsavedWordsUsed = 0;
        state.unsavedBestStreak = 0;
        state.batchStartTime = Date.now();
        if (el.saveStatus) el.saveStatus.textContent = "";
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
            state.unsavedCorrect++;
            state.unsavedWordsUsed++;
            state.unsavedBestStreak = Math.max(state.unsavedBestStreak, state.streak);
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
            state.unsavedWrong++;
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

        if ((state.unsavedCorrect + state.unsavedWrong) >= SAVE_BATCH_SIZE) {
            flushSessionProgress();
        }
    }

    // ── Progress sync ────────────────────────────────────────────────────────
    async function flushSessionProgress() {
        if (state.saveInFlight || state.unsavedCorrect <= 0) return;

        const firebaseClient = window.PolytypeFirebase;
        if (!firebaseClient?.isSignedIn?.()) {
            if (el.saveStatus) el.saveStatus.textContent = tr("trainer.signInSave");
            return;
        }

        const payload = {
            courseId: activeLanguage,
            gameType: "dictate",
            correctAnswers: state.unsavedCorrect,
            wrongAnswers: state.unsavedWrong,
            bestCombo: state.unsavedBestStreak,
            wordsUsed: state.unsavedWordsUsed,
            sessionSeconds: Math.round((Date.now() - state.batchStartTime) / 1000)
        };

        const previousKeys = getCourseKeysHeld();

        state.saveInFlight = true;
        if (el.saveStatus) el.saveStatus.textContent = tr("trainer.savingProgress");

        const savedCorrect = state.unsavedCorrect;
        const savedWrong = state.unsavedWrong;
        const savedWordsUsed = state.unsavedWordsUsed;
        state.unsavedCorrect = 0;
        state.unsavedWrong = 0;
        state.unsavedWordsUsed = 0;
        state.unsavedBestStreak = 0;
        state.batchStartTime = Date.now();

        try {
            const progress = window.PolytypeGameState?.completePracticeSession
                ? await window.PolytypeGameState.completePracticeSession(payload)
                : (await firebaseClient.completePracticeSession(payload))?.data;
            if (el.saveStatus) el.saveStatus.textContent = tr("trainer.progressSaved");

            if (progress?.course) {
                const newKeys = typeof progress.keys === "number"
                    ? progress.keys
                    : getKeysHeld(
                        progress.course.xp || 0,
                        (progress.course.unlockedWords || []).length,
                        progress.course.purchasedKeys || 0
                    );
                const gained = Math.max(0, newKeys - previousKeys);
                if (gained > 0) notifyNewKeys(gained);
            }

            if (progress?.completedMissions?.length) {
                await window.PolytypeMissionCelebrate?.show?.(progress.completedMissions);
            }
        } catch (error) {
            // Put the unsaved counts back so the next batch retries them.
            state.unsavedCorrect += savedCorrect;
            state.unsavedWrong += savedWrong;
            state.unsavedWordsUsed += savedWordsUsed;
            if (el.saveStatus) el.saveStatus.textContent = error?.message || tr("trainer.signInSave");
        } finally {
            state.saveInFlight = false;
        }
    }

    function notifyNewKeys(count) {
        document.querySelector(".drop-toast")?.remove();

        const toast = document.createElement("div");
        toast.className = "drop-toast drop-toast-notice";
        toast.innerHTML = `
            <div class="drop-toast-head">
                <span class="drop-toast-icon">\u{1F511}</span>
                <div class="drop-toast-heading">
                    <strong></strong>
                    <a href="deck.html"></a>
                </div>
            </div>
        `;
        toast.querySelector("strong").textContent = tr("trainer.newKeysReady", {
            count,
            key: count === 1 ? tr("common.key") : tr("common.keys")
        });
        toast.querySelector(".drop-toast-heading a").textContent = `${tr("trainer.goToDeck")} →`;

        document.body.appendChild(toast);
        window.setTimeout(() => {
            toast.classList.add("is-leaving");
            toast.addEventListener("animationend", () => toast.remove(), { once: true });
        }, 4200);
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
