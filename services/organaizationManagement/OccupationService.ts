import {apiDelete, apiGet, apiPost, apiPut} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {
  API_OCCUPATIONS,
  API_PUBLIC_OCCUPATIONS,
} from '../../@softbd/common/apiRoutes';
import {IOccupation} from '../../shared/Interface/occupation.interface';

export const getAllOccupations = async (params = {}) => {
  try {
    let response: any = await apiGet(API_OCCUPATIONS, {params});
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const getAllPublicOccupations = async (params = {}) => {
  try {
    let response: any = await apiGet(API_PUBLIC_OCCUPATIONS, {params});
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

/**
 * @deprecated
 */
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

export const createOccupation = async (data: IOccupation) => {
  try {
    let response: any = await apiPost(API_OCCUPATIONS, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateOccupation = async (
  occupationId: number,
  data: IOccupation,
) => {
  try {
    let response: any = await apiPut<IOccupation>(
      API_OCCUPATIONS + '/' + occupationId,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
