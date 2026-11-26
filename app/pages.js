// pages.js — definisi 8 halaman situs. Tiap halaman: judul, lede, kartu angka kunci,
// chart, tabel, dan catatan sumber. Halaman Jelajahi Data memakai state explorer
// yang dipegang main.js (indikator, rentang tahun, jenis tampilan, pembanding).
import { INDICATORS, YEARS, PROVINCES, META, latest, fmtValue } from './data.js';
import { lineChart, barChart, seriesTable } from './charts.js';
import { srcLine, keyCard, chartCard, tableCard, provinceTable, crumbs } from './views.js';

export function homePage() {
  return `<p class="kicker">Statistik Nasional · Edisi 2024</p>
  <h1>Statistik Indonesia 2024</h1>
  <p class="lede">Angka resmi terbaru tentang penduduk, ekonomi, kesehatan, pendidikan, dan daerah —
  dari World Bank dan BPS, dengan sumber dan tahun pada setiap angka.</p>
  <div class="keygrid">${keyCard('pop')}${keyCard('gdp')}${keyCard('gdpCap')}${keyCard('life')}${keyCard('unemp')}${keyCard('poverty')}</div>
  ${chartCard('gdp', 'line')}
  <h2>Jelajahi berdasarkan topik</h2>
  <div class="topic-list">
    <a class="topic" href="#/penduduk"><h3>Penduduk →</h3><p>283,5 juta jiwa (2024); 58,8% tinggal di kota.</p></a>
    <a class="topic" href="#/ekonomi"><h3>Ekonomi →</h3><p>PDB US$ 1.396,3 miliar; tumbuh 5,03% pada 2024.</p></a>
    <a class="topic" href="#/kesehatan"><h3>Kesehatan →</h3><p>Harapan hidup 71,3 tahun; mortalitas balita 17,7 per 1.000.</p></a>
    <a class="topic" href="#/pendidikan"><h3>Pendidikan →</h3><p>Partisipasi SD 100,0%; melek huruf 96% (2020).</p></a>
    <a class="topic" href="#/daerah"><h3>Daerah →</h3><p>10 provinsi terpadat; Jawa menampung 55,93% penduduk.</p></a>
    <a class="topic" href="#/jelajahi"><h3>Jelajahi Data →</h3><p>25 indikator, 2014–2024: pilih, bandingkan, unduh CSV.</p></a>
  </div>`;
}

export function pendudukPage() {
  return `${crumbs('Penduduk')}
  <h1>Penduduk</h1>
  <p class="lede">Penduduk tumbuh dari 258,9 juta (2014) menjadi 283,5 juta jiwa (2024), dengan laju
  yang melambat dari 1,18% menjadi 0,81% per tahun. Penduduk makin kota dan makin tua.</p>
  <div class="keygrid">${keyCard('pop')}${keyCard('popGrowth')}${keyCard('urban')}${keyCard('age65')}</div>
  ${chartCard('pop', 'line')}
  ${chartCard('urban', 'line', '#b97f14')}
  ${tableCard('pop')}`;
}

export function ekonomiPage() {
  return `${crumbs('Ekonomi')}
  <h1>Ekonomi</h1>
  <p class="lede">PDB nominal naik dari US$ 890,8 miliar (2014) ke US$ 1.396,3 miliar (2024). Pertumbuhan
  sempat −2,07% pada 2020, lalu kembali di atas 5%. Jasa 43,8% PDB, industri 39,3%, pertanian 12,6% (2024).</p>
  <div class="keygrid">${keyCard('gdp')}${keyCard('gdpGrowth')}${keyCard('gdpCap')}${keyCard('infl')}</div>
  ${chartCard('gdp', 'line')}
  ${chartCard('gdpGrowth', 'bar', '#b3402a')}
  ${chartCard('infl', 'line', '#b97f14')}
  ${tableCard('gdp')}`;
}

