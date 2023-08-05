<template>
  <h1 class="page-title">Most Liked Videos</h1>
  <div class="cards-wrapper" v-if="pending">
    <VideoCardLoading
      v-for="index in Array.from({ length: 30 }, (v, k) => k + 1)"
      :key="index"
    ></VideoCardLoading>
  </div>

  <div v-else class="cards-wrapper">
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
      :snapshots="video.snapshots"
      :likes="video.likesCount"
      :isVIP="video.tags.includes('643adac05767bb0f8517fec8')"
    ></VideoCard>
  </div>
  <Pagination
    v-if="!pending"
    :url="'/most-liked/'"
    :totalPages="+(+videos.totalPages).toFixed(0)"
    :currentPage="1"
  ></Pagination>
</template>

<script setup>
useHead({
  title:
    "Watch Most Liked Videos The Best Korean BJ Cam Girl Videos Online In High Quality - Skbj.TV",
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    {
      hid: "description",
      name: "description",
      content:
        "Watch The Best Korean BJ Cam Girl Videos Online In High Quality",
    },
    { name: "format-detection", content: "telephone=no" },
    { name: "referrer", content: "unsafe-url" },
    { property: "og:locale", content: "en_US" },
    { property: "og:title", content: "Skbj.TV" },
    { property: "og:site_name", content: "Skbj.TV" },
    {
      property: "og:description",
      content:
        "Skbj.TV Official Page - Watch The Best Korean BJ Cam Girl Videos Online In High Quality",
    },
    { name: "twitter:title", content: "Skbj.TV" },
    {
      name: "twitter:description",
      content:
        "Skbj.TV Official Page - Watch The Best Korean BJ Cam Girl Videos Online In High Quality",
    },
  ],
});

const videosPerPage = 100;
const { pending, data: videos } = await useLazyFetch(
  `http://localhost:3030/api/videos/most-liked?limit=30`,
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
</script>

<style scoped lang="scss">
.cards-wrapper {
  display: flex;
  flex-wrap: wrap;
}
</style>
