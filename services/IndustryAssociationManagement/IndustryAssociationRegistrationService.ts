import {apiPost, apiPut} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {
  API_APPROVE_INDUSTRY_ASSOC_REGISTRATION,
  API_INDUSTRY_ASSOCIATION_REGISTRATION,
  API_PUBLIC_NASCIB_MEMBER_REGISTRATION_PAYMENT_PAGE,
  API_REJECT_INDUSTRY_ASSOC_REGISTRATION,
} from '../../@softbd/common/apiRoutes';
import {IPermissionSubGroupAssign} from '../../shared/Interface/industryAssociation.interface';

export const industryAssociationRegistration = async (data: any) => {
  try {
    let response: any = await apiPost(
      API_INDUSTRY_ASSOCIATION_REGISTRATION,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const rejectIndustryAssociationRegistration = async (
  industryAssociationId: number,
) => {
  try {
    let response: any = await apiPut(
      API_REJECT_INDUSTRY_ASSOC_REGISTRATION + '/' + industryAssociationId,
      {
        industryAssociationId: industryAssociationId,
      },
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const reapproveIndustryAssociationRegistration = async (
  industryAssociationId: number,
) => {
  try {
    let response: any = await apiPut(
      API_APPROVE_INDUSTRY_ASSOC_REGISTRATION + '/' + industryAssociationId,
      {
        industryAssociationId: industryAssociationId,
      },
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const approveIndustryAssociationRegistration = async (
  industryAssociationId: number,
  data: IPermissionSubGroupAssign,
) => {
  try {
    let response: any = await apiPut(
      API_APPROVE_INDUSTRY_ASSOC_REGISTRATION + '/' + industryAssociationId,
      {
        permission_sub_group_id: data?.permission_sub_group_id,
      },
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const nascibMemberRegistrationPaymentPay = async (data: any) => {
  try {
    let response: any = await apiPost(
      API_PUBLIC_NASCIB_MEMBER_REGISTRATION_PAYMENT_PAGE,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
