import {apiDelete, apiGet, apiPost} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {API_4IR_TOT} from '../../@softbd/common/apiRoutes';

export const getAllToT = async (params = {}) => {
  try {
    let response: any = await apiGet(API_4IR_TOT, {params});
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

/**
 * @deprecated
 */
export const getToT = async (totId: number) => {
  try {
    let response: any = await apiGet(API_4IR_TOT + '/' + totId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const createToT = async (data: any) => {
  try {
    let response: any = await apiPost(API_4IR_TOT, data, {
      headers: {
        Accept: '*/*',
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateToT = async (totId: number, data: any) => {
  try {
    let response: any = await apiPost(API_4IR_TOT + '/' + totId, data, {
      headers: {
        Accept: '*/*',
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const deleteToT = async (totId: number) => {
  try {
    let response: any = await apiDelete(API_4IR_TOT + '/' + totId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
