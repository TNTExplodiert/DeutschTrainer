// Fragen-Datenbank für den Grammatik-Obby
// Jede Frage: { q, options:[...], correct: Index, topic }
// Die ID wird automatisch aus topic + Frage gebildet (siehe game.js).
// Neue Fragen einfach unten ergänzen – max. 3 Antworten, damit sie auf die Plattformen passen.

const QUESTIONS = [
  // ---------- das / dass ----------
  { q: "Ich hoffe, ___ du kommst.", options: ["das", "dass"], correct: 1, topic: "das/dass" },
  { q: "Das Auto, ___ dort steht, ist neu.", options: ["das", "dass"], correct: 0, topic: "das/dass" },
  { q: "Er weiß, ___ er recht hat.", options: ["das", "dass"], correct: 1, topic: "das/dass" },
  { q: "Das Buch, ___ ich lese, ist gut.", options: ["das", "dass"], correct: 0, topic: "das/dass" },
  { q: "___ Wetter ist heute schön.", options: ["Das", "Dass"], correct: 0, topic: "das/dass" },

  // ---------- s · ss · ß ----------
  { q: "Welche Schreibweise ist richtig?", options: ["Strasse", "Straße", "Strahse"], correct: 1, topic: "s-Laute" },
  { q: "Welche Schreibweise ist richtig?", options: ["Fluss", "Fluß", "Flus"], correct: 0, topic: "s-Laute" },
  { q: "Welche Schreibweise ist richtig?", options: ["Fußball", "Fussball"], correct: 0, topic: "s-Laute" },
  { q: "Welche Schreibweise ist richtig?", options: ["Wasser", "Waser", "Waßer"], correct: 0, topic: "s-Laute" },
  { q: "Nach kurzem Vokal schreibt man …", options: ["ss", "ß"], correct: 0, topic: "s-Laute" },

  // ---------- Groß- & Kleinschreibung ----------
  { q: "Das ___ fällt ihm leicht. (lesen)", options: ["lesen", "Lesen"], correct: 1, topic: "Großschreibung" },
  { q: "Beim ___ ist er schnell. (schwimmen)", options: ["schwimmen", "Schwimmen"], correct: 1, topic: "Großschreibung" },
  { q: "Sie wünscht dir alles ___. (gute)", options: ["gute", "Gute"], correct: 1, topic: "Großschreibung" },
  { q: "Welches Wort schreibt man groß?", options: ["haus", "schnell", "Haus"], correct: 2, topic: "Großschreibung" },

  // ---------- Wortarten ----------
  { q: "Welches Wort ist ein Nomen?", options: ["schnell", "laufen", "Freiheit"], correct: 2, topic: "Wortarten" },
  { q: "Welches Wort ist ein Verb?", options: ["Tisch", "denken", "schön"], correct: 1, topic: "Wortarten" },
  { q: "'schnell' ist ein …", options: ["Nomen", "Adjektiv", "Verb"], correct: 1, topic: "Wortarten" },
  { q: "'unter' ist eine …", options: ["Präposition", "Verb", "Nomen"], correct: 0, topic: "Wortarten" },
  { q: "'und' ist eine …", options: ["Konjunktion", "Adjektiv", "Nomen"], correct: 0, topic: "Wortarten" },

  // ---------- Doppelkonsonant (Schärfung) ----------
  { q: "Welche Schreibweise ist richtig?", options: ["schwimen", "schwimmen"], correct: 1, topic: "Schärfung" },
  { q: "Welche Schreibweise ist richtig?", options: ["Sone", "Sonne"], correct: 1, topic: "Schärfung" },
  { q: "Welche Schreibweise ist richtig?", options: ["komen", "kommen"], correct: 1, topic: "Schärfung" },
  { q: "Kurzer Vokal → der Konsonant ist …", options: ["einfach", "doppelt"], correct: 1, topic: "Schärfung" },

  // ---------- Kommasetzung ----------
  { q: "Komma vor 'und' bei Aufzählung?", options: ["immer", "kein Komma"], correct: 1, topic: "Komma" },
  { q: "Vor einem Nebensatz steht …", options: ["ein Komma", "kein Komma"], correct: 0, topic: "Komma" },
  { q: "'Ich glaube ___ es regnet.'", options: ["Komma vor dass", "kein Komma"], correct: 0, topic: "Komma" },
  { q: "Relativsätze trennt man mit …", options: ["Komma", "Punkt", "nichts"], correct: 0, topic: "Komma" },

  // ---------- Zeitformen ----------
  { q: "Welches ist Plusquamperfekt?", options: ["er ging", "er ist gegangen", "er war gegangen"], correct: 2, topic: "Zeitformen" },
  { q: "Welches ist Futur I?", options: ["er wird gehen", "er ging", "er geht"], correct: 0, topic: "Zeitformen" },
  { q: "Welches ist Perfekt?", options: ["er lief", "er ist gelaufen", "er läuft"], correct: 1, topic: "Zeitformen" },
  { q: "'er geht' ist …", options: ["Präsens", "Präteritum", "Futur"], correct: 0, topic: "Zeitformen" },
  { q: "Erzählzeit beim Schreiben ist meist …", options: ["Präteritum", "Futur II"], correct: 0, topic: "Zeitformen" },

  // ---------- Aktiv & Passiv ----------
  { q: "Passiv: 'Man baut das Haus.'", options: ["Das Haus wird gebaut.", "Das Haus baut.", "Man wird gebaut."], correct: 0, topic: "Aktiv/Passiv" },
  { q: "Passiv: 'Sie liest das Buch.'", options: ["Das Buch wird gelesen.", "Das Buch liest.", "Sie wird gelesen."], correct: 0, topic: "Aktiv/Passiv" },
  { q: "'Der Ball wird geworfen.' ist …", options: ["Aktiv", "Passiv"], correct: 1, topic: "Aktiv/Passiv" },
  { q: "Passiv bildet man mit …", options: ["werden + Partizip", "haben + Infinitiv"], correct: 0, topic: "Aktiv/Passiv" },

  // ---------- Satzglieder ----------
  { q: "'Der Junge spielt.' – Subjekt?", options: ["Der Junge", "spielt"], correct: 0, topic: "Satzglieder" },
  { q: "'Ich sehe den Film.' – Akk.-Objekt?", options: ["Ich", "den Film", "sehe"], correct: 1, topic: "Satzglieder" },
  { q: "'Er hilft dem Kind.' – Dativobjekt?", options: ["Er", "dem Kind", "hilft"], correct: 1, topic: "Satzglieder" },
  { q: "Subjekt erfragt man mit …", options: ["Wer/Was?", "Wen?", "Wem?"], correct: 0, topic: "Satzglieder" },
  { q: "Akkusativobjekt erfragt man mit …", options: ["Wen/Was?", "Wem?", "Wessen?"], correct: 0, topic: "Satzglieder" },

  // ---------- Satzbau ----------
  { q: "Im Nebensatz steht das Verb …", options: ["an 2. Stelle", "am Ende", "am Anfang"], correct: 1, topic: "Satzbau" },
  { q: "Welche Konjunktion leitet einen Nebensatz ein?", options: ["und", "weil", "oder"], correct: 1, topic: "Satzbau" },
  { q: "Im Hauptsatz steht das Verb an …", options: ["Stelle 2", "Stelle 1", "am Ende"], correct: 0, topic: "Satzbau" },
  { q: "'weil', 'dass', 'obwohl' sind …", options: ["unterordnend", "nebenordnend"], correct: 0, topic: "Satzbau" },
];

// Eindeutige ID je Frage (stabil, solange Frage-Text gleich bleibt)
QUESTIONS.forEach((q) => { q.id = q.topic + "::" + q.q; });

// Reihenfolge der Themen auf der Karte + Symbole
const TOPIC_INFO = {
  "das/dass":        { name: "das / dass",        icon: "📝" },
  "s-Laute":         { name: "s · ss · ß",        icon: "🐍" },
  "Schärfung":       { name: "Doppelkonsonant",   icon: "✌️" },
  "Großschreibung":  { name: "Groß & klein",      icon: "🔠" },
  "Wortarten":       { name: "Wortarten",         icon: "🏷️" },
  "Komma":           { name: "Kommasetzung",      icon: "❟" },
  "Zeitformen":      { name: "Zeitformen",        icon: "⏱️" },
  "Aktiv/Passiv":    { name: "Aktiv & Passiv",    icon: "🔄" },
  "Satzglieder":     { name: "Satzglieder",       icon: "🧩" },
  "Satzbau":         { name: "Satzbau",           icon: "🏗️" },
};

// Themen in der gewünschten Reihenfolge (alle, die in TOPIC_INFO vorkommen)
const TOPIC_ORDER = Object.keys(TOPIC_INFO);
