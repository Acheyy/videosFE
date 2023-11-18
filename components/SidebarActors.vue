<template>
  <div class="actors-wrapper">
    <NuxtLink :to="'/all-girls/' + actor.name" class="single-actor link" v-for="actor in actorsData" @click="closeSidebarMobile()">
      <div class="thumb-wrapper">
        <img :src="actor.thumbnail + '?width=40'" />
      </div>
      <div class="actor-name">{{ actor.name }}</div>
      <div class="actor-videos">- {{ actor.totalVideos }}</div>
    </NuxtLink>
  </div>
</template>

<script setup>
import { useSidebarStore } from "~/store/sidebar";
import { storeToRefs } from "pinia";

const sidebarStore = useSidebarStore();

const { showSidebar } = storeToRefs(sidebarStore);

const { pending, data: actorsData } = await useLazyFetch(
  `http://localhost:3030/api/actors/get-featured-actors`,
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

function closeSidebarMobile() {
  if (window?.innerWidth < 1500) {
    sidebarStore.triggerSidebar();
  }
}
</script>

<style lang="scss" scoped>
.thumb-wrapper {
  max-width: 40px;
  max-height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
  img {
    width: 100%;
  }
}
.single-actor {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
}
.actor-name {
  margin-right: 4px;
}
.link{
    cursor: pointer;
    padding: 4px 8px;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 10px;
    &:hover{
        background-color: #272727;
    }
}
</style>
