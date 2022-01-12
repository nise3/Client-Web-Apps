import {apiGet} from '../../@softbd/common/api';
import {API_INDUSTRY_ASSOCIATIONS} from '../../@softbd/common/apiRoutes';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';

export const getAllIndustryAssociations = async (params = {}) => {
  try {
    let response: any = await apiGet(API_INDUSTRY_ASSOCIATIONS, {params});
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
