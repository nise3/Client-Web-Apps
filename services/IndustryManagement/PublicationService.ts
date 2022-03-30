import {apiDelete, apiPost, apiPut} from '../../@softbd/common/api';
import {API_INDUSTRY_PUBLICATIONS} from '../../@softbd/common/apiRoutes';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {IPublication} from '../../shared/Interface/publication.interface';

/** delete a publication */
export const deletePublication = async (publicationId: number) => {
  try {
    let response: any = await apiDelete(
      API_INDUSTRY_PUBLICATIONS + '/' + publicationId,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

/** update a publication */
export const updatePublication = async (
  publicationId: number,
  data: IPublication,
) => {
  try {
    let response: any = await apiPut(
      API_INDUSTRY_PUBLICATIONS + '/' + publicationId,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

/** Create a new Publication */
export const createPublication = async (data: IPublication) => {
  try {
    let response: any = await apiPost(API_INDUSTRY_PUBLICATIONS, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
