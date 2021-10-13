import {apiPost, apiPut} from '../../@softbd/common/api';
import {API_YOUTH_PORTFOLIOS} from '../../@softbd/common/apiRoutes';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';

export const createPortfolio = async (data: any) => {
  try {
    let response = await apiPost(API_YOUTH_PORTFOLIOS, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updatePortfolio = async (portfolioId: number, data: any) => {
  try {
    let response = await apiPut(API_YOUTH_PORTFOLIOS + '/' + portfolioId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
