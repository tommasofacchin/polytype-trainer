// Example sentences for the deck's word-detail card (openWordDetail in
// js/deck.js). Keyed by language, then by the numeric suffix of the word id -
// nor_003 is 3 - so a deck can be re-authored without this file caring about
// ids, only about positions.
//
// The asterisks in `text` mark the flashcard's own word inside the sentence;
// renderExampleText splits on them and wraps the marked run in <mark>. Marking
// it in the data rather than searching for the word at render time is what
// makes this work for inflected forms, multi-word entries ("vær så snill"),
// and scripts with no spaces to match on.
//
// Currently the first five words of every course (hello / thanks / yes / no /
// please) - deliberately a sample while the card's design is being reviewed.
// A word with no entry here still opens; it just shows the "coming soon" note.
window.DECK_EXAMPLES = {
  norwegian: {
    1: [
      { text: "*Hei*, hvordan går det?", translation: "Hi, how are you?" },
      { text: "*Hei* på deg!", translation: "Hello there!" },
      { text: "Hun sa *hei* til læreren.", translation: "She said hi to the teacher." }
    ],
    2: [
      { text: "*Takk* for hjelpen!", translation: "Thanks for the help!" },
      { text: "Tusen *takk* for maten.", translation: "Thank you very much for the meal." },
      { text: "Ja *takk*, gjerne.", translation: "Yes please, gladly." }
    ],
    3: [
      { text: "*Ja*, det stemmer.", translation: "Yes, that's right." },
      { text: "Vil du ha kaffe? *Ja*, takk.", translation: "Do you want coffee? Yes, please." },
      { text: "Hun svarte *ja* med en gang.", translation: "She answered yes right away." }
    ],
    4: [
      { text: "*Nei*, jeg kan ikke i dag.", translation: "No, I can't today." },
      { text: "*Nei* takk, jeg er mett.", translation: "No thanks, I'm full." },
      { text: "Han sa *nei* til tilbudet.", translation: "He said no to the offer." }
    ],
    5: [
      { text: "Kan du hjelpe meg, *vær så snill*?", translation: "Can you help me, please?" },
      { text: "*Vær så snill*, vent litt.", translation: "Please, wait a moment." },
      { text: "Gi meg saltet, *vær så snill*.", translation: "Pass me the salt, please." }
    ]
  },

  swedish: {
    1: [
      { text: "*Hej*, hur mår du?", translation: "Hi, how are you?" },
      { text: "*Hej* på dig!", translation: "Hello there!" },
      { text: "Hon sa *hej* till läraren.", translation: "She said hi to the teacher." }
    ],
    2: [
      { text: "*Tack* för hjälpen!", translation: "Thanks for the help!" },
      { text: "Tusen *tack*!", translation: "Thanks a lot!" },
      { text: "Nej *tack*, jag är mätt.", translation: "No thanks, I'm full." }
    ],
    3: [
      { text: "*Ja*, det stämmer.", translation: "Yes, that's right." },
      { text: "Vill du ha kaffe? *Ja*, tack.", translation: "Do you want coffee? Yes, please." },
      { text: "Hon svarade *ja* direkt.", translation: "She answered yes right away." }
    ],
    4: [
      { text: "*Nej*, jag kan inte idag.", translation: "No, I can't today." },
      { text: "*Nej* tack, det är bra.", translation: "No thanks, it's fine." },
      { text: "Han sa *nej* till erbjudandet.", translation: "He said no to the offer." }
    ],
    5: [
      { text: "*Snälla*, vänta lite.", translation: "Please, wait a moment." },
      { text: "Kan du hjälpa mig, *snälla*?", translation: "Can you help me, please?" },
      { text: "*Snälla*, ge mig saltet.", translation: "Please, pass me the salt." }
    ]
  },

  german: {
    1: [
      { text: "*Hallo*, wie geht es dir?", translation: "Hello, how are you?" },
      { text: "*Hallo*! Schön, dich zu sehen.", translation: "Hello! Nice to see you." },
      { text: "Er sagte *hallo* und ging weiter.", translation: "He said hello and walked on." }
    ],
    2: [
      { text: "*Danke* für deine Hilfe!", translation: "Thanks for your help!" },
      { text: "*Danke* schön!", translation: "Thank you very much!" },
      { text: "Nein, *danke*.", translation: "No, thank you." }
    ],
    3: [
      { text: "*Ja*, das stimmt.", translation: "Yes, that's right." },
      { text: "Möchtest du Kaffee? *Ja*, bitte.", translation: "Would you like coffee? Yes, please." },
      { text: "Sie sagte *ja* und lächelte.", translation: "She said yes and smiled." }
    ],
    4: [
      { text: "*Nein*, heute kann ich nicht.", translation: "No, I can't today." },
      { text: "*Nein*, danke.", translation: "No, thanks." },
      { text: "Er antwortete mit *nein*.", translation: "He answered with a no." }
    ],
    5: [
      { text: "Einen Kaffee, *bitte*.", translation: "A coffee, please." },
      { text: "*Bitte* warte kurz.", translation: "Please wait a moment." },
      { text: "Kannst du mir *bitte* helfen?", translation: "Can you help me, please?" }
    ]
  },

  italian: {
    1: [
      { text: "*Ciao*, come stai?", translation: "Hi, how are you?" },
      { text: "*Ciao* a tutti!", translation: "Hi everyone!" },
      { text: "Mi ha salutato con un *ciao*.", translation: "He greeted me with a hi." }
    ],
    2: [
      { text: "*Grazie* per l'aiuto!", translation: "Thanks for the help!" },
      { text: "Mille *grazie*!", translation: "Thanks a lot!" },
      { text: "No, *grazie*, sono a posto.", translation: "No thanks, I'm fine." }
    ],
    3: [
      { text: "*Sì*, è vero.", translation: "Yes, it's true." },
      { text: "Vuoi un caffè? *Sì*, grazie.", translation: "Do you want a coffee? Yes, please." },
      { text: "Ha risposto *sì* subito.", translation: "She answered yes right away." }
    ],
    4: [
      { text: "*No*, oggi non posso.", translation: "No, I can't today." },
      { text: "*No*, grazie, ho già mangiato.", translation: "No thanks, I've already eaten." },
      { text: "Ha detto di *no*.", translation: "He said no." }
    ],
    5: [
      { text: "Un caffè, *per favore*.", translation: "A coffee, please." },
      { text: "*Per favore*, aspetta un attimo.", translation: "Please, wait a moment." },
      { text: "Puoi aiutarmi, *per favore*?", translation: "Can you help me, please?" }
    ]
  },

  spanish: {
    1: [
      { text: "*Hola*, ¿cómo estás?", translation: "Hi, how are you?" },
      { text: "¡*Hola* a todos!", translation: "Hi everyone!" },
      { text: "Me saludó con un *hola*.", translation: "He greeted me with a hi." }
    ],
    2: [
      { text: "¡*Gracias* por tu ayuda!", translation: "Thanks for your help!" },
      { text: "Muchas *gracias*.", translation: "Thank you very much." },
      { text: "No, *gracias*.", translation: "No, thank you." }
    ],
    3: [
      { text: "*Sí*, es verdad.", translation: "Yes, it's true." },
      { text: "¿Quieres un café? *Sí*, por favor.", translation: "Do you want a coffee? Yes, please." },
      { text: "Respondió que *sí*.", translation: "She answered yes." }
    ],
    4: [
      { text: "*No*, hoy no puedo.", translation: "No, I can't today." },
      { text: "*No*, gracias, estoy bien.", translation: "No thanks, I'm fine." },
      { text: "Dijo que *no*.", translation: "He said no." }
    ],
    5: [
      { text: "Un café, *por favor*.", translation: "A coffee, please." },
      { text: "*Por favor*, espera un momento.", translation: "Please, wait a moment." },
      { text: "¿Puedes ayudarme, *por favor*?", translation: "Can you help me, please?" }
    ]
  },

  chinese: {
    1: [
      { text: "*你好*，我叫小明。", romanization: "*Nǐ hǎo*, wǒ jiào Xiǎo Míng.", translation: "Hello, my name is Xiao Ming." },
      { text: "老师*你好*！", romanization: "Lǎoshī *nǐ hǎo*!", translation: "Hello, teacher!" },
      { text: "*你好*，很高兴认识你。", romanization: "*Nǐ hǎo*, hěn gāoxìng rènshi nǐ.", translation: "Hello, nice to meet you." }
    ],
    2: [
      { text: "*谢谢*你的帮助。", romanization: "*Xièxie* nǐ de bāngzhù.", translation: "Thank you for your help." },
      { text: "太*谢谢*你了！", romanization: "Tài *xièxie* nǐ le!", translation: "Thank you so much!" },
      { text: "*谢谢*，我不要了。", romanization: "*Xièxie*, wǒ bú yào le.", translation: "Thanks, I don't want any more." }
    ],
    3: [
      { text: "我*是*学生。", romanization: "Wǒ *shì* xuésheng.", translation: "I am a student." },
      { text: "这*是*我的书。", romanization: "Zhè *shì* wǒ de shū.", translation: "This is my book." },
      { text: "*是*，我明白了。", romanization: "*Shì*, wǒ míngbai le.", translation: "Yes, I understand." }
    ],
    4: [
      { text: "我*不*喝咖啡。", romanization: "Wǒ *bù* hē kāfēi.", translation: "I don't drink coffee." },
      { text: "*不*，谢谢。", romanization: "*Bù*, xièxie.", translation: "No, thanks." },
      { text: "今天*不*冷。", romanization: "Jīntiān *bù* lěng.", translation: "It isn't cold today." }
    ],
    5: [
      { text: "*请*进。", romanization: "*Qǐng* jìn.", translation: "Please come in." },
      { text: "*请*等一下。", romanization: "*Qǐng* děng yíxià.", translation: "Please wait a moment." },
      { text: "*请*给我一杯水。", romanization: "*Qǐng* gěi wǒ yì bēi shuǐ.", translation: "Please give me a glass of water." }
    ]
  },

  japanese: {
    1: [
      { text: "*こんにちは*、田中さん。", romanization: "*Konnichiwa*, Tanaka-san.", translation: "Hello, Mr. Tanaka." },
      { text: "*こんにちは*、いい天気ですね。", romanization: "*Konnichiwa*, ii tenki desu ne.", translation: "Hello, nice weather isn't it." },
      { text: "先生に*こんにちは*と言いました。", romanization: "Sensei ni *konnichiwa* to iimashita.", translation: "I said hello to the teacher." }
    ],
    2: [
      { text: "*ありがとう*、助かりました。", romanization: "*Arigatou*, tasukarimashita.", translation: "Thank you, that helped." },
      { text: "本当に*ありがとう*。", romanization: "Hontou ni *arigatou*.", translation: "Thank you very much." },
      { text: "プレゼント*ありがとう*。", romanization: "Purezento *arigatou*.", translation: "Thanks for the present." }
    ],
    3: [
      { text: "*はい*、そうです。", romanization: "*Hai*, sou desu.", translation: "Yes, that's right." },
      { text: "*はい*、わかりました。", romanization: "*Hai*, wakarimashita.", translation: "Yes, I understand." },
      { text: "*はい*、私が行きます。", romanization: "*Hai*, watashi ga ikimasu.", translation: "Yes, I'll go." }
    ],
    4: [
      { text: "*いいえ*、違います。", romanization: "*Iie*, chigaimasu.", translation: "No, that's not right." },
      { text: "*いいえ*、結構です。", romanization: "*Iie*, kekkou desu.", translation: "No, thank you." },
      { text: "*いいえ*、今日は行きません。", romanization: "*Iie*, kyou wa ikimasen.", translation: "No, I'm not going today." }
    ],
    5: [
      { text: "コーヒーを*お願いします*。", romanization: "Koohii o *onegaishimasu*.", translation: "Coffee, please." },
      { text: "写真を*お願いします*。", romanization: "Shashin o *onegaishimasu*.", translation: "A photo, please." },
      { text: "よろしく*お願いします*。", romanization: "Yoroshiku *onegaishimasu*.", translation: "Pleased to meet you." }
    ]
  }
};
