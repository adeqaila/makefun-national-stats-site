// Chart SVG buatan tangan (tanpa library): garis + batang + tabel seri waktu.
// Semua angka datang dari data.js; modul ini hanya menggambar.
import { YEARS, fmtValue } from './data.js';

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function lineChart(ind, opts = {}) {
  const w = opts.w ?? 640, h = opts.h ?? 260, color = opts.color ?? '#0b5e4b';
  const vals = YEARS.map((_, i) => ind.series[i]).filter((v) => v !== null);
  const years = YEARS.filter((_, i) => ind.series[i] !== null);
  const min = Math.min(...vals), max = Math.max(...vals);
  const padL = 88, padR = 14, padT = 14, padB = 28;
  const span = (max - min) || 1;
  const x = (i) => padL + (i * (w - padL - padR)) / (years.length - 1);
  const y = (v) => padT + ((max - v) / span) * (h - padT - padB);
  const pts = years.map((yr) => `${x(years.indexOf(yr)).toFixed(1)},${y(ind.series[YEARS.indexOf(yr)]).toFixed(1)}`).join(' ');
  const area = `${padL},${h - padB} ${pts} ${x(years.length - 1).toFixed(1)},${h - padB}`;
  const grid = [0, 0.5, 1].map((f) => {
    const gv = min + span * f, gy = y(gv);
    return `<line x1="${padL}" y1="${gy.toFixed(1)}" x2="${w - padR}" y2="${gy.toFixed(1)}" stroke="#e3e8e6" stroke-width="1"/><text x="${padL - 6}" y="${(gy + 4).toFixed(1)}" text-anchor="end" font-size="11" fill="#5c6b66">${esc(fmtValue(ind, gv))}</text>`;
  }).join('');
  const labels = years.filter((_, i) => i % 2 === 0).map((yr) => {
    const i = years.indexOf(yr);
    return `<text x="${x(i).toFixed(1)}" y="${h - 8}" text-anchor="middle" font-size="11" fill="#5c6b66">${yr}</text>`;
  }).join('');
  const dots = years.map((yr) => {
    const i = years.indexOf(yr);
    return `<circle cx="${x(i).toFixed(1)}" cy="${y(ind.series[YEARS.indexOf(yr)]).toFixed(1)}" r="3.2" fill="${color}"><title>${yr}: ${esc(fmtValue(ind, ind.series[YEARS.indexOf(yr)]))}</title></circle>`;
  }).join('');
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="Grafik ${esc(ind.label)} 2014–2024">${grid}<polygon points="${area}" fill="${color}" opacity="0.10"/><polyline points="${pts}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>${dots}${labels}</svg>`;
}

export function barChart(ind, opts = {}) {
  const w = opts.w ?? 640, h = opts.h ?? 260, color = opts.color ?? '#0b5e4b';
  const vals = ind.series.map((v) => v ?? 0);
  const padL = 88, padR = 14, padT = 14, padB = 28;
  const bw = (w - padL - padR) / YEARS.length;
  const top = padT, bot = h - padB;
  const y = (v) => {
    const lo = Math.min(0, ...vals), hi = Math.max(0, ...vals);
    return top + ((hi - v) / (hi - lo || 1)) * (bot - top);
  };
  const y0 = y(0);
  const bars = YEARS.map((yr, i) => {
    const v = vals[i];
    const bx = padL + i * bw + 5;
    const by = v >= 0 ? y(v) : y0;
    const bh = Math.max(1, Math.abs(y(v) - y0));
    return `<rect x="${bx.toFixed(1)}" y="${by.toFixed(1)}" width="${(bw - 10).toFixed(1)}" height="${bh.toFixed(1)}" rx="2" fill="${v < 0 ? '#b3402a' : color}"><title>${yr}: ${esc(fmtValue(ind, ind.series[i]))}</title></rect><text x="${(bx + (bw - 10) / 2).toFixed(1)}" y="${h - 8}" text-anchor="middle" font-size="10.5" fill="#5c6b66">${yr}</text>`;
  }).join('');
  const hi = Math.max(0, ...vals), lo = Math.min(0, ...vals);
  const grid = [lo, (lo + hi) / 2, hi].map((gv) => `<line x1="${padL}" y1="${y(gv).toFixed(1)}" x2="${w - padR}" y2="${y(gv).toFixed(1)}" stroke="#e3e8e6" stroke-width="1"/><text x="${padL - 6}" y="${(y(gv) + 4).toFixed(1)}" text-anchor="end" font-size="11" fill="#5c6b66">${esc(fmtValue(ind, gv))}</text>`).join('');
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="Diagram batang ${esc(ind.label)} 2014–2024">${grid}<line x1="${padL}" y1="${y0.toFixed(1)}" x2="${w - padR}" y2="${y0.toFixed(1)}" stroke="#9aa7a2" stroke-width="1"/>${bars}</svg>`;
}

export function seriesTable(ind, fromYear = 2014, toYear = 2024) {
  const rows = YEARS.map((yr, i) => ({ yr, v: ind.series[i] }))
    .filter((r) => r.yr >= fromYear && r.yr <= toYear && r.v !== null);
  const cells = rows.map((r) => `<tr><td>${r.yr}</td><td class="num">${esc(fmtValue(ind, r.v))}</td></tr>`).join('');
  return `<table class="series"><thead><tr><th>Tahun</th><th>${esc(ind.label)} (${esc(ind.unit)})</th></tr></thead><tbody>${cells}</tbody></table>`;
}

export function sparkline(ind, color = '#0b5e4b') {
  const vals = ind.series.filter((v) => v !== null);
  const min = Math.min(...vals), max = Math.max(...vals);
  const w = 120, h = 34, span = (max - min) || 1;
  const pts = ind.series.map((v, i) => {
    if (v === null) return null;
    return `${(i * w / (ind.series.length - 1)).toFixed(1)},${(h - 3 - ((v - min) / span) * (h - 6)).toFixed(1)}`;
  }).filter(Boolean).join(' ');
  return `<svg viewBox="0 0 ${w} ${h}" width="120" height="34" aria-hidden="true"><polyline points="${pts}" fill="none" stroke="${color}" stroke-width="2"/></svg>`;
}
