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
import YouthDetailsPopup from '../youths/YouthDetailsPopup';
import RejectButton from './RejectButton';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import ApproveButton from './ApproveButton';
import {applicationProcess} from '../../../services/instituteManagement/RegistrationService';
import {useAuthUser} from '../../../@crema/utility/AppHooks';

const ApplicationManagementPage = () => {
  const authUser = useAuthUser();
  const {messages} = useIntl();
  const {successStack} = useNotiStack();

  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);

  const openDetailsModal = useCallback((itemId: number) => {
    setIsOpenDetailsModal(true);
    setSelectedItemId(itemId);
  }, []);

  const closeDetailsModal = useCallback(() => {
    setIsOpenDetailsModal(false);
  }, []);

  const processIndividualApplication = async (
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
                acceptAction={() =>
                  processIndividualApplication(data, 'accepted')
                }
                acceptTitle={messages['common.delete_confirm'] as string}
              />
              <RejectButton
                rejectAction={() =>
                  processIndividualApplication(data, 'rejected')
                }
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
        {/*extra : if authuser admin and institute condition here*/}
        <ReactTable
          columns={columns}
          data={filteredData}
          fetchData={onFetchData}
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
