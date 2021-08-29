import {ORGANIZATION_SERVICE_PATH} from '../../@softbd/common/apiRoutes';
import {apiDelete, apiGet, apiPost, apiPut} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/common/helpers';

const API_RANK_TYPES = ORGANIZATION_SERVICE_PATH + '/rank-types';

export const getAllRankTypes = async (params = {}) => {
  try {
    let response: any = await apiGet(API_RANK_TYPES, {params});
    return response.data.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const getAllRankTypesBasedOnOrganization = async (params = {}) => {
  console.log('params:', params);
  try {
    let response: any = await apiGet(API_RANK_TYPES, {params});
    return response.data.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const getRankType = async (rankTypeId: number) => {
  try {
    let response: any = await apiGet(API_RANK_TYPES + '/' + rankTypeId);
    return response.data.data;
  } catch (catchBlockHandler) {}
};

export const createRankType = async (data: RankType) => {
  try {
    let response: any = await apiPost(API_RANK_TYPES, data);
    return response.data._response_status.success;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateRankType = async (rankTypeId: number, data: RankType) => {
  try {
    let response: any = await apiPut(API_RANK_TYPES + '/' + rankTypeId, data);
    return response.data._response_status.success;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const deleteRankType = async (rankTypeId: number) => {
  try {
    let response: any = await apiDelete(API_RANK_TYPES + '/' + rankTypeId);
    return response.data._response_status.success;
  } catch (error) {
    catchBlockHandler(error);
  }
};
