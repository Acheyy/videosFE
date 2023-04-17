// // const refreshToken = useCookie("refreshToken");
// // const token = useCookie("token");

// // export default defineNuxtPlugin(() => {
// //   globalThis.$fetch = $fetch.create({
// //     onRequest: async (context) => {
// //       console.log(context);

// //       await fetch(`http://localhost:3030/api/users/refreshToken`, {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({
// //           refresh_token: refreshToken.value,
// //         }),
// //         // body: JSON.stringify({ userName: "test123", password: "test123" }),
// //       })
// //         .then((response) => response.json())
// //         .then((data) => {
// //           token.value = data.newAccessToken;
// //         });
// //     },
// //   });
// // });

// export default defineNuxtPlugin(() => {
//   const originalFetch = globalThis.$fetch;

//   globalThis.$fetch = $fetch.create({
//     onResponseError: async (res) => {
//       if (res.response._data.error === "Forbidden") {
//         try {
//           // Refresh the access token
//           const response = await fetch(
//             `http://localhost:3030/api/users/refreshToken`,
//             {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//               },
//               body: JSON.stringify({
//                 refresh_token: useCookie("refreshToken").value,
//               }),
//             }
//           );
//           const data = await response.json();
//           // Update the access token in the cookie
//           useCookie("token").value = data.newAccessToken;

//           // Chain a new request with the same endpoint and configuration as the failed request
//           console.log(res);
//           const { url } = res.response;
//           return globalThis.$fetch(url,{
//             server: false,
//             credentials: "include",
//           });
//         } catch (error) {
//           console.error(error);
//           return Promise.reject(res);
//         }
//       }
//       return Promise.reject(res);
//     },
//   });
// });

// // import { defineNuxtPlugin } from "#app";

// // export default defineNuxtPlugin((nuxtApp) => {
// //   const originalFetch = globalThis.$fetch;

// //   // globalThis.$fetch = async function (url, options) {
// //   //   // Your intercept logic goes here
// //   //   console.log("Request intercepted", url, options);

// //   //   // Call the original $fetch function with the modified arguments
// //   //   const response = await originalFetch.call(this, url, options);

// //   //   // Your intercept logic goes here
// //   //   console.log("Response intercepted", response);

// //   //   return response;
// //   // };
// // });
