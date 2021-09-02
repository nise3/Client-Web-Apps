import {apiDelete, apiGet, apiPost, apiPut} from '../../@softbd/common/api';
import {ORGANIZATION_SERVICE_PATH} from '../../@softbd/common/apiRoutes';
import {catchBlockHandler} from '../../@softbd/common/helpers';

const API_ORGANIZATION_UNITS =
  ORGANIZATION_SERVICE_PATH + '/organization-units';

export const getAllOrganizationUnits = async (params = {}) => {
  try {
    let response: any = await apiGet(API_ORGANIZATION_UNITS, {params});
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const getOrganizationUnit = async (OrganizationUnitId: number) => {
  try {
    let response: any = await apiGet(
      API_ORGANIZATION_UNITS + '/' + OrganizationUnitId,
    );
    return response.data;
  } catch (catchBlockHandler) {}
};

export const createOrganizationUnit = async (data: OrganizationUnit) => {
  try {
    let response: any = await apiPost(API_ORGANIZATION_UNITS, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateOrganizationUnit = async (
  OrganizationUnitId: number,
  data: OrganizationUnit,
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
