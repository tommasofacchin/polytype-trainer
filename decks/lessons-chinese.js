// Chinese (Mandarin) "Lessons" curriculum - a hand-authored sequence of short
// grammar/vocab lessons, the Chinese counterpart of the other decks/lessons-*.js
// files. Same data shape and the same dual-export contract, so js/lessons.js,
// js/router.js and api/_lib.js can treat every language's lessons uniformly.
//
// Ships the full 8-module curriculum (58 lessons): Grammar Foundations,
// Numbers, Nouns & Measure Words, Adjectives, Verbs, Sentence Structure,
// Everyday Vocabulary, and Real-Life Communication - mirroring the other
// courses' structure. Further lessons can be appended here without touching
// any wiring.
//
// Chinese differs from the other courses in ways the content reflects: tones
// carry meaning, verbs never conjugate, there is no gender/plural/article/case,
// nouns are counted with measure words, adjectives take 很 instead of "to be",
// and tense is shown with time words and particles (了/过/在) rather than verb
// endings. Example rows show characters + pinyin; `type` answers are pinyin
// (js/lessons.js strips tone marks and spaces when matching, so plain "nihao"
// is accepted for "nǐ hǎo").
//
// Lesson order in the array IS the unlock order - a lesson at array index i
// is playable once profile.courses.chinese.lessonsCompleted.length >= i.
// id values ("zho-NN") must stay stable and never be reordered or reused once
// shipped, since they're stored (as completed) in player profiles.
//
// Exercise types (rendered by js/lessons.js):
//   { type: "mc", prompt, options: [...], answer: <index> }
//   { type: "trueFalse", claim, answer: <bool> }
//   { type: "type", prompt, answer: "<canonical>", accept: ["<alt spellings>"] }
// Example rows use { type: "example", zh: "汉字 (pīnyīn)", en: "..." }.

