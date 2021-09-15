import {AxiosResponse} from 'axios';
import axiosMockInstance from '../libs/axiosMockInstance';
import {isDefined} from "../utilities/helpers";

/** Axios catch block handler */
const errorHandler = (error: { response: any; request?: any; message?: any }) => {
    if (error.response) {
        const {response} = error;
        if (isDefined(response, 'data')) {
            if (isDefined(response.data, '_response_status') && response.data._response_status.success == false) {
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

function apiMockGet(apiPath: string, params = {}) {
    return axiosMockInstance
        .get(apiPath, params)
        .then((response: AxiosResponse<any>) => response)
        .catch(errorHandler);
}

function apiMockPost(apiPath: string, data = {}) {
    return axiosMockInstance
        .post(apiPath, data)
        .then((response: AxiosResponse<any>) => response)
        .catch(errorHandler);
}

function apiMockDelete(apiPath: string) {
    return axiosMockInstance
        .delete(apiPath)
        .then((response: AxiosResponse<any>) => response)
        .catch(errorHandler);
}

function apiMockPut(apiPath: string, data = {}) {
    return axiosMockInstance
        .put(apiPath, data)
        .then((response: AxiosResponse<any>) => response)
        .catch(errorHandler);
}

export {
    apiMockGet,
    apiMockPost,
    apiMockDelete,
    apiMockPut
};
