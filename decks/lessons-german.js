// German "Lessons" curriculum - a hand-authored sequence of short
// grammar/vocab lessons, the German counterpart of decks/lessons-norwegian.js
// and decks/lessons-swedish.js. Same data shape and the same dual-export
// contract, so js/lessons.js, js/router.js and api/_lib.js can treat every
// language's lessons uniformly.
//
// Ships the full 8-module curriculum (58 lessons): Grammar Foundations,
// Numbers, Nouns & Cases, Adjectives, Verbs, Sentence Structure, Everyday
// Vocabulary, and Real-Life Communication - mirroring the Norwegian/Swedish
// curriculum's structure. Further lessons can be appended here without
// touching any wiring.
//
// German differs from the Scandinavian courses in ways the content reflects:
// three genders (der/die/das), a case system (nominative/accusative/dative),
// verbs that DO conjugate by person (ich bin, du bist...), the "one-and-twenty"
// number order, separable verbs, and the perfect tense built with haben/sein.
//
// Lesson order in the array IS the unlock order - a lesson at array index i
// is playable once profile.courses.german.lessonsCompleted.length >= i.
// id values ("ger-NN") must stay stable and never be reordered or reused once
// shipped, since they're stored (as completed) in player profiles.
//
// Exercise types (rendered by js/lessons.js):
//   { type: "mc", prompt, options: [...], answer: <index> }
//   { type: "trueFalse", claim, answer: <bool> }
//   { type: "type", prompt, answer: "<canonical>", accept: ["<alt spellings>"] }
// Example rows use { type: "example", de: "...", en: "..." }.

