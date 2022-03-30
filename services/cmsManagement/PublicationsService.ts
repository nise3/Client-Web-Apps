import {apiDelete, apiPost, apiPut} from '../../@softbd/common/api';
import {API_NISE_PUBLICATIONS} from '../../@softbd/common/apiRoutes';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {IPublication} from '../../shared/Interface/common.interface';

export const createPublication = async (data: IPublication) => {
  try {
    let response: any = await apiPost(API_NISE_PUBLICATIONS, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updatePublication = async (
  publicationId: number,
  data: IPublication,
) => {
  try {
    let response: any = await apiPut(
      API_NISE_PUBLICATIONS + '/' + publicationId,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const deletePublication = async (publicationId: number) => {
  try {
    let response: any = await apiDelete(
      API_NISE_PUBLICATIONS + '/' + publicationId,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
