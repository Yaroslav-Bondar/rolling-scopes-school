import { Component } from './component';
import { goTo } from '../router';
import { createElement } from '../services';

declare global {
  interface HTMLElementTagNameMap {
    'x-nav-link': NavLinkComponent;
  }
}

class NavLinkComponent extends Component {
  constructor() {
    super();
    this.shadowDom.innerHTML = '<a></a>';
    const style: HTMLStyleElement = createElement({ tag: 'style' });
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
    this.shadowDom.append(style);
  }

  static get observedAttributes(): string[] {
    return [NavLinkDataAttributes.Selected, 'href', NavLinkDataAttributes.Text];
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

  private onClick(event: Event): void {
    event.preventDefault();
    if (this.isSelected) return;
    const path: string | null = this.getAttribute('href');
    if (!path) return;
    goTo(path);
  }

  private setActiveStyle(): void {
    if (!this.isSelected) return;
    const style = this.getElement()('style');
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

  private updateHref(value: string): void {
    const link: HTMLAnchorElement = this.getElement()('a');
    link.href = value;
  }

  private updateText(value: string) {
    this.getElement()('a').textContent = value;
  }
}

customElements.define('x-nav-link', NavLinkComponent);
