import createElement from '../utils/createElement';

enum Ids {
  SearchInput = 'search-input',
}

enum CssClasses {
  MainMenu = 'main-menu',
  MainMenuLink = 'main-menu__link',
  MainMenuSearch = 'main-menu__search',
}

enum DataAttributes {
  SearchType = 'data-search-type',
  Selected = 'data-selected',
  Text = 'data-text',
}

interface NavLink {
  href: Routes;
  text: string;
  class: CssClasses;
}

class MainNavigation extends HTMLElement {
  static get observedAttributes(): string[] {
    return [DataAttributes.SearchType];
  }

  private navLinks: NavLink[] = [
    {
      href: Routes.Main,
      text: 'Home',
      class: CssClasses.MainMenuLink,
    },
    {
      href: Routes.Users,
      text: 'Users',
      class: CssClasses.MainMenuLink,
    },
    {
      href: Routes.Posts,
      text: 'Posts',
      class: CssClasses.MainMenuLink,
    },
  ];

  constructor() {
    super();
    const shadow: ShadowRoot = this.attachShadow({ mode: 'open' });
    const container: HTMLElement = createElement({ tag: 'div', classes: [CssClasses.MainMenu] });
    const createNavLink = (data: NavLink): HTMLElement => {
      const navLink: HTMLElement = createElement({ tag: 'nav-link' });
      navLink.setAttribute(DataAttributes.Text, data.text);
      navLink.setAttribute('href', data.href);
      navLink.setAttribute('class', `${data.class}`);
      const { pathname: path } = new URL(window.location.href);
      if (path === data.href) {
        navLink.setAttribute(DataAttributes.Selected, 'true');
      }
      return navLink;
    };
    container.append(...this.navLinks.map(createNavLink));
    const search: HTMLInputElement = createElement({
      tag: 'input',
      id: Ids.SearchInput,
      classes: [CssClasses.MainMenuSearch],
    }) as HTMLInputElement;
    search.addEventListener('keyup', this.handleSearch);
    container.append(search);
    const style: HTMLStyleElement = createElement({ tag: 'style' }) as HTMLStyleElement;
    style.textContent = `
      .main-menu {
        padding: 5px;
      }
    `;
    shadow.append(container, style);
  }

  connectedCallback(): void {
    if (this.searchType === null) {
      this.updateSearchPlaceholder();
    }
  }

  attributeChangedCallback(name: DataAttributes): void {
    if (name === DataAttributes.SearchType) {
      this.updateSearchPlaceholder();
    }
  }

  get searchType(): string | null {
    return this.getAttribute(DataAttributes.SearchType);
  }

  get isDefaultSearchType(): boolean {
    return this.searchType === SearchTypes.User || this.searchType === null;
  }

  handleSearch = (event: KeyboardEvent): void => {
    event.stopPropagation();
    if (event.code !== 'Enter') return;
    event.preventDefault();
    const target: HTMLInputElement = event.target as HTMLInputElement;
    const { value: text } = target;
    if (!text) return;
    if (text.trim().length < 2) {
      // TODO: show modal error window
      return;
    }
    if (this.isDefaultSearchType) {
      // TODO: render the users page
    } else if (this.searchType === SearchTypes.Post) {
      // TODO: render the posts page
    }
  };

  updateSearchPlaceholder() {
    const searchInput: HTMLInputElement | null | undefined = this.shadowRoot?.getElementById(`${Ids.SearchInput}`) as HTMLInputElement;
    if (this.isDefaultSearchType) {
      searchInput?.setAttribute('placeholder', 'Search user...');
    } else if (this.searchType === SearchTypes.Post) {
      searchInput?.setAttribute('placeholder', 'Search post...');
    } else {
      throw new Error('Wrong search type.');
    }
  }
}

customElements.define('main-navigation', MainNavigation);
