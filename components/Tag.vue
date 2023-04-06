<template>
  <NuxtLink :to="'/tags/' + tagSlug" class="tag-wrapper">
    {{ tagName }}
  </NuxtLink>
</template>

<script setup>
const props = defineProps(["tagName", "tagSlug"]);
</script>

<style lang="scss" scoped>
.tag-wrapper {
  display: inline-block;
  background-color: #262626;
  padding: 10px 14px;
  margin: 8px 5px;
  border-radius: 100px;
  text-transform: capitalize;
  transition-duration: 0.1s;
  transition-timing-function: ease-in-out;
  cursor: pointer;
  &:hover {
    background-color: #353535;
  }
}
</style>
