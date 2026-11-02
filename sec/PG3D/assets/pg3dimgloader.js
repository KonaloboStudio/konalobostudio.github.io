var phrBody = [
    "./assets/img/backgrounds/loading1.jpg",
    "./assets/img/backgrounds/PGW_Ants_2026-11-02_13-45-09-905.jpg",
    "./assets/img/backgrounds/PGW_Arena_Hockey_2026-11-02_13-52-44-450.jpg",
    "./assets/img/backgrounds/PGW_Arena_Underwater_2026-11-02_13-51-25-408.jpg",
    "./assets/img/backgrounds/PGW_Hungry_Night_2026-11-02_13-39-20-177.jpg",
    "./assets/img/backgrounds/PGW_Hungry_Night_2026-11-02_13-39-45-204.jpg",
    "./assets/img/backgrounds/loading5.jpg",
    "./assets/img/backgrounds/PGW_Menu_Christmas_2026-11-02_13-31-32-646.jpg",
    "./assets/img/backgrounds/PGW_Menu_Knife_2026-11-02_13-33-11-336.jpg",
    "./assets/img/backgrounds/PGW_Parkour_2026-11-02_13-47-24-258.jpg",
    "./assets/img/backgrounds/PGW_Pizza_2026-11-02_13-42-38-465.jpg",
    "./assets/img/backgrounds/PGW_Space_2026-11-02_13-44-01-113.jpg",
    "./assets/img/backgrounds/PGW_Two_Castles_2026-11-02_12-41-25-110.jpg",
    "./assets/img/backgrounds/loading3.jpg",
    "./assets/img/backgrounds/PGW_Underwater_2026-11-02_12-38-00-550.jpg",
    "./assets/img/backgrounds/PGW_Paradise_2026-11-02_16-26-05-996_2560x1440.jpg",
    "./assets/img/backgrounds/PGW_Sky_islands_2026-11-02_16-28-49-240_2560x1440.jpg",
    "./assets/img/backgrounds/PGW_Train_2026-11-02_16-31-08-081_2560x1440.jpg",
    "./assets/img/backgrounds/PGW_Train_2026-11-02_16-31-17-483_2560x1440.jpg",
    "./assets/img/backgrounds/loading4.jpg",
    "./assets/img/backgrounds/PGW_Slender_2026-11-02_16-32-24-091_2560x1440.jpg",
    "./assets/img/backgrounds/PGW_Underwater_2026-11-02_16-33-05-497_2560x1440.jpg",
    "./assets/img/backgrounds/PGW_Heaven_2026-11-02_16-23-32-540_2560x1440.jpg"
];

function setRandomBackgroundImage(element, imageArray) {
    if (!element || !imageArray || !imageArray.length) return;
    const randomIndex = Math.floor(Math.random() * imageArray.length);
    const randomImage = imageArray[randomIndex];
    element.style.backgroundImage = `url('${randomImage}')`;
    element.style.backgroundPosition = 'center';
    element.style.backgroundRepeat = 'no-repeat';
    element.style.backgroundAttachment = 'fixed';
    element.style.backgroundSize = 'cover';
}

function init() {
    setRandomBackgroundImage(document.body, phrBody);
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
}