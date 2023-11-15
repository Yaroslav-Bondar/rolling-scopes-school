import MainHtml from '../pages/main.template.html';
import UsersHtml from '../pages/users.template.html';

type RoutingData = Record<string, string>;

const routingData: Array<RoutingData> = [
  { route: Routes.Main, page: MainHtml },
  { route: Routes.Users, page: UsersHtml },
];

const root: HTMLElement | null = document.getElementById('root');

if (!root) {
  throw new Error('No root.');
}

const getRoutingData = (path: string): RoutingData | undefined => {
  const iterate = (routeData: RoutingData): boolean => routeData.route === path;
  const data: RoutingData | undefined = routingData.find(iterate);
  return data;
};

const renderPage = (path: string): void => {
  const routeData: RoutingData | undefined = getRoutingData(path);
  if (routeData) {
    const { page } = routeData;
    root.innerHTML = page;
  } else {
    root.innerHTML = '<div>Error 404</div>';
  }
};

export const goTo = (path: string): void => {
  window.history.pushState({ path }, path, path);
  renderPage(path);
};

const initRouter = () => {
  const handleStateChange = (): void => {
    const { pathname: path } = new URL(window.location.href);
    renderPage(path);
  };
  window.addEventListener('popstate', handleStateChange);
  renderPage(new URL(window.location.href).pathname);
};

export default initRouter;
