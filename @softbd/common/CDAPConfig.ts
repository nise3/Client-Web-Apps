import {getHostUrl} from './SSOConfig';

interface TConfig {
  authUrl: string;
  authUrl2: string;
  clientId: string;
  callbackUrl: string;
}

const CDAP_CONFIG: TConfig = {
  authUrl: 'https://identity-dev.nise3.xyz/oauth2/authorize/',
  authUrl2: 'https://www.training.mygov.bd/users/myGovLoginProcessFromSSOUsers',
  clientId: 'ATqvU8EKNKl6st6YjuUM0VNbQ1oa',
  callbackUrl: '/callback',
};

export const getCDAPLoginUrl = () => {
  const redirectUrl = new URL(getHostUrl() + CDAP_CONFIG.callbackUrl);

  return (
    CDAP_CONFIG.authUrl +
    '?response_type=id_token token&client_id=' +
    CDAP_CONFIG.clientId +
    '&scope=openid profile email&nonce=13e2312637dg136e1&' +
    'redirect_uri=' +
    encodeURI(redirectUrl.toString())
  );
};

export const getCDAPLoginUrl2 = (accessToken: any, nonce: any) => {
  return (
    CDAP_CONFIG.authUrl2 +
    '?response_type=code&access_token=' +
    accessToken +
    '&nonce=' +
    nonce +
    '&scope=openid'
  );
};

export default CDAP_CONFIG;
