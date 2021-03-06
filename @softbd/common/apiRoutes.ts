export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  ? process.env.NEXT_PUBLIC_API_BASE_URL
  : 'https://gateway.bus-staging.softbdltd.com';

export const API_PUBLIC_BACK_CHANNEL = process.env.NEXT_PUBLIC_BACK_CHANNEL_URL
  ? process.env.NEXT_PUBLIC_BACK_CHANNEL_URL
  : 'https://core.bus-staging.softbdltd.com';

export const API_SSO_AUTHORIZE_CODE_GRANT =
  API_PUBLIC_BACK_CHANNEL + '/sso-authorize-code-grant';

export const API_CDAP_AUTHORIZE_ID_TOKEN_GRANT =
  API_PUBLIC_BACK_CHANNEL + '/cdap-authorize-id-token-grant';

export const FILE_SERVER_UPLOAD_ENDPOINT = process.env
  .NEXT_PUBLIC_FILE_SERVER_UPLOAD_ENDPOINT
  ? process.env.NEXT_PUBLIC_FILE_SERVER_UPLOAD_ENDPOINT
  : 'https://file.nise3.xyz/test';

export const FILE_SERVER_FILE_VIEW_ENDPOINT = process.env
  .NEXT_PUBLIC_FILE_SERVER_FILE_VIEW_ENDPOINT
  ? process.env.NEXT_PUBLIC_FILE_SERVER_FILE_VIEW_ENDPOINT
  : 'https://file.nise.gov.bd/uploads/';

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
export const FOUR_IR_SERVICE_PATH = process.env.NEXT_PUBLIC_FOUR_IR_SERVICE_PATH
  ? process.env.NEXT_PUBLIC_FOUR_IR_SERVICE_PATH
  : '/4ir';
export const MIGRATION_PORTAL_SERVICE_PATH = process.env
  .NEXT_PUBLIC_MIGRATION_PORTAL_SERVICE_PATH
  ? process.env.NEXT_PUBLIC_MIGRATION_PORTAL_SERVICE_PATH
  : '/migration-portal';

export const INDUSTRY_ASSOCIATION_SERVICE_PATH = process.env
  .NEXT_PUBLIC_INDUSTRY_ASSOCIATION_SERVICE_PATH
  ? process.env.NEXT_PUBLIC_INDUSTRY_ASSOCIATION_SERVICE_PATH
  : '/industry-association';

export const TSP_PUBLIC_SERVICE_PATH =
  INSTITUTE_SERVICE_PATH +
  (process.env.NEXT_PUBLIC_PUBLIC_SERVICE_PATH
    ? process.env.NEXT_PUBLIC_PUBLIC_SERVICE_PATH
    : '/public');
export const MIGRATION_PORTAL_PUBLIC_SERVICE_PATH =
  MIGRATION_PORTAL_SERVICE_PATH +
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

/** Core User service public routes section start */

export const SEND_FORGET_PASSWORD_OTP = '/send-forget-password-otp';
export const VERIFY_FORGET_PASSWORD_OTP = '/verify-forget-password-otp';
export const RESET_FORGET_PASSWORD = '/reset-forget-password';

/** Core User service public routes section end */

/** Core User service private routes section start */

export const API_PERMISSION_GROUPS = CORE_SERVICE_PATH + '/permission-groups';
export const API_PERMISSION_SUB_GROUPS =
  CORE_SERVICE_PATH + '/permission-sub-groups';
export const API_ROLES = CORE_SERVICE_PATH + '/roles';
export const API_FOUR_IR_ROLES = CORE_SERVICE_PATH + '/roles-for-4IR';
export const API_PERMISSIONS = CORE_SERVICE_PATH + '/permissions';
export const API_USERS = CORE_SERVICE_PATH + '/users';
export const API_YOUTH_EXIST_CHECK = YOUTH_SERVICE_PATH + '/youth-exist-check';
export const PROFILE_UPDATE = '/profile-update';
export const UPDATE_PASSWORD = '/password-update';

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
export const API_CERTIFICATES_ISSUE =
  INSTITUTE_SERVICE_PATH + '/certificate-issued';
