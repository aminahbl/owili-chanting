// The Open sets page (openSetsPage in scripts/templates.ts): the user's open
// sets, and the editor that sets a set's title and chooses and orders its
// chants. The address names what is shown: a set's ID after "#" opens it in
// the editor, "#new" opens a new set, and no "#" shows the list.
import './icons/home.ts';
import { chantHref, loadSearchIndex, type SearchEntry } from './card.ts';
import { escapeHtml } from './html.ts';
import { matches, normalise } from './normalise.ts';
import { deleteOpenSet, newOpenSetId, readOpenSets, saveOpenSet, SET_PAGE, shareLink, type OpenSet } from './open-set-store.ts';

const listSection = document.querySelector<HTMLElement>('#open-sets-list')!;
const list = listSection.querySelector<HTMLElement>('.open-set-list')!;
const empty = listSection.querySelector<HTMLElement>('.open-sets-empty')!;
const editor = document.querySelector<HTMLFormElement>('#open-set-editor')!;
const heading = editor.querySelector<HTMLElement>('#open-set-editor-title')!;
const titleInput = editor.querySelector<HTMLInputElement>('[name="title"]')!;
const chantList = editor.querySelector<HTMLElement>('.open-set-chants')!;
const noChants = editor.querySelector<HTMLElement>('.open-set-no-chants')!;
const search = editor.querySelector<HTMLInputElement>('#open-set-search')!;
const searchStatus = editor.querySelector<HTMLElement>('#search-status')!;
const results = editor.querySelector<HTMLElement>('.open-set-results')!;

const count = (n: number) => (n === 1 ? '1 chant' : `${n} chants`);

function setRow(set: OpenSet): string {
  return `<li class="open-set-row" data-id="${set.id}">
<span class="open-set-name"><a href="${SET_PAGE}#${set.id}">${escapeHtml(set.title)}</a> <span class="open-set-count">${count(set.chants.length)}</span></span>
<span class="open-set-actions">
<button type="button" class="outline-button" data-action="edit">Edit</button>
<button type="button" class="outline-button" data-action="link">Copy link</button>
<button type="button" class="outline-button" data-action="delete">Delete</button>
</span>
</li>`;
}

function showList() {
  const sets = readOpenSets();
  list.innerHTML = sets.map(setRow).join('\n');
  empty.hidden = sets.length > 0;
  listSection.hidden = false;
  editor.hidden = true;
}

function leaveEditor() {
  history.replaceState(null, '', location.pathname);
  showList();
}

async function copyLink(button: HTMLButtonElement, set: OpenSet) {
  const link = shareLink(set);
  try {
    await navigator.clipboard.writeText(link);
    button.textContent = 'Link copied';
    setTimeout(() => (button.textContent = 'Copy link'), 2000);
  } catch {
    prompt('Copy this link', link);
  }
}

list.addEventListener('click', async (event) => {
  const button = (event.target as Element).closest<HTMLButtonElement>('button[data-action]');
  const id = button?.closest<HTMLElement>('[data-id]')?.dataset.id;
  const set = readOpenSets().find((s) => s.id === id);
  if (!button || !set) return;
  if (button.dataset.action === 'edit') location.hash = set.id;
  else if (button.dataset.action === 'link') await copyLink(button, set);
  else if (confirm(`Delete “${set.title}”? What this browser keeps for it, such as an imported timing and an audio file, is removed too.`)) {
    await deleteOpenSet(set.id);
    showList();
  }
});
document.querySelector('#open-set-new')?.addEventListener('click', () => (location.hash = 'new'));

// The editor. Chant titles come from the search index, which is fetched when
// the editor first opens.
let entries: SearchEntry[] = [];
let byId = new Map<string, SearchEntry>();
/** The set being edited. Only Save stores it. */
let draft: OpenSet = { id: '', title: '', chants: [] };

// A chant's title links to its page in a new tab, so the set being edited stays open.
const chantLink = (e: SearchEntry) => `<a href="${chantHref(e.slug)}" target="_blank">${escapeHtml(e.title)}</a>`;

function chantName(id: string): string {
  const entry = byId.get(id);
  if (entry) return chantLink(entry);
  return entries.length ? `#${id} is no longer on the site` : `#${id}`;
}

