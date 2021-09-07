import React, {useCallback, useEffect, useState, useMemo} from 'react';
import {useIntl} from 'react-intl';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DeleteButton from '../../../@softbd/elements/button/DeleteButton/DeleteButton';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import AddButton from '../../../@softbd/elements/button/AddButton/AddButton';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import {deleteTrainer, getAllTrainers} from '../../../services/instituteManagement/TrainerService'
import TrainerAddEditPopup from './TrainerAddEditPopup';
import TrainerDetailsPopup from './TrainerDetailsPopup';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CustomChipRowStatus from "../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus";
import useNotiStack from "../../../@softbd/hooks/useNotifyStack";
import {isResponseSuccess} from "../../../@softbd/common/helpers";
import IconTrainer from '../../../@softbd/icons/IconTrainer';

const TrainersPage = () => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();
  const [trainerId, setTrainerId] = useState<number | null>(null);
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const [trainers, setTrainers] = useState<Array<Trainer>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      await loadTrainersData();
    })();
  }, []);

  const loadTrainersData = async () => {
    setIsLoading(true);
    let response = await getAllTrainers();
    if(response) setTrainers(response.data);
    setIsLoading(false);
  };

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
          values={{subject: <IntlMessages id='job_sectors.label' />}}
        />,
      );
      await refreshDataTable();
    }
  };
  const refreshDataTable = useCallback(() => {
    (async () => {
      await loadTrainersData();
    })();
  }, []);

  const columns = useMemo(() => [
    {
      Header: '#',
      accessor: 'id',
      disableFilters: true,
      disableSortBy: true,
    },
    {
      Header: messages['common.title_en'],
      accessor: 'trainer_name_en',
    },
    {
      Header: messages['common.title_bn'],
      accessor: 'trainer_name_bn',
    },
    {
      Header: messages['common.status'],
      accessor: 'row_status',
      filter: 'rowStatusFilter',
      Cell: (props: any) => {
        let data = props.row.original;
        return <CustomChipRowStatus value={data?.row_status}/>;
      },
    },
    {
      Header: messages['common.actions'],
      Cell: (props: any) => {
        let data = props.row.original;
        return (
          <DatatableButtonGroup>
            <ReadButton onClick={() => openDetailsModal(data.id)}/>
            <EditButton onClick={() => openAddEditModal(data.id)}/>
            <DeleteButton
              deleteAction={() => deleteTrainerItem(data.id)}
              deleteTitle='Are you sure?'
            />
          </DatatableButtonGroup>
        );
      },
      sortable: false,
    },
  ], []);
  return (
    <>
      <PageBlock
        title={
          <>
            <IconTrainer/> <IntlMessages id='trainers.label'/>
          </>
        }
        extra={[
          <AddButton
            key={1}
            onClick={() => openAddEditModal(null)}
            isLoading={isLoading}
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
          data={trainers || []}
          loading={isLoading}
          skipDefaultFilter={true}
        />
        {isOpenAddEditModal && (
          <TrainerAddEditPopup
            key={1}
            onClose={closeAddEditModal}
            itemId={trainerId}
            refreshDataTable={refreshDataTable}
          />
        )}

        {isOpenDetailsModal && (
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
