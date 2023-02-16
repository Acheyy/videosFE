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
  }
});
