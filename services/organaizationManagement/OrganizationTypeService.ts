import {apiDelete, apiGet, apiPost, apiPut} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {API_ORGANIZATION_TYPES} from '../../@softbd/common/apiRoutes';

/**
 * @deprecated
 */
export const getAllOrganizationTypes = async (params = {}) => {
  try {
    let response: any = await apiGet(API_ORGANIZATION_TYPES, {params});
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

/**
 * @deprecated
 * */
export const getOrganizationType = async (OrganizationTypeId: number) => {
  try {
    let response: any = await apiGet(
      API_ORGANIZATION_TYPES + '/' + OrganizationTypeId,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const createOrganizationType = async (data: OrganizationType) => {
  try {
    let response: any = await apiPost(API_ORGANIZATION_TYPES, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateOrganizationType = async (
  OrganizationTypeId: number,
  data: OrganizationType,
) => {
  try {
    let response: any = await apiPut(
      API_ORGANIZATION_TYPES + '/' + OrganizationTypeId,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const deleteOrganizationType = async (organizationTypeId: number) => {
  try {
    let response: any = await apiDelete(
      API_ORGANIZATION_TYPES + '/' + organizationTypeId,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
