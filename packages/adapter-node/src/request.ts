import { parseBody } from "./parse";
import type { IncomingMessage } from "node:http";
import type { RequestRoute } from "@ether-serve/core";

export const getProtocol = (req: IncomingMessage) => {
  const proto = (req.connection as any).encrypted ? "https" : "http";

  // Note: X-Forwarded-Proto is normally only ever a
  //       single value, but this is to be safe.
  const header = (req.headers["X-Forwarded-Proto"] || proto) as string;
  const index = header.indexOf(",");

  return index !== -1 ? header.substring(0, index).trim() : header.trim();
};

export const getRequestRoute = (req: IncomingMessage): RequestRoute => {
  if (!req.url || !req.method) {
    throw new Error("Wrong IncomingMessage");
  }

  const protocol = getProtocol(req);
  const url = new URL(`${protocol}://${req.headers.host}${req.url}`);

  return {
    protocol: getProtocol(req),
    url: url.toString(),
    path: req.url,
    pathname: url.pathname,
    query: url.search,
    method: req.method,
    headers: req.headers,
    body: parseBody(req),
  };
};
