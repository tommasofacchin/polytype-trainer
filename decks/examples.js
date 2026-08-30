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
