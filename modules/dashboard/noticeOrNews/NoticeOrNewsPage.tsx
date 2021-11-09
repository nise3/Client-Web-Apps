import {useIntl} from 'react-intl';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import React, {useCallback, useMemo, useState} from 'react';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {CMS_NOTICE_OR_NEWS} from '../../../@softbd/common/apiRoutes';
import {isResponseSuccess} from '../../../@softbd/utilities/helpers';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {deleteNoticeOrNews} from '../../../services/cmsManagement/NoticeOrNewsService';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DeleteButton from '../../../@softbd/elements/button/DeleteButton/DeleteButton';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import AddButton from '../../../@softbd/elements/button/AddButton/AddButton';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import NoticeOrNewsAddEditPopup from './NoticeOrNewsAddEditPopup';
import NoticeOrNewsDetailsPopup from './NoticeOrNewsDetailsPopup';

const newsOrNoticetype: any = {
  1: 'Notice',
  2: 'News',
};

const showIn: any = {
  1: 'NISE3',
  2: 'YOUTH',
  3: 'TSP',
  4: 'INDUSTRY',
};

const NoticeOrNewsPage = () => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const [isToggleTable, setIsToggleTable] = useState<boolean>(false);

  const {data, loading, pageCount, totalCount, onFetchData} =
    useReactTableFetchData({urlPath: CMS_NOTICE_OR_NEWS});

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

  const refreshDataTable = useCallback(() => {
    setIsToggleTable((previousToggle) => !previousToggle);
  }, []);

  const deleteNoticeOrNewsItem = async (itemId: number) => {
    let response = await deleteNoticeOrNews(itemId);
    if (isResponseSuccess(response)) {
      successStack(
        <IntlMessages
          id='common.subject_deleted_successfully'
          values={{subject: <IntlMessages id='common.notice_or_news' />}}
        />,
      );
      await refreshDataTable();
    }
  };

  const columns = useMemo(() => {
    return [
      {
        Header: '#',
        Cell: (props: any) => {
          return props.row.index + 1;
        },
        disableFilters: true,
        disableSortBy: true,
      },
      {
        Header: messages['common.title'],
        accessor: 'title',
      },
      {
        Header: messages['common.type'],
        Cell: (props: any) => {
          let data = props.row.original?.type;
          return data in newsOrNoticetype ? newsOrNoticetype[data] : '';
        },
      },
      {
        Header: messages['common.institute_id'],
        accessor: 'institute_id',
        isVisible: false,
      },
      {
        Header: messages['common.organization_id'],
        accessor: 'organization_id',
        isVisible: false,
      },
      {
        Header: messages['common.details'],
        accessor: 'details',
        isVisible: false,
      },
      {
        Header: messages['common.main_image_path'],
        accessor: 'main_image_path',
      },
      {
        Header: messages['common.grid_image_path'],
        accessor: 'grid_image_path',
      },
      {
        Header: messages['common.thumb_image_path'],
        accessor: 'thumb_image_path',
      },
      {
        Header: messages['common.file_path'],
        accessor: 'file_path',
      },
      {
        Header: messages['common.image_alt_title'],
        accessor: 'image_alt_title',
        isVisible: false,
      },
      {
        Header: messages['common.show_in'],
        Cell: (props: any) => {
          let data = props.row.original?.show_in;
          return data in showIn ? showIn[data] : '';
        },
      },
      {
        Header: messages['common.file_alt_title'],
        accessor: 'file_alt_title',
      },
      {
        Header: messages['common.active_status'],
        accessor: 'row_status',
        filter: 'rowStatusFilter',
        Cell: (props: any) => {
          let data = props.row.original;
          return <CustomChipRowStatus value={data?.row_status} />;
        },
      },
      // {
      //   Header: messages['common.other_language_fields'],
      //   accessor: 'other_language_fields',
      // },
      {
        Header: messages['common.actions'],
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <DatatableButtonGroup>
              <ReadButton onClick={() => openDetailsModal(data.id)} />
              <EditButton onClick={() => openAddEditModal(data.id)} />
              <DeleteButton
                deleteAction={() => deleteNoticeOrNewsItem(data.id)}
                deleteTitle='Are you sure?'
              />
            </DatatableButtonGroup>
          );
        },
        sortable: false,
      },
    ];
  }, [messages]);

  return (
    <>
      <PageBlock
        title={<IntlMessages id='common.notice_or_news' />}
        extra={[
          <AddButton
            key={1}
            onClick={() => openAddEditModal(null)}
            isLoading={loading}
            tooltip={
              <IntlMessages
                id={'common.add_new'}
                values={{
                  subject: messages['common.notice_or_news'],
                }}
              />
            }
          />,
        ]}>
        <ReactTable
          columns={columns}
          data={data}
          loading={loading}
          toggleResetTable={isToggleTable}
          fetchData={onFetchData}
          pageCount={pageCount}
          totalCount={totalCount}
        />
        {isOpenAddEditModal && (
          <NoticeOrNewsAddEditPopup
            key={1}
            onClose={closeAddEditModal}
            refreshDataTable={refreshDataTable}
            itemId={selectedItemId}
          />
        )}
        {isOpenDetailsModal && selectedItemId && (
          <NoticeOrNewsDetailsPopup
            key={1}
            onClose={closeDetailsModal}
            openEditModal={openAddEditModal}
            itemId={selectedItemId}
          />
        )}
      </PageBlock>
    </>
  );
};

export default NoticeOrNewsPage;
