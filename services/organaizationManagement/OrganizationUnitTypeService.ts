import {apiDelete, apiGet, apiPost, apiPut} from '../../@softbd/common/api';
import {ORGANIZATION_SERVICE_PATH} from '../../@softbd/common/apiRoutes';
import {catchBlockHandler} from '../../@softbd/common/helpers';

const API_ORGANIZATION_UNIT_TYPES =
  ORGANIZATION_SERVICE_PATH + '/organization-unit-types';

export const getAllOrganizationUnitTypes = async (params = {}) => {
  try {
    let response: any = await apiGet(API_ORGANIZATION_UNIT_TYPES, {params});
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const getOrganizationUnitType = async (
  OrganizationUnitTypeId: number,
) => {
  try {
    let response: any = await apiGet(
      API_ORGANIZATION_UNIT_TYPES + '/' + OrganizationUnitTypeId,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const createOrganizationUnitType = async (
  data: OrganizationUnitType,
) => {
  try {
    let response: any = await apiPost(API_ORGANIZATION_UNIT_TYPES, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateOrganizationUnitType = async (
  OrganizationUnitTypeId: number,
  data: OrganizationUnitType,
) => {
  try {
    let response: any = await apiPut(
      API_ORGANIZATION_UNIT_TYPES + '/' + OrganizationUnitTypeId,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const deleteOrganizationUnitType = async (
  organizationUnitTypeId: number,
) => {
  try {
    let response: any = await apiDelete(
      API_ORGANIZATION_UNIT_TYPES + '/' + organizationUnitTypeId,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
