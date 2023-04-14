<template>
  <div class="main-wrapper">
    <UpdateNotification></UpdateNotification>
    <Header> </Header>
    <Sidebar></Sidebar>
    <div class="main-content" :class="{ full: !showSidebar }">
      <Breadcrumb></Breadcrumb>
      <div>
        <slot></slot>
      </div>
      <Footer></Footer>
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
  margin-left: 300px;
  color: #ffffff;
  transition-duration: 0.1s;
  transition-timing-function: ease-in-out;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: calc(100vh - 106px);

  &.full {
    margin-left: 0 !important;
  }
}

@media only screen and (max-width: 1500px) {
  .main-content {
    margin-left: 0;
  }
}
</style>
