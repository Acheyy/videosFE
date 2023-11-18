<template>
  <div class="main-wrapper">
    <UpdateNotification></UpdateNotification>
    <Header> </Header>
    <Sidebar></Sidebar>
    <div class="main-content" :class="{ full: !showSidebar }">
      <!-- <div class="notification-banner">
        <p>
          Yepyeppp - Limited Video 
        </p>
        <p>
          BJ모르님 - 제한된 비디오
        </p>
      </div> -->
      <div class="notification-banner info" v-if="showBanner">
        <div class="close-icon" @click="closeBanner">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </div>
        <p>
          <IconsAnnouncement class="animate-bounce"></IconsAnnouncement>
          seo_ahn__ - Chair Sex
          <NuxtLink to="/special-sales">See more</NuxtLink>
        </p>
        <p>
          <IconsAnnouncement class="hidden"></IconsAnnouncement>
          BJ서안 - 체어섹스
          <NuxtLink to="/special-sales">더 보기 </NuxtLink>
        </p>
      </div>

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

const showBanner = ref(true);

const closeBanner = () => {
  showBanner.value = false;
};
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

  @media only screen and (max-width: 660px) {
    padding: 0;
  }
}
.close-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

.notification-banner {
  background-color: #341818;
  border: 1px solid red;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  position: relative;

  @media only screen and (max-width: 660px) {
    margin: 10px;
  }

  p {
    margin-top: 10px;
  }

  &.info {
    border-color: #ffeb00;
    background-color: #3c3416;
    padding: 14px 16px;

    a {
      margin-left: 10px;
      font-weight: 600;
    }

    svg {
      max-width: 18px;
      margin-right: 8px;
      margin-bottom: -5px;
    }

    .hidden {
      opacity: 0;
    }
  }
}

@keyframes bounce {
  0%,
  to {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }

  50% {
    transform: none;
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}

.animate-bounce {
  animation: bounce 1s infinite !important;
}

@media only screen and (max-width: 1500px) {
  .main-content {
    margin-left: 0;
  }
}
</style>
