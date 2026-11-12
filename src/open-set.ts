// The page of an open set (openSetPage in scripts/chant-page.ts). It finds the
// set named in the address, fills the article with each chant's block from
// /blocks/, and then loads chant-page.js, which reads the blocks as it does on
// a Sangha set page.
import { chantHref } from './card.ts';
import { escapeHtml } from './html.ts';
import { normalise } from './normalise.ts';
import { newOpenSetId, readOpenSets, readShareLink, saveOpenSet, type OpenSet } from './open-set-store.ts';

const article = document.querySelector<HTMLElement>('article.chant');
const status = document.querySelector<HTMLElement>('.open-set-status');
const saveBar = document.querySelector<HTMLElement>('.open-set-save');

// A set opened from a share link takes an ID from its content, so that what is
// kept for it before it is saved is still found after a reload or a save.
function linkId(set: Omit<OpenSet, 'id'>): string {
  let hash = 0x811c9dc5;
  for (const c of `${set.title}\n${set.chants.join()}`) hash = Math.imul(hash ^ c.codePointAt(0)!, 0x01000193) >>> 0;
  return `open-${hash.toString(36)}`;
}

/** The set named in the address, and whether it is saved in this browser. */
function findSet(): { set: OpenSet; saved: boolean } | null {
  const saved = readOpenSets();
  const byId = saved.find((s) => `#${s.id}` === location.hash);
  if (byId) return { set: byId, saved: true };
  const link = readShareLink(location.hash);
  if (!link) return null;
  const same = saved.find((s) => s.title === link.title && s.chants.join() === link.chants.join());
  if (same) {
    history.replaceState(null, '', `#${same.id}`);
    return { set: same, saved: true };
  }
  // A set saved from this link and edited since keeps the link's ID.
  const id = saved.some((s) => s.id === linkId(link)) ? newOpenSetId() : linkId(link);
  return { set: { id, ...link }, saved: false };
}

const missing = (text: string) => `<p class="open-set-missing">${text}</p>`;

async function chantBlock(id: string): Promise<string> {
  try {
    const response = await fetch(`/blocks/${id}.html`);
    if (response.ok) return await response.text();
    if (response.status === 404) return missing(`Chant #${id} is no longer on the site.`);
  } catch {
    // Shown as not loaded, below.
  }
  return missing(`Chant #${id} could not be loaded.`);
}

function showSaved(set: OpenSet, saved: boolean) {
  if (saveBar) saveBar.hidden = saved;
  for (const el of document.querySelectorAll<HTMLElement>('.open-set-kept')) el.hidden = !saved;
  const edit = document.querySelector<HTMLAnchorElement>('#open-set-edit');
  if (edit) edit.href = `/open-sets#${set.id}`;
}

// The info panel lists the chants, linked to their own pages.
function listChants(set: OpenSet, chants: HTMLElement) {
  const items = set.chants.map((id) => {
    const block = article?.querySelector<HTMLElement>(`.set-chant[data-chant="${id}"]`);
    const title = block?.querySelector('.set-chant-title')?.textContent ?? '';
    return block ? `<dd><a href="${chantHref(block.dataset.slug ?? '')}">${escapeHtml(title)}</a></dd>` : `<dd>#${id}, not available</dd>`;
  });
  chants.insertAdjacentHTML('afterend', items.join(''));
}

async function show(article: HTMLElement, set: OpenSet, saved: boolean) {
  if (status) status.textContent = 'Loading the chants…';
  const blocks = await Promise.all(set.chants.map(chantBlock));
  // The slug names exported files.
  article.dataset.chant = set.id;
  article.dataset.slug = normalise(set.title).replaceAll(' ', '-') || set.id;
  article.innerHTML = `<h1>${escapeHtml(set.title)}</h1>\n${blocks.join('\n')}`;
  const site = document.title.split(' · ').at(-1);
  document.title = `${set.title} · ${site}`;
  for (const el of document.querySelectorAll('.chant-header-title, #info-title')) el.textContent = set.title;
  const chants = document.querySelector<HTMLElement>('#open-set-chants');
  if (chants) listChants(set, chants);
  const formChoice = document.querySelector<HTMLElement>('.form-options');
  if (formChoice) formChoice.hidden = !article.querySelector('.form-men');
  showSaved(set, saved);
  document.querySelector('#open-set-save')?.addEventListener('click', () => {
    saveOpenSet(set);
    history.replaceState(null, '', `#${set.id}`);
    showSaved(set, true);
  });
  if (status) status.textContent = '';
  await import('./chant-page.ts');
}

// The page shows one set; another address after "#" loads it afresh.
addEventListener('hashchange', () => location.reload());

const found = findSet();
if (article && found) void show(article, found.set, found.saved);
else if (status) status.innerHTML = 'This set is not kept in this browser. Your sets are listed in <a href="/open-sets">Open sets</a>.';
