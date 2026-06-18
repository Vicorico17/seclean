const checklistTemplate = [
  {
    id: "beds",
    label: "Beds changed",
    note: "Fresh sheets, pillowcases, duvet covers",
    group: "Linen",
  },
  {
    id: "bathrooms",
    label: "Bathrooms reset",
    note: "Towels, amenities, trash, surfaces",
    group: "Cleaning",
  },
  {
    id: "kitchen",
    label: "Kitchen checked",
    note: "Dishes, coffee, dishwasher, counters",
    group: "Cleaning",
  },
  {
    id: "floors",
    label: "Floors and high-touch surfaces",
    note: "Vacuum, mop, remotes, switches",
    group: "Cleaning",
  },
  {
    id: "restock",
    label: "Consumables restocked",
    note: "Paper goods, coffee, soap, trash bags",
    group: "Inventory",
  },
  {
    id: "photos",
    label: "Completion photos",
    note: "Bedroom, bathroom, kitchen, entry",
    group: "Proof",
  },
];

const cleaners = [
  { id: "maya", name: "Maya Chen", zone: "Downtown", capacity: 4 },
  { id: "jon", name: "Jon Bell", zone: "Waterfront", capacity: 3 },
  { id: "sofia", name: "Sofia Reed", zone: "Uptown", capacity: 4 },
  { id: "marco", name: "Marco Diaz", zone: "Midtown", capacity: 3 },
];

const defaultState = {
  activeView: "dashboard",
  selectedJobId: "mercer-4b",
  filters: {
    search: "",
    cleaner: "all",
    risk: "all",
  },
  calendarSources: [
    {
      id: "guesty-main",
      name: "Guesty PMS",
      type: "PMS",
      url: "Connected account",
      status: "connected",
      syncMode: "API",
      lastSync: "8 min ago",
      imported: 42,
      conflicts: 1,
    },
    {
      id: "airbnb-downtown",
      name: "Airbnb Downtown",
      type: "iCal",
      url: "https://www.airbnb.com/calendar/ical/mercer.ics",
      status: "connected",
      syncMode: "iCal",
      lastSync: "17 min ago",
      imported: 18,
      conflicts: 0,
    },
    {
      id: "booking-waterfront",
      name: "Booking.com Waterfront",
      type: "iCal",
      url: "https://admin.booking.com/hotel/hoteladmin/ical.html",
      status: "paused",
      syncMode: "iCal",
      lastSync: "Yesterday 21:40",
      imported: 11,
      conflicts: 2,
    },
  ],
  inventory: [
    {
      id: "king-sheets",
      item: "King sheet sets",
      category: "Linen",
      onHand: 14,
      par: 24,
      reserved: 8,
      unit: "sets",
    },
    {
      id: "queen-sheets",
      item: "Queen sheet sets",
      category: "Linen",
      onHand: 28,
      par: 30,
      reserved: 12,
      unit: "sets",
    },
    {
      id: "bath-towels",
      item: "Bath towels",
      category: "Linen",
      onHand: 86,
      par: 120,
      reserved: 36,
      unit: "ea",
    },
    {
      id: "coffee-pods",
      item: "Coffee pods",
      category: "Amenity",
      onHand: 220,
      par: 300,
      reserved: 96,
      unit: "ea",
    },
    {
      id: "bath-tissue",
      item: "Bath tissue",
      category: "Consumable",
      onHand: 44,
      par: 96,
      reserved: 28,
      unit: "rolls",
    },
    {
      id: "dish-tabs",
      item: "Dishwasher tabs",
      category: "Consumable",
      onHand: 62,
      par: 80,
      reserved: 18,
      unit: "ea",
    },
  ],
  jobs: [
    {
      id: "mercer-4b",
      unit: "Mercer Loft 4B",
      property: "Mercer House",
      area: "SoHo",
      beds: "2 bed / 1 bath",
      checkout: "10:00",
      checkin: "15:00",
      guest: "Eli Park",
      channel: "Airbnb",
      status: "in-progress",
      priority: "same-day",
      cleanerId: "maya",
      inspector: "Jon Bell",
      linen: "delivered",
      restockNeeded: ["coffee-pods", "bath-tissue"],
      restockDone: ["coffee-pods"],
      completed: ["beds", "bathrooms", "floors"],
      photos: 3,
      updated: "12 min ago",
      blockers: [],
      issues: [
        {
          id: "issue-1",
          type: "Maintenance",
          title: "Loose towel bar in guest bath",
          severity: "medium",
          status: "open",
        },
      ],
    },
    {
      id: "harbor-12a",
      unit: "Harbor Suite 12A",
      property: "Harborline",
      area: "Waterfront",
      beds: "1 bed / 1 bath",
      checkout: "11:00",
      checkin: "16:00",
      guest: "Nora Singh",
      channel: "Booking.com",
      status: "blocked",
      priority: "same-day",
      cleanerId: "jon",
      inspector: "Maya Chen",
      linen: "needed",
      restockNeeded: ["king-sheets", "bath-towels", "bath-tissue"],
      restockDone: [],
      completed: ["bathrooms"],
      photos: 1,
      updated: "5 min ago",
      blockers: ["King sheets not delivered"],
      issues: [
        {
          id: "issue-2",
          type: "Inventory",
          title: "Missing king sheet set",
          severity: "high",
          status: "open",
        },
      ],
    },
    {
      id: "atlas-2c",
      unit: "Atlas Studio 2C",
      property: "Atlas Court",
      area: "Midtown",
      beds: "Studio / 1 bath",
      checkout: "09:30",
      checkin: "14:30",
      guest: "Mina Torres",
      channel: "Direct",
      status: "inspection",
      priority: "standard",
      cleanerId: "marco",
      inspector: "Sofia Reed",
      linen: "delivered",
      restockNeeded: ["coffee-pods", "dish-tabs"],
      restockDone: ["coffee-pods", "dish-tabs"],
      completed: ["beds", "bathrooms", "kitchen", "floors", "restock", "photos"],
      photos: 6,
      updated: "21 min ago",
      blockers: [],
      issues: [],
    },
    {
      id: "arden-9",
      unit: "Arden Flat 9",
      property: "Arden Walk",
      area: "Uptown",
      beds: "3 bed / 2 bath",
      checkout: "10:30",
      checkin: "17:00",
      guest: "Cal Webb",
      channel: "Vrbo",
      status: "assigned",
      priority: "standard",
      cleanerId: "sofia",
      inspector: "Marco Diaz",
      linen: "packed",
      restockNeeded: ["queen-sheets", "bath-towels", "bath-tissue", "coffee-pods"],
      restockDone: [],
      completed: [],
      photos: 0,
      updated: "32 min ago",
      blockers: [],
      issues: [],
    },
    {
      id: "pier-3",
      unit: "Pier Cottage 3",
      property: "Pier Cottages",
      area: "Waterfront",
      beds: "2 bed / 2 bath",
      checkout: "08:45",
      checkin: "13:30",
      guest: "Sam Okafor",
      channel: "Airbnb",
      status: "ready",
      priority: "early-checkin",
      cleanerId: "jon",
      inspector: "Maya Chen",
      linen: "delivered",
      restockNeeded: ["bath-towels", "bath-tissue"],
      restockDone: ["bath-towels", "bath-tissue"],
      completed: ["beds", "bathrooms", "kitchen", "floors", "restock", "photos"],
      photos: 7,
      updated: "48 min ago",
      blockers: [],
      issues: [],
    },
    {
      id: "civic-18d",
      unit: "Civic Tower 18D",
      property: "Civic Tower",
      area: "Downtown",
      beds: "1 bed / 1 bath",
      checkout: "12:00",
      checkin: "18:00",
      guest: "Hana Ivers",
      channel: "Airbnb",
      status: "blocked",
      priority: "standard",
      cleanerId: "maya",
      inspector: "Jon Bell",
      linen: "delivered",
      restockNeeded: ["coffee-pods"],
      restockDone: ["coffee-pods"],
      completed: ["beds", "kitchen", "floors"],
      photos: 2,
      updated: "9 min ago",
      blockers: ["Maintenance approval pending"],
      issues: [
        {
          id: "issue-3",
          type: "Damage",
          title: "Cracked dining chair",
          severity: "high",
          status: "open",
        },
      ],
    },
  ],
};

