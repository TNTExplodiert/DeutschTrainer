/* =====================================================================
   Grammatik-Obby – Lern-App im Roblox-Stil
   - Cookie-Zustimmung -> Menü (Schwierigkeit) -> Levelkarte -> Spiel
   - Falsch gelöste Aufgaben werden wiederholt, bis sie sitzen
   - Profil merkt sich Problem-Themen (Übungs-Mix)
   ===================================================================== */

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const W = canvas.width;   // 960
const H = canvas.height;  // 540

// ---- DOM ----
const elApp = document.getElementById("app");
const elTouch = document.getElementById("touch-controls");
const elBack = document.getElementById("btn-back");
const overlays = {
  consent: document.getElementById("overlay-consent"),
  mode: document.getElementById("overlay-mode"),
  menu: document.getElementById("overlay-menu"),
  map: document.getElementById("overlay-map"),
  levelcomplete: document.getElementById("overlay-levelcomplete"),
};
const mapGrid = document.getElementById("map-grid");
const mapDiff = document.getElementById("map-diff");

// ---- Schwierigkeitsgrade (Physik) ----
const DIFF = {
  easy:   { grav: 0.50, jump: -16.5, run: 5.0, air: 0.65, label: "Leicht" },
  medium: { grav: 0.55, jump: -17.0, run: 5.5, air: 0.60, label: "Mittel" },
  hard:   { grav: 0.64, jump: -17.5, run: 6.3, air: 0.50, label: "Schwer" },
};

// ---- aktive Physik (wird beim Levelstart gesetzt) ----
let GRAVITY = 0.55, JUMP_VELOCITY = -17, MAX_RUN_SPEED = 5.5, AIR_ACCEL = 0.6;
const RUN_ACCEL = 0.9;
const FRICTION = 0.75;
const LAVA_Y = 470;
const PLATFORM_Y = 360;

// ---- Frage-Index für schnelle Suche ----
const QUESTION_BY_ID = {};
QUESTIONS.forEach((q) => { QUESTION_BY_ID[q.id] = q; });
function questionsByTopic(t) { return QUESTIONS.filter((q) => q.topic === t); }

// ---- App-Zustand ----
let appState = "consent";           // consent | mode | menu | map | playing | levelcomplete
let gameMode = "obby";              // obby | dash  (Cube Dash = Geometry-Dash-Stil)
let difficulty = "medium";
let profile = Storage.defaultProfile();
let session = null;                 // aktuelles Level
let stage = null;                   // aktuelle Plattform-Anordnung (Obby)
let feedback = null;
let animTime = 0;

// ---- Cube Dash (Geometry-Dash-Modus) ----
let dash = null;
const DASH = {
  CX: 170, GROUND_Y: 430, BAR_Y: 300, BAR_H: 16, CUBE: 34,
  GRAV: 0.9, JUMP: -16.5,
  SEG_LEN: 680, BAR_START: 300, BAR_END: 600, JUDGE: 560, FINISH_PAD: 360,
};
const DASH_SPEED = { easy: 4.2, medium: 5.4, hard: 6.8 };

const keys = { left: false, right: false, jump: false };
const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

const player = {
  x: 0, y: 0, w: 34, h: 46, vx: 0, vy: 0,
  onGround: false, spawnX: 0, spawnY: 0,
  face: "smile", blink: 0, locked: false,
};

/* ---------------------------------------------------------------------
   Zustands-Wechsel / Overlays
   ------------------------------------------------------------------- */
function showState(name) {
  appState = name;
  for (const key in overlays) overlays[key].classList.toggle("hidden", key !== name);
  elTouch.classList.toggle("hidden", !(isTouch && name === "playing"));
  elBack.classList.toggle("hidden", name !== "playing");
}

function applyDifficulty(d) {
  const c = DIFF[d] || DIFF.medium;
  GRAVITY = c.grav; JUMP_VELOCITY = c.jump; MAX_RUN_SPEED = c.run; AIR_ACCEL = c.air;
}

/* ---------------------------------------------------------------------
   Profil-Auswertung für die Karte
   ------------------------------------------------------------------- */
function dueCountForTopic(topic) {
  return Object.keys(profile.due).filter((id) => QUESTION_BY_ID[id] && QUESTION_BY_ID[id].topic === topic).length;
}
function dueCountTotal() {
  return Object.keys(profile.due).filter((id) => QUESTION_BY_ID[id]).length;
}
function topicStatus(topic) {
  const t = profile.topics[topic];
  const due = dueCountForTopic(topic);
  if (profile.completed[topic] && due === 0) return { cls: "mastered", label: "⭐ Gemeistert" };
  if (due > 0 || (t && t.wrong > t.correct)) return { cls: "weak", label: "⚠️ Üben" + (due ? " (" + due + ")" : "") };
  if (t) return { cls: "", label: "In Arbeit" };
  return { cls: "", label: "Neu" };
}
function weakTopics() {
  return TOPIC_ORDER.filter((t) => {
    const x = profile.topics[t];
    return dueCountForTopic(t) > 0 || (x && x.wrong > x.correct);
  });
}

