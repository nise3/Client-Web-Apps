import {apiDelete, apiGet, apiPost, apiPut} from "../../common/api";
import {CORE_SERVICE_PATH} from "../../common/apiRoutes";
import {catchBlockHandler} from "../../common/helpers";

const API_UPAZILAS = CORE_SERVICE_PATH + '/upazilas';

export const getAllUpazilas = async () => {
    try {
        let response: any = await apiGet(API_UPAZILAS);
        return response.data.data;
    } catch (error) {
        catchBlockHandler(error);
    }
};

export const getUpazilasByDistrict = async (districtId: number) => {
    try {
        let response: any = await apiGet(API_UPAZILAS + "?district_id=" + districtId);
        return response.data.data;
    } catch (error) {
        catchBlockHandler(error);
    }
};


export const getUpazila = async (upazilaId: number) => {
    try {
        let response: any = await apiGet(API_UPAZILAS + "/" + upazilaId);
        return response.data.data;
    } catch (error) {
        catchBlockHandler(error);
    }
};

export const createUpazila = async (data: Upazila) => {
    try {
        let response: any = await apiPost(API_UPAZILAS, data);
        return response.data._response_status.success;
    } catch (error) {
        catchBlockHandler(error);
    }
};

export const updateUpazila = async (upazilaId: number, data: Upazila) => {
    try {
        let response: any = await apiPut(API_UPAZILAS + "/" + upazilaId, data);
        return response.data._response_status.success;
    } catch (error) {
        catchBlockHandler(error);
    }
};

export const deleteUpazila = async (upazilaId: number) => {
    try {
        let response: any = await apiDelete(API_UPAZILAS + "/" + upazilaId);
        return response.data._response_status.success;
    } catch (error) {
        catchBlockHandler(error);
    }
};