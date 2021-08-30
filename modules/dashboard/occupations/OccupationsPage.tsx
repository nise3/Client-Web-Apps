import React, {useCallback, useRef, useState} from 'react';
import AppAnimate from '../../../@crema/core/AppAnimate';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import AddButton from '../../../@softbd/elements/Button/AddButton/AddButton';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import {useIntl} from 'react-intl';
import DatatableButtonGroup from '../../../@softbd/elements/Button/DatatableButtonGroup/DatatableButtonGroup';
import ReadButton from '../../../@softbd/elements/Button/ReadButton';
import EditButton from '../../../@softbd/elements/Button/EditButton';
import DeleteButton from '../../../@softbd/elements/Button/DeleteButton';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {deleteOccupation} from '../../../services/organaizationManagement/OccupationService';
import OccupationAddEditPopup from './OccupationAddEditPopup';
import OccupationDetailsPopup from './OccupationDetailsPopup';
import {ORGANIZATION_SERVICE_PATH} from '../../../@softbd/common/apiRoutes';
import CustomChipRowStatus from '../../../@softbd/elements/CustomChipRowStatus';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {BusinessCenter} from '@material-ui/icons';

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

  const refreshDataTable = useCallback(() => {
    setIsToggleTable(!isToggleTable);
  }, [isToggleTable]);

  const columns = useRef([
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
      Header: messages['job_sectors.label'],
      accessor: 'job_sector_title',
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
              deleteAction={() => deleteOccupationItem(data.id)}
              deleteTitle='Are you sure?'
            />
          </DatatableButtonGroup>
        );
      },
      sortable: false,
    },
  ]);

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
          title={
            <>
              <BusinessCenter /> <IntlMessages id='occupations.label' />
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
                    subject: messages['occupations.label'],
                  }}
                />
              }
            />,
          ]}>
          <ReactTable
            columns={columns.current}
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
              open={isOpenAddEditModal}
              onClose={closeAddEditModal}
              itemId={occupationId}
              refreshDataTable={refreshDataTable}
            />
          )}

          {isOpenDetailsModal && (
            <OccupationDetailsPopup
              key={1}
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
