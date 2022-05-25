import React, {useCallback, useMemo, useState} from 'react';
import {useIntl} from 'react-intl';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import AddButton from '../../../@softbd/elements/button/AddButton/AddButton';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import {
  getCalculatedSerialNo,
  getMomentDateFormat,
  isResponseSuccess,
} from '../../../@softbd/utilities/helpers';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DeleteButton from '../../../@softbd/elements/button/DeleteButton/DeleteButton';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {API_BATCHES} from '../../../@softbd/common/apiRoutes';
import {
  deleteBatch,
  processResult,
  publishResult,
} from '../../../services/instituteManagement/BatchService';
import IconBatch from '../../../@softbd/icons/IconBatch';
import BatchAddEditPopup from './BatchAddEditPopup';
import BatchDetailsPopup from './BatchDetailsPopup';
import CommonButton from '../../../@softbd/elements/button/CommonButton/CommonButton';
import {FiUserCheck} from 'react-icons/fi';
import {useRouter} from 'next/router';
import LocaleLanguage from '../../../@softbd/utilities/LocaleLanguage';
import DownloadIcon from '@mui/icons-material/Download';
import CourseEnrollmentPopup from './CourseEnrollmentPopup';
import ExamAssignToBatchPopup from './ExamAssignToBatchPopup';
import {Add} from '@mui/icons-material';
import {Link} from '../../../@softbd/elements/common';
import Visibility from '@mui/icons-material/Visibility';
import {LINK_BATCH_RESULT} from '../../../@softbd/common/appLinks';
import ApproveButton from '../industry-associations/ApproveButton';

