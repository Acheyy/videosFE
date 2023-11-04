<template>
  <div id="nativeAdContainer"></div>
</template>

<script setup>
import { onMounted } from "vue";

onMounted(() => {
  const script = document.createElement("script");

  script.type = "application/javascript";
  script.dataset.idzone = "5007044";
  script.src = "https://a.magsrv.com/nativeads-v2.js";

  document.getElementById("nativeAdContainer").appendChild(script);
});
</script>

<style>
.exo-native-widget-item-content {
  max-height: 51px !important;
}
.exo-native-widget-item-title {
  color: #fff !important;
}
.exo-native-widget-item-text {
  color: #fff !important;
}
</style>
