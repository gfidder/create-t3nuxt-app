import { appRouter } from "~~/server/trpc/root";
import { createTRPCContext } from "~~/server/trpc/trpc";
import { createNuxtApiHandler } from "trpc-nuxt";

export default createNuxtApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError:
    process.env.NODE_ENV === "development"
      ? ({ path, error }) => {
          console.error(
            `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`
          );
        }
      : undefined,
});
