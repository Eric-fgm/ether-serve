import type { Ether } from "./ether";
import type { Body, Context, Params, Query, Result, State } from "./context";

export type * from "./context";

export type Next = () => Promise<void>;

export type Handler<
  S extends State = State,
  P extends Params = Params,
  Q extends Query = Query,
  B extends Body = Body,
  R extends Result = Result,
> = (
  c: Context<S, P, Q, B, R>
) => Promise<Context<S, P, Q, B, R>> | Context<S, P, Q, B, R>;

export type MiddlewareHandler<
  S extends State = State,
  P extends Params = Params,
  Q extends Query = Query,
  B extends Body = Body,
> = (c: Context<S, P, Q, B>, next: Next) => void;

export type RouteHandler<
  S extends State = State,
  P extends Params = Params,
  Q extends Query = Query,
  B extends Body = Body,
> = Handler<S, P, Q, B> | MiddlewareHandler<S, P, Q, B>;

export type ErrorHandler<
  S extends State = State,
  P extends Params = Params,
  Q extends Query = Query,
  B extends Body = Body,
  R extends Result = Result,
> = (
  error: unknown,
  c: Context<S, P, Q, B, R>
) => Promise<Context<S, P, Q, B, R>> | Context<S, P, Q, B, R>;

export interface RequestHandler {
  <
    S extends State = State,
    P extends Params = Params,
    Q extends Query = Query,
    B extends Body = Body,
    R extends Result = Result,
  >(
    handler: Handler<S, P, Q, B, R>
  ): Ether;

  <
    S extends State = State,
    P extends Params = Params,
    Q extends Query = Query,
    B extends Body = Body,
    R extends Result = Result,
  >(
    path: string,
    handler: Handler<S, P, Q, B, R>
  ): Ether;

  <
    S extends State = State,
    P extends Params = Params,
    Q extends Query = Query,
    B extends Body = Body,
    S2 extends State = S,
    P2 extends Params = P,
    Q2 extends Query = Q,
    R extends Result = Result,
  >(
    path: string,
    ...handlers: [RouteHandler<S, P, Q, B>, Handler<S2, P2, Q2, B, R>]
  ): Ether;

  <
    S extends State = State,
    P extends Params = Params,
    Q extends Query = Query,
    B extends Body = Body,
    S2 extends State = S,
    P2 extends Params = P,
    Q2 extends Query = Q,
    R extends Result = Result,
  >(
    ...handlers: [RouteHandler<S, P, Q, B>, Handler<S2, P2, Q2, B, R>]
  ): Ether;

  <
    S extends State = State,
    P extends Params = Params,
    Q extends Query = Query,
    B extends Body = Body,
    S2 extends State = S,
    P2 extends Params = P,
    Q2 extends Query = Q,
    S3 extends State = S & S2,
    P3 extends Params = P & P2,
    Q3 extends Query = Q & Q2,
    R extends Result = Result,
  >(
    path: string,
    ...handlers: [
      RouteHandler<S, P, Q, B>,
      RouteHandler<S2, P2, Q2, B>,
      Handler<S3, P3, Q3, B, R>,
    ]
  ): Ether;

  <
    S extends State = State,
    P extends Params = Params,
    Q extends Query = Query,
    B extends Body = Body,
    S2 extends State = S,
    P2 extends Params = P,
    Q2 extends Query = Q,
    S3 extends State = S & S2,
    P3 extends Params = P & P2,
    Q3 extends Query = Q & Q2,
    R extends Result = Result,
  >(
    ...handlers: [
      RouteHandler<S, P, Q, B>,
      RouteHandler<S2, P2, Q2, B>,
      Handler<S3, P3, Q3, B, R>,
    ]
  ): Ether;
}

export interface RequestMiddlewareHandler {
  <
    S extends State = State,
    P extends Params = Params,
    Q extends Query = Query,
    B extends Body = Body,
  >(
    handler: MiddlewareHandler<S, P, Q, B>
  ): Ether;

  <
    S extends State = State,
    P extends Params = Params,
    Q extends Query = Query,
    B extends Body = Body,
  >(
    path: string,
    handler: MiddlewareHandler<S, P, Q, B>
  ): Ether;

  <
    S extends State = State,
    P extends Params = Params,
    Q extends Query = Query,
    B extends Body = Body,
    S2 extends State = S,
    P2 extends Params = P,
    Q2 extends Query = Q,
  >(
    path: string,
    ...handlers: [
      MiddlewareHandler<S, P, Q, B>,
      MiddlewareHandler<S2, P2, Q2, B>,
    ]
  ): Ether;

  <
    S extends State = State,
    P extends Params = Params,
    Q extends Query = Query,
    B extends Body = Body,
    S2 extends State = S,
    P2 extends Params = P,
    Q2 extends Query = Q,
  >(
    ...handlers: [
      MiddlewareHandler<S, P, Q, B>,
      MiddlewareHandler<S2, P2, Q2, B>,
    ]
  ): Ether;

  <
    S extends State = State,
    P extends Params = Params,
    Q extends Query = Query,
    B extends Body = Body,
    S2 extends State = S,
    P2 extends Params = P,
    Q2 extends Query = Q,
    S3 extends State = S & S2,
    P3 extends Params = P & P2,
    Q3 extends Query = Q & Q2,
  >(
    path: string,
    ...handlers: [
      MiddlewareHandler<S, P, Q, B>,
      MiddlewareHandler<S2, P2, Q2, B>,
      MiddlewareHandler<S3, P3, Q3, B>,
    ]
  ): Ether;

  <
    S extends State = State,
    P extends Params = Params,
    Q extends Query = Query,
    B extends Body = Body,
    S2 extends State = S,
    P2 extends Params = P,
    Q2 extends Query = Q,
    S3 extends State = S & S2,
    P3 extends Params = P & P2,
    Q3 extends Query = Q & Q2,
  >(
    ...handlers: [
      MiddlewareHandler<S, P, Q, B>,
      MiddlewareHandler<S2, P2, Q2, B>,
      MiddlewareHandler<S3, P3, Q3, B>,
    ]
  ): Ether;
}

export interface RouterRoute {
  method: string;
  pathRegex: string;
  handler: RouteHandler;
}

export interface RouterMatchedRoute extends RouterRoute {
  params: Params;
}

export interface Router {
  routes: RouterRoute[];
  add: (route: RouterRoute) => void;
  match: (payload: {
    method: string;
    pathname: string;
  }) => RouterMatchedRoute[];
}

export interface RequestRoute {
  protocol: string;
  url: string;
  path: string;
  pathname: string;
  query: string;
  method: string;
  headers: Record<string, string | string[] | undefined>;
  body: () => Promise<string>;
}

export interface RequestMatchedRoute extends RequestRoute {
  pathRegex: string;
  params: Record<string, string | string[] | undefined>;
}
