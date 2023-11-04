<template>
  <!-- <button @click="deleteMany()">Delete</button> -->
  <div class="top-wrapper">
    <div class="main-video-wrapper" v-if="!video.cost">
      <div class="player-wrapper">
        <div v-if="showAd && !accountDetails.isUserPremium" class="add-juicy">
          <div class="close" @click="hideAd">X</div>
          <client-only>
            <BannerVideoPlayer></BannerVideoPlayer>
          </client-only>
        </div>
        <!-- Enable premium video -->
        <div
          v-if="
            video.tags.some((tag) => tag.name === 'vip') &&
            !accountDetails.isUserPremium
          "
          class="premium-container"
        >
          <img
            :src="video.thumbnail"
            :alt="video.name"
            style="filter: blur(25px)"
          />
          <div class="overlay">
            <div class="premium-wrapper">
              <div class="premium-message">
                This video can be watched by VIP users!
                <div style="margin-top: 4px" v-if="!isAccountLoggedIn">
                  (5$ / 30 days)
                </div>
              </div>
              <UpgradeToPremiumButton
                v-if="isAccountLoggedIn && !accountDetails.isUserPremium"
              ></UpgradeToPremiumButton>
              <div v-if="!isAccountLoggedIn">
                Please <NuxtLink to="/register">create an account</NuxtLink> and
                upgrade to VIP <br /><br />
                Or go to <NuxtLink to="/login">Login</NuxtLink>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div>
            <iframe
              :src="
                'https://iframe.mediadelivery.net/embed/141502/' +
                route.params.id
              "
              loading="lazy"
              style="
                border: none;
                position: absolute;
                top: 0;
                height: 100%;
                width: 100%;
              "
              allow="accelerometer; gyroscope; encrypted-media; picture-in-picture;"
              allowfullscreen="true"
              v-if="sourceSB && video.createdAt > '2023-07-26T00:19:34.582Z'"
            ></iframe>
            <IFRAME
              :src="'https://sbhight.com/e/' + route.params.id + '.html'"
              FRAMEBORDER="0"
              MARGINWIDTH="0"
              MARGINHEIGHT="0"
              SCROLLING="NO"
              WIDTH="640"
              HEIGHT="360"
              allowfullscreen
              v-if="sourceSB && video.createdAt <= '2023-07-26T00:19:34.582Z'"
            ></IFRAME>
            <IFRAME
              :src="'https://guccihide.com/e/' + video.uploadID2"
              FRAMEBORDER="0"
              MARGINWIDTH="0"
              MARGINHEIGHT="0"
              SCROLLING="NO"
              WIDTH="640"
              HEIGHT="360"
              allowfullscreen
              v-if="sourceHide && video.createdAt <= '2023-07-26T00:19:34.582Z'"
            ></IFRAME>
            <IFRAME
              :src="'https://streamwish.to/e/' + video.uploadID3"
              FRAMEBORDER="0"
              MARGINWIDTH="0"
              MARGINHEIGHT="0"
              SCROLLING="NO"
              WIDTH="640"
              HEIGHT="360"
              allowfullscreen
              v-if="sourceWish && video.createdAt <= '2023-07-26T00:19:34.582Z'"
            ></IFRAME>
            <PremiumPlayer
              v-if="sourceVIP"
              :source="secureVideoUrl"
            ></PremiumPlayer>
          </div>
          <div class="players-selection">
            <div class="player-source" @click="changeToSB">Source 1</div>
            <div
              class="player-source"
              @click="changeToHide"
              v-if="
                video.createdAt >= '2023-05-02T05:55:10.089+00:00' &&
                video.createdAt <= '2023-07-26T00:19:34.582Z'
              "
            >
              Source 2
            </div>
            <div
              class="player-source"
              @click="changeToWish"
              v-if="
                video.createdAt >= '2023-05-10T06:08:02.528+00:00' &&
                video.createdAt <= '2023-07-26T00:19:34.582Z'
              "
            >
              Source 3
            </div>
            <div
              class="player-source"
              @click="changeToVIP"
              v-if="video.createdAt >= '2023-05-01T22:07:18.813+00:00'"
            >
              VIP Source
            </div>
          </div>
        </div>
      </div>
      <div class="title">
        <h1>
          {{ video.name }} -
          <NuxtLink
            :to="'/all-categories/' + video.category.slug"
            style="text-transform: capitalize; text-decoration: underline"
            >{{ video.category.name }}</NuxtLink
          >
        </h1>
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
        <div
          class="premium-download"
          v-if="video.createdAt > '2023-05-01T22:07:18.813Z'"
        >
          <n-button
            :theme="$darkTheme"
            :theme-overrides="$themeOverrides"
            @click="downloadFile"
          >
            VIP Download
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
      <div class="video-information">
        <h3 style="margin-bottom: 10px; font-weight: 600; font-size: 18px">
          More Information:
        </h3>
        <div class="inormation-row">
          Video added
          <strong> {{ $timeAgo.format(new Date(video.createdAt)) }}</strong>
        </div>
        <div class="inormation-row">
          The name of the BJ is
          <strong>{{ video.actor.name }}</strong>
        </div>
        <div class="inormation-row">
          The video was watched by
          <strong> {{ video.views.views }}</strong> people and has been added to
          the favorite list <strong>{{ video.likes.length }}</strong> times
        </div>
        <div class="inormation-row">
          Duration <strong> {{ $timeFormat(video.duration) }}</strong>
        </div>
        <div class="inormation-row" v-if="video.actor.totalVideos > 3">
          You can watch other
          <strong>{{ video.actor.totalVideos }}</strong> videos of
          <strong
            ><NuxtLink :to="'/all-girls/' + video.actor.slug">
              {{ video.actor.name }}</NuxtLink
            ></strong
          >
          on SKBJ.tv
        </div>
      </div>
      <client-only>
        <h1 class="page-title" style="margin-top: 20px">More Videos</h1>
        <div class="cards-wrapper" v-if="pendingRecommended2">
          <VideoCardLoading
            v-for="index in Array.from({ length: 10 }, (v, k) => k + 1)"
            :key="index"
          ></VideoCardLoading>
        </div>
        <div class="cards-wrapper" v-else>
          <VideoCard
            v-for="(video, index) in videosRecommended2"
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
            :cost="video.cost"
            :isVIP="video.tags.includes('643adac05767bb0f8517fec8')"
          ></VideoCard>
        </div>
        <h1 class="page-title" style="margin-top: 20px">Recent Videos</h1>
        <div class="cards-wrapper" v-if="pendingRecommended3">
          <VideoCardLoading
            v-for="index in Array.from({ length: 10 }, (v, k) => k + 1)"
            :key="index"
          ></VideoCardLoading>
        </div>
        <div class="cards-wrapper" v-else>
          <VideoCard
            v-for="(video, index) in videosRecommended3.videos"
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
            :cost="video.cost"
            :isVIP="video.tags.includes('643adac05767bb0f8517fec8')"
          ></VideoCard>
        </div>
      </client-only>
      <br />
      <br />
      <!-- <div v-if="isAccountLoggedIn">
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
      </Comment> -->
    </div>
    <div class="main-video-wrapper" v-if="video.cost > 0">
      <div class="player-wrapper">
        <!-- Enable premium video -->
        <div
          v-if="
            video.cost > 0 &&
            !accountDetails.purchasedVideos.includes(video._id)
          "
          class="premium-container"
        >
          <img
            :src="video.thumbnail"
            :alt="video.name"
            style="filter: blur(25px)"
          />

          <div class="overlay">
            <div class="premium-wrapper">
              <div class="premium-message">
                You can purchase this video for {{ video.cost }} coins
                <br /><br />
                <!-- {{ video.cost }} Coins = {{ video.cost / 10 }}$ <br /> -->
                100 Coins = 10$ <br />
                Your current Coins: {{ accountDetails.credit }}
                <!-- <div style="margin-top: 4px" v-if="!isAccountLoggedIn">
                  (5$ / 30 days) 
                </div> -->
              </div>
              <PurchaseCredits
                v-if="isAccountLoggedIn && accountDetails.credit < video.cost"
              ></PurchaseCredits>
              <div v-else-if="isAccountLoggedIn">
                <button
                  class="purchase-button-link"
                  v-if="!purchaseClicked"
                  @click="purchaseClicked = true"
                >
                  Purchase Video
                </button>
                <div v-else>
                  Are you sure?
                  <button class="purchase-button-link" @click="purchaseVideo">
                    Yes
                  </button>
                  <button
                    class="purchase-button-link red-btt"
                    @click="purchaseClicked = false"
                  >
                    No
                  </button>
                </div>
              </div>
              <div v-if="!isAccountLoggedIn">
                Please <NuxtLink to="/register">create an account</NuxtLink> and
                purchase Coins <br /><br />
                Or go to <NuxtLink to="/login">Login</NuxtLink>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div>
            <iframe
              :src="
                'https://iframe.mediadelivery.net/embed/141502/' +
                route.params.id
              "
              loading="lazy"
              style="
                border: none;
                position: absolute;
                top: 0;
                height: 100%;
                width: 100%;
              "
              allow="accelerometer; gyroscope; encrypted-media; picture-in-picture;"
              allowfullscreen="true"
              v-if="sourceSB && video.createdAt > '2023-07-26T00:19:34.582Z'"
            ></iframe>
            <IFRAME
              :src="'https://sbhight.com/e/' + route.params.id + '.html'"
              FRAMEBORDER="0"
              MARGINWIDTH="0"
              MARGINHEIGHT="0"
              SCROLLING="NO"
              WIDTH="640"
              HEIGHT="360"
              allowfullscreen
              v-if="sourceSB && video.createdAt <= '2023-07-26T00:19:34.582Z'"
            ></IFRAME>
            <IFRAME
              :src="'https://guccihide.com/e/' + video.uploadID2"
              FRAMEBORDER="0"
              MARGINWIDTH="0"
              MARGINHEIGHT="0"
              SCROLLING="NO"
              WIDTH="640"
              HEIGHT="360"
              allowfullscreen
              v-if="sourceHide && video.createdAt <= '2023-07-26T00:19:34.582Z'"
            ></IFRAME>
            <IFRAME
              :src="'https://streamwish.to/e/' + video.uploadID3"
              FRAMEBORDER="0"
              MARGINWIDTH="0"
              MARGINHEIGHT="0"
              SCROLLING="NO"
              WIDTH="640"
              HEIGHT="360"
              allowfullscreen
              v-if="sourceWish && video.createdAt <= '2023-07-26T00:19:34.582Z'"
            ></IFRAME>
            <PremiumPlayer
              v-if="sourceVIP"
              :source="secureVideoUrl"
            ></PremiumPlayer>
          </div>
          <div class="players-selection">
            <div class="player-source" @click="changeToSB">Source 1</div>
            <div
              class="player-source"
              @click="changeToHide"
              v-if="
                video.createdAt >= '2023-05-02T05:55:10.089+00:00' &&
                video.createdAt <= '2023-07-26T00:19:34.582Z'
              "
            >
              Source 2
            </div>
            <div
              class="player-source"
              @click="changeToWish"
              v-if="
                video.createdAt >= '2023-05-10T06:08:02.528+00:00' &&
                video.createdAt <= '2023-07-26T00:19:34.582Z'
              "
            >
              Source 3
            </div>
            <div
              class="player-source"
              @click="changeToVIP"
              v-if="video.createdAt >= '2023-05-01T22:07:18.813+00:00'"
            >
              VIP Source
            </div>
          </div>
        </div>
      </div>
      <div class="title">
        <h1>
          {{ video.name }} -
          <NuxtLink
            :to="'/all-categories/' + video.category.slug"
            style="text-transform: capitalize; text-decoration: underline"
            >{{ video.category.name }}</NuxtLink
          >
        </h1>
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
        <div
          class="premium-download"
          v-if="video.createdAt > '2023-05-01T22:07:18.813Z'"
        >
          <n-button
            :theme="$darkTheme"
            :theme-overrides="$themeOverrides"
            @click="downloadFile"
            v-if="accountDetails.purchasedVideos.includes(video._id)"
          >
            VIP Download
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
      <div class="video-information">
        <h3 style="margin-bottom: 10px; font-weight: 600; font-size: 18px">
          More Information:
        </h3>
        <div class="inormation-row">
          Video added
          <strong> {{ $timeAgo.format(new Date(video.createdAt)) }}</strong>
        </div>
        <div class="inormation-row">
          The name of the BJ is
          <strong>{{ video.actor.name }}</strong>
        </div>
        <div class="inormation-row">
          The video was watched by
          <strong> {{ video.views.views }}</strong> people and has been added to
          the favorite list <strong>{{ video.likes.length }}</strong> times
        </div>
        <div class="inormation-row">
          Duration <strong> {{ $timeFormat(video.duration) }}</strong>
        </div>
        <div class="inormation-row" v-if="video.actor.totalVideos > 3">
          You can watch other
          <strong>{{ video.actor.totalVideos }}</strong> videos of
          <strong
            ><NuxtLink :to="'/all-girls/' + video.actor.slug">
              {{ video.actor.name }}</NuxtLink
            ></strong
          >
          on SKBJ.tv
        </div>
      </div>
      <client-only>
        <h1 class="page-title" style="margin-top: 20px">More Videos</h1>
        <div class="cards-wrapper" v-if="pendingRecommended2">
          <VideoCardLoading
            v-for="index in Array.from({ length: 10 }, (v, k) => k + 1)"
            :key="index"
          ></VideoCardLoading>
        </div>
        <div class="cards-wrapper" v-else>
          <VideoCard
            v-for="(video, index) in videosRecommended2"
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
            :cost="video.cost"
            :isVIP="video.tags.includes('643adac05767bb0f8517fec8')"
          ></VideoCard>
        </div>
        <h1 class="page-title" style="margin-top: 20px">Recent Videos</h1>
        <div class="cards-wrapper" v-if="pendingRecommended3">
          <VideoCardLoading
            v-for="index in Array.from({ length: 10 }, (v, k) => k + 1)"
            :key="index"
          ></VideoCardLoading>
        </div>
        <div class="cards-wrapper" v-else>
          <VideoCard
            v-for="(video, index) in videosRecommended3.videos"
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
      </client-only>
      <br />
      <br />
      <!-- <div v-if="isAccountLoggedIn">
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
      </Comment> -->
    </div>
    <div class="sidebar-wrapper" v-if="pendingRecommended">
      <VideoCardLoading
        v-for="index in Array.from({ length: 10 }, (v, k) => k + 1)"
        :key="index"
      ></VideoCardLoading>
    </div>
    <div class="sidebar-wrapper" v-else>
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
        :cost="video.cost"
        :isVIP="video.tags.includes('643adac05767bb0f8517fec8')"
      ></VideoCard>
    </div>
  </div>
