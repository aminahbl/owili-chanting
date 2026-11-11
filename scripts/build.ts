// Writes the site to dist/: the chant list pages, a page for each chant, the
// about, guide and resources pages, the search index and redirects.
import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { chantHref } from '../src/card.ts';
import { chantPage, setPage, type SetLink } from './chant-page.ts';
import { checkIds } from './ids.ts';
import { entries, groupsOf, loadChants, loadSets, loadTimings, searchIndex, type Entry, type Group } from './chant-list.ts';
import type { Chant } from '../data/types.ts';
import { handWrittenPage, listPage, notFoundPage, pageHref, PAGES, setsPage } from './templates.ts';
import { groups } from '../data/groups.ts';
import { lineages, places } from '../data/places.ts';

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
const sets = await loadSets(chants);
checkIds([...chants, ...sets]);
const all = entries(chants);
// Categories without chants get no chip and no page. Sangha sets holds sets
// rather than chants, and is shown when there are sets.
const setsGroup: Group = groups.find((g) => g.id === 'sangha-sets')!;
const shown = groups.filter((g) => (g === setsGroup ? sets.length > 0 : g.chants.length > 0));

await writeList(null, all, shown);
for (const group of shown) {
  if (group !== setsGroup) await writeList(group, all.filter((e) => e.group.id === group.id), shown);
}

// Sets by place, places in the order of data/places.ts, sets by their order.
const byNumber = new Map(chants.map((c) => [c.id, c]));
const setPlaces = places.map((place) => ({
  title: place.title,
  lineageTitle: 'lineage' in place ? lineages.find((l) => l.id === place.lineage)?.title : undefined,
  sets: sets.filter((s) => s.place === place.id).sort((a, b) => a.order - b.order),
}));
if (sets.length) {
  const list = setPlaces
    .filter((p) => p.sets.length)
    .map((p) => ({ ...p, sets: p.sets.map((set) => ({ set, chants: set.chants.map((id) => byNumber.get(id)!) })) }));
  await write(`/list/${setsGroup.id}/index.html`, setsPage(setsGroup, shown, list));
}
const timings = await loadTimings(chants, sets);
for (const place of setPlaces) {
  for (const set of place.sets) {
    const page = setPage(set, set.chants.map((id) => byNumber.get(id)!), place, timings.setDefaults.get(set.id), timings.setRecordings.get(set.id));
    await write(`/sets/${set.slug}/index.html`, page);
  }
}
const setLinks = (chant: Chant): SetLink[] =>
  setPlaces.flatMap((p) => p.sets.filter((s) => s.chants.includes(chant.id)).map((s) => ({ slug: s.slug, title: s.title, placeTitle: p.title })));

for (const chant of chants) {
  const page = chantPage(chant, groupsOf(chant), timings.defaults.get(chant.id), timings.recordings.get(chant.id), setLinks(chant));
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

console.log(`Built ${chants.length} chants, ${sets.length} sets, ${shown.length} groups into dist/`);
