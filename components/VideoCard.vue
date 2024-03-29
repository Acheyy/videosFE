<template>
  <NuxtLink
    :to="'/videos/' + uploadID"
    class="card-wrapper"
    :title="name"
    :alt="name"
    @mouseenter="startThumbnailLoop"
    @mouseleave="stopThumbnailLoop"
    @touchstart="startThumbnailLoop"
    @touchend="stopThumbnailLoop"
  >
    <div class="thumnail">
      <NuxtImg
        format="webp"
        :src="currentThumbnail + '?width=275'"
        loading="lazy"
        :title="name"
        :alt="name"
      />
      <div class="duration-wrapper">
        {{ $timeFormat(duration) }}
      </div>
      <div class="vip" v-if="isVIP" alt="VIP" title="VIP">
        <IconsCrown></IconsCrown>
      </div>
      <div class="coins" v-if="cost > 0 && !accountDetails?.purchasedVideos?.includes(videoId)">
        {{ cost }} <IconsCoin></IconsCoin>
      </div>
    </div>
    <div class="details">
      <div class="avatar">
        <img
          format="webp"
          :src="actor.thumbnail + '?width=40'"
          loading="lazy"
          :title="actor.name"
          :alt="actor.name"
        />
      </div>
      <div class="main-details">
        <div class="main-title">{{ name }}</div>
        <div class="meta-info">
          <div class="meta-category">{{ category.name }}</div>
          <div class="meta-details">
            {{ views?.views }} views * {{ $timeAgo.format(new Date(date)) }}
            <br />

            {{ getLikesText(likes) }}
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
const {
  snapshots,
  uploadID,
  thumbnail,
  duration,
  name,
  date,
  actor,
  category,
  views,
  likes,
  isVIP,
  cost,
  accountDetails,
  videoId
} = defineProps({
  snapshots: Array,
  uploadID: String,
  thumbnail: String,
  duration: Number,
  likes: Number,
  name: String,
  date: String,
  actor: Object,
  category: Object,
  views: Object,
  isVIP: Boolean,
  cost: Number,
  accountDetails: Object,
  videoId: String
});

let currentThumbnail = ref(thumbnail);
let thumbnailInterval;

const startThumbnailLoop = () => {
  if (date <= "2023-07-26T00:19:34.582Z") {
    // Check if snapshots exists and has at least one element
    if (!snapshots || snapshots.length === 0) {
      return;
    }

    if (thumbnailInterval) {
      clearInterval(thumbnailInterval);
    }
    let index = 1;
    thumbnailInterval = setInterval(() => {
      currentThumbnail.value = snapshots[index] + "?width=275";
      index = (index + 1) % snapshots.length;
    }, 700);
  } else {
    currentThumbnail.value = `https://vz-faaf5b6e-df7.b-cdn.net/${uploadID}/preview.webp`;
  }
};

const stopThumbnailLoop = () => {
  clearInterval(thumbnailInterval);
  currentThumbnail.value = thumbnail;
};

function getLikesText(likes) {
  if (likes === null || likes === 0 || likes === undefined) {
    return "Nobody liked :(";
  } else if (likes === 1) {
    return "1 like";
  } else {
    return `${likes} likes`;
  }
}
</script>

<style scoped lang="scss">
.sidebar-wrapper {
  .card-wrapper {
    width: 100%;
  }
}
.card-wrapper {
  width: calc(16.666666% - 16px);
  padding: 6px;
  margin: 2px;
  overflow: hidden;
  transition-duration: 0.1s;
  transition-timing-function: ease-in-out;
  border-radius: 8px;

  &:hover {
    background-color: #272727;
  }

  .thumnail {
    width: 100%;
    display: block;
    position: relative;
    flex: none;

    &::before {
      display: block;
      content: "";
      width: 100%;
      padding-top: 56.25%;
      background-color: var(--yt-spec-10-percent-layer);
    }

    img {
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
      border-radius: 8px;
      object-fit: contain;
      background-color: black;
    }

    .duration-wrapper {
      font-size: 12px;
      position: absolute;
      bottom: 4px;
      right: 4px;
      background-color: #000;
      padding: 2px 4px;
    }
  }
  .details {
    display: flex;
    padding-right: 24px;

    .main-title {
      color: #f1f1f1;
      margin: 12px 0 4px 0;
      font-size: 16px;
      line-height: 22px;
      font-weight: 600;
      overflow: hidden;
      display: block;
      max-height: 44px;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
      white-space: normal;
    }
    .meta-info {
      display: flex;
      flex-direction: column;
      font-size: 14px;
      color: #aaa;
      line-height: 20px;
    }
    .avatar img {
      height: 36px;
      margin-top: 12px;
      margin-right: 12px;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background-color: transparent;
      overflow: hidden;
    }
  }
}

.vip {
  width: 30px;
  font-size: 12px;
  position: absolute;
  top: 6px;
  left: 6px;
  padding: 2px 4px;
  fill: #fff;
  background-color: gold;
  border-radius: 4px;
  border: 2px solid #fff;
}

.coins {
  position: absolute;
    top: 6px;
    right: 6px;
    background-color: #ffffff;
    padding: 4px 10px;
    display: flex;
    align-items: center;
    border-radius: 6px;
    color: #cdad00;
    border: 1px solid gold;


  img {
    background-color: initial !important;
    width: 30px !important;
    position: initial !important;
    height: initial !important;
    margin-left: 6px !important;
    margin-right: initial !important;
    overflow: initial !important;
    display: initial !important;
    top: initial !important;
    right: initial !important;
    bottom: initial !important;
    left: initial !important;
    border-radius: initial !important;
    object-fit: initial !important;
  }
}

@media only screen and (max-width: 1970px) {
  .card-wrapper {
    width: calc(20% - 16px);
    padding: 6px;
    margin: 2px;
  }
}
@media only screen and (max-width: 1650px) {
  .card-wrapper {
    width: calc(20% - 8px);
    padding: 2px;
    margin: 2px;
  }
}
@media only screen and (max-width: 1500px) {
  .card-wrapper {
    width: calc(25% - 8px);
    padding: 2px;
    margin: 2px;
  }
}
@media only screen and (max-width: 992px) {
  .card-wrapper {
    width: calc(33.3333333% - 8px);
    padding: 2px;
    margin: 2px;
  }
}
@media only screen and (max-width: 660px) {
  .card-wrapper {
    width: calc(50% - 8px);
    padding: 2px;
    margin: 2px;
  }
}

@media only screen and (max-width: 480px) {
  .card-wrapper {
    width: 100%;
    padding: 0;
    margin: 2px 2px 10px 2px;
  }
}
</style>
