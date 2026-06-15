# tools/vocab — eigene Vokabeln lokal & privat einbinden

Damit du **deine** Prüfungsvokabeln im Spiel üben kannst (Modus „Mein Wortschatz"),
ohne geschützte Buchinhalte zu veröffentlichen.

## Prinzip

- **Öffentlich (im Repo):** nur eigene/freie Übungen (Grammatik, Themen-Wortschatz).
- **Privat (lokal, gitignored):** `game/vocab_custom.js` mit deinen Vokabeln.
  Diese Datei wird **nicht** committet/veröffentlicht (siehe `.gitignore`).

So ist das Üben deiner eigenen (auch aus dem lizenzierten Buch abgeschriebenen)
Vokabeln eine **persönliche Lernhilfe** auf deinem Gerät – nicht eine Veröffentlichung
fremder Inhalte.

## So geht's

1. Schreibe deine Vokabeln in eine lokale Textdatei (eine pro Zeile), z. B. `my_vocab.txt`:
   ```
   homesick = Heimweh haben
   famine; Hungersnot
   coast - Küste
   ```
   Trennzeichen: Tab, ` = `, ` - `/` – ` oder `;`. `#`-Zeilen werden ignoriert.
   (`*.txt` hier ist gitignored.)

2. Erzeuge die lokale Spieldatei:
   ```bash
   python tools/vocab/build_custom_vocab.py --in tools/vocab/my_vocab.txt
   # -> schreibt game/vocab_custom.js  (gitignored)
   ```

3. Spiel öffnen, auf **🇬🇧 EN** schalten → Thema **„Mein Wortschatz"** erscheint mit
   allen deinen Vokabeln.

> Format-Vorlage: [`game/vocab_custom.sample.js`](../../game/vocab_custom.sample.js)
