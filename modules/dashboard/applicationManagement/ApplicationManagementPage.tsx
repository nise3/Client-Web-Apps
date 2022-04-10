import React, {useCallback, useMemo, useState} from 'react';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import {useIntl} from 'react-intl';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {API_COURSE_ENROLLMENTS} from '../../../@softbd/common/apiRoutes';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {
  getCalculatedSerialNo,
  isResponseSuccess,
} from '../../../@softbd/utilities/helpers';
import IconCourse from '../../../@softbd/icons/IconCourse';
import Genders from '../../../@softbd/utilities/Genders';
import ApplicationDetailsPopup from './ApplicationDetailsPopup';
import RejectButton from './RejectButton';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import CommonButton from '../../../@softbd/elements/button/CommonButton/CommonButton';
import {rejectEnrollment} from '../../../services/instituteManagement/RegistrationService';
import AssignBatchPopup from './AssignBatchPopup';
import {FiUserCheck} from 'react-icons/fi';
import CustomChipPaymentStatus from './CustomChipPaymentStatus';
import LocaleLanguage from '../../../@softbd/utilities/LocaleLanguage';

const ApplicationManagementPage = () => {
  const {messages, locale} = useIntl();
  const {successStack} = useNotiStack();

  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const [isToggleTable, setIsToggleTable] = useState<boolean>(false);
  const [isOpenBatchAssignModal, setIsOpenBatchAssignModal] = useState(false);

  /** details modal */
  const openDetailsModal = useCallback((itemId: number) => {
    setIsOpenDetailsModal(true);
    setSelectedItemId(itemId);
  }, []);

  const closeDetailsModal = useCallback(() => {
    setIsOpenDetailsModal(false);
  }, []);

  /** Assign Batch Modal */
  const openAssignBatchModal = useCallback(
    (itemId: number | null = null, courseId: number | null = null) => {
      setIsOpenDetailsModal(false);
      setIsOpenBatchAssignModal(true);
      setSelectedItemId(itemId);
      setSelectedCourseId(courseId);
    },
    [],
  );

  const closeAssignBatchModal = useCallback(() => {
    setIsOpenBatchAssignModal(false);
    setSelectedItemId(null);
    setSelectedCourseId(null);
  }, []);

  const refreshDataTable = useCallback(() => {
    setIsToggleTable((previousToggle) => !previousToggle);
  }, [isToggleTable]);

  /** Method called to reject an application */
  const rejectCourseEnrollment = async (enrollment_id: number) => {
    let response = await rejectEnrollment(enrollment_id);
    if (isResponseSuccess(response)) {
      {
        successStack(<IntlMessages id='applicationManagement.rejected' />);
      }
      refreshDataTable();
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: '#',
        disableFilters: true,
        disableSortBy: true,
        Cell: (props: any) => {
          return getCalculatedSerialNo(
            props.row.index,
            props.currentPageIndex,
            props.currentPageSize,
          );
        },
      },
      {
        Header: messages['applicationManagement.programTitle'],
        accessor: 'program_title',
        isVisible: locale == LocaleLanguage.BN,
      },
      {
        Header: messages['applicationManagement.programTitle_en'],
        accessor: 'program_title_en',
        isVisible: locale == LocaleLanguage.EN,
      },
      {
        Header: messages['applicationManagement.courseTitle'],
        accessor: 'course_title',
        isVisible: locale == LocaleLanguage.BN,
      },
      {
        Header: messages['applicationManagement.courseTitle_en'],
        accessor: 'course_title_en',
        isVisible: locale == LocaleLanguage.EN,
      },
      {
        Header: messages['menu.batch'],
        accessor: 'batch_title',
        isVisible: locale == LocaleLanguage.BN,
      },
      {
        Header: messages['menu.batch_en'],
        accessor: 'batch_title_en',
        isVisible: locale == LocaleLanguage.EN,
      },
      {
        Header: messages['applicationManagement.applicantFullName_en'],
        accessor: 'full_name_en',
        isVisible: locale == LocaleLanguage.EN,
        disableFilters: true,
      },
      {
        Header: messages['applicationManagement.applicantFullName'],
        accessor: 'full_name',
        isVisible: locale == LocaleLanguage.BN,
        disableFilters: true,
      },
      {
        Header: messages['common.paymentStatus'],
        accessor: 'payment_status',
        filter: 'rowStatusFilter',
        Cell: (props: any) => {
          let data = props.row.original;
          return <CustomChipPaymentStatus value={data?.payment_status} />;
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
      /*{
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
      },*/
      {
        Header: messages['common.actions'],
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <DatatableButtonGroup>
              <ReadButton onClick={() => openDetailsModal(data.id)} />
              <CommonButton
                onClick={() => openAssignBatchModal(data.id, data.course_id)}
                btnText='applicationManagement.assignBatch'
                startIcon={<FiUserCheck style={{marginLeft: '5px'}} />}
                color='secondary'
              />

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
    [messages, locale],
  );

  const {onFetchData, data, loading, pageCount, totalCount} =
    useReactTableFetchData({
      urlPath: API_COURSE_ENROLLMENTS,
    });

  const filteredData = data?.map((youth: any) => {
    let gender_label: string;
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
        {isOpenBatchAssignModal && (
          <AssignBatchPopup
            key={1}
            onClose={closeAssignBatchModal}
            itemId={selectedItemId}
            refreshDataTable={refreshDataTable}
            courseId={selectedCourseId}
          />
        )}
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
