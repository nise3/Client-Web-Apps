import {apiGet} from '../../@softbd/common/api';
import {API_4IR_OCCUPATIONS} from '../../@softbd/common/apiRoutes';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';

export const getAllOccupations = async (params = {}) => {
  try {
    let response: any = await apiGet(API_4IR_OCCUPATIONS, {params});
    return response.data;
  } catch (error) {
    console.log(error);
    catchBlockHandler(error);
  }
};
