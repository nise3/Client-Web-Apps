import {apiGet, apiPut} from '../../@softbd/common/api';
import {
  API_INDUSTRY_ASSOCIATION_PROFILE_UPDATE,
  API_INDUSTRY_ASSOCIATIONS,
} from '../../@softbd/common/apiRoutes';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';

export const getAllIndustryAssociations = async (params = {}) => {
  try {
    let response: any = await apiGet(API_INDUSTRY_ASSOCIATIONS, {params});
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateIndustryAssocProfile = async (data: any) => {
  try {
    let response: any = await apiPut(
      API_INDUSTRY_ASSOCIATION_PROFILE_UPDATE,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
