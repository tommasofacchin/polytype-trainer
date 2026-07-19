const PROFILE_KEY = "polytype-profile";
const LANGUAGE_KEY = "polytype-language";
const FALLBACK_LANGUAGE = "norwegian";
const maxKeys = 5; // keep in sync with MAX_KEYS in api/_lib.js
const keyPriceCoins = 100; // keep in sync with KEY_PRICE_COINS in api/_lib.js
const wordChestPriceCoins = 100; // keep in sync with WORD_CHEST_PRICE_COINS in api/_lib.js
const streakFreezePriceCoins = 200; // keep in sync with STREAK_FREEZE_PRICE_COINS in api/_lib.js
const maxStreakFreezes = 2; // keep in sync with MAX_STREAK_FREEZES in api/_lib.js

const COIN_SVG =
    '<svg viewBox="0 0 24 24" width="18" height="18"><circle cx="12" cy="12" r="10" fill="#ffc73a"/><circle cx="12" cy="12" r="6.5" fill="none" stroke="#d99a1c" stroke-width="2"/></svg>';

// Classic fantasy key (ring + shaft + teeth) - same shape as the Deck page's
// keys-held badge icon, for visual consistency between the two currencies.
const KEY_SVG =
    '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="7" cy="12" r="4.2" fill="color-mix(in srgb, currentColor 12%, transparent)"></circle><circle cx="7" cy="12" r="1.4"></circle><path d="M10.6 12h10"></path><path d="M17 12v3"></path><path d="M20 12v2.4"></path></svg>';

// Same chest shape as the daily-chest reward overlay (js/chest.js), shrunk
// to icon size for visual consistency between the two chest surfaces.
const CHEST_SVG =
    '<svg viewBox="0 0 48 48" width="18" height="18">' +
    '<rect x="6" y="20" width="36" height="20" rx="4" fill="#8b6cff"/>' +
    '<path d="M6 22a18 12 0 0 1 36 0z" fill="#a084ff"/>' +
    '<rect x="6" y="25" width="36" height="4" fill="#6b4dff"/>' +
    '<rect x="21" y="23" width="6" height="9" rx="2" fill="#ffc73a"/>' +
    "</svg>";

// Snowflake over the streak flame's colour - reads as "the fire, paused".
const FREEZE_SVG =
    '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#5bc8ff" stroke-width="1.8" stroke-linecap="round">' +
    '<path d="M12 2v20"></path><path d="M4 7l16 10"></path><path d="M20 7L4 17"></path>' +
    '<path d="M12 6l2.4-2.4M12 6L9.6 3.6"></path><path d="M12 18l2.4 2.4M12 18l-2.4 2.4"></path>' +
    "</svg>";

let activeLanguage = FALLBACK_LANGUAGE;
let activeDeckMeta = null;
let isSignedIn = false;
let authResolved = false;
let isBuying = false;
let isBuyingChest = false;
let isBuyingFreeze = false;

const el = {};

function tr(key, params = {}) {
    return window.PolytypeI18n?.t?.(key, params) || key;
}

function initShopPage() {
    el.coinIcon = document.getElementById("shop-coin-icon");
    el.coinLabel = document.getElementById("shop-coin-label");
    el.coinBalance = document.getElementById("shop-coin-balance");
    el.keyIcon = document.getElementById("shop-key-icon");
    el.keysHeldText = document.getElementById("shop-item-keys-held");
    el.buyBtn = document.getElementById("shop-buy-btn");
    el.keyStatus = document.getElementById("shop-key-status");
    el.chestIcon = document.getElementById("shop-chest-icon");
    el.chestMissingText = document.getElementById("shop-item-chest-missing");
    el.buyChestBtn = document.getElementById("shop-buy-chest-btn");
    el.chestStatus = document.getElementById("shop-chest-status");
    el.freezeIcon = document.getElementById("shop-freeze-icon");
    el.freezesHeldText = document.getElementById("shop-item-freezes-held");
    el.buyFreezeBtn = document.getElementById("shop-buy-freeze-btn");
    el.freezeStatus = document.getElementById("shop-freeze-status");

    if (el.coinIcon) el.coinIcon.innerHTML = COIN_SVG;
    if (el.keyIcon) el.keyIcon.innerHTML = KEY_SVG;
    if (el.chestIcon) el.chestIcon.innerHTML = CHEST_SVG;
    if (el.freezeIcon) el.freezeIcon.innerHTML = FREEZE_SVG;

    resolveActiveLanguage();
    setupBuyButton();
    setupBuyChestButton();
    setupBuyFreezeButton();
    setupAuthGate();

    // Delegated through js/router.js's shared hook slot instead of a direct
    // document-level listener - see js/main.js's identical comment for why.
    window.__polytypePageHooks = window.__polytypePageHooks || {};
    window.__polytypePageHooks.onLanguageChanged = renderShop;
    window.__polytypePageHooks.onProfileUpdated = renderShop;
    window.PolytypeGameState?.onChange?.(renderShop);
}

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

