import {apiDelete, apiGet, apiPost, apiPut} from "../../common/api";
import {catchBlockHandler} from "../../common/helpers";
import {CORE_SERVICE_PATH} from "../../common/apiRoutes";

const API_USERS = CORE_SERVICE_PATH + '/users';

export const getAllUsers = async () => {
    try {
        let response: any = await apiGet(API_USERS);
        return response.data.data;
    } catch (error) {
        catchBlockHandler(error);
    }
};


export const getUser = async (userId: number) => {
    try {
        let response: any = await apiGet(API_USERS + "/" + userId);
        return response.data.data;
    } catch (error) {
        catchBlockHandler(error);
    }
};

export const createUser = async (data: User) => {
    try {
        let response: any = await apiPost(API_USERS, data);
        return response.data._response_status.success;
    } catch (error) {
        catchBlockHandler(error);
    }
};

export const updateUser = async (userId: number, data: User) => {
    try {
        let response: any = await apiPut(API_USERS + "/" + userId, data);
        return response.data._response_status.success;
    } catch (error) {
        catchBlockHandler(error);
    }
};

export const deleteUser = async (userId: number) => {
    try {
        let response: any = await apiDelete(API_USERS + "/" + userId);
        return response.data._response_status.success;
    } catch (error) {
        catchBlockHandler(error);
    }
};