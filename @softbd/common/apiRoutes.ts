export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  ? process.env.NEXT_PUBLIC_API_BASE_URL
  : 'https://gateway.bus-staging.softbdltd.com';

/*export const FILE_SERVER_UPLOAD_ENDPOINT = process.env
  .NEXT_PUBLIC_FILE_SERVER_UPLOAD_ENDPOINT
  ? process.env.NEXT_PUBLIC_FILE_SERVER_UPLOAD_ENDPOINT
  : 'https://file.nise3.xyz/test';*/

export const FILE_SERVER_FILE_VIEW_ENDPOINT = process.env
  .NEXT_PUBLIC_FILE_SERVER_FILE_VIEW_ENDPOINT
  ? process.env.NEXT_PUBLIC_FILE_SERVER_FILE_VIEW_ENDPOINT
  : 'https://file.nise3.xyz/uploads/';

export const FILE_SERVER_FILE_DELETE_ENDPOINT = process.env
  .NEXT_PUBLIC_FILE_SERVER_FILE_DELETE_ENDPOINT
  ? process.env.NEXT_PUBLIC_FILE_SERVER_FILE_DELETE_ENDPOINT
  : 'https://file.nise3.xyz/test';

export const CORE_SERVICE_PATH = process.env.NEXT_PUBLIC_CORE_SERVICE_PATH
  ? process.env.NEXT_PUBLIC_CORE_SERVICE_PATH
  : '/core';
export const ORGANIZATION_SERVICE_PATH = process.env
  .NEXT_PUBLIC_INDUSTRY_SERVICE_PATH
  ? process.env.NEXT_PUBLIC_INDUSTRY_SERVICE_PATH
  : '/org';
export const INSTITUTE_SERVICE_PATH = process.env.NEXT_PUBLIC_TSP_SERVICE_PATH
  ? process.env.NEXT_PUBLIC_TSP_SERVICE_PATH
  : '/institute';
export const YOUTH_SERVICE_PATH = process.env.NEXT_PUBLIC_YOUTH_SERVICE_PATH
  ? process.env.NEXT_PUBLIC_YOUTH_SERVICE_PATH
  : '/youth';
export const CMS_SERVICE_PATH = process.env.NEXT_PUBLIC_CMS_SERVICE_PATH
  ? process.env.NEXT_PUBLIC_CMS_SERVICE_PATH
  : '/cms';

export const INDUSTRY_ASSOCIATION_SERVICE_PATH = process.env
  .NEXT_PUBLIC_INDUSTRY_ASSOCIATION_SERVICE_PATH
  ? process.env.NEXT_PUBLIC_INDUSTRY_ASSOCIATION_SERVICE_PATH
  : '/industry-association';

export const TSP_PUBLIC_SERVICE_PATH =
  INSTITUTE_SERVICE_PATH +
  (process.env.NEXT_PUBLIC_PUBLIC_SERVICE_PATH
    ? process.env.NEXT_PUBLIC_PUBLIC_SERVICE_PATH
    : '/public');
export const CMS_SERVICE_PUBLIC_PATH =
  CMS_SERVICE_PATH +
  (process.env.NEXT_PUBLIC_PUBLIC_SERVICE_PATH
    ? process.env.NEXT_PUBLIC_PUBLIC_SERVICE_PATH
    : '/public');
export const ORGANIZATION_SERVICE_PUBLIC_PATH =
  ORGANIZATION_SERVICE_PATH +
  (process.env.NEXT_PUBLIC_PUBLIC_SERVICE_PATH
    ? process.env.NEXT_PUBLIC_PUBLIC_SERVICE_PATH
    : '/public');

export const INSTITUTE_SERVICE_DASHBOARD_STATS_PATH =
  INSTITUTE_SERVICE_PATH +
  (process.env.NEXT_PUBLIC_TSP_DASHBOARD_STAT_PATH
    ? process.env.NEXT_PUBLIC_TSP_DASHBOARD_STAT_PATH
    : '/institute-dashboard-statistics');

export const INSTITUTE_SERVICE_PUBLIC_DASHBOARD_STATS_PATH =
  TSP_PUBLIC_SERVICE_PATH + '/institute-dashboard-statistics';

export const INSTITUTE_SERVICE_DASHBOARD_DEMANDED_COURSE =
  INSTITUTE_SERVICE_PATH +
  (process.env.NEXT_PUBLIC_TSP_DASHBOARD_DEMANDED_COURSE_PATH
    ? process.env.NEXT_PUBLIC_TSP_DASHBOARD_DEMANDED_COURSE_PATH
    : '/demanded-courses');

