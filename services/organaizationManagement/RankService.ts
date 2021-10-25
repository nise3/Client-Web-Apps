import {apiDelete, apiGet, apiPost, apiPut} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {API_RANKS} from '../../@softbd/common/apiRoutes';

/**
 * @deprecated
 */
export const getAllRanks = async (params = {}) => {
  try {
    let response: any = await apiGet(API_RANKS, {params});
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

/**
 * @deprecated
 */
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
