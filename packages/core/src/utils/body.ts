import { RequestRoute } from "../types";

export const parseBody = async (requestRoute: RequestRoute) => {
  if (requestRoute.method !== "POST") {
    throw new Error(`Bad Method: ${requestRoute.method}. Must be POST`);
  }
  return await requestRoute.body();
};

export const parseJSON = async (requestRoute: RequestRoute) => {
  if (requestRoute.headers["content-type"] !== "application/json") {
    return {};
  }

  try {
    const rawBody = await parseBody(requestRoute);
    return JSON.parse(rawBody) as Record<string, unknown>;
  } catch (error) {
    console.log(error);
    return {};
  }
};

export const parseText = parseBody;
