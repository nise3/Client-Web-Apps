import {apiDelete, apiGet, apiPost, apiPut} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {
  API_APPROVE_INDUSTRY_ASSOC_MEMBERSHIP,
  API_ORGANIZATION_PROFILE_UPDATE,
  API_ORGANIZATION_USER_APPROVAL,
  API_ORGANIZATION_USER_REJECTION,
  API_ORGANIZATIONS,
  API_REJECT_INDUSTRY_ASSOC_MEMBERSHIP,
} from '../../@softbd/common/apiRoutes';
import {IOrganization} from '../../shared/Interface/organization.interface';
import {IPermissionSubGroupAssignInstitute} from '../../shared/Interface/institute.interface';

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

export const createOrganization = async (data: IOrganization) => {
  try {
    let response: any = await apiPost(API_ORGANIZATIONS, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateOrganization = async (
  OrganizationId: number,
  data: IOrganization,
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

export const rejectOrgMemberShip = async (memberId: number) => {
  try {
    let response: any = await apiPut(
      API_REJECT_INDUSTRY_ASSOC_MEMBERSHIP + '/' + memberId,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const approveOrgMemberShip = async (
  memberId: number,
  data: IPermissionSubGroupAssignInstitute,
) => {
  try {
    let response: any = await apiPut(
      API_APPROVE_INDUSTRY_ASSOC_MEMBERSHIP + '/' + memberId,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const reApproveOrgMemberShip = async (memberId: number) => {
  try {
    let response: any = await apiPut(
      API_APPROVE_INDUSTRY_ASSOC_MEMBERSHIP + '/' + memberId,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const rejectOrganization = async (organizationId: any) => {
  try {
    let response: any = await apiPut(
      API_ORGANIZATION_USER_REJECTION + '/' + organizationId,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const ApproveOrganization = async (organizationId: any) => {
  try {
    let response: any = await apiPut(
      API_ORGANIZATION_USER_APPROVAL + '/' + organizationId,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateOrganizationProfile = async (data: any) => {
  try {
    let response: any = await apiPut(API_ORGANIZATION_PROFILE_UPDATE, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
