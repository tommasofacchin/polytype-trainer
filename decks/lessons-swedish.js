// Swedish "Lessons" curriculum - a hand-authored sequence of short
// grammar/vocab lessons, the Swedish counterpart of decks/lessons-norwegian.js.
// Same data shape and the same dual-export contract, so js/lessons.js,
// js/router.js and api/_lib.js can treat every language's lessons uniformly.
//
// Currently ships the first two modules (Grammar Foundations + Numbers, 18
// lessons). Later modules mirror the Norwegian curriculum's structure (Nouns,
// Adjectives, Verbs, Syntax, Vocabulary, Communication) and can be appended
// here without touching any wiring.
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
//   { type: "type", prompt, answer: "<canonical>", accept: ["<alt spellings>"] }
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
                { type: "type", prompt: "Complete: 'De ___ glada.' (They are happy.)", answer: "är", accept: ["är"] }
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
                { type: "type", prompt: "Type: 'Jag ___ en bil.' (I have a car.)", answer: "har", accept: ["har"] },
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
                { type: "type", prompt: "Complete: 'Jag ___ i Stockholm.' (I live in Stockholm.)", answer: "bor", accept: ["bor"] }
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