/* ---------------------------------------------------------------------
   Warteschlangen (Levels)
   ------------------------------------------------------------------- */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
function buildTopicQueue(topic) {
  return shuffle(questionsByTopic(topic).slice());
}
function buildAdaptiveQueue() {
  // 1) alle noch fälligen (falsch gelösten) Fragen
  let qs = Object.keys(profile.due).map((id) => QUESTION_BY_ID[id]).filter(Boolean);
  // 2) Fragen aus Problem-Themen ergänzen
  for (const t of weakTopics()) {
    for (const q of questionsByTopic(t)) if (!qs.includes(q)) qs.push(q);
  }
  // 3) Notfalls allgemeiner Mix
  if (qs.length < 5) {
    for (const q of shuffle(QUESTIONS.slice())) {
      if (!qs.includes(q)) qs.push(q);
      if (qs.length >= 8) break;
    }
  }
  shuffle(qs);
  return qs.slice(0, 12);
}

function startSession(mode, topic) {
  const queue = mode === "topic" ? buildTopicQueue(topic) : buildAdaptiveQueue();
  session = {
    mode, topic,
    queue,
    total: queue.length,
    askedWrong: new Set(),
    attempts: 0,
    correctFirstTry: 0,
  };
  showState("playing");
  configureTouch();
  resize();
  if (gameMode === "dash") {
    startDash(queue);
  } else {
    applyDifficulty(difficulty);
    buildStage(session.queue[0]);
  }
}

// Touch-Steuerung je nach Modus: im Dash nur Springen (Laufpfeile aus)
function configureTouch() {
  const left = document.querySelector(".touch-left");
  const jump = document.querySelector(".tbtn.jump");
  if (left) left.style.display = gameMode === "dash" ? "none" : "flex";
  if (jump) jump.textContent = gameMode === "dash" ? "⤒ SPRINGEN" : "⤒ SPRUNG";
}

/* ---------------------------------------------------------------------
   Stage (eine Frage) aufbauen
   ------------------------------------------------------------------- */
function buildStage(question) {
  // Antwortoptionen mischen, damit die richtige Plattform nicht immer gleich liegt
  const opts = shuffle(question.options.map((label, i) => ({ label, correct: i === question.correct })));
  const n = opts.length;

  const checkpoint = { x: 40, y: PLATFORM_Y, w: 170, h: 40, type: "ground" };
  const exit = { x: 560, y: PLATFORM_Y, w: 360, h: 40, type: "exit" };

  const zoneStart = 250, zoneEnd = 500;
  const pw = Math.min(120, (zoneEnd - zoneStart - (n - 1) * 25) / n);
  const gap = (zoneEnd - zoneStart - n * pw) / (n - 1 || 1);

  const answers = [];
  for (let i = 0; i < n; i++) {
    answers.push({
      x: zoneStart + i * (pw + gap), y: PLATFORM_Y, w: pw, h: 36, type: "answer",
      label: opts[i].label, correct: opts[i].correct, state: "idle", breakT: 0,
    });
  }

  stage = {
    q: question, question: question.q, topic: question.topic,
    checkpoint, exit, answers, bridge: null, solved: false,
  };

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
  player.locked = false;
}

function solidPlatforms() {
  const list = [stage.checkpoint, stage.exit];
  for (const a of stage.answers) if (a.state === "idle" || a.state === "correct") list.push(a);
  if (stage.bridge) list.push(stage.bridge);
  return list;
}

/* ---------------------------------------------------------------------
   Update
   ------------------------------------------------------------------- */
