export const API_BASE_URL = 'https://gateway.bus-staging.softbdltd.com';
export const CORE_SERVICE_PATH = '/core';
export const ORGANIZATION_SERVICE_PATH = '/org';
export const INSTITUTE_SERVICE_PATH = '/institute';
export const YOUTH_SERVICE_PATH = '/youth';
export const CMS_SERVICE_PATH = '/cms';
export const PUBLIC_SERVICE_PATH = INSTITUTE_SERVICE_PATH + '/public';

export const API_DIVISIONS = CMS_SERVICE_PATH + '/divisions';
export const API_DISTRICTS = CMS_SERVICE_PATH + '/districts';
export const API_UPAZILAS = CMS_SERVICE_PATH + '/upazilas';
export const API_COUNTRIES = CMS_SERVICE_PATH + '/countries';
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
export const API_SKILLS = YOUTH_SERVICE_PATH + '/skills';

export const API_INSTITUTE_REGISTRATION =
  INSTITUTE_SERVICE_PATH + '/institute-open-registration';
export const API_INSTITUTES = INSTITUTE_SERVICE_PATH + '/institutes';
export const API_BRANCHES = INSTITUTE_SERVICE_PATH + '/branches';
export const API_PROGRAMMES = INSTITUTE_SERVICE_PATH + '/programs';
export const API_TRAINING_CENTERS =
  INSTITUTE_SERVICE_PATH + '/training-centers';
export const API_COURSES = INSTITUTE_SERVICE_PATH + '/courses';
export const API_COURSE_DETAILS = INSTITUTE_SERVICE_PATH + '/public/courses';
export const API_BATCHES = INSTITUTE_SERVICE_PATH + '/batches';
export const API_TRAINERS = INSTITUTE_SERVICE_PATH + '/trainers';
export const API_YOUTH_COURSES = YOUTH_SERVICE_PATH + '/youth-my-courses';

/** Youths end-points */
export const API_YOUTH_REGISTRATION =
  YOUTH_SERVICE_PATH + '/youth-registration';
export const API_YOUTH_REGISTRATION_VERIFICATION =
  YOUTH_SERVICE_PATH + '/youth-profile-verification';
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
export const API_YOUTH_LIST = YOUTH_SERVICE_PATH + '/youths';

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

/** Youth guardians */
export const API_YOUTH_GUARDIANS = YOUTH_SERVICE_PATH + '/youth-guardians';
export const API_YOUTH_GUARDIANS_LIST = YOUTH_SERVICE_PATH + '/youth-guardians';

export const API_YOUTH_SKILLS = YOUTH_SERVICE_PATH + '/skills';

/** Routes for gallery page map */
export const API_FRONT_END_GALLERY_LIST = INSTITUTE_SERVICE_PATH + '/galleries';
export const API_FRONT_END_GALLERY_CATEGORY_LIST =
  INSTITUTE_SERVICE_PATH + '/gallery-category';

/** Routes for video page map */
export const API_FRONT_END_VIDEOS_LIST = INSTITUTE_SERVICE_PATH + '/videos';
export const API_FRONT_END_VIDEOS_CATEGORY_LIST =
  INSTITUTE_SERVICE_PATH + '/video-categories';

/** Routes for contact page map */
export const API_FONT_END_CONTACT_MAP = API_INSTITUTES + '/contact';

/** Routes for APPLICATION_MANAGEMENT in dashboard/application-management */
export const API_COURSE_ENROLLMENTS =
  INSTITUTE_SERVICE_PATH + '/course-enrollments';
export const API_REJECT_COURSE_ENROLLMENT =
  INSTITUTE_SERVICE_PATH + '/reject-course-enrollment';
export const API_COURSE_ENROLL = INSTITUTE_SERVICE_PATH + '/course-enroll';

/** Routes for recent-activities page */
export const API_FRONT_END_RECENT_ACTIVITY_LIST =
  INSTITUTE_SERVICE_PATH + '/recent-activities';
export const API_FRONT_END_ALL_ACTIVITY_LIST =
  INSTITUTE_SERVICE_PATH + '/all-activities';

export const API_FRONT_END_RECENT_ACTIVITY_DETAIL =
  INSTITUTE_SERVICE_PATH + '/recent-activity-details';

/** Routes for faq page */
export const API_FRONT_END_FAQ = INSTITUTE_SERVICE_PATH + '/faq';

/** Routes for faq page */
export const API_FRONT_SC = '/sc';

export const API_ASSIGN_BATCH = INSTITUTE_SERVICE_PATH + '/batch-assign';

export const API_PUBLIC_COURSE_LIST = PUBLIC_SERVICE_PATH + '/course-list/';
export const API_PUBLIC_ALL_COURSE_LIST = PUBLIC_SERVICE_PATH + '/course-list';
export const API_PUBLIC_TRAINING_CENTERS =
  PUBLIC_SERVICE_PATH + '/training-centers';
export const API_PUBLIC_PROGRAMS = PUBLIC_SERVICE_PATH + '/programs';
export const API_YOUTH_FEED_STATISTICS =
  YOUTH_SERVICE_PATH + '/youth-feed-statistics';

export const API_NOTICE_BOARD = '/notice-board/';
