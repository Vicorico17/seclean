const app = document.querySelector("#app");

const state = {
  active: "dashboard",
  dropdown: null,
};

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: "home" },
  { id: "portfolio", label: "Properties", icon: "building" },
  { id: "calendar", label: "Calendar", icon: "calendar" },
  { id: "reports", label: "Reports", icon: "report" },
  { id: "bookings", label: "Bookings", icon: "clock" },
  { id: "invoices", label: "Invoices", icon: "file" },
  { id: "cleaning", label: "Cleaning", icon: "sparkle" },
  { id: "maintenance", label: "Maintenance", icon: "wrench" },
];

const invoices = [
  { name: "Sophia Mitchell", role: "Client", date: "01 Oct. 2023", amount: "&pound;250", eur: "&euro;292.85", avatar: "sophia" },
  { name: "Bogdan Popescu", role: "Owner", date: "05 Oct. 2023", amount: "&pound;500", eur: "&euro;585.74", avatar: "bogdan" },
  { name: "Radu Ionescu", role: "Owner", date: "07 Oct. 2023", amount: "&pound;740", eur: "&euro;866.90", avatar: "radu" },
  { name: "Mia Bennett", role: "Client", date: "24 Oct. 2023", amount: "&pound;200", eur: "&euro;234.32", avatar: "mia" },
  { name: "Ana Mihai", role: "Owner", date: "31 Oct. 2023", amount: "&pound;120", eur: "&euro;140.58", avatar: "ana" },
];

const expenses = [
  { name: "Credos", date: "05 Oct. 2023", amount: "&pound;120", eur: "&euro;140.58", logo: "CR" },
  { name: "RCS-RDS", date: "05 Oct. 2023", amount: "&pound;80", eur: "&euro;93.72", logo: "RDS" },
  { name: "Freshful", date: "05 Oct. 2023", amount: "&pound;95", eur: "&euro;111.29", logo: "FR" },
  { name: "Eon", date: "05 Oct. 2023", amount: "&pound;30", eur: "&euro;35.14", logo: "EON" },
  { name: "Cleaning Express", date: "05 Oct. 2023", amount: "&pound;30", eur: "&euro;35.14", logo: "CE" },
];

const properties = [
  { name: "27 High Street", location: "London, England", owner: "Cristi Gaidenic", income: "&pound;42,800", expenses: "&pound;8,200", status: "Ready", thumb: "" },
  { name: "The Glass House", location: "Bristol, England", owner: "Mia Bennett", income: "&pound;31,600", expenses: "&pound;6,900", status: "Needs attention", thumb: "alt" },
  { name: "Station Road Flat", location: "Manchester, England", owner: "Bogdan Popescu", income: "&pound;18,400", expenses: "&pound;3,100", status: "Ready", thumb: "green" },
  { name: "Canal View Studio", location: "Birmingham, England", owner: "Ana Mihai", income: "&pound;15,200", expenses: "&pound;2,420", status: "Ready", thumb: "" },
];

const bookings = [
  { time: "09:00", title: "Checkout inspection", place: "27 High Street", guest: "Sophia Mitchell", status: "Ready" },
  { time: "11:30", title: "Owner handover", place: "The Glass House", guest: "Mia Bennett", status: "Pending" },
  { time: "14:00", title: "Guest arrival", place: "Station Road Flat", guest: "Radu Ionescu", status: "Ready" },
  { time: "16:00", title: "Maintenance visit", place: "Canal View Studio", guest: "Cleaning Express", status: "Pending" },
];

const maintenanceTasks = [
  { title: "Replace kitchen tap", place: "27 High Street", due: "Today", status: "Pending" },
  { title: "Boiler pressure check", place: "The Glass House", due: "Tomorrow", status: "Ready" },
  { title: "Window latch repair", place: "Canal View Studio", due: "28 Oct.", status: "Pending" },
];

const cleaningTasks = [
  { title: "Checkout clean", place: "27 High Street", status: "To do", due: "10:30" },
  { title: "Linen refresh", place: "Station Road Flat", status: "In progress", due: "12:00" },
  { title: "Final inspection", place: "The Glass House", status: "Done", due: "15:30" },
  { title: "Deep clean", place: "Canal View Studio", status: "To do", due: "Friday" },
];

