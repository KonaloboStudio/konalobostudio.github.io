var phrBody = [
    "/tech/bg/randombg1.jpg",
    "/tech/bg/randombg2.jpg",
    "/tech/bg/randombg3.jpg",
    "/tech/bg/randombg4.jpg"
];

var phrMagixaP = [
    "/tech/magixa_img/1.png",
    "/tech/magixa_img/2.png",
    "/tech/magixa_img/3.png",
    "/tech/magixa_img/4.png"
];

function setRandomBackgroundImage(element, imageArray, position = 'bottom') {
    const randomIndex = Math.floor(Math.random() * imageArray.length);
    const randomImage = imageArray[randomIndex];
    element.style.backgroundImage = `url('${randomImage}')`;
    element.style.backgroundPosition = position;
    element.style.backgroundRepeat = 'no-repeat';
}

const body = document.body;
const magixaP = document.querySelector('.magixa_p');

setRandomBackgroundImage(body, phrBody);
setRandomBackgroundImage(magixaP, phrMagixaP);

if (magixaP.style.backgroundImage.includes('/tech/magixa_img/1.png') ||
    magixaP.style.backgroundImage.includes('/tech/magixa_img/3.png')) {
  magixaP.style.backgroundPosition = 'left bottom';
} else if (magixaP.style.backgroundImage.includes('/tech/magixa_img/2.png') ||
magixaP.style.backgroundImage.includes('/tech/magixa_img/4.png')) {
  magixaP.style.backgroundPosition = 'right bottom';
}