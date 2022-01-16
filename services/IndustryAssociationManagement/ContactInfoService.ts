import {apiDelete, apiPost, apiPut} from '../../@softbd/common/api';
import {API_INDUSTRY_ASSOCIATION_CONTACT_INFO} from '../../@softbd/common/apiRoutes';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {IContactInfo} from '../../shared/Interface/industryAssociation.interface';

export const deleteContactInfoItem = async (contactInfoId: number) => {
  try {
    let response: any = await apiDelete(
      API_INDUSTRY_ASSOCIATION_CONTACT_INFO + '/' + contactInfoId,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const createContactInfo = async (data: IContactInfo) => {
  try {
    let response: any = await apiPost(
      API_INDUSTRY_ASSOCIATION_CONTACT_INFO,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateContactInfo = async (
  contactInfoId: number,
  data: IContactInfo,
) => {
  try {
    let response: any = await apiPut(
      API_INDUSTRY_ASSOCIATION_CONTACT_INFO + '/' + contactInfoId,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
