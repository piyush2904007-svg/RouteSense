/**
 * js/render.js
 * ------------------------------------------------------------------
 * Pure rendering layer: reads from `RouteSenseData` (js/data.js) and
 * writes DOM. No business logic and no fetches live here — swap the
 * data source in data.js and call renderDashboard() again.
 * ------------------------------------------------------------------
 */

function iconSvg(name, cls) {
  return `<i data-lucide="${name}"${cls ? ` class="${cls}"` : ""}></i>`;
}

function el(html) {
  const t = document.createElement("template");
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
}

/* ---------------- Topbar ---------------- */
function renderTopbar(data) {
  document.getElementById("profile-name").textContent = data.user.name;
  document.getElementById("profile-role").textContent = data.user.role;
  document.getElementById("notif-count").textContent = data.notifications.count;
  document.getElementById("topbar-temp").textContent = `${data.topbarWeather.tempC}°C`;
  document.getElementById("topbar-city").textContent = data.topbarWeather.city;
}

/* ---------------- Sidebar status ---------------- */
function renderSystemStatus(data) {
  const pill = document.getElementById("system-status-pill");
  pill.textContent = data.systemStatus.online ? "Online" : "Offline";
  pill.classList.toggle("pill-online", data.systemStatus.online);

  const list = document.getElementById("system-status-list");
  list.innerHTML = data.systemStatus.items.map(item => `
    <li>
      <span>${item.label}</span>
      <span class="status-val">
        ${item.value}
        ${iconSvg(item.state === "ok" ? "check-circle-2" : "circle-dot", item.state === "ok" ? "status-ok" : "status-info")}
      </span>
    </li>
  `).join("");
}

/* ---------------- KPI cards ---------------- */
function renderKpis(data) {
  const grid = document.getElementById("kpi-grid");
  grid.innerHTML = data.kpis.map(kpi => `
    <article class="kpi-card" data-tone="${kpi.tone}">
      <div class="kpi-card-top">
        <h3>${kpi.label} ${iconSvg("info")}</h3>
        <span class="kpi-icon">${iconSvg(kpi.icon)}</span>
      </div>
      <div class="kpi-value">${kpi.value}${kpi.unit ? `<span class="kpi-unit">${kpi.unit}</span>` : ""}</div>
      <div class="kpi-sub" style="color:var(--ink-500)">${kpi.sub}</div>
      <div class="kpi-trend${kpi.trend.alert ? " is-alert" : ""}">
        <span class="up">${iconSvg("arrow-up")} ${kpi.trend.text}</span>
      </div>
    </article>
  `).join("");
}

/* ---------------- Risk donut (canvas) ---------------- */
function renderRiskSummary(data) {
  const { totalRoutes, bands } = data.riskSummary;
  document.getElementById("donut-total").textContent = totalRoutes;

  const legend = document.getElementById("risk-legend");
  legend.innerHTML = bands.map(b => `
    <li>
      <span class="dot" style="background:var(${b.colorVar})"></span>
      <span class="legend-text">
        ${b.label}
        <small>${b.count} routes</small>
      </span>
      <span class="legend-pct" style="color:var(${b.colorVar})">${b.pct}%</span>
    </li>
  `).join("");

  drawDonut("risk-donut", bands);
}

function drawDonut(canvasId, bands) {
  const canvas = document.getElementById(canvasId);
  if (!canvas || !canvas.getContext) return;
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const size = canvas.width; // square, css-controlled via width/height attrs
  canvas.width = size * dpr;
  canvas.height = size * dpr;
  canvas.style.width = size + "px";
  canvas.style.height = size + "px";
  ctx.scale(dpr, dpr);

  const cx = size / 2, cy = size / 2;
  const outerR = size / 2 - 6;
  const thickness = 22;
  const innerR = outerR - thickness;

  const styles = getComputedStyle(document.documentElement);
  let start = -Math.PI / 2;

  ctx.clearRect(0, 0, size, size);

  bands.forEach(b => {
    const frac = b.pct / 100;
    const end = start + frac * Math.PI * 2;
    const color = styles.getPropertyValue(b.colorVar).trim() || "#999";

    ctx.beginPath();
    ctx.arc(cx, cy, (outerR + innerR) / 2, start, end);
    ctx.lineWidth = thickness;
    ctx.strokeStyle = color;
    ctx.lineCap = "butt";
    ctx.stroke();

    start = end;
  });
}