const CHINESE_LESSONS_DATA = {
    chinese: [
        // ── Module 1: Grammar Foundations ────────────────────────────────
        {
            id: "zho-01",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "Pinyin and the Four Tones",
            explanation: [
                { type: "p", text: "Mandarin Chinese is written with characters (hanzi), but learners use 'pinyin' - a romanization with tone marks - to learn pronunciation. Each syllable has one of four tones (plus a neutral tone), and the tone changes the meaning." },
                { type: "p", text: "The four tones on the syllable 'ma': 1st (mā, high & flat), 2nd (má, rising), 3rd (mǎ, dip down then up), 4th (mà, sharp falling). Same sound, four different words!" },
                { type: "example", zh: "妈 (mā)", en: "mother (1st tone)" },
                { type: "example", zh: "马 (mǎ)", en: "horse (3rd tone)" },
                { type: "p", text: "Because tone carries meaning, it's part of the word - not optional. Pinyin also uses mostly familiar letters, plus 'ü' (say 'ee' with rounded lips)." },
                { type: "example", zh: "你好 (nǐ hǎo)", en: "hello" }
            ],
            exercises: [
                { type: "mc", prompt: "How many main tones does Mandarin have (not counting the neutral tone)?", options: ["two", "three", "four", "five"], answer: 2 },
                { type: "trueFalse", claim: "In Mandarin, changing the tone can change a word's meaning.", answer: true },
                { type: "mc", prompt: "Which tone is described as 'rising'?", options: ["1st", "2nd", "3rd", "4th"], answer: 1 },
                { type: "type", prompt: "Type the pinyin for 'hello'.", answer: "nǐ hǎo", accept: ["nǐ hǎo", "nihao", "ni hao"] },
                { type: "mc", prompt: "'mā' and 'mǎ' differ only in...?", options: ["their consonant", "their tone", "nothing at all", "their length"], answer: 1 },
                { type: "trueFalse", claim: "Pinyin is a romanization that helps learners pronounce Chinese characters.", answer: true }
            ]
        },
        {
            id: "zho-02",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "Subject Pronouns",
            explanation: [
                { type: "p", text: "Chinese pronouns are simple - they never change form, and there's no spoken gender difference. In writing 他 (he), 她 (she) and 它 (it) look different, but all are pronounced 'tā'." },
                { type: "example", zh: "我 (wǒ)", en: "I / me" },
                { type: "example", zh: "你 (nǐ)", en: "you (singular)" },
                { type: "example", zh: "他 / 她 (tā)", en: "he / she" },
                { type: "example", zh: "我们 (wǒmen)", en: "we / us" },
                { type: "example", zh: "你们 (nǐmen)", en: "you (plural)" },
                { type: "example", zh: "他们 (tāmen)", en: "they" },
                { type: "p", text: "To make a pronoun plural, just add 们 (men): 我 → 我们. There's also a polite 'you', 您 (nín)." }
            ],
            exercises: [
                { type: "mc", prompt: "Which pronoun means 'I / me'?", options: ["你 (nǐ)", "我 (wǒ)", "他 (tā)", "我们 (wǒmen)"], answer: 1 },
                { type: "mc", prompt: "How do you make a pronoun plural?", options: ["add 们 (men)", "add 好 (hǎo)", "change the tone", "add 的 (de)"], answer: 0 },
                { type: "trueFalse", claim: "他, 她 and 它 are all pronounced 'tā'.", answer: true },
                { type: "type", prompt: "Type the pinyin for 'you' (singular).", answer: "nǐ", accept: ["nǐ", "ni"] },
                { type: "mc", prompt: "Which means 'we / us'?", options: ["你们 (nǐmen)", "他们 (tāmen)", "我们 (wǒmen)", "您 (nín)"], answer: 2 },
                { type: "trueFalse", claim: "您 (nín) is a polite way to say 'you'.", answer: true }
            ]
        },
        {
            id: "zho-03",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "The Verb 是 (shì) - to be",
            explanation: [
                { type: "p", text: "是 (shì) means 'to be' and links two nouns (A is B). Like all Chinese verbs, it never changes form." },
                { type: "example", zh: "我是学生。(Wǒ shì xuésheng.)", en: "I am a student." },
                { type: "example", zh: "他是老师。(Tā shì lǎoshī.)", en: "He is a teacher." },
                { type: "p", text: "Important: 是 only links nouns. To say 'I am tired/happy' (a noun + adjective), Chinese does NOT use 是 - you'll see how in the adjective lesson." },
                { type: "example", zh: "这是茶。(Zhè shì chá.)", en: "This is tea." }
            ],
            exercises: [
                { type: "mc", prompt: "What does 是 (shì) mean?", options: ["to have", "to be", "to want", "to go"], answer: 1 },
                { type: "trueFalse", claim: "是 changes its form depending on the subject.", answer: false },
                { type: "mc", prompt: "是 is used to link...?", options: ["two nouns", "a noun and an adjective", "two verbs", "numbers"], answer: 0 },
                { type: "type", prompt: "Type the pinyin for 是 (to be).", answer: "shì", accept: ["shì", "shi"] },
                { type: "mc", prompt: "How do you say 'I am a student'? (学生 = student)", options: ["我学生。", "我是学生。", "我有学生。", "我很学生。"], answer: 1 },
                { type: "trueFalse", claim: "You use 是 to say 'I am tired'.", answer: false }
            ]
        },
        {
            id: "zho-04",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "The Verb 有 (yǒu) - to have",
            explanation: [
                { type: "p", text: "有 (yǒu) means 'to have' (and also 'there is/are'). It's the one verb that is negated with 没 (méi), never with 不." },
                { type: "example", zh: "我有一个哥哥。(Wǒ yǒu yí ge gēge.)", en: "I have an older brother." },
                { type: "example", zh: "她有钱。(Tā yǒu qián.)", en: "She has money." },
                { type: "p", text: "The negative is 没有 (méiyǒu) - 'not have'." },
                { type: "example", zh: "我没有时间。(Wǒ méiyǒu shíjiān.)", en: "I don't have time." }
            ],
            exercises: [
                { type: "mc", prompt: "What does 有 (yǒu) mean?", options: ["to be", "to have", "to go", "to want"], answer: 1 },
                { type: "mc", prompt: "有 is negated with...?", options: ["不 (bù)", "没 (méi)", "别 (bié)", "无 (wú)"], answer: 1 },
                { type: "type", prompt: "Type the pinyin for 有 (to have).", answer: "yǒu", accept: ["yǒu", "you"] },
                { type: "trueFalse", claim: "The negative of 有 is 没有 (méiyǒu).", answer: true },
                { type: "mc", prompt: "How do you say 'I don't have time'? (时间 = time)", options: ["我不有时间。", "我没有时间。", "我有没时间。", "我没时间有。"], answer: 1 },
                { type: "trueFalse", claim: "有 can also mean 'there is / there are'.", answer: true }
            ]
        },
        {
            id: "zho-05",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "Adjectives with 很 (hěn)",
            explanation: [
                { type: "p", text: "To describe something ('X is big/good/happy'), Chinese does NOT use 是. Instead, the adjective acts like the verb, usually with 很 (hěn) in front of it." },
                { type: "example", zh: "我很好。(Wǒ hěn hǎo.)", en: "I am fine/good." },
                { type: "example", zh: "他很高。(Tā hěn gāo.)", en: "He is tall." },
                { type: "p", text: "很 literally means 'very', but here it's often just a neutral link with little real 'very' meaning - the sentence simply sounds incomplete without it." },
                { type: "example", zh: "这个很大。(Zhège hěn dà.)", en: "This one is big." }
            ],
            exercises: [
                { type: "mc", prompt: "To say 'She is tall', Chinese uses...?", options: ["是 + adjective", "很 + adjective", "有 + adjective", "了 + adjective"], answer: 1 },
                { type: "trueFalse", claim: "You use 是 (shì) before an adjective, as in '我是好'.", answer: false },
                { type: "type", prompt: "Type the pinyin for 很 (used before adjectives).", answer: "hěn", accept: ["hěn", "hen"] },
                { type: "mc", prompt: "How do you say 'I am fine'? (好 = good/fine)", options: ["我是好。", "我很好。", "我有好。", "我好是。"], answer: 1 },
                { type: "trueFalse", claim: "很 literally means 'very', but before an adjective it's often just a neutral link.", answer: true },
                { type: "mc", prompt: "How do you say 'He is tall'? (高 = tall)", options: ["他高是。", "他是高。", "他很高。", "他有高。"], answer: 2 }
            ]
        },
        {
            id: "zho-06",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "Basic Verbs & Word Order",
            explanation: [
                { type: "p", text: "Chinese verbs never change - no endings for person, number, or tense. The basic order is Subject - Verb - Object, just like English." },
                { type: "example", zh: "我吃饭。(Wǒ chī fàn.)", en: "I eat (a meal)." },
                { type: "example", zh: "他喝茶。(Tā hē chá.)", en: "He drinks tea." },
                { type: "example", zh: "我们看电影。(Wǒmen kàn diànyǐng.)", en: "We watch a movie." },
                { type: "p", text: "The same verb form works for everyone and every time: 我吃, 你吃, 他吃 are all just 'chī'." }
            ],
            exercises: [
                { type: "mc", prompt: "What is the basic Chinese word order?", options: ["V-S-O", "S-O-V", "S-V-O", "O-V-S"], answer: 2 },
                { type: "trueFalse", claim: "Chinese verbs change their ending depending on the subject.", answer: false },
                { type: "mc", prompt: "What does 喝 (hē) mean?", options: ["to eat", "to drink", "to see", "to go"], answer: 1 },
                { type: "type", prompt: "Type the pinyin for 吃 (to eat).", answer: "chī", accept: ["chī", "chi"] },
                { type: "mc", prompt: "How do you say 'He drinks tea'? (茶 = tea)", options: ["他茶喝。", "他喝茶。", "茶他喝。", "他喝了茶吗。"], answer: 1 },
                { type: "trueFalse", claim: "The verb form is the same for 'I', 'you' and 'he'.", answer: true }
            ]
        },
        {
            id: "zho-07",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "Negation with 不 (bù) and 没 (méi)",
            explanation: [
                { type: "p", text: "Chinese has two negation words. 不 (bù) is the general one, used for the present, the future, and habits." },
                { type: "example", zh: "我不喝咖啡。(Wǒ bù hē kāfēi.)", en: "I don't drink coffee." },
                { type: "p", text: "没 (méi) is used only with 有 (to have), and to say an action did NOT happen in the past." },
                { type: "example", zh: "我没有钱。(Wǒ méiyǒu qián.)", en: "I don't have money." },
                { type: "example", zh: "我没吃。(Wǒ méi chī.)", en: "I didn't eat." },
                { type: "p", text: "Both go right before the verb. No helper word like English 'do' is needed." }
            ],
            exercises: [
                { type: "mc", prompt: "Which negation word is the general one (present/future/habit)?", options: ["不 (bù)", "没 (méi)", "别 (bié)", "无 (wú)"], answer: 0 },
                { type: "mc", prompt: "Which word negates 有 (to have)?", options: ["不 (bù)", "没 (méi)", "别 (bié)", "无 (wú)"], answer: 1 },
                { type: "type", prompt: "Type the pinyin for 不 (not).", answer: "bù", accept: ["bù", "bu"] },
                { type: "trueFalse", claim: "没 (méi) is used to say something did not happen in the past.", answer: true },
                { type: "mc", prompt: "How do you say 'I don't drink coffee'? (咖啡 = coffee)", options: ["我不喝咖啡。", "我没喝咖啡。", "我喝不咖啡。", "我不咖啡喝。"], answer: 0 },
                { type: "trueFalse", claim: "Chinese needs a helper word like English 'do' to form a negative.", answer: false }
            ]
        },
        {
            id: "zho-08",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "Possession with 的 (de)",
            explanation: [
                { type: "p", text: "The particle 的 (de) shows possession or description - it works like English 's or 'of'. The owner comes first, then 的, then the thing." },
                { type: "example", zh: "我的书 (wǒ de shū)", en: "my book" },
                { type: "example", zh: "老师的车 (lǎoshī de chē)", en: "the teacher's car" },
                { type: "p", text: "With close relationships (family, friends), 的 is often dropped: 我妈妈 (my mom), 我朋友 (my friend)." },
                { type: "example", zh: "这是我的手机。(Zhè shì wǒ de shǒujī.)", en: "This is my phone." }
            ],
            exercises: [
                { type: "mc", prompt: "Which particle shows possession, like English 's?", options: ["了 (le)", "的 (de)", "吗 (ma)", "很 (hěn)"], answer: 1 },
                { type: "type", prompt: "Type the pinyin for the possessive particle 的.", answer: "de", accept: ["de"] },
                { type: "mc", prompt: "How do you say 'my book'? (书 = book)", options: ["书我的", "我书的", "我的书", "的我书"], answer: 2 },
                { type: "trueFalse", claim: "With close family, 的 is often dropped (e.g. 我妈妈 = my mom).", answer: true },
                { type: "mc", prompt: "How do you say 'the teacher's car'? (老师 = teacher, 车 = car)", options: ["车的老师", "老师的车", "老师车的", "的老师车"], answer: 1 },
                { type: "type", prompt: "In '我___书' (my book), which particle is missing?", answer: "的", accept: ["的", "de"] }
            ]
        },
        {
            id: "zho-09",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "Yes/No Questions with 吗 (ma)",
            explanation: [
                { type: "p", text: "The easiest way to ask a yes/no question is to take a statement and add 吗 (ma) at the end. The word order does not change." },
                { type: "example", zh: "你好吗?(Nǐ hǎo ma?)", en: "How are you? (lit. Are you well?)" },
                { type: "example", zh: "他是老师吗?(Tā shì lǎoshī ma?)", en: "Is he a teacher?" },
                { type: "p", text: "No word order change and no helper word are needed - 吗 does all the work." },
                { type: "example", zh: "你有时间吗?(Nǐ yǒu shíjiān ma?)", en: "Do you have time?" }
            ],
            exercises: [
                { type: "mc", prompt: "Which particle turns a statement into a yes/no question?", options: ["的 (de)", "吗 (ma)", "了 (le)", "很 (hěn)"], answer: 1 },
                { type: "mc", prompt: "Where does 吗 go?", options: ["at the start", "after the subject", "at the very end", "before the verb"], answer: 2 },
                { type: "type", prompt: "Type the pinyin for the question particle 吗.", answer: "ma", accept: ["ma"] },
                { type: "trueFalse", claim: "Adding 吗 requires you to also change the word order.", answer: false },
                { type: "mc", prompt: "How do you ask 'Is he a teacher?' (他是老师 = he is a teacher)", options: ["他是老师吗?", "吗他是老师?", "他吗是老师?", "他是吗老师?"], answer: 0 },
                { type: "trueFalse", claim: "吗 turns a statement into a yes/no question.", answer: true }
            ]
        },
        {
            id: "zho-10",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "Question Words",
            explanation: [
                { type: "p", text: "With a question word, the word order stays the same as a statement - the question word simply sits where the answer would go." },
                { type: "example", zh: "什么 (shénme)", en: "what" },
                { type: "example", zh: "谁 (shéi)", en: "who" },
                { type: "example", zh: "哪儿 (nǎr)", en: "where" },
                { type: "example", zh: "什么时候 (shénme shíhou)", en: "when" },
                { type: "example", zh: "为什么 (wèishénme)", en: "why" },
                { type: "example", zh: "怎么 (zěnme)", en: "how" },
                { type: "p", text: "For example: 你叫什么? (What's your name?) keeps the 你叫 [name] order, with 什么 in the name's spot." }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'what'?", options: ["谁 (shéi)", "什么 (shénme)", "哪儿 (nǎr)", "怎么 (zěnme)"], answer: 1 },
                { type: "mc", prompt: "Which word means 'where'?", options: ["什么 (shénme)", "谁 (shéi)", "哪儿 (nǎr)", "为什么 (wèishénme)"], answer: 2 },
                { type: "type", prompt: "Type the pinyin for 谁 (who).", answer: "shéi", accept: ["shéi", "shei", "shuí", "shui"] },
                { type: "mc", prompt: "With a question word, the word order...?", options: ["reverses", "stays the same as a statement", "moves the verb first", "needs 吗"], answer: 1 },
                { type: "trueFalse", claim: "为什么 (wèishénme) means 'why'.", answer: true },
                { type: "mc", prompt: "Which word means 'when'?", options: ["哪儿 (nǎr)", "什么时候 (shénme shíhou)", "怎么 (zěnme)", "谁 (shéi)"], answer: 1 }
            ]
        },
        {
            id: "zho-11",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "Measure Words",
            explanation: [
                { type: "p", text: "When you count nouns, Chinese requires a 'measure word' (classifier) between the number and the noun: Number + Measure Word + Noun." },
                { type: "example", zh: "一个人 (yí ge rén)", en: "one person" },
                { type: "example", zh: "三本书 (sān běn shū)", en: "three books" },
                { type: "p", text: "个 (ge) is the general, all-purpose measure word. Specific nouns take specific ones: 本 (běn) for books, 张 (zhāng) for flat things." },
                { type: "example", zh: "两张桌子 (liǎng zhāng zhuōzi)", en: "two tables" }
            ],
            exercises: [
                { type: "mc", prompt: "What goes between a number and a noun in Chinese?", options: ["nothing", "a measure word", "的 (de)", "了 (le)"], answer: 1 },
                { type: "mc", prompt: "Which is the general, all-purpose measure word?", options: ["本 (běn)", "张 (zhāng)", "个 (ge)", "只 (zhī)"], answer: 2 },
                { type: "type", prompt: "Type the pinyin for the general measure word 个.", answer: "ge", accept: ["ge", "gè"] },
                { type: "trueFalse", claim: "本 (běn) is the measure word used for books.", answer: true },
                { type: "mc", prompt: "How do you say 'three books'? (书 = book)", options: ["三书", "三个书", "三本书", "书三本"], answer: 2 },
                { type: "trueFalse", claim: "You can count nouns in Chinese without any measure word.", answer: false }
            ]
        },
        {
            id: "zho-12",
            moduleId: "foundations",
            moduleTitle: "Grammar Foundations",
            title: "Short Answers",
            explanation: [
                { type: "p", text: "Chinese has no single word for 'yes'. To answer, you usually repeat the verb. To agree with a 是 question, say 是 (shì); to disagree, 不是 (bú shì)." },
                { type: "example", zh: "对 (duì)", en: "right / correct (a common 'yes')" },
                { type: "example", zh: "不对 (bú duì)", en: "not right / no" },
                { type: "p", text: "For a 有 (have) question, answer 有 (yǒu, 'yes') or 没有 (méiyǒu, 'no'). For other verbs, repeat the verb, e.g. 喜欢 (like) → 喜欢 / 不喜欢." },
                { type: "example", zh: "你有车吗? – 有。/ 没有。", en: "Do you have a car? – Yes. / No." }
            ],
            exercises: [
                { type: "mc", prompt: "How do you usually answer 'yes' in Chinese?", options: ["say a single word for 'yes'", "repeat the verb", "add 吗", "use 的"], answer: 1 },
                { type: "mc", prompt: "To answer 'yes' to a 是 (be) question, you say...?", options: ["有", "是", "对不起", "很"], answer: 1 },
                { type: "type", prompt: "Type the pinyin for 对 (right/correct).", answer: "duì", accept: ["duì", "dui"] },
                { type: "trueFalse", claim: "To answer 'no' to a 有 question, you say 没有 (méiyǒu).", answer: true },
                { type: "mc", prompt: "'Do you have a car?' - to say 'yes', you'd answer...?", options: ["是", "有", "对不起", "不"], answer: 1 },
                { type: "trueFalse", claim: "Chinese has one single word for 'yes' used in every situation.", answer: false }
            ]
        },

        // ── Module 2: Numbers ────────────────────────────────────────────
        {
            id: "zho-13",
            moduleId: "numbers",
            moduleTitle: "Numbers",
            title: "Numbers 0-10",
            explanation: [
                { type: "p", text: "Chinese numbers 0 to 10 are the foundation for the whole counting system, which is wonderfully regular." },
                { type: "example", zh: "零 一 二 三 四 (líng, yī, èr, sān, sì)", en: "0, 1, 2, 3, 4" },
                { type: "example", zh: "五 六 七 八 九 十 (wǔ, liù, qī, bā, jiǔ, shí)", en: "5, 6, 7, 8, 9, 10" },
                { type: "p", text: "十 (shí) is 10 - remember it, because every bigger number is built from these ten words." }
            ],
            exercises: [
                { type: "mc", prompt: "What is 'five' in Chinese?", options: ["四 (sì)", "五 (wǔ)", "六 (liù)", "七 (qī)"], answer: 1 },
                { type: "type", prompt: "Type the pinyin for 十 (ten).", answer: "shí", accept: ["shí", "shi"] },
                { type: "mc", prompt: "Which number is 八 (bā)?", options: ["6", "7", "8", "9"], answer: 2 },
                { type: "trueFalse", claim: "三 (sān) means 'three'.", answer: true },
                { type: "type", prompt: "Type the pinyin for 二 (two).", answer: "èr", accept: ["èr", "er"] },
                { type: "mc", prompt: "What is 'ten' in Chinese?", options: ["九 (jiǔ)", "十 (shí)", "七 (qī)", "四 (sì)"], answer: 1 }
            ]
        },
        {
            id: "zho-14",
            moduleId: "numbers",
            moduleTitle: "Numbers",
            title: "Numbers 11-99",
            explanation: [
                { type: "p", text: "This is where Chinese numbers shine: they're totally logical. 11 is literally 'ten-one', 20 is 'two-ten', 21 is 'two-ten-one'." },
                { type: "example", zh: "十一 (shíyī)", en: "11 (ten-one)" },
                { type: "example", zh: "二十 (èrshí)", en: "20 (two-ten)" },
                { type: "example", zh: "二十一 (èrshíyī)", en: "21 (two-ten-one)" },
                { type: "example", zh: "九十九 (jiǔshíjiǔ)", en: "99 (nine-ten-nine)" },
                { type: "p", text: "So once you know 1-10, you can count all the way to 99 with no new words." }
            ],
            exercises: [
                { type: "type", prompt: "Type the pinyin for 十一 (11).", answer: "shíyī", accept: ["shíyī", "shiyi"] },
                { type: "mc", prompt: "How is 20 built in Chinese?", options: ["ten-ten", "two-ten (二十)", "ten-two", "twenty"], answer: 1 },
                { type: "trueFalse", claim: "21 is literally 'two-ten-one' (二十一).", answer: true },
                { type: "mc", prompt: "What number is 九十九 (jiǔshíjiǔ)?", options: ["19", "90", "99", "89"], answer: 2 },
                { type: "type", prompt: "Type the pinyin for 三十 (30).", answer: "sānshí", accept: ["sānshí", "sanshi"] },
                { type: "mc", prompt: "What is 'twelve'?", options: ["十二 (shí'èr)", "二十 (èrshí)", "二 (èr)", "二十二 (èrshí'èr)"], answer: 0 }
            ]
        },
        {
            id: "zho-15",
            moduleId: "numbers",
            moduleTitle: "Numbers",
            title: "Big Numbers: 百, 千, 万",
            explanation: [
                { type: "p", text: "百 (bǎi) is hundred, 千 (qiān) is thousand, and - importantly - 万 (wàn) is ten-thousand (not 'hundred-thousand')." },
                { type: "example", zh: "一百 (yìbǎi)", en: "100" },
                { type: "example", zh: "一千 (yìqiān)", en: "1,000" },
                { type: "example", zh: "一万 (yíwàn)", en: "10,000" },
                { type: "p", text: "Chinese groups big numbers by ten-thousands, so 100,000 is 十万 (ten wàn) and a million is 一百万 (a hundred wàn)." }
            ],
            exercises: [
                { type: "type", prompt: "Type the pinyin for 百 (hundred).", answer: "bǎi", accept: ["bǎi", "bai"] },
                { type: "mc", prompt: "What does 万 (wàn) mean?", options: ["hundred", "thousand", "ten-thousand", "million"], answer: 2 },
                { type: "type", prompt: "Type the pinyin for 千 (thousand).", answer: "qiān", accept: ["qiān", "qian"] },
                { type: "trueFalse", claim: "万 (wàn) means ten-thousand, not hundred-thousand.", answer: true },
                { type: "mc", prompt: "How do you say '1,000'?", options: ["一百 (yìbǎi)", "一千 (yìqiān)", "一万 (yíwàn)", "十千 (shíqiān)"], answer: 1 },
                { type: "mc", prompt: "How does Chinese group large numbers?", options: ["by thousands", "by ten-thousands", "by hundreds", "by millions"], answer: 1 }
            ]
        },
        {
            id: "zho-16",
            moduleId: "numbers",
            moduleTitle: "Numbers",
            title: "二 vs 两 and Measure Words",
            explanation: [
                { type: "p", text: "Chinese has two words for 'two'. 二 (èr) is used for counting and in numbers (like 'twenty'). 两 (liǎng) is used before a measure word, i.e. when counting things." },
                { type: "example", zh: "二 (èr)", en: "two (counting: one, two, three)" },
                { type: "example", zh: "两个人 (liǎng ge rén)", en: "two people" },
                { type: "example", zh: "两杯茶 (liǎng bēi chá)", en: "two cups of tea" },
                { type: "p", text: "So you say 二十 (20) with 二, but 两本书 (two books) with 两." }
            ],
            exercises: [
                { type: "mc", prompt: "Which word for 'two' is used before a measure word?", options: ["二 (èr)", "两 (liǎng)", "双 (shuāng)", "二十 (èrshí)"], answer: 1 },
                { type: "mc", prompt: "Which 'two' is used for pure counting and in '20'?", options: ["两 (liǎng)", "二 (èr)", "半 (bàn)", "双 (shuāng)"], answer: 1 },
                { type: "type", prompt: "Type the pinyin for 两 (two, before a measure word).", answer: "liǎng", accept: ["liǎng", "liang"] },
                { type: "trueFalse", claim: "You say 两个人 (two people), not 二个人.", answer: true },
                { type: "mc", prompt: "How do you say 'two cups of tea'? (杯 = cup MW, 茶 = tea)", options: ["二杯茶", "两杯茶", "二个茶", "两茶"], answer: 1 },
                { type: "trueFalse", claim: "'20' is written 两十.", answer: false }
            ]
        },
        {
            id: "zho-17",
            moduleId: "numbers",
            moduleTitle: "Numbers",
            title: "Talking about Money",
            explanation: [
                { type: "p", text: "Chinese currency is the 元 (yuán), but in everyday speech people say 块 (kuài). One tenth of that is 毛 (máo, spoken) or 角 (jiǎo, written)." },
                { type: "example", zh: "多少钱?(Duōshao qián?)", en: "How much (money)?" },
                { type: "example", zh: "十块 (shí kuài)", en: "10 yuan" },
                { type: "example", zh: "五毛 (wǔ máo)", en: "0.5 yuan (50 cents)" },
                { type: "p", text: "钱 (qián) means 'money'. So to ask a price, you say 多少钱? (How much money?)." }
            ],
            exercises: [
                { type: "mc", prompt: "What does 多少钱? (Duōshao qián?) mean?", options: ["Where is it?", "How much (money)?", "What is it?", "When?"], answer: 1 },
                { type: "type", prompt: "Type the pinyin for 钱 (money).", answer: "qián", accept: ["qián", "qian"] },
                { type: "mc", prompt: "In everyday speech, '10 yuan' is usually said...?", options: ["十元", "十块", "十毛", "十分"], answer: 1 },
                { type: "trueFalse", claim: "块 (kuài) is the spoken word for the currency unit 元 (yuán).", answer: true },
                { type: "type", prompt: "Type the pinyin for the spoken currency word 块.", answer: "kuài", accept: ["kuài", "kuai"] },
                { type: "mc", prompt: "Which is smaller than one 块?", options: ["一元", "一毛", "两块", "十块"], answer: 1 }
            ]
        },
        {
            id: "zho-18",
            moduleId: "numbers",
            moduleTitle: "Numbers",
            title: "Asking 'How many': 几 and 多少",
            explanation: [
                { type: "p", text: "Chinese has two words for asking 'how many'. 几 (jǐ) is for small numbers (usually under 10) and needs a measure word. 多少 (duōshao) is for any amount and needs no measure word." },
                { type: "example", zh: "几个人?(Jǐ ge rén?)", en: "How many people? (expecting a small number)" },
                { type: "example", zh: "多少钱?(Duōshao qián?)", en: "How much money?" },
                { type: "example", zh: "你有几本书?(Nǐ yǒu jǐ běn shū?)", en: "How many books do you have?" },
                { type: "p", text: "A rule of thumb: use 几 + measure word for things you'd count on your fingers, 多少 for bigger or open-ended amounts." }
            ],
            exercises: [
                { type: "mc", prompt: "Which word asks 'how many' for small numbers and takes a measure word?", options: ["多少 (duōshao)", "几 (jǐ)", "很 (hěn)", "两 (liǎng)"], answer: 1 },
                { type: "mc", prompt: "Which word asks 'how much/many' for any amount, with no measure word?", options: ["几 (jǐ)", "多少 (duōshao)", "个 (ge)", "几个 (jǐ ge)"], answer: 1 },
                { type: "type", prompt: "Type the pinyin for 几 (how many, small numbers).", answer: "jǐ", accept: ["jǐ", "ji"] },
                { type: "trueFalse", claim: "几 (jǐ) is usually followed by a measure word.", answer: true },
                { type: "mc", prompt: "How do you ask 'How many people?' (人 = person)", options: ["多少个人?", "几个人?", "几人吗?", "人几个?"], answer: 1 },
                { type: "trueFalse", claim: "多少 (duōshao) is best for large or open-ended amounts.", answer: true }
            ]
        },

        // ── Module 3: Nouns & Measure Words ──────────────────────────────
        {
            id: "zho-19",
            moduleId: "nouns",
            moduleTitle: "Nouns & Measure Words",
            title: "Nouns: No Plurals, No Articles",
            explanation: [
                { type: "p", text: "Chinese nouns are simple: they have no gender, no plural endings, and no articles ('a'/'the'). 书 (shū) can mean 'book', 'a book', 'the book' or 'books' - context decides." },
                { type: "example", zh: "书 (shū)", en: "book / a book / the book / books" },
                { type: "example", zh: "我有书。(Wǒ yǒu shū.)", en: "I have a book / books." },
                { type: "p", text: "To make a number explicit, use a number + measure word (三本书 = three books). Otherwise the noun stays exactly the same." },
                { type: "example", zh: "猫 (māo)", en: "cat / cats" }
            ],
            exercises: [
                { type: "mc", prompt: "How do Chinese nouns show the plural?", options: ["add -s", "add an ending", "they usually don't change", "add 的"], answer: 2 },
                { type: "trueFalse", claim: "Chinese nouns have a gender, like Italian or German.", answer: false },
                { type: "mc", prompt: "书 (shū) can mean...?", options: ["only 'book'", "only 'books'", "book, a book, the book, or books", "only 'the book'"], answer: 2 },
                { type: "type", prompt: "Type the pinyin for 书 (book).", answer: "shū", accept: ["shū", "shu"] },
                { type: "trueFalse", claim: "Chinese has no words for 'a' or 'the'.", answer: true },
                { type: "mc", prompt: "To say a specific number of a noun, you use...?", options: ["a plural ending", "a number + measure word", "an article", "the tone"], answer: 1 }
            ]
        },
        {
            id: "zho-20",
            moduleId: "nouns",
            moduleTitle: "Nouns & Measure Words",
            title: "Common Measure Words",
            explanation: [
                { type: "p", text: "Beyond the general 个 (ge), many nouns have their own measure word that pairs with them naturally. Here are the most common ones." },
                { type: "example", zh: "本 (běn)", en: "for books/magazines (三本书)" },
                { type: "example", zh: "张 (zhāng)", en: "for flat things: paper, tables (一张纸)" },
                { type: "example", zh: "只 (zhī)", en: "for many animals (两只猫)" },
                { type: "example", zh: "杯 (bēi)", en: "for cups/glasses (一杯水)" },
                { type: "p", text: "位 (wèi) is a polite measure word for people. When in doubt, 个 usually works." }
            ],
            exercises: [
                { type: "mc", prompt: "Which measure word is used for books?", options: ["张 (zhāng)", "本 (běn)", "只 (zhī)", "杯 (bēi)"], answer: 1 },
                { type: "mc", prompt: "Which measure word is used for flat things like paper?", options: ["本 (běn)", "张 (zhāng)", "杯 (bēi)", "位 (wèi)"], answer: 1 },
                { type: "type", prompt: "Type the pinyin for 杯 (measure word for cups).", answer: "bēi", accept: ["bēi", "bei"] },
                { type: "trueFalse", claim: "只 (zhī) is a measure word used for many animals.", answer: true },
                { type: "mc", prompt: "Which is a polite measure word for people?", options: ["个 (ge)", "位 (wèi)", "本 (běn)", "只 (zhī)"], answer: 1 },
                { type: "mc", prompt: "How do you say 'a cup of water'? (水 = water)", options: ["一本水", "一张水", "一杯水", "一只水"], answer: 2 }
            ]
        },
        {
            id: "zho-21",
            moduleId: "nouns",
            moduleTitle: "Nouns & Measure Words",
            title: "This & That (这 / 那)",
            explanation: [
                { type: "p", text: "这 (zhè) means 'this' and 那 (nà) means 'that'. Before a noun, they normally take a measure word too: 这 + MW + noun." },
                { type: "example", zh: "这个 (zhège)", en: "this one" },
                { type: "example", zh: "那个 (nàge)", en: "that one" },
                { type: "example", zh: "这本书 (zhè běn shū)", en: "this book" },
                { type: "example", zh: "那杯茶 (nà bēi chá)", en: "that cup of tea" },
                { type: "p", text: "For 'here' and 'there', use 这儿/这里 (zhèr/zhèlǐ) and 那儿/那里 (nàr/nàlǐ)." }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'this'?", options: ["这 (zhè)", "那 (nà)", "哪 (nǎ)", "个 (ge)"], answer: 0 },
                { type: "mc", prompt: "Which word means 'that'?", options: ["这 (zhè)", "那 (nà)", "这儿 (zhèr)", "那儿 (nàr)"], answer: 1 },
                { type: "type", prompt: "Type the pinyin for 这个 (this one).", answer: "zhège", accept: ["zhège", "zhege", "zhèige", "zheige"] },
                { type: "trueFalse", claim: "Before a noun, 这 and 那 usually take a measure word too.", answer: true },
                { type: "mc", prompt: "How do you say 'this book'? (书 = book)", options: ["这书", "这本书", "书这本", "本这书"], answer: 1 },
                { type: "mc", prompt: "Which means 'here'?", options: ["那儿 (nàr)", "这儿 (zhèr)", "哪儿 (nǎr)", "那里 (nàlǐ)"], answer: 1 }
            ]
        },
        {
            id: "zho-22",
            moduleId: "nouns",
            moduleTitle: "Nouns & Measure Words",
            title: "The Plural Marker 们 (men)",
            explanation: [
                { type: "p", text: "Chinese nouns don't normally pluralize, but there's one marker, 们 (men), added to pronouns and to words for people to make them clearly plural." },
                { type: "example", zh: "我 → 我们 (wǒ → wǒmen)", en: "I → we" },
                { type: "example", zh: "朋友 → 朋友们 (péngyou → péngyoumen)", en: "friend → friends" },
                { type: "example", zh: "老师们 (lǎoshīmen)", en: "teachers" },
                { type: "p", text: "们 is only used with people (never objects), and it's dropped when a number is present - you'd say 三个朋友 (three friends), not 三个朋友们." }
            ],
            exercises: [
                { type: "mc", prompt: "What does the marker 们 (men) do?", options: ["negates a verb", "makes people-words plural", "asks a question", "shows possession"], answer: 1 },
                { type: "type", prompt: "Type the pinyin for 我们 (we).", answer: "wǒmen", accept: ["wǒmen", "women", "wǒ men"] },
                { type: "mc", prompt: "们 can be added to...?", options: ["any noun", "only words for people", "only verbs", "only numbers"], answer: 1 },
                { type: "trueFalse", claim: "You can say 三个朋友们 (three friends) with 们.", answer: false },
                { type: "mc", prompt: "How do you make 朋友 (friend) plural?", options: ["朋友们", "们朋友", "朋友个", "朋友的"], answer: 0 },
                { type: "trueFalse", claim: "们 is used with objects like 书 (books).", answer: false }
            ]
        },
        {
            id: "zho-23",
            moduleId: "nouns",
            moduleTitle: "Nouns & Measure Words",
            title: "There is/are: 有 and 在",
            explanation: [
                { type: "p", text: "Chinese uses two different verbs for location. 有 (yǒu) says something EXISTS somewhere: Place + 有 + thing." },
                { type: "example", zh: "桌子上有一本书。(Zhuōzi shang yǒu yì běn shū.)", en: "There is a book on the table." },
                { type: "p", text: "在 (zài) says a KNOWN thing is located somewhere: Thing + 在 + place." },
                { type: "example", zh: "书在桌子上。(Shū zài zhuōzi shang.)", en: "The book is on the table." },
                { type: "example", zh: "他在家。(Tā zài jiā.)", en: "He is at home." },
                { type: "p", text: "Rule of thumb: 有 introduces something new ('there is a...'), 在 tells where a specific thing is ('... is at ...')." }
            ],
            exercises: [
                { type: "mc", prompt: "Which verb means something exists somewhere ('there is a...')?", options: ["在 (zài)", "有 (yǒu)", "是 (shì)", "的 (de)"], answer: 1 },
                { type: "mc", prompt: "Which verb tells where a known thing is located?", options: ["有 (yǒu)", "在 (zài)", "是 (shì)", "了 (le)"], answer: 1 },
                { type: "type", prompt: "Type the pinyin for 在 (to be located at).", answer: "zài", accept: ["zài", "zai"] },
                { type: "trueFalse", claim: "'他在家' means 'He is at home'.", answer: true },
                { type: "mc", prompt: "How do you say 'The book is on the table'? (书 = book, 桌子上 = on the table)", options: ["桌子上有书。", "书有桌子上。", "书在桌子上。", "书是桌子上。"], answer: 2 },
                { type: "trueFalse", claim: "有 introduces something new, while 在 tells where a specific thing is.", answer: true }
            ]
        },

        // ── Module 4: Adjectives ─────────────────────────────────────────
        {
            id: "zho-24",
            moduleId: "adjectives",
            moduleTitle: "Adjectives",
            title: "Adjectives as Predicates (很 + adj)",
            explanation: [
                { type: "p", text: "As you saw earlier, a Chinese adjective acts as its own verb - you don't use 是. In a plain statement, put 很 (hěn) before it." },
                { type: "example", zh: "天气很好。(Tiānqì hěn hǎo.)", en: "The weather is good." },
                { type: "example", zh: "我很累。(Wǒ hěn lèi.)", en: "I am tired." },
                { type: "p", text: "Some essentials: 大 (dà, big), 小 (xiǎo, small), 好 (hǎo, good), 多 (duō, many), 少 (shǎo, few), 新 (xīn, new)." },
                { type: "example", zh: "这个很贵。(Zhège hěn guì.)", en: "This one is expensive." }
            ],
            exercises: [
                { type: "mc", prompt: "Before an adjective in a plain statement, you use...?", options: ["是 (shì)", "很 (hěn)", "有 (yǒu)", "的 (de)"], answer: 1 },
                { type: "mc", prompt: "Which word means 'small'?", options: ["大 (dà)", "小 (xiǎo)", "多 (duō)", "新 (xīn)"], answer: 1 },
                { type: "type", prompt: "Type the pinyin for 好 (good).", answer: "hǎo", accept: ["hǎo", "hao"] },
                { type: "trueFalse", claim: "'我很累' means 'I am tired'.", answer: true },
                { type: "type", prompt: "Type the pinyin for 大 (big).", answer: "dà", accept: ["dà", "da"] },
                { type: "mc", prompt: "How do you say 'The weather is good'? (天气 = weather)", options: ["天气是好。", "天气很好。", "天气有好。", "天气好是。"], answer: 1 }
            ]
        },
        {
            id: "zho-25",
            moduleId: "adjectives",
            moduleTitle: "Adjectives",
            title: "Adjectives before Nouns (的)",
            explanation: [
                { type: "p", text: "When an adjective comes before a noun to describe it, it usually takes 的 (de): adjective + 的 + noun." },
                { type: "example", zh: "漂亮的花 (piàoliang de huā)", en: "a beautiful flower" },
                { type: "example", zh: "红色的车 (hóngsè de chē)", en: "a red car" },
                { type: "p", text: "With very short, common adjectives (like 好, 大, 小), 的 is often dropped: 好人 (a good person), 大城市 (a big city)." },
                { type: "example", zh: "一个大房子 (yí ge dà fángzi)", en: "a big house" }
            ],
            exercises: [
                { type: "mc", prompt: "An adjective before a noun usually takes which particle?", options: ["了 (le)", "的 (de)", "吗 (ma)", "很 (hěn)"], answer: 1 },
                { type: "type", prompt: "Type the pinyin for the particle used between an adjective and a noun (的).", answer: "de", accept: ["de"] },
                { type: "mc", prompt: "How do you say 'a beautiful flower'? (漂亮 = beautiful, 花 = flower)", options: ["花的漂亮", "漂亮花的", "漂亮的花", "的漂亮花"], answer: 2 },
                { type: "trueFalse", claim: "With short common adjectives like 好 or 大, 的 is often dropped.", answer: true },
                { type: "mc", prompt: "Which phrase drops 的 correctly?", options: ["大的城市", "大城市", "城市大的", "的大城市"], answer: 1 },
                { type: "trueFalse", claim: "The order is: adjective + 的 + noun.", answer: true }
            ]
        },
        {
            id: "zho-26",
            moduleId: "adjectives",
            moduleTitle: "Adjectives",
            title: "Comparisons with 比 (bǐ)",
            explanation: [
                { type: "p", text: "To compare two things, use 比 (bǐ, 'than'): A + 比 + B + adjective. Note there's no 很 here." },
                { type: "example", zh: "我比你高。(Wǒ bǐ nǐ gāo.)", en: "I am taller than you." },
                { type: "example", zh: "今天比昨天热。(Jīntiān bǐ zuótiān rè.)", en: "Today is hotter than yesterday." },
                { type: "p", text: "To say two things are the same, use 一样 (yíyàng): A 和 B 一样 (A and B are the same)." },
                { type: "example", zh: "这个比那个便宜。(Zhège bǐ nàge piányi.)", en: "This one is cheaper than that one." }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'than' in a comparison?", options: ["比 (bǐ)", "很 (hěn)", "和 (hé)", "的 (de)"], answer: 0 },
                { type: "type", prompt: "Type the pinyin for 比 (than).", answer: "bǐ", accept: ["bǐ", "bi"] },
                { type: "mc", prompt: "How do you say 'I am taller than you'? (高 = tall)", options: ["我很高你。", "我比你高。", "我高比你。", "你比我高。"], answer: 1 },
                { type: "trueFalse", claim: "In an A 比 B comparison, you still add 很 before the adjective.", answer: false },
                { type: "mc", prompt: "What does 一样 (yíyàng) express?", options: ["bigger", "the same", "smaller", "than"], answer: 1 },
                { type: "type", prompt: "Type the pinyin for 便宜 (cheap).", answer: "piányi", accept: ["piányi", "pianyi"] }
            ]
        },
        {
            id: "zho-27",
            moduleId: "adjectives",
            moduleTitle: "Adjectives",
            title: "Colors",
            explanation: [
                { type: "p", text: "Color words are often paired with 色 (sè, 'color'), and take 的 before a noun." },
                { type: "example", zh: "红 (hóng), 蓝 (lán), 黄 (huáng)", en: "red, blue, yellow" },
                { type: "example", zh: "绿 (lǜ), 白 (bái), 黑 (hēi)", en: "green, white, black" },
                { type: "example", zh: "红色的车 (hóngsè de chē)", en: "a red car" },
                { type: "p", text: "To say 'What color?', ask 什么颜色? (shénme yánsè)." }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'red'?", options: ["蓝 (lán)", "红 (hóng)", "黄 (huáng)", "黑 (hēi)"], answer: 1 },
                { type: "type", prompt: "Type the pinyin for 白 (white).", answer: "bái", accept: ["bái", "bai"] },
                { type: "mc", prompt: "Which word means 'black'?", options: ["白 (bái)", "黑 (hēi)", "红 (hóng)", "蓝 (lán)"], answer: 1 },
                { type: "trueFalse", claim: "蓝 (lán) means 'blue'.", answer: true },
                { type: "type", prompt: "Type the pinyin for 红 (red).", answer: "hóng", accept: ["hóng", "hong"] },
                { type: "mc", prompt: "How do you ask 'What color?'", options: ["什么颜色?", "多少颜色?", "哪儿颜色?", "颜色吗?"], answer: 0 }
            ]
        },
        {
            id: "zho-28",
            moduleId: "adjectives",
            moduleTitle: "Adjectives",
            title: "Describing People and Things",
            explanation: [
                { type: "p", text: "A useful set of adjectives for describing people and things." },
                { type: "example", zh: "高 (gāo), 矮 (ǎi)", en: "tall, short" },
                { type: "example", zh: "胖 (pàng), 瘦 (shòu)", en: "fat, thin" },
                { type: "example", zh: "高兴 (gāoxìng), 难过 (nánguò)", en: "happy, sad" },
                { type: "example", zh: "累 (lèi), 饿 (è)", en: "tired, hungry" },
                { type: "example", zh: "好 (hǎo), 坏 (huài)", en: "good, bad" }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'tall'?", options: ["矮 (ǎi)", "高 (gāo)", "胖 (pàng)", "瘦 (shòu)"], answer: 1 },
                { type: "type", prompt: "Type the pinyin for 高兴 (happy).", answer: "gāoxìng", accept: ["gāoxìng", "gaoxing"] },
                { type: "mc", prompt: "Which word means 'tired'?", options: ["饿 (è)", "累 (lèi)", "高 (gāo)", "好 (hǎo)"], answer: 1 },
                { type: "trueFalse", claim: "饿 (è) means 'hungry'.", answer: true },
                { type: "type", prompt: "Type the pinyin for 坏 (bad).", answer: "huài", accept: ["huài", "huai"] },
                { type: "mc", prompt: "What does 难过 (nánguò) mean?", options: ["happy", "sad", "tall", "hungry"], answer: 1 }
            ]
        },

        // ── Module 5: Verbs ──────────────────────────────────────────────
        {
            id: "zho-29",
            moduleId: "verbs",
            moduleTitle: "Verbs",
            title: "Verbs Don't Conjugate + 去 (to go)",
            explanation: [
                { type: "p", text: "A reminder of Chinese's biggest simplification: verbs never change. There are no tenses built into the verb - time is shown with time words and particles instead." },
                { type: "example", zh: "去 (qù)", en: "to go" },
                { type: "example", zh: "我去学校。(Wǒ qù xuéxiào.)", en: "I go to school." },
                { type: "p", text: "You can string verbs together in the order the actions happen (a 'serial verb'): 我去买东西 = I go (to) buy things." },
                { type: "example", zh: "他来看我。(Tā lái kàn wǒ.)", en: "He comes to see me." }
            ],
            exercises: [
                { type: "mc", prompt: "How does a Chinese verb change for past vs. present?", options: ["it adds an ending", "it doesn't change - time words show it", "it changes tone", "it doubles"], answer: 1 },
                { type: "type", prompt: "Type the pinyin for 去 (to go).", answer: "qù", accept: ["qù", "qu"] },
                { type: "mc", prompt: "What does 来 (lái) mean?", options: ["to go", "to come", "to eat", "to see"], answer: 1 },
                { type: "trueFalse", claim: "'我去学校' means 'I go to school'.", answer: true },
                { type: "mc", prompt: "How do you say 'I go (to) buy things'? (买东西 = buy things)", options: ["我买东西去。", "我去买东西。", "去我买东西。", "我去东西买。"], answer: 1 },
                { type: "trueFalse", claim: "Chinese verbs have no built-in tense.", answer: true }
            ]
        },
        {
            id: "zho-30",
            moduleId: "verbs",
            moduleTitle: "Verbs",
            title: "Auxiliary Verbs: 会, 能, 可以",
            explanation: [
                { type: "p", text: "These three all translate as 'can', but with different meanings. 会 (huì) = can, as a learned skill. 能 (néng) = can, be physically able. 可以 (kěyǐ) = can, be allowed/permitted." },
                { type: "example", zh: "我会说中文。(Wǒ huì shuō Zhōngwén.)", en: "I can (know how to) speak Chinese." },
                { type: "example", zh: "我能来。(Wǒ néng lái.)", en: "I can (am able to) come." },
                { type: "example", zh: "我可以进来吗?(Wǒ kěyǐ jìnlái ma?)", en: "May I come in?" },
                { type: "p", text: "Each is followed by a main verb, and each is negated with 不 (不会, 不能, 不可以)." }
            ],
            exercises: [
                { type: "mc", prompt: "Which 'can' means a learned skill (like speaking a language)?", options: ["会 (huì)", "能 (néng)", "可以 (kěyǐ)", "要 (yào)"], answer: 0 },
                { type: "mc", prompt: "Which 'can' means 'be allowed / permitted'?", options: ["会 (huì)", "能 (néng)", "可以 (kěyǐ)", "想 (xiǎng)"], answer: 2 },
                { type: "type", prompt: "Type the pinyin for 会 (can, a learned skill).", answer: "huì", accept: ["huì", "hui"] },
                { type: "trueFalse", claim: "'我会说中文' means 'I can speak Chinese' (as a skill).", answer: true },
                { type: "mc", prompt: "How are these auxiliary verbs negated?", options: ["with 没", "with 不", "with 别", "they can't be negated"], answer: 1 },
                { type: "mc", prompt: "Which best fits 'May I come in?'", options: ["我会进来吗?", "我能进来吗?", "我可以进来吗?", "我要进来吗?"], answer: 2 }
            ]
        },
        {
            id: "zho-31",
            moduleId: "verbs",
            moduleTitle: "Verbs",
            title: "Wanting & Willing: 想 and 要",
            explanation: [
                { type: "p", text: "想 (xiǎng) means 'would like to / want to' (softer, a wish), and 要 (yào) means 'want / will' (stronger, an intention). Both are followed by a verb or noun." },
                { type: "example", zh: "我想喝茶。(Wǒ xiǎng hē chá.)", en: "I would like to drink tea." },
                { type: "example", zh: "我要买这个。(Wǒ yào mǎi zhège.)", en: "I want to buy this." },
                { type: "p", text: "想 can also mean 'to miss (someone)' or 'to think'. 要 is stronger and can express a plan for the future." },
                { type: "example", zh: "你想去吗?(Nǐ xiǎng qù ma?)", en: "Do you want to go?" }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'would like to' (a softer wish)?", options: ["要 (yào)", "想 (xiǎng)", "会 (huì)", "能 (néng)"], answer: 1 },
                { type: "mc", prompt: "Which word is stronger, 'want / will'?", options: ["想 (xiǎng)", "要 (yào)", "可以 (kěyǐ)", "比 (bǐ)"], answer: 1 },
                { type: "type", prompt: "Type the pinyin for 想 (would like to).", answer: "xiǎng", accept: ["xiǎng", "xiang"] },
                { type: "trueFalse", claim: "'我想喝茶' means 'I would like to drink tea'.", answer: true },
                { type: "mc", prompt: "How do you say 'I want to buy this'? (买 = buy, 这个 = this)", options: ["我想买这个。", "我要买这个。", "我买要这个。", "我要这个买。"], answer: 1 },
                { type: "trueFalse", claim: "想 can also mean 'to miss someone'.", answer: true }
            ]
        },
        {
            id: "zho-32",
            moduleId: "verbs",
            moduleTitle: "Verbs",
            title: "Completed Actions with 了 (le)",
            explanation: [
                { type: "p", text: "The particle 了 (le) is added after a verb to show an action is completed - often matching an English past tense." },
                { type: "example", zh: "我吃了。(Wǒ chī le.)", en: "I ate / I have eaten." },
                { type: "example", zh: "他买了一本书。(Tā mǎi le yì běn shū.)", en: "He bought a book." },
                { type: "p", text: "To make it negative (didn't do), drop 了 and use 没 (méi) before the verb." },
                { type: "example", zh: "我没吃。(Wǒ méi chī.)", en: "I didn't eat." }
            ],
            exercises: [
                { type: "mc", prompt: "What does the particle 了 (le) after a verb usually show?", options: ["a question", "a completed action", "possession", "the plural"], answer: 1 },
                { type: "type", prompt: "Type the pinyin for the completed-action particle 了.", answer: "le", accept: ["le"] },
                { type: "mc", prompt: "How do you say 'I ate'? (吃 = eat)", options: ["我吃。", "我吃了。", "我了吃。", "我吃吗?"], answer: 1 },
                { type: "trueFalse", claim: "To say 'didn't do', you drop 了 and use 没 before the verb.", answer: true },
                { type: "mc", prompt: "How do you say 'I didn't eat'?", options: ["我不吃了。", "我没吃。", "我吃没了。", "我没了吃。"], answer: 1 },
                { type: "trueFalse", claim: "了 often corresponds to an English past tense.", answer: true }
            ]
        },
        {
            id: "zho-33",
            moduleId: "verbs",
            moduleTitle: "Verbs",
            title: "Past Experience with 过 (guò)",
            explanation: [
                { type: "p", text: "The particle 过 (guò) after a verb means you have experienced something at least once before - 'have ever done'." },
                { type: "example", zh: "我去过中国。(Wǒ qù guò Zhōngguó.)", en: "I have been to China (before)." },
                { type: "example", zh: "你吃过饺子吗?(Nǐ chī guò jiǎozi ma?)", en: "Have you ever eaten dumplings?" },
                { type: "p", text: "The negative uses 没 before the verb, keeping 过: 我没去过 = I have never been." },
                { type: "example", zh: "我没看过这个电影。(Wǒ méi kàn guò zhège diànyǐng.)", en: "I haven't seen this movie." }
            ],
            exercises: [
                { type: "mc", prompt: "What does 过 (guò) after a verb mean?", options: ["a completed action right now", "'have experienced / have ever done'", "the future", "a command"], answer: 1 },
                { type: "type", prompt: "Type the pinyin for the experiential particle 过.", answer: "guò", accept: ["guò", "guo"] },
                { type: "mc", prompt: "How do you say 'I have been to China'? (去 = go, 中国 = China)", options: ["我去中国了。", "我去过中国。", "我去中国过吗?", "我没去中国。"], answer: 1 },
                { type: "trueFalse", claim: "过 is negated with 没 before the verb (e.g. 我没去过).", answer: true },
                { type: "mc", prompt: "'Have you ever eaten dumplings?' relies on which particle for the 'ever' meaning?", options: ["了 (le)", "过 (guò)", "吗 (ma)", "的 (de)"], answer: 1 },
                { type: "trueFalse", claim: "过 emphasizes past experience ('have ever done').", answer: true }
            ]
        },
        {
            id: "zho-34",
            moduleId: "verbs",
            moduleTitle: "Verbs",
            title: "The Progressive: 在 (zài)",
            explanation: [
                { type: "p", text: "To say an action is in progress ('-ing'), put 在 (zài) before the verb. You can add 正 (zhèng) for emphasis: 正在." },
                { type: "example", zh: "我在吃饭。(Wǒ zài chī fàn.)", en: "I am eating." },
                { type: "example", zh: "他在看电视。(Tā zài kàn diànshì.)", en: "He is watching TV." },
                { type: "example", zh: "他们正在工作。(Tāmen zhèngzài gōngzuò.)", en: "They are working (right now)." },
                { type: "p", text: "Don't confuse this 在 (before a verb = progressive) with the 在 that means 'located at' (before a place)." }
            ],
            exercises: [
                { type: "mc", prompt: "To say an action is in progress ('-ing'), you put which word before the verb?", options: ["了 (le)", "在 (zài)", "过 (guò)", "会 (huì)"], answer: 1 },
                { type: "type", prompt: "Type the pinyin for 在 (progressive marker).", answer: "zài", accept: ["zài", "zai"] },
                { type: "mc", prompt: "How do you say 'I am eating'? (吃饭 = eat)", options: ["我吃饭了。", "我在吃饭。", "我吃饭在。", "我会吃饭。"], answer: 1 },
                { type: "trueFalse", claim: "Adding 正 gives 正在, for emphasis.", answer: true },
                { type: "mc", prompt: "'他在看电视' means...?", options: ["He watched TV", "He is watching TV", "He will watch TV", "He can watch TV"], answer: 1 },
                { type: "trueFalse", claim: "The progressive 在 goes before the verb.", answer: true }
            ]
        },

        // ── Module 6: Sentence Structure ─────────────────────────────────
        {
            id: "zho-35",
            moduleId: "syntax",
            moduleTitle: "Sentence Structure",
            title: "Basic Word Order (S-V-O)",
            explanation: [
                { type: "p", text: "The core Chinese sentence is Subject - Verb - Object, just like English." },
                { type: "example", zh: "我喝水。(Wǒ hē shuǐ.)", en: "I drink water. (S-V-O)" },
                { type: "example", zh: "她学中文。(Tā xué Zhōngwén.)", en: "She studies Chinese." },
                { type: "p", text: "What differs from English is where extra information goes - time and place, adverbs, and questions - which the next lessons cover." }
            ],
            exercises: [
                { type: "mc", prompt: "What is the basic Chinese word order?", options: ["V-S-O", "S-O-V", "S-V-O", "O-V-S"], answer: 2 },
                { type: "trueFalse", claim: "'我喝水' follows Subject-Verb-Object order.", answer: true },
                { type: "mc", prompt: "Which sentence correctly follows S-V-O?", options: ["水我喝。", "喝我水。", "我喝水。", "我水喝。"], answer: 2 },
                { type: "type", prompt: "Type the pinyin for 学 (to study/learn).", answer: "xué", accept: ["xué", "xue"] },
                { type: "mc", prompt: "In '她学中文', what is the object?", options: ["她 (she)", "学 (study)", "中文 (Chinese)", "nothing"], answer: 2 },
                { type: "trueFalse", claim: "Chinese basic word order is similar to English S-V-O.", answer: true }
            ]
        },
        {
            id: "zho-36",
            moduleId: "syntax",
            moduleTitle: "Sentence Structure",
            title: "Time and Place Come Before the Verb",
            explanation: [
                { type: "p", text: "This is a key difference from English: time words and place phrases go BEFORE the verb, not after. Time usually comes early, right after (or before) the subject." },
                { type: "example", zh: "我明天去。(Wǒ míngtiān qù.)", en: "I'm going tomorrow. (lit. I tomorrow go)" },
                { type: "example", zh: "他在家吃饭。(Tā zài jiā chī fàn.)", en: "He eats at home. (lit. He at-home eats)" },
                { type: "p", text: "So 'I eat at home' is literally 'I at-home eat' - the place (在家) sits before the verb 吃." },
                { type: "example", zh: "我们晚上看电影。(Wǒmen wǎnshang kàn diànyǐng.)", en: "We watch a movie in the evening." }
            ],
            exercises: [
                { type: "mc", prompt: "In Chinese, where do time and place go?", options: ["after the verb", "before the verb", "at the very end", "after the object"], answer: 1 },
                { type: "trueFalse", claim: "'I eat at home' is literally 'I at-home eat' in Chinese.", answer: true },
                { type: "mc", prompt: "How do you say 'I'm going tomorrow'? (明天 = tomorrow, 去 = go)", options: ["我去明天。", "我明天去。", "明天去我。", "我去了明天。"], answer: 1 },
                { type: "type", prompt: "Type the pinyin for 明天 (tomorrow).", answer: "míngtiān", accept: ["míngtiān", "mingtian"] },
                { type: "mc", prompt: "Where does 在家 (at home) go in 'He eats at home'?", options: ["after 吃 (eat)", "before 吃 (eat)", "at the end", "before 他 (he)"], answer: 1 },
                { type: "trueFalse", claim: "In Chinese, time and place phrases come after the verb, like English.", answer: false }
            ]
        },
        {
            id: "zho-37",
            moduleId: "syntax",
            moduleTitle: "Sentence Structure",
            title: "Adverbs 也 (also) and 都 (all)",
            explanation: [
                { type: "p", text: "Adverbs like 也 (yě, 'also') and 都 (dōu, 'all/both') go before the verb - never before the subject." },
                { type: "example", zh: "我也去。(Wǒ yě qù.)", en: "I'm going too." },
                { type: "example", zh: "我们都是学生。(Wǒmen dōu shì xuésheng.)", en: "We are all students." },
                { type: "p", text: "When you use both, the order is 也都: 他们也都来 (they all come too). Notice 也/都 come right before the verb." },
                { type: "example", zh: "他也喜欢茶。(Tā yě xǐhuan chá.)", en: "He likes tea too." }
            ],
            exercises: [
                { type: "mc", prompt: "Where does 也 (also) go?", options: ["before the subject", "before the verb", "at the end", "after the object"], answer: 1 },
                { type: "mc", prompt: "Which word means 'all / both'?", options: ["也 (yě)", "都 (dōu)", "很 (hěn)", "还 (hái)"], answer: 1 },
                { type: "type", prompt: "Type the pinyin for 也 (also).", answer: "yě", accept: ["yě", "ye"] },
                { type: "trueFalse", claim: "'我们都是学生' means 'We are all students'.", answer: true },
                { type: "mc", prompt: "How do you say 'I'm going too'? (去 = go)", options: ["也我去。", "我也去。", "我去也。", "我去了也。"], answer: 1 },
                { type: "trueFalse", claim: "也 and 都 go before the subject in Chinese.", answer: false }
            ]
        },
        {
            id: "zho-38",
            moduleId: "syntax",
            moduleTitle: "Sentence Structure",
            title: "Connecting Sentences",
            explanation: [
                { type: "p", text: "These words join words and clauses. 和 (hé, 'and') mainly joins nouns, not whole sentences." },
                { type: "example", zh: "和 (hé)", en: "and (joins nouns)" },
                { type: "example", zh: "但是 (dànshì)", en: "but" },
                { type: "example", zh: "或者 (huòzhě)", en: "or (in statements)" },
                { type: "example", zh: "因为...所以... (yīnwèi...suǒyǐ...)", en: "because... so..." },
                { type: "p", text: "In questions, 'or' is 还是 (háishì), not 或者: 你喝茶还是咖啡? (Tea or coffee?)." },
                { type: "example", zh: "我喜欢茶,但是他喜欢咖啡。", en: "I like tea, but he likes coffee." }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'but'?", options: ["和 (hé)", "但是 (dànshì)", "或者 (huòzhě)", "因为 (yīnwèi)"], answer: 1 },
                { type: "mc", prompt: "和 (hé) mainly joins...?", options: ["whole sentences", "nouns", "verbs", "adjectives"], answer: 1 },
                { type: "type", prompt: "Type the pinyin for 但是 (but).", answer: "dànshì", accept: ["dànshì", "danshi"] },
                { type: "mc", prompt: "In a question, 'or' is...?", options: ["或者 (huòzhě)", "还是 (háishì)", "和 (hé)", "但是 (dànshì)"], answer: 1 },
                { type: "trueFalse", claim: "因为...所以... means 'because... so...'.", answer: true },
                { type: "mc", prompt: "How do you ask 'Tea or coffee?'", options: ["茶或者咖啡?", "茶还是咖啡?", "茶和咖啡?", "茶但是咖啡?"], answer: 1 }
            ]
        },
        {
            id: "zho-39",
            moduleId: "syntax",
            moduleTitle: "Sentence Structure",
            title: "Sentence-final Particles: 吧 and 呢",
            explanation: [
                { type: "p", text: "Little particles at the end of a sentence add tone and meaning. 吧 (ba) softens a sentence into a suggestion or a guess ('let's...', '...right?')." },
                { type: "example", zh: "我们走吧。(Wǒmen zǒu ba.)", en: "Let's go." },
                { type: "example", zh: "你是学生吧?(Nǐ shì xuésheng ba?)", en: "You're a student, right?" },
                { type: "p", text: "呢 (ne) bounces a question back ('and you?') or asks 'where is...?'." },
                { type: "example", zh: "我很好,你呢?(Wǒ hěn hǎo, nǐ ne?)", en: "I'm fine, and you?" }
            ],
            exercises: [
                { type: "mc", prompt: "Which particle turns a sentence into a suggestion ('let's...')?", options: ["吗 (ma)", "吧 (ba)", "呢 (ne)", "了 (le)"], answer: 1 },
                { type: "type", prompt: "Type the pinyin for the suggestion particle 吧.", answer: "ba", accept: ["ba"] },
                { type: "mc", prompt: "Which particle means 'and you? / what about...?'", options: ["吧 (ba)", "呢 (ne)", "吗 (ma)", "的 (de)"], answer: 1 },
                { type: "trueFalse", claim: "'我们走吧' means 'Let's go'.", answer: true },
                { type: "mc", prompt: "How do you say 'I'm fine, and you?'", options: ["我很好,你吗?", "我很好,你呢?", "我很好,你吧?", "我很好,你了?"], answer: 1 },
                { type: "trueFalse", claim: "吧 can also soften a statement into a guess ('..., right?').", answer: true }
            ]
        },

        // ── Module 7: Everyday Vocabulary ────────────────────────────────
        {
            id: "zho-40",
            moduleId: "vocabulary",
            moduleTitle: "Everyday Vocabulary",
            title: "Greetings and Courtesy",
            explanation: [
                { type: "p", text: "A handful of everyday phrases will cover most polite exchanges." },
                { type: "example", zh: "你好 / 您好 (nǐ hǎo / nín hǎo)", en: "hello / hello (polite)" },
                { type: "example", zh: "早上好 / 晚上好 (zǎoshang hǎo / wǎnshang hǎo)", en: "good morning / good evening" },
                { type: "example", zh: "再见 (zàijiàn)", en: "goodbye" },
                { type: "example", zh: "谢谢 / 不客气 (xièxie / bú kèqi)", en: "thanks / you're welcome" },
                { type: "example", zh: "对不起 / 没关系 (duìbuqǐ / méi guānxi)", en: "sorry / it's okay" }
            ],
            exercises: [
                { type: "mc", prompt: "Which means 'good morning'?", options: ["晚上好 (wǎnshang hǎo)", "早上好 (zǎoshang hǎo)", "再见 (zàijiàn)", "晚安 (wǎn'ān)"], answer: 1 },
                { type: "type", prompt: "Type the pinyin for 谢谢 (thanks).", answer: "xièxie", accept: ["xièxie", "xiexie", "xiè xie"] },
                { type: "mc", prompt: "Which means 'goodbye'?", options: ["你好 (nǐ hǎo)", "再见 (zàijiàn)", "谢谢 (xièxie)", "对不起 (duìbuqǐ)"], answer: 1 },
                { type: "trueFalse", claim: "对不起 (duìbuqǐ) means 'sorry'.", answer: true },
                { type: "type", prompt: "Type the pinyin for 你好 (hello).", answer: "nǐ hǎo", accept: ["nǐ hǎo", "nihao", "ni hao"] },
                { type: "mc", prompt: "What does 不客气 (bú kèqi) mean?", options: ["please", "sorry", "you're welcome", "goodbye"], answer: 2 }
            ]
        },
        {
            id: "zho-41",
            moduleId: "vocabulary",
            moduleTitle: "Everyday Vocabulary",
            title: "Introducing Yourself",
            explanation: [
                { type: "p", text: "These phrases cover the basics of introducing yourself. To say your name, use 叫 (jiào, 'to be called')." },
                { type: "example", zh: "我叫... (wǒ jiào...)", en: "My name is... (I'm called...)" },
                { type: "example", zh: "我是... (wǒ shì...)", en: "I am..." },
                { type: "example", zh: "我是...人 (wǒ shì...rén)", en: "I'm a ...person (nationality)" },
                { type: "example", zh: "认识你很高兴。(Rènshi nǐ hěn gāoxìng.)", en: "Nice to meet you." }
            ],
            exercises: [
                { type: "mc", prompt: "How do you say 'My name is...'?", options: ["我是人...", "我叫...", "我来...", "我很..."], answer: 1 },
                { type: "type", prompt: "Type the pinyin for 叫 (to be called).", answer: "jiào", accept: ["jiào", "jiao"] },
                { type: "mc", prompt: "What does 认识你很高兴 mean?", options: ["Nice to meet you", "Good morning", "See you later", "Where are you from"], answer: 0 },
                { type: "trueFalse", claim: "To say your nationality, you can say 我是...人 (e.g. 我是美国人 = I'm American).", answer: true },
                { type: "type", prompt: "Type the pinyin for 我是 (I am).", answer: "wǒ shì", accept: ["wǒ shì", "woshi", "wo shi"] },
                { type: "mc", prompt: "Which verb specifically means 'to be called (by name)'?", options: ["是 (shì)", "叫 (jiào)", "有 (yǒu)", "来 (lái)"], answer: 1 }
            ]
        },
        {
            id: "zho-42",
            moduleId: "vocabulary",
            moduleTitle: "Everyday Vocabulary",
            title: "Family",
            explanation: [
                { type: "p", text: "Core family words. Chinese distinguishes older vs younger siblings with different words." },
                { type: "example", zh: "妈妈 / 爸爸 (māma / bàba)", en: "mom / dad" },
                { type: "example", zh: "姐姐 / 妹妹 (jiějie / mèimei)", en: "older sister / younger sister" },
                { type: "example", zh: "哥哥 / 弟弟 (gēge / dìdi)", en: "older brother / younger brother" },
                { type: "example", zh: "儿子 / 女儿 (érzi / nǚ'ér)", en: "son / daughter" },
                { type: "example", zh: "家 / 父母 (jiā / fùmǔ)", en: "family/home / parents" }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'mom'?", options: ["爸爸 (bàba)", "妈妈 (māma)", "姐姐 (jiějie)", "哥哥 (gēge)"], answer: 1 },
                { type: "type", prompt: "Type the pinyin for 爸爸 (dad).", answer: "bàba", accept: ["bàba", "baba"] },
                { type: "mc", prompt: "Which word means 'older brother'?", options: ["弟弟 (dìdi)", "哥哥 (gēge)", "儿子 (érzi)", "爸爸 (bàba)"], answer: 1 },
                { type: "trueFalse", claim: "Chinese uses different words for older and younger siblings.", answer: true },
                { type: "mc", prompt: "What does 女儿 (nǚ'ér) mean?", options: ["son", "daughter", "mother", "younger sister"], answer: 1 },
                { type: "mc", prompt: "What does 家 (jiā) mean?", options: ["family / home", "street", "school", "car"], answer: 0 }
            ]
        },
        {
            id: "zho-43",
            moduleId: "vocabulary",
            moduleTitle: "Everyday Vocabulary",
            title: "Days and Time",
            explanation: [
                { type: "p", text: "Days of the week are built on 星期 (xīngqī, 'week') plus a number: 星期一 = Monday (week-one)." },
                { type: "example", zh: "星期一 / 星期二 (xīngqīyī / xīngqī'èr)", en: "Monday / Tuesday" },
                { type: "example", zh: "星期天 (xīngqītiān)", en: "Sunday" },
                { type: "example", zh: "今天 / 明天 / 昨天 (jīntiān / míngtiān / zuótiān)", en: "today / tomorrow / yesterday" },
                { type: "p", text: "To ask the time: 现在几点? (xiànzài jǐ diǎn, 'What time is it now?'). 点 (diǎn) means o'clock." }
            ],
            exercises: [
                { type: "mc", prompt: "How is 'Monday' formed?", options: ["星期天", "星期一 (week-one)", "一星期", "天星期"], answer: 1 },
                { type: "type", prompt: "Type the pinyin for 今天 (today).", answer: "jīntiān", accept: ["jīntiān", "jintian"] },
                { type: "mc", prompt: "Which word means 'tomorrow'?", options: ["昨天 (zuótiān)", "今天 (jīntiān)", "明天 (míngtiān)", "星期天 (xīngqītiān)"], answer: 2 },
                { type: "trueFalse", claim: "现在几点? asks what time it is.", answer: true },
                { type: "type", prompt: "Type the pinyin for 星期一 (Monday).", answer: "xīngqīyī", accept: ["xīngqīyī", "xingqiyi"] },
                { type: "mc", prompt: "What does 昨天 (zuótiān) mean?", options: ["today", "tomorrow", "yesterday", "week"], answer: 2 }
            ]
        },
        {
            id: "zho-44",
            moduleId: "vocabulary",
            moduleTitle: "Everyday Vocabulary",
            title: "Home and City",
            explanation: [
                { type: "p", text: "Vocabulary for talking about where you live." },
                { type: "example", zh: "家 / 房子 / 公寓 (jiā / fángzi / gōngyù)", en: "home / house / apartment" },
                { type: "example", zh: "房间 / 厨房 (fángjiān / chúfáng)", en: "room / kitchen" },
                { type: "example", zh: "卫生间 / 卧室 (wèishēngjiān / wòshì)", en: "bathroom / bedroom" },
                { type: "example", zh: "城市 / 街 / 市中心 (chéngshì / jiē / shì zhōngxīn)", en: "city / street / city centre" }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'apartment'?", options: ["房子 (fángzi)", "公寓 (gōngyù)", "房间 (fángjiān)", "城市 (chéngshì)"], answer: 1 },
                { type: "type", prompt: "Type the pinyin for 厨房 (kitchen).", answer: "chúfáng", accept: ["chúfáng", "chufang"] },
                { type: "mc", prompt: "Which word means 'bedroom'?", options: ["卫生间 (wèishēngjiān)", "厨房 (chúfáng)", "卧室 (wòshì)", "房间 (fángjiān)"], answer: 2 },
                { type: "trueFalse", claim: "城市 (chéngshì) means 'city'.", answer: true },
                { type: "type", prompt: "Type the pinyin for 家 (home).", answer: "jiā", accept: ["jiā", "jia"] },
                { type: "mc", prompt: "What does 街 (jiē) mean?", options: ["house", "street", "room", "city centre"], answer: 1 }
            ]
        },
        {
            id: "zho-45",
            moduleId: "vocabulary",
            moduleTitle: "Everyday Vocabulary",
            title: "Food and Drinks",
            explanation: [
                { type: "p", text: "Everyday food and mealtime vocabulary." },
                { type: "example", zh: "食物 / 水 / 牛奶 (shíwù / shuǐ / niúnǎi)", en: "food / water / milk" },
                { type: "example", zh: "米饭 / 面包 / 鸡蛋 (mǐfàn / miànbāo / jīdàn)", en: "rice / bread / egg" },
                { type: "example", zh: "肉 / 鱼 (ròu / yú)", en: "meat / fish" },
                { type: "example", zh: "早饭 / 午饭 / 晚饭 (zǎofàn / wǔfàn / wǎnfàn)", en: "breakfast / lunch / dinner" }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'water'?", options: ["牛奶 (niúnǎi)", "水 (shuǐ)", "米饭 (mǐfàn)", "肉 (ròu)"], answer: 1 },
                { type: "type", prompt: "Type the pinyin for 米饭 (rice).", answer: "mǐfàn", accept: ["mǐfàn", "mifan"] },
                { type: "mc", prompt: "Which word means 'dinner'?", options: ["早饭 (zǎofàn)", "午饭 (wǔfàn)", "晚饭 (wǎnfàn)", "食物 (shíwù)"], answer: 2 },
                { type: "trueFalse", claim: "鱼 (yú) means 'fish'.", answer: true },
                { type: "type", prompt: "Type the pinyin for 水 (water).", answer: "shuǐ", accept: ["shuǐ", "shui"] },
                { type: "mc", prompt: "What does 早饭 (zǎofàn) mean?", options: ["lunch", "dinner", "breakfast", "food"], answer: 2 }
            ]
        },
        {
            id: "zho-46",
            moduleId: "vocabulary",
            moduleTitle: "Everyday Vocabulary",
            title: "Work and Studies",
            explanation: [
                { type: "p", text: "Vocabulary for talking about jobs and school." },
                { type: "example", zh: "工作 / 办公室 (gōngzuò / bàngōngshì)", en: "work/job / office" },
                { type: "example", zh: "老师 / 学生 (lǎoshī / xuésheng)", en: "teacher / student" },
                { type: "example", zh: "学校 / 大学 (xuéxiào / dàxué)", en: "school / university" },
                { type: "example", zh: "学习 / 开会 (xuéxí / kāihuì)", en: "to study / to have a meeting" }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'teacher'?", options: ["学生 (xuésheng)", "老师 (lǎoshī)", "学校 (xuéxiào)", "工作 (gōngzuò)"], answer: 1 },
                { type: "type", prompt: "Type the pinyin for 学校 (school).", answer: "xuéxiào", accept: ["xuéxiào", "xuexiao"] },
                { type: "mc", prompt: "Which word means 'office'?", options: ["工作 (gōngzuò)", "办公室 (bàngōngshì)", "学校 (xuéxiào)", "大学 (dàxué)"], answer: 1 },
                { type: "trueFalse", claim: "大学 (dàxué) means 'university'.", answer: true },
                { type: "type", prompt: "Type the pinyin for 工作 (work/job).", answer: "gōngzuò", accept: ["gōngzuò", "gongzuo"] },
                { type: "mc", prompt: "What does 学习 (xuéxí) mean?", options: ["to work", "to study", "to teach", "to meet"], answer: 1 }
            ]
        },
        {
            id: "zho-47",
            moduleId: "vocabulary",
            moduleTitle: "Everyday Vocabulary",
            title: "Free Time and Hobbies",
            explanation: [
                { type: "p", text: "Vocabulary for talking about hobbies and leisure time." },
                { type: "example", zh: "爱好 (àihào)", en: "hobby" },
                { type: "example", zh: "玩 / 运动 / 旅行 (wán / yùndòng / lǚxíng)", en: "to play/have fun / to exercise / to travel" },
                { type: "example", zh: "音乐 / 电影 / 书 (yīnyuè / diànyǐng / shū)", en: "music / movie / book" }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'hobby'?", options: ["运动 (yùndòng)", "爱好 (àihào)", "音乐 (yīnyuè)", "电影 (diànyǐng)"], answer: 1 },
                { type: "type", prompt: "Type the pinyin for 电影 (movie).", answer: "diànyǐng", accept: ["diànyǐng", "dianying"] },
                { type: "mc", prompt: "Which word means 'to exercise / sports'?", options: ["玩 (wán)", "运动 (yùndòng)", "旅行 (lǚxíng)", "看 (kàn)"], answer: 1 },
                { type: "trueFalse", claim: "音乐 (yīnyuè) means 'music'.", answer: true },
                { type: "type", prompt: "Type the pinyin for 音乐 (music).", answer: "yīnyuè", accept: ["yīnyuè", "yinyue"] },
                { type: "mc", prompt: "What does 书 (shū) mean?", options: ["book", "music", "movie", "game"], answer: 0 }
            ]
        },
        {
            id: "zho-48",
            moduleId: "vocabulary",
            moduleTitle: "Everyday Vocabulary",
            title: "Technology and the Internet",
            explanation: [
                { type: "p", text: "Vocabulary for talking about devices and getting online." },
                { type: "example", zh: "电脑 / 手机 / 屏幕 (diànnǎo / shǒujī / píngmù)", en: "computer / phone / screen" },
                { type: "example", zh: "网络 / 网站 (wǎngluò / wǎngzhàn)", en: "internet / website" },
                { type: "example", zh: "电子邮件 / 密码 (diànzǐ yóujiàn / mìmǎ)", en: "email / password" },
                { type: "example", zh: "下载 / 搜索 (xiàzài / sōusuǒ)", en: "to download / to search" }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'phone (mobile)'?", options: ["电脑 (diànnǎo)", "手机 (shǒujī)", "屏幕 (píngmù)", "网站 (wǎngzhàn)"], answer: 1 },
                { type: "type", prompt: "Type the pinyin for 电脑 (computer).", answer: "diànnǎo", accept: ["diànnǎo", "diannao"] },
                { type: "mc", prompt: "Which word means 'password'?", options: ["网站 (wǎngzhàn)", "密码 (mìmǎ)", "网络 (wǎngluò)", "屏幕 (píngmù)"], answer: 1 },
                { type: "trueFalse", claim: "搜索 (sōusuǒ) means 'to search'.", answer: true },
                { type: "type", prompt: "Type the pinyin for 手机 (mobile phone).", answer: "shǒujī", accept: ["shǒujī", "shouji"] },
                { type: "mc", prompt: "What does 下载 (xiàzài) mean?", options: ["to download", "to search", "to call", "to type"], answer: 0 }
            ]
        },
        {
            id: "zho-49",
            moduleId: "vocabulary",
            moduleTitle: "Everyday Vocabulary",
            title: "Shopping and Money",
            explanation: [
                { type: "p", text: "Vocabulary for shopping and handling money." },
                { type: "example", zh: "买 / 卖 / 付钱 (mǎi / mài / fù qián)", en: "to buy / to sell / to pay" },
                { type: "example", zh: "商店 / 钱 / 价格 (shāngdiàn / qián / jiàgé)", en: "store / money / price" },
                { type: "example", zh: "便宜 / 贵 (piányi / guì)", en: "cheap / expensive" },
                { type: "p", text: "Notice 买 (mǎi, buy, 3rd tone) and 卖 (mài, sell, 4th tone) differ only by tone!" }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'to buy'?", options: ["卖 (mài)", "买 (mǎi)", "付钱 (fù qián)", "贵 (guì)"], answer: 1 },
                { type: "type", prompt: "Type the pinyin for 钱 (money).", answer: "qián", accept: ["qián", "qian"] },
                { type: "mc", prompt: "Which word means 'expensive'?", options: ["便宜 (piányi)", "贵 (guì)", "钱 (qián)", "商店 (shāngdiàn)"], answer: 1 },
                { type: "trueFalse", claim: "便宜 (piányi) means 'cheap'.", answer: true },
                { type: "mc", prompt: "买 (buy) and 卖 (sell) differ only in...?", options: ["their consonant", "their tone", "their meaning is identical", "nothing"], answer: 1 },
                { type: "mc", prompt: "What does 商店 (shāngdiàn) mean?", options: ["money", "store", "price", "to pay"], answer: 1 }
            ]
        },

        // ── Module 8: Real-Life Communication ────────────────────────────
        {
            id: "zho-50",
            moduleId: "communication",
            moduleTitle: "Real-Life Communication",
            title: "Asking and Giving Personal Information",
            explanation: [
                { type: "p", text: "The most common get-to-know-you questions." },
                { type: "example", zh: "你叫什么名字?(Nǐ jiào shénme míngzi?)", en: "What's your name?" },
                { type: "example", zh: "你今年多大?(Nǐ jīnnián duō dà?)", en: "How old are you?" },
                { type: "example", zh: "你住在哪儿?(Nǐ zhù zài nǎr?)", en: "Where do you live?" },
                { type: "example", zh: "你做什么工作?(Nǐ zuò shénme gōngzuò?)", en: "What do you do for work?" }
            ],
            exercises: [
                { type: "mc", prompt: "What does 你今年多大? ask?", options: ["What's your name?", "How old are you?", "Where do you live?", "What's your job?"], answer: 1 },
                { type: "type", prompt: "Type the pinyin for 名字 (name).", answer: "míngzi", accept: ["míngzi", "mingzi"] },
                { type: "mc", prompt: "Which question asks about someone's job?", options: ["你叫什么名字?", "你住在哪儿?", "你做什么工作?", "你今年多大?"], answer: 2 },
                { type: "trueFalse", claim: "你住在哪儿? asks where you live.", answer: true },
                { type: "mc", prompt: "How do you ask 'What's your name?'", options: ["你叫什么名字?", "你多大?", "你在哪儿?", "你好吗?"], answer: 0 },
                { type: "type", prompt: "Type the pinyin for 工作 (work/job).", answer: "gōngzuò", accept: ["gōngzuò", "gongzuo"] }
            ]
        },
        {
            id: "zho-51",
            moduleId: "communication",
            moduleTitle: "Real-Life Communication",
            title: "Asking for Directions",
            explanation: [
                { type: "p", text: "Phrases for finding your way around." },
                { type: "example", zh: "...在哪儿?(...zài nǎr?)", en: "Where is...?" },
                { type: "example", zh: "左 / 右 / 直走 (zuǒ / yòu / zhí zǒu)", en: "left / right / go straight" },
                { type: "example", zh: "怎么走?(zěnme zǒu?)", en: "How do I get there? (lit. how to go?)" },
                { type: "example", zh: "公共汽车 / 火车 / 地铁 (gōnggòng qìchē / huǒchē / dìtiě)", en: "bus / train / subway" }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'left'?", options: ["右 (yòu)", "左 (zuǒ)", "直走 (zhí zǒu)", "这儿 (zhèr)"], answer: 1 },
                { type: "type", prompt: "Type the pinyin for 直走 (go straight).", answer: "zhí zǒu", accept: ["zhí zǒu", "zhizou", "zhí zou"] },
                { type: "mc", prompt: "Which word means 'train'?", options: ["公共汽车 (gōnggòng qìchē)", "火车 (huǒchē)", "地铁 (dìtiě)", "飞机 (fēijī)"], answer: 1 },
                { type: "trueFalse", claim: "怎么走? asks how to get somewhere.", answer: true },
                { type: "type", prompt: "Type the pinyin for 右 (right).", answer: "yòu", accept: ["yòu", "you"] },
                { type: "mc", prompt: "How do you ask 'Where is the station?' (车站 = station)", options: ["车站在哪儿?", "车站怎么样?", "车站是什么?", "车站有吗?"], answer: 0 }
            ]
        },
        {
            id: "zho-52",
            moduleId: "communication",
            moduleTitle: "Real-Life Communication",
            title: "Shopping at a Store",
            explanation: [
                { type: "p", text: "Phrases you'll hear and use while shopping." },
                { type: "example", zh: "我可以帮您吗?(Wǒ kěyǐ bāng nín ma?)", en: "Can I help you?" },
                { type: "example", zh: "我只是看看。(Wǒ zhǐshì kànkan.)", en: "I'm just looking." },
                { type: "example", zh: "这个多少钱?(Zhège duōshao qián?)", en: "How much is this?" },
                { type: "example", zh: "太贵了!(Tài guì le!)", en: "Too expensive!" }
            ],
            exercises: [
                { type: "mc", prompt: "What does 我可以帮您吗? mean?", options: ["Can I help you?", "Can you help me?", "Where is it?", "How much?"], answer: 0 },
                { type: "type", prompt: "Type the pinyin for 多少钱 (how much money).", answer: "duōshao qián", accept: ["duōshao qián", "duoshaoqian", "duoshao qian"] },
                { type: "mc", prompt: "How do you say 'I'm just looking'?", options: ["我只是看看。", "我买这个。", "这个多少钱?", "太贵了!"], answer: 0 },
                { type: "trueFalse", claim: "太贵了! means 'Too expensive!'.", answer: true },
                { type: "mc", prompt: "How do you ask 'How much is this?'", options: ["这个多少钱?", "这个是什么?", "这个在哪儿?", "这个好吗?"], answer: 0 },
                { type: "type", prompt: "Type the pinyin for 贵 (expensive).", answer: "guì", accept: ["guì", "gui"] }
            ]
        },
        {
            id: "zho-53",
            moduleId: "communication",
            moduleTitle: "Real-Life Communication",
            title: "Ordering Food and Drinks",
            explanation: [
                { type: "p", text: "Phrases for restaurants and cafés." },
                { type: "example", zh: "我要... (wǒ yào...)", en: "I'll have... / I want..." },
                { type: "example", zh: "我想要一杯茶。(Wǒ xiǎng yào yì bēi chá.)", en: "I'd like a cup of tea." },
                { type: "example", zh: "菜单 / 买单 (càidān / mǎidān)", en: "menu / the bill (check, please)" },
                { type: "example", zh: "好吃 / 好喝 (hǎochī / hǎohē)", en: "tasty (food) / tasty (drink)" }
            ],
            exercises: [
                { type: "mc", prompt: "How do you say 'I'll have... / I want...'?", options: ["我要...", "我叫...", "我住...", "我是..."], answer: 0 },
                { type: "type", prompt: "Type the pinyin for 菜单 (menu).", answer: "càidān", accept: ["càidān", "caidan"] },
                { type: "mc", prompt: "Which word asks for 'the bill'?", options: ["菜单 (càidān)", "买单 (mǎidān)", "好吃 (hǎochī)", "多少 (duōshao)"], answer: 1 },
                { type: "trueFalse", claim: "好吃 (hǎochī) means food tastes good ('tasty').", answer: true },
                { type: "type", prompt: "Type the pinyin for 茶 (tea).", answer: "chá", accept: ["chá", "cha"] },
                { type: "mc", prompt: "How do you say 'I'd like a cup of tea'? (一杯茶 = a cup of tea)", options: ["我想要一杯茶。", "我一杯茶要。", "茶我想要一杯。", "我要茶一杯。"], answer: 0 }
            ]
        },
        {
            id: "zho-54",
            moduleId: "communication",
            moduleTitle: "Real-Life Communication",
            title: "Talking about the Weather",
            explanation: [
                { type: "p", text: "Small talk about the weather. To ask, use 怎么样 (zěnmeyàng, 'how is it?')." },
                { type: "example", zh: "今天天气怎么样?(Jīntiān tiānqì zěnmeyàng?)", en: "How's the weather today?" },
                { type: "example", zh: "晴天 / 下雨 / 下雪 (qíngtiān / xià yǔ / xià xuě)", en: "sunny / raining / snowing" },
                { type: "example", zh: "热 / 冷 (rè / lěng)", en: "hot / cold" },
                { type: "example", zh: "风 / 云 (fēng / yún)", en: "wind / cloud" }
            ],
            exercises: [
                { type: "mc", prompt: "What does 今天天气怎么样? ask?", options: ["What time is it?", "How's the weather today?", "Where are you?", "How are you?"], answer: 1 },
                { type: "type", prompt: "Type the pinyin for 下雨 (to rain).", answer: "xià yǔ", accept: ["xià yǔ", "xiayu", "xià yu"] },
                { type: "mc", prompt: "Which word means 'hot'?", options: ["冷 (lěng)", "热 (rè)", "风 (fēng)", "云 (yún)"], answer: 1 },
                { type: "trueFalse", claim: "下雪 (xià xuě) means 'to snow'.", answer: true },
                { type: "type", prompt: "Type the pinyin for 冷 (cold).", answer: "lěng", accept: ["lěng", "leng"] },
                { type: "mc", prompt: "Which word means 'wind'?", options: ["云 (yún)", "风 (fēng)", "雨 (yǔ)", "雪 (xuě)"], answer: 1 }
            ]
        },
        {
            id: "zho-55",
            moduleId: "communication",
            moduleTitle: "Real-Life Communication",
            title: "Describing Your Daily Routine",
            explanation: [
                { type: "p", text: "Verbs for describing a typical day, roughly in order." },
                { type: "example", zh: "起床 / 洗澡 (qǐchuáng / xǐzǎo)", en: "to get up / to shower" },
                { type: "example", zh: "吃早饭 / 上班 (chī zǎofàn / shàngbān)", en: "to eat breakfast / to go to work" },
                { type: "example", zh: "回家 / 睡觉 (huí jiā / shuìjiào)", en: "to go home / to sleep" }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'to get up'?", options: ["睡觉 (shuìjiào)", "起床 (qǐchuáng)", "洗澡 (xǐzǎo)", "回家 (huí jiā)"], answer: 1 },
                { type: "type", prompt: "Type the pinyin for 睡觉 (to sleep).", answer: "shuìjiào", accept: ["shuìjiào", "shuijiao"] },
                { type: "mc", prompt: "Which word means 'to go to work'?", options: ["回家 (huí jiā)", "上班 (shàngbān)", "起床 (qǐchuáng)", "洗澡 (xǐzǎo)"], answer: 1 },
                { type: "trueFalse", claim: "洗澡 (xǐzǎo) means 'to shower / bathe'.", answer: true },
                { type: "type", prompt: "Type the pinyin for 回家 (to go home).", answer: "huí jiā", accept: ["huí jiā", "huijia", "huí jia"] },
                { type: "mc", prompt: "What does 吃早饭 (chī zǎofàn) mean?", options: ["to eat dinner", "to eat breakfast", "to cook", "to go home"], answer: 1 }
            ]
        },
        {
            id: "zho-56",
            moduleId: "communication",
            moduleTitle: "Real-Life Communication",
            title: "Expressing Preferences and Opinions",
            explanation: [
                { type: "p", text: "Phrases for saying what you like and think. 喜欢 (xǐhuan) means 'to like'." },
                { type: "example", zh: "我喜欢... / 我不喜欢... (wǒ xǐhuan... / wǒ bù xǐhuan...)", en: "I like... / I don't like..." },
                { type: "example", zh: "我更喜欢... (wǒ gèng xǐhuan...)", en: "I prefer..." },
                { type: "example", zh: "我觉得... (wǒ juéde...)", en: "I think / feel..." },
                { type: "example", zh: "我同意。/ 我不同意。(wǒ tóngyì / wǒ bù tóngyì)", en: "I agree. / I disagree." }
            ],
            exercises: [
                { type: "mc", prompt: "How do you say 'I prefer...'?", options: ["我喜欢...", "我更喜欢...", "我觉得...", "我同意..."], answer: 1 },
                { type: "type", prompt: "Type the pinyin for 喜欢 (to like).", answer: "xǐhuan", accept: ["xǐhuan", "xihuan"] },
                { type: "mc", prompt: "Which phrase means 'I think / feel...'?", options: ["我喜欢...", "我觉得...", "我更喜欢...", "我不同意..."], answer: 1 },
                { type: "trueFalse", claim: "我不同意 means 'I disagree'.", answer: true },
                { type: "mc", prompt: "How do you say 'I don't like it'?", options: ["我喜欢。", "我不喜欢。", "我更喜欢。", "我同意。"], answer: 1 },
                { type: "type", prompt: "Type the pinyin for 同意 (to agree).", answer: "tóngyì", accept: ["tóngyì", "tongyi"] }
            ]
        },
        {
            id: "zho-57",
            moduleId: "communication",
            moduleTitle: "Real-Life Communication",
            title: "Making Suggestions and Invitations",
            explanation: [
                { type: "p", text: "Phrases for proposing plans and inviting people along. 一起 (yìqǐ) means 'together'." },
                { type: "example", zh: "我们一起去吧!(Wǒmen yìqǐ qù ba!)", en: "Let's go together!" },
                { type: "example", zh: "你想去吗?(Nǐ xiǎng qù ma?)", en: "Do you want to go?" },
                { type: "example", zh: "好主意!(Hǎo zhǔyi!)", en: "Good idea!" },
                { type: "example", zh: "好啊 / 没问题 (hǎo a / méi wèntí)", en: "Sure / no problem" }
            ],
            exercises: [
                { type: "mc", prompt: "Which word means 'together'?", options: ["一起 (yìqǐ)", "一样 (yíyàng)", "一个 (yí ge)", "一点 (yìdiǎn)"], answer: 0 },
                { type: "type", prompt: "Type the pinyin for 一起 (together).", answer: "yìqǐ", accept: ["yìqǐ", "yiqi"] },
                { type: "mc", prompt: "How do you invite: 'Do you want to go?'", options: ["你想去吗?", "你去了吗?", "你在哪儿?", "你好吗?"], answer: 0 },
                { type: "trueFalse", claim: "好主意! means 'Good idea!'.", answer: true },
                { type: "mc", prompt: "Which means 'no problem'?", options: ["好主意 (hǎo zhǔyi)", "没问题 (méi wèntí)", "对不起 (duìbuqǐ)", "再见 (zàijiàn)"], answer: 1 },
                { type: "type", prompt: "Type the pinyin for the suggestion particle 吧 (as in 走吧).", answer: "ba", accept: ["ba"] }
            ]
        },
        {
            id: "zho-58",
            moduleId: "communication",
            moduleTitle: "Real-Life Communication",
            title: "Talking about Future Plans",
            explanation: [
                { type: "p", text: "Chinese has no future tense - you use a future time word plus the plain verb. 打算 (dǎsuàn) means 'to plan to'." },
                { type: "example", zh: "你明天做什么?(Nǐ míngtiān zuò shénme?)", en: "What are you doing tomorrow?" },
                { type: "example", zh: "我打算去北京。(Wǒ dǎsuàn qù Běijīng.)", en: "I plan to go to Beijing." },
                { type: "example", zh: "下个星期 / 明年 (xià ge xīngqī / míngnián)", en: "next week / next year" },
                { type: "p", text: "So 'I'm going tomorrow' is just 我明天去 - the time word 明天 does all the future-tense work." }
            ],
            exercises: [
                { type: "mc", prompt: "How does Chinese express the future?", options: ["a future verb ending", "a future time word + plain verb", "the particle 了", "the particle 过"], answer: 1 },
                { type: "type", prompt: "Type the pinyin for 明年 (next year).", answer: "míngnián", accept: ["míngnián", "mingnian"] },
                { type: "mc", prompt: "What does 打算 (dǎsuàn) mean?", options: ["to finish", "to plan to", "to want back", "to travel"], answer: 1 },
                { type: "trueFalse", claim: "'我明天去' means 'I'm going tomorrow'.", answer: true },
                { type: "mc", prompt: "Which means 'next week'?", options: ["下个星期 (xià ge xīngqī)", "明年 (míngnián)", "今天 (jīntiān)", "昨天 (zuótiān)"], answer: 0 },
                { type: "type", prompt: "Type the pinyin for 明天 (tomorrow).", answer: "míngtiān", accept: ["míngtiān", "mingtian"] }
            ]
        }
    ]
};

// Additive dual-export (see the header note): merge onto the shared global so
// load order relative to the other lessons-*.js files never clobbers another
// course, and expose the same object to api/_lib.js's require() for id validation.
if (typeof window !== "undefined") {
    window.POLYTYPE_LESSONS = Object.assign(window.POLYTYPE_LESSONS || {}, CHINESE_LESSONS_DATA);
}
if (typeof module !== "undefined" && module.exports) module.exports = CHINESE_LESSONS_DATA;
