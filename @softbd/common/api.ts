import {AxiosResponse} from 'axios';
import axiosInstance from './axiosInstance';
import {isDefined} from './helpers';

/** Axios catch block handler */
const errorHandler = (error: {response: any; request?: any; message?: any}) => {
  if (error.response) {
    const {response} = error;
    if (isDefined(response, 'data')) {
      if (
        isDefined(response.data, '_response_status') &&
        response.data._response_status.success == false
      ) {
        throw new Error(response.data._response_status.message);
      }

      throw new Error(response.data.message);
    }
  }
  if (error.request) {
    throw new Error('No response was received');
  }

  throw new Error('Opps! There was a problem. Please try again later.');
};

function apiGet(apiPath: string, params = {}) {
  return axiosInstance
    .get(apiPath, params)
    .then((response: AxiosResponse<any>) => response)
    .catch(errorHandler);
}

function apiPost(apiPath: string, data = {}) {
  return axiosInstance
    .post(apiPath, data)
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
