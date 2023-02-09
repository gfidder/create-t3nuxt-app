import { createTRPCNuxtClient, httpBatchLink } from "trpc-nuxt/client";
import superjson from "superjson";
import type { AppRouter } from "~~/server/trpc/root";

export default defineNuxtPlugin(() => {
  const client = createTRPCNuxtClient<AppRouter>({
    transformer: superjson,
    links: [
      httpBatchLink({
        url: "/api/trpc",
      }),
    ],
  });

  return {
    provide: {
      client,
    },
  };
});
