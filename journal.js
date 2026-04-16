const journalEntries = [
    {
        date: "TUE 14/04/26",
        title: "STREET VIEW ANIMATED POSTER",
        type: "project",
        href: null
    },
    {
        date: "TUE 14/04/26",
        title: "REFLECTION ON SHADOWS",
        type: "project",
        href: null
    },
    {
        date: "SUN 12/04/26",
        title: "WOLVES HOWLING VISUAL TOY",
        type: "project",
        href: null
    },
    {
        date: "SAT 11/04/26",
        title: "TD BITMAP TRAIN RIDE",
        type: "project",
        href: null
    },
    {
        date: "WED 08/04/26",
        title: "TD GENERATIVE SHAPES",
        type: "project",
        href: null
    },
    {
        date: "TUE 07/04/26",
        title: "TD AUDIOREACTIVE NOISE",
        type: "project",
        href: null
    },
    {
        date: "TUE 07/04/26",
        title: "TD WHITE VISUALS",
        type: "project",
        href: null
    },
    {
        date: "TUE 31/03/26",
        title: "GRAFFITI IN THE LAWSCAPE",
        type: "anchor",
        href: null
    },
    {
        date: "SAT 28/03/26",
        title: "SITUATIONIST MOVEMENT: THE MYTH OF THE CREATIVE DIRECTOR",
        type: "anchor",
        href: null
    },
    {
        date: "THU 26/03/26",
        title: "SUN & SKY WEB JOURNAL",
        type: "project",
        href: null
    },
    {
        date: "TUE 24/03/26",
        title: "IN A CRIT,",
        type: "project",
        href: null
    },
    {
        date: "MON 23/03/26",
        title: "MOVING BIRDS",
        type: "project",
        href: null
    },
    {
        date: "MON 23/03/26",
        title: "A SUBTLE SYNCHRONICITY @3DITIONAL",
        type: "anchor",
        href: null
    },
    {
        date: "SAT 21/03/26",
        title: "TOUCHDESIGNER EXPERIMENT 1",
        type: "project",
        href: null
    },
    {
        date: "MON 16/03/26",
        title: "ARE YOU ONE OR TWO?",
        type: "anchor",
        href: null
    },
    {
        date: "TUE 10/03/26",
        title: "DARREN RAVEN'S LECTURE ZINES",
        type: "anchor",
        href: null
    },
    {
        date: "MON 09/03/26",
        title: "THE HORSE IN STUDIO 5A",
        type: "project",
        href: null
    },
    {
        date: "MON 23/02/26",
        title: "ARE MEMBERSHIP MODELS THE FUTURE OF INDEPENDENT MEDIA?",
        type: "anchor",
        href: null
    },
    {
        date: "THU 19/02/26",
        title: "STEAL LIKE AN ARTIST – GAMBERGE",
        type: "project",
        href: null
    },
    {
        date: "WED 18/02/26",
        title: "MAKING PUBLIC INFORMATION ACTUALLY ACCESSIBLE TO THE PUBLIC IS THE RESPONSIBILITY OF DESIGNERS",
        type: "anchor",
        href: "1makingpublicinfo.html"
    }
];

function buildJournalList() {
    const list = document.getElementById("journal-list");
    if (!list) return;

    // Detect which page we're on
    const currentPage = window.location.pathname.split("/").pop();

    // Build the collapsible header for mobile
    const header = document.createElement("div");
    header.id = "journal-list-header";
    header.onclick = toggleJournalList;

    // Find active entry for the mobile label
    const activeEntry = journalEntries.find((e) => e.href === currentPage);
    const labelText = activeEntry
        ? activeEntry.date + " — " + activeEntry.title.substring(0, 60) + "..."
        : "JOURNAL ENTRIES";

    header.innerHTML = `<span id="journal-list-label">${labelText}</span>`;
    list.appendChild(header);

    // Build each journal entry
    journalEntries.forEach((entry) => {
        const isActive = entry.href === currentPage;
        const icon =
            entry.type === "anchor"
                ? '<img class="icon-sun" src="img/sun-icon.svg" alt="Contextual Anchor" />'
                : '<img class="icon-star" src="img/star-icon.svg" alt="Project" />';

        const entryHTML = `
            <div class="entry-date">${entry.date}</div>
            <div class="entry-title">${entry.title}</div>
            <div class="entry-key">${icon}</div>
        `;

        let entryEl;
        if (entry.href) {
            entryEl = document.createElement("a");
            entryEl.href = entry.href;
            entryEl.onclick = () => setActiveEntry(entry.title, entry.date);
        } else {
            entryEl = document.createElement("div");
        }

        entryEl.className = "journal-entry" + (isActive ? " active" : "");
        entryEl.innerHTML = entryHTML;
        list.appendChild(entryEl);
    });
    if (typeof updateTextColor === "function") {
        updateTextColor();
    }
}

function toggleJournalList() {
    const list = document.getElementById("journal-list");
    if (list) list.classList.toggle("collapsed");
}

function setActiveEntry(title, date) {
    const label = document.getElementById("journal-list-label");
    if (label) label.textContent = date + " — " + title.substring(0, 100) + "...";
    const list = document.getElementById("journal-list");
    if (list) list.classList.add("collapsed");
}

// Build the list when the page loads
document.addEventListener("DOMContentLoaded", buildJournalList);
