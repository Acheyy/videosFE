// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/css/_colors.scss" as *; @use "vue3-toastify/dist/index.css" as *;',
        },
      },
    },
  },
  css: ["@/assets/css/_reset.scss", "@/assets/css/_main.scss"],
  modules: ["@pinia/nuxt"],
});
