import {getHostUrl} from './SSOConfig';

interface TConfig {
  authUrl: string;
  authUrl2: string;
  clientId: string;
  callbackUrl: string;
  accessToken: string;
}

const CDAP_CONFIG: TConfig = {
  authUrl: 'https://identity-dev.nise3.xyz/oauth2/authorize/',
  authUrl2:
    'https://www.training.mygov.bd/users/myGovLoginProcessFromSSOUsers?',
  clientId: 'ATqvU8EKNKl6st6YjuUM0VNbQ1oa',
  callbackUrl: '/callback',
  accessToken:
    'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJwUzE4QmlXY0NQTmNCMEpORjc2NHozeGFQaVZqOHlZV01HQmhZbUVFakM0In0.eyJleHAiOjE2NTIzMzg3NjIsImlhdCI6MTY1MjMzODQ2MiwianRpIjoiMTRiYmU4OGMtNTU4MS00MzkwLThmYmUtMjU1YTU2YWFlMTE2IiwiaXNzIjoiaHR0cHM6Ly9pZHAubGl2ZS5teWdvdi5iZC9hdXRoL3JlYWxtcy9jZGFwIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6ImY6OGU2NmVlMjctMTE1OS00YzkwLThhMTUtODA4YWM2NmE3YTQyOjAxNzE3MzAzMjAwIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoibmlzZTMiLCJzZXNzaW9uX3N0YXRlIjoiMDI5Zjc0MTYtY2Q0Ni00MzA4LWE5NjMtODJlNjY3NTkyYThkIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6ImVtYWlsIHByb2ZpbGUiLCJzaWQiOiIwMjlmNzQxNi1jZDQ2LTQzMDgtYTk2My04MmU2Njc1OTJhOGQiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInByZWZlcnJlZF91c2VybmFtZSI6IjAxNzE3MzAzMjAwIn0.Q-2DHBr72cgpJ5oYTbGNquoSU5Iz1rreUSVxvQCaB0KqQkubH0UCeu87NsQHMrFcsocMFiHZ9_AOFn6OMSJW2drz4g-UMipPuS5O8MnbJnp_0t2n9YzSxMJdxnOv9em4SfyCooTfljao5n8YzEr3njmNsdvzRGqVwoJl1Qm6Ry1TG95Zvr0EB-lUO9ptdbav_GJN5WP00OSktFJOl89wBYxNRiapPGgehWCPIL7jAgjNByzvzkHVmxhwIlR3Cahb9pzd8mCA0QxXy7noG-ZceDSxTUT5bhORr-JrKYj_YvR9eZ06x5BuapHvD3xS91lSuP_bkL-JV6nX5gh8qUjmvw',
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

export const getCDAPLoginUrl2 = (accessToken: any) => {
  const redirectUrl = new URL(getHostUrl() + CDAP_CONFIG.callbackUrl);

  return (
    CDAP_CONFIG.authUrl2 +
    '?response_type=code&access_token=' +
    accessToken +
    '&nonce=%242y%2410%24maaT%2FWki5beHUYCfm5muZOvLnzmHtmeQMYadaX4WrMzGYH%2F7Oijh6&scope=openid' +
    'redirect_uri=' +
    encodeURI(redirectUrl.toString())
  );
};

export default CDAP_CONFIG;
