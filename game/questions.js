/* =====================================================================
   Fragen-Datenbank (datengetrieben) – Deutsch 7. Klasse Realschule Bayern
   Aus kuratierten, korrekten Wort-/Satzlisten werden viele Übungen erzeugt.

   Jede Frage: { topic, q, options:[...], correct, kind, explain, id }
     kind:  "mc"        normale Multiple-Choice-Frage / Regel
            "recognize" ein Konstrukt in einem echten Satz erkennen
            "comma"     Kommasetzung im Satz
            "transform" Satz umformen/verbinden (lange Antworten)
   ===================================================================== */

const QUESTIONS = [];
function addQ(topic, q, options, correct, kind, explain) {
  QUESTIONS.push({ topic, q, options, correct, kind: kind || "mc", explain: explain || "" });
}
// kleine Helfer
function recSentence(topic, sentence, target, distractors, label, explain) {
  // "Welches ist <label>?" – Satz + Segmente als Optionen
  const opts = [target].concat(distractors);
  addQ(topic, label + "\n„" + sentence + "“", opts, 0, "recognize", explain);
}

/* =====================================================================
   RECHTSCHREIBUNG
   ===================================================================== */

// ---------- das / dass ----------
const DASSDATA = [
  ["Ich hoffe, ___ du bald kommst.", "dass"],
  ["Das Auto, ___ dort parkt, ist rot.", "das"],
  ["Er sagt, ___ er müde ist.", "dass"],
  ["Das Buch, ___ ich gestern las, war gut.", "das"],
  ["Sie weiß, ___ sie recht hat.", "dass"],
  ["___ Kind spielt im Garten.", "das"],
  ["Ich glaube, ___ es morgen regnet.", "dass"],
  ["Das Lied, ___ wir singen, ist alt.", "das"],
  ["Es freut mich, ___ du da bist.", "dass"],
  ["Ich denke, ___ wir gewinnen.", "dass"],
  ["Das Pferd, ___ auf der Wiese steht, frisst.", "das"],
  ["Wir hoffen, ___ alle gesund bleiben.", "dass"],
  ["Das Haus, ___ am See liegt, ist groß.", "das"],
  ["Ich bin sicher, ___ er kommt.", "dass"],
  ["Das Mädchen, ___ dort lacht, heißt Mia.", "das"],
  ["Es ist schön, ___ du anrufst.", "dass"],
  ["Das Fenster, ___ offen steht, klappert.", "das"],
  ["Sie hofft, ___ der Bus pünktlich ist.", "dass"],
  ["Das Spiel, ___ wir spielen, macht Spaß.", "das"],
  ["Ich weiß, ___ du fleißig bist.", "dass"],
  ["Das T-Shirt, ___ blau ist, gefällt mir.", "das"],
  ["Er bemerkt, ___ etwas fehlt.", "dass"],
  ["Das Tier, ___ im Wald lebt, ist scheu.", "das"],
  ["Wir freuen uns, ___ endlich Ferien sind.", "dass"],
  ["Das Brot, ___ frisch ist, schmeckt gut.", "das"],
  ["Ich vermute, ___ sie verreist ist.", "dass"],
  ["Das Lied, ___ im Radio läuft, kenne ich.", "das"],
  ["Es stimmt, ___ er gewonnen hat.", "dass"],
  ["Das Bild, ___ an der Wand hängt, ist alt.", "das"],
  ["Ich hoffe sehr, ___ es klappt.", "dass"],
  ["Das Eis, ___ in der Sonne schmilzt, tropft.", "das"],
  ["Sie sagt, ___ sie keine Zeit hat.", "dass"],
  ["Das Auto, ___ schnell fährt, ist teuer.", "das"],
  ["Ich finde, ___ du recht hast.", "dass"],
  ["Das Geschenk, ___ du bekommst, ist toll.", "das"],
  ["Wir denken, ___ es funktioniert.", "dass"],
  ["Das Wetter, ___ heute herrscht, ist mies.", "das"],
  ["Ich bin froh, ___ alles gut ging.", "dass"],
  ["Das Heft, ___ du suchst, liegt hier.", "das"],
  ["Man sieht, ___ er sich freut.", "dass"],
];
DASSDATA.forEach(([s, a]) => {
  const correct = a === "dass" ? 1 : 0;
  const explain = a === "dass"
    ? "Konjunktion → „dass“ (nicht durch dieses/welches ersetzbar)."
    : "Artikel/Relativpronomen → „das“ (durch dieses/welches ersetzbar).";
  addQ("das/dass", "Lücke füllen:\n„" + s + "“", ["das", "dass"], correct, "mc", explain);
});
addQ("das/dass", "„das“ kann man ersetzen durch …", ["dieses/welches", "weil"], 0, "mc", "Artikel oder Relativpronomen.");
addQ("das/dass", "„dass“ ist eine …", ["Konjunktion", "Artikel"], 0, "mc", "Bindewort, leitet einen Nebensatz ein.");
addQ("das/dass", "Welches Wort leitet einen Nebensatz ein?", ["dass", "das"], 0, "mc");

// ---------- s · ss · ß ----------
// [richtig, falsch]; ß = nach langem Vokal/Diphthong, ss = nach kurzem Vokal
const SS_LONG = ["Straße:Strasse", "Fuß:Fuss", "Fußball:Fussball", "draußen:draussen",
  "Gruß:Gruss", "groß:gross", "Spaß:Spass", "weiß:weiss", "heiß:heiss", "beißen:beissen",
  "Soße:Sosse", "Maß:Mass", "süß:süss", "Floß:Floss", "Größe:Grösse", "fließen:fliessen",
  "schließen:schliessen", "genießen:geniessen", "Gefäß:Gefäss", "stoßen:stossen"];
const SS_SHORT = ["Fluss:Fluß", "Kuss:Kuß", "muss:muß", "Schloss:Schloß", "Fass:Faß",
  "nass:naß", "Riss:Riß", "Nuss:Nuß", "Schluss:Schluß", "Genuss:Genuß", "gewiss:gewiß",
  "müssen:müßen", "wissen:wißen", "essen:eßen", "küssen:küßen", "Wasser:Waßer",
  "besser:beßer", "Kasse:Kaße", "Tasse:Taße", "hassen:haßen", "passen:paßen",
  "Klasse:Klaße", "Fitness:Fitneß", "Stress:Streß", "dass:daß"];
SS_LONG.forEach((p) => {
  const [r, w] = p.split(":");
  addQ("s-Laute", "Welche Schreibweise ist richtig?", [r, w], 0, "mc", "Langer Vokal/Doppellaut → „ß“.");
});
SS_SHORT.forEach((p) => {
  const [r, w] = p.split(":");
  addQ("s-Laute", "Welche Schreibweise ist richtig?", [r, w], 0, "mc", "Kurzer, betonter Vokal → „ss“.");
});
addQ("s-Laute", "Nach kurzem, betontem Vokal schreibt man …", ["ss", "ß"], 0, "mc", "z. B. Fluss, Kuss, müssen.");
addQ("s-Laute", "Nach langem Vokal oder Doppellaut schreibt man …", ["ß", "ss"], 0, "mc", "z. B. Straße, Fuß, heißen.");

// ---------- Nominalisierung ----------
// [satz mit lücke, richtigeForm, andereForm, großRichtig?, erklärung]
const NOM = [
  ["Das ___ fällt ihm leicht.", "Lesen", "lesen", true],
  ["Beim ___ wurde er müde.", "Wandern", "wandern", true],
  ["Mutter kocht etwas ___.", "Leckeres", "leckeres", true],
  ["Ich habe zum ___ keine Zeit.", "Lernen", "lernen", true],
  ["Das laute ___ des Hundes weckte mich.", "Bellen", "bellen", true],
  ["In der Stunde geschah nichts ___.", "Außergewöhnliches", "außergewöhnliches", true],
  ["Das ___ im See ist verboten.", "Schwimmen", "schwimmen", true],
  ["Beim ___ muss man aufpassen.", "Kochen", "kochen", true],
  ["Sie liebt das ___ am Morgen.", "Joggen", "joggen", true],
  ["Wir üben das schnelle ___.", "Rechnen", "rechnen", true],
  ["Das ___ der Vögel ist schön.", "Singen", "singen", true],
  ["Er hat keine Lust, heute zu ___.", "lernen", "Lernen", false],
  ["Sie fangen an zu ___.", "tanzen", "Tanzen", false],
  ["Wir wollen morgen ___ gehen.", "schwimmen", "Schwimmen", false],
  ["Er versucht, schnell zu ___.", "laufen", "Laufen", false],
  ["Sie hören nicht auf zu ___.", "reden", "Reden", false],
  ["Das ___ macht hungrig.", "Wandern", "wandern", true],
  ["Beim ___ lernt man viel.", "Reisen", "reisen", true],
  ["Etwas ___ ist passiert.", "Schönes", "schönes", true],
  ["Er denkt an das ___ von gestern.", "Spielen", "spielen", true],
];
NOM.forEach(([s, correctForm, otherForm, bigCorrect]) => {
  const explain = bigCorrect
    ? "Nominalisierung (Artikel/Signalwort davor) → großschreiben."
    : "Verb in normaler Funktion (oft mit „zu“) → kleinschreiben.";
  addQ("Nominalisierung", "Groß oder klein?\n„" + s + "“", [correctForm, otherForm], 0, "mc", explain);
});
addQ("Nominalisierung", "Ein Signalwort für Nominalisierung ist …", ["ein Artikel (das, beim)", "ein Komma"], 0, "mc");

// ---------- Groß- & Kleinschreibung ----------
const GROSS = [
  ["Wir besuchten das ___ Haus in Washington.", "Weiße", "weiße"],
  ["In Pisa steht der ___ Turm.", "Schiefe", "schiefe"],
  ["Wir lernen über die ___ Revolution.", "Französische", "französische"],
  ["Der ___ Ozean ist riesig.", "Stille", "stille"],
  ["Im Geschichtsbuch steht der ___ Weltkrieg.", "Erste", "erste"],
  ["Liebe Oma, ich danke ___ für das Geschenk.", "Dir", "dir"],
  ["Sehr geehrte Frau Müller, ich schreibe ___.", "Ihnen", "ihnen"],
  ["Nur ___ Schüler fehlten heute.", "wenige", "Wenige"],
  ["Wir hatten ___ Stunden Sport.", "zwei", "Zwei"],
  ["___ Kinder spielten auf dem Hof.", "Viele", "viele"],
  ["Welches Wort schreibt man groß?", "Haus", "haus"],
  ["Am ___ beginnt der Unterricht.", "Montag", "montag"],
  ["Sie wohnt in ___.", "München", "münchen"],
  ["Der Fluss ___ fließt durch Bayern.", "Donau", "donau"],
  ["Mein Freund ___ kommt aus Berlin.", "Tom", "tom"],
];
GROSS.forEach(([s, correct, other]) => {
  addQ("Großschreibung", "Wie schreibt man es richtig?\n„" + s + "“", [correct, other], 0, "mc");
});
addQ("Großschreibung", "Eigennamen schreibt man …", ["groß", "klein"], 0, "mc");
addQ("Großschreibung", "Unbestimmte Mengenangaben wie „viele, wenige“ schreibt man …", ["klein", "groß"], 0, "mc");

// ---------- Getrennt- & Zusammenschreibung ----------
const GETRENNT = [
  ["„Rad fahren“ schreibt man …", ["getrennt", "zusammen"], 0],
  ["„fernsehen“ (TV schauen) schreibt man …", ["zusammen", "getrennt"], 0],
  ["„spazieren gehen“ schreibt man …", ["getrennt", "zusammen"], 0],
  ["„kennenlernen“ schreibt man …", ["zusammen", "getrennt"], 0],
  ["„Auto fahren“ schreibt man …", ["getrennt", "zusammen"], 0],
  ["„staubsaugen“ schreibt man …", ["zusammen", "getrennt"], 0],
  ["„Eis laufen“ / „eislaufen“ – erlaubt ist …", ["beides", "nur getrennt"], 0],
  ["„teilnehmen“ schreibt man …", ["zusammen", "getrennt"], 0],
  ["„ernst nehmen“ schreibt man …", ["getrennt", "zusammen"], 0],
  ["„wiederholen“ (erneut tun) schreibt man …", ["zusammen", "getrennt"], 0],
];
GETRENNT.forEach(([q, opts, c]) => addQ("Getrennt/Zusammen", q, opts, c, "mc"));

// ---------- Kommasetzung (im echten Satz) ----------
const KOMMA = [
  ["Ich weiß dass du kommst.", "nach „weiß“", ["nach „dass“", "kein Komma"], "Vor dem Nebensatz mit „dass“ steht ein Komma."],
  ["Als es regnete blieben wir zu Hause.", "nach „regnete“", ["nach „Als“", "kein Komma"], "Der vorangestellte Nebensatz wird mit Komma abgetrennt."],
  ["Der Mann der dort steht ist mein Onkel.", "nach „Mann“ und „steht“", ["nur am Ende", "kein Komma"], "Der Relativsatz wird beidseitig mit Komma abgetrennt."],
  ["Ich kaufe Äpfel Birnen und Bananen.", "nach „Äpfel“", ["vor „und“", "gar nicht"], "Komma bei Aufzählung – aber nicht vor „und“."],
  ["Er ging ohne zu grüßen.", "nach „ging“", ["nach „ohne“", "kein Komma"], "Infinitivgruppe mit „ohne … zu“ → Komma."],
  ["Ich bleibe zu Hause weil ich krank bin.", "nach „Hause“", ["nach „weil“", "kein Komma"], "Vor dem Nebensatz mit „weil“ steht ein Komma."],
  ["Lisa komm bitte her.", "nach „Lisa“", ["kein Komma", "nach „her“"], "Die Anrede wird mit Komma abgetrennt."],
  ["Wenn du übst wirst du besser.", "nach „übst“", ["nach „Wenn“", "kein Komma"], "Vorangestellter Nebensatz → Komma danach."],
  ["Ich wollte gehen aber es regnete.", "vor „aber“", ["nach „aber“", "kein Komma"], "Vor entgegensetzendem „aber“ steht ein Komma."],
  ["Sie fragt ob du Zeit hast.", "nach „fragt“", ["nach „ob“", "kein Komma"], "Vor dem Nebensatz mit „ob“ steht ein Komma."],
];
KOMMA.forEach(([s, correct, distractors, ex]) => {
  addQ("Komma", "Wo steht das Komma?\n„" + s + "“", [correct].concat(distractors), 0, "comma", ex);
});
addQ("Komma", "Vor einem Nebensatz steht …", ["ein Komma", "kein Komma"], 0, "mc");
addQ("Komma", "Bei einer Aufzählung steht vor „und“ …", ["kein Komma", "ein Komma"], 0, "mc");
addQ("Komma", "Relativsätze trennt man ab mit …", ["Komma", "Punkt"], 0, "mc");