function update() {
  animTime++;
  if (appState !== "playing") return;
  if (gameMode === "dash") { updateDash(); return; }
  if (!stage) return;

  if (player.locked) {
    player.vx = 0;
  } else {
    const accel = player.onGround ? RUN_ACCEL : AIR_ACCEL;
    if (keys.left) player.vx -= accel;
    if (keys.right) player.vx += accel;
    if (!keys.left && !keys.right && player.onGround) player.vx *= FRICTION;
    player.vx = Math.max(-MAX_RUN_SPEED, Math.min(MAX_RUN_SPEED, player.vx));
    if (keys.jump && player.onGround) { player.vy = JUMP_VELOCITY; player.onGround = false; }
  }

  player.vy += GRAVITY;
  if (player.vy > 18) player.vy = 18;

  const prevBottom = player.y + player.h;
  player.x += player.vx;
  if (player.x < 0) { player.x = 0; player.vx = 0; }
  if (player.x + player.w > W) { player.x = W - player.w; player.vx = 0; }
  player.y += player.vy;

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

  for (const a of stage.answers) {
    if (a.state === "breaking") { a.breakT++; if (a.breakT > 14) a.state = "broken"; }
  }

  // Ziel erreicht?
  if (stage.solved) {
    const e = stage.exit;
    if (player.x + player.w > e.x && player.x < e.x + e.w && player.onGround) {
      advanceAfterExit();
      return;
    }
  }

  // In die Lava gefallen -> nächste (oder gleiche) Frage aufbauen
  if (player.y > LAVA_Y) {
    if (session.queue.length === 0) { finishLevel(); return; }
    showFeedback(stage.solved ? "Weiter!" : "Reingefallen!", "#ff7043");
    buildStage(session.queue[0]);
  }

  if (feedback) { feedback.t--; if (feedback.t <= 0) feedback = null; }
  if (player.blink > 0) player.blink--;
  else if (Math.random() < 0.01) player.blink = 8;
}

function onLand(p) {
  if (p.type !== "answer" || p.state !== "idle") return;
  session.attempts++;

  if (p.correct) {
    Storage.recordAnswer(profile, stage.q, true);
    Storage.saveProfile(profile);
    if (!session.askedWrong.has(stage.q.id)) session.correctFirstTry++;
    session.queue.shift();                 // gelöste Frage aus der Schlange nehmen

    p.state = "correct";
    player.face = "happy";
    showFeedback("Richtig! 🎉", "#7CFC00");
    for (const a of stage.answers) if (a !== p) a.state = "broken";
    stage.bridge = { x: p.x, y: PLATFORM_Y, w: stage.exit.x - p.x, h: 24, type: "ground" };
    stage.solved = true;
  } else {
    Storage.recordAnswer(profile, stage.q, false);
    Storage.saveProfile(profile);
    session.askedWrong.add(stage.q.id);
    session.queue.push(session.queue.shift());  // ans Ende -> kommt später wieder

    p.state = "breaking"; p.breakT = 0;
    player.face = "ouch";
    player.vx = 0; player.vy = -4;
    player.locked = true;
    showFeedback("Falsch! Kommt später nochmal …", "#ff5252");
  }
}

function advanceAfterExit() {
  if (session.queue.length === 0) finishLevel();
  else buildStage(session.queue[0]);
}

function finishLevel() {
  if (session.mode === "topic") profile.completed[session.topic] = true;
  Storage.saveProfile(profile);

  const titleEl = document.getElementById("lc-title");
  const statsEl = document.getElementById("lc-stats");
  titleEl.textContent = session.mode === "topic"
    ? "🏆 " + (TOPIC_INFO[session.topic] ? TOPIC_INFO[session.topic].name : session.topic) + " geschafft!"
    : "🏆 Übungs-Mix geschafft!";
  statsEl.innerHTML =
    "Richtig beim 1. Versuch: <b>" + session.correctFirstTry + " von " + session.total + "</b><br>" +
    "Versuche gesamt: <b>" + session.attempts + "</b>";
  stage = null;
  showState("levelcomplete");
}

function showFeedback(text, color) { feedback = { text, color, t: 90 }; }

/* =====================================================================
   CUBE DASH (Geometry-Dash-Modus)
   Würfel rennt automatisch, springt auf Tastendruck/Tippen.
   Pro Tor: oben = obere Antwort, unten = untere Antwort.
   Richtig -> weiter; falsch oder Crash -> Neustart (Versuch +1).
   ===================================================================== */
function startDash(questions) {
  const n = Math.min(7, questions.length);
  const chosen = questions.slice(0, n);
  const gates = chosen.map((q) => {
    const correct = q.options[q.correct];
    const others = q.options.filter((_, i) => i !== q.correct);
    const wrong = others[Math.floor(Math.random() * others.length)];
    const topIsCorrect = Math.random() < 0.5;
    return {
      q,
      top: topIsCorrect ? correct : wrong,
      bottom: topIsCorrect ? wrong : correct,
      correctIsTop: topIsCorrect,
      judged: false,
    };
  });
  dash = {
    gates,
    speed: DASH_SPEED[difficulty] || 5.4,
    worldX: 0,
    attempt: 1,
    cube: { y: DASH.GROUND_Y - DASH.CUBE, vy: 0, onGround: true, rot: 0 },
    dead: false, deadT: 0,
    finishX: gates.length * DASH.SEG_LEN + DASH.FINISH_PAD,
    particles: [],
  };
}

