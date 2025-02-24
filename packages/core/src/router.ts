import { match } from "path-to-regexp";
import { METHOD_MIDDLEWARE_WILDCARD } from "./utils/constants";
import type { Router, RouterMatchedRoute, RouterRoute } from "./types";

export class RegexRouter implements Router {
  private _routes: RouterRoute[] = [];

  get routes() {
    return this._routes;
  }

  add(route: RouterRoute) {
    this.routes.push(route);
  }

  match(payload: { method: string; pathname: string }) {
    const matchedRoutes: RouterMatchedRoute[] = [];
    this._routes.forEach((route) => {
      if (
        route.method !== METHOD_MIDDLEWARE_WILDCARD &&
        route.method !== payload.method
      ) {
        return;
      }
      const matchedRoute = match(route.pathRegex)(payload.pathname);
      if (matchedRoute) {
        matchedRoutes.push({
          ...route,
          params: matchedRoute.params,
        });
      }
    });
    return matchedRoutes;
  }
}