document.addEventListener("click", (event) => {
  const nav = event.target.closest("[data-nav]");
  if (nav) {
    state.active = nav.dataset.nav;
    state.dropdown = null;
    document.body.classList.remove("nav-open");
    render();
    return;
  }

  const menu = event.target.closest("[data-mobile-menu]");
  if (menu) {
    document.body.classList.toggle("nav-open");
    return;
  }

  const dropdown = event.target.closest("[data-dropdown]");
  if (dropdown) {
    state.dropdown = state.dropdown === dropdown.dataset.dropdown ? null : dropdown.dataset.dropdown;
    render();
    return;
  }

  if (!event.target.closest(".dropdown-preview")) {
    state.dropdown = null;
  }
});

render();

function render() {
  const activeItem = navItems.find((item) => item.id === state.active) || navItems[0];
  app.innerHTML = `
    <div class="app-shell">
      ${renderSidebar()}
      <main class="main">
        ${renderTopbar(activeItem)}
        <section class="content">
          ${renderScreen()}
        </section>
      </main>
    </div>
  `;
}

function renderSidebar() {
  return `
    <aside class="sidebar" aria-label="Primary navigation">
      <div class="logo">
        <div class="logo-mark">
          <span>Rent Ready</span>
        </div>
      </div>
      <nav class="nav">
        ${navItems.map((item) => `
          <button class="nav-button ${state.active === item.id ? "is-active" : ""}" data-nav="${item.id}" type="button">
            ${icon(item.icon)}
            <span>${item.label}</span>
          </button>
        `).join("")}
      </nav>
      <div class="profile">
        <div class="avatar mia"></div>
        <div class="profile-copy">
          <strong>Cristi Gaidenic</strong>
          <span>${properties.length} properties</span>
        </div>
        ${icon("chevron")}
      </div>
    </aside>
  `;
}

function renderTopbar(activeItem) {
  const title = activeItem.id === "dashboard" ? "Have a good day, Cristi" : activeItem.label;
  return `
    <header class="topbar">
      <button class="mobile-menu" data-mobile-menu type="button" aria-label="Open navigation">${icon("menu")}</button>
      <h1 class="page-title">${title}</h1>
      <div class="topbar-actions">
        <div class="property-select">
          ${icon("pin")}
          <span>All properties · Demo workspace</span>
          <span class="divider"></span>
          <button data-nav="portfolio" type="button" aria-label="View properties">${icon("chevron")}</button>
        </div>
        <button class="icon-button" data-dropdown="alerts" type="button" aria-label="Notifications">
          <span class="badge">2</span>
          ${icon("bell")}
        </button>
        <button class="icon-button" data-dropdown="messages" type="button" aria-label="Messages">
          <span class="badge">2</span>
          ${icon("chat")}
        </button>
      </div>
      ${renderDropdown()}
    </header>
  `;
}

function renderDropdown() {
  if (!state.dropdown) return "";
  const items = {
    property: ["27 High Street", "The Glass House", "Station Road Flat"],
    alerts: ["Kitchen tap replacement due today", "Checkout clean due at 10:30"],
    messages: ["New owner message", "Cleaner marked job complete"],
  }[state.dropdown] || [];
  return `
    <div class="dropdown-preview">
      ${items.map((item) => `<button type="button">${icon("dot")}<span>${item}</span></button>`).join("")}
    </div>
  `;
}

function renderScreen() {
  const screens = {
    dashboard: renderDashboard,
    portfolio: renderPortfolio,
    calendar: renderCalendar,
    reports: renderReports,
    bookings: renderBookings,
    invoices: renderInvoices,
    cleaning: renderCleaning,
    maintenance: renderMaintenance,
  };
  return (screens[state.active] || renderDashboard)();
}

