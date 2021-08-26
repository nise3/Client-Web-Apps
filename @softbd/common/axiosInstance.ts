import axios from 'axios';
import {API_BASE_URL} from './apiRoutes';
import token from './appToken';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  //withCredentials: true,
  timeout: 300000,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    // const accessToken = ''; //getAccessToken();

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
      // Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

// Response interceptor for API calls
axiosInstance.interceptors.response.use(
  (response) => {
    //console.log('axios interceptors response', response);
    return response;
  },
  async function (error) {
    // const originalRequest = error.config;
    // let responseStatus = error.response.status;

    // if (
    //   originalRequest.url === API_AUTH_REFRESH_TOKEN &&
    //   (responseStatus === 500 || responseStatus === 401)
    // ) {
    //   removeLocalStorageAuthData();
    //   store.dispatch(authInitLogout(() => {}));
    //
    //   // return (dispatch: any, getState: any) => {
    //   //   console.log('dispatch', dispatch);
    //   //   dispatch(authInitLogout(() => {}));
    //   // };
    // }
    // if (
    //   error.response.status === 401 &&
    //   !originalRequest._retry &&
    //   originalRequest.url != API_AUTH_REFRESH_TOKEN
    // ) {
    //   originalRequest._retry = true;
    //   const response = await refreshAccessToken();
    //
    //   await setLocalStorageAuthData(
    //     response.data.authToken,
    //     response.data.refreshToken,
    //     response.data.user.id
    //   );
    //
    //   axiosInstance.defaults.headers.common['Authorization'] =
    //     'Bearer ' + response.data.access_token;
    //   return axiosInstance(originalRequest);
    // }

    return Promise.reject(error);
  },
);

export default axiosInstance;
