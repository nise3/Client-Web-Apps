import {apiDelete, apiGet, apiPost} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {
  API_PUBLIC_VISITOR_FEEDBACKS,
  API_VISITOR_FEEDBACKS,
} from '../../@softbd/common/apiRoutes';
import {
  IVisitorFeedback,
  IVisitorFeedbackIndustry,
} from '../../shared/Interface/visitorFeedback.interface';

// interface VisitorFeedback {
//   id: number;
//   form_type: number;
//   institute_id?: number;
//   organization_id?: number;
//   name?: string;
//   mobile?: string;
//   email?: boolean;
//   address?: string;
//   comment?: string;
//   read_at?: string;
//   archived_at?: string;
//   archived_by?: string;
//   row_status?: string | number;
// }

/**
 * @deprecated
 */
export const getAllVisitorFeedback = async (params = {}) => {
  try {
    let response: any = await apiGet(API_VISITOR_FEEDBACKS, {params});
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

/**
 * @deprecated
 */
export const getVisitorFeedback = async (visitorId: number) => {
  try {
    let response: any = await apiGet(API_VISITOR_FEEDBACKS + '/' + visitorId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const createVisitorFeedback = async (data: IVisitorFeedback) => {
  try {
    let response: any = await apiPost(API_PUBLIC_VISITOR_FEEDBACKS, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const createVisitorFeedbackIndustry = async (
  data: IVisitorFeedbackIndustry,
) => {
  try {
    let response: any = await apiPost(API_PUBLIC_VISITOR_FEEDBACKS, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

/**
 * @No_need
 */
export const deleteVisitorFeedback = async (visitorId: number) => {
  try {
    let response: any = await apiDelete(
      API_VISITOR_FEEDBACKS + '/' + visitorId,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
