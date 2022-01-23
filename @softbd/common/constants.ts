export const APP_TITLE = 'NISE3 TMS';

export const PERMISSION_GROUP_ORGANIZATION_KEY = 'organization';
export const PERMISSION_GROUP_INSTITUTE_KEY = 'institute';
export const PERMISSION_GROUP_INDUSTRY_ASSOCIATION_KEY = 'industry-association';
export const HIERARCHY_NODE_ID_PREFIX_STRING = 'm';
export const GOOGLE_MAP_API_KEY = 'AIzaSyCUacnvu4F1i4DXD_o9pxhkZHvU1RYhz5I';

export const isLocalHost = () =>
  typeof window !== 'undefined' && window?.location?.hostname
    ? location.hostname === 'localhost' || location.hostname === '127.0.0.1'
    : '';

/** TODO: If the following method is not being in use then please remove them */
export const adminDomain = () => {
  return isLocalHost() ? 'http://localhost:3000' : 'https://admin.nise.gov.bd';
};
/** TODO: If the following method is not being in use then please remove them */
export const youthDomain = () => {
  return isLocalHost() ? 'http://localhost:3002' : 'https://youth.nise.gov.bd';
};
/** TODO: If the following method is not being in use then please remove them */
export const instituteDomain = () => {
  return isLocalHost() ? 'http://localhost:3003' : 'https://dyd.nise.gov.bd';
};
/** TODO: If the following method is not being in use then please remove them */
export const industryDomain = () => {
  return isLocalHost()
    ? 'http://localhost:3004'
    : 'https://industry.nise.gov.bd';
};
/** TODO: If the following method is not being in use then please remove them */
export const niseDomain = () => {
  return isLocalHost() ? 'http://localhost:3001' : 'https://nise.gov.bd';
};
/** TODO: If the following method is not being in use then please remove them */
export const cookieDomain = () => {
  return isLocalHost() ? 'localhost' : 'nise.gov.bd';
};

export const gotoLoginSignUpPage = (path: string) => {
  const params =
    typeof window !== 'undefined'
      ? 'redirected_from=' + window.location.href
      : '';

  const niseUrl = new URL(niseDomain());
  niseUrl.pathname = path;

  if (params.length) {
    niseUrl.search = params;
  }

  return niseUrl.toString();
};
