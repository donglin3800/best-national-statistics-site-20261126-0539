// Japan Statistics Atlas — the six views.
// Each view renders one section of the site from data.js and charts.js.
// Views are plain functions of the data: no fetch, no network, no state
// outside the page. Controls (search, sort, chart/table switch, CSV
// download) are wired up by main.js after the HTML is in the page.

import {
  HEADLINE, POPULATION_SERIES, GDP_SERIES, CPI_SERIES, UNEMPLOYMENT_SERIES,
  FERTILITY_SERIES, AGE_STRUCTURE, PREFECTURES, ECONOMY_FACTS, VITAL_EVENTS, SOURCES,
} from './data.js';
import { lineChart, barChart, rankBars, donutChart } from './charts.js';

function kpiCard(item) {
  return `<article class="kpi"><p class="kpi-label">${item.label}</p>`
    + `<p class="kpi-value">${item.value}</p>`
    + `<p class="kpi-sub">${item.sub}</p>`
    + `<p class="kpi-detail">${item.detail}</p></article>`;
}

function sectionHead(title, intro, source) {
  return `<header class="section-head"><h2>${title}</h2><p>${intro}</p>`
    + (source ? `<p class="source-line">Source: ${source}</p>` : '') + '</header>';
}

function factRow(fact) {
  return `<div class="fact"><span class="fact-label">${fact.label}</span>`
    + `<span class="fact-value">${fact.value}</span>`
    + `<span class="fact-source">${fact.source}</span></div>`;
}

// ---- Overview: the front page. Big numbers first, then the two headline charts.
export function overviewView() {
  const cards = HEADLINE.slice(0, 6).map(kpiCard).join('');
  return `
  <section class="hero">
    <p class="eyebrow">日本 · National statistics, 2015–2024</p>
    <h1>Japan, in numbers.</h1>
    <p class="lede">Population, economy, prices, work and regions — the figures a visitor
    looking up Japan's statistics actually needs, each with its source and year.
    Every number on this site comes from a published official statistic.</p>
    <div class="hero-links">
      <a class="btn" href="#/population">Explore population ↓</a>
      <a class="btn ghost" href="#/sources">Where the numbers come from</a>
    </div>
  </section>
  <section class="kpi-grid" aria-label="Headline figures">${cards}</section>
  <div class="chart-pair">
    <section class="panel">
      <h2>Population is shrinking</h2>
      <p>Japan lost about 3.1 million people in ten years — from 127.1m in 2015 to 124.0m in 2024.</p>
      ${lineChart(POPULATION_SERIES, { colour: '#1b2a4a', unit: 'm', decimals: 1 })}
      <p class="source-line">Source: World Bank, indicator SP.POP.TOTL.</p>
    </section>
    <section class="panel">
      <h2>GDP in dollars fell back</h2>
      <p>Nominal GDP was $4.03 trillion in 2024 — the yen's fall, not output, explains most of the drop since 2021.</p>
      ${barChart(GDP_SERIES, { colour: '#1b2a4a', unit: ' $tn', decimals: 2 })}
      <p class="source-line">Source: IMF World Economic Outlook, October 2025.</p>
    </section>
  </div>
  <section class="panel">
    <h2>At a glance</h2>
    <div class="fact-list">
      <div class="fact"><span class="fact-label">Fertility rate</span><span class="fact-value">1.20</span><span class="fact-source">MHLW, 2024 — far below the 2.1 replacement level</span></div>
      <div class="fact"><span class="fact-label">People aged 65+</span><span class="fact-value">29.3%</span><span class="fact-source">Statistics Bureau, 2024 — the highest share in the world</span></div>
      <div class="fact"><span class="fact-label">Births minus deaths</span><span class="fact-value">−898,000</span><span class="fact-source">MHLW, 2024 — 720,988 births, 1,618,684 deaths</span></div>
      <div class="fact"><span class="fact-label">Government debt</span><span class="fact-value">251% of GDP</span><span class="fact-source">IMF, 2024 — the highest among advanced economies</span></div>
    </div>
    <p class="more-link"><a href="#/population">Population in detail →</a> &nbsp;·&nbsp; <a href="#/economy">Economy in detail →</a></p>
  </section>`;
}

