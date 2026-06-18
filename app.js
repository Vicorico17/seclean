const properties = [
  { id: "mercer-4b", name: "Mercer Loft 4B", address: "Mercer House, SoHo", bedrooms: "2 bed / 1 bath" },
  { id: "harbor-12a", name: "Harbor Suite 12A", address: "Harborline, Waterfront", bedrooms: "1 bed / 1 bath" },
  { id: "atlas-2c", name: "Atlas Studio 2C", address: "Atlas Court, Midtown", bedrooms: "Studio / 1 bath" },
  { id: "arden-9", name: "Arden Flat 9", address: "Arden Walk, Uptown", bedrooms: "3 bed / 2 bath" },
  { id: "pier-3", name: "Pier Cottage 3", address: "Pier Cottages, Waterfront", bedrooms: "2 bed / 2 bath" },
  { id: "civic-18d", name: "Civic Tower 18D", address: "Civic Tower, Downtown", bedrooms: "1 bed / 1 bath" },
];

const inventoryItems = [
  { id: "sheets", label: "Fresh sheets" },
  { id: "towels", label: "Clean towels" },
  { id: "toilet-paper", label: "Toilet paper" },
  { id: "hand-soap", label: "Hand soap" },
  { id: "coffee", label: "Coffee / tea" },
  { id: "trash-bags", label: "Trash bags" },
];

const defaultState = {
  activeView: "manager",
  selectedPropertyId: "mercer-4b",
  selectedCleanerJobId: "mercer-4b",
  activeCleanerId: "maya",
  account: {
    created: false,
    company: "",
    managerName: "",
    managerEmail: "",
  },
  team: [
    { id: "maya", name: "Maya Chen", email: "maya@example.com", role: "Cleaner", propertyIds: ["mercer-4b", "civic-18d"] },
    { id: "jon", name: "Jon Bell", email: "jon@example.com", role: "Cleaner", propertyIds: ["harbor-12a", "pier-3"] },
    { id: "sofia", name: "Sofia Reed", email: "sofia@example.com", role: "Cleaner", propertyIds: ["arden-9"] },
    { id: "marco", name: "Marco Diaz", email: "marco@example.com", role: "Cleaner", propertyIds: ["atlas-2c"] },
  ],
  bookings: [
    { id: "b1", propertyId: "pier-3", guest: "Sam Okafor", channel: "Airbnb", start: "Jun 18", end: "Jun 20", checkin: "13:30", checkout: "08:45" },
    { id: "b2", propertyId: "atlas-2c", guest: "Mina Torres", channel: "Direct", start: "Jun 18", end: "Jun 19", checkin: "14:30", checkout: "09:30" },
    { id: "b3", propertyId: "mercer-4b", guest: "Eli Park", channel: "Airbnb", start: "Jun 18", end: "Jun 21", checkin: "15:00", checkout: "10:00" },
    { id: "b4", propertyId: "harbor-12a", guest: "Nora Singh", channel: "Booking.com", start: "Jun 18", end: "Jun 22", checkin: "16:00", checkout: "11:00" },
    { id: "b5", propertyId: "arden-9", guest: "Cal Webb", channel: "Vrbo", start: "Jun 19", end: "Jun 23", checkin: "17:00", checkout: "10:30" },
    { id: "b6", propertyId: "civic-18d", guest: "Hana Ivers", channel: "Airbnb", start: "Jun 20", end: "Jun 24", checkin: "18:00", checkout: "12:00" },
  ],
  cleaningJobs: [
    {
      id: "mercer-4b",
      propertyId: "mercer-4b",
      cleanerId: "maya",
      status: "not-ready",
      due: "Jun 18, 15:00",
      cleaned: false,
      checklist: ["sheets", "towels", "toilet-paper", "hand-soap", "coffee"],
      completedItems: ["sheets", "towels"],
    },
    {
      id: "harbor-12a",
      propertyId: "harbor-12a",
      cleanerId: "jon",
      status: "not-ready",
      due: "Jun 18, 16:00",
      cleaned: false,
      checklist: ["sheets", "towels", "toilet-paper", "hand-soap"],
      completedItems: [],
    },
    {
      id: "atlas-2c",
      propertyId: "atlas-2c",
      cleanerId: "marco",
      status: "ready",
      due: "Jun 18, 14:30",
      cleaned: true,
      checklist: ["sheets", "towels", "toilet-paper", "coffee"],
      completedItems: ["sheets", "towels", "toilet-paper", "coffee"],
    },
    {
      id: "arden-9",
      propertyId: "arden-9",
      cleanerId: "sofia",
      status: "not-ready",
      due: "Jun 19, 17:00",
      cleaned: false,
      checklist: ["sheets", "towels", "toilet-paper", "hand-soap", "coffee", "trash-bags"],
      completedItems: [],
    },
    {
      id: "pier-3",
      propertyId: "pier-3",
      cleanerId: "jon",
      status: "ready",
      due: "Jun 18, 13:30",
      cleaned: true,
      checklist: ["sheets", "towels", "toilet-paper", "hand-soap"],
      completedItems: ["sheets", "towels", "toilet-paper", "hand-soap"],
    },
    {
      id: "civic-18d",
      propertyId: "civic-18d",
      cleanerId: "maya",
      status: "not-ready",
      due: "Jun 20, 18:00",
      cleaned: false,
      checklist: ["sheets", "towels", "toilet-paper", "coffee"],
      completedItems: ["sheets", "coffee"],
    },
  ],
};