/* =====================================================================
   GRAMMATIK
   ===================================================================== */

// ---------- Wortarten ----------
const WORTARTEN = {
  Nomen: ["Hund", "Tisch", "Freiheit", "Schule", "Wasser", "Liebe", "Berg", "Auto", "Lehrer", "Stadt", "Buch"],
  Verb: ["laufen", "denken", "spielen", "essen", "schlafen", "lachen", "schreiben", "fahren", "singen", "springen"],
  Adjektiv: ["schnell", "schön", "groß", "klein", "gelb", "müde", "stark", "leise", "fleißig"],
  Adverb: ["gestern", "heute", "oft", "dort", "bald", "immer", "hier", "draußen"],
  Präposition: ["unter", "auf", "wegen", "neben", "ohne", "mit", "gegen", "trotz"],
  Konjunktion: ["und", "weil", "obwohl", "oder", "aber", "denn", "wenn"],
};
const WA_KEYS = Object.keys(WORTARTEN);
const WA_HINT = {
  Nomen: "Nomen benennen Lebewesen, Dinge oder Begriffe (oft mit Artikel, großgeschrieben).",
  Verb: "Verben sind Tätigkeitswörter und beugbar (ich …, du …).",
  Adjektiv: "Adjektive beschreiben (Wie ist etwas?) und sind steigerbar (groß–größer).",
  Adverb: "Adverbien geben Umstände an (wann/wo/wie) und sind unveränderlich.",
  Präposition: "Präpositionen stehen vor einem Nomen (auf, unter, mit, wegen …).",
  Konjunktion: "Konjunktionen verbinden Wörter oder Sätze (und, weil, dass, oder …).",
};
function waExplain(word, cat) {
  const art = (cat === "Präposition" || cat === "Konjunktion") ? "eine" : "ein";
  return "„" + word + "“ ist " + art + " " + cat + ". " + WA_HINT[cat];
}
WA_KEYS.forEach((cat, ci) => {
  WORTARTEN[cat].forEach((word) => {
    const d1 = WA_KEYS[(ci + 1) % WA_KEYS.length];
    const d2 = WA_KEYS[(ci + 3) % WA_KEYS.length];
    addQ("Wortarten", "Welche Wortart ist „" + word + "“?", [cat, d1, d2], 0, "mc", waExplain(word, cat));
  });
});
addQ("Wortarten", "Welche Wortart ist steigerbar?", ["Adjektiv", "Nomen", "Präposition"], 0, "mc", "Nur Adjektive sind steigerbar: groß – größer – am größten.");
addQ("Wortarten", "Welche Wortart bildet Zeitformen?", ["Verb", "Nomen", "Adjektiv"], 0, "mc", "Nur Verben werden in Zeitformen gebeugt (Präsens, Präteritum …).");

// ---------- Artikel (bestimmt / unbestimmt) im Satz ----------
const ARTIKEL = [
  ["Der Hund bellt laut.", "Der", "bestimmt"],
  ["Ein Hund läuft über die Straße.", "Ein", "unbestimmt"],
  ["Die Lehrerin erklärt die Aufgabe.", "Die", "bestimmt"],
  ["Eine Frau steigt in den Bus.", "Eine", "unbestimmt"],
  ["Das Kind malt ein Bild.", "Das", "bestimmt"],
  ["Ich sehe einen Vogel im Baum.", "einen", "unbestimmt"],
  ["Wir besuchen den Zoo.", "den", "bestimmt"],
  ["Sie kauft ein Eis.", "ein", "unbestimmt"],
  ["Der Lehrer lobt die Schüler.", "Der", "bestimmt"],
  ["Auf dem Tisch liegt eine Banane.", "eine", "unbestimmt"],
  ["Die Sonne scheint hell.", "Die", "bestimmt"],
  ["Ein Auto hupt.", "Ein", "unbestimmt"],
  ["Ich öffne das Fenster.", "das", "bestimmt"],
  ["Er trägt einen Hut.", "einen", "unbestimmt"],
  ["Die Katze schläft.", "Die", "bestimmt"],
  ["Es war einmal ein König.", "ein", "unbestimmt"],
];
ARTIKEL.forEach(([s, art, kind]) => {
  const opts = kind === "bestimmt" ? ["bestimmter Artikel", "unbestimmter Artikel"] : ["unbestimmter Artikel", "bestimmter Artikel"];
  addQ("Artikel", "Bestimmt oder unbestimmt? – Artikel „" + art + "“\n„" + s + "“", opts, 0, "recognize",
    kind === "bestimmt" ? "der/die/das = bestimmter Artikel." : "ein/eine/einen … = unbestimmter Artikel.");
});
addQ("Artikel", "Welches ist ein bestimmter Artikel?", ["der", "ein"], 0, "mc");
addQ("Artikel", "Welches ist ein unbestimmter Artikel?", ["eine", "die"], 0, "mc");

// ---------- Pronomen ----------
const PRON = [
  ["ich, du, er, wir", "Personalpronomen", ["Possessivpronomen", "Relativpronomen"]],
  ["mein, dein, sein, unser", "Possessivpronomen", ["Personalpronomen", "Demonstrativpronomen"]],
  ["dieser, jener, derselbe", "Demonstrativpronomen", ["Relativpronomen", "Personalpronomen"]],
  ["der, die, das (im Relativsatz)", "Relativpronomen", ["Possessivpronomen", "Personalpronomen"]],
];
PRON.forEach(([list, correct, d]) => addQ("Pronomen", "Was sind „" + list + "“?", [correct].concat(d), 0, "mc"));
const PRON_REC = [
  ["Sie trifft ihre Mutter.", "ihre", "Possessivpronomen", ["Personalpronomen"]],
  ["Der Mann, dessen Auto kaputt ist, wartet.", "dessen", "Relativpronomen", ["Possessivpronomen"]],
  ["Ich gebe es dir.", "dir", "Personalpronomen", ["Possessivpronomen"]],
  ["Dieses Buch gefällt mir.", "Dieses", "Demonstrativpronomen", ["Artikel"]],
  ["Das Kind, das dort spielt, lacht.", "das (2.)", "Relativpronomen", ["Artikel"]],
  ["Wir sehen sie morgen.", "sie", "Personalpronomen", ["Relativpronomen"]],
  ["Mein Hund ist treu.", "Mein", "Possessivpronomen", ["Personalpronomen"]],
];
PRON_REC.forEach(([s, t, label, d]) => recSentence("Pronomen", s, t, d, "Welches Pronomen / welche Art ist „" + t + "“?"));

// ---------- Fälle (Kasus) im Satz erkennen ----------
const FAELLE = [
  ["Der Hund bellt.", "Der Hund", "Nominativ", ["Akkusativ", "Dativ"]],
  ["Ich werfe den Ball.", "den Ball", "Akkusativ", ["Nominativ", "Dativ"]],
  ["Ich helfe dem Kind.", "dem Kind", "Dativ", ["Akkusativ", "Genitiv"]],
  ["Das Auto des Mannes ist neu.", "des Mannes", "Genitiv", ["Dativ", "Akkusativ"]],
  ["Die Katze schläft.", "Die Katze", "Nominativ", ["Dativ", "Akkusativ"]],
  ["Er sieht den Film.", "den Film", "Akkusativ", ["Nominativ", "Dativ"]],
  ["Wir danken dem Lehrer.", "dem Lehrer", "Dativ", ["Akkusativ", "Nominativ"]],
  ["Das ist das Haus der Familie.", "der Familie", "Genitiv", ["Dativ", "Nominativ"]],
  ["Der Junge liest ein Buch.", "ein Buch", "Akkusativ", ["Nominativ", "Dativ"]],
  ["Die Mutter gibt dem Baby Milch.", "dem Baby", "Dativ", ["Akkusativ", "Genitiv"]],
  ["Die Blume blüht.", "Die Blume", "Nominativ", ["Akkusativ", "Genitiv"]],
  ["Ich kaufe einen Apfel.", "einen Apfel", "Akkusativ", ["Dativ", "Nominativ"]],
  ["Er folgt dem Hund.", "dem Hund", "Dativ", ["Akkusativ", "Nominativ"]],
  ["Das Dach des Hauses ist rot.", "des Hauses", "Genitiv", ["Dativ", "Akkusativ"]],
  ["Der Lehrer lobt den Schüler.", "den Schüler", "Akkusativ", ["Dativ", "Nominativ"]],
  ["Das Geschenk gefällt dem Mädchen.", "dem Mädchen", "Dativ", ["Akkusativ", "Genitiv"]],
];
FAELLE.forEach(([s, phrase, kasus, d]) =>
  recSentence("Fälle", s, kasus, d, "In welchem Fall steht „" + phrase + "“?",
    "Nominativ=Wer/Was? · Akkusativ=Wen/Was? · Dativ=Wem? · Genitiv=Wessen?"));
addQ("Fälle", "Den Nominativ erfragt man mit …", ["Wer/Was?", "Wen?", "Wem?"], 0, "mc");
addQ("Fälle", "Den Dativ erfragt man mit …", ["Wem?", "Wen?", "Wessen?"], 0, "mc");
addQ("Fälle", "Den Akkusativ erfragt man mit …", ["Wen/Was?", "Wem?", "Wessen?"], 0, "mc");
addQ("Fälle", "Den Genitiv erfragt man mit …", ["Wessen?", "Wem?", "Wer?"], 0, "mc");

// ---------- Satzglieder im Satz erkennen ----------
const SATZGLIED = [
  ["Der Junge spielt Fußball.", "Der Junge", "Subjekt", ["Prädikat", "Objekt"]],
  ["Der Junge spielt Fußball.", "spielt", "Prädikat", ["Subjekt", "Objekt"]],
  ["Ich sehe den Film.", "den Film", "Akkusativobjekt", ["Subjekt", "Dativobjekt"]],
  ["Er hilft dem Kind.", "dem Kind", "Dativobjekt", ["Akkusativobjekt", "Subjekt"]],
  ["Die Katze fängt eine Maus.", "Die Katze", "Subjekt", ["Objekt", "Prädikat"]],
  ["Wir warten auf den Bus.", "auf den Bus", "Präpositionalobjekt", ["Subjekt", "Adverbiale"]],
  ["Das Mädchen liest ein Buch.", "ein Buch", "Akkusativobjekt", ["Subjekt", "Dativobjekt"]],
  ["Der Lehrer erklärt die Regel.", "Der Lehrer", "Subjekt", ["Prädikat", "Objekt"]],
  ["Sie schenkt ihrer Freundin Blumen.", "ihrer Freundin", "Dativobjekt", ["Akkusativobjekt", "Subjekt"]],
  ["Der Hund bellt laut.", "bellt", "Prädikat", ["Subjekt", "Objekt"]],
];
SATZGLIED.forEach(([s, phrase, label, d]) =>
  recSentence("Satzglieder", s, label, d, "Was ist „" + phrase + "“?"));
addQ("Satzglieder", "Das Subjekt erfragt man mit …", ["Wer/Was?", "Wen?", "Wem?"], 0, "mc");
addQ("Satzglieder", "Womit prüft man ein Satzglied?", ["Umstellprobe", "Steigerung"], 0, "mc");

// ---------- Adverbiale Bestimmungen im Satz erkennen ----------
const ADV = [
  ["Am Montag fahren wir nach Köln.", "Am Montag", "temporal", ["lokal", "modal"]],
  ["Wir treffen uns am Bahnhof.", "am Bahnhof", "lokal", ["temporal", "kausal"]],
  ["Sie singt mit Freude.", "mit Freude", "modal", ["temporal", "lokal"]],
  ["Wegen des Regens bleiben wir drinnen.", "Wegen des Regens", "kausal", ["temporal", "modal"]],
  ["Gestern war ich im Kino.", "Gestern", "temporal", ["lokal", "kausal"]],
  ["Der Hund liegt im Garten.", "im Garten", "lokal", ["temporal", "modal"]],
  ["Er rennt schnell zur Schule.", "schnell", "modal", ["temporal", "lokal"]],
  ["Aus Angst rannte sie weg.", "Aus Angst", "kausal", ["modal", "temporal"]],
  ["Um acht Uhr klingelt der Wecker.", "Um acht Uhr", "temporal", ["lokal", "modal"]],
  ["Wir wandern auf den Berg.", "auf den Berg", "lokal", ["temporal", "kausal"]],
  ["Sie arbeitet sehr sorgfältig.", "sehr sorgfältig", "modal", ["temporal", "kausal"]],
  ["Vor Müdigkeit schlief er ein.", "Vor Müdigkeit", "kausal", ["modal", "lokal"]],
  ["Nach dem Essen spielen wir.", "Nach dem Essen", "temporal", ["lokal", "modal"]],
  ["In der Stadt ist viel Verkehr.", "In der Stadt", "lokal", ["temporal", "kausal"]],
  ["Er antwortete leise.", "leise", "modal", ["temporal", "lokal"]],
  ["Aufgrund des Sturms fiel der Strom aus.", "Aufgrund des Sturms", "kausal", ["temporal", "modal"]],
  ["Seit drei Tagen regnet es.", "Seit drei Tagen", "temporal", ["lokal", "kausal"]],
  ["Die Kinder spielen auf dem Hof.", "auf dem Hof", "lokal", ["temporal", "modal"]],
  ["Sie lächelte freundlich.", "freundlich", "modal", ["temporal", "kausal"]],
  ["Wegen der Hitze ist die Schule aus.", "Wegen der Hitze", "kausal", ["temporal", "lokal"]],
];
ADV.forEach(([s, phrase, label, d]) =>
  recSentence("Adverbiale", s, label, d, "Welche adverbiale Bestimmung ist „" + phrase + "“?",
    "temporal=Wann? · lokal=Wo/Wohin? · modal=Wie? · kausal=Warum?"));