</template>

<script setup>
import { toast } from "vue3-toastify";
import { useAccountInfo } from "~/store/accountInfo";
import { storeToRefs } from "pinia";
import crypto from 'crypto-js';

// import DOMPurify from "dompurify";
const headers = useRequestHeaders(["cookie"]);
const router = useRouter();
// const formData = reactive({ commentBody: "" });
// let comments = ref([]);
const accountInfoStore = useAccountInfo();
const { isAccountLoggedIn, accountDetails } = storeToRefs(accountInfoStore);
const route = useRoute();
const cookieVideoId = useCookie("cookieVideoId");
const title = ref("");
const videoIdSEO = ref("");
const actorName = ref("");
const videoThumb = ref("");
const isLiked = ref(false);
const sourceSB = ref(true);
const sourceHide = ref(false);
const sourceWish = ref(false);
const sourceVIP = ref(false);
const purchaseClicked = ref(false);
const likesCount = ref(0);

const cookieValue = cookieVideoId.value || "";
const cookieName = "cookieVideoId";
const estimatedSize = (cookieName.length + cookieValue.length + 1) * 2; // +1 for the equals sign
const secureVideoUrl = ref(null);


const showAd = ref(true)

const hideAd = () => {
  showAd.value = false
}

async function deleteMany() {
  await $fetch(`https://skbj.tv/api/videos/deleteMany`, {
    method: "DELETE",
    body: {
      videoId: video.value._id,
    },
  });
}

