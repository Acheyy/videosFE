<template>
    <Loading v-if="pending"></Loading>
    <div v-else>
      <h1 class="page-title">
        <span class="strong"> {{ route.params.categoryName }} </span> Videos
      </h1>
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
          :likes="video.likes?.length"
          :snapshots="video.snapshots"
        ></VideoCard>
      </div>
      <Pagination
        v-if="+videos.totalPages > 1"
        :url="'/all-categories/' + route.params.categoryName + '/'"
        :totalPages="+(+videos.totalPages).toFixed(0)"
        :currentPage="1"
      ></Pagination>
    </div>
  </template>
  
  <script setup>
  const route = useRoute();

  useHead({
    title:
      `Watch ${route.params.categoryName} The Best Korean BJ Cam Girl Videos Online In High Quality - Skbj.TV`,
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
    
  const { pending, data: videos } = await useLazyFetch(
    `http://localhost:3030/api/videos/getVideosByCategory?category=${route.params.categoryName}&limit=30`,
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
  .strong {
    font-weight: 900;
    text-transform: capitalize;
  }
  .image-wrapper {
    max-width: 400px;
    margin: 0 auto;
    margin-bottom: 20px;
    img {
      width: 100%;
    }
  }
  </style>
  