// ---- Population.
export function populationView() {
  const top = [...PREFECTURES].sort((a, b) => b.pop - a.pop).slice(0, 6);
  const legend = AGE_STRUCTURE.map((s) => `<li><span class="swatch" style="background:${s.colour}"></span>${s.group} — <strong>${s.share}%</strong></li>`).join('');
  return `
  ${sectionHead('Population', 'Japan has the world’s oldest population and one of its fastest-shrinking ones. The decline is driven by few births, not by emigration: net migration has been positive for a decade.', 'Statistics Bureau of Japan; World Bank; MHLW.')}
  <section class="kpi-grid" aria-label="Population figures">
    ${kpiCard(HEADLINE[0])}${kpiCard(HEADLINE[6])}${kpiCard(HEADLINE[7])}
    <article class="kpi"><p class="kpi-label">Median age</p><p class="kpi-value">49.4 yrs</p><p class="kpi-sub">2024 · UN</p><p class="kpi-detail">The median Japanese person is almost fifty.</p></article>
  </section>
  <div class="chart-pair">
    <section class="panel">
      <h2>Total population, 2015–2024</h2>
      ${lineChart(POPULATION_SERIES, { colour: '#1b2a4a', unit: 'm', decimals: 1 })}
      <p class="source-line">Source: World Bank, SP.POP.TOTL. Values in millions.</p>
    </section>
    <section class="panel">
      <h2>Age structure, 2024</h2>
      <div class="donut-wrap">${donutChart(AGE_STRUCTURE, { centreTop: '29.3%', centreBottom: 'aged 65+' })}
      <ul class="legend">${legend}</ul></div>
      <p class="source-line">Source: Statistics Bureau of Japan, population estimates.</p>
    </section>
  </div>
  <section class="panel">
    <h2>Fertility keeps falling</h2>
    <p>The total fertility rate fell from 1.45 in 2015 to 1.20 in 2024. Births in 2024 — 720,988 — were the fewest on record.</p>
    ${lineChart(FERTILITY_SERIES, { colour: '#2f6f6a', unit: '', decimals: 2, ymin: 1.0, ymax: 1.6 })}
    <p class="source-line">Source: Ministry of Health, Labour and Welfare, vital statistics.</p>
  </section>
  <section class="panel">
    <h2>Largest prefectures</h2>
    <p>Search the list — one in nine Japanese people lives in Tokyo alone.</p>
    <label class="field-label" for="pref-search">Search prefectures</label>
    <input id="pref-search" class="search" type="search" placeholder="Type a prefecture, e.g. Osaka…" autocomplete="off">
    <div id="pref-bars">${rankBars(top.map((p) => ({ name: p.name, value: p.pop })), { unit: 'm' })}</div>
    <p class="source-line">Source: Statistics Bureau of Japan, 2024. Population in millions. <a href="#/regions">Full table of 12 prefectures →</a></p>
  </section>`;
}

// ---- Economy.
export function economyView() {
  const facts = ECONOMY_FACTS.map(factRow).join('');
  return `
  ${sectionHead('Economy', 'The world’s fourth-largest economy in dollars — and the largest creditor nation on earth. The dollar figures below move with the yen; the PPP figures strip that out.', 'IMF World Economic Outlook, October 2025; Ministry of Finance.')}
  <section class="kpi-grid" aria-label="Economy figures">
    ${kpiCard(HEADLINE[1])}${kpiCard(HEADLINE[2])}
    <article class="kpi"><p class="kpi-label">GDP, PPP basis</p><p class="kpi-value">$6.53tn</p><p class="kpi-sub">2024 · IMF</p><p class="kpi-detail">Adjusted for what money buys in Japan.</p></article>
    <article class="kpi"><p class="kpi-label">GDP per person, PPP</p><p class="kpi-value">$52,700</p><p class="kpi-sub">2024 · IMF</p><p class="kpi-detail">Living standards look much higher in PPP terms.</p></article>
  </section>
  <section class="panel">
    <h2>Nominal GDP, 2015–2024 (US$ trillion)</h2>
    ${barChart(GDP_SERIES, { colour: '#1b2a4a', unit: '', decimals: 2 })}
    <p class="source-line">Source: IMF World Economic Outlook, October 2025. The 2022–2024 fall is mostly the yen weakening against the dollar, from about ¥115 to about ¥151 per dollar.</p>
  </section>
  <section class="panel">
    <h2>Trade and public finance</h2>
    <div class="fact-list">${facts}</div>
    <p class="source-line">Exports and imports are goods trade, Ministry of Finance 2024. Japan has run a goods deficit since 2021, driven by energy import costs.</p>
  </section>`;
}

