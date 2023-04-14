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
        <!-- Enable premium video -->
        <!-- <div class="premium-container">
          <img :src="video.thumbnail" />
          <div class="overlay">
            <div class="premium-wrapper">
              <div class="premium-message">
                This video can be watched by Premium users!
              </div>
              <UpgradeToPremiumButton
                v-if="isAccountLoggedIn && !accountDetails.isUserPremium"
              ></UpgradeToPremiumButton>
              <div v-if="!isAccountLoggedIn">
                Please <NuxtLink to="/register">create an account</NuxtLink> and
                upgrade to Premium <br /><br />
                Or go to <NuxtLink to="/login">Login</NuxtLink>
              </div>
            </div>
          </div>
        </div> -->
      </div>
      <div class="title">
        <h1>{{ video.name }}</h1>
        <div class="actions">
          <div class="count" v-text="likesCount"></div>
          <div class="favorites-wrapper" @click="like">
            <IconsHeart v-if="!isLiked" />
            <IconsHeartFull v-else />
          </div>
        </div>
      </div>
      <div class="actor">
        <NuxtLink
          :to="'/all-girls/' + video.actor.slug"
          class="link"
          :title="video.actor.name"
        >
          <img
            :src="video.actor.thumbnail + '?width=80'"
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
          <Tag
            v-for="(tag, index) in video.tags"
            :tag-name="tag.name"
            :tag-slug="tag.slug"
          >
          </Tag>
        </div>
        <div class="premium-download">
          <n-button
            :theme="$darkTheme"
            :theme-overrides="$themeOverrides"
            @click="downloadFile"
          >
            Premium Download
          </n-button>
        </div>
      </div>
      <br />
      <br />
      <div class="snapshots" v-if="video.snapshots.length">
        <nuxt-img
          format="webp"
          :src="snapshot"
          v-for="(snapshot, index) in video.snapshots"
          :alt="video.name + ' ' + (index + 1)"
          :title="video.name + ' ' + (index + 1)"
        />
      </div>
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
        <NuxtLink to="/login">Login</NuxtLink> to write a comment
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
    <div class="sidebar-wrapper" v-if="!pendingRecommended">
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
        :likes="video.likes?.length"
        :snapshots="video.snapshots"
      ></VideoCard>
    </div>
  </div>
</template>

<script setup>
import { toast } from "vue3-toastify";
import { useAccountInfo } from "~/store/accountInfo";
import { storeToRefs } from "pinia";
import DOMPurify from "dompurify";
const headers = useRequestHeaders(["cookie"]);
const router = useRouter();
const formData = reactive({ commentBody: "" });
let comments = ref([]);
const accountInfoStore = useAccountInfo();
const { isAccountLoggedIn, accountDetails } = storeToRefs(accountInfoStore);
const route = useRoute();
const cookieVideoId = useCookie("cookieVideoId");
const title = ref("");
const actorName = ref("");
const actorThumb = ref("");
const videoThumb = ref("");
const isLiked = ref(false);
const likesCount = ref(0);

async function writeComment() {
  const sanitizedComment = DOMPurify.sanitize(formData.commentBody);

  await $fetch(`http://localhost:3030/api/comments/${video.value._id}`, {
    method: "POST",
    body: {
      commentBody: sanitizedComment,
      author: accountDetails.value._id,
      videoId: video.value._id,
    },
  });
}

const like = async () => {
  if (!isAccountLoggedIn.value) {
    toast("Please signin to access this feature", {
      theme: "dark",
      type: "error",
      autoClose: true,
      toastClassName: "custom-wrapper error",
      closeOnClick: true,
    });
    return;
  }

  isLiked.value = !isLiked.value;

  console.log(isLiked.value);
  if (isLiked.value) {
    likesCount.value++;
  } else {
    likesCount.value--;
  }

  fetch(`http://localhost:3030/api/videos/like/${video.value._id}`, {
    credentials: "include",
  });
};