const viewTitles = {
  manager: "Manager Dashboard",
  cleaner: "Cleaner Dashboard",
};

let state = loadState();

const appView = document.querySelector("#appView");
const viewTitle = document.querySelector("#viewTitle");

document.addEventListener("click", handleClick);
document.addEventListener("change", handleChange);
document.addEventListener("submit", handleSubmit);

render();

function loadState() {
  try {
    const stored = localStorage.getItem("turnready-simple-state");
    const previous = stored ? JSON.parse(stored) : defaultState;
    return normalizeState(previous);
  } catch {
    return structuredClone(defaultState);
  }
}

function normalizeState(raw) {
  const base = structuredClone(defaultState);
  const next = {
    ...base,
    ...raw,
    account: { ...base.account, ...(raw.account || {}) },
    team: raw.team || base.team,
    bookings: raw.bookings || base.bookings,
    cleaningJobs: (raw.cleaningJobs || raw.jobs || base.cleaningJobs).map((job) => ({
      completedItems: [],
      checklist: ["sheets", "towels", "toilet-paper"],
      status: "not-ready",
      cleaned: false,
      ...job,
      propertyId: job.propertyId || job.id,
      due: job.due || `Jun 18, ${job.checkin || "15:00"}`,
    })),
  };

  if (!viewTitles[next.activeView]) next.activeView = "manager";
  if (!properties.some((property) => property.id === next.selectedPropertyId)) {
    next.selectedPropertyId = properties[0].id;
  }
  if (!next.team.some((member) => member.id === next.activeCleanerId)) {
    next.activeCleanerId = next.team[0]?.id || "";
  }
  if (!next.cleaningJobs.some((job) => job.id === next.selectedCleanerJobId)) {
    next.selectedCleanerJobId = next.cleaningJobs[0]?.id || "";
  }
  return next;
}

function saveState() {
  localStorage.setItem("turnready-simple-state", JSON.stringify(state));
}

function render() {
  viewTitle.textContent = state.account.created ? viewTitles[state.activeView] : "Create Manager Account";
  updateNav();
  updateSidebarCard();

  if (!state.account.created) {
    appView.innerHTML = renderAccountSetup();
    return;
  }

  appView.innerHTML = state.activeView === "cleaner" ? renderCleanerDashboard() : renderManagerDashboard();
}

function updateNav() {
  document.querySelectorAll(".nav-item").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.view === state.activeView);
  });
}

