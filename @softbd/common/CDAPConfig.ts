import {getHostUrl} from './SSOConfig';

interface TConfig {
  authUrl: string;
  clientId: string;
  callbackUrl: string;
}

const CDAP_CONFIG: TConfig = {
  authUrl: 'https://identity-dev.nise3.xyz/oauth2/authorize/',
  clientId: 'ATqvU8EKNKl6st6YjuUM0VNbQ1oa',
  callbackUrl: '/callback',
};

export const getCDAPLoginUrl = () => {
  const redirectUrl = new URL(getHostUrl() + CDAP_CONFIG.callbackUrl);

  return (
    CDAP_CONFIG.authUrl +
    '?response_type=id_token&client_id=' +
    CDAP_CONFIG.clientId +
    '&scope=openid&nonce=13e2312637dg136e1&' +
    'redirect_uri=' +
    encodeURI(redirectUrl.toString())
  );
};

export default CDAP_CONFIG;
