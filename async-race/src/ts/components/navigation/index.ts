import { Component } from '../component';
import { goTo, routes } from '../../router/index';
import modalWindowSearchErrorHtml from './html/modalWindowSearchError.html';
import modalWindowSearchKittensHtml from './html/modalWindowSearchKittens.html';
import { createElement, setDataAttributes } from '../../services';
import { Routes } from '../../constants';

const enum Ids {
  SearchInput = 'search-input',
}

const enum CssClasses {
  MainMenu = 'main-menu',
  MainMenuLink = 'main-menu__link',
  MainMenuSearch = 'main-menu__search',
}

const enum DataAttributes {
  SearchType = 'data-search-type',
}

interface NavLink {
  readonly href: string;
  readonly text: string;
  readonly class: CssClasses;
}

class NavigationComponent extends Component {
  private readonly navLinks: ReadonlyArray<NavLink> = [
    {
      href: Routes.Index,
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

  private readonly defaultSearchType: SearchTypes = SearchTypes.User;

  constructor() {
    super();
    const container = createElement({ classes: [CssClasses.MainMenu] });
    const createNavLink = (data: NavLink) => {
      const navLink = createElement({ tag: 'x-nav-link' });
      navLink.setAttribute(NavLinkDataAttributes.Text, data.text);
      navLink.setAttribute('href', data.href);
      navLink.setAttribute('class', data.class);
      const { pathname: path } = new URL(window.location.href);
      if (path === data.href) {
        navLink.setAttribute(NavLinkDataAttributes.Selected, 'true');
      }
      return navLink;
    };
    const search = createElement({
      tag: 'input',
      id: Ids.SearchInput,
      classes: [CssClasses.MainMenuSearch],
    });
    search.addEventListener('keyup', this.handleSearch.bind(this));
    search.addEventListener('focus', this.handleSearchFocus.bind(this), { once: true });
    const modalWindow = createElement({ tag: 'x-modal-window' });
    modalWindow.addEventListener(ModalWindowEvents.Ok, this.closeModalWindow.bind(this));
    modalWindow.addEventListener(ModalWindowEvents.Cancel, this.closeModalWindow.bind(this));
    modalWindow.addEventListener(
      ModalWindowEvents.FindKittens,
      this.handleModalWindowFindKittensEvent.bind(this),
    );
    const style = createElement({ tag: 'style' });
    style.textContent = `
    .main-menu {
      padding: 5px;
      }
    `;
    container.append(...this.navLinks.map(createNavLink), search, modalWindow);
    this.shadowDom.append(container, style);
  }

  static get observedAttributes(): string[] {
    return [DataAttributes.SearchType];
  }

  attributeChangedCallback(name: DataAttributes): void {
    if (name === DataAttributes.SearchType) {
      this.updateSearchPlaceholder(this.searchType);
    }
  }

  connectedCallback(): void {
    if (this.searchType === null) {
      this.updateSearchPlaceholder(this.searchType);
    }
  }

  get searchType(): string | null {
    return this.getAttribute(DataAttributes.SearchType);
  }

  private isDefaultSearchType(type: string | null): boolean {
    return type === this.defaultSearchType || type === null;
  }

  private closeModalWindow(event: Event): void {
    event.stopPropagation();
    this.getElement()('x-modal-window').setAttribute(
      ModalWindowDataAttributes.Opened,
      ModalWindowStates.Closed,
    );
  }

  private handleModalWindowFindKittensEvent(event: Event): void {
    const search = this.getElement<'input'>()(`#${Ids.SearchInput}`);
    search.value = 'Kharkiv kittens';
    this.closeModalWindow(event);
  }

  private handleSearchFocus(event: Event): void {
    event.stopPropagation();
    const modalWindow = this.getElement()('x-modal-window');
    modalWindow.innerHTML = modalWindowSearchKittensHtml;
    setDataAttributes.call(
      modalWindow,
      {
        [ModalWindowDataAttributes.Opened]: ModalWindowStates.Opened,
        [ModalWindowDataAttributes.EventOk]: ModalWindowEvents.FindKittens,
      },
      {
        mode: SetAttributesMode.Overwrite,
      },
    );
  }

  private handleSearch(event: KeyboardEvent): void {
    event.stopPropagation();
    if (event.code !== 'Enter') return;
    event.preventDefault();
    const target: HTMLInputElement = event.target as HTMLInputElement;
    const { value: text } = target;
    if (!text) return;
    if (text.trim().length < 2) {
      const modalWindow = this.getElement()('x-modal-window');
      modalWindow.innerHTML = modalWindowSearchErrorHtml;
      setDataAttributes.call(
        modalWindow,
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
    if (this.isDefaultSearchType(this.searchType)) {
      const route = routes.usersSearch.reverse({ query: text });
      const path = route || (routes.error.reverse({ code: 404 }) as string);
      goTo(path);
    } else if (this.searchType === SearchTypes.Post) {
      const route = routes.postsSearch.reverse({ query: text });
      const path = route || (routes.error.reverse({ code: 404 }) as string);
      goTo(path);
    }
  }

  private updateSearchPlaceholder(type: string | null) {
    const search = this.getElement<'input'>()(`#${Ids.SearchInput}`);
    if (this.isDefaultSearchType(type)) {
      search.setAttribute('placeholder', 'Search user...');
    } else if (type === SearchTypes.Post) {
      search.setAttribute('placeholder', 'Search post...');
    } else {
      throw new Error('Wrong search type.');
    }
  }
}

customElements.define('x-navigation', NavigationComponent);
