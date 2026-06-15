/* =====================================================================
   vocab_store.js – persistiert EIGENE Vokabeln LOKAL im Browser (localStorage)
   Läuft VOR questions_en.js und setzt window.CUSTOM_VOCAB, damit der Modus
   „Mein Wortschatz" deine Wörter bei JEDEM Laden hat – ohne erneutes Importieren.

   - Speicherort: localStorage (Schlüssel dt_custom_vocab) – bleibt NUR auf
     diesem Gerät, wird nie an einen Server gesendet oder ins Repo committet.
   - Cookies wären zu klein (~4 KB) für hunderte Vokabeln → localStorage.
   - Speichern nur bei erteilter Cookie-/Speicher-Zustimmung (wie beim Profil).
   ===================================================================== */
(function () {
  var KEY = "dt_custom_vocab";
  var SEP = /\t|\s=\s|\s[-–—]\s|;/;

  function consent() { return /(^|;)\s*dt_consent\s*=\s*yes/.test(document.cookie); }

  function splitPair(line) {
    var m = SEP.exec(line);
    if (!m) return null;
    var en = line.slice(0, m.index).trim();
    var de = line.slice(m.index + m[0].length).trim();
    return (en && de) ? [en, de] : null;
  }
  function parseText(text) {
    var pairs = [];
    String(text || "").split(/\r?\n/).forEach(function (raw) {
      var line = raw.trim();
      if (!line || line.charAt(0) === "#") return;
      var p = splitPair(line);
      if (p) pairs.push(p);
    });
    return pairs;
  }
  function load() {
    try { var s = localStorage.getItem(KEY); return s ? JSON.parse(s) : null; }
    catch (e) { return null; }
  }
  function save(pairs) {
    if (!consent()) return false;
    try { localStorage.setItem(KEY, JSON.stringify(pairs)); return true; }
    catch (e) { return false; }
  }

  // 1) Gespeicherte Vokabeln haben Vorrang vor der optionalen Datei.
  var stored = load();
  if (stored && stored.length) {
    window.CUSTOM_VOCAB = stored;
  } else if (window.CUSTOM_VOCAB && window.CUSTOM_VOCAB.length) {
    // Datei-Vokabeln (vocab_custom.js) einmalig in localStorage spiegeln.
    save(window.CUSTOM_VOCAB);
  }

  // 2) API für die In-App-Verwaltung (siehe game.js / Overlay).
  window.VocabStore = {
    hasConsent: consent,
    count: function () { return (window.CUSTOM_VOCAB || []).length; },
    asText: function () {
      return (window.CUSTOM_VOCAB || []).map(function (p) { return p[0] + " = " + p[1]; }).join("\n");
    },
    saveText: function (text) {
      var pairs = parseText(text);
      if (!pairs.length) return { ok: false, count: 0, saved: false };
      window.CUSTOM_VOCAB = pairs;
      var saved = save(pairs);
      return { ok: true, count: pairs.length, saved: saved };
    },
    clear: function () { try { localStorage.removeItem(KEY); } catch (e) {} },
  };
})();
