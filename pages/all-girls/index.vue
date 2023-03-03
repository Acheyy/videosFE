<template>
  <Loading v-if="pending"></Loading>
  <div v-else>
    <h1 class="page-title">All Girls</h1>
    <div class="cards-wrapper">
      <NuxtLink
        :to="'/all-girls/bj/' + actor.slug"
        class="card-wrapper"
        v-for="(actor) in actorsData"
      >
        <div class="thumnail">
          <img :src="actor.thumbnail" />
        </div>
        <div class="text">
          <div class="title">{{ actor.name }}</div>
          <div class="title">Total Videos: {{ actor.totalVideos }}</div>
        </div>
      </NuxtLink>
    </div>
    <!-- <Pagination
        :url="'/all-videos/'"
        :totalPages="+(+videos.result.results_total / 100).toFixed(0)"
        :currentPage="1"
      ></Pagination> -->
  </div>
</template>

<script setup>
import { toast } from "vue3-toastify";

const { pending, data: actorsData } = await useLazyFetch(
  `http://localhost:3030/api/actors`,
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
.pagination {
  display: flex;
  justify-content: center;

  .page-number {
    border: 1px solid #858585;
    padding: 7px 15px;
    border-radius: 3px;
    margin: 5px;
    display: inline-block;
  }
}
.title {
  margin-top: 8px;
  text-transform: capitalize;
}
</style>
