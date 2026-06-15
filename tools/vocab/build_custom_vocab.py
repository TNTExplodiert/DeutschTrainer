#!/usr/bin/env python3
"""Wandelt eine LOKALE, PRIVATE Vokabel-Notiz in game/vocab_custom.js um.

Zweck: Du darfst deine eigenen (auch aus deinem lizenzierten Buch abgeschriebenen)
Vokabeln zum persönlichen Lernen nutzen. Die erzeugte Datei game/vocab_custom.js
ist per .gitignore vom Repo ausgeschlossen und wird NICHT veröffentlicht.

Eingabeformat: eine Vokabel pro Zeile, Englisch und Deutsch getrennt durch
TAB, ' = ', ' - '/' – ' oder ';'. Leerzeilen und '#'-Kommentare werden ignoriert.
  Beispiel:
    homesick = Heimweh haben
    famine; Hungersnot
    coast - Küste

Nutzung:
  python build_custom_vocab.py --in mein_vokabel_export.txt
  (Standard-Ausgabe: ../../game/vocab_custom.js)
"""
import argparse
import json
import os
import re
import sys

SEP = re.compile(r"\t|\s=\s|\s[-–—]\s|;")


def main():
    here = os.path.dirname(os.path.abspath(__file__))
    default_out = os.path.normpath(os.path.join(here, "..", "..", "game", "vocab_custom.js"))

    ap = argparse.ArgumentParser()
    ap.add_argument("--in", dest="inp", required=True, help="private Notiz (lokale Datei)")
    ap.add_argument("--out", default=default_out, help="Ziel (Standard: game/vocab_custom.js)")
    args = ap.parse_args()

    pairs = []
    with open(args.inp, encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            parts = SEP.split(line, maxsplit=1)
            if len(parts) < 2:
                continue
            en, de = parts[0].strip(), parts[1].strip()
            if en and de:
                pairs.append([en, de])

    if not pairs:
        sys.exit("Keine Vokabelpaare gefunden – Eingabeformat prüfen (siehe Skript-Kopf).")

    body = ",\n  ".join(json.dumps(p, ensure_ascii=False) for p in pairs)
    js = ("// AUTOGENERIERT aus privater Notiz – LOKAL, gitignored, NICHT veröffentlichen.\n"
          "window.CUSTOM_VOCAB = [\n  " + body + "\n];\n")
    with open(args.out, "w", encoding="utf-8") as f:
        f.write(js)
    print(f"{len(pairs)} Vokabeln geschrieben -> {args.out}")


if __name__ == "__main__":
    main()
