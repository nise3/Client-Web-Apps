import React, {useCallback, useMemo, useState} from 'react';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import AddButton from '../../../@softbd/elements/button/AddButton/AddButton';
import {useIntl} from 'react-intl';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DeleteButton from '../../../@softbd/elements/button/DeleteButton/DeleteButton';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {isResponseSuccess} from '../../../@softbd/utilities/helpers';
import {useFetchPublications} from '../../../services/cmsManagement/hooks';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';
import LocaleLanguage from '../../../@softbd/utilities/LocaleLanguage';
import NisePublicationsAddEditPopup from './nisePublicationsAddEditPopup';
import NisePublicationsDetailsPopup from './nisePublicationsDetailsPopup';
import {Book} from '@mui/icons-material';
import {deletePublication} from '../../../services/cmsManagement/PublicationsService';

const NisePublicationsPage = () => {
  const {messages, locale} = useIntl();
  const {successStack} = useNotiStack();

  const [publicationsFilters] = useState({});
  const {
    data: publications,
    isLoading,
    mutate: mutatePublications,
  }: any = useFetchPublications(publicationsFilters);

  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);

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

  const deletePublicationItem = async (itemId: number) => {
    let response = await deletePublication(itemId);
    if (isResponseSuccess(response)) {
      successStack(
        <IntlMessages
          id='common.subject_deleted_successfully'
          values={{subject: <IntlMessages id='publication.label' />}}
        />,
      );

      await refreshDataTable();
    }
  };

  const refreshDataTable = useCallback(() => {
    mutatePublications();
  }, []);

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
        isVisible: locale == LocaleLanguage.BN,
      },
      {
        Header: messages['common.title_en'],
        accessor: 'title_en',
        isVisible: locale == LocaleLanguage.EN,
      },
      {
        Header: messages['publication.author'],
        accessor: 'author',
        isVisible: locale == LocaleLanguage.BN,
      },
      {
        Header: messages['publication.author_en'],
        accessor: 'author_en',
        disableFilters: true,
        disableSortBy: true,
        isVisible: locale == LocaleLanguage.EN,
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
                deleteAction={() => deletePublicationItem(data.id)}
                deleteTitle={messages['common.delete_confirm'] as string}
              />
            </DatatableButtonGroup>
          );
        },
        sortable: false,
      },
    ],
    [messages, locale],
  );

  return (
    <>
      <PageBlock
        title={
          <>
            <Book /> <IntlMessages id='publication.label' />
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
                  subject: messages['publication.label'],
                }}
              />
            }
          />,
        ]}>
        <ReactTable
          columns={columns}
          data={publications || []}
          loading={isLoading}
          skipDefaultFilter={true}
        />
        {isOpenAddEditModal && (
          <NisePublicationsAddEditPopup
            key={1}
            onClose={closeAddEditModal}
            itemId={selectedItemId}
            refreshDataTable={refreshDataTable}
          />
        )}

        {isOpenDetailsModal && selectedItemId && (
          <NisePublicationsDetailsPopup
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

export default NisePublicationsPage;
