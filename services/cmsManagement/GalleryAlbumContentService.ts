import {apiDelete, apiPost, apiPut} from '../../@softbd/common/api';
import {API_GALLERY_ALBUM_CONTENTS} from '../../@softbd/common/apiRoutes';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';

export const updateGalleryAlbumContent = async (
  galleryAlbumContentId: number,
  data: any,
) => {
  try {
    let response: any = await apiPut(
      API_GALLERY_ALBUM_CONTENTS + '/' + galleryAlbumContentId,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const createGalleryAlbumContent = async (data: any) => {
  try {
    let response: any = await apiPost(API_GALLERY_ALBUM_CONTENTS, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const deleteGalleryAlbumContent = async (
  galleryAlbumContentId: number,
) => {
  try {
    let response: any = await apiDelete(
      API_GALLERY_ALBUM_CONTENTS + '/' + galleryAlbumContentId,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
