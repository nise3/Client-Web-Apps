import {startCase as lodashStartCase} from 'lodash';
import moment from 'moment';
import {CommonAuthUser} from '../../redux/types/models/CommonAuthUser';
import ShowInTypes from './ShowInTypes';
import {getBrowserCookie} from '../libs/cookieInstance';
import {COOKIE_KEY_INSTITUTE_ID} from '../../shared/constants/AppConst';
import {getHostUrl} from '../common/SSOConfig';
import {
  industryDomain,
  instituteDomain,
  isLocalHost,
  niseDomain,
  youthDomain,
} from '../common/constants';
import URL from 'url';
import UserTypes from './UserTypes';
import {MAX_PAGE_SIZE, MIN_PAGE_SIZE} from './PageSizes';

export const genders = [
  {
    key: 1,
    label: 'Male',
  },
  {
    key: 2,
    label: 'Female',
  },
  {
    key: 3,
    label: 'Others',
  },
];

export const marital_status = [
  {
    key: 0,
    label: 'No',
  },
  {
    key: 1,
    label: 'Yes',
  },
];

export const religions = [
  {
    id: 1,
    label: 'Islam',
  },
  {
    id: 2,
    label: 'Hindu',
  },
  {
    id: 3,
    label: 'Buddhist',
  },
  {
    id: 4,
    label: 'Christian',
  },
  {
    id: 5,
    label: 'Others',
  },
];

export const catchBlockHandler = (error: any, message = '') => {
  throw error;
};

export const getGenderText = (genderCode: string): string => {
  switch (genderCode) {
    case 'M':
      return 'Male';
    case 'F':
      return 'Female';
    default:
      return 'Prefer not to say';
  }
};

export const getDateFormat = (dateValue: any): string => {
  const date = new Date(dateValue);
  return date.getMonth() + '-' + date.getDate() + '-' + date.getFullYear();
};

export const getMomentDateFormat = (
  dateValue: any,
  format = 'MM-DD-YYYY',
): string => {
  const myDate = new Date(dateValue);
  if (moment(myDate).isValid()) {
    return moment(myDate).format(format);
  } else {
    return '';
  }
};

export const addMonths = (date: Date, months: number) => {
  let d = date.getDate();
  date.setMonth(date.getMonth() + +months);
  if (date.getDate() != d) {
    date.setDate(0);
  }
  return date;
};

export const getMomentMonths = (): Array<string> => {
  return moment.months();
};

export const enterPressFocus = (ev: any, refField: any): void => {
  if (ev.key === 'Enter') {
    ev.preventDefault();
    refField.current.focus();
  }
};

export const fileInputLabelChange = (ref: any, label: string) => {
  ref.current.offsetParent.children[1].innerText = label;
};

export const enterPressSubmit = (ev: any, callback: any): void => {
  if (ev.key === 'Enter') {
    callback();
  }
};

export const checkValidImageFormat = (file: any) => {
  return (
    file == undefined ||
    file.name.match(/\.(jpg|jpeg|png|svg|JPG|JPEG|PNG|SVG)$/) ||
    'Invalid file format ! Please upload .Jpg, .Png, or .Svg format file'
  );
};

export const checkValidImageFormatAndSize = async (file: any) => {
  if (file == undefined) {
    return;
  }
  if (!file.name.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG|)$/)) {
    return 'Invalid file format ! Please upload .Jpg, .Png format file';
  }

  let _URL = window.URL || window.webkitURL;
  //let img = new Image();
  let imageUrl = _URL.createObjectURL(file);
  try {
    let image: any = await addImageProcess(imageUrl);
    return (
      (image.height == 750 && image.width == 750) ||
      'Image should be 750px X 750px'
    );
  } catch (e) {}
};

