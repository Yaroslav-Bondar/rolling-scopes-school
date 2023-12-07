import { Route } from '../services/routeParser';
import { mainPage } from '../pages/main.template';
import { usersPage } from '../pages/users.template';
import { postsPage } from '../pages/posts.template';
import { errorPage } from '../pages/error.template';

interface RoutingData {
  route: Route;
  page: Page;
}

const routeData = [
  { id: 'index', path: '/', page: mainPage },
  { id: 'posts', path: '/posts', page: postsPage },
  { id: 'postsSearch', path: '/posts/query/:query', page: postsPage },
  { id: 'users', path: '/users', page: usersPage },
  { id: 'usersSearch', path: '/users/query/:query', page: usersPage },
  { id: 'error', path: '/error/:code', page: errorPage },
];

const root: HTMLElement | null = document.getElementById('root');

if (!root) {
  throw new Error('No root.');
}

const routingData = routeData.map(({ id, path, page }) => ({ id, route: new Route(path), page }));

const routes = Object.fromEntries(routingData.map(({ id, route }) => [id, route]));

const getRoutingData = (path: string) => {
  const iterate = (data: RoutingData) => data.route.match(path);
  const data = routingData.find(iterate);
  if (!data) {
    return false;
  }
  return {
    page: data.page,
    props: data.route.match(path),
  };
};

const render = (path: string): void => {
  const data = getRoutingData(path);
  if (!data) {
    root.innerHTML = errorPage({ code: 404 });
    return;
  }
  const { page, props } = data;
  root.innerHTML = page(props || {});
};

const goTo = (path: string): void => {
  window.history.pushState({ path }, path, path);
  render(path);
};

const initRouter = () => {
  const handleStateChange = (): void => {
    const { pathname: path } = new URL(window.location.href);
    render(path);
  };
  window.addEventListener('popstate', handleStateChange);
  render(new URL(window.location.href).pathname);
};

export { initRouter, goTo, routes };
