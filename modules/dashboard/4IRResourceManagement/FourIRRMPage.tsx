import React, {useCallback, useMemo, useState} from 'react';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import AddButton from '../../../@softbd/elements/button/AddButton/AddButton';
import {useIntl} from 'react-intl';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import FourIRRMAddEditPopup from './FourIRRMAddEditPopup';
import FourIRRMDetailsPopup from './FourIRRMDetailsPopup';
import IntlMessages from '../../../@crema/utility/IntlMessages';
//import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
//import {isResponseSuccess} from '../../../@softbd/utilities/helpers';
import IconSkill from '../../../@softbd/icons/IconSkill';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';
import {useFetchFourIRResources} from '../../../services/4IRManagement/hooks';

interface IFourIRRMPageProps {
  fourIRInitiativeId: number;
}

const FourIRRMPage = ({fourIRInitiativeId}: IFourIRRMPageProps) => {
  const {messages} = useIntl();
  //const {successStack} = useNotiStack();

  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const [resourcesFilters] = useState({});
  const {
    data: resources,
    isLoading: isLoadingResources,
    mutate: mutateResources,
  } = useFetchFourIRResources(resourcesFilters);

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

  /*const deleteOccupationItem = async (occupationId: number) => {
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
  };*/

  const refreshDataTable = useCallback(() => {
    mutateResources();
  }, [mutateResources]);

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
        Header: messages['4ir_rm.approval_status'],
        accessor: 'approval_status',
        filter: 'rowStatusFilter',
        Cell: (props: any) => {
          let data = props.row.original;
          return <CustomChipRowStatus value={data?.approval_status} />;
        },
      },
      {
        Header: messages['4ir_rm.budget_approval_status'],
        accessor: 'budget_approval_status',
        filter: 'rowStatusFilter',
        Cell: (props: any) => {
          let data = props.row.original;
          return <CustomChipRowStatus value={data?.budget_approval_status} />;
        },
      },
      {
        Header: messages['4ir_rm.given_budget'],
        accessor: 'given_budget',
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
              {/*<DeleteButton
                deleteAction={() => deleteOccupationItem(data.id)}
                deleteTitle={messages['common.delete_confirm'] as string}
              />*/}
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
            <IconSkill /> <IntlMessages id='4ir_rm.label' />
          </>
        }
        extra={[
          <AddButton
            key={1}
            onClick={() => openAddEditModal(null)}
            isLoading={isLoadingResources}
            tooltip={
              <IntlMessages
                id={'common.add_new'}
                values={{
                  subject: messages['4ir_rm.resource'],
                }}
              />
            }
          />,
        ]}>
        <ReactTable
          columns={columns}
          data={resources || []}
          loading={isLoadingResources}
          skipDefaultFilter={true}
        />
        {isOpenAddEditModal && (
          <FourIRRMAddEditPopup
            key={1}
            onClose={closeAddEditModal}
            itemId={selectedItemId}
            refreshDataTable={refreshDataTable}
            fourIRInitiativeId={fourIRInitiativeId}
          />
        )}

        {isOpenDetailsModal && selectedItemId && (
          <FourIRRMDetailsPopup
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

export default FourIRRMPage;