const downloadFile = async () => {
  try {
    const blobName = video.value.fileName; // Replace with the actual video filename
    const downloadUrl = `http://localhost:3030/api/videos/download/${encodeURIComponent(
      blobName
    )}`;

    // Check if the file exists
    const existsResponse = await fetch(
      `http://localhost:3030/api/videos/fileExists/${encodeURIComponent(
        blobName
      )}`
    );
    if (!existsResponse.ok) {
      toast("There was an error! The file not found", {
        theme: "dark",
        type: "error",
        autoClose: true,
        toastClassName: "custom-wrapper error",
        closeOnClick: true,
      });
      throw new Error("Error checking file existence");
    }
    const { exists } = await existsResponse.json();

    if (!isAccountLoggedIn.value) {
      toast("Please signin to access this feature", {
        theme: "dark",
        type: "error",
        autoClose: true,
        toastClassName: "custom-wrapper error",
        closeOnClick: true,
      });
      return;
    }

    if (!accountDetails.value.isUserPremium) {
      toast("This is a premium feature!", {
        theme: "dark",
        type: "error",
        autoClose: true,
        toastClassName: "custom-wrapper error",
        closeOnClick: true,
      });
      return;
    }

    if (!exists) {
      console.error("File not found:", blobName);
      toast("Premium download not available for this video!", {
        theme: "dark",
        type: "error",
        autoClose: true,
        toastClassName: "custom-wrapper error",
        closeOnClick: true,
      });
      return;
    }

    // Create an anchor element and set its href to the download URL
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = blobName;

    // Add the link to the document, trigger a click, and remove it after the download starts
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      document.body.removeChild(link);
    }, 100);
  } catch (error) {
    console.error("Error downloading file:", error);
  }
};

const {
  pending,
  data: video,
  error,
} = await useFetch(`http://localhost:3030/api/videos/${route.params.id}`, {
  server: true,
  credentials: "include",
  headers,
  onResponse(res) {
    console.log(res);
    if (res.response.status === 200) {
      title.value = res.response._data.name;
      actorName.value = res.response._data.actor.name;
      videoThumb.value = res.response._data.thumbnail;
      likesCount.value = res.response._data.likes.length;

      // Set isLiked.value based on whether accountDetails._id is in the likes array
      isLiked.value = res.response._data.likes.includes(
        accountDetails.value._id
      );

      if (cookieVideoId?.value) {
        if (!cookieVideoId.value.includes(route.params.id)) {
          cookieVideoId.value += route.params.id;
        }
      } else {
        cookieVideoId.value = route.params.id;
      }
    } else {
      router.push({ path: `/404` });
    }
  },
  onResponseError(err) {
    router.push({ path: `/404` });
  },
});

setTimeout(async () => {
  await useLazyFetch(`http://localhost:3030/api/comments/${video.value._id}`, {
    onResponse(res) {
      comments.value = { ...res.response._data };
    },
    server: true,
  });
}, 250);

onServerPrefetch(() => {
  useHead({
    title: `Watching ${title.value} Korean BJ Video Online In High Quality - Skbj.TV`,
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
        content: `Watch ${title.value} Korean BJ Video Online In High Quality - Skbj.TV`,
      },
      { property: "og:site_name", content: "Skbj.TV" },
      {
        property: "og:image",
        hid: "og:image",
        content: `${videoThumb.value}`,
      },
      { property: "og:image:width", content: "720" },
      { property: "og:image:height", content: "405" },
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
      { name: "twitter:image", content: `${videoThumb.value}` },
    ],
  });
});
const hasUpdatedOnce = ref(false);

onUpdated(() => {
  if (!hasUpdatedOnce.value) {
    isLiked.value = video.value.likes.includes(accountDetails.value._id);
    likesCount.value = video.value.likes.length;
    hasUpdatedOnce.value = true;
  }
});

onMounted(() => {
  if (title.value) {
    useHead({
      title: `Watching ${title.value} Korean BJ Video Online In High Quality - Skbj.TV`,
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
          content: `Watch ${title.value} Korean BJ Video Online In High Quality - Skbj.TV`,
        },
        { property: "og:site_name", content: "Skbj.TV" },
        {
          property: "og:image",
          hid: "og:image",
          content: `${videoThumb.value}`,
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
        { name: "twitter:image", content: `${videoThumb.value}` },
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
.snapshots {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  img {
    margin: 4px;
  }
}
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

      iframe,
      .premium-container {
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
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
      }

      .premium-container {
        img {
          width: 100%;
        }

        .overlay {
          position: absolute;
          z-index: 1;
          color: #ffffff;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          backdrop-filter: blur(25px);
          display: flex;
          align-items: center;
          flex-direction: column;
          justify-content: center;
          .premium-wrapper {
            padding: 30px 30px 50px 30px;
            background-color: #0f0f0f95;
            border: 1px solid #cacaca;
            border-radius: 8px;
            text-align: center;
            a {
              text-decoration: underline;
            }
          }
          .premium-message {
            margin-bottom: 40px;
          }
        }
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

.premium-download {
  display: flex;
  justify-content: flex-end;
  margin-left: 20px;
  button {
    border: 1px solid gold;
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
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  .actions {
    position: relative;
    .count {
      cursor: default;
      position: absolute;
      top: 8px;
      right: 52px;
    }
    .favorites-wrapper {
      margin-left: 60px;
      cursor: pointer;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      padding: 4px;
      margin-top: -10px;
      transition-duration: 0.25s;
      transition-timing-function: ease-in-out;

      &:hover {
        background-color: #272727;
      }
      svg {
        fill: #fff;
      }
    }
  }
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