function chantRow(id: string, i: number): string {
  const first = i === 0 ? ' disabled' : '';
  const last = i === draft.chants.length - 1 ? ' disabled' : '';
  return `<li data-id="${id}">
<span class="open-set-name">${chantName(id)}</span>
<span class="open-set-actions">
<button type="button" class="outline-button" data-action="up" title="Move up" aria-label="Move up"${first}>↑</button>
<button type="button" class="outline-button" data-action="down" title="Move down" aria-label="Move down"${last}>↓</button>
<button type="button" class="outline-button" data-action="remove">Remove</button>
</span>
</li>`;
}

function showChants() {
  chantList.innerHTML = draft.chants.map(chantRow).join('\n');
  noChants.hidden = draft.chants.length > 0;
}

// With the search field empty, every chant is listed once the field has had focus.
let browsing = false;

function foundFor(query: string): SearchEntry[] {
  if (query) return entries.filter((e) => matches(`${e.text} ${e.sourceCategories}`, query));
  return browsing ? entries : [];
}

function showResults() {
  const query = normalise(search.value);
  const found = foundFor(query);
  results.innerHTML = found
    .map((e) => {
      const added = draft.chants.includes(e.id);
      const pali = e.paliTitle ? ` <span class="open-set-count" lang="pi">${escapeHtml(e.paliTitle)}</span>` : '';
      const line = e.lines[0] ? `<span class="open-set-preview" lang="pi">${escapeHtml(e.lines[0])}</span>` : '';
      return `<li><span class="open-set-name">${chantLink(e)}${pali}${line}</span>
<span class="open-set-actions"><button type="button" class="outline-button" data-add="${e.id}"${added ? ' disabled' : ''}>${added ? 'Added' : 'Add'}</button></span></li>`;
    })
    .join('\n');
  searchStatus.textContent = query && entries.length && !found.length ? 'No chants found' : '';
}

function edit(set: OpenSet, isNew: boolean) {
  draft = { ...set, chants: [...set.chants] };
  heading.textContent = isNew ? 'New set' : 'Edit set';
  titleInput.value = set.title;
  search.value = '';
  browsing = false;
  listSection.hidden = true;
  editor.hidden = false;
  showChants();
  showResults();
  titleInput.focus();
  loadSearchIndex().then(
    (loaded) => {
      entries = loaded;
      byId = new Map(loaded.map((e) => [e.id, e]));
      showChants();
      showResults();
    },
    () => (searchStatus.textContent = 'Search is not available right now'),
  );
}

// Focus stays on the button that moved a chant, or on its neighbour once it reaches an end.
chantList.addEventListener('click', (event) => {
  const button = (event.target as Element).closest<HTMLButtonElement>('button[data-action]');
  const id = button?.closest<HTMLElement>('[data-id]')?.dataset.id;
  if (!button || !id) return;
  const i = draft.chants.indexOf(id);
  const action = button.dataset.action;
  if (action === 'remove') {
    draft.chants.splice(i, 1);
    showChants();
    showResults();
    search.focus();
    return;
  }
  const j = action === 'up' ? i - 1 : i + 1;
  [draft.chants[i], draft.chants[j]] = [draft.chants[j], draft.chants[i]];
  showChants();
  const row = chantList.querySelector(`[data-id="${id}"]`);
  const target = row?.querySelector<HTMLButtonElement>(`[data-action="${action}"]:not(:disabled)`) ?? row?.querySelector('button:not(:disabled)');
  target?.focus();
});

results.addEventListener('click', (event) => {
  const button = (event.target as Element).closest<HTMLButtonElement>('button[data-add]');
  if (!button?.dataset.add) return;
  draft.chants.push(button.dataset.add);
  showChants();
  showResults();
  search.focus();
});

search.addEventListener('input', showResults);
search.addEventListener('focus', () => {
  browsing = true;
  showResults();
});
// Enter in the search field would otherwise save the set.
search.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') event.preventDefault();
});

editor.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!draft.chants.length) {
    searchStatus.textContent = 'Add at least one chant before saving';
    search.focus();
    return;
  }
  saveOpenSet({ ...draft, title: titleInput.value.trim() || 'Open set' });
  leaveEditor();
});
editor.querySelector('#open-set-cancel')?.addEventListener('click', leaveEditor);

function route() {
  const id = location.hash.slice(1);
  const set = readOpenSets().find((s) => s.id === id);
  if (set) edit(set, false);
  else if (id === 'new') edit({ id: newOpenSetId(), title: '', chants: [] }, true);
  else showList();
}
addEventListener('hashchange', route);
route();
