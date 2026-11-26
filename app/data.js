// Data Statistik Indonesia — semua angka dari World Bank (diambil 26 Nov 2026,
// tersimpan mentah di wb-indonesia.json) dan BPS 2024 (provinsi). Setiap angka
// yang tampil di situs wajib disertai sumber + tahun. Jangan tambah angka lain.
// Nilai seri dibulatkan ke 2–3 desimal untuk tampil; nilai mentah lengkap ada di
// wb-indonesia.json (mis. PDB 2024 mentah 1.396.301.788.461,69 US$).
export const YEARS = [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];

// indicators: code World Bank, label Indonesia, unit, seri 2014-2024 (null = tidak ada data tahun itu).
export const INDICATORS = {
  pop: { code: 'SP.POP.TOTL', label: 'Penduduk', unit: 'jiwa', fmt: 'int',
    src: 'World Bank', series: [258877399, 261799249, 264627418, 267346658, 269951846, 272489381, 274814866, 276758053, 278830529, 281190067, 283487931] },
  popGrowth: { code: 'SP.POP.GROW', label: 'Pertumbuhan penduduk', unit: '% per tahun', fmt: 'pct2',
    src: 'World Bank', series: [1.175, 1.122, 1.074, 1.022, 0.970, 0.936, 0.850, 0.705, 0.746, 0.843, 0.814] },
  gdp: { code: 'NY.GDP.MKTP.CD', label: 'PDB (nominal)', unit: 'US$', fmt: 'usdB',
    src: 'World Bank', series: [890.815, 860.854, 931.877, 1015.619, 1042.272, 1119.100, 1059.055, 1186.510, 1319.101, 1371.167, 1396.302] },
  gdpGrowth: { code: 'NY.GDP.MKTP.KD.ZG', label: 'Pertumbuhan PDB', unit: '% per tahun', fmt: 'pct2',
    src: 'World Bank', series: [5.007, 4.876, 5.033, 5.070, 5.174, 5.019, -2.066, 3.703, 5.307, 5.049, 5.033] },
  gdpCap: { code: 'NY.GDP.PCAP.CD', label: 'PDB per kapita', unit: 'US$', fmt: 'usd0',
    src: 'World Bank', series: [3441, 3288, 3521, 3799, 3861, 4107, 3854, 4287, 4731, 4876, 4925] },
  life: { code: 'SP.DYN.LE00.IN', label: 'Harapan hidup saat lahir', unit: 'tahun', fmt: 'num1',
    src: 'World Bank', series: [69.29, 69.52, 69.73, 69.95, 70.08, 70.35, 68.82, 67.45, 70.93, 71.15, 71.29] },
  unemp: { code: 'SL.UEM.TOTL.ZS', label: 'Pengangguran', unit: '% angkatan kerja', fmt: 'pct2',
    src: 'World Bank', series: [4.05, 4.51, 4.30, 3.78, 4.39, 3.59, 4.26, 3.83, 3.46, 3.31, 3.30] },
  infl: { code: 'FP.CPI.TOTL.ZG', label: 'Inflasi (IHK)', unit: '% per tahun', fmt: 'pct2',
    src: 'World Bank', series: [6.39, 6.36, 3.53, 3.81, 3.20, 3.03, 1.92, 1.56, 4.21, 3.67, 2.18] },
  poverty: { code: 'SI.POV.NAHC', label: 'Kemiskinan (garis nasional)', unit: '% penduduk', fmt: 'pct1',
    src: 'World Bank', series: [11.3, 11.2, 10.9, 10.6, 9.8, 9.4, 9.8, 10.1, 9.5, 9.4, 9.0] },
  urban: { code: 'SP.URB.TOTL.IN.ZS', label: 'Penduduk perkotaan', unit: '% penduduk', fmt: 'pct1',
    src: 'World Bank', series: [52.50, 53.17, 53.81, 54.45, 55.10, 55.74, 56.28, 56.88, 57.49, 58.12, 58.75] },
  internet: { code: 'IT.NET.USER.ZS', label: 'Pengguna internet', unit: '% penduduk', fmt: 'pct1',
    src: 'World Bank', series: [17.14, 22.06, 25.45, 32.34, 39.90, 47.69, 53.73, 62.10, 66.48, 69.21, 72.78] },
  labor: { code: 'SL.TLF.TOTL.IN', label: 'Angkatan kerja', unit: 'orang', fmt: 'int',
    src: 'World Bank', series: [125645513, 127299364, 128501300, 130940742, 134532894, 137425585, 137375390, 135672770, 139637843, 143318723, 145198137] },
  age014: { code: 'SP.POP.0014.TO.ZS', label: 'Usia 0–14 tahun', unit: '% penduduk', fmt: 'pct1',
    src: 'World Bank', series: [27.15, 26.97, 26.77, 26.56, 26.33, 26.09, 25.83, 25.58, 25.27, 24.93, 24.60] },
  age65: { code: 'SP.POP.65UP.TO.ZS', label: 'Usia 65 tahun ke atas', unit: '% penduduk', fmt: 'pct1',
    src: 'World Bank', series: [6.04, 6.08, 6.15, 6.24, 6.35, 6.49, 6.61, 6.69, 6.82, 7.05, 7.29] },
  mort5: { code: 'SH.DYN.MORT', label: 'Mortalitas balita', unit: 'per 1.000 kelahiran hidup', fmt: 'num1',
    src: 'World Bank', series: [27.3, 26.1, 25.0, 23.8, 22.8, 21.8, 20.8, 19.9, 19.1, 18.4, 17.7] },
  healthExp: { code: 'SH.XPD.CHEX.GD.ZS', label: 'Belanja kesehatan', unit: '% PDB', fmt: 'pct2',
    src: 'World Bank', lastYear: 2023,
    series: [2.96, 2.92, 3.02, 2.90, 2.87, 2.88, 3.42, 3.71, 2.69, 2.70, null] },
  literacy: { code: 'SE.ADT.LITR.ZS', label: 'Melek huruf dewasa (15+)', unit: '%', fmt: 'pct0',
    src: 'World Bank', lastYear: 2020, sparse: true,
    series: [95.12, 95.22, 95.38, null, 95.66, null, 96.0, null, null, null, null] },
  primEnr: { code: 'SE.PRM.ENRR', label: 'Partisipasi sekolah dasar (neto)', unit: '%', fmt: 'pct1',
    src: 'World Bank', series: [109.66, 107.98, 105.92, 104.38, 103.30, 101.26, 100.95, 100.31, 98.70, 98.16, 100.04] },
  secEnr: { code: 'SE.SEC.ENRR', label: 'Partisipasi sekolah menengah (neto)', unit: '%', fmt: 'pct1',
    src: 'World Bank', series: [83.56, 87.84, 87.82, 90.95, 92.81, 94.95, 96.93, 97.84, 97.82, 96.00, 98.84] },
  exports: { code: 'NE.EXP.GNFS.ZS', label: 'Ekspor barang & jasa', unit: '% PDB', fmt: 'pct1',
    src: 'World Bank', series: [23.67, 21.16, 19.09, 20.18, 21.00, 18.59, 17.33, 21.42, 24.50, 21.81, 22.31] },
  imports: { code: 'NE.IMP.GNFS.ZS', label: 'Impor barang & jasa', unit: '% PDB', fmt: 'pct1',
    src: 'World Bank', series: [24.41, 20.78, 18.33, 19.18, 22.07, 19.04, 15.64, 18.79, 20.96, 19.65, 20.50] },
  agriLand: { code: 'AG.LND.AGRI.ZS', label: 'Lahan pertanian', unit: '% luas lahan', fmt: 'pct1',
    src: 'World Bank', series: [27.51, 27.61, 27.87, 27.76, 28.41, 28.75, 28.96, 28.96, 29.01, 28.91, 28.93] },
  agriShare: { code: 'NV.AGR.TOTL.ZS', label: 'Pertanian, kehutanan, perikanan', unit: '% PDB', fmt: 'pct1',
    src: 'World Bank', series: [13.34, 13.49, 13.48, 13.16, 12.81, 12.71, 13.70, 13.28, 12.40, 12.53, 12.61] },
  indShare: { code: 'NV.IND.TOTL.ZS', label: 'Industri (termasuk konstruksi)', unit: '% PDB', fmt: 'pct1',
    src: 'World Bank', series: [41.93, 40.05, 39.31, 39.38, 39.73, 38.95, 38.24, 39.84, 41.43, 40.22, 39.32] },
  srvShare: { code: 'NV.SRV.TOTL.ZS', label: 'Jasa', unit: '% PDB', fmt: 'pct1',
    src: 'World Bank', series: [42.24, 43.31, 43.64, 43.61, 43.40, 44.22, 44.41, 42.82, 41.79, 42.88, 43.77] },
};