function updateDash() {
  if (!dash) return;
  const c = dash.cube;

  if (dash.dead) {
    dash.deadT++;
    for (const p of dash.particles) { p.x += p.vx; p.y += p.vy; p.vy += 0.5; p.life--; }
    if (dash.deadT > 38) restartDash();
    return;
  }

  // Springen (nur am Boden / auf dem Balken)
  if (keys.jump && c.onGround) { c.vy = DASH.JUMP; c.onGround = false; }
  c.vy += DASH.GRAV; if (c.vy > 22) c.vy = 22;
  const prevBottom = c.y + DASH.CUBE;
  c.y += c.vy;
  dash.worldX += dash.speed;

  // Rotation wie in Geometry Dash
  if (c.onGround) c.rot = Math.round(c.rot / (Math.PI / 2)) * (Math.PI / 2);
  else c.rot += dash.speed * 0.02;

  // Kollision: Balken des aktuellen Segments + Boden
  c.onGround = false;
  const seg = Math.floor(dash.worldX / DASH.SEG_LEN);
  const barX0 = seg * DASH.SEG_LEN + DASH.BAR_START;
  const barX1 = seg * DASH.SEG_LEN + DASH.BAR_END;
  let onBar = false;
  if (dash.worldX >= barX0 && dash.worldX <= barX1 && c.vy >= 0 &&
      prevBottom <= DASH.BAR_Y + dash.speed + 2 && c.y + DASH.CUBE >= DASH.BAR_Y) {
    c.y = DASH.BAR_Y - DASH.CUBE; c.vy = 0; c.onGround = true; onBar = true;
  }
  if (!onBar && c.y + DASH.CUBE >= DASH.GROUND_Y) {
    c.y = DASH.GROUND_Y - DASH.CUBE; c.vy = 0; c.onGround = true;
  }

  // Tore bewerten
  const midY = (DASH.BAR_Y + DASH.GROUND_Y) / 2;
  for (let i = 0; i < dash.gates.length; i++) {
    const g = dash.gates[i];
    if (g.judged) continue;
    if (dash.worldX >= i * DASH.SEG_LEN + DASH.JUDGE) {
      g.judged = true;
      const choseTop = (c.y + DASH.CUBE / 2) < midY;
      const correct = (choseTop === g.correctIsTop);
      Storage.recordAnswer(profile, g.q, correct);
      Storage.saveProfile(profile);
      if (!correct) { dashDie(); return; }
    }
  }

  if (dash.worldX >= dash.finishX) { dashFinish(); }
}

function dashDie() {
  dash.dead = true; dash.deadT = 0;
  const c = dash.cube;
  dash.particles = [];
  for (let i = 0; i < 16; i++) {
    dash.particles.push({
      x: DASH.CX + DASH.CUBE / 2, y: c.y + DASH.CUBE / 2,
      vx: (Math.random() - 0.5) * 11, vy: (Math.random() - 0.7) * 11,
      life: 30 + Math.random() * 12,
    });
  }
}

function restartDash() {
  dash.dead = false; dash.deadT = 0;
  dash.worldX = 0; dash.attempt++;
  for (const g of dash.gates) g.judged = false;
  dash.cube.y = DASH.GROUND_Y - DASH.CUBE;
  dash.cube.vy = 0; dash.cube.onGround = true; dash.cube.rot = 0;
  dash.particles = [];
}

function dashFinish() {
  if (session.mode === "topic") profile.completed[session.topic] = true;
  Storage.saveProfile(profile);
  document.getElementById("lc-title").textContent = "🏆 Level geschafft!";
  document.getElementById("lc-stats").innerHTML =
    (session.mode === "topic" && TOPIC_INFO[session.topic] ? TOPIC_INFO[session.topic].name : "Übungs-Mix") +
    "<br>Versuche: <b>" + dash.attempt + "</b> · Tore: <b>" + dash.gates.length + "</b>";
  dash = null;
  showState("levelcomplete");
}

/* ---- Cube Dash zeichnen ---- */
function drawDash() {
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, "#1f6dff"); g.addColorStop(1, "#0b3fb0");
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  drawDashBlocks();

  const seg = Math.floor(dash.worldX / DASH.SEG_LEN);
  for (let i = Math.max(0, seg - 1); i <= seg + 1 && i < dash.gates.length; i++) drawDashGate(i);

  const finishSx = DASH.CX + (dash.finishX - dash.worldX);
  if (finishSx < W + 40) {
    ctx.fillStyle = "#7CFC00"; ctx.fillRect(finishSx, 30, 10, DASH.GROUND_Y - 30);
    ctx.fillStyle = "rgba(124,252,0,0.3)"; ctx.fillRect(finishSx - 12, 30, 12, DASH.GROUND_Y - 30);
  }

  ctx.fillStyle = "#0a2e7a"; ctx.fillRect(0, DASH.GROUND_Y, W, H - DASH.GROUND_Y);
  ctx.fillStyle = "#5b9bff"; ctx.fillRect(0, DASH.GROUND_Y, W, 5);

  if (dash.dead) {
    ctx.fillStyle = "#7CFC00";
    for (const p of dash.particles) if (p.life > 0) ctx.fillRect(p.x - 4, p.y - 4, 8, 8);
  } else {
    drawCube();
  }
  drawDashHud();
}

