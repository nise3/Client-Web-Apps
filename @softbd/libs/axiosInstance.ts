import axios from 'axios';
import {API_BASE_URL} from '../common/apiRoutes';
import {COOKIE_KEY_AUTH_ACCESS_TOKEN_DATA} from '../../shared/constants/AppConst';
import token from '../common/appToken';
import cookieInstance from './cookieInstance';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  //withCredentials: true,
  timeout: 300000,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const authAccessTokenData = cookieInstance.get(
      COOKIE_KEY_AUTH_ACCESS_TOKEN_DATA,
    );
    const userAccessToken = authAccessTokenData?.access_token;
    console.log('userAccessToken', userAccessToken);
    let apiAccessToken = '';
    /**
     * For development purpose. It should be commented in production mode
     */

    let urlPath = config.url?.split('/')[1];

    if (urlPath == 'institute') {
      apiAccessToken = token.instituteApi;
    } else if (urlPath == 'core') {
      apiAccessToken = token.coreApi;
    } else if (urlPath == 'org') {
      apiAccessToken = token.orgApi;
    }

    config.headers = {
      /*Token: `Bearer ${apiAccessToken}`,*/
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    config.headers['Authorization'] = `Bearer ${
      userAccessToken || apiAccessToken
    }`;
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

export default axiosInstance;
