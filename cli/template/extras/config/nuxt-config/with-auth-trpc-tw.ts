import eslintPlugin from "vite-plugin-eslint";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@sidebase/nuxt-auth"],
  css: ["~/assets/global.css"],
  typescript: {
    shim: false,
  },
  build: {
    transpile: ["trpc-nuxt"],
  },
  vite: {
    plugins: [eslintPlugin()],
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