/** Core User service private routes section start */

export const API_PERMISSION_GROUPS = CORE_SERVICE_PATH + '/permission-groups';
export const API_PERMISSION_SUB_GROUPS =
  CORE_SERVICE_PATH + '/permission-sub-groups';
export const API_ROLES = CORE_SERVICE_PATH + '/roles';
export const API_PERMISSIONS = CORE_SERVICE_PATH + '/permissions';
export const API_USERS = CORE_SERVICE_PATH + '/users';
export const PROFILE_UPDATE = '/profile-update';

/** Core User service private routes section end */

/** All institute service private routes section start */
export const API_INSTITUTE_REGISTRATION =
  INSTITUTE_SERVICE_PATH + '/institute-open-registration';
export const API_INSTITUTES = INSTITUTE_SERVICE_PATH + '/institutes';
export const API_INSTITUTE_PROFILE =
  INSTITUTE_SERVICE_PATH + '/institute-profile';

export const API_INSTITUTE_PROFILE_UPDATE =
  INSTITUTE_SERVICE_PATH + '/institute-profile-update';

export const API_BRANCHES = INSTITUTE_SERVICE_PATH + '/branches';
export const API_PROGRAMMES = INSTITUTE_SERVICE_PATH + '/programs';
export const API_TRAINING_CENTERS =
  INSTITUTE_SERVICE_PATH + '/training-centers';
export const API_COURSES = INSTITUTE_SERVICE_PATH + '/courses';
export const API_BATCHES = INSTITUTE_SERVICE_PATH + '/batches';
export const API_TRAINERS = INSTITUTE_SERVICE_PATH + '/trainers';

//Course enrollment apis
export const API_COURSE_ENROLLMENTS =
  INSTITUTE_SERVICE_PATH + '/course-enrollments';
export const API_REJECT_COURSE_ENROLLMENT =
  INSTITUTE_SERVICE_PATH + '/reject-course-enrollment';
export const API_COURSE_ENROLL = INSTITUTE_SERVICE_PATH + '/course-enroll';
export const API_COURSE_ENROLL_PAYMENT_PAY =
  INSTITUTE_SERVICE_PATH + '/payment/pay-now';

export const API_ASSIGN_BATCH = INSTITUTE_SERVICE_PATH + '/batch-assign';
export const COURSE_ENROLL_VERIFICATION = '/verify-sms-code';
export const COURSE_ENROLL_RESEND_VERIFICATION = '/resend-verification-code';

export const API_INSTITUTE_QUESTION_BANK =
  INSTITUTE_SERVICE_PATH + 'question-bank';

export const API_INSTITUTE_TRAINEE_YOUTHS =
  INSTITUTE_SERVICE_PATH + '/institute_trainee_youths';

/** All institute service privates routes section end */

/** All institute service public routes section start */
export const API_PUBLIC_INSTITUTES = TSP_PUBLIC_SERVICE_PATH + '/institutes';
export const API_PUBLIC_PROGRAMS = TSP_PUBLIC_SERVICE_PATH + '/programs';
export const API_PUBLIC_INSTITUTE_DETAILS =
  TSP_PUBLIC_SERVICE_PATH + '/institute-details';
export const API_PUBLIC_COURSE_LIST = TSP_PUBLIC_SERVICE_PATH + '/course-list';
export const API_PUBLIC_COURSE_DETAILS = TSP_PUBLIC_SERVICE_PATH + '/courses';
export const API_PUBLIC_TRAINING_CENTERS =
  TSP_PUBLIC_SERVICE_PATH + '/training-centers';

/** All institute service public routes section end */

/** Youth service routes section start */

export const API_SKILLS = YOUTH_SERVICE_PATH + '/skills';
export const API_YOUTHS = YOUTH_SERVICE_PATH + '/youths';

export const API_YOUTH_REGISTRATION =
  YOUTH_SERVICE_PATH + '/youth-registration';
export const API_YOUTH_REGISTRATION_VERIFICATION =
  YOUTH_SERVICE_PATH + '/youth-profile-verification';
export const API_SEND_YOUTH_REGISTRATION_VERIFICATION_CODE =
  YOUTH_SERVICE_PATH + '/youth-resend-verification-code';

export const API_YOUTH_EDUCATION_EXAMS_BOARDS_EDUGROUPS_AND_SUBJECTS =
  YOUTH_SERVICE_PATH + '/youth-educations-exam-board-edugroup-subject';