// ---------- Attribute ----------
const ATTR = [
  ["der mutige Junge", "mutige", "vorangestelltes Attribut", ["Subjekt", "Prädikat"]],
  ["das Haus meines Onkels", "meines Onkels", "nachgestelltes Attribut", ["Subjekt", "Objekt"]],
  ["die Frau mit dem Hut", "mit dem Hut", "Präpositionalattribut", ["Adverbiale", "Subjekt"]],
  ["der Mann, der dort steht", "der dort steht", "Attributsatz", ["Hauptsatz", "Adverbiale"]],
];
ATTR.forEach(([phrase, target, label, d]) =>
  recSentence("Attribute", phrase, label, d, "Was ist „" + target + "“?"));
addQ("Attribute", "Eine Beifügung am Nomen heißt …", ["Attribut", "Adverb"], 0, "mc");
addQ("Attribute", "Attribute erfragt man mit …", ["Welche(r/s)?", "Wann?"], 0, "mc");
addQ("Attribute", "„Comics, die witzig sind“ verkürzt man zu …", ["witzige Comics", "Comics witzig"], 0, "mc");
addQ("Attribute", "Attributsätze beginnen meist mit einem …", ["Relativpronomen", "Verb"], 0, "mc");

// ---------- Zeitformen im Satz erkennen ----------
const TEMPUS = [
  ["er spielt", "Präsens"], ["er spielte", "Präteritum"], ["er hat gespielt", "Perfekt"],
  ["er hatte gespielt", "Plusquamperfekt"], ["er wird spielen", "Futur I"],
  ["sie lacht", "Präsens"], ["sie lachte", "Präteritum"], ["sie hat gelacht", "Perfekt"],
  ["sie hatte gelacht", "Plusquamperfekt"], ["sie wird lachen", "Futur I"],
  ["wir gehen", "Präsens"], ["wir gingen", "Präteritum"], ["wir sind gegangen", "Perfekt"],
  ["wir waren gegangen", "Plusquamperfekt"], ["wir werden gehen", "Futur I"],
  ["ich sehe", "Präsens"], ["ich sah", "Präteritum"], ["ich habe gesehen", "Perfekt"],
  ["ich hatte gesehen", "Plusquamperfekt"], ["ich werde sehen", "Futur I"],
];
const TEMPUS_OPTS = {
  "Präsens": ["Präsens", "Präteritum", "Perfekt"],
  "Präteritum": ["Präteritum", "Präsens", "Perfekt"],
  "Perfekt": ["Perfekt", "Präteritum", "Plusquamperfekt"],
  "Plusquamperfekt": ["Plusquamperfekt", "Perfekt", "Präteritum"],
  "Futur I": ["Futur I", "Präsens", "Perfekt"],
};
TEMPUS.forEach(([form, t]) => {
  addQ("Zeitformen", "In welcher Zeitform steht „" + form + "“?", TEMPUS_OPTS[t], 0, "recognize",
    "Plusquamperfekt=hatte/war+Partizip · Perfekt=habe/bin+Partizip · Futur I=werden+Infinitiv.");
});
addQ("Zeitformen", "Die Erzählzeit beim Schreiben ist meist …", ["Präteritum", "Futur II"], 0, "mc");

// ---------- Aktiv & Passiv ----------
const AKTIVPASSIV = [
  ["Der Ball wird geworfen.", "Passiv", ["Aktiv"]],
  ["Der Junge wirft den Ball.", "Aktiv", ["Passiv"]],
  ["Das Haus wird gebaut.", "Passiv", ["Aktiv"]],
  ["Die Katze fängt die Maus.", "Aktiv", ["Passiv"]],
  ["Das Lied wurde gesungen.", "Passiv", ["Aktiv"]],
  ["Die Kinder essen Kuchen.", "Aktiv", ["Passiv"]],
];
AKTIVPASSIV.forEach(([s, label, d]) =>
  recSentence("Aktiv/Passiv", s, label, d, "Aktiv oder Passiv?"));
addQ("Aktiv/Passiv", "Das Passiv bildet man mit …", ["werden + Partizip II", "haben + Infinitiv"], 0, "mc");
addQ("Aktiv/Passiv", "Passiv von „Man baut das Haus.“", ["Das Haus wird gebaut.", "Das Haus baut."], 0, "transform");
addQ("Aktiv/Passiv", "Passiv von „Sie liest das Buch.“", ["Das Buch wird gelesen.", "Das Buch liest."], 0, "transform");

// ---------- Satzreihe & Satzgefüge ----------
const SATZARTEN = [
  ["Es regnet, und wir bleiben drinnen.", "Satzreihe", ["Satzgefüge"]],
  ["Wir bleiben drinnen, weil es regnet.", "Satzgefüge", ["Satzreihe"]],
  ["Ich lese, du schläfst.", "Satzreihe", ["Satzgefüge"]],
  ["Als es dunkel wurde, gingen wir heim.", "Satzgefüge", ["Satzreihe"]],
  ["Sie lacht, denn der Witz war gut.", "Satzreihe", ["Satzgefüge"]],
  ["Obwohl er müde war, lernte er weiter.", "Satzgefüge", ["Satzreihe"]],
];
SATZARTEN.forEach(([s, label, d]) =>
  recSentence("Satzarten", s, label, d, "Satzreihe oder Satzgefüge?",
    "Satzreihe = zwei Hauptsätze · Satzgefüge = Hauptsatz + Nebensatz."));
addQ("Satzarten", "Im Hauptsatz steht das Verb an …", ["Stelle 2", "am Ende"], 0, "mc");
addQ("Satzarten", "Im Nebensatz steht das Verb …", ["am Ende", "an Stelle 2"], 0, "mc");
addQ("Satzarten", "„weil, dass, obwohl“ sind …", ["unterordnend", "nebenordnend"], 0, "mc");
addQ("Satzarten", "„und, aber, oder, denn“ sind …", ["nebenordnend", "unterordnend"], 0, "mc");

// ---------- Umstellung: zwei Hauptsätze -> Haupt- + Nebensatz ----------
const UMSTELL = [
  ["Es regnet. Wir bleiben zu Hause.", "Weil es regnet, bleiben wir zu Hause.", "Es regnet, bleiben wir zu Hause."],
  ["Ich bin müde. Ich gehe schlafen.", "Weil ich müde bin, gehe ich schlafen.", "Ich bin müde, gehe ich schlafen."],
  ["Der Bus kam zu spät. Wir verpassten den Zug.", "Weil der Bus zu spät kam, verpassten wir den Zug.", "Der Bus kam zu spät, verpassten wir den Zug."],
  ["Es war kalt. Wir zogen Jacken an.", "Da es kalt war, zogen wir Jacken an.", "Es war kalt, zogen wir Jacken an."],
  ["Sie lernte fleißig. Sie bestand die Prüfung.", "Weil sie fleißig lernte, bestand sie die Prüfung.", "Sie lernte fleißig, bestand die Prüfung."],
  ["Es klingelte. Die Schüler gingen hinein.", "Als es klingelte, gingen die Schüler hinein.", "Es klingelte, die Schüler gingen hinein und."],
  ["Ich habe Zeit. Ich helfe dir.", "Wenn ich Zeit habe, helfe ich dir.", "Ich habe Zeit, ich helfe dir."],
  ["Er übte viel. Er wurde besser.", "Indem er viel übte, wurde er besser.", "Er übte viel, er wurde besser."],
];
UMSTELL.forEach(([pair, correct, wrong]) => {
  addQ("Umstellung", "Verbinde zu einem Satzgefüge (Haupt- + Nebensatz):\n„" + pair + "“",
    [correct, wrong], 0, "transform", "Der Nebensatz beginnt mit einer Konjunktion (weil, als, wenn …), das Verb steht am Ende.");
});
addQ("Umstellung", "Im Nebensatz steht das gebeugte Verb …", ["am Ende", "an Stelle 2"], 0, "mc");
addQ("Umstellung", "Was verbindet einen Nebensatz mit dem Hauptsatz?", ["eine Konjunktion", "nur ein Komma"], 0, "mc");

// ---------- Konjunktiv I / indirekte Rede ----------
const KONJ = [
  ["„Ich bin krank.“ → Er sagt, er ___ krank.", ["sei", "ist"], 0],
  ["„Ich habe Zeit.“ → Sie sagt, sie ___ Zeit.", ["habe", "hat"], 0],
  ["„Ich gehe nach Hause.“ → Er sagt, er ___ nach Hause.", ["gehe", "geht"], 0],
  ["„Wir kommen später.“ → Sie sagen, sie ___ später.", ["kämen/würden kommen", "kommen"], 0],
  ["Wofür nutzt man den Konjunktiv I?", ["indirekte Rede", "Befehl"], 0],
  ["Konjunktiv I bildet man vom …", ["Präsensstamm", "Präteritum"], 0],
  ["Bei Formgleichheit nutzt man die …", ["würde-Form", "Befehlsform"], 0],
  ["„Er liest.“ → Man berichtet: Er ___ ein Buch.", ["lese", "liest"], 0],
];
KONJ.forEach(([q, opts, c]) => addQ("Konjunktiv", q, opts, c, q.includes("→") ? "recognize" : "mc",
  "Indirekte Rede → Konjunktiv I (er sei, er habe, er gehe)."));

/* =====================================================================
   ERWEITERUNG – mehr Übungen pro Thema (gleiche Muster, mehr Inhalt)
   ===================================================================== */

// --- das/dass (weitere Sätze) ---
[
  ["Ich denke, ___ es klappt.", "dass"], ["Das Fahrrad, ___ mir gehört, ist neu.", "das"],
  ["Sie glaubt, ___ er lügt.", "dass"], ["Das Mädchen, ___ singt, ist begabt.", "das"],
  ["Wir wissen, ___ die Erde rund ist.", "dass"], ["Das Wasser, ___ kocht, dampft.", "das"],
  ["Ich bin überzeugt, ___ wir es schaffen.", "dass"], ["Das Auto, ___ er fährt, ist alt.", "das"],
  ["Es ärgert mich, ___ du schummelst.", "dass"], ["Das Kleid, ___ sie trägt, ist rot.", "das"],
  ["Ich befürchte, ___ es zu spät ist.", "dass"], ["Das Spiel, ___ begann, war spannend.", "das"],
  ["Sie hofft, ___ er verzeiht.", "dass"], ["Das Buch, ___ aufliegt, ist meins.", "das"],
  ["Ich merke, ___ du nervös bist.", "dass"], ["Das Foto, ___ dort hängt, ist alt.", "das"],
  ["Wir glauben, ___ es gelingt.", "dass"], ["Das Lied, ___ erklingt, ist schön.", "das"],
  ["Er weiß, ___ er gewinnen kann.", "dass"], ["Das Tor, ___ offen ist, quietscht.", "das"],
  ["Ich hoffe, ___ niemand verletzt ist.", "dass"], ["Das Haus, ___ leer steht, verfällt.", "das"],
  ["Sie betont, ___ sie pünktlich kommt.", "dass"], ["Das Kind, ___ weint, ist müde.", "das"],
  ["Ich glaube nicht, ___ das stimmt.", "dass"], ["Das Messer, ___ scharf ist, schneidet gut.", "das"],
  ["Wir sehen, ___ es schneit.", "dass"], ["Das Tier, ___ brüllt, ist ein Löwe.", "das"],
  ["Es freut sie, ___ Besuch kommt.", "dass"], ["Das Heft, ___ fehlt, war blau.", "das"],
].forEach(([s, a]) => {
  const correct = a === "dass" ? 1 : 0;
  addQ("das/dass", "Lücke füllen:\n„" + s + "“", ["das", "dass"], correct, "mc",
    a === "dass" ? "Konjunktion → „dass“." : "Artikel/Relativpronomen → „das“ (dieses/welches).");
});

// --- s-Laute (weitere Wortpaare) ---
["außen:aussen", "gießen:giessen", "schießen:schiessen", "Schoß:Schoss", "Strauß:Strauss",
 "heißen:heissen", "reißen:reissen", "weißt:weisst", "beißt:beisst", "schließlich:schliesslich",
 "bloß:bloss", "Fleiß:Fleiss", "Preis:Preiß", "Eis:Eiß", "Maus:Mauß"].forEach((p) => {
  const [r, w] = p.split(":");
  addQ("s-Laute", "Welche Schreibweise ist richtig?", [r, w], 0, "mc", "Langer Vokal/Doppellaut → „ß“ (oder einfaches s).");
});
["Imbiss:Imbiß", "Kompromiss:Kompromiß", "Abschluss:Abschluß", "bisschen:bißchen", "Erdnuss:Erdnuß",
 "Boss:Boß", "Hass:Haß", "krass:kraß", "Verschluss:Verschluß", "messen:meßen",
 "lassen:laßen", "Biss:Biß", "Schuss:Schuß", "Misserfolg:Mißerfolg", "Verriss:Verriß"].forEach((p) => {
  const [r, w] = p.split(":");
  addQ("s-Laute", "Welche Schreibweise ist richtig?", [r, w], 0, "mc", "Kurzer, betonter Vokal → „ss“.");
});

