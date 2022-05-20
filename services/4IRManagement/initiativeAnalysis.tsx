import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {apiDelete, apiPost} from '../../@softbd/common/api';
import {API_4IR_INITIATIVE_ANALYSIS} from '../../@softbd/common/apiRoutes';

export const updateInitiativeAnalysis = async (data: any, itemId: number) => {
  try {
    const response: any = await apiPost(
      API_4IR_INITIATIVE_ANALYSIS + '/' + itemId,
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

export const createInitiativeAnalysis = async (data: any) => {
  try {
    const response: any = await apiPost(API_4IR_INITIATIVE_ANALYSIS, data, {
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

export const deleteInitiativeAnalysis = async (itemId: number) => {
  try {
    let response = await apiDelete(API_4IR_INITIATIVE_ANALYSIS + '/' + itemId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
