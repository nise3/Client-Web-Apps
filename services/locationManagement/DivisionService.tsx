import useSWR from 'swr';
import {apiDelete, apiGet, apiPost, apiPut} from '../../@softbd/common/api';
import {CORE_SERVICE_PATH} from '../../@softbd/common/apiRoutes';
import {catchBlockHandler} from '../../@softbd/common/helpers';

const API_DIVISIONS = CORE_SERVICE_PATH + '/divisions';

function paramsBuilder(data: any) {
  return Object.keys(data)
    .map((key) => `${key}=${encodeURIComponent(data[key])}`)
    .join('&');
}

export const getAllDivisions = async (params = {}) => {
  try {
    let response: any = await apiGet(API_DIVISIONS, {params});
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const useDivisions = (params = {limit: 20}) => {
  return useSWR(API_DIVISIONS + '?' + paramsBuilder(params), (uri) => {
    return apiGet(uri);
  });
};

export const getDivision = async (divisionId: number) => {
  try {
    let response: any = await apiGet(API_DIVISIONS + '/' + divisionId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const createDivision = async (data: Division) => {
  try {
    let response: any = await apiPost(API_DIVISIONS, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateDivision = async (divisionId: number, data: Division) => {
  try {
    let response: any = await apiPut(API_DIVISIONS + '/' + divisionId, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const deleteDivision = async (divisionId: number) => {
  try {
    let response: any = await apiDelete(API_DIVISIONS + '/' + divisionId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
