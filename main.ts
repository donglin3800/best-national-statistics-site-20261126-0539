// Japan Statistics Atlas — the entry program (Node 22, standard library only).
// The site itself is app/: plain static files (index.html, CSS, ES modules,
// data) with no build step and no network request. This program hands it in:
// it copies app/ and screenshots/ from beside this file into the output
// directory and writes dossier.json there with the vendored make.fun
// library, exactly as the scorer rebuilds it. It reads nothing but its own
// directory, writes nothing but the output directory, and is deterministic:
// two runs write the same bytes.
//
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

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

// Caps from the competition gate: at most 4 screenshots of 256 KiB each,
// app/ at most 993 files and directories and 16 MiB, dossier text at most
// 160 KiB. buildDossier refuses an entry that breaks them, so a failure
// here is a failure the gate would report too.
writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 16777216,
  }),
);
