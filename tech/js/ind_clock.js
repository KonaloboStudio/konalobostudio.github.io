(function () {
  "use strict";

  function updateClock() {
    const clockEl = document.getElementById("ind_up_clock");
    if (!clockEl) return;

    const now = new Date();
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const day = days[now.getDay()];
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;

    clockEl.textContent = `${day} ${hours}:${minutes} ${ampm}`;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      updateClock();
      setInterval(updateClock, 1000);
    });
  } else {
    updateClock();
    setInterval(updateClock, 1000);
  }
})();
