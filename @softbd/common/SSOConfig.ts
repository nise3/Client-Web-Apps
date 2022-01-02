import {ParsedUrlQuery} from 'querystring';
import {getBrowserCookie} from '../libs/cookieInstance';
import {COOKIE_KEY_AUTH_ID_TOKEN} from '../../shared/constants/AppConst';
import {niseDomain} from './constants';

interface TConfig {
  authUrl: string;
  logoutUrl: string;
  tokenUrl: string;
  clientKey: string;
  clientSecret: string;
  callbackUrl: string;
}

const SSO_CONFIG: TConfig = {
  authUrl: process.env.NEXT_PUBLIC_IDP_BASE ? process.env.NEXT_PUBLIC_IDP_BASE + '/oauth2/authorize/' : 'https://bus-staging.softbdltd.com/oauth2/authorize/',
  logoutUrl: process.env.NEXT_PUBLIC_IDP_BASE ? process.env.NEXT_PUBLIC_IDP_BASE + '/oidc/logout' : 'https://bus-staging.softbdltd.com/oidc/logout',
  tokenUrl: process.env.NEXT_PUBLIC_IDP_BASE ? process.env.NEXT_PUBLIC_IDP_BASE + '/oauth2/token' : 'https://bus-staging.softbdltd.com/oauth2/token',
  clientKey: process.env.NEXT_PUBLIC_IDP_OPENID_KEY ? process.env.NEXT_PUBLIC_IDP_OPENID_KEY : 'FhVqwNp6Q6FV1H8KuuLsh5REQysa',
  clientSecret: process.env.NEXT_PUBLIC_IDP_OPENID_SECRET ? process.env.NEXT_PUBLIC_IDP_OPENID_SECRET : 'GfrDpy904LjaWNmn7aSwEA1qyEQa',
  callbackUrl: '/callback',
};


export const getHostUrl = () => {
  return typeof window !== 'undefined' && window?.location?.origin
    ? window.location.origin
    : '';
};


export const paramsBuilder = (extraParams: any) => {
  let params = '';
  if (extraParams) {
    Object.keys(extraParams).forEach((key, index) => {
      if (index) {
        params += '&';
      }
      params += key + '=' + extraParams[key];
    });
  }

  return params;
};

export const getSSOLoginUrl = (extraParams?: ParsedUrlQuery) => {
  const redirectUrl = new URL(getHostUrl() + SSO_CONFIG.callbackUrl);
  if (extraParams) {
    redirectUrl.search = paramsBuilder(extraParams);
  }

  return (
    SSO_CONFIG.authUrl +
    '?response_type=code&client_id=' +
    SSO_CONFIG.clientKey +
    '&scope=openid&nonce=13e2312637dg136e1&' +
    'redirect_uri=' +
    redirectUrl.toString()
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
  const origin = niseDomain();
  const idToken = getBrowserCookie(COOKIE_KEY_AUTH_ID_TOKEN);

  return (
    SSO_CONFIG.logoutUrl +
    '?id_token_hint=' +
    idToken +
    '&post_logout_redirect_uri=' +
    origin +
    '/logout' +
    '&state=' +
    'hello'
  );
};

export default SSO_CONFIG;
