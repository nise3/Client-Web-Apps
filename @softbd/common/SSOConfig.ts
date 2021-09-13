// @ts-ignore
interface TConfig {
  authUrl: string;
  clientId: string;
  callbackUrl: string;
}

const SSO_CONFIG: TConfig = {
  authUrl: 'https://bus.softbd.xyz/oauth2/authorize/',
  clientId: 'IVVofirMt2BUhd1cAvcPoCqipH0a',
  callbackUrl: 'http://localhost:3000/callback',
};

export const SSO_LOGIN_URL =
  SSO_CONFIG.authUrl +
  '?response_type=id_token token&client_id=' +
  SSO_CONFIG.clientId +
  '&scope=openid email&nonce=13e2312637dg136e1&' +
  'redirect_uri=' +
  SSO_CONFIG.callbackUrl;

export default SSO_CONFIG;
