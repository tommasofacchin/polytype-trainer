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
    ],
    406: [
      { text: "Han er veldig *sterk*.", translation: "He's very strong." },
      { text: "Kaffen var for *sterk* for meg.", translation: "The coffee was too strong for me." },
      { text: "Hun har *sterke* armer.", translation: "She has strong arms." }
    ],
    407: [
      { text: "Han følte seg *svak* etter sykdommen.", translation: "He felt weak after the illness." },
      { text: "Signalet er *svakt* her.", translation: "The signal is weak here." },
      { text: "Teen var litt *svak*.", translation: "The tea was a bit weak." }
    ],
    408: [
      { text: "Utsikten var *vakker*.", translation: "The view was beautiful." },
      { text: "Hun har et *vakkert* smil.", translation: "She has a beautiful smile." },
      { text: "Blomstene i hagen er *vakre*.", translation: "The flowers in the garden are beautiful." }
    ],
    409: [
      { text: "Den bygningen er ganske *stygg*.", translation: "That building is quite ugly." },
      { text: "Han hadde et *stygt* sår på armen.", translation: "He had an ugly wound on his arm." },
      { text: "Været var *stygt* i går.", translation: "The weather was ugly yesterday." }
    ],
    410: [
      { text: "Hun er fortsatt veldig *ung*.", translation: "She's still very young." },
      { text: "Han var *ung* da han flyttet hjemmefra.", translation: "He was young when he moved out." },
      { text: "De *unge* liker å reise mye.", translation: "Young people like to travel a lot." }
    ],
    411: [
      { text: "Familien hans er veldig *rik*.", translation: "His family is very rich." },
      { text: "Han ble *rik* av å selge huset.", translation: "He became rich from selling the house." },
      { text: "Landet er *rikt* på naturressurser.", translation: "The country is rich in natural resources." }
    ],
    412: [
      { text: "Mange mennesker der er *fattige*.", translation: "Many people there are poor." },
      { text: "Familien var *fattig* men lykkelig.", translation: "The family was poor but happy." },
      { text: "Han vokste opp i et *fattig* strøk.", translation: "He grew up in a poor neighborhood." }
    ],
    413: [
      { text: "Kjøkkenet er helt *rent* nå.", translation: "The kitchen is completely clean now." },
      { text: "Vannet i innsjøen er *rent*.", translation: "The water in the lake is clean." },
      { text: "Hun liker et *rent* hjem.", translation: "She likes a clean home." }
    ],
    414: [
      { text: "Skoene mine er veldig *skitne*.", translation: "My shoes are very dirty." },
      { text: "Gulvet var *skittent* etter festen.", translation: "The floor was dirty after the party." },
      { text: "Han hadde *skitne* hender fra hagearbeidet.", translation: "He had dirty hands from gardening." }
    ],
    415: [
      { text: "Filmen var veldig *morsom*.", translation: "The movie was very funny." },
      { text: "Han forteller alltid *morsomme* historier.", translation: "He always tells funny stories." },
      { text: "Det var et *morsomt* spill.", translation: "It was a funny game." }
    ],
    416: [
      { text: "*Veien* var full av biler.", translation: "The road was full of cars." },
      { text: "Vi kjørte på en smal *vei*.", translation: "We drove on a narrow road." },
      { text: "Hvilken *vei* skal vi ta?", translation: "Which road should we take?" }
    ],
    417: [
      { text: "Vi kjørte over *broen* til byen.", translation: "We drove over the bridge to the city." },
      { text: "*Broen* er veldig gammel.", translation: "The bridge is very old." },
      { text: "Det er en fin utsikt fra *broen*.", translation: "There's a nice view from the bridge." }
    ],
    418: [
      { text: "Vi tok en *taxi* til flyplassen.", translation: "We took a taxi to the airport." },
      { text: "*Taxien* kom raskt.", translation: "The taxi arrived quickly." },
      { text: "Kan du ringe etter en *taxi*?", translation: "Can you call for a taxi?" }
    ],
    419: [
      { text: "Min *bagasje* ble borte på flyplassen.", translation: "My luggage got lost at the airport." },
      { text: "Vi pakket *bagasjen* kvelden før.", translation: "We packed the luggage the evening before." },
      { text: "*Bagasjen* var for tung.", translation: "The luggage was too heavy." }
    ],
    420: [
      { text: "Husk å ta med *passet* ditt.", translation: "Remember to bring your passport." },
      { text: "Jeg mistet *passet* mitt i fjor.", translation: "I lost my passport last year." },
      { text: "*Passet* mitt går ut neste år.", translation: "My passport expires next year." }
    ],
    421: [
      { text: "*Flyreisen* var lang og trøtt.", translation: "The flight was long and tiring." },
      { text: "Vi booket en *flyreise* til Roma.", translation: "We booked a flight to Rome." },
      { text: "*Flyreisen* ble forsinket på grunn av været.", translation: "The flight was delayed because of the weather." }
    ],
    422: [
      { text: "Er dette *setet* ledig?", translation: "Is this seat free?" },
      { text: "Jeg satt i et *sete* ved vinduet.", translation: "I sat in a seat by the window." },
      { text: "*Setene* på flyet var trange.", translation: "The seats on the plane were cramped." }
    ],
    423: [
      { text: "*Sjåføren* kjørte veldig forsiktig.", translation: "The driver drove very carefully." },
      { text: "Han jobber som *sjåfør* for et firma.", translation: "He works as a driver for a company." },
      { text: "Vi takket *sjåføren* da vi gikk av.", translation: "We thanked the driver when we got off." }
    ],
    424: [
      { text: "Det var mye *trafikk* i morges.", translation: "There was a lot of traffic this morning." },
      { text: "*Trafikken* sto helt stille.", translation: "The traffic was completely still." },
      { text: "Vi kom for sent på grunn av *trafikken*.", translation: "We were late because of the traffic." }
    ],
    425: [
      { text: "*Reisen* til Norge tok ti timer.", translation: "The journey to Norway took ten hours." },
      { text: "Vi planlegger en lang *reise* neste år.", translation: "We're planning a long journey next year." },
      { text: "*Reisen* var full av eventyr.", translation: "The journey was full of adventures." }
    ],
    426: [
      { text: "Kan jeg låne *pennen* din?", translation: "Can I borrow your pen?" },
      { text: "*Pennen* min sluttet å skrive.", translation: "My pen stopped writing." },
      { text: "Hun skrev brevet med en blå *penn*.", translation: "She wrote the letter with a blue pen." }
    ],
    427: [
      { text: "Jeg tegner alltid med *blyant*.", translation: "I always draw with a pencil." },
      { text: "*Blyanten* min trenger spissing.", translation: "My pencil needs sharpening." },
      { text: "Kan jeg få låne en *blyant*?", translation: "Can I borrow a pencil?" }
    ],
    428: [
      { text: "Kan du gi meg et ark *papir*?", translation: "Can you give me a piece of paper?" },
      { text: "*Papiret* var fullt av notater.", translation: "The paper was full of notes." },
      { text: "Vi trenger mer *papir* til skriveren.", translation: "We need more paper for the printer." }
    ],
    429: [
      { text: "Jeg skriver alltid i *notatboken* min.", translation: "I always write in my notebook." },
      { text: "*Notatboken* var full av tegninger.", translation: "The notebook was full of drawings." },
      { text: "Hun kjøpte en ny *notatbok* til skolen.", translation: "She bought a new notebook for school." }
    ],
    430: [
      { text: "Boken ligger på *skrivebordet*.", translation: "The book is on the desk." },
      { text: "*Skrivebordet* mitt er alltid rotete.", translation: "My desk is always messy." },
      { text: "Vi kjøpte et nytt *skrivebord* til kontoret.", translation: "We bought a new desk for the office." }
    ],
    431: [
      { text: "Vi har et *møte* klokka ti.", translation: "We have a meeting at ten." },
      { text: "*Møtet* varte i to timer.", translation: "The meeting lasted two hours." },
      { text: "Hun forberedte seg til *møtet* i går kveld.", translation: "She prepared for the meeting last night." }
    ],
    432: [
      { text: "Jeg sendte deg en *e-post* i går.", translation: "I sent you an email yesterday." },
      { text: "Har du sjekket *e-posten* din i dag?", translation: "Have you checked your email today?" },
      { text: "Vi kommuniserer mest via *e-post*.", translation: "We communicate mostly via email." }
    ],
    433: [
      { text: "Min *sjef* er veldig hyggelig.", translation: "My boss is very nice." },
      { text: "*Sjefen* ga oss fri i dag.", translation: "The boss gave us the day off." },
      { text: "Hun ble *sjef* for avdelingen i fjor.", translation: "She became boss of the department last year." }
    ],
    434: [
      { text: "Jeg får *lønn* hver måned.", translation: "I get paid a salary every month." },
      { text: "*Lønnen* hans økte i år.", translation: "His salary increased this year." },
      { text: "Vi diskuterte *lønnen* min med sjefen.", translation: "We discussed my salary with the boss." }
    ],
    435: [
      { text: "Han jobber i et stort *firma*.", translation: "He works at a big company." },
      { text: "*Firmaet* ansatte ti nye folk.", translation: "The company hired ten new people." },
      { text: "Vi startet et eget *firma* i fjor.", translation: "We started our own company last year." }
    ],
    436: [
      { text: "Hun brakk *armen* i går.", translation: "She broke her arm yesterday." },
      { text: "Han holdt barnet i *armene*.", translation: "He held the child in his arms." },
      { text: "Jeg har vondt i *armen*.", translation: "My arm hurts." }
    ],
    437: [
      { text: "Han skadet *beinet* sitt i fotball.", translation: "He injured his leg in football." },
      { text: "Hunden har fire *bein*.", translation: "The dog has four legs." },
      { text: "Jeg har vondt i *beinet* etter løpeturen.", translation: "My leg hurts after the run." }
    ],
    438: [
      { text: "Hun kuttet seg i *fingeren*.", translation: "She cut her finger." },
      { text: "Han pekte med *fingeren* mot huset.", translation: "He pointed with his finger at the house." },
      { text: "Ringen passer på denne *fingeren*.", translation: "The ring fits on this finger." }
    ],
    439: [
      { text: "Jeg har vondt i *ryggen* i dag.", translation: "My back hurts today." },
      { text: "Han bar sekken på *ryggen*.", translation: "He carried the backpack on his back." },
      { text: "Hun ligger på *ryggen* og hviler.", translation: "She's lying on her back resting." }
    ],
    440: [
      { text: "*Hjertet* hennes banket fort.", translation: "Her heart beat fast." },
      { text: "Han har et godt *hjerte*.", translation: "He has a good heart." },
      { text: "Legen lyttet til *hjertet* mitt.", translation: "The doctor listened to my heart." }
    ],
    441: [
      { text: "Ta på deg *frakken*, det er kaldt ute.", translation: "Put on your coat, it's cold outside." },
      { text: "*Frakken* hennes var lang og svart.", translation: "Her coat was long and black." },
      { text: "Jeg kjøpte en ny *frakk* til vinteren.", translation: "I bought a new coat for winter." }
    ],
    442: [
      { text: "Hun har på seg et fint *skjørt*.", translation: "She's wearing a nice skirt." },
      { text: "*Skjørtet* var rødt og kort.", translation: "The skirt was red and short." },
      { text: "Jeg kjøpte et nytt *skjørt* i går.", translation: "I bought a new skirt yesterday." }
    ],
    443: [
      { text: "Jeg finner bare én *sokk*.", translation: "I can only find one sock." },
      { text: "*Sokkene* mine er alle forskjellige.", translation: "My socks are all different." },
      { text: "Han mistet en *sokk* i vaskemaskinen.", translation: "He lost a sock in the washing machine." }
    ],
    444: [
      { text: "Ta på deg *hanskene*, det er kaldt.", translation: "Put on your gloves, it's cold." },
      { text: "Jeg mistet en *hanske* i går.", translation: "I lost a glove yesterday." },
      { text: "*Hanskene* hennes var laget av ull.", translation: "Her gloves were made of wool." }
    ],
    445: [
      { text: "Hun hadde på seg et varmt *skjerf*.", translation: "She wore a warm scarf." },
      { text: "*Skjerfet* var blått og mykt.", translation: "The scarf was blue and soft." },
      { text: "Jeg fikk et *skjerf* i gave til jul.", translation: "I got a scarf as a gift for Christmas." }
    ],
    446: [
      { text: "Jeg må ta *medisinen* min hver dag.", translation: "I have to take my medicine every day." },
      { text: "*Medisinen* hjalp mot hodepinen.", translation: "The medicine helped with the headache." },
      { text: "Legen skrev ut *medisin* til meg.", translation: "The doctor prescribed medicine for me." }
    ],
    447: [
      { text: "Barnet har høy *feber* i dag.", translation: "The child has a high fever today." },
      { text: "*Feberen* gikk ned etter medisinen.", translation: "The fever went down after the medicine." },
      { text: "Hun ble hjemme på grunn av *feber*.", translation: "She stayed home because of a fever." }
    ],
    448: [
      { text: "Jeg kjenner *smerte* i ryggen.", translation: "I feel pain in my back." },
      { text: "*Smerten* forsvant etter hvile.", translation: "The pain disappeared after rest." },
      { text: "Hun hadde sterke *smerter* i magen.", translation: "She had strong pains in her stomach." }
    ],
    449: [
      { text: "Han har hatt *hoste* i en uke.", translation: "He has had a cough for a week." },
      { text: "*Hosten* hennes ble verre om natten.", translation: "Her cough got worse at night." },
      { text: "Jeg tok medisin mot *hosten*.", translation: "I took medicine for the cough." }
    ],
    450: [
      { text: "Legen tok en prøve av *blodet* mitt.", translation: "The doctor took a sample of my blood." },
      { text: "*Blodet* rant fra kuttet.", translation: "The blood flowed from the cut." },
      { text: "Han donerte *blod* i går.", translation: "He donated blood yesterday." }
    ],
    451: [
      { text: "Jeg betaler alltid med *kontanter*.", translation: "I always pay with cash." },
      { text: "Har du *kontanter* på deg?", translation: "Do you have cash on you?" },
      { text: "Butikken tar ikke imot *kontanter* lenger.", translation: "The shop no longer accepts cash." }
    ],
    452: [
      { text: "Jeg betalte med *kredittkort*.", translation: "I paid with credit card." },
      { text: "*Kredittkortet* mitt ble avvist.", translation: "My credit card was declined." },
      { text: "Kan jeg bruke *kredittkort* her?", translation: "Can I use a credit card here?" }
    ],
    453: [
      { text: "Vi fikk *rabatt* på hotellet.", translation: "We got a discount on the hotel." },
      { text: "*Rabatten* var tjue prosent.", translation: "The discount was twenty percent." },
      { text: "Butikken ga *rabatt* til studenter.", translation: "The shop gave a discount to students." }
    ],
    454: [
      { text: "Han er en trofast *kunde*.", translation: "He's a loyal customer." },
      { text: "*Kunden* klagde på prisen.", translation: "The customer complained about the price." },
      { text: "Vi har mange nye *kunder* i år.", translation: "We have many new customers this year." }
    ],
    455: [
      { text: "Hun ga meg en fin *gave*.", translation: "She gave me a nice gift." },
      { text: "*Gaven* var pakket inn i rødt papir.", translation: "The gift was wrapped in red paper." },
      { text: "Vi kjøpte en *gave* til bursdagen hans.", translation: "We bought a gift for his birthday." }
    ],
    456: [
      { text: "Jeg elsker å høre på *musikk*.", translation: "I love listening to music." },
      { text: "*Musikken* på festen var fantastisk.", translation: "The music at the party was fantastic." },
      { text: "Hun spiller klassisk *musikk*.", translation: "She plays classical music." }
    ],
    457: [
      { text: "Denne *sangen* er min favoritt.", translation: "This song is my favorite." },
      { text: "Vi sang en gammel *sang* sammen.", translation: "We sang an old song together." },
      { text: "*Sangen* handler om kjærlighet.", translation: "The song is about love." }
    ],
    458: [
      { text: "Vi så en spennende *film* i går.", translation: "We watched an exciting film yesterday." },
      { text: "*Filmen* varte i to timer.", translation: "The film lasted two hours." },
      { text: "Hvilken *film* vil du se i kveld?", translation: "Which film do you want to watch tonight?" }
    ],
    459: [
      { text: "Barna spiller et morsomt *spill*.", translation: "The children are playing a fun game." },
      { text: "*Spillet* varte hele kvelden.", translation: "The game lasted all evening." },
      { text: "Vi kjøpte et nytt *spill* til bursdagen hans.", translation: "We bought a new game for his birthday." }
    ],
    460: [
      { text: "Vi skal ha en *fest* på lørdag.", translation: "We're having a party on Saturday." },
      { text: "*Festen* var veldig hyggelig.", translation: "The party was very nice." },
      { text: "Hun inviterte alle vennene sine til *festen*.", translation: "She invited all her friends to the party." }
    ],
    461: [
      { text: "Han spiller *fotball* hver helg.", translation: "He plays football every weekend." },
      { text: "*Fotball* er den mest populære sporten her.", translation: "Football is the most popular sport here." },
      { text: "Gutten drømmer om å bli proff i *fotball*.", translation: "The boy dreams of becoming a professional in football." }
    ],
    462: [
      { text: "Vi spiller *tennis* hver tirsdag.", translation: "We play tennis every Tuesday." },
      { text: "Hun er veldig flink i *tennis*.", translation: "She's very good at tennis." },
      { text: "Han lærte *tennis* som barn.", translation: "He learned tennis as a child." }
    ],
    463: [
      { text: "Han liker all slags *sport*.", translation: "He likes all kinds of sport." },
      { text: "*Sport* er viktig for helsen.", translation: "Sport is important for health." },
      { text: "Hvilken *sport* driver du med?", translation: "What sport do you do?" }
    ],
    464: [
      { text: "Vårt *lag* vant kampen i går.", translation: "Our team won the match yesterday." },
      { text: "Hun spiller for et lokalt *lag*.", translation: "She plays for a local team." },
      { text: "*Laget* trente hver dag før mesterskapet.", translation: "The team trained every day before the championship." }
    ],
    465: [
      { text: "Barnet kastet *ballen* over gjerdet.", translation: "The child threw the ball over the fence." },
      { text: "Vi spilte med en rød *ball*.", translation: "We played with a red ball." },
      { text: "*Ballen* traff vinduet.", translation: "The ball hit the window." }
    ],
    466: [
      { text: "Han spiller *gitar* veldig godt.", translation: "He plays guitar very well." },
      { text: "*Gitaren* min trenger nye strenger.", translation: "My guitar needs new strings." },
      { text: "Hun lærte seg *gitar* i fjor.", translation: "She learned guitar last year." }
    ],
    467: [
      { text: "Hun spiller *piano* hver dag.", translation: "She plays piano every day." },
      { text: "*Pianoet* står i stuen.", translation: "The piano is in the living room." },
      { text: "Han øver på *piano* etter skolen.", translation: "He practices piano after school." }
    ],
    468: [
      { text: "Kan du ta et *bilde* av oss?", translation: "Can you take a photo of us?" },
      { text: "*Bildet* var veldig fint.", translation: "The photo was very nice." },
      { text: "Vi tok mange *bilder* på turen.", translation: "We took many photos on the trip." }
    ],
    469: [
      { text: "Min *hobby* er å male.", translation: "My hobby is painting." },
      { text: "Han har mange *hobbyer*.", translation: "He has many hobbies." },
      { text: "Hva er *hobbyen* din?", translation: "What's your hobby?" }
    ],
    470: [
      { text: "Vi drar på *ferie* i sommer.", translation: "We're going on holiday this summer." },
      { text: "*Ferien* var altfor kort.", translation: "The holiday was far too short." },
      { text: "Hvor skal du på *ferie* i år?", translation: "Where are you going on holiday this year?" }
    ],
    471: [
      { text: "Jeg bruker *internett* hver dag.", translation: "I use the internet every day." },
      { text: "*Internettet* var nede i går.", translation: "The internet was down yesterday." },
      { text: "Vi sjekket prisen på *internett*.", translation: "We checked the price on the internet." }
    ],
    472: [
      { text: "Denne *nettsiden* er veldig nyttig.", translation: "This website is very useful." },
      { text: "Vi laget en ny *nettside* for firmaet.", translation: "We made a new website for the company." },
      { text: "*Nettsiden* var lett å bruke.", translation: "The website was easy to use." }
    ],
    473: [
      { text: "Jeg har glemt *passordet* mitt.", translation: "I've forgotten my password." },
      { text: "*Passordet* må ha minst åtte tegn.", translation: "The password must have at least eight characters." },
      { text: "Ikke del *passordet* ditt med andre.", translation: "Don't share your password with others." }
    ],
    474: [
      { text: "*Skjermen* min er sprukket.", translation: "My screen is cracked." },
      { text: "Vi kjøpte en ny *skjerm* til datamaskinen.", translation: "We bought a new screen for the computer." },
      { text: "Teksten på *skjermen* var for liten.", translation: "The text on the screen was too small." }
    ],
    475: [
      { text: "*Tastaturet* mitt slutter å virke.", translation: "My keyboard is stopping working." },
      { text: "Han skrev raskt på *tastaturet*.", translation: "He typed quickly on the keyboard." },
      { text: "Vi kjøpte et nytt *tastatur* i går.", translation: "We bought a new keyboard yesterday." }
    ],
    476: [
      { text: "Jeg fikk en *melding* fra henne i dag.", translation: "I got a message from her today." },
      { text: "Kan du sende meg en *melding*?", translation: "Can you send me a message?" },
      { text: "*Meldingen* var kort men hyggelig.", translation: "The message was short but nice." }
    ],
    477: [
      { text: "Jeg ser på *nyhetene* hver kveld.", translation: "I watch the news every evening." },
      { text: "*Nyhetene* i dag var triste.", translation: "The news today was sad." },
      { text: "Har du hørt *nyhetene*?", translation: "Have you heard the news?" }
    ],
    478: [
      { text: "Vi ser på *tv* om kvelden.", translation: "We watch TV in the evening." },
      { text: "*Tv-en* vår er ganske gammel.", translation: "Our TV is quite old." },
      { text: "Kan du skru av *tv-en*?", translation: "Can you turn off the TV?" }
    ],
    479: [
      { text: "Jeg hører på *radio* i bilen.", translation: "I listen to the radio in the car." },
      { text: "*Radioen* spilte musikk hele dagen.", translation: "The radio played music all day." },
      { text: "Han kjøpte en gammel *radio* på loppemarkedet.", translation: "He bought an old radio at the flea market." }
    ],
    480: [
      { text: "Hun kjøpte et nytt *kamera* i fjor.", translation: "She bought a new camera last year." },
      { text: "*Kameraet* mitt tar fine bilder.", translation: "My camera takes nice pictures." },
      { text: "Han glemte *kameraet* hjemme.", translation: "He forgot the camera at home." }
    ],
    481: [
      { text: "Jeg liker *også* kaffe.", translation: "I also like coffee." },
      { text: "Hun kommer *også* i kveld.", translation: "She's also coming tonight." },
      { text: "Vi må *også* huske å kjøpe brød.", translation: "We also need to remember to buy bread." }
    ],
    482: [
      { text: "Jeg har *bare* fem minutter.", translation: "I only have five minutes." },
      { text: "Det kostet *bare* hundre kroner.", translation: "It only cost a hundred kroner." },
      { text: "Hun spiste *bare* litt av maten.", translation: "She only ate a little of the food." }
    ],
    483: [
      { text: "Jeg er *veldig* glad i dag.", translation: "I'm very happy today." },
      { text: "Det var *veldig* kaldt i går.", translation: "It was very cold yesterday." },
      { text: "Hun er *veldig* flink i matte.", translation: "She's very good at math." }
    ],
    484: [
      { text: "*Kanskje* vi kan møtes i morgen.", translation: "Maybe we can meet tomorrow." },
      { text: "Hun kommer *kanskje* på festen.", translation: "She might come to the party." },
      { text: "*Kanskje* det blir sol i morgen.", translation: "Maybe it'll be sunny tomorrow." }
    ],
    485: [
      { text: "Jeg har *allerede* spist.", translation: "I've already eaten." },
      { text: "Er du *allerede* ferdig?", translation: "Are you already done?" },
      { text: "Hun har *allerede* dratt hjem.", translation: "She has already gone home." }
    ],
    486: [
      { text: "Vi starter det nye året i *januar*.", translation: "We start the new year in January." },
      { text: "Det er kaldt i *januar*.", translation: "It's cold in January." },
      { text: "Bursdagen min er i *januar*.", translation: "My birthday is in January." }
    ],
    487: [
      { text: "*Februar* er den korteste måneden.", translation: "February is the shortest month." },
      { text: "Vi drar til fjells i *februar*.", translation: "We're going to the mountains in February." },
      { text: "Skolen har vinterferie i *februar*.", translation: "School has winter break in February." }
    ],
    488: [
      { text: "Våren begynner i *mars*.", translation: "Spring begins in March." },
      { text: "Hun ble født i *mars*.", translation: "She was born in March." },
      { text: "Vi planlegger en reise i *mars*.", translation: "We're planning a trip in March." }
    ],
    489: [
      { text: "Det regner mye i *april*.", translation: "It rains a lot in April." },
      { text: "Påsken er ofte i *april*.", translation: "Easter is often in April." },
      { text: "Vi feirer bursdagen hans i *april*.", translation: "We celebrate his birthday in April." }
    ],
    490: [
      { text: "*Mai* er en av de fineste månedene.", translation: "May is one of the nicest months." },
      { text: "Nasjonaldagen er i *mai*.", translation: "National Day is in May." },
      { text: "Blomstene blomstrer i *mai*.", translation: "The flowers bloom in May." }
    ],
    491: [
      { text: "Skolen slutter i *juni*.", translation: "School ends in June." },
      { text: "Sommeren begynner i *juni*.", translation: "Summer begins in June." },
      { text: "Vi gifter oss i *juni*.", translation: "We're getting married in June." }
    ],
    492: [
      { text: "*Juli* er den varmeste måneden.", translation: "July is the hottest month." },
      { text: "Vi drar på ferie i *juli*.", translation: "We're going on holiday in July." },
      { text: "Hun har fri hele *juli*.", translation: "She has time off all of July." }
    ],
    493: [
      { text: "Skolen begynner igjen i *august*.", translation: "School starts again in August." },
      { text: "Vi feirer festivalen i *august*.", translation: "We celebrate the festival in August." },
      { text: "Det er fortsatt varmt i *august*.", translation: "It's still hot in August." }
    ],
    494: [
      { text: "Høsten begynner i *september*.", translation: "Autumn begins in September." },
      { text: "Vi flyttet hit i *september*.", translation: "We moved here in September." },
      { text: "Bladene begynner å falle i *september*.", translation: "The leaves start to fall in September." }
    ],
    495: [
      { text: "Det blir kaldere i *oktober*.", translation: "It gets colder in October." },
      { text: "Vi feirer halloween i slutten av *oktober*.", translation: "We celebrate Halloween at the end of October." },
      { text: "Hun ble født i *oktober*.", translation: "She was born in October." }
    ],
    496: [
      { text: "*November* er ofte grå og våt.", translation: "November is often grey and wet." },
      { text: "Vi tenner lys i *november*.", translation: "We light candles in November." },
      { text: "Det snør noen ganger i *november*.", translation: "It sometimes snows in November." }
    ],
    497: [
      { text: "Vi feirer jul i *desember*.", translation: "We celebrate Christmas in December." },
      { text: "*Desember* er den mørkeste måneden.", translation: "December is the darkest month." },
      { text: "Familien samles i *desember*.", translation: "The family gathers in December." }
    ],
    498: [
      { text: "Hvilken *dato* er det i dag?", translation: "What's the date today?" },
      { text: "Vi satte en *dato* for møtet.", translation: "We set a date for the meeting." },
      { text: "*Datoen* på billetten var feil.", translation: "The date on the ticket was wrong." }
    ],
    499: [
      { text: "Jeg skrev det i *kalenderen* min.", translation: "I wrote it in my calendar." },
      { text: "*Kalenderen* henger på veggen.", translation: "The calendar hangs on the wall." },
      { text: "Sjekk *kalenderen* for ledige dager.", translation: "Check the calendar for free days." }
    ],
    500: [
      { text: "Gratulerer med *bursdagen*!", translation: "Happy birthday!" },
      { text: "Min *bursdag* er i mai.", translation: "My birthday is in May." },
      { text: "Vi feiret *bursdagen* hennes med kake.", translation: "We celebrated her birthday with cake." }
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
    ],
    6: [
      { text: "*Förlåt*, jag kom för sent.", translation: "Sorry, I'm late." },
      { text: "*Förlåt*, jag hörde inte.", translation: "Sorry, I didn't hear." },
      { text: "Han sa *förlåt* för misstaget.", translation: "He said sorry for the mistake." }
    ],
    7: [
      { text: "God *morgon*!", translation: "Good morning!" },
      { text: "Varje *morgon* dricker jag kaffe.", translation: "Every morning I drink coffee." },
      { text: "*Morgonen* var kall och tyst.", translation: "The morning was cold and quiet." }
    ],
    8: [
      { text: "God *kväll*!", translation: "Good evening!" },
      { text: "På *kvällen* läser jag en bok.", translation: "In the evening I read a book." },
      { text: "Vi äter middag på *kvällen*.", translation: "We eat dinner in the evening." }
    ],
    9: [
      { text: "Det är en fin *dag* idag.", translation: "It's a nice day today." },
      { text: "Varje *dag* går jag en promenad.", translation: "Every day I go for a walk." },
      { text: "*Dagen* var lång och tröttsam.", translation: "The day was long and tiring." }
    ],
    10: [
      { text: "God *natt*!", translation: "Good night!" },
      { text: "Jag sover gott på *natten*.", translation: "I sleep well at night." },
      { text: "*Natten* var full av stjärnor.", translation: "The night was full of stars." }
    ],
    11: [
      { text: "Kan jag få ett glas *vatten*?", translation: "Can I have a glass of water?" },
      { text: "*Vattnet* är kallt och friskt.", translation: "The water is cold and fresh." },
      { text: "Han dricker mycket *vatten* varje dag.", translation: "He drinks a lot of water every day." }
    ],
    12: [
      { text: "*Maten* var väldigt god.", translation: "The food was very good." },
      { text: "Vi äter *mat* klockan sju.", translation: "We eat food at seven." },
      { text: "*Mat* är viktigt för hälsan.", translation: "Food is important for health." }
    ],
    13: [
      { text: "Jag dricker *kaffe* varje morgon.", translation: "I drink coffee every morning." },
      { text: "En kopp *kaffe*, tack.", translation: "A cup of coffee, please." },
      { text: "*Kaffet* är varmt och starkt.", translation: "The coffee is hot and strong." }
    ],
    14: [
      { text: "Vi köper *bröd* på bageriet.", translation: "We buy bread at the bakery." },
      { text: "*Brödet* är färskt och mjukt.", translation: "The bread is fresh and soft." },
      { text: "Han äter *bröd* till frukost.", translation: "He eats bread for breakfast." }
    ],
    15: [
      { text: "De bor i ett stort *hus*.", translation: "They live in a big house." },
      { text: "Vårt *hus* har tre våningar.", translation: "Our house has three floors." },
      { text: "*Huset* ligger vid havet.", translation: "The house is by the sea." }
    ],
    16: [
      { text: "Han kör en röd *bil*.", translation: "He drives a red car." },
      { text: "*Bilen* är parkerad utanför.", translation: "The car is parked outside." },
      { text: "Vi ska köpa en ny *bil*.", translation: "We're going to buy a new car." }
    ],
    17: [
      { text: "Jag läser en spännande *bok*.", translation: "I'm reading an exciting book." },
      { text: "*Boken* ligger på bordet.", translation: "The book is on the table." },
      { text: "Hon gillar *böcker* om äventyr.", translation: "She likes books about adventures." }
    ],
    18: [
      { text: "Han är min bästa *vän*.", translation: "He's my best friend." },
      { text: "Vi träffar *vänner* på helgen.", translation: "We meet friends on the weekend." },
      { text: "*Vännen* min bor bredvid.", translation: "My friend lives next door." }
    ],
    19: [
      { text: "Min *familj* är stor och trevlig.", translation: "My family is big and nice." },
      { text: "Vi samlas som en *familj* varje jul.", translation: "We gather as a family every Christmas." },
      { text: "*Familjen* äter middag tillsammans.", translation: "The family eats dinner together." }
    ],
    20: [
      { text: "Jag går till *skolan* varje dag.", translation: "I go to school every day." },
      { text: "*Skolan* ligger nära mitt hus.", translation: "The school is near my house." },
      { text: "Hon jobbar på en *skola*.", translation: "She works at a school." }
    ],
    21: [
      { text: "En *man* gick förbi oss.", translation: "A man walked past us." },
      { text: "*Mannen* vid fönstret är trevlig.", translation: "The man by the window is nice." },
      { text: "Min *man* heter Johan.", translation: "My husband's name is Johan." }
    ],
    22: [
      { text: "En *kvinna* ringde mig idag.", translation: "A woman called me today." },
      { text: "*Kvinnan* var väldigt artig.", translation: "The woman was very polite." },
      { text: "*Kvinnan* som leder företaget är duktig.", translation: "The woman who runs the company is skilled." }
    ],
    23: [
      { text: "Det *barnet* är väldigt snällt.", translation: "That child is very kind." },
      { text: "*Barnet* leker i trädgården.", translation: "The child is playing in the garden." },
      { text: "Vi har tre *barn* hemma.", translation: "We have three children at home." }
    ],
    24: [
      { text: "*Flickan* har rött hår.", translation: "The girl has red hair." },
      { text: "En ung *flicka* satt på bänken.", translation: "A young girl sat on the bench." },
      { text: "Min *flicka* är åtta år gammal.", translation: "My daughter is eight years old." }
    ],
    25: [
      { text: "*Pojken* spelar fotboll.", translation: "The boy plays football." },
      { text: "En liten *pojke* ropade högt.", translation: "A small boy shouted loudly." },
      { text: "Min *pojke* gillar musik.", translation: "My son likes music." }
    ],
    26: [
      { text: "Min *mamma* är lärare.", translation: "My mother is a teacher." },
      { text: "*Mamma* lagar mat varje kväll.", translation: "Mom cooks every evening." },
      { text: "Jag ringer *mamma* ofta.", translation: "I call mom often." }
    ],
    27: [
      { text: "Min *pappa* jobbar som ingenjör.", translation: "My father works as an engineer." },
      { text: "*Pappa* kör oss till skolan.", translation: "Dad drives us to school." },
      { text: "Jag är stolt över *pappa*.", translation: "I'm proud of dad." }
    ],
    28: [
      { text: "Min *syster* är tre år yngre.", translation: "My sister is three years younger." },
      { text: "*Systern* min studerar medicin.", translation: "My sister studies medicine." },
      { text: "Jag och *systern* min gillar att resa.", translation: "My sister and I like to travel." }
    ],
    29: [
      { text: "Min *bror* är längre än mig.", translation: "My brother is taller than me." },
      { text: "*Brodern* min spelar gitarr.", translation: "My brother plays guitar." },
      { text: "Jag och *brodern* min är bra vänner.", translation: "My brother and I are good friends." }
    ],
    30: [
      { text: "Min *mormor* bor på landet.", translation: "My grandmother lives in the countryside." },
      { text: "*Mormor* bakar kakor varje söndag.", translation: "Grandmother bakes cakes every Sunday." },
      { text: "Jag besöker *mormor* ofta.", translation: "I visit grandmother often." }
    ],
    31: [
      { text: "Ett *stort* hus ligger på toppen.", translation: "A big house sits on top." },
      { text: "Han har en *stor* hund.", translation: "He has a big dog." },
      { text: "Staden är väldigt *stor*.", translation: "The city is very big." }
    ],
    32: [
      { text: "Ett *litet* barn leker i parken.", translation: "A small child plays in the park." },
      { text: "Hon har en *liten* hund.", translation: "She has a small dog." },
      { text: "Rummet är ganska *litet*.", translation: "The room is quite small." }
    ],
    33: [
      { text: "Det här är en *bra* bok.", translation: "This is a good book." },
      { text: "Maten smakar väldigt *bra*.", translation: "The food tastes very good." },
      { text: "Vädret är *bra* idag.", translation: "The weather is good today." }
    ],
    34: [
      { text: "Filmen var *dålig* och tråkig.", translation: "The movie was bad and boring." },
      { text: "Han har en *dålig* vana.", translation: "He has a bad habit." },
      { text: "Vädret blir *dåligt* imorgon.", translation: "The weather will be bad tomorrow." }
    ],
    35: [
      { text: "Jag köpte en *ny* telefon.", translation: "I bought a new phone." },
      { text: "Det här är en *ny* bok från biblioteket.", translation: "This is a new book from the library." },
      { text: "Vi flyttar till en *ny* stad.", translation: "We're moving to a new city." }
    ],
    36: [
      { text: "En *gammal* man satt på bänken.", translation: "An old man sat on the bench." },
      { text: "Huset är *gammalt* och vackert.", translation: "The house is old and beautiful." },
      { text: "Hon har en *gammal* bil.", translation: "She has an old car." }
    ],
    37: [
      { text: "*Varmt* kaffe smakar gott på vintern.", translation: "Hot coffee tastes good in winter." },
      { text: "Det är *varmt* i rummet.", translation: "It's warm in the room." },
      { text: "Vi hade en *varm* sommar förra året.", translation: "We had a warm summer last year." }
    ],
    38: [
      { text: "En *kall* vind blåser idag.", translation: "A cold wind is blowing today." },
      { text: "*Kall* mjölk är uppfriskande.", translation: "Cold milk is refreshing." },
      { text: "Det är *kallt* ute ikväll.", translation: "It's cold outside tonight." }
    ],
    39: [
      { text: "Han kör alldeles för *snabbt*.", translation: "He drives way too fast." },
      { text: "Hon är en *snabb* löpare.", translation: "She's a fast runner." },
      { text: "Tåget var väldigt *snabbt*.", translation: "The train was very fast." }
    ],
    40: [
      { text: "*Långsamt* och stadigt vinner loppet.", translation: "Slow and steady wins the race." },
      { text: "Han gick *långsamt* genom parken.", translation: "He walked slowly through the park." },
      { text: "Musiken spelade *långsamt* och mjukt.", translation: "The music played slow and soft." }
    ],
    41: [
      { text: "*Jag* heter Erik.", translation: "My name is Erik." },
      { text: "*Jag* gillar att läsa böcker.", translation: "I like to read books." },
      { text: "*Jag* älskar musik.", translation: "I love music." }
    ],
    42: [
      { text: "*Du* är en bra vän.", translation: "You are a good friend." },
      { text: "Var bor *du*?", translation: "Where do you live?" },
      { text: "Kommer *du* ikväll?", translation: "Are you coming tonight?" }
    ],
    43: [
      { text: "*Han* är lärare på skolan.", translation: "He is a teacher at the school." },
      { text: "*Han* spelar fotboll varje vecka.", translation: "He plays football every week." },
      { text: "Jag såg *han* igår.", translation: "I saw him yesterday." }
    ],
    44: [
      { text: "*Hon* är en duktig musiker.", translation: "She is a skilled musician." },
      { text: "*Hon* jobbar som läkare.", translation: "She works as a doctor." },
      { text: "Jag träffade *hon* i affären.", translation: "I met her at the shop." }
    ],
    45: [
      { text: "*Vi* går på bio ikväll.", translation: "We're going to the movies tonight." },
      { text: "*Vi* bor i samma stad.", translation: "We live in the same city." },
      { text: "*Vi* ska resa till Sverige.", translation: "We're going to travel to Sweden." }
    ],
    46: [
      { text: "Vart ska *ni* ikväll?", translation: "Where are you all going tonight?" },
      { text: "*Ni* är välkomna till festen.", translation: "You're all welcome to the party." },
      { text: "Kommer *ni* tillsammans?", translation: "Are you all coming together?" }
    ],
    47: [
      { text: "*De* är väldigt snälla människor.", translation: "They are very kind people." },
      { text: "*De* kommer imorgon.", translation: "They're coming tomorrow." },
      { text: "Jag gillar *de* väldigt mycket.", translation: "I like them very much." }
    ],
    48: [
      { text: "Det här är *min* bok.", translation: "This is my book." },
      { text: "*Min* vän heter Lars.", translation: "My friend's name is Lars." },
      { text: "Bilen är *min*.", translation: "The car is mine." }
    ],
    49: [
      { text: "Är det här *din* telefon?", translation: "Is this your phone?" },
      { text: "*Din* familj är trevlig.", translation: "Your family is nice." },
      { text: "Jag gillar *din* nya jacka.", translation: "I like your new jacket." }
    ],
    50: [
      { text: "Det här är *vårt* hus.", translation: "This is our house." },
      { text: "*Vår* skola ligger nära centrum.", translation: "Our school is near the center." },
      { text: "Familjen *vår* är stor.", translation: "Our family is big." }
    ],
    51: [
      { text: "Jag vill *vara* lycklig.", translation: "I want to be happy." },
      { text: "Det är skönt att *vara* hemma.", translation: "It's nice to be home." },
      { text: "Han vill *vara* läkare en dag.", translation: "He wants to be a doctor someday." }
    ],
    52: [
      { text: "Jag vill *ha* en kopp te.", translation: "I want to have a cup of tea." },
      { text: "Vi *har* inte mycket tid.", translation: "We don't have much time." },
      { text: "Hon önskar att *ha* en hund.", translation: "She wishes to have a dog." }
    ],
    53: [
      { text: "Jag *går* till skolan varje dag.", translation: "I go to school every day." },
      { text: "Ska vi *gå* en promenad?", translation: "Shall we go for a walk?" },
      { text: "Hon *går* snabbt hem.", translation: "She walks home quickly." }
    ],
    54: [
      { text: "Jag *kommer* snart.", translation: "I'll come soon." },
      { text: "Kan du *komma* hit?", translation: "Can you come here?" },
      { text: "Han *kommer* från Sverige.", translation: "He comes from Sweden." }
    ],
    55: [
      { text: "Vad *gör* du nu?", translation: "What are you doing now?" },
      { text: "Jag *gör* mitt bästa.", translation: "I'm doing my best." },
      { text: "Vi måste *göra* våra läxor.", translation: "We have to do our homework." }
    ],
    56: [
      { text: "Jag *äter* frukost klockan åtta.", translation: "I eat breakfast at eight." },
      { text: "Ska vi *äta* tillsammans ikväll?", translation: "Shall we eat together tonight?" },
      { text: "Hon *äter* aldrig kött.", translation: "She never eats meat." }
    ],
    57: [
      { text: "Jag *dricker* vatten varje dag.", translation: "I drink water every day." },
      { text: "Vad vill du *dricka*?", translation: "What would you like to drink?" },
      { text: "Han *dricker* kaffe utan socker.", translation: "He drinks coffee without sugar." }
    ],
    58: [
      { text: "Jag *läser* en spännande bok.", translation: "I'm reading an exciting book." },
      { text: "Gillar du att *läsa*?", translation: "Do you like to read?" },
      { text: "Hon *läser* tidningen varje morgon.", translation: "She reads the newspaper every morning." }
    ],
    59: [
      { text: "Jag *skriver* ett brev till mormor.", translation: "I'm writing a letter to grandmother." },
      { text: "Kan du *skriva* ditt namn här?", translation: "Can you write your name here?" },
      { text: "Han *skriver* böcker om historia.", translation: "He writes books about history." }
    ],
    60: [
      { text: "Jag *pratar* lite svenska.", translation: "I speak a little Swedish." },
      { text: "Kan du *prata* långsammare?", translation: "Can you speak more slowly?" },
      { text: "Hon *pratar* tre språk.", translation: "She speaks three languages." }
    ],
    61: [
      { text: "Jag har *en* katt.", translation: "I have a cat." },
      { text: "Kan jag få *en* kopp te?", translation: "Can I have a cup of tea?" },
      { text: "Det står *en* bil utanför.", translation: "There's a car outside." }
    ],
    62: [
      { text: "Hon köpte *en* bok igår.", translation: "She bought a book yesterday." },
      { text: "Jag såg *en* flicka på gatan.", translation: "I saw a girl on the street." },
      { text: "Det bor *en* get på gården.", translation: "A goat lives on the farm." }
    ],
    63: [
      { text: "Jag har *ett* hus på landet.", translation: "I have a house in the countryside." },
      { text: "Kan jag få *ett* glas vatten?", translation: "Can I have a glass of water?" },
      { text: "Hon köpte *ett* nytt äpple.", translation: "She bought a new apple." }
    ],
    64: [
      { text: "Bilen är röd. *Den* är ny.", translation: "The car is red. It's new." },
      { text: "Jag gillar den här boken. *Den* är spännande.", translation: "I like this book. It's exciting." },
      { text: "Titta på katten. *Den* sover.", translation: "Look at the cat. It's sleeping." }
    ],
    65: [
      { text: "*Det* regnar ute.", translation: "It's raining outside." },
      { text: "Huset är stort. *Det* har fem rum.", translation: "The house is big. It has five rooms." },
      { text: "*Det* är kallt idag.", translation: "It's cold today." }
    ],
    66: [
      { text: "Jag bor *här* nu.", translation: "I live here now." },
      { text: "*Här* är dina nycklar.", translation: "Here are your keys." },
      { text: "Vänta *här*, snälla.", translation: "Wait here, please." }
    ],
    67: [
      { text: "Boken ligger *där* borta.", translation: "The book is over there." },
      { text: "Vem är *där*?", translation: "Who is there?" },
      { text: "Vi träffades *där* förra året.", translation: "We met there last year." }
    ],
    68: [
      { text: "Jag måste gå *nu*.", translation: "I have to go now." },
      { text: "Vad gör du *nu*?", translation: "What are you doing now?" },
      { text: "*Nu* är det dags att äta.", translation: "Now it's time to eat." }
    ],
    69: [
      { text: "Vi pratas *senare*.", translation: "We'll talk later." },
      { text: "Jag kommer *senare* ikväll.", translation: "I'll come later tonight." },
      { text: "Kan vi göra det *senare*?", translation: "Can we do it later?" }
    ],
    70: [
      { text: "Hon är *alltid* glad.", translation: "She's always happy." },
      { text: "Jag dricker *alltid* kaffe på morgonen.", translation: "I always drink coffee in the morning." },
      { text: "Han kommer *alltid* för sent.", translation: "He always comes late." }
    ],
    71: [
      { text: "Vad ska vi göra *idag*?", translation: "What shall we do today?" },
      { text: "*Idag* är det fint väder.", translation: "Today the weather is nice." },
      { text: "Jag har mycket att göra *idag*.", translation: "I have a lot to do today." }
    ],
    72: [
      { text: "Vi ses *imorgon*!", translation: "See you tomorrow!" },
      { text: "*Imorgon* ska jag resa till Stockholm.", translation: "Tomorrow I'll travel to Stockholm." },
      { text: "Vad händer *imorgon*?", translation: "What's happening tomorrow?" }
    ],
    73: [
      { text: "*Igår* var jag på jobbet.", translation: "Yesterday I was at work." },
      { text: "Vi såg en film *igår*.", translation: "We watched a movie yesterday." },
      { text: "Det regnade mycket *igår*.", translation: "It rained a lot yesterday." }
    ],
    74: [
      { text: "Jag jobbar fem dagar i *veckan*.", translation: "I work five days a week." },
      { text: "Nästa *vecka* ska vi resa.", translation: "Next week we're going to travel." },
      { text: "*Veckan* har varit hektisk.", translation: "The week has been busy." }
    ],
    75: [
      { text: "Vi flyttar nästa *månad*.", translation: "We're moving next month." },
      { text: "Varje *månad* betalar jag hyra.", translation: "Every month I pay rent." },
      { text: "*Månaden* gick fort.", translation: "The month went by quickly." }
    ],
    76: [
      { text: "Han körde en *röd* bil.", translation: "He drove a red car." },
      { text: "Blomman är *röd* och vacker.", translation: "The flower is red and beautiful." },
      { text: "Jag gillar den *röda* tröjan.", translation: "I like the red sweater." }
    ],
    77: [
      { text: "Himlen är *blå* idag.", translation: "The sky is blue today." },
      { text: "Hon har *blå* ögon.", translation: "She has blue eyes." },
      { text: "Jag köpte en *blå* jacka.", translation: "I bought a blue jacket." }
    ],
    78: [
      { text: "Gräset är *grönt* på sommaren.", translation: "The grass is green in summer." },
      { text: "Han har en *grön* bil.", translation: "He has a green car." },
      { text: "Jag gillar den *gröna* skjortan.", translation: "I like the green shirt." }
    ],
    79: [
      { text: "Solen är *gul*.", translation: "The sun is yellow." },
      { text: "Hon har en *gul* klänning.", translation: "She has a yellow dress." },
      { text: "Det *gula* huset är vårt.", translation: "The yellow house is ours." }
    ],
    80: [
      { text: "Katten är helt *svart*.", translation: "The cat is completely black." },
      { text: "Han har en *svart* bil.", translation: "He has a black car." },
      { text: "Jag köpte *svarta* skor.", translation: "I bought black shoes." }
    ],
    81: [
      { text: "Snön är *vit* och kall.", translation: "The snow is white and cold." },
      { text: "Hon har ett *vitt* hus.", translation: "She has a white house." },
      { text: "Han bär en *vit* skjorta.", translation: "He wears a white shirt." }
    ],
    82: [
      { text: "Min hund är *brun*.", translation: "My dog is brown." },
      { text: "Hon har *bruna* ögon.", translation: "She has brown eyes." },
      { text: "Jag köpte ett *brunt* bord.", translation: "I bought a brown table." }
    ],
    83: [
      { text: "Flickan har en *rosa* klänning.", translation: "The girl has a pink dress." },
      { text: "Blommorna är *rosa*.", translation: "The flowers are pink." },
      { text: "Hon målade rummet *rosa*.", translation: "She painted the room pink." }
    ],
    84: [
      { text: "Solnedgången var *orange*.", translation: "The sunset was orange." },
      { text: "Han har en *orange* jacka.", translation: "He has an orange jacket." },
      { text: "Apelsinen är *orange*.", translation: "The orange is orange." }
    ],
    85: [
      { text: "Blomman är *lila*.", translation: "The flower is purple." },
      { text: "Hon har en *lila* väska.", translation: "She has a purple bag." },
      { text: "Himlen blev *lila* på kvällen.", translation: "The sky turned purple in the evening." }
    ],
    86: [
      { text: "Jag har bara *ett* syskon.", translation: "I only have one sibling." },
      { text: "Kan jag få *ett* kaffe?", translation: "Can I have one coffee?" },
      { text: "Bara *ett* barn kom.", translation: "Only one child came." }
    ],
    87: [
      { text: "Jag har *två* syskon.", translation: "I have two siblings." },
      { text: "Klockan är *två*.", translation: "It's two o'clock." },
      { text: "Huset har *två* våningar.", translation: "The house has two floors." }
    ],
    88: [
      { text: "Jag har *tre* barn.", translation: "I have three children." },
      { text: "Klockan är *tre*.", translation: "It's three o'clock." },
      { text: "Vi väntade i *tre* timmar.", translation: "We waited for three hours." }
    ],
    89: [
      { text: "Bordet har *fyra* stolar.", translation: "The table has four chairs." },
      { text: "Klockan är *fyra*.", translation: "It's four o'clock." },
      { text: "Vi är *fyra* i familjen.", translation: "There are four of us in the family." }
    ],
    90: [
      { text: "Jag har *fem* vänner här.", translation: "I have five friends here." },
      { text: "Klockan är *fem*.", translation: "It's five o'clock." },
      { text: "Huset har *fem* rum.", translation: "The house has five rooms." }
    ],
    91: [
      { text: "Klockan är *sex*.", translation: "It's six o'clock." },
      { text: "Vi är *sex* personer.", translation: "We are six people." },
      { text: "Han sover *sex* timmar varje natt.", translation: "He sleeps six hours every night." }
    ],
    92: [
      { text: "Klockan är *sju*.", translation: "It's seven o'clock." },
      { text: "Hon har *sju* böcker på bordet.", translation: "She has seven books on the table." },
      { text: "Han åt *sju* jordgubbar.", translation: "He ate seven strawberries." }
    ],
    93: [
      { text: "Klockan är *åtta*.", translation: "It's eight o'clock." },
      { text: "Jag jobbar *åtta* timmar om dagen.", translation: "I work eight hours a day." },
      { text: "Vi var *åtta* personer på festen.", translation: "There were eight of us at the party." }
    ],
    94: [
      { text: "Klockan är *nio*.", translation: "It's nine o'clock." },
      { text: "Hon är *nio* år gammal.", translation: "She's nine years old." },
      { text: "Vi väntade i *nio* minuter.", translation: "We waited nine minutes." }
    ],
    95: [
      { text: "Klockan är *tio*.", translation: "It's ten o'clock." },
      { text: "Han har *tio* fingrar.", translation: "He has ten fingers." },
      { text: "Vi bodde där i *tio* år.", translation: "We lived there for ten years." }
    ],
    96: [
      { text: "*Var* bor du?", translation: "Where do you live?" },
      { text: "Vet du *var* boken är?", translation: "Do you know where the book is?" },
      { text: "*Var* ska vi träffas?", translation: "Where shall we meet?" }
    ],
    97: [
      { text: "*Vad* heter du?", translation: "What's your name?" },
      { text: "*Vad* gör du nu?", translation: "What are you doing now?" },
      { text: "Jag vet inte *vad* jag ska säga.", translation: "I don't know what to say." }
    ],
    98: [
      { text: "*Vem* är det?", translation: "Who is that?" },
      { text: "*Vem* kommer ikväll?", translation: "Who's coming tonight?" },
      { text: "Vet du *vem* hon är?", translation: "Do you know who she is?" }
    ],
    99: [
      { text: "*När* kommer du?", translation: "When are you coming?" },
      { text: "Jag vet inte *när* tåget går.", translation: "I don't know when the train leaves." },
      { text: "*När* är din födelsedag?", translation: "When is your birthday?" }
    ],
    100: [
      { text: "*Varför* är du sen?", translation: "Why are you late?" },
      { text: "*Varför* gillar du inte fisk?", translation: "Why don't you like fish?" },
      { text: "Jag vet inte *varför* han gick.", translation: "I don't know why he left." }
    ],
    101: [
      { text: "*Hur* mår du?", translation: "How are you?" },
      { text: "*Hur* lagar man den här rätten?", translation: "How do you make this dish?" },
      { text: "Jag vet inte *hur* jag ska svara.", translation: "I don't know how to answer." }
    ],
    102: [
      { text: "*Vilken* bok läser du?", translation: "Which book are you reading?" },
      { text: "*Vilken* dag passar bäst?", translation: "Which day suits best?" },
      { text: "Vet du *vilken* väg vi ska ta?", translation: "Do you know which way we should go?" }
    ],
    103: [
      { text: "*Hur mycket* kostar det här?", translation: "How much does this cost?" },
      { text: "*Hur mycket* tid har vi?", translation: "How much time do we have?" },
      { text: "Jag vet inte *hur mycket* det väger.", translation: "I don't know how much it weighs." }
    ],
    104: [
      { text: "Jag är glad *för att* det är fredag.", translation: "I'm happy because it's Friday." },
      { text: "Hon kom sent *för att* tåget var försenat.", translation: "She came late because the train was delayed." },
      { text: "Vi stannade hemma *för att* det regnade.", translation: "We stayed home because it rained." }
    ],
    105: [
      { text: "Jag vill gå, *men* jag är trött.", translation: "I want to go, but I'm tired." },
      { text: "Det är dyrt, *men* värt det.", translation: "It's expensive, but worth it." },
      { text: "Hon ringde, *men* jag svarade inte.", translation: "She called, but I didn't answer." }
    ],
    106: [
      { text: "Jag gillar te *och* kaffe.", translation: "I like tea and coffee." },
      { text: "Han är trevlig *och* smart.", translation: "He's nice and smart." },
      { text: "Vi köpte bröd, mjölk *och* ägg.", translation: "We bought bread, milk and eggs." }
    ],
    107: [
      { text: "Vill du ha te *eller* kaffe?", translation: "Would you like tea or coffee?" },
      { text: "Ska vi gå *eller* köra?", translation: "Shall we walk or drive?" },
      { text: "Kommer du idag *eller* imorgon?", translation: "Are you coming today or tomorrow?" }
    ],
    108: [
      { text: "Jag dricker kaffe *med* mjölk.", translation: "I drink coffee with milk." },
      { text: "Hon bor *med* sin familj.", translation: "She lives with her family." },
      { text: "Han pratade *med* läraren.", translation: "He spoke with the teacher." }
    ],
    109: [
      { text: "Jag dricker te *utan* socker.", translation: "I drink tea without sugar." },
      { text: "Han gick *utan* att säga något.", translation: "He left without saying anything." },
      { text: "Vi klarade det *utan* hjälp.", translation: "We managed it without help." }
    ],
    110: [
      { text: "Jag kommer *från* Sverige.", translation: "I come from Sweden." },
      { text: "Brevet är *från* min syster.", translation: "The letter is from my sister." },
      { text: "Vi reste *från* Stockholm till Göteborg.", translation: "We travelled from Stockholm to Gothenburg." }
    ],
    111: [
      { text: "Jag ska *till* skolan.", translation: "I'm going to school." },
      { text: "Hon gav en present *till* mig.", translation: "She gave a gift to me." },
      { text: "Vi reste *till* Spanien i somras.", translation: "We travelled to Spain last summer." }
    ],
    112: [
      { text: "Boken ligger *i* lådan.", translation: "The book is in the drawer." },
      { text: "Jag bor *i* Stockholm.", translation: "I live in Stockholm." },
      { text: "Han är *i* trädgården.", translation: "He is in the garden." }
    ],
    113: [
      { text: "Boken ligger *på* bordet.", translation: "The book is on the table." },
      { text: "Tavlan hänger *på* väggen.", translation: "The picture hangs on the wall." },
      { text: "Vi träffas *på* caféet.", translation: "We're meeting at the café." }
    ],
    114: [
      { text: "Katten sover *under* bordet.", translation: "The cat is sleeping under the table." },
      { text: "Nycklarna ligger *under* mattan.", translation: "The keys are under the mat." },
      { text: "Vi satt *under* ett träd.", translation: "We sat under a tree." }
    ],
    115: [
      { text: "Lampan hänger *över* bordet.", translation: "The lamp hangs above the table." },
      { text: "Planet flög *över* berget.", translation: "The plane flew over the mountain." },
      { text: "Hon bor *över* affären.", translation: "She lives above the shop." }
    ],
    116: [
      { text: "Stockholm är en fin *stad*.", translation: "Stockholm is a nice city." },
      { text: "Vi bor i en liten *stad*.", translation: "We live in a small city." },
      { text: "*Staden* har många gamla byggnader.", translation: "The city has many old buildings." }
    ],
    117: [
      { text: "Vi bor på samma *gata*.", translation: "We live on the same street." },
      { text: "*Gatan* var full av folk.", translation: "The street was full of people." },
      { text: "Affären ligger på den här *gatan*.", translation: "The shop is on this street." }
    ],
    118: [
      { text: "Jag ska till *affären* efter mjölk.", translation: "I'm going to the shop for milk." },
      { text: "*Affären* öppnar klockan nio.", translation: "The shop opens at nine." },
      { text: "Det finns en ny *affär* i centrum.", translation: "There's a new shop in the center." }
    ],
    119: [
      { text: "Vi köper grönsaker på *marknaden*.", translation: "We buy vegetables at the market." },
      { text: "*Marknaden* är öppen på lördagar.", translation: "The market is open on Saturdays." },
      { text: "Det var mycket folk på *marknaden*.", translation: "There were a lot of people at the market." }
    ],
    120: [
      { text: "Vi tar en promenad i *parken*.", translation: "We're taking a walk in the park." },
      { text: "Barnen leker i *parken*.", translation: "The children are playing in the park." },
      { text: "Det finns en stor *park* nära huset.", translation: "There's a big park near the house." }
    ],
    121: [
      { text: "Det här *rummet* är väldigt ljust.", translation: "This room is very bright." },
      { text: "Huset har fem *rum*.", translation: "The house has five rooms." },
      { text: "Jag städar mitt *rum*.", translation: "I'm cleaning my room." }
    ],
    122: [
      { text: "Vi lagar mat i *köket*.", translation: "We cook in the kitchen." },
      { text: "*Köket* är stort och ljust.", translation: "The kitchen is big and bright." },
      { text: "Hon sitter i *köket* och dricker kaffe.", translation: "She's sitting in the kitchen drinking coffee." }
    ],
    123: [
      { text: "*Badrummet* är bredvid sovrummet.", translation: "The bathroom is next to the bedroom." },
      { text: "Jag duschar i *badrummet* varje morgon.", translation: "I shower in the bathroom every morning." },
      { text: "Huset har två *badrum*.", translation: "The house has two bathrooms." }
    ],
    124: [
      { text: "Mitt *sovrum* är litet men mysigt.", translation: "My bedroom is small but cozy." },
      { text: "Barnen sover i samma *sovrum*.", translation: "The children sleep in the same bedroom." },
      { text: "Vi målade *sovrummet* blått.", translation: "We painted the bedroom blue." }
    ],
    125: [
      { text: "Vi tittar på TV i *vardagsrummet*.", translation: "We watch TV in the living room." },
      { text: "*Vardagsrummet* har en stor soffa.", translation: "The living room has a big sofa." },
      { text: "Familjen samlas i *vardagsrummet* på kvällen.", translation: "The family gathers in the living room in the evening." }
    ],
    126: [
      { text: "Jag gillar *ost* på brödet.", translation: "I like cheese on bread." },
      { text: "Vi köpte svensk *ost* på marknaden.", translation: "We bought Swedish cheese at the market." },
      { text: "*Osten* smakar väldigt gott.", translation: "The cheese tastes very good." }
    ],
    127: [
      { text: "Jag äter *ägg* till frukost.", translation: "I eat eggs for breakfast." },
      { text: "Kan du köpa *ägg* i affären?", translation: "Can you buy eggs at the shop?" },
      { text: "*Ägget* var kokt precis rätt.", translation: "The egg was cooked just right." }
    ],
    128: [
      { text: "Vi äter *fisk* varje fredag.", translation: "We eat fish every Friday." },
      { text: "*Fisken* var väldigt färsk.", translation: "The fish was very fresh." },
      { text: "Han fångade en stor *fisk* i havet.", translation: "He caught a big fish in the sea." }
    ],
    129: [
      { text: "Hon äter inte *kött*.", translation: "She doesn't eat meat." },
      { text: "Vi grillade *kött* i trädgården.", translation: "We grilled meat in the garden." },
      { text: "*Köttet* var mört och gott.", translation: "The meat was tender and good." }
    ],
    130: [
      { text: "Vi äter *soppa* när det är kallt.", translation: "We eat soup when it's cold." },
      { text: "*Soppan* var varm och god.", translation: "The soup was warm and good." },
      { text: "Mamma lagade *soppa* till middag.", translation: "Mom made soup for dinner." }
    ],
    131: [
      { text: "Jag äter ett *äpple* varje dag.", translation: "I eat an apple every day." },
      { text: "*Äpplet* var rött och sött.", translation: "The apple was red and sweet." },
      { text: "Vi plockade *äpplen* i trädgården.", translation: "We picked apples in the garden." }
    ],
    132: [
      { text: "Jag tar en *banan* till lunch.", translation: "I'll have a banana for lunch." },
      { text: "*Bananen* var mogen och söt.", translation: "The banana was ripe and sweet." },
      { text: "Barnen gillar *bananer* mycket.", translation: "The children like bananas a lot." }
    ],
    133: [
      { text: "Jag dricker juice av *apelsin*.", translation: "I drink juice made from oranges." },
      { text: "*Apelsinen* var saftig och söt.", translation: "The orange was juicy and sweet." },
      { text: "Vi köpte en påse *apelsiner*.", translation: "We bought a bag of oranges." }
    ],
    134: [
      { text: "Vi äter *potatis* till middag.", translation: "We eat potatoes for dinner." },
      { text: "*Potatisen* var kokt och mjuk.", translation: "The potato was boiled and soft." },
      { text: "Han odlar *potatis* i trädgården.", translation: "He grows potatoes in the garden." }
    ],
    135: [
      { text: "Kaninen äter en *morot*.", translation: "The rabbit is eating a carrot." },
      { text: "*Moroten* var söt och krispig.", translation: "The carrot was sweet and crisp." },
      { text: "Vi skär *morötter* till soppan.", translation: "We cut carrots for the soup." }
    ],
    136: [
      { text: "Jag dricker *te* på morgonen.", translation: "I drink tea in the morning." },
      { text: "Kan jag få en kopp *te*?", translation: "Can I have a cup of tea?" },
      { text: "*Teet* var för varmt att dricka.", translation: "The tea was too hot to drink." }
    ],
    137: [
      { text: "Barnet dricker *mjölk* till frukost.", translation: "The child drinks milk for breakfast." },
      { text: "Kan du köpa *mjölk* i affären?", translation: "Can you buy milk at the shop?" },
      { text: "*Mjölken* var kall och fräsch.", translation: "The milk was cold and fresh." }
    ],
    138: [
      { text: "Jag dricker *juice* varje morgon.", translation: "I drink juice every morning." },
      { text: "*Juicen* smakar sött och fräscht.", translation: "The juice tastes sweet and fresh." },
      { text: "Vi gjorde *juice* av äpplen.", translation: "We made juice from apples." }
    ],
    139: [
      { text: "Jag äter *frukost* klockan sju.", translation: "I eat breakfast at seven." },
      { text: "*Frukosten* var god imorse.", translation: "Breakfast was delicious this morning." },
      { text: "Vi äter *frukost* tillsammans varje dag.", translation: "We eat breakfast together every day." }
    ],
    140: [
      { text: "Vi äter *lunch* klockan tolv.", translation: "We eat lunch at twelve." },
      { text: "*Lunchen* var snabb men god.", translation: "Lunch was quick but good." },
      { text: "Han tar med sig *lunch* till jobbet.", translation: "He brings lunch to work." }
    ],
    141: [
      { text: "Vi äter *middag* klockan sex.", translation: "We eat dinner at six." },
      { text: "*Middagen* var väldigt god ikväll.", translation: "Dinner was very good tonight." },
      { text: "Familjen samlas till *middag* varje söndag.", translation: "The family gathers for dinner every Sunday." }
    ],
    142: [
      { text: "Kan du skicka *saltet*?", translation: "Can you pass me the salt?" },
      { text: "Soppan behöver lite mer *salt*.", translation: "The soup needs a bit more salt." },
      { text: "Han använder för mycket *salt* i maten.", translation: "He uses too much salt in the food." }
    ],
    143: [
      { text: "Jag dricker kaffe utan *socker*.", translation: "I drink coffee without sugar." },
      { text: "Kan du skicka *sockret*?", translation: "Can you pass me the sugar?" },
      { text: "Kakan behöver mycket *socker*.", translation: "The cake needs a lot of sugar." }
    ],
    144: [
      { text: "Maten ligger på *tallriken*.", translation: "The food is on the plate." },
      { text: "Kan du diska *tallriken*?", translation: "Can you wash the plate?" },
      { text: "Vi dukar bordet med *tallrikar*.", translation: "We're setting the table with plates." }
    ],
    145: [
      { text: "Kan jag få ett *glas* vatten?", translation: "Can I have a glass of water?" },
      { text: "*Glaset* föll och gick sönder.", translation: "The glass fell and broke." },
      { text: "Hon fyllde *glaset* med juice.", translation: "She filled the glass with juice." }
    ],
    146: [
      { text: "Jag har ont i *huvudet*.", translation: "I have a headache." },
      { text: "Han skakade på *huvudet*.", translation: "He shook his head." },
      { text: "*Huvudet* mitt gör ont.", translation: "My head hurts." }
    ],
    147: [
      { text: "Hon höll mig i *handen*.", translation: "She held my hand." },
      { text: "Tvätta *händerna* innan du äter.", translation: "Wash your hands before you eat." },
      { text: "Han vinkade med *handen*.", translation: "He waved with his hand." }
    ],
    148: [
      { text: "Jag vred om på *foten*.", translation: "I twisted my foot." },
      { text: "Barnet har små *fötter*.", translation: "The child has small feet." },
      { text: "Han sparkade bollen med *foten*.", translation: "He kicked the ball with his foot." }
    ],
    149: [
      { text: "Hon har blå *ögon*.", translation: "She has blue eyes." },
      { text: "Jag fick något i *ögat*.", translation: "I got something in my eye." },
      { text: "Barnet stängde *ögonen* och sov.", translation: "The child closed its eyes and slept." }
    ],
    150: [
      { text: "Han viskade något i mitt *öra*.", translation: "He whispered something in my ear." },
      { text: "Musiken var hög, så jag täckte *öronen*.", translation: "The music was loud, so I covered my ears." },
      { text: "Hunden har stora *öron*.", translation: "The dog has big ears." }
    ],
    151: [
      { text: "Barnet har en liten *näsa*.", translation: "The child has a small nose." },
      { text: "Jag andas genom *näsan*.", translation: "I breathe through my nose." },
      { text: "Han har en förkyld *näsa*.", translation: "He has a stuffy nose." }
    ],
    152: [
      { text: "Stäng *munnen*, snälla.", translation: "Close your mouth, please." },
      { text: "Hon log med hela *munnen*.", translation: "She smiled with her whole mouth." },
      { text: "Prata inte med mat i *munnen*.", translation: "Don't talk with food in your mouth." }
    ],
    153: [
      { text: "Hon har långt, mörkt *hår*.", translation: "She has long, dark hair." },
      { text: "Han klipper sitt eget *hår*.", translation: "He cuts his own hair." },
      { text: "*Håret* mitt blir blött i regnet.", translation: "My hair gets wet in the rain." }
    ],
    154: [
      { text: "Ta på dig *jackan*, det är kallt ute.", translation: "Put on your jacket, it's cold outside." },
      { text: "Jag köpte en ny *jacka* igår.", translation: "I bought a new jacket yesterday." },
      { text: "*Jackan* hennes är blå och varm.", translation: "Her jacket is blue and warm." }
    ],
    155: [
      { text: "Ta av dig *skorna* innan du går in.", translation: "Take off your shoes before you go in." },
      { text: "De här *skorna* är väldigt bekväma.", translation: "These shoes are very comfortable." },
      { text: "Jag behöver nya *skor* till vintern.", translation: "I need new shoes for winter." }
    ],
    156: [
      { text: "Jag köpte nya *byxor* igår.", translation: "I bought new pants yesterday." },
      { text: "*Byxorna* mina är för långa.", translation: "My pants are too long." },
      { text: "Han går alltid i svarta *byxor*.", translation: "He always wears black pants." }
    ],
    157: [
      { text: "Han har på sig en vit *skjorta*.", translation: "He's wearing a white shirt." },
      { text: "*Skjortan* min behöver strykas.", translation: "My shirt needs ironing." },
      { text: "Vi köpte en ny *skjorta* till hans födelsedag.", translation: "We bought a new shirt for his birthday." }
    ],
    158: [
      { text: "Hon har en fin *klänning* på sig.", translation: "She's wearing a nice dress." },
      { text: "*Klänningen* var röd och lång.", translation: "The dress was red and long." },
      { text: "Jag ska köpa en ny *klänning* till festen.", translation: "I'm going to buy a new dress for the party." }
    ],
    159: [
      { text: "Ta på dig *mössan*, det är kallt.", translation: "Put on your hat, it's cold." },
      { text: "*Mössan* hans är blå och varm.", translation: "His hat is blue and warm." },
      { text: "Jag tappade *mössan* i vinden.", translation: "I lost my hat in the wind." }
    ],
    160: [
      { text: "Jag har på mig en varm *tröja*.", translation: "I'm wearing a warm sweater." },
      { text: "*Tröjan* min är gjord av ull.", translation: "My sweater is made of wool." },
      { text: "Hon stickade en *tröja* till mig.", translation: "She knitted a sweater for me." }
    ],
    161: [
      { text: "Vänta bara en *sekund*.", translation: "Just wait a second." },
      { text: "Det tog bara några *sekunder*.", translation: "It only took a few seconds." },
      { text: "Varje *sekund* räknas.", translation: "Every second counts." }
    ],
    162: [
      { text: "Mötet varade en *timme*.", translation: "The meeting lasted an hour." },
      { text: "Jag väntar en *timme* till.", translation: "I'll wait one more hour." },
      { text: "Resan tar tre *timmar*.", translation: "The trip takes three hours." }
    ],
    163: [
      { text: "Vänta en *minut*, snälla.", translation: "Wait a minute, please." },
      { text: "Tåget kommer om fem *minuter*.", translation: "The train arrives in five minutes." },
      { text: "Det tar bara några *minuter*.", translation: "It only takes a few minutes." }
    ],
    164: [
      { text: "Jag är tjugo *år* gammal.", translation: "I am twenty years old." },
      { text: "Vi flyttade hit för två *år* sedan.", translation: "We moved here two years ago." },
      { text: "Nästa *år* ska vi resa till Italien.", translation: "Next year we're going to travel to Italy." }
    ],
    165: [
      { text: "Vad ska du göra i *helgen*?", translation: "What are you doing this weekend?" },
      { text: "Vi åker till stugan varje *helg*.", translation: "We go to the cabin every weekend." },
      { text: "*Helgen* var kort men fin.", translation: "The weekend was short but nice." }
    ],
    166: [
      { text: "På *måndag* börjar jag ett nytt jobb.", translation: "On Monday I start a new job." },
      { text: "Vi träffas varje *måndag*.", translation: "We meet every Monday." },
      { text: "*Måndagen* var hektisk och lång.", translation: "Monday was busy and long." }
    ],
    167: [
      { text: "På *tisdag* har jag träning.", translation: "On Tuesday I have training." },
      { text: "Vi åker till stan på *tisdag*.", translation: "We're going to town on Tuesday." },
      { text: "*Tisdagar* är alltid lugna.", translation: "Tuesdays are always calm." }
    ],
    168: [
      { text: "Mötet är på *onsdag* klockan tio.", translation: "The meeting is Wednesday at ten." },
      { text: "Hon jobbar inte på *onsdagar*.", translation: "She doesn't work on Wednesdays." },
      { text: "Vi ses igen på *onsdag*.", translation: "We'll see each other again on Wednesday." }
    ],
    169: [
      { text: "På *torsdag* ska vi äta middag tillsammans.", translation: "On Thursday we're having dinner together." },
      { text: "Han reser hem på *torsdag*.", translation: "He travels home on Thursday." },
      { text: "*Torsdagar* är min favoritdag.", translation: "Thursdays are my favorite day." }
    ],
    170: [
      { text: "Äntligen är det *fredag*!", translation: "Finally it's Friday!" },
      { text: "Vi firar alltid på *fredagar*.", translation: "We always celebrate on Fridays." },
      { text: "*Fredag* kväll går vi ut.", translation: "Friday evening we go out." }
    ],
    171: [
      { text: "Vi handlar på *lördagar*.", translation: "We shop on Saturdays." },
      { text: "På *lördag* ska vi till stranden.", translation: "On Saturday we're going to the beach." },
      { text: "Festen är på *lördag*.", translation: "The party is on Saturday." }
    ],
    172: [
      { text: "Vi äter stor middag på *söndagar*.", translation: "We eat a big dinner on Sundays." },
      { text: "*Söndag* är en lugn dag.", translation: "Sunday is a calm day." },
      { text: "Familjen samlas varje *söndag*.", translation: "The family gathers every Sunday." }
    ],
    173: [
      { text: "Blommorna blommar på *våren*.", translation: "The flowers bloom in spring." },
      { text: "*Våren* är min favoritårstid.", translation: "Spring is my favorite season." },
      { text: "Vi planterar grönsaker på *våren*.", translation: "We plant vegetables in spring." }
    ],
    174: [
      { text: "Vi reser till Italien varje *sommar*.", translation: "We travel to Italy every summer." },
      { text: "*Sommaren* var varm och solig.", translation: "The summer was warm and sunny." },
      { text: "På *sommaren* badar vi varje dag.", translation: "In summer we swim every day." }
    ],
    175: [
      { text: "Löven faller på *hösten*.", translation: "The leaves fall in autumn." },
      { text: "*Hösten* är kall och våt här.", translation: "Autumn is cold and wet here." },
      { text: "Skolan börjar på *hösten*.", translation: "School starts in autumn." }
    ],
    176: [
      { text: "Det snöar mycket på *vintern*.", translation: "It snows a lot in winter." },
      { text: "*Vintern* är lång och mörk i Sverige.", translation: "Winter is long and dark in Sweden." },
      { text: "Vi åker skidor på *vintern*.", translation: "We go skiing in winter." }
    ],
    177: [
      { text: "*Solen* skiner idag.", translation: "The sun is shining today." },
      { text: "Vi solade oss i *solen* hela dagen.", translation: "We sunbathed in the sun all day." },
      { text: "*Solen* går ner klockan åtta.", translation: "The sun sets at eight." }
    ],
    178: [
      { text: "Det är mycket *regn* idag.", translation: "There's a lot of rain today." },
      { text: "Vi blev blöta av *regnet*.", translation: "We got wet from the rain." },
      { text: "*Regnet* slutade efter en timme.", translation: "The rain stopped after an hour." }
    ],
    179: [
      { text: "Det ligger mycket *snö* på marken.", translation: "There's a lot of snow on the ground." },
      { text: "Barnen leker i *snön*.", translation: "The children are playing in the snow." },
      { text: "*Snön* smälte snabbt i solen.", translation: "The snow melted quickly in the sun." }
    ],
    180: [
      { text: "Det blåser mycket *vind* idag.", translation: "There's a lot of wind today." },
      { text: "*Vinden* rev av taket.", translation: "The wind ripped off the roof." },
      { text: "Vi kände en kall *vind* från havet.", translation: "We felt a cold wind from the sea." }
    ],
    181: [
      { text: "Det är *fint* väder idag.", translation: "The weather is nice today." },
      { text: "Du ser *fin* ut i den klänningen.", translation: "You look nice in that dress." },
      { text: "Det var *fint* att se dig igen.", translation: "It was nice to see you again." }
    ],
    182: [
      { text: "Det är *molnigt* idag.", translation: "It's cloudy today." },
      { text: "Himlen blev *molnig* på eftermiddagen.", translation: "The sky became cloudy in the afternoon." },
      { text: "Vi hade *molnigt* väder hela veckan.", translation: "We had cloudy weather all week." }
    ],
    183: [
      { text: "Himlen är *klar* ikväll.", translation: "The sky is clear tonight." },
      { text: "Vattnet i sjön är helt *klart*.", translation: "The water in the lake is completely clear." },
      { text: "Det blir *klart* väder imorgon.", translation: "It will be clear weather tomorrow." }
    ],
    184: [
      { text: "Vädret har varit *torrt* hela sommaren.", translation: "The weather has been dry all summer." },
      { text: "Marken är *torr* efter många dagar utan regn.", translation: "The ground is dry after many days without rain." },
      { text: "Kläderna är *torra* nu.", translation: "The clothes are dry now." }
    ],
    185: [
      { text: "Gräset är *vått* på morgonen.", translation: "The grass is wet in the morning." },
      { text: "Skorna mina blev *våta* i regnet.", translation: "My shoes got wet in the rain." },
      { text: "Håret hennes var *vått* efter duschen.", translation: "Her hair was wet after the shower." }
    ],
    186: [
      { text: "Jag tar *tåget* till jobbet varje dag.", translation: "I take the train to work every day." },
      { text: "*Tåget* var försenat idag.", translation: "The train was delayed today." },
      { text: "Vi reste med *tåg* till Göteborg.", translation: "We travelled by train to Gothenburg." }
    ],
    187: [
      { text: "*Bussen* kommer om tio minuter.", translation: "The bus arrives in ten minutes." },
      { text: "Jag tar *buss* till skolan.", translation: "I take the bus to school." },
      { text: "Vi väntade länge på *bussen*.", translation: "We waited a long time for the bus." }
    ],
    188: [
      { text: "*Flygplanet* lyfter klockan tio.", translation: "The plane takes off at ten." },
      { text: "Vi reste med *flygplan* till Spanien.", translation: "We travelled by plane to Spain." },
      { text: "*Flygplanet* landade tryggt.", translation: "The plane landed safely." }
    ],
    189: [
      { text: "Jag har en ny *cykel*.", translation: "I have a new bicycle." },
      { text: "*Cykeln* min är trasig.", translation: "My bicycle is broken." },
      { text: "Han kör *cykel* till skolan.", translation: "He rides his bicycle to school." }
    ],
    190: [
      { text: "Vi tog en *båt* över sjön.", translation: "We took a boat across the lake." },
      { text: "*Båten* var liten men snabb.", translation: "The boat was small but fast." },
      { text: "Han fiskar från sin *båt*.", translation: "He fishes from his boat." }
    ],
    191: [
      { text: "Tåget stannar vid den här *stationen*.", translation: "The train stops at this station." },
      { text: "Vi träffades vid *stationen*.", translation: "We met at the station." },
      { text: "*Stationen* ligger mitt i stan.", translation: "The station is in the middle of the city." }
    ],
    192: [
      { text: "Vi körde till *flygplatsen* tidigt.", translation: "We drove to the airport early." },
      { text: "*Flygplatsen* var full av folk.", translation: "The airport was full of people." },
      { text: "Han jobbar på *flygplatsen*.", translation: "He works at the airport." }
    ],
    193: [
      { text: "Jag köpte en *biljett* till konserten.", translation: "I bought a ticket to the concert." },
      { text: "Kan jag se din *biljett*?", translation: "Can I see your ticket?" },
      { text: "Vi behöver två *biljetter* till tåget.", translation: "We need two tickets for the train." }
    ],
    194: [
      { text: "Kan du visa mig på *kartan*?", translation: "Can you show me on the map?" },
      { text: "Vi använde en *karta* för att hitta vägen.", translation: "We used a map to find the way." },
      { text: "*Kartan* visar hela staden.", translation: "The map shows the whole city." }
    ],
    195: [
      { text: "Vi bor på ett fint *hotell*.", translation: "We're staying at a nice hotel." },
      { text: "*Hotellet* ligger nära stranden.", translation: "The hotel is near the beach." },
      { text: "Rummet på *hotellet* var stort.", translation: "The room at the hotel was big." }
    ],
    196: [
      { text: "Sväng till *vänster* vid trafikljuset.", translation: "Turn left at the traffic light." },
      { text: "Boken ligger på *vänster* sida av bordet.", translation: "The book is on the left side of the table." },
      { text: "Han skriver med *vänster* hand.", translation: "He writes with his left hand." }
    ],
    197: [
      { text: "Sväng till *höger* efter bron.", translation: "Turn right after the bridge." },
      { text: "Affären ligger på *höger* sida av gatan.", translation: "The shop is on the right side of the street." },
      { text: "Hon håller pennan i *höger* hand.", translation: "She holds the pen in her right hand." }
    ],
    198: [
      { text: "Gå *rakt fram* tills du ser skolan.", translation: "Go straight ahead until you see the school." },
      { text: "Kör *rakt fram* i två kilometer.", translation: "Drive straight ahead for two kilometers." },
      { text: "Stationen är *rakt fram*, inte långt härifrån.", translation: "The station is straight ahead, not far from here." }
    ],
    199: [
      { text: "Vi bor *nära* skolan.", translation: "We live near the school." },
      { text: "Affären är *nära* vårt hus.", translation: "The shop is near our house." },
      { text: "Han bor *nära* mig.", translation: "He lives near me." }
    ],
    200: [
      { text: "Det är *långt* till flygplatsen härifrån.", translation: "It's far to the airport from here." },
      { text: "Vi bor inte *långt* från centrum.", translation: "We don't live far from the center." },
      { text: "Hon reste *långt* för att komma hit.", translation: "She travelled far to get here." }
    ],
    201: [
      { text: "Klockan är *elva*.", translation: "It's eleven o'clock." },
      { text: "Hon är *elva* år gammal.", translation: "She's eleven years old." },
      { text: "Vi träffas klockan *elva*.", translation: "We meet at eleven." }
    ],
    202: [
      { text: "Klockan är *tolv*.", translation: "It's twelve o'clock." },
      { text: "Året har *tolv* månader.", translation: "The year has twelve months." },
      { text: "Vi var *tolv* personer på middagen.", translation: "There were twelve of us at dinner." }
    ],
    203: [
      { text: "Han är *tretton* år gammal.", translation: "He's thirteen years old." },
      { text: "Vi väntade i *tretton* minuter.", translation: "We waited thirteen minutes." },
      { text: "Det är *tretton* elever i klassen.", translation: "There are thirteen students in the class." }
    ],
    204: [
      { text: "Hon fyller *fjorton* år i mars.", translation: "She turns fourteen in March." },
      { text: "Vi var på semester i *fjorton* dagar.", translation: "We were on vacation for fourteen days." },
      { text: "Det är *fjorton* dagar till jul.", translation: "There are fourteen days until Christmas." }
    ],
    205: [
      { text: "Han är *femton* år gammal.", translation: "He is fifteen years old." },
      { text: "Vi väntade i *femton* minuter.", translation: "We waited fifteen minutes." },
      { text: "Affären stänger om *femton* minuter.", translation: "The shop closes in fifteen minutes." }
    ],
    206: [
      { text: "Hon är *sexton* år gammal.", translation: "She's sixteen years old." },
      { text: "Vi väntade i *sexton* minuter.", translation: "We waited sixteen minutes." },
      { text: "Det är *sexton* elever i klassen.", translation: "There are sixteen students in the class." }
    ],
    207: [
      { text: "Han fyller *sjutton* år i juni.", translation: "He turns seventeen in June." },
      { text: "Vi bodde där i *sjutton* år.", translation: "We lived there for seventeen years." },
      { text: "Det är *sjutton* dagar till semestern.", translation: "There are seventeen days until the holiday." }
    ],
    208: [
      { text: "Hon blir *arton* år nästa månad.", translation: "She turns eighteen next month." },
      { text: "Vi köpte *arton* biljetter till konserten.", translation: "We bought eighteen tickets for the concert." },
      { text: "Det är *arton* bord på restaurangen.", translation: "There are eighteen tables at the restaurant." }
    ],
    209: [
      { text: "Han är *nitton* år gammal.", translation: "He's nineteen years old." },
      { text: "Vi väntade i *nitton* minuter på bussen.", translation: "We waited nineteen minutes for the bus." },
      { text: "Det är *nitton* studenter i klassen.", translation: "There are nineteen students in the class." }
    ],
    210: [
      { text: "Jag är *tjugo* år gammal.", translation: "I am twenty years old." },
      { text: "Vi väntade i *tjugo* minuter.", translation: "We waited twenty minutes." },
      { text: "Det är *tjugo* elever i vår klass.", translation: "There are twenty students in our class." }
    ],
    211: [
      { text: "Min *morfar* bor på landet.", translation: "My grandfather lives in the countryside." },
      { text: "*Morfar* berättar bra historier.", translation: "Grandfather tells good stories." },
      { text: "Jag besöker *morfar* varje sommar.", translation: "I visit grandfather every summer." }
    ],
    212: [
      { text: "Mina *föräldrar* bor i Göteborg.", translation: "My parents live in Gothenburg." },
      { text: "*Föräldrarna* mina är lärare.", translation: "My parents are teachers." },
      { text: "Vi besöker *föräldrarna* våra varje jul.", translation: "We visit our parents every Christmas." }
    ],
    213: [
      { text: "Min *son* går i skolan.", translation: "My son goes to school." },
      { text: "*Sonen* deras är väldigt trevlig.", translation: "Their son is very nice." },
      { text: "Jag är stolt över min *son*.", translation: "I'm proud of my son." }
    ],
    214: [
      { text: "Min *dotter* gillar att rita.", translation: "My daughter likes to draw." },
      { text: "*Dottern* deras studerar medicin.", translation: "Their daughter studies medicine." },
      { text: "Jag ringer min *dotter* varje dag.", translation: "I call my daughter every day." }
    ],
    215: [
      { text: "Min *make* jobbar som ingenjör.", translation: "My husband works as an engineer." },
      { text: "*Maken* hennes är fransk.", translation: "Her husband is French." },
      { text: "Vi träffade *maken* hennes på festen.", translation: "We met her husband at the party." }
    ],
    216: [
      { text: "Min *lärare* är väldigt trevlig.", translation: "My teacher is very nice." },
      { text: "Hon jobbar som *lärare* på skolan.", translation: "She works as a teacher at the school." },
      { text: "*Läraren* gav oss mycket läxor.", translation: "The teacher gave us a lot of homework." }
    ],
    217: [
      { text: "Han är *student* vid universitetet.", translation: "He's a student at the university." },
      { text: "*Studenten* pluggade hela natten.", translation: "The student studied all night." },
      { text: "Jag var *student* i fem år.", translation: "I was a student for five years." }
    ],
    218: [
      { text: "Min mamma är *läkare*.", translation: "My mother is a doctor." },
      { text: "Jag måste till *läkaren* imorgon.", translation: "I have to go to the doctor tomorrow." },
      { text: "*Läkaren* undersökte patienten.", translation: "The doctor examined the patient." }
    ],
    219: [
      { text: "Min syster är *sjuksköterska*.", translation: "My sister is a nurse." },
      { text: "*Sjuksköterskan* var väldigt omtänksam.", translation: "The nurse was very caring." },
      { text: "Han jobbar som *sjuksköterska* på sjukhuset.", translation: "He works as a nurse at the hospital." }
    ],
    220: [
      { text: "Vi ringde *polisen* efter olyckan.", translation: "We called the police after the accident." },
      { text: "*Polisen* kom snabbt till platsen.", translation: "The police arrived quickly at the scene." },
      { text: "Han jobbar inom *polisen*.", translation: "He works in the police force." }
    ],
    221: [
      { text: "Jag älskar mitt *jobb*.", translation: "I love my job." },
      { text: "Hon fick ett nytt *jobb* igår.", translation: "She got a new job yesterday." },
      { text: "*Jobbet* hans är väldigt krävande.", translation: "His job is very demanding." }
    ],
    222: [
      { text: "Jag jobbar på ett *kontor* i centrum.", translation: "I work at an office downtown." },
      { text: "*Kontoret* mitt är på tredje våningen.", translation: "My office is on the third floor." },
      { text: "Vi träffades på *kontoret* klockan nio.", translation: "We met at the office at nine." }
    ],
    223: [
      { text: "Vi är tjugo elever i *klassen*.", translation: "There are twenty students in the class." },
      { text: "*Klassen* vår är väldigt trevlig.", translation: "Our class is very nice." },
      { text: "Han är bäst i *klassen*.", translation: "He's the best in the class." }
    ],
    224: [
      { text: "Jag måste göra mina *läxor*.", translation: "I have to do my homework." },
      { text: "*Läxan* var svår idag.", translation: "The homework was difficult today." },
      { text: "Läraren gav oss mycket *läxa*.", translation: "The teacher gave us a lot of homework." }
    ],
    225: [
      { text: "Vi har ett *prov* imorgon.", translation: "We have a test tomorrow." },
      { text: "*Provet* var lättare än jag trodde.", translation: "The test was easier than I thought." },
      { text: "Jag måste plugga till *provet*.", translation: "I need to study for the test." }
    ],
    226: [
      { text: "Jag *sover* åtta timmar varje natt.", translation: "I sleep eight hours every night." },
      { text: "Barnet *sover* redan.", translation: "The child is already asleep." },
      { text: "Jag kan inte *sova* ikväll.", translation: "I can't manage to sleep tonight." }
    ],
    227: [
      { text: "Jag *vaknar* klockan sju varje morgon.", translation: "I wake up at seven every morning." },
      { text: "Hon *vaknade* av ljudet från gatan.", translation: "She woke up from the noise on the street." },
      { text: "Han brukar *vakna* tidigt.", translation: "He usually wakes up early." }
    ],
    228: [
      { text: "Jag *jobbar* i en affär.", translation: "I work in a shop." },
      { text: "Hon *jobbar* hårt varje dag.", translation: "She works hard every day." },
      { text: "Vill du *jobba* med mig imorgon?", translation: "Do you want to work with me tomorrow?" }
    ],
    229: [
      { text: "Jag *studerar* medicin vid universitetet.", translation: "I study medicine at the university." },
      { text: "Hon *studerar* till provet ikväll.", translation: "She's studying for the test tonight." },
      { text: "Vi måste *studera* mer den här veckan.", translation: "We need to study more this week." }
    ],
    230: [
      { text: "Jag *lär* mig svenska nu.", translation: "I'm learning Swedish now." },
      { text: "Barn *lär* sig snabbt.", translation: "Children learn fast." },
      { text: "Det är roligt att *lära* sig nya saker.", translation: "It's fun to learn new things." }
    ],
    231: [
      { text: "Jag *kör* till jobbet varje dag.", translation: "I drive to work every day." },
      { text: "Kan du *köra* mig till flygplatsen?", translation: "Can you drive me to the airport?" },
      { text: "Hon *kör* alltid försiktigt.", translation: "She always drives carefully." }
    ],
    232: [
      { text: "Vi *reser* till Sverige i sommar.", translation: "We're travelling to Sweden this summer." },
      { text: "Jag älskar att *resa*.", translation: "I love to travel." },
      { text: "De *reser* mycket för jobbet.", translation: "They travel a lot for work." }
    ],
    233: [
      { text: "Jag *väntar* på bussen.", translation: "I'm waiting for the bus." },
      { text: "Kan du *vänta* lite?", translation: "Can you wait a bit?" },
      { text: "Vi *väntade* i en timme.", translation: "We waited for an hour." }
    ],
    234: [
      { text: "Jag kan inte *hitta* mina nycklar.", translation: "I can't find my keys." },
      { text: "Han *hittade* boken under sängen.", translation: "He found the book under the bed." },
      { text: "Kan du hjälpa mig att *hitta* vägen?", translation: "Can you help me find the way?" }
    ],
    235: [
      { text: "Jag ska *träffa* vänner ikväll.", translation: "I'm going to meet friends tonight." },
      { text: "Vi *träffades* på caféet.", translation: "We met at the café." },
      { text: "Roligt att *träffa* dig!", translation: "Nice to meet you!" }
    ],
    236: [
      { text: "Jag *gillar* den här boken.", translation: "I like this book." },
      { text: "Hon *gillar* att läsa på kvällen.", translation: "She likes to read in the evening." },
      { text: "*Gillar* du att resa?", translation: "Do you like to travel?" }
    ],
    237: [
      { text: "Jag *älskar* dig.", translation: "I love you." },
      { text: "Hon *älskar* musik.", translation: "She loves music." },
      { text: "Vi *älskar* att resa tillsammans.", translation: "We love to travel together." }
    ],
    238: [
      { text: "Jag *vill* ha en kaffe.", translation: "I want a coffee." },
      { text: "Vad *vill* du göra ikväll?", translation: "What do you want to do tonight?" },
      { text: "Hon *ville* inte gå hem ännu.", translation: "She didn't want to go home yet." }
    ],
    239: [
      { text: "Jag *behöver* hjälp med det här.", translation: "I need help with this." },
      { text: "Vi *behöver* mer tid.", translation: "We need more time." },
      { text: "Hon *behöver* nya skor.", translation: "She needs new shoes." }
    ],
    240: [
      { text: "Jag ska *köpa* mjölk i affären.", translation: "I'm going to buy milk at the shop." },
      { text: "Vill du *köpa* den här boken?", translation: "Do you want to buy this book?" },
      { text: "Hon *köpte* en ny bil igår.", translation: "She bought a new car yesterday." }
    ],
    241: [
      { text: "Vi *säljer* vårt hus.", translation: "We're selling our house." },
      { text: "Han *sålde* sin bil förra året.", translation: "He sold his car last year." },
      { text: "De vill *sälja* lägenheten snart.", translation: "They want to sell the apartment soon." }
    ],
    242: [
      { text: "Kan jag *betala* med kort?", translation: "Can I pay with card?" },
      { text: "Jag *betalade* för middagen.", translation: "I paid for dinner." },
      { text: "Vi måste *betala* hyran idag.", translation: "We have to pay the rent today." }
    ],
    243: [
      { text: "Kan du *öppna* fönstret?", translation: "Can you open the window?" },
      { text: "Affären *öppnar* klockan tio.", translation: "The shop opens at ten." },
      { text: "Hon *öppnade* dörren försiktigt.", translation: "She opened the door carefully." }
    ],
    244: [
      { text: "Kan du *stänga* dörren?", translation: "Can you close the door?" },
      { text: "Affären *stänger* klockan sex.", translation: "The shop closes at six." },
      { text: "Han *stängde* fönstret för att det var kallt.", translation: "He closed the window because it was cold." }
    ],
    245: [
      { text: "Jag måste *tvätta* mina kläder.", translation: "I need to wash my clothes." },
      { text: "Hon *tvättar* händerna innan hon äter.", translation: "She washes her hands before she eats." },
      { text: "Vi *tvättade* bilen i helgen.", translation: "We washed the car over the weekend." }
    ],
    246: [
      { text: "Jag kan *se* berget härifrån.", translation: "I can see the mountain from here." },
      { text: "Vill du *se* en film ikväll?", translation: "Do you want to see a movie tonight?" },
      { text: "Hon *såg* en fågel i trädet.", translation: "She saw a bird in the tree." }
    ],
    247: [
      { text: "Jag kan *höra* musik från grannen.", translation: "I can hear music from the neighbor." },
      { text: "Kan du *höra* mig?", translation: "Can you hear me?" },
      { text: "Hon *hörde* ett konstigt ljud.", translation: "She heard a strange sound." }
    ],
    248: [
      { text: "Vad vill du *säga* till henne?", translation: "What do you want to say to her?" },
      { text: "Han *sa* ingenting.", translation: "He said nothing." },
      { text: "Kan du *säga* det igen?", translation: "Can you say that again?" }
    ],
    249: [
      { text: "Kan jag *fråga* dig något?", translation: "Can I ask you something?" },
      { text: "Hon *frågade* om vägen till stationen.", translation: "She asked for directions to the station." },
      { text: "Vi måste *fråga* läraren om det här.", translation: "We need to ask the teacher about this." }
    ],
    250: [
      { text: "Kan du *svara* på min fråga?", translation: "Can you answer my question?" },
      { text: "Han *svarade* snabbt på e-posten.", translation: "He answered the email quickly." },
      { text: "Hon *svarar* aldrig i telefon.", translation: "She never answers the phone." }
    ],
    251: [
      { text: "Jag är väldigt *glad* idag.", translation: "I'm very happy today." },
      { text: "Hon blev *glad* för presenten.", translation: "She was happy about the gift." },
      { text: "Vi är *glada* över att se dig.", translation: "We're happy to see you." }
    ],
    252: [
      { text: "Han är *ledsen* för att hans hund är sjuk.", translation: "He's sad because his dog is sick." },
      { text: "Filmen gjorde mig *ledsen*.", translation: "The movie made me sad." },
      { text: "Vi kände oss *ledsna* efter nyheten.", translation: "We felt sad after the news." }
    ],
    253: [
      { text: "Hon blev *arg* när han kom för sent.", translation: "She got angry when he came late." },
      { text: "Var inte *arg* på mig.", translation: "Don't be angry with me." },
      { text: "Han var *arg* hela dagen.", translation: "He was angry all day." }
    ],
    254: [
      { text: "Jag är väldigt *trött* ikväll.", translation: "I'm very tired tonight." },
      { text: "Hon blev *trött* efter jobbet.", translation: "She got tired after work." },
      { text: "Vi var *trötta* efter den långa resan.", translation: "We were tired after the long trip." }
    ],
    255: [
      { text: "Jag är *sjuk* idag och stannar hemma.", translation: "I'm sick today and staying home." },
      { text: "Barnet är *sjukt* och har feber.", translation: "The child is sick and has a fever." },
      { text: "Hon var *sjuk* hela veckan.", translation: "She was sick all week." }
    ],
    256: [
      { text: "Provet var *lätt*.", translation: "The test was easy." },
      { text: "Det här är en *lätt* uppgift.", translation: "This is an easy task." },
      { text: "Det var *lätt* att hitta vägen.", translation: "It was easy to find the way." }
    ],
    257: [
      { text: "Den här uppgiften är *svår*.", translation: "This task is difficult." },
      { text: "Det var *svårt* att förstå honom.", translation: "It was difficult to understand him." },
      { text: "Svenska är inte så *svårt* att lära sig.", translation: "Swedish isn't so difficult to learn." }
    ],
    258: [
      { text: "Den här bilen är väldigt *dyr*.", translation: "This car is very expensive." },
      { text: "Hotellet var *dyrt*.", translation: "The hotel was expensive." },
      { text: "Vi hittade en *dyr* men fin restaurang.", translation: "We found an expensive but nice restaurant." }
    ],
    259: [
      { text: "Den här tröjan var *billig*.", translation: "This sweater was cheap." },
      { text: "Vi letade efter ett *billigt* hotell.", translation: "We looked for a cheap hotel." },
      { text: "Flygbiljetten var förvånansvärt *billig*.", translation: "The plane ticket was surprisingly cheap." }
    ],
    260: [
      { text: "Entrén är *gratis* idag.", translation: "Entry is free today." },
      { text: "Kaffet på kontoret är *gratis*.", translation: "The coffee at the office is free." },
      { text: "Museet är *gratis* för barn.", translation: "The museum is free for children." }
    ],
    261: [
      { text: "Vi har *många* vänner här.", translation: "We have many friends here." },
      { text: "Det var *många* människor på festen.", translation: "There were many people at the party." },
      { text: "Hon har läst *många* böcker.", translation: "She has read many books." }
    ],
    262: [
      { text: "Det var *få* människor på museet idag.", translation: "There were few people at the museum today." },
      { text: "Vi har *få* dagar kvar av semestern.", translation: "We have few days left of the holiday." },
      { text: "Bara *få* elever kom till lektionen.", translation: "Only a few students came to class." }
    ],
    263: [
      { text: "Kan jag få *mer* kaffe?", translation: "Can I have more coffee?" },
      { text: "Jag behöver *mer* tid.", translation: "I need more time." },
      { text: "Hon pratar *mer* än sin bror.", translation: "She talks more than her brother." }
    ],
    264: [
      { text: "Jag äter *mindre* kött nu.", translation: "I eat less meat now." },
      { text: "Vi har *mindre* tid än vi trodde.", translation: "We have less time than we thought." },
      { text: "Han jobbar *mindre* än förut.", translation: "He works less than before." }
    ],
    265: [
      { text: "Har vi *nog* mat till alla?", translation: "Do we have enough food for everyone?" },
      { text: "Jag har inte *nog* pengar.", translation: "I don't have enough money." },
      { text: "Det är *nog* plats i bilen.", translation: "There's enough room in the car." }
    ],
    266: [
      { text: "Jag reser *ofta* till Sverige.", translation: "I often travel to Sweden." },
      { text: "Hon ringer *ofta* till sina föräldrar.", translation: "She often calls her parents." },
      { text: "Vi äter *ofta* fisk till middag.", translation: "We often eat fish for dinner." }
    ],
    267: [
      { text: "Jag dricker *aldrig* kaffe på kvällen.", translation: "I never drink coffee in the evening." },
      { text: "Han kommer *aldrig* för sent.", translation: "He never comes late." },
      { text: "Vi har *aldrig* varit i Japan.", translation: "We have never been to Japan." }
    ],
    268: [
      { text: "Jag går *ibland* en promenad ensam.", translation: "I sometimes go for a walk alone." },
      { text: "Hon äter *ibland* frukost sent.", translation: "She sometimes eats breakfast late." },
      { text: "Vi åker *ibland* till stugan på helgen.", translation: "We sometimes go to the cabin on weekends." }
    ],
    269: [
      { text: "Jag vaknar *tidigt* varje dag.", translation: "I wake up early every day." },
      { text: "Vi kom *tidigt* till flygplatsen.", translation: "We arrived early at the airport." },
      { text: "Mötet börjar *tidigt* imorgon.", translation: "The meeting starts early tomorrow." }
    ],
    270: [
      { text: "Han kom *sent* till jobbet idag.", translation: "He came late to work today." },
      { text: "Vi åt middag *sent* igår.", translation: "We ate dinner late yesterday." },
      { text: "Tåget gick *sent* på kvällen.", translation: "The train left late in the evening." }
    ],
    271: [
      { text: "*Den här* boken är väldigt bra.", translation: "This book is very good." },
      { text: "Jag gillar *den här* tröjan.", translation: "I like this sweater." },
      { text: "*Den här* veckan har varit hektisk.", translation: "This week has been busy." }
    ],
    272: [
      { text: "*Det här* huset är stort.", translation: "This house is big." },
      { text: "Jag förstår inte *det här* ordet.", translation: "I don't understand this word." },
      { text: "*Det här* är min bror.", translation: "This is my brother." }
    ],
    273: [
      { text: "*Dessa* skor är nya.", translation: "These shoes are new." },
      { text: "Jag gillar *dessa* bilder.", translation: "I like these pictures." },
      { text: "*Dessa* böcker är från biblioteket.", translation: "These books are from the library." }
    ],
    274: [
      { text: "Vi bor i *samma* stad.", translation: "We live in the same city." },
      { text: "Han har *samma* jacka som jag.", translation: "He has the same jacket as me." },
      { text: "De gick i *samma* skola.", translation: "They went to the same school." }
    ],
    275: [
      { text: "Jag vill hellre ha den *andra* boken.", translation: "I'd rather have the other book." },
      { text: "Vi tar den *andra* vägen.", translation: "We'll take the other way." },
      { text: "Hon bor på den *andra* sidan av gatan.", translation: "She lives on the other side of the street." }
    ],
    276: [
      { text: "*Hej då*! Vi ses imorgon.", translation: "Bye! See you tomorrow." },
      { text: "Hon vinkade och sa *hej då*.", translation: "She waved and said bye." },
      { text: "*Hej då*, vi hörs snart!", translation: "Bye, talk soon!" }
    ],
    277: [
      { text: "*God morgon*! Sov du gott?", translation: "Good morning! Did you sleep well?" },
      { text: "Han sa *god morgon* till alla på kontoret.", translation: "He said good morning to everyone at the office." },
      { text: "*God morgon*, det är en fin dag idag.", translation: "Good morning, it's a nice day today." }
    ],
    278: [
      { text: "*God kväll*! Hur mår du?", translation: "Good evening! How are you?" },
      { text: "Vi sa *god kväll* och gick in.", translation: "We said good evening and went in." },
      { text: "*God kväll*, välkommen till restaurangen.", translation: "Good evening, welcome to the restaurant." }
    ],
    279: [
      { text: "*God natt*, sov gott!", translation: "Good night, sleep well!" },
      { text: "Hon sa *god natt* till barnen.", translation: "She said good night to the children." },
      { text: "*God natt*, vi ses tidigt imorgon.", translation: "Good night, see you early tomorrow." }
    ],
    280: [
      { text: "*Välkommen* till Sverige!", translation: "Welcome to Sweden!" },
      { text: "Du är alltid *välkommen* hem till oss.", translation: "You're always welcome at our home." },
      { text: "*Välkommen* in, varsågod!", translation: "Welcome in, please!" }
    ],
    281: [
      { text: "*Varsågod*, här är kaffet ditt.", translation: "Here you are, here's your coffee." },
      { text: "*Varsågod*, sitt ner.", translation: "Please, sit down." },
      { text: "Hon gav mig boken och sa *varsågod*.", translation: "She gave me the book and said here you are." }
    ],
    282: [
      { text: "*Tusen tack* för hjälpen!", translation: "Many thanks for the help!" },
      { text: "*Tusen tack*, det var väldigt snällt av dig.", translation: "Thank you so much, that was very kind of you." },
      { text: "Vi sa *tusen tack* och gick hem.", translation: "We said thanks a lot and went home." }
    ],
    283: [
      { text: "*Det är bra*, oroa dig inte.", translation: "It's fine, don't worry." },
      { text: "Hur mår du? *Det är bra*, tack.", translation: "How are you? I'm fine, thanks." },
      { text: "*Det är bra* med mig nu.", translation: "I'm doing fine now." }
    ],
    284: [
      { text: "Det var en fin film, *eller hur*?", translation: "That was a nice movie, right?" },
      { text: "Du gillar kaffe, *eller hur*?", translation: "You like coffee, right?" },
      { text: "Vi träffades förra året, *eller hur*?", translation: "We met last year, right?" }
    ],
    285: [
      { text: "*Självklart* kan jag hjälpa dig.", translation: "Of course I can help you." },
      { text: "Kommer du ikväll? *Självklart*!", translation: "Are you coming tonight? Of course!" },
      { text: "*Självklart* minns jag dig.", translation: "Of course I remember you." }
    ],
    286: [
      { text: "Jag måste till *apoteket* och köpa medicin.", translation: "I need to go to the pharmacy and buy medicine." },
      { text: "*Apoteket* ligger bredvid affären.", translation: "The pharmacy is next to the shop." },
      { text: "*Apoteket* öppnar klockan åtta.", translation: "The pharmacy opens at eight." }
    ],
    287: [
      { text: "Han fördes till *sjukhuset* igår.", translation: "He was taken to the hospital yesterday." },
      { text: "*Sjukhuset* ligger utanför staden.", translation: "The hospital is outside the city." },
      { text: "Hon jobbar på *sjukhuset* som sjuksköterska.", translation: "She works at the hospital as a nurse." }
    ],
    288: [
      { text: "Jag har tid hos *tandläkaren* imorgon.", translation: "I have an appointment with the dentist tomorrow." },
      { text: "*Tandläkaren* kollade mina tänder.", translation: "The dentist checked my teeth." },
      { text: "Barn bör gå till *tandläkaren* varje år.", translation: "Children should go to the dentist every year." }
    ],
    289: [
      { text: "Kan jag få lite *hjälp*?", translation: "Can I get some help?" },
      { text: "Tusen tack för *hjälpen*!", translation: "Thanks a lot for the help!" },
      { text: "Hon behövde *hjälp* med läxorna.", translation: "She needed help with the homework." }
    ],
    290: [
      { text: "Vi har ett litet *problem*.", translation: "We have a small problem." },
      { text: "*Problemet* löstes snabbt.", translation: "The problem was solved quickly." },
      { text: "Inget *problem*, jag kan hjälpa till.", translation: "No problem, I can help." }
    ],
    291: [
      { text: "Vad är *priset* på den här tröjan?", translation: "What's the price of this sweater?" },
      { text: "*Priset* var högre än jag förväntade mig.", translation: "The price was higher than I expected." },
      { text: "Vi jämförde *priser* i flera affärer.", translation: "We compared prices in several shops." }
    ],
    292: [
      { text: "Jag har inte nog *pengar* idag.", translation: "I don't have enough money today." },
      { text: "Hon sparar *pengar* till resan.", translation: "She's saving money for the trip." },
      { text: "Vi behöver mer *pengar* till projektet.", translation: "We need more money for the project." }
    ],
    293: [
      { text: "Kan jag få ett *kvitto*, snälla?", translation: "Can I have a receipt, please?" },
      { text: "Jag tappade mitt *kvitto*.", translation: "I lost my receipt." },
      { text: "*Kvittot* visar vad du betalade.", translation: "The receipt shows what you paid." }
    ],
    294: [
      { text: "Behöver du en *påse*?", translation: "Do you need a bag?" },
      { text: "*Påsen* var full av grönsaker.", translation: "The bag was full of vegetables." },
      { text: "Jag glömde *påsarna* mina hemma.", translation: "I forgot my bags at home." }
    ],
    295: [
      { text: "Vilken *storlek* har du?", translation: "What size do you wear?" },
      { text: "Den här tröjan är fel *storlek*.", translation: "This sweater is the wrong size." },
      { text: "De har alla *storlekar* i den här affären.", translation: "They have all sizes in this shop." }
    ],
    296: [
      { text: "Jag glömde min *telefon* hemma.", translation: "I forgot my phone at home." },
      { text: "*Telefonen* ringde mitt i natten.", translation: "The phone rang in the middle of the night." },
      { text: "Kan jag låna din *telefon*?", translation: "Can I borrow your phone?" }
    ],
    297: [
      { text: "Min *dator* är väldigt gammal.", translation: "My computer is very old." },
      { text: "*Datorn* slutade fungera igår.", translation: "The computer stopped working yesterday." },
      { text: "Jag jobbar på *datorn* hela dagen.", translation: "I work on the computer all day." }
    ],
    298: [
      { text: "Jag har tappat min *nyckel*.", translation: "I've lost my key." },
      { text: "*Nyckeln* ligger under mattan.", translation: "The key is under the mat." },
      { text: "Kan du ge mig *nycklarna*?", translation: "Can you give me the keys?" }
    ],
    299: [
      { text: "*Klockan* på väggen visar fel tid.", translation: "The clock on the wall shows the wrong time." },
      { text: "Jag köpte en ny *klocka* igår.", translation: "I bought a new watch yesterday." },
      { text: "*Klockan* ringde klockan sju.", translation: "The clock rang at seven." }
    ],
    300: [
      { text: "Hon bär alltid en stor *väska*.", translation: "She always carries a big bag." },
      { text: "*Väskan* min är full av böcker.", translation: "My bag is full of books." },
      { text: "Jag köpte en ny *väska* till skolan.", translation: "I bought a new bag for school." }
    ],
    301: [
      { text: "Kan du *ge* mig boken?", translation: "Can you give me the book?" },
      { text: "Han *gav* henne en present.", translation: "He gave her a gift." },
      { text: "Vi vill *ge* pengar till välgörenhet.", translation: "We want to give money to charity." }
    ],
    302: [
      { text: "Kan du *ta* den här påsen åt mig?", translation: "Can you take this bag for me?" },
      { text: "Hon *tog* bussen till jobbet.", translation: "She took the bus to work." },
      { text: "Jag måste *ta* en paus nu.", translation: "I need to take a break now." }
    ],
    303: [
      { text: "Kan du *lägga* boken på bordet?", translation: "Can you put the book on the table?" },
      { text: "Hon *lade* nycklarna i väskan.", translation: "She put the keys in the bag." },
      { text: "Jag ska *lägga* mig tidigt ikväll.", translation: "I'm going to bed early tonight." }
    ],
    304: [
      { text: "Filmen *börjar* klockan åtta.", translation: "The movie begins at eight." },
      { text: "Vi måste *börja* jobba nu.", translation: "We need to begin working now." },
      { text: "Skolan *började* i augusti.", translation: "School began in August." }
    ],
    305: [
      { text: "Jag måste *sluta* med det här projektet idag.", translation: "I need to finish this project today." },
      { text: "Mötet *slutade* tidigt.", translation: "The meeting finished early." },
      { text: "Vi ska *sluta* kursen nästa vecka.", translation: "We're going to finish the course next week." }
    ],
    306: [
      { text: "Jag *vet* inte svaret.", translation: "I don't know the answer." },
      { text: "*Vet* du var hon bor?", translation: "Do you know where she lives?" },
      { text: "Hon *visste* inte vad hon skulle säga.", translation: "She didn't know what to say." }
    ],
    307: [
      { text: "Jag *tänker* på dig.", translation: "I'm thinking of you." },
      { text: "Vad *tänker* du om det här?", translation: "What do you think about this?" },
      { text: "Han *tänkte* länge innan han svarade.", translation: "He thought for a long time before answering." }
    ],
    308: [
      { text: "Jag *förstår* inte frågan.", translation: "I don't understand the question." },
      { text: "Kan du *förstå* svenska?", translation: "Can you understand Swedish?" },
      { text: "Hon *förstod* inte varför han var arg.", translation: "She didn't understand why he was angry." }
    ],
    309: [
      { text: "Jag *minns* inte hans namn.", translation: "I don't remember his name." },
      { text: "Kan du *minnas* vad jag sa?", translation: "Can you remember what I said?" },
      { text: "Hon *mindes* min födelsedag.", translation: "She remembered my birthday." }
    ],
    310: [
      { text: "Jag *glömmer* alltid mina nycklar.", translation: "I always forget my keys." },
      { text: "*Glöm* inte att ringa mig.", translation: "Don't forget to call me." },
      { text: "Han *glömde* boken hemma.", translation: "He forgot the book at home." }
    ],
    311: [
      { text: "Kan du *hjälpa* mig med det här?", translation: "Can you help me with this?" },
      { text: "Hon *hjälper* alltid andra.", translation: "She always helps others." },
      { text: "Vi *hjälpte* grannen med trädgården.", translation: "We helped the neighbor with the garden." }
    ],
    312: [
      { text: "Jag ska *ringa* dig ikväll.", translation: "I'll call you tonight." },
      { text: "Kan du *ringa* läkaren åt mig?", translation: "Can you call the doctor for me?" },
      { text: "Hon *ringde* sin mamma varje söndag.", translation: "She called her mother every Sunday." }
    ],
    313: [
      { text: "Kan du *skicka* mig boken?", translation: "Can you send me the book?" },
      { text: "Jag *skickade* ett mejl igår.", translation: "I sent an email yesterday." },
      { text: "Vi ska *skicka* paketet imorgon.", translation: "We're going to send the package tomorrow." }
    ],
    314: [
      { text: "Jag *förlorade* min nyckel.", translation: "I lost my key." },
      { text: "Laget *förlorade* matchen igår.", translation: "The team lost the match yesterday." },
      { text: "Hon är rädd för att *förlora* jobbet.", translation: "She's afraid of losing her job." }
    ],
    315: [
      { text: "Vi hoppas *vinna* matchen idag.", translation: "We hope to win the match today." },
      { text: "Hon *vann* tävlingen förra året.", translation: "She won the competition last year." },
      { text: "Vårt lag *vinner* ofta.", translation: "Our team often wins." }
    ],
    316: [
      { text: "Tåget *anländer* klockan tio.", translation: "The train arrives at ten." },
      { text: "Vi *anlände* sent till festen.", translation: "We arrived late at the party." },
      { text: "Planet ska *anlända* om en timme.", translation: "The plane is due to arrive in an hour." }
    ],
    317: [
      { text: "Vi kan *gå in* nu.", translation: "We can enter now." },
      { text: "Hon *gick in* i rummet tyst.", translation: "She entered the room quietly." },
      { text: "Kan jag *gå in*?", translation: "Can I come in?" }
    ],
    318: [
      { text: "Tåget *åker* klockan nio.", translation: "The train departs at nine." },
      { text: "Vi måste *åka* nu för att hinna med planet.", translation: "We have to leave now to catch the plane." },
      { text: "Han *åkte* utan att säga hejdå.", translation: "He left without saying goodbye." }
    ],
    319: [
      { text: "Jag *bor* i Stockholm.", translation: "I live in Stockholm." },
      { text: "Var *bor* du?", translation: "Where do you live?" },
      { text: "De *bodde* där i många år.", translation: "They lived there for many years." }
    ],
    320: [
      { text: "Vi gillar att *promenera* i parken.", translation: "We like to walk in the park." },
      { text: "Hon *promenerar* till jobbet varje dag.", translation: "She walks to work every day." },
      { text: "Ska vi *promenera* en sväng?", translation: "Shall we go for a walk?" }
    ],
    321: [
      { text: "Jag *springer* varje morgon.", translation: "I run every morning." },
      { text: "Barnen *sprang* runt i trädgården.", translation: "The children ran around in the garden." },
      { text: "Han kan *springa* väldigt fort.", translation: "He can run very fast." }
    ],
    322: [
      { text: "Vi älskar att *simma* på sommaren.", translation: "We love to swim in summer." },
      { text: "Kan du *simma*?", translation: "Can you swim?" },
      { text: "Hon *simmade* över hela sjön.", translation: "She swam across the whole lake." }
    ],
    323: [
      { text: "Barnet lärde sig *hoppa* idag.", translation: "The child learned to jump today." },
      { text: "Han *hoppade* över staketet.", translation: "He jumped over the fence." },
      { text: "Kan du *hoppa* så högt?", translation: "Can you jump that high?" }
    ],
    324: [
      { text: "Vi älskar att *dansa* på fester.", translation: "We love to dance at parties." },
      { text: "Kan du *dansa* vals?", translation: "Can you dance the waltz?" },
      { text: "De *dansade* hela natten.", translation: "They danced all night." }
    ],
    325: [
      { text: "Hon kan *sjunga* väldigt bra.", translation: "She can sing very well." },
      { text: "Vi *sjöng* tillsammans vid lägerelden.", translation: "We sang together by the campfire." },
      { text: "Han *sjunger* i en kör.", translation: "He sings in a choir." }
    ],
    326: [
      { text: "Barnen *leker* i trädgården.", translation: "The children are playing in the garden." },
      { text: "Vill du *leka* med mig?", translation: "Do you want to play with me?" },
      { text: "De *lekte* hela eftermiddagen.", translation: "They played all afternoon." }
    ],
    327: [
      { text: "Jag gillar att *laga mat* på söndagar.", translation: "I like to cook on Sundays." },
      { text: "Kan du *laga mat* till oss ikväll?", translation: "Can you cook for us tonight?" },
      { text: "Hon *lagar mat* varje dag.", translation: "She cooks every day." }
    ],
    328: [
      { text: "Jag måste *städa* mitt rum.", translation: "I need to tidy my room." },
      { text: "Kan du *städa* köket?", translation: "Can you clean the kitchen?" },
      { text: "Vi *städade* huset innan gästerna kom.", translation: "We tidied the house before the guests arrived." }
    ],
    329: [
      { text: "De ska *bygga* ett nytt hus.", translation: "They're going to build a new house." },
      { text: "Han *byggde* ett bord av trä.", translation: "He built a table out of wood." },
      { text: "Vi *bygger* ett team tillsammans.", translation: "We're building a team together." }
    ],
    330: [
      { text: "Jag vill *ändra* mina planer.", translation: "I want to change my plans." },
      { text: "Kan vi *ändra* tiden?", translation: "Can we change the time?" },
      { text: "Hennes liv *ändrades* fullständigt.", translation: "Her life changed completely." }
    ],
    331: [
      { text: "Vi äter *ris* till middag.", translation: "We eat rice for dinner." },
      { text: "*Riset* var perfekt kokt.", translation: "The rice was cooked perfectly." },
      { text: "Han gillar *ris* med kyckling.", translation: "He likes rice with chicken." }
    ],
    332: [
      { text: "Vi lagar *pasta* ikväll.", translation: "We're making pasta tonight." },
      { text: "*Pastan* var jättegod.", translation: "The pasta was delicious." },
      { text: "Hon äter *pasta* varje vecka.", translation: "She eats pasta every week." }
    ],
    333: [
      { text: "Vi grillar *kyckling* i helgen.", translation: "We're grilling chicken this weekend." },
      { text: "*Kycklingen* smakade väldigt gott.", translation: "The chicken tasted very good." },
      { text: "Han äter aldrig *kyckling*.", translation: "He never eats chicken." }
    ],
    334: [
      { text: "Vi äter *nötkött* till söndagsmiddag.", translation: "We eat beef for Sunday dinner." },
      { text: "*Nötköttet* var mört och saftigt.", translation: "The beef was tender and juicy." },
      { text: "Han föredrar *nötkött* framför kyckling.", translation: "He prefers beef to chicken." }
    ],
    335: [
      { text: "Hon äter inte *fläskkött*.", translation: "She doesn't eat pork." },
      { text: "Vi grillade *fläskkött* igår.", translation: "We grilled pork yesterday." },
      { text: "*Fläskköttet* var lite för salt.", translation: "The pork was a bit too salty." }
    ],
    336: [
      { text: "Kan du skicka *smöret*?", translation: "Can you pass me the butter?" },
      { text: "Hon breder *smör* på brödet.", translation: "She spreads butter on the bread." },
      { text: "Vi behöver mer *smör* till kakan.", translation: "We need more butter for the cake." }
    ],
    337: [
      { text: "Vi steker fisken i *olja*.", translation: "We fry the fish in oil." },
      { text: "*Oljan* var för varm.", translation: "The oil was too hot." },
      { text: "Kan du skicka *oljan*?", translation: "Can you pass me the oil?" }
    ],
    338: [
      { text: "Kan du skicka *pepparn*?", translation: "Can you pass me the pepper?" },
      { text: "Soppan behöver lite mer *peppar*.", translation: "The soup needs a bit more pepper." },
      { text: "Hon använder mycket *peppar* i maten.", translation: "She uses a lot of pepper in the food." }
    ],
    339: [
      { text: "Vi skär *lök* till soppan.", translation: "We're cutting onion for the soup." },
      { text: "*Löken* fick mig att gråta.", translation: "The onion made me cry." },
      { text: "Han gillar inte rå *lök*.", translation: "He doesn't like raw onion." }
    ],
    340: [
      { text: "Vi behöver fler *tomater* till salladen.", translation: "We need more tomatoes for the salad." },
      { text: "*Tomaten* var mogen och röd.", translation: "The tomato was ripe and red." },
      { text: "Hon odlar *tomater* i trädgården.", translation: "She grows tomatoes in the garden." }
    ],
    341: [
      { text: "Vi steker *vitlök* i olja.", translation: "We fry garlic in oil." },
      { text: "Rätten smakar starkt av *vitlök*.", translation: "The dish tastes strongly of garlic." },
      { text: "Han älskar *vitlök* i allt han lagar.", translation: "He loves garlic in everything he cooks." }
    ],
    342: [
      { text: "Jag dricker vatten med *citron*.", translation: "I drink water with lemon." },
      { text: "*Citronen* var väldigt sur.", translation: "The lemon was very sour." },
      { text: "Hon pressade en *citron* över fisken.", translation: "She squeezed a lemon over the fish." }
    ],
    343: [
      { text: "Vi plockade *jordgubbar* i trädgården.", translation: "We picked strawberries in the garden." },
      { text: "*Jordgubbarna* var söta och röda.", translation: "The strawberries were sweet and red." },
      { text: "Hon gjorde sylt av *jordgubbar*.", translation: "She made jam from strawberries." }
    ],
    344: [
      { text: "Barnen äter *vindruvor* som mellanmål.", translation: "The children eat grapes as snacks." },
      { text: "*Vindruvorna* var gröna och söta.", translation: "The grapes were green and sweet." },
      { text: "Vi köpte en påse *vindruvor* på marknaden.", translation: "We bought a bag of grapes at the market." }
    ],
    345: [
      { text: "Hon bakade en *tårta* till min födelsedag.", translation: "She baked a cake for my birthday." },
      { text: "*Tårtan* smakade fantastiskt.", translation: "The cake tasted amazing." },
      { text: "Vi äter *tårta* på söndagar.", translation: "We eat cake on Sundays." }
    ],
    346: [
      { text: "Jag älskar mörk *choklad*.", translation: "I love dark chocolate." },
      { text: "*Chokladen* smälte i solen.", translation: "The chocolate melted in the sun." },
      { text: "Hon gav mig en ask *choklad*.", translation: "She gave me a box of chocolate." }
    ],
    347: [
      { text: "Vi äter *glass* på sommaren.", translation: "We eat ice cream in summer." },
      { text: "*Glassen* smälte fort.", translation: "The ice cream melted fast." },
      { text: "Barnen älskar *glass* med jordgubbssmak.", translation: "The children love strawberry-flavored ice cream." }
    ],
    348: [
      { text: "Vi drack *vin* till middagen.", translation: "We drank wine with dinner." },
      { text: "*Vinet* var rött och torrt.", translation: "The wine was red and dry." },
      { text: "Han samlar på *vin*.", translation: "He collects wine." }
    ],
    349: [
      { text: "Han dricker *öl* med sina vänner.", translation: "He drinks beer with his friends." },
      { text: "*Ölet* var kallt och fräscht.", translation: "The beer was cold and refreshing." },
      { text: "Vi beställde två *öl* på puben.", translation: "We ordered two beers at the pub." }
    ],
    350: [
      { text: "Kan du öppna den här *flaskan*?", translation: "Can you open this bottle?" },
      { text: "*Flaskan* var full av vatten.", translation: "The bottle was full of water." },
      { text: "Vi köpte en *flaska* vin till festen.", translation: "We bought a bottle of wine for the party." }
    ],
    351: [
      { text: "Maten står på *bordet*.", translation: "The food is on the table." },
      { text: "Vi köpte ett nytt *bord* till vardagsrummet.", translation: "We bought a new table for the living room." },
      { text: "Sätt dig vid *bordet*.", translation: "Sit down at the table." }
    ],
    352: [
      { text: "Den här *stolen* är väldigt bekväm.", translation: "This chair is very comfortable." },
      { text: "Kan du hämta en *stol* till mig?", translation: "Can you get me a chair?" },
      { text: "Vi behöver fler *stolar* till middagen.", translation: "We need more chairs for the dinner." }
    ],
    353: [
      { text: "Jag lägger mig i *sängen* klockan tio.", translation: "I get into bed at ten." },
      { text: "*Sängen* min är väldigt mjuk.", translation: "My bed is very soft." },
      { text: "Barnet sover i en liten *säng*.", translation: "The child sleeps in a small bed." }
    ],
    354: [
      { text: "Kan du stänga *dörren*?", translation: "Can you close the door?" },
      { text: "*Dörren* var låst.", translation: "The door was locked." },
      { text: "Han knackade på *dörren*.", translation: "He knocked on the door." }
    ],
    355: [
      { text: "Kan du öppna *fönstret*?", translation: "Can you open the window?" },
      { text: "*Fönstret* var smutsigt.", translation: "The window was dirty." },
      { text: "Solen sken in genom *fönstret*.", translation: "The sun shone in through the window." }
    ],
    356: [
      { text: "Tavlan hänger på *väggen*.", translation: "The picture hangs on the wall." },
      { text: "*Väggen* är målad vit.", translation: "The wall is painted white." },
      { text: "Vi satte upp en hylla på *väggen*.", translation: "We attached a shelf to the wall." }
    ],
    357: [
      { text: "*Golvet* är kallt på vintern.", translation: "The floor is cold in winter." },
      { text: "Hon tvättade *golvet* igår.", translation: "She washed the floor yesterday." },
      { text: "Barnet leker på *golvet*.", translation: "The child is playing on the floor." }
    ],
    358: [
      { text: "*Taket* läcker när det regnar.", translation: "The roof leaks when it rains." },
      { text: "Vi målade *taket* i somras.", translation: "We painted the roof this summer." },
      { text: "Snön täckte hela *taket*.", translation: "The snow covered the whole roof." }
    ],
    359: [
      { text: "Vi odlar grönsaker i *trädgården*.", translation: "We grow vegetables in the garden." },
      { text: "*Trädgården* vår är full av blommor.", translation: "Our garden is full of flowers." },
      { text: "Barnen leker i *trädgården* varje dag.", translation: "The children play in the garden every day." }
    ],
    360: [
      { text: "Bilen står i *garaget*.", translation: "The car is in the garage." },
      { text: "Vi byggde ett nytt *garage* förra året.", translation: "We built a new garage last year." },
      { text: "*Garaget* är fullt av verktyg.", translation: "The garage is full of tools." }
    ],
    361: [
      { text: "*Lampan* i vardagsrummet är väldigt fin.", translation: "The lamp in the living room is very nice." },
      { text: "Kan du tända *lampan*?", translation: "Can you turn on the lamp?" },
      { text: "Vi köpte en ny *lampa* till sovrummet.", translation: "We bought a new lamp for the bedroom." }
    ],
    362: [
      { text: "Hon ser sig i *spegeln*.", translation: "She looks at herself in the mirror." },
      { text: "*Spegeln* på badrummet är stor.", translation: "The mirror in the bathroom is big." },
      { text: "Vi satte upp en ny *spegel* i hallen.", translation: "We hung up a new mirror in the hallway." }
    ],
    363: [
      { text: "Kan du ge mig en *handduk*?", translation: "Can you give me a towel?" },
      { text: "*Handduken* var blöt.", translation: "The towel was wet." },
      { text: "Vi tvättar *handdukarna* varje vecka.", translation: "We wash the towels every week." }
    ],
    364: [
      { text: "Tvätta händerna med *tvål*.", translation: "Wash your hands with soap." },
      { text: "*Tvålen* luktade lavendel.", translation: "The soap smelled like lavender." },
      { text: "Vi behöver mer *tvål* på badrummet.", translation: "We need more soap in the bathroom." }
    ],
    365: [
      { text: "Mjölken är i *kylskåpet*.", translation: "The milk is in the fridge." },
      { text: "*Kylskåpet* vårt är nästan tomt.", translation: "Our fridge is almost empty." },
      { text: "Vi köpte ett nytt *kylskåp* igår.", translation: "We bought a new fridge yesterday." }
    ],
    366: [
      { text: "Brödet är i *ugnen*.", translation: "The bread is in the oven." },
      { text: "*Ugnen* är väldigt varm nu.", translation: "The oven is very hot now." },
      { text: "Hon satte kakan i *ugnen*.", translation: "She put the cake in the oven." }
    ],
    367: [
      { text: "Vi sitter i *soffan* och tittar på TV.", translation: "We're sitting on the sofa watching TV." },
      { text: "*Soffan* är mjuk och bekväm.", translation: "The sofa is soft and comfortable." },
      { text: "Katten sover alltid i *soffan*.", translation: "The cat always sleeps on the sofa." }
    ],
    368: [
      { text: "Boken står på *hyllan*.", translation: "The book is on the shelf." },
      { text: "Vi behöver en ny *hylla* till köket.", translation: "We need a new shelf for the kitchen." },
      { text: "*Hyllan* är full av böcker.", translation: "The shelf is full of books." }
    ],
    369: [
      { text: "Han sprang upp för *trappan*.", translation: "He ran up the stairs." },
      { text: "*Trappan* är brant och smal.", translation: "The stairs are steep and narrow." },
      { text: "Var försiktig i *trappan*.", translation: "Be careful on the stairs." }
    ],
    370: [
      { text: "Vi tog *hissen* upp till femte våningen.", translation: "We took the elevator up to the fifth floor." },
      { text: "*Hissen* var trasig idag.", translation: "The elevator was broken today." },
      { text: "Han är rädd för att ta *hissen*.", translation: "He's afraid of taking the elevator." }
    ],
    371: [
      { text: "Vi har en *hund* som heter Rex.", translation: "We have a dog named Rex." },
      { text: "*Hunden* sprang efter bollen.", translation: "The dog ran after the ball." },
      { text: "Han går ut med *hunden* varje morgon.", translation: "He walks the dog every morning." }
    ],
    372: [
      { text: "*Katten* sover hela dagen.", translation: "The cat sleeps all day." },
      { text: "Vi adopterade en *katt* förra året.", translation: "We adopted a cat last year." },
      { text: "*Katten* vår är svart och vit.", translation: "Our cat is black and white." }
    ],
    373: [
      { text: "Jag hörde en *fågel* sjunga utanför.", translation: "I heard a bird singing outside." },
      { text: "*Fågeln* flög bort snabbt.", translation: "The bird flew away quickly." },
      { text: "Vi såg många *fåglar* i parken.", translation: "We saw many birds in the park." }
    ],
    374: [
      { text: "Hon rider på en *häst* varje helg.", translation: "She rides a horse every weekend." },
      { text: "*Hästen* sprang fort över fältet.", translation: "The horse ran fast across the field." },
      { text: "Vi såg *hästar* på gården.", translation: "We saw horses at the farm." }
    ],
    375: [
      { text: "Bonden har många *kor*.", translation: "The farmer has many cows." },
      { text: "*Kon* betade på fältet.", translation: "The cow grazed in the field." },
      { text: "Vi såg *kor* längs vägen.", translation: "We saw cows along the road." }
    ],
    376: [
      { text: "Det finns många *får* på berget.", translation: "There are many sheep in the mountains." },
      { text: "*Fåret* hade vit ull.", translation: "The sheep had white wool." },
      { text: "Bonden klipper *fåren* på våren.", translation: "The farmer shears the sheep in spring." }
    ],
    377: [
      { text: "Bonden har fem *grisar*.", translation: "The farmer has five pigs." },
      { text: "*Grisen* var rosa och smutsig.", translation: "The pig was pink and dirty." },
      { text: "Vi såg *grisar* på gårdsbesöket.", translation: "We saw pigs on the farm visit." }
    ],
    378: [
      { text: "*Hönan* lade ägg varje dag.", translation: "The hen laid eggs every day." },
      { text: "Vi har fem *hönor* i trädgården.", translation: "We have five hens in the garden." },
      { text: "*Hönorna* sprang runt på gårdsplanen.", translation: "The hens ran around the farmyard." }
    ],
    379: [
      { text: "Det är en *mus* i köket.", translation: "There's a mouse in the kitchen." },
      { text: "Katten jagade *musen*.", translation: "The cat chased the mouse." },
      { text: "Vi såg en liten *mus* springa förbi.", translation: "We saw a small mouse run by." }
    ],
    380: [
      { text: "Barnen har en *kanin* som husdjur.", translation: "The children have a rabbit as a pet." },
      { text: "*Kaninen* åt morötter.", translation: "The rabbit ate carrots." },
      { text: "Vi såg en vild *kanin* i trädgården.", translation: "We saw a wild rabbit in the garden." }
    ],
    381: [
      { text: "Vi planterade ett *träd* i trädgården.", translation: "We planted a tree in the garden." },
      { text: "*Trädet* är väldigt högt.", translation: "The tree is very tall." },
      { text: "Fåglarna byggde ett bo i *trädet*.", translation: "The birds built a nest in the tree." }
    ],
    382: [
      { text: "Hon gav mig en *blomma*.", translation: "She gave me a flower." },
      { text: "*Blommorna* i trädgården är vackra.", translation: "The flowers in the garden are beautiful." },
      { text: "Vi planterade nya *blommor* i vår.", translation: "We planted new flowers in spring." }
    ],
    383: [
      { text: "*Gräset* är grönt på sommaren.", translation: "The grass is green in summer." },
      { text: "Barnen leker på *gräset*.", translation: "The children are playing on the grass." },
      { text: "Vi klipper *gräset* varje vecka.", translation: "We mow the grass every week." }
    ],
    384: [
      { text: "Vi klättrade upp på *berget* igår.", translation: "We climbed the mountain yesterday." },
      { text: "*Berget* var täckt av snö.", translation: "The mountain was covered in snow." },
      { text: "Utsikten från *berget* var fantastisk.", translation: "The view from the mountain was fantastic." }
    ],
    385: [
      { text: "*Floden* rinner genom staden.", translation: "The river runs through the city." },
      { text: "Vi fiskade i *floden* igår.", translation: "We fished in the river yesterday." },
      { text: "Barnen simmade i *floden*.", translation: "The children swam in the river." }
    ],
    386: [
      { text: "Vi bor nära *havet*.", translation: "We live near the sea." },
      { text: "*Havet* var lugnt idag.", translation: "The sea was calm today." },
      { text: "De seglade över *havet*.", translation: "They sailed across the sea." }
    ],
    387: [
      { text: "Vi simmar i *sjön* på sommaren.", translation: "We swim in the lake in summer." },
      { text: "*Sjön* var stilla och klar.", translation: "The lake was calm and clear." },
      { text: "Stugan ligger vid en liten *sjö*.", translation: "The cabin is by a small lake." }
    ],
    388: [
      { text: "Vi tog en promenad i *skogen*.", translation: "We went for a walk in the forest." },
      { text: "*Skogen* var full av träd och fåglar.", translation: "The forest was full of trees and birds." },
      { text: "Barnen plockade svamp i *skogen*.", translation: "The children picked mushrooms in the forest." }
    ],
    389: [
      { text: "Vi tillbringade hela dagen på *stranden*.", translation: "We spent the whole day at the beach." },
      { text: "*Stranden* var full av folk.", translation: "The beach was full of people." },
      { text: "Barnen byggde sandslott på *stranden*.", translation: "The children built sandcastles on the beach." }
    ],
    390: [
      { text: "*Himlen* är blå idag.", translation: "The sky is blue today." },
      { text: "Vi såg stjärnorna på *himlen*.", translation: "We saw the stars in the sky." },
      { text: "*Himlen* blev röd vid solnedgången.", translation: "The sky turned red at sunset." }
    ],
    391: [
      { text: "Hon är *trettio* år gammal.", translation: "She's thirty years old." },
      { text: "Vi väntade i *trettio* minuter.", translation: "We waited thirty minutes." },
      { text: "Det är *trettio* dagar i april.", translation: "There are thirty days in April." }
    ],
    392: [
      { text: "Han är *fyrtio* år gammal.", translation: "He's forty years old." },
      { text: "Vi körde i *fyrtio* minuter.", translation: "We drove for forty minutes." },
      { text: "Biljetten kostade *fyrtio* kronor.", translation: "The ticket cost forty kronor." }
    ],
    393: [
      { text: "Mormor är *femtio* år gammal.", translation: "Grandmother is fifty years old." },
      { text: "Vi väntade i *femtio* minuter på planet.", translation: "We waited fifty minutes for the plane." },
      { text: "Det var *femtio* gäster på bröllopet.", translation: "There were fifty guests at the wedding." }
    ],
    394: [
      { text: "Det är *hundra* år sedan huset byggdes.", translation: "It's a hundred years since the house was built." },
      { text: "Vi betalade *hundra* kronor för biljetten.", translation: "We paid a hundred kronor for the ticket." },
      { text: "Det var *hundra* människor på konserten.", translation: "There were a hundred people at the concert." }
    ],
    395: [
      { text: "Staden har över *tusen* invånare.", translation: "The town has over a thousand inhabitants." },
      { text: "Vi betalade *tusen* kronor för resan.", translation: "We paid a thousand kronor for the trip." },
      { text: "Det var *tusen* stjärnor på himlen.", translation: "There were a thousand stars in the sky." }
    ],
    396: [
      { text: "Himlen är *grå* idag.", translation: "The sky is grey today." },
      { text: "Han har en *grå* bil.", translation: "He has a grey car." },
      { text: "Katten hennes är *grå* och vit.", translation: "Her cat is grey and white." }
    ],
    397: [
      { text: "Det här är min *första* dag på jobbet.", translation: "This is my first day at work." },
      { text: "Vi bor på *första* våningen.", translation: "We live on the first floor." },
      { text: "Hon kom *först* i loppet.", translation: "She came first in the race." }
    ],
    398: [
      { text: "Det här är den *sista* dagen på semestern.", translation: "This is the last day of the holiday." },
      { text: "Han var den *sista* som gick.", translation: "He was the last one to leave." },
      { text: "Det var det *sista* äpplet i korgen.", translation: "It was the last apple in the basket." }
    ],
    399: [
      { text: "Vi delade kakan i två *hälfter*.", translation: "We divided the cake into two halves." },
      { text: "Jag åt bara en *hälft* av äpplet.", translation: "I only ate half of the apple." },
      { text: "Den andra *hälften* av filmen var bättre.", translation: "The second half of the movie was better." }
    ],
    400: [
      { text: "Vad är *numret* ditt?", translation: "What's your number?" },
      { text: "Vi bor på *nummer* tio.", translation: "We live at number ten." },
      { text: "Kan du ge mig *numret* hennes?", translation: "Can you give me her number?" }
    ],
    401: [
      { text: "Jag är *rädd* för spindlar.", translation: "I'm afraid of spiders." },
      { text: "Hon blev *rädd* av blixten.", translation: "She got scared by the lightning." },
      { text: "Var inte *rädd*, allt kommer bli bra.", translation: "Don't be afraid, everything's fine." }
    ],
    402: [
      { text: "Jag blev väldigt *förvånad* över presenten.", translation: "I was very surprised by the gift." },
      { text: "Hon såg *förvånad* ut.", translation: "She looked surprised." },
      { text: "Vi var *förvånade* över resultatet.", translation: "We were surprised by the result." }
    ],
    403: [
      { text: "Jag är *uttråkad* på det här spelet.", translation: "I'm bored of this game." },
      { text: "Barnen blev *uttråkade* efter en timme.", translation: "The children got bored after an hour." },
      { text: "Hon såg *uttråkad* ut på lektionen.", translation: "She looked bored in class." }
    ],
    404: [
      { text: "Hon är alltid *lugn* i svåra situationer.", translation: "She's always calm in difficult situations." },
      { text: "Havet var *lugnt* idag.", translation: "The sea was calm today." },
      { text: "Vi hade en *lugn* kväll hemma.", translation: "We had a calm evening at home." }
    ],
    405: [
      { text: "Jag är väldigt *stolt* över dig.", translation: "I'm very proud of you." },
      { text: "Han var *stolt* över sin prestation.", translation: "He was proud of his achievement." },
      { text: "Föräldrarna var *stolta* över sina barn.", translation: "The parents were proud of their children." }
    ],
    406: [
      { text: "Han är väldigt *stark*.", translation: "He's very strong." },
      { text: "Kaffet var för *starkt* för mig.", translation: "The coffee was too strong for me." },
      { text: "Hon har *starka* armar.", translation: "She has strong arms." }
    ],
    407: [
      { text: "Han kände sig *svag* efter sjukdomen.", translation: "He felt weak after the illness." },
      { text: "Signalen är *svag* här.", translation: "The signal is weak here." },
      { text: "Teet var lite *svagt*.", translation: "The tea was a bit weak." }
    ],
    408: [
      { text: "Utsikten var *vacker*.", translation: "The view was beautiful." },
      { text: "Hon har ett *vackert* leende.", translation: "She has a beautiful smile." },
      { text: "Blommorna i trädgården är *vackra*.", translation: "The flowers in the garden are beautiful." }
    ],
    409: [
      { text: "Den där byggnaden är ganska *ful*.", translation: "That building is quite ugly." },
      { text: "Han hade ett *fult* sår på armen.", translation: "He had an ugly wound on his arm." },
      { text: "Vädret var *fult* igår.", translation: "The weather was ugly yesterday." }
    ],
    410: [
      { text: "Hon är fortfarande väldigt *ung*.", translation: "She's still very young." },
      { text: "Han var *ung* när han flyttade hemifrån.", translation: "He was young when he moved out." },
      { text: "De *unga* gillar att resa mycket.", translation: "Young people like to travel a lot." }
    ],
    411: [
      { text: "Hans familj är väldigt *rik*.", translation: "His family is very rich." },
      { text: "Han blev *rik* av att sälja huset.", translation: "He became rich from selling the house." },
      { text: "Landet är *rikt* på naturresurser.", translation: "The country is rich in natural resources." }
    ],
    412: [
      { text: "Många människor där är *fattiga*.", translation: "Many people there are poor." },
      { text: "Familjen var *fattig* men lycklig.", translation: "The family was poor but happy." },
      { text: "Han växte upp i ett *fattigt* område.", translation: "He grew up in a poor neighborhood." }
    ],
    413: [
      { text: "Köket är helt *rent* nu.", translation: "The kitchen is completely clean now." },
      { text: "Vattnet i sjön är *rent*.", translation: "The water in the lake is clean." },
      { text: "Hon gillar ett *rent* hem.", translation: "She likes a clean home." }
    ],
    414: [
      { text: "Skorna mina är väldigt *smutsiga*.", translation: "My shoes are very dirty." },
      { text: "Golvet var *smutsigt* efter festen.", translation: "The floor was dirty after the party." },
      { text: "Han hade *smutsiga* händer från trädgårdsarbetet.", translation: "He had dirty hands from gardening." }
    ],
    415: [
      { text: "Filmen var väldigt *rolig*.", translation: "The movie was very funny." },
      { text: "Han berättar alltid *roliga* historier.", translation: "He always tells funny stories." },
      { text: "Det var ett *roligt* spel.", translation: "It was a funny game." }
    ],
    416: [
      { text: "*Vägen* var full av bilar.", translation: "The road was full of cars." },
      { text: "Vi körde på en smal *väg*.", translation: "We drove on a narrow road." },
      { text: "Vilken *väg* ska vi ta?", translation: "Which road should we take?" }
    ],
    417: [
      { text: "Vi körde över *bron* till staden.", translation: "We drove over the bridge to the city." },
      { text: "*Bron* är väldigt gammal.", translation: "The bridge is very old." },
      { text: "Det är en fin utsikt från *bron*.", translation: "There's a nice view from the bridge." }
    ],
    418: [
      { text: "Vi tog en *taxi* till flygplatsen.", translation: "We took a taxi to the airport." },
      { text: "*Taxin* kom snabbt.", translation: "The taxi arrived quickly." },
      { text: "Kan du ringa efter en *taxi*?", translation: "Can you call for a taxi?" }
    ],
    419: [
      { text: "Mitt *bagage* försvann på flygplatsen.", translation: "My luggage got lost at the airport." },
      { text: "Vi packade *bagaget* kvällen innan.", translation: "We packed the luggage the evening before." },
      { text: "*Bagaget* var för tungt.", translation: "The luggage was too heavy." }
    ],
    420: [
      { text: "Kom ihåg att ta med *passet* ditt.", translation: "Remember to bring your passport." },
      { text: "Jag tappade mitt *pass* förra året.", translation: "I lost my passport last year." },
      { text: "*Passet* mitt går ut nästa år.", translation: "My passport expires next year." }
    ],
    421: [
      { text: "*Flyget* var långt och tröttsamt.", translation: "The flight was long and tiring." },
      { text: "Vi bokade ett *flyg* till Rom.", translation: "We booked a flight to Rome." },
      { text: "*Flyget* blev försenat på grund av vädret.", translation: "The flight was delayed because of the weather." }
    ],
    422: [
      { text: "Är den här *platsen* ledig?", translation: "Is this seat free?" },
      { text: "Jag satt på en *plats* vid fönstret.", translation: "I sat in a seat by the window." },
      { text: "*Platserna* på planet var trånga.", translation: "The seats on the plane were cramped." }
    ],
    423: [
      { text: "*Föraren* körde väldigt försiktigt.", translation: "The driver drove very carefully." },
      { text: "Han jobbar som *förare* för ett företag.", translation: "He works as a driver for a company." },
      { text: "Vi tackade *föraren* när vi klev av.", translation: "We thanked the driver when we got off." }
    ],
    424: [
      { text: "Det var mycket *trafik* imorse.", translation: "There was a lot of traffic this morning." },
      { text: "*Trafiken* stod helt still.", translation: "The traffic was completely still." },
      { text: "Vi kom sent på grund av *trafiken*.", translation: "We were late because of the traffic." }
    ],
    425: [
      { text: "*Resan* till Sverige tog tio timmar.", translation: "The journey to Sweden took ten hours." },
      { text: "Vi planerar en lång *resa* nästa år.", translation: "We're planning a long journey next year." },
      { text: "*Resan* var full av äventyr.", translation: "The journey was full of adventures." }
    ],
    426: [
      { text: "Kan jag låna din *penna*?", translation: "Can I borrow your pen?" },
      { text: "*Pennan* min slutade skriva.", translation: "My pen stopped writing." },
      { text: "Hon skrev brevet med en blå *penna*.", translation: "She wrote the letter with a blue pen." }
    ],
    427: [
      { text: "Jag ritar alltid med *blyertspenna*.", translation: "I always draw with a pencil." },
      { text: "*Blyertspennan* min behöver vässas.", translation: "My pencil needs sharpening." },
      { text: "Kan jag få låna en *blyertspenna*?", translation: "Can I borrow a pencil?" }
    ],
    428: [
      { text: "Kan du ge mig ett *papper*?", translation: "Can you give me a piece of paper?" },
      { text: "*Pappret* var fullt av anteckningar.", translation: "The paper was full of notes." },
      { text: "Vi behöver mer *papper* till skrivaren.", translation: "We need more paper for the printer." }
    ],
    429: [
      { text: "Jag skriver alltid i min *anteckningsbok*.", translation: "I always write in my notebook." },
      { text: "*Anteckningsboken* var full av teckningar.", translation: "The notebook was full of drawings." },
      { text: "Hon köpte en ny *anteckningsbok* till skolan.", translation: "She bought a new notebook for school." }
    ],
    430: [
      { text: "Boken ligger på *skrivbordet*.", translation: "The book is on the desk." },
      { text: "*Skrivbordet* mitt är alltid rörigt.", translation: "My desk is always messy." },
      { text: "Vi köpte ett nytt *skrivbord* till kontoret.", translation: "We bought a new desk for the office." }
    ],
    431: [
      { text: "Vi har ett *möte* klockan tio.", translation: "We have a meeting at ten." },
      { text: "*Mötet* varade i två timmar.", translation: "The meeting lasted two hours." },
      { text: "Hon förberedde sig för *mötet* igår kväll.", translation: "She prepared for the meeting last night." }
    ],
    432: [
      { text: "Jag skickade dig ett *mejl* igår.", translation: "I sent you an email yesterday." },
      { text: "Har du kollat ditt *mejl* idag?", translation: "Have you checked your email today?" },
      { text: "Vi kommunicerar mest via *mejl*.", translation: "We communicate mostly via email." }
    ],
    433: [
      { text: "Min *chef* är väldigt trevlig.", translation: "My boss is very nice." },
      { text: "*Chefen* gav oss ledigt idag.", translation: "The boss gave us the day off." },
      { text: "Hon blev *chef* för avdelningen förra året.", translation: "She became boss of the department last year." }
    ],
    434: [
      { text: "Jag får *lön* varje månad.", translation: "I get paid a salary every month." },
      { text: "*Lönen* hans ökade i år.", translation: "His salary increased this year." },
      { text: "Vi diskuterade *lönen* min med chefen.", translation: "We discussed my salary with the boss." }
    ],
    435: [
      { text: "Han jobbar på ett stort *företag*.", translation: "He works at a big company." },
      { text: "*Företaget* anställde tio nya personer.", translation: "The company hired ten new people." },
      { text: "Vi startade ett eget *företag* förra året.", translation: "We started our own company last year." }
    ],
    436: [
      { text: "Hon bröt *armen* igår.", translation: "She broke her arm yesterday." },
      { text: "Han höll barnet i *armarna*.", translation: "He held the child in his arms." },
      { text: "Jag har ont i *armen*.", translation: "My arm hurts." }
    ],
    437: [
      { text: "Han skadade *benet* i fotboll.", translation: "He injured his leg in football." },
      { text: "Hunden har fyra *ben*.", translation: "The dog has four legs." },
      { text: "Jag har ont i *benet* efter löprundan.", translation: "My leg hurts after the run." }
    ],
    438: [
      { text: "Hon skar sig i *fingret*.", translation: "She cut her finger." },
      { text: "Han pekade med *fingret* mot huset.", translation: "He pointed with his finger at the house." },
      { text: "Ringen passar på det här *fingret*.", translation: "The ring fits on this finger." }
    ],
    439: [
      { text: "Jag har ont i *ryggen* idag.", translation: "My back hurts today." },
      { text: "Han bar ryggsäcken på *ryggen*.", translation: "He carried the backpack on his back." },
      { text: "Hon ligger på *ryggen* och vilar.", translation: "She's lying on her back resting." }
    ],
    440: [
      { text: "*Hjärtat* hennes slog fort.", translation: "Her heart beat fast." },
      { text: "Han har ett gott *hjärta*.", translation: "He has a good heart." },
      { text: "Läkaren lyssnade på *hjärtat* mitt.", translation: "The doctor listened to my heart." }
    ],
    441: [
      { text: "Ta på dig *kappan*, det är kallt ute.", translation: "Put on your coat, it's cold outside." },
      { text: "*Kappan* hennes var lång och svart.", translation: "Her coat was long and black." },
      { text: "Jag köpte en ny *kappa* till vintern.", translation: "I bought a new coat for winter." }
    ],
    442: [
      { text: "Hon har på sig en fin *kjol*.", translation: "She's wearing a nice skirt." },
      { text: "*Kjolen* var röd och kort.", translation: "The skirt was red and short." },
      { text: "Jag köpte en ny *kjol* igår.", translation: "I bought a new skirt yesterday." }
    ],
    443: [
      { text: "Jag hittar bara en *strumpa*.", translation: "I can only find one sock." },
      { text: "*Strumporna* mina är alla olika.", translation: "My socks are all different." },
      { text: "Han tappade en *strumpa* i tvättmaskinen.", translation: "He lost a sock in the washing machine." }
    ],
    444: [
      { text: "Ta på dig *handskarna*, det är kallt.", translation: "Put on your gloves, it's cold." },
      { text: "Jag tappade en *handske* igår.", translation: "I lost a glove yesterday." },
      { text: "*Handskarna* hennes var gjorda av ull.", translation: "Her gloves were made of wool." }
    ],
    445: [
      { text: "Hon hade på sig en varm *halsduk*.", translation: "She wore a warm scarf." },
      { text: "*Halsduken* var blå och mjuk.", translation: "The scarf was blue and soft." },
      { text: "Jag fick en *halsduk* i present till jul.", translation: "I got a scarf as a gift for Christmas." }
    ],
    446: [
      { text: "Jag måste ta min *medicin* varje dag.", translation: "I have to take my medicine every day." },
      { text: "*Medicinen* hjälpte mot huvudvärken.", translation: "The medicine helped with the headache." },
      { text: "Läkaren skrev ut *medicin* till mig.", translation: "The doctor prescribed medicine for me." }
    ],
    447: [
      { text: "Barnet har hög *feber* idag.", translation: "The child has a high fever today." },
      { text: "*Febern* gick ner efter medicinen.", translation: "The fever went down after the medicine." },
      { text: "Hon stannade hemma på grund av *feber*.", translation: "She stayed home because of a fever." }
    ],
    448: [
      { text: "Jag känner *smärta* i ryggen.", translation: "I feel pain in my back." },
      { text: "*Smärtan* försvann efter vila.", translation: "The pain disappeared after rest." },
      { text: "Hon hade stark *smärta* i magen.", translation: "She had strong pain in her stomach." }
    ],
    449: [
      { text: "Han har haft *hosta* i en vecka.", translation: "He has had a cough for a week." },
      { text: "*Hostan* hennes blev värre på natten.", translation: "Her cough got worse at night." },
      { text: "Jag tog medicin mot *hostan*.", translation: "I took medicine for the cough." }
    ],
    450: [
      { text: "Läkaren tog ett prov av mitt *blod*.", translation: "The doctor took a sample of my blood." },
      { text: "*Blodet* rann från såret.", translation: "The blood flowed from the cut." },
      { text: "Han donerade *blod* igår.", translation: "He donated blood yesterday." }
    ],
    451: [
      { text: "Jag betalar alltid med *kontanter*.", translation: "I always pay with cash." },
      { text: "Har du *kontanter* på dig?", translation: "Do you have cash on you?" },
      { text: "Affären tar inte längre emot *kontanter*.", translation: "The shop no longer accepts cash." }
    ],
    452: [
      { text: "Jag betalade med *kreditkort*.", translation: "I paid with credit card." },
      { text: "Mitt *kreditkort* blev nekat.", translation: "My credit card was declined." },
      { text: "Kan jag använda *kreditkort* här?", translation: "Can I use a credit card here?" }
    ],
    453: [
      { text: "Vi fick *rabatt* på hotellet.", translation: "We got a discount on the hotel." },
      { text: "*Rabatten* var tjugo procent.", translation: "The discount was twenty percent." },
      { text: "Affären gav *rabatt* till studenter.", translation: "The shop gave a discount to students." }
    ],
    454: [
      { text: "Han är en trogen *kund*.", translation: "He's a loyal customer." },
      { text: "*Kunden* klagade på priset.", translation: "The customer complained about the price." },
      { text: "Vi har många nya *kunder* i år.", translation: "We have many new customers this year." }
    ],
    455: [
      { text: "Hon gav mig en fin *present*.", translation: "She gave me a nice gift." },
      { text: "*Presenten* var inslagen i rött papper.", translation: "The gift was wrapped in red paper." },
      { text: "Vi köpte en *present* till hans födelsedag.", translation: "We bought a gift for his birthday." }
    ],
    456: [
      { text: "Jag älskar att lyssna på *musik*.", translation: "I love listening to music." },
      { text: "*Musiken* på festen var fantastisk.", translation: "The music at the party was fantastic." },
      { text: "Hon spelar klassisk *musik*.", translation: "She plays classical music." }
    ],
    457: [
      { text: "Den här *sången* är min favorit.", translation: "This song is my favorite." },
      { text: "Vi sjöng en gammal *sång* tillsammans.", translation: "We sang an old song together." },
      { text: "*Sången* handlar om kärlek.", translation: "The song is about love." }
    ],
    458: [
      { text: "Vi såg en spännande *film* igår.", translation: "We watched an exciting film yesterday." },
      { text: "*Filmen* varade i två timmar.", translation: "The film lasted two hours." },
      { text: "Vilken *film* vill du se ikväll?", translation: "Which film do you want to watch tonight?" }
    ],
    459: [
      { text: "Barnen spelar ett roligt *spel*.", translation: "The children are playing a fun game." },
      { text: "*Spelet* varade hela kvällen.", translation: "The game lasted all evening." },
      { text: "Vi köpte ett nytt *spel* till hans födelsedag.", translation: "We bought a new game for his birthday." }
    ],
    460: [
      { text: "Vi ska ha en *fest* på lördag.", translation: "We're having a party on Saturday." },
      { text: "*Festen* var väldigt trevlig.", translation: "The party was very nice." },
      { text: "Hon bjöd in alla sina vänner till *festen*.", translation: "She invited all her friends to the party." }
    ],
    461: [
      { text: "Han spelar *fotboll* varje helg.", translation: "He plays football every weekend." },
      { text: "*Fotboll* är den mest populära sporten här.", translation: "Football is the most popular sport here." },
      { text: "Pojken drömmer om att bli proffs i *fotboll*.", translation: "The boy dreams of becoming a professional in football." }
    ],
    462: [
      { text: "Vi spelar *tennis* varje tisdag.", translation: "We play tennis every Tuesday." },
      { text: "Hon är väldigt duktig i *tennis*.", translation: "She's very good at tennis." },
      { text: "Han lärde sig *tennis* som barn.", translation: "He learned tennis as a child." }
    ],
    463: [
      { text: "Han gillar alla sorters *sport*.", translation: "He likes all kinds of sport." },
      { text: "*Sport* är viktigt för hälsan.", translation: "Sport is important for health." },
      { text: "Vilken *sport* håller du på med?", translation: "What sport do you do?" }
    ],
    464: [
      { text: "Vårt *lag* vann matchen igår.", translation: "Our team won the match yesterday." },
      { text: "Hon spelar för ett lokalt *lag*.", translation: "She plays for a local team." },
      { text: "*Laget* tränade varje dag inför mästerskapet.", translation: "The team trained every day before the championship." }
    ],
    465: [
      { text: "Barnet kastade *bollen* över staketet.", translation: "The child threw the ball over the fence." },
      { text: "Vi spelade med en röd *boll*.", translation: "We played with a red ball." },
      { text: "*Bollen* träffade fönstret.", translation: "The ball hit the window." }
    ],
    466: [
      { text: "Han spelar *gitarr* väldigt bra.", translation: "He plays guitar very well." },
      { text: "*Gitarren* min behöver nya strängar.", translation: "My guitar needs new strings." },
      { text: "Hon lärde sig *gitarr* förra året.", translation: "She learned guitar last year." }
    ],
    467: [
      { text: "Hon spelar *piano* varje dag.", translation: "She plays piano every day." },
      { text: "*Pianot* står i vardagsrummet.", translation: "The piano is in the living room." },
      { text: "Han övar *piano* efter skolan.", translation: "He practices piano after school." }
    ],
    468: [
      { text: "Kan du ta ett *foto* av oss?", translation: "Can you take a photo of us?" },
      { text: "*Fotot* var väldigt fint.", translation: "The photo was very nice." },
      { text: "Vi tog många *foton* på resan.", translation: "We took many photos on the trip." }
    ],
    469: [
      { text: "Min *hobby* är att måla.", translation: "My hobby is painting." },
      { text: "Han har många *hobbyer*.", translation: "He has many hobbies." },
      { text: "Vad är din *hobby*?", translation: "What's your hobby?" }
    ],
    470: [
      { text: "Vi åker på *semester* i sommar.", translation: "We're going on holiday this summer." },
      { text: "*Semestern* var alldeles för kort.", translation: "The holiday was far too short." },
      { text: "Vart ska du på *semester* i år?", translation: "Where are you going on holiday this year?" }
    ],
    471: [
      { text: "Jag använder *internet* varje dag.", translation: "I use the internet every day." },
      { text: "*Internet* var nere igår.", translation: "The internet was down yesterday." },
      { text: "Vi kollade priset på *internet*.", translation: "We checked the price on the internet." }
    ],
    472: [
      { text: "Den här *webbplatsen* är väldigt användbar.", translation: "This website is very useful." },
      { text: "Vi gjorde en ny *webbplats* för företaget.", translation: "We made a new website for the company." },
      { text: "*Webbplatsen* var lätt att använda.", translation: "The website was easy to use." }
    ],
    473: [
      { text: "Jag har glömt mitt *lösenord*.", translation: "I've forgotten my password." },
      { text: "*Lösenordet* måste ha minst åtta tecken.", translation: "The password must have at least eight characters." },
      { text: "Dela inte ditt *lösenord* med andra.", translation: "Don't share your password with others." }
    ],
    474: [
      { text: "*Skärmen* min är spräckt.", translation: "My screen is cracked." },
      { text: "Vi köpte en ny *skärm* till datorn.", translation: "We bought a new screen for the computer." },
      { text: "Texten på *skärmen* var för liten.", translation: "The text on the screen was too small." }
    ],
    475: [
      { text: "*Tangentbordet* mitt slutar fungera.", translation: "My keyboard is stopping working." },
      { text: "Han skrev snabbt på *tangentbordet*.", translation: "He typed quickly on the keyboard." },
      { text: "Vi köpte ett nytt *tangentbord* igår.", translation: "We bought a new keyboard yesterday." }
    ],
    476: [
      { text: "Jag fick ett *meddelande* från henne idag.", translation: "I got a message from her today." },
      { text: "Kan du skicka mig ett *meddelande*?", translation: "Can you send me a message?" },
      { text: "*Meddelandet* var kort men trevligt.", translation: "The message was short but nice." }
    ],
    477: [
      { text: "Jag ser på *nyheterna* varje kväll.", translation: "I watch the news every evening." },
      { text: "*Nyheterna* idag var sorgliga.", translation: "The news today was sad." },
      { text: "Har du hört *nyheterna*?", translation: "Have you heard the news?" }
    ],
    478: [
      { text: "Vi tittar på *tv* på kvällen.", translation: "We watch TV in the evening." },
      { text: "*Tv:n* vår är ganska gammal.", translation: "Our TV is quite old." },
      { text: "Kan du stänga av *tv:n*?", translation: "Can you turn off the TV?" }
    ],
    479: [
      { text: "Jag lyssnar på *radio* i bilen.", translation: "I listen to the radio in the car." },
      { text: "*Radion* spelade musik hela dagen.", translation: "The radio played music all day." },
      { text: "Han köpte en gammal *radio* på loppmarknaden.", translation: "He bought an old radio at the flea market." }
    ],
    480: [
      { text: "Hon köpte en ny *kamera* förra året.", translation: "She bought a new camera last year." },
      { text: "*Kameran* min tar fina bilder.", translation: "My camera takes nice pictures." },
      { text: "Han glömde *kameran* hemma.", translation: "He forgot the camera at home." }
    ],
    481: [
      { text: "Jag gillar *också* kaffe.", translation: "I also like coffee." },
      { text: "Hon kommer *också* ikväll.", translation: "She's also coming tonight." },
      { text: "Vi måste *också* komma ihåg att köpa bröd.", translation: "We also need to remember to buy bread." }
    ],
    482: [
      { text: "Jag har *bara* fem minuter.", translation: "I only have five minutes." },
      { text: "Det kostade *bara* hundra kronor.", translation: "It only cost a hundred kronor." },
      { text: "Hon åt *bara* lite av maten.", translation: "She only ate a little of the food." }
    ],
    483: [
      { text: "Jag är *mycket* glad idag.", translation: "I'm very happy today." },
      { text: "Det var *mycket* kallt igår.", translation: "It was very cold yesterday." },
      { text: "Hon är *mycket* duktig i matte.", translation: "She's very good at math." }
    ],
    484: [
      { text: "*Kanske* kan vi träffas imorgon.", translation: "Maybe we can meet tomorrow." },
      { text: "Hon kommer *kanske* på festen.", translation: "She might come to the party." },
      { text: "*Kanske* blir det sol imorgon.", translation: "Maybe it'll be sunny tomorrow." }
    ],
    485: [
      { text: "Jag har *redan* ätit.", translation: "I've already eaten." },
      { text: "Är du *redan* klar?", translation: "Are you already done?" },
      { text: "Hon har *redan* åkt hem.", translation: "She has already gone home." }
    ],
    486: [
      { text: "Vi börjar det nya året i *januari*.", translation: "We start the new year in January." },
      { text: "Det är kallt i *januari*.", translation: "It's cold in January." },
      { text: "Min födelsedag är i *januari*.", translation: "My birthday is in January." }
    ],
    487: [
      { text: "*Februari* är den kortaste månaden.", translation: "February is the shortest month." },
      { text: "Vi åker till fjällen i *februari*.", translation: "We're going to the mountains in February." },
      { text: "Skolan har sportlov i *februari*.", translation: "School has winter break in February." }
    ],
    488: [
      { text: "Våren börjar i *mars*.", translation: "Spring begins in March." },
      { text: "Hon föddes i *mars*.", translation: "She was born in March." },
      { text: "Vi planerar en resa i *mars*.", translation: "We're planning a trip in March." }
    ],
    489: [
      { text: "Det regnar mycket i *april*.", translation: "It rains a lot in April." },
      { text: "Påsken är ofta i *april*.", translation: "Easter is often in April." },
      { text: "Vi firar hans födelsedag i *april*.", translation: "We celebrate his birthday in April." }
    ],
    490: [
      { text: "*Maj* är en av de finaste månaderna.", translation: "May is one of the nicest months." },
      { text: "Studenten firas i *maj*.", translation: "Graduation is celebrated in May." },
      { text: "Blommorna blommar i *maj*.", translation: "The flowers bloom in May." }
    ],
    491: [
      { text: "Skolan slutar i *juni*.", translation: "School ends in June." },
      { text: "Sommaren börjar i *juni*.", translation: "Summer begins in June." },
      { text: "Vi gifter oss i *juni*.", translation: "We're getting married in June." }
    ],
    492: [
      { text: "*Juli* är den varmaste månaden.", translation: "July is the hottest month." },
      { text: "Vi åker på semester i *juli*.", translation: "We're going on holiday in July." },
      { text: "Hon har ledigt hela *juli*.", translation: "She has time off all of July." }
    ],
    493: [
      { text: "Skolan börjar igen i *augusti*.", translation: "School starts again in August." },
      { text: "Vi firar festivalen i *augusti*.", translation: "We celebrate the festival in August." },
      { text: "Det är fortfarande varmt i *augusti*.", translation: "It's still hot in August." }
    ],
    494: [
      { text: "Hösten börjar i *september*.", translation: "Autumn begins in September." },
      { text: "Vi flyttade hit i *september*.", translation: "We moved here in September." },
      { text: "Löven börjar falla i *september*.", translation: "The leaves start to fall in September." }
    ],
    495: [
      { text: "Det blir kallare i *oktober*.", translation: "It gets colder in October." },
      { text: "Vi firar halloween i slutet av *oktober*.", translation: "We celebrate Halloween at the end of October." },
      { text: "Hon föddes i *oktober*.", translation: "She was born in October." }
    ],
    496: [
      { text: "*November* är ofta grå och våt.", translation: "November is often grey and wet." },
      { text: "Vi tänder ljus i *november*.", translation: "We light candles in November." },
      { text: "Det snöar ibland i *november*.", translation: "It sometimes snows in November." }
    ],
    497: [
      { text: "Vi firar jul i *december*.", translation: "We celebrate Christmas in December." },
      { text: "*December* är den mörkaste månaden.", translation: "December is the darkest month." },
      { text: "Familjen samlas i *december*.", translation: "The family gathers in December." }
    ],
    498: [
      { text: "Vilket *datum* är det idag?", translation: "What's the date today?" },
      { text: "Vi satte ett *datum* för mötet.", translation: "We set a date for the meeting." },
      { text: "*Datumet* på biljetten var fel.", translation: "The date on the ticket was wrong." }
    ],
    499: [
      { text: "Jag skrev det i min *kalender*.", translation: "I wrote it in my calendar." },
      { text: "*Kalendern* hänger på väggen.", translation: "The calendar hangs on the wall." },
      { text: "Kolla *kalendern* för lediga dagar.", translation: "Check the calendar for free days." }
    ],
    500: [
      { text: "Grattis på *födelsedagen*!", translation: "Happy birthday!" },
      { text: "Min *födelsedag* är i maj.", translation: "My birthday is in May." },
      { text: "Vi firade *födelsedagen* hennes med tårta.", translation: "We celebrated her birthday with cake." }
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
    ],
    6: [
      { text: "*Entschuldigung*, ich komme zu spät.", translation: "Sorry, I'm late." },
      { text: "*Entschuldigung*, ich habe nicht gehört.", translation: "Sorry, I didn't hear." },
      { text: "Er sagte *Entschuldigung* für den Fehler.", translation: "He said sorry for the mistake." }
    ],
    7: [
      { text: "Guten *Morgen*!", translation: "Good morning!" },
      { text: "Jeden *Morgen* trinke ich Kaffee.", translation: "Every morning I drink coffee." },
      { text: "Der *Morgen* war kalt und ruhig.", translation: "The morning was cold and quiet." }
    ],
    8: [
      { text: "Guten *Abend*!", translation: "Good evening!" },
      { text: "Am *Abend* lese ich ein Buch.", translation: "In the evening I read a book." },
      { text: "Wir essen am *Abend* gemeinsam.", translation: "We eat together in the evening." }
    ],
    9: [
      { text: "Es ist ein schöner *Tag* heute.", translation: "It's a nice day today." },
      { text: "Jeden *Tag* gehe ich spazieren.", translation: "Every day I go for a walk." },
      { text: "Der *Tag* war lang und anstrengend.", translation: "The day was long and tiring." }
    ],
    10: [
      { text: "Gute *Nacht*!", translation: "Good night!" },
      { text: "Ich schlafe gut in der *Nacht*.", translation: "I sleep well at night." },
      { text: "Die *Nacht* war voller Sterne.", translation: "The night was full of stars." }
    ],
    11: [
      { text: "Kann ich ein Glas *Wasser* haben?", translation: "Can I have a glass of water?" },
      { text: "Das *Wasser* ist kalt und frisch.", translation: "The water is cold and fresh." },
      { text: "Er trinkt viel *Wasser* jeden Tag.", translation: "He drinks a lot of water every day." }
    ],
    12: [
      { text: "Das *Essen* war sehr gut.", translation: "The food was very good." },
      { text: "*Essen* ist wichtig für die Gesundheit.", translation: "Food is important for health." },
      { text: "Sie hat das *Essen* selbst gekocht.", translation: "She cooked the food herself." }
    ],
    13: [
      { text: "Ich trinke jeden Morgen *Kaffee*.", translation: "I drink coffee every morning." },
      { text: "Eine Tasse *Kaffee*, bitte.", translation: "A cup of coffee, please." },
      { text: "Der *Kaffee* ist heiß und stark.", translation: "The coffee is hot and strong." }
    ],
    14: [
      { text: "Wir kaufen *Brot* beim Bäcker.", translation: "We buy bread at the bakery." },
      { text: "Das *Brot* ist frisch und weich.", translation: "The bread is fresh and soft." },
      { text: "Er isst *Brot* zum Frühstück.", translation: "He eats bread for breakfast." }
    ],
    15: [
      { text: "Sie wohnen in einem großen *Haus*.", translation: "They live in a big house." },
      { text: "Unser *Haus* hat drei Stockwerke.", translation: "Our house has three floors." },
      { text: "Das *Haus* liegt am Meer.", translation: "The house is by the sea." }
    ],
    16: [
      { text: "Er fährt ein rotes *Auto*.", translation: "He drives a red car." },
      { text: "Das *Auto* ist draußen geparkt.", translation: "The car is parked outside." },
      { text: "Wir wollen ein neues *Auto* kaufen.", translation: "We're going to buy a new car." }
    ],
    17: [
      { text: "Ich lese ein spannendes *Buch*.", translation: "I'm reading an exciting book." },
      { text: "Das *Buch* liegt auf dem Tisch.", translation: "The book is on the table." },
      { text: "Sie mag *Bücher* über Abenteuer.", translation: "She likes books about adventures." }
    ],
    18: [
      { text: "Er ist mein bester *Freund*.", translation: "He's my best friend." },
      { text: "Wir treffen *Freunde* am Wochenende.", translation: "We meet friends on the weekend." },
      { text: "Mein *Freund* wohnt nebenan.", translation: "My friend lives next door." }
    ],
    19: [
      { text: "Meine *Familie* ist groß und nett.", translation: "My family is big and nice." },
      { text: "Wir versammeln uns als *Familie* jedes Weihnachten.", translation: "We gather as a family every Christmas." },
      { text: "Die *Familie* isst zusammen zu Abend.", translation: "The family eats dinner together." }
    ],
    20: [
      { text: "Ich gehe jeden Tag zur *Schule*.", translation: "I go to school every day." },
      { text: "Die *Schule* liegt in der Nähe meines Hauses.", translation: "The school is near my house." },
      { text: "Sie arbeitet an einer *Schule*.", translation: "She works at a school." }
    ],
    21: [
      { text: "Ein *Mann* ging an uns vorbei.", translation: "A man walked past us." },
      { text: "Der *Mann* am Fenster ist nett.", translation: "The man by the window is nice." },
      { text: "Mein *Mann* heißt Johan.", translation: "My husband's name is Johan." }
    ],
    22: [
      { text: "Eine *Frau* hat mich heute angerufen.", translation: "A woman called me today." },
      { text: "Die *Frau* war sehr höflich.", translation: "The woman was very polite." },
      { text: "Die *Frau*, die die Firma leitet, ist tüchtig.", translation: "The woman who runs the company is skilled." }
    ],
    23: [
      { text: "Das *Kind* ist sehr lieb.", translation: "That child is very kind." },
      { text: "Das *Kind* spielt im Garten.", translation: "The child is playing in the garden." },
      { text: "Wir haben drei *Kinder* zu Hause.", translation: "We have three children at home." }
    ],
    24: [
      { text: "Das *Mädchen* hat rote Haare.", translation: "The girl has red hair." },
      { text: "Ein junges *Mädchen* saß auf der Bank.", translation: "A young girl sat on the bench." },
      { text: "Mein *Mädchen* ist acht Jahre alt.", translation: "My daughter is eight years old." }
    ],
    25: [
      { text: "Der *Junge* spielt Fußball.", translation: "The boy plays football." },
      { text: "Ein kleiner *Junge* rief laut.", translation: "A small boy shouted loudly." },
      { text: "Mein *Junge* mag Musik.", translation: "My son likes music." }
    ],
    26: [
      { text: "Meine *Mutter* ist Lehrerin.", translation: "My mother is a teacher." },
      { text: "Die *Mutter* kocht jeden Abend.", translation: "Mother cooks every evening." },
      { text: "Ich rufe meine *Mutter* oft an.", translation: "I call my mother often." }
    ],
    27: [
      { text: "Mein *Vater* arbeitet als Ingenieur.", translation: "My father works as an engineer." },
      { text: "Der *Vater* fährt uns zur Schule.", translation: "Father drives us to school." },
      { text: "Ich bin stolz auf meinen *Vater*.", translation: "I'm proud of my father." }
    ],
    28: [
      { text: "Meine *Schwester* ist drei Jahre jünger.", translation: "My sister is three years younger." },
      { text: "Meine *Schwester* studiert Medizin.", translation: "My sister studies medicine." },
      { text: "Ich und meine *Schwester* reisen gerne.", translation: "My sister and I like to travel." }
    ],
    29: [
      { text: "Mein *Bruder* ist größer als ich.", translation: "My brother is bigger than me." },
      { text: "Mein *Bruder* spielt Gitarre.", translation: "My brother plays guitar." },
      { text: "Ich und mein *Bruder* sind gute Freunde.", translation: "My brother and I are good friends." }
    ],
    30: [
      { text: "Meine *Großmutter* wohnt auf dem Land.", translation: "My grandmother lives in the countryside." },
      { text: "Meine *Großmutter* backt jeden Sonntag Kuchen.", translation: "My grandmother bakes cakes every Sunday." },
      { text: "Ich besuche meine *Großmutter* oft.", translation: "I visit my grandmother often." }
    ],
    31: [
      { text: "Ein *großes* Haus steht auf dem Hügel.", translation: "A big house sits on the hill." },
      { text: "Er hat einen *großen* Hund.", translation: "He has a big dog." },
      { text: "Die Stadt ist sehr *groß*.", translation: "The city is very big." }
    ],
    32: [
      { text: "Ein *kleines* Kind spielt im Park.", translation: "A small child plays in the park." },
      { text: "Sie hat einen *kleinen* Hund.", translation: "She has a small dog." },
      { text: "Das Zimmer ist ziemlich *klein*.", translation: "The room is quite small." }
    ],
    33: [
      { text: "Das ist ein *gutes* Buch.", translation: "This is a good book." },
      { text: "Das Essen schmeckt sehr *gut*.", translation: "The food tastes very good." },
      { text: "Das Wetter ist heute *gut*.", translation: "The weather is good today." }
    ],
    34: [
      { text: "Der Film war *schlecht* und langweilig.", translation: "The movie was bad and boring." },
      { text: "Er hat eine *schlechte* Angewohnheit.", translation: "He has a bad habit." },
      { text: "Das Wetter wird morgen *schlecht*.", translation: "The weather will be bad tomorrow." }
    ],
    35: [
      { text: "Ich habe ein *neues* Telefon gekauft.", translation: "I bought a new phone." },
      { text: "Das ist ein *neues* Buch aus der Bibliothek.", translation: "This is a new book from the library." },
      { text: "Wir ziehen in eine *neue* Stadt.", translation: "We're moving to a new city." }
    ],
    36: [
      { text: "Ein *alter* Mann saß auf der Bank.", translation: "An old man sat on the bench." },
      { text: "Das Haus ist *alt* und schön.", translation: "The house is old and beautiful." },
      { text: "Sie hat ein *altes* Auto.", translation: "She has an old car." }
    ],
    37: [
      { text: "*Warmer* Kaffee schmeckt im Winter gut.", translation: "Warm coffee tastes good in winter." },
      { text: "Es ist *warm* im Zimmer.", translation: "It's warm in the room." },
      { text: "Wir hatten letztes Jahr einen *warmen* Sommer.", translation: "We had a warm summer last year." }
    ],
    38: [
      { text: "Ein *kalter* Wind weht heute.", translation: "A cold wind is blowing today." },
      { text: "*Kalte* Milch ist erfrischend.", translation: "Cold milk is refreshing." },
      { text: "Es ist heute Abend *kalt* draußen.", translation: "It's cold outside tonight." }
    ],
    39: [
      { text: "Er fährt viel zu *schnell*.", translation: "He drives way too fast." },
      { text: "Sie ist eine *schnelle* Läuferin.", translation: "She's a fast runner." },
      { text: "Der Zug war sehr *schnell*.", translation: "The train was very fast." }
    ],
    40: [
      { text: "*Langsam* und stetig gewinnt das Rennen.", translation: "Slow and steady wins the race." },
      { text: "Er ging *langsam* durch den Park.", translation: "He walked slowly through the park." },
      { text: "Die Musik spielte *langsam* und sanft.", translation: "The music played slow and soft." }
    ],
    41: [
      { text: "*Ich* heiße Peter.", translation: "My name is Peter." },
      { text: "*Ich* lese gerne Bücher.", translation: "I like to read books." },
      { text: "*Ich* liebe Musik.", translation: "I love music." }
    ],
    42: [
      { text: "*Du* bist ein guter Freund.", translation: "You are a good friend." },
      { text: "Wo wohnst *du*?", translation: "Where do you live?" },
      { text: "Kommst *du* heute Abend?", translation: "Are you coming tonight?" }
    ],
    43: [
      { text: "*Er* ist Lehrer an der Schule.", translation: "He is a teacher at the school." },
      { text: "*Er* spielt jede Woche Fußball.", translation: "He plays football every week." },
      { text: "*Er* kommt aus Deutschland.", translation: "He comes from Germany." }
    ],
    44: [
      { text: "*Sie* ist eine talentierte Musikerin.", translation: "She is a talented musician." },
      { text: "*Sie* arbeitet als Ärztin.", translation: "She works as a doctor." },
      { text: "*Sie* kommt aus Spanien.", translation: "She comes from Spain." }
    ],
    45: [
      { text: "*Wir* gehen heute Abend ins Kino.", translation: "We're going to the movies tonight." },
      { text: "*Wir* wohnen in derselben Stadt.", translation: "We live in the same city." },
      { text: "*Wir* werden nach Deutschland reisen.", translation: "We're going to travel to Germany." }
    ],
    46: [
      { text: "Wohin geht *ihr* heute Abend?", translation: "Where are you all going tonight?" },
      { text: "*Ihr* seid herzlich willkommen zur Party.", translation: "You're all welcome to the party." },
      { text: "Kommt *ihr* zusammen?", translation: "Are you all coming together?" }
    ],
    47: [
      { text: "*Sie* sind sehr nette Menschen.", translation: "They are very kind people." },
      { text: "*Sie* kommen morgen.", translation: "They're coming tomorrow." },
      { text: "Ich mag *sie* sehr.", translation: "I like them very much." }
    ],
    48: [
      { text: "Das ist *mein* Buch.", translation: "This is my book." },
      { text: "*Mein* Freund heißt Lars.", translation: "My friend's name is Lars." },
      { text: "Das ist *meine* Tasche.", translation: "This is my bag." }
    ],
    49: [
      { text: "Ist das *dein* Telefon?", translation: "Is this your phone?" },
      { text: "*Deine* Familie ist nett.", translation: "Your family is nice." },
      { text: "Ich mag *deine* neue Jacke.", translation: "I like your new jacket." }
    ],
    50: [
      { text: "Das ist *unser* Haus.", translation: "This is our house." },
      { text: "*Unsere* Schule liegt nahe am Zentrum.", translation: "Our school is near the center." },
      { text: "*Unsere* Familie ist groß.", translation: "Our family is big." }
    ],
    51: [
      { text: "Ich möchte glücklich *sein*.", translation: "I want to be happy." },
      { text: "Es ist schön, zu Hause zu *sein*.", translation: "It's nice to be home." },
      { text: "Er will eines Tages Arzt *sein*.", translation: "He wants to be a doctor someday." }
    ],
    52: [
      { text: "Ich möchte eine Tasse Tee *haben*.", translation: "I want to have a cup of tea." },
      { text: "Wir *haben* nicht viel Zeit.", translation: "We don't have much time." },
      { text: "Sie wünscht sich, einen Hund zu *haben*.", translation: "She wishes to have a dog." }
    ],
    53: [
      { text: "Ich *gehe* jeden Tag zur Schule.", translation: "I go to school every day." },
      { text: "Sollen wir spazieren *gehen*?", translation: "Shall we go for a walk?" },
      { text: "Sie *geht* schnell nach Hause.", translation: "She walks home quickly." }
    ],
    54: [
      { text: "Ich *komme* bald.", translation: "I'll come soon." },
      { text: "Kannst du hierher *kommen*?", translation: "Can you come here?" },
      { text: "Er *kommt* aus Deutschland.", translation: "He comes from Germany." }
    ],
    55: [
      { text: "Was *machst* du gerade?", translation: "What are you doing now?" },
      { text: "Ich *mache* mein Bestes.", translation: "I'm doing my best." },
      { text: "Wir müssen unsere Hausaufgaben *machen*.", translation: "We have to do our homework." }
    ],
    56: [
      { text: "Ich *esse* um acht Uhr Frühstück.", translation: "I eat breakfast at eight." },
      { text: "Sollen wir heute Abend zusammen *essen*?", translation: "Shall we eat together tonight?" },
      { text: "Sie *isst* nie Fleisch.", translation: "She never eats meat." }
    ],
    57: [
      { text: "Ich *trinke* jeden Tag Wasser.", translation: "I drink water every day." },
      { text: "Was möchtest du *trinken*?", translation: "What would you like to drink?" },
      { text: "Er *trinkt* Kaffee ohne Zucker.", translation: "He drinks coffee without sugar." }
    ],
    58: [
      { text: "Ich *lese* ein spannendes Buch.", translation: "I'm reading an exciting book." },
      { text: "*Liest* du gerne?", translation: "Do you like to read?" },
      { text: "Sie *liest* jeden Morgen die Zeitung.", translation: "She reads the newspaper every morning." }
    ],
    59: [
      { text: "Ich *schreibe* einen Brief an meine Großmutter.", translation: "I'm writing a letter to my grandmother." },
      { text: "Kannst du deinen Namen hier *schreiben*?", translation: "Can you write your name here?" },
      { text: "Er *schreibt* Bücher über Geschichte.", translation: "He writes books about history." }
    ],
    60: [
      { text: "Ich *spreche* ein bisschen Deutsch.", translation: "I speak a little German." },
      { text: "Kannst du langsamer *sprechen*?", translation: "Can you speak more slowly?" },
      { text: "Sie *spricht* drei Sprachen.", translation: "She speaks three languages." }
    ],
    61: [
      { text: "Ich habe *einen* Hund.", translation: "I have a dog." },
      { text: "Dort steht *ein* Mann.", translation: "There's a man standing there." },
      { text: "Sie hat *einen* Bruder.", translation: "She has a brother." }
    ],
    62: [
      { text: "Sie kaufte *eine* Tasche.", translation: "She bought a bag." },
      { text: "Ich sah *eine* Katze auf der Straße.", translation: "I saw a cat on the street." },
      { text: "Auf dem Bauernhof lebt *eine* Ziege.", translation: "A goat lives on the farm." }
    ],
    63: [
      { text: "Ich habe *ein* Haus auf dem Land.", translation: "I have a house in the countryside." },
      { text: "Kann ich *ein* Glas Wasser haben?", translation: "Can I have a glass of water?" },
      { text: "Sie kaufte *ein* neues Auto.", translation: "She bought a new car." }
    ],
    64: [
      { text: "Der Wagen ist rot. *Er* ist neu.", translation: "The car is red. It's new." },
      { text: "Ich mag die Tasche. *Sie* ist schön.", translation: "I like the bag. It's beautiful." },
      { text: "Schau dir die Katze an. *Sie* schläft.", translation: "Look at the cat. It's sleeping." }
    ],
    65: [
      { text: "*Es* regnet draußen.", translation: "It's raining outside." },
      { text: "Das Haus ist groß. *Es* hat fünf Zimmer.", translation: "The house is big. It has five rooms." },
      { text: "*Es* ist heute kalt.", translation: "It's cold today." }
    ],
    66: [
      { text: "Ich wohne jetzt *hier*.", translation: "I live here now." },
      { text: "*Hier* sind deine Schlüssel.", translation: "Here are your keys." },
      { text: "Warte *hier*, bitte.", translation: "Wait here, please." }
    ],
    67: [
      { text: "Das Buch liegt *dort* drüben.", translation: "The book is over there." },
      { text: "Wer ist *dort*?", translation: "Who is there?" },
      { text: "Wir haben uns letztes Jahr *dort* getroffen.", translation: "We met there last year." }
    ],
    68: [
      { text: "Ich muss *jetzt* gehen.", translation: "I have to go now." },
      { text: "Was machst du *jetzt*?", translation: "What are you doing now?" },
      { text: "*Jetzt* ist es Zeit zu essen.", translation: "Now it's time to eat." }
    ],
    69: [
      { text: "Wir sprechen uns *später*.", translation: "We'll talk later." },
      { text: "Ich komme *später* am Abend.", translation: "I'll come later tonight." },
      { text: "Können wir das *später* machen?", translation: "Can we do it later?" }
    ],
    70: [
      { text: "Sie ist *immer* fröhlich.", translation: "She's always happy." },
      { text: "Ich trinke *immer* morgens Kaffee.", translation: "I always drink coffee in the morning." },
      { text: "Er kommt *immer* zu spät.", translation: "He always comes late." }
    ],
    71: [
      { text: "Was sollen wir *heute* machen?", translation: "What shall we do today?" },
      { text: "*Heute* ist schönes Wetter.", translation: "Today the weather is nice." },
      { text: "Ich habe *heute* viel zu tun.", translation: "I have a lot to do today." }
    ],
    72: [
      { text: "Wir sehen uns *morgen*!", translation: "See you tomorrow!" },
      { text: "*Morgen* reise ich nach Berlin.", translation: "Tomorrow I'll travel to Berlin." },
      { text: "Was passiert *morgen*?", translation: "What's happening tomorrow?" }
    ],
    73: [
      { text: "*Gestern* war ich auf der Arbeit.", translation: "Yesterday I was at work." },
      { text: "Wir haben *gestern* einen Film gesehen.", translation: "We watched a movie yesterday." },
      { text: "Es hat *gestern* viel geregnet.", translation: "It rained a lot yesterday." }
    ],
    74: [
      { text: "Ich arbeite fünf Tage die *Woche*.", translation: "I work five days a week." },
      { text: "Nächste *Woche* reisen wir.", translation: "Next week we're going to travel." },
      { text: "Die *Woche* war hektisch.", translation: "The week has been busy." }
    ],
    75: [
      { text: "Wir ziehen nächsten *Monat* um.", translation: "We're moving next month." },
      { text: "Jeden *Monat* zahle ich Miete.", translation: "Every month I pay rent." },
      { text: "Der *Monat* verging schnell.", translation: "The month went by quickly." }
    ],
    76: [
      { text: "Er fuhr ein *rotes* Auto.", translation: "He drove a red car." },
      { text: "Die Blume ist *rot* und schön.", translation: "The flower is red and beautiful." },
      { text: "Mir gefällt der *rote* Pullover.", translation: "I like the red sweater." }
    ],
    77: [
      { text: "Der Himmel ist heute *blau*.", translation: "The sky is blue today." },
      { text: "Sie hat *blaue* Augen.", translation: "She has blue eyes." },
      { text: "Ich habe eine *blaue* Jacke gekauft.", translation: "I bought a blue jacket." }
    ],
    78: [
      { text: "Das Gras ist im Sommer *grün*.", translation: "The grass is green in summer." },
      { text: "Er hat ein *grünes* Auto.", translation: "He has a green car." },
      { text: "Mir gefällt das *grüne* Hemd.", translation: "I like the green shirt." }
    ],
    79: [
      { text: "Die Sonne ist *gelb*.", translation: "The sun is yellow." },
      { text: "Sie hat ein *gelbes* Kleid.", translation: "She has a yellow dress." },
      { text: "Das *gelbe* Haus gehört uns.", translation: "The yellow house is ours." }
    ],
    80: [
      { text: "Die Katze ist ganz *schwarz*.", translation: "The cat is completely black." },
      { text: "Er hat ein *schwarzes* Auto.", translation: "He has a black car." },
      { text: "Ich habe *schwarze* Schuhe gekauft.", translation: "I bought black shoes." }
    ],
    81: [
      { text: "Der Schnee ist *weiß* und kalt.", translation: "The snow is white and cold." },
      { text: "Sie hat ein *weißes* Haus.", translation: "She has a white house." },
      { text: "Er trägt ein *weißes* Hemd.", translation: "He wears a white shirt." }
    ],
    82: [
      { text: "Mein Hund ist *braun*.", translation: "My dog is brown." },
      { text: "Sie hat *braune* Augen.", translation: "She has brown eyes." },
      { text: "Ich habe einen *braunen* Tisch gekauft.", translation: "I bought a brown table." }
    ],
    83: [
      { text: "Das Mädchen hat ein *rosa* Kleid.", translation: "The girl has a pink dress." },
      { text: "Die Blumen sind *rosa*.", translation: "The flowers are pink." },
      { text: "Sie hat das Zimmer *rosa* gestrichen.", translation: "She painted the room pink." }
    ],
    84: [
      { text: "Der Sonnenuntergang war *orange*.", translation: "The sunset was orange." },
      { text: "Er hat eine *orange* Jacke.", translation: "He has an orange jacket." },
      { text: "Die Orange ist *orange*.", translation: "The orange is orange." }
    ],
    85: [
      { text: "Die Blume ist *lila*.", translation: "The flower is purple." },
      { text: "Sie hat eine *lila* Tasche.", translation: "She has a purple bag." },
      { text: "Der Himmel wurde am Abend *lila*.", translation: "The sky turned purple in the evening." }
    ],
    86: [
      { text: "Die Uhr zeigt *eins*.", translation: "The clock shows one o'clock." },
      { text: "Kann ich *eins* haben?", translation: "Can I have one?" },
      { text: "Nur *eins* der Kinder kam.", translation: "Only one of the children came." }
    ],
    87: [
      { text: "Ich habe *zwei* Geschwister.", translation: "I have two siblings." },
      { text: "Es ist *zwei* Uhr.", translation: "It's two o'clock." },
      { text: "Das Haus hat *zwei* Stockwerke.", translation: "The house has two floors." }
    ],
    88: [
      { text: "Ich habe *drei* Kinder.", translation: "I have three children." },
      { text: "Es ist *drei* Uhr.", translation: "It's three o'clock." },
      { text: "Wir haben *drei* Stunden gewartet.", translation: "We waited for three hours." }
    ],
    89: [
      { text: "Der Tisch hat *vier* Stühle.", translation: "The table has four chairs." },
      { text: "Es ist *vier* Uhr.", translation: "It's four o'clock." },
      { text: "Wir sind *vier* in der Familie.", translation: "There are four of us in the family." }
    ],
    90: [
      { text: "Ich habe *fünf* Freunde hier.", translation: "I have five friends here." },
      { text: "Es ist *fünf* Uhr.", translation: "It's five o'clock." },
      { text: "Das Haus hat *fünf* Zimmer.", translation: "The house has five rooms." }
    ],
    91: [
      { text: "Es ist *sechs* Uhr.", translation: "It's six o'clock." },
      { text: "Wir sind *sechs* Personen.", translation: "We are six people." },
      { text: "Er schläft *sechs* Stunden pro Nacht.", translation: "He sleeps six hours per night." }
    ],
    92: [
      { text: "Es ist *sieben* Uhr.", translation: "It's seven o'clock." },
      { text: "Sie hat *sieben* Bücher auf dem Tisch.", translation: "She has seven books on the table." },
      { text: "Er aß *sieben* Erdbeeren.", translation: "He ate seven strawberries." }
    ],
    93: [
      { text: "Es ist *acht* Uhr.", translation: "It's eight o'clock." },
      { text: "Ich arbeite *acht* Stunden am Tag.", translation: "I work eight hours a day." },
      { text: "Wir waren *acht* Personen auf der Party.", translation: "There were eight of us at the party." }
    ],
    94: [
      { text: "Es ist *neun* Uhr.", translation: "It's nine o'clock." },
      { text: "Sie ist *neun* Jahre alt.", translation: "She's nine years old." },
      { text: "Wir haben *neun* Minuten gewartet.", translation: "We waited nine minutes." }
    ],
    95: [
      { text: "Es ist *zehn* Uhr.", translation: "It's ten o'clock." },
      { text: "Er hat *zehn* Finger.", translation: "He has ten fingers." },
      { text: "Wir haben dort *zehn* Jahre gelebt.", translation: "We lived there for ten years." }
    ],
    96: [
      { text: "*Wo* wohnst du?", translation: "Where do you live?" },
      { text: "Weißt du, *wo* das Buch ist?", translation: "Do you know where the book is?" },
      { text: "*Wo* sollen wir uns treffen?", translation: "Where shall we meet?" }
    ],
    97: [
      { text: "*Was* ist das?", translation: "What is that?" },
      { text: "*Was* machst du gerade?", translation: "What are you doing now?" },
      { text: "Ich weiß nicht, *was* ich sagen soll.", translation: "I don't know what to say." }
    ],
    98: [
      { text: "*Wer* ist das?", translation: "Who is that?" },
      { text: "*Wer* kommt heute Abend?", translation: "Who's coming tonight?" },
      { text: "Weißt du, *wer* sie ist?", translation: "Do you know who she is?" }
    ],
    99: [
      { text: "*Wann* kommst du?", translation: "When are you coming?" },
      { text: "Ich weiß nicht, *wann* der Zug fährt.", translation: "I don't know when the train leaves." },
      { text: "*Wann* hast du Geburtstag?", translation: "When is your birthday?" }
    ],
    100: [
      { text: "*Warum* bist du spät dran?", translation: "Why are you late?" },
      { text: "*Warum* magst du keinen Fisch?", translation: "Why don't you like fish?" },
      { text: "Ich weiß nicht, *warum* er gegangen ist.", translation: "I don't know why he left." }
    ],
    101: [
      { text: "*Wie* geht es dir?", translation: "How are you?" },
      { text: "*Wie* macht man dieses Gericht?", translation: "How do you make this dish?" },
      { text: "Ich weiß nicht, *wie* ich antworten soll.", translation: "I don't know how to answer." }
    ],
    102: [
      { text: "*Welches* Buch liest du?", translation: "Which book are you reading?" },
      { text: "*Welcher* Tag passt am besten?", translation: "Which day suits best?" },
      { text: "Weißt du, *welchen* Weg wir nehmen sollen?", translation: "Do you know which way we should go?" }
    ],
    103: [
      { text: "*Wie viel* kostet das?", translation: "How much does this cost?" },
      { text: "*Wie viel* Zeit haben wir?", translation: "How much time do we have?" },
      { text: "Ich weiß nicht, *wie viel* es wiegt.", translation: "I don't know how much it weighs." }
    ],
    104: [
      { text: "Ich bin glücklich, *weil* Freitag ist.", translation: "I'm happy because it's Friday." },
      { text: "Sie kam spät, *weil* der Zug verspätet war.", translation: "She came late because the train was delayed." },
      { text: "Wir blieben zu Hause, *weil* es regnete.", translation: "We stayed home because it rained." }
    ],
    105: [
      { text: "Ich möchte gehen, *aber* ich bin müde.", translation: "I want to go, but I'm tired." },
      { text: "Es ist teuer, *aber* es lohnt sich.", translation: "It's expensive, but worth it." },
      { text: "Sie rief an, *aber* ich habe nicht geantwortet.", translation: "She called, but I didn't answer." }
    ],
    106: [
      { text: "Ich mag Tee *und* Kaffee.", translation: "I like tea and coffee." },
      { text: "Er ist nett *und* klug.", translation: "He's nice and smart." },
      { text: "Wir kauften Brot, Milch *und* Eier.", translation: "We bought bread, milk and eggs." }
    ],
    107: [
      { text: "Möchtest du Tee *oder* Kaffee?", translation: "Would you like tea or coffee?" },
      { text: "Sollen wir gehen *oder* fahren?", translation: "Shall we walk or drive?" },
      { text: "Kommst du heute *oder* morgen?", translation: "Are you coming today or tomorrow?" }
    ],
    108: [
      { text: "Ich trinke Kaffee *mit* Milch.", translation: "I drink coffee with milk." },
      { text: "Sie lebt *mit* ihrer Familie.", translation: "She lives with her family." },
      { text: "Er sprach *mit* dem Lehrer.", translation: "He spoke with the teacher." }
    ],
    109: [
      { text: "Ich trinke Tee *ohne* Zucker.", translation: "I drink tea without sugar." },
      { text: "Er ging, *ohne* etwas zu sagen.", translation: "He left without saying anything." },
      { text: "Wir haben es *ohne* Hilfe geschafft.", translation: "We managed it without help." }
    ],
    110: [
      { text: "Der Brief ist *von* meiner Schwester.", translation: "The letter is from my sister." },
      { text: "Wir reisten *von* Berlin nach Hamburg.", translation: "We travelled from Berlin to Hamburg." },
      { text: "Das Geschenk ist *von* meinem Freund.", translation: "The gift is from my friend." }
    ],
    111: [
      { text: "Ich gehe *zur* Schule.", translation: "I'm going to school." },
      { text: "Kommst du *zu* meiner Party?", translation: "Are you coming to my party?" },
      { text: "Wir gehen heute Abend *zu* einem Konzert.", translation: "We're going to a concert tonight." }
    ],
    112: [
      { text: "Das Buch liegt *in* der Schublade.", translation: "The book is in the drawer." },
      { text: "Ich wohne *in* Berlin.", translation: "I live in Berlin." },
      { text: "Er ist *im* Garten.", translation: "He is in the garden." }
    ],
    113: [
      { text: "Das Buch liegt *auf* dem Tisch.", translation: "The book is on the table." },
      { text: "Die Katze sitzt *auf* dem Stuhl.", translation: "The cat is sitting on the chair." },
      { text: "Wir treffen uns *auf* dem Markt.", translation: "We're meeting at the market." }
    ],
    114: [
      { text: "Die Katze schläft *unter* dem Tisch.", translation: "The cat is sleeping under the table." },
      { text: "Die Schlüssel liegen *unter* der Matte.", translation: "The keys are under the mat." },
      { text: "Wir saßen *unter* einem Baum.", translation: "We sat under a tree." }
    ],
    115: [
      { text: "Die Lampe hängt *über* dem Tisch.", translation: "The lamp hangs above the table." },
      { text: "Das Flugzeug flog *über* den Berg.", translation: "The plane flew over the mountain." },
      { text: "Sie wohnt *über* dem Laden.", translation: "She lives above the shop." }
    ],
    116: [
      { text: "Berlin ist eine schöne *Stadt*.", translation: "Berlin is a nice city." },
      { text: "Wir wohnen in einer kleinen *Stadt*.", translation: "We live in a small city." },
      { text: "Die *Stadt* hat viele alte Gebäude.", translation: "The city has many old buildings." }
    ],
    117: [
      { text: "Wir wohnen in derselben *Straße*.", translation: "We live on the same street." },
      { text: "Die *Straße* war voller Menschen.", translation: "The street was full of people." },
      { text: "Der Laden liegt in dieser *Straße*.", translation: "The shop is on this street." }
    ],
    118: [
      { text: "Ich gehe zum *Laden*, um Milch zu kaufen.", translation: "I'm going to the shop for milk." },
      { text: "Der *Laden* öffnet um neun Uhr.", translation: "The shop opens at nine." },
      { text: "Es gibt einen neuen *Laden* im Zentrum.", translation: "There's a new shop in the center." }
    ],
    119: [
      { text: "Wir kaufen Gemüse auf dem *Markt*.", translation: "We buy vegetables at the market." },
      { text: "Der *Markt* ist samstags geöffnet.", translation: "The market is open on Saturdays." },
      { text: "Es waren viele Leute auf dem *Markt*.", translation: "There were a lot of people at the market." }
    ],
    120: [
      { text: "Wir machen einen Spaziergang im *Park*.", translation: "We're taking a walk in the park." },
      { text: "Die Kinder spielen im *Park*.", translation: "The children are playing in the park." },
      { text: "Es gibt einen großen *Park* in der Nähe des Hauses.", translation: "There's a big park near the house." }
    ],
    121: [
      { text: "Dieses *Zimmer* ist sehr hell.", translation: "This room is very bright." },
      { text: "Das Haus hat fünf *Zimmer*.", translation: "The house has five rooms." },
      { text: "Ich räume mein *Zimmer* auf.", translation: "I'm cleaning my room." }
    ],
    122: [
      { text: "Wir kochen in der *Küche*.", translation: "We cook in the kitchen." },
      { text: "Die *Küche* ist groß und hell.", translation: "The kitchen is big and bright." },
      { text: "Sie sitzt in der *Küche* und trinkt Kaffee.", translation: "She's sitting in the kitchen drinking coffee." }
    ],
    123: [
      { text: "Das *Badezimmer* ist neben dem Schlafzimmer.", translation: "The bathroom is next to the bedroom." },
      { text: "Ich dusche jeden Morgen im *Badezimmer*.", translation: "I shower in the bathroom every morning." },
      { text: "Das Haus hat zwei *Badezimmer*.", translation: "The house has two bathrooms." }
    ],
    124: [
      { text: "Mein *Schlafzimmer* ist klein, aber gemütlich.", translation: "My bedroom is small but cozy." },
      { text: "Die Kinder schlafen im gleichen *Schlafzimmer*.", translation: "The children sleep in the same bedroom." },
      { text: "Wir haben das *Schlafzimmer* blau gestrichen.", translation: "We painted the bedroom blue." }
    ],
    125: [
      { text: "Wir sehen im *Wohnzimmer* fern.", translation: "We watch TV in the living room." },
      { text: "Das *Wohnzimmer* hat ein großes Sofa.", translation: "The living room has a big sofa." },
      { text: "Die Familie versammelt sich abends im *Wohnzimmer*.", translation: "The family gathers in the living room in the evening." }
    ],
    126: [
      { text: "Ich mag *Käse* auf dem Brot.", translation: "I like cheese on bread." },
      { text: "Wir haben deutschen *Käse* auf dem Markt gekauft.", translation: "We bought German cheese at the market." },
      { text: "Der *Käse* schmeckt sehr gut.", translation: "The cheese tastes very good." }
    ],
    127: [
      { text: "Ich esse *Eier* zum Frühstück.", translation: "I eat eggs for breakfast." },
      { text: "Kannst du *Eier* im Laden kaufen?", translation: "Can you buy eggs at the shop?" },
      { text: "Das *Ei* war genau richtig gekocht.", translation: "The egg was cooked just right." }
    ],
    128: [
      { text: "Wir essen jeden Freitag *Fisch*.", translation: "We eat fish every Friday." },
      { text: "Der *Fisch* war sehr frisch.", translation: "The fish was very fresh." },
      { text: "Er fing einen großen *Fisch* im Meer.", translation: "He caught a big fish in the sea." }
    ],
    129: [
      { text: "Sie isst kein *Fleisch*.", translation: "She doesn't eat meat." },
      { text: "Wir haben *Fleisch* im Garten gegrillt.", translation: "We grilled meat in the garden." },
      { text: "Das *Fleisch* war zart und lecker.", translation: "The meat was tender and good." }
    ],
    130: [
      { text: "Wir essen *Suppe*, wenn es kalt ist.", translation: "We eat soup when it's cold." },
      { text: "Die *Suppe* war warm und gut.", translation: "The soup was warm and good." },
      { text: "Mama hat *Suppe* zum Abendessen gemacht.", translation: "Mom made soup for dinner." }
    ],
    131: [
      { text: "Ich esse jeden Tag einen *Apfel*.", translation: "I eat an apple every day." },
      { text: "Der *Apfel* war rot und süß.", translation: "The apple was red and sweet." },
      { text: "Wir haben *Äpfel* im Garten gepflückt.", translation: "We picked apples in the garden." }
    ],
    132: [
      { text: "Ich nehme eine *Banane* zum Mittagessen.", translation: "I'll have a banana for lunch." },
      { text: "Die *Banane* war reif und süß.", translation: "The banana was ripe and sweet." },
      { text: "Die Kinder mögen *Bananen* sehr.", translation: "The children like bananas a lot." }
    ],
    133: [
      { text: "Ich trinke Saft aus *Orangen*.", translation: "I drink juice made from oranges." },
      { text: "Die *Orange* war saftig und süß.", translation: "The orange was juicy and sweet." },
      { text: "Wir kauften einen Beutel *Orangen*.", translation: "We bought a bag of oranges." }
    ],
    134: [
      { text: "Wir essen *Kartoffeln* zum Abendessen.", translation: "We eat potatoes for dinner." },
      { text: "Die *Kartoffel* war gekocht und weich.", translation: "The potato was boiled and soft." },
      { text: "Er baut *Kartoffeln* im Garten an.", translation: "He grows potatoes in the garden." }
    ],
    135: [
      { text: "Das Kaninchen isst eine *Karotte*.", translation: "The rabbit is eating a carrot." },
      { text: "Die *Karotte* war süß und knackig.", translation: "The carrot was sweet and crisp." },
      { text: "Wir schneiden *Karotten* für die Suppe.", translation: "We cut carrots for the soup." }
    ],
    136: [
      { text: "Ich trinke morgens *Tee*.", translation: "I drink tea in the morning." },
      { text: "Kann ich eine Tasse *Tee* haben?", translation: "Can I have a cup of tea?" },
      { text: "Der *Tee* war zu heiß zum Trinken.", translation: "The tea was too hot to drink." }
    ],
    137: [
      { text: "Das Kind trinkt *Milch* zum Frühstück.", translation: "The child drinks milk for breakfast." },
      { text: "Kannst du *Milch* im Laden kaufen?", translation: "Can you buy milk at the shop?" },
      { text: "Die *Milch* war kalt und frisch.", translation: "The milk was cold and fresh." }
    ],
    138: [
      { text: "Ich trinke jeden Morgen *Saft*.", translation: "I drink juice every morning." },
      { text: "Der *Saft* schmeckt süß und frisch.", translation: "The juice tastes sweet and fresh." },
      { text: "Wir haben *Saft* aus Äpfeln gemacht.", translation: "We made juice from apples." }
    ],
    139: [
      { text: "Ich esse um sieben Uhr *Frühstück*.", translation: "I eat breakfast at seven." },
      { text: "Das *Frühstück* war heute Morgen lecker.", translation: "Breakfast was delicious this morning." },
      { text: "Wir essen jeden Tag zusammen *Frühstück*.", translation: "We eat breakfast together every day." }
    ],
    140: [
      { text: "Wir essen um zwölf Uhr *Mittagessen*.", translation: "We eat lunch at twelve." },
      { text: "Das *Mittagessen* war schnell, aber gut.", translation: "Lunch was quick but good." },
      { text: "Er nimmt sein *Mittagessen* zur Arbeit mit.", translation: "He brings lunch to work." }
    ],
    141: [
      { text: "Wir essen um sechs Uhr *Abendessen*.", translation: "We eat dinner at six." },
      { text: "Das *Abendessen* war heute Abend sehr gut.", translation: "Dinner was very good tonight." },
      { text: "Die Familie versammelt sich jeden Sonntag zum *Abendessen*.", translation: "The family gathers for dinner every Sunday." }
    ],
    142: [
      { text: "Kannst du mir das *Salz* geben?", translation: "Can you pass me the salt?" },
      { text: "Die Suppe braucht etwas mehr *Salz*.", translation: "The soup needs a bit more salt." },
      { text: "Er benutzt zu viel *Salz* im Essen.", translation: "He uses too much salt in the food." }
    ],
    143: [
      { text: "Ich trinke Kaffee ohne *Zucker*.", translation: "I drink coffee without sugar." },
      { text: "Kannst du mir den *Zucker* geben?", translation: "Can you pass me the sugar?" },
      { text: "Der Kuchen braucht viel *Zucker*.", translation: "The cake needs a lot of sugar." }
    ],
    144: [
      { text: "Das Essen liegt auf dem *Teller*.", translation: "The food is on the plate." },
      { text: "Kannst du den *Teller* abwaschen?", translation: "Can you wash the plate?" },
      { text: "Wir decken den Tisch mit *Tellern*.", translation: "We're setting the table with plates." }
    ],
    145: [
      { text: "Kann ich ein *Glas* Wasser haben?", translation: "Can I have a glass of water?" },
      { text: "Das *Glas* fiel herunter und zerbrach.", translation: "The glass fell and broke." },
      { text: "Sie füllte das *Glas* mit Saft.", translation: "She filled the glass with juice." }
    ],
    146: [
      { text: "Mein *Kopf* tut weh.", translation: "My head hurts." },
      { text: "Er schüttelte den *Kopf*.", translation: "He shook his head." },
      { text: "Ich habe Schmerzen im *Kopf*.", translation: "I have pain in my head." }
    ],
    147: [
      { text: "Sie hielt mich an der *Hand*.", translation: "She held my hand." },
      { text: "Wasch dir die *Hände*, bevor du isst.", translation: "Wash your hands before you eat." },
      { text: "Er winkte mit der *Hand*.", translation: "He waved with his hand." }
    ],
    148: [
      { text: "Ich habe mir den *Fuß* verstaucht.", translation: "I twisted my foot." },
      { text: "Das Kind hat kleine *Füße*.", translation: "The child has small feet." },
      { text: "Er trat den Ball mit dem *Fuß*.", translation: "He kicked the ball with his foot." }
    ],
    149: [
      { text: "Sie hat blaue *Augen*.", translation: "She has blue eyes." },
      { text: "Ich habe etwas im *Auge*.", translation: "I got something in my eye." },
      { text: "Das Kind schloss die *Augen* und schlief.", translation: "The child closed its eyes and slept." }
    ],
    150: [
      { text: "Er flüsterte mir etwas ins *Ohr*.", translation: "He whispered something in my ear." },
      { text: "Die Musik war laut, also bedeckte ich meine *Ohren*.", translation: "The music was loud, so I covered my ears." },
      { text: "Der Hund hat große *Ohren*.", translation: "The dog has big ears." }
    ],
    151: [
      { text: "Das Kind hat eine kleine *Nase*.", translation: "The child has a small nose." },
      { text: "Ich atme durch die *Nase*.", translation: "I breathe through my nose." },
      { text: "Er hat eine verstopfte *Nase*.", translation: "He has a stuffy nose." }
    ],
    152: [
      { text: "Mach deinen *Mund* zu, bitte.", translation: "Close your mouth, please." },
      { text: "Sie lächelte mit dem ganzen *Mund*.", translation: "She smiled with her whole mouth." },
      { text: "Sprich nicht mit vollem *Mund*.", translation: "Don't talk with food in your mouth." }
    ],
    153: [
      { text: "Sie hat lange, dunkle *Haare*.", translation: "She has long, dark hair." },
      { text: "Er schneidet sich die *Haare* selbst.", translation: "He cuts his own hair." },
      { text: "Meine *Haare* werden im Regen nass.", translation: "My hair gets wet in the rain." }
    ],
    154: [
      { text: "Zieh deine *Jacke* an, es ist kalt draußen.", translation: "Put on your jacket, it's cold outside." },
      { text: "Ich habe gestern eine neue *Jacke* gekauft.", translation: "I bought a new jacket yesterday." },
      { text: "Ihre *Jacke* ist blau und warm.", translation: "Her jacket is blue and warm." }
    ],
    155: [
      { text: "Zieh die *Schuhe* aus, bevor du reingehst.", translation: "Take off your shoes before you go in." },
      { text: "Diese *Schuhe* sind sehr bequem.", translation: "These shoes are very comfortable." },
      { text: "Ich brauche neue *Schuhe* für den Winter.", translation: "I need new shoes for winter." }
    ],
    156: [
      { text: "Ich habe gestern eine neue *Hose* gekauft.", translation: "I bought new pants yesterday." },
      { text: "Meine *Hose* ist zu lang.", translation: "My pants are too long." },
      { text: "Er trägt immer eine schwarze *Hose*.", translation: "He always wears black pants." }
    ],
    157: [
      { text: "Er trägt ein weißes *Hemd*.", translation: "He's wearing a white shirt." },
      { text: "Mein *Hemd* muss gebügelt werden.", translation: "My shirt needs ironing." },
      { text: "Wir kauften ihm ein neues *Hemd* zum Geburtstag.", translation: "We bought him a new shirt for his birthday." }
    ],
    158: [
      { text: "Sie trägt ein schönes *Kleid*.", translation: "She's wearing a nice dress." },
      { text: "Das *Kleid* war rot und lang.", translation: "The dress was red and long." },
      { text: "Ich kaufe ein neues *Kleid* für die Party.", translation: "I'm going to buy a new dress for the party." }
    ],
    159: [
      { text: "Zieh deinen *Hut* an, es ist kalt.", translation: "Put on your hat, it's cold." },
      { text: "Sein *Hut* ist blau und warm.", translation: "His hat is blue and warm." },
      { text: "Ich habe meinen *Hut* im Wind verloren.", translation: "I lost my hat in the wind." }
    ],
    160: [
      { text: "Ich trage einen warmen *Pullover*.", translation: "I'm wearing a warm sweater." },
      { text: "Mein *Pullover* ist aus Wolle.", translation: "My sweater is made of wool." },
      { text: "Sie strickte mir einen *Pullover*.", translation: "She knitted a sweater for me." }
    ],
    161: [
      { text: "Warte nur eine *Sekunde*.", translation: "Just wait a second." },
      { text: "Es dauerte nur ein paar *Sekunden*.", translation: "It only took a few seconds." },
      { text: "Jede *Sekunde* zählt.", translation: "Every second counts." }
    ],
    162: [
      { text: "Das Treffen dauerte eine *Stunde*.", translation: "The meeting lasted an hour." },
      { text: "Ich warte noch eine *Stunde*.", translation: "I'll wait one more hour." },
      { text: "Die Reise dauert drei *Stunden*.", translation: "The trip takes three hours." }
    ],
    163: [
      { text: "Warte eine *Minute*, bitte.", translation: "Wait a minute, please." },
      { text: "Der Zug kommt in fünf *Minuten*.", translation: "The train arrives in five minutes." },
      { text: "Es dauert nur ein paar *Minuten*.", translation: "It only takes a few minutes." }
    ],
    164: [
      { text: "Ich bin zwanzig *Jahre* alt.", translation: "I am twenty years old." },
      { text: "Wir sind vor zwei *Jahren* hierhergezogen.", translation: "We moved here two years ago." },
      { text: "Nächstes *Jahr* reisen wir nach Italien.", translation: "Next year we're going to travel to Italy." }
    ],
    165: [
      { text: "Was machst du am *Wochenende*?", translation: "What are you doing this weekend?" },
      { text: "Wir fahren jedes *Wochenende* zur Hütte.", translation: "We go to the cabin every weekend." },
      { text: "Das *Wochenende* war kurz, aber schön.", translation: "The weekend was short but nice." }
    ],
    166: [
      { text: "Am *Montag* fange ich mit einem neuen Job an.", translation: "On Monday I start a new job." },
      { text: "Wir treffen uns jeden *Montag*.", translation: "We meet every Monday." },
      { text: "Der *Montag* war hektisch und lang.", translation: "Monday was busy and long." }
    ],
    167: [
      { text: "Am *Dienstag* habe ich Training.", translation: "On Tuesday I have training." },
      { text: "Wir fahren am *Dienstag* in die Stadt.", translation: "We're going to town on Tuesday." },
      { text: "*Dienstage* sind immer ruhig.", translation: "Tuesdays are always calm." }
    ],
    168: [
      { text: "Das Treffen ist am *Mittwoch* um zehn Uhr.", translation: "The meeting is Wednesday at ten." },
      { text: "Sie arbeitet nicht am *Mittwoch*.", translation: "She doesn't work on Wednesdays." },
      { text: "Wir sehen uns wieder am *Mittwoch*.", translation: "We'll see each other again on Wednesday." }
    ],
    169: [
      { text: "Am *Donnerstag* essen wir zusammen zu Abend.", translation: "On Thursday we're having dinner together." },
      { text: "Er reist am *Donnerstag* nach Hause.", translation: "He travels home on Thursday." },
      { text: "*Donnerstage* sind mein Lieblingstag.", translation: "Thursdays are my favorite day." }
    ],
    170: [
      { text: "Endlich ist *Freitag*!", translation: "Finally it's Friday!" },
      { text: "Wir feiern immer am *Freitag*.", translation: "We always celebrate on Fridays." },
      { text: "Am *Freitag* gehen wir abends aus.", translation: "On Friday we go out in the evenings." }
    ],
    171: [
      { text: "Am *Samstag* gehen wir einkaufen.", translation: "On Saturday we go shopping." },
      { text: "Am *Samstag* gehen wir an den Strand.", translation: "On Saturday we're going to the beach." },
      { text: "Die Party ist am *Samstag*.", translation: "The party is on Saturday." }
    ],
    172: [
      { text: "Am *Sonntag* essen wir groß zu Mittag.", translation: "On Sundays we eat a big lunch." },
      { text: "*Sonntag* ist ein ruhiger Tag.", translation: "Sunday is a calm day." },
      { text: "Die Familie versammelt sich jeden *Sonntag*.", translation: "The family gathers every Sunday." }
    ],
    173: [
      { text: "Die Blumen blühen im *Frühling*.", translation: "The flowers bloom in spring." },
      { text: "Der *Frühling* ist meine Lieblingsjahreszeit.", translation: "Spring is my favorite season." },
      { text: "Wir pflanzen im *Frühling* Gemüse.", translation: "We plant vegetables in spring." }
    ],
    174: [
      { text: "Wir reisen jeden *Sommer* nach Italien.", translation: "We travel to Italy every summer." },
      { text: "Der *Sommer* war warm und sonnig.", translation: "The summer was warm and sunny." },
      { text: "Im *Sommer* schwimmen wir jeden Tag.", translation: "In summer we swim every day." }
    ],
    175: [
      { text: "Die Blätter fallen im *Herbst*.", translation: "The leaves fall in autumn." },
      { text: "Der *Herbst* ist hier kalt und nass.", translation: "Autumn is cold and wet here." },
      { text: "Die Schule beginnt im *Herbst*.", translation: "School starts in autumn." }
    ],
    176: [
      { text: "Es schneit viel im *Winter*.", translation: "It snows a lot in winter." },
      { text: "Der *Winter* ist in Deutschland lang und dunkel.", translation: "Winter is long and dark in Germany." },
      { text: "Wir fahren im *Winter* Ski.", translation: "We go skiing in winter." }
    ],
    177: [
      { text: "Die *Sonne* scheint heute.", translation: "The sun is shining today." },
      { text: "Wir haben den ganzen Tag in der *Sonne* gelegen.", translation: "We sunbathed in the sun all day." },
      { text: "Die *Sonne* geht um acht Uhr unter.", translation: "The sun sets at eight." }
    ],
    178: [
      { text: "Heute gibt es viel *Regen*.", translation: "There's a lot of rain today." },
      { text: "Wir wurden vom *Regen* nass.", translation: "We got wet from the rain." },
      { text: "Der *Regen* hörte nach einer Stunde auf.", translation: "The rain stopped after an hour." }
    ],
    179: [
      { text: "Es liegt viel *Schnee* auf dem Boden.", translation: "There's a lot of snow on the ground." },
      { text: "Die Kinder spielen im *Schnee*.", translation: "The children are playing in the snow." },
      { text: "Der *Schnee* schmolz schnell in der Sonne.", translation: "The snow melted quickly in the sun." }
    ],
    180: [
      { text: "Heute weht viel *Wind*.", translation: "There's a lot of wind today." },
      { text: "Der *Wind* riss das Dach ab.", translation: "The wind ripped off the roof." },
      { text: "Wir spürten einen kalten *Wind* vom Meer.", translation: "We felt a cold wind from the sea." }
    ],
    181: [
      { text: "Heute ist *schönes* Wetter.", translation: "The weather is nice today." },
      { text: "Du siehst *schön* aus in dem Kleid.", translation: "You look nice in that dress." },
      { text: "Es war *schön*, dich wiederzusehen.", translation: "It was nice to see you again." }
    ],
    182: [
      { text: "Heute ist es *bewölkt*.", translation: "It's cloudy today." },
      { text: "Der Himmel wurde am Nachmittag *bewölkt*.", translation: "The sky became cloudy in the afternoon." },
      { text: "Wir hatten die ganze Woche *bewölktes* Wetter.", translation: "We had cloudy weather all week." }
    ],
    183: [
      { text: "Der Himmel ist heute Abend *klar*.", translation: "The sky is clear tonight." },
      { text: "Das Wasser im See ist ganz *klar*.", translation: "The water in the lake is completely clear." },
      { text: "Morgen wird es *klares* Wetter geben.", translation: "There will be clear weather tomorrow." }
    ],
    184: [
      { text: "Das Wetter war den ganzen Sommer *trocken*.", translation: "The weather has been dry all summer." },
      { text: "Der Boden ist nach vielen Tagen ohne Regen *trocken*.", translation: "The ground is dry after many days without rain." },
      { text: "Die Kleidung ist jetzt *trocken*.", translation: "The clothes are dry now." }
    ],
    185: [
      { text: "Das Gras ist morgens *nass*.", translation: "The grass is wet in the morning." },
      { text: "Meine Schuhe wurden im Regen *nass*.", translation: "My shoes got wet in the rain." },
      { text: "Ihre Haare waren nach der Dusche *nass*.", translation: "Her hair was wet after the shower." }
    ],
    186: [
      { text: "Ich nehme jeden Tag den *Zug* zur Arbeit.", translation: "I take the train to work every day." },
      { text: "Der *Zug* hatte heute Verspätung.", translation: "The train was delayed today." },
      { text: "Wir sind mit dem *Zug* nach Hamburg gereist.", translation: "We travelled by train to Hamburg." }
    ],
    187: [
      { text: "Der *Bus* kommt in zehn Minuten.", translation: "The bus arrives in ten minutes." },
      { text: "Ich nehme den *Bus* zur Schule.", translation: "I take the bus to school." },
      { text: "Wir haben lange auf den *Bus* gewartet.", translation: "We waited a long time for the bus." }
    ],
    188: [
      { text: "Das *Flugzeug* hebt um zehn Uhr ab.", translation: "The plane takes off at ten." },
      { text: "Wir sind mit dem *Flugzeug* nach Spanien geflogen.", translation: "We travelled by plane to Spain." },
      { text: "Das *Flugzeug* landete sicher.", translation: "The plane landed safely." }
    ],
    189: [
      { text: "Ich habe ein neues *Fahrrad*.", translation: "I have a new bicycle." },
      { text: "Mein *Fahrrad* ist kaputt.", translation: "My bicycle is broken." },
      { text: "Er fährt mit dem *Fahrrad* zur Schule.", translation: "He rides his bicycle to school." }
    ],
    190: [
      { text: "Wir nahmen ein *Boot* über den See.", translation: "We took a boat across the lake." },
      { text: "Das *Boot* war klein, aber schnell.", translation: "The boat was small but fast." },
      { text: "Er fischt von seinem *Boot* aus.", translation: "He fishes from his boat." }
    ],
    191: [
      { text: "Der Zug hält an diesem *Bahnhof*.", translation: "The train stops at this station." },
      { text: "Wir haben uns am *Bahnhof* getroffen.", translation: "We met at the station." },
      { text: "Der *Bahnhof* liegt mitten in der Stadt.", translation: "The station is in the middle of the city." }
    ],
    192: [
      { text: "Wir sind früh zum *Flughafen* gefahren.", translation: "We drove to the airport early." },
      { text: "Der *Flughafen* war voller Menschen.", translation: "The airport was full of people." },
      { text: "Er arbeitet am *Flughafen*.", translation: "He works at the airport." }
    ],
    193: [
      { text: "Ich habe eine *Fahrkarte* für das Konzert gekauft.", translation: "I bought a ticket to the concert." },
      { text: "Kann ich deine *Fahrkarte* sehen?", translation: "Can I see your ticket?" },
      { text: "Wir brauchen zwei *Fahrkarten* für den Zug.", translation: "We need two tickets for the train." }
    ],
    194: [
      { text: "Kannst du mir das auf der *Karte* zeigen?", translation: "Can you show me on the map?" },
      { text: "Wir haben eine *Karte* benutzt, um den Weg zu finden.", translation: "We used a map to find the way." },
      { text: "Die *Karte* zeigt die ganze Stadt.", translation: "The map shows the whole city." }
    ],
    195: [
      { text: "Wir wohnen in einem schönen *Hotel*.", translation: "We're staying at a nice hotel." },
      { text: "Das *Hotel* liegt in der Nähe des Strandes.", translation: "The hotel is near the beach." },
      { text: "Das Zimmer im *Hotel* war groß.", translation: "The room at the hotel was big." }
    ],
    196: [
      { text: "Biege an der Ampel *links* ab.", translation: "Turn left at the traffic light." },
      { text: "Das Buch liegt auf der *linken* Seite des Tisches.", translation: "The book is on the left side of the table." },
      { text: "Er schreibt mit der *linken* Hand.", translation: "He writes with his left hand." }
    ],
    197: [
      { text: "Biege nach der Brücke *rechts* ab.", translation: "Turn right after the bridge." },
      { text: "Der Laden liegt auf der *rechten* Seite der Straße.", translation: "The shop is on the right side of the street." },
      { text: "Sie hält den Stift in der *rechten* Hand.", translation: "She holds the pen in her right hand." }
    ],
    198: [
      { text: "Geh *geradeaus*, bis du die Schule siehst.", translation: "Go straight ahead until you see the school." },
      { text: "Fahr zwei Kilometer *geradeaus*.", translation: "Drive straight ahead for two kilometers." },
      { text: "Der Bahnhof ist *geradeaus*, nicht weit von hier.", translation: "The station is straight ahead, not far from here." }
    ],
    199: [
      { text: "Wir wohnen *nah* an der Schule.", translation: "We live near the school." },
      { text: "Der Laden ist *nah* an unserem Haus.", translation: "The shop is near our house." },
      { text: "Er wohnt *nah* bei mir.", translation: "He lives near me." }
    ],
    200: [
      { text: "Es ist *weit* zum Flughafen von hier.", translation: "It's far to the airport from here." },
      { text: "Wir wohnen nicht *weit* vom Zentrum entfernt.", translation: "We don't live far from the center." },
      { text: "Sie ist *weit* gereist, um hierher zu kommen.", translation: "She travelled far to get here." }
    ],
    201: [
      { text: "Es ist *elf* Uhr.", translation: "It's eleven o'clock." },
      { text: "Sie ist *elf* Jahre alt.", translation: "She's eleven years old." },
      { text: "Wir treffen uns um *elf* Uhr.", translation: "We meet at eleven." }
    ],
    202: [
      { text: "Es ist *zwölf* Uhr.", translation: "It's twelve o'clock." },
      { text: "Das Jahr hat *zwölf* Monate.", translation: "The year has twelve months." },
      { text: "Wir waren *zwölf* Personen beim Abendessen.", translation: "There were twelve of us at dinner." }
    ],
    203: [
      { text: "Er ist *dreizehn* Jahre alt.", translation: "He's thirteen years old." },
      { text: "Wir haben *dreizehn* Minuten gewartet.", translation: "We waited thirteen minutes." },
      { text: "Es gibt *dreizehn* Schüler in der Klasse.", translation: "There are thirteen students in the class." }
    ],
    204: [
      { text: "Sie wird im März *vierzehn* Jahre alt.", translation: "She turns fourteen in March." },
      { text: "Wir waren *vierzehn* Tage im Urlaub.", translation: "We were on vacation for fourteen days." },
      { text: "Es sind noch *vierzehn* Tage bis Weihnachten.", translation: "There are fourteen days until Christmas." }
    ],
    205: [
      { text: "Er ist *fünfzehn* Jahre alt.", translation: "He is fifteen years old." },
      { text: "Wir haben *fünfzehn* Minuten gewartet.", translation: "We waited fifteen minutes." },
      { text: "Der Laden schließt in *fünfzehn* Minuten.", translation: "The shop closes in fifteen minutes." }
    ],
    206: [
      { text: "Sie ist *sechzehn* Jahre alt.", translation: "She's sixteen years old." },
      { text: "Wir haben *sechzehn* Minuten gewartet.", translation: "We waited sixteen minutes." },
      { text: "Es gibt *sechzehn* Schüler in der Klasse.", translation: "There are sixteen students in the class." }
    ],
    207: [
      { text: "Er wird im Juni *siebzehn* Jahre alt.", translation: "He turns seventeen in June." },
      { text: "Wir haben dort *siebzehn* Jahre gelebt.", translation: "We lived there for seventeen years." },
      { text: "Es sind noch *siebzehn* Tage bis zum Urlaub.", translation: "There are seventeen days until the holiday." }
    ],
    208: [
      { text: "Sie wird nächsten Monat *achtzehn* Jahre alt.", translation: "She turns eighteen next month." },
      { text: "Wir haben *achtzehn* Karten für das Konzert gekauft.", translation: "We bought eighteen tickets for the concert." },
      { text: "Es gibt *achtzehn* Tische im Restaurant.", translation: "There are eighteen tables at the restaurant." }
    ],
    209: [
      { text: "Er ist *neunzehn* Jahre alt.", translation: "He's nineteen years old." },
      { text: "Wir haben *neunzehn* Minuten auf den Bus gewartet.", translation: "We waited nineteen minutes for the bus." },
      { text: "Es gibt *neunzehn* Studenten in der Klasse.", translation: "There are nineteen students in the class." }
    ],
    210: [
      { text: "Ich bin *zwanzig* Jahre alt.", translation: "I am twenty years old." },
      { text: "Wir haben *zwanzig* Minuten gewartet.", translation: "We waited twenty minutes." },
      { text: "Es gibt *zwanzig* Schüler in unserer Klasse.", translation: "There are twenty students in our class." }
    ],
    211: [
      { text: "Mein *Großvater* wohnt auf dem Land.", translation: "My grandfather lives in the countryside." },
      { text: "Mein *Großvater* erzählt gute Geschichten.", translation: "My grandfather tells good stories." },
      { text: "Ich besuche meinen *Großvater* jeden Sommer.", translation: "I visit my grandfather every summer." }
    ],
    212: [
      { text: "Meine *Eltern* wohnen in Hamburg.", translation: "My parents live in Hamburg." },
      { text: "Meine *Eltern* sind Lehrer.", translation: "My parents are teachers." },
      { text: "Wir besuchen unsere *Eltern* jedes Weihnachten.", translation: "We visit our parents every Christmas." }
    ],
    213: [
      { text: "Mein *Sohn* geht zur Schule.", translation: "My son goes to school." },
      { text: "Ihr *Sohn* ist sehr nett.", translation: "Their son is very nice." },
      { text: "Ich bin stolz auf meinen *Sohn*.", translation: "I'm proud of my son." }
    ],
    214: [
      { text: "Meine *Tochter* zeichnet gerne.", translation: "My daughter likes to draw." },
      { text: "Ihre *Tochter* studiert Medizin.", translation: "Their daughter studies medicine." },
      { text: "Ich rufe meine *Tochter* jeden Tag an.", translation: "I call my daughter every day." }
    ],
    215: [
      { text: "Mein *Ehemann* arbeitet als Ingenieur.", translation: "My husband works as an engineer." },
      { text: "Ihr *Ehemann* ist Franzose.", translation: "Her husband is French." },
      { text: "Wir haben ihren *Ehemann* auf der Party getroffen.", translation: "We met her husband at the party." }
    ],
    216: [
      { text: "Mein *Lehrer* ist sehr nett.", translation: "My teacher is very nice." },
      { text: "Sie arbeitet als *Lehrerin* an der Schule.", translation: "She works as a teacher at the school." },
      { text: "Der *Lehrer* gab uns viele Hausaufgaben.", translation: "The teacher gave us a lot of homework." }
    ],
    217: [
      { text: "Er ist *Student* an der Universität.", translation: "He's a student at the university." },
      { text: "Der *Student* lernte die ganze Nacht.", translation: "The student studied all night." },
      { text: "Ich war fünf Jahre lang *Student*.", translation: "I was a student for five years." }
    ],
    218: [
      { text: "Meine Mutter ist *Ärztin*.", translation: "My mother is a doctor." },
      { text: "Ich muss morgen zum *Arzt*.", translation: "I have to go to the doctor tomorrow." },
      { text: "Der *Arzt* untersuchte den Patienten.", translation: "The doctor examined the patient." }
    ],
    219: [
      { text: "Meine Schwester ist *Pflegekraft*.", translation: "My sister is a nurse." },
      { text: "Die *Pflegekraft* war sehr fürsorglich.", translation: "The nurse was very caring." },
      { text: "Er arbeitet als *Pflegekraft* im Krankenhaus.", translation: "He works as a nurse at the hospital." }
    ],
    220: [
      { text: "Wir haben nach dem Unfall die *Polizei* gerufen.", translation: "We called the police after the accident." },
      { text: "Die *Polizei* kam schnell zum Ort.", translation: "The police arrived quickly at the scene." },
      { text: "Er arbeitet bei der *Polizei*.", translation: "He works in the police force." }
    ],
    221: [
      { text: "Ich liebe meinen *Job*.", translation: "I love my job." },
      { text: "Sie hat gestern einen neuen *Job* bekommen.", translation: "She got a new job yesterday." },
      { text: "Sein *Job* ist sehr anspruchsvoll.", translation: "His job is very demanding." }
    ],
    222: [
      { text: "Ich arbeite in einem *Büro* im Zentrum.", translation: "I work at an office downtown." },
      { text: "Mein *Büro* ist im dritten Stock.", translation: "My office is on the third floor." },
      { text: "Wir haben uns um neun Uhr im *Büro* getroffen.", translation: "We met at the office at nine." }
    ],
    223: [
      { text: "Wir sind zwanzig Schüler in der *Klasse*.", translation: "There are twenty students in the class." },
      { text: "Unsere *Klasse* ist sehr nett.", translation: "Our class is very nice." },
      { text: "Er ist der Beste in der *Klasse*.", translation: "He's the best in the class." }
    ],
    224: [
      { text: "Ich muss meine *Hausaufgaben* machen.", translation: "I have to do my homework." },
      { text: "Die *Hausaufgabe* war heute schwer.", translation: "The homework was difficult today." },
      { text: "Der Lehrer gab uns viel *Hausaufgabe*.", translation: "The teacher gave us a lot of homework." }
    ],
    225: [
      { text: "Wir haben morgen eine *Prüfung*.", translation: "We have a test tomorrow." },
      { text: "Die *Prüfung* war leichter, als ich dachte.", translation: "The test was easier than I thought." },
      { text: "Ich muss für die *Prüfung* lernen.", translation: "I need to study for the test." }
    ],
    226: [
      { text: "Ich *schlafe* acht Stunden jede Nacht.", translation: "I sleep eight hours every night." },
      { text: "Das Kind *schläft* schon.", translation: "The child is already asleep." },
      { text: "Ich kann heute Abend nicht *schlafen*.", translation: "I can't manage to sleep tonight." }
    ],
    227: [
      { text: "Ich möchte jeden Morgen früh *aufwachen*.", translation: "I want to wake up early every morning." },
      { text: "Sie ist vom Lärm auf der Straße *aufgewacht*.", translation: "She woke up from the noise on the street." },
      { text: "Er pflegt früh *aufzuwachen*.", translation: "He usually wakes up early." }
    ],
    228: [
      { text: "Ich *arbeite* in einem Geschäft.", translation: "I work in a shop." },
      { text: "Sie *arbeitet* jeden Tag hart.", translation: "She works hard every day." },
      { text: "Willst du morgen mit mir *arbeiten*?", translation: "Do you want to work with me tomorrow?" }
    ],
    229: [
      { text: "Ich *studiere* Medizin an der Universität.", translation: "I study medicine at the university." },
      { text: "Sie *studiert* heute Abend für die Prüfung.", translation: "She's studying for the test tonight." },
      { text: "Wir müssen diese Woche mehr *studieren*.", translation: "We need to study more this week." }
    ],
    230: [
      { text: "Ich *lerne* jetzt Deutsch.", translation: "I'm learning German now." },
      { text: "Kinder *lernen* schnell.", translation: "Children learn fast." },
      { text: "Es macht Spaß, neue Dinge zu *lernen*.", translation: "It's fun to learn new things." }
    ],
    231: [
      { text: "Ich *fahre* jeden Tag zur Arbeit.", translation: "I drive to work every day." },
      { text: "Kannst du mich zum Flughafen *fahren*?", translation: "Can you drive me to the airport?" },
      { text: "Sie *fährt* immer vorsichtig.", translation: "She always drives carefully." }
    ],
    232: [
      { text: "Wir *reisen* diesen Sommer nach Deutschland.", translation: "We're travelling to Germany this summer." },
      { text: "Ich liebe es, zu *reisen*.", translation: "I love to travel." },
      { text: "Sie *reisen* viel für die Arbeit.", translation: "They travel a lot for work." }
    ],
    233: [
      { text: "Ich *warte* auf den Bus.", translation: "I'm waiting for the bus." },
      { text: "Kannst du kurz *warten*?", translation: "Can you wait a bit?" },
      { text: "Wir haben eine Stunde *gewartet*.", translation: "We waited for an hour." }
    ],
    234: [
      { text: "Ich kann meine Schlüssel nicht *finden*.", translation: "I can't find my keys." },
      { text: "Er *fand* das Buch unter dem Bett.", translation: "He found the book under the bed." },
      { text: "Kannst du mir helfen, den Weg zu *finden*?", translation: "Can you help me find the way?" }
    ],
    235: [
      { text: "Ich werde heute Abend Freunde *treffen*.", translation: "I'm going to meet friends tonight." },
      { text: "Wir haben uns im Café *getroffen*.", translation: "We met at the café." },
      { text: "Schön, dich zu *treffen*!", translation: "Nice to meet you!" }
    ],
    236: [
      { text: "Ich *mag* dieses Buch.", translation: "I like this book." },
      { text: "Sie *mag* es, abends zu lesen.", translation: "She likes to read in the evening." },
      { text: "*Magst* du es, zu reisen?", translation: "Do you like to travel?" }
    ],
    237: [
      { text: "Ich *liebe* dich.", translation: "I love you." },
      { text: "Sie *liebt* Musik.", translation: "She loves music." },
      { text: "Wir *lieben* es, zusammen zu reisen.", translation: "We love to travel together." }
    ],
    238: [
      { text: "Ich *will* einen Kaffee.", translation: "I want a coffee." },
      { text: "Was *willst* du heute Abend machen?", translation: "What do you want to do tonight?" },
      { text: "Sie *wollte* noch nicht nach Hause gehen.", translation: "She didn't want to go home yet." }
    ],
    239: [
      { text: "Ich *brauche* Hilfe damit.", translation: "I need help with this." },
      { text: "Wir *brauchen* mehr Zeit.", translation: "We need more time." },
      { text: "Sie *braucht* neue Schuhe.", translation: "She needs new shoes." }
    ],
    240: [
      { text: "Ich werde Milch im Laden *kaufen*.", translation: "I'm going to buy milk at the shop." },
      { text: "Willst du dieses Buch *kaufen*?", translation: "Do you want to buy this book?" },
      { text: "Sie *kaufte* gestern ein neues Auto.", translation: "She bought a new car yesterday." }
    ],
    241: [
      { text: "Wir *verkaufen* unser Haus.", translation: "We're selling our house." },
      { text: "Er *verkaufte* letztes Jahr sein Auto.", translation: "He sold his car last year." },
      { text: "Sie wollen die Wohnung bald *verkaufen*.", translation: "They want to sell the apartment soon." }
    ],
    242: [
      { text: "Kann ich mit Karte *bezahlen*?", translation: "Can I pay with card?" },
      { text: "Ich habe für das Abendessen *bezahlt*.", translation: "I paid for dinner." },
      { text: "Wir müssen heute die Miete *bezahlen*.", translation: "We have to pay the rent today." }
    ],
    243: [
      { text: "Kannst du das Fenster *öffnen*?", translation: "Can you open the window?" },
      { text: "Der Laden *öffnet* um zehn Uhr.", translation: "The shop opens at ten." },
      { text: "Sie *öffnete* die Tür vorsichtig.", translation: "She opened the door carefully." }
    ],
    244: [
      { text: "Kannst du die Tür *schließen*?", translation: "Can you close the door?" },
      { text: "Der Laden *schließt* um sechs Uhr.", translation: "The shop closes at six." },
      { text: "Er *schloss* das Fenster, weil es kalt war.", translation: "He closed the window because it was cold." }
    ],
    245: [
      { text: "Ich muss meine Kleider *waschen*.", translation: "I need to wash my clothes." },
      { text: "Sie *wäscht* sich die Hände, bevor sie isst.", translation: "She washes her hands before she eats." },
      { text: "Wir haben am Wochenende das Auto *gewaschen*.", translation: "We washed the car over the weekend." }
    ],
    246: [
      { text: "Ich kann von hier den Berg *sehen*.", translation: "I can see the mountain from here." },
      { text: "Willst du heute Abend einen Film *sehen*?", translation: "Do you want to see a movie tonight?" },
      { text: "Sie *sah* einen Vogel im Baum.", translation: "She saw a bird in the tree." }
    ],
    247: [
      { text: "Ich kann Musik vom Nachbarn *hören*.", translation: "I can hear music from the neighbor." },
      { text: "Kannst du mich *hören*?", translation: "Can you hear me?" },
      { text: "Sie *hörte* ein seltsames Geräusch.", translation: "She heard a strange sound." }
    ],
    248: [
      { text: "Was möchtest du ihr *sagen*?", translation: "What do you want to say to her?" },
      { text: "Er *sagte* nichts.", translation: "He said nothing." },
      { text: "Kannst du das noch einmal *sagen*?", translation: "Can you say that again?" }
    ],
    249: [
      { text: "Kann ich dich etwas *fragen*?", translation: "Can I ask you something?" },
      { text: "Sie *fragte* nach dem Weg zum Bahnhof.", translation: "She asked for directions to the station." },
      { text: "Wir müssen den Lehrer danach *fragen*.", translation: "We need to ask the teacher about this." }
    ],
    250: [
      { text: "Kannst du auf meine Frage *antworten*?", translation: "Can you answer my question?" },
      { text: "Er *antwortete* schnell auf die E-Mail.", translation: "He answered the email quickly." },
      { text: "Sie *antwortet* nie am Telefon.", translation: "She never answers the phone." }
    ],
    251: [
      { text: "Ich bin heute sehr *glücklich*.", translation: "I'm very happy today." },
      { text: "Sie war *glücklich* über das Geschenk.", translation: "She was happy about the gift." },
      { text: "Wir sind *glücklich*, dich zu sehen.", translation: "We're happy to see you." }
    ],
    252: [
      { text: "Er ist *traurig*, weil sein Hund krank ist.", translation: "He's sad because his dog is sick." },
      { text: "Der Film machte mich *traurig*.", translation: "The movie made me sad." },
      { text: "Wir fühlten uns nach der Nachricht *traurig*.", translation: "We felt sad after the news." }
    ],
    253: [
      { text: "Sie wurde *wütend*, als er zu spät kam.", translation: "She got angry when he came late." },
      { text: "Sei nicht *wütend* auf mich.", translation: "Don't be angry with me." },
      { text: "Er war den ganzen Tag *wütend*.", translation: "He was angry all day." }
    ],
    254: [
      { text: "Ich bin heute Abend sehr *müde*.", translation: "I'm very tired tonight." },
      { text: "Sie wurde nach der Arbeit *müde*.", translation: "She got tired after work." },
      { text: "Wir waren nach der langen Reise *müde*.", translation: "We were tired after the long trip." }
    ],
    255: [
      { text: "Ich bin heute *krank* und bleibe zu Hause.", translation: "I'm sick today and staying home." },
      { text: "Das Kind ist *krank* und hat Fieber.", translation: "The child is sick and has a fever." },
      { text: "Sie war die ganze Woche *krank*.", translation: "She was sick all week." }
    ],
    256: [
      { text: "Die Prüfung war *einfach*.", translation: "The test was easy." },
      { text: "Das ist eine *einfache* Aufgabe.", translation: "This is an easy task." },
      { text: "Es war *einfach*, den Weg zu finden.", translation: "It was easy to find the way." }
    ],
    257: [
      { text: "Diese Aufgabe ist *schwierig*.", translation: "This task is difficult." },
      { text: "Es war *schwierig*, ihn zu verstehen.", translation: "It was difficult to understand him." },
      { text: "Deutsch ist nicht so *schwierig* zu lernen.", translation: "German isn't so difficult to learn." }
    ],
    258: [
      { text: "Dieses Auto ist sehr *teuer*.", translation: "This car is very expensive." },
      { text: "Das Hotel war *teuer*.", translation: "The hotel was expensive." },
      { text: "Wir fanden ein *teures*, aber schönes Restaurant.", translation: "We found an expensive but nice restaurant." }
    ],
    259: [
      { text: "Dieser Pullover war *billig*.", translation: "This sweater was cheap." },
      { text: "Wir suchten ein *billiges* Hotel.", translation: "We looked for a cheap hotel." },
      { text: "Das Flugticket war überraschend *billig*.", translation: "The plane ticket was surprisingly cheap." }
    ],
    260: [
      { text: "Der Eintritt ist heute *kostenlos*.", translation: "Entry is free today." },
      { text: "Der Kaffee im Büro ist *kostenlos*.", translation: "The coffee at the office is free." },
      { text: "Das Museum ist für Kinder *kostenlos*.", translation: "The museum is free for children." }
    ],
    261: [
      { text: "Wir haben *viele* Freunde hier.", translation: "We have many friends here." },
      { text: "Es waren *viele* Menschen auf der Party.", translation: "There were many people at the party." },
      { text: "Sie hat *viele* Bücher gelesen.", translation: "She has read many books." }
    ],
    262: [
      { text: "Es waren heute *wenige* Leute im Museum.", translation: "There were few people at the museum today." },
      { text: "Wir haben nur noch *wenige* Tage Urlaub.", translation: "We have few days left of the holiday." },
      { text: "Nur *wenige* Schüler kamen zum Unterricht.", translation: "Only a few students came to class." }
    ],
    263: [
      { text: "Kann ich *mehr* Kaffee haben?", translation: "Can I have more coffee?" },
      { text: "Ich brauche *mehr* Zeit.", translation: "I need more time." },
      { text: "Sie redet *mehr* als ihr Bruder.", translation: "She talks more than her brother." }
    ],
    264: [
      { text: "Ich esse jetzt *weniger* Fleisch.", translation: "I eat less meat now." },
      { text: "Wir haben *weniger* Zeit, als wir dachten.", translation: "We have less time than we thought." },
      { text: "Er arbeitet *weniger* als früher.", translation: "He works less than before." }
    ],
    265: [
      { text: "Haben wir *genug* Essen für alle?", translation: "Do we have enough food for everyone?" },
      { text: "Ich habe nicht *genug* Geld.", translation: "I don't have enough money." },
      { text: "Es ist *genug* Platz im Auto.", translation: "There's enough room in the car." }
    ],
    266: [
      { text: "Ich reise *oft* nach Deutschland.", translation: "I often travel to Germany." },
      { text: "Sie ruft *oft* ihre Eltern an.", translation: "She often calls her parents." },
      { text: "Wir essen *oft* Fisch zum Abendessen.", translation: "We often eat fish for dinner." }
    ],
    267: [
      { text: "Ich trinke abends *nie* Kaffee.", translation: "I never drink coffee in the evening." },
      { text: "Er kommt *nie* zu spät.", translation: "He never comes late." },
      { text: "Wir waren *nie* in Japan.", translation: "We have never been to Japan." }
    ],
    268: [
      { text: "Ich gehe *manchmal* allein spazieren.", translation: "I sometimes go for a walk alone." },
      { text: "Sie frühstückt *manchmal* spät.", translation: "She sometimes eats breakfast late." },
      { text: "Wir fahren *manchmal* am Wochenende zur Hütte.", translation: "We sometimes go to the cabin on weekends." }
    ],
    269: [
      { text: "Ich wache jeden Tag *früh* auf.", translation: "I wake up early every day." },
      { text: "Wir kamen *früh* am Flughafen an.", translation: "We arrived early at the airport." },
      { text: "Das Treffen beginnt morgen *früh*.", translation: "The meeting starts early tomorrow." }
    ],
    270: [
      { text: "Er kam heute *spät* zur Arbeit.", translation: "He came late to work today." },
      { text: "Wir haben gestern *spät* zu Abend gegessen.", translation: "We ate dinner late yesterday." },
      { text: "Der Zug fuhr *spät* am Abend.", translation: "The train left late in the evening." }
    ],
    271: [
      { text: "*Dieses* Buch ist sehr gut.", translation: "This book is very good." },
      { text: "Ich mag *diesen* Pullover.", translation: "I like this sweater." },
      { text: "*Diese* Woche war hektisch.", translation: "This week has been busy." }
    ],
    272: [
      { text: "*Dieses* Haus ist groß.", translation: "This house is big." },
      { text: "Ich verstehe *dieses* Wort nicht.", translation: "I don't understand this word." },
      { text: "*Dies* ist mein Bruder.", translation: "This is my brother." }
    ],
    273: [
      { text: "*Diese* Schuhe sind neu.", translation: "These shoes are new." },
      { text: "Ich mag *diese* Bilder.", translation: "I like these pictures." },
      { text: "*Diese* Bücher sind aus der Bibliothek.", translation: "These books are from the library." }
    ],
    274: [
      { text: "Wir wohnen in der *gleichen* Stadt.", translation: "We live in the same city." },
      { text: "Er hat die *gleiche* Jacke wie ich.", translation: "He has the same jacket as me." },
      { text: "Sie gingen auf die *gleiche* Schule.", translation: "They went to the same school." }
    ],
    275: [
      { text: "Ich möchte lieber das *andere* Buch.", translation: "I'd rather have the other book." },
      { text: "Wir nehmen den *anderen* Weg.", translation: "We'll take the other way." },
      { text: "Sie wohnt auf der *anderen* Seite der Straße.", translation: "She lives on the other side of the street." }
    ],
    276: [
      { text: "*Tschüss*! Wir sehen uns morgen.", translation: "Bye! See you tomorrow." },
      { text: "Sie winkte und sagte *tschüss*.", translation: "She waved and said bye." },
      { text: "*Tschüss*, wir hören uns bald!", translation: "Bye, talk soon!" }
    ],
    277: [
      { text: "*Guten Morgen*! Hast du gut geschlafen?", translation: "Good morning! Did you sleep well?" },
      { text: "Er sagte allen im Büro *guten Morgen*.", translation: "He said good morning to everyone at the office." },
      { text: "*Guten Morgen*, heute ist ein schöner Tag.", translation: "Good morning, it's a nice day today." }
    ],
    278: [
      { text: "*Guten Abend*! Wie geht es dir?", translation: "Good evening! How are you?" },
      { text: "Wir sagten *guten Abend* und gingen hinein.", translation: "We said good evening and went in." },
      { text: "*Guten Abend*, willkommen im Restaurant.", translation: "Good evening, welcome to the restaurant." }
    ],
    279: [
      { text: "*Gute Nacht*, schlaf gut!", translation: "Good night, sleep well!" },
      { text: "Sie sagte den Kindern *gute Nacht*.", translation: "She said good night to the children." },
      { text: "*Gute Nacht*, wir sehen uns früh morgen.", translation: "Good night, see you early tomorrow." }
    ],
    280: [
      { text: "*Willkommen* in Deutschland!", translation: "Welcome to Germany!" },
      { text: "Du bist bei uns immer *willkommen*.", translation: "You're always welcome at our home." },
      { text: "*Willkommen*, bitte komm herein!", translation: "Welcome, please come in!" }
    ],
    281: [
      { text: "*Bitte sehr*, hier ist dein Kaffee.", translation: "Here you are, here's your coffee." },
      { text: "*Bitte sehr*, setz dich.", translation: "Please, sit down." },
      { text: "Sie gab mir das Buch und sagte *bitte sehr*.", translation: "She gave me the book and said here you are." }
    ],
    282: [
      { text: "*Vielen Dank* für die Hilfe!", translation: "Many thanks for the help!" },
      { text: "*Vielen Dank*, das war sehr nett von dir.", translation: "Thank you so much, that was very kind of you." },
      { text: "Wir sagten *vielen Dank* und gingen nach Hause.", translation: "We said thanks a lot and went home." }
    ],
    283: [
      { text: "*Es ist in Ordnung*, mach dir keine Sorgen.", translation: "It's fine, don't worry." },
      { text: "Wie geht es dir? *Es ist in Ordnung*, danke.", translation: "How are you? I'm fine, thanks." },
      { text: "*Es ist in Ordnung* mit mir jetzt.", translation: "I'm doing fine now." }
    ],
    284: [
      { text: "Das war ein schöner Film, *stimmt*?", translation: "That was a nice movie, right?" },
      { text: "Du magst Kaffee, *stimmt*?", translation: "You like coffee, right?" },
      { text: "Wir haben uns letztes Jahr getroffen, *stimmt*?", translation: "We met last year, right?" }
    ],
    285: [
      { text: "*Natürlich* kann ich dir helfen.", translation: "Of course I can help you." },
      { text: "Kommst du heute Abend? *Natürlich*!", translation: "Are you coming tonight? Of course!" },
      { text: "*Natürlich* erinnere ich mich an dich.", translation: "Of course I remember you." }
    ],
    286: [
      { text: "Ich muss zur *Apotheke* und Medizin kaufen.", translation: "I need to go to the pharmacy and buy medicine." },
      { text: "Die *Apotheke* liegt neben dem Laden.", translation: "The pharmacy is next to the shop." },
      { text: "Die *Apotheke* öffnet um acht Uhr.", translation: "The pharmacy opens at eight." }
    ],
    287: [
      { text: "Er wurde gestern ins *Krankenhaus* gebracht.", translation: "He was taken to the hospital yesterday." },
      { text: "Das *Krankenhaus* liegt außerhalb der Stadt.", translation: "The hospital is outside the city." },
      { text: "Sie arbeitet im *Krankenhaus* als Pflegekraft.", translation: "She works at the hospital as a nurse." }
    ],
    288: [
      { text: "Ich habe morgen einen Termin beim *Zahnarzt*.", translation: "I have an appointment with the dentist tomorrow." },
      { text: "Der *Zahnarzt* untersuchte meine Zähne.", translation: "The dentist checked my teeth." },
      { text: "Kinder sollten jedes Jahr zum *Zahnarzt* gehen.", translation: "Children should go to the dentist every year." }
    ],
    289: [
      { text: "Kann ich etwas *Hilfe* bekommen?", translation: "Can I get some help?" },
      { text: "Vielen Dank für die *Hilfe*!", translation: "Thanks a lot for the help!" },
      { text: "Sie brauchte *Hilfe* bei den Hausaufgaben.", translation: "She needed help with the homework." }
    ],
    290: [
      { text: "Wir haben ein kleines *Problem*.", translation: "We have a small problem." },
      { text: "Das *Problem* wurde schnell gelöst.", translation: "The problem was solved quickly." },
      { text: "Kein *Problem*, ich kann helfen.", translation: "No problem, I can help." }
    ],
    291: [
      { text: "Was ist der *Preis* für diesen Pullover?", translation: "What's the price of this sweater?" },
      { text: "Der *Preis* war höher, als ich erwartet hatte.", translation: "The price was higher than I expected." },
      { text: "Wir haben die *Preise* in mehreren Läden verglichen.", translation: "We compared prices in several shops." }
    ],
    292: [
      { text: "Ich habe heute nicht genug *Geld*.", translation: "I don't have enough money today." },
      { text: "Sie spart *Geld* für die Reise.", translation: "She's saving money for the trip." },
      { text: "Wir brauchen mehr *Geld* für das Projekt.", translation: "We need more money for the project." }
    ],
    293: [
      { text: "Kann ich eine *Quittung* bekommen, bitte?", translation: "Can I have a receipt, please?" },
      { text: "Ich habe meine *Quittung* verloren.", translation: "I lost my receipt." },
      { text: "Die *Quittung* zeigt, was du bezahlt hast.", translation: "The receipt shows what you paid." }
    ],
    294: [
      { text: "Brauchst du eine *Tüte*?", translation: "Do you need a bag?" },
      { text: "Die *Tüte* war voller Gemüse.", translation: "The bag was full of vegetables." },
      { text: "Ich habe meine *Tüten* zu Hause vergessen.", translation: "I forgot my bags at home." }
    ],
    295: [
      { text: "Welche *Größe* trägst du?", translation: "What size do you wear?" },
      { text: "Dieser Pullover ist die falsche *Größe*.", translation: "This sweater is the wrong size." },
      { text: "Sie haben alle *Größen* in diesem Laden.", translation: "They have all sizes in this shop." }
    ],
    296: [
      { text: "Ich habe mein *Telefon* zu Hause vergessen.", translation: "I forgot my phone at home." },
      { text: "Das *Telefon* klingelte mitten in der Nacht.", translation: "The phone rang in the middle of the night." },
      { text: "Kann ich dein *Telefon* ausleihen?", translation: "Can I borrow your phone?" }
    ],
    297: [
      { text: "Mein *Computer* ist sehr alt.", translation: "My computer is very old." },
      { text: "Der *Computer* hörte gestern auf zu funktionieren.", translation: "The computer stopped working yesterday." },
      { text: "Ich arbeite den ganzen Tag am *Computer*.", translation: "I work on the computer all day." }
    ],
    298: [
      { text: "Ich habe meinen *Schlüssel* verloren.", translation: "I've lost my key." },
      { text: "Der *Schlüssel* liegt unter der Matte.", translation: "The key is under the mat." },
      { text: "Kannst du mir die *Schlüssel* geben?", translation: "Can you give me the keys?" }
    ],
    299: [
      { text: "Die *Uhr* an der Wand zeigt die falsche Zeit.", translation: "The clock on the wall shows the wrong time." },
      { text: "Ich habe gestern eine neue *Uhr* gekauft.", translation: "I bought a new watch yesterday." },
      { text: "Die *Uhr* klingelte um sieben Uhr.", translation: "The clock rang at seven." }
    ],
    300: [
      { text: "Sie trägt immer eine große *Tasche*.", translation: "She always carries a big bag." },
      { text: "Meine *Tasche* ist voller Bücher.", translation: "My bag is full of books." },
      { text: "Ich habe eine neue *Tasche* für die Schule gekauft.", translation: "I bought a new bag for school." }
    ],
    301: [
      { text: "Kannst du mir das Buch *geben*?", translation: "Can you give me the book?" },
      { text: "Er *gab* ihr ein Geschenk.", translation: "He gave her a gift." },
      { text: "Wir wollen Geld für wohltätige Zwecke *geben*.", translation: "We want to give money to charity." }
    ],
    302: [
      { text: "Kannst du diese Tüte für mich *nehmen*?", translation: "Can you take this bag for me?" },
      { text: "Sie *nahm* den Bus zur Arbeit.", translation: "She took the bus to work." },
      { text: "Ich muss jetzt eine Pause *nehmen*.", translation: "I need to take a break now." }
    ],
    303: [
      { text: "Kannst du das Buch auf den Tisch *legen*?", translation: "Can you put the book on the table?" },
      { text: "Sie *legte* die Schlüssel in die Tasche.", translation: "She put the keys in the bag." },
      { text: "Ich werde mich heute Abend früh *legen*.", translation: "I'm going to bed early tonight." }
    ],
    304: [
      { text: "Der Film wird um acht Uhr *anfangen*.", translation: "The movie will begin at eight." },
      { text: "Wir müssen jetzt *anfangen* zu arbeiten.", translation: "We need to begin working now." },
      { text: "Die Schule hat im August *angefangen*.", translation: "School began in August." }
    ],
    305: [
      { text: "Ich muss dieses Projekt heute *beenden*.", translation: "I need to finish this project today." },
      { text: "Das Treffen wurde früh *beendet*.", translation: "The meeting finished early." },
      { text: "Wir werden den Kurs nächste Woche *beenden*.", translation: "We're going to finish the course next week." }
    ],
    306: [
      { text: "Ich *weiß* die Antwort nicht.", translation: "I don't know the answer." },
      { text: "*Weißt* du, wo sie wohnt?", translation: "Do you know where she lives?" },
      { text: "Sie *wusste* nicht, was sie sagen sollte.", translation: "She didn't know what to say." }
    ],
    307: [
      { text: "Ich *denke* an dich.", translation: "I'm thinking of you." },
      { text: "Was *denkst* du darüber?", translation: "What do you think about this?" },
      { text: "Er *dachte* lange nach, bevor er antwortete.", translation: "He thought for a long time before answering." }
    ],
    308: [
      { text: "Ich *verstehe* die Frage nicht.", translation: "I don't understand the question." },
      { text: "Kannst du Deutsch *verstehen*?", translation: "Can you understand German?" },
      { text: "Sie *verstand* nicht, warum er wütend war.", translation: "She didn't understand why he was angry." }
    ],
    309: [
      { text: "Ich *erinnere* mich nicht an seinen Namen.", translation: "I don't remember his name." },
      { text: "Kannst du dich *erinnern*, was ich gesagt habe?", translation: "Can you remember what I said?" },
      { text: "Sie *erinnerte* sich an meinen Geburtstag.", translation: "She remembered my birthday." }
    ],
    310: [
      { text: "Ich *vergesse* immer meine Schlüssel.", translation: "I always forget my keys." },
      { text: "*Vergiss* nicht, mich anzurufen.", translation: "Don't forget to call me." },
      { text: "Er *vergaß* das Buch zu Hause.", translation: "He forgot the book at home." }
    ],
    311: [
      { text: "Kannst du mir damit *helfen*?", translation: "Can you help me with this?" },
      { text: "Sie *hilft* immer anderen.", translation: "She always helps others." },
      { text: "Wir haben dem Nachbarn im Garten *geholfen*.", translation: "We helped the neighbor with the garden." }
    ],
    312: [
      { text: "Ich werde dich heute Abend *anrufen*.", translation: "I'll call you tonight." },
      { text: "Kannst du für mich den Arzt *anrufen*?", translation: "Can you call the doctor for me?" },
      { text: "Sie hat jeden Sonntag ihre Mutter *angerufen*.", translation: "She called her mother every Sunday." }
    ],
    313: [
      { text: "Kannst du mir das Buch *senden*?", translation: "Can you send me the book?" },
      { text: "Ich habe gestern eine E-Mail *gesendet*.", translation: "I sent an email yesterday." },
      { text: "Wir werden das Paket morgen *senden*.", translation: "We're going to send the package tomorrow." }
    ],
    314: [
      { text: "Ich habe meinen Schlüssel *verloren*.", translation: "I lost my key." },
      { text: "*Verliere* nicht den Mut.", translation: "Don't lose heart." },
      { text: "Sie hat Angst, ihren Job zu *verlieren*.", translation: "She's afraid of losing her job." }
    ],
    315: [
      { text: "Wir hoffen, heute das Spiel zu *gewinnen*.", translation: "We hope to win the match today." },
      { text: "Sie *gewann* letztes Jahr den Wettbewerb.", translation: "She won the competition last year." },
      { text: "Unser Team *gewinnt* oft.", translation: "Our team often wins." }
    ],
    316: [
      { text: "Der Zug wird um zehn Uhr *ankommen*.", translation: "The train will arrive at ten." },
      { text: "Wir sind spät auf der Party *angekommen*.", translation: "We arrived late at the party." },
      { text: "Das Flugzeug soll in einer Stunde *ankommen*.", translation: "The plane is due to arrive in an hour." }
    ],
    317: [
      { text: "Wir können jetzt *eintreten*.", translation: "We can enter now." },
      { text: "Sie ist leise ins Zimmer *eingetreten*.", translation: "She entered the room quietly." },
      { text: "Darf ich *eintreten*?", translation: "Can I come in?" }
    ],
    318: [
      { text: "Der Zug wird um neun Uhr *abfahren*.", translation: "The train will depart at nine." },
      { text: "Wir müssen jetzt *abfahren*, um das Flugzeug zu erreichen.", translation: "We have to leave now to catch the plane." },
      { text: "Er ist *abgefahren*, ohne sich zu verabschieden.", translation: "He left without saying goodbye." }
    ],
    319: [
      { text: "Ich *wohne* in Berlin.", translation: "I live in Berlin." },
      { text: "Wo *wohnst* du?", translation: "Where do you live?" },
      { text: "Sie *wohnten* dort viele Jahre.", translation: "They lived there for many years." }
    ],
    320: [
      { text: "Sie *läuft* jeden Tag zur Arbeit.", translation: "She walks to work every day." },
      { text: "Sollen wir eine Runde *laufen*?", translation: "Shall we go for a walk?" },
      { text: "Ich *laufe* gern im Park.", translation: "I like to walk in the park." }
    ],
    321: [
      { text: "Ich *renne* jeden Morgen.", translation: "I run every morning." },
      { text: "Die Kinder *rannten* im Garten herum.", translation: "The children ran around in the garden." },
      { text: "Er kann sehr schnell *rennen*.", translation: "He can run very fast." }
    ],
    322: [
      { text: "Wir *schwimmen* gerne im Sommer.", translation: "We love to swim in summer." },
      { text: "Kannst du *schwimmen*?", translation: "Can you swim?" },
      { text: "Sie *schwamm* über den ganzen See.", translation: "She swam across the whole lake." }
    ],
    323: [
      { text: "Das Kind hat heute *springen* gelernt.", translation: "The child learned to jump today." },
      { text: "Er *sprang* über den Zaun.", translation: "He jumped over the fence." },
      { text: "Kannst du so hoch *springen*?", translation: "Can you jump that high?" }
    ],
    324: [
      { text: "Wir *tanzen* gerne auf Partys.", translation: "We love to dance at parties." },
      { text: "Kannst du Walzer *tanzen*?", translation: "Can you dance the waltz?" },
      { text: "Sie *tanzten* die ganze Nacht.", translation: "They danced all night." }
    ],
    325: [
      { text: "Sie kann sehr gut *singen*.", translation: "She can sing very well." },
      { text: "Wir *sangen* zusammen am Lagerfeuer.", translation: "We sang together by the campfire." },
      { text: "Er *singt* in einem Chor.", translation: "He sings in a choir." }
    ],
    326: [
      { text: "Die Kinder *spielen* im Garten.", translation: "The children are playing in the garden." },
      { text: "Willst du mit mir *spielen*?", translation: "Do you want to play with me?" },
      { text: "Sie *spielten* den ganzen Nachmittag.", translation: "They played all afternoon." }
    ],
    327: [
      { text: "Ich *koche* gerne sonntags.", translation: "I like to cook on Sundays." },
      { text: "Kannst du heute Abend für uns *kochen*?", translation: "Can you cook for us tonight?" },
      { text: "Sie *kocht* jeden Tag.", translation: "She cooks every day." }
    ],
    328: [
      { text: "Ich muss mein Zimmer *putzen*.", translation: "I need to clean my room." },
      { text: "Kannst du die Küche *putzen*?", translation: "Can you clean the kitchen?" },
      { text: "Wir haben das Haus *geputzt*, bevor die Gäste kamen.", translation: "We cleaned the house before the guests arrived." }
    ],
    329: [
      { text: "Sie wollen ein neues Haus *bauen*.", translation: "They're going to build a new house." },
      { text: "Er *baute* einen Tisch aus Holz.", translation: "He built a table out of wood." },
      { text: "Wir *bauen* zusammen ein Team auf.", translation: "We're building a team together." }
    ],
    330: [
      { text: "Ich möchte meine Pläne *ändern*.", translation: "I want to change my plans." },
      { text: "Können wir die Uhrzeit *ändern*?", translation: "Can we change the time?" },
      { text: "Ihr Leben hat sich völlig *geändert*.", translation: "Her life changed completely." }
    ],
    331: [
      { text: "Wir essen *Reis* zum Abendessen.", translation: "We eat rice for dinner." },
      { text: "Der *Reis* war perfekt gekocht.", translation: "The rice was cooked perfectly." },
      { text: "Er mag *Reis* mit Hähnchen.", translation: "He likes rice with chicken." }
    ],
    332: [
      { text: "Wir kochen heute Abend *Nudeln*.", translation: "We're making pasta tonight." },
      { text: "Die *Nudeln* waren köstlich.", translation: "The pasta was delicious." },
      { text: "Sie isst jede Woche *Nudeln*.", translation: "She eats pasta every week." }
    ],
    333: [
      { text: "Wir grillen am Wochenende *Hähnchen*.", translation: "We're grilling chicken this weekend." },
      { text: "Das *Hähnchen* schmeckte sehr gut.", translation: "The chicken tasted very good." },
      { text: "Er isst nie *Hähnchen*.", translation: "He never eats chicken." }
    ],
    334: [
      { text: "Wir essen *Rindfleisch* zum Sonntagsessen.", translation: "We eat beef for Sunday dinner." },
      { text: "Das *Rindfleisch* war zart und saftig.", translation: "The beef was tender and juicy." },
      { text: "Er bevorzugt *Rindfleisch* gegenüber Hähnchen.", translation: "He prefers beef to chicken." }
    ],
    335: [
      { text: "Sie isst kein *Schweinefleisch*.", translation: "She doesn't eat pork." },
      { text: "Wir haben gestern *Schweinefleisch* gegrillt.", translation: "We grilled pork yesterday." },
      { text: "Das *Schweinefleisch* war etwas zu salzig.", translation: "The pork was a bit too salty." }
    ],
    336: [
      { text: "Kannst du mir die *Butter* geben?", translation: "Can you pass me the butter?" },
      { text: "Sie streicht *Butter* auf das Brot.", translation: "She spreads butter on the bread." },
      { text: "Wir brauchen mehr *Butter* für den Kuchen.", translation: "We need more butter for the cake." }
    ],
    337: [
      { text: "Wir braten den Fisch in *Öl*.", translation: "We fry the fish in oil." },
      { text: "Das *Öl* war zu heiß.", translation: "The oil was too hot." },
      { text: "Kannst du mir das *Öl* geben?", translation: "Can you pass me the oil?" }
    ],
    338: [
      { text: "Kannst du mir den *Pfeffer* geben?", translation: "Can you pass me the pepper?" },
      { text: "Die Suppe braucht etwas mehr *Pfeffer*.", translation: "The soup needs a bit more pepper." },
      { text: "Sie benutzt viel *Pfeffer* im Essen.", translation: "She uses a lot of pepper in the food." }
    ],
    339: [
      { text: "Wir schneiden *Zwiebeln* für die Suppe.", translation: "We're cutting onion for the soup." },
      { text: "Die *Zwiebel* brachte mich zum Weinen.", translation: "The onion made me cry." },
      { text: "Er mag keine rohe *Zwiebel*.", translation: "He doesn't like raw onion." }
    ],
    340: [
      { text: "Wir brauchen mehr *Tomaten* für den Salat.", translation: "We need more tomatoes for the salad." },
      { text: "Die *Tomate* war reif und rot.", translation: "The tomato was ripe and red." },
      { text: "Sie baut *Tomaten* im Garten an.", translation: "She grows tomatoes in the garden." }
    ],
    341: [
      { text: "Wir braten *Knoblauch* in Öl.", translation: "We fry garlic in oil." },
      { text: "Das Gericht schmeckt stark nach *Knoblauch*.", translation: "The dish tastes strongly of garlic." },
      { text: "Er liebt *Knoblauch* in allem, was er kocht.", translation: "He loves garlic in everything he cooks." }
    ],
    342: [
      { text: "Ich trinke Wasser mit *Zitrone*.", translation: "I drink water with lemon." },
      { text: "Die *Zitrone* war sehr sauer.", translation: "The lemon was very sour." },
      { text: "Sie presste eine *Zitrone* über den Fisch.", translation: "She squeezed a lemon over the fish." }
    ],
    343: [
      { text: "Wir haben *Erdbeeren* im Garten gepflückt.", translation: "We picked strawberries in the garden." },
      { text: "Die *Erdbeeren* waren süß und rot.", translation: "The strawberries were sweet and red." },
      { text: "Sie machte Marmelade aus *Erdbeeren*.", translation: "She made jam from strawberries." }
    ],
    344: [
      { text: "Die Kinder essen *Trauben* als Snack.", translation: "The children eat grapes as snacks." },
      { text: "Die *Trauben* waren grün und süß.", translation: "The grapes were green and sweet." },
      { text: "Wir haben einen Beutel *Trauben* auf dem Markt gekauft.", translation: "We bought a bag of grapes at the market." }
    ],
    345: [
      { text: "Sie hat mir zum Geburtstag einen *Kuchen* gebacken.", translation: "She baked a cake for my birthday." },
      { text: "Der *Kuchen* schmeckte fantastisch.", translation: "The cake tasted amazing." },
      { text: "Wir essen sonntags *Kuchen*.", translation: "We eat cake on Sundays." }
    ],
    346: [
      { text: "Ich liebe dunkle *Schokolade*.", translation: "I love dark chocolate." },
      { text: "Die *Schokolade* schmolz in der Sonne.", translation: "The chocolate melted in the sun." },
      { text: "Sie gab mir eine Schachtel *Schokolade*.", translation: "She gave me a box of chocolate." }
    ],
    347: [
      { text: "Wir essen im Sommer *Eis*.", translation: "We eat ice cream in summer." },
      { text: "Das *Eis* schmolz schnell.", translation: "The ice cream melted fast." },
      { text: "Die Kinder lieben *Eis* mit Erdbeergeschmack.", translation: "The children love strawberry-flavored ice cream." }
    ],
    348: [
      { text: "Wir haben *Wein* zum Abendessen getrunken.", translation: "We drank wine with dinner." },
      { text: "Der *Wein* war rot und trocken.", translation: "The wine was red and dry." },
      { text: "Er sammelt *Wein*.", translation: "He collects wine." }
    ],
    349: [
      { text: "Er trinkt *Bier* mit seinen Freunden.", translation: "He drinks beer with his friends." },
      { text: "Das *Bier* war kalt und erfrischend.", translation: "The beer was cold and refreshing." },
      { text: "Wir bestellten zwei *Bier* in der Kneipe.", translation: "We ordered two beers at the pub." }
    ],
    350: [
      { text: "Kannst du diese *Flasche* öffnen?", translation: "Can you open this bottle?" },
      { text: "Die *Flasche* war voller Wasser.", translation: "The bottle was full of water." },
      { text: "Wir kauften eine *Flasche* Wein für die Party.", translation: "We bought a bottle of wine for the party." }
    ],
    351: [
      { text: "Das Essen steht auf dem *Tisch*.", translation: "The food is on the table." },
      { text: "Wir haben einen neuen *Tisch* fürs Wohnzimmer gekauft.", translation: "We bought a new table for the living room." },
      { text: "Setz dich an den *Tisch*.", translation: "Sit down at the table." }
    ],
    352: [
      { text: "Dieser *Stuhl* ist sehr bequem.", translation: "This chair is very comfortable." },
      { text: "Kannst du mir einen *Stuhl* holen?", translation: "Can you get me a chair?" },
      { text: "Wir brauchen mehr *Stühle* fürs Abendessen.", translation: "We need more chairs for the dinner." }
    ],
    353: [
      { text: "Ich gehe um zehn Uhr ins *Bett*.", translation: "I get into bed at ten." },
      { text: "Mein *Bett* ist sehr weich.", translation: "My bed is very soft." },
      { text: "Das Kind schläft in einem kleinen *Bett*.", translation: "The child sleeps in a small bed." }
    ],
    354: [
      { text: "Kannst du die *Tür* schließen?", translation: "Can you close the door?" },
      { text: "Die *Tür* war abgeschlossen.", translation: "The door was locked." },
      { text: "Er klopfte an die *Tür*.", translation: "He knocked on the door." }
    ],
    355: [
      { text: "Kannst du das *Fenster* öffnen?", translation: "Can you open the window?" },
      { text: "Das *Fenster* war schmutzig.", translation: "The window was dirty." },
      { text: "Die Sonne schien durch das *Fenster* herein.", translation: "The sun shone in through the window." }
    ],
    356: [
      { text: "Das Bild hängt an der *Wand*.", translation: "The picture hangs on the wall." },
      { text: "Die *Wand* ist weiß gestrichen.", translation: "The wall is painted white." },
      { text: "Wir haben ein Regal an der *Wand* angebracht.", translation: "We attached a shelf to the wall." }
    ],
    357: [
      { text: "Der *Boden* ist im Winter kalt.", translation: "The floor is cold in winter." },
      { text: "Sie hat gestern den *Boden* gewischt.", translation: "She washed the floor yesterday." },
      { text: "Das Kind spielt auf dem *Boden*.", translation: "The child is playing on the floor." }
    ],
    358: [
      { text: "Das *Dach* tropft, wenn es regnet.", translation: "The roof leaks when it rains." },
      { text: "Wir haben das *Dach* im Sommer gestrichen.", translation: "We painted the roof this summer." },
      { text: "Der Schnee bedeckte das ganze *Dach*.", translation: "The snow covered the whole roof." }
    ],
    359: [
      { text: "Wir bauen Gemüse im *Garten* an.", translation: "We grow vegetables in the garden." },
      { text: "Unser *Garten* ist voller Blumen.", translation: "Our garden is full of flowers." },
      { text: "Die Kinder spielen jeden Tag im *Garten*.", translation: "The children play in the garden every day." }
    ],
    360: [
      { text: "Das Auto steht in der *Garage*.", translation: "The car is in the garage." },
      { text: "Wir haben letztes Jahr eine neue *Garage* gebaut.", translation: "We built a new garage last year." },
      { text: "Die *Garage* ist voller Werkzeug.", translation: "The garage is full of tools." }
    ],
    361: [
      { text: "Die *Lampe* im Wohnzimmer ist sehr schön.", translation: "The lamp in the living room is very nice." },
      { text: "Kannst du die *Lampe* anmachen?", translation: "Can you turn on the lamp?" },
      { text: "Wir haben eine neue *Lampe* fürs Schlafzimmer gekauft.", translation: "We bought a new lamp for the bedroom." }
    ],
    362: [
      { text: "Sie schaut sich im *Spiegel* an.", translation: "She looks at herself in the mirror." },
      { text: "Der *Spiegel* im Badezimmer ist groß.", translation: "The mirror in the bathroom is big." },
      { text: "Wir haben einen neuen *Spiegel* im Flur aufgehängt.", translation: "We hung up a new mirror in the hallway." }
    ],
    363: [
      { text: "Kannst du mir ein *Handtuch* geben?", translation: "Can you give me a towel?" },
      { text: "Das *Handtuch* war nass.", translation: "The towel was wet." },
      { text: "Wir waschen die *Handtücher* jede Woche.", translation: "We wash the towels every week." }
    ],
    364: [
      { text: "Wasch dir die Hände mit *Seife*.", translation: "Wash your hands with soap." },
      { text: "Die *Seife* roch nach Lavendel.", translation: "The soap smelled like lavender." },
      { text: "Wir brauchen mehr *Seife* im Badezimmer.", translation: "We need more soap in the bathroom." }
    ],
    365: [
      { text: "Die Milch ist im *Kühlschrank*.", translation: "The milk is in the fridge." },
      { text: "Unser *Kühlschrank* ist fast leer.", translation: "Our fridge is almost empty." },
      { text: "Wir haben gestern einen neuen *Kühlschrank* gekauft.", translation: "We bought a new fridge yesterday." }
    ],
    366: [
      { text: "Das Brot ist im *Ofen*.", translation: "The bread is in the oven." },
      { text: "Der *Ofen* ist jetzt sehr heiß.", translation: "The oven is very hot now." },
      { text: "Sie hat den Kuchen in den *Ofen* gestellt.", translation: "She put the cake in the oven." }
    ],
    367: [
      { text: "Wir sitzen auf dem *Sofa* und schauen fern.", translation: "We're sitting on the sofa watching TV." },
      { text: "Das *Sofa* ist weich und bequem.", translation: "The sofa is soft and comfortable." },
      { text: "Die Katze schläft immer auf dem *Sofa*.", translation: "The cat always sleeps on the sofa." }
    ],
    368: [
      { text: "Das Buch steht im *Regal*.", translation: "The book is on the shelf." },
      { text: "Wir brauchen ein neues *Regal* für die Küche.", translation: "We need a new shelf for the kitchen." },
      { text: "Das *Regal* ist voller Bücher.", translation: "The shelf is full of books." }
    ],
    369: [
      { text: "Er rannte die *Treppe* hinauf.", translation: "He ran up the stairs." },
      { text: "Die *Treppe* ist steil und schmal.", translation: "The stairs are steep and narrow." },
      { text: "Sei vorsichtig auf der *Treppe*.", translation: "Be careful on the stairs." }
    ],
    370: [
      { text: "Wir haben den *Aufzug* in den fünften Stock genommen.", translation: "We took the elevator up to the fifth floor." },
      { text: "Der *Aufzug* war heute kaputt.", translation: "The elevator was broken today." },
      { text: "Er hat Angst, den *Aufzug* zu nehmen.", translation: "He's afraid of taking the elevator." }
    ],
    371: [
      { text: "Wir haben einen *Hund* namens Rex.", translation: "We have a dog named Rex." },
      { text: "Der *Hund* rannte dem Ball hinterher.", translation: "The dog ran after the ball." },
      { text: "Er geht jeden Morgen mit dem *Hund* raus.", translation: "He walks the dog every morning." }
    ],
    372: [
      { text: "Die *Katze* schläft den ganzen Tag.", translation: "The cat sleeps all day." },
      { text: "Wir haben letztes Jahr eine *Katze* adoptiert.", translation: "We adopted a cat last year." },
      { text: "Unsere *Katze* ist schwarz und weiß.", translation: "Our cat is black and white." }
    ],
    373: [
      { text: "Ich hörte draußen einen *Vogel* singen.", translation: "I heard a bird singing outside." },
      { text: "Der *Vogel* flog schnell weg.", translation: "The bird flew away quickly." },
      { text: "Wir sahen viele *Vögel* im Park.", translation: "We saw many birds in the park." }
    ],
    374: [
      { text: "Sie reitet jedes Wochenende ein *Pferd*.", translation: "She rides a horse every weekend." },
      { text: "Das *Pferd* rannte schnell über das Feld.", translation: "The horse ran fast across the field." },
      { text: "Wir sahen *Pferde* auf dem Bauernhof.", translation: "We saw horses at the farm." }
    ],
    375: [
      { text: "Der Bauer hat viele *Kühe*.", translation: "The farmer has many cows." },
      { text: "Die *Kuh* graste auf dem Feld.", translation: "The cow grazed in the field." },
      { text: "Wir sahen *Kühe* am Straßenrand.", translation: "We saw cows along the road." }
    ],
    376: [
      { text: "Es gibt viele *Schafe* auf dem Berg.", translation: "There are many sheep in the mountains." },
      { text: "Das *Schaf* hatte weiße Wolle.", translation: "The sheep had white wool." },
      { text: "Der Bauer schert die *Schafe* im Frühling.", translation: "The farmer shears the sheep in spring." }
    ],
    377: [
      { text: "Der Bauer hat fünf *Schweine*.", translation: "The farmer has five pigs." },
      { text: "Das *Schwein* war rosa und schmutzig.", translation: "The pig was pink and dirty." },
      { text: "Wir sahen *Schweine* beim Hofbesuch.", translation: "We saw pigs on the farm visit." }
    ],
    378: [
      { text: "Das *Huhn* legte jeden Tag Eier.", translation: "The hen laid eggs every day." },
      { text: "Wir haben fünf *Hühner* im Garten.", translation: "We have five hens in the garden." },
      { text: "Die *Hühner* liefen auf dem Hof herum.", translation: "The hens ran around the farmyard." }
    ],
    379: [
      { text: "In der Küche ist eine *Maus*.", translation: "There's a mouse in the kitchen." },
      { text: "Die Katze jagte die *Maus*.", translation: "The cat chased the mouse." },
      { text: "Wir sahen eine kleine *Maus* vorbeilaufen.", translation: "We saw a small mouse run by." }
    ],
    380: [
      { text: "Die Kinder haben ein *Kaninchen* als Haustier.", translation: "The children have a rabbit as a pet." },
      { text: "Das *Kaninchen* fraß Karotten.", translation: "The rabbit ate carrots." },
      { text: "Wir sahen ein wildes *Kaninchen* im Garten.", translation: "We saw a wild rabbit in the garden." }
    ],
    381: [
      { text: "Wir haben einen *Baum* im Garten gepflanzt.", translation: "We planted a tree in the garden." },
      { text: "Der *Baum* ist sehr hoch.", translation: "The tree is very tall." },
      { text: "Die Vögel bauten ein Nest im *Baum*.", translation: "The birds built a nest in the tree." }
    ],
    382: [
      { text: "Sie gab mir eine *Blume*.", translation: "She gave me a flower." },
      { text: "Die *Blumen* im Garten sind wunderschön.", translation: "The flowers in the garden are beautiful." },
      { text: "Wir haben im Frühling neue *Blumen* gepflanzt.", translation: "We planted new flowers in spring." }
    ],
    383: [
      { text: "Das *Gras* ist im Sommer grün.", translation: "The grass is green in summer." },
      { text: "Die Kinder spielen auf dem *Gras*.", translation: "The children are playing on the grass." },
      { text: "Wir mähen jede Woche das *Gras*.", translation: "We mow the grass every week." }
    ],
    384: [
      { text: "Wir sind gestern auf den *Berg* geklettert.", translation: "We climbed the mountain yesterday." },
      { text: "Der *Berg* war mit Schnee bedeckt.", translation: "The mountain was covered in snow." },
      { text: "Die Aussicht vom *Berg* war fantastisch.", translation: "The view from the mountain was fantastic." }
    ],
    385: [
      { text: "Der *Fluss* fließt durch die Stadt.", translation: "The river runs through the city." },
      { text: "Wir haben gestern im *Fluss* geangelt.", translation: "We fished in the river yesterday." },
      { text: "Die Kinder schwammen im *Fluss*.", translation: "The children swam in the river." }
    ],
    386: [
      { text: "Wir wohnen in der Nähe vom *Meer*.", translation: "We live near the sea." },
      { text: "Das *Meer* war heute ruhig.", translation: "The sea was calm today." },
      { text: "Sie segelten über das *Meer*.", translation: "They sailed across the sea." }
    ],
    387: [
      { text: "Wir schwimmen im Sommer im *See*.", translation: "We swim in the lake in summer." },
      { text: "Der *See* war still und klar.", translation: "The lake was calm and clear." },
      { text: "Die Hütte liegt an einem kleinen *See*.", translation: "The cabin is by a small lake." }
    ],
    388: [
      { text: "Wir haben einen Spaziergang im *Wald* gemacht.", translation: "We went for a walk in the forest." },
      { text: "Der *Wald* war voller Bäume und Vögel.", translation: "The forest was full of trees and birds." },
      { text: "Die Kinder sammelten Pilze im *Wald*.", translation: "The children picked mushrooms in the forest." }
    ],
    389: [
      { text: "Wir haben den ganzen Tag am *Strand* verbracht.", translation: "We spent the whole day at the beach." },
      { text: "Der *Strand* war voller Leute.", translation: "The beach was full of people." },
      { text: "Die Kinder bauten Sandburgen am *Strand*.", translation: "The children built sandcastles on the beach." }
    ],
    390: [
      { text: "Der *Himmel* ist heute blau.", translation: "The sky is blue today." },
      { text: "Wir sahen die Sterne am *Himmel*.", translation: "We saw the stars in the sky." },
      { text: "Der *Himmel* wurde bei Sonnenuntergang rot.", translation: "The sky turned red at sunset." }
    ],
    391: [
      { text: "Sie ist *dreißig* Jahre alt.", translation: "She's thirty years old." },
      { text: "Wir haben *dreißig* Minuten gewartet.", translation: "We waited thirty minutes." },
      { text: "Der April hat *dreißig* Tage.", translation: "April has thirty days." }
    ],
    392: [
      { text: "Er ist *vierzig* Jahre alt.", translation: "He's forty years old." },
      { text: "Wir sind *vierzig* Minuten gefahren.", translation: "We drove for forty minutes." },
      { text: "Das Ticket kostete *vierzig* Euro.", translation: "The ticket cost forty euros." }
    ],
    393: [
      { text: "Oma ist *fünfzig* Jahre alt.", translation: "Grandma is fifty years old." },
      { text: "Wir haben *fünfzig* Minuten auf das Flugzeug gewartet.", translation: "We waited fifty minutes for the plane." },
      { text: "Es gab *fünfzig* Gäste bei der Hochzeit.", translation: "There were fifty guests at the wedding." }
    ],
    394: [
      { text: "Es ist *hundert* Jahre her, dass das Haus gebaut wurde.", translation: "It's a hundred years since the house was built." },
      { text: "Wir haben *hundert* Euro für das Ticket bezahlt.", translation: "We paid a hundred euros for the ticket." },
      { text: "Es waren *hundert* Menschen beim Konzert.", translation: "There were a hundred people at the concert." }
    ],
    395: [
      { text: "Die Stadt hat über *tausend* Einwohner.", translation: "The town has over a thousand inhabitants." },
      { text: "Wir haben *tausend* Euro für die Reise bezahlt.", translation: "We paid a thousand euros for the trip." },
      { text: "Es waren *tausend* Sterne am Himmel.", translation: "There were a thousand stars in the sky." }
    ],
    396: [
      { text: "Der Himmel ist heute *grau*.", translation: "The sky is grey today." },
      { text: "Er hat ein *graues* Auto.", translation: "He has a grey car." },
      { text: "Ihre Katze ist *grau* und weiß.", translation: "Her cat is grey and white." }
    ],
    397: [
      { text: "Das ist mein *erster* Tag bei der Arbeit.", translation: "This is my first day at work." },
      { text: "Wir wohnen im *ersten* Stock.", translation: "We live on the first floor." },
      { text: "Sie kam *als Erste* ins Ziel.", translation: "She came first in the race." }
    ],
    398: [
      { text: "Das ist der *letzte* Tag des Urlaubs.", translation: "This is the last day of the holiday." },
      { text: "Er war der *Letzte*, der ging.", translation: "He was the last one to leave." },
      { text: "Es war der *letzte* Apfel im Korb.", translation: "It was the last apple in the basket." }
    ],
    399: [
      { text: "Wir haben den Kuchen in zwei *Hälften* geteilt.", translation: "We divided the cake into two halves." },
      { text: "Ich habe nur eine *Hälfte* des Apfels gegessen.", translation: "I only ate half of the apple." },
      { text: "Die zweite *Hälfte* des Films war besser.", translation: "The second half of the movie was better." }
    ],
    400: [
      { text: "Wie ist deine *Nummer*?", translation: "What's your number?" },
      { text: "Wir wohnen in *Nummer* zehn.", translation: "We live at number ten." },
      { text: "Kannst du mir ihre *Nummer* geben?", translation: "Can you give me her number?" }
    ],
    401: [
      { text: "Ich bin *ängstlich*, wenn ich Spinnen sehe.", translation: "I'm afraid when I see spiders." },
      { text: "Sie wurde durch den Blitz *ängstlich*.", translation: "She got scared by the lightning." },
      { text: "Sei nicht *ängstlich*, alles wird gut.", translation: "Don't be afraid, everything's fine." }
    ],
    402: [
      { text: "Ich war sehr *überrascht* über das Geschenk.", translation: "I was very surprised by the gift." },
      { text: "Sie sah *überrascht* aus.", translation: "She looked surprised." },
      { text: "Wir waren *überrascht* über das Ergebnis.", translation: "We were surprised by the result." }
    ],
    403: [
      { text: "Ich bin von diesem Spiel *gelangweilt*.", translation: "I'm bored of this game." },
      { text: "Die Kinder waren nach einer Stunde *gelangweilt*.", translation: "The children got bored after an hour." },
      { text: "Sie sah im Unterricht *gelangweilt* aus.", translation: "She looked bored in class." }
    ],
    404: [
      { text: "Sie ist in schwierigen Situationen immer *ruhig*.", translation: "She's always calm in difficult situations." },
      { text: "Das Meer war heute *ruhig*.", translation: "The sea was calm today." },
      { text: "Wir hatten einen *ruhigen* Abend zu Hause.", translation: "We had a calm evening at home." }
    ],
    405: [
      { text: "Ich bin sehr *stolz* auf dich.", translation: "I'm very proud of you." },
      { text: "Er war *stolz* auf seine Leistung.", translation: "He was proud of his achievement." },
      { text: "Die Eltern waren *stolz* auf ihre Kinder.", translation: "The parents were proud of their children." }
    ],
    406: [
      { text: "Er ist sehr *stark*.", translation: "He's very strong." },
      { text: "Der Kaffee war zu *stark* für mich.", translation: "The coffee was too strong for me." },
      { text: "Sie hat *starke* Arme.", translation: "She has strong arms." }
    ],
    407: [
      { text: "Er fühlte sich nach der Krankheit *schwach*.", translation: "He felt weak after the illness." },
      { text: "Das Signal ist hier *schwach*.", translation: "The signal is weak here." },
      { text: "Der Tee war etwas *schwach*.", translation: "The tea was a bit weak." }
    ],
    408: [
      { text: "Die Aussicht war *hübsch*.", translation: "The view was beautiful." },
      { text: "Sie hat ein *hübsches* Lächeln.", translation: "She has a beautiful smile." },
      { text: "Die Blumen im Garten sind *hübsch*.", translation: "The flowers in the garden are beautiful." }
    ],
    409: [
      { text: "Das Gebäude ist ziemlich *hässlich*.", translation: "That building is quite ugly." },
      { text: "Er hatte eine *hässliche* Wunde am Arm.", translation: "He had an ugly wound on his arm." },
      { text: "Das Wetter war gestern *hässlich*.", translation: "The weather was ugly yesterday." }
    ],
    410: [
      { text: "Sie ist noch sehr *jung*.", translation: "She's still very young." },
      { text: "Er war *jung*, als er von zu Hause auszog.", translation: "He was young when he moved out." },
      { text: "Die *Jungen* reisen gerne viel.", translation: "Young people like to travel a lot." }
    ],
    411: [
      { text: "Seine Familie ist sehr *reich*.", translation: "His family is very rich." },
      { text: "Er wurde *reich*, als er das Haus verkaufte.", translation: "He became rich from selling the house." },
      { text: "Das Land ist *reich* an Bodenschätzen.", translation: "The country is rich in natural resources." }
    ],
    412: [
      { text: "Viele Menschen dort sind *arm*.", translation: "Many people there are poor." },
      { text: "Die Familie war *arm*, aber glücklich.", translation: "The family was poor but happy." },
      { text: "Er wuchs in einem *armen* Viertel auf.", translation: "He grew up in a poor neighborhood." }
    ],
    413: [
      { text: "Die Küche ist jetzt ganz *sauber*.", translation: "The kitchen is completely clean now." },
      { text: "Das Wasser im See ist *sauber*.", translation: "The water in the lake is clean." },
      { text: "Sie mag ein *sauberes* Zuhause.", translation: "She likes a clean home." }
    ],
    414: [
      { text: "Meine Schuhe sind sehr *schmutzig*.", translation: "My shoes are very dirty." },
      { text: "Der Boden war nach der Party *schmutzig*.", translation: "The floor was dirty after the party." },
      { text: "Er hatte *schmutzige* Hände von der Gartenarbeit.", translation: "He had dirty hands from gardening." }
    ],
    415: [
      { text: "Der Film war sehr *lustig*.", translation: "The movie was very funny." },
      { text: "Er erzählt immer *lustige* Geschichten.", translation: "He always tells funny stories." },
      { text: "Es war ein *lustiges* Spiel.", translation: "It was a funny game." }
    ],
    416: [
      { text: "Der *Weg* war voller Autos.", translation: "The road was full of cars." },
      { text: "Wir fuhren auf einem schmalen *Weg*.", translation: "We drove on a narrow road." },
      { text: "Welchen *Weg* sollen wir nehmen?", translation: "Which road should we take?" }
    ],
    417: [
      { text: "Wir fuhren über die *Brücke* in die Stadt.", translation: "We drove over the bridge to the city." },
      { text: "Die *Brücke* ist sehr alt.", translation: "The bridge is very old." },
      { text: "Es gibt eine schöne Aussicht von der *Brücke*.", translation: "There's a nice view from the bridge." }
    ],
    418: [
      { text: "Wir nahmen ein *Taxi* zum Flughafen.", translation: "We took a taxi to the airport." },
      { text: "Das *Taxi* kam schnell.", translation: "The taxi arrived quickly." },
      { text: "Kannst du ein *Taxi* rufen?", translation: "Can you call for a taxi?" }
    ],
    419: [
      { text: "Mein *Gepäck* ging am Flughafen verloren.", translation: "My luggage got lost at the airport." },
      { text: "Wir haben das *Gepäck* am Abend davor gepackt.", translation: "We packed the luggage the evening before." },
      { text: "Das *Gepäck* war zu schwer.", translation: "The luggage was too heavy." }
    ],
    420: [
      { text: "Denk daran, deinen *Reisepass* mitzunehmen.", translation: "Remember to bring your passport." },
      { text: "Ich habe letztes Jahr meinen *Reisepass* verloren.", translation: "I lost my passport last year." },
      { text: "Mein *Reisepass* läuft nächstes Jahr ab.", translation: "My passport expires next year." }
    ],
    421: [
      { text: "Der *Flug* war lang und anstrengend.", translation: "The flight was long and tiring." },
      { text: "Wir haben einen *Flug* nach Rom gebucht.", translation: "We booked a flight to Rome." },
      { text: "Der *Flug* hatte wegen des Wetters Verspätung.", translation: "The flight was delayed because of the weather." }
    ],
    422: [
      { text: "Ist dieser *Sitz* frei?", translation: "Is this seat free?" },
      { text: "Ich saß auf einem *Sitz* am Fenster.", translation: "I sat in a seat by the window." },
      { text: "Die *Sitze* im Flugzeug waren eng.", translation: "The seats on the plane were cramped." }
    ],
    423: [
      { text: "Der *Fahrer* fuhr sehr vorsichtig.", translation: "The driver drove very carefully." },
      { text: "Er arbeitet als *Fahrer* für eine Firma.", translation: "He works as a driver for a company." },
      { text: "Wir dankten dem *Fahrer*, als wir ausstiegen.", translation: "We thanked the driver when we got off." }
    ],
    424: [
      { text: "Heute Morgen war viel *Verkehr*.", translation: "There was a lot of traffic this morning." },
      { text: "Der *Verkehr* stand völlig still.", translation: "The traffic was completely still." },
      { text: "Wir kamen wegen des *Verkehrs* zu spät.", translation: "We were late because of the traffic." }
    ],
    425: [
      { text: "Die *Reise* nach Deutschland dauerte zehn Stunden.", translation: "The journey to Germany took ten hours." },
      { text: "Wir planen nächstes Jahr eine lange *Reise*.", translation: "We're planning a long journey next year." },
      { text: "Die *Reise* war voller Abenteuer.", translation: "The journey was full of adventures." }
    ],
    426: [
      { text: "Kann ich mir deinen *Kugelschreiber* leihen?", translation: "Can I borrow your pen?" },
      { text: "Mein *Kugelschreiber* hörte auf zu schreiben.", translation: "My pen stopped writing." },
      { text: "Sie schrieb den Brief mit einem blauen *Kugelschreiber*.", translation: "She wrote the letter with a blue pen." }
    ],
    427: [
      { text: "Ich zeichne immer mit *Bleistift*.", translation: "I always draw with a pencil." },
      { text: "Mein *Bleistift* muss gespitzt werden.", translation: "My pencil needs sharpening." },
      { text: "Kann ich mir einen *Bleistift* leihen?", translation: "Can I borrow a pencil?" }
    ],
    428: [
      { text: "Kannst du mir ein *Papier* geben?", translation: "Can you give me a piece of paper?" },
      { text: "Das *Papier* war voller Notizen.", translation: "The paper was full of notes." },
      { text: "Wir brauchen mehr *Papier* für den Drucker.", translation: "We need more paper for the printer." }
    ],
    429: [
      { text: "Ich schreibe immer in mein *Heft*.", translation: "I always write in my notebook." },
      { text: "Das *Heft* war voller Zeichnungen.", translation: "The notebook was full of drawings." },
      { text: "Sie kaufte ein neues *Heft* für die Schule.", translation: "She bought a new notebook for school." }
    ],
    430: [
      { text: "Das Buch liegt auf dem *Schreibtisch*.", translation: "The book is on the desk." },
      { text: "Mein *Schreibtisch* ist immer unordentlich.", translation: "My desk is always messy." },
      { text: "Wir haben einen neuen *Schreibtisch* fürs Büro gekauft.", translation: "We bought a new desk for the office." }
    ],
    431: [
      { text: "Wir haben um zehn Uhr eine *Besprechung*.", translation: "We have a meeting at ten." },
      { text: "Die *Besprechung* dauerte zwei Stunden.", translation: "The meeting lasted two hours." },
      { text: "Sie bereitete sich gestern Abend auf die *Besprechung* vor.", translation: "She prepared for the meeting last night." }
    ],
    432: [
      { text: "Ich habe dir gestern eine *E-Mail* geschickt.", translation: "I sent you an email yesterday." },
      { text: "Hast du heute deine *E-Mail* überprüft?", translation: "Have you checked your email today?" },
      { text: "Wir kommunizieren meistens per *E-Mail*.", translation: "We communicate mostly via email." }
    ],
    433: [
      { text: "Mein *Chef* ist sehr nett.", translation: "My boss is very nice." },
      { text: "Der *Chef* gab uns heute frei.", translation: "The boss gave us the day off." },
      { text: "Sie wurde letztes Jahr *Chefin* der Abteilung.", translation: "She became boss of the department last year." }
    ],
    434: [
      { text: "Ich bekomme jeden Monat *Gehalt*.", translation: "I get paid a salary every month." },
      { text: "Sein *Gehalt* stieg dieses Jahr.", translation: "His salary increased this year." },
      { text: "Wir haben mein *Gehalt* mit dem Chef besprochen.", translation: "We discussed my salary with the boss." }
    ],
    435: [
      { text: "Er arbeitet in einer großen *Firma*.", translation: "He works at a big company." },
      { text: "Die *Firma* stellte zehn neue Leute ein.", translation: "The company hired ten new people." },
      { text: "Wir haben letztes Jahr eine eigene *Firma* gegründet.", translation: "We started our own company last year." }
    ],
    436: [
      { text: "Sie hat sich gestern den *Arm* gebrochen.", translation: "She broke her arm yesterday." },
      { text: "Er hielt das Kind in den *Armen*.", translation: "He held the child in his arms." },
      { text: "Ich habe Schmerzen im *Arm*.", translation: "My arm hurts." }
    ],
    437: [
      { text: "Er hat sich beim Fußball das *Bein* verletzt.", translation: "He injured his leg in football." },
      { text: "Der Hund hat vier *Beine*.", translation: "The dog has four legs." },
      { text: "Ich habe nach dem Lauf Schmerzen im *Bein*.", translation: "My leg hurts after the run." }
    ],
    438: [
      { text: "Sie hat sich in den *Finger* geschnitten.", translation: "She cut her finger." },
      { text: "Er zeigte mit dem *Finger* auf das Haus.", translation: "He pointed with his finger at the house." },
      { text: "Der Ring passt an diesen *Finger*.", translation: "The ring fits on this finger." }
    ],
    439: [
      { text: "Ich habe heute Schmerzen im *Rücken*.", translation: "My back hurts today." },
      { text: "Er trug den Rucksack auf dem *Rücken*.", translation: "He carried the backpack on his back." },
      { text: "Sie liegt auf dem *Rücken* und ruht sich aus.", translation: "She's lying on her back resting." }
    ],
    440: [
      { text: "Ihr *Herz* schlug schnell.", translation: "Her heart beat fast." },
      { text: "Er hat ein gutes *Herz*.", translation: "He has a good heart." },
      { text: "Der Arzt hörte mein *Herz* ab.", translation: "The doctor listened to my heart." }
    ],
    441: [
      { text: "Zieh deinen *Mantel* an, es ist kalt draußen.", translation: "Put on your coat, it's cold outside." },
      { text: "Ihr *Mantel* war lang und schwarz.", translation: "Her coat was long and black." },
      { text: "Ich habe mir einen neuen *Mantel* für den Winter gekauft.", translation: "I bought a new coat for winter." }
    ],
    442: [
      { text: "Sie trägt einen schönen *Rock*.", translation: "She's wearing a nice skirt." },
      { text: "Der *Rock* war rot und kurz.", translation: "The skirt was red and short." },
      { text: "Ich habe mir gestern einen neuen *Rock* gekauft.", translation: "I bought a new skirt yesterday." }
    ],
    443: [
      { text: "Ich finde nur eine *Socke*.", translation: "I can only find one sock." },
      { text: "Meine *Socken* sind alle unterschiedlich.", translation: "My socks are all different." },
      { text: "Er hat eine *Socke* in der Waschmaschine verloren.", translation: "He lost a sock in the washing machine." }
    ],
    444: [
      { text: "Zieh deine *Handschuhe* an, es ist kalt.", translation: "Put on your gloves, it's cold." },
      { text: "Ich habe gestern einen *Handschuh* verloren.", translation: "I lost a glove yesterday." },
      { text: "Ihre *Handschuhe* waren aus Wolle.", translation: "Her gloves were made of wool." }
    ],
    445: [
      { text: "Sie trug einen warmen *Schal*.", translation: "She wore a warm scarf." },
      { text: "Der *Schal* war blau und weich.", translation: "The scarf was blue and soft." },
      { text: "Ich habe zu Weihnachten einen *Schal* geschenkt bekommen.", translation: "I got a scarf as a gift for Christmas." }
    ],
    446: [
      { text: "Ich muss jeden Tag meine *Medizin* nehmen.", translation: "I have to take my medicine every day." },
      { text: "Die *Medizin* half gegen die Kopfschmerzen.", translation: "The medicine helped with the headache." },
      { text: "Der Arzt verschrieb mir *Medizin*.", translation: "The doctor prescribed medicine for me." }
    ],
    447: [
      { text: "Das Kind hat heute hohes *Fieber*.", translation: "The child has a high fever today." },
      { text: "Das *Fieber* sank nach der Medizin.", translation: "The fever went down after the medicine." },
      { text: "Sie blieb wegen *Fieber* zu Hause.", translation: "She stayed home because of a fever." }
    ],
    448: [
      { text: "Ich spüre *Schmerz* im Rücken.", translation: "I feel pain in my back." },
      { text: "Der *Schmerz* verschwand nach der Ruhe.", translation: "The pain disappeared after rest." },
      { text: "Sie hatte starke *Schmerzen* im Bauch.", translation: "She had strong pain in her stomach." }
    ],
    449: [
      { text: "Er hat seit einer Woche *Husten*.", translation: "He has had a cough for a week." },
      { text: "Ihr *Husten* wurde in der Nacht schlimmer.", translation: "Her cough got worse at night." },
      { text: "Ich habe Medizin gegen den *Husten* genommen.", translation: "I took medicine for the cough." }
    ],
    450: [
      { text: "Der Arzt nahm eine Probe von meinem *Blut*.", translation: "The doctor took a sample of my blood." },
      { text: "Das *Blut* floss aus der Wunde.", translation: "The blood flowed from the cut." },
      { text: "Er spendete gestern *Blut*.", translation: "He donated blood yesterday." }
    ],
    451: [
      { text: "Ich zahle immer mit *Bargeld*.", translation: "I always pay with cash." },
      { text: "Hast du *Bargeld* dabei?", translation: "Do you have cash on you?" },
      { text: "Der Laden akzeptiert kein *Bargeld* mehr.", translation: "The shop no longer accepts cash." }
    ],
    452: [
      { text: "Ich habe mit *Kreditkarte* bezahlt.", translation: "I paid with credit card." },
      { text: "Meine *Kreditkarte* wurde abgelehnt.", translation: "My credit card was declined." },
      { text: "Kann ich hier mit *Kreditkarte* zahlen?", translation: "Can I use a credit card here?" }
    ],
    453: [
      { text: "Wir haben *Rabatt* auf das Hotel bekommen.", translation: "We got a discount on the hotel." },
      { text: "Der *Rabatt* betrug zwanzig Prozent.", translation: "The discount was twenty percent." },
      { text: "Der Laden gab Studenten *Rabatt*.", translation: "The shop gave a discount to students." }
    ],
    454: [
      { text: "Er ist ein treuer *Kunde*.", translation: "He's a loyal customer." },
      { text: "Der *Kunde* beschwerte sich über den Preis.", translation: "The customer complained about the price." },
      { text: "Wir haben dieses Jahr viele neue *Kunden*.", translation: "We have many new customers this year." }
    ],
    455: [
      { text: "Sie gab mir ein schönes *Geschenk*.", translation: "She gave me a nice gift." },
      { text: "Das *Geschenk* war in rotes Papier eingewickelt.", translation: "The gift was wrapped in red paper." },
      { text: "Wir haben ein *Geschenk* für seinen Geburtstag gekauft.", translation: "We bought a gift for his birthday." }
    ],
    456: [
      { text: "Ich liebe es, *Musik* zu hören.", translation: "I love listening to music." },
      { text: "Die *Musik* auf der Party war fantastisch.", translation: "The music at the party was fantastic." },
      { text: "Sie spielt klassische *Musik*.", translation: "She plays classical music." }
    ],
    457: [
      { text: "Dieses *Lied* ist mein Favorit.", translation: "This song is my favorite." },
      { text: "Wir sangen zusammen ein altes *Lied*.", translation: "We sang an old song together." },
      { text: "Das *Lied* handelt von Liebe.", translation: "The song is about love." }
    ],
    458: [
      { text: "Wir haben gestern einen spannenden *Film* gesehen.", translation: "We watched an exciting film yesterday." },
      { text: "Der *Film* dauerte zwei Stunden.", translation: "The film lasted two hours." },
      { text: "Welchen *Film* willst du heute Abend sehen?", translation: "Which film do you want to watch tonight?" }
    ],
    459: [
      { text: "Die Kinder spielen ein lustiges *Spiel*.", translation: "The children are playing a fun game." },
      { text: "Das *Spiel* dauerte den ganzen Abend.", translation: "The game lasted all evening." },
      { text: "Wir haben ein neues *Spiel* zu seinem Geburtstag gekauft.", translation: "We bought a new game for his birthday." }
    ],
    460: [
      { text: "Wir haben am Samstag eine *Party*.", translation: "We're having a party on Saturday." },
      { text: "Die *Party* war sehr schön.", translation: "The party was very nice." },
      { text: "Sie lud alle ihre Freunde zur *Party* ein.", translation: "She invited all her friends to the party." }
    ],
    461: [
      { text: "Er spielt jedes Wochenende *Fußball*.", translation: "He plays football every weekend." },
      { text: "*Fußball* ist hier der beliebteste Sport.", translation: "Football is the most popular sport here." },
      { text: "Der Junge träumt davon, Profi im *Fußball* zu werden.", translation: "The boy dreams of becoming a professional in football." }
    ],
    462: [
      { text: "Wir spielen jeden Dienstag *Tennis*.", translation: "We play tennis every Tuesday." },
      { text: "Sie ist sehr gut im *Tennis*.", translation: "She's very good at tennis." },
      { text: "Er hat als Kind *Tennis* gelernt.", translation: "He learned tennis as a child." }
    ],
    463: [
      { text: "Er mag alle Arten von *Sport*.", translation: "He likes all kinds of sport." },
      { text: "*Sport* ist wichtig für die Gesundheit.", translation: "Sport is important for health." },
      { text: "Welchen *Sport* treibst du?", translation: "What sport do you do?" }
    ],
    464: [
      { text: "Unsere *Mannschaft* hat gestern das Spiel gewonnen.", translation: "Our team won the match yesterday." },
      { text: "Sie spielt für eine lokale *Mannschaft*.", translation: "She plays for a local team." },
      { text: "Die *Mannschaft* trainierte jeden Tag vor der Meisterschaft.", translation: "The team trained every day before the championship." }
    ],
    465: [
      { text: "Das Kind warf den *Ball* über den Zaun.", translation: "The child threw the ball over the fence." },
      { text: "Wir spielten mit einem roten *Ball*.", translation: "We played with a red ball." },
      { text: "Der *Ball* traf das Fenster.", translation: "The ball hit the window." }
    ],
    466: [
      { text: "Er spielt sehr gut *Gitarre*.", translation: "He plays guitar very well." },
      { text: "Meine *Gitarre* braucht neue Saiten.", translation: "My guitar needs new strings." },
      { text: "Sie hat letztes Jahr *Gitarre* gelernt.", translation: "She learned guitar last year." }
    ],
    467: [
      { text: "Sie spielt jeden Tag *Klavier*.", translation: "She plays piano every day." },
      { text: "Das *Klavier* steht im Wohnzimmer.", translation: "The piano is in the living room." },
      { text: "Er übt nach der Schule *Klavier*.", translation: "He practices piano after school." }
    ],
    468: [
      { text: "Kannst du ein *Foto* von uns machen?", translation: "Can you take a photo of us?" },
      { text: "Das *Foto* war sehr schön.", translation: "The photo was very nice." },
      { text: "Wir haben viele *Fotos* auf der Reise gemacht.", translation: "We took many photos on the trip." }
    ],
    469: [
      { text: "Mein *Hobby* ist Malen.", translation: "My hobby is painting." },
      { text: "Er hat viele *Hobbys*.", translation: "He has many hobbies." },
      { text: "Was ist dein *Hobby*?", translation: "What's your hobby?" }
    ],
    470: [
      { text: "Wir fahren diesen Sommer in den *Urlaub*.", translation: "We're going on holiday this summer." },
      { text: "Der *Urlaub* war viel zu kurz.", translation: "The holiday was far too short." },
      { text: "Wohin fährst du dieses Jahr in den *Urlaub*?", translation: "Where are you going on holiday this year?" }
    ],
    471: [
      { text: "Ich nutze jeden Tag das *Internet*.", translation: "I use the internet every day." },
      { text: "Das *Internet* war gestern down.", translation: "The internet was down yesterday." },
      { text: "Wir haben den Preis im *Internet* überprüft.", translation: "We checked the price on the internet." }
    ],
    472: [
      { text: "Diese *Webseite* ist sehr nützlich.", translation: "This website is very useful." },
      { text: "Wir haben eine neue *Webseite* für die Firma erstellt.", translation: "We made a new website for the company." },
      { text: "Die *Webseite* war einfach zu benutzen.", translation: "The website was easy to use." }
    ],
    473: [
      { text: "Ich habe mein *Passwort* vergessen.", translation: "I've forgotten my password." },
      { text: "Das *Passwort* muss mindestens acht Zeichen haben.", translation: "The password must have at least eight characters." },
      { text: "Teile dein *Passwort* nicht mit anderen.", translation: "Don't share your password with others." }
    ],
    474: [
      { text: "Mein *Bildschirm* ist zersprungen.", translation: "My screen is cracked." },
      { text: "Wir haben einen neuen *Bildschirm* für den Computer gekauft.", translation: "We bought a new screen for the computer." },
      { text: "Der Text auf dem *Bildschirm* war zu klein.", translation: "The text on the screen was too small." }
    ],
    475: [
      { text: "Meine *Tastatur* funktioniert nicht mehr richtig.", translation: "My keyboard is stopping working." },
      { text: "Er tippte schnell auf der *Tastatur*.", translation: "He typed quickly on the keyboard." },
      { text: "Wir haben gestern eine neue *Tastatur* gekauft.", translation: "We bought a new keyboard yesterday." }
    ],
    476: [
      { text: "Ich habe heute eine *Nachricht* von ihr bekommen.", translation: "I got a message from her today." },
      { text: "Kannst du mir eine *Nachricht* schicken?", translation: "Can you send me a message?" },
      { text: "Die *Nachricht* war kurz, aber nett.", translation: "The message was short but nice." }
    ],
    477: [
      { text: "Ich schaue jeden Abend die *Neuigkeiten*.", translation: "I watch the news every evening." },
      { text: "Die *Neuigkeiten* heute waren traurig.", translation: "The news today was sad." },
      { text: "Hast du die *Neuigkeiten* gehört?", translation: "Have you heard the news?" }
    ],
    478: [
      { text: "Der *Fernseher* steht im Wohnzimmer.", translation: "The television is in the living room." },
      { text: "Unser *Fernseher* ist ziemlich alt.", translation: "Our TV is quite old." },
      { text: "Kannst du den *Fernseher* ausschalten?", translation: "Can you turn off the TV?" }
    ],
    479: [
      { text: "Ich höre im Auto *Radio*.", translation: "I listen to the radio in the car." },
      { text: "Das *Radio* spielte den ganzen Tag Musik.", translation: "The radio played music all day." },
      { text: "Er kaufte ein altes *Radio* auf dem Flohmarkt.", translation: "He bought an old radio at the flea market." }
    ],
    480: [
      { text: "Sie hat letztes Jahr eine neue *Kamera* gekauft.", translation: "She bought a new camera last year." },
      { text: "Meine *Kamera* macht schöne Bilder.", translation: "My camera takes nice pictures." },
      { text: "Er hat die *Kamera* zu Hause vergessen.", translation: "He forgot the camera at home." }
    ],
    481: [
      { text: "Ich mag *auch* Kaffee.", translation: "I also like coffee." },
      { text: "Sie kommt *auch* heute Abend.", translation: "She's also coming tonight." },
      { text: "Wir müssen *auch* daran denken, Brot zu kaufen.", translation: "We also need to remember to buy bread." }
    ],
    482: [
      { text: "Ich habe *nur* fünf Minuten.", translation: "I only have five minutes." },
      { text: "Es kostete *nur* hundert Euro.", translation: "It only cost a hundred euros." },
      { text: "Sie aß *nur* wenig vom Essen.", translation: "She only ate a little of the food." }
    ],
    483: [
      { text: "Ich bin heute *sehr* glücklich.", translation: "I'm very happy today." },
      { text: "Es war gestern *sehr* kalt.", translation: "It was very cold yesterday." },
      { text: "Sie ist *sehr* gut in Mathe.", translation: "She's very good at math." }
    ],
    484: [
      { text: "*Vielleicht* können wir uns morgen treffen.", translation: "Maybe we can meet tomorrow." },
      { text: "Sie kommt *vielleicht* zur Party.", translation: "She might come to the party." },
      { text: "*Vielleicht* wird es morgen sonnig.", translation: "Maybe it'll be sunny tomorrow." }
    ],
    485: [
      { text: "Ich habe *schon* gegessen.", translation: "I've already eaten." },
      { text: "Bist du *schon* fertig?", translation: "Are you already done?" },
      { text: "Sie ist *schon* nach Hause gegangen.", translation: "She has already gone home." }
    ],
    486: [
      { text: "Wir beginnen das neue Jahr im *Januar*.", translation: "We start the new year in January." },
      { text: "Im *Januar* ist es kalt.", translation: "It's cold in January." },
      { text: "Mein Geburtstag ist im *Januar*.", translation: "My birthday is in January." }
    ],
    487: [
      { text: "Der *Februar* ist der kürzeste Monat.", translation: "February is the shortest month." },
      { text: "Wir fahren im *Februar* in die Berge.", translation: "We're going to the mountains in February." },
      { text: "Die Schule hat im *Februar* Winterferien.", translation: "School has winter break in February." }
    ],
    488: [
      { text: "Der Frühling beginnt im *März*.", translation: "Spring begins in March." },
      { text: "Sie wurde im *März* geboren.", translation: "She was born in March." },
      { text: "Wir planen im *März* eine Reise.", translation: "We're planning a trip in March." }
    ],
    489: [
      { text: "Im *April* regnet es viel.", translation: "It rains a lot in April." },
      { text: "Ostern ist oft im *April*.", translation: "Easter is often in April." },
      { text: "Wir feiern seinen Geburtstag im *April*.", translation: "We celebrate his birthday in April." }
    ],
    490: [
      { text: "Der *Mai* ist einer der schönsten Monate.", translation: "May is one of the nicest months." },
      { text: "Die Blumen blühen im *Mai*.", translation: "The flowers bloom in May." },
      { text: "Wir heiraten im *Mai*.", translation: "We're getting married in May." }
    ],
    491: [
      { text: "Die Schule endet im *Juni*.", translation: "School ends in June." },
      { text: "Der Sommer beginnt im *Juni*.", translation: "Summer begins in June." },
      { text: "Wir feiern das Fest im *Juni*.", translation: "We celebrate the festival in June." }
    ],
    492: [
      { text: "Der *Juli* ist der heißeste Monat.", translation: "July is the hottest month." },
      { text: "Wir fahren im *Juli* in den Urlaub.", translation: "We're going on holiday in July." },
      { text: "Sie hat den ganzen *Juli* frei.", translation: "She has time off all of July." }
    ],
    493: [
      { text: "Die Schule beginnt im *August* wieder.", translation: "School starts again in August." },
      { text: "Es ist im *August* immer noch warm.", translation: "It's still hot in August." },
      { text: "Wir feiern das Festival im *August*.", translation: "We celebrate the festival in August." }
    ],
    494: [
      { text: "Der Herbst beginnt im *September*.", translation: "Autumn begins in September." },
      { text: "Wir sind im *September* hierhergezogen.", translation: "We moved here in September." },
      { text: "Die Blätter beginnen im *September* zu fallen.", translation: "The leaves start to fall in September." }
    ],
    495: [
      { text: "Im *Oktober* wird es kälter.", translation: "It gets colder in October." },
      { text: "Wir feiern Halloween Ende *Oktober*.", translation: "We celebrate Halloween at the end of October." },
      { text: "Sie wurde im *Oktober* geboren.", translation: "She was born in October." }
    ],
    496: [
      { text: "Der *November* ist oft grau und nass.", translation: "November is often grey and wet." },
      { text: "Wir zünden im *November* Kerzen an.", translation: "We light candles in November." },
      { text: "Es schneit manchmal im *November*.", translation: "It sometimes snows in November." }
    ],
    497: [
      { text: "Wir feiern Weihnachten im *Dezember*.", translation: "We celebrate Christmas in December." },
      { text: "Der *Dezember* ist der dunkelste Monat.", translation: "December is the darkest month." },
      { text: "Die Familie versammelt sich im *Dezember*.", translation: "The family gathers in December." }
    ],
    498: [
      { text: "Welches *Datum* haben wir heute?", translation: "What's the date today?" },
      { text: "Wir haben ein *Datum* für die Besprechung festgelegt.", translation: "We set a date for the meeting." },
      { text: "Das *Datum* auf dem Ticket war falsch.", translation: "The date on the ticket was wrong." }
    ],
    499: [
      { text: "Ich habe es in meinem *Kalender* notiert.", translation: "I wrote it in my calendar." },
      { text: "Der *Kalender* hängt an der Wand.", translation: "The calendar hangs on the wall." },
      { text: "Schau im *Kalender* nach freien Tagen.", translation: "Check the calendar for free days." }
    ],
    500: [
      { text: "Alles Gute zum *Geburtstag*!", translation: "Happy birthday!" },
      { text: "Mein *Geburtstag* ist im Mai.", translation: "My birthday is in May." },
      { text: "Wir haben ihren *Geburtstag* mit Kuchen gefeiert.", translation: "We celebrated her birthday with cake." }
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
    ],
    6: [
      { text: "*Scusa*, sono in ritardo.", translation: "Sorry, I'm late." },
      { text: "*Scusa*, non ho sentito.", translation: "Sorry, I didn't hear." },
      { text: "Ha detto *scusa* per l'errore.", translation: "He said sorry for the mistake." }
    ],
    7: [
      { text: "Ogni *mattina* bevo un caffè.", translation: "Every morning I drink coffee." },
      { text: "La *mattina* era fredda e tranquilla.", translation: "The morning was cold and quiet." },
      { text: "Ci vediamo domani *mattina*.", translation: "See you tomorrow morning." }
    ],
    8: [
      { text: "Buona *sera*!", translation: "Good evening!" },
      { text: "La *sera* leggo un libro.", translation: "In the evening I read a book." },
      { text: "Ceniamo insieme la *sera*.", translation: "We eat dinner together in the evening." }
    ],
    9: [
      { text: "Oggi è un bel *giorno*.", translation: "Today is a nice day." },
      { text: "Ogni *giorno* faccio una passeggiata.", translation: "Every day I take a walk." },
      { text: "Il *giorno* è stato lungo e faticoso.", translation: "The day was long and tiring." }
    ],
    10: [
      { text: "Buona *notte*!", translation: "Good night!" },
      { text: "Dormo bene di *notte*.", translation: "I sleep well at night." },
      { text: "La *notte* era piena di stelle.", translation: "The night was full of stars." }
    ],
    11: [
      { text: "Posso avere un bicchiere d'*acqua*?", translation: "Can I have a glass of water?" },
      { text: "L'*acqua* è fredda e fresca.", translation: "The water is cold and fresh." },
      { text: "Beve molta *acqua* ogni giorno.", translation: "He drinks a lot of water every day." }
    ],
    12: [
      { text: "Il *cibo* era molto buono.", translation: "The food was very good." },
      { text: "Il *cibo* è importante per la salute.", translation: "Food is important for health." },
      { text: "Ha cucinato il *cibo* da sola.", translation: "She cooked the food herself." }
    ],
    13: [
      { text: "Bevo *caffè* ogni mattina.", translation: "I drink coffee every morning." },
      { text: "Un *caffè*, per favore.", translation: "A coffee, please." },
      { text: "Il *caffè* è caldo e forte.", translation: "The coffee is hot and strong." }
    ],
    14: [
      { text: "Compriamo il *pane* dal panettiere.", translation: "We buy bread at the bakery." },
      { text: "Il *pane* è fresco e morbido.", translation: "The bread is fresh and soft." },
      { text: "Mangia *pane* a colazione.", translation: "He eats bread for breakfast." }
    ],
    15: [
      { text: "Vivono in una *casa* grande.", translation: "They live in a big house." },
      { text: "La nostra *casa* ha tre piani.", translation: "Our house has three floors." },
      { text: "La *casa* si trova vicino al mare.", translation: "The house is by the sea." }
    ],
    16: [
      { text: "Guida una *macchina* rossa.", translation: "He drives a red car." },
      { text: "La *macchina* è parcheggiata fuori.", translation: "The car is parked outside." },
      { text: "Vogliamo comprare una *macchina* nuova.", translation: "We're going to buy a new car." }
    ],
    17: [
      { text: "Sto leggendo un *libro* avvincente.", translation: "I'm reading an exciting book." },
      { text: "Il *libro* è sul tavolo.", translation: "The book is on the table." },
      { text: "Le piacciono i *libri* di avventura.", translation: "She likes books about adventures." }
    ],
    18: [
      { text: "È il mio migliore *amico*.", translation: "He's my best friend." },
      { text: "Incontriamo gli *amici* nel weekend.", translation: "We meet friends on the weekend." },
      { text: "Il mio *amico* abita accanto.", translation: "My friend lives next door." }
    ],
    19: [
      { text: "La mia *famiglia* è grande e simpatica.", translation: "My family is big and nice." },
      { text: "Ci riuniamo come *famiglia* ogni Natale.", translation: "We gather as a family every Christmas." },
      { text: "La *famiglia* cena insieme.", translation: "The family eats dinner together." }
    ],
    20: [
      { text: "Vado a *scuola* ogni giorno.", translation: "I go to school every day." },
      { text: "La *scuola* è vicina a casa mia.", translation: "The school is near my house." },
      { text: "Lavora in una *scuola*.", translation: "She works at a school." }
    ],
    21: [
      { text: "Un *uomo* ci è passato accanto.", translation: "A man walked past us." },
      { text: "L'*uomo* alla finestra è gentile.", translation: "The man by the window is nice." },
      { text: "Un *uomo* alto è entrato nel negozio.", translation: "A tall man entered the shop." }
    ],
    22: [
      { text: "Una *donna* mi ha chiamato oggi.", translation: "A woman called me today." },
      { text: "La *donna* era molto gentile.", translation: "The woman was very polite." },
      { text: "La *donna* che dirige l'azienda è brava.", translation: "The woman who runs the company is skilled." }
    ],
    23: [
      { text: "Quel *bambino* è molto gentile.", translation: "That child is very kind." },
      { text: "Il *bambino* gioca in giardino.", translation: "The child is playing in the garden." },
      { text: "Abbiamo tre *bambini* a casa.", translation: "We have three children at home." }
    ],
    24: [
      { text: "La *bambina* ha i capelli rossi.", translation: "The girl has red hair." },
      { text: "Una giovane *bambina* sedeva sulla panchina.", translation: "A young girl sat on the bench." },
      { text: "La mia *bambina* ha otto anni.", translation: "My daughter is eight years old." }
    ],
    25: [
      { text: "Il *ragazzo* gioca a calcio.", translation: "The boy plays football." },
      { text: "Un *ragazzo* piccolo ha gridato forte.", translation: "A small boy shouted loudly." },
      { text: "Al mio *ragazzo* piace la musica.", translation: "My boy likes music." }
    ],
    26: [
      { text: "Mia *madre* è insegnante.", translation: "My mother is a teacher." },
      { text: "La *madre* cucina ogni sera.", translation: "Mother cooks every evening." },
      { text: "Chiamo spesso mia *madre*.", translation: "I call my mother often." }
    ],
    27: [
      { text: "Mio *padre* lavora come ingegnere.", translation: "My father works as an engineer." },
      { text: "Il *padre* ci porta a scuola.", translation: "Father drives us to school." },
      { text: "Sono fiero di mio *padre*.", translation: "I'm proud of my father." }
    ],
    28: [
      { text: "Mia *sorella* ha tre anni in meno.", translation: "My sister is three years younger." },
      { text: "Mia *sorella* studia medicina.", translation: "My sister studies medicine." },
      { text: "Io e mia *sorella* amiamo viaggiare.", translation: "My sister and I love to travel." }
    ],
    29: [
      { text: "Mio *fratello* è più alto di me.", translation: "My brother is taller than me." },
      { text: "Mio *fratello* suona la chitarra.", translation: "My brother plays guitar." },
      { text: "Io e mio *fratello* siamo buoni amici.", translation: "My brother and I are good friends." }
    ],
    30: [
      { text: "Mia *nonna* vive in campagna.", translation: "My grandmother lives in the countryside." },
      { text: "Mia *nonna* fa i dolci ogni domenica.", translation: "My grandmother bakes cakes every Sunday." },
      { text: "Vado spesso a trovare mia *nonna*.", translation: "I often visit my grandmother." }
    ],
    31: [
      { text: "Una casa *grande* si trova sulla collina.", translation: "A big house sits on the hill." },
      { text: "Ha un cane *grande*.", translation: "He has a big dog." },
      { text: "La città è molto *grande*.", translation: "The city is very big." }
    ],
    32: [
      { text: "Un bambino *piccolo* gioca nel parco.", translation: "A small child plays in the park." },
      { text: "Ha un cane *piccolo*.", translation: "She has a small dog." },
      { text: "La stanza è piuttosto *piccola*.", translation: "The room is quite small." }
    ],
    33: [
      { text: "Questo è un *buon* libro.", translation: "This is a good book." },
      { text: "Il cibo è molto *buono*.", translation: "The food is very good." },
      { text: "Il tempo è *buono* oggi.", translation: "The weather is good today." }
    ],
    34: [
      { text: "Il film era *cattivo* e noioso.", translation: "The movie was bad and boring." },
      { text: "Ha una *cattiva* abitudine.", translation: "He has a bad habit." },
      { text: "Il tempo sarà *cattivo* domani.", translation: "The weather will be bad tomorrow." }
    ],
    35: [
      { text: "Ho comprato un telefono *nuovo*.", translation: "I bought a new phone." },
      { text: "Questo è un libro *nuovo* della biblioteca.", translation: "This is a new book from the library." },
      { text: "Ci trasferiamo in una città *nuova*.", translation: "We're moving to a new city." }
    ],
    36: [
      { text: "Un uomo *vecchio* sedeva sulla panchina.", translation: "An old man sat on the bench." },
      { text: "La casa è *vecchia* e bella.", translation: "The house is old and beautiful." },
      { text: "Ha una macchina *vecchia*.", translation: "She has an old car." }
    ],
    37: [
      { text: "Il caffè *caldo* è buono d'inverno.", translation: "Warm coffee tastes good in winter." },
      { text: "Fa *caldo* nella stanza.", translation: "It's warm in the room." },
      { text: "Abbiamo avuto un'estate *calda* l'anno scorso.", translation: "We had a warm summer last year." }
    ],
    38: [
      { text: "Un vento *freddo* soffia oggi.", translation: "A cold wind is blowing today." },
      { text: "Il latte *freddo* è rinfrescante.", translation: "Cold milk is refreshing." },
      { text: "Fa *freddo* fuori stasera.", translation: "It's cold outside tonight." }
    ],
    39: [
      { text: "Guida troppo *veloce*.", translation: "He drives too fast." },
      { text: "È una corridora *veloce*.", translation: "She's a fast runner." },
      { text: "Il treno era molto *veloce*.", translation: "The train was very fast." }
    ],
    40: [
      { text: "*Lento* ma costante vince la gara.", translation: "Slow and steady wins the race." },
      { text: "Camminava *lento* nel parco.", translation: "He walked slowly through the park." },
      { text: "La musica suonava *lenta* e dolce.", translation: "The music played slow and soft." }
    ],
    41: [
      { text: "*Io* mi chiamo Marco.", translation: "My name is Marco." },
      { text: "*Io* amo leggere libri.", translation: "I like to read books." },
      { text: "*Io* amo la musica.", translation: "I love music." }
    ],
    42: [
      { text: "*Tu* sei un buon amico.", translation: "You are a good friend." },
      { text: "Dove abiti *tu*?", translation: "Where do you live?" },
      { text: "*Tu* vieni stasera?", translation: "Are you coming tonight?" }
    ],
    43: [
      { text: "*Lui* è insegnante a scuola.", translation: "He is a teacher at the school." },
      { text: "*Lui* gioca a calcio ogni settimana.", translation: "He plays football every week." },
      { text: "*Lui* viene dalla Germania.", translation: "He comes from Germany." }
    ],
    44: [
      { text: "*Lei* è una musicista di talento.", translation: "She is a talented musician." },
      { text: "*Lei* lavora come medico.", translation: "She works as a doctor." },
      { text: "*Lei* viene dalla Spagna.", translation: "She comes from Spain." }
    ],
    45: [
      { text: "*Noi* andiamo al cinema stasera.", translation: "We're going to the movies tonight." },
      { text: "*Noi* viviamo nella stessa città.", translation: "We live in the same city." },
      { text: "*Noi* viaggeremo in Italia.", translation: "We're going to travel to Italy." }
    ],
    46: [
      { text: "Dove andate *voi* stasera?", translation: "Where are you all going tonight?" },
      { text: "*Voi* siete i benvenuti alla festa.", translation: "You're all welcome to the party." },
      { text: "Venite insieme *voi*?", translation: "Are you all coming together?" }
    ],
    47: [
      { text: "*Loro* sono persone molto gentili.", translation: "They are very kind people." },
      { text: "*Loro* arrivano domani.", translation: "They're coming tomorrow." },
      { text: "Mi piacciono molto *loro*.", translation: "I like them very much." }
    ],
    48: [
      { text: "Questo è il *mio* libro.", translation: "This is my book." },
      { text: "Il *mio* amico si chiama Luca.", translation: "My friend's name is Luca." },
      { text: "La macchina è *mia*.", translation: "The car is mine." }
    ],
    49: [
      { text: "È questo il *tuo* telefono?", translation: "Is this your phone?" },
      { text: "La *tua* famiglia è simpatica.", translation: "Your family is nice." },
      { text: "Mi piace la *tua* nuova giacca.", translation: "I like your new jacket." }
    ],
    50: [
      { text: "Questa è la *nostra* casa.", translation: "This is our house." },
      { text: "La *nostra* scuola è vicina al centro.", translation: "Our school is near the center." },
      { text: "La *nostra* famiglia è grande.", translation: "Our family is big." }
    ],
    51: [
      { text: "Voglio *essere* felice.", translation: "I want to be happy." },
      { text: "È bello *essere* a casa.", translation: "It's nice to be home." },
      { text: "Vuole *essere* medico un giorno.", translation: "He wants to be a doctor someday." }
    ],
    52: [
      { text: "Vorrei *avere* una tazza di tè.", translation: "I want to have a cup of tea." },
      { text: "Non *abbiamo* molto tempo.", translation: "We don't have much time." },
      { text: "Desidera *avere* un cane.", translation: "She wishes to have a dog." }
    ],
    53: [
      { text: "*Vado* a scuola ogni giorno.", translation: "I go to school every day." },
      { text: "*Andiamo* a fare una passeggiata?", translation: "Shall we go for a walk?" },
      { text: "*Va* a casa velocemente.", translation: "She walks home quickly." }
    ],
    54: [
      { text: "*Vengo* presto.", translation: "I'll come soon." },
      { text: "Puoi *venire* qui?", translation: "Can you come here?" },
      { text: "*Viene* dalla Germania.", translation: "He comes from Germany." }
    ],
    55: [
      { text: "Cosa *fai* adesso?", translation: "What are you doing now?" },
      { text: "*Faccio* del mio meglio.", translation: "I'm doing my best." },
      { text: "Dobbiamo *fare* i compiti.", translation: "We have to do our homework." }
    ],
    56: [
      { text: "*Mangio* la colazione alle otto.", translation: "I eat breakfast at eight." },
      { text: "*Mangiamo* insieme stasera?", translation: "Shall we eat together tonight?" },
      { text: "Non *mangia* mai carne.", translation: "She never eats meat." }
    ],
    57: [
      { text: "*Bevo* acqua ogni giorno.", translation: "I drink water every day." },
      { text: "Cosa vuoi *bere*?", translation: "What would you like to drink?" },
      { text: "*Beve* il caffè senza zucchero.", translation: "He drinks coffee without sugar." }
    ],
    58: [
      { text: "Sto *leggendo* un libro avvincente.", translation: "I'm reading an exciting book." },
      { text: "Ti piace *leggere*?", translation: "Do you like to read?" },
      { text: "*Legge* il giornale ogni mattina.", translation: "She reads the newspaper every morning." }
    ],
    59: [
      { text: "Sto *scrivendo* una lettera a mia nonna.", translation: "I'm writing a letter to my grandmother." },
      { text: "Puoi *scrivere* il tuo nome qui?", translation: "Can you write your name here?" },
      { text: "*Scrive* libri di storia.", translation: "He writes books about history." }
    ],
    60: [
      { text: "*Parlo* un po' d'italiano.", translation: "I speak a little Italian." },
      { text: "Puoi *parlare* più lentamente?", translation: "Can you speak more slowly?" },
      { text: "*Parla* tre lingue.", translation: "She speaks three languages." }
    ],
    61: [
      { text: "Ho *un* gatto.", translation: "I have a cat." },
      { text: "Posso avere *un* caffè?", translation: "Can I have a coffee?" },
      { text: "C'è *un* uomo là fuori.", translation: "There's a man outside." }
    ],
    62: [
      { text: "Ha comprato *una* borsa.", translation: "She bought a bag." },
      { text: "Ho visto *una* gatta per strada.", translation: "I saw a cat on the street." },
      { text: "Nella fattoria vive *una* capra.", translation: "A goat lives on the farm." }
    ],
    63: [
      { text: "Ho *un* libro nuovo.", translation: "I have a new book." },
      { text: "Posso avere *un* bicchiere d'acqua?", translation: "Can I have a glass of water?" },
      { text: "Ha comprato *un* computer nuovo.", translation: "She bought a new computer." }
    ],
    64: [
      { text: "Il libro è interessante. *Esso* parla di storia.", translation: "The book is interesting. It talks about history." },
      { text: "Il quaderno è sul tavolo. *Esso* è blu.", translation: "The notebook is on the table. It is blue." },
      { text: "Guarda il gatto. *Esso* dorme.", translation: "Look at the cat. It's sleeping." }
    ],
    65: [
      { text: "Il computer è vecchio. *Esso* funziona ancora bene.", translation: "The computer is old. It still works well." },
      { text: "Ho un nuovo telefono. *Esso* è molto veloce.", translation: "I have a new phone. It is very fast." },
      { text: "Il treno è arrivato. *Esso* era in orario.", translation: "The train arrived. It was on time." }
    ],
    66: [
      { text: "Vivo *qui* adesso.", translation: "I live here now." },
      { text: "*Qui* ci sono le tue chiavi.", translation: "Here are your keys." },
      { text: "Aspetta *qui*, per favore.", translation: "Wait here, please." }
    ],
    67: [
      { text: "Il libro è *lì*.", translation: "The book is over there." },
      { text: "Chi è *lì*?", translation: "Who is there?" },
      { text: "Ci siamo incontrati *lì* l'anno scorso.", translation: "We met there last year." }
    ],
    68: [
      { text: "Devo andare *ora*.", translation: "I have to go now." },
      { text: "Cosa fai *ora*?", translation: "What are you doing now?" },
      { text: "*Ora* è ora di mangiare.", translation: "Now it's time to eat." }
    ],
    69: [
      { text: "Ci sentiamo *più tardi*.", translation: "We'll talk later." },
      { text: "Arrivo *più tardi* stasera.", translation: "I'll come later tonight." },
      { text: "Possiamo farlo *più tardi*?", translation: "Can we do it later?" }
    ],
    70: [
      { text: "È *sempre* allegra.", translation: "She's always happy." },
      { text: "Bevo *sempre* caffè al mattino.", translation: "I always drink coffee in the morning." },
      { text: "Arriva *sempre* in ritardo.", translation: "He always comes late." }
    ],
    71: [
      { text: "Cosa facciamo *oggi*?", translation: "What shall we do today?" },
      { text: "*Oggi* fa bel tempo.", translation: "Today the weather is nice." },
      { text: "Ho molto da fare *oggi*.", translation: "I have a lot to do today." }
    ],
    72: [
      { text: "Ci vediamo *domani*!", translation: "See you tomorrow!" },
      { text: "*Domani* parto per Roma.", translation: "Tomorrow I'll travel to Rome." },
      { text: "Cosa succede *domani*?", translation: "What's happening tomorrow?" }
    ],
    73: [
      { text: "*Ieri* ero al lavoro.", translation: "Yesterday I was at work." },
      { text: "Abbiamo visto un film *ieri*.", translation: "We watched a movie yesterday." },
      { text: "Ha piovuto molto *ieri*.", translation: "It rained a lot yesterday." }
    ],
    74: [
      { text: "Lavoro cinque giorni alla *settimana*.", translation: "I work five days a week." },
      { text: "La prossima *settimana* viaggiamo.", translation: "Next week we're going to travel." },
      { text: "La *settimana* è stata frenetica.", translation: "The week has been busy." }
    ],
    75: [
      { text: "Ci trasferiamo il prossimo *mese*.", translation: "We're moving next month." },
      { text: "Ogni *mese* pago l'affitto.", translation: "Every month I pay rent." },
      { text: "Il *mese* è passato in fretta.", translation: "The month went by quickly." }
    ],
    76: [
      { text: "Guidava una macchina *rossa*.", translation: "He drove a red car." },
      { text: "Il fiore è *rosso* e bello.", translation: "The flower is red and beautiful." },
      { text: "Mi piace il maglione *rosso*.", translation: "I like the red sweater." }
    ],
    77: [
      { text: "Il cielo è *blu* oggi.", translation: "The sky is blue today." },
      { text: "Ha gli occhi *blu*.", translation: "She has blue eyes." },
      { text: "Ho comprato una giacca *blu*.", translation: "I bought a blue jacket." }
    ],
    78: [
      { text: "L'erba è *verde* d'estate.", translation: "The grass is green in summer." },
      { text: "Ha una macchina *verde*.", translation: "He has a green car." },
      { text: "Mi piace la camicia *verde*.", translation: "I like the green shirt." }
    ],
    79: [
      { text: "Il sole è *giallo*.", translation: "The sun is yellow." },
      { text: "Ha un vestito *giallo*.", translation: "She has a yellow dress." },
      { text: "La casa *gialla* è nostra.", translation: "The yellow house is ours." }
    ],
    80: [
      { text: "Il gatto è completamente *nero*.", translation: "The cat is completely black." },
      { text: "Ha una macchina *nera*.", translation: "He has a black car." },
      { text: "Ho comprato scarpe *nere*.", translation: "I bought black shoes." }
    ],
    81: [
      { text: "La neve è *bianca* e fredda.", translation: "The snow is white and cold." },
      { text: "Ha una casa *bianca*.", translation: "She has a white house." },
      { text: "Indossa una camicia *bianca*.", translation: "He wears a white shirt." }
    ],
    82: [
      { text: "Il mio cane è *marrone*.", translation: "My dog is brown." },
      { text: "Ha gli occhi *marroni*.", translation: "She has brown eyes." },
      { text: "Ho comprato un tavolo *marrone*.", translation: "I bought a brown table." }
    ],
    83: [
      { text: "La bambina ha un vestito *rosa*.", translation: "The girl has a pink dress." },
      { text: "I fiori sono *rosa*.", translation: "The flowers are pink." },
      { text: "Ha dipinto la stanza di *rosa*.", translation: "She painted the room pink." }
    ],
    84: [
      { text: "Il tramonto era *arancione*.", translation: "The sunset was orange." },
      { text: "Ha una giacca *arancione*.", translation: "He has an orange jacket." },
      { text: "L'arancia è *arancione*.", translation: "The orange is orange." }
    ],
    85: [
      { text: "Il fiore è *viola*.", translation: "The flower is purple." },
      { text: "Ha una borsa *viola*.", translation: "She has a purple bag." },
      { text: "Il cielo è diventato *viola* la sera.", translation: "The sky turned purple in the evening." }
    ],
    86: [
      { text: "Ho solo *un* fratello.", translation: "I only have one brother." },
      { text: "Posso avere *uno*?", translation: "Can I have one?" },
      { text: "È venuto solo *uno* dei bambini.", translation: "Only one of the children came." }
    ],
    87: [
      { text: "Ho *due* fratelli.", translation: "I have two siblings." },
      { text: "Sono le *due*.", translation: "It's two o'clock." },
      { text: "La casa ha *due* piani.", translation: "The house has two floors." }
    ],
    88: [
      { text: "Ho *tre* figli.", translation: "I have three children." },
      { text: "Sono le *tre*.", translation: "It's three o'clock." },
      { text: "Abbiamo aspettato *tre* ore.", translation: "We waited for three hours." }
    ],
    89: [
      { text: "Il tavolo ha *quattro* sedie.", translation: "The table has four chairs." },
      { text: "Sono le *quattro*.", translation: "It's four o'clock." },
      { text: "Siamo in *quattro* in famiglia.", translation: "There are four of us in the family." }
    ],
    90: [
      { text: "Ho *cinque* amici qui.", translation: "I have five friends here." },
      { text: "Sono le *cinque*.", translation: "It's five o'clock." },
      { text: "La casa ha *cinque* stanze.", translation: "The house has five rooms." }
    ],
    91: [
      { text: "Sono le *sei*.", translation: "It's six o'clock." },
      { text: "Siamo in *sei* persone.", translation: "We are six people." },
      { text: "Dorme *sei* ore ogni notte.", translation: "He sleeps six hours every night." }
    ],
    92: [
      { text: "Sono le *sette*.", translation: "It's seven o'clock." },
      { text: "Ha *sette* libri sul tavolo.", translation: "She has seven books on the table." },
      { text: "Ha mangiato *sette* fragole.", translation: "He ate seven strawberries." }
    ],
    93: [
      { text: "Sono le *otto*.", translation: "It's eight o'clock." },
      { text: "Lavoro *otto* ore al giorno.", translation: "I work eight hours a day." },
      { text: "Eravamo in *otto* alla festa.", translation: "There were eight of us at the party." }
    ],
    94: [
      { text: "Sono le *nove*.", translation: "It's nine o'clock." },
      { text: "Ha *nove* anni.", translation: "She's nine years old." },
      { text: "Abbiamo aspettato *nove* minuti.", translation: "We waited nine minutes." }
    ],
    95: [
      { text: "Sono le *dieci*.", translation: "It's ten o'clock." },
      { text: "Ha *dieci* dita.", translation: "He has ten fingers." },
      { text: "Abbiamo vissuto lì per *dieci* anni.", translation: "We lived there for ten years." }
    ],
    96: [
      { text: "*Dove* abiti?", translation: "Where do you live?" },
      { text: "Sai *dove* è il libro?", translation: "Do you know where the book is?" },
      { text: "*Dove* ci vediamo?", translation: "Where shall we meet?" }
    ],
    97: [
      { text: "*Cosa* c'è?", translation: "What is that?" },
      { text: "*Cosa* stai facendo?", translation: "What are you doing now?" },
      { text: "Non so *cosa* dire.", translation: "I don't know what to say." }
    ],
    98: [
      { text: "*Chi* è?", translation: "Who is that?" },
      { text: "*Chi* viene stasera?", translation: "Who's coming tonight?" },
      { text: "Sai *chi* è lei?", translation: "Do you know who she is?" }
    ],
    99: [
      { text: "*Quando* arrivi?", translation: "When are you coming?" },
      { text: "Non so *quando* parte il treno.", translation: "I don't know when the train leaves." },
      { text: "*Quando* è il tuo compleanno?", translation: "When is your birthday?" }
    ],
    100: [
      { text: "*Perché* sei in ritardo?", translation: "Why are you late?" },
      { text: "*Perché* non ti piace il pesce?", translation: "Why don't you like fish?" },
      { text: "Non so *perché* se n'è andato.", translation: "I don't know why he left." }
    ],
    101: [
      { text: "*Come* stai?", translation: "How are you?" },
      { text: "*Come* si prepara questo piatto?", translation: "How do you make this dish?" },
      { text: "Non so *come* rispondere.", translation: "I don't know how to answer." }
    ],
    102: [
      { text: "*Quale* libro stai leggendo?", translation: "Which book are you reading?" },
      { text: "*Quale* giorno va meglio?", translation: "Which day suits best?" },
      { text: "Sai *quale* strada prendere?", translation: "Do you know which way we should go?" }
    ],
    103: [
      { text: "*Quanto* costa questo?", translation: "How much does this cost?" },
      { text: "*Quanto* tempo abbiamo?", translation: "How much time do we have?" },
      { text: "Non so *quanto* pesa.", translation: "I don't know how much it weighs." }
    ],
    104: [
      { text: "Sono felice *perché* è venerdì.", translation: "I'm happy because it's Friday." },
      { text: "È arrivata tardi *perché* il treno era in ritardo.", translation: "She came late because the train was delayed." },
      { text: "Siamo rimasti a casa *perché* pioveva.", translation: "We stayed home because it rained." }
    ],
    105: [
      { text: "Voglio andare, *ma* sono stanco.", translation: "I want to go, but I'm tired." },
      { text: "È costoso, *ma* ne vale la pena.", translation: "It's expensive, but worth it." },
      { text: "Ha chiamato, *ma* non ho risposto.", translation: "She called, but I didn't answer." }
    ],
    106: [
      { text: "Mi piace il tè *e* il caffè.", translation: "I like tea and coffee." },
      { text: "È gentile *e* intelligente.", translation: "He's nice and smart." },
      { text: "Abbiamo comprato pane, latte *e* uova.", translation: "We bought bread, milk and eggs." }
    ],
    107: [
      { text: "Vuoi tè *o* caffè?", translation: "Would you like tea or coffee?" },
      { text: "Andiamo a piedi *o* in macchina?", translation: "Shall we walk or drive?" },
      { text: "Vieni oggi *o* domani?", translation: "Are you coming today or tomorrow?" }
    ],
    108: [
      { text: "Bevo il caffè *con* il latte.", translation: "I drink coffee with milk." },
      { text: "Vive *con* la sua famiglia.", translation: "She lives with her family." },
      { text: "Ha parlato *con* l'insegnante.", translation: "He spoke with the teacher." }
    ],
    109: [
      { text: "Bevo il tè *senza* zucchero.", translation: "I drink tea without sugar." },
      { text: "Se n'è andato *senza* dire nulla.", translation: "He left without saying anything." },
      { text: "Ce l'abbiamo fatta *senza* aiuto.", translation: "We managed it without help." }
    ],
    110: [
      { text: "La lettera è *da* mia sorella.", translation: "The letter is from my sister." },
      { text: "Abbiamo viaggiato *da* Roma a Milano.", translation: "We travelled from Rome to Milan." },
      { text: "Il regalo è *da* parte del mio amico.", translation: "The gift is from my friend." }
    ],
    111: [
      { text: "Vado *a* scuola.", translation: "I'm going to school." },
      { text: "Ha dato un regalo *a* me.", translation: "She gave a gift to me." },
      { text: "Abbiamo viaggiato *a* Barcellona quest'estate.", translation: "We travelled to Barcelona this summer." }
    ],
    112: [
      { text: "Il libro è *nel* cassetto.", translation: "The book is in the drawer." },
      { text: "Vivo *in* Italia.", translation: "I live in Italy." },
      { text: "È *in* giardino.", translation: "He is in the garden." }
    ],
    113: [
      { text: "Il libro è *sul* tavolo.", translation: "The book is on the table." },
      { text: "Il gatto è seduto *sulla* sedia.", translation: "The cat is sitting on the chair." },
      { text: "Il quadro è appeso *sul* muro.", translation: "The picture hangs on the wall." }
    ],
    114: [
      { text: "Il gatto dorme *sotto* il tavolo.", translation: "The cat is sleeping under the table." },
      { text: "Le chiavi sono *sotto* il tappeto.", translation: "The keys are under the mat." },
      { text: "Ci siamo seduti *sotto* un albero.", translation: "We sat under a tree." }
    ],
    115: [
      { text: "La lampada è appesa *sopra* il tavolo.", translation: "The lamp hangs above the table." },
      { text: "L'aereo volava *sopra* la montagna.", translation: "The plane flew over the mountain." },
      { text: "Vive *sopra* il negozio.", translation: "She lives above the shop." }
    ],
    116: [
      { text: "Roma è una bella *città*.", translation: "Rome is a nice city." },
      { text: "Viviamo in una piccola *città*.", translation: "We live in a small city." },
      { text: "La *città* ha molti edifici antichi.", translation: "The city has many old buildings." }
    ],
    117: [
      { text: "Viviamo nella stessa *strada*.", translation: "We live on the same street." },
      { text: "La *strada* era piena di gente.", translation: "The street was full of people." },
      { text: "Il negozio si trova in questa *strada*.", translation: "The shop is on this street." }
    ],
    118: [
      { text: "Vado al *negozio* a comprare il latte.", translation: "I'm going to the shop for milk." },
      { text: "Il *negozio* apre alle nove.", translation: "The shop opens at nine." },
      { text: "C'è un nuovo *negozio* in centro.", translation: "There's a new shop in the center." }
    ],
    119: [
      { text: "Compriamo le verdure al *mercato*.", translation: "We buy vegetables at the market." },
      { text: "Il *mercato* è aperto il sabato.", translation: "The market is open on Saturdays." },
      { text: "C'era molta gente al *mercato*.", translation: "There were a lot of people at the market." }
    ],
    120: [
      { text: "Facciamo una passeggiata al *parco*.", translation: "We're taking a walk in the park." },
      { text: "I bambini giocano al *parco*.", translation: "The children are playing in the park." },
      { text: "C'è un grande *parco* vicino a casa.", translation: "There's a big park near the house." }
    ],
    121: [
      { text: "Questa *stanza* è molto luminosa.", translation: "This room is very bright." },
      { text: "La casa ha cinque *stanze*.", translation: "The house has five rooms." },
      { text: "Sto riordinando la mia *stanza*.", translation: "I'm cleaning my room." }
    ],
    122: [
      { text: "Cuciniamo in *cucina*.", translation: "We cook in the kitchen." },
      { text: "La *cucina* è grande e luminosa.", translation: "The kitchen is big and bright." },
      { text: "Sta seduta in *cucina* a bere il caffè.", translation: "She's sitting in the kitchen drinking coffee." }
    ],
    123: [
      { text: "Il *bagno* è accanto alla camera da letto.", translation: "The bathroom is next to the bedroom." },
      { text: "Faccio la doccia in *bagno* ogni mattina.", translation: "I shower in the bathroom every morning." },
      { text: "La casa ha due *bagni*.", translation: "The house has two bathrooms." }
    ],
    124: [
      { text: "La mia *camera* è piccola ma accogliente.", translation: "My bedroom is small but cozy." },
      { text: "I bambini dormono nella stessa *camera*.", translation: "The children sleep in the same bedroom." },
      { text: "Abbiamo dipinto la *camera* di blu.", translation: "We painted the bedroom blue." }
    ],
    125: [
      { text: "Guardiamo la TV in *soggiorno*.", translation: "We watch TV in the living room." },
      { text: "Il *soggiorno* ha un grande divano.", translation: "The living room has a big sofa." },
      { text: "La famiglia si riunisce in *soggiorno* la sera.", translation: "The family gathers in the living room in the evening." }
    ],
    126: [
      { text: "Mi piace il *formaggio* sul pane.", translation: "I like cheese on bread." },
      { text: "Abbiamo comprato *formaggio* italiano al mercato.", translation: "We bought Italian cheese at the market." },
      { text: "Il *formaggio* ha un ottimo sapore.", translation: "The cheese tastes very good." }
    ],
    127: [
      { text: "Mangio le *uova* a colazione.", translation: "I eat eggs for breakfast." },
      { text: "Puoi comprare le *uova* al negozio?", translation: "Can you buy eggs at the shop?" },
      { text: "L'*uovo* era cotto alla perfezione.", translation: "The egg was cooked just right." }
    ],
    128: [
      { text: "Mangiamo *pesce* ogni venerdì.", translation: "We eat fish every Friday." },
      { text: "Il *pesce* era molto fresco.", translation: "The fish was very fresh." },
      { text: "Ha pescato un grosso *pesce* in mare.", translation: "He caught a big fish in the sea." }
    ],
    129: [
      { text: "Lei non mangia *carne*.", translation: "She doesn't eat meat." },
      { text: "Abbiamo grigliato la *carne* in giardino.", translation: "We grilled meat in the garden." },
      { text: "La *carne* era tenera e buona.", translation: "The meat was tender and good." }
    ],
    130: [
      { text: "Mangiamo la *zuppa* quando fa freddo.", translation: "We eat soup when it's cold." },
      { text: "La *zuppa* era calda e buona.", translation: "The soup was warm and good." },
      { text: "Mamma ha preparato la *zuppa* per cena.", translation: "Mom made soup for dinner." }
    ],
    131: [
      { text: "Mangio una *mela* ogni giorno.", translation: "I eat an apple every day." },
      { text: "La *mela* era rossa e dolce.", translation: "The apple was red and sweet." },
      { text: "Abbiamo raccolto le *mele* in giardino.", translation: "We picked apples in the garden." }
    ],
    132: [
      { text: "Prendo una *banana* a pranzo.", translation: "I'll have a banana for lunch." },
      { text: "La *banana* era matura e dolce.", translation: "The banana was ripe and sweet." },
      { text: "Ai bambini piacciono molto le *banane*.", translation: "The children like bananas a lot." }
    ],
    133: [
      { text: "Bevo succo d'*arancia*.", translation: "I drink orange juice." },
      { text: "L'*arancia* era succosa e dolce.", translation: "The orange was juicy and sweet." },
      { text: "Abbiamo comprato un sacchetto di *arance*.", translation: "We bought a bag of oranges." }
    ],
    134: [
      { text: "Mangiamo le *patate* a cena.", translation: "We eat potatoes for dinner." },
      { text: "La *patata* era cotta e morbida.", translation: "The potato was boiled and soft." },
      { text: "Coltiva le *patate* in giardino.", translation: "He grows potatoes in the garden." }
    ],
    135: [
      { text: "Il coniglio mangia una *carota*.", translation: "The rabbit is eating a carrot." },
      { text: "La *carota* era dolce e croccante.", translation: "The carrot was sweet and crisp." },
      { text: "Tagliamo le *carote* per la zuppa.", translation: "We cut carrots for the soup." }
    ],
    136: [
      { text: "Bevo il *tè* al mattino.", translation: "I drink tea in the morning." },
      { text: "Posso avere una tazza di *tè*?", translation: "Can I have a cup of tea?" },
      { text: "Il *tè* era troppo caldo da bere.", translation: "The tea was too hot to drink." }
    ],
    137: [
      { text: "Il bambino beve il *latte* a colazione.", translation: "The child drinks milk for breakfast." },
      { text: "Puoi comprare il *latte* al negozio?", translation: "Can you buy milk at the shop?" },
      { text: "Il *latte* era freddo e fresco.", translation: "The milk was cold and fresh." }
    ],
    138: [
      { text: "Bevo il *succo* ogni mattina.", translation: "I drink juice every morning." },
      { text: "Il *succo* ha un sapore dolce e fresco.", translation: "The juice tastes sweet and fresh." },
      { text: "Abbiamo fatto il *succo* con le mele.", translation: "We made juice from apples." }
    ],
    139: [
      { text: "Faccio *colazione* alle sette.", translation: "I eat breakfast at seven." },
      { text: "La *colazione* era buona stamattina.", translation: "Breakfast was delicious this morning." },
      { text: "Facciamo *colazione* insieme ogni giorno.", translation: "We eat breakfast together every day." }
    ],
    140: [
      { text: "Facciamo *pranzo* alle dodici.", translation: "We eat lunch at twelve." },
      { text: "Il *pranzo* era veloce ma buono.", translation: "Lunch was quick but good." },
      { text: "Porta il *pranzo* al lavoro.", translation: "He brings lunch to work." }
    ],
    141: [
      { text: "Facciamo *cena* alle sei.", translation: "We eat dinner at six." },
      { text: "La *cena* era molto buona stasera.", translation: "Dinner was very good tonight." },
      { text: "La famiglia si riunisce per la *cena* ogni domenica.", translation: "The family gathers for dinner every Sunday." }
    ],
    142: [
      { text: "Puoi passarmi il *sale*?", translation: "Can you pass me the salt?" },
      { text: "La zuppa ha bisogno di più *sale*.", translation: "The soup needs a bit more salt." },
      { text: "Usa troppo *sale* nel cibo.", translation: "He uses too much salt in the food." }
    ],
    143: [
      { text: "Bevo il caffè senza *zucchero*.", translation: "I drink coffee without sugar." },
      { text: "Puoi passarmi lo *zucchero*?", translation: "Can you pass me the sugar?" },
      { text: "La torta ha bisogno di molto *zucchero*.", translation: "The cake needs a lot of sugar." }
    ],
    144: [
      { text: "Il cibo è sul *piatto*.", translation: "The food is on the plate." },
      { text: "Puoi lavare il *piatto*?", translation: "Can you wash the plate?" },
      { text: "Apparecchiamo la tavola con i *piatti*.", translation: "We're setting the table with plates." }
    ],
    145: [
      { text: "Posso avere un *bicchiere* d'acqua?", translation: "Can I have a glass of water?" },
      { text: "Il *bicchiere* è caduto e si è rotto.", translation: "The glass fell and broke." },
      { text: "Ha riempito il *bicchiere* di succo.", translation: "She filled the glass with juice." }
    ],
    146: [
      { text: "Mi fa male la *testa*.", translation: "My head hurts." },
      { text: "Ha scosso la *testa*.", translation: "He shook his head." },
      { text: "Ho dolore alla *testa*.", translation: "I have pain in my head." }
    ],
    147: [
      { text: "Mi teneva per *mano*.", translation: "She held my hand." },
      { text: "Lavati le *mani* prima di mangiare.", translation: "Wash your hands before you eat." },
      { text: "Ha salutato con la *mano*.", translation: "He waved with his hand." }
    ],
    148: [
      { text: "Mi sono storto il *piede*.", translation: "I twisted my foot." },
      { text: "Il bambino ha i *piedi* piccoli.", translation: "The child has small feet." },
      { text: "Ha calciato la palla con il *piede*.", translation: "He kicked the ball with his foot." }
    ],
    149: [
      { text: "Ha gli *occhi* blu.", translation: "She has blue eyes." },
      { text: "Mi è entrato qualcosa nell'*occhio*.", translation: "I got something in my eye." },
      { text: "Il bambino ha chiuso gli *occhi* e si è addormentato.", translation: "The child closed its eyes and fell asleep." }
    ],
    150: [
      { text: "Mi ha sussurrato qualcosa nell'*orecchio*.", translation: "He whispered something in my ear." },
      { text: "La musica era forte, così mi sono coperto le *orecchie*.", translation: "The music was loud, so I covered my ears." },
      { text: "Il cane ha le *orecchie* grandi.", translation: "The dog has big ears." }
    ],
    151: [
      { text: "Il bambino ha un *naso* piccolo.", translation: "The child has a small nose." },
      { text: "Respiro dal *naso*.", translation: "I breathe through my nose." },
      { text: "Ha il *naso* chiuso.", translation: "He has a stuffy nose." }
    ],
    152: [
      { text: "Chiudi la *bocca*, per favore.", translation: "Close your mouth, please." },
      { text: "Ha sorriso con tutta la *bocca*.", translation: "She smiled with her whole mouth." },
      { text: "Non parlare con la *bocca* piena.", translation: "Don't talk with food in your mouth." }
    ],
    153: [
      { text: "Ha i *capelli* lunghi e scuri.", translation: "She has long, dark hair." },
      { text: "Si taglia i *capelli* da solo.", translation: "He cuts his own hair." },
      { text: "I miei *capelli* si bagnano sotto la pioggia.", translation: "My hair gets wet in the rain." }
    ],
    154: [
      { text: "Mettiti la *giacca*, fa freddo fuori.", translation: "Put on your jacket, it's cold outside." },
      { text: "Ho comprato una *giacca* nuova ieri.", translation: "I bought a new jacket yesterday." },
      { text: "La sua *giacca* è blu e calda.", translation: "Her jacket is blue and warm." }
    ],
    155: [
      { text: "Togliti le *scarpe* prima di entrare.", translation: "Take off your shoes before you go in." },
      { text: "Queste *scarpe* sono molto comode.", translation: "These shoes are very comfortable." },
      { text: "Ho bisogno di *scarpe* nuove per l'inverno.", translation: "I need new shoes for winter." }
    ],
    156: [
      { text: "Ho comprato dei *pantaloni* nuovi ieri.", translation: "I bought new pants yesterday." },
      { text: "I miei *pantaloni* sono troppo lunghi.", translation: "My pants are too long." },
      { text: "Indossa sempre *pantaloni* neri.", translation: "He always wears black pants." }
    ],
    157: [
      { text: "Indossa una *camicia* bianca.", translation: "He's wearing a white shirt." },
      { text: "La mia *camicia* deve essere stirata.", translation: "My shirt needs ironing." },
      { text: "Gli abbiamo comprato una nuova *camicia* per il compleanno.", translation: "We bought him a new shirt for his birthday." }
    ],
    158: [
      { text: "Indossa un bel *vestito*.", translation: "She's wearing a nice dress." },
      { text: "Il *vestito* era rosso e lungo.", translation: "The dress was red and long." },
      { text: "Compro un *vestito* nuovo per la festa.", translation: "I'm going to buy a new dress for the party." }
    ],
    159: [
      { text: "Mettiti il *cappello*, fa freddo.", translation: "Put on your hat, it's cold." },
      { text: "Il suo *cappello* è blu e caldo.", translation: "His hat is blue and warm." },
      { text: "Ho perso il *cappello* nel vento.", translation: "I lost my hat in the wind." }
    ],
    160: [
      { text: "Indosso un *maglione* caldo.", translation: "I'm wearing a warm sweater." },
      { text: "Il mio *maglione* è di lana.", translation: "My sweater is made of wool." },
      { text: "Mi ha fatto un *maglione* a maglia.", translation: "She knitted a sweater for me." }
    ],
    161: [
      { text: "Aspetta solo un *secondo*.", translation: "Just wait a second." },
      { text: "Ci sono voluti solo pochi *secondi*.", translation: "It only took a few seconds." },
      { text: "Ogni *secondo* conta.", translation: "Every second counts." }
    ],
    162: [
      { text: "La riunione è durata un'*ora*.", translation: "The meeting lasted an hour." },
      { text: "Aspetto ancora un'*ora*.", translation: "I'll wait one more hour." },
      { text: "Il viaggio dura tre *ore*.", translation: "The trip takes three hours." }
    ],
    163: [
      { text: "Aspetta un *minuto*, per favore.", translation: "Wait a minute, please." },
      { text: "Il treno arriva tra cinque *minuti*.", translation: "The train arrives in five minutes." },
      { text: "Ci vogliono solo pochi *minuti*.", translation: "It only takes a few minutes." }
    ],
    164: [
      { text: "Ho vent'*anni*.", translation: "I am twenty years old." },
      { text: "Ci siamo trasferiti qui due *anni* fa.", translation: "We moved here two years ago." },
      { text: "L'*anno* prossimo viaggeremo in Grecia.", translation: "Next year we're going to travel to Greece." }
    ],
    165: [
      { text: "Cosa fai nel *fine settimana*?", translation: "What are you doing this weekend?" },
      { text: "Andiamo al rifugio ogni *fine settimana*.", translation: "We go to the cabin every weekend." },
      { text: "Il *fine settimana* è stato breve ma bello.", translation: "The weekend was short but nice." }
    ],
    166: [
      { text: "*Lunedì* inizio un nuovo lavoro.", translation: "On Monday I start a new job." },
      { text: "Ci vediamo ogni *lunedì*.", translation: "We meet every Monday." },
      { text: "Il *lunedì* è stato frenetico e lungo.", translation: "Monday was busy and long." }
    ],
    167: [
      { text: "*Martedì* ho allenamento.", translation: "On Tuesday I have training." },
      { text: "Andiamo in città *martedì*.", translation: "We're going to town on Tuesday." },
      { text: "I *martedì* sono sempre tranquilli.", translation: "Tuesdays are always calm." }
    ],
    168: [
      { text: "La riunione è *mercoledì* alle dieci.", translation: "The meeting is Wednesday at ten." },
      { text: "Non lavora il *mercoledì*.", translation: "She doesn't work on Wednesdays." },
      { text: "Ci vediamo di nuovo *mercoledì*.", translation: "We'll see each other again on Wednesday." }
    ],
    169: [
      { text: "*Giovedì* ceniamo insieme.", translation: "On Thursday we're having dinner together." },
      { text: "Torna a casa *giovedì*.", translation: "He travels home on Thursday." },
      { text: "I *giovedì* sono il mio giorno preferito.", translation: "Thursdays are my favorite day." }
    ],
    170: [
      { text: "Finalmente è *venerdì*!", translation: "Finally it's Friday!" },
      { text: "Festeggiamo sempre il *venerdì*.", translation: "We always celebrate on Fridays." },
      { text: "*Venerdì* sera usciamo.", translation: "Friday evening we go out." }
    ],
    171: [
      { text: "Facciamo la spesa il *sabato*.", translation: "We shop on Saturdays." },
      { text: "*Sabato* andiamo in spiaggia.", translation: "On Saturday we're going to the beach." },
      { text: "La festa è *sabato*.", translation: "The party is on Saturday." }
    ],
    172: [
      { text: "Mangiamo un pranzo abbondante la *domenica*.", translation: "We eat a big lunch on Sundays." },
      { text: "La *domenica* è una giornata tranquilla.", translation: "Sunday is a calm day." },
      { text: "La famiglia si riunisce ogni *domenica*.", translation: "The family gathers every Sunday." }
    ],
    173: [
      { text: "I fiori sbocciano in *primavera*.", translation: "The flowers bloom in spring." },
      { text: "La *primavera* è la mia stagione preferita.", translation: "Spring is my favorite season." },
      { text: "Piantiamo le verdure in *primavera*.", translation: "We plant vegetables in spring." }
    ],
    174: [
      { text: "Viaggiamo in Italia ogni *estate*.", translation: "We travel to Italy every summer." },
      { text: "L'*estate* è stata calda e soleggiata.", translation: "The summer was warm and sunny." },
      { text: "In *estate* nuotiamo ogni giorno.", translation: "In summer we swim every day." }
    ],
    175: [
      { text: "Le foglie cadono in *autunno*.", translation: "The leaves fall in autumn." },
      { text: "L'*autunno* qui è freddo e umido.", translation: "Autumn is cold and wet here." },
      { text: "La scuola inizia in *autunno*.", translation: "School starts in autumn." }
    ],
    176: [
      { text: "Nevica molto in *inverno*.", translation: "It snows a lot in winter." },
      { text: "L'*inverno* è lungo e freddo qui.", translation: "Winter is long and cold here." },
      { text: "Andiamo a sciare in *inverno*.", translation: "We go skiing in winter." }
    ],
    177: [
      { text: "Il *sole* splende oggi.", translation: "The sun is shining today." },
      { text: "Ci siamo abbronzati al *sole* tutto il giorno.", translation: "We sunbathed in the sun all day." },
      { text: "Il *sole* tramonta alle otto.", translation: "The sun sets at eight." }
    ],
    178: [
      { text: "Oggi c'è molta *pioggia*.", translation: "There's a lot of rain today." },
      { text: "Ci siamo bagnati per la *pioggia*.", translation: "We got wet from the rain." },
      { text: "La *pioggia* è finita dopo un'ora.", translation: "The rain stopped after an hour." }
    ],
    179: [
      { text: "C'è molta *neve* per terra.", translation: "There's a lot of snow on the ground." },
      { text: "I bambini giocano nella *neve*.", translation: "The children are playing in the snow." },
      { text: "La *neve* si è sciolta velocemente al sole.", translation: "The snow melted quickly in the sun." }
    ],
    180: [
      { text: "Oggi soffia molto *vento*.", translation: "There's a lot of wind today." },
      { text: "Il *vento* ha strappato il tetto.", translation: "The wind ripped off the roof." },
      { text: "Abbiamo sentito un *vento* freddo dal mare.", translation: "We felt a cold wind from the sea." }
    ],
    181: [
      { text: "Oggi fa *bel* tempo.", translation: "The weather is nice today." },
      { text: "Sei *bella* con quel vestito.", translation: "You look nice in that dress." },
      { text: "È stato *bello* rivederti.", translation: "It was nice to see you again." }
    ],
    182: [
      { text: "Oggi è *nuvoloso*.", translation: "It's cloudy today." },
      { text: "Il cielo è diventato *nuvoloso* nel pomeriggio.", translation: "The sky became cloudy in the afternoon." },
      { text: "Abbiamo avuto tempo *nuvoloso* tutta la settimana.", translation: "We had cloudy weather all week." }
    ],
    183: [
      { text: "Il cielo è *sereno* stasera.", translation: "The sky is clear tonight." },
      { text: "Domani ci sarà tempo *sereno*.", translation: "There will be clear weather tomorrow." },
      { text: "Il mare era *sereno* oggi.", translation: "The sea was calm today." }
    ],
    184: [
      { text: "Il tempo è stato *secco* tutta l'estate.", translation: "The weather has been dry all summer." },
      { text: "Il terreno è *secco* dopo tanti giorni senza pioggia.", translation: "The ground is dry after many days without rain." },
      { text: "I vestiti sono *secchi* ora.", translation: "The clothes are dry now." }
    ],
    185: [
      { text: "L'erba è *bagnata* al mattino.", translation: "The grass is wet in the morning." },
      { text: "Le mie scarpe si sono *bagnate* per la pioggia.", translation: "My shoes got wet in the rain." },
      { text: "I suoi capelli erano *bagnati* dopo la doccia.", translation: "Her hair was wet after the shower." }
    ],
    186: [
      { text: "Prendo il *treno* per andare al lavoro ogni giorno.", translation: "I take the train to work every day." },
      { text: "Il *treno* aveva ritardo oggi.", translation: "The train was delayed today." },
      { text: "Abbiamo viaggiato in *treno* fino ad Amburgo.", translation: "We travelled by train to Hamburg." }
    ],
    187: [
      { text: "L'*autobus* arriva tra dieci minuti.", translation: "The bus arrives in ten minutes." },
      { text: "Prendo l'*autobus* per andare a scuola.", translation: "I take the bus to school." },
      { text: "Abbiamo aspettato a lungo l'*autobus*.", translation: "We waited a long time for the bus." }
    ],
    188: [
      { text: "L'*aereo* decolla alle dieci.", translation: "The plane takes off at ten." },
      { text: "Abbiamo viaggiato in *aereo* fino in Spagna.", translation: "We travelled by plane to Spain." },
      { text: "L'*aereo* è atterrato in sicurezza.", translation: "The plane landed safely." }
    ],
    189: [
      { text: "Ho una *bicicletta* nuova.", translation: "I have a new bicycle." },
      { text: "La mia *bicicletta* è rotta.", translation: "My bicycle is broken." },
      { text: "Va a scuola in *bicicletta*.", translation: "He rides his bicycle to school." }
    ],
    190: [
      { text: "Abbiamo preso una *barca* per attraversare il lago.", translation: "We took a boat across the lake." },
      { text: "La *barca* era piccola ma veloce.", translation: "The boat was small but fast." },
      { text: "Pesca dalla sua *barca*.", translation: "He fishes from his boat." }
    ],
    191: [
      { text: "Il treno si ferma a questa *stazione*.", translation: "The train stops at this station." },
      { text: "Ci siamo incontrati alla *stazione*.", translation: "We met at the station." },
      { text: "La *stazione* si trova nel centro della città.", translation: "The station is in the middle of the city." }
    ],
    192: [
      { text: "Siamo andati presto all'*aeroporto*.", translation: "We drove to the airport early." },
      { text: "L'*aeroporto* era pieno di gente.", translation: "The airport was full of people." },
      { text: "Lavora all'*aeroporto*.", translation: "He works at the airport." }
    ],
    193: [
      { text: "Ho comprato un *biglietto* per il concerto.", translation: "I bought a ticket to the concert." },
      { text: "Posso vedere il tuo *biglietto*?", translation: "Can I see your ticket?" },
      { text: "Abbiamo bisogno di due *biglietti* per il treno.", translation: "We need two tickets for the train." }
    ],
    194: [
      { text: "Puoi mostrarmelo sulla *mappa*?", translation: "Can you show me on the map?" },
      { text: "Abbiamo usato una *mappa* per trovare la strada.", translation: "We used a map to find the way." },
      { text: "La *mappa* mostra tutta la città.", translation: "The map shows the whole city." }
    ],
    195: [
      { text: "Alloggiamo in un bell'*hotel*.", translation: "We're staying at a nice hotel." },
      { text: "L'*hotel* si trova vicino alla spiaggia.", translation: "The hotel is near the beach." },
      { text: "La stanza in *hotel* era grande.", translation: "The room at the hotel was big." }
    ],
    196: [
      { text: "Gira a *sinistra* al semaforo.", translation: "Turn left at the traffic light." },
      { text: "Il libro è sul lato *sinistro* del tavolo.", translation: "The book is on the left side of the table." },
      { text: "Scrive con la mano *sinistra*.", translation: "He writes with his left hand." }
    ],
    197: [
      { text: "Gira a *destra* dopo il ponte.", translation: "Turn right after the bridge." },
      { text: "Il negozio si trova sul lato *destro* della strada.", translation: "The shop is on the right side of the street." },
      { text: "Tiene la penna nella mano *destra*.", translation: "She holds the pen in her right hand." }
    ],
    198: [
      { text: "Vai *dritto* finché non vedi la scuola.", translation: "Go straight ahead until you see the school." },
      { text: "Guida *dritto* per due chilometri.", translation: "Drive straight ahead for two kilometers." },
      { text: "La stazione è *dritto*, non lontano da qui.", translation: "The station is straight ahead, not far from here." }
    ],
    199: [
      { text: "Viviamo *vicino* alla scuola.", translation: "We live near the school." },
      { text: "Il negozio è *vicino* a casa nostra.", translation: "The shop is near our house." },
      { text: "Vive *vicino* a me.", translation: "He lives near me." }
    ],
    200: [
      { text: "L'aeroporto è *lontano* da qui.", translation: "It's far to the airport from here." },
      { text: "Non viviamo *lontano* dal centro.", translation: "We don't live far from the center." },
      { text: "Ha viaggiato *lontano* per venire qui.", translation: "She travelled far to get here." }
    ],
    201: [
      { text: "Sono le *undici*.", translation: "It's eleven o'clock." },
      { text: "Ha *undici* anni.", translation: "She's eleven years old." },
      { text: "Ci vediamo alle *undici*.", translation: "We meet at eleven." }
    ],
    202: [
      { text: "Sono le *dodici*.", translation: "It's twelve o'clock." },
      { text: "L'anno ha *dodici* mesi.", translation: "The year has twelve months." },
      { text: "Eravamo in *dodici* a cena.", translation: "There were twelve of us at dinner." }
    ],
    203: [
      { text: "Ha *tredici* anni.", translation: "He's thirteen years old." },
      { text: "Abbiamo aspettato *tredici* minuti.", translation: "We waited thirteen minutes." },
      { text: "Ci sono *tredici* studenti in classe.", translation: "There are thirteen students in the class." }
    ],
    204: [
      { text: "Compie *quattordici* anni a marzo.", translation: "She turns fourteen in March." },
      { text: "Siamo stati in vacanza per *quattordici* giorni.", translation: "We were on vacation for fourteen days." },
      { text: "Mancano *quattordici* giorni a Natale.", translation: "There are fourteen days until Christmas." }
    ],
    205: [
      { text: "Ha *quindici* anni.", translation: "He is fifteen years old." },
      { text: "Abbiamo aspettato *quindici* minuti.", translation: "We waited fifteen minutes." },
      { text: "Il negozio chiude tra *quindici* minuti.", translation: "The shop closes in fifteen minutes." }
    ],
    206: [
      { text: "Ha *sedici* anni.", translation: "She's sixteen years old." },
      { text: "Abbiamo aspettato *sedici* minuti.", translation: "We waited sixteen minutes." },
      { text: "Ci sono *sedici* studenti in classe.", translation: "There are sixteen students in the class." }
    ],
    207: [
      { text: "Compie *diciassette* anni a giugno.", translation: "He turns seventeen in June." },
      { text: "Abbiamo vissuto lì per *diciassette* anni.", translation: "We lived there for seventeen years." },
      { text: "Mancano *diciassette* giorni alle vacanze.", translation: "There are seventeen days until the holiday." }
    ],
    208: [
      { text: "Compie *diciotto* anni il mese prossimo.", translation: "She turns eighteen next month." },
      { text: "Abbiamo comprato *diciotto* biglietti per il concerto.", translation: "We bought eighteen tickets for the concert." },
      { text: "Ci sono *diciotto* tavoli nel ristorante.", translation: "There are eighteen tables at the restaurant." }
    ],
    209: [
      { text: "Ha *diciannove* anni.", translation: "He's nineteen years old." },
      { text: "Abbiamo aspettato *diciannove* minuti l'autobus.", translation: "We waited nineteen minutes for the bus." },
      { text: "Ci sono *diciannove* studenti in classe.", translation: "There are nineteen students in the class." }
    ],
    210: [
      { text: "Ho *venti* anni.", translation: "I am twenty years old." },
      { text: "Abbiamo aspettato *venti* minuti.", translation: "We waited twenty minutes." },
      { text: "Ci sono *venti* studenti nella nostra classe.", translation: "There are twenty students in our class." }
    ],
    211: [
      { text: "Mio *nonno* vive in campagna.", translation: "My grandfather lives in the countryside." },
      { text: "Mio *nonno* racconta belle storie.", translation: "My grandfather tells good stories." },
      { text: "Vado spesso a trovare mio *nonno*.", translation: "I visit my grandfather often." }
    ],
    212: [
      { text: "I miei *genitori* vivono ad Amburgo.", translation: "My parents live in Hamburg." },
      { text: "I miei *genitori* sono insegnanti.", translation: "My parents are teachers." },
      { text: "Andiamo a trovare i nostri *genitori* ogni Natale.", translation: "We visit our parents every Christmas." }
    ],
    213: [
      { text: "Mio *figlio* va a scuola.", translation: "My son goes to school." },
      { text: "Il loro *figlio* è molto simpatico.", translation: "Their son is very nice." },
      { text: "Sono fiero di mio *figlio*.", translation: "I'm proud of my son." }
    ],
    214: [
      { text: "A mia *figlia* piace disegnare.", translation: "My daughter likes to draw." },
      { text: "La loro *figlia* studia medicina.", translation: "Their daughter studies medicine." },
      { text: "Chiamo mia *figlia* ogni giorno.", translation: "I call my daughter every day." }
    ],
    215: [
      { text: "Mio *marito* lavora come ingegnere.", translation: "My husband works as an engineer." },
      { text: "Il suo *marito* è francese.", translation: "Her husband is French." },
      { text: "Abbiamo conosciuto suo *marito* alla festa.", translation: "We met her husband at the party." }
    ],
    216: [
      { text: "Il mio *insegnante* è molto gentile.", translation: "My teacher is very nice." },
      { text: "Lavora come *insegnante* a scuola.", translation: "She works as a teacher at the school." },
      { text: "L'*insegnante* ci ha dato molti compiti.", translation: "The teacher gave us a lot of homework." }
    ],
    217: [
      { text: "È *studente* all'università.", translation: "He's a student at the university." },
      { text: "Lo *studente* ha studiato tutta la notte.", translation: "The student studied all night." },
      { text: "Sono stato *studente* per cinque anni.", translation: "I was a student for five years." }
    ],
    218: [
      { text: "Mia madre è *medico*.", translation: "My mother is a doctor." },
      { text: "Devo andare dal *medico* domani.", translation: "I have to go to the doctor tomorrow." },
      { text: "Il *medico* ha visitato il paziente.", translation: "The doctor examined the patient." }
    ],
    219: [
      { text: "Mia sorella è *infermiera*.", translation: "My sister is a nurse." },
      { text: "L'*infermiera* era molto premurosa.", translation: "The nurse was very caring." },
      { text: "Lavora come *infermiera* in ospedale.", translation: "He works as a nurse at the hospital." }
    ],
    220: [
      { text: "Abbiamo chiamato la *polizia* dopo l'incidente.", translation: "We called the police after the accident." },
      { text: "La *polizia* è arrivata subito sul posto.", translation: "The police arrived quickly at the scene." },
      { text: "Lavora nella *polizia*.", translation: "He works in the police force." }
    ],
    221: [
      { text: "Amo il mio *lavoro*.", translation: "I love my job." },
      { text: "Ha trovato un nuovo *lavoro* ieri.", translation: "She got a new job yesterday." },
      { text: "Il suo *lavoro* è molto impegnativo.", translation: "His job is very demanding." }
    ],
    222: [
      { text: "Lavoro in un *ufficio* in centro.", translation: "I work at an office downtown." },
      { text: "Il mio *ufficio* è al terzo piano.", translation: "My office is on the third floor." },
      { text: "Ci siamo incontrati in *ufficio* alle nove.", translation: "We met at the office at nine." }
    ],
    223: [
      { text: "Siamo venti studenti in *classe*.", translation: "There are twenty students in the class." },
      { text: "La nostra *classe* è molto simpatica.", translation: "Our class is very nice." },
      { text: "È il migliore della *classe*.", translation: "He's the best in the class." }
    ],
    224: [
      { text: "Devo fare i miei *compiti*.", translation: "I have to do my homework." },
      { text: "Il *compito* era difficile oggi.", translation: "The homework was difficult today." },
      { text: "L'insegnante ci ha dato molti *compiti*.", translation: "The teacher gave us a lot of homework." }
    ],
    225: [
      { text: "Domani abbiamo un *test*.", translation: "We have a test tomorrow." },
      { text: "Il *test* era più facile di quanto pensassi.", translation: "The test was easier than I thought." },
      { text: "Devo studiare per il *test*.", translation: "I need to study for the test." }
    ],
    226: [
      { text: "*Dormo* otto ore ogni notte.", translation: "I sleep eight hours every night." },
      { text: "Il bambino *dorme* già.", translation: "The child is already asleep." },
      { text: "Non riesco a *dormire* stasera.", translation: "I can't manage to sleep tonight." }
    ],
    227: [
      { text: "*Mi sveglio* alle sette ogni mattina.", translation: "I wake up at seven every morning." },
      { text: "*Si è svegliata* per il rumore in strada.", translation: "She woke up from the noise on the street." },
      { text: "Di solito *si sveglia* presto.", translation: "He usually wakes up early." }
    ],
    228: [
      { text: "*Lavoro* in un negozio.", translation: "I work in a shop." },
      { text: "*Lavora* sodo ogni giorno.", translation: "She works hard every day." },
      { text: "Vuoi *lavorare* con me domani?", translation: "Do you want to work with me tomorrow?" }
    ],
    229: [
      { text: "*Studio* medicina all'università.", translation: "I study medicine at the university." },
      { text: "*Studia* per il test stasera.", translation: "She's studying for the test tonight." },
      { text: "Dobbiamo *studiare* di più questa settimana.", translation: "We need to study more this week." }
    ],
    230: [
      { text: "Sto *imparando* l'italiano adesso.", translation: "I'm learning Italian now." },
      { text: "I bambini *imparano* velocemente.", translation: "Children learn fast." },
      { text: "È divertente *imparare* cose nuove.", translation: "It's fun to learn new things." }
    ],
    231: [
      { text: "*Guido* per andare al lavoro ogni giorno.", translation: "I drive to work every day." },
      { text: "Puoi *guidare* fino all'aeroporto?", translation: "Can you drive me to the airport?" },
      { text: "*Guida* sempre con prudenza.", translation: "She always drives carefully." }
    ],
    232: [
      { text: "*Viaggiamo* in Germania quest'estate.", translation: "We're travelling to Germany this summer." },
      { text: "Amo *viaggiare*.", translation: "I love to travel." },
      { text: "*Viaggiano* molto per lavoro.", translation: "They travel a lot for work." }
    ],
    233: [
      { text: "*Aspetto* l'autobus.", translation: "I'm waiting for the bus." },
      { text: "Puoi *aspettare* un po'?", translation: "Can you wait a bit?" },
      { text: "Abbiamo *aspettato* un'ora.", translation: "We waited for an hour." }
    ],
    234: [
      { text: "Non riesco a *trovare* le mie chiavi.", translation: "I can't find my keys." },
      { text: "Ha *trovato* il libro sotto il letto.", translation: "He found the book under the bed." },
      { text: "Puoi aiutarmi a *trovare* la strada?", translation: "Can you help me find the way?" }
    ],
    235: [
      { text: "Stasera *incontro* degli amici.", translation: "I'm going to meet friends tonight." },
      { text: "Ci siamo *incontrati* al bar.", translation: "We met at the café." },
      { text: "Piacere di *incontrarti*!", translation: "Nice to meet you!" }
    ],
    236: [
      { text: "Mi *piace* questo libro.", translation: "I like this book." },
      { text: "Le *piace* leggere la sera.", translation: "She likes to read in the evening." },
      { text: "Ti *piace* viaggiare?", translation: "Do you like to travel?" }
    ],
    237: [
      { text: "Ti *amo*.", translation: "I love you." },
      { text: "Lei *ama* la musica.", translation: "She loves music." },
      { text: "*Amiamo* viaggiare insieme.", translation: "We love to travel together." }
    ],
    238: [
      { text: "*Voglio* un caffè.", translation: "I want a coffee." },
      { text: "Cosa *vuoi* fare stasera?", translation: "What do you want to do tonight?" },
      { text: "Non *voleva* ancora tornare a casa.", translation: "She didn't want to go home yet." }
    ],
    239: [
      { text: "*Ho bisogno* di aiuto con questo.", translation: "I need help with this." },
      { text: "*Abbiamo bisogno* di più tempo.", translation: "We need more time." },
      { text: "*Ha bisogno* di scarpe nuove.", translation: "She needs new shoes." }
    ],
    240: [
      { text: "Vado a *comprare* il latte al negozio.", translation: "I'm going to buy milk at the shop." },
      { text: "Vuoi *comprare* questo libro?", translation: "Do you want to buy this book?" },
      { text: "Ha *comprato* una macchina nuova ieri.", translation: "She bought a new car yesterday." }
    ],
    241: [
      { text: "*Vendiamo* la nostra casa.", translation: "We're selling our house." },
      { text: "Ha *venduto* la sua macchina l'anno scorso.", translation: "He sold his car last year." },
      { text: "Vogliono *vendere* l'appartamento presto.", translation: "They want to sell the apartment soon." }
    ],
    242: [
      { text: "Posso *pagare* con la carta?", translation: "Can I pay with card?" },
      { text: "Ho *pagato* per la cena.", translation: "I paid for dinner." },
      { text: "Dobbiamo *pagare* l'affitto oggi.", translation: "We have to pay the rent today." }
    ],
    243: [
      { text: "Puoi *aprire* la finestra?", translation: "Can you open the window?" },
      { text: "Il negozio *apre* alle dieci.", translation: "The shop opens at ten." },
      { text: "Ha *aperto* la porta con cautela.", translation: "She opened the door carefully." }
    ],
    244: [
      { text: "Puoi *chiudere* la porta?", translation: "Can you close the door?" },
      { text: "Il negozio *chiude* alle sei.", translation: "The shop closes at six." },
      { text: "Ha *chiuso* la finestra perché faceva freddo.", translation: "He closed the window because it was cold." }
    ],
    245: [
      { text: "Devo *lavare* i miei vestiti.", translation: "I need to wash my clothes." },
      { text: "Si *lava* le mani prima di mangiare.", translation: "She washes her hands before she eats." },
      { text: "Abbiamo *lavato* la macchina nel weekend.", translation: "We washed the car over the weekend." }
    ],
    246: [
      { text: "Posso *vedere* la montagna da qui.", translation: "I can see the mountain from here." },
      { text: "Vuoi *vedere* un film stasera?", translation: "Do you want to see a movie tonight?" },
      { text: "Ha *visto* un uccello sull'albero.", translation: "She saw a bird in the tree." }
    ],
    247: [
      { text: "Riesco a *sentire* la musica del vicino.", translation: "I can hear music from the neighbor." },
      { text: "Riesci a *sentirmi*?", translation: "Can you hear me?" },
      { text: "Ha *sentito* uno strano rumore.", translation: "She heard a strange sound." }
    ],
    248: [
      { text: "Cosa vuoi *dirle*?", translation: "What do you want to say to her?" },
      { text: "Non ha *detto* niente.", translation: "He said nothing." },
      { text: "Puoi *dirlo* di nuovo?", translation: "Can you say that again?" }
    ],
    249: [
      { text: "Posso *chiederti* una cosa?", translation: "Can I ask you something?" },
      { text: "Ha *chiesto* indicazioni per la stazione.", translation: "She asked for directions to the station." },
      { text: "Dobbiamo *chiedere* all'insegnante di questo.", translation: "We need to ask the teacher about this." }
    ],
    250: [
      { text: "Puoi *rispondere* alla mia domanda?", translation: "Can you answer my question?" },
      { text: "Ha *risposto* velocemente all'email.", translation: "He answered the email quickly." },
      { text: "Non *risponde* mai al telefono.", translation: "She never answers the phone." }
    ],
    251: [
      { text: "Oggi sono molto *felice*.", translation: "I'm very happy today." },
      { text: "Era *felice* per il regalo.", translation: "She was happy about the gift." },
      { text: "Siamo *felici* di vederti.", translation: "We're happy to see you." }
    ],
    252: [
      { text: "È *triste* perché il suo cane è malato.", translation: "He's sad because his dog is sick." },
      { text: "Il film mi ha reso *triste*.", translation: "The movie made me sad." },
      { text: "Ci siamo sentiti *tristi* dopo la notizia.", translation: "We felt sad after the news." }
    ],
    253: [
      { text: "Si è *arrabbiata* quando è arrivato in ritardo.", translation: "She got angry when he came late." },
      { text: "Non essere *arrabbiato* con me.", translation: "Don't be angry with me." },
      { text: "È stato *arrabbiato* tutto il giorno.", translation: "He was angry all day." }
    ],
    254: [
      { text: "Sono molto *stanco* stasera.", translation: "I'm very tired tonight." },
      { text: "Si è *stancata* dopo il lavoro.", translation: "She got tired after work." },
      { text: "Eravamo *stanchi* dopo il lungo viaggio.", translation: "We were tired after the long trip." }
    ],
    255: [
      { text: "Sono *malato* oggi e resto a casa.", translation: "I'm sick today and staying home." },
      { text: "Il bambino è *malato* e ha la febbre.", translation: "The child is sick and has a fever." },
      { text: "È stata *malata* tutta la settimana.", translation: "She was sick all week." }
    ],
    256: [
      { text: "Il test era *facile*.", translation: "The test was easy." },
      { text: "Questo è un compito *facile*.", translation: "This is an easy task." },
      { text: "È stato *facile* trovare la strada.", translation: "It was easy to find the way." }
    ],
    257: [
      { text: "Questo compito è *difficile*.", translation: "This task is difficult." },
      { text: "È stato *difficile* capirlo.", translation: "It was difficult to understand him." },
      { text: "L'italiano non è così *difficile* da imparare.", translation: "Italian isn't so difficult to learn." }
    ],
    258: [
      { text: "Questa macchina è molto *costosa*.", translation: "This car is very expensive." },
      { text: "L'hotel era *costoso*.", translation: "The hotel was expensive." },
      { text: "Abbiamo trovato un ristorante *costoso* ma bello.", translation: "We found an expensive but nice restaurant." }
    ],
    259: [
      { text: "Questo maglione era *economico*.", translation: "This sweater was cheap." },
      { text: "Cercavamo un hotel *economico*.", translation: "We looked for a cheap hotel." },
      { text: "Il biglietto aereo era sorprendentemente *economico*.", translation: "The plane ticket was surprisingly cheap." }
    ],
    260: [
      { text: "L'ingresso è *gratis* oggi.", translation: "Entry is free today." },
      { text: "Il caffè in ufficio è *gratis*.", translation: "The coffee at the office is free." },
      { text: "Il museo è *gratis* per i bambini.", translation: "The museum is free for children." }
    ],
    261: [
      { text: "Abbiamo *molti* amici qui.", translation: "We have many friends here." },
      { text: "C'erano *molte* persone alla festa.", translation: "There were many people at the party." },
      { text: "Ha letto *molti* libri.", translation: "She has read many books." }
    ],
    262: [
      { text: "C'erano *pochi* visitatori al museo oggi.", translation: "There were few people at the museum today." },
      { text: "Abbiamo *pochi* giorni di vacanza rimasti.", translation: "We have few days left of the holiday." },
      { text: "Solo *pochi* studenti sono venuti a lezione.", translation: "Only a few students came to class." }
    ],
    263: [
      { text: "Posso avere *più* caffè?", translation: "Can I have more coffee?" },
      { text: "Ho bisogno di *più* tempo.", translation: "I need more time." },
      { text: "Parla *più* di suo fratello.", translation: "She talks more than her brother." }
    ],
    264: [
      { text: "Adesso mangio *meno* carne.", translation: "I eat less meat now." },
      { text: "Abbiamo *meno* tempo di quanto pensassimo.", translation: "We have less time than we thought." },
      { text: "Lavora *meno* di prima.", translation: "He works less than before." }
    ],
    265: [
      { text: "Abbiamo cibo *abbastanza* per tutti?", translation: "Do we have enough food for everyone?" },
      { text: "Non ho *abbastanza* soldi.", translation: "I don't have enough money." },
      { text: "C'è *abbastanza* spazio in macchina.", translation: "There's enough room in the car." }
    ],
    266: [
      { text: "Viaggio *spesso* in Italia.", translation: "I often travel to Italy." },
      { text: "Chiama *spesso* i suoi genitori.", translation: "She often calls her parents." },
      { text: "Mangiamo *spesso* pesce a cena.", translation: "We often eat fish for dinner." }
    ],
    267: [
      { text: "Non bevo *mai* caffè la sera.", translation: "I never drink coffee in the evening." },
      { text: "Non arriva *mai* in ritardo.", translation: "He never comes late." },
      { text: "Non siamo *mai* stati in Giappone.", translation: "We have never been to Japan." }
    ],
    268: [
      { text: "*A volte* faccio una passeggiata da solo.", translation: "I sometimes go for a walk alone." },
      { text: "*A volte* fa colazione tardi.", translation: "She sometimes eats breakfast late." },
      { text: "*A volte* andiamo al rifugio nel weekend.", translation: "We sometimes go to the cabin on weekends." }
    ],
    269: [
      { text: "Mi sveglio *presto* ogni giorno.", translation: "I wake up early every day." },
      { text: "Siamo arrivati *presto* all'aeroporto.", translation: "We arrived early at the airport." },
      { text: "La riunione inizia *presto* domani.", translation: "The meeting starts early tomorrow." }
    ],
    270: [
      { text: "Oggi è arrivato *tardi* al lavoro.", translation: "He came late to work today." },
      { text: "Ieri abbiamo cenato *tardi*.", translation: "We ate dinner late yesterday." },
      { text: "Il treno è partito *tardi* la sera.", translation: "The train left late in the evening." }
    ],
    271: [
      { text: "*Questo* libro è molto bello.", translation: "This book is very good." },
      { text: "Mi piace *questo* maglione.", translation: "I like this sweater." },
      { text: "*Questa* settimana è stata frenetica.", translation: "This week has been busy." }
    ],
    272: [
      { text: "*Questa* casa è grande.", translation: "This house is big." },
      { text: "Non capisco *questa* parola.", translation: "I don't understand this word." },
      { text: "*Questo* è mio fratello.", translation: "This is my brother." }
    ],
    273: [
      { text: "*Queste* scarpe sono nuove.", translation: "These shoes are new." },
      { text: "Mi piacciono *queste* foto.", translation: "I like these pictures." },
      { text: "*Questi* libri sono della biblioteca.", translation: "These books are from the library." }
    ],
    274: [
      { text: "Viviamo nella *stessa* città.", translation: "We live in the same city." },
      { text: "Ha la *stessa* giacca mia.", translation: "He has the same jacket as me." },
      { text: "Sono andati alla *stessa* scuola.", translation: "They went to the same school." }
    ],
    275: [
      { text: "Preferisco l'*altro* libro.", translation: "I'd rather have the other book." },
      { text: "Prendiamo l'*altra* strada.", translation: "We'll take the other way." },
      { text: "Vive dall'*altra* parte della strada.", translation: "She lives on the other side of the street." }
    ],
    276: [
      { text: "*Arrivederci*! Ci vediamo domani.", translation: "Bye! See you tomorrow." },
      { text: "Ha salutato con la mano e ha detto *arrivederci*.", translation: "She waved and said bye." },
      { text: "*Arrivederci*, ci sentiamo presto!", translation: "Bye, talk soon!" }
    ],
    277: [
      { text: "*Buongiorno*! Hai dormito bene?", translation: "Good morning! Did you sleep well?" },
      { text: "Ha detto *buongiorno* a tutti in ufficio.", translation: "He said good morning to everyone at the office." },
      { text: "*Buongiorno*, oggi è una bella giornata.", translation: "Good morning, it's a nice day today." }
    ],
    278: [
      { text: "*Buonasera*! Come stai?", translation: "Good evening! How are you?" },
      { text: "Abbiamo detto *buonasera* e siamo entrati.", translation: "We said good evening and went in." },
      { text: "*Buonasera*, benvenuti al ristorante.", translation: "Good evening, welcome to the restaurant." }
    ],
    279: [
      { text: "*Buonanotte*, dormi bene!", translation: "Good night, sleep well!" },
      { text: "Ha detto *buonanotte* ai bambini.", translation: "She said good night to the children." },
      { text: "*Buonanotte*, ci vediamo presto domani.", translation: "Good night, see you early tomorrow." }
    ],
    280: [
      { text: "*Benvenuto* in Italia!", translation: "Welcome to Italy!" },
      { text: "Sei sempre il *benvenuto* a casa nostra.", translation: "You're always welcome at our home." },
      { text: "*Benvenuto*, prego, entra!", translation: "Welcome, please come in!" }
    ],
    281: [
      { text: "*Ecco a te*, ecco il tuo caffè.", translation: "Here you are, here's your coffee." },
      { text: "*Ecco a te*, siediti.", translation: "Please, sit down." },
      { text: "Mi ha dato il libro e ha detto *ecco a te*.", translation: "She gave me the book and said here you are." }
    ],
    282: [
      { text: "*Mille grazie* per l'aiuto!", translation: "Many thanks for the help!" },
      { text: "*Mille grazie*, sei stato molto gentile.", translation: "Thank you so much, that was very kind of you." },
      { text: "Abbiamo detto *mille grazie* e siamo andati a casa.", translation: "We said thanks a lot and went home." }
    ],
    283: [
      { text: "*Va bene*, non preoccuparti.", translation: "It's fine, don't worry." },
      { text: "Come stai? *Va bene*, grazie.", translation: "How are you? I'm fine, thanks." },
      { text: "*Va bene* con me adesso.", translation: "I'm doing fine now." }
    ],
    284: [
      { text: "Era un bel film, *vero*?", translation: "That was a nice movie, right?" },
      { text: "Ti piace il caffè, *vero*?", translation: "You like coffee, right?" },
      { text: "Ci siamo incontrati l'anno scorso, *vero*?", translation: "We met last year, right?" }
    ],
    285: [
      { text: "*Certo* che posso aiutarti.", translation: "Of course I can help you." },
      { text: "Vieni stasera? *Certo*!", translation: "Are you coming tonight? Of course!" },
      { text: "*Certo* che mi ricordo di te.", translation: "Of course I remember you." }
    ],
    286: [
      { text: "Devo andare in *farmacia* a comprare medicine.", translation: "I need to go to the pharmacy and buy medicine." },
      { text: "La *farmacia* è accanto al negozio.", translation: "The pharmacy is next to the shop." },
      { text: "La *farmacia* apre alle otto.", translation: "The pharmacy opens at eight." }
    ],
    287: [
      { text: "È stato portato in *ospedale* ieri.", translation: "He was taken to the hospital yesterday." },
      { text: "L'*ospedale* si trova fuori città.", translation: "The hospital is outside the city." },
      { text: "Lavora in *ospedale* come infermiera.", translation: "She works at the hospital as a nurse." }
    ],
    288: [
      { text: "Ho un appuntamento dal *dentista* domani.", translation: "I have an appointment with the dentist tomorrow." },
      { text: "Il *dentista* ha controllato i miei denti.", translation: "The dentist checked my teeth." },
      { text: "I bambini dovrebbero andare dal *dentista* ogni anno.", translation: "Children should go to the dentist every year." }
    ],
    289: [
      { text: "Posso avere un po' di *aiuto*?", translation: "Can I get some help?" },
      { text: "Grazie mille per l'*aiuto*!", translation: "Thanks a lot for the help!" },
      { text: "Aveva bisogno di *aiuto* con i compiti.", translation: "She needed help with the homework." }
    ],
    290: [
      { text: "Abbiamo un piccolo *problema*.", translation: "We have a small problem." },
      { text: "Il *problema* è stato risolto velocemente.", translation: "The problem was solved quickly." },
      { text: "Nessun *problema*, posso aiutare.", translation: "No problem, I can help." }
    ],
    291: [
      { text: "Qual è il *prezzo* di questo maglione?", translation: "What's the price of this sweater?" },
      { text: "Il *prezzo* era più alto di quanto mi aspettassi.", translation: "The price was higher than I expected." },
      { text: "Abbiamo confrontato i *prezzi* in diversi negozi.", translation: "We compared prices in several shops." }
    ],
    292: [
      { text: "Oggi non ho abbastanza *soldi*.", translation: "I don't have enough money today." },
      { text: "Sta risparmiando *soldi* per il viaggio.", translation: "She's saving money for the trip." },
      { text: "Abbiamo bisogno di più *soldi* per il progetto.", translation: "We need more money for the project." }
    ],
    293: [
      { text: "Posso avere una *ricevuta*, per favore?", translation: "Can I have a receipt, please?" },
      { text: "Ho perso la mia *ricevuta*.", translation: "I lost my receipt." },
      { text: "La *ricevuta* mostra quanto hai pagato.", translation: "The receipt shows what you paid." }
    ],
    294: [
      { text: "Hai bisogno di un *sacchetto*?", translation: "Do you need a bag?" },
      { text: "Il *sacchetto* era pieno di verdure.", translation: "The bag was full of vegetables." },
      { text: "Ho dimenticato i miei *sacchetti* a casa.", translation: "I forgot my bags at home." }
    ],
    295: [
      { text: "Che *taglia* porti?", translation: "What size do you wear?" },
      { text: "Questo maglione è la *taglia* sbagliata.", translation: "This sweater is the wrong size." },
      { text: "Hanno tutte le *taglie* in questo negozio.", translation: "They have all sizes in this shop." }
    ],
    296: [
      { text: "Ho dimenticato il mio *telefono* a casa.", translation: "I forgot my phone at home." },
      { text: "Il *telefono* ha squillato nel cuore della notte.", translation: "The phone rang in the middle of the night." },
      { text: "Posso prendere in prestito il tuo *telefono*?", translation: "Can I borrow your phone?" }
    ],
    297: [
      { text: "Il mio *computer* è molto vecchio.", translation: "My computer is very old." },
      { text: "Il *computer* ha smesso di funzionare ieri.", translation: "The computer stopped working yesterday." },
      { text: "Lavoro al *computer* tutto il giorno.", translation: "I work on the computer all day." }
    ],
    298: [
      { text: "Ho perso la mia *chiave*.", translation: "I've lost my key." },
      { text: "La *chiave* è sotto lo zerbino.", translation: "The key is under the mat." },
      { text: "Puoi darmi le *chiavi*?", translation: "Can you give me the keys?" }
    ],
    299: [
      { text: "L'*orologio* sul muro segna l'ora sbagliata.", translation: "The clock on the wall shows the wrong time." },
      { text: "Ho comprato un *orologio* nuovo ieri.", translation: "I bought a new watch yesterday." },
      { text: "L'*orologio* ha suonato alle sette.", translation: "The clock rang at seven." }
    ],
    300: [
      { text: "Porta sempre una *borsa* grande.", translation: "She always carries a big bag." },
      { text: "La mia *borsa* è piena di libri.", translation: "My bag is full of books." },
      { text: "Ho comprato una *borsa* nuova per la scuola.", translation: "I bought a new bag for school." }
    ],
    301: [
      { text: "Puoi *darmi* il libro?", translation: "Can you give me the book?" },
      { text: "Le ha *dato* un regalo.", translation: "He gave her a gift." },
      { text: "Vogliamo *dare* soldi in beneficenza.", translation: "We want to give money to charity." }
    ],
    302: [
      { text: "Puoi *prendere* questa borsa per me?", translation: "Can you take this bag for me?" },
      { text: "Ha *preso* l'autobus per andare al lavoro.", translation: "She took the bus to work." },
      { text: "Devo *prendere* una pausa adesso.", translation: "I need to take a break now." }
    ],
    303: [
      { text: "Puoi *mettere* il libro sul tavolo?", translation: "Can you put the book on the table?" },
      { text: "Ha *messo* le chiavi nella borsa.", translation: "She put the keys in the bag." },
      { text: "Stasera vado a *mettermi* a letto presto.", translation: "I'm going to bed early tonight." }
    ],
    304: [
      { text: "Il film *comincia* alle otto.", translation: "The movie begins at eight." },
      { text: "Dobbiamo *cominciare* a lavorare adesso.", translation: "We need to begin working now." },
      { text: "La scuola è *cominciata* ad agosto.", translation: "School began in August." }
    ],
    305: [
      { text: "Devo *finire* questo progetto oggi.", translation: "I need to finish this project today." },
      { text: "La riunione è *finita* presto.", translation: "The meeting finished early." },
      { text: "*Finiremo* il corso la prossima settimana.", translation: "We're going to finish the course next week." }
    ],
    306: [
      { text: "Non *so* la risposta.", translation: "I don't know the answer." },
      { text: "*Sai* dove abita?", translation: "Do you know where she lives?" },
      { text: "Non *sapeva* cosa dire.", translation: "She didn't know what to say." }
    ],
    307: [
      { text: "*Penso* a te.", translation: "I'm thinking of you." },
      { text: "Cosa ne *pensi*?", translation: "What do you think about this?" },
      { text: "Ha *pensato* a lungo prima di rispondere.", translation: "He thought for a long time before answering." }
    ],
    308: [
      { text: "Non *capisco* la domanda.", translation: "I don't understand the question." },
      { text: "Riesci a *capire* l'italiano?", translation: "Can you understand Italian?" },
      { text: "Non *capiva* perché fosse arrabbiato.", translation: "She didn't understand why he was angry." }
    ],
    309: [
      { text: "Non *ricordo* il suo nome.", translation: "I don't remember his name." },
      { text: "Riesci a *ricordare* cosa ho detto?", translation: "Can you remember what I said?" },
      { text: "Si *ricordava* del mio compleanno.", translation: "She remembered my birthday." }
    ],
    310: [
      { text: "*Dimentico* sempre le chiavi.", translation: "I always forget my keys." },
      { text: "Non *dimenticare* di chiamarmi.", translation: "Don't forget to call me." },
      { text: "Ha *dimenticato* il libro a casa.", translation: "He forgot the book at home." }
    ],
    311: [
      { text: "Puoi *aiutarmi* con questo?", translation: "Can you help me with this?" },
      { text: "*Aiuta* sempre gli altri.", translation: "She always helps others." },
      { text: "Abbiamo *aiutato* il vicino con il giardino.", translation: "We helped the neighbor with the garden." }
    ],
    312: [
      { text: "Ti *chiamo* stasera.", translation: "I'll call you tonight." },
      { text: "Puoi *chiamare* il medico per me?", translation: "Can you call the doctor for me?" },
      { text: "*Chiamava* sua madre ogni domenica.", translation: "She called her mother every Sunday." }
    ],
    313: [
      { text: "Puoi *inviarmi* il libro?", translation: "Can you send me the book?" },
      { text: "Ho *inviato* un'email ieri.", translation: "I sent an email yesterday." },
      { text: "*Invieremo* il pacco domani.", translation: "We're going to send the package tomorrow." }
    ],
    314: [
      { text: "Ho *perso* la mia chiave.", translation: "I lost my key." },
      { text: "Non *perdere* la speranza.", translation: "Don't lose heart." },
      { text: "Ha paura di *perdere* il lavoro.", translation: "She's afraid of losing her job." }
    ],
    315: [
      { text: "Speriamo di *vincere* la partita oggi.", translation: "We hope to win the match today." },
      { text: "Ha *vinto* la gara l'anno scorso.", translation: "She won the competition last year." },
      { text: "La nostra squadra *vince* spesso.", translation: "Our team often wins." }
    ],
    316: [
      { text: "Il treno *arriva* alle dieci.", translation: "The train arrives at ten." },
      { text: "Siamo *arrivati* tardi alla festa.", translation: "We arrived late at the party." },
      { text: "L'aereo dovrebbe *arrivare* tra un'ora.", translation: "The plane is due to arrive in an hour." }
    ],
    317: [
      { text: "Possiamo *entrare* adesso.", translation: "We can enter now." },
      { text: "È *entrata* in silenzio nella stanza.", translation: "She entered the room quietly." },
      { text: "Posso *entrare*?", translation: "Can I come in?" }
    ],
    318: [
      { text: "Il treno *parte* alle nove.", translation: "The train departs at nine." },
      { text: "Dobbiamo *partire* adesso per prendere l'aereo.", translation: "We have to leave now to catch the plane." },
      { text: "È *partito* senza salutare.", translation: "He left without saying goodbye." }
    ],
    319: [
      { text: "*Abito* a Roma.", translation: "I live in Rome." },
      { text: "Dove *abiti*?", translation: "Where do you live?" },
      { text: "*Hanno abitato* lì per molti anni.", translation: "They lived there for many years." }
    ],
    320: [
      { text: "Ci piace *camminare* nel parco.", translation: "We like to walk in the park." },
      { text: "*Cammina* fino al lavoro ogni giorno.", translation: "She walks to work every day." },
      { text: "Andiamo a *camminare*?", translation: "Shall we go for a walk?" }
    ],
    321: [
      { text: "*Corro* ogni mattina.", translation: "I run every morning." },
      { text: "I bambini *correvano* in giardino.", translation: "The children ran around in the garden." },
      { text: "Riesce a *correre* molto veloce.", translation: "He can run very fast." }
    ],
    322: [
      { text: "Ci piace *nuotare* d'estate.", translation: "We love to swim in summer." },
      { text: "Sai *nuotare*?", translation: "Can you swim?" },
      { text: "Ha *nuotato* attraverso tutto il lago.", translation: "She swam across the whole lake." }
    ],
    323: [
      { text: "Il bambino ha imparato a *saltare* oggi.", translation: "The child learned to jump today." },
      { text: "Ha *saltato* oltre lo steccato.", translation: "He jumped over the fence." },
      { text: "Riesci a *saltare* così in alto?", translation: "Can you jump that high?" }
    ],
    324: [
      { text: "Ci piace *ballare* alle feste.", translation: "We love to dance at parties." },
      { text: "Sai *ballare* il valzer?", translation: "Can you dance the waltz?" },
      { text: "Hanno *ballato* tutta la notte.", translation: "They danced all night." }
    ],
    325: [
      { text: "Sa *cantare* molto bene.", translation: "She can sing very well." },
      { text: "Abbiamo *cantato* insieme intorno al fuoco.", translation: "We sang together by the campfire." },
      { text: "*Canta* in un coro.", translation: "He sings in a choir." }
    ],
    326: [
      { text: "I bambini *giocano* in giardino.", translation: "The children are playing in the garden." },
      { text: "Vuoi *giocare* con me?", translation: "Do you want to play with me?" },
      { text: "Hanno *giocato* tutto il pomeriggio.", translation: "They played all afternoon." }
    ],
    327: [
      { text: "Mi piace *cucinare* la domenica.", translation: "I like to cook on Sundays." },
      { text: "Puoi *cucinare* per noi stasera?", translation: "Can you cook for us tonight?" },
      { text: "*Cucina* ogni giorno.", translation: "She cooks every day." }
    ],
    328: [
      { text: "Devo *pulire* la mia stanza.", translation: "I need to clean my room." },
      { text: "Puoi *pulire* la cucina?", translation: "Can you clean the kitchen?" },
      { text: "Abbiamo *pulito* la casa prima che arrivassero gli ospiti.", translation: "We cleaned the house before the guests arrived." }
    ],
    329: [
      { text: "Vogliono *costruire* una casa nuova.", translation: "They're going to build a new house." },
      { text: "Ha *costruito* un tavolo di legno.", translation: "He built a table out of wood." },
      { text: "Stiamo *costruendo* una squadra insieme.", translation: "We're building a team together." }
    ],
    330: [
      { text: "Voglio *cambiare* i miei piani.", translation: "I want to change my plans." },
      { text: "Possiamo *cambiare* l'orario?", translation: "Can we change the time?" },
      { text: "La sua vita è *cambiata* completamente.", translation: "Her life changed completely." }
    ],
    331: [
      { text: "Mangiamo il *riso* a cena.", translation: "We eat rice for dinner." },
      { text: "Il *riso* era cotto alla perfezione.", translation: "The rice was cooked perfectly." },
      { text: "Gli piace il *riso* con il pollo.", translation: "He likes rice with chicken." }
    ],
    332: [
      { text: "Cuciniamo la *pasta* stasera.", translation: "We're making pasta tonight." },
      { text: "La *pasta* era deliziosa.", translation: "The pasta was delicious." },
      { text: "Mangia la *pasta* ogni settimana.", translation: "She eats pasta every week." }
    ],
    333: [
      { text: "Grigliamo il *pollo* nel weekend.", translation: "We're grilling chicken this weekend." },
      { text: "Il *pollo* era molto buono.", translation: "The chicken tasted very good." },
      { text: "Non mangia mai *pollo*.", translation: "He never eats chicken." }
    ],
    334: [
      { text: "Mangiamo il *manzo* a pranzo la domenica.", translation: "We eat beef for Sunday dinner." },
      { text: "Il *manzo* era tenero e succoso.", translation: "The beef was tender and juicy." },
      { text: "Preferisce il *manzo* al pollo.", translation: "He prefers beef to chicken." }
    ],
    335: [
      { text: "Lei non mangia *carne di maiale*.", translation: "She doesn't eat pork." },
      { text: "Abbiamo grigliato *carne di maiale* ieri.", translation: "We grilled pork yesterday." },
      { text: "La *carne di maiale* era un po' troppo salata.", translation: "The pork was a bit too salty." }
    ],
    336: [
      { text: "Puoi passarmi il *burro*?", translation: "Can you pass me the butter?" },
      { text: "Spalma il *burro* sul pane.", translation: "She spreads butter on the bread." },
      { text: "Abbiamo bisogno di più *burro* per la torta.", translation: "We need more butter for the cake." }
    ],
    337: [
      { text: "Friggiamo il pesce nell'*olio*.", translation: "We fry the fish in oil." },
      { text: "L'*olio* era troppo caldo.", translation: "The oil was too hot." },
      { text: "Puoi darmi l'*olio*?", translation: "Can you pass me the oil?" }
    ],
    338: [
      { text: "Puoi darmi il *pepe*?", translation: "Can you pass me the pepper?" },
      { text: "La zuppa ha bisogno di più *pepe*.", translation: "The soup needs a bit more pepper." },
      { text: "Usa molto *pepe* nel cibo.", translation: "She uses a lot of pepper in the food." }
    ],
    339: [
      { text: "Tagliamo la *cipolla* per la zuppa.", translation: "We're cutting onion for the soup." },
      { text: "La *cipolla* mi ha fatto piangere.", translation: "The onion made me cry." },
      { text: "Non gli piace la *cipolla* cruda.", translation: "He doesn't like raw onion." }
    ],
    340: [
      { text: "Ci servono più *pomodori* per l'insalata.", translation: "We need more tomatoes for the salad." },
      { text: "Il *pomodoro* era maturo e rosso.", translation: "The tomato was ripe and red." },
      { text: "Coltiva i *pomodori* in giardino.", translation: "She grows tomatoes in the garden." }
    ],
    341: [
      { text: "Friggiamo l'*aglio* nell'olio.", translation: "We fry garlic in oil." },
      { text: "Il piatto sa molto di *aglio*.", translation: "The dish tastes strongly of garlic." },
      { text: "Adora l'*aglio* in tutto quello che cucina.", translation: "He loves garlic in everything he cooks." }
    ],
    342: [
      { text: "Bevo acqua con il *limone*.", translation: "I drink water with lemon." },
      { text: "Il *limone* era molto aspro.", translation: "The lemon was very sour." },
      { text: "Ha spremuto un *limone* sul pesce.", translation: "She squeezed a lemon over the fish." }
    ],
    343: [
      { text: "Abbiamo raccolto le *fragole* in giardino.", translation: "We picked strawberries in the garden." },
      { text: "Le *fragole* erano dolci e rosse.", translation: "The strawberries were sweet and red." },
      { text: "Ha fatto la marmellata con le *fragole*.", translation: "She made jam from strawberries." }
    ],
    344: [
      { text: "I bambini mangiano l'*uva* come spuntino.", translation: "The children eat grapes as snacks." },
      { text: "L'*uva* era verde e dolce.", translation: "The grapes were green and sweet." },
      { text: "Abbiamo comprato un sacchetto di *uva* al mercato.", translation: "We bought a bag of grapes at the market." }
    ],
    345: [
      { text: "Mi ha fatto una *torta* per il compleanno.", translation: "She baked a cake for my birthday." },
      { text: "La *torta* era fantastica.", translation: "The cake tasted amazing." },
      { text: "Mangiamo la *torta* la domenica.", translation: "We eat cake on Sundays." }
    ],
    346: [
      { text: "Amo il *cioccolato* fondente.", translation: "I love dark chocolate." },
      { text: "Il *cioccolato* si è sciolto al sole.", translation: "The chocolate melted in the sun." },
      { text: "Mi ha dato una scatola di *cioccolato*.", translation: "She gave me a box of chocolate." }
    ],
    347: [
      { text: "Mangiamo il *gelato* d'estate.", translation: "We eat ice cream in summer." },
      { text: "Il *gelato* si è sciolto velocemente.", translation: "The ice cream melted fast." },
      { text: "Ai bambini piace il *gelato* al gusto di fragola.", translation: "The children love strawberry-flavored ice cream." }
    ],
    348: [
      { text: "Abbiamo bevuto il *vino* a cena.", translation: "We drank wine with dinner." },
      { text: "Il *vino* era rosso e secco.", translation: "The wine was red and dry." },
      { text: "Colleziona il *vino*.", translation: "He collects wine." }
    ],
    349: [
      { text: "Beve la *birra* con gli amici.", translation: "He drinks beer with his friends." },
      { text: "La *birra* era fredda e rinfrescante.", translation: "The beer was cold and refreshing." },
      { text: "Abbiamo ordinato due *birre* al pub.", translation: "We ordered two beers at the pub." }
    ],
    350: [
      { text: "Puoi aprire questa *bottiglia*?", translation: "Can you open this bottle?" },
      { text: "La *bottiglia* era piena d'acqua.", translation: "The bottle was full of water." },
      { text: "Abbiamo comprato una *bottiglia* di vino per la festa.", translation: "We bought a bottle of wine for the party." }
    ],
    351: [
      { text: "Il cibo è sul *tavolo*.", translation: "The food is on the table." },
      { text: "Abbiamo comprato un *tavolo* nuovo per il soggiorno.", translation: "We bought a new table for the living room." },
      { text: "Siediti al *tavolo*.", translation: "Sit down at the table." }
    ],
    352: [
      { text: "Questa *sedia* è molto comoda.", translation: "This chair is very comfortable." },
      { text: "Puoi prendermi una *sedia*?", translation: "Can you get me a chair?" },
      { text: "Ci servono più *sedie* per la cena.", translation: "We need more chairs for the dinner." }
    ],
    353: [
      { text: "Vado a *letto* alle dieci.", translation: "I get into bed at ten." },
      { text: "Il mio *letto* è molto morbido.", translation: "My bed is very soft." },
      { text: "Il bambino dorme in un *letto* piccolo.", translation: "The child sleeps in a small bed." }
    ],
    354: [
      { text: "Puoi chiudere la *porta*?", translation: "Can you close the door?" },
      { text: "La *porta* era chiusa a chiave.", translation: "The door was locked." },
      { text: "Ha bussato alla *porta*.", translation: "He knocked on the door." }
    ],
    355: [
      { text: "Puoi aprire la *finestra*?", translation: "Can you open the window?" },
      { text: "La *finestra* era sporca.", translation: "The window was dirty." },
      { text: "Il sole entrava dalla *finestra*.", translation: "The sun shone in through the window." }
    ],
    356: [
      { text: "Il quadro è appeso al *muro*.", translation: "The picture hangs on the wall." },
      { text: "Il *muro* è dipinto di bianco.", translation: "The wall is painted white." },
      { text: "Abbiamo messo uno scaffale sul *muro*.", translation: "We attached a shelf to the wall." }
    ],
    357: [
      { text: "Il *pavimento* è freddo d'inverno.", translation: "The floor is cold in winter." },
      { text: "Ha lavato il *pavimento* ieri.", translation: "She washed the floor yesterday." },
      { text: "Il bambino gioca sul *pavimento*.", translation: "The child is playing on the floor." }
    ],
    358: [
      { text: "Il *tetto* gocciola quando piove.", translation: "The roof leaks when it rains." },
      { text: "Abbiamo dipinto il *tetto* in estate.", translation: "We painted the roof this summer." },
      { text: "La neve copriva tutto il *tetto*.", translation: "The snow covered the whole roof." }
    ],
    359: [
      { text: "Coltiviamo le verdure nel *giardino*.", translation: "We grow vegetables in the garden." },
      { text: "Il nostro *giardino* è pieno di fiori.", translation: "Our garden is full of flowers." },
      { text: "I bambini giocano nel *giardino* ogni giorno.", translation: "The children play in the garden every day." }
    ],
    360: [
      { text: "La macchina è nel *garage*.", translation: "The car is in the garage." },
      { text: "Abbiamo costruito un nuovo *garage* l'anno scorso.", translation: "We built a new garage last year." },
      { text: "Il *garage* è pieno di attrezzi.", translation: "The garage is full of tools." }
    ],
    361: [
      { text: "La *lampada* in soggiorno è molto bella.", translation: "The lamp in the living room is very nice." },
      { text: "Puoi accendere la *lampada*?", translation: "Can you turn on the lamp?" },
      { text: "Abbiamo comprato una *lampada* nuova per la camera.", translation: "We bought a new lamp for the bedroom." }
    ],
    362: [
      { text: "Si guarda allo *specchio*.", translation: "She looks at herself in the mirror." },
      { text: "Lo *specchio* del bagno è grande.", translation: "The mirror in the bathroom is big." },
      { text: "Abbiamo appeso uno *specchio* nuovo nell'ingresso.", translation: "We hung up a new mirror in the hallway." }
    ],
    363: [
      { text: "Puoi darmi un *asciugamano*?", translation: "Can you give me a towel?" },
      { text: "L'*asciugamano* era bagnato.", translation: "The towel was wet." },
      { text: "Laviamo gli *asciugamani* ogni settimana.", translation: "We wash the towels every week." }
    ],
    364: [
      { text: "Lavati le mani con il *sapone*.", translation: "Wash your hands with soap." },
      { text: "Il *sapone* profumava di lavanda.", translation: "The soap smelled like lavender." },
      { text: "Ci serve più *sapone* in bagno.", translation: "We need more soap in the bathroom." }
    ],
    365: [
      { text: "Il latte è nel *frigorifero*.", translation: "The milk is in the fridge." },
      { text: "Il nostro *frigorifero* è quasi vuoto.", translation: "Our fridge is almost empty." },
      { text: "Abbiamo comprato un *frigorifero* nuovo ieri.", translation: "We bought a new fridge yesterday." }
    ],
    366: [
      { text: "Il pane è nel *forno*.", translation: "The bread is in the oven." },
      { text: "Il *forno* è molto caldo adesso.", translation: "The oven is very hot now." },
      { text: "Ha messo la torta nel *forno*.", translation: "She put the cake in the oven." }
    ],
    367: [
      { text: "Ci sediamo sul *divano* a guardare la TV.", translation: "We're sitting on the sofa watching TV." },
      { text: "Il *divano* è morbido e comodo.", translation: "The sofa is soft and comfortable." },
      { text: "Il gatto dorme sempre sul *divano*.", translation: "The cat always sleeps on the sofa." }
    ],
    368: [
      { text: "Il libro è sullo *scaffale*.", translation: "The book is on the shelf." },
      { text: "Ci serve uno *scaffale* nuovo per la cucina.", translation: "We need a new shelf for the kitchen." },
      { text: "Lo *scaffale* è pieno di libri.", translation: "The shelf is full of books." }
    ],
    369: [
      { text: "È corso su per le *scale*.", translation: "He ran up the stairs." },
      { text: "Le *scale* sono ripide e strette.", translation: "The stairs are steep and narrow." },
      { text: "Fai attenzione sulle *scale*.", translation: "Be careful on the stairs." }
    ],
    370: [
      { text: "Abbiamo preso l'*ascensore* fino al quinto piano.", translation: "We took the elevator up to the fifth floor." },
      { text: "L'*ascensore* era rotto oggi.", translation: "The elevator was broken today." },
      { text: "Ha paura di prendere l'*ascensore*.", translation: "He's afraid of taking the elevator." }
    ],
    371: [
      { text: "Abbiamo un *cane* che si chiama Rex.", translation: "We have a dog named Rex." },
      { text: "Il *cane* correva dietro alla palla.", translation: "The dog ran after the ball." },
      { text: "Porta fuori il *cane* ogni mattina.", translation: "He walks the dog every morning." }
    ],
    372: [
      { text: "Il *gatto* dorme tutto il giorno.", translation: "The cat sleeps all day." },
      { text: "Abbiamo adottato un *gatto* l'anno scorso.", translation: "We adopted a cat last year." },
      { text: "Il nostro *gatto* è bianco e nero.", translation: "Our cat is black and white." }
    ],
    373: [
      { text: "Ho sentito un *uccello* cantare fuori.", translation: "I heard a bird singing outside." },
      { text: "L'*uccello* è volato via velocemente.", translation: "The bird flew away quickly." },
      { text: "Abbiamo visto molti *uccelli* al parco.", translation: "We saw many birds in the park." }
    ],
    374: [
      { text: "Cavalca un *cavallo* ogni weekend.", translation: "She rides a horse every weekend." },
      { text: "Il *cavallo* correva veloce nel campo.", translation: "The horse ran fast across the field." },
      { text: "Abbiamo visto dei *cavalli* alla fattoria.", translation: "We saw horses at the farm." }
    ],
    375: [
      { text: "Il contadino ha molte *mucche*.", translation: "The farmer has many cows." },
      { text: "La *mucca* pascolava nel campo.", translation: "The cow grazed in the field." },
      { text: "Abbiamo visto delle *mucche* lungo la strada.", translation: "We saw cows along the road." }
    ],
    376: [
      { text: "Ci sono molte *pecore* in montagna.", translation: "There are many sheep in the mountains." },
      { text: "La *pecora* aveva la lana bianca.", translation: "The sheep had white wool." },
      { text: "Il contadino tosa le *pecore* in primavera.", translation: "The farmer shears the sheep in spring." }
    ],
    377: [
      { text: "Il contadino ha cinque *maiali*.", translation: "The farmer has five pigs." },
      { text: "Il *maiale* era rosa e sporco.", translation: "The pig was pink and dirty." },
      { text: "Abbiamo visto dei *maiali* durante la visita alla fattoria.", translation: "We saw pigs on the farm visit." }
    ],
    378: [
      { text: "La *gallina* faceva l'uovo ogni giorno.", translation: "The hen laid eggs every day." },
      { text: "Abbiamo cinque *galline* in giardino.", translation: "We have five hens in the garden." },
      { text: "Le *galline* correvano nel cortile.", translation: "The hens ran around the farmyard." }
    ],
    379: [
      { text: "C'è un *topo* in cucina.", translation: "There's a mouse in the kitchen." },
      { text: "Il gatto ha inseguito il *topo*.", translation: "The cat chased the mouse." },
      { text: "Abbiamo visto un piccolo *topo* passare.", translation: "We saw a small mouse run by." }
    ],
    380: [
      { text: "I bambini hanno un *coniglio* come animale domestico.", translation: "The children have a rabbit as a pet." },
      { text: "Il *coniglio* mangiava le carote.", translation: "The rabbit ate carrots." },
      { text: "Abbiamo visto un *coniglio* selvatico in giardino.", translation: "We saw a wild rabbit in the garden." }
    ],
    381: [
      { text: "Abbiamo piantato un *albero* in giardino.", translation: "We planted a tree in the garden." },
      { text: "L'*albero* è molto alto.", translation: "The tree is very tall." },
      { text: "Gli uccelli hanno costruito un nido sull'*albero*.", translation: "The birds built a nest in the tree." }
    ],
    382: [
      { text: "Mi ha regalato un *fiore*.", translation: "She gave me a flower." },
      { text: "I *fiori* nel giardino sono bellissimi.", translation: "The flowers in the garden are beautiful." },
      { text: "Abbiamo piantato nuovi *fiori* in primavera.", translation: "We planted new flowers in spring." }
    ],
    383: [
      { text: "L'*erba* è verde d'estate.", translation: "The grass is green in summer." },
      { text: "I bambini giocano sull'*erba*.", translation: "The children are playing on the grass." },
      { text: "Tagliamo l'*erba* ogni settimana.", translation: "We mow the grass every week." }
    ],
    384: [
      { text: "Ieri siamo saliti sulla *montagna*.", translation: "We climbed the mountain yesterday." },
      { text: "La *montagna* era coperta di neve.", translation: "The mountain was covered in snow." },
      { text: "La vista dalla *montagna* era fantastica.", translation: "The view from the mountain was fantastic." }
    ],
    385: [
      { text: "Il *fiume* attraversa la città.", translation: "The river runs through the city." },
      { text: "Abbiamo pescato nel *fiume* ieri.", translation: "We fished in the river yesterday." },
      { text: "I bambini nuotavano nel *fiume*.", translation: "The children swam in the river." }
    ],
    386: [
      { text: "Viviamo vicino al *mare*.", translation: "We live near the sea." },
      { text: "Il *mare* era calmo oggi.", translation: "The sea was calm today." },
      { text: "Hanno navigato attraverso il *mare*.", translation: "They sailed across the sea." }
    ],
    387: [
      { text: "Nuotiamo nel *lago* d'estate.", translation: "We swim in the lake in summer." },
      { text: "Il *lago* era immobile e limpido.", translation: "The lake was calm and clear." },
      { text: "La baita si trova vicino a un piccolo *lago*.", translation: "The cabin is by a small lake." }
    ],
    388: [
      { text: "Abbiamo fatto una passeggiata nella *foresta*.", translation: "We went for a walk in the forest." },
      { text: "La *foresta* era piena di alberi e uccelli.", translation: "The forest was full of trees and birds." },
      { text: "I bambini hanno raccolto funghi nella *foresta*.", translation: "The children picked mushrooms in the forest." }
    ],
    389: [
      { text: "Abbiamo trascorso tutto il giorno in *spiaggia*.", translation: "We spent the whole day at the beach." },
      { text: "La *spiaggia* era piena di gente.", translation: "The beach was full of people." },
      { text: "I bambini hanno costruito castelli di sabbia in *spiaggia*.", translation: "The children built sandcastles on the beach." }
    ],
    390: [
      { text: "Il *cielo* è blu oggi.", translation: "The sky is blue today." },
      { text: "Abbiamo visto le stelle nel *cielo*.", translation: "We saw the stars in the sky." },
      { text: "Il *cielo* è diventato rosso al tramonto.", translation: "The sky turned red at sunset." }
    ],
    391: [
      { text: "Ha *trenta* anni.", translation: "She's thirty years old." },
      { text: "Abbiamo aspettato *trenta* minuti.", translation: "We waited thirty minutes." },
      { text: "Aprile ha *trenta* giorni.", translation: "April has thirty days." }
    ],
    392: [
      { text: "Ha *quaranta* anni.", translation: "He's forty years old." },
      { text: "Abbiamo guidato per *quaranta* minuti.", translation: "We drove for forty minutes." },
      { text: "Il biglietto costava *quaranta* euro.", translation: "The ticket cost forty euros." }
    ],
    393: [
      { text: "La nonna ha *cinquanta* anni.", translation: "Grandmother is fifty years old." },
      { text: "Abbiamo aspettato *cinquanta* minuti l'aereo.", translation: "We waited fifty minutes for the plane." },
      { text: "C'erano *cinquanta* invitati al matrimonio.", translation: "There were fifty guests at the wedding." }
    ],
    394: [
      { text: "Sono passati *cento* anni da quando la casa fu costruita.", translation: "It's a hundred years since the house was built." },
      { text: "Abbiamo pagato *cento* euro per il biglietto.", translation: "We paid a hundred euros for the ticket." },
      { text: "C'erano *cento* persone al concerto.", translation: "There were a hundred people at the concert." }
    ],
    395: [
      { text: "La città ha più di *mille* abitanti.", translation: "The town has over a thousand inhabitants." },
      { text: "Abbiamo pagato *mille* euro per il viaggio.", translation: "We paid a thousand euros for the trip." },
      { text: "C'erano *mille* stelle nel cielo.", translation: "There were a thousand stars in the sky." }
    ],
    396: [
      { text: "Il cielo è *grigio* oggi.", translation: "The sky is grey today." },
      { text: "Ha una macchina *grigia*.", translation: "He has a grey car." },
      { text: "Il suo gatto è *grigio* e bianco.", translation: "Her cat is grey and white." }
    ],
    397: [
      { text: "Questo è il mio *primo* giorno di lavoro.", translation: "This is my first day at work." },
      { text: "Viviamo al *primo* piano.", translation: "We live on the first floor." },
      { text: "È arrivata *prima* nella gara.", translation: "She came first in the race." }
    ],
    398: [
      { text: "Questo è l'*ultimo* giorno di vacanza.", translation: "This is the last day of the holiday." },
      { text: "È stato l'*ultimo* ad andarsene.", translation: "He was the last one to leave." },
      { text: "Era l'*ultima* mela nel cestino.", translation: "It was the last apple in the basket." }
    ],
    399: [
      { text: "Abbiamo diviso la torta in due *metà*.", translation: "We divided the cake into two halves." },
      { text: "Ho mangiato solo *metà* della mela.", translation: "I only ate half of the apple." },
      { text: "La seconda *metà* del film era migliore.", translation: "The second half of the movie was better." }
    ],
    400: [
      { text: "Qual è il tuo *numero*?", translation: "What's your number?" },
      { text: "Viviamo al *numero* dieci.", translation: "We live at number ten." },
      { text: "Puoi darmi il suo *numero*?", translation: "Can you give me her number?" }
    ],
    401: [
      { text: "Sono *spaventato* dai ragni.", translation: "I'm afraid of spiders." },
      { text: "Si è *spaventata* per il fulmine.", translation: "She got scared by the lightning." },
      { text: "Non essere *spaventato*, andrà tutto bene.", translation: "Don't be afraid, everything's fine." }
    ],
    402: [
      { text: "Sono stato molto *sorpreso* dal regalo.", translation: "I was very surprised by the gift." },
      { text: "Sembrava *sorpresa*.", translation: "She looked surprised." },
      { text: "Siamo stati *sorpresi* dal risultato.", translation: "We were surprised by the result." }
    ],
    403: [
      { text: "Sono *annoiato* da questo gioco.", translation: "I'm bored of this game." },
      { text: "I bambini si sono *annoiati* dopo un'ora.", translation: "The children got bored after an hour." },
      { text: "Sembrava *annoiata* in classe.", translation: "She looked bored in class." }
    ],
    404: [
      { text: "È sempre *calma* nelle situazioni difficili.", translation: "She's always calm in difficult situations." },
      { text: "Il mare era *calmo* oggi.", translation: "The sea was calm today." },
      { text: "Abbiamo passato una serata *calma* a casa.", translation: "We had a calm evening at home." }
    ],
    405: [
      { text: "Sono molto *fiero* di te.", translation: "I'm very proud of you." },
      { text: "Era *fiero* del suo successo.", translation: "He was proud of his achievement." },
      { text: "I genitori erano *fieri* dei loro figli.", translation: "The parents were proud of their children." }
    ],
    406: [
      { text: "È molto *forte*.", translation: "He's very strong." },
      { text: "Il caffè era troppo *forte* per me.", translation: "The coffee was too strong for me." },
      { text: "Ha braccia *forti*.", translation: "She has strong arms." }
    ],
    407: [
      { text: "Si sentiva *debole* dopo la malattia.", translation: "He felt weak after the illness." },
      { text: "Il segnale è *debole* qui.", translation: "The signal is weak here." },
      { text: "Il tè era un po' *debole*.", translation: "The tea was a bit weak." }
    ],
    408: [
      { text: "La vista era *stupenda*.", translation: "The view was beautiful." },
      { text: "Ha un sorriso *stupendo*.", translation: "She has a beautiful smile." },
      { text: "I fiori nel giardino sono *stupendi*.", translation: "The flowers in the garden are beautiful." }
    ],
    409: [
      { text: "Quell'edificio è piuttosto *brutto*.", translation: "That building is quite ugly." },
      { text: "Aveva una *brutta* ferita al braccio.", translation: "He had an ugly wound on his arm." },
      { text: "Il tempo era *brutto* ieri.", translation: "The weather was ugly yesterday." }
    ],
    410: [
      { text: "È ancora molto *giovane*.", translation: "She's still very young." },
      { text: "Era *giovane* quando è andato via di casa.", translation: "He was young when he moved out." },
      { text: "Ai *giovani* piace viaggiare molto.", translation: "Young people like to travel a lot." }
    ],
    411: [
      { text: "La sua famiglia è molto *ricca*.", translation: "His family is very rich." },
      { text: "È diventato *ricco* vendendo la casa.", translation: "He became rich from selling the house." },
      { text: "Il paese è *ricco* di risorse naturali.", translation: "The country is rich in natural resources." }
    ],
    412: [
      { text: "Molte persone lì sono *povere*.", translation: "Many people there are poor." },
      { text: "La famiglia era *povera*, ma felice.", translation: "The family was poor but happy." },
      { text: "È cresciuto in un quartiere *povero*.", translation: "He grew up in a poor neighborhood." }
    ],
    413: [
      { text: "La cucina adesso è tutta *pulita*.", translation: "The kitchen is completely clean now." },
      { text: "L'acqua del lago è *pulita*.", translation: "The water in the lake is clean." },
      { text: "Le piace una casa *pulita*.", translation: "She likes a clean home." }
    ],
    414: [
      { text: "Le mie scarpe sono molto *sporche*.", translation: "My shoes are very dirty." },
      { text: "Il pavimento era *sporco* dopo la festa.", translation: "The floor was dirty after the party." },
      { text: "Aveva le mani *sporche* per il giardinaggio.", translation: "He had dirty hands from gardening." }
    ],
    415: [
      { text: "Il film era molto *divertente*.", translation: "The movie was very funny." },
      { text: "Racconta sempre storie *divertenti*.", translation: "He always tells funny stories." },
      { text: "Era un gioco *divertente*.", translation: "It was a funny game." }
    ],
    416: [
      { text: "La *via* era piena di macchine.", translation: "The road was full of cars." },
      { text: "Abbiamo guidato su una *via* stretta.", translation: "We drove on a narrow road." },
      { text: "Quale *via* dobbiamo prendere?", translation: "Which road should we take?" }
    ],
    417: [
      { text: "Abbiamo attraversato il *ponte* per andare in città.", translation: "We drove over the bridge to the city." },
      { text: "Il *ponte* è molto vecchio.", translation: "The bridge is very old." },
      { text: "C'è una bella vista dal *ponte*.", translation: "There's a nice view from the bridge." }
    ],
    418: [
      { text: "Abbiamo preso un *taxi* per l'aeroporto.", translation: "We took a taxi to the airport." },
      { text: "Il *taxi* è arrivato velocemente.", translation: "The taxi arrived quickly." },
      { text: "Puoi chiamare un *taxi*?", translation: "Can you call for a taxi?" }
    ],
    419: [
      { text: "Il mio *bagaglio* si è perso in aeroporto.", translation: "My luggage got lost at the airport." },
      { text: "Abbiamo fatto il *bagaglio* la sera prima.", translation: "We packed the luggage the evening before." },
      { text: "Il *bagaglio* era troppo pesante.", translation: "The luggage was too heavy." }
    ],
    420: [
      { text: "Ricordati di portare il *passaporto*.", translation: "Remember to bring your passport." },
      { text: "Ho perso il *passaporto* l'anno scorso.", translation: "I lost my passport last year." },
      { text: "Il mio *passaporto* scade il prossimo anno.", translation: "My passport expires next year." }
    ],
    421: [
      { text: "Il *volo* era lungo e faticoso.", translation: "The flight was long and tiring." },
      { text: "Abbiamo prenotato un *volo* per Roma.", translation: "We booked a flight to Rome." },
      { text: "Il *volo* ha avuto ritardo per il maltempo.", translation: "The flight was delayed because of the weather." }
    ],
    422: [
      { text: "Questo *posto* è libero?", translation: "Is this seat free?" },
      { text: "Ero seduto in un *posto* vicino al finestrino.", translation: "I sat in a seat by the window." },
      { text: "I *posti* sull'aereo erano stretti.", translation: "The seats on the plane were cramped." }
    ],
    423: [
      { text: "L'*autista* guidava con molta prudenza.", translation: "The driver drove very carefully." },
      { text: "Lavora come *autista* per un'azienda.", translation: "He works as a driver for a company." },
      { text: "Abbiamo ringraziato l'*autista* quando siamo scesi.", translation: "We thanked the driver when we got off." }
    ],
    424: [
      { text: "Stamattina c'era molto *traffico*.", translation: "There was a lot of traffic this morning." },
      { text: "Il *traffico* era completamente fermo.", translation: "The traffic was completely still." },
      { text: "Siamo arrivati tardi a causa del *traffico*.", translation: "We were late because of the traffic." }
    ],
    425: [
      { text: "Il *viaggio* in Germania è durato dieci ore.", translation: "The journey to Germany took ten hours." },
      { text: "Stiamo pianificando un lungo *viaggio* l'anno prossimo.", translation: "We're planning a long journey next year." },
      { text: "Il *viaggio* è stato pieno di avventure.", translation: "The journey was full of adventures." }
    ],
    426: [
      { text: "Posso prendere in prestito la tua *penna*?", translation: "Can I borrow your pen?" },
      { text: "La mia *penna* ha smesso di scrivere.", translation: "My pen stopped writing." },
      { text: "Ha scritto la lettera con una *penna* blu.", translation: "She wrote the letter with a blue pen." }
    ],
    427: [
      { text: "Disegno sempre con la *matita*.", translation: "I always draw with a pencil." },
      { text: "La mia *matita* deve essere temperata.", translation: "My pencil needs sharpening." },
      { text: "Posso prendere in prestito una *matita*?", translation: "Can I borrow a pencil?" }
    ],
    428: [
      { text: "Puoi darmi un foglio di *carta*?", translation: "Can you give me a piece of paper?" },
      { text: "La *carta* era piena di appunti.", translation: "The paper was full of notes." },
      { text: "Ci serve più *carta* per la stampante.", translation: "We need more paper for the printer." }
    ],
    429: [
      { text: "Scrivo sempre nel mio *quaderno*.", translation: "I always write in my notebook." },
      { text: "Il *quaderno* era pieno di disegni.", translation: "The notebook was full of drawings." },
      { text: "Ha comprato un *quaderno* nuovo per la scuola.", translation: "She bought a new notebook for school." }
    ],
    430: [
      { text: "Il libro è sulla *scrivania*.", translation: "The book is on the desk." },
      { text: "La mia *scrivania* è sempre disordinata.", translation: "My desk is always messy." },
      { text: "Abbiamo comprato una *scrivania* nuova per l'ufficio.", translation: "We bought a new desk for the office." }
    ],
    431: [
      { text: "Abbiamo una *riunione* alle dieci.", translation: "We have a meeting at ten." },
      { text: "La *riunione* è durata due ore.", translation: "The meeting lasted two hours." },
      { text: "Si è preparata per la *riunione* ieri sera.", translation: "She prepared for the meeting last night." }
    ],
    432: [
      { text: "Ti ho mandato un'*email* ieri.", translation: "I sent you an email yesterday." },
      { text: "Hai controllato la tua *email* oggi?", translation: "Have you checked your email today?" },
      { text: "Comunichiamo soprattutto via *email*.", translation: "We communicate mostly via email." }
    ],
    433: [
      { text: "Il mio *capo* è molto gentile.", translation: "My boss is very nice." },
      { text: "Il *capo* ci ha dato la giornata libera oggi.", translation: "The boss gave us the day off." },
      { text: "È diventata *capo* del reparto l'anno scorso.", translation: "She became boss of the department last year." }
    ],
    434: [
      { text: "Ricevo lo *stipendio* ogni mese.", translation: "I get paid a salary every month." },
      { text: "Il suo *stipendio* è aumentato quest'anno.", translation: "His salary increased this year." },
      { text: "Abbiamo discusso il mio *stipendio* con il capo.", translation: "We discussed my salary with the boss." }
    ],
    435: [
      { text: "Lavora in una grande *azienda*.", translation: "He works at a big company." },
      { text: "L'*azienda* ha assunto dieci nuove persone.", translation: "The company hired ten new people." },
      { text: "Abbiamo aperto un'*azienda* nostra l'anno scorso.", translation: "We started our own company last year." }
    ],
    436: [
      { text: "Si è rotta il *braccio* ieri.", translation: "She broke her arm yesterday." },
      { text: "Teneva il bambino tra le *braccia*.", translation: "He held the child in his arms." },
      { text: "Ho dolore al *braccio*.", translation: "My arm hurts." }
    ],
    437: [
      { text: "Si è fatto male alla *gamba* giocando a calcio.", translation: "He injured his leg in football." },
      { text: "Il cane ha quattro *gambe*.", translation: "The dog has four legs." },
      { text: "Ho dolore alla *gamba* dopo la corsa.", translation: "My leg hurts after the run." }
    ],
    438: [
      { text: "Si è tagliata il *dito*.", translation: "She cut her finger." },
      { text: "Ha indicato la casa con il *dito*.", translation: "He pointed with his finger at the house." },
      { text: "L'anello va bene su questo *dito*.", translation: "The ring fits on this finger." }
    ],
    439: [
      { text: "Ho mal di *schiena* oggi.", translation: "My back hurts today." },
      { text: "Portava lo zaino sulla *schiena*.", translation: "He carried the backpack on his back." },
      { text: "È sdraiata sulla *schiena* a riposare.", translation: "She's lying on her back resting." }
    ],
    440: [
      { text: "Il suo *cuore* batteva forte.", translation: "Her heart beat fast." },
      { text: "Ha un buon *cuore*.", translation: "He has a good heart." },
      { text: "Il medico ha ascoltato il mio *cuore*.", translation: "The doctor listened to my heart." }
    ],
    441: [
      { text: "Mettiti il *cappotto*, fa freddo fuori.", translation: "Put on your coat, it's cold outside." },
      { text: "Il suo *cappotto* era lungo e nero.", translation: "Her coat was long and black." },
      { text: "Ho comprato un *cappotto* nuovo per l'inverno.", translation: "I bought a new coat for winter." }
    ],
    442: [
      { text: "Indossa una bella *gonna*.", translation: "She's wearing a nice skirt." },
      { text: "La *gonna* era rossa e corta.", translation: "The skirt was red and short." },
      { text: "Ho comprato una *gonna* nuova ieri.", translation: "I bought a new skirt yesterday." }
    ],
    443: [
      { text: "Trovo solo un *calzino*.", translation: "I can only find one sock." },
      { text: "I miei *calzini* sono tutti diversi.", translation: "My socks are all different." },
      { text: "Ha perso un *calzino* in lavatrice.", translation: "He lost a sock in the washing machine." }
    ],
    444: [
      { text: "Mettiti i *guanti*, fa freddo.", translation: "Put on your gloves, it's cold." },
      { text: "Ho perso un *guanto* ieri.", translation: "I lost a glove yesterday." },
      { text: "I suoi *guanti* erano di lana.", translation: "Her gloves were made of wool." }
    ],
    445: [
      { text: "Indossava una *sciarpa* calda.", translation: "She wore a warm scarf." },
      { text: "La *sciarpa* era blu e morbida.", translation: "The scarf was blue and soft." },
      { text: "Ho ricevuto una *sciarpa* in regalo a Natale.", translation: "I got a scarf as a gift for Christmas." }
    ],
    446: [
      { text: "Devo prendere la mia *medicina* ogni giorno.", translation: "I have to take my medicine every day." },
      { text: "La *medicina* ha aiutato con il mal di testa.", translation: "The medicine helped with the headache." },
      { text: "Il medico mi ha prescritto la *medicina*.", translation: "The doctor prescribed medicine for me." }
    ],
    447: [
      { text: "Il bambino ha la *febbre* alta oggi.", translation: "The child has a high fever today." },
      { text: "La *febbre* è scesa dopo la medicina.", translation: "The fever went down after the medicine." },
      { text: "È rimasta a casa per la *febbre*.", translation: "She stayed home because of a fever." }
    ],
    448: [
      { text: "Sento *dolore* alla schiena.", translation: "I feel pain in my back." },
      { text: "Il *dolore* è scomparso dopo il riposo.", translation: "The pain disappeared after rest." },
      { text: "Aveva forti *dolori* alla pancia.", translation: "She had strong pain in her stomach." }
    ],
    449: [
      { text: "Ha la *tosse* da una settimana.", translation: "He has had a cough for a week." },
      { text: "La sua *tosse* è peggiorata durante la notte.", translation: "Her cough got worse at night." },
      { text: "Ho preso la medicina per la *tosse*.", translation: "I took medicine for the cough." }
    ],
    450: [
      { text: "Il medico ha preso un campione del mio *sangue*.", translation: "The doctor took a sample of my blood." },
      { text: "Il *sangue* usciva dalla ferita.", translation: "The blood flowed from the cut." },
      { text: "Ha donato il *sangue* ieri.", translation: "He donated blood yesterday." }
    ],
    451: [
      { text: "Pago sempre in *contanti*.", translation: "I always pay with cash." },
      { text: "Hai dei *contanti* con te?", translation: "Do you have cash on you?" },
      { text: "Il negozio non accetta più *contanti*.", translation: "The shop no longer accepts cash." }
    ],
    452: [
      { text: "Ho pagato con la *carta di credito*.", translation: "I paid with credit card." },
      { text: "La mia *carta di credito* è stata rifiutata.", translation: "My credit card was declined." },
      { text: "Posso usare la *carta di credito* qui?", translation: "Can I use a credit card here?" }
    ],
    453: [
      { text: "Abbiamo avuto uno *sconto* sull'hotel.", translation: "We got a discount on the hotel." },
      { text: "Lo *sconto* era del venti per cento.", translation: "The discount was twenty percent." },
      { text: "Il negozio dava uno *sconto* agli studenti.", translation: "The shop gave a discount to students." }
    ],
    454: [
      { text: "È un *cliente* fedele.", translation: "He's a loyal customer." },
      { text: "Il *cliente* si è lamentato del prezzo.", translation: "The customer complained about the price." },
      { text: "Abbiamo molti nuovi *clienti* quest'anno.", translation: "We have many new customers this year." }
    ],
    455: [
      { text: "Mi ha fatto un bel *regalo*.", translation: "She gave me a nice gift." },
      { text: "Il *regalo* era avvolto in carta rossa.", translation: "The gift was wrapped in red paper." },
      { text: "Abbiamo comprato un *regalo* per il suo compleanno.", translation: "We bought a gift for his birthday." }
    ],
    456: [
      { text: "Amo ascoltare la *musica*.", translation: "I love listening to music." },
      { text: "La *musica* alla festa era fantastica.", translation: "The music at the party was fantastic." },
      { text: "Suona *musica* classica.", translation: "She plays classical music." }
    ],
    457: [
      { text: "Questa *canzone* è la mia preferita.", translation: "This song is my favorite." },
      { text: "Abbiamo cantato insieme una vecchia *canzone*.", translation: "We sang an old song together." },
      { text: "La *canzone* parla d'amore.", translation: "The song is about love." }
    ],
    458: [
      { text: "Ieri abbiamo visto un *film* emozionante.", translation: "We watched an exciting film yesterday." },
      { text: "Il *film* è durato due ore.", translation: "The film lasted two hours." },
      { text: "Quale *film* vuoi vedere stasera?", translation: "Which film do you want to watch tonight?" }
    ],
    459: [
      { text: "I bambini fanno un *gioco* divertente.", translation: "The children are playing a fun game." },
      { text: "Il *gioco* è durato tutta la sera.", translation: "The game lasted all evening." },
      { text: "Abbiamo comprato un *gioco* nuovo per il suo compleanno.", translation: "We bought a new game for his birthday." }
    ],
    460: [
      { text: "Facciamo una *festa* sabato.", translation: "We're having a party on Saturday." },
      { text: "La *festa* è stata molto bella.", translation: "The party was very nice." },
      { text: "Ha invitato tutti i suoi amici alla *festa*.", translation: "She invited all her friends to the party." }
    ],
    461: [
      { text: "Gioca a *calcio* ogni weekend.", translation: "He plays football every weekend." },
      { text: "Il *calcio* è lo sport più popolare qui.", translation: "Football is the most popular sport here." },
      { text: "Il ragazzo sogna di diventare un professionista nel *calcio*.", translation: "The boy dreams of becoming a professional in football." }
    ],
    462: [
      { text: "Giochiamo a *tennis* ogni martedì.", translation: "We play tennis every Tuesday." },
      { text: "È molto brava a *tennis*.", translation: "She's very good at tennis." },
      { text: "Ha imparato a giocare a *tennis* da bambino.", translation: "He learned tennis as a child." }
    ],
    463: [
      { text: "Gli piacciono tutti gli *sport*.", translation: "He likes all kinds of sport." },
      { text: "Lo *sport* è importante per la salute.", translation: "Sport is important for health." },
      { text: "Quale *sport* pratichi?", translation: "What sport do you do?" }
    ],
    464: [
      { text: "La nostra *squadra* ha vinto la partita ieri.", translation: "Our team won the match yesterday." },
      { text: "Gioca per una *squadra* locale.", translation: "She plays for a local team." },
      { text: "La *squadra* si allenava ogni giorno prima del campionato.", translation: "The team trained every day before the championship." }
    ],
    465: [
      { text: "Il bambino ha lanciato la *palla* oltre lo steccato.", translation: "The child threw the ball over the fence." },
      { text: "Giocavamo con una *palla* rossa.", translation: "We played with a red ball." },
      { text: "La *palla* ha colpito la finestra.", translation: "The ball hit the window." }
    ],
    466: [
      { text: "Suona molto bene la *chitarra*.", translation: "He plays guitar very well." },
      { text: "La mia *chitarra* ha bisogno di corde nuove.", translation: "My guitar needs new strings." },
      { text: "Ha imparato a suonare la *chitarra* l'anno scorso.", translation: "She learned guitar last year." }
    ],
    467: [
      { text: "Suona il *pianoforte* ogni giorno.", translation: "She plays piano every day." },
      { text: "Il *pianoforte* è in soggiorno.", translation: "The piano is in the living room." },
      { text: "Si esercita al *pianoforte* dopo la scuola.", translation: "He practices piano after school." }
    ],
    468: [
      { text: "Puoi farci una *foto*?", translation: "Can you take a photo of us?" },
      { text: "La *foto* era molto bella.", translation: "The photo was very nice." },
      { text: "Abbiamo scattato molte *foto* durante il viaggio.", translation: "We took many photos on the trip." }
    ],
    469: [
      { text: "Il mio *hobby* è dipingere.", translation: "My hobby is painting." },
      { text: "Ha molti *hobby*.", translation: "He has many hobbies." },
      { text: "Qual è il tuo *hobby*?", translation: "What's your hobby?" }
    ],
    470: [
      { text: "Andiamo in *vacanza* quest'estate.", translation: "We're going on holiday this summer." },
      { text: "La *vacanza* è stata troppo breve.", translation: "The holiday was far too short." },
      { text: "Dove vai in *vacanza* quest'anno?", translation: "Where are you going on holiday this year?" }
    ],
    471: [
      { text: "Uso *internet* ogni giorno.", translation: "I use the internet every day." },
      { text: "*Internet* non funzionava ieri.", translation: "The internet was down yesterday." },
      { text: "Abbiamo controllato il prezzo su *internet*.", translation: "We checked the price on the internet." }
    ],
    472: [
      { text: "Questo *sito* è molto utile.", translation: "This website is very useful." },
      { text: "Abbiamo creato un nuovo *sito* per l'azienda.", translation: "We made a new website for the company." },
      { text: "Il *sito* era facile da usare.", translation: "The website was easy to use." }
    ],
    473: [
      { text: "Ho dimenticato la mia *password*.", translation: "I've forgotten my password." },
      { text: "La *password* deve avere almeno otto caratteri.", translation: "The password must have at least eight characters." },
      { text: "Non condividere la tua *password* con altri.", translation: "Don't share your password with others." }
    ],
    474: [
      { text: "Il mio *schermo* è incrinato.", translation: "My screen is cracked." },
      { text: "Abbiamo comprato uno *schermo* nuovo per il computer.", translation: "We bought a new screen for the computer." },
      { text: "Il testo sullo *schermo* era troppo piccolo.", translation: "The text on the screen was too small." }
    ],
    475: [
      { text: "La mia *tastiera* non funziona più bene.", translation: "My keyboard is stopping working." },
      { text: "Scriveva velocemente sulla *tastiera*.", translation: "He typed quickly on the keyboard." },
      { text: "Abbiamo comprato una *tastiera* nuova ieri.", translation: "We bought a new keyboard yesterday." }
    ],
    476: [
      { text: "Ho ricevuto un *messaggio* da lei oggi.", translation: "I got a message from her today." },
      { text: "Puoi mandarmi un *messaggio*?", translation: "Can you send me a message?" },
      { text: "Il *messaggio* era breve ma gentile.", translation: "The message was short but nice." }
    ],
    477: [
      { text: "Guardo le *notizie* ogni sera.", translation: "I watch the news every evening." },
      { text: "Le *notizie* di oggi erano tristi.", translation: "The news today was sad." },
      { text: "Hai sentito le *notizie*?", translation: "Have you heard the news?" }
    ],
    478: [
      { text: "La *televisione* è in soggiorno.", translation: "The television is in the living room." },
      { text: "La nostra *televisione* è piuttosto vecchia.", translation: "Our TV is quite old." },
      { text: "Puoi spegnere la *televisione*?", translation: "Can you turn off the TV?" }
    ],
    479: [
      { text: "Ascolto la *radio* in macchina.", translation: "I listen to the radio in the car." },
      { text: "La *radio* suonava musica tutto il giorno.", translation: "The radio played music all day." },
      { text: "Ha comprato una vecchia *radio* al mercatino.", translation: "He bought an old radio at the flea market." }
    ],
    480: [
      { text: "Ha comprato una *macchina fotografica* nuova l'anno scorso.", translation: "She bought a new camera last year." },
      { text: "La mia *macchina fotografica* fa belle foto.", translation: "My camera takes nice pictures." },
      { text: "Ha dimenticato la *macchina fotografica* a casa.", translation: "He forgot the camera at home." }
    ],
    481: [
      { text: "Mi piace *anche* il caffè.", translation: "I also like coffee." },
      { text: "Viene *anche* lei stasera.", translation: "She's also coming tonight." },
      { text: "Dobbiamo *anche* ricordarci di comprare il pane.", translation: "We also need to remember to buy bread." }
    ],
    482: [
      { text: "Ho *solo* cinque minuti.", translation: "I only have five minutes." },
      { text: "Costava *solo* cento euro.", translation: "It only cost a hundred euros." },
      { text: "Ha mangiato *solo* un po' di cibo.", translation: "She only ate a little of the food." }
    ],
    483: [
      { text: "Sono *molto* felice oggi.", translation: "I'm very happy today." },
      { text: "Faceva *molto* freddo ieri.", translation: "It was very cold yesterday." },
      { text: "È *molto* brava in matematica.", translation: "She's very good at math." }
    ],
    484: [
      { text: "*Forse* possiamo vederci domani.", translation: "Maybe we can meet tomorrow." },
      { text: "*Forse* viene alla festa.", translation: "She might come to the party." },
      { text: "*Forse* domani ci sarà il sole.", translation: "Maybe it'll be sunny tomorrow." }
    ],
    485: [
      { text: "Ho *già* mangiato.", translation: "I've already eaten." },
      { text: "Sei *già* pronto?", translation: "Are you already done?" },
      { text: "È *già* andata a casa.", translation: "She has already gone home." }
    ],
    486: [
      { text: "Iniziamo l'anno nuovo a *gennaio*.", translation: "We start the new year in January." },
      { text: "Fa freddo a *gennaio*.", translation: "It's cold in January." },
      { text: "Il mio compleanno è a *gennaio*.", translation: "My birthday is in January." }
    ],
    487: [
      { text: "*Febbraio* è il mese più corto.", translation: "February is the shortest month." },
      { text: "Andiamo in montagna a *febbraio*.", translation: "We're going to the mountains in February." },
      { text: "La scuola ha le vacanze invernali a *febbraio*.", translation: "School has winter break in February." }
    ],
    488: [
      { text: "La primavera inizia a *marzo*.", translation: "Spring begins in March." },
      { text: "È nata a *marzo*.", translation: "She was born in March." },
      { text: "Pianifichiamo un viaggio a *marzo*.", translation: "We're planning a trip in March." }
    ],
    489: [
      { text: "Piove molto ad *aprile*.", translation: "It rains a lot in April." },
      { text: "Pasqua è spesso ad *aprile*.", translation: "Easter is often in April." },
      { text: "Festeggiamo il suo compleanno ad *aprile*.", translation: "We celebrate his birthday in April." }
    ],
    490: [
      { text: "*Maggio* è uno dei mesi più belli.", translation: "May is one of the nicest months." },
      { text: "I fiori sbocciano a *maggio*.", translation: "The flowers bloom in May." },
      { text: "Ci sposiamo a *maggio*.", translation: "We're getting married in May." }
    ],
    491: [
      { text: "La scuola finisce a *giugno*.", translation: "School ends in June." },
      { text: "L'estate inizia a *giugno*.", translation: "Summer begins in June." },
      { text: "Festeggiamo la festa a *giugno*.", translation: "We celebrate the festival in June." }
    ],
    492: [
      { text: "*Luglio* è il mese più caldo.", translation: "July is the hottest month." },
      { text: "Andiamo in vacanza a *luglio*.", translation: "We're going on holiday in July." },
      { text: "Ha tutto *luglio* libero.", translation: "She has time off all of July." }
    ],
    493: [
      { text: "La scuola ricomincia ad *agosto*.", translation: "School starts again in August." },
      { text: "Fa ancora caldo ad *agosto*.", translation: "It's still hot in August." },
      { text: "Festeggiamo il festival ad *agosto*.", translation: "We celebrate the festival in August." }
    ],
    494: [
      { text: "L'autunno inizia a *settembre*.", translation: "Autumn begins in September." },
      { text: "Ci siamo trasferiti qui a *settembre*.", translation: "We moved here in September." },
      { text: "Le foglie iniziano a cadere a *settembre*.", translation: "The leaves start to fall in September." }
    ],
    495: [
      { text: "Fa più freddo ad *ottobre*.", translation: "It gets colder in October." },
      { text: "Festeggiamo Halloween alla fine di *ottobre*.", translation: "We celebrate Halloween at the end of October." },
      { text: "È nata ad *ottobre*.", translation: "She was born in October." }
    ],
    496: [
      { text: "*Novembre* è spesso grigio e umido.", translation: "November is often grey and wet." },
      { text: "Accendiamo le candele a *novembre*.", translation: "We light candles in November." },
      { text: "A volte nevica a *novembre*.", translation: "It sometimes snows in November." }
    ],
    497: [
      { text: "Festeggiamo il Natale a *dicembre*.", translation: "We celebrate Christmas in December." },
      { text: "*Dicembre* è il mese più buio.", translation: "December is the darkest month." },
      { text: "La famiglia si riunisce a *dicembre*.", translation: "The family gathers in December." }
    ],
    498: [
      { text: "Che *data* è oggi?", translation: "What's the date today?" },
      { text: "Abbiamo fissato una *data* per la riunione.", translation: "We set a date for the meeting." },
      { text: "La *data* sul biglietto era sbagliata.", translation: "The date on the ticket was wrong." }
    ],
    499: [
      { text: "L'ho segnato sul mio *calendario*.", translation: "I wrote it in my calendar." },
      { text: "Il *calendario* è appeso al muro.", translation: "The calendar hangs on the wall." },
      { text: "Controlla il *calendario* per i giorni liberi.", translation: "Check the calendar for free days." }
    ],
    500: [
      { text: "Buon *compleanno*!", translation: "Happy birthday!" },
      { text: "Il mio *compleanno* è a maggio.", translation: "My birthday is in May." },
      { text: "Abbiamo festeggiato il suo *compleanno* con la torta.", translation: "We celebrated her birthday with cake." }
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
    ],
    6: [
      { text: "*Lo siento*, llego tarde.", translation: "Sorry, I'm late." },
      { text: "*Lo siento*, no escuché.", translation: "Sorry, I didn't hear." },
      { text: "Dijo *lo siento* por el error.", translation: "He said sorry for the mistake." }
    ],
    7: [
      { text: "Cada *mañana* bebo café.", translation: "Every morning I drink coffee." },
      { text: "La *mañana* estaba fría y tranquila.", translation: "The morning was cold and quiet." },
      { text: "Nos vemos esta *mañana*.", translation: "See you this morning." }
    ],
    8: [
      { text: "Por la *tarde* leo un libro.", translation: "In the evening I read a book." },
      { text: "Cenamos juntos por la *tarde*.", translation: "We eat dinner together in the evening." },
      { text: "La *tarde* fue agradable.", translation: "The evening was pleasant." }
    ],
    9: [
      { text: "Hoy es un buen *día*.", translation: "Today is a nice day." },
      { text: "Cada *día* doy un paseo.", translation: "Every day I take a walk." },
      { text: "El *día* fue largo y agotador.", translation: "The day was long and tiring." }
    ],
    10: [
      { text: "¡Buenas *noches*!", translation: "Good night!" },
      { text: "Duermo bien por la *noche*.", translation: "I sleep well at night." },
      { text: "La *noche* estaba llena de estrellas.", translation: "The night was full of stars." }
    ],
    11: [
      { text: "¿Puedo tener un vaso de *agua*?", translation: "Can I have a glass of water?" },
      { text: "El *agua* está fría y fresca.", translation: "The water is cold and fresh." },
      { text: "Bebe mucha *agua* cada día.", translation: "He drinks a lot of water every day." }
    ],
    12: [
      { text: "La *comida* estaba muy buena.", translation: "The food was very good." },
      { text: "La *comida* es importante para la salud.", translation: "Food is important for health." },
      { text: "Cocinó la *comida* ella misma.", translation: "She cooked the food herself." }
    ],
    13: [
      { text: "Bebo *café* cada mañana.", translation: "I drink coffee every morning." },
      { text: "Un *café*, por favor.", translation: "A coffee, please." },
      { text: "El *café* está caliente y fuerte.", translation: "The coffee is hot and strong." }
    ],
    14: [
      { text: "Compramos *pan* en la panadería.", translation: "We buy bread at the bakery." },
      { text: "El *pan* está fresco y blando.", translation: "The bread is fresh and soft." },
      { text: "Come *pan* en el desayuno.", translation: "He eats bread for breakfast." }
    ],
    15: [
      { text: "Viven en una *casa* grande.", translation: "They live in a big house." },
      { text: "Nuestra *casa* tiene tres pisos.", translation: "Our house has three floors." },
      { text: "La *casa* está cerca del mar.", translation: "The house is by the sea." }
    ],
    16: [
      { text: "Conduce un *coche* rojo.", translation: "He drives a red car." },
      { text: "El *coche* está aparcado afuera.", translation: "The car is parked outside." },
      { text: "Queremos comprar un *coche* nuevo.", translation: "We're going to buy a new car." }
    ],
    17: [
      { text: "Estoy leyendo un *libro* emocionante.", translation: "I'm reading an exciting book." },
      { text: "El *libro* está sobre la mesa.", translation: "The book is on the table." },
      { text: "Le gustan los *libros* de aventuras.", translation: "She likes books about adventures." }
    ],
    18: [
      { text: "Es mi mejor *amigo*.", translation: "He's my best friend." },
      { text: "Nos vemos con *amigos* el fin de semana.", translation: "We meet friends on the weekend." },
      { text: "Mi *amigo* vive al lado.", translation: "My friend lives next door." }
    ],
    19: [
      { text: "Mi *familia* es grande y agradable.", translation: "My family is big and nice." },
      { text: "Nos reunimos como *familia* cada Navidad.", translation: "We gather as a family every Christmas." },
      { text: "La *familia* cena junta.", translation: "The family eats dinner together." }
    ],
    20: [
      { text: "Voy a la *escuela* cada día.", translation: "I go to school every day." },
      { text: "La *escuela* está cerca de mi casa.", translation: "The school is near my house." },
      { text: "Trabaja en una *escuela*.", translation: "She works at a school." }
    ],
    21: [
      { text: "Un *hombre* pasó a nuestro lado.", translation: "A man walked past us." },
      { text: "El *hombre* de la ventana es amable.", translation: "The man by the window is nice." },
      { text: "Un *hombre* alto entró en la tienda.", translation: "A tall man entered the shop." }
    ],
    22: [
      { text: "Una *mujer* me llamó hoy.", translation: "A woman called me today." },
      { text: "La *mujer* era muy educada.", translation: "The woman was very polite." },
      { text: "La *mujer* que dirige la empresa es muy hábil.", translation: "The woman who runs the company is skilled." }
    ],
    23: [
      { text: "Ese *niño* es muy amable.", translation: "That child is very kind." },
      { text: "El *niño* juega en el jardín.", translation: "The child is playing in the garden." },
      { text: "Tenemos tres *niños* en casa.", translation: "We have three children at home." }
    ],
    24: [
      { text: "La *niña* tiene el pelo rojo.", translation: "The girl has red hair." },
      { text: "Una *niña* joven estaba sentada en el banco.", translation: "A young girl sat on the bench." },
      { text: "Mi *niña* tiene ocho años.", translation: "My daughter is eight years old." }
    ],
    25: [
      { text: "El *chico* juega al fútbol.", translation: "The boy plays football." },
      { text: "Un *chico* pequeño gritó fuerte.", translation: "A small boy shouted loudly." },
      { text: "A mi *chico* le gusta la música.", translation: "My boy likes music." }
    ],
    26: [
      { text: "Mi *madre* es profesora.", translation: "My mother is a teacher." },
      { text: "Mi *madre* cocina cada noche.", translation: "Mother cooks every evening." },
      { text: "Llamo a mi *madre* a menudo.", translation: "I call my mother often." }
    ],
    27: [
      { text: "Mi *padre* trabaja como ingeniero.", translation: "My father works as an engineer." },
      { text: "Mi *padre* nos lleva a la escuela.", translation: "Father drives us to school." },
      { text: "Estoy orgulloso de mi *padre*.", translation: "I'm proud of my father." }
    ],
    28: [
      { text: "Mi *hermana* es tres años más joven.", translation: "My sister is three years younger." },
      { text: "Mi *hermana* estudia medicina.", translation: "My sister studies medicine." },
      { text: "Mi *hermana* y yo amamos viajar.", translation: "My sister and I love to travel." }
    ],
    29: [
      { text: "Mi *hermano* es más alto que yo.", translation: "My brother is taller than me." },
      { text: "Mi *hermano* toca la guitarra.", translation: "My brother plays guitar." },
      { text: "Mi *hermano* y yo somos buenos amigos.", translation: "My brother and I are good friends." }
    ],
    30: [
      { text: "Mi *abuela* vive en el campo.", translation: "My grandmother lives in the countryside." },
      { text: "Mi *abuela* hace pasteles cada domingo.", translation: "My grandmother bakes cakes every Sunday." },
      { text: "Visito a mi *abuela* a menudo.", translation: "I often visit my grandmother." }
    ],
    31: [
      { text: "Una casa *grande* está en la colina.", translation: "A big house sits on the hill." },
      { text: "Tiene un perro *grande*.", translation: "He has a big dog." },
      { text: "La ciudad es muy *grande*.", translation: "The city is very big." }
    ],
    32: [
      { text: "Un niño *pequeño* juega en el parque.", translation: "A small child plays in the park." },
      { text: "Tiene un perro *pequeño*.", translation: "She has a small dog." },
      { text: "La habitación es bastante *pequeña*.", translation: "The room is quite small." }
    ],
    33: [
      { text: "Este es un *buen* libro.", translation: "This is a good book." },
      { text: "La comida está muy *buena*.", translation: "The food is very good." },
      { text: "El tiempo está *bueno* hoy.", translation: "The weather is good today." }
    ],
    34: [
      { text: "La película fue *mala* y aburrida.", translation: "The movie was bad and boring." },
      { text: "Tiene un *mal* hábito.", translation: "He has a bad habit." },
      { text: "El tiempo será *malo* mañana.", translation: "The weather will be bad tomorrow." }
    ],
    35: [
      { text: "Compré un teléfono *nuevo*.", translation: "I bought a new phone." },
      { text: "Este es un libro *nuevo* de la biblioteca.", translation: "This is a new book from the library." },
      { text: "Nos mudamos a una ciudad *nueva*.", translation: "We're moving to a new city." }
    ],
    36: [
      { text: "Un hombre *viejo* estaba sentado en el banco.", translation: "An old man sat on the bench." },
      { text: "La casa es *vieja* y bonita.", translation: "The house is old and beautiful." },
      { text: "Tiene un coche *viejo*.", translation: "She has an old car." }
    ],
    37: [
      { text: "El café *cálido* sabe bien en invierno.", translation: "Warm coffee tastes good in winter." },
      { text: "La habitación está *cálida*.", translation: "The room is warm." },
      { text: "Tuvimos un verano *cálido* el año pasado.", translation: "We had a warm summer last year." }
    ],
    38: [
      { text: "Un viento *frío* sopla hoy.", translation: "A cold wind is blowing today." },
      { text: "La leche *fría* es refrescante.", translation: "Cold milk is refreshing." },
      { text: "Hace *frío* afuera esta noche.", translation: "It's cold outside tonight." }
    ],
    39: [
      { text: "Conduce demasiado *rápido*.", translation: "He drives too fast." },
      { text: "Es una corredora *rápida*.", translation: "She's a fast runner." },
      { text: "El tren era muy *rápido*.", translation: "The train was very fast." }
    ],
    40: [
      { text: "*Lento* pero constante gana la carrera.", translation: "Slow and steady wins the race." },
      { text: "Caminaba *lento* por el parque.", translation: "He walked slowly through the park." },
      { text: "La música sonaba *lenta* y suave.", translation: "The music played slow and soft." }
    ],
    41: [
      { text: "*Yo* me llamo Carlos.", translation: "My name is Carlos." },
      { text: "*Yo* amo leer libros.", translation: "I like to read books." },
      { text: "*Yo* amo la música.", translation: "I love music." }
    ],
    42: [
      { text: "*Tú* eres un buen amigo.", translation: "You are a good friend." },
      { text: "¿Dónde vives *tú*?", translation: "Where do you live?" },
      { text: "¿*Tú* vienes esta noche?", translation: "Are you coming tonight?" }
    ],
    43: [
      { text: "*Él* es profesor en la escuela.", translation: "He is a teacher at the school." },
      { text: "*Él* juega al fútbol cada semana.", translation: "He plays football every week." },
      { text: "*Él* viene de Alemania.", translation: "He comes from Germany." }
    ],
    44: [
      { text: "*Ella* es una música talentosa.", translation: "She is a talented musician." },
      { text: "*Ella* trabaja como médica.", translation: "She works as a doctor." },
      { text: "*Ella* viene de España.", translation: "She comes from Spain." }
    ],
    45: [
      { text: "*Nosotros* vamos al cine esta noche.", translation: "We're going to the movies tonight." },
      { text: "*Nosotros* vivimos en la misma ciudad.", translation: "We live in the same city." },
      { text: "*Nosotros* viajaremos a España.", translation: "We're going to travel to Spain." }
    ],
    46: [
      { text: "¿A dónde vais *vosotros* esta noche?", translation: "Where are you all going tonight?" },
      { text: "*Vosotros* sois bienvenidos a la fiesta.", translation: "You're all welcome to the party." },
      { text: "¿Venís juntos *vosotros*?", translation: "Are you all coming together?" }
    ],
    47: [
      { text: "*Ellos* son personas muy amables.", translation: "They are very kind people." },
      { text: "*Ellos* vienen mañana.", translation: "They're coming tomorrow." },
      { text: "Me gustan mucho *ellos*.", translation: "I like them very much." }
    ],
    48: [
      { text: "Este es *mi* libro.", translation: "This is my book." },
      { text: "*Mi* amigo se llama Luis.", translation: "My friend's name is Luis." },
      { text: "Esta es *mi* casa.", translation: "This is my house." }
    ],
    49: [
      { text: "¿Es este *tu* teléfono?", translation: "Is this your phone?" },
      { text: "*Tu* familia es agradable.", translation: "Your family is nice." },
      { text: "Me gusta *tu* chaqueta nueva.", translation: "I like your new jacket." }
    ],
    50: [
      { text: "Esta es *nuestra* casa.", translation: "This is our house." },
      { text: "*Nuestra* escuela está cerca del centro.", translation: "Our school is near the center." },
      { text: "*Nuestra* familia es grande.", translation: "Our family is big." }
    ],
    51: [
      { text: "Quiero *ser* feliz.", translation: "I want to be happy." },
      { text: "Quiere *ser* médico algún día.", translation: "He wants to be a doctor someday." },
      { text: "Es bueno *ser* amable con todos.", translation: "It's good to be kind to everyone." }
    ],
    52: [
      { text: "Quisiera *tener* una taza de té.", translation: "I want to have a cup of tea." },
      { text: "No *tenemos* mucho tiempo.", translation: "We don't have much time." },
      { text: "Desea *tener* un perro.", translation: "She wishes to have a dog." }
    ],
    53: [
      { text: "*Voy* a la escuela cada día.", translation: "I go to school every day." },
      { text: "¿*Vamos* a dar un paseo?", translation: "Shall we go for a walk?" },
      { text: "*Va* a casa rápidamente.", translation: "She walks home quickly." }
    ],
    54: [
      { text: "*Vengo* pronto.", translation: "I'll come soon." },
      { text: "¿Puedes *venir* aquí?", translation: "Can you come here?" },
      { text: "*Viene* de Alemania.", translation: "He comes from Germany." }
    ],
    55: [
      { text: "¿Qué *haces* ahora?", translation: "What are you doing now?" },
      { text: "*Hago* lo mejor que puedo.", translation: "I'm doing my best." },
      { text: "Tenemos que *hacer* la tarea.", translation: "We have to do our homework." }
    ],
    56: [
      { text: "*Como* el desayuno a las ocho.", translation: "I eat breakfast at eight." },
      { text: "¿*Comemos* juntos esta noche?", translation: "Shall we eat together tonight?" },
      { text: "Nunca *come* carne.", translation: "She never eats meat." }
    ],
    57: [
      { text: "*Bebo* agua cada día.", translation: "I drink water every day." },
      { text: "¿Qué quieres *beber*?", translation: "What would you like to drink?" },
      { text: "*Bebe* café sin azúcar.", translation: "He drinks coffee without sugar." }
    ],
    58: [
      { text: "Estoy *leyendo* un libro emocionante.", translation: "I'm reading an exciting book." },
      { text: "¿Te gusta *leer*?", translation: "Do you like to read?" },
      { text: "*Lee* el periódico cada mañana.", translation: "She reads the newspaper every morning." }
    ],
    59: [
      { text: "Estoy *escribiendo* una carta a mi abuela.", translation: "I'm writing a letter to my grandmother." },
      { text: "¿Puedes *escribir* tu nombre aquí?", translation: "Can you write your name here?" },
      { text: "*Escribe* libros de historia.", translation: "He writes books about history." }
    ],
    60: [
      { text: "*Hablo* un poco de español.", translation: "I speak a little Spanish." },
      { text: "¿Puedes *hablar* más despacio?", translation: "Can you speak more slowly?" },
      { text: "*Habla* tres idiomas.", translation: "She speaks three languages." }
    ],
    61: [
      { text: "Tengo *un* gato.", translation: "I have a cat." },
      { text: "¿Puedo tener *un* café?", translation: "Can I have a coffee?" },
      { text: "Hay *un* hombre afuera.", translation: "There's a man outside." }
    ],
    62: [
      { text: "Compró *una* bolsa.", translation: "She bought a bag." },
      { text: "Vi *una* gata en la calle.", translation: "I saw a cat on the street." },
      { text: "En la granja vive *una* cabra.", translation: "A goat lives on the farm." }
    ],
    63: [
      { text: "Tengo *un* libro nuevo.", translation: "I have a new book." },
      { text: "¿Puedo tener *un* vaso de agua?", translation: "Can I have a glass of water?" },
      { text: "Compró *un* ordenador nuevo.", translation: "She bought a new computer." }
    ],
    64: [
      { text: "Llovió mucho ayer. *Eso* arruinó el picnic.", translation: "It rained a lot yesterday. That ruined the picnic." },
      { text: "El libro es interesante. *Eso* me sorprendió.", translation: "The book is interesting. That surprised me." },
      { text: "Perdió las llaves. *Eso* le preocupa.", translation: "He lost his keys. That worries him." }
    ],
    65: [
      { text: "La reunión terminó tarde. *Eso* nos molestó.", translation: "The meeting ended late. That annoyed us." },
      { text: "Ganó el partido. *Eso* la hizo feliz.", translation: "She won the game. That made her happy." },
      { text: "El tren llegó a tiempo. *Eso* fue una sorpresa.", translation: "The train arrived on time. That was a surprise." }
    ],
    66: [
      { text: "Vivo *aquí* ahora.", translation: "I live here now." },
      { text: "*Aquí* están tus llaves.", translation: "Here are your keys." },
      { text: "Espera *aquí*, por favor.", translation: "Wait here, please." }
    ],
    67: [
      { text: "El libro está *allí*.", translation: "The book is over there." },
      { text: "¿Quién está *allí*?", translation: "Who is there?" },
      { text: "Nos conocimos *allí* el año pasado.", translation: "We met there last year." }
    ],
    68: [
      { text: "Tengo que irme *ahora*.", translation: "I have to go now." },
      { text: "¿Qué haces *ahora*?", translation: "What are you doing now?" },
      { text: "*Ahora* es hora de comer.", translation: "Now it's time to eat." }
    ],
    69: [
      { text: "Hablamos *más tarde*.", translation: "We'll talk later." },
      { text: "Llego *más tarde* esta noche.", translation: "I'll come later tonight." },
      { text: "¿Podemos hacerlo *más tarde*?", translation: "Can we do it later?" }
    ],
    70: [
      { text: "Ella es *siempre* feliz.", translation: "She's always happy." },
      { text: "*Siempre* bebo café por la mañana.", translation: "I always drink coffee in the morning." },
      { text: "*Siempre* llega tarde.", translation: "He always comes late." }
    ],
    71: [
      { text: "¿Qué hacemos *hoy*?", translation: "What shall we do today?" },
      { text: "*Hoy* hace buen tiempo.", translation: "Today the weather is nice." },
      { text: "Tengo mucho que hacer *hoy*.", translation: "I have a lot to do today." }
    ],
    72: [
      { text: "¡Nos vemos *mañana*!", translation: "See you tomorrow!" },
      { text: "*Mañana* viajo a Madrid.", translation: "Tomorrow I'll travel to Madrid." },
      { text: "¿Qué pasa *mañana*?", translation: "What's happening tomorrow?" }
    ],
    73: [
      { text: "*Ayer* estuve en el trabajo.", translation: "Yesterday I was at work." },
      { text: "Vimos una película *ayer*.", translation: "We watched a movie yesterday." },
      { text: "Llovió mucho *ayer*.", translation: "It rained a lot yesterday." }
    ],
    74: [
      { text: "Trabajo cinco días a la *semana*.", translation: "I work five days a week." },
      { text: "La próxima *semana* viajamos.", translation: "Next week we're going to travel." },
      { text: "La *semana* ha sido agitada.", translation: "The week has been busy." }
    ],
    75: [
      { text: "Nos mudamos el próximo *mes*.", translation: "We're moving next month." },
      { text: "Cada *mes* pago el alquiler.", translation: "Every month I pay rent." },
      { text: "El *mes* pasó rápido.", translation: "The month went by quickly." }
    ],
    76: [
      { text: "Conducía un coche *rojo*.", translation: "He drove a red car." },
      { text: "La flor es *roja* y hermosa.", translation: "The flower is red and beautiful." },
      { text: "Me gusta el suéter *rojo*.", translation: "I like the red sweater." }
    ],
    77: [
      { text: "El cielo está *azul* hoy.", translation: "The sky is blue today." },
      { text: "Tiene ojos *azules*.", translation: "She has blue eyes." },
      { text: "Compré una chaqueta *azul*.", translation: "I bought a blue jacket." }
    ],
    78: [
      { text: "La hierba está *verde* en verano.", translation: "The grass is green in summer." },
      { text: "Tiene un coche *verde*.", translation: "He has a green car." },
      { text: "Me gusta la camisa *verde*.", translation: "I like the green shirt." }
    ],
    79: [
      { text: "El sol es *amarillo*.", translation: "The sun is yellow." },
      { text: "Tiene un vestido *amarillo*.", translation: "She has a yellow dress." },
      { text: "La casa *amarilla* es nuestra.", translation: "The yellow house is ours." }
    ],
    80: [
      { text: "El gato es completamente *negro*.", translation: "The cat is completely black." },
      { text: "Tiene un coche *negro*.", translation: "He has a black car." },
      { text: "Compré zapatos *negros*.", translation: "I bought black shoes." }
    ],
    81: [
      { text: "La nieve es *blanca* y fría.", translation: "The snow is white and cold." },
      { text: "Tiene una casa *blanca*.", translation: "She has a white house." },
      { text: "Lleva una camisa *blanca*.", translation: "He wears a white shirt." }
    ],
    82: [
      { text: "Mi perro es *marrón*.", translation: "My dog is brown." },
      { text: "Tiene ojos *marrones*.", translation: "She has brown eyes." },
      { text: "Compré una mesa *marrón*.", translation: "I bought a brown table." }
    ],
    83: [
      { text: "La niña tiene un vestido *rosa*.", translation: "The girl has a pink dress." },
      { text: "Las flores son *rosa*.", translation: "The flowers are pink." },
      { text: "Pintó la habitación de *rosa*.", translation: "She painted the room pink." }
    ],
    84: [
      { text: "La puesta de sol era *naranja*.", translation: "The sunset was orange." },
      { text: "Tiene una chaqueta *naranja*.", translation: "He has an orange jacket." },
      { text: "La naranja es *naranja*.", translation: "The orange is orange." }
    ],
    85: [
      { text: "La flor es *morada*.", translation: "The flower is purple." },
      { text: "Tiene un bolso *morado*.", translation: "She has a purple bag." },
      { text: "El cielo se puso *morado* por la noche.", translation: "The sky turned purple in the evening." }
    ],
    86: [
      { text: "Solo tengo *un* hermano.", translation: "I only have one brother." },
      { text: "¿Puedo tener *uno*?", translation: "Can I have one?" },
      { text: "Solo vino *uno* de los niños.", translation: "Only one of the children came." }
    ],
    87: [
      { text: "Tengo *dos* hermanos.", translation: "I have two siblings." },
      { text: "Son las *dos*.", translation: "It's two o'clock." },
      { text: "La casa tiene *dos* pisos.", translation: "The house has two floors." }
    ],
    88: [
      { text: "Tengo *tres* hijos.", translation: "I have three children." },
      { text: "Son las *tres*.", translation: "It's three o'clock." },
      { text: "Esperamos *tres* horas.", translation: "We waited for three hours." }
    ],
    89: [
      { text: "La mesa tiene *cuatro* sillas.", translation: "The table has four chairs." },
      { text: "Son las *cuatro*.", translation: "It's four o'clock." },
      { text: "Somos *cuatro* en la familia.", translation: "There are four of us in the family." }
    ],
    90: [
      { text: "Tengo *cinco* amigos aquí.", translation: "I have five friends here." },
      { text: "Son las *cinco*.", translation: "It's five o'clock." },
      { text: "La casa tiene *cinco* habitaciones.", translation: "The house has five rooms." }
    ],
    91: [
      { text: "Son las *seis*.", translation: "It's six o'clock." },
      { text: "Somos *seis* personas.", translation: "We are six people." },
      { text: "Duerme *seis* horas cada noche.", translation: "He sleeps six hours every night." }
    ],
    92: [
      { text: "Son las *siete*.", translation: "It's seven o'clock." },
      { text: "Tiene *siete* libros sobre la mesa.", translation: "She has seven books on the table." },
      { text: "Comió *siete* fresas.", translation: "He ate seven strawberries." }
    ],
    93: [
      { text: "Son las *ocho*.", translation: "It's eight o'clock." },
      { text: "Trabajo *ocho* horas al día.", translation: "I work eight hours a day." },
      { text: "Éramos *ocho* en la fiesta.", translation: "There were eight of us at the party." }
    ],
    94: [
      { text: "Son las *nueve*.", translation: "It's nine o'clock." },
      { text: "Tiene *nueve* años.", translation: "She's nine years old." },
      { text: "Esperamos *nueve* minutos.", translation: "We waited nine minutes." }
    ],
    95: [
      { text: "Son las *diez*.", translation: "It's ten o'clock." },
      { text: "Tiene *diez* dedos.", translation: "He has ten fingers." },
      { text: "Vivimos allí *diez* años.", translation: "We lived there for ten years." }
    ],
    96: [
      { text: "¿*Dónde* vives?", translation: "Where do you live?" },
      { text: "¿Sabes *dónde* está el libro?", translation: "Do you know where the book is?" },
      { text: "¿*Dónde* nos vemos?", translation: "Where shall we meet?" }
    ],
    97: [
      { text: "¿*Qué* es eso?", translation: "What is that?" },
      { text: "¿*Qué* estás haciendo?", translation: "What are you doing now?" },
      { text: "No sé *qué* decir.", translation: "I don't know what to say." }
    ],
    98: [
      { text: "¿*Quién* es?", translation: "Who is that?" },
      { text: "¿*Quién* viene esta noche?", translation: "Who's coming tonight?" },
      { text: "¿Sabes *quién* es ella?", translation: "Do you know who she is?" }
    ],
    99: [
      { text: "¿*Cuándo* vienes?", translation: "When are you coming?" },
      { text: "No sé *cuándo* sale el tren.", translation: "I don't know when the train leaves." },
      { text: "¿*Cuándo* es tu cumpleaños?", translation: "When is your birthday?" }
    ],
    100: [
      { text: "¿*Por qué* llegas tarde?", translation: "Why are you late?" },
      { text: "¿*Por qué* no te gusta el pescado?", translation: "Why don't you like fish?" },
      { text: "No sé *por qué* se fue.", translation: "I don't know why he left." }
    ],
    101: [
      { text: "¿*Cómo* estás?", translation: "How are you?" },
      { text: "¿*Cómo* se prepara este plato?", translation: "How do you make this dish?" },
      { text: "No sé *cómo* responder.", translation: "I don't know how to answer." }
    ],
    102: [
      { text: "¿*Cuál* libro estás leyendo?", translation: "Which book are you reading?" },
      { text: "¿*Cuál* día va mejor?", translation: "Which day suits best?" },
      { text: "¿Sabes *cuál* camino tomar?", translation: "Do you know which way to take?" }
    ],
    103: [
      { text: "¿*Cuánto* cuesta esto?", translation: "How much does this cost?" },
      { text: "¿*Cuánto* tiempo tenemos?", translation: "How much time do we have?" },
      { text: "No sé *cuánto* pesa.", translation: "I don't know how much it weighs." }
    ],
    104: [
      { text: "Estoy feliz *porque* es viernes.", translation: "I'm happy because it's Friday." },
      { text: "Llegó tarde *porque* el tren estaba retrasado.", translation: "She came late because the train was delayed." },
      { text: "Nos quedamos en casa *porque* llovía.", translation: "We stayed home because it rained." }
    ],
    105: [
      { text: "Quiero ir, *pero* estoy cansado.", translation: "I want to go, but I'm tired." },
      { text: "Es caro, *pero* vale la pena.", translation: "It's expensive, but worth it." },
      { text: "Llamó, *pero* no respondí.", translation: "She called, but I didn't answer." }
    ],
    106: [
      { text: "Me gusta el té *y* el café.", translation: "I like tea and coffee." },
      { text: "Es amable *y* inteligente.", translation: "He's nice and smart." },
      { text: "Compramos pan, leche *y* huevos.", translation: "We bought bread, milk and eggs." }
    ],
    107: [
      { text: "¿Quieres té *o* café?", translation: "Would you like tea or coffee?" },
      { text: "¿Vamos a pie *o* en coche?", translation: "Shall we walk or drive?" },
      { text: "¿Vienes hoy *o* mañana?", translation: "Are you coming today or tomorrow?" }
    ],
    108: [
      { text: "Bebo café *con* leche.", translation: "I drink coffee with milk." },
      { text: "Vive *con* su familia.", translation: "She lives with her family." },
      { text: "Habló *con* el profesor.", translation: "He spoke with the teacher." }
    ],
    109: [
      { text: "Bebo té *sin* azúcar.", translation: "I drink tea without sugar." },
      { text: "Se fue *sin* decir nada.", translation: "He left without saying anything." },
      { text: "Lo logramos *sin* ayuda.", translation: "We managed it without help." }
    ],
    110: [
      { text: "La carta es *de* mi hermana.", translation: "The letter is from my sister." },
      { text: "Viajamos *de* Madrid a Barcelona.", translation: "We travelled from Madrid to Barcelona." },
      { text: "El regalo es *de* parte de mi amigo.", translation: "The gift is from my friend." }
    ],
    111: [
      { text: "Voy *a* la escuela.", translation: "I'm going to school." },
      { text: "Le dio un regalo *a* ella.", translation: "She gave a gift to her." },
      { text: "Viajamos *a* Barcelona este verano.", translation: "We travelled to Barcelona this summer." }
    ],
    112: [
      { text: "El libro está *en* el cajón.", translation: "The book is in the drawer." },
      { text: "Vivo *en* España.", translation: "I live in Spain." },
      { text: "Está *en* el jardín.", translation: "He is in the garden." }
    ],
    113: [
      { text: "El libro está *sobre* la mesa.", translation: "The book is on the table." },
      { text: "El gato está sentado *sobre* la silla.", translation: "The cat is sitting on the chair." },
      { text: "Puso el jarrón *sobre* el estante.", translation: "She put the vase on the shelf." }
    ],
    114: [
      { text: "El gato duerme *debajo* de la mesa.", translation: "The cat is sleeping under the table." },
      { text: "Las llaves están *debajo* de la alfombra.", translation: "The keys are under the mat." },
      { text: "Nos sentamos *debajo* de un árbol.", translation: "We sat under a tree." }
    ],
    115: [
      { text: "La lámpara cuelga *encima* de la mesa.", translation: "The lamp hangs above the table." },
      { text: "El avión volaba *encima* de la montaña.", translation: "The plane flew over the mountain." },
      { text: "Vive *encima* de la tienda.", translation: "She lives above the shop." }
    ],
    116: [
      { text: "Madrid es una *ciudad* bonita.", translation: "Madrid is a nice city." },
      { text: "Vivimos en una *ciudad* pequeña.", translation: "We live in a small city." },
      { text: "La *ciudad* tiene muchos edificios antiguos.", translation: "The city has many old buildings." }
    ],
    117: [
      { text: "Vivimos en la misma *calle*.", translation: "We live on the same street." },
      { text: "La *calle* estaba llena de gente.", translation: "The street was full of people." },
      { text: "La tienda está en esta *calle*.", translation: "The shop is on this street." }
    ],
    118: [
      { text: "Voy a la *tienda* a comprar leche.", translation: "I'm going to the shop for milk." },
      { text: "La *tienda* abre a las nueve.", translation: "The shop opens at nine." },
      { text: "Hay una *tienda* nueva en el centro.", translation: "There's a new shop in the center." }
    ],
    119: [
      { text: "Compramos verduras en el *mercado*.", translation: "We buy vegetables at the market." },
      { text: "El *mercado* está abierto los sábados.", translation: "The market is open on Saturdays." },
      { text: "Había mucha gente en el *mercado*.", translation: "There were a lot of people at the market." }
    ],
    120: [
      { text: "Damos un paseo por el *parque*.", translation: "We're taking a walk in the park." },
      { text: "Los niños juegan en el *parque*.", translation: "The children are playing in the park." },
      { text: "Hay un *parque* grande cerca de casa.", translation: "There's a big park near the house." }
    ],
    121: [
      { text: "Esta *habitación* es muy luminosa.", translation: "This room is very bright." },
      { text: "La casa tiene cinco *habitaciones*.", translation: "The house has five rooms." },
      { text: "Estoy ordenando mi *habitación*.", translation: "I'm cleaning my room." }
    ],
    122: [
      { text: "Cocinamos en la *cocina*.", translation: "We cook in the kitchen." },
      { text: "La *cocina* es grande y luminosa.", translation: "The kitchen is big and bright." },
      { text: "Está sentada en la *cocina* tomando café.", translation: "She's sitting in the kitchen drinking coffee." }
    ],
    123: [
      { text: "El *baño* está al lado del dormitorio.", translation: "The bathroom is next to the bedroom." },
      { text: "Me ducho en el *baño* cada mañana.", translation: "I shower in the bathroom every morning." },
      { text: "La casa tiene dos *baños*.", translation: "The house has two bathrooms." }
    ],
    124: [
      { text: "Mi *dormitorio* es pequeño pero acogedor.", translation: "My bedroom is small but cozy." },
      { text: "Los niños duermen en el mismo *dormitorio*.", translation: "The children sleep in the same bedroom." },
      { text: "Pintamos el *dormitorio* de azul.", translation: "We painted the bedroom blue." }
    ],
    125: [
      { text: "Vemos la tele en la *sala*.", translation: "We watch TV in the living room." },
      { text: "La *sala* tiene un sofá grande.", translation: "The living room has a big sofa." },
      { text: "La familia se reúne en la *sala* por la noche.", translation: "The family gathers in the living room in the evening." }
    ],
    126: [
      { text: "Me gusta el *queso* en el pan.", translation: "I like cheese on bread." },
      { text: "Compramos *queso* español en el mercado.", translation: "We bought Spanish cheese at the market." },
      { text: "El *queso* sabe muy bien.", translation: "The cheese tastes very good." }
    ],
    127: [
      { text: "Como *huevos* en el desayuno.", translation: "I eat eggs for breakfast." },
      { text: "¿Puedes comprar *huevos* en la tienda?", translation: "Can you buy eggs at the shop?" },
      { text: "El *huevo* estaba cocinado a la perfección.", translation: "The egg was cooked just right." }
    ],
    128: [
      { text: "Comemos *pescado* cada viernes.", translation: "We eat fish every Friday." },
      { text: "El *pescado* estaba muy fresco.", translation: "The fish was very fresh." },
      { text: "Pescó un *pescado* grande en el mar.", translation: "He caught a big fish in the sea." }
    ],
    129: [
      { text: "Ella no come *carne*.", translation: "She doesn't eat meat." },
      { text: "Asamos *carne* en el jardín.", translation: "We grilled meat in the garden." },
      { text: "La *carne* estaba tierna y buena.", translation: "The meat was tender and good." }
    ],
    130: [
      { text: "Comemos *sopa* cuando hace frío.", translation: "We eat soup when it's cold." },
      { text: "La *sopa* estaba caliente y buena.", translation: "The soup was warm and good." },
      { text: "Mamá hizo *sopa* para la cena.", translation: "Mom made soup for dinner." }
    ],
    131: [
      { text: "Como una *manzana* cada día.", translation: "I eat an apple every day." },
      { text: "La *manzana* estaba roja y dulce.", translation: "The apple was red and sweet." },
      { text: "Recogimos *manzanas* en el jardín.", translation: "We picked apples in the garden." }
    ],
    132: [
      { text: "Tomo un *plátano* en el almuerzo.", translation: "I'll have a banana for lunch." },
      { text: "El *plátano* estaba maduro y dulce.", translation: "The banana was ripe and sweet." },
      { text: "A los niños les gustan mucho los *plátanos*.", translation: "The children like bananas a lot." }
    ],
    133: [
      { text: "Bebo zumo de *naranja*.", translation: "I drink orange juice." },
      { text: "La *naranja* estaba jugosa y dulce.", translation: "The orange was juicy and sweet." },
      { text: "Compramos una bolsa de *naranjas*.", translation: "We bought a bag of oranges." }
    ],
    134: [
      { text: "Comemos *patatas* en la cena.", translation: "We eat potatoes for dinner." },
      { text: "La *patata* estaba cocida y blanda.", translation: "The potato was boiled and soft." },
      { text: "Cultiva *patatas* en el jardín.", translation: "He grows potatoes in the garden." }
    ],
    135: [
      { text: "El conejo come una *zanahoria*.", translation: "The rabbit is eating a carrot." },
      { text: "La *zanahoria* estaba dulce y crujiente.", translation: "The carrot was sweet and crisp." },
      { text: "Cortamos *zanahorias* para la sopa.", translation: "We cut carrots for the soup." }
    ],
    136: [
      { text: "Bebo *té* por la mañana.", translation: "I drink tea in the morning." },
      { text: "¿Puedo tomar una taza de *té*?", translation: "Can I have a cup of tea?" },
      { text: "El *té* estaba demasiado caliente para beber.", translation: "The tea was too hot to drink." }
    ],
    137: [
      { text: "El niño bebe *leche* en el desayuno.", translation: "The child drinks milk for breakfast." },
      { text: "¿Puedes comprar *leche* en la tienda?", translation: "Can you buy milk at the shop?" },
      { text: "La *leche* estaba fría y fresca.", translation: "The milk was cold and fresh." }
    ],
    138: [
      { text: "Bebo *zumo* cada mañana.", translation: "I drink juice every morning." },
      { text: "El *zumo* sabe dulce y fresco.", translation: "The juice tastes sweet and fresh." },
      { text: "Hicimos *zumo* de manzanas.", translation: "We made juice from apples." }
    ],
    139: [
      { text: "Tomo el *desayuno* a las siete.", translation: "I eat breakfast at seven." },
      { text: "El *desayuno* estaba delicioso esta mañana.", translation: "Breakfast was delicious this morning." },
      { text: "Tomamos el *desayuno* juntos cada día.", translation: "We eat breakfast together every day." }
    ],
    140: [
      { text: "Tomamos el *almuerzo* a las doce.", translation: "We eat lunch at twelve." },
      { text: "El *almuerzo* fue rápido pero bueno.", translation: "Lunch was quick but good." },
      { text: "Lleva el *almuerzo* al trabajo.", translation: "He brings lunch to work." }
    ],
    141: [
      { text: "Tomamos la *cena* a las seis.", translation: "We eat dinner at six." },
      { text: "La *cena* estuvo muy buena esta noche.", translation: "Dinner was very good tonight." },
      { text: "La familia se reúne para la *cena* cada domingo.", translation: "The family gathers for dinner every Sunday." }
    ],
    142: [
      { text: "¿Puedes pasarme la *sal*?", translation: "Can you pass me the salt?" },
      { text: "La sopa necesita un poco más de *sal*.", translation: "The soup needs a bit more salt." },
      { text: "Usa demasiada *sal* en la comida.", translation: "He uses too much salt in the food." }
    ],
    143: [
      { text: "Bebo café sin *azúcar*.", translation: "I drink coffee without sugar." },
      { text: "¿Puedes pasarme el *azúcar*?", translation: "Can you pass me the sugar?" },
      { text: "El pastel necesita mucho *azúcar*.", translation: "The cake needs a lot of sugar." }
    ],
    144: [
      { text: "La comida está en el *plato*.", translation: "The food is on the plate." },
      { text: "¿Puedes lavar el *plato*?", translation: "Can you wash the plate?" },
      { text: "Ponemos la mesa con *platos*.", translation: "We're setting the table with plates." }
    ],
    145: [
      { text: "¿Puedo tener un *vaso* de agua?", translation: "Can I have a glass of water?" },
      { text: "El *vaso* se cayó y se rompió.", translation: "The glass fell and broke." },
      { text: "Llenó el *vaso* de zumo.", translation: "She filled the glass with juice." }
    ],
    146: [
      { text: "Me duele la *cabeza*.", translation: "My head hurts." },
      { text: "Movió la *cabeza*.", translation: "He shook his head." },
      { text: "Tengo dolor de *cabeza*.", translation: "I have a headache." }
    ],
    147: [
      { text: "Me tenía de la *mano*.", translation: "She held my hand." },
      { text: "Lávate las *manos* antes de comer.", translation: "Wash your hands before you eat." },
      { text: "Saludó con la *mano*.", translation: "He waved with his hand." }
    ],
    148: [
      { text: "Me torcí el *pie*.", translation: "I twisted my foot." },
      { text: "El niño tiene *pies* pequeños.", translation: "The child has small feet." },
      { text: "Pateó la pelota con el *pie*.", translation: "He kicked the ball with his foot." }
    ],
    149: [
      { text: "Tiene *ojos* azules.", translation: "She has blue eyes." },
      { text: "Me entró algo en el *ojo*.", translation: "I got something in my eye." },
      { text: "El niño cerró los *ojos* y se durmió.", translation: "The child closed its eyes and slept." }
    ],
    150: [
      { text: "Me susurró algo en la *oreja*.", translation: "He whispered something in my ear." },
      { text: "La música estaba alta, así que me tapé las *orejas*.", translation: "The music was loud, so I covered my ears." },
      { text: "El perro tiene *orejas* grandes.", translation: "The dog has big ears." }
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
