import {
  API_ASSIGN_BATCH,
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

/** assigns a batch to a trainee application */
export const assignBatch = async (
  data: BatchAssign,
  enrollment_id: number | null,
) => {
  const submittedData = {
    ...data,
    enrollment_id: enrollment_id,
  };
  try {
    let response: any = await apiPost(API_ASSIGN_BATCH, submittedData);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

/** assigns a batch to a trainee application */
/*need to work*/
export const assignBatchEdit = async (data: BatchAssign) => {
  alert('api called, we will work later');
  /*try {
    let response: any = await apiPost(API_RANKS, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }*/
};
