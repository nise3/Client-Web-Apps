import {apiDelete, apiGet, apiPost, apiPut} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {API_ORGANIZATIONS} from '../../@softbd/common/apiRoutes';

/**
 * @deprecated
 */
export const getAllOrganizations = async (params = {}) => {
  try {
    let response: any = await apiGet(API_ORGANIZATIONS, {params});
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

/**
 * @deprecated
 */
export const getOrganization = async (OrganizationId: number) => {
  try {
    let response: any = await apiGet(API_ORGANIZATIONS + '/' + OrganizationId);
    return response.data;
  } catch (catchBlockHandler) {}
};

export const createOrganization = async (data: Organization) => {
  try {
    let response: any = await apiPost(API_ORGANIZATIONS, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateOrganization = async (
  OrganizationId: number,
  data: Organization,
) => {
  try {
    let response: any = await apiPut(
      API_ORGANIZATIONS + '/' + OrganizationId,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const deleteOrganization = async (OrganizationId: number) => {
  try {
    let response: any = await apiDelete(
      API_ORGANIZATIONS + '/' + OrganizationId,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
