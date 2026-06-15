# tools/music — Eigenen Song „im Stil von" erzeugen (lokal, GPU/WSL)

Zweistufiger Workflow:
1. **Analysieren** (BPM, Tonart, Länge) eines Songs, den du **legal** besitzt.
2. **Neu generieren** – ein eigenständiges, neues Stück im selben *Stil*
   (Genre/Tempo/Stimmung) per Text-Prompt. **Keine** Melodie-Kopie des Originals.

> Hinweis Recht: Stil/Genre/BPM sind nicht urheberrechtlich geschützt – ein neues
> Stück „im Stil" ist ok. Verwende **kein** melody-conditioning auf dem Original
> und baue keine Originalmelodie nach. MusicGen-Gewichte sind CC-BY-NC → für ein
> nicht-kommerzielles Schulprojekt nutzbar (Lizenz prüfen, falls kommerziell).

## Setup (WSL2 + NVIDIA-GPU)

1. NVIDIA-Treiber unter **Windows** installieren; CUDA-Unterstützung in WSL2 ist
   damit automatisch da (nichts Extra in WSL nötig). Test: `nvidia-smi`.
2. Python-Umgebung:
   ```bash
   sudo apt update && sudo apt install -y python3-venv ffmpeg
   python3 -m venv venv && source venv/bin/activate
   pip install --upgrade pip
   # PyTorch passend zu deiner CUDA-Version (Beispiel CUDA 12.1):
   pip install torch --index-url https://download.pytorch.org/whl/cu121
   pip install -r requirements.txt
   ```

## 1) Analysieren
```bash
python analyze.py /pfad/zum/song.mp3
```
Gibt BPM, geschätzte Tonart, Länge und einen **Prompt-Vorschlag** aus.

## 2) Generieren (MusicGen)
```bash
python generate_musicgen.py \
  --prompt "driving hardcore/DnB-style electronic track, ~175 BPM, distorted bass, aggressive, dark, energetic, instrumental, looping" \
  --bpm 175 --duration 60 --out nine_new.wav
# danach z. B. nach mp3 wandeln:
ffmpeg -i nine_new.wav -b:a 192k nine.mp3
```
Dann `nine.mp3` nach `game/assets/nine.mp3` kopieren – fertig.

## Alternative: Stable Audio Open
`pip install stable-audio-tools` und deren CLI/Notebook nutzen (Text→Audio).
Gut für instrumentale Elektronik; eigene Lizenz beachten.
