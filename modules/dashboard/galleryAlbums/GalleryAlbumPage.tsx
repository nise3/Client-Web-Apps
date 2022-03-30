import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useIntl} from 'react-intl';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DeleteButton from '../../../@softbd/elements/button/DeleteButton/DeleteButton';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import AddButton from '../../../@softbd/elements/button/AddButton/AddButton';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import GalleryAlbumAddEditPopup from './GalleryAlbumAddEditPopup';
import GalleryAlbumDetailsPopup from './GalleryAlbumDetailsPopup';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {isResponseSuccess} from '../../../@softbd/utilities/helpers';
import IconVideo from '../../../@softbd/icons/IconVideo';
import {deleteGalleryAlbum} from '../../../services/cmsManagement/GalleryAlbumService';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {API_GALLERY_ALBUMS} from '../../../@softbd/common/apiRoutes';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';
import AlbumTypes from './AlbumTypes';
import {useFetchCMSGlobalConfig} from '../../../services/cmsManagement/hooks';
import {ISelectFilterItem} from '../../../shared/Interface/common.interface';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {CommonAuthUser} from '../../../redux/types/models/CommonAuthUser';

const GalleryAlbumPage = () => {
  const {messages, locale} = useIntl();
  const {successStack} = useNotiStack();
  const authUser = useAuthUser<CommonAuthUser>();
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const [isToggleTable, setIsToggleTable] = useState<boolean>(false);
  const [albumTypeFilterItems, setAlbumTypeFilterItems] = useState<Array<any>>(
    [],
  );
  const {data: cmsGlobalConfig} = useFetchCMSGlobalConfig();
  const [showInFilterItems, setShowInFilterItems] = useState<
    Array<ISelectFilterItem>
  >([]);
  const albumTypes = useMemo(
    () => [
      {
        id: AlbumTypes.IMAGE,
        label: messages['album_type.image'],
      },
      {
        id: AlbumTypes.VIDEO,
        label: messages['album_type.video'],
      },
      {
        id: AlbumTypes.MIXED,
        label: messages['album_type.mixed'],
      },
    ],
    [messages],
  );

  useEffect(() => {
    if (cmsGlobalConfig) {
      setShowInFilterItems(
        cmsGlobalConfig?.show_in.map((showIntype: any) => {
          return {
            id: showIntype.id,
            title: showIntype.title,
          };
        }),
      );
    }
  }, [cmsGlobalConfig]);

  useEffect(() => {
    setAlbumTypeFilterItems(
      albumTypes.map((type) => {
        return {
          id: type.id,
          title: type.label,
        };
      }),
    );
  }, [albumTypes]);

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

  const deleteGalleryItem = async (itemId: number) => {
    let response = await deleteGalleryAlbum(itemId);
    if (isResponseSuccess(response)) {
      successStack(
        <IntlMessages
          id='common.subject_deleted_successfully'
          values={{subject: <IntlMessages id='common.gallery_album' />}}
        />,
      );
      await refreshDataTable();
    }
  };

  const refreshDataTable = useCallback(() => {
    setIsToggleTable((previousToggle) => !previousToggle);
  }, []);

  const getAlbumTypeTitle = (albumType: number) => {
    switch (albumType) {
      case AlbumTypes.IMAGE:
        return messages['album_type.image'];
      case AlbumTypes.VIDEO:
        return messages['album_type.video'];
      case AlbumTypes.MIXED:
        return messages['album_type.mixed'];
      default:
        return '';
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
        Header: messages['common.published_at'],
        accessor: 'published_at',
        filter: 'dateTimeFilter',
      },
      {
        Header: messages['common.archived_at'],
        accessor: 'archived_at',
        filter: 'dateTimeFilter',
      },
      {
        Header: messages['gallery_album.album_type'],
        accessor: 'album_type',
        filter: 'selectFilter',
        selectFilterItems: albumTypeFilterItems,
        Cell: (props: any) => {
          return getAlbumTypeTitle(props.row.original.album_type);
        },
      },
      {
        Header: messages['common.show_in'],
        accessor: 'show_in',
        disableFilters: !authUser?.isSystemUser,
        filter: authUser?.isSystemUser ? 'selectFilter' : null,
        selectFilterItems: authUser?.isSystemUser ? showInFilterItems : [],
        Cell: (props: any) => {
          return props.row.original.show_in_label;
        },
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
                deleteAction={() => deleteGalleryItem(data.id)}
                deleteTitle='Are you sure?'
              />
            </DatatableButtonGroup>
          );
        },
        sortable: false,
      },
    ];
  }, [messages, locale, showInFilterItems]);

  const {data, loading, pageCount, totalCount, onFetchData} =
    useReactTableFetchData({
      urlPath: API_GALLERY_ALBUMS,
    });

  return (
    <>
      <PageBlock
        title={
          <>
            <IconVideo /> <IntlMessages id='galleries.institute' />
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
          <GalleryAlbumAddEditPopup
            key={1}
            onClose={closeAddEditModal}
            itemId={selectedItemId}
            refreshDataTable={refreshDataTable}
          />
        )}

        {isOpenDetailsModal && selectedItemId && (
          <GalleryAlbumDetailsPopup
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

export default GalleryAlbumPage;
