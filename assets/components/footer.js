class SiteFooter extends HTMLElement {
    connectedCallback() {
        const message = this.getAttribute('message') || 'Set your heart on reciting these verses. Keep your mindfulness with the chanting, offering it to the Buddha, Dhamma and Sangha and for the happiness of all beings.';
        this.innerHTML = `
      <footer class="site-footer">
        <small>${message}</small>
      </footer>
    `;
    }
}

customElements.define('site-footer', SiteFooter);