// The study-language switcher now lives only in the shared header
// (app-shell.js's flag menu, which reloads the page on change) - this page
// just needs to read whichever language that left in localStorage.
function resolveActiveLanguage() {
    const languages = getAvailableLanguages();
    const savedLanguage = localStorage.getItem(LANGUAGE_KEY);
    activeLanguage = languages.includes(savedLanguage) ? savedLanguage : (languages[0] || FALLBACK_LANGUAGE);
    activeDeckMeta = (window.DECK_INDEX || []).find(deck => deck.language === activeLanguage) || null;
    renderShop();
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

// Every course shares the same word-suffix numbering scheme (see
// VALID_WORD_SUFFIXES in api/_lib.js) - only the translations differ per
// language - so the total word count is the same across all languages.
function getTotalWordCount() {
    return getSortedCategories().reduce((sum, category) => sum + (category.size || 0), 0);
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
        return { courseKey: activeLanguage, xp: 0, unlockedCount: getStarterWordCount(), purchasedKeys: 0, coins: 0 };
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
        // Coins are per-course (this language's own balance) - see
        // api/_lib.js/start-course.js.
        coins: Math.max(0, Math.trunc(Number(course.coins) || 0)),
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
        showButtonSpinner(el.buyBtn);
        setStatus(el.keyStatus, "", "");

        // Captured and applied *after* the finally block below, since
        // renderShop() there unconditionally recomputes the status line
        // from current state - setting it before would just get it
        // overwritten before ever reaching the screen.
        let outcome = null;
        try {
            await window.PolytypeFirebase.buyKey(courseProgress.courseKey);
            outcome = { text: tr("shop.purchaseSuccess"), tone: "success" };
        } catch (error) {
            outcome = { text: error?.message || tr("shop.purchaseFailed"), tone: "error" };
            // The server rejected this against state we don't have locally
            // (e.g. stale cached coin balance or key count) - re-sync so
            // the shop reflects reality right away.
            await window.PolytypeFirebase.refreshProfile?.();
        } finally {
            isBuying = false;
            renderShop();
        }
        setStatus(el.keyStatus, outcome.text, outcome.tone);
    });
}

function setupBuyChestButton() {
    el.buyChestBtn?.addEventListener("click", async () => {
        if (isBuyingChest || !isSignedIn) return;

        const courseProgress = getCourseProgress();
        isBuyingChest = true;
        showButtonSpinner(el.buyChestBtn);
        setStatus(el.chestStatus, "", "");

        // Same reasoning as setupBuyButton above: apply after the finally
        // block's renderShop() call, not before, or it gets clobbered
        // before ever reaching the screen. Stays null for the word-reveal
        // case since the overlay itself is the success feedback there.
        let outcome = null;
        try {
            const result = await window.PolytypeFirebase.buyWordChest(courseProgress.courseKey);
            const word = await resolveUnlockedWord(result?.data?.unlockedWordSuffix);
            if (word) {
                await showWordChestReveal(word);
            } else {
                outcome = { text: tr("shop.chestPurchaseSuccess"), tone: "success" };
            }
        } catch (error) {
            outcome = { text: error?.message || tr("shop.purchaseFailed"), tone: "error" };
            // Same reasoning as setupBuyButton above - re-sync against the
            // server's real coin/unlocked-word count on rejection.
            await window.PolytypeFirebase.refreshProfile?.();
        } finally {
            isBuyingChest = false;
            renderShop();
        }
        if (outcome) setStatus(el.chestStatus, outcome.text, outcome.tone);
    });
}

function setupBuyFreezeButton() {
    el.buyFreezeBtn?.addEventListener("click", async () => {
        if (isBuyingFreeze || !isSignedIn) return;

        const courseProgress = getCourseProgress();
        isBuyingFreeze = true;
        showButtonSpinner(el.buyFreezeBtn);
        setStatus(el.freezeStatus, "", "");

        // Same apply-after-finally reasoning as setupBuyButton above.
        let outcome = null;
        try {
            await window.PolytypeFirebase.buyStreakFreeze(courseProgress.courseKey);
            outcome = { text: tr("shop.freezePurchaseSuccess"), tone: "success" };
        } catch (error) {
            outcome = { text: error?.message || tr("shop.purchaseFailed"), tone: "error" };
            await window.PolytypeFirebase.refreshProfile?.();
        } finally {
            isBuyingFreeze = false;
            renderShop();
        }
        setStatus(el.freezeStatus, outcome.text, outcome.tone);
    });
}

