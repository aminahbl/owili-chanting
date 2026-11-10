// Writes the site to dist/: the chant list pages, a page for each chant, the
// about, guide and resources pages, the search index and redirects.
import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { chantHref } from '../src/card.ts';
import { chantPage, type NextChant } from './chant-page.ts';
import { checkIds } from './ids.ts';
import { entries, loadChants, loadTimings, searchIndex, type Entry, type Group } from './chant-list.ts';
import type { Chant } from '../data/types.ts';
import { handWrittenPage, listPage, notFoundPage, pageHref, PAGES } from './templates.ts';

const PAGE_SIZE = 24;
const root = new URL('../', import.meta.url);
const dist = new URL('dist/', root);
// IDs on the previous chant page, chant.html?id=<id>. Links to those that are
// still chants redirect to them; the others, mostly whole services, go home.
const OLD_IDS = [
  'divine-abidings', 'invitation-to-the-devas', 'verses-on-the-sharing-of-merit', 'morning-chanting',
  'evening-chanting-amaravati-book', 'evening-chanting-lbv-veneration', 'five-frequent-recollections',
  'ten-paramis', 'fire-sermon', 'just-as-rivers', 'funeral-chanting', 'universal-well-being',
];

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
await cp(new URL('assets', root), new URL('assets', dist), { recursive: true });

const chants = await loadChants();
checkIds(chants);
const all = entries(chants);
// Groups without chants, such as Services for now, get no chip and no page.
const shown = [...new Map(all.map((e) => [e.group.id, e.group])).values()];

await writeList(null, all, shown);
for (const group of shown) await writeList(group, all.filter((e) => e.group.id === group.id), shown);

const groupsById = new Map<string, Group>(shown.map((g) => [g.id, g]));
// The next chant in a chant's first group, by that group's order.
function nextChant(chant: Chant): NextChant | undefined {
  const first = chant.groups[0];
  const list = all.filter((e) => e.group.id === first?.group);
  const after = list[list.findIndex((e) => e.card.slug === chant.slug) + 1];
  return after && { slug: after.card.slug, title: after.card.title, groupTitle: after.group.title };
}
const timings = await loadTimings(chants);
for (const chant of chants) {
  const page = chantPage(chant, groupsById, nextChant(chant), timings.defaults.get(chant.id), timings.recordings.get(chant.id));
  await write(`${chantHref(chant.slug)}/index.html`, page);
}

for (const page of PAGES) {
  const body = await readFile(new URL(`pages/${page.slug}.html`, root), 'utf8');
  await write(`/${page.slug}/index.html`, handWrittenPage(page, body));
}

await write('/search.json', JSON.stringify(searchIndex(chants, all)));
await write('/404.html', notFoundPage());

// The first page of a list has no number, so the numbered form redirects to it.
// Old chant links are matched by their id parameter, and the last rule catches the rest.
const slugs = new Set(chants.map((c) => c.slug));
const redirects = [
  '/list / 301',
  '/list/1 / 301',
  ...shown.map((g) => `/list/${g.id}/1 /list/${g.id} 301`),
  ...OLD_IDS.filter((id) => slugs.has(id)).map((id) => `/chant.html id=${id} ${chantHref(id)} 301`),
  '/chant.html / 301',
  '/about.html /about 301',
];
await write('/_redirects', `${redirects.join('\n')}\n`);

console.log(`Built ${chants.length} chants, ${shown.length} groups into dist/`);
