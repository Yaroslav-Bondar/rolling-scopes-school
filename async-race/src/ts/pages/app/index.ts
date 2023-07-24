import Page from '../../core/templates/page';
import Garage from '../garage';
import Winners from '../winners';
import Error from '../error';
import Header from '../../core/components/header';
import Routes from '../../constants/routes';
import ErrorTypes from '../../constants/errorTypes';
import CssClassNames from '../../constants/cssClassNames';

class App {
  private static defaultPageId: string = 'current-page';

  private container: HTMLElement = document.body;

  private header: Header = new Header('header', CssClassNames.Header);

  protected renderPage(route: string): void {
    const currentPage: HTMLElement | null = document.getElementById(`${App.defaultPageId}`);
    if (currentPage) {
      currentPage.remove();
    }

    let page: Page | null = null;

    if (route === Routes.Garage) {
      page = new Garage();
    } else if (route === Routes.Winners) {
      page = new Winners();
    } else {
      page = new Error(ErrorTypes.Error_404);
    }

    if (page) {
      const pageHtml: HTMLElement = page.getPageHtml();
      pageHtml.id = App.defaultPageId;
      this.container.append(pageHtml);
    }
  }

  private initRouter() {
    const handleStateChange = (): void => {
      const { pathname: path } = window.location;
      this.renderPage(path);
    };

    window.addEventListener('popstate', handleStateChange);

    const links = document.querySelectorAll(`.${CssClassNames.HeaderNavLink}`);

    const handleNavLinkClick = (event: Event): void => {
      event.preventDefault();
      const target: HTMLAnchorElement = event.target as HTMLAnchorElement;
      const { pathname: path } = new URL(target.href);
      window.history.pushState({ path }, path, path);
      this.renderPage(path);
    };

    const iterateLinks = (link: Element): void => link.addEventListener('click', handleNavLinkClick);

    links.forEach(iterateLinks);

    this.renderPage(Routes.Garage);
  }

  public run(): void {
    this.container.append(this.header.getComponentHtml());
    this.initRouter();
  }
}

export default App;
