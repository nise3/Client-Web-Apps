import {apiDelete, apiPost, apiPut} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {API_GALLERY_ALBUMS} from '../../@softbd/common/apiRoutes';

export const createGallery = async (data: any) => {
  try {
    let response: any = await apiPost(API_GALLERY_ALBUMS, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
export const updateGalleryAlbum = async (galleryAlbumId: number, data: any) => {
  try {
    let response: any = await apiPut(
      API_GALLERY_ALBUMS + '/' + galleryAlbumId,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const deleteGallery = async (galleryId: number) => {
  try {
    let response: any = await apiDelete(API_GALLERY_ALBUMS + '/' + galleryId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
