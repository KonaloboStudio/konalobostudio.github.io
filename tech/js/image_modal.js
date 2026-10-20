document.addEventListener("DOMContentLoaded", function () {
  const modal =
    document.getElementById("pg3dModal") ||
    document.getElementById("imgModal");
  const modalImg =
    document.getElementById("pg3dModalContent") ||
    document.getElementById("imgModalContent");
  const modalCaption =
    document.getElementById("pg3dModalCaption") ||
    document.getElementById("imgModalCaption");
  const closeBtn = document.querySelector(".pg3d_modal_close, .ml_modal_close");

  if (modal && modalImg) {
    const triggers = document.querySelectorAll(
      ".pg3d_fan_screen_grid img, .pg3d_save_image_box img, .ml_gallery_item img, .pg3d_nostal_grid img, .pg3d_nostal_card img, [data-modal-img]"
    );

    function openModal(src, alt) {
      modalImg.src = src;
      if (modalCaption) {
        modalCaption.textContent = alt || "";
        modalCaption.style.display = alt ? "block" : "none";
      }
      modal.style.display = "flex";
      document.body.style.overflow = "hidden";
    }

    function closeModal() {
      modal.style.display = "none";
      modalImg.src = "";
      document.body.style.overflow = "";
    }

    triggers.forEach((img) => {
      img.style.cursor = "zoom-in";
      img.addEventListener("click", function (e) {
        e.stopPropagation();
        const fullSrc = this.dataset.full || this.src;
        const cardCaption = this.closest(".pg3d_nostal_card")?.querySelector(".pg3d_nostal_caption");
        const caption =
          cardCaption && !cardCaption.classList.contains("is_empty")
            ? cardCaption.textContent.trim()
            : this.dataset.caption || this.alt || this.title || "";
        openModal(fullSrc, caption);
      });
    });

    document.querySelectorAll(".pg3d_nostal_card").forEach((card) => {
      card.addEventListener("click", function () {
        const img = this.querySelector("img");
        if (img) {
          const fullSrc = img.dataset.full || img.src;
          const cardCaption = this.querySelector(".pg3d_nostal_caption");
          const caption =
            cardCaption && !cardCaption.classList.contains("is_empty")
              ? cardCaption.textContent.trim()
              : img.dataset.caption || img.alt || img.title || "";
          openModal(fullSrc, caption);
        }
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", closeModal);
    }

    modal.addEventListener("click", function (e) {
      if (
        e.target === modal ||
        e.target.classList.contains("pg3d_modal_wrapper")
      ) {
        closeModal();
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.style.display === "flex") {
        closeModal();
      }
    });
  }
});
