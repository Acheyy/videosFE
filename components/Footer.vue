<template>
  <div class="footer-wrapper">
    <div class="links-container">
      <a
        class="link"
        href="https://theporndude.com"
        target="_blank"
        rel="nofollow"
      >
        <img src="/images/tpd.ico" />
        ThePornDude</a
      >
    </div>
    <div>
      <div class="website-message">
        !! Website is being built.. <br />
        Some functionalities might not work properly <br />
        Please use the contact if you have any trouble
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.website-message {
  margin: 0 auto;
  text-align: center;
  font-size: 18px;
  color: red;
  padding: 10px;
  margin-top: 20px;
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
