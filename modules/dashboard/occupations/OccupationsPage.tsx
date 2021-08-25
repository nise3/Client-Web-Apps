import React, {useState} from 'react';
import AppAnimate from '../../../@crema/core/AppAnimate';
import PageBlock from '../../../@softbd/PageBlock';
import AddButton from '../../../@softbd/elements/Button/AddButton';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import {useIntl} from 'react-intl';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ReadButton from '../../../@softbd/elements/Button/ReadButton';
import EditButton from '../../../@softbd/elements/Button/EditButton';
import DeleteButton from '../../../@softbd/elements/Button/DeleteButton';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {deleteOccupation} from '../../../services/organaizationManagement/OccupationService';
import OccupationAddEditPopup from './OccupationAddEditPopup';
import OccupationDetailsPopup from './OccupationDetailsPopup';
import {ORGANIZATION_SERVICE_PATH} from '../../../@softbd/common/apiRoutes';

const OccupationsPage = () => {
  const {messages} = useIntl();

  const [occupationId, setOccupationId] = useState<number | null>(null);

  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const [isToggleTable, setIsToggleTable] = useState<boolean>(false);

  const closeAddEditModal = () => {
    setIsOpenAddEditModal(false);
    setOccupationId(null);
  };

  const openAddEditModal = (occupationId: number | null = null) => {
    setIsOpenDetailsModal(false);
    setIsOpenAddEditModal(true);
    setOccupationId(occupationId);
  };

  const openDetailsModal = (occupationId: number) => {
    setIsOpenDetailsModal(true);
    setOccupationId(occupationId);
  };

  const closeDetailsModal = () => {
    setIsOpenDetailsModal(false);
  };

  const deleteOccupationItem = async (occupationId: number) => {
    let data = await deleteOccupation(occupationId);
    if (data) {
      refreshDataTable();
    }
  };

  const refreshDataTable = () => {
    setIsToggleTable(!isToggleTable);
  };

  const columns = [
    {
      Header: messages['common.id'],
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
      Header: messages['occupations.job_sector_title'],
      accessor: 'job_sector_title',
    },
    {
      Header: messages['common.actions'],
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
              deleteAction={() => deleteOccupationItem(data.id)}
              deleteTitle='Are you sure?'
            />
          </ButtonGroup>
        );
      },
      sortable: false,
    },
  ];

  const {onFetchData, data, loading, pageCount} = useReactTableFetchData({
    urlPath: ORGANIZATION_SERVICE_PATH + '/occupations',
    dataAccessor: 'data',
    filters: {
      title_en: 'title_en',
      title_bn: 'title_bn',
    },
  });

  return (
    <>
      <AppAnimate animation='transition.slideUpIn' delay={200}>
        <PageBlock
          title={messages['occupations.occupation_title']}
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
            <OccupationAddEditPopup
              key={1}
              title={
                occupationId
                  ? [messages['occupations.occupation_add_title']]
                  : [messages['occupations.occupation_edit_title']]
              }
              open={isOpenAddEditModal}
              onClose={closeAddEditModal}
              itemId={occupationId}
              refreshDataTable={refreshDataTable}
            />
          )}

          {isOpenDetailsModal && (
            <OccupationDetailsPopup
              key={1}
              title={messages['occupations.occupation_view_title'] as string}
              itemId={occupationId}
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

export default OccupationsPage;
