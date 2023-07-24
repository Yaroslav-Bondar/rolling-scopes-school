import Component from '../../templates/component';
import createElement from '../../../services/createElement';
import CssClassNames from '../../../constants/cssClassNames';
import Routes from '../../../constants/routes';

interface NavLink {
  route: Routes;
  text: string;
}

const navLinksData: NavLink[] = [
  {
    route: Routes.Garage,
    text: 'Garage',
  },
  {
    route: Routes.Winners,
    text: 'Winners',
  },
];

class Header extends Component {
  static createNavLinks(): HTMLElement {
    const container: HTMLElement = createElement({ tag: 'nav', classes: [CssClassNames.HeaderNavLinks] });

    function initializeNavLinks(link: NavLink): void {
      const navLinkContainer: HTMLElement = createElement({
        tag: 'li',
        classes: [CssClassNames.HeaderNavLinkContainer, CssClassNames.LinkContainer],
      });

      const navLink: HTMLAnchorElement = createElement({ tag: 'a', classes: [CssClassNames.HeaderNavLink] }) as HTMLAnchorElement;
      navLink.innerText = link.text;
      navLink.href = `${link.route}`;

      navLinkContainer.append(navLink);

      container.append(navLinkContainer);
    }

    navLinksData.forEach(initializeNavLinks);

    return container;
  }

  constructor(htmlTag: string, cssClass: string) {
    super(htmlTag, cssClass);
    this.container.append(Header.createNavLinks());
  }
}

export default Header;
