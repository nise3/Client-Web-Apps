import {apiDelete, apiPost, apiPut} from '../../@softbd/common/api';
import {API_INDUSTRY_ASSOCIATIONS} from '../../@softbd/common/apiRoutes';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {INewIndustryAssociation} from '../../shared/Interface/industryAssociationRegistration.interface';

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

export const updateIndustryAssociation = async (
  industryAssocId: number,
  data: INewIndustryAssociation,
) => {
  try {
    let response: any = await apiPut(
      API_INDUSTRY_ASSOCIATIONS + '/' + industryAssocId,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const createIndustryAssociation = async (
  data: INewIndustryAssociation,
) => {
  try {
    let response: any = await apiPost(API_INDUSTRY_ASSOCIATIONS, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
