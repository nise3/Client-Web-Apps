import {apiPost} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import { ICertificate } from '../../shared/Interface/certificates';


export const createCertificate = async (data: ICertificate) => {
  try {
    let response: any = await apiPost(
      'http://192.168.13.215:8001/api/v1/certificates',
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
