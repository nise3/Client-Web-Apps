import React, {useCallback, useMemo, useState} from 'react';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import {useIntl} from 'react-intl';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
/*import DeleteButton from '../../../@softbd/elements/button/DeleteButton/DeleteButton';*/
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
/*import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {API_YOUTH_LIST} from '../../../@softbd/common/apiRoutes';*/
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import YouthDetailsPopup from './YouthDetailsPopup';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';

import IntlMessages from '../../../@crema/utility/IntlMessages';
/*import useNotiStack from '../../../@softbd/hooks/useNotifyStack';*/
/*import {deleteCourse} from '../../../services/instituteManagement/CourseService';
import {isResponseSuccess} from '../../../@softbd/utilities/helpers';*/
import IconUser from '../../../@softbd/icons/IconUser';
import Genders from '../../../@softbd/utilities/Genders';

const YouthPage = () => {
  const {messages} = useIntl();

  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);

  const openDetailsModal = useCallback(
    (itemId: number) => {
      setIsOpenDetailsModal(true);
      setSelectedItemId(itemId);
    },
    [selectedItemId],
  );

  const closeDetailsModal = useCallback(() => {
    setIsOpenDetailsModal(false);
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: '#',
        disableFilters: true,
        disableSortBy: true,
        Cell: (props: any) => {
          return props.row.index + 1;
        },
      },
      {
        Header: messages['youth.username'],
        accessor: 'username',
      },
      {
        Header: messages['youth.fullName'],
        accessor: 'fullName',
      },
      {
        Header: messages['youth.gender'],
        accessor: 'Gender',
      },
      {
        Header: messages['youth.mobile'],
        accessor: 'mobile',
      },
      {
        Header: messages['youth.email'],
        accessor: 'email',
      },
      {
        Header: messages['common.status'],
        accessor: 'row_status',
        filter: 'rowStatusFilter',
        Cell: (props: any) => {
          let data = props.row.original;
          return <CustomChipRowStatus value={data?.row_status} />;
        },
      },
      {
        Header: messages['common.actions'],
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <DatatableButtonGroup>
              <ReadButton onClick={() => openDetailsModal(data.id)} />
            </DatatableButtonGroup>
          );
        },
        sortable: false,
      },
    ],
    [messages],
  );

  /*const {onFetchData, data, loading, pageCount, totalCount} =
    useReactTableFetchData({
      urlPath: API_YOUTH_LIST,
    });*/

  /*dummy data*/
  let data = [
    {
      'id': 1,
      'username': 'enola.skiles@example.net',
      'user_name_type': 1,
      'first_name': 'shohanur',
      'last_name': 'Rahman',
      'gender': 2,
      'email': 'enola.skiles@example.net',
      'mobile': '01754994292',
      'date_of_birth': '0000-00-00',
      'physical_disability_status': 0,
      'loc_division_id': 1,
      'loc_district_id': 1,
      'row_status': 1,
      'created_at': '2021-10-10T07:23:58.000000Z',
      'updated_at': '2021-10-10T07:23:58.000000Z',
      'skills': [
        {
          'id': 21,
          'title': 'Payroll Clerk',
          'title_en': 'Payroll Clerk',
          'description': 'Dolor quia cumque vero et quia vitae. Et amet qui eius aut. Iure officia ipsam fugiat.',
          'row_status': 1,
          'created_at': '2021-10-10T07:23:59.000000Z',
          'updated_at': '2021-10-10T07:23:59.000000Z',
        },
        {
          'id': 22,
          'title': 'Sound Engineering Technician',
          'title_en': 'Sound Engineering Technician',
          'description': 'Suolorum delectus nemo aliquam corrupti corporis.',
          'row_status': 1,
          'created_at': '2021-10-10T07:23:59.000000Z',
          'updated_at': '2021-10-10T07:23:59.000000Z',
        },
      ],
      'physical_disabilities': [],
      'job_experiences': [
        {
          'id': 1,
          'youth_id': 1,
          'company_name': 'Blanda, Carter and Collins',
          'company_name_en': 'Blanda, Carter and Collins',
          'position': 'Compacting Machine Operator',
          'position_en': 'Compacting Machine Operator',
          'employment_type_id': 1,
          'location': '6623 Hyatt Avenue',
          'location_en': '6623 Hyatt Avenue',
          'job_description': 'Architecture Teacher',
          'job_description_en': 'Architecture Teacher',
          'start_date': '2012-05-21',
          'end_date': '1974-11-21',
          'is_currently_work': 0,
          'row_status': 1,
          'created_at': '2021-10-10T07:23:59.000000Z',
          'updated_at': '2021-10-10T07:23:59.000000Z',
        },
      ],
      'languages_proficiencies': [
        {
          'id': 1,
          'youth_id': 1,
          'language_id': 3,
          'reading_proficiency_level': 1,
          'writing_proficiency_level': 1,
          'speaking_proficiency_level': 2,
          'understand_proficiency_level': 2,
          'row_status': 1,
          'created_at': '2021-10-10T07:23:59.000000Z',
          'updated_at': '2021-10-10T07:23:59.000000Z',
        },
        {
          'id': 2,
          'youth_id': 1,
          'language_id': 2,
          'reading_proficiency_level': 2,
          'writing_proficiency_level': 2,
          'speaking_proficiency_level': 2,
          'understand_proficiency_level': 1,
          'row_status': 1,
          'created_at': '2021-10-10T07:23:59.000000Z',
          'updated_at': '2021-10-10T07:23:59.000000Z',
        },
      ],
      'certifications': [
        {
          'id': 1,
          'youth_id': 1,
          'certification_name': 'Delpha Corwin',
          'certification_name_en': 'Delpha Corwin',
          'institute_name': 'Prof. Darian Bode II',
          'institute_name_en': 'Prof. Darian Bode II',
          'location': '6155 Yundt Wall',
          'location_en': '841 Amparo Haven',
          'start_date': '2013-04-19',
          'end_date': '2013-04-20',
          'certificate_file_path': 'Delpha Corwin',
          'row_status': 1,
          'created_at': '2021-10-10T07:23:59.000000Z',
          'updated_at': '2021-10-10T07:23:59.000000Z',
        },
        {
          'id': 2,
          'youth_id': 1,
          'certification_name': 'Jayda Homenick',
          'certification_name_en': 'Jayda Homenick',
          'institute_name': 'Makenna Kovacek',
          'institute_name_en': 'Makenna Kovacek',
          'location': '8161 Kub Unions',
          'location_en': '225 Kaylin Expressway Suite 497',
          'start_date': '2005-12-15',
          'end_date': '2005-12-16',
          'certificate_file_path': 'Jayda Homenick',
          'row_status': 1,
          'created_at': '2021-10-10T07:23:59.000000Z',
          'updated_at': '2021-10-10T07:23:59.000000Z',
        },
      ],
      'educations': [
        {
          'id': 1,
          'youth_id': 1,
          'institute_name': 'D\'Amore-Hickle',
          'institute_name_en': 'D\'Amore-Hickle',
          'examination_id': 1,
          'board_id': 2,
          'edu_group_id': 3,
          'roll_number': '620562875479',
          'registration_number': '263591251176',
          'result_type': 2,
          'cgpa_gpa_max_value': 5,
          'received_cgpa_gpa': 3.51,
          'passing_year': 1996,
          'row_status': 1,
          'created_at': '2021-10-10T07:23:59.000000Z',
          'updated_at': '2021-10-10T07:23:59.000000Z',
        },
        {
          'id': 2,
          'youth_id': 1,
          'institute_name': 'Waelchi, Kovacek and Graham',
          'institute_name_en': 'Waelchi, Kovacek and Graham',
          'examination_id': 1,
          'board_id': 2,
          'edu_group_id': 3,
          'roll_number': '099409455641',
          'registration_number': '526647233800',
          'result_type': 2,
          'cgpa_gpa_max_value': 5,
          'received_cgpa_gpa': 4.67,
          'passing_year': 1987,
          'row_status': 1,
          'created_at': '2021-10-10T07:23:59.000000Z',
          'updated_at': '2021-10-10T07:23:59.000000Z',
        },
      ],
      'portfolios': [
        {
          'id': 1,
          'youth_id': 1,
          'title': 'Industrial Production Manager',
          'title_en': 'Industrial Production Manager',
          'description': 'Ullam a impedit aut dolores omnis rem velit et enim modi voluptatem ipsum quia dignissimos asperiores voluptatem sit suscipit accusantium dicta consequatur nam porro neque culpa et soluta necessitatibus asperiores doloribus dolorem quae nihil deleniti odit deserunt quo non hic numquam voluptate aut occaecati eaque aliquid odit enim ut quidem accusantium autem ipsa deleniti est rerum doloremque cupiditate corporis sed harum in autem error autem est ex quo molestias occaecati ipsam sint pariatur eum nulla ad.',
          'description_en': 'Ullam a impedit aut dolores omnis rem velit et enim modi voluptatem ipsum quia dignissimos asperiores voluptatem sit suscipit accusantium dicta consequatur nam porro neque culpa et soluta necessitatibus asperiores doloribus dolorem quae nihil deleniti odit deserunt quo non hic numquam voluptate aut occaecati eaque aliquid odit enim ut quidem accusantium autem ipsa deleniti est rerum doloremque cupiditate corporis sed harum in autem error autem est ex quo molestias occaecati ipsam sint pariatur eum nulla ad.',
          'file_path': 'C:\\Users\\HP\\AppData\\Local\\Temp\\fakC0FD.tmp',
          'row_status': 1,
          'created_at': '2021-10-10T07:23:59.000000Z',
          'updated_at': '2021-10-10T07:23:59.000000Z',
        },
        {
          'id': 2,
          'youth_id': 1,
          'title': 'Rotary Drill Operator',
          'title_en': 'Rotary Drill Operator',
          'description': 'Aut iste nulla aut commodi neque assumenda provident eveniet quisquam expedita ut ipsa explicabo non nisi amet et velit id voluptatem voluptas qui sint tenetur et minus est veritatis sed voluptatum rerum qui dolor ipsam optio pariatur ex doloribus magnam optio nemo ut aliquid exercitationem rem pariatur ex eveniet numquam animi consequatur aut enim hic in voluptates reiciendis eligendi voluptatem omnis recusandae consequatur modi tempore distinctio esse tempore minima voluptatem ut omnis quaerat distinctio ipsa est porro aut aut rerum voluptatem iusto repellat et in aut cumque voluptatem maiores ut quibusdam velit minima suscipit ipsam ab autem et omnis eius accusantium accusamus et exercitationem magni fugit exercitationem veritatis nam eaque repellendus qui sint quaerat dignissimos eum repellendus porro cupiditate inventore sunt vero provident iusto distinctio optio expedita maxime assumenda sunt ut aut minima eius tenetur id atque et ut.',
          'description_en': 'Aut iste nulla aut commodi neque assumenda provident eveniet quisquam expedita ut ipsa explicabo non nisi amet et velit id voluptatem voluptas qui sint tenetur et minus est veritatis sed voluptatum rerum qui dolor ipsam optio pariatur ex doloribus magnam optio nemo ut aliquid exercitationem rem pariatur ex eveniet numquam animi consequatur aut enim hic in voluptates reiciendis eligendi voluptatem omnis recusandae consequatur modi tempore distinctio esse tempore minima voluptatem ut omnis quaerat distinctio ipsa est porro aut aut rerum voluptatem iusto repellat et in aut cumque voluptatem maiores ut quibusdam velit minima suscipit ipsam ab autem et omnis eius accusantium accusamus et exercitationem magni fugit exercitationem veritatis nam eaque repellendus qui sint quaerat dignissimos eum repellendus porro cupiditate inventore sunt vero provident iusto distinctio optio expedita maxime assumenda sunt ut aut minima eius tenetur id atque et ut.',
          'file_path': 'C:\\Users\\HP\\AppData\\Local\\Temp\\fakC10E.tmp',
          'row_status': 1,
          'created_at': '2021-10-10T07:23:59.000000Z',
          'updated_at': '2021-10-10T07:23:59.000000Z',
        },
        {
          'id': 3,
          'youth_id': 1,
          'title': 'Healthcare Practitioner',
          'title_en': 'Healthcare Practitioner',
          'description': 'Porro magnam illo provident et facere qui facilis porro voluptatem omnis et ad optio omnis doloribus autem possimus aut eos deserunt accusantium numquam rerum commodi cupiditate quo aut eos ut qui magnam illo et mollitia molestiae ullam voluptate accusamus quis dicta sapiente aliquid debitis ut tenetur ratione sint vero iure architecto itaque eum et deleniti voluptate totam omnis dolorem laudantium dolore enim culpa repellat ut enim iste velit ex quo temporibus numquam incidunt ea qui illo repellendus et quas praesentium voluptate illo et quis omnis nihil corrupti libero est et ut est et repellat deserunt accusamus aut officia placeat quae molestiae.',
          'description_en': 'Porro magnam illo provident et facere qui facilis porro voluptatem omnis et ad optio omnis doloribus autem possimus aut eos deserunt accusantium numquam rerum commodi cupiditate quo aut eos ut qui magnam illo et mollitia molestiae ullam voluptate accusamus quis dicta sapiente aliquid debitis ut tenetur ratione sint vero iure architecto itaque eum et deleniti voluptate totam omnis dolorem laudantium dolore enim culpa repellat ut enim iste velit ex quo temporibus numquam incidunt ea qui illo repellendus et quas praesentium voluptate illo et quis omnis nihil corrupti libero est et ut est et repellat deserunt accusamus aut officia placeat quae molestiae.',
          'file_path': 'C:\\Users\\HP\\AppData\\Local\\Temp\\fakC10F.tmp',
          'row_status': 1,
          'created_at': '2021-10-10T07:23:59.000000Z',
          'updated_at': '2021-10-10T07:23:59.000000Z',
        },
        {
          'id': 4,
          'youth_id': 1,
          'title': 'Public Relations Specialist',
          'title_en': 'Public Relations Specialist',
          'description': 'Laborum placeat numquam ea perferendis provident officia ex quis qui nihil odio iure dolor dolores iusto dolor dolores corporis ratione nisi omnis eligendi sapiente corrupti tenetur optio nihil velit dolorem laudantium sapiente quam reiciendis sit enim qui quam deleniti excepturi non deleniti saepe et excepturi repellendus quibusdam eius non debitis tempore minima explicabo quia quam quae velit atque fugiat hic consequuntur omnis aut perspiciatis sunt voluptatem ut quas eaque magni et distinctio quia est veritatis inventore maiores voluptatem aut esse illo quod est quam fugiat corporis est necessitatibus labore error animi aliquam numquam occaecati laboriosam.',
          'description_en': 'Laborum placeat numquam ea perferendis provident officia ex quis qui nihil odio iure dolor dolores iusto dolor dolores corporis ratione nisi omnis eligendi sapiente corrupti tenetur optio nihil velit dolorem laudantium sapiente quam reiciendis sit enim qui quam deleniti excepturi non deleniti saepe et excepturi repellendus quibusdam eius non debitis tempore minima explicabo quia quam quae velit atque fugiat hic consequuntur omnis aut perspiciatis sunt voluptatem ut quas eaque magni et distinctio quia est veritatis inventore maiores voluptatem aut esse illo quod est quam fugiat corporis est necessitatibus labore error animi aliquam numquam occaecati laboriosam.',
          'file_path': 'C:\\Users\\HP\\AppData\\Local\\Temp\\fakC110.tmp',
          'row_status': 1,
          'created_at': '2021-10-10T07:23:59.000000Z',
          'updated_at': '2021-10-10T07:23:59.000000Z',
        },
        {
          'id': 5,
          'youth_id': 1,
          'title': 'Occupational Health Safety Technician',
          'title_en': 'Occupational Health Safety Technician',
          'description': 'Aspernatur eligendi hic velqunt dqecati sed reprehenderit sint et ratione est dicta deleniti iusto cum.',
          'description_en': 'Aspernatur eligendi hic vel sit qui conseqvel deserunt occaecati sed reprehenderit sint et ratione est dicta deleniti iusto cum.',
          'file_path': 'C:\\Users\\HP\\AppData\\Local\\Temp\\fakC111.tmp',
          'row_status': 1,
          'created_at': '2021-10-10T07:23:59.000000Z',
          'updated_at': '2021-10-10T07:23:59.000000Z',
        },
      ],
      'references': [
        {
          'id': 1,
          'youth_id': 1,
          'referrer_first_name': 'Dock',
          'referrer_first_name_en': 'Dock',
          'referrer_last_name': 'Smitham',
          'referrer_last_name_en': 'Smitham',
          'referrer_organization_name': 'Barrows-Thompson',
          'referrer_organization_name_en': 'Schroeder, Harvey and Crona',
          'referrer_designation': 'Interpreter OR Translator',
          'referrer_designation_en': 'Occupational Health Safety Specialist',
          'referrer_address': '996 Aiyana Roads Apt. 843\nLegrosview, NV 71111',
          'referrer_address_en': '996 Aiyana Roads Apt. 843\nLegrosview, NV 71111',
          'referrer_email': 'harber.chaz@example.com',
          'referrer_mobile': '1-208-779-2230',
          'referrer_relation': 'et',
          'referrer_relation_en': 'qui',
          'row_status': 1,
          'created_at': '2021-10-10T07:23:59.000000Z',
          'updated_at': '2021-10-10T07:23:59.000000Z',
        },
        {
          'id': 2,
          'youth_id': 1,
          'referrer_first_name': 'Magdalena',
          'referrer_first_name_en': 'Magdalena',
          'referrer_last_name': 'Klocko',
          'referrer_last_name_en': 'Klocko',
          'referrer_organization_name': 'Smith Ltd',
          'referrer_organization_name_en': 'Leannon, Weimann and Tillman',
          'referrer_designation': 'Title Abstractor',
          'referrer_designation_en': 'Substance Abuse Social Worker',
          'referrer_address': '1483 Carol Plaza Apt. 125\nEsmeraldaberg, NE 34640',
          'referrer_address_en': '1483 Carol Plaza Apt. 125\nEsmeraldaberg, NE 34640',
          'referrer_email': 'taryn05@example.org',
          'referrer_mobile': '(681) 665-6307',
          'referrer_relation': 'dolorum',
          'referrer_relation_en': 'quasi',
          'row_status': 1,
          'created_at': '2021-10-10T07:23:59.000000Z',
          'updated_at': '2021-10-10T07:23:59.000000Z',
        },
      ],
    },
  ];

  let filteredData = data.map(youth => {
    let Gender: string = '';
    if (youth.gender === parseInt(Genders.MALE)) {
      Gender = 'Male';
    } else if (youth.gender === parseInt(Genders.FEMALE)) {
      Gender = 'Female';
    } else {
      Gender = 'Others';
    }
    return {...youth, Gender, fullName: youth.first_name + ' ' + youth.last_name};
  });

  const loading = false;
  const pageCount = 1;
  const totalCount = 1;

  return (
    <>
      <PageBlock
        title={
          <>
            <IconUser /> <IntlMessages id='youth.label' />
          </>
        }>
        <ReactTable
          columns={columns}
          data={filteredData}
          /*fetchData={onFetchData}*/
          loading={loading}
          pageCount={pageCount}
          totalCount={totalCount}
        />

        {isOpenDetailsModal && selectedItemId && (
          <YouthDetailsPopup
            key={1}
            itemId={selectedItemId}
            onClose={closeDetailsModal}
          />
        )}
      </PageBlock>
    </>
  );
};

export default YouthPage;