(function () {
  "use strict";

  const STORAGE_KEY = "lang";
  const DEFAULT_LANG = "en";
  const SUPPORTED_LANGS = ["ru", "en"];
  const CACHE_KEY = "i18n_cache_data";
  const CACHE_TIME_KEY = "i18n_cache_time";
  const CACHE_TOKEN_KEY = "i18n_cache_token";
  const TOKEN_URL = "/tech/json/i18n_token.txt";
  const JSON_URL = "/tech/json/i18n.json";

  let translations = {};
  let currentLang = DEFAULT_LANG;
  let loadPromise = null;

  function tryLoadFromCache() {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const data = JSON.parse(cached);
        if (data && typeof data === "object") {
          translations = data;
          return data;
        }
      }
    } catch (e) {
      console.warn("[i18n] Cache read error:", e);
    }
    return null;
  }

  function saveToCache(data, token) {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(data));
      if (token) {
        localStorage.setItem(CACHE_TOKEN_KEY, String(token));
      }
      localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());
    } catch (e) {
      console.warn("[i18n] Cache write error:", e);
    }
  }

  tryLoadFromCache();

  function getInitialLanguage() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && SUPPORTED_LANGS.includes(saved)) {
        return saved;
      }
    } catch (e) {}
    const navLang = (
      navigator.language ||
      navigator.userLanguage ||
      ""
    ).toLowerCase();
    if (
      navLang.startsWith("ru") ||
      navLang.startsWith("be") ||
      navLang.startsWith("uk")
    ) {
      return "ru";
    }
    return "en";
  }

  function loadTranslations() {
    if (loadPromise) return loadPromise;

    loadPromise = (async function () {
      const cachedData = tryLoadFromCache();
      if (cachedData) {
        applyLanguage(currentLang);
      }

      let serverToken = null;
      try {
        const tokenRes = await fetch(TOKEN_URL + "?v=" + Date.now(), {
          cache: "no-store",
        });
        if (tokenRes.ok) {
          const rawToken = await tokenRes.text();
          serverToken = rawToken.trim();
          try {
            const parsed = JSON.parse(rawToken);
            if (parsed && (parsed.token || parsed.version)) {
              serverToken = String(parsed.token || parsed.version).trim();
            }
          } catch (_) {}
        }
      } catch (err) {
        console.warn("[i18n] Could not check token:", err);
      }

      const cachedToken = localStorage.getItem(CACHE_TOKEN_KEY);

      if (cachedData && serverToken && cachedToken === serverToken) {
        return translations;
      }

      try {
        const fetchUrl = serverToken
          ? `${JSON_URL}?v=${encodeURIComponent(serverToken)}`
          : `${JSON_URL}?v=${Date.now()}`;
        const response = await fetch(fetchUrl, { cache: "no-store" });
        if (!response.ok) {
          throw new Error("Failed to load i18n.json: " + response.status);
        }
        const data = await response.json();
        translations = data;
        saveToCache(data, serverToken);
        applyLanguage(currentLang);
        return data;
      } catch (err) {
        console.warn("[i18n] Could not load fresh translations:", err);
        if (cachedData) {
          return translations;
        }
        throw err;
      }
    })().catch((err) => {
      console.warn("[i18n] Translation initialization error:", err);
      loadPromise = null;
      return translations;
    });

    return loadPromise;
  }

  function applyLanguage(lang) {
    if (!translations || !translations[lang]) {
      if (!loadPromise) loadTranslations();
      return;
    }
    currentLang = lang;
    document.documentElement.lang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}

    const dict = translations[lang] || {};

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (!key) return;

      if (el.dataset.i18nDefault === undefined) {
        el.dataset.i18nDefault = el.textContent.trim();
      }

      if (dict[key] !== undefined && dict[key] !== "") {
        el.textContent = dict[key];
      } else if (lang === "en" && el.dataset.i18nDefault) {
        el.textContent = el.dataset.i18nDefault;
      }
    });

    document.querySelectorAll("[data-i18n-title]").forEach((el) => {
      const key = el.getAttribute("data-i18n-title");
      if (!key) return;
      if (el.dataset.i18nDefaultTitle === undefined) {
        el.dataset.i18nDefaultTitle = el.getAttribute("title") || "";
      }
      if (dict[key] !== undefined && dict[key] !== "") {
        el.setAttribute("title", dict[key]);
      } else if (lang === "en" && el.dataset.i18nDefaultTitle) {
        el.setAttribute("title", el.dataset.i18nDefaultTitle);
      }
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (!key) return;
      if (el.dataset.i18nDefaultPlaceholder === undefined) {
        el.dataset.i18nDefaultPlaceholder =
          el.getAttribute("placeholder") || "";
      }
      if (dict[key] !== undefined && dict[key] !== "") {
        el.setAttribute("placeholder", dict[key]);
      } else if (lang === "en" && el.dataset.i18nDefaultPlaceholder) {
        el.setAttribute("placeholder", el.dataset.i18nDefaultPlaceholder);
      }
    });

    const flagSrc =
      lang === "ru"
        ? "/tech/lang_sel_flag_ru.png"
        : "/tech/lang_sel_flag_en.png";
    const flagAlt = lang.toUpperCase();
    document
      .querySelectorAll(".lang_switch_btn, #lang_toggle")
      .forEach((btn) => {
        btn.innerHTML = `<img class="lang_btn_flag" src="${flagSrc}" alt="${flagAlt}" />`;
      });

    window.dispatchEvent(
      new CustomEvent("ks_lang_change", {
        detail: { lang, dict },
      }),
    );
  }

  async function toggleLanguage() {
    if (loadPromise && (!translations || !translations[currentLang])) {
      await loadPromise;
    }
    const nextLang = currentLang === "ru" ? "en" : "ru";
    applyLanguage(nextLang);
  }

  function init() {
    currentLang = getInitialLanguage();

    document.addEventListener("click", function (e) {
      const btn =
        e.target && e.target.closest("#lang_toggle, .lang_switch_btn");
      if (btn) {
        e.preventDefault();
        toggleLanguage();
      }
    });

    loadTranslations();
  }

  window.setKSLang = function (lang) {
    if (loadPromise && (!translations || !translations[lang])) {
      loadPromise.then(() => applyLanguage(lang));
    } else {
      applyLanguage(lang);
    }
  };
  window.toggleKSLang = toggleLanguage;
  window.getKSLang = () => currentLang;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