// --- Wortarten (weitere Wörter) ---
function addWortartenList(list) {
  list.forEach(([word, cat]) => {
    const ci = WA_KEYS.indexOf(cat);
    const d1 = WA_KEYS[(ci + 1) % WA_KEYS.length];
    const d2 = WA_KEYS[(ci + 3) % WA_KEYS.length];
    addQ("Wortarten", "Welche Wortart ist „" + word + "“?", [cat, d1, d2], 0, "mc", waExplain(word, cat));
  });
}
addWortartenList([
  ["Garten", "Nomen"], ["Fenster", "Nomen"], ["Sonne", "Nomen"], ["Mond", "Nomen"], ["Stuhl", "Nomen"],
  ["Brot", "Nomen"], ["Vogel", "Nomen"], ["Blume", "Nomen"], ["Wald", "Nomen"], ["Freund", "Nomen"],
  ["kommen", "Verb"], ["sehen", "Verb"], ["hören", "Verb"], ["lesen", "Verb"], ["kaufen", "Verb"],
  ["fragen", "Verb"], ["helfen", "Verb"], ["bringen", "Verb"], ["finden", "Verb"], ["geben", "Verb"],
  ["alt", "Adjektiv"], ["neu", "Adjektiv"], ["kalt", "Adjektiv"], ["warm", "Adjektiv"], ["lustig", "Adjektiv"],
  ["traurig", "Adjektiv"], ["hell", "Adjektiv"], ["dunkel", "Adjektiv"],
  ["morgen", "Adverb"], ["nie", "Adverb"], ["manchmal", "Adverb"], ["überall", "Adverb"], ["gern", "Adverb"],
  ["über", "Präposition"], ["hinter", "Präposition"], ["zwischen", "Präposition"], ["für", "Präposition"], ["bei", "Präposition"],
  ["sondern", "Konjunktion"], ["damit", "Konjunktion"], ["falls", "Konjunktion"], ["bevor", "Konjunktion"], ["nachdem", "Konjunktion"],
]);

// --- Nominalisierung (weitere) ---
[
  ["Das ___ macht Spaß.", "Malen", "malen", true], ["Beim ___ half er mit.", "Aufräumen", "aufräumen", true],
  ["Sie liebt das ___.", "Tanzen", "tanzen", true], ["Wir hatten viel ___.", "Vergnügen", "vergnügen", true],
  ["Etwas ___ blieb übrig.", "Gutes", "gutes", true], ["Das ___ tut weh.", "Stolpern", "stolpern", true],
  ["Er fing an zu ___.", "weinen", "Weinen", false], ["Sie versuchten zu ___.", "fliehen", "Fliehen", false],
  ["Wir wollen heute ___.", "feiern", "Feiern", false], ["Ohne zu ___, ging er.", "zögern", "Zögern", false],
  ["Das ___ im Chor klingt gut.", "Singen", "singen", true], ["Beim ___ war es kalt.", "Warten", "warten", true],
  ["Nichts ___ war zu sehen.", "Besonderes", "besonderes", true], ["Das ___ fiel ihm schwer.", "Aufstehen", "aufstehen", true],
  ["Er hört nicht auf zu ___.", "lachen", "Lachen", false],
].forEach(([s, c, o, big]) => {
  addQ("Nominalisierung", "Groß oder klein?\n„" + s + "“", [c, o], 0, "mc",
    big ? "Nominalisierung (Signalwort davor) → groß." : "Verb (oft mit „zu“) → klein.");
});

// --- Adverbiale (weitere echte Sätze) ---
[
  ["Heute Abend gehen wir essen.", "Heute Abend", "temporal", ["lokal", "modal"]],
  ["Sie wartet vor der Schule.", "vor der Schule", "lokal", ["temporal", "kausal"]],
  ["Er packte alles in Eile.", "in Eile", "modal", ["temporal", "lokal"]],
  ["Wegen der Kälte zittern wir.", "Wegen der Kälte", "kausal", ["temporal", "modal"]],
  ["Morgen früh fahren wir los.", "Morgen früh", "temporal", ["lokal", "modal"]],
  ["Die Bücher stehen im Regal.", "im Regal", "lokal", ["temporal", "kausal"]],
  ["Vorsichtig öffnete er die Tür.", "Vorsichtig", "modal", ["temporal", "lokal"]],
  ["Vor Freude sprang sie auf.", "Vor Freude", "kausal", ["modal", "temporal"]],
  ["Am Wochenende schlafen wir lange.", "Am Wochenende", "temporal", ["lokal", "modal"]],
  ["Unter dem Tisch liegt der Ball.", "Unter dem Tisch", "lokal", ["temporal", "modal"]],
  ["Er erklärte es geduldig.", "geduldig", "modal", ["temporal", "kausal"]],
  ["Infolge des Unfalls war Stau.", "Infolge des Unfalls", "kausal", ["temporal", "lokal"]],
  ["Während der Pause spielen wir.", "Während der Pause", "temporal", ["lokal", "modal"]],
  ["Hinter dem Haus blüht es.", "Hinter dem Haus", "lokal", ["temporal", "kausal"]],
  ["Sie sang voller Begeisterung.", "voller Begeisterung", "modal", ["temporal", "kausal"]],
  ["Aus Neugier öffnete er das Paket.", "Aus Neugier", "kausal", ["modal", "lokal"]],
  ["Im Sommer fahren wir ans Meer.", "Im Sommer", "temporal", ["lokal", "modal"]],
  ["Auf dem Markt ist viel los.", "Auf dem Markt", "lokal", ["temporal", "kausal"]],
  ["Sie reagierte ruhig.", "ruhig", "modal", ["temporal", "lokal"]],
  ["Dank seiner Hilfe schafften wir es.", "Dank seiner Hilfe", "kausal", ["temporal", "modal"]],
].forEach(([s, p, l, d]) => recSentence("Adverbiale", s, l, d, "Welche adverbiale Bestimmung ist „" + p + "“?",
  "temporal=Wann? · lokal=Wo/Wohin? · modal=Wie? · kausal=Warum?"));

// --- Fälle (weitere echte Sätze) ---
[
  ["Das Pferd galoppiert.", "Das Pferd", "Nominativ", ["Akkusativ", "Dativ"]],
  ["Ich male ein Bild.", "ein Bild", "Akkusativ", ["Nominativ", "Dativ"]],
  ["Wir gratulieren dem Sieger.", "dem Sieger", "Dativ", ["Akkusativ", "Genitiv"]],
  ["Die Farbe des Autos gefällt mir.", "des Autos", "Genitiv", ["Dativ", "Akkusativ"]],
  ["Der Vogel singt.", "Der Vogel", "Nominativ", ["Dativ", "Akkusativ"]],
  ["Sie trinkt einen Saft.", "einen Saft", "Akkusativ", ["Nominativ", "Dativ"]],
  ["Er antwortet dem Lehrer.", "dem Lehrer", "Dativ", ["Akkusativ", "Nominativ"]],
  ["Das ist das Fahrrad meiner Schwester.", "meiner Schwester", "Genitiv", ["Dativ", "Nominativ"]],
  ["Das Baby lacht.", "Das Baby", "Nominativ", ["Akkusativ", "Genitiv"]],
  ["Ich öffne die Tür.", "die Tür", "Akkusativ", ["Dativ", "Nominativ"]],
  ["Sie dankt den Helfern.", "den Helfern", "Dativ", ["Akkusativ", "Nominativ"]],
  ["Der Titel des Buches ist lang.", "des Buches", "Genitiv", ["Dativ", "Akkusativ"]],
  ["Der Zug kommt.", "Der Zug", "Nominativ", ["Akkusativ", "Dativ"]],
  ["Wir besuchen den Onkel.", "den Onkel", "Akkusativ", ["Dativ", "Nominativ"]],
  ["Das Spielzeug gehört dem Kind.", "dem Kind", "Dativ", ["Akkusativ", "Genitiv"]],
  ["Die Tür des Hauses klemmt.", "des Hauses", "Genitiv", ["Dativ", "Akkusativ"]],
].forEach(([s, p, k, d]) => recSentence("Fälle", s, k, d, "In welchem Fall steht „" + p + "“?",
  "Nominativ=Wer/Was? · Akkusativ=Wen/Was? · Dativ=Wem? · Genitiv=Wessen?"));

// --- Artikel (weitere echte Sätze) ---
[
  ["Der Baum verliert Blätter.", "Der", "bestimmt"], ["Ein Kind weint.", "Ein", "unbestimmt"],
  ["Die Lampe leuchtet.", "Die", "bestimmt"], ["Eine Biene summt.", "Eine", "unbestimmt"],
  ["Ich brauche einen Stift.", "einen", "unbestimmt"], ["Wir lesen das Buch.", "das", "bestimmt"],
  ["Er fährt einen Roller.", "einen", "unbestimmt"], ["Die Schüler lernen.", "Die", "bestimmt"],
  ["Auf dem Teller liegt ein Apfel.", "ein", "unbestimmt"], ["Der Mond scheint.", "Der", "bestimmt"],
  ["Sie hat eine Idee.", "eine", "unbestimmt"], ["Das Auto bremst.", "Das", "bestimmt"],
  ["Ich sehe einen Stern.", "einen", "unbestimmt"], ["Die Blume duftet.", "Die", "bestimmt"],
  ["Ein Lehrer erklärt.", "Ein", "unbestimmt"], ["Wir öffnen die Fenster.", "die", "bestimmt"],
].forEach(([s, art, kind]) => {
  const opts = kind === "bestimmt" ? ["bestimmter Artikel", "unbestimmter Artikel"] : ["unbestimmter Artikel", "bestimmter Artikel"];
  addQ("Artikel", "Bestimmt oder unbestimmt? – Artikel „" + art + "“\n„" + s + "“", opts, 0, "recognize",
    kind === "bestimmt" ? "der/die/das = bestimmt." : "ein/eine/einen = unbestimmt.");
});

// --- Zeitformen (weitere Verbformen) ---
[
  ["du machst", "Präsens"], ["du machtest", "Präteritum"], ["du hast gemacht", "Perfekt"],
  ["du hattest gemacht", "Plusquamperfekt"], ["du wirst machen", "Futur I"],
  ["es regnet", "Präsens"], ["es regnete", "Präteritum"], ["es hat geregnet", "Perfekt"],
  ["es hatte geregnet", "Plusquamperfekt"], ["es wird regnen", "Futur I"],
  ["ihr kommt", "Präsens"], ["ihr kamt", "Präteritum"], ["ihr seid gekommen", "Perfekt"],
  ["ihr wart gekommen", "Plusquamperfekt"], ["ihr werdet kommen", "Futur I"],
  ["er fährt", "Präsens"], ["er fuhr", "Präteritum"], ["er ist gefahren", "Perfekt"],
  ["er war gefahren", "Plusquamperfekt"], ["er wird fahren", "Futur I"],
].forEach(([form, t]) => addQ("Zeitformen", "In welcher Zeitform steht „" + form + "“?", TEMPUS_OPTS[t], 0, "recognize",
  "Plusquamperfekt=hatte/war+Partizip · Perfekt=habe/bin+Partizip · Futur I=werden+Infinitiv."));

// --- Großschreibung (weitere) ---
[
  ["Der ___ Wald ist ein Wald in Deutschland.", "Schwarze", "schwarze"],
  ["Wir feiern den ___ Mai.", "Ersten", "ersten"],
  ["Liebe Tante, ich grüße ___ herzlich.", "Dich", "dich"],
  ["Hallo Herr Bauer, können ___ mir helfen?", "Sie", "sie"],
  ["Es kamen nur ___ Gäste.", "wenige", "Wenige"],
  ["Sie hat ___ Hunde.", "zwei", "Zwei"],
  ["Welches Wort schreibt man groß?", "Tisch", "tisch"],
  ["Am ___ ist schulfrei.", "Sonntag", "sonntag"],
  ["Er stammt aus ___.", "Italien", "italien"],
  ["Mein Bruder ___ ist klein.", "Max", "max"],
  ["Die ___ Alpen sind hoch.", "Bayerischen", "bayerischen"],
  ["___ Schüler haben bestanden.", "Viele", "viele"],
].forEach(([s, c, o]) => addQ("Großschreibung", "Wie schreibt man es richtig?\n„" + s + "“", [c, o], 0, "mc"));

// --- Komma (weitere echte Sätze) ---
[
  ["Sie sagte dass sie kommt.", "nach „sagte“", ["nach „dass“", "kein Komma"], "Komma vor dem dass-Satz."],
  ["Nachdem er aß ging er.", "nach „aß“", ["nach „Nachdem“", "kein Komma"], "Vorangestellter Nebensatz → Komma."],
  ["Das Buch das ich lese ist dick.", "nach „Buch“ und „lese“", ["nur am Ende", "kein Komma"], "Relativsatz beidseitig abtrennen."],
  ["Wir packen Brot Käse und Obst ein.", "nach „Brot“", ["vor „und“", "gar nicht"], "Aufzählung, aber nicht vor „und“."],
  ["Er kam herein ohne zu klopfen.", "nach „herein“", ["nach „ohne“", "kein Komma"], "Infinitivgruppe „ohne … zu“."],
  ["Ich freue mich weil du da bist.", "nach „mich“", ["nach „weil“", "kein Komma"], "Komma vor dem weil-Satz."],
  ["Paul hör bitte zu.", "nach „Paul“", ["kein Komma", "nach „zu“"], "Anrede abtrennen."],
  ["Wenn es schneit fahren wir Schlitten.", "nach „schneit“", ["nach „Wenn“", "kein Komma"], "Vorangestellter Nebensatz → Komma."],
  ["Ich rufe an aber niemand hebt ab.", "vor „aber“", ["nach „aber“", "kein Komma"], "Vor „aber“ steht ein Komma."],
  ["Er weiß nicht ob es klappt.", "nach „nicht“", ["nach „ob“", "kein Komma"], "Komma vor dem ob-Satz."],
].forEach(([s, c, d, ex]) => addQ("Komma", "Wo steht das Komma?\n„" + s + "“", [c].concat(d), 0, "comma", ex));

