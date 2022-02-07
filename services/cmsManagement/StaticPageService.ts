import {apiGet, apiPut} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {API_STATIC_PAGE_BLOCKS} from '../../@softbd/common/apiRoutes';

export const getStaticPageOrBlockByPageCode = async (
  pageCode: string,
  params: any,
) => {
  try {
    let response: any = await apiGet(API_STATIC_PAGE_BLOCKS + pageCode, {
      params,
    });
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateStaticPage = async (pageCode: string, data: any) => {
  try {
    let response: any = await apiPut(API_STATIC_PAGE_BLOCKS + pageCode, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
