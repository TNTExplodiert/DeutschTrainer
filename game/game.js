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
const elMute = document.getElementById("btn-mute");
const overlays = {
  consent: document.getElementById("overlay-consent"),
  device: document.getElementById("overlay-device"),
  mode: document.getElementById("overlay-mode"),
  menu: document.getElementById("overlay-menu"),
  map: document.getElementById("overlay-map"),
  levels: document.getElementById("overlay-levels"),
  stats: document.getElementById("overlay-stats"),
  levelcomplete: document.getElementById("overlay-levelcomplete"),
};
const mapGrid = document.getElementById("map-grid");
const mapDiff = document.getElementById("map-diff");
const levelsGrid = document.getElementById("levels-grid");

const LEVELS_PER_TOPIC = 10;
const KIND_RANK = { mc: 0, recognize: 1, comma: 1, transform: 2 };

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
let appState = "consent";           // consent | device | mode | menu | map | playing | levelcomplete
let deviceClass = "tablet";         // pc | tablet | phone
let gameMode = "obby";              // obby | dash  (Cube Dash = Geometry-Dash-Stil)
let difficulty = "medium";
let profile = Storage.defaultProfile();
let session = null;                 // aktuelles Level
let stage = null;                   // aktuelle Plattform-Anordnung (Obby)
let feedback = null;
let animTime = 0;
let obbyDead = false, obbyExplain = "", obbyNeedRelease = false, obbyDeadT = 0;  // Crash-Pause im Obby

// ---- Cube Dash (Geometry-Dash-Modus) ----
let dash = null;
const DASH = {
  CX: 170, GROUND_Y: 430, BAR_Y: 300, BAR_H: 16, CUBE: 34,
  GRAV: 0.9, JUMP: -16.5,
  // lange Anlaufstrecke (BAR_START) -> genug Zeit, die Frage zu lesen, bevor man springt
  SEG_LEN: 1080, BAR_START: 680, BAR_END: 980, JUDGE: 940, FINISH_PAD: 360,
};
const DASH_SPEED = { easy: 4.2, medium: 5.4, hard: 6.8 };

// ---- Wave (Geometry-Dash-Wave-Modus) ----
let wave = null;
const WAVE = { CX: 170, TOP: 74, BOT: 516, SZ: 20, APPROACH: 1500, TUNNEL: 900, PAD: 360, WALL: 34 };
const WAVE_SPEED = { easy: 3.6, medium: 4.6, hard: 5.8 };
const WAVE_SEC = WAVE.APPROACH + WAVE.TUNNEL;

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
  // Touch-Steuerung nur im Spiel und nicht am PC
  elTouch.classList.toggle("hidden", !(deviceClass !== "pc" && name === "playing"));
  elBack.classList.toggle("hidden", name !== "playing");
  if (window.GameAudio && name !== "playing") window.GameAudio.stop();
}

