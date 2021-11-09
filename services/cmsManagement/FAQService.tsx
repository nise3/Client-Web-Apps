import {apiDelete, apiGet, apiPost, apiPut} from '../../@softbd/common/api';
import {
  API_ALL_FAQS,
  API_INSTITUTES,
  API_ORGANIZATIONS,
} from '../../@softbd/common/apiRoutes';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';

export const deleteFAQ = async (faqId: number) => {
  try {
    let response: any = await apiDelete(API_ALL_FAQS + '/' + faqId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const getAllInstitutes = async () => {
  try {
    let response: any = await apiGet(API_INSTITUTES);
    return response.data.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const getAllIndustries = async () => {
  try {
    let response: any = await apiGet(API_ORGANIZATIONS);
    return response.data.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateFAQ = async (faqId: number, data: FAQ) => {
  try {
    let response: any = await apiPut(API_ALL_FAQS + '/' + faqId, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const createFAQ = async (data: FAQ) => {
  try {
    let response: any = await apiPost(API_ALL_FAQS, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
