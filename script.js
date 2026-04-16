function getSkyClass(hour) {
  if (hour >= 0 && hour < 5) return "night";
  if (hour >= 5 && hour < 7) return "dawn";
  if (hour >= 7 && hour < 10) return "morning";
  if (hour >= 10 && hour < 14) return "midday";
  if (hour >= 14 && hour < 17) return "afternoon";
  if (hour >= 17 && hour < 18) return "dusk";
  if (hour >= 18 && hour < 24) return "evening";
  return "night";
}

function updateSky() {
  const hour = new Date().getHours();
  const sky = document.querySelector(".sky");
  sky.className = "sky " + getSkyClass(hour);
}

updateSky();
setInterval(updateSky, 60000);

function updateTextColor() {
  const hour = new Date().getHours();
  const isNight = (hour >= 0 && hour < 5) || (hour >= 18 && hour < 24);
  const color = isNight ? "#C0D2F5" : "#0E2657";

  // Nav items
  document.querySelectorAll(".nav-item").forEach((el) => {
    el.style.color = color;
  });

  // Nav rule
  document.querySelector(".nav-rule").style.borderColor = color;

  // Journal entries text
  document.querySelectorAll(".journal-entry").forEach((el) => {
    el.style.color = color;
    el.style.borderBottomColor = color;
  });

  // Main content text
  document.querySelector("#journal-content").style.color = color;
}

updateTextColor();
setInterval(updateTextColor, 60000);

function toggleJournalList() {
  const list = document.getElementById("journal-list");
  list.classList.toggle("collapsed");
}

function setActiveEntry(title, date) {
  const label = document.getElementById("journal-list-label");
  if (label) {
    label.textContent = date + " — " + title;
  }
  const list = document.getElementById("journal-list");
  if (list) {
    list.classList.add("collapsed");
  }
}
