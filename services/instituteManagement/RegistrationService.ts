import {
  API_INSTITUTE_REGISTRATION,
  API_REJECT_COURSE_ENROLLMENT,
} from '../../@softbd/common/apiRoutes';
import {apiPost} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';

export const createRegistration = async (data: any) => {
  try {
    let response: any = await apiPost(API_INSTITUTE_REGISTRATION, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

/** method called to reject the application of a trainee to join to a course from dashboard/application-management */
export const rejectEnrollment = async (enrollment_id: number) => {
  try {
    let response: any = await apiPost(API_REJECT_COURSE_ENROLLMENT, {
      enrollment_id: enrollment_id,
    });
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
