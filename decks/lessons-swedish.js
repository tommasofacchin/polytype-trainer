// Swedish "Lessons" curriculum - a hand-authored sequence of short
// grammar/vocab lessons, the Swedish counterpart of decks/lessons-norwegian.js.
// Same data shape and the same dual-export contract, so js/lessons.js,
// js/router.js and api/_lib.js can treat every language's lessons uniformly.
//
// Ships the full 8-module curriculum (58 lessons): Grammar Foundations,
// Numbers, Nouns, Adjectives, Verbs, Sentence Structure, Everyday Vocabulary,
// and Real-Life Communication - mirroring the Norwegian curriculum's structure.
// Further lessons can be appended here without touching any wiring.
//
// Swedish differs from Norwegian in ways the content reflects: two noun
// genders (en / ett, no separate feminine), the infinitive marker "att"
// (not "å"), and the "supine" form used to build the present perfect.
//
// Lesson order in the array IS the unlock order - a lesson at array index i
// is playable once profile.courses.swedish.lessonsCompleted.length >= i.
// id values ("swe-NN") must stay stable and never be reordered or reused once
// shipped, since they're stored (as completed) in player profiles.
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
// Example rows use { type: "example", sv: "...", en: "..." }.

const SWEDISH_LESSONS_DATA = {
    swedish: [
        // ── Module 1: Grammar Foundations ────────────────────────────────
        {
            id: "swe-01",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "Alphabet, Sounds & Stress",
            explanation: [
                { type: "p", text: "Swedish uses the same 26 letters as English, plus three extra vowels at the very end of the alphabet: å, ä, and ö. They're full letters with their own sounds, not accented versions of a or o." },
                { type: "p", text: "å sounds like the 'o' in 'more'. ä sounds like the 'e' in 'bed' (close to the 'a' in 'cat'). ö sounds like the 'i' in 'bird' (similar to German ö or French eu)." },
                { type: "example", sv: "hej", en: "hi" },
                { type: "example", sv: "tack", en: "thanks" },
                { type: "p", text: "Stress usually falls on the first syllable of a word, and Swedish is mostly pronounced close to how it's spelled." },
                { type: "example", sv: "syster", en: "sister" },
                { type: "example", sv: "bär", en: "berry" },
                { type: "example", sv: "år", en: "year" }
            ],
            exercises: [
                { type: "mc", prompt: "Which letter is NOT one of Swedish's three extra vowels?", options: ["å", "ä", "ö", "ü"], answer: 3 },
                { type: "trueFalse", claim: "The Swedish letter 'å' sounds like the 'o' in 'more'.", answer: true },
                { type: "mc", prompt: "Where does stress usually fall in a Swedish word?", options: ["On the last syllable", "On the first syllable", "It's random", "Swedish words aren't stressed"], answer: 1 },
                { type: "type", prompt: "Type the Swedish word for 'hi'.", answer: "hej", accept: ["hej"] },
                { type: "trueFalse", claim: "'ö' sounds similar to the German 'ö'.", answer: true },
                { type: "mc", prompt: "Which word means 'thanks'?", options: ["hej", "tack", "ja", "nej"], answer: 1 }
            ]
        },
        {
            id: "swe-02",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "Subject Pronouns",
            explanation: [
                { type: "p", text: "Subject pronouns are the 'doer' of a sentence - the one performing the action." },
                { type: "example", sv: "jag", en: "I" },
                { type: "example", sv: "du", en: "you (singular)" },
                { type: "example", sv: "han / hon", en: "he / she" },
                { type: "example", sv: "den / det", en: "it (den for en-words, det for ett-words)" },
                { type: "example", sv: "vi", en: "we" },
                { type: "example", sv: "ni", en: "you (plural)" },
                { type: "example", sv: "de", en: "they (pronounced 'dom')" },
                { type: "p", text: "Swedish verbs don't change to match the pronoun the way English 'am/is/are' does - the next lessons show just how simple that makes things." }
            ],
            exercises: [
                { type: "mc", prompt: "Which pronoun means 'I'?", options: ["du", "jag", "vi", "de"], answer: 1 },
                { type: "mc", prompt: "Which pronoun means 'they'?", options: ["de", "ni", "den", "det"], answer: 0 },
                { type: "trueFalse", claim: "'du' means 'you' (singular).", answer: true },
                { type: "type", prompt: "Type the Swedish word for 'we'.", answer: "vi", accept: ["vi"] },
                { type: "mc", prompt: "Which pronoun would you use for a neuter (ett-) word standing in for 'it'?", options: ["den", "det", "han", "hon"], answer: 1 },
                { type: "trueFalse", claim: "'ni' means 'you' when speaking to more than one person.", answer: true }
            ]
        },
        {
            id: "swe-03",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "Object Pronouns",
            explanation: [
                { type: "p", text: "Object pronouns are used when the pronoun receives the action - for example, after a verb." },
                { type: "example", sv: "mig", en: "me" },
                { type: "example", sv: "dig", en: "you (singular, object)" },
                { type: "example", sv: "honom / henne", en: "him / her" },
                { type: "example", sv: "oss", en: "us" },
                { type: "example", sv: "er", en: "you (plural, object)" },
                { type: "example", sv: "dem", en: "them (pronounced 'dom')" },
                { type: "p", text: "'den' and 'det' (it) look exactly the same whether they're the subject or the object." },
                { type: "example", sv: "Jag ser dig.", en: "I see you." },
                { type: "example", sv: "Hon känner mig.", en: "She knows me." }
            ],
            exercises: [
                { type: "mc", prompt: "Which is the object form of 'jag' (I)?", options: ["mig", "dig", "oss", "dem"], answer: 0 },
                { type: "mc", prompt: "'Jag ser ___.' (I see her.) Which word fits?", options: ["hon", "henne", "hennes", "sig"], answer: 1 },
                { type: "trueFalse", claim: "'oss' means 'us'.", answer: true },
                { type: "type", prompt: "Type the Swedish object pronoun for 'them'.", answer: "dem", accept: ["dem"] },
                { type: "mc", prompt: "Which pronoun looks the same as both subject and object?", options: ["jag / mig", "han / honom", "den / den", "hon / henne"], answer: 2 },
                { type: "type", prompt: "Complete: 'Hon känner ___.' (She knows me.)", answer: "mig", accept: ["mig"] }
            ]
        },
        {
            id: "swe-04",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "Reflexive Pronouns",
            explanation: [
                { type: "p", text: "Reflexive pronouns show that the subject and the object of a sentence are the same person - like English 'myself', 'yourself'." },
                { type: "example", sv: "Jag tvättar mig.", en: "I wash myself." },
                { type: "example", sv: "Du tvättar dig.", en: "You wash yourself." },
                { type: "example", sv: "Han tvättar sig.", en: "He washes himself." },
                { type: "example", sv: "De tvättar sig.", en: "They wash themselves." },
                { type: "p", text: "1st and 2nd person reflexives (mig, dig, oss, er) look just like the object pronouns - but the 3rd person reflexive is always 'sig', whether it's 'he', 'she', 'it', or 'they'." }
            ],
            exercises: [
                { type: "mc", prompt: "Which reflexive pronoun is used for 'han', 'hon' and 'de' alike?", options: ["honom", "sig", "dem", "henne"], answer: 1 },
                { type: "trueFalse", claim: "'Jag tvättar mig' means 'I wash myself'.", answer: true },
                { type: "mc", prompt: "Complete: 'De tvättar ___.' (They wash themselves.)", options: ["dem", "sig", "oss", "er"], answer: 1 },
                { type: "type", prompt: "Type the reflexive pronoun for 'yourself' (singular).", answer: "dig", accept: ["dig"] },
                { type: "trueFalse", claim: "The 3rd person reflexive pronoun changes depending on whether the subject is 'han' or 'hon'.", answer: false },
                { type: "mc", prompt: "Which sentence correctly says 'She washes herself'?", options: ["Hon tvättar henne.", "Hon tvättar sig.", "Hon tvättar hon.", "Hon tvättar dig."], answer: 1 }
            ]
        },
        {
            id: "swe-05",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "Possessive Pronouns",
            explanation: [
                { type: "p", text: "Possessive pronouns show ownership. Many of them change form to match the noun they describe (an en-word or an ett-word) or whether it's plural." },
                { type: "example", sv: "min bil", en: "my car (en-word)" },
                { type: "example", sv: "mitt hus", en: "my house (ett-word)" },
                { type: "example", sv: "mina böcker", en: "my books (plural)" },
                { type: "p", text: "Third-person possessives like 'hans' (his), 'hennes' (her/hers) and 'deras' (their) never change form, no matter the noun." },
                { type: "example", sv: "hans bil / hans hus", en: "his car / his house" },
                { type: "example", sv: "hennes bil / hennes hus", en: "her car / her house" },
                { type: "example", sv: "vår bil, vårt hus, våra böcker", en: "our car, our house, our books" }
            ],
            exercises: [
                { type: "mc", prompt: "Which form of 'my' goes with an ett-word like 'hus' (house)?", options: ["min", "mitt", "mina", "mig"], answer: 1 },
                { type: "mc", prompt: "Which form of 'my' is used with plural nouns, like 'böcker' (books)?", options: ["min", "mitt", "mina", "mig"], answer: 2 },
                { type: "trueFalse", claim: "'hans' (his) changes form depending on the noun.", answer: false },
                { type: "type", prompt: "Type the Swedish word for 'her/hers'.", answer: "hennes", accept: ["hennes"] },
                { type: "mc", prompt: "Which is correct for 'our house'?", options: ["vår hus", "vårt hus", "våra hus", "vårs hus"], answer: 1 },
                { type: "type", prompt: "Type the correct form: '___ bil' for 'my car' (en-word).", answer: "min", accept: ["min"] }
            ]
        },
        {
            id: "swe-06",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "The Verb att vara (to be) - Present Tense",
            explanation: [
                { type: "p", text: "Swedish verbs are wonderfully simple: they have exactly ONE present-tense form, no matter who's doing the action. 'att vara' (to be) becomes 'är' for everyone." },
                { type: "example", sv: "Jag är glad.", en: "I am happy." },
                { type: "example", sv: "Du är glad.", en: "You are happy." },
                { type: "example", sv: "Hon är glad.", en: "She is happy." },
                { type: "example", sv: "De är glada.", en: "They are happy." },
                { type: "p", text: "The 'att' in front of a verb marks the infinitive (the dictionary form), just like 'to' in English 'to be'. You'll see 'att' whenever a verb is listed on its own." }
            ],
            exercises: [
                { type: "mc", prompt: "What is the present tense of 'att vara' (to be) for 'jag' (I)?", options: ["var", "är", "vara", "varit"], answer: 1 },
                { type: "trueFalse", claim: "Swedish present-tense verbs change form depending on who's doing the action.", answer: false },
                { type: "mc", prompt: "How do you say 'You are happy' (singular)?", options: ["Du var glad.", "Du är glad.", "Du vara glad.", "Du glad är."], answer: 1 },
                { type: "type", prompt: "Type the present-tense form of 'att vara' used for every subject.", answer: "är", accept: ["är"] },
                { type: "mc", prompt: "What does 'att' mark at the start of a verb like 'att vara'?", options: ["Past tense", "The infinitive (dictionary form)", "A question", "Plural"], answer: 1 },
                { type: "type", prompt: "Complete: 'De ___ glada.' (They are happy.)", answer: "är", accept: ["är"], hint: "att vara" }
            ]
        },
        {
            id: "swe-07",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "The Verb att ha (to have) - Present Tense",
            explanation: [
                { type: "p", text: "Just like 'att vara', the verb 'att ha' (to have) has one single present-tense form for every subject: 'har'." },
                { type: "example", sv: "Jag har en bil.", en: "I have a car." },
                { type: "example", sv: "Hon har två barn.", en: "She has two children." },
                { type: "example", sv: "De har tid.", en: "They have time." },
                { type: "p", text: "'har' also combines with another verb to build the present perfect (e.g. 'har ätit' - 'have eaten') - you'll meet that in the Verbs module." }
            ],
            exercises: [
                { type: "mc", prompt: "What is the present tense of 'att ha' (to have)?", options: ["har", "hade", "ha", "haft"], answer: 0 },
                { type: "type", prompt: "Type: 'Jag ___ en bil.' (I have a car.)", answer: "har", accept: ["har"], hint: "att ha" },
                { type: "trueFalse", claim: "'har' changes form depending on the subject (jag har vs. hon har).", answer: false },
                { type: "mc", prompt: "How do you say 'They have time'?", options: ["De har tid.", "De är tid.", "De ha tid.", "Ni har tid."], answer: 0 },
                { type: "mc", prompt: "Which verb form later combines with 'har' to form the present perfect (e.g. 'have eaten')?", options: ["the infinitive", "the supine", "the imperative", "the plural"], answer: 1 },
                { type: "type", prompt: "Type the Swedish infinitive for 'to have'.", answer: "att ha", accept: ["att ha", "ha"] }
            ]
        },
        {
            id: "swe-08",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "Common Present-Tense Verbs",
            explanation: [
                { type: "p", text: "Most Swedish verbs form their present tense so that it ends in '-r' - usually by adding '-ar' or '-er' to the stem." },
                { type: "example", sv: "att gå → går", en: "to go/walk → go(es)/walk(s)" },
                { type: "example", sv: "att bo → bor", en: "to live (reside) → live(s)" },
                { type: "example", sv: "att komma → kommer", en: "to come → come(s)" },
                { type: "example", sv: "att gilla → gillar", en: "to like → like(s)" },
                { type: "example", sv: "att göra → gör", en: "to do/make → do(es)/make(s)" },
                { type: "p", text: "Remember: this single form works for every subject - 'jag går', 'du går' and 'de går' are all the exact same verb form." },
                { type: "example", sv: "Jag bor i Stockholm.", en: "I live in Stockholm." },
                { type: "example", sv: "Hon gillar kaffe.", en: "She likes coffee." }
            ],
            exercises: [
                { type: "mc", prompt: "What is the present tense of 'att gå' (to go)?", options: ["gå", "går", "gick", "gått"], answer: 1 },
                { type: "type", prompt: "Type the present tense of 'att bo' (to live/reside).", answer: "bor", accept: ["bor"] },
                { type: "mc", prompt: "How do you say 'She likes coffee'?", options: ["Hon gilla kaffe.", "Hon gillar kaffe.", "Hon giller kaffe.", "Hon att gilla kaffe."], answer: 1 },
                { type: "trueFalse", claim: "A Swedish present-tense verb has the same form for every subject.", answer: true },
                { type: "mc", prompt: "What is the present tense of 'att komma' (to come)?", options: ["komma", "kom", "kommer", "kommit"], answer: 2 },
                { type: "type", prompt: "Complete: 'Jag ___ i Stockholm.' (I live in Stockholm.)", answer: "bor", accept: ["bor"], hint: "att bo" }
            ]
        },
        {
            id: "swe-09",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "Negation with inte and aldrig",
            explanation: [
                { type: "p", text: "To negate a sentence, place 'inte' (not) right after the finite (conjugated) verb." },
                { type: "example", sv: "Jag gillar inte fisk.", en: "I don't like fish." },
                { type: "example", sv: "Hon är inte hemma.", en: "She isn't home." },
                { type: "p", text: "'aldrig' (never) works exactly the same way, in the same position." },
                { type: "example", sv: "Han äter aldrig kött.", en: "He never eats meat." },
                { type: "p", text: "Unlike English, Swedish doesn't need a helper word like 'do' to negate - the main verb simply gets 'inte' placed right after it." }
            ],
            exercises: [
                { type: "mc", prompt: "Where does 'inte' go in a Swedish sentence?", options: ["Before the subject", "Right after the finite verb", "Always at the very end", "Before the verb"], answer: 1 },
                { type: "type", prompt: "Type the Swedish word for 'not'.", answer: "inte", accept: ["inte"] },
                { type: "mc", prompt: "How do you say 'I don't like fish'?", options: ["Jag inte gillar fisk.", "Jag gillar inte fisk.", "Jag gillar fisk inte.", "Inte jag gillar fisk."], answer: 1 },
                { type: "type", prompt: "Type the Swedish word for 'never'.", answer: "aldrig", accept: ["aldrig"] },
                { type: "trueFalse", claim: "Swedish needs a helper word like English 'do' to form a negative sentence.", answer: false },
                { type: "mc", prompt: "How do you say 'He never eats meat'?", options: ["Han aldrig äter kött.", "Han äter aldrig kött.", "Han äter kött aldrig.", "Aldrig han äter kött."], answer: 1 }
            ]
        },
        {
            id: "swe-10",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "Yes/No Questions",
            explanation: [
                { type: "p", text: "To turn a statement into a yes/no question, simply swap the order of the verb and the subject." },
                { type: "example", sv: "Du är glad. → Är du glad?", en: "You are happy. → Are you happy?" },
                { type: "example", sv: "Hon bor i Stockholm. → Bor hon i Stockholm?", en: "She lives in Stockholm. → Does she live in Stockholm?" },
                { type: "p", text: "No extra helper word (like English 'do/does') is needed - the verb just moves to the front, before the subject." }
            ],
            exercises: [
                { type: "mc", prompt: "How do you turn 'Du är glad' into a question?", options: ["Du är glad?", "Är du glad?", "Glad är du?", "Är glad du?"], answer: 1 },
                { type: "trueFalse", claim: "Swedish yes/no questions need a helper word like 'do' or 'does'.", answer: false },
                { type: "mc", prompt: "What is the question form of 'Hon bor i Stockholm' (She lives in Stockholm)?", options: ["Hon bor i Stockholm?", "Bor Stockholm hon i?", "Bor hon i Stockholm?", "I Stockholm bor hon?"], answer: 2 },
                { type: "type", prompt: "Turn into a question: 'Du gillar kaffe.' → ___ du kaffe?", answer: "Gillar", accept: ["Gillar", "gillar"] },
                { type: "mc", prompt: "What's the general rule for forming a yes/no question in Swedish?", options: ["Add 'gör' at the start", "Swap the verb and subject order", "Just add a question mark", "Move the object to the front"], answer: 1 },
                { type: "type", prompt: "Question form of 'De är hemma.' (They are home.) → ___ de hemma?", answer: "Är", accept: ["Är", "är"] }
            ]
        },
        {
            id: "swe-11",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "Question Words",
            explanation: [
                { type: "p", text: "These six question words cover most of what you'll ever need to ask." },
                { type: "example", sv: "vad", en: "what" },
                { type: "example", sv: "var", en: "where" },
                { type: "example", sv: "när", en: "when" },
                { type: "example", sv: "varför", en: "why" },
                { type: "example", sv: "hur", en: "how" },
                { type: "example", sv: "vem", en: "who" },
                { type: "p", text: "Just like yes/no questions, the verb comes right after the question word, then the subject." },
                { type: "example", sv: "Vad heter du?", en: "What are you called? (What's your name?)" },
                { type: "example", sv: "Var bor du?", en: "Where do you live?" }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'where'?", options: ["vad", "var", "när", "vem"], answer: 1 },
                { type: "mc", prompt: "Which word means 'why'?", options: ["hur", "varför", "vem", "vad"], answer: 1 },
                { type: "type", prompt: "Type the Swedish word for 'who'.", answer: "vem", accept: ["vem"] },
                { type: "mc", prompt: "'Vad heter du?' is asking...", options: ["Where do you live?", "What is your name?", "How are you?", "When do you arrive?"], answer: 1 },
                { type: "trueFalse", claim: "'hur' means 'how'.", answer: true },
                { type: "type", prompt: "Complete: '___ bor du?' (Where do you live?)", answer: "Var", accept: ["Var", "var"] }
            ]
        },
        {
            id: "swe-12",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "Short Answers: ja and nej",
            explanation: [
                { type: "p", text: "'ja' means yes, and 'nej' means no - the simplest possible answers." },
                { type: "example", sv: "ja", en: "yes" },
                { type: "example", sv: "nej", en: "no" },
                { type: "p", text: "There's a special third word, 'jo', used instead of 'ja' to contradict a negative question - for example, to answer 'yes' when someone asks 'Don't you...?'" },
                { type: "example", sv: "Gillar du inte fisk? – Jo, jag gillar fisk!", en: "Don't you like fish? – Yes I do (I like fish)!" }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'no'?", options: ["ja", "nej", "jo", "inte"], answer: 1 },
                { type: "type", prompt: "Type the Swedish word for 'yes'.", answer: "ja", accept: ["ja"] },
                { type: "trueFalse", claim: "'jo' is used to answer 'yes' to a negative question.", answer: true },
                { type: "mc", prompt: "How would you answer 'yes, I do' to 'Gillar du inte fisk?' (Don't you like fish?)", options: ["Ja, jag gillar fisk.", "Nej, jag gillar fisk.", "Jo, jag gillar fisk.", "Inte, jag gillar fisk."], answer: 2 },
                { type: "type", prompt: "Type the Swedish word for 'no'.", answer: "nej", accept: ["nej"] },
                { type: "trueFalse", claim: "'ja' is used the same way as 'jo' in every situation.", answer: false }
            ]
        },

        // ── Module 2: Numbers ────────────────────────────────────────────
        {
            id: "swe-13",
            moduleId: "numbers",
            moduleTitle: "Numbers",
            title: "Numbers 0-10",
            explanation: [
                { type: "p", text: "Swedish numbers 0 to 10 are essential building blocks - you'll combine them constantly." },
                { type: "example", sv: "noll, ett, två, tre, fyra", en: "0, 1, 2, 3, 4" },
                { type: "example", sv: "fem, sex, sju, åtta, nio, tio", en: "5, 6, 7, 8, 9, 10" },
                { type: "p", text: "The number 1 has two forms: 'en' with en-words, 'ett' with ett-words. Counting on its own, it's 'ett'." },
                { type: "example", sv: "en bil / ett hus", en: "one car / one house" }
            ],
            exercises: [
                { type: "mc", prompt: "What is 'five' in Swedish?", options: ["fyra", "fem", "sex", "sju"], answer: 1 },
                { type: "type", prompt: "Type the Swedish word for 'ten'.", answer: "tio", accept: ["tio"] },
                { type: "mc", prompt: "Which form of 'one' goes with an ett-word?", options: ["en", "ett", "två", "tre"], answer: 1 },
                { type: "trueFalse", claim: "'sju' means 'seven'.", answer: true },
                { type: "type", prompt: "Type the Swedish word for 'three'.", answer: "tre", accept: ["tre"] },
                { type: "mc", prompt: "What number is 'åtta'?", options: ["6", "7", "8", "9"], answer: 2 }
            ]
        },
        {
            id: "swe-14",
            moduleId: "numbers",
            moduleTitle: "Numbers",
            title: "Numbers 11-20",
            explanation: [
                { type: "p", text: "Numbers 13-19 are built by adding '-ton' to a base number, similar to English '-teen'." },
                { type: "example", sv: "tretton, fjorton, femton", en: "13, 14, 15" },
                { type: "example", sv: "sexton, sjutton, arton, nitton", en: "16, 17, 18, 19" },
                { type: "p", text: "'elva' (11) and 'tolv' (12) are irregular and don't follow that pattern." },
                { type: "example", sv: "tjugo", en: "20" }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'eleven'?", options: ["elva", "tolv", "tretton", "tjugo"], answer: 0 },
                { type: "type", prompt: "Type the Swedish word for 'twelve'.", answer: "tolv", accept: ["tolv"] },
                { type: "mc", prompt: "What number is 'sexton'?", options: ["15", "16", "17", "18"], answer: 1 },
                { type: "trueFalse", claim: "'elva' and 'tolv' follow the same '-ton' pattern as 13-19.", answer: false },
                { type: "type", prompt: "Type the Swedish word for 'twenty'.", answer: "tjugo", accept: ["tjugo"] },
                { type: "mc", prompt: "Which word means 'nineteen'?", options: ["nitton", "arton", "sjutton", "tjugo"], answer: 0 }
            ]
        },
        {
            id: "swe-15",
            moduleId: "numbers",
            moduleTitle: "Numbers",
            title: "Tens: 20-100",
            explanation: [
                { type: "p", text: "The multiples of ten from 20 to 100 are their own set of words to learn." },
                { type: "example", sv: "tjugo, trettio, fyrtio, femtio", en: "20, 30, 40, 50" },
                { type: "example", sv: "sextio, sjuttio, åttio, nittio", en: "60, 70, 80, 90" },
                { type: "example", sv: "hundra", en: "100" }
            ],
            exercises: [
                { type: "mc", prompt: "What number is 'femtio'?", options: ["40", "50", "60", "70"], answer: 1 },
                { type: "type", prompt: "Type the Swedish word for 'hundred'.", answer: "hundra", accept: ["hundra"] },
                { type: "mc", prompt: "Which word means 'seventy'?", options: ["sextio", "sjuttio", "åttio", "nittio"], answer: 1 },
                { type: "type", prompt: "Type the Swedish word for 'thirty'.", answer: "trettio", accept: ["trettio"] },
                { type: "trueFalse", claim: "'fyrtio' means 'forty'.", answer: true },
                { type: "mc", prompt: "What number is 'nittio'?", options: ["80", "90", "100", "70"], answer: 1 }
            ]
        },
        {
            id: "swe-16",
            moduleId: "numbers",
            moduleTitle: "Numbers",
            title: "Compound Numbers 21-99",
            explanation: [
                { type: "p", text: "Numbers from 21 to 99 are formed by simply joining the tens word and the ones word - no extra word in between (unlike German's 'und')." },
                { type: "example", sv: "tjugoett", en: "21 (tjugo + ett)" },
                { type: "example", sv: "trettiotre", en: "33 (trettio + tre)" },
                { type: "example", sv: "femtioåtta", en: "58 (femtio + åtta)" },
                { type: "example", sv: "nittionio", en: "99 (nittio + nio)" }
            ],
            exercises: [
                { type: "type", prompt: "Type the Swedish word for '21'.", answer: "tjugoett", accept: ["tjugoett"] },
                { type: "mc", prompt: "How is 33 said in Swedish?", options: ["trettio och tre", "trettiotre", "trettietre", "trettioochtre"], answer: 1 },
                { type: "trueFalse", claim: "Swedish inserts a word like German 'und' between the tens and the ones.", answer: false },
                { type: "type", prompt: "Type the Swedish word for '45'.", answer: "fyrtiofem", accept: ["fyrtiofem"] },
                { type: "mc", prompt: "What number is 'femtioåtta'?", options: ["48", "58", "68", "78"], answer: 1 },
                { type: "type", prompt: "Type the Swedish word for '99'.", answer: "nittionio", accept: ["nittionio"] }
            ]
        },
        {
            id: "swe-17",
            moduleId: "numbers",
            moduleTitle: "Numbers",
            title: "Numbers 100-1000",
            explanation: [
                { type: "p", text: "'hundra' means 'hundred' and 'tusen' means 'thousand'. Bigger numbers are built by placing the hundreds first, then the rest." },
                { type: "example", sv: "hundra ett", en: "101" },
                { type: "example", sv: "tvåhundra", en: "200" },
                { type: "example", sv: "femhundratjugo", en: "520" },
                { type: "example", sv: "tusen", en: "1000" },
                { type: "p", text: "Unlike some languages, Swedish usually doesn't put a linking word (like English 'and') between the hundreds and the rest." }
            ],
            exercises: [
                { type: "type", prompt: "Type the Swedish word for 'hundred'.", answer: "hundra", accept: ["hundra"] },
                { type: "mc", prompt: "How do you say '200'?", options: ["hundra två", "tvåtusen", "tvåhundra", "hundra och två"], answer: 2 },
                { type: "type", prompt: "Type the Swedish word for 'thousand'.", answer: "tusen", accept: ["tusen"] },
                { type: "trueFalse", claim: "Swedish usually places a linking word like 'and' between the hundreds and the rest.", answer: false },
                { type: "mc", prompt: "How do you say '101' in Swedish?", options: ["hundra ett", "hundra och ett", "etthundra och en", "hundra en"], answer: 0 },
                { type: "type", prompt: "Type the Swedish for '520'.", answer: "femhundratjugo", accept: ["femhundratjugo", "fem hundra tjugo"] }
            ]
        },
        {
            id: "swe-18",
            moduleId: "numbers",
            moduleTitle: "Numbers",
            title: "Talking about Prices and Quantities",
            explanation: [
                { type: "p", text: "Swedish currency is the krona (plural: kronor), often abbreviated 'kr'." },
                { type: "example", sv: "Hur mycket kostar det?", en: "How much does it cost?" },
                { type: "example", sv: "Det kostar hundra kronor.", en: "It costs 100 kronor." },
                { type: "p", text: "For quantities: 'mycket' (much, uncountable), 'många' (many, countable), 'lite' (a little), and 'några' (some)." },
                { type: "example", sv: "mycket vatten / många böcker", en: "a lot of water / many books" }
            ],
            exercises: [
                { type: "mc", prompt: "What does 'Hur mycket kostar det?' mean?", options: ["Where is it?", "How much does it cost?", "What is it?", "When does it open?"], answer: 1 },
                { type: "type", prompt: "Type the Swedish word for the currency (singular 'krona').", answer: "krona", accept: ["krona", "kr"] },
                { type: "mc", prompt: "Which word means 'many' (countable)?", options: ["mycket", "många", "lite", "några"], answer: 1 },
                { type: "trueFalse", claim: "'mycket' is used for uncountable amounts, like 'mycket vatten' (a lot of water).", answer: true },
                { type: "type", prompt: "Type the Swedish word for 'a little'.", answer: "lite", accept: ["lite", "litet"] },
                { type: "mc", prompt: "How do you say 'It costs 100 kronor'?", options: ["Det kostar hundra kronor.", "Det är hundra kronor kostar.", "Hundra kostar det kronor.", "Det kostar kronor hundra."], answer: 0 }
            ]
        },

        // ── Module 3: Nouns & Articles ───────────────────────────────────
        {
            id: "swe-19",
            moduleId: "nouns",
            moduleTitle: "Nouns & Articles",
            title: "Noun Gender (en, ett)",
            explanation: [
                { type: "p", text: "Every Swedish noun has one of two genders, shown by its indefinite article: 'en' (common gender) or 'ett' (neuter). Unlike German or Norwegian, there's no separate feminine." },
                { type: "example", sv: "en bil", en: "a car (en-word)" },
                { type: "example", sv: "en bok", en: "a book (en-word)" },
                { type: "example", sv: "ett hus", en: "a house (ett-word)" },
                { type: "p", text: "About three-quarters of Swedish nouns are en-words and about one quarter are ett-words. There's no reliable rule, so the gender is best learned together with each new word." }
            ],
            exercises: [
                { type: "mc", prompt: "Which article goes with a neuter noun?", options: ["en", "ett", "den", "de"], answer: 1 },
                { type: "trueFalse", claim: "Swedish has a separate feminine gender, like German.", answer: false },
                { type: "mc", prompt: "Which of these is the odd one out?", options: ["en bil", "en bok", "ett hus", "en katt"], answer: 2 },
                { type: "type", prompt: "Type the neuter indefinite article.", answer: "ett", accept: ["ett"] },
                { type: "trueFalse", claim: "The gender of a Swedish noun is best memorized together with the word itself.", answer: true },
                { type: "mc", prompt: "Roughly what share of Swedish nouns are ett-words?", options: ["10%", "25%", "50%", "75%"], answer: 1 }
            ]
        },
        {
            id: "swe-20",
            moduleId: "nouns",
            moduleTitle: "Nouns & Articles",
            title: "Indefinite vs Definite Singular",
            explanation: [
                { type: "p", text: "Swedish has no separate word for 'the' - instead, a suffix attaches to the end of the noun." },
                { type: "example", sv: "en bil → bilen", en: "a car → the car" },
                { type: "example", sv: "ett hus → huset", en: "a house → the house" },
                { type: "p", text: "The basic suffix is -en for en-words and -et for ett-words. If the noun already ends in a vowel, you just add -n or -t." },
                { type: "example", sv: "en flicka → flickan", en: "a girl → the girl (add -n)" },
                { type: "example", sv: "ett äpple → äpplet", en: "an apple → the apple (add -t)" }
            ],
            exercises: [
                { type: "mc", prompt: "How do you say 'the car' from 'en bil'?", options: ["en bilen", "bilen", "bil en", "denbil"], answer: 1 },
                { type: "type", prompt: "Type the definite form of 'ett hus' (house).", answer: "huset", accept: ["huset"] },
                { type: "mc", prompt: "Which suffix marks the definite form of an ett-word?", options: ["-en", "-a", "-et", "-na"], answer: 2 },
                { type: "trueFalse", claim: "Swedish uses a separate word for 'the', like English.", answer: false },
                { type: "type", prompt: "Type the definite form of 'en flicka' (girl).", answer: "flickan", accept: ["flickan"] },
                { type: "mc", prompt: "What does 'bilen' mean?", options: ["a car", "the car", "cars", "the cars"], answer: 1 }
            ]
        },
        {
            id: "swe-21",
            moduleId: "nouns",
            moduleTitle: "Nouns & Articles",
            title: "Plural Indefinite and Definite",
            explanation: [
                { type: "p", text: "Swedish forms plurals in a few patterns. Many en-words add '-ar' or '-or', while many ett-words ending in a consonant stay unchanged." },
                { type: "example", sv: "en bil → bilar", en: "a car → cars (+ar)" },
                { type: "example", sv: "en flicka → flickor", en: "a girl → girls (-a becomes -or)" },
                { type: "example", sv: "ett hus → hus", en: "a house → houses (no change)" },
                { type: "p", text: "The definite plural ('the cars') adds '-na' to vowel-ending plurals, and '-en' to unchanged ett-words." },
                { type: "example", sv: "bilar → bilarna", en: "cars → the cars" },
                { type: "example", sv: "hus → husen", en: "houses → the houses" }
            ],
            exercises: [
                { type: "mc", prompt: "What is the plural indefinite of 'en bil'?", options: ["bilen", "bilar", "bilarna", "bilor"], answer: 1 },
                { type: "trueFalse", claim: "Many ett-words ending in a consonant stay the same in the indefinite plural, like 'hus' → 'hus'.", answer: true },
                { type: "type", prompt: "Type the definite plural of 'hus' (houses).", answer: "husen", accept: ["husen"] },
                { type: "mc", prompt: "What is the definite plural of 'bilar' (the cars)?", options: ["bilarna", "bilerne", "bilene", "bilarne"], answer: 0 },
                { type: "type", prompt: "Type the indefinite plural of 'flicka' (girl).", answer: "flickor", accept: ["flickor"] },
                { type: "mc", prompt: "What does 'bilarna' mean?", options: ["a car", "the car", "cars", "the cars"], answer: 3 }
            ]
        },
        {
            id: "swe-22",
            moduleId: "nouns",
            moduleTitle: "Nouns & Articles",
            title: "Common Regular & Irregular Nouns",
            explanation: [
                { type: "p", text: "Most nouns follow the regular patterns, but a handful of very common ones are irregular - often with a vowel change - and worth memorizing separately." },
                { type: "example", sv: "man → män", en: "man → men" },
                { type: "example", sv: "bok → böcker", en: "book → books" },
                { type: "example", sv: "barn → barn", en: "child → children (same word, like English 'sheep')" },
                { type: "p", text: "'barn' stays the same in the plural, and its definite plural is 'barnen' (the children)." },
                { type: "example", sv: "ett barn → barnet → barn → barnen", en: "a child → the child → children → the children" }
            ],
            exercises: [
                { type: "mc", prompt: "What is the irregular plural of 'man' (man)?", options: ["manner", "männer", "män", "mans"], answer: 2 },
                { type: "type", prompt: "Type the plural of 'bok' (book).", answer: "böcker", accept: ["böcker"] },
                { type: "trueFalse", claim: "'barn' (child) stays the same in the indefinite plural.", answer: true },
                { type: "mc", prompt: "What is the definite plural of 'barn' (the children)?", options: ["barnena", "barnen", "barnet", "barner"], answer: 1 },
                { type: "type", prompt: "Type the Swedish word for 'the man' (definite singular).", answer: "mannen", accept: ["mannen"] },
                { type: "mc", prompt: "Which of these shows an irregular vowel change in the plural?", options: ["bil → bilar", "hus → hus", "bok → böcker", "flicka → flickor"], answer: 2 }
            ]
        },
        {
            id: "swe-23",
            moduleId: "nouns",
            moduleTitle: "Nouns & Articles",
            title: "Using det as a Neutral/Impersonal Subject",
            explanation: [
                { type: "p", text: "'det' does double duty: it's the subject pronoun for ett-words ('it'), and it's also used impersonally - the way English uses 'it' for weather or general statements, with no real thing being referred to." },
                { type: "example", sv: "Det regnar.", en: "It's raining." },
                { type: "example", sv: "Det är kallt.", en: "It's cold." },
                { type: "example", sv: "Det är viktigt att öva.", en: "It's important to practice." },
                { type: "p", text: "To say 'there is / there are', Swedish uses a special phrase: 'det finns'." },
                { type: "example", sv: "Det finns en bil här.", en: "There is a car here." }
            ],
            exercises: [
                { type: "mc", prompt: "What does 'Det regnar' mean?", options: ["It rains water", "It's raining", "The rain is here", "It's a rain"], answer: 1 },
                { type: "trueFalse", claim: "'det' can be used impersonally, without referring to a specific thing.", answer: true },
                { type: "type", prompt: "Complete: '___ är kallt.' (It's cold.)", answer: "Det", accept: ["Det", "det"] },
                { type: "mc", prompt: "How do you say 'There is a car here'?", options: ["Där är en bil här.", "Det finns en bil här.", "Den finns en bil här.", "Han är en bil här."], answer: 1 },
                { type: "mc", prompt: "Which phrase does Swedish use for 'there is / there are'?", options: ["det är", "det finns", "det har", "det blir"], answer: 1 },
                { type: "type", prompt: "Type the Swedish word used for both 'it' (ett-words) and impersonal statements.", answer: "det", accept: ["det"] }
            ]
        },

        // ── Module 4: Adjectives ─────────────────────────────────────────
        {
            id: "swe-24",
            moduleId: "adjectives",
            moduleTitle: "Adjectives",
            title: "Basic Adjectives",
            explanation: [
                { type: "p", text: "Adjectives describe nouns. In their base (dictionary) form, they match an en-word." },
                { type: "example", sv: "en stor bil", en: "a big car" },
                { type: "example", sv: "en fin dag", en: "a nice day" },
                { type: "example", sv: "en gammal bok", en: "an old book" },
                { type: "p", text: "A few more essentials: 'god' (good), 'dålig' (bad), 'ny' (new), 'vacker' (beautiful/pretty), 'liten' (small)." }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'small'?", options: ["stor", "liten", "fin", "ny"], answer: 1 },
                { type: "type", prompt: "Type the Swedish word for 'good'.", answer: "god", accept: ["god"] },
                { type: "mc", prompt: "Which word means 'old'?", options: ["ny", "gammal", "vacker", "dålig"], answer: 1 },
                { type: "trueFalse", claim: "'dålig' means 'bad'.", answer: true },
                { type: "type", prompt: "Type the Swedish word for 'big'.", answer: "stor", accept: ["stor"] },
                { type: "mc", prompt: "What does 'vacker' mean?", options: ["ugly", "beautiful/pretty", "tall", "short"], answer: 1 }
            ]
        },
        {
            id: "swe-25",
            moduleId: "adjectives",
            moduleTitle: "Adjectives",
            title: "Adjective-Noun Agreement",
            explanation: [
                { type: "p", text: "Adjectives agree with the noun they describe: no change with en-words, add '-t' with ett-words, and add '-a' for any plural." },
                { type: "example", sv: "en stor bil", en: "a big car (en-word, no change)" },
                { type: "example", sv: "ett stort hus", en: "a big house (ett-word, +t)" },
                { type: "example", sv: "stora bilar / stora hus", en: "big cars / big houses (plural, +a)" }
            ],
            exercises: [
                { type: "mc", prompt: "How does 'stor' change with an ett-word like 'hus'?", options: ["stor hus", "stora hus", "stort hus", "storet hus"], answer: 2 },
                { type: "type", prompt: "Type the plural form of 'stor' (used with any plural noun).", answer: "stora", accept: ["stora"] },
                { type: "trueFalse", claim: "Adjectives stay unchanged with en-words.", answer: true },
                { type: "mc", prompt: "Which is correct for 'big cars' (plural)?", options: ["stor bilar", "stora bilar", "stort bilar", "storet bilar"], answer: 1 },
                { type: "type", prompt: "Complete: 'ett ___ hus' (a big house).", answer: "stort", accept: ["stort"], hint: "stor" },
                { type: "mc", prompt: "What ending do ett-words typically add to an adjective?", options: ["-a", "-t", "-en", "-et"], answer: 1 }
            ]
        },
        {
            id: "swe-26",
            moduleId: "adjectives",
            moduleTitle: "Adjectives",
            title: "Comparatives and Superlatives",
            explanation: [
                { type: "p", text: "Regular adjectives add '-are' for the comparative ('more/-er') and '-ast' for the superlative ('most/-est')." },
                { type: "example", sv: "fin → finare → finast", en: "nice → nicer → nicest" },
                { type: "p", text: "Some very common adjectives are irregular, similar to English 'good → better → best'." },
                { type: "example", sv: "god/bra → bättre → bäst", en: "good → better → best" },
                { type: "example", sv: "stor → större → störst", en: "big → bigger → biggest" },
                { type: "example", sv: "liten → mindre → minst", en: "small → smaller → smallest" }
            ],
            exercises: [
                { type: "mc", prompt: "What is the comparative of 'fin' (nice)?", options: ["finast", "finare", "finest", "finnare"], answer: 1 },
                { type: "type", prompt: "Type the superlative of 'fin'.", answer: "finast", accept: ["finast"] },
                { type: "mc", prompt: "What is the comparative of 'god' (good)?", options: ["godare", "bättre", "bäst", "godast"], answer: 1 },
                { type: "trueFalse", claim: "'stor' (big) has an irregular comparative: 'större'.", answer: true },
                { type: "type", prompt: "Type the superlative of 'stor' (big).", answer: "störst", accept: ["störst"] },
                { type: "mc", prompt: "What is the comparative of 'liten' (small)?", options: ["litnare", "mindre", "minst", "litenare"], answer: 1 }
            ]
        },
        {
            id: "swe-27",
            moduleId: "adjectives",
            moduleTitle: "Adjectives",
            title: "Colors",
            explanation: [
                { type: "p", text: "Colors are adjectives too, so most follow the same agreement rules from a couple of lessons ago." },
                { type: "example", sv: "röd, blå, gul", en: "red, blue, yellow" },
                { type: "example", sv: "grön, vit, svart", en: "green, white, black" },
                { type: "example", sv: "en röd bil, ett rött hus, röda bilar", en: "a red car, a red house, red cars" }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'blue'?", options: ["röd", "blå", "gul", "grön"], answer: 1 },
                { type: "type", prompt: "Type the Swedish word for 'green'.", answer: "grön", accept: ["grön"] },
                { type: "mc", prompt: "Which word means 'white'?", options: ["svart", "vit", "grå", "brun"], answer: 1 },
                { type: "trueFalse", claim: "'svart' means 'black'.", answer: true },
                { type: "type", prompt: "Type the Swedish word for 'red'.", answer: "röd", accept: ["röd"] },
                { type: "mc", prompt: "How would you say 'a red house' (ett-word, agreement)?", options: ["en röd hus", "ett röd hus", "ett rött hus", "ett röda hus"], answer: 2 }
            ]
        },
        {
            id: "swe-28",
            moduleId: "adjectives",
            moduleTitle: "Adjectives",
            title: "Describing People and Things",
            explanation: [
                { type: "p", text: "Here's a useful set of adjectives for describing people, moods, and things." },
                { type: "example", sv: "lång, kort", en: "tall/long, short" },
                { type: "example", sv: "smal, tjock", en: "thin/slim, thick/fat" },
                { type: "example", sv: "snäll, arg", en: "kind, angry" },
                { type: "example", sv: "glad, ledsen", en: "happy, sad" },
                { type: "example", sv: "hungrig, trött", en: "hungry, tired" }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'tall'?", options: ["kort", "lång", "smal", "tjock"], answer: 1 },
                { type: "type", prompt: "Type the Swedish word for 'happy'.", answer: "glad", accept: ["glad"] },
                { type: "mc", prompt: "Which word means 'tired'?", options: ["hungrig", "trött", "arg", "ledsen"], answer: 1 },
                { type: "trueFalse", claim: "'snäll' means 'kind'.", answer: true },
                { type: "type", prompt: "Type the Swedish word for 'hungry'.", answer: "hungrig", accept: ["hungrig"] },
                { type: "mc", prompt: "What does 'arg' mean?", options: ["sad", "angry", "kind", "tired"], answer: 1 }
            ]
        },

        // ── Module 5: Verbs ──────────────────────────────────────────────
        {
            id: "swe-29",
            moduleId: "verbs",
            moduleTitle: "Verbs",
            title: "Present Tense Verbs (-r form)",
            explanation: [
                { type: "p", text: "The present-tense rule you've already seen (the verb ends in '-r') applies to almost every Swedish verb - usually by adding '-ar' or '-er' to the stem. Here it is with a few more examples." },
                { type: "example", sv: "att prata → pratar", en: "to talk → talk(s)" },
                { type: "example", sv: "att läsa → läser", en: "to read → read(s)" },
                { type: "example", sv: "att äta → äter", en: "to eat → eat(s)" },
                { type: "example", sv: "att arbeta → arbetar", en: "to work → work(s)" },
                { type: "p", text: "Short verbs whose infinitive doesn't end in '-a' (a small handful, like 'att bo') still just add '-r': 'bor'." }
            ],
            exercises: [
                { type: "mc", prompt: "What is the present tense of 'att prata' (to talk)?", options: ["prata", "pratar", "pratade", "prat"], answer: 1 },
                { type: "type", prompt: "Type the present tense of 'att äta' (to eat).", answer: "äter", accept: ["äter"] },
                { type: "mc", prompt: "What is the present tense of 'att läsa' (to read)?", options: ["läsa", "läser", "läs", "läst"], answer: 1 },
                { type: "trueFalse", claim: "Nearly every Swedish verb ends in '-r' in the present tense.", answer: true },
                { type: "type", prompt: "Type the present tense of 'att arbeta' (to work).", answer: "arbetar", accept: ["arbetar"] },
                { type: "mc", prompt: "Which is the correct present-tense sentence for 'She reads a book'?", options: ["Hon läsa en bok.", "Hon läser en bok.", "Hon att läsa en bok.", "Hon läs en bok."], answer: 1 }
            ]
        },
        {
            id: "swe-30",
            moduleId: "verbs",
            moduleTitle: "Verbs",
            title: "Infinitive with att and Modal Verbs",
            explanation: [
                { type: "p", text: "Modal verbs express ability, desire, obligation, and so on, and are followed by another verb in the infinitive - but WITHOUT 'att'." },
                { type: "example", sv: "Jag kan simma.", en: "I can swim." },
                { type: "example", sv: "Jag vill resa.", en: "I want to travel." },
                { type: "example", sv: "Jag måste gå.", en: "I must go." },
                { type: "p", text: "The modal verbs and their present-tense forms:" },
                { type: "example", sv: "att kunna → kan / att vilja → vill", en: "can/be able to / want to" },
                { type: "example", sv: "att skola → ska / att böra → bör", en: "shall/will / should" }
            ],
            exercises: [
                { type: "mc", prompt: "What is the present tense of 'att kunna' (can)?", options: ["kunna", "kan", "kanna", "kunnat"], answer: 1 },
                { type: "trueFalse", claim: "A modal verb like 'kan' is followed by 'att' before the next verb.", answer: false },
                { type: "type", prompt: "Complete: 'Jag ___ simma.' (I can swim.)", answer: "kan", accept: ["kan"], hint: "att kunna" },
                { type: "mc", prompt: "What is the present tense of 'att vilja' (to want to)?", options: ["vilja", "vill", "viller", "velat"], answer: 1 },
                { type: "type", prompt: "Type the present tense of 'att skola' (shall/will).", answer: "ska", accept: ["ska", "skall"] },
                { type: "mc", prompt: "How do you say 'I should go'?", options: ["Jag bör att gå.", "Jag bör gå.", "Jag borde att gå.", "Jag går bör."], answer: 1 }
            ]
        },
        {
            id: "swe-31",
            moduleId: "verbs",
            moduleTitle: "Verbs",
            title: "Present Perfect (har + supine)",
            explanation: [
                { type: "p", text: "The present perfect ('have done something') is built with 'har' plus a special verb form called the SUPINE - Swedish's counterpart to the English past participle. The supine usually ends in '-t'." },
                { type: "example", sv: "Jag har ätit.", en: "I have eaten." },
                { type: "example", sv: "Hon har läst boken.", en: "She has read the book." },
                { type: "example", sv: "att prata → har pratat", en: "to talk → have talked" },
                { type: "p", text: "A couple of irregular supines worth knowing:" },
                { type: "example", sv: "att göra → har gjort", en: "to do → have done" },
                { type: "example", sv: "att komma → har kommit", en: "to come → have come" }
            ],
            exercises: [
                { type: "mc", prompt: "How do you say 'I have eaten'?", options: ["Jag har äta.", "Jag har ätit.", "Jag har äter.", "Jag har att äta."], answer: 1 },
                { type: "trueFalse", claim: "The Swedish present perfect is built with 'har' + the supine form.", answer: true },
                { type: "type", prompt: "Complete: 'Hon har ___ boken.' (She has read the book.)", answer: "läst", accept: ["läst"], hint: "att läsa" },
                { type: "mc", prompt: "What is the supine of 'att göra' (to do)?", options: ["gjört", "gjort", "göret", "gjordt"], answer: 1 },
                { type: "type", prompt: "Type the supine of 'att komma' (to come).", answer: "kommit", accept: ["kommit"] },
                { type: "mc", prompt: "Which is correct for 'They have talked'?", options: ["De har prata.", "De har pratar.", "De har pratat.", "De har att prata."], answer: 2 }
            ]
        },
        {
            id: "swe-32",
            moduleId: "verbs",
            moduleTitle: "Verbs",
            title: "Simple Past of Regular Verbs",
            explanation: [
                { type: "p", text: "The simple past tense ('talked', 'read') for regular verbs comes in two common patterns: '-ade' and '-te/-de'." },
                { type: "example", sv: "att prata → pratade", en: "to talk → talked" },
                { type: "example", sv: "att jobba → jobbade", en: "to work → worked" },
                { type: "example", sv: "att läsa → läste", en: "to read → read (past)" },
                { type: "example", sv: "att resa → reste", en: "to travel → travelled" },
                { type: "p", text: "Note that Swedish keeps the simple past and the supine distinct: 'pratade' (talked) vs. 'pratat' (have talked)." }
            ],
            exercises: [
                { type: "mc", prompt: "What is the simple past of 'att prata' (to talk)?", options: ["pratar", "pratade", "pratat", "prata"], answer: 1 },
                { type: "type", prompt: "Type the simple past of 'att läsa' (to read).", answer: "läste", accept: ["läste"] },
                { type: "mc", prompt: "What is the simple past of 'att resa' (to travel)?", options: ["reser", "res", "reste", "rest"], answer: 2 },
                { type: "trueFalse", claim: "There are two common regular simple-past patterns in Swedish: '-ade' and '-te/-de'.", answer: true },
                { type: "type", prompt: "Type the simple past of 'att jobba' (to work).", answer: "jobbade", accept: ["jobbade"] },
                { type: "mc", prompt: "Which sentence means 'She read a book' (past)?", options: ["Hon läser en bok.", "Hon läste en bok.", "Hon har läst en bok.", "Hon att läsa en bok."], answer: 1 }
            ]
        },
        {
            id: "swe-33",
            moduleId: "verbs",
            moduleTitle: "Verbs",
            title: "Future with ska and kommer att",
            explanation: [
                { type: "p", text: "Swedish has no separate future verb tense - instead, 'ska' or 'kommer att' plus the infinitive expresses future actions." },
                { type: "example", sv: "Jag ska resa imorgon.", en: "I'm going to travel tomorrow. (planned)" },
                { type: "example", sv: "Det kommer att regna.", en: "It will rain. (prediction)" },
                { type: "p", text: "'ska' leans toward a plan, decision, or intention; 'kommer att' leans toward a prediction. Be careful: 'vill' means 'want', NOT 'will', so it isn't used for the future the way English 'will' is." },
                { type: "example", sv: "Jag ska lära mig svenska.", en: "I'm going to learn Swedish." }
            ],
            exercises: [
                { type: "mc", prompt: "Which word expresses a planned/decided future action?", options: ["ska", "kan", "måste", "bör"], answer: 0 },
                { type: "type", prompt: "Complete: 'Jag ___ resa imorgon.' (I'm going to travel tomorrow.)", answer: "ska", accept: ["ska", "skall"], hint: "att skola" },
                { type: "trueFalse", claim: "Swedish has a distinct future-tense verb form, separate from the present tense.", answer: false },
                { type: "mc", prompt: "Which best fits a weather prediction, 'It will rain'?", options: ["Det vill regna.", "Det kommer att regna.", "Det måste regna.", "Det bör regna."], answer: 1 },
                { type: "type", prompt: "Type the two-word phrase (before an infinitive) that signals a prediction about the future.", answer: "kommer att", accept: ["kommer att"] },
                { type: "mc", prompt: "What follows 'ska'/'kommer att' when expressing the future?", options: ["a noun", "the bare infinitive", "the supine", "'att' + infinitive"], answer: 1 }
            ]
        },
        {
            id: "swe-34",
            moduleId: "verbs",
            moduleTitle: "Verbs",
            title: "Reflexive Verbs",
            explanation: [
                { type: "p", text: "Some Swedish verbs are inherently reflexive - the action is done to oneself, and they always need a reflexive pronoun that matches the subject (see the Reflexive Pronouns lesson)." },
                { type: "example", sv: "att sätta sig", en: "to sit down (lit. 'to set oneself')" },
                { type: "example", sv: "att skynda sig", en: "to hurry (lit. 'to hasten oneself')" },
                { type: "example", sv: "att gifta sig", en: "to get married (lit. 'to marry oneself')" },
                { type: "example", sv: "Jag sätter mig. / Vi skyndar oss. / De gifter sig.", en: "I sit down. / We hurry. / They get married." }
            ],
            exercises: [
                { type: "mc", prompt: "How do you say 'I sit down'?", options: ["Jag sätter sig.", "Jag sätter mig.", "Jag sätter dig.", "Jag sätter oss."], answer: 1 },
                { type: "type", prompt: "Complete: 'Vi skyndar ___.' (We hurry.)", answer: "oss", accept: ["oss"] },
                { type: "trueFalse", claim: "The reflexive pronoun with 'att gifta sig' must always match the subject.", answer: true },
                { type: "mc", prompt: "How do you say 'They get married'?", options: ["De gifter mig.", "De gifter dem.", "De gifter sig.", "De gifter dig."], answer: 2 },
                { type: "type", prompt: "Type the Swedish verb phrase for 'to hurry' (infinitive, with its reflexive pronoun).", answer: "att skynda sig", accept: ["att skynda sig", "skynda sig"] },
                { type: "mc", prompt: "What does 'att sätta sig' literally mean?", options: ["to sit down", "to stand up", "to sleep", "to wake up"], answer: 0 }
            ]
        },

        // ── Module 6: Sentence Structure ─────────────────────────────────
        {
            id: "swe-35",
            moduleId: "syntax",
            moduleTitle: "Sentence Structure",
            title: "Basic Word Order (S-V-O)",
            explanation: [
                { type: "p", text: "The basic Swedish sentence order is Subject - Verb - Object, just like English." },
                { type: "example", sv: "Jag läser boken.", en: "I read the book. (S-V-O)" },
                { type: "example", sv: "Hon gillar kaffe.", en: "She likes coffee." },
                { type: "p", text: "This basic order holds as long as the subject genuinely comes first - the next lesson covers what happens when something else leads the sentence." }
            ],
            exercises: [
                { type: "mc", prompt: "What is the basic Swedish word order?", options: ["V-S-O", "S-O-V", "S-V-O", "O-V-S"], answer: 2 },
                { type: "trueFalse", claim: "'Jag läser boken' follows Subject-Verb-Object order.", answer: true },
                { type: "mc", prompt: "Which sentence correctly follows S-V-O?", options: ["Kaffe gillar hon.", "Gillar hon kaffe.", "Hon gillar kaffe.", "Hon kaffe gillar."], answer: 2 },
                { type: "type", prompt: "Complete with the correct verb form: 'Hon ___ boken.' (She reads the book.)", answer: "läser", accept: ["läser"], hint: "att läsa" },
                { type: "mc", prompt: "In 'Hon gillar kaffe', what role does 'kaffe' play?", options: ["Subject", "Verb", "Object", "Adjective"], answer: 2 },
                { type: "trueFalse", claim: "Swedish's basic word order is different from English.", answer: false }
            ]
        },
        {
            id: "swe-36",
            moduleId: "syntax",
            moduleTitle: "Sentence Structure",
            title: "The Verb-Second Rule",
            explanation: [
                { type: "p", text: "Swedish's most important structural rule: the conjugated verb is always the SECOND element in a statement - no matter what comes first." },
                { type: "example", sv: "Jag läser boken idag.", en: "I read the book today. (subject first, verb 2nd)" },
                { type: "example", sv: "Idag läser jag boken.", en: "Today I read the book. (time expression first - verb still 2nd, subject moves after it!)" },
                { type: "p", text: "This is why, whenever a sentence starts with something other than the subject (like a time or place word), the subject and verb swap places - to keep the verb in position two." }
            ],
            exercises: [
                { type: "mc", prompt: "What is always the SECOND element in a Swedish main clause?", options: ["The subject", "The object", "The finite verb", "The adverb"], answer: 2 },
                { type: "mc", prompt: "In 'Idag läser jag boken', where is the verb?", options: ["First", "Second", "Third", "Last"], answer: 1 },
                { type: "trueFalse", claim: "When a sentence starts with a time expression, the subject and verb swap places to keep the verb in position two.", answer: true },
                { type: "type", prompt: "Complete: 'Idag ___ jag boken.' (Today I read the book.)", answer: "läser", accept: ["läser"], hint: "att läsa" },
                { type: "mc", prompt: "Which sentence correctly follows the verb-second rule?", options: ["Idag jag läser boken.", "Idag läser jag boken.", "Jag idag läser boken.", "Läser jag idag boken."], answer: 1 },
                { type: "trueFalse", claim: "The verb-second rule only applies to yes/no questions, not statements.", answer: false }
            ]
        },
        {
            id: "swe-37",
            moduleId: "syntax",
            moduleTitle: "Sentence Structure",
            title: "Time/Place Adverbs and Inversion",
            explanation: [
                { type: "p", text: "Time and place adverbs commonly lead a Swedish sentence for emphasis - and per the verb-second rule, this always triggers subject-verb inversion." },
                { type: "example", sv: "Nu äter vi.", en: "Now we eat. (nu first, verb 2nd, subject 3rd)" },
                { type: "example", sv: "Här bor jag.", en: "I live here. (här first, verb 2nd, subject 3rd)" },
                { type: "example", sv: "imorgon, senare, där", en: "tomorrow, later, there" }
            ],
            exercises: [
                { type: "mc", prompt: "How do you say 'Now we eat' leading with 'nu'?", options: ["Nu vi äter.", "Nu äter vi.", "Vi nu äter.", "Äter nu vi."], answer: 1 },
                { type: "type", prompt: "Complete: 'Här ___ jag.' (I live here.)", answer: "bor", accept: ["bor"], hint: "att bo" },
                { type: "trueFalse", claim: "Leading a sentence with a place adverb like 'här' still triggers subject-verb inversion.", answer: true },
                { type: "mc", prompt: "Which word means 'tomorrow'?", options: ["nu", "senare", "imorgon", "där"], answer: 2 },
                { type: "mc", prompt: "Which sentence is correctly inverted?", options: ["Där de bor.", "Där bor de.", "De där bor.", "Bor där de."], answer: 1 },
                { type: "type", prompt: "Type the Swedish word for 'later'.", answer: "senare", accept: ["senare"] }
            ]
        },
        {
            id: "swe-38",
            moduleId: "syntax",
            moduleTitle: "Sentence Structure",
            title: "Placing inte and Other Adverbs",
            explanation: [
                { type: "p", text: "'inte' and adverbs like 'ofta' (often), 'alltid' (always), 'bara' (just/only), and 'kanske' (maybe) all sit in the same spot: right after the finite verb in a main clause." },
                { type: "example", sv: "Jag äter ofta fisk.", en: "I often eat fish." },
                { type: "example", sv: "Hon är alltid glad.", en: "She is always happy." },
                { type: "example", sv: "Vi är kanske sena.", en: "We are maybe late." }
            ],
            exercises: [
                { type: "mc", prompt: "Where does 'ofta' (often) go in a Swedish sentence?", options: ["Before the subject", "Right after the finite verb", "At the very start always", "It never appears mid-sentence"], answer: 1 },
                { type: "type", prompt: "Complete: 'Hon är ___ glad.' (She is always happy.)", answer: "alltid", accept: ["alltid"] },
                { type: "mc", prompt: "Which word means 'maybe'?", options: ["bara", "kanske", "ofta", "alltid"], answer: 1 },
                { type: "trueFalse", claim: "'inte' sits in the same sentence position as 'ofta', 'alltid', 'bara', and 'kanske'.", answer: true },
                { type: "type", prompt: "Type the Swedish word for 'just/only'.", answer: "bara", accept: ["bara"] },
                { type: "mc", prompt: "How do you say 'I often eat fish'?", options: ["Jag ofta äter fisk.", "Jag äter ofta fisk.", "Ofta jag äter fisk.", "Jag äter fisk ofta alltid."], answer: 1 }
            ]
        },
        {
            id: "swe-39",
            moduleId: "syntax",
            moduleTitle: "Sentence Structure",
            title: "Coordinating Sentences: och, men, eller, eftersom",
            explanation: [
                { type: "p", text: "These four words connect clauses into longer sentences." },
                { type: "example", sv: "och, men", en: "and, but" },
                { type: "example", sv: "eller, eftersom", en: "or, because" },
                { type: "example", sv: "Jag gillar te, men hon gillar kaffe.", en: "I like tea, but she likes coffee." },
                { type: "example", sv: "Jag är trött eftersom jag jobbade mycket.", en: "I am tired because I worked a lot." }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'but'?", options: ["och", "men", "eller", "eftersom"], answer: 1 },
                { type: "type", prompt: "Type the Swedish word for 'because'.", answer: "eftersom", accept: ["eftersom"] },
                { type: "mc", prompt: "Which word means 'or'?", options: ["och", "men", "eller", "eftersom"], answer: 2 },
                { type: "trueFalse", claim: "'och' means 'and'.", answer: true },
                { type: "type", prompt: "Complete: 'Jag är trött ___ jag jobbade mycket.' (...because I worked a lot.)", answer: "eftersom", accept: ["eftersom"] },
                { type: "mc", prompt: "How do you say 'Do you want tea or coffee?'?", options: ["Vill du ha te men kaffe?", "Vill du ha te eller kaffe?", "Vill du ha te eftersom kaffe?", "Vill du ha te och kaffe?"], answer: 1 }
            ]
        },

        // ── Module 7: Everyday Vocabulary ────────────────────────────────
        {
            id: "swe-40",
            moduleId: "vocabulary",
            moduleTitle: "Everyday Vocabulary",
            title: "Greetings and Courtesy Phrases",
            explanation: [
                { type: "p", text: "A handful of everyday phrases will cover most polite exchanges." },
                { type: "example", sv: "hej, hallå", en: "hi, hello" },
                { type: "example", sv: "god morgon, god kväll, god natt", en: "good morning, good evening, good night" },
                { type: "example", sv: "hej då, vi ses", en: "bye, see you" },
                { type: "example", sv: "tack, snälla", en: "thanks, please" },
                { type: "example", sv: "ursäkta, varsågod", en: "sorry/excuse me, here you go/you're welcome" }
            ],
            exercises: [
                { type: "mc", prompt: "Which means 'good morning'?", options: ["god dag", "god morgon", "god kväll", "god natt"], answer: 1 },
                { type: "type", prompt: "Type the Swedish phrase for 'bye'.", answer: "hej då", accept: ["hej då"] },
                { type: "mc", prompt: "Which word means 'please'?", options: ["tack", "ursäkta", "snälla", "varsågod"], answer: 2 },
                { type: "trueFalse", claim: "'ursäkta' means 'sorry/excuse me'.", answer: true },
                { type: "type", prompt: "Type the Swedish phrase for 'good evening'.", answer: "god kväll", accept: ["god kväll"] },
                { type: "mc", prompt: "What does 'varsågod' typically mean in context?", options: ["Please", "Sorry", "Here you go / you're welcome", "Good night"], answer: 2 }
            ]
        },
        {
            id: "swe-41",
            moduleId: "vocabulary",
            moduleTitle: "Everyday Vocabulary",
            title: "Introducing Yourself",
            explanation: [
                { type: "p", text: "These phrases cover the basics of introducing yourself." },
                { type: "example", sv: "Jag heter...", en: "My name is..." },
                { type: "example", sv: "Jag kommer från... / Jag är från...", en: "I come from... / I am from..." },
                { type: "example", sv: "Jag jobbar som... / Jag studerar...", en: "I work as... / I study..." },
                { type: "example", sv: "Trevligt att träffas.", en: "Nice to meet you." }
            ],
            exercises: [
                { type: "mc", prompt: "How do you say 'My name is...'?", options: ["Jag är...", "Jag heter...", "Jag kommer...", "Jag bor..."], answer: 1 },
                { type: "type", prompt: "Type the Swedish phrase for 'I come from...'.", answer: "jag kommer från", accept: ["jag kommer från"] },
                { type: "mc", prompt: "What does 'Trevligt att träffas' mean?", options: ["Nice to meet you", "Good morning", "See you later", "How are you"], answer: 0 },
                { type: "trueFalse", claim: "'Jag studerar' means 'I study'.", answer: true },
                { type: "type", prompt: "Complete: 'Jag jobbar ___ lärare.' (I work as a teacher.)", answer: "som", accept: ["som"] },
                { type: "mc", prompt: "Which phrase tells where you're from?", options: ["Jag heter...", "Jag är från...", "Jag jobbar...", "Jag gillar..."], answer: 1 }
            ]
        },
        {
            id: "swe-42",
            moduleId: "vocabulary",
            moduleTitle: "Everyday Vocabulary",
            title: "Family Vocabulary",
            explanation: [
                { type: "p", text: "Core family words. Swedish builds grandparents by compounding 'mor' (mother) and 'far' (father), so the word itself tells you which side of the family." },
                { type: "example", sv: "mamma, pappa", en: "mother, father" },
                { type: "example", sv: "syster, bror", en: "sister, brother" },
                { type: "example", sv: "dotter, son", en: "daughter, son" },
                { type: "example", sv: "mormor, morfar", en: "grandmother (mother's mother), grandfather (mother's father)" },
                { type: "example", sv: "fru, man, barn, föräldrar", en: "wife, husband, child, parents" }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'mother'?", options: ["pappa", "mamma", "syster", "dotter"], answer: 1 },
                { type: "type", prompt: "Type the Swedish word for 'brother'.", answer: "bror", accept: ["bror"] },
                { type: "mc", prompt: "'mormor' is which grandmother?", options: ["father's mother", "mother's mother", "the oldest one", "a great-grandmother"], answer: 1 },
                { type: "trueFalse", claim: "'föräldrar' means 'parents'.", answer: true },
                { type: "type", prompt: "Type the Swedish word for 'daughter'.", answer: "dotter", accept: ["dotter"] },
                { type: "mc", prompt: "What does 'fru' mean?", options: ["husband", "wife", "child", "sister"], answer: 1 }
            ]
        },
        {
            id: "swe-43",
            moduleId: "vocabulary",
            moduleTitle: "Everyday Vocabulary",
            title: "Days, Seasons, and Time",
            explanation: [
                { type: "p", text: "The days of the week, in order:" },
                { type: "example", sv: "måndag, tisdag, onsdag", en: "Monday, Tuesday, Wednesday" },
                { type: "example", sv: "torsdag, fredag, lördag, söndag", en: "Thursday, Friday, Saturday, Sunday" },
                { type: "p", text: "The four seasons, and asking the time:" },
                { type: "example", sv: "vår, sommar, höst, vinter", en: "spring, summer, autumn, winter" },
                { type: "example", sv: "Vad är klockan?", en: "What time is it?" }
            ],
            exercises: [
                { type: "mc", prompt: "Which day is 'lördag'?", options: ["Friday", "Saturday", "Sunday", "Thursday"], answer: 1 },
                { type: "type", prompt: "Type the Swedish word for 'Monday'.", answer: "måndag", accept: ["måndag"] },
                { type: "mc", prompt: "Which word means 'summer'?", options: ["vår", "sommar", "höst", "vinter"], answer: 1 },
                { type: "trueFalse", claim: "'Vad är klockan?' asks what time it is.", answer: true },
                { type: "type", prompt: "Type the Swedish word for 'winter'.", answer: "vinter", accept: ["vinter"] },
                { type: "mc", prompt: "Which season is 'höst'?", options: ["spring", "summer", "autumn", "winter"], answer: 2 }
            ]
        },
        {
            id: "swe-44",
            moduleId: "vocabulary",
            moduleTitle: "Everyday Vocabulary",
            title: "Home and City",
            explanation: [
                { type: "p", text: "Vocabulary for talking about where you live." },
                { type: "example", sv: "hem, lägenhet, hus", en: "home, apartment, house" },
                { type: "example", sv: "rum, kök, badrum, sovrum", en: "room, kitchen, bathroom, bedroom" },
                { type: "example", sv: "stad, gata, centrum", en: "city/town, street, city centre" }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'apartment'?", options: ["hus", "lägenhet", "rum", "stad"], answer: 1 },
                { type: "type", prompt: "Type the Swedish word for 'kitchen'.", answer: "kök", accept: ["kök"] },
                { type: "mc", prompt: "Which word means 'bedroom'?", options: ["badrum", "kök", "sovrum", "rum"], answer: 2 },
                { type: "trueFalse", claim: "'centrum' means 'city centre'.", answer: true },
                { type: "type", prompt: "Type the Swedish word for 'street'.", answer: "gata", accept: ["gata"] },
                { type: "mc", prompt: "What does 'stad' mean?", options: ["house", "street", "city/town", "room"], answer: 2 }
            ]
        },
        {
            id: "swe-45",
            moduleId: "vocabulary",
            moduleTitle: "Everyday Vocabulary",
            title: "Food and Drinks",
            explanation: [
                { type: "p", text: "Everyday food and mealtime vocabulary." },
                { type: "example", sv: "mat, vatten, mjölk", en: "food, water, milk" },
                { type: "example", sv: "bröd, ost, ägg", en: "bread, cheese, egg" },
                { type: "example", sv: "kött, fisk", en: "meat, fish" },
                { type: "example", sv: "frukost, lunch, middag", en: "breakfast, lunch, dinner" }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'bread'?", options: ["ost", "bröd", "ägg", "kött"], answer: 1 },
                { type: "type", prompt: "Type the Swedish word for 'water'.", answer: "vatten", accept: ["vatten"] },
                { type: "mc", prompt: "Which word means 'dinner'?", options: ["frukost", "lunch", "middag", "mat"], answer: 2 },
                { type: "trueFalse", claim: "'ost' means 'cheese'.", answer: true },
                { type: "type", prompt: "Type the Swedish word for 'fish'.", answer: "fisk", accept: ["fisk"] },
                { type: "mc", prompt: "What does 'frukost' mean?", options: ["lunch", "dinner", "breakfast", "food"], answer: 2 }
            ]
        },
        {
            id: "swe-46",
            moduleId: "vocabulary",
            moduleTitle: "Everyday Vocabulary",
            title: "Work and Studies",
            explanation: [
                { type: "p", text: "Vocabulary for talking about jobs and school." },
                { type: "example", sv: "jobb, arbete, kontor", en: "job, work, office" },
                { type: "example", sv: "lärare, student, skola, universitet", en: "teacher, student, school, university" },
                { type: "example", sv: "möte, uppgift, att studera", en: "meeting, task/assignment, to study" }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'teacher'?", options: ["student", "lärare", "skola", "jobb"], answer: 1 },
                { type: "type", prompt: "Type the Swedish word for 'school'.", answer: "skola", accept: ["skola"] },
                { type: "mc", prompt: "Which word means 'meeting'?", options: ["uppgift", "kontor", "möte", "arbete"], answer: 2 },
                { type: "trueFalse", claim: "'universitet' means 'university'.", answer: true },
                { type: "type", prompt: "Type the Swedish word for 'office'.", answer: "kontor", accept: ["kontor"] },
                { type: "mc", prompt: "What does 'uppgift' mean?", options: ["office", "meeting", "task/assignment", "job"], answer: 2 }
            ]
        },
        {
            id: "swe-47",
            moduleId: "vocabulary",
            moduleTitle: "Everyday Vocabulary",
            title: "Free Time and Hobbies",
            explanation: [
                { type: "p", text: "Vocabulary for talking about hobbies and leisure time." },
                { type: "example", sv: "fritid, hobby", en: "free time, hobby" },
                { type: "example", sv: "att spela, att träna, att resa, att måla", en: "to play, to work out, to travel, to paint" },
                { type: "example", sv: "musik, film, bok", en: "music, movie, book" }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'free time'?", options: ["hobby", "fritid", "musik", "film"], answer: 1 },
                { type: "type", prompt: "Type the Swedish verb for 'to travel'.", answer: "att resa", accept: ["att resa", "resa"] },
                { type: "mc", prompt: "Which word means 'to work out/exercise'?", options: ["att spela", "att träna", "att måla", "att läsa"], answer: 1 },
                { type: "trueFalse", claim: "'att spela' can mean both 'to play a game' and 'to play an instrument'.", answer: true },
                { type: "type", prompt: "Type the Swedish word for 'movie'.", answer: "film", accept: ["film"] },
                { type: "mc", prompt: "What does 'att måla' mean?", options: ["to paint", "to play", "to read", "to travel"], answer: 0 }
            ]
        },
        {
            id: "swe-48",
            moduleId: "vocabulary",
            moduleTitle: "Everyday Vocabulary",
            title: "Technology and the Internet",
            explanation: [
                { type: "p", text: "Vocabulary for talking about computers and getting online." },
                { type: "example", sv: "dator, mobil, skärm", en: "computer, phone, screen" },
                { type: "example", sv: "internet, hemsida, app", en: "internet, website, app" },
                { type: "example", sv: "e-post, lösenord", en: "email, password" },
                { type: "example", sv: "att ladda ner, att söka", en: "to download, to search" }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'computer'?", options: ["mobil", "dator", "skärm", "app"], answer: 1 },
                { type: "type", prompt: "Type the Swedish word for 'email'.", answer: "e-post", accept: ["e-post", "epost", "mejl"] },
                { type: "mc", prompt: "Which word means 'password'?", options: ["hemsida", "lösenord", "internet", "skärm"], answer: 1 },
                { type: "trueFalse", claim: "'att söka' means 'to search'.", answer: true },
                { type: "type", prompt: "Type the Swedish verb for 'to download'.", answer: "att ladda ner", accept: ["att ladda ner", "ladda ner"] },
                { type: "mc", prompt: "What does 'skärm' mean?", options: ["screen", "phone", "app", "website"], answer: 0 }
            ]
        },
        {
            id: "swe-49",
            moduleId: "vocabulary",
            moduleTitle: "Everyday Vocabulary",
            title: "Shopping and Money",
            explanation: [
                { type: "p", text: "Vocabulary for shopping and handling money." },
                { type: "example", sv: "att köpa, att sälja, att betala", en: "to buy, to sell, to pay" },
                { type: "example", sv: "affär, pengar, pris", en: "store/shop, money, price" },
                { type: "example", sv: "billig, dyr", en: "cheap, expensive" },
                { type: "example", sv: "kvitto, kort, kontanter", en: "receipt, card, cash" }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'to buy'?", options: ["att sälja", "att köpa", "att betala", "att söka"], answer: 1 },
                { type: "type", prompt: "Type the Swedish word for 'money'.", answer: "pengar", accept: ["pengar"] },
                { type: "mc", prompt: "Which word means 'expensive'?", options: ["billig", "dyr", "pengar", "kort"], answer: 1 },
                { type: "trueFalse", claim: "'billig' means 'cheap'.", answer: true },
                { type: "type", prompt: "Type the Swedish word for 'receipt'.", answer: "kvitto", accept: ["kvitto"] },
                { type: "mc", prompt: "What does 'att betala' mean?", options: ["to buy", "to sell", "to pay", "to search"], answer: 2 }
            ]
        },

        // ── Module 8: Real-Life Communication ────────────────────────────
        {
            id: "swe-50",
            moduleId: "communication",
            moduleTitle: "Real-Life Communication",
            title: "Asking and Giving Personal Information",
            explanation: [
                { type: "p", text: "The most common get-to-know-you questions." },
                { type: "example", sv: "Vad heter du?", en: "What's your name?" },
                { type: "example", sv: "Hur gammal är du?", en: "How old are you?" },
                { type: "example", sv: "Var bor du? / Vad jobbar du med?", en: "Where do you live? / What do you do for work?" },
                { type: "example", sv: "Jag är tjugo år gammal.", en: "I am twenty years old." }
            ],
            exercises: [
                { type: "mc", prompt: "What does 'Hur gammal är du?' ask?", options: ["What's your name?", "How old are you?", "Where do you live?", "What do you do?"], answer: 1 },
                { type: "type", prompt: "Complete: 'Jag är tjugo år ___.' (I am twenty years old.)", answer: "gammal", accept: ["gammal"] },
                { type: "mc", prompt: "Which question asks about someone's job?", options: ["Vad heter du?", "Var bor du?", "Vad jobbar du med?", "Hur gammal är du?"], answer: 2 },
                { type: "trueFalse", claim: "'Var bor du?' asks where you live.", answer: true },
                { type: "type", prompt: "Type the Swedish question for 'What's your name?'.", answer: "vad heter du", accept: ["vad heter du", "Vad heter du?"] },
                { type: "mc", prompt: "How would you answer 'I am 30 years old'?", options: ["Jag har trettio år.", "Jag är trettio år gammal.", "Jag bor trettio år.", "Jag heter trettio år."], answer: 1 }
            ]
        },
        {
            id: "swe-51",
            moduleId: "communication",
            moduleTitle: "Real-Life Communication",
            title: "Asking for Directions and Getting Around",
            explanation: [
                { type: "p", text: "Phrases for finding your way around." },
                { type: "example", sv: "Var är...?", en: "Where is...?" },
                { type: "example", sv: "till vänster, till höger, rakt fram", en: "to the left, to the right, straight ahead" },
                { type: "example", sv: "Hur kommer jag till...?", en: "How do I get to...?" },
                { type: "example", sv: "buss, tåg", en: "bus, train" }
            ],
            exercises: [
                { type: "mc", prompt: "Which phrase means 'to the left'?", options: ["till höger", "till vänster", "rakt fram", "till stan"], answer: 1 },
                { type: "type", prompt: "Type the Swedish phrase for 'straight ahead'.", answer: "rakt fram", accept: ["rakt fram"] },
                { type: "mc", prompt: "Which word means 'train'?", options: ["buss", "tåg", "bil", "flyg"], answer: 1 },
                { type: "trueFalse", claim: "'Hur kommer jag till...?' asks how to get somewhere.", answer: true },
                { type: "type", prompt: "Type the Swedish phrase for 'Where is...?'.", answer: "var är", accept: ["var är"] },
                { type: "mc", prompt: "Which word means 'to the right'?", options: ["till vänster", "till höger", "rakt fram", "där borta"], answer: 1 }
            ]
        },
        {
            id: "swe-52",
            moduleId: "communication",
            moduleTitle: "Real-Life Communication",
            title: "Shopping at a Store or Supermarket",
            explanation: [
                { type: "p", text: "Phrases you'll hear and use while shopping." },
                { type: "example", sv: "Kan jag hjälpa dig?", en: "Can I help you?" },
                { type: "example", sv: "Jag tittar bara.", en: "I'm just looking." },
                { type: "example", sv: "Var hittar jag...?", en: "Where do I find...?" },
                { type: "example", sv: "varukorg, kassa", en: "shopping basket, checkout" }
            ],
            exercises: [
                { type: "mc", prompt: "What does 'Kan jag hjälpa dig?' mean?", options: ["Can I help you?", "Can you help me?", "Where is it?", "How much is it?"], answer: 0 },
                { type: "type", prompt: "Type the Swedish phrase for 'I'm just looking'.", answer: "jag tittar bara", accept: ["jag tittar bara"] },
                { type: "mc", prompt: "Which word means 'checkout'?", options: ["varukorg", "kassa", "kvitto", "affär"], answer: 1 },
                { type: "trueFalse", claim: "'Har du...?' means 'Do you have...?'", answer: true },
                { type: "type", prompt: "Type the Swedish word for 'shopping basket'.", answer: "varukorg", accept: ["varukorg"] },
                { type: "mc", prompt: "Which phrase asks where to find something?", options: ["Var hittar jag...?", "Var bor du?", "Hur mår du?", "Vad kostar det?"], answer: 0 }
            ]
        },
        {
            id: "swe-53",
            moduleId: "communication",
            moduleTitle: "Real-Life Communication",
            title: "Ordering Food and Drinks",
            explanation: [
                { type: "p", text: "Phrases for restaurants and cafés." },
                { type: "example", sv: "Jag skulle vilja ha...", en: "I would like..." },
                { type: "example", sv: "Kan jag få...?", en: "Can I get/have...?" },
                { type: "example", sv: "meny, notan, tack", en: "menu, the bill, please" },
                { type: "example", sv: "Finns det plats för två?", en: "Is there room for two?" }
            ],
            exercises: [
                { type: "mc", prompt: "How do you say 'I would like...'?", options: ["Jag skulle vilja ha...", "Jag heter...", "Jag kommer från...", "Jag bor..."], answer: 0 },
                { type: "type", prompt: "Type the Swedish phrase for 'Can I get/have...?'.", answer: "kan jag få", accept: ["kan jag få"] },
                { type: "mc", prompt: "Which word means 'menu'?", options: ["nota", "meny", "kvitto", "kassa"], answer: 1 },
                { type: "trueFalse", claim: "'Notan, tack' means 'The bill, please'.", answer: true },
                { type: "type", prompt: "Type the Swedish phrase asking if there's room for two.", answer: "finns det plats för två", accept: ["finns det plats för två"] },
                { type: "mc", prompt: "What does 'Smakar det bra?' mean?", options: ["Is it expensive?", "Does it taste good?", "Is it ready?", "Do you like it?"], answer: 1 }
            ]
        },
        {
            id: "swe-54",
            moduleId: "communication",
            moduleTitle: "Real-Life Communication",
            title: "Talking about the Weather",
            explanation: [
                { type: "p", text: "Small talk about the weather is as common in Sweden as anywhere." },
                { type: "example", sv: "Hur är vädret?", en: "How's the weather?" },
                { type: "example", sv: "Det är sol. / Det regnar. / Det snöar.", en: "It's sunny. / It's raining. / It's snowing." },
                { type: "example", sv: "Det är kallt. / Det är varmt.", en: "It's cold. / It's warm." },
                { type: "example", sv: "vind, moln", en: "wind, cloud" }
            ],
            exercises: [
                { type: "mc", prompt: "What does 'Hur är vädret?' ask?", options: ["What time is it?", "How's the weather?", "Where are you?", "How are you?"], answer: 1 },
                { type: "type", prompt: "Type the Swedish phrase for 'It's snowing'.", answer: "det snöar", accept: ["det snöar"] },
                { type: "mc", prompt: "Which word means 'wind'?", options: ["moln", "vind", "sol", "regn"], answer: 1 },
                { type: "trueFalse", claim: "'Det är sol' means 'It's sunny'.", answer: true },
                { type: "type", prompt: "Type the Swedish phrase for 'It's cold'.", answer: "det är kallt", accept: ["det är kallt"] },
                { type: "mc", prompt: "Which word means 'cloud'?", options: ["moln", "vind", "sol", "snö"], answer: 0 }
            ]
        },
        {
            id: "swe-55",
            moduleId: "communication",
            moduleTitle: "Real-Life Communication",
            title: "Describing Your Daily Routine",
            explanation: [
                { type: "p", text: "Verbs for describing a typical day, roughly in order." },
                { type: "example", sv: "att vakna, att gå upp, att duscha", en: "to wake up, to get up, to shower" },
                { type: "example", sv: "att äta frukost, att åka till jobbet", en: "to eat breakfast, to head to work" },
                { type: "example", sv: "att komma hem, att lägga sig", en: "to come home, to go to bed" }
            ],
            exercises: [
                { type: "mc", prompt: "Which verb means 'to wake up'?", options: ["att gå upp", "att vakna", "att duscha", "att lägga sig"], answer: 1 },
                { type: "type", prompt: "Type the Swedish verb phrase for 'to go to bed'.", answer: "att lägga sig", accept: ["att lägga sig", "lägga sig"] },
                { type: "mc", prompt: "Which verb means 'to get up'?", options: ["att vakna", "att gå upp", "att åka", "att duscha"], answer: 1 },
                { type: "trueFalse", claim: "'att lägga sig' is a reflexive verb phrase.", answer: true },
                { type: "type", prompt: "Type the Swedish phrase for 'to head to work'.", answer: "att åka till jobbet", accept: ["att åka till jobbet", "åka till jobbet"] },
                { type: "mc", prompt: "What does 'att komma hem' mean?", options: ["to leave home", "to come home", "to go to work", "to wake up"], answer: 1 }
            ]
        },
        {
            id: "swe-56",
            moduleId: "communication",
            moduleTitle: "Real-Life Communication",
            title: "Expressing Preferences and Opinions",
            explanation: [
                { type: "p", text: "Phrases for saying what you like and think." },
                { type: "example", sv: "Jag gillar... / Jag gillar inte...", en: "I like... / I don't like..." },
                { type: "example", sv: "Jag föredrar...", en: "I prefer..." },
                { type: "example", sv: "Jag tycker...", en: "I think/feel..." },
                { type: "example", sv: "Jag håller med. / Jag håller inte med.", en: "I agree. / I disagree." }
            ],
            exercises: [
                { type: "mc", prompt: "How do you say 'I prefer...'?", options: ["Jag gillar...", "Jag föredrar...", "Jag tycker...", "Jag håller med..."], answer: 1 },
                { type: "type", prompt: "Type the Swedish phrase for 'I agree'.", answer: "jag håller med", accept: ["jag håller med"] },
                { type: "mc", prompt: "Which phrase means 'I think/feel that...' (opinion)?", options: ["Jag gillar...", "Jag tycker...", "Jag föredrar...", "Jag håller inte med..."], answer: 1 },
                { type: "trueFalse", claim: "'Jag håller inte med' means 'I disagree'.", answer: true },
                { type: "type", prompt: "Type the Swedish phrase for 'I don't like...'.", answer: "jag gillar inte", accept: ["jag gillar inte"] },
                { type: "mc", prompt: "What does 'Jag föredrar te' mean?", options: ["I like tea", "I don't like tea", "I prefer tea", "I think tea"], answer: 2 }
            ]
        },
        {
            id: "swe-57",
            moduleId: "communication",
            moduleTitle: "Real-Life Communication",
            title: "Making Suggestions and Invitations",
            explanation: [
                { type: "p", text: "Phrases for proposing plans and inviting people along." },
                { type: "example", sv: "Ska vi...?", en: "Shall we...?" },
                { type: "example", sv: "Vill du följa med? / Har du lust att...?", en: "Do you want to come along? / Do you feel like...?" },
                { type: "example", sv: "Vi kanske kan...?", en: "Maybe we could...?" },
                { type: "example", sv: "Det låter bra. / Gärna!", en: "That sounds good. / Gladly!" }
            ],
            exercises: [
                { type: "mc", prompt: "How do you say 'Shall we...?' when suggesting something?", options: ["Vill du följa med?", "Ska vi...?", "Har du lust att...?", "Gärna!"], answer: 1 },
                { type: "type", prompt: "Type the Swedish phrase for 'That sounds good'.", answer: "det låter bra", accept: ["det låter bra"] },
                { type: "mc", prompt: "Which phrase invites someone along?", options: ["Vill du följa med?", "Ska vi...?", "Jag tycker...", "Jag håller med"], answer: 0 },
                { type: "trueFalse", claim: "'Gärna!' means 'Gladly!' or 'Sure!'", answer: true },
                { type: "type", prompt: "Type the Swedish phrase for 'Do you feel like...?'.", answer: "har du lust att", accept: ["har du lust att"] },
                { type: "mc", prompt: "What does 'Vi kanske kan...?' mean?", options: ["Shall we...?", "Maybe we could...?", "Do you want to...?", "That sounds good"], answer: 1 }
            ]
        },
        {
            id: "swe-58",
            moduleId: "communication",
            moduleTitle: "Real-Life Communication",
            title: "Talking about Future Plans",
            explanation: [
                { type: "p", text: "Phrases for talking about what's coming up." },
                { type: "example", sv: "Vad ska du göra imorgon?", en: "What are you going to do tomorrow?" },
                { type: "example", sv: "Jag ska resa till...", en: "I'm going to travel to..." },
                { type: "example", sv: "Jag har planer på att...", en: "I have plans to..." },
                { type: "example", sv: "om en vecka, nästa år", en: "in a week, next year" }
            ],
            exercises: [
                { type: "mc", prompt: "What does 'Vad ska du göra imorgon?' ask?", options: ["What did you do yesterday?", "What are you going to do tomorrow?", "What do you do for work?", "Where do you live?"], answer: 1 },
                { type: "type", prompt: "Type the Swedish phrase for 'in a week'.", answer: "om en vecka", accept: ["om en vecka"] },
                { type: "mc", prompt: "Which phrase means 'next year'?", options: ["imorgon", "om en vecka", "nästa år", "idag"], answer: 2 },
                { type: "trueFalse", claim: "'Jag har planer på att...' means 'I have plans to...'", answer: true },
                { type: "type", prompt: "Complete: 'Jag ___ resa till Sverige.' (I'm going to travel to Sweden.)", answer: "ska", accept: ["ska", "skall"], hint: "att skola" },
                { type: "mc", prompt: "Which phrase expresses a tentative future intention, 'Maybe I'll travel...'?", options: ["Jag ska...", "Jag har planer på att...", "Kanske reser jag...", "Jag föredrar..."], answer: 2 }
            ]
        }
    ]
};

// Additive dual-export (see the header note): merge onto the shared global so
// load order relative to lessons-norwegian.js never clobbers the other course,
// and expose the same object to api/_lib.js's require() for id validation.
if (typeof window !== "undefined") {
    window.POLYTYPE_LESSONS = Object.assign(window.POLYTYPE_LESSONS || {}, SWEDISH_LESSONS_DATA);
}
if (typeof module !== "undefined" && module.exports) module.exports = SWEDISH_LESSONS_DATA;
