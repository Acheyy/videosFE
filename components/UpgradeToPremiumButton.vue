<!-- components/UpgradeToPremiumButton.vue -->
<template>
  <div>
    <button class="upgrade-btn" @click="showModal = true">
      Upgrade to VIP
    </button>
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <h2>Upgrade to Premium</h2>
        <p>Upgrade your account to enjoy VIP features!</p>
        <br />
        <ul>
          <li>Access to premium/VIP videos</li>
          <li>Access to VIP Video Player</li>
          <li>High quality download (up to 1080p and even 2k)</li>
        </ul>
        <br />

        <p
          style="
            font-weight: 600;
            margin-bottom: 10px;
            max-width: 400px;
            text-align: center;
          "
        >
          $5 / month <br />
          <!-- (This is one time payment. Manual renew required after the expiration
          period) -->
        </p>

        <!-- <PayPal style="margin-top: 20px"></PayPal> -->
        <a href="https://www.patreon.com/HenpaiSensei"
          class="close-btn payment patreon"
          target="_blank"
        >
          Patreon
        </a>

        <button
          class="close-btn payment"
          @click="
            router.push({ path: `/more-payments` });
            showModal = false;
          "
        >
          Crypto Coins
        </button>
        <!-- Include any additional content or actions related to the premium upgrade -->
        <button class="close-btn" @click="showModal = false">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const router = useRouter();
const showModal = ref(false);
</script>

<style lang="scss" scoped>
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
.payment {
  background-color: transparent !important;
  border: 1px solid #fff !important;
  &:hover {
    background-color: #ffffff10 !important;
  }
}
.modal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #2c2c2c;
  padding: 2rem;
  border-radius: 10px;
  color: #ffffff;
  line-height: 20px;
  ul {
    text-align: left;
  }
}
.patreon{
  max-width: calc(100% - 3rem);
}
.upgrade-btn,
.close-btn {
  display: inline-block;
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
  text-align: center;
  width: 100%;
}

.upgrade-btn:hover,
.close-btn:hover {
  background-color: #3a75c4;
}
</style>
