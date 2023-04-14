// composables/usePaypalSdk.js

export function usePaypalSdk(isLoggedIn) {
  const loadPaypalSdkPromise = new Promise((resolve, reject) => {
    if (!isLoggedIn) {
      reject(new Error('User not logged in'));
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://www.paypal.com/sdk/js?client-id=AXi3Eewhkikq_uKTNV0PpY8lz2P1zX0l5hRRbJOsJnSxMYakeNeDX6fVYHiwev4QR11qeZDftSXPmjzW';
    script.async = true;
    script.onload = () => {
      console.log('PayPal SDK loaded');
      resolve();
    };
    script.onerror = () => {
      console.error('Failed to load PayPal SDK');
      reject(new Error('Failed to load PayPal SDK'));
    };
    document.head.appendChild(script);
  });

  onMounted(() => {
    return loadPaypalSdkPromise;
  });

  return loadPaypalSdkPromise;
}
