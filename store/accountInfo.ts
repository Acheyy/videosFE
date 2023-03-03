import { defineStore } from "pinia";

export const useAccountInfo = defineStore({
  id: "account-info",
  state: () => {
    return {
      isAccountLoggedIn: false,
      isAccountLoading: false,
      accountDetails: { userName: "", email: "", avatar: "", _id: "" },
    };
  },
  actions: {
    async triggerAccountLogin(loggedIn: boolean) {
      this.isAccountLoggedIn = loggedIn;
    },
    async triggerAccountLoad(loading: boolean) {
      this.isAccountLoading = loading;
    },
    async updateAccountInfo(user: any) {
      this.accountDetails = {
        userName: user.userName,
        email: user.email,
        avatar: user.avatar,
        _id: user._id,
      };
    },
    async deleteAccountInfo() {
      this.accountDetails = { userName: "", email: "", avatar: "", _id: "" };
    },
  },
});
