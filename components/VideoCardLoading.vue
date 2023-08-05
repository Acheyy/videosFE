<template>
  <div class="card-wrapper">
    <div class="thumnail"></div>
    <div class="details">
      <div class="avatar"></div>
      <div class="main-details">
        <div class="main-title"></div>
        <div class="meta-info">
          <div class="meta-category"></div>
          <div class="meta-details">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

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


  .thumnail {
    width: 100%;
    display: block;
    position: relative;
    flex: none;
    background-color: rgb(0, 0, 0);
    border-radius: 8px;

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
  }
  .details {
    display: flex;
    padding-right: 24px;

    .main-title {
      background-color: #131313;
      border-radius: 3px;
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
      height: 44px;
      width: 100px;
    }
    .meta-info {
      display: flex;
      flex-direction: column;
      font-size: 14px;
      color: #aaa;
      line-height: 20px;

      .meta-category {
        height: 20px;
        background-color: #131313;
        border-radius: 3px;
        width: 70px;
      }
      .meta-details {
        height: 40px;
        background-color: #131313;
        border-radius: 3px;
        width: 40px;
      }
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
