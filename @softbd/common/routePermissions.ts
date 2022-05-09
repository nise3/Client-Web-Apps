export const routePermissions: any = {
  '/permission-groups': {
    routePrefix: '/permission-groups',
    permissionKeys: ['view_any_permission_group'],
  },
  '/permissions': {
    routePrefix: '/permissions',
    permissionKeys: ['view_any_permission'],
  },
  '/permission-sub-groups': {
    routePrefix: '/permission-sub-groups',
    permissionKeys: ['view_any_permission_sub_group'],
  },
  '/roles': {
    routePrefix: '/roles',
    permissionKeys: ['view_any_role'],
  },
  '/users': {
    routePrefix: '/users',
    permissionKeys: ['view_any_user'],
  },
  '/organization-profile': {
    routePrefix: '/organization-profile',
    permissionKeys: ['view_organization_profile'],
  },
  '/rank-types': {
    routePrefix: '/rank-types',
    permissionKeys: ['view_any_rank_type'],
  },
  '/ranks': {
    routePrefix: '/ranks',
    permissionKeys: ['view_any_rank'],
  },
  '/skills': {
    routePrefix: '/skills',
    permissionKeys: ['view_any_skill'],
  },
  '/organization-types': {
    routePrefix: '/organization-types',
    permissionKeys: ['view_any_organization_type'],
  },
  '/organizations': {
    routePrefix: '/organizations',
    permissionKeys: ['view_any_organization'],
  },
  '/organization-unit-types': {
    routePrefix: '/organization-unit-types',
    permissionKeys: ['view_any_organization_unit_type'],
  },
  '/organization-units': {
    routePrefix: '/organization-units',
    permissionKeys: ['view_any_organization_unit'],
  },
  '/job-sectors': {
    routePrefix: '/job-sectors',
    permissionKeys: ['view_any_job_sector'],
  },
  '/occupations': {
    routePrefix: '/occupations',
    permissionKeys: ['view_any_occupation'],
  },
  '/services': {
    routePrefix: '/services',
    permissionKeys: ['view_any_service'],
  },
  '/institute-profile': {
    routePrefix: '/institute-profile',
    permissionKeys: ['view_institute_profile'],
  },
  '/institutes': {
    routePrefix: '/institutes',
    permissionKeys: ['view_any_institute'],
  },
  '/branches': {
    routePrefix: '/branches',
    permissionKeys: ['view_any_branch'],
  },
  '/programmes': {
    routePrefix: '/programmes',
    permissionKeys: ['view_any_program'],
  },
  '/training-centers': {
    routePrefix: '/training-centers',
    permissionKeys: ['view_any_training_center'],
  },
  //todo: hiding on demand(not necessary)
  // '/skill-development-report': {
  //   routePrefix: '/skill-development-report',
  //   permissionKeys: ['view_any_training_center_report'],
  // },
  // '/skill-development-report-create': {
  //   routePrefix: '/skill-development-report-create',
  //   permissionKeys: ['view_any_training_center_report'],
  // },
  '/training-center-reports/monthly-progress-report': {
    routePrefix: '/training-center-reports/monthly-progress-report',
    permissionKeys: ['view_any_training_center_report'],
  },
  '/training-center-reports/monthly-progress-report/create': {
    routePrefix: '/training-center-reports/monthly-progress-report/create',
    permissionKeys: ['view_any_training_center_report'],
  },
  '/training-center-reports/combined-progress-report': {
    routePrefix: '/training-center-reports/combined-progress-report',
    permissionKeys: ['view_any_training_center_report'],
  },
  '/training-center-reports/combined-progress-report/create': {
    routePrefix: '/training-center-reports/combined-progress-report/create',
    permissionKeys: ['view_any_training_center_report'],
  },
  '/training-center-reports/income-expenditure-report': {
    routePrefix: '/training-center-reports/income-expenditure-report',
    permissionKeys: ['view_any_training_center_report'],
  },
  '/training-center-reports/income-expenditure-report/create': {
    routePrefix: '/training-center-reports/income-expenditure-report/create',
    permissionKeys: ['view_any_training_center_report'],
  },
  '/courses': {
    routePrefix: '/courses',
    permissionKeys: ['view_any_course'],
  },
  '/batches': {
    routePrefix: '/batches',
    permissionKeys: ['view_any_batch'],
  },
  '/trainers': {
    routePrefix: '/trainers',
    permissionKeys: ['view_any_trainer'],
  },
  '/application-management': {
    routePrefix: '/application-management',
    permissionKeys: ['view_any_course_enrollment'],
  },
  '/rpl-assessment-management': {
    routePrefix: '/rpl-assessment-management',
    permissionKeys: ['view_any_rpl_application'],
  },
  '/hr-demand': {
    routePrefix: '/hr-demand',
    permissionKeys: ['view_any_institute_hr_demand'],
  },
  '/association-profile': {
    routePrefix: '/association-profile',
    permissionKeys: ['view_any_association_profile'],
  },
  '/industry-association': {
    routePrefix: '/industry-association',
    permissionKeys: ['view_any_industry_association'],
  },
  '/member-management': {
    routePrefix: '/member-management',
    permissionKeys: ['view_any_industry_association_member'],
  },
  '/publications': {
    routePrefix: '/publications',
    permissionKeys: ['view_any_publication'],
  },
  '/applicant-list': {
    routePrefix: '/applicant-list',
    permissionKeys: ['view_any_job_applicant'],
  },
  '/jobs': {
    routePrefix: '/jobs',
    permissionKeys: ['view_any_job'],
  },
  '/contact-info': {
    routePrefix: '/contact-info',
    permissionKeys: ['view_any_contact_info'],
  },
  '/divisions': {
    routePrefix: '/divisions',
    permissionKeys: ['view_any_division'],
  },
  '/districts': {
    routePrefix: '/districts',
    permissionKeys: ['view_any_district'],
  },
  '/upazilas': {
    routePrefix: '/upazilas',
    permissionKeys: ['view_any_upazila'],
  },
  '/faqs': {
    routePrefix: '/faqs',
    permissionKeys: ['view_any_faq'],
  },
  '/static-pages': {
    routePrefix: '/static-pages',
    permissionKeys: ['view_any_static_page_content_or_page_block'],
  },
  '/gallery-albums': {
    routePrefix: '/gallery-albums',
    permissionKeys: ['view_any_gallery_album'],
  },
  '/gallery-album-contents': {
    routePrefix: '/gallery-album-contents',
    permissionKeys: ['view_any_gallery_image_video'],
  },
  '/visitor-feedbacks': {
    routePrefix: '/visitor-feedbacks',
    permissionKeys: ['view_any_visitor_feedback_suggestion'],
  },
  '/notices-news': {
    routePrefix: '/notices-news',
    permissionKeys: ['view_any_notice_or_news'],
  },
  '/nise3-partners': {
    routePrefix: '/nise3-partners',
    permissionKeys: ['view_any_nise3_partner'],
  },
  '/recent-activities': {
    routePrefix: '/recent-activities',
    permissionKeys: ['view_any_recent_activity'],
  },
  '/sliders': {
    routePrefix: '/sliders',
    permissionKeys: ['view_any_slider'],
  },
  '/slider-banners': {
    routePrefix: '/slider-banners',
    permissionKeys: ['view_any_banner'],
  },
  '/events': {
    routePrefix: '/events',
    permissionKeys: ['view_any_calender_event'],
  },
  '/job-requirement': {
    routePrefix: '/job-requirement',
    permissionKeys: [
      'view_any_industry_association_hr_demand',
      'view_any_organization_hr_demand',
    ],
  },
  '/cv-bank': {
    routePrefix: '/cv-bank',
    permissionKeys: ['view_any_cv_bank'],
  },
  '/rto-countries': {
    routePrefix: '/rto-countries',
    permissionKeys: ['view_any_rto_country'],
  },
  '/rto-batches': {
    routePrefix: '/rto-batches',
    permissionKeys: ['view_any_rto_batch'],
  },
  '/certificate-authorities': {
    routePrefix: '/certificate-authorities',
    permissionKeys: ['view_any_certificate_authority'],
  },
  '/rto': {
    routePrefix: '/rto',
    permissionKeys: ['view_any_registered_training_organization'],
  },
  '/country': {
    routePrefix: '/country',
    permissionKeys: ['view_any_country'],
  },
  '/rpl-sectors': {
    routePrefix: '/rpl-sectors',
    permissionKeys: ['view_any_rpl_sector'],
  },
  '/industry-association-member-jobs': {
    routePrefix: '/industry-association-member-jobs',
    permissionKeys: ['view_any_industry_association_member_job'],
  },
  '/nise-publication': {
    routePrefix: '/nise-publication',
    permissionKeys: ['view_any_nise_publication'],
  },
  '/rpl-occupations': {
    routePrefix: '/rpl-occupations',
    permissionKeys: ['view_any_rpl_occupation'],
  },
  '/rpl-subjects': {
    routePrefix: '/rpl-subjects',
    permissionKeys: ['view_any_rpl_subject'],
  },
  '/rpl-levels': {
    routePrefix: '/rpl-levels',
    permissionKeys: ['view_any_rpl_level'],
  },
  '/rpl-assessments': {
    routePrefix: '/rpl-assessments',
    permissionKeys: ['view_any_rpl_assessment'],
  },
  '/rpl-question-banks': {
    routePrefix: '/rpl-question-banks',
    permissionKeys: ['view_any_rpl_question_bank'],
  },
  '/rpl-batches': {
    routePrefix: '/rpl-batches',
    permissionKeys: ['view_any_rpl_batch'],
  },
  '/rpl-assessment-question-sets': {
    routePrefix: '/rpl-assessment-question-sets',
    permissionKeys: ['view_any_rpl_assessment_question_set'],
  },

  '/certificates': {
    routePrefix: '/certificate',
    permissionKeys: ['view_any_certificate_authority'],
  },
  '/certificate': {
    routePrefix: '/certificate',
    permissionKeys: ['view_any_certificate_authority'],
  },
  '/certificate-issued': {
    routePrefix: '/certificate-issued',
    permissionKeys: ['view_any_certificate_authority'],
  },
};
