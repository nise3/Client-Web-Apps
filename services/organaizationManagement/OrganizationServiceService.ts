import {apiDelete, apiGet, apiPost, apiPut} from "../../common/api";
import {catchBlockHandler} from "../../common/helpers";
import {ORGANIZATION_SERVICE_PATH} from "../../common/apiRoutes";

const API_ORGANIZATION_SERVICES = ORGANIZATION_SERVICE_PATH + "/services"

export const getAllServices = async () => {
    try {
        let response: any = await apiGet(API_ORGANIZATION_SERVICES);
        return response.data.data;
    } catch (error) {
        catchBlockHandler(error);
    }
};

export const getService = async (serviceId: number) => {
    try {
        let response: any = await apiGet(API_ORGANIZATION_SERVICES + "/" + serviceId);
        return response.data.data;
    } catch (error) {
        catchBlockHandler(error);
    }
};

export const deleteService = async (serviceId: number) => {
    try {
        let response: any = await apiDelete(API_ORGANIZATION_SERVICES + "/" + serviceId);
        return response.data._response_status.success;
    } catch (error) {
        catchBlockHandler(error);
    }
};

export const createService = async (data: Service) => {
    try {
        let response: any = await apiPost(API_ORGANIZATION_SERVICES, data);
        return response.data._response_status.success;
    } catch (error) {
        catchBlockHandler(error);
    }
};

export const updateService = async (serviceId: number, data: Service) => {
    try {
        let response: any = await apiPut(API_ORGANIZATION_SERVICES + "/" + serviceId, data);
        return response.data._response_status.success;
    } catch (error) {
        catchBlockHandler(error);
    }
};

