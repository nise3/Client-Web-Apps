export const APP_TITLE = 'NISE3 TMS';

export const PERMISSION_GROUP_ORGANIZATION_KEY = 'organization';
export const PERMISSION_GROUP_INSTITUTE_KEY = 'institute';
export const HIERARCHY_NODE_ID_PREFIX_STRING = 'm';
export const GOOGLE_MAP_API_KEY = 'AIzaSyCUacnvu4F1i4DXD_o9pxhkZHvU1RYhz5I';

const isLocalHost = () =>
  typeof window !== 'undefined' && window?.location?.hostname
    ? location.hostname === 'localhost' || location.hostname === '127.0.0.1'
    : '';

export const adminDomain = () => {
  return isLocalHost() ? 'http://localhost:3000' : 'https://admin.nise3.xyz';
};

export const youthDomain = () => {
  return isLocalHost() ? 'http://localhost:3002' : 'https://youth.nise3.xyz';
};

export const instituteDomain = () => {
  return isLocalHost() ? 'http://localhost:3003' : 'https://dyd.nise3.xyz';
};

export const niseDomain = () => {
  return isLocalHost() ? 'http://localhost:3001' : 'https://nise3.xyz';
};

export const industryDomain = () => {
  return isLocalHost() ? 'http://localhost:3004' : 'https://industry.nise3.xyz';
};

export const cookieDomain = () => {
  return isLocalHost() ? 'localhost' : 'nise3.xyz';
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
