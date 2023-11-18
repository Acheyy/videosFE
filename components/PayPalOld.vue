<template>
    <div style="width: 100%">
      <div ref="paypalButton"></div>
    </div>
  </template>
  
  <script setup>
  import { useAccountInfo } from "~/store/accountInfo";
  import { storeToRefs } from "pinia";
  import { toast } from "vue3-toastify";
  import { usePaypalSdk } from '@/composables/usePaypalSdk';
  
  
  const accountInfoStore = useAccountInfo();
  const { accountDetails, isAccountLoggedIn } = storeToRefs(accountInfoStore);
  
  const paypalButton = ref(null);
  
  const loadPaypalSdkPromise = usePaypalSdk(isAccountLoggedIn.value);
  
  async function loadPaypalButton() {
    try {
      await loadPaypalSdkPromise;
  
      if (typeof window !== "undefined" && window.paypal) {
      window.paypal
        .Buttons({
          fundingSource: window.paypal.FUNDING.PAYPAL,
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: "4.99", // Replace this with the actual amount
                  },
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
  
            console.log("onApprove");
  
            const order = await actions.order.capture();
  
            try {
              accountDetails.value.isUserPremium = true;
              const response = await fetch(
                "http://localhost:3030/api/users/upgradeToPremium",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    // Include any required authentication headers
                  },
                  body: JSON.stringify({
                    userId: accountDetails.value._id,
                    transactionId: order.id,
                  }),
                }
              );
  
              if (response.ok) {
                const responseData = await response.json();
                console.log("User upgraded to VIP:", responseData);
                toast("Upgraded to Premium!", {
                  theme: "dark",
                  type: "success",
                  autoClose: true,
                  toastClassName: "custom-wrapper error",
                  closeOnClick: true,
                });
                // Handle the successful response, such as updating the UI or informing the user
              } else {
                console.error(
                  "Error upgrading user to VIP:",
                  response.statusText
                );
                // Handle the error response, such as displaying an error message
              }
            } catch (error) {
              console.error("Error calling /users/upgradeToPremium:", error);
              // Handle any errors during the fetch request
            }
          },
          onError: (err) => {
            console.log("onError", err);
            toast(
              "There was an error, please contact us if the money were taken from your account!",
              {
                theme: "dark",
                type: "error",
                autoClose: false,
                toastClassName: "custom-wrapper error",
                closeOnClick: false,
              }
            );
          },
          onCancel: (err) => {
            console.log("onCancel");
            toast("Payment canceled!", {
              theme: "dark",
              type: "error",
              autoClose: false,
              toastClassName: "custom-wrapper error",
              closeOnClick: false,
            });
          },
        })
        .render(paypalButton.value);
    } else {
      console.error("PayPal SDK not loaded");
    }
    } catch (error) {
      console.error('Error while loading PayPal SDK:', error.message);
    }
  }
  
  
  onMounted(() => {
    if (isAccountLoggedIn.value) {
      loadPaypalButton();
    }
  });
  
  </script>
  