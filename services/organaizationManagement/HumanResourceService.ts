import {apiDelete, apiGet, apiPost, apiPut} from '../../@softbd/common/api';
import {API_HUMAN_RESOURCES} from '../../@softbd/common/apiRoutes';
import {IHumanResource} from '../../shared/Interface/humanResources.interface';

export const getAllHumanResources = async (params = {}) => {
  try {
    let response: any = await apiGet(API_HUMAN_RESOURCES, {params});
    return response.data;
  } catch (catchBlockHandler) {}
};

export const getHumanResource = async (humanResourceId: number) => {
  try {
    let response: any = await apiGet(
      API_HUMAN_RESOURCES + '/' + humanResourceId,
    );
    return response.data;
  } catch (catchBlockHandler) {}
};

export const deleteHumanResource = async (humanResourceId: number) => {
  try {
    let response: any = await apiDelete(
      API_HUMAN_RESOURCES + '/' + humanResourceId,
    );
    return response.data;
  } catch (catchBlockHandler) {}
};

export const createHumanResource = async (data: IHumanResource) => {
  try {
    let response: any = await apiPost<IHumanResource>(
      API_HUMAN_RESOURCES,
      data,
    );
    return response.data;
  } catch (catchBlockHandler) {}
};

export const updateHumanResource = async (
  humanResourceId: number,
  data: IHumanResource,
) => {
  try {
    let response: any = await apiPut<IHumanResource>(
      API_HUMAN_RESOURCES + '/' + humanResourceId,
      data,
    );
    return response.data;
  } catch (catchBlockHandler) {}
};
