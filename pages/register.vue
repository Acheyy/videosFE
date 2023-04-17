<template>
  <div class="upload-wrapper" v-if="!isAccountLoggedIn">
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
    email
    <n-input
      :theme="$darkTheme"
      :theme-overrides="$themeOverrides"
      class="text-input margin"
      id="userName"
      v-model:value="formData.email"
      type="text"
      placeholder="Email"
      :status="v$.email.$error ? 'error' : ''"
    />
    password
    <n-input
      :theme="$darkTheme"
      :theme-overrides="$themeOverrides"
      class="text-input margin"
      id="userName"
      v-model:value="formData.password"
      type="password"
      placeholder="Password"
      :status="v$.password.$error ? 'error' : ''"
    />
    <n-button
      class="margin"
      :theme="$darkTheme"
      :theme-overrides="$themeOverrides"
      @click="submitVideo()"
    >
      Submit
    </n-button>
  </div>
  <div class="upload-wrapper" v-else>You are already logged in</div>
</template>

<script setup>
import { toast } from "vue3-toastify";
import { useAccountInfo } from "~/store/accountInfo";
import { storeToRefs } from "pinia";
import { required, minLength, email } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import DOMPurify from "dompurify";

const accountInfoStore = useAccountInfo();
const { isAccountLoggedIn } = storeToRefs(accountInfoStore);
const router = useRouter();

const rules = computed(() => {
  return {
    userName: { required, minLength: minLength(4) },
    password: { required, minLength: minLength(8) },
    email: { required, email },
  };
});
const formData = reactive({ userName: "", email: "", password: "" });
const v$ = useVuelidate(rules, formData);

const themeOverrides = {
  common: {
    primaryColor: "#cacaca",
    primaryColorHover: "#cacaca",
  },
};

async function submitVideo() {
  const sanitizeduserName = DOMPurify.sanitize(formData.userName).replace(
    /\s+/g,
    ""
  );
  const sanitizedemail = DOMPurify.sanitize(formData.email).replace(/\s+/g, "");
  const sanitizedpassword = DOMPurify.sanitize(formData.password).replace(
    /\s+/g,
    ""
  );

  v$.value.$validate();
  console.log(v$.value.userName.$error);
  if (!v$.value.$error) {
    await $fetch(`http://localhost:3030/api/users`, {
      method: "POST",
      body: {
        userName: sanitizeduserName.replace(/\s+/g, ''),
        email: sanitizedemail.toLowerCase().replace(/\s+/g, ''),
        password: sanitizedpassword,
      },
      async onResponse(res) {
        if (res.response.status === 200) {
          toast("Account created successfully! You can login now!", {
            theme: "dark",
            type: "success",
            autoClose: 5000,
            toastClassName: "custom-wrapper error",
            closeOnClick: false,
          });
          await $fetch(`http://localhost:3030/api/users/sendConfirmation`, {
            method: "POST",
            body: { username: sanitizeduserName, to: sanitizedemail },
          });
          router.push({ path: `/login` });
        } else {
          toast(`There was an error! ${res.response._data.error}`, {
            theme: "dark",
            type: "error",
            autoClose: 5000,
            toastClassName: "custom-wrapper error",
            closeOnClick: false,
          });
        }
      },
    });
  } else {
    toast(
      "Username minimum 4 characters! Check if the email is in a correct format! Password minimum 8 characters",
      {
        theme: "dark",
        type: "error",
        autoClose: 8000,
        toastClassName: "custom-wrapper error",
        closeOnClick: false,
      }
    );
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
