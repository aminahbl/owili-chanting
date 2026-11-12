// Search on the chant list pages. The field is in the page's HTML, so the
// layout does not shift when this script loads. The index is fetched the
// first time the field gets focus, so users who never search do not download it.
import { cardHtml, type SearchEntry } from './card.ts';
import { matches, normalise } from './normalise.ts';


const input = document.querySelector<HTMLInputElement>('#search-input');
const status = document.querySelector<HTMLElement>('#search-status');
const list = document.querySelector<HTMLElement>('#chant-list');
// Only the chant list pages have a results section.
const results = document.querySelector<HTMLElement>('#search-results');

let index: Promise<SearchEntry[]> | null = null;

function load(url: string): Promise<SearchEntry[]> {
  index ??= fetch(url).then((r) => {
    if (!r.ok) throw new Error(`Search index: ${r.status}`);
    return r.json() as Promise<SearchEntry[]>;
  });
  return index;
}

// The status line speaks only when nothing is found.
function statusText(found: number, groupTitle?: string): string {
  if (found > 0) return '';
  return groupTitle ? `No chants found in ${groupTitle}` : 'No chants found';
}

// On a group page only that group's chants are searched, in the group's own order.
function inScope(entries: SearchEntry[], group?: string): SearchEntry[] {
  if (!group) return entries;
  return entries.filter((e) => group in e.groups).sort((a, b) => a.groups[group] - b.groups[group]);
}

async function update(field: HTMLInputElement, line: HTMLElement, rest: HTMLElement) {
  const query = normalise(field.value);
  let entries: SearchEntry[] = [];
  if (query) {
    try {
      entries = await load(field.dataset.index ?? '/search.json');
    } catch {
      line.textContent = 'Search is not available right now';
      return;
    }
    // A newer keystroke may have changed the field while the index loaded.
    if (normalise(field.value) !== query) return;
  }
  if (results) {
    line.textContent = showChants(results, rest, entries, query, field.dataset);
  } else {
    line.textContent = filterSets(rest, entries, query);
  }
}

// On the chant list pages the matching chants replace the list.
function showChants(out: HTMLElement, rest: HTMLElement, entries: SearchEntry[], query: string, data: DOMStringMap): string {
  const cards = out.querySelector('.cards')!;
  if (!query) {
    cards.innerHTML = '';
    out.hidden = true;
    rest.hidden = false;
    return '';
  }
  const found = inScope(entries, data.group).filter((e) => matches(`${e.text} ${e.sourceCategories}`, query));
  cards.innerHTML = found.map(cardHtml).join('\n');
  out.hidden = false;
  rest.hidden = true;
  return statusText(found.length, data.groupTitle);
}

// On the Sangha sets page the set cards are filtered in place. A set matches
// when every word of the query appears in its title, chanter and lineage, or in
// the titles and Pali of its chants. The Pali source's categories are left out,
// because they describe the source's arrangement, not the set.
function filterSets(rest: HTMLElement, entries: SearchEntry[], query: string): string {
  const textBySlug = new Map(entries.map((e) => [e.slug, e.text]));
  let found = 0;
  for (const card of rest.querySelectorAll<HTMLElement>('.card[data-chants]')) {
    const chantTexts = (card.dataset.chants ?? '').split(' ').map((slug) => textBySlug.get(slug) ?? '');
    card.hidden = query !== '' && !matches([card.dataset.text ?? '', ...chantTexts].join(' '), query);
    if (!card.hidden) found++;
  }
  return found ? '' : 'No sets found';
}

if (input && status && list) {
  input.addEventListener('focus', () => load(input.dataset.index ?? '/search.json').catch(() => {}), { once: true });
  input.addEventListener('input', () => update(input, status, list));
  // The browser may restore the field's text when the user comes back to the page.
  if (input.value) update(input, status, list);
}
