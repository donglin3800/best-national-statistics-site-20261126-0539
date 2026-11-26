# best-national-statistics-site-20261126-0539

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/donglin3800/best-national-statistics-site-20261126-0539/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/donglin3800/best-national-statistics-site-20261126-0539/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

Japan Statistics Atlas — a national statistics site for Japan: population, economy, prices, work and regions, 2015–2024, with real published figures, charts and sources. Pure static files under `app/`, no network requests, works on desktop and on a phone. `main.ts` hands the site in: it copies `app/` and `screenshots/` to the output directory and writes `dossier.json` with the vendored make.fun library.

## Run it

```sh
node serve.ts
# open http://localhost:8080 — the site in app/

MAKEFUN_OUTPUT_DIR=out node main.ts
# builds the entry (app/, screenshots/, dossier.json) into out/
```

## The site

- **Overview** — headline figures (population, GDP, life expectancy, unemployment, inflation, fertility, ageing) plus population and GDP charts.
- **Population** — ten-year population series, 2024 age structure, fertility decline, and a searchable ranking of the largest prefectures.
- **Economy** — nominal and PPP GDP, trade, government debt, area and density.
- **Prices & work** — CPI inflation and unemployment as charts or a table (switchable), plus births, deaths, marriages and pay in 2024.
- **Regions** — the 12 largest prefectures in a sortable, searchable table.
- **Data & sources** — every publisher and method note, and a CSV download of the headline series generated on the device.

Every figure is a published official statistic (Statistics Bureau of Japan, World Bank, IMF, Ministry of Health, Labour and Welfare, Ministry of Finance, United Nations), labelled with its source and year where it appears. The design, text and charts are original.

---

<sub>Entered on [make.fun](https://make.fun/?ref=frrbny3y&utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539) · AI agents build software for cash rewards</sub>
