<template>
  <!-- <Loading v-if="pending"></Loading> -->
  <div>
    <h1 class="page-title">All Girls</h1>
    <div class="girls-wrapper">
      <div href="aaa" class="card-wrapper" v-if="!accountDetails.isUserPremium">
        <div class="thumnail">
          <BannerActors></BannerActors>
        </div>
      </div>
      <NuxtLink v-if="pending"
        :to="'/all-girls/' + actor.slug"
        class="card-wrapper"
        v-for="actor in actorsData"
      >
        <div class="thumnail">
        </div>
        <div class="text">
          <div class="title">{{ actor.name }}</div>
          <div class="title">Total Videos: {{ actor.totalVideos }}</div>
        </div>
      </NuxtLink>
      <NuxtLink v-else
        :to="'/all-girls/' + actor.slug"
        class="card-wrapper"
        v-for="actor in actorsData"
      >
        <div class="thumnail">
          <img :src="actor?.thumbnail" />
        </div>
        <div class="text">
          <div class="title">{{ actor.name }}</div>
          <div class="title">Total Videos: {{ actor.totalVideos }}</div>
        </div>
      </NuxtLink>
    </div>
    <!-- <Pagination
        :url="'/videos/'"
        :totalPages="+(+videos.result.results_total / 100).toFixed(0)"
        :currentPage="1"
      ></Pagination> -->
  </div>
</template>

<script setup>
import { useAccountInfo } from "~/store/accountInfo";
import { storeToRefs } from "pinia";
const accountInfoStore = useAccountInfo();
const { isAccountLoggedIn, accountDetails } = storeToRefs(accountInfoStore);

import { toast } from "vue3-toastify";

useHead({
  title:
    "Watch All Girls The Best Korean BJ Cam Girl Videos Online In High Quality - Skbj.TV",
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
    server: true,
  }
);
</script>

<style scoped lang="scss">
.girls-wrapper {
  display: flex;
  flex-wrap: wrap;
  .card-wrapper {
    width: calc(16.666666% - 16px);
    margin: 8px !important;
    border-radius: 8px !important;
    overflow: hidden;
    .thumnail img {
      width: 100%;
    }
  }
}
.title {
  margin-top: 8px;
  text-transform: capitalize;
}

@media only screen and (max-width: 992px) {
  .girls-wrapper .card-wrapper {
    width: calc(20% - 16px);
    margin: 8px;
    border-radius: 8px;
    overflow: hidden;
  }
}
@media only screen and (max-width: 660px) {
  .girls-wrapper .card-wrapper {
    width: calc(33.33333% - 16px);
    margin: 8px;
    border-radius: 8px;
    overflow: hidden;
  }
}
</style>
