import React, {useCallback, useState} from 'react';
import AppAnimate from '../../../@crema/core/AppAnimate';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import AddButton from '../../../@softbd/elements/Button/AddButton';
import {deleteJobSector} from '../../../services/organaizationManagement/JobSectorService';
import {useIntl} from 'react-intl';
import ReadButton from '../../../@softbd/elements/Button/ReadButton';
import EditButton from '../../../@softbd/elements/Button/EditButton';
import DeleteButton from '../../../@softbd/elements/Button/DeleteButton';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {ORGANIZATION_SERVICE_PATH} from '../../../@softbd/common/apiRoutes';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import JobSectorDetailsPopup from './JobSectorDetailsPopup';
import JobSectorAddEditPopup from './JobSectorAddEditPopup';
import {WorkOutline} from '@material-ui/icons';
import DatatableButtonGroup from '../../../@softbd/elements/Button/DatatableButtonGroup';

const JobSectorPage = () => {
  const {messages} = useIntl();

  const [jobSectorId, setJobSectorId] = useState<number | null>(null);
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const [isToggleTable, setIsToggleTable] = useState<boolean>(false);

  const closeAddEditModal = () => {
    setIsOpenAddEditModal(false);
    setJobSectorId(null);
  };

  const openAddEditModal = (jobSectorId: number | null = null) => {
    setIsOpenDetailsModal(false);
    setIsOpenAddEditModal(true);
    setJobSectorId(jobSectorId);
  };

  const openDetailsModal = (jobSectorId: number) => {
    setIsOpenDetailsModal(true);
    setJobSectorId(jobSectorId);
  };

  const closeDetailsModal = () => {
    setIsOpenDetailsModal(false);
  };

  const deleteJobSectorItem = async (jobSectorId: number) => {
    let data = await deleteJobSector(jobSectorId);
    if (data) {
      refreshDataTable();
    }
  };

  const refreshDataTable = useCallback(() => {
    setIsToggleTable(!isToggleTable);
  }, [isToggleTable]);

  const columns = [
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
      Header: messages['common.actions'],
      Cell: (props: any) => {
        let data = props.row.original;
        return (
          <DatatableButtonGroup>
            <ReadButton onClick={() => openDetailsModal(data.id)} />
            <EditButton onClick={() => openAddEditModal(data.id)} />
            <DeleteButton
              deleteAction={() => deleteJobSectorItem(data.id)}
              deleteTitle={'Are you sure?'}
            />
          </DatatableButtonGroup>
        );
      },
      sortable: false,
    },
  ];

  const {onFetchData, data, loading, pageCount} = useReactTableFetchData({
    urlPath: ORGANIZATION_SERVICE_PATH + '/job-sectors',
    dataAccessor: 'data',
  });

  return (
    <>
      <AppAnimate animation='transition.slideUpIn' delay={200}>
        <PageBlock
          title={
            <>
              <WorkOutline /> Job Sectors
            </>
          }
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
            <JobSectorAddEditPopup
              key={1}
              title={
                <>
                  <WorkOutline />
                  {jobSectorId ? 'Edit Job Sector' : 'Add Job Sector'}
                </>
              }
              open={isOpenAddEditModal}
              onClose={closeAddEditModal}
              itemId={jobSectorId}
              refreshDataTable={refreshDataTable}
            />
          )}

          {isOpenDetailsModal && (
            <JobSectorDetailsPopup
              key={1}
              title={'View job Sector'}
              itemId={jobSectorId}
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

export default JobSectorPage;