function updateSidebarCard() {
  const nextJob = state.cleaningJobs
    .filter((job) => job.status !== "ready")
    .sort((a, b) => a.due.localeCompare(b.due))[0];
  const property = nextJob ? getProperty(nextJob.propertyId) : null;
  document.querySelector("#nextCheckin").textContent = property ? property.name : "--";
  document.querySelector("#nextCheckinMeta").textContent = nextJob
    ? `${nextJob.due} / ${getTeamMember(nextJob.cleanerId)?.name || "Unassigned"}`
    : "All properties ready";
}

function renderAccountSetup() {
  return `
    <section class="account-screen">
      <div class="account-copy">
        <span class="eyebrow">Step 1</span>
        <h2>Create the property manager account</h2>
        <p>The manager owns the workspace first. After that, they can invite cleaners or teammates and choose which properties each person can access.</p>
      </div>
      <form class="account-form" data-account-form>
        <label>
          <span>Company name</span>
          <input class="field" name="company" placeholder="Example Stay Co." required />
        </label>
        <label>
          <span>Manager name</span>
          <input class="field" name="managerName" placeholder="Your name" required />
        </label>
        <label>
          <span>Manager email</span>
          <input class="field" name="managerEmail" type="email" placeholder="manager@example.com" required />
        </label>
        <button class="button primary" type="submit">Create account</button>
      </form>
    </section>
  `;
}

function renderManagerDashboard() {
  const ready = state.cleaningJobs.filter((job) => job.status === "ready").length;
  const notReady = state.cleaningJobs.length - ready;

  return `
    <div class="dashboard-grid">
      <section class="panel hero-panel">
        <div>
          <span class="eyebrow">${escapeHtml(state.account.company)}</span>
          <h2>${properties.length} properties, ${ready} ready, ${notReady} not ready</h2>
        </div>
        <img src="assets/turnover-ready-room.png" alt="Guest-ready bedroom with fresh linens" />
      </section>

      <section class="panel">
        <div class="panel-header">
          <div>
            <span class="eyebrow">Properties</span>
            <h2>All Properties</h2>
          </div>
        </div>
        <div class="property-list">
          ${properties.map(renderPropertyRow).join("")}
        </div>
      </section>

      <section class="panel">
        <div class="panel-header">
          <div>
            <span class="eyebrow">Bookings</span>
            <h2>Calendar</h2>
          </div>
        </div>
        <div class="calendar-grid">
          ${["Jun 18", "Jun 19", "Jun 20", "Jun 21", "Jun 22"].map(renderCalendarDay).join("")}
        </div>
      </section>

      <section class="panel">
        <div class="panel-header">
          <div>
            <span class="eyebrow">Access</span>
            <h2>Team Members</h2>
          </div>
        </div>
        <div class="panel-body simple-stack">
          <form class="invite-form" data-invite-form>
            <input class="field" name="name" placeholder="Name" required />
            <input class="field" name="email" type="email" placeholder="Email" required />
            <select class="select" name="propertyId">
              ${properties.map((property) => `<option value="${property.id}">${property.name}</option>`).join("")}
            </select>
            <button class="button primary" type="submit">Add to team</button>
          </form>
          <div class="team-list">
            ${state.team.map(renderTeamMember).join("")}
          </div>
        </div>
      </section>
    </div>
  `;
}

function renderPropertyRow(property) {
  const job = getJobForProperty(property.id);
  const booking = getNextBooking(property.id);
  const member = getTeamMember(job.cleanerId);
  const ready = job.status === "ready";

  return `
    <button class="property-row ${state.selectedPropertyId === property.id ? "is-selected" : ""}" data-property="${property.id}" type="button">
      <div>
        <strong>${property.name}</strong>
        <span>${property.address}</span>
      </div>
      <div>
        <strong>${booking?.guest || "No booking"}</strong>
        <span>${booking ? `${booking.start} at ${booking.checkin}` : "Available"}</span>
      </div>
      <div>
        <strong>${member?.name || "Unassigned"}</strong>
        <span>Cleaner</span>
      </div>
      <span class="status-pill ${ready ? "ready" : "not-ready"}">${ready ? "Ready" : "Not ready"}</span>
    </button>
  `;
}

