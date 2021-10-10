import axios from 'axios';
import {API_BASE_URL} from '../common/apiRoutes';
import {Cookies} from 'react-cookie';
import {COOKIE_KEY_AUTH_ACCESS_TOKEN_DATA} from '../../shared/constants/AppConst';
import apiAccessToken from '../common/appToken';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  //withCredentials: true,
  timeout: 300000,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const cookies = new Cookies();
    const authAccessTokenData = cookies.get(COOKIE_KEY_AUTH_ACCESS_TOKEN_DATA);
    const userAccessToken = authAccessTokenData?.access_token;
    console.log('userAccessToken', userAccessToken);

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
