
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
TimeAgo.addDefaultLocale(en);

export default defineNuxtPlugin(() => {
    const timeAgo = new TimeAgo("en-US");

    return {
      provide: {
        timeAgo: timeAgo
      }
    }
  })
  