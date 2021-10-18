import {apiDelete, apiPost, apiPut} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {API_DIVISIONS} from '../../@softbd/common/apiRoutes';

export const createDivision = async (data: Division) => {
  try {
    let response: any = await apiPost(API_DIVISIONS, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateDivision = async (divisionId: number, data: Division) => {
  try {
    let response: any = await apiPut(API_DIVISIONS + '/' + divisionId, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const deleteDivision = async (divisionId: number) => {
  try {
    let response: any = await apiDelete(API_DIVISIONS + '/' + divisionId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