const changeToSB = () => {
  sourceSB.value = true;
  sourceVIP.value = false;
  sourceHide.value = false;
  sourceWish.value = false;
};

const changeToHide = () => {
  sourceSB.value = false;
  sourceVIP.value = false;
  sourceHide.value = true;
  sourceWish.value = false;
};

const changeToWish = () => {
  sourceSB.value = false;
  sourceVIP.value = false;
  sourceHide.value = false;
  sourceWish.value = true;
};

const changeToVIP = () => {
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
    toast("This is a VIP feature!", {
      theme: "dark",
      type: "error",
      autoClose: true,
      toastClassName: "custom-wrapper error",
      closeOnClick: true,
    });
    return;
  }

  if (accountDetails.value.isUserPremium) {
    sourceSB.value = false;
    sourceVIP.value = true;
    sourceHide.value = false;
  }
};

async function purchaseVideo() {
  await $fetch(`https://skbj.tv/api/users/purchaseVideo`, {
    method: "POST",
    body: {
      userId: accountDetails.value._id,
      videoId: video.value._id,
      creditCost: video.value.cost,
    },

    async onResponse(res) {
      await $fetch(`https://skbj.tv/api/users/getInfo`, {
        server: false,
        credentials: "include",

        onResponse(res) {
          accountInfoStore.updateAccountInfo(res.response._data.userDB);
        },
      });
    },
  });
}

