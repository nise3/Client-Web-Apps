import {apiDelete, apiGet, apiPost, apiPut} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {API_STATIC_PAGES} from '../../@softbd/common/apiRoutes';

interface StaticPage {
  title?: string;
  sub_title?: string;
  show_in?: number | string;
  content_slug_or_id?: string;
  institute_id?: string;
  organization_id?: string;
  content_type?: string;
  contents?: string;
  row_status?: number | string;
  updated_at?: string;
  crated_at?: string;
}

/**
 * @deprecated
 */
export const getAllStaticPage = async (params = {}) => {
  try {
    let response: any = await apiGet(API_STATIC_PAGES, {params});
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

/**
 * @deprecated
 */
export const getStaticPage = async (staticPageId: number) => {
  try {
    let response: any = await apiGet(API_STATIC_PAGES + '/' + staticPageId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const createStaticPage = async (data: StaticPage) => {
  try {
    let response: any = await apiPost(API_STATIC_PAGES, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateStaticPage = async (
  staticPageId: number,
  data: StaticPage,
) => {
  try {
    let response: any = await apiPut(
      API_STATIC_PAGES + '/' + staticPageId,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const deleteStaticPage = async (staticPageId: number) => {
  try {
    let response: any = await apiDelete(API_STATIC_PAGES + '/' + staticPageId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