function renderDashboard() {
  const stats = [
    { value: properties.length, label: "Managed properties", link: "View all properties", nav: "portfolio" },
    { value: `${properties.filter((property) => property.status === "Ready").length} / ${properties.length}`, label: "Properties ready", link: "Review property readiness", nav: "portfolio" },
    { value: cleaningTasks.filter((task) => task.status !== "Done").length + maintenanceTasks.length, label: "Open cleaning & maintenance tasks", link: "Review maintenance", nav: "maintenance" },
  ];
  return `
    <div class="dashboard-grid">
      ${stats.map(renderStatCard).join("")}
      <section class="panel">
        <div class="panel-header">
          <h2 class="panel-title">Today's property schedule</h2>
          <button class="panel-link" data-nav="calendar" type="button">View calendar</button>
        </div>
        <div class="schedule">${bookings.map(renderBookingCard).join("")}</div>
      </section>
      <section class="panel">
        <div class="panel-header">
          <h2 class="panel-title">Property readiness</h2>
          <button class="panel-link" data-nav="portfolio" type="button">View properties</button>
        </div>
        <div class="list">
          ${properties.map((property) => `
            <div class="list-row">
              <div class="entity"><div class="property-thumb ${property.thumb}"></div><div class="entity-copy"><strong>${property.name}</strong><span>${property.location}</span></div></div>
              <span class="status ${property.status === "Ready" ? "ready" : "pending"}">${property.status}</span>
            </div>
          `).join("")}
        </div>
      </section>
      <section class="panel">
        <div class="panel-header">
          <h2 class="panel-title">Cleaning & turnovers</h2>
          <button class="panel-link" data-nav="cleaning" type="button">View cleaning</button>
        </div>
        <div class="schedule">${cleaningTasks.filter((task) => task.status !== "Done").map(renderTask).join("")}</div>
      </section>
      <section class="panel">
        <div class="panel-header">
          <h2 class="panel-title">Maintenance to arrange</h2>
          <button class="panel-link" data-nav="maintenance" type="button">View maintenance</button>
        </div>
        <div class="schedule">${maintenanceTasks.map(renderTask).join("")}</div>
      </section>
    </div>
  `;
}

function renderStatCard(stat) {
  return `
    <article class="stat-card">
      <div class="stat-main">
        <div class="stat-copy">
          <strong class="stat-value">${stat.value}</strong>
          <span class="stat-label">${stat.label}</span>
        </div>

      </div>
      <button class="stat-link" data-nav="${stat.nav}" type="button">${stat.link}${icon("chevron")}</button>
    </article>
  `;
}

function renderCompactList(title, action, rows, logos = false) {
  return `
    <section class="panel">
      <div class="panel-header">
        <h2 class="panel-title">${title}</h2>
        <button class="panel-link" type="button">${action}</button>
      </div>
      <div class="list">
        ${rows.slice(0, 4).map((row) => renderMoneyRow(row, logos)).join("")}
      </div>
    </section>
  `;
}

function renderMoneyRow(row, logos) {
  return `
    <div class="list-row">
      <div class="entity">
        ${logos ? `<div class="logo-avatar">${row.logo}</div>` : `<div class="avatar ${row.avatar || ""}"></div>`}
        <div class="entity-copy">
          <div class="entity-title">
            <strong>${row.name}</strong>
            ${row.role ? `<span class="tag">${row.role}</span>` : ""}
          </div>
          <span>${row.date}</span>
        </div>
      </div>
      <div class="amount"><strong>${row.amount}</strong><span>${row.eur}</span></div>
      ${icon("chevron")}
    </div>
  `;
}

function renderPortfolio() {
  return `
    <section class="panel full">
      ${renderToolbar("Properties", ["Add property", "Import CSV"], true)}
      <div class="table">
        <div class="table-head">
          <span>Property</span><span>Income</span><span>Readiness</span><span>Owner</span><span>Expenses</span><span>Next activity</span><span>Cleaning</span><span>Maintenance</span><span></span>
        </div>
        ${properties.map((property, index) => `
          <div class="table-row">
            <div class="property-cell">
              <div class="property-thumb ${property.thumb}"></div>
              <div><strong>${property.name}</strong><span>${property.location}</span></div>
            </div>
            <strong>${property.income}</strong>
            <span>${property.status}</span>
            <strong>${property.owner}</strong>
            <strong>${property.expenses}</strong>
            <span>${bookings.find((booking) => booking.place === property.name)?.time || "Unscheduled"}</span>
            <span>${cleaningTasks.find((task) => task.place === property.name)?.status || "None scheduled"}</span>
            <span>${maintenanceTasks.filter((task) => task.place === property.name).length} open</span>
            ${icon("chevron")}
          </div>
        `).join("")}
      </div>
    </section>
  `;
}

