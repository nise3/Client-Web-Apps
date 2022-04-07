import React, {useCallback, useMemo, useState} from 'react';
import {useIntl} from 'react-intl';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DeleteButton from '../../../@softbd/elements/button/DeleteButton/DeleteButton';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import AddButton from '../../../@softbd/elements/button/AddButton/AddButton';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import GalleryAlbumContentsPageAddEditPopup from './GalleryAlbumContentsPageAddEditPopup';
import GalleryAlbumContentDetailsPopup from './GalleryAlbumContentDetailsPopup';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {
  getCalculatedSerialNo,
  isResponseSuccess,
} from '../../../@softbd/utilities/helpers';
import IconVideo from '../../../@softbd/icons/IconVideo';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {API_GALLERY_ALBUM_CONTENTS} from '../../../@softbd/common/apiRoutes';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';
import {deleteGalleryAlbumContent} from '../../../services/cmsManagement/GalleryAlbumContentService';
import {ISelectFilterItem} from '../../../shared/Interface/common.interface';
import GalleryAlbumContentTypes from './GalleryAlbumContentTypes';

const GalleryAlbumContentsPage = () => {
  const {messages, locale} = useIntl();
  const {successStack} = useNotiStack();
  const [contentTypeFilterItems] = useState<Array<ISelectFilterItem>>([
    {
      id: GalleryAlbumContentTypes.IMAGE,
      title: messages['common.image'] as string,
    },
    {
      id: GalleryAlbumContentTypes.VIDEO,
      title: messages['common.video'] as string,
    },
  ]);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
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

  const deleteGalleryAlbumContentItem = async (itemId: number) => {
    let response = await deleteGalleryAlbumContent(itemId);
    if (isResponseSuccess(response)) {
      successStack(
        <IntlMessages
          id='common.subject_deleted_successfully'
          values={{subject: <IntlMessages id='gallery_album_content.label' />}}
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
        Header: messages['common.content_type'],
        accessor: 'content_type',
        filter: 'selectFilter',
        selectFilterItems: contentTypeFilterItems,
        Cell: (props: any) => {
          let data = props.row.original;
          if (data.content_type === GalleryAlbumContentTypes.IMAGE) {
            return <p>{messages['common.image']}</p>;
          } else if (data.content_type === GalleryAlbumContentTypes.VIDEO) {
            return <p>{messages['common.video']}</p>;
          } else {
            return '';
          }
        },
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
        Header: messages['gallery_album.featured_status'],
        Cell: (props: any) => {
          let data = props.row.original;
          if (data.featured === 0) {
            return <p>{messages['common.no']}</p>;
          } else if (data.featured === 1) {
            return <p>{messages['common.yes']}</p>;
          } else {
            return <p>none</p>;
          }
        },
      },
      {
        Header: messages['common.status'],
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
                deleteAction={() => deleteGalleryAlbumContentItem(data.id)}
                deleteTitle='Are you sure?'
              />
            </DatatableButtonGroup>
          );
        },
        sortable: false,
      },
    ];
  }, [messages, locale]);

  const {data, loading, pageCount, totalCount, onFetchData} =
    useReactTableFetchData({
      urlPath: API_GALLERY_ALBUM_CONTENTS,
    });

  return (
    <>
      <PageBlock
        title={
          <>
            <IconVideo /> <IntlMessages id='gallery_album_content.label' />
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
                  subject: messages['common.gallery_album'],
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
          <GalleryAlbumContentsPageAddEditPopup
            key={1}
            onClose={closeAddEditModal}
            itemId={selectedItemId}
            refreshDataTable={refreshDataTable}
          />
        )}

        {isOpenDetailsModal && selectedItemId && (
          <GalleryAlbumContentDetailsPopup
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

export default GalleryAlbumContentsPage;
