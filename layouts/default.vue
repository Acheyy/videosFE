<template>
  <div class="main-wrapper">
    <Header> </Header>
    <Sidebar></Sidebar>
    <div class="main-content"  :class="{ full: !showSidebar }">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { useSidebarStore } from "~/store/sidebar";
import { storeToRefs } from "pinia";

const sidebarStore = useSidebarStore();

const { showSidebar } = storeToRefs(sidebarStore);
</script>

<style scoped lang="scss">
.main-wrapper {
  min-height: 100vh;
  margin: 0;
  display: flex;
  flex-direction: column;
  position: relative;
}
.main-content {
  margin-left: 240px;
  color: #ffffff;
  transition-duration: 0.1s;
  transition-timing-function: ease-in-out;
  padding: 20px;
  &.full{
    margin-left: 0 !important;
  }
}
</style>
