#!/usr/bin/env python3
"""Erzeugt ein NEUES, eigenständiges Instrumentalstück per Text-Prompt (MusicGen).
Lokal auf der GPU. Es wird NUR text-konditioniert generiert (kein melody-conditioning
auf einem Original), damit nichts kopiert wird.

Beispiel:
  python generate_musicgen.py --prompt "driving DnB-style, ~175 BPM, distorted bass, dark, instrumental, looping" \
                              --bpm 175 --duration 60 --out nine_new.wav
Danach:  ffmpeg -i nine_new.wav -b:a 192k nine.mp3   ->  nach game/assets/nine.mp3 kopieren
"""
import argparse
import sys


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--prompt", required=True, help="Stil-Beschreibung (Text)")
    ap.add_argument("--bpm", type=int, default=0, help="optional: BPM in den Prompt aufnehmen")
    ap.add_argument("--duration", type=int, default=60, help="Länge in Sekunden")
    ap.add_argument("--model", default="facebook/musicgen-medium",
                    help="z. B. facebook/musicgen-small | -medium | -large")
    ap.add_argument("--out", default="generated.wav")
    args = ap.parse_args()

    try:
        import torch
        from audiocraft.models import MusicGen
        from audiocraft.data.audio import audio_write
    except ImportError:
        sys.exit("Bitte installieren:  pip install audiocraft  (+ torch mit CUDA, siehe README)")

    prompt = args.prompt
    if args.bpm:
        prompt = f"{prompt}, {args.bpm} BPM"

    device = "cuda" if torch.cuda.is_available() else "cpu"
    print(f"Lade Modell {args.model} auf {device} …")
    model = MusicGen.get_pretrained(args.model)
    model.set_generation_params(duration=args.duration)

    print(f"Generiere {args.duration}s für Prompt:\n  {prompt}")
    wav = model.generate([prompt])  # nur Text -> neues, eigenes Stück

    base = args.out[:-4] if args.out.lower().endswith(".wav") else args.out
    audio_write(base, wav[0].cpu(), model.sample_rate, strategy="loudness")
    print(f"Fertig: {base}.wav  ->  z. B.  ffmpeg -i {base}.wav -b:a 192k nine.mp3")


if __name__ == "__main__":
    main()
