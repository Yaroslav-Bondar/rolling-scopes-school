import createElement from '../utils/createElement';

interface NavLink {
  href: string;
  name: string;
  class: string;
}

class MainNavigation extends HTMLElement {
  private navLinks: NavLink[] = [
    {
      href: Routes.Main,
      name: 'Home',
      class: 'main-navigation__nav-link',
    },
    {
      href: Routes.Garage,
      name: 'Garage',
      class: 'main-navigation__nav-link',
    },
  ];

  constructor() {
    super();
    const shadow: ShadowRoot = this.attachShadow({ mode: 'open' });
    const container: HTMLElement = createElement({ tag: 'div', classes: ['main-navigation'] });

    const createNavLink = (data: NavLink): void => {
      const navLink: HTMLElement = createElement({ tag: 'nav-link' });
      navLink.setAttribute('text', data.name);
      navLink.setAttribute('href', data.href);
      navLink.setAttribute('class', data.class);

      const { pathname: path } = new URL(window.location.href);
      if (path === data.href) {
        navLink.setAttribute('selected', 'true');
      }

      container.append(navLink);
    };
    this.navLinks.forEach(createNavLink);

    const style: HTMLStyleElement = createElement({ tag: 'style' }) as HTMLStyleElement;
    style.textContent = `
    `;

    shadow.append(container, style);
  }
}

customElements.define('main-navigation', MainNavigation);