// Freezes are user-level, not per-course (see api/buy-streak-freeze.js), so
// unlike coins/keys this reads the profile root rather than the active course.
function getStreakFreezesHeld() {
    const profile = getStoredProfile();
    const held = Math.max(0, Math.trunc(Number(profile.streakFreezes) || 0));
    return Math.min(held, getMaxStreakFreezes());
}

function getMaxStreakFreezes() {
    const profile = getStoredProfile();
    return Math.max(1, Math.trunc(Number(profile.maxStreakFreezes) || maxStreakFreezes));
}

// ── Word chest reveal ───────────────────────────────────────────────────
// buy-word-chest.js only returns the unlocked word's numeric suffix, not
// its text - the shop page doesn't otherwise load vocab, so this fetches
// and parses the deck CSV (mirrors js/deck.js's own copy) lazily, once,
// the first time a chest is actually opened.
let vocabCache = null; // { language, words }

async function resolveUnlockedWord(wordSuffix) {
    if (wordSuffix == null) return null;
    const words = await loadVocabForActiveLanguage();
    return words.find(word => getWordSuffix(word.id) === wordSuffix) || null;
}

async function loadVocabForActiveLanguage() {
    if (vocabCache?.language === activeLanguage) return vocabCache.words;
    if (!activeDeckMeta) return [];

    try {
        const response = await fetch(activeDeckMeta.path);
        if (!response.ok) throw new Error("fetch failed");
        const words = parseDeckCsv(await response.text(), activeDeckMeta.columns);
        vocabCache = { language: activeLanguage, words };
        return words;
    } catch {
        return [];
    }
}

