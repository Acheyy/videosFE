<!-- components/UpgradeToPremiumButton.vue -->
<template>
    <div>
      <button class="upgrade-btn" @click="showModal = true">
        Purchase Coins
      </button>
      <div v-if="showModal" class="modal">
        <div class="modal-content">
          <h2>Purchase Coins</h2>
          <p>Use the Coins to unlock more videos!</p>
          <br />


  
          <!-- <PayPal style="margin-top: 20px"></PayPal> -->
          <a
            :href="
              'https://securekeybj.tech/send-checkout?customerId=' +
              accountDetails._id +
              '&product=mysteryxtrasmall'
            "
            class="close-btn payment patreon"
            target="_blank"
          >
            50  <IconsCoin></IconsCoin>  = 5$
          </a>
          <a
            :href="
              'https://securekeybj.tech/send-checkout?customerId=' +
              accountDetails._id +
              '&product=mysterysmallbundle'
            "
            class="close-btn payment patreon"
            target="_blank"
          >
            100  <IconsCoin></IconsCoin>  = 10$
          </a>
          <a
            :href="
              'https://securekeybj.tech/send-checkout?customerId=' +
              accountDetails._id +
              '&product=mysterybundle'
            "
            class="close-btn payment patreon"
            target="_blank"
          >
            500  <IconsCoin></IconsCoin>  = 45$
            <div class="discount">-10%</div>
          </a>
          <a
            :href="
              'https://securekeybj.tech/send-checkout?customerId=' +
              accountDetails._id +
              '&product=mysterybigbundle'
            "
            class="close-btn payment patreon"
            target="_blank"
          >
            1.000  <IconsCoin></IconsCoin>  = 85$
            <div class="discount">-15%</div>
          </a>
          <a
            :href="
              'https://securekeybj.tech/send-checkout?customerId=' +
              accountDetails._id +
              '&product=mysteryxtrabig'
            "
            class="close-btn payment patreon"
            target="_blank"
          >
            2.000  <IconsCoin></IconsCoin>  = 150$
            <div class="discount">-25%</div>
          </a>
          <!-- Include any additional content or actions related to the premium upgrade -->
          <button class="close-btn" @click="showModal = false">Close</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useAccountInfo } from "~/store/accountInfo";
  import { storeToRefs } from "pinia";
  const accountInfoStore = useAccountInfo();
  const { accountDetails } = storeToRefs(accountInfoStore);
  
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
    position: relative;
    background-color: transparent !important;
    border: 1px solid #fff !important;
    &:hover {
      background-color: #ffffff10 !important;
    }
    display: flex !important;
    align-items: center !important;
    justify-content: center;
    img {
        margin: 0 6px 0 4px;
        max-width: 20px;
        margin-top: -4px;
    }

    .discount{
        position: absolute;
        right: -16px;
        top: -2px;
        background-color: #df3737;
        padding: 4px;
        border-radius: 14px;
        transform: rotate(25deg);
        font-size: 14px;
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
  .patreon {
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
  