export const API_LANGUAGES = YOUTH_SERVICE_PATH + '/languages';

export const API_YOUTH_PROFILE = YOUTH_SERVICE_PATH + '/youth-profile';
export const API_YOUTH_FREELANCE_PROFILE_STATUS_UPDATE =
  YOUTH_SERVICE_PATH + '/youth-change-freelance-status';
export const API_YOUTH_COURSES = YOUTH_SERVICE_PATH + '/youth-my-courses';
export const API_YOUTH_FEED_STATISTICS =
  YOUTH_SERVICE_PATH + '/youth-feed-statistics';

export const API_YOUTH_PERSONAL_INFO_UPDATE =
  YOUTH_SERVICE_PATH + '/youth-personal-info-update';
export const API_YOUTH_EDUCATION = YOUTH_SERVICE_PATH + '/youth-educations';
export const API_YOUTH_JOB_EXPERIENCES =
  YOUTH_SERVICE_PATH + '/youth-job-experiences';
export const API_YOUTH_CERTIFICATES =
  YOUTH_SERVICE_PATH + '/youth-certifications';
export const API_YOUTH_PORTFOLIOS = YOUTH_SERVICE_PATH + '/youth-portfolios';
export const API_YOUTH_LANGUAGE_PROFICIENCIES =
  YOUTH_SERVICE_PATH + '/youth-languages-proficiencies';
export const API_YOUTH_ADDRESSES = YOUTH_SERVICE_PATH + '/youth-addresses';
export const API_YOUTH_REFERENCES = YOUTH_SERVICE_PATH + '/youth-references';
export const API_YOUTH_GUARDIANS = YOUTH_SERVICE_PATH + '/youth-guardians';

export const API_YOUTH_SETTINGS_CHANGE_USERID =
  YOUTH_SERVICE_PATH + '/settings/changeUserId';
export const API_YOUTH_SETTINGS_CHANGE_PASSWORD =
  YOUTH_SERVICE_PATH + '/settings/changePassword';

export const API_YOUTH_APPLY_JOB = YOUTH_SERVICE_PATH + '/apply-job';

/** Youth service routes section end */

/** Industry and Industry Association service private routes section start */

//Industry section start
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

//Industry section end

//Industry Association section start

export const API_INDUSTRY_ASSOCIATION_REGISTRATION =
  ORGANIZATION_SERVICE_PATH + '/industry-association-registration';
export const API_REJECT_INDUSTRY_ASSOC_REGISTRATION =
  ORGANIZATION_SERVICE_PATH + '/industry-association-registration-rejection';

export const API_REJECT_INDUSTRY_ASSOC_MEMBERSHIP =
  ORGANIZATION_SERVICE_PATH + '/industry-association-membership-rejection';

export const API_APPROVE_INDUSTRY_ASSOC_MEMBERSHIP =
  ORGANIZATION_SERVICE_PATH + '/industry-association-membership-approval';

export const API_APPROVE_INDUSTRY_ASSOC_REGISTRATION =
  ORGANIZATION_SERVICE_PATH + '/industry-association-registration-approval';

export const API_HUMAN_RESOURCE_DEMAND =
  ORGANIZATION_SERVICE_PATH + '/hr-demands';
export const API_JOB_REQUIREMENTS =
  ORGANIZATION_SERVICE_PATH + '/job-requirements';
export const API_HR_DEMAND_INSTITUTE_PROVIDED_YOUTH_LIST =
  ORGANIZATION_SERVICE_PATH + '/hr-demand-youths';

export const API_REJECT_HR_DEMAND_BY_INDUSTRY_ASSOCIATION =
  ORGANIZATION_SERVICE_PATH + '/hr-demand-rejected-by-industry-association';

export const API_APPROVE_HR_DEMAND_BY_INDUSTRY_ASSOCIATION =
  ORGANIZATION_SERVICE_PATH + '/hr-demand-approved-by-industry-association';

export const API_INDUSTRY_PUBLICATIONS =
  ORGANIZATION_SERVICE_PATH + '/publications';

export const API_INDUSTRY_MEMBERS = ORGANIZATION_SERVICE_PATH + '/members';

export const API_INDUSTRY_ASSOCIATIONS =
  ORGANIZATION_SERVICE_PATH + '/industry-associations';

export const API_ASSOCIATION_TRADES = ORGANIZATION_SERVICE_PATH + '/trades';
export const API_INDUSTRY_ASSOCIATION_TRADES =
  ORGANIZATION_SERVICE_PATH + '/trades';