// --- Satzglieder (weitere) ---
[
  ["Die Sonne wärmt die Erde.", "Die Sonne", "Subjekt", ["Prädikat", "Objekt"]],
  ["Die Sonne wärmt die Erde.", "die Erde", "Akkusativobjekt", ["Subjekt", "Dativobjekt"]],
  ["Der Vater kocht das Essen.", "Der Vater", "Subjekt", ["Objekt", "Prädikat"]],
  ["Ich schenke meiner Oma Blumen.", "meiner Oma", "Dativobjekt", ["Akkusativobjekt", "Subjekt"]],
  ["Der Ball rollt schnell.", "rollt", "Prädikat", ["Subjekt", "Objekt"]],
  ["Wir denken an die Ferien.", "an die Ferien", "Präpositionalobjekt", ["Subjekt", "Adverbiale"]],
  ["Das Kind isst einen Apfel.", "einen Apfel", "Akkusativobjekt", ["Subjekt", "Dativobjekt"]],
  ["Die Schüler hören dem Lehrer zu.", "dem Lehrer", "Dativobjekt", ["Akkusativobjekt", "Subjekt"]],
  ["Mein Bruder repariert das Rad.", "Mein Bruder", "Subjekt", ["Objekt", "Prädikat"]],
  ["Die Maus versteckt sich.", "versteckt sich", "Prädikat", ["Subjekt", "Objekt"]],
].forEach(([s, p, l, d]) => recSentence("Satzglieder", s, l, d, "Was ist „" + p + "“?"));

// --- Pronomen (weitere) ---
[
  ["Er gibt mir das Buch.", "mir", "Personalpronomen", ["Possessivpronomen"]],
  ["Das ist unser Auto.", "unser", "Possessivpronomen", ["Personalpronomen"]],
  ["Jenes Haus ist alt.", "Jenes", "Demonstrativpronomen", ["Artikel"]],
  ["Die Frau, die singt, ist berühmt.", "die (2.)", "Relativpronomen", ["Artikel"]],
  ["Ich sehe dich.", "dich", "Personalpronomen", ["Possessivpronomen"]],
  ["Deine Idee ist gut.", "Deine", "Possessivpronomen", ["Demonstrativpronomen"]],
  ["Wir helfen euch.", "euch", "Personalpronomen", ["Relativpronomen"]],
  ["Der Stift, der hier liegt, ist blau.", "der (2.)", "Relativpronomen", ["Artikel"]],
].forEach(([s, t, l, d]) => recSentence("Pronomen", s, t, d, "Welche Art ist „" + t + "“?"));

// --- Attribute (weitere) ---
[
  ["die schnelle Läuferin", "schnelle", "vorangestelltes Attribut", ["Subjekt", "Prädikat"]],
  ["der Hut des Mannes", "des Mannes", "nachgestelltes Attribut", ["Subjekt", "Objekt"]],
  ["das Kind mit dem Ball", "mit dem Ball", "Präpositionalattribut", ["Adverbiale", "Subjekt"]],
  ["der Schüler, der lernt", "der lernt", "Attributsatz", ["Hauptsatz", "Adverbiale"]],
  ["ein riesiger Berg", "riesiger", "vorangestelltes Attribut", ["Objekt", "Prädikat"]],
  ["die Tür des Hauses", "des Hauses", "nachgestelltes Attribut", ["Subjekt", "Adverbiale"]],
].forEach(([phrase, t, l, d]) => recSentence("Attribute", phrase, l, d, "Was ist „" + t + "“?"));

// --- Getrennt/Zusammen (weitere) ---
[
  ["„kaputtmachen“ schreibt man …", ["zusammen", "getrennt"], 0],
  ["„nach Hause gehen“ schreibt man …", ["getrennt", "zusammen"], 0],
  ["„aufpassen“ schreibt man …", ["zusammen", "getrennt"], 0],
  ["„Klavier spielen“ schreibt man …", ["getrennt", "zusammen"], 0],
  ["„zurückkommen“ schreibt man …", ["zusammen", "getrennt"], 0],
  ["„Fußball spielen“ schreibt man …", ["getrennt", "zusammen"], 0],
  ["„mitnehmen“ schreibt man …", ["zusammen", "getrennt"], 0],
  ["„krank sein“ schreibt man …", ["getrennt", "zusammen"], 0],
].forEach(([q, o, c]) => addQ("Getrennt/Zusammen", q, o, c, "mc"));

// --- Aktiv/Passiv (weitere) ---
[
  ["Die Tür wird geöffnet.", "Passiv", ["Aktiv"]],
  ["Der Koch brät das Fleisch.", "Aktiv", ["Passiv"]],
  ["Das Fenster wurde geputzt.", "Passiv", ["Aktiv"]],
  ["Die Hunde bellen den Briefträger an.", "Aktiv", ["Passiv"]],
  ["Der Brief wird geschrieben.", "Passiv", ["Aktiv"]],
  ["Die Mannschaft gewinnt das Spiel.", "Aktiv", ["Passiv"]],
].forEach(([s, l, d]) => recSentence("Aktiv/Passiv", s, l, d, "Aktiv oder Passiv?"));

// --- Satzarten (weitere) ---
[
  ["Ich koche, und du deckst den Tisch.", "Satzreihe", ["Satzgefüge"]],
  ["Damit wir gewinnen, müssen wir üben.", "Satzgefüge", ["Satzreihe"]],
  ["Er rennt, sie geht.", "Satzreihe", ["Satzgefüge"]],
  ["Bevor wir essen, waschen wir die Hände.", "Satzgefüge", ["Satzreihe"]],
  ["Das Eis schmilzt, denn es ist heiß.", "Satzreihe", ["Satzgefüge"]],
  ["Wenn du willst, helfe ich dir.", "Satzgefüge", ["Satzreihe"]],
].forEach(([s, l, d]) => recSentence("Satzarten", s, l, d, "Satzreihe oder Satzgefüge?",
  "Satzreihe = zwei Hauptsätze · Satzgefüge = Hauptsatz + Nebensatz."));

// --- Umstellung (weitere) ---
[
  ["Die Sonne schien. Wir gingen baden.", "Weil die Sonne schien, gingen wir baden.", "Die Sonne schien, wir gingen baden."],
  ["Er hatte Hunger. Er machte sich ein Brot.", "Weil er Hunger hatte, machte er sich ein Brot.", "Er hatte Hunger, machte sich ein Brot."],
  ["Es wurde spät. Wir gingen nach Hause.", "Als es spät wurde, gingen wir nach Hause.", "Es wurde spät, gingen wir nach Hause."],
  ["Du hilfst mir. Ich schaffe es.", "Wenn du mir hilfst, schaffe ich es.", "Du hilfst mir, schaffe ich es."],
  ["Sie war krank. Sie blieb im Bett.", "Da sie krank war, blieb sie im Bett.", "Sie war krank, blieb im Bett."],
  ["Wir sparten lange. Wir kauften ein Auto.", "Weil wir lange sparten, kauften wir ein Auto.", "Wir sparten lange, kauften ein Auto."],
  ["Der Wecker klingelte. Ich stand auf.", "Als der Wecker klingelte, stand ich auf.", "Der Wecker klingelte, ich stand auf und."],
  ["Es ist dunkel. Wir machen Licht an.", "Weil es dunkel ist, machen wir Licht an.", "Es ist dunkel, machen wir Licht an."],
].forEach(([pair, c, w]) => addQ("Umstellung", "Verbinde zu einem Satzgefüge (Haupt- + Nebensatz):\n„" + pair + "“",
  [c, w], 0, "transform", "Nebensatz mit Konjunktion (weil/als/wenn …), Verb am Ende."));

// --- Konjunktiv (weitere) ---
[
  ["„Ich komme später.“ → Er sagt, er ___ später.", ["komme", "kommt"], 0],
  ["„Ich kann nicht.“ → Sie sagt, sie ___ nicht.", ["könne", "kann"], 0],
  ["„Wir gewinnen.“ → Sie sagen, sie ___.", ["würden gewinnen", "gewinnen"], 0],
  ["„Ich weiß es.“ → Er sagt, er ___ es.", ["wisse", "weiß"], 0],
  ["„Ich gehe heim.“ → Man berichtet: Er ___ heim.", ["gehe", "geht"], 0],
  ["„Ich habe Recht.“ → Sie meint, sie ___ Recht.", ["habe", "hat"], 0],
  ["„Ich bin froh.“ → Er sagt, er ___ froh.", ["sei", "ist"], 0],
  ["„Ich muss los.“ → Sie sagt, sie ___ los.", ["müsse", "muss"], 0],
].forEach(([q, o, c]) => addQ("Konjunktiv", q, o, c, "recognize", "Indirekte Rede → Konjunktiv I."));

/* =====================================================================
   ERWEITERUNG 2 – weiterer großer Ausbau (Richtung ~10x)
   Schwerpunkte: Rechtschreibung, Kommasetzung, Fälle, Umstellung
   ===================================================================== */

// --- das/dass (30 weitere) ---
[
  ["Ich glaube, ___ er schläft.", "dass"], ["Das Zelt, ___ wir aufbauen, ist grün.", "das"],
  ["Sie hofft, ___ es schneit.", "dass"], ["Das Rätsel, ___ ich löse, ist schwer.", "das"],
  ["Wir bemerken, ___ etwas nicht stimmt.", "dass"], ["Das Boot, ___ schwankt, kentert fast.", "das"],
  ["Ich bin traurig, ___ du gehst.", "dass"], ["Das Paket, ___ ankam, war schwer.", "das"],
  ["Er hofft, ___ sie zuhört.", "dass"], ["Das Lied, ___ sie summt, ist fröhlich.", "das"],
  ["Wir wünschen, ___ alle mitmachen.", "dass"], ["Das Spiel, ___ endete, war fair.", "das"],
  ["Ich spüre, ___ es kälter wird.", "dass"], ["Das Schiff, ___ ausläuft, ist riesig.", "das"],
  ["Sie weiß genau, ___ sie es kann.", "dass"], ["Das Brötchen, ___ knusprig ist, schmeckt.", "das"],
  ["Ich bezweifle, ___ das reicht.", "dass"], ["Das Auto, ___ blinkt, biegt ab.", "das"],
  ["Wir hoffen sehr, ___ ihr kommt.", "dass"], ["Das Fenster, ___ klemmt, geht schwer auf.", "das"],
  ["Er erkennt, ___ er sich irrt.", "dass"], ["Das Plakat, ___ dort hängt, ist bunt.", "das"],
  ["Ich freue mich, ___ Wochenende ist.", "dass"], ["Das Tier, ___ schnurrt, ist zufrieden.", "das"],
  ["Sie betont, ___ es wichtig ist.", "dass"], ["Das Glas, ___ zerbrach, war teuer.", "das"],
  ["Wir glauben fest, ___ wir siegen.", "dass"], ["Das Handy, ___ klingelt, ist meins.", "das"],
  ["Ich hoffe nur, ___ nichts passiert.", "dass"], ["Das Buch, ___ aufgeschlagen ist, ist alt.", "das"],
].forEach(([s, a]) => addQ("das/dass", "Lücke füllen:\n„" + s + "“", ["das", "dass"], a === "dass" ? 1 : 0, "mc",
  a === "dass" ? "Konjunktion → „dass“." : "Artikel/Relativpronomen → „das“ (dieses/welches)."));

// --- s-Laute (weitere Wortpaare) ---
["grüßen:grüssen", "äußern:äussern", "schmeißen:schmeissen", "ließ:liess", "hieß:hiess",
 "stieß:stiess", "Buße:Busse", "Muße:Musse", "Spieß:Spiess"].forEach((p) => {
  const [r, w] = p.split(":"); addQ("s-Laute", "Welche Schreibweise ist richtig?", [r, w], 0, "mc", "Langer Vokal/Doppellaut → „ß“.");
});
["Pass:Paß", "Ross:Roß", "schoss:schoß", "Geschoss:Geschoß"].forEach((p) => {
  const [r, w] = p.split(":"); addQ("s-Laute", "Welche Schreibweise ist richtig?", [r, w], 0, "mc", "Kurzer, betonter Vokal → „ss“.");
});

// --- Wortarten (40 weitere) ---
addWortartenList([
  ["Apfel", "Nomen"], ["Regen", "Nomen"], ["Schnee", "Nomen"], ["Wind", "Nomen"], ["Katze", "Nomen"],
  ["Maus", "Nomen"], ["Stern", "Nomen"], ["Wolke", "Nomen"], ["Tür", "Nomen"], ["Tasche", "Nomen"],
  ["trinken", "Verb"], ["schwimmen", "Verb"], ["malen", "Verb"], ["bauen", "Verb"], ["werfen", "Verb"],
  ["fangen", "Verb"], ["rufen", "Verb"], ["tragen", "Verb"], ["ziehen", "Verb"], ["gewinnen", "Verb"],
  ["rund", "Adjektiv"], ["breit", "Adjektiv"], ["leer", "Adjektiv"], ["voll", "Adjektiv"], ["frei", "Adjektiv"],
  ["krank", "Adjektiv"], ["reich", "Adjektiv"], ["arm", "Adjektiv"],
  ["drinnen", "Adverb"], ["oben", "Adverb"], ["unten", "Adverb"], ["vorne", "Adverb"], ["hinten", "Adverb"], ["nirgends", "Adverb"],
  ["durch", "Präposition"], ["um", "Präposition"], ["seit", "Präposition"], ["bis", "Präposition"],
  ["während", "Konjunktion"], ["sobald", "Konjunktion"],
]);

