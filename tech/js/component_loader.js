(function () {
  "use strict";

  async function loadIncludes() {
    const includes = document.querySelectorAll("[data-include]");
    if (!includes.length) return;

    for (const el of includes) {
      const file = el.getAttribute("data-include");
      if (!file) continue;

      try {
        const response = await fetch(file);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        el.innerHTML = await response.text();

        const currentPath = window.location.pathname.toLowerCase();
        let matched = false;
        const links = el.querySelectorAll(".up_panel_link_btn");
        links.forEach((link) => {
          const href = (link.getAttribute("href") || "").toLowerCase();
          if (href && (currentPath.endsWith(href) || currentPath.endsWith(href.replace(/^\//, "")))) {
            link.classList.add("active");
            matched = true;
          }
        });

        if (!matched) {
          links.forEach((link) => {
            if (matched) return;
            const href = (link.getAttribute("href") || "").toLowerCase();
            const hrefDir = href.substring(0, href.lastIndexOf("/"));
            if (
              hrefDir &&
              hrefDir !== "/sec" &&
              hrefDir !== "" &&
              hrefDir !== "/sec/dl" &&
              currentPath.includes(hrefDir)
            ) {
              link.classList.add("active");
              matched = true;
            }
          });
        }
      } catch (err) {
        console.warn(`[ComponentLoader] Ошибка загрузки ${file}:`, err);
      }
    }

    if (window.setKSLang && window.getKSLang) {
      window.setKSLang(window.getKSLang());
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadIncludes);
  } else {
    loadIncludes();
  }
})();
