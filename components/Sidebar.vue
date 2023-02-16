<template>
  <div class="sidebar-main-wrapper" :class="{ active: showSidebar }">
    <NuxtLink to="/" class="link">
      <div class="icon">
        <IconsHome></IconsHome>
      </div>
      <span>Home</span>
    </NuxtLink>
    <NuxtLink to="/all-videos" class="link">
      <div class="icon">
        <AllVideos></AllVideos>
      </div>
      <span>All Videos</span>
    </NuxtLink>
    <NuxtLink to="/all-actors" class="link">
      <div class="icon">
        <IconsAvatar></IconsAvatar>
      </div>
      <span>All Actors</span>
    </NuxtLink>
    <NuxtLink to="/all-tags" class="link">
      <div class="icon">
        <IconsTag></IconsTag>
      </div>
      <span>All Tags</span>
    </NuxtLink>
  </div>
</template>

<script setup>
import { useSidebarStore } from "~/store/sidebar";
import { storeToRefs } from "pinia";
import AllVideos from "./icons/AllVideos.vue";

const sidebarStore = useSidebarStore();

const { showSidebar } = storeToRefs(sidebarStore);
</script>

<style scoped lang="scss">
.sidebar-main-wrapper {
  display: flex;
  flex-direction: column;
  width: 216px;
  height: calc(100vh - 90px);
  position: fixed;
  top: 57.61px;
  left: -240px;
  padding: 12px;
  color: #ffffff;
  overflow: hidden;
  overflow-y: auto;
  scrollbar-color: transparent transparent;
  scrollbar-width: thin;
  transition-duration: 0.1s;
  transition-timing-function: ease-in-out;

  &.active {
    left: 0;
  }
  &::-webkit-scrollbar {
    width: 4px;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }

  &::-webkit-scrollbar-thumb {
    background-color: #717171;
    outline: 1px solid slategrey;
    border-radius: 10px;
  }

  .link {
    cursor: pointer;
    padding: 8px 12px;
    margin: 4px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 10px;

    &:hover {
      background-color: #272727;
    }

    .icon {
      width: 24px;
      fill: #ffffff;
      margin-right: 20px;
    }
  }
}
</style>