// async function writeComment() {
//   const sanitizedComment = DOMPurify.sanitize(formData.commentBody);

//   await $fetch(`https://skbj.tv/api/comments/${video.value._id}`, {
//     method: "POST",
//     body: {
//       commentBody: sanitizedComment,
//       author: accountDetails.value._id,
//       videoId: video.value._id,
//     },
//   });
// }

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

  if (isLiked.value) {
    likesCount.value++;
  } else {
    likesCount.value--;
  }

  fetch(`https://skbj.tv/api/videos/like/${video.value._id}`, {
    credentials: "include",
  });
};

const downloadFile = async () => {
  try {
    const blobName = video.value.fileName; // Replace with the actual video filename
    const downloadUrl = `https://skbj.tv/api/videos/download/${encodeURIComponent(
      blobName
    )}`;

    // // Check if the file exists
    // const existsResponse = await fetch(
    //   `https://skbj.tv/api/videos/fileExists/${encodeURIComponent(
    //     blobName
    //   )}`
    // );
    // if (!existsResponse.ok) {
    //   toast("There was an error! The file not found", {
    //     theme: "dark",
    //     type: "error",
    //     autoClose: true,
    //     toastClassName: "custom-wrapper error",
    //     closeOnClick: true,
    //   });
    //   throw new Error("Error checking file existence");
    // }
    // const { exists } = await existsResponse.json();

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
      toast("This is a VIP feature!", {
        theme: "dark",
        type: "error",
        autoClose: true,
        toastClassName: "custom-wrapper error",
        closeOnClick: true,
      });
      return;
    }

    if (
      new Date(video.value.createdAt) <
      new Date("2023-05-01T22:07:18.813+00:00")
    ) {
      toast("VIP download not available for this video!", {
        theme: "dark",
        type: "error",
        autoClose: true,
        toastClassName: "custom-wrapper error",
        closeOnClick: true,
      });
      return;
    }
    // Create an anchor element and set its href to the download URL
    if (
      new Date(video.value.createdAt) <
      new Date("2023-05-01T22:07:18.813+00:00")
    ) {
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = blobName;

      // Add the link to the document, trigger a click, and remove it after the download starts
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        document.body.removeChild(link);
      }, 100);
    } else {
      const link = document.createElement("a");
      link.href =secureVideoUrl.value;
      link.download = blobName;

      // Set the target attribute to open the link in a new tab
      link.setAttribute("target", "_blank");

      // Add the link to the document, trigger a click, and remove it after the download starts
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        document.body.removeChild(link);
      }, 100);
    }
  } catch (error) {
    console.error("Error downloading file:", error);
  }
};

