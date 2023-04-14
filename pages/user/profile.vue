<template>
  <div v-if="isAccountLoggedIn">
    <div class="profile-section">
      <div class="left-side">
        <img :src="accountDetails.avatar" />
      </div>
      <div class="right-side">
        <div>Username: {{ accountDetails.userName }}</div>
        <div>Email: {{ accountDetails.email }}</div>
        <div>Is Account Premium: {{ accountDetails.isUserPremium }}</div>
        <UpgradeToPremiumButton
          v-if="!accountDetails.isUserPremium"
        ></UpgradeToPremiumButton>
        <div
          style="margin-top: 10px"
          v-if="accountDetails.isUserPremium"
        >
          Premium Expires:
          {{ $timeAgo.format(new Date(accountDetails?.premiumExpiry)) }}
        </div>
      </div>
    </div>

    <Loading v-if="pendingLiked"></Loading>
    <div v-else>
      <div class="cards-title">Liked Videos:</div>
      <div class="cards-wrapper" v-if="videosLiked.videos.length">
        <VideoCard
          v-for="(video, index) in videosLiked.videos"
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
      <div v-else style="margin-top: 20px">No liked videos..</div>
    </div>

    <Loading v-if="pending"></Loading>
    <div v-else>
      <div class="cards-title">Recently Watched:</div>
      <div class="cards-wrapper" v-if="videosHistory.videos.length">
        <VideoCard
          v-for="(video, index) in videosHistory.videos"
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
      <div v-else style="margin-top: 20px">No videos in the history..</div>
    </div>
  </div>
  <div v-else>
    Please <NuxtLink to="/login">Login</NuxtLink> to view your profile..
  </div>
</template>

<script setup>
import { useAccountInfo } from "~/store/accountInfo";
import { storeToRefs } from "pinia";

const accountInfoStore = useAccountInfo();
const { accountDetails, isAccountLoggedIn } = storeToRefs(accountInfoStore);

const headers = useRequestHeaders(["cookie"]);

const { pending, data: videosHistory } = await useLazyFetch(
  `http://localhost:3030/api/users/getUserHistory`,
  {
    onResponseError() {
      toast("There was an error!", {
        theme: "dark",
        type: "error",
        autoClose: false,
        toastClassName: "custom-wrapper error",
        closeOnClick: false,
      });
    },
    server: true,
    credentials: "include",
    headers,
  }
);
const { pending: pendingLiked, data: videosLiked } = await useLazyFetch(
  `http://localhost:3030/api/users/getUserLiked`,
  {
    onResponseError() {
      toast("There was an error!", {
        theme: "dark",
        type: "error",
        autoClose: false,
        toastClassName: "custom-wrapper error",
        closeOnClick: false,
      });
    },
    server: true,
    credentials: "include",
    headers,
  }
);
</script>

<style scoped lang="scss">
.cards-wrapper {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 40px;
}

.margin-top {
  margin-top: 40px;
}
.cards-title {
  font-size: 24px;
}

.profile-section {
  display: flex;
  align-items: center;
  justify-content: center;
  .left-side {
    max-width: 200px;
    margin-right: 10px;
    img {
      width: 100%;
    }
  }
  .right-side {
    div {
      margin-bottom: 4px;
    }
  }
}
</style>
