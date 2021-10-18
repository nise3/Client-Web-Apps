import React, {useCallback, useMemo, useState} from 'react';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import {useIntl} from 'react-intl';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
/*import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {API_YOUTH_LIST} from '../../../@softbd/common/apiRoutes';*/
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {isResponseSuccess} from '../../../@softbd/utilities/helpers';
import IconCourse from '../../../@softbd/icons/IconCourse';
import Genders from '../../../@softbd/utilities/Genders';
import YouthDetailsPopup from '../youths/YouthDetailsPopup';
import RejectButton from './RejectButton';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import ApproveButton from './ApproveButton';
import {applicationProcess} from '../../../services/instituteManagement/RegistrationService';


/** dummy data for course application */
const data = [
  {
    'id': 1,
    'course_name': 'Computer Programming',
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
    'approval_status': 'pending',
    'accepted': 0,
    'rejected': 0,
    'created_at': '2021-10-10T07:23:58.000000Z',
    'updated_at': '2021-10-10T07:23:58.000000Z',
  },
  {
    'id': 2,
    'course_name': 'Computer learning',
    'username': 'enola.skiles@example.net',
    'user_name_type': 1,
    'first_name': 'Abdur',
    'last_name': 'Razzak',
    'gender': 2,
    'email': 'enola.skiles@example.net',
    'mobile': '01754994292',
    'date_of_birth': '0000-00-00',
    'physical_disability_status': 0,
    'loc_division_id': 1,
    'loc_district_id': 1,
    'row_status': 1,
    'approval_status': 'pending',
    'accepted': 0,
    'rejected': 0,
    'created_at': '2021-10-10T07:23:58.000000Z',
    'updated_at': '2021-10-10T07:23:58.000000Z',
  },
];
const loading = false;
const pageCount = 1;
const totalCount = 1;

const ApplicationManagementPage = () => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();

  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);

  const openDetailsModal = useCallback(
    (itemId: number) => {
      setIsOpenDetailsModal(true);
      setSelectedItemId(itemId);
    },
    [],
  );

  const closeDetailsModal = useCallback(() => {
    setIsOpenDetailsModal(false);
  }, []);

  const processIndividualApplication = async (filteredData: Application, application_status: string, accepted: boolean, rejected: boolean) => {
    let putData = {
      status: application_status,
      accepted: accepted,
      rejected: rejected
    }

    let response = await applicationProcess(filteredData.id, putData);
    if (isResponseSuccess(response)) {
      successStack(
        <IntlMessages
          id='applicationManagement.accepted'
          values={{applicant: <IntlMessages values={filteredData.full_name} />, course: <IntlMessages values={filteredData.course_name} />}}
        />,
      );
    }
  };

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
        Header: messages['applicationManagement.courseName'],
        accessor: 'course_name',
      },
      {
        Header: messages['common.status'],
        accessor: 'approval_status',
      },
      {
        Header: messages['youth.fullName'],
        accessor: 'full_name',
      },
      {
        Header: messages['youth.mobile'],
        accessor: 'mobile',
      },
      {
        Header: messages['applicationManagement.traineeDetails'],
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
      {
        Header: messages['common.actions'],
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <DatatableButtonGroup>
              <ApproveButton
                acceptAction={() => processIndividualApplication(data, 'accepted', true,  false)}
                acceptTitle={messages['common.delete_confirm'] as string} />
              <RejectButton
                rejectAction={() => processIndividualApplication(data, 'rejected',  false, true)}
                rejectTitle={messages['common.delete_confirm'] as string}
              />
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


  let filteredData = data.map(youth => {
    let Gender: string = '';
    if (youth.gender === parseInt(Genders.MALE)) {
      Gender = 'Male';
    } else if (youth.gender === parseInt(Genders.FEMALE)) {
      Gender = 'Female';
    } else {
      Gender = 'Others';
    }
    return {...youth, Gender, full_name: youth.first_name + ' ' + youth.last_name};
  });

  return (
    <>
      <PageBlock
        title={
          <>
            <IconCourse /> <IntlMessages id='applicationManagement.label' />
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

export default ApplicationManagementPage;