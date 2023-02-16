<template>
  <IFRAME
    :src="'https://sbhight.com/e/' + route.params.id + '.html'"
    FRAMEBORDER="0"
    MARGINWIDTH="0"
    MARGINHEIGHT="0"
    SCROLLING="NO"
    WIDTH="640"
    HEIGHT="360"
    allowfullscreen
  ></IFRAME>
  <button @click="deleteVideo()">Delete</button>
</template>

<script setup>
const route = useRoute();

async function deleteVideo() {
  await $fetch(`http://localhost:3030/videos?videoId=${route.params.id}`, {
    method: "DELETE",
  });
}

const { pending, data: videos } = await useLazyFetch(
  `https://api.streamsb.com/api/file/info?key=66418reck8nac228fzn2j&file_code=${route.params.id}`
);
</script>
