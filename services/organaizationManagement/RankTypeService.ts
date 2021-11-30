import {apiDelete, apiGet, apiPost, apiPut} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {API_RANK_TYPES} from '../../@softbd/common/apiRoutes';
import { IRankType } from '../../shared/Interface/organization.interface';

/**
 * @deprecated
 */
export const getAllRankTypes = async (params = {}) => {
  try {
    let response: any = await apiGet(API_RANK_TYPES, {params});
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

/**
 * @deprecated
 */
export const getRankType = async (RankTypeId: number) => {
  try {
    let response: any = await apiGet(API_RANK_TYPES + '/' + RankTypeId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const createRankType = async (data: IRankType) => {
  try {
    let response: any = await apiPost(API_RANK_TYPES, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateRankType = async (RankTypeId: number, data: IRankType) => {
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
