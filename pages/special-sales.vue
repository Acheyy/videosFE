<template>
  <h1 class="page-title">Special Sales</h1>
  <div style="min-height: 100vh">
    <div class="cards-wrapper" v-if="pending">
      <VideoCardLoading
        v-for="index in Array.from({ length: 30 }, (v, k) => k + 1)"
        :key="index"
      ></VideoCardLoading>
    </div>
    <div v-else class="cards-wrapper">
      <VideoCard
        v-for="(video, index) in videos.videos"
        :key="index"
        :videoId="video._id"
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
        :cost="video.cost"
        :isVIP="video.tags.includes('643adac05767bb0f8517fec8')"
        :accountDetails="accountDetails"
      ></VideoCard>
    </div>
    <div v-if="!pending">
      <QueryPagination
        v-if="+videos.totalPages > 1"
        :totalPages="+(+videos.totalPages).toFixed(0)"
        :currentPage="
          router.currentRoute.value.query.page
            ? +router.currentRoute.value.query.page
            : 1
        "
      ></QueryPagination>
    </div>
  </div>
</template>

<script setup>
import { useAccountInfo } from "~/store/accountInfo";
import { storeToRefs } from "pinia";
const accountInfoStore = useAccountInfo();
const { accountDetails } = storeToRefs(accountInfoStore);

const router = useRouter();

useHead({
  title:
    "Watch Special Sales Videos The Best Korean BJ Cam Girl Videos Online In High Quality - Skbj.TV",
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
  () =>
    `https://skbj.tv/api/videos/special?limit=30&page=${router.currentRoute.value.query.page}`,
  {
    server: false,
    onResponseError() {
      toast("There was an error! Click here to refresh the data!", {
        theme: "dark",
        type: "error",
        autoClose: false,
        toastClassName: "custom-wrapper error",
        closeOnClick: false,
      });
    },
  }
);
</script>

<style scoped lang="scss">
.cards-wrapper {
  display: flex;
  flex-wrap: wrap;
}
</style>
