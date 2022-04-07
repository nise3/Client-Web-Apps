import {useIntl} from 'react-intl';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {API_NOTICE_OR_NEWSES} from '../../../@softbd/common/apiRoutes';
import {
  getCalculatedSerialNo,
  isResponseSuccess,
} from '../../../@softbd/utilities/helpers';
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
import NoticeOrNewsTypes from '../../../@softbd/utilities/NoticeOrNewsTypes';
import IconStaticPage from '../../../@softbd/icons/IconStaticPage';
import {ISelectFilterItem} from '../../../shared/Interface/common.interface';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {CommonAuthUser} from '../../../redux/types/models/CommonAuthUser';
import {useFetchCMSGlobalConfig} from '../../../services/cmsManagement/hooks';

const NoticeOrNewsPage = () => {
  const {messages, locale} = useIntl();
  const {successStack} = useNotiStack();
  const authUser = useAuthUser<CommonAuthUser>();
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const [isToggleTable, setIsToggleTable] = useState<boolean>(false);

  const [typeFilterItems] = useState<Array<ISelectFilterItem>>([
    {
      id: NoticeOrNewsTypes.NOTICE,
      title: messages['notice_type.notice'] as string,
    },
    {
      id: NoticeOrNewsTypes.NEWS,
      title: messages['notice_type.news'] as string,
    },
  ]);
  const [showInFilterItems, setShowInFilterItems] = useState<
    Array<ISelectFilterItem>
  >([]);

  const {data: cmsGlobalConfig} = useFetchCMSGlobalConfig();

  useEffect(() => {
    if (cmsGlobalConfig) {
      setShowInFilterItems(
        cmsGlobalConfig?.show_in.map((showInType: any) => {
          return {
            id: showInType.id,
            title: showInType.title,
          };
        }),
      );
    }
  }, [cmsGlobalConfig]);

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
      refreshDataTable();
    }
  };

  const getNoticeOrNewsTitle = (type: number) => {
    switch (type) {
      case NoticeOrNewsTypes.NOTICE:
        return messages['notice_type.notice'];
      case NoticeOrNewsTypes.NEWS:
        return messages['notice_type.news'];
      default:
        return '';
    }
  };

  const columns = useMemo(() => {
    return [
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
      },
      {
        Header: messages['common.published_at'],
        accessor: 'published_at',
        filter: 'dateTimeFilter',
        isVisible: false,
      },
      {
        Header: messages['common.archived_at'],
        accessor: 'archived_at',
        filter: 'dateTimeFilter',
        isVisible: false,
      },
      {
        Header: messages['common.type'],
        accessor: 'type',
        filter: 'selectFilter',
        selectFilterItems: typeFilterItems,
        Cell: (props: any) => {
          return getNoticeOrNewsTitle(props.row.original?.type);
        },
      },

      {
        Header: messages['common.details'],
        accessor: 'details',
        isVisible: false,
        disableFilters: true,
      },
      {
        Header: messages['common.show_in'],
        accessor: 'show_in',
        isVisible: authUser?.isSystemUser,
        disableFilters: !authUser?.isSystemUser ? true : false,
        filter: authUser?.isSystemUser ? 'selectFilter' : null,
        selectFilterItems: authUser?.isSystemUser ? showInFilterItems : [],
        Cell: (props: any) => {
          return props.row.original.show_in_label;
        },
      },
      {
        Header: messages['common.active_status'],
        accessor: 'row_status',
        disableFilters: true,
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
                deleteAction={() => deleteNoticeOrNewsItem(data.id)}
                deleteTitle='Are you sure?'
              />
            </DatatableButtonGroup>
          );
        },
        sortable: false,
      },
    ];
  }, [messages, locale, typeFilterItems, showInFilterItems]);

  const {data, loading, pageCount, totalCount, onFetchData} =
    useReactTableFetchData({
      urlPath: API_NOTICE_OR_NEWSES,
    });

  return (
    <>
      <PageBlock
        title={
          <>
            <IconStaticPage />
            <IntlMessages id='common.notice_or_news' />
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
