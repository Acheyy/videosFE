<template>
  <nav
    aria-label="breadcrumb"
    :itemscope="true"
    itemtype="https://schema.org/BreadcrumbList"
  >
    <ol class="breadcrumb">
      <li
        v-for="(breadcrumb, index) in breadcrumbs"
        :key="index"
        :class="{
          'breadcrumb-item': true,
          active: index === breadcrumbs.length - 1,
        }"
        itemprop="itemListElement"
        itemscope
        itemtype="https://schema.org/ListItem"
      >
        <NuxtLink
          v-if="index < breadcrumbs.length - 1"
          :to="breadcrumb.path"
          itemprop="item"
        >
          <span itemprop="name">{{ breadcrumb.text }}</span>
        </NuxtLink>
        <template v-else>
          <span itemprop="name">{{ breadcrumb.text }}</span>
        </template>
        <meta itemprop="position" :content="index + 1" />
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const breadcrumbs = computed(() => {
  const routePath = route.path.split("/").filter((p) => p);
  let path = "";

  // Add home page breadcrumb
  const homeBreadcrumb = {
    path: "/",
    text: "Home",
  };

  const otherBreadcrumbs = routePath.map((segment) => {
    path += `/${segment}`;
    const route = router.resolve(path);
    let text = route.meta?.breadcrumb || segment;

    // Remove hyphens and capitalize each word
    text = text
      .replace(/-/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return {
      path,
      text,
    };
  });

  return [homeBreadcrumb, ...otherBreadcrumbs];
});
</script>


<style scoped>
.breadcrumb {
  display: flex;
  flex-wrap: wrap;
  padding: 0.75rem 1rem;
  padding-top: 0;
  padding-left: 0;
  margin-bottom: 1rem;
  list-style: none;
  border-radius: 0.25rem;
  min-height: 16px;
}

.breadcrumb-item {
  display: inline-block;
  margin-right: 0.5rem;
}

.breadcrumb-item + .breadcrumb-item::before {
  display: inline-block;
  padding-right: 0.5rem;
  padding-left: 0.5rem;
  color: #6c757d;
  content: "/";
}

.breadcrumb-item.active {
  color: #6c757d;
}
</style>
