import axios from 'axios';
import {API_BASE_URL} from '../common/apiRoutes';
import {Cookies} from 'react-cookie';
import {COOKIE_KEY_AUTH_ACCESS_TOKEN_DATA} from '../../shared/constants/AppConst';
// import token from '../common/appToken';

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
    console.log('accessToken', accessToken);
    let apiToken = '';
    /**
     * For development purpose. It should be commented in production mode
     */

    // let urlPath = config.url?.split('/')[1];

    // export const CORE_SERVICE_PATH = ':8008/core/api/v1';
    // export const ORGANIZATION_SERVICE_PATH = ':8010/org/api/v1';
    // export const INSTITUTE_SERVICE_PATH = ':8009/institute/api/v1';
    // if (urlPath == 'institute') {
    //   config.baseURL = API_BASE_URL + ':8009';
    //   config.url = config.url?.replace('/institute', '');
    // } else if (urlPath == 'core') {
    //   config.baseURL = API_BASE_URL + ':8008';
    //   config.url = config.url?.replace('/core', '');
    // } else if (urlPath == 'org') {
    //   config.baseURL = API_BASE_URL + ':8010';
    //   config.url = config.url?.replace('/org', '');
    // }

    config.headers = {
      /*Token: `Bearer ${apiToken}`,*/
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    if (accessToken) {
      delete config.headers['Token'];
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    } else {
      config.headers['Token'] = `Bearer ${apiToken}`;
      delete config.headers['Authorization'];
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

export default axiosInstance;
