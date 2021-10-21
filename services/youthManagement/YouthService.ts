import {apiGet, apiPut} from '../../@softbd/common/api';
import {
  API_YOUTH_FREELANCE_PROFILE_STATUS_UPDATE,
  API_YOUTH_PERSONAL_INFO_UPDATE,
  API_YOUTH_PROFILE,
} from '../../@softbd/common/apiRoutes';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {YouthPersonalInfo} from './typing';

export const getYouthProfile = async () => {
  try {
    let response: any = await apiGet(API_YOUTH_PROFILE);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateYouthPersonalInfo = async (data: YouthPersonalInfo) => {
  try {
    let response: any = await apiPut(API_YOUTH_PERSONAL_INFO_UPDATE, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateYouthFreelanceProfileStatus = async (data: any) => {
  try {
    let response: any = await apiPut(
      API_YOUTH_FREELANCE_PROFILE_STATUS_UPDATE,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