function addImageProcess(src: any): Promise<any> {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export const getAge = (birthDateString: string): number => {
  let today = new Date();
  let birthDate = new Date(birthDateString);
  let age: number = today.getFullYear() - birthDate.getFullYear();
  let m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

export const range = (total: number, startFrom: number = 0): Array<number> => {
  let items: number[] = [];
  for (let i = startFrom; i <= total; i++) {
    items.push(i);
  }
  return items;
};

export const isDefined = (object: any, property: any): boolean => {
  return typeof object[property] !== 'undefined';
};

export const generatePageNumber = (
  pageIndex: number,
  totalPage: number,
  totalSlide: number = 5,
): Array<number> => {
  let startFrom =
    pageIndex === 1
      ? pageIndex
      : pageIndex === 2
      ? pageIndex - 1
      : pageIndex - 2;
  return totalPage === 0
    ? []
    : range(Math.min(totalSlide + startFrom, totalPage), startFrom);
};

export const countPaginatePage = (
  totalData: number,
  pageSize: number,
): number => {
  return totalData < 1 ? 0 : Math.ceil(totalData / pageSize);
};

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const isResponseSuccess = (response: any) => {
  return response && response._response_status.success;
};

export const isValidationError = (response: any) => {
  return (
    response &&
    !response._response_status.success &&
    response._response_status.code == 400
  );
};

export const getObjectArrayFromValueArray = (valueArray: any) => {
  if (valueArray && Array.isArray(valueArray)) {
    return valueArray.map((item: any) => {
      return {value: item};
    });
  } else {
    return [{value: ''}];
  }
};

export const getValuesFromObjectArray = (objectArray: any) => {
  if (objectArray && Array.isArray(objectArray)) {
    return objectArray
      .map((item: any) => item.value)
      .filter((value: any) => value != '');
  } else {
    return [];
  }
};

export function camelToWords(str: string) {
  return lodashStartCase(str);
}

// function toSnakeCase(str: string) {
//   return snakeCase(str);
// }

function snakeToCamel(str: string) {
  const parts = str.split('_');
  return parts.reduce(function (p, c) {
    return p + c.charAt(0).toUpperCase() + c.slice(1);
  }, parts.shift()!);
}

export function toCamelCase(object: any, exceptions: string[] = []) {
  if (typeof object !== 'object' || object === null) {
    return object;
  }

  return Object.keys(object).reduce((p: {[key: string]: any}, key: string) => {
    const newKey = exceptions.indexOf(key) === -1 ? snakeToCamel(key) : key;
    p[newKey] = toCamelCase(object[key]);
    return p;
  }, {});
}

export const getUserType = (user: CommonAuthUser | null) => {
  if (user?.isSystemUser) return UserTypes.SYSTEM_USER;
  else if (user?.isOrganizationUser) return UserTypes.ORGANIZATION_USER;
  else if (user?.isInstituteUser) return UserTypes.INSTITUTE_USER;
  else if (user?.isIndustryAssociationUser)
    return UserTypes.INDUSTRY_ASSOCIATION_USER;
  else return UserTypes.SYSTEM_USER;
};

export const isNeedToSelectOrganization = (
  user: CommonAuthUser | null,
): boolean => {
  // if user is organization user no need to select organization
  if (user?.isOrganizationUser) {
    return false;
  }
  return true;
};

export const courseDuration = (
  messages: any,
  formatFn: any,
  duration: number,
) => {
  let dh = 0;
  let dm = 0;

  if (duration / 60 < 1) {
    return (
      formatFn(duration || 0) + ' ' + (messages['common.short_min'] as string)
    );
  } else {
    dm = duration % 60;
    dh = Math.floor(duration / 60);
    return (
      formatFn(dh || 0) +
      ' ' +
      (messages['common.short_hour'] as string) +
      ', ' +
      formatFn(dm || 0) +
      ' ' +
      (messages['common.short_min'] as string)
    );
  }
};

export const getCourseDuration = function (
  duration: number,
  formatFN: any,
  messages: any,
) {
  duration = formatFN(duration);

  if (duration > 1) {
    return duration + ' ' + (messages['common.hours'] as string);
  }

  return duration + ' ' + (messages['common.hour'] as string);
};

export const objectFilter = (object: any) => {
  Object.keys(object).forEach((key) => {
    if (!object[key]) {
      delete object[key];
    }
  });

  return object;
};

export const passingYears = () => {
  let passingYearsArray = [];
  for (let i = 2021; i > 1971; i--) {
    passingYearsArray.push({year: String(i)});
  }
  return passingYearsArray;
};

/*export const getModulePath = (path: string) => {
    const pathArray = path.split('/');
    if (pathArray.indexOf('youth') > -1) {
        return '/youth';
    } else if (pathArray.indexOf('institute') > -1) {
        return '/institute';
    } else {
        return '';
    }
};*/

export const getIntlDateFromString = (
  formatFn: any,
  dateStr: any,
  monthFormat?: string,
) => {
  const dt = new Date(dateStr).toLocaleString();
  if (dt !== 'Invalid Date') {
    return formatFn(dateStr, {
      day: '2-digit',
      month: monthFormat ? monthFormat : 'long',
      year: 'numeric',
    });
  } else {
    return dateStr;
  }
};

export const getIntlNumber = (formatFn: any, value: any) => {
  return value
    ? formatFn(value, {
        useGrouping: false,
      })
    : '';
};

export const getLanguageLabel = (language_configs: any, key: string) => {
  let label: string = '';
  (language_configs || []).map((lang: any) => {
    if (lang.code === key) {
      label = lang.native_name;
    }
  });
  return label;
};

/*export const getShowInTypeFromPath = (path: string) => {
    const pathArray = path.split('/');
    if (pathArray.indexOf('youth') > -1) {
        return ShowInTypes.YOUTH;
    } else if (pathArray.indexOf('institute') > -1) {
        return ShowInTypes.TSP;
    } else {
        return ShowInTypes.NICE3;
    }
};*/

export const getShowInTypeByDomain = (domain?: string) => {
  if (!domain) {
    domain = getHostUrl();
  }
  if (domain?.includes(niseDomain())) {
    return ShowInTypes.NICE3;
  } else if (domain?.includes(youthDomain())) {
    return ShowInTypes.YOUTH;
  } else {
    return ShowInTypes.TSP;
  }
};

const fbRegex1 = /\/videos\/([\w\-]*?)\//;
const fbRegex2 = /\/videos\/([\d]*?)\//;
const fbReplace = '/videos/';

export const getYoutubeUrl = (url: any) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  const id = match && match[2].length === 11 ? match[2] : null;

  return `https://www.youtube.com/embed/${id}`;
};

export const getFacebookUrl = (url: any) => {
  return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
    url.replace(
      fbRegex1,
      url.replace(fbRegex1, fbReplace) == url.replace(fbRegex2, fbReplace)
        ? '/videos/$1'
        : fbReplace,
    ),
  )}&width=500&height=280&show_text=false&appId`;
};

export const getVimeoUrl = (url: any) => {
  const vimeoRegex = /(?:vimeo)\.com.*(?:videos|video|channels|)\/([\d]+)/i;
  const parsed = url.match(vimeoRegex);

  return '//player.vimeo.com/video/' + parsed[1];
};

export const getEmbeddedVideoUrl = (video_url: any) => {
  const domain = URL.parse(video_url);
  if (domain.host == 'www.youtube.com') {
    return getYoutubeUrl(video_url);
  } else if (domain.host == 'www.facebook.com') {
    return getFacebookUrl(video_url);
  } else if (domain.host == 'vimeo.com') {
    return getVimeoUrl(video_url);
  } else {
    return null;
  }
};

export const getInstituteIdByDomain = (cookies?: any) => {
  return cookies && cookies?.institute_id
    ? cookies.institute_id
    : getBrowserCookie(COOKIE_KEY_INSTITUTE_ID) || 40;
};

export const getErrorObject = (id: any, errorInstance: any) => {
  const keyArray = id
    .replaceAll('.', ',')
    .replaceAll('[', ',')
    .replaceAll(']', '')
    .split(',');
  let errorObj = errorInstance;
  keyArray.forEach((key: string) => {
    errorObj = errorObj?.[key];
  });
  return errorObj;
};

export const getCurrentDomain = () => {
  const origin = getHostUrl();
  if (typeof window != 'undefined') {
    const host = window?.location?.host;
    if (isLocalHost()) {
      if (origin?.includes(niseDomain())) {
        return 'nise.gov.bd';
      } else if (origin?.includes(youthDomain())) {
        return ' youth.nise.gov.bd';
      } else if (origin?.includes(industryDomain())) {
        return 'mcci.nise.gov.bd';
      } else if (origin?.includes(instituteDomain())) {
        return 'dyd.nise.gov.bd';
      }
    }
    return host;
  } else {
    return '';
  }
};

export const getFilteredQueryParams = (
  params: any,
  defaultPageSize: number,
  defaultPage: number,
) => {
  if (
    params.page_size &&
    (!Number(params.page_size) ||
      params.page_size < MIN_PAGE_SIZE ||
      params.page_size > MAX_PAGE_SIZE)
  ) {
    params.page_size = defaultPageSize;
  }

  if (params.page && !Number(params.page)) {
    params.page = defaultPage;
  }

  return params;
};

export const getSchema = (yup: any, regex: any, level: any) => {
  return yup.object().shape({
    value: yup
      .mixed()
      .test(
        'mobile_number_validation',
        level as string,
        (value: any) => !value || Boolean(value.match(regex)),
      ),
  });
};
