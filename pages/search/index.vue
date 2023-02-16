<template>
  <Loading v-if="searching"></Loading>
  <div v-else>
    <div v-if="!resultVideos.length">
      <StartTyping v-if="!searchText.length"></StartTyping>
      <div v-else>No results</div>
    </div>
    <div v-else>
      <div class="cards-title">
        Searching for: {{ searchText }} <br />
      </div>
      <div class="cards-wrapper">
        <NuxtLink
          :to="'/videos/' + video.uploadID"
          class="card-wrapper"
          v-for="(video, index) in resultVideos"
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
