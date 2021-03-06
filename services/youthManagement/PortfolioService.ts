import {apiDelete, apiPost, apiPut} from '../../@softbd/common/api';
import {API_YOUTH_PORTFOLIOS} from '../../@softbd/common/apiRoutes';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {YouthPortfolio} from './typing';

export const createPortfolio = async (data: YouthPortfolio) => {
  try {
    let response = await apiPost(API_YOUTH_PORTFOLIOS, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updatePortfolio = async (
  portfolioId: number,
  data: YouthPortfolio,
) => {
  try {
    let response = await apiPut(API_YOUTH_PORTFOLIOS + '/' + portfolioId, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const deletePortfolio = async (portfolioId: number) => {
  try {
    let response: any = await apiDelete(
      API_YOUTH_PORTFOLIOS + '/' + portfolioId,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
