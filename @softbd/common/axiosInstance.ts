import axios from 'axios';
import {API_BASE_URL, CORE_SERVICE_PATH, INSTITUTE_SERVICE_PATH, ORGANIZATION_SERVICE_PATH} from "./apiRoutes";

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    //withCredentials: true,
    timeout: 300000
});

const axiosMockInstance = axios.create({
    baseURL: API_BASE_URL,
    //withCredentials: true,
    timeout: 300000
});

axiosInstance.interceptors.request.use(
    async (config) => {
        const accessToken = ''//getAccessToken();

        let apiToken = '';
        /**
         * For development purpose. It should be commented in production mode
         */

        let urlPath = config.url?.split('/')[1];

        if (urlPath == 'institute') {
            //apiToken = 'eyJ4NXQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZyIsImtpZCI6Ik16WXhNbUZrT0dZd01XSTBaV05tTkRjeE5HWXdZbU00WlRBM01XSTJOREF6WkdRek5HTTBaR1JsTmpKa09ERmtaRFJpT1RGa01XRmhNelUyWkdWbE5nX1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJkZXZlbG9wZXIiLCJhdXQiOiJBUFBMSUNBVElPTiIsImF1ZCI6ImZ2b0tybjNuUXVJTVdiOXo5SzFSdm1xWWZLZ2EiLCJuYmYiOjE2Mjg2NjA0MzUsImF6cCI6ImZ2b0tybjNuUXVJTVdiOXo5SzFSdm1xWWZLZ2EiLCJzY29wZSI6ImRlZmF1bHQiLCJpc3MiOiJodHRwczpcL1wvYnVzLnNvZnRiZC54eXo6NDQzXC9vYXV0aDJcL3Rva2VuIiwiZXhwIjoxNjI4NjY0MDM1LCJpYXQiOjE2Mjg2NjA0MzUsImp0aSI6IjE0ODViNDY4LThmNGMtNDRjOS1iOWE4LTg5ZDQ4NTM4NTNiNCJ9.ntFMJpunDlZvwjiessTVwMOfOjhSZrOvkcWoJDsesCowdCBF3wlbR_uBDlf-nuK21fUUTqULzNKTQ5vOYqw66FDL554f9M_apoM2Vn-IHUHWGYrVxlFrvolKI4-HV_1hERhLgGD6vmG1BIPPG5J4R7h50tV2tuQj6EYTgvGxGE4Vs30e8slY7aJlPH49NXme8GzYTZ3XDWRsM1aIUVk5HOaqs1s73VvejPRql8pTAx5xhOMoP1R_BGRRcv2tnYvqGIcROVoILnd5ATXckAq_T_z02vTTZpvJ7jAsBUKoJdbkSf8qnxfYUmI4sm9uKk8pm280dbuCOmZmsCqIwNAHeg';
            config.baseURL = 'http://localhost:8000/api/v1';
            config.url = config.url?.replaceAll(INSTITUTE_SERVICE_PATH,'');
        } else if (urlPath == 'core-api') {
            //apiToken = 'eyJ4NXQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZyIsImtpZCI6Ik16WXhNbUZrT0dZd01XSTBaV05tTkRjeE5HWXdZbU00WlRBM01XSTJOREF6WkdRek5HTTBaR1JsTmpKa09ERmtaRFJpT1RGa01XRmhNelUyWkdWbE5nX1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJkZXZlbG9wZXIiLCJhdXQiOiJBUFBMSUNBVElPTiIsImF1ZCI6ImZ2b0tybjNuUXVJTVdiOXo5SzFSdm1xWWZLZ2EiLCJuYmYiOjE2Mjg2NjAwMjcsImF6cCI6ImZ2b0tybjNuUXVJTVdiOXo5SzFSdm1xWWZLZ2EiLCJzY29wZSI6ImRlZmF1bHQiLCJpc3MiOiJodHRwczpcL1wvYnVzLnNvZnRiZC54eXo6NDQzXC9vYXV0aDJcL3Rva2VuIiwiZXhwIjoxNjI4NjYzNjI3LCJpYXQiOjE2Mjg2NjAwMjcsImp0aSI6IjA3YjQ5MTY1LWJkZTktNDFlZC1hNjZhLWNjY2M1NWRiODJmZiJ9.SXL_WRiuh6bMYkFj2DyryJU6DVltZSYCqKmU95zuEPp71g1RW5ycHv1FCYV7QtgG-ht2Bv9UT3zEt1h78bTrNFm26zYBZVW4XNs5gMi6VmCUazoCZFUfkn81kiEQV3f4oh89cGRtuJH-NB8-XJSq59E1LJwJ6h524c_uGvvXD-mlPIBIn6PqKeuQscstF6mLq0k3vrTYAppQBZLf0xdG5UxLkJKSR7pZSHnHLkwDqGW8r4TdBl1-oHWjNXCegmfGvB2ktu8IefuYo_jonI0ec7IicaS1N5DikJueUpy7jKao21vaDh99AWPThAGpIyJ9MBn81YjPNWcWcaUm2VP1Ug';
            config.baseURL = 'http://nise3-api-core.local/api/v1';
            config.url = config.url?.replaceAll(CORE_SERVICE_PATH,'');
        } else if (urlPath == 'org-api') {
            //apiToken = 'eyJ4NXQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZyIsImtpZCI6Ik16WXhNbUZrT0dZd01XSTBaV05tTkRjeE5HWXdZbU00WlRBM01XSTJOREF6WkdRek5HTTBaR1JsTmpKa09ERmtaRFJpT1RGa01XRmhNelUyWkdWbE5nX1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJkZXZlbG9wZXIiLCJhdXQiOiJBUFBMSUNBVElPTiIsImF1ZCI6ImZ2b0tybjNuUXVJTVdiOXo5SzFSdm1xWWZLZ2EiLCJuYmYiOjE2Mjg2NjA0MDYsImF6cCI6ImZ2b0tybjNuUXVJTVdiOXo5SzFSdm1xWWZLZ2EiLCJzY29wZSI6ImRlZmF1bHQiLCJpc3MiOiJodHRwczpcL1wvYnVzLnNvZnRiZC54eXo6NDQzXC9vYXV0aDJcL3Rva2VuIiwiZXhwIjoxNjI4NjY0MDA2LCJpYXQiOjE2Mjg2NjA0MDYsImp0aSI6IjQwOWE5NjFhLTVkNzUtNDQ2MC1hOWM2LTkxZTlmMjA0NGI0MiJ9.j5nLJJymuonulw4D_VmOLsoNrAOeuIntVtklu1dvrVHo9BnFAKuAjRd4mbs1m7DIPFwZILTkHDKmxcr4O5En78hAj_pqqE4M_4MZlmiAIB7e3MuUX5sayD68rAdkHEWhEO35jWWidXY7MkCOR-u8ziXz0BKX-ni6dFhrQpQWEJ4G4mhSmnMchA4IJMhaCbXq5MOWhlAlbU1nSnbdCtCyF-ZB2ei2G21vEyh4UeOsBFjLsGPAshf17ifjQEjVhoOfdeoJ6pYETEXZbxYJpoKasFTM-heDDOKFXlKPf-EL_S_HDY74I9nKj_8kLuunhTWx_rMx8WANIzimk_O7SR3C3g';
            config.baseURL = 'http://localhost:8000/api/v1';
            config.url = config.url?.replaceAll(ORGANIZATION_SERVICE_PATH,'');
        }

        /**,
         * End
         * */
        //let authToken = config.url === API_AUTH_LOGIN ? '' : `Bearer ${accessToken}`;
        config.headers = {
            //Token: `Bearer ${apiToken}`,
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
            'Content-Type': 'application/json'
        };


        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

// Response interceptor for API calls
axiosInstance.interceptors.response.use(
    (response) => {
        //console.log('axios interceptors response', response);
        return response;
    },
    async function (error) {
        const originalRequest = error.config;
        let responseStatus = error.response.status;

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
    }
);

export default axiosInstance;