/* ---------------- Active alerts ---------------- */
function renderAlerts(data) {
  const list = document.getElementById("alert-list");
  list.innerHTML = data.activeAlerts.map(a => `
    <li class="alert-item">
      <span class="alert-ic tone-${a.severity}">${iconSvg(a.severity === "high" ? "triangle-alert" : "flame")}</span>
      <div class="alert-body">
        <p>${a.title}</p>
        <small>${a.location}</small>
      </div>
      <div class="alert-meta">
        <time>${a.timeAgo}</time>
        <span class="tag tag-${a.severity}">${a.severity === "high" ? "High" : "Medium"}</span>
      </div>
    </li>
  `).join("");
}

/* ---------------- Active vehicles ---------------- */
function renderVehicles(data) {
  const wrap = document.getElementById("vehicle-stats");
  const v = data.activeVehicles;
  wrap.innerHTML = `
    <div class="vstat on-move"><strong>${v.onMove}</strong><small>On Move</small></div>
    <div class="vstat stopped"><strong>${v.stopped}</strong><small>Stopped</small></div>
    <div class="vstat delayed"><strong>${v.delayed}</strong><small>Delayed</small></div>
    <div class="vehicle-illustration">${iconSvg("truck")}</div>
  `;
}

/* ---------------- Weather ---------------- */
const weatherIconMap = {
  rain: "cloud-rain",
  drizzle: "cloud-drizzle",
  sun: "sun",
  cloud: "cloud",
  storm: "cloud-lightning",
};

function renderWeather(data) {
  const { now, forecast } = data.weather;
  document.getElementById("weather-now").innerHTML = `
    <span class="weather-now-ic">${iconSvg("cloud-rain")}</span>
    <div>
      <strong>${now.tempC}°C</strong>
      <div class="wloc">${now.city}</div>
      <div class="wdesc">${now.condition}</div>
    </div>
  `;

  document.getElementById("weather-days").innerHTML = forecast.map(f => `
    <li>
      <span class="wday">${f.day}</span>
      ${iconSvg(weatherIconMap[f.condition] || "cloud")}
      <span class="wtemp">${f.high}° / ${f.low}°</span>
    </li>
  `).join("");
}

/* ---------------- Field reports ---------------- */
function renderFieldReports(data) {
  const list = document.getElementById("report-list");
  list.innerHTML = data.fieldReports.map(r => `
    <li class="report-item">
      <span class="report-thumb" style="${r.thumbUrl ? `background-image:url('${r.thumbUrl}')` : ""}"></span>
      <div class="report-body">
        <p>${r.title}</p>
        <small>${r.location}</small>
      </div>
      <div class="report-meta">
        <time>${r.timeAgo}</time>
        <span class="tag tag-${r.severity}">${r.severity === "high" ? "High" : "Medium"}</span>
      </div>
    </li>
  `).join("");
}

/* ---------------- Entry point ---------------- */
function renderDashboard() {
  renderTopbar(RouteSenseData);
  renderSystemStatus(RouteSenseData);
  renderKpis(RouteSenseData);
  renderRiskSummary(RouteSenseData);
  renderAlerts(RouteSenseData);
  renderVehicles(RouteSenseData);
  renderWeather(RouteSenseData);
  renderFieldReports(RouteSenseData);

  // (Re)initialise icons for anything injected after the initial load.
  if (window.lucide) window.lucide.createIcons();
}
