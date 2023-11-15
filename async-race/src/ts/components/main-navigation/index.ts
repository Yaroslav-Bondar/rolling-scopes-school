import createElement from '../../services/createElement';
import setDataAttributes from '../../services/setDataAttributes';
import modalWindowSearchErrorHtml from './html/modalWindowSearchError.html';
import modalWindowSearchKittensHtml from './html/modalWindowSearchKittens.html';

declare const enum Ids {
  SearchInput = 'search-input',
}

declare const enum CssClasses {
  MainMenu = 'main-menu',
  MainMenuLink = 'main-menu__link',
  MainMenuSearch = 'main-menu__search',
}

declare const enum DataAttributes {
  SearchType = 'data-search-type',
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

  private modalWindow: HTMLElement;

  private search: HTMLInputElement;

  constructor() {
    super();
    const shadow: ShadowRoot = this.attachShadow({ mode: 'open' });
    const container: HTMLElement = createElement({ tag: 'div', classes: [CssClasses.MainMenu] });
    const createNavLink = (data: NavLink): HTMLElement => {
      const navLink: HTMLElement = createElement({ tag: 'nav-link' });
      navLink.setAttribute(NavLinkDataAttributes.Text, data.text);
      navLink.setAttribute('href', data.href);
      navLink.setAttribute('class', `${data.class}`);
      const { pathname: path } = new URL(window.location.href);
      if (path === data.href) {
        navLink.setAttribute(NavLinkDataAttributes.Selected, 'true');
      }
      return navLink;
    };
    this.search = createElement({
      tag: 'input',
      id: Ids.SearchInput,
      classes: [CssClasses.MainMenuSearch],
    }) as HTMLInputElement;
    this.search.addEventListener('keyup', this.handleSearch);
    this.search.addEventListener('focus', this.handleSearchFocus, { once: true });
    this.modalWindow = createElement({ tag: 'modal-window' });
    this.modalWindow.addEventListener(ModalWindowEvents.Ok, this.handleModalWindowOkEvent);
    this.modalWindow.addEventListener(
      ModalWindowEvents.Cancel,
      this.handleModalWindowCancelEvent,
    );
    this.modalWindow.addEventListener(
      ModalWindowEvents.FindKittens,
      this.handleModalWindowFindKittensEvent,
    );
    const style: HTMLStyleElement = createElement({ tag: 'style' }) as HTMLStyleElement;
    style.textContent = `
    .main-menu {
      padding: 5px;
      }
    `;
    container.append(
      ...this.navLinks.map(createNavLink),
      this.search,
      this.modalWindow,
    );
    shadow.append(container, style);
  }

  attributeChangedCallback(name: DataAttributes): void {
    if (name === DataAttributes.SearchType) {
      this.updateSearchPlaceholder();
    }
  }

  connectedCallback(): void {
    if (this.searchType === null) {
      this.updateSearchPlaceholder();
    }
  }

  get searchType(): string | null {
    return this.getAttribute(DataAttributes.SearchType);
  }

  get isDefaultSearchType(): boolean {
    return this.searchType === SearchTypes.User || this.searchType === null;
  }

  handleModalWindowOkEvent = (event: Event): void => {
    event.stopPropagation();
    this.modalWindow.setAttribute(ModalWindowDataAttributes.Opened, ModalWindowStates.Closed);
  };

  handleModalWindowCancelEvent = (event: Event): void => {
    event.stopPropagation();
    this.modalWindow.setAttribute(ModalWindowDataAttributes.Opened, ModalWindowStates.Closed);
  };

  handleModalWindowFindKittensEvent = (event: Event): void => {
    event.stopPropagation();
    this.search.value = 'Kharkiv kittens';
    this.modalWindow.setAttribute(ModalWindowDataAttributes.Opened, ModalWindowStates.Closed);
  };

  handleSearchFocus = (event: Event): void => {
    event.stopPropagation();
    this.modalWindow.innerHTML = modalWindowSearchKittensHtml;
    const title: HTMLElement | null = this.modalWindow.querySelector('[slot="title"]');
    if (title) title.innerHTML = 'Cottans';
    setDataAttributes.call(
      this.modalWindow,
      {
        [ModalWindowDataAttributes.Opened]: ModalWindowStates.Opened,
        [ModalWindowDataAttributes.EventOk]: ModalWindowEvents.FindKittens,
      },
      {
        mode: SetAttributesMode.Overwrite,
      },
    );
  };

  handleSearch = (event: KeyboardEvent): void => {
    event.stopPropagation();
    if (event.code !== 'Enter') return;
    event.preventDefault();
    const target: HTMLInputElement = event.target as HTMLInputElement;
    const { value: text } = target;
    if (!text) return;
    if (text.trim().length < 2) {
      this.modalWindow.innerHTML = modalWindowSearchErrorHtml;
      setDataAttributes.call(
        this.modalWindow,
        {
          [ModalWindowDataAttributes.Opened]: ModalWindowStates.Opened,
          [ModalWindowDataAttributes.Type]: ModalWindowTypes.Error,
        },
        {
          mode: SetAttributesMode.Overwrite,
        },
      );
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
