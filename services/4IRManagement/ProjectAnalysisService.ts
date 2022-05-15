import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {apiDelete, apiPost} from '../../@softbd/common/api';
import {API_4IR_PROJECT_ANALYSIS} from '../../@softbd/common/apiRoutes';

export const updateProjectAnalysis = async (data: any, itemId: number) => {
  try {
    const response: any = await apiPost(
      API_4IR_PROJECT_ANALYSIS + '/' + itemId,
      data,
      {
        headers: {
          Accept: '*/*',
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const createProjectAnalysis = async (data: any) => {
  try {
    const response: any = await apiPost(API_4IR_PROJECT_ANALYSIS, data, {
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

export const deleteProjectAnalysis = async (itemId: number) => {
  try {
    let response = await apiDelete(API_4IR_PROJECT_ANALYSIS + '/' + itemId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
