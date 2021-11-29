import {apiDelete, apiGet, apiPost, apiPut} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {API_PARTNERS} from '../../@softbd/common/apiRoutes';
import { IPartner } from '../../shared/Interface/interface';

/**
 * @deprecated
 */
export const getAllPartners = async (params = {}) => {
  try {
    let response: any = await apiGet(API_PARTNERS, {params});
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

// export function getPartner(partnerId: number){
//   return useAxiosSWR(API_PARTNERS + '/' + partnerId);
//   // try {
//   //   let response: any = await apiGet(API_PARTNERS + '/' + partnerId);
//   //   return response.data;
//   // } catch (error) {
//   //   catchBlockHandler(error);
//   // }
// };


export const createPartner = async (data: IPartner) => {
  try {
    let response: any = await apiPost(API_PARTNERS, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updatePartner = async (partnerId: number, data: IPartner) => {
  try {
    let response: any = await apiPut(API_PARTNERS + '/' + partnerId, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const deletePartner = async (partnerId: number) => {
  try {
    let response: any = await apiDelete(API_PARTNERS + '/' + partnerId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
