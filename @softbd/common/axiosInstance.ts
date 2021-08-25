import axios from 'axios';
import {API_BASE_URL} from './apiRoutes';

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
      apiToken =
        'eyJ4NXQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZyIsImtpZCI6Ik16WXhNbUZrT0dZd01XSTBaV05tTkRjeE5HWXdZbU00WlRBM01XSTJOREF6WkdRek5HTTBaR1JsTmpKa09ERmtaRFJpT1RGa01XRmhNelUyWkdWbE5nX1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJhZG1pbiIsImF1dCI6IkFQUExJQ0FUSU9OIiwiYXVkIjoiSm54WkM2ZG9aYmFxNTRtVjMzdFAyaFp3MTBrYSIsIm5iZiI6MTYyOTg3MTgzMCwiYXpwIjoiSm54WkM2ZG9aYmFxNTRtVjMzdFAyaFp3MTBrYSIsInNjb3BlIjoiZGVmYXVsdCIsImlzcyI6Imh0dHBzOlwvXC9idXMuc29mdGJkLnh5ejo0NDNcL29hdXRoMlwvdG9rZW4iLCJleHAiOjE2Mjk4NzU0MzAsImlhdCI6MTYyOTg3MTgzMCwianRpIjoiNTM5ZjI5Y2UtOWUxOC00NTBjLWI4NWItZTYwZmMxOGVjNmRiIn0.E8BC6yW8q0lUodhG0WX-4HTBlRgj12JApnmoUTK3cqH2aW7sJ49_D8Izytq9hTb59H9w7T02tk3AmrQiJiRbCoREu_9IKwwbcqNWsMwjSEmc48Y3mZBvxSGJts7d-LG_6p6f0OL_F384WibHC3dmMK64TphNcTpP55ARwCZ3UDNUYbzYHWle1pl0UDeZOMvCnYDao4ARG_0aTsVbPoHCOp3nwJLxFOhWuTQ6sxXIDKk60qFnon_Q6n5jxWeac_I2HLucXh3GOk3cWBGSZc4B6VfqZWSF1P36cVUHk7FldTPwgWrQuLjD15umbA4HyRwv52kypgQ5wDF4bVNG-kx9xA';
    } else if (urlPath == 'core-api') {
      apiToken =
        'eyJ4NXQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZyIsImtpZCI6Ik16WXhNbUZrT0dZd01XSTBaV05tTkRjeE5HWXdZbU00WlRBM01XSTJOREF6WkdRek5HTTBaR1JsTmpKa09ERmtaRFJpT1RGa01XRmhNelUyWkdWbE5nX1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJhZG1pbiIsImF1dCI6IkFQUExJQ0FUSU9OIiwiYXVkIjoiSm54WkM2ZG9aYmFxNTRtVjMzdFAyaFp3MTBrYSIsIm5iZiI6MTYyOTg3MTg2MSwiYXpwIjoiSm54WkM2ZG9aYmFxNTRtVjMzdFAyaFp3MTBrYSIsInNjb3BlIjoiZGVmYXVsdCIsImlzcyI6Imh0dHBzOlwvXC9idXMuc29mdGJkLnh5ejo0NDNcL29hdXRoMlwvdG9rZW4iLCJleHAiOjE2Mjk4NzU0NjEsImlhdCI6MTYyOTg3MTg2MSwianRpIjoiZGU5MjNmZmYtODg4OS00NWQ1LWJiZGMtNWQyNWFlNjFmMjhkIn0.kK7BP_HQ2RKUfmu43KGLfHRdfMGPVdSmcyi8aIOX7aWCTCZNnwmwLc93FO6yfLMsTscs279MW2rUhI1VqPv9NBMOuDKNvktMflniaj4gTiz6WF-QJO3ymw_Ct1XN1gQdvnRodDopD7u6KtooPxmbuGQQZ8vUnxexkPBM5geUNa38jpK5HNX4Yg_1yvOcMa-CeXsPHixO-PxwzJHMKWe2uWu4L4gboibbk9hRLIsWX87msx1KlVtF855hQbzm5thfVhBPDoVTYy7iQ_1ObcaPAFWetcoJlMbor3Xn19CdDZElNsSTrR1s0yXyyJH92dUozW39eUBEHNEIcs2OL1OUDw';
    } else if (urlPath == 'org') {
      apiToken =
        'eyJ4NXQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZyIsImtpZCI6Ik16WXhNbUZrT0dZd01XSTBaV05tTkRjeE5HWXdZbU00WlRBM01XSTJOREF6WkdRek5HTTBaR1JsTmpKa09ERmtaRFJpT1RGa01XRmhNelUyWkdWbE5nX1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJhZG1pbiIsImF1dCI6IkFQUExJQ0FUSU9OIiwiYXVkIjoiSm54WkM2ZG9aYmFxNTRtVjMzdFAyaFp3MTBrYSIsIm5iZiI6MTYyOTg3NzIxMywiYXpwIjoiSm54WkM2ZG9aYmFxNTRtVjMzdFAyaFp3MTBrYSIsInNjb3BlIjoiZGVmYXVsdCIsImlzcyI6Imh0dHBzOlwvXC9idXMuc29mdGJkLnh5ejo0NDNcL29hdXRoMlwvdG9rZW4iLCJleHAiOjE2Mjk4ODA4MTMsImlhdCI6MTYyOTg3NzIxMywianRpIjoiMjYxOWUwZTEtYmQ1MS00ODc2LWFiOWEtMTE0NDNmYjNkMjMxIn0.pv5xEXq1jpmc5R3g1P_fuMpOXp7eWwt2HUQIVbElmhOsK31zsy2JlioGGw0F41sk6qDIN2ALFoeUGZr9jNn06SRfXoOFeqmKGSc4c4Tv9ubmAGc2VSZGloQ9JRp2ZdkkaLPQrht5ZpQGhMBkaSlEiaq5MvKTtSQ8nGHk8eZvOp1BaL0QOK3DnMGGi67NVq20yG28lcxWOt_IyCYHf3CivS-DhjkQseBgQkiYZQdm5QaYlhetYvfoQV3hii4IWzMWEjVNjP2oL5HPOJ11IKeaL5JHs6MAqhPan04PoebUUgftkXN14m537y4WMW3sY3ggqS9j00FWIy9FKIxE2iL4EA';
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
