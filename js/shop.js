const PROFILE_KEY = "polytype-profile";
const LANGUAGE_KEY = "polytype-language";
const FALLBACK_LANGUAGE = "norwegian";
const maxKeys = 5; // keep in sync with MAX_KEYS in api/_lib.js
const keyPriceCoins = 100; // keep in sync with KEY_PRICE_COINS in api/_lib.js

const LANGUAGE_FLAGS = {
    chinese: "assets/flags/china.svg",
    german: "assets/flags/germany.svg",
    italian: "assets/flags/italy.svg",
    japanese: "assets/flags/japan.svg",
    norwegian: "assets/flags/norway.svg",
    spanish: "assets/flags/spain.svg",
    swedish: "assets/flags/sweden.svg"
};

const COIN_SVG =
    '<svg viewBox="0 0 24 24" width="18" height="18"><circle cx="12" cy="12" r="10" fill="#ffc73a"/><circle cx="12" cy="12" r="6.5" fill="none" stroke="#d99a1c" stroke-width="2"/></svg>';

// Classic fantasy key (ring + shaft + teeth) - same shape as the Deck page's
// keys-held badge icon, for visual consistency between the two currencies.
const KEY_SVG =
    '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="7" cy="12" r="4.2" fill="color-mix(in srgb, currentColor 12%, transparent)"></circle><circle cx="7" cy="12" r="1.4"></circle><path d="M10.6 12h10"></path><path d="M17 12v3"></path><path d="M20 12v2.4"></path></svg>';

let activeLanguage = FALLBACK_LANGUAGE;
let activeDeckMeta = null;
let isSignedIn = false;
let authResolved = false;
let isBuying = false;

const el = {};

function tr(key, params = {}) {
    return window.PolytypeI18n?.t?.(key, params) || key;
}

document.addEventListener("DOMContentLoaded", () => {
    el.languageMenuToggle = document.getElementById("language-menu-toggle");
    el.languageMenu = document.getElementById("language-menu");
    el.currentLanguageFlag = document.getElementById("current-language-flag");
    el.coinIcon = document.getElementById("shop-coin-icon");
    el.coinBalance = document.getElementById("shop-coin-balance");
    el.keyIcon = document.getElementById("shop-key-icon");
    el.keysHeldText = document.getElementById("shop-item-keys-held");
    el.buyBtn = document.getElementById("shop-buy-btn");
    el.status = document.getElementById("shop-status");

    if (el.coinIcon) el.coinIcon.innerHTML = COIN_SVG;
    if (el.keyIcon) el.keyIcon.innerHTML = KEY_SVG;

    setupLanguageMenu();
    setupBuyButton();
    setupAuthGate();

    document.addEventListener("polytype-app-language-changed", renderShop);
    document.addEventListener("polytype-profile-updated", renderShop);
    window.PolytypeGameState?.onChange?.(renderShop);
});

function getAvailableLanguages() {
    const decks = window.DECK_INDEX || [];
    const seen = new Set();
    const languages = [];
    decks.forEach(deck => {
        if (seen.has(deck.language)) return;
        seen.add(deck.language);
        languages.push(deck.language);
    });
    return languages;
}

function setupLanguageMenu() {
    if (!el.languageMenuToggle || !el.languageMenu) return;

    const languages = getAvailableLanguages();
    const savedLanguage = localStorage.getItem(LANGUAGE_KEY);
    activeLanguage = languages.includes(savedLanguage) ? savedLanguage : (languages[0] || FALLBACK_LANGUAGE);
    activeDeckMeta = (window.DECK_INDEX || []).find(deck => deck.language === activeLanguage) || null;

    el.languageMenu.replaceChildren(
        ...languages.map(language => {
            const item = document.createElement("button");
            item.type = "button";
            item.className = "language-menu-item";
            item.setAttribute("role", "menuitemradio");
            item.innerHTML = `
                <img class="flag-mark" src="${LANGUAGE_FLAGS[language] || ""}" alt="">
                <span>${getLanguageLabel(language)}</span>
            `;
            item.addEventListener("click", () => {
                activeLanguage = language;
                activeDeckMeta = (window.DECK_INDEX || []).find(deck => deck.language === language) || null;
                localStorage.setItem(LANGUAGE_KEY, language);
                closeLanguageMenu();
                syncLanguageMenu();
                renderShop();
            });
            return item;
        })
    );

    syncLanguageMenu();
    renderShop();

    el.languageMenuToggle.addEventListener("click", () => {
        const isOpen = !el.languageMenu.hidden;
        el.languageMenu.hidden = isOpen;
        el.languageMenuToggle.setAttribute("aria-expanded", String(!isOpen));
    });

    document.addEventListener("click", event => {
        if (el.languageMenu.hidden) return;
        if (el.languageMenuToggle.contains(event.target) || el.languageMenu.contains(event.target)) return;
        closeLanguageMenu();
    });
}

function closeLanguageMenu() {
    if (!el.languageMenu) return;
    el.languageMenu.hidden = true;
    el.languageMenuToggle?.setAttribute("aria-expanded", "false");
}

