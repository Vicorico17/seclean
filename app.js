const checklistTemplate = [
  { id: "beds", label: "Beds changed", note: "Fresh sheets, pillowcases, duvet covers", group: "Linen" },
  { id: "bathrooms", label: "Bathrooms reset", note: "Towels, amenities, trash, surfaces", group: "Cleaning" },
  { id: "kitchen", label: "Kitchen checked", note: "Dishes, coffee, dishwasher, counters", group: "Cleaning" },
  { id: "floors", label: "Floors and surfaces", note: "Vacuum, mop, remotes, switches", group: "Cleaning" },
  { id: "restock", label: "Consumables restocked", note: "Paper goods, coffee, soap, trash bags", group: "Inventory" },
  { id: "photos", label: "Completion photos", note: "Bedroom, bathroom, kitchen, entry", group: "Proof" },
];

const cleaners = [
  { id: "maya", name: "Maya Chen", zone: "Downtown", capacity: 4 },
  { id: "jon", name: "Jon Bell", zone: "Waterfront", capacity: 3 },
  { id: "sofia", name: "Sofia Reed", zone: "Uptown", capacity: 4 },
  { id: "marco", name: "Marco Diaz", zone: "Midtown", capacity: 3 },
];

const defaultState = {
  activeView: "manager",
  selectedJobId: "mercer-4b",
  cleanerSelectedJobId: "mercer-4b",
  activeCleanerId: "maya",
  managerFilter: "attention",
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
    { id: "king-sheets", item: "King sheet sets", category: "Linen", onHand: 14, par: 24, reserved: 8, unit: "sets" },
    { id: "queen-sheets", item: "Queen sheet sets", category: "Linen", onHand: 28, par: 30, reserved: 12, unit: "sets" },
    { id: "bath-towels", item: "Bath towels", category: "Linen", onHand: 86, par: 120, reserved: 36, unit: "ea" },
    { id: "coffee-pods", item: "Coffee pods", category: "Amenity", onHand: 220, par: 300, reserved: 96, unit: "ea" },
    { id: "bath-tissue", item: "Bath tissue", category: "Consumable", onHand: 44, par: 96, reserved: 28, unit: "rolls" },
    { id: "dish-tabs", item: "Dishwasher tabs", category: "Consumable", onHand: 62, par: 80, reserved: 18, unit: "ea" },
    { id: "hand-soap", item: "Hand soap", category: "Amenity", onHand: 38, par: 60, reserved: 14, unit: "bottles" },
    { id: "trash-bags", item: "Trash bags", category: "Consumable", onHand: 110, par: 140, reserved: 42, unit: "ea" },
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
      restockNeeded: ["coffee-pods", "bath-tissue", "hand-soap"],
      restockDone: ["coffee-pods"],
      completed: ["beds", "bathrooms", "floors"],
      photos: 3,
      updated: "12 min ago",
      blockers: [],
      issues: [
        { id: "issue-1", type: "Maintenance", title: "Loose towel bar in guest bath", severity: "medium", status: "open" },
      ],
      addedItems: [
        { id: "add-1", itemId: "coffee-pods", itemName: "Coffee pods", qty: 12, unit: "ea", area: "Kitchen", note: "Restocked counter jar", by: "Maya Chen", time: "12 min ago" },
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
        { id: "issue-2", type: "Inventory", title: "Missing king sheet set", severity: "high", status: "open" },
      ],
      addedItems: [],
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
      addedItems: [
        { id: "add-2", itemId: "dish-tabs", itemName: "Dishwasher tabs", qty: 4, unit: "ea", area: "Kitchen", note: "", by: "Marco Diaz", time: "21 min ago" },
      ],
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
      restockNeeded: ["queen-sheets", "bath-towels", "bath-tissue", "coffee-pods", "trash-bags"],
      restockDone: [],
      completed: [],
      photos: 0,
      updated: "32 min ago",
      blockers: [],
      issues: [],
      addedItems: [],
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
      addedItems: [
        { id: "add-3", itemId: "bath-towels", itemName: "Bath towels", qty: 8, unit: "ea", area: "Bathroom", note: "Two sets per bath", by: "Jon Bell", time: "48 min ago" },
      ],
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
        { id: "issue-3", type: "Damage", title: "Cracked dining chair", severity: "high", status: "open" },
      ],
      addedItems: [
        { id: "add-4", itemId: "coffee-pods", itemName: "Coffee pods", qty: 10, unit: "ea", area: "Kitchen", note: "", by: "Maya Chen", time: "9 min ago" },
      ],
    },
  ],
};

