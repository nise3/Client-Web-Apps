import {apiGet, apiPost} from '../../@softbd/common/api';
import {
  API_TRAINING_CENTERS_REPORTING_COMBINED_PROGRESS,
  API_TRAINING_CENTERS_REPORTING_PROGRESS,
} from '../../@softbd/common/apiRoutes';
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

export const trainingCenterProgressReportCreate = async (data: any) => {
  try {
    let response: any = await apiPost(
      API_TRAINING_CENTERS_REPORTING_PROGRESS,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const getTrainingCenterProgressReport = async (ReportId: any) => {
  try {
    let response: any = await apiGet(
      API_TRAINING_CENTERS_REPORTING_PROGRESS + '/' + ReportId,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
