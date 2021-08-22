import React, {useState} from 'react';
import AppAnimate from '../../../@crema/core/AppAnimate';
import PageBlock from '../../../@softbd/PageBlock';
import AddButton from '../../../@softbd/elements/Button/AddButton';
import InstituteAddEditPopup from '../../../@softbd/page-components/institute/InstituteAddEditPopup';
import {deleteInstitute} from '../../../services/instituteManagement/InstituteService';
import {useIntl} from 'react-intl';
import ReadButton from '../../../@softbd/elements/Button/ReadButton';
import EditButton from '../../../@softbd/elements/Button/EditButton';
import DeleteButton from '../../../@softbd/elements/Button/DeleteButton';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {useReactTableFetchData} from '../../../@softbd/hooks/ReactTableHooks';
import {INSTITUTE_SERVICE_PATH} from '../../../@softbd/common/apiRoutes';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import InstituteDetailsPopup from '../../../@softbd/page-components/institute/InstituteDetailsPopup';

const InstitutePage = () => {
  const {messages} = useIntl();

  const [institutes, setInstitutes] = useState<Array<Institute> | []>([]);
  const [instituteId, setInstituteId] = useState<number | null>(null);
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const [isToggleTable, setIsToggleTable] = useState(false);

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
      setIsToggleTable(true);
    }
  };

  const columns = [
    {
      Header: 'ID',
      accessor: 'id',
      disableFilters: true,
      disableSortBy: true,
    },
    {
      Header: messages['institute.title_en'],
      accessor: 'title_en',
    },
    {
      Header: messages['institute.title_bn'],
      accessor: 'title_bn',
    },
    {
      Header: messages['institute.title_bn'],
      accessor: 'domain',
    },
    {
      Header: messages['institute.title_bn'],
      accessor: 'address',
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
              deleteAction={() => deleteInstituteItem(data.id)}
              deleteTitle={'Are you sure?'}
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
  });

  return (
    <>
      <AppAnimate animation='transition.slideUpIn' delay={200}>
        <PageBlock
          title={'Create Institute'}
          extra={[
            <AddButton key={1} onClick={() => openAddEditModal(null)} />,
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
              title={'Add new institute'}
              open={isOpenAddEditModal}
              onClose={closeAddEditModal}
              itemId={instituteId}
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
