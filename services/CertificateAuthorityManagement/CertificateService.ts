import {apiGet, apiPost} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import { CERTIFICATE_TYPE_API_URL } from '../../modules/dashboard/certificate-issue/certificate-issue-constant';
import { ICertificate } from '../../shared/Interface/certificates';


export const createCertificate = async (data: ICertificate) => {
  try {
    let response: any = await apiPost(
      CERTIFICATE_TYPE_API_URL + 'certificates',
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const getCertificateByResultType = async (params: any) => {
  try {
    let response: any =await apiGet(CERTIFICATE_TYPE_API_URL + 'certificates' , {params});
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
