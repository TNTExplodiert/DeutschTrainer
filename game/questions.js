// Fragen-Datenbank für den Grammatik-Obby
// Aufgebaut nach dem tatsächlichen Stoff (Deutsch, 7. Klasse Realschule Bayern)
// aus den Arbeitsblättern: Rechtschreibung & Grammatik.
//
// Format je Frage: { q, options:[...], correct: Index, topic }
//  - max. 3 Antworten, Optionen kurz halten (passen auf die Plattformen)
//  - bei langen Antworten lieber nur 2 Optionen
// Die ID wird automatisch aus topic + Frage gebildet.

const QUESTIONS = [
  // =======================================================
  //  RECHTSCHREIBUNG
  // =======================================================

  // ---------- das / dass ----------
  { q: "Ich hoffe, ___ du kommst.", options: ["das", "dass"], correct: 1, topic: "das/dass" },
  { q: "Das Auto, ___ dort steht, ist neu.", options: ["das", "dass"], correct: 0, topic: "das/dass" },
  { q: "Er weiß, ___ er recht hat.", options: ["das", "dass"], correct: 1, topic: "das/dass" },
  { q: "___ ist meine Freundin.", options: ["Das", "Dass"], correct: 0, topic: "das/dass" },
  { q: "Es ist bewiesen, ___ er zu viel spielt.", options: ["das", "dass"], correct: 1, topic: "das/dass" },
  { q: "Das Glas, ___ ich nehme, ist voll.", options: ["das", "dass"], correct: 0, topic: "das/dass" },
  { q: "Es freut mich, ___ du da bist.", options: ["das", "dass"], correct: 1, topic: "das/dass" },
  { q: "Ersetzbar durch 'dieses/welches' → man schreibt …", options: ["das", "dass"], correct: 0, topic: "das/dass" },
  { q: "'dass' (mit ss) ist eine …", options: ["Konjunktion", "Artikel"], correct: 0, topic: "das/dass" },
  { q: "'das' (mit s) kann ein … sein.", options: ["Relativpronomen", "Konjunktion"], correct: 0, topic: "das/dass" },

  // ---------- Groß- & Kleinschreibung ----------
  { q: "Welches Wort schreibt man groß?", options: ["haus", "schnell", "Haus"], correct: 2, topic: "Großschreibung" },
  { q: "Sie wünscht dir alles ___.", options: ["gute", "Gute"], correct: 1, topic: "Großschreibung" },
  { q: "Der berühmte Turm in Pisa:", options: ["der schiefe Turm", "der Schiefe Turm"], correct: 1, topic: "Großschreibung" },
  { q: "Gebäude in Washington:", options: ["das weiße Haus", "das Weiße Haus"], correct: 1, topic: "Großschreibung" },
  { q: "die ___ Revolution (Eigenname)", options: ["Französische", "französische"], correct: 0, topic: "Großschreibung" },
  { q: "Anrede beim Siezen (Brief):", options: ["Ihnen", "ihnen"], correct: 0, topic: "Großschreibung" },
  { q: "Nur ___ nahmen teil.", options: ["wenige", "Wenige"], correct: 0, topic: "Großschreibung" },
  { q: "Wir hatten ___ Stunden Mathe.", options: ["zwei", "Zwei"], correct: 0, topic: "Großschreibung" },
  { q: "Du bist der ___, dem ich glaube.", options: ["Einzige", "einzige"], correct: 0, topic: "Großschreibung" },
  { q: "Woran erkennt man ein Nomen oft?", options: ["am Artikel davor", "an der Silbenzahl"], correct: 0, topic: "Großschreibung" },

  // ---------- Nominalisierung ----------
  { q: "Das ___ fällt ihm leicht. (lesen)", options: ["lesen", "Lesen"], correct: 1, topic: "Nominalisierung" },
  { q: "Beim ___ ist er schnell. (schwimmen)", options: ["schwimmen", "Schwimmen"], correct: 1, topic: "Nominalisierung" },
  { q: "Ich habe ___ keine Zeit. (lernen)", options: ["zum lernen", "zum Lernen"], correct: 1, topic: "Nominalisierung" },
  { q: "Mutter kocht etwas ___. (lecker)", options: ["lecker", "Leckeres"], correct: 1, topic: "Nominalisierung" },
  { q: "Beim ___ wurde er müde. (wandern)", options: ["wandern", "Wandern"], correct: 1, topic: "Nominalisierung" },
  { q: "Wer keine Lust hat, zu ___. (dichten)", options: ["dichten", "Dichten"], correct: 0, topic: "Nominalisierung" },
  { q: "Sie ___ sich ins Wort. (fallen)", options: ["fallen", "Fallen"], correct: 0, topic: "Nominalisierung" },
  { q: "In der Stunde geschah nichts ___.", options: ["Außergewöhnliches", "außergewöhnliches"], correct: 0, topic: "Nominalisierung" },
  { q: "Das laute ___ des Hundes. (bellen)", options: ["Bellen", "bellen"], correct: 0, topic: "Nominalisierung" },
  { q: "Signalwort für Nominalisierung ist oft …", options: ["ein Artikel", "ein Komma"], correct: 0, topic: "Nominalisierung" },

  // ---------- s · ss · ß ----------
  { q: "Welche Schreibweise ist richtig?", options: ["Strasse", "Straße", "Strahse"], correct: 1, topic: "s-Laute" },
  { q: "Welche Schreibweise ist richtig?", options: ["Fluss", "Fluß", "Flus"], correct: 0, topic: "s-Laute" },
  { q: "Welche Schreibweise ist richtig?", options: ["Fußball", "Fussball"], correct: 0, topic: "s-Laute" },
  { q: "Welche Schreibweise ist richtig?", options: ["Wasser", "Waßer"], correct: 0, topic: "s-Laute" },
  { q: "Nach langem Vokal schreibt man …", options: ["ss", "ß"], correct: 1, topic: "s-Laute" },
  { q: "Nach kurzem Vokal schreibt man …", options: ["ss", "ß"], correct: 0, topic: "s-Laute" },
  { q: "Welche Schreibweise ist richtig?", options: ["draußen", "draussen"], correct: 0, topic: "s-Laute" },
  { q: "Welche Schreibweise ist richtig?", options: ["müssen", "müßen"], correct: 0, topic: "s-Laute" },

  // ---------- Getrennt- & Zusammenschreibung ----------
  { q: "'Rad fahren' schreibt man …", options: ["getrennt", "zusammen"], correct: 0, topic: "Getrennt/Zusammen" },
  { q: "'fernsehen' (TV schauen) schreibt man …", options: ["zusammen", "getrennt"], correct: 0, topic: "Getrennt/Zusammen" },
  { q: "'spazieren gehen' schreibt man …", options: ["getrennt", "zusammen"], correct: 0, topic: "Getrennt/Zusammen" },
  { q: "Was bedeutet Getrenntschreibung?", options: ["Wörter einzeln", "alles zusammen"], correct: 0, topic: "Getrennt/Zusammen" },

  // ---------- Kommasetzung ----------
  { q: "Komma vor 'und' bei einer Aufzählung?", options: ["immer", "kein Komma"], correct: 1, topic: "Komma" },
  { q: "Vor einem Nebensatz steht …", options: ["ein Komma", "kein Komma"], correct: 0, topic: "Komma" },
  { q: "Relativsätze trennt man mit …", options: ["Komma", "Punkt", "nichts"], correct: 0, topic: "Komma" },
  { q: "Ein Nebensatz beginnt oft mit …", options: ["und/oder", "weil/dass/wenn"], correct: 1, topic: "Komma" },
  { q: "Zwei Hauptsätze mit 'und' verbunden →", options: ["Komma", "kein Komma"], correct: 1, topic: "Komma" },
  { q: "'Er kam, ___ sie ging.' Vor 'aber' steht …", options: ["Komma", "kein Komma"], correct: 0, topic: "Komma" },
  { q: "Das Komma im Satzgefüge trennt …", options: ["HS vom NS", "zwei Verben"], correct: 0, topic: "Komma" },
  { q: "'Ich kaufe Äpfel, Birnen und Obst.' Komma vor 'und'?", options: ["nein", "ja"], correct: 0, topic: "Komma" },

  // =======================================================
  //  GRAMMATIK
  // =======================================================

  // ---------- Wortarten ----------
  { q: "Welches Wort ist ein Nomen?", options: ["schnell", "laufen", "Freiheit"], correct: 2, topic: "Wortarten" },
  { q: "Welches Wort ist ein Verb?", options: ["Tisch", "denken", "schön"], correct: 1, topic: "Wortarten" },
  { q: "'schnell' ist ein …", options: ["Nomen", "Adjektiv", "Verb"], correct: 1, topic: "Wortarten" },
  { q: "'unter' ist eine …", options: ["Präposition", "Verb", "Nomen"], correct: 0, topic: "Wortarten" },
  { q: "'und' ist eine …", options: ["Konjunktion", "Adjektiv"], correct: 0, topic: "Wortarten" },
  { q: "'gestern, oft, draußen' sind …", options: ["Adverbien", "Adjektive"], correct: 0, topic: "Wortarten" },
  { q: "Welche Wortart ist steigerbar?", options: ["Adjektiv", "Nomen", "Präposition"], correct: 0, topic: "Wortarten" },
  { q: "Welche Wortart bildet Zeitformen?", options: ["Verb", "Nomen"], correct: 0, topic: "Wortarten" },
  { q: "Der unbestimmte Artikel ist …", options: ["ein/eine", "der/die/das"], correct: 0, topic: "Wortarten" },
  { q: "'im' ist die Verschmelzung von …", options: ["in dem", "in das"], correct: 0, topic: "Wortarten" },
  { q: "'obwohl' ist eine …", options: ["Konjunktion", "Präposition"], correct: 0, topic: "Wortarten" },

  // ---------- Pronomen ----------
  { q: "'ich, du, er, wir' sind …", options: ["Personalpronomen", "Possessivpronomen"], correct: 0, topic: "Pronomen" },
  { q: "'mein, dein, sein' sind …", options: ["Personal", "Possessiv"], correct: 1, topic: "Pronomen" },
  { q: "'dieser, jener, der' sind …", options: ["Demonstrativpronomen", "Relativpronomen"], correct: 0, topic: "Pronomen" },
  { q: "Was leitet einen Relativsatz ein?", options: ["der/die/das", "dieser"], correct: 0, topic: "Pronomen" },
  { q: "'Der Mann, dessen Auto …' – 'dessen' ist …", options: ["Relativpronomen", "Possessiv"], correct: 0, topic: "Pronomen" },
  { q: "'Sina trifft ihre Mutter.' – 'ihre' ist …", options: ["Possessiv", "Personal"], correct: 0, topic: "Pronomen" },
  { q: "Possessivpronomen zeigen …", options: ["Besitz", "Ort"], correct: 0, topic: "Pronomen" },
  { q: "Wozu dienen Pronomen?", options: ["Nomen ersetzen", "Verben beugen"], correct: 0, topic: "Pronomen" },
  { q: "'die' in 'Person, die kommt' ist …", options: ["Relativpronomen", "Artikel"], correct: 0, topic: "Pronomen" },

  // ---------- Satzglieder & Fälle ----------
  { q: "'Der Junge spielt.' – Subjekt?", options: ["Der Junge", "spielt"], correct: 0, topic: "Satzglieder" },
  { q: "'Ich sehe den Film.' – Akk.-Objekt?", options: ["Ich", "den Film", "sehe"], correct: 1, topic: "Satzglieder" },
  { q: "'Er hilft dem Kind.' – Dativobjekt?", options: ["Er", "dem Kind", "hilft"], correct: 1, topic: "Satzglieder" },
  { q: "Subjekt erfragt man mit …", options: ["Wer/Was?", "Wen?", "Wem?"], correct: 0, topic: "Satzglieder" },
  { q: "Akkusativobjekt erfragt man mit …", options: ["Wen/Was?", "Wem?", "Wessen?"], correct: 0, topic: "Satzglieder" },
  { q: "Dativobjekt erfragt man mit …", options: ["Wem?", "Wen?", "Wessen?"], correct: 0, topic: "Satzglieder" },
  { q: "Genitivobjekt erfragt man mit …", options: ["Wessen?", "Wem?", "Wen?"], correct: 0, topic: "Satzglieder" },
  { q: "Womit prüft man ein Satzglied?", options: ["Umstellprobe", "Steigerung"], correct: 0, topic: "Satzglieder" },
  { q: "'wartet auf den Bus' – 'auf den Bus' ist …", options: ["Präpositionalobjekt", "Subjekt"], correct: 0, topic: "Satzglieder" },
  { q: "Wie viele Fälle hat das Deutsche?", options: ["vier", "zwei", "sechs"], correct: 0, topic: "Satzglieder" },

  // ---------- Adverbiale Bestimmungen ----------
  { q: "'Wann?' fragt nach dem …", options: ["Temporaladverbiale", "Lokaladverbiale"], correct: 0, topic: "Adverbiale" },
  { q: "'Wo? Wohin?' fragt nach dem …", options: ["Lokaladverbiale", "Modaladverbiale"], correct: 0, topic: "Adverbiale" },
  { q: "'Wie?' fragt nach dem …", options: ["Modaladverbiale", "Kausaladverbiale"], correct: 0, topic: "Adverbiale" },
  { q: "'Warum?' fragt nach dem …", options: ["Kausaladverbiale", "Temporaladverbiale"], correct: 0, topic: "Adverbiale" },
  { q: "'seit 1930' ist …", options: ["temporal", "lokal"], correct: 0, topic: "Adverbiale" },
  { q: "'in Hamburg' ist …", options: ["lokal", "kausal"], correct: 0, topic: "Adverbiale" },
  { q: "'schnell' (er läuft schnell) ist …", options: ["modal", "temporal"], correct: 0, topic: "Adverbiale" },
  { q: "'wegen des Regens' ist …", options: ["kausal", "modal"], correct: 0, topic: "Adverbiale" },

  // ---------- Attribute & Attributsätze ----------
  { q: "Eine Beifügung am Nomen heißt …", options: ["Attribut", "Adverb"], correct: 0, topic: "Attribute" },
  { q: "Attribute erfragt man mit …", options: ["Welche(r/s)?", "Wann?"], correct: 0, topic: "Attribute" },
  { q: "'der mutige Hund' – 'mutige' ist …", options: ["Attribut (davor)", "Objekt"], correct: 0, topic: "Attribute" },
  { q: "'das Haus meines Onkels' – Attribut?", options: ["meines Onkels", "Haus"], correct: 0, topic: "Attribute" },
  { q: "'Comics, die witzig sind' ist ein …", options: ["Attributsatz", "Hauptsatz"], correct: 0, topic: "Attribute" },
  { q: "'Comics, die witzig sind' verkürzt:", options: ["witzige Comics", "Comics witzig"], correct: 0, topic: "Attribute" },
  { q: "Attributsätze beginnen meist mit …", options: ["Relativpronomen", "Verb"], correct: 0, topic: "Attribute" },
  { q: "Kann man ein Attribut allein umstellen?", options: ["nein", "ja"], correct: 0, topic: "Attribute" },
  { q: "Ein Attribut ist Teil eines …", options: ["Satzglieds", "Wortes"], correct: 0, topic: "Attribute" },
  { q: "Nachgestellten Attributsatz trennt man mit …", options: ["Komma", "Punkt"], correct: 0, topic: "Attribute" },

  // ---------- Satzreihe & Satzgefüge ----------
  { q: "Im Hauptsatz steht das Verb an …", options: ["Stelle 2", "am Ende"], correct: 0, topic: "Satzarten" },
  { q: "Im Nebensatz steht das Verb …", options: ["am Ende", "an 2. Stelle"], correct: 0, topic: "Satzarten" },
  { q: "Eine Satzreihe verbindet …", options: ["zwei Hauptsätze", "HS + Nebensatz"], correct: 0, topic: "Satzarten" },
  { q: "Ein Satzgefüge ist …", options: ["HS + Nebensatz", "zwei Hauptsätze"], correct: 0, topic: "Satzarten" },
  { q: "'weil', 'dass', 'obwohl' sind …", options: ["unterordnend", "nebenordnend"], correct: 0, topic: "Satzarten" },
  { q: "'und', 'aber', 'oder' sind …", options: ["nebenordnend", "unterordnend"], correct: 0, topic: "Satzarten" },
  { q: "Welcher Satz kann allein stehen?", options: ["Hauptsatz", "Nebensatz"], correct: 0, topic: "Satzarten" },
  { q: "'Wenn es regnet, bleibe ich.' ist ein …", options: ["Satzgefüge", "Satzreihe"], correct: 0, topic: "Satzarten" },

  // ---------- Konjunktiv I / indirekte Rede ----------
  { q: "Wofür nutzt man den Konjunktiv I?", options: ["indirekte Rede", "Befehl"], correct: 0, topic: "Konjunktiv" },
  { q: "Konjunktiv I von 'sein' (er): er …", options: ["sei", "ist", "wäre"], correct: 0, topic: "Konjunktiv" },
  { q: "Konjunktiv I von 'haben' (er): er …", options: ["habe", "hat"], correct: 0, topic: "Konjunktiv" },
  { q: "Indirekt: 'Er sagt, er ___ krank.'", options: ["sei", "ist"], correct: 0, topic: "Konjunktiv" },
  { q: "'Er solle gehen.' steht im …", options: ["Konjunktiv I", "Präsens"], correct: 0, topic: "Konjunktiv" },
  { q: "Bei Formgleichheit nutzt man die …", options: ["würde-Form", "Futur II"], correct: 0, topic: "Konjunktiv" },
  { q: "'Ich bin müde.' → 'Er sagt, er ___ müde.'", options: ["sei", "war"], correct: 0, topic: "Konjunktiv" },
  { q: "Konjunktiv I bildet man vom …", options: ["Präsensstamm", "Präteritum"], correct: 0, topic: "Konjunktiv" },

  // ---------- Zeitformen ----------
  { q: "Welches ist Plusquamperfekt?", options: ["er ging", "er ist gegangen", "er war gegangen"], correct: 2, topic: "Zeitformen" },
  { q: "Welches ist Futur I?", options: ["er wird gehen", "er ging", "er geht"], correct: 0, topic: "Zeitformen" },
  { q: "Welches ist Perfekt?", options: ["er lief", "er ist gelaufen", "er läuft"], correct: 1, topic: "Zeitformen" },
  { q: "'er geht' ist …", options: ["Präsens", "Präteritum", "Futur"], correct: 0, topic: "Zeitformen" },
  { q: "Erzählzeit beim Schreiben ist meist …", options: ["Präteritum", "Futur II"], correct: 0, topic: "Zeitformen" },
  { q: "Perfekt bildet man mit …", options: ["haben/sein + Partizip", "werden + Inf."], correct: 0, topic: "Zeitformen" },

  // ---------- Aktiv & Passiv ----------
  { q: "Passiv von 'Man baut das Haus.'", options: ["Das Haus wird gebaut.", "Das Haus baut."], correct: 0, topic: "Aktiv/Passiv" },
  { q: "Passiv von 'Sie liest das Buch.'", options: ["Das Buch wird gelesen.", "Das Buch liest."], correct: 0, topic: "Aktiv/Passiv" },
  { q: "'Der Ball wird geworfen.' ist …", options: ["Aktiv", "Passiv"], correct: 1, topic: "Aktiv/Passiv" },
  { q: "Passiv bildet man mit …", options: ["werden + Partizip", "haben + Infinitiv"], correct: 0, topic: "Aktiv/Passiv" },
];

