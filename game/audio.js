/* =====================================================================
   GameAudio – prozedurale, lizenzfreie Hintergrundmusik (Web Audio API)
   Eigene Komposition, keine externen Dateien:
     - "techno": treibender 4/4-Beat (Cube Dash & Wave)
     - "mario":  fröhliche Original-Chiptune im Mario-Stil (Obby)
   Hinweis: Es wird KEINE geschützte Originalmelodie verwendet.
   ===================================================================== */
const GameAudio = (function () {
  let ctx = null, master = null, timer = null;
  let style = null, step = 0, nextTime = 0, loopLen = 16, spb = 0.115;
  let muted = false;
  let noiseBuf = null;
  const LOOK = 0.12, INT = 25;

  function ensure() {
    if (ctx) { if (ctx.state === "suspended") ctx.resume(); return; }
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = muted ? 0 : 0.5;
      master.connect(ctx.destination);
      const n = Math.floor(ctx.sampleRate * 0.5);
      noiseBuf = ctx.createBuffer(1, n, ctx.sampleRate);
      const d = noiseBuf.getChannelData(0);
      for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
    } catch (e) { ctx = null; }
  }

  // einfache Ton-Stimme mit Hüllkurve
  function tone(t, freq, type, peak, dur, filter) {
    const o = ctx.createOscillator(); o.type = type; o.frequency.setValueAtTime(freq, t);
    let node = o;
    if (filter) { const f = ctx.createBiquadFilter(); f.type = "lowpass"; f.frequency.value = filter; o.connect(f); node = f; }
    const g = ctx.createGain(); node.connect(g); g.connect(master);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(peak, t + 0.006);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.start(t); o.stop(t + dur + 0.03);
  }
  function kick(t) {
    const o = ctx.createOscillator(); o.type = "sine";
    o.frequency.setValueAtTime(150, t); o.frequency.exponentialRampToValueAtTime(55, t + 0.12);
    const g = ctx.createGain(); o.connect(g); g.connect(master);
    g.gain.setValueAtTime(0.9, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);
    o.start(t); o.stop(t + 0.2);
  }
  function hat(t, vol) {
    if (!noiseBuf) return;
    const s = ctx.createBufferSource(); s.buffer = noiseBuf;
    const f = ctx.createBiquadFilter(); f.type = "highpass"; f.frequency.value = 7000;
    const g = ctx.createGain(); s.connect(f); f.connect(g); g.connect(master);
    g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.03);
    s.start(t); s.stop(t + 0.05);
  }

  // ---- Muster (Frequenzen in Hz, 0 = Pause) ----
  const bassTech = [55, 0, 55, 0, 55, 0, 0, 82.41, 55, 0, 55, 0, 73.42, 0, 82.41, 0];
  const leadTech = [440, 0, 523.25, 0, 659.25, 0, 523.25, 0, 440, 0, 523.25, 0, 659.25, 0, 880, 0];
  // Original-Chiptune (C-Dur), fröhlich & hüpfend – KEINE geschützte Melodie
  const melMario = [
    659.25, 0, 659.25, 0, 783.99, 0, 1046.5, 0, 880.0, 0, 783.99, 0, 659.25, 0, 587.33, 0,
    523.25, 0, 659.25, 0, 783.99, 0, 880.0, 0, 783.99, 0, 659.25, 0, 523.25, 0, 0, 0,
  ];
  const bassMario = [
    130.81, 0, 0, 0, 130.81, 0, 0, 0, 98.0, 0, 0, 0, 98.0, 0, 0, 0,
    110.0, 0, 0, 0, 110.0, 0, 0, 0, 87.31, 0, 0, 0, 98.0, 0, 0, 0,
  ];

  function schedStep(s, t) {
    if (style === "techno") {
      if (s % 4 === 0) kick(t);
      hat(t, s % 2 === 1 ? 0.16 : 0.05);
      const b = bassTech[s % 16]; if (b) tone(t, b, "sawtooth", 0.28, 0.16, 600);
      const l = leadTech[s % 16]; if (l) tone(t, l, "square", 0.10, 0.14, 2200);
    } else {
      const m = melMario[s % 32]; if (m) tone(t, m, "square", 0.16, 0.18, 3200);
      const b = bassMario[s % 32]; if (b) tone(t, b, "triangle", 0.22, 0.22, 1200);
      if (s % 4 === 0) hat(t, 0.05);
    }
  }

  function loop() {
    if (!ctx) return;
    while (nextTime < ctx.currentTime + LOOK) {
      schedStep(step, nextTime);
      nextTime += spb;
      step = (step + 1) % loopLen;
    }
  }

  function play(which) {
    ensure(); if (!ctx) return;
    if (style === which && timer) { if (ctx.state === "suspended") ctx.resume(); return; }
    style = which; step = 0;
    if (which === "techno") { spb = 60 / 130 / 4; loopLen = 16; }
    else { spb = 60 / 150 / 4; loopLen = 32; }
    nextTime = ctx.currentTime + 0.06;
    if (!timer) timer = setInterval(loop, INT);
    if (ctx.state === "suspended") ctx.resume();
  }
  function stop() { if (timer) { clearInterval(timer); timer = null; } style = null; }
  function setMuted(m) { muted = !!m; if (master) master.gain.value = muted ? 0 : 0.5; }
  function isMuted() { return muted; }

  return { ensure, play, stop, setMuted, isMuted };
})();
window.GameAudio = GameAudio;
