/*
 * This maps the necessary packages to a version.
 * This improves performance significantly over fetching it from the npm registry.
 */
export const dependencyVersionMap = {
  // NextAuth.js
  "@sidebase/nuxt-auth": "^0.4.1",
  "next-auth": "4.18.8",
  "@next-auth/prisma-adapter": "^1.0.5",

  // Prisma
  prisma: "^4.9.0",
  "@prisma/client": "^4.9.0",

  // TailwindCSS
  tailwindcss: "^3.2.0",
  autoprefixer: "^10.4.7",
  postcss: "^8.4.14",
  prettier: "^2.8.1",
  "prettier-plugin-tailwindcss": "^0.2.1",
  "@types/prettier": "^2.7.2",
  "@nuxtjs/tailwindcss": "^6.3.1",

  // tRPC
  "@trpc/client": "^10.9.0",
  "@trpc/server": "^10.9.0",
  "trpc-nuxt": "^0.5.0",
  superjson: "^1.12.2",
  zod: "^3.20.2",
} as const;
export type AvailableDependencies = keyof typeof dependencyVersionMap;
