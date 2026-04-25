/* ─────────────────────────────────────────────
   SKY + TEXT COLOUR
───────────────────────────────────────────── */

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
  if (sky) sky.className = "sky " + getSkyClass(hour);
}

updateSky();
setInterval(updateSky, 60000);

function updateTextColor() {
  const hour = new Date().getHours();
  const isNight = (hour >= 0 && hour < 5) || (hour >= 18 && hour < 24);
  const color = isNight ? "#7d9bd5" : "#0E2657";
  const hoverColor = isNight ? "#a8c0e8" : "#1e3a8a";

  document.querySelectorAll(".nav-item").forEach((el) => {
    el.style.color = color;
    el.addEventListener("mouseenter", () => (el.style.color = hoverColor));
    el.addEventListener("mouseleave", () => (el.style.color = color));
  });

  const navRule = document.querySelector(".nav-rule");
  if (navRule) navRule.style.borderTopColor = color;

  document.querySelectorAll(".journal-entry").forEach((el) => {
    el.style.color = color;
    el.style.borderBottomColor = color;
    el.addEventListener("mouseenter", () => (el.style.color = hoverColor));
    el.addEventListener("mouseleave", () => (el.style.color = color));
  });

  const journalHeader = document.getElementById("journal-list-header");
  if (journalHeader) {
    journalHeader.style.color = color;
    journalHeader.style.borderBottomColor = color;
  }

  const journalContent = document.querySelector("#journal-content");
  if (journalContent) journalContent.style.color = color;

  document.querySelectorAll("#journal-content a").forEach((el) => {
    el.addEventListener("mouseenter", () => (el.style.color = hoverColor));
    el.addEventListener("mouseleave", () => (el.style.color = ""));
  });

  const backBar = document.getElementById("mobile-back-bar");
  if (backBar) backBar.style.color = color;
}

updateTextColor();
setInterval(updateTextColor, 60000);

/* ─────────────────────────────────────────────
   LEGACY DESKTOP HELPERS (journal.js calls these)
───────────────────────────────────────────── */

function toggleJournalList() {
  const list = document.getElementById("journal-list");
  if (list) list.classList.toggle("collapsed");
}

function setActiveEntry(title, date) {
  const label = document.getElementById("journal-list-label");
  if (label) label.textContent = date + " — " + title;
  const list = document.getElementById("journal-list");
  if (list) list.classList.add("collapsed");
}

/* ─────────────────────────────────────────────
   MOBILE DETECTION + PAGE TYPE
───────────────────────────────────────────── */

function isMobile() {
  return window.innerWidth <= 800;
}

function getPageType() {
  const page = window.location.pathname.split("/").pop();
  if (!page || page === "" || page === "index.html") return "index";
  return "entry";
}

/* ─────────────────────────────────────────────
   MOBILE DRAWER — open / close
───────────────────────────────────────────── */

let drawerOpen = false;

function openDrawer() {
  const wrapper = document.getElementById("wrapper");
  if (wrapper) wrapper.classList.add("drawer-open");
  const backBar = document.getElementById("mobile-back-bar");
  if (backBar) backBar.classList.add("drawer-open");
  drawerOpen = true;
  updateBackBarArrow();
}

function closeDrawer() {
  const wrapper = document.getElementById("wrapper");
  if (wrapper) wrapper.classList.remove("drawer-open");
  const backBar = document.getElementById("mobile-back-bar");
  if (backBar) backBar.classList.remove("drawer-open");
  drawerOpen = false;
  updateBackBarArrow();
}

function toggleDrawer() {
  if (drawerOpen) {
    closeDrawer();
  } else {
    openDrawer();
  }
}

/* ─────────────────────────────────────────────
   MOBILE BACK BAR
───────────────────────────────────────────── */

function updateBackBarArrow() {
  const arrow = document.getElementById("back-bar-arrow");
  if (!arrow) return;
  arrow.textContent = drawerOpen ? "→" : "←";
}

function createMobileBackBar() {
  if (document.getElementById("mobile-back-bar")) return;

  const typeBtn = document.querySelector(".content-type");
  const isAnchor = typeBtn && typeBtn.classList.contains("anchor");
  const iconSrc = isAnchor ? "img/sun-icon.svg" : "img/star-icon.svg";
  const iconAlt = isAnchor ? "Contextual Anchor" : "Project";

  const currentPage = window.location.pathname.split("/").pop();
  const activeEntry = typeof journalEntries !== "undefined" ? journalEntries.find((e) => e.href === currentPage) : null;
  const labelText = activeEntry ? activeEntry.title : "";

  const bar = document.createElement("div");
  bar.id = "mobile-back-bar";
  bar.setAttribute("role", "button");
  bar.setAttribute("aria-label", "Toggle journal list");
  bar.tabIndex = 0;

  bar.innerHTML = `
    <span id="back-bar-arrow" class="back-bar-arrow">←</span>
    <img class="${isAnchor ? "icon-sun" : "icon-star"} back-bar-icon"
         src="${iconSrc}" alt="${iconAlt}" />
    <span class="back-bar-label">${labelText}</span>
  `;

  bar.addEventListener("click", toggleDrawer);
  bar.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") toggleDrawer();
  });

  const nav = document.querySelector("nav");
  if (nav && nav.parentNode) {
    nav.parentNode.insertBefore(bar, nav.nextSibling);
  }

  updateTextColor();
}

/* ─────────────────────────────────────────────
   MOBILE INIT
───────────────────────────────────────────── */

function initMobile() {
  if (!isMobile()) return;

  const pageType = getPageType();
  const list = document.getElementById("journal-list");
  const header = document.getElementById("journal-list-header");

  if (header) header.style.display = "none";

  if (pageType === "index") {
    if (list) {
      list.classList.remove("collapsed");
      list.classList.add("mobile-index-list");
    }
    return;
  }

  if (list) list.classList.remove("collapsed");

  createMobileBackBar();
  closeDrawer();
}

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(initMobile, 0);
});

let wasMobile = isMobile();
window.addEventListener("resize", () => {
  const nowMobile = isMobile();
  if (nowMobile !== wasMobile) {
    wasMobile = nowMobile;
    updateSky();
    updateTextColor();
  }
});
