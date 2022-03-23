import {apiPost} from '../../@softbd/common/api';
import {
  API_TRAINING_CENTERS_REPORTING_COMBINED_PROGRESS,
  API_TRAINING_CENTERS_REPORTING_INCOME_EXPENDITURE,
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

export const trainingCenterReportIncomeExpenditureCreate = async (
  data: any,
) => {
  try {
    let response: any = await apiPost(
      API_TRAINING_CENTERS_REPORTING_INCOME_EXPENDITURE,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
