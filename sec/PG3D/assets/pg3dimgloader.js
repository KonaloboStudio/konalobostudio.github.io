var phrBody = [
    "./assets/img/backgrounds/loading1.jpg",
    "./assets/img/backgrounds/loading2.jpg",
    "./assets/img/backgrounds/loading3.jpg",
    "./assets/img/backgrounds/loading4.jpg",
    "./assets/img/backgrounds/loading5.jpg"
];

function setRandomBackgroundImage(element, imageArray) {
    if (!element || !imageArray || !imageArray.length) return;
    const randomIndex = Math.floor(Math.random() * imageArray.length);
    const randomImage = imageArray[randomIndex];
    element.style.backgroundImage = `linear-gradient(rgba(11, 52, 103, 0) 0%, rgba(11, 52, 103, 0) 30%, var(--pg3d-bg) 85%), url('${randomImage}')`;
    element.style.backgroundPosition = 'center top';
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