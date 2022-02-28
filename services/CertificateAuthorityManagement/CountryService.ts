import {apiDelete, apiGet, apiPost, apiPut} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {API_COUNTRIES} from '../../@softbd/common/apiRoutes';
// import {ICountry} from '../../shared/Interface/country.interface';

/**
 * @deprecated
 */
export const getAllCountries = async (params = {}) => {
  try {
    let response: any = await apiGet(API_COUNTRIES , {params});
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

/**
 * @deprecated
 */


/**
 * @deprecated
 */
export const getCountry = async (countryId: number) => {
  try {
    let response: any = await apiGet(API_COUNTRIES  + '/' + countryId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const createCountry = async (data: any) => {
  try {
    let response: any = await apiPost(API_COUNTRIES , data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateCountry = async (countryId: number, data: any) => {
  try {
    let response: any = await apiPut(API_COUNTRIES  + '/' + countryId, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const deleteCountry = async (countryId: number) => {
  try {
    let response: any = await apiDelete(API_COUNTRIES  + '/' + countryId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