const statusConfig = {
  assigned: { label: "Assigned", tone: "assigned" },
  "in-progress": { label: "In progress", tone: "progress" },
  blocked: { label: "Blocked", tone: "blocked" },
  inspection: { label: "Inspection", tone: "inspection" },
  ready: { label: "Ready", tone: "ready" },
};

const viewTitles = {
  manager: "Manager Dashboard",
  cleaner: "Cleaner Portal",
  inventory: "Inventory",
  sync: "Booking Sync",
  team: "Team",
};

let state = loadState();

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
    return normalizeState(stored ? JSON.parse(stored) : defaultState);
  } catch {
    return structuredClone(defaultState);
  }
}

function normalizeState(raw) {
  const base = structuredClone(defaultState);
  const incoming = raw || {};
  const normalized = {
    ...base,
    ...incoming,
    filters: { ...base.filters, ...(incoming.filters || {}) },
    calendarSources: incoming.calendarSources || base.calendarSources,
    inventory: incoming.inventory || base.inventory,
    jobs: (incoming.jobs || base.jobs).map((job) => ({
      completed: [],
      restockNeeded: [],
      restockDone: [],
      blockers: [],
      issues: [],
      addedItems: [],
      photos: 0,
      ...job,
    })),
  };

  if (normalized.activeView === "dashboard" || !viewTitles[normalized.activeView]) {
    normalized.activeView = "manager";
  }
  if (!normalized.jobs.some((job) => job.id === normalized.selectedJobId)) {
    normalized.selectedJobId = normalized.jobs[0]?.id || "";
  }
  if (!cleaners.some((cleaner) => cleaner.id === normalized.activeCleanerId)) {
    normalized.activeCleanerId = cleaners[0].id;
  }
  if (!normalized.jobs.some((job) => job.id === normalized.cleanerSelectedJobId)) {
    normalized.cleanerSelectedJobId =
      normalized.jobs.find((job) => job.cleanerId === normalized.activeCleanerId)?.id ||
      normalized.selectedJobId;
  }
  return normalized;
}

function saveState() {
  localStorage.setItem("turnready-state", JSON.stringify(state));
}

function render() {
  viewTitle.textContent = viewTitles[state.activeView];
  updateNav();
  updateSidebarCard();

  if (state.activeView === "cleaner") {
    appView.innerHTML = renderCleanerView();
  } else if (state.activeView === "inventory") {
    appView.innerHTML = renderInventoryView();
  } else if (state.activeView === "sync") {
    appView.innerHTML = renderSyncView();
  } else if (state.activeView === "team") {
    appView.innerHTML = renderTeamView();
  } else {
    appView.innerHTML = renderManagerView();
  }
}

function updateNav() {
  document.querySelectorAll(".nav-item").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.view === state.activeView);
  });
}

function updateSidebarCard() {
  const next = [...state.jobs]
    .filter((job) => job.status !== "ready")
    .sort((a, b) => timeToMinutes(a.checkin) - timeToMinutes(b.checkin))[0];
  document.querySelector("#nextCheckin").textContent = next ? `${next.checkin} ${next.unit}` : "--";
  document.querySelector("#nextCheckinMeta").textContent = next
    ? `${getCleaner(next.cleanerId).name} / ${formatStatus(next.status)}`
    : "No turns scheduled";
}

