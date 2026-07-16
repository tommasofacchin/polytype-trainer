// Custom on-screen keyboard for every typed-answer exercise, shown instead
// of the device's native keyboard - one consistent layout/behavior across
// languages and devices, rather than whatever the OS/browser happens to
// render. Shared shell script (see js/router.js's comment at the top):
// loaded once on the first hard page load and never re-injected, so its
// document-level listeners below are added exactly once for the life of
// the tab - page scripts opt in per the two modes below instead of each
// wiring their own instance.
(function () {
    "use strict";

    const LANGUAGE_KEY = "polytype-language";

    // Characters that actually appear in this app's decks beyond plain a-z
    // (see decks/*.csv), offered as an extra row so learners can type
    // accented answers without hunting for them - not that they strictly
    // need to: every exercise's normalizeString() strips diacritics before
    // comparing, so this is a convenience, not a correctness requirement.
    // Chinese/Japanese answers are typed in Latin-script romanization/pinyin
    // (see js/sprint.js's languageHasRomanization), so the plain letter rows
    // already cover them - no extra row needed.
    const EXTRA_CHARS = {
        norwegian: ["æ", "ø", "å"],
        german: ["ä", "ö", "ü", "ß"],
        italian: ["à", "è", "é", "ì", "ù"],
        spanish: ["á", "é", "í", "ñ", "ó", "ú"],
        swedish: ["ä", "å", "ö"]
    };

    const LETTER_ROWS = [
        ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
        ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
        ["z", "x", "c", "v", "b", "n", "m"]
    ];

    let root = null;
    let activeInput = null; // real <input>/<textarea> mode
    let activeCallbacks = null; // { onKey, onBackspace, onEnter } mode

    function escapeHtml(value) {
        return String(value).replace(/[&<>"']/g, ch => ({
            "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
        }[ch]));
    }

    function keyButton(label, key, extraClass) {
        return `<button type="button" class="vkbd-key ${extraClass || ""}" data-vkbd-key="${escapeHtml(key)}">${escapeHtml(label)}</button>`;
    }

    function render() {
        const extra = EXTRA_CHARS[localStorage.getItem(LANGUAGE_KEY)] || [];
        root.innerHTML = `
            ${extra.length ? `<div class="vkbd-row vkbd-row-extra">${extra.map(ch => keyButton(ch, ch)).join("")}</div>` : ""}
            <div class="vkbd-row">${LETTER_ROWS[0].map(ch => keyButton(ch, ch)).join("")}</div>
            <div class="vkbd-row">${LETTER_ROWS[1].map(ch => keyButton(ch, ch)).join("")}</div>
            <div class="vkbd-row">
                ${keyButton("⌫", "backspace", "vkbd-key-wide")}
                ${LETTER_ROWS[2].map(ch => keyButton(ch, ch)).join("")}
                ${keyButton("⏎", "enter", "vkbd-key-wide vkbd-key-enter")}
            </div>
            <div class="vkbd-row">${keyButton("space", "space", "vkbd-key-space")}</div>
        `;

        root.querySelectorAll("[data-vkbd-key]").forEach(btn => {
            // pointerdown, not click: preventDefault() here is what stops
            // the browser from blurring the currently focused input before
            // the tap registers - without it, every key tap would first
            // fire focusout (hiding the keyboard and clearing activeInput)
            // before the click event this key relies on ever runs.
            btn.addEventListener("pointerdown", event => {
                event.preventDefault();
                handleKey(btn.dataset.vkbdKey);
            });
        });
    }

    function handleKey(key) {
        if (key === "backspace") { deleteBackward(); return; }
        if (key === "enter") { submitCurrent(); return; }
        if (key === "space") { insertText(" "); return; }
        insertText(key);
    }

    function insertText(char) {
        if (activeInput) {
            const start = activeInput.selectionStart ?? activeInput.value.length;
            const end = activeInput.selectionEnd ?? activeInput.value.length;
            activeInput.value = activeInput.value.slice(0, start) + char + activeInput.value.slice(end);
            const pos = start + char.length;
            activeInput.setSelectionRange(pos, pos);
            activeInput.dispatchEvent(new Event("input", { bubbles: true }));
        } else {
            activeCallbacks?.onKey?.(char);
        }
    }

    function deleteBackward() {
        if (activeInput) {
            const start = activeInput.selectionStart ?? activeInput.value.length;
            const end = activeInput.selectionEnd ?? activeInput.value.length;
            if (start === end) {
                if (start === 0) return;
                activeInput.value = activeInput.value.slice(0, start - 1) + activeInput.value.slice(end);
                activeInput.setSelectionRange(start - 1, start - 1);
            } else {
                activeInput.value = activeInput.value.slice(0, start) + activeInput.value.slice(end);
                activeInput.setSelectionRange(start, start);
            }
            activeInput.dispatchEvent(new Event("input", { bubbles: true }));
        } else {
            activeCallbacks?.onBackspace?.();
        }
    }

    function submitCurrent() {
        if (activeInput) {
            // Mirrors what a real Enter keypress would trigger: native
            // form submission for sprint.js's form-wrapped input, or a
            // dispatched keydown for main.js's per-row inputs, whose
            // listener just checks event.key - see js/main.js's
            // isSubmitKey and js/sprint.js's form "submit" listener.
            const form = activeInput.closest("form");
            if (form) { form.requestSubmit(); return; }
            activeInput.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true, cancelable: true }));
        } else {
            activeCallbacks?.onEnter?.();
        }
    }

    function show() {
        render();
        root.hidden = false;
    }

    function hide() {
        if (root) root.hidden = true;
        activeInput = null;
        activeCallbacks = null;
    }

    // ── Input-element mode ──────────────────────────────────────────────
    // Any input opting in with data-vkbd="true" (js/main.js's per-row
    // inputs, js/sprint.js's type-round input) is picked up here with no
    // page script needing to call an attach API - focus moving between
    // many such inputs over a session (main.js spawns a fresh one per row)
    // just works, since each focus re-fires this listener.
    document.addEventListener("focusin", event => {
        if (event.target?.dataset?.vkbd !== "true") return;
        activeCallbacks = null;
        activeInput = event.target;
        show();
    });

    document.addEventListener("focusout", event => {
        if (event.target !== activeInput) return;
        // A key tap's pointerdown already preventDefault()-ed the blur that
        // would otherwise cause, so reaching here means focus genuinely
        // left the input for something else - treat that as "done typing".
        hide();
    });

    // ── Callback mode ────────────────────────────────────────────────────
    // For exercises with no real input to focus (js/dictate.js captures a
    // physical keyboard's keydown globally instead) - taps get routed
    // through the same callbacks a keydown handler would otherwise call.
    function attachCallbacks(callbacks) {
        activeInput = null;
        activeCallbacks = callbacks;
        show();
    }

    window.PolytypeKeyboard = { attachCallbacks, hide };

    root = document.createElement("div");
    root.id = "polytype-vkbd";
    root.className = "vkbd";
    root.hidden = true;
    document.body.appendChild(root);

    // Re-render (extra-char row) on the fly when the study language changes
    // while the keyboard is already showing, instead of stopping short one
    // step behind the input it's serving.
    document.addEventListener("polytype-app-language-changed", () => {
        if (!root.hidden) render();
    });
})();
