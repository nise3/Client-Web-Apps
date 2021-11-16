import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import {API_BASE_URL} from '../common/apiRoutes';
import {
  COOKIE_KEY_APP_ACCESS_TOKEN,
  COOKIE_KEY_AUTH_ACCESS_TOKEN_DATA,
} from '../../shared/constants/AppConst';
import cookieInstance from './cookieInstance';
import registerAxiosMockAdapter from './registerAxiosMockAdapter';

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
    console.log('authAccessTokenData', authAccessTokenData);
    const userAccessToken = authAccessTokenData?.access_token;

    //TODO: temporary
    if (!config.headers['Authorization']) {
      if (userAccessToken) {
        config.headers['Authorization'] = `Bearer ${userAccessToken}`;
      } else {
        const appAccessToken = cookieInstance.get(COOKIE_KEY_APP_ACCESS_TOKEN);
        config.headers['Authorization'] = `Bearer ${appAccessToken}`;
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
    // if (error?.response?.status === 401) {
    //   cookieInstance.remove(COOKIE_KEY_APP_ACCESS_TOKEN);
    //   cookieInstance.remove(COOKIE_KEY_AUTH_ACCESS_TOKEN_DATA);
    // }
    return Promise.reject(error);
  },
);

export function setDefaultAuthorizationHeader(accessToken?: string) {
  // console.log('setDefaultAuthorizationHeader', accessToken);
  axiosInstance.defaults.headers.common['Authorization'] =
    'Bearer ' + accessToken || '';
}

export async function loadAppAccessToken() {
  const accessToken = cookieInstance.get(COOKIE_KEY_APP_ACCESS_TOKEN);

  if (!accessToken?.length) {
    try {
      let response = await axios.get(
        'https://core.bus-staging.softbdltd.com/nise3-app-api-access-token',
      );
      cookieInstance.set(
        COOKIE_KEY_APP_ACCESS_TOKEN,
        response?.data?.access_token || '',
        {
          path: '/',
        },
      );
      //TODO: temporary
      setDefaultAuthorizationHeader(response?.data?.access_token);
    } catch (e) {
      console.log(e);
    }
  }
}

registerAxiosMockAdapter(axiosInstance);

export default axiosInstance;
