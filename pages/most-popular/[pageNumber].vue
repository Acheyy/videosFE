<template>
  <h1 class="page-title">Most Popular Videos</h1>
  <span>Page: {{ route.params.pageNumber }}</span>
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
      :uploadID="video.videoId.uploadID"
      :thumbnail="video.videoId.thumbnail"
      :duration="video.videoId.duration"
      :name="video.videoId.name"
      :date="video.videoId.createdAt"
      :actor="video.videoId.actor"
      :category="video.videoId.category"
      :views="video.videoId.views"
      :likes="video.videoId.likes.length"
      :snapshots="video.videoId.snapshots"
      :cost="video.cost"
      :isVIP="video.videoId.tags.includes('643adac05767bb0f8517fec8')"
    ></VideoCard>
  </div>
  <Pagination
    v-if="!pending"
    :url="'/most-popular/'"
    :totalPages="+(+videos.totalPages).toFixed(0)"
    :currentPage="+route.params.pageNumber"
  ></Pagination>
</template>

<script setup>
useHead({
  title:
    "Watch Most Popular Videos The Best Korean BJ Cam Girl Videos Online In High Quality - Skbj.TV",
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

const route = useRoute();

const videosPerPage = 100;
const { pending, data: videos } = await useLazyFetch(
  `http://localhost:3030/api/videos/most-popular?limit=30&page=${route.params.pageNumber}`,
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
    server: false,
  }
);
</script>

<style scoped lang="scss">
.cards-wrapper {
  display: flex;
  flex-wrap: wrap;
}
</style>
