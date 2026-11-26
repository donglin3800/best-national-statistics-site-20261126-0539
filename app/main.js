// Japan Statistics Atlas — router and controls.
// Hash routing: #/ is the overview, #/population, #/economy, #/prices,
// #/regions and #/sources are the sections. The nav links are plain
// anchors, so every section is reached by a link and works without JS
// frameworks. Controls are wired after each render: the prefecture
// search, the regions table sort and search, the chart/table switch,
// and the CSV download (a Blob made on the device, no network).

import { PREFECTURES, POPULATION_SERIES, GDP_SERIES, CPI_SERIES, UNEMPLOYMENT_SERIES } from './data.js';
import { rankBars } from './charts.js';
import { overviewView, populationView, economyView, pricesView, regionsView, sourcesView } from './views.js';

const ROUTES = {
  '/': { view: overviewView, title: 'Overview' },
  '/population': { view: populationView, title: 'Population' },
  '/economy': { view: economyView, title: 'Economy' },
  '/prices': { view: pricesView, title: 'Prices & work' },
  '/regions': { view: regionsView, title: 'Regions' },
  '/sources': { view: sourcesView, title: 'Data & sources' },
};

const app = document.getElementById('app');
const nav = document.getElementById('main-nav');

function route() {
  const hash = location.hash.replace(/^#/, '') || '/';
  const entry = ROUTES[hash] || ROUTES['/'];
  app.innerHTML = entry.view();
  document.title = `${entry.title} — Japan Statistics Atlas`;
  for (const link of nav.querySelectorAll('a')) {
    link.classList.toggle('current', link.getAttribute('href') === `#${hash}`);
  }
  wireControls(hash);
  window.scrollTo(0, 0);
}

function wireControls(hash) {
  if (hash === '/population') wirePrefectureSearch();
  if (hash === '/regions') wireRegionTable();
  if (hash === '/prices') wirePricesToggle();
  if (hash === '/sources') wireCsvDownload();
}

// Population page: filter the ranked prefecture bars as you type.
function wirePrefectureSearch() {
  const input = document.getElementById('pref-search');
  const box = document.getElementById('pref-bars');
  if (!input || !box) return;
  const render = () => {
    const q = input.value.trim().toLowerCase();
    const top = [...PREFECTURES]
      .filter((p) => !q || p.name.toLowerCase().includes(q))
      .sort((a, b) => b.pop - a.pop)
      .slice(0, 6);
    box.innerHTML = top.length
      ? rankBars(top.map((p) => ({ name: p.name, value: p.pop })), { unit: 'm' })
      : '<p class="empty">No prefecture matches that search.</p>';
  };
  input.addEventListener('input', render);
}

// Regions page: a sortable, searchable table of the 12 prefectures.
function wireRegionTable() {
  const body = document.getElementById('region-body');
  const input = document.getElementById('region-search');
  const table = document.getElementById('region-table');
  if (!body || !table) return;
  let rows = [...PREFECTURES];
  let key = 'pop';
  let dir = -1;
  const draw = () => {
    const q = (input?.value ?? '').trim().toLowerCase();
    const shown = rows.filter((p) => !q || p.name.toLowerCase().includes(q) || p.capital.toLowerCase().includes(q));
    body.innerHTML = shown.length
      ? shown.map((p) => `<tr><td><strong>${p.name}</strong></td><td>${p.capital}</td>`
        + `<td>${p.pop.toFixed(2)}</td><td>${p.area.toLocaleString('en-US')}</td>`
        + `<td>${p.density.toLocaleString('en-US')}</td></tr>`).join('')
      : '<tr><td colspan="5" class="empty">No prefecture matches that search.</td></tr>';
  };
  const sortBy = (nextKey) => {
    if (nextKey === key) dir = -dir;
    else { key = nextKey; dir = nextKey === 'name' || nextKey === 'capital' ? 1 : -1; }
    rows.sort((a, b) => {
      const va = a[key], vb = b[key];
      return (typeof va === 'string' ? va.localeCompare(vb) : va - vb) * dir;
    });
    draw();
  };
  table.querySelectorAll('th button').forEach((btn) => {
    btn.addEventListener('click', () => sortBy(btn.dataset.sort));
  });
  input?.addEventListener('input', draw);
  rows.sort((a, b) => b.pop - a.pop);
  draw();
}

// Prices page: switch the inflation/unemployment view between charts and table.
function wirePricesToggle() {
  const chartBtn = document.getElementById('toggle-chart');
  const tableBtn = document.getElementById('toggle-table');
  const chart = document.getElementById('prices-chart');
  const table = document.getElementById('prices-table');
  if (!chartBtn || !tableBtn || !chart || !table) return;
  const show = (which) => {
    const asChart = which === 'chart';
    chart.hidden = !asChart;
    table.hidden = asChart;
    chartBtn.classList.toggle('active', asChart);
    tableBtn.classList.toggle('active', !asChart);
  };
  chartBtn.addEventListener('click', () => show('chart'));
  tableBtn.addEventListener('click', () => show('table'));
}

// Sources page: build a CSV of the headline series and download it.
function wireCsvDownload() {
  const btn = document.getElementById('download-csv');
  const note = document.getElementById('csv-note');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const lines = ['year,population_millions,gdp_usd_trillion,cpi_inflation_pct,unemployment_pct'];
    for (let i = 0; i < POPULATION_SERIES.length; i++) {
      lines.push([
        POPULATION_SERIES[i].year,
        POPULATION_SERIES[i].value.toFixed(1),
        GDP_SERIES[i].value.toFixed(2),
        CPI_SERIES[i].value.toFixed(1),
        UNEMPLOYMENT_SERIES[i].value.toFixed(1),
      ].join(','));
    }
    const blob = new Blob([lines.join('\n') + '\n'], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'japan-statistics.csv';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    if (note) note.textContent = 'Downloaded japan-statistics.csv — 10 rows, 2015–2024, generated on this device.';
  });
}

window.addEventListener('hashchange', route);
route();
