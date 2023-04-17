<template>
  <Loading v-if="pending"></Loading>
  <div v-else>
    <h1 class="page-title">All Videos</h1>
    <span>Page: {{ route.params.pageNumber }}</span>
    <div class="cards-wrapper">
      <NuxtLink
        :to="'/videos/' + video.file_code"
        class="card-wrapper"
        v-for="(video, index) in videos.result.files"
      >
        <div class="thumnail">
          <img :src="video.thumbnail" />
        </div>
        <div class="text">
          <div class="title">{{ video.title }}</div>
        </div>
      </NuxtLink>
    </div>
    <Pagination
      :url="'/videos/'"
      :totalPages="+(+videos.result.results_total / 100).toFixed(0)"
      :currentPage="route.params.pageNumber"
    ></Pagination>
  </div>
</template>

<script setup>
useHead({
  title:
    "Watch The Best Korean BJ Cam Girl Videos Online In High Quality - Skbj.TV",
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
  `https://api.streamsb.com/api/file/list?key=66418reck8nac228fzn2j&file_code=r03s1uvc8bq0&page=${route.params.pageNumber}`,
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
  .card-wrapper {
    width: calc(16.666666% - 16px);
    margin: 8px;
    .thumnail img {
      width: 100%;
    }
  }
}
</style>
