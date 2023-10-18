/*
 * This maps the necessary packages to a version.
 * This improves performance significantly over fetching it from the npm registry.
 */
export const dependencyVersionMap = {
  // NextAuth.js
  "@sidebase/nuxt-auth": "^0.5.0",
  "next-auth": "4.21.1",
  "@next-auth/prisma-adapter": "^1.0.5",

  // Prisma
  prisma: "^5.4.2",
  "@prisma/client": "^5.4.2",

  // TailwindCSS
  tailwindcss: "^3.2.0",
  autoprefixer: "^10.4.7",
  postcss: "^8.4.14",
  prettier: "^3.0.1",
  "prettier-plugin-tailwindcss": "^0.2.1",
  "@types/prettier": "^2.7.2",
  "@nuxtjs/tailwindcss": "^6.3.1",

  // tRPC
  "@trpc/client": "^10.9.0",
  "@trpc/server": "^10.9.0",
  "trpc-nuxt": "^0.10.12",
  superjson: "^2.0.0",
  zod: "^3.20.2",
} as const;
export type AvailableDependencies = keyof typeof dependencyVersionMap;
