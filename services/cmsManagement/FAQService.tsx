import {apiDelete} from '../../@softbd/common/api';
import {API_ALL_FAQS} from '../../@softbd/common/apiRoutes';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';

export const deleteFAQ = async (faqId: number) => {
  try {
    let response: any = await apiDelete(API_ALL_FAQS + '/' + faqId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
