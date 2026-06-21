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
  managerSection: "properties",
  showAddPropertyForm: false,
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
];

const viewTitles = {
  manager: "Manager Dashboard",
  cleaner: "Cleaner Dashboard",
};

const managerSections = {
  properties: {
    label: "Properties",
    icon: "properties",
  },
  calendar: {
    label: "Calendar",
    icon: "calendar",
  },
  team: {
    label: "Team",
    icon: "team",
  },
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
  if (!managerSections[next.managerSection]) next.managerSection = "properties";
  next.showAddPropertyForm = Boolean(next.showAddPropertyForm);
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
  const mainNav = document.querySelector("#mainNav");
  if (mainNav) mainNav.hidden = inOnboarding;
  updateNav();

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

function renderOnboarding() {
  const step = state.onboarding.step;
  const progress = Math.round(((step + 1) / onboardingSteps.length) * 100);
  return `
    <section class="onboarding-shell">
      <div class="onboarding-card">
        <div class="onboarding-progress">
          <div>
            <span class="eyebrow">Step ${step + 1} of ${onboardingSteps.length}</span>
            <strong>${onboardingSteps[step]}</strong>
          </div>
          <div class="progress-track" aria-label="${progress}% complete">
            <div class="progress-fill" style="--value: ${progress}%"></div>
          </div>
        </div>
        ${renderOnboardingStep(step)}
        <div class="onboarding-skip">
          <button class="button ghost" data-skip-onboarding type="button">
            Skip onboarding and load mock data
          </button>
        </div>
      </div>
    </section>
  `;
}

function renderOnboardingStep(step) {
  if (step === 0) return renderAccountStep();
  if (step === 1) return renderPropertyStep();
  if (step === 2) return renderBookingSourceStep();
  return renderChecklistStep();
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
      <h2>Add bookings</h2>
      <p>Add the booking source and the first reservation so the manager dashboard has a calendar immediately.</p>
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
      <div class="two-field-grid">
        <label>
          <span>First guest name</span>
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
      <button class="button primary" type="submit">Save booking source</button>
    </form>
  `;
}

function renderChecklistStep() {
  return `
    <form class="onboarding-form" data-onboarding-form="checklist">
      <span class="eyebrow">Step 4</span>
      <h2>Set the cleaner checklist</h2>
      <p>Choose the required items a future cleaner must confirm before marking an apartment turn-ready.</p>
      <div class="onboarding-checklist">
        ${inventoryItems.map((item) => `
          <label class="check-item is-flat">
            <input type="checkbox" name="checklist" value="${item.id}" ${state.onboarding.checklist.includes(item.id) ? "checked" : ""} />
            <span>${item.label}</span>
          </label>
        `).join("")}
      </div>
      <button class="button primary" type="submit">Finish setup</button>
    </form>
  `;
}

function renderManagerDashboard() {
  return `
    <div class="manager-dashboard">
      <div class="manager-section-nav" aria-label="Manager dashboard sections">
        ${Object.entries(managerSections).map(([id, section]) => `
          <button class="manager-section-button ${state.managerSection === id ? "is-active" : ""}" data-manager-section="${id}" type="button" aria-pressed="${state.managerSection === id}">
            ${renderIcon(section.icon)}
            <span>${section.label}</span>
          </button>
        `).join("")}
      </div>
      ${renderManagerSection()}
    </div>
  `;
}

function renderManagerSection() {
  if (state.managerSection === "calendar") return renderCalendarPanel();
  if (state.managerSection === "team") return renderTeamPanel();
  return renderPropertiesPanel();
}

function renderPropertiesPanel() {
  return `
    <section class="panel">
      <div class="panel-header">
        <div>
          <span class="eyebrow">Properties</span>
          <h2>All Properties</h2>
        </div>
        <button class="button primary" data-add-properties type="button">Add properties</button>
      </div>
      ${state.showAddPropertyForm ? renderAddPropertyForm() : ""}
      <div class="property-list">
        ${state.properties.length ? state.properties.map(renderPropertyRow).join("") : `<div class="empty-state">No properties yet.</div>`}
      </div>
    </section>
  `;
}

function renderAddPropertyForm() {
  return `
    <form class="add-property-form" data-add-property-form>
      <input class="field" name="name" placeholder="Property name" required />
      <input class="field" name="address" placeholder="Address or area" required />
      <input class="field" name="bedrooms" placeholder="Bedrooms / bathrooms" required />
      <div class="form-actions">
        <button class="button ghost" data-cancel-add-property type="button">Cancel</button>
        <button class="button primary" type="submit">Save property</button>
      </div>
    </form>
  `;
}

function renderCalendarPanel() {
  return `
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
  `;
}

function renderTeamPanel() {
  return `
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
            ${state.properties.map((property) => `<option value="${escapeAttr(property.id)}">${escapeHtml(property.name)}</option>`).join("")}
          </select>
          <button class="button primary" type="submit">Add to team</button>
        </form>
        <div class="team-list">
          ${state.team.length ? state.team.map(renderTeamMember).join("") : `<div class="empty-state small">No team members yet.</div>`}
        </div>
      </div>
    </section>
  `;
}

function renderIcon(name) {
  const paths = {
    properties: '<path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/><path d="M9 21v-8h6v8"/><path d="M9 9h.01"/><path d="M15 9h.01"/>',
    calendar: '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/>',
    team: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  };

  return `
    <svg class="section-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      ${paths[name] || paths.properties}
    </svg>
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
  if (!cleaners.length) {
    return `
      <section class="panel">
        <div class="panel-header">
          <div>
            <span class="eyebrow">Cleaner Dashboard</span>
            <h2>No cleaners added yet</h2>
          </div>
        </div>
        <div class="empty-state">The property manager can add cleaners and property access from the manager dashboard.</div>
      </section>
    `;
  }
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

  const managerSection = event.target.closest("[data-manager-section]");
  if (managerSection) {
    state.managerSection = managerSection.dataset.managerSection;
    state.showAddPropertyForm = false;
    saveState();
    render();
    return;
  }

  if (event.target.closest("[data-add-properties]")) {
    state.showAddPropertyForm = true;
    saveState();
    render();
    return;
  }

  if (event.target.closest("[data-cancel-add-property]")) {
    state.showAddPropertyForm = false;
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
    return;
  }

  if (event.target.closest("[data-skip-onboarding]")) {
    state = createMockState();
    saveState();
    render();
    toast("Mock workspace loaded");
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

  const addPropertyForm = event.target.closest("[data-add-property-form]");
  if (addPropertyForm) {
    event.preventDefault();
    const data = new FormData(addPropertyForm);
    const name = String(data.get("name")).trim();
    const address = String(data.get("address")).trim();
    const bedrooms = String(data.get("bedrooms")).trim();
    if (!name || !address || !bedrooms) return;

    const property = {
      id: createUniquePropertyId(name),
      name,
      address,
      bedrooms,
    };
    state.properties.push(property);
    state.cleaningJobs.push({
      id: `job-${property.id}`,
      propertyId: property.id,
      cleanerId: "",
      status: "not-ready",
      due: "No booking",
      cleaned: false,
      checklist: state.onboarding.checklist || defaultChecklist,
      completedItems: [],
    });
    state.selectedPropertyId = property.id;
    state.showAddPropertyForm = false;
    saveState();
    render();
    toast(`${name} added`);
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
    const propertyId = state.properties[0]?.id || "";
    const start = String(data.get("start")).trim();
    const checkin = String(data.get("checkin")).trim();
    state.onboarding.bookingSource = {
      type: String(data.get("type")),
      source: String(data.get("source") || "").trim(),
    };
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
    state.onboarding.step = 3;
  }

  if (stepName === "checklist") {
    const checklist = data.getAll("checklist").map(String);
    state.onboarding.checklist = checklist.length ? checklist : defaultChecklist;
    const booking = state.bookings[0];
    const propertyId = booking?.propertyId || state.properties[0]?.id || "";
    state.cleaningJobs = [
      {
        id: `job-${Date.now()}`,
        propertyId,
        cleanerId: "",
        status: "not-ready",
        due: `${booking?.start || "Jun 18"}, ${booking?.checkin || "15:00"}`,
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

function createMockState() {
  return normalizeState({
    activeView: "manager",
    selectedPropertyId: "mercer-4b",
    selectedCleanerJobId: "mercer-4b",
    activeCleanerId: "maya",
    account: {
      created: true,
      company: "Demo Stay Co.",
      managerName: "Alex Morgan",
      managerEmail: "manager@example.com",
    },
    onboarding: {
      completed: true,
      step: onboardingSteps.length - 1,
      bookingSource: {
        type: "Guesty PMS",
        source: "Demo Guesty workspace",
      },
      checklist: defaultChecklist,
    },
    properties: [
      { id: "mercer-4b", name: "Mercer Loft 4B", address: "Mercer House, SoHo", bedrooms: "2 bed / 1 bath" },
      { id: "harbor-12a", name: "Harbor Suite 12A", address: "Harborline, Waterfront", bedrooms: "1 bed / 1 bath" },
      { id: "atlas-2c", name: "Atlas Studio 2C", address: "Atlas Court, Midtown", bedrooms: "Studio / 1 bath" },
      { id: "pier-3", name: "Pier Cottage 3", address: "Pier Cottages, Waterfront", bedrooms: "2 bed / 2 bath" },
    ],
    team: [
      { id: "maya", name: "Maya Chen", email: "maya@example.com", role: "Cleaner", propertyIds: ["mercer-4b"] },
      { id: "jon", name: "Jon Bell", email: "jon@example.com", role: "Cleaner", propertyIds: ["harbor-12a", "pier-3"] },
      { id: "marco", name: "Marco Diaz", email: "marco@example.com", role: "Cleaner", propertyIds: ["atlas-2c"] },
    ],
    bookings: [
      { id: "b1", propertyId: "pier-3", guest: "Sam Okafor", channel: "Airbnb", start: "Jun 18", end: "Jun 20", checkin: "13:30", checkout: "08:45" },
      { id: "b2", propertyId: "atlas-2c", guest: "Mina Torres", channel: "Direct", start: "Jun 18", end: "Jun 19", checkin: "14:30", checkout: "09:30" },
      { id: "b3", propertyId: "mercer-4b", guest: "Eli Park", channel: "Airbnb", start: "Jun 18", end: "Jun 21", checkin: "15:00", checkout: "10:00" },
      { id: "b4", propertyId: "harbor-12a", guest: "Nora Singh", channel: "Booking.com", start: "Jun 19", end: "Jun 22", checkin: "16:00", checkout: "11:00" },
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
        due: "Jun 19, 16:00",
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
        id: "pier-3",
        propertyId: "pier-3",
        cleanerId: "jon",
        status: "ready",
        due: "Jun 18, 13:30",
        cleaned: true,
        checklist: ["sheets", "towels", "toilet-paper", "hand-soap"],
        completedItems: ["sheets", "towels", "toilet-paper", "hand-soap"],
      },
    ],
  });
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

function createUniquePropertyId(name) {
  const base = slugify(name);
  let id = base;
  let count = 2;
  while (state.properties.some((property) => property.id === id)) {
    id = `${base}-${count}`;
    count += 1;
  }
  return id;
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
