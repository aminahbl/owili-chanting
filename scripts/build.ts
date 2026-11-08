// Writes the site to dist/: the chant list pages, the search index and
// redirects, plus the current chant and about pages until they are rebuilt.
import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { entries, loadChants, searchIndex, type Entry, type Group } from './chant-list.ts';
import { listPage, notFoundPage, pageHref } from './templates.ts';

const PAGE_SIZE = 24;
const root = new URL('../', import.meta.url);
const dist = new URL('dist/', root);
const COPIED = ['chant.html', 'about.html', 'assets'];

async function write(path: string, content: string) {
  const url = new URL(path.replace(/^\//, ''), dist);
  await mkdir(new URL('./', url), { recursive: true });
  await writeFile(url, content);
}

async function writeList(group: Group | null, list: Entry[], groupsShown: Group[]) {
  const base = group ? `/list/${group.id}` : '/';
  const count = Math.ceil(list.length / PAGE_SIZE);
  for (let page = 1; page <= count; page++) {
    const html = listPage({ group, groups: groupsShown, entries: list, page, pageSize: PAGE_SIZE });
    await write(`${pageHref(base, page)}/index.html`.replace('//', '/'), html);
  }
}

await rm(dist, { recursive: true, force: true });
await mkdir(dist);
for (const path of COPIED) await cp(new URL(path, root), new URL(path, dist), { recursive: true });

const chants = await loadChants();
const all = entries(chants);
// Groups without chants, such as Services for now, get no chip and no page.
const shown = [...new Map(all.map((e) => [e.group.id, e.group])).values()];

await writeList(null, all, shown);
for (const group of shown) await writeList(group, all.filter((e) => e.group.id === group.id), shown);

await write('/search.json', JSON.stringify(searchIndex(chants, all)));
await write('/404.html', notFoundPage());

// The first page of a list has no number, so the numbered form redirects to it.
const redirects = ['/list / 301', '/list/1 / 301', ...shown.map((g) => `/list/${g.id}/1 /list/${g.id} 301`)];
await write('/_redirects', `${redirects.join('\n')}\n`);

console.log(`Built ${chants.length} chants, ${shown.length} groups into dist/`);
