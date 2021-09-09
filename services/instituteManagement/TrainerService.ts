import {apiDelete, apiGet, apiPost, apiPut} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/common/helpers';
import {INSTITUTE_SERVICE_PATH} from '../../@softbd/common/apiRoutes';

const API_INSTITUTE_SERVICES = INSTITUTE_SERVICE_PATH + '/trainers';

export const getAllTrainers = async (params = {}) => {
  try {
    let response: any = await apiGet(API_INSTITUTE_SERVICES, {params});
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
export const getTrainer = async (trainerId: number) => {
  try {
    let response: any = await apiGet(API_INSTITUTE_SERVICES + '/' + trainerId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
export const deleteTrainer = async (trainerId: number) => {
  try {
    let response: any = await apiDelete(
      API_INSTITUTE_SERVICES + '/' + trainerId,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
export const createTrainer = async (data: Trainer) => {
  try {
    let response: any = await apiPost(API_INSTITUTE_SERVICES, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
export const updateTrainer = async (trainerId: number, data: Trainer) => {
  try {
    let response: any = await apiPut(
      API_INSTITUTE_SERVICES + '/' + trainerId,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
