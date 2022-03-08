import {IYouthAssessment} from '../../shared/Interface/common.interface';
import {apiPost} from '../../@softbd/common/api';
import {API_PUBLIC_YOUTH_ASSESSMENTS} from '../../@softbd/common/apiRoutes';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';

export const createYouthAssessment = async (data: IYouthAssessment) => {
  try {
    let response: any = await apiPost(API_PUBLIC_YOUTH_ASSESSMENTS, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