function renderCalendar() {
  return `
    <div class="calendar">
      <section class="panel">
        <div class="mini-month">
          <h3>October 2023</h3>
          <div class="month-grid">
            ${["M", "T", "W", "T", "F", "S", "S"].map((day) => `<span class="day-name">${day}</span>`).join("")}
            ${Array.from({ length: 35 }, (_, index) => {
              const day = index - 1;
              if (day < 1 || day > 31) return "<span></span>";
              return `<button class="${[5, 7, 24, 31].includes(day) ? "is-active" : ""}" type="button">${day}</button>`;
            }).join("")}
          </div>
        </div>
      </section>
      <section class="panel">
        <div class="panel-header tall">
          <h2 class="panel-title">Bookings and tasks</h2>
          <div class="segmented"><button class="is-active">Day</button><button>Week</button><button>Month</button></div>
        </div>
        <div class="schedule">${bookings.map(renderBookingCard).join("")}</div>
      </section>
    </div>
  `;
}

function renderBookingCard(booking) {
  return `
    <article class="booking-card">
      <strong class="booking-time">${booking.time}</strong>
      <div><h3>${booking.title}</h3><p>${booking.place} / ${booking.guest}</p></div>
      <span class="status ${booking.status === "Ready" ? "ready" : "pending"}">${booking.status}</span>
    </article>
  `;
}

function renderReports() {
  return `
    <div class="dashboard-grid">
      <section class="panel full">${renderToolbar("Reports", ["Export PDF", "Export CSV"], false)}</section>
      <div class="report-grid panel full">
        ${[
          ["Gross income", "&pound;108k", "Across all active properties"],
          ["Operating expenses", "&pound;21.6k", "Recorded and categorized"],
          ["Average occupancy", "84%", "Bookings across October"],
          ["Properties ready", `${properties.filter((property) => property.status === "Ready").length} / ${properties.length}`, "Current property readiness"],
        ].map(([title, value, copy]) => `
          <article class="report-card">${icon("report")}<strong>${value}</strong><p class="muted">${title}</p><p class="muted">${copy}</p></article>
        `).join("")}
      </div>
      <section class="panel full">
        <div class="panel-header"><h2 class="panel-title">Income by month</h2><button class="panel-link">View details</button></div>
        <div class="bar-chart">
          ${[45, 62, 55, 82, 70, 90, 78, 88, 96, 72, 84, 100].map((height, index) => `<span style="--height:${height}%;--alpha:${0.42 + index / 24}"></span>`).join("")}
        </div>
      </section>
    </div>
  `;
}

function renderBookings() {
  return `
    <section class="panel full">
      ${renderToolbar("Bookings", ["New booking", "Import iCal"], true)}
      <div class="schedule">${bookings.concat([
        { time: "18:30", title: "Late checkout", place: "27 High Street", guest: "Ana Mihai", status: "Pending" },
        { time: "20:00", title: "Direct booking", place: "The Glass House", guest: "RCS-RDS", status: "Ready" },
      ]).map(renderBookingCard).join("")}</div>
    </section>
  `;
}

function renderInvoices() {
  return `
    <section class="panel full">
      ${renderToolbar("Invoices", ["Issue invoice", "Export"], true)}
      <div class="list">${invoices.map((invoice) => renderMoneyRow(invoice, false)).join("")}</div>
    </section>
  `;
}