export const API_CERTIFICATES_ISSUE_PUBLIC =
  INSTITUTE_SERVICE_PATH + '/public/youth-certificate-issued';

export const API_COURSE_RESULT_CONFIG =
  INSTITUTE_SERVICE_PATH + '/course-result-configs';
export const API_PROCESS_RESULT = '/process-result';
export const API_BATCH_RESULT = '/results';
export const API_BATCH_PUBLISH_RESULT = '/result-publish';
export const API_YOUTH_BATCH_EXAMS_MARK_UPDATE =
  INSTITUTE_SERVICE_PATH + '/youth-batch-exams-mark-update';

//Course enrollment apis
export const API_COURSE_ENROLLMENTS =
  INSTITUTE_SERVICE_PATH + '/course-enrollments';
// TODO Remove this
// export const API_COURSE_ENROLLMENTS =
// CERTIFICATE_API_URL + '/course-enrollments';
export const API_REJECT_COURSE_ENROLLMENT =
  INSTITUTE_SERVICE_PATH + '/reject-course-enrollment';
export const API_COURSE_ENROLL = INSTITUTE_SERVICE_PATH + '/course-enroll';
export const API_COURSE_ENROLL_PAYMENT_PAY =
  INSTITUTE_SERVICE_PATH + '/course-enrollment/payment-by-ek-pay/pay-now';
export const BATCH_BY_4IR_INITIATIVE_ID =
  TSP_PUBLIC_SERVICE_PATH + '/batches-by-four-ir-initiative-id';

export const API_ASSIGN_BATCH = INSTITUTE_SERVICE_PATH + '/batch-assign';
export const API_ASSIGN_TRAINERS_TO_BATCH = '/assign-trainer-to-batch';

export const API_BATCHES_TO_ASSIGN = '/training-centers/batches';

export const COURSE_ENROLL_VERIFICATION = '/verify-sms-code';
export const COURSE_ENROLL_RESEND_VERIFICATION = '/resend-verification-code';

export const API_INSTITUTE_QUESTION_BANK =
  INSTITUTE_SERVICE_PATH + 'question-bank1';

export const API_INSTITUTE_TRAINEE_YOUTHS =
  INSTITUTE_SERVICE_PATH + '/institute_trainee_youths';
export const API_PROGRAMS = INSTITUTE_SERVICE_PATH + '/programs';

export const API_INSTITUTE_USER_REJECTION =
  INSTITUTE_SERVICE_PATH + '/institute-registration-rejection';
export const API_INSTITUTE_USER_APPROVAL =
  INSTITUTE_SERVICE_PATH + '/institute-registration-approval';
export const API_INSTITUTE_CERTIFICATION_AUTHORITY_DASHBOARD_STATICS =
  INSTITUTE_SERVICE_PATH + '/certification-authority-dashboard-statistics';
export const API_INSTITUTE_RTO_DASHBOARD_STATICS =
  INSTITUTE_SERVICE_PATH + '/rto-dashboard-statistics';
export const API_COURSE_ENROLLMENT_IMPORT =
  INSTITUTE_SERVICE_PATH + '/course-enrollment-bulk-import';

/**exam management*/
export const API_EXAM_QUESTION_BANK =
  INSTITUTE_SERVICE_PATH + '/exam-question-banks';

export const API_EXAM_SUBJECTS = INSTITUTE_SERVICE_PATH + '/exam-subjects';

export const API_EXAMS = INSTITUTE_SERVICE_PATH + '/exams';
export const API_EXAM_QUESTION_PAPER =
  INSTITUTE_SERVICE_PATH + '/exam-question-paper';
export const API_EXAM_YOUTH_LIST = INSTITUTE_SERVICE_PATH + '/exam-youth-list';
export const API_SUBMIT_EXAM_PAPER =
  INSTITUTE_SERVICE_PATH + '/submit-exam-paper';
export const API_YOUTH_EXAM_MARK_UPDATE =
  INSTITUTE_SERVICE_PATH + '/youth-exam-mark-update';

export const API_YOUTH_EXAM_RESULT_SUMMARIES =
  INSTITUTE_SERVICE_PATH + '/exam-result-summaries/';

