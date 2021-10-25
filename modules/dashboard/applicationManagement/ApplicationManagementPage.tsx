import React, {useCallback, useMemo, useState} from 'react';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import {useIntl} from 'react-intl';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {API_COURSE_ENROLLMENTS} from '../../../@softbd/common/apiRoutes';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {isResponseSuccess} from '../../../@softbd/utilities/helpers';
import IconCourse from '../../../@softbd/icons/IconCourse';
import Genders from '../../../@softbd/utilities/Genders';
import ApplicationDetailsPopup from './ApplicationDetailsPopup';
import RejectButton from './RejectButton';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
/*import ApproveButton from './ApproveButton';*/
import {rejectEnrollment} from '../../../services/instituteManagement/RegistrationService';
import {useAuthUser} from '../../../@crema/utility/AppHooks';

const ApplicationManagementPage = () => {
  const authUser = useAuthUser();
  const {messages} = useIntl();
  const {successStack} = useNotiStack();

  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const [isToggleTable, setIsToggleTable] = useState<boolean>(false);

  const openDetailsModal = useCallback((itemId: number) => {
    setIsOpenDetailsModal(true);
    setSelectedItemId(itemId);
  }, []);

  const closeDetailsModal = useCallback(() => {
    setIsOpenDetailsModal(false);
  }, []);

  const refreshDataTable = useCallback(() => {
    setIsToggleTable((previousToggle) => !previousToggle);
  }, [isToggleTable]);

  const rejectCourseEnrollment = async (enrollment_id: number) => {
    let response = await rejectEnrollment(enrollment_id);
    if (isResponseSuccess(response)) {
      {
        successStack(<IntlMessages id='applicationManagement.rejected' />);
      }
      refreshDataTable();
    }
  };

  /*  const processIndividualApplication = async (
    filteredData: Application,
    application_status: string,
  ) => {
    let putData = {
      status: application_status,
    };

    let response = await applicationProcess(filteredData.id, putData);
    if (isResponseSuccess(response)) {
      {
        application_status === 'accepted'
          ? successStack(
              <IntlMessages
                id='applicationManagement.accepted'
                values={{
                  applicant: <IntlMessages values={filteredData.full_name} />,
                  course: <IntlMessages values={filteredData.course_name} />,
                }}
              />,
            )
          : successStack(
              <IntlMessages
                id='applicationManagement.rejected'
                values={{
                  applicant: <IntlMessages values={filteredData.full_name} />,
                  course: <IntlMessages values={filteredData.course_name} />,
                }}
              />,
            );
      }
    }
  };*/

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
        Header: messages['applicationManagement.programTitle'],
        accessor: 'program_title',
      },
      {
        Header: messages['applicationManagement.courseTitle'],
        accessor: 'course_title',
      },
      {
        Header: messages['applicationManagement.applicantFullName'],
        accessor: 'full_name',
        isVisible: true,
      },
      {
        Header: messages['common.paymentStatus'],
        accessor: 'payment_status',
        Cell: (props: any) => {
          let data = props.row.original;
          if (data.payment_status === 0) {
            return <p>Unpaid</p>;
          } else {
            return <p>Paid</p>;
          }
        },
      },
      {
        Header: messages['applicationManagement.status'],
        Cell: (props: any) => {
          let data = props.row.original;
          if (data.row_status === 0) {
            return <p>Inactive</p>;
          } else if (data.row_status === 1) {
            return <p>Approved</p>;
          } else if (data.row_status === 2) {
            return <p>Pending</p>;
          } else {
            return <p>Rejected</p>;
          }
        },
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
              {/*<ApproveButton
                acceptAction={() => processIndividualApplication(data.id)}
                acceptTitle={messages['common.delete_confirm'] as string}
              />*/}

              {data.row_status !== 3 ? (
                <RejectButton
                  rejectAction={() => rejectCourseEnrollment(data.id)}
                  rejectTitle={messages['common.delete_confirm'] as string}
                />
              ) : (
                ''
              )}
            </DatatableButtonGroup>
          );
        },
      },
    ],
    [messages],
  );

  const {onFetchData, data, loading, pageCount, totalCount} =
    useReactTableFetchData({
      urlPath: API_COURSE_ENROLLMENTS,
      paramsValueModifier: (params: any) => {
        if (authUser?.isInstituteUser)
          params['institute_id'] = authUser?.institute_id;
        return params;
      },
    });

  const filteredData = data?.map((youth: any) => {
    let gender_label: string = '';
    if (youth?.gender === parseInt(Genders.MALE)) {
      gender_label = 'Male';
    } else if (youth?.gender === parseInt(Genders.FEMALE)) {
      gender_label = 'Female';
    } else {
      gender_label = 'Others';
    }
    return {
      ...youth,
      gender_label,
      full_name: youth?.first_name + ' ' + youth?.last_name,
    };
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
          fetchData={onFetchData}
          loading={loading}
          pageCount={pageCount}
          totalCount={totalCount}
          toggleResetTable={isToggleTable}
        />
        {isOpenDetailsModal && selectedItemId && (
          <ApplicationDetailsPopup
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
