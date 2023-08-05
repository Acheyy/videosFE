<template>
  <div>
    <h1 class="page-title">
      <span class="strong"> {{ route.params.actorName }} </span> Videos
    </h1>
    <div class="image-wrapper" v-if="pendingActor">
      <img class="placeholrder-img" />
    </div>
    <div class="image-wrapper" v-else>
      <img :src="actor?.thumbnail" :alt="actor?.name" :title="actor?.name" />
    </div>
    <h2 style="text-align: center; margin-bottom: 20px" v-if="pendingActor">
      Total videos: Loading..
    </h2>
    <h2 style="text-align: center; margin-bottom: 20px" v-else>
      Total videos: {{ actor?.totalVideos }}
    </h2>

    <div class="sort-wrapper" v-if="!pendingActor && actor?.totalVideos > 5">
      <div
        class="date-sort"
        @click="sorVideos('date')"
        :class="{ active: videoOrder == 'date' }"
      >
        Most recent
      </div>
      <div
        class="popular-sort"
        @click="sorVideos('views')"
        :class="{ active: videoOrder == 'views' }"
      >
        Most popular
      </div>
      <div
        class="likes-sort"
        @click="sorVideos('likes')"
        :class="{ active: videoOrder == 'likes' }"
      >
        Most Liked
      </div>
      <div
        class="vip-sort"
        @click="sorVideos('vip')"
        :class="{ active: videoOrder == 'vip' }"
      >
        VIP
      </div>
    </div>
    <div class="cards-wrapper" v-if="pending">
      <VideoCardLoading
        v-for="index in Array.from({ length: 30 }, (v, k) => k + 1)"
        :key="index"
      ></VideoCardLoading>
    </div>
    <div class="cards-wrapper" v-else>
      <VideoCard
        v-for="(video, index) in videos.videos"
        :key="index"
        :uploadID="video.uploadID"
        :thumbnail="video.thumbnail"
        :duration="video.duration"
        :name="video.name"
        :date="video.createdAt"
        :actor="video.actor"
        :category="video.category"
        :views="video.views"
        :likes="video.likes?.length"
        :snapshots="video.snapshots"
        :isVIP="video.tags.includes('643adac05767bb0f8517fec8')"
      ></VideoCard>
    </div>
    <QueryPagination
      v-if="+videos?.totalPages > 1 && !pending"
      :totalPages="+(+videos.totalPages).toFixed(0)"
      :currentPage="
        router.currentRoute.value.query.page
          ? +router.currentRoute.value.query.page
          : 1
      "
    ></QueryPagination>
  </div>
</template>

<script setup>
const route = useRoute();
const router = useRouter();

const actorName = ref("");
const actorThumb = ref("");
const videoOrder = ref("date");
const queryObject = ref({ ...router.currentRoute.value.query });

const { pendingActor, data: actor } = await useLazyFetch(
  `http://localhost:3030/api/actors/${route.params.actorName}`,
  {
    async onResponse(res) {
      const word = res.response._data.name;
      const capitalized = word.charAt(0).toUpperCase() + word.slice(1);
      actorName.value = capitalized;
      actorThumb.value = res.response._data.thumbnail;
    },
    server: true,
  }
);

const {
  pending,
  refresh,
  data: videos,
} = await useLazyFetch(
  () =>
    `http://localhost:3030/api/videos/videosByActor?actor=${route.params.actorName}&limit=30&orderBy=${videoOrder.value}&page=${router.currentRoute.value.query.page}`,
  {
    server: false,
  }
);

// async function sorVideos(order) {
//   videoOrder.value = order;
//   router.currentRoute.value.query.page = 1;
//   router.replace({ path: `${route.path}`, query: { page: 1 } });
//   refresh();
// }

watch(videoOrder, async (newValue) => {
  // Update the query object
  queryObject.value.orderBy = newValue;
  queryObject.value.page = 1;

  // Update the query parameters in the address bar using the 'replace' method
  await router.replace({
    path: router.currentRoute.value.path,
    query: queryObject.value,
  });

  refresh();
});

async function sorVideos(order) {
  videoOrder.value = order;
}

