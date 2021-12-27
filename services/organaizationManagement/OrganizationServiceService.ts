import {apiDelete, apiGet, apiPost, apiPut} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {API_ORGANIZATION_SERVICES} from '../../@softbd/common/apiRoutes';
import {IService} from '../../shared/Interface/services.interface';

/**
 * @deprecated
 */
export const getAllServices = async (params = {}) => {
  try {
    let response: any = await apiGet(API_ORGANIZATION_SERVICES, {params});
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

/**
 * @deprecated
 */
export const getService = async (serviceId: number) => {
  try {
    let response: any = await apiGet(
      API_ORGANIZATION_SERVICES + '/' + serviceId,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const deleteService = async (serviceId: number) => {
  try {
    let response: any = await apiDelete(
      API_ORGANIZATION_SERVICES + '/' + serviceId,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const createService = async (data: IService) => {
  try {
    let response: any = await apiPost(API_ORGANIZATION_SERVICES, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateService = async (serviceId: number, data: IService) => {
  try {
    let response: any = await apiPut(
      API_ORGANIZATION_SERVICES + '/' + serviceId,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
