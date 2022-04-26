import {apiPost} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import { ICertificateIssue } from '../../shared/Interface/certificates';

export const createCertificateIssue = async (data: ICertificateIssue) => {
  try {
    let response: any = await apiPost(
      'http://192.168.13.215:8001/api/v1/certificate-issued',
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
