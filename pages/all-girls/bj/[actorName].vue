<template>
  <Loading v-if="pending"></Loading>
  <div v-else>
    <h1 class="page-title">All Videos</h1>
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
    <!-- <Pagination
        :url="'/all-videos/'"
        :totalPages="+(+videos.totalPages).toFixed(0)"
        :currentPage="1"
      ></Pagination> -->
  </div>
</template>

<script setup>
const route = useRoute();

const { pending, data: videos } = await useLazyFetch(
  `http://localhost:3030/api/videos/videosByActor?actor=${route.params.actorName}`,
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
