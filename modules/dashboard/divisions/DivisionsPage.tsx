import React, {useCallback, useMemo, useState} from 'react';
import {useIntl} from 'react-intl';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DeleteButton from '../../../@softbd/elements/button/DeleteButton/DeleteButton';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import AddButton from '../../../@softbd/elements/button/AddButton/AddButton';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import {deleteDivision} from '../../../services/locationManagement/DivisionService';
import DivisionAddEditPopup from './DivisionAddEditPopup';
import DivisionDetailsPopup from './DivisionDetailsPopup';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import IconDivision from '../../../@softbd/icons/IconDivision';
import {isResponseSuccess} from '../../../@softbd/utilities/helpers';
import {useFetchDivisions} from '../../../services/locationManagement/hooks';

const DivisionsPage = () => {
  // const user: AuthUser | null = useAuthUser();
  //
  // const hasPermission = useMemo(() => readDivision(user), [user]);
  // console.log('hasPermission', hasPermission);

  const [filters] = useState({});
  const {messages} = useIntl();
  const {successStack} = useNotiStack();
  const {
    data,
    isLoading,
    mutate: mutateDivisions,
  }: any = useFetchDivisions(filters);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);

  const closeAddEditModal = useCallback(() => {
    setIsOpenAddEditModal(false);
    setSelectedItemId(null);
    mutateDivisions();
  }, []);

  const openAddEditModal = useCallback(
    (selectedItemId: number | null = null) => {
      setIsOpenDetailsModal(false);
      setIsOpenAddEditModal(true);
      setSelectedItemId(selectedItemId);
    },
    [],
  );

  const openDetailsModal = useCallback(
    (selectedItemId: number) => {
      setIsOpenDetailsModal(true);
      setSelectedItemId(selectedItemId);
    },
    [selectedItemId],
  );

  const closeDetailsModal = useCallback(() => {
    setIsOpenDetailsModal(false);
  }, []);

  const deleteDivisionItem = async (selectedItemId: number) => {
    let response = await deleteDivision(selectedItemId);
    if (isResponseSuccess(response)) {
      successStack(
        <IntlMessages
          id='common.subject_deleted_successfully'
          values={{subject: <IntlMessages id='divisions.label' />}}
        />,
      );

      refreshDataTable();
    }
  };

  const refreshDataTable = useCallback(() => {
    mutateDivisions();
  }, [mutateDivisions]);

  const columns = useMemo(
    () => [
      {
        Header: '#',
        Cell: (props: any) => {
          return props.row.index + 1;
        },
        disableFilters: true,
        disableSortBy: true,
      },
      {
        Header: messages['common.title_en'],
        accessor: 'title_en',
        isVisible: false,
      },
      {
        Header: messages['common.title_bn'],
        accessor: 'title_bn',
      },
      {
        Header: messages['common.bbs_code'],
        accessor: 'bbs_code',
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
                deleteAction={() => deleteDivisionItem(data.id)}
                deleteTitle='Are you sure?'
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
            <IconDivision /> <IntlMessages id='divisions.label' />
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
                  subject: messages['divisions.label'],
                }}
              />
            }
          />,
        ]}>
        <ReactTable columns={columns} data={data || []} loading={isLoading} />
        {isOpenAddEditModal && (
          <DivisionAddEditPopup
            key={1}
            onClose={closeAddEditModal}
            itemId={selectedItemId}
            refreshDataTable={refreshDataTable}
          />
        )}

        {isOpenDetailsModal && selectedItemId && (
          <DivisionDetailsPopup
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

export default DivisionsPage;
