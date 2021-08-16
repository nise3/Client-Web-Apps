import {apiDelete, apiGet, apiPost, apiPut} from "../../common/api";
import {catchBlockHandler} from "../../common/helpers";
import {ORGANIZATION_SERVICE_PATH} from "../../common/apiRoutes";

const API_JOB_SECTORS = ORGANIZATION_SERVICE_PATH + '/job-sectors';

export const getAllJobSectors = async () => {
    try {
        let response: any = await apiGet(API_JOB_SECTORS);
        return response.data.data;
    } catch (error) {
        catchBlockHandler(error);
    }
};

export const getJobSector = async (jobSectorId: number) => {
    try {
        let response: any = await apiGet(API_JOB_SECTORS + "/" + jobSectorId);
        return response.data.data;
    } catch (error) {
        catchBlockHandler(error);
    }
};


export const createJobSector = async (data: JobSector) => {
    try {
        let response: any = await apiPost(API_JOB_SECTORS, data);
        return response.data._response_status.success;
    } catch (error) {
        catchBlockHandler(error);
    }
};

export const updateJobSector = async (jobSectorId: number, data: JobSector) => {
    try {
        let response: any = await apiPut(API_JOB_SECTORS + "/" + jobSectorId, data);
        return response.data._response_status.success;
    } catch (error) {
        catchBlockHandler(error);
    }
};

export const deleteJobSector = async (jobSectorId: number) => {
    try {
        let response: any = await apiDelete(API_JOB_SECTORS + "/" + jobSectorId);
        return response.data._response_status.success;
    } catch (error) {
        catchBlockHandler(error);
    }
};