let state = loadState();

const statusConfig = {
  assigned: { label: "Assigned", tone: "assigned", column: "assigned" },
  "in-progress": { label: "In progress", tone: "progress", column: "progress" },
  blocked: { label: "Blocked", tone: "blocked", column: "blocked" },
  inspection: { label: "Inspection", tone: "inspection", column: "progress" },
  ready: { label: "Ready", tone: "ready", column: "ready" },
};

const boardColumns = [
  { id: "assigned", label: "Assigned" },
  { id: "progress", label: "In progress" },
  { id: "blocked", label: "Blocked" },
  { id: "ready", label: "Ready" },
];

const viewTitles = {
  dashboard: "Readiness Dashboard",
  inventory: "Linen & Stock",
  sync: "Booking Sync",
  team: "Cleaner Load",
  templates: "Turnover Templates",
};

const appView = document.querySelector("#appView");
const viewTitle = document.querySelector("#viewTitle");

document.addEventListener("click", handleClick);
document.addEventListener("change", handleChange);
document.addEventListener("input", handleInput);
document.addEventListener("submit", handleSubmit);

render();

function loadState() {
  try {
    const stored = localStorage.getItem("turnready-state");
    if (!stored) return structuredClone(defaultState);
    const parsed = JSON.parse(stored);
    return {
      ...structuredClone(defaultState),
      ...parsed,
      filters: { ...defaultState.filters, ...parsed.filters },
    };
  } catch {
    return structuredClone(defaultState);
  }
}

function saveState() {
  localStorage.setItem("turnready-state", JSON.stringify(state));
}

function render() {
  viewTitle.textContent = viewTitles[state.activeView];
  updateNav();
  updateSidebarCard();

  if (state.activeView === "inventory") {
    appView.innerHTML = renderInventoryView();
  } else if (state.activeView === "sync") {
    appView.innerHTML = renderSyncView();
  } else if (state.activeView === "team") {
    appView.innerHTML = renderTeamView();
  } else if (state.activeView === "templates") {
    appView.innerHTML = renderTemplatesView();
  } else {
    appView.innerHTML = renderDashboardView();
  }
}

function updateNav() {
  document.querySelectorAll(".nav-item").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.view === state.activeView);
  });
}

function updateSidebarCard() {
  const sorted = [...state.jobs]
    .filter((job) => job.status !== "ready")
    .sort((a, b) => timeToMinutes(a.checkin) - timeToMinutes(b.checkin));
  const next = sorted[0] || state.jobs.find((job) => job.status === "ready");
  document.querySelector("#nextCheckin").textContent = next
    ? `${next.checkin} ${next.unit}`
    : "--";
  document.querySelector("#nextCheckinMeta").textContent = next
    ? `${getCleaner(next.cleanerId).name} / ${formatStatus(next.status)}`
    : "No turns scheduled";
}

