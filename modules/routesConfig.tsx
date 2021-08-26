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
  children?: NavItemProps[] | NavItemProps;
}

const routesConfig: NavItemProps[] = [
  {
    id: 'app',
    title: 'Application',
    messageId: 'menu.application',
    type: 'group',
    children: [
      {
        id: 'dashboards',
        title: 'Dashboards',
        messageId: 'menu.dashboard',
        icon: 'dashboard',
        type: 'item',
        url: '/dashboard',
      },
    ],
  },
  {
    id: 'pages',
    title: 'Pages',
    messageId: 'menu.pages',
    type: 'group',
    children: [
      {
        id: 'timeline',
        title: 'Institute',
        messageId: 'menu.institute',
        type: 'item',
        icon: 'timeline',
        url: '/dashboard/institutes',
      },
      {
        id: 'organization_type',
        title: 'Organization Type',
        messageId: 'menu.organization_type',
        type: 'item',
        icon: 'business',
        url: '/dashboard/organization-types',
      },
      {
        id: 'organization',
        title: 'Organizations',
        messageId: 'menu.organization',
        type: 'item',
        icon: 'businessCenter',
        url: '/dashboard/organizations',
      },
      {
        id: 'job-sectors',
        title: 'Job Sector',
        messageId: 'menu.job_sector',
        type: 'item',
        icon: 'work',
        url: '/dashboard/job-sectors',
      },
      {
        id: 'occupations',
        title: 'Occupations',
        messageId: 'menu.occupations',
        type: 'item',
        icon: 'timeline',
        url: '/dashboard/occupations',
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
            type: 'item',
            icon: 'room',
            url: '/dashboard/divisions',
          },
          {
            id: 'district',
            title: 'District',
            messageId: 'menu.district',
            type: 'item',
            icon: 'room',
            url: '/dashboard/districts',
          },
          {
            id: 'upazila',
            title: 'Upazila',
            messageId: 'menu.upazila',
            type: 'item',
            icon: 'room',
            url: '/dashboard/upazilas',
          },
        ],
      },
    ],
  },
];
export default routesConfig;