export const API_PREVIEW_YOUTH_EXAM =
  INSTITUTE_SERVICE_PATH + '/preview-youth-exam';
export const API_EXAMS_PUBLISH = INSTITUTE_SERVICE_PATH + '/exam-publish';
export const API_BATCHES_EXAMS = '/exams';
export const API_BATCHES_YOUTH_EXAMS = '/youth-exams';
export const API_ASSIGN_EXAMS_TO_BATCH = '/assign-exams-to-batch';

/**             eRPL            */

export const API_REGISTERED_TRAINING_ORGANIZATIONS =
  INSTITUTE_SERVICE_PATH + '/registered-training-organizations';

export const API_RTO_COUNTRIES = INSTITUTE_SERVICE_PATH + '/rto-countries';
export const API_RPL_SECTORS = INSTITUTE_SERVICE_PATH + '/rpl-sectors';
export const API_RPL_OCCUPATIONS = INSTITUTE_SERVICE_PATH + '/rpl-occupations';
export const API_RPL_LEVELS = INSTITUTE_SERVICE_PATH + '/rpl-levels';
export const API_RPL_SUBJECTS = INSTITUTE_SERVICE_PATH + '/rpl-subjects';
export const API_RPL_ASSESSMENTS = INSTITUTE_SERVICE_PATH + '/rpl-assessments';
export const API_RPL_QUESTION_BANK =
  INSTITUTE_SERVICE_PATH + '/rpl-question-banks';
export const API_RPL_ASSESSMENT_QUESTIONS =
  INSTITUTE_SERVICE_PATH + '/rpl-assessment-questions';
export const API_RPL_APPLICATION = INSTITUTE_SERVICE_PATH + '/rpl-applications';
export const API_RPL_APPLICATION_POST =
  INSTITUTE_SERVICE_PATH + '/rpl-application';
export const API_RPL_ASSESSMENT_QUESTION_SETS =
  INSTITUTE_SERVICE_PATH + '/rpl-assessment-question-sets';
export const API_RPL_SELF_ASSESSMENT =
  INSTITUTE_SERVICE_PATH + '/rpl-self-assessment';
export const API_RTO_BATCH = INSTITUTE_SERVICE_PATH + '/rto-batches';
export const API_ASSESSMENT_PAYMENT_PAY =
  INSTITUTE_SERVICE_PATH +
  '/rpl-applications/payment/payment-via-ek-pay/pay-now';

/**             eRPL End         */

/**training center report start*/
export const API_TRAINING_CENTERS_REPORTING_COMBINED_PROGRESS =
  INSTITUTE_SERVICE_PATH + '/training-centers/reporting/combined-progress';

export const API_TRAINING_CENTERS_REPORTING_PROGRESS =
  INSTITUTE_SERVICE_PATH + '/training-centers/reporting/progress';

export const API_TRAINING_CENTERS_REPORTING_INCOME_EXPENDITURE =
  API_TRAINING_CENTERS + '/reporting/income-expenditure';

/**training center report end*/

/** 4IR service routes section start*/
export const API_4IR_PROJECTS = FOUR_IR_SERVICE_PATH + '/projects';
export const API_4IR_FILE_LOGS = FOUR_IR_SERVICE_PATH + '/file-logs';
export const API_4IR_GUIDELINE = FOUR_IR_SERVICE_PATH + '/guidelines';
export const API_4IR_SHOWCASE = FOUR_IR_SERVICE_PATH + '/showcasing';
export const API_4IR_INITIATIVE = FOUR_IR_SERVICE_PATH + '/initiatives';
export const API_4IR_ALL_INITIATIVE = FOUR_IR_SERVICE_PATH + '/all-initiatives';
export const API_4IR_OCCUPATIONS = FOUR_IR_SERVICE_PATH + '/4ir-occupations';
export const API_4IR_EMPLOYMENT = FOUR_IR_SERVICE_PATH + '/employments';
export const API_4IR_TAGLINES = FOUR_IR_SERVICE_PATH + '/taglines';
export const API_4IR_CELL = FOUR_IR_SERVICE_PATH + '/project-cells';
export const API_4IR_CS = FOUR_IR_SERVICE_PATH + '/initiative-cs';
export const API_4IR_SECTORS = FOUR_IR_SERVICE_PATH + '/sectors';
export const API_4IR_TNA_REPORT = FOUR_IR_SERVICE_PATH + '/tna-formats';
export const API_4IR_TEAM_MEMBERS = FOUR_IR_SERVICE_PATH + '/team-members';
export const API_4IR_CBLM = FOUR_IR_SERVICE_PATH + '/initiative-cblms';
export const API_4IR_SCALE_UP = FOUR_IR_SERVICE_PATH + '/scale-up';
export const API_4IR_PROJECT_CONTRIBUTIONS =
  FOUR_IR_SERVICE_PATH + '/contributions';
