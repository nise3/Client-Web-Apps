import React, {useMemo, useState} from 'react';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import AddButton from '../../../@softbd/elements/button/AddButton/AddButton';
import {useIntl} from 'react-intl';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DeleteButton from '../../../@softbd/elements/button/DeleteButton/DeleteButton';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {INSTITUTE_SERVICE_PATH} from '../../../@softbd/common/apiRoutes';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import BranchAddEditPopup from './BranchAddEditPopup';
import BranchDetailsPopup from './BranchDetailsPopup';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';

import IntlMessages from '../../../@crema/utility/IntlMessages';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {deleteBranch} from '../../../services/instituteManagement/BranchService';
import IconProgramme from '../../../@softbd/icons/IconProgramme';

const BranchPage = () => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();

  const [branchId, setBranchId] = useState<number | null>(null);
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const [isToggleTable, setIsToggleTable] = useState<boolean>(false);

  const closeAddEditModal = () => {
    setIsOpenAddEditModal(false);
    setBranchId(null);
  };

  const openAddEditModal = (branchId: number | null = null) => {
    setIsOpenDetailsModal(false);
    setIsOpenAddEditModal(true);
    setBranchId(branchId);
  };

  const openDetailsModal = (branchId: number) => {
    setIsOpenDetailsModal(true);
    setBranchId(branchId);
  };

  const closeDetailsModal = () => {
    setIsOpenDetailsModal(false);
  };

  const deleteBranchItem = async (branchId: number) => {
    let response = await deleteBranch(branchId);
    if (response) {
      successStack(
        <IntlMessages
          id='common.subject_deleted_successfully'
          values={{subject: <IntlMessages id='branch.label' />}}
        />,
      );
      refreshDataTable();
    }
  };

  const refreshDataTable = () => {
    setIsToggleTable(!isToggleTable);
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
        Header: messages['common.title_en'],
        accessor: 'title_en',
      },
      {
        Header: messages['common.title_bn'],
        accessor: 'title_bn',
      },
      {
        Header: messages['institute.label'],
        accessor: 'institute_title_en',
      },
      {
        Header: messages['common.address'],
        accessor: 'address',
      },
      {
        Header: messages['common.status'],
        accessor: 'row_status',
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
                deleteAction={() => deleteBranchItem(data.id)}
                deleteTitle={'Are you sure?'}
              />
            </DatatableButtonGroup>
          );
        },
        sortable: false,
      },
    ],
    [],
  );

  const {onFetchData, data, loading, pageCount} = useReactTableFetchData({
    urlPath: INSTITUTE_SERVICE_PATH + '/branches',
    dataAccessor: 'data',
  });

  return (
    <>
      <PageBlock
        title={
          <>
            <IconProgramme /> <IntlMessages id='branch.label' />
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
                  subject: messages['branch.label'],
                }}
              />
            }
          />,
        ]}>
        <ReactTable
          columns={columns}
          data={data}
          fetchData={onFetchData}
          loading={loading}
          pageCount={pageCount}
          skipDefaultFilter={true}
          skipPageResetRef={false}
          toggleResetTable={isToggleTable}
        />
        {isOpenAddEditModal && (
          <BranchAddEditPopup
            key={1}
            open={isOpenAddEditModal}
            onClose={closeAddEditModal}
            itemId={branchId}
            refreshDataTable={refreshDataTable}
          />
        )}

        {isOpenDetailsModal && (
          <BranchDetailsPopup
            key={1}
            itemId={branchId}
            open={isOpenDetailsModal}
            onClose={closeDetailsModal}
            openEditModal={openAddEditModal}
          />
        )}
      </PageBlock>
    </>
  );
};

export default BranchPage;
