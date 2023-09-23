import MainHtml from '../pages/main.template.html';
import UsersHtml from '../pages/users.template.html';

interface RoutingData {
  [key: string]: string;
}

const routingData: Array<RoutingData> = [
  { route: Routes.Main, page: MainHtml },
  { route: Routes.Users, page: UsersHtml },
];

function getRoutingData(path: string): RoutingData | undefined {
  const iterate = (routeData: RoutingData): boolean => routeData.route === path;
  const data: RoutingData | undefined = routingData.find(iterate);
  return data;
}

function renderPage(path: string): void {
  const routeData: RoutingData | undefined = getRoutingData(path);
  if (routeData) {
    const { page } = routeData;
    document.body.innerHTML = page;
  } else {
    document.body.innerHTML = '<div>Error 404</div>';
  }
}

export function goTo(path: string): void {
  window.history.pushState({ path }, path, path);
  renderPage(path);
}

function initRouter() {
  const handleStateChange = (): void => {
    const { pathname: path } = new URL(window.location.href);
    renderPage(path);
  };
  window.addEventListener('popstate', handleStateChange);
  renderPage(new URL(window.location.href).pathname);
}

export default initRouter;
