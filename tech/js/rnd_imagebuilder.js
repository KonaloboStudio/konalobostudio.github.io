(function () {
  "use strict";

  const phrBody = [
    "/tech/bg/randombg1.jpg",
    "/tech/bg/randombg2.jpg",
    "/tech/bg/randombg3.jpg",
    "/tech/bg/randombg4.jpg",
    "/tech/bg/randombg5.jpg"
  ];

  const phrPerc = [
    {
      src: "/tech/magixa_img/temp_v3_1.png",
      position: "left bottom",
      desc: "2k-tan / art by hinemosu notari"
    },
    {
      src: "/tech/magixa_img/temp_v3_2.png",
      position: "right bottom",
      desc: "Natsuki by Pyohato"
    },
    {
      src: "/tech/magixa_img/temp_v3_3.png",
      position: "left bottom",
      desc: "Toro Inoue by Sony Computer Entertainment"
    },
    {
      src: "/tech/magixa_img/temp_v3_4.png",
      position: "right bottom",
      desc: "Eris by Pyohato"
    },
        {
      src: "/tech/magixa_img/temp_v3_5.png",
      position: "left bottom",
      desc: "Bonnika by Pyohato"
    },
        {
      src: "/tech/magixa_img/temp_v3_6.png",
      position: "right bottom",
      desc: "Licorice by Pyohato"
    },
            {
      src: "/tech/magixa_img/temp_v3_7.png",
      position: "right bottom",
      desc: "Magixa (V1) by konalobo"
    },
                {
      src: "/tech/magixa_img/temp_v3_8.png",
      position: "left bottom",
      desc: "FL Chan by Image-Line"
    },
                {
      src: "/tech/magixa_img/temp_v3_9.png",
      position: "right bottom",
      desc: "Konata Izumi by Kagami Yoshimizu"
    },
                {
      src: "/tech/magixa_img/temp_v3_99.png",
      position: "left bottom",
      desc: ""
    }

  ];

  function setRandomBackground(element, imageArray) {
    if (!element || !imageArray || imageArray.length === 0) return;
    const randomIndex = Math.floor(Math.random() * imageArray.length);
    const randomImage = imageArray[randomIndex];
    element.style.backgroundImage = `url('${randomImage}')`;
    element.style.backgroundPosition = "center";
    element.style.backgroundRepeat = "no-repeat";
    element.style.backgroundSize = "cover";
    element.style.backgroundAttachment = "fixed";
  }

  function setRandomCharacter(percElement, descElement, percArray) {
    if (!percElement || !percArray || percArray.length === 0) return;
    const randomIndex = Math.floor(Math.random() * percArray.length);
    const item = percArray[randomIndex];

    percElement.style.backgroundImage = `url('${item.src}')`;
    percElement.style.backgroundPosition = item.position || "bottom";
    percElement.style.backgroundRepeat = "no-repeat";
    percElement.style.backgroundSize = "contain";

    if (descElement) {
      if (item.desc) {
        descElement.textContent = item.desc;
        descElement.style.display = "";

        const isLeft = (item.position || "").includes("left");
        descElement.classList.remove("desc_pos_left", "desc_pos_right");
        descElement.classList.add(isLeft ? "desc_pos_right" : "desc_pos_left");
      } else {
        descElement.textContent = "";
        descElement.style.display = "none";
      }
    }
  }

  function init() {
    setRandomBackground(document.body, phrBody);

    const percEl =
      document.querySelector(".new_index_image_zone_perc");
    const descEl = document.querySelector(".new_index_image_zone_desc");

    setRandomCharacter(percEl, descEl, phrPerc);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();