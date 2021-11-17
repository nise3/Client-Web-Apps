// @ts-ignore
interface TConfig {
  authUrl: string;
  tokenUrl: string;
  clientKey: string;
  clientSecret: string;
  callbackUrl: string;
}

const SSO_CONFIG: TConfig = {
  authUrl: 'https://bus-staging.softbdltd.com/oauth2/authorize/',
  tokenUrl: 'https://bus-staging.softbdltd.com/oauth2/token',
  clientKey: 'FhVqwNp6Q6FV1H8KuuLsh5REQysa',
  clientSecret: 'GfrDpy904LjaWNmn7aSwEA1qyEQa',
  callbackUrl: '/callback',
};

export const getSSOLoginUrl = () => {
  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : '';

  return (
    SSO_CONFIG.authUrl +
    '?response_type=code&client_id=' +
    SSO_CONFIG.clientKey +
    '&scope=openid email&nonce=13e2312637dg136e1&' +
    'redirect_uri=' +
    origin +
    SSO_CONFIG.callbackUrl
  );
};

// export const getSSOLoginUrl = () => {
//   const origin =
//     typeof window !== 'undefined' && window.location.origin
//       ? window.location.origin
//       : '';
//
//   return (
//     SSO_CONFIG.authUrl +
//     '?response_type=code&client_id=' +
//     SSO_CONFIG.clientKey +
//     '&scope=openid email&nonce=13e2312637dg136e1&' +
//     'redirect_uri=' +
//     origin +
//     SSO_CONFIG.callbackUrl
//   );
// };

export default SSO_CONFIG;