function renderManagerView() {
  const selected = getSelectedJob();
  const jobs = getManagerJobs();
  return `
    <div class="manager-grid">
      <section class="manager-main">
        <div class="today-band">
          <div class="today-copy">
            <span class="eyebrow">Manager dashboard</span>
            <h2>${countReady()} ready, ${countBlocked()} blocked, ${countSameDay()} same-day turns</h2>
            <div class="mini-metrics">
              ${renderMetric("Open issues", countOpenIssues())}
              ${renderMetric("Cleaner logs", countAddedItems())}
              ${renderMetric("Low stock", countLowStock())}
            </div>
          </div>
          <img src="assets/turnover-ready-room.png" alt="Guest-ready bedroom with fresh linens" />
        </div>

        <section class="panel">
          <div class="panel-header">
            <div>
              <span class="eyebrow">Today</span>
              <h2>Turnovers</h2>
            </div>
            <div class="segmented">
              ${renderFilterButton("attention", "Attention")}
              ${renderFilterButton("all", "All")}
              ${renderFilterButton("same-day", "Same-day")}
              ${renderFilterButton("ready", "Ready")}
            </div>
          </div>
          <div class="turn-list">
            ${jobs.length ? jobs.map(renderManagerTurnRow).join("") : `<div class="empty">No turnovers match this view</div>`}
          </div>
        </section>
      </section>

      <aside class="manager-side">
        ${renderManagerDetail(selected)}
      </aside>
    </div>
  `;
}

function renderMetric(label, value) {
  return `
    <div class="metric">
      <strong>${value}</strong>
      <span>${label}</span>
    </div>
  `;
}

function renderFilterButton(filter, label) {
  return `
    <button class="segmented-button ${state.managerFilter === filter ? "is-active" : ""}" data-manager-filter="${filter}" type="button">
      ${label}
    </button>
  `;
}

function renderManagerTurnRow(job) {
  const progress = getProgress(job);
  const open = openIssues(job).length;
  const restock = `${job.restockDone.length}/${job.restockNeeded.length || 0}`;
  return `
    <button class="turn-row ${state.selectedJobId === job.id ? "is-selected" : ""}" data-select-job="${job.id}" type="button">
      <div>
        <strong>${job.unit}</strong>
        <span>${job.property} / ${job.area}</span>
      </div>
      <div>
        <strong>${job.checkin}</strong>
        <span>${job.channel}</span>
      </div>
      <div>
        <strong>${getCleaner(job.cleanerId).name}</strong>
        <span>${job.linen === "delivered" ? "Linen ready" : linenLabel(job.linen)}</span>
      </div>
      <div class="row-progress">
        <span class="status-pill ${statusConfig[job.status].tone}">${formatStatus(job.status)}</span>
        <div class="progress-track"><div class="progress-fill ${progress < 40 ? "danger" : progress < 75 ? "warn" : ""}" style="--value:${progress}%"></div></div>
      </div>
      <div class="row-flags">
        ${job.priority === "same-day" ? `<span class="tag same-day">same-day</span>` : ""}
        ${open ? `<span class="tag blocker">${open} issue${open > 1 ? "s" : ""}</span>` : ""}
        <span class="tag">restock ${restock}</span>
      </div>
    </button>
  `;
}

