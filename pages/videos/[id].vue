<template>
  <Loading v-if="pending"></Loading>
  <div v-else-if="error">Error {{ error }}</div>
  <div v-else class="top-wrapper">
    <div class="main-video-wrapper">
      <div class="player-wrapper">
        <IFRAME
          :src="'https://sbhight.com/e/' + route.params.id + '.html'"
          FRAMEBORDER="0"
          MARGINWIDTH="0"
          MARGINHEIGHT="0"
          SCROLLING="NO"
          WIDTH="640"
          HEIGHT="360"
          allowfullscreen
        ></IFRAME>
      </div>
      <div class="title">
        <h1>{{ video.name }}</h1>
      </div>
      <div class="actor">
        <NuxtLink
          :to="'/all-girls/' + video.actor.slug"
          class="link"
          :title="video.actor.name"
        >
          <img
            :src="video.actor.thumbnail"
            :title="video.actor.name"
            :alt="video.actor.name"
          />
          <div class="actor-info">
            <div class="name">
              {{ video.actor.name }}
            </div>
            <div class="views">Total videos: {{ video.actor.totalVideos }}</div>
          </div>
        </NuxtLink>
        <div class="tags">
          <Tag v-for="(tag, index) in video.tags" :tag-name="tag.name"> </Tag>
        </div>
      </div>
      <br />
      <br />
      <br />
      <div v-if="isAccountLoggedIn">
        Write a comment:
        <n-input
          :theme="$darkTheme"
          :theme-overrides="$themeOverrides"
          v-model:value="formData.commentBody"
          type="textarea"
          placeholder="Write a comment..."
        />
        {{ formData.commentBody }}
        <n-button
          :theme="$darkTheme"
          :theme-overrides="$themeOverrides"
          @click="writeComment"
        >
          Comment
        </n-button>
        <br />
        Note: Reply to reply is not yet shown
      </div>
      <div v-else>
        <NuxtLink to="/admin/login">Login</NuxtLink> to write a comment
      </div>
      <br />
      <br />
      <Comment :comment="comment" v-for="(comment, index) in comments">
        <Comment
          :comment="reply"
          v-for="(reply, index) in comment.replies"
        ></Comment>
      </Comment>
    </div>
    <div class="sidebar-wrapper">
      <VideoCard
        v-for="(video, index) in videosRecommended"
        :key="index"
        :uploadID="video.uploadID"
        :thumbnail="video.thumbnail"
        :duration="video.duration"
        :name="video.name"
        :date="video.createdAt"
        :actor="video.actor"
        :category="video.category"
        :views="video.views"
      ></VideoCard>
    </div>
  </div>
</template>

<script setup>
import { useAccountInfo } from "~/store/accountInfo";
import { storeToRefs } from "pinia";
const formData = reactive({ commentBody: "" });
let comments = ref([]);
const accountInfoStore = useAccountInfo();
const { isAccountLoggedIn, accountDetails } = storeToRefs(accountInfoStore);
const route = useRoute();
const cookieVideoId = useCookie("cookieVideoId");
const title = ref("");
const actorName = ref("");
const actorThumb = ref("");

async function writeComment() {
  await $fetch(`http://localhost:3030/api/comments/${video.value._id}`, {
    method: "POST",
    body: {
      commentBody: formData.commentBody,
      author: accountDetails.value._id,
      videoId: video.value._id,
    },
  });
}

const {
  pending,
  data: video,
  error,
} = await useFetch(`http://localhost:3030/api/videos/${route.params.id}`, {
  server: true,
  credentials: "include",
  async onResponse(res) {
    title.value = res.response._data.name;
    actorName.value = res.response._data.actor.name;
    actorThumb.value = res.response._data.actor.thumbnail;
    // await useLazyFetch(
    //   `http://localhost:3030/api/comments/${res.response._data._id}`,
    //   {
    //     onResponse(res) {
    //       comments.value = { ...res.response._data };
    //     },
    //     server: true,
    //   }
    // );
    if (cookieVideoId?.value) {
      if (!cookieVideoId.value.includes(route.params.id)) {
        cookieVideoId.value += route.params.id;
      }
    } else {
      cookieVideoId.value = route.params.id;
    }
  },
});

onServerPrefetch(() => {
  useHead({
    title: `Watching ${title.value} Videos Online In High Quality - Skbj.TV`,
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
        content: `Watch ${title.value} Videos Online In High Quality - Skbj.TV`,
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
        content: `${actorName.value} ${title.value}`,
      },
      { property: "og:image:type", content: "image/webp" },
      { property: "og:image:type", content: "image/avif" },
      {
        property: "og:description",
        content:
          "Skbj.TV Official Page - Watch The Best Korean BJ Cam Girl Videos Online In High Quality",
      },
      { name: "twitter:title", content: "Skbj.TV" },
      {
        name: "twitter:description",
        content:
          "Skbj.TV Official Page - Watch The Best Korean BJ Cam Girl Videos Online In High Quality",
      },
      { name: "twitter:image", content: `${actorThumb.value}` },
    ],
  });
});

onMounted(() => {
  if (title.value) {
    useHead({
      title: `Watching ${title.value} Videos Online In High Quality - Skbj.TV`,
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
          content: `Watch ${title.value} Videos Online In High Quality - Skbj.TV`,
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
          content: `${actorName.value} ${title.value}`,
        },
        { property: "og:image:type", content: "image/webp" },
        { property: "og:image:type", content: "image/avif" },
        {
          property: "og:description",
          content:
            "Skbj.TV Official Page - Watch The Best Korean BJ Cam Girl Videos Online In High Quality",
        },
        { name: "twitter:title", content: "Skbj.TV" },
        {
          name: "twitter:description",
          content:
            "Skbj.TV Official Page - Watch The Best Korean BJ Cam Girl Videos Online In High Quality",
        },
        { name: "twitter:image", content: `${actorThumb.value}` },
      ],
    });
  }
});

const { pending: pendingRecommended, data: videosRecommended } =
  await useLazyFetch(`http://localhost:3030/api/videos/random`, {
    onResponseError() {
      toast("There was an error! Click here to refresh the data!", {
        theme: "dark",
        type: "error",
        autoClose: false,
        toastClassName: "custom-wrapper error",
        closeOnClick: false,
      });
    },
    server: true,
  });
</script>

<style lang="scss" scoped>
.top-wrapper {
  display: flex;
  .main-video-wrapper {
    width: calc(100% - 324px);
    .player-wrapper {
      position: relative;
      background-color: #272727;
      &::before {
        display: block;
        content: "";
        width: 100%;
        padding-top: 56.25%;
      }

      iframe {
        width: 100%;
        position: absolute;
        height: 100%;
        margin-left: auto;
        margin-right: auto;
        overflow: hidden;
        display: block;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
      }
    }
  }
  .sidebar-wrapper {
    display: flex;
    flex-direction: column;
    align-items: baseline;
    width: 300px;
    margin-left: 20px;
  }
}

.link {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: transparent;
    overflow: hidden;
  }
  .actor-info {
    margin-left: 8px;
    text-transform: capitalize;
    .name {
      margin-bottom: 8px;
    }
  }
}
.actor {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  .tags {
    margin-left: 20px;
  }
}
.title {
  margin: 16px 0;
}

@media only screen and (max-width: 992px) {
  .top-wrapper {
    flex-wrap: wrap;
    .main-video-wrapper {
      width: 100%;
    }
    .sidebar-wrapper {
      width: calc(100% - 8px);
      margin-top: 20px;
      margin-left: 0;
    }
  }
}
</style>
