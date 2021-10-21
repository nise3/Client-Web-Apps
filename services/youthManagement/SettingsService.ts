import {apiPut} from '../../@softbd/common/api';
import {
  API_YOUTH_SETTINGS_CHANGE_PASSWORD,
  API_YOUTH_SETTINGS_CHANGE_USERID,
} from '../../@softbd/common/apiRoutes';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';

export const changeUserId = async (data: any) => {
  try {
    let response: any = await apiPut(API_YOUTH_SETTINGS_CHANGE_USERID, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const changePassword = async (data: any) => {
  try {
    let response = await apiPut(API_YOUTH_SETTINGS_CHANGE_PASSWORD, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