onServerPrefetch(() => {
  useHead({
    title: `Watch ${actorName.value} The Best Korean BJ Cam Girl Videos Online In High Quality - Skbj.TV`,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "Watch The Best Korean BJ Cam Girl Videos Online In High Quality",
      },
      { name: "format-detection", content: "telephone=no" },
      { name: "referrer", content: "unsafe-url" },
      { property: "og:locale", content: "en_US" },
      {
        property: "og:title",
        content: `Watch ${actorName.value} videos - Skbj.TV Watch The Best Korean BJ Cam Girl Videos Online In High Quality`,
      },
      { property: "og:site_name", content: "Skbj.TV" },
      {
        property: "og:image",
        hid: "og:image",
        content: `${actorThumb.value}`,
      },
      { property: "og:image:width", content: "400" },
      { property: "og:image:height", content: "400" },
      {
        property: "og:image:alt",
        content: `${actorName.value}`,
      },
      { property: "og:image:type", content: "image/webp" },
      { property: "og:image:type", content: "image/avif" },
      {
        property: "og:description",
        content: `Watch ${actorName.value} videos - Skbj.TV Watch The Best Korean BJ Cam Girl Videos Online In High Quality`,
      },
      { name: "twitter:title", content: "Skbj.TV" },
      {
        name: "twitter:description",
        content: `Watch ${actorName.value} videos - Skbj.TV Watch The Best Korean BJ Cam Girl Videos Online In High Quality`,
      },
      { name: "twitter:image", content: `${actorThumb.value}` },
    ],
  });
});

onMounted(() => {
  if (actorName.value) {
    useHead({
      title: `Watch ${actorName.value} The Best Korean BJ Cam Girl Videos Online In High Quality - Skbj.TV`,
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content:
            "Watch The Best Korean BJ Cam Girl Videos Online In High Quality",
        },
        { name: "format-detection", content: "telephone=no" },
        { name: "referrer", content: "unsafe-url" },
        { property: "og:locale", content: "en_US" },
        {
          property: "og:title",
          content: `Watch ${actorName.value} videos - Skbj.TV Watch The Best Korean BJ Cam Girl Videos Online In High Quality`,
        },
        { property: "og:site_name", content: "Skbj.TV" },
        {
          property: "og:image",
          hid: "og:image",
          content: `${actorThumb.value}`,
        },
        { property: "og:image:width", content: "400" },
        { property: "og:image:height", content: "400" },
        {
          property: "og:image:alt",
          content: `${actorName.value}`,
        },
        { property: "og:image:type", content: "image/webp" },
        { property: "og:image:type", content: "image/avif" },
        {
          property: "og:description",
          content: `Watch ${actorName.value} videos - Skbj.TV Watch The Best Korean BJ Cam Girl Videos Online In High Quality`,
        },
        { name: "twitter:title", content: "Skbj.TV" },
        {
          name: "twitter:description",
          content: `Watch ${actorName.value} videos - Skbj.TV Watch The Best Korean BJ Cam Girl Videos Online In High Quality`,
        },
        { name: "twitter:image", content: `${actorThumb.value}` },
      ],
    });
  }
});
</script>

<style scoped lang="scss">
.placeholrder-img {
  width: 400px;
  height: 400px;
  background-color: #131313;
}
.sort-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 2px solid #272727;
  margin: 0 0 8px 0;
  div {
    transition-duration: 0.1s;
    transition-timing-function: ease-in-out;
  }
  div:hover {
    background-color: #272727;
  }
  .date-sort {
    margin-right: 5px;
    padding: 6px 8px;
    position: relative;
    border-radius: 4px 4px 0 0;
    cursor: pointer;
  }
  .popular-sort,
  .likes-sort {
    margin-left: 5px;
    margin-right: 5px;
    padding: 6px 8px;
    border-radius: 4px 4px 0 0;
    cursor: pointer;
    position: relative;
  }

  .vip-sort {
    margin-left: 5px;
    padding: 6px 8px;
    border-radius: 4px 4px 0 0;
    cursor: pointer;
    position: relative;
  }

  .active::after {
    content: " ";
    left: 0;
    bottom: -2px;
    position: absolute;
    width: 100%;
    height: 2px;
    background-color: red;
  }
}
.cards-wrapper {
  display: flex;
  flex-wrap: wrap;
}
.strong {
  font-weight: 900;
  text-transform: capitalize;
}
.image-wrapper {
  max-width: 400px;
  margin: 0 auto;
  margin-bottom: 20px;
  img {
    width: 100%;
  }
}
</style>