function renderDashboardView() {
  const jobs = getFilteredJobs();
  const selected = getSelectedJob();
  return `
    <div class="dashboard-grid">
      <div class="main-column">
        <section class="summary-band">
          <div class="summary-photo">
            <img src="assets/turnover-ready-room.png" alt="Guest-ready bedroom with fresh linens and towel cart" />
          </div>
          <div class="kpi-grid">
            ${renderKpiCards()}
          </div>
        </section>

        <section class="panel">
          <div class="panel-header">
            <div>
              <span class="eyebrow">Today</span>
              <h2>Turnover Board</h2>
            </div>
            <div class="toolbar">
              <span class="tag same-day">${countSameDay()} same-day</span>
              <span class="tag blocker">${countBlocked()} blocked</span>
            </div>
          </div>
          <div class="panel-body">
            ${renderControls()}
            ${renderBoard(jobs)}
          </div>
        </section>
      </div>

      <aside class="panel inspector">
        ${selected ? renderInspector(selected) : `<div class="empty">No turnover selected</div>`}
      </aside>
    </div>
  `;
}

function renderKpiCards() {
  const total = state.jobs.length;
  const ready = state.jobs.filter((job) => job.status === "ready").length;
  const blocked = countBlocked();
  const progress =
    Math.round(
      state.jobs.reduce((sum, job) => sum + getProgress(job), 0) / Math.max(total, 1)
    ) || 0;
  const lowStock = state.inventory.filter((item) => inventoryRisk(item) === "low").length;

  return [
    { label: "Ready for arrival", value: `${ready}/${total}`, hint: "units cleared" },
    { label: "Blocked turns", value: blocked, hint: "need manager action" },
    { label: "Avg. checklist", value: `${progress}%`, hint: "completion across jobs" },
    { label: "Low-stock items", value: lowStock, hint: "below operating par" },
  ]
    .map(
      (item) => `
        <div class="kpi">
          <span>${item.label}</span>
          <strong>${item.value}</strong>
          <span>${item.hint}</span>
        </div>
      `
    )
    .join("");
}

function renderControls() {
  return `
    <div class="controls">
      <input class="field" id="searchJobs" type="search" value="${escapeAttr(
        state.filters.search
      )}" placeholder="Search property, unit, guest" />
      <select class="select" id="filterCleaner">
        <option value="all">All cleaners</option>
        ${cleaners
          .map(
            (cleaner) =>
              `<option value="${cleaner.id}" ${
                state.filters.cleaner === cleaner.id ? "selected" : ""
              }>${cleaner.name}</option>`
          )
          .join("")}
      </select>
      <select class="select" id="filterRisk">
        <option value="all">All risk levels</option>
        <option value="blocked" ${state.filters.risk === "blocked" ? "selected" : ""}>Blocked</option>
        <option value="same-day" ${state.filters.risk === "same-day" ? "selected" : ""}>Same-day</option>
        <option value="ready" ${state.filters.risk === "ready" ? "selected" : ""}>Ready</option>
      </select>
    </div>
  `;
}

function renderBoard(jobs) {
  return `
    <div class="board" role="list">
      ${boardColumns
        .map((column) => {
          const columnJobs = jobs.filter(
            (job) => statusConfig[job.status].column === column.id
          );
          return `
            <section class="board-column" aria-label="${column.label}">
              <div class="column-header">
                <span>${column.label}</span>
                <span class="count-pill">${columnJobs.length}</span>
              </div>
              ${
                columnJobs.length
                  ? columnJobs.map(renderJobCard).join("")
                  : `<div class="empty">No turns</div>`
              }
            </section>
          `;
        })
        .join("")}
    </div>
  `;
}

function renderJobCard(job) {
  const progress = getProgress(job);
  const status = statusConfig[job.status];
  const classes = [
    "job-card",
    state.selectedJobId === job.id ? "is-selected" : "",
    job.status === "blocked" ? "is-blocked" : "",
    job.status === "ready" ? "is-ready" : "",
    job.status === "inspection" ? "is-inspection" : "",
  ]
    .filter(Boolean)
    .join(" ");
  return `
    <button class="${classes}" data-select-job="${job.id}" type="button">
      <div class="job-title">
        <div>
          <strong>${job.unit}</strong>
          <div class="job-meta">${job.property} / ${job.area}</div>
        </div>
        <span class="status-pill ${status.tone}">${status.label}</span>
      </div>
      <div class="small-meta">
        ${job.checkout} checkout / ${job.checkin} check-in<br />
        ${getCleaner(job.cleanerId).name} / ${job.guest}
      </div>
      <div class="progress-track" aria-label="${progress}% complete">
        <div class="progress-fill ${progress < 40 ? "danger" : progress < 70 ? "warn" : ""}" style="--value: ${progress}%"></div>
      </div>
      <div class="tag-row">
        ${job.priority === "same-day" ? `<span class="tag same-day">same-day</span>` : ""}
        ${job.priority === "early-checkin" ? `<span class="tag same-day">early</span>` : ""}
        ${job.linen !== "delivered" ? `<span class="tag blocker">${linenLabel(job.linen)}</span>` : ""}
        ${hasBlockingIssue(job) ? `<span class="tag blocker">issue open</span>` : ""}
        ${job.status === "ready" ? `<span class="tag ready">guest-ready</span>` : ""}
      </div>
    </button>
  `;
}

