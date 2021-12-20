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
          {
            id: 'cv_list',
            title: 'CV List',
            messageId: 'common.cv_list',
            permissionKey: 'view_any_cv_list',
            type: 'item',
            icon: 'person',
            url: '/cv-lists',
          },
          {
            id: 'profile',
            title: 'Profile',
            messageId: 'common.profile',
            permissionKey: 'view_any_profile',
            type: 'item',
            icon: 'person',
            url: '/profile',
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
            id: 'organization_profile',
            title: 'organization profile',
            messageId: 'common.profile',
            permissionKey: 'view_any_organization_profile',
            type: 'item',
            icon: 'timeline',
            url: '/organization-profile',
          },
          {
            id: 'rank_types',
            title: 'Rank Type',
            messageId: 'menu.rank_type',
            permissionKey: 'view_any_rank_type',
            type: 'item',
            icon: 'business',
            url: '/rank-types',
          },
          {
            id: 'rank',
            title: 'Rank',
            messageId: 'menu.rank',
            permissionKey: 'view_any_rank',
            type: 'item',
            icon: 'business',
            url: '/ranks',
          },
          {
            id: 'skill',
            title: 'Skill',
            messageId: 'menu.skill',
            permissionKey: 'view_any_skill',
            type: 'item',
            icon: 'business',
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
            permissionKey: 'view_any_occupations',
            type: 'item',
            icon: 'timeline',
            url: '/occupations',
          },
          {
            id: 'services',
            title: 'services',
            messageId: 'menu.services',
            permissionKey: 'view_any_services',
            type: 'item',
            icon: 'timeline',
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
            icon: 'timeline',
            url: '/institutes',
          },
          {
            id: 'profile',
            title: 'Institute-Profile',
            messageId: 'menu.profile',
            permissionKey: 'view_institute_profile',
            type: 'item',
            icon: 'timeline',
            url: '/institute-profile',
          },
          {
            id: 'branch',
            title: 'Branch',
            messageId: 'branch.label',
            permissionKey: 'view_any_branch',
            type: 'item',
            icon: 'timeline',
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
            icon: 'timeline',
            url: '/training-centers',
          },
          {
            id: 'course',
            title: 'Course',
            messageId: 'course.label',
            permissionKey: 'view_any_course',
            type: 'item',
            icon: 'timeline',
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
            icon: 'timeline',
            url: '/trainers',
          },
          {
            id: 'application-management',
            title: 'application-management',
            messageId: 'applicationManagement.label',
            permissionKey: 'view_any_application',
            type: 'item',
            icon: 'timeline',
            url: '/application-management',
          },
        ],
      },
      {
        id: 'industry_association_management',
        title: 'Industry Association Management',
        messageId: 'menu.industry_association_management',
        type: 'collapse',
        icon: 'room',
        children: [
          /*          {
            id: 'industry_association',
            title: 'Industry Association',
            messageId: 'menu.industry_association_management',
            permissionKey: 'view_any_industry_association',
            type: 'item',
            icon: 'timeline',
            url: '/industry-association',
          },*/

          {
            id: 'member-list',
            title: 'Member List',
            messageId: 'common.member_list',
            permissionKey: 'view_association_member_list',
            type: 'item',
            icon: 'timeline',
            url: '/member-management',
          },
          {
            id: 'publications',
            title: 'Publications',
            messageId: 'menu.publications',
            permissionKey: 'view_any_publication',
            type: 'item',
            icon: 'timeline',
            url: '/publications',
          },
          {
            id: 'job-applicant-list',
            title: 'Job Applicant List',
            messageId: 'applicant.label',
            permissionKey: 'view_any_job_applicant',
            type: 'item',
            icon: 'timeline',
            url: '/applicant-list',
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
        icon: 'room',
        children: [
          {
            id: 'faqs',
            title: 'FAQs',
            messageId: 'menu.faq',
            permissionKey: 'view_any_faq',
            type: 'item',
            icon: 'room',
            url: '/faqs',
          },
          {
            id: 'static_page',
            title: 'Static Page',
            messageId: 'common.static_page',
            permissionKey: 'view_any_static_page',
            type: 'item',
            icon: 'room',
            url: '/static-pages',
          },
          {
            id: 'gallery_albums',
            title: 'Gallery Album',
            messageId: 'menu.gallery_album',
            permissionKey: 'view_any_gallery_album',
            type: 'item',
            icon: 'room',
            url: '/gallery-albums',
          },
          {
            id: 'gallery_album-contents',
            title: 'Gallery Album Content',
            messageId: 'menu.gallery_album_content',
            permissionKey: 'view_any_gallery_album_content',
            type: 'item',
            icon: 'room',
            url: '/gallery-album-contents',
          },
          {
            id: 'gallery_image_video',
            title: 'Gallery Image Video',
            messageId: 'menu.gallery_image_video',
            permissionKey: 'view_any_gallery_image_video',
            type: 'item',
            icon: 'room',
            url: '/gallery-image-video',
          },
          {
            id: 'visitor_feedback',
            title: 'Visitor Feedback',
            messageId: 'menu.visitor_feedback',
            permissionKey: 'view_any_visitor_feedback',
            type: 'item',
            icon: 'room',
            url: '/visitor-feedbacks',
          },
          {
            id: 'notices_and_news',
            title: 'Notices And News',
            messageId: 'menu.notices_and_news',
            permissionKey: 'view_any_notices_and_news',
            type: 'item',
            icon: 'room',
            url: '/notices-news',
          },
          {
            id: 'nise3_partners',
            title: 'NISE3 Partners',
            messageId: 'menu.nise3_partners',
            permissionKey: 'view_any_nise3_partners',
            type: 'item',
            icon: 'room',
            url: '/nise3-partners',
          },
          {
            id: 'recent_activities',
            title: 'Recent Activities',
            messageId: 'menu.recent_activities',
            permissionKey: 'view_any_recent_activities',
            type: 'item',
            icon: 'room',
            url: '/recent-activities',
          },
          {
            id: 'events',
            title: 'Events',
            messageId: 'menu.events',
            permissionKey: 'view_any_events',
            type: 'item',
            icon: 'room',
            url: '/events',
          },
          {
            id: 'slider',
            title: 'Sliders',
            messageId: 'menu.sliders',
            permissionKey: 'view_any_slider',
            type: 'item',
            icon: 'room',
            url: '/sliders',
          },
          {
            id: 'banner',
            title: 'Banners',
            messageId: 'menu.slider_banners',
            permissionKey: 'view_any_banner',
            type: 'item',
            icon: 'room',
            url: '/slider-banners',
          },
          {
            id: 'calendar',
            title: 'Calendar',
            messageId: 'menu.calendar',
            permissionKey: 'view_any_calender',
            type: 'item',
            icon: 'room',
            url: '/events',
          },
        ],
      },
    ],
  },
];
export default routesConfig;