function syncLanguageMenu() {
    if (el.currentLanguageFlag) el.currentLanguageFlag.src = LANGUAGE_FLAGS[activeLanguage] || "";

    const languages = getAvailableLanguages();
    el.languageMenu?.querySelectorAll(".language-menu-item").forEach((item, index) => {
        const isActive = languages[index] === activeLanguage;
        item.classList.toggle("is-active", isActive);
        item.setAttribute("aria-checked", String(isActive));
    });
}

function getLanguageLabel(language) {
    return window.PolytypeI18n?.languageLabel?.(language) || language;
}

function getStoredProfile() {
    try {
        return JSON.parse(localStorage.getItem(PROFILE_KEY)) || {};
    } catch {
        return {};
    }
}

function getSortedCategories() {
    return [...(window.POLYTYPE_CATEGORIES || [])].sort((a, b) => a.order - b.order);
}

function getStarterWordCount() {
    return Math.min(5, getSortedCategories()[0]?.size || 0);
}

// Legacy (pre-keys) unlock state was a contiguous prefix. Used only to
// migrate old local courses into a real unlocked-word count the first time
// they're touched under the new model.
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

// Mirrors getKeysHeld() in api/_lib.js.
function getKeysHeld(purchasedKeys) {
    return Math.max(0, Math.min(maxKeys, purchasedKeys || 0));
}

function getCourseProgress() {
    const profile = getStoredProfile();
    const courses = profile.courses || {};
    const course = courses[activeLanguage] || (activeDeckMeta?.id && courses[activeDeckMeta.id]);

    if (!course) {
        return { courseKey: activeLanguage, xp: 0, unlockedCount: getStarterWordCount(), purchasedKeys: 0 };
    }

    const unlockedCount = Array.isArray(course.unlockedWords)
        ? course.unlockedWords.length
        : getUnlockedWordSuffixesFromPrefix(
            Math.max(0, Math.trunc(Number(course.categoryIndex) || 0)),
            Math.max(0, Math.trunc(Number(course.categoryUnlocked) || 0))
        ).size;

    return {
        courseKey: course.courseId || activeLanguage,
        xp: Math.max(0, Number(course.xp) || 0),
        unlockedCount,
        purchasedKeys: Math.max(0, Math.trunc(Number(course.purchasedKeys) || 0))
    };
}

function setupAuthGate() {
    const firebaseClient = window.PolytypeFirebase;
    if (!firebaseClient) return;

    firebaseClient.onChange(authState => {
        // onChange fires synchronously with the *unresolved* state before
        // Firebase has even checked for a session - don't treat that as
        // "signed out" (it would flash the sign-in message on every load).
        // Only act once ready confirms signed-in vs signed-out for real.
        if (!authState.ready) return;
        authResolved = true;
        isSignedIn = Boolean(authState.user);
        renderShop();
    });
}

function setupBuyButton() {
    el.buyBtn?.addEventListener("click", async () => {
        if (isBuying || !isSignedIn) return;

        const courseProgress = getCourseProgress();
        isBuying = true;
        el.buyBtn.disabled = true;
        setStatus(tr("shop.buying"), "");

        try {
            await window.PolytypeFirebase.buyKey(courseProgress.courseKey);
            setStatus(tr("shop.purchaseSuccess"), "success");
        } catch (error) {
            setStatus(error?.message || tr("shop.purchaseFailed"), "error");
            // The server rejected this against state we don't have locally
            // (e.g. stale cached coin balance or key count) - re-sync so
            // the shop reflects reality right away.
            await window.PolytypeFirebase.refreshProfile?.();
        } finally {
            isBuying = false;
            renderShop();
        }
    });
}

function renderShop() {
    const gameState = window.PolytypeGameState?.state;
    const coins = gameState?.loaded ? Math.max(0, Number(gameState.coins) || 0) : 0;
    if (el.coinBalance) el.coinBalance.textContent = String(coins);

    const courseProgress = getCourseProgress();
    const keysHeld = getKeysHeld(courseProgress.purchasedKeys);

    if (el.keysHeldText) {
        el.keysHeldText.textContent = tr("shop.keysHeldForLanguage", {
            count: keysHeld,
            max: maxKeys,
            language: getLanguageLabel(activeLanguage)
        });
    }

    if (el.buyBtn) el.buyBtn.textContent = tr("shop.buyKey", { price: keyPriceCoins });

    if (isBuying) return;

    // Keep the button disabled and say nothing definitive until Firebase has
    // actually resolved signed-in vs signed-out - showing "sign in required"
    // during that brief unresolved window would flash it for signed-in
    // users too on every page load.
    if (!authResolved) {
        if (el.buyBtn) el.buyBtn.disabled = true;
        return;
    }

    if (!isSignedIn) {
        if (el.buyBtn) el.buyBtn.disabled = true;
        setStatus(tr("shop.signInRequired"), "");
        return;
    }

    if (keysHeld >= maxKeys) {
        if (el.buyBtn) el.buyBtn.disabled = true;
        setStatus(tr("shop.keysFull"), "");
    } else if (coins < keyPriceCoins) {
        if (el.buyBtn) el.buyBtn.disabled = true;
        setStatus(tr("shop.insufficientCoins"), "");
    } else {
        if (el.buyBtn) el.buyBtn.disabled = false;
        setStatus("", "");
    }
}

function setStatus(text, tone) {
    if (!el.status) return;
    el.status.textContent = text;
    el.status.dataset.tone = tone || "";
}
