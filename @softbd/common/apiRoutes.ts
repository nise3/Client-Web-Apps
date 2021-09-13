export const API_BASE_URL = 'https://gateway.bus.softbd.xyz';
export const CORE_SERVICE_PATH = '/core';
export const ORGANIZATION_SERVICE_PATH = '/org';
export const INSTITUTE_SERVICE_PATH = '/institute';

export const API_DIVISIONS = CORE_SERVICE_PATH + '/divisions';
export const API_DISTRICTS = CORE_SERVICE_PATH + '/districts';
export const API_UPAZILAS = CORE_SERVICE_PATH + '/upazilas';

export const API_OCCUPATIONS = ORGANIZATION_SERVICE_PATH + '/occupations';
export const API_JOB_SECTORS = ORGANIZATION_SERVICE_PATH + '/job-sectors';
export const API_ORGANIZATION_TYPES =
  ORGANIZATION_SERVICE_PATH + '/organization-types';
export const API_ORGANIZATIONS = ORGANIZATION_SERVICE_PATH + '/organizations';
export const API_ORGANIZATION_UNIT_TYPES =
  ORGANIZATION_SERVICE_PATH + '/organization-unit-types';
export const API_ORGANIZATION_UNITS =
  ORGANIZATION_SERVICE_PATH + '/organization-units';

export const API_ORGANIZATION_SERVICES =
  ORGANIZATION_SERVICE_PATH + '/services';
export const API_HUMAN_RESOURCES =
  ORGANIZATION_SERVICE_PATH + '/human-resources';

export const API_RANKS = ORGANIZATION_SERVICE_PATH + '/ranks';

export const API_ORGANIZATION_UNITS_HIERARCHY = (
  organizationUnitId: number,
) => {
  return API_ORGANIZATION_UNITS + '/' + organizationUnitId + '/get-hierarchy';
};
