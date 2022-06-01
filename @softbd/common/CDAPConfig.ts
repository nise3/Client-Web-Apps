import {getHostUrl} from './SSOConfig';

interface TConfig {
  authUrl: string;
  idpAuthUrl: string;
  clientId: string;
  callbackUrl: string;
}

const CDAP_CONFIG: TConfig = {
  authUrl: 'https://identity-dev.nise3.xyz/oauth2/authorize/',
  idpAuthUrl: 'https://idp.training.mygov.bd/oauth2/nise3-auth',
  clientId: 'ATqvU8EKNKl6st6YjuUM0VNbQ1oa',
  callbackUrl: '/callback',
};

export const MYGOV_LOGIN_URL_USING_NISE =
  'https://idp.training.mygov.bd/nis3/redirect';

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

export const getMyGovLoginUrl = (accessToken: any, nonce: any) => {
  return (
    CDAP_CONFIG.idpAuthUrl +
    '?response_type=code&access_token=' +
    accessToken +
    '&nonce=' +
    nonce +
    '&scope=openid'
  );
};

export default CDAP_CONFIG;
