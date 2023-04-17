<template>
  <div
    class="sidebar-main-wrapper"
    :class="{ 'mobile-class': mobileClass, active: showSidebar }"
  >
    <NuxtLink to="/" class="link" @click="closeSidebarMobile()">
      <div class="icon">
        <IconsHome></IconsHome>
      </div>
      <span>Home</span>
    </NuxtLink>
    <NuxtLink to="/videos" class="link" @click="closeSidebarMobile()">
      <div class="icon">
        <AllVideos></AllVideos>
      </div>
      <span>All Videos</span>
    </NuxtLink>
    <NuxtLink to="/tags/vip" class="link" @click="closeSidebarMobile()">
      <div class="icon">
        <IconsCrown></IconsCrown>
      </div>
      <span>VIP</span>
    </NuxtLink>
    <NuxtLink to="/all-girls" class="link" @click="closeSidebarMobile()">
      <div class="icon">
        <IconsAvatar></IconsAvatar>
      </div>
      <span>All Girls</span>
    </NuxtLink>
    <NuxtLink to="/most-popular" class="link" @click="closeSidebarMobile()">
      <div class="icon">
        <IconsPopular></IconsPopular>
      </div>
      <span>Most Popular</span>
    </NuxtLink>
    <NuxtLink to="/most-liked" class="link" @click="closeSidebarMobile()">
      <div class="icon">
        <IconsHeart></IconsHeart>
      </div>
      <span>Most Liked</span>
    </NuxtLink>

    <NuxtLink to="/all-categories" class="link" @click="closeSidebarMobile()">
      <div class="icon">
        <IconsTag></IconsTag>
      </div>
      <span>All Categories</span>
    </NuxtLink>
    <div class="sidebar-separator"></div>
    <NuxtLink
      to="https://discord.gg/gCcUVYAaNE"
      target="_blank"
      class="link"
      @click="closeSidebarMobile()"
    >
      <div class="icon">
        <IconsDiscord></IconsDiscord>
      </div>
      <span>Discord</span>
    </NuxtLink>
    <!-- <NuxtLink to="/all-tags" class="link" @click="closeSidebarMobile()">
      <div class="icon">
        <IconsTag></IconsTag>
      </div>
      <span>All Tags</span>
    </NuxtLink> -->
    <NuxtLink to="/contact" class="link" @click="closeSidebarMobile()">
      <div class="icon">
        <IconsLetter></IconsLetter>
      </div>
      <span>Contact</span>
    </NuxtLink>
    <client-only>
      <UpgradeToPremiumButton
        v-if="isAccountLoggedIn && !accountDetails.isUserPremium"
      ></UpgradeToPremiumButton>
      <div
        style="margin-top: 10px"
        v-if="isAccountLoggedIn && accountDetails.isUserPremium"
      >
        Premium Expires:
        {{ $timeAgo.format(new Date(accountDetails?.premiumExpiry)) }}
      </div>
    </client-only>
  </div>
</template>

<script setup>
import { useSidebarStore } from "~/store/sidebar";
import { storeToRefs } from "pinia";
import AllVideos from "./icons/AllVideos.vue";
import { useAccountInfo } from "~/store/accountInfo";
const mobileClass = ref(true);
const accountInfoStore = useAccountInfo();

const { isAccountLoggedIn, accountDetails } = storeToRefs(accountInfoStore);

const sidebarStore = useSidebarStore();

const { showSidebar } = storeToRefs(sidebarStore);

onMounted(() => {
  if (window?.innerWidth < 1500) {
    sidebarStore.triggerSidebar();
  }
  setTimeout(() => {
    mobileClass.value = false;
  }, 1000); // 1 seconds delay
});

function closeSidebarMobile() {
  if (window?.innerWidth < 1500) {
    sidebarStore.triggerSidebar();
  }
}
</script>

<style scoped lang="scss">
.sidebar-main-wrapper {
  display: flex;
  flex-direction: column;
  width: 276px;
  height: calc(100vh - 90px);
  position: fixed;
  top: 66px;
  left: -300px;
  padding: 12px;
  color: #ffffff;
  overflow: hidden;
  overflow-y: auto;
  scrollbar-color: transparent transparent;
  scrollbar-width: thin;
  transition-duration: 0.1s;
  transition-timing-function: ease-in-out;
  z-index: 9;
  background-color: #0f0f0f;
  @media only screen and (max-width: 1500px) {
    &.mobile-class {
      display: none;
    }
  }
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

.sidebar-separator {
  margin: 16px 0;
  width: 100%;
  height: 1px;
  background-color: #2e2e2e;
}
</style>