function drawDashBlocks() {
  ctx.fillStyle = "rgba(255,255,255,0.06)";
  const off = (dash.worldX * 0.5) % 120;
  for (let x = -120; x < W + 120; x += 120) {
    for (let y = 18; y < DASH.GROUND_Y - 40; y += 110) {
      ctx.fillRect(x - off + ((y / 110) % 2) * 60, y, 80, 70);
    }
  }
  ctx.fillStyle = "rgba(150,255,150,0.45)";
  const off2 = (dash.worldX * 1.2) % 90;
  for (let x = -90; x < W + 90; x += 90) {
    ctx.fillRect(x - off2, 60 + ((x * 7) % 220), 5, 5);
  }
}

function drawDashGate(i) {
  const g = dash.gates[i];
  const base = i * DASH.SEG_LEN;
  const sx0 = DASH.CX + (base + DASH.BAR_START - dash.worldX);
  const sx1 = DASH.CX + (base + DASH.BAR_END - dash.worldX);
  // gestrichelter Balken (wie in Geometry Dash)
  ctx.fillStyle = "#ffffff";
  for (let x = sx0; x < sx1 - 14; x += 26) ctx.fillRect(x, DASH.BAR_Y, 14, DASH.BAR_H);
  // Antwort-Labels
  ctx.textAlign = "center";
  ctx.font = "bold 22px Trebuchet MS";
  const cx = (sx0 + sx1) / 2;
  dashLabel(g.top, cx, DASH.BAR_Y - 22);
  dashLabel(g.bottom, cx, DASH.GROUND_Y - 16);
  ctx.textAlign = "left";
}

function dashLabel(text, x, y) {
  ctx.lineWidth = 4; ctx.strokeStyle = "rgba(0,35,110,0.85)";
  ctx.strokeText(text, x, y);
  ctx.fillStyle = "#ffffff";
  ctx.fillText(text, x, y);
}

function drawCube() {
  const c = dash.cube, s = DASH.CUBE;
  ctx.save();
  ctx.translate(DASH.CX + s / 2, c.y + s / 2);
  ctx.rotate(c.rot);
  ctx.fillStyle = "#7CFC00";
  ctx.fillRect(-s / 2, -s / 2, s, s);
  ctx.lineWidth = 3; ctx.strokeStyle = "#ffffff";
  ctx.strokeRect(-s / 2, -s / 2, s, s);
  ctx.fillStyle = "#08321f";
  ctx.fillRect(-8, -6, 5, 6); ctx.fillRect(3, -6, 5, 6);
  ctx.fillRect(-8, 6, 16, 3);
  ctx.restore();
}

function dashRoundRect(x, y, w, h, r) {
  r = Math.max(0, Math.min(r, h / 2, w / 2));
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function drawDashHud() {
  const pct = Math.max(0, Math.min(1, dash.worldX / dash.finishX));
  const bx = 110, by = 22, bw = W - 230;
  ctx.fillStyle = "rgba(255,255,255,0.22)"; dashRoundRect(bx, by, bw, 16, 8); ctx.fill();
  if (pct > 0) { ctx.fillStyle = "#7CFC00"; dashRoundRect(bx, by, bw * pct, 16, 8); ctx.fill(); }
  ctx.strokeStyle = "#fff"; ctx.lineWidth = 2; dashRoundRect(bx, by, bw, 16, 8); ctx.stroke();
  ctx.fillStyle = "#fff"; ctx.textAlign = "left"; ctx.font = "bold 16px Trebuchet MS";
  ctx.fillText(Math.round(pct * 100) + "%", bx + bw + 12, by + 14);
  ctx.font = "bold 18px Trebuchet MS";
  ctx.fillText("VERSUCH " + dash.attempt, bx, by + 46);

  const next = dash.gates.find((g) => !g.judged);
  if (next) {
    ctx.textAlign = "center"; ctx.font = "bold 24px Trebuchet MS";
    dashLabel(next.q.q, W / 2, 118);
    ctx.textAlign = "left";
  }
}

/* ---------------------------------------------------------------------
   Zeichnen
   ------------------------------------------------------------------- */
function draw() {
  if (appState === "playing" && gameMode === "dash" && dash) { drawDash(); return; }
  drawSky();
  drawClouds();
  if (appState === "playing" && gameMode === "obby" && stage) {
    drawLava();
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
      ctx.lineWidth = 5; ctx.strokeStyle = "rgba(0,0,0,0.5)";
      ctx.strokeText(feedback.text, W / 2, 130);
      ctx.fillStyle = feedback.color;
      ctx.fillText(feedback.text, W / 2, 130);
      ctx.textAlign = "left";
    }
  }
}

