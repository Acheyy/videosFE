<template>
  <Loading v-if="pending"></Loading>
  <div v-else-if="error">Error</div>
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
      <!-- <button @click="deleteVideo()">Delete</button> -->
      <Tag v-for="(tag, index) in video.tags" :tag-name="tag.name"> </Tag>
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
      </div>
      <div v-else>
        <NuxtLink to="/admin/login">Login</NuxtLink> to write a comment
      </div>
      <br />
      Note: Reply to reply is not yet shown
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

async function deleteVideo() {
  await $fetch(`http://localhost:3030/api/videos?videoId=${route.params.id}`, {
    method: "DELETE",
  });
}

async function writeComment() {
  console.log(accountDetails);
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
} = await useLazyFetch(`http://localhost:3030/api/videos/${route.params.id}`, {
  server: false,
  credentials: "include",
  async onResponse(res) {
    await useLazyFetch(
      `http://localhost:3030/api/comments/${res.response._data._id}`,
      {
        onResponse(res) {
          comments.value = { ...res.response._data };
        },
        onResponseError() {
          toast("There was an error loading the comments!", {
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
    if (cookieVideoId.value) {
      if (!cookieVideoId.value.includes(route.params.id)) {
        cookieVideoId.value += route.params.id;
      }
    } else {
      cookieVideoId.value = route.params.id;
    }
  },
  onResponseError(err) {
    if ((err.response._data.error = "Forbidden")) console.log();
  },
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
    server: false,
  });
</script>

<style lang="scss" scoped>
.top-wrapper {
  display: flex;
  .main-video-wrapper {
    width: 100%;
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
    width: 100%;
    max-width: 300px;
    margin-right: 300px;
    margin-left: 20px;
  }
}
</style>
