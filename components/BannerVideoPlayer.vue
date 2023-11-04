<template>
    <div id="ad-container">
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  onMounted(() => {
    // Append the first external script
    const script1 = document.createElement('script');
    script1.type = 'text/javascript';
    script1.dataset.cfasync = 'false';
    script1.async = true;
    script1.src = 'https://poweredby.jads.co/js/jads.js';
    document.body.appendChild(script1);
  
    // Append the ins tag
    const insTag = document.createElement('ins');
    insTag.id = '1036423';
    insTag.dataset.width = '300';
    insTag.dataset.height = '262';
    document.getElementById('ad-container').appendChild(insTag);
  
    // Append the second external script
    const script2 = document.createElement('script');
    script2.type = 'text/javascript';
    script2.dataset.cfasync = 'false';
    script2.async = true;
    script2.textContent = `(adsbyjuicy = window.adsbyjuicy || []).push({'adzone':1036423});`;
    document.body.appendChild(script2);
  });
  
  </script>
  