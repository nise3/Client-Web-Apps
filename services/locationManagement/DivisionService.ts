import {apiDelete, apiGet, apiPost, apiPut} from "../../common/api";
import { CORE_SERVICE_PATH} from "../../common/apiRoutes";
import {catchBlockHandler} from "../../common/helpers";

const API_DIVISIONS = CORE_SERVICE_PATH + '/divisions';

export const getAllDivisions = async () => {
    try {
        let response: any = await apiGet(API_DIVISIONS);
        return response.data.data;
    } catch (error) {
        catchBlockHandler(error);
    }
};


export const getDivision = async (divisionId: number) => {
    try {
        let response: any = await apiGet(API_DIVISIONS + "/" + divisionId);
        return response.data.data;
    } catch (error) {
        catchBlockHandler(error);
    }
};

export const createDivision = async (data: Division) => {
    try {
        let response: any = await apiPost(API_DIVISIONS, data);
        return response.data._response_status.success;
    } catch (error) {
        catchBlockHandler(error);
    }
};

export const updateDivision = async (divisionId: number, data: Division) => {
    try {
        let response: any = await apiPut(API_DIVISIONS + "/" + divisionId, data);
        return response.data._response_status.success;
    } catch (error) {
        catchBlockHandler(error);
    }
};

export const deleteDivision = async (divisionId: number) => {
    try {
        let response: any = await apiDelete(API_DIVISIONS + "/" + divisionId);
        return response.data._response_status.success;
    } catch (error) {
        catchBlockHandler(error);
    }
};