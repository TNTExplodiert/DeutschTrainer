/* =====================================================================
   Grammatik-Obby – ein Roblox-Stil Hindernis-Spiel zum Deutsch-Üben
   Mechanik: Über Lava auf die Plattform mit der richtigen Antwort springen.
             Falsche Plattformen brechen weg -> Sturz in die Lava.
   ===================================================================== */

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const W = canvas.width;   // 960
const H = canvas.height;  // 540

// ---- Physik-Konstanten (auf 60 FPS abgestimmt) ----
const GRAVITY = 0.55;
const JUMP_VELOCITY = -17;   // nach oben (lange Hangtime, damit alle Plattformen erreichbar sind)
const RUN_ACCEL = 0.9;
const MAX_RUN_SPEED = 5.5;
const AIR_ACCEL = 0.6;       // Luftsteuerung -> macht das Zielen fair
const FRICTION = 0.75;

const LAVA_Y = 470;          // ab hier ist Lava (= Tod)
const PLATFORM_Y = 360;      // Höhe der Antwort-Plattformen

// ---- Spielzustand ----
let state = "menu";          // "menu" | "playing" | "win"
let order = [];              // gemischte Reihenfolge der Fragen
let stageIndex = 0;          // welche Frage gerade dran ist
let score = 0;               // richtige Antworten
let attempts = 0;            // Versuche insgesamt
let stage = null;            // aktuelle Plattform-Anordnung
let feedback = null;         // { text, color, t }
let animTime = 0;

// ---- Eingaben ----
const keys = { left: false, right: false, jump: false };

const player = {
  x: 0, y: 0, w: 34, h: 46,
  vx: 0, vy: 0,
  onGround: false,
  spawnX: 0, spawnY: 0,
  face: "smile",  // "smile" | "happy" | "ouch"
  blink: 0,
};

/* ---------------------------------------------------------------------
   Stage / Frage aufbauen
   ------------------------------------------------------------------- */
function buildStage(qIndex) {
  const q = QUESTIONS[order[qIndex]];
  const n = q.options.length;

  // Checkpoint (Start) links, Ziel-Flagge rechts
  const checkpoint = { x: 40, y: PLATFORM_Y, w: 170, h: 40, type: "ground" };
  const exit = { x: 560, y: PLATFORM_Y, w: 360, h: 40, type: "exit" };

  // Antwort-Plattformen gleichmäßig dazwischen verteilen
  // (Zone so gewählt, dass jede Plattform vom Start aus per Sprung erreichbar ist)
  const zoneStart = 250;
  const zoneEnd = 500;
  const pw = Math.min(120, (zoneEnd - zoneStart - (n - 1) * 25) / n);
  const gap = (zoneEnd - zoneStart - n * pw) / (n - 1 || 1);

  const answers = [];
  for (let i = 0; i < n; i++) {
    answers.push({
      x: zoneStart + i * (pw + gap),
      y: PLATFORM_Y,
      w: pw,
      h: 36,
      type: "answer",
      label: q.options[i],
      correct: i === q.correct,
      state: "idle",        // "idle" | "correct" | "breaking" | "broken"
      breakT: 0,
    });
  }

  stage = {
    question: q.q,
    topic: q.topic,
    checkpoint,
    exit,
    answers,
    bridge: null,           // erscheint nach richtiger Antwort
    solved: false,
  };

  // Spieler auf den Checkpoint setzen
  player.spawnX = checkpoint.x + checkpoint.w / 2 - player.w / 2;
  player.spawnY = checkpoint.y - player.h;
  respawn();
}

function respawn() {
  player.x = player.spawnX;
  player.y = player.spawnY;
  player.vx = 0;
  player.vy = 0;
  player.onGround = true;
  player.face = "smile";
}

/* ---------------------------------------------------------------------
   Kollision: alle gerade festen Plattformen sammeln
   ------------------------------------------------------------------- */
function solidPlatforms() {
  const list = [stage.checkpoint, stage.exit];
  for (const a of stage.answers) {
    if (a.state === "idle" || a.state === "correct") list.push(a);
  }
  if (stage.bridge) list.push(stage.bridge);
  return list;
}

