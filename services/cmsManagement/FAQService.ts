import {apiDelete, apiPost, apiPut} from '../../@softbd/common/api';
import {API_FAQS} from '../../@softbd/common/apiRoutes';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {IFAQ} from '../../shared/Interface/common.interface';

export const deleteFAQ = async (faqId: number) => {
  try {
    let response: any = await apiDelete(API_FAQS + '/' + faqId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateFAQ = async (faqId: number, data: IFAQ) => {
  try {
    let response: any = await apiPut(API_FAQS + '/' + faqId, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const createFAQ = async (data: IFAQ) => {
  try {
    let response: any = await apiPost(API_FAQS, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