function renderCalendarDay(day) {
  const bookings = state.bookings.filter((booking) => booking.start === day);
  return `
    <div class="calendar-day">
      <strong>${day}</strong>
      ${bookings.length ? bookings.map(renderBookingCard).join("") : `<span class="empty-day">No check-ins</span>`}
    </div>
  `;
}

function renderBookingCard(booking) {
  const property = getProperty(booking.propertyId);
  return `
    <div class="booking-card">
      <strong>${property.name}</strong>
      <span>${booking.guest}</span>
      <small>${booking.channel} / ${booking.checkin}</small>
    </div>
  `;
}

function renderTeamMember(member) {
  const access = member.propertyIds.map((id) => getProperty(id)?.name).filter(Boolean).join(", ");
  return `
    <div class="team-row">
      <div>
        <strong>${escapeHtml(member.name)}</strong>
        <span>${escapeHtml(member.email)} / ${escapeHtml(member.role)}</span>
        <small>${escapeHtml(access)}</small>
      </div>
      <button class="chip-button" data-remove-member="${member.id}" type="button">Remove</button>
    </div>
  `;
}

function renderCleanerDashboard() {
  const cleaners = state.team.filter((member) => member.role === "Cleaner");
  const activeCleaner = getTeamMember(state.activeCleanerId) || cleaners[0];
  const jobs = state.cleaningJobs.filter(
    (job) => job.cleanerId === activeCleaner?.id && job.status !== "ready"
  );
  const selectedJob =
    jobs.find((job) => job.id === state.selectedCleanerJobId) ||
    jobs[0] ||
    state.cleaningJobs.find((job) => job.cleanerId === activeCleaner?.id);

  return `
    <div class="cleaner-layout">
      <section class="panel">
        <div class="panel-header">
          <div>
            <span class="eyebrow">Cleaner</span>
            <h2>Properties To Clean</h2>
          </div>
          <select class="select cleaner-select" id="activeCleaner">
            ${cleaners.map((cleaner) => `<option value="${cleaner.id}" ${cleaner.id === activeCleaner?.id ? "selected" : ""}>${cleaner.name}</option>`).join("")}
          </select>
        </div>
        <div class="cleaner-list">
          ${jobs.length ? jobs.map(renderCleanerJob).join("") : `<div class="empty-state">No properties to clean.</div>`}
        </div>
      </section>

      <section class="panel">
        ${selectedJob ? renderCleanerChecklist(selectedJob) : `<div class="empty-state">Select a cleaner with assigned properties.</div>`}
      </section>
    </div>
  `;
}

function renderCleanerJob(job) {
  const property = getProperty(job.propertyId);
  const done = job.completedItems.length;
  return `
    <button class="cleaner-job ${state.selectedCleanerJobId === job.id ? "is-selected" : ""}" data-cleaner-job="${job.id}" type="button">
      <div>
        <strong>${property.name}</strong>
        <span>${property.address}</span>
      </div>
      <div>
        <strong>${job.due}</strong>
        <span>${done}/${job.checklist.length} checklist done</span>
      </div>
    </button>
  `;
}

function renderCleanerChecklist(job) {
  const property = getProperty(job.propertyId);
  const complete = job.checklist.every((item) => job.completedItems.includes(item));

  return `
    <div class="panel-header">
      <div>
        <span class="eyebrow">After cleaning</span>
        <h2>${property.name}</h2>
      </div>
      <span class="status-pill ${complete ? "ready" : "not-ready"}">${complete ? "Checklist done" : "Needs items"}</span>
    </div>
    <div class="panel-body simple-stack">
      <div class="detail-grid">
        <div class="detail"><span>Address</span><strong>${property.address}</strong></div>
        <div class="detail"><span>Due</span><strong>${job.due}</strong></div>
      </div>
      <div class="checklist">
        ${job.checklist.map((itemId) => renderChecklistItem(job, itemId)).join("")}
      </div>
      <button class="button primary" data-turn-ready="${job.id}" type="button" ${complete ? "" : "disabled"}>
        Apartment is turn-ready
      </button>
    </div>
  `;
}