export const API_INDUSTRY_ASSOCIATION_SUB_TRADES =
  ORGANIZATION_SERVICE_PATH + '/sub-trades';

export const API_INDUSTRY_ASSOCIATION_PROFILE =
  ORGANIZATION_SERVICE_PATH + '/industry-association-profile';

export const API_INDUSTRY_ASSOCIATION_PROFILE_UPDATE =
  ORGANIZATION_SERVICE_PATH + '/industry-association-profile-update';

export const API_INDUSTRY_ASSOCIATION_CONTACT_INFO =
  ORGANIZATION_SERVICE_PATH + '/contact-info';

export const API_INDUSTRY_ASSOCIATION_MEMBERS =
  ORGANIZATION_SERVICE_PATH + '/industry-association-members';

export const API_JOBS = ORGANIZATION_SERVICE_PATH + '/jobs';
export const API_JOB_ID = API_JOBS + '/job-id';

export const API_JOB_STORE_PRIMARY_INFORMATION =
  API_JOBS + '/store-primary-job-information';
export const API_GET_JOB_PRIMARY_INFORMATION =
  API_JOBS + '/primary-job-information/';

export const API_JOB_STORE_ADDITIONAL_INFORMATION =
  API_JOBS + '/store-additional-job-information';
export const API_GET_JOB_ADDITIONAL_INFORMATION =
  API_JOBS + '/additional-job-information/';

export const API_JOB_STORE_CANDIDATE_REQUIREMENTS =
  API_JOBS + '/store-candidate-requirements';
export const API_GET_JOB_CANDIDATE_REQUIREMENTS =
  API_JOBS + '/candidate-requirements/';

export const API_GET_JOB_CANDIDATES = API_JOBS + '/candidates/all';

export const API_JOB_STORE_COMPANY_INFO_VISIBILITY =
  API_JOBS + '/store-company-info-visibility';
export const API_GET_JOB_COMPANY_INFO_VISIBILITY =
  API_JOBS + '/company-info-visibility/';

export const API_JOB_STORE_MATCHING_CRITERIA =
  API_JOBS + '/store-matching-criteria';
export const API_GET_JOB_MATCHING_CRITERIA = API_JOBS + '/matching-criteria/';

export const API_JOB_STORE_CONTACT_INFORMATION =
  API_JOBS + '/contact-information';
export const API_GET_JOB_CONTACT_INFORMATION =
  API_JOBS + '/contact-information/';

export const API_GET_JOB_PREVIEW = API_JOBS + '/job-preview/';

export const API_GET_JOB_LOCATIONS = API_JOBS + '/job-location';
export const API_GET_EDUCATIONAL_INSTITUTES =
  ORGANIZATION_SERVICE_PATH + '/educational-institutions';

export const API_GET_BUSINESS_AREAS =
  ORGANIZATION_SERVICE_PATH + '/area-of-business';

export const API_GET_EXPERIENCE_AREAS =
  ORGANIZATION_SERVICE_PATH + '/suggestions/area-of-experiences';

export const API_PUBLIC_GET_EXPERIENCE_AREAS =
  ORGANIZATION_SERVICE_PATH + '/public/area-of-experiences';

export const API_PUBLIC_GET_BUSINESS_AREAS =
  ORGANIZATION_SERVICE_PATH + '/public/area-of-business';

export const API_GET_EDUCATION_LEVELS =
  ORGANIZATION_SERVICE_PATH + '/suggestions/education-levels';

export const API_GET_EXAM_DEGREES =
  ORGANIZATION_SERVICE_PATH + '/suggestions/exam-degrees';

export const API_INDUSTRY_ASSOCIATION_JOB_REQUIREMENT =
  ORGANIZATION_SERVICE_PATH + '/industry-association-hr-demands';

export const API_INSTITUTE_HUMAN_RESOURCE_DEMANDS =
  ORGANIZATION_SERVICE_PATH + '/hr-demands';

export const API_HUMAN_RESOURCE_DEMAND_LIST =
  ORGANIZATION_SERVICE_PATH + '/hr-demand';

export const API_HUMAN_RESOURCE_DEMAND_APPROVED_BY_INSTITUTE =
  ORGANIZATION_SERVICE_PATH + '/hr-demand-approved-by-institute';

export const API_HUMAN_RESOURCE_DEMAND_REJECTED_BY_INSTITUTE =
  ORGANIZATION_SERVICE_PATH + '/hr-demand-rejected-by-institute';

export const API_PUBLIC_JOB_DETAILS =
  ORGANIZATION_SERVICE_PUBLIC_PATH + '/job-details';

