// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // app: {
  //   head: {
  //     script: [
  //       {
  //         src: "https://www.paypal.com/sdk/js?client-id=AXi3Eewhkikq_uKTNV0PpY8lz2P1zX0l5hRRbJOsJnSxMYakeNeDX6fVYHiwev4QR11qeZDftSXPmjzW", // Replace YOUR_CLIENT_ID with your actual client ID
  //         defer: true,
  //       },
  //     ],
  //   },
  // },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData:
            '@use "@/assets/css/_colors.scss" as *; @use "vue3-toastify/dist/index.css" as *;',
        },
      },
    },
  },
  css: ["@/assets/css/_reset.scss", "@/assets/css/_main.scss"],
  modules: ["@pinia/nuxt", '@nuxt/image-edge'],
});
