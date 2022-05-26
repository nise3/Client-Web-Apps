import React, {useCallback, useMemo, useState} from 'react';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import AddButton from '../../../@softbd/elements/button/AddButton/AddButton';
import {useIntl} from 'react-intl';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DeleteButton from '../../../@softbd/elements/button/DeleteButton/DeleteButton';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import FourIROccupationAddEditPopup from './FourIROccupationAddEditPopup';
import FourIROccupationDetailsPopup from './FourIROccupationDetailsPopup';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {isResponseSuccess} from '../../../@softbd/utilities/helpers';
import IconSkill from '../../../@softbd/icons/IconSkill';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';
import {useFetchFourIROccupations} from '../../../services/4IRManagement/hooks';
import {deleteFourIROccupation} from '../../../services/4IRManagement/OccupationService';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';

const FourIROccupationPage = () => {
  const {messages} = useIntl();
  const {successStack, errorStack} = useNotiStack();

  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const [occupationsFilters] = useState({});
  const {
    data: occupations,
    isLoading: isLoadingOccupations,
    mutate: mutateOccupations,
  } = useFetchFourIROccupations(occupationsFilters);

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

  const deleteOccupationItem = async (occupationId: number) => {
    try {
      let response = await deleteFourIROccupation(occupationId);
      if (isResponseSuccess(response)) {
        successStack(
          <IntlMessages
            id='common.subject_deleted_successfully'
            values={{subject: <IntlMessages id='menu.occupations' />}}
          />,
        );
        refreshDataTable();
      }
    } catch (error: any) {
      processServerSideErrors({
        error,
        errorStack,
      });
    }
  };

  const refreshDataTable = useCallback(() => {
    mutateOccupations();
  }, [mutateOccupations]);

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
        Header: messages['common.title_en'],
        accessor: 'title_en',
        inVisible: false,
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
                deleteAction={() => deleteOccupationItem(data.id)}
                deleteTitle={messages['common.delete_confirm'] as string}
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
            <IconSkill /> <IntlMessages id='menu.occupations' />
          </>
        }
        extra={[
          <AddButton
            key={1}
            onClick={() => openAddEditModal(null)}
            isLoading={isLoadingOccupations}
            tooltip={
              <IntlMessages
                id={'common.add_new'}
                values={{
                  subject: messages['menu.occupations'],
                }}
              />
            }
          />,
        ]}>
        <ReactTable
          columns={columns}
          data={occupations || []}
          loading={isLoadingOccupations}
          skipDefaultFilter={true}
        />
        {isOpenAddEditModal && (
          <FourIROccupationAddEditPopup
            key={1}
            onClose={closeAddEditModal}
            itemId={selectedItemId}
            refreshDataTable={refreshDataTable}
          />
        )}

        {isOpenDetailsModal && selectedItemId && (
          <FourIROccupationDetailsPopup
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

export default FourIROccupationPage;
