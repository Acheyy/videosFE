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
      :url="'/all-videos/'"
      :totalPages="+(+videos.result.results_total / 100).toFixed(0)"
      :currentPage="route.params.pageNumber"
    ></Pagination>
  </div>
</template>

<script setup>
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
)
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
</style>
