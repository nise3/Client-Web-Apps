import {INSTITUTE_SERVICE_PATH} from '../../@softbd/common/apiRoutes';
import {apiPost} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';

const API_INSTITUTE_REGISTRATION =
  INSTITUTE_SERVICE_PATH + '/institute-registration';

export const createRegistration = async (data: any) => {
  try {
    let response: any = await apiPost(API_INSTITUTE_REGISTRATION, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
