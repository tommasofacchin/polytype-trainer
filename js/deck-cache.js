// Shared deck-CSV cache.
//
// Every page that needs vocabulary (Deck, Sprint, Memory, Dictate, Shop) used
// to fetch and parse its language's CSV on its own, on every single visit -
// and since js/router.js re-runs page scripts on each soft navigation, module
// state didn't survive to help. The result was a visible empty-then-populated
// flash every time the Deck opened, even on the tenth visit.
//
// This lives on `window` precisely so it *does* survive those re-runs, keyed
// by deck path. A cache hit resolves on a promise that is already settled, so
// a revisit renders in the same frame instead of after a round trip.
(function () {
    if (window.PolytypeDeckCache) return;

    // path -> Promise<parsed rows>. The promise (not just the value) is what
    // in-flight callers share, so two racing on a cold cache trigger one
    // fetch rather than two.
    const cache = new Map();
    // path -> parsed rows, populated once the promise above settles. Kept
    // separately because `peek` has to answer *synchronously* - awaiting even
    // an already-settled promise defers to a microtask, and a caller that
    // renders on a microtask has already had its empty first pass committed.
    const settled = new Map();

    function load(meta) {
        if (!meta?.path) return Promise.resolve([]);

        const cached = cache.get(meta.path);
        if (cached) return cached;

        const pending = fetch(meta.path)
            .then(response => {
                if (!response.ok) throw new Error("deck fetch failed");
                return response.text();
            })
            .then(text => {
                const rows = parseDeckCsv(text, meta.columns);
                settled.set(meta.path, rows);
                return rows;
            })
            .catch(error => {
                // Don't cache failures: a transient network blip shouldn't
                // leave this language permanently empty for the session.
                cache.delete(meta.path);
                throw error;
            });

        cache.set(meta.path, pending);
        return pending;
    }

    // Synchronous hit-or-nothing accessor. Returns the parsed rows if this
    // deck has already finished loading in this tab, else null - letting a
    // caller render in the current frame on a revisit instead of after a
    // round trip (or even a microtask).
    function peek(meta) {
        if (!meta?.path) return null;
        return settled.get(meta.path) || null;
    }

    // Same as load(), minus the caller caring about the result or the error -
    // for warming the cache ahead of a page that will need it.
    function prefetch(meta) {
        load(meta).catch(() => {});
    }

    function parseDeckCsv(csvText, columns) {
        const rows = parseCsv(csvText.trim());
        const headers = (rows.shift() || []).map(header => header.trim());

        return rows
            .map((row, index) => {
                const record = {};
                headers.forEach((header, column) => {
                    record[header] = (row[column] || "").trim();
                });
                return {
                    id: record[columns.wordId]?.trim() || `w-${index}`,
                    script: record[columns.script] || "",
                    romanization: record[columns.romanization] || "",
                    meaning: record[columns.meaning] || record[columns.italianMeaning] || ""
                };
            })
            .filter(item => item.script && item.meaning);
    }

    // Lifted verbatim from the per-page copies it replaces - handles quoted
    // fields with embedded commas/newlines and "" escapes.
    function parseCsv(csvText) {
        const rows = [];
        let row = [];
        let field = "";
        let inQuotes = false;

        for (let i = 0; i < csvText.length; i += 1) {
            const char = csvText[i];

            if (inQuotes) {
                if (char === '"') {
                    if (csvText[i + 1] === '"') { field += '"'; i += 1; }
                    else inQuotes = false;
                } else {
                    field += char;
                }
                continue;
            }

            if (char === '"') { inQuotes = true; continue; }
            if (char === ",") { row.push(field); field = ""; continue; }
            if (char === "\n") { row.push(field); rows.push(row); row = []; field = ""; continue; }
            if (char === "\r") continue;
            field += char;
        }

        row.push(field);
        rows.push(row);
        return rows;
    }

    window.PolytypeDeckCache = { load, prefetch, peek };
})();
