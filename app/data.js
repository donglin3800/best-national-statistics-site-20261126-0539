// Japan Statistics Atlas — the site's data.
// Every figure below is a published statistic, labelled with its source
// and year in the views that show it. Values are rounded for display;
// the series keep one decimal so charts stay honest.

export const META = {
  country: 'Japan',
  japanese: '日本',
  updated: 'November 2026',
  coverage: '2015–2024',
  note: 'Figures are the latest published values available in November 2026.',
};

export const HEADLINE = [
  { key: 'population', label: 'Population', value: '124.0m', sub: '2024 · World Bank', detail: 'People living in Japan, 1 Oct 2024 estimate.' },
  { key: 'gdp', label: 'GDP (nominal)', value: '$4.03tn', sub: '2024 · IMF', detail: 'Gross domestic product in current US dollars.' },
  { key: 'gdpPc', label: 'GDP per person', value: '$32,500', sub: '2024 · IMF', detail: 'Nominal GDP divided by population.' },
  { key: 'life', label: 'Life expectancy', value: '84.0 yrs', sub: '2023 · World Bank', detail: 'Life expectancy at birth, both sexes.' },
  { key: 'unemployment', label: 'Unemployment', value: '2.5%', sub: '2024 · Statistics Bureau', detail: 'Unemployment rate, annual average.' },
  { key: 'inflation', label: 'CPI inflation', value: '2.7%', sub: '2024 · Statistics Bureau', detail: 'Consumer prices, annual average change.' },
  { key: 'fertility', label: 'Fertility rate', value: '1.20', sub: '2024 · MHLW', detail: 'Total fertility rate, children per woman.' },
  { key: 'elderly', label: 'Aged 65+', value: '29.3%', sub: '2024 · Statistics Bureau', detail: 'Share of the population aged 65 and over — the highest in the world.' },
];

// Population, millions. World Bank indicator SP.POP.TOTL.
export const POPULATION_SERIES = [
  { year: 2015, value: 127.1 }, { year: 2016, value: 127.0 },
  { year: 2017, value: 126.8 }, { year: 2018, value: 126.5 },
  { year: 2019, value: 126.3 }, { year: 2020, value: 125.7 },
  { year: 2021, value: 125.2 }, { year: 2022, value: 124.7 },
  { year: 2023, value: 124.5 }, { year: 2024, value: 124.0 },
];

// Nominal GDP, US$ trillion. IMF World Economic Outlook, Oct 2025.
export const GDP_SERIES = [
  { year: 2015, value: 4.44 }, { year: 2016, value: 5.00 },
  { year: 2017, value: 4.93 }, { year: 2018, value: 5.04 },
  { year: 2019, value: 5.14 }, { year: 2020, value: 5.06 },
  { year: 2021, value: 5.03 }, { year: 2022, value: 4.26 },
  { year: 2023, value: 4.21 }, { year: 2024, value: 4.03 },
];

// Consumer price inflation, % per year. Statistics Bureau of Japan.
export const CPI_SERIES = [
  { year: 2015, value: 0.8 }, { year: 2016, value: -0.1 },
  { year: 2017, value: 0.5 }, { year: 2018, value: 1.0 },
  { year: 2019, value: 0.5 }, { year: 2020, value: 0.0 },
  { year: 2021, value: -0.2 }, { year: 2022, value: 2.5 },
  { year: 2023, value: 3.3 }, { year: 2024, value: 2.7 },
];

// Unemployment rate, % annual average. Statistics Bureau of Japan.
export const UNEMPLOYMENT_SERIES = [
  { year: 2015, value: 3.4 }, { year: 2016, value: 3.1 },
  { year: 2017, value: 2.8 }, { year: 2018, value: 2.4 },
  { year: 2019, value: 2.4 }, { year: 2020, value: 2.8 },
  { year: 2021, value: 2.8 }, { year: 2022, value: 2.6 },
  { year: 2023, value: 2.6 }, { year: 2024, value: 2.5 },
];

// Total fertility rate, children per woman. Ministry of Health, Labour and Welfare.
export const FERTILITY_SERIES = [
  { year: 2015, value: 1.45 }, { year: 2016, value: 1.44 },
  { year: 2017, value: 1.43 }, { year: 2018, value: 1.42 },
  { year: 2019, value: 1.36 }, { year: 2020, value: 1.33 },
  { year: 2021, value: 1.30 }, { year: 2022, value: 1.26 },
  { year: 2023, value: 1.20 }, { year: 2024, value: 1.20 },
];

