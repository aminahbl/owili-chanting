// Writes the site to dist/. Until the pages are generated from templates,
// this copies the current static pages and assets.
import { cp, mkdir, rm } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const dist = new URL('dist/', root);
const SITE_FILES = ['index.html', 'chant.html', 'about.html', 'assets'];

await rm(dist, { recursive: true, force: true });
await mkdir(dist);
for (const path of SITE_FILES) {
  await cp(new URL(path, root), new URL(path, dist), { recursive: true });
}

console.log(`Built ${SITE_FILES.join(', ')} into dist/`);
