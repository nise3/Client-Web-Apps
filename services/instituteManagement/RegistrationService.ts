import {INSTITUTE_SERVICE_PATH} from '../../@softbd/common/apiRoutes';
import {apiPost, apiPut} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';

const API_INSTITUTE_REGISTRATION = INSTITUTE_SERVICE_PATH + '/institute-registration';
const API_ACCEPT_APPLICANT = INSTITUTE_SERVICE_PATH + '/accept-applicant';

export const createRegistration = async (data: any) => {
  try {
    let response: any = await apiPost(API_INSTITUTE_REGISTRATION, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

/** method called to accept or reject the application of a trainee to join to a course from dashboard/application-management */
export const applicationProcess = async (applicantId: number, data: {} | undefined) => {
  try {
    let response: any = await apiPut(API_ACCEPT_APPLICANT + '/' + applicantId, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};