const { pending, data: video } = await useFetch(
  `https://skbj.tv/api/videos/${route.params.id}`,
  {
    server: true,
    credentials: "include",
    headers,
    onResponse(res) {
      if (res.response.status === 200) {
        title.value = res.response._data.name;
        actorName.value = res.response._data.actor.name;
        videoThumb.value = res.response._data.thumbnail;
        likesCount.value = res.response._data.likes.length;
        videoIdSEO.value = res.response._data.uploadID;

        // Set isLiked.value based on whether accountDetails._id is in the likes array
        isLiked.value = res.response._data.likes.includes(
          accountDetails.value._id
        );

        if (estimatedSize > 5000) {
          cookieVideoId.value = null;
        }

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
  }
);

// setTimeout(async () => {
//   await useLazyFetch(`https://skbj.tv/api/comments/${video.value._id}`, {
//     onResponse(res) {
//       comments.value = { ...res.response._data };
//     },
//     server: true,
//   });
// }, 250);

onServerPrefetch(() => {
  useHead({
    title: `Watch ${actorName.value} BJ ${title.value} Korean BJ Video Online In High Quality - Skbj.TV`,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: `Watch ${actorName.value} BJ ${title.value} The Best Korean BJ Cam Girl Videos Online In High Quality`,
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
    script: [
      {
        type: "application/ld+json",
        json: {
          "@context": "https://schema.org",
          "@type": "VideoObject",
          name: title.value,
          description: `Watch ${title.value} BJ video online. Free Sexy Korean BJ in high quality.`,
          thumbnailUrl: videoThumb.value,
          embedUrl: `https://sbhight.com/e/${videoIdSEO.value}.html`, // Replace 'videoId' with the appropriate value
          publisher: {
            "@type": "Organization",
            name: "Skbj.TV",
            logo: {
              "@type": "ImageObject",
              url: "https://skbj.tv/images/skbjlogo.png", // Replace with the actual logo URL
              width: 633,
              height: 191,
            },
          },
        },
      },
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

function generateSecureUrl() {
  const path = `/videos/${video.value.fileName}`;
  const expirationTime = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now
  const secret = '4048154d-7385-440a-bdb2-bbdda57c0619'; 

  // Construct the base string to hash
  const baseString = secret + path + expirationTime;
  
  // Generate the raw SHA256 hash
  let tokenHash = crypto.SHA256(baseString);
  
  // Convert to Base64
  tokenHash = crypto.enc.Base64.stringify(tokenHash);
  
  // Replace certain characters in the resulting Base64 string
  tokenHash = tokenHash.replace('\n', '').replace('+', '-').replace('/', '_').replace('=', '');

  // Construct the secure URL
  return `https://skbjvid.b-cdn.net${path}?token=${tokenHash}&expires=${expirationTime}`;
}

onMounted(() => {
  secureVideoUrl.value = generateSecureUrl();

  if (title.value) {
    useHead({
      title: `Watch ${actorName.value} BJ ${title.value} Korean BJ Video Online In High Quality - Skbj.TV`,
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content: `Watch ${actorName.value} BJ ${title.value} The Best Korean BJ Cam Girl Videos Online In High Quality`,
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
      script: [
        {
          type: "application/ld+json",
          json: {
            "@context": "https://schema.org",
            "@type": "VideoObject",
            name: title.value,
            description: `Watch ${title.value} BJ video online. Free Sexy Korean BJ in high quality.`,
            thumbnailUrl: videoThumb.value,
            embedUrl: `https://sbhight.com/e/${videoIdSEO.value}.html`, // Replace 'videoId' with the appropriate value
            publisher: {
              "@type": "Organization",
              name: "Skbj.TV",
              logo: {
                "@type": "ImageObject",
                url: "https://skbj.tv/images/skbjlogo.png", // Replace with the actual logo URL
                width: 633,
                height: 191,
              },
            },
          },
        },
      ],
    });
  }
});

const { pending: pendingRecommended, data: videosRecommended } =
  await useLazyFetch(`https://skbj.tv/api/videos/random`, {
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
const { pending: pendingRecommended2, data: videosRecommended2 } =
  await useLazyFetch(`https://skbj.tv/api/videos/random`, {
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
const { pending: pendingRecommended3, data: videosRecommended3 } =
  await useLazyFetch(`https://skbj.tv/api/videos`, {
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
.purchase-button-link {
  background: none;
  border: none;
  padding: 0;
  color: #4caf50; /* A shade of green */
  text-decoration: underline;
  cursor: pointer;
  font-family: inherit;
  font-size: inherit;
  font-weight: bold; /* Bold text for emphasis */
  outline: none;
  transition: color 0.3s ease; /* Smooth transition for hover effect */
}
.red-btt {
  color: red;
  margin-left: 10px;
  &:hover {
    color: red !important;
  }
}

.purchase-button-link:hover {
  color: #388e3c; /* A darker shade of green for hover */
  text-decoration: none; /* Remove underline on hover */
}

.purchase-button-link:focus {
  outline: auto;
}

.snapshots {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  img {
    margin: 4px;
    max-width: 100%;
  }
}
.cards-wrapper {
  display: flex;
  flex-wrap: wrap;
}
.top-wrapper {
  display: flex;
  .main-video-wrapper {
    width: calc(100% - 324px);

    .add-juicy {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 2;

      .close {
        cursor: pointer;
        top: -31px;
        right: 0;
        position: absolute;
        z-index: 10;
        color: #fff;
        background-color: #353535;
        padding: 10px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
        border: 1px solid #818181ab;
      }
    }
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
        display: block;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        overflow: hidden;
      }

      .premium-container {
        img {
          width: 100%;
          height: 100%;
        }

        .overlay {
          position: absolute;
          z-index: 1;
          color: #ffffff;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
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

.players-selection {
  position: absolute;
  bottom: -50px;
  display: flex;
  overflow-x: auto;
  width: 100%;

  .player-source {
    display: inline-block;
    background-color: #262626;
    padding: 10px 14px;
    margin: 8px 5px;
    border-radius: 4px;
    text-transform: capitalize;
    transition-duration: 0.1s;
    transition-timing-function: ease-in-out;
    cursor: pointer;
    white-space: nowrap;

    &:first-of-type {
      margin-left: 0;
    }
    &:hover {
      background-color: #353535;
    }
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
  margin: 66px 0 16px 0;
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

.video-information {
  max-width: 650px;
  background-color: #272727;
  padding: 10px;
  border-radius: 8px;
  margin: 10px auto;
  text-align: left;
  .inormation-row {
    margin-bottom: 10px;
  }
  strong {
    font-weight: 600;
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
