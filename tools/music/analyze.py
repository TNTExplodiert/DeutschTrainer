#!/usr/bin/env python3
"""Beschreibt einen Song grob: Tempo (BPM), geschätzte Tonart, Länge.
Gibt einen Prompt-Vorschlag für die Generierung aus.

Nutzung:  python analyze.py /pfad/zum/song.mp3
Zweck:    Stil-Eckdaten gewinnen, um ein NEUES Stück im selben Stil zu erzeugen.
          (Keine Melodie-Extraktion – wir kopieren das Original nicht.)
"""
import sys
import numpy as np

try:
    import librosa
except ImportError:
    sys.exit("Bitte zuerst installieren:  pip install librosa soundfile")

# Krumhansl-Schmuckler-Profile für eine grobe Tonart-Schätzung
MAJOR = np.array([6.35, 2.23, 3.48, 2.33, 4.38, 4.09, 2.52, 5.19, 2.39, 3.66, 2.29, 2.88])
MINOR = np.array([6.33, 2.68, 3.52, 5.38, 2.60, 3.53, 2.54, 4.75, 3.98, 2.69, 3.34, 3.17])
NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]


def estimate_key(chroma_mean):
    best = (-1.0, "C", "Dur")
    for i in range(12):
        maj = np.corrcoef(np.roll(MAJOR, i), chroma_mean)[0, 1]
        minr = np.corrcoef(np.roll(MINOR, i), chroma_mean)[0, 1]
        if maj > best[0]:
            best = (maj, NOTES[i], "Dur")
        if minr > best[0]:
            best = (minr, NOTES[i], "Moll")
    return best[1], best[2]


def main():
    if len(sys.argv) < 2:
        sys.exit("Nutzung: python analyze.py <songdatei>")
    path = sys.argv[1]
    y, sr = librosa.load(path, mono=True)
    dur = librosa.get_duration(y=y, sr=sr)
    tempo, _ = librosa.beat.beat_track(y=y, sr=sr)
    tempo = float(np.atleast_1d(tempo)[0])
    chroma = librosa.feature.chroma_cqt(y=y, sr=sr).mean(axis=1)
    note, mode = estimate_key(chroma)
    rms = float(np.mean(librosa.feature.rms(y=y)))
    energy = "hoch/energetisch" if rms > 0.08 else ("mittel" if rms > 0.04 else "ruhig")

    print("=== Analyse ===")
    print(f"Datei:   {path}")
    print(f"Länge:   {dur:.1f} s")
    print(f"Tempo:   ~{tempo:.0f} BPM")
    print(f"Tonart:  {note}-{mode} (Schätzung)")
    print(f"Energie: {energy}")
    print()
    print("=== Prompt-Vorschlag (Stil, NICHT die Melodie kopieren) ===")
    print(
        f"instrumental electronic track in the style of fast hardcore/DnB, "
        f"~{tempo:.0f} BPM, {note} {('major' if mode=='Dur' else 'minor')}, "
        f"distorted bass, driving drums, dark and {energy.split('/')[0]}, looping, original"
    )


if __name__ == "__main__":
    main()
