import {apiDelete, apiPost, apiPut} from '../../@softbd/common/api';
import {API_YOUTH_ADDRESSES} from '../../@softbd/common/apiRoutes';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {IAddressAddEdit} from './typing';

export const deleteAddressItem = async (addressId: number) => {
  try {
    let response: any = await apiDelete(API_YOUTH_ADDRESSES + '/' + addressId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateAddress = async (
  addressId: number,
  data: IAddressAddEdit,
) => {
  try {
    let response: any = await apiPut(
      API_YOUTH_ADDRESSES + '/' + addressId,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const createAddress = async (data: IAddressAddEdit) => {
  try {
    let response: any = await apiPost(API_YOUTH_ADDRESSES, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