// Standard-Gerät anhand des aktuellen Geräts vorschlagen
function detectDevice() {
  if (!isTouch) return "pc";
  const minDim = Math.min(window.screen ? window.screen.width : 9999,
                          window.screen ? window.screen.height : 9999);
  return minDim >= 700 ? "tablet" : "phone";
}
function applyDevice() {
  document.body.classList.remove("device-pc", "device-tablet", "device-phone");
  document.body.classList.add("device-" + deviceClass);
  document.querySelectorAll(".dev-btn").forEach((b) =>
    b.classList.toggle("selected", b.dataset.device === deviceClass));
  const badge = document.getElementById("mode-dev");
  if (badge) badge.textContent = { pc: "💻 PC", tablet: "📲 Tablet", phone: "📱 Handy" }[deviceClass] || "";
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
function starCount(topic) { return Object.keys(profile.stars[topic] || {}).length; }
function topicStatus(topic) {
  const stars = starCount(topic);
  const due = dueCountForTopic(topic);
  let cls = "";
  if (stars >= LEVELS_PER_TOPIC) cls = "mastered";
  else if (due > 0) cls = "weak";
  return { cls, label: "⭐ " + stars + "/" + LEVELS_PER_TOPIC + (due > 0 ? "  ⚠️" + due : "") };
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
// Fragen eines Themas nach Schwierigkeit sortieren (mc < erkennen < umformen)
function sortedTopicPool(topic) {
  return questionsByTopic(topic).slice().sort((a, b) =>
    (KIND_RANK[a.kind] || 0) - (KIND_RANK[b.kind] || 0));
}
// Level k (1..10): ein fester, nach hinten kniffligerer Ausschnitt der Fragen
function buildLevelQueue(topic, level) {
  const pool = sortedTopicPool(topic);
  const n = pool.length;
  const size = Math.max(4, Math.min(8, Math.round(n / LEVELS_PER_TOPIC)));
  const start = Math.floor((level - 1) * n / LEVELS_PER_TOPIC);
  const q = [];
  for (let i = 0; i < size && i < n; i++) q.push(pool[(start + i) % n]);
  return shuffle(q);
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

function startSession(mode, topic, level) {
  const queue = mode === "topic" ? buildLevelQueue(topic, level) : buildAdaptiveQueue();
  session = {
    mode, topic, level: level || null,
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
  } else if (gameMode === "wave") {
    startWave(queue);
  } else {
    applyDifficulty(difficulty);
    buildStage(session.queue[0]);
  }
  if (window.GameAudio) window.GameAudio.play(gameMode === "obby" ? "mario" : "techno");
}

// Touch-Steuerung je nach Modus: in Dash/Wave nur eine Taste (Laufpfeile aus)
function configureTouch() {
  const left = document.querySelector(".touch-left");
  const jump = document.querySelector(".tbtn.jump");
  if (left) left.style.display = gameMode === "obby" ? "flex" : "none";
  if (jump) jump.textContent = gameMode === "wave" ? "⤒ STEIGEN" : (gameMode === "dash" ? "⤒ SPRINGEN" : "⤒ SPRUNG");
}

/* ---------------------------------------------------------------------
   Stage (eine Frage) aufbauen
   ------------------------------------------------------------------- */
function buildStage(question) {
  // Antwortoptionen mischen, damit die richtige Plattform nicht immer gleich liegt
  const opts = shuffle(question.options.map((label, i) => ({ label, correct: i === question.correct })));
  const n = opts.length;
  const isLong = question.kind === "transform";   // lange Antworten -> breitere Plattformen

  const checkpoint = { x: 40, y: PLATFORM_Y, w: 170, h: 40, type: "ground" };
  const exit = isLong
    ? { x: 730, y: PLATFORM_Y, w: 200, h: 40, type: "exit" }
    : { x: 560, y: PLATFORM_Y, w: 360, h: 40, type: "exit" };

  const zoneStart = isLong ? 240 : 250;
  const zoneEnd = isLong ? 700 : 500;
  const ph = isLong ? 64 : 36;
  const maxPw = isLong ? 220 : 120;
  const pw = Math.min(maxPw, (zoneEnd - zoneStart - (n - 1) * 30) / n);
  const gap = (zoneEnd - zoneStart - n * pw) / (n - 1 || 1);

  const answers = [];
  for (let i = 0; i < n; i++) {
    answers.push({
      x: zoneStart + i * (pw + gap), y: PLATFORM_Y + 36 - ph, w: pw, h: ph, type: "answer",
      label: opts[i].label, correct: opts[i].correct, state: "idle", breakT: 0,
    });
  }

  stage = {
    q: question, question: question.q, topic: question.topic,
    checkpoint, exit, answers, bridge: null, solved: false,
  };

  player.spawnX = checkpoint.x + checkpoint.w / 2 - player.w / 2;
  player.spawnY = checkpoint.y - player.h;
  obbyDead = false; obbyNeedRelease = false;
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
  if (gameMode === "wave") { updateWave(); return; }
  if (!stage) return;

  // Nach falscher Antwort: Pause mit Erklärung – weiter erst per Sprung/Klick
  if (obbyDead) {
    obbyDeadT++;
    player.vy += GRAVITY; player.y += player.vy;
    if (player.y > LAVA_Y) { player.y = LAVA_Y; player.vy = 0; }
    if (!keys.jump) obbyNeedRelease = false;                 // erst loslassen …
    if (obbyDeadT > 18 && !obbyNeedRelease && keys.jump) buildStage(session.queue[0]);  // … dann weiter
    return;
  }

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
    obbyDead = true; obbyNeedRelease = true; obbyDeadT = 0; obbyExplain = stage.q.explain || "";
    if (window.GameAudio) window.GameAudio.sfx("fail");
  }
}

function advanceAfterExit() {
  if (session.queue.length === 0) finishLevel();
  else buildStage(session.queue[0]);
}

function completeLevel(statsHTML) {
  // Stern vergeben (nur im Themen-/Level-Modus)
  if (session.mode === "topic" && session.level) {
    profile.stars[session.topic] = profile.stars[session.topic] || {};
    profile.stars[session.topic][session.level] = true;
    if (starCount(session.topic) >= LEVELS_PER_TOPIC) profile.completed[session.topic] = true;
  }
  Storage.saveProfile(profile);

  const tn = TOPIC_INFO[session.topic] ? TOPIC_INFO[session.topic].name : session.topic;
  document.getElementById("lc-title").textContent = session.mode === "topic"
    ? "🏆 " + tn + " · Level " + session.level + " ⭐"
    : "🏆 Übungs-Mix geschafft!";
  document.getElementById("lc-stats").innerHTML = statsHTML;
  document.getElementById("lc-next").classList.toggle(
    "hidden", !(session.mode === "topic" && session.level < LEVELS_PER_TOPIC));
  showState("levelcomplete");
}

function finishLevel() {
  const html = "Richtig beim 1. Versuch: <b>" + session.correctFirstTry + " von " + session.total + "</b><br>" +
    "Versuche gesamt: <b>" + session.attempts + "</b>";
  stage = null;
  completeLevel(html);
}

function showFeedback(text, color, explain) { feedback = { text, color, t: explain ? 150 : 90, explain: explain || "" }; }

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
      long: q.kind === "transform",
      judged: false,
    };
  });
  dash = {
    gates,
    speed: DASH_SPEED[difficulty] || 5.4,
    worldX: 0,
    attempt: 1,
    cube: { y: DASH.GROUND_Y - DASH.CUBE, vy: 0, onGround: true, rot: 0 },
    dead: false, deadT: 0, lastExplain: "",
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
    if (!keys.jump) dash.needRelease = false;            // erst loslassen …
    if (dash.deadT > 12 && !dash.needRelease && keys.jump) restartDash();   // … dann neu starten
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
      if (!correct) { dash.lastExplain = g.q.explain || ""; dashDie(); return; }
    }
  }

  if (dash.worldX >= dash.finishX) { dashFinish(); }
}