function parseDeckCsv(csvText, columns) {
    const rows = parseCsv(csvText.trim());
    const headers = (rows.shift() || []).map(h => h.trim());

    return rows
        .map((row, i) => {
            const record = {};
            headers.forEach((header, j) => { record[header] = (row[j] || "").trim(); });
            return {
                id: record[columns.wordId]?.trim() || `w-${i}`,
                script: record[columns.script] || "",
                romanization: record[columns.romanization] || "",
                meaning: record[columns.meaning] || record[columns.italianMeaning] || ""
            };
        })
        .filter(item => item.script && item.meaning);
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

function getWordSuffix(wordId) {
    const match = /(\d+)$/.exec(wordId || "");
    return match ? Number.parseInt(match[0], 10) : 0;
}

function languageHasHints() {
    return activeLanguage === "chinese" || activeLanguage === "japanese";
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

// Same chest-bursting-open treatment as the daily chest (js/chest.js), but
// revealing the actual word card that got unlocked instead of coin/XP
// reward chips.
function showWordChestReveal(word) {
    const overlay = document.createElement("div");
    overlay.className = "chest-overlay";
    overlay.innerHTML = `
        <div class="chest-overlay-art">
            <div class="chest-overlay-rays"></div>
            <div class="chest-overlay-flash"></div>
            <svg class="chest-overlay-icon" width="130" height="130" viewBox="0 0 48 48">
                <rect x="6" y="20" width="36" height="20" rx="4" fill="#8b6cff"/>
                <path d="M6 22a18 12 0 0 1 36 0z" fill="#a084ff"/>
                <rect x="6" y="25" width="36" height="4" fill="#6b4dff"/>
                <rect x="21" y="23" width="6" height="9" rx="2" fill="#ffc73a"/>
            </svg>
        </div>
        <div class="chest-overlay-title">${tr("shop.chestRevealTitle")}</div>
        <div class="word-reveal-card">
            <strong class="word-reveal-script">${escapeHtml(word.script)}</strong>
            ${languageHasHints() && word.romanization ? `<span class="word-reveal-roman">${escapeHtml(word.romanization)}</span>` : ""}
            <span class="word-reveal-meaning">${escapeHtml(word.meaning)}</span>
        </div>
        <button class="chest-collect-btn" type="button">${tr("shop.chestRevealCta")}</button>
    `;
    document.body.append(overlay);

    return new Promise(resolve => {
        overlay.querySelector(".chest-collect-btn").addEventListener("click", () => {
            overlay.remove();
            resolve();
        });
    });
}

// Key and chest are independent purchases (their own coin/availability
// gating, their own status line) so one being mid-purchase never blocks the
// other's row from re-rendering.
function renderShop() {
    // Coins are per-language (see api/_lib.js/start-course.js), so - unlike
    // the old single global balance - this reads straight from the active
    // course, same as keysHeld below, not from gamestate.
    const courseProgress = getCourseProgress();
    const coins = courseProgress.coins;
    if (el.coinLabel) el.coinLabel.textContent = tr("shop.yourCoinsForLanguage", { language: getLanguageLabel(activeLanguage) });
    if (el.coinBalance) el.coinBalance.textContent = String(coins);

    const keysHeld = getKeysHeld(courseProgress.purchasedKeys);
    const missingWords = Math.max(0, getTotalWordCount() - courseProgress.unlockedCount);

    if (el.keysHeldText) {
        el.keysHeldText.textContent = tr("shop.keysHeldForLanguage", {
            count: keysHeld,
            max: maxKeys,
            language: getLanguageLabel(activeLanguage)
        });
    }
    if (el.buyBtn) el.buyBtn.textContent = tr("shop.buyKey", { price: keyPriceCoins });

    if (el.chestMissingText) {
        el.chestMissingText.textContent = tr("shop.chestMissingWords", { count: missingWords });
    }
    if (el.buyChestBtn) el.buyChestBtn.textContent = tr("shop.buyChest", { price: wordChestPriceCoins });

    const freezesHeld = getStreakFreezesHeld();
    const freezeCap = getMaxStreakFreezes();
    if (el.freezesHeldText) {
        el.freezesHeldText.textContent = tr("shop.freezesHeld", { count: freezesHeld, max: freezeCap });
    }
    if (el.buyFreezeBtn) el.buyFreezeBtn.textContent = tr("shop.buyFreeze", { price: streakFreezePriceCoins });

    // Keep both buttons disabled and say nothing definitive until Firebase
    // has actually resolved signed-in vs signed-out - showing "sign in
    // required" during that brief unresolved window would flash it for
    // signed-in users too on every page load.
    if (!authResolved) {
        if (el.buyBtn) el.buyBtn.disabled = true;
        if (el.buyChestBtn) el.buyChestBtn.disabled = true;
        if (el.buyFreezeBtn) el.buyFreezeBtn.disabled = true;
        return;
    }

    if (!isSignedIn) {
        if (el.buyBtn) el.buyBtn.disabled = true;
        if (el.buyChestBtn) el.buyChestBtn.disabled = true;
        if (el.buyFreezeBtn) el.buyFreezeBtn.disabled = true;
        setStatus(el.keyStatus, tr("shop.signInRequired"), "");
        setStatus(el.chestStatus, tr("shop.signInRequired"), "");
        setStatus(el.freezeStatus, tr("shop.signInRequired"), "");
        return;
    }

    if (isBuying) {
        el.buyBtn.disabled = true;
    } else if (keysHeld >= maxKeys) {
        if (el.buyBtn) el.buyBtn.disabled = true;
        setStatus(el.keyStatus, tr("shop.keysFull"), "");
    } else if (coins < keyPriceCoins) {
        if (el.buyBtn) el.buyBtn.disabled = true;
        setStatus(el.keyStatus, tr("shop.insufficientCoins"), "");
    } else {
        if (el.buyBtn) el.buyBtn.disabled = false;
        setStatus(el.keyStatus, "", "");
    }

    if (isBuyingChest) {
        el.buyChestBtn.disabled = true;
    } else if (missingWords <= 0) {
        if (el.buyChestBtn) el.buyChestBtn.disabled = true;
        setStatus(el.chestStatus, tr("shop.chestNoWordsLeft"), "");
    } else if (coins < wordChestPriceCoins) {
        if (el.buyChestBtn) el.buyChestBtn.disabled = true;
        setStatus(el.chestStatus, tr("shop.insufficientCoins"), "");
    } else {
        if (el.buyChestBtn) el.buyChestBtn.disabled = false;
        setStatus(el.chestStatus, "", "");
    }

    if (isBuyingFreeze) {
        if (el.buyFreezeBtn) el.buyFreezeBtn.disabled = true;
    } else if (freezesHeld >= freezeCap) {
        if (el.buyFreezeBtn) el.buyFreezeBtn.disabled = true;
        setStatus(el.freezeStatus, tr("shop.freezesFull"), "");
    } else if (coins < streakFreezePriceCoins) {
        if (el.buyFreezeBtn) el.buyFreezeBtn.disabled = true;
        setStatus(el.freezeStatus, tr("shop.insufficientCoins"), "");
    } else {
        if (el.buyFreezeBtn) el.buyFreezeBtn.disabled = false;
        setStatus(el.freezeStatus, "", "");
    }
}

function setStatus(statusEl, text, tone) {
    if (!statusEl) return;
    statusEl.textContent = text;
    statusEl.dataset.tone = tone || "";
}

// Swaps the button's label for a spinner while a purchase is in flight,
// instead of a "Buying..." text status - the subsequent renderShop() call
// in the click handler's finally block unconditionally resets textContent,
// which naturally clears the spinner back to the normal label.
function showButtonSpinner(btn) {
    if (!btn) return;
    btn.disabled = true;
    btn.innerHTML = '<span class="btn-spinner" aria-hidden="true"></span>';
}

// Runs after every function/let/const above is defined - same reasoning as
// js/app-shell.js and js/main.js.
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initShopPage, { once: true });
} else {
    initShopPage();
}
