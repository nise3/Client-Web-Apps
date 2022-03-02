import {apiDelete, apiPost, apiPut} from '../../@softbd/common/api';
import {API_RPL_LEVELS} from '../../@softbd/common/apiRoutes';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {IRPLLevel} from '../../shared/Interface/common.interface';

export const deleteRPLLevel = async (rplLevelId: number) => {
  try {
    let response: any = await apiDelete(API_RPL_LEVELS + '/' + rplLevelId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateRPLLevel = async (rplLevelId: number, data: IRPLLevel) => {
  try {
    let response: any = await apiPut(API_RPL_LEVELS + '/' + rplLevelId, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const createRPLLevel = async (data: IRPLLevel) => {
  try {
    let response: any = await apiPost(API_RPL_LEVELS, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
