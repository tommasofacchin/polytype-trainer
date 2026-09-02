"use strict";

(function () {
    const PROFILE_KEY = "polytype-profile";
    // Which course's lessons to show: the active study language, as long as it
    // actually has a lessons curriculum loaded (decks/lessons-*.js merge into
    // window.POLYTYPE_LESSONS). Falls back to Norwegian - the Home CTA that
    // links here is itself gated to languages that have lessons (see
    // js/dashboard.js), so in practice the stored language is always one with a
    // curriculum by the time we get here.
    const COURSE_ID = pickCourseId();

    function pickCourseId() {
        const available = window.POLYTYPE_LESSONS || {};
        const stored = localStorage.getItem("polytype-language");
        if (stored && Array.isArray(available[stored]) && available[stored].length) return stored;
        return "norwegian";
    }

    // Same two-stage delay sprint.js uses: FEEDBACK_HOLD shows the
    // correct/wrong state, then the exercise fades out before the next one's
    // markup replaces it. A wrong answer holds noticeably longer, since it's
    // also showing the correct answer (see revealCorrection) and the player
    // needs a beat to actually read it before the next exercise slides in.
    const FEEDBACK_HOLD_DELAY = 550;
    const FEEDBACK_HOLD_WRONG_DELAY = 2000;
    const FADE_OUT_DELAY = 220;

    // How long a review run is, capped by how many exercises the finished
    // lessons actually hold. Sprint picks 10-20 rounds; a review sits at the
    // short end of that, since every exercise here is also retried until it's
    // answered right (see the retry phase below).
    const REVIEW_MIN_EXERCISES = 10;
    const REVIEW_MAX_EXERCISES = 15;

    const LOCK_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>';
    const CHECK_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 12.8l5 5L19.5 6.8"/></svg>';
    const STAR_SVG = '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2.6l2.8 5.7 6.3.9-4.6 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L2.9 9.2l6.3-.9z"/></svg>';
    const REVIEW_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20.4 12a8.4 8.4 0 1 1-2.5-6"/><path d="M20.6 4.3v5.2h-5.2"/></svg>';
    // Matches js/sprint.js's own copy of this icon - kept local rather than
    // shared, same as that file's and js/chest.js's and js/shop.js's copies.
    const COIN_SVG = '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="#ffc73a"/><circle cx="12" cy="12" r="6.5" fill="none" stroke="#d99a1c" stroke-width="2"/></svg>';
    // Same triangle as Home's "Play" CTA (index.html) - the FAB below reuses
    // it so the two read as the same action in two places.
    const PLAY_SVG = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';

    // Duolingo-style serpentine: each node in a module slides sideways by
    // shift * --path-amp (see .lesson-path-node in style.css). The pattern
    // restarts per module so the first node always sits centred under its
    // module banner.
    const PATH_SHIFTS = [0, 1, 1.75, 1, 0, -1, -1.75, -1];
    // How many --path-hue tones style.css defines (data-path-tone selectors).
    const PATH_TONE_COUNT = 6;

    const state = {
        lessons: [],            // flat, in unlock order
        modules: [],             // [{ id, title, lessons: [...] }]
        lessonsCompleted: [],
        activeLesson: null,
        // "lesson" (one lesson, played in curriculum order) or "review" (a
        // mixed run over lessons already finished). Everything from
        // startExercises down reads state.queue, so both modes share one
        // player - the mode only decides what goes into that queue, what the
        // chrome says, and how the finished session is posted.
        mode: "lesson",
        queue: [],               // the exercises this run actually plays
        mainIndex: 0,
        wrongList: [],           // exercises missed on the main pass
        retryQueue: [],
        retryTotal: 0,
        retryDoneCount: 0,
        wrongAttempts: 0,        // total wrong answers across both phases
        sessionStartTime: 0
    };

    const el = {};

    function tr(key, params = {}) {
        return window.PolytypeI18n?.t?.(key, params) || key;
    }

    function initLessonsPage() {
        el.pathView = document.getElementById("lessons-path-view");
        el.reviewSlot = document.getElementById("lessons-review-slot");
        el.modulesRoot = document.getElementById("lessons-modules");
        el.playerView = document.getElementById("lessons-player-view");
        el.backBtn = document.getElementById("lessons-back-btn");

        el.sheet = document.getElementById("lessons-sheet");
        el.sheetBackdrop = document.getElementById("lessons-sheet-backdrop");
        el.sheetKicker = document.getElementById("lessons-sheet-kicker");
        el.sheetTitle = document.getElementById("lessons-sheet-title");
        el.sheetBody = document.getElementById("lessons-sheet-body");
        el.sheetStartBtn = document.getElementById("lessons-sheet-start-btn");
        el.sheetCloseBtn = document.getElementById("lessons-sheet-close");

        el.exerciseScreen = document.getElementById("lessons-exercise-screen");
        el.reviewBanner = document.getElementById("lessons-review-banner");
        el.exerciseProgress = document.getElementById("lessons-exercise-progress");
        el.progressBar = document.getElementById("lessons-progress");
        el.progressFill = document.getElementById("lessons-progress-fill");
        el.exerciseRoot = document.getElementById("lessons-exercise-root");

        el.completeScreen = document.getElementById("lessons-complete-screen");
        el.completeTitle = document.getElementById("lessons-complete-title");
        el.completeDetail = document.getElementById("lessons-complete-detail");
        el.completeCoins = document.getElementById("lessons-complete-coins");
        el.completeStatus = document.getElementById("lessons-complete-status");
        el.continueBtn = document.getElementById("lessons-continue-btn");

        el.backBtn.addEventListener("click", showPathView);
        el.sheetStartBtn.addEventListener("click", beginLesson);
        el.sheetCloseBtn.addEventListener("click", closeSheet);
        el.sheetBackdrop.addEventListener("click", closeSheet);
        el.continueBtn.addEventListener("click", showPathView);
        // Scoped to the sheet (not document) so it's torn down with the node
        // on a soft navigation - js/router.js re-runs this script per visit and
        // document-level listeners would otherwise pile up. Focus lives inside
        // the sheet while it's open (openSheet focuses Start), so Escape here
        // reaches this handler by bubbling.
        el.sheet.addEventListener("keydown", event => {
            if (event.key === "Escape") closeSheet();
        });

        // The path - module banners, node labels, the review card - is built
        // in JS, so the shell's data-i18n sweep reaches none of it on a
        // language switch; rebuilding it does. Registered through the router's
        // shared hook slot rather than a document listener of our own, for the
        // reason js/main.js spells out.
        window.__polytypePageHooks = window.__polytypePageHooks || {};
        window.__polytypePageHooks.onLanguageChanged = renderPath;

        loadLessons();
    }

    function loadLessons() {
        const data = window.POLYTYPE_LESSONS?.[COURSE_ID] || [];
        if (!data.length) {
            if (el.modulesRoot) el.modulesRoot.innerHTML = `<p class="lessons-load-error">${tr("lessons.loadError")}</p>`;
            return;
        }
        state.lessons = data;
        state.modules = groupByModule(data);
        showPathView();
        scrollToActiveLesson();
    }

    // Opening the page travels down the path to the lesson you're actually on,
    // rather than dropping you at module 1 to scroll for it yourself. Only on
    // open - showPathView also runs when backing out of a lesson, and yanking
    // the view around every time you hit Back would be motion sickness, not
    // orientation.
    function scrollToActiveLesson() {
        const target = el.modulesRoot?.querySelector(".lesson-path-node.is-active");
        if (!target) return;

        const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches === true;
        if (reduceMotion) {
            target.scrollIntoView({ block: "center" });
            return;
        }

        // Pin to the top first so the animation reads as a journey down the
        // path from the start. Browsers restore the previous scroll offset on
        // a back-navigation, which would otherwise make this drift sideways
        // from wherever it happened to land.
        window.scrollTo({ top: 0, behavior: "auto" });
        document.body.scrollTop = 0;

        // Two frames: one for the jump to top to commit, one for the freshly
        // rendered nodes to have real layout boxes to scroll to.
        requestAnimationFrame(() => requestAnimationFrame(() => {
            target.scrollIntoView({ behavior: "smooth", block: "center" });
        }));
    }

    function groupByModule(lessons) {
        const modules = [];
        const byId = new Map();
        lessons.forEach(lesson => {
            let module = byId.get(lesson.moduleId);
            if (!module) {
                module = { id: lesson.moduleId, title: lesson.moduleTitle, lessons: [] };
                byId.set(lesson.moduleId, module);
                modules.push(module);
            }
            module.lessons.push(lesson);
        });
        return modules;
    }

    function getStoredProfile() {
        try {
            return JSON.parse(localStorage.getItem(PROFILE_KEY)) || {};
        } catch {
            return {};
        }
    }

    function getLessonsCompleted() {
        const completed = getStoredProfile().courses?.[COURSE_ID]?.lessonsCompleted;
        return Array.isArray(completed) ? completed : [];
    }

    // ── Path view ────────────────────────────────────────────────────────────

    function showPathView() {
        closeSheet();
        state.lessonsCompleted = getLessonsCompleted();
        renderPath();
        el.playerView.hidden = true;
        el.pathView.hidden = false;
        // Lives outside <main> now (see lessons.html), so it no longer
        // hides for free with the rest of the path view.
        el.reviewSlot.hidden = false;
    }

    function renderPath() {
        // The empty-modules guard is for the load-failure path: loadLessons
        // leaves its error message in the modules root, and a language switch
        // would otherwise wipe it for an equally empty path.
        if (!el.modulesRoot || !state.modules.length) return;
        const fab = buildReviewFab();
        el.reviewSlot.replaceChildren(...(fab ? [fab] : []));
        el.modulesRoot.replaceChildren(...state.modules.map(buildModuleSection));
    }

    function buildModuleSection(module, moduleIndex) {
        const completedInModule = module.lessons.filter(lesson => state.lessonsCompleted.includes(lesson.id)).length;

        const section = document.createElement("section");
        section.className = "lessons-module lesson-path-module";
        section.dataset.pathTone = String(moduleIndex % PATH_TONE_COUNT);

        const banner = document.createElement("header");
        banner.className = "lesson-path-banner";

        const copy = document.createElement("div");
        copy.className = "lesson-path-banner-copy";
        const kicker = document.createElement("span");
        kicker.className = "lesson-path-banner-kicker";
        kicker.textContent = tr("lessons.moduleKicker", { n: moduleIndex + 1 });
        const title = document.createElement("strong");
        title.className = "lesson-path-banner-title";
        title.textContent = module.title;
        copy.append(kicker, title);

        const progress = document.createElement("span");
        progress.className = "lesson-path-banner-progress";
        progress.textContent = tr("lessons.moduleProgress", { done: completedInModule, total: module.lessons.length });

        const side = document.createElement("div");
        side.className = "lesson-path-banner-side";
        side.appendChild(progress);

        // A review scoped to this module, next to that module's own progress.
        // The card at the top of the path mixes everything finished, which is
        // the wrong tool when what you want is another pass at one topic.
        if (completedInModule) {
            const label = tr("lessons.reviewModuleAria", { module: module.title });
            const reviewBtn = document.createElement("button");
            reviewBtn.type = "button";
            reviewBtn.className = "lesson-path-banner-review";
            reviewBtn.innerHTML = REVIEW_SVG;
            reviewBtn.setAttribute("aria-label", label);
            reviewBtn.title = label;
            reviewBtn.addEventListener("click", () => startReview(
                module.lessons.filter(lesson => state.lessonsCompleted.includes(lesson.id))
            ));
            side.appendChild(reviewBtn);
        }

        banner.append(copy, side);

        const track = document.createElement("div");
        track.className = "lesson-path-track";
        track.append(...module.lessons.map(buildLessonNode));

        section.append(banner, track);
        return section;
    }

    function buildLessonNode(lesson, indexInModule) {
        const globalIndex = state.lessons.indexOf(lesson);
        const isComplete = state.lessonsCompleted.includes(lesson.id);
        const isUnlocked = isComplete || globalIndex <= state.lessonsCompleted.length;
        // Exactly one node is "active" at a time: the first unlocked lesson
        // that isn't complete yet (unlocking is strictly sequential).
        const isActive = isUnlocked && !isComplete;

        const node = document.createElement("button");
        node.type = "button";
        node.className = "lesson-path-node";
        node.classList.add(isComplete ? "is-complete" : (isActive ? "is-active" : "is-locked"));
        node.disabled = !isUnlocked;
        node.style.setProperty("--shift", String(PATH_SHIFTS[indexInModule % PATH_SHIFTS.length]));

        if (isActive) {
            const bubble = document.createElement("span");
            bubble.className = "lesson-path-start";
            bubble.textContent = tr("lessons.startBubble");
            node.appendChild(bubble);
        }

        const circle = document.createElement("span");
        circle.className = "lesson-path-circle";
        circle.innerHTML = isComplete ? CHECK_SVG : (isActive ? STAR_SVG : LOCK_SVG);

        const label = document.createElement("span");
        label.className = "lesson-path-label";
        label.textContent = lesson.title;

        node.append(circle, label);
        if (!isUnlocked) node.title = tr("lessons.lockedHint");
        if (isUnlocked) node.addEventListener("click", () => openLesson(lesson));
        return node;
    }

    // ── Review: mixed practice over lessons already finished ──────────
    //
    // Sprint's shape - a shuffled run of mixed exercises behind a progress bar
    // - pointed at lesson content instead of the vocabulary deck, and drawing
    // only from lessons the player has actually finished. A review can never
    // advance the unlock frontier or re-pay a lesson's one-time coin bonus: it
    // posts its session without a lessonId, which
    // api/complete-practice-session.js treats as ordinary practice - still
    // worth XP, coins, the streak and mission progress.

    function getCompletedLessons() {
        return state.lessons.filter(lesson => state.lessonsCompleted.includes(lesson.id));
    }

    // A floating action button - same shape and play-triangle icon as Home's
    // "Play" CTA (index.html) - pinned over the path instead of a card in its
    // flow, so it's reachable no matter how far down the path you've
    // scrolled. Returns null while there's nothing to mix yet: an
    // always-there but disabled FAB would just be a dead corner of the
    // screen, and once the first lesson is done the button appearing in the
    // corner is itself the discovery moment.
    function buildReviewFab() {
        const completed = getCompletedLessons();
        if (!completed.length) return null;

        const fab = document.createElement("button");
        fab.type = "button";
        fab.className = "home-play-again-btn lessons-review-fab";
        fab.innerHTML = PLAY_SVG;
        const label = document.createElement("span");
        label.textContent = tr("lessons.reviewTitle");
        fab.appendChild(label);

        fab.addEventListener("click", () => startReview(completed));
        return fab;
    }

    // No intro sheet on the way in, unlike a lesson: a mixed run has no single
    // explanation to show, and the button was pressed to practise, not to read.
    function startReview(lessons) {
        const queue = buildReviewQueue(lessons);
        if (!queue.length) return;

        closeSheet();
        state.mode = "review";
        state.activeLesson = null;
        state.queue = queue;
        el.pathView.hidden = true;
        el.playerView.hidden = false;
        el.reviewSlot.hidden = true;
        startExercises();
    }

    // Deals one exercise per lesson per pass - each lesson's own exercises
    // shuffled first, and the lessons themselves shuffled so the same ones
    // don't always contribute the leftovers - instead of shuffling one flat
    // pool. A pool shuffle will happily hand back five exercises from a single
    // lesson and skip three others entirely; dealing round-robin means a run
    // spans as much of the finished curriculum as its length allows. The take
    // is shuffled at the end so the order doesn't read lesson-by-lesson.
    function buildReviewQueue(lessons) {
        const decks = shuffle(lessons.slice()).map(lesson => shuffle((lesson.exercises || []).slice()));
        const available = decks.reduce((sum, deck) => sum + deck.length, 0);
        if (!available) return [];

        const span = REVIEW_MAX_EXERCISES - REVIEW_MIN_EXERCISES + 1;
        const target = Math.min(available, REVIEW_MIN_EXERCISES + Math.floor(Math.random() * span));

        const dealt = [];
        // Terminates because target <= available: the passes cannot run dry
        // before dealt reaches target.
        for (let pass = 0; dealt.length < target; pass += 1) {
            for (const deck of decks) {
                if (pass >= deck.length) continue;
                dealt.push(deck[pass]);
                if (dealt.length === target) break;
            }
        }
        return shuffle(dealt);
    }

    // ── Lesson intro sheet ──────────────────────────────────────────────────
    //
    // Tapping a node no longer jumps straight into the player; it slides a
    // bottom sheet up over the path with the lesson's explanation and a
    // "Start lesson" button. That button (beginLesson) is what actually opens
    // the player and starts the exercises.

    const SHEET_ANIM_MS = 280;
    let sheetHideTimer = null;

    function openLesson(lesson) {
        state.activeLesson = lesson;
        el.sheetKicker.textContent = lesson.moduleTitle;
        el.sheetTitle.textContent = lesson.title;
        el.sheetBody.replaceChildren(...lesson.explanation.map(buildExplanationBlock));
        el.sheetBody.scrollTop = 0;
        openSheet();
    }

    function openSheet() {
        if (sheetHideTimer) { clearTimeout(sheetHideTimer); sheetHideTimer = null; }
        el.sheet.hidden = false;
        document.body.classList.add("lessons-sheet-open");
        // Force a reflow so the freshly-unhidden sheet transitions from its
        // off-screen start rather than snapping straight to the open state.
        void el.sheet.offsetWidth;
        el.sheet.classList.add("is-open");
        el.sheetStartBtn.focus();
    }

    function closeSheet() {
        if (el.sheet.hidden) return;
        el.sheet.classList.remove("is-open");
        document.body.classList.remove("lessons-sheet-open");
        sheetHideTimer = window.setTimeout(() => {
            el.sheet.hidden = true;
            sheetHideTimer = null;
        }, SHEET_ANIM_MS);
    }

    function beginLesson() {
        closeSheet();
        state.mode = "lesson";
        state.queue = state.activeLesson.exercises;
        el.pathView.hidden = true;
        el.playerView.hidden = false;
        el.reviewSlot.hidden = true;
        startExercises();
    }

    function buildExplanationBlock(block) {
        if (block.type === "example") {
            const row = document.createElement("div");
            row.className = "lessons-example-row";
            const term = document.createElement("strong");
            // Foreign-language term: keyed per course in the data files
            // (`no` for Norwegian, `sv` for Swedish, `de` for German, `it` for
            // Italian, `zh` for Chinese, `ja` for Japanese, `es` for Spanish);
            // `term` is a generic fallback for any future language.
            term.textContent = block.no ?? block.sv ?? block.de ?? block.it ?? block.zh ?? block.ja ?? block.es ?? block.term ?? "";
            const en = document.createElement("span");
            en.textContent = block.en;
            row.append(term, en);
            return row;
        }
        const p = document.createElement("p");
        p.className = "lessons-explanation-p";
        p.textContent = block.text;
        return p;
    }

    // ── Player: exercises - single pass, then retry-until-correct ──────────
    //
    // Mirrors js/sprint.js's main-pass-then-retry-phase structure, except the
    // retry loop keeps re-queuing a still-wrong exercise (instead of Sprint's
    // one-shot retry) until every exercise has been answered correctly at
    // least once. This is a deliberate departure from Sprint's scoring model,
    // not just a stylistic choice: it guarantees correctAnswers ends up
    // >= exercises.length > 0 by construction, so the session posted to
    // api/complete-practice-session.js can never be rejected for having zero
    // correct answers, and it fits a "teach, then reinforce" lesson better
    // than a one-shot arcade test.

    function startExercises() {
        const isReview = state.mode === "review";
        state.mainIndex = 0;
        state.wrongList = [];
        state.wrongAttempts = 0;
        state.sessionStartTime = Date.now();
        el.completeScreen.hidden = true;
        el.exerciseScreen.hidden = false;
        // The bar is the only thing marking a review run up front; the banner
        // stays hidden until startRetryPhase has something worth saying.
        el.reviewBanner.hidden = true;
        el.progressBar.hidden = !isReview;
        showNextMainExercise();
    }

    function showNextMainExercise() {
        const total = state.queue.length;
        if (state.mainIndex >= total) {
            if (state.wrongList.length) startRetryPhase();
            else finishSession();
            return;
        }

        setRunProgress(`${state.mainIndex + 1} / ${total}`, state.mainIndex / total);
        const exercise = state.queue[state.mainIndex];
        renderExercise(exercise, isCorrect => {
            if (!isCorrect) {
                state.wrongList.push(exercise);
                state.wrongAttempts += 1;
            }
            state.mainIndex += 1;
            advanceAfterFeedback(showNextMainExercise, isCorrect);
        });
    }

    function startRetryPhase() {
        state.retryQueue = [...state.wrongList];
        state.retryTotal = state.wrongList.length;
        state.retryDoneCount = 0;
        el.reviewBanner.hidden = false;
        el.reviewBanner.textContent = tr("lessons.reviewIntro");
        showNextRetryExercise();
    }

    function showNextRetryExercise() {
        if (!state.retryQueue.length) {
            finishSession();
            return;
        }

        // The bar stays pinned at 100% for the whole retry phase, the way
        // js/sprint.js leaves it: the main pass really is done, and draining it
        // back to empty read as losing progress.
        setRunProgress(`${state.retryDoneCount} / ${state.retryTotal}`, 1);
        const exercise = state.retryQueue.shift();
        renderExercise(exercise, isCorrect => {
            if (isCorrect) {
                state.retryDoneCount += 1;
            } else {
                state.wrongAttempts += 1;
                state.retryQueue.push(exercise);
            }
            advanceAfterFeedback(showNextRetryExercise, isCorrect);
        });
    }

    // The "3 / 12" line is the progress readout in both modes; the bar under
    // it only exists during a review (see startExercises), so everything past
    // the hidden check is skipped for a plain lesson.
    function setRunProgress(label, fraction) {
        el.exerciseProgress.textContent = label;
        if (el.progressBar.hidden) return;

        const percent = Math.max(0, Math.min(100, Math.round(fraction * 100)));
        el.progressFill.style.width = `${percent}%`;
        el.progressBar.setAttribute("aria-valuenow", String(percent));
        el.progressBar.setAttribute("aria-valuetext", label);
    }

    function advanceAfterFeedback(next, isCorrect = true) {
        const hold = isCorrect ? FEEDBACK_HOLD_DELAY : FEEDBACK_HOLD_WRONG_DELAY;
        window.setTimeout(() => {
            el.exerciseRoot.querySelector(".sprint-exercise")?.classList.add("is-leaving");
            window.setTimeout(next, FADE_OUT_DELAY);
        }, hold);
    }

    // Appended below a wrong answer so the player is told what the right one
    // was. Used by the `type` round (which otherwise shows nothing) and the
    // true/false round; the `mc` round already turns its correct option green
    // (see renderMcExercise), which reads clearly enough on its own.
    function revealCorrection(answerText) {
        const wrap = el.exerciseRoot.querySelector(".sprint-exercise");
        if (!wrap) return;
        const note = document.createElement("p");
        note.className = "lessons-correction";
        note.textContent = tr("lessons.correctAnswer", { answer: answerText });
        wrap.appendChild(note);
    }

    // onAnswered(isCorrect) fires once, right when the answer is locked in -
    // feedback (is-correct/is-wrong classes) is already visible by then; the
    // delay before actually advancing happens in advanceAfterFeedback above.
    function renderExercise(exercise, onAnswered) {
        el.exerciseRoot.innerHTML = "";
        if (exercise.type === "mc") renderMcExercise(exercise, onAnswered);
        else if (exercise.type === "trueFalse") renderTrueFalseExercise(exercise, onAnswered);
        else renderTypeExercise(exercise, onAnswered);
    }

    function renderMcExercise(exercise, onAnswered) {
        el.exerciseRoot.innerHTML = `
            <div class="sprint-exercise">
                <p class="sprint-exercise-kicker">${escapeHtml(exercise.prompt)}</p>
                <div class="sprint-mc-grid"></div>
            </div>
        `;
        const grid = el.exerciseRoot.querySelector(".sprint-mc-grid");
        let locked = false;
        exercise.options.forEach((optionText, index) => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "sprint-mc-option";
            btn.textContent = optionText;
            btn.dataset.index = String(index);
            btn.addEventListener("click", () => {
                if (locked) return;
                locked = true;
                const isCorrect = index === exercise.answer;
                btn.classList.add(isCorrect ? "is-correct" : "is-wrong");
                grid.querySelectorAll(".sprint-mc-option").forEach(node => {
                    if (node !== btn) node.classList.add("is-disabled");
                    if (!isCorrect && Number(node.dataset.index) === exercise.answer) node.classList.add("is-correct");
                });
                onAnswered(isCorrect);
            });
            grid.appendChild(btn);
        });
    }

    function renderTrueFalseExercise(exercise, onAnswered) {
        el.exerciseRoot.innerHTML = `
            <div class="sprint-exercise">
                <p class="sprint-exercise-kicker">${escapeHtml(exercise.claim)}</p>
                <div class="sprint-tf-buttons">
                    <button type="button" class="sprint-tf-btn" data-answer="true">${tr("lessons.trueLabel")}</button>
                    <button type="button" class="sprint-tf-btn" data-answer="false">${tr("lessons.falseLabel")}</button>
                </div>
            </div>
        `;
        let locked = false;
        el.exerciseRoot.querySelectorAll(".sprint-tf-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                if (locked) return;
                locked = true;
                const answeredTrue = btn.dataset.answer === "true";
                const isCorrect = answeredTrue === exercise.answer;
                btn.classList.add(isCorrect ? "is-correct" : "is-wrong");
                el.exerciseRoot.querySelectorAll(".sprint-tf-btn").forEach(node => {
                    if (node !== btn) node.classList.add("is-disabled");
                    // Light up the actually-correct button too, so a wrong
                    // pick clearly shows which of True/False was right - the
                    // same green cue the mc round gives its correct option.
                    if (!isCorrect && (node.dataset.answer === "true") === exercise.answer) {
                        node.classList.add("is-correct");
                    }
                });
                onAnswered(isCorrect);
            });
        });
    }

    function renderTypeExercise(exercise, onAnswered) {
        // `hint` names the dictionary/infinitive form of whatever's being
        // inflected in the blank (e.g. "å bo" for a "bor" answer) - added to
        // exercises where the blank tests conjugation/agreement rather than
        // recall of the word itself, so forgetting the base form (easy once
        // this is pulled out of its lesson and mixed into a Review run)
        // doesn't block answering a question that was never about that
        // recall in the first place. See decks/lessons-*.js's exercise-type
        // comment for which blanks carry one.
        const hintHtml = exercise.hint
            ? `<p class="lessons-type-hint">${tr("lessons.hintLabel", { word: escapeHtml(exercise.hint) })}</p>`
            : "";
        el.exerciseRoot.innerHTML = `
            <div class="sprint-exercise">
                <p class="sprint-exercise-kicker">${escapeHtml(exercise.prompt)}</p>
                ${hintHtml}
                <form class="sprint-type-form" autocomplete="off">
                    <input type="text" class="sprint-type-input" placeholder="${tr("lessons.typePlaceholder")}" inputmode="none" autocapitalize="off" autocorrect="off" spellcheck="false" data-vkbd="true" data-vkbd-enter="false">
                    <button type="submit" class="sprint-type-submit">${tr("lessons.checkBtn")}</button>
                </form>
            </div>
        `;
        const form = el.exerciseRoot.querySelector(".sprint-type-form");
        const input = el.exerciseRoot.querySelector(".sprint-type-input");
        let locked = false;
        input.focus();

        form.addEventListener("submit", event => {
            event.preventDefault();
            if (locked) return;
            locked = true;
            const isCorrect = isAcceptableAnswer(input.value, exercise);
            input.disabled = true;
            input.classList.add(isCorrect ? "is-correct" : "is-wrong");
            // Nothing else on a type round reveals the answer, so a wrong
            // guess has to be told outright what the canonical answer was.
            if (!isCorrect) revealCorrection(exercise.answer);
            onAnswered(isCorrect);
        });
    }

    function isAcceptableAnswer(typed, exercise) {
        const norm = normalizeString(typed);
        if (!norm) return false;
        const targets = [exercise.answer, ...(exercise.accept || [])].map(normalizeString);
        return targets.some(t => norm === t || (t.length >= 3 && levenshtein(norm, t) <= 1));
    }

    // ── Player: completion screen ────────────────────────────────────────────

    async function finishSession() {
        const isReview = state.mode === "review";
        const total = state.queue.length;

        el.exerciseScreen.hidden = true;
        el.reviewBanner.hidden = true;
        el.completeScreen.hidden = false;
        clearRevealed(el.completeDetail);
        clearRevealed(el.completeCoins);
        clearRevealed(el.completeStatus);
        el.completeTitle.textContent = tr(isReview ? "lessons.reviewCompleteTitle" : "lessons.completeTitle");
        // A review has no pass/fail - the retry phase means every exercise is
        // answered right eventually - so what it can report is how many landed
        // first time. Known before the save, so it shows straight away.
        if (isReview) {
            revealText(el.completeDetail, tr("lessons.reviewAccuracy", {
                correct: total - state.wrongList.length,
                total
            }));
        }
        el.continueBtn.disabled = true;

        const sessionSeconds = Math.round((Date.now() - state.sessionStartTime) / 1000);
        const payload = {
            courseId: COURSE_ID,
            gameType: "lesson",
            // Deliberately absent on a review: an id here is exactly what
            // advances the unlock frontier and pays the one-time lesson bonus,
            // and a review must do neither (see
            // api/complete-practice-session.js).
            lessonId: isReview ? null : state.activeLesson.id,
            correctAnswers: total,
            wrongAnswers: state.wrongAttempts,
            bestCombo: 0,
            wordsUsed: total,
            sessionSeconds
        };

        const firebaseClient = window.PolytypeFirebase;
        if (!firebaseClient?.isSignedIn?.()) {
            revealText(el.completeStatus, tr("trainer.signInSave"));
            el.continueBtn.disabled = false;
            return;
        }

        try {
            const progress = window.PolytypeGameState?.completePracticeSession
                ? await window.PolytypeGameState.completePracticeSession(payload)
                : (await firebaseClient.completePracticeSession(payload))?.data;

            if (Array.isArray(progress?.course?.lessonsCompleted)) {
                state.lessonsCompleted = progress.course.lessonsCompleted;
            }

            if (isReview) {
                // No lesson bonus to report, so a review shows what it did
                // earn instead: the session's own XP and coins, the pair
                // Sprint's result card ends on.
                revealText(el.completeCoins, tr("lessons.reviewReward", {
                    xp: progress?.xpEarned || 0,
                    coins: progress?.sessionCoins || 0
                }), { icon: COIN_SVG });
            } else if (progress?.newLessonCompletion) {
                if (progress.lessonCoinsAwarded > 0) {
                    revealText(el.completeCoins, tr("lessons.coinsEarned", { count: progress.lessonCoinsAwarded }), { icon: COIN_SVG });
                }
            } else {
                el.completeTitle.textContent = tr("lessons.replayTitle");
            }

            // Same order as js/sprint.js's finishSession - see the comment
            // there. A no-op unless this was the day's first session.
            await window.PolytypeStreakCelebrate?.show?.(progress?.streak);
            if (progress?.completedMissions?.length) {
                await window.PolytypeMissionCelebrate?.show?.(progress.completedMissions);
            }
            if (progress?.newBadges?.length) {
                await window.PolytypeBadgeCelebrate?.show?.(progress.newBadges);
            }
        } catch (error) {
            revealText(el.completeStatus, error?.message || tr("trainer.signInSave"));
        }

        el.continueBtn.disabled = false;
    }

    // Sets text and (re-)triggers the quick pop-in animation, instead of the
    // text just silently appearing whenever the save round-trip resolves -
    // the remove/reflow/add dance is needed because these same elements get
    // reused across multiple lesson plays, and re-adding a class that's
    // already present doesn't restart a CSS animation on its own (mirrors
    // js/main.js's animateStreakPop).
    // `icon` is markup on purpose (an inline SVG constant from this file,
    // never anything server- or player-supplied) - mirrors js/sprint.js's
    // revealResultReward. Every other caller passes plain text through
    // textContent as before.
    function revealText(target, text, { icon = "" } = {}) {
        target.classList.remove("is-revealed");
        if (icon) target.innerHTML = `${icon}<span>${escapeHtml(text)}</span>`;
        else target.textContent = text;
        void target.offsetWidth;
        target.classList.add("is-revealed");
    }

    function clearRevealed(target) {
        target.classList.remove("is-revealed");
        target.textContent = "";
    }

    // ── Small generic helpers (mirrors js/sprint.js's own copies) ───────────

    function normalizeString(str) {
        return String(str || "")
            .toLowerCase()
            .normalize("NFD")
            .replace(/[̀-ͯ]/g, "")
            .replace(/\s+/g, "")
            .trim();
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i -= 1) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
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
    // js/router.js re-injects this file on a soft navigation) and waits for
    // it otherwise (a genuine hard load) - same reasoning as js/sprint.js.
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initLessonsPage, { once: true });
    } else {
        initLessonsPage();
    }
})();