function renderInspector(job) {
  const progress = getProgress(job);
  const ready = canMarkReady(job);
  const completedText = `${job.completed.length}/${checklistTemplate.length}`;
  return `
    <div class="panel-header">
      <div class="unit-heading">
        <span class="eyebrow">Turnover detail</span>
        <div class="unit-row">
          <div>
            <h2>${job.unit}</h2>
            <div class="job-meta">${job.property} / ${job.beds}</div>
          </div>
          <span class="status-pill ${statusConfig[job.status].tone}">${formatStatus(job.status)}</span>
        </div>
      </div>
    </div>
    <div class="panel-body">
      <div class="detail-grid">
        <div class="detail"><span>Check-out</span><strong>${job.checkout}</strong></div>
        <div class="detail"><span>Check-in</span><strong>${job.checkin}</strong></div>
        <div class="detail"><span>Guest</span><strong>${job.guest}</strong></div>
        <div class="detail"><span>Channel</span><strong>${job.channel}</strong></div>
      </div>

      <div class="section-block">
        <div class="section-head">
          <h3>Owner</h3>
          <span class="small-meta">Updated ${job.updated}</span>
        </div>
        <select class="select" data-assign-cleaner="${job.id}">
          ${cleaners
            .map(
              (cleaner) =>
                `<option value="${cleaner.id}" ${
                  cleaner.id === job.cleanerId ? "selected" : ""
                }>${cleaner.name} / ${cleaner.zone}</option>`
            )
            .join("")}
        </select>
      </div>

      <div class="section-block">
        <div class="section-head">
          <h3>Status</h3>
          <span class="small-meta">${completedText} checks</span>
        </div>
        <div class="status-actions" role="group" aria-label="Turnover status">
          ${Object.entries(statusConfig)
            .map(
              ([status, config]) => `
                <button class="chip-button ${job.status === status ? "is-active" : ""}" type="button" data-status="${status}" data-job="${job.id}">
                  ${config.label}
                </button>
              `
            )
            .join("")}
        </div>
        <div class="progress-track" aria-label="${progress}% complete">
          <div class="progress-fill ${progress < 40 ? "danger" : progress < 70 ? "warn" : ""}" style="--value: ${progress}%"></div>
        </div>
      </div>

      <div class="section-block">
        <div class="section-head">
          <h3>Checklist</h3>
          <button class="chip-button" type="button" data-complete-all="${job.id}">Complete all</button>
        </div>
        <div class="checklist">
          ${checklistTemplate.map((item) => renderChecklistItem(job, item)).join("")}
        </div>
      </div>

      <div class="section-block">
        <div class="section-head">
          <h3>Linen & restock</h3>
          <span class="small-meta">${linenLabel(job.linen)}</span>
        </div>
        <div class="segmented">
          ${["needed", "packed", "delivered"]
            .map(
              (status) => `
                <button class="chip-button ${job.linen === status ? "is-active" : ""}" data-linen="${status}" data-job="${job.id}" type="button">
                  ${linenLabel(status)}
                </button>
              `
            )
            .join("")}
        </div>
        <div class="stock-list">
          ${job.restockNeeded.map((itemId) => renderRestockItem(job, itemId)).join("")}
        </div>
      </div>

      <div class="section-block">
        <div class="section-head">
          <h3>Issues</h3>
          <span class="small-meta">${openIssues(job).length} open</span>
        </div>
        <div class="issue-list">
          ${job.issues.length ? job.issues.map((issue) => renderIssue(job, issue)).join("") : `<div class="empty">No issues reported</div>`}
        </div>
        <form class="inline-form" data-issue-form="${job.id}">
          <input class="field" name="title" placeholder="Issue title" required />
          <div class="inline-grid">
            <select class="select" name="type">
              <option>Maintenance</option>
              <option>Inventory</option>
              <option>Damage</option>
              <option>Cleaning</option>
            </select>
            <select class="select" name="severity">
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="low">Low</option>
            </select>
          </div>
          <button class="button" type="submit">Add issue</button>
        </form>
      </div>

      <button class="button primary" type="button" data-ready="${job.id}" ${ready ? "" : "disabled"}>
        Mark guest-ready
      </button>
    </div>
  `;
}

function renderChecklistItem(job, item) {
  const checked = job.completed.includes(item.id);
  return `
    <label class="check-item">
      <input type="checkbox" data-check="${item.id}" data-job="${job.id}" ${checked ? "checked" : ""} />
      <span>
        <strong>${item.label}</strong>
        <span>${item.note}</span>
      </span>
    </label>
  `;
}

function renderRestockItem(job, itemId) {
  const item = state.inventory.find((stock) => stock.id === itemId);
  const done = job.restockDone.includes(itemId);
  if (!item) return "";
  return `
    <label class="check-item">
      <input type="checkbox" data-restock="${item.id}" data-job="${job.id}" ${done ? "checked" : ""} />
      <span>
        <strong>${item.item}</strong>
        <span>${item.onHand - item.reserved} ${item.unit} available after reservations</span>
      </span>
    </label>
  `;
}

function renderIssue(job, issue) {
  return `
    <div class="issue">
      <div class="issue-top">
        <div class="issue-title">
          <strong>${issue.title}</strong>
          <span class="small-meta">${issue.type} / ${capitalize(issue.severity)} severity</span>
        </div>
        <span class="status-pill ${issue.status === "open" ? "blocked" : "ready"}">${issue.status}</span>
      </div>
      ${
        issue.status === "open"
          ? `<button class="chip-button" type="button" data-resolve-issue="${issue.id}" data-job="${job.id}">Resolve</button>`
          : ""
      }
    </div>
  `;
}

