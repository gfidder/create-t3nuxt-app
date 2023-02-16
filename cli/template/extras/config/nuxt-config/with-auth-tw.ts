import eslintPlugin from "vite-plugin-eslint";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@sidebase/nuxt-auth"],
  typescript: {
    shim: false,
  },
  vite: {
    plugins: [eslintPlugin()],
  },
  tailwindcss: {
    cssPath: "~/assets/global.css",
  },
});
