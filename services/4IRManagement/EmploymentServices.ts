import {apiDelete, apiGet, apiPost, apiPut} from '../../@softbd/common/api';
import {API_4IR_EMPLOYMENT} from '../../@softbd/common/apiRoutes';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';

export const getAll4IREmployments = async (params = {}) => {
  try {
    let response: any = await apiGet(API_4IR_EMPLOYMENT, {params});
    return response.data;
  } catch (error) {
    console.log(error);
    catchBlockHandler(error);
  }
};

export const createFourIREmployment = async (data: any) => {
  try {
    let response: any = await apiPost<any>(API_4IR_EMPLOYMENT, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateFourIREmployment = async (
  occupationId: number,
  data: any,
) => {
  try {
    let response: any = await apiPut<any>(
      API_4IR_EMPLOYMENT + '/' + occupationId,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const deleteFourIREmployment = async (occupationId: number) => {
  try {
    let response: any = await apiDelete(
      API_4IR_EMPLOYMENT + '/' + occupationId,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
