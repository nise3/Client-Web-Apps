import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import {API_BASE_URL} from '../common/apiRoutes';
import {
  COOKIE_KEY_APP_ACCESS_TOKEN,
  COOKIE_KEY_AUTH_ACCESS_TOKEN_DATA,
} from '../../shared/constants/AppConst';
import cookieInstance from './cookieInstance';
import registerAxiosMockAdapter from './registerAxiosMockAdapter';
import {apiPost} from '../common/api';
import {Base64} from 'js-base64';
import SSOConfig from '../common/SSOConfig';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 300000,
});

axiosInstance.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    const authAccessTokenData = cookieInstance.get(
      COOKIE_KEY_AUTH_ACCESS_TOKEN_DATA,
    );
    const userAccessToken = authAccessTokenData?.access_token;
    console.log('userAccessToken', userAccessToken);

    config.headers['Accept'] = 'application/json';
    config.headers['Content-Type'] = 'application/json';
    if (userAccessToken) {
      config.headers['Authorization'] = `Bearer ${userAccessToken}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

export function loadAppAccessToken() {
  const accessToken = cookieInstance.get(COOKIE_KEY_APP_ACCESS_TOKEN);
  if (accessToken) {
    axiosInstance.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${accessToken}`;
  } else {
    apiPost(
      '/oauth2/token',
      {
        grant_type: 'client_credentials',
      },
      {
        baseURL: 'https://bus-staging.softbdltd.com/',
        headers: {
          Authorization: `Basic ${Base64.encode(
            SSOConfig.clientKey + ':' + SSOConfig.clientSecret,
          )}`,
        },
      },
    )
      .then((response: AxiosResponse<any>) => {
        console.log('/oauth2/token', response);
        axiosInstance.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${accessToken}`;
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  }
}

registerAxiosMockAdapter(axiosInstance);

export default axiosInstance;