function renderInventoryView() {
  const lowStock = state.inventory.filter((item) => inventoryRisk(item) === "low");
  return `
    <div class="split-layout">
      <section class="panel table-panel">
        <div class="panel-header">
          <div>
            <span class="eyebrow">Stock room</span>
            <h2>Inventory Position</h2>
          </div>
          <button class="button" type="button" data-simulate-restock>Receive stock</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Category</th>
              <th>On hand</th>
              <th>Reserved today</th>
              <th>Par</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${state.inventory.map(renderInventoryRow).join("")}
          </tbody>
        </table>
      </section>

      <aside class="panel">
        <div class="panel-header">
          <div>
            <span class="eyebrow">Action list</span>
            <h2>Low Stock</h2>
          </div>
          <span class="count-pill">${lowStock.length}</span>
        </div>
        <div class="panel-body stock-list">
          ${
            lowStock.length
              ? lowStock.map(renderLowStockCard).join("")
              : `<div class="empty">Inventory is above par thresholds</div>`
          }
        </div>
      </aside>
    </div>
  `;
}

function renderSyncView() {
  const activeSources = state.calendarSources.filter(
    (source) => source.status === "connected"
  ).length;
  const conflicts = state.calendarSources.reduce(
    (sum, source) => sum + source.conflicts,
    0
  );
  const imported = state.calendarSources.reduce(
    (sum, source) => sum + source.imported,
    0
  );

  return `
    <div class="sync-grid">
      <section class="panel">
        <div class="panel-header">
          <div>
            <span class="eyebrow">Channels</span>
            <h2>Booking Sources</h2>
          </div>
          <div class="toolbar">
            <button class="button" type="button" data-connect-guesty>Connect PMS</button>
            <button class="button primary" type="button" data-sync-all>Sync now</button>
          </div>
        </div>
        <div class="panel-body">
          <div class="metric-row">
            <div class="kpi">
              <span>Active sources</span>
              <strong>${activeSources}</strong>
              <span>PMS and calendar feeds</span>
            </div>
            <div class="kpi">
              <span>Reservations imported</span>
              <strong>${imported}</strong>
              <span>rolling 90-day window</span>
            </div>
            <div class="kpi">
              <span>Calendar conflicts</span>
              <strong>${conflicts}</strong>
              <span>need review before assigning</span>
            </div>
            <div class="kpi">
              <span>Today from feeds</span>
              <strong>${state.jobs.length}</strong>
              <span>turnovers generated</span>
            </div>
          </div>
        </div>
      </section>

      <aside class="panel">
        <div class="panel-header">
          <div>
            <span class="eyebrow">Add feed</span>
            <h2>Import iCal URL</h2>
          </div>
        </div>
        <div class="panel-body">
          <form class="inline-form" data-ical-form>
            <input class="field" name="name" placeholder="Source name, e.g. Airbnb Beach Unit" required />
            <input class="field" name="url" placeholder="https://.../calendar.ics" required />
            <select class="select" name="type">
              <option value="Airbnb iCal">Airbnb iCal</option>
              <option value="Booking.com iCal">Booking.com iCal</option>
              <option value="Vrbo iCal">Vrbo iCal</option>
              <option value="Other iCal">Other iCal</option>
            </select>
            <button class="button primary" type="submit">Add calendar feed</button>
          </form>
        </div>
      </aside>

      <section class="panel">
        <div class="panel-header">
          <div>
            <span class="eyebrow">Feed health</span>
            <h2>Connected Calendars</h2>
          </div>
        </div>
        <div class="panel-body source-grid">
          ${state.calendarSources.map(renderCalendarSource).join("")}
        </div>
      </section>

      <section class="panel">
        <div class="panel-header">
          <div>
            <span class="eyebrow">Import rules</span>
            <h2>Turnover Automation</h2>
          </div>
        </div>
        <div class="panel-body template-list">
          ${renderSyncRule("Reservation imported", "Create turnover between check-out and next check-in.")}
          ${renderSyncRule("Same-day arrival detected", "Raise priority and require completion photos.")}
          ${renderSyncRule("Calendar conflict found", "Hold unit in blocked state until a manager reviews overlap.")}
          ${renderSyncRule("Guesty PMS connected", "Prefer PMS reservation details over iCal-only placeholders.")}
        </div>
      </section>
    </div>
  `;
}

function renderCalendarSource(source) {
  const paused = source.status === "paused";
  return `
    <div class="source-card ${paused ? "is-paused" : ""}">
      <div class="source-type">
        <div>
          <strong>${escapeHtml(source.name)}</strong>
          <div class="small-meta">${escapeHtml(source.type)} / ${escapeHtml(source.syncMode)}</div>
        </div>
        <span class="status-pill ${paused ? "assigned" : "ready"}">${paused ? "Paused" : "Connected"}</span>
      </div>
      <div class="url-chip" title="${escapeAttr(source.url)}">${escapeHtml(source.url)}</div>
      <div class="detail-grid">
        <div class="detail"><span>Last sync</span><strong>${source.lastSync}</strong></div>
        <div class="detail"><span>Conflicts</span><strong>${source.conflicts}</strong></div>
      </div>
      <div class="source-actions">
        <button class="chip-button" type="button" data-toggle-source="${source.id}">${paused ? "Resume" : "Pause"}</button>
        <button class="chip-button" type="button" data-remove-source="${source.id}">Remove</button>
      </div>
    </div>
  `;
}