//Industry Association section end

/** Industry and Industry Association service private routes section end */

/** Industry and Industry Association service public routes section end */

export const API_PUBLIC_OCCUPATIONS =
  ORGANIZATION_SERVICE_PUBLIC_PATH + '/occupations';
export const API_PUBLIC_JOB_SECTORS =
  ORGANIZATION_SERVICE_PUBLIC_PATH + '/job-sectors';

export const API_PUBLIC_ORGANIZATIONS =
  ORGANIZATION_SERVICE_PUBLIC_PATH + '/organizations';

export const API_PUBLIC_JOBS = ORGANIZATION_SERVICE_PUBLIC_PATH + '/jobs';

export const API_PUBLIC_INDUSTRY_ASSOCIATION_MEMBER_LIST =
  ORGANIZATION_SERVICE_PUBLIC_PATH + '/industry-association-members';

export const API_PUBLIC_INDUSTRY_ASSOCIATION_CONTACT_INFO =
  ORGANIZATION_SERVICE_PUBLIC_PATH + '/contact-info';
export const API_PUBLIC_INDUSTRY_PUBLICATIONS =
  ORGANIZATION_SERVICE_PUBLIC_PATH + '/publications';
export const API_PUBLIC_INDUSTRY_ASSOC_DETAILS =
  ORGANIZATION_SERVICE_PUBLIC_PATH + '/industry-association-details';

/** Industry and Industry Association service public routes section end */

/** CMS service routes section start */
export const API_DIVISIONS = CMS_SERVICE_PATH + '/divisions';
export const API_DISTRICTS = CMS_SERVICE_PATH + '/districts';
export const API_UPAZILAS = CMS_SERVICE_PATH + '/upazilas';
export const API_COUNTRIES = CMS_SERVICE_PATH + '/countries';

export const API_GALLERY_ALBUMS = CMS_SERVICE_PATH + '/gallery-albums';
export const API_GALLERY_ALBUM_CONTENTS =
  CMS_SERVICE_PATH + '/gallery-images-videos';
export const API_RECENT_ACTIVITIES = CMS_SERVICE_PATH + '/recent-activities';
export const API_NOTICE_OR_NEWSES = CMS_SERVICE_PATH + '/notice-or-news';
export const API_FAQS = CMS_SERVICE_PATH + '/faqs';
export const API_PARTNERS = CMS_SERVICE_PATH + '/nise3-partners';
export const API_CMS_GLOBAL_CONFIG = CMS_SERVICE_PATH + '/cms-global-config';
export const API_SLIDERS = CMS_SERVICE_PATH + '/sliders';
export const API_BANNERS = CMS_SERVICE_PATH + '/banners';
export const API_VISITOR_FEEDBACKS =
  CMS_SERVICE_PATH + '/visitor-feedback-suggestions';
export const API_STATIC_PAGE_TYPES = CMS_SERVICE_PATH + '/static-page-types';
export const API_STATIC_PAGE_BLOCKS = CMS_SERVICE_PATH + '/static-page-blocks/';
export const API_CALENDAR_EVENTS = CMS_SERVICE_PATH + '/calender-events';

/** CMS service routes section end */

/** CMS service public routes section start */
export const API_PUBLIC_GALLERY_ALBUMS =
  CMS_SERVICE_PUBLIC_PATH + '/gallery-albums';
export const API_PUBLIC_GALLERY_ALBUM_CONTENTS =
  CMS_SERVICE_PUBLIC_PATH + '/gallery-images-videos';
export const API_PUBLIC_NOTICE_OR_NEWS =
  CMS_SERVICE_PUBLIC_PATH + '/notice-or-news';
export const API_PUBLIC_RECENT_ACTIVITIES =
  CMS_SERVICE_PUBLIC_PATH + '/recent-activities';
export const API_PUBLIC_PARTNERS = CMS_SERVICE_PUBLIC_PATH + '/nise3-partners';
export const API_PUBLIC_CALENDAR_EVENTS =
  CMS_SERVICE_PUBLIC_PATH + '/calender-events';
export const API_PUBLIC_FAQ = CMS_SERVICE_PUBLIC_PATH + '/faqs';
export const API_PUBLIC_SLIDERS = CMS_SERVICE_PUBLIC_PATH + '/sliders';
export const API_PUBLIC_STATIC_PAGE_BLOCKS =
  CMS_SERVICE_PUBLIC_PATH + '/static-page-blocks/';

/** CMS service public routes section end */
