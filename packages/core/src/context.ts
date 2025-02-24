import { parseJSON, parseText } from "./utils/body";
import { parseQuery } from "./utils/query";
import type { RequestMatchedRoute } from "./types";

export interface ResponseInit {
  headers: Headers;
  status: number;
  statusText?: string;
  body?: string;
}

export type State = Record<string, unknown>;
export type Params = Record<string, string | string[] | undefined>;
export type Query = Record<string, string | string[] | undefined>;
export type Body = Record<string, unknown>;
export type Result = Record<string, unknown>;

export class Context<
  S extends State = State,
  P extends Params = Params,
  Q extends Query = Query,
  B extends Body = Body,
  R extends Result = Result,
> {
  constructor(
    private request: RequestMatchedRoute,
    private response: ResponseInit = {
      status: 404,
      headers: new Headers(),
    },
    private state = {} as S
  ) {}

  get req() {
    return {
      ...this.request,
      params: <K extends keyof P | undefined = undefined>(
        key?: K
      ): K extends string ? P[K] : P => {
        if (typeof key === "string") {
          return this.request.params[key] as any;
        }
        return this.request.params as any;
      },
      query: <K extends keyof Q | undefined = undefined>(
        key?: K
      ): K extends string ? Q[K] : Q => {
        const parsedQuery = parseQuery(this.request);
        if (typeof key === "string") {
          return parsedQuery[key] as any;
        }
        return parsedQuery as any;
      },
      json: async () => {
        return (await parseJSON(this.request)) as B;
      },
      text: async () => {
        return await parseText(this.request);
      },
    };
  }

  get headers(): ResponseInit["headers"] {
    return this.response.headers;
  }

  set params(params: Params) {
    this.request.params = params;
  }

  set pathRegex(pathRegex: string) {
    this.request.pathRegex = pathRegex;
  }

  set<K extends keyof S>(key: K, value: S[K]) {
    this.state[key] = value;
  }

  get<K extends keyof S>(key: K) {
    return this.state[key];
  }

  status(code: number) {
    this.response.status = code;
    return this;
  }

  json(data: R) {
    this.response.headers.set("Content-Type", "application/json");
    this.response.body = JSON.stringify(data);
    return this;
  }

  text(data: string) {
    this.response.body = data;
    return this;
  }

  toResponse(): Response {
    return new Response(this.response.body, {
      status: this.response.status,
      statusText: this.response.statusText,
      headers: this.response.headers,
    });
  }
}
