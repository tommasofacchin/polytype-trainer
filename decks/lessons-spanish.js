// Spanish "Lessons" curriculum - a hand-authored sequence of short
// grammar/vocab lessons, the Spanish counterpart of the other decks/lessons-*.js
// files. Same data shape and the same dual-export contract, so js/lessons.js,
// js/router.js and api/_lib.js can treat every language's lessons uniformly.
//
// Ships the full 8-module curriculum (58 lessons): Grammar Foundations,
// Numbers, Nouns & Articles, Adjectives, Verbs, Sentence Structure, Everyday
// Vocabulary, and Real-Life Communication - mirroring the other courses'
// structure. Further lessons can be appended here without touching any wiring.
//
// Spanish differs from the other courses in ways the content reflects: two
// genders (masculine -o / feminine -a), three verb conjugations (-ar/-er/-ir)
// that all inflect by person, TWO verbs for "to be" (ser for identity/traits,
// estar for location/states), articles el/la/los/las and un/una/unos/unas,
// subject pronouns that are usually dropped, the pretérito perfecto built with
// haber (always haber, never a second auxiliary), written accents that mark
// stress, the letter ñ, and inverted ¿ / ¡ opening question and exclamation
// marks. Example rows use written accents; `type` answers are Spanish spellings
// (js/lessons.js lowercases, strips accent marks and spaces when matching, so
// "esta", "está" and "es ta" all match "está", and "espanol" matches "español").
//
// Lesson order in the array IS the unlock order - a lesson at array index i
// is playable once profile.courses.spanish.lessonsCompleted.length >= i.
// id values ("spa-NN") must stay stable and never be reordered or reused once
// shipped, since they're stored (as completed) in player profiles.
//
// Exercise types (rendered by js/lessons.js):
//   { type: "mc", prompt, options: [...], answer: <index> }
//   { type: "trueFalse", claim, answer: <bool> }
//   { type: "type", prompt, answer: "<canonical>", accept: ["<alt spellings>"] }
// Example rows use { type: "example", es: "...", en: "..." }.

