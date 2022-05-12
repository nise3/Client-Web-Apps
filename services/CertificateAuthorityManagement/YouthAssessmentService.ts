import {IRplAssessment} from '../../shared/Interface/common.interface';
import {apiPost} from '../../@softbd/common/api';
import {
  API_RPL_APPLICATION,
  API_RPL_APPLICATION_POST,
  API_RPL_SELF_ASSESSMENT,
} from '../../@softbd/common/apiRoutes';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {IAssessmentBatchAssign} from '../../shared/Interface/assessmentManagement.interface';

export const createRplSelfAssessment = async (data: IRplAssessment) => {
  try {
    let response: any = await apiPost(API_RPL_SELF_ASSESSMENT, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const createRPLApplication = async (data: any) => {
  try {
    let response: any = await apiPost(API_RPL_APPLICATION_POST, data);
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
