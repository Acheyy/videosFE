import { defineStore } from "pinia";

export const useSidebarStore = defineStore({
  id: "sidebar-trigger",
  state: () => {
    return {
      showSidebar: true,
    };
  },
  actions: {
    triggerSidebar() {
      this.showSidebar = !this.showSidebar;
    },
    updateShowSidebar() {
      this.showSidebar = window.innerWidth < 1500;
    },
  }
});
