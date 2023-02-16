<template>
  <div class="pagination">
    <NuxtLink
      :to="url + index"
      class="page-number"
      :class="{current: currentPage == index}"
      v-for="index in totalPages"
      :key="index"
    >
      {{ index }}
    </NuxtLink>
  </div>
</template>

<script setup>
const props = defineProps({
    totalPages: Number,
    url: String,
    currentPage: Number
})
</script>

<style scoped lang="scss">
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 30px;

  .page-number {
    border: 1px solid #858585;
    padding: 7px 15px;
    border-radius: 3px;
    margin: 5px;
    display: inline-block;
    transition-duration: 0.1s;
    transition-timing-function: ease-in-out;
    &:hover:not(.current){
        background-color: #858585;
    }
    &.current{
        cursor: default !important;
        border-color: transparent !important;
    }
  }
}
</style>
