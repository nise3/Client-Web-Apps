import {apiGet, apiPost, apiPut} from '../../@softbd/common/api';
import {API_CERTIFICATES} from '../../@softbd/common/apiRoutes';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import certificate from '../../dashboard/pages/certificate';
// import {CERTIFICATE_TYPE_API_URL} from '../../modules/dashboard/certificate-issue/certificate-issue-constant';
import {ICertificate} from '../../shared/Interface/certificates';

const CERTIFICATES = [
  {
    id: 1,
    title: 'সনদপত্র',
    title_en: 'Cerificate',
    template:
      '"{"template":"{\\"background\\":{\\"fill\\":\\"rgba(255, 255, 255, 1)\\"},\\"dimensions\\":{\\"width\\":1920,\\"height\\":1536},\\"elements\\":[]}"}"',
    result_type: '2',
    accessor_type: '',
    accessor_id: 0,
    row_status: '',
    created_at: '2022-04-28T08:04:26.000000Z',
    updated_at: '2022-04-28T08:04:26.000000Z',
  },
  {
    id: 2,
    title: 'Certificate',
    title_en: 'Cerificate 1',
    template:
      '{"template":"{\\"background\\":{\\"fill\\":\\"rgba(255, 255, 255, 1)\\"},\\"dimensions\\":{\\"width\\":1920,\\"height\\":1080},\\"elements\\":[{\\"id\\":\\"text:e6c861c3-9b9f-47b3-95bf-a484920f2b7e\\",\\"props\\":{\\"text\\":\\"প্রত্যয়ন করা যাচ্ছে যে\\",\\"fontSize\\":24,\\"fontFamily\\":\\"Arial\\",\\"align\\":\\"center\\",\\"fillEnabled\\":true,\\"fill\\":\\"rgba(0, 0, 0, 1)\\",\\"lineHeight\\":1,\\"shadowEnabled\\":false,\\"shadowColor\\":\\"rgba(0, 0, 0, 0.5)\\",\\"shadowBlur\\":5,\\"strokeEnabled\\":false,\\"stroke\\":\\"rgba(0, 0, 0, 1)\\",\\"strokeWidth\\":1,\\"scaleX\\":1,\\"scaleY\\":1,\\"x\\":455.29904913525013,\\"y\\":362.16910463179244},\\"type\\":\\"text\\"},{\\"id\\":\\"text:bc7a54d1-e300-4853-a2ae-ef25ac24cd7d\\",\\"props\\":{\\"text\\":\\"Headline Text\\",\\"fontSize\\":48,\\"fontStyle\\":\\"bold\\",\\"fontFamily\\":\\"Archivo Black\\",\\"align\\":\\"center\\",\\"fillEnabled\\":true,\\"fill\\":\\"rgba(0, 0, 0, 1)\\",\\"lineHeight\\":1,\\"shadowEnabled\\":false,\\"shadowColor\\":\\"rgba(0, 0, 0, 0.5)\\",\\"shadowBlur\\":5,\\"strokeEnabled\\":false,\\"stroke\\":\\"rgba(0, 0, 0, 1)\\",\\"strokeWidth\\":1,\\"scaleX\\":1,\\"scaleY\\":1,\\"x\\":828.7395511609304,\\"y\\":197.78395753668255},\\"type\\":\\"text\\"},{\\"id\\":\\"line:a0b2bf1d-facf-4170-b68c-d87e71dcbcc2\\",\\"props\\":{\\"points\\":[480,540,960,540],\\"stroke\\":\\"black\\",\\"strokeWidth\\":5,\\"scaleX\\":1,\\"scaleY\\":1,\\"x\\":-315.1567375821476,\\"y\\":347.34849705502955},\\"type\\":\\"line\\"},{\\"id\\":\\"text:cf5e388a-3b90-4c74-b504-c42e3c40a438\\",\\"props\\":{\\"text\\":\\"এহসানুল হক মুন্না\\",\\"fontSize\\":24,\\"fontFamily\\":\\"Arial\\",\\"align\\":\\"center\\",\\"fillEnabled\\":true,\\"fill\\":\\"rgba(0, 0, 0, 1)\\",\\"lineHeight\\":1,\\"shadowEnabled\\":false,\\"shadowColor\\":\\"rgba(0, 0, 0, 0.5)\\",\\"shadowBlur\\":5,\\"strokeEnabled\\":false,\\"stroke\\":\\"rgba(0, 0, 0, 1)\\",\\"strokeWidth\\":1,\\"scaleX\\":1,\\"scaleY\\":1,\\"x\\":289.6474419534803,\\"y\\":913.4447838288069},\\"type\\":\\"text\\"}]}"}',
    result_type: '1',
    accessor_type: '',
    accessor_id: 0,
    row_status: '',
    created_at: '2022-04-28T09:00:18.000000Z',
    updated_at: '2022-04-28T09:00:18.000000Z',
  },
  {
    id: 3,
    title: 'Certificate',
    title_en: 'Cerificate 1',
    template:
      '{"template":"{\\"background\\":{\\"fill\\":\\"rgba(255, 255, 255, 1)\\"},\\"dimensions\\":{\\"width\\":1080,\\"height\\":1080},\\"elements\\":[{\\"id\\":\\"text:7b88a988-21d6-4392-a6f8-3ab961b0e851\\",\\"props\\":{\\"text\\":\\"Headline Text\\",\\"fontSize\\":48,\\"fontStyle\\":\\"bold\\",\\"fontFamily\\":\\"Archivo Black\\",\\"align\\":\\"center\\",\\"fillEnabled\\":true,\\"fill\\":\\"rgba(0, 0, 0, 1)\\",\\"lineHeight\\":1,\\"shadowEnabled\\":false,\\"shadowColor\\":\\"rgba(0, 0, 0, 0.5)\\",\\"shadowBlur\\":5,\\"strokeEnabled\\":false,\\"stroke\\":\\"rgba(0, 0, 0, 1)\\",\\"strokeWidth\\":1,\\"scaleX\\":1,\\"scaleY\\":1,\\"x\\":397.546875,\\"y\\":516},\\"type\\":\\"text\\"}]}","stage":"{\\"attrs\\":{\\"width\\":912,\\"height\\":187.125,\\"scaleX\\":0.15659722222222222,\\"scaleY\\":0.15659722222222222,\\"offsetX\\":-2371.929046563193,\\"offsetY\\":-57.47228381374723},\\"className\\":\\"Stage\\",\\"children\\":[{\\"attrs\\":{\\"bac\\":true},\\"className\\":\\"Layer\\",\\"children\\":[{\\"attrs\\":{\\"x\\":-6.385809312638581,\\"y\\":-6.385809312638581,\\"width\\":1092.7716186252771,\\"height\\":1092.7716186252771,\\"shadowColor\\":\\"black\\",\\"shadowOpacity\\":0.1,\\"shadowBlur\\":4,\\"fill\\":\\"rgb(229, 231, 235)\\"},\\"className\\":\\"Rect\\"},{\\"attrs\\":{\\"width\\":1080,\\"height\\":1080,\\"shadowColor\\":\\"black\\",\\"shadowOpacity\\":0.06,\\"shadowBlur\\":2,\\"fill\\":\\"rgba(255, 255, 255, 1)\\"},\\"className\\":\\"Rect\\"}]},{\\"attrs\\":{\\"clipX\\":0,\\"clipY\\":0,\\"clipWidth\\":1080,\\"clipHeight\\":1080},\\"className\\":\\"Layer\\",\\"children\\":[{\\"attrs\\":{\\"verticalAlign\\":\\"middle\\",\\"text\\":\\"Headline Text\\",\\"fontSize\\":48,\\"fontStyle\\":\\"bold\\",\\"fontFamily\\":\\"Archivo Black\\",\\"align\\":\\"center\\",\\"fill\\":\\"rgba(0, 0, 0, 1)\\",\\"shadowEnabled\\":false,\\"shadowColor\\":\\"rgba(0, 0, 0, 0.5)\\",\\"shadowBlur\\":5,\\"strokeEnabled\\":false,\\"stroke\\":\\"rgba(0, 0, 0, 1)\\",\\"strokeWidth\\":1,\\"x\\":397.546875,\\"y\\":516,\\"id\\":\\"text:7b88a988-21d6-4392-a6f8-3ab961b0e851\\",\\"draggable\\":true},\\"className\\":\\"Text\\"}]},{\\"attrs\\":{},\\"className\\":\\"Layer\\",\\"children\\":[]}]}"}',
    result_type: '',
    accessor_type: '',
    accessor_id: 0,
    row_status: '',
    created_at: '2022-04-28T09:25:44.000000Z',
    updated_at: '2022-04-28T09:25:44.000000Z',
  },
  {
    id: 4,
    title: 'Certificate',
    title_en: 'Cerificate 1',
    template:
      '{"template":"{\\"background\\":{\\"fill\\":\\"rgba(255, 255, 255, 1)\\"},\\"dimensions\\":{\\"width\\":1080,\\"height\\":1080},\\"elements\\":[{\\"id\\":\\"text:7b88a988-21d6-4392-a6f8-3ab961b0e851\\",\\"props\\":{\\"text\\":\\"Headline Text\\",\\"fontSize\\":48,\\"fontStyle\\":\\"bold\\",\\"fontFamily\\":\\"Archivo Black\\",\\"align\\":\\"center\\",\\"fillEnabled\\":true,\\"fill\\":\\"rgba(0, 0, 0, 1)\\",\\"lineHeight\\":1,\\"shadowEnabled\\":false,\\"shadowColor\\":\\"rgba(0, 0, 0, 0.5)\\",\\"shadowBlur\\":5,\\"strokeEnabled\\":false,\\"stroke\\":\\"rgba(0, 0, 0, 1)\\",\\"strokeWidth\\":1,\\"scaleX\\":1,\\"scaleY\\":1,\\"x\\":397.546875,\\"y\\":516},\\"type\\":\\"text\\"},{\\"id\\":\\"text:4530c30c-a4de-4917-9549-ffb2bd87d994\\",\\"props\\":{\\"text\\":\\"প্রত্যয়ন করা যাচ্ছে যে\\",\\"fontSize\\":24,\\"fontFamily\\":\\"Arial\\",\\"align\\":\\"center\\",\\"fillEnabled\\":true,\\"fill\\":\\"rgba(0, 0, 0, 1)\\",\\"lineHeight\\":1,\\"shadowEnabled\\":false,\\"shadowColor\\":\\"rgba(0, 0, 0, 0.5)\\",\\"shadowBlur\\":5,\\"strokeEnabled\\":false,\\"stroke\\":\\"rgba(0, 0, 0, 1)\\",\\"strokeWidth\\":1,\\"scaleX\\":1,\\"scaleY\\":1,\\"x\\":429.28125,\\"y\\":528},\\"type\\":\\"text\\"}]}","stage":"{\\"attrs\\":{\\"width\\":912,\\"height\\":187.125,\\"scaleX\\":0.15659722222222222,\\"scaleY\\":0.15659722222222222,\\"offsetX\\":-2371.929046563193,\\"offsetY\\":-57.47228381374723},\\"className\\":\\"Stage\\",\\"children\\":[{\\"attrs\\":{\\"bac\\":true},\\"className\\":\\"Layer\\",\\"children\\":[{\\"attrs\\":{\\"x\\":-6.385809312638581,\\"y\\":-6.385809312638581,\\"width\\":1092.7716186252771,\\"height\\":1092.7716186252771,\\"shadowColor\\":\\"black\\",\\"shadowOpacity\\":0.1,\\"shadowBlur\\":4,\\"fill\\":\\"rgb(229, 231, 235)\\"},\\"className\\":\\"Rect\\"},{\\"attrs\\":{\\"width\\":1080,\\"height\\":1080,\\"shadowColor\\":\\"black\\",\\"shadowOpacity\\":0.06,\\"shadowBlur\\":2,\\"fill\\":\\"rgba(255, 255, 255, 1)\\"},\\"className\\":\\"Rect\\"}]},{\\"attrs\\":{\\"clipX\\":0,\\"clipY\\":0,\\"clipWidth\\":1080,\\"clipHeight\\":1080},\\"className\\":\\"Layer\\",\\"children\\":[{\\"attrs\\":{\\"verticalAlign\\":\\"middle\\",\\"text\\":\\"Headline Text\\",\\"fontSize\\":48,\\"fontStyle\\":\\"bold\\",\\"fontFamily\\":\\"Archivo Black\\",\\"align\\":\\"center\\",\\"fill\\":\\"rgba(0, 0, 0, 1)\\",\\"shadowEnabled\\":false,\\"shadowColor\\":\\"rgba(0, 0, 0, 0.5)\\",\\"shadowBlur\\":5,\\"strokeEnabled\\":false,\\"stroke\\":\\"rgba(0, 0, 0, 1)\\",\\"strokeWidth\\":1,\\"x\\":397.546875,\\"y\\":516,\\"id\\":\\"text:7b88a988-21d6-4392-a6f8-3ab961b0e851\\",\\"draggable\\":true},\\"className\\":\\"Text\\"},{\\"attrs\\":{\\"verticalAlign\\":\\"middle\\",\\"text\\":\\"প্রত্যয়ন করা যাচ্ছে যে\\",\\"fontSize\\":24,\\"align\\":\\"center\\",\\"fill\\":\\"rgba(0, 0, 0, 1)\\",\\"shadowEnabled\\":false,\\"shadowColor\\":\\"rgba(0, 0, 0, 0.5)\\",\\"shadowBlur\\":5,\\"strokeEnabled\\":false,\\"stroke\\":\\"rgba(0, 0, 0, 1)\\",\\"strokeWidth\\":1,\\"x\\":429.28125,\\"y\\":528,\\"id\\":\\"text:4530c30c-a4de-4917-9549-ffb2bd87d994\\",\\"draggable\\":true},\\"className\\":\\"Text\\"}]},{\\"attrs\\":{},\\"className\\":\\"Layer\\",\\"children\\":[]}]}"}',
    result_type: '',
    accessor_type: '',
    accessor_id: 0,
    row_status: '',
    created_at: '2022-04-28T09:30:16.000000Z',
    updated_at: '2022-04-28T09:30:16.000000Z',
  },
  {
    id: 5,
    title: 'Certificate',
    title_en: 'Cerificate 1',
    template:
      '{"template":"{\\"background\\":{\\"fill\\":\\"rgba(255, 255, 255, 1)\\"},\\"dimensions\\":{\\"width\\":1920,\\"height\\":1080},\\"elements\\":[{\\"id\\":\\"text:d1ad3704-79b0-483a-a095-1e510595e438\\",\\"props\\":{\\"text\\":\\"Institute Name\\",\\"fontSize\\":72,\\"fontStyle\\":\\"bold\\",\\"fontFamily\\":\\"Archivo Black\\",\\"align\\":\\"center\\",\\"fillEnabled\\":true,\\"fill\\":\\"rgba(0, 0, 0, 1)\\",\\"lineHeight\\":1,\\"shadowEnabled\\":false,\\"shadowColor\\":\\"rgba(0, 0, 0, 0.5)\\",\\"shadowBlur\\":5,\\"strokeEnabled\\":false,\\"stroke\\":\\"rgba(0, 0, 0, 1)\\",\\"strokeWidth\\":1,\\"scaleX\\":1,\\"scaleY\\":1,\\"x\\":767.3910546516962,\\"y\\":209.8751328814493},\\"type\\":\\"text\\"},{\\"id\\":\\"line:33991df3-5f40-44f1-830a-40c4f4ce4c3c\\",\\"props\\":{\\"points\\":[480,540,960,540],\\"stroke\\":\\"black\\",\\"strokeWidth\\":5,\\"scaleX\\":1,\\"scaleY\\":1,\\"x\\":-390.90742438130167,\\"y\\":361.54402409690925},\\"type\\":\\"line\\"},{\\"id\\":\\"text:5b2e78aa-aca9-4e75-afb5-9fae81159323\\",\\"props\\":{\\"text\\":\\"Rahul Dash\\",\\"fontSize\\":48,\\"fontFamily\\":\\"Arial\\",\\"align\\":\\"center\\",\\"fillEnabled\\":true,\\"fill\\":\\"rgba(0, 0, 0, 1)\\",\\"lineHeight\\":1,\\"shadowEnabled\\":false,\\"shadowColor\\":\\"rgba(0, 0, 0, 0.5)\\",\\"shadowBlur\\":5,\\"strokeEnabled\\":false,\\"stroke\\":\\"rgba(0, 0, 0, 1)\\",\\"strokeWidth\\":1,\\"scaleX\\":1,\\"scaleY\\":1,\\"x\\":199.8953654903758,\\"y\\":934.4071511746279,\\"fontStyle\\":\\"bold\\"},\\"type\\":\\"text\\"},{\\"id\\":\\"text:8f114cd2-50c1-4443-8432-a9dc3bd97d77\\",\\"props\\":{\\"text\\":\\"Software Engineer\\",\\"fontSize\\":24,\\"fontFamily\\":\\"Arial\\",\\"align\\":\\"center\\",\\"fillEnabled\\":true,\\"fill\\":\\"rgba(0, 0, 0, 1)\\",\\"lineHeight\\":1,\\"shadowEnabled\\":false,\\"shadowColor\\":\\"rgba(0, 0, 0, 0.5)\\",\\"shadowBlur\\":5,\\"strokeEnabled\\":false,\\"stroke\\":\\"rgba(0, 0, 0, 1)\\",\\"strokeWidth\\":1,\\"scaleX\\":1,\\"scaleY\\":1,\\"x\\":215.73404560036664,\\"y\\":1008.2993604791053},\\"type\\":\\"text\\"}]}"}',
    result_type: '',
    accessor_type: '',
    accessor_id: 0,
    row_status: '',
    created_at: '2022-04-28T09:46:27.000000Z',
    updated_at: '2022-04-28T09:46:27.000000Z',
  },
];

export const createCertificate = async (data: Partial<ICertificate>) => {
  try {
    let response: any = await apiPost(API_CERTIFICATES, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateCertificate = async (
  certificateId: number,
  data: Partial<ICertificate>,
) => {
  try {
    let response: any = await apiPut(
      API_CERTIFICATES + '/' + certificateId,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const getCertificateById = async (certificateId: any) => {
  try {
    let response: any = await apiGet(`${API_CERTIFICATES}/${certificateId}`);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const createCertificateById = async (id: number) => {
  try {
    let response: any = await apiGet(API_CERTIFICATES + '/' + id);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const getCertificateByResultType = async (params: any) => {
  try {
    let response: any = await apiGet(API_CERTIFICATES, {params});
    return response.data;
    // return {
    //   "order": "ASC",
    //   "data": CERTIFICATES.filter(item => item.result_type == params.result_type),
    //   "_response_status": {
    //     "success": true,
    //     "code": 200,
    //     "query_time": 0
    //   }
    // }
  } catch (error) {
    catchBlockHandler(error);
  }
};
