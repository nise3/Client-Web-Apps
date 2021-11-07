import {apiDelete, apiPost, apiPut} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {
  API_FRONT_END_GALLERY,
  API_FRONT_END_GALLERY_LIST,
} from '../../@softbd/common/apiRoutes';

export const createGallery = async (data: any) => {
  try {
    let response: any = await apiPost(API_FRONT_END_GALLERY_LIST, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
export const updateGallery = async (galleryId: number, data: any) => {
  try {
    let response: any = await apiPut(API_FRONT_END_GALLERY, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const deleteGallery = async (galleryId: number) => {
  try {
    let response: any = await apiDelete(
      API_FRONT_END_GALLERY_LIST + '/' + galleryId,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
