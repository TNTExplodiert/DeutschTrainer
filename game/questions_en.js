/* =====================================================================
   Fragen-Datenbank ENGLISCH – 7. Klasse Realschule Bayern (LehrplanPLUS)
   Vollausbau: originale, selbst erstellte Übungen (KEINE Schulbuch-Inhalte).
   - Grammatik mit eigenen Beispielsätzen (Allerweltssätze, A2-Niveau)
   - Themen-/Landeskunde-Wortschatz aus eigener/freier Auswahl
   - „Mein Wortschatz": lädt – falls vorhanden – deine LOKALEN, privaten
     Vokabeln aus window.CUSTOM_VOCAB (game/vocab_custom.js, gitignored).
   Orientierung an der Lehrplan-STRUKTUR (Themen/Grammatik), nicht an Buchtext.
   ===================================================================== */
(function () {
  const QUESTIONS = [];
  function addQ(topic, q, options, correct, kind, explain) {
    QUESTIONS.push({ topic, q, options, correct, kind: kind || "mc", explain: explain || "" });
  }
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  /* ============================================================
     1. Simple Past ⏱️
     ============================================================ */
  addQ("Simple Past", "Choose: „Yesterday I ___ to school by bus.“",
    ["went", "go", "gone"], 0, "mc", "Simple past von „go“ ist „went“.");
  addQ("Simple Past", "Choose: „She ___ a letter to her grandma last week.“",
    ["wrote", "writes", "written"], 0, "mc", "Unregelmäßiges Verb: write → wrote.");
  addQ("Simple Past", "Choose: „We ___ football in the park on Saturday.“",
    ["played", "play", "playing"], 0, "mc", "Regelmäßiges Verb: play + -ed.");
  addQ("Simple Past", "Negative: „He ___ his homework yesterday.“",
    ["didn't do", "doesn't do", "not did"], 0, "mc", "Verneinung im simple past: did not (didn't) + Grundform.");
  addQ("Simple Past", "Question: „___ you watch the film last night?“",
    ["Did", "Do", "Was"], 0, "mc", "Frage im simple past mit „did“ + Grundform.");
  addQ("Simple Past", "Choose: „They ___ at home all weekend.“",
    ["stayed", "stay", "staying"], 0, "mc", "Regelmäßig: stay → stayed.");
  addQ("Simple Past", "Choose: „I ___ very tired after the long walk.“",
    ["was", "were", "is"], 0, "mc", "1. Person Singular: I was.");
  addQ("Simple Past", "Choose: „The children ___ happy at the party.“",
    ["were", "was", "are"], 0, "mc", "Plural: the children were.");
  addQ("Simple Past", "Choose: „She ___ her keys this morning.“",
    ["lost", "lose", "losed"], 0, "mc", "Unregelmäßig: lose → lost.");
  addQ("Simple Past", "Choose: „We ___ a great time on holiday.“",
    ["had", "have", "haved"], 0, "mc", "Unregelmäßig: have → had.");
  addQ("Simple Past", "Choose: „He ___ the door and went out.“",
    ["opened", "opens", "open"], 0, "mc", "Regelmäßig: open → opened.");
  addQ("Simple Past", "Choose: „I ___ my friend at the bus stop.“",
    ["saw", "see", "seen"], 0, "mc", "Unregelmäßig: see → saw.");
  addQ("Simple Past", "Question: „Where ___ you go on Sunday?“",
    ["did", "do", "was"], 0, "mc", "Fragewort + did + Subjekt + Grundform.");
  addQ("Simple Past", "Choose: „My dad ___ the car last Monday.“",
    ["washed", "washes", "wash"], 0, "mc", "Regelmäßig: wash → washed.");
  addQ("Simple Past", "Choose: „We ___ pizza for dinner.“",
    ["ate", "eat", "eaten"], 0, "mc", "Unregelmäßig: eat → ate.");
  addQ("Simple Past", "Find the simple past verb:\n„She bought a new bike yesterday.“",
    ["bought", "she", "yesterday"], 0, "recognize", "buy → bought (simple past).");
  addQ("Simple Past", "Find the simple past verb:\n„They walked to the beach last summer.“",
    ["walked", "beach", "summer"], 0, "recognize", "walk + -ed = walked.");
  addQ("Simple Past", "Find the simple past verb:\n„I drank a glass of water.“",
    ["drank", "water", "glass"], 0, "recognize", "drink → drank.");
  addQ("Simple Past", "Choose: „He ___ to me on the phone.“",
    ["spoke", "speaks", "spoken"], 0, "mc", "Unregelmäßig: speak → spoke.");
  addQ("Simple Past", "Choose: „The shop ___ at six o'clock.“",
    ["closed", "closes", "close"], 0, "mc", "Regelmäßig: close → closed.");
  addQ("Simple Past", "Which signal word often shows simple past?",
    ["yesterday", "every day", "now"], 0, "mc", "„yesterday“, „last week“, „ago“ zeigen das simple past.");
  addQ("Simple Past", "Choose: „We ___ a film and then went to bed.“",
    ["watched", "watch", "watching"], 0, "mc", "Regelmäßig: watch → watched.");
  addQ("Simple Past", "Choose: „She ___ her bag on the train.“",
    ["left", "leaved", "leaves"], 0, "mc", "Unregelmäßig: leave → left.");
  addQ("Simple Past", "Choose: „I ___ him a present for his birthday.“",
    ["gave", "give", "given"], 0, "mc", "Unregelmäßig: give → gave.");
  addQ("Simple Past", "Negative: „We ___ the bus this morning.“",
    ["didn't catch", "not caught", "don't catch"], 0, "mc", "didn't + Grundform (catch).");

  /* ============================================================
     2. Past Progressive 🎬
     ============================================================ */
  addQ("Past Progressive", "The past progressive is formed with …",
    ["was/were + -ing", "had + past participle", "did + infinitive"], 0, "mc",
    "Past progressive = was/were + Verb + -ing.");
  addQ("Past Progressive", "Choose: „At eight o'clock I ___ dinner.“",
    ["was cooking", "cooked", "cook"], 0, "mc", "Andauernde Handlung zu einem Zeitpunkt → was cooking.");
  addQ("Past Progressive", "Choose: „They ___ TV when the phone rang.“",
    ["were watching", "watched", "watch"], 0, "mc", "Hintergrund-Handlung im past progressive.");
  addQ("Past Progressive", "Choose: „While she ___, it started to rain.“",
    ["was walking", "walked", "walks"], 0, "mc", "Nach „while“ oft past progressive.");
  addQ("Past Progressive", "Choose: „We ___ in the garden all afternoon.“",
    ["were working", "worked", "work"], 0, "mc", "Plural: were + working.");
  addQ("Past Progressive", "Choose: „He ___ a book when I came in.“",
    ["was reading", "read", "reads"], 0, "mc", "Singular: was + reading.");
  addQ("Past Progressive", "Negative: „I ___ to you, sorry.“",
    ["wasn't listening", "didn't listening", "not was listening"], 0, "mc", "Verneinung: was not (wasn't) + -ing.");
  addQ("Past Progressive", "Question: „What ___ you doing at six?“",
    ["were", "did", "was"], 0, "mc", "Plural/2. Person: were + Subjekt + -ing.");
  addQ("Past Progressive", "Choose: „The sun ___ when we got up.“",
    ["was shining", "shined", "shines"], 0, "mc", "Andauernder Zustand in der Vergangenheit.");
  addQ("Past Progressive", "Choose: „The kids ___ in the pool at noon.“",
    ["were swimming", "swam", "swim"], 0, "mc", "Plural: were + swimming.");
  addQ("Past Progressive", "Which sentence uses the past progressive?",
    ["I was sleeping at ten.", "I slept at ten.", "I sleep at ten."], 0, "mc", "was + sleeping = past progressive.");
  addQ("Past Progressive", "Choose: „She ___ her bike when she fell.“",
    ["was riding", "rode", "rides"], 0, "mc", "Längere Handlung, unterbrochen durch ein Ereignis.");
  addQ("Past Progressive", "Find the past progressive:\n„We were waiting for the bus.“",
    ["were waiting", "bus", "for"], 0, "recognize", "were + waiting = past progressive.");
  addQ("Past Progressive", "Find the past progressive:\n„He was painting the wall yesterday.“",
    ["was painting", "wall", "yesterday"], 0, "recognize", "was + painting = past progressive.");
  addQ("Past Progressive", "Find the past progressive:\n„They were laughing at the joke.“",
    ["were laughing", "joke", "at"], 0, "recognize", "were + laughing = past progressive.");
  addQ("Past Progressive", "Choose: „I ___ my homework while my brother played.“",
    ["was doing", "did", "do"], 0, "mc", "Zwei parallele Handlungen → past progressive.");
  addQ("Past Progressive", "Choose: „It ___ heavily, so we stayed inside.“",
    ["was raining", "rained", "rains"], 0, "mc", "Andauernde Wettersituation.");
  addQ("Past Progressive", "Choose: „What were you ___ at midnight?“",
    ["doing", "did", "do"], 0, "mc", "Nach were folgt die -ing-Form.");
  addQ("Past Progressive", "The past progressive often describes …",
    ["an action in progress", "a finished short action", "a future plan"], 0, "mc",
    "Es beschreibt eine andauernde Handlung in der Vergangenheit.");
  addQ("Past Progressive", "Choose: „She was ___ when the lights went out.“",
    ["studying", "studied", "study"], 0, "mc", "was + studying.");
  addQ("Past Progressive", "Choose: „We ___ about you yesterday evening.“",
    ["were talking", "talked", "talk"], 0, "mc", "were + talking.");
  addQ("Past Progressive", "Choose: „The dog ___ loudly all night.“",
    ["was barking", "barked", "barks"], 0, "mc", "Andauerndes Bellen → was barking.");
  addQ("Past Progressive", "Choose: „They ___ a film when I called.“",
    ["were making", "made", "make"], 0, "mc", "Längere Handlung als Hintergrund.");
  addQ("Past Progressive", "Negative: „We ___ at that moment.“",
    ["weren't sleeping", "didn't sleeping", "not slept"], 0, "mc", "weren't + -ing.");
  addQ("Past Progressive", "Choose: „I was ___ for my keys everywhere.“",
    ["looking", "looked", "look"], 0, "mc", "was + looking.");

  /* ============================================================
     3. Present Perfect ✅
     ============================================================ */
  addQ("Present Perfect", "The present perfect is formed with …",
    ["have/has + past participle", "was/were + -ing", "did + infinitive"], 0, "mc",
    "Present perfect = have/has + 3. Verbform (past participle).");
  addQ("Present Perfect", "Choose: „I ___ my homework. It's finished now.“",
    ["have done", "did", "do"], 0, "mc", "Ergebnis in der Gegenwart → present perfect.");
  addQ("Present Perfect", "Choose: „She ___ to London twice.“",
    ["has been", "was", "is"], 0, "mc", "Erfahrung im Leben → has been.");
  addQ("Present Perfect", "Choose: „They ___ just ___ the train.“",
    ["have … missed", "did … miss", "are … missing"], 0, "mc", "Signalwort „just“ → present perfect.");
  addQ("Present Perfect", "Choose: „He ___ his keys. He can't find them.“",
    ["has lost", "lost", "loses"], 0, "mc", "Folge jetzt spürbar → has lost.");
  addQ("Present Perfect", "Which signal word goes with present perfect?",
    ["already", "yesterday", "two days ago"], 0, "mc", "„already“, „yet“, „just“, „ever“, „never“.");
  addQ("Present Perfect", "Choose: „I ___ never ___ snow.“",
    ["have … seen", "did … see", "was … seeing"], 0, "mc", "„never“ → present perfect.");
  addQ("Present Perfect", "Choose: „We ___ already ___ lunch.“",
    ["have … had", "did … have", "are … having"], 0, "mc", "„already“ → present perfect.");
  addQ("Present Perfect", "Question: „___ you ever been to the USA?“",
    ["Have", "Did", "Are"], 0, "mc", "Frage mit have + Subjekt + past participle.");
  addQ("Present Perfect", "Choose: „She ___ her room. It looks tidy.“",
    ["has cleaned", "cleaned", "cleans"], 0, "mc", "Sichtbares Ergebnis → has cleaned.");
  addQ("Present Perfect", "What is the past participle of „go“?",
    ["gone", "went", "going"], 0, "mc", "go – went – gone.");
  addQ("Present Perfect", "What is the past participle of „eat“?",
    ["eaten", "ate", "eating"], 0, "mc", "eat – ate – eaten.");
  addQ("Present Perfect", "Choose: „I ___ this film before.“",
    ["have seen", "saw", "see"], 0, "mc", "Erfahrung, Zeitpunkt unwichtig → have seen.");
  addQ("Present Perfect", "Negative: „We ___ finished yet.“",
    ["haven't", "didn't", "weren't"], 0, "mc", "haven't + past participle, oft mit „yet“.");
  addQ("Present Perfect", "Find the present perfect:\n„She has written three emails today.“",
    ["has written", "emails", "today"], 0, "recognize", "has + written = present perfect.");
  addQ("Present Perfect", "Find the present perfect:\n„They have visited the museum.“",
    ["have visited", "museum", "the"], 0, "recognize", "have + visited = present perfect.");
  addQ("Present Perfect", "Find the present perfect:\n„I have already eaten breakfast.“",
    ["have … eaten", "already", "breakfast"], 0, "recognize", "have + eaten = present perfect.");
  addQ("Present Perfect", "Choose: „He ___ his bike, so he walks now.“",
    ["has broken", "broke", "breaks"], 0, "mc", "Folge in der Gegenwart → has broken.");
  addQ("Present Perfect", "Choose: „Look! It ___ snowing.“",
    ["has started", "started", "starts"], 0, "mc", "Frisches Ergebnis, jetzt sichtbar.");
  addQ("Present Perfect", "Choose: „I ___ never ___ such a big dog.“",
    ["have … met", "did … meet", "was … meeting"], 0, "mc", "„never“ → present perfect.");
  addQ("Present Perfect", "Choose: „We ___ here since 2010.“",
    ["have lived", "lived", "live"], 0, "mc", "„since“ → present perfect.");
  addQ("Present Perfect", "Choose: „She ___ for two hours.“ (with „for“)",
    ["has waited", "waited", "waits"], 0, "mc", "„for“ + Zeitspanne bis jetzt → present perfect.");
  addQ("Present Perfect", "Choose: „They ___ yet.“",
    ["haven't arrived", "didn't arrive", "weren't arriving"], 0, "mc", "„yet“ + Verneinung → present perfect.");
  addQ("Present Perfect", "What is the past participle of „write“?",
    ["written", "wrote", "writing"], 0, "mc", "write – wrote – written.");
  addQ("Present Perfect", "Choose: „I ___ this song many times.“",
    ["have heard", "heard", "hear"], 0, "mc", "Wiederholte Erfahrung bis jetzt.");

  /* ============================================================
     4. Present Perfect / Simple Past 🔀
     ============================================================ */
  addQ("Present Perfect / Simple Past", "Choose: „I ___ to Spain last year.“",
    ["went", "have gone", "go"], 0, "mc", "Klarer Zeitpunkt (last year) → simple past.");
  addQ("Present Perfect / Simple Past", "Choose: „I ___ to Spain three times.“",
    ["have been", "was", "went"], 0, "mc", "Erfahrung, Zeit egal → present perfect.");
  addQ("Present Perfect / Simple Past", "Choose: „She ___ her homework yesterday.“",
    ["did", "has done", "does"], 0, "mc", "„yesterday“ → simple past.");
  addQ("Present Perfect / Simple Past", "Choose: „She ___ her homework. It's ready now.“",
    ["has done", "did", "does"], 0, "mc", "Ergebnis jetzt, kein Zeitpunkt → present perfect.");
  addQ("Present Perfect / Simple Past", "Which word signals simple past?",
    ["yesterday", "just", "yet"], 0, "mc", "„yesterday“ markiert das simple past.");
  addQ("Present Perfect / Simple Past", "Which word signals present perfect?",
    ["already", "two days ago", "last week"], 0, "mc", "„already“ gehört zum present perfect.");
  addQ("Present Perfect / Simple Past", "Choose: „We ___ this film last night.“",
    ["watched", "have watched", "watch"], 0, "mc", "„last night“ → simple past.");
  addQ("Present Perfect / Simple Past", "Choose: „I can't come, I ___ my leg.“",
    ["have broken", "broke", "break"], 0, "mc", "Folge jetzt spürbar → present perfect.");
  addQ("Present Perfect / Simple Past", "Choose: „When ___ you arrive?“",
    ["did", "have", "are"], 0, "mc", "Frage mit „when“ verlangt einen Zeitpunkt → simple past.");
  addQ("Present Perfect / Simple Past", "Choose: „___ you ever eaten sushi?“",
    ["Have", "Did", "Were"], 0, "mc", "„ever“ → present perfect.");
  addQ("Present Perfect / Simple Past", "Choose: „He ___ his car in 2019.“",
    ["bought", "has bought", "buys"], 0, "mc", "Konkretes Jahr → simple past.");
  addQ("Present Perfect / Simple Past", "Choose: „I ___ never ___ to Paris.“",
    ["have … been", "was … being", "did … be"], 0, "mc", "„never“ → present perfect.");
  addQ("Present Perfect / Simple Past", "Choose: „They ___ the bus an hour ago.“",
    ["caught", "have caught", "catch"], 0, "mc", "„an hour ago“ → simple past.");
  addQ("Present Perfect / Simple Past", "Choose: „She ___ just ___ home.“",
    ["has … come", "came", "comes"], 0, "mc", "„just“ → present perfect.");
  addQ("Present Perfect / Simple Past", "Choose: „We ___ in this town since 2015.“",
    ["have lived", "lived", "live"], 0, "mc", "„since“ → present perfect.");
  addQ("Present Perfect / Simple Past", "Choose: „Last summer we ___ to the seaside.“",
    ["travelled", "have travelled", "travel"], 0, "mc", "„last summer“ → simple past.");
  addQ("Present Perfect / Simple Past", "Choose: „I ___ my keys. Have you seen them?“",
    ["have lost", "lost", "lose"], 0, "mc", "Folge in der Gegenwart → present perfect.");
  addQ("Present Perfect / Simple Past", "Choose: „He ___ ill two days ago.“",
    ["got", "has got", "gets"], 0, "mc", "„two days ago“ → simple past.");
  addQ("Present Perfect / Simple Past", "Find the present perfect:\n„I lived here in 2010 but I have moved twice since then.“",
    ["have moved", "lived", "in 2010"], 0, "recognize", "have moved = present perfect; lived = simple past.");
  addQ("Present Perfect / Simple Past", "Find the simple past:\n„She has finished the book she started last week.“",
    ["started", "has finished", "the book"], 0, "recognize", "started = simple past (last week).");
  addQ("Present Perfect / Simple Past", "Choose: „I ___ him at the party last Friday.“",
    ["met", "have met", "meet"], 0, "mc", "„last Friday“ → simple past.");
  addQ("Present Perfect / Simple Past", "Choose: „We ___ already ___ the news.“",
    ["have … heard", "heard", "hears"], 0, "mc", "„already“ → present perfect.");
  addQ("Present Perfect / Simple Past", "Choose: „Did you finish, or ___ you not started yet?“",
    ["have", "did", "are"], 0, "mc", "„yet“ → present perfect.");
  addQ("Present Perfect / Simple Past", "Choose: „My grandpa ___ in 1990.“",
    ["retired", "has retired", "retires"], 0, "mc", "Jahreszahl → simple past.");
  addQ("Present Perfect / Simple Past", "Choose: „I ___ this band since I was ten.“",
    ["have liked", "liked", "like"], 0, "mc", "„since“ → present perfect.");

  /* ============================================================
     5. Past Perfect ⏪
     ============================================================ */
  addQ("Past Perfect", "Past perfect is formed with …",
    ["had + past participle", "have + infinitive", "was/were + -ing"], 0, "mc",
    "Past perfect = had + 3. Verbform (past participle).");
  addQ("Past Perfect", "Choose: „When we arrived, the train ___ already ___.“",
    ["had … left", "has … left", "was … leaving"], 0, "mc",
    "Eine Handlung VOR einer anderen in der Vergangenheit → past perfect (had left).");
  addQ("Past Perfect", "Choose: „Before she came home, she ___ her friends.“ (call)",
    ["had called", "has called", "was calling"], 0, "mc",
    "Das frühere Ereignis steht im past perfect: had called.");
  addQ("Past Perfect", "Which happened FIRST? „The film had started when we got to the cinema.“",
    ["The film started", "We got to the cinema"], 0, "mc",
    "Das past perfect (had started) markiert die frühere Handlung.");
  addQ("Past Perfect", "Negative: „They ___ seen that film before.“",
    ["hadn't", "didn't", "weren't"], 0, "mc", "Verneinung: had not (hadn't) + past participle.");
  addQ("Past Perfect", "Find the past perfect:\n„After he had finished his homework, he went out.“",
    ["had finished", "went", "his homework"], 0, "recognize",
    "had + finished = past perfect (frühere Handlung).");
  addQ("Past Perfect", "Find the past perfect:\n„She was tired because she had worked all day.“",
    ["had worked", "was", "all day"], 0, "recognize", "had worked = past perfect.");
  addQ("Past Perfect", "Choose: „I couldn't pay because I ___ my wallet at home.“",
    ["had left", "have left", "left"], 0, "mc", "Vorzeitigkeit in der Vergangenheit → had left.");
  addQ("Past Perfect", "The German equivalent of the past perfect is the …",
    ["Plusquamperfekt", "Präsens", "Futur"], 0, "mc", "had left = „hatte verlassen“ (Plusquamperfekt).");
  addQ("Past Perfect", "Choose: „By the time the guests arrived, we ___ the food.“",
    ["had prepared", "have prepared", "prepare"], 0, "mc", "Abgeschlossen vor einem Zeitpunkt der Vergangenheit.");
  addQ("Past Perfect", "Choose: „He told me he ___ the book already.“",
    ["had read", "has read", "reads"], 0, "mc", "Vorzeitige Handlung in der Vergangenheit.");
  addQ("Past Perfect", "Choose: „The street was wet because it ___.“",
    ["had rained", "has rained", "rains"], 0, "mc", "Grund liegt zeitlich davor → had rained.");
  addQ("Past Perfect", "Choose: „She ___ never ___ a plane before that day.“",
    ["had … seen", "has … seen", "did … see"], 0, "mc", "„before that day“ → past perfect.");
  addQ("Past Perfect", "Choose: „When I got up, my brother ___ already ___.“",
    ["had … eaten", "has … eaten", "was … eating"], 0, "mc", "Das frühere Ereignis → past perfect.");
  addQ("Past Perfect", "Which happened FIRST? „We had eaten before the film began.“",
    ["We ate", "The film began"], 0, "mc", "had eaten markiert die frühere Handlung.");
  addQ("Past Perfect", "Choose: „They were happy because they ___ the game.“",
    ["had won", "have won", "win"], 0, "mc", "Grund liegt davor → had won.");
  addQ("Past Perfect", "Find the past perfect:\n„Once she had packed, she left for the airport.“",
    ["had packed", "left", "airport"], 0, "recognize", "had + packed = past perfect.");
  addQ("Past Perfect", "Choose: „I didn't know that he ___ already ___.“",
    ["had … gone", "has … gone", "did … go"], 0, "mc", "Vorzeitigkeit → had gone.");
  addQ("Past Perfect", "Choose: „The room was empty; everyone ___.“",
    ["had left", "has left", "leaves"], 0, "mc", "Vorher passiert → had left.");
  addQ("Past Perfect", "Choose: „After we ___ dinner, we watched a film.“",
    ["had had", "have had", "have"], 0, "mc", "Erste Handlung im past perfect: had had.");
  addQ("Past Perfect", "Choose: „She found the keys she ___.“",
    ["had lost", "has lost", "loses"], 0, "mc", "Das Verlieren war vorher → had lost.");
  addQ("Past Perfect", "Choose: „By 8 p.m. they ___ all the work.“",
    ["had done", "have done", "do"], 0, "mc", "Abgeschlossen vor einem Zeitpunkt → had done.");
  addQ("Past Perfect", "Choose: „He couldn't get in because he ___ his key.“",
    ["had forgotten", "has forgotten", "forgets"], 0, "mc", "Vorzeitiger Grund → had forgotten.");
  addQ("Past Perfect", "Choose: „We were late because the bus ___ early.“",
    ["had gone", "has gone", "goes"], 0, "mc", "Bus war vorher weg → had gone.");
  addQ("Past Perfect", "Choose: „I recognised her at once: we ___ before.“",
    ["had met", "have met", "meet"], 0, "mc", "Früheres Treffen → had met.");

  /* ============================================================
     6. Question Tags ❓
     ============================================================ */
  addQ("Question Tags", "„It's cold today, ___?“",
    ["isn't it", "is it", "doesn't it"], 0, "mc",
    "Positiver Satz → negativer Anhang; Hilfsverb is → isn't it.");
  addQ("Question Tags", "„You like pizza, ___?“",
    ["don't you", "do you", "aren't you"], 0, "mc", "Vollverb im present → do/don't; positiv → don't you.");
  addQ("Question Tags", "„She can swim, ___?“",
    ["can't she", "can she", "doesn't she"], 0, "mc", "Modalverb can wird im Anhang wiederholt: can't she.");
  addQ("Question Tags", "„They went home, ___?“",
    ["didn't they", "did they", "weren't they"], 0, "mc", "Simple past → did/didn't; positiv → didn't they.");
  addQ("Question Tags", "„He isn't here, ___?“",
    ["is he", "isn't he", "does he"], 0, "mc", "Negativer Satz → positiver Anhang: is he.");
  addQ("Question Tags", "A positive sentence usually takes a ___ question tag.",
    ["negative", "positive"], 0, "mc", "Positiv ↔ negativ (z. B. It's nice, isn't it?).");
  addQ("Question Tags", "„We've finished, ___?“",
    ["haven't we", "didn't we", "don't we"], 0, "mc", "present perfect (have) → haven't we.");
  addQ("Question Tags", "„You won't tell anyone, ___?“",
    ["will you", "won't you", "do you"], 0, "mc", "Negativ (won't) → positiver Anhang: will you.");
  addQ("Question Tags", "„Let's go, ___?“",
    ["shall we", "don't we", "will we"], 0, "mc", "Nach „Let's“ steht immer „shall we?“.");
  addQ("Question Tags", "„I'm late, ___?“",
    ["aren't I", "amn't I", "am I"], 0, "mc", "Sonderfall: zu „I am“ gehört „aren't I?“.");
  addQ("Question Tags", "„She doesn't like tea, ___?“",
    ["does she", "doesn't she", "is she"], 0, "mc", "Negativ → positiver Anhang: does she.");
  addQ("Question Tags", "„They are coming, ___?“",
    ["aren't they", "are they", "don't they"], 0, "mc", "are → aren't they.");
  addQ("Question Tags", "„He plays tennis, ___?“",
    ["doesn't he", "does he", "isn't he"], 0, "mc", "Vollverb 3. Person → doesn't he.");
  addQ("Question Tags", "„You didn't see him, ___?“",
    ["did you", "didn't you", "do you"], 0, "mc", "Negativ (didn't) → positiver Anhang: did you.");
  addQ("Question Tags", "„We should leave now, ___?“",
    ["shouldn't we", "should we", "don't we"], 0, "mc", "Modalverb should → shouldn't we.");
  addQ("Question Tags", "„She has a dog, ___?“",
    ["doesn't she", "hasn't she", "isn't she"], 0, "mc", "„have“ als Vollverb → doesn't she.");
  addQ("Question Tags", "„The train was late, ___?“",
    ["wasn't it", "was it", "didn't it"], 0, "mc", "was → wasn't it.");
  addQ("Question Tags", "„You can help me, ___?“",
    ["can't you", "can you", "don't you"], 0, "mc", "Modalverb can → can't you.");
  addQ("Question Tags", "„He won't come, ___?“",
    ["will he", "won't he", "does he"], 0, "mc", "Negativ → positiver Anhang: will he.");
  addQ("Question Tags", "„They have left, ___?“",
    ["haven't they", "didn't they", "don't they"], 0, "mc", "present perfect → haven't they.");
  addQ("Question Tags", "Find the question tag:\n„You are tired, aren't you?“",
    ["aren't you", "tired", "are"], 0, "recognize", "Der Anhang „aren't you“ ist der question tag.");
  addQ("Question Tags", "Find the question tag:\n„She didn't call, did she?“",
    ["did she", "didn't", "call"], 0, "recognize", "„did she“ ist der question tag.");
  addQ("Question Tags", "„We were right, ___?“",
    ["weren't we", "were we", "didn't we"], 0, "mc", "were → weren't we.");
  addQ("Question Tags", "„He must stay, ___?“",
    ["mustn't he", "must he", "doesn't he"], 0, "mc", "Modalverb must → mustn't he.");
  addQ("Question Tags", "„Nobody called, ___?“",
    ["did they", "didn't they", "do they"], 0, "mc", "Nach „nobody“ steht „they“ im positiven Anhang.");

  /* ============================================================
     7. Relative Clauses 🔗
     ============================================================ */
  addQ("Relative Clauses", "Choose: „The man ___ lives next door is friendly.“",
    ["who", "which", "where"], 0, "mc", "Für Personen verwendet man „who“.");
  addQ("Relative Clauses", "Choose: „The book ___ is on the table is mine.“",
    ["which", "who", "whose"], 0, "mc", "Für Sachen verwendet man „which“ (oder that).");
  addQ("Relative Clauses", "Choose: „This is the girl ___ bag was stolen.“",
    ["whose", "who", "which"], 0, "mc", "„whose“ zeigt Besitz (deren/dessen).");
  addQ("Relative Clauses", "Choose: „That's the town ___ I was born.“",
    ["where", "which", "who"], 0, "mc", "Für Orte verwendet man „where“.");
  addQ("Relative Clauses", "Choose: „The dog ___ is barking is ours.“",
    ["that", "who", "where"], 0, "mc", "„that“ kann für Sachen und Tiere stehen.");
  addQ("Relative Clauses", "Which pronoun is for people?",
    ["who", "which", "where"], 0, "mc", "„who“ bezieht sich auf Personen.");
  addQ("Relative Clauses", "Which pronoun is for things?",
    ["which", "who", "whose"], 0, "mc", "„which“ bezieht sich auf Sachen.");
  addQ("Relative Clauses", "Choose: „She is the teacher ___ helped me.“",
    ["who", "which", "where"], 0, "mc", "Person → who.");
  addQ("Relative Clauses", "Choose: „I like the song ___ you played.“",
    ["that", "who", "where"], 0, "mc", "Sache → that/which.");
  addQ("Relative Clauses", "A contact clause is a relative clause …",
    ["without a relative pronoun", "with two pronouns", "with no verb"], 0, "mc",
    "Im contact clause fehlt das Relativpronomen (z. B. the book I read).");
  addQ("Relative Clauses", "Which is a correct contact clause?",
    ["The film I saw was great.", "The film which it I saw.", "The film who I saw."], 0, "mc",
    "Kein Pronomen nötig, wenn es Objekt ist: the film I saw.");
  addQ("Relative Clauses", "Choose: „This is the house ___ we lived in.“",
    ["where", "who", "whose"], 0, "mc", "Ort → where.");
  addQ("Relative Clauses", "Choose: „He's the boy ___ phone is broken.“",
    ["whose", "who", "which"], 0, "mc", "Besitz → whose.");
  addQ("Relative Clauses", "Choose: „The shop ___ sells bikes is closed.“",
    ["which", "who", "where"], 0, "mc", "Sache (Subjekt) → which/that.");
  addQ("Relative Clauses", "Choose: „People ___ work hard often succeed.“",
    ["who", "which", "whose"], 0, "mc", "Personen → who.");
  addQ("Relative Clauses", "When can you leave out the relative pronoun?",
    ["when it is the object", "when it is the subject", "never"], 0, "mc",
    "Als Objekt kann das Pronomen wegfallen (contact clause).");
  addQ("Relative Clauses", "Find the relative pronoun:\n„The car which I bought is red.“",
    ["which", "car", "bought"], 0, "recognize", "„which“ ist das Relativpronomen.");
  addQ("Relative Clauses", "Find the relative pronoun:\n„The woman who called was kind.“",
    ["who", "woman", "called"], 0, "recognize", "„who“ ist das Relativpronomen.");
  addQ("Relative Clauses", "Find the relative pronoun:\n„The place where we met was nice.“",
    ["where", "place", "met"], 0, "recognize", "„where“ leitet den Relativsatz ein.");
  addQ("Relative Clauses", "Choose: „I met a man ___ speaks five languages.“",
    ["who", "which", "where"], 0, "mc", "Person → who.");
  addQ("Relative Clauses", "Choose: „The cake ___ she made was delicious.“",
    ["that", "who", "where"], 0, "mc", "Sache → that/which.");
  addQ("Relative Clauses", "Choose: „This is the friend ___ I told you about.“",
    ["who", "which", "whose"], 0, "mc", "Person (Objekt) → who.");
  addQ("Relative Clauses", "Choose: „The school ___ I go to is big.“",
    ["that", "who", "whose"], 0, "mc", "Sache → that.");
  addQ("Relative Clauses", "Choose: „That's the artist ___ paintings I love.“",
    ["whose", "who", "which"], 0, "mc", "Besitz → whose.");
  addQ("Relative Clauses", "Choose: „The day ___ we met was sunny.“",
    ["when", "who", "which"], 0, "mc", "Für Zeit kann man „when“ verwenden.");

  /* ============================================================
     8. Verb Patterns ➡️
     ============================================================ */
  addQ("Verb Patterns", "Choose: „I hope ___ you soon.“",
    ["to see", "seeing", "see"], 0, "mc", "Nach „hope“ folgt der to-infinitive.");
  addQ("Verb Patterns", "Choose: „She decided ___ at home.“",
    ["to stay", "staying", "stay"], 0, "mc", "Nach „decide“ folgt to + Grundform.");
  addQ("Verb Patterns", "Choose: „We planned ___ a party.“",
    ["to have", "having", "have"], 0, "mc", "Nach „plan“ folgt der to-infinitive.");
  addQ("Verb Patterns", "Choose: „He learned ___ a bike.“",
    ["to ride", "riding", "ride"], 0, "mc", "Nach „learn“ folgt to + Grundform.");
  addQ("Verb Patterns", "Choose: „They managed ___ the problem.“",
    ["to solve", "solving", "solve"], 0, "mc", "Nach „manage“ folgt der to-infinitive.");
  addQ("Verb Patterns", "Choose: „I want ___ a doctor one day.“",
    ["to be", "being", "be"], 0, "mc", "Nach „want“ folgt to + Grundform.");
  addQ("Verb Patterns", "Choose: „She promised ___ me later.“",
    ["to help", "helping", "help"], 0, "mc", "Nach „promise“ folgt der to-infinitive.");
  addQ("Verb Patterns", "Choose: „We agreed ___ the bill.“",
    ["to share", "sharing", "share"], 0, "mc", "Nach „agree“ folgt to + Grundform.");
  addQ("Verb Patterns", "Choose: „He offered ___ me to the station.“",
    ["to drive", "driving", "drive"], 0, "mc", "Nach „offer“ folgt der to-infinitive.");
  addQ("Verb Patterns", "Choose: „They expected ___ on time.“",
    ["to arrive", "arriving", "arrive"], 0, "mc", "Nach „expect“ folgt to + Grundform.");
  addQ("Verb Patterns", "Choose: „I forgot ___ the door.“",
    ["to lock", "locking", "lock"], 0, "mc", "Nach „forget“ kann der to-infinitive stehen.");
  addQ("Verb Patterns", "Choose: „She seems ___ tired today.“",
    ["to be", "being", "be"], 0, "mc", "Nach „seem“ folgt der to-infinitive.");
  addQ("Verb Patterns", "Choose: „We need ___ more water.“",
    ["to buy", "buying", "buy"], 0, "mc", "Nach „need“ folgt to + Grundform.");
  addQ("Verb Patterns", "Choose: „He refused ___ the question.“",
    ["to answer", "answering", "answer"], 0, "mc", "Nach „refuse“ folgt der to-infinitive.");
  addQ("Verb Patterns", "Choose: „I would like ___ a cup of tea.“",
    ["to have", "having", "have"], 0, "mc", "Nach „would like“ folgt der to-infinitive.");
  addQ("Verb Patterns", "Choose: „She tried ___ the heavy box.“",
    ["to lift", "lifts", "lift"], 0, "mc", "Nach „try“ kann der to-infinitive stehen.");
  addQ("Verb Patterns", "Choose: „We hope ___ you again next year.“",
    ["to meet", "meeting", "meet"], 0, "mc", "Nach „hope“ folgt to + Grundform.");
  addQ("Verb Patterns", "Find the to-infinitive:\n„She wants to learn Spanish.“",
    ["to learn", "wants", "Spanish"], 0, "recognize", "„to learn“ ist der to-infinitive.");
  addQ("Verb Patterns", "Find the to-infinitive:\n„They decided to go home early.“",
    ["to go", "decided", "early"], 0, "recognize", "„to go“ ist der to-infinitive.");
  addQ("Verb Patterns", "Find the to-infinitive:\n„I plan to visit my aunt.“",
    ["to visit", "plan", "aunt"], 0, "recognize", "„to visit“ ist der to-infinitive.");
  addQ("Verb Patterns", "Choose: „He decided ___ the truth.“",
    ["to tell", "telling", "tell"], 0, "mc", "Nach „decide“ folgt der to-infinitive.");
  addQ("Verb Patterns", "Choose: „We learned ___ in deep water.“",
    ["to swim", "swimming", "swim"], 0, "mc", "Nach „learn“ folgt to + Grundform.");
  addQ("Verb Patterns", "Choose: „She managed ___ the train just in time.“",
    ["to catch", "catching", "catch"], 0, "mc", "Nach „manage“ folgt der to-infinitive.");
  addQ("Verb Patterns", "Choose: „I hope ___ my exam.“",
    ["to pass", "passing", "pass"], 0, "mc", "Nach „hope“ folgt to + Grundform.");
  addQ("Verb Patterns", "Choose: „They planned ___ early in the morning.“",
    ["to leave", "leaving", "leave"], 0, "mc", "Nach „plan“ folgt der to-infinitive.");

  /* ============================================================
     9. If-Clauses 🔁 (Typ 0 / 1 / 2)
     ============================================================ */
  addQ("If-Clauses", "Type 1: „If it rains, we ___ at home.“",
    ["will stay", "stay", "would stay"], 0, "mc", "Typ 1: if + present, will + Grundform.");
  addQ("If-Clauses", "Type 1: „If you ___ hard, you will pass.“",
    ["study", "will study", "studied"], 0, "mc", "Im if-Teil steht das simple present.");
  addQ("If-Clauses", "Type 2: „If I ___ rich, I would travel the world.“",
    ["were", "am", "will be"], 0, "mc", "Typ 2: if + simple past, would + Grundform.");
  addQ("If-Clauses", "Type 2: „If she had time, she ___ help us.“",
    ["would", "will", "does"], 0, "mc", "Typ 2 (unwahrscheinlich): would + Grundform.");
  addQ("If-Clauses", "Type 0: „If you heat ice, it ___.“",
    ["melts", "will melt", "would melt"], 0, "mc", "Typ 0 (allgemeine Wahrheit): present + present.");
  addQ("If-Clauses", "Type 0 describes …",
    ["general truths", "unlikely dreams", "the past"], 0, "mc", "Typ 0 beschreibt allgemeine Tatsachen.");
  addQ("If-Clauses", "Type 1 describes …",
    ["a likely future", "an impossible past", "a general truth"], 0, "mc",
    "Typ 1: realistische Bedingung in der Zukunft.");
  addQ("If-Clauses", "Type 2 describes …",
    ["an unlikely or unreal situation", "a sure fact", "a finished action"], 0, "mc",
    "Typ 2: unwahrscheinliche oder unreale Situation.");
  addQ("If-Clauses", "Type 1: „If we hurry, we ___ the bus.“",
    ["will catch", "catch", "would catch"], 0, "mc", "Typ 1: will + Grundform.");
  addQ("If-Clauses", "Type 2: „If I ___ you, I would say sorry.“",
    ["were", "am", "will be"], 0, "mc", "Typ 2: „If I were you …“.");
  addQ("If-Clauses", "Type 1: „If you ___ now, you will be on time.“",
    ["leave", "will leave", "left"], 0, "mc", "if + present.");
  addQ("If-Clauses", "Type 2: „If he ___ harder, he would win.“",
    ["trained", "trains", "will train"], 0, "mc", "Typ 2: if + simple past.");
  addQ("If-Clauses", "Type 0: „If you mix blue and yellow, you ___ green.“",
    ["get", "will get", "would get"], 0, "mc", "Typ 0: allgemeine Tatsache → present + present.");
  addQ("If-Clauses", "Type 1: „If it ___ sunny, we will go to the beach.“",
    ["is", "will be", "were"], 0, "mc", "if + present (is).");
  addQ("If-Clauses", "Type 2: „If I won the lottery, I ___ a house.“",
    ["would buy", "will buy", "buy"], 0, "mc", "Typ 2: would + Grundform.");
  addQ("If-Clauses", "Which type is real and likely in the future?",
    ["Type 1", "Type 2", "Type 0"], 0, "mc", "Typ 1 ist die realistische Zukunftsbedingung.");
  addQ("If-Clauses", "Find the if-clause:\n„If it snows, we will build a snowman.“",
    ["If it snows", "we will build", "a snowman"], 0, "recognize", "„If it snows“ ist der Bedingungssatz.");
  addQ("If-Clauses", "Find the main clause:\n„If you ask him, he will help.“",
    ["he will help", "If you ask him", "him"], 0, "recognize", "Der Hauptsatz ist „he will help“.");
  addQ("If-Clauses", "Type 1: „If you don't hurry, you ___ late.“",
    ["will be", "are", "would be"], 0, "mc", "Typ 1: will + Grundform.");
  addQ("If-Clauses", "Type 2: „If we had a car, we ___ to the lake.“",
    ["would drive", "will drive", "drive"], 0, "mc", "Typ 2: would + Grundform.");
  addQ("If-Clauses", "Type 0: „If you press this button, the light ___ on.“",
    ["comes", "will come", "would come"], 0, "mc", "Typ 0: present + present.");
  addQ("If-Clauses", "Type 1: „If she calls, I ___ her back.“",
    ["will call", "call", "would call"], 0, "mc", "Typ 1: will + Grundform.");
  addQ("If-Clauses", "Type 2: „If I knew the answer, I ___ you.“",
    ["would tell", "will tell", "tell"], 0, "mc", "Typ 2: would + Grundform.");
  addQ("If-Clauses", "Type 1: „We will be happy if you ___.“",
    ["come", "will come", "came"], 0, "mc", "if + present (come).");
  addQ("If-Clauses", "Type 2: „If they lived nearer, we ___ them more.“",
    ["would see", "will see", "see"], 0, "mc", "Typ 2: would + Grundform.");

  /* ============================================================
     10. Modals 🚦
     ============================================================ */
  addQ("Modals", "Choose: „You ___ wear a helmet. It's the law.“",
    ["must", "needn't", "might"], 0, "mc", "„must“ = starke Pflicht (Muss).");
  addQ("Modals", "Choose: „You ___ smoke here. It's forbidden.“",
    ["mustn't", "needn't", "don't have to"], 0, "mc", "„mustn't“ = strenges Verbot (darfst nicht).");
  addQ("Modals", "Choose: „You ___ bring food; there's plenty.“",
    ["needn't", "mustn't", "must"], 0, "mc", "„needn't“ = nicht nötig (brauchst nicht).");
  addQ("Modals", "Choose: „I ___ get up early on weekdays.“",
    ["have to", "mustn't", "needn't"], 0, "mc", "„have to“ = müssen (äußere Pflicht).");
  addQ("Modals", "Choose: „It's cloudy; it ___ rain later.“",
    ["might", "must", "mustn't"], 0, "mc", "„might“ = vielleicht/möglich.");
  addQ("Modals", "Choose: „You ___ to say thank you.“",
    ["ought", "must", "might"], 0, "mc", "„ought to“ = sollte (Empfehlung).");
  addQ("Modals", "What does „mustn't“ mean?",
    ["not allowed to", "don't need to", "should"], 0, "mc", "„mustn't“ = es ist verboten.");
  addQ("Modals", "What does „needn't“ mean?",
    ["don't need to", "are not allowed to", "must"], 0, "mc", "„needn't“ = es ist nicht nötig.");
  addQ("Modals", "Choose: „We ___ to finish the project by Friday.“",
    ["have", "must to", "ought"], 0, "mc", "„have to“ (mit to) drückt Pflicht aus.");
  addQ("Modals", "Choose: „She ___ be at home; her car is here.“",
    ["must", "needn't", "mustn't"], 0, "mc", "„must“ kann auch sichere Vermutung sein.");
  addQ("Modals", "Choose: „You ___ worry; everything is fine.“",
    ["needn't", "mustn't", "must"], 0, "mc", "Kein Grund zur Sorge → needn't.");
  addQ("Modals", "Choose: „Visitors ___ touch the paintings.“",
    ["mustn't", "needn't", "might"], 0, "mc", "Verbot → mustn't.");
  addQ("Modals", "Choose: „He ___ be tired after the long trip.“",
    ["might", "mustn't", "needn't"], 0, "mc", "Vermutung/Möglichkeit → might.");
  addQ("Modals", "Choose: „You really ___ to see this film, it's great.“",
    ["ought", "must to", "might"], 0, "mc", "Empfehlung → ought to.");
  addQ("Modals", "„don't have to“ means …",
    ["it is not necessary", "it is forbidden", "you must"], 0, "mc",
    "„don't have to“ = es ist nicht nötig (kein Zwang).");
  addQ("Modals", "Choose: „Students ___ hand in homework on time.“",
    ["have to", "needn't", "mustn't"], 0, "mc", "Pflicht → have to.");
  addQ("Modals", "Find the modal verb:\n„You must be quiet in the library.“",
    ["must", "quiet", "library"], 0, "recognize", "„must“ ist das Modalverb.");
  addQ("Modals", "Find the modal verb:\n„We might go to the cinema tonight.“",
    ["might", "go", "tonight"], 0, "recognize", "„might“ ist das Modalverb.");
  addQ("Modals", "Find the modal verb:\n„You ought to apologise.“",
    ["ought to", "apologise", "you"], 0, "recognize", "„ought to“ ist das Modalverb.");
  addQ("Modals", "Choose: „It ___ snow tomorrow, but I'm not sure.“",
    ["might", "must", "mustn't"], 0, "mc", "Unsicherheit → might.");
  addQ("Modals", "Choose: „You ___ pay now; you can pay later.“",
    ["needn't", "mustn't", "must"], 0, "mc", "Nicht nötig → needn't.");
  addQ("Modals", "Choose: „Drivers ___ stop at a red light.“",
    ["must", "needn't", "might"], 0, "mc", "Pflicht → must.");
  addQ("Modals", "Choose: „You ___ be late; the test starts at nine.“",
    ["mustn't", "needn't", "might"], 0, "mc", "Verbot/Warnung → mustn't.");
  addQ("Modals", "Choose: „I ___ wear a uniform at my school.“",
    ["have to", "mustn't", "might"], 0, "mc", "Äußere Pflicht → have to.");
  addQ("Modals", "Choose: „She ___ to call her parents more often.“",
    ["ought", "must to", "might"], 0, "mc", "Empfehlung → ought to.");

  /* ============================================================
     11. Present Tenses 🕒 (simple present vs present progressive)
     ============================================================ */
  addQ("Present Tenses", "Choose: „She ___ to school every day.“",
    ["goes", "is going", "go"], 0, "mc", "Gewohnheit → simple present (goes).");
  addQ("Present Tenses", "Choose: „Look! The baby ___.“",
    ["is sleeping", "sleeps", "sleep"], 0, "mc", "Gerade jetzt → present progressive.");
  addQ("Present Tenses", "Choose: „We usually ___ dinner at seven.“",
    ["have", "are having", "has"], 0, "mc", "„usually“ → simple present.");
  addQ("Present Tenses", "Choose: „Right now I ___ my homework.“",
    ["am doing", "do", "does"], 0, "mc", "„right now“ → present progressive.");
  addQ("Present Tenses", "Choose: „He ___ football on Mondays.“",
    ["plays", "is playing", "play"], 0, "mc", "Regelmäßig → simple present.");
  addQ("Present Tenses", "Choose: „Listen! Someone ___ at the door.“",
    ["is knocking", "knocks", "knock"], 0, "mc", "Im Moment → present progressive.");
  addQ("Present Tenses", "Which word goes with present progressive?",
    ["now", "always", "every day"], 0, "mc", "„now“, „at the moment“, „Look!“, „Listen!“.");
  addQ("Present Tenses", "Which word goes with simple present?",
    ["always", "now", "at the moment"], 0, "mc", "„always“, „usually“, „every day“ → simple present.");
  addQ("Present Tenses", "Choose: „The sun ___ in the east.“",
    ["rises", "is rising", "rise"], 0, "mc", "Allgemeine Tatsache → simple present.");
  addQ("Present Tenses", "Choose: „They ___ TV at the moment.“",
    ["are watching", "watch", "watches"], 0, "mc", "„at the moment“ → present progressive.");
  addQ("Present Tenses", "Choose: „My mum ___ in a hospital.“",
    ["works", "is working", "work"], 0, "mc", "Dauerhafte Tatsache → simple present.");
  addQ("Present Tenses", "Choose: „Be quiet! I ___ to study.“",
    ["am trying", "try", "tries"], 0, "mc", "Gerade jetzt → present progressive.");
  addQ("Present Tenses", "Choose: „Water ___ at 100 °C.“",
    ["boils", "is boiling", "boil"], 0, "mc", "Naturgesetz → simple present.");
  addQ("Present Tenses", "Choose: „Where are you? — I ___ the bus.“",
    ["am taking", "take", "takes"], 0, "mc", "Im Moment → present progressive.");
  addQ("Present Tenses", "Choose: „He never ___ late for school.“",
    ["is", "is being", "be"], 0, "mc", "„never“ → simple present.");
  addQ("Present Tenses", "Choose: „We ___ a film right now.“",
    ["are watching", "watch", "watches"], 0, "mc", "„right now“ → present progressive.");
  addQ("Present Tenses", "Find the present progressive:\n„She is cooking dinner now.“",
    ["is cooking", "dinner", "now"], 0, "recognize", "is + cooking = present progressive.");
  addQ("Present Tenses", "Find the simple present:\n„He reads a book every evening.“",
    ["reads", "book", "evening"], 0, "recognize", "reads = simple present.");
  addQ("Present Tenses", "Find the present progressive:\n„They are playing in the garden.“",
    ["are playing", "garden", "in"], 0, "recognize", "are + playing = present progressive.");
  addQ("Present Tenses", "Choose: „I ___ coffee every morning.“",
    ["drink", "am drinking", "drinks"], 0, "mc", "„every morning“ → simple present.");
  addQ("Present Tenses", "Choose: „She ___ a shower at the moment.“",
    ["is having", "has", "have"], 0, "mc", "„at the moment“ → present progressive.");
  addQ("Present Tenses", "Choose: „Dogs ___ four legs.“",
    ["have", "are having", "has"], 0, "mc", "Allgemeine Tatsache → simple present.");
  addQ("Present Tenses", "Choose: „Why ___ you crying?“",
    ["are", "do", "is"], 0, "mc", "Im Moment → present progressive (are crying).");
  addQ("Present Tenses", "Choose: „He often ___ his grandparents.“",
    ["visits", "is visiting", "visit"], 0, "mc", "„often“ → simple present.");
  addQ("Present Tenses", "Choose: „We ___ for the exam this week.“",
    ["are studying", "study", "studies"], 0, "mc", "Vorübergehend, gerade in dieser Woche → present progressive.");

  /* ============================================================
     12. Ireland ☘️
     ============================================================ */
  addQ("Ireland", "What is the capital of the Republic of Ireland?",
    ["Dublin", "Belfast", "London"], 0, "mc", "Dublin ist die Hauptstadt der Republik Irland.");
  addQ("Ireland", "The Great Famine was mainly caused by a disease of the …",
    ["potato", "wheat", "rice"], 0, "mc", "Die Kartoffelfäule führte zur Großen Hungersnot (1845).");
  addQ("Ireland", "A national symbol of Ireland is the …",
    ["shamrock", "rose", "thistle"], 0, "mc", "Das Kleeblatt (shamrock) ist ein Symbol Irlands.");
  addQ("Ireland", "The sea between Ireland and Great Britain is the …",
    ["Irish Sea", "North Sea", "Baltic Sea"], 0, "mc", "Die Irische See trennt Irland und Großbritannien.");
  addQ("Ireland", "To leave your home country to live abroad is to …",
    ["emigrate", "translate", "celebrate"], 0, "mc", "emigrate = auswandern.");
  addQ("Ireland", "What does „coast“ mean?",
    ["Küste", "Berg", "Fluss"], 0, "mc", "coast = Küste.");
  addQ("Ireland", "What does „famine“ mean?",
    ["Hungersnot", "Festmahl", "Ernte"], 0, "mc", "famine = Hungersnot.");
  addQ("Ireland", "What does „ship“ mean?",
    ["Schiff", "Hafen", "Welle"], 0, "mc", "ship = Schiff.");
  addQ("Ireland", "What does „journey“ mean?",
    ["Reise", "Tag", "Karte"], 0, "mc", "journey = Reise.");
  addQ("Ireland", "Many Irish people emigrated to North America by …",
    ["ship", "plane", "train"], 0, "mc", "Im 19. Jahrhundert reiste man mit dem Schiff.");
  addQ("Ireland", "The Irish nickname for Ireland is the „Emerald ___“.",
    ["Isle", "Sea", "City"], 0, "mc", "„Emerald Isle“ = die smaragdgrüne Insel (wegen der grünen Landschaft).");
  addQ("Ireland", "What does „green“ mean?",
    ["grün", "blau", "grau"], 0, "mc", "green = grün; Irland ist für sein Grün bekannt.");
  addQ("Ireland", "A famous Irish holiday on 17 March is …",
    ["St Patrick's Day", "Thanksgiving", "Boxing Day"], 0, "mc", "Der St Patrick's Day ist Irlands Nationalfeiertag.");
  addQ("Ireland", "What does „island“ mean?",
    ["Insel", "Hügel", "Wald"], 0, "mc", "island = Insel.");
  addQ("Ireland", "The official languages of Ireland are English and …",
    ["Irish", "French", "Welsh"], 0, "mc", "Neben Englisch ist Irisch (Gaeilge) Amtssprache.");
  addQ("Ireland", "What does „harbour“ mean?",
    ["Hafen", "Strand", "Brücke"], 0, "mc", "harbour = Hafen.");
  addQ("Ireland", "What does „weather“ mean?",
    ["Wetter", "Wasser", "Wind"], 0, "mc", "weather = Wetter; in Irland regnet es oft.");
  addQ("Ireland", "The currency used in the Republic of Ireland is the …",
    ["euro", "pound", "dollar"], 0, "mc", "Die Republik Irland nutzt den Euro.");
  addQ("Ireland", "What does „cliff“ mean?",
    ["Klippe", "Wiese", "Höhle"], 0, "mc", "cliff = Klippe; Irland hat hohe Steilküsten.");
  addQ("Ireland", "Northern Ireland is a part of the …",
    ["United Kingdom", "Republic of Ireland", "European Union only"], 0, "mc",
    "Nordirland gehört zum Vereinigten Königreich.");
  addQ("Ireland", "What does „farmer“ mean?",
    ["Bauer", "Fischer", "Lehrer"], 0, "mc", "farmer = Bauer/Landwirt.");
  addQ("Ireland", "Find the country word:\n„Many people in Ireland speak English.“",
    ["Ireland", "people", "speak"], 0, "recognize", "„Ireland“ ist das Land.");
  addQ("Ireland", "What does „crop“ mean?",
    ["Ernte", "Wolke", "Hügel"], 0, "mc", "crop = Ernte/Feldfrucht.");
  addQ("Ireland", "What does „field“ mean?",
    ["Feld", "Stadt", "Fluss"], 0, "mc", "field = Feld.");
  addQ("Ireland", "A traditional Irish dance is called Irish …",
    ["dancing", "running", "cooking"], 0, "mc", "„Irish dancing“ ist ein bekannter Volkstanz.");

  /* ============================================================
     13. Life in the USA 🗽
     ============================================================ */
  addQ("Life in the USA", "What is the capital of the USA?",
    ["Washington, D.C.", "New York", "Los Angeles"], 0, "mc", "Die Hauptstadt ist Washington, D.C.");
  addQ("Life in the USA", "How many states does the USA have?",
    ["50", "48", "52"], 0, "mc", "Die USA bestehen aus 50 Bundesstaaten.");
  addQ("Life in the USA", "The flag of the USA is called the „Stars and ___“.",
    ["Stripes", "Circles", "Dots"], 0, "mc", "Die Flagge heißt „Stars and Stripes“ (Sterne und Streifen).");
  addQ("Life in the USA", "The currency in the USA is the …",
    ["dollar", "euro", "pound"], 0, "mc", "In den USA zahlt man mit Dollar.");
  addQ("Life in the USA", "What does „skyscraper“ mean?",
    ["Wolkenkratzer", "Bahnhof", "Brücke"], 0, "mc", "skyscraper = Wolkenkratzer.");
  addQ("Life in the USA", "A famous statue in New York is the Statue of …",
    ["Liberty", "Victory", "Peace"], 0, "mc", "Die Freiheitsstatue (Statue of Liberty) steht in New York.");
  addQ("Life in the USA", "What does „freedom“ mean?",
    ["Freiheit", "Frieden", "Freude"], 0, "mc", "freedom = Freiheit.");
  addQ("Life in the USA", "An American autumn holiday with turkey is …",
    ["Thanksgiving", "Easter", "Halloween"], 0, "mc", "Thanksgiving wird im November gefeiert.");
  addQ("Life in the USA", "What does „highway“ mean?",
    ["Autobahn", "Gehweg", "Tunnel"], 0, "mc", "highway = (Fern-)Straße/Autobahn.");
  addQ("Life in the USA", "In American English, „autumn“ is usually called …",
    ["fall", "spring", "winter"], 0, "mc", "Im amerikanischen Englisch sagt man „fall“ für Herbst.");
  addQ("Life in the USA", "American English for „lift“ (the device) is …",
    ["elevator", "ladder", "stairs"], 0, "mc", "elevator = Aufzug (BE: lift).");
  addQ("Life in the USA", "American English for „autumn holidays' candy night“ is …",
    ["Halloween", "Easter", "Carnival"], 0, "mc", "Halloween wird am 31. Oktober gefeiert.");
  addQ("Life in the USA", "What does „neighbourhood“ mean?",
    ["Nachbarschaft", "Krankenhaus", "Bahnhof"], 0, "mc", "neighbourhood = Nachbarschaft/Viertel.");
  addQ("Life in the USA", "The big national park with geysers is …",
    ["Yellowstone", "Central Park", "Hyde Park"], 0, "mc", "Der Yellowstone-Nationalpark ist berühmt für Geysire.");
  addQ("Life in the USA", "American English for „petrol“ is …",
    ["gas", "oil", "fuel can"], 0, "mc", "gas (gasoline) = Benzin (BE: petrol).");
  addQ("Life in the USA", "What does „downtown“ mean?",
    ["Stadtzentrum", "Vorort", "Dorf"], 0, "mc", "downtown = Innenstadt/Stadtzentrum.");
  addQ("Life in the USA", "American English for „pavement“ is …",
    ["sidewalk", "highway", "crossing"], 0, "mc", "sidewalk = Gehweg (BE: pavement).");
  addQ("Life in the USA", "What does „desert“ mean?",
    ["Wüste", "Insel", "Berg"], 0, "mc", "desert = Wüste (es gibt z. B. die Mojave-Wüste).");
  addQ("Life in the USA", "Find the country word:\n„My cousin lives in the USA.“",
    ["USA", "cousin", "lives"], 0, "recognize", "„USA“ ist das Land.");
  addQ("Life in the USA", "What does „burger“ mean?",
    ["Frikadellenbrötchen", "Suppe", "Salat"], 0, "mc", "burger = ein typisch amerikanisches Gericht im Brötchen.");
  addQ("Life in the USA", "American football is played with a ball that is …",
    ["oval", "round", "square"], 0, "mc", "Der Football-Ball hat eine ovale Form.");
  addQ("Life in the USA", "What does „coast“ mean?",
    ["Küste", "Wald", "Tal"], 0, "mc", "coast = Küste; die USA haben eine Ost- und Westküste.");
  addQ("Life in the USA", "The president of the USA lives in the White …",
    ["House", "Tower", "Hall"], 0, "mc", "Der Präsident wohnt im Weißen Haus (White House).");
  addQ("Life in the USA", "What does „state“ mean?",
    ["Bundesstaat", "Stadt", "Straße"], 0, "mc", "state = Bundesstaat.");
  addQ("Life in the USA", "American English for „autumn term break shopping day“ after Thanksgiving is …",
    ["Black Friday", "Boxing Day", "May Day"], 0, "mc", "Am Black Friday gibt es viele Rabatte.");

  /* ============================================================
     14. School 🏫
     ============================================================ */
  addQ("School", "What does „timetable“ mean?",
    ["Stundenplan", "Klassenraum", "Pause"], 0, "mc", "timetable = Stundenplan.");
  addQ("School", "What does „break“ mean (at school)?",
    ["Pause", "Note", "Heft"], 0, "mc", "break = (Schul-)Pause.");
  addQ("School", "What does „subject“ mean?",
    ["Schulfach", "Klasse", "Lehrer"], 0, "mc", "subject = (Schul-)Fach.");
  addQ("School", "What does „homework“ mean?",
    ["Hausaufgaben", "Klassenarbeit", "Pause"], 0, "mc", "homework = Hausaufgaben.");
  addQ("School", "What does „classmate“ mean?",
    ["Mitschüler", "Lehrer", "Direktor"], 0, "mc", "classmate = Mitschüler(in).");
  addQ("School", "What does „blackboard“ mean?",
    ["Tafel", "Tisch", "Tür"], 0, "mc", "blackboard = (Schul-)Tafel.");
  addQ("School", "What does „pupil“ mean?",
    ["Schüler", "Lehrer", "Eltern"], 0, "mc", "pupil = Schüler(in).");
  addQ("School", "What does „teacher“ mean?",
    ["Lehrer", "Schüler", "Hausmeister"], 0, "mc", "teacher = Lehrer(in).");
  addQ("School", "What does „mark“ / „grade“ mean?",
    ["Note", "Pause", "Fach"], 0, "mc", "mark/grade = (Schul-)Note.");
  addQ("School", "What does „lesson“ mean?",
    ["Unterrichtsstunde", "Mittagessen", "Ferien"], 0, "mc", "lesson = (Unterrichts-)Stunde.");
  addQ("School", "What does „uniform“ mean?",
    ["Schuluniform", "Schultasche", "Stundenplan"], 0, "mc", "uniform = (Schul-)Uniform.");
  addQ("School", "What does „canteen“ mean?",
    ["Mensa", "Turnhalle", "Bibliothek"], 0, "mc", "canteen = Mensa/Kantine.");
  addQ("School", "What does „library“ mean?",
    ["Bibliothek", "Klassenzimmer", "Sekretariat"], 0, "mc", "library = Bibliothek/Bücherei.");
  addQ("School", "What does „headteacher“ mean?",
    ["Schulleiter", "Klassensprecher", "Hausmeister"], 0, "mc", "headteacher = Schulleiter(in).");
  addQ("School", "What does „term“ mean?",
    ["Schulhalbjahr", "Pause", "Note"], 0, "mc", "term = Schulhalbjahr/Trimester.");
  addQ("School", "Choose the right verb: „We ___ maths on Mondays.“",
    ["have", "do", "make"], 0, "mc", "„to have a lesson/subject“ = ein Fach haben.");
  addQ("School", "Choose: „Don't forget to ___ your homework.“",
    ["do", "make", "write down"], 0, "mc", "„do your homework“ ist die feste Wendung.");
  addQ("School", "What does „exam“ / „test“ mean?",
    ["Prüfung", "Pause", "Heft"], 0, "mc", "exam/test = Prüfung/Test.");
  addQ("School", "Find the school word:\n„My favourite subject is biology.“",
    ["subject", "favourite", "is"], 0, "recognize", "„subject“ ist das Schulwort.");
  addQ("School", "Find the school word:\n„The teacher wrote on the board.“",
    ["teacher", "wrote", "on"], 0, "recognize", "„teacher“ ist das Schulwort.");
  addQ("School", "What does „desk“ mean?",
    ["Schreibtisch", "Tafel", "Tür"], 0, "mc", "desk = Pult/Schreibtisch.");
  addQ("School", "What does „rubber“ / „eraser“ mean?",
    ["Radiergummi", "Lineal", "Heft"], 0, "mc", "rubber (BE) / eraser (AE) = Radiergummi.");
  addQ("School", "What does „ruler“ mean?",
    ["Lineal", "Schere", "Kleber"], 0, "mc", "ruler = Lineal.");
  addQ("School", "What does „break time“ usually mean?",
    ["Pausenzeit", "Hausaufgabenzeit", "Ferienzeit"], 0, "mc", "break time = die Zeit für die Pause.");
  addQ("School", "What does „report“ (school) mean?",
    ["Zeugnis", "Heft", "Tafel"], 0, "mc", "(school) report = Zeugnis.");

  /* ============================================================
     15. Youth Culture 🎧
     ============================================================ */
  addQ("Youth Culture", "What does „hobby“ mean?",
    ["Hobby", "Hausaufgabe", "Beruf"], 0, "mc", "hobby = Freizeitbeschäftigung.");
  addQ("Youth Culture", "What does „band“ mean?",
    ["Musikgruppe", "Mannschaft", "Klasse"], 0, "mc", "band = (Musik-)Band.");
  addQ("Youth Culture", "What does „fan“ mean?",
    ["Anhänger", "Gegner", "Trainer"], 0, "mc", "fan = Fan/Anhänger.");
  addQ("Youth Culture", "What does „concert“ mean?",
    ["Konzert", "Museum", "Bücherei"], 0, "mc", "concert = Konzert.");
  addQ("Youth Culture", "What does „smartphone“ mean?",
    ["Smartphone", "Fernseher", "Kamera"], 0, "mc", "smartphone = Smartphone (Handy mit Computerfunktionen).");
  addQ("Youth Culture", "What does „to chat“ mean?",
    ["plaudern/chatten", "rennen", "kochen"], 0, "mc", "to chat = chatten/plaudern.");
  addQ("Youth Culture", "What does „post“ (online) mean?",
    ["Beitrag", "Brief", "Paket"], 0, "mc", "post = (Online-)Beitrag.");
  addQ("Youth Culture", "What does „follower“ mean?",
    ["Abonnent", "Lehrer", "Nachbar"], 0, "mc", "follower = jemand, der dir online folgt.");
  addQ("Youth Culture", "What does „playlist“ mean?",
    ["Wiedergabeliste", "Stundenplan", "Einkaufsliste"], 0, "mc", "playlist = Liste mit Liedern.");
  addQ("Youth Culture", "What does „to download“ mean?",
    ["herunterladen", "hochladen", "löschen"], 0, "mc", "to download = herunterladen.");
  addQ("Youth Culture", "What does „to upload“ mean?",
    ["hochladen", "herunterladen", "drucken"], 0, "mc", "to upload = hochladen.");
  addQ("Youth Culture", "What does „screen“ mean?",
    ["Bildschirm", "Tastatur", "Kabel"], 0, "mc", "screen = Bildschirm.");
  addQ("Youth Culture", "What does „to share“ mean?",
    ["teilen", "kaufen", "verstecken"], 0, "mc", "to share = teilen.");
  addQ("Youth Culture", "What does „skateboard“ mean?",
    ["Skateboard", "Fahrrad", "Roller"], 0, "mc", "skateboard = Skateboard.");
  addQ("Youth Culture", "What does „youth club“ mean?",
    ["Jugendclub", "Sportverein", "Schulhof"], 0, "mc", "youth club = Jugendclub/Jugendtreff.");
  addQ("Youth Culture", "What does „free time“ mean?",
    ["Freizeit", "Arbeitszeit", "Schulzeit"], 0, "mc", "free time = Freizeit.");
  addQ("Youth Culture", "What does „to hang out“ mean?",
    ["abhängen/Zeit verbringen", "aufhängen", "wegwerfen"], 0, "mc", "to hang out = (locker) Zeit verbringen.");
  addQ("Youth Culture", "Find the free-time word:\n„We watched a film at the cinema.“",
    ["cinema", "watched", "film"], 0, "recognize", "„cinema“ ist der Freizeit-Ort.");
  addQ("Youth Culture", "Find the music word:\n„My sister plays in a band.“",
    ["band", "sister", "plays"], 0, "recognize", "„band“ ist das Musikwort.");
  addQ("Youth Culture", "What does „streaming“ mean?",
    ["Streamen (Online-Abspielen)", "Drucken", "Speichern"], 0, "mc", "streaming = Filme/Musik online abspielen.");
  addQ("Youth Culture", "What does „headphones“ mean?",
    ["Kopfhörer", "Lautsprecher", "Mikrofon"], 0, "mc", "headphones = Kopfhörer.");
  addQ("Youth Culture", "What does „to text“ mean?",
    ["eine Nachricht schreiben", "telefonieren", "vorlesen"], 0, "mc", "to text = eine (SMS-)Nachricht senden.");
  addQ("Youth Culture", "What does „trend“ mean?",
    ["Trend", "Regel", "Strafe"], 0, "mc", "trend = Trend/Modeerscheinung.");
  addQ("Youth Culture", "What does „skateboarding“ mean?",
    ["Skateboardfahren", "Schwimmen", "Klettern"], 0, "mc", "skateboarding = das Fahren mit dem Skateboard.");
  addQ("Youth Culture", "What does „comic“ mean?",
    ["Comicheft", "Roman", "Wörterbuch"], 0, "mc", "comic = Comicheft.");

  /* ============================================================
     16. Britain & History 🏰
     ============================================================ */
  addQ("Britain & History", "What is the capital of the United Kingdom?",
    ["London", "Edinburgh", "Cardiff"], 0, "mc", "London ist die Hauptstadt des Vereinigten Königreichs.");
  addQ("Britain & History", "Which countries form Great Britain?",
    ["England, Scotland, Wales", "England and Ireland", "England and France"], 0, "mc",
    "Großbritannien besteht aus England, Schottland und Wales.");
  addQ("Britain & History", "The currency in the UK is the …",
    ["pound", "euro", "dollar"], 0, "mc", "In Großbritannien zahlt man mit Pfund (pound).");
  addQ("Britain & History", "What does „castle“ mean?",
    ["Burg/Schloss", "Kirche", "Markt"], 0, "mc", "castle = Burg/Schloss.");
  addQ("Britain & History", "What does „king“ mean?",
    ["König", "Ritter", "Bauer"], 0, "mc", "king = König.");
  addQ("Britain & History", "What does „queen“ mean?",
    ["Königin", "Prinzessin", "Dienerin"], 0, "mc", "queen = Königin.");
  addQ("Britain & History", "What does „castle wall“ mean?",
    ["Burgmauer", "Schulhof", "Marktplatz"], 0, "mc", "castle wall = Burgmauer.");
  addQ("Britain & History", "What does „knight“ mean?",
    ["Ritter", "Bauer", "Händler"], 0, "mc", "knight = Ritter.");
  addQ("Britain & History", "What does „century“ mean?",
    ["Jahrhundert", "Jahrzehnt", "Jahr"], 0, "mc", "century = Jahrhundert.");
  addQ("Britain & History", "The capital of Scotland is …",
    ["Edinburgh", "London", "Belfast"], 0, "mc", "Edinburgh ist die Hauptstadt Schottlands.");
  addQ("Britain & History", "The capital of Wales is …",
    ["Cardiff", "Dublin", "Glasgow"], 0, "mc", "Cardiff ist die Hauptstadt von Wales.");
  addQ("Britain & History", "What does „crown“ mean?",
    ["Krone", "Schwert", "Schild"], 0, "mc", "crown = Krone.");
  addQ("Britain & History", "A famous clock tower in London is „Big ___“.",
    ["Ben", "John", "Tom"], 0, "mc", "„Big Ben“ ist die berühmte Glocke/der Turm am Parlament.");
  addQ("Britain & History", "What does „bridge“ mean?",
    ["Brücke", "Turm", "Tor"], 0, "mc", "bridge = Brücke.");
  addQ("Britain & History", "The big river that runs through London is the …",
    ["Thames", "Rhine", "Seine"], 0, "mc", "Die Themse (Thames) fließt durch London.");
  addQ("Britain & History", "What does „tower“ mean?",
    ["Turm", "Brücke", "Mauer"], 0, "mc", "tower = Turm.");
  addQ("Britain & History", "The UK is ruled by a parliament and a …",
    ["king or queen", "president", "mayor"], 0, "mc", "Das Vereinigte Königreich ist eine Monarchie.");
  addQ("Britain & History", "What does „palace“ mean?",
    ["Palast", "Bahnhof", "Garten"], 0, "mc", "palace = Palast (z. B. Buckingham Palace).");
  addQ("Britain & History", "Find the history word:\n„The old castle is on a hill.“",
    ["castle", "old", "hill"], 0, "recognize", "„castle“ ist das Geschichts-Wort.");
  addQ("Britain & History", "Find the country word:\n„She comes from Scotland.“",
    ["Scotland", "comes", "from"], 0, "recognize", "„Scotland“ ist das Land(es-Teil).");
  addQ("Britain & History", "What does „flag“ mean?",
    ["Flagge", "Krone", "Kanone"], 0, "mc", "flag = Flagge; die britische Flagge heißt „Union Jack“.");
  addQ("Britain & History", "The flag of the UK is called the …",
    ["Union Jack", "Stars and Stripes", "Tricolour"], 0, "mc", "Die britische Flagge heißt Union Jack.");
  addQ("Britain & History", "What does „war“ mean?",
    ["Krieg", "Frieden", "Spiel"], 0, "mc", "war = Krieg.");
  addQ("Britain & History", "What does „battle“ mean?",
    ["Schlacht", "Reise", "Vertrag"], 0, "mc", "battle = Schlacht/Gefecht.");
  addQ("Britain & History", "What does „empire“ mean?",
    ["Reich/Imperium", "Dorf", "Schule"], 0, "mc", "empire = (Welt-)Reich; früher das British Empire.");

  /* ============================================================
     17. Everyday English 💬 (asking the way, complaining, phone)
     ============================================================ */
  addQ("Everyday English", "Asking the way: „Excuse me, how do I ___ to the station?“",
    ["get", "make", "do"], 0, "mc", "„How do I get to …?“ ist die Standardfrage nach dem Weg.");
  addQ("Everyday English", "Directions: „___ left at the bank.“",
    ["Turn", "Go up", "Make"], 0, "mc", "„Turn left/right“ = links/rechts abbiegen.");
  addQ("Everyday English", "Directions: „Go ___ ahead until the lights.“",
    ["straight", "left", "down"], 0, "mc", "„go straight ahead“ = geradeaus gehen.");
  addQ("Everyday English", "On the phone: „Hello, ___ I speak to Tom, please?“",
    ["can", "do", "am"], 0, "mc", "„Can I speak to …?“ ist eine höfliche Telefonfrage.");
  addQ("Everyday English", "On the phone: „Who's ___, please?“",
    ["calling", "phoning to", "speak"], 0, "mc", "„Who's calling?“ = Wer ist am Apparat?");
  addQ("Everyday English", "Polite request: „___ you help me, please?“",
    ["Could", "Do", "Are"], 0, "mc", "„Could you …?“ ist eine höfliche Bitte.");
  addQ("Everyday English", "Complaining: „I'm sorry, but this soup is ___.“",
    ["cold", "coldly", "colder"], 0, "mc", "Nach „is“ steht das Adjektiv: cold.");
  addQ("Everyday English", "Complaining politely starts with …",
    ["Excuse me, …", "Hey you!", "Go away!"], 0, "mc", "Höfliche Beschwerden beginnen z. B. mit „Excuse me“.");
  addQ("Everyday English", "Asking the way: „Is it ___ from here?“",
    ["far", "fast", "fun"], 0, "mc", "„Is it far?“ = Ist es weit?");
  addQ("Everyday English", "Directions: „It's ___ to the supermarket.“",
    ["next", "near", "soon"], 0, "mc", "„next to“ = neben.");
  addQ("Everyday English", "On the phone: „Can I ___ a message?“",
    ["leave", "make", "do"], 0, "mc", "„leave a message“ = eine Nachricht hinterlassen.");
  addQ("Everyday English", "Polite answer: „Yes, of ___.“",
    ["course", "way", "time"], 0, "mc", "„Of course“ = natürlich/gerne.");
  addQ("Everyday English", "Complaining: „Excuse me, my order is ___.“ (falsch)",
    ["wrong", "long", "strong"], 0, "mc", "wrong = falsch.");
  addQ("Everyday English", "Asking the way: „Which ___ is the museum?“",
    ["way", "time", "much"], 0, "mc", "„Which way …?“ = In welche Richtung …?");
  addQ("Everyday English", "Saying sorry: „I'm really ___ about that.“",
    ["sorry", "happy", "late"], 0, "mc", "„I'm sorry“ = Entschuldigung/es tut mir leid.");
  addQ("Everyday English", "On the phone: „___ on a moment, please.“",
    ["Hold", "Stop", "Wait at"], 0, "mc", "„Hold on“ = einen Moment bleiben/warten.");
  addQ("Everyday English", "Directions: „Take the ___ turning on the right.“",
    ["second", "two", "twice"], 0, "mc", "Ordnungszahl: the second turning.");
  addQ("Everyday English", "Shopping: „How ___ is this T-shirt?“",
    ["much", "many", "long"], 0, "mc", "„How much …?“ fragt nach dem Preis.");
  addQ("Everyday English", "Find the polite word:\n„Could you repeat that, please?“",
    ["please", "repeat", "that"], 0, "recognize", "„please“ macht die Bitte höflich.");
  addQ("Everyday English", "Find the direction word:\n„Turn left at the church.“",
    ["left", "Turn", "church"], 0, "recognize", "„left“ ist die Richtungsangabe.");
  addQ("Everyday English", "Complaining: „This room is too ___; can I have a quieter one?“",
    ["noisy", "noise", "noisily"], 0, "mc", "Adjektiv nach „too“: noisy.");
  addQ("Everyday English", "On the phone: „I'll ___ you back later.“",
    ["call", "ring at", "speak"], 0, "mc", "„call you back“ = zurückrufen.");
  addQ("Everyday English", "Asking the way: „Go ___ the bridge.“",
    ["over", "in", "at"], 0, "mc", "„over the bridge“ = über die Brücke.");
  addQ("Everyday English", "Polite: „___ me, where is the toilet?“",
    ["Excuse", "Sorry for", "Please of"], 0, "mc", "„Excuse me“ leitet eine höfliche Frage ein.");
  addQ("Everyday English", "Thanking: „Thank you very ___.“",
    ["much", "many", "more"], 0, "mc", "„Thank you very much“ ist die feste Wendung.");

  /* ============================================================
     18. Word Skills 🧩 (synonyms / opposites / word patterns)
     ============================================================ */
  addQ("Word Skills", "Which word is a synonym of „big“?",
    ["large", "small", "short"], 0, "mc", "big und large bedeuten beide „groß“.");
  addQ("Word Skills", "Which word is the opposite of „happy“?",
    ["sad", "glad", "kind"], 0, "mc", "Das Gegenteil von happy ist sad.");
  addQ("Word Skills", "Which word is a synonym of „fast“?",
    ["quick", "slow", "late"], 0, "mc", "fast und quick bedeuten beide „schnell“.");
  addQ("Word Skills", "Which word is the opposite of „hot“?",
    ["cold", "warm", "cool"], 0, "mc", "Das klare Gegenteil von hot ist cold.");
  addQ("Word Skills", "Which word is a synonym of „start“?",
    ["begin", "stop", "end"], 0, "mc", "start und begin bedeuten „anfangen“.");
  addQ("Word Skills", "Which word is the opposite of „buy“?",
    ["sell", "pay", "shop"], 0, "mc", "Das Gegenteil von buy (kaufen) ist sell (verkaufen).");
  addQ("Word Skills", "The opposite of „open“ is …",
    ["close", "lock up", "begin"], 0, "mc", "Das Gegenteil von open ist close.");
  addQ("Word Skills", "A synonym of „nice“ is …",
    ["pleasant", "boring", "ugly"], 0, "mc", "nice und pleasant bedeuten „angenehm/nett“.");
  addQ("Word Skills", "The opposite of „easy“ is …",
    ["difficult", "simple", "light"], 0, "mc", "Das Gegenteil von easy ist difficult.");
  addQ("Word Skills", "The opposite of „old“ (things) is …",
    ["new", "young", "fresh"], 0, "mc", "Bei Dingen ist das Gegenteil von old → new.");
  addQ("Word Skills", "Make a noun: „happy“ → „___“.",
    ["happiness", "happily", "happier"], 0, "mc", "Suffix -ness bildet das Nomen: happiness.");
  addQ("Word Skills", "Make an adverb: „quick“ → „___“.",
    ["quickly", "quickness", "quicker"], 0, "mc", "Suffix -ly bildet das Adverb: quickly.");
  addQ("Word Skills", "Make an opposite with a prefix: „happy“ → „___“.",
    ["unhappy", "dishappy", "inhappy"], 0, "mc", "Das Präfix un- verneint: unhappy.");
  addQ("Word Skills", "Make an opposite with a prefix: „possible“ → „___“.",
    ["impossible", "unpossible", "dispossible"], 0, "mc", "Vor „p“ steht oft im-: impossible.");
  addQ("Word Skills", "Make a noun: „teach“ → „___“ (the person).",
    ["teacher", "teaching", "taught"], 0, "mc", "Suffix -er für die handelnde Person: teacher.");
  addQ("Word Skills", "A synonym of „begin“ is …",
    ["start", "finish", "leave"], 0, "mc", "begin und start sind Synonyme.");
  addQ("Word Skills", "The opposite of „rich“ is …",
    ["poor", "kind", "tall"], 0, "mc", "Das Gegenteil von rich ist poor.");
  addQ("Word Skills", "A synonym of „smart“ is …",
    ["clever", "lazy", "weak"], 0, "mc", "smart und clever bedeuten „klug“.");
  addQ("Word Skills", "Find the adjective:\n„She has a beautiful voice.“",
    ["beautiful", "voice", "has"], 0, "recognize", "„beautiful“ beschreibt das Nomen (Adjektiv).");
  addQ("Word Skills", "Find the adverb:\n„He runs quickly.“",
    ["quickly", "runs", "He"], 0, "recognize", "„quickly“ beschreibt das Verb (Adverb).");
  addQ("Word Skills", "Make an adjective: „care“ → „___“ (full of care).",
    ["careful", "carely", "careness"], 0, "mc", "Suffix -ful: careful (voller Sorgfalt).");
  addQ("Word Skills", "Make an adjective: „care“ → „___“ (without care).",
    ["careless", "carefull", "careness"], 0, "mc", "Suffix -less: careless (ohne Sorgfalt).");
  addQ("Word Skills", "The opposite of „high“ is …",
    ["low", "tall", "deep"], 0, "mc", "Das Gegenteil von high ist low.");
  addQ("Word Skills", "A synonym of „angry“ is …",
    ["cross", "calm", "kind"], 0, "mc", "angry und cross bedeuten „wütend/verärgert“.");
  addQ("Word Skills", "The opposite of „win“ is …",
    ["lose", "play", "score"], 0, "mc", "Das Gegenteil von win ist lose.");

  /* ---------------- „Mein Wortschatz" (LOKAL, privat) ---------------- */
  if (window.CUSTOM_VOCAB && Array.isArray(window.CUSTOM_VOCAB)) {
    const V = window.CUSTOM_VOCAB.filter((p) => Array.isArray(p) && p.length >= 2 && p[0] && p[1]);
    V.forEach(([en, de], i) => {
      const others = shuffle(V.filter((_, j) => j !== i).map((p) => p[1]));
      const opts = [de];
      for (const o of others) { if (opts.length >= 3) break; if (!opts.includes(o)) opts.push(o); }
      while (opts.length < 2) opts.push("—");
      addQ("Mein Wortschatz", "What does „" + en + "“ mean?", opts, 0, "mc", "");
    });
  }

  /* ---------------- Themen-Metadaten ---------------- */
  const TOPIC_INFO = {
    "Simple Past":                   { name: "Simple Past",                   icon: "⏱️", cat: "Grammar" },
    "Past Progressive":              { name: "Past Progressive",              icon: "🎬", cat: "Grammar" },
    "Present Perfect":               { name: "Present Perfect",               icon: "✅", cat: "Grammar" },
    "Present Perfect / Simple Past": { name: "Present Perfect / Simple Past", icon: "🔀", cat: "Grammar" },
    "Past Perfect":                  { name: "Past Perfect",                  icon: "⏪", cat: "Grammar" },
    "Question Tags":                 { name: "Question Tags",                 icon: "❓", cat: "Grammar" },
    "Relative Clauses":              { name: "Relative Clauses",              icon: "🔗", cat: "Grammar" },
    "Verb Patterns":                 { name: "Verb Patterns",                 icon: "➡️", cat: "Grammar" },
    "If-Clauses":                    { name: "If-Clauses",                    icon: "🔁", cat: "Grammar" },
    "Modals":                        { name: "Modals",                        icon: "🚦", cat: "Grammar" },
    "Present Tenses":                { name: "Present Tenses",                icon: "🕒", cat: "Grammar" },
    "Ireland":                       { name: "Ireland",                       icon: "☘️", cat: "Landeskunde" },
    "Life in the USA":               { name: "Life in the USA",               icon: "🗽", cat: "Landeskunde" },
    "School":                        { name: "School",                        icon: "🏫", cat: "Landeskunde" },
    "Youth Culture":                 { name: "Youth Culture",                 icon: "🎧", cat: "Landeskunde" },
    "Britain & History":             { name: "Britain & History",             icon: "🏰", cat: "Landeskunde" },
    "Everyday English":              { name: "Everyday English",              icon: "💬", cat: "Vokabeln" },
    "Word Skills":                   { name: "Word Skills",                   icon: "🧩", cat: "Vokabeln" },
  };
  if (window.CUSTOM_VOCAB && Array.isArray(window.CUSTOM_VOCAB) && window.CUSTOM_VOCAB.length) {
    TOPIC_INFO["Mein Wortschatz"] = { name: "Mein Wortschatz", icon: "⭐", cat: "Vokabeln" };
  }
  const TOPIC_ORDER = Object.keys(TOPIC_INFO);

  registerLangPack("en", { QUESTIONS: QUESTIONS, TOPIC_INFO: TOPIC_INFO, TOPIC_ORDER: TOPIC_ORDER });
})();