function renderSyncRule(title, detail) {
  return `
    <div class="template-row">
      <strong>${title}</strong>
      <span class="small-meta">${detail}</span>
    </div>
  `;
}

function renderInventoryRow(item) {
  const percent = Math.min(Math.round((item.onHand / item.par) * 100), 100);
  const risk = inventoryRisk(item);
  return `
    <tr>
      <td><strong>${item.item}</strong></td>
      <td>${item.category}</td>
      <td>${item.onHand} ${item.unit}</td>
      <td>${item.reserved} ${item.unit}</td>
      <td>${item.par} ${item.unit}</td>
      <td>
        <div class="stock-meter">
          <span class="status-pill ${risk === "low" ? "blocked" : risk === "watch" ? "assigned" : "ready"}">${risk === "low" ? "Low" : risk === "watch" ? "Watch" : "Healthy"}</span>
          <div class="progress-track">
            <div class="progress-fill ${risk === "low" ? "danger" : risk === "watch" ? "warn" : ""}" style="--value: ${percent}%"></div>
          </div>
        </div>
      </td>
    </tr>
  `;
}

function renderLowStockCard(item) {
  const shortage = Math.max(item.par - item.onHand, 0);
  return `
    <div class="stock-row">
      <div class="stock-top">
        <div>
          <strong>${item.item}</strong>
          <div class="small-meta">${item.category}</div>
        </div>
        <span class="status-pill blocked">Order ${shortage}</span>
      </div>
      <div class="small-meta">${item.reserved} ${item.unit} already reserved for today</div>
    </div>
  `;
}

function renderTeamView() {
  return `
    <div class="split-layout">
      <section class="panel">
        <div class="panel-header">
          <div>
            <span class="eyebrow">Field team</span>
            <h2>Assignments</h2>
          </div>
          <span class="count-pill">${state.jobs.length} turns</span>
        </div>
        <div class="panel-body team-list">
          ${cleaners.map(renderCleanerRow).join("")}
        </div>
      </section>

      <section class="panel">
        <div class="panel-header">
          <div>
            <span class="eyebrow">Arrival order</span>
            <h2>Check-in Timeline</h2>
          </div>
        </div>
        <div class="panel-body timeline">
          ${[...state.jobs]
            .sort((a, b) => timeToMinutes(a.checkin) - timeToMinutes(b.checkin))
            .map(renderTimelineRow)
            .join("")}
        </div>
      </section>
    </div>
  `;
}

function renderCleanerRow(cleaner) {
  const assigned = state.jobs.filter((job) => job.cleanerId === cleaner.id);
  const active = assigned.filter((job) => job.status !== "ready").length;
  const percent = Math.min(Math.round((active / cleaner.capacity) * 100), 100);
  return `
    <div class="team-row">
      <div class="team-top">
        <div>
          <strong>${cleaner.name}</strong>
          <div class="small-meta">${cleaner.zone} / ${active} active of ${cleaner.capacity}</div>
        </div>
        <span class="status-pill ${active > cleaner.capacity ? "blocked" : active === cleaner.capacity ? "assigned" : "ready"}">${active > cleaner.capacity ? "Over" : "Available"}</span>
      </div>
      <div class="progress-track">
        <div class="progress-fill ${percent > 90 ? "danger" : percent > 70 ? "warn" : ""}" style="--value: ${percent}%"></div>
      </div>
      <div class="tag-row">
        ${assigned
          .map(
            (job) =>
              `<button class="chip-button" type="button" data-open-job="${job.id}">${job.unit}</button>`
          )
          .join("")}
      </div>
    </div>
  `;
}

function renderTimelineRow(job) {
  return `
    <div class="timeline-row">
      <div class="timeline-time">${job.checkin}</div>
      <div>
        <div class="timeline-top">
          <strong>${job.unit}</strong>
          <span class="status-pill ${statusConfig[job.status].tone}">${formatStatus(job.status)}</span>
        </div>
        <div class="small-meta">${job.guest} / ${getCleaner(job.cleanerId).name} / ${job.area}</div>
      </div>
    </div>
  `;
}

function renderTemplatesView() {
  const grouped = checklistTemplate.reduce((groups, item) => {
    groups[item.group] ||= [];
    groups[item.group].push(item);
    return groups;
  }, {});
  return `
    <section class="panel">
      <div class="panel-header">
        <div>
          <span class="eyebrow">Standard turn</span>
          <h2>Checklist Template</h2>
        </div>
        <span class="count-pill">${checklistTemplate.length} checks</span>
      </div>
      <div class="panel-body template-list">
        ${Object.entries(grouped)
          .map(
            ([group, items]) => `
              <div class="template-row">
                <div class="section-head">
                  <h3>${group}</h3>
                  <span class="small-meta">${items.length} items</span>
                </div>
                <div class="checklist">
                  ${items
                    .map(
                      (item) => `
                        <div class="check-item">
                          <span class="nav-symbol" aria-hidden="true"></span>
                          <span>
                            <strong>${item.label}</strong>
                            <span>${item.note}</span>
                          </span>
                        </div>
                      `
                    )
                    .join("")}
                </div>
              </div>
            `
          )
          .join("")}
      </div>
    </section>
  `;
}