function renderManagerDetail(job) {
  if (!job) return `<section class="panel"><div class="empty">No turnover selected</div></section>`;
  return `
    <section class="panel sticky-panel">
      <div class="panel-header">
        <div>
          <span class="eyebrow">Selected turn</span>
          <h2>${job.unit}</h2>
        </div>
        <span class="status-pill ${statusConfig[job.status].tone}">${formatStatus(job.status)}</span>
      </div>
      <div class="panel-body detail-stack">
        <div class="detail-grid">
          ${renderDetail("Check-in", job.checkin)}
          ${renderDetail("Guest", job.guest)}
          ${renderDetail("Cleaner", getCleaner(job.cleanerId).name)}
          ${renderDetail("Checklist", `${job.completed.length}/${checklistTemplate.length}`)}
        </div>

        <div class="section-block">
          <div class="section-head">
            <h3>Manager actions</h3>
            <span class="small-meta">Updated ${job.updated}</span>
          </div>
          <div class="status-actions">
            ${Object.entries(statusConfig).map(([status, config]) => `
              <button class="chip-button ${job.status === status ? "is-active" : ""}" type="button" data-status="${status}" data-job="${job.id}">
                ${config.label}
              </button>
            `).join("")}
          </div>
          <div class="two-field-grid">
            <select class="select" data-assign-cleaner="${job.id}">
              ${cleaners.map((cleaner) => `<option value="${cleaner.id}" ${job.cleanerId === cleaner.id ? "selected" : ""}>${cleaner.name}</option>`).join("")}
            </select>
            <select class="select" data-linen-select="${job.id}">
              ${["needed", "packed", "delivered"].map((value) => `<option value="${value}" ${job.linen === value ? "selected" : ""}>${linenLabel(value)}</option>`).join("")}
            </select>
          </div>
        </div>

        <div class="section-block">
          <div class="section-head">
            <h3>Restock</h3>
            <span class="small-meta">${job.restockDone.length}/${job.restockNeeded.length} done</span>
          </div>
          <div class="checklist compact">
            ${job.restockNeeded.map((itemId) => renderRestockCheck(job, itemId)).join("") || `<div class="empty small">No restock needed</div>`}
          </div>
        </div>

        <div class="section-block">
          <div class="section-head">
            <h3>Cleaner supply log</h3>
            <span class="small-meta">${job.addedItems.length} entries</span>
          </div>
          ${renderAddedItems(job, true)}
        </div>

        <div class="section-block">
          <div class="section-head">
            <h3>Issues</h3>
            <span class="small-meta">${openIssues(job).length} open</span>
          </div>
          <div class="issue-list">
            ${job.issues.length ? job.issues.map((issue) => renderIssue(job, issue)).join("") : `<div class="empty small">No issues reported</div>`}
          </div>
          ${renderIssueForm(job.id)}
        </div>

        <button class="button primary" data-ready="${job.id}" type="button" ${canMarkReady(job) ? "" : "disabled"}>Mark guest-ready</button>
      </div>
    </section>
  `;
}

function renderCleanerView() {
  const activeCleaner = getCleaner(state.activeCleanerId);
  const cleanerJobs = state.jobs.filter((job) => job.cleanerId === activeCleaner.id);
  const selected =
    cleanerJobs.find((job) => job.id === state.cleanerSelectedJobId) ||
    cleanerJobs.find((job) => job.status !== "ready") ||
    cleanerJobs[0];

  return `
    <div class="cleaner-grid">
      <section class="cleaner-main">
        <div class="cleaner-top">
          <div>
            <span class="eyebrow">Cleaner portal</span>
            <h2>${activeCleaner.name}</h2>
          </div>
          <select class="select cleaner-select" id="activeCleaner">
            ${cleaners.map((cleaner) => `<option value="${cleaner.id}" ${cleaner.id === activeCleaner.id ? "selected" : ""}>${cleaner.name}</option>`).join("")}
          </select>
        </div>

        <div class="job-strip">
          ${cleanerJobs.length ? cleanerJobs.map(renderCleanerJobCard).join("") : `<div class="empty">No jobs assigned</div>`}
        </div>
      </section>

      <section class="panel work-order">
        ${selected ? renderCleanerWorkOrder(selected) : `<div class="empty">Select a cleaner with assigned jobs</div>`}
      </section>
    </div>
  `;
}

function renderCleanerJobCard(job) {
  return `
    <button class="cleaner-card ${state.cleanerSelectedJobId === job.id ? "is-selected" : ""}" data-cleaner-job="${job.id}" type="button">
      <div class="cleaner-card-top">
        <strong>${job.unit}</strong>
        <span class="status-pill ${statusConfig[job.status].tone}">${formatStatus(job.status)}</span>
      </div>
      <span>${job.checkin} check-in / ${job.area}</span>
      <div class="progress-track"><div class="progress-fill" style="--value:${getProgress(job)}%"></div></div>
    </button>
  `;
}

