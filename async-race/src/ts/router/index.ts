import { Route } from '../services';
import { mainPage, postsPage, postsByUserPage, usersPage, userPage, errorPage } from '../pages';
import { Routes } from '../constants';

const routes = Object.fromEntries(
  Object.keys(Routes).map((key: string) => [key, new Route(Routes[key as keyof typeof Routes])]),
);

const routesWithPages = [
  { route: routes.Index, page: mainPage },
  { route: routes.Posts, page: postsPage },
  { route: routes.PostsByUser, page: postsByUserPage },
  { route: routes.Users, page: usersPage },
  { route: routes.User, page: userPage },
];

const root: HTMLElement | null = document.getElementById('root');

if (!root) {
  throw new Error('No root.');
}

const getRoutingData = (path: string) => {
  interface RouteWithPage {
    route: Route;
    page: Page;
  }
  const iterate = (data: RouteWithPage) => data.route.match(path);
  const data = routesWithPages.find(iterate);
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