function handleClick(event) {
  const navButton = event.target.closest("[data-view]");
  if (navButton) {
    state.activeView = navButton.dataset.view;
    saveState();
    render();
    return;
  }

  const selectedJob = event.target.closest("[data-select-job]");
  if (selectedJob) {
    state.selectedJobId = selectedJob.dataset.selectJob;
    saveState();
    render();
    return;
  }

  const openJob = event.target.closest("[data-open-job]");
  if (openJob) {
    state.selectedJobId = openJob.dataset.openJob;
    state.activeView = "dashboard";
    saveState();
    render();
    return;
  }

  const statusButton = event.target.closest("[data-status]");
  if (statusButton) {
    const job = findJob(statusButton.dataset.job);
    job.status = statusButton.dataset.status;
    job.updated = "just now";
    saveState();
    render();
    toast(`${job.unit} moved to ${formatStatus(job.status)}`);
    return;
  }

  const linenButton = event.target.closest("[data-linen]");
  if (linenButton) {
    const job = findJob(linenButton.dataset.job);
    job.linen = linenButton.dataset.linen;
    if (job.linen === "delivered") {
      job.blockers = job.blockers.filter(
        (blocker) => !blocker.toLowerCase().includes("sheet")
      );
    }
    job.updated = "just now";
    syncJobStatus(job);
    saveState();
    render();
    return;
  }

  const completeAll = event.target.closest("[data-complete-all]");
  if (completeAll) {
    const job = findJob(completeAll.dataset.completeAll);
    job.completed = checklistTemplate.map((item) => item.id);
    job.restockDone = [...job.restockNeeded];
    job.photos = Math.max(job.photos, 4);
    job.updated = "just now";
    syncJobStatus(job);
    saveState();
    render();
    toast(`${job.unit} checklist completed`);
    return;
  }

  const resolveIssue = event.target.closest("[data-resolve-issue]");
  if (resolveIssue) {
    const job = findJob(resolveIssue.dataset.job);
    const issue = job.issues.find((item) => item.id === resolveIssue.dataset.resolveIssue);
    if (issue) issue.status = "resolved";
    job.blockers = [];
    job.updated = "just now";
    syncJobStatus(job);
    saveState();
    render();
    return;
  }

  const readyButton = event.target.closest("[data-ready]");
  if (readyButton) {
    const job = findJob(readyButton.dataset.ready);
    if (!canMarkReady(job)) return;
    job.status = "ready";
    job.updated = "just now";
    saveState();
    render();
    toast(`${job.unit} is guest-ready`);
    return;
  }

  if (event.target.closest("#resetDemo")) {
    state = structuredClone(defaultState);
    saveState();
    render();
    toast("Demo data reset");
    return;
  }

  if (event.target.closest("#quickIssue")) {
    state.activeView = "dashboard";
    const job = getSelectedJob() || state.jobs[0];
    state.selectedJobId = job.id;
    saveState();
    render();
    const input = document.querySelector("[data-issue-form] input[name='title']");
    input?.focus();
    return;
  }

  if (event.target.closest("[data-simulate-restock]")) {
    state.inventory = state.inventory.map((item) => ({
      ...item,
      onHand: Math.max(item.onHand, item.par),
    }));
    saveState();
    render();
    toast("Stock received to par levels");
    return;
  }

  if (event.target.closest("[data-sync-all]")) {
    state.calendarSources = state.calendarSources.map((source) => ({
      ...source,
      lastSync: source.status === "connected" ? "just now" : source.lastSync,
    }));
    saveState();
    render();
    toast("Connected sources synced");
    return;
  }

  if (event.target.closest("[data-connect-guesty]")) {
    const hasGuesty = state.calendarSources.some((source) => source.id === "guesty-main");
    if (!hasGuesty) {
      state.calendarSources.unshift({
        id: "guesty-main",
        name: "Guesty PMS",
        type: "PMS",
        url: "Connected account",
        status: "connected",
        syncMode: "API",
        lastSync: "just now",
        imported: 0,
        conflicts: 0,
      });
    }
    state.activeView = "sync";
    saveState();
    render();
    toast("PMS connection staged");
    return;
  }

  const toggleSource = event.target.closest("[data-toggle-source]");
  if (toggleSource) {
    const source = findSource(toggleSource.dataset.toggleSource);
    source.status = source.status === "paused" ? "connected" : "paused";
    source.lastSync = source.status === "connected" ? "just now" : source.lastSync;
    saveState();
    render();
    return;
  }

  const removeSource = event.target.closest("[data-remove-source]");
  if (removeSource) {
    state.calendarSources = state.calendarSources.filter(
      (source) => source.id !== removeSource.dataset.removeSource
    );
    saveState();
    render();
  }
}

function handleChange(event) {
  const check = event.target.closest("[data-check]");
  if (check) {
    const job = findJob(check.dataset.job);
    toggleListValue(job.completed, check.dataset.check, check.checked);
    job.updated = "just now";
    syncJobStatus(job);
    saveState();
    render();
    return;
  }

  const restock = event.target.closest("[data-restock]");
  if (restock) {
    const job = findJob(restock.dataset.job);
    toggleListValue(job.restockDone, restock.dataset.restock, restock.checked);
    if (job.restockNeeded.every((item) => job.restockDone.includes(item))) {
      toggleListValue(job.completed, "restock", true);
    } else {
      toggleListValue(job.completed, "restock", false);
    }
    job.updated = "just now";
    syncJobStatus(job);
    saveState();
    render();
    return;
  }

  const cleanerSelect = event.target.closest("[data-assign-cleaner]");
  if (cleanerSelect) {
    const job = findJob(cleanerSelect.dataset.assignCleaner);
    job.cleanerId = cleanerSelect.value;
    job.updated = "just now";
    saveState();
    render();
    return;
  }

  if (event.target.id === "filterCleaner") {
    state.filters.cleaner = event.target.value;
    saveState();
    render();
    return;
  }

  if (event.target.id === "filterRisk") {
    state.filters.risk = event.target.value;
    saveState();
    render();
  }
}