function renderCleanerWorkOrder(job) {
  return `
    <div class="panel-header">
      <div>
        <span class="eyebrow">${job.property}</span>
        <h2>${job.unit}</h2>
      </div>
      <span class="status-pill ${statusConfig[job.status].tone}">${formatStatus(job.status)}</span>
    </div>
    <div class="panel-body cleaner-work">
      <div class="detail-grid">
        ${renderDetail("Check-in", job.checkin)}
        ${renderDetail("Guest", job.guest)}
        ${renderDetail("Unit", job.beds)}
        ${renderDetail("Photos", job.photos)}
      </div>

      <div class="section-block">
        <div class="section-head">
          <h3>Checklist</h3>
          <button class="chip-button" type="button" data-complete-all="${job.id}">Complete all</button>
        </div>
        <div class="cleaner-checklist">
          ${checklistTemplate.map((item) => renderCleanerCheck(job, item)).join("")}
        </div>
      </div>

      <div class="section-block supply-entry">
        <div class="section-head">
          <h3>Items added</h3>
          <span class="small-meta">${job.addedItems.length} logged</span>
        </div>
        <form class="add-item-form" data-add-item-form="${job.id}">
          <select class="select" name="itemId" required>
            ${state.inventory.map((item) => `<option value="${item.id}">${item.item} (${item.unit})</option>`).join("")}
          </select>
          <input class="field quantity-field" name="qty" type="number" min="1" value="1" required />
          <select class="select" name="area">
            <option>Kitchen</option>
            <option>Bathroom</option>
            <option>Bedroom</option>
            <option>Laundry</option>
            <option>Entry</option>
          </select>
          <input class="field" name="note" placeholder="Note" />
          <button class="button primary" type="submit">Log item</button>
        </form>
        ${renderAddedItems(job, false)}
      </div>

      <div class="section-block">
        <div class="section-head">
          <h3>Restock targets</h3>
          <span class="small-meta">${job.restockDone.length}/${job.restockNeeded.length} done</span>
        </div>
        <div class="checklist compact">
          ${job.restockNeeded.map((itemId) => renderRestockCheck(job, itemId)).join("") || `<div class="empty small">No restock needed</div>`}
        </div>
      </div>

      <div class="section-block">
        <div class="section-head">
          <h3>Report issue</h3>
          <span class="small-meta">${openIssues(job).length} open</span>
        </div>
        ${renderIssueForm(job.id)}
      </div>

      <button class="button primary" data-finish-cleaner="${job.id}" type="button" ${job.completed.length ? "" : "disabled"}>Send to inspection</button>
    </div>
  `;
}

function renderCleanerCheck(job, item) {
  const checked = job.completed.includes(item.id);
  return `
    <label class="clean-check ${checked ? "is-done" : ""}">
      <input type="checkbox" data-check="${item.id}" data-job="${job.id}" ${checked ? "checked" : ""} />
      <span>
        <strong>${item.label}</strong>
        <small>${item.note}</small>
      </span>
    </label>
  `;
}

function renderInventoryView() {
  const lowStock = state.inventory.filter((item) => inventoryRisk(item) === "low");
  return `
    <div class="inventory-grid">
      <section class="panel table-panel">
        <div class="panel-header">
          <div>
            <span class="eyebrow">Stock room</span>
            <h2>Inventory</h2>
          </div>
          <button class="button" type="button" data-simulate-restock>Receive to par</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Category</th>
              <th>On hand</th>
              <th>Reserved</th>
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
            <span class="eyebrow">Needs order</span>
            <h2>Low Stock</h2>
          </div>
          <span class="count-pill">${lowStock.length}</span>
        </div>
        <div class="panel-body stock-list">
          ${lowStock.length ? lowStock.map(renderLowStockCard).join("") : `<div class="empty">Inventory is above low thresholds</div>`}
        </div>
      </aside>
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
          <div class="progress-track"><div class="progress-fill ${risk === "low" ? "danger" : risk === "watch" ? "warn" : ""}" style="--value:${percent}%"></div></div>
        </div>
      </td>
    </tr>
  `;
}

