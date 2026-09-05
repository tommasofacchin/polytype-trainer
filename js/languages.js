const LANGUAGE_FLAGS = {
    chinese: "assets/flags/china.svg",
    german: "assets/flags/germany.svg",
    italian: "assets/flags/italy.svg",
    japanese: "assets/flags/japan.svg",
    norwegian: "assets/flags/norway.svg",
    spanish: "assets/flags/spain.svg",
    swedish: "assets/flags/sweden.svg"
};

function tr(key, params = {}) {
    return window.PolytypeI18n?.t?.(key, params) || key;
}

function goTo(path) {
    if (window.PolytypeRouter?.navigate) window.PolytypeRouter.navigate(path);
    else window.location.href = path;
}

function initLanguagesPage() {
    renderLanguages();
}

function getStoredProfile() {
    try {
        return JSON.parse(localStorage.getItem("polytype-profile")) || {};
    } catch {
        return {};
    }
}

function getLanguageLabel(language) {
    return window.PolytypeI18n?.languageLabel?.(language) || language;
}

function renderLanguages() {
    const list = document.getElementById("languages-list");
    if (!list) return;

    const decks = window.DECK_INDEX || [];
    const seen = new Set();
    const languages = decks.filter(deck => {
        if (seen.has(deck.language)) return false;
        seen.add(deck.language);
        return true;
    });

    const profile = getStoredProfile();
    const courses = profile.courses || {};
    const activeLanguage = localStorage.getItem("polytype-language") || "";

    list.replaceChildren(...languages.map(deck => buildLanguageCard(deck, courses, activeLanguage)));
}

function buildLanguageCard(deck, courses, activeLanguage) {
    const inProgress = Boolean(courses[deck.language]);
    const card = document.createElement("button");
    card.type = "button";
    card.className = "game-hub-card";
    card.style.cssText = "display:flex;align-items:center;gap:14px;text-align:left;width:100%;appearance:none;font:inherit;cursor:pointer";
    card.innerHTML = `
        <span class="app-shell-flag" style="width:40px;height:27px"><img src="${LANGUAGE_FLAGS[deck.language] || ""}" alt=""></span>
        <span style="flex:1">
            <strong style="display:block;font-weight:800;font-size:15px">${getLanguageLabel(deck.language)}</strong>
            <small style="display:block;font-size:11px;font-weight:600;color:${inProgress ? "var(--accent)" : "var(--text-faint)"}">${inProgress ? tr("languages.inProgress") : tr("languages.notStarted")}</small>
        </span>
        ${deck.language === activeLanguage ? `<span class="profile-stat-pill">${tr("languages.current")}</span>` : ""}
    `;
    card.addEventListener("click", async () => {
        // Not a bare localStorage write: goTo below is a *soft* navigation, so
        // nothing reloads the shell, and the topbar would keep flying the
        // previous course's flag (and its coin/key counts) on the page we land
        // on. setStudyLanguage writes the key and repaints the header with it.
        if (!window.PolytypeAppShell?.setStudyLanguage?.(deck.language)) {
            localStorage.setItem("polytype-language", deck.language);
        }

        // Signed-in players no longer get free starter words on their first
        // session in a language (see api/start-course.js) - a course needs
        // to exist, with either the tutorial's 500 gifted coins or 5 free
        // keys already in it, before Trainer/Memory/Dictate/Sprint have
        // anything to practice. Guests keep the old local fallback
        // (starter words granted automatically) untouched, so they still
        // land on Trainer directly.
        const firebaseClient = window.PolytypeFirebase;
        if (firebaseClient?.isSignedIn?.()) {
            card.disabled = true;
            try {
                await firebaseClient.startCourse(deck.language);
            } catch {
                // Best-effort - Deck still handles a missing/partial course.
            }
            goTo("deck.html");
            return;
        }

        goTo("trainer.html");
    });
    return card;
}

// Runs after every function/let/const above is defined - same reasoning as
// js/app-shell.js and js/main.js.
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initLanguagesPage, { once: true });
} else {
    initLanguagesPage();
}