// Eindeutige ID je Frage (Thema + Frage + Antworten -> stabil und eindeutig,
// auch wenn mehrere Fragen denselben Fragetext haben, z. B. "Welche Schreibweise …?")
QUESTIONS.forEach((q) => { q.id = q.topic + "::" + q.q + "::" + q.options.join("|"); });

// Themen auf der Karte: Name + Symbol (Reihenfolge = Anzeige-Reihenfolge)
const TOPIC_INFO = {
  // Rechtschreibung
  "das/dass":          { name: "das / dass",        icon: "📝" },
  "Großschreibung":    { name: "Groß & klein",      icon: "🔠" },
  "Nominalisierung":   { name: "Nominalisierung",   icon: "🅰️" },
  "s-Laute":           { name: "s · ss · ß",        icon: "🐍" },
  "Getrennt/Zusammen": { name: "Getrennt & zusammen", icon: "✂️" },
  "Komma":             { name: "Kommasetzung",      icon: "✏️" },
  // Grammatik
  "Wortarten":         { name: "Wortarten",         icon: "🏷️" },
  "Pronomen":          { name: "Pronomen",          icon: "👥" },
  "Satzglieder":       { name: "Satzglieder & Fälle", icon: "🧩" },
  "Adverbiale":        { name: "Adverbiale",        icon: "🧭" },
  "Attribute":         { name: "Attribute",         icon: "🔎" },
  "Satzarten":         { name: "Satzreihe/-gefüge", icon: "🔗" },
  "Konjunktiv":        { name: "Indirekte Rede",    icon: "💬" },
  "Zeitformen":        { name: "Zeitformen",        icon: "⏱️" },
  "Aktiv/Passiv":      { name: "Aktiv & Passiv",    icon: "🔄" },
};

const TOPIC_ORDER = Object.keys(TOPIC_INFO);
