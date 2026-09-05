// Which bits of a lesson have a recorded voice, and what object each one is
// stored under. Dual-export like decks/categories.js: scripts/generate-lesson-
// audio.cjs require()s it to decide what to send to ElevenLabs, js/lessons.js
// loads the same file in the browser to build the URL for a line it wants to
// play. One copy, so a clip can never be generated under a key the player
// never asks for.
//
// Keys are a hash of the spoken text, not a lesson id plus a position. Lesson
// files are hand-edited prose: inserting one example row near the top of a
// lesson would silently shift every position-keyed clip below it onto the
// wrong sentence, and nothing would look broken until someone listened. A
// content hash makes that impossible - editing a sentence just points it at a
// key nothing has generated yet (silent, and picked up by the next run),
// re-ordering changes nothing, and two lessons using the same sentence share
// one clip instead of paying for it twice.
//
// The hash is FNV-1a, 32-bit, hex. Not a security hash - it only has to be
// stable, short, and identical in Node and the browser, which rules out
// SubtleCrypto (async, and https-only).

(function () {
    "use strict";

    // Which field on an `{ type: "example" }` row carries the foreign-language
    // side. Mirrors buildExplanationBlock in js/lessons.js - keep the two in
    // step when a course is added.
    const TERM_FIELDS = ["no", "sv", "de", "it", "zh", "ja", "es", "term"];

    // Courses whose lesson text is written in Han characters. Everything in
    // here goes through the CJK cleaner below; everything else through the
    // Latin one.
    const HAN_COURSES = new Set(["chinese", "japanese"]);

    const HAN_CHAR = /[㐀-䶿一-鿿豈-﫿]/;
    const HAN_CHAR_G = /[㐀-䶿一-鿿豈-﫿]/g;
    // Sentence punctuation the lesson files use, in both the full-width forms
    // and the half-width ones they are just as often typed as. Normalised to
    // full width before the text is spoken, because that is what a Mandarin
    // voice phrases on.
    const CJK_PUNCT = { ",": "，", "?": "？", "!": "！", ";": "；", ":": "：", ".": "。" };
    // The same marks already written full width - kept as they are.
    const CJK_PUNCT_KEEP = new Set(["，", "？", "！", "；", "：", "。", "、"]);

    function fnv1a(text) {
        let hash = 0x811c9dc5;
        for (let i = 0; i < text.length; i += 1) {
            hash ^= text.charCodeAt(i);
            // The classic 16777619 multiply, done in 32-bit pieces because a
            // plain `hash * 16777619` loses the low bits past 2^53.
            hash = (hash + ((hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24))) >>> 0;
        }
        return hash.toString(16).padStart(8, "0");
    }

    // The object key a line's clip lives under, within its course's folder.
    // Takes the *spoken* text, so two rows that print differently but are read
    // the same ("你好" and "你好 (nǐ hǎo)") collapse onto one clip.
    function audioKey(spoken) {
        return fnv1a(spoken);
    }

    // Strips a lesson row down to what should actually be read aloud, or
    // returns "" for a row that is really English and must stay silent.
    //
    // Han courses print the term with its romanisation in brackets - "你好
    // (nǐ hǎo)", "add 们 (men)", "我 → 我们 (wǒ → wǒmen)" - so the
    // cleaning works by subtraction: drop the bracketed gloss, drop the arrows
    // and ellipses that pair two forms on one row, drop whatever Latin is left
    // over. What survives is the Chinese and its punctuation.
    //
    // Subtraction rather than pulling out runs of Han characters, which is the
    // obvious move and is wrong: these files punctuate with half-width ASCII as
    // often as full-width, so "我喜欢茶,但是他喜欢咖啡。" would come back as two
    // separate runs and be spoken as two disconnected fragments.
    function spokenText(courseId, raw) {
        const text = String(raw == null ? "" : raw).trim();
        if (!text) return "";

        if (HAN_COURSES.has(courseId)) {
            const stripped = text
                .replace(/[(（][^)）]*[)）]/g, " ")
                // "A / B" and "A → B" both pair two forms the player should
                // hear as two, so they become a pause; the bare ellipsis in a
                // frame like "因为...所以..." is just a blank and drops out.
                .replace(/\s*[\/→–—]\s*/g, "，")
                .replace(/\.{2,}|…/g, " ")
                .replace(/[A-Za-zÀ-ɏ]+/g, " ");

            let out = "";
            for (const char of stripped) {
                if (HAN_CHAR.test(char)) out += char;
                else if (CJK_PUNCT[char]) out += CJK_PUNCT[char];
                else if (CJK_PUNCT_KEEP.has(char)) out += char;
                else if (out && !out.endsWith("，")) out += "，"; // a gap between forms
            }

            return tidyCjk(out);
        }

        // Latin courses print the term on its own, so the only cleaning needed
        // is dropping a parenthesised gloss - "han / hun (he / she)" - and the
        // slash form that pairs two words on one row, which reads as a list
        // rather than a sentence. The slash is spoken as a pause instead.
        return text
            .replace(/\s*[(（][^)）]*[)）]\s*/g, " ")
            .replace(/\s*[\/→]\s*/g, ", ")
            .replace(/\.{2,}|…/g, " ")
            .replace(/\s+/g, " ")
            .replace(/\s+([,.!?;:])/g, "$1")
            // A row pairing two whole sentences ("Du er glad. → Er du glad?")
            // has just had the arrow turned into a comma, leaving ".," - the
            // full stop is already the pause, so drop the comma after it.
            .replace(/([.!?;:]),/g, "$1")
            .replace(/,{2,}/g, ",")
            .replace(/^[,\s]+|[,\s]+$/g, "")
            .trim();
    }

    function trimEdgePunctuation(text) {
        return text.replace(/^[，、。？！；：\s]+|[，、。？！；：\s]+$/g, "");
    }

    // Collapses the pauses the loop above inserts between forms: repeated
    // separators, a separator butting up against real punctuation, and any
    // left dangling at either end.
    function tidyCjk(text) {
        return text
            .replace(/，{2,}/g, "，")
            .replace(/([。？！；：、])，/g, "$1")
            .replace(/，([。？！；：、])/g, "$1")
            .replace(/^[，、\s]+|[，、\s]+$/g, "")
            .trim();
    }

    // Does this string carry the course's language at all? For a Han course
    // that is decidable from the script alone. For a Latin one it is not, so
    // the caller has to supply a vocabulary to check against - see
    // js/lessons.js and the generator, which both build it from the course's
    // own example rows plus its deck CSV.
    function looksForeign(courseId, text, vocabulary) {
        const spoken = spokenText(courseId, text);
        if (!spoken) return false;
        if (HAN_COURSES.has(courseId)) return HAN_CHAR.test(spoken);
        if (!vocabulary || !vocabulary.size) return false;

        const words = spoken.toLowerCase().replace(/[.,!?;:]/g, "").split(/\s+/).filter(Boolean);
        // Capped because a long option is an English explanation ("Right after
        // the finite verb"), never a vocabulary item, and a stray coincidence
        // on one of its words must not be enough to have it read out in a
        // Norwegian accent.
        if (!words.length || words.length > 4) return false;
        return words.every(word => vocabulary.has(word));
    }

    // The example rows in a lesson's explanation, which is where a course's
    // actual sentences live.
    function exampleTexts(courseId, lesson) {
        const out = [];
        for (const row of lesson.explanation || []) {
            if (row.type !== "example") continue;
            const field = TERM_FIELDS.find(name => row[name] != null);
            const spoken = spokenText(courseId, field ? row[field] : "");
            if (spoken) out.push(spoken);
        }
        return out;
    }

    // Every word a course's own lessons treat as foreign, used as the
    // vocabulary for looksForeign above on Latin-script courses. Deliberately
    // built from the lessons themselves rather than the deck CSV: a lesson can
    // teach a word the A1 deck never lists, and this way the generator and the
    // browser derive the same set from the same file with no extra fetch.
    function buildVocabulary(courseId, lessons) {
        const vocabulary = new Set();
        if (HAN_COURSES.has(courseId)) return vocabulary;

        for (const lesson of lessons || []) {
            for (const spoken of exampleTexts(courseId, lesson)) {
                vocabulary.add(spoken.toLowerCase().replace(/[.,!?;:]/g, ""));
                spoken.toLowerCase().split(/\s+/).forEach(word => {
                    const bare = word.replace(/[.,!?;:]/g, "");
                    if (bare) vocabulary.add(bare);
                });
            }
            for (const exercise of lesson.exercises || []) {
                // A `type` answer is the course's language by construction -
                // it is what the player is asked to spell.
                if (exercise.type !== "type") continue;
                const answer = String(exercise.answer || "").toLowerCase().trim();
                if (answer) vocabulary.add(answer);
                answer.split(/\s+/).forEach(word => { if (word) vocabulary.add(word); });
            }
        }

        return vocabulary;
    }

    // What an exercise should say out loud once it has been answered - the
    // correct answer, in the course's language, or "" for the many exercises
    // that are asking about grammar in English and have nothing to pronounce.
    //
    // `type` on a Han course is the one case the answer itself cannot be used:
    // it is the romanisation ("nǐ hǎo"), which a Chinese voice would read as
    // gibberish. The characters are in the prompt instead ("Type the pinyin
    // for 是 (to be)."), which is what a player would want to hear anyway.
    function exerciseSpokenText(courseId, exercise, vocabulary) {
        if (!exercise) return "";
        // Opt-out for an exercise whose correct answer is deliberately bad
        // language - "Which of these is the odd one out?" answered by "ei bil".
        // Reading that one out would teach the error it exists to catch, and
        // nothing in the shape of the data says so, so the lesson file says it.
        if (exercise.mute) return "";

        if (exercise.type === "type") {
            // The prompt here is an English sentence with the term embedded in
            // it, so its own full stop survives the Han filter as "。" and would
            // key this line separately from the identical term taught in a
            // lesson row. Trailing punctuation goes.
            if (HAN_COURSES.has(courseId)) return trimEdgePunctuation(spokenText(courseId, exercise.prompt));
            return spokenText(courseId, exercise.answer);
        }

        if (exercise.type === "mc") {
            const option = (exercise.options || [])[exercise.answer];
            if (!looksForeign(courseId, option, vocabulary)) return "";
            return spokenText(courseId, option);
        }

        // trueFalse claims are English sentences about the language, so there
        // is nothing to read - the claim quotes the foreign phrase mid-sentence
        // and reading either the whole claim or the fragment would be odd.
        return "";
    }

    // Everything in one course that needs a clip, deduplicated by key. The
    // generator walks this; js/lessons.js only ever asks for one key at a time.
    function collectCourse(courseId, lessons) {
        const vocabulary = buildVocabulary(courseId, lessons);
        const byKey = new Map();

        const add = (spoken, source) => {
            if (!spoken) return;
            const key = audioKey(spoken);
            if (byKey.has(key)) return;
            byKey.set(key, { key, text: spoken, source });
        };

        for (const lesson of lessons || []) {
            exampleTexts(courseId, lesson).forEach(spoken => add(spoken, `${lesson.id} example`));
            for (const exercise of lesson.exercises || []) {
                add(exerciseSpokenText(courseId, exercise, vocabulary), `${lesson.id} ${exercise.type}`);
            }
        }

        return { vocabulary, items: Array.from(byKey.values()) };
    }

    const api = {
        audioKey,
        spokenText,
        looksForeign,
        exampleTexts,
        buildVocabulary,
        exerciseSpokenText,
        collectCourse
    };

    if (typeof window !== "undefined") window.PolytypeLessonAudio = api;
    if (typeof module !== "undefined" && module.exports) module.exports = api;
})();
