#!/usr/bin/env python3
"""Best-effort-Extraktion eigener Vokabeln aus der LOKALEN Notiz docs/english_stoff.md
in die LOKALE, gitignored Datei game/vocab_custom.js (Modus „Mein Wortschatz").

Nur für den persönlichen Lerngebrauch des Besitzers der Notiz. Die Ausgabe wird
NICHT versioniert/veröffentlicht (.gitignore). OCR ist fehlerbehaftet – Einträge
danach im Spiel über 📚 prüfen/korrigieren.

Heuristik: Auf den Vokabelseiten (167–186) signalisiert eine Lautschrift in
eckigen/geschweiften Klammern einen Eintrag. Davor steht das englische Stichwort,
danach die (deutsche) Übersetzung bis zum ersten Satzzeichen.
"""
import json
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.normpath(os.path.join(HERE, "..", "..", "docs", "english_stoff.md"))
OUT = os.path.normpath(os.path.join(HERE, "..", "..", "game", "vocab_custom.js"))

PHON = re.compile(r"\[[^\]]*\]|\{[^\}]*\}")
PAGE = re.compile(r"^###\s+Seite\s+(\d+)")
HEAD_OK = re.compile(r"^[A-Za-z][A-Za-z '/().-]{1,38}$")


NOISE = re.compile(r"\s+(QS|noun:|verb:|adjective:|adverb:|Betonung|Aussprache|pl\b|infm|vgl).*$", re.I)
CUTS = ["=", "<>", "«", "»", "→", "+»", ">>", "‘", "’", "“", "”", "|", "&", "/\\"]


def clean_head(s):
    s = s.strip()
    s = re.sub(r"^\(to\)\s*", "to ", s)        # (to) run -> to run
    s = re.sub(r"\s+", " ", s)
    return s.strip(" .,;:-–—")


def clean_trans(s):
    s = PHON.sub("", s)                        # restliche Lautschrift entfernen
    s = re.split(r"[.;]", s, 1)[0]             # erste Bedeutung / vor Beispiel
    for sep in CUTS:
        s = s.split(sep)[0]
    s = NOISE.sub("", s)                       # Wörterbuch-Notizen abschneiden
    s = re.sub(r"\s+", " ", s).strip(" .,;:-–—>»·")
    words = s.split(" ")                       # kurze Übersetzung -> Beispiel-Reste raus
    if len(words) > 5:
        s = " ".join(words[:5])
    return s.strip(" .,;:-–—>»·")


def main():
    pairs, seen = [], set()
    in_vocab = False
    with open(SRC, encoding="utf-8") as f:
        for raw in f:
            line = raw.rstrip("\n")
            m = PAGE.match(line)
            if m:
                in_vocab = 167 <= int(m.group(1)) <= 186
                continue
            if not in_vocab:
                continue
            line = line.strip()
            if len(line) < 4:
                continue
            ms = list(PHON.finditer(line))
            if not ms:
                continue
            head = clean_head(line[:ms[0].start()])   # vor erster Lautschrift
            trans = clean_trans(line[ms[-1].end():])  # nach letzter Lautschrift
            if not HEAD_OK.match(head) or not trans or len(trans) > 50:
                continue
            key = head.lower()
            if key in seen:
                continue
            seen.add(key)
            pairs.append([head, trans])

    body = ",\n  ".join(json.dumps(p, ensure_ascii=False) for p in pairs)
    js = ("// AUTOGENERIERT (best-effort) aus docs/english_stoff.md – LOKAL, gitignored, NICHT veröffentlichen.\n"
          "// OCR ist fehlerbehaftet: Einträge im Spiel über 📚 prüfen/korrigieren.\n"
          "window.CUSTOM_VOCAB = [\n  " + body + "\n];\n")
    with open(OUT, "w", encoding="utf-8") as f:
        f.write(js)

    # Zusätzlich eine einfügefertige Textliste (für 📚-Import auf GitHub Pages).
    txt = os.path.normpath(os.path.join(HERE, "my_vocab.txt"))
    with open(txt, "w", encoding="utf-8") as f:
        f.write("\n".join(en + " = " + de for en, de in pairs) + "\n")

    print(f"{len(pairs)} Vokabeln -> {OUT}")
    print(f"Einfügefertig (für 📚) -> {txt}")


if __name__ == "__main__":
    main()
