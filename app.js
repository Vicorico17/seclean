const inventoryItems = [
  { id: "sheets", label: "Fresh sheets" },
  { id: "towels", label: "Clean towels" },
  { id: "toilet-paper", label: "Toilet paper" },
  { id: "hand-soap", label: "Hand soap" },
  { id: "coffee", label: "Coffee / tea" },
  { id: "trash-bags", label: "Trash bags" },
];

const defaultChecklist = ["sheets", "towels", "toilet-paper", "hand-soap", "coffee"];

const defaultState = {
  activeView: "manager",
  selectedPropertyId: "",
  selectedCleanerJobId: "",
  activeCleanerId: "",
  account: {
    created: false,
    company: "",
    managerName: "",
    managerEmail: "",
  },
  onboarding: {
    completed: false,
    step: 0,
    bookingSource: null,
    checklist: defaultChecklist,
  },
  properties: [],
  team: [],
  bookings: [],
  cleaningJobs: [],
};

const onboardingSteps = [
  "Account",
  "Property",
  "Bookings",
  "Checklist",
  "Team",
  "First Turnover",
];

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
  const legacyProperties = [
    { id: "mercer-4b", name: "Mercer Loft 4B", address: "Mercer House, SoHo", bedrooms: "2 bed / 1 bath" },
    { id: "harbor-12a", name: "Harbor Suite 12A", address: "Harborline, Waterfront", bedrooms: "1 bed / 1 bath" },
    { id: "atlas-2c", name: "Atlas Studio 2C", address: "Atlas Court, Midtown", bedrooms: "Studio / 1 bath" },
    { id: "arden-9", name: "Arden Flat 9", address: "Arden Walk, Uptown", bedrooms: "3 bed / 2 bath" },
    { id: "pier-3", name: "Pier Cottage 3", address: "Pier Cottages, Waterfront", bedrooms: "2 bed / 2 bath" },
    { id: "civic-18d", name: "Civic Tower 18D", address: "Civic Tower, Downtown", bedrooms: "1 bed / 1 bath" },
  ];
  const migratedProperties = raw.properties || (raw.account?.created ? legacyProperties : base.properties);

  const next = {
    ...base,
    ...raw,
    account: { ...base.account, ...(raw.account || {}) },
    onboarding: {
      ...base.onboarding,
      ...(raw.onboarding || {}),
      completed: raw.onboarding?.completed ?? Boolean(raw.account?.created && migratedProperties.length),
      checklist: raw.onboarding?.checklist || base.onboarding.checklist,
    },
    properties: migratedProperties,
    team: raw.team || base.team,
    bookings: raw.bookings || base.bookings,
    cleaningJobs: (raw.cleaningJobs || raw.jobs || base.cleaningJobs).map((job) => ({
      completedItems: [],
      checklist: defaultChecklist,
      status: "not-ready",
      cleaned: false,
      ...job,
      propertyId: job.propertyId || job.id,
      due: job.due || `Jun 18, ${job.checkin || "15:00"}`,
    })),
  };

  if (!viewTitles[next.activeView]) next.activeView = "manager";
  if (!next.properties.some((property) => property.id === next.selectedPropertyId)) {
    next.selectedPropertyId = next.properties[0]?.id || "";
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
  const inOnboarding = !state.onboarding.completed;
  viewTitle.textContent = inOnboarding ? "Property Manager Onboarding" : viewTitles[state.activeView];
  updateNav();
  updateSidebarCard();

  if (inOnboarding) {
    appView.innerHTML = renderOnboarding();
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
    : state.onboarding.completed
      ? "All properties ready"
      : "Finish onboarding";
}

function renderOnboarding() {
  const step = state.onboarding.step;
  return `
    <section class="onboarding-shell">
      <aside class="onboarding-steps">
        <span class="eyebrow">Setup</span>
        <h2>Get your first turnover ready</h2>
        <div class="step-list">
          ${onboardingSteps.map((label, index) => renderStepIndicator(label, index)).join("")}
        </div>
      </aside>
      <div class="onboarding-card">
        ${renderOnboardingStep(step)}
      </div>
    </section>
  `;
}

function renderStepIndicator(label, index) {
  const done = index < state.onboarding.step;
  const active = index === state.onboarding.step;
  return `
    <div class="step-item ${active ? "is-active" : ""} ${done ? "is-done" : ""}">
      <span>${done ? "OK" : index + 1}</span>
      <strong>${label}</strong>
    </div>
  `;
}

function renderOnboardingStep(step) {
  if (step === 0) return renderAccountStep();
  if (step === 1) return renderPropertyStep();
  if (step === 2) return renderBookingSourceStep();
  if (step === 3) return renderChecklistStep();
  if (step === 4) return renderTeamStep();
  return renderTurnoverStep();
}

function renderAccountStep() {
  return `
    <form class="onboarding-form" data-onboarding-form="account">
      <span class="eyebrow">Step 1</span>
      <h2>Create the manager account</h2>
      <p>The property manager owns the workspace and controls who can access each property.</p>
      <label>
        <span>Company name</span>
        <input class="field" name="company" value="${escapeAttr(state.account.company)}" placeholder="Example Stay Co." required />
      </label>
      <label>
        <span>Manager name</span>
        <input class="field" name="managerName" value="${escapeAttr(state.account.managerName)}" placeholder="Your name" required />
      </label>
      <label>
        <span>Manager email</span>
        <input class="field" name="managerEmail" type="email" value="${escapeAttr(state.account.managerEmail)}" placeholder="manager@example.com" required />
      </label>
      <button class="button primary" type="submit">Continue</button>
    </form>
  `;
}

function renderPropertyStep() {
  return `
    <form class="onboarding-form" data-onboarding-form="property">
      <span class="eyebrow">Step 2</span>
      <h2>Add the first property</h2>
      <p>This becomes the first unit on the manager dashboard and the first cleaning job cleaners can access.</p>
      <label>
        <span>Property name</span>
        <input class="field" name="name" placeholder="Mercer Loft 4B" required />
      </label>
      <label>
        <span>Address or area</span>
        <input class="field" name="address" placeholder="Mercer House, SoHo" required />
      </label>
      <label>
        <span>Bedrooms / bathrooms</span>
        <input class="field" name="bedrooms" placeholder="2 bed / 1 bath" required />
      </label>
      <button class="button primary" type="submit">Add property</button>
    </form>
  `;
}

function renderBookingSourceStep() {
  return `
    <form class="onboarding-form" data-onboarding-form="booking-source">
      <span class="eyebrow">Step 3</span>
      <h2>Connect bookings</h2>
      <p>Managers can start with Guesty, an iCal feed, or manual booking entry. This demo records the chosen source.</p>
      <label>
        <span>Booking source</span>
        <select class="select" name="type">
          <option value="Guesty PMS">Guesty PMS</option>
          <option value="Airbnb iCal">Airbnb iCal</option>
          <option value="Booking.com iCal">Booking.com iCal</option>
          <option value="Manual">Manual</option>
        </select>
      </label>
      <label>
        <span>Calendar link or account note</span>
        <input class="field" name="source" placeholder="https://.../calendar.ics or Guesty account name" />
      </label>
      <button class="button primary" type="submit">Save booking source</button>
    </form>
  `;
}

function renderChecklistStep() {
  return `
    <form class="onboarding-form" data-onboarding-form="checklist">
      <span class="eyebrow">Step 4</span>
      <h2>Set the cleaner checklist</h2>
      <p>Choose the required items a cleaner must confirm before marking an apartment turn-ready.</p>
      <div class="onboarding-checklist">
        ${inventoryItems.map((item) => `
          <label class="check-item is-flat">
            <input type="checkbox" name="checklist" value="${item.id}" ${state.onboarding.checklist.includes(item.id) ? "checked" : ""} />
            <span>${item.label}</span>
          </label>
        `).join("")}
      </div>
      <button class="button primary" type="submit">Save checklist</button>
    </form>
  `;
}

function renderTeamStep() {
  const firstProperty = state.properties[0];
  return `
    <form class="onboarding-form" data-onboarding-form="team">
      <span class="eyebrow">Step 5</span>
      <h2>Invite the first cleaner</h2>
      <p>Cleaners only see the properties they are assigned to.</p>
      <label>
        <span>Cleaner name</span>
        <input class="field" name="name" placeholder="Maya Chen" required />
      </label>
      <label>
        <span>Cleaner email</span>
        <input class="field" name="email" type="email" placeholder="maya@example.com" required />
      </label>
      <label>
        <span>Property access</span>
        <select class="select" name="propertyId">
          ${state.properties.map((property) => `<option value="${property.id}" ${property.id === firstProperty?.id ? "selected" : ""}>${property.name}</option>`).join("")}
        </select>
      </label>
      <button class="button primary" type="submit">Add cleaner</button>
    </form>
  `;
}

function renderTurnoverStep() {
  const firstProperty = state.properties[0];
  const firstCleaner = state.team[0];
  return `
    <form class="onboarding-form" data-onboarding-form="turnover">
      <span class="eyebrow">Step 6</span>
      <h2>Confirm the first turnover</h2>
      <p>This creates the first booking, first cleaning task, and ready/not-ready status on the manager dashboard.</p>
      <label>
        <span>Property</span>
        <select class="select" name="propertyId">
          ${state.properties.map((property) => `<option value="${property.id}" ${property.id === firstProperty?.id ? "selected" : ""}>${property.name}</option>`).join("")}
        </select>
      </label>
      <label>
        <span>Cleaner</span>
        <select class="select" name="cleanerId">
          ${state.team.map((member) => `<option value="${member.id}" ${member.id === firstCleaner?.id ? "selected" : ""}>${member.name}</option>`).join("")}
        </select>
      </label>
      <div class="two-field-grid">
        <label>
          <span>Guest name</span>
          <input class="field" name="guest" placeholder="Eli Park" required />
        </label>
        <label>
          <span>Channel</span>
          <select class="select" name="channel">
            <option>Airbnb</option>
            <option>Booking.com</option>
            <option>Guesty</option>
            <option>Direct</option>
          </select>
        </label>
      </div>
      <div class="two-field-grid">
        <label>
          <span>Arrival day</span>
          <input class="field" name="start" value="Jun 18" required />
        </label>
        <label>
          <span>Check-in time</span>
          <input class="field" name="checkin" value="15:00" required />
        </label>
      </div>
      <button class="button primary" type="submit">Finish setup</button>
    </form>
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
          <h2>${state.properties.length} properties, ${ready} ready, ${notReady} not ready</h2>
          <small>${state.onboarding.bookingSource ? `Booking source: ${escapeHtml(state.onboarding.bookingSource.type)}` : "No booking source connected"}</small>
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
          ${state.properties.length ? state.properties.map(renderPropertyRow).join("") : `<div class="empty-state">No properties yet.</div>`}
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
          ${getCalendarDays().map(renderCalendarDay).join("")}
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
              ${state.properties.map((property) => `<option value="${property.id}">${property.name}</option>`).join("")}
            </select>
            <button class="button primary" type="submit">Add to team</button>
          </form>
          <div class="team-list">
            ${state.team.length ? state.team.map(renderTeamMember).join("") : `<div class="empty-state small">No team members yet.</div>`}
          </div>
        </div>
      </section>
    </div>
  `;
}

function renderPropertyRow(property) {
  const job = getJobForProperty(property.id);
  const booking = getNextBooking(property.id);
  const member = job ? getTeamMember(job.cleanerId) : null;
  const ready = job?.status === "ready";

  return `
    <button class="property-row ${state.selectedPropertyId === property.id ? "is-selected" : ""}" data-property="${property.id}" type="button">
      <div>
        <strong>${escapeHtml(property.name)}</strong>
        <span>${escapeHtml(property.address)}</span>
      </div>
      <div>
        <strong>${booking?.guest ? escapeHtml(booking.guest) : "No booking"}</strong>
        <span>${booking ? `${booking.start} at ${booking.checkin}` : "Available"}</span>
      </div>
      <div>
        <strong>${member?.name ? escapeHtml(member.name) : "Unassigned"}</strong>
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
      <strong>${property ? escapeHtml(property.name) : "Unknown property"}</strong>
      <span>${escapeHtml(booking.guest)}</span>
      <small>${escapeHtml(booking.channel)} / ${booking.checkin}</small>
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
        <small>${escapeHtml(access || "No property access")}</small>
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
        <strong>${property ? escapeHtml(property.name) : "Unknown property"}</strong>
        <span>${property ? escapeHtml(property.address) : ""}</span>
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
        <h2>${property ? escapeHtml(property.name) : "Unknown property"}</h2>
      </div>
      <span class="status-pill ${complete ? "ready" : "not-ready"}">${complete ? "Checklist done" : "Needs items"}</span>
    </div>
    <div class="panel-body simple-stack">
      <div class="detail-grid">
        <div class="detail"><span>Address</span><strong>${property ? escapeHtml(property.address) : "Unknown"}</strong></div>
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
    toast(`${getProperty(job.propertyId)?.name || "Apartment"} is turn-ready`);
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
  const onboardingForm = event.target.closest("[data-onboarding-form]");
  if (onboardingForm) {
    event.preventDefault();
    handleOnboardingSubmit(onboardingForm);
    return;
  }

  const inviteForm = event.target.closest("[data-invite-form]");
  if (inviteForm) {
    event.preventDefault();
    const data = new FormData(inviteForm);
    const name = String(data.get("name")).trim();
    const email = String(data.get("email")).trim();
    const propertyId = String(data.get("propertyId"));
    if (!name || !email || !propertyId) return;

    const id = `team-${Date.now()}`;
    state.team.push({ id, name, email, role: "Cleaner", propertyIds: [propertyId] });
    state.cleaningJobs
      .filter((job) => job.propertyId === propertyId)
      .forEach((job) => {
        job.cleanerId = id;
      });
    state.activeCleanerId = id;
    saveState();
    render();
    toast(`${name} added to the team`);
  }
}

function handleOnboardingSubmit(form) {
  const stepName = form.dataset.onboardingForm;
  const data = new FormData(form);

  if (stepName === "account") {
    state.account = {
      created: true,
      company: String(data.get("company")).trim(),
      managerName: String(data.get("managerName")).trim(),
      managerEmail: String(data.get("managerEmail")).trim(),
    };
    state.onboarding.step = 1;
  }

  if (stepName === "property") {
    const property = {
      id: slugify(String(data.get("name")) || `property-${Date.now()}`),
      name: String(data.get("name")).trim(),
      address: String(data.get("address")).trim(),
      bedrooms: String(data.get("bedrooms")).trim(),
    };
    state.properties = [property];
    state.selectedPropertyId = property.id;
    state.onboarding.step = 2;
  }

  if (stepName === "booking-source") {
    state.onboarding.bookingSource = {
      type: String(data.get("type")),
      source: String(data.get("source") || "").trim(),
    };
    state.onboarding.step = 3;
  }

  if (stepName === "checklist") {
    const checklist = data.getAll("checklist").map(String);
    state.onboarding.checklist = checklist.length ? checklist : defaultChecklist;
    state.onboarding.step = 4;
  }

  if (stepName === "team") {
    const propertyId = String(data.get("propertyId"));
    const member = {
      id: `team-${Date.now()}`,
      name: String(data.get("name")).trim(),
      email: String(data.get("email")).trim(),
      role: "Cleaner",
      propertyIds: [propertyId],
    };
    state.team = [member];
    state.activeCleanerId = member.id;
    state.onboarding.step = 5;
  }

  if (stepName === "turnover") {
    const propertyId = String(data.get("propertyId"));
    const cleanerId = String(data.get("cleanerId"));
    const start = String(data.get("start")).trim();
    const checkin = String(data.get("checkin")).trim();
    state.bookings = [
      {
        id: `booking-${Date.now()}`,
        propertyId,
        guest: String(data.get("guest")).trim(),
        channel: String(data.get("channel")),
        start,
        end: start,
        checkin,
        checkout: "10:00",
      },
    ];
    state.cleaningJobs = [
      {
        id: `job-${Date.now()}`,
        propertyId,
        cleanerId,
        status: "not-ready",
        due: `${start}, ${checkin}`,
        cleaned: false,
        checklist: state.onboarding.checklist,
        completedItems: [],
      },
    ];
    state.selectedCleanerJobId = state.cleaningJobs[0].id;
    state.onboarding.completed = true;
    state.activeView = "manager";
  }

  saveState();
  render();
}

function getCalendarDays() {
  const days = state.bookings.map((booking) => booking.start);
  return days.length ? [...new Set(days)] : ["Jun 18", "Jun 19", "Jun 20"];
}

function getProperty(id) {
  return state.properties.find((property) => property.id === id);
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

function slugify(value) {
  const slug = value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return slug || `property-${Date.now()}`;
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
  window.setTimeout(() => node.remove(), 2400);
}
