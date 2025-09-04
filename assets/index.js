import './components/footer.js';
import { chants } from './data/chants.js';

function byId(id) { return document.getElementById(id); }

function renderList() {
  const list = byId('chant-list');
  if (!list) return;
  chants.forEach(c => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `chant.html?id=${encodeURIComponent(c.id)}`;
    a.textContent = c.title;
    a.setAttribute('aria-label', `${c.title} – open`);
    li.appendChild(a);
    list.appendChild(li);
  });
}

document.addEventListener('DOMContentLoaded', renderList);
