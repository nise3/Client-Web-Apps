import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import {API_BASE_URL} from '../common/apiRoutes';
import {
  COOKIE_KEY_APP_ACCESS_TOKEN,
  COOKIE_KEY_AUTH_ACCESS_TOKEN_DATA,
} from '../../shared/constants/AppConst';
import cookieInstance from './cookieInstance';
import registerAxiosMockAdapter from './registerAxiosMockAdapter';
import {getSSOLoginUrl} from '../common/SSOConfig';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 300000,
});
axiosInstance.defaults.headers.common['Accept'] = 'application/json';
axiosInstance.defaults.headers.common['Content-Type'] = 'application/json';

axiosInstance.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    const authAccessTokenData = cookieInstance.get(
      COOKIE_KEY_AUTH_ACCESS_TOKEN_DATA,
    );
    // console.log('authAccessTokenData', authAccessTokenData);
    const userAccessToken = authAccessTokenData?.access_token;

    //TODO: temporary
    if (!config.headers['Authorization']) {
      if (userAccessToken) {
        config.headers['Authorization'] = `Bearer ${userAccessToken}`;
      } else {
        const appAccessTokenData = cookieInstance.get(
          COOKIE_KEY_APP_ACCESS_TOKEN,
        );
        config.headers[
          'Authorization'
        ] = `Bearer ${appAccessTokenData?.access_token}`;
      }
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
    return response;
  },
  async function (error) {
    if (error?.response?.status === 401) {
      const authAccessTokenData = cookieInstance.get(
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
  // console.log('setDefaultAuthorizationHeader', accessToken);
  axiosInstance.defaults.headers.common['Authorization'] =
    'Bearer ' + accessToken || '';
}

async function refreshAuthAccessToken() {
  const authAccessTokenData = cookieInstance.get(
    COOKIE_KEY_AUTH_ACCESS_TOKEN_DATA,
  );

  if (authAccessTokenData?.refresh_token) {
    try {
      let {data: responseTokenData} = await axiosInstance.post(
        'https://core.bus-staging.softbdltd.com/sso-renew-access-token',
        {
          refresh_token: authAccessTokenData.refresh_token,
        },
      );

      cookieInstance.set(COOKIE_KEY_AUTH_ACCESS_TOKEN_DATA, responseTokenData, {
        path: '/',
      });

      //TODO: temporary
      setDefaultAuthorizationHeader(responseTokenData.access_token);
    } catch (e) {
      console.log(e);
      cookieInstance.remove(COOKIE_KEY_AUTH_ACCESS_TOKEN_DATA);
      window.location.href = getSSOLoginUrl();
    }
  } else {
    cookieInstance.remove(COOKIE_KEY_AUTH_ACCESS_TOKEN_DATA);
    window.location.href = getSSOLoginUrl();
  }
}

export async function refreshAppAccessToken() {
  try {
    let response = await getAppAccessToken();
    cookieInstance.set(COOKIE_KEY_APP_ACCESS_TOKEN, response?.data, {
      path: '/',
    });
    //TODO: temporary
    setDefaultAuthorizationHeader(response?.data?.access_token);
  } catch (e) {
    console.log(e);
  }
}

export async function getAppAccessToken(throwError = false) {
  try {
    return await axios.get(
      'https://core.bus-staging.softbdltd.com/nise3-app-api-access-token',
    );
  } catch (e: any) {
    if (throwError) {
      throw e;
    }
  }
}

registerAxiosMockAdapter(axiosInstance);

export default axiosInstance;
