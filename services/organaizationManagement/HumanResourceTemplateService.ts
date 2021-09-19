import {apiDelete, apiGet, apiPost, apiPut} from '../../@softbd/common/api';
import {ORGANIZATION_SERVICE_PATH} from '../../@softbd/common/apiRoutes';

export const API_HUMAN_RESOURCE_TEMPLATES =
  ORGANIZATION_SERVICE_PATH + '/human-resource-templates';

export const getAllHumanResourceTemplates = async (params = {}) => {
  try {
    let response: any = await apiGet(API_HUMAN_RESOURCE_TEMPLATES, {params});
    return response.data;
  } catch (catchBlockHandler) {}
};

export const getHumanResourceTemplate = async (
  humanResourceTemplateId: number,
) => {
  try {
    let response: any = await apiGet(
      API_HUMAN_RESOURCE_TEMPLATES + '/' + humanResourceTemplateId,
    );
    return response.data;
  } catch (catchBlockHandler) {}
};

export const deleteHumanResourceTemplate = async (
  humanResourceTemplateId: number,
) => {
  try {
    let response: any = await apiDelete(
      API_HUMAN_RESOURCE_TEMPLATES + '/' + humanResourceTemplateId,
    );
    return response.data;
  } catch (catchBlockHandler) {}
};

export const createHumanResourceTemplate = async (
  data: HumanResourceTemplate,
) => {
  try {
    let response: any = await apiPost(API_HUMAN_RESOURCE_TEMPLATES, data);
    return response.data;
  } catch (catchBlockHandler) {}
};

export const updateHumanResourceTemplate = async (
  humanResourceTemplateId: number,
  data: HumanResourceTemplate,
) => {
  try {
    let response: any = await apiPut(
      API_HUMAN_RESOURCE_TEMPLATES + '/' + humanResourceTemplateId,
      data,
    );
    return response.data;
  } catch (catchBlockHandler) {}
};
