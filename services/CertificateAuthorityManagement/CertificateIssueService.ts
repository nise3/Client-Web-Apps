import {apiPost} from '../../@softbd/common/api';
import { API_CERTIFICATES, API_CERTIFICATES_ISSUE } from '../../@softbd/common/apiRoutes';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import { CERTIFICATE_TYPE_API_URL } from '../../modules/dashboard/certificate-issue/certificate-issue-constant';
import { ICertificateIssue } from '../../shared/Interface/certificates';

export const createCertificateIssue = async (data: ICertificateIssue) => {
  try {
    let response: any = await apiPost(
      API_CERTIFICATES_ISSUE,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
