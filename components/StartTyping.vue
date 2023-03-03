<template>
  <div class="custom-wrapperr">
    <span class="back">
      <span>S</span>
      <span>t</span>
      <span>a</span>
      <span>r</span>
      <span>t</span>
      <span></span>
      <span>t</span>
      <span>y</span>
      <span>p</span>
      <span>i</span>
      <span>n</span>
      <span>g</span>
      <span>.</span>
      <span>.</span>
      <span>.</span>
    </span>
  </div>
</template>

<style scoped lang="scss">
@import url(https://fonts.googleapis.com/css?family=Roboto:300);
.back {
  margin: 1em auto;
  font-family: "Roboto";
}
.custom-wrapperr {
  text-align: center;
  margin-top: 70px;
  margin-right: 90px;
}
.back span {
    cursor: default;
  font-size: 3em;
  color: #ffffff;
  display: table-cell;
  padding: 0 15px;
  line-height: 80px;
  animation: jumb 1s infinite;
  border-radius: 8px;
  transition-duration: 0.1s;
  transition-timing-function: ease-in-out;
  &:hover {
    background-color: #ffffff;
    color: #000000;
  }
}
@keyframes jumb {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
    box-shadow: 0 10px 0 rgb(255, 255, 255);
  }
  100% {
    transform: translateY(0px);
  }
}
.back span:nth-child(1) {
  animation-delay: 0s;
}
.back span:nth-child(2) {
  animation-delay: 0.1s;
}
.back span:nth-child(3) {
  animation-delay: 0.2s;
}
.back span:nth-child(4) {
  animation-delay: 0.3s;
}
.back span:nth-child(5) {
  animation-delay: 0.4s;
}
.back span:nth-child(6) {
  animation-delay: 0.5s;
  opacity: 0;
}
.back span:nth-child(7) {
  animation-delay: 0.6s;
}
.back span:nth-child(8) {
  animation-delay: 0.7s;
}
.back span:nth-child(9) {
  animation-delay: 0.8s;
}
.back span:nth-child(10) {
  animation-delay: 0.9s;
}
.back span:nth-child(11) {
  animation-delay: 1s;
}
.back span:nth-child(12) {
  animation-delay: 1.1s;
}
.back span:nth-child(13) {
  animation-delay: 1.2s;
}
.back span:nth-child(14) {
  animation-delay: 1.3s;
}
.back span:nth-child(15) {
  animation-delay: 1.4s;
}
.back span:nth-child(16) {
  animation-delay: 1.5s;
}
.back span:nth-child(17) {
  animation-delay: 1.6s;
}
</style>
