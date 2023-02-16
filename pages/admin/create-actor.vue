<template>
  <div class="upload-wrapper">
    <input
      id="name-input"
      class="text-input margin"
      type="text"
      :value="nameInput"
      @keyup="handleNameInput($event)"
    />
    <input
      id="thumbnail-input"
      class="text-input margin"
      type="text"
      :value="thumbnailInput"
      @keyup="handleThumbnailInput($event)"
    />
    {{ nameInput }} <br />
    {{ thumbnailInput }}
    <button @click="submitVideo()" class="margin">Submit</button>
  </div>
</template>

<script setup>
const files = ref([]);
let nameInput = ref("");
let thumbnailInput = ref("");

const handleNameInput = (event) => {
  nameInput.value = event.target.value;
  console.log(event.target.value);
};
const handleThumbnailInput = (event) => {
  thumbnailInput.value = event.target.value;
  console.log(event.target.value);
};
async function submitVideo() {
  await $fetch("http://localhost:3030/actors", {
    method: "POST",
    body: { name: nameInput.value, thumbnail: thumbnailInput.value },
  });
}
</script>

<style scoped lang="scss">
.upload-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.margin {
  margin: 20px 0;
}
.text-input {
  width: 500px;
}
</style>
