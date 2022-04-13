import {apiDelete, apiGet, apiPost, apiPut} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {API_4IR_CELL} from '../../@softbd/common/apiRoutes';
import {ICell} from '../../shared/Interface/4IR.interface';

export const getAllCells = async (params = {}) => {
  try {
    let response: any = await apiGet(API_4IR_CELL, {params});
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

/**
 * @deprecated
 */
export const getCell = async (cellId: number) => {
  try {
    let response: any = await apiGet(API_4IR_CELL + '/' + cellId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const createCell = async (data: ICell) => {
  try {
    let response: any = await apiPost(API_4IR_CELL, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateCell = async (cellId: number, data: ICell) => {
  try {
    let response: any = await apiPut(API_4IR_CELL + '/' + cellId, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const deleteCell = async (cellId: number) => {
  try {
    let response: any = await apiDelete(API_4IR_CELL + '/' + cellId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
