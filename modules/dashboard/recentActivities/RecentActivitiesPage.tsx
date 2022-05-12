import {useIntl} from 'react-intl';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  getCalculatedSerialNo,
  isResponseSuccess,
} from '../../../@softbd/utilities/helpers';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DeleteButton from '../../../@softbd/elements/button/DeleteButton/DeleteButton';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import AddButton from '../../../@softbd/elements/button/AddButton/AddButton';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {API_RECENT_ACTIVITIES} from '../../../@softbd/common/apiRoutes';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import RecentActivitiesAddEditPopup from './RecentActivitiesAddEditPopup';
import RecentActivitiesDetailsPopup from './RecentActivitiesDetailsPopup';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';
import {deleteRecentActivity} from '../../../services/cmsManagement/RecentActivityService';
import ContentTypes from './ContentTypes';
import IconVideo from '../../../@softbd/icons/IconVideo';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {CommonAuthUser} from '../../../redux/types/models/CommonAuthUser';
import {useFetchCMSGlobalConfig} from '../../../services/cmsManagement/hooks';
import {ISelectFilterItem} from '../../../shared/Interface/common.interface';

const RecentActivitiesPage = () => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();
  const authUser = useAuthUser<CommonAuthUser>();
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const [isToggleTable, setIsToggleTable] = useState<boolean>(false);
  const [showInFilterItems, setShowInFilterItems] = useState<
    Array<ISelectFilterItem>
  >([]);
  const [contentTypeFilterItems] = useState<Array<ISelectFilterItem>>([
    {id: ContentTypes.IMAGE, title: messages['common.image'] as string},
    {
      id: ContentTypes.YOUTUBE_SOURCE,
      title: messages['content_type.youtube_video'] as string,
    },
    {
      id: ContentTypes.FACEBOOK_SOURCE,
      title: messages['content_type.facebook_video'] as string,
    },
  ]);

  const {data, loading, pageCount, totalCount, onFetchData} =
    useReactTableFetchData({
      urlPath: API_RECENT_ACTIVITIES,
    });

  const {data: cmsGlobalConfig} = useFetchCMSGlobalConfig();

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

  const deleteRecentActivityItem = async (itemId: number) => {
    let response = await deleteRecentActivity(itemId);
    if (isResponseSuccess(response)) {
      successStack(
        <IntlMessages
          id='common.subject_deleted_successfully'
          values={{subject: <IntlMessages id='recent_activities.label' />}}
        />,
      );
      await refreshDataTable();
    }
  };
  const refreshDataTable = useCallback(() => {
    setIsToggleTable((previousToggle) => !previousToggle);
  }, []);

  const getContentTypeTitle = (contentType: number) => {
    switch (contentType) {
      case ContentTypes.IMAGE:
        return messages['content_type.image'];
      case ContentTypes.FACEBOOK_SOURCE:
        return messages['content_type.facebook_video'];
      case ContentTypes.YOUTUBE_SOURCE:
        return messages['content_type.youtube_video'];
      default:
        return '';
    }
  };
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
        Header: messages['common.content_type'],
        accessor: 'content_type',
        filter: 'selectFilter',
        selectFilterItems: contentTypeFilterItems,
        Cell: (props: any) => {
          return getContentTypeTitle(props.row.original.content_type);
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
                deleteAction={() => deleteRecentActivityItem(data.id)}
                deleteTitle='Are you sure?'
              />
            </DatatableButtonGroup>
          );
        },
        sortable: false,
      },
    ];
  }, [messages, showInFilterItems]);

  return (
    <>
      <PageBlock
        title={
          <>
            <IconVideo />
            <IntlMessages id='recent_activities.label' />
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
                  subject: messages['recent_activities.label'],
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
          <RecentActivitiesAddEditPopup
            key={1}
            onClose={closeAddEditModal}
            refreshDataTable={refreshDataTable}
            itemId={selectedItemId}
          />
        )}
        {isOpenDetailsModal && selectedItemId && (
          <RecentActivitiesDetailsPopup
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

export default RecentActivitiesPage;
