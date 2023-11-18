<template>
  <div class="upload-wrapper" v-if="!isAccountLoggedIn">
    <div>
      New password
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
      Reset password
    </n-button>
    <br />
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
    password: { required, minLength: minLength(6) },
  };
});
const formData = reactive({ password: "" });
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

async function login() {
  v$.value.$validate();
  console.log(v$.value.password.$error);
  if (!v$.value.$error) {
    await $fetch(`http://localhost:3030/api/users/resetPassword`, {
      method: "POST",
      body: {
        newPassword: formData.password,
        token: router.currentRoute.value.query.token,
      },

      onResponse(res) {
        console.log(res);
        if (res.response.status === 200) {
          router.push({ path: `/login` });
          toast(`Your password was successfuly changed!`, {
          theme: "dark",
          type: "success",
          autoClose: false,
          toastClassName: "custom-wrapper error",
          closeOnClick: false,
        });
        } else {
        }
      },
      onResponseError(err) {
        console.log(err);
        toast(`There was an error! ${err.response._data.error}`, {
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
  max-width: 500px;
}
</style>