export function kesehatanPage() {
  return `${crumbs('Kesehatan')}
  <h1>Kesehatan</h1>
  <p class="lede">Harapan hidup 71,3 tahun pada 2024 — pulih setelah sempat turun ke 67,5 tahun pada 2021.
  Mortalitas balita turun dari 27,3 menjadi 17,7 per 1.000 kelahiran hidup dalam satu dekade.</p>
  <div class="keygrid">${keyCard('life')}${keyCard('mort5')}${keyCard('healthExp')}${keyCard('unemp')}</div>
  ${chartCard('life', 'line')}
  ${chartCard('mort5', 'line', '#7a4a9e')}
  <div class="note">Belanja kesehatan 2,70% dari PDB adalah angka 2023 — data 2024 belum tersedia di World Bank saat situs ini disusun.</div>
  ${tableCard('mort5')}`;
}

export function pendidikanPage() {
  return `${crumbs('Pendidikan')}
  <h1>Pendidikan</h1>
  <p class="lede">Partisipasi sekolah dasar neto 100,0% dan menengah 98,8% pada 2024. Melek huruf dewasa
  96% — angka terakhir yang tersedia, tahun 2020. Pengguna internet melonjak dari 17,1% (2014) ke 72,8% (2024).</p>
  <div class="keygrid">${keyCard('primEnr')}${keyCard('secEnr')}${keyCard('literacy')}${keyCard('internet')}</div>
  ${chartCard('secEnr', 'line')}
  ${chartCard('internet', 'line', '#b97f14')}
  ${tableCard('secEnr')}`;
}

export function daerahPage() {
  return `${crumbs('Daerah')}
  <h1>Daerah</h1>
  <p class="lede">Sepuluh provinsi terpadat 2024. Jawa Barat sendiri berpenduduk 50,3 juta jiwa.
  Pulau Jawa menampung 55,93% penduduk nasional (Dukcapil, Semester I 2024).</p>
  ${provinceTable()}
  <div class="note">Kepadatan tertinggi: DKI Jakarta ~16.155 jiwa/km² (BPS 2024). Total nasional menurut BPS: 281,6 juta jiwa — berbeda dari World Bank (283,5 juta); penjelasannya di <a href="#/metode">Metode &amp; Sumber</a>.</div>`;
}

export function metodePage() {
  return `${crumbs('Metode & Sumber')}
  <h1>Metode &amp; Sumber</h1>
  <p class="lede">Semua angka nasional berasal dari World Bank, World Development Indicators (diakses 26 Nov 2026);
  angka provinsi dari BPS 2024. Seri waktu mencakup 2014–2024.</p>
  <div class="note"><strong>Mengapa total penduduk berbeda?</strong> BPS mencatat 281,6 juta jiwa (2024),
  sedangkan World Bank 283,5 juta jiwa. Keduanya benar menurut metodologinya masing-masing: BPS memakai
  hasil sensus dan proyeksi penduduk, World Bank memakai estimasi Perserikatan Bangsa-Bangsa
  (UN World Population Prospects). Situs ini memakai angka World Bank untuk seri waktu nasional — agar
  konsisten antar tahun — dan angka BPS untuk provinsi.</div>
  <h2>Yang tidak ditampilkan</h2>
  <p>Utang pemerintah (% PDB) dan emisi CO₂ per kapita tidak ditampilkan: World Bank tidak menyediakan seri
  keduanya untuk Indonesia pada rentang ini, jadi tidak ditampilkan daripada ditebak.</p>
  <h2>Catatan data</h2>
  <p>Melek huruf dewasa: data terakhir 2020 (96%). Belanja kesehatan: data terakhir 2023 (2,70% PDB).
  Partisipasi sekolah dasar neto di atas 100% pada tahun-tahun awal mencerminkan pencatatan World Bank;
  nilai 2024 adalah 100,0%.</p>`;
}

function indicatorOptions(selected) {
  return Object.entries(INDICATORS).map(([k, ind]) =>
    `<option value="${k}" ${k === selected ? 'selected' : ''}>${ind.label}</option>`).join('');
}