function renderCleaning() {
  return `
    <div class="cleaning-board">
      ${["To do", "In progress", "Done"].map((column) => `
        <section class="kanban-column">
          <h2>${column}</h2>
          ${cleaningTasks.filter((task) => task.status === column).map(renderTask).join("") || `<article class="task-card"><span>No tasks</span></article>`}
        </section>
      `).join("")}
    </div>
  `;
}

function renderMaintenance() {
  return `
    <section class="panel full">
      ${renderToolbar("Maintenance", ["New task", "Assign"], true)}
      <div class="list">
        ${maintenanceTasks.map((task) => `
          <div class="list-row">
            <div class="entity"><div class="feature-icon">${icon("wrench")}</div><div class="entity-copy"><div class="entity-title"><strong>${task.title}</strong></div><span>${task.place}</span></div></div>
            <div class="amount"><strong>${task.due}</strong><span>Due</span></div>
            ${icon("chevron")}
          </div>
        `).join("")}
      </div>
    </section>
  `;
}

function renderToolbar(title, buttons, search) {
  return `
    <div class="toolbar">
      <div class="toolbar-left">
        <button class="primary-button" type="button">${buttons[0]} ${icon("plus")}</button>
        ${buttons[1] ? `<button class="outline-button" type="button">${buttons[1]}</button>` : ""}
      </div>
      <div class="toolbar-right">
        ${search ? `<div class="search-control"><span>Search...</span>${icon("search")}</div>` : ""}
        <div class="segmented"><button class="is-active">${icon("list")}</button><button>${icon("grid")}</button></div>
      </div>
    </div>
  `;
}

function renderSideSummary(title, rows) {
  return `
    <aside class="panel">
      <div class="panel-header tall"><h2 class="panel-title">${title}</h2></div>
      <div class="summary-box">
        ${rows.map(([label, value]) => `<div class="summary-line"><span>${label}</span><strong>${value}</strong></div>`).join("")}
        <button class="primary-button" type="button">Continue ${icon("arrow")}</button>
      </div>
    </aside>
  `;
}

function renderTask(task) {
  return `
    <article class="task-card">
      <strong>${task.title}</strong>
      <span>${task.place}</span>
      <div class="summary-line"><span>Due</span><strong>${task.due}</strong></div>
    </article>
  `;
}

function field(label, value) {
  return `<label class="field"><span>${label}</span><input value="${value}" /></label>`;
}

function icon(name) {
  const icons = {
    home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M9 21v-7h6v7"/>',
    building: '<path d="M4 21V5h9v16"/><path d="M13 9h7v12"/><path d="M7 8h2M7 12h2M7 16h2M16 13h1M16 17h1"/>',
    calendar: '<path d="M7 3v4M17 3v4"/><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18"/>',
    report: '<path d="M4 19V5"/><path d="M4 19h16"/><path d="M8 16v-5M12 16V8M16 16v-7"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    file: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/><path d="M8 13h8M8 17h5"/>',
    send: '<path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/>',
    archive: '<path d="M4 7h16"/><path d="M5 7v12h14V7"/><path d="M8 7V5h8v2"/><path d="M10 12h4"/>',
    sparkle: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"/>',
    wrench: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-3 3-3-3z"/>',
    pin: '<path d="M12 21s7-5.2 7-12a7 7 0 1 0-14 0c0 6.8 7 12 7 12z"/><circle cx="12" cy="9" r="2"/>',
    chevron: '<path d="m9 18 6-6-6-6"/>',
    bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/>',
    chat: '<path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3-3"/>',
    arrow: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
    up: '<circle cx="12" cy="12" r="10"/><path d="m8 14 4-4 4 4"/><path d="M12 18v-8"/>',
    down: '<circle cx="12" cy="12" r="10"/><path d="m8 10 4 4 4-4"/><path d="M12 6v8"/>',
    download: '<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/>',
    pen: '<path d="m16 3 5 5L8 21H3v-5z"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    dot: '<circle cx="12" cy="12" r="4"/>',
    upload: '<path d="M12 21V9"/><path d="m7 14 5-5 5 5"/><path d="M5 3h14"/>',
    list: '<path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/>',
    grid: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>',
  };
  return `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${icons[name] || icons.file}</svg>`;
}
