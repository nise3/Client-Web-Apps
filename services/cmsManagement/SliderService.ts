import {apiDelete, apiGet, apiPost, apiPut} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {API_SLIDERS} from '../../@softbd/common/apiRoutes';

interface Slider {
  id: number;
  institute_id?: number;
  organization_id?: number;
  title?: string;
  sub_title?: string;
  is_button_available?: boolean;
  button_text?: string;
  link?: string;
  slider_images?: string;
  alt_title?: string;
  banner_template?: string;
}

/**
 * @deprecated
 */
export const getAllSliders = async (params = {}) => {
  try {
    let response: any = await apiGet(API_SLIDERS, {params});
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

/**
 * @deprecated
 */
export const getSlider = async (sliderId: number) => {
  try {
    let response: any = await apiGet(API_SLIDERS + '/' + sliderId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const createSlider = async (data: Slider) => {
  try {
    let response: any = await apiPost(API_SLIDERS, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateSlider = async (sliderId: number, data: Slider) => {
  try {
    let response: any = await apiPut(API_SLIDERS + '/' + sliderId, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const deleteSlider = async (sliderId: number) => {
  try {
    let response: any = await apiDelete(API_SLIDERS + '/' + sliderId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
