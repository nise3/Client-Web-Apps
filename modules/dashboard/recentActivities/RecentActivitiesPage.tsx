import {useIntl} from 'react-intl';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import React, {useCallback, useMemo, useState} from 'react';
import {isResponseSuccess} from '../../../@softbd/utilities/helpers';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DeleteButton from '../../../@softbd/elements/button/DeleteButton/DeleteButton';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import AddButton from '../../../@softbd/elements/button/AddButton/AddButton';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {CMS_RECENT_ACTIVITY} from '../../../@softbd/common/apiRoutes';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import RecentActivitiesAddEditPopup from './RecentActivitiesAddEditPopup';
import RecentActivitiesDetailsPopup from './RecentActivitiesDetailsPopup';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';
import {deleteRecentActivity} from '../../../services/cmsManagement/RecentActivityService';

const showIn: any = {
  1: 'NISE3',
  2: 'YOUTH',
  3: 'TSP',
  4: 'INDUSTRY',
};

const contentType: any = {
  1: 'Image',
  2: 'Facebook source',
  3: 'Youtube source',
};

const RecentActivitiesPage = () => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const [isToggleTable, setIsToggleTable] = useState<boolean>(false);

  const {data, loading, pageCount, totalCount, onFetchData} =
    useReactTableFetchData({urlPath: CMS_RECENT_ACTIVITY});

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
          values={{subject: <IntlMessages id='recent_activities.institute' />}}
        />,
      );
      await refreshDataTable();
    }
  };

  const refreshDataTable = useCallback(() => {
    setIsToggleTable((previousToggle) => !previousToggle);
  }, []);

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
        Header: messages['common.institute_id'],
        accessor: 'institute_id',
      },
      {
        Header: messages['common.organization_id'],
        accessor: 'organization_id',
      },
      {
        Header: messages['common.show_in'],
        Cell: (props: any) => {
          let data = props.row.original?.show_in;
          return data in showIn ? showIn[data] : '';
        },
      },
      {
        Header: messages['common.description'],
        accessor: 'description',
        isVisible: false,
      },
      {
        Header: messages['common.content_type'],
        Cell: (props: any) => {
          let data = props.row.original?.content_type;
          return data in contentType ? contentType[data] : '';
        },
      },

      {
        Header: messages['common.collage_image_path'],
        accessor: 'collage_image_path',
      },
      {
        Header: messages['common.collage_position'],
        accessor: 'collage_position',
        isVisible: false,
      },
      {
        Header: messages['common.thumb_image_path'],
        accessor: 'thumb_image_path',
        isVisible: false,
      },
      {
        Header: messages['common.grid_image_path'],
        accessor: 'grid_image_path',
        isVisible: false,
      },
      {
        Header: messages['common.image_alt_title'],
        accessor: 'image_alt_title',
        isVisible: false,
      },
      {
        Header: messages['common.content_path'],
        accessor: 'content_path',
        isVisible: false,
      },
      {
        Header: messages['common.content_properties'],
        accessor: 'content_properties',
      },
      {
        Header: messages['common.embedded_id'],
        accessor: 'embedded_id',
      },
      {
        Header: messages['common.embedded_url'],
        accessor: 'embedded_url',
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
                deleteAction={() => deleteRecentActivityItem(data.id)}
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
        title={<IntlMessages id='recent_activities.institute' />}
        extra={[
          <AddButton
            key={1}
            onClick={() => openAddEditModal(null)}
            isLoading={loading}
            tooltip={
              <IntlMessages
                id={'common.add_new'}
                values={{
                  subject: messages['recent_activities.institute'],
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
            recentActivityId={selectedItemId}
          />
        )}
        {isOpenDetailsModal && selectedItemId && (
          <RecentActivitiesDetailsPopup
            key={1}
            onClose={closeDetailsModal}
            openEditModal={openAddEditModal}
            recentActivityId={selectedItemId}
          />
        )}
      </PageBlock>
    </>
  );
};

export default RecentActivitiesPage;
