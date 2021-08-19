import React, {useEffect, useState} from 'react';
import AppAnimate from '../../../@crema/core/AppAnimate';
import PageBlock from '../../../@softbd/PageBlock';
import AddButton from '../../../@softbd/elements/Button/AddButton';
import InstituteAddEditPopup from '../../../@softbd/page-components/institute/InstituteAddEditPopup';
import {
  deleteInstitute,
  getAllInstitutes,
} from '../../../services/instituteManagement/InstituteService';
import {useIntl} from 'react-intl';
import ReadButton from '../../../@softbd/elements/Button/ReadButton';
import EditButton from '../../../@softbd/elements/Button/EditButton';
import DeleteButton from '../../../@softbd/elements/Button/DeleteButton';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {useReactTableFetchData} from '../../../@softbd/hooks/ReactTableHooks';
import {INSTITUTE_SERVICE_PATH} from '../../../@softbd/common/apiRoutes';
import ReactTable from '../../../@softbd/table/Table/ReactTable';

const InstitutePage = () => {
  const {messages} = useIntl();

  const [institutes, setInstitutes] = useState<Array<Institute> | []>([]);
  const [instituteId, setInstituteId] = useState<number | null>(null);
  const [loadingInstituteData, setLoadingInstituteData] =
    useState<boolean>(true);
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const [isToggleTable, setIsToggleTable] = useState(false);

  useEffect(() => {
    loadInstitutesData();
  }, []);

  const loadInstitutesData = async () => {
    let institutes = await getAllInstitutes();
    console.log('institutes', institutes);
    setInstitutes(institutes);
    setLoadingInstituteData(false);
  };

  const closeAddEditModal = () => {
    setIsOpenAddEditModal(false);
    setInstituteId(null);
  };

  const openAddEditModal = (instituteId: number | null = null) => {
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
      loadInstitutesData();
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
      Cell: (data: Institute) => {
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
            <AddButton key={1} onClick={() => setIsOpenAddEditModal(true)} />,
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
              open={isOpenAddEditModal}
              onClose={() => setIsOpenAddEditModal(false)}
              title={'Add new institute'}
              key={1}
              itemId={instituteId}
            />
          )}

          {/*{isOpenDetailsModal && (*/}
          {/*  <InstituteDetailsPopup*/}
          {/*    instituteId={instituteId}*/}
          {/*    isOpenDetailsModal={isOpenDetailsModal}*/}
          {/*    closeDetailsModal={closeDetailsModal}*/}
          {/*    openAddEditModal={openAddEditModal}*/}
          {/*  />*/}
          {/*)}*/}
        </PageBlock>
      </AppAnimate>
    </>
  );
};

export default InstitutePage;