function drawSky() {
  const sky = ctx.createLinearGradient(0, 0, 0, H);
  sky.addColorStop(0, "#8fd3f4");
  sky.addColorStop(1, "#c8eeff");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, H);
}
function drawClouds() {
  ctx.fillStyle = "rgba(255,255,255,0.85)";
  const t = animTime * 0.2;
  for (let i = 0; i < 3; i++) cloud(((i * 360 + t) % (W + 160)) - 80, 60 + i * 30);
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
  g.addColorStop(0, "#ff7b00"); g.addColorStop(1, "#c41e00");
  ctx.fillStyle = g; ctx.fillRect(0, LAVA_Y, W, H - LAVA_Y);
  ctx.fillStyle = "rgba(255,220,120,0.55)";
  for (let x = 0; x < W; x += 40) {
    const yy = LAVA_Y + 6 + Math.sin((x + animTime * 3) * 0.05) * 4;
    ctx.beginPath(); ctx.arc(x + 20, yy, 6, 0, 7); ctx.fill();
  }
}
function drawPlatform(p, color, label) {
  roundBlock(p.x, p.y, p.w, p.h, color);
  drawStuds(p.x, p.y, p.w);
  if (label) {
    ctx.fillStyle = "#fff"; ctx.font = "bold 15px Trebuchet MS"; ctx.textAlign = "center";
    ctx.fillText(label, p.x + p.w / 2, p.y + p.h / 2 + 14); ctx.textAlign = "left";
  }
}
function drawAnswer(a) {
  if (a.state === "broken") return;
  let color = "#3f7fd6", dy = 0;
  if (a.state === "correct") color = "#43a047";
  if (a.state === "breaking") { color = "#e53935"; dy = a.breakT * 2; ctx.globalAlpha = Math.max(0, 1 - a.breakT / 14); }
  roundBlock(a.x, a.y + dy, a.w, a.h, color);
  drawStuds(a.x, a.y + dy, a.w);
  ctx.fillStyle = "#fff"; ctx.textAlign = "center";
  fitText(a.label, a.x + a.w / 2, a.y + dy + a.h / 2, a.w - 10);
  ctx.textAlign = "left"; ctx.globalAlpha = 1;
}
function roundBlock(x, y, w, h, color) {
  ctx.fillStyle = color; const r = 8;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.fill();
  ctx.fillStyle = "rgba(0,0,0,0.18)"; ctx.fillRect(x + 4, y + h - 6, w - 8, 4);
}
function drawStuds(x, y, w) {
  ctx.fillStyle = "rgba(255,255,255,0.35)";
  const studs = Math.max(2, Math.floor(w / 26)); const step = w / studs;
  for (let i = 0; i < studs; i++) { ctx.beginPath(); ctx.arc(x + step * (i + 0.5), y + 6, 4, 0, 7); ctx.fill(); }
}
function fitText(text, cx, cy, maxW) {
  let size = 15; ctx.font = `bold ${size}px Trebuchet MS`;
  if (ctx.measureText(text).width <= maxW) { ctx.fillText(text, cx, cy + 5); return; }
  const words = text.split(" "); let line1 = "", line2 = "";
  for (const word of words) {
    if (ctx.measureText(line1 + " " + word).width < maxW || !line1) line1 += (line1 ? " " : "") + word;
    else line2 += (line2 ? " " : "") + word;
  }
  while ((ctx.measureText(line1).width > maxW || ctx.measureText(line2).width > maxW) && size > 9) {
    size--; ctx.font = `bold ${size}px Trebuchet MS`;
  }
  ctx.fillText(line1, cx, cy); ctx.fillText(line2, cx, cy + size + 1);
}
function drawFlag(e) {
  const fx = e.x + e.w - 24;
  ctx.strokeStyle = "#ddd"; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(fx, e.y); ctx.lineTo(fx, e.y - 36); ctx.stroke();
  ctx.fillStyle = "#ffd34d";
  ctx.beginPath(); ctx.moveTo(fx, e.y - 36); ctx.lineTo(fx + 26, e.y - 28); ctx.lineTo(fx, e.y - 20); ctx.fill();
}
function drawPlayer() {
  const x = player.x, y = player.y, w = player.w, h = player.h;
  ctx.fillStyle = "#2e7d32";
  ctx.fillRect(x + 4, y + h - 14, 10, 14); ctx.fillRect(x + w - 14, y + h - 14, 10, 14);
  ctx.fillStyle = "#ff5252"; ctx.fillRect(x + 2, y + 18, w - 4, h - 30);
  ctx.fillStyle = "#ffd54f"; ctx.fillRect(x + 5, y, w - 10, 20);
  ctx.fillStyle = "#222"; const ey = y + 8;
  if (player.blink > 0) { ctx.fillRect(x + 10, ey, 5, 1); ctx.fillRect(x + w - 15, ey, 5, 1); }
  else { ctx.fillRect(x + 10, ey - 2, 4, 4); ctx.fillRect(x + w - 14, ey - 2, 4, 4); }
  ctx.lineWidth = 2; ctx.strokeStyle = "#222"; ctx.beginPath();
  if (player.face === "ouch") ctx.arc(x + w / 2, y + 17, 4, Math.PI, 2 * Math.PI);
  else if (player.face === "happy") ctx.arc(x + w / 2, y + 12, 5, 0.1 * Math.PI, 0.9 * Math.PI);
  else ctx.arc(x + w / 2, y + 12, 4, 0.15 * Math.PI, 0.85 * Math.PI);
  ctx.stroke();
}
function drawHud() {
  roundBlock(W / 2 - 380, 14, 760, 56, "rgba(20,24,36,0.82)");
  ctx.fillStyle = "#ffd34d"; ctx.font = "bold 13px Trebuchet MS"; ctx.textAlign = "center";
  ctx.fillText("THEMA: " + stage.topic.toUpperCase(), W / 2, 34);
  ctx.fillStyle = "#fff"; ctx.font = "bold 22px Trebuchet MS";
  ctx.fillText(stage.question, W / 2, 60);
  ctx.textAlign = "left";
  const solved = session.total - session.queue.length;
  ctx.fillStyle = "#1d2230"; ctx.font = "bold 16px Trebuchet MS";
  ctx.fillText(`✅ ${solved}/${session.total}   ✦ Versuche: ${session.attempts}   ${DIFF[difficulty].label}`, 14, H - 14);
}