// Provinsi terpadat 2024 — BPS. Total nasional BPS 2024: 281,6 juta jiwa.
// Pulau Jawa: 55,93% penduduk nasional (Dukcapil, Semester I 2024).
// Kepadatan tertinggi: DKI Jakarta ~16.155 jiwa/km² (BPS 2024).
export const PROVINCES = [
  { name: 'Jawa Barat', pop: 50345190, share: 17.9 },
  { name: 'Jawa Timur', pop: 41919910, share: 14.9 },
  { name: 'Jawa Tengah', pop: 37892280, share: 13.5 },
  { name: 'Sumatera Utara', pop: 15588500, share: 5.5 },
  { name: 'Banten', pop: 12431390, share: 4.4 },
  { name: 'DKI Jakarta', pop: 10700000, share: 3.8 },
  { name: 'Sulawesi Selatan', pop: 9500000, share: 3.4 },
  { name: 'Lampung', pop: 9400000, share: 3.3 },
  { name: 'Sumatera Selatan', pop: 8800000, share: 3.1 },
  { name: 'Riau', pop: 6700000, share: 2.4 },
];

export const META = {
  country: 'Indonesia',
  wbNote: 'World Bank, World Development Indicators — diakses 26 Nov 2026',
  bpsNote: 'Badan Pusat Statistik (BPS), 2024',
  dukcapilNote: 'Dukcapil Kemendagri, Semester I 2024',
};

export function latest(key) {
  const ind = INDICATORS[key];
  const lastYear = ind.lastYear ?? 2024;
  const idx = YEARS.indexOf(lastYear);
  return { value: ind.series[idx], year: lastYear, ind };
}

export function fmtValue(ind, v) {
  if (v === null || v === undefined) return '—';
  switch (ind.fmt) {
    case 'int': return Math.round(v).toLocaleString('id-ID');
    case 'usdB': return 'US$ ' + v.toLocaleString('id-ID', { maximumFractionDigits: 1 }) + ' M';
    case 'usd0': return 'US$ ' + Math.round(v).toLocaleString('id-ID');
    case 'pct0': return Math.round(v) + '%';
    case 'pct1': return v.toLocaleString('id-ID', { maximumFractionDigits: 1 }) + '%';
    case 'pct2': return v.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '%';
    case 'num1': return v.toLocaleString('id-ID', { maximumFractionDigits: 1 });
    default: return String(v);
  }
}

export function change(key) {
  const s = INDICATORS[key].series;
  const a = s[s.length - 1] ?? s.filter((x) => x !== null).pop();
  const b = s[0];
  return ((a - b) / Math.abs(b)) * 100;
}