export const API_4IR_CERTIFICATE =
  FOUR_IR_SERVICE_PATH + '/get-4ir-certificate-list';

export const API_4IR_ASSESSMENT =
  FOUR_IR_SERVICE_PATH + '/get-four-ir-youth-assessment-list';
export const API_4IR_CURRICULUM =
  FOUR_IR_SERVICE_PATH + '/initiative-curriculums';
export const API_4IR_RESOURCE_MANAGEMENT =
  FOUR_IR_SERVICE_PATH + '/resource-managements';
export const API_4IR_TOT = FOUR_IR_SERVICE_PATH + '/tots';
export const API_4IR_TOT_UPDATE = FOUR_IR_SERVICE_PATH + '/tots-update';
export const API_4IR_COURSE = FOUR_IR_SERVICE_PATH + '/create-approve-courses';
export const API_4IR_PROJECT_ANALYSIS =
  FOUR_IR_SERVICE_PATH + '/project-analysis';
export const API_4IR_INITIATIVE_ANALYSIS =
  FOUR_IR_SERVICE_PATH + '/initiative-analysis';
export const API_4IR_PROJECT_TASK_UPDATE =
  FOUR_IR_SERVICE_PATH + '/four-ir-initiatives-task-update';
export const API_FOUR_IR_INITIATIVE_IMPORT =
  FOUR_IR_SERVICE_PATH + '/four-ir-initiatives-import-excel';
export const API_FOUR_IR_INITIATIVE_IMPORT_FORMAT =
  FOUR_IR_SERVICE_PATH + '/four-ir-initiatives-import-excel-format';
export const API_FOUR_IR_COURSE_APPROVE =
  FOUR_IR_SERVICE_PATH + '/approve-four-ir-course';
/** 4IR service routes section end*/

/** All institute service privates routes section end */

/** All institute service public routes section start */
export const API_PUBLIC_INSTITUTES = TSP_PUBLIC_SERVICE_PATH + '/institutes';
export const API_PUBLIC_PROGRAMS = TSP_PUBLIC_SERVICE_PATH + '/programs';
export const API_PUBLIC_INSTITUTE_DETAILS =
  TSP_PUBLIC_SERVICE_PATH + '/institute-details';
export const API_PUBLIC_COURSE_LIST = TSP_PUBLIC_SERVICE_PATH + '/course-list';
export const API_PUBLIC_COURSE_DETAILS = TSP_PUBLIC_SERVICE_PATH + '/courses';

export const API_CERTIFICATES = INSTITUTE_SERVICE_PATH + '/certificates';

export const API_PUBLIC_TRAINING_CENTERS =
  TSP_PUBLIC_SERVICE_PATH + '/training-centers';

export const API_PUBLIC_RTO_COUNTRIES =
  TSP_PUBLIC_SERVICE_PATH + '/rto-countries';
export const API_PUBLIC_RPL_SECTORS = TSP_PUBLIC_SERVICE_PATH + '/rpl-sectors';

export const API_PUBLIC_RPL_OCCUPATIONS =
  TSP_PUBLIC_SERVICE_PATH + '/rpl-occupations';

export const API_PUBLIC_RPL_ASSESSMENTS_QUESTIONS =
  TSP_PUBLIC_SERVICE_PATH + '/rpl-assessment-questions';
export const API_PUBLIC_REGISTERED_TRAINING_ORGANIZATIONS =
  TSP_PUBLIC_SERVICE_PATH + '/registered-training-organizations';
