/**
 * js/data.js
 * ------------------------------------------------------------------
 * Placeholder data for the RouteSense AI dashboard.
 *
 * This file stands in for a backend API. Everything the dashboard
 * renders is read from the `RouteSenseData` object below. When a
 * real backend is ready, replace the contents of this file with
 * `fetch()` calls (see the commented example at the bottom) that
 * populate the same shape, then call `renderDashboard()` again.
 * ------------------------------------------------------------------
 */

const RouteSenseData = {

  user: {
    name: "Admin",
    role: "Administrator",
  },

  notifications: {
    count: 5,
  },

  topbarWeather: {
    tempC: 26,
    city: "Guwahati",
  },

  systemStatus: {
    online: true,
    items: [
      { label: "Data Sync", value: "2 min ago", state: "ok" },
      { label: "Weather API", value: "Active", state: "ok" },
      { label: "GPS Feed", value: "Live", state: "info" },
      { label: "Server", value: "Healthy", state: "ok" },
    ],
  },

  kpis: [
    {
      id: "accessibility-score",
      label: "Overall Accessibility Score",
      value: 72,
      unit: "/100",
      sub: "Moderate",
      tone: "green",
      icon: "gauge",
      trend: { direction: "up", text: "8% vs yesterday" },
    },
    {
      id: "active-alerts",
      label: "Active Alerts",
      value: 12,
      sub: "High Priority",
      tone: "red",
      icon: "triangle-alert",
      trend: { direction: "up", text: "3 new alerts", alert: true },
    },
    {
      id: "routes-analyzed",
      label: "Routes Analyzed",
      value: 24,
      sub: "Today",
      tone: "blue",
      icon: "bar-chart-3",
      trend: { direction: "up", text: "10% vs yesterday" },
    },
    {
      id: "field-reports",
      label: "Field Reports",
      value: 36,
      sub: "Today",
      tone: "purple",
      icon: "clipboard-list",
      trend: { direction: "up", text: "5 vs yesterday" },
    },
  ],

  riskSummary: {
    totalRoutes: 24,
    bands: [
      { key: "safe", label: "Safe (0–40)", pct: 62, count: 15, colorVar: "--green-500" },
      { key: "moderate", label: "Moderate (40–70)", pct: 25, count: 6, colorVar: "--amber-500" },
      { key: "high", label: "High Risk (70–100)", pct: 13, count: 3, colorVar: "--red-500" },
    ],
  },

  activeAlerts: [
    {
      id: "a1",
      title: "Landslide reported on NH-229",
      location: "West Kameng, Arunachal Pradesh",
      timeAgo: "10 min ago",
      severity: "high",
    },
    {
      id: "a2",
      title: "Flooding on NH-127B",
      location: "Cachar, Assam",
      timeAgo: "25 min ago",
      severity: "medium",
    },
    {
      id: "a3",
      title: "Road blockage on NH-2",
      location: "Dimapur, Nagaland",
      timeAgo: "1 hr ago",
      severity: "high",
    },
    {
      id: "a4",
      title: "Heavy Rain Warning",
      location: "Multiple Districts",
      timeAgo: "2 hr ago",
      severity: "medium",
    },
  ],

  activeVehicles: {
    onMove: 18,
    stopped: 4,
    delayed: 2,
  },

  weather: {
    now: { tempC: 26, city: "Guwahati", condition: "Light Rain" },
    forecast: [
      { day: "Today", condition: "rain", high: 26, low: 20 },
      { day: "Tomorrow", condition: "rain", high: 28, low: 21 },
      { day: "Wed", condition: "rain", high: 29, low: 22 },
    ],
  },

  fieldReports: [
    {
      id: "r1",
      title: "Flooding",
      location: "NH-127B, Cachar, Assam",
      timeAgo: "25 min ago",
      severity: "medium",
      thumbUrl: "",
    },
    {
      id: "r2",
      title: "Landslide",
      location: "NH-229, West Kameng, Arunachal Pradesh",
      timeAgo: "1 hr ago",
      severity: "high",
      thumbUrl: "",
    },
    {
      id: "r3",
      title: "Road Damage",
      location: "SH-1, Churachandpur, Manipur",
      timeAgo: "2 hr ago",
      severity: "medium",
      thumbUrl: "",
    },
  ],

  liveMap: {
    // Backend/mapping integrator: feed real coordinates + route geometry here.
    // Suggested shape for when Leaflet/Mapbox is wired in:
    center: { lat: 26.2, lng: 92.9 },
    zoom: 6,
    routes: [],   // [{ id, path: [[lat,lng], ...], risk: 'safe'|'moderate'|'high'|'blocked' }]
    markers: [],  // [{ id, lat, lng, type: 'alert'|'vehicle'|'depot', label }]
  },
};

/* ------------------------------------------------------------------
 * Example: swapping in a real backend later
 * ------------------------------------------------------------------
 *
 * async function loadDashboardData() {
 *   const res = await fetch("/api/dashboard/overview");
 *   const json = await res.json();
 *   Object.assign(RouteSenseData, json);
 *   renderDashboard();
 * }
 * loadDashboardData();
 *
 * Keep the field names above (or update render.js to match your API).
 * ------------------------------------------------------------------ */
