import {apiDelete, apiPost, apiPut} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {API_YOUTH_REFERENCES} from '../../@softbd/common/apiRoutes';

export const createReference = async (data: any) => {
  try {
    let response: any = await apiPost(API_YOUTH_REFERENCES, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateReference = async (referenceId: number, data: any) => {
  try {
    let response: any = await apiPut(
      API_YOUTH_REFERENCES + '/' + referenceId,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
export const deleteReference = async (referenceId: number) => {
  try {
    let response: any = await apiDelete(
      API_YOUTH_REFERENCES + '/' + referenceId,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