export const API_RPL_PUBLIC_LEVELS = TSP_PUBLIC_SERVICE_PATH + '/rpl-levels';
export const API_PUBLIC_RPL_APPLICATIONS =
  TSP_PUBLIC_SERVICE_PATH + '/rpl-applications';
export const API_COURSE_ENROLLMENT_BULK_IMPORT_FORMAT =
  TSP_PUBLIC_SERVICE_PATH + '/course-enrollment-bulk-import-file-format';

export const API_PUBLIC_BATCHES = TSP_PUBLIC_SERVICE_PATH + '/batches';
export const API_YOUTH_EXAM_RESULT = '/youth-exam-results';

export const API_PUBLIC_PREVIEW_YOUTH_EXAM =
  TSP_PUBLIC_SERVICE_PATH + '/preview-youth-exam';

/** All institute service public routes section end */

/** Youth service routes section start */

export const API_SKILLS = YOUTH_SERVICE_PATH + '/skills';
export const API_YOUTHS = YOUTH_SERVICE_PATH + '/youths';

export const API_YOUTH_REGISTRATION =
  YOUTH_SERVICE_PATH + '/youth-registration';
export const API_YOUTH_REGISTRATION_CDAP =
  YOUTH_SERVICE_PATH + '/cdap-youth-create';
export const API_YOUTH_REGISTRATION_VERIFICATION =
  YOUTH_SERVICE_PATH + '/youth-profile-verification';
export const API_SEND_YOUTH_REGISTRATION_VERIFICATION_CODE =
  YOUTH_SERVICE_PATH + '/youth-resend-verification-code';

export const API_YOUTH_EDUCATION_EXAMS_BOARDS_EDUGROUPS_AND_SUBJECTS =
  YOUTH_SERVICE_PATH + '/youth-educations-exam-board-edugroup-subject';
export const API_LANGUAGES = YOUTH_SERVICE_PATH + '/languages';

export const API_YOUTH_PROFILE = YOUTH_SERVICE_PATH + '/youth-profile';
export const API_YOUTH_PROFILES = YOUTH_SERVICE_PATH + '/youth-profiles';
export const API_YOUTH_FEED_DATA_LIST = YOUTH_SERVICE_PATH + '/youth-feed';
export const API_YOUTH_FREELANCE_PROFILE_STATUS_UPDATE =
  YOUTH_SERVICE_PATH + '/youth-change-freelance-status';
export const API_YOUTH_COURSES = YOUTH_SERVICE_PATH + '/youth-my-courses';
export const API_YOUTH_FEED_STATISTICS =
  YOUTH_SERVICE_PATH + '/youth-feed-statistics';

export const API_YOUTH_PERSONAL_INFO_UPDATE =
  YOUTH_SERVICE_PATH + '/youth-personal-info-update';
export const API_YOUTH_JOB_APPLICATION_INFORMATION_UPDATE =
  YOUTH_SERVICE_PATH + '/youth-career-info';
export const API_YOUTH_MY_JOBS = YOUTH_SERVICE_PATH + '/my-jobs';
export const API_YOUTH_EDUCATION = YOUTH_SERVICE_PATH + '/youth-educations';
export const API_YOUTH_JOB_EXPERIENCES =
  YOUTH_SERVICE_PATH + '/youth-job-experiences';
export const API_YOUTH_CERTIFICATES =
  YOUTH_SERVICE_PATH + '/youth-certifications';
export const API_YOUTH_PORTFOLIOS = YOUTH_SERVICE_PATH + '/youth-portfolios';
export const API_YOUTH_LANGUAGE_PROFICIENCIES =
  YOUTH_SERVICE_PATH + '/youth-languages-proficiencies';
export const API_YOUTH_UPDATE_DEFAULT_CV_TEMPLATE =
  YOUTH_SERVICE_PATH + '/youth-set-default-cv-template';
export const API_YOUTH_UPDATE_PASSWORD =
  YOUTH_SERVICE_PATH + '/youth-password-update';