function handleInput(event) {
  if (event.target.id === "searchJobs") {
    state.filters.search = event.target.value;
    saveState();
    render();
  }
}

function handleSubmit(event) {
  const issueForm = event.target.closest("[data-issue-form]");
  if (issueForm) {
    submitIssue(event);
    return;
  }

  const icalForm = event.target.closest("[data-ical-form]");
  if (icalForm) {
    submitIcal(event);
  }
}

function submitIssue(event) {
  event.preventDefault();
  const form = event.target;
  const job = findJob(form.dataset.issueForm);
  const data = new FormData(form);
  const title = String(data.get("title") || "").trim();
  if (!title) return;

  const severity = String(data.get("severity"));
  job.issues.push({
    id: `issue-${Date.now()}`,
    type: String(data.get("type")),
    title,
    severity,
    status: "open",
  });
  if (severity === "high") {
    job.status = "blocked";
    job.blockers = unique([...job.blockers, title]);
  }
  job.updated = "just now";
  saveState();
  render();
  toast(`${job.unit} issue added`);
}

function submitIcal(event) {
  event.preventDefault();
  const form = event.target;
  const data = new FormData(form);
  const name = String(data.get("name") || "").trim();
  const url = String(data.get("url") || "").trim();
  const type = String(data.get("type") || "Other iCal");

  if (!name || !url) return;
  state.calendarSources.unshift({
    id: `ical-${Date.now()}`,
    name,
    type: "iCal",
    url,
    status: "connected",
    syncMode: type,
    lastSync: "just now",
    imported: 0,
    conflicts: url.endsWith(".ics") ? 0 : 1,
  });
  saveState();
  render();
  toast(`${name} added`);
}

function getFilteredJobs() {
  const query = state.filters.search.trim().toLowerCase();
  return state.jobs.filter((job) => {
    const matchesQuery =
      !query ||
      [job.unit, job.property, job.area, job.guest, getCleaner(job.cleanerId).name]
        .join(" ")
        .toLowerCase()
        .includes(query);
    const matchesCleaner =
      state.filters.cleaner === "all" || state.filters.cleaner === job.cleanerId;
    const matchesRisk =
      state.filters.risk === "all" ||
      (state.filters.risk === "blocked" && job.status === "blocked") ||
      (state.filters.risk === "same-day" && job.priority === "same-day") ||
      (state.filters.risk === "ready" && job.status === "ready");
    return matchesQuery && matchesCleaner && matchesRisk;
  });
}

function getSelectedJob() {
  return findJob(state.selectedJobId) || state.jobs[0];
}

function findJob(id) {
  return state.jobs.find((job) => job.id === id);
}

function findSource(id) {
  return state.calendarSources.find((source) => source.id === id);
}

function getCleaner(id) {
  return cleaners.find((cleaner) => cleaner.id === id) || cleaners[0];
}

function getProgress(job) {
  return Math.round((job.completed.length / checklistTemplate.length) * 100);
}

function countSameDay() {
  return state.jobs.filter((job) => job.priority === "same-day").length;
}

function countBlocked() {
  return state.jobs.filter((job) => job.status === "blocked").length;
}

function openIssues(job) {
  return job.issues.filter((issue) => issue.status === "open");
}

function hasBlockingIssue(job) {
  return openIssues(job).some((issue) => issue.severity === "high");
}

function canMarkReady(job) {
  return (
    job.completed.length === checklistTemplate.length &&
    job.linen === "delivered" &&
    job.restockNeeded.every((item) => job.restockDone.includes(item)) &&
    !hasBlockingIssue(job)
  );
}

function syncJobStatus(job) {
  if (hasBlockingIssue(job) || job.blockers.length || job.linen === "needed") {
    job.status = "blocked";
  } else if (canMarkReady(job) && job.status !== "ready") {
    job.status = "inspection";
  } else if (job.completed.length > 0 && job.status === "assigned") {
    job.status = "in-progress";
  } else if (job.status === "blocked" && !hasBlockingIssue(job)) {
    job.status = job.completed.length ? "in-progress" : "assigned";
  }
}

function inventoryRisk(item) {
  const available = item.onHand - item.reserved;
  if (available < item.par * 0.35) return "low";
  if (available < item.par * 0.6) return "watch";
  return "healthy";
}

function toggleListValue(list, value, enabled) {
  const index = list.indexOf(value);
  if (enabled && index === -1) list.push(value);
  if (!enabled && index !== -1) list.splice(index, 1);
}

function unique(items) {
  return [...new Set(items)];
}

function formatStatus(status) {
  return statusConfig[status]?.label || capitalize(status);
}

function linenLabel(status) {
  return {
    needed: "Linen needed",
    packed: "Linen packed",
    delivered: "Linen delivered",
  }[status];
}

function capitalize(value) {
  return String(value).charAt(0).toUpperCase() + String(value).slice(1);
}

function timeToMinutes(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function escapeAttr(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function toast(message) {
  const previous = document.querySelector(".toast");
  previous?.remove();
  const node = document.createElement("div");
  node.className = "toast";
  node.textContent = message;
  document.body.append(node);
  window.setTimeout(() => node.remove(), 2600);
}
