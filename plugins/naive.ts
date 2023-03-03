import naive from 'naive-ui'
import { darkTheme } from "naive-ui";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(naive)
  const themeOverrides = {
    common: {
      primaryColor: "#cacaca",
      primaryColorHover: "#cacaca",
    },
  };
  
  return {
    provide: {
        darkTheme: darkTheme,
        themeOverrides: themeOverrides
    }
  }
})
