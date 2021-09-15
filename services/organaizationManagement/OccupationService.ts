import {apiDelete, apiGet, apiPost, apiPut} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {ORGANIZATION_SERVICE_PATH} from '../../@softbd/common/apiRoutes';

const API_OCCUPATIONS = ORGANIZATION_SERVICE_PATH + '/occupations';

export const getAllOccupations = async (params = {}) => {
  try {
    let response: any = await apiGet(API_OCCUPATIONS, {params});
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const getOccupation = async (occupationId: number) => {
  try {
    let response: any = await apiGet(API_OCCUPATIONS + '/' + occupationId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const deleteOccupation = async (occupationId: number) => {
  try {
    let response: any = await apiDelete(API_OCCUPATIONS + '/' + occupationId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const createOccupation = async (data: Occupation) => {
  try {
    let response: any = await apiPost(API_OCCUPATIONS, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateOccupation = async (
  occupationId: number,
  data: Occupation,
) => {
  try {
    let response: any = await apiPut(
      API_OCCUPATIONS + '/' + occupationId,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
