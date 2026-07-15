"use strict";

(function () {
    const PROFILE_KEY = "polytype-profile";
    const LANGUAGE_KEY = "polytype-language";
    const FALLBACK_LANGUAGE = "norwegian";

    const audioBaseUrl = (window.POLYTYPE_AUDIO_BASE_URL || "").replace(/\/+$/, "");
    const audioPrefix = (window.POLYTYPE_AUDIO_PREFIX || "audio/v1").replace(/^\/+|\/+$/g, "");

    // Delay between a round's answer being locked in and the next round
    // starting, so the correct/wrong feedback is actually visible.
    const ROUND_ADVANCE_DELAY = 800;
    const MATCH_WRONG_FLASH_DELAY = 450;

    const ALL_ROUND_TYPES = ["mc", "match", "audio", "trueFalse", "type"];

    const state = {
        vocab: [],
        unlocked: [],
        availableRoundTypes: [],
        totalRounds: 0,
        roundIndex: 0,
        lastWordIds: [],
        score: 0,
        streak: 0,
        bestStreak: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        wordsUsed: 0,
        sessionStartTime: 0,
        roundLocked: false
    };

    let activeDeckMeta = null;
    let activeLanguage = FALLBACK_LANGUAGE;
    let activeAudio = null;

    const el = {};

    function tr(key, params = {}) {
        return window.PolytypeI18n?.t?.(key, params) || key;
    }

    function getAppLanguage() {
        return window.PolytypeI18n?.getLanguage?.() || "en";
    }

    document.addEventListener("DOMContentLoaded", () => {
        el.roundText = document.getElementById("sprint-round-text");
        el.hudScoreText = document.getElementById("sprint-hud-score-text");
        el.streakText = document.getElementById("sprint-streak-text");
        el.streakChip = document.getElementById("sprint-streak-chip");
        el.streakHud = document.getElementById("sprint-streak-hud");
        el.exerciseRoot = document.getElementById("sprint-exercise-root");
        el.resultModal = document.getElementById("sprint-result-modal");
        el.resultScore = document.getElementById("sprint-result-score");
        el.resultDetail = document.getElementById("sprint-result-detail");
        el.resultCoins = document.getElementById("sprint-result-coins");
        el.resultSaveStatus = document.getElementById("sprint-result-save-status");
        el.playAgainBtn = document.getElementById("sprint-play-again-btn");

        el.playAgainBtn.addEventListener("click", () => {
            el.resultModal.hidden = true;
            startSession();
        });

        init();
    });

    async function init() {
        activeDeckMeta = getActiveDeckMeta();
        activeLanguage = activeDeckMeta?.language || FALLBACK_LANGUAGE;

        if (!activeDeckMeta) {
            showLoadError();
            return;
        }

        try {
            const response = await fetch(activeDeckMeta.path);
            if (!response.ok) throw new Error("deck fetch failed");
            const csvText = await response.text();
            state.vocab = parseDeckCsv(csvText, activeDeckMeta.columns);
        } catch {
            showLoadError();
            return;
        }

        const courseProgress = getCourseProgress();
        state.unlocked = state.vocab.filter(item => courseProgress.unlockedWords.has(getWordSuffix(item.id)));

        if (!state.unlocked.length) {
            showLoadError();
            return;
        }

        startSession();
    }

    function showLoadError() {
        if (el.exerciseRoot) {
            el.exerciseRoot.innerHTML = `<p class="sprint-load-error">${tr("sprint.loadError")}</p>`;
        }
    }

    // ── Session lifecycle ──────────────────────────────────────────────────

    function startSession() {
        state.totalRounds = 10 + Math.floor(Math.random() * 11); // 10-20 inclusive
        state.roundIndex = 0;
        state.lastWordIds = [];
        state.score = 0;
        state.streak = 0;
        state.bestStreak = 0;
        state.correctAnswers = 0;
        state.wrongAnswers = 0;
        state.wordsUsed = 0;
        state.sessionStartTime = Date.now();
        state.roundLocked = false;

        // Computed once per session, not per round: a round type that can't
        // build a distractor/second pair with the current unlocked pool
        // (essentially never happens given the 5-word starter guarantee) is
        // excluded entirely rather than degrading awkwardly mid-round.
        state.availableRoundTypes = ALL_ROUND_TYPES.filter(type => {
            if (type === "audio" && !audioBaseUrl) return false;
            if (type !== "type" && state.unlocked.length < 2) return false;
            return true;
        });
        if (!state.availableRoundTypes.length) state.availableRoundTypes = ["type"];

        updateHud();
        nextRound();
    }

    function nextRound() {
        if (state.roundIndex >= state.totalRounds) {
            finishSession();
            return;
        }

        state.roundLocked = false;
        const type = state.availableRoundTypes[Math.floor(Math.random() * state.availableRoundTypes.length)];
        el.roundText.textContent = `${state.roundIndex + 1}/${state.totalRounds}`;

        el.exerciseRoot.innerHTML = "";
        if (type === "mc") renderMcRound();
        else if (type === "match") renderMatchRound();
        else if (type === "audio") renderAudioRound();
        else if (type === "trueFalse") renderTrueFalseRound();
        else renderTypeRound();
    }

    function advanceRound(featuredWordIds) {
        state.lastWordIds = featuredWordIds;
        state.roundIndex += 1;
        window.setTimeout(nextRound, ROUND_ADVANCE_DELAY);
    }

    // ── Word / distractor selection ─────────────────────────────────────────

    function pickFeaturedWords(count) {
        const fresh = state.unlocked.filter(w => !state.lastWordIds.includes(w.id));
        const source = fresh.length >= count ? fresh : state.unlocked;
        return shuffle(source.slice()).slice(0, count);
    }

    function pickDistractors(correctItem, count, textOf) {
        const seen = new Set([normalizeString(textOf(correctItem))]);
        const result = [];
        for (const candidate of shuffle(state.unlocked.filter(w => w.id !== correctItem.id))) {
            const norm = normalizeString(textOf(candidate));
            if (seen.has(norm)) continue;
            seen.add(norm);
            result.push(candidate);
            if (result.length === count) break;
        }
        return result;
    }

    // ── Scoring ──────────────────────────────────────────────────────────────

    function recordAnswer(isCorrect) {
        if (isCorrect) {
            state.score += Math.round(10 * getComboMultiplier(state.streak));
            state.streak += 1;
            state.bestStreak = Math.max(state.bestStreak, state.streak);
            state.correctAnswers += 1;
        } else {
            state.wrongAnswers += 1;
            state.streak = 0;
        }
        updateHud();
    }

    function updateHud() {
        const multiplier = getComboMultiplier(state.streak);
        const tier = getComboTier(state.streak);

        el.hudScoreText.textContent = `${state.score} ${tr("common.points")}`;
        el.streakText.textContent = String(state.streak);

        if (state.streak >= 5) {
            el.streakChip.hidden = false;
            el.streakChip.textContent = `×${formatMultiplier(multiplier)}`;
            el.streakChip.dataset.tier = String(tier);
        } else {
            el.streakChip.hidden = true;
        }

        if (tier > 0) el.streakHud.dataset.comboTier = String(tier);
        else delete el.streakHud.dataset.comboTier;
    }

    // ── Round type 1: multiple choice translation ───────────────────────────

    function renderMcRound() {
        const [word] = pickFeaturedWords(1);
        const toTarget = Math.random() < 0.5;
        const textOf = toTarget ? w => w.script : w => w.meaning;
        const promptText = toTarget ? word.meaning : word.script;

        const distractorCount = Math.min(3, state.unlocked.length - 1);
        const options = shuffle([word, ...pickDistractors(word, distractorCount, textOf)]);

        el.exerciseRoot.innerHTML = `
            <div class="sprint-exercise sprint-exercise-mc">
                <span class="sprint-exercise-kicker">${tr("sprint.mc.prompt")}</span>
                <strong class="sprint-prompt-word">${escapeHtml(promptText)}</strong>
                <div class="sprint-mc-grid"></div>
            </div>
        `;

        const grid = el.exerciseRoot.querySelector(".sprint-mc-grid");
        options.forEach(option => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "sprint-mc-option";
            btn.textContent = textOf(option);
            btn.addEventListener("click", () => {
                if (state.roundLocked) return;
                state.roundLocked = true;
                const isCorrect = option.id === word.id;
                btn.classList.add(isCorrect ? "is-correct" : "is-wrong");
                grid.querySelectorAll(".sprint-mc-option").forEach(node => {
                    if (node !== btn) node.classList.add("is-disabled");
                    if (!isCorrect && node.textContent === textOf(word)) node.classList.add("is-correct");
                });
                recordAnswer(isCorrect);
                advanceRound([word.id]);
            });
            grid.appendChild(btn);
        });
    }

    // ── Round type 2: matching ──────────────────────────────────────────────

    function renderMatchRound() {
        const pairCount = Math.min(3 + Math.floor(Math.random() * 3), state.unlocked.length);
        const words = pickFeaturedWords(pairCount);

        el.exerciseRoot.innerHTML = `
            <div class="sprint-exercise sprint-exercise-match">
                <span class="sprint-exercise-kicker">${tr("sprint.match.prompt")}</span>
                <div class="sprint-match-columns">
                    <div class="sprint-match-col" data-side="left"></div>
                    <div class="sprint-match-col" data-side="right"></div>
                </div>
            </div>
        `;

        const leftCol = el.exerciseRoot.querySelector('[data-side="left"]');
        const rightCol = el.exerciseRoot.querySelector('[data-side="right"]');
        let lockedCount = 0;
        let selectedLeft = null;

        shuffle(words.slice()).forEach(word => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "sprint-match-item";
            btn.dataset.pair = word.id;
            btn.textContent = word.meaning;
            btn.addEventListener("click", () => {
                if (btn.disabled) return;
                leftCol.querySelectorAll(".sprint-match-item").forEach(node => node.classList.remove("is-selected"));
                btn.classList.add("is-selected");
                selectedLeft = btn;
            });
            leftCol.appendChild(btn);
        });

        shuffle(words.slice()).forEach(word => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "sprint-match-item";
            btn.dataset.pair = word.id;
            btn.textContent = word.script;
            btn.addEventListener("click", () => {
                if (btn.disabled || !selectedLeft) return;
                const isMatch = selectedLeft.dataset.pair === btn.dataset.pair;

                if (isMatch) {
                    selectedLeft.classList.remove("is-selected");
                    selectedLeft.classList.add("is-locked");
                    btn.classList.add("is-locked");
                    selectedLeft.disabled = true;
                    btn.disabled = true;
                    selectedLeft = null;
                    lockedCount += 2;
                    recordAnswer(true);
                    if (lockedCount === words.length * 2) {
                        state.wordsUsed += words.length;
                        advanceRound(words.map(w => w.id));
                    }
                } else {
                    const wrongLeft = selectedLeft;
                    wrongLeft.classList.add("is-wrong");
                    btn.classList.add("is-wrong");
                    recordAnswer(false);
                    selectedLeft = null;
                    window.setTimeout(() => {
                        wrongLeft.classList.remove("is-selected", "is-wrong");
                        btn.classList.remove("is-wrong");
                    }, MATCH_WRONG_FLASH_DELAY);
                }
            });
            rightCol.appendChild(btn);
        });
    }

    // ── Round type 3: audio -> multiple choice ──────────────────────────────

    function renderAudioRound() {
        const [word] = pickFeaturedWords(1);
        const distractorCount = Math.min(3, state.unlocked.length - 1);
        const options = shuffle([word, ...pickDistractors(word, distractorCount, w => w.script)]);

        el.exerciseRoot.innerHTML = `
            <div class="sprint-exercise sprint-exercise-audio">
                <span class="sprint-exercise-kicker">${tr("sprint.audio.prompt")}</span>
                <button type="button" id="sprint-audio-replay-btn" class="sprint-audio-replay-btn" aria-label="${tr("sprint.audio.replay")}">
                    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H2v6h4l5 4V5Z"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                </button>
                <div class="sprint-mc-grid"></div>
            </div>
        `;

        const replayBtn = document.getElementById("sprint-audio-replay-btn");
        replayBtn.addEventListener("click", () => playWordAudio(word));
        playWordAudio(word);

        const grid = el.exerciseRoot.querySelector(".sprint-mc-grid");
        options.forEach(option => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "sprint-mc-option";
            btn.textContent = option.script;
            btn.addEventListener("click", () => {
                if (state.roundLocked) return;
                state.roundLocked = true;
                const isCorrect = option.id === word.id;
                btn.classList.add(isCorrect ? "is-correct" : "is-wrong");
                grid.querySelectorAll(".sprint-mc-option").forEach(node => {
                    if (node !== btn) node.classList.add("is-disabled");
                    if (!isCorrect && node.textContent === word.script) node.classList.add("is-correct");
                });
                recordAnswer(isCorrect);
                advanceRound([word.id]);
            });
            grid.appendChild(btn);
        });
    }

    // ── Round type 4: true / false ──────────────────────────────────────────

    function renderTrueFalseRound() {
        const [word] = pickFeaturedWords(1);
        const distractor = pickDistractors(word, 1, w => w.meaning)[0];
        const showTrue = !distractor || Math.random() < 0.5;
        const claim = showTrue ? word.meaning : distractor.meaning;

        el.exerciseRoot.innerHTML = `
            <div class="sprint-exercise sprint-exercise-tf">
                <span class="sprint-exercise-kicker">${tr("sprint.tf.prompt")}</span>
                <strong class="sprint-prompt-word">${escapeHtml(word.script)}</strong>
                <p class="sprint-tf-claim">${escapeHtml(claim)}</p>
                <div class="sprint-tf-buttons">
                    <button type="button" class="sprint-tf-btn" data-answer="true">${tr("sprint.tf.true")}</button>
                    <button type="button" class="sprint-tf-btn" data-answer="false">${tr("sprint.tf.false")}</button>
                </div>
            </div>
        `;

        el.exerciseRoot.querySelectorAll(".sprint-tf-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                if (state.roundLocked) return;
                state.roundLocked = true;
                const answeredTrue = btn.dataset.answer === "true";
                const isCorrect = answeredTrue === showTrue;
                btn.classList.add(isCorrect ? "is-correct" : "is-wrong");
                el.exerciseRoot.querySelectorAll(".sprint-tf-btn").forEach(node => {
                    if (node !== btn) node.classList.add("is-disabled");
                });
                recordAnswer(isCorrect);
                advanceRound([word.id]);
            });
        });
    }

    // ── Round type 5: type the answer ───────────────────────────────────────

    function renderTypeRound() {
        const [word] = pickFeaturedWords(1);
        const toTarget = Math.random() < 0.5;
        const promptText = toTarget ? word.meaning : word.script;

        el.exerciseRoot.innerHTML = `
            <div class="sprint-exercise sprint-exercise-type">
                <span class="sprint-exercise-kicker">${tr("sprint.type.prompt")}</span>
                <strong class="sprint-prompt-word">${escapeHtml(promptText)}</strong>
                <form id="sprint-type-form" class="sprint-type-form" autocomplete="off">
                    <input type="text" id="sprint-type-input" class="sprint-type-input" placeholder="${tr("sprint.type.placeholder")}">
                    <button type="submit" class="sprint-type-submit">${tr("sprint.type.submit")}</button>
                </form>
                <div id="sprint-type-feedback" class="sprint-type-feedback"></div>
            </div>
        `;

        const form = document.getElementById("sprint-type-form");
        const input = document.getElementById("sprint-type-input");
        const feedback = document.getElementById("sprint-type-feedback");
        input.focus();

        form.addEventListener("submit", event => {
            event.preventDefault();
            if (state.roundLocked) return;
            state.roundLocked = true;

            const isCorrect = toTarget
                ? isAcceptableTargetAnswer(input.value, word)
                : normalizeString(input.value) === normalizeString(word.meaning);

            input.disabled = true;
            input.classList.add(isCorrect ? "is-correct" : "is-wrong");
            if (!isCorrect) {
                feedback.textContent = toTarget ? word.script : word.meaning;
            }
            recordAnswer(isCorrect);
            advanceRound([word.id]);
        });
    }

    // Typing raw CJK script by hand isn't realistic, so the target->script
    // direction on Chinese/Japanese also accepts the romanization, with a
    // 1-character typo tolerance (same acceptance rule as js/dictate.js).
    function languageHasRomanization(language) {
        return language === "chinese" || language === "japanese";
    }

    function isAcceptableTargetAnswer(typed, word) {
        const norm = normalizeString(typed);
        if (!norm) return false;
        const targets = [normalizeString(word.script)];
        if (languageHasRomanization(activeLanguage) && word.romanization) {
            targets.push(normalizeString(word.romanization));
        }
        return targets.some(t => norm === t || (t.length >= 3 && levenshtein(norm, t) <= 1));
    }

    // ── End of session ───────────────────────────────────────────────────────

    async function finishSession() {
        const sessionSeconds = Math.round((Date.now() - state.sessionStartTime) / 1000);
        const total = state.correctAnswers + state.wrongAnswers;
        const accuracy = total > 0 ? Math.round((state.correctAnswers / total) * 100) : 0;

        el.exerciseRoot.innerHTML = "";
        el.resultScore.textContent = `${state.score} ${tr("common.points")}`;
        el.resultDetail.textContent = tr("sprint.resultDetail", { correct: state.correctAnswers, total }) + ` · ${accuracy}%`;
        el.resultCoins.textContent = "";
        el.resultSaveStatus.textContent = "";
        el.resultModal.hidden = false;

        if (state.correctAnswers <= 0) return;

        const firebaseClient = window.PolytypeFirebase;
        if (!firebaseClient?.isSignedIn?.()) {
            el.resultSaveStatus.textContent = tr("trainer.signInSave");
            return;
        }

        el.resultSaveStatus.textContent = tr("trainer.savingProgress");

        const payload = {
            courseId: activeLanguage,
            gameType: "sprint",
            correctAnswers: state.correctAnswers,
            wrongAnswers: state.wrongAnswers,
            bestCombo: state.bestStreak,
            wordsUsed: state.wordsUsed,
            sessionSeconds
        };

        try {
            const progress = window.PolytypeGameState?.completePracticeSession
                ? await window.PolytypeGameState.completePracticeSession(payload)
                : (await firebaseClient.completePracticeSession(payload))?.data;

            el.resultSaveStatus.textContent = tr("trainer.progressSaved");
            if (typeof progress?.sessionCoins === "number" && progress.sessionCoins > 0) {
                el.resultCoins.textContent = tr("trainer.coinsEarned", { count: progress.sessionCoins });
            }
            if (progress?.completedMissions?.length) {
                await window.PolytypeMissionCelebrate?.show?.(progress.completedMissions);
            }
        } catch (error) {
            el.resultSaveStatus.textContent = error?.message || tr("trainer.signInSave");
        }
    }

    // ── Audio playback (mirrors js/dictate.js's own copy) ──────────────────

    function getWordAudioUrl(item) {
        if (!audioBaseUrl || !activeDeckMeta) return null;
        return [audioBaseUrl, audioPrefix, encodeURIComponent(activeDeckMeta.id), `${encodeURIComponent(item.id)}.mp3`].join("/");
    }

    function playWordAudio(item) {
        if (!item?.id || !audioBaseUrl) return;
        const url = getWordAudioUrl(item);
        if (!url) return;

        try {
            if (activeAudio) {
                activeAudio.pause();
                activeAudio.currentTime = 0;
            }
            activeAudio = new Audio(url);
            activeAudio.play().catch(() => {});
        } catch {
            // Ignore - the replay button is always available as a fallback.
        }
    }

    // ── Deck / language helpers (mirrors js/memory.js's own copies) ────────

    function getActiveDeckMeta() {
        const decks = window.DECK_INDEX || [];
        const requestedLanguage = getRequestedLanguage(decks);
        const deck =
            decks.find(item => item.language === requestedLanguage) ||
            decks.find(item => item.language === FALLBACK_LANGUAGE) ||
            decks[0] ||
            null;

        if (deck?.language) {
            try { localStorage.setItem(LANGUAGE_KEY, deck.language); } catch {}
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
                    romanization: record[columns.romanization] || "",
                    meaning: getRecordMeaning(record, columns),
                    unlockLevel: Number.isFinite(unlockLevel) && unlockLevel > 0 ? unlockLevel : 1
                };
            })
            .filter(item => item.script && item.meaning);
    }

    function getRecordMeaning(record, columns) {
        const meaningColumn = getAppLanguage() === "it" ? columns.italianMeaning : columns.meaning;
        return record[meaningColumn] || record[columns.meaning] || record[columns.italianMeaning] || "";
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

    // ── Unlock gating (mirrors js/memory.js's own copy) ─────────────────────

    function getCourseProgress() {
        const profile = getStoredProfile();
        const courses = profile.courses || {};
        const course = courses[activeLanguage] || (activeDeckMeta?.id && courses[activeDeckMeta.id]);

        if (!course) {
            const sorted = getSortedCategories();
            return { unlockedWords: new Set(sorted[0]?.wordSuffixes.slice(0, getStarterWordCount()) || []) };
        }

        const unlockedWords = Array.isArray(course.unlockedWords)
            ? new Set(course.unlockedWords)
            : getUnlockedWordSuffixesFromPrefix(
                Math.max(0, Math.trunc(Number(course.categoryIndex) || 0)),
                Math.max(0, Math.trunc(Number(course.categoryUnlocked) || 0))
            );

        return { unlockedWords };
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
        } catch {
            return {};
        }
    }

    // ── Small generic helpers ───────────────────────────────────────────────

    function normalizeString(str) {
        return String(str || "")
            .toLowerCase()
            .normalize("NFD")
            .replace(/[̀-ͯ]/g, "")
            .replace(/\s+/g, "")
            .trim();
    }

    function levenshtein(a, b) {
        if (a === b) return 0;
        const m = a.length, n = b.length;
        if (m === 0) return n;
        if (n === 0) return m;

        let prev = Array.from({ length: n + 1 }, (_, i) => i);
        for (let i = 1; i <= m; i += 1) {
            const current = [i];
            for (let j = 1; j <= n; j += 1) {
                current[j] = a[i - 1] === b[j - 1]
                    ? prev[j - 1]
                    : 1 + Math.min(prev[j - 1], prev[j], current[j - 1]);
            }
            prev = current;
        }
        return prev[n];
    }

    function getComboMultiplier(streak) {
        if (streak >= 20) return 3;
        if (streak >= 15) return 2.5;
        if (streak >= 10) return 2;
        if (streak >= 5) return 1.5;
        return 1;
    }

    function getComboTier(streak) {
        if (streak >= 20) return 4;
        if (streak >= 15) return 3;
        if (streak >= 10) return 2;
        if (streak >= 5) return 1;
        return 0;
    }

    function formatMultiplier(multiplier) {
        return Number.isInteger(multiplier) ? String(multiplier) : multiplier.toFixed(1);
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i -= 1) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function escapeHtml(value) {
        return String(value || "").replace(/[&<>"']/g, ch => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        }[ch]));
    }
})();
