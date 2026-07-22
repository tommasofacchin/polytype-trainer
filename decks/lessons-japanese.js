// Japanese "Lessons" curriculum - a hand-authored sequence of short
// grammar/vocab lessons, the Japanese counterpart of the other decks/lessons-*.js
// files. Same data shape and the same dual-export contract, so js/lessons.js,
// js/router.js and api/_lib.js can treat every language's lessons uniformly.
//
// Ships the full 8-module curriculum (58 lessons): Grammar Foundations,
// Numbers, Nouns & Counters, Adjectives, Verbs, Sentence Structure,
// Everyday Vocabulary, and Real-Life Communication - mirroring the other
// courses' structure. Further lessons can be appended here without touching
// any wiring.
//
// Japanese differs from the other courses in ways the content reflects: it is
// written in three scripts (hiragana, katakana, kanji) while learners lean on
// romaji; word order is Subject-Object-Verb, so the verb always comes last;
// grammatical role is shown by particles that follow the word (は wa topic,
// が ga subject, を o object, に ni to/at, で de at/by, へ e toward, の no of,
// と to and/with, も mo also) rather than by position; there is no gender, no
// article and no plural; verbs and adjectives conjugate for politeness and
// tense but never for person or number; and adjectives split into two classes
// (i-adjectives and na-adjectives). Example rows show kana/kanji + romaji;
// `type` answers are romaji (js/lessons.js lowercases, strips accent marks and
// spaces when matching, so "arigatou" or "arigato u" both match "arigatou").
//
// Lesson order in the array IS the unlock order - a lesson at array index i
// is playable once profile.courses.japanese.lessonsCompleted.length >= i.
// id values ("jpn-NN") must stay stable and never be reordered or reused once
// shipped, since they're stored (as completed) in player profiles.
//
// Exercise types (rendered by js/lessons.js):
//   { type: "mc", prompt, options: [...], answer: <index> }
//   { type: "trueFalse", claim, answer: <bool> }
//   { type: "type", prompt, answer: "<canonical>", accept: ["<alt spellings>"] }
// Example rows use { type: "example", ja: "日本語 (romaji)", en: "..." }.

