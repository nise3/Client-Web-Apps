import React, {useState} from 'react';
import AppAnimate from '../../../@crema/core/AppAnimate';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import AddButton from '../../../@softbd/elements/Button/AddButton';
import {useIntl} from 'react-intl';
import ReadButton from '../../../@softbd/elements/Button/ReadButton';
import EditButton from '../../../@softbd/elements/Button/EditButton';
import DeleteButton from '../../../@softbd/elements/Button/DeleteButton';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {ORGANIZATION_SERVICE_PATH} from '../../../@softbd/common/apiRoutes';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import {deleteRankType} from '../../../services/instituteManagement/RankTypeService';
import RankTypeAddEditPopup from './RankTypeAddEditPopup';
import RankTypeDetailsPopup from './RankTypeDetailsPopup';

const RankTypePage = () => {
  const {messages} = useIntl();

  const [rankTypeId, setRankTypeId] = useState<number | null>(null);
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const [isToggleTable, setIsToggleTable] = useState<boolean>(false);

  const closeAddEditModal = () => {
    setIsOpenAddEditModal(false);
    setRankTypeId(null);
  };

  const openAddEditModal = (rankTypeId: number | null = null) => {
    setIsOpenDetailsModal(false);
    setIsOpenAddEditModal(true);
    setRankTypeId(rankTypeId);
  };

  const openDetailsModal = (rankTypeId: number) => {
    setIsOpenDetailsModal(true);
    setRankTypeId(rankTypeId);
  };

  const closeDetailsModal = () => {
    setIsOpenDetailsModal(false);
  };

  const deleteRankTypeItem = async (rankTypeId: number) => {
    let data = await deleteRankType(rankTypeId);
    if (data) {
      refreshDataTable();
    }
  };

  const refreshDataTable = () => {
    setIsToggleTable(!isToggleTable);
  };

  const columns = [
    {
      Header: 'ID',
      accessor: 'id',
      disableFilters: true,
      disableSortBy: true,
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
      Header: messages['common.title_en'],
      accessor: 'description',
    },
    {
      Header: messages['common.title_bn'],
      accessor: 'organization_id',
    },
    {
      Header: 'Actions',
      Cell: (props: any) => {
        let data = props.row.original;
        return (
          <ButtonGroup
            variant='text'
            color='primary'
            aria-label='text primary button group'>
            <ReadButton onClick={() => openDetailsModal(data.id)} />
            <EditButton onClick={() => openAddEditModal(data.id)} />
            <DeleteButton
              deleteAction={() => deleteRankTypeItem(data.id)}
              deleteTitle={'Are you sure?'}
            />
          </ButtonGroup>
        );
      },
      sortable: false,
    },
  ];

  const {onFetchData, data, loading, pageCount} = useReactTableFetchData({
    urlPath: ORGANIZATION_SERVICE_PATH + '/rank-types',
    dataAccessor: 'data',
  });

  return (
    <>
      <AppAnimate animation='transition.slideUpIn' delay={200}>
        <PageBlock
          title={'Rank Types'}
          extra={[
            <AddButton
              key={1}
              onClick={() => openAddEditModal(null)}
              isLoading={loading}
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
            <RankTypeAddEditPopup
              key={1}
              title={rankTypeId ? 'Edit Rank Types' : 'Add Rank Types'}
              open={isOpenAddEditModal}
              onClose={closeAddEditModal}
              itemId={rankTypeId}
              refreshDataTable={refreshDataTable}
            />
          )}

          {isOpenDetailsModal && (
            <RankTypeDetailsPopup
              key={1}
              title={'View Rank Type'}
              itemId={rankTypeId}
              open={isOpenDetailsModal}
              onClose={closeDetailsModal}
              openEditModal={openAddEditModal}
            />
          )}
        </PageBlock>
      </AppAnimate>
    </>
  );
};

export default RankTypePage;
