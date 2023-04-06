<template>
  <Loading v-if="pending || pendingRandom || pendingFantrie || pendingTwitch"></Loading>
  <div v-else>
    <div class="cards-title">Most Recent:</div>
    <div class="cards-wrapper">
      <VideoCard
        v-for="(video, index) in videos.videos"
        :key="index"
        :uploadID="video.uploadID"
        :thumbnail="video.thumbnail"
        :duration="video.duration"
        :name="video.name"
        :date="video.createdAt"
        :actor="video.actor"
        :category="video.category"
        :views="video.views"
      ></VideoCard>
    </div>
    <div class="cards-title margin-top">Fantrie:</div>
    <div class="cards-wrapper">
      <VideoCard
        v-for="(video, index) in videosFantrie.videos"
        :key="index"
        :uploadID="video.uploadID"
        :thumbnail="video.thumbnail"
        :duration="video.duration"
        :name="video.name"
        :date="video.createdAt"
        :actor="video.actor"
        :category="video.category"
        :views="video.views"
      ></VideoCard>
    </div>
    <div class="cards-title margin-top">Twitch:</div>
    <div class="cards-wrapper">
      <VideoCard
        v-for="(video, index) in videosTwitch.videos"
        :key="index"
        :uploadID="video.uploadID"
        :thumbnail="video.thumbnail"
        :duration="video.duration"
        :name="video.name"
        :date="video.createdAt"
        :actor="video.actor"
        :category="video.category"
        :views="video.views"
      ></VideoCard>
    </div>
    <div class="cards-title margin-top">Random:</div>
    <div class="cards-wrapper">
      <VideoCard
        v-for="(video, index) in videosRandom"
        :key="index"
        :uploadID="video.uploadID"
        :thumbnail="video.thumbnail"
        :duration="video.duration"
        :name="video.name"
        :date="video.createdAt"
        :actor="video.actor"
        :category="video.category"
        :views="video.views"
      ></VideoCard>
    </div>
  </div>
</template>

<script setup>
import { toast } from "vue3-toastify";

useHead({
  title: "Watch The Best Korean BJ Cam Girl Videos Online In High Quality - Skbj.TV",
  meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Watch The Best Korean BJ Cam Girl Videos Online In High Quality" },
      { name: "format-detection", content: "telephone=no" },
      { name: "referrer", content: "unsafe-url" },
      { property: "og:locale", content: "en_US" },
      { property: "og:title", content: "Watch The Best Korean BJ Cam Girl Videos Online In High Quality - Skbj.TV" },
      {
        property: "og:image",
        hid: "og:image",
        content: `http://localhost:3030/images/seo-image.jpg`,
      },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: `SKBJ Logo`,
      },
      { property: "og:site_name", content: "Skbj.TV" },
      { property: "og:description", content: "Skbj.TV Official Page - Watch The Best Korean BJ Cam Girl Videos Online In High Quality" },
      { name: "twitter:title", content: "Watch The Best Korean BJ Cam Girl Videos Online In High Quality - Skbj.TV" },
      { name: "twitter:description", content: "Skbj.TV Official Page - Watch The Best Korean BJ Cam Girl Videos Online In High Quality" },
      { name: "twitter:image", content: `http://localhost:3030/images/seo-image.jpg` },

    ],
})

const { pending, data: videos } = await useLazyFetch(
  `http://localhost:3030/api/videos`,
  {
    onResponseError() {
      toast("There was an error! Click here to refresh the data!", {
        theme: "dark",
        type: "error",
        autoClose: false,
        toastClassName: "custom-wrapper error",
        closeOnClick: false,
      });
    },
    server: true,
  }
);
const { pending: pendingRandom, data: videosRandom } = await useLazyFetch(
  `http://localhost:3030/api/videos/random`,
  {
    server: true,
  }
);
const { pending: pendingFantrie, data: videosFantrie } = await useLazyFetch(
  `http://localhost:3030/api/videos/getVideosByCategory?category=fantrie`,
  {
    server: true,
  }
);
const { pending: pendingTwitch, data: videosTwitch } = await useLazyFetch(
  `http://localhost:3030/api/videos/getVideosByCategory?category=twitch`,
  {
    server: true,
  }
);
</script>

<style scoped lang="scss">
.cards-wrapper {
  display: flex;
  flex-wrap: wrap;
}

.margin-top {
  margin-top: 40px;
}
.cards-title {
  font-size: 24px;
}
</style>
