<template>
  <div class="footer-wrapper">
    <div class="links-container">
      <NuxtLink
        class="link"
        to="/dmca"
      >
        DMCA</NuxtLink
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
.articles-wrapper {
  margin-top: 40px;
}
.article {
  max-width: 800px;
  margin: 0 auto;
  margin-bottom: 20px;
  line-height: 20px;
  text-align: center;
  h3 {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 10px;
  }
  p {
    margin-bottom: 20px;
  }
}
.footer-wrapper {
  color: #fff;
  margin-top: 40px;
  .links-container {
    display: flex;
    flex-wrap: wrap;

    .link {
      display: flex;
      align-items: center;
      padding: 8px 12px;
      border-radius: 8px;
      transition-duration: 0.1s;
      transition-timing-function: ease-in-out;
      img {
        max-width: 30px;
        margin-right: 4px;
      }

      &:hover {
        background-color: #272727;
      }
    }
  }
}
</style>
