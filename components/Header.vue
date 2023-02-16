<template>
  <div class="header-main-wrapper">
    <div class="start">
      <div class="hamburger" @click="sidebarStore.triggerSidebar()">
        <IconsHamburger></IconsHamburger>
      </div>
      <NuxtLink to="/" class="logo">
        <IconsLogo></IconsLogo>
      </NuxtLink>
    </div>
    <div class="center">
      <form>
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
            @keyup="
              processChanges($event);
              searchStore.triggerSearching(true);
            "
            @click="handleSearchClick($event)"
          />
          {{ searchInput }}
        </div>
      </form>
      <button>
        <div class="icon" @click="submitSearch()">
          <IconsSearch></IconsSearch>
        </div>
      </button>
    </div>
    <div class="end">
      <NuxtLink to="/admin/create" class="upload-icon">
        <IconsAddVideo></IconsAddVideo>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { useSearchStore } from "~/store/search";
import { useSidebarStore } from "~/store/sidebar";
import { storeToRefs } from "pinia";
const router = useRouter();
const route = useRoute();

const sidebarStore = useSidebarStore();
const { showSidebar } = storeToRefs(sidebarStore);
const searchStore = useSearchStore();
const { searchText } = storeToRefs(searchStore);
let searchInput = ref("");

function debounce(func, timeout = 750) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

async function searchFunction(event) {
  await fetch(
    `http://localhost:3030/videos/search?searchText=${event.target.value}`
  )
    .then((response) => response.json())
    .then((data) => {
      searchStore.triggerSearch(data, event.target.value);
      searchStore.triggerSearching(false);
    });
}

const processChanges = debounce((event) => searchFunction(event));

// const handleSearchTyping = async (event) => {
//   await fetch(
//     `http://localhost:3030/videos/search?searchText=${event.target.value}`
//   )
//     .then((response) => response.json())
//     .then((data) => searchStore.triggerSearch([...data], event.target.value));

//   // searchStore.triggerSearch([{ name: "stiri" }], event.target.value);
// };

const handleSearchClick = async (event) => {
  if (route.path !== "/search") {
    router.push({ path: `/search` });
    await fetch(
      `http://localhost:3030/videos/search?searchText=${
        event.target.value.length ? event.target.value : " "
      }`
    )
      .then((response) => response.json())
      .then((data) => {
        searchStore.triggerSearch(data, event.target.value);
        searchStore.triggerSearching(false);
      });
  }
};

const submitSearch = () => {
  router.push({ path: `/search` });
  console.log(router);
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

  .logo {
    width: 100px;
    padding: 18px 14px 18px 16px;
    cursor: pointer;

    svg {
      fill: #ffffff;
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
  flex: 0 1 728px;
  min-width: 0px;

  button {
    border-radius: 0 40px 40px 0;
    border: 1px solid hsl(0, 0%, 18.82%);
    background-color: hsla(0, 0%, 100%, 0.08);
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

    .search-container {
      border-radius: 40px 0 0 40px;
      caret-color: var(--yt-spec-text-primary);
      margin-left: 32px;
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
      margin-left: 34px;
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
