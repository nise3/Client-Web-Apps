import {apiDelete, apiGet, apiPost, apiPut} from "../../common/api";
import {catchBlockHandler} from "../../common/helpers";

const API_BRANCHES = '/branches'

export const getAllBranches = async () => {
    try {
        let response: any = await apiGet(API_BRANCHES);
        return response.data.data;
    } catch (error) {
        catchBlockHandler(error);
    }
};

export const getBranchesByInstitute = async (instituteId: number) => {
    try {
        let response: any = await apiGet(API_BRANCHES + "?institute_id=" + instituteId);
        return response.data.data;
    } catch (error) {
        catchBlockHandler(error);
    }
};

export const getBranch = async (branchId: number) => {
    try {
        let response: any = await apiGet(API_BRANCHES + "/" + branchId);
        return response.data.data;
    } catch (catchBlockHandler) {
    }
};


export const createBranch = async (data: Branch) => {
    try {
        let response: any = await apiPost(API_BRANCHES, data);
        return response.data._response_status.success;
    } catch (error) {
        catchBlockHandler(error);
    }
};

export const updateBranch = async (branchId: number, data: Branch) => {
    try {
        let response: any = await apiPut(API_BRANCHES + "/" + branchId, data);
        return response.data._response_status.success;
    } catch (error) {
        catchBlockHandler(error);
    }
};

export const deleteBranch = async (branchId: number) => {
    try {
        let response: any = await apiDelete(API_BRANCHES + "/" + branchId);
        return response.data._response_status.success;
    } catch (error) {
        catchBlockHandler(error);
    }
};

