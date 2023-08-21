import { goTo } from '../router';
import createElement from '../utils/createElement';

class NavLink extends HTMLElement {
  static get observedAttributes(): string[] {
    return ['selected'];
  }

  constructor() {
    super();

    const shadow: ShadowRoot = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = '<a></a>';

    const style: HTMLStyleElement = createElement({ tag: 'style' }) as HTMLStyleElement;
    style.textContent = `
      a {
        color: lightgreen;
        padding: 5px;
        margin: 5px 5px 5px 0;
        background-color: #ddd;
        text-decoration: none;
      }

      a:hover {
        background-color: grey;
        color: #eee;
      }
    `;

    this.addEventListener('click', this.onClick);
    shadow.append(style);
  }

  connectedCallback() {
    const shadow: ShadowRoot | null = this.shadowRoot;
    const link: HTMLAnchorElement | null | undefined = shadow?.querySelector('a');

    const href: string | null = this.getAttribute('href');
    if (href) {
      link?.setAttribute('href', href);
    }

    const text: string | null = this.getAttribute('text');
    if (text && link) {
      link.textContent = text;
    }
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    if (name === 'selected' && newValue === 'true') {
      this.updateStyle();
    }
  }

  onClick(event: Event): void {
    event.preventDefault();
    const selected: string | null = this.getAttribute('selected');

    if (selected !== 'true') {
      const target: HTMLElement | null = event.target as HTMLElement;
      const path: string | null | undefined = target?.getAttribute('href');
      if (path) {
        goTo(path);
      }
    }
  }

  updateStyle(): void {
    const style: HTMLStyleElement | null | undefined = this.shadowRoot?.querySelector('style');
    if (style) {
      style.innerHTML = `
        a {
          color: red;
          padding: 5px;
          margin: 5px 5px 5px 0;
          background-color: green;
          text-decoration: none;
          cursor: default;
        }
      `;
    }
  }
}

customElements.define('nav-link', NavLink);
