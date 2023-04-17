// export default defineNuxtPlugin(() => {
//   globalThis.$fetch = $fetch.create({
//     onRequest: async (context) => {
//       console.log(context);

//       await globalThis.$fetch(`http://localhost:3030/api/users/refreshToken`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           refresh_token: useCookie("refreshToken").value,
//           access_token: useCookie("token").value,
//         }),
//         onResponse: (res) => {
//           console.log(res)
//         }
//         // body: JSON.stringify({ userName: "test123", password: "test123" }),
//       })
//         // .then((response) => response.json() as)
//         // .then((data) => {
//         //   useCookie("token").value = data.newAccessToken;
//         // });
//     },
//   });
// });
