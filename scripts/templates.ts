import { cardHtml } from '../src/card.ts';
import { escapeHtml } from '../src/html.ts';
import { SETTING_NAMES, SETTINGS_KEY } from '../src/settings.ts';
import type { ChantSet } from '../data/types.ts';
import type { Entry, Group } from './chant-list.ts';

const SITE = 'Chanting for shared happiness';
const DESCRIPTION =
  'Practice Pali chanting as a devotional offering, to learn the teachings and to cultivate inspiration and joy.';

/** A page written by hand, at /<slug>, with its body in pages/<slug>.html. */
export interface Page {
  slug: string;
  title: string;
}

// In the order of the site header's links.
export const PAGES: Page[] = [
  { slug: 'about', title: 'About' },
  { slug: 'guide', title: 'Guide' },
  { slug: 'resources', title: 'Resources' },
];

// The last button in the header of every page; src/theme.ts sets its label.
export const THEME_BUTTON = `<button class="icon-button theme-button" id="theme-button" title="Theme"><icon-sun></icon-sun><icon-moon></icon-moon><span class="sr-only">Theme</span></button>`;

// The header of every page but the chant pages. Away from the list pages, it
// also links back to the chants, with the site's name.
function siteHeader(current?: Page): string {
  const home = current
    ? `<a class="site-home" href="/"><span class="icon-button"><icon-home></icon-home></span>${SITE}</a>`
    : '';
  const links = PAGES.map((p) => {
    const here = p === current ? ' aria-current="page"' : '';
    return `<li><a href="/${p.slug}"${here}>${p.title}</a></li>`;
  });
  return `<header class="site-header">
  ${home}
  <nav aria-label="Site"><ul>${links.join('')}</ul></nav>
  ${THEME_BUTTON}
</header>`;
}

// Applies the stored display settings before the page is drawn, so it does not
// change after loading (src/settings.ts). The text view's size is also set as
// a CSS variable. A view named in the URL, as in ?view=slides, takes
// precedence over the stored view.
const APPLY_SETTINGS = `<script>try{var r=document.documentElement,d=r.dataset,s=JSON.parse(localStorage.getItem(${JSON.stringify(SETTINGS_KEY)}))||{};${JSON.stringify(SETTING_NAMES)}.forEach(function(k){if(s[k])d[k]=s[k]});if(+s.size)r.style.setProperty("--pali-size",s.size+"rem")}catch(e){}var v=new URLSearchParams(location.search).get("view");if(v==="slides"||v==="text")d.view=v</script>`;

export function layout(title: string, body: string, scripts = '', header = siteHeader()): string {
  const full = title === SITE ? SITE : `${title} · ${SITE}`;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(full)}</title>
${APPLY_SETTINGS}
<meta name="description" content="${DESCRIPTION}">
<meta name="theme-color" content="#f1eee9" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#292c3c" media="(prefers-color-scheme: dark)">
<meta property="og:type" content="website">
<meta property="og:title" content="${escapeHtml(full)}">
<meta property="og:site_name" content="${SITE}">
<meta property="og:description" content="${DESCRIPTION}">
<meta property="og:image" content="/assets/socials/social-1200x630.jpg">
<meta property="og:image:alt" content="${SITE}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon_io/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon_io/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/assets/favicon_io/apple-touch-icon.png">
<link rel="manifest" href="/assets/favicon_io/site.webmanifest">
<link rel="stylesheet" href="/assets/site.css">
<script type="module" src="/assets/js/theme.js"></script>
${scripts}
</head>
<body>
${header}
<main class="page">
${body}
</main>
</body>
</html>
`;
}

export function pageHref(base: string, page: number): string {
  if (page === 1) return base;
  return base === '/' ? `/list/${page}` : `${base}/${page}`;
}

// Page numbers to show, with null for a gap: the first, the last, and the current one with its neighbours.
function pageItems(current: number, count: number): (number | null)[] {
  const items: (number | null)[] = [];
  for (let p = 1; p <= count; p++) {
    if (p === 1 || p === count || Math.abs(p - current) <= 1) items.push(p);
    else if (items.at(-1) !== null) items.push(null);
  }
  return items;
}

function pagination(base: string, current: number, count: number): string {
  if (count < 2) return '';
  const link = (page: number, label: string, rel = '') =>
    `<a href="${pageHref(base, page)}"${rel ? ` rel="${rel}"` : ''}>${label}</a>`;
  const items = pageItems(current, count).map((p) => {
    if (p === null) return '<li class="gap" aria-hidden="true">…</li>';
    if (p === current) return `<li><a aria-current="page" href="${pageHref(base, p)}">${p}</a></li>`;
    return `<li>${link(p, String(p))}</li>`;
  });
  const prev = current > 1 ? `<li>${link(current - 1, '‹ <span class="sr-only">Previous page</span>', 'prev')}</li>` : '';
  const next = current < count ? `<li>${link(current + 1, '<span class="sr-only">Next page</span> ›', 'next')}</li>` : '';
  return `<nav class="pagination" aria-label="Pages"><ul>${prev}${items.join('')}${next}</ul></nav>`;
}

function chips(list: Group[], current: Group | null): string {
  const chip = (href: string, label: string, here: boolean) =>
    `<li><a href="${href}"${here ? ' aria-current="page"' : ''}>${escapeHtml(label)}</a></li>`;
  const items = [chip('/', 'All', current === null), ...list.map((g) => chip(`/list/${g.id}`, g.title, g.id === current?.id))];
  return `<nav class="chips" aria-label="Categories"><ul>${items.join('')}</ul></nav>`;
}

// Consecutive entries of one group form a block. A block whose first entry is
// not the first of its group, because the page broke inside it, is marked continued.
function blocks(pageEntries: Entry[], firstIndex: number, all: Entry[]): string {
  const out: string[] = [];
  let i = 0;
  while (i < pageEntries.length) {
    const group = pageEntries[i].group;
    const start = i;
    while (i < pageEntries.length && pageEntries[i].group.id === group.id) i++;
    const before = all[firstIndex + start - 1];
    const continued = before?.group.id === group.id ? ' <span class="continued">(continued)</span>' : '';
    const cards = pageEntries.slice(start, i).map((e) => cardHtml(e.card)).join('\n');
    out.push(`<section class="group">
