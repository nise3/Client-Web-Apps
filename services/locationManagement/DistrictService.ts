import {apiDelete, apiGet, apiPost, apiPut} from "../../common/api";
import {CORE_SERVICE_PATH} from "../../common/apiRoutes";
import {catchBlockHandler} from "../../common/helpers";

const API_DISTRICTS = CORE_SERVICE_PATH + '/districts';

export const getAllDistricts = async () => {
    try {
        let response: any = await apiGet(API_DISTRICTS);
        return response.data.data;
    } catch (error) {
        catchBlockHandler(error);
    }
};

export const getDistrictsByDivision = async (divisionId: number) => {
    try {
        let response: any = await apiGet(API_DISTRICTS + "?division_id=" + divisionId);
        return response.data.data;
    } catch (error) {
        catchBlockHandler(error);
    }
};


export const getDistrict = async (districtId: number) => {
    try {
        let response: any = await apiGet(API_DISTRICTS + "/" + districtId);
        return response.data.data;
    } catch (error) {
        catchBlockHandler(error);
    }
};

export const createDistrict = async (data: District) => {
    try {
        let response: any = await apiPost(API_DISTRICTS, data);
        return response.data._response_status.success;
    } catch (error) {
        catchBlockHandler(error);
    }
};

export const updateDistrict = async (districtId: number, data: District) => {
    try {
        let response: any = await apiPut(API_DISTRICTS + "/" + districtId, data);
        return response.data._response_status.success;
    } catch (error) {
        catchBlockHandler(error);
    }
};

export const deleteDistrict = async (districtId: number) => {
    try {
        let response: any = await apiDelete(API_DISTRICTS + "/" + districtId);
        return response.data._response_status.success;
    } catch (error) {
        catchBlockHandler(error);
    }
};