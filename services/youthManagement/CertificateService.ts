import {apiDelete, apiPost, apiPut} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {API_YOUTH_CERTIFICATES} from '../../@softbd/common/apiRoutes';
import {YouthCertificate} from './typing';

export const createCertificate = async (data: YouthCertificate) => {
  try {
    let response: any = await apiPost(API_YOUTH_CERTIFICATES, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateCertificate = async (
  certificateId: number,
  data: YouthCertificate,
) => {
  try {
    let response: any = await apiPut(
      API_YOUTH_CERTIFICATES + '/' + certificateId,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const deleteCertificate = async (certificateId: number) => {
  try {
    let response: any = await apiDelete(
      API_YOUTH_CERTIFICATES + '/' + certificateId,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