/* ---------------------------------------------------------------------
   Update-Schleife
   ------------------------------------------------------------------- */
function update() {
  animTime++;
  if (state !== "playing") return;

  // ---- horizontale Bewegung ----
  const accel = player.onGround ? RUN_ACCEL : AIR_ACCEL;
  if (keys.left) player.vx -= accel;
  if (keys.right) player.vx += accel;
  if (!keys.left && !keys.right && player.onGround) player.vx *= FRICTION;
  player.vx = Math.max(-MAX_RUN_SPEED, Math.min(MAX_RUN_SPEED, player.vx));

  // ---- springen ----
  if (keys.jump && player.onGround) {
    player.vy = JUMP_VELOCITY;
    player.onGround = false;
  }

  // ---- Schwerkraft ----
  player.vy += GRAVITY;
  if (player.vy > 18) player.vy = 18;

  const prevBottom = player.y + player.h;

  // horizontal bewegen + an Spielfeldrand begrenzen
  player.x += player.vx;
  if (player.x < 0) { player.x = 0; player.vx = 0; }
  if (player.x + player.w > W) { player.x = W - player.w; player.vx = 0; }

  // vertikal bewegen
  player.y += player.vy;

  // ---- Plattform-Kollision (nur Landen von oben) ----
  player.onGround = false;
  for (const p of solidPlatforms()) {
    const overlapX = player.x + player.w > p.x + 4 && player.x < p.x + p.w - 4;
    const newBottom = player.y + player.h;
    if (overlapX && player.vy >= 0 && prevBottom <= p.y + 1 && newBottom >= p.y) {
      player.y = p.y - player.h;
      player.vy = 0;
      player.onGround = true;
      onLand(p);
    }
  }

  // ---- brechende Plattformen animieren ----
  for (const a of stage.answers) {
    if (a.state === "breaking") {
      a.breakT++;
      if (a.breakT > 14) a.state = "broken";   // fällt weg
    }
  }

  // ---- Ziel erreicht? ----
  if (stage.solved) {
    const e = stage.exit;
    if (player.x + player.w > e.x && player.x < e.x + e.w && player.onGround) {
      nextStage();
    }
  }

  // ---- in die Lava gefallen? ----
  if (player.y > LAVA_Y) {
    if (!stage.solved) { attempts++; }
    showFeedback(stage.solved ? "Noch mal!" : "Reingefallen!", "#ff7043");
    respawn();
  }

  if (feedback) { feedback.t--; if (feedback.t <= 0) feedback = null; }
  if (player.blink > 0) player.blink--;
  else if (Math.random() < 0.01) player.blink = 8;
}

function onLand(p) {
  if (p.type === "answer" && p.state === "idle") {
    attempts++;
    if (p.correct) {
      // richtig! -> Brücke zum Ziel bauen, falsche Plattformen entfernen
      p.state = "correct";
      score++;
      player.face = "happy";
      showFeedback("Richtig! 🎉", "#7CFC00");
      for (const a of stage.answers) {
        if (a !== p) a.state = "broken";
      }
      stage.bridge = {
        x: p.x, y: PLATFORM_Y,
        w: stage.exit.x - p.x, h: 24, type: "ground",
      };
      stage.solved = true;
    } else {
      // falsch -> Plattform bricht weg
      p.state = "breaking";
      p.breakT = 0;
      player.face = "ouch";
      player.vy = -4;          // kleiner Stups, dann Sturz
      showFeedback("Falsch! Plattform bricht …", "#ff5252");
    }
  }
}

function nextStage() {
  stageIndex++;
  if (stageIndex >= order.length) {
    state = "win";
  } else {
    buildStage(stageIndex);
  }
}

function showFeedback(text, color) {
  feedback = { text, color, t: 90 };
}

/* ---------------------------------------------------------------------
   Zeichnen
   ------------------------------------------------------------------- */
