export const URL_REGEX = new RegExp('^https?://');
export const YOUTUBE_URL_REGEX = new RegExp('^https://www.youtube.com/embed/');
export const FREQUENCY_REGEX = new RegExp('^(([1-9]*)|(([1-9]*).([0-9]*)))$');
export const MOBILE_NUMBER_REGEX = new RegExp('^(?:\\+88|88)?(01[3-9]\\d{8})$');
export const PASSWORD_REGEX = new RegExp('^\\S*$');
export const TEXT_REGEX = new RegExp('^[A-Za-z\\s]+$');
export const DOMAIN_REGEX = new RegExp(
  '^(http|https):\\/\\/[a-zA-Z-\\-\\.0-9]+$',
);
export const TEXT_REGEX_BANGLA = new RegExp(
  "^[\\s-'\u0980-\u09ff\u200d!@#$%^&*)(+=._-]+$",
);
