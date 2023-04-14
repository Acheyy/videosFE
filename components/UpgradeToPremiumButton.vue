<!-- components/UpgradeToPremiumButton.vue -->
<template>
  <div>
    <button class="upgrade-btn" @click="showModal = true">
      Upgrade to Premium
    </button>
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <h2>Upgrade to Premium</h2>
        <p>Upgrade your account to enjoy premium features!</p>
        <br />
        <ul>
          <li>High quality download (1080p and even 2k)</li>
          <li>Access to premium only videos</li>
          <li>... more to come</li>
        </ul>
        <br />

        <p>$4.99 for 30 days</p>
        <PayPal style="margin-top: 20px"></PayPal>
        <!-- Include any additional content or actions related to the premium upgrade -->
        <button class="close-btn" @click="showModal = false">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const showModal = ref(false);
</script>

<style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.modal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #2c2c2c;
  padding: 2rem;
  border-radius: 10px;
  color: #ffffff;
  line-height: 22px;
}

.upgrade-btn,
.close-btn {
  background-color: #4c8bf5;
  border: none;
  border-radius: 5px;
  color: #ffffff;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  margin-top: 8px;
  padding: 0.75rem 1.5rem;
  text-transform: uppercase;
  transition: background-color 0.3s ease;
  width: 100%;
}

.upgrade-btn:hover,
.close-btn:hover {
  background-color: #3a75c4;
}
</style>
