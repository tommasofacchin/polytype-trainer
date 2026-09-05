// Norwegian "Lectures" curriculum: a fixed, hand-authored sequence of short
// grammar/vocab lessons (explanation + exercises), separate from the
// vocabulary-drill decks in decks/*.csv. Unlike those CSV decks (thematic
// word groups), lessons are grammatical/functional topics that don't line up
// with a single vocab category, so each lesson's example words/sentences are
// authored inline here instead of being pulled from decks/norwegian_a1.csv.
//
// Dual-export like decks/categories.js: a <script> tag exposes the browser
// global, api/_lib.js requires() the same file server-side for lesson-id
// validation, so there is exactly one place this data can drift.
//
// Lesson order in the array IS the unlock order - a lesson at array index i
// is playable once profile.courses[courseId].lessonsCompleted.length >= i
// (see js/lessons.js). id values must stay stable and never be reordered or
// reused once a lesson has shipped, since they're stored (as completed) in
// player profiles.
//
// Exercise types (rendered by js/lessons.js):
//   { type: "mc", prompt, options: [...], answer: <index> }
//   { type: "trueFalse", claim, answer: <bool> }
//   { type: "type", prompt, answer: "<canonical>", accept: ["<alt spellings>"],
//     hint: "<dictionary form>" } - hint is optional: the base/infinitive
//     form of whatever the blank inflects, shown next to the question so a
//     blank testing conjugation/agreement doesn't also demand recalling the
//     word itself out of context (e.g. in a Review run mixing it in from a
//     lesson finished long ago). Only added where the blank is inflected
//     from a distinct base form - not for invariant words (pronouns,
//     conjunctions, particles) where the answer already is the citation form.
//
// Any exercise may carry `mute: true`, which keeps js/lessons.js from reading
// its correct answer aloud. Only needed where that answer is deliberately bad
// language (a "spot the wrong form" question) - see decks/lesson-audio.js,
// which decides what every other exercise pronounces.

