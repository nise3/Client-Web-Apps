import {API_INSTITUTE_REGISTRATION} from '../../@softbd/common/apiRoutes';
import {apiPost} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';

export const createRegistration = async (data: any) => {
  try {
    let response: any = await apiPost(API_INSTITUTE_REGISTRATION, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
