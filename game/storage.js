// Speicherung von Zustimmung, Fortschritt und Lernprofil in Cookies.
// Es wird NUR gespeichert, wenn der Spieler dem Cookie-Banner zugestimmt hat.

const Storage = (function () {
  const CONSENT_KEY = "dt_consent";
  const PROFILE_KEY = "dt_profile";
  const ONE_YEAR = 365;

  function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie =
      name + "=" + encodeURIComponent(value) +
      ";expires=" + d.toUTCString() + ";path=/;SameSite=Lax";
  }
  function getCookie(name) {
    const m = document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)");
    return m ? decodeURIComponent(m.pop()) : null;
  }
  function deleteCookie(name) {
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
  }

  function hasConsent() {
    return getCookie(CONSENT_KEY) === "yes";
  }
  function grantConsent() {
    setCookie(CONSENT_KEY, "yes", ONE_YEAR);
  }
  function declineConsent() {
    // Ablehnung merken, damit das Banner nicht jedes Mal kommt; nichts weiter speichern
    setCookie(CONSENT_KEY, "no", ONE_YEAR);
    deleteCookie(PROFILE_KEY);
  }
  function consentAnswered() {
    return getCookie(CONSENT_KEY) !== null;
  }

  function defaultProfile() {
    return {
      difficulty: "medium",
      device: null,    // pc | tablet | phone
      lang: "de",      // de | en (Sprach-Paket)
      gameMode: "obby",
      muted: false,
      topics: {},      // topic -> { correct, wrong }
      due: {},         // questionId -> true (noch nicht richtig gelöst)
      completed: {},   // topic -> true (alle 10 Level geschafft)
      stars: {},       // topic -> { levelNr: true } (gesammelte Sterne, 10 pro Thema)
      nine: {},        // topic -> true (Bonus-Level 11 „NINE“ gemeistert)
    };
  }

  function loadProfile() {
    if (hasConsent()) {
      const raw = getCookie(PROFILE_KEY);
      if (raw) {
        try {
          const p = JSON.parse(raw);
          return Object.assign(defaultProfile(), p);
        } catch (e) { /* kaputt -> neu */ }
      }
    }
    return defaultProfile();
  }

  function saveProfile(profile) {
    if (!hasConsent()) return; // ohne Zustimmung wird nichts gespeichert
    try {
      setCookie(PROFILE_KEY, JSON.stringify(profile), ONE_YEAR);
    } catch (e) { /* ignorieren */ }
  }

  // Ein Antwortergebnis ins Profil eintragen
  function recordAnswer(profile, question, correct) {
    const t = profile.topics[question.topic] || (profile.topics[question.topic] = { correct: 0, wrong: 0 });
    if (correct) {
      t.correct++;
      delete profile.due[question.id];      // gelöst -> nicht mehr fällig
    } else {
      t.wrong++;
      profile.due[question.id] = true;       // erneut üben
    }
  }

  return {
    hasConsent, grantConsent, declineConsent, consentAnswered,
    defaultProfile, loadProfile, saveProfile, recordAnswer,
  };
})();
