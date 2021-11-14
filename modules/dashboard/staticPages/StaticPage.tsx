import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import AddButton from '../../../@softbd/elements/button/AddButton/AddButton';
import {useIntl} from 'react-intl';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DeleteButton from '../../../@softbd/elements/button/DeleteButton/DeleteButton';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import StaticPageDetailsPopup from './StaticPageDetailsPopup';
import StaticPageAddEditPopup from './StaticPageAddEditPopup';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {isResponseSuccess} from '../../../@softbd/utilities/helpers';
import {deleteStaticPage} from '../../../services/cmsManagement/StaticPageService';
import IconStaticPage from '../../../@softbd/icons/IconStaticPage';
import {useFetchStaticPages} from '../../../services/cmsManagement/hooks';
import ContentTypes from '../recentActivities/ContentTypes';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {CommonAuthUser} from '../../../redux/types/models/CommonAuthUser';

const StaticPage = () => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();
  const authUser = useAuthUser<CommonAuthUser>();

  const [staticPagesFilters, setStaticPagesFilters] = useState({});
  const {
    data: staticPages,
    isLoading,
    mutate: mutateStaticPages,
  }: any = useFetchStaticPages(staticPagesFilters);

  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);

  useEffect(() => {
    if (authUser) {
      if (authUser.isInstituteUser) {
        setStaticPagesFilters({
          institute_id: authUser.institute_id,
        });
      } else if (authUser.isOrganizationUser) {
        setStaticPagesFilters({
          organization_id: authUser.organization_id,
        });
      }
    }
  }, [authUser]);

  const closeAddEditModal = useCallback(() => {
    setIsOpenAddEditModal(false);
    setSelectedItemId(null);
  }, []);

  const openAddEditModal = useCallback((itemId: number | null = null) => {
    setIsOpenDetailsModal(false);
    setIsOpenAddEditModal(true);
    setSelectedItemId(itemId);
  }, []);

  const openDetailsModal = useCallback(
    (itemId: number) => {
      setIsOpenDetailsModal(true);
      setSelectedItemId(itemId);
    },
    [selectedItemId],
  );

  const closeDetailsModal = useCallback(() => {
    setIsOpenDetailsModal(false);
  }, []);

  const deleteStaticPageItem = async (itemId: number) => {
    let response = await deleteStaticPage(itemId);
    if (isResponseSuccess(response)) {
      successStack(
        <IntlMessages
          id='common.subject_deleted_successfully'
          values={{subject: <IntlMessages id='static_page.label' />}}
        />,
      );

      await refreshDataTable();
    }
  };

  const refreshDataTable = useCallback(() => {
    mutateStaticPages();
  }, [mutateStaticPages]);

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

  const columns = useMemo(
    () => [
      {
        Header: '#',
        disableFilters: true,
        disableSortBy: true,
        Cell: (props: any) => {
          return props.row.index + 1;
        },
      },

      {
        Header: messages['common.title'],
        accessor: 'title',
      },
      {
        Header: messages['common.sub_title'],
        accessor: 'sub_title',
        isVisible: false,
      },
      {
        Header: messages['common.show_in'],
        accessor: 'show_in',
        isVisible: false,
      },
      {
        Header: messages['common.content_slug_or_id'],
        accessor: 'content_slug_or_id',
        isVisible: false,
      },
      {
        Header: messages['institute.label'],
        accessor: 'institute_id',
        isVisible: false,
      },
      {
        Header: messages['organization.label'],
        accessor: 'organization_id',
        isVisible: false,
      },
      {
        Header: messages['organization_association.label'],
        accessor: 'organization_association_id',
        isVisible: false,
      },
      {
        Header: messages['common.content_type'],
        Cell: (props: any) => {
          return getContentTypeTitle(props.row.original.content_type);
        },
      },
      {
        Header: messages['common.content'],
        accessor: 'content',
        isVisible: false,
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
                deleteAction={() => deleteStaticPageItem(data.id)}
                deleteTitle={'Are you sure?'}
              />
            </DatatableButtonGroup>
          );
        },
        sortable: false,
      },
    ],
    [messages],
  );

  return (
    <>
      <PageBlock
        title={
          <>
            <IconStaticPage /> <IntlMessages id='static_page.label' />
          </>
        }
        extra={[
          <AddButton
            key={1}
            onClick={() => openAddEditModal(null)}
            isLoading={isLoading}
            tooltip={
              <IntlMessages
                id={'common.add_new'}
                values={{
                  subject: messages['static_page.label'],
                }}
              />
            }
          />,
        ]}>
        <ReactTable
          columns={columns}
          data={staticPages || []}
          loading={isLoading}
        />
        {isOpenAddEditModal && (
          <StaticPageAddEditPopup
            key={1}
            onClose={closeAddEditModal}
            itemId={selectedItemId}
            refreshDataTable={refreshDataTable}
          />
        )}

        {isOpenDetailsModal && selectedItemId && (
          <StaticPageDetailsPopup
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

export default StaticPage;
