<!-- components/DropdownMenu.vue -->
<template>
  <div class="dropdown-menu" v-show="isVisible">
    <div class="user-top-sectio">
      <NuxtLink to="/user/profile" class="avatar">
        <img :src="userInfo.avatar" v-if="userInfo.avatar" />
        <img src="https://skbj.b-cdn.net/actors/strumfy.jpeg" v-else />
      </NuxtLink>
      <NuxtLink to="/user/profile" class="name">
        {{ userInfo.userName }}
      </NuxtLink>
      <button class="logout-button" @click="logout()">Logout</button>
    </div>
    <slot></slot>

    <UpgradeToPremiumButton
      v-if="isAccountLoggedIn && !accountDetails.isUserPremium"
    ></UpgradeToPremiumButton>
    <div
      style="margin-top: 10px"
      v-if="isAccountLoggedIn && accountDetails.isUserPremium"
    >
      Premium Expires:
      {{ $timeAgo.format(new Date(accountDetails?.premiumExpiry)) }}
    </div>
  </div>
</template>

<script setup>
import { useAccountInfo } from "~/store/accountInfo";
import { storeToRefs } from "pinia";

const accountInfoStore = useAccountInfo();
const { isAccountLoggedIn, accountDetails, isAccountLoading } =
  storeToRefs(accountInfoStore);

const props = defineProps({
  isVisible: Boolean,
  userInfo: {},
  logout: Function,
});
</script>

<style lang="scss" scoped>
.logout-button {
  margin-top: 4px;
  width: 100%;
  background-color: #424242;
  color: white;
  font-size: 16px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.logout-button:hover {
  background-color: #616161;
}

.logout-button:active {
  transform: scale(0.95);
}

.logout-button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(66, 66, 66, 0.3);
}
.dropdown-menu {
  position: absolute;
  right: 10px;
  background-color: #2c2c2c;
  border: 1px solid #424242;
  border-radius: 4px;
  padding: 12px;
  width: 240px;
  z-index: 100;
  top: calc(100%);
}
.user-top-sectio {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #cacaca;

  .avatar {
    border-radius: 50%;
    overflow: hidden;
    height: 50px;
    width: 50px;
    margin-right: 8px;

    img {
      max-width: 50px;
    }
  }
}
</style>
