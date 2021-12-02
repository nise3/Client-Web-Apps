import {apiDelete, apiPost, apiPut} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {API_UPAZILAS} from '../../@softbd/common/apiRoutes';
import {Upazila} from '../../shared/Interface/location.interface';

export const createUpazila = async (data: Upazila) => {
  try {
    let response: any = await apiPost(API_UPAZILAS, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateUpazila = async (upazilaId: number, data: Upazila) => {
  try {
    let response: any = await apiPut(API_UPAZILAS + '/' + upazilaId, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const deleteUpazila = async (upazilaId: number) => {
  try {
    let response: any = await apiDelete(API_UPAZILAS + '/' + upazilaId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
