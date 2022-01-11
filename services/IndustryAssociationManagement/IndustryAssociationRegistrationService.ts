import {apiPost, apiPut} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {
  API_APPROVE_INDUSTRY_ASSOC_REGISTRATION,
  API_INDUSTRY_ASSOCIATION_REGISTRATION,
  API_REJECT_INDUSTRY_ASSOC_REGISTRATION,
} from '../../@softbd/common/apiRoutes';

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

export const approveIndustryAssociationRegistration = async (
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