function draw() {
  // Himmel
  const sky = ctx.createLinearGradient(0, 0, 0, H);
  sky.addColorStop(0, "#8fd3f4");
  sky.addColorStop(1, "#c8eeff");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, H);
  drawClouds();

  if (state === "menu") { drawMenu(); return; }
  if (state === "win") { drawWin(); return; }

  drawLava();

  // Plattformen
  drawPlatform(stage.checkpoint, "#6d4c41", "🏁 Start");
  if (stage.bridge) drawPlatform(stage.bridge, "#43a047");
  drawPlatform(stage.exit, "#388e3c", "ZIEL");
  drawFlag(stage.exit);

  for (const a of stage.answers) drawAnswer(a);

  drawPlayer();
  drawHud();

  if (feedback) {
    ctx.font = "bold 30px Trebuchet MS";
    ctx.textAlign = "center";
    ctx.lineWidth = 5;
    ctx.strokeStyle = "rgba(0,0,0,0.5)";
    ctx.strokeText(feedback.text, W / 2, 130);
    ctx.fillStyle = feedback.color;
    ctx.fillText(feedback.text, W / 2, 130);
    ctx.textAlign = "left";
  }
}

function drawClouds() {
  ctx.fillStyle = "rgba(255,255,255,0.85)";
  const t = animTime * 0.2;
  for (let i = 0; i < 3; i++) {
    const cx = ((i * 360 + t) % (W + 160)) - 80;
    const cy = 60 + i * 30;
    cloud(cx, cy);
  }
}
function cloud(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, 22, 0, 7);
  ctx.arc(x + 26, y + 6, 28, 0, 7);
  ctx.arc(x + 58, y, 20, 0, 7);
  ctx.fill();
}

function drawLava() {
  const g = ctx.createLinearGradient(0, LAVA_Y, 0, H);
  g.addColorStop(0, "#ff7b00");
  g.addColorStop(1, "#c41e00");
  ctx.fillStyle = g;
  ctx.fillRect(0, LAVA_Y, W, H - LAVA_Y);
  // Blubber-Wellen
  ctx.fillStyle = "rgba(255,220,120,0.55)";
  for (let x = 0; x < W; x += 40) {
    const yy = LAVA_Y + 6 + Math.sin((x + animTime * 3) * 0.05) * 4;
    ctx.beginPath();
    ctx.arc(x + 20, yy, 6, 0, 7);
    ctx.fill();
  }
}

// Plattform im Roblox-Look: bunter Block mit "Studs" (Noppen) oben
function drawPlatform(p, color, label) {
  roundBlock(p.x, p.y, p.w, p.h, color);
  drawStuds(p.x, p.y, p.w, color);
  if (label) {
    ctx.fillStyle = "#fff";
    ctx.font = "bold 15px Trebuchet MS";
    ctx.textAlign = "center";
    ctx.fillText(label, p.x + p.w / 2, p.y + p.h / 2 + 14);
    ctx.textAlign = "left";
  }
}

function drawAnswer(a) {
  if (a.state === "broken") return;
  let color = "#3f7fd6";
  let dy = 0;
  if (a.state === "correct") color = "#43a047";
  if (a.state === "breaking") {
    color = "#e53935";
    dy = a.breakT * 2;           // sackt weg
    ctx.globalAlpha = Math.max(0, 1 - a.breakT / 14);
  }
  roundBlock(a.x, a.y + dy, a.w, a.h, color);
  drawStuds(a.x, a.y + dy, a.w, color);

  // Antworttext (passt sich an die Breite an)
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  fitText(a.label, a.x + a.w / 2, a.y + dy + a.h / 2, a.w - 10);
  ctx.textAlign = "left";
  ctx.globalAlpha = 1;
}

function roundBlock(x, y, w, h, color) {
  ctx.fillStyle = color;
  const r = 8;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.fill();
  // Schatten unten
  ctx.fillStyle = "rgba(0,0,0,0.18)";
  ctx.fillRect(x + 4, y + h - 6, w - 8, 4);
}

function drawStuds(x, y, w, color) {
  ctx.fillStyle = "rgba(255,255,255,0.35)";
  const studs = Math.max(2, Math.floor(w / 26));
  const step = w / studs;
  for (let i = 0; i < studs; i++) {
    ctx.beginPath();
    ctx.arc(x + step * (i + 0.5), y + 6, 4, 0, 7);
    ctx.fill();
  }
}

