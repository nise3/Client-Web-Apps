import {apiDelete, apiGet, apiPost, apiPut} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {
  API_USERS,
  PROFILE_UPDATE,
  UPDATE_PASSWORD,
} from '../../@softbd/common/apiRoutes';
import {IUser} from '../../shared/Interface/userManagement.interface';

/**
 * @deprecated
 */
export const getAllUsers = async () => {
  try {
    let response: any = await apiGet(API_USERS);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

/**
 * @deprecated
 * @param userId
 */
export const getUser = async (userId: number) => {
  try {
    let response: any = await apiGet(API_USERS + '/' + userId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const createUser = async (data: IUser) => {
  try {
    let response: any = await apiPost(API_USERS, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const CDAPUserLogin = async (data: any) => {
  try {
    let response: any = await apiPost(API_USERS, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateUser = async (userId: number, data: IUser) => {
  try {
    let response: any = await apiPut(API_USERS + '/' + userId, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateProfile = async (userId: number, data: IUser) => {
  try {
    let response: any = await apiPost(
      API_USERS + '/' + userId + PROFILE_UPDATE,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const deleteUser = async (userId: number) => {
  try {
    let response: any = await apiDelete(API_USERS + '/' + userId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updatePassword = async (userId: number, data: any) => {
  try {
    let response: any = await apiPut(
      API_USERS + '/' + userId + UPDATE_PASSWORD,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
