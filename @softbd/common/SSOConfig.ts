// @ts-ignore
interface TConfig {
  authUrl: string;
  clientId: string;
  callbackUrl: string;
}

const SSO_CONFIG: TConfig = {
  authUrl: 'https://bus-staging.softbdltd.com/oauth2/authorize/',
  clientId: 'FhVqwNp6Q6FV1H8KuuLsh5REQysa',
  callbackUrl: '/callback',
};

export const getSSOLoginUrl = () => {
  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : '';

  return (
    SSO_CONFIG.authUrl +
    '?response_type=id_token token&client_id=' +
    SSO_CONFIG.clientId +
    '&scope=openid email&nonce=13e2312637dg136e1&' +
    'redirect_uri=' +
    origin +
    SSO_CONFIG.callbackUrl
  );
};

export default SSO_CONFIG;
