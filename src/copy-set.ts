// "Copy to open sets" in a Sangha set's info panel saves an open set with the
// same chants and opens it in the editor.
import { newOpenSetId, saveOpenSet } from './open-set-store.ts';

const button = document.querySelector<HTMLButtonElement>('#copy-set');
button?.addEventListener('click', () => {
  const chants = [...document.querySelectorAll<HTMLElement>('.set-chant')].map((block) => block.dataset.chant ?? '');
  const id = newOpenSetId();
  saveOpenSet({ id, title: button.dataset.title ?? '', chants });
  location.href = `/open-sets#${id}`;
});