const BatchesPage = () => {
  const {messages, locale} = useIntl();
  const {successStack, errorStack} = useNotiStack();
  const router = useRouter();
  const path = router.pathname;

  const url = LINK_BATCH_RESULT;

  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [courseId, setCourseId] = useState<number>();

  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const [isToggleTable, setIsToggleTable] = useState<boolean>(false);
  const [isOpenImportModal, setIsOpenImportModal] = useState(false);
  const [isOpenExamAssignModal, setIsOpenExamAssignModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const closeAddEditModal = useCallback(() => {
    setIsOpenAddEditModal(false);
    setSelectedItemId(null);
  }, []);

  const openAddEditModal = useCallback((itemId: number | null = null) => {
    setIsOpenDetailsModal(false);
    setIsOpenAddEditModal(true);
    setSelectedItemId(itemId);
  }, []);

  const openDetailsModal = useCallback((itemId: number) => {
    setIsOpenDetailsModal(true);
    setSelectedItemId(itemId);
  }, []);

  const closeDetailsModal = useCallback(() => {
    setIsOpenDetailsModal(false);
  }, []);

  const openImportModal = useCallback((courseId: number, batchId: number) => {
    setCourseId(courseId);
    setSelectedItemId(batchId);
    setIsOpenImportModal(true);
  }, []);

  const closeImportModal = useCallback(() => {
    setIsOpenImportModal(false);
  }, []);

  const openExamAssignModal = useCallback((itemId: number) => {
    setIsOpenExamAssignModal(true);
    setSelectedItemId(itemId);
  }, []);

  const closeExamAssignModal = useCallback(() => {
    setIsOpenExamAssignModal(false);
    setSelectedItemId(null);
  }, []);

  const deleteBatchItem = async (itemId: number) => {
    try {
      let response = await deleteBatch(itemId);
      if (isResponseSuccess(response)) {
        successStack(
          <IntlMessages
            id='common.subject_deleted_successfully'
            values={{subject: <IntlMessages id='batches.label' />}}
          />,
        );

        refreshDataTable();
      }
    } catch (error) {}
  };

  const publishAction = async (batchId: number, result_published_at: any) => {
    try {
      let data = {
        is_published: result_published_at ? 0 : 1,
      };
      let response = await publishResult(batchId, data);
      if (isResponseSuccess(response)) {
        successStack(
          <IntlMessages
            id='common.subject_publish_successfully'
            values={{subject: <IntlMessages id='batches.label' />}}
          />,
        );
        refreshDataTable();
      }
    } catch (error) {}
  };

  const processBatchResult = async (itemId: number) => {
    try {
      setIsProcessing(true);
      let response = await processResult(itemId);
      if (isResponseSuccess(response)) {
        successStack(messages['batch.process_result_success']);
        refreshDataTable();
      } else {
        let msg = messages['batch.process_result_failed'];
        let error_code = response?.data.error_code;
        if (error_code == 'no_exams') {
          msg = messages['batch.result_no_exams'];
        } else if (error_code == 'already_published') {
          msg = messages['batch.result_failed_already_published'];
        } else if (error_code == 'no_config') {
          msg = messages['batch.result_failed_no_config'];
        } else if (error_code == 'configured_exams_not_found') {
          msg = messages['batch.result_failed_configured_exams_not_found'];
        } else if (error_code == 'exams_not_finished') {
          msg = messages['batch.result_failed_exams_not_finished'];
        }
        errorStack(msg);
      }
    } catch (error) {
      errorStack(messages['batch.process_result_failed']);
    } finally {
      setIsProcessing(false);
    }
  };

  const refreshDataTable = useCallback(() => {
    setIsToggleTable((previousToggle) => !previousToggle);
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: '#',
        Cell: (props: any) => {
          return getCalculatedSerialNo(
            props.row.index,
            props.currentPageIndex,
            props.currentPageSize,
          );
        },
        disableFilters: true,
        disableSortBy: true,
      },
      {
        Header: messages['common.title'],
        accessor: 'title',
        isVisible: locale == LocaleLanguage.BN,
      },
      {
        Header: messages['common.title_en'],
        accessor: 'title_en',
        isVisible: locale == LocaleLanguage.EN,
      },
      {
        Header: messages['common.courses'],
        accessor: 'course_title',
        disableFilters: true,
      },
      {
        Header: messages['batches.total_and_available_seat'],
        accessor: 'number_of_seats',
        disableFilters: true,
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <span>{data?.available_seats + '/' + data?.number_of_seats}</span>
          );
        },
      },

      {
        Header: messages['batches.registration_start_date'],
        accessor: 'registration_start_date',
        disableFilters: true,
        filter: 'dateTimeFilter',
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <span>
              {getMomentDateFormat(
                data?.registration_start_date,
                'DD MMMM, YYYY',
              )}
            </span>
          );
        },
      },
      {
        Header: messages['batches.registration_end_date'],
        accessor: 'registration_end_date',
        disableFilters: true,
        filter: 'dateTimeFilter',
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <span>
              {getMomentDateFormat(
                data?.registration_end_date,
                'DD MMMM, YYYY',
              )}
            </span>
          );
        },
      },
      {
        Header: messages['batches.start_date'],
        accessor: 'batch_start_date',
        filter: 'dateTimeFilter',
        isVisible: false,
        disableFilters: true,
        Cell: (props: any) => {
          let data = props.row.original;
          return <span>{getMomentDateFormat(data?.batch_start_date)}</span>;
        },
      },
      {
        Header: messages['batches.end_date'],
        accessor: 'batch_end_date',
        filter: 'dateTimeFilter',
        isVisible: false,
        disableFilters: true,
        Cell: (props: any) => {
          let data = props.row.original;
          return <span>{getMomentDateFormat(data?.batch_end_date)}</span>;
        },
      },
      //download upload

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
              <EditButton onClick={() => openAddEditModal(data.id)} />
              <DeleteButton
                deleteAction={() => deleteBatchItem(data.id)}
                deleteTitle='Are you sure?'
              />
              <CommonButton
                key={2}
                onClick={() => openImportModal(data?.course_id, data?.id)}
                btnText={'common.import'}
                variant={'outlined'}
                color={'primary'}
                style={{marginLeft: '5px'}}
                startIcon={<DownloadIcon />}
              />
              <CommonButton
                key={3}
                onClick={() => openExamAssignModal(data?.id)}
                btnText={'batch.assign_exam'}
                variant={'outlined'}
                color={'primary'}
                style={{marginLeft: '5px'}}
                startIcon={<Add />}
              />
              <Link href={`${path}/${data?.id}/youths`} passHref={true}>
                <CommonButton
                  btnText='youth.label'
                  startIcon={<FiUserCheck style={{marginLeft: '5px'}} />}
                  style={{marginLeft: '10px'}}
                  variant='outlined'
                  color='primary'
                />
              </Link>
              {!data?.result_published_at && (
                <CommonButton
                  key={5}
                  onClick={() => processBatchResult(data.id)}
                  btnText={'batch.process_result'}
                  variant={'outlined'}
                  color={'primary'}
                  style={{marginLeft: '5px'}}
                  startIcon={<Visibility />}
                />
              )}
              {data.result_processed_at && (
                <Link href={`${url}${data.id}`} passHref={true}>
                  <CommonButton
                    key={4}
                    onClick={() => console.log('clicked')}
                    btnText={'common.batch_result'}
                    variant={'outlined'}
                    color={'primary'}
                    style={{marginLeft: '5px'}}
                    startIcon={<Visibility />}
                  />
                </Link>
              )}
              {data?.result_processed_at && (
                <ApproveButton
                  approveAction={() =>
                    publishAction(data.id, data?.result_published_at)
                  }
                  approveTitle={
                    messages[
                      data?.result_published_at
                        ? 'common.un_publish'
                        : 'exam.result_publish'
                    ] as string
                  }
                  buttonText={
                    messages[
                      data?.result_published_at
                        ? 'common.un_publish'
                        : 'exam.result_publish'
                    ] as string
                  }
                />
              )}
            </DatatableButtonGroup>
          );
        },
        sortable: false,
      },
    ],
    [messages, locale],
  );

  const {onFetchData, data, loading, pageCount, totalCount} =
    useReactTableFetchData({
      urlPath: API_BATCHES,
    });

  return (
    <>
      <PageBlock
        title={
          <>
            <IconBatch /> <IntlMessages id='batches.label' />
          </>
        }
        extra={[
          <AddButton
            key={1}
            onClick={() => openAddEditModal(null)}
            isLoading={loading}
            tooltip={
              <IntlMessages
                id={'common.add_new'}
                values={{
                  subject: messages['batches.label'],
                }}
              />
            }
          />,
        ]}>
        <ReactTable
          columns={columns}
          data={data}
          fetchData={onFetchData}
          loading={loading || isProcessing}
          pageCount={pageCount}
          totalCount={totalCount}
          toggleResetTable={isToggleTable}
        />
        {isOpenAddEditModal && (
          <BatchAddEditPopup
            key={1}
            onClose={closeAddEditModal}
            itemId={selectedItemId}
            refreshDataTable={refreshDataTable}
          />
        )}

        {isOpenDetailsModal && selectedItemId && (
          <BatchDetailsPopup
            key={1}
            itemId={selectedItemId}
            onClose={closeDetailsModal}
            openEditModal={openAddEditModal}
          />
        )}

        {isOpenImportModal && courseId && selectedItemId && (
          <CourseEnrollmentPopup
            key={2}
            courseId={courseId}
            batchId={selectedItemId}
            onClose={closeImportModal}
            userData={null}
            refreshDataTable={refreshDataTable}
          />
        )}

        {isOpenExamAssignModal && selectedItemId && (
          <ExamAssignToBatchPopup
            key={3}
            batchId={selectedItemId}
            onClose={closeExamAssignModal}
          />
        )}
      </PageBlock>
    </>
  );
};

export default BatchesPage;
