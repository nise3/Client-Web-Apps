export const APP_TITLE = 'NISE TMS';

export const PERMISSION_GROUP_ORGANIZATION_KEY = 'organization';
export const PERMISSION_GROUP_INSTITUTE_KEY = 'institute';
export const PERMISSION_GROUP_INDUSTRY_ASSOCIATION_KEY = 'industry-association';
export const HIERARCHY_NODE_ID_PREFIX_STRING = 'm';
export const GOOGLE_MAP_API_KEY = 'AIzaSyCUacnvu4F1i4DXD_o9pxhkZHvU1RYhz5I';

export const isLocalHost = () =>
  typeof window !== 'undefined' && window?.location?.hostname
    ? location.hostname === 'localhost' || location.hostname === '127.0.0.1'
    : '';


export const adminDomain = () => {
  return isLocalHost() ? 'http://localhost:3000' : (process.env.NEXT_PUBLIC_FRONTEND_ADMIN_PORTAL_DOMAIN ? process.env.NEXT_PUBLIC_FRONTEND_ADMIN_PORTAL_DOMAIN : 'https://admin.nise.gov.bd');
};

export const youthDomain = () => {
  return isLocalHost() ? 'http://localhost:3002' : (process.env.NEXT_PUBLIC_FRONTEND_YOUTH_DOMAIN ? process.env.NEXT_PUBLIC_FRONTEND_YOUTH_DOMAIN : 'https://youth.nise.gov.bd');
};

export const instituteDomain = () => {
  return isLocalHost() ? 'http://localhost:3003' : (process.env.NEXT_PUBLIC_FRONTEND_DEFAULT_TSP_DOMAIN ? process.env.NEXT_PUBLIC_FRONTEND_DEFAULT_TSP_DOMAIN : 'https://dyd.nise.gov.bd');
};

export const industryDomain = () => {
  return isLocalHost()
    ? 'http://localhost:3004'
    : (process.env.NEXT_PUBLIC_FRONTEND_DEFAULT_INDUSTRY_ASSO_DOMAIN ? process.env.NEXT_PUBLIC_FRONTEND_DEFAULT_INDUSTRY_ASSO_DOMAIN : 'https://mcci.nise.gov.bd');
};

export const niseDomain = () => {
  return isLocalHost() ? 'http://localhost:3001' : (process.env.NEXT_PUBLIC_FRONTEND_PORTAL_DOMAIN ? process.env.NEXT_PUBLIC_FRONTEND_PORTAL_DOMAIN : 'https://nise.gov.bd');
};

export const cookieDomain = () => {
  return isLocalHost() ? 'localhost' : (process.env.NEXT_PUBLIC_NISE_COOKIE_DOMAIN ? process.env.NEXT_PUBLIC_NISE_COOKIE_DOMAIN : 'nise.gov.bd');
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
