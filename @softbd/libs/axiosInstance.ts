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
    const userAccessToken = authAccessTokenData?.access_token;
    // console.log('userAccessToken', userAccessToken);
    // console.log('apiAccessToken', apiAccessToken);

    if (userAccessToken) {
      config.headers['Authorization'] = `Bearer ${userAccessToken}`;
    } else {
      const appAccessToken = cookieInstance.get(COOKIE_KEY_APP_ACCESS_TOKEN);
      config.headers['Authorization'] = `Bearer ${appAccessToken}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

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
    } catch (e) {
      console.log(e);
    }
  }
}

registerAxiosMockAdapter(axiosInstance);

export default axiosInstance;
