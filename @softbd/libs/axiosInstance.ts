import axios from 'axios';
import {API_BASE_URL} from '../common/apiRoutes';
import token from '../common/appToken';
import {Cookies} from 'react-cookie';
import {COOKIE_KEY_AUTH_ACCESS_TOKEN_DATA} from '../../shared/constants/AppConst';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  //withCredentials: true,
  timeout: 300000,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const cookies = new Cookies();
    const authAccessTokenData = cookies.get(COOKIE_KEY_AUTH_ACCESS_TOKEN_DATA);
    const accessToken = authAccessTokenData?.access_token;

    let apiToken = '';
    /**
     * For development purpose. It should be commented in production mode
     */

    let urlPath = config.url?.split('/')[1];

    if (urlPath == 'institute') {
      apiToken = token.instituteApi;
    } else if (urlPath == 'core') {
      apiToken = token.coreApi;
    } else if (urlPath == 'org') {
      apiToken = token.orgApi;
    }

    config.headers = {
      Token: `Bearer ${apiToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    } else {
      delete config.headers['Authorization'];
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

export default axiosInstance;