function renderLowStockCard(item) {
  return `
    <div class="stock-row">
      <div>
        <strong>${item.item}</strong>
        <span>${item.onHand - item.reserved} ${item.unit} available after reservations</span>
      </div>
      <span class="status-pill blocked">Order ${Math.max(item.par - item.onHand, 0)}</span>
    </div>
  `;
}

function renderSyncView() {
  const activeSources = state.calendarSources.filter((source) => source.status === "connected").length;
  const conflicts = state.calendarSources.reduce((sum, source) => sum + source.conflicts, 0);
  const imported = state.calendarSources.reduce((sum, source) => sum + source.imported, 0);

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
          <div class="mini-metrics four">
            ${renderMetric("Active sources", activeSources)}
            ${renderMetric("Imported", imported)}
            ${renderMetric("Conflicts", conflicts)}
            ${renderMetric("Today", state.jobs.length)}
          </div>
        </div>
      </section>

      <aside class="panel">
        <div class="panel-header">
          <div>
            <span class="eyebrow">iCal</span>
            <h2>Add Calendar</h2>
          </div>
        </div>
        <div class="panel-body">
          <form class="inline-form" data-ical-form>
            <input class="field" name="name" placeholder="Source name" required />
            <input class="field" name="url" placeholder="https://.../calendar.ics" required />
            <select class="select" name="type">
              <option value="Airbnb iCal">Airbnb iCal</option>
              <option value="Booking.com iCal">Booking.com iCal</option>
              <option value="Vrbo iCal">Vrbo iCal</option>
              <option value="Other iCal">Other iCal</option>
            </select>
            <button class="button primary" type="submit">Add feed</button>
          </form>
        </div>
      </aside>

      <section class="panel span-all">
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
          <span>${escapeHtml(source.type)} / ${escapeHtml(source.syncMode)}</span>
        </div>
        <span class="status-pill ${paused ? "assigned" : "ready"}">${paused ? "Paused" : "Connected"}</span>
      </div>
      <div class="url-chip" title="${escapeAttr(source.url)}">${escapeHtml(source.url)}</div>
      <div class="detail-grid">
        ${renderDetail("Last sync", source.lastSync)}
        ${renderDetail("Conflicts", source.conflicts)}
      </div>
      <div class="source-actions">
        <button class="chip-button" type="button" data-toggle-source="${source.id}">${paused ? "Resume" : "Pause"}</button>
        <button class="chip-button" type="button" data-remove-source="${source.id}">Remove</button>
      </div>
    </div>
  `;
}

function renderTeamView() {
  return `
    <div class="team-grid">
      ${cleaners.map(renderCleanerLoad).join("")}
    </div>
  `;
}

function renderCleanerLoad(cleaner) {
  const assigned = state.jobs.filter((job) => job.cleanerId === cleaner.id);
  const active = assigned.filter((job) => job.status !== "ready").length;
  const percent = Math.min(Math.round((active / cleaner.capacity) * 100), 100);
  return `
    <section class="panel team-card">
      <div class="panel-header">
        <div>
          <span class="eyebrow">${cleaner.zone}</span>
          <h2>${cleaner.name}</h2>
        </div>
        <span class="status-pill ${active >= cleaner.capacity ? "assigned" : "ready"}">${active}/${cleaner.capacity}</span>
      </div>
      <div class="panel-body detail-stack">
        <div class="progress-track"><div class="progress-fill ${percent > 90 ? "danger" : percent > 70 ? "warn" : ""}" style="--value:${percent}%"></div></div>
        <div class="tag-row">
          ${assigned.map((job) => `<button class="chip-button" type="button" data-open-cleaner-job="${job.id}" data-cleaner="${cleaner.id}">${job.unit}</button>`).join("")}
        </div>
      </div>
    </section>
  `;
}

function renderDetail(label, value) {
  return `
    <div class="detail">
      <span>${label}</span>
      <strong>${value}</strong>
    </div>
  `;
}

function renderRestockCheck(job, itemId) {
  const item = getInventoryItem(itemId);
  if (!item) return "";
  const checked = job.restockDone.includes(itemId);
  return `
    <label class="check-item">
      <input type="checkbox" data-restock="${item.id}" data-job="${job.id}" ${checked ? "checked" : ""} />
      <span>
        <strong>${item.item}</strong>
        <small>${item.onHand - item.reserved} ${item.unit} available</small>
      </span>
    </label>
  `;
}

function renderAddedItems(job, compact) {
  if (!job.addedItems.length) return `<div class="empty small">No items logged yet</div>`;
  const items = compact ? job.addedItems.slice(0, 4) : job.addedItems;
  return `
    <div class="added-list">
      ${items.map((entry) => `
        <div class="added-row">
          <div>
            <strong>${escapeHtml(entry.itemName)}</strong>
            <span>${entry.qty} ${escapeHtml(entry.unit)} / ${escapeHtml(entry.area)} / ${escapeHtml(entry.by)}</span>
            ${entry.note ? `<small>${escapeHtml(entry.note)}</small>` : ""}
          </div>
          <button class="icon-button" title="Remove entry" aria-label="Remove entry" data-remove-added="${entry.id}" data-job="${job.id}" type="button">x</button>
        </div>
      `).join("")}
    </div>
  `;
}

function renderIssue(job, issue) {
  return `
    <div class="issue">
      <div>
        <strong>${escapeHtml(issue.title)}</strong>
        <span>${escapeHtml(issue.type)} / ${capitalize(issue.severity)}</span>
      </div>
      <span class="status-pill ${issue.status === "open" ? "blocked" : "ready"}">${issue.status}</span>
      ${issue.status === "open" ? `<button class="chip-button" type="button" data-resolve-issue="${issue.id}" data-job="${job.id}">Resolve</button>` : ""}
    </div>
  `;
}

function renderIssueForm(jobId) {
  return `
    <form class="inline-form" data-issue-form="${jobId}">
      <input class="field" name="title" placeholder="Issue title" required />
      <div class="two-field-grid">
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

  const filterButton = event.target.closest("[data-manager-filter]");
  if (filterButton) {
    state.managerFilter = filterButton.dataset.managerFilter;
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

  const cleanerJob = event.target.closest("[data-cleaner-job]");
  if (cleanerJob) {
    state.cleanerSelectedJobId = cleanerJob.dataset.cleanerJob;
    saveState();
    render();
    return;
  }

  const openCleanerJob = event.target.closest("[data-open-cleaner-job]");
  if (openCleanerJob) {
    state.activeCleanerId = openCleanerJob.dataset.cleaner;
    state.cleanerSelectedJobId = openCleanerJob.dataset.openCleanerJob;
    state.activeView = "cleaner";
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

  const finishCleaner = event.target.closest("[data-finish-cleaner]");
  if (finishCleaner) {
    const job = findJob(finishCleaner.dataset.finishCleaner);
    job.status = canMarkReady(job) ? "ready" : "inspection";
    job.updated = "just now";
    saveState();
    render();
    toast(`${job.unit} sent to ${formatStatus(job.status)}`);
    return;
  }

  const resolveIssue = event.target.closest("[data-resolve-issue]");
  if (resolveIssue) {
    const job = findJob(resolveIssue.dataset.job);
    const issue = job.issues.find((item) => item.id === resolveIssue.dataset.resolveIssue);
    if (issue) issue.status = "resolved";
    if (!hasBlockingIssue(job) && job.linen !== "needed") {
      job.blockers = [];
    } else {
      job.blockers = job.blockers.filter((blocker) => blocker !== issue?.title);
    }
    syncJobStatus(job);
    job.updated = "just now";
    saveState();
    render();
    return;
  }

  const removeAdded = event.target.closest("[data-remove-added]");
  if (removeAdded) {
    const job = findJob(removeAdded.dataset.job);
    job.addedItems = job.addedItems.filter((entry) => entry.id !== removeAdded.dataset.removeAdded);
    job.updated = "just now";
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
    state.activeView = "manager";
    saveState();
    render();
    document.querySelector("[data-issue-form] input[name='title']")?.focus();
    return;
  }

  if (event.target.closest("[data-simulate-restock]")) {
    state.inventory = state.inventory.map((item) => ({ ...item, onHand: Math.max(item.onHand, item.par) }));
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
    if (!state.calendarSources.some((source) => source.id === "guesty-main")) {
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
    state.calendarSources = state.calendarSources.filter((source) => source.id !== removeSource.dataset.removeSource);
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
    syncRestockChecklist(job);
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

  const linenSelect = event.target.closest("[data-linen-select]");
  if (linenSelect) {
    const job = findJob(linenSelect.dataset.linenSelect);
    job.linen = linenSelect.value;
    if (job.linen === "delivered") {
      job.blockers = job.blockers.filter((blocker) => !blocker.toLowerCase().includes("sheet"));
    }
    job.updated = "just now";
    syncJobStatus(job);
    saveState();
    render();
    return;
  }

  if (event.target.id === "activeCleaner") {
    state.activeCleanerId = event.target.value;
    state.cleanerSelectedJobId =
      state.jobs.find((job) => job.cleanerId === state.activeCleanerId && job.status !== "ready")?.id ||
      state.jobs.find((job) => job.cleanerId === state.activeCleanerId)?.id ||
      "";
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

  const addItemForm = event.target.closest("[data-add-item-form]");
  if (addItemForm) {
    submitAddedItem(event);
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

function submitAddedItem(event) {
  event.preventDefault();
  const form = event.target;
  const job = findJob(form.dataset.addItemForm);
  const data = new FormData(form);
  const item = getInventoryItem(String(data.get("itemId")));
  const qty = Math.max(Number(data.get("qty")) || 1, 1);
  const area = String(data.get("area") || "Unit");
  const note = String(data.get("note") || "").trim();
  if (!item) return;

  job.addedItems.unshift({
    id: `add-${Date.now()}`,
    itemId: item.id,
    itemName: item.item,
    qty,
    unit: item.unit,
    area,
    note,
    by: getCleaner(job.cleanerId).name,
    time: "just now",
  });
  item.onHand = Math.max(item.onHand - qty, 0);
  if (job.restockNeeded.includes(item.id)) {
    toggleListValue(job.restockDone, item.id, true);
    syncRestockChecklist(job);
  }
  if (job.status === "assigned") job.status = "in-progress";
  job.updated = "just now";
  saveState();
  render();
  toast(`${item.item} logged for ${job.unit}`);
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

function getManagerJobs() {
  const sorted = [...state.jobs].sort((a, b) => timeToMinutes(a.checkin) - timeToMinutes(b.checkin));
  if (state.managerFilter === "all") return sorted;
  if (state.managerFilter === "same-day") return sorted.filter((job) => job.priority === "same-day");
  if (state.managerFilter === "ready") return sorted.filter((job) => job.status === "ready");
  return sorted.filter((job) => job.status === "blocked" || openIssues(job).length || job.priority === "same-day" || job.status === "inspection");
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

function getInventoryItem(id) {
  return state.inventory.find((item) => item.id === id);
}

function getProgress(job) {
  return Math.round((job.completed.length / checklistTemplate.length) * 100);
}

function countReady() {
  return state.jobs.filter((job) => job.status === "ready").length;
}

function countBlocked() {
  return state.jobs.filter((job) => job.status === "blocked").length;
}

function countSameDay() {
  return state.jobs.filter((job) => job.priority === "same-day").length;
}

function countOpenIssues() {
  return state.jobs.reduce((sum, job) => sum + openIssues(job).length, 0);
}

function countAddedItems() {
  return state.jobs.reduce((sum, job) => sum + job.addedItems.length, 0);
}

function countLowStock() {
  return state.inventory.filter((item) => inventoryRisk(item) === "low").length;
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

function syncRestockChecklist(job) {
  const restockDone = job.restockNeeded.length > 0 && job.restockNeeded.every((item) => job.restockDone.includes(item));
  toggleListValue(job.completed, "restock", restockDone);
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
  document.querySelector(".toast")?.remove();
  const node = document.createElement("div");
  node.className = "toast";
  node.textContent = message;
  document.body.append(node);
  window.setTimeout(() => node.remove(), 2600);
}
