import {apiPost} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {
  API_YOUTH_REGISTRATION,
  API_YOUTH_REGISTRATION_CDAP,
  API_YOUTH_REGISTRATION_VERIFICATION,
} from '../../@softbd/common/apiRoutes';

export const youthRegistration = async (data: any) => {
  try {
    let response: any = await apiPost(API_YOUTH_REGISTRATION, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const youthRegistrationCDAP = async (data: any, tokens: any) => {
  try {
    let response: any = await apiPost(API_YOUTH_REGISTRATION_CDAP, data, {
      headers: {
        'User-Token': 'Bearer ' + tokens.access_token,
      },
    });
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const youthRegistrationVerification = async (data: any) => {
  try {
    let response: any = await apiPost(
      API_YOUTH_REGISTRATION_VERIFICATION,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