// --- Nominalisierung (weitere) ---
[
  ["Das ___ macht satt.", "Essen", "essen", true], ["Beim ___ verlor er.", "Spielen", "spielen", true],
  ["Sie liebt das ___.", "Reiten", "reiten", true], ["Das ___ tut gut.", "Ausruhen", "ausruhen", true],
  ["Beim ___ half jeder.", "Tragen", "tragen", true], ["Etwas ___ lag in der Luft.", "Geheimnisvolles", "geheimnisvolles", true],
  ["Das ___ fällt schwer.", "Aufgeben", "aufgeben", true], ["Er begann zu ___.", "singen", "Singen", false],
  ["Sie wagte zu ___.", "springen", "Springen", false], ["Das laute ___ störte.", "Klingeln", "klingeln", true],
  ["Beim ___ ist Vorsicht nötig.", "Schneiden", "schneiden", true], ["Nichts ___ geschah.", "Schlimmes", "schlimmes", true],
  ["Das ständige ___ nervt.", "Fragen", "fragen", true], ["Er hat Angst vor dem ___.", "Verlieren", "verlieren", true],
  ["Ohne zu ___, sprang er.", "überlegen", "Überlegen", false], ["Wir hörten ein ___.", "Rascheln", "rascheln", true],
  ["Das frühe ___ war hart.", "Aufstehen", "aufstehen", true], ["Sie übt das ___.", "Schreiben", "schreiben", true],
  ["Es gab viel zu ___.", "tun", "Tun", false], ["Das schnelle ___ ermüdete.", "Rennen", "rennen", true],
].forEach(([s, c, o, big]) => addQ("Nominalisierung", "Groß oder klein?\n„" + s + "“", [c, o], 0, "mc",
  big ? "Nominalisierung (Signalwort davor) → groß." : "Verb (oft mit „zu“) → klein."));

// --- Großschreibung (weitere) ---
[
  ["Wir reisen nach ___.", "Spanien", "spanien"], ["Der ___ Ozean ist warm.", "Indische", "indische"],
  ["Mein Hund heißt ___.", "Bello", "bello"], ["Am ___ ist Markt.", "Freitag", "freitag"],
  ["Sie spricht ___.", "Englisch", "englisch"], ["Im ___ wird es kalt.", "Winter", "winter"],
  ["Wir feiern ___.", "Weihnachten", "weihnachten"], ["Das ist die ___ Mauer.", "Chinesische", "chinesische"],
  ["Nur ___ kamen.", "manche", "Manche"], ["Es waren ___ Leute da.", "viele", "Viele"],
  ["Welches Wort schreibt man groß?", "Vogel", "vogel"], ["Welches Wort schreibt man groß?", "Apfel", "apfel"],
  ["Er kommt aus ___.", "Frankreich", "frankreich"], ["Liebe Mia, ich schreibe ___ bald.", "Dir", "dir"],
  ["Am ___ schlafen wir lange.", "Wochenende", "wochenende"], ["Der ___ Wald liegt in Bayern.", "Bayerische", "bayerische"],
  ["Sie isst ein ___.", "Brötchen", "brötchen"], ["Wir sahen den ___.", "Eiffelturm", "eiffelturm"],
  ["Das ___ Reich war groß.", "Römische", "römische"], ["Wir fahren zum ___.", "Bahnhof", "bahnhof"],
  ["Ich lese ein ___.", "Buch", "buch"], ["Hallo Herr Ott, können ___ helfen?", "Sie", "sie"],
].forEach(([s, c, o]) => addQ("Großschreibung", "Wie schreibt man es richtig?\n„" + s + "“", [c, o], 0, "mc"));

// --- Getrennt/Zusammen (weitere) ---
[
  ["„zu Hause“ schreibt man …", ["getrennt", "zusammen"], 0], ["„nach Hause“ schreibt man …", ["getrennt", "zusammen"], 0],
  ["„hinausgehen“ schreibt man …", ["zusammen", "getrennt"], 0], ["„Ski fahren“ schreibt man …", ["getrennt", "zusammen"], 0],
  ["„heimkommen“ schreibt man …", ["zusammen", "getrennt"], 0], ["„zu viel“ schreibt man …", ["getrennt", "zusammen"], 0],
  ["„irgendwie“ schreibt man …", ["zusammen", "getrennt"], 0], ["„nebeneinander“ schreibt man …", ["zusammen", "getrennt"], 0],
  ["„abnehmen“ schreibt man …", ["zusammen", "getrennt"], 0], ["„hin und her“ schreibt man …", ["getrennt", "zusammen"], 0],
  ["„dazugehören“ schreibt man …", ["zusammen", "getrennt"], 0], ["„auswendig lernen“ schreibt man …", ["getrennt", "zusammen"], 0],
  ["„weitermachen“ schreibt man …", ["zusammen", "getrennt"], 0], ["„auseinandernehmen“ schreibt man …", ["zusammen", "getrennt"], 0],
  ["„spazieren fahren“ schreibt man …", ["getrennt", "zusammen"], 0], ["„aufstehen“ schreibt man …", ["zusammen", "getrennt"], 0],
  ["„kennen lernen“ – erlaubt ist …", ["beides", "nur getrennt"], 0], ["„übereinanderlegen“ schreibt man …", ["zusammen", "getrennt"], 0],
].forEach(([q, o, c]) => addQ("Getrennt/Zusammen", q, o, c, "mc"));

// --- Komma (30 weitere, echte Sätze) ---
[
  ["Wir warten bis der Regen aufhört.", "nach „warten“", ["nach „bis“", "kein Komma"], "Komma vor dem Nebensatz mit „bis“."],
  ["Er weiß dass es stimmt.", "nach „weiß“", ["nach „dass“", "kein Komma"], "Komma vor dem dass-Satz."],
  ["Das Kind das lacht ist froh.", "nach „Kind“ und „lacht“", ["nur am Ende", "kein Komma"], "Relativsatz beidseitig abtrennen."],
  ["Ich kaufe Stifte Hefte und Kleber.", "nach „Stifte“", ["vor „und“", "gar nicht"], "Aufzählung, kein Komma vor „und“."],
  ["Sie ging weg ohne sich umzudrehen.", "nach „weg“", ["nach „ohne“", "kein Komma"], "Infinitivgruppe „ohne … zu“."],
  ["Wir feiern weil du Geburtstag hast.", "nach „feiern“", ["nach „weil“", "kein Komma"], "Komma vor dem weil-Satz."],
  ["Tom warte auf mich.", "nach „Tom“", ["kein Komma", "nach „mich“"], "Anrede abtrennen."],
  ["Wenn ich groß bin werde ich Pilot.", "nach „bin“", ["nach „Wenn“", "kein Komma"], "Vorangestellter Nebensatz → Komma."],
  ["Ich rufe an doch keiner geht ran.", "vor „doch“", ["nach „doch“", "kein Komma"], "Vor „doch“ steht ein Komma."],
  ["Er fragt wann der Zug kommt.", "nach „fragt“", ["nach „wann“", "kein Komma"], "Komma vor dem Nebensatz."],
  ["Bevor du gehst räum auf.", "nach „gehst“", ["nach „Bevor“", "kein Komma"], "Vorangestellter Nebensatz → Komma."],
  ["Das Haus das wir kauften ist alt.", "nach „Haus“ und „kauften“", ["nur am Ende", "kein Komma"], "Relativsatz beidseitig."],
  ["Er kam an als es dunkel war.", "nach „an“", ["nach „als“", "kein Komma"], "Komma vor dem als-Satz."],
  ["Sie lacht obwohl sie traurig ist.", "nach „lacht“", ["nach „obwohl“", "kein Komma"], "Komma vor dem obwohl-Satz."],
  ["Ich weiß nicht ob er kommt.", "nach „nicht“", ["nach „ob“", "kein Komma"], "Komma vor dem ob-Satz."],
  ["Das Auto das rot ist gehört mir.", "nach „Auto“ und „ist“", ["nur am Ende", "kein Komma"], "Relativsatz beidseitig."],
  ["Wir bleiben hier weil es regnet.", "nach „hier“", ["nach „weil“", "kein Komma"], "Komma vor dem weil-Satz."],
  ["Liebe Frau Klein ich danke Ihnen.", "nach „Klein“", ["kein Komma", "nach „Ihnen“"], "Briefanrede abtrennen."],
  ["Er übt damit er besser wird.", "nach „übt“", ["nach „damit“", "kein Komma"], "Komma vor dem damit-Satz."],
  ["Sobald es klingelt gehen wir.", "nach „klingelt“", ["nach „Sobald“", "kein Komma"], "Vorangestellter Nebensatz → Komma."],
  ["Ich mag Sommer aber ich hasse Hitze.", "vor „aber“", ["nach „aber“", "kein Komma"], "Vor „aber“ steht ein Komma."],
  ["Die Frau die dort steht winkt.", "nach „Frau“ und „steht“", ["nur am Ende", "kein Komma"], "Relativsatz beidseitig."],
  ["Wir essen während der Film läuft.", "nach „essen“", ["nach „während“", "kein Komma"], "Komma vor dem Nebensatz."],
  ["Er rannte los um den Bus zu erreichen.", "nach „los“", ["nach „um“", "kein Komma"], "Infinitivgruppe „um … zu“."],
  ["Ich glaube er hat recht.", "nach „glaube“", ["kein Komma", "nach „hat“"], "Komma zwischen Haupt- und Nebensatz."],
  ["Sag mir was du willst.", "nach „mir“", ["nach „was“", "kein Komma"], "Komma vor dem Nebensatz."],
  ["Nachdem wir aßen spielten wir.", "nach „aßen“", ["nach „Nachdem“", "kein Komma"], "Vorangestellter Nebensatz → Komma."],
  ["Ich nehme Apfel Birne und Pflaume mit.", "nach „Apfel“", ["vor „und“", "gar nicht"], "Aufzählung, kein Komma vor „und“."],
  ["Komm her und hilf mir.", "kein Komma", ["vor „und“", "nach „her“"], "Zwischen kurzen Hauptsätzen mit „und“ meist kein Komma."],
  ["Wir packten ein als es hell wurde.", "nach „ein“", ["nach „als“", "kein Komma"], "Komma vor dem als-Satz."],
].forEach(([s, c, d, ex]) => addQ("Komma", "Wo steht das Komma?\n„" + s + "“", [c].concat(d), 0, "comma", ex));

// --- Artikel (weitere) ---
[
  ["Der Wind weht.", "Der", "bestimmt"], ["Ein Stern fällt.", "Ein", "unbestimmt"],
  ["Die Uhr tickt.", "Die", "bestimmt"], ["Eine Wolke zieht vorbei.", "Eine", "unbestimmt"],
  ["Ich brauche eine Schere.", "eine", "unbestimmt"], ["Wir öffnen das Tor.", "das", "bestimmt"],
  ["Er hat einen Plan.", "einen", "unbestimmt"], ["Die Gäste kommen.", "Die", "bestimmt"],
  ["Da liegt ein Brief.", "ein", "unbestimmt"], ["Der Zug fährt ab.", "Der", "bestimmt"],
  ["Sie malt ein Herz.", "ein", "unbestimmt"], ["Das Spiel beginnt.", "Das", "bestimmt"],
  ["Ich sehe eine Eule.", "eine", "unbestimmt"], ["Die Brücke ist lang.", "Die", "bestimmt"],
  ["Ein Junge winkt.", "Ein", "unbestimmt"], ["Wir loben den Helfer.", "den", "bestimmt"],
  ["Er kauft einen Ball.", "einen", "unbestimmt"], ["Die Lehrerin lacht.", "Die", "bestimmt"],
  ["Auf dem Baum sitzt eine Krähe.", "eine", "unbestimmt"], ["Das Boot schwimmt.", "Das", "bestimmt"],
].forEach(([s, art, kind]) => {
  const opts = kind === "bestimmt" ? ["bestimmter Artikel", "unbestimmter Artikel"] : ["unbestimmter Artikel", "bestimmter Artikel"];
  addQ("Artikel", "Bestimmt oder unbestimmt? – Artikel „" + art + "“\n„" + s + "“", opts, 0, "recognize",
    kind === "bestimmt" ? "der/die/das = bestimmt." : "ein/eine/einen = unbestimmt.");
});

// --- Pronomen (weitere) ---
[
  ["Er ruft uns.", "uns", "Personalpronomen", ["Possessivpronomen"]],
  ["Das ist euer Ball.", "euer", "Possessivpronomen", ["Personalpronomen"]],
  ["Diese Tasche ist neu.", "Diese", "Demonstrativpronomen", ["Artikel"]],
  ["Der Junge, der rennt, gewinnt.", "der (2.)", "Relativpronomen", ["Artikel"]],
  ["Ich höre dich.", "dich", "Personalpronomen", ["Possessivpronomen"]],
  ["Sein Hund bellt.", "Sein", "Possessivpronomen", ["Personalpronomen"]],
  ["Wir danken ihnen.", "ihnen", "Personalpronomen", ["Relativpronomen"]],
  ["Das Buch, das hier liegt, ist neu.", "das (2.)", "Relativpronomen", ["Artikel"]],
  ["Ihre Katze schläft.", "Ihre", "Possessivpronomen", ["Demonstrativpronomen"]],
  ["Jener Mann winkt.", "Jener", "Demonstrativpronomen", ["Artikel"]],
  ["Die Schüler, die lernen, bestehen.", "die (2.)", "Relativpronomen", ["Artikel"]],
  ["Unser Haus ist groß.", "Unser", "Possessivpronomen", ["Personalpronomen"]],
].forEach(([s, t, l, d]) => recSentence("Pronomen", s, l, d, "Welche Art ist „" + t + "“?"));
addQ("Pronomen", "„uns, euch, ihnen“ sind …", ["Personalpronomen", "Possessivpronomen"], 0, "mc");
addQ("Pronomen", "„unser, euer, ihr“ sind …", ["Possessivpronomen", "Personalpronomen"], 0, "mc");

