const app = document.querySelector("#app");

const state = {
  active: "dashboard",
  dropdown: null,
};

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: "home" },
  { id: "portfolio", label: "Portfolio", icon: "building" },
  { id: "calendar", label: "Calendar", icon: "calendar" },
  { id: "reports", label: "Reports", icon: "report" },
  { id: "bookings", label: "Bookings", icon: "clock" },
  { id: "invoices", label: "Invoices", icon: "file" },
  { id: "einvoice", label: "e-Invoice", icon: "send" },
  { id: "unique", label: "Unique declaration", icon: "archive" },
  { id: "cleaning", label: "Cleaning", icon: "sparkle" },
  { id: "maintenance", label: "Maintenance", icon: "wrench" },
];

const stats = [
  { value: "&pound;108,000", label: "Total income 2023", trend: "+2.4%", link: "5 uncollected Invoices" },
  { value: "&pound;21,600", label: "Total expenses 2023", trend: "-1.6%", down: true, link: "2 unrecorded expenses" },
  { value: "&pound;17,610", label: "Tax calculation 2023", trend: "+2.4%", link: "See all taxes" },
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
  { name: "27 High Street", location: "London, England", owner: "Cristi Gaidenic", income: "&pound;42,800", expenses: "&pound;8,200", status: "Synced", thumb: "" },
  { name: "The Glass House", location: "Bristol, England", owner: "Mia Bennett", income: "&pound;31,600", expenses: "&pound;6,900", status: "Review", thumb: "alt" },
  { name: "Station Road Flat", location: "Manchester, England", owner: "Bogdan Popescu", income: "&pound;18,400", expenses: "&pound;3,100", status: "Synced", thumb: "green" },
  { name: "Canal View Studio", location: "Birmingham, England", owner: "Ana Mihai", income: "&pound;15,200", expenses: "&pound;2,420", status: "Synced", thumb: "" },
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
          <span>credos</span>
          <span class="logo-icon" aria-hidden="true"><span class="logo-line"></span></span>
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
          <span>3 properties</span>
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
          <span>27 High Street, London, England</span>
          <span class="divider"></span>
          <button data-dropdown="property" type="button" aria-label="Open property menu">${icon("chevron")}</button>
        </div>
        <button class="icon-button" data-dropdown="alerts" type="button" aria-label="Notifications">
          <span class="badge">2</span>
          ${icon("bell")}
        </button>
        <button class="icon-button" data-dropdown="messages" type="button" aria-label="Messages">
          <span class="badge">1</span>
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
    alerts: ["2 unrecorded expenses", "Tax calculation updated", "Invoice due today"],
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
    einvoice: renderEInvoice,
    unique: renderUniqueDeclaration,
    cleaning: renderCleaning,
    maintenance: renderMaintenance,
  };
  return (screens[state.active] || renderDashboard)();
}

