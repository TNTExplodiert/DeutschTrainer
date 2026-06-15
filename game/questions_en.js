/* =====================================================================
   Fragen-Datenbank ENGLISCH – 7. Klasse Realschule Bayern (LehrplanPLUS)
   PILOT: originale, selbst erstellte Übungen (KEINE Schulbuch-Inhalte).
   - Grammatik mit eigenen Beispielsätzen
   - Themen-/Landeskunde-Wortschatz aus eigener/freier Auswahl
   - „Mein Wortschatz": lädt – falls vorhanden – deine LOKALEN, privaten
     Vokabeln aus window.CUSTOM_VOCAB (game/vocab_custom.js, gitignored).
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

  /* ---------------- Grammatik: Past Perfect ---------------- */
  addQ("Past Perfect", "Past perfect is formed with …",
    ["had + past participle", "have + infinitive", "was/were + -ing"], 0, "mc",
    "Past perfect = had + 3. Verbform (past participle).");
  addQ("Past Perfect", "Choose: „When we arrived, the train ___ already ___.“",
    ["had … left", "has … left", "was … leaving"], 0, "mc",
    "Eine Handlung VOR einer anderen in der Vergangenheit → past perfect (had left).");
  addQ("Past Perfect", "„Before she came home, she ___ her friends.“ (call)",
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

  /* ---------------- Grammatik: Question Tags ---------------- */
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

  /* ---------------- Landeskunde/Wortschatz: Ireland ---------------- */
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
    "Past Perfect":   { name: "Past Perfect",   icon: "⏪", cat: "Grammar" },
    "Question Tags":  { name: "Question Tags",  icon: "❓", cat: "Grammar" },
    "Ireland":        { name: "Ireland",        icon: "☘️", cat: "Landeskunde" },
  };
  if (window.CUSTOM_VOCAB && Array.isArray(window.CUSTOM_VOCAB) && window.CUSTOM_VOCAB.length) {
    TOPIC_INFO["Mein Wortschatz"] = { name: "Mein Wortschatz", icon: "⭐", cat: "Vokabeln" };
  }
  const TOPIC_ORDER = Object.keys(TOPIC_INFO);

  registerLangPack("en", { QUESTIONS: QUESTIONS, TOPIC_INFO: TOPIC_INFO, TOPIC_ORDER: TOPIC_ORDER });
})();