// Text auf eine Breite einpassen (ggf. kleiner machen oder 2 Zeilen)
function fitText(text, cx, cy, maxW) {
  let size = 15;
  ctx.font = `bold ${size}px Trebuchet MS`;
  if (ctx.measureText(text).width <= maxW) {
    ctx.fillText(text, cx, cy + 5);
    return;
  }
  // in zwei Zeilen brechen
  const words = text.split(" ");
  let line1 = "", line2 = "";
  for (const word of words) {
    if (ctx.measureText(line1 + " " + word).width < maxW || !line1) line1 += (line1 ? " " : "") + word;
    else line2 += (line2 ? " " : "") + word;
  }
  while ((ctx.measureText(line1).width > maxW || ctx.measureText(line2).width > maxW) && size > 9) {
    size--; ctx.font = `bold ${size}px Trebuchet MS`;
  }
  ctx.fillText(line1, cx, cy);
  ctx.fillText(line2, cx, cy + size + 1);
}

function drawFlag(e) {
  const fx = e.x + e.w - 24;
  ctx.strokeStyle = "#ddd";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(fx, e.y);
  ctx.lineTo(fx, e.y - 36);
  ctx.stroke();
  ctx.fillStyle = "#ffd34d";
  ctx.beginPath();
  ctx.moveTo(fx, e.y - 36);
  ctx.lineTo(fx + 26, e.y - 28);
  ctx.lineTo(fx, e.y - 20);
  ctx.fill();
}

// Blockige Figur im Roblox-Stil
function drawPlayer() {
  const x = player.x, y = player.y, w = player.w, h = player.h;
  // Beine
  ctx.fillStyle = "#2e7d32";
  ctx.fillRect(x + 4, y + h - 14, 10, 14);
  ctx.fillRect(x + w - 14, y + h - 14, 10, 14);
  // Körper
  ctx.fillStyle = "#ff5252";
  ctx.fillRect(x + 2, y + 18, w - 4, h - 30);
  // Kopf
  ctx.fillStyle = "#ffd54f";
  ctx.fillRect(x + 5, y, w - 10, 20);
  // Gesicht
  ctx.fillStyle = "#222";
  const ey = y + 8;
  if (player.blink > 0) {
    ctx.fillRect(x + 10, ey, 5, 1);
    ctx.fillRect(x + w - 15, ey, 5, 1);
  } else {
    ctx.fillRect(x + 10, ey - 2, 4, 4);
    ctx.fillRect(x + w - 14, ey - 2, 4, 4);
  }
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#222";
  ctx.beginPath();
  if (player.face === "ouch") {
    ctx.arc(x + w / 2, y + 17, 4, Math.PI, 2 * Math.PI); // umgedrehter Mund
  } else if (player.face === "happy") {
    ctx.arc(x + w / 2, y + 12, 5, 0.1 * Math.PI, 0.9 * Math.PI); // breites Lächeln
  } else {
    ctx.arc(x + w / 2, y + 12, 4, 0.15 * Math.PI, 0.85 * Math.PI);
  }
  ctx.stroke();
}

function drawHud() {
  // Frage-Banner oben
  ctx.fillStyle = "rgba(20,24,36,0.82)";
  roundBlock(W / 2 - 380, 14, 760, 56, "rgba(20,24,36,0.82)");
  ctx.fillStyle = "#ffd34d";
  ctx.font = "bold 13px Trebuchet MS";
  ctx.textAlign = "center";
  ctx.fillText("THEMA: " + stage.topic.toUpperCase(), W / 2, 34);
  ctx.fillStyle = "#fff";
  ctx.font = "bold 22px Trebuchet MS";
  ctx.fillText(stage.question, W / 2, 60);
  ctx.textAlign = "left";

  // Punkte / Fortschritt
  ctx.fillStyle = "#1d2230";
  ctx.font = "bold 16px Trebuchet MS";
  ctx.fillText(`⭐ ${score}/${order.length}   ✦ Versuche: ${attempts}`, 14, H - 14);
}

