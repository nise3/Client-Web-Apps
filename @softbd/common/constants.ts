export const APP_TITLE = 'NISE TMS';

export const PERMISSION_GROUP_ORGANIZATION_KEY = 'organization';
export const PERMISSION_GROUP_INSTITUTE_KEY = 'institute';
export const PERMISSION_GROUP_CERTIFICATE_AUTHORITY_KEY =
  'certificate_authority';
export const PERMISSION_GROUP_INDUSTRY_ASSOCIATION_KEY = 'industry_association';

export const PERMISSION_GROUP_REGISTERED_TRAINING_ORGANIZATION_KEY =
  'registered_training_organization';
export const HIERARCHY_NODE_ID_PREFIX_STRING = 'm';
export const GOOGLE_MAP_API_KEY = 'AIzaSyCUacnvu4F1i4DXD_o9pxhkZHvU1RYhz5I';
export const RESEND_CODE_RETRY_TIME_IN_MILLIS = 1000 * 180;
export const DATE_OF_BIRTH_MIN_AGE = 5; //age in years
export const GUARDIAN_DATE_OF_BIRTH_MIN_AGE = 20; //age in years
export const RELATION_TYPES = {
  FATHER: 1,
  MOTHER: 2
}

export const isLocalHost = () =>
  typeof window !== 'undefined' && window?.location?.hostname
    ? location.hostname === 'localhost' || location.hostname === '127.0.0.1'
    : '';

export const adminDomain = () => {
  return isLocalHost()
    ? 'http://localhost:3000'
    : process.env.NEXT_PUBLIC_FRONTEND_ADMIN_PORTAL_DOMAIN
    ? process.env.NEXT_PUBLIC_FRONTEND_ADMIN_PORTAL_DOMAIN
    : 'https://admin.nise.gov.bd';
};

export const youthDomain = () => {
  return isLocalHost()
    ? 'http://localhost:3002'
    : process.env.NEXT_PUBLIC_FRONTEND_YOUTH_DOMAIN
    ? process.env.NEXT_PUBLIC_FRONTEND_YOUTH_DOMAIN
    : 'https://youth.nise.gov.bd';
};

export const instituteDomain = () => {
  return isLocalHost()
    ? 'http://localhost:3003'
    : process.env.NEXT_PUBLIC_FRONTEND_DEFAULT_TSP_DOMAIN
    ? process.env.NEXT_PUBLIC_FRONTEND_DEFAULT_TSP_DOMAIN
    : 'https://dyd.nise.gov.bd';
};

export const industryDomain = () => {
  return isLocalHost()
    ? 'http://localhost:3004'
    : process.env.NEXT_PUBLIC_FRONTEND_DEFAULT_INDUSTRY_ASSO_DOMAIN
    ? process.env.NEXT_PUBLIC_FRONTEND_DEFAULT_INDUSTRY_ASSO_DOMAIN
    : 'https://mcci.nise.gov.bd';
};

export const niseDomain = () => {
  return isLocalHost()
    ? 'http://localhost:3001'
    : process.env.NEXT_PUBLIC_FRONTEND_PORTAL_DOMAIN
    ? process.env.NEXT_PUBLIC_FRONTEND_PORTAL_DOMAIN
    : 'https://nise.gov.bd';
};

export const erplDomain = () => {
  return isLocalHost()
    ? 'http://localhost:3005'
    : process.env.NEXT_PUBLIC_FRONTEND_ERPL_DOMAIN
    ? process.env.NEXT_PUBLIC_FRONTEND_ERPL_DOMAIN
    : 'https://rpl.nise.gov.bd';
};

export const cookieDomain = () => {
  return isLocalHost()
    ? 'localhost'
    : process.env.NEXT_PUBLIC_NISE_COOKIE_DOMAIN
    ? process.env.NEXT_PUBLIC_NISE_COOKIE_DOMAIN
    : 'nise.gov.bd';
};

export const gotoLoginSignUpPage = (path: string, redirect_url?: string) => {
  const params =
    typeof window !== 'undefined'
      ? 'redirected_from=' + (redirect_url? redirect_url : window?.location?.href)
      : '';

  const niseUrl = new URL(niseDomain());
  niseUrl.pathname = path;

  if (params.length) {
    niseUrl.search = params;
  }

  return niseUrl.toString();
};

export const isLatLongValid = (val: string): boolean => {
  if (val) {
    var pattern = /^[^+]((\-?|\+?)?\d+(\.\d+)?)$/;
    return pattern.test(val);
  } else {
    return true;
  }
};

export const GEO_VALIDATION = (yup: any, messages: any) => {
  return {
    isLatValid: yup
      .string()
      .nullable()
      .test(
        'lat-err',
        `${messages['common.location_latitude']} ${messages['common.not_valid']}`,
        (value: string) => isLatLongValid(value),
      ),
  };
};

export const FORM_PLACEHOLDER = {
  LATITUDE: '23.000000...',
  LONGITUDE: '90.000000...',
  MAP_SOURCE: 'https://www.google.com/maps/place/...',
};

