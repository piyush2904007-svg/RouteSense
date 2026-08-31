# RouteSense AI — Dashboard (Frontend)

A static, frontend-only build of the RouteSense AI "Dashboard Overview" screen —
smart logistics & accessibility monitoring for the North Eastern Region (NER).

This is **HTML/CSS/vanilla JS only**. No build step, no framework, no backend.
It's meant as a starting point for a team to wire up real data and additional
pages/views.

## Preview

Open `index.html` directly in a browser, or serve the folder statically:

```bash
# any static server works, e.g.
npx serve .
# or
python3 -m http.server 8080
```

## Project structure

```
routesense/
├── index.html          # Dashboard page markup
├── css/
│   └── styles.css      # All styling (design tokens at the top via CSS variables)
├── js/
│   ├── data.js         # Mock data — stand-in for a backend API (see below)
│   ├── render.js        # Pure render functions: data.js -> DOM
│   └── app.js           # Interactivity: nav, mobile menu, search input stub
└── README.md
```

## How it's wired for a backend to be added later

- **All dashboard content comes from one object**, `RouteSenseData` in
  `js/data.js`. Nothing else in the codebase hardcodes numbers or copy.
- `js/render.js` only reads `RouteSenseData` and writes DOM — it has no
  knowledge of where the data came from.
- To connect a real API: replace the contents of `data.js` with a `fetch()`
  call that populates the same object shape, then call `renderDashboard()`
  (defined in `render.js`). An example is commented at the bottom of
  `data.js`.
- The sidebar links (`Live Map`, `Route Planner`, `AI Risk Analysis`,
  `Field Reporting`, `Alerts & Monitoring`, `Vehicles`, `Reports`,
  `Settings`) all carry a `data-route="..."` attribute and are wired up in
  `js/app.js`. Only `Dashboard` has a view in this build — the others show a
  "coming soon" stub so a future contributor can drop in real pages/routes
  without touching the nav markup.
- **Live Map Preview** is a labeled placeholder (`#map-preview` /
  `#map-placeholder` in `index.html`). Swap it for Leaflet, Mapbox GL, or
  Google Maps — `RouteSenseData.liveMap` already has a suggested shape
  (`center`, `zoom`, `routes`, `markers`) to build against.
- **Search bar** (`#global-search`) submits on Enter and logs the query;
  hook it up to a real search endpoint in `initSearchStub()` in `js/app.js`.
- The risk-summary donut is drawn on a `<canvas>` in plain JS
  (`drawDonut()` in `render.js`), reading colors from the CSS custom
  properties in `styles.css` — no charting library dependency.

## Icons

Icons use [Lucide](https://lucide.dev) via CDN (`unpkg.com/lucide`). If you'd
rather not depend on a CDN, swap in the npm package or inline SVGs.

## Deploying

This folder can be pushed straight to a GitHub repo and served with GitHub
Pages:

1. Push this folder to a repo (e.g. as the repo root, or under `/docs`).
2. In the repo's Settings → Pages, set the source to the branch/folder
   containing `index.html`.
3. The dashboard will be live at `https://<username>.github.io/<repo>/`.

## Notes / known gaps (left intentionally for backend/product work)

- Notifications bell, profile menu, and "View all" / "View full ..." links
  are not wired to real views yet.
- No authentication — `Admin / Administrator` in the top-right is static
  placeholder data.
- No persistence — reloading the page resets nothing since there's no state
  beyond what's in `data.js`.
