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

document.addEventListener("DOMContentLoaded", () => {
    renderLanguages();
});

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
    card.addEventListener("click", () => {
        localStorage.setItem("polytype-language", deck.language);
        window.location.href = "trainer.html";
    });
    return card;
}
