import MainHtml from '../pages/main.template.html';
import GarageHtml from '../pages/garage.template.html';

interface RoutingData {
  [key: string]: string;
}

const routingData: Array<RoutingData> = [
  { route: Routes.Main, page: MainHtml },
  { route: Routes.Garage, page: GarageHtml },
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
    const { pathname: path } = window.location;
    renderPage(path);
  };

  window.addEventListener('popstate', handleStateChange);

  renderPage(window.location.pathname);
}

export default initRouter;
