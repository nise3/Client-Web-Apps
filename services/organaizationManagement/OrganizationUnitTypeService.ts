import {apiDelete, apiGet, apiPost, apiPut} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {API_ORGANIZATION_UNIT_TYPES} from '../../@softbd/common/apiRoutes';
import {IOrganizationUnitType} from '../../shared/Interface/organization.interface';

/**
 * @deprecated
 */
export const getAllOrganizationUnitTypes = async (params = {}) => {
  try {
    let response: any = await apiGet(API_ORGANIZATION_UNIT_TYPES, {params});
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

/**
 * @deprecated
 */
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
  data: IOrganizationUnitType,
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
  data: IOrganizationUnitType,
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

export const getOrganizationUnitTypeHierarchy = async (
  OrganizationUnitTypeId: any,
) => {
  try {
    let response: any = await apiGet(
      API_ORGANIZATION_UNIT_TYPES +
        '/' +
        OrganizationUnitTypeId +
        '/get-hierarchy',
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