function dashDie() {
  dash.dead = true; dash.deadT = 0; dash.needRelease = true;
  if (window.GameAudio) window.GameAudio.sfx("crash");
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
  dash.dead = false; dash.deadT = 0; dash.lastExplain = "";
  dash.worldX = 0; dash.attempt++;
  if (window.GameAudio) window.GameAudio.restart();
  for (const g of dash.gates) g.judged = false;
  dash.cube.y = DASH.GROUND_Y - DASH.CUBE;
  dash.cube.vy = 0; dash.cube.onGround = true; dash.cube.rot = 0;
  dash.particles = [];
}

function dashFinish() {
  const html = "Versuche: <b>" + dash.attempt + "</b> · Tore: <b>" + dash.gates.length + "</b>";
  dash = null;
  completeLevel(html);
}

/* =====================================================================
   WAVE (Geometry-Dash-Wave-Modus)
   Raumschiff sinkt diagonal; Taste halten -> steigt diagonal.
   Pro Frage N Tunnel (= Antworten). Falsche enden in einer Wand -> Crash.
   Tunnel-Reihenfolge wird bei JEDEM Versuch neu gemischt.
   ===================================================================== */
function startWave(questions) {
  const n = Math.min(5, questions.length);
  wave = {
    questions: questions.slice(0, n),
    speed: WAVE_SPEED[difficulty] || 4.6,
    worldX: 0, attempt: 1,
    ship: { y: (WAVE.TOP + WAVE.BOT) / 2 - WAVE.SZ / 2 },
    dead: false, deadT: 0, lastExplain: "",
    layouts: [], particles: [], trail: [],
    finishX: n * WAVE_SEC + WAVE.PAD,
  };
  waveBuildLayouts();
}

// Tunnel-Zuordnung (Band -> Antwort) zufällig – bei jedem Versuch neu
function waveBuildLayouts() {
  wave.layouts = wave.questions.map((q) => {
    const order = shuffle(q.options.map((_, i) => i)); // Band b zeigt Antwort order[b]
    return {
      n: q.options.length,
      labels: order.map((i) => q.options[i]),
      correctBand: order.indexOf(q.correct),
      judged: false,
    };
  });
}

function updateWave() {
  if (!wave) return;
  const s = wave.ship;
  if (wave.dead) {
    wave.deadT++;
    for (const p of wave.particles) { p.x += p.vx; p.y += p.vy; p.vy += 0.5; p.life--; }
    if (!keys.jump) wave.needRelease = false;            // erst loslassen …
    if (wave.deadT > 12 && !wave.needRelease && keys.jump) restartWave();   // … dann neu starten
    return;
  }

  const vy = wave.speed * 0.85;
  s.y += keys.jump ? -vy : vy;
  wave.worldX += wave.speed;
  wave.trail.push({ wx: wave.worldX, y: s.y + WAVE.SZ / 2 });
  if (wave.trail.length > 70) wave.trail.shift();

  const sec = Math.floor(wave.worldX / WAVE_SEC);
  const lay = sec < wave.layouts.length ? wave.layouts[sec] : null;
  const tunnelStart = sec * WAVE_SEC + WAVE.APPROACH;
  const tunnelEnd = tunnelStart + WAVE.TUNNEL;
  const inTunnel = lay && wave.worldX >= tunnelStart && wave.worldX <= tunnelEnd;
  const curExplain = () => (lay ? (wave.questions[sec].explain || "") : "");

  // Decke/Boden = Crash (im Tunnel mit Erklärung)
  if (s.y < WAVE.TOP || s.y + WAVE.SZ > WAVE.BOT) {
    wave.lastExplain = inTunnel ? curExplain() : "";
    waveDie(); return;
  }

  if (lay) {
    const laneH = (WAVE.BOT - WAVE.TOP) / lay.n;

    // Im Tunnel: Trennwände (Crash beim Überqueren) -> Erklärung anzeigen
    if (inTunnel) {
      for (let k = 1; k < lay.n; k++) {
        const yk = WAVE.TOP + k * laneH;
        if (s.y < yk && s.y + WAVE.SZ > yk) { wave.lastExplain = curExplain(); waveDie(); return; }
      }
    }

    // An der Wand (kurz vor Tunnelende): falsches Band -> Crash mit Erklärung
    if (wave.worldX >= tunnelEnd - WAVE.WALL && !lay.judged) {
      lay.judged = true;
      const band = Math.max(0, Math.min(lay.n - 1, Math.floor(((s.y + WAVE.SZ / 2) - WAVE.TOP) / laneH)));
      const correct = (band === lay.correctBand);
      Storage.recordAnswer(profile, wave.questions[sec], correct);
      Storage.saveProfile(profile);
      if (!correct) { wave.lastExplain = curExplain(); waveDie(); return; }
    }
  }

  if (wave.worldX >= wave.finishX) { waveFinish(); }
}