// --- Fälle (35 weitere, echte Sätze) ---
[
  ["Die Lampe brennt.", "Die Lampe", "Nominativ", ["Akkusativ", "Dativ"]],
  ["Ich esse den Kuchen.", "den Kuchen", "Akkusativ", ["Nominativ", "Dativ"]],
  ["Er schenkt der Frau Blumen.", "der Frau", "Dativ", ["Akkusativ", "Genitiv"]],
  ["Das Auto des Nachbarn ist neu.", "des Nachbarn", "Genitiv", ["Dativ", "Akkusativ"]],
  ["Der Wind weht stark.", "Der Wind", "Nominativ", ["Dativ", "Akkusativ"]],
  ["Wir bauen ein Haus.", "ein Haus", "Akkusativ", ["Nominativ", "Dativ"]],
  ["Sie hilft dem Bruder.", "dem Bruder", "Dativ", ["Akkusativ", "Nominativ"]],
  ["Die Tasche der Lehrerin ist schwer.", "der Lehrerin", "Genitiv", ["Dativ", "Nominativ"]],
  ["Das Telefon klingelt.", "Das Telefon", "Nominativ", ["Akkusativ", "Genitiv"]],
  ["Er liest die Zeitung.", "die Zeitung", "Akkusativ", ["Dativ", "Nominativ"]],
  ["Ich glaube dem Zeugen.", "dem Zeugen", "Dativ", ["Akkusativ", "Nominativ"]],
  ["Der Hut des Clowns ist bunt.", "des Clowns", "Genitiv", ["Dativ", "Akkusativ"]],
  ["Die Kinder spielen draußen.", "Die Kinder", "Nominativ", ["Dativ", "Akkusativ"]],
  ["Sie kauft einen Mantel.", "einen Mantel", "Akkusativ", ["Nominativ", "Dativ"]],
  ["Wir antworten der Frau.", "der Frau", "Dativ", ["Akkusativ", "Genitiv"]],
  ["Das Ende des Films war traurig.", "des Films", "Genitiv", ["Dativ", "Nominativ"]],
  ["Der Lehrer spricht laut.", "Der Lehrer", "Nominativ", ["Akkusativ", "Dativ"]],
  ["Ich öffne das Geschenk.", "das Geschenk", "Akkusativ", ["Dativ", "Nominativ"]],
  ["Er folgt dem Weg.", "dem Weg", "Dativ", ["Akkusativ", "Genitiv"]],
  ["Die Farbe der Wand gefällt mir.", "der Wand", "Genitiv", ["Dativ", "Akkusativ"]],
  ["Das Pferd frisst Heu.", "Das Pferd", "Nominativ", ["Akkusativ", "Genitiv"]],
  ["Sie trägt eine Brille.", "eine Brille", "Akkusativ", ["Dativ", "Nominativ"]],
  ["Wir gratulieren den Gewinnern.", "den Gewinnern", "Dativ", ["Akkusativ", "Nominativ"]],
  ["Der Schwanz des Hundes wedelt.", "des Hundes", "Genitiv", ["Dativ", "Akkusativ"]],
  ["Der Ball rollt weg.", "Der Ball", "Nominativ", ["Akkusativ", "Dativ"]],
  ["Ich male einen Stern.", "einen Stern", "Akkusativ", ["Nominativ", "Dativ"]],
  ["Sie dankt dem Arzt.", "dem Arzt", "Dativ", ["Akkusativ", "Genitiv"]],
  ["Die Tür des Autos klemmt.", "des Autos", "Genitiv", ["Dativ", "Akkusativ"]],
  ["Die Sonne scheint hell.", "Die Sonne", "Nominativ", ["Akkusativ", "Genitiv"]],
  ["Er isst eine Banane.", "eine Banane", "Akkusativ", ["Dativ", "Nominativ"]],
  ["Wir helfen den Nachbarn.", "den Nachbarn", "Dativ", ["Akkusativ", "Nominativ"]],
  ["Das Dach des Turms ist spitz.", "des Turms", "Genitiv", ["Dativ", "Akkusativ"]],
  ["Der Junge schläft tief.", "Der Junge", "Nominativ", ["Akkusativ", "Dativ"]],
  ["Sie schreibt einen Brief.", "einen Brief", "Akkusativ", ["Nominativ", "Dativ"]],
  ["Ich vertraue dem Freund.", "dem Freund", "Dativ", ["Akkusativ", "Genitiv"]],
].forEach(([s, p, k, d]) => recSentence("Fälle", s, k, d, "In welchem Fall steht „" + p + "“?",
  "Nominativ=Wer/Was? · Akkusativ=Wen/Was? · Dativ=Wem? · Genitiv=Wessen?"));

// --- Satzglieder (weitere) ---
[
  ["Der Hund jagt die Katze.", "Der Hund", "Subjekt", ["Prädikat", "Objekt"]],
  ["Der Hund jagt die Katze.", "die Katze", "Akkusativobjekt", ["Subjekt", "Dativobjekt"]],
  ["Die Sängerin singt schön.", "Die Sängerin", "Subjekt", ["Objekt", "Prädikat"]],
  ["Ich gebe dem Hund Futter.", "dem Hund", "Dativobjekt", ["Akkusativobjekt", "Subjekt"]],
  ["Der Zug fährt ab.", "fährt ab", "Prädikat", ["Subjekt", "Objekt"]],
  ["Wir hoffen auf Sonne.", "auf Sonne", "Präpositionalobjekt", ["Subjekt", "Adverbiale"]],
  ["Das Mädchen malt ein Pferd.", "ein Pferd", "Akkusativobjekt", ["Subjekt", "Dativobjekt"]],
  ["Der Schüler antwortet dem Lehrer.", "dem Lehrer", "Dativobjekt", ["Akkusativobjekt", "Subjekt"]],
  ["Meine Schwester kocht Suppe.", "Meine Schwester", "Subjekt", ["Objekt", "Prädikat"]],
  ["Die Blume welkt langsam.", "welkt", "Prädikat", ["Subjekt", "Objekt"]],
  ["Der Bäcker backt Brot.", "Brot", "Akkusativobjekt", ["Subjekt", "Dativobjekt"]],
  ["Wir warten auf den Lehrer.", "auf den Lehrer", "Präpositionalobjekt", ["Subjekt", "Adverbiale"]],
  ["Der Vogel fliegt davon.", "Der Vogel", "Subjekt", ["Objekt", "Prädikat"]],
  ["Sie reicht der Oma den Arm.", "der Oma", "Dativobjekt", ["Akkusativobjekt", "Subjekt"]],
  ["Der Ball trifft das Tor.", "das Tor", "Akkusativobjekt", ["Subjekt", "Dativobjekt"]],
  ["Mein Vater liest viel.", "Mein Vater", "Subjekt", ["Objekt", "Prädikat"]],
  ["Der Lehrer erklärt den Schülern die Regel.", "den Schülern", "Dativobjekt", ["Akkusativobjekt", "Subjekt"]],
  ["Das Kind fürchtet sich vor dem Hund.", "vor dem Hund", "Präpositionalobjekt", ["Subjekt", "Adverbiale"]],
  ["Die Katze schnurrt leise.", "schnurrt", "Prädikat", ["Subjekt", "Objekt"]],
  ["Der Gärtner pflanzt Blumen.", "Blumen", "Akkusativobjekt", ["Subjekt", "Dativobjekt"]],
  ["Er dankt seinem Freund.", "seinem Freund", "Dativobjekt", ["Akkusativobjekt", "Subjekt"]],
  ["Wir denken an die Reise.", "an die Reise", "Präpositionalobjekt", ["Subjekt", "Adverbiale"]],
  ["Die Maus frisst den Käse.", "den Käse", "Akkusativobjekt", ["Subjekt", "Dativobjekt"]],
  ["Der Wecker klingelt früh.", "klingelt", "Prädikat", ["Subjekt", "Objekt"]],
  ["Die Sonne blendet die Fahrer.", "Die Sonne", "Subjekt", ["Objekt", "Prädikat"]],
].forEach(([s, p, l, d]) => recSentence("Satzglieder", s, l, d, "Was ist „" + p + "“?"));

// --- Adverbiale (30 weitere) ---
[
  ["Am Abend lesen wir.", "Am Abend", "temporal", ["lokal", "modal"]],
  ["Im Keller ist es kühl.", "Im Keller", "lokal", ["temporal", "kausal"]],
  ["Er arbeitet flink.", "flink", "modal", ["temporal", "lokal"]],
  ["Wegen der Krankheit fehlt er.", "Wegen der Krankheit", "kausal", ["temporal", "modal"]],
  ["Nächste Woche fahren wir weg.", "Nächste Woche", "temporal", ["lokal", "modal"]],
  ["Auf dem Berg liegt Schnee.", "Auf dem Berg", "lokal", ["temporal", "kausal"]],
  ["Sie tanzt anmutig.", "anmutig", "modal", ["temporal", "lokal"]],
  ["Vor Schreck schrie er.", "Vor Schreck", "kausal", ["modal", "temporal"]],
  ["Am Mittag essen wir warm.", "Am Mittag", "temporal", ["lokal", "modal"]],
  ["Neben der Schule ist ein Park.", "Neben der Schule", "lokal", ["temporal", "kausal"]],
  ["Er packt hastig.", "hastig", "modal", ["temporal", "lokal"]],
  ["Wegen des Staus kamen wir spät.", "Wegen des Staus", "kausal", ["temporal", "modal"]],
  ["Jeden Morgen jogge ich.", "Jeden Morgen", "temporal", ["lokal", "modal"]],
  ["In der Höhle ist es dunkel.", "In der Höhle", "lokal", ["temporal", "kausal"]],
  ["Sie grüßte höflich.", "höflich", "modal", ["temporal", "kausal"]],
  ["Aus Wut warf er den Stift.", "Aus Wut", "kausal", ["modal", "lokal"]],
  ["Letzten Sommer waren wir am Meer.", "Letzten Sommer", "temporal", ["lokal", "modal"]],
  ["Zwischen den Häusern weht Wind.", "Zwischen den Häusern", "lokal", ["temporal", "kausal"]],
  ["Er antwortete zögernd.", "zögernd", "modal", ["temporal", "lokal"]],
  ["Vor Kälte zitterten sie.", "Vor Kälte", "kausal", ["modal", "temporal"]],
  ["Um Mitternacht schlägt die Uhr.", "Um Mitternacht", "temporal", ["lokal", "modal"]],
  ["Am Fluss sitzen Angler.", "Am Fluss", "lokal", ["temporal", "kausal"]],
  ["Sie lief eilig davon.", "eilig", "modal", ["temporal", "lokal"]],
  ["Wegen des Lärms zog er aus.", "Wegen des Lärms", "kausal", ["temporal", "modal"]],
  ["Am Nachmittag regnete es.", "Am Nachmittag", "temporal", ["lokal", "modal"]],
  ["Unter der Brücke nisten Tauben.", "Unter der Brücke", "lokal", ["temporal", "kausal"]],
  ["Er erklärte es deutlich.", "deutlich", "modal", ["temporal", "kausal"]],
  ["Vor Aufregung stotterte sie.", "Vor Aufregung", "kausal", ["modal", "temporal"]],
  ["Heute Nacht gab es Sturm.", "Heute Nacht", "temporal", ["lokal", "modal"]],
  ["Im Wald singen Vögel.", "Im Wald", "lokal", ["temporal", "kausal"]],
].forEach(([s, p, l, d]) => recSentence("Adverbiale", s, l, d, "Welche adverbiale Bestimmung ist „" + p + "“?",
  "temporal=Wann? · lokal=Wo/Wohin? · modal=Wie? · kausal=Warum?"));

// --- Attribute (weitere) ---
[
  ["der kluge Schüler", "kluge", "vorangestelltes Attribut", ["Subjekt", "Prädikat"]],
  ["das Auto des Lehrers", "des Lehrers", "nachgestelltes Attribut", ["Subjekt", "Objekt"]],
  ["die Frau mit der Brille", "mit der Brille", "Präpositionalattribut", ["Adverbiale", "Subjekt"]],
  ["der Hund, der bellt", "der bellt", "Attributsatz", ["Hauptsatz", "Adverbiale"]],
  ["ein hohes Haus", "hohes", "vorangestelltes Attribut", ["Objekt", "Prädikat"]],
  ["der Garten des Nachbarn", "des Nachbarn", "nachgestelltes Attribut", ["Subjekt", "Adverbiale"]],
  ["das Kind im roten Mantel", "im roten Mantel", "Präpositionalattribut", ["Adverbiale", "Subjekt"]],
  ["die Stadt, die ich liebe", "die ich liebe", "Attributsatz", ["Hauptsatz", "Adverbiale"]],
  ["eine alte Uhr", "alte", "vorangestelltes Attribut", ["Objekt", "Prädikat"]],
  ["das Dach des Hauses", "des Hauses", "nachgestelltes Attribut", ["Subjekt", "Adverbiale"]],
  ["der Mann aus Berlin", "aus Berlin", "Präpositionalattribut", ["Adverbiale", "Subjekt"]],
  ["der Film, den wir sahen", "den wir sahen", "Attributsatz", ["Hauptsatz", "Adverbiale"]],
  ["ein schneller Wagen", "schneller", "vorangestelltes Attribut", ["Objekt", "Prädikat"]],
  ["die Tasche meiner Mutter", "meiner Mutter", "nachgestelltes Attribut", ["Subjekt", "Objekt"]],
  ["der Junge, der lacht", "der lacht", "Attributsatz", ["Hauptsatz", "Adverbiale"]],
  ["ein bunter Drachen", "bunter", "vorangestelltes Attribut", ["Objekt", "Prädikat"]],
  ["die Brille des Opas", "des Opas", "nachgestelltes Attribut", ["Subjekt", "Adverbiale"]],
  ["das Lied, das sie singt", "das sie singt", "Attributsatz", ["Hauptsatz", "Adverbiale"]],
].forEach(([phrase, t, l, d]) => recSentence("Attribute", phrase, l, d, "Was ist „" + t + "“?"));

