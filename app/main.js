// main.js — router hash + state explorer. Rute:
//   #/                Beranda
//   #/penduduk        Penduduk
//   #/ekonomi         Ekonomi
//   #/kesehatan       Kesehatan
//   #/pendidikan      Pendidikan
//   #/daerah          Daerah
//   #/jelajahi        Jelajahi Data (explorer interaktif)
//   #/metode          Metode & Sumber
//
// window.__shotReady false selama render, true sesudahnya, supaya skrip
// screenshot tahu kapan halaman siap dipotret.
import { homePage, pendudukPage, ekonomiPage, kesehatanPage, pendidikanPage, daerahPage, metodePage, explorerPage, downloadCSV } from './pages.js';

const app = document.getElementById('app');

// State explorer (default sudah kaya: PDB 2014–2024, tampilan garis).
const explorerState = { ind: 'gdp', ind2: '', from: 2014, to: 2024, view: 'line' };

const TITLES = {
  '': 'Statistik Indonesia', penduduk: 'Penduduk', ekonomi: 'Ekonomi',
  kesehatan: 'Kesehatan', pendidikan: 'Pendidikan', daerah: 'Daerah',
  jelajahi: 'Jelajahi Data', metode: 'Metode & Sumber',
};

function bindExplorer() {
  const sel = document.getElementById('sel-ind');
  if (!sel) return;
  sel.addEventListener('change', () => { explorerState.ind = sel.value; render(); });
  document.getElementById('sel-ind2').addEventListener('change', (e) => { explorerState.ind2 = e.target.value; render(); });
  const rf = document.getElementById('rng-from'), rt = document.getElementById('rng-to');
  rf.addEventListener('input', () => {
    explorerState.from = Math.min(Number(rf.value), explorerState.to);
    document.getElementById('lbl-from').textContent = explorerState.from;
  });
  rf.addEventListener('change', render);
  rt.addEventListener('input', () => {
    explorerState.to = Math.max(Number(rt.value), explorerState.from);
    document.getElementById('lbl-to').textContent = explorerState.to;
  });
  rt.addEventListener('change', render);
  document.querySelectorAll('[data-view]').forEach((b) => b.addEventListener('click', () => {
    explorerState.view = b.dataset.view; render();
  }));
  document.getElementById('btn-csv').addEventListener('click', () => downloadCSV(explorerState));
}

function render() {
  window.__shotReady = false;
  const route = (location.hash.match(/^#\/([a-z]*)/) || [])[1] ?? '';
  const views = {
    '': homePage, penduduk: pendudukPage, ekonomi: ekonomiPage,
    kesehatan: kesehatanPage, pendidikan: pendidikanPage, daerah: daerahPage,
    jelajahi: () => explorerPage(explorerState), metode: metodePage,
  };
  const view = views[route] || homePage;
  app.innerHTML = view();
  document.querySelectorAll('[data-nav]').forEach((a) => {
    a.classList.toggle('active', a.dataset.nav === (route || 'home'));
  });
  document.title = `${TITLES[route] ?? 'Statistik Indonesia'} | Nusantara Data`;
  bindExplorer();
  // Gulir ke atas hanya saat pindah halaman; saat explorer di-render ulang
  // (mis. slider digeser) posisi gulir pengguna dipertahankan.
  if (route !== lastRoute) window.scrollTo(0, 0);
  lastRoute = route;
  window.__shotReady = true;
}

let lastRoute = null;
window.addEventListener('hashchange', render);
render();
