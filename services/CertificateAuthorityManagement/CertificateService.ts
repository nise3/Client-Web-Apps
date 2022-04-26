import {apiPost} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';

interface ICertificate {
  template: string;
  title_en: string;
  title: string;
  result_type: string;
  accessor_type: string;
  accessor_id: number;
  purpose_name: string;
  purpose_id: number;
}

export const createCertificate = async (data: ICertificate) => {
  try {
    let response: any = await apiPost(
      'http://192.168.13.215:8001/api/v1/certificates',
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
