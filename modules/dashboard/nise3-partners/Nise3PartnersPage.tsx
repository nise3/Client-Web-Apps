import React, {useCallback, useMemo, useState} from 'react';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import AddButton from '../../../@softbd/elements/button/AddButton/AddButton';
import {useIntl} from 'react-intl';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DeleteButton from '../../../@softbd/elements/button/DeleteButton/DeleteButton';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import Nise3PartnersDetailsPopup from './Nise3PartnersDetailsPopup';
import Nise3PartnersAddEditPopup from './Nise3PartnersAddEditPopup';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import IconJobSector from '../../../@softbd/icons/IconJobSector';
import {isResponseSuccess} from '../../../@softbd/utilities/helpers';
import {useFetchPartners} from '../../../services/cmsManagement/hooks';
import {deletePartner} from '../../../services/cmsManagement/PartnersService';

const Nise3PartnersPage = () => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();

  const [jobSectorFilters] = useState({});
  const {
    data: jobSectors,
    isLoading,
    mutate: mutateJobSectors,
  // }: any = useFetchJobSectors(jobSectorFilters);
  }: any = useFetchPartners(jobSectorFilters);

  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);

  const closeAddEditModal = useCallback(() => {
    setIsOpenAddEditModal(false);
    setSelectedItemId(null);
    mutateJobSectors();
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

  const deletePartnerItem = async (itemId: number) => {
    let response = await deletePartner(itemId);
    if (isResponseSuccess(response)) {
      successStack(
        <IntlMessages
          id='common.subject_deleted_successfully'
          values={{subject: <IntlMessages id='nise.partners' />}}
        />,
      );

      await refreshDataTable();
    }
  };

  const refreshDataTable = useCallback(() => {
    mutateJobSectors();
  }, [mutateJobSectors]);

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
        Header: messages['partner.grid_image_path'],
        accessor: 'grid_image_path',
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
                deleteAction={() => deletePartnerItem(data.id)}
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
            <IconJobSector /> <IntlMessages id='nise.partners' />
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
                  subject: messages['job_sectors.label'],
                }}
              />
            }
          />,
        ]}>
        <ReactTable
          columns={columns}
          data={jobSectors || []}
          loading={isLoading}
        />
        {isOpenAddEditModal && (
          <Nise3PartnersAddEditPopup
            key={1}
            onClose={closeAddEditModal}
            itemId={selectedItemId}
            refreshDataTable={refreshDataTable}
          />
        )}

        {isOpenDetailsModal && selectedItemId && (
          <Nise3PartnersDetailsPopup
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

export default Nise3PartnersPage;
