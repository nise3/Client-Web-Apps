import { DownloadIcon } from '@heroicons/react/outline';
import { Add, Visibility } from '@mui/icons-material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useMemo, useState } from 'react';
import { FiUserCheck } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import { apiGet } from '../../../@softbd/common/api';
import { API_BATCHES, API_COURSE_ENROLLMENTS } from '../../../@softbd/common/apiRoutes';
import AddButton from '../../../@softbd/elements/button/AddButton/AddButton';
import CommonButton from '../../../@softbd/elements/button/CommonButton/CommonButton';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import DeleteButton from '../../../@softbd/elements/button/DeleteButton/DeleteButton';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import IconBatch from '../../../@softbd/icons/IconBatch';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import {
  getCalculatedSerialNo,
  getMomentDateFormat,
  isResponseSuccess
} from '../../../@softbd/utilities/helpers';
import LocaleLanguage from '../../../@softbd/utilities/LocaleLanguage';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import { createCertificateById } from '../../../services/CertificateAuthorityManagement/CertificateService';
import {
  deleteBatch,
  processResult
} from '../../../services/instituteManagement/BatchService';
import { ICertificateBatchSetting } from '../../../shared/Interface/certificates';
import BatchAddEditPopup from './BatchAddEditPopup';
import BatchDetailsPopup from './BatchDetailsPopup';
import CerrtificateTemplatePopup from './CertificateTemplateAddEditPopup';
import CourseEnrollmentPopup from './CourseEnrollmentPopup';
import ExamAssignToBatchPopup from './ExamAssignToBatchPopup';

const BatchesPage = () => {
  const {messages, locale} = useIntl();
  const {successStack, errorStack} = useNotiStack();
  const router = useRouter();
  const path = router.pathname;

  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  // const [courseId, setCourseId] = useState<number>();

  const [selectedBatchItem, setSelectedBatchItem] =
    useState<ICertificateBatchSetting | null>(null);
  const [courseId, setCourseId] = useState<number>();

  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const [isOpenAddEditTemplateModal, setIsOpenAddEditTemplateModal] =
    useState(false);

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

  const openDetailsTemplateModal = useCallback(
    (item: ICertificateBatchSetting) => {
      const certificateId = item.certificate_id as number;
      if (certificateId) {
        createCertificateById(certificateId).then((res: any) => {
          setIsOpenAddEditTemplateModal(true);
          item.certificate_type = res?.data?.result_type;

          setSelectedBatchItem(item);
        });
      } else {
        setSelectedBatchItem(item);
        setIsOpenAddEditTemplateModal(true);
      }

      // const certificate = certificatesList.find(item=> item.id === certificateId);
    },
    [],
  );
  const closeDetailsTemplateModal = useCallback(() => {
    setSelectedBatchItem(null);
    setIsOpenAddEditTemplateModal(false);
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

  const processBatchResult = async (itemId: number) => {
    try {
      setIsProcessing(true);
      let response = await processResult(itemId);
      if (isResponseSuccess(response)) {
        successStack(messages['batch.process_result_success']);
        refreshDataTable();
      } else {
        let msg = 'Failed to process result';
        let error_code = response?.data.error_code;
        if (error_code == 'no_exams') {
          msg = 'No exams to process results';
        } else if (error_code == 'already_published') {
          msg = 'Results already published';
        } else if (error_code == 'no_config') {
          msg = 'No result config configured for course';
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
        Header: messages['training_center.label'],
        accessor: 'training_center_title',
        isVisible: locale == LocaleLanguage.BN,
      },
      {
        Header: messages['training_center.label'],
        accessor: 'training_center_title_en',
        isVisible: locale == LocaleLanguage.EN,
      },
      {
        Header: messages['training_center.label'],
        accessor: 'training_center_title',
        isVisible: locale == LocaleLanguage.BN,
      },
      {
        Header: messages['training_center.label'],
        accessor: 'training_center_title_en',
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
                btnText='common.certificate_template'
                style={{marginLeft: '10px'}}
                variant='outlined'
                onClick={() => openDetailsTemplateModal(data)}
                color='primary'
              />
              {
                data.certificate_id &&
                <CommonButton
                  btnText='certificate.certificate_issue'
                  startIcon={<FiUserCheck style={{ marginLeft: '5px' }} />}
                  style={{ marginLeft: '10px' }}
                  variant='outlined'
                  color='primary'
                  onClick={() => {
                    const params: any = { batch_id: data.id };
                    console.log(params)
                    apiGet(API_COURSE_ENROLLMENTS, { params })
                      .then(res => {
                        const dta = res.data.data;
                        if (dta && dta.length > 0) {
                          router.push(`${path}/${data?.id}/certificates/certificate-issue`)
                        } else {
                          errorStack(
                            <IntlMessages
                              id='common.no_data_found_dynamic'
                              values={{ messageType: <IntlMessages id='common.youth' /> }}
                            />
                          )
                        }
                      })
                  }}
                />
              }


              <CommonButton
                key={2}
                onClick={() => openImportModal(data?.course_id, data?.id)}
                btnText={messages['common.import'] as string}
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
              {!data.result_published_at && (
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
        {isOpenAddEditTemplateModal && (
          <CerrtificateTemplatePopup
            key={1}
            onClose={closeDetailsTemplateModal}
            refreshDataTable={refreshDataTable}
            // @ts-ignore
            batch={selectedBatchItem}
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
