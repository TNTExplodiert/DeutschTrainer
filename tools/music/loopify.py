#!/usr/bin/env python3
"""Macht aus einem kurzen Stück eine NAHTLOSE Endlosschleife und kachelt sie auf
eine Ziellänge. Technik: Equal-Power-Wrap-Crossfade (Ende wird in den Anfang
geblendet), danach ganzzahlige Wiederholungen → auch der Datei-Übergang
Ende→Anfang ist nahtlos.

Beispiel:
  python loopify.py --in nine_new.wav --out nine_loop.wav --xfade 2.0 --target 210
"""
import argparse
import numpy as np
import soundfile as sf


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--in", dest="inp", required=True)
    ap.add_argument("--out", required=True)
    ap.add_argument("--xfade", type=float, default=2.0, help="Crossfade-Länge (s)")
    ap.add_argument("--target", type=float, default=210.0, help="Mindest-Zielllänge (s)")
    args = ap.parse_args()

    y, sr = sf.read(args.inp, always_2d=True)  # (n, ch)
    n = len(y)
    c = int(args.xfade * sr)
    if c * 2 >= n:
        c = n // 4

    # Equal-Power-Fades (sin/cos) → konstante Lautstärke im Übergang
    t = np.linspace(0.0, 1.0, c, endpoint=False)[:, None]
    fin = np.sin(0.5 * np.pi * t)
    fout = np.cos(0.5 * np.pi * t)

    head = y[:c]
    tail = y[n - c:]
    blended = tail * fout + head * fin          # nahtloser Übergang Ende→Anfang
    loop = np.concatenate([blended, y[c:n - c]], axis=0)   # Länge n - c

    loop_sec = len(loop) / sr
    reps = int(np.ceil(args.target / loop_sec))
    out = np.tile(loop, (reps, 1))

    sf.write(args.out, out, sr)
    print(f"Loop-Einheit: {loop_sec:.2f}s · {reps}x → {len(out)/sr:.1f}s @ {sr} Hz")
    print(f"Geschrieben: {args.out}")


if __name__ == "__main__":
    main()
