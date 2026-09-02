// Italian "Lessons" curriculum - a hand-authored sequence of short
// grammar/vocab lessons, the Italian counterpart of the other decks/lessons-*.js
// files. Same data shape and the same dual-export contract, so js/lessons.js,
// js/router.js and api/_lib.js can treat every language's lessons uniformly.
//
// Ships the full 8-module curriculum (58 lessons): Grammar Foundations,
// Numbers, Nouns & Articles, Adjectives, Verbs, Sentence Structure, Everyday
// Vocabulary, and Real-Life Communication - mirroring the other courses'
// structure. Further lessons can be appended here without touching any wiring.
//
// Italian differs from the other courses in ways the content reflects: two
// genders (masculine -o / feminine -a), three verb conjugations (-are/-ere/
// -ire) that all inflect by person, articles that change with the following
// sound (il/lo/la, un/uno/una), subject pronouns that are usually dropped, and
// the passato prossimo built with avere or essere.
//
// Lesson order in the array IS the unlock order - a lesson at array index i
// is playable once profile.courses.italian.lessonsCompleted.length >= i.
// id values ("ita-NN") must stay stable and never be reordered or reused once
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
// Example rows use { type: "example", it: "...", en: "..." }.

const ITALIAN_LESSONS_DATA = {
    italian: [
        // ── Module 1: Grammar Foundations ────────────────────────────────
        {
            id: "ita-01",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "Alphabet, Sounds & Stress",
            explanation: [
                { type: "p", text: "The Italian alphabet has 21 letters. Five more (j, k, w, x, y) appear only in foreign words. Italian is very phonetic - words are mostly pronounced exactly as they're written." },
                { type: "p", text: "'c' and 'g' are hard before a, o, u (casa, gatto) but soft before e, i (cena, gelato). The clusters 'gl' and 'gn' have special sounds (figlio, gnocchi), and 'ch/gh' keep the hard sound before e, i (chi, spaghetti)." },
                { type: "example", it: "ciao", en: "hi / bye" },
                { type: "example", it: "grazie", en: "thank you" },
                { type: "p", text: "Stress usually falls on the second-to-last syllable. A written accent (as in città, caffè) marks stress on the final vowel. Double consonants are pronounced longer and really matter (nonno = grandpa vs. nono = ninth)." },
                { type: "example", it: "città", en: "city" },
                { type: "example", it: "caffè", en: "coffee" }
            ],
            exercises: [
                { type: "mc", prompt: "How many letters are in the Italian alphabet?", options: ["21", "24", "26", "5"], answer: 0 },
                { type: "trueFalse", claim: "In Italian, 'c' before 'e' or 'i' is pronounced soft (like 'ch' in 'church').", answer: true },
                { type: "mc", prompt: "Where does stress usually fall in an Italian word?", options: ["the last syllable", "the second-to-last syllable", "the first syllable", "it's random"], answer: 1 },
                { type: "type", prompt: "Type the Italian word for 'thank you'.", answer: "grazie", accept: ["grazie"] },
                { type: "trueFalse", claim: "Double consonants (as in 'nonno') change a word's meaning and are pronounced longer.", answer: true },
                { type: "mc", prompt: "Which word means 'hi / bye'?", options: ["grazie", "ciao", "città", "caffè"], answer: 1 }
            ]
        },
        {
            id: "ita-02",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "Subject Pronouns",
            explanation: [
                { type: "p", text: "Subject pronouns are the 'doer' of a sentence. In Italian they're often left out, because the verb ending already shows who is acting." },
                { type: "example", it: "io", en: "I" },
                { type: "example", it: "tu", en: "you (singular, informal)" },
                { type: "example", it: "lui / lei", en: "he / she" },
                { type: "example", it: "noi", en: "we" },
                { type: "example", it: "voi", en: "you (plural)" },
                { type: "example", it: "loro", en: "they" },
                { type: "p", text: "'Lei' with a capital L is also the polite 'you' used with strangers or in formal situations." }
            ],
            exercises: [
                { type: "mc", prompt: "Which pronoun means 'I'?", options: ["tu", "io", "noi", "loro"], answer: 1 },
                { type: "mc", prompt: "Which pronoun means 'we'?", options: ["noi", "voi", "loro", "tu"], answer: 0 },
                { type: "trueFalse", claim: "'tu' is the informal 'you' for one person.", answer: true },
                { type: "type", prompt: "Type the Italian word for 'you' (plural).", answer: "voi", accept: ["voi"] },
                { type: "mc", prompt: "Which word is also the polite/formal 'you'?", options: ["tu", "voi", "Lei", "loro"], answer: 2 },
                { type: "trueFalse", claim: "Italian usually leaves out the subject pronoun because the verb ending shows who is acting.", answer: true }
            ]
        },
        {
            id: "ita-03",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "The Verb essere (to be) - Present Tense",
            explanation: [
                { type: "p", text: "Italian verbs change their ending for each subject. 'essere' (to be) is irregular and essential to memorize." },
                { type: "example", it: "io sono", en: "I am" },
                { type: "example", it: "tu sei", en: "you are" },
                { type: "example", it: "lui/lei è", en: "he/she is" },
                { type: "example", it: "noi siamo", en: "we are" },
                { type: "example", it: "voi siete", en: "you (pl.) are" },
                { type: "example", it: "loro sono", en: "they are" },
                { type: "p", text: "Note that 'è' (is) carries a written accent, which distinguishes it from 'e' (and)." }
            ],
            exercises: [
                { type: "mc", prompt: "What is the form of 'essere' for 'io'?", options: ["sono", "sei", "è", "siamo"], answer: 0 },
                { type: "mc", prompt: "Complete: 'Tu ___ gentile.' (You are kind.)", options: ["sono", "sei", "è", "siete"], answer: 1 },
                { type: "type", prompt: "Type the form of 'essere' used with 'noi' (we).", answer: "siamo", accept: ["siamo"] },
                { type: "trueFalse", claim: "'è' (is) has a written accent to tell it apart from 'e' (and).", answer: true },
                { type: "mc", prompt: "How do you say 'She is here'? (qui = here)", options: ["Lei sono qui.", "Lei sei qui.", "Lei è qui.", "Lei siamo qui."], answer: 2 },
                { type: "type", prompt: "Complete: 'Io ___ stanco.' (I am tired.)", answer: "sono", accept: ["sono"], hint: "essere" }
            ]
        },
        {
            id: "ita-04",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "The Verb avere (to have) - Present Tense",
            explanation: [
                { type: "p", text: "'avere' (to have) is another essential irregular verb. Watch out: the 'h' is always silent, it's just written." },
                { type: "example", it: "io ho", en: "I have" },
                { type: "example", it: "tu hai", en: "you have" },
                { type: "example", it: "lui/lei ha", en: "he/she has" },
                { type: "example", it: "noi abbiamo", en: "we have" },
                { type: "example", it: "voi avete", en: "you (pl.) have" },
                { type: "example", it: "loro hanno", en: "they have" },
                { type: "p", text: "The 'h' in ho, hai, ha, hanno isn't pronounced - it only tells these apart from other words (like 'a' = to, 'anno' = year)." }
            ],
            exercises: [
                { type: "mc", prompt: "What is the 'io' form of 'avere'?", options: ["ho", "hai", "ha", "hanno"], answer: 0 },
                { type: "type", prompt: "Complete: 'Io ___ una macchina.' (I have a car.)", answer: "ho", accept: ["ho"], hint: "avere" },
                { type: "mc", prompt: "How do you say 'She has two children'? (due bambini)", options: ["Lei ho due bambini.", "Lei hai due bambini.", "Lei ha due bambini.", "Lei hanno due bambini."], answer: 2 },
                { type: "trueFalse", claim: "The 'h' in 'ho' and 'hanno' is silent.", answer: true },
                { type: "type", prompt: "Type the form of 'avere' used with 'noi' (we).", answer: "abbiamo", accept: ["abbiamo"] },
                { type: "mc", prompt: "Which is correct for 'They have time'? (tempo = time)", options: ["Loro hanno tempo.", "Loro ha tempo.", "Loro avete tempo.", "Loro ho tempo."], answer: 0 }
            ]
        },
        {
            id: "ita-05",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "Regular Verb Conjugation (Present)",
            explanation: [
                { type: "p", text: "Italian verbs fall into three groups by their infinitive ending: -are, -ere, and -ire. Each has its own set of present-tense endings." },
                { type: "example", it: "parlare → parlo, parli, parla", en: "to speak → I/you/he speak(s)" },
                { type: "example", it: "parliamo, parlate, parlano", en: "we/you(pl.)/they speak" },
                { type: "example", it: "prendere → prendo, prendi, prende...", en: "to take → I/you/he take(s)..." },
                { type: "example", it: "dormire → dormo, dormi, dorme...", en: "to sleep → I/you/he sleep(s)..." },
                { type: "p", text: "So the ending changes with the subject. The 'io' form ends in -o for all three groups; the differences show up in the other persons." }
            ],
            exercises: [
                { type: "mc", prompt: "Which are the three Italian verb groups?", options: ["-are, -ere, -ire", "-ar, -er, -ir", "-o, -i, -a", "-are, -ire, -ore"], answer: 0 },
                { type: "type", prompt: "Complete: 'Io ___ italiano.' (parlare - I speak Italian.)", answer: "parlo", accept: ["parlo"] },
                { type: "mc", prompt: "What is the 'tu' form of 'parlare' (to speak)?", options: ["parlo", "parli", "parla", "parlano"], answer: 1 },
                { type: "trueFalse", claim: "The verb ending in Italian depends on the subject.", answer: true },
                { type: "type", prompt: "Complete: 'Noi ___ italiano.' (parlare - We speak Italian.)", answer: "parliamo", accept: ["parliamo"] },
                { type: "mc", prompt: "What is the 'lui/lei' form of 'dormire' (to sleep)?", options: ["dormo", "dormi", "dorme", "dormono"], answer: 2 }
            ]
        },
        {
            id: "ita-06",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "Definite Articles (il, la, i, le)",
            explanation: [
                { type: "p", text: "'The' changes with the noun's gender, number, and even its first letter. Masculine singular is usually 'il' (or 'lo' before s+consonant, z, gn, ps; 'l'' before a vowel). Feminine singular is 'la' (or 'l'' before a vowel)." },
                { type: "example", it: "il libro / lo zaino / l'amico", en: "the book / the backpack / the friend (m)" },
                { type: "example", it: "la casa / l'amica", en: "the house / the friend (f)" },
                { type: "p", text: "In the plural: masculine 'i' (or 'gli' before a vowel, s+consonant, z...), feminine 'le'." },
                { type: "example", it: "i libri / gli amici", en: "the books / the friends (m)" },
                { type: "example", it: "le case", en: "the houses" }
            ],
            exercises: [
                { type: "mc", prompt: "Which article goes with a feminine singular noun starting with a consonant?", options: ["il", "lo", "la", "le"], answer: 2 },
                { type: "mc", prompt: "Which masculine plural article is used before a vowel or s+consonant?", options: ["i", "gli", "le", "lo"], answer: 1 },
                { type: "type", prompt: "Type the definite article for 'casa' (house, feminine singular).", answer: "la", accept: ["la"] },
                { type: "trueFalse", claim: "The Italian definite article changes depending on the noun's gender and number.", answer: true },
                { type: "mc", prompt: "Which article goes with 'zaino' (backpack, masc. sing., starts with z)?", options: ["il", "lo", "la", "gli"], answer: 1 },
                { type: "type", prompt: "Type the feminine plural definite article.", answer: "le", accept: ["le"] }
            ]
        },
        {
            id: "ita-07",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "Indefinite Articles (un, uno, una)",
            explanation: [
                { type: "p", text: "'A/an' also depends on gender and the first letter. Masculine is 'un' (or 'uno' before s+consonant, z, gn, ps). Feminine is 'una' (or 'un'' before a vowel)." },
                { type: "example", it: "un libro / uno studente", en: "a book / a student (m)" },
                { type: "example", it: "una casa / un'amica", en: "a house / a friend (f)" },
                { type: "p", text: "Note: masculine 'un' takes NO apostrophe before a vowel (un amico), but feminine 'una' becomes 'un'' with an apostrophe (un'amica)." }
            ],
            exercises: [
                { type: "mc", prompt: "Which indefinite article goes with a feminine noun starting with a consonant?", options: ["un", "uno", "una", "un'"], answer: 2 },
                { type: "type", prompt: "Complete: '___ libro' (a book - masculine, starts with a consonant).", answer: "un", accept: ["un"] },
                { type: "mc", prompt: "Which article goes with 'studente' (student, masc., starts with s+consonant)?", options: ["un", "uno", "una", "un'"], answer: 1 },
                { type: "trueFalse", claim: "Masculine 'un' takes an apostrophe before a vowel (un'amico).", answer: false },
                { type: "mc", prompt: "How do you say 'a friend (female)'? (amica)", options: ["un amica", "uno amica", "una amica", "un'amica"], answer: 3 },
                { type: "type", prompt: "Complete: '___ casa' (a house - feminine).", answer: "una", accept: ["una"] }
            ]
        },
        {
            id: "ita-08",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "Possessive Adjectives",
            explanation: [
                { type: "p", text: "Possessive adjectives agree in gender and number with the thing owned, and usually come WITH the definite article." },
                { type: "example", it: "il mio libro / la mia casa", en: "my book / my house" },
                { type: "example", it: "il tuo, il suo", en: "your (sg.), his/her" },
                { type: "example", it: "il nostro, il vostro, il loro", en: "our, your (pl.), their" },
                { type: "p", text: "Unlike English, 'il suo' means both 'his' and 'her' - it agrees with the object owned, not the owner. 'la sua casa' = his/her house." }
            ],
            exercises: [
                { type: "mc", prompt: "What does the Italian possessive agree with?", options: ["the owner's gender", "the gender/number of the thing owned", "nothing", "the verb"], answer: 1 },
                { type: "mc", prompt: "Which means 'my' (before a feminine noun like 'casa')?", options: ["il mio", "la mia", "il tuo", "la tua"], answer: 1 },
                { type: "type", prompt: "Complete: 'il ___ libro' (my book - masculine).", answer: "mio", accept: ["mio"] },
                { type: "trueFalse", claim: "'il suo' can mean both 'his' and 'her'.", answer: true },
                { type: "mc", prompt: "How do you say 'our house'? (casa, feminine)", options: ["il nostro casa", "la nostra casa", "la nostro casa", "le nostre casa"], answer: 1 },
                { type: "type", prompt: "Type the Italian for 'your' (singular) before a masculine noun (as in 'il ___ libro').", answer: "tuo", accept: ["tuo"] }
            ]
        },
        {
            id: "ita-09",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "Negation with non",
            explanation: [
                { type: "p", text: "To make a sentence negative, just put 'non' directly before the verb. There's no helper word like English 'do'." },
                { type: "example", it: "Non capisco.", en: "I don't understand." },
                { type: "example", it: "Lei non è a casa.", en: "She isn't home." },
                { type: "example", it: "Non mi piace il pesce.", en: "I don't like fish." },
                { type: "p", text: "For 'never', Italian uses a double negative: 'non ... mai'. Both words are needed - it's completely standard." },
                { type: "example", it: "Non mangio mai carne.", en: "I never eat meat." }
            ],
            exercises: [
                { type: "mc", prompt: "Where does 'non' go in a sentence?", options: ["at the end", "directly before the verb", "before the subject", "after the object"], answer: 1 },
                { type: "type", prompt: "Type the Italian word for 'not' (the negation word).", answer: "non", accept: ["non"] },
                { type: "mc", prompt: "How do you say 'I don't like fish'?", options: ["Mi piace non il pesce.", "Non mi piace il pesce.", "Mi non piace il pesce.", "Mi piace il pesce non."], answer: 1 },
                { type: "trueFalse", claim: "Italian needs a helper word like English 'do' to form a negative.", answer: false },
                { type: "mc", prompt: "How do you say 'I never eat meat'?", options: ["Mangio mai carne.", "Non mangio carne.", "Non mangio mai carne.", "Mai mangio carne."], answer: 2 },
                { type: "type", prompt: "Complete: 'Lei ___ è a casa.' (She isn't home.)", answer: "non", accept: ["non"] }
            ]
        },
        {
            id: "ita-10",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "Yes/No Questions",
            explanation: [
                { type: "p", text: "The easiest way to ask a yes/no question in Italian is to keep the same word order as a statement and just raise your intonation (in writing, add a question mark)." },
                { type: "example", it: "Sei stanco. → Sei stanco?", en: "You are tired. → Are you tired?" },
                { type: "example", it: "Parli italiano. → Parli italiano?", en: "You speak Italian. → Do you speak Italian?" },
                { type: "p", text: "No helper word like English 'do/does' is needed, and no word order change is required - context and intonation do the work." }
            ],
            exercises: [
                { type: "mc", prompt: "How do you turn 'Sei stanco' into a question?", options: ["Stanco sei?", "Sei stanco?", "È sei stanco?", "Fai sei stanco?"], answer: 1 },
                { type: "trueFalse", claim: "Italian yes/no questions need a helper word like 'do'.", answer: false },
                { type: "mc", prompt: "What's the main way to signal a yes/no question in spoken Italian?", options: ["Change the word order", "Add 'fa' at the start", "Raise your intonation", "Move the verb to the end"], answer: 2 },
                { type: "type", prompt: "Complete the question: '___ italiano?' (Do you speak Italian? - 'tu' form of parlare).", answer: "Parli", accept: ["Parli", "parli"] },
                { type: "trueFalse", claim: "To ask a yes/no question, Italian usually keeps the same word order as a statement.", answer: true },
                { type: "mc", prompt: "Which is a correct yes/no question for 'Does she speak Italian?'", options: ["Parla italiano?", "Italiano parla lei fa?", "Fa parlare italiano?", "Parlare lei italiano?"], answer: 0 }
            ]
        },
        {
            id: "ita-11",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "Question Words",
            explanation: [
                { type: "p", text: "These question words cover most of what you'll ever need to ask." },
                { type: "example", it: "che cosa / cosa", en: "what" },
                { type: "example", it: "dove", en: "where" },
                { type: "example", it: "quando", en: "when" },
                { type: "example", it: "perché", en: "why / because" },
                { type: "example", it: "come", en: "how" },
                { type: "example", it: "chi", en: "who" },
                { type: "example", it: "Come ti chiami?", en: "What's your name? (lit. How do you call yourself?)" },
                { type: "example", it: "Dove abiti?", en: "Where do you live?" }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'where'?", options: ["cosa", "dove", "quando", "chi"], answer: 1 },
                { type: "mc", prompt: "Which word means 'why'? (it also means 'because')", options: ["come", "perché", "chi", "cosa"], answer: 1 },
                { type: "type", prompt: "Type the Italian word for 'who'.", answer: "chi", accept: ["chi"] },
                { type: "mc", prompt: "'Come ti chiami?' is asking...", options: ["Where do you live?", "What's your name?", "How old are you?", "When do you arrive?"], answer: 1 },
                { type: "trueFalse", claim: "'quando' means 'when'.", answer: true },
                { type: "type", prompt: "Complete: '___ abiti?' (Where do you live?)", answer: "Dove", accept: ["Dove", "dove"] }
            ]
        },
        {
            id: "ita-12",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "Short Answers: sì and no",
            explanation: [
                { type: "p", text: "'sì' means yes (note the accent, which tells it apart from 'si', a reflexive/impersonal particle), and 'no' means no." },
                { type: "example", it: "sì", en: "yes" },
                { type: "example", it: "no", en: "no" },
                { type: "p", text: "To politely soften a 'no' you can add 'grazie' (no, grazie = no, thanks). A common way to strongly agree is 'certo!' (of course / sure!)." },
                { type: "example", it: "Vuoi un caffè? – Sì, grazie!", en: "Do you want a coffee? – Yes, thanks!" }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'no'?", options: ["sì", "no", "certo", "non"], answer: 1 },
                { type: "type", prompt: "Type the Italian word for 'yes'.", answer: "sì", accept: ["sì"] },
                { type: "trueFalse", claim: "'sì' (yes) has a written accent to tell it apart from 'si'.", answer: true },
                { type: "mc", prompt: "What does 'certo!' express?", options: ["no", "maybe", "of course / sure!", "never"], answer: 2 },
                { type: "type", prompt: "Type the Italian word for 'no'.", answer: "no", accept: ["no"] },
                { type: "mc", prompt: "How would you politely decline, 'no, thanks'?", options: ["sì, grazie", "no, grazie", "certo", "no, mai"], answer: 1 }
            ]
        },

        // ── Module 2: Numbers ────────────────────────────────────────────
        {
            id: "ita-13",
            moduleId: "numbers",
            moduleTitle: "Numbers",
            title: "Numbers 0-10",
            explanation: [
                { type: "p", text: "Italian numbers 0 to 10 are essential building blocks - you'll combine them constantly." },
                { type: "example", it: "zero, uno, due, tre, quattro", en: "0, 1, 2, 3, 4" },
                { type: "example", it: "cinque, sei, sette, otto, nove, dieci", en: "5, 6, 7, 8, 9, 10" },
                { type: "p", text: "The number 'uno' (one) works like the indefinite article before a noun: 'un' before most masculine nouns, 'una' before feminine ones." },
                { type: "example", it: "un libro / una casa", en: "one book / one house" }
            ],
            exercises: [
                { type: "mc", prompt: "What is 'five' in Italian?", options: ["quattro", "cinque", "sei", "sette"], answer: 1 },
                { type: "type", prompt: "Type the Italian word for 'ten'.", answer: "dieci", accept: ["dieci"] },
                { type: "mc", prompt: "Which number is 'otto'?", options: ["6", "7", "8", "9"], answer: 2 },
                { type: "trueFalse", claim: "'sette' means 'seven'.", answer: true },
                { type: "type", prompt: "Type the Italian word for 'three'.", answer: "tre", accept: ["tre"] },
                { type: "mc", prompt: "What is 'four' in Italian?", options: ["quattro", "cinque", "tre", "sei"], answer: 0 }
            ]
        },
        {
            id: "ita-14",
            moduleId: "numbers",
            moduleTitle: "Numbers",
            title: "Numbers 11-20",
            explanation: [
                { type: "p", text: "Numbers 11-16 end in '-dici', while 17-19 flip the order (the ten comes first)." },
                { type: "example", it: "undici, dodici, tredici", en: "11, 12, 13" },
                { type: "example", it: "quattordici, quindici, sedici", en: "14, 15, 16" },
                { type: "example", it: "diciassette, diciotto, diciannove", en: "17, 18, 19" },
                { type: "example", it: "venti", en: "20" }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'eleven'?", options: ["undici", "dodici", "tredici", "venti"], answer: 0 },
                { type: "type", prompt: "Type the Italian word for 'twelve'.", answer: "dodici", accept: ["dodici"] },
                { type: "mc", prompt: "What number is 'sedici'?", options: ["15", "16", "17", "18"], answer: 1 },
                { type: "trueFalse", claim: "Numbers 17-19 are formed differently from 11-16.", answer: true },
                { type: "type", prompt: "Type the Italian word for 'twenty'.", answer: "venti", accept: ["venti"] },
                { type: "mc", prompt: "Which word means 'eighteen'?", options: ["diciassette", "diciotto", "diciannove", "sedici"], answer: 1 }
            ]
        },
        {
            id: "ita-15",
            moduleId: "numbers",
            moduleTitle: "Numbers",
            title: "Tens: 20-100",
            explanation: [
                { type: "p", text: "The multiples of ten from 20 to 90 are their own words to learn." },
                { type: "example", it: "venti, trenta, quaranta, cinquanta", en: "20, 30, 40, 50" },
                { type: "example", it: "sessanta, settanta, ottanta, novanta", en: "60, 70, 80, 90" },
                { type: "example", it: "cento", en: "100" }
            ],
            exercises: [
                { type: "mc", prompt: "What number is 'cinquanta'?", options: ["40", "50", "60", "70"], answer: 1 },
                { type: "type", prompt: "Type the Italian word for 'hundred'.", answer: "cento", accept: ["cento"] },
                { type: "mc", prompt: "Which word means 'seventy'?", options: ["sessanta", "settanta", "ottanta", "novanta"], answer: 1 },
                { type: "type", prompt: "Type the Italian word for 'thirty'.", answer: "trenta", accept: ["trenta"] },
                { type: "trueFalse", claim: "'quaranta' means 'forty'.", answer: true },
                { type: "mc", prompt: "What number is 'novanta'?", options: ["80", "90", "100", "70"], answer: 1 }
            ]
        },
        {
            id: "ita-16",
            moduleId: "numbers",
            moduleTitle: "Numbers",
            title: "Compound Numbers 21-99",
            explanation: [
                { type: "p", text: "Numbers 21-99 are formed by joining the tens and the ones into one word. When the ones word starts with a vowel (uno, otto), the tens word drops its final vowel." },
                { type: "example", it: "ventuno", en: "21 (venti + uno)" },
                { type: "example", it: "trentatré", en: "33 (trenta + tre)" },
                { type: "example", it: "cinquantotto", en: "58 (cinquanta + otto)" },
                { type: "example", it: "novantanove", en: "99 (novanta + nove)" },
                { type: "p", text: "So 'venti' + 'uno' becomes 'ventuno' (not 'ventiuno'), and 'trenta' + 'otto' becomes 'trentotto'." }
            ],
            exercises: [
                { type: "type", prompt: "Type the Italian word for '21'.", answer: "ventuno", accept: ["ventuno"] },
                { type: "mc", prompt: "How is 33 said in Italian?", options: ["trentatré", "trentaunotre", "trentaetre", "trentotto"], answer: 0 },
                { type: "trueFalse", claim: "When joining 'venti' + 'uno', the 'i' of venti is dropped (ventuno).", answer: true },
                { type: "type", prompt: "Type the Italian word for '45'.", answer: "quarantacinque", accept: ["quarantacinque"] },
                { type: "mc", prompt: "What number is 'cinquantotto'?", options: ["48", "58", "85", "68"], answer: 1 },
                { type: "type", prompt: "Type the Italian word for '99'.", answer: "novantanove", accept: ["novantanove"] }
            ]
        },
        {
            id: "ita-17",
            moduleId: "numbers",
            moduleTitle: "Numbers",
            title: "Numbers 100-1000",
            explanation: [
                { type: "p", text: "'cento' means hundred and 'mille' means thousand. Bigger numbers put the hundreds first, then the rest, all as one word." },
                { type: "example", it: "centouno", en: "101" },
                { type: "example", it: "duecento", en: "200" },
                { type: "example", it: "cinquecentoventi", en: "520" },
                { type: "example", it: "mille", en: "1000" },
                { type: "p", text: "Note 'cento' never changes, but 'mille' becomes 'mila' in the plural: duemila (2000)." }
            ],
            exercises: [
                { type: "type", prompt: "Type the Italian word for 'hundred'.", answer: "cento", accept: ["cento"] },
                { type: "mc", prompt: "How do you say '200'?", options: ["centodue", "duemila", "duecento", "cento due"], answer: 2 },
                { type: "type", prompt: "Type the Italian word for 'thousand'.", answer: "mille", accept: ["mille"] },
                { type: "trueFalse", claim: "'mille' becomes 'mila' in the plural (e.g. duemila = 2000).", answer: true },
                { type: "mc", prompt: "How do you say '101'?", options: ["centouno", "cento e uno", "unocento", "cento uno"], answer: 0 },
                { type: "type", prompt: "Type the Italian for '520'.", answer: "cinquecentoventi", accept: ["cinquecentoventi"] }
            ]
        },
        {
            id: "ita-18",
            moduleId: "numbers",
            moduleTitle: "Numbers",
            title: "Talking about Prices and Quantities",
            explanation: [
                { type: "p", text: "Italy uses the Euro (€) and centesimi (cents)." },
                { type: "example", it: "Quanto costa?", en: "How much does it cost?" },
                { type: "example", it: "Costa dieci euro.", en: "It costs ten euros." },
                { type: "p", text: "For quantities: 'molto' (much/a lot), 'molti/molte' (many), 'poco' (a little), 'alcuni/alcune' (some)." },
                { type: "example", it: "molta acqua / molti libri", en: "a lot of water / many books" }
            ],
            exercises: [
                { type: "mc", prompt: "What does 'Quanto costa?' mean?", options: ["Where is it?", "How much does it cost?", "What is it?", "When does it open?"], answer: 1 },
                { type: "type", prompt: "Type the currency used in Italy.", answer: "euro", accept: ["euro", "Euro"] },
                { type: "mc", prompt: "Which word means 'many' (masculine plural)?", options: ["molto", "molti", "poco", "alcuni"], answer: 1 },
                { type: "trueFalse", claim: "'molto' can mean 'much / a lot'.", answer: true },
                { type: "type", prompt: "Type the Italian word for 'a little' (masculine).", answer: "poco", accept: ["poco"] },
                { type: "mc", prompt: "How do you say 'It costs ten euros'?", options: ["Costa dieci euro.", "È dieci euro costa.", "Dieci costa euro.", "Costa euro dieci."], answer: 0 }
            ]
        },

        // ── Module 3: Nouns & Articles ───────────────────────────────────
        {
            id: "ita-19",
            moduleId: "nouns",
            moduleTitle: "Nouns & Articles",
            title: "Noun Gender (masculine & feminine)",
            explanation: [
                { type: "p", text: "Every Italian noun is either masculine or feminine. As a rule of thumb, nouns ending in -o are usually masculine, and nouns ending in -a are usually feminine." },
                { type: "example", it: "il libro, il tavolo", en: "the book, the table (masculine)" },
                { type: "example", it: "la casa, la pizza", en: "the house, the pizza (feminine)" },
                { type: "p", text: "There are exceptions (for example 'la mano' = the hand is feminine, 'il problema' = the problem is masculine), so gender is best learned together with each noun." }
            ],
            exercises: [
                { type: "mc", prompt: "Nouns ending in -o are usually...?", options: ["masculine", "feminine", "plural", "neuter"], answer: 0 },
                { type: "mc", prompt: "Which noun is feminine?", options: ["il libro", "il tavolo", "la casa", "il gatto"], answer: 2 },
                { type: "type", prompt: "Type the definite article for 'pizza' (feminine).", answer: "la", accept: ["la"] },
                { type: "trueFalse", claim: "All Italian nouns ending in -a are feminine, with no exceptions.", answer: false },
                { type: "mc", prompt: "What gender is 'libro' (book)?", options: ["masculine", "feminine", "both", "neuter"], answer: 0 },
                { type: "type", prompt: "Type the definite article for 'tavolo' (table, masculine, starts with a consonant).", answer: "il", accept: ["il"] }
            ]
        },
        {
            id: "ita-20",
            moduleId: "nouns",
            moduleTitle: "Nouns & Articles",
            title: "Nouns Ending in -e",
            explanation: [
                { type: "p", text: "Many Italian nouns end in -e, and these can be either masculine or feminine - the ending alone doesn't tell you, so you learn the gender with the word." },
                { type: "example", it: "il fiore, il pane", en: "the flower, the bread (masculine)" },
                { type: "example", it: "la notte, la chiave", en: "the night, the key (feminine)" },
                { type: "p", text: "A helpful hint: nouns ending in -zione or -tà are almost always feminine (la stazione, la città)." },
                { type: "example", it: "la stazione, la città", en: "the station, the city" }
            ],
            exercises: [
                { type: "mc", prompt: "A noun ending in -e is...?", options: ["always masculine", "always feminine", "either masculine or feminine", "always plural"], answer: 2 },
                { type: "type", prompt: "Type the definite article for 'notte' (night, feminine).", answer: "la", accept: ["la"] },
                { type: "mc", prompt: "Which ending is almost always feminine?", options: ["-o", "-zione", "-e", "-ore"], answer: 1 },
                { type: "trueFalse", claim: "'la città' (city) is feminine.", answer: true },
                { type: "type", prompt: "Type the definite article for 'fiore' (flower, masculine).", answer: "il", accept: ["il"] },
                { type: "mc", prompt: "What gender is 'chiave' (key)?", options: ["masculine", "feminine", "both", "neuter"], answer: 1 }
            ]
        },
        {
            id: "ita-21",
            moduleId: "nouns",
            moduleTitle: "Nouns & Articles",
            title: "Making Nouns Plural",
            explanation: [
                { type: "p", text: "Italian nouns form the plural by changing their final vowel, not by adding -s." },
                { type: "example", it: "il libro → i libri", en: "the book → the books (-o → -i)" },
                { type: "example", it: "la casa → le case", en: "the house → the houses (-a → -e)" },
                { type: "example", it: "il fiore → i fiori / la notte → le notti", en: "flower → flowers / night → nights (-e → -i)" },
                { type: "p", text: "So masculine -o and any -e become -i, and feminine -a becomes -e. Remember the article changes too (il → i, la → le)." }
            ],
            exercises: [
                { type: "mc", prompt: "What is the plural of 'il libro' (book)?", options: ["i libri", "i libros", "le libre", "i libre"], answer: 0 },
                { type: "type", prompt: "Type the plural of 'casa' (house).", answer: "case", accept: ["case", "le case"] },
                { type: "mc", prompt: "How does a noun ending in -e change in the plural?", options: ["-e → -i", "-e → -a", "-e → -es", "it doesn't change"], answer: 0 },
                { type: "trueFalse", claim: "Italian forms plurals by changing the final vowel, not by adding -s.", answer: true },
                { type: "type", prompt: "Type the plural of 'fiore' (flower).", answer: "fiori", accept: ["fiori", "i fiori"] },
                { type: "mc", prompt: "What is the plural of 'la casa'?", options: ["le casi", "le case", "i casi", "le casa"], answer: 1 }
            ]
        },
        {
            id: "ita-22",
            moduleId: "nouns",
            moduleTitle: "Nouns & Articles",
            title: "Direct Object Pronouns",
            explanation: [
                { type: "p", text: "Direct object pronouns replace the direct object and usually come right BEFORE the verb." },
                { type: "example", it: "mi, ti", en: "me, you" },
                { type: "example", it: "lo, la", en: "him/it (m), her/it (f)" },
                { type: "example", it: "ci, vi, li/le", en: "us, you (pl.), them (m/f)" },
                { type: "example", it: "Ti vedo.", en: "I see you." },
                { type: "example", it: "La conosco.", en: "I know her." },
                { type: "p", text: "'lo' and 'la' agree with the gender of the thing replaced, and both become 'l'' before a vowel: 'L'ho visto' (I saw it/him)." }
            ],
            exercises: [
                { type: "mc", prompt: "Where do direct object pronouns usually go?", options: ["after the verb", "right before the verb", "at the end", "before the subject"], answer: 1 },
                { type: "mc", prompt: "'Ti ___.' (I see you.) Which verb fits?", options: ["vedo", "vedi", "vede", "vedono"], answer: 0 },
                { type: "trueFalse", claim: "'ci' means 'us'.", answer: true },
                { type: "type", prompt: "Type the direct object pronoun for 'me'.", answer: "mi", accept: ["mi"] },
                { type: "mc", prompt: "Which pronoun would replace a feminine object, 'her'?", options: ["lo", "la", "li", "gli"], answer: 1 },
                { type: "type", prompt: "Complete: '___ conosco.' (I know her - using the pronoun for 'her'.)", answer: "La", accept: ["La", "la"] }
            ]
        },
        {
            id: "ita-23",
            moduleId: "nouns",
            moduleTitle: "Nouns & Articles",
            title: "c'è and ci sono (there is / there are)",
            explanation: [
                { type: "p", text: "To say 'there is', Italian uses 'c'è' (for one thing); to say 'there are', it uses 'ci sono' (for more than one)." },
                { type: "example", it: "C'è un problema.", en: "There is a problem." },
                { type: "example", it: "Ci sono molti ristoranti.", en: "There are many restaurants." },
                { type: "example", it: "C'è una macchina qui.", en: "There is a car here." },
                { type: "p", text: "So the choice depends on singular vs plural: 'c'è' + one thing, 'ci sono' + several things." }
            ],
            exercises: [
                { type: "mc", prompt: "Which phrase means 'there is' (one thing)?", options: ["c'è", "ci sono", "è", "ci"], answer: 0 },
                { type: "mc", prompt: "Which phrase means 'there are' (several things)?", options: ["c'è", "ci sono", "sono", "c'era"], answer: 1 },
                { type: "type", prompt: "Complete: '___ un problema.' (There is a problem.)", answer: "C'è", accept: ["C'è", "c'è"] },
                { type: "trueFalse", claim: "'ci sono' is used for more than one thing.", answer: true },
                { type: "mc", prompt: "How do you say 'There are many restaurants'?", options: ["C'è molti ristoranti.", "Ci sono molti ristoranti.", "Ci è molti ristoranti.", "Sono molti ristoranti."], answer: 1 },
                { type: "type", prompt: "Complete: '___ una macchina qui.' (There is a car here.)", answer: "C'è", accept: ["C'è", "c'è"] }
            ]
        },

        // ── Module 4: Adjectives ─────────────────────────────────────────
        {
            id: "ita-24",
            moduleId: "adjectives",
            moduleTitle: "Adjectives",
            title: "Basic Adjectives & Agreement",
            explanation: [
                { type: "p", text: "Adjectives agree in gender and number with the noun. Most adjectives end in -o and have four forms: -o (m sing), -a (f sing), -i (m pl), -e (f pl)." },
                { type: "example", it: "un libro rosso / una casa rossa", en: "a red book / a red house" },
                { type: "example", it: "libri rossi / case rosse", en: "red books / red houses" },
                { type: "p", text: "Unlike English, the adjective usually comes AFTER the noun. A few essentials: grande (big), piccolo (small), buono (good), cattivo (bad), nuovo (new), vecchio (old)." },
                { type: "example", it: "una casa grande", en: "a big house" }
            ],
            exercises: [
                { type: "mc", prompt: "In Italian, an adjective usually comes...?", options: ["before the noun", "after the noun", "at the start", "after the verb only"], answer: 1 },
                { type: "mc", prompt: "Which word means 'small'?", options: ["grande", "piccolo", "buono", "nuovo"], answer: 1 },
                { type: "type", prompt: "Complete: 'una casa ___.' (a red house - from 'rosso'.)", answer: "rossa", accept: ["rossa"] },
                { type: "trueFalse", claim: "An Italian adjective agrees in gender and number with its noun.", answer: true },
                { type: "type", prompt: "Type the Italian word for 'big'.", answer: "grande", accept: ["grande"] },
                { type: "mc", prompt: "What is the feminine plural of 'rosso' (red)?", options: ["rossi", "rosse", "rossa", "rosso"], answer: 1 }
            ]
        },
        {
            id: "ita-25",
            moduleId: "adjectives",
            moduleTitle: "Adjectives",
            title: "Adjectives Ending in -e",
            explanation: [
                { type: "p", text: "Adjectives ending in -e (not -o) have just two forms: -e for both genders in the singular, and -i for both genders in the plural." },
                { type: "example", it: "un libro verde / una casa verde", en: "a green book / a green house" },
                { type: "example", it: "libri verdi / case verdi", en: "green books / green houses" },
                { type: "p", text: "So 'grande' (big), 'verde' (green) and 'intelligente' (intelligent) don't change between masculine and feminine - only singular vs plural." },
                { type: "example", it: "un ragazzo intelligente / una ragazza intelligente", en: "an intelligent boy / an intelligent girl" }
            ],
            exercises: [
                { type: "mc", prompt: "How many forms does an adjective ending in -e have?", options: ["one", "two", "three", "four"], answer: 1 },
                { type: "type", prompt: "Complete: 'una casa ___.' (a green house - from 'verde'.)", answer: "verde", accept: ["verde"] },
                { type: "mc", prompt: "What is the plural of 'grande' (big)?", options: ["grandi", "grande", "granda", "grandes"], answer: 0 },
                { type: "trueFalse", claim: "'verde' (green) has the same form for masculine and feminine in the singular.", answer: true },
                { type: "type", prompt: "Type the plural form of 'intelligente' (intelligent).", answer: "intelligenti", accept: ["intelligenti"] },
                { type: "mc", prompt: "Which adjective changes only for singular vs plural (not gender)?", options: ["rosso", "verde", "nero", "bianco"], answer: 1 }
            ]
        },
        {
            id: "ita-26",
            moduleId: "adjectives",
            moduleTitle: "Adjectives",
            title: "Comparatives and Superlatives",
            explanation: [
                { type: "p", text: "To compare, Italian uses 'più ... di' (more ... than) and 'meno ... di' (less ... than). For the superlative, add the definite article: 'il più ...'." },
                { type: "example", it: "più grande di", en: "bigger than" },
                { type: "example", it: "Roma è più grande di Pisa.", en: "Rome is bigger than Pisa." },
                { type: "example", it: "il più grande", en: "the biggest" },
                { type: "p", text: "A few adjectives are irregular: buono → migliore (better) → il migliore (the best); cattivo → peggiore (worse)." },
                { type: "example", it: "buono → migliore → il migliore", en: "good → better → the best" }
            ],
            exercises: [
                { type: "mc", prompt: "How do you say 'more ... than'?", options: ["meno ... di", "più ... di", "molto ... di", "il più"], answer: 1 },
                { type: "type", prompt: "Complete: 'Roma è più grande ___ Pisa.' (Rome is bigger than Pisa.)", answer: "di", accept: ["di"] },
                { type: "mc", prompt: "How do you form the superlative 'the biggest'?", options: ["più grande", "il più grande", "molto grande", "grande di"], answer: 1 },
                { type: "trueFalse", claim: "'buono' (good) has an irregular comparative: 'migliore'.", answer: true },
                { type: "type", prompt: "Type the Italian word for 'better' (irregular comparative of 'buono').", answer: "migliore", accept: ["migliore"] },
                { type: "mc", prompt: "What does 'meno ... di' mean?", options: ["more ... than", "less ... than", "the most", "as ... as"], answer: 1 }
            ]
        },
        {
            id: "ita-27",
            moduleId: "adjectives",
            moduleTitle: "Adjectives",
            title: "Colors",
            explanation: [
                { type: "p", text: "Colors are adjectives, so they agree with the noun. Most end in -o and have four forms." },
                { type: "example", it: "rosso, blu, giallo", en: "red, blue, yellow" },
                { type: "example", it: "verde, bianco, nero", en: "green, white, black" },
                { type: "example", it: "un libro rosso, una casa rossa, libri rossi", en: "a red book, a red house, red books" },
                { type: "p", text: "A couple of colors are invariable and never change: 'blu' (blue), 'rosa' (pink), 'arancione' (orange)." }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'blue'?", options: ["rosso", "blu", "giallo", "verde"], answer: 1 },
                { type: "type", prompt: "Type the Italian word for 'green'.", answer: "verde", accept: ["verde"] },
                { type: "mc", prompt: "Which word means 'white'?", options: ["nero", "bianco", "grigio", "marrone"], answer: 1 },
                { type: "trueFalse", claim: "'nero' means 'black'.", answer: true },
                { type: "type", prompt: "Complete: 'una casa ___.' (a red house - from 'rosso'.)", answer: "rossa", accept: ["rossa"] },
                { type: "mc", prompt: "Which color never changes its form?", options: ["rosso", "giallo", "blu", "bianco"], answer: 2 }
            ]
        },
        {
            id: "ita-28",
            moduleId: "adjectives",
            moduleTitle: "Adjectives",
            title: "Describing People and Things",
            explanation: [
                { type: "p", text: "A useful set of adjectives for describing people, moods, and things." },
                { type: "example", it: "alto, basso", en: "tall, short" },
                { type: "example", it: "magro, grasso", en: "thin, fat" },
                { type: "example", it: "gentile, arrabbiato", en: "kind, angry" },
                { type: "example", it: "felice, triste", en: "happy, sad" },
                { type: "example", it: "affamato, stanco", en: "hungry, tired" }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'tall'?", options: ["basso", "alto", "magro", "grasso"], answer: 1 },
                { type: "type", prompt: "Type the Italian word for 'happy'.", answer: "felice", accept: ["felice"] },
                { type: "mc", prompt: "Which word means 'tired'?", options: ["affamato", "stanco", "arrabbiato", "triste"], answer: 1 },
                { type: "trueFalse", claim: "'gentile' means 'kind'.", answer: true },
                { type: "type", prompt: "Type the Italian word for 'sad'.", answer: "triste", accept: ["triste"] },
                { type: "mc", prompt: "What does 'arrabbiato' mean?", options: ["sad", "angry", "kind", "tired"], answer: 1 }
            ]
        },

        // ── Module 5: Verbs ──────────────────────────────────────────────
        {
            id: "ita-29",
            moduleId: "verbs",
            moduleTitle: "Verbs",
            title: "Common Irregular Verbs (Present)",
            explanation: [
                { type: "p", text: "A handful of very common verbs are irregular in the present tense and worth memorizing early." },
                { type: "example", it: "andare → vado, vai, va, andiamo, andate, vanno", en: "to go → I/you/he go(es)..." },
                { type: "example", it: "fare → faccio, fai, fa, facciamo, fate, fanno", en: "to do/make → I/you/he do(es)..." },
                { type: "example", it: "venire → vengo, vieni, viene...", en: "to come → I/you/he come(s)..." },
                { type: "example", it: "stare → sto, stai, sta...", en: "to stay/be → I/you/he stay(s)..." },
                { type: "p", text: "'stare' is used in the common greeting 'Come stai?' (How are you?) and to build the present continuous (sto mangiando = I'm eating)." }
            ],
            exercises: [
                { type: "mc", prompt: "What is the 'io' form of 'andare' (to go)?", options: ["vado", "vai", "va", "vanno"], answer: 0 },
                { type: "type", prompt: "Complete: 'Io ___ a casa.' (andare - I go home.)", answer: "vado", accept: ["vado"] },
                { type: "mc", prompt: "What is the 'io' form of 'fare' (to do/make)?", options: ["faccio", "fai", "fa", "fanno"], answer: 0 },
                { type: "trueFalse", claim: "'Come stai?' uses the verb 'stare'.", answer: true },
                { type: "type", prompt: "Type the 'tu' form of 'venire' (to come).", answer: "vieni", accept: ["vieni"] },
                { type: "mc", prompt: "How do you say 'They go'? (andare)", options: ["Loro vanno.", "Loro va.", "Loro andate.", "Loro vado."], answer: 0 }
            ]
        },
        {
            id: "ita-30",
            moduleId: "verbs",
            moduleTitle: "Verbs",
            title: "Modal Verbs (potere, volere, dovere)",
            explanation: [
                { type: "p", text: "The three modal verbs express ability, desire, and obligation. They're followed by a second verb in the infinitive." },
                { type: "example", it: "Posso nuotare.", en: "I can swim." },
                { type: "example", it: "Voglio viaggiare.", en: "I want to travel." },
                { type: "example", it: "Devo andare.", en: "I must go." },
                { type: "p", text: "Their present forms are irregular: potere → posso, puoi, può...; volere → voglio, vuoi, vuole...; dovere → devo, devi, deve..." },
                { type: "example", it: "Vuoi un caffè?", en: "Do you want a coffee?" }
            ],
            exercises: [
                { type: "mc", prompt: "What is the 'io' form of 'potere' (can)?", options: ["posso", "puoi", "può", "possono"], answer: 0 },
                { type: "trueFalse", claim: "A modal verb is followed by another verb in the infinitive.", answer: true },
                { type: "type", prompt: "Complete: 'Io ___ nuotare.' (potere - I can swim.)", answer: "posso", accept: ["posso"] },
                { type: "mc", prompt: "What is the 'io' form of 'volere' (to want)?", options: ["voglio", "vuoi", "vuole", "vogliono"], answer: 0 },
                { type: "type", prompt: "Type the 'io' form of 'dovere' (must).", answer: "devo", accept: ["devo"] },
                { type: "mc", prompt: "How do you say 'I want to travel'?", options: ["Voglio viaggiare.", "Voglio viaggio.", "Voglio a viaggiare.", "Viaggiare voglio."], answer: 0 }
            ]
        },
        {
            id: "ita-31",
            moduleId: "verbs",
            moduleTitle: "Verbs",
            title: "The Passato Prossimo with avere",
            explanation: [
                { type: "p", text: "The passato prossimo is Italian's main past tense for completed actions. Most verbs form it with the present of 'avere' plus the past participle." },
                { type: "example", it: "parlare → parlato", en: "to speak → spoken" },
                { type: "example", it: "Ho parlato con Maria.", en: "I spoke / have spoken with Maria." },
                { type: "example", it: "Abbiamo mangiato la pizza.", en: "We ate the pizza." },
                { type: "p", text: "Regular participles: -are → -ato, -ere → -uto, -ire → -ito. Some are irregular (fare → fatto, prendere → preso)." },
                { type: "example", it: "Ho fatto i compiti.", en: "I did the homework." }
            ],
            exercises: [
                { type: "mc", prompt: "The passato prossimo (with avere) is built with 'avere' plus...?", options: ["the infinitive", "the past participle", "another modal", "the present tense"], answer: 1 },
                { type: "type", prompt: "Type the past participle of 'parlare' (to speak).", answer: "parlato", accept: ["parlato"] },
                { type: "mc", prompt: "How do you say 'We ate the pizza'?", options: ["Abbiamo mangiato la pizza.", "Abbiamo mangiare la pizza.", "Mangiamo la pizza.", "Abbiamo mangiando la pizza."], answer: 0 },
                { type: "trueFalse", claim: "A regular -are verb has a past participle ending in -ato.", answer: true },
                { type: "type", prompt: "Type the past participle of 'fare' (to do/make - irregular).", answer: "fatto", accept: ["fatto"] },
                { type: "mc", prompt: "What is the past participle ending for a regular -ire verb?", options: ["-ato", "-uto", "-ito", "-endo"], answer: 2 }
            ]
        },
        {
            id: "ita-32",
            moduleId: "verbs",
            moduleTitle: "Verbs",
            title: "The Passato Prossimo with essere",
            explanation: [
                { type: "p", text: "A group of verbs - mostly verbs of movement or change - forms the passato prossimo with 'essere' instead of 'avere'. With 'essere', the participle agrees in gender and number with the subject." },
                { type: "example", it: "andare → Sono andato / Sono andata.", en: "to go → I went (m / f)" },
                { type: "example", it: "Maria è partita.", en: "Maria left." },
                { type: "example", it: "Noi siamo arrivati.", en: "We arrived." },
                { type: "p", text: "So a woman says 'sono andata' and a man says 'sono andato'. Common 'essere' verbs: andare, venire, arrivare, partire, essere, stare, nascere." }
            ],
            exercises: [
                { type: "mc", prompt: "Which verbs usually form the passato prossimo with 'essere'?", options: ["verbs of eating", "verbs of movement or change", "modal verbs", "all verbs"], answer: 1 },
                { type: "trueFalse", claim: "With 'essere', the past participle agrees in gender and number with the subject.", answer: true },
                { type: "type", prompt: "Complete: 'Maria è ___.' (Maria left - from 'partire', feminine.)", answer: "partita", accept: ["partita"] },
                { type: "mc", prompt: "A man saying 'I went' would say...?", options: ["sono andata", "sono andato", "ho andato", "sono andare"], answer: 1 },
                { type: "type", prompt: "Complete: 'Noi siamo ___.' (We arrived - from 'arrivare', masculine plural.)", answer: "arrivati", accept: ["arrivati"] },
                { type: "mc", prompt: "How do you say 'She arrived'?", options: ["Lei ha arrivato.", "Lei è arrivata.", "Lei è arrivato.", "Lei arriva."], answer: 1 }
            ]
        },
        {
            id: "ita-33",
            moduleId: "verbs",
            moduleTitle: "Verbs",
            title: "Reflexive Verbs",
            explanation: [
                { type: "p", text: "Reflexive verbs describe an action done to oneself. Their infinitive ends in '-si', and they use a reflexive pronoun (mi, ti, si, ci, vi, si) that matches the subject." },
                { type: "example", it: "chiamarsi → Mi chiamo Marco.", en: "to be called → My name is Marco (I call myself Marco)." },
                { type: "example", it: "svegliarsi → Mi sveglio alle sette.", en: "to wake up → I wake up at seven." },
                { type: "example", it: "alzarsi → Lui si alza.", en: "to get up → He gets up." },
                { type: "p", text: "The 3rd-person reflexive pronoun is always 'si', for 'lui', 'lei' and 'loro' alike. In the passato prossimo, reflexive verbs always take 'essere'." }
            ],
            exercises: [
                { type: "mc", prompt: "Which reflexive pronoun is used for 'lui', 'lei' and 'loro' alike?", options: ["mi", "ti", "si", "ci"], answer: 2 },
                { type: "type", prompt: "Complete: 'Mi ___ Marco.' (My name is Marco - from 'chiamarsi'.)", answer: "chiamo", accept: ["chiamo"] },
                { type: "trueFalse", claim: "The infinitive of a reflexive verb ends in '-si'.", answer: true },
                { type: "mc", prompt: "How do you say 'He gets up'? (alzarsi)", options: ["Lui mi alza.", "Lui si alza.", "Lui ti alza.", "Lui ci alza."], answer: 1 },
                { type: "type", prompt: "Type the reflexive pronoun for 'io' (I).", answer: "mi", accept: ["mi"] },
                { type: "mc", prompt: "Which auxiliary do reflexive verbs take in the passato prossimo?", options: ["avere", "essere", "stare", "fare"], answer: 1 }
            ]
        },
        {
            id: "ita-34",
            moduleId: "verbs",
            moduleTitle: "Verbs",
            title: "The Future Tense (futuro semplice)",
            explanation: [
                { type: "p", text: "Italian has a real future tense, formed by adding a set of endings to the verb stem. It's used for plans and predictions." },
                { type: "example", it: "parlare → parlerò, parlerai, parlerà...", en: "to speak → I/you/he will speak..." },
                { type: "example", it: "Domani parlerò con lei.", en: "Tomorrow I'll speak with her." },
                { type: "example", it: "essere → sarò / avere → avrò", en: "to be → I'll be / to have → I'll have" },
                { type: "p", text: "In everyday speech, Italians also often use the present tense with a time word for the near future: 'Domani vado a Roma' (Tomorrow I'm going to Rome)." }
            ],
            exercises: [
                { type: "mc", prompt: "What is the 'io' future form of 'parlare' (to speak)?", options: ["parlo", "parlerò", "parlato", "parlavo"], answer: 1 },
                { type: "type", prompt: "Complete: 'Domani ___ con lei.' (parlare - Tomorrow I'll speak with her.)", answer: "parlerò", accept: ["parlerò"] },
                { type: "mc", prompt: "What is the 'io' future of 'essere' (to be)?", options: ["sono", "sarò", "ero", "sarà"], answer: 1 },
                { type: "trueFalse", claim: "Italians often use the present tense with a time word to talk about the near future.", answer: true },
                { type: "type", prompt: "Type the 'io' future form of 'avere' (to have).", answer: "avrò", accept: ["avrò"] },
                { type: "mc", prompt: "How do you say 'Tomorrow I'm going to Rome' (using the present)?", options: ["Domani vado a Roma.", "Domani andrò a Roma.", "Domani sono a Roma.", "Domani vada a Roma."], answer: 0 }
            ]
        },

        // ── Module 6: Sentence Structure ─────────────────────────────────
        {
            id: "ita-35",
            moduleId: "syntax",
            moduleTitle: "Sentence Structure",
            title: "Basic Word Order (S-V-O)",
            explanation: [
                { type: "p", text: "The basic Italian sentence order is Subject - Verb - Object, just like English." },
                { type: "example", it: "Io leggo il libro.", en: "I read the book. (S-V-O)" },
                { type: "example", it: "Lei ama il caffè.", en: "She loves coffee." },
                { type: "p", text: "This basic order is flexible in Italian - the next lessons show how the subject is often dropped and how word order can shift for emphasis." }
            ],
            exercises: [
                { type: "mc", prompt: "What is the basic Italian word order?", options: ["V-S-O", "S-O-V", "S-V-O", "O-V-S"], answer: 2 },
                { type: "trueFalse", claim: "'Io leggo il libro' follows Subject-Verb-Object order.", answer: true },
                { type: "mc", prompt: "Which sentence correctly follows S-V-O?", options: ["Il caffè lei ama.", "Ama lei il caffè.", "Lei ama il caffè.", "Lei il caffè ama."], answer: 2 },
                { type: "type", prompt: "Complete: 'Io ___ il libro.' (leggere - I read the book.)", answer: "leggo", accept: ["leggo"] },
                { type: "mc", prompt: "In 'Lei ama il caffè', what role does 'il caffè' play?", options: ["Subject", "Verb", "Object", "Adjective"], answer: 2 },
                { type: "trueFalse", claim: "Italian's basic word order is completely different from English.", answer: false }
            ]
        },
        {
            id: "ita-36",
            moduleId: "syntax",
            moduleTitle: "Sentence Structure",
            title: "Dropping the Subject Pronoun",
            explanation: [
                { type: "p", text: "Because each verb ending clearly shows who is acting, Italian usually DROPS the subject pronoun. This is one of the biggest differences from English." },
                { type: "example", it: "Parlo italiano.", en: "I speak Italian. (no 'io' needed)" },
                { type: "example", it: "Siamo stanchi.", en: "We are tired. (no 'noi' needed)" },
                { type: "p", text: "The pronoun is added back only for emphasis or contrast: 'Io parlo italiano, lei parla francese' (I speak Italian, she speaks French)." },
                { type: "example", it: "Vado a casa.", en: "I'm going home." }
            ],
            exercises: [
                { type: "mc", prompt: "Why can Italian drop the subject pronoun?", options: ["it's lazy", "the verb ending shows who is acting", "pronouns don't exist", "only in questions"], answer: 1 },
                { type: "trueFalse", claim: "'Parlo italiano' already means 'I speak Italian' without needing 'io'.", answer: true },
                { type: "mc", prompt: "When IS the subject pronoun usually added back?", options: ["never", "for emphasis or contrast", "in every sentence", "only with 'essere'"], answer: 1 },
                { type: "type", prompt: "Say 'I'm going home' WITHOUT the subject pronoun: '___ a casa.' (andare)", answer: "Vado", accept: ["Vado", "vado"] },
                { type: "mc", prompt: "Which is the most natural way to say 'We are tired'?", options: ["Noi siamo stanchi noi.", "Siamo stanchi.", "Noi noi siamo stanchi.", "Stanchi noi siamo."], answer: 1 },
                { type: "trueFalse", claim: "Italian requires the subject pronoun in every sentence, like English.", answer: false }
            ]
        },
        {
            id: "ita-37",
            moduleId: "syntax",
            moduleTitle: "Sentence Structure",
            title: "Position of Adjectives and Adverbs",
            explanation: [
                { type: "p", text: "Most Italian adjectives come AFTER the noun they describe. A few very common ones usually come before." },
                { type: "example", it: "una macchina rossa", en: "a red car (adjective after)" },
                { type: "example", it: "un buon amico / una bella casa", en: "a good friend / a beautiful house (before)" },
                { type: "p", text: "Adverbs usually come right after the verb." },
                { type: "example", it: "Parlo bene italiano.", en: "I speak Italian well." },
                { type: "example", it: "Mangia sempre a casa.", en: "He always eats at home." }
            ],
            exercises: [
                { type: "mc", prompt: "Where do most Italian adjectives go?", options: ["before the noun", "after the noun", "at the end of the sentence", "before the verb"], answer: 1 },
                { type: "type", prompt: "Put the adjective in the usual place: 'una macchina ___.' (red - rossa)", answer: "rossa", accept: ["rossa"] },
                { type: "mc", prompt: "Which adjective usually comes BEFORE the noun?", options: ["rosso", "bello", "verde", "stanco"], answer: 1 },
                { type: "trueFalse", claim: "Adverbs usually come right after the verb in Italian.", answer: true },
                { type: "type", prompt: "Type the Italian word for 'well' (as in 'I speak well').", answer: "bene", accept: ["bene"] },
                { type: "mc", prompt: "How do you say 'He always eats at home'?", options: ["Sempre mangia a casa.", "Mangia sempre a casa.", "Mangia a casa sempre bene.", "A casa sempre mangia."], answer: 1 }
            ]
        },
        {
            id: "ita-38",
            moduleId: "syntax",
            moduleTitle: "Sentence Structure",
            title: "Negation and Adverb Placement",
            explanation: [
                { type: "p", text: "'non' always comes right before the verb. Italian often uses double negatives, which are completely correct." },
                { type: "example", it: "Non mangio mai carne.", en: "I never eat meat. (non ... mai)" },
                { type: "example", it: "Non c'è niente.", en: "There is nothing. (non ... niente)" },
                { type: "example", it: "Non conosco nessuno.", en: "I don't know anyone. (non ... nessuno)" },
                { type: "p", text: "So 'never', 'nothing' and 'nobody' each pair 'non' (before the verb) with a second negative word (after it)." }
            ],
            exercises: [
                { type: "mc", prompt: "Where does 'non' always go?", options: ["at the end", "right before the verb", "before the subject", "after the object"], answer: 1 },
                { type: "type", prompt: "Complete: 'Non mangio ___ carne.' (I never eat meat.)", answer: "mai", accept: ["mai"] },
                { type: "mc", prompt: "How do you say 'There is nothing'?", options: ["C'è niente.", "Non c'è niente.", "Niente c'è.", "C'è non niente."], answer: 1 },
                { type: "trueFalse", claim: "Double negatives like 'non ... mai' are correct and standard in Italian.", answer: true },
                { type: "type", prompt: "Type the Italian word for 'never' (used with 'non').", answer: "mai", accept: ["mai"] },
                { type: "mc", prompt: "What does 'Non conosco nessuno' mean?", options: ["I know everyone", "I don't know anyone", "I know someone", "I never know"], answer: 1 }
            ]
        },
        {
            id: "ita-39",
            moduleId: "syntax",
            moduleTitle: "Sentence Structure",
            title: "Conjunctions: e, ma, o, perché",
            explanation: [
                { type: "p", text: "These words connect words and clauses into longer sentences." },
                { type: "example", it: "e, ma", en: "and, but" },
                { type: "example", it: "o, perché", en: "or, because" },
                { type: "example", it: "Mi piace il tè, ma lei preferisce il caffè.", en: "I like tea, but she prefers coffee." },
                { type: "example", it: "Sono stanco perché ho lavorato molto.", en: "I'm tired because I worked a lot." },
                { type: "p", text: "Note 'perché' means both 'why' (in a question) and 'because' (in an answer)." }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'but'?", options: ["e", "ma", "o", "perché"], answer: 1 },
                { type: "type", prompt: "Type the Italian word for 'and'.", answer: "e", accept: ["e"] },
                { type: "mc", prompt: "Which word means 'or'?", options: ["e", "ma", "o", "perché"], answer: 2 },
                { type: "trueFalse", claim: "'perché' can mean both 'why' and 'because'.", answer: true },
                { type: "type", prompt: "Complete: 'Sono stanco ___ ho lavorato molto.' (...because I worked a lot.)", answer: "perché", accept: ["perché"] },
                { type: "mc", prompt: "How do you say 'Do you want tea or coffee?'", options: ["Vuoi tè ma caffè?", "Vuoi tè o caffè?", "Vuoi tè perché caffè?", "Vuoi tè e caffè?"], answer: 1 }
            ]
        },

        // ── Module 7: Everyday Vocabulary ────────────────────────────────
        {
            id: "ita-40",
            moduleId: "vocabulary",
            moduleTitle: "Everyday Vocabulary",
            title: "Greetings and Courtesy Phrases",
            explanation: [
                { type: "p", text: "A handful of everyday phrases will cover most polite exchanges." },
                { type: "example", it: "ciao, salve", en: "hi/bye (informal), hello (neutral)" },
                { type: "example", it: "buongiorno, buonasera, buonanotte", en: "good morning/day, good evening, good night" },
                { type: "example", it: "arrivederci, a presto", en: "goodbye, see you soon" },
                { type: "example", it: "grazie, prego, per favore", en: "thanks, you're welcome, please" },
                { type: "example", it: "scusa / scusi", en: "sorry / excuse me (informal / formal)" }
            ],
            exercises: [
                { type: "mc", prompt: "Which means 'good morning / good day'?", options: ["buonasera", "buongiorno", "buonanotte", "arrivederci"], answer: 1 },
                { type: "type", prompt: "Type the Italian word for 'thanks'.", answer: "grazie", accept: ["grazie"] },
                { type: "mc", prompt: "Which word means 'please'?", options: ["grazie", "prego", "per favore", "scusa"], answer: 2 },
                { type: "trueFalse", claim: "'arrivederci' means 'goodbye'.", answer: true },
                { type: "type", prompt: "Type the Italian phrase for 'good evening'.", answer: "buonasera", accept: ["buonasera"] },
                { type: "mc", prompt: "What does 'prego' typically mean in reply to 'grazie'?", options: ["please", "sorry", "you're welcome", "good night"], answer: 2 }
            ]
        },
        {
            id: "ita-41",
            moduleId: "vocabulary",
            moduleTitle: "Everyday Vocabulary",
            title: "Introducing Yourself",
            explanation: [
                { type: "p", text: "These phrases cover the basics of introducing yourself." },
                { type: "example", it: "Mi chiamo...", en: "My name is... (I call myself...)" },
                { type: "example", it: "Vengo da... / Sono di...", en: "I come from... / I am from..." },
                { type: "example", it: "Lavoro come... / Studio...", en: "I work as... / I study..." },
                { type: "example", it: "Piacere.", en: "Nice to meet you." }
            ],
            exercises: [
                { type: "mc", prompt: "How do you say 'My name is...'?", options: ["Sono di...", "Mi chiamo...", "Vengo...", "Abito..."], answer: 1 },
                { type: "type", prompt: "Type the Italian phrase for 'I come from...'.", answer: "vengo da", accept: ["vengo da"] },
                { type: "mc", prompt: "What does 'Piacere' mean?", options: ["Nice to meet you", "Good morning", "See you later", "How are you"], answer: 0 },
                { type: "trueFalse", claim: "'Studio' means 'I study'.", answer: true },
                { type: "type", prompt: "Complete: 'Lavoro ___ insegnante.' (I work as a teacher.)", answer: "come", accept: ["come"] },
                { type: "mc", prompt: "Which phrase tells where you're from?", options: ["Mi chiamo...", "Sono di...", "Lavoro...", "Mi piace..."], answer: 1 }
            ]
        },
        {
            id: "ita-42",
            moduleId: "vocabulary",
            moduleTitle: "Everyday Vocabulary",
            title: "Family Vocabulary",
            explanation: [
                { type: "p", text: "Core family words - many pair up neatly." },
                { type: "example", it: "la madre, il padre", en: "mother, father" },
                { type: "example", it: "la sorella, il fratello", en: "sister, brother" },
                { type: "example", it: "la figlia, il figlio", en: "daughter, son" },
                { type: "example", it: "la nonna, il nonno", en: "grandmother, grandfather" },
                { type: "example", it: "la moglie, il marito, i genitori", en: "wife, husband, parents" },
                { type: "p", text: "Informally, mum and dad are 'mamma' and 'papà'." }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'mother'?", options: ["il padre", "la madre", "la sorella", "la figlia"], answer: 1 },
                { type: "type", prompt: "Type the Italian word for 'brother' (without the article).", answer: "fratello", accept: ["fratello", "il fratello"] },
                { type: "mc", prompt: "Which word means 'grandfather'?", options: ["la nonna", "il nonno", "il padre", "il fratello"], answer: 1 },
                { type: "trueFalse", claim: "'i genitori' means 'parents'.", answer: true },
                { type: "type", prompt: "Type the Italian word for 'daughter' (without the article).", answer: "figlia", accept: ["figlia", "la figlia"] },
                { type: "mc", prompt: "What does 'la moglie' mean?", options: ["husband", "wife", "daughter", "sister"], answer: 1 }
            ]
        },
        {
            id: "ita-43",
            moduleId: "vocabulary",
            moduleTitle: "Everyday Vocabulary",
            title: "Days, Seasons, and Time",
            explanation: [
                { type: "p", text: "The days of the week (note: they're not capitalized in Italian):" },
                { type: "example", it: "lunedì, martedì, mercoledì", en: "Monday, Tuesday, Wednesday" },
                { type: "example", it: "giovedì, venerdì, sabato, domenica", en: "Thursday, Friday, Saturday, Sunday" },
                { type: "p", text: "The four seasons, and asking the time:" },
                { type: "example", it: "primavera, estate, autunno, inverno", en: "spring, summer, autumn, winter" },
                { type: "example", it: "Che ore sono?", en: "What time is it?" }
            ],
            exercises: [
                { type: "mc", prompt: "Which day is 'sabato'?", options: ["Friday", "Saturday", "Sunday", "Thursday"], answer: 1 },
                { type: "type", prompt: "Type the Italian word for 'Monday'.", answer: "lunedì", accept: ["lunedì"] },
                { type: "mc", prompt: "Which word means 'summer'?", options: ["primavera", "estate", "autunno", "inverno"], answer: 1 },
                { type: "trueFalse", claim: "'Che ore sono?' asks what time it is.", answer: true },
                { type: "type", prompt: "Type the Italian word for 'winter'.", answer: "inverno", accept: ["inverno"] },
                { type: "mc", prompt: "Which season is 'autunno'?", options: ["spring", "summer", "autumn", "winter"], answer: 2 }
            ]
        },
        {
            id: "ita-44",
            moduleId: "vocabulary",
            moduleTitle: "Everyday Vocabulary",
            title: "Home and City",
            explanation: [
                { type: "p", text: "Vocabulary for talking about where you live." },
                { type: "example", it: "la casa, l'appartamento", en: "home/house, apartment" },
                { type: "example", it: "la stanza, la cucina, il bagno, la camera", en: "room, kitchen, bathroom, bedroom" },
                { type: "example", it: "la città, la strada, il centro", en: "city/town, street, city centre" }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'apartment'?", options: ["la casa", "l'appartamento", "la stanza", "la città"], answer: 1 },
                { type: "type", prompt: "Type the Italian word for 'kitchen' (without the article).", answer: "cucina", accept: ["cucina", "la cucina"] },
                { type: "mc", prompt: "Which word means 'bathroom'?", options: ["la cucina", "il bagno", "la camera", "la stanza"], answer: 1 },
                { type: "trueFalse", claim: "'il centro' means 'city centre'.", answer: true },
                { type: "type", prompt: "Type the Italian word for 'street' (without the article).", answer: "strada", accept: ["strada", "la strada"] },
                { type: "mc", prompt: "What does 'la città' mean?", options: ["house", "street", "city/town", "room"], answer: 2 }
            ]
        },
        {
            id: "ita-45",
            moduleId: "vocabulary",
            moduleTitle: "Everyday Vocabulary",
            title: "Food and Drinks",
            explanation: [
                { type: "p", text: "Everyday food and mealtime vocabulary." },
                { type: "example", it: "il cibo, l'acqua, il latte", en: "food, water, milk" },
                { type: "example", it: "il pane, il formaggio, l'uovo", en: "bread, cheese, egg" },
                { type: "example", it: "la carne, il pesce", en: "meat, fish" },
                { type: "example", it: "la colazione, il pranzo, la cena", en: "breakfast, lunch, dinner" }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'bread'?", options: ["il formaggio", "il pane", "l'uovo", "la carne"], answer: 1 },
                { type: "type", prompt: "Type the Italian word for 'water' (without the article).", answer: "acqua", accept: ["acqua", "l'acqua"] },
                { type: "mc", prompt: "Which word means 'dinner'?", options: ["la colazione", "il pranzo", "la cena", "il cibo"], answer: 2 },
                { type: "trueFalse", claim: "'il formaggio' means 'cheese'.", answer: true },
                { type: "type", prompt: "Type the Italian word for 'fish' (without the article).", answer: "pesce", accept: ["pesce", "il pesce"] },
                { type: "mc", prompt: "What does 'la colazione' mean?", options: ["lunch", "dinner", "breakfast", "food"], answer: 2 }
            ]
        },
        {
            id: "ita-46",
            moduleId: "vocabulary",
            moduleTitle: "Everyday Vocabulary",
            title: "Work and Studies",
            explanation: [
                { type: "p", text: "Vocabulary for talking about jobs and school." },
                { type: "example", it: "il lavoro, l'ufficio", en: "job/work, office" },
                { type: "example", it: "l'insegnante, lo studente, la scuola, l'università", en: "teacher, student, school, university" },
                { type: "example", it: "la riunione, il compito, studiare", en: "meeting, task/homework, to study" }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'teacher'?", options: ["lo studente", "l'insegnante", "la scuola", "il lavoro"], answer: 1 },
                { type: "type", prompt: "Type the Italian word for 'school' (without the article).", answer: "scuola", accept: ["scuola", "la scuola"] },
                { type: "mc", prompt: "Which word means 'office'?", options: ["il lavoro", "l'ufficio", "la scuola", "il compito"], answer: 1 },
                { type: "trueFalse", claim: "'l'università' means 'university'.", answer: true },
                { type: "type", prompt: "Type the Italian word for 'work' (the noun, without the article).", answer: "lavoro", accept: ["lavoro", "il lavoro"] },
                { type: "mc", prompt: "What does 'la riunione' mean?", options: ["office", "meeting", "task", "job"], answer: 1 }
            ]
        },
        {
            id: "ita-47",
            moduleId: "vocabulary",
            moduleTitle: "Everyday Vocabulary",
            title: "Free Time and Hobbies",
            explanation: [
                { type: "p", text: "Vocabulary for talking about hobbies and leisure time." },
                { type: "example", it: "il tempo libero, l'hobby", en: "free time, hobby" },
                { type: "example", it: "giocare, allenarsi, viaggiare, dipingere", en: "to play, to work out, to travel, to paint" },
                { type: "example", it: "la musica, il film, il libro", en: "music, movie, book" }
            ],
            exercises: [
                { type: "mc", prompt: "Which phrase means 'free time'?", options: ["l'hobby", "il tempo libero", "la musica", "il film"], answer: 1 },
                { type: "type", prompt: "Type the Italian verb for 'to travel'.", answer: "viaggiare", accept: ["viaggiare"] },
                { type: "mc", prompt: "Which word means 'to work out / train'?", options: ["giocare", "allenarsi", "dipingere", "leggere"], answer: 1 },
                { type: "trueFalse", claim: "'giocare' means 'to play (a game)'.", answer: true },
                { type: "type", prompt: "Type the Italian word for 'movie' (without the article).", answer: "film", accept: ["film", "il film"] },
                { type: "mc", prompt: "What does 'dipingere' mean?", options: ["to paint", "to play", "to read", "to travel"], answer: 0 }
            ]
        },
        {
            id: "ita-48",
            moduleId: "vocabulary",
            moduleTitle: "Everyday Vocabulary",
            title: "Technology and the Internet",
            explanation: [
                { type: "p", text: "Vocabulary for talking about computers and getting online." },
                { type: "example", it: "il computer, il telefono, lo schermo", en: "computer, phone, screen" },
                { type: "example", it: "internet, il sito web, l'app", en: "internet, website, app" },
                { type: "example", it: "l'email, la password", en: "email, password" },
                { type: "example", it: "scaricare, cercare", en: "to download, to search" }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'phone'?", options: ["il computer", "il telefono", "lo schermo", "l'app"], answer: 1 },
                { type: "type", prompt: "Type the Italian word for 'screen' (without the article).", answer: "schermo", accept: ["schermo", "lo schermo"] },
                { type: "mc", prompt: "Which word means 'password'?", options: ["il sito web", "la password", "internet", "lo schermo"], answer: 1 },
                { type: "trueFalse", claim: "'cercare' means 'to search'.", answer: true },
                { type: "type", prompt: "Type the Italian verb for 'to download'.", answer: "scaricare", accept: ["scaricare"] },
                { type: "mc", prompt: "What does 'il computer' mean?", options: ["computer", "phone", "app", "website"], answer: 0 }
            ]
        },
        {
            id: "ita-49",
            moduleId: "vocabulary",
            moduleTitle: "Everyday Vocabulary",
            title: "Shopping and Money",
            explanation: [
                { type: "p", text: "Vocabulary for shopping and handling money." },
                { type: "example", it: "comprare, vendere, pagare", en: "to buy, to sell, to pay" },
                { type: "example", it: "il negozio, i soldi, il prezzo", en: "store/shop, money, price" },
                { type: "example", it: "economico, caro", en: "cheap, expensive" },
                { type: "example", it: "lo scontrino, la carta, i contanti", en: "receipt, card, cash" }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'to buy'?", options: ["vendere", "comprare", "pagare", "cercare"], answer: 1 },
                { type: "type", prompt: "Type the Italian word for 'money'.", answer: "soldi", accept: ["soldi", "i soldi"] },
                { type: "mc", prompt: "Which word means 'expensive'?", options: ["economico", "caro", "i soldi", "la carta"], answer: 1 },
                { type: "trueFalse", claim: "'economico' means 'cheap'.", answer: true },
                { type: "type", prompt: "Type the Italian verb for 'to pay'.", answer: "pagare", accept: ["pagare"] },
                { type: "mc", prompt: "What does 'vendere' mean?", options: ["to buy", "to sell", "to pay", "to search"], answer: 1 }
            ]
        },

        // ── Module 8: Real-Life Communication ────────────────────────────
        {
            id: "ita-50",
            moduleId: "communication",
            moduleTitle: "Real-Life Communication",
            title: "Asking and Giving Personal Information",
            explanation: [
                { type: "p", text: "The most common get-to-know-you questions." },
                { type: "example", it: "Come ti chiami?", en: "What's your name?" },
                { type: "example", it: "Quanti anni hai?", en: "How old are you? (lit. How many years do you have?)" },
                { type: "example", it: "Dove abiti? / Che lavoro fai?", en: "Where do you live? / What do you do for work?" },
                { type: "example", it: "Ho venti anni.", en: "I am twenty years old. (I have twenty years)" },
                { type: "p", text: "Note that in Italian you HAVE years, not ARE years: 'Ho venti anni' uses 'avere'." }
            ],
            exercises: [
                { type: "mc", prompt: "What does 'Quanti anni hai?' ask?", options: ["What's your name?", "How old are you?", "Where do you live?", "What do you do?"], answer: 1 },
                { type: "type", prompt: "Complete: 'Ho venti ___.' (I am twenty years old.)", answer: "anni", accept: ["anni"], hint: "anno" },
                { type: "mc", prompt: "Which question asks about someone's job?", options: ["Come ti chiami?", "Dove abiti?", "Che lavoro fai?", "Quanti anni hai?"], answer: 2 },
                { type: "trueFalse", claim: "In Italian you say you HAVE a certain number of years, using 'avere'.", answer: true },
                { type: "type", prompt: "Type the Italian question for 'What's your name?'.", answer: "come ti chiami", accept: ["come ti chiami", "Come ti chiami?"] },
                { type: "mc", prompt: "How would you say 'I am 30 years old'?", options: ["Sono trenta anni.", "Ho trenta anni.", "Abito trenta anni.", "Mi chiamo trenta anni."], answer: 1 }
            ]
        },
        {
            id: "ita-51",
            moduleId: "communication",
            moduleTitle: "Real-Life Communication",
            title: "Asking for Directions and Getting Around",
            explanation: [
                { type: "p", text: "Phrases for finding your way around." },
                { type: "example", it: "Dov'è...?", en: "Where is...?" },
                { type: "example", it: "a sinistra, a destra, dritto", en: "left, right, straight ahead" },
                { type: "example", it: "Come arrivo a...?", en: "How do I get to...?" },
                { type: "example", it: "l'autobus, il treno", en: "bus, train" }
            ],
            exercises: [
                { type: "mc", prompt: "Which phrase means 'to the left'?", options: ["a destra", "a sinistra", "dritto", "qui"], answer: 1 },
                { type: "type", prompt: "Type the Italian word for 'straight ahead'.", answer: "dritto", accept: ["dritto"] },
                { type: "mc", prompt: "Which word means 'train'?", options: ["l'autobus", "il treno", "la macchina", "l'aereo"], answer: 1 },
                { type: "trueFalse", claim: "'Come arrivo a...?' asks how to get somewhere.", answer: true },
                { type: "type", prompt: "Type the Italian phrase for 'Where is...?'.", answer: "dov'è", accept: ["dov'è", "Dov'è?"] },
                { type: "mc", prompt: "Which phrase means 'to the right'?", options: ["a sinistra", "a destra", "dritto", "là"], answer: 1 }
            ]
        },
        {
            id: "ita-52",
            moduleId: "communication",
            moduleTitle: "Real-Life Communication",
            title: "Shopping at a Store or Supermarket",
            explanation: [
                { type: "p", text: "Phrases you'll hear and use while shopping." },
                { type: "example", it: "Posso aiutarla?", en: "Can I help you? (formal)" },
                { type: "example", it: "Sto solo guardando.", en: "I'm just looking." },
                { type: "example", it: "Dove posso trovare...?", en: "Where can I find...?" },
                { type: "example", it: "il carrello, la cassa", en: "shopping cart, checkout" }
            ],
            exercises: [
                { type: "mc", prompt: "What does 'Posso aiutarla?' mean?", options: ["Can I help you?", "Can you help me?", "Where is it?", "How much is it?"], answer: 0 },
                { type: "type", prompt: "Type the Italian phrase for 'I'm just looking'.", answer: "sto solo guardando", accept: ["sto solo guardando"] },
                { type: "mc", prompt: "Which word means 'checkout / till'?", options: ["il carrello", "la cassa", "lo scontrino", "il negozio"], answer: 1 },
                { type: "trueFalse", claim: "'Avete...?' means 'Do you have...?'", answer: true },
                { type: "type", prompt: "Type the Italian word for 'shopping cart' (without the article).", answer: "carrello", accept: ["carrello", "il carrello"] },
                { type: "mc", prompt: "Which phrase asks where to find something?", options: ["Dove posso trovare...?", "Dove abiti?", "Come stai?", "Quanto costa?"], answer: 0 }
            ]
        },
        {
            id: "ita-53",
            moduleId: "communication",
            moduleTitle: "Real-Life Communication",
            title: "Ordering Food and Drinks",
            explanation: [
                { type: "p", text: "Phrases for restaurants and cafés." },
                { type: "example", it: "Vorrei...", en: "I would like..." },
                { type: "example", it: "Posso avere...?", en: "Can I have...?" },
                { type: "example", it: "il menù, il conto, per favore", en: "menu, the bill, please" },
                { type: "example", it: "Un tavolo per due, per favore.", en: "A table for two, please." }
            ],
            exercises: [
                { type: "mc", prompt: "How do you say 'I would like...'?", options: ["Vorrei...", "Mi chiamo...", "Vengo da...", "Abito..."], answer: 0 },
                { type: "type", prompt: "Type the Italian phrase for 'Can I have...?'.", answer: "posso avere", accept: ["posso avere", "Posso avere?"] },
                { type: "mc", prompt: "Which word means 'menu'?", options: ["il conto", "il menù", "la cassa", "lo scontrino"], answer: 1 },
                { type: "trueFalse", claim: "'Il conto, per favore' means 'The bill, please'.", answer: true },
                { type: "type", prompt: "Type the Italian word for 'the bill' (without the article).", answer: "conto", accept: ["conto", "il conto"] },
                { type: "mc", prompt: "What does 'Un tavolo per due' mean?", options: ["A menu for two", "A table for two", "The bill for two", "A coffee for two"], answer: 1 }
            ]
        },
        {
            id: "ita-54",
            moduleId: "communication",
            moduleTitle: "Real-Life Communication",
            title: "Talking about the Weather",
            explanation: [
                { type: "p", text: "Small talk about the weather is as common in Italy as anywhere. Note that Italian uses 'fare' (to make) for many weather expressions." },
                { type: "example", it: "Che tempo fa?", en: "How's the weather? (lit. What weather does it make?)" },
                { type: "example", it: "C'è il sole. / Piove. / Nevica.", en: "It's sunny. / It's raining. / It's snowing." },
                { type: "example", it: "Fa freddo. / Fa caldo.", en: "It's cold. / It's hot." },
                { type: "example", it: "il vento, la nuvola", en: "wind, cloud" }
            ],
            exercises: [
                { type: "mc", prompt: "What does 'Che tempo fa?' ask?", options: ["What time is it?", "How's the weather?", "Where are you?", "How are you?"], answer: 1 },
                { type: "type", prompt: "Type the Italian word for 'It's raining' (one verb).", answer: "piove", accept: ["piove", "Piove"] },
                { type: "mc", prompt: "Which word means 'wind'?", options: ["la nuvola", "il vento", "il sole", "la pioggia"], answer: 1 },
                { type: "trueFalse", claim: "'Fa freddo' means 'It's cold'.", answer: true },
                { type: "type", prompt: "Type the Italian phrase for 'It's hot' (two words).", answer: "fa caldo", accept: ["fa caldo"] },
                { type: "mc", prompt: "Which word means 'cloud'?", options: ["la nuvola", "il vento", "il sole", "la neve"], answer: 0 }
            ]
        },
        {
            id: "ita-55",
            moduleId: "communication",
            moduleTitle: "Real-Life Communication",
            title: "Describing Your Daily Routine",
            explanation: [
                { type: "p", text: "Verbs for describing a typical day, roughly in order. Several are reflexive." },
                { type: "example", it: "svegliarsi, alzarsi, farsi la doccia", en: "to wake up, to get up, to take a shower" },
                { type: "example", it: "fare colazione, andare al lavoro", en: "to have breakfast, to go to work" },
                { type: "example", it: "tornare a casa, andare a letto", en: "to come home, to go to bed" }
            ],
            exercises: [
                { type: "mc", prompt: "Which verb means 'to wake up'?", options: ["alzarsi", "svegliarsi", "farsi la doccia", "andare a letto"], answer: 1 },
                { type: "type", prompt: "Type the Italian phrase for 'to go to bed'.", answer: "andare a letto", accept: ["andare a letto"] },
                { type: "mc", prompt: "Which verb means 'to get up'?", options: ["svegliarsi", "alzarsi", "tornare", "fare colazione"], answer: 1 },
                { type: "trueFalse", claim: "'svegliarsi' is a reflexive verb.", answer: true },
                { type: "type", prompt: "Type the Italian phrase for 'to have breakfast'.", answer: "fare colazione", accept: ["fare colazione"] },
                { type: "mc", prompt: "What does 'tornare a casa' mean?", options: ["to leave home", "to come home", "to go to work", "to wake up"], answer: 1 }
            ]
        },
        {
            id: "ita-56",
            moduleId: "communication",
            moduleTitle: "Real-Life Communication",
            title: "Expressing Preferences and Opinions",
            explanation: [
                { type: "p", text: "Phrases for saying what you like and think. Note 'mi piace' literally means 'it pleases me'." },
                { type: "example", it: "Mi piace... / Non mi piace...", en: "I like... / I don't like..." },
                { type: "example", it: "Preferisco...", en: "I prefer..." },
                { type: "example", it: "Penso che... / Secondo me...", en: "I think that... / In my opinion..." },
                { type: "example", it: "Sono d'accordo. / Non sono d'accordo.", en: "I agree. / I disagree." }
            ],
            exercises: [
                { type: "mc", prompt: "How do you say 'I prefer...'?", options: ["Mi piace...", "Preferisco...", "Penso...", "Sono d'accordo..."], answer: 1 },
                { type: "type", prompt: "Type the Italian phrase for 'I agree'.", answer: "sono d'accordo", accept: ["sono d'accordo"] },
                { type: "mc", prompt: "Which phrase means 'In my opinion...'?", options: ["Mi piace...", "Secondo me...", "Preferisco...", "Non sono d'accordo..."], answer: 1 },
                { type: "trueFalse", claim: "'Non sono d'accordo' means 'I disagree'.", answer: true },
                { type: "type", prompt: "Complete: 'Non mi ___ il pesce.' (I don't like fish.)", answer: "piace", accept: ["piace"], hint: "piacere" },
                { type: "mc", prompt: "What does 'Preferisco il tè' mean?", options: ["I like tea", "I don't like tea", "I prefer tea", "I think tea"], answer: 2 }
            ]
        },
        {
            id: "ita-57",
            moduleId: "communication",
            moduleTitle: "Real-Life Communication",
            title: "Making Suggestions and Invitations",
            explanation: [
                { type: "p", text: "Phrases for proposing plans and inviting people along." },
                { type: "example", it: "Andiamo...?", en: "Shall we go...? / Let's go...?" },
                { type: "example", it: "Vuoi venire? / Ti va di...?", en: "Do you want to come? / Do you feel like...?" },
                { type: "example", it: "Possiamo...?", en: "Can we...? / Could we...?" },
                { type: "example", it: "Buona idea! / Volentieri!", en: "Good idea! / Gladly!" }
            ],
            exercises: [
                { type: "mc", prompt: "How do you suggest 'Shall we go?'", options: ["Vuoi venire?", "Andiamo?", "Ti va di...?", "Volentieri!"], answer: 1 },
                { type: "type", prompt: "Type the Italian phrase for 'Good idea!'.", answer: "buona idea", accept: ["buona idea", "Buona idea!"] },
                { type: "mc", prompt: "Which phrase invites someone along?", options: ["Vuoi venire?", "Andiamo?", "Penso che...", "Sono d'accordo"], answer: 0 },
                { type: "trueFalse", claim: "'Volentieri!' means 'Gladly!' or 'With pleasure!'", answer: true },
                { type: "type", prompt: "Type the Italian phrase for 'Do you feel like...?'.", answer: "ti va di", accept: ["ti va di", "Ti va di?"] },
                { type: "mc", prompt: "What does 'Possiamo...?' mean?", options: ["Shall we go?", "Can we / Could we...?", "Do you want to?", "Good idea"], answer: 1 }
            ]
        },
        {
            id: "ita-58",
            moduleId: "communication",
            moduleTitle: "Real-Life Communication",
            title: "Talking about Future Plans",
            explanation: [
                { type: "p", text: "Phrases for talking about what's coming up. For near-future plans, Italians very often use the present tense." },
                { type: "example", it: "Cosa fai domani?", en: "What are you doing tomorrow?" },
                { type: "example", it: "Vado a Roma.", en: "I'm going to Rome." },
                { type: "example", it: "Ho intenzione di...", en: "I intend to... / I plan to..." },
                { type: "example", it: "tra una settimana, l'anno prossimo", en: "in a week, next year" }
            ],
            exercises: [
                { type: "mc", prompt: "What does 'Cosa fai domani?' ask?", options: ["What did you do yesterday?", "What are you doing tomorrow?", "What do you do for work?", "Where do you live?"], answer: 1 },
                { type: "type", prompt: "Type the Italian phrase for 'in a week'.", answer: "tra una settimana", accept: ["tra una settimana"] },
                { type: "mc", prompt: "Which phrase means 'next year'?", options: ["domani", "tra una settimana", "l'anno prossimo", "oggi"], answer: 2 },
                { type: "trueFalse", claim: "'Ho intenzione di...' means 'I intend/plan to...'.", answer: true },
                { type: "type", prompt: "Complete: '___ a Roma.' (andare - I'm going to Rome, present tense.)", answer: "Vado", accept: ["Vado", "vado"] },
                { type: "mc", prompt: "For near-future plans, Italians very often use...?", options: ["the past tense", "the present tense", "the conditional", "no verb"], answer: 1 }
            ]
        }
    ]
};

// Additive dual-export (see the header note): merge onto the shared global so
// load order relative to the other lessons-*.js files never clobbers another
// course, and expose the same object to api/_lib.js's require() for id validation.
if (typeof window !== "undefined") {
    window.POLYTYPE_LESSONS = Object.assign(window.POLYTYPE_LESSONS || {}, ITALIAN_LESSONS_DATA);
}
if (typeof module !== "undefined" && module.exports) module.exports = ITALIAN_LESSONS_DATA;
