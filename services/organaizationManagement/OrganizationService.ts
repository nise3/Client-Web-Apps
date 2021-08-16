import {apiDelete, apiGet, apiPost, apiPut} from "../../common/api";
import {catchBlockHandler} from "../../common/helpers";
import {ORGANIZATION_SERVICE_PATH} from "../../common/apiRoutes";


const API_ORGANIZATIONS = ORGANIZATION_SERVICE_PATH + '/organizations';

export const getAllOrganizations = async () => {
    try {
        let response: any = await apiGet(API_ORGANIZATIONS);
        return response.data.data;
    } catch (error) {
        catchBlockHandler(error);
    }
};

export const getOrganization = async (OrganizationId: number) => {
    try {
        let response: any = await apiGet(API_ORGANIZATIONS + "/" + OrganizationId);
        return response.data.data;
    } catch (catchBlockHandler) {
    }
};


export const createOrganization = async (data: Organization) => {
    try {
        let response: any = await apiPost(API_ORGANIZATIONS, data);
        return response.data._response_status.success;
    } catch (error) {
        catchBlockHandler(error);
    }
};

export const updateOrganization = async (OrganizationId: number, data: Organization) => {
    try {
        let response: any = await apiPut(API_ORGANIZATIONS + "/" + OrganizationId, data);
        return response.data._response_status.success;
    } catch (error) {
        catchBlockHandler(error);
    }
};

export const deleteOrganization = async (OrganizationId: number) => {
    try {
        let response: any = await apiDelete(API_ORGANIZATIONS + "/" + OrganizationId);
        return response.data._response_status.success;
    } catch (error) {
        catchBlockHandler(error);
    }
};

