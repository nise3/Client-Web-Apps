import {apiDelete, apiGet, apiPost, apiPut} from "../../common/api";
import {API_DISTRICTS, ORGANIZATION_SERVICE_PATH} from "../../common/apiRoutes";
import {catchBlockHandler} from "../../common/helpers";

const API_ORGANIZATION_UNITS = ORGANIZATION_SERVICE_PATH + '/organization-units';

export const getAllOrganizationUnits = async () => {
    try {
        let response: any = await apiGet(API_ORGANIZATION_UNITS);
        return response.data.data;
    } catch (error) {
        catchBlockHandler(error);
    }
};

export const getOrganizationUnit = async (OrganizationUnitId: number) => {
    try {
        let response: any = await apiGet(API_ORGANIZATION_UNITS + "/" + OrganizationUnitId);
        return response.data.data;
    } catch (catchBlockHandler) {
    }
};


export const createOrganizationUnit = async (data: OrganizationUnit) => {
    try {
        let response: any = await apiPost(API_ORGANIZATION_UNITS, data);
        return response.data._response_status.success;
    } catch (error) {
        catchBlockHandler(error);
    }
};

export const updateOrganizationUnit = async (OrganizationUnitId: number, data: OrganizationUnit) => {
    try {
        let response: any = await apiPut(API_ORGANIZATION_UNITS + "/" + OrganizationUnitId, data);
        return response.data._response_status.success;
    } catch (error) {
        catchBlockHandler(error);
    }
};

export const deleteOrganizationUnit = async (OrganizationUnitId: number) => {
    try {
        let response: any = await apiDelete(API_ORGANIZATION_UNITS + "/" + OrganizationUnitId);
        return response.data._response_status.success;
    } catch (error) {
        catchBlockHandler(error);
    }
};

