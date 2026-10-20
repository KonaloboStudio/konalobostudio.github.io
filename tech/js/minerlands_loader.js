(function () {
  "use strict";

  const JSON_PATHS = [
    "/tech/json/minerlands.json",
  ];

  const UI_STRINGS = {
    ru: {
      btn_details: "Детали",
      btn_download: "Скачать",
      heading_desc: "Описание",
      heading_recipes: "Рецепты крафта",
      heading_screens: "Скриншоты",
      heading_downloads: "Скачать",
      back_addons: "Назад к списку аддонов",
      back_textures: "Назад к списку текстурпаков",
      default_badge: "Ресурс"
    },
    en: {
      btn_details: "Details",
      btn_download: "Download",
      heading_desc: "Description",
      heading_recipes: "Crafting Recipes",
      heading_screens: "Screenshots",
      heading_downloads: "Downloads",
      back_addons: "Back to Addons list",
      back_textures: "Back to Texture Packs list",
      default_badge: "Resource"
    }
  };

  let cachedData = null;

  function getCurrentLang() {
    try {
      const saved = localStorage.getItem("lang");
      if (saved && (saved === "ru" || saved === "en")) {
        return saved;
      }
    } catch (e) {}
    const navLang = (navigator.language || navigator.userLanguage || "").toLowerCase();
    return navLang.startsWith("ru") || navLang.startsWith("be") || navLang.startsWith("uk")
      ? "ru"
      : "en";
  }

  function t(val, lang) {
    if (!val) return "";
    if (typeof val === "object") {
      return val[lang] || val["ru"] || val["en"] || "";
    }
    return val;
  }

  function getUI(key, lang) {
    const dict = UI_STRINGS[lang] || UI_STRINGS["ru"];
    return dict[key] || "";
  }

  function getMeta(name) {
    const meta = document.querySelector(`meta[name="${name}"]`);
    return meta ? meta.getAttribute("content") : null;
  }

  function createCardElement(item, lang) {
    const card = document.createElement("div");
    card.className = "ml_card";

    const media = document.createElement("div");
    media.className = "ml_card_media";

    const img = document.createElement("img");
    img.src = item.image;
    img.alt = t(item.title, lang);
    img.className = "ml_card_img";
    media.appendChild(img);

    const body = document.createElement("div");
    body.className = "ml_card_body";

    const badge = document.createElement("span");
    badge.className = `ml_badge ${item.badgeClass || "badge_addon"}`;
    badge.textContent = t(item.badge, lang) || getUI("default_badge", lang);

    const title = document.createElement("h3");
    title.className = "ml_card_title";
    title.textContent = t(item.title, lang);

    const desc = document.createElement("p");
    desc.className = "ml_card_desc";
    desc.textContent = t(item.shortDesc, lang);

    const btn = document.createElement("a");
    btn.href = item.link;
    btn.className = "ml_btn";
    btn.textContent = getUI("btn_details", lang);

    body.appendChild(badge);
    body.appendChild(title);
    body.appendChild(desc);
    body.appendChild(btn);

    card.appendChild(media);
    card.appendChild(body);

    return card;
  }

  function renderDetailPage(item, container, lang) {
    if (!item || !container) return;

    const descContent = t(item.fullDesc, lang) || t(item.shortDesc, lang);
    let descHtml = "";
    if (Array.isArray(descContent)) {
      descHtml = descContent.map((p) => `<p class="ml_text_block">${p}</p>`).join("");
    } else {
      descHtml = `<p class="ml_text_block">${descContent}</p>`;
    }

    let html = `
      <h3 class="ml_section_heading">${getUI("heading_desc", lang)}</h3>
      ${descHtml}
    `;


    if (item.screenshots && item.screenshots.length > 0) {
      html += `
        <h3 class="ml_section_heading">${getUI("heading_screens", lang)}</h3>
        <div class="ml_gallery_grid">
          ${item.screenshots
            .map((s, idx) => {
              const thumb = typeof s === "object" ? s.thumb || s.src : s;
              const full =
                typeof s === "object"
                  ? s.full || s.src || s.thumb
                  : s.includes("/mod_thumb/")
                  ? s.replace("/mod_thumb/", "/mod_screen/")
                  : s;
              const title = `${t(item.title, lang)} - ${idx + 1}`;
              return `
                <div class="ml_gallery_item">
                  <img src="${thumb}" data-full="${full}" alt="${title}" loading="lazy" />
                </div>
              `;
            })
            .join("")}
        </div>
      `;
    }

        if (item.recipes && item.recipes.length > 0) {
      html += `
        <h3 class="ml_section_heading">${getUI("heading_recipes", lang)}</h3>
        <div class="ml_recipe_grid">
          ${item.recipes
            .map((rec, idx) => {
              const src = typeof rec === "object" ? rec.thumb || rec.src : rec;
              const full = typeof rec === "object" ? rec.full || rec.src : rec;
              const title = (typeof rec === "object" ? t(rec.title, lang) : "") || `${t(item.title, lang)} #${idx + 1}`;
              return `
                <div class="ml_recipe_item" title="${title}">
                  <img src="${src}" data-full="${full}" alt="${title}" loading="lazy" />
                </div>
              `;
            })
            .join("")}
        </div>
      `;
    }

    
    if (item.downloads && item.downloads.length > 0) {
      html += `<h3 class="ml_section_heading">${getUI("heading_downloads", lang)}</h3>`;
      item.downloads.forEach((dl) => {
        const changesArray = t(dl.changes, lang);
        let changesList = "";
        if (Array.isArray(changesArray)) {
          changesList = changesArray.map((c) => `<li>${c}</li>`).join("");
        }

        html += `
          <div class="ml_download_box">
            <div class="ml_dl_info">
              <h4>${t(dl.title, lang)}</h4>
              ${changesList ? `<ul>${changesList}</ul>` : ""}
            </div>
            <a href="${dl.url}" target="_blank" class="ml_dl_btn">
              ${getUI("btn_download", lang)}
            </a>
          </div>
        `;
      });
    }

    const backLink =
      item.badgeClass === "badge_texture"
        ? "../texturepacks/texturelist.html"
        : "../addon/addonlist.html";
    const backText =
      item.badgeClass === "badge_texture"
        ? getUI("back_textures", lang)
        : getUI("back_addons", lang);

    html += `
      <div style="margin-top: 25px;">
        <a href="${backLink}" class="ml_btn">${backText}</a>
      </div>
    `;

    container.innerHTML = html;

    const modal = document.getElementById("imgModal");
    const modalImg = document.getElementById("imgModalContent");
    const closeBtn = modal ? modal.querySelector(".ml_modal_close") : null;

    if (modal && modalImg) {
      function openModal(fullSrc, alt) {
        modalImg.src = fullSrc;
        modalImg.alt = alt || "";
        modal.style.display = "flex";
        document.body.style.overflow = "hidden";
      }

      function closeModal() {
        modal.style.display = "none";
        modalImg.src = "";
        document.body.style.overflow = "";
      }

      container.querySelectorAll(".ml_gallery_item img, .ml_recipe_item img").forEach((img) => {
        img.addEventListener("click", function (e) {
          e.stopPropagation();
          const fullSrc = this.getAttribute("data-full") || this.src;
          openModal(fullSrc, this.alt);
        });
      });

      if (closeBtn) {
        closeBtn.onclick = closeModal;
      }

      modal.onclick = function (e) {
        if (e.target === modal || e.target === closeBtn) {
          closeModal();
        }
      };

      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && modal.style.display === "flex") {
          closeModal();
        }
      });
    }
  }

  async function fetchMinerlandsData() {
    if (cachedData) return cachedData;
    for (const path of JSON_PATHS) {
      try {
        const res = await fetch(path);
        if (res.ok) {
          cachedData = await res.json();
          return cachedData;
        }
      } catch (e) {}
    }
    throw new Error("Could not load minerlands.json from any known path");
  }

  async function render(lang) {
    const category = getMeta("minerlands-category") || getMeta("category");
    const itemId = getMeta("minerlands-item") || getMeta("item");
    const gridContainer = document.querySelector(".ml_grid");
    const detailContainer = document.querySelector(".ml_detail_panel");

    if (!gridContainer && !detailContainer) return;

    try {
      const data = await fetchMinerlandsData();
      const addons = data.addons || [];
      const textures = data.texturepacks || [];
      const allItems = [...addons, ...textures];

      if (gridContainer) {
        let itemsToRender = [];

        if (category === "all" || category === "full") {
          itemsToRender = allItems;
        } else if (category === "addons" || category === "addon") {
          itemsToRender = addons;
        } else if (category === "texturepacks" || category === "texture") {
          itemsToRender = textures;
        } else {
          const customCat = gridContainer.getAttribute("data-category");
          if (customCat === "addons") itemsToRender = addons;
          else if (customCat === "texturepacks") itemsToRender = textures;
          else itemsToRender = allItems;
        }

        if (itemsToRender.length > 0) {
          gridContainer.innerHTML = "";
          itemsToRender.forEach((item) => {
            gridContainer.appendChild(createCardElement(item, lang));
          });
        }
      }

      if (detailContainer && itemId) {
        const currentItem = allItems.find((it) => it.id === itemId);
        if (currentItem) {
          renderDetailPage(currentItem, detailContainer, lang);
        }
      }
    } catch (err) {
      console.error("[minerlands_loader] Error:", err);
    }
  }

  function init() {
    const lang = getCurrentLang();
    render(lang);

    window.addEventListener("ks_lang_change", function (e) {
      const newLang = e.detail && e.detail.lang ? e.detail.lang : getCurrentLang();
      render(newLang);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
