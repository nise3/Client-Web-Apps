import React, {useCallback, useMemo, useState} from 'react';
import {useIntl} from 'react-intl';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
//import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DeleteButton from '../../../@softbd/elements/button/DeleteButton/DeleteButton';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import AddButton from '../../../@softbd/elements/button/AddButton/AddButton';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import {deleteTrainer} from '../../../services/instituteManagement/TrainerService';
import TrainerAddEditPopup from './TrainerAddEditPopup';
import TrainerDetailsPopup from './TrainerDetailsPopup';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {
  getCalculatedSerialNo,
  isResponseSuccess,
} from '../../../@softbd/utilities/helpers';
import IconTrainer from '../../../@softbd/icons/IconTrainer';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {API_TRAINERS} from '../../../@softbd/common/apiRoutes';

const TrainersPage = () => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();
  const [trainerId, setTrainerId] = useState<number | null>(null);
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const [isToggleTable, setIsToggleTable] = useState<boolean>(false);

  const closeAddEditModal = useCallback(() => {
    setIsOpenAddEditModal(false);
    setTrainerId(null);
  }, []);

  const openAddEditModal = useCallback((trainerId: number | null = null) => {
    setIsOpenDetailsModal(false);
    setIsOpenAddEditModal(true);
    setTrainerId(trainerId);
  }, []);

  const openDetailsModal = useCallback(
    (trainerId: number) => {
      setIsOpenDetailsModal(true);
      setTrainerId(trainerId);
    },
    [trainerId],
  );

  const closeDetailsModal = useCallback(() => {
    setIsOpenDetailsModal(false);
  }, []);

  const deleteTrainerItem = async (itemId: number) => {
    let response = await deleteTrainer(itemId);
    if (isResponseSuccess(response)) {
      successStack(
        <IntlMessages
          id='common.subject_deleted_successfully'
          values={{subject: <IntlMessages id='trainers.label' />}}
        />,
      );
      await refreshDataTable();
    }
  };
  const refreshDataTable = useCallback(() => {
    setIsToggleTable((previousToggle) => !previousToggle);
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: '#',
        Cell: (props: any) => {
          return getCalculatedSerialNo(
            props.row.index,
            props.currentPageIndex,
            props.currentPageSize,
          );
        },
        disableFilters: true,
        disableSortBy: true,
      },

      {
        Header: messages['common.title'],
        accessor: 'trainer_name',
      },

      {
        Header: messages['common.email'],
        accessor: 'email',
        isVisible: false,
      },
      {
        Header: messages['common.skills'],
        accessor: 'skills',
        isVisible: false,
      },
      {
        Header: messages['common.mobile'],
        accessor: 'mobile',
        isVisible: false,
      },
      {
        Header: messages['common.address'],
        accessor: 'address',
        isVisible: false,
      },
      {
        Header: messages['common.nid'],
        accessor: 'nid',
        isVisible: false,
        disableFilters: true,
      },
      {
        Header: messages['common.status'],
        accessor: 'row_status',
        disableFilters: true,
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
              {/*<EditButton onClick={() => openAddEditModal(data.id)} />*/}
              <DeleteButton
                deleteAction={() => deleteTrainerItem(data.id)}
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

  const {onFetchData, data, loading, pageCount, totalCount} =
    useReactTableFetchData({
      urlPath: API_TRAINERS,
    });
  return (
    <>
      <PageBlock
        title={
          <>
            <IconTrainer /> <IntlMessages id='trainers.label' />
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
                  subject: messages['trainers.label'],
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
          <TrainerAddEditPopup
            key={1}
            onClose={closeAddEditModal}
            itemId={trainerId}
            refreshDataTable={refreshDataTable}
          />
        )}

        {isOpenDetailsModal && trainerId && (
          <TrainerDetailsPopup
            key={1}
            itemId={trainerId}
            onClose={closeDetailsModal}
            openEditModal={openAddEditModal}
          />
        )}
      </PageBlock>
    </>
  );
};

export default TrainersPage;
