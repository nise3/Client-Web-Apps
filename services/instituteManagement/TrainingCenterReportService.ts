import {apiPost} from '../../@softbd/common/api';
import {API_TRAINING_CENTERS_REPORTING_COMBINED_PROGRESS} from '../../@softbd/common/apiRoutes';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';

export const trainingCenterCombinedProgressReportCreate = async (data: any) => {
  try {
    let response: any = await apiPost(
      API_TRAINING_CENTERS_REPORTING_COMBINED_PROGRESS,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
