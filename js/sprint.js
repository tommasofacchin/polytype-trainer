"use strict";

(function () {
    const PROFILE_KEY = "polytype-profile";
    const LANGUAGE_KEY = "polytype-language";
    const FALLBACK_LANGUAGE = "norwegian";

    const audioBaseUrl = (window.POLYTYPE_AUDIO_BASE_URL || "").replace(/\/+$/, "");
    const audioPrefix = (window.POLYTYPE_AUDIO_PREFIX || "audio/v1").replace(/^\/+|\/+$/g, "");

    // Same shared mute flag js/main.js and js/settings.js read/write, and
    // same asset files as Trainer's correct/error feedback - Sprint had no
    // answer-feedback sound at all before this.
    const sfxMutedKey = "polytype-sfx-muted";
    const correctSfxUrl = "assets/sfx/correct3.mp3";
    const correctSfxVolume = 0.28;
    const errorSfxUrl = "assets/sfx/error1.mp3";
    const errorSfxVolume = 0.22;
    let correctSfxAudio = null;
    let errorSfxAudio = null;

    // Delay between a round's answer being locked in and the next round
    // starting, so the correct/wrong feedback is actually visible. Split in
    // two: FEEDBACK_HOLD shows the result, then the exercise fades out
    // (sprint-round-out, style.css) for FADE_OUT before the next round's
    // markup replaces it and fades back in (sprint-round-in).
    const FEEDBACK_HOLD_DELAY = 550;
    const FADE_OUT_DELAY = 220;
    const MATCH_WRONG_FLASH_DELAY = 450;
    // Result screen: breakdown rows reveal one at a time rather than all at
    // once. Both rows and the friends block are inserted into the DOM (and
    // so already claim their layout space) well before they're actually
    // shown - only opacity/transform animate at reveal time, never a size
    // change, so the result card never visibly grows or jumps.
    const RESULT_ROW_STAGGER_DELAY = 160;
    // Must match .sprint-result-row's CSS transition-duration (style.css).
    const RESULT_ROW_REVEAL_DURATION = 260;
    // A match round lets you retry a mismatch in place, but not forever -
    // after this many wrong attempts the round is given up as wrong (see
    // failMatchRound in renderMatchRound) instead of allowing endless guesses.
    const MATCH_MAX_WRONG_ATTEMPTS = 3;

    const ALL_ROUND_TYPES = ["mc", "match", "audio", "trueFalse", "type"];
    // Flat bonus for a session with zero wrong answers (main rounds - a
    // retry-phase correction doesn't erase the original mistake, so any
    // retry activity at all already means this can't be perfect).
    const PERFECT_SESSION_BONUS = 50;

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
        // Per-word correct/wrong tally for this session, sent alongside the
        // aggregate counts above so the server can track real mastery per
        // word (api/_lib.js's applyWordResults) instead of just a session-
        // level total.
        wordResults: [],
        sessionStartTime: 0,
        roundLocked: false,
        // Single-shot rounds (mc/audio/trueFalse/type) answered wrong get one
        // more shot in a retry phase after the main rounds are done; match
        // rounds are excluded since they already let you retry in place.
        wrongRetryable: [],
        inRetryPhase: false,
        retryQueue: [],
        retryRoundIndex: 0,
        retryRoundTotal: 0,
        retryBonus: 0,
        retryCorrectCount: 0,
        perfectBonus: 0
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

    function initSprintPage() {
        el.roundText = document.getElementById("sprint-round-text");
        el.hudScoreText = document.getElementById("sprint-hud-score-text");
        el.streakText = document.getElementById("sprint-streak-text");
        el.streakChip = document.getElementById("sprint-streak-chip");
        el.streakHud = document.getElementById("sprint-streak-hud");
        el.exerciseRoot = document.getElementById("sprint-exercise-root");
        el.resultModal = document.getElementById("sprint-result-modal");
        el.resultScore = document.getElementById("sprint-result-score");
        el.resultDetail = document.getElementById("sprint-result-detail");
        el.resultBreakdown = document.getElementById("sprint-result-breakdown");
        el.resultCoins = document.getElementById("sprint-result-coins");
        el.resultSaveStatus = document.getElementById("sprint-result-save-status");
        el.resultFriends = document.getElementById("sprint-result-friends");
        el.resultFriendsList = document.getElementById("sprint-result-friends-list");
        el.playAgainBtn = document.getElementById("sprint-play-again-btn");
        el.homeBtn = document.getElementById("sprint-home-btn");

        el.playAgainBtn.addEventListener("click", () => {
            el.resultModal.hidden = true;
            startSession();
        });

        init();
    }

    async function init() {
        preloadSfx();
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
        const disabledSuffixes = getDisabledWordSuffixes(activeLanguage);
        state.unlocked = state.vocab.filter(item =>
            courseProgress.unlockedWords.has(getWordSuffix(item.id)) && !disabledSuffixes.has(getWordSuffix(item.id))
        );

        if (!state.unlocked.length) {
            // A real, reachable state now (not just a load failure): a
            // freshly-picked language starts with 0 unlocked words until
            // keys get spent on the Deck page - a generic "couldn't load"
            // message would be actively misleading here.
            showNoWordsState();
            return;
        }

        startSession();
    }

    function showLoadError() {
        if (el.exerciseRoot) {
            el.exerciseRoot.innerHTML = `<p class="sprint-load-error">${tr("sprint.loadError")}</p>`;
        }
    }

    function showNoWordsState() {
        if (!el.exerciseRoot) return;
        el.exerciseRoot.innerHTML = `
            <div class="sprint-empty-state">
                <p>${tr("sprint.noWordsError")}</p>
                <a href="deck.html" class="restart-btn">${tr("sprint.goToDeck")}</a>
            </div>
        `;
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
        state.wordResults = [];
        state.sessionStartTime = Date.now();
        state.roundLocked = false;
        state.wrongRetryable = [];
        state.inRetryPhase = false;
        state.retryQueue = [];
        state.retryRoundIndex = 0;
        state.retryRoundTotal = 0;
        state.retryBonus = 0;
        state.retryCorrectCount = 0;
        state.perfectBonus = 0;

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
            startRetryPhaseOrFinish();
            return;
        }

        state.roundLocked = false;
        const type = state.availableRoundTypes[Math.floor(Math.random() * state.availableRoundTypes.length)];
        el.roundText.textContent = `${state.roundIndex + 1}/${state.totalRounds}`;

        el.exerciseRoot.innerHTML = "";
        if (type === "match") renderMatchRound();
        else renderSingleShotRound(type, null);
    }

    function renderSingleShotRound(type, forcedWord) {
        if (type === "mc") renderMcRound(forcedWord);
        else if (type === "audio") renderAudioRound(forcedWord);
        else if (type === "trueFalse") renderTrueFalseRound(forcedWord);
        else renderTypeRound(forcedWord);
    }

    function advanceRound(featuredWordIds) {
        state.lastWordIds = featuredWordIds;
        if (!state.inRetryPhase) state.roundIndex += 1;
        window.setTimeout(() => {
            el.exerciseRoot.querySelector(".sprint-exercise")?.classList.add("is-leaving");
            window.setTimeout(() => {
                if (state.inRetryPhase) nextRetryRound();
                else nextRound();
            }, FADE_OUT_DELAY);
        }, FEEDBACK_HOLD_DELAY);
    }

    // ── Retry phase: one extra shot at whatever was answered wrong ─────────

    function startRetryPhaseOrFinish() {
        if (!state.wrongRetryable.length) {
            finishSession();
            return;
        }

        state.inRetryPhase = true;
        state.retryQueue = state.wrongRetryable;
        state.wrongRetryable = [];
        state.retryRoundTotal = state.retryQueue.length;
        state.retryRoundIndex = 0;
        nextRetryRound();
    }

    function nextRetryRound() {
        if (!state.retryQueue.length) {
            finishSession();
            return;
        }

        state.roundLocked = false;
        state.retryRoundIndex += 1;
        el.roundText.textContent = tr("sprint.retryRound", { index: state.retryRoundIndex, total: state.retryRoundTotal });

        const { type, word } = state.retryQueue.shift();
        el.exerciseRoot.innerHTML = "";
        renderSingleShotRound(type, word);
    }

    // Routes a single-shot round's answer to normal scoring, or - during the
    // retry phase - to the 50%-value bonus without touching streak/accuracy.
    function finishSingleShotRound(type, word, isCorrect, anchorEl) {
        if (state.inRetryPhase) {
            if (isCorrect) awardRetryBonus(anchorEl);
        } else {
            recordAnswer(isCorrect, anchorEl, word.id);
            if (!isCorrect) state.wrongRetryable.push({ type, word });
        }
        advanceRound([word.id]);
    }

    function awardRetryBonus(anchorEl) {
        const pts = 5; // 50% of the flat 10-point base award
        state.score += pts;
        state.retryBonus += pts;
        state.retryCorrectCount += 1;
        updateHud();
        if (anchorEl) showPointsFloat(pts, 0, anchorEl);
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

    function recordAnswer(isCorrect, anchorEl, wordId) {
        const prevStreak = state.streak;
        const prevTier = getComboTier(prevStreak);

        if (wordId != null) state.wordResults.push({ id: getWordSuffix(String(wordId)), correct: isCorrect });

        if (isCorrect) {
            playCorrectSfx();
            const pts = Math.round(10 * getComboMultiplier(state.streak));
            state.score += pts;
            state.streak += 1;
            state.bestStreak = Math.max(state.bestStreak, state.streak);
            state.correctAnswers += 1;

            const tier = getComboTier(state.streak);
            animateStreakPop(tier > prevTier);
            if (anchorEl) showPointsFloat(pts, tier, anchorEl);
        } else {
            playErrorSfx();
            state.wrongAnswers += 1;
            state.streak = 0;
            if (prevStreak > 0) animateStreakBreak();
        }
        updateHud();
    }

    function animateStreakPop(big) {
        const cls = big ? "streak-pop-big" : "streak-pop";
        el.streakText.classList.remove("streak-pop", "streak-pop-big", "streak-shake");
        void el.streakText.offsetWidth;
        el.streakText.classList.add(cls);
        el.streakText.addEventListener("animationend", () => el.streakText.classList.remove(cls), { once: true });
    }

    function animateStreakBreak() {
        el.streakText.classList.remove("streak-pop", "streak-pop-big", "streak-shake");
        void el.streakText.offsetWidth;
        el.streakText.classList.add("streak-shake");
        el.streakText.addEventListener("animationend", () => el.streakText.classList.remove("streak-shake"), { once: true });
    }

    function showPointsFloat(pts, tier, anchorEl) {
        const rect = anchorEl.getBoundingClientRect();
        const node = document.createElement("span");
        node.className = "xp-float";
        node.textContent = `+${pts}`;
        if (tier > 1) node.dataset.tier = String(tier);
        node.style.left = `${rect.left + rect.width / 2 - 18}px`;
        node.style.top = `${rect.top - 4}px`;
        document.body.appendChild(node);
        node.addEventListener("animationend", () => node.remove(), { once: true });
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

    function renderMcRound(forcedWord) {
        const word = forcedWord || pickFeaturedWords(1)[0];
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

        // Only when the prompt itself is the target-language word (not when
        // it's the options that are, which would make "play the word" for a
        // single one of several choices ambiguous/give away the answer).
        if (!toTarget) playWordAudio(word);

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
                finishSingleShotRound("mc", word, isCorrect, btn);
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
        // Either column can be picked first: `selected` tracks whichever
        // item is currently pending a match, from either side.
        let selected = null;
        // Mismatched *attempts* (not clicks - reselecting/deselecting doesn't
        // count), capped at MATCH_MAX_WRONG_ATTEMPTS before the round is
        // given up as wrong instead of allowing endless retries in place.
        let wrongAttempts = 0;
        // Every word.id that's already had an explicit recordAnswer(false,...)
        // from a wrong click - so failMatchRound()'s reveal step doesn't
        // double-record the same word when it marks the rest wrong too.
        const wrongRecordedIds = new Set();

        function handleItemClick(btn, col) {
            if (btn.disabled) return;

            if (selected && selected.btn === btn) {
                btn.classList.remove("is-selected");
                selected = null;
                return;
            }

            if (!selected || selected.col === col) {
                col.querySelectorAll(".sprint-match-item").forEach(node => node.classList.remove("is-selected"));
                btn.classList.add("is-selected");
                selected = { btn, col };
                return;
            }

            const otherBtn = selected.btn;
            const isMatch = otherBtn.dataset.pair === btn.dataset.pair;
            selected = null;

            if (isMatch) {
                otherBtn.classList.remove("is-selected");
                otherBtn.classList.add("is-locked");
                btn.classList.add("is-locked");
                otherBtn.disabled = true;
                btn.disabled = true;
                lockedCount += 2;
                recordAnswer(true, btn, btn.dataset.pair);
                if (lockedCount === words.length * 2) {
                    state.wordsUsed += words.length;
                    advanceRound(words.map(w => w.id));
                }
            } else {
                otherBtn.classList.remove("is-selected");
                otherBtn.classList.add("is-wrong");
                btn.classList.add("is-wrong");
                recordAnswer(false, btn, btn.dataset.pair);
                wrongRecordedIds.add(btn.dataset.pair);
                wrongAttempts += 1;

                if (wrongAttempts >= MATCH_MAX_WRONG_ATTEMPTS) {
                    window.setTimeout(() => failMatchRound(), MATCH_WRONG_FLASH_DELAY);
                    return;
                }

                window.setTimeout(() => {
                    otherBtn.classList.remove("is-wrong");
                    btn.classList.remove("is-wrong");
                }, MATCH_WRONG_FLASH_DELAY);
            }
        }

        // Out of attempts: lock every remaining item, reveal the pairs the
        // player never got to (in green, like a wrong MC/type round reveals
        // its answer), and move on - no more free retries.
        function failMatchRound() {
            leftCol.querySelectorAll(".sprint-match-item").forEach(node => { node.disabled = true; });
            rightCol.querySelectorAll(".sprint-match-item").forEach(node => { node.disabled = true; });

            words.forEach(word => {
                const leftBtn = leftCol.querySelector(`[data-pair="${word.id}"]`);
                if (leftBtn?.classList.contains("is-locked")) return; // already correctly matched

                const rightBtn = rightCol.querySelector(`[data-pair="${word.id}"]`);
                leftBtn?.classList.remove("is-wrong");
                rightBtn?.classList.remove("is-wrong");
                leftBtn?.classList.add("is-correct");
                rightBtn?.classList.add("is-correct");

                if (!wrongRecordedIds.has(word.id)) recordAnswer(false, null, word.id);
            });

            state.wordsUsed += words.length;
            advanceRound(words.map(w => w.id));
        }

        shuffle(words.slice()).forEach(word => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "sprint-match-item";
            btn.dataset.pair = word.id;
            btn.textContent = word.meaning;
            btn.addEventListener("click", () => handleItemClick(btn, leftCol));
            leftCol.appendChild(btn);
        });

        shuffle(words.slice()).forEach(word => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "sprint-match-item";
            btn.dataset.pair = word.id;
            btn.textContent = word.script;
            btn.addEventListener("click", () => handleItemClick(btn, rightCol));
            rightCol.appendChild(btn);
        });
    }

    // ── Round type 3: audio -> multiple choice ──────────────────────────────

    function renderAudioRound(forcedWord) {
        const word = forcedWord || pickFeaturedWords(1)[0];
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
                finishSingleShotRound("audio", word, isCorrect, btn);
            });
            grid.appendChild(btn);
        });
    }

    // ── Round type 4: true / false ──────────────────────────────────────────

    function renderTrueFalseRound(forcedWord) {
        const word = forcedWord || pickFeaturedWords(1)[0];
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

        // The prompt here is always the target-language word.
        playWordAudio(word);

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
                finishSingleShotRound("trueFalse", word, isCorrect, btn);
            });
        });
    }

    // ── Round type 5: type the answer ───────────────────────────────────────

    function renderTypeRound(forcedWord) {
        const word = forcedWord || pickFeaturedWords(1)[0];
        const toTarget = Math.random() < 0.5;
        const promptText = toTarget ? word.meaning : word.script;

        el.exerciseRoot.innerHTML = `
            <div class="sprint-exercise sprint-exercise-type">
                <span class="sprint-exercise-kicker">${tr("sprint.type.prompt")}</span>
                <strong class="sprint-prompt-word">${escapeHtml(promptText)}</strong>
                <form id="sprint-type-form" class="sprint-type-form" autocomplete="off">
                    <input type="text" id="sprint-type-input" class="sprint-type-input" placeholder="${tr("sprint.type.placeholder")}" inputmode="none" autocapitalize="off" autocorrect="off" spellcheck="false" data-vkbd="true" data-vkbd-enter="false">
                    <button type="submit" class="sprint-type-submit">${tr("sprint.type.submit")}</button>
                </form>
                <div id="sprint-type-feedback" class="sprint-type-feedback"></div>
            </div>
        `;

        // Only when the prompt itself is the target-language word - not when
        // typing it is the answer being asked for, which would give it away.
        if (!toTarget) playWordAudio(word);

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
            finishSingleShotRound("type", word, isCorrect, input);
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

        if (state.correctAnswers > 0 && state.wrongAnswers === 0) {
            state.perfectBonus = PERFECT_SESSION_BONUS;
            state.score += state.perfectBonus;
        }

        el.exerciseRoot.innerHTML = "";
        el.resultScore.textContent = `${state.score} ${tr("common.points")}`;
        el.resultDetail.textContent = `${tr("sprint.resultDetail", { correct: state.correctAnswers, total })} (${accuracy}%)`;
        const breakdownRevealDone = renderResultBreakdown();
        el.resultCoins.textContent = "";
        el.resultSaveStatus.textContent = "";
        resetFriendsSection();
        el.resultModal.hidden = false;

        // Play again/Home stay disabled for at least this long, instead of
        // a "Saving progress..." status line - the buttons turning
        // clickable (Play again's already-green background) *is* the
        // "you're good to go" signal, so a save that resolves faster than
        // this doesn't just flash text and vanish.
        setResultButtonsBusy(true);
        const minDelay = new Promise(resolve => window.setTimeout(resolve, 1000));

        if (state.correctAnswers > 0) {
            const firebaseClient = window.PolytypeFirebase;
            if (!firebaseClient?.isSignedIn?.()) {
                el.resultSaveStatus.textContent = tr("trainer.signInSave");
            } else {
                const payload = {
                    courseId: activeLanguage,
                    gameType: "sprint",
                    correctAnswers: state.correctAnswers,
                    wrongAnswers: state.wrongAnswers,
                    bestCombo: state.bestStreak,
                    wordsUsed: state.wordsUsed,
                    sessionSeconds,
                    wordResults: state.wordResults
                };

                try {
                    const progress = window.PolytypeGameState?.completePracticeSession
                        ? await window.PolytypeGameState.completePracticeSession(payload)
                        : (await firebaseClient.completePracticeSession(payload))?.data;

                    if (typeof progress?.sessionCoins === "number" && progress.sessionCoins > 0) {
                        el.resultCoins.textContent = tr("trainer.coinsEarned", { count: progress.sessionCoins });
                    }
                    prepareFriendsStatus(progress?.friendsStatus);
                    if (progress?.completedMissions?.length) {
                        await window.PolytypeMissionCelebrate?.show?.(progress.completedMissions);
                    }
                    if (progress?.newBadges?.length) {
                        await window.PolytypeBadgeCelebrate?.show?.(progress.newBadges);
                    }
                } catch (error) {
                    el.resultSaveStatus.textContent = error?.message || tr("trainer.signInSave");
                }
            }
        }

        // Friends only fade in once the breakdown rows are fully done
        // revealing - by now the friends content (if any) is already sitting
        // in the DOM at opacity 0 from prepareFriendsStatus above, so this is
        // a pure fade with no layout change.
        await breakdownRevealDone;
        revealFriendsSection();

        await minDelay;
        setResultButtonsBusy(false);
    }

    function setResultButtonsBusy(busy) {
        if (el.playAgainBtn) el.playAgainBtn.disabled = busy;
        // <a> has no disabled attribute - pointer-events:none is what
        // actually blocks the click (including js/router.js's global link
        // interceptor, which never sees a click event to intercept).
        if (el.homeBtn) el.homeBtn.classList.toggle("is-disabled", busy);
    }

    // Breaks the final score down into what it was actually earned for: a
    // flat 10 pts per correct answer, plus whatever extra the combo
    // multiplier added on top, plus the retry-phase bonus, plus the flat
    // perfect-session bonus. Every correct answer already banks
    // `10 * getComboMultiplier(streakAtTheTime)` (see recordAnswer), so the
    // combo's contribution is the total score minus the flat base minus the
    // two other (separately tallied) bonuses - no separate running combo
    // tally needed.
    // Builds every row up front (so the card's height is already final - see
    // the RESULT_ROW_* comment above) then reveals them one at a time.
    // Returns a promise that resolves once the last row has finished
    // revealing, so the caller can hold the friends block until this is done.
    function renderResultBreakdown() {
        if (!el.resultBreakdown) return Promise.resolve();

        const basePoints = state.correctAnswers * 10;
        const comboBonus = Math.max(0, state.score - basePoints - state.retryBonus - state.perfectBonus);
        const rows = [];

        if (state.correctAnswers > 0) {
            rows.push({
                label: tr("sprint.breakdownCorrect", { count: state.correctAnswers }),
                value: `${basePoints} ${tr("common.points")}`
            });
        }
        if (comboBonus > 0) {
            rows.push({
                label: tr("sprint.breakdownCombo", { streak: state.bestStreak }),
                value: `+${comboBonus} ${tr("common.points")}`
            });
        }
        if (state.retryBonus > 0) {
            rows.push({
                label: tr("sprint.breakdownRetry", { count: state.retryCorrectCount }),
                value: `+${state.retryBonus} ${tr("common.points")}`
            });
        }
        if (state.perfectBonus > 0) {
            rows.push({
                label: tr("sprint.breakdownPerfect"),
                value: `+${state.perfectBonus} ${tr("common.points")}`
            });
        }

        el.resultBreakdown.hidden = rows.length === 0;
        const rowEls = rows.map(row => {
            const rowEl = document.createElement("div");
            rowEl.className = "sprint-result-row";
            rowEl.innerHTML = `
                <span class="sprint-result-row-check">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13l4 4L19 7"/></svg>
                </span>
                <span class="sprint-result-row-label"></span>
                <span class="sprint-result-row-value"></span>
            `;
            rowEl.querySelector(".sprint-result-row-label").textContent = row.label;
            rowEl.querySelector(".sprint-result-row-value").textContent = row.value;
            return rowEl;
        });
        el.resultBreakdown.replaceChildren(...rowEls);

        if (!rowEls.length) return Promise.resolve();

        return new Promise(resolve => {
            rowEls.forEach((rowEl, index) => {
                window.setTimeout(() => rowEl.classList.add("is-visible"), index * RESULT_ROW_STAGGER_DELAY);
            });
            window.setTimeout(resolve, (rowEls.length - 1) * RESULT_ROW_STAGGER_DELAY + RESULT_ROW_REVEAL_DURATION);
        });
    }

    // Clears any previous session's friends block and puts it back in its
    // pre-reveal state (present-but-invisible only once there's real content
    // to show - see prepareFriendsStatus/revealFriendsSection below).
    function resetFriendsSection() {
        if (!el.resultFriends || !el.resultFriendsList) return;
        el.resultFriends.hidden = true;
        el.resultFriends.classList.remove("is-visible");
        el.resultFriendsList.replaceChildren();
    }

    // Friend list under the score: each entry's friendshipStreak only rises
    // on a day both the player and that friend play a sprint (see
    // updateFriendshipStreaksForSprint in api/complete-practice-session.js);
    // playedToday reflects that same friend's sprint activity today.
    //
    // Inserts the content as soon as it's known (claiming its layout space
    // right away) but leaves it at opacity 0 - revealFriendsSection() is what
    // actually fades it in, once the breakdown above has finished its own
    // reveal. Splitting "insert" from "reveal" this way means the moment the
    // block becomes visible, it's already fully laid out - no jump.
    function prepareFriendsStatus(list) {
        if (!el.resultFriends || !el.resultFriendsList) return;
        const entries = Array.isArray(list) ? list : [];

        if (!entries.length) {
            el.resultFriends.hidden = true;
            el.resultFriendsList.replaceChildren();
            return;
        }

        el.resultFriends.hidden = false;
        el.resultFriendsList.replaceChildren(
            ...entries.map(entry => {
                const row = document.createElement("div");
                row.className = "friends-row";

                const avatar = document.createElement("span");
                avatar.className = "profile-pill-avatar friends-row-avatar";
                avatar.setAttribute("aria-hidden", "true");
                if (entry.avatarUrl) {
                    const image = document.createElement("img");
                    image.src = entry.avatarUrl;
                    image.alt = "";
                    avatar.classList.add("has-image");
                    avatar.append(image);
                } else {
                    avatar.textContent = (entry.displayName || "?").trim().charAt(0).toUpperCase() || "?";
                }

                const copy = document.createElement("span");
                copy.className = "friends-row-copy";
                const name = document.createElement("strong");
                name.textContent = entry.displayName || "Player";
                copy.append(name);

                const streak = document.createElement("span");
                streak.className = "friends-row-streak";
                streak.textContent = `\u{1F525} ${entry.friendshipStreak || 0}`;

                const status = document.createElement("span");
                status.className = entry.playedToday ? "friends-status-badge is-played" : "friends-status-badge";
                status.textContent = entry.playedToday ? tr("sprint.friendPlayedToday") : tr("sprint.friendNotPlayedToday");

                row.append(avatar, copy, streak, status);
                return row;
            })
        );
    }

    // Fades the already-inserted friends block in (see prepareFriendsStatus)
    // - a no-op if there was nothing to show. Call once the breakdown's own
    // reveal is done, so the two never compete for attention at the same time.
    function revealFriendsSection() {
        if (!el.resultFriends || el.resultFriends.hidden) return;
        el.resultFriends.classList.add("is-visible");
    }

    // ── Audio playback (mirrors js/dictate.js's own copy) ──────────────────

    function getWordAudioUrl(item) {
        if (!audioBaseUrl || !activeDeckMeta) return null;
        return [audioBaseUrl, audioPrefix, encodeURIComponent(activeDeckMeta.id), `${encodeURIComponent(item.id)}.mp3`].join("/");
    }

    function playWordAudio(item, attempt = 0) {
        if (!item?.id || !audioBaseUrl) return;
        const url = getWordAudioUrl(item);
        if (!url) return;

        try {
            if (activeAudio) {
                activeAudio.pause();
                activeAudio.currentTime = 0;
            }
            const audio = new Audio(url);
            activeAudio = audio;
            audio.play().catch(() => {
                // The CDN link this streams from occasionally has a slow or
                // failed node for a given file - one silent retry covers
                // that without the player needing to notice and hit replay
                // themselves. Only if nothing newer (a fresh round, or the
                // player already hitting replay again) has superseded this
                // exact attempt in the meantime.
                if (attempt < 1 && activeAudio === audio) {
                    window.setTimeout(() => {
                        if (activeAudio === audio) playWordAudio(item, attempt + 1);
                    }, 400);
                }
            });
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

    // Words hidden from exercises via the Deck page's per-card toggle
    // (js/deck.js) - see that file's DISABLED_WORDS_KEY comment.
    function getDisabledWordSuffixes(courseKey) {
        try {
            const map = JSON.parse(localStorage.getItem("polytype-disabled-words")) || {};
            return new Set(map[courseKey] || []);
        } catch {
            return new Set();
        }
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

    function preloadSfx() {
        correctSfxAudio = new Audio(correctSfxUrl);
        correctSfxAudio.preload = "auto";
        correctSfxAudio.volume = correctSfxVolume;
        correctSfxAudio.load();

        errorSfxAudio = new Audio(errorSfxUrl);
        errorSfxAudio.preload = "auto";
        errorSfxAudio.volume = errorSfxVolume;
        errorSfxAudio.load();
    }

    function playCorrectSfx() { playSfx(correctSfxAudio, correctSfxVolume); }
    function playErrorSfx()   { playSfx(errorSfxAudio, errorSfxVolume); }

    function playSfx(sourceAudio, volume) {
        if (!sourceAudio || isSfxMuted()) return;
        try {
            const audio = sourceAudio.cloneNode();
            audio.volume = volume;
            audio.play().catch(() => {});
        } catch {
            // Browsers may block audio until the first user gesture.
        }
    }

    function isSfxMuted() {
        try {
            return localStorage.getItem(sfxMutedKey) === "true";
        } catch {
            return false;
        }
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

    // Runs immediately if the DOM is already parsed (true whenever
    // js/router.js re-injects this file on a soft navigation - being
    // IIFE-wrapped only made re-running safe, it didn't make
    // DOMContentLoaded fire again, since that event only ever fires once
    // per live document) and waits for it otherwise (a genuine hard load).
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initSprintPage, { once: true });
    } else {
        initSprintPage();
    }
})();
