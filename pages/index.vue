<template>
  <Loading v-if="pending || pendingRandom"></Loading>
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
    server: false,
  }
);
const { pending: pendingRandom, data: videosRandom } = await useLazyFetch(
  `http://localhost:3030/api/videos/random`,
  {
    
    server: false,
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
