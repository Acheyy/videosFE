<template>
  <div class="slide-container">
    <IconsArrowLeft v-if="!isAtStart" @click="scrollContentBack" class="slide-btn left" ></IconsArrowLeft>
    <IconsArrowRight v-if="!isAtEnd" @click="scrollContent" class="slide-btn right"></IconsArrowRight>

    <div class="actors-wrapper" ref="scrollContainer">

<div v-if="pending" style="display: flex">
  <div
    class="single-actor link placeholder"
    style="width: 100px; height: 114px; background-color: #131313"
    v-for="index in Array.from({ length: 20 }, (v, k) => k + 1)"
    :key="index"
  >
    <div class="thumb-wrapper">
      <div class="img"></div>
    </div>
    <div class="actor-name"></div>
  </div>
</div>
<NuxtLink
  v-else
  :to="'/all-girls/' + actor.name"
  class="single-actor link"
  v-for="(actor, index) in actorsData"
>
  <div class="thumb-wrapper">
    <img class="img" :src="actor.thumbnail + '?width=100'" />
    <div class="number-badge">{{ index + 1 }}</div>
  </div>
  <div class="actor-name">{{ actor.name }}</div>
</NuxtLink>
</div>
  </div>

</template>

<script setup>
import { useSidebarStore } from "~/store/sidebar";
import { storeToRefs } from "pinia";

const sidebarStore = useSidebarStore();

const { showSidebar } = storeToRefs(sidebarStore);

const { pending, data: actorsData } = await useLazyFetch(
  `https://skbj.tv/api/actors/get-most-viewed-actors`,
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
const scrollContainer = ref(null);
const isAtStart = ref(true);
const isAtEnd = ref(false);

const handleScroll = () => {
  const container = scrollContainer.value;
  if (container) {
    isAtStart.value = container.scrollLeft === 0;
    isAtEnd.value = container.scrollLeft + container.offsetWidth >= container.scrollWidth;
  }
};

onMounted(() => {
  scrollContainer.value.addEventListener('scroll', handleScroll);
  // Initial check
  handleScroll();
});

onBeforeUnmount(() => {
  scrollContainer.value.removeEventListener('scroll', handleScroll);
});

const scrollContent = () => {
  const container = scrollContainer.value;
  if (container) {
    const scrollAmount = 300; // You can adjust this value as needed
    container.scrollLeft += scrollAmount;
  }
};

const scrollContentBack = () => {
  const container = scrollContainer.value;
  if (container) {
    const scrollAmount = -300; // You can adjust this value as needed
    container.scrollLeft += scrollAmount;
  }
};
</script>

<style lang="scss" scoped>
.placeholder {
  @media only screen and (max-width: 480px) {
    width: 80px !important;
  }
}
.actors-wrapper > div {
  display: inline-block;
}

.slide-container {
  position: relative;
  // Ensure you define a width and height, so the button knows where to position itself.
  width: 100%; 
  height: auto; 

  .slide-btn{
    position: absolute;
    z-index: 2;
    top: 16px;
    cursor: pointer;
    padding: 12px;
    background-color: rgb(43, 43, 43, 0.75);
    border-radius: 8px;

    &.left{
      left: 0;
    }
    &.right{
      right: 0;
    }
  }
}


.actors-wrapper {
  overflow-x: auto;
  white-space: nowrap;
  scroll-behavior: smooth;
  display: flex;
  overflow: hidden;
  margin: 20px 0;
  position: relative;

}
.thumb-wrapper {
  max-width: 90px;
  max-height: 90px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;

  @media only screen and (max-width: 480px) {
    max-width: 70px;
    max-height: 70px;

    .number-badge {
      top: 44px !important;
    }
  }

  .img {
    width: 90px;
    height: 90px;
  }
}
.single-actor {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
  margin-right: 10px;
  position: relative;
  .number-badge {
    position: absolute;
    top: 64px;
    left: 0;
    background-color: rgba(255, 0, 0, 0.7);
    border-radius: 50%;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.actor-name {
  margin-top: 8px;
}
.link {
  transition-duration: 0.1s;
  transition-timing-function: ease-in-out;
  cursor: pointer;
  padding: 4px 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  &:hover {
    background-color: #272727;
  }
}
</style>