export function explorerPage(state) {
  const ind = INDICATORS[state.ind];
  const ind2 = state.ind2 ? INDICATORS[state.ind2] : null;
  const rows = YEARS.map((yr, i) => ({ yr, v: ind.series[i], v2: ind2 ? ind2.series[i] : null }))
    .filter((r) => r.yr >= state.from && r.yr <= state.to);
  const chart = state.view === 'bar' ? barChart(ind)
    : state.view === 'table' ? seriesTable(ind, state.from, state.to)
    : lineChart(ind);
  const last = rows.filter((r) => r.v !== null).pop();
  const first = rows.filter((r) => r.v !== null)[0];
  const chg = last && first && first.v ? (((last.v - first.v) / Math.abs(first.v)) * 100) : null;
  return `${crumbs('Jelajahi Data')}
  <h1>Jelajahi Data</h1>
  <p class="lede">Pilih indikator, atur rentang tahun, ubah tampilan — grafik dan tabel mengikuti.
  Semua 25 indikator dari World Bank, 2014–2024.</p>
  <div class="panel">
    <div class="controls">
      <div><label for="sel-ind">Indikator utama</label>
        <select id="sel-ind">${indicatorOptions(state.ind)}</select></div>
      <div><label for="sel-ind2">Bandingkan dengan (opsional)</label>
        <select id="sel-ind2"><option value="">— tanpa pembanding —</option>${indicatorOptions(state.ind2)}</select></div>
      <div><label for="rng-from">Dari tahun: <span id="lbl-from">${state.from}</span></label>
        <input type="range" id="rng-from" min="2014" max="2024" step="1" value="${state.from}"></div>
      <div><label for="rng-to">Sampai tahun: <span id="lbl-to">${state.to}</span></label>
        <input type="range" id="rng-to" min="2014" max="2024" step="1" value="${state.to}"></div>
    </div>
    <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap">
      <div class="seg" role="group" aria-label="Jenis tampilan">
        <button data-view="line" aria-pressed="${state.view === 'line'}">Garis</button>
        <button data-view="bar" aria-pressed="${state.view === 'bar'}">Batang</button>
        <button data-view="table" aria-pressed="${state.view === 'table'}">Tabel</button>
      </div>
      <button class="btn" id="btn-csv">Unduh CSV</button>
    </div>
    <h3 style="margin-top:18px">${ind.label}, ${state.from}–${state.to}</h3>
    <div class="readout" aria-live="polite">
      <span>Nilai ${last ? last.yr : '—'}: <b>${last ? fmtValue(ind, last.v) : '—'}</b></span>
      <span>Perubahan ${state.from}→${state.to}: <b>${chg === null ? '—' : (chg >= 0 ? '+' : '') + chg.toLocaleString('id-ID', { maximumFractionDigits: 1 }) + '%'}</b></span>
      ${ind2 && last && last.v2 !== null ? `<span class="second">${ind2.label} ${last.yr}: <b>${fmtValue(ind2, last.v2)}</b></span>` : ''}
    </div>
    ${chart}
    ${ind2 ? `<p class="src">Pembanding: ${ind2.label} — ${srcLine(ind2, state.to)}</p>` : ''}
    <p class="src">${srcLine(ind, latest(state.ind).year)}${ind.lastYear ? ` Data terakhir ${ind.lastYear}.` : ''}${ind.sparse ? ' Data tidak tersedia tiap tahun.' : ''}</p>
    ${state.view !== 'table' ? `<details><summary>Lihat tabel angka</summary>${seriesTable(ind, state.from, state.to)}</details>` : ''}
  </div>`;
}

export function downloadCSV(state) {
  const ind = INDICATORS[state.ind];
  const lines = ['tahun,' + ind.label.replace(/,/g, '') + ' (' + ind.unit + ')'];
  YEARS.forEach((yr, i) => {
    if (yr >= state.from && yr <= state.to && ind.series[i] !== null) lines.push(`${yr},${ind.series[i]}`);
  });
  const blob = new Blob([lines.join('\n')], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `nusantara-data-${state.ind}-${state.from}-${state.to}.csv`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