const LESSONS_DATA = {
    norwegian: [
        {
            id: "nor-01",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "Alphabet, Sounds & Stress",
            explanation: [
                { type: "p", text: "Norwegian uses the same 26 letters as English, plus three extra vowels at the end of the alphabet: æ, ø, and å. They aren't optional extras - they're regular letters with their own sounds." },
                { type: "p", text: "æ sounds like the 'a' in 'cat'. ø sounds like the 'i' in 'bird' (similar to German ö or French eu). å sounds like the 'o' in 'more'." },
                { type: "example", no: "hei", en: "hi" },
                { type: "example", no: "takk", en: "thanks" },
                { type: "p", text: "Stress almost always falls on the first syllable of a word, and most Norwegian words are pronounced very close to how they're spelled." },
                { type: "example", no: "søster", en: "sister" },
                { type: "example", no: "bær", en: "berry" },
                { type: "example", no: "år", en: "year" }
            ],
            exercises: [
                { type: "mc", prompt: "Which letter is NOT one of Norwegian's three extra vowels?", options: ["æ", "ø", "å", "ü"], answer: 3 },
                { type: "trueFalse", claim: "The Norwegian letter 'å' sounds like the 'o' in 'more'.", answer: true },
                { type: "mc", prompt: "Where does stress usually fall in a Norwegian word?", options: ["On the last syllable", "On the first syllable", "It's random", "Norwegian words aren't stressed"], answer: 1 },
                { type: "type", prompt: "Type the Norwegian word for 'hi'.", answer: "hei", accept: ["hei"] },
                { type: "trueFalse", claim: "'ø' sounds similar to the German 'ö'.", answer: true },
                { type: "mc", prompt: "Which word means 'thanks'?", options: ["hei", "takk", "ja", "nei"], answer: 1 }
            ]
        },
        {
            id: "nor-02",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "Subject Pronouns",
            explanation: [
                { type: "p", text: "Subject pronouns are the 'doer' of a sentence - the one performing the action." },
                { type: "example", no: "jeg", en: "I" },
                { type: "example", no: "du", en: "you (singular)" },
                { type: "example", no: "han / hun", en: "he / she" },
                { type: "example", no: "den / det", en: "it (den for en-/ei-words, det for et-words)" },
                { type: "example", no: "vi", en: "we" },
                { type: "example", no: "dere", en: "you (plural)" },
                { type: "example", no: "de", en: "they" },
                { type: "p", text: "Norwegian verbs don't change to match the pronoun the way English 'am/is/are' does - you'll see just how simple that is in the next couple of lessons." }
            ],
            exercises: [
                { type: "mc", prompt: "Which pronoun means 'I'?", options: ["du", "jeg", "vi", "de"], answer: 1 },
                { type: "mc", prompt: "Which pronoun means 'they'?", options: ["de", "dere", "den", "det"], answer: 0 },
                { type: "trueFalse", claim: "'du' means 'you' (singular).", answer: true },
                { type: "type", prompt: "Type the Norwegian word for 'we'.", answer: "vi", accept: ["vi"] },
                { type: "mc", prompt: "Which pronoun would you use for a neuter (et-) word standing in for 'it'?", options: ["den", "det", "han", "hun"], answer: 1 },
                { type: "trueFalse", claim: "'dere' means 'you' when speaking to more than one person.", answer: true }
            ]
        },
        {
            id: "nor-03",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "Object Pronouns",
            explanation: [
                { type: "p", text: "Object pronouns are used when the pronoun receives the action - for example, after a verb." },
                { type: "example", no: "meg", en: "me" },
                { type: "example", no: "deg", en: "you (singular, object)" },
                { type: "example", no: "ham / henne", en: "him / her" },
                { type: "example", no: "oss", en: "us" },
                { type: "example", no: "dem", en: "them" },
                { type: "p", text: "Note that 'dere' (you plural) and 'den/det' (it) stay exactly the same in both subject and object form." },
                { type: "example", no: "Jeg ser deg.", en: "I see you." },
                { type: "example", no: "Hun kjenner meg.", en: "She knows me." }
            ],
            exercises: [
                { type: "mc", prompt: "Which is the object form of 'jeg' (I)?", options: ["meg", "deg", "oss", "dem"], answer: 0 },
                { type: "mc", prompt: "'Jeg ser ___.' (I see her.) Which word fits?", options: ["hun", "henne", "hennes", "seg"], answer: 1 },
                { type: "trueFalse", claim: "'oss' means 'us'.", answer: true },
                { type: "type", prompt: "Type the Norwegian object pronoun for 'them'.", answer: "dem", accept: ["dem"] },
                { type: "mc", prompt: "Which pronoun stays exactly the same in both subject and object form?", options: ["jeg / meg", "han / ham", "dere / dere", "hun / henne"], answer: 2 },
                { type: "type", prompt: "Complete: 'Hun kjenner ___.' (She knows me.)", answer: "meg", accept: ["meg"] }
            ]
        },
        {
            id: "nor-04",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "Reflexive Pronouns",
            explanation: [
                { type: "p", text: "Reflexive pronouns show that the subject and the object of a sentence are the same person - like English 'myself', 'yourself'." },
                { type: "example", no: "Jeg vasker meg.", en: "I wash myself." },
                { type: "example", no: "Du vasker deg.", en: "You wash yourself." },
                { type: "example", no: "Han vasker seg.", en: "He washes himself." },
                { type: "example", no: "De vasker seg.", en: "They wash themselves." },
                { type: "p", text: "1st and 2nd person reflexives (meg, deg, oss, dere) look just like the object pronouns - but the 3rd person reflexive is always 'seg', no matter if it's 'he', 'she', 'it', or 'they'." }
            ],
            exercises: [
                { type: "mc", prompt: "Which reflexive pronoun is used for 'han', 'hun' and 'de' alike?", options: ["ham", "seg", "dem", "henne"], answer: 1 },
                { type: "trueFalse", claim: "'Jeg vasker meg' means 'I wash myself'.", answer: true },
                { type: "mc", prompt: "Complete: 'De vasker ___.' (They wash themselves.)", options: ["dem", "seg", "oss", "dere"], answer: 1 },
                { type: "type", prompt: "Type the reflexive pronoun for 'yourself' (singular).", answer: "deg", accept: ["deg"] },
                { type: "trueFalse", claim: "The 3rd person reflexive pronoun changes depending on whether the subject is 'han' or 'hun'.", answer: false },
                { type: "mc", prompt: "Which sentence correctly says 'She washes herself'?", options: ["Hun vasker henne.", "Hun vasker seg.", "Hun vasker hun.", "Hun vasker deg."], answer: 1 }
            ]
        },
        {
            id: "nor-05",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "Possessive Pronouns",
            explanation: [
                { type: "p", text: "Possessive pronouns show ownership. Many of them change form to match the gender of the noun they describe (en-, ei-, or et-word) or whether it's plural." },
                { type: "example", no: "min bil", en: "my car (en-word)" },
                { type: "example", no: "mitt hus", en: "my house (et-word)" },
                { type: "example", no: "mine bøker", en: "my books (plural)" },
                { type: "p", text: "Third-person possessives like 'hans' (his) and 'hennes' (her/hers) don't change form at all, no matter the noun." },
                { type: "example", no: "hans bil / hans hus", en: "his car / his house" },
                { type: "example", no: "hennes bil / hennes hus", en: "her car / her house" },
                { type: "example", no: "vår bil, vårt hus, våre bøker", en: "our car, our house, our books" }
            ],
            exercises: [
                { type: "mc", prompt: "Which form of 'my' goes with an et-word like 'hus' (house)?", options: ["min", "mi", "mitt", "mine"], answer: 2 },
                { type: "mc", prompt: "Which form of 'my' is used with plural nouns, like 'bøker' (books)?", options: ["min", "mi", "mitt", "mine"], answer: 3 },
                { type: "trueFalse", claim: "'hans' (his) changes form depending on the noun's gender.", answer: false },
                { type: "type", prompt: "Type the Norwegian word for 'her/hers'.", answer: "hennes", accept: ["hennes"] },
                { type: "mc", prompt: "Which is correct for 'our house'?", options: ["vår hus", "vårt hus", "våre hus", "vårs hus"], answer: 1 },
                { type: "type", prompt: "Type the correct form: '___ bil' for 'my car' (en-word).", answer: "min", accept: ["min"] }
            ]
        },
        {
            id: "nor-06",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "The Verb å være (to be) - Present Tense",
            explanation: [
                { type: "p", text: "Norwegian verbs are wonderfully simple: they have exactly ONE present-tense form, no matter who's doing the action. 'å være' (to be) becomes 'er' for everyone." },
                { type: "example", no: "Jeg er glad.", en: "I am happy." },
                { type: "example", no: "Du er glad.", en: "You are happy." },
                { type: "example", no: "Hun er glad.", en: "She is happy." },
                { type: "example", no: "De er glade.", en: "They are happy." },
                { type: "p", text: "The 'å' in front of a verb marks the infinitive (the dictionary form), just like 'to' in English 'to be'. You'll see 'å' a lot whenever a verb is listed by itself." }
            ],
            exercises: [
                { type: "mc", prompt: "What is the present tense of 'å være' (to be) for 'jeg' (I)?", options: ["var", "er", "være", "vær"], answer: 1 },
                { type: "trueFalse", claim: "Norwegian present-tense verbs change form depending on who's doing the action.", answer: false },
                { type: "mc", prompt: "How do you say 'You are happy' (singular)?", options: ["Du var glad.", "Du er glad.", "Du være glad.", "Du glad er."], answer: 1 },
                { type: "type", prompt: "Type the present-tense form of 'å være' used for every subject.", answer: "er", accept: ["er"] },
                { type: "mc", prompt: "What does 'å' mark at the start of a verb like 'å være'?", options: ["Past tense", "The infinitive (dictionary form)", "A question", "Plural"], answer: 1 },
                { type: "type", prompt: "Complete: 'De ___ glade.' (They are happy.)", answer: "er", accept: ["er"], hint: "å være" }
            ]
        },
        {
            id: "nor-07",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "The Verb å ha (to have) - Present Tense",
            explanation: [
                { type: "p", text: "Just like 'å være', the verb 'å ha' (to have) has one single present-tense form for every subject: 'har'." },
                { type: "example", no: "Jeg har en bil.", en: "I have a car." },
                { type: "example", no: "Hun har to barn.", en: "She has two children." },
                { type: "example", no: "De har tid.", en: "They have time." },
                { type: "p", text: "'har' also combines with other verbs later to build the present perfect tense (e.g. 'har spist' - 'have eaten') - you'll meet that in the Verbs module." }
            ],
            exercises: [
                { type: "mc", prompt: "What is the present tense of 'å ha' (to have)?", options: ["har", "hadde", "ha", "havde"], answer: 0 },
                { type: "type", prompt: "Type: 'Jeg ___ en bil.' (I have a car.)", answer: "har", accept: ["har"], hint: "å ha" },
                { type: "trueFalse", claim: "'har' changes form depending on the subject (jeg har vs. hun har).", answer: false },
                { type: "mc", prompt: "How do you say 'They have time'?", options: ["De har tid.", "De er tid.", "De ha tid.", "Dere har tid."], answer: 0 },
                { type: "mc", prompt: "Which verb form later combines with 'har' to form the present perfect (e.g. 'have eaten')?", options: ["the infinitive", "the past participle", "the imperative", "the plural"], answer: 1 },
                { type: "type", prompt: "Type the Norwegian infinitive for 'to have'.", answer: "å ha", accept: ["å ha", "ha"] }
            ]
        },
        {
            id: "nor-08",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "Common Present-Tense Verbs",
            explanation: [
                { type: "p", text: "Most Norwegian verbs form their present tense simply by adding '-r' to the infinitive." },
                { type: "example", no: "å gå → går", en: "to go/walk → go(es)/walk(s)" },
                { type: "example", no: "å bo → bor", en: "to live (reside) → live(s)" },
                { type: "example", no: "å komme → kommer", en: "to come → come(s)" },
                { type: "example", no: "å like → liker", en: "to like → like(s)" },
                { type: "example", no: "å gjøre → gjør", en: "to do/make → do(es)/make(s)" },
                { type: "p", text: "Remember: this single form works for every subject - 'jeg går', 'du går' and 'de går' are all the exact same verb form." },
                { type: "example", no: "Jeg bor i Oslo.", en: "I live in Oslo." },
                { type: "example", no: "Hun liker kaffe.", en: "She likes coffee." }
            ],
            exercises: [
                { type: "mc", prompt: "What is the present tense of 'å gå' (to go)?", options: ["gå", "går", "gikk", "gått"], answer: 1 },
                { type: "type", prompt: "Type the present tense of 'å bo' (to live/reside).", answer: "bor", accept: ["bor"] },
                { type: "mc", prompt: "How do you say 'She likes coffee'?", options: ["Hun like kaffe.", "Hun liker kaffe.", "Hun likes kaffe.", "Hun å like kaffe."], answer: 1 },
                { type: "trueFalse", claim: "Most Norwegian verbs form the present tense by adding '-r' to the infinitive.", answer: true },
                { type: "mc", prompt: "What is the present tense of 'å komme' (to come)?", options: ["komme", "kom", "kommer", "kommet"], answer: 2 },
                { type: "type", prompt: "Complete: 'Jeg ___ i Oslo.' (I live in Oslo.)", answer: "bor", accept: ["bor"], hint: "å bo" }
            ]
        },
        {
            id: "nor-09",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "Negation with ikke and aldri",
            explanation: [
                { type: "p", text: "To negate a sentence, place 'ikke' (not) right after the finite (conjugated) verb." },
                { type: "example", no: "Jeg liker ikke fisk.", en: "I don't like fish." },
                { type: "example", no: "Hun er ikke hjemme.", en: "She isn't home." },
                { type: "p", text: "'aldri' (never) works exactly the same way, in the same position." },
                { type: "example", no: "Han spiser aldri kjøtt.", en: "He never eats meat." },
                { type: "p", text: "Unlike English, Norwegian doesn't need a helper word like 'do' to negate - the main verb simply gets 'ikke' placed right after it." }
            ],
            exercises: [
                { type: "mc", prompt: "Where does 'ikke' go in a Norwegian sentence?", options: ["Before the subject", "Right after the finite verb", "Always at the very end", "Before the verb"], answer: 1 },
                { type: "type", prompt: "Type the Norwegian word for 'not'.", answer: "ikke", accept: ["ikke"] },
                { type: "mc", prompt: "How do you say 'I don't like fish'?", options: ["Jeg ikke liker fisk.", "Jeg liker ikke fisk.", "Jeg liker fisk ikke.", "Ikke jeg liker fisk."], answer: 1 },
                { type: "type", prompt: "Type the Norwegian word for 'never'.", answer: "aldri", accept: ["aldri"] },
                { type: "trueFalse", claim: "Norwegian needs a helper word like English 'do' to form a negative sentence.", answer: false },
                { type: "mc", prompt: "How do you say 'He never eats meat'?", options: ["Han aldri spiser kjøtt.", "Han spiser aldri kjøtt.", "Han spiser kjøtt aldri.", "Aldri han spiser kjøtt."], answer: 1 }
            ]
        },
        {
            id: "nor-10",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "Yes/No Questions",
            explanation: [
                { type: "p", text: "To turn a statement into a yes/no question, simply swap the order of the verb and the subject." },
                { type: "example", no: "Du er glad. → Er du glad?", en: "You are happy. → Are you happy?" },
                { type: "example", no: "Hun bor i Oslo. → Bor hun i Oslo?", en: "She lives in Oslo. → Does she live in Oslo?" },
                { type: "p", text: "No extra helper word (like English 'do/does') is needed - the verb just moves to the front, before the subject." }
            ],
            exercises: [
                { type: "mc", prompt: "How do you turn 'Du er glad' into a question?", options: ["Du er glad?", "Er du glad?", "Glad er du?", "Er glad du?"], answer: 1 },
                { type: "trueFalse", claim: "Norwegian yes/no questions need a helper word like 'do' or 'does'.", answer: false },
                { type: "mc", prompt: "What is the question form of 'Hun bor i Oslo' (She lives in Oslo)?", options: ["Hun bor i Oslo?", "Bor Oslo hun i?", "Bor hun i Oslo?", "I Oslo bor hun?"], answer: 2 },
                { type: "type", prompt: "Turn into a question: 'Du liker kaffe.' → ___ du kaffe?", answer: "Liker", accept: ["Liker", "liker"] },
                { type: "mc", prompt: "What's the general rule for forming a yes/no question in Norwegian?", options: ["Add 'gjør' at the start", "Swap the verb and subject order", "Just add a question mark", "Move the object to the front"], answer: 1 },
                { type: "type", prompt: "Question form of 'De er hjemme.' (They are home.) → ___ de hjemme?", answer: "Er", accept: ["Er", "er"] }
            ]
        },
        {
            id: "nor-11",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "Question Words",
            explanation: [
                { type: "p", text: "These six question words cover most of what you'll ever need to ask." },
                { type: "example", no: "hva", en: "what" },
                { type: "example", no: "hvor", en: "where" },
                { type: "example", no: "når", en: "when" },
                { type: "example", no: "hvorfor", en: "why" },
                { type: "example", no: "hvordan", en: "how" },
                { type: "example", no: "hvem", en: "who" },
                { type: "p", text: "Just like yes/no questions, the verb comes right after the question word, then the subject." },
                { type: "example", no: "Hva heter du?", en: "What are you called? (What's your name?)" },
                { type: "example", no: "Hvor bor du?", en: "Where do you live?" }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'where'?", options: ["hva", "hvor", "når", "hvem"], answer: 1 },
                { type: "mc", prompt: "Which word means 'why'?", options: ["hvordan", "hvorfor", "hvem", "hva"], answer: 1 },
                { type: "type", prompt: "Type the Norwegian word for 'who'.", answer: "hvem", accept: ["hvem"] },
                { type: "mc", prompt: "'Hva heter du?' is asking...", options: ["Where do you live?", "What is your name?", "How are you?", "When do you arrive?"], answer: 1 },
                { type: "trueFalse", claim: "'hvordan' means 'how'.", answer: true },
                { type: "type", prompt: "Complete: '___ bor du?' (Where do you live?)", answer: "Hvor", accept: ["Hvor", "hvor"] }
            ]
        },
        {
            id: "nor-12",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "Short Answers: ja and nei",
            explanation: [
                { type: "p", text: "'ja' means yes, and 'nei' means no - the simplest possible answers." },
                { type: "example", no: "ja", en: "yes" },
                { type: "example", no: "nei", en: "no" },
                { type: "p", text: "There's a special third word, 'jo', used instead of 'ja' to contradict a negative question - for example, to answer 'yes' when someone asks 'Don't you...?'" },
                { type: "example", no: "Liker du ikke fisk? – Jo, jeg liker fisk!", en: "Don't you like fish? – Yes I do (I like fish)!" }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'no'?", options: ["ja", "nei", "jo", "ikke"], answer: 1 },
                { type: "type", prompt: "Type the Norwegian word for 'yes'.", answer: "ja", accept: ["ja"] },
                { type: "trueFalse", claim: "'jo' is used to answer 'yes' to a negative question.", answer: true },
                { type: "mc", prompt: "How would you answer 'yes, I do' to 'Liker du ikke fisk?' (Don't you like fish?)", options: ["Ja, jeg liker fisk.", "Nei, jeg liker fisk.", "Jo, jeg liker fisk.", "Ikke, jeg liker fisk."], answer: 2 },
                { type: "type", prompt: "Type the Norwegian word for 'no'.", answer: "nei", accept: ["nei"] },
                { type: "trueFalse", claim: "'ja' is used the same way as 'jo' in every situation.", answer: false }
            ]
        },

        // ── Module 2: Numbers ────────────────────────────────────────────
        {
            id: "nor-13",
            moduleId: "numbers",
            moduleTitle: "Numbers",
            title: "Numbers 0-10",
            explanation: [
                { type: "p", text: "Norwegian numbers 0 to 10 are essential building blocks - you'll combine them constantly." },
                { type: "example", no: "null, en/ett, to, tre, fire", en: "0, 1, 2, 3, 4" },
                { type: "example", no: "fem, seks, sju, åtte, ni, ti", en: "5, 6, 7, 8, 9, 10" },
                { type: "p", text: "Like 'min/mitt' from earlier, the number 1 has two forms: 'en' with en-/ei-words, 'ett' with et-words." },
                { type: "example", no: "en bil / ett hus", en: "one car / one house" },
                { type: "p", text: "'sju' and 'syv' are both correct for 'seven' - 'sju' is more common today." }
            ],
            exercises: [
                { type: "mc", prompt: "What is 'five' in Norwegian?", options: ["fire", "fem", "seks", "sju"], answer: 1 },
                { type: "type", prompt: "Type the Norwegian word for 'ten'.", answer: "ti", accept: ["ti"] },
                { type: "mc", prompt: "Which form of 'one' goes with an et-word?", options: ["en", "ett", "ei", "to"], answer: 1 },
                { type: "trueFalse", claim: "'sju' and 'syv' both mean 'seven'.", answer: true },
                { type: "type", prompt: "Type the Norwegian word for 'three'.", answer: "tre", accept: ["tre"] },
                { type: "mc", prompt: "What number is 'åtte'?", options: ["6", "7", "8", "9"], answer: 2 }
            ]
        },
        {
            id: "nor-14",
            moduleId: "numbers",
            moduleTitle: "Numbers",
            title: "Numbers 11-20",
            explanation: [
                { type: "p", text: "Numbers 13-19 are built by adding '-ten' to the base number, similar to English." },
                { type: "example", no: "tretten, fjorten, femten", en: "13, 14, 15" },
                { type: "example", no: "seksten, sytten, atten, nitten", en: "16, 17, 18, 19" },
                { type: "p", text: "'elleve' (11) and 'tolv' (12) are irregular and don't follow that pattern." },
                { type: "example", no: "tjue", en: "20 (also written 'tyve' in older, more conservative usage)" }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'eleven'?", options: ["elleve", "tolv", "tretten", "tjue"], answer: 0 },
                { type: "type", prompt: "Type the Norwegian word for 'twelve'.", answer: "tolv", accept: ["tolv"] },
                { type: "mc", prompt: "What number is 'seksten'?", options: ["15", "16", "17", "18"], answer: 1 },
                { type: "trueFalse", claim: "'elleve' and 'tolv' follow the same '-ten' pattern as 13-19.", answer: false },
                { type: "type", prompt: "Type the Norwegian word for 'twenty'.", answer: "tjue", accept: ["tjue", "tyve"] },
                { type: "mc", prompt: "Which word means 'nineteen'?", options: ["nitten", "atten", "sytten", "tjue"], answer: 0 }
            ]
        },
        {
            id: "nor-15",
            moduleId: "numbers",
            moduleTitle: "Numbers",
            title: "Tens: 20-100",
            explanation: [
                { type: "p", text: "The multiples of ten from 20 to 100 are their own set of words to learn." },
                { type: "example", no: "tjue, tretti, førti, femti", en: "20, 30, 40, 50" },
                { type: "example", no: "seksti, sytti, åtti, nitti", en: "60, 70, 80, 90" },
                { type: "example", no: "hundre", en: "100" }
            ],
            exercises: [
                { type: "mc", prompt: "What number is 'femti'?", options: ["40", "50", "60", "70"], answer: 1 },
                { type: "type", prompt: "Type the Norwegian word for 'hundred'.", answer: "hundre", accept: ["hundre"] },
                { type: "mc", prompt: "Which word means 'seventy'?", options: ["seksti", "sytti", "åtti", "nitti"], answer: 1 },
                { type: "type", prompt: "Type the Norwegian word for 'thirty'.", answer: "tretti", accept: ["tretti"] },
                { type: "trueFalse", claim: "'førti' means 'forty'.", answer: true },
                { type: "mc", prompt: "What number is 'nitti'?", options: ["80", "90", "100", "70"], answer: 1 }
            ]
        },
        {
            id: "nor-16",
            moduleId: "numbers",
            moduleTitle: "Numbers",
            title: "Compound Numbers 21-99",
            explanation: [
                { type: "p", text: "Numbers from 21 to 99 are formed by simply joining the tens word and the ones word - no extra word needed in between (unlike German's 'und')." },
                { type: "example", no: "tjueen", en: "21 (tjue + en)" },
                { type: "example", no: "trettitre", en: "33 (tretti + tre)" },
                { type: "example", no: "femtiåtte", en: "58 (femti + åtte)" },
                { type: "example", no: "nittini", en: "99 (nitti + ni)" }
            ],
            exercises: [
                { type: "type", prompt: "Type the Norwegian word for '21'.", answer: "tjueen", accept: ["tjueen", "tjueén"] },
                { type: "mc", prompt: "How is 33 said in Norwegian?", options: ["tretti og tre", "trettitre", "tretteogtre", "trettiogtre"], answer: 1 },
                { type: "trueFalse", claim: "Norwegian inserts a word like German 'und' between the tens and ones.", answer: false },
                { type: "type", prompt: "Type the Norwegian word for '45'.", answer: "førtifem", accept: ["førtifem"] },
                { type: "mc", prompt: "What number is 'femtiåtte'?", options: ["48", "58", "68", "78"], answer: 1 },
                { type: "type", prompt: "Type the Norwegian word for '99'.", answer: "nittini", accept: ["nittini"] }
            ]
        },
        {
            id: "nor-17",
            moduleId: "numbers",
            moduleTitle: "Numbers",
            title: "Numbers 100-1000",
            explanation: [
                { type: "p", text: "'hundre' means 'hundred' and 'tusen' means 'thousand'. Unlike 21-99, numbers just past a hundred DO use 'og' before the remainder." },
                { type: "example", no: "hundre og en", en: "101 (hundre + og + en)" },
                { type: "example", no: "to hundre", en: "200" },
                { type: "example", no: "fem hundre og tjue", en: "520" },
                { type: "example", no: "tusen", en: "1000" }
            ],
            exercises: [
                { type: "type", prompt: "Type the Norwegian word for 'hundred'.", answer: "hundre", accept: ["hundre"] },
                { type: "mc", prompt: "How do you say '101' in Norwegian?", options: ["hundreen", "hundre og en", "enhundre", "hundre en"], answer: 1 },
                { type: "type", prompt: "Type the Norwegian word for 'thousand'.", answer: "tusen", accept: ["tusen"] },
                { type: "trueFalse", claim: "'og' is used right after 'hundre' when there's a remainder, unlike the 21-99 numbers.", answer: true },
                { type: "mc", prompt: "How do you say '200'?", options: ["hundre to", "totusen", "to hundre", "tohundre og null"], answer: 2 },
                { type: "type", prompt: "Type the Norwegian phrase for '520'.", answer: "fem hundre og tjue", accept: ["fem hundre og tjue"] }
            ]
        },
        {
            id: "nor-18",
            moduleId: "numbers",
            moduleTitle: "Numbers",
            title: "Talking about Prices and Quantities",
            explanation: [
                { type: "p", text: "Norwegian currency is the krone (plural: kroner), often abbreviated 'kr'." },
                { type: "example", no: "Hvor mye koster det?", en: "How much does it cost?" },
                { type: "example", no: "Det koster hundre kroner.", en: "It costs 100 kroner." },
                { type: "p", text: "For quantities: 'mye' (much, uncountable), 'mange' (many, countable), 'litt' (a little), and 'noen' (some)." },
                { type: "example", no: "mye vann / mange bøker", en: "a lot of water / many books" }
            ],
            exercises: [
                { type: "mc", prompt: "What does 'Hvor mye koster det?' mean?", options: ["Where is it?", "How much does it cost?", "What is it?", "When does it open?"], answer: 1 },
                { type: "type", prompt: "Type the Norwegian word for the currency (singular 'krone').", answer: "krone", accept: ["krone", "kr"] },
                { type: "mc", prompt: "Which word means 'many' (countable)?", options: ["mye", "mange", "litt", "noen"], answer: 1 },
                { type: "trueFalse", claim: "'mye' is used for uncountable amounts, like 'mye vann' (a lot of water).", answer: true },
                { type: "type", prompt: "Type the Norwegian word for 'a little'.", answer: "litt", accept: ["litt"] },
                { type: "mc", prompt: "How do you say 'It costs 100 kroner'?", options: ["Det koster hundre kroner.", "Det er hundre kroner koster.", "Hundre koster det kroner.", "Det koster kroner hundre."], answer: 0 }
            ]
        },

        // ── Module 3: Nouns & Articles ───────────────────────────────────
        {
            id: "nor-19",
            moduleId: "nouns",
            moduleTitle: "Nouns & Articles",
            title: "Noun Gender (en, ei, et)",
            explanation: [
                { type: "p", text: "Every Norwegian noun has a gender, shown by its indefinite article: 'en' (masculine), 'ei' (feminine), or 'et' (neuter)." },
                { type: "example", no: "en bil", en: "a car (masculine)" },
                { type: "example", no: "ei bok / en bok", en: "a book (feminine, or the masculine form, also accepted)" },
                { type: "example", no: "et hus", en: "a house (neuter)" },
                { type: "p", text: "Feminine 'ei' is optional in Bokmål - most feminine nouns can also just use 'en'. 'et'-words, however, always need 'et', never 'en'." },
                { type: "p", text: "Roughly 50% of nouns are en-words, 10% ei-words, and 40% et-words - there's no foolproof rule, so gender is best learned together with each new word." }
            ],
            exercises: [
                { type: "mc", prompt: "Which article goes with a neuter noun?", options: ["en", "ei", "et", "de"], answer: 2 },
                { type: "trueFalse", claim: "'ei' can usually be replaced with 'en' in Bokmål.", answer: true },
                { type: "mc", prompt: "Which of these is the odd one out?", options: ["en bil", "et hus", "en bok", "ei bil"], answer: 3, mute: true },
                { type: "type", prompt: "Type the neuter indefinite article.", answer: "et", accept: ["et"] },
                { type: "trueFalse", claim: "An et-word can also correctly take the article 'en'.", answer: false },
                { type: "mc", prompt: "Roughly what share of Norwegian nouns are et-words?", options: ["10%", "20%", "40%", "70%"], answer: 2 }
            ]
        },
        {
            id: "nor-20",
            moduleId: "nouns",
            moduleTitle: "Nouns & Articles",
            title: "Indefinite vs Definite Singular",
            explanation: [
                { type: "p", text: "Norwegian has no separate word for 'the' - instead, a suffix attaches to the end of the noun." },
                { type: "example", no: "en bil → bilen", en: "a car → the car" },
                { type: "example", no: "ei bok → boka", en: "a book → the book" },
                { type: "example", no: "et hus → huset", en: "a house → the house" },
                { type: "p", text: "The suffix depends on gender: -en for en-words, -a (or -en) for ei-words, -et for et-words." }
            ],
            exercises: [
                { type: "mc", prompt: "How do you say 'the car' from 'en bil'?", options: ["en bilen", "bilen", "bil en", "denbil"], answer: 1 },
                { type: "type", prompt: "Type the definite form of 'et hus' (house).", answer: "huset", accept: ["huset"] },
                { type: "mc", prompt: "Which suffix marks the definite form of an et-word?", options: ["-en", "-a", "-et", "-ene"], answer: 2 },
                { type: "trueFalse", claim: "Norwegian uses a separate word for 'the', like English.", answer: false },
                { type: "type", prompt: "Type the definite form of 'ei bok' (book).", answer: "boka", accept: ["boka", "boken"] },
                { type: "mc", prompt: "What does 'bilen' mean?", options: ["a car", "the car", "cars", "the cars"], answer: 1 }
            ]
        },
        {
            id: "nor-21",
            moduleId: "nouns",
            moduleTitle: "Nouns & Articles",
            title: "Plural Indefinite and Definite",
            explanation: [
                { type: "p", text: "Plural indefinite usually adds '-er' (en-/ei-words), while many et-words stay unchanged in the plural." },
                { type: "example", no: "en bil → biler", en: "a car → cars" },
                { type: "example", no: "et hus → hus", en: "a house → houses (same word)" },
                { type: "p", text: "The definite plural ('the cars', 'the houses') almost always adds '-ene', regardless of gender." },
                { type: "example", no: "biler → bilene", en: "cars → the cars" },
                { type: "example", no: "hus → husene", en: "houses → the houses" }
            ],
            exercises: [
                { type: "mc", prompt: "What is the plural indefinite of 'en bil'?", options: ["bilen", "biler", "bilene", "bilar"], answer: 1 },
                { type: "trueFalse", claim: "Many et-words stay the same in the indefinite plural, like 'hus' → 'hus'.", answer: true },
                { type: "type", prompt: "Type the definite plural of 'hus' (houses).", answer: "husene", accept: ["husene"] },
                { type: "mc", prompt: "Which suffix marks the definite plural, regardless of gender?", options: ["-er", "-ene", "-a", "-et"], answer: 1 },
                { type: "type", prompt: "Type the indefinite plural of 'bil' (car).", answer: "biler", accept: ["biler"] },
                { type: "mc", prompt: "What does 'bilene' mean?", options: ["a car", "the car", "cars", "the cars"], answer: 3 }
            ]
        },
        {
            id: "nor-22",
            moduleId: "nouns",
            moduleTitle: "Nouns & Articles",
            title: "Common Regular & Irregular Nouns",
            explanation: [
                { type: "p", text: "Most nouns follow the regular patterns from the last lesson, but a handful of very common ones are irregular and worth memorizing separately." },
                { type: "example", no: "mann → menn", en: "man → men" },
                { type: "example", no: "bok → bøker", en: "book → books" },
                { type: "example", no: "barn → barn", en: "child → children (same word, like English 'sheep')" },
                { type: "p", text: "'barn' is also irregular in its definite plural: 'barna' (the children), not the expected 'barnene'." },
                { type: "example", no: "et barn → barnet → barna", en: "a child → the child → the children" }
            ],
            exercises: [
                { type: "mc", prompt: "What is the irregular plural of 'mann' (man)?", options: ["manner", "menner", "menn", "manns"], answer: 2 },
                { type: "type", prompt: "Type the plural of 'bok' (book).", answer: "bøker", accept: ["bøker"] },
                { type: "trueFalse", claim: "'barn' (child) stays the same in the indefinite plural.", answer: true },
                { type: "mc", prompt: "What is the definite plural of 'barn' (the children)?", options: ["barnene", "barna", "barnet", "barner"], answer: 1 },
                { type: "type", prompt: "Type the Norwegian word for 'the man' (definite singular).", answer: "mannen", accept: ["mannen"] },
                { type: "mc", prompt: "Which of these shows an irregular vowel change in the plural?", options: ["bil → biler", "hus → hus", "bok → bøker", "time → timer"], answer: 2 }
            ]
        },
        {
            id: "nor-23",
            moduleId: "nouns",
            moduleTitle: "Nouns & Articles",
            title: "Using det as a Neutral/Impersonal Subject",
            explanation: [
                { type: "p", text: "'det' does double duty: it's the subject pronoun for et-words ('it'), and it's also used impersonally - the way English uses 'it' for weather or general statements, with no real thing being referred to." },
                { type: "example", no: "Det regner.", en: "It's raining." },
                { type: "example", no: "Det er kaldt.", en: "It's cold." },
                { type: "example", no: "Det er viktig å øve.", en: "It's important to practice." },
                { type: "p", text: "This impersonal 'det' is also how Norwegian says 'there is/are'." },
                { type: "example", no: "Det er en bil her.", en: "There is a car here." }
            ],
            exercises: [
                { type: "mc", prompt: "What does 'Det regner' mean?", options: ["It rains water", "It's raining", "The rain is here", "It's a rain"], answer: 1 },
                { type: "trueFalse", claim: "'det' can be used impersonally, without referring to a specific thing.", answer: true },
                { type: "type", prompt: "Complete: '___ er kaldt.' (It's cold.)", answer: "Det", accept: ["Det", "det"] },
                { type: "mc", prompt: "How do you say 'There is a car here'?", options: ["Der er en bil her.", "Det er en bil her.", "Den er en bil her.", "Han er en bil her."], answer: 1 },
                { type: "mc", prompt: "Which sentence uses 'det' impersonally (no specific thing referred to)?", options: ["Det er bilen min.", "Det er viktig å øve.", "Det er boka di.", "Det er huset hans."], answer: 1 },
                { type: "type", prompt: "Type the Norwegian word used for both 'it' (et-words) and impersonal statements.", answer: "det", accept: ["det"] }
            ]
        },

        // ── Module 4: Adjectives ─────────────────────────────────────────
        {
            id: "nor-24",
            moduleId: "adjectives",
            moduleTitle: "Adjectives",
            title: "Basic Adjectives",
            explanation: [
                { type: "p", text: "Adjectives describe nouns. In their base (dictionary) form, they match an en-word." },
                { type: "example", no: "en stor bil", en: "a big car" },
                { type: "example", no: "en fin dag", en: "a nice day" },
                { type: "example", no: "en gammel bok", en: "an old book" },
                { type: "p", text: "A few more essentials: 'god' (good), 'dårlig' (bad), 'ny' (new), 'pen' (pretty/handsome)." }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'small'?", options: ["stor", "liten", "fin", "ny"], answer: 1 },
                { type: "type", prompt: "Type the Norwegian word for 'good'.", answer: "god", accept: ["god"] },
                { type: "mc", prompt: "Which word means 'old'?", options: ["ny", "gammel", "pen", "dårlig"], answer: 1 },
                { type: "trueFalse", claim: "'dårlig' means 'bad'.", answer: true },
                { type: "type", prompt: "Type the Norwegian word for 'big'.", answer: "stor", accept: ["stor"] },
                { type: "mc", prompt: "What does 'pen' mean?", options: ["ugly", "pretty/handsome", "tall", "short"], answer: 1 }
            ]
        },
        {
            id: "nor-25",
            moduleId: "adjectives",
            moduleTitle: "Adjectives",
            title: "Adjective-Noun Agreement",
            explanation: [
                { type: "p", text: "Adjectives agree with the noun they describe: no change with en-/ei-words, add '-t' with et-words, and add '-e' for any plural." },
                { type: "example", no: "en stor bil", en: "a big car (en-word, no change)" },
                { type: "example", no: "et stort hus", en: "a big house (et-word, +t)" },
                { type: "example", no: "store biler / store hus", en: "big cars / big houses (plural, +e)" }
            ],
            exercises: [
                { type: "mc", prompt: "How does 'stor' change with an et-word like 'hus'?", options: ["stor hus", "store hus", "stort hus", "storet hus"], answer: 2 },
                { type: "type", prompt: "Type the plural form of 'stor' (used with any plural noun).", answer: "store", accept: ["store"] },
                { type: "trueFalse", claim: "Adjectives stay unchanged with en-words.", answer: true },
                { type: "mc", prompt: "Which is correct for 'big cars' (plural)?", options: ["stor biler", "store biler", "storee biler", "stort biler"], answer: 1 },
                { type: "type", prompt: "Complete: 'et ___ hus' (a big house).", answer: "stort", accept: ["stort"], hint: "stor" },
                { type: "mc", prompt: "What ending do et-words typically add to an adjective?", options: ["-e", "-t", "-en", "-et"], answer: 1 }
            ]
        },
        {
            id: "nor-26",
            moduleId: "adjectives",
            moduleTitle: "Adjectives",
            title: "Comparatives and Superlatives",
            explanation: [
                { type: "p", text: "Regular adjectives add '-ere' for the comparative ('more/-er') and '-est' for the superlative ('most/-est')." },
                { type: "example", no: "fin → finere → finest", en: "nice → nicer → nicest" },
                { type: "p", text: "Some very common adjectives are irregular, similar to English 'good → better → best'." },
                { type: "example", no: "god → bedre → best", en: "good → better → best" },
                { type: "example", no: "stor → større → størst", en: "big → bigger → biggest" },
                { type: "example", no: "liten → mindre → minst", en: "small → smaller → smallest" }
            ],
            exercises: [
                { type: "mc", prompt: "What is the comparative of 'fin' (nice)?", options: ["finst", "finere", "finest", "finnere"], answer: 1 },
                { type: "type", prompt: "Type the superlative of 'fin'.", answer: "finest", accept: ["finest"] },
                { type: "mc", prompt: "What is the comparative of 'god' (good)?", options: ["godere", "bedre", "bedst", "godst"], answer: 1 },
                { type: "trueFalse", claim: "'stor' (big) has an irregular comparative: 'større'.", answer: true },
                { type: "type", prompt: "Type the superlative of 'stor' (big).", answer: "størst", accept: ["størst"] },
                { type: "mc", prompt: "What is the comparative of 'liten' (small)?", options: ["litnere", "mindre", "minst", "litenere"], answer: 1 }
            ]
        },
        {
            id: "nor-27",
            moduleId: "adjectives",
            moduleTitle: "Adjectives",
            title: "Colors",
            explanation: [
                { type: "p", text: "Colors are adjectives too, so most follow the same agreement rules from a couple of lessons ago." },
                { type: "example", no: "rød, blå, gul", en: "red, blue, yellow" },
                { type: "example", no: "grønn, hvit, svart", en: "green, white, black" },
                { type: "example", no: "en rød bil, et rødt hus, røde biler", en: "a red car, a red house, red cars" }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'blue'?", options: ["rød", "blå", "gul", "grønn"], answer: 1 },
                { type: "type", prompt: "Type the Norwegian word for 'green'.", answer: "grønn", accept: ["grønn"] },
                { type: "mc", prompt: "Which word means 'white'?", options: ["svart", "hvit", "grå", "brun"], answer: 1 },
                { type: "trueFalse", claim: "'svart' means 'black'.", answer: true },
                { type: "type", prompt: "Type the Norwegian word for 'red'.", answer: "rød", accept: ["rød"] },
                { type: "mc", prompt: "How would you say 'a red house' (et-word, agreement)?", options: ["en rød hus", "et rød hus", "et rødt hus", "et røde hus"], answer: 2 }
            ]
        },
        {
            id: "nor-28",
            moduleId: "adjectives",
            moduleTitle: "Adjectives",
            title: "Describing People and Things",
            explanation: [
                { type: "p", text: "Here's a useful set of adjectives for describing people, moods, and things." },
                { type: "example", no: "høy, lav", en: "tall, short/low" },
                { type: "example", no: "tynn, tykk", en: "thin, thick/fat" },
                { type: "example", no: "snill, sint", en: "kind, angry" },
                { type: "example", no: "glad, trist", en: "happy, sad" },
                { type: "example", no: "sulten, trøtt", en: "hungry, tired" }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'tall'?", options: ["lav", "høy", "tynn", "tykk"], answer: 1 },
                { type: "type", prompt: "Type the Norwegian word for 'happy'.", answer: "glad", accept: ["glad"] },
                { type: "mc", prompt: "Which word means 'tired'?", options: ["sulten", "trøtt", "sint", "trist"], answer: 1 },
                { type: "trueFalse", claim: "'snill' means 'kind'.", answer: true },
                { type: "type", prompt: "Type the Norwegian word for 'hungry'.", answer: "sulten", accept: ["sulten"] },
                { type: "mc", prompt: "What does 'sint' mean?", options: ["sad", "angry", "kind", "tired"], answer: 1 }
            ]
        },

        // ── Module 5: Verbs ──────────────────────────────────────────────
        {
            id: "nor-29",
            moduleId: "verbs",
            moduleTitle: "Verbs",
            title: "Present Tense Verbs (-r form)",
            explanation: [
                { type: "p", text: "The present-tense rule you've already seen (add '-r' to the infinitive) applies to almost every Norwegian verb - here it is with a few more examples." },
                { type: "example", no: "å snakke → snakker", en: "to speak → speak(s)" },
                { type: "example", no: "å lese → leser", en: "to read → read(s)" },
                { type: "example", no: "å spise → spiser", en: "to eat → eat(s)" },
                { type: "example", no: "å arbeide → arbeider", en: "to work → work(s)" },
                { type: "p", text: "Verbs whose infinitive doesn't end in unstressed '-e' (a small handful, like 'å bo') still just add '-r': 'bor'." }
            ],
            exercises: [
                { type: "mc", prompt: "What is the present tense of 'å snakke' (to speak)?", options: ["snakke", "snakker", "snakket", "snakk"], answer: 1 },
                { type: "type", prompt: "Type the present tense of 'å spise' (to eat).", answer: "spiser", accept: ["spiser"] },
                { type: "mc", prompt: "What is the present tense of 'å lese' (to read)?", options: ["lese", "leser", "les", "lest"], answer: 1 },
                { type: "trueFalse", claim: "Nearly every Norwegian verb forms its present tense by adding '-r' to the infinitive.", answer: true },
                { type: "type", prompt: "Type the present tense of 'å arbeide' (to work).", answer: "arbeider", accept: ["arbeider"] },
                { type: "mc", prompt: "Which is the correct present-tense sentence for 'She reads a book'?", options: ["Hun lese en bok.", "Hun leser en bok.", "Hun å lese en bok.", "Hun les en bok."], answer: 1 }
            ]
        },
        {
            id: "nor-30",
            moduleId: "verbs",
            moduleTitle: "Verbs",
            title: "Infinitive with å and Modal Verbs",
            explanation: [
                { type: "p", text: "Modal verbs express ability, desire, obligation, and so on, and are followed by another verb in the infinitive - but WITHOUT 'å'." },
                { type: "example", no: "Jeg kan svømme.", en: "I can swim." },
                { type: "example", no: "Jeg vil reise.", en: "I want to travel." },
                { type: "example", no: "Jeg må gå.", en: "I must go." },
                { type: "p", text: "The modal verbs and their present-tense forms:" },
                { type: "example", no: "å kunne → kan / å måtte → må", en: "can/be able to / must" },
                { type: "example", no: "å skulle → skal / å burde → bør", en: "shall/will / should" }
            ],
            exercises: [
                { type: "mc", prompt: "What is the present tense of 'å kunne' (can)?", options: ["kunne", "kan", "kunner", "kunnet"], answer: 1 },
                { type: "trueFalse", claim: "A modal verb like 'kan' is followed by 'å' before the next verb.", answer: false },
                { type: "type", prompt: "Complete: 'Jeg ___ svømme.' (I can swim.)", answer: "kan", accept: ["kan"], hint: "å kunne" },
                { type: "mc", prompt: "What is the present tense of 'å måtte' (must)?", options: ["måtte", "må", "mået", "måtter"], answer: 1 },
                { type: "type", prompt: "Type the present tense of 'å ville' (want to).", answer: "vil", accept: ["vil"] },
                { type: "mc", prompt: "How do you say 'I should go'?", options: ["Jeg bør å gå.", "Jeg bør gå.", "Jeg burde å gå.", "Jeg går bør."], answer: 1 }
            ]
        },
        {
            id: "nor-31",
            moduleId: "verbs",
            moduleTitle: "Verbs",
            title: "Present Perfect (har + participle)",
            explanation: [
                { type: "p", text: "The present perfect ('have done something') is built with 'har' plus the verb's past participle - similar to English 'have + past participle'." },
                { type: "example", no: "Jeg har spist.", en: "I have eaten." },
                { type: "example", no: "Hun har lest boka.", en: "She has read the book." },
                { type: "example", no: "å snakke → har snakket", en: "to speak → have spoken" },
                { type: "p", text: "A couple of irregular participles worth knowing:" },
                { type: "example", no: "å gjøre → har gjort", en: "to do → have done" },
                { type: "example", no: "å komme → har kommet", en: "to come → have come" }
            ],
            exercises: [
                { type: "mc", prompt: "How do you say 'I have eaten'?", options: ["Jeg har spise.", "Jeg har spist.", "Jeg har spiser.", "Jeg har å spise."], answer: 1 },
                { type: "trueFalse", claim: "The present perfect is built with 'har' + past participle.", answer: true },
                { type: "type", prompt: "Complete: 'Hun har ___ boka.' (She has read the book.)", answer: "lest", accept: ["lest"], hint: "å lese" },
                { type: "mc", prompt: "What is the past participle of 'å gjøre' (to do)?", options: ["gjørt", "gjort", "gjøret", "gjordt"], answer: 1 },
                { type: "type", prompt: "Type the past participle of 'å komme' (to come).", answer: "kommet", accept: ["kommet"] },
                { type: "mc", prompt: "Which is correct for 'They have spoken'?", options: ["De har snakke.", "De har snakker.", "De har snakket.", "De har å snakke."], answer: 2 }
            ]
        },
        {
            id: "nor-32",
            moduleId: "verbs",
            moduleTitle: "Verbs",
            title: "Simple Past of Regular Verbs",
            explanation: [
                { type: "p", text: "The simple past tense ('spoke', 'read') for regular verbs comes in two common patterns." },
                { type: "example", no: "å snakke → snakket", en: "to speak → spoke" },
                { type: "example", no: "å jobbe → jobbet", en: "to work → worked" },
                { type: "example", no: "å lese → leste", en: "to read → read (past)" },
                { type: "example", no: "å spise → spiste", en: "to eat → ate" },
                { type: "p", text: "The simple past and the present-perfect participle often look identical for '-et' verbs ('snakket' works for both) - context tells them apart, just like English 'I called' vs. 'I have called'." }
            ],
            exercises: [
                { type: "mc", prompt: "What is the simple past of 'å snakke' (to speak)?", options: ["snakker", "snakket", "snakke", "snakka"], answer: 1 },
                { type: "type", prompt: "Type the simple past of 'å spise' (to eat).", answer: "spiste", accept: ["spiste"] },
                { type: "mc", prompt: "What is the simple past of 'å lese' (to read)?", options: ["leser", "les", "leste", "lest"], answer: 2 },
                { type: "trueFalse", claim: "There are two common regular simple-past patterns in Norwegian: '-et' and '-te'.", answer: true },
                { type: "type", prompt: "Type the simple past of 'å jobbe' (to work).", answer: "jobbet", accept: ["jobbet"] },
                { type: "mc", prompt: "Which sentence means 'She ate breakfast'? (frokost = breakfast)", options: ["Hun spiser frokost.", "Hun spiste frokost.", "Hun har spist frokost.", "Hun å spise frokost."], answer: 1 }
            ]
        },
        {
            id: "nor-33",
            moduleId: "verbs",
            moduleTitle: "Verbs",
            title: "Future with skal and vil",
            explanation: [
                { type: "p", text: "Norwegian has no separate future verb tense - instead, 'skal' or 'vil' plus the infinitive expresses future actions." },
                { type: "example", no: "Jeg skal reise i morgen.", en: "I'm going to travel tomorrow. (planned)" },
                { type: "example", no: "Det vil regne.", en: "It will rain. (prediction)" },
                { type: "p", text: "'skal' leans toward a plan, decision, or promise; 'vil' leans toward intention or a prediction - the line between them is often blurry, and both are common." },
                { type: "example", no: "Jeg vil lære norsk.", en: "I want to learn Norwegian. / I will learn Norwegian." }
            ],
            exercises: [
                { type: "mc", prompt: "Which word expresses a planned/decided future action?", options: ["skal", "kan", "må", "bør"], answer: 0 },
                { type: "type", prompt: "Complete: 'Jeg ___ reise i morgen.' (I'm going to travel tomorrow.)", answer: "skal", accept: ["skal"], hint: "å skulle" },
                { type: "trueFalse", claim: "Norwegian has a distinct future-tense verb form, separate from the present tense.", answer: false },
                { type: "mc", prompt: "Which best fits a weather prediction, 'It will rain'?", options: ["Det kan regne.", "Det vil regne.", "Det må regne.", "Det bør regne."], answer: 1 },
                { type: "type", prompt: "Type the modal verb that often signals intention about the future.", answer: "vil", accept: ["vil"] },
                { type: "mc", prompt: "What follows 'skal'/'vil' when expressing the future?", options: ["a noun", "the bare infinitive", "the past participle", "'å' + infinitive"], answer: 1 }
            ]
        },
        {
            id: "nor-34",
            moduleId: "verbs",
            moduleTitle: "Verbs",
            title: "Reflexive Verbs",
            explanation: [
                { type: "p", text: "Some Norwegian verbs are inherently reflexive - the action is done to oneself, and they always need a reflexive pronoun that matches the subject (see the Reflexive Pronouns lesson)." },
                { type: "example", no: "å sette seg", en: "to sit down (lit. 'to set oneself')" },
                { type: "example", no: "å skynde seg", en: "to hurry (lit. 'to hasten oneself')" },
                { type: "example", no: "å gifte seg", en: "to get married (lit. 'to marry oneself')" },
                { type: "example", no: "Jeg setter meg. / Vi skynder oss. / De gifter seg.", en: "I sit down. / We hurry. / They get married." }
            ],
            exercises: [
                { type: "mc", prompt: "How do you say 'I sit down'?", options: ["Jeg setter seg.", "Jeg setter meg.", "Jeg setter deg.", "Jeg setter oss."], answer: 1 },
                { type: "type", prompt: "Complete: 'Vi skynder ___.' (We hurry.)", answer: "oss", accept: ["oss"] },
                { type: "trueFalse", claim: "The reflexive pronoun with 'å gifte seg' must always match the subject.", answer: true },
                { type: "mc", prompt: "How do you say 'They get married'?", options: ["De gifter meg.", "De gifter dem.", "De gifter seg.", "De gifter deg."], answer: 2 },
                { type: "type", prompt: "Type the Norwegian verb phrase for 'to hurry' (infinitive, with its reflexive pronoun).", answer: "å skynde seg", accept: ["å skynde seg", "skynde seg"] },
                { type: "mc", prompt: "What does 'å sette seg' literally mean?", options: ["to sit down", "to stand up", "to sleep", "to wake up"], answer: 0 }
            ]
        },

        // ── Module 6: Sentence Structure ─────────────────────────────────
        {
            id: "nor-35",
            moduleId: "syntax",
            moduleTitle: "Sentence Structure",
            title: "Basic Word Order (S-V-O)",
            explanation: [
                { type: "p", text: "The basic Norwegian sentence order is Subject - Verb - Object, just like English." },
                { type: "example", no: "Jeg leser boka.", en: "I read the book. (S-V-O)" },
                { type: "example", no: "Hun liker kaffe.", en: "She likes coffee." },
                { type: "p", text: "This basic order holds as long as the subject genuinely comes first - the next lesson covers what happens when something else leads the sentence." }
            ],
            exercises: [
                { type: "mc", prompt: "What is the basic Norwegian word order?", options: ["V-S-O", "S-O-V", "S-V-O", "O-V-S"], answer: 2 },
                { type: "trueFalse", claim: "'Jeg leser boka' follows Subject-Verb-Object order.", answer: true },
                { type: "mc", prompt: "Which sentence correctly follows S-V-O?", options: ["Kaffe liker hun.", "Liker hun kaffe.", "Hun liker kaffe.", "Hun kaffe liker."], answer: 2 },
                { type: "type", prompt: "Complete with the correct verb form: 'Hun ___ boka.' (She reads the book.)", answer: "leser", accept: ["leser"], hint: "å lese" },
                { type: "mc", prompt: "In 'Hun liker kaffe', what role does 'kaffe' play?", options: ["Subject", "Verb", "Object", "Adjective"], answer: 2 },
                { type: "trueFalse", claim: "Norwegian's basic word order is different from English.", answer: false }
            ]
        },
        {
            id: "nor-36",
            moduleId: "syntax",
            moduleTitle: "Sentence Structure",
            title: "The Verb-Second Rule",
            explanation: [
                { type: "p", text: "Norwegian's most important structural rule: the conjugated verb is always the SECOND element in a statement - no matter what comes first." },
                { type: "example", no: "Jeg leser boka i dag.", en: "I read the book today. (subject first, verb 2nd)" },
                { type: "example", no: "I dag leser jeg boka.", en: "Today I read the book. (time expression first - verb still 2nd, subject moves after it!)" },
                { type: "p", text: "This is why, whenever a sentence starts with something other than the subject (like a time or place word), the subject and verb swap places - to keep the verb in position two." }
            ],
            exercises: [
                { type: "mc", prompt: "What is always the SECOND element in a Norwegian main clause?", options: ["The subject", "The object", "The finite verb", "The adverb"], answer: 2 },
                { type: "mc", prompt: "In 'I dag leser jeg boka', where is the verb?", options: ["First", "Second", "Third", "Last"], answer: 1 },
                { type: "trueFalse", claim: "When a sentence starts with a time expression, the subject and verb swap places to keep the verb in position two.", answer: true },
                { type: "type", prompt: "Complete: 'I dag ___ jeg boka.' (Today I read the book.)", answer: "leser", accept: ["leser"], hint: "å lese" },
                { type: "mc", prompt: "Which sentence correctly follows the verb-second rule?", options: ["I dag jeg leser boka.", "I dag leser jeg boka.", "Jeg i dag leser boka.", "Leser jeg i dag boka."], answer: 1 },
                { type: "trueFalse", claim: "The verb-second rule only applies to yes/no questions, not statements.", answer: false }
            ]
        },
        {
            id: "nor-37",
            moduleId: "syntax",
            moduleTitle: "Sentence Structure",
            title: "Time/Place Adverbs and Inversion",
            explanation: [
                { type: "p", text: "Time and place adverbs commonly lead a Norwegian sentence for emphasis - and per the verb-second rule, this always triggers subject-verb inversion." },
                { type: "example", no: "Nå spiser vi.", en: "Now we eat. (nå first, verb 2nd, subject 3rd)" },
                { type: "example", no: "Her bor jeg.", en: "I live here. (her first, verb 2nd, subject 3rd)" },
                { type: "example", no: "i morgen, senere, der", en: "tomorrow, later, there" }
            ],
            exercises: [
                { type: "mc", prompt: "How do you say 'Now we eat' leading with 'nå'?", options: ["Nå vi spiser.", "Nå spiser vi.", "Vi nå spiser.", "Spiser nå vi."], answer: 1 },
                { type: "type", prompt: "Complete: 'Her ___ jeg.' (I live here.)", answer: "bor", accept: ["bor"], hint: "å bo" },
                { type: "trueFalse", claim: "Leading a sentence with a place adverb like 'her' still triggers subject-verb inversion.", answer: true },
                { type: "mc", prompt: "Which word means 'tomorrow'?", options: ["nå", "senere", "i morgen", "der"], answer: 2 },
                { type: "mc", prompt: "Which sentence is correctly inverted?", options: ["Der de bor.", "Der bor de.", "De der bor.", "Bor der de."], answer: 1 },
                { type: "type", prompt: "Type the Norwegian word for 'later'.", answer: "senere", accept: ["senere"] }
            ]
        },
        {
            id: "nor-38",
            moduleId: "syntax",
            moduleTitle: "Sentence Structure",
            title: "Placing ikke and Other Adverbs",
            explanation: [
                { type: "p", text: "'ikke' and adverbs like 'ofte' (often), 'alltid' (always), 'bare' (just/only), and 'kanskje' (maybe) all sit in the same spot: right after the finite verb in a main clause." },
                { type: "example", no: "Jeg spiser ofte fisk.", en: "I often eat fish." },
                { type: "example", no: "Hun er alltid glad.", en: "She is always happy." },
                { type: "example", no: "Vi er kanskje sent ute.", en: "We are maybe running late." }
            ],
            exercises: [
                { type: "mc", prompt: "Where does 'ofte' (often) go in a Norwegian sentence?", options: ["Before the subject", "Right after the finite verb", "At the very start always", "It never appears mid-sentence"], answer: 1 },
                { type: "type", prompt: "Complete: 'Hun er ___ glad.' (She is always happy.)", answer: "alltid", accept: ["alltid"] },
                { type: "mc", prompt: "Which word means 'maybe'?", options: ["bare", "kanskje", "ofte", "alltid"], answer: 1 },
                { type: "trueFalse", claim: "'ikke' sits in the same sentence position as 'ofte', 'alltid', 'bare', and 'kanskje'.", answer: true },
                { type: "type", prompt: "Type the Norwegian word for 'just/only'.", answer: "bare", accept: ["bare"] },
                { type: "mc", prompt: "How do you say 'I often eat fish'?", options: ["Jeg ofte spiser fisk.", "Jeg spiser ofte fisk.", "Ofte jeg spiser fisk.", "Jeg spiser fisk ofte alltid."], answer: 1 }
            ]
        },
        {
            id: "nor-39",
            moduleId: "syntax",
            moduleTitle: "Sentence Structure",
            title: "Coordinating Sentences: og, men, eller, fordi",
            explanation: [
                { type: "p", text: "These four words connect clauses into longer sentences." },
                { type: "example", no: "og, men", en: "and, but" },
                { type: "example", no: "eller, fordi", en: "or, because" },
                { type: "example", no: "Jeg liker te, men hun liker kaffe.", en: "I like tea, but she likes coffee." },
                { type: "example", no: "Jeg er trøtt fordi jeg jobbet mye.", en: "I am tired because I worked a lot." }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'but'?", options: ["og", "men", "eller", "fordi"], answer: 1 },
                { type: "type", prompt: "Type the Norwegian word for 'because'.", answer: "fordi", accept: ["fordi"] },
                { type: "mc", prompt: "Which word means 'or'?", options: ["og", "men", "eller", "fordi"], answer: 2 },
                { type: "trueFalse", claim: "'og' means 'and'.", answer: true },
                { type: "type", prompt: "Complete: 'Jeg er trøtt ___ jeg jobbet mye.' (...because I worked a lot.)", answer: "fordi", accept: ["fordi"] },
                { type: "mc", prompt: "How do you say 'Do you want tea or coffee?'?", options: ["Vil du ha te men kaffe?", "Vil du ha te eller kaffe?", "Vil du ha te fordi kaffe?", "Vil du ha te og kaffe?"], answer: 1 }
            ]
        },

        // ── Module 7: Everyday Vocabulary ────────────────────────────────
        {
            id: "nor-40",
            moduleId: "vocabulary",
            moduleTitle: "Everyday Vocabulary",
            title: "Greetings and Courtesy Phrases",
            explanation: [
                { type: "p", text: "A handful of everyday phrases will cover most polite exchanges." },
                { type: "example", no: "hei, hallo", en: "hi, hello" },
                { type: "example", no: "god morgen, god kveld, god natt", en: "good morning, good evening, good night" },
                { type: "example", no: "ha det, ha det bra", en: "bye, goodbye/take care" },
                { type: "example", no: "takk, vær så snill", en: "thanks, please" },
                { type: "example", no: "unnskyld, vær så god", en: "sorry/excuse me, here you go/you're welcome" }
            ],
            exercises: [
                { type: "mc", prompt: "Which means 'good morning'?", options: ["god dag", "god morgen", "god kveld", "god natt"], answer: 1 },
                { type: "type", prompt: "Type the Norwegian word for 'bye'.", answer: "ha det", accept: ["ha det"] },
                { type: "mc", prompt: "Which word means 'please'?", options: ["takk", "unnskyld", "vær så snill", "vær så god"], answer: 2 },
                { type: "trueFalse", claim: "'unnskyld' means 'sorry/excuse me'.", answer: true },
                { type: "type", prompt: "Type the Norwegian phrase for 'good evening'.", answer: "god kveld", accept: ["god kveld"] },
                { type: "mc", prompt: "What does 'vær så god' typically mean in context?", options: ["Please", "Sorry", "Here you go / you're welcome", "Good night"], answer: 2 }
            ]
        },
        {
            id: "nor-41",
            moduleId: "vocabulary",
            moduleTitle: "Everyday Vocabulary",
            title: "Introducing Yourself",
            explanation: [
                { type: "p", text: "These phrases cover the basics of introducing yourself." },
                { type: "example", no: "Jeg heter...", en: "My name is..." },
                { type: "example", no: "Jeg kommer fra... / Jeg er fra...", en: "I come from... / I am from..." },
                { type: "example", no: "Jeg jobber som... / Jeg studerer...", en: "I work as... / I study..." },
                { type: "example", no: "Hyggelig å møte deg.", en: "Nice to meet you." }
            ],
            exercises: [
                { type: "mc", prompt: "How do you say 'My name is...'?", options: ["Jeg er...", "Jeg heter...", "Jeg kommer...", "Jeg bor..."], answer: 1 },
                { type: "type", prompt: "Type the Norwegian phrase for 'I come from...'.", answer: "jeg kommer fra", accept: ["jeg kommer fra"] },
                { type: "mc", prompt: "What does 'Hyggelig å møte deg' mean?", options: ["Nice to meet you", "Good morning", "See you later", "How are you"], answer: 0 },
                { type: "trueFalse", claim: "'Jeg studerer' means 'I study'.", answer: true },
                { type: "type", prompt: "Complete: 'Jeg jobber ___ lærer.' (I work as a teacher.)", answer: "som", accept: ["som"] },
                { type: "mc", prompt: "Which phrase tells where you're from?", options: ["Jeg heter...", "Jeg er fra...", "Jeg jobber...", "Jeg liker..."], answer: 1 }
            ]
        },
        {
            id: "nor-42",
            moduleId: "vocabulary",
            moduleTitle: "Everyday Vocabulary",
            title: "Family Vocabulary",
            explanation: [
                { type: "p", text: "Core family words - many pair up neatly, like English." },
                { type: "example", no: "mor, far", en: "mother, father" },
                { type: "example", no: "søster, bror", en: "sister, brother" },
                { type: "example", no: "datter, sønn", en: "daughter, son" },
                { type: "example", no: "bestemor, bestefar", en: "grandmother, grandfather" },
                { type: "example", no: "kone, mann, barn, foreldre", en: "wife, husband, child, parents" }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'mother'?", options: ["far", "mor", "søster", "datter"], answer: 1 },
                { type: "type", prompt: "Type the Norwegian word for 'brother'.", answer: "bror", accept: ["bror"] },
                { type: "mc", prompt: "Which word means 'grandfather'?", options: ["bestemor", "bestefar", "far", "farfar"], answer: 1 },
                { type: "trueFalse", claim: "'foreldre' means 'parents'.", answer: true },
                { type: "type", prompt: "Type the Norwegian word for 'daughter'.", answer: "datter", accept: ["datter"] },
                { type: "mc", prompt: "What does 'kone' mean?", options: ["husband", "wife", "child", "sister"], answer: 1 }
            ]
        },
        {
            id: "nor-43",
            moduleId: "vocabulary",
            moduleTitle: "Everyday Vocabulary",
            title: "Days, Months, Seasons, and Time",
            explanation: [
                { type: "p", text: "The days of the week, in order:" },
                { type: "example", no: "mandag, tirsdag, onsdag", en: "Monday, Tuesday, Wednesday" },
                { type: "example", no: "torsdag, fredag, lørdag, søndag", en: "Thursday, Friday, Saturday, Sunday" },
                { type: "p", text: "The four seasons, and asking the time:" },
                { type: "example", no: "vår, sommer, høst, vinter", en: "spring, summer, autumn, winter" },
                { type: "example", no: "Hvor mye er klokka?", en: "What time is it?" }
            ],
            exercises: [
                { type: "mc", prompt: "Which day is 'lørdag'?", options: ["Friday", "Saturday", "Sunday", "Thursday"], answer: 1 },
                { type: "type", prompt: "Type the Norwegian word for 'Monday'.", answer: "mandag", accept: ["mandag"] },
                { type: "mc", prompt: "Which word means 'summer'?", options: ["vår", "sommer", "høst", "vinter"], answer: 1 },
                { type: "trueFalse", claim: "'Hvor mye er klokka?' asks what time it is.", answer: true },
                { type: "type", prompt: "Type the Norwegian word for 'winter'.", answer: "vinter", accept: ["vinter"] },
                { type: "mc", prompt: "Which season is 'høst'?", options: ["spring", "summer", "autumn", "winter"], answer: 2 }
            ]
        },
        {
            id: "nor-44",
            moduleId: "vocabulary",
            moduleTitle: "Everyday Vocabulary",
            title: "Home and City",
            explanation: [
                { type: "p", text: "Vocabulary for talking about where you live." },
                { type: "example", no: "hjem, leilighet, hus", en: "home, apartment, house" },
                { type: "example", no: "rom, kjøkken, bad, soverom", en: "room, kitchen, bathroom, bedroom" },
                { type: "example", no: "by, gate, sentrum", en: "city/town, street, city centre" }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'apartment'?", options: ["hus", "leilighet", "rom", "by"], answer: 1 },
                { type: "type", prompt: "Type the Norwegian word for 'kitchen'.", answer: "kjøkken", accept: ["kjøkken"] },
                { type: "mc", prompt: "Which word means 'bedroom'?", options: ["bad", "kjøkken", "soverom", "rom"], answer: 2 },
                { type: "trueFalse", claim: "'sentrum' means 'city centre'.", answer: true },
                { type: "type", prompt: "Type the Norwegian word for 'street'.", answer: "gate", accept: ["gate"] },
                { type: "mc", prompt: "What does 'by' mean?", options: ["house", "street", "city/town", "room"], answer: 2 }
            ]
        },
        {
            id: "nor-45",
            moduleId: "vocabulary",
            moduleTitle: "Everyday Vocabulary",
            title: "Food and Drinks",
            explanation: [
                { type: "p", text: "Everyday food and mealtime vocabulary." },
                { type: "example", no: "mat, vann, melk", en: "food, water, milk" },
                { type: "example", no: "brød, ost, egg", en: "bread, cheese, egg" },
                { type: "example", no: "kjøtt, fisk", en: "meat, fish" },
                { type: "example", no: "frokost, lunsj, middag", en: "breakfast, lunch, dinner" }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'bread'?", options: ["ost", "brød", "egg", "kjøtt"], answer: 1 },
                { type: "type", prompt: "Type the Norwegian word for 'water'.", answer: "vann", accept: ["vann"] },
                { type: "mc", prompt: "Which word means 'dinner'?", options: ["frokost", "lunsj", "middag", "mat"], answer: 2 },
                { type: "trueFalse", claim: "'ost' means 'cheese'.", answer: true },
                { type: "type", prompt: "Type the Norwegian word for 'fish'.", answer: "fisk", accept: ["fisk"] },
                { type: "mc", prompt: "What does 'frokost' mean?", options: ["lunch", "dinner", "breakfast", "food"], answer: 2 }
            ]
        },
        {
            id: "nor-46",
            moduleId: "vocabulary",
            moduleTitle: "Everyday Vocabulary",
            title: "Work and Studies",
            explanation: [
                { type: "p", text: "Vocabulary for talking about jobs and school." },
                { type: "example", no: "jobb, arbeid, kontor", en: "job, work, office" },
                { type: "example", no: "lærer, student, skole, universitet", en: "teacher, student, school, university" },
                { type: "example", no: "møte, oppgave, å studere", en: "meeting, task/assignment, to study" }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'teacher'?", options: ["student", "lærer", "skole", "jobb"], answer: 1 },
                { type: "type", prompt: "Type the Norwegian word for 'school'.", answer: "skole", accept: ["skole"] },
                { type: "mc", prompt: "Which word means 'meeting'?", options: ["oppgave", "kontor", "møte", "arbeid"], answer: 2 },
                { type: "trueFalse", claim: "'universitet' means 'university'.", answer: true },
                { type: "type", prompt: "Type the Norwegian word for 'office'.", answer: "kontor", accept: ["kontor"] },
                { type: "mc", prompt: "What does 'oppgave' mean?", options: ["office", "meeting", "task/assignment", "job"], answer: 2 }
            ]
        },
        {
            id: "nor-47",
            moduleId: "vocabulary",
            moduleTitle: "Everyday Vocabulary",
            title: "Free Time and Hobbies",
            explanation: [
                { type: "p", text: "Vocabulary for talking about hobbies and leisure time." },
                { type: "example", no: "fritid, hobby", en: "free time, hobby" },
                { type: "example", no: "å spille, å trene, å reise, å male", en: "to play, to work out, to travel, to paint" },
                { type: "example", no: "musikk, film, bok", en: "music, movie, book" }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'free time'?", options: ["hobby", "fritid", "musikk", "film"], answer: 1 },
                { type: "type", prompt: "Type the Norwegian verb for 'to travel'.", answer: "å reise", accept: ["å reise", "reise"] },
                { type: "mc", prompt: "Which word means 'to work out/exercise'?", options: ["å spille", "å trene", "å male", "å lese"], answer: 1 },
                { type: "trueFalse", claim: "'å spille' can mean both 'to play a game' and 'to play an instrument'.", answer: true },
                { type: "type", prompt: "Type the Norwegian word for 'movie'.", answer: "film", accept: ["film"] },
                { type: "mc", prompt: "What does 'å male' mean?", options: ["to paint", "to play", "to read", "to travel"], answer: 0 }
            ]
        },
        {
            id: "nor-48",
            moduleId: "vocabulary",
            moduleTitle: "Everyday Vocabulary",
            title: "Technology and the Internet",
            explanation: [
                { type: "p", text: "Vocabulary for talking about computers and getting online." },
                { type: "example", no: "datamaskin, mobil, skjerm", en: "computer, phone, screen" },
                { type: "example", no: "internett, nettside, app", en: "internet, website, app" },
                { type: "example", no: "e-post, passord", en: "email, password" },
                { type: "example", no: "å laste ned, å søke", en: "to download, to search" }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'computer'?", options: ["mobil", "datamaskin", "skjerm", "app"], answer: 1 },
                { type: "type", prompt: "Type the Norwegian word for 'email'.", answer: "e-post", accept: ["e-post", "epost"] },
                { type: "mc", prompt: "Which word means 'password'?", options: ["nettside", "passord", "internett", "skjerm"], answer: 1 },
                { type: "trueFalse", claim: "'å søke' means 'to search'.", answer: true },
                { type: "type", prompt: "Type the Norwegian verb for 'to download'.", answer: "å laste ned", accept: ["å laste ned", "laste ned"] },
                { type: "mc", prompt: "What does 'skjerm' mean?", options: ["screen", "phone", "app", "website"], answer: 0 }
            ]
        },
        {
            id: "nor-49",
            moduleId: "vocabulary",
            moduleTitle: "Everyday Vocabulary",
            title: "Shopping and Money",
            explanation: [
                { type: "p", text: "Vocabulary for shopping and handling money." },
                { type: "example", no: "å kjøpe, å selge, å betale", en: "to buy, to sell, to pay" },
                { type: "example", no: "butikk, penger, pris", en: "store/shop, money, price" },
                { type: "example", no: "billig, dyr", en: "cheap, expensive" },
                { type: "example", no: "kvittering, kort, kontant", en: "receipt, card, cash" }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'to buy'?", options: ["å selge", "å kjøpe", "å betale", "å søke"], answer: 1 },
                { type: "type", prompt: "Type the Norwegian word for 'money'.", answer: "penger", accept: ["penger"] },
                { type: "mc", prompt: "Which word means 'expensive'?", options: ["billig", "dyr", "penger", "kort"], answer: 1 },
                { type: "trueFalse", claim: "'billig' means 'cheap'.", answer: true },
                { type: "type", prompt: "Type the Norwegian word for 'receipt'.", answer: "kvittering", accept: ["kvittering"] },
                { type: "mc", prompt: "What does 'å betale' mean?", options: ["to buy", "to sell", "to pay", "to search"], answer: 2 }
            ]
        },

        // ── Module 8: Real-Life Communication ────────────────────────────
        {
            id: "nor-50",
            moduleId: "communication",
            moduleTitle: "Real-Life Communication",
            title: "Asking and Giving Personal Information",
            explanation: [
                { type: "p", text: "The most common get-to-know-you questions." },
                { type: "example", no: "Hva heter du?", en: "What's your name?" },
                { type: "example", no: "Hvor gammel er du?", en: "How old are you?" },
                { type: "example", no: "Hvor bor du? / Hva jobber du med?", en: "Where do you live? / What do you do for work?" },
                { type: "example", no: "Jeg er tjue år gammel.", en: "I am twenty years old." }
            ],
            exercises: [
                { type: "mc", prompt: "What does 'Hvor gammel er du?' ask?", options: ["What's your name?", "How old are you?", "Where do you live?", "What do you do?"], answer: 1 },
                { type: "type", prompt: "Complete: 'Jeg er tjue år ___.' (I am twenty years old.)", answer: "gammel", accept: ["gammel"] },
                { type: "mc", prompt: "Which question asks about someone's job?", options: ["Hva heter du?", "Hvor bor du?", "Hva jobber du med?", "Hvor gammel er du?"], answer: 2 },
                { type: "trueFalse", claim: "'Hvor bor du?' asks where you live.", answer: true },
                { type: "type", prompt: "Type the Norwegian question for 'What's your name?'.", answer: "hva heter du", accept: ["hva heter du", "Hva heter du?"] },
                { type: "mc", prompt: "How would you answer 'I am 30 years old'?", options: ["Jeg har tretti år.", "Jeg er tretti år gammel.", "Jeg bor tretti år.", "Jeg heter tretti år."], answer: 1 }
            ]
        },
        {
            id: "nor-51",
            moduleId: "communication",
            moduleTitle: "Real-Life Communication",
            title: "Asking for Directions and Getting Around",
            explanation: [
                { type: "p", text: "Phrases for finding your way around." },
                { type: "example", no: "Hvor er...?", en: "Where is...?" },
                { type: "example", no: "til venstre, til høyre, rett fram", en: "to the left, to the right, straight ahead" },
                { type: "example", no: "Hvordan kommer jeg til...?", en: "How do I get to...?" },
                { type: "example", no: "buss, tog", en: "bus, train" }
            ],
            exercises: [
                { type: "mc", prompt: "Which phrase means 'to the left'?", options: ["til høyre", "til venstre", "rett fram", "til byen"], answer: 1 },
                { type: "type", prompt: "Type the Norwegian phrase for 'straight ahead'.", answer: "rett fram", accept: ["rett fram"] },
                { type: "mc", prompt: "Which word means 'train'?", options: ["buss", "tog", "bil", "fly"], answer: 1 },
                { type: "trueFalse", claim: "'Hvordan kommer jeg til...?' asks how to get somewhere.", answer: true },
                { type: "type", prompt: "Type the Norwegian phrase for 'Where is...?'.", answer: "hvor er", accept: ["hvor er"] },
                { type: "mc", prompt: "Which word means 'to the right'?", options: ["til venstre", "til høyre", "rett fram", "der borte"], answer: 1 }
            ]
        },
        {
            id: "nor-52",
            moduleId: "communication",
            moduleTitle: "Real-Life Communication",
            title: "Shopping at a Store or Supermarket",
            explanation: [
                { type: "p", text: "Phrases you'll hear and use while shopping." },
                { type: "example", no: "Kan jeg hjelpe deg?", en: "Can I help you?" },
                { type: "example", no: "Jeg ser bare.", en: "I'm just looking." },
                { type: "example", no: "Hvor finner jeg...?", en: "Where do I find...?" },
                { type: "example", no: "handlekurv, kasse", en: "shopping basket, checkout" }
            ],
            exercises: [
                { type: "mc", prompt: "What does 'Kan jeg hjelpe deg?' mean?", options: ["Can I help you?", "Can you help me?", "Where is it?", "How much is it?"], answer: 0 },
                { type: "type", prompt: "Type the Norwegian phrase for 'I'm just looking'.", answer: "jeg ser bare", accept: ["jeg ser bare"] },
                { type: "mc", prompt: "Which word means 'checkout'?", options: ["handlekurv", "kasse", "kvittering", "butikk"], answer: 1 },
                { type: "trueFalse", claim: "'Har du...?' means 'Do you have...?'", answer: true },
                { type: "type", prompt: "Type the Norwegian word for 'shopping basket'.", answer: "handlekurv", accept: ["handlekurv"] },
                { type: "mc", prompt: "Which phrase asks where to find something?", options: ["Hvor finner jeg...?", "Hvor bor du?", "Hvordan har du det?", "Hva koster det?"], answer: 0 }
            ]
        },
        {
            id: "nor-53",
            moduleId: "communication",
            moduleTitle: "Real-Life Communication",
            title: "Ordering Food and Drinks",
            explanation: [
                { type: "p", text: "Phrases for restaurants and cafés." },
                { type: "example", no: "Jeg vil gjerne ha...", en: "I would like..." },
                { type: "example", no: "Kan jeg få...?", en: "Can I get/have...?" },
                { type: "example", no: "meny, regningen, takk", en: "menu, the bill, please" },
                { type: "example", no: "Er det plass til to?", en: "Is there room for two?" }
            ],
            exercises: [
                { type: "mc", prompt: "How do you say 'I would like...'?", options: ["Jeg vil gjerne ha...", "Jeg heter...", "Jeg kommer fra...", "Jeg bor..."], answer: 0 },
                { type: "type", prompt: "Type the Norwegian phrase for 'Can I get/have...?'.", answer: "kan jeg få", accept: ["kan jeg få"] },
                { type: "mc", prompt: "Which word means 'menu'?", options: ["regning", "meny", "kvittering", "kasse"], answer: 1 },
                { type: "trueFalse", claim: "'Regningen, takk' means 'The bill, please'.", answer: true },
                { type: "type", prompt: "Type the Norwegian phrase asking if there's room for two.", answer: "er det plass til to", accept: ["er det plass til to"] },
                { type: "mc", prompt: "What does 'Smaker det godt?' mean?", options: ["Is it expensive?", "Does it taste good?", "Is it ready?", "Do you like it?"], answer: 1 }
            ]
        },
        {
            id: "nor-54",
            moduleId: "communication",
            moduleTitle: "Real-Life Communication",
            title: "Talking about the Weather",
            explanation: [
                { type: "p", text: "Small talk about the weather is as common in Norway as anywhere." },
                { type: "example", no: "Hvordan er været?", en: "How's the weather?" },
                { type: "example", no: "Det er sol. / Det regner. / Det snør.", en: "It's sunny. / It's raining. / It's snowing." },
                { type: "example", no: "Det er kaldt. / Det er varmt.", en: "It's cold. / It's warm." },
                { type: "example", no: "vind, sky", en: "wind, cloud" }
            ],
            exercises: [
                { type: "mc", prompt: "What does 'Hvordan er været?' ask?", options: ["What time is it?", "How's the weather?", "Where are you?", "How are you?"], answer: 1 },
                { type: "type", prompt: "Type the Norwegian phrase for 'It's snowing'.", answer: "det snør", accept: ["det snør"] },
                { type: "mc", prompt: "Which word means 'wind'?", options: ["sky", "vind", "sol", "regn"], answer: 1 },
                { type: "trueFalse", claim: "'Det er sol' means 'It's sunny'.", answer: true },
                { type: "type", prompt: "Type the Norwegian phrase for 'It's cold'.", answer: "det er kaldt", accept: ["det er kaldt"] },
                { type: "mc", prompt: "Which word means 'cloud'?", options: ["sky", "vind", "sol", "snø"], answer: 0 }
            ]
        },
        {
            id: "nor-55",
            moduleId: "communication",
            moduleTitle: "Real-Life Communication",
            title: "Describing Your Daily Routine",
            explanation: [
                { type: "p", text: "Verbs for describing a typical day, roughly in order." },
                { type: "example", no: "å våkne, å stå opp, å dusje", en: "to wake up, to get up, to shower" },
                { type: "example", no: "å spise frokost, å dra på jobb", en: "to eat breakfast, to head to work" },
                { type: "example", no: "å komme hjem, å legge seg", en: "to come home, to go to bed" }
            ],
            exercises: [
                { type: "mc", prompt: "Which verb means 'to wake up'?", options: ["å stå opp", "å våkne", "å dusje", "å legge seg"], answer: 1 },
                { type: "type", prompt: "Type the Norwegian verb phrase for 'to go to bed'.", answer: "å legge seg", accept: ["å legge seg", "legge seg"] },
                { type: "mc", prompt: "Which verb means 'to get up'?", options: ["å våkne", "å stå opp", "å dra", "å dusje"], answer: 1 },
                { type: "trueFalse", claim: "'å legge seg' is a reflexive verb phrase.", answer: true },
                { type: "type", prompt: "Type the Norwegian phrase for 'to head to work'.", answer: "å dra på jobb", accept: ["å dra på jobb", "dra på jobb"] },
                { type: "mc", prompt: "What does 'å komme hjem' mean?", options: ["to leave home", "to come home", "to go to work", "to wake up"], answer: 1 }
            ]
        },
        {
            id: "nor-56",
            moduleId: "communication",
            moduleTitle: "Real-Life Communication",
            title: "Expressing Preferences and Opinions",
            explanation: [
                { type: "p", text: "Phrases for saying what you like and think." },
                { type: "example", no: "Jeg liker... / Jeg liker ikke...", en: "I like... / I don't like..." },
                { type: "example", no: "Jeg foretrekker...", en: "I prefer..." },
                { type: "example", no: "Jeg synes...", en: "I think/feel..." },
                { type: "example", no: "Jeg er enig. / Jeg er uenig.", en: "I agree. / I disagree." }
            ],
            exercises: [
                { type: "mc", prompt: "How do you say 'I prefer...'?", options: ["Jeg liker...", "Jeg foretrekker...", "Jeg synes...", "Jeg er enig..."], answer: 1 },
                { type: "type", prompt: "Type the Norwegian phrase for 'I agree'.", answer: "jeg er enig", accept: ["jeg er enig"] },
                { type: "mc", prompt: "Which phrase means 'I think/feel that...' (opinion)?", options: ["Jeg liker...", "Jeg synes...", "Jeg foretrekker...", "Jeg er uenig..."], answer: 1 },
                { type: "trueFalse", claim: "'Jeg er uenig' means 'I disagree'.", answer: true },
                { type: "type", prompt: "Type the Norwegian phrase for 'I don't like...'.", answer: "jeg liker ikke", accept: ["jeg liker ikke"] },
                { type: "mc", prompt: "What does 'Jeg foretrekker te' mean?", options: ["I like tea", "I don't like tea", "I prefer tea", "I think tea"], answer: 2 }
            ]
        },
        {
            id: "nor-57",
            moduleId: "communication",
            moduleTitle: "Real-Life Communication",
            title: "Making Suggestions and Invitations",
            explanation: [
                { type: "p", text: "Phrases for proposing plans and inviting people along." },
                { type: "example", no: "Skal vi...?", en: "Shall we...?" },
                { type: "example", no: "Vil du bli med? / Har du lyst til...?", en: "Do you want to come along? / Do you feel like...?" },
                { type: "example", no: "Kanskje vi kan...?", en: "Maybe we could...?" },
                { type: "example", no: "Det høres bra ut. / Gjerne!", en: "That sounds good. / Gladly!" }
            ],
            exercises: [
                { type: "mc", prompt: "How do you say 'Shall we...?' when suggesting something?", options: ["Vil du bli med?", "Skal vi...?", "Har du lyst til...?", "Gjerne!"], answer: 1 },
                { type: "type", prompt: "Type the Norwegian phrase for 'That sounds good'.", answer: "det høres bra ut", accept: ["det høres bra ut"] },
                { type: "mc", prompt: "Which phrase invites someone along?", options: ["Vil du bli med?", "Skal vi...?", "Jeg synes...", "Jeg er enig"], answer: 0 },
                { type: "trueFalse", claim: "'Gjerne!' means 'Gladly!' or 'Sure!'", answer: true },
                { type: "type", prompt: "Type the Norwegian phrase for 'Do you feel like...?'.", answer: "har du lyst til", accept: ["har du lyst til"] },
                { type: "mc", prompt: "What does 'Kanskje vi kan...?' mean?", options: ["Shall we...?", "Maybe we could...?", "Do you want to...?", "That sounds good"], answer: 1 }
            ]
        },
        {
            id: "nor-58",
            moduleId: "communication",
            moduleTitle: "Real-Life Communication",
            title: "Talking about Future Plans",
            explanation: [
                { type: "p", text: "Phrases for talking about what's coming up." },
                { type: "example", no: "Hva skal du gjøre i morgen?", en: "What are you going to do tomorrow?" },
                { type: "example", no: "Jeg skal reise til...", en: "I'm going to travel to..." },
                { type: "example", no: "Jeg har planer om å...", en: "I have plans to..." },
                { type: "example", no: "om en uke, neste år", en: "in a week, next year" }
            ],
            exercises: [
                { type: "mc", prompt: "What does 'Hva skal du gjøre i morgen?' ask?", options: ["What did you do yesterday?", "What are you going to do tomorrow?", "What do you do for work?", "Where do you live?"], answer: 1 },
                { type: "type", prompt: "Type the Norwegian phrase for 'in a week'.", answer: "om en uke", accept: ["om en uke"] },
                { type: "mc", prompt: "Which phrase means 'next year'?", options: ["i morgen", "om en uke", "neste år", "i dag"], answer: 2 },
                { type: "trueFalse", claim: "'Jeg har planer om å...' means 'I have plans to...'", answer: true },
                { type: "type", prompt: "Complete: 'Jeg ___ reise til Norge.' (I'm going to travel to Norway.)", answer: "skal", accept: ["skal"], hint: "å skulle" },
                { type: "mc", prompt: "Which phrase expresses a tentative future intention, 'Maybe I will...'?", options: ["Jeg skal...", "Jeg har planer om å...", "Kanskje jeg vil...", "Jeg foretrekker..."], answer: 2 }
            ]
        }
    ]
};

// Additive merge (not a plain assignment) so this and decks/lessons-swedish.js
// can load in either order without one clobbering the other's course.
if (typeof window !== "undefined") window.POLYTYPE_LESSONS = Object.assign(window.POLYTYPE_LESSONS || {}, LESSONS_DATA);
if (typeof module !== "undefined" && module.exports) module.exports = LESSONS_DATA;
