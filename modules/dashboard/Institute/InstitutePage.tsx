import React, {useState} from 'react';
import AppAnimate from '../../../@crema/core/AppAnimate';
import PageBlock from '../../../@softbd/PageBlock';
import AddButton from '../../../@softbd/elements/Button/AddButton';
import {deleteInstitute} from '../../../services/instituteManagement/InstituteService';
import {useIntl} from 'react-intl';
import ReadButton from '../../../@softbd/elements/Button/ReadButton';
import EditButton from '../../../@softbd/elements/Button/EditButton';
import DeleteButton from '../../../@softbd/elements/Button/DeleteButton';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {INSTITUTE_SERVICE_PATH} from '../../../@softbd/common/apiRoutes';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import InstituteDetailsPopup from './InstituteDetailsPopup';
import InstituteAddEditPopup from './InstituteAddEditPopup';

const InstitutePage = () => {
  const {messages} = useIntl();

  const [instituteId, setInstituteId] = useState<number | null>(null);
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const [isToggleTable, setIsToggleTable] = useState<boolean>(false);

  const closeAddEditModal = () => {
    setIsOpenAddEditModal(false);
    setInstituteId(null);
  };

  const openAddEditModal = (instituteId: number | null = null) => {
    setIsOpenDetailsModal(false);
    setIsOpenAddEditModal(true);
    setInstituteId(instituteId);
  };

  const openDetailsModal = (instituteId: number) => {
    setIsOpenDetailsModal(true);
    setInstituteId(instituteId);
  };

  const closeDetailsModal = () => {
    setIsOpenDetailsModal(false);
  };

  const deleteInstituteItem = async (instituteId: number) => {
    let data = await deleteInstitute(instituteId);
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
      Header: messages['institute.domain'],
      accessor: 'domain',
    },
    {
      Header: messages['institute.code'],
      accessor: 'code',
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
              deleteAction={() => deleteInstituteItem(data.id)}
              deleteTitle='Are you sure?'
            />
          </ButtonGroup>
        );
      },
      sortable: false,
    },
  ];

  const {onFetchData, data, loading, pageCount} = useReactTableFetchData({
    urlPath: INSTITUTE_SERVICE_PATH + '/institutes',
    dataAccessor: 'data',
    filters: {
      title_en: 'title_en',
      title_bn: 'title_bn',
      domain: 'domain',
      code: 'code',
    },
  });

  return (
    <>
      <AppAnimate animation='transition.slideUpIn' delay={200}>
        <PageBlock
          title={messages['institute.institute_type_title']}
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
            <InstituteAddEditPopup
              key={1}
              title={instituteId ? 'Edit Institute' : 'Add Institute'}
              open={isOpenAddEditModal}
              onClose={closeAddEditModal}
              itemId={instituteId}
              refreshDataTable={refreshDataTable}
            />
          )}

          {isOpenDetailsModal && (
            <InstituteDetailsPopup
              key={1}
              title={'View institute'}
              itemId={instituteId}
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

export default InstitutePage;
