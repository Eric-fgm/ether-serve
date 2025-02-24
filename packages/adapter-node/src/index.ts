import http, { type ServerOptions } from "node:http";
import { getRequestRoute } from "./request";
import { Ether, RegexRouter, type RequestRoute } from "@ether-serve/core";

export * from "@ether-serve/core";

export const ether = (basePath = "") => new Ether(basePath, new RegexRouter());

export const serve = (
  options: {
    fetch: (request: RequestRoute) => Promise<Response>;
    port?: number;
  } & ServerOptions
) => {
  const { fetch, port = 8080, ...restOptions } = options;

  const server = http.createServer(restOptions, async (req, res) => {
    const requestRoute = getRequestRoute(req);
    const response = await fetch(requestRoute);

    response.headers.forEach((value, key) => {
      res.appendHeader(key, value);
    });
    res.writeHead(response.status);
    res.end(await response.text());
  });

  server.listen(port);
};
