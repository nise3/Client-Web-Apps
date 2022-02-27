import {apiPost} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {API_NASCIB_MEMBER_PUBLIC_REGISTRATION} from '../../@softbd/common/apiRoutes';

export const registerNASCIBMember = async (data: any) => {
  try {
    let response: any = await apiPost(
      API_NASCIB_MEMBER_PUBLIC_REGISTRATION,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
