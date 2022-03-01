import {apiDelete, apiPost, apiPut} from '../../@softbd/common/api';
import {API_RPL_OCCUPATIONS} from '../../@softbd/common/apiRoutes';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {IRPLOccupation} from '../../shared/Interface/common.interface';

export const deleteRPLOccupation = async (RPLOccupationId: number) => {
  try {
    let response: any = await apiDelete(
      API_RPL_OCCUPATIONS + '/' + RPLOccupationId,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateRPLOccupation = async (
  rplOccupationId: number,
  data: IRPLOccupation,
) => {
  try {
    let response: any = await apiPut(
      API_RPL_OCCUPATIONS + '/' + rplOccupationId,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const createRPLOccupation = async (data: IRPLOccupation) => {
  try {
    let response: any = await apiPost(API_RPL_OCCUPATIONS, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
