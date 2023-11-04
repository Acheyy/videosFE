<template>
  <div class="header-main-wrapper">
    <div class="start">
      <div class="hamburger" @click="sidebarStore.triggerSidebar()">
        <IconsHamburger></IconsHamburger>
      </div>
      <NuxtLink to="/" class="logo">
        <IconsLogo></IconsLogo>
      </NuxtLink>
      <NuxtLink
        to="/free-premium"
        class="logo secondary"
        v-if="!accountDetails.isUserPremium"
      >
        <IconsFreePremium></IconsFreePremium>
      </NuxtLink>
    </div>
    <div class="center" ref="centerDiv">
      <form style="position: relative" onsubmit="return false">
        <div class="search-container">
          <input
            id="search"
            autocapitalize="none"
            autocomplete="off"
            autocorrect="off"
            name="searchText"
            tabindex="0"
            type="text"
            spellcheck="false"
            placeholder="Search"
            aria-label="Search"
            role="combobox"
            aria-haspopup="false"
            aria-autocomplete="list"
            dir="ltr"
            class="ytd-searchbox"
            style="outline: none"
            ref="searchInputRef"
            @keyup="
              processChanges($event);
              if (isLetter($event.key)) {
                searchStore.triggerSearching(true);
              }
            "
            @click="handleSearchClick($event)"
          />
          {{ searchInput }}
        </div>
      </form>
      <button>
        <div class="icon" @click="handleButtonClick">
          <IconsSearch></IconsSearch>
        </div>
      </button>
      <button ref="closeBtnRev" class="close-btn hide" @click="closeSearch()">
        X
      </button>
    </div>
    <div class="end">
      <!-- <NuxtLink to="/admin/create" class="upload-icon">
        <IconsAddVideo></IconsAddVideo>
      </NuxtLink> -->
      <AccountInfo></AccountInfo>
    </div>
  </div>
</template>

<script setup>
import { useSearchStore } from "~/store/search";
import { useSidebarStore } from "~/store/sidebar";
import { useAccountInfo } from "~/store/accountInfo";
import { storeToRefs } from "pinia";
const token = useCookie("token");

const router = useRouter();
const route = useRoute();

const sidebarStore = useSidebarStore();
const searchStore = useSearchStore();
const accountInfoStore = useAccountInfo();
const { isAccountLoggedIn, accountDetails } = storeToRefs(accountInfoStore);
const centerDiv = ref(null);
const searchInputRef = ref(null);
const closeBtnRev = ref(null);

let searchInput = ref("");

function isLetter(key) {
  return (
    /^[a-zA-Z0-9]$/.test(key) || // Added 0-9 for numbers
    key === "Backspace" ||
    key === " " ||
    key === "Enter"
  );
}

if (token.value) {
  await useLazyFetch(`https://skbj.tv/api/users/getInfo`, {
    server: false,
    credentials: "include",

    onResponse(res) {
      accountInfoStore.updateAccountInfo(res.response._data.userDB);
      accountInfoStore.triggerAccountLogin(true);
    },
    onResponseError(err) {
      if ((err.response._data.error = "Forbidden")) {
        accountInfoStore.triggerAccountLogin(false);
      }
    },
  });
}

setInterval(async () => {
  if (token.value) {
    await useLazyFetch(`https://skbj.tv/api/users/getInfo`, {
      server: false,
      credentials: "include",

      onResponse(res) {
        accountInfoStore.updateAccountInfo(res.response._data.userDB);
        accountInfoStore.triggerAccountLogin(true);
      },
      onResponseError(err) {
        if ((err.response._data.error = "Forbidden")) {
          accountInfoStore.triggerAccountLogin(false);
        }
      },
    });
  }
}, 200 * 1000);

function debounce(func, timeout = 750) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

async function searchFunction(text) {
  await fetch(`https://skbj.tv/api/videos/search?searchText=${text}`)
    .then((response) => response.json())
    .then((data) => {
      searchStore.triggerSearch(data, text);
      searchStore.triggerSearching(false);
    });
}

const processChanges = debounce((event) => {
  if (isLetter(event.key)) {
    searchFunction(event.target.value);
  }
});

const handleSearchClick = async (event) => {
  if (route.path !== "/search") {
    router.push({ path: `/search` });
    if (event.target.value.length) {
      await fetch(
        `https://skbj.tv/api/videos/search?searchText=${
          event.target.value.length ? event.target.value : " "
        }`
      )
        .then((response) => response.json())
        .then((data) => {
          searchStore.triggerSearch(data, event.target.value);
          searchStore.triggerSearching(false);
        });
    } else {
      searchStore.triggerSearch([], "");
      searchStore.triggerSearching(false);
    }
  }
};

const closeSearch = () => {
  closeBtnRev.value.classList.add("hide");
  centerDiv.value.classList.remove("mobile-open");
};

const handleButtonClick = () => {
  if (window.innerWidth < 660) {
    if (centerDiv?.value?.classList.contains("mobile-open")) {
      // If .mobile-open is already present, call submitSearch
      submitSearch();
    } else {
      closeBtnRev.value.classList.remove("hide");
      centerDiv?.value?.classList.add("mobile-open");
      // Add event listener to the document to detect clicks outside the centerDiv
      document.addEventListener("click", handleClickOutside, true);
    }
  } else {
    submitSearch();
  }
};

