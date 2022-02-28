import {apiDelete, apiPost, apiPut} from '../../@softbd/common/api';
import {API_RPL_SECTORS} from '../../@softbd/common/apiRoutes';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {IRPLSector} from '../../shared/Interface/common.interface';

export const deleteRPLSector = async (RPLSectorId: number) => {
  try {
    let response: any = await apiDelete(API_RPL_SECTORS + '/' + RPLSectorId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateRPLSector = async (
  rplSectorId: number,
  data: IRPLSector,
) => {
  try {
    let response: any = await apiPut(API_RPL_SECTORS + '/' + rplSectorId, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const createRPLSector = async (data: IRPLSector) => {
  try {
    let response: any = await apiPost(API_RPL_SECTORS, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