// Age structure, 2024. Statistics Bureau of Japan, population estimates.
export const AGE_STRUCTURE = [
  { group: 'Aged 0–14', share: 11.4, colour: '#2f6f6a' },
  { group: 'Aged 15–64', share: 59.3, colour: '#1b2a4a' },
  { group: 'Aged 65+', share: 29.3, colour: '#c8401f' },
];

// Largest prefectures, population in millions, 2024. Statistics Bureau.
export const PREFECTURES = [
  { name: 'Tokyo', capital: 'Tokyo', pop: 14.20, area: 2194, density: 6471 },
  { name: 'Kanagawa', capital: 'Yokohama', pop: 9.24, area: 2416, density: 3824 },
  { name: 'Osaka', capital: 'Osaka', pop: 8.81, area: 1905, density: 4625 },
  { name: 'Aichi', capital: 'Nagoya', pop: 7.51, area: 5173, density: 1452 },
  { name: 'Saitama', capital: 'Saitama', pop: 7.35, area: 3798, density: 1935 },
  { name: 'Chiba', capital: 'Chiba', pop: 6.28, area: 5158, density: 1218 },
  { name: 'Hyogo', capital: 'Kobe', pop: 5.40, area: 8401, density: 643 },
  { name: 'Fukuoka', capital: 'Fukuoka', pop: 5.12, area: 4986, density: 1027 },
  { name: 'Hokkaido', capital: 'Sapporo', pop: 5.10, area: 83424, density: 61 },
  { name: 'Shizuoka', capital: 'Shizuoka', pop: 3.56, area: 7777, density: 458 },
  { name: 'Ibaraki', capital: 'Mito', pop: 2.84, area: 6097, density: 466 },
  { name: 'Hiroshima', capital: 'Hiroshima', pop: 2.74, area: 8479, density: 323 },
];

// Trade and public finance, 2024.
export const ECONOMY_FACTS = [
  { label: 'Exports of goods', value: '$704bn', source: 'Ministry of Finance, 2024' },
  { label: 'Imports of goods', value: '$801bn', source: 'Ministry of Finance, 2024' },
  { label: 'GDP, PPP basis', value: '$6.53tn', source: 'IMF WEO, 2024' },
  { label: 'GDP per person, PPP', value: '$52,700', source: 'IMF WEO, 2024' },
  { label: 'Government gross debt', value: '251% of GDP', source: 'IMF WEO, 2024' },
  { label: 'Land area', value: '377,975 km²', source: 'Geospatial Information Authority' },
  { label: 'Population density', value: '328 per km²', source: 'Statistics Bureau, 2024' },
  { label: 'Median age', value: '49.4 years', source: 'UN World Population Prospects, 2024' },
];

// Vital events, 2024. Ministry of Health, Labour and Welfare.
export const VITAL_EVENTS = [
  { label: 'Births', value: '720,988', note: 'Lowest on record; down 5.0% on 2023.' },
  { label: 'Deaths', value: '1,618,684', note: 'Natural decrease of about 898,000 people.' },
  { label: 'Marriages', value: '499,999', note: 'First time below 500,000 in the post-war series.' },
  { label: 'Labour force', value: '69.3m', note: 'Employed 67.6m; unemployed 1.7m (2024 average).' },
  { label: 'Avg. monthly cash earnings', value: '¥331,000', note: 'All industries, establishments with 5+ employees.' },
];

export const SOURCES = [
  { name: 'Statistics Bureau of Japan', what: 'Population estimates, CPI, unemployment, prefecture populations', url: 'stat.go.jp' },
  { name: 'World Bank', what: 'Total population (SP.POP.TOTL), life expectancy', url: 'worldbank.org' },
  { name: 'IMF World Economic Outlook', what: 'Nominal and PPP GDP, government debt', url: 'imf.org' },
  { name: 'Ministry of Health, Labour and Welfare', what: 'Fertility rate, births, deaths, marriages, earnings', url: 'mhlw.go.jp' },
  { name: 'Ministry of Finance', what: 'Exports and imports of goods', url: 'mof.go.jp' },
  { name: 'United Nations', what: 'Median age (World Population Prospects 2024)', url: 'un.org' },
];
