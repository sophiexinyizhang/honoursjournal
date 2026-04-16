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
  const color = isNight ? "#7d9bd5" : "#0E2657";

  // Nav items
  document.querySelectorAll(".nav-item").forEach((el) => {
    el.style.color = color;
  });

  // Nav rule
  const navRule = document.querySelector(".nav-rule");
  if (navRule) navRule.style.borderTopColor = color;

  // Journal entries
  document.querySelectorAll(".journal-entry").forEach((el) => {
    el.style.color = color;
    el.style.borderBottomColor = color;
  });

  // Mobile collapsible header label
  const journalHeader = document.getElementById("journal-list-header");
  if (journalHeader) {
    journalHeader.style.color = color;
    journalHeader.style.borderBottomColor = color;
  }

  // Main content text
  const journalContent = document.querySelector("#journal-content");
  if (journalContent) journalContent.style.color = color;
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
