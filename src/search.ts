// Search on the chant list pages. The field is in the page's HTML, so the
// layout does not shift when this script loads. The index is fetched the
// first time the field gets focus, so users who never search do not download it.
import { cardHtml, type SearchEntry } from './card.ts';
import { matches, normalise } from './normalise.ts';


const input = document.querySelector<HTMLInputElement>('#search-input');
const status = document.querySelector<HTMLElement>('#search-status');
const results = document.querySelector<HTMLElement>('#search-results');
const list = document.querySelector<HTMLElement>('#chant-list');

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

async function update(field: HTMLInputElement, out: HTMLElement, rest: HTMLElement, line: HTMLElement) {
  const query = normalise(field.value);
  if (!query) {
    out.hidden = true;
    out.innerHTML = '';
    rest.hidden = false;
    line.textContent = '';
    return;
  }
  let entries: SearchEntry[];
  try {
    entries = await load(field.dataset.index ?? '/search.json');
  } catch {
    line.textContent = 'Search is not available right now';
    return;
  }
  // A newer keystroke may have changed the field while the index loaded.
  if (normalise(field.value) !== query) return;
  const setCards = [...rest.querySelectorAll<HTMLElement>('.card[data-chants]')];
  if (setCards.length) {
    const found = matchingSets(setCards, entries, query);
    out.replaceChildren(...found.map((card) => card.cloneNode(true)));
    line.textContent = found.length ? '' : 'No sets found';
  } else {
    const { group, groupTitle } = field.dataset;
    const found = inScope(entries, group).filter((e) => matches(e.text, query));
    out.innerHTML = found.map(cardHtml).join('\n');
    line.textContent = statusText(found.length, groupTitle);
  }
  out.hidden = false;
  rest.hidden = true;
}

// On the Sangha sets page a set matches when every word of the query appears
// in its title, place and lineage, or in the text of its chants.
function matchingSets(cards: HTMLElement[], entries: SearchEntry[], query: string): HTMLElement[] {
  const textBySlug = new Map(entries.map((e) => [e.slug, e.text]));
  return cards.filter((card) => {
    const chantTexts = (card.dataset.chants ?? '').split(' ').map((slug) => textBySlug.get(slug) ?? '');
    return matches([card.dataset.text ?? '', ...chantTexts].join(' '), query);
  });
}

if (input && status && results && list) {
  input.addEventListener('focus', () => load(input.dataset.index ?? '/search.json').catch(() => {}), { once: true });
  input.addEventListener('input', () => update(input, results, list, status));
  // The browser may restore the field's text when the user comes back to the page.
  if (input.value) update(input, results, list, status);
}
