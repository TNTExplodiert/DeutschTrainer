#!/usr/bin/env python3
"""Erzeugt ein NEUES, eigenständiges Instrumentalstück per Text-Prompt (MusicGen via
Hugging Face transformers). Lauffähig auf aktuellem PyTorch/CUDA (z. B. RTX 50xx),
wo das ältere `audiocraft` nicht baut.

NUR Text-Konditionierung – kein melody-conditioning auf einem Original, damit nichts
kopiert wird (Stil/Genre/BPM sind nicht urheberrechtlich geschützt).

Beispiel:
  python generate_musicgen_hf.py \
    --prompt "driving energetic electro/dance, 144 BPM, E minor, distorted bass, instrumental, looping" \
    --duration 30 --model facebook/musicgen-medium --out nine_new.wav

Danach:  ffmpeg -i nine_new.wav -b:a 192k nine.mp3  ->  nach game/assets/nine.mp3 kopieren

Hinweis: MusicGen ist auf ~30 s trainiert. Längere Stücke (>30 s) in Abschnitten
erzeugen und später zusammenschneiden, sonst leidet die Qualität.
"""
import argparse
import sys


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--prompt", required=True, help="Stil-Beschreibung (Text)")
    ap.add_argument("--duration", type=float, default=15.0, help="Länge in Sekunden")
    ap.add_argument("--model", default="facebook/musicgen-medium",
                    help="facebook/musicgen-small | -medium | -large")
    ap.add_argument("--out", default="generated.wav")
    ap.add_argument("--seed", type=int, default=0, help="0 = zufällig")
    args = ap.parse_args()

    try:
        import torch
        import numpy as np
        import soundfile as sf
        from transformers import AutoProcessor, MusicgenForConditionalGeneration
    except ImportError as e:
        sys.exit(f"Fehlende Abhängigkeit: {e}\nBitte: pip install transformers soundfile torch")

    device = "cuda" if torch.cuda.is_available() else "cpu"
    if args.seed:
        torch.manual_seed(args.seed)

    print(f"Lade Modell {args.model} auf {device} …")
    processor = AutoProcessor.from_pretrained(args.model)
    model = MusicgenForConditionalGeneration.from_pretrained(args.model).to(device)

    # MusicGen läuft mit 50 Audio-Frames/s -> Tokenzahl aus Dauer ableiten
    max_new_tokens = int(args.duration * 50)
    sr = model.config.audio_encoder.sampling_rate

    print(f"Generiere ~{args.duration:.0f}s ({max_new_tokens} tokens) für Prompt:\n  {args.prompt}")
    inputs = processor(text=[args.prompt], padding=True, return_tensors="pt").to(device)
    audio = model.generate(**inputs, do_sample=True, guidance_scale=3.0,
                           max_new_tokens=max_new_tokens)
    wav = audio[0, 0].cpu().numpy().astype(np.float32)

    sf.write(args.out, wav, sr)
    print(f"Fertig: {args.out}  ({len(wav)/sr:.1f}s @ {sr} Hz)")
    print(f"-> z. B.  ffmpeg -i {args.out} -b:a 192k nine.mp3")


if __name__ == "__main__":
    main()