const handleClickOutside = (event) => {
  // Check if the clicked element is not the button or any of its descendants
  const buttonElement = document.querySelector(".icon");
  if (
    !centerDiv?.value?.contains(event.target) &&
    !buttonElement?.contains(event.target)
  ) {
    closeBtnRev.value.classList.add("hide");
    centerDiv.value.classList.remove("mobile-open");
    // Remove the event listener once the mobile-open class is removed
    document.removeEventListener("click", handleClickOutside, true);
  }
};

const submitSearch = () => {
  searchStore.triggerSearching(true);
  searchFunction(searchInputRef.value.value);
  router.push({ path: `/search` });
};
</script>

<style scoped lang="scss">
.header-main-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 999;
  box-shadow: 0 0 3px red;
  background-color: #0f0f0f !important;
  .hide {
    display: none;
  }

  @media only screen and (max-width: 660px) {
    .close-btn {
      color: #fff;
      font-size: 14px;
      font-weight: 600;
      background-color: #272727;
      border-radius: 50% !important;
      width: 40px !important;
      border-color: #000;
      margin-left: 6px;
    }
    .center {
      transition: 0.5s ease-in-out;
      form {
        display: none;
        transition: 0.5s ease-in-out;
      }

      button {
        width: 34px;
        height: 34px;
        border-radius: 50%;
        transition: 0.5s ease-in-out;
        .icon {
          width: 18px;
          height: 18px;
        }
      }
    }

    .mobile-open {
      form {
        display: flex;
      }

      button {
        width: 64px;
        height: 40px;
        border-radius: 0 40px 40px 0;
      }

      position: absolute;
      z-index: 999;
      width: calc(100% - 40px);
      background-color: #0f0f0f;
      padding: 12px 20px;
    }
  }
}

.upload-icon {
  width: 24px;
  padding: 8px;
  border-radius: 50%;
  color: #ffffff;
  fill: #ffffff;
  transition-duration: 0.1s;
  transition-timing-function: ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: #272727;
  }
}

.start,
.end {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  color: #fff;

  @media only screen and (max-width: 660px) {
    padding: 0;
    margin-right: 10px;
  }

  .logo {
    width: 100px;
    padding: 18px 14px 18px 16px;
    display: flex;
    cursor: pointer;

    svg {
      fill: #ffffff;
    }

    &.secondary {
      margin-left: 10px;
      width: 115px !important;
      font-weight: 600;
    }

    @media only screen and (max-width: 660px) {
      &.secondary {
        display: none;
      }
    }
  }

  .hamburger {
    padding: 8px;
    width: 24px;
    border-radius: 50%;
    cursor: pointer;
    transition-duration: 0.1s;

    svg {
      fill: #ffffff;
    }

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
}

.center {
  display: flex;
  flex-direction: row;
  align-items: center;
  min-width: 0px;

  button {
    border-radius: 0 40px 40px 0;
    border: 1px solid hsl(0, 0%, 18.82%);
    background-color: #272727;
    cursor: pointer;
    height: 40px;
    width: 64px;
    margin: 0;

    .icon {
      width: 24px;
      height: 24px;
      border-radius: 0 40px 40px 0;
      margin: 0 auto;

      svg {
        fill: #ffffff;
      }
    }
  }

  form {
    height: 40px;
    position: relative;
    flex: 1;
    flex-basis: 1e-9px;
    display: flexbox;
    display: flex;
    flex-direction: row;
    width: 500px;

    .search-container {
      border-radius: 40px 0 0 40px;
      caret-color: var(--yt-spec-text-primary);
      margin-left: 0;
      padding: 0px 4px 0px 16px;
      position: relative;
      align-items: center;
      background-color: hsl(0, 0%, 7%);
      border: 1px solid hsl(0, 0%, 18.82%);
      border-right: none;
      border-radius: 2px 0 0 2px;
      box-shadow: inset 0 1px 2px hsla(0, 0%, 0%, 0);
      color: hsla(0, 100%, 100%, 0.88);
      padding: 2px 6px;
      flex: 1;
      flex-basis: 1e-9px;
      display: flexbox;
      display: flex;
      flex-direction: row;
      border-radius: 40px 0 0 40px;

      input {
        color: #ffffff;
        outline: none;
        box-sizing: border-box;
        padding: 1px 0;
        margin: 0;
        -webkit-font-smoothing: antialiased;
        background-color: transparent;
        border: none;
        box-shadow: none;
        color: inherit;
        font-family: Roboto, Noto, sans-serif;
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
        margin-left: 4px;
        max-width: 100%;
        outline: none;
        text-align: inherit;
        width: 100%;
        -ms-flex: 1 1 0.000000001px;
        -webkit-flex: 1;
        -webkit-box-flex: 1;
        -moz-box-flex: 1;
        flex: 1;
        -webkit-flex-basis: 1e-9px;
        -ms-flex-preferred-size: 0.000000001px;
        flex-basis: 1e-9px;
      }
    }
  }
}
</style>
