/* =====================================================================
   i18n – Sprach-Paket-Registry (DE/EN …)
   Jedes questions*.js registriert sich hier mit einem Sprachcode.
   game.js holt sich das aktive Paket über setLanguage().
   ===================================================================== */
window.LANG_PACKS = window.LANG_PACKS || {};
window.registerLangPack = function (code, pack) {
  // IDs vergeben (falls nicht vorhanden) – gleiches Schema wie questions.js
  pack.QUESTIONS.forEach((q) => {
    if (!q.id) q.id = q.topic + "::" + q.q + "::" + q.options.join("|");
  });
  window.LANG_PACKS[code] = pack;
};
