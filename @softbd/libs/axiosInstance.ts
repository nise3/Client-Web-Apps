import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import {API_BASE_URL} from '../common/apiRoutes';
import {
  COOKIE_KEY_APP_ACCESS_TOKEN,
  COOKIE_KEY_AUTH_ACCESS_TOKEN_DATA,
} from '../../shared/constants/AppConst';
import {
  getBrowserCookie,
  removeBrowserCookie,
  setBrowserCookie,
} from './cookieInstance';
import registerAxiosMockAdapter from './registerAxiosMockAdapter';
import {getSSOLoginUrl} from '../common/SSOConfig';
import {getCurrentDomain} from '../utilities/helpers';

let retryAuthRefreshToken = 0;
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 300000,
});
axiosInstance.defaults.headers.common['Accept'] = 'application/json';
axiosInstance.defaults.headers.common['Content-Type'] = 'application/json';

axiosInstance.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    const authAccessTokenData = getBrowserCookie(
      COOKIE_KEY_AUTH_ACCESS_TOKEN_DATA,
    );

    if (!config.headers['Authorization']) {
      const appAccessTokenData = getBrowserCookie(COOKIE_KEY_APP_ACCESS_TOKEN);
      config.headers[
        'Authorization'
      ] = `Bearer ${appAccessTokenData?.access_token}`;
    }

    const userAccessToken = authAccessTokenData?.access_token;
    if (!config.headers['User-Token'] && userAccessToken) {
      config.headers['User-Token'] = `Bearer ${userAccessToken}`;
    }

    if (!config.headers['Domain']) {
      config.headers['Domain'] = getCurrentDomain();
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

// Response interceptor for API calls
axiosInstance.interceptors.response.use(
  (response) => {
    // console.count('countSuccessRequest');
    return response;
  },
  async function (error) {
    console.count('countFailedRequest');
    if (error?.response?.status === 401) {
      const authAccessTokenData = getBrowserCookie(
        COOKIE_KEY_AUTH_ACCESS_TOKEN_DATA,
      );
      if (authAccessTokenData) {
        await refreshAuthAccessToken();
      } else {
        await refreshAppAccessToken();
      }
    }
    return Promise.reject(error);
  },
);

export function setDefaultAuthorizationHeader(accessToken?: string) {
  axiosInstance.defaults.headers.common['Authorization'] =
    'Bearer ' + accessToken || '';
}

async function refreshAuthAccessToken() {
  if (retryAuthRefreshToken === 20) {
    removeBrowserCookie(COOKIE_KEY_AUTH_ACCESS_TOKEN_DATA);
    window.location.href = getSSOLoginUrl();
  }
  retryAuthRefreshToken++;
  console.log('refreshAuthAccessToken');
  const authAccessTokenData = getBrowserCookie(
    COOKIE_KEY_AUTH_ACCESS_TOKEN_DATA,
  );

  let appAccessTokenData = getBrowserCookie(COOKIE_KEY_APP_ACCESS_TOKEN);
  if (!appAccessTokenData) {
    await refreshAppAccessToken();
    appAccessTokenData = getBrowserCookie(COOKIE_KEY_APP_ACCESS_TOKEN);
  }

  if (authAccessTokenData?.refresh_token) {
    let urlHost = process.env.NEXT_PUBLIC_BACK_CHANNEL_URL
      ? process.env.NEXT_PUBLIC_BACK_CHANNEL_URL
      : 'https://core.bus-staging.softbdltd.com';
    const apiKey = process.env.NEXT_PUBLIC_BACK_CHANNEL_API_KEY
      ? process.env.NEXT_PUBLIC_BACK_CHANNEL_API_KEY
      : null;

    try {
      let {
        data: {id_token, ...responseTokenData},
      } = await axiosInstance.post(
        urlHost + '/sso-renew-access-token',
        {
          refresh_token: authAccessTokenData.refresh_token,
        },
        {
          headers: {
            apikey: apiKey,
          },
        },
      );

      setBrowserCookie(COOKIE_KEY_AUTH_ACCESS_TOKEN_DATA, responseTokenData);

      //TODO: temporary
      setDefaultAuthorizationHeader(responseTokenData.access_token);
      retryAuthRefreshToken = 0;
    } catch (e) {
      console.log('refreshAuthAccessToken-error', e);
      removeBrowserCookie(COOKIE_KEY_AUTH_ACCESS_TOKEN_DATA);
    }
  } else {
    removeBrowserCookie(COOKIE_KEY_AUTH_ACCESS_TOKEN_DATA);
  }
}

export async function refreshAppAccessToken() {
  try {
    let response = await getAppAccessToken({
      throwError: true,
    });

    const {data: tokenData}: any = response;

    let expireDate = new Date();
    expireDate.setTime(
      new Date().getTime() + Number(tokenData.expires_in) * 1000,
    );
    setBrowserCookie(COOKIE_KEY_APP_ACCESS_TOKEN, tokenData, {
      expires: expireDate,
    });
    //TODO: temporary
    setDefaultAuthorizationHeader(response?.data?.access_token);
  } catch (e) {
    console.log(e);
  }
}

export async function getAppAccessToken({throwError = false} = {}) {
  const urlBase = process.env.NEXT_PUBLIC_BACK_CHANNEL_URL
    ? process.env.NEXT_PUBLIC_BACK_CHANNEL_URL
    : 'https://core.bus-staging.softbdltd.com';
  const apiKey = process.env.NEXT_PUBLIC_BACK_CHANNEL_API_KEY
    ? process.env.NEXT_PUBLIC_BACK_CHANNEL_API_KEY
    : null;
  try {
    return await axios.get(urlBase + '/apim-app-oauth2-access-token', {
      headers: {
        apikey: apiKey,
      },
    });
  } catch (e: any) {
    if (throwError) {
      throw e;
    }
  }
}

registerAxiosMockAdapter(axiosInstance);

export default axiosInstance;
