import {apiDelete, apiGet, apiPost, apiPut} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {API_BRANCHES} from '../../@softbd/common/apiRoutes';
import {IBranch} from '../../shared/Interface/institute.interface';

export const getAllBranches = async (params = {}) => {
  try {
    let response: any = await apiGet(API_BRANCHES, {params});
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

/**
 * @deprecated
 */
export const getBranchesByInstitute = async (instituteId: number) => {
  try {
    let response: any = await apiGet(
      API_BRANCHES + '?institute_id=' + instituteId,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

/**
 * @deprecated
 */
export const getBranch = async (branchId: number) => {
  try {
    let response: any = await apiGet(API_BRANCHES + '/' + branchId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const createBranch = async (data: IBranch) => {
  try {
    let response: any = await apiPost(API_BRANCHES, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateBranch = async (branchId: number, data: IBranch) => {
  try {
    let response: any = await apiPut(API_BRANCHES + '/' + branchId, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const deleteBranch = async (branchId: number) => {
  try {
    let response: any = await apiDelete(API_BRANCHES + '/' + branchId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
