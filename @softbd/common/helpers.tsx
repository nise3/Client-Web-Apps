import moment from 'moment';

export const catchBlockHandler = (error: any, message = '') => {
  //const {errorStack} = useNotiStack();
  //console.log('catchBlockHandler', error);
  //errorStack(message || error.message);
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
  return moment(myDate).format(format);
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