/* ---------------------------------------------------------------------
   Levelkarte rendern
   ------------------------------------------------------------------- */
function makeCard(icon, name, status, cls) {
  const div = document.createElement("div");
  div.className = "level-card" + (cls ? " " + cls : "");
  div.innerHTML = `<div class="icon">${icon}</div><div class="name">${name}</div><div class="status">${status}</div>`;
  return div;
}
function renderMap() {
  mapGrid.innerHTML = "";
  mapDiff.textContent = (gameMode === "dash" ? "🔺 Cube Dash" : "🧗 Obby") + " · " + DIFF[difficulty].label;

  const due = dueCountTotal();
  const adaptive = makeCard("🎯", "Übungs-Mix",
    due > 0 ? due + " zu wiederholen" : "deine Schwächen", "adaptive");
  adaptive.onclick = () => startSession("adaptive", null);
  mapGrid.appendChild(adaptive);

  for (const topic of TOPIC_ORDER) {
    const info = TOPIC_INFO[topic];
    const st = topicStatus(topic);
    const card = makeCard(info.icon, info.name, st.label, st.cls);
    card.onclick = () => startSession("topic", topic);
    mapGrid.appendChild(card);
  }
}

/* ---------------------------------------------------------------------
   Schwierigkeits-Auswahl im Menü
   ------------------------------------------------------------------- */
function selectDifficultyUI() {
  document.querySelectorAll(".diff-btn").forEach((b) =>
    b.classList.toggle("selected", b.dataset.diff === difficulty));
}
function selectModeUI() {
  document.querySelectorAll(".mode-btn").forEach((b) =>
    b.classList.toggle("selected", b.dataset.mode === gameMode));
  const badge = document.getElementById("menu-mode");
  if (badge) badge.textContent = gameMode === "dash" ? "🔺 Cube Dash" : "🧗 Obby";
}
function updateConsentStatus() {
  const el = document.getElementById("consent-status");
  el.textContent = Storage.hasConsent()
    ? "✓ Dein Fortschritt wird in diesem Browser gespeichert."
    : "ⓘ Fortschritt wird nicht gespeichert (Cookies abgelehnt).";
}

/* ---------------------------------------------------------------------
   Responsive: Canvas an Fenstergröße anpassen (Seitenverhältnis bleibt)
   ------------------------------------------------------------------- */
