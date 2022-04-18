import React, {useCallback, useMemo, useState} from 'react';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import AddButton from '../../../@softbd/elements/button/AddButton/AddButton';
import {useIntl} from 'react-intl';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DeleteButton from '../../../@softbd/elements/button/DeleteButton/DeleteButton';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import {getCalculatedSerialNo} from '../../../@softbd/utilities/helpers';
import FourIRScaleUpAddEditPopUp from './FourIRScaleUpAddEditPopUp';
import FourIRScaleUpDetailsPopUp from './FourIRScaleUpDetailsPopUp';

import IntlMessages from '../../../@crema/utility/IntlMessages';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';

import IconBranch from '../../../@softbd/icons/IconBranch';

const FourIRImplemntingTeamPage = () => {
  const {messages, locale} = useIntl();
  const {successStack} = useNotiStack();
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

  const refreshDataTable = useCallback(() => {}, []);

  const columns = useMemo(
    () => [
      {
        Header: '#',
        disableFilters: true,
        disableSortBy: true,
        Cell: (props: any) => {
          return getCalculatedSerialNo(
            props.row.index,
            props.currentPageIndex,
            props.currentPageSize,
          );
        },
      },
      {
        Header: messages['4ir.project_advancement'],
        accessor: 'project_advancement',
      },
      {
        Header: messages['4ir.project_budget'],
        accessor: 'project_budget',
      },
      {
        Header: messages['4ir.previous_budget'],
        accessor: 'previous_budget',
      },
      {
        Header: messages['4ir.scale_up'],
        accessor: 'scale_up',
      },
      {
        Header: messages['common.actions'],
        Cell: (props: any) => {
          //   let data = props.row.original;
          return (
            <DatatableButtonGroup>
              <ReadButton onClick={() => {}} />
              <EditButton onClick={() => {}} />
              <DeleteButton
                deleteAction={() => {}}
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

  const {onFetchData, data, loading, pageCount, totalCount} =
    useReactTableFetchData({
      urlPath: './4ir_TNA_report',
    });

  return (
    <>
      <PageBlock
        title={
          <>
            <IconBranch /> <IntlMessages id='4ir.scale_up' />
          </>
        }
        extra={[
          <AddButton
            key={1}
            onClick={() => openDetailsModal(1)}
            isLoading={false}
            tooltip={
              <IntlMessages
                id={'common.add_new'}
                values={{
                  subject: messages['4ir.scale_up'],
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
          totalCount={totalCount}
          toggleResetTable={isToggleTable}
        />
        {isOpenAddEditModal && (
          <FourIRScaleUpAddEditPopUp
            key={1}
            onClose={closeAddEditModal}
            itemId={selectedItemId}
            refreshDataTable={refreshDataTable}
          />
        )}

        {isOpenDetailsModal && selectedItemId && (
          <FourIRScaleUpDetailsPopUp
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

export default FourIRImplemntingTeamPage;
