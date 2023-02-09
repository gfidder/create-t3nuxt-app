/**
 * CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 */
import type { inferAsyncReturnType } from "@trpc/server";

/**
 * Creates context for an incoming request
 *
 * @link https://trpc.io/docs/context
 */
export const createContext = () => {
  return {};
};

export type Context = inferAsyncReturnType<typeof createContext>;
