/**
 * js/app.js
 * ------------------------------------------------------------------
 * Wiring: sidebar navigation, mobile menu toggle, and dashboard init.
 *
 * This is a single-page shell showing the Dashboard view only. The
 * other sidebar links (Live Map, Route Planner, AI Risk Analysis,
 * Field Reporting, Alerts & Monitoring, Vehicles, Reports, Settings)
 * are wired up with `data-route` attributes and an active-state
 * handler, so a future contributor can drop in real page/view
 * templates per route without touching the nav markup.
 * ------------------------------------------------------------------
 */

document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) window.lucide.createIcons();

  renderDashboard();

  initSidebarNav();
  initMobileMenu();
  initSearchStub();
});

function initSidebarNav() {
  const links = document.querySelectorAll(".nav-item[data-route], [data-route]");

  links.forEach(link => {
    link.addEventListener("click", (e) => {
      const route = link.getAttribute("data-route");
      if (!route) return;

      // Only the Dashboard view is implemented in this static build.
      if (route !== "dashboard") {
        e.preventDefault();
        notifyRouteNotBuilt(route);
        return;
      }

      setActiveNav(route);
    });
  });
}

function setActiveNav(route) {
  document.querySelectorAll(".nav-item").forEach(item => {
    item.classList.toggle("is-active", item.dataset.route === route);
  });
}

function notifyRouteNotBuilt(route) {
  // Placeholder UX for routes not yet implemented in this frontend-only build.
  // Replace with real client-side routing (or server-rendered pages) later.
  console.info(`[RouteSense] "${route}" view is not implemented in this static build yet.`);
  const label = document.querySelector(`.nav-item[data-route="${route}"]`)?.textContent?.trim();
  window.alert(`${label || route} is coming soon — this demo only wires up the Dashboard view.`);
}

function initMobileMenu() {
  const toggle = document.getElementById("menu-toggle");
  const sidebar = document.getElementById("sidebar");
  if (!toggle || !sidebar) return;

  toggle.addEventListener("click", () => {
    const isOpen = sidebar.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  document.addEventListener("click", (e) => {
    if (!sidebar.classList.contains("is-open")) return;
    if (sidebar.contains(e.target) || toggle.contains(e.target)) return;
    sidebar.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  });
}

function initSearchStub() {
  const input = document.getElementById("global-search");
  if (!input) return;

  input.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    const query = input.value.trim();
    if (!query) return;

    // TODO(backend): wire this up to a real search endpoint, e.g.
    //   fetch(`/api/search?q=${encodeURIComponent(query)}`)
    console.info(`[RouteSense] search submitted: "${query}"`);
  });
}
