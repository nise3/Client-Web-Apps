import {apiDelete, apiGet, apiPost, apiPut} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {API_TRAINERS} from '../../@softbd/common/apiRoutes';
import {ITrainer} from '../../shared/Interface/institute.interface';

/**
 * @deprecated
 */
export const getTrainer = async (trainerId: number) => {
  try {
    let response: any = await apiGet(API_TRAINERS + '/' + trainerId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
export const deleteTrainer = async (trainerId: number) => {
  try {
    let response: any = await apiDelete(API_TRAINERS + '/' + trainerId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
export const createTrainer = async (data: ITrainer) => {
  try {
    let response: any = await apiPost(API_TRAINERS, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
export const updateTrainer = async (trainerId: number, data: ITrainer) => {
  try {
    let response: any = await apiPut(API_TRAINERS + '/' + trainerId, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
