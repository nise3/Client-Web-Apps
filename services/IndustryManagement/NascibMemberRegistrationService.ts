import {apiPost} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {API__PUBLIC_NASCIB_MEMBER_REGISTRATION} from '../../@softbd/common/apiRoutes';

export const registerNASCIBMember = async (data: any) => {
  try {
    let response: any = await apiPost(
      API__PUBLIC_NASCIB_MEMBER_REGISTRATION,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
