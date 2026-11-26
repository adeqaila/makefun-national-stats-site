// Entry "Nusantara Data" — situs statistik nasional Indonesia (Node 22, stdlib saja).
// Program ini menyerahkan situs: menyalin app/ dan screenshots/ dari samping file ini
// ke /output lalu menulis /output/dossier.json dengan library make.fun yang divendor.
// Di luar grader, MAKEFUN_OUTPUT_DIR menggantikan /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// Deterministik: dua run menulis byte yang sama. Verifikasi:
//   MAKEFUN_OUTPUT_DIR=out1 node main.ts && MAKEFUN_OUTPUT_DIR=out2 node main.ts
//   && diff -r out1 out2   (harus tanpa perbedaan)

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(out, { recursive: true });
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) {
  cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });
}

// Batas yang sama dengan gate penilai: paling banyak 4 screenshot, masing-masing
// paling banyak 256 KiB; app/ paling banyak 993 file+direktori dan 16 MiB.
writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 16777216,
  }),
);