function waveDie() {
  wave.dead = true; wave.deadT = 0; wave.needRelease = true;
  if (window.GameAudio) window.GameAudio.sfx("crash");
  const s = wave.ship;
  wave.particles = [];
  for (let i = 0; i < 16; i++) {
    wave.particles.push({
      x: WAVE.CX + WAVE.SZ / 2, y: s.y + WAVE.SZ / 2,
      vx: (Math.random() - 0.5) * 11, vy: (Math.random() - 0.7) * 11, life: 30 + Math.random() * 12,
    });
  }
}

function restartWave() {
  wave.dead = false; wave.deadT = 0; wave.lastExplain = "";
  wave.worldX = 0; wave.attempt++;
  if (window.GameAudio) window.GameAudio.restart();
  wave.ship.y = (WAVE.TOP + WAVE.BOT) / 2 - WAVE.SZ / 2;
  wave.particles = []; wave.trail = [];
  waveBuildLayouts();   // Reihenfolge neu mischen!
}

function waveFinish() {
  const html = "Versuche: <b>" + wave.attempt + "</b> · Tunnel: <b>" + wave.questions.length + "</b>";
  wave = null;
  completeLevel(html);
}

/* ---- Wave zeichnen ---- */
function drawWave() {
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, "#1a0b3a"); g.addColorStop(1, "#2d0b5a");
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);

  // Decke / Boden
  ctx.fillStyle = "#0c0720";
  ctx.fillRect(0, 0, W, WAVE.TOP); ctx.fillRect(0, WAVE.BOT, W, H - WAVE.BOT);
  ctx.fillStyle = "#19e0ff";
  ctx.fillRect(0, WAVE.TOP - 3, W, 3); ctx.fillRect(0, WAVE.BOT, W, 3);

  const sec0 = Math.floor(wave.worldX / WAVE_SEC);
  for (let sec = Math.max(0, sec0 - 1); sec <= sec0 + 1 && sec < wave.layouts.length; sec++) drawWaveSection(sec);

  // Ziellinie
  const fx = WAVE.CX + (wave.finishX - wave.worldX);
  if (fx < W + 40) { ctx.fillStyle = "#7CFC00"; ctx.fillRect(fx, WAVE.TOP, 10, WAVE.BOT - WAVE.TOP); }

  drawWaveTrail();
  if (wave.dead) {
    ctx.fillStyle = "#ffe14d";
    for (const p of wave.particles) if (p.life > 0) ctx.fillRect(p.x - 4, p.y - 4, 8, 8);
  } else {
    drawShip();
  }
  drawWaveHud();
}

function drawWaveSection(sec) {
  const lay = wave.layouts[sec];
  const secStart = sec * WAVE_SEC;
  const tunnelStart = secStart + WAVE.APPROACH;
  const tunnelEnd = tunnelStart + WAVE.TUNNEL;
  const laneH = (WAVE.BOT - WAVE.TOP) / lay.n;
  const sx0 = WAVE.CX + (tunnelStart - wave.worldX);
  const sx1 = WAVE.CX + (tunnelEnd - wave.worldX);

  // Trennwände
  ctx.fillStyle = "#19e0ff";
  for (let k = 1; k < lay.n; k++) {
    const yk = WAVE.TOP + k * laneH;
    const a = Math.max(0, sx0), b = Math.min(W, sx1);
    if (b > a) ctx.fillRect(a, yk - 3, b - a, 6);
  }
  // Endwände der FALSCHEN Bänder – genau dort, wo der Crash passiert (Tunnelende)
  const wfx0 = WAVE.CX + (tunnelEnd - WAVE.WALL - wave.worldX);
  const wfx1 = WAVE.CX + (tunnelEnd - wave.worldX);
  for (let band = 0; band < lay.n; band++) {
    if (band === lay.correctBand) continue;
    if (wfx1 > 0 && wfx0 < W) {
      ctx.fillStyle = "#ff3b6b";
      ctx.fillRect(wfx0, WAVE.TOP + band * laneH + 4, Math.max(6, wfx1 - wfx0), laneH - 8);
    }
  }
  // Antwort-Labels „fliegen mit“ bis zum Tunneleingang (an den Bändern ausgerichtet).
  // Nur für die aktuelle Sektion, damit sich nichts überlagert.
  const curSec = Math.floor(wave.worldX / WAVE_SEC);
  if (sec === curSec) {
    const lx = Math.min(sx0 - 30, 560);   // geparkt bei x=560, am Ende mit dem Eingang nach links
    if (sx0 > WAVE.CX - 10 && lx > -40) {
      for (let band = 0; band < lay.n; band++) {
        const yc = WAVE.TOP + band * laneH + laneH / 2;
        const w = laneH > 90 ? 360 : 250;
        ctx.fillStyle = "rgba(10,8,30,0.85)";
        dashRoundRect(lx - w / 2, yc - Math.min(24, laneH / 2 - 3), w, Math.min(48, laneH - 6), 8); ctx.fill();
        ctx.fillStyle = "#fff"; ctx.textAlign = "center";
        drawWrapped(lay.labels[band], lx, yc + 4, w - 16, Math.min(42, laneH - 12), 17);
        ctx.textAlign = "left";
      }
    }
  }
}

