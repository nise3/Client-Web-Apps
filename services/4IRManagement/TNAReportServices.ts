import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {apiDelete, apiPost, apiPut} from '../../@softbd/common/api';
import {API_4IR_TNA_REPORT} from '../../@softbd/common/apiRoutes';

export const updateTNAReport = async (data: any, itemId: number) => {
  try {
    const response: any = await apiPut(API_4IR_TNA_REPORT + '/' + itemId, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const createTNAReport = async (data: any) => {
  try {
    const response: any = await apiPost(API_4IR_TNA_REPORT, data, {
      headers: {
        Accept: '*/*',
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const deleteTNAReport = async (itemId: number) => {
  try {
    let response = await apiDelete(API_4IR_TNA_REPORT + '/' + itemId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