// ---- Prices and work.
export function pricesView() {
  const rows = CPI_SERIES.map((p) => `<tr><td>${p.year}</td><td>${p.value.toFixed(1)}%</td><td>${UNEMPLOYMENT_SERIES.find((u) => u.year === p.year).value.toFixed(1)}%</td></tr>`).join('');
  const vitals = VITAL_EVENTS.map((v) => `<div class="fact"><span class="fact-label">${v.label}</span><span class="fact-value">${v.value}</span><span class="fact-source">${v.note}</span></div>`).join('');
  return `
  ${sectionHead('Prices & work', 'After decades of flat prices, inflation returned in 2022 — and stayed. Unemployment, meanwhile, has sat near 2.5% for years: Japan’s labour market is the tightest of any large economy.', 'Statistics Bureau of Japan; MHLW.')}
  <section class="kpi-grid" aria-label="Prices and work figures">
    ${kpiCard(HEADLINE[4])}${kpiCard(HEADLINE[5])}
    <article class="kpi"><p class="kpi-label">Labour force</p><p class="kpi-value">69.3m</p><p class="kpi-sub">2024 · Statistics Bureau</p><p class="kpi-detail">Employed 67.6m; unemployed 1.7m.</p></article>
    <article class="kpi"><p class="kpi-label">Avg. monthly pay</p><p class="kpi-value">¥331,000</p><p class="kpi-sub">2024 · MHLW</p><p class="kpi-detail">Cash earnings, all industries.</p></article>
  </section>
  <section class="panel">
    <h2>Inflation and unemployment, 2015–2024</h2>
    <div class="toggle" role="group" aria-label="Choose chart or table">
      <button id="toggle-chart" class="toggle-btn active" type="button">Chart</button>
      <button id="toggle-table" class="toggle-btn" type="button">Table</button>
    </div>
    <div id="prices-chart">
      ${lineChart(CPI_SERIES, { colour: '#c8401f', unit: '%', decimals: 1, ymin: -1, ymax: 4 })}
      <p class="source-line">Consumer price inflation, % per year. Source: Statistics Bureau of Japan.</p>
      ${lineChart(UNEMPLOYMENT_SERIES, { colour: '#1b2a4a', unit: '%', decimals: 1, ymin: 2, ymax: 4 })}
      <p class="source-line">Unemployment rate, % annual average. Source: Statistics Bureau of Japan.</p>
    </div>
    <div id="prices-table" hidden>
      <table class="data-table"><thead><tr><th>Year</th><th>CPI inflation</th><th>Unemployment</th></tr></thead><tbody>${rows}</tbody></table>
      <p class="source-line">Source: Statistics Bureau of Japan.</p>
    </div>
  </section>
  <section class="panel">
    <h2>People in 2024</h2>
    <div class="fact-list">${vitals}</div>
    <p class="source-line">Source: Ministry of Health, Labour and Welfare, vital statistics and Monthly Labour Survey, 2024.</p>
  </section>`;
}

// ---- Regions: a sortable, searchable table.
export function regionsView() {
  return `
  ${sectionHead('Regions', 'Japan has 47 prefectures. Twelve of them hold most of the country: the Tokyo area alone is home to more than a quarter of all Japanese people. Click a column heading to sort.', 'Statistics Bureau of Japan, 2024.')}
  <section class="panel">
    <label class="field-label" for="region-search">Search prefectures or capitals</label>
    <input id="region-search" class="search" type="search" placeholder="Type to filter, e.g. Sapporo…" autocomplete="off">
    <div class="table-wrap"><table class="data-table" id="region-table">
      <thead><tr>
        <th><button type="button" data-sort="name">Prefecture ↕</button></th>
        <th><button type="button" data-sort="capital">Capital ↕</button></th>
        <th><button type="button" data-sort="pop">Population (m) ↕</button></th>
        <th><button type="button" data-sort="area">Area (km²) ↕</button></th>
        <th><button type="button" data-sort="density">Density (/km²) ↕</button></th>
      </tr></thead>
      <tbody id="region-body"></tbody>
    </table></div>
    <p class="source-line">Source: Statistics Bureau of Japan, population estimates 2024; area from the Geospatial Information Authority. Showing the 12 largest prefectures.</p>
  </section>
  <section class="panel">
    <h2>Two Japans</h2>
    <p>Tokyo packs 6,471 people into each square kilometre; Hokkaido, the largest prefecture, has 61. The population keeps drifting toward the three great metropolitan areas — Tokyo, Osaka and Nagoya — while rural prefectures shrink fastest.</p>
    <p><a href="#/population">Back to population →</a></p>
  </section>`;
}

// ---- Sources and methods.
export function sourcesView() {
  const rows = SOURCES.map((s) => `<tr><td><strong>${s.name}</strong></td><td>${s.what}</td><td>${s.url}</td></tr>`).join('');
  return `
  ${sectionHead('Data & sources', 'Every figure on this site comes from a published official statistic. Nothing here is estimated by us, and nothing is fetched from the network: the figures are baked into the site’s own files.', '')}
  <section class="panel">
    <h2>Sources</h2>
    <div class="table-wrap"><table class="data-table"><thead><tr><th>Publisher</th><th>What we used</th><th>Site</th></tr></thead><tbody>${rows}</tbody></table></div>
  </section>
  <section class="panel">
    <h2>Methods and notes</h2>
    <ul class="notes">
      <li>Population is the World Bank total (SP.POP.TOTL), mid-year estimates; prefecture populations are the Statistics Bureau’s 1 October estimates.</li>
      <li>GDP is nominal, in current US dollars, from the IMF World Economic Outlook (October 2025 vintage). The dollar value moves with the yen exchange rate.</li>
      <li>CPI inflation and unemployment are annual averages from the Statistics Bureau of Japan’s Labour Force Survey and Consumer Price Index.</li>
      <li>Fertility, births, deaths and marriages are from the Ministry of Health, Labour and Welfare’s vital statistics.</li>
      <li>Figures are rounded for display; charts plot the rounded values shown in the tables.</li>
      <li>Coverage is 2015–2024, the latest ten complete years available in November 2026.</li>
    </ul>
  </section>
  <section class="panel">
    <h2>Take the data with you</h2>
    <p>Download the site’s headline series as a CSV file — generated on your device from the same data the charts use. No network request is made.</p>
    <button id="download-csv" class="btn" type="button">Download japan-statistics.csv</button>
    <p class="source-line" id="csv-note"></p>
  </section>`;
}