function drawWaveTrail() {
  if (!wave.trail || wave.trail.length < 2) return;
  ctx.lineJoin = "round"; ctx.lineCap = "round";
  ctx.beginPath();
  for (let i = 0; i < wave.trail.length; i++) {
    const p = wave.trail[i];
    const x = WAVE.CX + WAVE.SZ / 2 + (p.wx - wave.worldX);  // mittig hinter dem Schiff
    if (i === 0) ctx.moveTo(x, p.y); else ctx.lineTo(x, p.y);
  }
  ctx.strokeStyle = "rgba(255,225,77,0.45)"; ctx.lineWidth = 7; ctx.stroke();
  ctx.strokeStyle = "#ffe14d"; ctx.lineWidth = 2.5; ctx.stroke();
}

function drawShip() {
  const s = wave.ship, x = WAVE.CX, y = s.y, z = WAVE.SZ, up = keys.jump;
  ctx.save();
  ctx.translate(x + z / 2, y + z / 2);
  ctx.rotate(up ? -0.5 : 0.5);
  ctx.fillStyle = "#ffe14d"; ctx.strokeStyle = "#fff"; ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(z / 2, 0); ctx.lineTo(-z / 2, -z / 2); ctx.lineTo(-z / 4, 0); ctx.lineTo(-z / 2, z / 2);
  ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.restore();
}

function drawWaveHud() {
  // alles im Deckenbereich (0..WAVE.TOP), damit das Schiff frei bleibt
  const pct = Math.max(0, Math.min(1, wave.worldX / wave.finishX));
  const bx = 150, by = 10, bw = W - 320;
  ctx.fillStyle = "rgba(255,255,255,0.22)"; dashRoundRect(bx, by, bw, 12, 6); ctx.fill();
  if (pct > 0) { ctx.fillStyle = "#19e0ff"; dashRoundRect(bx, by, bw * pct, 12, 6); ctx.fill(); }
  ctx.strokeStyle = "#fff"; ctx.lineWidth = 2; dashRoundRect(bx, by, bw, 12, 6); ctx.stroke();
  ctx.fillStyle = "#fff"; ctx.font = "bold 13px Trebuchet MS"; ctx.textAlign = "left";
  ctx.fillText(Math.round(pct * 100) + "%", bx + bw + 10, by + 11);
  ctx.fillText("VERSUCH " + wave.attempt, 12, by + 11);

  if (wave.dead) {
    roundBlock(W / 2 - 340, 150, 680, 96, "rgba(8,6,30,0.95)");
    ctx.textAlign = "center";
    ctx.fillStyle = "#ff8a80"; ctx.font = "bold 22px Trebuchet MS";
    ctx.fillText(wave.lastExplain ? "Falsch!" : "Crash!", W / 2, 178);
    if (wave.lastExplain) { ctx.fillStyle = "#ffe08a"; drawWrapped("💡 " + wave.lastExplain, W / 2, 206, 640, 38, 16); }
    ctx.fillStyle = "#9fd0ff"; ctx.font = "bold 15px Trebuchet MS";
    ctx.fillText("▶ Steigen / Klick / Taste „r“ zum Neustart", W / 2, 236);
    ctx.textAlign = "left";
    return;
  }
  const sec = Math.floor(wave.worldX / WAVE_SEC);
  const q = wave.questions[Math.min(sec, wave.questions.length - 1)];
  if (q) {
    ctx.fillStyle = "#fff"; ctx.textAlign = "center";
    drawWrapped(q.q, W / 2, 52, W - 40, 34, 18);
    ctx.textAlign = "left";
  }
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
  // Kurze Antwort-Labels direkt am Balken (lange Antworten zeigt das HUD als Banner)
  if (!g.long) {
    ctx.textAlign = "center";
    ctx.font = "bold 22px Trebuchet MS";
    const cx = (sx0 + sx1) / 2;
    dashLabel(g.top, cx, DASH.BAR_Y - 22);
    dashLabel(g.bottom, cx, DASH.GROUND_Y - 16);
    ctx.textAlign = "left";
  }
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

  // Crash: Erklärung anzeigen
  if (dash.dead) {
    roundBlock(W / 2 - 340, 138, 680, 96, "rgba(8,16,40,0.95)");
    ctx.textAlign = "center";
    ctx.fillStyle = "#ff8a80"; ctx.font = "bold 22px Trebuchet MS";
    ctx.fillText(dash.lastExplain ? "Falsch!" : "Crash!", W / 2, 166);
    if (dash.lastExplain) { ctx.fillStyle = "#ffe08a"; drawWrapped("💡 " + dash.lastExplain, W / 2, 194, 640, 38, 16); }
    ctx.fillStyle = "#9fd0ff"; ctx.font = "bold 15px Trebuchet MS";
    ctx.fillText("▶ Springen / Klick / Taste „r“ zum Neustart", W / 2, 224);
    ctx.textAlign = "left";
    return;
  }

  const next = dash.gates.find((g) => !g.judged);
  if (next) {
    roundBlock(W / 2 - 360, 86, 720, 50, "rgba(8,30,90,0.72)");
    ctx.fillStyle = "#fff"; ctx.textAlign = "center";
    drawWrapped(next.q.q, W / 2, 111, 690, 40, 20);
    ctx.textAlign = "left";
    if (next.long) {
      dashOptionBanner("⬆ SPRINGEN", next.top, 168);
      dashOptionBanner("⬇ UNTEN BLEIBEN", next.bottom, 372);
    }
  }
}
function dashOptionBanner(hint, text, yc) {
  roundBlock(W / 2 - 360, yc - 26, 720, 54, "rgba(10,20,45,0.8)");
  ctx.fillStyle = "#9fd0ff"; ctx.textAlign = "center"; ctx.font = "bold 12px Trebuchet MS";
  ctx.fillText(hint, W / 2, yc - 13);
  ctx.fillStyle = "#fff";
  drawWrapped(text, W / 2, yc + 8, 690, 32, 17);
  ctx.textAlign = "left";
}

