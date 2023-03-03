import { defineStore } from "pinia";

export const useSearchStore = defineStore({
  id: "search-trigger",
  state: () => {
    return {
      searchText: "",
      searching: false,
      resultVideos: [],
    };
  },
  actions: {
    async triggerSearch(videos: any, text: string) {
      this.resultVideos = videos;
      this.searchText = text;
    },
    async triggerSearching(isSearching: boolean) {
      this.searching = isSearching;
    },
  },
});
