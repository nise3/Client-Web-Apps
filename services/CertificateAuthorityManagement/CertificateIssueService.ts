import { apiGet, apiPost } from '../../@softbd/common/api';
import { API_CERTIFICATES_ISSUE, YOUTH_SERVICE_PATH } from '../../@softbd/common/apiRoutes';
import { catchBlockHandler } from '../../@softbd/utilities/helpers';
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
}

export const getCertificateIssueByIssueId = async (issue_id: any) => {
  try {
    let response: any = await apiGet(
      API_CERTIFICATES_ISSUE + '/' + issue_id
    );
    return response.data;

  } catch (error) {
    catchBlockHandler(error);
  }
}

export const getPublicCertificateIssueByIssueId = async (issue_id: any) => {
  try {
    let response: any = await apiGet(
      YOUTH_SERVICE_PATH + '/youth-issued-certificate'
    );
    return response.data;

  } catch (error) {
    catchBlockHandler(error);
  }
}

export const getCertificateIssue = async (params: any) => {
  try {
    let response: any = await apiGet(API_CERTIFICATES_ISSUE, {params});
    return response.data;

  } catch (error) {
    catchBlockHandler(error);
  }
}
