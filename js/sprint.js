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
    const RESULT_ROW_STAGGER_DELAY = 110;
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
        perfectBonus: 0,
        // Set only by the ?demo=finish replay (runDemoFinish), which skips
        // playing entirely and jumps straight to a canned end-of-session.
        demo: false
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
        el.progress = document.getElementById("sprint-progress");
        el.progressFill = document.getElementById("sprint-progress-fill");
        el.hudScoreText = document.getElementById("sprint-hud-score-text");
        el.streakText = document.getElementById("sprint-streak-text");
        el.streakChip = document.getElementById("sprint-streak-chip");
        el.streakHud = document.getElementById("sprint-streak-hud");
        el.exerciseRoot = document.getElementById("sprint-exercise-root");
        el.resultModal = document.getElementById("sprint-result-modal");
        el.resultScore = document.getElementById("sprint-result-score");
        el.resultDetail = document.getElementById("sprint-result-detail");
        el.resultBreakdown = document.getElementById("sprint-result-breakdown");
        el.resultXp = document.getElementById("sprint-result-xp");
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

        // Before every load and progression guard below: the replay shows a
        // canned result card and needs neither vocab nor unlocked words, so it
        // must not be blocked by a deck that failed to fetch or by a language
        // the player hasn't spent any keys on yet.
        if (isDemoFinish()) {
            runDemoFinish();
            return;
        }

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
        const category = getRequestedCategory();
        const categorySuffixes = category ? new Set(category.wordSuffixes) : null;

        state.unlocked = state.vocab.filter(item => {
            const suffix = getWordSuffix(item.id);
            if (!courseProgress.unlockedWords.has(suffix)) return false;
            if (disabledSuffixes.has(suffix)) return false;
            return !categorySuffixes || categorySuffixes.has(suffix);
        });

        renderCategoryChip(category);

        if (!state.unlocked.length) {
            // A real, reachable state now (not just a load failure): a
            // freshly-picked language starts with 0 unlocked words until
            // keys get spent on the Deck page - a generic "couldn't load"
            // message would be actively misleading here.
            showNoWordsState(category);
            return;
        }

        startSession();
        // After startSession so the first round is on screen before the
        // background fetches begin competing with it for connections.
        scheduleAudioPreload(state.unlocked);
    }

    function showLoadError() {
        if (el.exerciseRoot) {
            el.exerciseRoot.innerHTML = `<p class="sprint-load-error">${tr("sprint.loadError")}</p>`;
        }
    }

    // A sprint can be scoped to one category via ?category=<id> (the
    // Categories page links in that way). Read per call rather than cached:
    // js/router.js re-runs this script on soft navigation, so the query
    // string can differ between runs within the same document.
    function getRequestedCategory() {
        const id = new URLSearchParams(window.location.search).get("category");
        if (!id) return null;
        return (window.POLYTYPE_CATEGORIES || []).find(category => category.id === id) || null;
    }

    function renderCategoryChip(category) {
        const chip = document.getElementById("sprint-category-chip");
        if (!chip) return;
        chip.hidden = !category;
        chip.textContent = category ? tr(category.labelKey) : "";
    }

    // Two different dead ends: nothing unlocked at all (go spend keys on the
    // Deck), versus nothing unlocked *in the category you picked* (go pick a
    // different one) - pointing both at the Deck would be a dead end for the
    // second.
    function showNoWordsState(category) {
        if (!el.exerciseRoot) return;
        el.exerciseRoot.innerHTML = category
            ? `
                <div class="sprint-empty-state">
                    <p>${tr("sprint.noWordsInCategory", { category: tr(category.labelKey) })}</p>
                    <a href="categories.html" class="restart-btn">${tr("sprint.backToCategories")}</a>
                </div>
            `
            : `
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
        // Clears the ?demo=finish replay: hitting "Play again" on the demo
        // result card starts a genuine session, and leaving this set would
        // send it down the canned branch in finishSession and silently throw
        // away the player's real XP and coins.
        state.demo = false;

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

    // The bar replaced the old "Round 3/12" HUD tile. The count it used to
    // show survives as aria-valuetext, so screen readers still get the exact
    // position instead of only a percentage.
    function setProgress(fraction, label, isRetry) {
        if (!el.progress || !el.progressFill) return;

        const percent = Math.max(0, Math.min(100, Math.round(fraction * 100)));
        el.progressFill.style.width = `${percent}%`;
        el.progress.classList.toggle("is-retry", Boolean(isRetry));
        el.progress.setAttribute("aria-valuenow", percent);
        el.progress.setAttribute("aria-valuetext", label);
    }

    function nextRound() {
        if (state.roundIndex >= state.totalRounds) {
            startRetryPhaseOrFinish();
            return;
        }

        state.roundLocked = false;
        const type = state.availableRoundTypes[Math.floor(Math.random() * state.availableRoundTypes.length)];
        // Fills as rounds are *completed*, so the bar reads empty on round 1
        // and only hits 100% once the last answer is in.
        setProgress(state.roundIndex / state.totalRounds, `${state.roundIndex + 1}/${state.totalRounds}`, false);

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
        // Stays pinned at 100%: the main rounds really are all done by now,
        // and draining the bar back to empty read as losing progress. The
        // colour switch is what marks the phase instead.
        setProgress(
            1,
            tr("sprint.retryRound", { index: state.retryRoundIndex, total: state.retryRoundTotal }),
            true
        );

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

        // Same pointerdown+preventDefault trick the on-screen keyboard's own
        // keys use (see js/virtual-keyboard.js): a plain tap on this button
        // would first blur the input, firing focusout - which hides the
        // keyboard and reflows the page up, moving the button out from under
        // the finger so the ensuing click lands on nothing. That's why it took
        // two taps: the first only dismissed the keyboard. Keeping focus and
        // submitting straight from pointerdown makes one tap check the answer.
        form.querySelector(".sprint-type-submit").addEventListener("pointerdown", event => {
            event.preventDefault();
            form.requestSubmit();
        });

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
        if (el.resultXp) el.resultXp.textContent = "";
        el.resultCoins.textContent = "";
        el.resultSaveStatus.textContent = "";
        resetFriendsSection();
        el.resultModal.hidden = false;

        // Freeze the header's level bar at its pre-session value *before* the
        // save goes out: the save's profile update would otherwise snap it to
        // the new total while the result card is still animating in, and
        // there'd be no gain left to show. Every path below either plays the
        // burst or releases the hold.
        window.PolytypeAppShell?.holdXpDisplay?.();

        // Kicked off here, *before* the save, and deliberately not awaited
        // alongside it: the friends block is already painted from cache, so
        // it can fade in on the breakdown's own schedule. Chaining it after
        // the save (as this used to) meant a slow round trip held the whole
        // reveal back, which is what made the list feel like it arrived late
        // and then stretched the card.
        const friendsRevealed = breakdownRevealDone.then(revealFriendsSection);

        // Play again/Home stay disabled for at least this long, instead of
        // a "Saving progress..." status line - the buttons turning
        // clickable (Play again's already-green background) *is* the
        // "you're good to go" signal, so a save that resolves faster than
        // this doesn't just flash text and vanish.
        setResultButtonsBusy(true);
        const minDelay = new Promise(resolve => window.setTimeout(resolve, 1000));

        // Set by the save below, then handed to the burst once the breakdown
        // has finished revealing - so the stars fly into a header the player
        // has had a beat to notice, not on top of the card's own entrance.
        let earnedTotalXp = null;

        if (state.demo) {
            // No save at all - canned progress stands in for the round trip so
            // the rest of this runs exactly as it does after a real session.
            earnedTotalXp = await applySessionProgress(getDemoProgress(), { demo: true });
        } else if (state.correctAnswers > 0) {
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

                    earnedTotalXp = await applySessionProgress(progress);
                } catch (error) {
                    el.resultSaveStatus.textContent = error?.message || tr("trainer.signInSave");
                }
            }
        }

        await breakdownRevealDone;
        await friendsRevealed;

        // playXpGain always releases the header hold, including when there's
        // nothing to animate (signed out, save failed, zero XP) - so the bar
        // can never be left frozen for the rest of the session.
        if (earnedTotalXp !== null) {
            window.PolytypeAppShell?.playXpGain?.(earnedTotalXp, el.resultXp);
        } else {
            window.PolytypeAppShell?.releaseXpDisplay?.();
        }

        await minDelay;
        setResultButtonsBusy(false);
    }

    // Everything the end of a session does with the server's answer, shared by
    // the real save and the demo replay (which hands it canned progress
    // instead). Returns the new lifetime XP for the header burst, or null when
    // there's nothing to fly up there.
    async function applySessionProgress(progress, { demo = false } = {}) {
        if (typeof progress?.xpEarned === "number" && progress.xpEarned > 0 && el.resultXp) {
            revealResultReward(el.resultXp, tr("sprint.xpEarned", { xp: progress.xpEarned }));
        }
        if (typeof progress?.sessionCoins === "number" && progress.sessionCoins > 0) {
            revealResultReward(el.resultCoins, tr("trainer.coinsEarned", { count: progress.sessionCoins }));
        }
        prepareFriendsStatus(progress?.friendsStatus);
        // Streak first, missions second: the flame going up is the day's
        // headline, and the missions it unblocked read as its follow-up rather
        // than the other way round. show() is a no-op on every session after
        // the day's first, so this stays unconditional.
        await window.PolytypeStreakCelebrate?.show?.(progress?.streak, { demo });
        if (progress?.completedMissions?.length) {
            await window.PolytypeMissionCelebrate?.show?.(progress.completedMissions);
        }
        if (progress?.newBadges?.length) {
            await window.PolytypeBadgeCelebrate?.show?.(progress.newBadges);
        }
        return typeof progress?.totalXp === "number" ? progress.totalXp : null;
    }

    // ── Demo replay (?demo=finish, from the Home debug card) ─────────────────

    function isDemoFinish() {
        return new URLSearchParams(window.location.search).get("demo") === "finish";
    }

    // A deliberately imperfect session: the wrong answers are what make the
    // combo and retry rows appear at all, so the breakdown shows four rows
    // instead of the single one a flawless run would produce. Numbers are
    // consistent with each other - renderResultBreakdown derives the combo
    // bonus by subtracting the others from the score, so score must equal
    // base (14x10) + combo (60) + retry (20).
    function runDemoFinish() {
        state.demo = true;
        state.sessionStartTime = Date.now() - 62_000;
        state.correctAnswers = 14;
        state.wrongAnswers = 2;
        state.bestStreak = 9;
        state.wordsUsed = 16;
        state.retryCorrectCount = 2;
        state.retryBonus = 20;
        state.score = 220;
        finishSession();
    }

    // Shaped like api/complete-practice-session.js's response so the code above
    // can't tell the difference. The XP burst does animate the header bar to
    // this made-up total; it's display only (playXpGain never writes) and the
    // next real profile update puts the true number back.
    function getDemoProgress() {
        const profile = getStoredProfile();
        const totalXp = Math.max(0, Number(profile.totalXp) || 0);
        return {
            xpEarned: 45,
            totalXp: totalXp + 45,
            sessionCoins: 25,
            streak: {
                // One past the real streak, so the roll shows the number the
                // player would actually see tomorrow.
                currentStreak: (Number(profile.dayStreak) || 0) + 1,
                streakAdvanced: true,
                streakReset: false
            },
            completedMissions: [
                { id: "play_sprint", coinReward: 50, labelKey: "mission.playSprint" },
                { id: "earn_30_xp", coinReward: 30, labelKey: "mission.earn30Xp" }
            ]
        };
    }

    // The XP and coin awards only arrive once the save round trip resolves,
    // so rather than snapping in as static text a beat after the card has
    // settled, they pop in with a short spring - which reads as "here's your
    // reward" instead of a late repaint. Remove/reflow/re-add restarts the CSS
    // animation even though the element is reused across replays (same trick
    // as js/lessons.js's revealText).
    function revealResultReward(target, text) {
        if (!target) return;
        target.classList.remove("is-revealed");
        target.textContent = text;
        void target.offsetWidth;
        target.classList.add("is-revealed");
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

    // Last sprint's friendsStatus, verbatim. Friendship streaks move by at
    // most one a day and the roster rarely changes, so replaying this is
    // almost always exactly what the server is about to send back - which is
    // what lets the block render complete and immediately instead of waiting
    // out the save.
    const SPRINT_FRIENDS_CACHE_KEY = "polytype-sprint-friends";

    function readSprintFriendsCache() {
        try {
            const entries = JSON.parse(localStorage.getItem(SPRINT_FRIENDS_CACHE_KEY));
            return Array.isArray(entries) ? entries : [];
        } catch {
            return [];
        }
    }

    function writeSprintFriendsCache(entries) {
        try {
            localStorage.setItem(SPRINT_FRIENDS_CACHE_KEY, JSON.stringify(entries));
        } catch {}
    }

    // Names and avatars only - no friendship streak, no played-today. Used
    // when there's no previous sprint to replay (first session on a device),
    // so at least the roster is right and only two small values arrive late.
    function readFriendsOverviewCache() {
        try {
            const entry = JSON.parse(localStorage.getItem("polytype-friends-cache"));
            const leaderboard = entry?.data?.leaderboard;
            if (!Array.isArray(leaderboard)) return [];
            return leaderboard
                .filter(row => row && !row.isSelf)
                .map(row => ({
                    uid: row.uid,
                    displayName: row.displayName,
                    avatarUrl: row.avatarUrl || null,
                    pending: true
                }));
        } catch {
            return [];
        }
    }

    // Paints the block from cache the moment the modal opens, so it takes its
    // final height straight away and reveals on the breakdown's own timeline.
    // prepareFriendsStatus later reconciles it against the real response.
    function resetFriendsSection() {
        if (!el.resultFriends || !el.resultFriendsList) return;

        el.resultFriends.classList.remove("is-visible");

        const cached = readSprintFriendsCache();
        const entries = cached.length ? cached : readFriendsOverviewCache();

        el.resultFriends.hidden = entries.length === 0;
        el.resultFriendsList.replaceChildren(...entries.map(buildFriendRow));
    }

    // Friend list under the score: each entry's friendshipStreak only rises
    // on a day both the player and that friend play a sprint (see
    // commitFriendshipStreaksForSprint in api/complete-practice-session.js);
    // playedToday reflects that same friend's sprint activity today.
    //
    // By the time this runs the block is usually already on screen with
    // cached rows, so it reconciles in place - same nodes, updated values -
    // rather than replacing the list. That keeps identical data (the common
    // case) completely invisible instead of flickering a rebuild.
    function prepareFriendsStatus(list) {
        if (!el.resultFriends || !el.resultFriendsList) return;
        const entries = Array.isArray(list) ? list : [];

        if (!entries.length) {
            el.resultFriends.hidden = true;
            el.resultFriendsList.replaceChildren();
            writeSprintFriendsCache([]);
            return;
        }

        const rows = [...el.resultFriendsList.children];
        const sameRoster =
            rows.length === entries.length &&
            entries.every((entry, index) => rows[index].dataset.uid === String(entry.uid ?? ""));

        el.resultFriends.hidden = false;

        if (sameRoster) {
            entries.forEach((entry, index) => updateFriendRow(rows[index], entry));
        } else {
            el.resultFriendsList.replaceChildren(...entries.map(buildFriendRow));
        }

        writeSprintFriendsCache(entries);
    }

    function buildFriendRow(entry) {
        const row = document.createElement("div");
        row.className = "friends-row";
        row.dataset.uid = String(entry.uid ?? "");

        const avatar = document.createElement("span");
        avatar.className = "profile-pill-avatar friends-row-avatar";
        avatar.setAttribute("aria-hidden", "true");

        const copy = document.createElement("span");
        copy.className = "friends-row-copy";
        copy.append(document.createElement("strong"));

        const streak = document.createElement("span");
        streak.className = "friends-row-streak";

        const status = document.createElement("span");
        status.className = "friends-status-badge";

        row.append(avatar, copy, streak, status);
        updateFriendRow(row, entry);
        return row;
    }

    function updateFriendRow(row, entry) {
        const avatar = row.querySelector(".friends-row-avatar");
        const name = row.querySelector(".friends-row-copy strong");
        const streak = row.querySelector(".friends-row-streak");
        const status = row.querySelector(".friends-status-badge");

        row.dataset.uid = String(entry.uid ?? "");

        const displayName = entry.displayName || "Player";
        if (name.textContent !== displayName) name.textContent = displayName;

        const wantsImage = Boolean(entry.avatarUrl);
        const currentImage = avatar.querySelector("img");
        if (wantsImage && currentImage?.getAttribute("src") !== entry.avatarUrl) {
            const image = document.createElement("img");
            image.src = entry.avatarUrl;
            image.alt = "";
            avatar.classList.add("has-image");
            avatar.replaceChildren(image);
        } else if (!wantsImage) {
            avatar.classList.remove("has-image");
            const initial = displayName.trim().charAt(0).toUpperCase() || "?";
            if (avatar.textContent !== initial) avatar.textContent = initial;
        }

        // `pending` marks a row built from the overview cache, which knows the
        // roster but not the per-pair values. Those two stay blank (but still
        // occupy their space) rather than showing a made-up zero that would
        // visibly correct itself a moment later.
        if (entry.pending) {
            streak.textContent = "";
            status.textContent = "";
            status.className = "friends-status-badge is-pending";
            return;
        }

        streak.textContent = `\u{1F525} ${entry.friendshipStreak || 0}`;
        status.className = entry.playedToday ? "friends-status-badge is-played" : "friends-status-badge";
        status.textContent = entry.playedToday
            ? tr("sprint.friendPlayedToday")
            : tr("sprint.friendNotPlayedToday");
    }


    // Fades in the block resetFriendsSection already painted from cache.
    // Driven purely by the breakdown's reveal timing - never by the save - so
    // the friends list lands as part of the same animation as everything else
    // instead of appearing a round trip later.
    function revealFriendsSection() {
        if (!el.resultFriends || el.resultFriends.hidden) return;
        if (!el.resultFriendsList?.firstChild) {
            el.resultFriends.hidden = true;
            return;
        }
        el.resultFriends.classList.add("is-visible");
    }

    // ── Audio playback (mirrors js/dictate.js's own copy) ──────────────────

    function getWordAudioUrl(item) {
        if (!audioBaseUrl || !activeDeckMeta) return null;
        return [audioBaseUrl, audioPrefix, encodeURIComponent(activeDeckMeta.id), `${encodeURIComponent(item.id)}.mp3`].join("/");
    }

    // Warms every word's mp3 into the browser's HTTP cache in the background,
    // the same way js/main.js does for the trainer.
    //
    // Without this, a round assigned src and called play() in the same tick,
    // so the file was still being fetched from the CDN when it was needed. A
    // slow fetch does NOT reject the play() promise - it just waits - so the
    // retry below never fired; the round would then advance on its
    // FEEDBACK_HOLD timer and the next word's src assignment aborted the load
    // outright. That word was simply never heard, with nothing logged. This
    // is what made sprint audio fail intermittently and only on slow links.
    const audioPreloadConcurrency = 4;
    const audioPreloadCache = new Map();

    function scheduleAudioPreload(items) {
        if (!audioBaseUrl || !items?.length) return;

        const seen = new Set();
        const urls = [];
        items.forEach(item => {
            const url = getWordAudioUrl(item);
            if (!url || seen.has(url) || audioPreloadCache.has(url)) return;
            seen.add(url);
            urls.push(url);
        });
        if (!urls.length) return;

        // Deferred a tick so the first round paints before the fetches start.
        window.setTimeout(() => preloadAudioQueue(urls), 0);
    }

    async function preloadAudioQueue(urls) {
        let nextIndex = 0;
        const workerCount = Math.min(audioPreloadConcurrency, urls.length);
        const workers = Array.from({ length: workerCount }, async () => {
            while (nextIndex < urls.length) {
                const url = urls[nextIndex];
                nextIndex += 1;
                await preloadAudioUrl(url);
            }
        });
        await Promise.all(workers);
    }

    // Loads into a throwaway element, never played - it exists only to get the
    // bytes into the HTTP cache so the one persistent playback element below
    // can start instantly. Errors resolve like successes: a missing file must
    // not stall the queue behind it.
    function preloadAudioUrl(url) {
        if (!url) return Promise.resolve();
        const cached = audioPreloadCache.get(url);
        if (cached) return cached.promise;

        const audio = new Audio();
        audio.preload = "auto";
        audio.src = url;

        const promise = new Promise(resolve => {
            let done = false;
            const finish = () => {
                if (done) return;
                done = true;
                audio.removeEventListener("canplaythrough", finish);
                audio.removeEventListener("canplay", finish);
                audio.removeEventListener("error", finish);
                resolve();
            };
            audio.addEventListener("canplaythrough", finish);
            audio.addEventListener("canplay", finish);
            audio.addEventListener("error", finish);
            audio.load();
        });

        audioPreloadCache.set(url, { audio, promise });
        return promise;
    }

    // One persistent element for every word playback, primed inside the
    // session's first real tap. iOS Safari only lets sound start from
    // within a user gesture and remembers that permission *per element* -
    // the old new-Audio-per-play meant every autoplayed round (they render
    // behind FEEDBACK_HOLD timeouts, so no gesture context survives) and
    // every 400ms retry was a brand-new never-unlocked element, silently
    // blocked with NotAllowedError on iPhone. Reusing one unlocked element
    // also means a replay tap of the same word continues from its
    // already-buffered data instead of restarting the whole mp3 download
    // from the CDN - which is what made replay feel dead on slow
    // connections even where it wasn't blocked.
    const SILENT_WAV = "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=";
    let activeAudioUrl = null;
    let wordAudioPlayId = 0;

    function ensureWordAudio() {
        if (!activeAudio) activeAudio = new Audio();
        return activeAudio;
    }

    // The zero-sample wav gives the element a real src to "play" during the
    // gesture; WebKit keeps the element user-activated afterwards even as
    // src is swapped to real word files.
    function primeWordAudio() {
        const audio = ensureWordAudio();
        if (audio.src) return;
        audio.src = SILENT_WAV;
        audio.play().catch(() => {});
    }

    function playWordAudio(item, attempt = 0) {
        if (!item?.id || !audioBaseUrl) return;
        const url = getWordAudioUrl(item);
        if (!url) return;

        // Covers the word the background queue hasn't reached yet: the fetch
        // starts here on its own element, so even if this attempt is too early
        // the 400ms retry lands on a warm cache instead of racing the CDN again.
        preloadAudioUrl(url);

        try {
            const audio = ensureWordAudio();
            const playId = ++wordAudioPlayId;
            // Re-assign src (which re-fetches) when this is a different word OR
            // the element is stuck in an error state from a failed load. Without
            // the audio.error check, a same-URL replay would take the seek-only
            // branch on an errored element and reject again - the word's audio
            // would stay dead no matter how many times the icon is tapped.
            if (activeAudioUrl !== url || audio.error) {
                audio.src = url;
                activeAudioUrl = url;
            } else {
                // Rewinding an element that hasn't loaded metadata yet throws
                // InvalidStateError in some browsers. That used to escape to
                // the outer catch *before* play() was ever called, so a replay
                // tapped during the initial load did nothing at all, silently.
                try { audio.currentTime = 0; } catch {}
            }
            audio.play().catch(() => {
                // The CDN link this streams from occasionally has a slow or
                // failed node for a given file - one silent retry covers
                // that without the player needing to notice and hit replay
                // themselves. Only if nothing newer (a fresh round, or the
                // player already hitting replay again) has superseded this
                // exact attempt in the meantime. Clearing activeAudioUrl forces
                // the retry through the re-fetch branch above - just seeking the
                // already-failed element again would fail identically.
                if (attempt < 1 && wordAudioPlayId === playId) {
                    activeAudioUrl = null;
                    window.setTimeout(() => {
                        if (wordAudioPlayId === playId) playWordAudio(item, attempt + 1);
                    }, 400);
                }
            });
        } catch {
            // Ignore - the replay button is always available as a fallback.
        }
    }

    // Sprint auto-starts (no duration modal), so the first tap this catches
    // is usually the first round's own answer - the round *before* any
    // audio round, in practice, since round types rotate. {once} is safe:
    // priming is a one-shot need.
    document.addEventListener("pointerdown", primeWordAudio, { once: true });

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