function resize() {
  // Tatsächlich sichtbaren Bereich messen (Mobil-Safari: Toolbars zählen bei
  // 100vh fälschlich mit -> Spiel wurde unten abgeschnitten).
  const vv = window.visualViewport;
  const availW = Math.round(vv ? vv.width : window.innerWidth);
  const availH = Math.round(vv ? vv.height : window.innerHeight);
  elApp.style.width = availW + "px";
  elApp.style.height = availH + "px";
  const scale = Math.min(availW / W, availH / H);
  canvas.style.width = Math.floor(W * scale) + "px";
  canvas.style.height = Math.floor(H * scale) + "px";
}
window.addEventListener("resize", resize);
window.addEventListener("orientationchange", () => { resize(); setTimeout(resize, 300); });
if (window.visualViewport) window.visualViewport.addEventListener("resize", resize);

/* ---------------------------------------------------------------------
   Eingaben
   ------------------------------------------------------------------- */
const keyMap = {
  ArrowLeft: "left", KeyA: "left",
  ArrowRight: "right", KeyD: "right",
  Space: "jump", ArrowUp: "jump", KeyW: "jump",
};
window.addEventListener("keydown", (e) => {
  if (keyMap[e.code]) { keys[keyMap[e.code]] = true; e.preventDefault(); }
});
window.addEventListener("keyup", (e) => {
  if (keyMap[e.code]) { keys[keyMap[e.code]] = false; e.preventDefault(); }
});

// Touch-Buttons (◀ ▶ SPRUNG)
document.querySelectorAll(".tbtn").forEach((btn) => {
  const k = btn.dataset.key;
  const on = (e) => { e.preventDefault(); keys[k] = true; };
  const off = (e) => { e.preventDefault(); keys[k] = false; };
  btn.addEventListener("touchstart", on, { passive: false });
  btn.addEventListener("touchend", off, { passive: false });
  btn.addEventListener("mousedown", on);
  btn.addEventListener("mouseup", off);
});

// Tippen auf die rechte Bildhälfte = springen
const jumpTouches = new Set();
canvas.addEventListener("touchstart", (e) => {
  if (appState !== "playing") return;
  e.preventDefault();
  const r = canvas.getBoundingClientRect();
  for (const t of e.changedTouches) {
    if (gameMode === "dash") { jumpTouches.add(t.identifier); keys.jump = true; continue; }
    const cx = (t.clientX - r.left) * (W / r.width);
    if (cx > W / 2) { jumpTouches.add(t.identifier); keys.jump = true; }
  }
}, { passive: false });
function endCanvasTouch(e) {
  for (const t of e.changedTouches) jumpTouches.delete(t.identifier);
  if (jumpTouches.size === 0) keys.jump = false;
}
canvas.addEventListener("touchend", endCanvasTouch, { passive: false });
canvas.addEventListener("touchcancel", endCanvasTouch, { passive: false });

/* ---------------------------------------------------------------------
   DOM-Buttons verdrahten
   ------------------------------------------------------------------- */
function syncFromProfile() {
  difficulty = profile.difficulty || "medium";
  gameMode = profile.gameMode || "obby";
  selectDifficultyUI(); selectModeUI(); updateConsentStatus();
}
document.getElementById("consent-accept").onclick = () => {
  Storage.grantConsent();
  profile = Storage.loadProfile();
  syncFromProfile();
  showState("mode");
};
document.getElementById("consent-decline").onclick = () => {
  Storage.declineConsent();
  profile = Storage.defaultProfile();
  syncFromProfile();
  showState("mode");
};
document.querySelectorAll(".mode-btn").forEach((b) => {
  b.onclick = () => {
    gameMode = b.dataset.mode;
    profile.gameMode = gameMode;
    Storage.saveProfile(profile);
    selectModeUI();
    showState("menu");
  };
});
document.querySelectorAll(".diff-btn").forEach((b) => {
  b.onclick = () => {
    difficulty = b.dataset.diff;
    profile.difficulty = difficulty;
    Storage.saveProfile(profile);
    selectDifficultyUI();
  };
});
document.getElementById("menu-back").onclick = () => { selectModeUI(); showState("mode"); };
document.getElementById("goto-map").onclick = () => { renderMap(); showState("map"); };
document.getElementById("map-back").onclick = () => { selectDifficultyUI(); selectModeUI(); showState("menu"); };
document.getElementById("lc-again").onclick = () => startSession(session.mode, session.topic);
document.getElementById("lc-map").onclick = () => { renderMap(); showState("map"); };
elBack.onclick = () => { renderMap(); showState("map"); };

/* ---------------------------------------------------------------------
   Start
   ------------------------------------------------------------------- */
function loop() { update(); draw(); requestAnimationFrame(loop); }

function init() {
  resize();
  if (Storage.consentAnswered()) {
    profile = Storage.loadProfile();
    syncFromProfile();
    showState("mode");
  } else {
    profile = Storage.defaultProfile();
    showState("consent");
  }
  loop();
}
init();
