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
    ],
    6: [
      { text: "*Unnskyld*, jeg kom for sent.", translation: "Sorry, I'm late." },
      { text: "*Unnskyld*, jeg hørte ikke.", translation: "Sorry, I didn't hear." },
      { text: "Han sa *unnskyld* for feilen.", translation: "He said sorry for the mistake." }
    ],
    7: [
      { text: "God *morgen*!", translation: "Good morning!" },
      { text: "Hver *morgen* drikker jeg kaffe.", translation: "Every morning I drink coffee." },
      { text: "*Morgenen* var kald og stille.", translation: "The morning was cold and quiet." }
    ],
    8: [
      { text: "God *kveld*!", translation: "Good evening!" },
      { text: "Om *kvelden* leser jeg en bok.", translation: "In the evening I read a book." },
      { text: "Vi spiser middag om *kvelden*.", translation: "We eat dinner in the evening." }
    ],
    9: [
      { text: "Det er en fin *dag* i dag.", translation: "It's a nice day today." },
      { text: "Hver *dag* går jeg en tur.", translation: "Every day I go for a walk." },
      { text: "*Dagen* var lang og slitsom.", translation: "The day was long and tiring." }
    ],
    10: [
      { text: "God *natt*!", translation: "Good night!" },
      { text: "Jeg sover godt om *natten*.", translation: "I sleep well at night." },
      { text: "*Natten* var full av stjerner.", translation: "The night was full of stars." }
    ],
    11: [
      { text: "Kan jeg få et glass *vann*?", translation: "Can I have a glass of water?" },
      { text: "*Vannet* er kaldt og friskt.", translation: "The water is cold and fresh." },
      { text: "Han drikker mye *vann* hver dag.", translation: "He drinks a lot of water every day." }
    ],
    12: [
      { text: "*Maten* var veldig god.", translation: "The food was very good." },
      { text: "Vi spiser *mat* klokka sju.", translation: "We eat food at seven o'clock." },
      { text: "*Mat* er viktig for helsen.", translation: "Food is important for health." }
    ],
    13: [
      { text: "Jeg drikker *kaffe* hver morgen.", translation: "I drink coffee every morning." },
      { text: "En kopp *kaffe*, takk.", translation: "A cup of coffee, please." },
      { text: "*Kaffen* er varm og sterk.", translation: "The coffee is hot and strong." }
    ],
    14: [
      { text: "Vi kjøper *brød* på bakeriet.", translation: "We buy bread at the bakery." },
      { text: "*Brødet* er ferskt og mykt.", translation: "The bread is fresh and soft." },
      { text: "Han spiser *brød* til frokost.", translation: "He eats bread for breakfast." }
    ],
    15: [
      { text: "De bor i et stort *hus*.", translation: "They live in a big house." },
      { text: "Vårt *hus* har tre etasjer.", translation: "Our house has three floors." },
      { text: "*Huset* ligger ved sjøen.", translation: "The house is by the sea." }
    ],
    16: [
      { text: "Han kjører en rød *bil*.", translation: "He drives a red car." },
      { text: "*Bilen* er parkert utenfor.", translation: "The car is parked outside." },
      { text: "Vi skal kjøpe en ny *bil*.", translation: "We're going to buy a new car." }
    ],
    17: [
      { text: "Jeg leser en spennende *bok*.", translation: "I'm reading an exciting book." },
      { text: "*Boken* ligger på bordet.", translation: "The book is on the table." },
      { text: "Hun liker *bøker* om eventyr.", translation: "She likes books about adventures." }
    ],
    18: [
      { text: "Han er min beste *venn*.", translation: "He's my best friend." },
      { text: "Vi møter *venner* på helgen.", translation: "We meet friends on the weekend." },
      { text: "*Vennen* min bor ved siden av.", translation: "My friend lives next door." }
    ],
    19: [
      { text: "Min *familie* er stor og hyggelig.", translation: "My family is big and nice." },
      { text: "Vi samles som *familie* hver jul.", translation: "We gather as a family every Christmas." },
      { text: "*Familien* spiser middag sammen.", translation: "The family eats dinner together." }
    ],
    20: [
      { text: "Jeg går på *skolen* hver dag.", translation: "I go to school every day." },
      { text: "*Skolen* ligger nær huset mitt.", translation: "The school is near my house." },
      { text: "Hun jobber på en *skole*.", translation: "She works at a school." }
    ],
    21: [
      { text: "En *mann* gikk forbi oss.", translation: "A man walked past us." },
      { text: "*Mannen* ved vinduet er hyggelig.", translation: "The man by the window is nice." },
      { text: "Min *mann* heter Johan.", translation: "My husband's name is Johan." }
    ],
    22: [
      { text: "En *kvinne* ringte meg i dag.", translation: "A woman called me today." },
      { text: "*Kvinnen* var veldig høflig.", translation: "The woman was very polite." },
      { text: "*Kvinnen* som styrer firmaet, er dyktig.", translation: "The woman who runs the company is skilled." }
    ],
    23: [
      { text: "Det *barnet* er veldig snilt.", translation: "That child is very kind." },
      { text: "*Barnet* leker i hagen.", translation: "The child is playing in the garden." },
      { text: "Vi har tre *barn* hjemme.", translation: "We have three children at home." }
    ],
    24: [
      { text: "*Jenten* har rødt hår.", translation: "The girl has red hair." },
      { text: "En ung *jente* satt på benken.", translation: "A young girl sat on the bench." },
      { text: "Min *jente* er åtte år gammel.", translation: "My daughter is eight years old." }
    ],
    25: [
      { text: "*Gutten* spiller fotball hver dag.", translation: "The boy plays football every day." },
      { text: "En liten *gutt* ropte høyt.", translation: "A small boy shouted loudly." },
      { text: "Min *gutt* liker musikk.", translation: "My son likes music." }
    ],
    26: [
      { text: "Min *mor* er lærer.", translation: "My mother is a teacher." },
      { text: "*Moren* lager mat hver kveld.", translation: "Mother makes food every evening." },
      { text: "Jeg ringer *moren* min ofte.", translation: "I call my mother often." }
    ],
    27: [
      { text: "Min *far* jobber som ingeniør.", translation: "My father works as an engineer." },
      { text: "*Faren* kjører oss til skolen.", translation: "Father drives us to school." },
      { text: "Jeg er stolt av *faren* min.", translation: "I'm proud of my father." }
    ],
    28: [
      { text: "Min *søster* er tre år yngre.", translation: "My sister is three years younger." },
      { text: "*Søsteren* min studerer medisin.", translation: "My sister studies medicine." },
      { text: "Jeg og *søsteren* min liker å reise.", translation: "My sister and I like to travel." }
    ],
    29: [
      { text: "Min *bror* er høyere enn meg.", translation: "My brother is taller than me." },
      { text: "*Broren* min spiller gitar.", translation: "My brother plays guitar." },
      { text: "Jeg og *broren* min er gode venner.", translation: "My brother and I are good friends." }
    ],
    30: [
      { text: "Min *bestemor* bor på landet.", translation: "My grandmother lives in the countryside." },
      { text: "*Bestemoren* min baker kaker hver søndag.", translation: "My grandmother bakes cakes every Sunday." },
      { text: "Jeg besøker *bestemoren* min ofte.", translation: "I visit my grandmother often." }
    ],
    31: [
      { text: "Et *stort* hus ligger på toppen.", translation: "A big house sits on top." },
      { text: "Han har en *stor* hund.", translation: "He has a big dog." },
      { text: "Byen er veldig *stor*.", translation: "The city is very big." }
    ],
    32: [
      { text: "Et *lite* barn leker i parken.", translation: "A small child plays in the park." },
      { text: "Hun har en *liten* hund.", translation: "She has a small dog." },
      { text: "Rommet er ganske *lite*.", translation: "The room is quite small." }
    ],
    33: [
      { text: "Dette er en *god* bok.", translation: "This is a good book." },
      { text: "Maten smaker veldig *god*.", translation: "The food tastes very good." },
      { text: "Været er *godt* i dag.", translation: "The weather is good today." }
    ],
    34: [
      { text: "Filmen var *dårlig* og kjedelig.", translation: "The movie was bad and boring." },
      { text: "Han har en *dårlig* vane.", translation: "He has a bad habit." },
      { text: "Været blir *dårlig* i morgen.", translation: "The weather will be bad tomorrow." }
    ],
    35: [
      { text: "Jeg kjøpte en *ny* telefon.", translation: "I bought a new phone." },
      { text: "Dette er en *ny* bok fra biblioteket.", translation: "This is a new book from the library." },
      { text: "Vi flytter til en *ny* by.", translation: "We're moving to a new city." }
    ],
    36: [
      { text: "En *gammel* mann satt på benken.", translation: "An old man sat on the bench." },
      { text: "Huset er *gammelt* og vakkert.", translation: "The house is old and beautiful." },
      { text: "Hun har en *gammel* bil.", translation: "She has an old car." }
    ],
    37: [
      { text: "*Varm* kaffe smaker godt om vinteren.", translation: "Hot coffee tastes good in winter." },
      { text: "Det er *varmt* i rommet.", translation: "It's warm in the room." },
      { text: "Vi hadde en *varm* sommer i fjor.", translation: "We had a warm summer last year." }
    ],
    38: [
      { text: "En *kald* vind blåser i dag.", translation: "A cold wind is blowing today." },
      { text: "*Kald* melk er forfriskende.", translation: "Cold milk is refreshing." },
      { text: "Det er *kaldt* ute i kveld.", translation: "It's cold outside tonight." }
    ],
    39: [
      { text: "Han kjører altfor *raskt*.", translation: "He drives too fast." },
      { text: "Hun er en *rask* løper.", translation: "She's a fast runner." },
      { text: "Toget var veldig *raskt*.", translation: "The train was very fast." }
    ],
    40: [
      { text: "*Sakte* og rolig vinner løpet.", translation: "Slow and steady wins the race." },
      { text: "Han gikk *sakte* gjennom parken.", translation: "He walked slowly through the park." },
      { text: "Musikken spilte *sakte* og mykt.", translation: "The music played slow and soft." }
    ],
    41: [
      { text: "*Jeg* heter Petter.", translation: "My name is Petter." },
      { text: "*Jeg* liker å lese bøker.", translation: "I like to read books." },
      { text: "*Jeg* er glad i musikk.", translation: "I love music." }
    ],
    42: [
      { text: "*Du* er en god venn.", translation: "You are a good friend." },
      { text: "Hvor bor *du*?", translation: "Where do you live?" },
      { text: "Kommer *du* i kveld?", translation: "Are you coming tonight?" }
    ],
    43: [
      { text: "*Han* er lærer på skolen.", translation: "He is a teacher at the school." },
      { text: "*Han* spiller fotball hver uke.", translation: "He plays football every week." },
      { text: "Jeg så *han* i går.", translation: "I saw him yesterday." }
    ],
    44: [
      { text: "*Hun* er en dyktig musiker.", translation: "She is a skilled musician." },
      { text: "*Hun* jobber som lege.", translation: "She works as a doctor." },
      { text: "Jeg møtte *hun* på butikken.", translation: "I met her at the store." }
    ],
    45: [
      { text: "*Vi* går på kino i kveld.", translation: "We're going to the movies tonight." },
      { text: "*Vi* bor i samme by.", translation: "We live in the same city." },
      { text: "*Vi* skal reise til Norge.", translation: "We're going to travel to Norway." }
    ],
    46: [
      { text: "Hvor skal *dere* i kveld?", translation: "Where are you all going tonight?" },
      { text: "*Dere* er velkomne til festen.", translation: "You're all welcome to the party." },
      { text: "Kommer *dere* sammen?", translation: "Are you all coming together?" }
    ],
    47: [
      { text: "*De* er veldig snille mennesker.", translation: "They are very kind people." },
      { text: "*De* kommer i morgen.", translation: "They're coming tomorrow." },
      { text: "Jeg liker *de* veldig godt.", translation: "I like them very much." }
    ],
    48: [
      { text: "Dette er *min* bok.", translation: "This is my book." },
      { text: "*Min* venn heter Lars.", translation: "My friend's name is Lars." },
      { text: "Bilen er *min*.", translation: "The car is mine." }
    ],
    49: [
      { text: "Er dette *din* telefon?", translation: "Is this your phone?" },
      { text: "*Din* familie er hyggelig.", translation: "Your family is nice." },
      { text: "Jeg liker *din* nye jakke.", translation: "I like your new jacket." }
    ],
    50: [
      { text: "Dette er *vårt* hus.", translation: "This is our house." },
      { text: "*Vår* skole ligger nær sentrum.", translation: "Our school is near the center." },
      { text: "Familien *vår* er stor.", translation: "Our family is big." }
    ],
    51: [
      { text: "Jeg ønsker å *være* lykkelig.", translation: "I want to be happy." },
      { text: "Det er godt å *være* hjemme.", translation: "It's good to be home." },
      { text: "Han vil *være* lege en dag.", translation: "He wants to be a doctor someday." }
    ],
    52: [
      { text: "Jeg vil *ha* en kopp te.", translation: "I want to have a cup of tea." },
      { text: "Vi *har* ikke mye tid.", translation: "We don't have much time." },
      { text: "Hun ønsker å *ha* en hund.", translation: "She wishes to have a dog." }
    ],
    53: [
      { text: "Jeg *går* til skolen hver dag.", translation: "I go to school every day." },
      { text: "Skal vi *gå* en tur?", translation: "Shall we go for a walk?" },
      { text: "Hun *går* raskt hjem.", translation: "She walks home quickly." }
    ],
    54: [
      { text: "Jeg *kommer* snart.", translation: "I'll come soon." },
      { text: "Kan du *komme* hit?", translation: "Can you come here?" },
      { text: "Han *kommer* fra Norge.", translation: "He comes from Norway." }
    ],
    55: [
      { text: "Hva *gjør* du nå?", translation: "What are you doing now?" },
      { text: "Jeg *gjør* mitt beste.", translation: "I'm doing my best." },
      { text: "Vi må *gjøre* leksene våre.", translation: "We have to do our homework." }
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
