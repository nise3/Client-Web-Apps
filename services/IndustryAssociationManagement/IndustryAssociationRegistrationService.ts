import {apiPost} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {API_INDUSTRY_ASSOCIATION_REGISTRATION} from '../../@softbd/common/apiRoutes';

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
