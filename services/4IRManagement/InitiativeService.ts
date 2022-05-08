import {apiDelete, apiGet, apiPost, apiPut} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {API_4IR_INITIATIVE} from '../../@softbd/common/apiRoutes';
import {IInitiative} from '../../shared/Interface/4IR.interface';

export const getAllInitiatives = async (params = {}) => {
  try {
    let response: any = await apiGet(API_4IR_INITIATIVE, {params});
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

/**
 * @deprecated
 */
export const getInitiative = async (initiativeId: number) => {
  try {
    let response: any = await apiGet(API_4IR_INITIATIVE + '/' + initiativeId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const createInitiative = async (data: IInitiative) => {
  try {
    let response: any = await apiPost(API_4IR_INITIATIVE, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateInitiative = async (
  initiativeId: number,
  data: IInitiative,
) => {
  try {
    let response: any = await apiPut(
      API_4IR_INITIATIVE + '/' + initiativeId,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const deleteInitiative = async (initiativeId: number) => {
  try {
    let response: any = await apiDelete(
      API_4IR_INITIATIVE + '/' + initiativeId,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
