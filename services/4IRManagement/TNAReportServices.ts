import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {apiPost, apiPut} from '../../@softbd/common/api';
import {API_4IR_TNA_REPORT} from '../../@softbd/common/apiRoutes';

import {ITNAReport} from '../../shared/Interface/4IR.interface';

export const updateTNAReport = async (data: ITNAReport, itemId: number) => {
  try {
    const response: any = await apiPut(API_4IR_TNA_REPORT + '/' + itemId, data);
    return response;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const createTNAReport = async (data: ITNAReport) => {
  try {
    const response: any = await apiPost(API_4IR_TNA_REPORT, data);
    return response;
  } catch (error) {
    catchBlockHandler(error);
  }
};
