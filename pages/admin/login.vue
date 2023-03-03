<template>
  <div class="upload-wrapper" v-if="!isAccountLoggedIn">
    <div>
      userName
      <n-input
      :theme="$darkTheme"
      :theme-overrides="$themeOverrides"
        class="text-input margin"
        id="userName"
        v-model:value="formData.userName"
        type="text"
        placeholder="UserName"
        :status="v$.userName.$error ? 'error' : ''"
      />
      <div v-if="v$.userName.$error">UserName minimum 4 characters</div>
    </div>
    <div>
      password
      <n-input
      :theme="$darkTheme"
      :theme-overrides="$themeOverrides"
        class="text-input margin"
        id="password"
        v-model:value="formData.password"
        type="password"
        placeholder="Password"
        :status="v$.password.$error ? 'error' : ''"
      />
      <div v-if="v$.password.$error">Password minimum 6 characters</div>
    </div>
    <n-button
      :theme="$darkTheme"
      :theme-overrides="$themeOverrides"
      @click="login"
      :disabled="v$.$error"
    >
      Submit
    </n-button>
  </div>
  <div v-else>Aleady logged in</div>
</template>

<script setup>
import { toast } from "vue3-toastify";
import { useAccountInfo } from "~/store/accountInfo";
import { storeToRefs } from "pinia";
import { required, minLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

const rules = computed(() => {
  return {
    userName: { required, minLength: minLength(4) },
    password: { required, minLength: minLength(6) },
  };
});
const formData = reactive({ userName: "", password: "" });
const v$ = useVuelidate(rules, formData);

const themeOverrides = {
  common: {
    primaryColor: "#cacaca",
    primaryColorHover: "#cacaca",
  },
};
const router = useRouter();
const accountInfoStore = useAccountInfo();
const { isAccountLoggedIn } = storeToRefs(accountInfoStore);
const token = useCookie("token");

async function login() {
  v$.value.$validate();
  console.log(v$.value.userName.$error);
  if (!v$.value.$error) {
    await $fetch(`http://localhost:3030/api/users/login`, {
      method: "POST",
      body: {
        userName: formData.userName,
        password: formData.password,
      },
      onRequest() {
        accountInfoStore.triggerAccountLoad(true);
      },
      onResponse(res) {
        console.log(res);
        if (res.response.status === 200) {
          token.value = res.response._data.accessToken;
          accountInfoStore.updateAccountInfo(res.response._data.user);
          accountInfoStore.triggerAccountLogin(true);
          accountInfoStore.triggerAccountLoad(false);
          router.push({ path: `/` });
        } else {
          accountInfoStore.triggerAccountLoad(false);
        }
      },
      onResponseError(err) {
        console.log(err);
        toast(`There was an error! ${err.response._data}`, {
          theme: "dark",
          type: "error",
          autoClose: false,
          toastClassName: "custom-wrapper error",
          closeOnClick: false,
        });
      },
    });
  } else {
    toast("Complete the required fields!", {
      theme: "dark",
      type: "error",
      autoClose: 5000,
      toastClassName: "custom-wrapper error",
      closeOnClick: false,
    });
  }
}
</script>

<style scoped lang="scss">
.upload-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.margin {
  margin: 20px 0;
}
.text-input {
  width: 500px;
}
</style>
