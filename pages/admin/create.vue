<template>
  <div class="upload-wrapper">
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
    <div class="margin">
      Category:
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
  nameInput.value = files.value[0].name;
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
async function submitVideo() {
  let formData = new FormData();
  console.log("tagIds.value", tagIds.value)
  formData.append("name", nameInput.value);
  formData.append("category", categoryId.value);
  formData.append("tags[]", tagIds.value);
  formData.append("actor", actorId.value);
  formData.append("video", files.value[0]);
  console.log(formData.values);
  await $fetch("http://localhost:3030/videos", {
    method: "POST",
    body: formData,
  });
}
const { data: categories } = await useFetch(
  "http://localhost:3030/categories "
);
const { data: tagsData } = await useFetch("http://localhost:3030/tags ");
const { data: actorsData } = await useFetch("http://localhost:3030/actors ");
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
