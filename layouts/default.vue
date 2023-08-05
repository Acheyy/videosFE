<template>
  <div class="main-wrapper">
    <UpdateNotification></UpdateNotification>
    <Header> </Header>
    <Sidebar></Sidebar>
    <div class="main-content" :class="{ full: !showSidebar }">
      <!-- <div class="notification-banner">
        <p>
          There is an error with PayPal payments. The payments will not go
          through. Working on fixing it as soon as possible!!
        </p>
        <p>
          페이팔 결제에 오류가 있습니다. 지불이 안 된다. 가능한 한 빨리 수리하는
          작업!!
        </p>
      </div> -->
      <Breadcrumb></Breadcrumb>
      <div>
        <slot></slot>
      </div>
      <Footer></Footer>
    </div>
    <Footer2></Footer2>
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

.notification-banner {
  background-color: #341818;
  border: 1px solid red;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  p {
    margin-top: 10px;
  }
}

@media only screen and (max-width: 1500px) {
  .main-content {
    margin-left: 0;
  }
}
</style>