const JAPANESE_LESSONS_DATA = {
    japanese: [
        // ── Module 1: Grammar Foundations ────────────────────────────────
        {
            id: "jpn-01",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "The Writing Systems and Romaji",
            explanation: [
                { type: "p", text: "Japanese is written with three scripts at once. Hiragana (ひらがな) writes Japanese grammar and native words, katakana (カタカナ) writes foreign/loan words, and kanji (漢字) are characters borrowed from Chinese that carry meaning. Learners use 'romaji' - the Roman-letter spelling - to read while they learn the scripts." },
                { type: "example", ja: "ひらがな (hiragana)", en: "the rounded, cursive script" },
                { type: "example", ja: "カタカナ (katakana)", en: "the angular script for loan words" },
                { type: "example", ja: "コーヒー (koohii)", en: "coffee - a loan word, so katakana" },
                { type: "p", text: "Pronunciation is very regular: five vowels a-i-u-e-o, each always the same. A bar or doubled vowel (koohii) just means 'hold it longer'. There are no tones and no stress the way English has." },
                { type: "example", ja: "こんにちは (konnichiwa)", en: "hello / good afternoon" }
            ],
            exercises: [
                { type: "mc", prompt: "Which script is used for foreign / loan words?", options: ["hiragana", "katakana", "kanji", "romaji"], answer: 1 },
                { type: "trueFalse", claim: "Kanji are characters borrowed from Chinese that carry meaning.", answer: true },
                { type: "mc", prompt: "How many basic vowels does Japanese have?", options: ["three", "four", "five", "six"], answer: 2 },
                { type: "type", prompt: "Type the romaji for 'hello / good afternoon'.", answer: "konnichiwa", accept: ["konnichiwa", "konnichi wa"] },
                { type: "mc", prompt: "A doubled vowel (as in koohii) means the vowel is...?", options: ["stressed", "held longer", "whispered", "a tone"], answer: 1 },
                { type: "trueFalse", claim: "Romaji is the Roman-letter spelling that helps learners read Japanese.", answer: true }
            ]
        },
        {
            id: "jpn-02",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "Subject Pronouns",
            explanation: [
                { type: "p", text: "Japanese pronouns don't change for grammar (no he/him difference), and they're often dropped when clear from context. The everyday 'I' is 私 (watashi)." },
                { type: "example", ja: "私 (watashi)", en: "I / me" },
                { type: "example", ja: "あなた (anata)", en: "you" },
                { type: "example", ja: "彼 (kare)", en: "he / him" },
                { type: "example", ja: "彼女 (kanojo)", en: "she / her" },
                { type: "example", ja: "私たち (watashitachi)", en: "we / us" },
                { type: "p", text: "To make a pronoun plural you add たち (tachi): 私 → 私たち. In real conversation Japanese people usually use a person's name instead of あなた (anata)." }
            ],
            exercises: [
                { type: "mc", prompt: "Which pronoun means 'I / me'?", options: ["あなた (anata)", "私 (watashi)", "彼 (kare)", "彼女 (kanojo)"], answer: 1 },
                { type: "mc", prompt: "How do you make a pronoun plural?", options: ["add たち (tachi)", "add です (desu)", "double the vowel", "add の (no)"], answer: 0 },
                { type: "trueFalse", claim: "Japanese pronouns are often dropped when the meaning is already clear.", answer: true },
                { type: "type", prompt: "Type the romaji for 私 ('I').", answer: "watashi", accept: ["watashi"] },
                { type: "mc", prompt: "Which means 'she / her'?", options: ["彼 (kare)", "彼女 (kanojo)", "私たち (watashitachi)", "あなた (anata)"], answer: 1 },
                { type: "trueFalse", claim: "In everyday speech, Japanese people usually use a name instead of あなた (anata).", answer: true }
            ]
        },
        {
            id: "jpn-03",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "The Topic Particle は and です",
            explanation: [
                { type: "p", text: "The core Japanese sentence is 'A は B です' - 'as for A, it is B'. は marks the topic and です (desu) is the polite 'to be'. Note: as a particle, は is read 'wa', not 'ha'." },
                { type: "example", ja: "私は学生です。(Watashi wa gakusei desu.)", en: "I am a student." },
                { type: "example", ja: "彼は先生です。(Kare wa sensei desu.)", en: "He is a teacher." },
                { type: "p", text: "です never changes for the subject - it's the same for I, you, he, we, they. It sits at the very end of the sentence." },
                { type: "example", ja: "これはお茶です。(Kore wa ocha desu.)", en: "This is tea." }
            ],
            exercises: [
                { type: "mc", prompt: "What does です (desu) mean?", options: ["to have", "to be", "to go", "to want"], answer: 1 },
                { type: "mc", prompt: "As a particle, は is pronounced...?", options: ["ha", "wa", "ba", "pa"], answer: 1 },
                { type: "trueFalse", claim: "です changes its form depending on the subject.", answer: false },
                { type: "type", prompt: "Type the romaji for the topic particle は (as used in a sentence).", answer: "wa", accept: ["wa"] },
                { type: "mc", prompt: "How do you say 'I am a student'? (学生 = gakusei = student)", options: ["私学生。", "私は学生です。", "私が学生を。", "学生は私。"], answer: 1 },
                { type: "trueFalse", claim: "です comes at the very end of the sentence.", answer: true }
            ]
        },
        {
            id: "jpn-04",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "Negation: じゃありません",
            explanation: [
                { type: "p", text: "To turn 'A は B です' into 'A is not B', replace です with じゃありません (ja arimasen). A slightly more formal version is ではありません (dewa arimasen)." },
                { type: "example", ja: "私は学生じゃありません。(Watashi wa gakusei ja arimasen.)", en: "I am not a student." },
                { type: "example", ja: "彼は先生じゃありません。(Kare wa sensei ja arimasen.)", en: "He is not a teacher." },
                { type: "p", text: "So です (is) and じゃありません (is not) are the two ends you swap. The rest of the sentence stays exactly the same." },
                { type: "example", ja: "これはお茶じゃありません。(Kore wa ocha ja arimasen.)", en: "This is not tea." }
            ],
            exercises: [
                { type: "mc", prompt: "How do you say 'is not' (the negative of です)?", options: ["でした (deshita)", "じゃありません (ja arimasen)", "ですか (desu ka)", "でしょう (deshou)"], answer: 1 },
                { type: "trueFalse", claim: "ではありません is a more formal version of じゃありません.", answer: true },
                { type: "type", prompt: "Type the romaji for the negative 'is not' じゃありません.", answer: "ja arimasen", accept: ["jaarimasen", "ja arimasen", "jaa rimasen"] },
                { type: "mc", prompt: "How do you say 'I am not a student'?", options: ["私は学生です。", "私は学生じゃありません。", "私は学生でした。", "私は学生ですか。"], answer: 1 },
                { type: "mc", prompt: "To negate a です sentence, you...?", options: ["add じゃ at the front", "replace です with じゃありません", "drop は", "double です"], answer: 1 },
                { type: "trueFalse", claim: "The rest of the sentence stays the same when you make です negative.", answer: true }
            ]
        },
        {
            id: "jpn-05",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "The Past Tense of です",
            explanation: [
                { type: "p", text: "The past of です (was / were) is でした (deshita). The negative past (was not) is じゃありませんでした (ja arimasen deshita)." },
                { type: "example", ja: "彼は学生でした。(Kare wa gakusei deshita.)", en: "He was a student." },
                { type: "example", ja: "昨日は寒かったです。(Kinou wa samukatta desu.)", en: "Yesterday was cold." },
                { type: "p", text: "So the four forms of 'to be' are: です (is), じゃありません (is not), でした (was), じゃありませんでした (was not)." },
                { type: "example", ja: "彼は先生じゃありませんでした。(Kare wa sensei ja arimasen deshita.)", en: "He was not a teacher." }
            ],
            exercises: [
                { type: "mc", prompt: "What is the past tense of です (was / were)?", options: ["でしょう (deshou)", "でした (deshita)", "ですか (desu ka)", "じゃない (ja nai)"], answer: 1 },
                { type: "type", prompt: "Type the romaji for でした ('was / were').", answer: "deshita", accept: ["deshita"] },
                { type: "mc", prompt: "How do you say 'was not'?", options: ["じゃありません", "でした", "じゃありませんでした", "ですか"], answer: 2 },
                { type: "trueFalse", claim: "でした is the polite past form of です.", answer: true },
                { type: "mc", prompt: "How do you say 'He was a student'?", options: ["彼は学生です。", "彼は学生でした。", "彼は学生じゃありません。", "彼は学生ですか。"], answer: 1 },
                { type: "trueFalse", claim: "じゃありませんでした means 'was not'.", answer: true }
            ]
        },
        {
            id: "jpn-06",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "Yes/No Questions with か",
            explanation: [
                { type: "p", text: "To turn any statement into a yes/no question, just add the particle か (ka) at the end. Word order does not change and no question mark is needed (though modern writing often adds one)." },
                { type: "example", ja: "学生です。(Gakusei desu.)", en: "(You) are a student." },
                { type: "example", ja: "学生ですか。(Gakusei desu ka?)", en: "Are (you) a student?" },
                { type: "p", text: "Answer with はい (hai, yes) or いいえ (iie, no)." },
                { type: "example", ja: "はい、そうです。(Hai, sou desu.)", en: "Yes, that's right." },
                { type: "example", ja: "いいえ、違います。(Iie, chigaimasu.)", en: "No, that's wrong." }
            ],
            exercises: [
                { type: "mc", prompt: "Which particle turns a statement into a yes/no question?", options: ["は (wa)", "か (ka)", "の (no)", "を (o)"], answer: 1 },
                { type: "trueFalse", claim: "Word order changes when you form a question in Japanese.", answer: false },
                { type: "type", prompt: "Type the romaji for the question particle か.", answer: "ka", accept: ["ka"] },
                { type: "mc", prompt: "How do you ask 'Are you a student?'", options: ["学生でした。", "学生ですか。", "学生じゃありません。", "学生の。"], answer: 1 },
                { type: "mc", prompt: "Which word means 'yes'?", options: ["いいえ (iie)", "はい (hai)", "そう (sou)", "違う (chigau)"], answer: 1 },
                { type: "trueFalse", claim: "You answer a yes/no question with はい (yes) or いいえ (no).", answer: true }
            ]
        },
        {
            id: "jpn-07",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "The Subject Particle が",
            explanation: [
                { type: "p", text: "が (ga) marks the grammatical subject - the doer, or the thing that exists / is wanted. It differs from は: は sets the topic ('as for...'), が points out the specific subject (often new information)." },
                { type: "example", ja: "犬がいます。(Inu ga imasu.)", en: "There is a dog." },
                { type: "example", ja: "誰が来ますか。(Dare ga kimasu ka?)", en: "Who is coming?" },
                { type: "p", text: "A useful rule: question words like 誰 (who) and 何 (what) take が, not は, and the answer keeps が too." },
                { type: "example", ja: "水が好きです。(Mizu ga suki desu.)", en: "I like water. (lit. water is likeable)" }
            ],
            exercises: [
                { type: "mc", prompt: "What does the particle が (ga) mark?", options: ["the object", "the subject", "the location", "possession"], answer: 1 },
                { type: "trueFalse", claim: "Question words like 誰 (who) take が rather than は.", answer: true },
                { type: "type", prompt: "Type the romaji for the subject particle が.", answer: "ga", accept: ["ga"] },
                { type: "mc", prompt: "は sets the ___, が points out the ___.", options: ["object / subject", "topic / subject", "verb / noun", "past / present"], answer: 1 },
                { type: "mc", prompt: "How do you say 'Who is coming?' (来ます = kimasu = comes)", options: ["誰は来ますか。", "誰が来ますか。", "誰を来ますか。", "誰の来ますか。"], answer: 1 },
                { type: "trueFalse", claim: "が often introduces new or specific information.", answer: true }
            ]
        },
        {
            id: "jpn-08",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "The Object Particle を",
            explanation: [
                { type: "p", text: "を marks the direct object - the thing the verb acts on. As a particle, を is read 'o'. The pattern is 'Object を Verb', and the verb comes last." },
                { type: "example", ja: "水を飲みます。(Mizu o nomimasu.)", en: "I drink water." },
                { type: "example", ja: "本を読みます。(Hon o yomimasu.)", en: "I read a book." },
                { type: "p", text: "Notice the order: the object comes before the verb (Japanese is Subject-Object-Verb)." },
                { type: "example", ja: "私はパンを食べます。(Watashi wa pan o tabemasu.)", en: "I eat bread." }
            ],
            exercises: [
                { type: "mc", prompt: "What does the particle を mark?", options: ["the subject", "the direct object", "the location", "the topic"], answer: 1 },
                { type: "mc", prompt: "As a particle, を is pronounced...?", options: ["wo/o", "ha", "ba", "no"], answer: 0 },
                { type: "type", prompt: "Type the romaji for the object particle を.", answer: "o", accept: ["o", "wo"] },
                { type: "trueFalse", claim: "In 'water を drink', the object comes before the verb.", answer: true },
                { type: "mc", prompt: "How do you say 'I drink water'? (飲みます = nomimasu = drink)", options: ["水は飲みます。", "水が飲みます。", "水を飲みます。", "水の飲みます。"], answer: 2 },
                { type: "trueFalse", claim: "Japanese word order is Subject-Object-Verb.", answer: true }
            ]
        },
        {
            id: "jpn-09",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "The Particle に (time and destination)",
            explanation: [
                { type: "p", text: "に (ni) is a busy particle. Two core uses: it marks a point in time (at 7 o'clock), and it marks a destination (to / into a place, with motion verbs)." },
                { type: "example", ja: "7時に起きます。(Shichi-ji ni okimasu.)", en: "I get up at 7 o'clock." },
                { type: "example", ja: "学校に行きます。(Gakkou ni ikimasu.)", en: "I go to school." },
                { type: "p", text: "に also marks where something exists with あります / います: 'テーブルの上にあります' (it's on the table)." },
                { type: "example", ja: "日本にいます。(Nihon ni imasu.)", en: "I am in Japan." }
            ],
            exercises: [
                { type: "mc", prompt: "Which particle marks a point in time (e.g. 'at 7 o'clock')?", options: ["を (o)", "に (ni)", "は (wa)", "の (no)"], answer: 1 },
                { type: "trueFalse", claim: "に can mark the destination of a motion verb (to a place).", answer: true },
                { type: "type", prompt: "Type the romaji for the particle に.", answer: "ni", accept: ["ni"] },
                { type: "mc", prompt: "How do you say 'I go to school'? (行きます = ikimasu = go)", options: ["学校を行きます。", "学校に行きます。", "学校は行きます。", "学校が行きます。"], answer: 1 },
                { type: "mc", prompt: "に is also used with あります / います to mark...?", options: ["the object", "where something exists", "the topic", "the reason"], answer: 1 },
                { type: "trueFalse", claim: "'7時に' means 'at 7 o'clock'.", answer: true }
            ]
        },
        {
            id: "jpn-10",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "The Particles で and へ",
            explanation: [
                { type: "p", text: "で (de) marks where an action happens (at / in) and also the means (by / with). へ (e) marks direction (toward). As a particle, へ is read 'e', not 'he'." },
                { type: "example", ja: "家で食べます。(Ie de tabemasu.)", en: "I eat at home." },
                { type: "example", ja: "バスで行きます。(Basu de ikimasu.)", en: "I go by bus." },
                { type: "example", ja: "東京へ行きます。(Toukyou e ikimasu.)", en: "I go toward Tokyo." },
                { type: "p", text: "Tip: with に the place is a precise destination; with へ it's more the direction you head. で is about the location of the action itself, not the destination." }
            ],
            exercises: [
                { type: "mc", prompt: "Which particle marks where an action happens (at / in)?", options: ["に (ni)", "で (de)", "へ (e)", "を (o)"], answer: 1 },
                { type: "mc", prompt: "As a particle, へ is pronounced...?", options: ["he", "e", "be", "ke"], answer: 1 },
                { type: "type", prompt: "Type the romaji for the particle で.", answer: "de", accept: ["de"] },
                { type: "trueFalse", claim: "で can also mark the means (by bus, with a pen).", answer: true },
                { type: "mc", prompt: "How do you say 'I eat at home'? (家 = ie = home, 食べます = tabemasu = eat)", options: ["家に食べます。", "家で食べます。", "家を食べます。", "家へ食べます。"], answer: 1 },
                { type: "trueFalse", claim: "へ marks the direction you head toward.", answer: true }
            ]
        },
        {
            id: "jpn-11",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "The Possessive Particle の",
            explanation: [
                { type: "p", text: "の (no) links two nouns to show possession or belonging - 'A の B' means 'A's B' or 'the B of A'. The owner comes first." },
                { type: "example", ja: "私の本 (watashi no hon)", en: "my book (lit. I's book)" },
                { type: "example", ja: "田中さんの車 (Tanaka-san no kuruma)", en: "Mr./Ms. Tanaka's car" },
                { type: "p", text: "の also connects a description: 日本語の先生 = 'a teacher of Japanese'. And it can stand in for a noun already known: 私の (watashi no) = 'mine'." },
                { type: "example", ja: "これは私のです。(Kore wa watashi no desu.)", en: "This is mine." }
            ],
            exercises: [
                { type: "mc", prompt: "What does the particle の show between two nouns?", options: ["the object", "possession / belonging", "a question", "past tense"], answer: 1 },
                { type: "type", prompt: "Type the romaji for the possessive particle の.", answer: "no", accept: ["no"] },
                { type: "mc", prompt: "How do you say 'my book'? (本 = hon = book)", options: ["本の私", "私は本", "私の本", "私を本"], answer: 2 },
                { type: "trueFalse", claim: "In 'A の B', A is the owner and B is the thing owned.", answer: true },
                { type: "mc", prompt: "How would you say 'This is mine'?", options: ["これは私です。", "これは私のです。", "これは私を。", "これは私に。"], answer: 1 },
                { type: "trueFalse", claim: "の can also connect a description, as in '日本語の先生' (teacher of Japanese).", answer: true }
            ]
        },
        {
            id: "jpn-12",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "The Particles と and も",
            explanation: [
                { type: "p", text: "と (to) means 'and' when joining nouns, and 'with' (together with a person). も (mo) means 'also / too' and replaces は, が or を." },
                { type: "example", ja: "パンとコーヒー (pan to koohii)", en: "bread and coffee" },
                { type: "example", ja: "友達と行きます。(Tomodachi to ikimasu.)", en: "I go with a friend." },
                { type: "example", ja: "私も学生です。(Watashi mo gakusei desu.)", en: "I am also a student." },
                { type: "p", text: "Careful: と only joins nouns, never whole sentences. To say 'also', put も where は/が/を would go - 私は → 私も." }
            ],
            exercises: [
                { type: "mc", prompt: "What does と (to) mean when joining two nouns?", options: ["or", "and", "but", "also"], answer: 1 },
                { type: "mc", prompt: "What does も (mo) mean?", options: ["and", "also / too", "with", "from"], answer: 1 },
                { type: "type", prompt: "Type the romaji for the particle と ('and / with').", answer: "to", accept: ["to"] },
                { type: "trueFalse", claim: "と can also mean 'with' (together with a person).", answer: true },
                { type: "mc", prompt: "How do you say 'I am also a student'?", options: ["私は学生です。", "私も学生です。", "私と学生です。", "私が学生です。"], answer: 1 },
                { type: "trueFalse", claim: "も replaces は, が or を in the sentence.", answer: true }
            ]
        },

        // ── Module 2: Numbers ────────────────────────────────────────────
        {
            id: "jpn-13",
            moduleId: "numbers",
            moduleTitle: "Numbers",
            title: "Numbers 1 to 10",
            explanation: [
                { type: "p", text: "The core numbers 1-10. A few have two readings; these are the common ones. 4 and 7 and 9 are the tricky ones (they have alternate readings you'll meet later)." },
                { type: "example", ja: "一 (ichi), 二 (ni), 三 (san)", en: "1, 2, 3" },
                { type: "example", ja: "四 (yon/shi), 五 (go), 六 (roku)", en: "4, 5, 6" },
                { type: "example", ja: "七 (nana/shichi), 八 (hachi)", en: "7, 8" },
                { type: "example", ja: "九 (kyuu/ku), 十 (juu)", en: "9, 10" },
                { type: "p", text: "0 is ゼロ (zero) or 零 (rei)." }
            ],
            exercises: [
                { type: "mc", prompt: "What is 三 (san)?", options: ["2", "3", "4", "5"], answer: 1 },
                { type: "type", prompt: "Type the romaji for the number 5 (五).", answer: "go", accept: ["go"] },
                { type: "mc", prompt: "Which is the number 7?", options: ["roku", "nana", "hachi", "kyuu"], answer: 1 },
                { type: "trueFalse", claim: "十 (juu) means 10.", answer: true },
                { type: "mc", prompt: "What is 八 (hachi)?", options: ["6", "7", "8", "9"], answer: 2 },
                { type: "type", prompt: "Type the romaji for the number 1 (一).", answer: "ichi", accept: ["ichi"] }
            ]
        },
        {
            id: "jpn-14",
            moduleId: "numbers",
            moduleTitle: "Numbers",
            title: "Numbers 11 to 99",
            explanation: [
                { type: "p", text: "Japanese numbers are wonderfully regular. Teens = 十 (juu) + the digit: 11 is 'ten-one'. Tens = digit + 十: 20 is 'two-ten'." },
                { type: "example", ja: "十一 (juu-ichi)", en: "11 (ten-one)" },
                { type: "example", ja: "十五 (juu-go)", en: "15 (ten-five)" },
                { type: "example", ja: "二十 (ni-juu)", en: "20 (two-ten)" },
                { type: "example", ja: "三十五 (san-juu-go)", en: "35 (three-ten-five)" },
                { type: "p", text: "So 99 is just 九十九 (kyuu-juu-kyuu) = 'nine-ten-nine'. No new words to memorize." }
            ],
            exercises: [
                { type: "mc", prompt: "How is 11 built?", options: ["ichi-juu", "juu-ichi", "ni-juu", "juu-juu"], answer: 1 },
                { type: "mc", prompt: "What is 二十 (ni-juu)?", options: ["12", "20", "22", "2"], answer: 1 },
                { type: "type", prompt: "Type the romaji for 35 (三十五).", answer: "sanjuugo", accept: ["sanjuugo", "san juu go", "sanjyuugo"] },
                { type: "trueFalse", claim: "35 is 'three-ten-five' (san-juu-go).", answer: true },
                { type: "mc", prompt: "How do you say 99?", options: ["juu-kyuu", "kyuu-juu", "kyuu-juu-kyuu", "kyuu-kyuu"], answer: 2 },
                { type: "type", prompt: "Type the romaji for 20 (二十).", answer: "nijuu", accept: ["nijuu", "ni juu"] }
            ]
        },
        {
            id: "jpn-15",
            moduleId: "numbers",
            moduleTitle: "Numbers",
            title: "Hundreds, Thousands and Ten-Thousands",
            explanation: [
                { type: "p", text: "100 is 百 (hyaku), 1000 is 千 (sen), and 10,000 is 万 (man) - Japanese counts in units of ten-thousand, so this one is important." },
                { type: "example", ja: "百 (hyaku)", en: "100" },
                { type: "example", ja: "千 (sen)", en: "1,000" },
                { type: "example", ja: "一万 (ichi-man)", en: "10,000" },
                { type: "p", text: "Some readings shift for sound: 300 is 三百 (san-byaku), 600 is 六百 (roppyaku), 800 is 八百 (happyaku). 3000 is 三千 (san-zen)." },
                { type: "example", ja: "五万 (go-man)", en: "50,000" }
            ],
            exercises: [
                { type: "mc", prompt: "What is 百 (hyaku)?", options: ["10", "100", "1,000", "10,000"], answer: 1 },
                { type: "mc", prompt: "What is 万 (man)?", options: ["100", "1,000", "10,000", "100,000"], answer: 2 },
                { type: "type", prompt: "Type the romaji for 1,000 (千).", answer: "sen", accept: ["sen"] },
                { type: "trueFalse", claim: "Japanese groups large numbers in units of ten-thousand (万).", answer: true },
                { type: "mc", prompt: "What is 一万 (ichi-man)?", options: ["1,000", "10,000", "100,000", "1,000,000"], answer: 1 },
                { type: "type", prompt: "Type the romaji for 100 (百).", answer: "hyaku", accept: ["hyaku"] }
            ]
        },
        {
            id: "jpn-16",
            moduleId: "numbers",
            moduleTitle: "Numbers",
            title: "Counting Things: Counters",
            explanation: [
                { type: "p", text: "You can't just say 'two apples' in Japanese - you attach a 'counter' to the number that fits the shape/type of thing. For general objects there's the native set: ひとつ (hitotsu, 1), ふたつ (futatsu, 2), みっつ (mittsu, 3)..." },
                { type: "example", ja: "りんごを三つください。(Ringo o mittsu kudasai.)", en: "Three apples, please." },
                { type: "example", ja: "一つ (hitotsu), 二つ (futatsu)", en: "one thing, two things" },
                { type: "p", text: "There are also specific counters: 本 (hon) for long thin things, 枚 (mai) for flat things, 冊 (satsu) for books, 台 (dai) for machines. You'll meet them as needed." },
                { type: "example", ja: "ビールを二本 (biiru o ni-hon)", en: "two (bottles of) beer" }
            ],
            exercises: [
                { type: "mc", prompt: "Why can't you just say a number + a noun in Japanese?", options: ["numbers are forbidden", "you need a counter that fits the thing", "nouns must be plural", "you must add です"], answer: 1 },
                { type: "type", prompt: "Type the romaji for ひとつ ('one thing').", answer: "hitotsu", accept: ["hitotsu"] },
                { type: "mc", prompt: "Which counter is for long thin things (bottles, pens)?", options: ["枚 (mai)", "本 (hon)", "冊 (satsu)", "台 (dai)"], answer: 1 },
                { type: "trueFalse", claim: "枚 (mai) is used for flat things like paper and tickets.", answer: true },
                { type: "mc", prompt: "What is ふたつ (futatsu)?", options: ["one thing", "two things", "three things", "four things"], answer: 1 },
                { type: "trueFalse", claim: "冊 (satsu) is the counter for books.", answer: true }
            ]
        },
        {
            id: "jpn-17",
            moduleId: "numbers",
            moduleTitle: "Numbers",
            title: "Telling the Time",
            explanation: [
                { type: "p", text: "Hours use the counter 時 (ji): 1時 (ichi-ji) = 1 o'clock. Minutes use 分 (fun/pun): 10分 (juppun) = 10 minutes. To say 'at' a time, add に (ni)." },
                { type: "example", ja: "今何時ですか。(Ima nan-ji desu ka?)", en: "What time is it now?" },
                { type: "example", ja: "3時です。(San-ji desu.)", en: "It's 3 o'clock." },
                { type: "example", ja: "7時半 (shichi-ji han)", en: "7:30 (half past seven)" },
                { type: "p", text: "半 (han) means 'half past'. A few readings shift: 4時 is よ時 (yo-ji), 9時 is く時 (ku-ji)." }
            ],
            exercises: [
                { type: "mc", prompt: "Which counter is used for the hour?", options: ["分 (fun)", "時 (ji)", "半 (han)", "円 (en)"], answer: 1 },
                { type: "mc", prompt: "What does 半 (han) mean when telling time?", options: ["o'clock", "half past", "minute", "midnight"], answer: 1 },
                { type: "type", prompt: "Type the romaji for '3 o'clock' (三時).", answer: "sanji", accept: ["sanji", "san ji"] },
                { type: "trueFalse", claim: "何時ですか (nan-ji desu ka) means 'What time is it?'", answer: true },
                { type: "mc", prompt: "How do you say 'at 7 o'clock'?", options: ["7時を", "7時に", "7時は", "7時の"], answer: 1 },
                { type: "type", prompt: "Type the romaji for the minute counter 分 as in '10分' (juppun).", answer: "fun", accept: ["fun", "pun"] }
            ]
        },
        {
            id: "jpn-18",
            moduleId: "numbers",
            moduleTitle: "Numbers",
            title: "Money and Prices",
            explanation: [
                { type: "p", text: "Japanese money is the yen, written 円 and read 'en'. Prices just put the number before 円." },
                { type: "example", ja: "百円 (hyaku-en)", en: "100 yen" },
                { type: "example", ja: "千円 (sen-en)", en: "1,000 yen" },
                { type: "example", ja: "いくらですか。(Ikura desu ka?)", en: "How much is it?" },
                { type: "p", text: "To ask a price, use いくら (ikura, 'how much'). 五百円 (go-hyaku-en) = 500 yen." },
                { type: "example", ja: "五百円です。(Go-hyaku-en desu.)", en: "It's 500 yen." }
            ],
            exercises: [
                { type: "mc", prompt: "How is 円 ('yen') read?", options: ["yen", "en", "man", "ju"], answer: 1 },
                { type: "mc", prompt: "Which word asks 'how much (does it cost)'?", options: ["いくつ (ikutsu)", "いくら (ikura)", "どこ (doko)", "だれ (dare)"], answer: 1 },
                { type: "type", prompt: "Type the romaji for いくら ('how much').", answer: "ikura", accept: ["ikura"] },
                { type: "trueFalse", claim: "千円 (sen-en) means 1,000 yen.", answer: true },
                { type: "mc", prompt: "How do you say 'It's 500 yen'?", options: ["五百円です。", "五百円ですか。", "五百円でした。", "五百円じゃありません。"], answer: 0 },
                { type: "type", prompt: "Type the romaji for the money unit 円.", answer: "en", accept: ["en", "yen"] }
            ]
        },

        // ── Module 3: Nouns & Counters ───────────────────────────────────
        {
            id: "jpn-19",
            moduleId: "nouns",
            moduleTitle: "Nouns & Counters",
            title: "No Articles, No Gender, No Plural",
            explanation: [
                { type: "p", text: "Japanese nouns are simple: there is no 'a' or 'the', no masculine/feminine, and normally no plural ending. 本 (hon) can mean 'book', 'a book', 'the book' or 'books' - context decides." },
                { type: "example", ja: "本 (hon)", en: "book / a book / the book / books" },
                { type: "example", ja: "猫 (neko)", en: "cat / cats" },
                { type: "p", text: "If you really need to show plural you add a counter with a number (三冊の本 = three books) or, for people, たち (子供たち = children). But you rarely need to." },
                { type: "example", ja: "学生 (gakusei)", en: "student / students" }
            ],
            exercises: [
                { type: "mc", prompt: "Which of these does Japanese NOT have?", options: ["nouns", "articles like 'a' / 'the'", "particles", "verbs"], answer: 1 },
                { type: "trueFalse", claim: "Japanese nouns have grammatical gender (masculine/feminine).", answer: false },
                { type: "mc", prompt: "How does Japanese usually show that a noun is plural?", options: ["it adds -s", "it usually doesn't - context decides", "it changes the vowel", "it adds です"], answer: 1 },
                { type: "type", prompt: "Type the romaji for 本 ('book').", answer: "hon", accept: ["hon"] },
                { type: "mc", prompt: "How can you mark plural for people?", options: ["add を", "add たち (tachi)", "add か", "add の"], answer: 1 },
                { type: "trueFalse", claim: "猫 (neko) can mean 'cat' or 'cats' depending on context.", answer: true }
            ]
        },
        {
            id: "jpn-20",
            moduleId: "nouns",
            moduleTitle: "Nouns & Counters",
            title: "This and That: これ・それ・あれ",
            explanation: [
                { type: "p", text: "Japanese has a neat three-way distance system for 'this/that'. これ (kore) = this (near me), それ (sore) = that (near you), あれ (are) = that over there (away from both)." },
                { type: "example", ja: "これは本です。(Kore wa hon desu.)", en: "This is a book. (near me)" },
                { type: "example", ja: "それはペンです。(Sore wa pen desu.)", en: "That is a pen. (near you)" },
                { type: "example", ja: "あれは車です。(Are wa kuruma desu.)", en: "That over there is a car." },
                { type: "p", text: "The matching question word is どれ (dore) = 'which one'." }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'this (near me)'?", options: ["これ (kore)", "それ (sore)", "あれ (are)", "どれ (dore)"], answer: 0 },
                { type: "mc", prompt: "Which means 'that over there (away from both)'?", options: ["これ (kore)", "それ (sore)", "あれ (are)", "どれ (dore)"], answer: 2 },
                { type: "type", prompt: "Type the romaji for これ ('this').", answer: "kore", accept: ["kore"] },
                { type: "trueFalse", claim: "それ (sore) means 'that near the listener'.", answer: true },
                { type: "mc", prompt: "What does どれ (dore) mean?", options: ["this", "that", "which one", "where"], answer: 2 },
                { type: "trueFalse", claim: "Japanese distinguishes three distances for 'this/that'.", answer: true }
            ]
        },
        {
            id: "jpn-21",
            moduleId: "nouns",
            moduleTitle: "Nouns & Counters",
            title: "この・その・あの and ここ・そこ・あそこ",
            explanation: [
                { type: "p", text: "これ/それ/あれ stand alone ('this one'). To say 'this book', use この/その/あの + a noun. And for places, use ここ/そこ/あそこ ('here / there / over there')." },
                { type: "example", ja: "この本 (kono hon)", en: "this book" },
                { type: "example", ja: "その車 (sono kuruma)", en: "that car (near you)" },
                { type: "example", ja: "あの人 (ano hito)", en: "that person over there" },
                { type: "example", ja: "ここ / そこ / あそこ (koko / soko / asoko)", en: "here / there / over there" },
                { type: "p", text: "The place question word is どこ (doko) = 'where'." }
            ],
            exercises: [
                { type: "mc", prompt: "How do you say 'this book'?", options: ["これ本", "この本", "ここ本", "どの本"], answer: 1 },
                { type: "mc", prompt: "この/その/あの must be followed by...?", options: ["a verb", "a noun", "です", "か"], answer: 1 },
                { type: "type", prompt: "Type the romaji for ここ ('here').", answer: "koko", accept: ["koko"] },
                { type: "mc", prompt: "Which word means 'where'?", options: ["どれ (dore)", "どこ (doko)", "だれ (dare)", "どの (dono)"], answer: 1 },
                { type: "trueFalse", claim: "あそこ (asoko) means 'over there'.", answer: true },
                { type: "trueFalse", claim: "あの人 (ano hito) means 'that person over there'.", answer: true }
            ]
        },
        {
            id: "jpn-22",
            moduleId: "nouns",
            moduleTitle: "Nouns & Counters",
            title: "Counting People: ～人",
            explanation: [
                { type: "p", text: "People are counted with 人 (nin), but the first two are irregular: 一人 (hitori) = one person, 二人 (futari) = two people. From three on it's regular: 三人 (san-nin)." },
                { type: "example", ja: "一人 (hitori)", en: "one person / alone" },
                { type: "example", ja: "二人 (futari)", en: "two people" },
                { type: "example", ja: "三人 (san-nin)", en: "three people" },
                { type: "p", text: "To ask 'how many people', use 何人 (nan-nin)." },
                { type: "example", ja: "家族は四人です。(Kazoku wa yo-nin desu.)", en: "My family is four people." }
            ],
            exercises: [
                { type: "mc", prompt: "How do you say 'one person'?", options: ["ichi-nin", "hitori", "hitotsu", "ichi-ji"], answer: 1 },
                { type: "mc", prompt: "How do you say 'two people'?", options: ["ni-nin", "futari", "futatsu", "ni-ji"], answer: 1 },
                { type: "type", prompt: "Type the romaji for 三人 ('three people').", answer: "sannin", accept: ["sannin", "san nin"] },
                { type: "trueFalse", claim: "何人 (nan-nin) asks 'how many people'.", answer: true },
                { type: "mc", prompt: "The counter for people is...?", options: ["本 (hon)", "人 (nin)", "枚 (mai)", "つ (tsu)"], answer: 1 },
                { type: "trueFalse", claim: "From three onward, counting people is regular (san-nin, yo-nin...).", answer: true }
            ]
        },
        {
            id: "jpn-23",
            moduleId: "nouns",
            moduleTitle: "Nouns & Counters",
            title: "Whose? だれの and の as a Pronoun",
            explanation: [
                { type: "p", text: "To ask 'whose', use だれの (dare no) = 'whose'. And remember from the の lesson that の can stand in for a noun you've already mentioned, working like 'mine/yours/the red one'." },
                { type: "example", ja: "これはだれの本ですか。(Kore wa dare no hon desu ka?)", en: "Whose book is this?" },
                { type: "example", ja: "それは私のです。(Sore wa watashi no desu.)", en: "That is mine." },
                { type: "example", ja: "赤いのをください。(Akai no o kudasai.)", en: "The red one, please." },
                { type: "p", text: "So 私の can mean either 'my (something)' or, on its own, 'mine'." }
            ],
            exercises: [
                { type: "mc", prompt: "How do you ask 'whose'?", options: ["だれが (dare ga)", "だれの (dare no)", "だれを (dare o)", "だれに (dare ni)"], answer: 1 },
                { type: "type", prompt: "Type the romaji for だれの ('whose').", answer: "dare no", accept: ["dareno", "dare no"] },
                { type: "mc", prompt: "In '私のです', の works like...?", options: ["a question mark", "the word 'mine'", "the past tense", "a counter"], answer: 1 },
                { type: "trueFalse", claim: "'赤いの' means 'the red one', with の replacing a known noun.", answer: true },
                { type: "mc", prompt: "How do you say 'That is mine'?", options: ["それは私です。", "それは私のです。", "それは私を。", "それは私に。"], answer: 1 },
                { type: "trueFalse", claim: "私の can mean 'mine' on its own.", answer: true }
            ]
        },

        // ── Module 4: Adjectives ─────────────────────────────────────────
        {
            id: "jpn-24",
            moduleId: "adjectives",
            moduleTitle: "Adjectives",
            title: "i-Adjectives",
            explanation: [
                { type: "p", text: "Japanese has two kinds of adjectives. The first, 'i-adjectives', end in い (i) in their dictionary form. They can sit right before a noun or at the end with です." },
                { type: "example", ja: "大きい (ookii)", en: "big" },
                { type: "example", ja: "高い山 (takai yama)", en: "a high mountain" },
                { type: "example", ja: "この本は面白いです。(Kono hon wa omoshiroi desu.)", en: "This book is interesting." },
                { type: "p", text: "Note: です after an i-adjective adds politeness but does NOT change the adjective - the い stays. 高いです, not 高いだです." }
            ],
            exercises: [
                { type: "mc", prompt: "i-adjectives end in which sound (dictionary form)?", options: ["う (u)", "い (i)", "な (na)", "だ (da)"], answer: 1 },
                { type: "type", prompt: "Type the romaji for 大きい ('big').", answer: "ookii", accept: ["ookii", "ooki"] },
                { type: "mc", prompt: "How do you say 'a high mountain'? (山 = yama = mountain)", options: ["山高い", "高い山", "高いの山", "山は高い"], answer: 1 },
                { type: "trueFalse", claim: "Adding です to an i-adjective changes its ending.", answer: false },
                { type: "mc", prompt: "Which is an i-adjective?", options: ["静か (shizuka)", "面白い (omoshiroi)", "元気 (genki)", "好き (suki)"], answer: 1 },
                { type: "trueFalse", claim: "An i-adjective can come directly before a noun.", answer: true }
            ]
        },
        {
            id: "jpn-25",
            moduleId: "adjectives",
            moduleTitle: "Adjectives",
            title: "na-Adjectives",
            explanation: [
                { type: "p", text: "The second kind, 'na-adjectives', don't end in い. When they go before a noun they take な (na) - that's where the name comes from. At the end of a sentence they just take です." },
                { type: "example", ja: "きれいな花 (kirei na hana)", en: "a pretty flower" },
                { type: "example", ja: "静かな町 (shizuka na machi)", en: "a quiet town" },
                { type: "example", ja: "この町は静かです。(Kono machi wa shizuka desu.)", en: "This town is quiet." },
                { type: "p", text: "So the な only appears when the adjective is directly in front of a noun. At sentence end, no な - just です." }
            ],
            exercises: [
                { type: "mc", prompt: "What do na-adjectives add before a noun?", options: ["い (i)", "な (na)", "の (no)", "だ (da)"], answer: 1 },
                { type: "type", prompt: "Type the romaji for 静か ('quiet').", answer: "shizuka", accept: ["shizuka"] },
                { type: "mc", prompt: "How do you say 'a pretty flower'? (花 = hana = flower)", options: ["きれい花", "きれいな花", "きれいの花", "花きれい"], answer: 1 },
                { type: "trueFalse", claim: "At the end of a sentence, a na-adjective still needs な before です.", answer: false },
                { type: "mc", prompt: "Which is a na-adjective?", options: ["高い (takai)", "面白い (omoshiroi)", "きれい (kirei)", "小さい (chiisai)"], answer: 2 },
                { type: "trueFalse", claim: "な only appears when the adjective comes right before a noun.", answer: true }
            ]
        },
        {
            id: "jpn-26",
            moduleId: "adjectives",
            moduleTitle: "Adjectives",
            title: "Negative Adjectives",
            explanation: [
                { type: "p", text: "To make an i-adjective negative, drop the final い and add くないです (kunai desu): 高い → 高くないです ('is not expensive')." },
                { type: "example", ja: "高くないです。(Takaku nai desu.)", en: "It's not expensive." },
                { type: "p", text: "For na-adjectives (and nouns), it's the same as the copula: replace です with じゃありません." },
                { type: "example", ja: "静かじゃありません。(Shizuka ja arimasen.)", en: "It's not quiet." },
                { type: "p", text: "Watch out for the exception いい (ii, 'good') - its negative is 良くないです (yoku nai desu), not 'iikunai'." }
            ],
            exercises: [
                { type: "mc", prompt: "To make an i-adjective negative, you...?", options: ["add じゃありません", "drop い and add くないです", "add な", "add でした"], answer: 1 },
                { type: "type", prompt: "Type the romaji for 高くない ('not expensive / not high').", answer: "takakunai", accept: ["takakunai", "takaku nai"] },
                { type: "mc", prompt: "How do you make a na-adjective negative?", options: ["drop い", "add くない", "replace です with じゃありません", "add な"], answer: 2 },
                { type: "trueFalse", claim: "The negative of いい ('good') is 良くない (yoku nai), not 'iikunai'.", answer: true },
                { type: "mc", prompt: "How do you say 'It's not quiet'? (静か = shizuka = quiet)", options: ["静かくないです。", "静かじゃありません。", "静かでした。", "静かないです。"], answer: 1 },
                { type: "trueFalse", claim: "You always negate i-adjectives with じゃありません.", answer: false }
            ]
        },
        {
            id: "jpn-27",
            moduleId: "adjectives",
            moduleTitle: "Adjectives",
            title: "Past-Tense Adjectives",
            explanation: [
                { type: "p", text: "i-adjectives carry their own past tense: drop い and add かったです (katta desu). 高い → 高かったです ('was expensive')." },
                { type: "example", ja: "楽しかったです。(Tanoshikatta desu.)", en: "It was fun." },
                { type: "example", ja: "寒かったです。(Samukatta desu.)", en: "It was cold." },
                { type: "p", text: "na-adjectives and nouns use でした instead: 静かでした ('was quiet')." },
                { type: "example", ja: "きれいでした。(Kirei deshita.)", en: "It was pretty." }
            ],
            exercises: [
                { type: "mc", prompt: "Past tense of an i-adjective is formed by...?", options: ["adding でした", "dropping い and adding かったです", "adding くない", "adding な"], answer: 1 },
                { type: "type", prompt: "Type the romaji for 寒かった ('was cold').", answer: "samukatta", accept: ["samukatta"] },
                { type: "mc", prompt: "How do na-adjectives form the past?", options: ["add かった", "use でした", "drop な", "add くない"], answer: 1 },
                { type: "trueFalse", claim: "楽しかったです means 'It was fun'.", answer: true },
                { type: "mc", prompt: "How do you say 'It was pretty'? (きれい = kirei = pretty)", options: ["きれいかったです。", "きれいでした。", "きれくなかったです。", "きれいです。"], answer: 1 },
                { type: "trueFalse", claim: "i-adjectives have their own past-tense ending, without でした.", answer: true }
            ]
        },
        {
            id: "jpn-28",
            moduleId: "adjectives",
            moduleTitle: "Adjectives",
            title: "Connecting Adjectives",
            explanation: [
                { type: "p", text: "To string two adjectives together ('big and new'), i-adjectives change い → くて: 大きい → 大きくて. na-adjectives and nouns add で." },
                { type: "example", ja: "大きくて新しい家 (ookikute atarashii ie)", en: "a big and new house" },
                { type: "example", ja: "静かできれいな町 (shizuka de kirei na machi)", en: "a quiet and pretty town" },
                { type: "p", text: "The last adjective in the chain keeps its normal ending; only the ones before it change to くて / で." },
                { type: "example", ja: "安くておいしいです。(Yasukute oishii desu.)", en: "It's cheap and delicious." }
            ],
            exercises: [
                { type: "mc", prompt: "To connect i-adjectives, い changes to...?", options: ["くて (kute)", "な (na)", "で (de)", "かった (katta)"], answer: 0 },
                { type: "mc", prompt: "How do na-adjectives connect to a following adjective?", options: ["add くて", "add で", "add い", "add かった"], answer: 1 },
                { type: "type", prompt: "Type the romaji for 大きくて ('big and...').", answer: "ookikute", accept: ["ookikute"] },
                { type: "trueFalse", claim: "Only the adjectives before the last one change to くて / で.", answer: true },
                { type: "mc", prompt: "How do you say 'cheap and delicious'? (安い = yasui = cheap, おいしい = oishii = delicious)", options: ["安いおいしい", "安くておいしい", "安いでおいしい", "安なおいしい"], answer: 1 },
                { type: "trueFalse", claim: "'静かできれいな町' means 'a quiet and pretty town'.", answer: true }
            ]
        },

        // ── Module 5: Verbs ──────────────────────────────────────────────
        {
            id: "jpn-29",
            moduleId: "verbs",
            moduleTitle: "Verbs",
            title: "The Polite ます Form",
            explanation: [
                { type: "p", text: "The polite present/future of a verb ends in ます (masu). This one form covers both 'I do' and 'I will do' - Japanese doesn't split present and future. Crucially, ます does NOT change for person: 食べます is 'I/you/he/we/they eat'." },
                { type: "example", ja: "食べます (tabemasu)", en: "eat / will eat" },
                { type: "example", ja: "飲みます (nomimasu)", en: "drink / will drink" },
                { type: "example", ja: "行きます (ikimasu)", en: "go / will go" },
                { type: "p", text: "And the verb always comes last in the sentence." },
                { type: "example", ja: "私はお茶を飲みます。(Watashi wa ocha o nomimasu.)", en: "I drink tea." }
            ],
            exercises: [
                { type: "mc", prompt: "The polite verb ending ます covers which tenses?", options: ["only present", "only future", "present and future", "only past"], answer: 2 },
                { type: "trueFalse", claim: "ます changes depending on who the subject is.", answer: false },
                { type: "type", prompt: "Type the romaji for 食べます ('eat').", answer: "tabemasu", accept: ["tabemasu"] },
                { type: "mc", prompt: "Where does the verb go in a Japanese sentence?", options: ["first", "second", "at the end", "anywhere"], answer: 2 },
                { type: "mc", prompt: "How do you say 'I drink tea'? (お茶 = ocha = tea)", options: ["私はお茶飲みます。", "私はお茶を飲みます。", "私は飲みますお茶を。", "飲みます私はお茶を。"], answer: 1 },
                { type: "trueFalse", claim: "行きます (ikimasu) can mean both 'I go' and 'I will go'.", answer: true }
            ]
        },
        {
            id: "jpn-30",
            moduleId: "verbs",
            moduleTitle: "Verbs",
            title: "Negative and Past of ます",
            explanation: [
                { type: "p", text: "The ます-form conjugates by swapping the ending. Negative = ません (masen). Past = ました (mashita). Past negative = ませんでした (masen deshita)." },
                { type: "example", ja: "食べます → 食べません (tabemasen)", en: "eat → don't eat" },
                { type: "example", ja: "食べます → 食べました (tabemashita)", en: "eat → ate" },
                { type: "example", ja: "食べます → 食べませんでした (tabemasen deshita)", en: "eat → didn't eat" },
                { type: "p", text: "So the verb stem stays put and only the ます part changes. Four forms: ます / ません / ました / ませんでした." }
            ],
            exercises: [
                { type: "mc", prompt: "What is the negative of ます?", options: ["ました (mashita)", "ません (masen)", "ましょう (mashou)", "ませんでした"], answer: 1 },
                { type: "mc", prompt: "What is the past of ます?", options: ["ません (masen)", "ました (mashita)", "ましょう (mashou)", "ます (masu)"], answer: 1 },
                { type: "type", prompt: "Type the romaji for 食べました ('ate').", answer: "tabemashita", accept: ["tabemashita"] },
                { type: "mc", prompt: "How do you say 'didn't eat'?", options: ["食べません", "食べました", "食べませんでした", "食べます"], answer: 2 },
                { type: "trueFalse", claim: "When conjugating, only the ます part changes; the stem stays the same.", answer: true },
                { type: "trueFalse", claim: "飲みませんでした means 'didn't drink'.", answer: true }
            ]
        },
        {
            id: "jpn-31",
            moduleId: "verbs",
            moduleTitle: "Verbs",
            title: "The Three Verb Groups & Dictionary Form",
            explanation: [
                { type: "p", text: "Verbs come in three groups. Group 2 ('ru-verbs') end in eru/iru and just drop る: 食べる → 食べます. Group 1 ('u-verbs') change the final -u sound to -i before ます: 飲む → 飲みます. Group 3 is the two irregulars: する (suru → shimasu, 'do') and 来る (kuru → kimasu, 'come')." },
                { type: "example", ja: "食べる → 食べます (taberu → tabemasu)", en: "to eat (Group 2)" },
                { type: "example", ja: "飲む → 飲みます (nomu → nomimasu)", en: "to drink (Group 1)" },
                { type: "example", ja: "する → します (suru → shimasu)", en: "to do (Group 3)" },
                { type: "p", text: "The plain 'dictionary form' (食べる, 飲む, する) is what you'll find in a dictionary and what you'll build casual speech from later." }
            ],
            exercises: [
                { type: "mc", prompt: "Which are the two irregular (Group 3) verbs?", options: ["食べる and 飲む", "する and 来る", "行く and 見る", "ある and いる"], answer: 1 },
                { type: "type", prompt: "Type the romaji for the dictionary form 食べる ('to eat').", answer: "taberu", accept: ["taberu"] },
                { type: "mc", prompt: "する becomes which ます-form?", options: ["すます", "します", "しります", "すいます"], answer: 1 },
                { type: "trueFalse", claim: "The 'dictionary form' is the plain form you look up in a dictionary.", answer: true },
                { type: "mc", prompt: "飲む (Group 1) becomes...?", options: ["飲むます", "飲みます", "飲めます", "飲まます"], answer: 1 },
                { type: "trueFalse", claim: "来る ('to come') becomes 来ます (kimasu).", answer: true }
            ]
        },
        {
            id: "jpn-32",
            moduleId: "verbs",
            moduleTitle: "Verbs",
            title: "There Is / There Are: あります and います",
            explanation: [
                { type: "p", text: "Japanese has two verbs for 'there is / exists', chosen by what exists. あります (arimasu) for non-living things (objects, plants), います (imasu) for living things that move (people, animals)." },
                { type: "example", ja: "本があります。(Hon ga arimasu.)", en: "There is a book." },
                { type: "example", ja: "猫がいます。(Neko ga imasu.)", en: "There is a cat." },
                { type: "p", text: "The thing that exists takes が, and the place takes に: 机の上に本があります ('there's a book on the desk')." },
                { type: "example", ja: "私は時間がありません。(Watashi wa jikan ga arimasen.)", en: "I don't have time." }
            ],
            exercises: [
                { type: "mc", prompt: "Which verb is used for a non-living thing (a book)?", options: ["います (imasu)", "あります (arimasu)", "します (shimasu)", "きます (kimasu)"], answer: 1 },
                { type: "mc", prompt: "Which verb is used for a living, moving thing (a cat)?", options: ["あります (arimasu)", "います (imasu)", "です (desu)", "なります (narimasu)"], answer: 1 },
                { type: "type", prompt: "Type the romaji for あります ('there is', non-living).", answer: "arimasu", accept: ["arimasu"] },
                { type: "trueFalse", claim: "The thing that exists is marked with が.", answer: true },
                { type: "mc", prompt: "How do you say 'There is a cat'? (猫 = neko = cat)", options: ["猫があります。", "猫がいます。", "猫をいます。", "猫はあります。"], answer: 1 },
                { type: "trueFalse", claim: "あります can also express 'to have' (as in 'I don't have time').", answer: true }
            ]
        },
        {
            id: "jpn-33",
            moduleId: "verbs",
            moduleTitle: "Verbs",
            title: "The て-Form",
            explanation: [
                { type: "p", text: "The て-form (te-form) is a connecting form used for requests, linking actions, and the continuous tense. Group 2: drop る add て (食べる → 食べて). する → して, 来る → 来て." },
                { type: "example", ja: "食べる → 食べて (taberu → tabete)", en: "eat → and eat / eating" },
                { type: "example", ja: "行く → 行って (iku → itte)", en: "go → and go" },
                { type: "example", ja: "飲む → 飲んで (nomu → nonde)", en: "drink → and drink" },
                { type: "p", text: "Group 1 endings shift for sound (く→いて, む/ぶ/ぬ→んで, う/つ/る→って). It takes practice, but the te-form unlocks a lot of grammar." }
            ],
            exercises: [
                { type: "mc", prompt: "What is the て-form mainly used for?", options: ["only the past tense", "connecting actions, requests, continuous", "counting", "asking prices"], answer: 1 },
                { type: "type", prompt: "Type the romaji for 食べて (te-form of 'eat').", answer: "tabete", accept: ["tabete"] },
                { type: "mc", prompt: "する becomes which て-form?", options: ["すて", "して", "しって", "せて"], answer: 1 },
                { type: "trueFalse", claim: "The て-form of 行く is 行って (itte).", answer: true },
                { type: "mc", prompt: "飲む becomes which て-form?", options: ["飲みて", "飲んで", "飲って", "飲いて"], answer: 1 },
                { type: "trueFalse", claim: "The te-form unlocks other grammar like requests and the continuous.", answer: true }
            ]
        },
        {
            id: "jpn-34",
            moduleId: "verbs",
            moduleTitle: "Verbs",
            title: "Requests and Continuous: ～てください / ～ています",
            explanation: [
                { type: "p", text: "Add ください (kudasai) to the te-form to make a polite request: 'please do X'. Add います (imasu) for the present continuous: 'is doing X'." },
                { type: "example", ja: "見てください。(Mite kudasai.)", en: "Please look." },
                { type: "example", ja: "待ってください。(Matte kudasai.)", en: "Please wait." },
                { type: "example", ja: "食べています。(Tabete imasu.)", en: "I am eating." },
                { type: "p", text: "So the te-form + ください = a request, and te-form + います = an ongoing action." }
            ],
            exercises: [
                { type: "mc", prompt: "て-form + ください makes...?", options: ["a past tense", "a polite request", "a question", "a negative"], answer: 1 },
                { type: "mc", prompt: "て-form + います makes...?", options: ["a request", "the present continuous ('is ~ing')", "the past", "a command"], answer: 1 },
                { type: "type", prompt: "Type the romaji for 待ってください ('please wait').", answer: "matte kudasai", accept: ["mattekudasai", "matte kudasai"] },
                { type: "trueFalse", claim: "食べています means 'I am eating'.", answer: true },
                { type: "mc", prompt: "How do you say 'Please look'? (見て = mite = te-form of 'look')", options: ["見てます。", "見てください。", "見ました。", "見ています。"], answer: 1 },
                { type: "trueFalse", claim: "ください attaches to the te-form to soften a request.", answer: true }
            ]
        },

        // ── Module 6: Sentence Structure ─────────────────────────────────
        {
            id: "jpn-35",
            moduleId: "syntax",
            moduleTitle: "Sentence Structure",
            title: "Word Order: Subject-Object-Verb",
            explanation: [
                { type: "p", text: "Japanese is a Subject-Object-Verb (SOV) language: the verb always comes at the very end. Because particles mark each word's role, the other parts can be reordered fairly freely - but the verb stays last." },
                { type: "example", ja: "私はパンを食べます。(Watashi wa pan o tabemasu.)", en: "I eat bread. (I-topic bread-object eat)" },
                { type: "example", ja: "田中さんは日本語を話します。(Tanaka-san wa nihongo o hanashimasu.)", en: "Mr./Ms. Tanaka speaks Japanese." },
                { type: "p", text: "Contrast with English (SVO). The particle, not the position, tells you who does what - so 'bread' with を is the object no matter where it sits." }
            ],
            exercises: [
                { type: "mc", prompt: "What is Japanese basic word order?", options: ["Subject-Verb-Object", "Subject-Object-Verb", "Verb-Subject-Object", "Object-Verb-Subject"], answer: 1 },
                { type: "trueFalse", claim: "In Japanese the verb comes at the end of the sentence.", answer: true },
                { type: "mc", prompt: "What tells you a word's role in the sentence?", options: ["its position only", "the particle attached to it", "its length", "capital letters"], answer: 1 },
                { type: "type", prompt: "Type the romaji for 話します ('speak').", answer: "hanashimasu", accept: ["hanashimasu"] },
                { type: "mc", prompt: "Which order is correct for 'I eat bread'?", options: ["食べます私はパンを。", "私はパンを食べます。", "パンを私は食べます食べ。", "食べますパンを私は。"], answer: 1 },
                { type: "trueFalse", claim: "Because particles mark roles, non-verb parts can be reordered fairly freely.", answer: true }
            ]
        },
        {
            id: "jpn-36",
            moduleId: "syntax",
            moduleTitle: "Sentence Structure",
            title: "Question Words",
            explanation: [
                { type: "p", text: "Japanese asks 'what / who / where / when / why / how' with question words, and still ends the sentence with か. The word order does not change - the question word just sits where the answer would go." },
                { type: "example", ja: "何 (nani/nan)", en: "what" },
                { type: "example", ja: "誰 (dare)", en: "who" },
                { type: "example", ja: "どこ (doko) / いつ (itsu)", en: "where / when" },
                { type: "example", ja: "どうして (doushite) / どう (dou)", en: "why / how" },
                { type: "p", text: "Example: 'これは何ですか。' (Kore wa nan desu ka?) = 'What is this?'" }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'what'?", options: ["誰 (dare)", "何 (nani)", "どこ (doko)", "いつ (itsu)"], answer: 1 },
                { type: "mc", prompt: "Which word means 'when'?", options: ["どこ (doko)", "いつ (itsu)", "どう (dou)", "何 (nani)"], answer: 1 },
                { type: "type", prompt: "Type the romaji for 誰 ('who').", answer: "dare", accept: ["dare"] },
                { type: "trueFalse", claim: "A question with a question word still ends in か.", answer: true },
                { type: "mc", prompt: "How do you say 'What is this?'", options: ["これは何ですか。", "これは誰ですか。", "これはどこですか。", "これはいつですか。"], answer: 0 },
                { type: "trueFalse", claim: "どうして (doushite) means 'why'.", answer: true }
            ]
        },
        {
            id: "jpn-37",
            moduleId: "syntax",
            moduleTitle: "Sentence Structure",
            title: "How Much / How Many",
            explanation: [
                { type: "p", text: "いくら (ikura) asks 'how much (money)'. いくつ (ikutsu) asks 'how many (general things)' or 'how old'. For specific counters you use 何 + counter: 何人 (how many people), 何時 (what time), 何枚 (how many flat things)." },
                { type: "example", ja: "これはいくらですか。(Kore wa ikura desu ka?)", en: "How much is this?" },
                { type: "example", ja: "りんごをいくつ買いますか。(Ringo o ikutsu kaimasu ka?)", en: "How many apples will you buy?" },
                { type: "example", ja: "何人ですか。(Nan-nin desu ka?)", en: "How many people?" },
                { type: "p", text: "So 何 (nan) + a counter is the go-to for 'how many' of a specific thing." }
            ],
            exercises: [
                { type: "mc", prompt: "Which word asks 'how much (money)'?", options: ["いくつ (ikutsu)", "いくら (ikura)", "何 (nani)", "どこ (doko)"], answer: 1 },
                { type: "mc", prompt: "Which word asks 'how many (general things)'?", options: ["いくら (ikura)", "いくつ (ikutsu)", "いつ (itsu)", "どう (dou)"], answer: 1 },
                { type: "type", prompt: "Type the romaji for いくら ('how much').", answer: "ikura", accept: ["ikura"] },
                { type: "trueFalse", claim: "何人 (nan-nin) asks 'how many people'.", answer: true },
                { type: "mc", prompt: "To ask 'how many' of a specific thing, you use...?", options: ["いくら + counter", "何 + counter", "どこ + counter", "だれ + counter"], answer: 1 },
                { type: "trueFalse", claim: "いくつ can also ask someone's age.", answer: true }
            ]
        },
        {
            id: "jpn-38",
            moduleId: "syntax",
            moduleTitle: "Sentence Structure",
            title: "From / Until and Because",
            explanation: [
                { type: "p", text: "から (kara) means 'from' (a place or time) and まで (made) means 'until / to'. Together they mark a range." },
                { type: "example", ja: "9時から5時まで (ku-ji kara go-ji made)", en: "from 9 o'clock until 5 o'clock" },
                { type: "example", ja: "東京から大阪まで (Toukyou kara Oosaka made)", en: "from Tokyo to Osaka" },
                { type: "p", text: "から also means 'because' when it follows a whole clause: 高いから、買いません ('Because it's expensive, I won't buy it')." },
                { type: "example", ja: "忙しいから、行きません。(Isogashii kara, ikimasen.)", en: "Because I'm busy, I won't go." }
            ],
            exercises: [
                { type: "mc", prompt: "What does から (kara) mean after a place or time?", options: ["until", "from", "with", "also"], answer: 1 },
                { type: "mc", prompt: "What does まで (made) mean?", options: ["from", "until / to", "because", "and"], answer: 1 },
                { type: "type", prompt: "Type the romaji for まで ('until / to').", answer: "made", accept: ["made"] },
                { type: "trueFalse", claim: "から after a whole clause can mean 'because'.", answer: true },
                { type: "mc", prompt: "How do you say 'from 9 to 5'?", options: ["9時まで5時から", "9時から5時まで", "9時と5時", "9時に5時に"], answer: 1 },
                { type: "trueFalse", claim: "'忙しいから、行きません' means 'Because I'm busy, I won't go'.", answer: true }
            ]
        },
        {
            id: "jpn-39",
            moduleId: "syntax",
            moduleTitle: "Sentence Structure",
            title: "Connecting Sentences",
            explanation: [
                { type: "p", text: "To join full sentences, Japanese uses connecting words at the start of the second sentence: そして (soshite, 'and / and then'), でも (demo, 'but'), だから (dakara, 'so / therefore')." },
                { type: "example", ja: "コーヒーを飲みます。そして、パンを食べます。(...Soshite, pan o tabemasu.)", en: "I drink coffee. And I eat bread." },
                { type: "example", ja: "高いです。でも、買います。(Takai desu. Demo, kaimasu.)", en: "It's expensive. But I'll buy it." },
                { type: "example", ja: "雨です。だから、行きません。(Ame desu. Dakara, ikimasen.)", en: "It's raining. So I won't go." },
                { type: "p", text: "Remember: と ('and') only joins nouns; to join sentences you need そして / でも / だから." }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'but' between sentences?", options: ["そして (soshite)", "でも (demo)", "だから (dakara)", "から (kara)"], answer: 1 },
                { type: "mc", prompt: "Which word means 'and / and then' between sentences?", options: ["でも (demo)", "そして (soshite)", "だから (dakara)", "と (to)"], answer: 1 },
                { type: "type", prompt: "Type the romaji for でも ('but').", answer: "demo", accept: ["demo"] },
                { type: "trueFalse", claim: "だから means 'so / therefore'.", answer: true },
                { type: "mc", prompt: "To join two full sentences with 'and', you use...?", options: ["と (to)", "そして (soshite)", "の (no)", "も (mo)"], answer: 1 },
                { type: "trueFalse", claim: "と ('and') can join two full sentences.", answer: false }
            ]
        },

        // ── Module 7: Everyday Vocabulary ────────────────────────────────
        {
            id: "jpn-40",
            moduleId: "vocabulary",
            moduleTitle: "Everyday Vocabulary",
            title: "Greetings and Set Phrases",
            explanation: [
                { type: "p", text: "Everyday greetings change with the time of day and the situation." },
                { type: "example", ja: "おはようございます (ohayou gozaimasu)", en: "good morning" },
                { type: "example", ja: "こんにちは (konnichiwa)", en: "hello / good afternoon" },
                { type: "example", ja: "こんばんは (konbanwa)", en: "good evening" },
                { type: "example", ja: "ありがとうございます (arigatou gozaimasu)", en: "thank you" },
                { type: "example", ja: "さようなら (sayounara)", en: "goodbye" }
            ],
            exercises: [
                { type: "mc", prompt: "Which greeting means 'good morning'?", options: ["こんにちは", "おはようございます", "こんばんは", "さようなら"], answer: 1 },
                { type: "mc", prompt: "Which means 'good evening'?", options: ["こんばんは", "おはよう", "こんにちは", "さようなら"], answer: 0 },
                { type: "type", prompt: "Type the romaji for ありがとう ('thank you').", answer: "arigatou", accept: ["arigatou", "arigato"] },
                { type: "trueFalse", claim: "さようなら means 'goodbye'.", answer: true },
                { type: "mc", prompt: "Which greeting is for the afternoon ('hello')?", options: ["おはようございます", "こんにちは", "こんばんは", "おやすみ"], answer: 1 },
                { type: "trueFalse", claim: "Japanese greetings change depending on the time of day.", answer: true }
            ]
        },
        {
            id: "jpn-41",
            moduleId: "vocabulary",
            moduleTitle: "Everyday Vocabulary",
            title: "Family",
            explanation: [
                { type: "p", text: "Japanese uses different words for your OWN family (humble) and someone else's (polite). Here are the words for your own family." },
                { type: "example", ja: "母 (haha) / 父 (chichi)", en: "my mother / my father" },
                { type: "example", ja: "姉 (ane) / 兄 (ani)", en: "my older sister / older brother" },
                { type: "example", ja: "妹 (imouto) / 弟 (otouto)", en: "my younger sister / younger brother" },
                { type: "example", ja: "家族 (kazoku)", en: "family" },
                { type: "p", text: "For someone else's family you add お...さん: お母さん (okaasan) = 'your/his mother'." }
            ],
            exercises: [
                { type: "mc", prompt: "What does 母 (haha) mean?", options: ["my father", "my mother", "my sister", "my brother"], answer: 1 },
                { type: "mc", prompt: "Japanese uses different words for...?", options: ["morning vs evening family", "your own family vs someone else's", "big vs small family", "past vs present family"], answer: 1 },
                { type: "type", prompt: "Type the romaji for 家族 ('family').", answer: "kazoku", accept: ["kazoku"] },
                { type: "trueFalse", claim: "姉 (ane) means 'my older sister'.", answer: true },
                { type: "mc", prompt: "How do you refer politely to someone else's mother?", options: ["母 (haha)", "お母さん (okaasan)", "姉 (ane)", "家族 (kazoku)"], answer: 1 },
                { type: "trueFalse", claim: "弟 (otouto) means 'my younger brother'.", answer: true }
            ]
        },
        {
            id: "jpn-42",
            moduleId: "vocabulary",
            moduleTitle: "Everyday Vocabulary",
            title: "Food and Drink",
            explanation: [
                { type: "p", text: "Core food and drink words. Notice that borrowed foods use katakana (コーヒー, パン)." },
                { type: "example", ja: "水 (mizu) / お茶 (ocha)", en: "water / (green) tea" },
                { type: "example", ja: "ご飯 (gohan)", en: "rice / meal" },
                { type: "example", ja: "肉 (niku) / 魚 (sakana)", en: "meat / fish" },
                { type: "example", ja: "コーヒー (koohii) / パン (pan)", en: "coffee / bread" },
                { type: "p", text: "ご飯 literally means 'cooked rice' but also just 'a meal'. 朝ご飯 (asagohan) = breakfast." }
            ],
            exercises: [
                { type: "mc", prompt: "What does 水 (mizu) mean?", options: ["tea", "water", "rice", "fish"], answer: 1 },
                { type: "mc", prompt: "What does ご飯 (gohan) mean?", options: ["bread", "meat", "rice / meal", "coffee"], answer: 2 },
                { type: "type", prompt: "Type the romaji for お茶 ('tea').", answer: "ocha", accept: ["ocha"] },
                { type: "trueFalse", claim: "魚 (sakana) means 'fish'.", answer: true },
                { type: "mc", prompt: "Which word is 'meat'?", options: ["肉 (niku)", "魚 (sakana)", "パン (pan)", "水 (mizu)"], answer: 0 },
                { type: "trueFalse", claim: "Loan foods like コーヒー and パン are written in katakana.", answer: true }
            ]
        },
        {
            id: "jpn-43",
            moduleId: "vocabulary",
            moduleTitle: "Everyday Vocabulary",
            title: "Colors",
            explanation: [
                { type: "p", text: "Some colors are i-adjectives (赤い, 青い) and some are nouns that need の before a noun (緑, 茶色)." },
                { type: "example", ja: "赤 / 赤い (aka / akai)", en: "red" },
                { type: "example", ja: "青 / 青い (ao / aoi)", en: "blue" },
                { type: "example", ja: "白 / 白い (shiro / shiroi)", en: "white" },
                { type: "example", ja: "黒 / 黒い (kuro / kuroi)", en: "black" },
                { type: "example", ja: "黄色 (kiiro) / 緑 (midori)", en: "yellow / green" }
            ],
            exercises: [
                { type: "mc", prompt: "What does 赤い (akai) mean?", options: ["blue", "red", "white", "black"], answer: 1 },
                { type: "mc", prompt: "What does 青い (aoi) mean?", options: ["red", "blue", "green", "yellow"], answer: 1 },
                { type: "type", prompt: "Type the romaji for 白い ('white').", answer: "shiroi", accept: ["shiroi"] },
                { type: "trueFalse", claim: "黒 (kuro) means 'black'.", answer: true },
                { type: "mc", prompt: "Which word means 'green'?", options: ["黄色 (kiiro)", "緑 (midori)", "青 (ao)", "赤 (aka)"], answer: 1 },
                { type: "trueFalse", claim: "赤い and 青い are i-adjectives.", answer: true }
            ]
        },
        {
            id: "jpn-44",
            moduleId: "vocabulary",
            moduleTitle: "Everyday Vocabulary",
            title: "Days of the Week",
            explanation: [
                { type: "p", text: "Each weekday ends in 曜日 (youbi) and is named after an element/planet." },
                { type: "example", ja: "月曜日 (getsuyoubi) / 火曜日 (kayoubi)", en: "Monday / Tuesday" },
                { type: "example", ja: "水曜日 (suiyoubi) / 木曜日 (mokuyoubi)", en: "Wednesday / Thursday" },
                { type: "example", ja: "金曜日 (kinyoubi)", en: "Friday" },
                { type: "example", ja: "土曜日 (doyoubi) / 日曜日 (nichiyoubi)", en: "Saturday / Sunday" },
                { type: "p", text: "Useful time words: 今日 (kyou, today), 明日 (ashita, tomorrow), 昨日 (kinou, yesterday)." }
            ],
            exercises: [
                { type: "mc", prompt: "What does 月曜日 (getsuyoubi) mean?", options: ["Sunday", "Monday", "Friday", "Saturday"], answer: 1 },
                { type: "mc", prompt: "What ending do all weekdays share?", options: ["時 (ji)", "曜日 (youbi)", "日 (nichi)", "円 (en)"], answer: 1 },
                { type: "type", prompt: "Type the romaji for 今日 ('today').", answer: "kyou", accept: ["kyou", "kyo"] },
                { type: "trueFalse", claim: "明日 (ashita) means 'tomorrow'.", answer: true },
                { type: "mc", prompt: "Which word means 'yesterday'?", options: ["今日 (kyou)", "明日 (ashita)", "昨日 (kinou)", "毎日 (mainichi)"], answer: 2 },
                { type: "trueFalse", claim: "日曜日 (nichiyoubi) means 'Sunday'.", answer: true }
            ]
        },
        {
            id: "jpn-45",
            moduleId: "vocabulary",
            moduleTitle: "Everyday Vocabulary",
            title: "Months and Dates",
            explanation: [
                { type: "p", text: "Months are simply a number + 月 (gatsu): January = 一月 (ichi-gatsu). Just count 1 to 12." },
                { type: "example", ja: "一月 (ichi-gatsu) / 二月 (ni-gatsu)", en: "January / February" },
                { type: "example", ja: "四月 (shi-gatsu)", en: "April (note: shi, not yon)" },
                { type: "example", ja: "九月 (ku-gatsu)", en: "September (note: ku, not kyuu)" },
                { type: "p", text: "The day of the month uses 日 (nichi), though days 1-10 have special readings: 一日 (tsuitachi, 1st), 二日 (futsuka, 2nd)..." },
                { type: "example", ja: "何月ですか。(Nan-gatsu desu ka?)", en: "What month is it?" }
            ],
            exercises: [
                { type: "mc", prompt: "How are months formed?", options: ["a number + 曜日", "a number + 月 (gatsu)", "a number + 日", "a number + 時"], answer: 1 },
                { type: "mc", prompt: "What is 一月 (ichi-gatsu)?", options: ["January", "one o'clock", "the 1st day", "one month"], answer: 0 },
                { type: "type", prompt: "Type the romaji for the month counter 月 (as in ichi-gatsu).", answer: "gatsu", accept: ["gatsu"] },
                { type: "trueFalse", claim: "四月 (April) is read shi-gatsu, not yon-gatsu.", answer: true },
                { type: "mc", prompt: "何月ですか asks...?", options: ["what day", "what time", "what month", "how much"], answer: 2 },
                { type: "trueFalse", claim: "The day of the month uses 日 (nichi), with special readings for the first ten.", answer: true }
            ]
        },
        {
            id: "jpn-46",
            moduleId: "vocabulary",
            moduleTitle: "Everyday Vocabulary",
            title: "Body Parts",
            explanation: [
                { type: "p", text: "Common body-part words, handy for the doctor and for describing people." },
                { type: "example", ja: "頭 (atama) / 顔 (kao)", en: "head / face" },
                { type: "example", ja: "目 (me) / 耳 (mimi)", en: "eye / ear" },
                { type: "example", ja: "口 (kuchi) / 鼻 (hana)", en: "mouth / nose" },
                { type: "example", ja: "手 (te) / 足 (ashi)", en: "hand / foot (leg)" },
                { type: "example", ja: "お腹 (onaka)", en: "stomach / belly" }
            ],
            exercises: [
                { type: "mc", prompt: "What does 頭 (atama) mean?", options: ["face", "head", "hand", "foot"], answer: 1 },
                { type: "mc", prompt: "What does 目 (me) mean?", options: ["ear", "eye", "mouth", "nose"], answer: 1 },
                { type: "type", prompt: "Type the romaji for 手 ('hand').", answer: "te", accept: ["te"] },
                { type: "trueFalse", claim: "耳 (mimi) means 'ear'.", answer: true },
                { type: "mc", prompt: "Which word is 'mouth'?", options: ["鼻 (hana)", "口 (kuchi)", "目 (me)", "足 (ashi)"], answer: 1 },
                { type: "trueFalse", claim: "お腹 (onaka) means 'stomach / belly'.", answer: true }
            ]
        },
        {
            id: "jpn-47",
            moduleId: "vocabulary",
            moduleTitle: "Everyday Vocabulary",
            title: "Places Around Town",
            explanation: [
                { type: "p", text: "Words for the places you go every day." },
                { type: "example", ja: "駅 (eki) / 銀行 (ginkou)", en: "station / bank" },
                { type: "example", ja: "学校 (gakkou) / 病院 (byouin)", en: "school / hospital" },
                { type: "example", ja: "店 (mise) / スーパー (suupaa)", en: "shop / supermarket" },
                { type: "example", ja: "家 (ie/uchi)", en: "house / home" },
                { type: "example", ja: "トイレ (toire)", en: "toilet / restroom" }
            ],
            exercises: [
                { type: "mc", prompt: "What does 駅 (eki) mean?", options: ["bank", "station", "school", "shop"], answer: 1 },
                { type: "mc", prompt: "What does 学校 (gakkou) mean?", options: ["hospital", "school", "bank", "home"], answer: 1 },
                { type: "type", prompt: "Type the romaji for 家 ('house / home').", answer: "ie", accept: ["ie", "uchi"] },
                { type: "trueFalse", claim: "病院 (byouin) means 'hospital'.", answer: true },
                { type: "mc", prompt: "Which word means 'bank'?", options: ["銀行 (ginkou)", "店 (mise)", "駅 (eki)", "スーパー (suupaa)"], answer: 0 },
                { type: "trueFalse", claim: "スーパー (suupaa) means 'supermarket'.", answer: true }
            ]
        },
        {
            id: "jpn-48",
            moduleId: "vocabulary",
            moduleTitle: "Everyday Vocabulary",
            title: "Weather and Seasons",
            explanation: [
                { type: "p", text: "Weather and the four seasons - a favorite small-talk topic in Japan." },
                { type: "example", ja: "天気 (tenki)", en: "weather" },
                { type: "example", ja: "晴れ (hare) / 雨 (ame)", en: "sunny / rain" },
                { type: "example", ja: "雪 (yuki) / 曇り (kumori)", en: "snow / cloudy" },
                { type: "example", ja: "春 (haru) / 夏 (natsu)", en: "spring / summer" },
                { type: "example", ja: "秋 (aki) / 冬 (fuyu)", en: "autumn / winter" }
            ],
            exercises: [
                { type: "mc", prompt: "What does 天気 (tenki) mean?", options: ["season", "weather", "rain", "snow"], answer: 1 },
                { type: "mc", prompt: "What does 雨 (ame) mean?", options: ["sunny", "rain", "snow", "cloudy"], answer: 1 },
                { type: "type", prompt: "Type the romaji for 雪 ('snow').", answer: "yuki", accept: ["yuki"] },
                { type: "trueFalse", claim: "夏 (natsu) means 'summer'.", answer: true },
                { type: "mc", prompt: "Which word means 'winter'?", options: ["春 (haru)", "秋 (aki)", "冬 (fuyu)", "夏 (natsu)"], answer: 2 },
                { type: "trueFalse", claim: "晴れ (hare) means 'sunny'.", answer: true }
            ]
        },
        {
            id: "jpn-49",
            moduleId: "vocabulary",
            moduleTitle: "Everyday Vocabulary",
            title: "Common Everyday Verbs",
            explanation: [
                { type: "p", text: "A handful of high-frequency verbs, shown in the polite ます-form." },
                { type: "example", ja: "行きます (ikimasu) / 来ます (kimasu)", en: "go / come" },
                { type: "example", ja: "見ます (mimasu) / 聞きます (kikimasu)", en: "see-watch / listen-hear-ask" },
                { type: "example", ja: "食べます (tabemasu) / 飲みます (nomimasu)", en: "eat / drink" },
                { type: "example", ja: "します (shimasu) / 買います (kaimasu)", en: "do / buy" },
                { type: "example", ja: "話します (hanashimasu) / 読みます (yomimasu)", en: "speak / read" }
            ],
            exercises: [
                { type: "mc", prompt: "What does 行きます (ikimasu) mean?", options: ["come", "go", "see", "do"], answer: 1 },
                { type: "mc", prompt: "What does 見ます (mimasu) mean?", options: ["listen", "see / watch", "read", "buy"], answer: 1 },
                { type: "type", prompt: "Type the romaji for 買います ('buy').", answer: "kaimasu", accept: ["kaimasu"] },
                { type: "trueFalse", claim: "話します (hanashimasu) means 'speak'.", answer: true },
                { type: "mc", prompt: "Which verb means 'come'?", options: ["行きます (ikimasu)", "来ます (kimasu)", "します (shimasu)", "読みます (yomimasu)"], answer: 1 },
                { type: "trueFalse", claim: "読みます (yomimasu) means 'read'.", answer: true }
            ]
        },

        // ── Module 8: Real-Life Communication ────────────────────────────
        {
            id: "jpn-50",
            moduleId: "communication",
            moduleTitle: "Real-Life Communication",
            title: "Introducing Yourself",
            explanation: [
                { type: "p", text: "A self-introduction (自己紹介, jikoshoukai) follows a set little script. It opens with はじめまして (hajimemashite, 'nice to meet you') and closes with よろしくお願いします (yoroshiku onegaishimasu)." },
                { type: "example", ja: "はじめまして。(Hajimemashite.)", en: "Nice to meet you. (first time)" },
                { type: "example", ja: "私は田中です。(Watashi wa Tanaka desu.)", en: "I am Tanaka." },
                { type: "example", ja: "イタリア人です。(Itaria-jin desu.)", en: "I'm Italian." },
                { type: "example", ja: "よろしくお願いします。(Yoroshiku onegaishimasu.)", en: "Pleased to meet you / please be kind to me." }
            ],
            exercises: [
                { type: "mc", prompt: "Which phrase opens a first-time self-introduction?", options: ["さようなら", "はじめまして", "ありがとう", "こんばんは"], answer: 1 },
                { type: "type", prompt: "Type the romaji for はじめまして ('nice to meet you').", answer: "hajimemashite", accept: ["hajimemashite"] },
                { type: "mc", prompt: "How do you say 'I am Tanaka'?", options: ["田中です。", "田中ですか。", "田中じゃありません。", "田中でした。"], answer: 0 },
                { type: "trueFalse", claim: "よろしくお願いします closes a self-introduction.", answer: true },
                { type: "mc", prompt: "How do you say 'I'm Italian'? (イタリア人 = Italian person)", options: ["イタリア人です。", "イタリアです。", "イタリア人ですか。", "イタリア人じゃありません。"], answer: 0 },
                { type: "trueFalse", claim: "自己紹介 (jikoshoukai) means 'self-introduction'.", answer: true }
            ]
        },
        {
            id: "jpn-51",
            moduleId: "communication",
            moduleTitle: "Real-Life Communication",
            title: "Shopping",
            explanation: [
                { type: "p", text: "To ask for something in a shop, name it + をください (o kudasai, 'please give me'). To ask the price, use いくらですか." },
                { type: "example", ja: "これをください。(Kore o kudasai.)", en: "This one, please." },
                { type: "example", ja: "水を一つください。(Mizu o hitotsu kudasai.)", en: "One water, please." },
                { type: "example", ja: "いくらですか。(Ikura desu ka?)", en: "How much is it?" },
                { type: "p", text: "The clerk may greet you with いらっしゃいませ (irasshaimase, 'welcome'). You don't need to reply to it." }
            ],
            exercises: [
                { type: "mc", prompt: "How do you ask for an item ('please give me X')?", options: ["Xです", "Xをください", "Xですか", "Xじゃありません"], answer: 1 },
                { type: "type", prompt: "Type the romaji for ください ('please give me').", answer: "kudasai", accept: ["kudasai"] },
                { type: "mc", prompt: "How do you ask 'How much is it?'", options: ["いくつですか。", "いくらですか。", "どこですか。", "何ですか。"], answer: 1 },
                { type: "trueFalse", claim: "いらっしゃいませ is what a shop clerk says to welcome you.", answer: true },
                { type: "mc", prompt: "How do you say 'This one, please'?", options: ["これです。", "これをください。", "これはいくら。", "これですか。"], answer: 1 },
                { type: "trueFalse", claim: "You must reply to いらっしゃいませ.", answer: false }
            ]
        },
        {
            id: "jpn-52",
            moduleId: "communication",
            moduleTitle: "Real-Life Communication",
            title: "At a Restaurant",
            explanation: [
                { type: "p", text: "To order, name the dish + をお願いします (o onegaishimasu, a polite 'please'). Before eating, Japanese say いただきます; after, ごちそうさまでした." },
                { type: "example", ja: "メニューをお願いします。(Menyuu o onegaishimasu.)", en: "The menu, please." },
                { type: "example", ja: "これをお願いします。(Kore o onegaishimasu.)", en: "This one, please." },
                { type: "example", ja: "いただきます。(Itadakimasu.)", en: "(said before eating)" },
                { type: "example", ja: "ごちそうさまでした。(Gochisousama deshita.)", en: "(said after eating: thanks for the meal)" }
            ],
            exercises: [
                { type: "mc", prompt: "Which polite phrase can you add to order ('please')?", options: ["をください / をお願いします", "ですか", "でした", "じゃありません"], answer: 0 },
                { type: "mc", prompt: "What do you say right before eating?", options: ["ごちそうさま", "いただきます", "おはよう", "さようなら"], answer: 1 },
                { type: "type", prompt: "Type the romaji for お願いします ('please').", answer: "onegaishimasu", accept: ["onegaishimasu"] },
                { type: "trueFalse", claim: "ごちそうさまでした is said after finishing a meal.", answer: true },
                { type: "mc", prompt: "How do you ask for the menu?", options: ["メニューです。", "メニューをお願いします。", "メニューですか。", "メニューじゃありません。"], answer: 1 },
                { type: "trueFalse", claim: "いただきます is said before you start eating.", answer: true }
            ]
        },
        {
            id: "jpn-53",
            moduleId: "communication",
            moduleTitle: "Real-Life Communication",
            title: "Asking for Directions",
            explanation: [
                { type: "p", text: "To ask where something is, use 'X はどこですか' ('where is X?'). Direction words: 右 (migi, right), 左 (hidari, left), まっすぐ (massugu, straight)." },
                { type: "example", ja: "駅はどこですか。(Eki wa doko desu ka?)", en: "Where is the station?" },
                { type: "example", ja: "トイレはどこですか。(Toire wa doko desu ka?)", en: "Where is the toilet?" },
                { type: "example", ja: "右 / 左 / まっすぐ (migi / hidari / massugu)", en: "right / left / straight" },
                { type: "p", text: "To thank someone who helped: ありがとうございます." }
            ],
            exercises: [
                { type: "mc", prompt: "How do you ask 'where is X?'", options: ["Xはいくらですか。", "Xはどこですか。", "Xは何ですか。", "Xはいつですか。"], answer: 1 },
                { type: "mc", prompt: "What does 右 (migi) mean?", options: ["left", "right", "straight", "back"], answer: 1 },
                { type: "type", prompt: "Type the romaji for どこ ('where').", answer: "doko", accept: ["doko"] },
                { type: "trueFalse", claim: "まっすぐ (massugu) means 'straight ahead'.", answer: true },
                { type: "mc", prompt: "How do you say 'Where is the station?' (駅 = eki)", options: ["駅はどこですか。", "駅はいくらですか。", "駅は何ですか。", "駅はだれですか。"], answer: 0 },
                { type: "trueFalse", claim: "左 (hidari) means 'left'.", answer: true }
            ]
        },
        {
            id: "jpn-54",
            moduleId: "communication",
            moduleTitle: "Real-Life Communication",
            title: "Likes and Dislikes",
            explanation: [
                { type: "p", text: "好き (suki, 'likeable') and 嫌い (kirai, 'disliked') are na-adjectives. The thing you like takes が: 'X が好きです'." },
                { type: "example", ja: "コーヒーが好きです。(Koohii ga suki desu.)", en: "I like coffee." },
                { type: "example", ja: "魚が嫌いです。(Sakana ga kirai desu.)", en: "I dislike fish." },
                { type: "example", ja: "大好きです。(Daisuki desu.)", en: "I love it. (really like)" },
                { type: "p", text: "Note: the thing liked takes が, not を - because 好き is an adjective ('is likeable'), not a verb." }
            ],
            exercises: [
                { type: "mc", prompt: "What does 好き (suki) mean?", options: ["dislike", "like / likeable", "want", "need"], answer: 1 },
                { type: "mc", prompt: "The thing you like is marked with which particle?", options: ["を (o)", "が (ga)", "は (wa)", "に (ni)"], answer: 1 },
                { type: "type", prompt: "Type the romaji for 好き ('like').", answer: "suki", accept: ["suki"] },
                { type: "trueFalse", claim: "大好き (daisuki) means 'love / really like'.", answer: true },
                { type: "mc", prompt: "How do you say 'I like coffee'?", options: ["コーヒーを好きです。", "コーヒーが好きです。", "コーヒーは好きます。", "コーヒーに好きです。"], answer: 1 },
                { type: "trueFalse", claim: "嫌い (kirai) means 'dislike'.", answer: true }
            ]
        },
        {
            id: "jpn-55",
            moduleId: "communication",
            moduleTitle: "Real-Life Communication",
            title: "Talking About Your Day",
            explanation: [
                { type: "p", text: "String daily actions together with time words and the ます-form. 毎日 (mainichi) = every day, それから (sorekara) = after that." },
                { type: "example", ja: "毎日6時に起きます。(Mainichi roku-ji ni okimasu.)", en: "I get up at 6 every day." },
                { type: "example", ja: "朝ご飯を食べます。(Asagohan o tabemasu.)", en: "I eat breakfast." },
                { type: "example", ja: "それから、学校に行きます。(Sorekara, gakkou ni ikimasu.)", en: "After that, I go to school." },
                { type: "example", ja: "夜、寝ます。(Yoru, nemasu.)", en: "At night, I sleep." }
            ],
            exercises: [
                { type: "mc", prompt: "What does 毎日 (mainichi) mean?", options: ["today", "every day", "morning", "at night"], answer: 1 },
                { type: "mc", prompt: "What does それから (sorekara) mean?", options: ["before that", "after that", "because", "but"], answer: 1 },
                { type: "type", prompt: "Type the romaji for 起きます ('get up / wake up').", answer: "okimasu", accept: ["okimasu"] },
                { type: "trueFalse", claim: "寝ます (nemasu) means 'sleep / go to bed'.", answer: true },
                { type: "mc", prompt: "How do you say 'I get up at 6'? (6時 = roku-ji)", options: ["6時を起きます。", "6時に起きます。", "6時は起きます。", "6時の起きます。"], answer: 1 },
                { type: "trueFalse", claim: "朝ご飯 (asagohan) means 'breakfast'.", answer: true }
            ]
        },
        {
            id: "jpn-56",
            moduleId: "communication",
            moduleTitle: "Real-Life Communication",
            title: "Opinions and Agreeing",
            explanation: [
                { type: "p", text: "To give an opinion, end with と思います (to omoimasu, 'I think that...'). To agree, そうですね (sou desu ne, 'that's right / I agree')." },
                { type: "example", ja: "いいと思います。(Ii to omoimasu.)", en: "I think it's good." },
                { type: "example", ja: "そうですね。(Sou desu ne.)", en: "That's right. / I agree." },
                { type: "example", ja: "そうですか。(Sou desu ka.)", en: "Is that so? / I see." },
                { type: "p", text: "The little particle ね (ne) at the end seeks agreement, like 'right?'. か (ka) at the end makes it a question instead." }
            ],
            exercises: [
                { type: "mc", prompt: "Which phrase means 'I think that...'?", options: ["と思います (to omoimasu)", "そうですね", "ですか", "お願いします"], answer: 0 },
                { type: "mc", prompt: "Which phrase means 'That's right / I agree'?", options: ["そうですか。", "そうですね。", "違います。", "いいえ。"], answer: 1 },
                { type: "type", prompt: "Type the romaji for と思います ('I think').", answer: "to omoimasu", accept: ["toomoimasu", "to omoimasu"] },
                { type: "trueFalse", claim: "The ending particle ね (ne) seeks agreement, like 'right?'.", answer: true },
                { type: "mc", prompt: "How do you say 'I think it's good'? (いい = good)", options: ["いいですか。", "いいと思います。", "いいでした。", "いいそうです。"], answer: 1 },
                { type: "trueFalse", claim: "そうですか means 'Is that so? / I see'.", answer: true }
            ]
        },
        {
            id: "jpn-57",
            moduleId: "communication",
            moduleTitle: "Real-Life Communication",
            title: "Suggestions and Invitations",
            explanation: [
                { type: "p", text: "To suggest 'let's do X', change ます → ましょう (mashou). To invite ('won't you...?'), use ませんか (masen ka), which sounds softer and more polite." },
                { type: "example", ja: "行きましょう。(Ikimashou.)", en: "Let's go." },
                { type: "example", ja: "一緒に食べましょう。(Issho ni tabemashou.)", en: "Let's eat together." },
                { type: "example", ja: "お茶を飲みませんか。(Ocha o nomimasen ka?)", en: "Won't you have some tea? / Shall we get tea?" },
                { type: "p", text: "一緒に (issho ni) means 'together'. ましょうか (mashou ka) offers to do something for someone." }
            ],
            exercises: [
                { type: "mc", prompt: "How do you say 'let's do X' (from ます)?", options: ["ません (masen)", "ましょう (mashou)", "ました (mashita)", "ますか (masu ka)"], answer: 1 },
                { type: "mc", prompt: "What does 一緒に (issho ni) mean?", options: ["alone", "together", "quickly", "again"], answer: 1 },
                { type: "type", prompt: "Type the romaji for 一緒に ('together').", answer: "issho ni", accept: ["isshoni", "issho ni"] },
                { type: "trueFalse", claim: "ませんか (masen ka) is a soft, polite way to invite someone.", answer: true },
                { type: "mc", prompt: "How do you say 'Let's eat together'?", options: ["一緒に食べます。", "一緒に食べましょう。", "一緒に食べました。", "一緒に食べません。"], answer: 1 },
                { type: "trueFalse", claim: "行きましょう means 'Let's go'.", answer: true }
            ]
        },
        {
            id: "jpn-58",
            moduleId: "communication",
            moduleTitle: "Real-Life Communication",
            title: "Talking About Future Plans",
            explanation: [
                { type: "p", text: "Japanese has no separate future tense - the ます-form plus a future time word does the job. To say 'I plan/intend to', add つもりです (tsumori desu) to a dictionary-form verb." },
                { type: "example", ja: "明日、東京に行きます。(Ashita, Toukyou ni ikimasu.)", en: "Tomorrow I (will) go to Tokyo." },
                { type: "example", ja: "日本に行くつもりです。(Nihon ni iku tsumori desu.)", en: "I plan to go to Japan." },
                { type: "example", ja: "来週 / 来年 (raishuu / rainen)", en: "next week / next year" },
                { type: "p", text: "So '明日行きます' just means 'I'm going tomorrow' - the time word 明日 does all the future work." }
            ],
            exercises: [
                { type: "mc", prompt: "How does Japanese express the future?", options: ["a special future ending", "the ます-form + a future time word", "the particle か", "the past tense"], answer: 1 },
                { type: "type", prompt: "Type the romaji for 来年 ('next year').", answer: "rainen", accept: ["rainen"] },
                { type: "mc", prompt: "What does つもりです (tsumori desu) express?", options: ["a finished action", "an intention / plan", "a question", "a request"], answer: 1 },
                { type: "trueFalse", claim: "'明日行きます' means 'I'm going tomorrow'.", answer: true },
                { type: "mc", prompt: "Which word means 'next week'?", options: ["来週 (raishuu)", "来年 (rainen)", "今日 (kyou)", "昨日 (kinou)"], answer: 0 },
                { type: "type", prompt: "Type the romaji for 明日 ('tomorrow').", answer: "ashita", accept: ["ashita"] }
            ]
        }
    ]
};

// Additive dual-export (see the header note): merge onto the shared global so
// load order relative to the other lessons-*.js files never clobbers another
// course, and expose the same object to api/_lib.js's require() for id validation.
if (typeof window !== "undefined") {
    window.POLYTYPE_LESSONS = Object.assign(window.POLYTYPE_LESSONS || {}, JAPANESE_LESSONS_DATA);
}
if (typeof module !== "undefined" && module.exports) module.exports = JAPANESE_LESSONS_DATA;
