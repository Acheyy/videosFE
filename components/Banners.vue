<template>
  <a
    data-v-dc30061e=""
    data-v-02281a80=""
    href="https://l.hyenadata.com/s/25YR5q"
    class="card-wrapper"
    title="kbj23030731_dbdms139_20221221"
    alt="kbj23030731_dbdms139_20221221"
    target="_blank"
    ><div data-v-dc30061e="" class="thumnail">
      <img
        data-v-dc30061e=""
        :src="randomImg"
        alt="kbj23030731_dbdms139_20221221"
        loading="lazy"
        data-NuxtImg=""
        title="kbj23030731_dbdms139_20221221"
      />
      <div data-v-dc30061e="" class="duration-wrapper">AD</div>
    </div>
    <div data-v-dc30061e="" class="details">
      <div data-v-dc30061e="" class="avatar">
        <img
          data-v-dc30061e=""
          format="webp"
          src="https://skbj.b-cdn.net/actors/unknown.webp"
          loading="lazy"
          title="dbdms139"
          alt="dbdms139"
        />
      </div>
      <div data-v-dc30061e="" class="main-details">
        <div data-v-dc30061e="" class="main-title">
            체리테일 - 무료 뉴 헨타이 게임하기 Free Hentai Game
        </div>
        <div data-v-dc30061e="" class="meta-info">
          <div data-v-dc30061e="" class="meta-category">CherryTale</div>
          <div data-v-dc30061e="" class="meta-details">
            Online Game
          </div>
        </div>
      </div>
    </div></a
  >
</template>

<script setup>
const imgs = [
  'https://skbj.b-cdn.net/random/cherryTale1.webp',
  'https://skbj.b-cdn.net/random/cherrytale2.webp',
  'https://skbj.b-cdn.net/random/cherrytale3.webp'
]

const randomImg = ref('') // This will hold the randomly selected image URL

onMounted(() => {
  randomImg.value = imgs[Math.floor(Math.random() * imgs.length)]
})
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
    padding: 2px;
    margin: 2px 2px 10px 2px;
  }
}
</style>
