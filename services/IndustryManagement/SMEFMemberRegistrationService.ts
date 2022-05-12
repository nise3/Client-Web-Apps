import {apiPost} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {API_PUBLIC_SMEF_MEMBER_REGISTRATION} from '../../@softbd/common/apiRoutes';

export const registerSMEFMember = async (data: any) => {
  try {
    let response: any = await apiPost(
      API_PUBLIC_SMEF_MEMBER_REGISTRATION,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
