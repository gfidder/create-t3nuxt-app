import type { AppRouter } from "~~/server/trpc/root";
import superjson from "superjson";
import { createTRPCNuxtClient, httpBatchLink } from "trpc-nuxt/client";

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
