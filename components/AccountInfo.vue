<template>
  <div v-if="isAccountLoading"><Loading2></Loading2></div>
  <div v-else-if="!isAccountLoggedIn" class="non-signup-links">
    <NuxtLink to="/admin/login" class=""> Login </NuxtLink>
    <div>Sign up</div>
  </div>
  <div v-else style="display: flex">
    <div class="avatar-wrapper">
      <NuxtLink to="/admin/create" class="upload-icon">
        <img :src="accountDetails.avatar" />
      </NuxtLink>
    </div>
    <button @click="logout()">Logout</button>
  </div>
</template>

<script setup>
import { useAccountInfo } from "~/store/accountInfo";
import { storeToRefs } from "pinia";

const token = useCookie("token");
const accountInfoStore = useAccountInfo();
const { isAccountLoggedIn, accountDetails, isAccountLoading } =
  storeToRefs(accountInfoStore);

function logout() {
  token.value = null;
  accountInfoStore.deleteAccountInfo();
  accountInfoStore.triggerAccountLogin(false);
}
</script>

<style lang="scss" scoped>
.non-signup-links {
  display: flex;
}
.avatar-wrapper {
  max-width: 36px;
  max-height: 36px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid #ffffff;
  img {
    width: 100%;
  }
}
</style>
