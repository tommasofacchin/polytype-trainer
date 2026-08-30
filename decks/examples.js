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
    ],
    56: [
      { text: "Jeg *spiser* frokost klokka åtte.", translation: "I eat breakfast at eight." },
      { text: "Skal vi *spise* sammen i kveld?", translation: "Shall we eat together tonight?" },
      { text: "Hun *spiser* aldri kjøtt.", translation: "She never eats meat." }
    ],
    57: [
      { text: "Jeg *drikker* vann hver dag.", translation: "I drink water every day." },
      { text: "Hva vil du *drikke*?", translation: "What would you like to drink?" },
      { text: "Han *drikker* kaffe uten sukker.", translation: "He drinks coffee without sugar." }
    ],
    58: [
      { text: "Jeg *leser* en spennende bok.", translation: "I'm reading an exciting book." },
      { text: "Liker du å *lese*?", translation: "Do you like to read?" },
      { text: "Hun *leser* avisen hver morgen.", translation: "She reads the newspaper every morning." }
    ],
    59: [
      { text: "Jeg *skriver* et brev til bestemor.", translation: "I'm writing a letter to grandmother." },
      { text: "Kan du *skrive* navnet ditt her?", translation: "Can you write your name here?" },
      { text: "Han *skriver* bøker om historie.", translation: "He writes books about history." }
    ],
    60: [
      { text: "Jeg *snakker* litt norsk.", translation: "I speak a little Norwegian." },
      { text: "Kan du *snakke* saktere?", translation: "Can you speak more slowly?" },
      { text: "Hun *snakker* tre språk.", translation: "She speaks three languages." }
    ],
    61: [
      { text: "Jeg har *en* katt.", translation: "I have a cat." },
      { text: "Kan jeg få *en* kopp te?", translation: "Can I have a cup of tea?" },
      { text: "Det står *en* bil utenfor.", translation: "There's a car outside." }
    ],
    62: [
      { text: "Hun kjøpte *ei* bok i går.", translation: "She bought a book yesterday." },
      { text: "Jeg så *ei* jente på gaten.", translation: "I saw a girl on the street." },
      { text: "Det bor *ei* geit på gården.", translation: "A goat lives on the farm." }
    ],
    63: [
      { text: "Jeg har *et* hus på landet.", translation: "I have a house in the countryside." },
      { text: "Kan jeg få *et* glass vann?", translation: "Can I have a glass of water?" },
      { text: "Hun kjøpte *et* nytt kamera.", translation: "She bought a new camera." }
    ],
    64: [
      { text: "Bilen er rød. *Den* er ny.", translation: "The car is red. It's new." },
      { text: "Jeg liker denne boken. *Den* er spennende.", translation: "I like this book. It's exciting." },
      { text: "Se på katten. *Den* sover.", translation: "Look at the cat. It's sleeping." }
    ],
    65: [
      { text: "*Det* regner ute.", translation: "It's raining outside." },
      { text: "Huset er stort. *Det* har fem rom.", translation: "The house is big. It has five rooms." },
      { text: "*Det* er kaldt i dag.", translation: "It's cold today." }
    ],
    66: [
      { text: "Kom *her*, vær så snill.", translation: "Come here, please." },
      { text: "Jeg bor *her* nå.", translation: "I live here now." },
      { text: "*Her* er nøklene dine.", translation: "Here are your keys." }
    ],
    67: [
      { text: "Boken ligger *der* borte.", translation: "The book is over there." },
      { text: "Hvem er *der*?", translation: "Who is there?" },
      { text: "Vi møttes *der* i fjor.", translation: "We met there last year." }
    ],
    68: [
      { text: "Jeg må gå *nå*.", translation: "I have to go now." },
      { text: "Hva gjør du *nå*?", translation: "What are you doing now?" },
      { text: "*Nå* er det på tide å spise.", translation: "Now it's time to eat." }
    ],
    69: [
      { text: "Vi snakkes *senere*.", translation: "We'll talk later." },
      { text: "Jeg kommer *senere* i kveld.", translation: "I'll come later tonight." },
      { text: "Kan vi gjøre det *senere*?", translation: "Can we do it later?" }
    ],
    70: [
      { text: "Hun er *alltid* glad.", translation: "She's always happy." },
      { text: "Jeg drikker *alltid* kaffe om morgenen.", translation: "I always drink coffee in the morning." },
      { text: "Han kommer *alltid* for sent.", translation: "He always comes late." }
    ],
    71: [
      { text: "Hva skal vi gjøre *i dag*?", translation: "What shall we do today?" },
      { text: "*I dag* er det fint vær.", translation: "Today the weather is nice." },
      { text: "Jeg har mye å gjøre *i dag*.", translation: "I have a lot to do today." }
    ],
    72: [
      { text: "Vi sees *i morgen*!", translation: "See you tomorrow!" },
      { text: "*I morgen* skal jeg reise til Oslo.", translation: "Tomorrow I'll travel to Oslo." },
      { text: "Hva skjer *i morgen*?", translation: "What's happening tomorrow?" }
    ],
    73: [
      { text: "*I går* var jeg på jobb.", translation: "Yesterday I was at work." },
      { text: "Vi så en film *i går*.", translation: "We watched a movie yesterday." },
      { text: "Det regnet mye *i går*.", translation: "It rained a lot yesterday." }
    ],
    74: [
      { text: "Jeg jobber fem dager i *uken*.", translation: "I work five days a week." },
      { text: "Neste *uke* skal vi reise.", translation: "Next week we're going to travel." },
      { text: "*Uken* har vært travel.", translation: "The week has been busy." }
    ],
    75: [
      { text: "Vi flytter neste *måned*.", translation: "We're moving next month." },
      { text: "Hver *måned* betaler jeg husleie.", translation: "Every month I pay rent." },
      { text: "*Måneden* gikk fort.", translation: "The month went by quickly." }
    ],
    76: [
      { text: "Han kjørte en *rød* bil.", translation: "He drove a red car." },
      { text: "Blomsten er *rød* og vakker.", translation: "The flower is red and beautiful." },
      { text: "Jeg liker den *røde* genseren.", translation: "I like the red sweater." }
    ],
    77: [
      { text: "Himmelen er *blå* i dag.", translation: "The sky is blue today." },
      { text: "Hun har *blå* øyne.", translation: "She has blue eyes." },
      { text: "Jeg kjøpte en *blå* jakke.", translation: "I bought a blue jacket." }
    ],
    78: [
      { text: "Gresset er *grønt* om sommeren.", translation: "The grass is green in summer." },
      { text: "Han har en *grønn* bil.", translation: "He has a green car." },
      { text: "Jeg liker den *grønne* skjorten.", translation: "I like the green shirt." }
    ],
    79: [
      { text: "Solen er *gul*.", translation: "The sun is yellow." },
      { text: "Hun har en *gul* kjole.", translation: "She has a yellow dress." },
      { text: "Det *gule* huset er vårt.", translation: "The yellow house is ours." }
    ],
    80: [
      { text: "Katten er helt *svart*.", translation: "The cat is completely black." },
      { text: "Han har en *svart* bil.", translation: "He has a black car." },
      { text: "Jeg kjøpte *svarte* sko.", translation: "I bought black shoes." }
    ],
    81: [
      { text: "Snøen er *hvit* og kald.", translation: "The snow is white and cold." },
      { text: "Hun har et *hvitt* hus.", translation: "She has a white house." },
      { text: "Han bruker en *hvit* skjorte.", translation: "He wears a white shirt." }
    ],
    82: [
      { text: "Hunden min er *brun*.", translation: "My dog is brown." },
      { text: "Hun har *brune* øyne.", translation: "She has brown eyes." },
      { text: "Jeg kjøpte et *brunt* bord.", translation: "I bought a brown table." }
    ],
    83: [
      { text: "Jenta har en *rosa* kjole.", translation: "The girl has a pink dress." },
      { text: "Blomstene er *rosa*.", translation: "The flowers are pink." },
      { text: "Hun malte rommet *rosa*.", translation: "She painted the room pink." }
    ],
    84: [
      { text: "Solnedgangen var *oransje*.", translation: "The sunset was orange." },
      { text: "Han har en *oransje* jakke.", translation: "He has an orange jacket." },
      { text: "Appelsinen er *oransje*.", translation: "The orange is orange." }
    ],
    85: [
      { text: "Blomsten er *lilla*.", translation: "The flower is purple." },
      { text: "Hun har en *lilla* veske.", translation: "She has a purple bag." },
      { text: "Himmelen ble *lilla* om kvelden.", translation: "The sky turned purple in the evening." }
    ],
    86: [
      { text: "Jeg har bare *én* bror.", translation: "I only have one brother." },
      { text: "Kan jeg få *én* kaffe?", translation: "Can I have one coffee?" },
      { text: "Bare *én* person kom.", translation: "Only one person came." }
    ],
    87: [
      { text: "Jeg har *to* søsken.", translation: "I have two siblings." },
      { text: "Klokka er *to*.", translation: "It's two o'clock." },
      { text: "Huset har *to* etasjer.", translation: "The house has two floors." }
    ],
    88: [
      { text: "Jeg har *tre* barn.", translation: "I have three children." },
      { text: "Klokka er *tre*.", translation: "It's three o'clock." },
      { text: "Vi ventet i *tre* timer.", translation: "We waited for three hours." }
    ],
    89: [
      { text: "Bordet har *fire* stoler.", translation: "The table has four chairs." },
      { text: "Klokka er *fire*.", translation: "It's four o'clock." },
      { text: "Vi er *fire* i familien.", translation: "There are four of us in the family." }
    ],
    90: [
      { text: "Jeg har *fem* venner her.", translation: "I have five friends here." },
      { text: "Klokka er *fem*.", translation: "It's five o'clock." },
      { text: "Huset har *fem* rom.", translation: "The house has five rooms." }
    ],
    91: [
      { text: "Klokka er *seks*.", translation: "It's six o'clock." },
      { text: "Vi er *seks* personer.", translation: "We are six people." },
      { text: "Han sover *seks* timer hver natt.", translation: "He sleeps six hours every night." }
    ],
    92: [
      { text: "Klokka er *sju*.", translation: "It's seven o'clock." },
      { text: "Hun har *sju* bøker på bordet.", translation: "She has seven books on the table." },
      { text: "Han spiste *sju* jordbær.", translation: "He ate seven strawberries." }
    ],
    93: [
      { text: "Klokka er *åtte*.", translation: "It's eight o'clock." },
      { text: "Jeg jobber *åtte* timer om dagen.", translation: "I work eight hours a day." },
      { text: "Vi var *åtte* personer på festen.", translation: "There were eight of us at the party." }
    ],
    94: [
      { text: "Klokka er *ni*.", translation: "It's nine o'clock." },
      { text: "Hun er *ni* år gammel.", translation: "She's nine years old." },
      { text: "Vi ventet i *ni* minutter.", translation: "We waited nine minutes." }
    ],
    95: [
      { text: "Klokka er *ti*.", translation: "It's ten o'clock." },
      { text: "Han har *ti* fingre.", translation: "He has ten fingers." },
      { text: "Vi bodde der i *ti* år.", translation: "We lived there for ten years." }
    ],
    96: [
      { text: "*Hvor* bor du?", translation: "Where do you live?" },
      { text: "Vet du *hvor* boken er?", translation: "Do you know where the book is?" },
      { text: "*Hvor* skal vi møtes?", translation: "Where shall we meet?" }
    ],
    97: [
      { text: "*Hva* heter du?", translation: "What's your name?" },
      { text: "*Hva* gjør du nå?", translation: "What are you doing now?" },
      { text: "Jeg vet ikke *hva* jeg skal si.", translation: "I don't know what to say." }
    ],
    98: [
      { text: "*Hvem* er det?", translation: "Who is that?" },
      { text: "*Hvem* kommer i kveld?", translation: "Who's coming tonight?" },
      { text: "Vet du *hvem* hun er?", translation: "Do you know who she is?" }
    ],
    99: [
      { text: "*Når* kommer du?", translation: "When are you coming?" },
      { text: "Jeg vet ikke *når* toget går.", translation: "I don't know when the train leaves." },
      { text: "*Når* er bursdagen din?", translation: "When is your birthday?" }
    ],
    100: [
      { text: "*Hvorfor* er du sen?", translation: "Why are you late?" },
      { text: "*Hvorfor* liker du ikke fisk?", translation: "Why don't you like fish?" },
      { text: "Jeg vet ikke *hvorfor* han dro.", translation: "I don't know why he left." }
    ],
    101: [
      { text: "*Hvordan* går det?", translation: "How's it going?" },
      { text: "*Hvordan* lager man denne retten?", translation: "How do you make this dish?" },
      { text: "Jeg vet ikke *hvordan* jeg skal svare.", translation: "I don't know how to answer." }
    ],
    102: [
      { text: "*Hvilken* bok leser du?", translation: "Which book are you reading?" },
      { text: "*Hvilken* dag passer best?", translation: "Which day suits best?" },
      { text: "Vet du *hvilken* vei vi skal gå?", translation: "Do you know which way we should go?" }
    ],
    103: [
      { text: "*Hvor mye* koster dette?", translation: "How much does this cost?" },
      { text: "*Hvor mye* tid har vi?", translation: "How much time do we have?" },
      { text: "Jeg vet ikke *hvor mye* det veier.", translation: "I don't know how much it weighs." }
    ],
    104: [
      { text: "Jeg er glad *fordi* det er fredag.", translation: "I'm happy because it's Friday." },
      { text: "Hun kom sent *fordi* toget var forsinket.", translation: "She came late because the train was delayed." },
      { text: "Vi ble hjemme *fordi* det regnet.", translation: "We stayed home because it rained." }
    ],
    105: [
      { text: "Jeg vil gå, *men* jeg er sliten.", translation: "I want to go, but I'm tired." },
      { text: "Det er dyrt, *men* verdt det.", translation: "It's expensive, but worth it." },
      { text: "Hun ringte, *men* jeg svarte ikke.", translation: "She called, but I didn't answer." }
    ],
    106: [
      { text: "Jeg liker te *og* kaffe.", translation: "I like tea and coffee." },
      { text: "Han er hyggelig *og* smart.", translation: "He's nice and smart." },
      { text: "Vi kjøpte brød, melk *og* egg.", translation: "We bought bread, milk and eggs." }
    ],
    107: [
      { text: "Vil du ha te *eller* kaffe?", translation: "Would you like tea or coffee?" },
      { text: "Skal vi gå *eller* kjøre?", translation: "Shall we walk or drive?" },
      { text: "Kommer du i dag *eller* i morgen?", translation: "Are you coming today or tomorrow?" }
    ],
    108: [
      { text: "Jeg drikker kaffe *med* melk.", translation: "I drink coffee with milk." },
      { text: "Hun bor *med* familien sin.", translation: "She lives with her family." },
      { text: "Han snakket *med* læreren.", translation: "He spoke with the teacher." }
    ],
    109: [
      { text: "Jeg drikker te *uten* sukker.", translation: "I drink tea without sugar." },
      { text: "Han dro *uten* å si noe.", translation: "He left without saying anything." },
      { text: "Vi klarte det *uten* hjelp.", translation: "We managed it without help." }
    ],
    110: [
      { text: "Jeg kommer *fra* Norge.", translation: "I come from Norway." },
      { text: "Brevet er *fra* min søster.", translation: "The letter is from my sister." },
      { text: "Vi reiste *fra* Oslo til Bergen.", translation: "We travelled from Oslo to Bergen." }
    ],
    111: [
      { text: "Jeg skal *til* skolen.", translation: "I'm going to school." },
      { text: "Hun ga en gave *til* meg.", translation: "She gave a gift to me." },
      { text: "Vi reiste *til* Spania i sommer.", translation: "We travelled to Spain this summer." }
    ],
    112: [
      { text: "Boken ligger *i* skuffen.", translation: "The book is in the drawer." },
      { text: "Jeg bor *i* Oslo.", translation: "I live in Oslo." },
      { text: "Han er *i* hagen.", translation: "He is in the garden." }
    ],
    113: [
      { text: "Boken ligger *på* bordet.", translation: "The book is on the table." },
      { text: "Bildet henger *på* veggen.", translation: "The picture hangs on the wall." },
      { text: "Vi møtes *på* kafeen.", translation: "We're meeting at the café." }
    ],
    114: [
      { text: "Katten sover *under* bordet.", translation: "The cat is sleeping under the table." },
      { text: "Nøklene ligger *under* matten.", translation: "The keys are under the mat." },
      { text: "Vi satt *under* et tre.", translation: "We sat under a tree." }
    ],
    115: [
      { text: "Lampen henger *over* bordet.", translation: "The lamp hangs above the table." },
      { text: "Flyet fløy *over* fjellet.", translation: "The plane flew over the mountain." },
      { text: "Hun bor *over* butikken.", translation: "She lives above the shop." }
    ],
    116: [
      { text: "Oslo er en fin *by*.", translation: "Oslo is a nice city." },
      { text: "Vi bor i en liten *by*.", translation: "We live in a small city." },
      { text: "*Byen* har mange gamle bygninger.", translation: "The city has many old buildings." }
    ],
    117: [
      { text: "Vi bor i samme *gate*.", translation: "We live on the same street." },
      { text: "*Gaten* var full av folk.", translation: "The street was full of people." },
      { text: "Butikken ligger på denne *gaten*.", translation: "The shop is on this street." }
    ],
    118: [
      { text: "Jeg skal til *butikken* etter melk.", translation: "I'm going to the shop for milk." },
      { text: "*Butikken* åpner klokka ni.", translation: "The shop opens at nine." },
      { text: "Det er en ny *butikk* i sentrum.", translation: "There's a new shop in the center." }
    ],
    119: [
      { text: "Vi kjøper grønnsaker på *markedet*.", translation: "We buy vegetables at the market." },
      { text: "*Markedet* er åpent på lørdager.", translation: "The market is open on Saturdays." },
      { text: "Det var mye folk på *markedet*.", translation: "There were a lot of people at the market." }
    ],
    120: [
      { text: "Vi går en tur i *parken*.", translation: "We're taking a walk in the park." },
      { text: "Barna leker i *parken*.", translation: "The children are playing in the park." },
      { text: "Det er en stor *park* nær huset.", translation: "There's a big park near the house." }
    ],
    121: [
      { text: "Dette *rommet* er veldig lyst.", translation: "This room is very bright." },
      { text: "Huset har fem *rom*.", translation: "The house has five rooms." },
      { text: "Jeg rydder *rommet* mitt.", translation: "I'm cleaning my room." }
    ],
    122: [
      { text: "Vi lager mat på *kjøkkenet*.", translation: "We cook in the kitchen." },
      { text: "*Kjøkkenet* er stort og lyst.", translation: "The kitchen is big and bright." },
      { text: "Hun sitter på *kjøkkenet* og drikker kaffe.", translation: "She's sitting in the kitchen drinking coffee." }
    ],
    123: [
      { text: "*Badet* er ved siden av soverommet.", translation: "The bathroom is next to the bedroom." },
      { text: "Jeg dusjer på *badet* hver morgen.", translation: "I shower in the bathroom every morning." },
      { text: "Huset har to *bad*.", translation: "The house has two bathrooms." }
    ],
    124: [
      { text: "*Soverommet* mitt er lite men koselig.", translation: "My bedroom is small but cozy." },
      { text: "Barna sover i det samme *soverommet*.", translation: "The children sleep in the same bedroom." },
      { text: "Vi malte *soverommet* blått.", translation: "We painted the bedroom blue." }
    ],
    125: [
      { text: "Vi ser på TV i *stuen*.", translation: "We watch TV in the living room." },
      { text: "*Stuen* har en stor sofa.", translation: "The living room has a big sofa." },
      { text: "Familien samles i *stuen* om kvelden.", translation: "The family gathers in the living room in the evening." }
    ],
    126: [
      { text: "Jeg liker *ost* på brødet.", translation: "I like cheese on bread." },
      { text: "Vi kjøpte norsk *ost* på markedet.", translation: "We bought Norwegian cheese at the market." },
      { text: "*Osten* smaker veldig godt.", translation: "The cheese tastes very good." }
    ],
    127: [
      { text: "Jeg spiser *egg* til frokost.", translation: "I eat eggs for breakfast." },
      { text: "Kan du kjøpe *egg* på butikken?", translation: "Can you buy eggs at the shop?" },
      { text: "*Egget* var kokt akkurat riktig.", translation: "The egg was cooked just right." }
    ],
    128: [
      { text: "Vi spiser *fisk* hver fredag.", translation: "We eat fish every Friday." },
      { text: "*Fisken* var veldig fersk.", translation: "The fish was very fresh." },
      { text: "Han fanget en stor *fisk* i sjøen.", translation: "He caught a big fish in the sea." }
    ],
    129: [
      { text: "Hun spiser ikke *kjøtt*.", translation: "She doesn't eat meat." },
      { text: "Vi grillet *kjøtt* i hagen.", translation: "We grilled meat in the garden." },
      { text: "*Kjøttet* var mørt og godt.", translation: "The meat was tender and good." }
    ],
    130: [
      { text: "Vi spiser *suppe* når det er kaldt.", translation: "We eat soup when it's cold." },
      { text: "*Suppen* var varm og god.", translation: "The soup was warm and good." },
      { text: "Mamma lagde *suppe* til middag.", translation: "Mom made soup for dinner." }
    ],
    131: [
      { text: "Jeg spiser et *eple* hver dag.", translation: "I eat an apple every day." },
      { text: "*Eplet* var rødt og søtt.", translation: "The apple was red and sweet." },
      { text: "Vi plukket *epler* i hagen.", translation: "We picked apples in the garden." }
    ],
    132: [
      { text: "Jeg tar en *banan* til lunsj.", translation: "I'll have a banana for lunch." },
      { text: "*Bananen* var moden og søt.", translation: "The banana was ripe and sweet." },
      { text: "Barna liker *bananer* godt.", translation: "The children like bananas a lot." }
    ],
    133: [
      { text: "Jeg drikker juice av *appelsin*.", translation: "I drink juice made from oranges." },
      { text: "*Appelsinen* var saftig og søt.", translation: "The orange was juicy and sweet." },
      { text: "Vi kjøpte en pose *appelsiner*.", translation: "We bought a bag of oranges." }
    ],
    134: [
      { text: "Vi spiser *poteter* til middag.", translation: "We eat potatoes for dinner." },
      { text: "*Poteten* var kokt og myk.", translation: "The potato was boiled and soft." },
      { text: "Han dyrker *poteter* i hagen.", translation: "He grows potatoes in the garden." }
    ],
    135: [
      { text: "Kaninen spiser en *gulrot*.", translation: "The rabbit is eating a carrot." },
      { text: "*Gulroten* var søt og sprø.", translation: "The carrot was sweet and crisp." },
      { text: "Vi kutter *gulrøtter* til suppen.", translation: "We cut carrots for the soup." }
    ],
    136: [
      { text: "Jeg drikker *te* om morgenen.", translation: "I drink tea in the morning." },
      { text: "Kan jeg få en kopp *te*?", translation: "Can I have a cup of tea?" },
      { text: "*Teen* var for varm å drikke.", translation: "The tea was too hot to drink." }
    ],
    137: [
      { text: "Barnet drikker *melk* til frokost.", translation: "The child drinks milk for breakfast." },
      { text: "Kan du kjøpe *melk* på butikken?", translation: "Can you buy milk at the shop?" },
      { text: "*Melken* var kald og frisk.", translation: "The milk was cold and fresh." }
    ],
    138: [
      { text: "Jeg drikker *juice* hver morgen.", translation: "I drink juice every morning." },
      { text: "*Juicen* smaker søtt og friskt.", translation: "The juice tastes sweet and fresh." },
      { text: "Vi laget *juice* av epler.", translation: "We made juice from apples." }
    ],
    139: [
      { text: "Jeg spiser *frokost* klokka sju.", translation: "I eat breakfast at seven." },
      { text: "*Frokosten* var deilig i morges.", translation: "Breakfast was delicious this morning." },
      { text: "Vi spiser *frokost* sammen hver dag.", translation: "We eat breakfast together every day." }
    ],
    140: [
      { text: "Vi spiser *lunsj* klokka tolv.", translation: "We eat lunch at twelve." },
      { text: "*Lunsjen* var rask men god.", translation: "Lunch was quick but good." },
      { text: "Han tar med seg *lunsj* på jobb.", translation: "He brings lunch to work." }
    ],
    141: [
      { text: "Vi spiser *middag* klokka seks.", translation: "We eat dinner at six." },
      { text: "*Middagen* var veldig god i kveld.", translation: "Dinner was very good tonight." },
      { text: "Familien samles til *middag* hver søndag.", translation: "The family gathers for dinner every Sunday." }
    ],
    142: [
      { text: "Kan du sende meg *saltet*?", translation: "Can you pass me the salt?" },
      { text: "Suppen trenger litt mer *salt*.", translation: "The soup needs a bit more salt." },
      { text: "Han bruker for mye *salt* i maten.", translation: "He uses too much salt in the food." }
    ],
    143: [
      { text: "Jeg drikker kaffe uten *sukker*.", translation: "I drink coffee without sugar." },
      { text: "Kan du sende meg *sukkeret*?", translation: "Can you pass me the sugar?" },
      { text: "Kaken trenger mye *sukker*.", translation: "The cake needs a lot of sugar." }
    ],
    144: [
      { text: "Maten ligger på *tallerkenen*.", translation: "The food is on the plate." },
      { text: "Kan du vaske *tallerkenen*?", translation: "Can you wash the plate?" },
      { text: "Vi dekker bordet med *tallerkener*.", translation: "We're setting the table with plates." }
    ],
    145: [
      { text: "Kan jeg få et *glass* vann?", translation: "Can I have a glass of water?" },
      { text: "*Glasset* falt og knuste.", translation: "The glass fell and broke." },
      { text: "Hun fylte *glasset* med juice.", translation: "She filled the glass with juice." }
    ],
    146: [
      { text: "Jeg har vondt i *hodet*.", translation: "I have a headache." },
      { text: "Han rista på *hodet*.", translation: "He shook his head." },
      { text: "*Hodet* mitt gjør vondt.", translation: "My head hurts." }
    ],
    147: [
      { text: "Hun holdt meg i *hånden*.", translation: "She held my hand." },
      { text: "Vask *hendene* dine før du spiser.", translation: "Wash your hands before you eat." },
      { text: "Han vinket med *hånden*.", translation: "He waved with his hand." }
    ],
    148: [
      { text: "Jeg vred om på *foten*.", translation: "I twisted my foot." },
      { text: "Barnet har små *føtter*.", translation: "The child has small feet." },
      { text: "Han sparket ballen med *foten*.", translation: "He kicked the ball with his foot." }
    ],
    149: [
      { text: "Hun har blå *øyne*.", translation: "She has blue eyes." },
      { text: "Jeg fikk noe i *øyet*.", translation: "I got something in my eye." },
      { text: "Barnet lukket *øynene* og sov.", translation: "The child closed its eyes and slept." }
    ],
    150: [
      { text: "Han hvisket noe i *øret* mitt.", translation: "He whispered something in my ear." },
      { text: "Musikken var høy, så jeg dekket *ørene*.", translation: "The music was loud, so I covered my ears." },
      { text: "Hunden har store *ører*.", translation: "The dog has big ears." }
    ],
    151: [
      { text: "Barnet har en liten *nese*.", translation: "The child has a small nose." },
      { text: "Jeg puster gjennom *nesen*.", translation: "I breathe through my nose." },
      { text: "Han har en forkjølet *nese*.", translation: "He has a stuffy nose." }
    ],
    152: [
      { text: "Lukk *munnen* din, vær så snill.", translation: "Close your mouth, please." },
      { text: "Hun smilte med hele *munnen*.", translation: "She smiled with her whole mouth." },
      { text: "Ikke snakk med mat i *munnen*.", translation: "Don't talk with food in your mouth." }
    ],
    153: [
      { text: "Hun har langt, mørkt *hår*.", translation: "She has long, dark hair." },
      { text: "Han klipper *håret* sitt selv.", translation: "He cuts his own hair." },
      { text: "*Håret* mitt blir vått i regnet.", translation: "My hair gets wet in the rain." }
    ],
    154: [
      { text: "Ta på deg *jakken*, det er kaldt ute.", translation: "Put on your jacket, it's cold outside." },
      { text: "Jeg kjøpte en ny *jakke* i går.", translation: "I bought a new jacket yesterday." },
      { text: "*Jakken* hennes er blå og varm.", translation: "Her jacket is blue and warm." }
    ],
    155: [
      { text: "Ta av deg *skoene* før du går inn.", translation: "Take off your shoes before you go in." },
      { text: "Disse *skoene* er veldig komfortable.", translation: "These shoes are very comfortable." },
      { text: "Jeg trenger nye *sko* til vinteren.", translation: "I need new shoes for winter." }
    ],
    156: [
      { text: "Jeg kjøpte en ny *bukse* i går.", translation: "I bought new pants yesterday." },
      { text: "*Buksen* min er for lang.", translation: "My pants are too long." },
      { text: "Han går alltid med svarte *bukser*.", translation: "He always wears black pants." }
    ],
    157: [
      { text: "Han har på seg en hvit *skjorte*.", translation: "He's wearing a white shirt." },
      { text: "*Skjorten* min trenger stryking.", translation: "My shirt needs ironing." },
      { text: "Vi kjøpte en ny *skjorte* til bursdagen hans.", translation: "We bought a new shirt for his birthday." }
    ],
    158: [
      { text: "Hun har en fin *kjole* på seg.", translation: "She's wearing a nice dress." },
      { text: "*Kjolen* var rød og lang.", translation: "The dress was red and long." },
      { text: "Jeg skal kjøpe en ny *kjole* til festen.", translation: "I'm going to buy a new dress for the party." }
    ],
    159: [
      { text: "Ta på deg *luen*, det er kaldt.", translation: "Put on your hat, it's cold." },
      { text: "*Luen* hans er blå og varm.", translation: "His hat is blue and warm." },
      { text: "Jeg mistet *luen* min i vinden.", translation: "I lost my hat in the wind." }
    ],
    160: [
      { text: "Jeg har på meg en varm *genser*.", translation: "I'm wearing a warm sweater." },
      { text: "*Genseren* min er av ull.", translation: "My sweater is made of wool." },
      { text: "Hun strikket en *genser* til meg.", translation: "She knitted a sweater for me." }
    ],
    161: [
      { text: "Vent bare et *sekund*.", translation: "Just wait a second." },
      { text: "Det tok bare noen *sekunder*.", translation: "It only took a few seconds." },
      { text: "Hvert *sekund* teller.", translation: "Every second counts." }
    ],
    162: [
      { text: "Møtet varte i en *time*.", translation: "The meeting lasted an hour." },
      { text: "Jeg venter en *time* til.", translation: "I'll wait one more hour." },
      { text: "Turen tar tre *timer*.", translation: "The trip takes three hours." }
    ],
    163: [
      { text: "Vent et *minutt*, vær så snill.", translation: "Wait a minute, please." },
      { text: "Toget kommer om fem *minutter*.", translation: "The train arrives in five minutes." },
      { text: "Det tar bare noen *minutter*.", translation: "It only takes a few minutes." }
    ],
    164: [
      { text: "Jeg er tjue *år* gammel.", translation: "I am twenty years old." },
      { text: "Vi flyttet hit for to *år* siden.", translation: "We moved here two years ago." },
      { text: "Neste *år* skal vi reise til Italia.", translation: "Next year we're going to travel to Italy." }
    ],
    165: [
      { text: "Hva skal du gjøre i *helgen*?", translation: "What are you doing this weekend?" },
      { text: "Vi drar til hytta hver *helg*.", translation: "We go to the cabin every weekend." },
      { text: "*Helgen* var kort men fin.", translation: "The weekend was short but nice." }
    ],
    166: [
      { text: "*Mandag* begynner jeg på ny jobb.", translation: "On Monday I start a new job." },
      { text: "Vi møtes hver *mandag*.", translation: "We meet every Monday." },
      { text: "*Mandagen* var travel og lang.", translation: "Monday was busy and long." }
    ],
    167: [
      { text: "*Tirsdag* har jeg trening.", translation: "On Tuesday I have training." },
      { text: "Vi drar til byen på *tirsdag*.", translation: "We're going to town on Tuesday." },
      { text: "*Tirsdager* er alltid rolige.", translation: "Tuesdays are always calm." }
    ],
    168: [
      { text: "Møtet er *onsdag* klokka ti.", translation: "The meeting is Wednesday at ten." },
      { text: "Hun jobber ikke på *onsdager*.", translation: "She doesn't work on Wednesdays." },
      { text: "Vi ses igjen på *onsdag*.", translation: "We'll see each other again on Wednesday." }
    ],
    169: [
      { text: "*Torsdag* skal vi ha middag sammen.", translation: "On Thursday we're having dinner together." },
      { text: "Han reiser hjem på *torsdag*.", translation: "He travels home on Thursday." },
      { text: "*Torsdager* er min favorittdag.", translation: "Thursdays are my favorite day." }
    ],
    170: [
      { text: "Endelig er det *fredag*!", translation: "Finally it's Friday!" },
      { text: "Vi feirer alltid på *fredager*.", translation: "We always celebrate on Fridays." },
      { text: "*Fredag* kveld går vi ut.", translation: "Friday evening we go out." }
    ],
    171: [
      { text: "Vi handler på *lørdager*.", translation: "We shop on Saturdays." },
      { text: "*Lørdag* skal vi til stranden.", translation: "On Saturday we're going to the beach." },
      { text: "Festen er på *lørdag*.", translation: "The party is on Saturday." }
    ],
    172: [
      { text: "Vi spiser stor middag på *søndager*.", translation: "We eat a big dinner on Sundays." },
      { text: "*Søndag* er en rolig dag.", translation: "Sunday is a calm day." },
      { text: "Familien samles hver *søndag*.", translation: "The family gathers every Sunday." }
    ],
    173: [
      { text: "Blomstene blomstrer om *våren*.", translation: "The flowers bloom in spring." },
      { text: "*Våren* er min favorittårstid.", translation: "Spring is my favorite season." },
      { text: "Vi planter grønnsaker om *våren*.", translation: "We plant vegetables in spring." }
    ],
    174: [
      { text: "Vi reiser til Italia hver *sommer*.", translation: "We travel to Italy every summer." },
      { text: "*Sommeren* var varm og solrik.", translation: "The summer was warm and sunny." },
      { text: "Om *sommeren* bader vi hver dag.", translation: "In summer we swim every day." }
    ],
    175: [
      { text: "Bladene faller om *høsten*.", translation: "The leaves fall in autumn." },
      { text: "*Høsten* er kald og våt her.", translation: "Autumn is cold and wet here." },
      { text: "Skolen begynner om *høsten*.", translation: "School starts in autumn." }
    ],
    176: [
      { text: "Det snør mye om *vinteren*.", translation: "It snows a lot in winter." },
      { text: "*Vinteren* er lang og mørk i Norge.", translation: "Winter is long and dark in Norway." },
      { text: "Vi går på ski om *vinteren*.", translation: "We go skiing in winter." }
    ],
    177: [
      { text: "*Solen* skinner i dag.", translation: "The sun is shining today." },
      { text: "Vi solte oss i *solen* hele dagen.", translation: "We sunbathed in the sun all day." },
      { text: "*Solen* går ned klokka åtte.", translation: "The sun sets at eight." }
    ],
    178: [
      { text: "Det er mye *regn* i dag.", translation: "There's a lot of rain today." },
      { text: "Vi ble våte av *regnet*.", translation: "We got wet from the rain." },
      { text: "*Regnet* stoppet etter en time.", translation: "The rain stopped after an hour." }
    ],
    179: [
      { text: "Det ligger mye *snø* på bakken.", translation: "There's a lot of snow on the ground." },
      { text: "Barna leker i *snøen*.", translation: "The children are playing in the snow." },
      { text: "*Snøen* smeltet fort i sola.", translation: "The snow melted quickly in the sun." }
    ],
    180: [
      { text: "Det blåser mye *vind* i dag.", translation: "There's a lot of wind today." },
      { text: "*Vinden* rev av seg taket.", translation: "The wind ripped off the roof." },
      { text: "Vi kjente en kald *vind* fra havet.", translation: "We felt a cold wind from the sea." }
    ],
    181: [
      { text: "Det er *fint* vær i dag.", translation: "The weather is nice today." },
      { text: "Du ser *fint* ut i den kjolen.", translation: "You look nice in that dress." },
      { text: "Det var *fint* å se deg igjen.", translation: "It was nice to see you again." }
    ],
    182: [
      { text: "Det er *overskyet* i dag.", translation: "It's cloudy today." },
      { text: "Himmelen ble *overskyet* om ettermiddagen.", translation: "The sky became cloudy in the afternoon." },
      { text: "Vi hadde *overskyet* vær hele uken.", translation: "We had cloudy weather all week." }
    ],
    183: [
      { text: "Himmelen er *klar* i kveld.", translation: "The sky is clear tonight." },
      { text: "Vannet i innsjøen er helt *klart*.", translation: "The water in the lake is completely clear." },
      { text: "Det blir *klart* vær i morgen.", translation: "It will be clear weather tomorrow." }
    ],
    184: [
      { text: "Været har vært *tørt* hele sommeren.", translation: "The weather has been dry all summer." },
      { text: "Bakken er *tørr* etter mange dager uten regn.", translation: "The ground is dry after many days without rain." },
      { text: "Klærne er *tørre* nå.", translation: "The clothes are dry now." }
    ],
    185: [
      { text: "Gresset er *vått* om morgenen.", translation: "The grass is wet in the morning." },
      { text: "Skoene mine ble *våte* i regnet.", translation: "My shoes got wet in the rain." },
      { text: "Håret hennes var *vått* etter dusjen.", translation: "Her hair was wet after the shower." }
    ],
    186: [
      { text: "Jeg tar *toget* til jobb hver dag.", translation: "I take the train to work every day." },
      { text: "*Toget* var forsinket i dag.", translation: "The train was delayed today." },
      { text: "Vi reiste med *tog* til Bergen.", translation: "We travelled by train to Bergen." }
    ],
    187: [
      { text: "*Bussen* kommer om ti minutter.", translation: "The bus arrives in ten minutes." },
      { text: "Jeg tar *buss* til skolen.", translation: "I take the bus to school." },
      { text: "Vi ventet lenge på *bussen*.", translation: "We waited a long time for the bus." }
    ],
    188: [
      { text: "*Flyet* letter klokka ti.", translation: "The plane takes off at ten." },
      { text: "Vi reiste med *fly* til Spania.", translation: "We travelled by plane to Spain." },
      { text: "*Flyet* landet trygt.", translation: "The plane landed safely." }
    ],
    189: [
      { text: "Jeg har en ny *sykkel*.", translation: "I have a new bicycle." },
      { text: "*Sykkelen* min er ødelagt.", translation: "My bicycle is broken." },
      { text: "Han kjører *sykkel* til skolen.", translation: "He rides his bicycle to school." }
    ],
    190: [
      { text: "Vi tok en *båt* over fjorden.", translation: "We took a boat across the fjord." },
      { text: "*Båten* var liten men rask.", translation: "The boat was small but fast." },
      { text: "Han fisker fra *båten* sin.", translation: "He fishes from his boat." }
    ],
    191: [
      { text: "Toget stopper på denne *stasjonen*.", translation: "The train stops at this station." },
      { text: "Vi møttes på *stasjonen*.", translation: "We met at the station." },
      { text: "*Stasjonen* ligger midt i byen.", translation: "The station is in the middle of the city." }
    ],
    192: [
      { text: "Vi kjørte til *flyplassen* tidlig.", translation: "We drove to the airport early." },
      { text: "*Flyplassen* var full av folk.", translation: "The airport was full of people." },
      { text: "Han jobber på *flyplassen*.", translation: "He works at the airport." }
    ],
    193: [
      { text: "Jeg kjøpte en *billett* til konserten.", translation: "I bought a ticket to the concert." },
      { text: "Kan jeg få se *billetten* din?", translation: "Can I see your ticket?" },
      { text: "Vi trenger to *billetter* til toget.", translation: "We need two tickets for the train." }
    ],
    194: [
      { text: "Kan du vise meg på *kartet*?", translation: "Can you show me on the map?" },
      { text: "Vi brukte et *kart* for å finne veien.", translation: "We used a map to find the way." },
      { text: "*Kartet* viser hele byen.", translation: "The map shows the whole city." }
    ],
    195: [
      { text: "Vi bor på et fint *hotell*.", translation: "We're staying at a nice hotel." },
      { text: "*Hotellet* ligger nær stranden.", translation: "The hotel is near the beach." },
      { text: "Rommet på *hotellet* var stort.", translation: "The room at the hotel was big." }
    ],
    196: [
      { text: "Sving til *venstre* ved lyskrysset.", translation: "Turn left at the traffic light." },
      { text: "Boken ligger på *venstre* side av bordet.", translation: "The book is on the left side of the table." },
      { text: "Han skriver med *venstre* hånd.", translation: "He writes with his left hand." }
    ],
    197: [
      { text: "Sving til *høyre* etter broen.", translation: "Turn right after the bridge." },
      { text: "Butikken ligger på *høyre* side av gaten.", translation: "The shop is on the right side of the street." },
      { text: "Hun holder pennen i *høyre* hånd.", translation: "She holds the pen in her right hand." }
    ],
    198: [
      { text: "Gå *rett fram* til du ser skolen.", translation: "Go straight ahead until you see the school." },
      { text: "Kjør *rett fram* i to kilometer.", translation: "Drive straight ahead for two kilometers." },
      { text: "Stasjonen er *rett fram*, ikke langt herfra.", translation: "The station is straight ahead, not far from here." }
    ],
    199: [
      { text: "Vi bor *nær* skolen.", translation: "We live near the school." },
      { text: "Butikken er *nær* huset vårt.", translation: "The shop is near our house." },
      { text: "Han bor *nær* meg.", translation: "He lives near me." }
    ],
    200: [
      { text: "Det er *langt* til flyplassen herfra.", translation: "It's far to the airport from here." },
      { text: "Vi bor ikke *langt* fra sentrum.", translation: "We don't live far from the center." },
      { text: "Hun reiste *langt* for å komme hit.", translation: "She travelled far to get here." }
    ],
    201: [
      { text: "Klokka er *elleve*.", translation: "It's eleven o'clock." },
      { text: "Hun er *elleve* år gammel.", translation: "She's eleven years old." },
      { text: "Vi møtes klokka *elleve*.", translation: "We meet at eleven." }
    ],
    202: [
      { text: "Klokka er *tolv*.", translation: "It's twelve o'clock." },
      { text: "Året har *tolv* måneder.", translation: "The year has twelve months." },
      { text: "Vi var *tolv* personer på middagen.", translation: "There were twelve of us at dinner." }
    ],
    203: [
      { text: "Han er *tretten* år gammel.", translation: "He's thirteen years old." },
      { text: "Vi ventet i *tretten* minutter.", translation: "We waited thirteen minutes." },
      { text: "Det er *tretten* elever i klassen.", translation: "There are thirteen students in the class." }
    ],
    204: [
      { text: "Hun blir *fjorten* år i mars.", translation: "She turns fourteen in March." },
      { text: "Vi var på ferie i *fjorten* dager.", translation: "We were on vacation for fourteen days." },
      { text: "Det er *fjorten* dager til jul.", translation: "There are fourteen days until Christmas." }
    ],
    205: [
      { text: "Han er *femten* år gammel.", translation: "He is fifteen years old." },
      { text: "Vi ventet i *femten* minutter.", translation: "We waited fifteen minutes." },
      { text: "Butikken stenger om *femten* minutter.", translation: "The shop closes in fifteen minutes." }
    ],
    206: [
      { text: "Hun er *seksten* år gammel.", translation: "She's sixteen years old." },
      { text: "Vi ventet i *seksten* minutter.", translation: "We waited sixteen minutes." },
      { text: "Det er *seksten* elever i klassen.", translation: "There are sixteen students in the class." }
    ],
    207: [
      { text: "Han fyller *sytten* år i juni.", translation: "He turns seventeen in June." },
      { text: "Vi bodde der i *sytten* år.", translation: "We lived there for seventeen years." },
      { text: "Det er *sytten* dager til ferien.", translation: "There are seventeen days until the holiday." }
    ],
    208: [
      { text: "Hun blir *atten* år neste måned.", translation: "She turns eighteen next month." },
      { text: "Vi kjøpte *atten* billetter til konserten.", translation: "We bought eighteen tickets for the concert." },
      { text: "Det er *atten* bord på restauranten.", translation: "There are eighteen tables at the restaurant." }
    ],
    209: [
      { text: "Han er *nitten* år gammel.", translation: "He's nineteen years old." },
      { text: "Vi ventet i *nitten* minutter på bussen.", translation: "We waited nineteen minutes for the bus." },
      { text: "Det er *nitten* studenter i klassen.", translation: "There are nineteen students in the class." }
    ],
    210: [
      { text: "Jeg er *tjue* år gammel.", translation: "I am twenty years old." },
      { text: "Vi ventet i *tjue* minutter.", translation: "We waited twenty minutes." },
      { text: "Det er *tjue* elever i klassen vår.", translation: "There are twenty students in our class." }
    ],
    211: [
      { text: "Min *bestefar* bor på landet.", translation: "My grandfather lives in the countryside." },
      { text: "*Bestefaren* min forteller gode historier.", translation: "My grandfather tells good stories." },
      { text: "Jeg besøker *bestefaren* min hver sommer.", translation: "I visit my grandfather every summer." }
    ],
    212: [
      { text: "Mine *foreldre* bor i Bergen.", translation: "My parents live in Bergen." },
      { text: "*Foreldrene* mine er lærere.", translation: "My parents are teachers." },
      { text: "Vi besøker *foreldrene* våre hver jul.", translation: "We visit our parents every Christmas." }
    ],
    213: [
      { text: "Min *sønn* går på skolen.", translation: "My son goes to school." },
      { text: "*Sønnen* deres er veldig hyggelig.", translation: "Their son is very nice." },
      { text: "Jeg er stolt av *sønnen* min.", translation: "I'm proud of my son." }
    ],
    214: [
      { text: "Min *datter* liker å tegne.", translation: "My daughter likes to draw." },
      { text: "*Datteren* deres studerer medisin.", translation: "Their daughter studies medicine." },
      { text: "Jeg ringer *datteren* min hver dag.", translation: "I call my daughter every day." }
    ],
    215: [
      { text: "Min *ektemann* jobber som ingeniør.", translation: "My husband works as an engineer." },
      { text: "*Ektemannen* hennes er fransk.", translation: "Her husband is French." },
      { text: "Vi møtte *ektemannen* hennes på festen.", translation: "We met her husband at the party." }
    ],
    216: [
      { text: "Min *lærer* er veldig hyggelig.", translation: "My teacher is very nice." },
      { text: "Hun jobber som *lærer* på skolen.", translation: "She works as a teacher at the school." },
      { text: "*Læreren* ga oss mye lekser.", translation: "The teacher gave us a lot of homework." }
    ],
    217: [
      { text: "Han er *student* ved universitetet.", translation: "He's a student at the university." },
      { text: "*Studenten* studerte hele natten.", translation: "The student studied all night." },
      { text: "Jeg var *student* i fem år.", translation: "I was a student for five years." }
    ],
    218: [
      { text: "Min mor er *lege*.", translation: "My mother is a doctor." },
      { text: "Jeg må til *legen* i morgen.", translation: "I have to go to the doctor tomorrow." },
      { text: "*Legen* undersøkte pasienten.", translation: "The doctor examined the patient." }
    ],
    219: [
      { text: "Min søster er *sykepleier*.", translation: "My sister is a nurse." },
      { text: "*Sykepleieren* var veldig omsorgsfull.", translation: "The nurse was very caring." },
      { text: "Han jobber som *sykepleier* på sykehuset.", translation: "He works as a nurse at the hospital." }
    ],
    220: [
      { text: "Vi ringte *politiet* etter ulykken.", translation: "We called the police after the accident." },
      { text: "*Politiet* kom raskt til stedet.", translation: "The police arrived quickly at the scene." },
      { text: "Han jobber i *politiet*.", translation: "He works in the police force." }
    ],
    221: [
      { text: "Jeg elsker *jobben* min.", translation: "I love my job." },
      { text: "Hun fikk en ny *jobb* i går.", translation: "She got a new job yesterday." },
      { text: "*Jobben* hans er veldig krevende.", translation: "His job is very demanding." }
    ],
    222: [
      { text: "Jeg jobber på et *kontor* i sentrum.", translation: "I work at an office downtown." },
      { text: "*Kontoret* mitt er på tredje etasje.", translation: "My office is on the third floor." },
      { text: "Vi møttes på *kontoret* klokka ni.", translation: "We met at the office at nine." }
    ],
    223: [
      { text: "Vi er tjue elever i *klassen*.", translation: "There are twenty students in the class." },
      { text: "*Klassen* vår er veldig hyggelig.", translation: "Our class is very nice." },
      { text: "Han er den beste i *klassen*.", translation: "He's the best in the class." }
    ],
    224: [
      { text: "Jeg må gjøre *leksene* mine.", translation: "I have to do my homework." },
      { text: "*Leksen* var vanskelig i dag.", translation: "The homework was difficult today." },
      { text: "Læreren ga oss mye *lekse*.", translation: "The teacher gave us a lot of homework." }
    ],
    225: [
      { text: "Vi har en *prøve* i morgen.", translation: "We have a test tomorrow." },
      { text: "*Prøven* var lettere enn jeg trodde.", translation: "The test was easier than I thought." },
      { text: "Jeg må øve til *prøven*.", translation: "I need to study for the test." }
    ],
    226: [
      { text: "Jeg *sover* åtte timer hver natt.", translation: "I sleep eight hours every night." },
      { text: "Barnet *sover* allerede.", translation: "The child is already asleep." },
      { text: "Jeg klarer ikke å *sove* i kveld.", translation: "I can't manage to sleep tonight." }
    ],
    227: [
      { text: "Jeg *våkner* klokka sju hver morgen.", translation: "I wake up at seven every morning." },
      { text: "Hun *våknet* av lyden fra gaten.", translation: "She woke up from the noise on the street." },
      { text: "Han pleier å *våkne* tidlig.", translation: "He usually wakes up early." }
    ],
    228: [
      { text: "Jeg *jobber* i en butikk.", translation: "I work in a shop." },
      { text: "Hun *jobber* hardt hver dag.", translation: "She works hard every day." },
      { text: "Vil du *jobbe* med meg i morgen?", translation: "Do you want to work with me tomorrow?" }
    ],
    229: [
      { text: "Jeg *studerer* medisin ved universitetet.", translation: "I study medicine at the university." },
      { text: "Hun *studerer* til prøven i kveld.", translation: "She's studying for the test tonight." },
      { text: "Vi må *studere* mer denne uken.", translation: "We need to study more this week." }
    ],
    230: [
      { text: "Jeg *lærer* norsk nå.", translation: "I'm learning Norwegian now." },
      { text: "Barn *lærer* fort.", translation: "Children learn fast." },
      { text: "Det er gøy å *lære* nye ting.", translation: "It's fun to learn new things." }
    ],
    231: [
      { text: "Jeg *kjører* til jobb hver dag.", translation: "I drive to work every day." },
      { text: "Kan du *kjøre* meg til flyplassen?", translation: "Can you drive me to the airport?" },
      { text: "Hun *kjører* alltid forsiktig.", translation: "She always drives carefully." }
    ],
    232: [
      { text: "Vi *reiser* til Norge i sommer.", translation: "We're travelling to Norway this summer." },
      { text: "Jeg elsker å *reise*.", translation: "I love to travel." },
      { text: "De *reiser* mye for jobben.", translation: "They travel a lot for work." }
    ],
    233: [
      { text: "Jeg *venter* på bussen.", translation: "I'm waiting for the bus." },
      { text: "Kan du *vente* litt?", translation: "Can you wait a bit?" },
      { text: "Vi *ventet* i en time.", translation: "We waited for an hour." }
    ],
    234: [
      { text: "Jeg kan ikke *finne* nøklene mine.", translation: "I can't find my keys." },
      { text: "Han *fant* boken under sengen.", translation: "He found the book under the bed." },
      { text: "Kan du hjelpe meg å *finne* veien?", translation: "Can you help me find the way?" }
    ],
    235: [
      { text: "Jeg skal *møte* venner i kveld.", translation: "I'm going to meet friends tonight." },
      { text: "Vi *møttes* på kafeen.", translation: "We met at the café." },
      { text: "Hyggelig å *møte* deg!", translation: "Nice to meet you!" }
    ],
    236: [
      { text: "Jeg *liker* denne boken.", translation: "I like this book." },
      { text: "Hun *liker* å lese om kvelden.", translation: "She likes to read in the evening." },
      { text: "*Liker* du å reise?", translation: "Do you like to travel?" }
    ],
    237: [
      { text: "Jeg *elsker* deg.", translation: "I love you." },
      { text: "Hun *elsker* musikk.", translation: "She loves music." },
      { text: "Vi *elsker* å reise sammen.", translation: "We love to travel together." }
    ],
    238: [
      { text: "Jeg *vil* ha en kaffe.", translation: "I want a coffee." },
      { text: "Hva *vil* du gjøre i kveld?", translation: "What do you want to do tonight?" },
      { text: "Hun *ville* ikke gå hjem ennå.", translation: "She didn't want to go home yet." }
    ],
    239: [
      { text: "Jeg *trenger* hjelp med dette.", translation: "I need help with this." },
      { text: "Vi *trenger* mer tid.", translation: "We need more time." },
      { text: "Hun *trenger* nye sko.", translation: "She needs new shoes." }
    ],
    240: [
      { text: "Jeg skal *kjøpe* melk på butikken.", translation: "I'm going to buy milk at the shop." },
      { text: "Vil du *kjøpe* denne boken?", translation: "Do you want to buy this book?" },
      { text: "Hun *kjøpte* en ny bil i går.", translation: "She bought a new car yesterday." }
    ],
    241: [
      { text: "Vi *selger* huset vårt.", translation: "We're selling our house." },
      { text: "Han *solgte* bilen sin i fjor.", translation: "He sold his car last year." },
      { text: "De vil *selge* leiligheten snart.", translation: "They want to sell the apartment soon." }
    ],
    242: [
      { text: "Kan jeg *betale* med kort?", translation: "Can I pay with card?" },
      { text: "Jeg *betalte* for middagen.", translation: "I paid for dinner." },
      { text: "Vi må *betale* husleien i dag.", translation: "We have to pay the rent today." }
    ],
    243: [
      { text: "Kan du *åpne* vinduet?", translation: "Can you open the window?" },
      { text: "Butikken *åpner* klokka ti.", translation: "The shop opens at ten." },
      { text: "Hun *åpnet* døren forsiktig.", translation: "She opened the door carefully." }
    ],
    244: [
      { text: "Kan du *lukke* døren?", translation: "Can you close the door?" },
      { text: "Butikken *lukker* klokka seks.", translation: "The shop closes at six." },
      { text: "Han *lukket* vinduet fordi det var kaldt.", translation: "He closed the window because it was cold." }
    ],
    245: [
      { text: "Jeg må *vaske* klærne mine.", translation: "I need to wash my clothes." },
      { text: "Hun *vasker* hendene før hun spiser.", translation: "She washes her hands before she eats." },
      { text: "Vi *vasket* bilen i helgen.", translation: "We washed the car over the weekend." }
    ],
    246: [
      { text: "Jeg kan *se* fjellet herfra.", translation: "I can see the mountain from here." },
      { text: "Vil du *se* en film i kveld?", translation: "Do you want to see a movie tonight?" },
      { text: "Hun *så* en fugl i treet.", translation: "She saw a bird in the tree." }
    ],
    247: [
      { text: "Jeg kan *høre* musikk fra naboen.", translation: "I can hear music from the neighbor." },
      { text: "Kan du *høre* meg?", translation: "Can you hear me?" },
      { text: "Hun *hørte* et rart lyd.", translation: "She heard a strange sound." }
    ],
    248: [
      { text: "Hva vil du *si* til henne?", translation: "What do you want to say to her?" },
      { text: "Han *sa* ingenting.", translation: "He said nothing." },
      { text: "Kan du *si* det igjen?", translation: "Can you say that again?" }
    ],
    249: [
      { text: "Kan jeg *spørre* deg om noe?", translation: "Can I ask you something?" },
      { text: "Hun *spurte* om veien til stasjonen.", translation: "She asked for directions to the station." },
      { text: "Vi må *spørre* læreren om dette.", translation: "We need to ask the teacher about this." }
    ],
    250: [
      { text: "Kan du *svare* på spørsmålet mitt?", translation: "Can you answer my question?" },
      { text: "Han *svarte* raskt på e-posten.", translation: "He answered the email quickly." },
      { text: "Hun *svarer* aldri på telefonen.", translation: "She never answers the phone." }
    ],
    251: [
      { text: "Jeg er veldig *glad* i dag.", translation: "I'm very happy today." },
      { text: "Hun ble *glad* for gaven.", translation: "She was happy about the gift." },
      { text: "Vi er *glade* for å se deg.", translation: "We're happy to see you." }
    ],
    252: [
      { text: "Han er *trist* fordi hunden hans er syk.", translation: "He's sad because his dog is sick." },
      { text: "Filmen gjorde meg *trist*.", translation: "The movie made me sad." },
      { text: "Vi følte oss *triste* etter nyheten.", translation: "We felt sad after the news." }
    ],
    253: [
      { text: "Hun ble *sint* da han kom for sent.", translation: "She got angry when he came late." },
      { text: "Ikke vær *sint* på meg.", translation: "Don't be angry with me." },
      { text: "Han var *sint* hele dagen.", translation: "He was angry all day." }
    ],
    254: [
      { text: "Jeg er veldig *trøtt* i kveld.", translation: "I'm very tired tonight." },
      { text: "Hun ble *trøtt* etter jobben.", translation: "She got tired after work." },
      { text: "Vi var *trøtte* etter den lange turen.", translation: "We were tired after the long trip." }
    ],
    255: [
      { text: "Jeg er *syk* i dag og blir hjemme.", translation: "I'm sick today and staying home." },
      { text: "Barnet er *sykt* og har feber.", translation: "The child is sick and has a fever." },
      { text: "Hun var *syk* hele uken.", translation: "She was sick all week." }
    ],
    256: [
      { text: "Prøven var *lett*.", translation: "The test was easy." },
      { text: "Dette er en *lett* oppgave.", translation: "This is an easy task." },
      { text: "Det var *lett* å finne veien.", translation: "It was easy to find the way." }
    ],
    257: [
      { text: "Denne oppgaven er *vanskelig*.", translation: "This task is difficult." },
      { text: "Det var *vanskelig* å forstå ham.", translation: "It was difficult to understand him." },
      { text: "Norsk er ikke så *vanskelig* å lære.", translation: "Norwegian isn't so difficult to learn." }
    ],
    258: [
      { text: "Denne bilen er veldig *dyr*.", translation: "This car is very expensive." },
      { text: "Hotellet var *dyrt*.", translation: "The hotel was expensive." },
      { text: "Vi fant en *dyr* men fin restaurant.", translation: "We found an expensive but nice restaurant." }
    ],
    259: [
      { text: "Denne genseren var *billig*.", translation: "This sweater was cheap." },
      { text: "Vi lette etter et *billig* hotell.", translation: "We looked for a cheap hotel." },
      { text: "Flybilletten var overraskende *billig*.", translation: "The plane ticket was surprisingly cheap." }
    ],
    260: [
      { text: "Inngangen er *gratis* i dag.", translation: "Entry is free today." },
      { text: "Kaffen på kontoret er *gratis*.", translation: "The coffee at the office is free." },
      { text: "Museet er *gratis* for barn.", translation: "The museum is free for children." }
    ],
    261: [
      { text: "Vi har *mange* venner her.", translation: "We have many friends here." },
      { text: "Det var *mange* mennesker på festen.", translation: "There were many people at the party." },
      { text: "Hun har lest *mange* bøker.", translation: "She has read many books." }
    ],
    262: [
      { text: "Det var *få* folk på museet i dag.", translation: "There were few people at the museum today." },
      { text: "Vi har *få* dager igjen av ferien.", translation: "We have few days left of the holiday." },
      { text: "Bare *få* elever kom til timen.", translation: "Only a few students came to class." }
    ],
    263: [
      { text: "Kan jeg få *mer* kaffe?", translation: "Can I have more coffee?" },
      { text: "Jeg trenger *mer* tid.", translation: "I need more time." },
      { text: "Hun snakker *mer* enn broren sin.", translation: "She talks more than her brother." }
    ],
    264: [
      { text: "Jeg spiser *mindre* kjøtt nå.", translation: "I eat less meat now." },
      { text: "Vi har *mindre* tid enn vi trodde.", translation: "We have less time than we thought." },
      { text: "Han jobber *mindre* enn før.", translation: "He works less than before." }
    ],
    265: [
      { text: "Har vi *nok* mat til alle?", translation: "Do we have enough food for everyone?" },
      { text: "Jeg har ikke *nok* penger.", translation: "I don't have enough money." },
      { text: "Det er *nok* plass i bilen.", translation: "There's enough room in the car." }
    ],
    266: [
      { text: "Jeg reiser *ofte* til Norge.", translation: "I often travel to Norway." },
      { text: "Hun ringer *ofte* til foreldrene sine.", translation: "She often calls her parents." },
      { text: "Vi spiser *ofte* fisk til middag.", translation: "We often eat fish for dinner." }
    ],
    267: [
      { text: "Jeg drikker *aldri* kaffe om kvelden.", translation: "I never drink coffee in the evening." },
      { text: "Han kommer *aldri* for sent.", translation: "He never comes late." },
      { text: "Vi har *aldri* vært i Japan.", translation: "We have never been to Japan." }
    ],
    268: [
      { text: "Jeg går *noen ganger* tur alene.", translation: "I sometimes go for a walk alone." },
      { text: "Hun spiser *noen ganger* frokost sent.", translation: "She sometimes eats breakfast late." },
      { text: "Vi drar *noen ganger* til hytta i helgen.", translation: "We sometimes go to the cabin on weekends." }
    ],
    269: [
      { text: "Jeg våkner *tidlig* hver dag.", translation: "I wake up early every day." },
      { text: "Vi kom *tidlig* til flyplassen.", translation: "We arrived early at the airport." },
      { text: "Møtet begynner *tidlig* i morgen.", translation: "The meeting starts early tomorrow." }
    ],
    270: [
      { text: "Han kom *sent* til jobb i dag.", translation: "He came late to work today." },
      { text: "Vi spiste middag *sent* i går.", translation: "We ate dinner late yesterday." },
      { text: "Toget gikk *sent* om kvelden.", translation: "The train left late in the evening." }
    ],
    271: [
      { text: "*Denne* boken er veldig god.", translation: "This book is very good." },
      { text: "Jeg liker *denne* genseren.", translation: "I like this sweater." },
      { text: "*Denne* uken har vært travel.", translation: "This week has been busy." }
    ],
    272: [
      { text: "*Dette* huset er stort.", translation: "This house is big." },
      { text: "Jeg forstår ikke *dette* ordet.", translation: "I don't understand this word." },
      { text: "*Dette* er min bror.", translation: "This is my brother." }
    ],
    273: [
      { text: "*Disse* skoene er nye.", translation: "These shoes are new." },
      { text: "Jeg liker *disse* bildene.", translation: "I like these pictures." },
      { text: "*Disse* bøkene er fra biblioteket.", translation: "These books are from the library." }
    ],
    274: [
      { text: "Vi bor i *samme* by.", translation: "We live in the same city." },
      { text: "Han har *samme* jakke som meg.", translation: "He has the same jacket as me." },
      { text: "De gikk på *samme* skole.", translation: "They went to the same school." }
    ],
    275: [
      { text: "Jeg vil heller ha den *andre* boken.", translation: "I'd rather have the other book." },
      { text: "Vi tar den *andre* veien.", translation: "We'll take the other way." },
      { text: "Hun bor på den *andre* siden av gaten.", translation: "She lives on the other side of the street." }
    ],
    276: [
      { text: "*Ha det*! Vi ses i morgen.", translation: "Bye! See you tomorrow." },
      { text: "Hun vinket og sa *ha det*.", translation: "She waved and said bye." },
      { text: "*Ha det* bra, snakkes snart!", translation: "Bye, talk soon!" }
    ],
    277: [
      { text: "*God morgen*! Sov du godt?", translation: "Good morning! Did you sleep well?" },
      { text: "Han sa *god morgen* til alle på kontoret.", translation: "He said good morning to everyone at the office." },
      { text: "*God morgen*, det er en fin dag i dag.", translation: "Good morning, it's a nice day today." }
    ],
    278: [
      { text: "*God kveld*! Hvordan går det?", translation: "Good evening! How's it going?" },
      { text: "Vi sa *god kveld* og gikk inn.", translation: "We said good evening and went in." },
      { text: "*God kveld*, velkommen til restauranten.", translation: "Good evening, welcome to the restaurant." }
    ],
    279: [
      { text: "*God natt*, sov godt!", translation: "Good night, sleep well!" },
      { text: "Hun sa *god natt* til barna.", translation: "She said good night to the children." },
      { text: "*God natt*, vi ses i morgen tidlig.", translation: "Good night, see you early tomorrow." }
    ],
    280: [
      { text: "*Velkommen* til Norge!", translation: "Welcome to Norway!" },
      { text: "Du er alltid *velkommen* hjem til oss.", translation: "You're always welcome at our home." },
      { text: "*Velkommen* inn, vær så god!", translation: "Welcome in, please!" }
    ],
    281: [
      { text: "*Vær så god*, her er kaffen din.", translation: "Here you are, here's your coffee." },
      { text: "*Vær så god*, sitt ned.", translation: "Please, sit down." },
      { text: "Hun ga meg boken og sa *vær så god*.", translation: "She gave me the book and said here you are." }
    ],
    282: [
      { text: "*Tusen takk* for hjelpen!", translation: "Many thanks for the help!" },
      { text: "*Tusen takk*, det var veldig snilt av deg.", translation: "Thank you so much, that was very kind of you." },
      { text: "Vi sa *tusen takk* og gikk hjem.", translation: "We said thanks a lot and went home." }
    ],
    283: [
      { text: "*Det går bra*, ikke bekymre deg.", translation: "It's fine, don't worry." },
      { text: "Hvordan går det? *Det går bra*, takk.", translation: "How's it going? It's fine, thanks." },
      { text: "*Det går bra* med meg nå.", translation: "I'm doing fine now." }
    ],
    284: [
      { text: "Det var en fin film, *ikke sant*?", translation: "That was a nice movie, right?" },
      { text: "Du liker kaffe, *ikke sant*?", translation: "You like coffee, right?" },
      { text: "Vi møttes i fjor, *ikke sant*?", translation: "We met last year, right?" }
    ],
    285: [
      { text: "*Selvfølgelig* kan jeg hjelpe deg.", translation: "Of course I can help you." },
      { text: "Kommer du i kveld? *Selvfølgelig*!", translation: "Are you coming tonight? Of course!" },
      { text: "*Selvfølgelig* husker jeg deg.", translation: "Of course I remember you." }
    ],
    286: [
      { text: "Jeg må til *apoteket* og kjøpe medisin.", translation: "I need to go to the pharmacy and buy medicine." },
      { text: "*Apoteket* ligger ved siden av butikken.", translation: "The pharmacy is next to the shop." },
      { text: "*Apoteket* åpner klokka åtte.", translation: "The pharmacy opens at eight." }
    ],
    287: [
      { text: "Han ble kjørt til *sykehuset* i går.", translation: "He was taken to the hospital yesterday." },
      { text: "*Sykehuset* ligger utenfor byen.", translation: "The hospital is outside the city." },
      { text: "Hun jobber på *sykehuset* som sykepleier.", translation: "She works at the hospital as a nurse." }
    ],
    288: [
      { text: "Jeg har time hos *tannlegen* i morgen.", translation: "I have an appointment with the dentist tomorrow." },
      { text: "*Tannlegen* sjekket tennene mine.", translation: "The dentist checked my teeth." },
      { text: "Barn bør gå til *tannlegen* hvert år.", translation: "Children should go to the dentist every year." }
    ],
    289: [
      { text: "Kan jeg få litt *hjelp*?", translation: "Can I get some help?" },
      { text: "Tusen takk for *hjelpen*!", translation: "Thanks a lot for the help!" },
      { text: "Hun trengte *hjelp* med leksene.", translation: "She needed help with the homework." }
    ],
    290: [
      { text: "Vi har et lite *problem*.", translation: "We have a small problem." },
      { text: "*Problemet* ble løst raskt.", translation: "The problem was solved quickly." },
      { text: "Ikke noe *problem*, jeg kan hjelpe.", translation: "No problem, I can help." }
    ],
    291: [
      { text: "Hva er *prisen* på denne genseren?", translation: "What's the price of this sweater?" },
      { text: "*Prisen* var høyere enn jeg forventet.", translation: "The price was higher than I expected." },
      { text: "Vi sammenlignet *priser* i flere butikker.", translation: "We compared prices in several shops." }
    ],
    292: [
      { text: "Jeg har ikke nok *penger* i dag.", translation: "I don't have enough money today." },
      { text: "Hun sparer *penger* til reisen.", translation: "She's saving money for the trip." },
      { text: "Vi trenger mer *penger* til prosjektet.", translation: "We need more money for the project." }
    ],
    293: [
      { text: "Kan jeg få en *kvittering*, vær så snill?", translation: "Can I have a receipt, please?" },
      { text: "Jeg mistet *kvitteringen* min.", translation: "I lost my receipt." },
      { text: "*Kvitteringen* viser hva du betalte.", translation: "The receipt shows what you paid." }
    ],
    294: [
      { text: "Trenger du en *pose*?", translation: "Do you need a bag?" },
      { text: "*Posen* var full av grønnsaker.", translation: "The bag was full of vegetables." },
      { text: "Jeg glemte *posene* mine hjemme.", translation: "I forgot my bags at home." }
    ],
    295: [
      { text: "Hvilken *størrelse* bruker du?", translation: "What size do you wear?" },
      { text: "Denne genseren er feil *størrelse*.", translation: "This sweater is the wrong size." },
      { text: "De har alle *størrelser* i denne butikken.", translation: "They have all sizes in this shop." }
    ],
    296: [
      { text: "Jeg glemte *telefonen* min hjemme.", translation: "I forgot my phone at home." },
      { text: "*Telefonen* ringte midt på natten.", translation: "The phone rang in the middle of the night." },
      { text: "Kan jeg låne *telefonen* din?", translation: "Can I borrow your phone?" }
    ],
    297: [
      { text: "Min *datamaskin* er veldig gammel.", translation: "My computer is very old." },
      { text: "*Datamaskinen* sluttet å virke i går.", translation: "The computer stopped working yesterday." },
      { text: "Jeg jobber på *datamaskinen* hele dagen.", translation: "I work on the computer all day." }
    ],
    298: [
      { text: "Jeg har mistet *nøkkelen* min.", translation: "I've lost my key." },
      { text: "*Nøkkelen* ligger under matten.", translation: "The key is under the mat." },
      { text: "Kan du gi meg *nøklene*?", translation: "Can you give me the keys?" }
    ],
    299: [
      { text: "*Klokka* på veggen viser feil tid.", translation: "The clock on the wall shows the wrong time." },
      { text: "Jeg kjøpte en ny *klokke* i går.", translation: "I bought a new watch yesterday." },
      { text: "*Klokken* ringte klokka sju.", translation: "The clock rang at seven." }
    ],
    300: [
      { text: "Hun bærer alltid en stor *veske*.", translation: "She always carries a big bag." },
      { text: "*Vesken* min er full av bøker.", translation: "My bag is full of books." },
      { text: "Jeg kjøpte en ny *veske* til skolen.", translation: "I bought a new bag for school." }
    ],
    301: [
      { text: "Kan du *gi* meg boken?", translation: "Can you give me the book?" },
      { text: "Han *ga* henne en gave.", translation: "He gave her a gift." },
      { text: "Vi vil *gi* penger til veldedighet.", translation: "We want to give money to charity." }
    ],
    302: [
      { text: "Kan du *ta* denne posen for meg?", translation: "Can you take this bag for me?" },
      { text: "Hun *tok* bussen til jobb.", translation: "She took the bus to work." },
      { text: "Jeg må *ta* en pause nå.", translation: "I need to take a break now." }
    ],
    303: [
      { text: "Kan du *legge* boken på bordet?", translation: "Can you put the book on the table?" },
      { text: "Hun *la* nøklene i vesken.", translation: "She put the keys in the bag." },
      { text: "Jeg skal *legge* meg tidlig i kveld.", translation: "I'm going to bed early tonight." }
    ],
    304: [
      { text: "Filmen *begynner* klokka åtte.", translation: "The movie begins at eight." },
      { text: "Vi må *begynne* å jobbe nå.", translation: "We need to begin working now." },
      { text: "Skolen *begynte* i august.", translation: "School began in August." }
    ],
    305: [
      { text: "Jeg må *avslutte* dette prosjektet i dag.", translation: "I need to finish this project today." },
      { text: "Møtet *avsluttet* tidlig.", translation: "The meeting finished early." },
      { text: "Vi skal *avslutte* kurset neste uke.", translation: "We're going to finish the course next week." }
    ],
    306: [
      { text: "Jeg *vet* ikke svaret.", translation: "I don't know the answer." },
      { text: "*Vet* du hvor hun bor?", translation: "Do you know where she lives?" },
      { text: "Hun *visste* ikke hva hun skulle si.", translation: "She didn't know what to say." }
    ],
    307: [
      { text: "Jeg *tenker* på deg.", translation: "I'm thinking of you." },
      { text: "Hva *tenker* du om dette?", translation: "What do you think about this?" },
      { text: "Han *tenkte* lenge før han svarte.", translation: "He thought for a long time before answering." }
    ],
    308: [
      { text: "Jeg *forstår* ikke spørsmålet.", translation: "I don't understand the question." },
      { text: "Kan du *forstå* norsk?", translation: "Can you understand Norwegian?" },
      { text: "Hun *forsto* ikke hvorfor han var sint.", translation: "She didn't understand why he was angry." }
    ],
    309: [
      { text: "Jeg *husker* ikke navnet hans.", translation: "I don't remember his name." },
      { text: "Kan du *huske* hva jeg sa?", translation: "Can you remember what I said?" },
      { text: "Hun *husket* bursdagen min.", translation: "She remembered my birthday." }
    ],
    310: [
      { text: "Jeg *glemmer* alltid nøklene mine.", translation: "I always forget my keys." },
      { text: "Ikke *glem* å ringe meg.", translation: "Don't forget to call me." },
      { text: "Han *glemte* boken hjemme.", translation: "He forgot the book at home." }
    ],
    311: [
      { text: "Kan du *hjelpe* meg med dette?", translation: "Can you help me with this?" },
      { text: "Hun *hjelper* alltid andre.", translation: "She always helps others." },
      { text: "Vi *hjalp* naboen med hagen.", translation: "We helped the neighbor with the garden." }
    ],
    312: [
      { text: "Jeg skal *ringe* deg i kveld.", translation: "I'll call you tonight." },
      { text: "Kan du *ringe* legen for meg?", translation: "Can you call the doctor for me?" },
      { text: "Hun *ringte* moren sin hver søndag.", translation: "She called her mother every Sunday." }
    ],
    313: [
      { text: "Kan du *sende* meg boken?", translation: "Can you send me the book?" },
      { text: "Jeg *sendte* en e-post i går.", translation: "I sent an email yesterday." },
      { text: "Vi skal *sende* pakken i morgen.", translation: "We're going to send the package tomorrow." }
    ],
    314: [
      { text: "Jeg *mistet* nøkkelen min.", translation: "I lost my key." },
      { text: "Ikke *mist* motet.", translation: "Don't lose heart." },
      { text: "Hun er redd for å *miste* jobben.", translation: "She's afraid of losing her job." }
    ],
    315: [
      { text: "Vi håper å *vinne* kampen i dag.", translation: "We hope to win the match today." },
      { text: "Hun *vant* konkurransen i fjor.", translation: "She won the competition last year." },
      { text: "Laget vårt *vinner* ofte.", translation: "Our team often wins." }
    ],
    316: [
      { text: "Toget *ankommer* klokka ti.", translation: "The train arrives at ten." },
      { text: "Vi *ankom* sent til festen.", translation: "We arrived late at the party." },
      { text: "Flyet skal *ankomme* om en time.", translation: "The plane is due to arrive in an hour." }
    ],
    317: [
      { text: "Vi kan *gå inn* nå.", translation: "We can enter now." },
      { text: "Hun *gikk inn* i rommet stille.", translation: "She entered the room quietly." },
      { text: "Kan jeg *gå inn*?", translation: "Can I come in?" }
    ],
    318: [
      { text: "Toget *drar* klokka ni.", translation: "The train departs at nine." },
      { text: "Vi må *dra* nå for å rekke flyet.", translation: "We have to leave now to catch the plane." },
      { text: "Han *dro* uten å si farvel.", translation: "He left without saying goodbye." }
    ],
    319: [
      { text: "Jeg *bor* i Oslo.", translation: "I live in Oslo." },
      { text: "Hvor *bor* du?", translation: "Where do you live?" },
      { text: "De *bodde* der i mange år.", translation: "They lived there for many years." }
    ],
    320: [
      { text: "Vi liker å *spasere* i parken.", translation: "We like to walk in the park." },
      { text: "Hun *spaserer* til jobb hver dag.", translation: "She walks to work every day." },
      { text: "Skal vi *spasere* en tur?", translation: "Shall we go for a walk?" }
    ],
    321: [
      { text: "Jeg *løper* hver morgen.", translation: "I run every morning." },
      { text: "Barna *løp* rundt i hagen.", translation: "The children ran around in the garden." },
      { text: "Han kan *løpe* veldig fort.", translation: "He can run very fast." }
    ],
    322: [
      { text: "Vi elsker å *svømme* om sommeren.", translation: "We love to swim in summer." },
      { text: "Kan du *svømme*?", translation: "Can you swim?" },
      { text: "Hun *svømte* over hele innsjøen.", translation: "She swam across the whole lake." }
    ],
    323: [
      { text: "Barnet lærte å *hoppe* i dag.", translation: "The child learned to jump today." },
      { text: "Han *hoppet* over gjerdet.", translation: "He jumped over the fence." },
      { text: "Kan du *hoppe* så høyt?", translation: "Can you jump that high?" }
    ],
    324: [
      { text: "Vi elsker å *danse* på fester.", translation: "We love to dance at parties." },
      { text: "Kan du *danse* vals?", translation: "Can you dance the waltz?" },
      { text: "De *danset* hele natten.", translation: "They danced all night." }
    ],
    325: [
      { text: "Hun kan *synge* veldig godt.", translation: "She can sing very well." },
      { text: "Vi *sang* sammen ved bålet.", translation: "We sang together by the campfire." },
      { text: "Han *synger* i et kor.", translation: "He sings in a choir." }
    ],
    326: [
      { text: "Barna *leker* i hagen.", translation: "The children are playing in the garden." },
      { text: "Vil du *leke* med meg?", translation: "Do you want to play with me?" },
      { text: "De *lekte* hele ettermiddagen.", translation: "They played all afternoon." }
    ],
    327: [
      { text: "Jeg liker å *lage mat* på søndager.", translation: "I like to cook on Sundays." },
      { text: "Kan du *lage mat* til oss i kveld?", translation: "Can you cook for us tonight?" },
      { text: "Hun *lager mat* hver dag.", translation: "She cooks every day." }
    ],
    328: [
      { text: "Jeg må *rydde* rommet mitt.", translation: "I need to tidy my room." },
      { text: "Kan du *rydde* kjøkkenet?", translation: "Can you clean the kitchen?" },
      { text: "Vi *ryddet* huset før gjestene kom.", translation: "We tidied the house before the guests arrived." }
    ],
    329: [
      { text: "De skal *bygge* et nytt hus.", translation: "They're going to build a new house." },
      { text: "Han *bygde* et bord av tre.", translation: "He built a table out of wood." },
      { text: "Vi *bygger* et team sammen.", translation: "We're building a team together." }
    ],
    330: [
      { text: "Jeg vil *endre* planene mine.", translation: "I want to change my plans." },
      { text: "Kan vi *endre* tidspunktet?", translation: "Can we change the time?" },
      { text: "Livet hennes *endret* seg fullstendig.", translation: "Her life changed completely." }
    ],
    331: [
      { text: "Vi spiser *ris* til middag.", translation: "We eat rice for dinner." },
      { text: "*Risen* var kokt perfekt.", translation: "The rice was cooked perfectly." },
      { text: "Han liker *ris* med kylling.", translation: "He likes rice with chicken." }
    ],
    332: [
      { text: "Vi lager *pasta* i kveld.", translation: "We're making pasta tonight." },
      { text: "*Pastaen* var deilig.", translation: "The pasta was delicious." },
      { text: "Hun spiser *pasta* hver uke.", translation: "She eats pasta every week." }
    ],
    333: [
      { text: "Vi griller *kylling* i helgen.", translation: "We're grilling chicken this weekend." },
      { text: "*Kyllingen* smakte veldig godt.", translation: "The chicken tasted very good." },
      { text: "Han spiser aldri *kylling*.", translation: "He never eats chicken." }
    ],
    334: [
      { text: "Vi spiser *storfekjøtt* til søndagsmiddag.", translation: "We eat beef for Sunday dinner." },
      { text: "*Storfekjøttet* var mørt og saftig.", translation: "The beef was tender and juicy." },
      { text: "Han foretrekker *storfekjøtt* fremfor kylling.", translation: "He prefers beef to chicken." }
    ],
    335: [
      { text: "Hun spiser ikke *svinekjøtt*.", translation: "She doesn't eat pork." },
      { text: "Vi grillet *svinekjøtt* i går.", translation: "We grilled pork yesterday." },
      { text: "*Svinekjøttet* var litt for salt.", translation: "The pork was a bit too salty." }
    ],
    336: [
      { text: "Kan du sende meg *smøret*?", translation: "Can you pass me the butter?" },
      { text: "Hun smører *smør* på brødet.", translation: "She spreads butter on the bread." },
      { text: "Vi trenger mer *smør* til kaken.", translation: "We need more butter for the cake." }
    ],
    337: [
      { text: "Vi steker fisken i *olje*.", translation: "We fry the fish in oil." },
      { text: "*Oljen* var for varm.", translation: "The oil was too hot." },
      { text: "Kan du sende meg *oljen*?", translation: "Can you pass me the oil?" }
    ],
    338: [
      { text: "Kan du sende meg *pepperet*?", translation: "Can you pass me the pepper?" },
      { text: "Suppen trenger litt mer *pepper*.", translation: "The soup needs a bit more pepper." },
      { text: "Hun bruker mye *pepper* i maten.", translation: "She uses a lot of pepper in the food." }
    ],
    339: [
      { text: "Vi kutter *løk* til suppen.", translation: "We're cutting onion for the soup." },
      { text: "*Løken* fikk meg til å gråte.", translation: "The onion made me cry." },
      { text: "Han liker ikke rå *løk*.", translation: "He doesn't like raw onion." }
    ],
    340: [
      { text: "Vi trenger flere *tomater* til salaten.", translation: "We need more tomatoes for the salad." },
      { text: "*Tomaten* var moden og rød.", translation: "The tomato was ripe and red." },
      { text: "Hun dyrker *tomater* i hagen.", translation: "She grows tomatoes in the garden." }
    ],
    341: [
      { text: "Vi steker *hvitløk* i olje.", translation: "We fry garlic in oil." },
      { text: "Retten smaker sterkt av *hvitløk*.", translation: "The dish tastes strongly of garlic." },
      { text: "Han elsker *hvitløk* i alt han lager.", translation: "He loves garlic in everything he cooks." }
    ],
    342: [
      { text: "Jeg drikker vann med *sitron*.", translation: "I drink water with lemon." },
      { text: "*Sitronen* var veldig sur.", translation: "The lemon was very sour." },
      { text: "Hun presset en *sitron* over fisken.", translation: "She squeezed a lemon over the fish." }
    ],
    343: [
      { text: "Vi plukket *jordbær* i hagen.", translation: "We picked strawberries in the garden." },
      { text: "*Jordbærene* var søte og røde.", translation: "The strawberries were sweet and red." },
      { text: "Hun laget syltetøy av *jordbær*.", translation: "She made jam from strawberries." }
    ],
    344: [
      { text: "Barna spiser *druer* som snacks.", translation: "The children eat grapes as snacks." },
      { text: "*Druene* var grønne og søte.", translation: "The grapes were green and sweet." },
      { text: "Vi kjøpte en pose *druer* på markedet.", translation: "We bought a bag of grapes at the market." }
    ],
    345: [
      { text: "Hun bakte en *kake* til bursdagen min.", translation: "She baked a cake for my birthday." },
      { text: "*Kaken* smakte fantastisk.", translation: "The cake tasted amazing." },
      { text: "Vi spiser *kake* på søndager.", translation: "We eat cake on Sundays." }
    ],
    346: [
      { text: "Jeg elsker mørk *sjokolade*.", translation: "I love dark chocolate." },
      { text: "*Sjokoladen* smeltet i solen.", translation: "The chocolate melted in the sun." },
      { text: "Hun ga meg en eske *sjokolade*.", translation: "She gave me a box of chocolate." }
    ],
    347: [
      { text: "Vi spiser *iskrem* om sommeren.", translation: "We eat ice cream in summer." },
      { text: "*Iskremen* smeltet fort.", translation: "The ice cream melted fast." },
      { text: "Barna elsker jordbær-*iskrem*.", translation: "The children love strawberry ice cream." }
    ],
    348: [
      { text: "Vi drakk *vin* til middagen.", translation: "We drank wine with dinner." },
      { text: "*Vinen* var rød og tørr.", translation: "The wine was red and dry." },
      { text: "Han samler på *vin*.", translation: "He collects wine." }
    ],
    349: [
      { text: "Han drikker *øl* med vennene sine.", translation: "He drinks beer with his friends." },
      { text: "*Ølet* var kaldt og friskt.", translation: "The beer was cold and refreshing." },
      { text: "Vi bestilte to *øl* på puben.", translation: "We ordered two beers at the pub." }
    ],
    350: [
      { text: "Kan du åpne denne *flasken*?", translation: "Can you open this bottle?" },
      { text: "*Flasken* var full av vann.", translation: "The bottle was full of water." },
      { text: "Vi kjøpte en *flaske* vin til festen.", translation: "We bought a bottle of wine for the party." }
    ],
    351: [
      { text: "Maten står på *bordet*.", translation: "The food is on the table." },
      { text: "Vi kjøpte et nytt *bord* til stuen.", translation: "We bought a new table for the living room." },
      { text: "Sett deg ved *bordet*.", translation: "Sit down at the table." }
    ],
    352: [
      { text: "Denne *stolen* er veldig komfortabel.", translation: "This chair is very comfortable." },
      { text: "Kan du hente en *stol* til meg?", translation: "Can you get me a chair?" },
      { text: "Vi trenger flere *stoler* til middagen.", translation: "We need more chairs for the dinner." }
    ],
    353: [
      { text: "Jeg legger meg i *sengen* klokka ti.", translation: "I get into bed at ten." },
      { text: "*Sengen* min er veldig myk.", translation: "My bed is very soft." },
      { text: "Barnet sover i en liten *seng*.", translation: "The child sleeps in a small bed." }
    ],
    354: [
      { text: "Kan du lukke *døren*?", translation: "Can you close the door?" },
      { text: "*Døren* var låst.", translation: "The door was locked." },
      { text: "Han banket på *døren*.", translation: "He knocked on the door." }
    ],
    355: [
      { text: "Kan du åpne *vinduet*?", translation: "Can you open the window?" },
      { text: "*Vinduet* var skittent.", translation: "The window was dirty." },
      { text: "Solen skinte inn gjennom *vinduet*.", translation: "The sun shone in through the window." }
    ],
    356: [
      { text: "Bildet henger på *veggen*.", translation: "The picture hangs on the wall." },
      { text: "*Veggen* er malt hvit.", translation: "The wall is painted white." },
      { text: "Vi festet en hylle på *veggen*.", translation: "We attached a shelf to the wall." }
    ],
    357: [
      { text: "*Gulvet* er kaldt om vinteren.", translation: "The floor is cold in winter." },
      { text: "Hun vasket *gulvet* i går.", translation: "She washed the floor yesterday." },
      { text: "Barnet leker på *gulvet*.", translation: "The child is playing on the floor." }
    ],
    358: [
      { text: "*Taket* lekker når det regner.", translation: "The roof leaks when it rains." },
      { text: "Vi malte *taket* i sommer.", translation: "We painted the roof this summer." },
      { text: "Snøen dekket hele *taket*.", translation: "The snow covered the whole roof." }
    ],
    359: [
      { text: "Vi dyrker grønnsaker i *hagen*.", translation: "We grow vegetables in the garden." },
      { text: "*Hagen* vår er full av blomster.", translation: "Our garden is full of flowers." },
      { text: "Barna leker i *hagen* hver dag.", translation: "The children play in the garden every day." }
    ],
    360: [
      { text: "Bilen står i *garasjen*.", translation: "The car is in the garage." },
      { text: "Vi bygde en ny *garasje* i fjor.", translation: "We built a new garage last year." },
      { text: "*Garasjen* er full av verktøy.", translation: "The garage is full of tools." }
    ],
    361: [
      { text: "*Lampen* i stuen er veldig fin.", translation: "The lamp in the living room is very nice." },
      { text: "Kan du skru på *lampen*?", translation: "Can you turn on the lamp?" },
      { text: "Vi kjøpte en ny *lampe* til soverommet.", translation: "We bought a new lamp for the bedroom." }
    ],
    362: [
      { text: "Hun ser seg i *speilet*.", translation: "She looks at herself in the mirror." },
      { text: "*Speilet* på badet er stort.", translation: "The mirror in the bathroom is big." },
      { text: "Vi hengte opp et nytt *speil* i gangen.", translation: "We hung up a new mirror in the hallway." }
    ],
    363: [
      { text: "Kan du gi meg et *håndkle*?", translation: "Can you give me a towel?" },
      { text: "*Håndkleet* var vått.", translation: "The towel was wet." },
      { text: "Vi vasker *håndklærne* hver uke.", translation: "We wash the towels every week." }
    ],
    364: [
      { text: "Vask hendene med *såpe*.", translation: "Wash your hands with soap." },
      { text: "*Såpen* luktet lavendel.", translation: "The soap smelled like lavender." },
      { text: "Vi trenger mer *såpe* på badet.", translation: "We need more soap in the bathroom." }
    ],
    365: [
      { text: "Melken er i *kjøleskapet*.", translation: "The milk is in the fridge." },
      { text: "*Kjøleskapet* vårt er nesten tomt.", translation: "Our fridge is almost empty." },
      { text: "Vi kjøpte et nytt *kjøleskap* i går.", translation: "We bought a new fridge yesterday." }
    ],
    366: [
      { text: "Brødet er i *ovnen*.", translation: "The bread is in the oven." },
      { text: "*Ovnen* er veldig varm nå.", translation: "The oven is very hot now." },
      { text: "Hun satte kaken inn i *ovnen*.", translation: "She put the cake in the oven." }
    ],
    367: [
      { text: "Vi sitter på *sofaen* og ser på TV.", translation: "We're sitting on the sofa watching TV." },
      { text: "*Sofaen* er myk og komfortabel.", translation: "The sofa is soft and comfortable." },
      { text: "Katten sover alltid på *sofaen*.", translation: "The cat always sleeps on the sofa." }
    ],
    368: [
      { text: "Boken står på *hyllen*.", translation: "The book is on the shelf." },
      { text: "Vi trenger en ny *hylle* til kjøkkenet.", translation: "We need a new shelf for the kitchen." },
      { text: "*Hyllen* er full av bøker.", translation: "The shelf is full of books." }
    ],
    369: [
      { text: "Han løp opp *trappen*.", translation: "He ran up the stairs." },
      { text: "*Trappen* er bratt og smal.", translation: "The stairs are steep and narrow." },
      { text: "Vær forsiktig i *trappen*.", translation: "Be careful on the stairs." }
    ],
    370: [
      { text: "Vi tok *heisen* opp til femte etasje.", translation: "We took the elevator up to the fifth floor." },
      { text: "*Heisen* var ødelagt i dag.", translation: "The elevator was broken today." },
      { text: "Han er redd for å ta *heisen*.", translation: "He's afraid of taking the elevator." }
    ],
    371: [
      { text: "Vi har en *hund* som heter Rex.", translation: "We have a dog named Rex." },
      { text: "*Hunden* løp etter ballen.", translation: "The dog ran after the ball." },
      { text: "Han går tur med *hunden* hver morgen.", translation: "He walks the dog every morning." }
    ],
    372: [
      { text: "*Katten* sover hele dagen.", translation: "The cat sleeps all day." },
      { text: "Vi adopterte en *katt* i fjor.", translation: "We adopted a cat last year." },
      { text: "*Katten* vår er svart og hvit.", translation: "Our cat is black and white." }
    ],
    373: [
      { text: "Jeg hørte en *fugl* synge utenfor.", translation: "I heard a bird singing outside." },
      { text: "*Fuglen* fløy bort raskt.", translation: "The bird flew away quickly." },
      { text: "Vi så mange *fugler* i parken.", translation: "We saw many birds in the park." }
    ],
    374: [
      { text: "Hun rir på en *hest* hver helg.", translation: "She rides a horse every weekend." },
      { text: "*Hesten* løp fort over marken.", translation: "The horse ran fast across the field." },
      { text: "Vi så *hester* på gården.", translation: "We saw horses at the farm." }
    ],
    375: [
      { text: "Bonden har mange *kuer*.", translation: "The farmer has many cows." },
      { text: "*Kua* beitet i marken.", translation: "The cow grazed in the field." },
      { text: "Vi så *kuer* langs veien.", translation: "We saw cows along the road." }
    ],
    376: [
      { text: "Det er mange *sauer* på fjellet.", translation: "There are many sheep in the mountains." },
      { text: "*Sauen* hadde hvit ull.", translation: "The sheep had white wool." },
      { text: "Bonden klipper *sauene* om våren.", translation: "The farmer shears the sheep in spring." }
    ],
    377: [
      { text: "Bonden har fem *griser*.", translation: "The farmer has five pigs." },
      { text: "*Grisen* var rosa og skitten.", translation: "The pig was pink and dirty." },
      { text: "Vi så *griser* på gårdsbesøket.", translation: "We saw pigs on the farm visit." }
    ],
    378: [
      { text: "*Hønen* la egg hver dag.", translation: "The hen laid eggs every day." },
      { text: "Vi har fem *høner* i hagen.", translation: "We have five hens in the garden." },
      { text: "*Hønene* løp rundt i gårdsplassen.", translation: "The hens ran around the farmyard." }
    ],
    379: [
      { text: "Det er en *mus* i kjøkkenet.", translation: "There's a mouse in the kitchen." },
      { text: "Katten jaget *musen*.", translation: "The cat chased the mouse." },
      { text: "Vi så en liten *mus* løpe forbi.", translation: "We saw a small mouse run by." }
    ],
    380: [
      { text: "Barna har en *kanin* som kjæledyr.", translation: "The children have a rabbit as a pet." },
      { text: "*Kaninen* spiste gulrøtter.", translation: "The rabbit ate carrots." },
      { text: "Vi så en vill *kanin* i hagen.", translation: "We saw a wild rabbit in the garden." }
    ],
    381: [
      { text: "Vi plantet et *tre* i hagen.", translation: "We planted a tree in the garden." },
      { text: "*Treet* er veldig høyt.", translation: "The tree is very tall." },
      { text: "Fuglene bygget rede i *treet*.", translation: "The birds built a nest in the tree." }
    ],
    382: [
      { text: "Hun ga meg en *blomst*.", translation: "She gave me a flower." },
      { text: "*Blomstene* i hagen er vakre.", translation: "The flowers in the garden are beautiful." },
      { text: "Vi plantet nye *blomster* i vår.", translation: "We planted new flowers in spring." }
    ],
    383: [
      { text: "*Gresset* er grønt om sommeren.", translation: "The grass is green in summer." },
      { text: "Barna leker på *gresset*.", translation: "The children are playing on the grass." },
      { text: "Vi klipper *gresset* hver uke.", translation: "We mow the grass every week." }
    ],
    384: [
      { text: "Vi klatret opp *fjellet* i går.", translation: "We climbed the mountain yesterday." },
      { text: "*Fjellet* var dekket av snø.", translation: "The mountain was covered in snow." },
      { text: "Utsikten fra *fjellet* var fantastisk.", translation: "The view from the mountain was fantastic." }
    ],
    385: [
      { text: "*Elven* renner gjennom byen.", translation: "The river runs through the city." },
      { text: "Vi fisket i *elven* i går.", translation: "We fished in the river yesterday." },
      { text: "Barna svømte i *elven*.", translation: "The children swam in the river." }
    ],
    386: [
      { text: "Vi bor nær *havet*.", translation: "We live near the sea." },
      { text: "*Havet* var rolig i dag.", translation: "The sea was calm today." },
      { text: "De seilte over *havet*.", translation: "They sailed across the sea." }
    ],
    387: [
      { text: "Vi svømmer i *innsjøen* om sommeren.", translation: "We swim in the lake in summer." },
      { text: "*Innsjøen* var stille og klar.", translation: "The lake was calm and clear." },
      { text: "Hytta ligger ved en liten *innsjø*.", translation: "The cabin is by a small lake." }
    ],
    388: [
      { text: "Vi gikk en tur i *skogen*.", translation: "We went for a walk in the forest." },
      { text: "*Skogen* var full av trær og fugler.", translation: "The forest was full of trees and birds." },
      { text: "Barna plukket sopp i *skogen*.", translation: "The children picked mushrooms in the forest." }
    ],
    389: [
      { text: "Vi tilbrakte hele dagen på *stranden*.", translation: "We spent the whole day at the beach." },
      { text: "*Stranden* var full av folk.", translation: "The beach was full of people." },
      { text: "Barna bygde sandslott på *stranden*.", translation: "The children built sandcastles on the beach." }
    ],
    390: [
      { text: "*Himmelen* er blå i dag.", translation: "The sky is blue today." },
      { text: "Vi så stjernene på *himmelen*.", translation: "We saw the stars in the sky." },
      { text: "*Himmelen* ble rød ved solnedgang.", translation: "The sky turned red at sunset." }
    ],
    391: [
      { text: "Hun er *tretti* år gammel.", translation: "She's thirty years old." },
      { text: "Vi ventet i *tretti* minutter.", translation: "We waited thirty minutes." },
      { text: "Det er *tretti* dager i april.", translation: "There are thirty days in April." }
    ],
    392: [
      { text: "Han er *førti* år gammel.", translation: "He's forty years old." },
      { text: "Vi kjørte i *førti* minutter.", translation: "We drove for forty minutes." },
      { text: "Billetten kostet *førti* kroner.", translation: "The ticket cost forty kroner." }
    ],
    393: [
      { text: "Bestemor er *femti* år gammel.", translation: "Grandmother is fifty years old." },
      { text: "Vi ventet i *femti* minutter på flyet.", translation: "We waited fifty minutes for the plane." },
      { text: "Det var *femti* gjester i bryllupet.", translation: "There were fifty guests at the wedding." }
    ],
    394: [
      { text: "Det er *hundre* år siden huset ble bygget.", translation: "It's a hundred years since the house was built." },
      { text: "Vi betalte *hundre* kroner for billetten.", translation: "We paid a hundred kroner for the ticket." },
      { text: "Det var *hundre* mennesker på konserten.", translation: "There were a hundred people at the concert." }
    ],
    395: [
      { text: "Byen har over *tusen* innbyggere.", translation: "The town has over a thousand inhabitants." },
      { text: "Vi betalte *tusen* kroner for reisen.", translation: "We paid a thousand kroner for the trip." },
      { text: "Det var *tusen* stjerner på himmelen.", translation: "There were a thousand stars in the sky." }
    ],
    396: [
      { text: "Himmelen er *grå* i dag.", translation: "The sky is grey today." },
      { text: "Han har en *grå* bil.", translation: "He has a grey car." },
      { text: "Katten hennes er *grå* og hvit.", translation: "Her cat is grey and white." }
    ],
    397: [
      { text: "Dette er min *første* dag på jobben.", translation: "This is my first day at work." },
      { text: "Vi bor i *første* etasje.", translation: "We live on the first floor." },
      { text: "Hun kom *først* i løpet.", translation: "She came first in the race." }
    ],
    398: [
      { text: "Dette er den *siste* dagen på ferien.", translation: "This is the last day of the holiday." },
      { text: "Han var den *siste* som gikk.", translation: "He was the last one to leave." },
      { text: "Det var det *siste* eplet i kurven.", translation: "It was the last apple in the basket." }
    ],
    399: [
      { text: "Klokka er *halv* ni.", translation: "It's half past eight." },
      { text: "Jeg spiste bare en *halv* eple.", translation: "I only ate half an apple." },
      { text: "Vi delte kaken i to *halve* deler.", translation: "We divided the cake into two halves." }
    ],
    400: [
      { text: "Hva er *nummeret* ditt?", translation: "What's your number?" },
      { text: "Vi bor i *nummer* ti.", translation: "We live at number ten." },
      { text: "Kan du gi meg *nummeret* hennes?", translation: "Can you give me her number?" }
    ],
    401: [
      { text: "Jeg er *redd* for edderkopper.", translation: "I'm afraid of spiders." },
      { text: "Hun ble *redd* av lynet.", translation: "She got scared by the lightning." },
      { text: "Ikke vær *redd*, alt går bra.", translation: "Don't be afraid, everything's fine." }
    ],
    402: [
      { text: "Jeg ble veldig *overrasket* over gaven.", translation: "I was very surprised by the gift." },
      { text: "Hun så *overrasket* ut.", translation: "She looked surprised." },
      { text: "Vi var *overrasket* over resultatet.", translation: "We were surprised by the result." }
    ],
    403: [
      { text: "Jeg er *lei* av dette spillet.", translation: "I'm bored of this game." },
      { text: "Barna ble *lei* etter en time.", translation: "The children got bored after an hour." },
      { text: "Hun så *lei* ut i timen.", translation: "She looked bored in class." }
    ],
    404: [
      { text: "Hun er alltid *rolig* i vanskelige situasjoner.", translation: "She's always calm in difficult situations." },
      { text: "Havet var *rolig* i dag.", translation: "The sea was calm today." },
      { text: "Vi hadde en *rolig* kveld hjemme.", translation: "We had a calm evening at home." }
    ],
    405: [
      { text: "Jeg er veldig *stolt* av deg.", translation: "I'm very proud of you." },
      { text: "Han var *stolt* over prestasjonen sin.", translation: "He was proud of his achievement." },
      { text: "Foreldrene var *stolte* av barna sine.", translation: "The parents were proud of their children." }
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
