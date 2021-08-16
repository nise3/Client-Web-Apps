import {apiDelete, apiGet, apiPost, apiPut} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/common/helpers';
import {ORGANIZATION_SERVICE_PATH} from '../../@softbd/common/apiRoutes';

const API_ORGANIZATION_TYPES =
  ORGANIZATION_SERVICE_PATH + '/organization-types';

export const getAllOrganizationTypes = async () => {
  try {
    let response: any = await apiGet(API_ORGANIZATION_TYPES);
    return response.data.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const getOrganizationType = async (OrganizationTypeId: number) => {
  try {
    let response: any = await apiGet(
      API_ORGANIZATION_TYPES + '/' + OrganizationTypeId,
    );
    return response.data.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const createOrganizationType = async (data: OrganizationType) => {
  try {
    let response: any = await apiPost(API_ORGANIZATION_TYPES, data);
    return response.data._response_status.success;
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
    return response.data._response_status.success;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const deleteOrganizationType = async (organizationTypeId: number) => {
  try {
    let response: any = await apiDelete(
      API_ORGANIZATION_TYPES + '/' + organizationTypeId,
    );
    return response.data._response_status.success;
  } catch (error) {
    catchBlockHandler(error);
  }
};
