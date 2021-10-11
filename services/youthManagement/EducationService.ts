import {YouthEducation} from './typing';
import {apiDelete, apiPost, apiPut} from '../../@softbd/common/api';
import {API_YOUTH_EDUCATION} from '../../@softbd/common/apiRoutes';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';

export const createEducation = async (data: YouthEducation) => {
  try {
    let response: any = await apiPost(API_YOUTH_EDUCATION, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateEducation = async (
  educationId: number,
  data: YouthEducation,
) => {
  try {
    let response: any = await apiPut(
      API_YOUTH_EDUCATION + '/' + educationId,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const deleteEducation = async (educationId: number) => {
  try {
    let response: any = await apiDelete(
      API_YOUTH_EDUCATION + '/' + educationId,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