/* ---- Menü- und Gewinn-Bildschirm ---- */
function drawMenu() {
  drawLava();
  panel();
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.font = "bold 46px Trebuchet MS";
  ctx.fillText("🧗 GRAMMATIK-OBBY", W / 2, 180);
  ctx.font = "20px Trebuchet MS";
  ctx.fillStyle = "#c8d2ee";
  ctx.fillText("Springe über die Lava auf die Plattform mit der RICHTIGEN Antwort.", W / 2, 230);
  ctx.fillText("Falsche Plattformen brechen weg! Deutsch 7. Klasse, Realschule Bayern.", W / 2, 258);
  button("▶  SPIEL STARTEN", W / 2, 330);
  ctx.fillStyle = "#9aa6c4";
  ctx.font = "15px Trebuchet MS";
  ctx.fillText("← → laufen · Leertaste springen · in der Luft lenken", W / 2, 410);
  ctx.textAlign = "left";
}

function drawWin() {
  drawLava();
  panel();
  ctx.fillStyle = "#7CFC00";
  ctx.textAlign = "center";
  ctx.font = "bold 48px Trebuchet MS";
  ctx.fillText("🏆 GESCHAFFT!", W / 2, 190);
  ctx.fillStyle = "#fff";
  ctx.font = "24px Trebuchet MS";
  ctx.fillText(`Richtig beim 1. Versuch: ${score} von ${order.length}`, W / 2, 250);
  ctx.fillText(`Versuche insgesamt: ${attempts}`, W / 2, 285);
  button("↻  NOCH MAL", W / 2, 360);
  ctx.textAlign = "left";
}

function panel() {
  ctx.fillStyle = "rgba(20,24,36,0.8)";
  roundBlock(W / 2 - 420, 70, 840, 400, "rgba(20,24,36,0.8)");
}
let btnRect = null;
function button(text, cx, cy) {
  const w = 320, h = 60;
  btnRect = { x: cx - w / 2, y: cy - h / 2, w, h };
  roundBlock(btnRect.x, btnRect.y, w, h, "#ffd34d");
  ctx.fillStyle = "#1d2230";
  ctx.font = "bold 24px Trebuchet MS";
  ctx.textAlign = "center";
  ctx.fillText(text, cx, cy + 8);
}

/* ---------------------------------------------------------------------
   Spielstart / Steuerung
   ------------------------------------------------------------------- */
function startGame() {
  order = QUESTIONS.map((_, i) => i);
  // mischen (Fisher-Yates)
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  stageIndex = 0;
  score = 0;
  attempts = 0;
  buildStage(0);
  state = "playing";
}

function handleClick(mx, my) {
  if ((state === "menu" || state === "win") && btnRect) {
    if (mx >= btnRect.x && mx <= btnRect.x + btnRect.w &&
        my >= btnRect.y && my <= btnRect.y + btnRect.h) {
      startGame();
    }
  }
}

// Klick/Touch auf das Canvas in Spielkoordinaten umrechnen
canvas.addEventListener("click", (e) => {
  const r = canvas.getBoundingClientRect();
  handleClick((e.clientX - r.left) * (W / r.width), (e.clientY - r.top) * (H / r.height));
});

// Tastatur
const keyMap = {
  ArrowLeft: "left", KeyA: "left",
  ArrowRight: "right", KeyD: "right",
  Space: "jump", ArrowUp: "jump", KeyW: "jump",
};
window.addEventListener("keydown", (e) => {
  if (keyMap[e.code]) { keys[keyMap[e.code]] = true; e.preventDefault(); }
  if ((state === "menu" || state === "win") && (e.code === "Space" || e.code === "Enter")) startGame();
});
window.addEventListener("keyup", (e) => {
  if (keyMap[e.code]) { keys[keyMap[e.code]] = false; e.preventDefault(); }
});

// Touch-Buttons
if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
  document.getElementById("touch-controls").style.display = "flex";
}
document.querySelectorAll(".tbtn").forEach((btn) => {
  const k = btn.dataset.key;
  const on = (e) => { e.preventDefault(); keys[k] = true; if (state !== "playing") startGame(); };
  const off = (e) => { e.preventDefault(); keys[k] = false; };
  btn.addEventListener("touchstart", on);
  btn.addEventListener("touchend", off);
  btn.addEventListener("mousedown", on);
  btn.addEventListener("mouseup", off);
});

/* ---- Hauptschleife ---- */
function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}
loop();
