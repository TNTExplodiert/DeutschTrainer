# DeutschTrainer 🇩🇪

## ▶️ [**Jetzt spielen: tntexplodiert.github.io/DeutschTrainer/game/**](https://tntexplodiert.github.io/DeutschTrainer/game/)

> Direkt im Browser spielbar (Handy, Tablet, PC) – am besten im **Querformat**.

---

Lern- und Spielprojekt für **Deutsch in der 7. Jahrgangsstufe, Realschule Bayern**
(orientiert am *LehrplanPLUS*).

Ziel: Den Lernstoff – vor allem **Rechtschreibung** und **Grammatik** – mit Spielen
üben, die sich an beliebten Games wie **Geometry Dash** und **Roblox** orientieren.

## 📚 Inhalt der Dokumentation

| Datei | Inhalt |
|-------|--------|
| [`docs/01-lehrplan-7-klasse.md`](docs/01-lehrplan-7-klasse.md) | Überblick über den Stoff der 7. Klasse (alle vier Lernbereiche) |
| [`docs/02-rechtschreibung.md`](docs/02-rechtschreibung.md) | Was man über deutsche Rechtschreibung wissen muss |
| [`docs/03-grammatik.md`](docs/03-grammatik.md) | Was man über deutsche Grammatik wissen muss |
| [`docs/04-spielideen.md`](docs/04-spielideen.md) | Spielideen im Stil von Geometry Dash & Roblox |

## 🎯 Wie man das Projekt nutzt

1. Lies den **Lehrplan-Überblick**, um zu sehen, was in der 7. Klasse drankommt.
2. Vertiefe **Rechtschreibung** und **Grammatik** mit den Merk-Dokumenten.
3. Wähle aus den **Spielideen** das aus, was dir Spaß macht, und übe damit.

## 🎮 Spielbar: Grammatik-Obby

Im Ordner [`game/`](game/) liegt eine fertige, spielbare **Lern-App im
Roblox-Stil** (Idee #5 aus den Spielideen):

> Springe über die Lava auf die Plattform mit der **richtigen Antwort** –
> falsche Plattformen brechen weg!

**Funktionen:**
- 🎮 **Drei Spielmodi**: **Obby** (auf die richtige Plattform springen),
  **Cube Dash** (Geometry-Dash-Stil: oben/unten) und **Wave** (Raumschiff durch
  den richtigen Tunnel – falsche Tunnel enden in einer Wand)
- ⭐ **10 Level/Sterne pro Thema** zum Sammeln (nach hinten kniffliger)
- 🧠 **1000+ Übungen** in 18 Themen – auch **Erkennen in echten Sätzen**
  (Adverbiale, Fälle, Artikel, Zeitformen), **Kommasetzung** und
  **Satzverbindung/Umstellung** (zwei Hauptsätze → Haupt-/Nebensatz)
- 💡 **Erklärungen** bei falschen Antworten
- 📊 **Profil-/Statistikseite**: zeigt pro Thema Genauigkeit, Sterne und deine **schwächsten Themen**
- 📱 **Responsive** – passt sich automatisch der Fenster-/Tab-Größe an
- 🖥️ **Geräteauswahl** (PC/Tablet/Handy) – Steuerung passt sich an
- 🟢🟡🔴 **Schwierigkeitsgrade**: Leicht / Mittel / Schwer (steuern das **Gameplay-Tempo**)
- 🗺️ **Levelkarte** mit Levels nach **Thema** gegliedert
- 🔁 **Falsch gelöste Aufgaben werden wiederholt**, bis sie sitzen
- 🧠 **Lernprofil**: merkt sich Problem-Themen → **Übungs-Mix** wiederholt diese gezielt
- 🍪 **Fortschritt wird in Cookies gespeichert** (mit Zustimmungs-Banner)
- 🎵 **Hintergrundmusik** (per 🔊-Knopf stummschaltbar): flotter Techno bei Cube Dash & Wave, fröhliche Chiptune (Mario-Stil) im Obby

## 🎵 Musik

Die gesamte Hintergrundmusik wird **prozedural im Browser erzeugt** (Web Audio API,
Datei [`game/audio.js`](game/audio.js)) – es gibt **keine externen Audiodateien**:

- **Cube Dash & Wave:** treibender 4/4-Techno-Beat, dessen **Tempo langsam ansteigt**
  (Neustart des Tempos nach jedem Crash) + **Crash-Sound**
- **Obby:** fröhliche **Original-Chiptune im Mario-Stil** + **Fehler-Sound** bei falscher Antwort

**Lizenz:** Die Musik ist eine **eigene Komposition** dieses Projekts und damit
**lizenz-/gebührenfrei** nutzbar. Es werden **keine** urheberrechtlich geschützten
Originalmelodien (z. B. das echte Super-Mario-Thema) verwendet. Über den
🔊/🔇-Knopf oben rechts lässt sich die Musik jederzeit an-/ausschalten.

**Themen (passend zum echten Schulstoff / euren Arbeitsblättern):**
*Rechtschreibung:* das/dass · Groß & klein · Nominalisierung · s·ss·ß · Getrennt & zusammen · Kommasetzung.
*Grammatik:* Wortarten · Pronomen · Satzglieder & Fälle · Adverbiale · Attribute · Satzreihe/-gefüge · indirekte Rede (Konjunktiv) · Zeitformen · Aktiv & Passiv.

**So startest du es:**
- Einfach `game/index.html` im Browser öffnen (Doppelklick), **oder**
- einen lokalen Server starten (empfohlen):
  ```bash
  cd game
  python3 -m http.server 8000
  # dann im Browser: http://localhost:8000
  ```

**Steuerung:** `← →` (oder A/D) laufen · `Leertaste / ↑` springen · in der Luft lenken.
Funktioniert auch auf dem Handy/Tablet (Touch-Buttons).

Neue Fragen kann man leicht in [`game/questions.js`](game/questions.js) ergänzen.

## 🗺️ Nächste Schritte (Ideen für die Umsetzung)

- Weitere Spielideen umsetzen (z. B. „Rechtschreib-Rush" im Geometry-Dash-Stil)
- Mehr Fragen pro Thema in die Aufgaben-Datenbank aufnehmen
- Level, Soundeffekte und Bestenliste ergänzen

> Hinweis: Diese Übersicht ersetzt nicht den offiziellen LehrplanPLUS des
> Bayerischen Staatsministeriums. Schulbücher und Lehrkraft sind maßgeblich.
