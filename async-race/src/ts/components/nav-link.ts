import { goTo } from '../router';
import createElement from '../services/createElement';

class NavLink extends HTMLElement {
  static get observedAttributes(): string[] {
    return [NavLinkDataAttributes.Selected, 'href', NavLinkDataAttributes.Text];
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

  attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    if (name === NavLinkDataAttributes.Selected) {
      this.setActiveStyle();
    }
    if (name === 'href') {
      this.updateHref(newValue);
    }
    if (name === NavLinkDataAttributes.Text) {
      this.updateText(newValue);
    }
  }

  get isSelected(): boolean {
    return this.getAttribute(NavLinkDataAttributes.Selected) === 'true';
  }

  onClick(event: Event): void {
    event.preventDefault();
    if (this.isSelected) return;
    const path: string | null = this.getAttribute('href');
    if (!path) return;
    goTo(path);
  }

  setActiveStyle(): void {
    if (!this.isSelected) return;
    const style: HTMLStyleElement | null | undefined = this.shadowRoot?.querySelector('style');
    if (!style) throw new Error('Missing style.');
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

  updateHref(value: string): void {
    if (!value) return;
    const shadow: ShadowRoot | null = this.shadowRoot;
    const link: HTMLAnchorElement | null | undefined = shadow?.querySelector('a');
    if (!link) throw new Error('Missing link.');
    link.setAttribute('href', value);
  }

  updateText(value: string) {
    if (!value) return;
    const shadow: ShadowRoot | null = this.shadowRoot;
    const link: HTMLAnchorElement | null | undefined = shadow?.querySelector('a');
    if (!link) throw new Error('Missing link.');
    link.textContent = value;
  }
}

customElements.define('nav-link', NavLink);
