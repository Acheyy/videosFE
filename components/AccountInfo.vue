<template>
  <div v-if="isAccountLoading"><Loading2></Loading2></div>
  <div v-else-if="!isAccountLoggedIn" style="display: flex; align-items: center">
    <client-only>
      <div>
      </div>


      <div class="upload-container" ref="uploadContainer">
        <div class="avatar-wrapper" @click="toggleDropdownInside">
          <div class="upload-icon">
            <div class="icon"><IconsAvatar></IconsAvatar></div>
          </div>
        </div>
        <DropdownMenu
          :isVisible="dropdownVisible"
          :userInfo="accountDetails"
          :logout="logout"
        >
          <!-- Add your menu items here -->
          <NuxtLink
            to="/login"
            class="nav-link"
            @click="toggleDropdownInside"
          >
            Login
          </NuxtLink>
          <NuxtLink
            to="/register"
            class="nav-link"
            @click="toggleDropdownInside"
          >
            Register
          </NuxtLink>

          <!-- <NuxtLink to="/user/profile" class="nav-link"> Liked </NuxtLink>
        <NuxtLink to="/user/profile" class="nav-link"> History </NuxtLink> -->
        </DropdownMenu>
      </div>
    </client-only>
  </div>
  <div v-else style="display: flex; align-items: center">
    <client-only>
      <!-- <NuxtLink to="/user/profile" style="margin-right: 4px;">
      {{ accountDetails.userName }}
    </NuxtLink> -->
      <div class="upload-container" ref="uploadContainer">
        <div class="avatar-wrapper" @click="toggleDropdownInside">
          <div class="upload-icon">
            <img :src="accountDetails.avatar" v-if="accountDetails.avatar" />
            <img src="https://skbj.b-cdn.net/actors/strumfy.jpeg" v-else />
          </div>
        </div>
        <DropdownMenu
          :isVisible="dropdownVisible"
          :userInfo="accountDetails"
          :logout="logout"
        >
          <!-- Add your menu items here -->
          <NuxtLink
            to="/user/profile"
            class="nav-link"
            @click="toggleDropdownInside"
          >
            Profile
          </NuxtLink>
          <NuxtLink
            to="/user/following"
            class="nav-link"
            @click="toggleDropdownInside"
          >
            Following
          </NuxtLink>
          <NuxtLink
            to="/user/purchased"
            class="nav-link"
            @click="toggleDropdownInside"
          >
            Purchased
          </NuxtLink>

          <!-- <NuxtLink to="/user/profile" class="nav-link"> Liked </NuxtLink>
        <NuxtLink to="/user/profile" class="nav-link"> History </NuxtLink> -->
        </DropdownMenu>
      </div>
    </client-only>
  </div>
</template>

<script setup>
import { useAccountInfo } from "~/store/accountInfo";
import { storeToRefs } from "pinia";

const accountInfoStore = useAccountInfo();
const { isAccountLoggedIn, accountDetails, isAccountLoading } =
  storeToRefs(accountInfoStore);
const token = useCookie("token");

const uploadContainer = ref(null);
const dropdownVisible = ref(false);

const toggleDropdownInside = () => {
  dropdownVisible.value = !dropdownVisible.value;
};

const toggleDropdownOutside = (event) => {
  if (uploadContainer.value && !uploadContainer.value.contains(event.target)) {
    dropdownVisible.value = false;
  }
};

onMounted(() => {
  window.addEventListener("click", toggleDropdownOutside);
});

onBeforeUnmount(() => {
  window.removeEventListener("click", toggleDropdownOutside);
});

function logout() {
  console.log("Logout function called");
  console.log("Token value before:", token.value);
  token.value = null;
  console.log("Token value after:", token.value);
  accountInfoStore.deleteAccountInfo();
  accountInfoStore.triggerAccountLogin(false);
}
</script>

<style lang="scss" scoped>
.icon {
  width: 18px;
  fill: #ffffff;
  background-color: #272727;
  padding: 8px;
  border-radius: 50%;
  transition: 0.25s ease-in-out;
  cursor: pointer;

  &:hover{
    background-color: #707070;

  }
}

.avatar-wrapper {
  max-width: 36px;
  max-height: 36px;
  border-radius: 50%;
  overflow: hidden;

  position: relative;
  display: inline-block;

  .upload-icon {
    cursor: pointer;
  }

  img {
    width: 100%;
  }
}

.nav-link {
  width: calc(100% - 16px);
  display: inline-block;
  padding: 8px;
  transition-duration: 0.1s;
  transition-timing-function: ease-in-out;
  border-radius: 4px;

  &:hover {
    background-color: #424242;
  }
}
</style>
