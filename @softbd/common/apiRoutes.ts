export const API_BASE_URL = 'https://gateway.bus-staging.softbdltd.com';
export const CORE_SERVICE_PATH = '/core';
export const ORGANIZATION_SERVICE_PATH = '/org';
export const INSTITUTE_SERVICE_PATH = '/institute';
export const YOUTH_SERVICE_PATH = '/youth';

export const API_DIVISIONS = CORE_SERVICE_PATH + '/divisions';
export const API_DISTRICTS = CORE_SERVICE_PATH + '/districts';
export const API_UPAZILAS = CORE_SERVICE_PATH + '/upazilas';
export const API_PERMISSION_GROUPS = CORE_SERVICE_PATH + '/permission-groups';
export const API_PERMISSION_SUB_GROUPS =
  CORE_SERVICE_PATH + '/permission-sub-groups';

export const API_ROLES = CORE_SERVICE_PATH + '/roles';
export const API_PERMISSIONS = CORE_SERVICE_PATH + '/permissions';
export const API_USERS = CORE_SERVICE_PATH + '/users';

export const API_OCCUPATIONS = ORGANIZATION_SERVICE_PATH + '/occupations';
export const API_JOB_SECTORS = ORGANIZATION_SERVICE_PATH + '/job-sectors';
export const API_ORGANIZATION_TYPES =
  ORGANIZATION_SERVICE_PATH + '/organization-types';
export const API_ORGANIZATIONS = ORGANIZATION_SERVICE_PATH + '/organizations';
export const API_ORGANIZATION_UNIT_TYPES =
  ORGANIZATION_SERVICE_PATH + '/organization-unit-types';
export const API_ORGANIZATION_UNITS =
  ORGANIZATION_SERVICE_PATH + '/organization-units';
export const API_ORGANIZATION_REGISTRATION =
  ORGANIZATION_SERVICE_PATH + '/organization-registration';

export const API_ORGANIZATION_SERVICES =
  ORGANIZATION_SERVICE_PATH + '/services';
export const API_HUMAN_RESOURCES =
  ORGANIZATION_SERVICE_PATH + '/human-resources';

export const API_HUMAN_RESOURCE_TEMPLATES =
  ORGANIZATION_SERVICE_PATH + '/human-resource-templates';

export const API_ORGANIZATION_UNIT_HIERARCHY = (organizationUnitId: number) => {
  return API_ORGANIZATION_UNITS + '/' + organizationUnitId + '/get-hierarchy';
};

export const API_RANK_TYPES = ORGANIZATION_SERVICE_PATH + '/rank-types';
export const API_RANKS = ORGANIZATION_SERVICE_PATH + '/ranks';
export const API_SKILLS = ORGANIZATION_SERVICE_PATH + '/skills';

export const API_INSTITUTES = INSTITUTE_SERVICE_PATH + '/institutes';
export const API_BRANCHES = INSTITUTE_SERVICE_PATH + '/branches';
export const API_PROGRAMMES = INSTITUTE_SERVICE_PATH + '/programmes';
export const API_TRAINING_CENTERS =
  INSTITUTE_SERVICE_PATH + '/training-centers';
export const API_COURSES = INSTITUTE_SERVICE_PATH + '/courses';
export const API_BATCHES = INSTITUTE_SERVICE_PATH + '/batches';
export const API_TRAINERS = INSTITUTE_SERVICE_PATH + '/trainers';

export const API_YOUTH_REGISTRATION =
  YOUTH_SERVICE_PATH + '/youth-registration';
export const API_YOUTH_SKILLS = YOUTH_SERVICE_PATH + '/skills';
export const API_YOUTH_PROFILE = YOUTH_SERVICE_PATH + '/youth-profile';
export const API_YOUTH_PERSONAL_INFO_UPDATE =
  YOUTH_SERVICE_PATH + '/youth-personal-info-update';
export const API_YOUTH_EDUCATION = YOUTH_SERVICE_PATH + '/youth-educations';
export const API_YOUTH_EDUCATION_EXAMS_BOARDS_EDUGROUPS_AND_SUBJECTS =
  YOUTH_SERVICE_PATH + '/youth-educations-exam-board-edugroup-subject';
export const API_YOUTH_JOB_EXPERIENCES =
  YOUTH_SERVICE_PATH + '/youth-job-experiences';
export const API_YOUTH_CERTIFICATES =
  YOUTH_SERVICE_PATH + '/youth-certifications';

export const API_YOUTH_REFERENCES = YOUTH_SERVICE_PATH + '/youth-references';
export const API_YOUTH_SETTINGS_CHANGE_USERID =
  YOUTH_SERVICE_PATH + '/settings/changeUserId';
export const API_YOUTH_SETTINGS_CHANGE_PASSWORD =
  YOUTH_SERVICE_PATH + '/settings/changePassword';

export const API_YOUTH_PORTFOLIOS = YOUTH_SERVICE_PATH + '/youth-portfolios';
export const API_YOUTH_LANGUAGE_PROFICIENCIES =
  YOUTH_SERVICE_PATH + '/youth-languages-proficiencies';
export const API_YOUTH_FREELANCE_PROFILE_STATUS_UPDATE =
  YOUTH_SERVICE_PATH + '/youth-change-freelance-status';

export const API_FRONT_END_GALLERY_LIST = INSTITUTE_SERVICE_PATH + '/galleries';
