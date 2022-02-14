import {apiPost} from '../../@softbd/common/api';
import {API_INDUSTRY_ASSOCIATION_ORGANIZATION_IMPORT} from '../../@softbd/common/apiRoutes';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';

// export const getHumanResourceDemand = async ()

export const createExcelImport = async (data: any) => {
  try {
    let response: any = await apiPost(API_INDUSTRY_ASSOCIATION_ORGANIZATION_IMPORT, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
