import {IYouthAssessment} from '../../shared/Interface/common.interface';
import {apiPost} from '../../@softbd/common/api';
import {
  API_RPL_APPLICATION,
  API_YOUTH_ASSESSMENT,
} from '../../@softbd/common/apiRoutes';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {IAssessmentBatchAssign} from '../../shared/Interface/assessmentManagement.interface';

export const createYouthAssessment = async (data: IYouthAssessment) => {
  try {
    let response: any = await apiPost(API_YOUTH_ASSESSMENT, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const assessmentAssignBatch = async (
  data: IAssessmentBatchAssign,
  youth_assessment_id: number | null,
) => {
  try {
    let response: any = await apiPost(
      API_RPL_APPLICATION + '/' + youth_assessment_id + '/assign-to-batch',
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
