import {apiGet, apiPost, apiPut} from '../../@softbd/common/api';
import {
  API_COURSE_ENROLL,
  API_COURSE_ENROLL_PAYMENT_PAY,
  API_YOUTH_FREELANCE_PROFILE_STATUS_UPDATE,
  API_YOUTH_PERSONAL_INFO_UPDATE,
  API_YOUTH_PROFILE,
  API_YOUTH_UPDATE_DEFAULT_CV_TEMPLATE,
  COURSE_ENROLL_RESEND_VERIFICATION,
  COURSE_ENROLL_VERIFICATION,
  API_COURSE_ENROLL_PAYMENT_PAY,
  API_YOUTH_JOB_APPLICATION_INFORMATION_UPDATE,
} from '../../@softbd/common/apiRoutes';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {YouthPersonalInfo} from './typing';

export const getYouthProfile = async () => {
  try {
    let response: any = await apiGet(API_YOUTH_PROFILE);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateYouthPersonalInfo = async (data: YouthPersonalInfo) => {
  try {
    let response: any = await apiPut(API_YOUTH_PERSONAL_INFO_UPDATE, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
export const updateJobApplicationInfo = async (data: any) => {
  try {
    let response: any = await apiPut(
      API_YOUTH_JOB_APPLICATION_INFORMATION_UPDATE,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateYouthFreelanceProfileStatus = async (data: any) => {
  try {
    let response: any = await apiPut(
      API_YOUTH_FREELANCE_PROFILE_STATUS_UPDATE,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const courseEnroll = async (data: any) => {
  try {
    let response: any = await apiPost(API_COURSE_ENROLL, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const courseEnrollmentVerification = async (
  enrollment_id: number,
  data: any,
) => {
  try {
    let response: any = await apiPost(
      API_COURSE_ENROLL + '/' + enrollment_id + COURSE_ENROLL_VERIFICATION,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const courseEnrollmentResendVerificationCode = async (
  enrollment_id: number,
) => {
  try {
    let response: any = await apiPost(
      API_COURSE_ENROLL +
        '/' +
        enrollment_id +
        COURSE_ENROLL_RESEND_VERIFICATION,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const courseEnrollmentPaymentPay = async (data: any) => {
  try {
    let response: any = await apiPost(API_COURSE_ENROLL_PAYMENT_PAY, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateYouthDefaultCVTemplate = async (data: any) => {
  try {
    let response: any = await apiPut(
      API_YOUTH_UPDATE_DEFAULT_CV_TEMPLATE,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