<h2>${escapeHtml(group.title)}${continued}</h2>
<ul class="cards">
${cards}
</ul>
</section>`);
  }
  return out.join('\n');
}

interface ListPage {
  /** The group shown, or null for all chants. */
  group: Group | null;
  groups: Group[];
  /** All entries of this list, across its pages. */
  entries: Entry[];
  page: number;
  pageSize: number;
}

export function listPage({ group, groups, entries, page, pageSize }: ListPage): string {
  const base = group ? `/list/${group.id}` : '/';
  const count = Math.ceil(entries.length / pageSize);
  const first = (page - 1) * pageSize;
  const pageEntries = entries.slice(first, first + pageSize);
  const parts = [group?.title, page > 1 ? `Page ${page}` : ''].filter(Boolean);
  const title = parts.length ? parts.join(', ') : SITE;
  // On a group page, search covers that group only.
  const searchLabel = group ? `Search ${escapeHtml(group.title)}` : 'Search chants';
  const groupData = group ? ` data-group="${group.id}" data-group-title="${escapeHtml(group.title)}"` : '';
  const body = `<h1 class="site-title"><a href="/">${SITE}</a></h1>
<div class="search" role="search">
  <label for="search-input" class="sr-only">${searchLabel}</label>
  <input id="search-input" type="search" placeholder="${searchLabel}" autocomplete="off" spellcheck="false" data-index="/search.json"${groupData}>
</div>
${chips(groups, group)}
<p id="search-status" class="search-status" role="status"></p>
<ul id="search-results" class="cards" hidden></ul>
<div id="chant-list">
${blocks(pageEntries, first, entries)}
${pagination(base, page, count)}
</div>`;
  return layout(title, body, '<script type="module" src="/assets/js/search.js"></script>');
}

/** The sets of one place, with the titles of their chants, for the Sangha sets page. */
export interface PlaceSets {
  title: string;
  lineageTitle?: string;
  sets: { set: ChantSet; chantTitles: string[] }[];
}

// A set's card shows the titles of its first two chants, and how many follow.
function setCard(set: ChantSet, chantTitles: string[], heading: 'h3' | 'h4'): string {
  const more = chantTitles.length - 2;
  const lines = [...chantTitles.slice(0, 2), more > 0 ? `and ${more} more` : '']
    .filter(Boolean)
    .map((t) => `<span>${escapeHtml(t)}</span>`)
    .join('');
  return `<li class="card">
<div class="card-head"><${heading} class="card-title"><a href="/sets/${set.slug}">${escapeHtml(set.title)}</a></${heading}></div>
<p class="card-lines">${lines}</p>
</li>`;
}

// Places are grouped under their lineage, each with its own heading; a place
// with no lineage has its heading at the lineage's level. The page has no
// search box, as it lists only a few sets.
export function setsPage(group: Group, groups: Group[], places: PlaceSets[]): string {
  const out: string[] = [];
  let lineage: string | undefined;
  for (const place of places) {
    if (place.lineageTitle && place.lineageTitle !== lineage) out.push(`<h2>${escapeHtml(place.lineageTitle)}</h2>`);
    lineage = place.lineageTitle;
    const placeHeading = place.lineageTitle ? 'h3' : 'h2';
    const cards = place.sets.map(({ set, chantTitles }) => setCard(set, chantTitles, place.lineageTitle ? 'h4' : 'h3'));
    out.push(`<${placeHeading}>${escapeHtml(place.title)}</${placeHeading}>
<ul class="cards">
${cards.join('\n')}
</ul>`);
  }
  const body = `<h1 class="site-title"><a href="/">${SITE}</a></h1>
${chips(groups, group)}
<section class="group sets">
<p class="sets-intro">Each set is anchored by a specific recording of a community’s chanting, following its chant order and wording.</p>
${out.join('\n')}
</section>`;
  return layout(group.title, body);
}

export function handWrittenPage(page: Page, body: string): string {
  const script = '<script type="module" src="/assets/js/icons/home.js"></script>';
  return layout(page.title, `<article class="prose">\n${body}</article>`, script, siteHeader(page));
}

export function notFoundPage(): string {
  return layout(
    'Page not found',
    `<h1 class="site-title"><a href="/">${SITE}</a></h1>
<p class="not-found">This page does not exist. <a href="/">See all chants</a>.</p>`,
  );
}
