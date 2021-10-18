import {API_INSTITUTE_REGISTRATION, APPLICATION_PROCESSING} from '../../@softbd/common/apiRoutes';
import {apiPost, apiPut} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';

export const createRegistration = async (data: any) => {
  try {
    let response: any = await apiPost(API_INSTITUTE_REGISTRATION, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

/** method called to accept or reject the application of a trainee to join to a course from dashboard/application-management */
export const applicationProcess = async (applicantId: number, data: any) => {
  console.log('accept and reject request: ', applicantId, data);
  try {
    let response: any = await apiPut(APPLICATION_PROCESSING + '/' + applicantId, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};