// @ts-ignore
import cookieInstance from '../libs/cookieInstance';
import {COOKIE_KEY_AUTH_ACCESS_TOKEN_DATA} from '../../shared/constants/AppConst';

interface TConfig {
  authUrl: string;
  logoutUrl: string;
  tokenUrl: string;
  clientKey: string;
  clientSecret: string;
  callbackUrl: string;
}

const SSO_CONFIG: TConfig = {
  authUrl: 'https://bus-staging.softbdltd.com/oauth2/authorize/',
  logoutUrl: 'https://bus-staging.softbdltd.com/oidc/logout',
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

export const getSSOLogoutUrl = () => {
  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : '';

  const authAccessTokenData = cookieInstance.get(
    COOKIE_KEY_AUTH_ACCESS_TOKEN_DATA,
  );

  return (
    SSO_CONFIG.logoutUrl +
    '?id_token_hint=' +
    authAccessTokenData.id_token +
    '&post_logout_redirect_uri=' +
    origin +
    '/logout' +
    '&state=' +
    'hello'
  );
};

export default SSO_CONFIG;
