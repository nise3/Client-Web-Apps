import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
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
import { API_BATCHES } from '../../../@softbd/common/apiRoutes';
import { deleteBatch } from '../../../services/instituteManagement/BatchService';
import IconBatch from '../../../@softbd/icons/IconBatch';
import BatchAddEditPopup from './BatchAddEditPopup';
import BatchDetailsPopup from './BatchDetailsPopup';
import CommonButton from '../../../@softbd/elements/button/CommonButton/CommonButton';
import { FiUserCheck } from 'react-icons/fi';
import Link from 'next/link';
import { useRouter } from 'next/router';
import LocaleLanguage from '../../../@softbd/utilities/LocaleLanguage';
import CerrtificateTemplatePopup from './CertificateTemplateAddEditPopup';

const BatchesPage = () => {
  const { messages, locale } = useIntl();
  const { successStack } = useNotiStack();
  const router = useRouter();
  const path = router.pathname;

  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const [isOpenAddEditTemplateModal, setIsOpenAddEditTemplateModal] = useState(false);

  const [isToggleTable, setIsToggleTable] = useState<boolean>(false);

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

  const openDetailsTemplateModal = useCallback((itemId: number) => {
    setIsOpenAddEditTemplateModal(true);
    setSelectedItemId(itemId);
  }, []);

  const closeDetailsTemplateModal = useCallback(() => {
    setIsOpenAddEditTemplateModal(false);
  }, []);

  const deleteBatchItem = async (itemId: number) => {
    let response = await deleteBatch(itemId);
    if (isResponseSuccess(response)) {
      successStack(
        <IntlMessages
          id='common.subject_deleted_successfully'
          values={{ subject: <IntlMessages id='batches.label' /> }}
        />,
      );

      refreshDataTable();
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
        filter: 'dateTimeFilter',
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <span>{getMomentDateFormat(data?.registration_start_date)}</span>
          );
        },
      },
      {
        Header: messages['batches.registration_end_date'],
        accessor: 'registration_end_date',
        filter: 'dateTimeFilter',
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <span>{getMomentDateFormat(data?.registration_end_date)}</span>
          );
        },
      },
      {
        Header: messages['batches.start_date'],
        accessor: 'batch_start_date',
        filter: 'dateTimeFilter',
        isVisible: false,
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
        Cell: (props: any) => {
          let data = props.row.original;
          return <span>{getMomentDateFormat(data?.batch_end_date)}</span>;
        },
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
              <EditButton onClick={() => openAddEditModal(data.id)} />
              <DeleteButton
                deleteAction={() => deleteBatchItem(data.id)}
                deleteTitle='Are you sure?'
              />
              <CommonButton
                btnText='common.certificate_template'
                style={{ marginLeft: '10px' }}
                variant='outlined'
                onClick={() => openDetailsTemplateModal(data.id)}
                color='primary'
              />
              {data.certificate_id &&
                <Link href={`${path}/${data?.id}/certificates/certificate-issue`} passHref={true}>
                  <CommonButton
                    btnText='certificate.certificate_issue'
                    startIcon={<FiUserCheck style={{ marginLeft: '5px' }} />}
                    style={{ marginLeft: '10px' }}
                    variant='outlined'
                    color='primary'
                  />
                </Link>
              }

            </DatatableButtonGroup>
          );
        },
        sortable: false,
      },
    ],
    [messages, locale],
  );

  const { onFetchData, data, loading, pageCount, totalCount } =
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
          loading={loading}
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
            itemId={selectedItemId}
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
      </PageBlock>
    </>
  );
};

export default BatchesPage;
