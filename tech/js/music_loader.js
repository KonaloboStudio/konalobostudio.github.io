
(function () {
  "use strict";

  const JSON_URL = "/tech/json/tracks.json";

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

      const player = new Plyr(audioEl, {
        controls: [
          "play",
          "progress",
          "duration",
          "mute",
          "volume",
          "settings",
          "download"
        ],
        settings: ["speed"],
        speed: {
          selected: 1,
          options: [0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1, 1.05, 1.1, 1.15, 1.2, 1.25, 1.3, 1.35, 1.4]
        },
        muted: false,
        autoplay: false
      });

      player.on("play", () => {
        disablePreservePitch();
        plyrInstances.forEach((other) => {
          if (other !== player && !other.paused) {
            other.pause();
          }
        });
      });

      const trackLi = audioEl.closest(".li_track");
      if (trackLi && player.elements && player.elements.container) {
        const updateMenuState = () => {
          const isOpen = player.elements.container.classList.contains("plyr--menu-open") ||
            !!player.elements.container.querySelector('.plyr__control[aria-expanded="true"]');
          trackLi.classList.toggle("is-menu-open", isOpen);
        };
        const observer = new MutationObserver(updateMenuState);
        observer.observe(player.elements.container, {
          attributes: true,
          subtree: true,
          attributeFilter: ["class", "aria-expanded", "hidden"]
        });
      }

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
