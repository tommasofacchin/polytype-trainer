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
