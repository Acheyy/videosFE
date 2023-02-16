<template>
  <Loading v-if="pending"></Loading>
  <div v-else>
    <div class="cards-title" @click="triggerToaster('Hello!')">
      Most Recent:
    </div>
    <div class="cards-wrapper">
      <NuxtLink
        :to="'/videos/' + video.uploadID"
        class="card-wrapper"
        v-for="(video, index) in videos"
        :key="index"
      >
        <div class="thumnail">
          <img :src="video.thumbnail" />
        </div>
        <div class="text">
          <div class="title">{{ video.name }}</div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { toast } from "vue3-toastify";

const triggerToaster = (text) => {};
const { pending, data: videos } = await useLazyFetch(
  "http://localhost:3030/videos",
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

.cards-title {
  font-size: 24px;
}
</style>
