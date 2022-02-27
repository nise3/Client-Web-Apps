import {apiDelete, apiPost, apiPut} from '../../@softbd/common/api';
import {API_REGISTERED_TRAINING_ORGANIZATIONS} from '../../@softbd/common/apiRoutes';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {IInstitute} from '../../shared/Interface/institute.interface';

export const deleteRTO = async (RTOId: number) => {
  try {
    let response: any = await apiDelete(
      API_REGISTERED_TRAINING_ORGANIZATIONS + '/' + RTOId,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const createRTO = async (data: IInstitute) => {
  try {
    let response: any = await apiPost(
      API_REGISTERED_TRAINING_ORGANIZATIONS,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateRTO = async (rtoId: number, data: IInstitute) => {
  try {
    let response: any = await apiPut(
      API_REGISTERED_TRAINING_ORGANIZATIONS + '/' + rtoId,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