/* ---------------------------------------------------------------------
   Zeichnen
   ------------------------------------------------------------------- */
function draw() {
  if (appState === "playing" && gameMode === "dash" && dash) { drawDash(); return; }
  if (appState === "playing" && gameMode === "wave" && wave) { drawWave(); return; }
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
    if (obbyDead) {
      roundBlock(W / 2 - 340, 118, 680, 104, "rgba(20,24,36,0.95)");
      ctx.textAlign = "center";
      ctx.fillStyle = "#ff5252"; ctx.font = "bold 26px Trebuchet MS";
      ctx.fillText("Falsch!", W / 2, 150);
      if (obbyExplain) { ctx.fillStyle = "#ffe08a"; drawWrapped("💡 " + obbyExplain, W / 2, 178, 640, 38, 16); }
      ctx.fillStyle = "#9fd0ff"; ctx.font = "bold 15px Trebuchet MS";
      ctx.fillText("▶ Springen / Klick / Taste „r“ zum Weitermachen", W / 2, 210);
      ctx.textAlign = "left";
    } else if (feedback) {
      ctx.font = "bold 30px Trebuchet MS";
      ctx.textAlign = "center";
      ctx.lineWidth = 5; ctx.strokeStyle = "rgba(0,0,0,0.5)";
      ctx.strokeText(feedback.text, W / 2, 128);
      ctx.fillStyle = feedback.color;
      ctx.fillText(feedback.text, W / 2, 128);
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
  drawWrapped(a.label, a.x + a.w / 2, a.y + dy + a.h / 2 + 4, a.w - 12, a.h - 12, 15);
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
// Mehrzeiliger Umbruch (berücksichtigt \n), Schrift schrumpft bis es in maxH passt
function wrapLines(text, maxW) {
  const out = [];
  for (const para of String(text).split("\n")) {
    const words = para.split(" ");
    let cur = "";
    for (const w of words) {
      const test = cur ? cur + " " + w : w;
      if (ctx.measureText(test).width <= maxW || !cur) cur = test;
      else { out.push(cur); cur = w; }
    }
    out.push(cur);
  }
  return out;
}
function drawWrapped(text, cx, cyCenter, maxW, maxH, startSize) {
  let size = startSize || 15, lines = [];
  for (; size >= 9; size--) {
    ctx.font = "bold " + size + "px Trebuchet MS";
    lines = wrapLines(text, maxW);
    if (lines.length * (size + 3) <= maxH) break;
  }
  const lh = size + 3;
  let y = cyCenter - (lines.length - 1) * lh / 2 + size * 0.35;
  for (const l of lines) { ctx.fillText(l, cx, y); y += lh; }
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
  roundBlock(W / 2 - 395, 10, 790, 70, "rgba(20,24,36,0.85)");
  ctx.fillStyle = "#ffd34d"; ctx.font = "bold 12px Trebuchet MS"; ctx.textAlign = "center";
  ctx.fillText("THEMA: " + stage.topic.toUpperCase(), W / 2, 27);
  ctx.fillStyle = "#fff";
  drawWrapped(stage.question, W / 2, 53, 760, 38, 21);
  ctx.textAlign = "left";
  const solved = session.total - session.queue.length;
  const lvl = (session.mode === "topic" && session.level) ? "Level " + session.level + "   " : "";
  ctx.fillStyle = "#1d2230"; ctx.font = "bold 16px Trebuchet MS";
  ctx.fillText(`✅ ${solved}/${session.total}   ✦ Versuche: ${session.attempts}   ${lvl}${DIFF[difficulty].label}`, 14, H - 14);
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
  mapDiff.textContent = (gameMode === "dash" ? "🔺 Cube Dash" : gameMode === "wave" ? "🌊 Wave" : "🧗 Obby") + " · " + DIFF[difficulty].label;

  const due = dueCountTotal();
  const adaptive = makeCard("🎯", "Übungs-Mix",
    due > 0 ? due + " zu wiederholen" : "deine Schwächen", "adaptive");
  adaptive.onclick = () => startSession("adaptive", null, null);
  mapGrid.appendChild(adaptive);

  for (const topic of TOPIC_ORDER) {
    const info = TOPIC_INFO[topic];
    const st = topicStatus(topic);
    const card = makeCard(info.icon, info.name, st.label, st.cls);
    card.onclick = () => openLevels(topic);
    mapGrid.appendChild(card);
  }
}

// Level-Auswahl eines Themas (10 Level)
let currentTopic = null;
function openLevels(topic) {
  currentTopic = topic;
  document.getElementById("levels-title").textContent = TOPIC_INFO[topic].icon + " " + TOPIC_INFO[topic].name;
  document.getElementById("levels-stars").textContent = "⭐ " + starCount(topic) + "/" + LEVELS_PER_TOPIC;
  levelsGrid.innerHTML = "";
  const done = profile.stars[topic] || {};
  for (let k = 1; k <= LEVELS_PER_TOPIC; k++) {
    const got = !!done[k];
    const card = makeCard(got ? "⭐" : "▶️", "Level " + k, got ? "geschafft" : "spielen", got ? "mastered" : "");
    card.onclick = () => startSession("topic", topic, k);
    levelsGrid.appendChild(card);
  }
  showState("levels");
}

// ---- Profil / Statistik ----
function topicStatRow(topic) {
  const t = profile.topics[topic] || { correct: 0, wrong: 0 };
  const ans = t.correct + t.wrong;
  return { topic, stars: starCount(topic), correct: t.correct, wrong: t.wrong,
    ans, acc: ans ? t.correct / ans : null, due: dueCountForTopic(topic) };
}
function renderStats() {
  const rows = TOPIC_ORDER.map(topicStatRow);
  let totalStars = 0, C = 0, Wc = 0;
  rows.forEach((s) => { totalStars += s.stars; C += s.correct; Wc += s.wrong; });
  const ans = C + Wc, accPct = ans ? Math.round(100 * C / ans) : 0;
  const maxStars = TOPIC_ORDER.length * LEVELS_PER_TOPIC;
  document.getElementById("stats-stars").textContent = "⭐ " + totalStars + "/" + maxStars;
  document.getElementById("stats-summary").innerHTML =
    "Beantwortet: <b>" + ans + "</b> · Richtig: <b>" + C + "</b> (" + accPct + "%) · gesammelte Sterne: <b>" + totalStars + "</b>";

  const weak = rows.filter((s) => s.due > 0 || (s.ans > 0 && s.acc < 0.8))
    .sort((a, b) => (a.acc == null ? 1 : a.acc) - (b.acc == null ? 1 : b.acc));
  document.getElementById("stats-weak").innerHTML = weak.length
    ? "🔧 <b>Daran solltest du üben:</b> " + weak.slice(0, 5).map((s) => TOPIC_INFO[s.topic].name).join(", ")
    : (ans ? "🎉 Stark! Aktuell keine deutlichen Schwächen." : "Spiel ein paar Level – dann zeige ich dir hier deine Schwächen.");

  // schwächste zuerst, dann ungeübte, dann gemeisterte
  const score = (s) => (s.stars >= LEVELS_PER_TOPIC ? 3 : (s.ans === 0 ? 1.2 : s.acc));
  rows.sort((a, b) => score(a) - score(b));
  const list = document.getElementById("stats-list");
  list.innerHTML = "";
  for (const s of rows) {
    const info = TOPIC_INFO[s.topic];
    const pct = s.ans ? Math.round(100 * s.acc) : 0;
    const cls = s.stars >= LEVELS_PER_TOPIC ? "mastered" : ((s.due > 0 || (s.ans > 0 && s.acc < 0.8)) ? "weak" : "");
    const bar = s.ans === 0 ? "#555f78" : (s.acc >= 0.9 ? "#4caf50" : s.acc >= 0.7 ? "#ffd34d" : "#ff7043");
    const div = document.createElement("div");
    div.className = "stat-row" + (cls ? " " + cls : "");
    div.innerHTML =
      "<span class='stat-name'>" + info.icon + " " + info.name + "</span>" +
      "<span class='stat-stars'>⭐" + s.stars + "/" + LEVELS_PER_TOPIC + "</span>" +
      "<span class='stat-bar'><span style='width:" + (s.ans ? pct : 0) + "%;background:" + bar + "'></span></span>" +
      "<span class='stat-acc'>" + (s.ans ? pct + "% (" + s.correct + "/" + s.ans + ")" : "—") + (s.due ? " ⚠️" + s.due : "") + "</span>";
    list.appendChild(div);
  }
  showState("stats");
}
function resetProgress() {
  profile.topics = {}; profile.due = {}; profile.completed = {}; profile.stars = {};
  Storage.saveProfile(profile);
}

/* ---------------------------------------------------------------------
   Schwierigkeits-Auswahl im Menü
   ------------------------------------------------------------------- */
function selectDifficultyUI() {
  document.querySelectorAll(".diff-btn").forEach((b) =>
    b.classList.toggle("selected", b.dataset.diff === difficulty));
}
function selectModeUI() {
  document.querySelectorAll(".mode-btn[data-mode]").forEach((b) =>
    b.classList.toggle("selected", b.dataset.mode === gameMode));
  const badge = document.getElementById("menu-mode");
  if (badge) badge.textContent = gameMode === "dash" ? "🔺 Cube Dash" : gameMode === "wave" ? "🌊 Wave" : "🧗 Obby";
}
function updateConsentStatus() {
  const el = document.getElementById("consent-status");
  el.textContent = Storage.hasConsent()
    ? "✓ Dein Fortschritt wird in diesem Browser gespeichert."
    : "ⓘ Fortschritt wird nicht gespeichert (Cookies abgelehnt).";
}
function updateMuteBtn() { if (elMute) elMute.textContent = profile.muted ? "🔇" : "🔊"; }

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
  // "r" = sofortiger Respawn nach einem Crash
  if (e.code === "KeyR" && appState === "playing") {
    if (gameMode === "wave" && wave && wave.dead) restartWave();
    else if (gameMode === "dash" && dash && dash.dead) restartDash();
    else if (gameMode === "obby" && obbyDead && session) buildStage(session.queue[0]);
    e.preventDefault();
  }
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
    if (gameMode === "dash" || gameMode === "wave") { jumpTouches.add(t.identifier); keys.jump = true; continue; }
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

// Maus (PC): Klick/Halten auf dem Spielfeld = Feuer-/Sprungtaste
canvas.addEventListener("mousedown", (e) => {
  if (appState !== "playing") return;
  e.preventDefault();
  keys.jump = true;
});
window.addEventListener("mouseup", () => { keys.jump = false; });

/* ---------------------------------------------------------------------
   DOM-Buttons verdrahten
   ------------------------------------------------------------------- */
function syncFromProfile() {
  difficulty = profile.difficulty || "medium";
  gameMode = profile.gameMode || "obby";
  deviceClass = profile.device || detectDevice();
  applyDevice();
  selectDifficultyUI(); selectModeUI(); updateConsentStatus();
  if (window.GameAudio) window.GameAudio.setMuted(!!profile.muted);
  updateMuteBtn();
}
document.getElementById("consent-accept").onclick = () => {
  Storage.grantConsent();
  profile = Storage.loadProfile();
  syncFromProfile();
  showState("device");
};
document.getElementById("consent-decline").onclick = () => {
  Storage.declineConsent();
  profile = Storage.defaultProfile();
  syncFromProfile();
  showState("device");
};
document.querySelectorAll(".dev-btn").forEach((b) => {
  b.onclick = () => {
    deviceClass = b.dataset.device;
    profile.device = deviceClass;
    Storage.saveProfile(profile);
    applyDevice();
    showState("mode");
  };
});
document.getElementById("mode-back").onclick = () => showState("device");
document.querySelectorAll(".mode-btn:not(.dev-btn)").forEach((b) => {
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
elMute.onclick = () => {
  profile.muted = !profile.muted;
  Storage.saveProfile(profile);
  if (window.GameAudio) window.GameAudio.setMuted(profile.muted);
  updateMuteBtn();
};
document.getElementById("map-stats").onclick = () => renderStats();
document.getElementById("stats-back").onclick = () => { renderMap(); showState("map"); };
document.getElementById("stats-practice").onclick = () => startSession("adaptive", null, null);
document.getElementById("stats-reset").onclick = () => {
  if (typeof confirm === "function" && !confirm("Wirklich den ganzen Fortschritt (Sterne & Statistik) löschen?")) return;
  resetProgress();
  renderStats();
};
document.getElementById("levels-back").onclick = () => { renderMap(); showState("map"); };
document.getElementById("lc-again").onclick = () => startSession(session.mode, session.topic, session.level);
document.getElementById("lc-next").onclick = () => {
  if (session.mode === "topic" && session.level < LEVELS_PER_TOPIC) startSession("topic", session.topic, session.level + 1);
  else if (session.topic) openLevels(session.topic);
  else { renderMap(); showState("map"); };
};
document.getElementById("lc-map").onclick = () => {
  if (session && session.mode === "topic" && session.topic) openLevels(session.topic);
  else { renderMap(); showState("map"); }
};
elBack.onclick = () => {
  if (session && session.mode === "topic" && session.topic) openLevels(session.topic);
  else { renderMap(); showState("map"); }
};

/* ---------------------------------------------------------------------
   Start
   ------------------------------------------------------------------- */
function loop() { update(); draw(); requestAnimationFrame(loop); }

function init() {
  resize();
  if (Storage.consentAnswered()) {
    profile = Storage.loadProfile();
    syncFromProfile();
    showState("device");
  } else {
    profile = Storage.defaultProfile();
    deviceClass = detectDevice();
    applyDevice();
    updateMuteBtn();
    showState("consent");
  }
  loop();
}
init();
