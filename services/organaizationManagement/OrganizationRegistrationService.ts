import {apiPost} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {API_ORGANIZATION_REGISTRATION} from '../../@softbd/common/apiRoutes';

export const organizationRegistration = async (data: any) => {
  try {
    let response: any = await apiPost(API_ORGANIZATION_REGISTRATION, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
