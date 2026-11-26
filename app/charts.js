// Japan Statistics Atlas — chart builders.
// Every chart is plain inline SVG drawn from the site's own data: no
// library, no canvas, no network. Each builder takes a series and returns
// an SVG string with labelled axes, so the figure is readable in the page
// and in a screenshot. (Inline SVG in HTML needs no xmlns attribute, so
// none is written: the source names no absolute URL at all.)

function svgOpen(width, height, label) {
  return `<svg viewBox="0 0 ${width} ${height}" width="100%" role="img" aria-label="${label}">`;
}

function niceTicks(min, max, count) {
  const span = max - min || 1;
  const step = span / count;
  const mag = 10 ** Math.floor(Math.log10(step));
  const norm = step / mag;
  const nice = norm < 1.5 ? 1 : norm < 3.5 ? 2 : norm < 7.5 ? 5 : 10;
  const tick = nice * mag;
  const start = Math.ceil(min / tick) * tick;
  const out = [];
  for (let v = start; v <= max + tick * 0.001; v += tick) out.push(v);
  return out;
}

function fmt(v) {
  if (Number.isInteger(v)) return String(v);
  return v.toFixed(v < 10 && Math.abs(v - Math.round(v)) > 0.001 ? 2 : 1);
}

// A line chart with points, value labels on the first and last point,
// and a light grid. `series` is [{year, value}]; `unit` is the axis unit.
export function lineChart(series, { width = 640, height = 300, colour = '#1b2a4a', accent = '#c8401f', unit = '', ymin = null, ymax = null, decimals = 1 } = {}) {
  const padL = 52, padR = 16, padT = 18, padB = 34;
  const innerW = width - padL - padR;
  const innerH = height - padT - padB;
  const values = series.map((p) => p.value);
  let lo = ymin ?? Math.min(...values);
  let hi = ymax ?? Math.max(...values);
  if (hi - lo < 0.001) { hi = lo + 1; }
  const pad = (hi - lo) * 0.08;
  lo -= pad; hi += pad;
  const x = (i) => padL + (i / (series.length - 1)) * innerW;
  const y = (v) => padT + (1 - (v - lo) / (hi - lo)) * innerH;
  const ticks = niceTicks(lo, hi, 4);
  let s = svgOpen(width, height, `Line chart, ${series[0].year} to ${series[series.length - 1].year}`);
  for (const t of ticks) {
    s += `<line x1="${padL}" y1="${y(t)}" x2="${width - padR}" y2="${y(t)}" stroke="#e3ddd2" stroke-width="1"/>`;
    s += `<text x="${padL - 8}" y="${y(t) + 4}" text-anchor="end" font-size="11" fill="#6b7280">${fmt(t)}${unit}</text>`;
  }
  const step = Math.ceil(series.length / 6);
  series.forEach((p, i) => {
    if (i % step !== 0 && i !== series.length - 1) return;
    s += `<text x="${x(i)}" y="${height - 10}" text-anchor="middle" font-size="11" fill="#6b7280">${p.year}</text>`;
  });
  const points = series.map((p, i) => `${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join(' ');
  s += `<polyline points="${points}" fill="none" stroke="${colour}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`;
  series.forEach((p, i) => {
    const last = i === series.length - 1;
    s += `<circle cx="${x(i)}" cy="${y(p.value)}" r="${last ? 5 : 3}" fill="${last ? accent : '#ffffff'}" stroke="${colour}" stroke-width="2"/>`;
  });
  const first = series[0];
  const lastP = series[series.length - 1];
  s += `<text x="${x(0)}" y="${y(first.value) - 10}" text-anchor="middle" font-size="12" font-weight="700" fill="${colour}">${first.value.toFixed(decimals)}${unit}</text>`;
  s += `<text x="${x(series.length - 1)}" y="${y(lastP.value) - 12}" text-anchor="middle" font-size="12" font-weight="700" fill="${accent}">${lastP.value.toFixed(decimals)}${unit}</text>`;
  s += '</svg>';
  return s;
}

// A vertical bar chart. `series` is [{year, value}].
export function barChart(series, { width = 640, height = 300, colour = '#1b2a4a', accent = '#c8401f', unit = '', decimals = 1 } = {}) {
  const padL = 52, padR = 16, padT = 24, padB = 34;
  const innerW = width - padL - padR;
  const innerH = height - padT - padB;
  const values = series.map((p) => p.value);
  const hi = Math.max(...values) * 1.12;
  const lo = Math.min(0, ...values) * 1.1;
  const y = (v) => padT + (1 - (v - lo) / (hi - lo)) * innerH;
  const slot = innerW / series.length;
  const barW = Math.min(44, slot * 0.62);
  let s = svgOpen(width, height, `Bar chart, ${series[0].year} to ${series[series.length - 1].year}`);
  for (const t of niceTicks(lo, hi, 4)) {
    s += `<line x1="${padL}" y1="${y(t)}" x2="${width - padR}" y2="${y(t)}" stroke="#e3ddd2" stroke-width="1"/>`;
    s += `<text x="${padL - 8}" y="${y(t) + 4}" text-anchor="end" font-size="11" fill="#6b7280">${fmt(t)}${unit}</text>`;
  }
  series.forEach((p, i) => {
    const cx = padL + slot * i + slot / 2;
    const last = i === series.length - 1;
    s += `<rect x="${(cx - barW / 2).toFixed(1)}" y="${y(p.value).toFixed(1)}" width="${barW.toFixed(1)}" height="${(y(lo) - y(p.value)).toFixed(1)}" rx="3" fill="${last ? accent : colour}"/>`;
    s += `<text x="${cx}" y="${height - 10}" text-anchor="middle" font-size="11" fill="#6b7280">${p.year}</text>`;
    if (last) s += `<text x="${cx}" y="${y(p.value) - 8}" text-anchor="middle" font-size="12" font-weight="700" fill="${accent}">${p.value.toFixed(decimals)}${unit}</text>`;
  });
  s += '</svg>';
  return s;
}

// A horizontal bar list for ranked items: [{name, value, note}].
export function rankBars(items, { width = 640, barH = 30, gap = 12, colour = '#1b2a4a', accent = '#c8401f', unit = '', decimals = 2 } = {}) {
  const padL = 92, padR = 72, padT = 8;
  const height = padT + items.length * (barH + gap) + 8;
  const max = Math.max(...items.map((d) => d.value));
  const innerW = width - padL - padR;
  let s = svgOpen(width, height, 'Ranked bar chart');
  items.forEach((d, i) => {
    const yTop = padT + i * (barH + gap);
    const w = (d.value / max) * innerW;
    s += `<text x="${padL - 10}" y="${yTop + barH / 2 + 4}" text-anchor="end" font-size="13" fill="#1e2430">${d.name}</text>`;
    s += `<rect x="${padL}" y="${yTop}" width="${w.toFixed(1)}" height="${barH}" rx="4" fill="${i === 0 ? accent : colour}"/>`;
    s += `<text x="${padL + w + 8}" y="${yTop + barH / 2 + 4}" font-size="13" font-weight="700" fill="#1e2430">${d.value.toFixed(decimals)}${unit}</text>`;
  });
  s += '</svg>';
  return s;
}

// A donut chart with a centre label. `slices` is [{group, share, colour}].
export function donutChart(slices, { width = 300, height = 300, centreTop = '', centreBottom = '' } = {}) {
  const cx = width / 2, cy = height / 2, r = 104, inner = 66;
  const total = slices.reduce((a, b) => a + b.share, 0);
  let angle = -90;
  let s = svgOpen(width, height, 'Donut chart of age structure');
  for (const slice of slices) {
    const frac = slice.share / total;
    const a0 = (angle * Math.PI) / 180;
    const a1 = ((angle + frac * 360) * Math.PI) / 180;
    const large = frac > 0.5 ? 1 : 0;
    const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    const xi1 = cx + inner * Math.cos(a1), yi1 = cy + inner * Math.sin(a1);
    const xi0 = cx + inner * Math.cos(a0), yi0 = cy + inner * Math.sin(a0);
    s += `<path d="M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} L ${xi1.toFixed(1)} ${yi1.toFixed(1)} A ${inner} ${inner} 0 ${large} 0 ${xi0.toFixed(1)} ${yi0.toFixed(1)} Z" fill="${slice.colour}"/>`;
    angle += frac * 360;
  }
  s += `<text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="26" font-weight="800" fill="#1b2a4a">${centreTop}</text>`;
  s += `<text x="${cx}" y="${cy + 18}" text-anchor="middle" font-size="12" fill="#6b7280">${centreBottom}</text>`;
  s += '</svg>';
  return s;
}
