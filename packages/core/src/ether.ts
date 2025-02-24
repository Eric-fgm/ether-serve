import { Context } from "./context";
import { METHOD_MIDDLEWARE_WILDCARD } from "./utils/constants";
import type {
  Router,
  RouteHandler,
  MiddlewareHandler,
  RequestHandler,
  RequestMiddlewareHandler,
  RequestRoute,
  ErrorHandler,
} from "./types";

export class Ether {
  constructor(
    private basePath: string,
    private router: Router,
    private errorHandler: ErrorHandler = (_, c) => c.status(500)
  ) {}

  on(method: string, path: string, handler: RouteHandler) {
    this.router.add({
      method,
      pathRegex: `${this.basePath}${path}`,
      handler,
    });
    return this;
  }

  use: RequestMiddlewareHandler = (
    path: string | MiddlewareHandler,
    ...handlers: MiddlewareHandler[]
  ) => {
    if (typeof path === "function") {
      return this.on(METHOD_MIDDLEWARE_WILDCARD, "*__path__", path);
    }
    handlers.forEach((handler) =>
      this.on(METHOD_MIDDLEWARE_WILDCARD, `${path}/*__path__`, handler)
    );
    return this;
  };

  get: RequestHandler = (
    path: string | RouteHandler,
    ...handlers: RouteHandler[]
  ) => {
    if (typeof path === "function") {
      return this.on("GET", "/", path);
    }
    handlers.forEach((handler) => this.on("GET", path, handler));
    return this;
  };

  post: RequestHandler = (
    path: string | RouteHandler,
    ...handlers: RouteHandler[]
  ) => {
    if (typeof path === "function") {
      return this.on("POST", "/", path);
    }
    handlers.forEach((handler) => this.on("POST", path, handler));
    return this;
  };

  put: RequestHandler = (
    path: string | RouteHandler,
    ...handlers: RouteHandler[]
  ) => {
    if (typeof path === "function") {
      return this.on("PUT", "/", path);
    }
    handlers.forEach((handler) => this.on("PUT", path, handler));
    return this;
  };

  delete: RequestHandler = (
    path: string | RouteHandler,
    ...handlers: RouteHandler[]
  ) => {
    if (typeof path === "function") {
      return this.on("DELETE", "/", path);
    }
    handlers.forEach((handler) => this.on("DELETE", path, handler));
    return this;
  };

  group(app: Ether): this;
  group(path: string, app: Ether): this;
  group(_path: string | Ether, _app?: Ether) {
    const app = typeof _path === "string" ? _app! : _path;
    const path = typeof _path === "string" ? _path : "";

    app.router.routes.forEach((route) => {
      this.router.add({
        ...route,
        pathRegex: `${this.basePath}${path}${route.pathRegex}`,
      });
    });
    return this;
  }

  onError(errorHandler: ErrorHandler): this {
    this.errorHandler = errorHandler;
    return this;
  }

  async fetch(request: RequestRoute): Promise<Response> {
    const routes = this.router.match({
      method: request.method,
      pathname: request.pathname,
    });

    const context = new Context({
      ...request,
      params: {},
      pathRegex: "",
    });

    let currentIndex = -1;

    async function dispatch(index = 0) {
      if (index <= currentIndex) {
        throw new Error("next() called multiple times");
      }
      currentIndex = index;

      const route = routes[index];
      if (!route) {
        return;
      }

      const { pathRegex, params, method, handler } = route;
      context.pathRegex = pathRegex;
      context.params = params;
      if (method === METHOD_MIDDLEWARE_WILDCARD) {
        await handler(context, async () => {
          await dispatch(index + 1);
          context.pathRegex = pathRegex;
          context.params = params;
        });
      } else {
        await handler(context, async () => {});
        await dispatch(index + 1);
      }
    }

    try {
      await dispatch();
      if (currentIndex !== routes.length) {
        throw new Error("Did you forget to run `await next()`?");
      }
    } catch (error) {
      console.error(error);
      await this.errorHandler(error, context);
    }

    return context.toResponse();
  }
}
