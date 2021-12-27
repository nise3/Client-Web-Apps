import {apiDelete, apiGet, apiPost, apiPut} from '../../@softbd/common/api';
import {API_HUMAN_RESOURCE_TEMPLATES} from '../../@softbd/common/apiRoutes';
import {IHumanResourceTemplate} from '../../shared/Interface/humanResourceTemplates.interface';

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
  data: IHumanResourceTemplate,
) => {
  try {
    let response: any = await apiPost(API_HUMAN_RESOURCE_TEMPLATES, data);
    return response.data;
  } catch (catchBlockHandler) {}
};

export const updateHumanResourceTemplate = async (
  humanResourceTemplateId: number,
  data: IHumanResourceTemplate,
) => {
  try {
    let response: any = await apiPut(
      API_HUMAN_RESOURCE_TEMPLATES + '/' + humanResourceTemplateId,
      data,
    );
    return response.data;
  } catch (catchBlockHandler) {}
};
