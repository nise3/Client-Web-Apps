import {apiDelete} from '../../@softbd/common/api';
import {API_INDUSTRY_ASSOCIATIONS} from '../../@softbd/common/apiRoutes';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';

/** delete an industry association */
export const deleteIndustryAssoc = async (IndustryAssocId: number) => {
  try {
    let response: any = await apiDelete(
      API_INDUSTRY_ASSOCIATIONS + '/' + IndustryAssocId,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
