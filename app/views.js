// views.js — potongan tampilan yang dipakai ulang oleh semua halaman:
// kartu angka kunci, kartu chart, kartu tabel, dan tabel provinsi.
// Halaman-halaman sendiri didefinisikan di pages.js.
import { INDICATORS, PROVINCES, META, latest, fmtValue } from './data.js';
import { lineChart, barChart, seriesTable } from './charts.js';

export function srcLine(ind, year) {
  return `Sumber: ${ind.src} (${ind.code}), ${year}.`;
}

export function keyCard(key) {
  const { value, year, ind } = latest(key);
  return `<div class="key"><div class="v">${fmtValue(ind, value)}</div><div class="l">${ind.label}</div><div class="s">${ind.src}, ${year}</div></div>`;
}

export function chartCard(key, kind, color) {
  const ind = INDICATORS[key];
  const chart = kind === 'bar' ? barChart(ind, { color }) : lineChart(ind, { color });
  const { year } = latest(key);
  return `<div class="panel"><h3>${ind.label}, 2014–2024</h3>${chart}<p class="src">${srcLine(ind, year)} Nilai terakhir ${fmtValue(ind, ind.series[ind.series.length - 1])} (${year}).</p></div>`;
}

export function tableCard(key) {
  const ind = INDICATORS[key];
  const { year } = latest(key);
  return `<div class="panel"><h3>Tabel: ${ind.label}</h3>${seriesTable(ind)}<p class="src">${srcLine(ind, year)}</p></div>`;
}

export function provinceTable() {
  // Lebar bar dinormalisasi ke pangsa terbesar (Jawa Barat 17,9%) supaya bar
  // terpanjang memenuhi kolom.
  const rows = PROVINCES.map((p, i) => `<tr><td>${i + 1}</td><td>${p.name}</td><td class="num">${p.pop.toLocaleString('id-ID')}</td><td class="num">${p.share.toLocaleString('id-ID')}%</td><td class="col-bar"><div class="bar" style="width:${(p.share / 17.9 * 100).toFixed(0)}%"></div></td></tr>`).join('');
  return `<div class="panel"><h3>10 provinsi terpadat, 2024</h3>
  <table><thead><tr><th>#</th><th>Provinsi</th><th style="text-align:right">Penduduk</th><th style="text-align:right">Pangsa</th><th class="col-bar" style="width:28%"></th></tr></thead>
  <tbody>${rows}</tbody></table>
  <p class="src">Sumber: ${META.bpsNote}. Pangsa dihitung terhadap total BPS 281,6 juta jiwa.</p></div>`;
}

export function crumbs(current) {
  return `<p class="crumbs"><a href="#/">Beranda</a> / ${current}</p>`;
}
