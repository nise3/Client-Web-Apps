import { apiGet, apiPost } from "../../@softbd/common/api";
import { catchBlockHandler } from "../../@softbd/utilities/helpers";
import { API_RTO_COUNTRIES } from "../../@softbd/common/apiRoutes";

export const getAllRTOCountries = async (params = {}) => {
  try {
    let response: any = await apiGet(API_RTO_COUNTRIES , {params});
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const createRTOCountry = async (data: any) => {
  try {
    let response: any = await apiPost(API_RTO_COUNTRIES , data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
