import './components/icons/index.js';
import './components/footer.js';
import { chants } from './data/chants.js';

function byId(id) { return document.getElementById(id); }

function renderLinksGrouped() {
  const container = byId('link-list');
  if (!container) return;

  chants.forEach(c => {
    const links = Array.isArray(c.links) ? c.links : [];
    if (links.length === 0) return;
    const chantItem = document.createElement('li');

    const title = document.createElement('h3');
    title.textContent = c.title;
    chantItem.appendChild(title);

    const linksList = document.createElement('ul');
    linksList.className = 'links';
    links.forEach(l => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = l.href;
      a.textContent = l.text;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.setAttribute('aria-label', `${l.text} – open in new tab`);
      li.appendChild(a);
      if (l.notes) {
        li.appendChild(document.createElement('br'));
        const notes = document.createElement('span');
        notes.className = 'notes';
        notes.textContent = l.notes;
        li.appendChild(notes);
      }
      linksList.appendChild(li);
    });

    chantItem.appendChild(linksList);
    container.appendChild(chantItem);
  });
}

document.addEventListener('DOMContentLoaded', renderLinksGrouped);