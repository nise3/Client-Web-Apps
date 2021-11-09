import {apiDelete, apiPost, apiPut} from '../../@softbd/common/api';
import {CMS_NOTICE_OR_NEWS} from '../../@softbd/common/apiRoutes';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';

export const createNoticeOrNews = async (data: any) => {
  try {
    let response: any = await apiPost(CMS_NOTICE_OR_NEWS, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateNoticeOrNews = async (itemId: number, data: any) => {
  try {
    let response: any = await apiPut(CMS_NOTICE_OR_NEWS + '/' + itemId, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const deleteNoticeOrNews = async (itemId: number) => {
  try {
    let response: any = await apiDelete(CMS_NOTICE_OR_NEWS + '/' + itemId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