function renderChecklistItem(job, itemId) {
  const item = inventoryItems.find((entry) => entry.id === itemId);
  const checked = job.completedItems.includes(itemId);
  return `
    <label class="check-item ${checked ? "is-done" : ""}">
      <input type="checkbox" data-check-item="${itemId}" data-job="${job.id}" ${checked ? "checked" : ""} />
      <span>${item?.label || itemId}</span>
    </label>
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

  const propertyButton = event.target.closest("[data-property]");
  if (propertyButton) {
    state.selectedPropertyId = propertyButton.dataset.property;
    saveState();
    render();
    return;
  }

  const cleanerJob = event.target.closest("[data-cleaner-job]");
  if (cleanerJob) {
    state.selectedCleanerJobId = cleanerJob.dataset.cleanerJob;
    saveState();
    render();
    return;
  }

  const turnReady = event.target.closest("[data-turn-ready]");
  if (turnReady) {
    const job = getCleaningJob(turnReady.dataset.turnReady);
    job.status = "ready";
    job.cleaned = true;
    saveState();
    render();
    toast(`${getProperty(job.propertyId).name} is turn-ready`);
    return;
  }

  const removeMember = event.target.closest("[data-remove-member]");
  if (removeMember) {
    state.team = state.team.filter((member) => member.id !== removeMember.dataset.removeMember);
    saveState();
    render();
    return;
  }

  if (event.target.closest("#resetDemo")) {
    state = structuredClone(defaultState);
    saveState();
    render();
  }
}

function handleChange(event) {
  const activeCleaner = event.target.closest("#activeCleaner");
  if (activeCleaner) {
    state.activeCleanerId = activeCleaner.value;
    state.selectedCleanerJobId =
      state.cleaningJobs.find((job) => job.cleanerId === activeCleaner.value && job.status !== "ready")?.id ||
      state.cleaningJobs.find((job) => job.cleanerId === activeCleaner.value)?.id ||
      "";
    saveState();
    render();
    return;
  }

  const checkItem = event.target.closest("[data-check-item]");
  if (checkItem) {
    const job = getCleaningJob(checkItem.dataset.job);
    toggleItem(job.completedItems, checkItem.dataset.checkItem, checkItem.checked);
    saveState();
    render();
  }
}

function handleSubmit(event) {
  const accountForm = event.target.closest("[data-account-form]");
  if (accountForm) {
    event.preventDefault();
    const data = new FormData(accountForm);
    state.account = {
      created: true,
      company: String(data.get("company")),
      managerName: String(data.get("managerName")),
      managerEmail: String(data.get("managerEmail")),
    };
    saveState();
    render();
    return;
  }

  const inviteForm = event.target.closest("[data-invite-form]");
  if (inviteForm) {
    event.preventDefault();
    const data = new FormData(inviteForm);
    const name = String(data.get("name")).trim();
    const email = String(data.get("email")).trim();
    const propertyId = String(data.get("propertyId"));
    if (!name || !email) return;

    const id = `team-${Date.now()}`;
    state.team.push({ id, name, email, role: "Cleaner", propertyIds: [propertyId] });
    state.cleaningJobs
      .filter((job) => job.propertyId === propertyId)
      .forEach((job) => {
        job.cleanerId = id;
      });
    saveState();
    render();
    toast(`${name} added to the team`);
  }
}

function getProperty(id) {
  return properties.find((property) => property.id === id);
}

function getCleaningJob(id) {
  return state.cleaningJobs.find((job) => job.id === id);
}

function getJobForProperty(propertyId) {
  return state.cleaningJobs.find((job) => job.propertyId === propertyId);
}

function getNextBooking(propertyId) {
  return state.bookings.find((booking) => booking.propertyId === propertyId);
}

function getTeamMember(id) {
  return state.team.find((member) => member.id === id);
}

function toggleItem(list, value, enabled) {
  const index = list.indexOf(value);
  if (enabled && index === -1) list.push(value);
  if (!enabled && index !== -1) list.splice(index, 1);
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
  window.setTimeout(() => node.remove(), 2400);
}
