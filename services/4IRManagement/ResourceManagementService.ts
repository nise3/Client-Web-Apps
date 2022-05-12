import {apiDelete, apiGet, apiPost, apiPut} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {IResource} from '../../shared/Interface/4IR.interface';
import {API_4IR_RESOURCE_MANAGEMENT} from '../../@softbd/common/apiRoutes';

export const getAll4IRResources = async (params = {}) => {
  try {
    let response: any = await apiGet(API_4IR_RESOURCE_MANAGEMENT, {params});
    return response.data;
  } catch (error) {
    console.log(error);
    catchBlockHandler(error);
  }
};

export const createFourIRResource = async (data: IResource) => {
  try {
    let response: any = await apiPost<IResource>(
      API_4IR_RESOURCE_MANAGEMENT,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateFourIRResource = async (
  resourceId: number,
  data: IResource,
) => {
  try {
    let response: any = await apiPut<IResource>(
      API_4IR_RESOURCE_MANAGEMENT + '/' + resourceId,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const deleteFourIRResource = async (resourceId: number) => {
  try {
    let response: any = await apiDelete(
      API_4IR_RESOURCE_MANAGEMENT + '/' + resourceId,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
