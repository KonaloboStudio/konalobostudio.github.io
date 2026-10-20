(function () {
  "use strict";

  const canvas =
    document.getElementById("tiles_canvas") ||
    document.getElementById("rain");
  if (!canvas || !canvas.getContext) return;

  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (motionQuery.matches) {
    canvas.style.display = "none";
    return;
  }

  const ctx = canvas.getContext("2d", {
    alpha: true,
    desynchronized: true
  });
  if (!ctx) return;

  // Configuration
  const TILE_SIZE = 36; // Size of each square tile in pixels
  const MAX_ACTIVE_TILES = 22; // Maximum simultaneous flickering tiles
  const SPAWN_INTERVAL = 150; // Milliseconds between random tile sparks

  // Cyber neon color palette [R, G, B]
  const COLORS = [
    [0, 113, 242],   // Electric Blue
    [90, 140, 255],  // Soft Neon Blue
    [175, 235, 255], // Ice White/Blue
    [120, 90, 255]   // Electric Violet
  ];

  let width = 0;
  let height = 0;
  let cols = 0;
  let rows = 0;
  let dpr = 1;
  let running = false;
  let rafId = 0;
  let lastTimestamp = 0;
  let spawnTimer = 0;
  let resizeTimeout = 0;

  const tilePool = new Array(MAX_ACTIVE_TILES);
  for (let i = 0; i < MAX_ACTIVE_TILES; i++) {
    tilePool[i] = {
      active: false,
      col: 0,
      row: 0,
      alpha: 0,
      maxAlpha: 0.4,
      fadeInSpeed: 2.5,
      fadeOutSpeed: 1.2,
      phase: 0, // 0: fading in, 1: fading out
      color: COLORS[0]
    };
  }

  function random(min, max) {
    return min + Math.random() * (max - min);
  }

  function activateTile(col, row, customMaxAlpha) {

    for (let i = 0; i < MAX_ACTIVE_TILES; i++) {
      const tile = tilePool[i];
      if (!tile.active) {
        tile.active = true;
        tile.col = col;
        tile.row = row;
        tile.alpha = 0;
        tile.maxAlpha = customMaxAlpha || random(0.25, 0.65);
        tile.fadeInSpeed = random(2.2, 4.0);
        tile.fadeOutSpeed = random(0.8, 1.8);
        tile.phase = 0;
        tile.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        return;
      }
    }
  }

  function spawnRandomTile() {
    if (cols <= 0 || rows <= 0) return;
    const randomCol = Math.floor(Math.random() * cols);
    const randomRow = Math.floor(Math.random() * rows);
    activateTile(randomCol, randomRow);
  }

  function resize() {
    const parent = canvas.parentElement || canvas;
    width = parent.clientWidth || window.innerWidth;
    height = parent.clientHeight || 350;
    dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    cols = Math.ceil(width / TILE_SIZE);
    rows = Math.ceil(height / TILE_SIZE);
  }

  function tick(timestamp) {
    if (!running) return;

    const dt = lastTimestamp ? Math.min((timestamp - lastTimestamp) / 1000, 0.06) : 0.016;
    lastTimestamp = timestamp;

    spawnTimer += dt * 1000;
    if (spawnTimer >= SPAWN_INTERVAL) {
      spawnRandomTile();
      if (Math.random() > 0.4) spawnRandomTile(); 
      spawnTimer = 0;
    }

    ctx.clearRect(0, 0, width, height);

    ctx.strokeStyle = "rgba(0, 68, 255, 0.22)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let c = 0; c <= cols; c++) {
      const x = Math.floor(c * TILE_SIZE) + 0.5;
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    for (let r = 0; r <= rows; r++) {
      const y = Math.floor(r * TILE_SIZE) + 0.5;
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    ctx.stroke();

 
    for (let i = 0; i < MAX_ACTIVE_TILES; i++) {
      const tile = tilePool[i];
      if (!tile.active) continue;

      if (tile.phase === 0) {

        tile.alpha += tile.fadeInSpeed * dt;
        if (tile.alpha >= tile.maxAlpha) {
          tile.alpha = tile.maxAlpha;
          tile.phase = 1; 
        }
      } else {

        tile.alpha -= tile.fadeOutSpeed * dt;
        if (tile.alpha <= 0) {
          tile.alpha = 0;
          tile.active = false;
          continue;
        }
      }

      const x = Math.floor(tile.col * TILE_SIZE);
      const y = Math.floor(tile.row * TILE_SIZE);
      const size = TILE_SIZE;
      const [r, g, b] = tile.color;


      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${tile.alpha})`;
      ctx.fillRect(x, y, size, size);


      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${Math.min(tile.alpha * 1.6, 0.95)})`;
      ctx.lineWidth = 1;
      ctx.strokeRect(x + 0.5, y + 0.5, size - 1, size - 1);
    }

    rafId = requestAnimationFrame(tick);
  }

  function start() {
    if (running) return;
    running = true;
    lastTimestamp = 0;
    spawnTimer = 0;
    rafId = requestAnimationFrame(tick);
  }

  function stop() {
    running = false;
    lastTimestamp = 0;
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = 0;
    }
  }


  let lastHoverCol = -1;
  let lastHoverRow = -1;

  function handleMouseMove(e) {
    if (!running) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
      const col = Math.floor(mouseX / TILE_SIZE);
      const row = Math.floor(mouseY / TILE_SIZE);

      if (col !== lastHoverCol || row !== lastHoverRow) {
        lastHoverCol = col;
        lastHoverRow = row;
        activateTile(col, row, 0.75); 
      }
    }
  }

  const interactiveContainer = canvas.parentElement || window;
  interactiveContainer.addEventListener("mousemove", handleMouseMove, { passive: true });

  motionQuery.addEventListener("change", function (e) {
    if (e.matches) {
      stop();
      canvas.style.display = "none";
    } else {
      canvas.style.display = "";
      resize();
      start();
    }
  });

  window.addEventListener("resize", function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function () {
      resize();
    }, 100);
  });

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      stop();
    } else {
      start();
    }
  });

  resize();
  start();
})();
