(function () {
  "use strict";

  const JSON_URL = "/tech/json/tracks.json";

  function getI18nString(key, fallbackRu, fallbackEn) {
    const lang = (window.getKSLang && window.getKSLang()) || "ru";
    if (window.i18nDict && window.i18nDict[key]) {
      return window.i18nDict[key];
    }
    return lang === "ru" ? fallbackRu : fallbackEn;
  }

  document.addEventListener("ks_lang_change", (e) => {
    if (e.detail && e.detail.dict) {
      window.i18nDict = e.detail.dict;
    }
    document.querySelectorAll(".plyr__control--loop").forEach((btn) => {
      if (typeof btn.updateState === "function") {
        btn.updateState();
      }
    });
    document.querySelectorAll(".plyr__control--speed").forEach((btn) => {
      if (typeof btn.updateI18n === "function") {
        btn.updateI18n();
      }
    });
  });

  function getPageCategory() {
    const meta =
      document.querySelector('meta[name="music-category"]') ||
      document.querySelector('meta[name="category"]');
    return meta ? meta.getAttribute("content") : null;
  }

  function createTrackElement(track) {
    const li = document.createElement("li");
    li.className = "li_track";

    const p = document.createElement("p");
    p.className = "track_desc";
    p.textContent = track.title;
    li.appendChild(p);

    const audio = document.createElement("audio");
    audio.className = "track_player";
    audio.preload = "none";
    audio.controls = true;

    const source = document.createElement("source");
    source.src = track.url;
    source.type = "audio/mp3";

    audio.appendChild(source);
    li.appendChild(audio);

    return li;
  }

  function initPlyrPlayers(audioElements) {
    if (typeof Plyr === "undefined") {
      console.warn("Plyr library not loaded, using native HTML5 audio.");
      return;
    }

    const plyrInstances = [];

    audioElements.forEach((audioEl) => {
      function disablePreservePitch() {
        audioEl.preservesPitch = false;
        audioEl.mozPreservesPitch = false;
        audioEl.webkitPreservesPitch = false;
      }

      disablePreservePitch();
      audioEl.addEventListener("play", disablePreservePitch);
      audioEl.addEventListener("ratechange", disablePreservePitch);
      audioEl.addEventListener("loadedmetadata", disablePreservePitch);
      audioEl.addEventListener("seeked", disablePreservePitch);

      const player = new Plyr(audioEl, {
        controls: [
          "play",
          "progress",
          "duration",
          "mute",
          "volume",
          "download",
        ],
        muted: false,
        autoplay: false,
      });

      player.on("play", () => {
        disablePreservePitch();
        plyrInstances.forEach((other) => {
          if (other !== player && !other.paused) {
            other.pause();
          }
        });
      });

      player.on("ended", () => {
        if (player.loop) {
          player.restart();
          player.play();
        }
      });

      function setupCustomControls() {
        const controls = player.elements && player.elements.controls;
        if (!controls || controls.querySelector(".plyr__speed-wrapper")) return;

        const trackLi = audioEl.closest(".li_track");

        const speedWrapper = document.createElement("div");
        speedWrapper.className = "plyr__speed-wrapper";

        const gearBtn = document.createElement("button");
        gearBtn.type = "button";
        gearBtn.className = "plyr__control plyr__control--speed";
        gearBtn.setAttribute("data-plyr", "speed-gear");
        gearBtn.setAttribute("aria-haspopup", "true");
        gearBtn.setAttribute("aria-expanded", "false");
        gearBtn.innerHTML = `
          <svg aria-hidden="true" focusable="false">
            <use xlink:href="#plyr-settings" href="#plyr-settings"></use>
          </svg>
          <span class="plyr__sr-only">Speed</span>
        `;

        const popover = document.createElement("div");
        popover.className = "plyr__speed-popover";
        popover.hidden = true;
        popover.innerHTML = `
          <div class="plyr__speed-popover-inner">
            <input type="range" class="plyr__speed-slider" min="0.5" max="1.5" step="0.05" value="1.0" aria-label="Playback Speed Slider">
            <input type="text" class="plyr__speed-input" value="1.0x" inputmode="decimal" aria-label="Playback Speed Input">
          </div>
        `;

        const slider = popover.querySelector(".plyr__speed-slider");
        const speedInput = popover.querySelector(".plyr__speed-input");

        let currentSpeed = 1.0;

        function applySpeed(
          speed,
          updateInput = true,
          updateSlider = true,
          setMedia = true,
        ) {
          speed = Math.max(0.1, Math.min(4.0, speed));
          currentSpeed = speed;

          if (
            setMedia &&
            Math.abs((audioEl.playbackRate || 1) - speed) > 0.001
          ) {
            audioEl.playbackRate = speed;
          }
          disablePreservePitch();

          if (player.storage && typeof player.storage.set === "function") {
            player.storage.set({ speed: speed });
          }

          if (updateSlider) {
            if (speed >= 0.5 && speed <= 1.5) {
              slider.value = speed;
            } else if (speed < 0.5) {
              slider.value = 0.5;
            } else {
              slider.value = 1.5;
            }
          }

          if (updateInput) {
            const formatted = (Math.round(speed * 100) / 100).toString();
            speedInput.value = formatted + "x";
          }

          gearBtn.classList.toggle(
            "is-modified",
            Math.abs(speed - 1.0) > 0.001,
          );
        }

        function syncFromActualSpeed() {
          let restored = 1.0;
          if (player.storage && typeof player.storage.get === "function") {
            const val = player.storage.get("speed");
            if (typeof val === "number" && !isNaN(val) && val > 0) {
              restored = val;
            }
          }
          if (
            restored === 1.0 &&
            typeof audioEl.playbackRate === "number" &&
            !isNaN(audioEl.playbackRate) &&
            audioEl.playbackRate > 0
          ) {
            restored = audioEl.playbackRate;
          }
          applySpeed(restored, true, true, true);
        }

        syncFromActualSpeed();
        setTimeout(syncFromActualSpeed, 0);
        setTimeout(syncFromActualSpeed, 50);

        audioEl.addEventListener("ratechange", () => {
          disablePreservePitch();
          const rate = audioEl.playbackRate;
          if (typeof rate === "number" && !isNaN(rate) && rate > 0) {
            if (Math.abs(rate - currentSpeed) > 0.001) {
              applySpeed(rate, true, true, false);
            }
          }
        });

        slider.addEventListener("input", () => {
          applySpeed(parseFloat(slider.value), true, false, true);
        });

        function handleInputCommit() {
          const raw = speedInput.value
            .trim()
            .replace(/[xX]/g, "")
            .replace(",", ".");
          const num = parseFloat(raw);
          if (!isNaN(num) && num > 0) {
            applySpeed(num, true, true, true);
          } else {
            applySpeed(currentSpeed, true, true, false);
          }
        }

        speedInput.addEventListener("change", handleInputCommit);
        speedInput.addEventListener("keydown", (e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleInputCommit();
            speedInput.blur();
          }
        });
        speedInput.addEventListener("focus", () => {
          speedInput.select();
        });

        slider.addEventListener("dblclick", () =>
          applySpeed(1.0, true, true, true),
        );
        speedInput.addEventListener("dblclick", () =>
          applySpeed(1.0, true, true, true),
        );

        function openPopover() {
          document
            .querySelectorAll(".plyr__speed-popover:not([hidden])")
            .forEach((other) => {
              other.hidden = true;
              const otherBtn =
                other.parentElement &&
                other.parentElement.querySelector(".plyr__control--speed");
              if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
              const otherLi = other.closest(".li_track");
              if (otherLi) otherLi.classList.remove("is-menu-open");
            });

          popover.hidden = false;
          gearBtn.setAttribute("aria-expanded", "true");
          if (trackLi) trackLi.classList.add("is-menu-open");
          slider.focus();
        }

        function closePopover() {
          popover.hidden = true;
          gearBtn.setAttribute("aria-expanded", "false");
          if (trackLi) trackLi.classList.remove("is-menu-open");
        }

        gearBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          if (popover.hidden) {
            openPopover();
          } else {
            closePopover();
          }
        });

        popover.addEventListener("click", (e) => {
          e.stopPropagation();
        });

        document.addEventListener("click", (e) => {
          if (!speedWrapper.contains(e.target)) {
            closePopover();
          }
        });

        document.addEventListener("keydown", (e) => {
          if (e.key === "Escape" && !popover.hidden) {
            closePopover();
            gearBtn.focus();
          }
        });

        function updateI18n() {
          const speedLabel = getI18nString(
            "music_speed",
            "Скорость воспроизведения",
            "Playback speed",
          );
          const hint = getI18nString(
            "music_speed_hint",
            "Скорость (двойной клик для сброса)",
            "Speed (double-click to reset)",
          );
          gearBtn.title = speedLabel;
          gearBtn.setAttribute("aria-label", speedLabel);
          slider.title = hint;
          speedInput.title = hint;
        }

        gearBtn.updateI18n = updateI18n;
        updateI18n();

        speedWrapper.appendChild(gearBtn);
        speedWrapper.appendChild(popover);

        const loopBtn = document.createElement("button");
        loopBtn.type = "button";
        loopBtn.className = "plyr__control plyr__control--loop";
        loopBtn.setAttribute("data-plyr", "loop");
        loopBtn.innerHTML = `
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
            <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z" fill="currentColor"/>
          </svg>
          <span class="plyr__sr-only">Loop</span>
        `;

        function updateLoopState() {
          const isLoop = Boolean(player.loop);
          loopBtn.setAttribute("aria-pressed", isLoop ? "true" : "false");
          loopBtn.classList.toggle("plyr__control--pressed", isLoop);
          const tip = isLoop
            ? getI18nString(
                "music_loop_on",
                "Повтор включён (кликните для отключения)",
                "Loop enabled (click to disable)",
              )
            : getI18nString(
                "music_loop_off",
                "Включить повтор трека",
                "Enable loop",
              );
          loopBtn.title = tip;
          loopBtn.setAttribute("aria-label", tip);
        }

        loopBtn.addEventListener("click", () => {
          player.loop = !player.loop;
          updateLoopState();
        });

        if (player.elements.container) {
          player.elements.container.addEventListener("keydown", (e) => {
            if (e.key === "l" || e.key === "L") {
              setTimeout(updateLoopState, 0);
            }
          });
        }

        loopBtn.updateState = updateLoopState;
        updateLoopState();

        const downloadBtn = controls.querySelector('[data-plyr="download"]');
        if (downloadBtn) {
          controls.insertBefore(speedWrapper, downloadBtn);
          controls.insertBefore(loopBtn, downloadBtn);
        } else {
          controls.appendChild(speedWrapper);
          controls.appendChild(loopBtn);
        }
      }

      player.on("ready", setupCustomControls);
      setupCustomControls();

      plyrInstances.push(player);
    });
  }

  async function loadTracks() {
    const pageCategory = getPageCategory();
    const trackLists = document.querySelectorAll(".ul_track");

    if (!trackLists.length) return;

    try {
      const response = await fetch(JSON_URL);
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status} loading ${JSON_URL}`);
      }

      const catalog = await response.json();
      const createdAudios = [];

      trackLists.forEach((list) => {
        const categoryKey = list.getAttribute("data-category") || pageCategory;
        if (!categoryKey || !catalog[categoryKey]) {
          console.warn(`Category "${categoryKey}" not found in tracks.json`);
          return;
        }

        const tracks = catalog[categoryKey];
        list.innerHTML = "";

        tracks.forEach((track) => {
          const trackItem = createTrackElement(track);
          list.appendChild(trackItem);
          const audioEl = trackItem.querySelector("audio");
          if (audioEl) createdAudios.push(audioEl);
        });
      });

      initPlyrPlayers(createdAudios);
    } catch (err) {
      console.error("Failed to load music catalog:", err);
      trackLists.forEach((list) => {
        list.innerHTML = `<li class="li_track"><p class="track_desc" style="color:#ff6b6b;">Error loading tracks catalog.</p></li>`;
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadTracks);
  } else {
    loadTracks();
  }
})();
