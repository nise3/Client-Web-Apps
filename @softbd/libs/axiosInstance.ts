import axios from 'axios';
import {API_BASE_URL} from '../common/apiRoutes';
import {COOKIE_KEY_AUTH_ACCESS_TOKEN_DATA} from '../../shared/constants/AppConst';
import apiAccessToken from '../common/appToken';
import cookieInstance from './cookieInstance';
import registerAxiosMockAdapter from './registerAxiosMockAdapter';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 300000,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const authAccessTokenData = cookieInstance.get(
      COOKIE_KEY_AUTH_ACCESS_TOKEN_DATA,
    );
    const userAccessToken = authAccessTokenData?.access_token;
    console.log('userAccessToken', userAccessToken);

    config.headers['Accept'] = 'application/json';
    config.headers['Content-Type'] = 'application/json';
    config.headers['Authorization'] = `Bearer ${
      userAccessToken || apiAccessToken
    }`;
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

registerAxiosMockAdapter(axiosInstance);

export default axiosInstance;
// https://bus-staging.softbdltd.com/oauth2/token
