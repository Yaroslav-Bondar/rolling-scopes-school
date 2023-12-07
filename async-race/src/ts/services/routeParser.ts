// Work with routes. It's based on this route parser library -
// https://github.com/rcs/route-parser.
// This library can be used in more complex cases.
export class Route {
  private prefix = ':';

  private separator = '/';

  private route: string;

  // TODO: check the given route
  constructor(route: string) {
    this.route = route;
  }

  get path(): string {
    return this.route;
  }

  // Capture named parameters.
  match(str: string): Record<string, string | number> | false {
    const NO_MATCH: false = false;
    if (typeof str !== 'string') {
      return NO_MATCH;
    }
    const { separator, route } = this;
    const cut = (s: string) => s !== '';
    const splitRoute = route.split(separator).filter(cut);
    const splitStr = str.split(separator).filter(cut);
    if (splitRoute.length !== splitStr.length) {
      return NO_MATCH;
    }
    const { prefix } = this;
    const res: Record<string, string | number> = {};
    for (let i = 0; i < splitRoute.length; i += 1) {
      const routeItem = splitRoute[i];
      const strItem = splitStr[i];
      const routePrefix = splitRoute[i].slice(0, prefix.length);
      if (routeItem !== strItem && routePrefix !== prefix) {
        return NO_MATCH;
      }
      if (routePrefix === prefix) {
        res[routeItem.slice(prefix.length)] = strItem;
      }
    }
    return res;
  }

  // Generate link.
  reverse(data: Record<string, string | number>): string | false {
    let { route } = this;
    const match = route.match(/:\w+/g) || [];
    if (!match.length) {
      return route;
    }
    const { prefix } = this;
    for (const value of match) {
      if (!Object.hasOwn(data, value.slice(prefix.length))) {
        return false;
      }
    }
    const keys = Object.keys(data);
    const make = (key: string) => {
      const regExp = new RegExp(prefix + key, 'g');
      route = route.replace(regExp, () => String(data[key]).toLowerCase());
    };
    keys.forEach(make);
    return route;
  }
}
