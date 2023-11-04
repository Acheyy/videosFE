<template>
    <div class="upload-wrapper" v-if="!isAccountLoggedIn">
      <div>
        Email
        <n-input
          :theme="$darkTheme"
          :theme-overrides="$themeOverrides"
          class="text-input margin"
          id="email"
          v-model:value="formData.email"
          type="text"
          placeholder="email"
          :status="v$.email.$error ? 'error' : ''"
        />
        <div v-if="v$.email.$error">Invalid email</div>
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
      <n-button :theme="$darkTheme" :theme-overrides="$themeOverrides" @click="goToRegister">
         Go to login
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
      email: { required, minLength: minLength(4) },
    };
  });
  const goToRegister = () => {
    router.push({ path: `/login` });
  }
  const formData = reactive({ email: "" });
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
    console.log(v$.value.email.$error);
    if (!v$.value.$error) {
      await $fetch(`https://skbj.tv/api/users/forgotPassword`, {
        method: "POST",
        body: {
            email: formData.email,
        },

        onResponse(res) {
          console.log(res);
          if (res.response.status === 200) {
            router.push({ path: `/` });
            toast(`Please click the link in your email to reset your password`, {
            theme: "dark",
            type: "success",
            autoClose: false,
            toastClassName: "custom-wrapper error",
            closeOnClick: true,
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
  