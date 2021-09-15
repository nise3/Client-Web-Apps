import {apiDelete, apiGet, apiPost, apiPut} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {ORGANIZATION_SERVICE_PATH} from '../../@softbd/common/apiRoutes';

const API_RANKS = ORGANIZATION_SERVICE_PATH + '/ranks';

export const getAllRanks = async (params = {}) => {
  try {
    let response: any = await apiGet(API_RANKS, {params});
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const getRank = async (RankId: number) => {
  try {
    let response: any = await apiGet(API_RANKS + '/' + RankId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const createRank = async (data: Rank) => {
  try {
    let response: any = await apiPost(API_RANKS, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateRank = async (RankId: number, data: Rank) => {
  try {
    let response: any = await apiPut(API_RANKS + '/' + RankId, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const deleteRank = async (rankId: number) => {
  try {
    let response: any = await apiDelete(API_RANKS + '/' + rankId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
