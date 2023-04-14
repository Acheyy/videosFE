<template>
    <div v-if="updateAvailable" class="update-notification" @click="refreshPage">
      A new version of the website is available. Click here to refresh the page and update to the latest updates.
    </div>
  </template>
  
  <script setup>  
  const updateAvailable = ref(false);
  let currentVersion = '';
  
  const refreshPage = () => {
    window.location.reload();
  };
  
  onMounted(async () => {
    const response = await fetch('/version.json');
    const data = await response.json();
    currentVersion = data.version;
  
    setInterval(async () => {
      const newResponse = await fetch('/version.json');
      const newData = await newResponse.json();
      if (newData.version !== currentVersion) {
        updateAvailable.value = true;
      }
    }, 120000); // Check for updates every 120 seconds (you can adjust this value as needed)
  });
  </script>
  
  <style lang="scss" scoped>
.update-notification {
  position: fixed;
  bottom: 0;
  right: 0;
  background-color: #222222;
  color: white;
  padding: 16px;
  border-radius: 5px;
  margin: 10px;
  z-index: 1000;
  max-width: 300px;
  line-height: 20px;
  cursor: pointer;
  border: 1px solid #2e2e2e;
  transition-duration: 0.1s;
  transition-timing-function: ease-in-out;
  animation: slide-in 0.5s ease-out;

  &:hover {
    border-color: #cacaca;
  }
}

@keyframes slide-in {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0);
  }
}
  </style>
  