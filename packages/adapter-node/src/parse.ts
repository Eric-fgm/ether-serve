import type { IncomingMessage } from "node:http";

export const parseBody = (req: IncomingMessage) => () =>
  new Promise<string>((resolve, reject) => {
    if (req.method !== "POST") {
      return reject(`Bad Method: ${req.method}. Must be POST`);
    }

    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      resolve(body);
    });

    req.on("error", (err) => {
      reject(err);
    });
  });
