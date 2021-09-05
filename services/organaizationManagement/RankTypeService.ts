import {apiDelete, apiGet, apiPost, apiPut} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/common/helpers';
import {ORGANIZATION_SERVICE_PATH} from '../../@softbd/common/apiRoutes';

const API_RANK_TYPES = ORGANIZATION_SERVICE_PATH + '/rank-types';

export const getAllRankTypes = async (params = {}) => {
  try {
    let response: any = await apiGet(API_RANK_TYPES, {params});
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const getRankType = async (RankTypeId: number) => {
  try {
    let response: any = await apiGet(API_RANK_TYPES + '/' + RankTypeId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const createRankType = async (data: RankType) => {
  try {
    let response: any = await apiPost(API_RANK_TYPES, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateRankType = async (RankTypeId: number, data: RankType) => {
  try {
    let response: any = await apiPut(API_RANK_TYPES + '/' + RankTypeId, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const deleteRankType = async (rankTypeId: number) => {
  try {
    let response: any = await apiDelete(API_RANK_TYPES + '/' + rankTypeId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
