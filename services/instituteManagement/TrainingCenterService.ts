import {apiDelete, apiGet, apiPost, apiPut} from "../../common/api";
import {catchBlockHandler} from "../../common/helpers";
import {INSTITUTE_SERVICE_PATH} from "../../common/apiRoutes";

const API_TRAINING_CENTERS = INSTITUTE_SERVICE_PATH + '/training-centers';

export const getAllTrainingCenters = async () => {
    try {
        let response: any = await apiGet(API_TRAINING_CENTERS);
        return response.data.data;
    } catch (error) {
        catchBlockHandler(error);
    }
};

export const getTrainingCenter = async (trainingCenterId: number) => {
    try {
        let response: any = await apiGet(API_TRAINING_CENTERS + "/" + trainingCenterId);
        return response.data.data;
    } catch (catchBlockHandler) {
    }
};


export const createTrainingCenter = async (data: TrainingCenter) => {
    try {
        let response: any = await apiPost(API_TRAINING_CENTERS, data);
        return response.data._response_status.success;
    } catch (error) {
        catchBlockHandler(error);
    }
};

export const updateTrainingCenter = async (trainingCenterId: number, data: TrainingCenter) => {
    try {
        let response: any = await apiPut(API_TRAINING_CENTERS + "/" + trainingCenterId, data);
        return response.data._response_status.success;
    } catch (error) {
        catchBlockHandler(error);
    }
};

export const deleteTrainingCenter = async (trainingCenterId: number) => {
    try {
        let response: any = await apiDelete(API_TRAINING_CENTERS + "/" + trainingCenterId);
        return response.data._response_status.success;
    } catch (error) {
        catchBlockHandler(error);
    }
};

