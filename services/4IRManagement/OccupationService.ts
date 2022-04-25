import {apiDelete, apiGet, apiPost, apiPut} from '../../@softbd/common/api';
import {API_4IR_OCCUPATIONS} from '../../@softbd/common/apiRoutes';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {IOccupation} from '../../shared/Interface/4IR.interface';

export const getAll4IROccupations = async (params = {}) => {
  try {
    let response: any = await apiGet(API_4IR_OCCUPATIONS, {params});
    return response.data;
  } catch (error) {
    console.log(error);
    catchBlockHandler(error);
  }
};

export const createFourIROccupation = async (data: IOccupation) => {
  try {
    let response: any = await apiPost<IOccupation>(API_4IR_OCCUPATIONS, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateFourIROccupation = async (
  occupationId: number,
  data: IOccupation,
) => {
  try {
    let response: any = await apiPut<IOccupation>(
      API_4IR_OCCUPATIONS + '/' + occupationId,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const deleteFourIROccupation = async (occupationId: number) => {
  try {
    let response: any = await apiDelete(
      API_4IR_OCCUPATIONS + '/' + occupationId,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
