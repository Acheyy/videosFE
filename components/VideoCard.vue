<template>
  <NuxtLink :to="'/videos/' + uploadID" class="card-wrapper">
    <div class="thumnail">
      <img :src="thumbnail" loading="lazy" />
      <div class="duration-wrapper">
        {{ $timeFormat(duration) }}
      </div>
    </div>
    <div class="details">
      <div class="avatar">
        <img :src="actor.thumbnail" :title="actor.name" :alt="actor.name" />
      </div>
      <div class="main-details">
        <div class="main-title">{{ name }}</div>
        <div class="meta-info">
          <div class="meta-category">{{ category.name }}</div>
          <div class="meta-details">
            {{ views.views }} views * {{ $timeAgo.format(new Date(date)) }}
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
const props = defineProps([
  "uploadID",
  "thumbnail",
  "duration",
  "name",
  "date",
  "actor",
  "category",
  "views",
]);
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

@media only screen and (max-width: 1970px) {
  .card-wrapper {
    width: calc(20% - 16px);
    padding: 6px;
    margin: 2px;
  }
}
</style>
