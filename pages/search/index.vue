<template>
  <Loading v-if="searching"></Loading>
  <div v-else>
    <div v-if="!resultVideos.length">
      <StartTyping v-if="!searchText.length"></StartTyping>
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
</script>

<style scoped lang="scss">
.cards-wrapper {
  display: flex;
  flex-wrap: wrap;
}

.cards-title {
  font-size: 24px;
}
</style>
