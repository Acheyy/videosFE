<template>
  <div class="upload-wrapper">
    userName
    <input
      id="userName"
      class="text-input margin"
      type="text"
      v-model="formData.userName"
    />
    {{ formData.userName }}
    email
    <input
      id="email"
      class="text-input margin"
      type="text"
      v-model="formData.email"
    />
    {{ email }}
    password
    <input
      id="password"
      class="text-input margin"
      type="text"
      v-model="formData.password"
    />
    {{ password }}
    <button @click="submitVideo()" class="margin">Submit</button>
  </div>
</template>

<script setup>
const formData = reactive({ userName: "", email: "", password: "" });

async function submitVideo() {
  await $fetch(`http://localhost:3030/api/users`, {
    method: "POST",
    body: {
      userName: formData.userName,
      email: formData.email,
      password: formData.password,
    },
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
