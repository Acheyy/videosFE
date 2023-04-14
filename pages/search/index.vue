<template>
  <Loading v-if="searching"></Loading>
  <div v-else>
    <div v-if="!resultVideos.length">
      <StartTyping class="start-type" v-if="!searchText.length"></StartTyping>
      <div v-else>No results</div>
    </div>
    <div v-else>
      <div class="cards-title">Searching for: {{ searchText }} <br /></div>
      <div class="cards-wrapper">
        <VideoCard
          v-for="(video, index) in resultVideos"
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
    </div>
  </div>
</template>

<script setup>
import { toast } from "vue3-toastify";
import { useSearchStore } from "~/store/search";
import { storeToRefs } from "pinia";

const searchStore = useSearchStore();

const { resultVideos, searchText, searching } = storeToRefs(searchStore);

useHead({
  title: "Watch The Best Korean BJ Cam Girl Videos Online In High Quality - Skbj.TV",
  meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Watch The Best Korean BJ Cam Girl Videos Online In High Quality" },
      { name: "format-detection", content: "telephone=no" },
      { name: "referrer", content: "unsafe-url" },
      { property: "og:locale", content: "en_US" },
      { property: "og:title", content: "Skbj.TV" },
      { property: "og:site_name", content: "Skbj.TV" },
      { property: "og:description", content: "Skbj.TV Official Page - Watch The Best Korean BJ Cam Girl Videos Online In High Quality" },
      { name: "twitter:title", content: "Skbj.TV" },
      { name: "twitter:description", content: "Skbj.TV Official Page - Watch The Best Korean BJ Cam Girl Videos Online In High Quality" },
    ],
})

</script>

<style scoped lang="scss">
.cards-wrapper {
  display: flex;
  flex-wrap: wrap;
}

.cards-title {
  font-size: 24px;
}

@media only screen and (max-width: 1350px) {
  .start-type {
    display: none !important;
  }
}
</style>
