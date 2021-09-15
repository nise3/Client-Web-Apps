export const MOBILE_NUMBER_REGEX = new RegExp('^(?:\\+88|88)?(01[3-9]\\d{8})$');
export const DOMAIN_REGEX = new RegExp(
  '^(http|https):\\/\\/[a-zA-Z-\\-\\.0-9]+$',
);

/**
 * @deprecated
 */
export const TEXT_REGEX_BANGLA = new RegExp(
  "^[\\s-'\u0980-\u09ff\u200d!@#$%^&*)(+=._-]+$",
);
export const TEXT_REGEX_BANGLA_ONLY = new RegExp(
  "^[\\s-'\u0980-\u09ff\u200d!@#$%^&*)(+=._-]+$",
);
export const TEXT_REGEX_ENGLISH_ONLY = new RegExp(
  "^[a-zA-Z0-9\\s'!@#$%^&*)(+=._-]+$",
);
