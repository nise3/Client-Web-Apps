import {AxiosRequestConfig, AxiosResponse} from 'axios';
import axiosInstance from '../libs/axiosInstance';

/** Axios catch block handler */
const errorHandler = (error: {response: any; request?: any; message?: any}) => {
  throw error;
};

function apiGet(apiPath: string, config: AxiosRequestConfig = {}) {
  return axiosInstance
    .get(apiPath, config)
    .then((response: AxiosResponse<any>) => response)
    .catch(errorHandler);
}

function apiPost(apiPath: string, data?: any, config: AxiosRequestConfig = {}) {
  return axiosInstance
    .post(apiPath, data, config)
    .then((response: AxiosResponse<any>) => response)
    .catch(errorHandler);
}

function apiDelete(apiPath: string) {
  return axiosInstance
    .delete(apiPath)
    .then((response: AxiosResponse<any>) => response)
    .catch(errorHandler);
}

function apiPut(apiPath: string, data = {}) {
  return axiosInstance
    .put(apiPath, data)
    .then((response: AxiosResponse<any>) => response)
    .catch(errorHandler);
}

export {apiGet, apiPost, apiDelete, apiPut};
