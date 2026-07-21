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

    const LOCK_SVG = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>';
    const CHECK_SVG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13l4 4L19 7"/></svg>';

    const state = {
        lessons: [],            // flat, in unlock order
        modules: [],             // [{ id, title, lessons: [...] }]
        lessonsCompleted: [],
        activeLesson: null,
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
        el.modulesRoot = document.getElementById("lessons-modules");
        el.playerView = document.getElementById("lessons-player-view");
        el.backBtn = document.getElementById("lessons-back-btn");

        el.explanationScreen = document.getElementById("lessons-explanation-screen");
        el.explanationKicker = document.getElementById("lessons-explanation-kicker");
        el.explanationTitle = document.getElementById("lessons-explanation-title");
        el.explanationBody = document.getElementById("lessons-explanation-body");
        el.startBtn = document.getElementById("lessons-start-btn");

        el.exerciseScreen = document.getElementById("lessons-exercise-screen");
        el.reviewBanner = document.getElementById("lessons-review-banner");
        el.exerciseProgress = document.getElementById("lessons-exercise-progress");
        el.exerciseRoot = document.getElementById("lessons-exercise-root");

        el.completeScreen = document.getElementById("lessons-complete-screen");
        el.completeTitle = document.getElementById("lessons-complete-title");
        el.completeCoins = document.getElementById("lessons-complete-coins");
        el.completeStatus = document.getElementById("lessons-complete-status");
        el.continueBtn = document.getElementById("lessons-continue-btn");

        el.backBtn.addEventListener("click", showPathView);
        el.startBtn.addEventListener("click", startExercises);
        el.continueBtn.addEventListener("click", showPathView);

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
        state.lessonsCompleted = getLessonsCompleted();
        renderPath();
        el.playerView.hidden = true;
        el.pathView.hidden = false;
    }

    function renderPath() {
        if (!el.modulesRoot) return;
        el.modulesRoot.replaceChildren(...state.modules.map(buildModuleSection));
    }

    function buildModuleSection(module) {
        const completedInModule = module.lessons.filter(lesson => state.lessonsCompleted.includes(lesson.id)).length;

        const section = document.createElement("section");
        section.className = "lessons-module";

        const head = document.createElement("div");
        head.className = "lessons-module-head";
        const title = document.createElement("strong");
        title.textContent = module.title;
        const progress = document.createElement("span");
        progress.className = "lessons-module-progress";
        progress.textContent = tr("lessons.moduleProgress", { done: completedInModule, total: module.lessons.length });
        head.append(title, progress);

        const list = document.createElement("div");
        list.className = "lessons-module-list";
        list.append(...module.lessons.map(buildLessonNode));

        section.append(head, list);
        return section;
    }

    function buildLessonNode(lesson) {
        const globalIndex = state.lessons.indexOf(lesson);
        const isComplete = state.lessonsCompleted.includes(lesson.id);
        const isUnlocked = isComplete || globalIndex <= state.lessonsCompleted.length;

        const node = document.createElement("button");
        node.type = "button";
        node.className = "category-card lesson-node";
        node.classList.add(isComplete ? "is-complete" : (isUnlocked ? "is-active" : "is-locked"));
        node.disabled = !isUnlocked;

        const head = document.createElement("div");
        head.className = "category-card-head";

        const badge = document.createElement("span");
        badge.className = "category-card-badge";
        badge.innerHTML = isComplete ? CHECK_SVG : (isUnlocked ? String(globalIndex + 1) : LOCK_SVG);

        const copy = document.createElement("span");
        copy.className = "category-card-copy";
        const titleEl = document.createElement("strong");
        titleEl.textContent = lesson.title;
        copy.appendChild(titleEl);
        if (!isUnlocked) {
            const hint = document.createElement("span");
            hint.className = "category-card-meta";
            hint.textContent = tr("lessons.lockedHint");
            copy.appendChild(hint);
        }

        head.append(badge, copy);
        node.appendChild(head);
        if (isUnlocked) node.addEventListener("click", () => openLesson(lesson));
        return node;
    }

    // ── Player: explanation screen ──────────────────────────────────────────

    function openLesson(lesson) {
        state.activeLesson = lesson;
        el.pathView.hidden = true;
        el.playerView.hidden = false;
        showExplanationScreen();
    }

    function showExplanationScreen() {
        const lesson = state.activeLesson;
        el.explanationKicker.textContent = lesson.moduleTitle;
        el.explanationTitle.textContent = lesson.title;
        el.explanationBody.replaceChildren(...lesson.explanation.map(buildExplanationBlock));

        el.completeScreen.hidden = true;
        el.exerciseScreen.hidden = true;
        el.explanationScreen.hidden = false;
    }

    function buildExplanationBlock(block) {
        if (block.type === "example") {
            const row = document.createElement("div");
            row.className = "lessons-example-row";
            const term = document.createElement("strong");
            // Foreign-language term: keyed per course in the data files
            // (`no` for Norwegian, `sv` for Swedish, `de` for German, `it` for
            // Italian, `zh` for Chinese); `term` is a generic fallback for any
            // future language.
            term.textContent = block.no ?? block.sv ?? block.de ?? block.it ?? block.zh ?? block.term ?? "";
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
        state.mainIndex = 0;
        state.wrongList = [];
        state.wrongAttempts = 0;
        state.sessionStartTime = Date.now();
        el.explanationScreen.hidden = true;
        el.reviewBanner.hidden = true;
        el.exerciseScreen.hidden = false;
        showNextMainExercise();
    }

    function showNextMainExercise() {
        const lesson = state.activeLesson;
        if (state.mainIndex >= lesson.exercises.length) {
            if (state.wrongList.length) startRetryPhase();
            else finishLesson();
            return;
        }

        el.exerciseProgress.textContent = `${state.mainIndex + 1} / ${lesson.exercises.length}`;
        const exercise = lesson.exercises[state.mainIndex];
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
            finishLesson();
            return;
        }

        el.exerciseProgress.textContent = `${state.retryDoneCount} / ${state.retryTotal}`;
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
        el.exerciseRoot.innerHTML = `
            <div class="sprint-exercise">
                <p class="sprint-exercise-kicker">${escapeHtml(exercise.prompt)}</p>
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

    async function finishLesson() {
        const lesson = state.activeLesson;
        el.exerciseScreen.hidden = true;
        el.reviewBanner.hidden = true;
        el.completeScreen.hidden = false;
        clearRevealed(el.completeCoins);
        clearRevealed(el.completeStatus);
        el.completeTitle.textContent = tr("lessons.completeTitle");
        el.continueBtn.disabled = true;

        const sessionSeconds = Math.round((Date.now() - state.sessionStartTime) / 1000);
        const payload = {
            courseId: COURSE_ID,
            gameType: "lesson",
            lessonId: lesson.id,
            correctAnswers: lesson.exercises.length,
            wrongAnswers: state.wrongAttempts,
            bestCombo: 0,
            wordsUsed: lesson.exercises.length,
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

            if (progress?.newLessonCompletion) {
                if (progress.lessonCoinsAwarded > 0) {
                    revealText(el.completeCoins, tr("lessons.coinsEarned", { count: progress.lessonCoinsAwarded }));
                }
            } else {
                el.completeTitle.textContent = tr("lessons.replayTitle");
            }

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
    // js/sprint.js's animateStreakPop).
    function revealText(target, text) {
        target.classList.remove("is-revealed");
        target.textContent = text;
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