// --- Zeitformen (25 weitere Verbformen) ---
[
  ["ich lerne", "Präsens"], ["ich lernte", "Präteritum"], ["ich habe gelernt", "Perfekt"],
  ["ich hatte gelernt", "Plusquamperfekt"], ["ich werde lernen", "Futur I"],
  ["du fährst", "Präsens"], ["du fuhrst", "Präteritum"], ["du bist gefahren", "Perfekt"],
  ["du warst gefahren", "Plusquamperfekt"], ["du wirst fahren", "Futur I"],
  ["sie kauft", "Präsens"], ["sie kaufte", "Präteritum"], ["sie hat gekauft", "Perfekt"],
  ["sie hatte gekauft", "Plusquamperfekt"], ["sie wird kaufen", "Futur I"],
  ["wir bleiben", "Präsens"], ["wir blieben", "Präteritum"], ["wir sind geblieben", "Perfekt"],
  ["wir waren geblieben", "Plusquamperfekt"], ["wir werden bleiben", "Futur I"],
  ["er trinkt", "Präsens"], ["er trank", "Präteritum"], ["er hat getrunken", "Perfekt"],
  ["er hatte getrunken", "Plusquamperfekt"], ["er wird trinken", "Futur I"],
].forEach(([form, t]) => addQ("Zeitformen", "In welcher Zeitform steht „" + form + "“?", TEMPUS_OPTS[t], 0, "recognize",
  "Plusquamperfekt=hatte/war+Partizip · Perfekt=habe/bin+Partizip · Futur I=werden+Infinitiv."));

// --- Aktiv/Passiv (weitere) ---
[
  ["Das Brot wird gebacken.", "Passiv", ["Aktiv"]], ["Der Bäcker backt das Brot.", "Aktiv", ["Passiv"]],
  ["Die Tür wurde geschlossen.", "Passiv", ["Aktiv"]], ["Die Kinder bauen eine Burg.", "Aktiv", ["Passiv"]],
  ["Das Auto wird gewaschen.", "Passiv", ["Aktiv"]], ["Der Hund frisst den Knochen.", "Aktiv", ["Passiv"]],
  ["Der Brief wird gelesen.", "Passiv", ["Aktiv"]], ["Sie pflückt Blumen.", "Aktiv", ["Passiv"]],
  ["Das Lied wird gespielt.", "Passiv", ["Aktiv"]], ["Wir essen den Kuchen.", "Aktiv", ["Passiv"]],
  ["Die Aufgabe wird gelöst.", "Passiv", ["Aktiv"]], ["Der Maler streicht die Wand.", "Aktiv", ["Passiv"]],
].forEach(([s, l, d]) => recSentence("Aktiv/Passiv", s, l, d, "Aktiv oder Passiv?"));
addQ("Aktiv/Passiv", "Passiv von „Der Junge wirft den Ball.“", ["Der Ball wird geworfen.", "Der Ball wirft."], 0, "transform");
addQ("Aktiv/Passiv", "Passiv von „Der Koch kocht die Suppe.“", ["Die Suppe wird gekocht.", "Die Suppe kocht."], 0, "transform");
addQ("Aktiv/Passiv", "Im Passiv ist der Täter oft …", ["unwichtig/unbekannt", "das Subjekt"], 0, "mc");
addQ("Aktiv/Passiv", "Im Aktiv steht der Handelnde …", ["im Mittelpunkt", "im Hintergrund"], 0, "mc");

// --- Satzarten (weitere) ---
[
  ["Ich male, und sie singt.", "Satzreihe", ["Satzgefüge"]],
  ["Weil es spät ist, gehen wir.", "Satzgefüge", ["Satzreihe"]],
  ["Er kommt, oder er ruft an.", "Satzreihe", ["Satzgefüge"]],
  ["Als der Film begann, wurde es still.", "Satzgefüge", ["Satzreihe"]],
  ["Sie lacht, denn es ist lustig.", "Satzreihe", ["Satzgefüge"]],
  ["Obwohl es regnet, spielen wir.", "Satzgefüge", ["Satzreihe"]],
  ["Du gehst, ich bleibe.", "Satzreihe", ["Satzgefüge"]],
  ["Wenn du rufst, komme ich.", "Satzgefüge", ["Satzreihe"]],
  ["Wir essen, und dann spielen wir.", "Satzreihe", ["Satzgefüge"]],
  ["Damit es klappt, üben wir.", "Satzgefüge", ["Satzreihe"]],
  ["Er rennt, sie folgt.", "Satzreihe", ["Satzgefüge"]],
  ["Nachdem es klingelte, gingen wir.", "Satzgefüge", ["Satzreihe"]],
].forEach(([s, l, d]) => recSentence("Satzarten", s, l, d, "Satzreihe oder Satzgefüge?",
  "Satzreihe = zwei Hauptsätze · Satzgefüge = Hauptsatz + Nebensatz."));
addQ("Satzarten", "Ein Hauptsatz kann …", ["allein stehen", "nicht allein stehen"], 0, "mc");
addQ("Satzarten", "Ein Nebensatz kann …", ["nicht allein stehen", "allein stehen"], 0, "mc");
addQ("Satzarten", "„denn“ verbindet …", ["zwei Hauptsätze", "Haupt- und Nebensatz"], 0, "mc");
addQ("Satzarten", "„weil“ leitet einen … ein.", ["Nebensatz", "Hauptsatz"], 0, "mc");

// --- Umstellung (30 weitere) ---
[
  ["Es schneit. Die Kinder freuen sich.", "Weil es schneit, freuen sich die Kinder.", "Es schneit, die Kinder freuen sich."],
  ["Ich bin satt. Ich höre auf.", "Weil ich satt bin, höre ich auf.", "Ich bin satt, ich höre auf."],
  ["Der Film war aus. Wir gingen heim.", "Als der Film aus war, gingen wir heim.", "Der Film war aus, wir gingen heim."],
  ["Du rufst an. Ich freue mich.", "Wenn du anrufst, freue ich mich.", "Du rufst an, ich freue mich."],
  ["Sie hatte Durst. Sie trank Wasser.", "Weil sie Durst hatte, trank sie Wasser.", "Sie hatte Durst, sie trank Wasser."],
  ["Es klingelte. Wir standen auf.", "Als es klingelte, standen wir auf.", "Es klingelte, wir standen auf."],
  ["Ich übe täglich. Ich werde besser.", "Weil ich täglich übe, werde ich besser.", "Ich übe täglich, ich werde besser."],
  ["Es ist kalt. Wir heizen.", "Weil es kalt ist, heizen wir.", "Es ist kalt, wir heizen."],
  ["Der Wecker klingelte. Sie wachte auf.", "Als der Wecker klingelte, wachte sie auf.", "Der Wecker klingelte, sie wachte auf."],
  ["Du hilfst. Es geht schneller.", "Wenn du hilfst, geht es schneller.", "Du hilfst, es geht schneller."],
  ["Er war krank. Er ging zum Arzt.", "Weil er krank war, ging er zum Arzt.", "Er war krank, er ging zum Arzt."],
  ["Es wurde laut. Der Hund bellte.", "Als es laut wurde, bellte der Hund.", "Es wurde laut, der Hund bellte."],
  ["Wir hatten Zeit. Wir spielten.", "Weil wir Zeit hatten, spielten wir.", "Wir hatten Zeit, wir spielten."],
  ["Es regnet stark. Die Straße ist nass.", "Weil es stark regnet, ist die Straße nass.", "Es regnet stark, die Straße ist nass."],
  ["Du bist müde. Du sollst schlafen.", "Wenn du müde bist, sollst du schlafen.", "Du bist müde, du sollst schlafen."],
  ["Sie lernte viel. Sie bestand.", "Weil sie viel lernte, bestand sie.", "Sie lernte viel, sie bestand."],
  ["Die Ampel war rot. Wir hielten an.", "Weil die Ampel rot war, hielten wir an.", "Die Ampel war rot, wir hielten an."],
  ["Es wurde dunkel. Die Lichter gingen an.", "Als es dunkel wurde, gingen die Lichter an.", "Es wurde dunkel, die Lichter gingen an."],
  ["Ich habe frei. Ich besuche dich.", "Wenn ich frei habe, besuche ich dich.", "Ich habe frei, ich besuche dich."],
  ["Der Bus war voll. Wir mussten stehen.", "Weil der Bus voll war, mussten wir stehen.", "Der Bus war voll, wir mussten stehen."],
  ["Es donnerte. Das Kind erschrak.", "Als es donnerte, erschrak das Kind.", "Es donnerte, das Kind erschrak."],
  ["Wir sparten. Wir fuhren in den Urlaub.", "Weil wir sparten, fuhren wir in den Urlaub.", "Wir sparten, wir fuhren in den Urlaub."],
  ["Du übst Klavier. Du wirst gut.", "Wenn du Klavier übst, wirst du gut.", "Du übst Klavier, du wirst gut."],
  ["Es war heiß. Wir gingen schwimmen.", "Weil es heiß war, gingen wir schwimmen.", "Es war heiß, wir gingen schwimmen."],
  ["Die Glocke läutete. Alle verstummten.", "Als die Glocke läutete, verstummten alle.", "Die Glocke läutete, alle verstummten."],
  ["Ich bin fertig. Ich gehe raus.", "Wenn ich fertig bin, gehe ich raus.", "Ich bin fertig, ich gehe raus."],
  ["Er hatte Angst. Er rannte weg.", "Weil er Angst hatte, rannte er weg.", "Er hatte Angst, er rannte weg."],
  ["Es schneite. Die Schule fiel aus.", "Weil es schneite, fiel die Schule aus.", "Es schneite, die Schule fiel aus."],
  ["Der Zug kam. Wir stiegen ein.", "Als der Zug kam, stiegen wir ein.", "Der Zug kam, wir stiegen ein."],
  ["Du bist leise. Das Baby schläft.", "Wenn du leise bist, schläft das Baby.", "Du bist leise, das Baby schläft."],
].forEach(([pair, c, w]) => addQ("Umstellung", "Verbinde zu einem Satzgefüge (Haupt- + Nebensatz):\n„" + pair + "“",
  [c, w], 0, "transform", "Nebensatz mit Konjunktion (weil/als/wenn …), Verb am Ende."));

// --- Konjunktiv (weitere) ---
[
  ["„Ich lese gern.“ → Er sagt, er ___ gern.", ["lese", "liest"]],
  ["„Ich fahre weg.“ → Sie sagt, sie ___ weg.", ["fahre", "fährt"]],
  ["„Ich habe Hunger.“ → Er sagt, er ___ Hunger.", ["habe", "hat"]],
  ["„Ich bin froh.“ → Sie sagt, sie ___ froh.", ["sei", "ist"]],
  ["„Ich kann das.“ → Er sagt, er ___ das.", ["könne", "kann"]],
  ["„Ich will gehen.“ → Sie sagt, sie ___ gehen.", ["wolle", "will"]],
  ["„Ich weiß es.“ → Er behauptet, er ___ es.", ["wisse", "weiß"]],
  ["„Ich darf das.“ → Er sagt, er ___ das.", ["dürfe", "darf"]],
  ["„Ich komme mit.“ → Er sagt, er ___ mit.", ["komme", "kommt"]],
  ["„Ich sehe nichts.“ → Sie sagt, sie ___ nichts.", ["sehe", "sieht"]],
  ["„Ich gebe auf.“ → Er sagt, er ___ auf.", ["gebe", "gibt"]],
  ["„Ich nehme teil.“ → Sie sagt, sie ___ teil.", ["nehme", "nimmt"]],
].forEach(([q, o]) => addQ("Konjunktiv", q, o, 0, "recognize", "Indirekte Rede → Konjunktiv I."));
addQ("Konjunktiv", "Der Konjunktiv I steht in der …", ["indirekten Rede", "Befehlsform"], 0, "mc");
addQ("Konjunktiv", "„er sei, er habe, er gehe“ ist …", ["Konjunktiv I", "Indikativ"], 0, "mc");
addQ("Konjunktiv", "Konjunktiv I von „werden“ (er) ist …", ["werde", "wird"], 0, "mc");
addQ("Konjunktiv", "Die Anführungszeichen „…“ stehen bei der …", ["direkten Rede", "indirekten Rede"], 0, "mc");

/* =====================================================================
   IDs, Themen-Infos
   ===================================================================== */
QUESTIONS.forEach((q) => { q.id = q.topic + "::" + q.q + "::" + q.options.join("|"); });

const TOPIC_INFO = {
  // Rechtschreibung
  "das/dass":          { name: "das / dass",        icon: "📝", cat: "Rechtschreibung" },
  "Großschreibung":    { name: "Groß & klein",      icon: "🔠", cat: "Rechtschreibung" },
  "Nominalisierung":   { name: "Nominalisierung",   icon: "🅰️", cat: "Rechtschreibung" },
  "s-Laute":           { name: "s · ss · ß",        icon: "🐍", cat: "Rechtschreibung" },
  "Getrennt/Zusammen": { name: "Getrennt & zusammen", icon: "✂️", cat: "Rechtschreibung" },
  "Komma":             { name: "Kommasetzung",      icon: "✏️", cat: "Rechtschreibung" },
  // Grammatik
  "Wortarten":         { name: "Wortarten",         icon: "🏷️", cat: "Grammatik" },
  "Artikel":           { name: "Artikel",           icon: "🔤", cat: "Grammatik" },
  "Pronomen":          { name: "Pronomen",          icon: "👥", cat: "Grammatik" },
  "Fälle":             { name: "Fälle (Kasus)",     icon: "📦", cat: "Grammatik" },
  "Satzglieder":       { name: "Satzglieder",       icon: "🧩", cat: "Grammatik" },
  "Adverbiale":        { name: "Adverbiale",        icon: "🧭", cat: "Grammatik" },
  "Attribute":         { name: "Attribute",         icon: "🔎", cat: "Grammatik" },
  "Zeitformen":        { name: "Zeitformen",        icon: "⏱️", cat: "Grammatik" },
  "Aktiv/Passiv":      { name: "Aktiv & Passiv",    icon: "🔄", cat: "Grammatik" },
  "Satzarten":         { name: "Satzreihe/-gefüge", icon: "🔗", cat: "Grammatik" },
  "Umstellung":        { name: "Sätze verbinden",   icon: "🔀", cat: "Grammatik" },
  "Konjunktiv":        { name: "Indirekte Rede",    icon: "💬", cat: "Grammatik" },
};
const TOPIC_ORDER = Object.keys(TOPIC_INFO);
