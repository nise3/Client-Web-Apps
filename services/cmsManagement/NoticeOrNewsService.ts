import {apiDelete, apiPost, apiPut} from '../../@softbd/common/api';
import {API_NOTICE_OR_NEWSES} from '../../@softbd/common/apiRoutes';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';

export const createNoticeOrNews = async (data: any) => {
  try {
    let response: any = await apiPost(API_NOTICE_OR_NEWSES, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateNoticeOrNews = async (itemId: number, data: any) => {
  try {
    let response: any = await apiPut(API_NOTICE_OR_NEWSES + '/' + itemId, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const deleteNoticeOrNews = async (itemId: number) => {
  try {
    let response: any = await apiDelete(API_NOTICE_OR_NEWSES + '/' + itemId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
