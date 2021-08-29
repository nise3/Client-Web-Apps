import {apiDelete, apiGet, apiPost, apiPut} from '../../@softbd/common/api';
import {ORGANIZATION_SERVICE_PATH} from '../../@softbd/common/apiRoutes';

export const API_HUMAN_RESOURCES =
  ORGANIZATION_SERVICE_PATH + '/human-resources;';

export const getAllHumanResources = async (params = {}) => {
  try {
    let response: any = await apiGet(API_HUMAN_RESOURCES, {params});
    return response.data.data;
  } catch (catchBlockHandler) {}
};

export const getHumanResource = async (humanResourceId: number) => {
  try {
    let response: any = await apiGet(
      API_HUMAN_RESOURCES + '/' + humanResourceId,
    );
    return response.data.data;
  } catch (catchBlockHandler) {}
};

export const deleteHumanResource = async (humanResourceId: number) => {
  try {
    let response: any = await apiDelete(
      API_HUMAN_RESOURCES + '/' + humanResourceId,
    );
    return response.data._response_status.success;
  } catch (catchBlockHandler) {}
};

export const createHumanResource = async (data: HumanResource) => {
  try {
    let response: any = await apiPost(API_HUMAN_RESOURCES, data);
    return response.data._response_status.success;
  } catch (catchBlockHandler) {}
};

export const updateHumanResource = async (
  humanResourceId: number,
  data: HumanResource,
) => {
  try {
    let response: any = await apiPut(
      API_HUMAN_RESOURCES + '/' + humanResourceId,
      data,
    );
    return response.data._response_status.success;
  } catch (catchBlockHandler) {}
};
