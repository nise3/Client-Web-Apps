import {apiDelete, apiGet, apiPost, apiPut} from "../../common/api";
import {catchBlockHandler} from "../../common/helpers";
import {CORE_SERVICE_PATH} from "../../common/apiRoutes";

const API_PERMISSION_GROUPS = CORE_SERVICE_PATH + '/permission-groups';

export const getAllPermissionGroups = async () => {
    try {
        let response: any = await apiGet(API_PERMISSION_GROUPS);
        return response.data.data;
    } catch (error) {
        catchBlockHandler(error);
    }
};


export const getPermissionGroup = async (permissionGroupId: number) => {
    try {
        let response: any = await apiGet(API_PERMISSION_GROUPS + "/" + permissionGroupId);
        return response.data.data;
    } catch (error) {
        catchBlockHandler(error);
    }
};

export const createPermissionGroup = async (data: PermissionGroup) => {
    try {
        let response: any = await apiPost(API_PERMISSION_GROUPS, data);
        return response.data._response_status.success;
    } catch (error) {
        catchBlockHandler(error);
    }
};

export const updatePermissionGroup = async (permissionGroupId: number, data: PermissionGroup) => {
    try {
        let response: any = await apiPut(API_PERMISSION_GROUPS + "/" + permissionGroupId, data);
        return response.data._response_status.success;
    } catch (error) {
        catchBlockHandler(error);
    }
};

export const deletePermissionGroup = async (permissionGroupId: number) => {
    try {
        let response: any = await apiDelete(API_PERMISSION_GROUPS + "/" + permissionGroupId);
        return response.data._response_status.success;
    } catch (error) {
        catchBlockHandler(error);
    }
};