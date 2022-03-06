export interface NavItemProps {
  id: string;
  messageId: string;
  title: string;
  icon?: string;
  exact?: boolean;
  url?: string;
  as?: string;
  type?: string;
  count?: number;
  color?: string;
  auth?: string[];
  permissionKey?: string;
  children?: NavItemProps[] | NavItemProps;
}

const routesConfig: NavItemProps[] = [
  {
    id: 'pages',
    title: 'Pages',
    messageId: 'menu.pages',
    type: 'group',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        messageId: 'menu.dashboard',
        type: 'item',
        icon: 'dashboard',
        url: '/',
      },
      {
        id: 'user_management',
        title: 'User Management',
        messageId: 'menu.user_management',
        type: 'collapse',
        icon: 'people',
        children: [
          {
            id: 'permission_group',
            title: 'Permission Group',
            messageId: 'menu.permission_group',
            permissionKey: 'view_any_permission_group',
            type: 'item',
            icon: 'person',
            url: '/permission-groups',
          },
          {
            id: 'permission',
            title: 'Permission',
            messageId: 'menu.permission',
            permissionKey: 'view_any_permission',
            type: 'item',
            icon: 'person',
            url: '/permissions',
          },
          {
            id: 'permission_sub_group',
            title: 'Permission Group',
            messageId: 'menu.permission_sub_group',
            permissionKey: 'view_any_permission_sub_group',
            type: 'item',
            icon: 'person',
            url: '/permission-sub-groups',
          },
          {
            id: 'roles',
            title: 'Role',
            messageId: 'menu.role',
            permissionKey: 'view_any_role',
            type: 'item',
            icon: 'person',
            url: '/roles',
          },
          {
            id: 'users',
            title: 'User',
            messageId: 'menu.user',
            permissionKey: 'view_any_user',
            type: 'item',
            icon: 'person',
            url: '/users',
          },
        ],
      },
      {
        id: 'organization_management',
        title: 'Organization Management',
        messageId: 'menu.organization_management',
        type: 'collapse',
        icon: 'room',
        children: [
          {
            id: 'rank_types',
            title: 'Rank Type',
            messageId: 'menu.rank_type',
            permissionKey: 'view_any_rank_type',
            type: 'item',
            icon: 'star',
            url: '/rank-types',
          },
          {
            id: 'rank',
            title: 'Rank',
            messageId: 'menu.rank',
            permissionKey: 'view_any_rank',
            type: 'item',
            icon: 'star',
            url: '/ranks',
          },
          {
            id: 'skill',
            title: 'Skill',
            messageId: 'menu.skill',
            permissionKey: 'view_any_skill',
            type: 'item',
            icon: 'engineering',
            url: '/skills',
          },
          {
            id: 'organization_type',
            title: 'Organization Type',
            messageId: 'menu.organization_type',
            permissionKey: 'view_any_organization_type',
            type: 'item',
            icon: 'business',
            url: '/organization-types',
          },
          {
            id: 'organization',
            title: 'Organizations',
            messageId: 'organization.label',
            permissionKey: 'view_any_organization',
            type: 'item',
            icon: 'businessCenter',
            url: '/organizations',
          },
          {
            id: 'organization_unit_type',
            title: 'Organization Unit Type',
            messageId: 'menu.organization_unit_type',
            permissionKey: 'view_any_organization_unit_type',
            type: 'item',
            icon: 'businessCenter',
            url: '/organization-unit-types',
          },
          {
            id: 'organization_unit',
            title: 'Organization Unit',
            messageId: 'menu.organization_unit',
            permissionKey: 'view_any_organization_unit',
            type: 'item',
            icon: 'businessCenter',
            url: '/organization-units',
          },
          {
            id: 'job-sectors',
            title: 'Job Sector',
            messageId: 'menu.job_sector',
            permissionKey: 'view_any_job_sector',
            type: 'item',
            icon: 'work',
            url: '/job-sectors',
          },
          {
            id: 'occupations',
            title: 'Occupations',
            messageId: 'menu.occupations',
            permissionKey: 'view_any_occupation',
            type: 'item',
            icon: 'work',
            url: '/occupations',
          },
          {
            id: 'services',
            title: 'services',
            messageId: 'menu.services',
            permissionKey: 'view_any_service',
            type: 'item',
            icon: 'build',
            url: '/services',
          },
        ],
      },

      {
        id: 'institute_management',
        title: 'Institutes Management',
        messageId: 'menu.institute_management',
        type: 'collapse',
        icon: 'room',
        children: [
          {
            id: 'timeline',
            title: 'Institute',
            messageId: 'menu.institute',
            permissionKey: 'view_any_institute',
            type: 'item',
            icon: 'business',
            url: '/institutes',
          },
          {
            id: 'branch',
            title: 'Branch',
            messageId: 'branch.label',
            permissionKey: 'view_any_branch',
            type: 'item',
            icon: 'business',
            url: '/branches',
          },
          {
            id: 'programme',
            title: 'Programme',
            messageId: 'programme.label',
            permissionKey: 'view_any_program',
            type: 'item',
            icon: 'timeline',
            url: '/programmes',
          },
          {
            id: 'training_center',
            title: 'Training Center',
            messageId: 'menu.training_center',
            permissionKey: 'view_any_training_center',
            type: 'item',
            icon: 'business',
            url: '/training-centers',
          },
          {
            id: 'course',
            title: 'Course',
            messageId: 'course.label',
            permissionKey: 'view_any_course',
            type: 'item',
            icon: 'grading',
            url: '/courses',
          },
          {
            id: 'batch',
            title: 'Batch',
            messageId: 'menu.batch',
            permissionKey: 'view_any_batch',
            type: 'item',
            icon: 'timeline',
            url: '/batches',
          },
          {
            id: 'trainers',
            title: '',
            messageId: 'menu.trainers',
            permissionKey: 'view_any_trainer',
            type: 'item',
            icon: 'group',
            url: '/trainers',
          },
          {
            id: 'application-management',
            title: 'application-management',
            messageId: 'applicationManagement.label',
            permissionKey: 'view_any_course_enrollment',
            type: 'item',
            icon: 'timeline',
            url: '/application-management',
          },
          {
            id: 'hr_demand',
            title: 'HR Demand',
            messageId: 'hr_demand.label',
            permissionKey: 'view_any_institute_hr_demand',
            type: 'item',
            icon: 'person',
            url: '/hr-demand',
          },
          {
            id: 'question-bank1',
            title: 'question-bank1',
            messageId: 'common.question_bank',
            permissionKey: 'view_any_question_bank1',
            type: 'item',
            icon: 'timeline',
            url: '/question-bank1',
          },
        ],
      },
      {
        id: 'certificate_authority',
        title: 'Certificate Authority',
        messageId: 'certificate_authority.management',
        type: 'collapse',
        icon: 'room',
        children: [
          {
            id: 'certificate-authority',
            title: 'Certificate Authority',
            messageId: 'certificate_authority.label',
            permissionKey: 'view_any_certificate_authority',
            type: 'item',
            icon: 'business',
            url: '/certificate-authorities',
          },
          {
            id: 'rto',
            title: 'RTO',
            messageId: 'rto.label',
            permissionKey: 'view_any_rto',
            type: 'item',
            icon: 'home',
            url: '/rto',
          },
          {
            id: 'rpl-sectors',
            title: 'RPL',
            messageId: 'rpl_sector.label',
            permissionKey: 'view_any_rpl_sector',
            type: 'item',
            icon: 'home',
            url: '/rpl-sectors',
          },
          {
            id: 'rpl-occupation',
            title: 'RPL Occupation',
            messageId: 'rpl_occupation.label',
            permissionKey: 'view_any_rpl_occupation',
            type: 'item',
            icon: 'home',
            url: '/rpl-occupations',
          },
          {
            id: 'rpl-levels',
            title: 'RPL Level',
            messageId: 'rpl_level.label',
            permissionKey: 'view_any_rpl_level',
            type: 'item',
            icon: 'stairs',
            url: '/rpl-levels',
          },
          {
            id: 'rto-countries',
            title: 'RTO Countries',
            messageId: 'rto-country.label',
            permissionKey: 'view_any_rto_country',
            type: 'item',
            icon: 'flag',
            url: '/rto-countries',
          },
          {
            id: 'rto-batches',
            title: 'RTO Batches',
            messageId: 'rto_batch.label',
            permissionKey: 'view_any_rto_batch',
            type: 'item',
            icon: 'flag',
            url: '/rto-batches',
          },
          {
            id: 'subjects',
            title: 'Subjects',
            messageId: 'subject.label',
            permissionKey: 'view_any_subject',
            type: 'item',
            icon: 'flag',
            url: '/subjects',
          },
          {
            id: 'assessments',
            title: 'Assessments',
            messageId: 'assessment.label',
            permissionKey: 'view_any_assessment',
            type: 'item',
            icon: 'flag',
            url: '/assessments',
          },
          {
            id: 'question_bank',
            title: 'Question Bank',
            messageId: 'question-bank.label',
            permissionKey: 'view_any_question_bank',
            type: 'item',
            icon: 'help',
            url: '/question-banks',
          },
          {
            id: 'ca_assigned_batches',
            title: 'CA Assigned Batches',
            messageId: 'certificate_authority.batch',
            permissionKey: 'view_any_ca_assigned_batches',
            type: 'item',
            icon: 'flag',
            url: '/ca-assigned-batches',
          },
        ],
      },
      {
        id: 'industry_association_management',
        title: 'Industry Association Management',
        messageId: 'menu.industry_association_management',
        type: 'collapse',
        icon: 'construction',
        children: [
          {
            id: 'industry_association',
            title: 'Industry Association',
            messageId: 'menu.industry_associations',
            permissionKey: 'view_any_industry_association',
            type: 'item',
            icon: 'list',
            url: '/industry-association',
          },
          {
            id: 'member-list',
            title: 'Member List',
            messageId: 'common.member_list',
            permissionKey: 'view_any_industry_association_member',
            type: 'item',
            icon: 'list',
            url: '/member-management',
          },

          {
            id: 'publications',
            title: 'Publications',
            messageId: 'menu.publications',
            permissionKey: 'view_any_publication',
            type: 'item',
            icon: 'book',
            url: '/publications',
          },
          {
            id: 'job-applicant-list',
            title: 'Job Applicant List',
            messageId: 'applicant.label',
            permissionKey: 'view_any_job_applicant',
            type: 'item',
            icon: 'person',
            url: '/applicant-list',
          },
          {
            id: 'industry-association-member-jobs',
            title: 'Industry Association Member Jobs',
            messageId: 'industry_association_member_job.label',
            permissionKey: 'view_any_industry_association_member_job',
            type: 'item',
            icon: 'work',
            url: '/industry-association-member-jobs',
          },
          {
            id: 'jobs',
            title: 'Jobs',
            messageId: 'menu.jobs',
            permissionKey: 'view_any_job',
            type: 'item',
            icon: 'work',
            url: '/jobs',
          },
          {
            id: 'contact-info',
            title: 'contact-info',
            messageId: 'common.contact_office',
            permissionKey: 'view_any_contact_info',
            type: 'item',
            icon: 'business',
            url: '/contact-info',
          },
        ],
      },
      {
        id: 'location',
        title: 'Location',
        messageId: 'menu.location',
        type: 'collapse',
        icon: 'room',
        children: [
          {
            id: 'division',
            title: 'Division',
            messageId: 'menu.division',
            permissionKey: 'view_any_division',
            type: 'item',
            icon: 'room',
            url: '/divisions',
          },
          {
            id: 'district',
            title: 'District',
            messageId: 'menu.district',
            permissionKey: 'view_any_district',
            type: 'item',
            icon: 'room',
            url: '/districts',
          },
          {
            id: 'upazila',
            title: 'Upazila',
            messageId: 'menu.upazila',
            permissionKey: 'view_any_upazila',
            type: 'item',
            icon: 'room',
            url: '/upazilas',
          },
        ],
      },
      {
        id: 'cms',
        title: 'CMS',
        messageId: 'cms.label',
        type: 'collapse',
        icon: 'source',
        children: [
          {
            id: 'faqs',
            title: 'FAQs',
            messageId: 'menu.faq',
            permissionKey: 'view_any_faq',
            type: 'item',
            icon: 'help',
            url: '/faqs',
          },
          {
            id: 'static_page',
            title: 'Static Page',
            messageId: 'common.static_page',
            permissionKey: 'view_any_static_page_content_or_page_block',
            type: 'item',
            icon: 'feed',
            url: '/static-pages',
          },
          {
            id: 'gallery_albums',
            title: 'Gallery Album',
            messageId: 'menu.gallery_album',
            permissionKey: 'view_any_gallery_album',
            type: 'item',
            icon: 'collections',
            url: '/gallery-albums',
          },
          {
            id: 'gallery_album-contents',
            title: 'Gallery Album Content',
            messageId: 'menu.gallery_album_content',
            permissionKey: 'view_any_gallery_image_video',
            type: 'item',
            icon: 'collections',
            url: '/gallery-album-contents',
          },
          {
            id: 'visitor_feedback',
            title: 'Visitor Feedback',
            messageId: 'menu.visitor_feedback',
            permissionKey: 'view_any_visitor_feedback_suggestion',
            type: 'item',
            icon: 'feedback',
            url: '/visitor-feedbacks',
          },
          {
            id: 'notices_and_news',
            title: 'Notices And News',
            messageId: 'menu.notices_and_news',
            permissionKey: 'view_any_notice_or_news',
            type: 'item',
            icon: 'feed',
            url: '/notices-news',
          },
          {
            id: 'nise3_partners',
            title: 'NISE Partners',
            messageId: 'menu.nise3_partners',
            permissionKey: 'view_any_nise3_partner',
            type: 'item',
            icon: 'group',
            url: '/nise3-partners',
          },
          {
            id: 'recent_activities',
            title: 'Recent Activities',
            messageId: 'menu.recent_activities',
            permissionKey: 'view_any_recent_activity',
            type: 'item',
            icon: 'collections',
            url: '/recent-activities',
          },
          {
            id: 'slider',
            title: 'Sliders',
            messageId: 'menu.sliders',
            permissionKey: 'view_any_slider',
            type: 'item',
            icon: 'collections',
            url: '/sliders',
          },
          {
            id: 'banner',
            title: 'Banners',
            messageId: 'menu.slider_banners',
            permissionKey: 'view_any_banner',
            type: 'item',
            icon: 'collections',
            url: '/slider-banners',
          },
          {
            id: 'calendar',
            title: 'Calendar',
            messageId: 'menu.calendar',
            permissionKey: 'view_any_calender_event',
            type: 'item',
            icon: 'event',
            url: '/events',
          },
        ],
      },
      {
        id: 'hr_demand',
        title: 'HR Demand',
        messageId: 'common.human_resource',
        type: 'collapse',
        icon: 'person',
        children: [
          {
            id: 'job_requirements',
            title: 'Job requirement',
            messageId: 'job_requirement.label',
            permissionKey: 'view_any_industry_association_hr_demand',
            type: 'item',
            icon: 'work',
            url: '/job-requirement',
          },
        ],
      },
      {
        id: 'cv_bank',
        title: 'CV Bank',
        messageId: 'common.cv_bank',
        permissionKey: 'view_any_cv_bank',
        type: 'item',
        icon: 'feed',
        url: '/cv-bank',
      },
    ],
  },
];
export default routesConfig;
