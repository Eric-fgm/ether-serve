import type { RequestRoute } from "../types";

export const parseQuery = (
  requestRoute: RequestRoute
): Record<string, string | string[]> => {
  const searchParams = new URLSearchParams(requestRoute.query);

  return Object.fromEntries(searchParams.entries());
};