const GERMAN_LESSONS_DATA = {
    german: [
        // ── Module 1: Grammar Foundations ────────────────────────────────
        {
            id: "ger-01",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "Alphabet, Sounds & Extra Letters",
            explanation: [
                { type: "p", text: "German uses the same 26 letters as English, plus three umlauted vowels - ä, ö, ü - and one special letter, ß (called 'Eszett' or 'scharfes S')." },
                { type: "p", text: "ä sounds like the 'e' in 'bed'. ö is like the 'i' in 'bird' with rounded lips. ü is said like 'ee' but with rounded lips (like French 'u')." },
                { type: "example", de: "hallo", en: "hello" },
                { type: "example", de: "danke", en: "thank you" },
                { type: "p", text: "ß is a sharp 's' sound and only ever appears in lowercase, usually after a long vowel. And remember: every German noun is capitalized, wherever it sits in the sentence." },
                { type: "example", de: "die Straße", en: "the street" },
                { type: "example", de: "schön", en: "nice / beautiful" }
            ],
            exercises: [
                { type: "mc", prompt: "Which of these is NOT a German umlaut vowel?", options: ["ä", "ö", "ü", "ø"], answer: 3 },
                { type: "trueFalse", claim: "The letter ß only exists in lowercase.", answer: true },
                { type: "mc", prompt: "How is the German 'ü' pronounced?", options: ["like 'oo' in food", "like 'ee' with rounded lips", "like 'a' in cat", "exactly like English u"], answer: 1 },
                { type: "type", prompt: "Type the German word for 'thank you'.", answer: "danke", accept: ["danke"] },
                { type: "trueFalse", claim: "In German, every noun is written with a capital letter.", answer: true },
                { type: "mc", prompt: "Which word means 'street'?", options: ["schön", "Straße", "danke", "hallo"], answer: 1 }
            ]
        },
        {
            id: "ger-02",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "Subject Pronouns (Nominative)",
            explanation: [
                { type: "p", text: "Subject pronouns are the 'doer' of a sentence. In the nominative case (the subject form), German has:" },
                { type: "example", de: "ich", en: "I" },
                { type: "example", de: "du", en: "you (singular, informal)" },
                { type: "example", de: "er / sie / es", en: "he / she / it" },
                { type: "example", de: "wir", en: "we" },
                { type: "example", de: "ihr", en: "you (plural, informal)" },
                { type: "example", de: "sie / Sie", en: "they / you (formal)" },
                { type: "p", text: "'Sie' with a capital S is the polite 'you' for strangers and formal situations - it looks like 'sie' (they) but is always capitalized." }
            ],
            exercises: [
                { type: "mc", prompt: "Which pronoun means 'I'?", options: ["du", "ich", "wir", "sie"], answer: 1 },
                { type: "mc", prompt: "Which pronoun means 'we'?", options: ["wir", "ihr", "sie", "du"], answer: 0 },
                { type: "trueFalse", claim: "'du' is the informal 'you' for one person.", answer: true },
                { type: "type", prompt: "Type the German word for 'you' (plural, informal).", answer: "ihr", accept: ["ihr"] },
                { type: "mc", prompt: "Which form is the polite/formal 'you'?", options: ["du", "ihr", "sie", "Sie"], answer: 3 },
                { type: "trueFalse", claim: "'er', 'sie' and 'es' mean 'he', 'she' and 'it'.", answer: true }
            ]
        },
        {
            id: "ger-03",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "The Verb sein (to be) - Present Tense",
            explanation: [
                { type: "p", text: "Unlike the Scandinavian languages, German verbs change their ending for each subject. 'sein' (to be) is irregular and one of the most important verbs to memorize." },
                { type: "example", de: "ich bin", en: "I am" },
                { type: "example", de: "du bist", en: "you are" },
                { type: "example", de: "er/sie/es ist", en: "he/she/it is" },
                { type: "example", de: "wir sind / sie sind", en: "we are / they are" },
                { type: "example", de: "ihr seid", en: "you (pl.) are" },
                { type: "example", de: "Ich bin müde.", en: "I am tired." }
            ],
            exercises: [
                { type: "mc", prompt: "What is the correct form of 'sein' for 'ich'?", options: ["bin", "bist", "ist", "sind"], answer: 0 },
                { type: "mc", prompt: "Complete: 'Du ___ nett.' (You are nice.)", options: ["bin", "bist", "ist", "seid"], answer: 1 },
                { type: "type", prompt: "Type the form of 'sein' used with 'wir' (we).", answer: "sind", accept: ["sind"] },
                { type: "trueFalse", claim: "German verbs keep the same form for every subject.", answer: false },
                { type: "mc", prompt: "How do you say 'She is here'? (hier = here)", options: ["Sie bin hier.", "Sie bist hier.", "Sie ist hier.", "Sie sind hier."], answer: 2 },
                { type: "type", prompt: "Complete: 'Ich ___ müde.' (I am tired.)", answer: "bin", accept: ["bin"] }
            ]
        },
        {
            id: "ger-04",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "The Verb haben (to have) - Present Tense",
            explanation: [
                { type: "p", text: "'haben' (to have) is another essential verb. It's mostly regular, but the 'du' and 'er/sie/es' forms drop the 'b'." },
                { type: "example", de: "ich habe", en: "I have" },
                { type: "example", de: "du hast", en: "you have" },
                { type: "example", de: "er/sie/es hat", en: "he/she/it has" },
                { type: "example", de: "wir/sie haben", en: "we/they have" },
                { type: "example", de: "ihr habt", en: "you (pl.) have" },
                { type: "example", de: "Ich habe ein Auto.", en: "I have a car." }
            ],
            exercises: [
                { type: "mc", prompt: "What is the 'du' form of 'haben'?", options: ["habe", "hast", "hat", "habt"], answer: 1 },
                { type: "type", prompt: "Complete: 'Ich ___ ein Auto.' (I have a car.)", answer: "habe", accept: ["habe"] },
                { type: "mc", prompt: "How do you say 'She has two children'? (zwei Kinder)", options: ["Sie habe zwei Kinder.", "Sie hast zwei Kinder.", "Sie hat zwei Kinder.", "Sie haben zwei Kinder."], answer: 2 },
                { type: "trueFalse", claim: "The 'er/sie/es' form of 'haben' is 'hat'.", answer: true },
                { type: "type", prompt: "Type the form of 'haben' used with 'wir' (we).", answer: "haben", accept: ["haben"] },
                { type: "mc", prompt: "Which sentence is correct for 'You (pl.) have time'? (Zeit = time)", options: ["Ihr habt Zeit.", "Ihr habe Zeit.", "Ihr hast Zeit.", "Ihr hat Zeit."], answer: 0 }
            ]
        },
        {
            id: "ger-05",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "Regular Verb Conjugation (Present)",
            explanation: [
                { type: "p", text: "Most German verbs are regular: take the stem (infinitive minus '-en') and add the endings -e, -st, -t, -en, -t, -en." },
                { type: "example", de: "machen: ich mache, du machst, er macht", en: "to do/make: I do, you do, he does" },
                { type: "example", de: "wir machen, ihr macht, sie machen", en: "we/you(pl.)/they do" },
                { type: "example", de: "wohnen → Ich wohne in Berlin.", en: "to live → I live in Berlin." },
                { type: "example", de: "spielen → Sie spielt Fußball.", en: "to play → She plays football." },
                { type: "p", text: "So the ending you add depends entirely on the subject - this pattern works for hundreds of verbs like lernen (to learn), kommen (to come), and trinken (to drink)." }
            ],
            exercises: [
                { type: "mc", prompt: "What ending does a regular verb take with 'du'?", options: ["-e", "-st", "-t", "-en"], answer: 1 },
                { type: "type", prompt: "Complete: 'Ich ___ in Berlin.' (wohnen - I live in Berlin.)", answer: "wohne", accept: ["wohne"] },
                { type: "mc", prompt: "What is the 'er/sie/es' form of 'spielen' (to play)?", options: ["spiele", "spielst", "spielt", "spielen"], answer: 2 },
                { type: "trueFalse", claim: "The verb ending in German depends on the subject.", answer: true },
                { type: "type", prompt: "Complete: 'Wir ___ Deutsch.' (lernen - We learn German.)", answer: "lernen", accept: ["lernen"] },
                { type: "mc", prompt: "How do you say 'He comes'? (kommen)", options: ["Er komme.", "Er kommst.", "Er kommt.", "Er kommen."], answer: 2 }
            ]
        },
        {
            id: "ger-06",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "Noun Gender & Definite Articles (der, die, das)",
            explanation: [
                { type: "p", text: "Every German noun has one of three genders, shown by the word for 'the': der (masculine), die (feminine), das (neuter)." },
                { type: "example", de: "der Mann", en: "the man (masculine)" },
                { type: "example", de: "die Frau", en: "the woman (feminine)" },
                { type: "example", de: "das Kind", en: "the child (neuter)" },
                { type: "p", text: "In the plural, 'the' is 'die' for every gender." },
                { type: "example", de: "die Kinder", en: "the children (plural)" },
                { type: "p", text: "Gender is often unpredictable, so always learn a noun together with its article - 'der', 'die' or 'das'." }
            ],
            exercises: [
                { type: "mc", prompt: "Which article is masculine?", options: ["der", "die", "das", "den"], answer: 0 },
                { type: "mc", prompt: "Which article goes with 'Frau' (woman)?", options: ["der", "die", "das", "dem"], answer: 1 },
                { type: "trueFalse", claim: "In the plural, the definite article is 'die' for all genders.", answer: true },
                { type: "type", prompt: "Type the definite article for 'Kind' (child, neuter).", answer: "das", accept: ["das"] },
                { type: "mc", prompt: "'der Mann' is which gender?", options: ["masculine", "feminine", "neuter", "plural"], answer: 0 },
                { type: "trueFalse", claim: "You can always tell a German noun's gender from its meaning.", answer: false }
            ]
        },
        {
            id: "ger-07",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "Indefinite Articles (ein, eine) & kein",
            explanation: [
                { type: "p", text: "The indefinite article ('a/an') is 'ein' for masculine and neuter nouns, and 'eine' for feminine nouns." },
                { type: "example", de: "ein Mann / ein Kind", en: "a man / a child" },
                { type: "example", de: "eine Frau", en: "a woman" },
                { type: "p", text: "To say 'no / not a', add a k-: 'kein' (m/n) and 'keine' (f). This is the usual way to negate a noun." },
                { type: "example", de: "Ich habe kein Auto.", en: "I have no car / I don't have a car." },
                { type: "example", de: "Das ist keine Katze.", en: "That is not a cat." }
            ],
            exercises: [
                { type: "mc", prompt: "Which indefinite article goes with a feminine noun?", options: ["ein", "eine", "einen", "kein"], answer: 1 },
                { type: "type", prompt: "Complete: '___ Mann' (a man).", answer: "ein", accept: ["ein"] },
                { type: "mc", prompt: "How do you say 'a woman'?", options: ["ein Frau", "eine Frau", "einen Frau", "kein Frau"], answer: 1 },
                { type: "trueFalse", claim: "'kein/keine' is used to say 'no' or 'not a' before a noun.", answer: true },
                { type: "type", prompt: "Complete: 'Ich habe ___ Auto.' (I have no car - neuter noun.)", answer: "kein", accept: ["kein"] },
                { type: "mc", prompt: "How do you say 'That is not a cat'? (Katze, feminine)", options: ["Das ist kein Katze.", "Das ist keine Katze.", "Das ist nicht Katze.", "Das ist eine Katze."], answer: 1 }
            ]
        },
        {
            id: "ger-08",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "Possessive Articles (mein, dein)",
            explanation: [
                { type: "p", text: "Possessive articles show ownership and take the same endings as 'ein/eine' - no ending for masculine/neuter, '-e' for feminine and plural." },
                { type: "example", de: "mein Auto / meine Katze", en: "my car / my cat" },
                { type: "example", de: "dein, sein, ihr", en: "your (sg.), his, her" },
                { type: "example", de: "unser, euer, ihr/Ihr", en: "our, your (pl.), their/your (formal)" },
                { type: "example", de: "Das ist meine Mutter.", en: "That is my mother." }
            ],
            exercises: [
                { type: "mc", prompt: "Which means 'my'?", options: ["dein", "mein", "sein", "ihr"], answer: 1 },
                { type: "mc", prompt: "Which possessive means 'his'?", options: ["ihr", "sein", "dein", "unser"], answer: 1 },
                { type: "type", prompt: "Type the German word for 'your' (singular, informal).", answer: "dein", accept: ["dein"] },
                { type: "trueFalse", claim: "'ihr' can mean 'her' (as a possessive).", answer: true },
                { type: "mc", prompt: "How do you say 'my cat'? (Katze is feminine)", options: ["mein Katze", "meine Katze", "meinen Katze", "meins Katze"], answer: 1 },
                { type: "type", prompt: "Complete: 'Das ist ___ Auto.' (my car).", answer: "mein", accept: ["mein"] }
            ]
        },
        {
            id: "ger-09",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "Negation with nicht and kein",
            explanation: [
                { type: "p", text: "German has two main negation words. Use 'kein/keine' to negate a noun (see the article lesson), and 'nicht' (not) to negate a verb, an adjective, or the rest of a sentence." },
                { type: "example", de: "Ich verstehe nicht.", en: "I don't understand." },
                { type: "example", de: "Das ist nicht gut.", en: "That is not good." },
                { type: "p", text: "'nicht' usually comes at the end, or right before the word it negates. Note there's no helper word like English 'do'." },
                { type: "example", de: "Ich habe kein Geld.", en: "I have no money." }
            ],
            exercises: [
                { type: "mc", prompt: "Which word negates a verb or adjective?", options: ["kein", "nicht", "nein", "nichts"], answer: 1 },
                { type: "mc", prompt: "Which word negates a noun (like 'a car')?", options: ["nicht", "kein", "nein", "nie"], answer: 1 },
                { type: "type", prompt: "Type the German word for 'not'.", answer: "nicht", accept: ["nicht"] },
                { type: "trueFalse", claim: "German needs a helper word like English 'do' to form a negative.", answer: false },
                { type: "mc", prompt: "How do you say 'That is not good'? (gut = good)", options: ["Das ist kein gut.", "Das ist nicht gut.", "Das nicht ist gut.", "Das ist gut nicht."], answer: 1 },
                { type: "type", prompt: "Complete: 'Ich habe ___ Geld.' (I have no money.)", answer: "kein", accept: ["kein"] }
            ]
        },
        {
            id: "ger-10",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "Yes/No Questions",
            explanation: [
                { type: "p", text: "To make a yes/no question, put the conjugated verb first, before the subject." },
                { type: "example", de: "Du bist müde. → Bist du müde?", en: "You are tired. → Are you tired?" },
                { type: "example", de: "Er wohnt hier. → Wohnt er hier?", en: "He lives here. → Does he live here?" },
                { type: "p", text: "Just like the Scandinavian languages, no helper word like English 'do/does' is needed - the verb simply moves to the front." }
            ],
            exercises: [
                { type: "mc", prompt: "How do you turn 'Du bist müde' into a question?", options: ["Du bist müde?", "Bist du müde?", "Müde du bist?", "Bist müde du?"], answer: 1 },
                { type: "trueFalse", claim: "German yes/no questions need a helper word like 'do'.", answer: false },
                { type: "mc", prompt: "What is the question form of 'Er wohnt hier'?", options: ["Er wohnt hier?", "Wohnt hier er?", "Wohnt er hier?", "Hier wohnt er?"], answer: 2 },
                { type: "type", prompt: "Turn into a question: 'Du hast Zeit.' → ___ du Zeit? (Do you have time?)", answer: "Hast", accept: ["Hast", "hast"] },
                { type: "mc", prompt: "What's the rule for a yes/no question in German?", options: ["Add 'macht' at the start", "Put the verb first, before the subject", "Just add a question mark", "Move the object to the front"], answer: 1 },
                { type: "type", prompt: "Question form of 'Sie ist glücklich.' (She is happy.) → ___ sie glücklich?", answer: "Ist", accept: ["Ist", "ist"] }
            ]
        },
        {
            id: "ger-11",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "Question Words (W-Fragen)",
            explanation: [
                { type: "p", text: "German question words nearly all start with 'w' (pronounced like an English 'v'). The verb comes right after the question word." },
                { type: "example", de: "wer / was", en: "who / what" },
                { type: "example", de: "wo / wann", en: "where / when" },
                { type: "example", de: "warum / wie", en: "why / how" },
                { type: "example", de: "Wie heißt du?", en: "What's your name? (lit. How are you called?)" },
                { type: "example", de: "Wo wohnst du?", en: "Where do you live?" }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'where'?", options: ["wer", "was", "wo", "wann"], answer: 2 },
                { type: "mc", prompt: "Which word means 'why'?", options: ["wie", "warum", "wer", "wann"], answer: 1 },
                { type: "type", prompt: "Type the German word for 'who'.", answer: "wer", accept: ["wer"] },
                { type: "mc", prompt: "'Wie heißt du?' is asking...", options: ["Where do you live?", "What's your name?", "How old are you?", "When do you arrive?"], answer: 1 },
                { type: "trueFalse", claim: "'wann' means 'when'.", answer: true },
                { type: "type", prompt: "Complete: '___ wohnst du?' (Where do you live?)", answer: "Wo", accept: ["Wo", "wo"] }
            ]
        },
        {
            id: "ger-12",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "Short Answers: ja, nein, doch",
            explanation: [
                { type: "p", text: "'ja' means yes and 'nein' means no." },
                { type: "example", de: "ja", en: "yes" },
                { type: "example", de: "nein", en: "no" },
                { type: "p", text: "German has a special third word, 'doch', used to answer 'yes' when you contradict a negative question - for example 'Don't you...?' → 'Yes I do!'" },
                { type: "example", de: "Magst du keinen Kaffee? – Doch, ich mag Kaffee!", en: "Don't you like coffee? – Yes I do (I like coffee)!" }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'no'?", options: ["ja", "nein", "doch", "nicht"], answer: 1 },
                { type: "type", prompt: "Type the German word for 'yes'.", answer: "ja", accept: ["ja"] },
                { type: "trueFalse", claim: "'doch' is used to answer 'yes' to a negative question.", answer: true },
                { type: "mc", prompt: "How would you answer 'yes, I do' to 'Magst du keinen Kaffee?' (Don't you like coffee?)", options: ["Ja, ich mag Kaffee.", "Nein, ich mag Kaffee.", "Doch, ich mag Kaffee.", "Nicht, ich mag Kaffee."], answer: 2 },
                { type: "type", prompt: "Type the German word for 'no'.", answer: "nein", accept: ["nein"] },
                { type: "trueFalse", claim: "'ja' is used the same way as 'doch' in every situation.", answer: false }
            ]
        },

        // ── Module 2: Numbers ────────────────────────────────────────────
        {
            id: "ger-13",
            moduleId: "numbers",
            moduleTitle: "Numbers",
            title: "Numbers 0-10",
            explanation: [
                { type: "p", text: "German numbers 0 to 10 are essential building blocks - you'll combine them constantly." },
                { type: "example", de: "null, eins, zwei, drei, vier", en: "0, 1, 2, 3, 4" },
                { type: "example", de: "fünf, sechs, sieben, acht, neun, zehn", en: "5, 6, 7, 8, 9, 10" },
                { type: "p", text: "When counting, 'one' is 'eins', but before a noun it becomes the article 'ein/eine' (ein Auto = one car)." },
                { type: "example", de: "ein Auto / eine Katze", en: "one car / one cat" }
            ],
            exercises: [
                { type: "mc", prompt: "What is 'five' in German?", options: ["vier", "fünf", "sechs", "sieben"], answer: 1 },
                { type: "type", prompt: "Type the German word for 'ten'.", answer: "zehn", accept: ["zehn"] },
                { type: "mc", prompt: "What is 'one' when you count (on its own)?", options: ["ein", "eine", "eins", "erst"], answer: 2 },
                { type: "trueFalse", claim: "'sieben' means 'seven'.", answer: true },
                { type: "type", prompt: "Type the German word for 'three'.", answer: "drei", accept: ["drei"] },
                { type: "mc", prompt: "What number is 'acht'?", options: ["6", "7", "8", "9"], answer: 2 }
            ]
        },
        {
            id: "ger-14",
            moduleId: "numbers",
            moduleTitle: "Numbers",
            title: "Numbers 11-20",
            explanation: [
                { type: "p", text: "Numbers 13-19 are built by adding '-zehn' (ten) to a base number, like English '-teen'." },
                { type: "example", de: "dreizehn, vierzehn, fünfzehn", en: "13, 14, 15" },
                { type: "example", de: "sechzehn, siebzehn, achtzehn, neunzehn", en: "16, 17, 18, 19" },
                { type: "p", text: "'elf' (11) and 'zwölf' (12) are irregular. Note also the slight spellings: sechzehn (not 'sechszehn') and siebzehn (not 'siebenzehn')." },
                { type: "example", de: "zwanzig", en: "20" }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'eleven'?", options: ["elf", "zwölf", "dreizehn", "zwanzig"], answer: 0 },
                { type: "type", prompt: "Type the German word for 'twelve'.", answer: "zwölf", accept: ["zwölf"] },
                { type: "mc", prompt: "What number is 'sechzehn'?", options: ["15", "16", "17", "18"], answer: 1 },
                { type: "trueFalse", claim: "'elf' and 'zwölf' follow the same '-zehn' pattern as 13-19.", answer: false },
                { type: "type", prompt: "Type the German word for 'twenty'.", answer: "zwanzig", accept: ["zwanzig"] },
                { type: "mc", prompt: "Which word means 'nineteen'?", options: ["neunzehn", "achtzehn", "siebzehn", "zwanzig"], answer: 0 }
            ]
        },
        {
            id: "ger-15",
            moduleId: "numbers",
            moduleTitle: "Numbers",
            title: "Tens: 20-100",
            explanation: [
                { type: "p", text: "The multiples of ten mostly add '-zig' to the base number." },
                { type: "example", de: "zwanzig, dreißig, vierzig, fünfzig", en: "20, 30, 40, 50" },
                { type: "example", de: "sechzig, siebzig, achtzig, neunzig", en: "60, 70, 80, 90" },
                { type: "example", de: "hundert", en: "100" },
                { type: "p", text: "Watch the irregular ones: 'dreißig' (30) ends in '-ßig', and sechzig/siebzig are shortened like the teens." }
            ],
            exercises: [
                { type: "mc", prompt: "What number is 'fünfzig'?", options: ["40", "50", "60", "70"], answer: 1 },
                { type: "type", prompt: "Type the German word for 'hundred'.", answer: "hundert", accept: ["hundert"] },
                { type: "mc", prompt: "Which word means 'seventy'?", options: ["sechzig", "siebzig", "achtzig", "neunzig"], answer: 1 },
                { type: "type", prompt: "Type the German word for 'thirty'.", answer: "dreißig", accept: ["dreißig"] },
                { type: "trueFalse", claim: "'vierzig' means 'forty'.", answer: true },
                { type: "mc", prompt: "What number is 'neunzig'?", options: ["80", "90", "100", "70"], answer: 1 }
            ]
        },
        {
            id: "ger-16",
            moduleId: "numbers",
            moduleTitle: "Numbers",
            title: "Compound Numbers 21-99",
            explanation: [
                { type: "p", text: "Here's German's famous twist: for 21-99 you say the ONES first, then 'und' (and), then the tens - literally 'one-and-twenty'." },
                { type: "example", de: "einundzwanzig", en: "21 (lit. one-and-twenty)" },
                { type: "example", de: "dreiunddreißig", en: "33 (three-and-thirty)" },
                { type: "example", de: "achtundfünfzig", en: "58 (eight-and-fifty)" },
                { type: "example", de: "neunundneunzig", en: "99 (nine-and-ninety)" },
                { type: "p", text: "It's all written as one word, and note 'ein' loses its 's' here (einundzwanzig, not 'einsundzwanzig')." }
            ],
            exercises: [
                { type: "type", prompt: "Type the German word for '21'.", answer: "einundzwanzig", accept: ["einundzwanzig"] },
                { type: "mc", prompt: "How is 33 said in German?", options: ["dreißigunddrei", "dreiunddreißig", "dreißigdrei", "dreiunddreißigste"], answer: 1 },
                { type: "trueFalse", claim: "In German you say the ones before the tens, joined by 'und'.", answer: true },
                { type: "type", prompt: "Type the German word for '45'.", answer: "fünfundvierzig", accept: ["fünfundvierzig"] },
                { type: "mc", prompt: "What number is 'achtundfünfzig'?", options: ["48", "58", "85", "68"], answer: 1 },
                { type: "type", prompt: "Type the German word for '99'.", answer: "neunundneunzig", accept: ["neunundneunzig"] }
            ]
        },
        {
            id: "ger-17",
            moduleId: "numbers",
            moduleTitle: "Numbers",
            title: "Numbers 100-1000",
            explanation: [
                { type: "p", text: "'hundert' means hundred and 'tausend' means thousand. Bigger numbers put the hundreds first, then the rest." },
                { type: "example", de: "hunderteins", en: "101" },
                { type: "example", de: "zweihundert", en: "200" },
                { type: "example", de: "fünfhundertzwanzig", en: "520" },
                { type: "example", de: "tausend", en: "1000" },
                { type: "p", text: "Big numbers are written as a single long word, with no linking word like English 'and'." }
            ],
            exercises: [
                { type: "type", prompt: "Type the German word for 'hundred'.", answer: "hundert", accept: ["hundert"] },
                { type: "mc", prompt: "How do you say '200'?", options: ["hundertzwei", "zweitausend", "zweihundert", "hundert zwei"], answer: 2 },
                { type: "type", prompt: "Type the German word for 'thousand'.", answer: "tausend", accept: ["tausend"] },
                { type: "trueFalse", claim: "German usually places a linking word like 'and' between the hundreds and the rest.", answer: false },
                { type: "mc", prompt: "How do you say '101'?", options: ["hunderteins", "hundert und eins", "einhundert eins", "hundert ein"], answer: 0 },
                { type: "type", prompt: "Type the German for '520'.", answer: "fünfhundertzwanzig", accept: ["fünfhundertzwanzig"] }
            ]
        },
        {
            id: "ger-18",
            moduleId: "numbers",
            moduleTitle: "Numbers",
            title: "Talking about Prices and Quantities",
            explanation: [
                { type: "p", text: "German (and most of the eurozone) uses the Euro (€) and Cent." },
                { type: "example", de: "Wie viel kostet das?", en: "How much does it cost?" },
                { type: "example", de: "Das kostet zehn Euro.", en: "It costs ten euros." },
                { type: "p", text: "For quantities: 'viel' (much, uncountable), 'viele' (many, countable), 'wenig' (little), and 'ein paar' (a few)." },
                { type: "example", de: "viel Wasser / viele Bücher", en: "a lot of water / many books" }
            ],
            exercises: [
                { type: "mc", prompt: "What does 'Wie viel kostet das?' mean?", options: ["Where is it?", "How much does it cost?", "What is it?", "When does it open?"], answer: 1 },
                { type: "type", prompt: "Type the currency used in Germany.", answer: "Euro", accept: ["Euro", "euro"] },
                { type: "mc", prompt: "Which word means 'many' (countable)?", options: ["viel", "viele", "wenig", "ein paar"], answer: 1 },
                { type: "trueFalse", claim: "'viel' is used for uncountable amounts, like 'viel Wasser' (a lot of water).", answer: true },
                { type: "type", prompt: "Type the German word for 'a few'.", answer: "ein paar", accept: ["ein paar"] },
                { type: "mc", prompt: "How do you say 'It costs ten euros'?", options: ["Das kostet zehn Euro.", "Das ist zehn Euro kostet.", "Zehn kostet das Euro.", "Das kostet Euro zehn."], answer: 0 }
            ]
        },

        // ── Module 3: Nouns & Cases ──────────────────────────────────────
        {
            id: "ger-19",
            moduleId: "nouns",
            moduleTitle: "Nouns & Cases",
            title: "The Nominative & Accusative Cases",
            explanation: [
                { type: "p", text: "German marks a noun's role in the sentence with 'cases'. The subject is in the nominative; the direct object is in the accusative. Only the masculine article changes between them." },
                { type: "example", de: "der Mann → den Mann", en: "the man (subject → object)" },
                { type: "example", de: "Der Mann sieht den Hund.", en: "The man sees the dog. (der = subject, den = object)" },
                { type: "p", text: "Feminine (die), neuter (das) and plural (die) look the same in the nominative and accusative - only masculine 'der' becomes 'den'." },
                { type: "example", de: "Ich habe einen Hund.", en: "I have a dog. (ein → einen, masculine accusative)" }
            ],
            exercises: [
                { type: "mc", prompt: "Which case is the direct object in?", options: ["nominative", "accusative", "dative", "genitive"], answer: 1 },
                { type: "mc", prompt: "What does masculine 'der' become in the accusative?", options: ["der", "dem", "den", "des"], answer: 2 },
                { type: "type", prompt: "Complete: 'Ich sehe ___ Mann.' (I see the man - accusative).", answer: "den", accept: ["den"] },
                { type: "trueFalse", claim: "Feminine and neuter articles look the same in the nominative and accusative.", answer: true },
                { type: "mc", prompt: "How do you say 'I have a dog'? (Hund is masculine)", options: ["Ich habe ein Hund.", "Ich habe einen Hund.", "Ich habe einem Hund.", "Ich habe der Hund."], answer: 1 },
                { type: "mc", prompt: "In 'Der Mann sieht den Hund', which noun is the subject?", options: ["der Hund", "den Hund", "der Mann", "sieht"], answer: 2 }
            ]
        },
        {
            id: "ger-20",
            moduleId: "nouns",
            moduleTitle: "Nouns & Cases",
            title: "Accusative Personal Pronouns",
            explanation: [
                { type: "p", text: "When a pronoun is the direct object, it takes its accusative form." },
                { type: "example", de: "ich → mich", en: "I → me" },
                { type: "example", de: "du → dich", en: "you → you" },
                { type: "example", de: "er/sie/es → ihn / sie / es", en: "he/she/it → him / her / it" },
                { type: "example", de: "wir/ihr/sie → uns / euch / sie", en: "we/you/they → us / you / them" },
                { type: "example", de: "Ich sehe dich.", en: "I see you." },
                { type: "example", de: "Sie kennt ihn.", en: "She knows him." }
            ],
            exercises: [
                { type: "mc", prompt: "What is the accusative of 'ich' (I)?", options: ["mich", "dich", "mir", "ihn"], answer: 0 },
                { type: "mc", prompt: "'Ich sehe ___.' (I see him.) Which word fits?", options: ["er", "ihn", "ihm", "sie"], answer: 1 },
                { type: "trueFalse", claim: "'uns' means 'us'.", answer: true },
                { type: "type", prompt: "Type the accusative pronoun for 'you' (singular, informal).", answer: "dich", accept: ["dich"] },
                { type: "mc", prompt: "What is the accusative form of 'sie' (she)?", options: ["ihr", "sie", "ihn", "es"], answer: 1 },
                { type: "type", prompt: "Complete: 'Sie kennt ___.' (She knows him.)", answer: "ihn", accept: ["ihn"] }
            ]
        },
        {
            id: "ger-21",
            moduleId: "nouns",
            moduleTitle: "Nouns & Cases",
            title: "The Dative Case",
            explanation: [
                { type: "p", text: "The dative case marks the indirect object - often the 'to whom' of a sentence. All the articles change in the dative." },
                { type: "example", de: "der/das → dem, die → der, plural → den", en: "dative definite articles" },
                { type: "example", de: "Ich gebe dem Mann das Buch.", en: "I give the man the book." },
                { type: "p", text: "The dative personal pronouns are: mir, dir, ihm/ihr/ihm, uns, euch, ihnen." },
                { type: "example", de: "Er hilft mir.", en: "He helps me. (helfen takes the dative)" }
            ],
            exercises: [
                { type: "mc", prompt: "The dative case usually marks the...?", options: ["subject", "direct object", "indirect object", "question"], answer: 2 },
                { type: "mc", prompt: "What does masculine 'der' become in the dative?", options: ["den", "dem", "des", "der"], answer: 1 },
                { type: "type", prompt: "Type the dative pronoun for 'me'.", answer: "mir", accept: ["mir"] },
                { type: "trueFalse", claim: "In the dative, all the articles change form.", answer: true },
                { type: "mc", prompt: "How do you say 'He helps me'? (helfen takes the dative)", options: ["Er hilft mich.", "Er hilft mir.", "Er hilft ich.", "Er hilft mein."], answer: 1 },
                { type: "type", prompt: "Complete: 'Ich gebe ___ Mann das Buch.' (I give the man the book - dative).", answer: "dem", accept: ["dem"] }
            ]
        },
        {
            id: "ger-22",
            moduleId: "nouns",
            moduleTitle: "Nouns & Cases",
            title: "Noun Plurals",
            explanation: [
                { type: "p", text: "German plurals come in several patterns - there's no single rule, so the plural is best learned with each noun. The most common endings are -e, -er, -(e)n, and -s." },
                { type: "example", de: "der Hund → die Hunde", en: "dog → dogs (+e)" },
                { type: "example", de: "das Kind → die Kinder", en: "child → children (+er)" },
                { type: "example", de: "die Frau → die Frauen", en: "woman → women (+en)" },
                { type: "example", de: "das Auto → die Autos", en: "car → cars (+s)" },
                { type: "p", text: "Many plurals also add an umlaut to the vowel: der Mann → die Männer, die Stadt → die Städte. And remember, the plural article is always 'die'." }
            ],
            exercises: [
                { type: "mc", prompt: "What is the plural of 'der Hund' (dog)?", options: ["die Hunde", "die Hunds", "die Hunder", "die Hünde"], answer: 0 },
                { type: "type", prompt: "Type the plural of 'das Auto' (car).", answer: "Autos", accept: ["Autos", "die Autos"] },
                { type: "mc", prompt: "What is the plural of 'das Kind' (child)?", options: ["die Kinde", "die Kinds", "die Kinder", "die Kindern"], answer: 2 },
                { type: "trueFalse", claim: "The plural definite article is always 'die', for every gender.", answer: true },
                { type: "mc", prompt: "Which plural adds an umlaut?", options: ["Auto → Autos", "Mann → Männer", "Frau → Frauen", "Hund → Hunde"], answer: 1 },
                { type: "type", prompt: "Type the plural of 'die Frau' (woman).", answer: "Frauen", accept: ["Frauen", "die Frauen"] }
            ]
        },
        {
            id: "ger-23",
            moduleId: "nouns",
            moduleTitle: "Nouns & Cases",
            title: "Using es gibt (there is / there are)",
            explanation: [
                { type: "p", text: "To say 'there is' or 'there are', German uses the fixed phrase 'es gibt' - and, importantly, the thing that follows is in the accusative case." },
                { type: "example", de: "Es gibt ein Problem.", en: "There is a problem." },
                { type: "example", de: "Es gibt einen Supermarkt hier.", en: "There is a supermarket here. (einen = masculine accusative)" },
                { type: "example", de: "Es gibt viele Restaurants.", en: "There are many restaurants." },
                { type: "p", text: "'es gibt' never changes for singular vs plural - it's always 'es gibt'." }
            ],
            exercises: [
                { type: "mc", prompt: "Which phrase means 'there is / there are'?", options: ["es ist", "es gibt", "es hat", "da ist"], answer: 1 },
                { type: "trueFalse", claim: "The noun after 'es gibt' is in the accusative case.", answer: true },
                { type: "type", prompt: "Complete: '___ gibt ein Problem.' (There is a problem.)", answer: "Es", accept: ["Es", "es"] },
                { type: "mc", prompt: "How do you say 'There is a supermarket here'? (Supermarkt is masculine)", options: ["Es gibt ein Supermarkt hier.", "Es gibt einen Supermarkt hier.", "Es ist ein Supermarkt hier.", "Da gibt einen Supermarkt hier."], answer: 1 },
                { type: "trueFalse", claim: "'es gibt' changes to a plural form when there are many things.", answer: false },
                { type: "mc", prompt: "How do you say 'There are many restaurants'?", options: ["Es gibt viele Restaurants.", "Es sind viele Restaurants.", "Es sind viel Restaurant.", "Da gibt viele Restaurants."], answer: 0 }
            ]
        },

        // ── Module 4: Adjectives ─────────────────────────────────────────
        {
            id: "ger-24",
            moduleId: "adjectives",
            moduleTitle: "Adjectives",
            title: "Basic Adjectives",
            explanation: [
                { type: "p", text: "When an adjective comes after the verb 'sein' (to be), it takes NO ending - it's the easiest position." },
                { type: "example", de: "Das Auto ist groß.", en: "The car is big." },
                { type: "example", de: "Die Frau ist nett.", en: "The woman is nice." },
                { type: "p", text: "Some essentials: groß (big), klein (small), gut (good), schlecht (bad), neu (new), alt (old), schön (beautiful)." },
                { type: "example", de: "Der Kaffee ist gut.", en: "The coffee is good." }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'small'?", options: ["groß", "klein", "gut", "neu"], answer: 1 },
                { type: "type", prompt: "Type the German word for 'good'.", answer: "gut", accept: ["gut"] },
                { type: "mc", prompt: "Which word means 'old'?", options: ["neu", "alt", "schön", "schlecht"], answer: 1 },
                { type: "trueFalse", claim: "After 'sein', an adjective takes no ending.", answer: true },
                { type: "type", prompt: "Type the German word for 'big'.", answer: "groß", accept: ["groß"] },
                { type: "mc", prompt: "What does 'schön' mean?", options: ["ugly", "beautiful", "tall", "fast"], answer: 1 }
            ]
        },
        {
            id: "ger-25",
            moduleId: "adjectives",
            moduleTitle: "Adjectives",
            title: "Adjective Endings (before a noun)",
            explanation: [
                { type: "p", text: "When an adjective comes BEFORE a noun, it takes an ending. After a definite article (der/die/das), that ending is usually '-e' in the nominative singular." },
                { type: "example", de: "der große Mann", en: "the big man" },
                { type: "example", de: "die kleine Katze", en: "the small cat" },
                { type: "example", de: "das neue Auto", en: "the new car" },
                { type: "p", text: "In the plural, and after most other words, the ending is usually '-en': 'die großen Häuser' (the big houses). Endings are a big topic - for now, just remember: an adjective before a noun always needs one." },
                { type: "example", de: "die alten Bücher", en: "the old books" }
            ],
            exercises: [
                { type: "mc", prompt: "In 'der ___ Mann' (the big man), which form of 'groß' fits?", options: ["groß", "große", "großen", "großes"], answer: 1 },
                { type: "trueFalse", claim: "An adjective before a noun takes an ending.", answer: true },
                { type: "type", prompt: "Complete: 'die ___ Katze' (the small cat - from 'klein').", answer: "kleine", accept: ["kleine"] },
                { type: "mc", prompt: "What ending do adjectives usually take in the plural?", options: ["-e", "-en", "-es", "no ending"], answer: 1 },
                { type: "trueFalse", claim: "An adjective after 'sein' takes the same ending as one before a noun.", answer: false },
                { type: "mc", prompt: "Which is correct for 'the new car'? (Auto is neuter)", options: ["das neu Auto", "das neue Auto", "das neuen Auto", "das neues Auto"], answer: 1 }
            ]
        },
        {
            id: "ger-26",
            moduleId: "adjectives",
            moduleTitle: "Adjectives",
            title: "Comparatives and Superlatives",
            explanation: [
                { type: "p", text: "Regular adjectives add '-er' for the comparative and 'am ...-sten' for the superlative." },
                { type: "example", de: "schön → schöner → am schönsten", en: "beautiful → more beautiful → most beautiful" },
                { type: "p", text: "Many short adjectives also add an umlaut, and a few are irregular." },
                { type: "example", de: "alt → älter → am ältesten", en: "old → older → oldest" },
                { type: "example", de: "gut → besser → am besten", en: "good → better → best" },
                { type: "example", de: "groß → größer → am größten", en: "big → bigger → biggest" }
            ],
            exercises: [
                { type: "mc", prompt: "What is the comparative of 'schön' (beautiful)?", options: ["schönst", "schöner", "am schönsten", "schönere"], answer: 1 },
                { type: "type", prompt: "Type the comparative of 'klein' (small).", answer: "kleiner", accept: ["kleiner"] },
                { type: "mc", prompt: "What is the comparative of 'gut' (good)?", options: ["guter", "besser", "am besten", "güter"], answer: 1 },
                { type: "trueFalse", claim: "'groß' (big) has an irregular comparative: 'größer'.", answer: true },
                { type: "type", prompt: "Complete the superlative: 'am ___' for 'gut' (good).", answer: "besten", accept: ["besten", "am besten"] },
                { type: "mc", prompt: "What is the comparative of 'alt' (old)?", options: ["alter", "älter", "am ältesten", "altere"], answer: 1 }
            ]
        },
        {
            id: "ger-27",
            moduleId: "adjectives",
            moduleTitle: "Adjectives",
            title: "Colors",
            explanation: [
                { type: "p", text: "Colors are adjectives, so after 'sein' they take no ending, and before a noun they take one." },
                { type: "example", de: "rot, blau, gelb", en: "red, blue, yellow" },
                { type: "example", de: "grün, weiß, schwarz", en: "green, white, black" },
                { type: "example", de: "Das Auto ist rot. / das rote Auto", en: "The car is red. / the red car" }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'blue'?", options: ["rot", "blau", "gelb", "grün"], answer: 1 },
                { type: "type", prompt: "Type the German word for 'green'.", answer: "grün", accept: ["grün"] },
                { type: "mc", prompt: "Which word means 'white'?", options: ["schwarz", "weiß", "grau", "braun"], answer: 1 },
                { type: "trueFalse", claim: "'schwarz' means 'black'.", answer: true },
                { type: "type", prompt: "Type the German word for 'red'.", answer: "rot", accept: ["rot"] },
                { type: "mc", prompt: "How do you say 'The car is red'?", options: ["Das Auto ist rote.", "Das Auto ist rot.", "Das rote Auto ist.", "Das Auto rot ist."], answer: 1 }
            ]
        },
        {
            id: "ger-28",
            moduleId: "adjectives",
            moduleTitle: "Adjectives",
            title: "Describing People and Things",
            explanation: [
                { type: "p", text: "A useful set of adjectives for describing people, moods, and things." },
                { type: "example", de: "groß, klein", en: "tall/big, small/short" },
                { type: "example", de: "dünn, dick", en: "thin, thick/fat" },
                { type: "example", de: "nett, böse", en: "kind/nice, mean/angry" },
                { type: "example", de: "glücklich, traurig", en: "happy, sad" },
                { type: "example", de: "hungrig, müde", en: "hungry, tired" }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'tall/big'?", options: ["klein", "groß", "dünn", "dick"], answer: 1 },
                { type: "type", prompt: "Type the German word for 'happy'.", answer: "glücklich", accept: ["glücklich"] },
                { type: "mc", prompt: "Which word means 'tired'?", options: ["hungrig", "müde", "böse", "traurig"], answer: 1 },
                { type: "trueFalse", claim: "'nett' means 'kind/nice'.", answer: true },
                { type: "type", prompt: "Type the German word for 'hungry'.", answer: "hungrig", accept: ["hungrig"] },
                { type: "mc", prompt: "What does 'traurig' mean?", options: ["happy", "sad", "kind", "tired"], answer: 1 }
            ]
        },

        // ── Module 5: Verbs ──────────────────────────────────────────────
        {
            id: "ger-29",
            moduleId: "verbs",
            moduleTitle: "Verbs",
            title: "Modal Verbs",
            explanation: [
                { type: "p", text: "Modal verbs express ability, wishes, and obligation. They're followed by a second verb in the infinitive - which goes to the very END of the sentence." },
                { type: "example", de: "Ich kann schwimmen.", en: "I can swim." },
                { type: "example", de: "Ich will reisen.", en: "I want to travel." },
                { type: "example", de: "Ich muss gehen.", en: "I must go." },
                { type: "p", text: "The six modals: können (can), wollen (want), müssen (must), dürfen (may), sollen (should), mögen (like). Note their 'ich'/'er' forms have no ending: ich kann, er kann." },
                { type: "example", de: "Sie darf das nicht machen.", en: "She's not allowed to do that." }
            ],
            exercises: [
                { type: "mc", prompt: "Where does the second verb (infinitive) go after a modal?", options: ["right after the modal", "at the end of the sentence", "before the subject", "it's dropped"], answer: 1 },
                { type: "type", prompt: "Complete: 'Ich ___ schwimmen.' (I can swim.)", answer: "kann", accept: ["kann"] },
                { type: "mc", prompt: "Which modal means 'must / have to'?", options: ["können", "wollen", "müssen", "dürfen"], answer: 2 },
                { type: "trueFalse", claim: "The 'ich' form of a modal verb takes no ending (e.g. 'ich kann').", answer: true },
                { type: "type", prompt: "Type the 'ich' form of 'wollen' (to want).", answer: "will", accept: ["will"] },
                { type: "mc", prompt: "How do you say 'I must go'?", options: ["Ich muss gehen.", "Ich muss zu gehen.", "Ich gehen muss.", "Ich muss gehe."], answer: 0 }
            ]
        },
        {
            id: "ger-30",
            moduleId: "verbs",
            moduleTitle: "Verbs",
            title: "Separable Verbs",
            explanation: [
                { type: "p", text: "Many German verbs have a prefix that splits off in a main clause and jumps to the end of the sentence." },
                { type: "example", de: "aufstehen → Ich stehe um sieben auf.", en: "to get up → I get up at seven." },
                { type: "example", de: "einkaufen → Wir kaufen heute ein.", en: "to shop → We're shopping today." },
                { type: "example", de: "anrufen → Er ruft mich an.", en: "to call → He calls me." },
                { type: "p", text: "In the dictionary the verb is written whole (aufstehen), but when you use it, the prefix (auf-, ein-, an-) goes to the end." }
            ],
            exercises: [
                { type: "mc", prompt: "In a main clause, where does the separable prefix go?", options: ["it stays attached", "to the end of the sentence", "before the subject", "it disappears"], answer: 1 },
                { type: "type", prompt: "Complete: 'Ich stehe um sieben ___.' (aufstehen - I get up at seven.)", answer: "auf", accept: ["auf"] },
                { type: "mc", prompt: "How do you say 'He calls me'? (anrufen)", options: ["Er anruft mich.", "Er ruft mich an.", "Er ruft an mich.", "Er an mich ruft."], answer: 1 },
                { type: "trueFalse", claim: "The prefix of a separable verb splits off in a main clause.", answer: true },
                { type: "type", prompt: "What is the separable prefix of 'einkaufen' (to shop)?", answer: "ein", accept: ["ein"] },
                { type: "mc", prompt: "Which sentence is correct for 'We're shopping today'?", options: ["Wir einkaufen heute.", "Wir kaufen heute ein.", "Wir kaufen ein heute.", "Wir ein heute kaufen."], answer: 1 }
            ]
        },
        {
            id: "ger-31",
            moduleId: "verbs",
            moduleTitle: "Verbs",
            title: "The Perfect Tense (haben + participle)",
            explanation: [
                { type: "p", text: "German's everyday past tense is the perfect: a form of 'haben' plus the past participle, which goes to the end. Regular participles look like 'ge-...-t'." },
                { type: "example", de: "machen → gemacht", en: "to do → done" },
                { type: "example", de: "Ich habe das gemacht.", en: "I have done / I did that." },
                { type: "example", de: "spielen → Wir haben Fußball gespielt.", en: "to play → We played football." },
                { type: "p", text: "Many common verbs have irregular participles ending in '-en', which you learn one by one." },
                { type: "example", de: "essen → gegessen (Ich habe gegessen.)", en: "to eat → eaten (I have eaten.)" }
            ],
            exercises: [
                { type: "mc", prompt: "The perfect tense is built with a form of 'haben' plus...?", options: ["the infinitive", "the past participle", "another modal", "the present tense"], answer: 1 },
                { type: "type", prompt: "Type the past participle of 'machen' (to do).", answer: "gemacht", accept: ["gemacht"] },
                { type: "mc", prompt: "How do you say 'We played football'?", options: ["Wir haben Fußball spielen.", "Wir haben Fußball gespielt.", "Wir spielen Fußball gehabt.", "Wir haben gespielt Fußball."], answer: 1 },
                { type: "trueFalse", claim: "A regular past participle looks like 'ge-...-t'.", answer: true },
                { type: "type", prompt: "Complete: 'Ich habe ___.' (I have eaten - from 'essen'.)", answer: "gegessen", accept: ["gegessen"] },
                { type: "mc", prompt: "Where does the past participle go in the sentence?", options: ["at the start", "right after the subject", "at the end", "before 'haben'"], answer: 2 }
            ]
        },
        {
            id: "ger-32",
            moduleId: "verbs",
            moduleTitle: "Verbs",
            title: "The Perfect Tense with sein",
            explanation: [
                { type: "p", text: "A group of verbs forms the perfect with 'sein' (not 'haben') - mostly verbs of movement or a change of state." },
                { type: "example", de: "gehen → Ich bin gegangen.", en: "to go → I have gone / I went." },
                { type: "example", de: "fahren → Wir sind nach Berlin gefahren.", en: "to drive/go → We went to Berlin." },
                { type: "example", de: "kommen → Sie ist gekommen.", en: "to come → She has come." },
                { type: "p", text: "A handy rule of thumb: if the verb shows movement from A to B (gehen, fahren, kommen, fliegen) or a change (werden, aufstehen), it usually takes 'sein'." }
            ],
            exercises: [
                { type: "mc", prompt: "Which verbs usually form the perfect with 'sein'?", options: ["verbs of eating", "verbs of movement or change", "modal verbs", "all verbs"], answer: 1 },
                { type: "type", prompt: "Complete: 'Ich ___ gegangen.' (I went - perfect with 'sein'.)", answer: "bin", accept: ["bin"] },
                { type: "mc", prompt: "How do you say 'She has come'? (kommen)", options: ["Sie hat gekommen.", "Sie ist gekommen.", "Sie ist kommen.", "Sie hat kommt."], answer: 1 },
                { type: "trueFalse", claim: "'gehen' forms its perfect with 'sein', not 'haben'.", answer: true },
                { type: "type", prompt: "Type the past participle of 'gehen' (to go).", answer: "gegangen", accept: ["gegangen"] },
                { type: "mc", prompt: "Which sentence is correct for 'We went to Berlin'?", options: ["Wir haben nach Berlin gefahren.", "Wir sind nach Berlin gefahren.", "Wir sind nach Berlin fahren.", "Wir fahren nach Berlin gewesen."], answer: 1 }
            ]
        },
        {
            id: "ger-33",
            moduleId: "verbs",
            moduleTitle: "Verbs",
            title: "The Simple Past of sein and haben",
            explanation: [
                { type: "p", text: "In speech, German prefers the perfect tense - but 'sein', 'haben' and the modals are normally used in their simple past form instead." },
                { type: "example", de: "sein → war", en: "to be → was/were" },
                { type: "example", de: "haben → hatte", en: "to have → had" },
                { type: "example", de: "Ich war müde. / Wir waren zu Hause.", en: "I was tired. / We were at home." },
                { type: "example", de: "Sie hatte keine Zeit.", en: "She had no time." },
                { type: "p", text: "The modals work the same way: können → konnte, müssen → musste, wollen → wollte." }
            ],
            exercises: [
                { type: "mc", prompt: "What is the simple past of 'sein' for 'ich' (I)?", options: ["war", "bin", "hatte", "gewesen"], answer: 0 },
                { type: "type", prompt: "Complete: 'Ich ___ müde.' (I was tired.)", answer: "war", accept: ["war"] },
                { type: "mc", prompt: "What is the simple past of 'haben' for 'sie' (she)?", options: ["hat", "hatte", "war", "habte"], answer: 1 },
                { type: "trueFalse", claim: "In everyday speech, 'sein' and 'haben' are usually used in the simple past.", answer: true },
                { type: "type", prompt: "Type the simple past of 'sein' used with 'wir' (we).", answer: "waren", accept: ["waren"] },
                { type: "mc", prompt: "How do you say 'She had no time'?", options: ["Sie hat keine Zeit.", "Sie hatte keine Zeit.", "Sie war keine Zeit.", "Sie hatte kein Zeit."], answer: 1 }
            ]
        },
        {
            id: "ger-34",
            moduleId: "verbs",
            moduleTitle: "Verbs",
            title: "Reflexive Verbs",
            explanation: [
                { type: "p", text: "Some German verbs are reflexive - the action reflects back on the subject, using a reflexive pronoun (mich, dich, sich, uns, euch, sich)." },
                { type: "example", de: "sich waschen → Ich wasche mich.", en: "to wash oneself → I wash myself." },
                { type: "example", de: "sich freuen → Er freut sich.", en: "to be glad → He is glad." },
                { type: "example", de: "sich setzen → Wir setzen uns.", en: "to sit down → We sit down." },
                { type: "p", text: "The 3rd-person reflexive pronoun is always 'sich' - for 'er', 'sie', 'es' and 'sie' (they) alike." }
            ],
            exercises: [
                { type: "mc", prompt: "Which reflexive pronoun is used for 'er', 'sie' and 'sie' (they) alike?", options: ["mich", "dich", "sich", "uns"], answer: 2 },
                { type: "type", prompt: "Complete: 'Ich wasche ___.' (I wash myself.)", answer: "mich", accept: ["mich"] },
                { type: "trueFalse", claim: "'Er freut sich' means 'He is glad'.", answer: true },
                { type: "mc", prompt: "How do you say 'We sit down'? (sich setzen)", options: ["Wir setzen sich.", "Wir setzen uns.", "Wir setzen euch.", "Wir setzen mich."], answer: 1 },
                { type: "type", prompt: "Type the reflexive pronoun for 'you' (singular, informal).", answer: "dich", accept: ["dich"] },
                { type: "mc", prompt: "What does 'sich waschen' literally mean?", options: ["to wash oneself", "to sit down", "to get up", "to be glad"], answer: 0 }
            ]
        },

        // ── Module 6: Sentence Structure ─────────────────────────────────
        {
            id: "ger-35",
            moduleId: "syntax",
            moduleTitle: "Sentence Structure",
            title: "Basic Word Order (S-V-O)",
            explanation: [
                { type: "p", text: "A basic German sentence follows Subject - Verb - Object, just like English." },
                { type: "example", de: "Ich lese das Buch.", en: "I read the book. (S-V-O)" },
                { type: "example", de: "Sie mag Kaffee.", en: "She likes coffee." },
                { type: "p", text: "This holds as long as the subject comes first - the next lesson shows what happens when something else leads." }
            ],
            exercises: [
                { type: "mc", prompt: "What is the basic German word order?", options: ["V-S-O", "S-O-V", "S-V-O", "O-V-S"], answer: 2 },
                { type: "trueFalse", claim: "'Ich lese das Buch' follows Subject-Verb-Object order.", answer: true },
                { type: "mc", prompt: "Which sentence correctly follows S-V-O?", options: ["Kaffee mag sie.", "Mag sie Kaffee.", "Sie mag Kaffee.", "Sie Kaffee mag."], answer: 2 },
                { type: "type", prompt: "Complete: 'Ich ___ das Buch.' (lesen - I read the book.)", answer: "lese", accept: ["lese"] },
                { type: "mc", prompt: "In 'Sie mag Kaffee', what role does 'Kaffee' play?", options: ["Subject", "Verb", "Object", "Adjective"], answer: 2 },
                { type: "trueFalse", claim: "German's basic word order is completely different from English.", answer: false }
            ]
        },
        {
            id: "ger-36",
            moduleId: "syntax",
            moduleTitle: "Sentence Structure",
            title: "The Verb-Second Rule",
            explanation: [
                { type: "p", text: "German's key rule: in a statement, the conjugated verb is always the SECOND element - no matter what comes first." },
                { type: "example", de: "Ich lese das Buch heute.", en: "I read the book today. (subject first, verb 2nd)" },
                { type: "example", de: "Heute lese ich das Buch.", en: "Today I read the book. (time first - verb still 2nd, subject after it!)" },
                { type: "p", text: "So when a sentence starts with something other than the subject (like a time word), the subject and verb swap places to keep the verb in position two." }
            ],
            exercises: [
                { type: "mc", prompt: "What is always the SECOND element in a German main clause?", options: ["the subject", "the object", "the conjugated verb", "the adverb"], answer: 2 },
                { type: "mc", prompt: "In 'Heute lese ich das Buch', where is the verb?", options: ["First", "Second", "Third", "Last"], answer: 1 },
                { type: "trueFalse", claim: "When a sentence starts with a time word, the subject and verb swap places.", answer: true },
                { type: "type", prompt: "Complete: 'Heute ___ ich das Buch.' (lesen - Today I read the book.)", answer: "lese", accept: ["lese"] },
                { type: "mc", prompt: "Which sentence correctly follows the verb-second rule?", options: ["Heute ich lese das Buch.", "Heute lese ich das Buch.", "Ich heute lese das Buch.", "Lese ich heute das Buch."], answer: 1 },
                { type: "trueFalse", claim: "The verb-second rule only applies to questions, not statements.", answer: false }
            ]
        },
        {
            id: "ger-37",
            moduleId: "syntax",
            moduleTitle: "Sentence Structure",
            title: "Time and Place Adverbs & Inversion",
            explanation: [
                { type: "p", text: "Time and place adverbs often lead a German sentence for emphasis - and by the verb-second rule, this always triggers subject-verb inversion." },
                { type: "example", de: "Jetzt essen wir.", en: "Now we eat. (jetzt first, verb 2nd, subject 3rd)" },
                { type: "example", de: "Hier wohne ich.", en: "I live here. (hier first, verb 2nd, subject 3rd)" },
                { type: "example", de: "morgen, später, dort", en: "tomorrow, later, there" }
            ],
            exercises: [
                { type: "mc", prompt: "How do you say 'Now we eat' leading with 'jetzt'?", options: ["Jetzt wir essen.", "Jetzt essen wir.", "Wir jetzt essen.", "Essen jetzt wir."], answer: 1 },
                { type: "type", prompt: "Complete: 'Hier ___ ich.' (wohnen - I live here.)", answer: "wohne", accept: ["wohne"] },
                { type: "trueFalse", claim: "Leading a sentence with a place adverb like 'hier' still triggers inversion.", answer: true },
                { type: "mc", prompt: "Which word means 'tomorrow'?", options: ["jetzt", "später", "morgen", "dort"], answer: 2 },
                { type: "mc", prompt: "Which sentence is correctly inverted?", options: ["Dort sie wohnen.", "Dort wohnen sie.", "Sie dort wohnen.", "Wohnen dort sie."], answer: 1 },
                { type: "type", prompt: "Type the German word for 'later'.", answer: "später", accept: ["später"] }
            ]
        },
        {
            id: "ger-38",
            moduleId: "syntax",
            moduleTitle: "Sentence Structure",
            title: "Position of nicht and Other Adverbs",
            explanation: [
                { type: "p", text: "Adverbs of frequency like 'oft' (often), 'immer' (always), 'nie' (never) and 'manchmal' (sometimes) usually come right after the verb (and subject)." },
                { type: "example", de: "Ich esse oft Fisch.", en: "I often eat fish." },
                { type: "example", de: "Sie ist immer glücklich.", en: "She is always happy." },
                { type: "p", text: "'nicht' (not) usually comes at the very end when it negates the whole sentence, or right before the specific word it negates." },
                { type: "example", de: "Ich kenne ihn nicht.", en: "I don't know him." }
            ],
            exercises: [
                { type: "mc", prompt: "Where does 'oft' (often) usually go?", options: ["before the subject", "right after the verb (and subject)", "always at the very start", "never mid-sentence"], answer: 1 },
                { type: "type", prompt: "Complete: 'Sie ist ___ glücklich.' (She is always happy.)", answer: "immer", accept: ["immer"] },
                { type: "mc", prompt: "Which word means 'never'?", options: ["oft", "immer", "nie", "manchmal"], answer: 2 },
                { type: "trueFalse", claim: "'nicht' often comes at the end of a sentence.", answer: true },
                { type: "type", prompt: "Type the German word for 'sometimes'.", answer: "manchmal", accept: ["manchmal"] },
                { type: "mc", prompt: "How do you say 'I often eat fish'?", options: ["Ich oft esse Fisch.", "Ich esse oft Fisch.", "Oft ich esse Fisch.", "Ich esse Fisch nicht oft."], answer: 1 }
            ]
        },
        {
            id: "ger-39",
            moduleId: "syntax",
            moduleTitle: "Sentence Structure",
            title: "Conjunctions: und, aber, oder, weil",
            explanation: [
                { type: "p", text: "These words connect clauses. und, aber, oder and denn are 'coordinating' - they DON'T change the word order after them." },
                { type: "example", de: "und, aber", en: "and, but" },
                { type: "example", de: "oder, denn", en: "or, because/for" },
                { type: "example", de: "Ich mag Tee, aber sie mag Kaffee.", en: "I like tea, but she likes coffee." },
                { type: "p", text: "There's also 'weil' (because), but watch out: 'weil' is a subordinating conjunction, so it sends the verb to the END of its clause." },
                { type: "example", de: "Ich bin müde, weil ich viel gearbeitet habe.", en: "I'm tired because I worked a lot." }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'but'?", options: ["und", "aber", "oder", "denn"], answer: 1 },
                { type: "type", prompt: "Type the German word for 'and'.", answer: "und", accept: ["und"] },
                { type: "mc", prompt: "Which word means 'or'?", options: ["und", "aber", "oder", "weil"], answer: 2 },
                { type: "trueFalse", claim: "After 'weil' (because), the verb goes to the end of the clause.", answer: true },
                { type: "mc", prompt: "How do you say 'I like tea, but she likes coffee'?", options: ["Ich mag Tee, aber sie mag Kaffee.", "Ich mag Tee, und sie mag Kaffee.", "Ich mag Tee, oder sie mag Kaffee.", "Ich mag Tee, aber mag sie Kaffee."], answer: 0 },
                { type: "type", prompt: "Complete: 'Möchtest du Tee ___ Kaffee?' (Do you want tea or coffee?)", answer: "oder", accept: ["oder"] }
            ]
        },

        // ── Module 7: Everyday Vocabulary ────────────────────────────────
        {
            id: "ger-40",
            moduleId: "vocabulary",
            moduleTitle: "Everyday Vocabulary",
            title: "Greetings and Courtesy Phrases",
            explanation: [
                { type: "p", text: "A handful of everyday phrases will cover most polite exchanges." },
                { type: "example", de: "hallo, hi", en: "hello, hi" },
                { type: "example", de: "guten Morgen, guten Tag, guten Abend", en: "good morning, good day, good evening" },
                { type: "example", de: "tschüss, auf Wiedersehen", en: "bye, goodbye" },
                { type: "example", de: "danke, bitte", en: "thanks, please/you're welcome" },
                { type: "example", de: "Entschuldigung", en: "sorry / excuse me" }
            ],
            exercises: [
                { type: "mc", prompt: "Which means 'good morning'?", options: ["guten Tag", "guten Morgen", "guten Abend", "gute Nacht"], answer: 1 },
                { type: "type", prompt: "Type the German word for 'bye' (informal).", answer: "tschüss", accept: ["tschüss"] },
                { type: "mc", prompt: "Which word means 'please' (and also 'you're welcome')?", options: ["danke", "bitte", "tschüss", "hallo"], answer: 1 },
                { type: "trueFalse", claim: "'Entschuldigung' means 'sorry / excuse me'.", answer: true },
                { type: "type", prompt: "Type the German phrase for 'goodbye' (formal).", answer: "auf Wiedersehen", accept: ["auf Wiedersehen", "Auf Wiedersehen"] },
                { type: "mc", prompt: "What does 'danke' mean?", options: ["please", "sorry", "thanks", "hello"], answer: 2 }
            ]
        },
        {
            id: "ger-41",
            moduleId: "vocabulary",
            moduleTitle: "Everyday Vocabulary",
            title: "Introducing Yourself",
            explanation: [
                { type: "p", text: "These phrases cover the basics of introducing yourself." },
                { type: "example", de: "Ich heiße...", en: "My name is... (lit. I am called...)" },
                { type: "example", de: "Ich komme aus... / Ich bin aus...", en: "I come from... / I am from..." },
                { type: "example", de: "Ich arbeite als... / Ich studiere...", en: "I work as... / I study..." },
                { type: "example", de: "Freut mich.", en: "Nice to meet you. (lit. pleases me)" }
            ],
            exercises: [
                { type: "mc", prompt: "How do you say 'My name is...'?", options: ["Ich bin aus...", "Ich heiße...", "Ich komme...", "Ich wohne..."], answer: 1 },
                { type: "type", prompt: "Type the German phrase for 'I come from...'.", answer: "ich komme aus", accept: ["ich komme aus"] },
                { type: "mc", prompt: "What does 'Freut mich' mean?", options: ["Nice to meet you", "Good morning", "See you later", "How are you"], answer: 0 },
                { type: "trueFalse", claim: "'Ich studiere' means 'I study'.", answer: true },
                { type: "type", prompt: "Complete: 'Ich arbeite ___ Lehrer.' (I work as a teacher.)", answer: "als", accept: ["als"] },
                { type: "mc", prompt: "Which phrase tells where you're from?", options: ["Ich heiße...", "Ich bin aus...", "Ich arbeite...", "Ich mag..."], answer: 1 }
            ]
        },
        {
            id: "ger-42",
            moduleId: "vocabulary",
            moduleTitle: "Everyday Vocabulary",
            title: "Family Vocabulary",
            explanation: [
                { type: "p", text: "Core family words - many pair up neatly, like English." },
                { type: "example", de: "die Mutter, der Vater", en: "mother, father" },
                { type: "example", de: "die Schwester, der Bruder", en: "sister, brother" },
                { type: "example", de: "die Tochter, der Sohn", en: "daughter, son" },
                { type: "example", de: "die Großmutter, der Großvater", en: "grandmother, grandfather" },
                { type: "example", de: "die Frau, der Mann, das Kind, die Eltern", en: "wife/woman, husband/man, child, parents" }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'mother'?", options: ["der Vater", "die Mutter", "die Schwester", "die Tochter"], answer: 1 },
                { type: "type", prompt: "Type the German word for 'brother' (without the article).", answer: "Bruder", accept: ["Bruder", "der Bruder"] },
                { type: "mc", prompt: "Which word means 'grandfather'?", options: ["die Großmutter", "der Großvater", "der Vater", "der Bruder"], answer: 1 },
                { type: "trueFalse", claim: "'die Eltern' means 'parents'.", answer: true },
                { type: "type", prompt: "Type the German word for 'daughter' (without the article).", answer: "Tochter", accept: ["Tochter", "die Tochter"] },
                { type: "mc", prompt: "What does 'der Sohn' mean?", options: ["daughter", "son", "brother", "father"], answer: 1 }
            ]
        },
        {
            id: "ger-43",
            moduleId: "vocabulary",
            moduleTitle: "Everyday Vocabulary",
            title: "Days, Seasons, and Time",
            explanation: [
                { type: "p", text: "The days of the week (all masculine - 'der'):" },
                { type: "example", de: "Montag, Dienstag, Mittwoch", en: "Monday, Tuesday, Wednesday" },
                { type: "example", de: "Donnerstag, Freitag, Samstag, Sonntag", en: "Thursday, Friday, Saturday, Sunday" },
                { type: "p", text: "The four seasons, and asking the time:" },
                { type: "example", de: "Frühling, Sommer, Herbst, Winter", en: "spring, summer, autumn, winter" },
                { type: "example", de: "Wie spät ist es?", en: "What time is it?" }
            ],
            exercises: [
                { type: "mc", prompt: "Which day is 'Samstag'?", options: ["Friday", "Saturday", "Sunday", "Thursday"], answer: 1 },
                { type: "type", prompt: "Type the German word for 'Monday'.", answer: "Montag", accept: ["Montag"] },
                { type: "mc", prompt: "Which word means 'summer'?", options: ["Frühling", "Sommer", "Herbst", "Winter"], answer: 1 },
                { type: "trueFalse", claim: "'Wie spät ist es?' asks what time it is.", answer: true },
                { type: "type", prompt: "Type the German word for 'winter'.", answer: "Winter", accept: ["Winter"] },
                { type: "mc", prompt: "Which season is 'Herbst'?", options: ["spring", "summer", "autumn", "winter"], answer: 2 }
            ]
        },
        {
            id: "ger-44",
            moduleId: "vocabulary",
            moduleTitle: "Everyday Vocabulary",
            title: "Home and City",
            explanation: [
                { type: "p", text: "Vocabulary for talking about where you live." },
                { type: "example", de: "das Zuhause, die Wohnung, das Haus", en: "home, apartment, house" },
                { type: "example", de: "das Zimmer, die Küche, das Bad, das Schlafzimmer", en: "room, kitchen, bathroom, bedroom" },
                { type: "example", de: "die Stadt, die Straße, das Zentrum", en: "city/town, street, city centre" }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'apartment'?", options: ["das Haus", "die Wohnung", "das Zimmer", "die Stadt"], answer: 1 },
                { type: "type", prompt: "Type the German word for 'kitchen' (without the article).", answer: "Küche", accept: ["Küche", "die Küche"] },
                { type: "mc", prompt: "Which word means 'bedroom'?", options: ["das Bad", "die Küche", "das Schlafzimmer", "das Zimmer"], answer: 2 },
                { type: "trueFalse", claim: "'das Zentrum' means 'city centre'.", answer: true },
                { type: "type", prompt: "Type the German word for 'street' (without the article).", answer: "Straße", accept: ["Straße", "die Straße"] },
                { type: "mc", prompt: "What does 'die Stadt' mean?", options: ["house", "street", "city/town", "room"], answer: 2 }
            ]
        },
        {
            id: "ger-45",
            moduleId: "vocabulary",
            moduleTitle: "Everyday Vocabulary",
            title: "Food and Drinks",
            explanation: [
                { type: "p", text: "Everyday food and mealtime vocabulary." },
                { type: "example", de: "das Essen, das Wasser, die Milch", en: "food, water, milk" },
                { type: "example", de: "das Brot, der Käse, das Ei", en: "bread, cheese, egg" },
                { type: "example", de: "das Fleisch, der Fisch", en: "meat, fish" },
                { type: "example", de: "das Frühstück, das Mittagessen, das Abendessen", en: "breakfast, lunch, dinner" }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'bread'?", options: ["der Käse", "das Brot", "das Ei", "das Fleisch"], answer: 1 },
                { type: "type", prompt: "Type the German word for 'water' (without the article).", answer: "Wasser", accept: ["Wasser", "das Wasser"] },
                { type: "mc", prompt: "Which word means 'dinner'?", options: ["das Frühstück", "das Mittagessen", "das Abendessen", "das Essen"], answer: 2 },
                { type: "trueFalse", claim: "'der Käse' means 'cheese'.", answer: true },
                { type: "type", prompt: "Type the German word for 'fish' (without the article).", answer: "Fisch", accept: ["Fisch", "der Fisch"] },
                { type: "mc", prompt: "What does 'das Frühstück' mean?", options: ["lunch", "dinner", "breakfast", "food"], answer: 2 }
            ]
        },
        {
            id: "ger-46",
            moduleId: "vocabulary",
            moduleTitle: "Everyday Vocabulary",
            title: "Work and Studies",
            explanation: [
                { type: "p", text: "Vocabulary for talking about jobs and school." },
                { type: "example", de: "der Job, die Arbeit, das Büro", en: "job, work, office" },
                { type: "example", de: "der Lehrer, der Student, die Schule, die Universität", en: "teacher, student, school, university" },
                { type: "example", de: "die Besprechung, die Aufgabe, studieren", en: "meeting, task/assignment, to study" }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'teacher'?", options: ["der Student", "der Lehrer", "die Schule", "der Job"], answer: 1 },
                { type: "type", prompt: "Type the German word for 'school' (without the article).", answer: "Schule", accept: ["Schule", "die Schule"] },
                { type: "mc", prompt: "Which word means 'office'?", options: ["die Arbeit", "das Büro", "die Schule", "die Aufgabe"], answer: 1 },
                { type: "trueFalse", claim: "'die Universität' means 'university'.", answer: true },
                { type: "type", prompt: "Type the German word for 'work' (the noun, without the article).", answer: "Arbeit", accept: ["Arbeit", "die Arbeit"] },
                { type: "mc", prompt: "What does 'die Aufgabe' mean?", options: ["office", "meeting", "task/assignment", "job"], answer: 2 }
            ]
        },
        {
            id: "ger-47",
            moduleId: "vocabulary",
            moduleTitle: "Everyday Vocabulary",
            title: "Free Time and Hobbies",
            explanation: [
                { type: "p", text: "Vocabulary for talking about hobbies and leisure time." },
                { type: "example", de: "die Freizeit, das Hobby", en: "free time, hobby" },
                { type: "example", de: "spielen, trainieren, reisen, malen", en: "to play, to work out, to travel, to paint" },
                { type: "example", de: "die Musik, der Film, das Buch", en: "music, movie, book" }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'free time'?", options: ["das Hobby", "die Freizeit", "die Musik", "der Film"], answer: 1 },
                { type: "type", prompt: "Type the German verb for 'to travel'.", answer: "reisen", accept: ["reisen"] },
                { type: "mc", prompt: "Which word means 'to work out / train'?", options: ["spielen", "trainieren", "malen", "lesen"], answer: 1 },
                { type: "trueFalse", claim: "'spielen' can mean both 'to play a game' and 'to play an instrument'.", answer: true },
                { type: "type", prompt: "Type the German word for 'movie' (without the article).", answer: "Film", accept: ["Film", "der Film"] },
                { type: "mc", prompt: "What does 'malen' mean?", options: ["to paint", "to play", "to read", "to travel"], answer: 0 }
            ]
        },
        {
            id: "ger-48",
            moduleId: "vocabulary",
            moduleTitle: "Everyday Vocabulary",
            title: "Technology and the Internet",
            explanation: [
                { type: "p", text: "Vocabulary for talking about computers and getting online." },
                { type: "example", de: "der Computer, das Handy, der Bildschirm", en: "computer, phone, screen" },
                { type: "example", de: "das Internet, die Webseite, die App", en: "internet, website, app" },
                { type: "example", de: "die E-Mail, das Passwort", en: "email, password" },
                { type: "example", de: "herunterladen, suchen", en: "to download, to search" }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'phone (mobile)'?", options: ["der Computer", "das Handy", "der Bildschirm", "die App"], answer: 1 },
                { type: "type", prompt: "Type the German word for 'email' (without the article).", answer: "E-Mail", accept: ["E-Mail", "die E-Mail", "Email"] },
                { type: "mc", prompt: "Which word means 'password'?", options: ["die Webseite", "das Passwort", "das Internet", "der Bildschirm"], answer: 1 },
                { type: "trueFalse", claim: "'suchen' means 'to search'.", answer: true },
                { type: "type", prompt: "Type the German verb for 'to download'.", answer: "herunterladen", accept: ["herunterladen"] },
                { type: "mc", prompt: "What does 'der Bildschirm' mean?", options: ["screen", "phone", "app", "website"], answer: 0 }
            ]
        },
        {
            id: "ger-49",
            moduleId: "vocabulary",
            moduleTitle: "Everyday Vocabulary",
            title: "Shopping and Money",
            explanation: [
                { type: "p", text: "Vocabulary for shopping and handling money." },
                { type: "example", de: "kaufen, verkaufen, bezahlen", en: "to buy, to sell, to pay" },
                { type: "example", de: "das Geschäft, das Geld, der Preis", en: "store/shop, money, price" },
                { type: "example", de: "billig, teuer", en: "cheap, expensive" },
                { type: "example", de: "die Quittung, die Karte, das Bargeld", en: "receipt, card, cash" }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'to buy'?", options: ["verkaufen", "kaufen", "bezahlen", "suchen"], answer: 1 },
                { type: "type", prompt: "Type the German word for 'money' (without the article).", answer: "Geld", accept: ["Geld", "das Geld"] },
                { type: "mc", prompt: "Which word means 'expensive'?", options: ["billig", "teuer", "das Geld", "die Karte"], answer: 1 },
                { type: "trueFalse", claim: "'billig' means 'cheap'.", answer: true },
                { type: "type", prompt: "Type the German verb for 'to pay'.", answer: "bezahlen", accept: ["bezahlen"] },
                { type: "mc", prompt: "What does 'verkaufen' mean?", options: ["to buy", "to sell", "to pay", "to search"], answer: 1 }
            ]
        },

        // ── Module 8: Real-Life Communication ────────────────────────────
        {
            id: "ger-50",
            moduleId: "communication",
            moduleTitle: "Real-Life Communication",
            title: "Asking and Giving Personal Information",
            explanation: [
                { type: "p", text: "The most common get-to-know-you questions." },
                { type: "example", de: "Wie heißt du?", en: "What's your name?" },
                { type: "example", de: "Wie alt bist du?", en: "How old are you?" },
                { type: "example", de: "Wo wohnst du? / Was machst du beruflich?", en: "Where do you live? / What do you do for work?" },
                { type: "example", de: "Ich bin zwanzig Jahre alt.", en: "I am twenty years old." }
            ],
            exercises: [
                { type: "mc", prompt: "What does 'Wie alt bist du?' ask?", options: ["What's your name?", "How old are you?", "Where do you live?", "What do you do?"], answer: 1 },
                { type: "type", prompt: "Complete: 'Ich bin zwanzig Jahre ___.' (I am twenty years old.)", answer: "alt", accept: ["alt"] },
                { type: "mc", prompt: "Which question asks about someone's job?", options: ["Wie heißt du?", "Wo wohnst du?", "Was machst du beruflich?", "Wie alt bist du?"], answer: 2 },
                { type: "trueFalse", claim: "'Wo wohnst du?' asks where you live.", answer: true },
                { type: "type", prompt: "Type the German question for 'What's your name?'.", answer: "wie heißt du", accept: ["wie heißt du", "Wie heißt du?"] },
                { type: "mc", prompt: "How would you answer 'I am 30 years old'?", options: ["Ich habe dreißig Jahre.", "Ich bin dreißig Jahre alt.", "Ich wohne dreißig Jahre.", "Ich heiße dreißig Jahre."], answer: 1 }
            ]
        },
        {
            id: "ger-51",
            moduleId: "communication",
            moduleTitle: "Real-Life Communication",
            title: "Asking for Directions and Getting Around",
            explanation: [
                { type: "p", text: "Phrases for finding your way around." },
                { type: "example", de: "Wo ist...?", en: "Where is...?" },
                { type: "example", de: "links, rechts, geradeaus", en: "left, right, straight ahead" },
                { type: "example", de: "Wie komme ich zu...?", en: "How do I get to...?" },
                { type: "example", de: "der Bus, der Zug", en: "bus, train" }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'left'?", options: ["rechts", "links", "geradeaus", "zurück"], answer: 1 },
                { type: "type", prompt: "Type the German word for 'straight ahead'.", answer: "geradeaus", accept: ["geradeaus"] },
                { type: "mc", prompt: "Which word means 'train'?", options: ["der Bus", "der Zug", "das Auto", "das Flugzeug"], answer: 1 },
                { type: "trueFalse", claim: "'Wie komme ich zu...?' asks how to get somewhere.", answer: true },
                { type: "type", prompt: "Type the German phrase for 'Where is...?'.", answer: "wo ist", accept: ["wo ist", "Wo ist?"] },
                { type: "mc", prompt: "Which word means 'right'?", options: ["links", "rechts", "geradeaus", "dort"], answer: 1 }
            ]
        },
        {
            id: "ger-52",
            moduleId: "communication",
            moduleTitle: "Real-Life Communication",
            title: "Shopping at a Store or Supermarket",
            explanation: [
                { type: "p", text: "Phrases you'll hear and use while shopping." },
                { type: "example", de: "Kann ich Ihnen helfen?", en: "Can I help you? (formal)" },
                { type: "example", de: "Ich schaue nur.", en: "I'm just looking." },
                { type: "example", de: "Wo finde ich...?", en: "Where do I find...?" },
                { type: "example", de: "der Einkaufskorb, die Kasse", en: "shopping basket, checkout" }
            ],
            exercises: [
                { type: "mc", prompt: "What does 'Kann ich Ihnen helfen?' mean?", options: ["Can I help you?", "Can you help me?", "Where is it?", "How much is it?"], answer: 0 },
                { type: "type", prompt: "Type the German phrase for 'I'm just looking'.", answer: "ich schaue nur", accept: ["ich schaue nur"] },
                { type: "mc", prompt: "Which word means 'checkout / till'?", options: ["der Einkaufskorb", "die Kasse", "die Quittung", "das Geschäft"], answer: 1 },
                { type: "trueFalse", claim: "'Haben Sie...?' means 'Do you have...?'", answer: true },
                { type: "type", prompt: "Type the German word for 'shopping basket' (without the article).", answer: "Einkaufskorb", accept: ["Einkaufskorb", "der Einkaufskorb"] },
                { type: "mc", prompt: "Which phrase asks where to find something?", options: ["Wo finde ich...?", "Wo wohnst du?", "Wie geht es dir?", "Was kostet das?"], answer: 0 }
            ]
        },
        {
            id: "ger-53",
            moduleId: "communication",
            moduleTitle: "Real-Life Communication",
            title: "Ordering Food and Drinks",
            explanation: [
                { type: "p", text: "Phrases for restaurants and cafés." },
                { type: "example", de: "Ich hätte gern...", en: "I would like..." },
                { type: "example", de: "Kann ich... haben?", en: "Can I have...?" },
                { type: "example", de: "die Speisekarte, die Rechnung, bitte", en: "menu, the bill, please" },
                { type: "example", de: "Ist hier noch frei?", en: "Is this seat free? / Is there room here?" }
            ],
            exercises: [
                { type: "mc", prompt: "How do you say 'I would like...'?", options: ["Ich hätte gern...", "Ich heiße...", "Ich komme aus...", "Ich wohne..."], answer: 0 },
                { type: "type", prompt: "Type the German word for 'the bill' (without the article).", answer: "Rechnung", accept: ["Rechnung", "die Rechnung"] },
                { type: "mc", prompt: "Which word means 'menu'?", options: ["die Rechnung", "die Speisekarte", "die Kasse", "die Quittung"], answer: 1 },
                { type: "trueFalse", claim: "'Die Rechnung, bitte' means 'The bill, please'.", answer: true },
                { type: "type", prompt: "Type the German phrase for 'I would like...'.", answer: "ich hätte gern", accept: ["ich hätte gern"] },
                { type: "mc", prompt: "What does 'Schmeckt es?' mean?", options: ["Is it expensive?", "Does it taste good?", "Is it ready?", "Do you like it?"], answer: 1 }
            ]
        },
        {
            id: "ger-54",
            moduleId: "communication",
            moduleTitle: "Real-Life Communication",
            title: "Talking about the Weather",
            explanation: [
                { type: "p", text: "Small talk about the weather is as common in Germany as anywhere." },
                { type: "example", de: "Wie ist das Wetter?", en: "How's the weather?" },
                { type: "example", de: "Es ist sonnig. / Es regnet. / Es schneit.", en: "It's sunny. / It's raining. / It's snowing." },
                { type: "example", de: "Es ist kalt. / Es ist warm.", en: "It's cold. / It's warm." },
                { type: "example", de: "der Wind, die Wolke", en: "wind, cloud" }
            ],
            exercises: [
                { type: "mc", prompt: "What does 'Wie ist das Wetter?' ask?", options: ["What time is it?", "How's the weather?", "Where are you?", "How are you?"], answer: 1 },
                { type: "type", prompt: "Type the German phrase for 'It's snowing'.", answer: "es schneit", accept: ["es schneit"] },
                { type: "mc", prompt: "Which word means 'wind'?", options: ["die Wolke", "der Wind", "die Sonne", "der Regen"], answer: 1 },
                { type: "trueFalse", claim: "'Es ist sonnig' means 'It's sunny'.", answer: true },
                { type: "type", prompt: "Type the German phrase for 'It's cold'.", answer: "es ist kalt", accept: ["es ist kalt"] },
                { type: "mc", prompt: "Which word means 'cloud'?", options: ["die Wolke", "der Wind", "die Sonne", "der Schnee"], answer: 0 }
            ]
        },
        {
            id: "ger-55",
            moduleId: "communication",
            moduleTitle: "Real-Life Communication",
            title: "Describing Your Daily Routine",
            explanation: [
                { type: "p", text: "Verbs for describing a typical day, roughly in order. Many are separable." },
                { type: "example", de: "aufwachen, aufstehen, duschen", en: "to wake up, to get up, to shower" },
                { type: "example", de: "frühstücken, zur Arbeit fahren", en: "to eat breakfast, to go to work" },
                { type: "example", de: "nach Hause kommen, ins Bett gehen", en: "to come home, to go to bed" }
            ],
            exercises: [
                { type: "mc", prompt: "Which verb means 'to wake up'?", options: ["aufstehen", "aufwachen", "duschen", "ins Bett gehen"], answer: 1 },
                { type: "type", prompt: "Type the German verb for 'to shower'.", answer: "duschen", accept: ["duschen"] },
                { type: "mc", prompt: "Which verb means 'to get up'?", options: ["aufwachen", "aufstehen", "fahren", "duschen"], answer: 1 },
                { type: "trueFalse", claim: "'aufstehen' is a separable verb.", answer: true },
                { type: "type", prompt: "Type the German verb for 'to eat breakfast'.", answer: "frühstücken", accept: ["frühstücken"] },
                { type: "mc", prompt: "What does 'nach Hause kommen' mean?", options: ["to leave home", "to come home", "to go to work", "to wake up"], answer: 1 }
            ]
        },
        {
            id: "ger-56",
            moduleId: "communication",
            moduleTitle: "Real-Life Communication",
            title: "Expressing Preferences and Opinions",
            explanation: [
                { type: "p", text: "Phrases for saying what you like and think." },
                { type: "example", de: "Ich mag... / Ich mag... nicht", en: "I like... / I don't like..." },
                { type: "example", de: "Ich mag lieber...", en: "I prefer..." },
                { type: "example", de: "Ich finde, dass...", en: "I think that..." },
                { type: "example", de: "Ich stimme zu. / Ich stimme nicht zu.", en: "I agree. / I disagree." }
            ],
            exercises: [
                { type: "mc", prompt: "How do you say 'I prefer...'?", options: ["Ich mag...", "Ich mag lieber...", "Ich finde...", "Ich stimme zu..."], answer: 1 },
                { type: "type", prompt: "Type the German phrase for 'I agree'.", answer: "ich stimme zu", accept: ["ich stimme zu"] },
                { type: "mc", prompt: "Which phrase means 'I think that...' (opinion)?", options: ["Ich mag...", "Ich finde, dass...", "Ich mag lieber...", "Ich stimme nicht zu..."], answer: 1 },
                { type: "trueFalse", claim: "'Ich stimme nicht zu' means 'I disagree'.", answer: true },
                { type: "type", prompt: "Complete: 'Ich mag Fisch ___.' (I don't like fish.)", answer: "nicht", accept: ["nicht"] },
                { type: "mc", prompt: "What does 'Ich mag lieber Tee' mean?", options: ["I like tea", "I don't like tea", "I prefer tea", "I think tea"], answer: 2 }
            ]
        },
        {
            id: "ger-57",
            moduleId: "communication",
            moduleTitle: "Real-Life Communication",
            title: "Making Suggestions and Invitations",
            explanation: [
                { type: "p", text: "Phrases for proposing plans and inviting people along." },
                { type: "example", de: "Sollen wir...?", en: "Shall we...?" },
                { type: "example", de: "Willst du mitkommen? / Hast du Lust...?", en: "Do you want to come along? / Do you feel like...?" },
                { type: "example", de: "Vielleicht können wir...?", en: "Maybe we could...?" },
                { type: "example", de: "Das klingt gut. / Gerne!", en: "That sounds good. / Gladly!" }
            ],
            exercises: [
                { type: "mc", prompt: "How do you say 'Shall we...?' when suggesting something?", options: ["Willst du mitkommen?", "Sollen wir...?", "Hast du Lust...?", "Gerne!"], answer: 1 },
                { type: "type", prompt: "Type the German phrase for 'That sounds good'.", answer: "das klingt gut", accept: ["das klingt gut"] },
                { type: "mc", prompt: "Which phrase invites someone along?", options: ["Willst du mitkommen?", "Sollen wir...?", "Ich finde...", "Ich stimme zu"], answer: 0 },
                { type: "trueFalse", claim: "'Gerne!' means 'Gladly!' or 'Sure!'", answer: true },
                { type: "type", prompt: "Type the German phrase for 'Do you feel like...?'.", answer: "hast du Lust", accept: ["hast du Lust", "Hast du Lust?"] },
                { type: "mc", prompt: "What does 'Vielleicht können wir...?' mean?", options: ["Shall we...?", "Maybe we could...?", "Do you want to...?", "That sounds good"], answer: 1 }
            ]
        },
        {
            id: "ger-58",
            moduleId: "communication",
            moduleTitle: "Real-Life Communication",
            title: "Talking about Future Plans",
            explanation: [
                { type: "p", text: "German usually expresses the future with the present tense plus a time word - no special tense needed." },
                { type: "example", de: "Was machst du morgen?", en: "What are you doing tomorrow?" },
                { type: "example", de: "Ich fahre nach Berlin.", en: "I'm going to Berlin." },
                { type: "example", de: "Ich habe vor, zu...", en: "I plan to..." },
                { type: "example", de: "in einer Woche, nächstes Jahr", en: "in a week, next year" },
                { type: "p", text: "There's also a 'werden' future (Ich werde reisen = I will travel), but for everyday plans the present tense is by far the most common." }
            ],
            exercises: [
                { type: "mc", prompt: "What does 'Was machst du morgen?' ask?", options: ["What did you do yesterday?", "What are you doing tomorrow?", "What do you do for work?", "Where do you live?"], answer: 1 },
                { type: "type", prompt: "Type the German phrase for 'in a week'.", answer: "in einer Woche", accept: ["in einer Woche"] },
                { type: "mc", prompt: "Which phrase means 'next year'?", options: ["morgen", "in einer Woche", "nächstes Jahr", "heute"], answer: 2 },
                { type: "trueFalse", claim: "German often uses the present tense (plus a time word) to talk about the future.", answer: true },
                { type: "type", prompt: "Complete: 'Ich ___ nach Berlin.' (fahren - I'm going to Berlin.)", answer: "fahre", accept: ["fahre"] },
                { type: "mc", prompt: "How do you say 'I will travel' using 'werden'?", options: ["Ich werde reisen.", "Ich reise werde.", "Ich werde reise.", "Ich bin reisen."], answer: 0 }
            ]
        }
    ]
};

// Additive dual-export (see the header note): merge onto the shared global so
// load order relative to the other lessons-*.js files never clobbers another
// course, and expose the same object to api/_lib.js's require() for id validation.
if (typeof window !== "undefined") {
    window.POLYTYPE_LESSONS = Object.assign(window.POLYTYPE_LESSONS || {}, GERMAN_LESSONS_DATA);
}
if (typeof module !== "undefined" && module.exports) module.exports = GERMAN_LESSONS_DATA;