const SPANISH_LESSONS_DATA = {
    spanish: [
        // ── Module 1: Grammar Foundations ────────────────────────────────
        {
            id: "spa-01",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "Alphabet, Sounds & Stress",
            explanation: [
                { type: "p", text: "Spanish spelling is almost perfectly phonetic - once you know the rules, you can read any word aloud. There are five pure vowels (a, e, i, o, u), always pronounced the same way, plus the special letter ñ (as in 'niño')." },
                { type: "example", es: "hola", en: "hello" },
                { type: "example", es: "español", en: "Spanish (note the ñ)" },
                { type: "p", text: "A few sound rules: the letter h is always silent (hola = 'ola'), j is a harsh throaty sound, and ll / rr are single sounds. A written accent (á, é, í, ó, ú) marks which syllable is stressed." },
                { type: "example", es: "café", en: "coffee (stress on the final é)" },
                { type: "p", text: "Questions and exclamations open with an inverted mark: ¿...? and ¡...!" }
            ],
            exercises: [
                { type: "mc", prompt: "How many pure vowel sounds does Spanish have?", options: ["three", "four", "five", "seven"], answer: 2 },
                { type: "trueFalse", claim: "The letter h is silent in Spanish (hola sounds like 'ola').", answer: true },
                { type: "mc", prompt: "What does a written accent (á, é, í...) mark?", options: ["a longer vowel", "the stressed syllable", "a plural", "a question"], answer: 1 },
                { type: "type", prompt: "Type the Spanish for 'hello'.", answer: "hola", accept: ["hola"] },
                { type: "mc", prompt: "How do Spanish questions open in writing?", options: ["with ?", "with ¿", "with !", "with ¡"], answer: 1 },
                { type: "trueFalse", claim: "ñ is a distinct letter in the Spanish alphabet.", answer: true }
            ]
        },
        {
            id: "spa-02",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "Subject Pronouns",
            explanation: [
                { type: "p", text: "Spanish has more pronouns than English because it distinguishes formal/informal 'you' and marks gender in the plural." },
                { type: "example", es: "yo / tú", en: "I / you (informal)" },
                { type: "example", es: "él / ella / usted", en: "he / she / you (formal)" },
                { type: "example", es: "nosotros / nosotras", en: "we (masc. / fem.)" },
                { type: "example", es: "vosotros / ustedes", en: "you all (Spain / Latin America)" },
                { type: "example", es: "ellos / ellas", en: "they (masc. / fem.)" },
                { type: "p", text: "Use tú with friends and family, usted to be polite or with strangers. In Latin America 'ustedes' is the only plural 'you'; Spain also uses 'vosotros'." }
            ],
            exercises: [
                { type: "mc", prompt: "Which pronoun means 'I'?", options: ["tú", "yo", "él", "usted"], answer: 1 },
                { type: "mc", prompt: "Which is the formal 'you' (singular)?", options: ["tú", "usted", "vosotros", "ellos"], answer: 1 },
                { type: "type", prompt: "Type the informal Spanish for 'you' (singular).", answer: "tú", accept: ["tu", "tú"] },
                { type: "trueFalse", claim: "nosotras is the feminine form of 'we'.", answer: true },
                { type: "mc", prompt: "In Latin America, which word means 'you all'?", options: ["vosotros", "ustedes", "nosotros", "ellas"], answer: 1 },
                { type: "trueFalse", claim: "Spanish uses tú for polite / formal situations.", answer: false }
            ]
        },
        {
            id: "spa-03",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "The Verb ser (to be) - Present",
            explanation: [
                { type: "p", text: "Spanish has two verbs for 'to be'. The first, ser, is for identity, origin, professions and permanent characteristics - who or what something is." },
                { type: "example", es: "soy, eres, es", en: "I am, you are, he/she is" },
                { type: "example", es: "somos, sois, son", en: "we are, you all are, they are" },
                { type: "example", es: "Soy estudiante.", en: "I am a student." },
                { type: "example", es: "Ella es española.", en: "She is Spanish." },
                { type: "p", text: "ser is irregular, so it's worth memorizing: soy / eres / es / somos / sois / son." }
            ],
            exercises: [
                { type: "mc", prompt: "What is ser used for?", options: ["location", "identity and permanent traits", "temporary feelings", "the weather"], answer: 1 },
                { type: "mc", prompt: "Which form means 'I am'?", options: ["soy", "eres", "es", "son"], answer: 0 },
                { type: "type", prompt: "Type the ser form for 'he/she is'.", answer: "es", accept: ["es"] },
                { type: "trueFalse", claim: "'Soy estudiante' means 'I am a student'.", answer: true },
                { type: "mc", prompt: "How do you say 'we are'?", options: ["son", "sois", "somos", "es"], answer: 2 },
                { type: "trueFalse", claim: "ser is a regular verb.", answer: false }
            ]
        },
        {
            id: "spa-04",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "The Verb estar (to be) & ser vs estar",
            explanation: [
                { type: "p", text: "The second 'to be' is estar, used for location and for temporary states or feelings - where something is, or how it is right now." },
                { type: "example", es: "estoy, estás, está", en: "I am, you are, he/she is" },
                { type: "example", es: "estamos, estáis, están", en: "we are, you all are, they are" },
                { type: "example", es: "Estoy cansado.", en: "I am tired. (a state)" },
                { type: "example", es: "La casa está aquí.", en: "The house is here. (location)" },
                { type: "p", text: "Rule of thumb: ser = identity/permanent (Soy alto), estar = location/temporary (Estoy bien). 'Soy feliz' vs 'Estoy feliz' both exist but shade differently." }
            ],
            exercises: [
                { type: "mc", prompt: "What is estar used for?", options: ["identity and origin", "location and temporary states", "professions", "nationality"], answer: 1 },
                { type: "mc", prompt: "Which form means 'I am' (estar)?", options: ["estoy", "estás", "está", "están"], answer: 0 },
                { type: "type", prompt: "Type the estar form for 'he/she is'.", answer: "está", accept: ["esta", "está"] },
                { type: "mc", prompt: "Which verb for 'The house is here'?", options: ["ser", "estar", "tener", "haber"], answer: 1 },
                { type: "trueFalse", claim: "You use ser for location (where something is).", answer: false },
                { type: "trueFalse", claim: "'Estoy cansado' (I'm tired) uses estar because it's a temporary state.", answer: true }
            ]
        },
        {
            id: "spa-05",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "The Verb tener (to have) - Present",
            explanation: [
                { type: "p", text: "tener means 'to have'. It's irregular: tengo / tienes / tiene / tenemos / tenéis / tienen." },
                { type: "example", es: "Tengo un hermano.", en: "I have a brother." },
                { type: "example", es: "¿Tienes tiempo?", en: "Do you have time?" },
                { type: "p", text: "Spanish also uses tener where English uses 'to be' - for age, hunger, thirst: 'tener ... años', 'tener hambre', 'tener sed'." },
                { type: "example", es: "Tengo veinte años.", en: "I am twenty years old. (lit. I have 20 years)" },
                { type: "example", es: "Tengo hambre.", en: "I am hungry. (lit. I have hunger)" }
            ],
            exercises: [
                { type: "mc", prompt: "What does tener mean?", options: ["to be", "to have", "to go", "to want"], answer: 1 },
                { type: "type", prompt: "Type the tener form for 'I have'.", answer: "tengo", accept: ["tengo"] },
                { type: "mc", prompt: "How do you say 'you have' (informal)?", options: ["tengo", "tienes", "tiene", "tienen"], answer: 1 },
                { type: "trueFalse", claim: "Spanish says 'Tengo veinte años' (I have 20 years) for 'I am 20'.", answer: true },
                { type: "mc", prompt: "How does Spanish say 'I am hungry'?", options: ["Soy hambre.", "Estoy hambre.", "Tengo hambre.", "Hay hambre."], answer: 2 },
                { type: "trueFalse", claim: "tener is a fully regular verb.", answer: false }
            ]
        },
        {
            id: "spa-06",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "Regular Verb Conjugation (Present)",
            explanation: [
                { type: "p", text: "Regular verbs fall into three groups by their ending: -ar, -er, -ir. You drop the ending and add a set of personal endings. Take hablar (to speak), comer (to eat), vivir (to live)." },
                { type: "example", es: "hablo, hablas, habla", en: "I / you / he-she speak(s)" },
                { type: "example", es: "hablamos, habláis, hablan", en: "we / you all / they speak" },
                { type: "example", es: "como, comes, come...", en: "eat: -er verbs" },
                { type: "example", es: "vivo, vives, vive...", en: "live: -ir verbs" },
                { type: "p", text: "Notice -er and -ir verbs share most endings; only the 'we' and 'you all' forms differ (comemos/coméis vs vivimos/vivís)." }
            ],
            exercises: [
                { type: "mc", prompt: "What are the three regular verb endings?", options: ["-ar, -er, -ir", "-o, -a, -e", "-ir, -or, -ur", "-are, -ere, -ire"], answer: 0 },
                { type: "type", prompt: "Type the 'I' form of hablar (to speak).", answer: "hablo", accept: ["hablo"] },
                { type: "mc", prompt: "How do you say 'we speak' (hablar)?", options: ["hablan", "habláis", "hablamos", "hablo"], answer: 2 },
                { type: "trueFalse", claim: "-er and -ir verbs share most of their present-tense endings.", answer: true },
                { type: "mc", prompt: "What is the 'you (informal)' form of comer (to eat)?", options: ["como", "comes", "come", "comen"], answer: 1 },
                { type: "trueFalse", claim: "To conjugate, you drop the -ar/-er/-ir ending and add a personal ending.", answer: true }
            ]
        },
        {
            id: "spa-07",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "Definite Articles (el, la, los, las)",
            explanation: [
                { type: "p", text: "'The' changes with gender and number. Masculine singular = el, feminine singular = la, masculine plural = los, feminine plural = las." },
                { type: "example", es: "el libro / la casa", en: "the book / the house" },
                { type: "example", es: "los libros / las casas", en: "the books / the houses" },
                { type: "p", text: "Two contractions are obligatory: a + el = al, and de + el = del." },
                { type: "example", es: "Voy al mercado.", en: "I go to the market. (a + el)" },
                { type: "example", es: "la puerta del coche", en: "the door of the car (de + el)" }
            ],
            exercises: [
                { type: "mc", prompt: "Which article is masculine singular 'the'?", options: ["la", "el", "los", "las"], answer: 1 },
                { type: "mc", prompt: "Which article goes with 'casas' (feminine plural)?", options: ["el", "la", "los", "las"], answer: 3 },
                { type: "type", prompt: "Type the article for 'la' + 'casa' plural: ___ casas.", answer: "las", accept: ["las"] },
                { type: "trueFalse", claim: "a + el contracts to 'al'.", answer: true },
                { type: "mc", prompt: "What is 'de + el'?", options: ["del", "dal", "de el", "des"], answer: 0 },
                { type: "trueFalse", claim: "The definite article never changes for gender or number.", answer: false }
            ]
        },
        {
            id: "spa-08",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "Indefinite Articles (un, una, unos, unas)",
            explanation: [
                { type: "p", text: "'A / an' is un (masculine) or una (feminine). In the plural, unos / unas mean 'some / a few'." },
                { type: "example", es: "un libro / una casa", en: "a book / a house" },
                { type: "example", es: "unos libros / unas casas", en: "some books / some houses" },
                { type: "p", text: "The article must match the noun's gender, so it's a handy clue: un problema (masc.), una mano (fem.)." },
                { type: "example", es: "Quiero un café.", en: "I want a coffee." }
            ],
            exercises: [
                { type: "mc", prompt: "Which indefinite article is feminine singular?", options: ["un", "una", "unos", "unas"], answer: 1 },
                { type: "mc", prompt: "What do unos / unas mean?", options: ["the", "a / an", "some / a few", "no"], answer: 2 },
                { type: "type", prompt: "Type the indefinite article for 'un' + a feminine noun: ___ casa.", answer: "una", accept: ["una"] },
                { type: "trueFalse", claim: "The indefinite article agrees with the noun's gender.", answer: true },
                { type: "mc", prompt: "How do you say 'a book'? (libro = masc.)", options: ["una libro", "un libro", "unos libro", "el libro"], answer: 1 },
                { type: "trueFalse", claim: "'unas casas' means 'some houses'.", answer: true }
            ]
        },
        {
            id: "spa-09",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "Possessive Adjectives",
            explanation: [
                { type: "p", text: "Possessives agree with the thing owned, not the owner. The short forms are mi, tu, su, nuestro, vuestro, su." },
                { type: "example", es: "mi libro / mis libros", en: "my book / my books" },
                { type: "example", es: "tu casa / su coche", en: "your house / his-her-their car" },
                { type: "example", es: "nuestra familia", en: "our family" },
                { type: "p", text: "mi/tu/su add -s for plural (mis, tus, sus). Only nuestro and vuestro also change for gender: nuestro/nuestra, nuestros/nuestras." }
            ],
            exercises: [
                { type: "mc", prompt: "Possessives agree with...?", options: ["the owner", "the thing owned", "the verb", "nothing"], answer: 1 },
                { type: "type", prompt: "Type the Spanish for 'my' (singular).", answer: "mi", accept: ["mi"] },
                { type: "mc", prompt: "How do you say 'my books'?", options: ["mi libros", "mis libros", "mío libros", "mis libro"], answer: 1 },
                { type: "trueFalse", claim: "'su' can mean his, her or their.", answer: true },
                { type: "mc", prompt: "Which possessive also changes for gender?", options: ["mi", "tu", "nuestro", "su"], answer: 2 },
                { type: "trueFalse", claim: "'nuestra familia' means 'our family'.", answer: true }
            ]
        },
        {
            id: "spa-10",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "Negation with no",
            explanation: [
                { type: "p", text: "To make a sentence negative, just put no directly before the verb. Nothing else changes." },
                { type: "example", es: "Hablo español.", en: "I speak Spanish." },
                { type: "example", es: "No hablo español.", en: "I don't speak Spanish." },
                { type: "p", text: "Spanish freely uses double negatives, and they stay negative: No tengo nada = 'I don't have anything'." },
                { type: "example", es: "No hay nadie.", en: "There's nobody." }
            ],
            exercises: [
                { type: "mc", prompt: "Where does 'no' go to make a sentence negative?", options: ["at the end", "directly before the verb", "after the verb", "before the subject only"], answer: 1 },
                { type: "type", prompt: "Type the word that makes a Spanish verb negative.", answer: "no", accept: ["no"] },
                { type: "mc", prompt: "How do you say 'I don't speak Spanish'?", options: ["Hablo no español.", "No hablo español.", "Hablo español no.", "No español hablo."], answer: 1 },
                { type: "trueFalse", claim: "'No tengo nada' means 'I don't have anything'.", answer: true },
                { type: "mc", prompt: "Spanish double negatives (no ... nada) are...?", options: ["forbidden", "normal and stay negative", "positive", "questions"], answer: 1 },
                { type: "trueFalse", claim: "You must change the verb form to make a sentence negative.", answer: false }
            ]
        },
        {
            id: "spa-11",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "Yes/No Questions",
            explanation: [
                { type: "p", text: "The easiest yes/no question is a statement said with rising intonation, wrapped in ¿ ... ?. You can also invert the verb and subject." },
                { type: "example", es: "¿Hablas español?", en: "Do you speak Spanish?" },
                { type: "example", es: "¿Es usted profesor?", en: "Are you a teacher? (verb before subject)" },
                { type: "p", text: "A tag like ¿verdad? or ¿no? at the end asks for confirmation, like 'right?'." },
                { type: "example", es: "Eres italiano, ¿verdad?", en: "You're Italian, right?" }
            ],
            exercises: [
                { type: "mc", prompt: "What is the simplest way to form a yes/no question?", options: ["add -ar", "use rising intonation with ¿ ... ?", "drop the verb", "add 'no'"], answer: 1 },
                { type: "trueFalse", claim: "A Spanish question opens with ¿ and closes with ?.", answer: true },
                { type: "type", prompt: "Type the tag that means 'right?' (asking for confirmation).", answer: "verdad", accept: ["verdad", "¿verdad?"] },
                { type: "mc", prompt: "How do you ask 'Do you speak Spanish?' (informal)", options: ["¿Hablas español?", "Hablas español.", "¿No hablas?", "¿Español?"], answer: 0 },
                { type: "trueFalse", claim: "In questions you may put the verb before the subject.", answer: true },
                { type: "mc", prompt: "Which is a confirmation tag?", options: ["¿verdad?", "¿qué?", "¿dónde?", "¿cuánto?"], answer: 0 }
            ]
        },
        {
            id: "spa-12",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "Question Words",
            explanation: [
                { type: "p", text: "Information questions start with a question word, which always carries a written accent." },
                { type: "example", es: "qué / quién", en: "what / who" },
                { type: "example", es: "dónde / cuándo", en: "where / when" },
                { type: "example", es: "por qué / cómo", en: "why / how" },
                { type: "example", es: "cuánto / cuál", en: "how much / which" },
                { type: "example", es: "¿Dónde está el baño?", en: "Where is the bathroom?" }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'where'?", options: ["qué", "quién", "dónde", "cuándo"], answer: 2 },
                { type: "mc", prompt: "Which word means 'who'?", options: ["quién", "qué", "cómo", "cuánto"], answer: 0 },
                { type: "type", prompt: "Type the Spanish question word for 'what'.", answer: "qué", accept: ["que", "qué"] },
                { type: "trueFalse", claim: "Question words carry a written accent (qué, dónde...).", answer: true },
                { type: "mc", prompt: "How do you say 'why'?", options: ["cómo", "cuándo", "por qué", "cuál"], answer: 2 },
                { type: "trueFalse", claim: "'cómo' means 'how'.", answer: true }
            ]
        },

        // ── Module 2: Numbers ────────────────────────────────────────────
        {
            id: "spa-13",
            moduleId: "numbers",
            moduleTitle: "Numbers",
            title: "Numbers 0-10",
            explanation: [
                { type: "p", text: "The first numbers to know by heart." },
                { type: "example", es: "cero, uno, dos, tres", en: "0, 1, 2, 3" },
                { type: "example", es: "cuatro, cinco, seis", en: "4, 5, 6" },
                { type: "example", es: "siete, ocho, nueve, diez", en: "7, 8, 9, 10" },
                { type: "p", text: "'uno' shortens to 'un' before a masculine noun: un libro (one book), una casa (one house)." }
            ],
            exercises: [
                { type: "mc", prompt: "What is 'tres'?", options: ["2", "3", "4", "5"], answer: 1 },
                { type: "type", prompt: "Type the Spanish for the number 5.", answer: "cinco", accept: ["cinco"] },
                { type: "mc", prompt: "Which word is 8?", options: ["seis", "siete", "ocho", "nueve"], answer: 2 },
                { type: "trueFalse", claim: "'diez' means 10.", answer: true },
                { type: "mc", prompt: "'uno' becomes ___ before a masculine noun.", options: ["una", "un", "uno", "unos"], answer: 1 },
                { type: "type", prompt: "Type the Spanish for the number 1.", answer: "uno", accept: ["uno"] }
            ]
        },
        {
            id: "spa-14",
            moduleId: "numbers",
            moduleTitle: "Numbers",
            title: "Numbers 11-20",
            explanation: [
                { type: "p", text: "11 to 15 are single words; 16 to 19 are 'ten-and-...' written as one word (dieci...)." },
                { type: "example", es: "once, doce, trece", en: "11, 12, 13" },
                { type: "example", es: "catorce, quince", en: "14, 15" },
                { type: "example", es: "dieciséis, diecisiete", en: "16, 17" },
                { type: "example", es: "dieciocho, diecinueve, veinte", en: "18, 19, 20" }
            ],
            exercises: [
                { type: "mc", prompt: "What is 'doce'?", options: ["11", "12", "13", "14"], answer: 1 },
                { type: "type", prompt: "Type the Spanish for the number 15.", answer: "quince", accept: ["quince"] },
                { type: "mc", prompt: "Which word is 16?", options: ["dieciséis", "diecisiete", "dieciocho", "diecinueve"], answer: 0 },
                { type: "trueFalse", claim: "'veinte' means 20.", answer: true },
                { type: "mc", prompt: "What is 'catorce'?", options: ["13", "14", "15", "16"], answer: 1 },
                { type: "type", prompt: "Type the Spanish for the number 11.", answer: "once", accept: ["once"] }
            ]
        },
        {
            id: "spa-15",
            moduleId: "numbers",
            moduleTitle: "Numbers",
            title: "Tens: 30-100",
            explanation: [
                { type: "p", text: "The round tens each have their own word, most ending in -enta." },
                { type: "example", es: "treinta, cuarenta", en: "30, 40" },
                { type: "example", es: "cincuenta, sesenta", en: "50, 60" },
                { type: "example", es: "setenta, ochenta", en: "70, 80" },
                { type: "example", es: "noventa, cien", en: "90, 100" },
                { type: "p", text: "Note: 20 is 'veinte' (irregular), and 100 is 'cien' on its own." }
            ],
            exercises: [
                { type: "mc", prompt: "What is 'cincuenta'?", options: ["40", "50", "60", "70"], answer: 1 },
                { type: "type", prompt: "Type the Spanish for the number 30.", answer: "treinta", accept: ["treinta"] },
                { type: "mc", prompt: "Which word is 80?", options: ["sesenta", "setenta", "ochenta", "noventa"], answer: 2 },
                { type: "trueFalse", claim: "'cien' means 100.", answer: true },
                { type: "mc", prompt: "What is 'noventa'?", options: ["70", "80", "90", "100"], answer: 2 },
                { type: "type", prompt: "Type the Spanish for the number 40.", answer: "cuarenta", accept: ["cuarenta"] }
            ]
        },
        {
            id: "spa-16",
            moduleId: "numbers",
            moduleTitle: "Numbers",
            title: "Compound Numbers 21-99",
            explanation: [
                { type: "p", text: "The 21-29 group is written as one word (veinti...): veintiuno, veintidós, veintitrés. From 31 on, you join the ten and the unit with 'y' (and)." },
                { type: "example", es: "veintiuno, veintidós", en: "21, 22" },
                { type: "example", es: "treinta y uno", en: "31 (thirty and one)" },
                { type: "example", es: "cuarenta y cinco", en: "45" },
                { type: "example", es: "noventa y nueve", en: "99" }
            ],
            exercises: [
                { type: "mc", prompt: "How is 31 written?", options: ["treintaiuno", "treinta y uno", "treinta uno", "treintuno"], answer: 1 },
                { type: "mc", prompt: "How is 21 written?", options: ["veinte y uno", "veintiuno", "veinti uno", "dos uno"], answer: 1 },
                { type: "type", prompt: "Type the Spanish for 45 (three words).", answer: "cuarenta y cinco", accept: ["cuarentaycinco", "cuarenta y cinco"] },
                { type: "trueFalse", claim: "From 31 on, the ten and the unit are joined with 'y'.", answer: true },
                { type: "mc", prompt: "What is 'noventa y nueve'?", options: ["89", "90", "99", "79"], answer: 2 },
                { type: "trueFalse", claim: "The 21-29 numbers are written as a single word (veintidós...).", answer: true }
            ]
        },
        {
            id: "spa-17",
            moduleId: "numbers",
            moduleTitle: "Numbers",
            title: "Numbers 100-1000",
            explanation: [
                { type: "p", text: "100 alone is 'cien', but before another number it becomes 'ciento' (ciento uno = 101). The hundreds agree in gender: doscientos / doscientas." },
                { type: "example", es: "cien / ciento uno", en: "100 / 101" },
                { type: "example", es: "doscientos, trescientos", en: "200, 300" },
                { type: "example", es: "quinientos", en: "500 (irregular!)" },
                { type: "example", es: "mil", en: "1,000" },
                { type: "p", text: "Watch the irregular ones: 500 = quinientos, 700 = setecientos, 900 = novecientos. 1000 is simply 'mil'." }
            ],
            exercises: [
                { type: "mc", prompt: "What is 100 before another number?", options: ["cien", "ciento", "mil", "cientos"], answer: 1 },
                { type: "mc", prompt: "What is 'mil'?", options: ["100", "500", "1,000", "10,000"], answer: 2 },
                { type: "type", prompt: "Type the Spanish for 200.", answer: "doscientos", accept: ["doscientos"] },
                { type: "trueFalse", claim: "500 is 'quinientos' (irregular).", answer: true },
                { type: "mc", prompt: "What is 'ciento uno'?", options: ["100", "101", "110", "111"], answer: 1 },
                { type: "trueFalse", claim: "The hundreds change for gender (doscientos / doscientas).", answer: true }
            ]
        },
        {
            id: "spa-18",
            moduleId: "numbers",
            moduleTitle: "Numbers",
            title: "Talking about Prices and Quantities",
            explanation: [
                { type: "p", text: "To ask a price, use ¿Cuánto cuesta? (singular) or ¿Cuánto cuestan? (plural). The currency in Spain is the euro." },
                { type: "example", es: "¿Cuánto cuesta?", en: "How much is it?" },
                { type: "example", es: "Cuesta cinco euros.", en: "It costs five euros." },
                { type: "example", es: "¿Cuántos años tienes?", en: "How old are you?" },
                { type: "p", text: "cuánto agrees with the noun: ¿cuánto dinero? (how much money), ¿cuántas casas? (how many houses)." }
            ],
            exercises: [
                { type: "mc", prompt: "How do you ask 'How much is it?'", options: ["¿Cuándo cuesta?", "¿Cuánto cuesta?", "¿Cómo cuesta?", "¿Dónde cuesta?"], answer: 1 },
                { type: "type", prompt: "Type the Spanish word for 'how much'.", answer: "cuánto", accept: ["cuanto", "cuánto"] },
                { type: "mc", prompt: "What is the currency of Spain?", options: ["peso", "euro", "dólar", "libra"], answer: 1 },
                { type: "trueFalse", claim: "'cuánto' agrees with the noun (cuántos, cuántas).", answer: true },
                { type: "mc", prompt: "How do you ask 'How old are you?'", options: ["¿Cuántos años tienes?", "¿Cuánto cuestas?", "¿Qué años eres?", "¿Cómo tienes años?"], answer: 0 },
                { type: "trueFalse", claim: "For several items you'd say '¿Cuánto cuestan?'.", answer: true }
            ]
        },

        // ── Module 3: Nouns & Articles ───────────────────────────────────
        {
            id: "spa-19",
            moduleId: "nouns",
            moduleTitle: "Nouns & Articles",
            title: "Noun Gender (masculine & feminine)",
            explanation: [
                { type: "p", text: "Every Spanish noun is masculine or feminine. As a rule of thumb, nouns ending in -o are masculine and those ending in -a are feminine." },
                { type: "example", es: "el libro (masc.)", en: "the book" },
                { type: "example", es: "la casa (fem.)", en: "the house" },
                { type: "example", es: "el coche / la mesa", en: "the car / the table" },
                { type: "p", text: "There are exceptions to memorize: el problema, el día, el mapa are masculine; la mano, la foto are feminine." }
            ],
            exercises: [
                { type: "mc", prompt: "Nouns ending in -o are usually...?", options: ["masculine", "feminine", "plural", "verbs"], answer: 0 },
                { type: "mc", prompt: "Which article goes with 'casa'?", options: ["el", "la", "los", "un"], answer: 1 },
                { type: "type", prompt: "Type the definite article for 'libro' (masculine).", answer: "el", accept: ["el"] },
                { type: "trueFalse", claim: "'el problema' is masculine even though it ends in -a.", answer: true },
                { type: "mc", prompt: "Which noun is feminine?", options: ["el libro", "el coche", "la mesa", "el día"], answer: 2 },
                { type: "trueFalse", claim: "Every Spanish noun has a gender.", answer: true }
            ]
        },
        {
            id: "spa-20",
            moduleId: "nouns",
            moduleTitle: "Nouns & Articles",
            title: "Nouns Ending in -e and Other Letters",
            explanation: [
                { type: "p", text: "Nouns that don't end in -o or -a give fewer clues, so you learn their gender with the article. Some endings are reliable, though." },
                { type: "example", es: "la canción, la ciudad", en: "the song, the city (-ción, -dad → fem.)" },
                { type: "example", es: "el amor, el color", en: "love, colour (-or → often masc.)" },
                { type: "example", es: "la noche / el coche", en: "the night (fem) / the car (masc)" },
                { type: "p", text: "Nouns in -ción, -sión, -dad, -tad are feminine. Nouns in -e can be either, so always learn them with el or la." }
            ],
            exercises: [
                { type: "mc", prompt: "Nouns ending in -ción are usually...?", options: ["masculine", "feminine", "plural", "verbs"], answer: 1 },
                { type: "mc", prompt: "Which is feminine?", options: ["el color", "la ciudad", "el amor", "el coche"], answer: 1 },
                { type: "type", prompt: "Type the article for 'noche' (feminine).", answer: "la", accept: ["la"] },
                { type: "trueFalse", claim: "Nouns ending in -dad are feminine.", answer: true },
                { type: "mc", prompt: "For a noun ending in -e, the best strategy is to...?", options: ["assume masculine", "assume feminine", "learn it with its article", "add -s"], answer: 2 },
                { type: "trueFalse", claim: "'la canción' is feminine.", answer: true }
            ]
        },
        {
            id: "spa-21",
            moduleId: "nouns",
            moduleTitle: "Nouns & Articles",
            title: "Making Nouns Plural",
            explanation: [
                { type: "p", text: "To make a noun plural: add -s after a vowel, and -es after a consonant. The article becomes plural too (el→los, la→las)." },
                { type: "example", es: "libro → libros", en: "book → books" },
                { type: "example", es: "casa → casas", en: "house → houses" },
                { type: "example", es: "ciudad → ciudades", en: "city → cities (consonant → -es)" },
                { type: "example", es: "el coche → los coches", en: "the car → the cars" }
            ],
            exercises: [
                { type: "mc", prompt: "How do you pluralize a noun ending in a vowel?", options: ["add -es", "add -s", "change to -a", "no change"], answer: 1 },
                { type: "mc", prompt: "How do you pluralize a noun ending in a consonant?", options: ["add -s", "add -es", "add -os", "no change"], answer: 1 },
                { type: "type", prompt: "Type the plural of 'casa'.", answer: "casas", accept: ["casas"] },
                { type: "trueFalse", claim: "The plural of 'ciudad' is 'ciudades'.", answer: true },
                { type: "mc", prompt: "What is the plural article for 'el'?", options: ["la", "los", "las", "unos"], answer: 1 },
                { type: "trueFalse", claim: "The article stays singular even when the noun is plural.", answer: false }
            ]
        },
        {
            id: "spa-22",
            moduleId: "nouns",
            moduleTitle: "Nouns & Articles",
            title: "Direct Object Pronouns",
            explanation: [
                { type: "p", text: "Direct object pronouns replace the object noun and go before the conjugated verb: me, te, lo/la, nos, os, los/las." },
                { type: "example", es: "¿Ves el libro? Sí, lo veo.", en: "Do you see the book? Yes, I see it." },
                { type: "example", es: "La compro.", en: "I buy it. (la = a feminine thing)" },
                { type: "example", es: "Te quiero.", en: "I love you." },
                { type: "p", text: "lo/la/los/las agree with the gender and number of the thing replaced. They sit before the verb, unlike English 'it'." }
            ],
            exercises: [
                { type: "mc", prompt: "Where do direct object pronouns go?", options: ["at the end", "before the conjugated verb", "before the subject", "they don't move"], answer: 1 },
                { type: "mc", prompt: "Which pronoun replaces a masculine singular object?", options: ["la", "lo", "las", "los"], answer: 1 },
                { type: "type", prompt: "Type the object pronoun for 'you' (informal), as in 'Te quiero'.", answer: "te", accept: ["te"] },
                { type: "trueFalse", claim: "'La compro' means 'I buy it' (a feminine thing).", answer: true },
                { type: "mc", prompt: "How do you say 'Yes, I see it' about a book (el libro)?", options: ["Sí, la veo.", "Sí, lo veo.", "Sí, veo lo.", "Sí, le veo."], answer: 1 },
                { type: "trueFalse", claim: "lo/la agree in gender with the thing they replace.", answer: true }
            ]
        },
        {
            id: "spa-23",
            moduleId: "nouns",
            moduleTitle: "Nouns & Articles",
            title: "hay (there is / there are)",
            explanation: [
                { type: "p", text: "hay means both 'there is' and 'there are' - it never changes for number. It's the impersonal form of the verb haber." },
                { type: "example", es: "Hay un libro en la mesa.", en: "There is a book on the table." },
                { type: "example", es: "Hay dos libros.", en: "There are two books." },
                { type: "example", es: "¿Hay un baño aquí?", en: "Is there a bathroom here?" },
                { type: "p", text: "Don't confuse hay (existence) with está (location of a known thing): 'Hay un banco' vs 'El banco está allí'." }
            ],
            exercises: [
                { type: "mc", prompt: "What does 'hay' mean?", options: ["there is / there are", "it is", "I have", "he goes"], answer: 0 },
                { type: "trueFalse", claim: "'hay' changes form for plural (singular vs plural).", answer: false },
                { type: "type", prompt: "Type the Spanish word for 'there is / there are'.", answer: "hay", accept: ["hay"] },
                { type: "mc", prompt: "How do you say 'There are two books'?", options: ["Están dos libros.", "Hay dos libros.", "Son dos libros.", "Tiene dos libros."], answer: 1 },
                { type: "mc", prompt: "Which verb is 'hay' the impersonal form of?", options: ["haber", "tener", "estar", "ser"], answer: 0 },
                { type: "trueFalse", claim: "You use 'hay' to say something exists, and 'está' for the location of a known thing.", answer: true }
            ]
        },

        // ── Module 4: Adjectives ─────────────────────────────────────────
        {
            id: "spa-24",
            moduleId: "adjectives",
            moduleTitle: "Adjectives",
            title: "Basic Adjectives & Agreement",
            explanation: [
                { type: "p", text: "Adjectives agree with the noun in gender and number, and usually come after it. An -o adjective changes to -a for feminine and adds -s for plural." },
                { type: "example", es: "un coche rojo", en: "a red car (masc.)" },
                { type: "example", es: "una casa roja", en: "a red house (fem.)" },
                { type: "example", es: "unos coches rojos", en: "some red cars" },
                { type: "example", es: "unas casas rojas", en: "some red houses" }
            ],
            exercises: [
                { type: "mc", prompt: "Where do most Spanish adjectives go?", options: ["before the noun", "after the noun", "before the verb", "at the end"], answer: 1 },
                { type: "mc", prompt: "The feminine of 'rojo' is...?", options: ["rojo", "roja", "rojos", "roje"], answer: 1 },
                { type: "type", prompt: "Type the plural masculine of 'rojo'.", answer: "rojos", accept: ["rojos"] },
                { type: "trueFalse", claim: "Adjectives agree with the noun in gender and number.", answer: true },
                { type: "mc", prompt: "How do you say 'a red house'? (casa = fem.)", options: ["una casa rojo", "una casa roja", "un casa rojo", "una roja casa"], answer: 1 },
                { type: "trueFalse", claim: "An -o adjective keeps -o for a feminine noun.", answer: false }
            ]
        },
        {
            id: "spa-25",
            moduleId: "adjectives",
            moduleTitle: "Adjectives",
            title: "Adjectives Ending in -e or a Consonant",
            explanation: [
                { type: "p", text: "Adjectives ending in -e or a consonant don't change for gender - one form fits masculine and feminine. They still add -s / -es for plural." },
                { type: "example", es: "un coche grande / una casa grande", en: "a big car / a big house" },
                { type: "example", es: "un libro azul / una mesa azul", en: "a blue book / a blue table" },
                { type: "example", es: "coches grandes, casas azules", en: "big cars, blue tables (plural)" },
                { type: "p", text: "So 'grande', 'azul', 'fácil', 'interesante' are the same for a man or a woman - only the number changes." }
            ],
            exercises: [
                { type: "mc", prompt: "Adjectives ending in -e change for...?", options: ["gender only", "number only", "gender and number", "nothing"], answer: 1 },
                { type: "type", prompt: "Type the feminine singular of 'grande'.", answer: "grande", accept: ["grande"] },
                { type: "mc", prompt: "What is the plural of 'azul'?", options: ["azules", "azulos", "azulas", "azul"], answer: 0 },
                { type: "trueFalse", claim: "'grande' is the same for masculine and feminine nouns.", answer: true },
                { type: "mc", prompt: "Which adjective does NOT change for gender?", options: ["rojo", "alto", "azul", "bonito"], answer: 2 },
                { type: "trueFalse", claim: "Consonant-ending adjectives add -es for the plural.", answer: true }
            ]
        },
        {
            id: "spa-26",
            moduleId: "adjectives",
            moduleTitle: "Adjectives",
            title: "Comparatives and Superlatives",
            explanation: [
                { type: "p", text: "Compare with más ... que (more ... than), menos ... que (less ... than), and tan ... como (as ... as)." },
                { type: "example", es: "Es más alto que yo.", en: "He is taller than me." },
                { type: "example", es: "Es tan grande como tu casa.", en: "It's as big as your house." },
                { type: "p", text: "The superlative uses the article: el/la más ... (the most). A few are irregular: mejor (better), peor (worse), mayor, menor." },
                { type: "example", es: "el libro más interesante", en: "the most interesting book" },
                { type: "example", es: "Es mejor que esto.", en: "It's better than this." }
            ],
            exercises: [
                { type: "mc", prompt: "How do you say 'more ... than'?", options: ["tan ... como", "más ... que", "menos ... como", "el ... más"], answer: 1 },
                { type: "mc", prompt: "What does 'tan ... como' mean?", options: ["more ... than", "less ... than", "as ... as", "the most"], answer: 2 },
                { type: "type", prompt: "Type the irregular comparative meaning 'better'.", answer: "mejor", accept: ["mejor"] },
                { type: "trueFalse", claim: "'el más alto' means 'the tallest'.", answer: true },
                { type: "mc", prompt: "How do you say 'He is taller than me'?", options: ["Es tan alto como yo.", "Es más alto que yo.", "Es menos alto que yo.", "Es el más alto yo."], answer: 1 },
                { type: "trueFalse", claim: "'peor' means 'worse'.", answer: true }
            ]
        },
        {
            id: "spa-27",
            moduleId: "adjectives",
            moduleTitle: "Adjectives",
            title: "Colors",
            explanation: [
                { type: "p", text: "Colours are adjectives, so they agree with the noun. Those ending in -o change (rojo/roja); those ending in -e or a consonant don't (verde, azul, gris)." },
                { type: "example", es: "rojo, amarillo, blanco, negro", en: "red, yellow, white, black" },
                { type: "example", es: "verde, azul, gris", en: "green, blue, grey (no gender change)" },
                { type: "example", es: "un coche negro / una casa blanca", en: "a black car / a white house" },
                { type: "example", es: "flores rojas", en: "red flowers" }
            ],
            exercises: [
                { type: "mc", prompt: "What does 'rojo' mean?", options: ["blue", "red", "green", "black"], answer: 1 },
                { type: "mc", prompt: "What does 'azul' mean?", options: ["yellow", "white", "blue", "grey"], answer: 2 },
                { type: "type", prompt: "Type the Spanish for 'white' (masculine).", answer: "blanco", accept: ["blanco"] },
                { type: "trueFalse", claim: "'verde' and 'azul' don't change for gender.", answer: true },
                { type: "mc", prompt: "How do you say 'a white house'? (casa = fem.)", options: ["una casa blanco", "una casa blanca", "un casa blanca", "una blanca casa"], answer: 1 },
                { type: "trueFalse", claim: "'negro' means 'black'.", answer: true }
            ]
        },
        {
            id: "spa-28",
            moduleId: "adjectives",
            moduleTitle: "Adjectives",
            title: "Describing People and Things",
            explanation: [
                { type: "p", text: "To describe someone's traits, use ser + adjective. muy means 'very' and goes before the adjective." },
                { type: "example", es: "Es alto y simpático.", en: "He is tall and nice." },
                { type: "example", es: "Es muy inteligente.", en: "She is very intelligent." },
                { type: "example", es: "María es baja.", en: "María is short." },
                { type: "p", text: "Common opposites: alto/bajo (tall/short), grande/pequeño (big/small), joven/viejo (young/old), bueno/malo (good/bad)." }
            ],
            exercises: [
                { type: "mc", prompt: "Which verb describes traits (tall, nice)?", options: ["estar", "ser", "tener", "haber"], answer: 1 },
                { type: "mc", prompt: "What does 'muy' mean?", options: ["more", "very", "less", "much"], answer: 1 },
                { type: "type", prompt: "Type the Spanish for 'tall' (masculine).", answer: "alto", accept: ["alto"] },
                { type: "trueFalse", claim: "The opposite of 'grande' is 'pequeño'.", answer: true },
                { type: "mc", prompt: "How do you say 'She is very intelligent'?", options: ["Está muy inteligente.", "Es muy inteligente.", "Tiene muy inteligente.", "Muy es inteligente."], answer: 1 },
                { type: "trueFalse", claim: "'simpático' means 'nice / friendly'.", answer: true }
            ]
        },

        // ── Module 5: Verbs ──────────────────────────────────────────────
        {
            id: "spa-29",
            moduleId: "verbs",
            moduleTitle: "Verbs",
            title: "Common Irregular Verbs (Present)",
            explanation: [
                { type: "p", text: "Some very frequent verbs are irregular in the present. Worth memorizing: ir (to go), hacer (to do/make), querer (to want), poder (can)." },
                { type: "example", es: "ir: voy, vas, va, vamos, van", en: "to go" },
                { type: "example", es: "hacer: hago, haces, hace...", en: "to do / make" },
                { type: "example", es: "querer: quiero, quieres, quiere...", en: "to want" },
                { type: "example", es: "poder: puedo, puedes, puede...", en: "can / to be able" },
                { type: "p", text: "Many, like querer→quiero and poder→puedo, are 'stem-changing' (e→ie, o→ue) in the stressed forms." }
            ],
            exercises: [
                { type: "mc", prompt: "What is the 'I' form of 'ir' (to go)?", options: ["vo", "voy", "vas", "va"], answer: 1 },
                { type: "type", prompt: "Type the 'I' form of 'hacer' (to do/make).", answer: "hago", accept: ["hago"] },
                { type: "mc", prompt: "What does 'quiero' mean?", options: ["I can", "I want", "I go", "I do"], answer: 1 },
                { type: "trueFalse", claim: "'puedo' means 'I can'.", answer: true },
                { type: "mc", prompt: "querer→quiero is an example of...?", options: ["a regular verb", "a stem-changing verb (e→ie)", "a plural", "an article"], answer: 1 },
                { type: "trueFalse", claim: "'vamos' means 'we go / let's go'.", answer: true }
            ]
        },
        {
            id: "spa-30",
            moduleId: "verbs",
            moduleTitle: "Verbs",
            title: "Modal Verbs (poder, querer, deber, tener que)",
            explanation: [
                { type: "p", text: "To express ability, desire and obligation, use these verbs followed by an infinitive (the plain -ar/-er/-ir form)." },
                { type: "example", es: "Quiero comer.", en: "I want to eat." },
                { type: "example", es: "¿Puedes ayudar?", en: "Can you help?" },
                { type: "example", es: "Debo estudiar.", en: "I must study." },
                { type: "example", es: "Tengo que trabajar.", en: "I have to work." },
                { type: "p", text: "'tener que + infinitive' = 'have to', and 'deber + infinitive' = 'must / should'. The second verb always stays in the infinitive." }
            ],
            exercises: [
                { type: "mc", prompt: "After a modal verb, the next verb is in the...?", options: ["past", "infinitive", "plural", "gerund"], answer: 1 },
                { type: "mc", prompt: "How do you say 'I want to eat'?", options: ["Quiero como.", "Quiero comer.", "Quiero comido.", "Como quiero."], answer: 1 },
                { type: "type", prompt: "Type the Spanish for 'I have to' (tener que): 'Tengo ___ trabajar'.", answer: "que", accept: ["que"] },
                { type: "trueFalse", claim: "'Debo estudiar' means 'I must study'.", answer: true },
                { type: "mc", prompt: "How do you ask 'Can you help?'", options: ["¿Quieres ayudar?", "¿Puedes ayudar?", "¿Debes ayudar?", "¿Tienes ayudar?"], answer: 1 },
                { type: "trueFalse", claim: "'tener que + infinitive' expresses obligation ('have to').", answer: true }
            ]
        },
        {
            id: "spa-31",
            moduleId: "verbs",
            moduleTitle: "Verbs",
            title: "The Pretérito Perfecto (haber + participle)",
            explanation: [
                { type: "p", text: "To say 'I have done' something, use the present of haber (he, has, ha, hemos, habéis, han) plus the past participle. The participle ends in -ado (-ar verbs) or -ido (-er/-ir verbs)." },
                { type: "example", es: "he, has, ha, hemos, han", en: "I/you/he/we/they have" },
                { type: "example", es: "He hablado con ella.", en: "I have spoken with her." },
                { type: "example", es: "¿Has comido?", en: "Have you eaten?" },
                { type: "p", text: "Unlike some languages, Spanish always uses haber - never a second auxiliary. A few participles are irregular: hecho (done), visto (seen), escrito (written)." }
            ],
            exercises: [
                { type: "mc", prompt: "Which auxiliary verb builds the pretérito perfecto?", options: ["tener", "ser", "haber", "estar"], answer: 2 },
                { type: "mc", prompt: "The participle of an -ar verb ends in...?", options: ["-ido", "-ado", "-endo", "-ando"], answer: 1 },
                { type: "type", prompt: "Type the haber form for 'I have' (as in 'I have spoken').", answer: "he", accept: ["he"] },
                { type: "trueFalse", claim: "Spanish uses only haber for the perfect tense, never a second auxiliary.", answer: true },
                { type: "mc", prompt: "How do you say 'Have you eaten?'", options: ["¿Has comido?", "¿Tienes comido?", "¿Eres comido?", "¿Estás comido?"], answer: 0 },
                { type: "trueFalse", claim: "The participle of 'hacer' is regular ('hacido').", answer: false }
            ]
        },
        {
            id: "spa-32",
            moduleId: "verbs",
            moduleTitle: "Verbs",
            title: "The Simple Preterite (pretérito indefinido)",
            explanation: [
                { type: "p", text: "The pretérito indefinido tells what happened at a finished point in the past. Regular endings: -ar verbs → -é, -aste, -ó...; -er/-ir verbs → -í, -iste, -ió..." },
                { type: "example", es: "hablé, hablaste, habló", en: "I / you / he-she spoke" },
                { type: "example", es: "comí, comiste, comió", en: "I / you / he-she ate" },
                { type: "example", es: "Ayer hablé con María.", en: "Yesterday I spoke with María." },
                { type: "p", text: "The 'I' and 'he/she' forms carry an accent (hablé, habló) - it changes the meaning, so don't skip it." }
            ],
            exercises: [
                { type: "mc", prompt: "The pretérito indefinido describes...?", options: ["ongoing habits", "a finished past action", "the future", "an order"], answer: 1 },
                { type: "type", prompt: "Type the 'I' preterite form of 'hablar' (I spoke).", answer: "hablé", accept: ["hable", "hablé"] },
                { type: "mc", prompt: "What is the 'he/she' preterite of 'comer'?", options: ["come", "comió", "comía", "comido"], answer: 1 },
                { type: "trueFalse", claim: "'Ayer hablé con María' means 'Yesterday I spoke with María'.", answer: true },
                { type: "mc", prompt: "The -ar 'I' preterite ending is...?", options: ["-í", "-é", "-ó", "-aste"], answer: 1 },
                { type: "trueFalse", claim: "The written accent on hablé / habló can change the meaning.", answer: true }
            ]
        },
        {
            id: "spa-33",
            moduleId: "verbs",
            moduleTitle: "Verbs",
            title: "Reflexive Verbs",
            explanation: [
                { type: "p", text: "Reflexive verbs describe actions done to oneself. They use a reflexive pronoun (me, te, se, nos, os, se) before the verb. Their infinitive ends in -se: llamarse, levantarse." },
                { type: "example", es: "Me llamo Ana.", en: "My name is Ana. (lit. I call myself Ana)" },
                { type: "example", es: "¿Cómo te llamas?", en: "What's your name?" },
                { type: "example", es: "Me levanto a las siete.", en: "I get up at seven." },
                { type: "p", text: "The pronoun matches the subject: yo → me, tú → te, él/ella → se. It normally sits right before the conjugated verb." }
            ],
            exercises: [
                { type: "mc", prompt: "What marks a reflexive verb in the infinitive?", options: ["ending in -ar", "ending in -se", "a written accent", "ending in -ado"], answer: 1 },
                { type: "mc", prompt: "Which reflexive pronoun goes with 'yo'?", options: ["te", "se", "me", "nos"], answer: 2 },
                { type: "type", prompt: "Type the phrase for 'My name is' (2 words): '___ ___ Ana'? Just the pronoun.", answer: "me", accept: ["me"] },
                { type: "trueFalse", claim: "'¿Cómo te llamas?' means 'What's your name?'.", answer: true },
                { type: "mc", prompt: "How do you say 'I get up at seven'?", options: ["Levanto a las siete.", "Me levanto a las siete.", "Se levanto a las siete.", "Te levanto a las siete."], answer: 1 },
                { type: "trueFalse", claim: "The reflexive pronoun must match the subject.", answer: true }
            ]
        },
        {
            id: "spa-34",
            moduleId: "verbs",
            moduleTitle: "Verbs",
            title: "The Future Tense",
            explanation: [
                { type: "p", text: "The easiest future is 'ir a + infinitive' (going to do): Voy a comer. There's also a simple future formed by adding endings to the whole infinitive." },
                { type: "example", es: "Voy a estudiar.", en: "I'm going to study." },
                { type: "example", es: "Vamos a comer.", en: "We're going to eat." },
                { type: "example", es: "hablaré, hablarás, hablará", en: "I / you / he-she will speak" },
                { type: "p", text: "The simple future endings (-é, -ás, -á, -emos, -éis, -án) attach to the full infinitive, so they're the same for all three verb groups." }
            ],
            exercises: [
                { type: "mc", prompt: "What is the easiest way to talk about the future?", options: ["ser a + infinitive", "ir a + infinitive", "tener + participle", "estar + gerund"], answer: 1 },
                { type: "type", prompt: "Type the 'I' form of 'ir': '___ a comer' (I'm going to eat).", answer: "voy", accept: ["voy"] },
                { type: "mc", prompt: "How do you say 'We're going to eat'?", options: ["Voy a comer.", "Vamos a comer.", "Van a comer.", "Vas a comer."], answer: 1 },
                { type: "trueFalse", claim: "The simple future endings attach to the full infinitive.", answer: true },
                { type: "mc", prompt: "What does 'hablaré' mean?", options: ["I spoke", "I speak", "I will speak", "I have spoken"], answer: 2 },
                { type: "trueFalse", claim: "'Voy a estudiar' means 'I'm going to study'.", answer: true }
            ]
        },

        // ── Module 6: Sentence Structure ─────────────────────────────────
        {
            id: "spa-35",
            moduleId: "syntax",
            moduleTitle: "Sentence Structure",
            title: "Basic Word Order (S-V-O)",
            explanation: [
                { type: "p", text: "The default Spanish order is Subject-Verb-Object, like English. But because verb endings and pronouns carry so much information, the order is more flexible than English." },
                { type: "example", es: "María come pan.", en: "María eats bread. (S-V-O)" },
                { type: "example", es: "Yo hablo español.", en: "I speak Spanish." },
                { type: "p", text: "You can move parts for emphasis: 'Pan come María' is understandable, though S-V-O is the neutral choice a beginner should use." },
                { type: "example", es: "El niño lee un libro.", en: "The boy reads a book." }
            ],
            exercises: [
                { type: "mc", prompt: "What is the default Spanish word order?", options: ["Verb-Subject-Object", "Subject-Verb-Object", "Object-Verb-Subject", "Subject-Object-Verb"], answer: 1 },
                { type: "trueFalse", claim: "Spanish word order is more flexible than English.", answer: true },
                { type: "type", prompt: "Type the Spanish verb in 'María ___ pan' (eats).", answer: "come", accept: ["come"] },
                { type: "mc", prompt: "Which sentence is neutral S-V-O for 'The boy reads a book'?", options: ["Un libro lee el niño.", "El niño lee un libro.", "Lee el niño un libro.", "El niño un libro lee."], answer: 1 },
                { type: "trueFalse", claim: "A beginner should stick to S-V-O as the neutral order.", answer: true },
                { type: "mc", prompt: "Why is Spanish order flexible?", options: ["it has no verbs", "verb endings and pronouns carry the information", "it has no nouns", "it uses no articles"], answer: 1 }
            ]
        },
        {
            id: "spa-36",
            moduleId: "syntax",
            moduleTitle: "Sentence Structure",
            title: "Dropping the Subject Pronoun",
            explanation: [
                { type: "p", text: "Because each verb ending already shows the person, Spanish usually drops the subject pronoun. 'Hablo' already means 'I speak' - you don't need 'yo'." },
                { type: "example", es: "Hablo español.", en: "I speak Spanish. (no 'yo')" },
                { type: "example", es: "¿Vives aquí?", en: "Do you live here?" },
                { type: "p", text: "You keep the pronoun only for emphasis or to avoid confusion: 'Yo hablo, tú escuchas' (I speak, you listen)." },
                { type: "example", es: "Ella trabaja, él estudia.", en: "She works, he studies. (contrast)" }
            ],
            exercises: [
                { type: "mc", prompt: "Why can Spanish drop the subject pronoun?", options: ["pronouns don't exist", "the verb ending shows the person", "it's forbidden to use them", "nouns replace them"], answer: 1 },
                { type: "trueFalse", claim: "'Hablo español' already means 'I speak Spanish' without 'yo'.", answer: true },
                { type: "type", prompt: "Type the verb that alone means 'I speak'.", answer: "hablo", accept: ["hablo"] },
                { type: "mc", prompt: "When do you keep the subject pronoun?", options: ["never", "always", "for emphasis or to avoid confusion", "only in questions"], answer: 2 },
                { type: "trueFalse", claim: "You must always include the subject pronoun in Spanish.", answer: false },
                { type: "mc", prompt: "'¿Vives aquí?' means...?", options: ["Do I live here?", "Do you live here?", "Does he live here?", "Do they live here?"], answer: 1 }
            ]
        },
        {
            id: "spa-37",
            moduleId: "syntax",
            moduleTitle: "Sentence Structure",
            title: "Position of Adjectives and Adverbs",
            explanation: [
                { type: "p", text: "Descriptive adjectives normally follow the noun (una casa grande). A few common ones can go before, sometimes shortening: 'buen', 'gran'." },
                { type: "example", es: "un coche rápido", en: "a fast car (after the noun)" },
                { type: "example", es: "un buen amigo", en: "a good friend (bueno → buen before a masc. noun)" },
                { type: "example", es: "una gran ciudad", en: "a great city (grande → gran before the noun)" },
                { type: "p", text: "Adverbs like 'muy' go before the adjective (muy alto), and manner adverbs usually follow the verb (habla despacio)." }
            ],
            exercises: [
                { type: "mc", prompt: "Where do most descriptive adjectives go?", options: ["before the noun", "after the noun", "before the verb", "at the start"], answer: 1 },
                { type: "mc", prompt: "'bueno' becomes ___ before a masculine noun.", options: ["buen", "buena", "buenos", "bien"], answer: 0 },
                { type: "type", prompt: "Type the shortened form of 'grande' before a noun (as in 'una ___ ciudad').", answer: "gran", accept: ["gran"] },
                { type: "trueFalse", claim: "'muy' goes before the adjective (muy alto).", answer: true },
                { type: "mc", prompt: "How do you say 'a good friend'? (masc.)", options: ["un bueno amigo", "un buen amigo", "un amigo bueno solamente", "un bien amigo"], answer: 1 },
                { type: "trueFalse", claim: "Manner adverbs usually come before the verb.", answer: false }
            ]
        },
        {
            id: "spa-38",
            moduleId: "syntax",
            moduleTitle: "Sentence Structure",
            title: "Negation and Adverb Placement",
            explanation: [
                { type: "p", text: "'no' always goes right before the verb. Other negatives - nunca (never), nada (nothing), nadie (nobody), tampoco (neither) - often pair with 'no' in a double negative." },
                { type: "example", es: "No como carne.", en: "I don't eat meat." },
                { type: "example", es: "No voy nunca.", en: "I never go. (no ... nunca)" },
                { type: "example", es: "No hay nadie.", en: "There is nobody." },
                { type: "p", text: "You can also put the negative word first and drop 'no': 'Nunca voy' = 'Nunca voy'. Both are correct." }
            ],
            exercises: [
                { type: "mc", prompt: "Where does 'no' go?", options: ["at the end", "right before the verb", "before the subject", "after the object"], answer: 1 },
                { type: "mc", prompt: "What does 'nunca' mean?", options: ["nothing", "never", "nobody", "neither"], answer: 1 },
                { type: "type", prompt: "Type the Spanish for 'nothing'.", answer: "nada", accept: ["nada"] },
                { type: "trueFalse", claim: "'No voy nunca' is a valid double negative meaning 'I never go'.", answer: true },
                { type: "mc", prompt: "What does 'nadie' mean?", options: ["nothing", "never", "nobody", "no"], answer: 2 },
                { type: "trueFalse", claim: "You can also say 'Nunca voy' (negative word first, no 'no').", answer: true }
            ]
        },
        {
            id: "spa-39",
            moduleId: "syntax",
            moduleTitle: "Sentence Structure",
            title: "Conjunctions: y, pero, o, porque",
            explanation: [
                { type: "p", text: "The building-block conjunctions: y (and), o (or), pero (but), porque (because)." },
                { type: "example", es: "pan y agua", en: "bread and water" },
                { type: "example", es: "¿Té o café?", en: "Tea or coffee?" },
                { type: "example", es: "Quiero, pero no puedo.", en: "I want to, but I can't." },
                { type: "example", es: "No voy porque estoy cansado.", en: "I'm not going because I'm tired." },
                { type: "p", text: "Spelling shift: y becomes 'e' before a word starting with i-/hi- (padre e hijo), and o becomes 'u' before o-/ho- (siete u ocho)." }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'but'?", options: ["y", "o", "pero", "porque"], answer: 2 },
                { type: "mc", prompt: "Which word means 'because'?", options: ["porque", "pero", "y", "o"], answer: 0 },
                { type: "type", prompt: "Type the Spanish for 'and'.", answer: "y", accept: ["y"] },
                { type: "trueFalse", claim: "'y' becomes 'e' before a word starting with i- or hi-.", answer: true },
                { type: "mc", prompt: "How do you say 'Tea or coffee?'", options: ["¿Té y café?", "¿Té o café?", "¿Té pero café?", "¿Té porque café?"], answer: 1 },
                { type: "trueFalse", claim: "'o' becomes 'u' before a word starting with o- or ho-.", answer: true }
            ]
        },

        // ── Module 7: Everyday Vocabulary ────────────────────────────────
        {
            id: "spa-40",
            moduleId: "vocabulary",
            moduleTitle: "Everyday Vocabulary",
            title: "Greetings and Courtesy Phrases",
            explanation: [
                { type: "p", text: "Everyday greetings and polite words." },
                { type: "example", es: "hola / adiós", en: "hello / goodbye" },
                { type: "example", es: "buenos días", en: "good morning" },
                { type: "example", es: "buenas tardes / buenas noches", en: "good afternoon / good evening" },
                { type: "example", es: "por favor / gracias / de nada", en: "please / thank you / you're welcome" },
                { type: "example", es: "perdón / lo siento", en: "excuse me / I'm sorry" }
            ],
            exercises: [
                { type: "mc", prompt: "Which greeting means 'good morning'?", options: ["buenas noches", "buenos días", "buenas tardes", "adiós"], answer: 1 },
                { type: "type", prompt: "Type the Spanish for 'thank you'.", answer: "gracias", accept: ["gracias"] },
                { type: "mc", prompt: "What does 'de nada' mean?", options: ["please", "sorry", "you're welcome", "goodbye"], answer: 2 },
                { type: "trueFalse", claim: "'por favor' means 'please'.", answer: true },
                { type: "mc", prompt: "Which phrase means 'I'm sorry'?", options: ["hola", "gracias", "lo siento", "buenas tardes"], answer: 2 },
                { type: "trueFalse", claim: "'adiós' means 'goodbye'.", answer: true }
            ]
        },
        {
            id: "spa-41",
            moduleId: "vocabulary",
            moduleTitle: "Everyday Vocabulary",
            title: "Introducing Yourself",
            explanation: [
                { type: "p", text: "A basic self-introduction uses reflexive 'llamarse' for your name, 'ser de' for where you're from, and set courtesy phrases." },
                { type: "example", es: "Me llamo Ana.", en: "My name is Ana." },
                { type: "example", es: "Soy de Italia.", en: "I'm from Italy." },
                { type: "example", es: "¿Cómo te llamas?", en: "What's your name?" },
                { type: "example", es: "Mucho gusto. / Encantado.", en: "Nice to meet you. / Pleased to meet you." }
            ],
            exercises: [
                { type: "mc", prompt: "How do you say 'My name is Ana'?", options: ["Soy Ana llamo.", "Me llamo Ana.", "Mi nombre Ana.", "Llamo me Ana."], answer: 1 },
                { type: "type", prompt: "Type the phrase 'I'm from' (2 words): '___ ___ Italia'? Just the verb.", answer: "soy", accept: ["soy"] },
                { type: "mc", prompt: "How do you ask someone's name (informal)?", options: ["¿Cómo te llamas?", "¿Dónde te llamas?", "¿Qué te llamas?", "¿Cuándo te llamas?"], answer: 0 },
                { type: "trueFalse", claim: "'Mucho gusto' means 'Nice to meet you'.", answer: true },
                { type: "mc", prompt: "'Soy de Italia' means...?", options: ["I go to Italy", "I'm from Italy", "I like Italy", "I speak Italian"], answer: 1 },
                { type: "trueFalse", claim: "'Encantado' is a phrase for 'pleased to meet you'.", answer: true }
            ]
        },
        {
            id: "spa-42",
            moduleId: "vocabulary",
            moduleTitle: "Everyday Vocabulary",
            title: "Family Vocabulary",
            explanation: [
                { type: "p", text: "Core family words. Note masculine/feminine pairs, and how the masculine plural covers a mixed group." },
                { type: "example", es: "madre / padre", en: "mother / father" },
                { type: "example", es: "hermana / hermano", en: "sister / brother" },
                { type: "example", es: "hija / hijo", en: "daughter / son" },
                { type: "example", es: "abuela / abuelo", en: "grandmother / grandfather" },
                { type: "p", text: "'los padres' means 'the parents', 'los hijos' the children - the masculine plural includes both genders." }
            ],
            exercises: [
                { type: "mc", prompt: "What does 'madre' mean?", options: ["sister", "mother", "daughter", "grandmother"], answer: 1 },
                { type: "mc", prompt: "What does 'hermano' mean?", options: ["father", "son", "brother", "grandfather"], answer: 2 },
                { type: "type", prompt: "Type the Spanish for 'father'.", answer: "padre", accept: ["padre"] },
                { type: "trueFalse", claim: "'los padres' can mean 'the parents'.", answer: true },
                { type: "mc", prompt: "Which word means 'daughter'?", options: ["hijo", "hija", "hermana", "abuela"], answer: 1 },
                { type: "trueFalse", claim: "'abuelo' means 'grandfather'.", answer: true }
            ]
        },
        {
            id: "spa-43",
            moduleId: "vocabulary",
            moduleTitle: "Everyday Vocabulary",
            title: "Days, Seasons, and Time",
            explanation: [
                { type: "p", text: "Days of the week (lowercase in Spanish) and the four seasons." },
                { type: "example", es: "lunes, martes, miércoles", en: "Monday, Tuesday, Wednesday" },
                { type: "example", es: "jueves, viernes, sábado, domingo", en: "Thursday, Friday, Saturday, Sunday" },
                { type: "example", es: "primavera, verano, otoño, invierno", en: "spring, summer, autumn, winter" },
                { type: "p", text: "To tell time: '¿Qué hora es?' - 'Es la una' (1:00), 'Son las dos' (2:00). Use 'la' for one o'clock, 'las' for the rest." },
                { type: "example", es: "Son las tres.", en: "It's three o'clock." }
            ],
            exercises: [
                { type: "mc", prompt: "What does 'lunes' mean?", options: ["Sunday", "Monday", "Friday", "Saturday"], answer: 1 },
                { type: "mc", prompt: "What does 'verano' mean?", options: ["spring", "summer", "autumn", "winter"], answer: 1 },
                { type: "type", prompt: "Type the Spanish for the season 'winter'.", answer: "invierno", accept: ["invierno"] },
                { type: "trueFalse", claim: "Days of the week are written with a capital letter in Spanish.", answer: false },
                { type: "mc", prompt: "How do you say 'It's three o'clock'?", options: ["Es la tres.", "Son las tres.", "Es las tres.", "Son la tres."], answer: 1 },
                { type: "trueFalse", claim: "'¿Qué hora es?' means 'What time is it?'.", answer: true }
            ]
        },
        {
            id: "spa-44",
            moduleId: "vocabulary",
            moduleTitle: "Everyday Vocabulary",
            title: "Home and City",
            explanation: [
                { type: "p", text: "Words for rooms at home and places around town." },
                { type: "example", es: "casa / cocina / baño", en: "house / kitchen / bathroom" },
                { type: "example", es: "habitación / puerta / ventana", en: "room / door / window" },
                { type: "example", es: "ciudad / calle / plaza", en: "city / street / square" },
                { type: "example", es: "tienda / mercado / estación", en: "shop / market / station" }
            ],
            exercises: [
                { type: "mc", prompt: "What does 'cocina' mean?", options: ["bathroom", "kitchen", "bedroom", "door"], answer: 1 },
                { type: "mc", prompt: "What does 'calle' mean?", options: ["city", "street", "square", "shop"], answer: 1 },
                { type: "type", prompt: "Type the Spanish for 'house'.", answer: "casa", accept: ["casa"] },
                { type: "trueFalse", claim: "'baño' means 'bathroom'.", answer: true },
                { type: "mc", prompt: "Which word means 'station'?", options: ["tienda", "mercado", "estación", "plaza"], answer: 2 },
                { type: "trueFalse", claim: "'ventana' means 'window'.", answer: true }
            ]
        },
        {
            id: "spa-45",
            moduleId: "vocabulary",
            moduleTitle: "Everyday Vocabulary",
            title: "Food and Drinks",
            explanation: [
                { type: "p", text: "Common foods and drinks - useful for shopping and restaurants." },
                { type: "example", es: "agua / leche / café", en: "water / milk / coffee" },
                { type: "example", es: "pan / queso / huevo", en: "bread / cheese / egg" },
                { type: "example", es: "carne / pescado / pollo", en: "meat / fish / chicken" },
                { type: "example", es: "fruta / verdura", en: "fruit / vegetables" }
            ],
            exercises: [
                { type: "mc", prompt: "What does 'agua' mean?", options: ["milk", "water", "coffee", "bread"], answer: 1 },
                { type: "mc", prompt: "What does 'pan' mean?", options: ["cheese", "egg", "bread", "meat"], answer: 2 },
                { type: "type", prompt: "Type the Spanish for 'coffee'.", answer: "café", accept: ["cafe", "café"] },
                { type: "trueFalse", claim: "'pescado' means 'fish'.", answer: true },
                { type: "mc", prompt: "Which word means 'meat'?", options: ["carne", "pollo", "fruta", "leche"], answer: 0 },
                { type: "trueFalse", claim: "'verdura' means 'vegetables'.", answer: true }
            ]
        },
        {
            id: "spa-46",
            moduleId: "vocabulary",
            moduleTitle: "Everyday Vocabulary",
            title: "Work and Studies",
            explanation: [
                { type: "p", text: "Vocabulary for jobs and studying." },
                { type: "example", es: "trabajo / oficina", en: "work-job / office" },
                { type: "example", es: "trabajar / estudiar", en: "to work / to study" },
                { type: "example", es: "profesor / estudiante", en: "teacher / student" },
                { type: "example", es: "universidad / escuela", en: "university / school" },
                { type: "example", es: "¿A qué te dedicas?", en: "What do you do (for work)?" }
            ],
            exercises: [
                { type: "mc", prompt: "What does 'trabajo' mean?", options: ["study", "work / job", "office", "school"], answer: 1 },
                { type: "mc", prompt: "What does 'estudiar' mean?", options: ["to work", "to study", "to teach", "to live"], answer: 1 },
                { type: "type", prompt: "Type the Spanish for 'student'.", answer: "estudiante", accept: ["estudiante"] },
                { type: "trueFalse", claim: "'profesor' means 'teacher'.", answer: true },
                { type: "mc", prompt: "Which word means 'university'?", options: ["escuela", "oficina", "universidad", "trabajo"], answer: 2 },
                { type: "trueFalse", claim: "'¿A qué te dedicas?' asks about someone's job.", answer: true }
            ]
        },
        {
            id: "spa-47",
            moduleId: "vocabulary",
            moduleTitle: "Everyday Vocabulary",
            title: "Free Time and Hobbies",
            explanation: [
                { type: "p", text: "Words for leisure activities. Many pair with the verb 'gustar' (to like)." },
                { type: "example", es: "música / película", en: "music / film" },
                { type: "example", es: "deporte / fútbol", en: "sport / football" },
                { type: "example", es: "leer / bailar / viajar", en: "to read / to dance / to travel" },
                { type: "example", es: "Me gusta la música.", en: "I like music." }
            ],
            exercises: [
                { type: "mc", prompt: "What does 'música' mean?", options: ["film", "music", "sport", "book"], answer: 1 },
                { type: "mc", prompt: "What does 'leer' mean?", options: ["to dance", "to travel", "to read", "to play"], answer: 2 },
                { type: "type", prompt: "Type the Spanish for 'sport'.", answer: "deporte", accept: ["deporte"] },
                { type: "trueFalse", claim: "'bailar' means 'to dance'.", answer: true },
                { type: "mc", prompt: "How do you say 'I like music'?", options: ["Yo música gusta.", "Me gusta la música.", "Gusto la música.", "Me gustar música."], answer: 1 },
                { type: "trueFalse", claim: "'viajar' means 'to travel'.", answer: true }
            ]
        },
        {
            id: "spa-48",
            moduleId: "vocabulary",
            moduleTitle: "Everyday Vocabulary",
            title: "Technology and the Internet",
            explanation: [
                { type: "p", text: "Everyday tech words. Some differ between Spain and Latin America (shown together)." },
                { type: "example", es: "ordenador / computadora", en: "computer (Spain / Latin America)" },
                { type: "example", es: "móvil / celular", en: "mobile phone (Spain / Latin America)" },
                { type: "example", es: "internet / correo", en: "internet / email" },
                { type: "example", es: "mensaje / pantalla", en: "message / screen" }
            ],
            exercises: [
                { type: "mc", prompt: "In Spain, 'computer' is...?", options: ["celular", "ordenador", "pantalla", "correo"], answer: 1 },
                { type: "mc", prompt: "What does 'móvil' / 'celular' mean?", options: ["screen", "email", "mobile phone", "message"], answer: 2 },
                { type: "type", prompt: "Type the Spanish for 'message'.", answer: "mensaje", accept: ["mensaje"] },
                { type: "trueFalse", claim: "'correo' can mean 'email'.", answer: true },
                { type: "mc", prompt: "Which word means 'screen'?", options: ["pantalla", "mensaje", "correo", "internet"], answer: 0 },
                { type: "trueFalse", claim: "'computadora' is common in Latin America.", answer: true }
            ]
        },
        {
            id: "spa-49",
            moduleId: "vocabulary",
            moduleTitle: "Everyday Vocabulary",
            title: "Shopping and Money",
            explanation: [
                { type: "p", text: "Words for shopping and paying." },
                { type: "example", es: "dinero / euro", en: "money / euro" },
                { type: "example", es: "tienda / supermercado", en: "shop / supermarket" },
                { type: "example", es: "comprar / pagar", en: "to buy / to pay" },
                { type: "example", es: "caro / barato", en: "expensive / cheap" },
                { type: "example", es: "tarjeta / efectivo", en: "card / cash" }
            ],
            exercises: [
                { type: "mc", prompt: "What does 'dinero' mean?", options: ["shop", "money", "card", "cash"], answer: 1 },
                { type: "mc", prompt: "What does 'comprar' mean?", options: ["to pay", "to sell", "to buy", "to cost"], answer: 2 },
                { type: "type", prompt: "Type the Spanish for 'cheap'.", answer: "barato", accept: ["barato"] },
                { type: "trueFalse", claim: "'caro' means 'expensive'.", answer: true },
                { type: "mc", prompt: "Which word means 'card' (to pay)?", options: ["efectivo", "tarjeta", "dinero", "tienda"], answer: 1 },
                { type: "trueFalse", claim: "'pagar' means 'to pay'.", answer: true }
            ]
        },

        // ── Module 8: Real-Life Communication ────────────────────────────
        {
            id: "spa-50",
            moduleId: "communication",
            moduleTitle: "Real-Life Communication",
            title: "Asking and Giving Personal Information",
            explanation: [
                { type: "p", text: "Key questions to exchange basic details, and how to answer them." },
                { type: "example", es: "¿Cómo te llamas? — Me llamo...", en: "What's your name? — My name is..." },
                { type: "example", es: "¿De dónde eres? — Soy de...", en: "Where are you from? — I'm from..." },
                { type: "example", es: "¿Cuántos años tienes? — Tengo... años.", en: "How old are you? — I'm ... years old." },
                { type: "example", es: "¿Dónde vives? — Vivo en...", en: "Where do you live? — I live in..." }
            ],
            exercises: [
                { type: "mc", prompt: "How do you ask 'Where are you from?' (informal)", options: ["¿Dónde vives?", "¿De dónde eres?", "¿Cómo te llamas?", "¿Cuántos años tienes?"], answer: 1 },
                { type: "type", prompt: "Type the verb to answer 'I'm from...' : '___ de Italia'.", answer: "soy", accept: ["soy"] },
                { type: "mc", prompt: "How do you ask someone's age?", options: ["¿Cuántos años tienes?", "¿De dónde eres?", "¿Dónde vives?", "¿Cómo estás?"], answer: 0 },
                { type: "trueFalse", claim: "You answer '¿Dónde vives?' with 'Vivo en...'.", answer: true },
                { type: "mc", prompt: "How do you say 'My name is...'?", options: ["Soy de...", "Me llamo...", "Tengo...", "Vivo en..."], answer: 1 },
                { type: "trueFalse", claim: "'¿Cómo te llamas?' asks for a name.", answer: true }
            ]
        },
        {
            id: "spa-51",
            moduleId: "communication",
            moduleTitle: "Real-Life Communication",
            title: "Asking for Directions and Getting Around",
            explanation: [
                { type: "p", text: "To ask where something is, use '¿Dónde está...?'. Key direction words follow." },
                { type: "example", es: "¿Dónde está la estación?", en: "Where is the station?" },
                { type: "example", es: "a la derecha / a la izquierda", en: "to the right / to the left" },
                { type: "example", es: "todo recto / todo derecho", en: "straight ahead" },
                { type: "example", es: "cerca / lejos", en: "near / far" },
                { type: "example", es: "¿Está cerca de aquí?", en: "Is it near here?" }
            ],
            exercises: [
                { type: "mc", prompt: "How do you ask 'Where is the station?'", options: ["¿Cómo está la estación?", "¿Dónde está la estación?", "¿Qué es la estación?", "¿Cuándo está la estación?"], answer: 1 },
                { type: "mc", prompt: "What does 'a la derecha' mean?", options: ["to the left", "to the right", "straight ahead", "near"], answer: 1 },
                { type: "type", prompt: "Type the Spanish for 'to the left' (3 words).", answer: "a la izquierda", accept: ["alaizquierda", "a la izquierda"] },
                { type: "trueFalse", claim: "'todo recto' means 'straight ahead'.", answer: true },
                { type: "mc", prompt: "What does 'lejos' mean?", options: ["near", "far", "right", "here"], answer: 1 },
                { type: "trueFalse", claim: "'cerca' means 'near'.", answer: true }
            ]
        },
        {
            id: "spa-52",
            moduleId: "communication",
            moduleTitle: "Real-Life Communication",
            title: "Shopping at a Store or Supermarket",
            explanation: [
                { type: "p", text: "Handy phrases for buying things. 'Quería' (I would like) is a soft, polite way to ask." },
                { type: "example", es: "¿Cuánto cuesta esto?", en: "How much does this cost?" },
                { type: "example", es: "Quería un kilo de manzanas.", en: "I'd like a kilo of apples." },
                { type: "example", es: "¿Tiene pan?", en: "Do you have bread?" },
                { type: "example", es: "¿Puedo pagar con tarjeta?", en: "Can I pay by card?" }
            ],
            exercises: [
                { type: "mc", prompt: "How do you ask 'How much does this cost?'", options: ["¿Cuándo cuesta esto?", "¿Cuánto cuesta esto?", "¿Cómo cuesta esto?", "¿Dónde cuesta esto?"], answer: 1 },
                { type: "type", prompt: "Type the polite word for 'I'd like' (as in '___ un kilo').", answer: "quería", accept: ["queria", "quería"] },
                { type: "mc", prompt: "How do you ask 'Do you have bread?'", options: ["¿Tiene pan?", "¿Hay tiene pan?", "¿Es pan?", "¿Quiere pan?"], answer: 0 },
                { type: "trueFalse", claim: "'¿Puedo pagar con tarjeta?' asks to pay by card.", answer: true },
                { type: "mc", prompt: "'Quería un kilo de manzanas' means...?", options: ["I want the apple shop", "I'd like a kilo of apples", "Where are the apples?", "The apples are expensive"], answer: 1 },
                { type: "trueFalse", claim: "'Quería' is more polite than 'Quiero'.", answer: true }
            ]
        },
        {
            id: "spa-53",
            moduleId: "communication",
            moduleTitle: "Real-Life Communication",
            title: "Ordering Food and Drinks",
            explanation: [
                { type: "p", text: "At a bar or restaurant, use 'Para mí...' (for me...) or 'Quería...' to order, and ask for 'la cuenta' to pay." },
                { type: "example", es: "La carta, por favor.", en: "The menu, please." },
                { type: "example", es: "Para mí, una ensalada.", en: "For me, a salad." },
                { type: "example", es: "¿Qué desea?", en: "What would you like? (waiter)" },
                { type: "example", es: "La cuenta, por favor.", en: "The bill, please." }
            ],
            exercises: [
                { type: "mc", prompt: "What is 'la carta' in a restaurant?", options: ["the bill", "the menu", "the waiter", "the table"], answer: 1 },
                { type: "mc", prompt: "How do you order 'For me, a salad'?", options: ["Para mí, una ensalada.", "Por mí, una ensalada.", "Para yo, una ensalada.", "A mí ensalada."], answer: 0 },
                { type: "type", prompt: "Type the Spanish for 'the bill' (2 words).", answer: "la cuenta", accept: ["lacuenta", "la cuenta"] },
                { type: "trueFalse", claim: "'¿Qué desea?' is what a waiter says to take your order.", answer: true },
                { type: "mc", prompt: "How do you ask for the menu politely?", options: ["La cuenta, por favor.", "La carta, por favor.", "Para mí, por favor.", "¿Qué desea?"], answer: 1 },
                { type: "trueFalse", claim: "You ask for 'la cuenta' when you want to pay.", answer: true }
            ]
        },
        {
            id: "spa-54",
            moduleId: "communication",
            moduleTitle: "Real-Life Communication",
            title: "Talking about the Weather",
            explanation: [
                { type: "p", text: "Most weather expressions use 'hacer' (Hace...) or single verbs (llueve, nieva). Ask '¿Qué tiempo hace?'." },
                { type: "example", es: "¿Qué tiempo hace?", en: "What's the weather like?" },
                { type: "example", es: "Hace calor / Hace frío.", en: "It's hot / It's cold." },
                { type: "example", es: "Hace sol / Hace viento.", en: "It's sunny / It's windy." },
                { type: "example", es: "Llueve. / Nieva.", en: "It's raining. / It's snowing." }
            ],
            exercises: [
                { type: "mc", prompt: "How do you ask 'What's the weather like?'", options: ["¿Qué hora hace?", "¿Qué tiempo hace?", "¿Cómo tiempo es?", "¿Dónde hace tiempo?"], answer: 1 },
                { type: "mc", prompt: "What does 'Hace frío' mean?", options: ["It's hot", "It's cold", "It's sunny", "It's windy"], answer: 1 },
                { type: "type", prompt: "Type the verb used in most weather phrases (as in '___ calor').", answer: "hace", accept: ["hace"] },
                { type: "trueFalse", claim: "'Llueve' means 'It's raining'.", answer: true },
                { type: "mc", prompt: "How do you say 'It's sunny'?", options: ["Hace sol", "Hace frío", "Nieva", "Hace viento"], answer: 0 },
                { type: "trueFalse", claim: "'Nieva' means 'It's snowing'.", answer: true }
            ]
        },
        {
            id: "spa-55",
            moduleId: "communication",
            moduleTitle: "Real-Life Communication",
            title: "Describing Your Daily Routine",
            explanation: [
                { type: "p", text: "Daily routines lean on reflexive verbs and time words. 'todos los días' = every day, 'luego' = then." },
                { type: "example", es: "Me levanto a las siete.", en: "I get up at seven." },
                { type: "example", es: "Desayuno y voy al trabajo.", en: "I have breakfast and go to work." },
                { type: "example", es: "Por la mañana / por la tarde", en: "in the morning / in the afternoon" },
                { type: "example", es: "Luego, vuelvo a casa.", en: "Then, I come back home." }
            ],
            exercises: [
                { type: "mc", prompt: "What does 'Me levanto' mean?", options: ["I sleep", "I get up", "I eat", "I go"], answer: 1 },
                { type: "mc", prompt: "What does 'todos los días' mean?", options: ["all day", "every day", "some days", "at night"], answer: 1 },
                { type: "type", prompt: "Type the Spanish for 'then' (single word for sequencing).", answer: "luego", accept: ["luego"] },
                { type: "trueFalse", claim: "'por la mañana' means 'in the morning'.", answer: true },
                { type: "mc", prompt: "How do you say 'I have breakfast'?", options: ["Desayuno", "Almuerzo", "Ceno", "Duermo"], answer: 0 },
                { type: "trueFalse", claim: "Daily routines often use reflexive verbs (me levanto...).", answer: true }
            ]
        },
        {
            id: "spa-56",
            moduleId: "communication",
            moduleTitle: "Real-Life Communication",
            title: "Expressing Preferences and Opinions",
            explanation: [
                { type: "p", text: "Use 'gustar' for likes: 'me gusta' + a singular thing, 'me gustan' + plural things. 'Prefiero' = I prefer; 'Creo que' / 'Pienso que' = I think that." },
                { type: "example", es: "Me gusta el café.", en: "I like coffee." },
                { type: "example", es: "Me gustan los libros.", en: "I like books. (plural → gustan)" },
                { type: "example", es: "No me gusta.", en: "I don't like it." },
                { type: "example", es: "Creo que es una buena idea.", en: "I think it's a good idea." }
            ],
            exercises: [
                { type: "mc", prompt: "How do you say 'I like coffee'? (café = singular)", options: ["Me gustan el café.", "Me gusta el café.", "Yo gusto el café.", "Me gustar café."], answer: 1 },
                { type: "mc", prompt: "With a plural thing (los libros), you use...?", options: ["me gusta", "me gustan", "me gustar", "yo gusto"], answer: 1 },
                { type: "type", prompt: "Type the Spanish for 'I prefer'.", answer: "prefiero", accept: ["prefiero"] },
                { type: "trueFalse", claim: "'Creo que' means 'I think that'.", answer: true },
                { type: "mc", prompt: "How do you say 'I don't like it'?", options: ["No me gusta.", "Me gusta no.", "No gusto.", "No me gustan."], answer: 0 },
                { type: "trueFalse", claim: "'Pienso que' can also mean 'I think that'.", answer: true }
            ]
        },
        {
            id: "spa-57",
            moduleId: "communication",
            moduleTitle: "Real-Life Communication",
            title: "Making Suggestions and Invitations",
            explanation: [
                { type: "p", text: "To suggest doing something together, use '¿Vamos a...?' or 'Vamos a...' (let's...). To invite, '¿Quieres...?' (do you want...?) or '¿Por qué no...?' (why don't we...?)." },
                { type: "example", es: "¿Vamos al cine?", en: "Shall we go to the cinema?" },
                { type: "example", es: "Vamos a comer.", en: "Let's eat." },
                { type: "example", es: "¿Quieres venir?", en: "Do you want to come?" },
                { type: "example", es: "¡Buena idea!", en: "Good idea!" }
            ],
            exercises: [
                { type: "mc", prompt: "How do you say 'Let's eat'?", options: ["Vamos a comer.", "Van a comer.", "Voy a comer.", "Vas a comer."], answer: 0 },
                { type: "mc", prompt: "How do you invite: 'Do you want to come?'", options: ["¿Quieres venir?", "¿Puedes venir?", "¿Vienes venir?", "¿Debes venir?"], answer: 0 },
                { type: "type", prompt: "Type the Spanish for 'Good idea!' (2 words).", answer: "buena idea", accept: ["buenaidea", "buena idea"] },
                { type: "trueFalse", claim: "'¿Por qué no...?' can suggest 'why don't we...?'.", answer: true },
                { type: "mc", prompt: "'¿Vamos al cine?' means...?", options: ["Do you go to the cinema?", "Shall we go to the cinema?", "Where is the cinema?", "I go to the cinema."], answer: 1 },
                { type: "trueFalse", claim: "'¿Quieres...?' is a way to invite someone.", answer: true }
            ]
        },
        {
            id: "spa-58",
            moduleId: "communication",
            moduleTitle: "Real-Life Communication",
            title: "Talking about Future Plans",
            explanation: [
                { type: "p", text: "For plans, the everyday choice is 'ir a + infinitive'. 'pensar + infinitive' means 'to plan/intend to'. Add future time words." },
                { type: "example", es: "Mañana voy a estudiar.", en: "Tomorrow I'm going to study." },
                { type: "example", es: "Pienso viajar a España.", en: "I plan to travel to Spain." },
                { type: "example", es: "la próxima semana / el año que viene", en: "next week / next year" },
                { type: "p", text: "So a simple future plan is just a future time word + 'voy a' + verb: 'Mañana voy a trabajar'." }
            ],
            exercises: [
                { type: "mc", prompt: "What's the everyday way to talk about plans?", options: ["ser a + infinitive", "ir a + infinitive", "tener + participle", "haber + infinitive"], answer: 1 },
                { type: "type", prompt: "Type the Spanish for 'tomorrow'.", answer: "mañana", accept: ["manana", "mañana"] },
                { type: "mc", prompt: "What does 'Pienso viajar' express?", options: ["I traveled", "I plan to travel", "I travel now", "I liked traveling"], answer: 1 },
                { type: "trueFalse", claim: "'Mañana voy a estudiar' means 'Tomorrow I'm going to study'.", answer: true },
                { type: "mc", prompt: "Which phrase means 'next week'?", options: ["la próxima semana", "el año que viene", "ayer", "hoy"], answer: 0 },
                { type: "trueFalse", claim: "'el año que viene' means 'next year'.", answer: true }
            ]
        }
    ]
};

// Additive dual-export (see the header note): merge onto the shared global so
// load order relative to the other lessons-*.js files never clobbers another
// course, and expose the same object to api/_lib.js's require() for id validation.
if (typeof window !== "undefined") {
    window.POLYTYPE_LESSONS = Object.assign(window.POLYTYPE_LESSONS || {}, SPANISH_LESSONS_DATA);
}
if (typeof module !== "undefined" && module.exports) module.exports = SPANISH_LESSONS_DATA;
