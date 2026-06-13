// Fragen-Datenbank für den Grammatik-Obby
// Jede Frage: { q: Frage, options: [Antworten], correct: Index der richtigen Antwort, topic: Thema }
// Tipp: Antworten kurz halten, damit sie gut auf die Plattformen passen.

const QUESTIONS = [
  // ---- Rechtschreibung: das / dass ----
  { q: "Ich hoffe, ___ du kommst.", options: ["das", "dass"], correct: 1, topic: "das/dass" },
  { q: "Das Auto, ___ dort steht, ist neu.", options: ["das", "dass"], correct: 0, topic: "das/dass" },

  // ---- s / ss / ß ----
  { q: "Welche Schreibweise ist richtig?", options: ["Strasse", "Straße", "Strahse"], correct: 1, topic: "s-Laute" },
  { q: "Welche Schreibweise ist richtig?", options: ["Fluss", "Fluß", "Flus"], correct: 0, topic: "s-Laute" },

  // ---- Groß- / Kleinschreibung ----
  { q: "Das ___ fällt ihm leicht. (lesen)", options: ["lesen", "Lesen"], correct: 1, topic: "Großschreibung" },
  { q: "Welches Wort ist ein Nomen?", options: ["schnell", "laufen", "Freiheit"], correct: 2, topic: "Wortarten" },

  // ---- Doppelkonsonant / Schärfung ----
  { q: "Welche Schreibweise ist richtig?", options: ["schwimen", "schwimmen"], correct: 1, topic: "Schärfung" },

  // ---- Komma ----
  { q: "Wann steht ein Komma vor 'und'?", options: ["immer", "bei Aufzählung", "nie bei Aufz."], correct: 2, topic: "Komma" },

  // ---- Wortarten ----
  { q: "Welches Wort ist ein Verb?", options: ["Tisch", "denken", "schön"], correct: 1, topic: "Wortarten" },
  { q: "'schnell' ist ein …", options: ["Nomen", "Adjektiv", "Verb"], correct: 1, topic: "Wortarten" },

  // ---- Tempora ----
  { q: "Welches ist Plusquamperfekt?", options: ["er ging", "er ist gegangen", "er war gegangen"], correct: 2, topic: "Zeitformen" },
  { q: "Welches ist Futur I?", options: ["er wird gehen", "er ging", "er geht"], correct: 0, topic: "Zeitformen" },

  // ---- Aktiv / Passiv ----
  { q: "Passiv: 'Man baut das Haus.'", options: ["Das Haus wird gebaut.", "Das Haus baut.", "Man wird gebaut."], correct: 0, topic: "Aktiv/Passiv" },

  // ---- Satzglieder ----
  { q: "'Der Junge spielt.' – Was ist Subjekt?", options: ["Der Junge", "spielt"], correct: 0, topic: "Satzglieder" },
  { q: "'Ich sehe den Film.' – Akkusativobjekt?", options: ["Ich", "den Film", "sehe"], correct: 1, topic: "Satzglieder" },

  // ---- Haupt- / Nebensatz ----
  { q: "Im Nebensatz steht das Verb …", options: ["an 2. Stelle", "am Ende", "am Anfang"], correct: 1, topic: "Satzbau" },
  { q: "Welche Konjunktion leitet einen Nebensatz ein?", options: ["und", "weil", "oder"], correct: 1, topic: "Satzbau" },
];