export const API_YOUTH_ADDRESSES = YOUTH_SERVICE_PATH + '/youth-addresses';
export const API_YOUTH_REFERENCES = YOUTH_SERVICE_PATH + '/youth-references';
export const API_YOUTH_GUARDIANS = YOUTH_SERVICE_PATH + '/youth-guardians';
export const API_YOUTH_GUARDIANS_BY_YOUTH =
  YOUTH_SERVICE_PATH + '/youth-guardians-by-youth';

export const API_YOUTH_SETTINGS_CHANGE_USERID =
  YOUTH_SERVICE_PATH + '/settings/changeUserId';
export const API_YOUTH_SETTINGS_CHANGE_PASSWORD =
  YOUTH_SERVICE_PATH + '/settings/changePassword';

export const API_YOUTH_APPLY_JOB = YOUTH_SERVICE_PATH + '/apply-job';
export const API_YOUTH_JOB_RESPONSE = YOUTH_SERVICE_PATH + '/respond-to-job';

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
export const API_ORGANIZATION_USER_REJECTION =
  ORGANIZATION_SERVICE_PATH + '/organization-user-rejection';
export const API_ORGANIZATION_USER_APPROVAL =
  ORGANIZATION_SERVICE_PATH + '/organization-user-approval';
export const API_ORGANIZATION_PROFILE_UPDATE =
  ORGANIZATION_SERVICE_PATH + '/organization-profile-update';
export const API_ORGANIZATION_PROFILE =
  ORGANIZATION_SERVICE_PATH + '/organization-profile';
//Industry section end

//Industry Association section start

export const API_INDUSTRY_ASSOCIATION_REGISTRATION =
  ORGANIZATION_SERVICE_PATH + '/industry-association-registration';
export const API_REJECT_INDUSTRY_ASSOC_REGISTRATION =
  ORGANIZATION_SERVICE_PATH + '/industry-association-registration-rejection';

export const API_REJECT_INDUSTRY_ASSOC_MEMBERSHIP =
  ORGANIZATION_SERVICE_PATH + '/organization-user-rejection';

export const API_APPROVE_INDUSTRY_ASSOC_MEMBERSHIP =
  ORGANIZATION_SERVICE_PATH + '/organization-user-approval';

export const API_INDUSTRY_ASSOCIATION_ORGANIZATION_IMPORT =
  INDUSTRY_ASSOCIATION_SERVICE_PATH + '/organization-import-excel';

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

export const API_REJECT_HR_DEMAND_YOUTH =
  ORGANIZATION_SERVICE_PATH + '/reject-hr-demand-youth';

export const API_INDUSTRY_PUBLICATIONS =
  ORGANIZATION_SERVICE_PATH + '/publications';

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
export const API_MEMBER_JOBS =
  ORGANIZATION_SERVICE_PATH + '/jobs/industry-association-member-jobs';
export const API_JOB_ID = API_JOBS + '/job-id';

export const API_JOB_STORE_PRIMARY_INFORMATION =
  API_JOBS + '/primary-job-information';
export const API_GET_JOB_PRIMARY_INFORMATION =
  API_JOBS + '/primary-job-information/';

export const API_JOB_STORE_ADDITIONAL_INFORMATION =
  API_JOBS + '/additional-job-information';
export const API_GET_JOB_ADDITIONAL_INFORMATION =
  API_JOBS + '/additional-job-information/';

export const API_JOB_STORE_CANDIDATE_REQUIREMENTS =
  API_JOBS + '/candidate-requirements';
export const API_GET_JOB_CANDIDATE_REQUIREMENTS =
  API_JOBS + '/candidate-requirements/';

export const API_GET_JOB_CANDIDATES = API_JOBS + '/candidates/all';

export const API_GET_JOB_CANDIDATES_APPLIED_LIST =
  API_JOBS + '/candidates/applied';

export const API_JOB_STORE_COMPANY_INFO_VISIBILITY =
  API_JOBS + '/company-info-visibility';
export const API_GET_JOB_COMPANY_INFO_VISIBILITY =
  API_JOBS + '/company-info-visibility/';

export const API_JOB_STORE_MATCHING_CRITERIA = API_JOBS + '/matching-criteria';
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

export const API_INDUSTRY_ASSOCIATION_DASHBOARD_STATICS =
  ORGANIZATION_SERVICE_PATH + '/industry-association-dashboard-statistics';

