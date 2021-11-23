import {apiPost} from '../../@softbd/common/api';
import {API_SEND_YOUTH_REGISTRATION_VERIFICATION_CODE} from '../../@softbd/common/apiRoutes';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';

export const createVerificationCode = async (data: any) => {
  try {
    let response: any = await apiPost(
      API_SEND_YOUTH_REGISTRATION_VERIFICATION_CODE,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
