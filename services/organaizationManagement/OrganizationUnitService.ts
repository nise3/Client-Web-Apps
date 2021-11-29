import {apiDelete, apiGet, apiPost, apiPut} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {API_ORGANIZATION_UNITS} from '../../@softbd/common/apiRoutes';
import {IOrganizationUnit} from '../../shared/Interface/organization.interface';

/**
 * @deprecated
 */
export const getAllOrganizationUnits = async (params = {}) => {
  try {
    let response: any = await apiGet(API_ORGANIZATION_UNITS, {params});
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

/**
 * @deprecated
 */
export const getOrganizationUnit = async (OrganizationUnitId: number) => {
  try {
    let response: any = await apiGet(
      API_ORGANIZATION_UNITS + '/' + OrganizationUnitId,
    );
    return response.data;
  } catch (catchBlockHandler) {}
};

export const createOrganizationUnit = async (data: IOrganizationUnit) => {
  try {
    let response: any = await apiPost(API_ORGANIZATION_UNITS, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateOrganizationUnit = async (
  OrganizationUnitId: number,
  data: IOrganizationUnit,
) => {
  try {
    let response: any = await apiPut(
      API_ORGANIZATION_UNITS + '/' + OrganizationUnitId,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const deleteOrganizationUnit = async (OrganizationUnitId: number) => {
  try {
    let response: any = await apiDelete(
      API_ORGANIZATION_UNITS + '/' + OrganizationUnitId,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const assignServiceToOrganizationUnit = async (
  organization_id: number,
  data: any,
) => {
  let serviceIds = {serviceIds: data};
  try {
    let response: any = await apiPost(
      API_ORGANIZATION_UNITS +
        '/' +
        organization_id +
        '/assign-service-to-organization-unit',
      serviceIds,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
