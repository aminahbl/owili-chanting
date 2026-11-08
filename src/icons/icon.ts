// Icons draw inline SVG in currentColor, so they follow the text colour and the theme.
export function defineIcon(name: string, viewBox: string, shapes: string) {
  customElements.define(
    name,
    class extends HTMLElement {
      connectedCallback() {
        if (this.firstChild) return;
        const size = this.getAttribute('size') ?? '20';
        this.innerHTML = `<svg width="${size}" height="${size}" viewBox="${viewBox}" fill="currentColor" aria-hidden="true">${shapes}</svg>`;
      }
    },
  );
}
