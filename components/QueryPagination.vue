<template>
  <div class="pagination">
    <div
      class="page-number"
      :class="{ current: currentPage == index }"
      v-for="index in totalPages"
      :key="index"
      @click="changePage(index)"
    >
      {{ index }}
    </div>
  </div>
</template>

<script setup>
const router = useRouter();

function changePage(index) {
  router.push({
    query: {
      ...router.currentRoute.value.query,
      page: index,
    },
  });
}

const props = defineProps({
  totalPages: Number,
  currentPage: Number,
});
</script>

<style scoped lang="scss">
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  flex-wrap: wrap;

  .page-number {
    border: 1px solid #858585;
    padding: 7px 15px;
    border-radius: 3px;
    margin: 5px;
    display: inline-block;
    transition-duration: 0.1s;
    transition-timing-function: ease-in-out;
    cursor: pointer;
    &:hover:not(.current) {
      background-color: #858585;
    }
    &.current {
      cursor: default !important;
      border-color: transparent !important;
    }
  }
}
</style>