export const API_JOBS_CANDIDATES = API_JOBS + '/candidates';

export const API_RECRUITMENT_STEPS = API_JOBS + '/recruitment-step';
export const API_RECRUITMENT_STEP_LISTS = API_JOBS + '/recruitment-steps/';

export const API_CANDIDATE_UPDATE = API_JOBS + '/candidate/';

export const API_CANDIDATE_STEP_SCHEDULE = API_JOBS + '/step-schedule';
export const API_CANDIDATE_SCHEDULE = API_JOBS + '/step-schedule';
export const API_SHOW_IN_LANDING_PAGE_STATUS_CHANGE =
  API_JOBS + '/show-in-landing-page-status-change';
export const API__PUBLIC_NASCIB_MEMBER_REGISTRATION =
  ORGANIZATION_SERVICE_PATH + '/public/nascib-members/open-registration';
export const API_PUBLIC_SMEF_MEMBER_REGISTRATION =
  ORGANIZATION_SERVICE_PATH + '/public/smef-members/open-registration';
export const API_PUBLIC_NASCIB_MEMBER_STATIC_DATA =
  ORGANIZATION_SERVICE_PATH + '/public/nascib-members/get-static-data';

export const API_PUBLIC_SMEF_MEMBER_STATIC_DATA =
  ORGANIZATION_SERVICE_PATH + '/public/smef-members/get-static-data';
export const API_PUBLIC_NASCIB_MEMBER_REGISTRATION_PAYMENT_PAGE =
  ORGANIZATION_SERVICE_PATH +
  '/public/nascib-members/payment/pay-via-ssl/pay-now';

//Industry Association section end

/** Industry and Industry Association service private routes section end */

/** Industry and Industry Association service public routes section start */

export const API_PUBLIC_OCCUPATIONS =
  ORGANIZATION_SERVICE_PUBLIC_PATH + '/occupations';
export const API_PUBLIC_JOB_SECTORS =
  ORGANIZATION_SERVICE_PUBLIC_PATH + '/job-sectors';

export const API_PUBLIC_ORGANIZATIONS =
  ORGANIZATION_SERVICE_PUBLIC_PATH + '/organizations';

export const API_PUBLIC_ORGANIZATION_TYPES =
  ORGANIZATION_SERVICE_PUBLIC_PATH + '/organization-types';

export const API_PUBLIC_JOBS = ORGANIZATION_SERVICE_PUBLIC_PATH + '/jobs';
export const API_PUBLIC_JOB_DETAILS =
  ORGANIZATION_SERVICE_PUBLIC_PATH + '/job-details';

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
export const API_UNIONS = CMS_SERVICE_PATH + '/unions';
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
export const API_NISE_PUBLICATIONS = CMS_SERVICE_PATH + '/publications';

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
export const API_PUBLIC_RECENT_ACTIVITIES_COLLAGES =
  CMS_SERVICE_PUBLIC_PATH + '/recent-activities-collages';
export const API_PUBLIC_PARTNERS = CMS_SERVICE_PUBLIC_PATH + '/nise3-partners';
export const API_PUBLIC_CALENDAR_EVENTS =
  CMS_SERVICE_PUBLIC_PATH + '/calender-events';
export const API_PUBLIC_FAQ = CMS_SERVICE_PUBLIC_PATH + '/faqs';
export const API_PUBLIC_SLIDERS = CMS_SERVICE_PUBLIC_PATH + '/sliders';
export const API_PUBLIC_STATIC_PAGE_BLOCKS =
  CMS_SERVICE_PUBLIC_PATH + '/static-page-blocks/';
export const API_PUBLIC_VISITOR_FEEDBACKS =
  CMS_SERVICE_PUBLIC_PATH + '/visitor-feedback-suggestions';
export const API_PUBLIC_NISE_STATICS =
  CMS_SERVICE_PUBLIC_PATH + '/nise-statistics';
export const API_PUBLIC_PUBLICATIONS =
  CMS_SERVICE_PUBLIC_PATH + '/publications';

/** CMS service public routes section end */

/** Migration Portal API Routes*/
