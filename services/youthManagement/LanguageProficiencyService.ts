import {YouthLanguageProficiency} from './typing';
import {apiDelete, apiPost, apiPut} from '../../@softbd/common/api';
import {API_YOUTH_LANGUAGE_PROFICIENCIES} from '../../@softbd/common/apiRoutes';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';

export const createLanguageProficiency = async (
  data: YouthLanguageProficiency,
) => {
  try {
    let response: any = await apiPost(API_YOUTH_LANGUAGE_PROFICIENCIES, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateLanguageProficiency = async (
  languageProficiencyId: number,
  data: YouthLanguageProficiency,
) => {
  try {
    let response: any = await apiPut(
      API_YOUTH_LANGUAGE_PROFICIENCIES + '/' + languageProficiencyId,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const deleteLanguageProficiency = async (
  languageProficiencyId: number,
) => {
  try {
    let response: any = await apiDelete(
      API_YOUTH_LANGUAGE_PROFICIENCIES + '/' + languageProficiencyId,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