function renderDashboard() {
  return `
    <div class="dashboard-grid">
      ${stats.map(renderStatCard).join("")}
      <section class="panel">
        <div class="panel-header">
          <h2 class="panel-title">Issue an invoice</h2>
        </div>
        <div class="invoice-form">
          <div class="search-control"><span>Search / add client</span>${icon("search")}</div>
          <div class="control">0.00</div>
          <div class="control"><span>GBP</span>${icon("chevron")}</div>
          <button class="primary-button" type="button">Next step ${icon("arrow")}</button>
        </div>
      </section>
      <section class="panel">
        <div class="panel-header">
          <h2 class="panel-title">Charge an income or expense</h2>
          ${icon("info")}
        </div>
        <div class="charge-actions">
          <button class="outline-button" type="button">Income ${icon("plus")}</button>
          <button class="outline-button" type="button">Expense ${icon("plus")}</button>
        </div>
      </section>
      ${renderCompactList("Last invoices emited", "View all invoices", invoices)}
      ${renderCompactList("Last recorded expenses", "View all expenses", expenses, true)}
      <article class="feature-card">
        <div class="feature-icon">${icon("download")}</div>
        <div class="feature-bottom">
          <div class="feature-copy">
            <h3>Export documents</h3>
            <p>Download invoices, expenses and tax-ready statements for your selected property.</p>
          </div>
          <button class="outline-button" type="button">Download ${icon("download")}</button>
        </div>
      </article>
      <article class="feature-card">
        <div class="feature-icon">${icon("pen")}</div>
        <div class="feature-bottom">
          <div class="feature-copy">
            <h3>Declare manually</h3>
            <p>Create or edit fiscal declarations when the automated flow needs a manual review.</p>
          </div>
          <button class="outline-button" type="button">Open ${icon("arrow")}</button>
        </div>
      </article>
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
        <div class="trend ${stat.down ? "down" : ""}">${stat.trend} ${icon(stat.down ? "down" : "up")}</div>
      </div>
      <a class="stat-link" href="#">${stat.link}${icon("chevron")}</a>
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
          <span>Property</span><span>Income</span><span>Tax</span><span>Owner</span><span>Expenses</span><span>Next booking</span><span>Last sync</span><span>Status</span><span></span>
        </div>
        ${properties.map((property, index) => `
          <div class="table-row">
            <div class="property-cell">
              <div class="property-thumb ${property.thumb}"></div>
              <div><strong>${property.name}</strong><span>${property.location}</span></div>
            </div>
            <strong>${property.income}</strong>
            <span>18%</span>
            <strong>${property.owner}</strong>
            <strong>${property.expenses}</strong>
            <span>${bookings[index % bookings.length].time}</span>
            <span>Today</span>
            <span class="status ${property.status === "Synced" ? "synced" : "review"}">${property.status}</span>
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
          ["Projected tax", "&pound;17.6k", "Based on current rules"],
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

function renderEInvoice() {
  return `
    <div class="form-layout">
      <section class="panel">
        <div class="panel-header tall"><h2 class="panel-title">Upload e-Invoice</h2><span class="status synced">ANAF ready</span></div>
        <div class="form-grid">
          <div class="upload-zone">${icon("upload")}<strong>Drop XML or PDF files here</strong></div>
          <div class="form-grid two">
            ${field("Supplier", "Credos Services")}
            ${field("Invoice number", "INV-2023-1042")}
            ${field("Amount", "120.00 GBP")}
            ${field("Category", "Platform expense")}
          </div>
          <button class="primary-button" type="button">Validate e-Invoice ${icon("arrow")}</button>
        </div>
      </section>
      ${renderSideSummary("Detected data", [["Supplier", "Credos"], ["VAT", "20%"], ["Due date", "31 Oct. 2023"], ["Status", "Ready to submit"]])}
    </div>
  `;
}

function renderUniqueDeclaration() {
  return `
    <div class="form-layout">
      <section class="panel">
        <div class="panel-header tall">
          <h2 class="panel-title">Unique declaration</h2>
          <div class="segmented"><button class="is-active">2023</button><button>2022</button><button>2021</button></div>
        </div>
        <div class="list">
          ${[
            ["Rental income", "&pound;108,000", "Declared from property income"],
            ["Deductible expenses", "&pound;21,600", "Matched invoices and receipts"],
            ["Taxable income", "&pound;86,400", "Automatically calculated"],
            ["Estimated tax", "&pound;17,610", "Ready for review"],
          ].map(([title, amount, copy]) => `
            <div class="list-row"><div class="entity"><div class="feature-icon">${icon("file")}</div><div class="entity-copy"><div class="entity-title"><strong>${title}</strong></div><span>${copy}</span></div></div><div class="amount"><strong>${amount}</strong></div>${icon("chevron")}</div>
          `).join("")}
        </div>
      </section>
      ${renderSideSummary("Submission", [["Selected year", "2023"], ["Properties", "3"], ["Fiscal status", "Draft"], ["Next action", "Download PDF"]])}
    </div>
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
