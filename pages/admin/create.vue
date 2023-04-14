<template>
  <div class="upload-wrapper" v-if="accountDetails.isAdmin">
    <input
      type="file"
      id="video"
      name="video"
      accept="video/mp4, .mp4"
      class="drop-zone margin"
      @change="handleFileSelection($event)"
    />
    <input
      id="name-input"
      class="text-input margin"
      type="text"
      :value="nameInput"
      @keyup="handleNameInput($event)"
    />
    Category:
    <div class="margin">
      <template v-for="(category, index) in categories" :key="index">
        <input
          type="radio"
          name="category"
          :value="category.name"
          :id="category.name"
          @click="handleCategorySelect($event, category._id)"
        />
        <label :for="category.name">{{ category.name }}</label>
      </template>
    </div>
    <div class="margin">
      Tags:
      <template v-for="(tag, index) in tagsData" :key="index">
        <input
          @change="handleTagSelect($event, tag._id)"
          type="checkbox"
          name="tag"
          :value="tag.name"
          :id="tag.name"
        />
        <label :for="tag.name">{{ tag.name }}</label>
      </template>
    </div>
    <div class="margin">
      Actor:
      <template v-for="(actor, index) in actorsData" :key="index">
        <input
          type="radio"
          name="actor"
          :value="actor.name"
          :id="actor.name"
          @click="handleActorelect($event, actor._id)"
        />
        <label :for="actor.name">{{ actor.name }}</label>
      </template>
    </div>
    Name:
    {{ nameInput }}
    <br />
    Category:
    {{ category }}
    <br />
    Tags:
    {{ tags }}
    <br />
    Actor:
    {{ actor }}
    <br />
    <button @click="submitVideo()" class="margin">Submit</button>
  </div>
</template>

<script setup>
import { toast } from "vue3-toastify";
import { useAccountInfo } from "~/store/accountInfo";
import { storeToRefs } from "pinia";
const accountInfoStore = useAccountInfo();
const { isAccountLoggedIn, accountDetails } = storeToRefs(accountInfoStore);

const files = ref([]);
let nameInput = ref("");
let category = ref("");
let categoryId = ref("");
let actor = ref("");
let actorId = ref("");
let tags = ref([]);
let tagIds = ref([]);

const handleFileSelection = (event) => {
  let uploadedFiles = event.target.files;
  files.value = uploadedFiles;
  nameInput.value = files.value[0].name.split(".").slice(0, -1).join(".");
};
const handleNameInput = (event) => {
  nameInput.value = event.target.value;
  console.log(event.target.value);
};
const handleCategorySelect = (event, ID) => {
  category.value = event.target.value;
  categoryId.value = ID;
};
const handleActorelect = (event, ID) => {
  actor.value = event.target.value;
  actorId.value = ID;
};
const handleTagSelect = (event, ID) => {
  if (event.target.checked) {
    tags.value.push(event.target.value);
    tagIds.value.push(ID);
  } else {
    tags.value = tags.value.filter((e) => e !== event.target.value);
    tagIds.value = tagIds.value.filter((e) => e !== ID);
  }
};

async function captureThumbnail(videoFile, time) {
  return new Promise((resolve) => {
    const video = document.createElement("video");
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    video.addEventListener("loadeddata", () => {
      video.currentTime = time;
    });

    video.addEventListener("seeked", () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        resolve(blob);
      }, "image/jpeg");
    });

    video.src = URL.createObjectURL(videoFile);
  });
}

async function getVideoDuration(videoFile) {
  return new Promise((resolve) => {
    const video = document.createElement("video");

    video.addEventListener("loadedmetadata", () => {
      resolve(video.duration);
    });

    video.src = URL.createObjectURL(videoFile);
  });
}

async function submitVideo() {
  let formData = new FormData();
  console.log("tagIds.value", tagIds.value);
  formData.append("name", nameInput.value);
  formData.append("category", categoryId.value);
  formData.append("tags[]", tagIds.value);
  formData.append("actor", actorId.value);
  formData.append("video", files.value[0]);
  console.log(formData.values);
  // Get video duration
  const duration = await getVideoDuration(files.value[0]);

  // Calculate the times at which to capture the thumbnails based on percentages
  const captureTimes = [0.1, 0.3, 0.6, 0.8].map(
    (percentage) => duration * percentage
  );

  // Capture thumbnails from the video
  const thumbnails = await Promise.all(
    captureTimes.map((time) => captureThumbnail(files.value[0], time))
  );

  // Append thumbnails to formData
  thumbnails.forEach((thumbnail, index) => {
    formData.append(
      `thumbnail${index + 1}`,
      thumbnail,
      `thumbnail${index + 1}.jpg`
    );
  });

  await $fetch(`http://localhost:3030/api/videos`, {
    method: "POST",
    body: formData,
    onResponse() {
      toast("Video Added!", {
        theme: "dark",
        type: "success",
        autoClose: true,
        toastClassName: "custom-wrapper error",
        closeOnClick: true,
      });
    },
  });
}
const { data: categories } = await useFetch(
  `http://localhost:3030/api/categories `
);
const { data: tagsData } = await useFetch(`http://localhost:3030/api/tags `);
const { data: actorsData } = await useFetch(
  `http://localhost:3030/api/actors `
);
</script>

<style scoped lang="scss">
.drop-zone {
  width: 500px;
  height: 100px;
  border: 1px dashed grey;
}
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
