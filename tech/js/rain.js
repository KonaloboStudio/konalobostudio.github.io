var n = 900,
  c = document.getElementById("rain"),
  ctx = c.getContext("2d"),
  cw = (c.width = c.offsetWidth);
ch = c.height = 500;
(duration = ch / 850),
  (img = new Image()),
  (particles = []),
  (particleNumber = 0),
  (Particle = function () {
    this.alpha = rand(0.1, 0.4);
    this.size = rand(60, 70);
    this.draw = function () {
      ctx.globalAlpha = this.alpha;
      ctx.drawImage(img, this.x, this.y, this.size, this.size);
    };
  });
function setParticle(p) {
  particleNumber++;
  var _dur = rand(duration / 2, duration),
    _tl = new TimelineMax().fromTo(
      p,
      _dur,
      {
        x: rand(-p.size, cw + ch / 2),
        y: -p.size,
      },
      {
        x: "-=" + rand(ch / 2 - 50, ch / 2),
        y: ch + p.size,
        ease: Power0.easeNone,
        onComplete: function () {
          setParticle(p);
        },
      }
    );
  if (particleNumber < n) _tl.seek(_dur * rand());
}
for (var i = 0; i < n; i++) {
  particles.push(new Particle());
  setParticle(particles[i]);
}
TweenMax.ticker.addEventListener("tick", function () {
  ctx.clearRect(0, 0, cw, ch);
  for (var i = 0; i < n; i++) {
    particles[i].draw();
  }
});
window.addEventListener("resize", function () {
  particleNumber = 0;
  cw = c.width = c.offsetWidth;
  ch = c.height = 500;
  for (var i = 0; i < n; i++) {
    TweenMax.killTweensOf(particles[i]);
    setParticle(particles[i]);
  }
});
function rand(min = 0, max = 1) {
  return min + (max - min) * Math.random();
}
img.src =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAABECAMAAAAPzWOAAAAAclBMVEVHcEz///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9wvwjfAAAAJnRSTlMADzQ3BxsfAQIKBBYFX5UsEjxPan6QJ0NJJCkUcXgvhVRZSkCKZM5koNQAAAFNSURBVHgB3ZWFkcRADARvUVozM9uXf4p/GTyMil4BTLnHvdLrN0OJfcHDs8JD7BTgDCq2CKfxHeE0W4zTzBqvJOomhkOCdgTTxEaCJv9HNCxAQzI0pcS/2URo8FqdsQIf4vFanYQkuYDythSgKYYCpxkHK0CjWYDGE658r3DT+i3Bla8cTJOYHtdVVbiuPB749Uz6AaYhdRrCH3A64spfp8IlSXsBSeqO4FqrN04z1pXFN8mqI/h4nouHaaYlhbdruJveojQuXTeGlV9rz6gk134oAkN83ZQBDLGmWToLhrhzTx1YSZQv+zBjITRX+6oDoba29QRWoq4nS32CNTLW2YNWEu49Ww2mWuTfWZuClgTTZO3hoEo4Ptp2KQuoEqubD80EWUJFmmVP5aFK2NVZ25RFBJ6bZj18YHAx3qULTOhWm+GMzzCe8ZmfZ3wBUXcSquSL1HAAAAAASUVORK5CYII=";
