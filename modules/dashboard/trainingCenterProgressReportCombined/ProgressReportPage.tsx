import React, {useCallback, useMemo, useState} from 'react';
import {useIntl} from 'react-intl';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import DeleteButton from '../../../@softbd/elements/button/DeleteButton/DeleteButton';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import AddButton from '../../../@softbd/elements/button/AddButton/AddButton';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import {deleteTrainer} from '../../../services/instituteManagement/TrainerService';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {isResponseSuccess} from '../../../@softbd/utilities/helpers';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {Link} from '../../../@softbd/elements/common';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import ProgressReportDetailsPopup from './ProgressReportDetailsPopup';
import {Button} from '@mui/material';
import {API_TRAINING_CENTERS_REPORTING_COMBINED_PROGRESS} from '../../../@softbd/common/apiRoutes';

const TrainersPage = () => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();
  const [itemId, setItemId] = useState<number | null>(null);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const [isToggleTable, setIsToggleTable] = useState<boolean>(false);

  const openDetailsModal = useCallback(
    (id: number) => {
      setIsOpenDetailsModal(true);
      setItemId(itemId);
    },
    [itemId],
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
        accessor: 'id',
        disableFilters: true,
        disableSortBy: true,
      },

      {
        Header: messages['training_center_progress_report.total_members'],
        accessor: 'total_number_of_members',
      },

      {
        Header:
          messages[
            'training_center_progress_report.subscriptions_collected_so_far'
          ],
        accessor: 'subscriptions_collected_so_far',
      },

      {
        Header: messages['common.actions'],
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <DatatableButtonGroup>
              <ReadButton onClick={() => openDetailsModal(data.id)} />
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
      urlPath: API_TRAINING_CENTERS_REPORTING_COMBINED_PROGRESS,
    });
  return (
    <>
      <PageBlock
        title={
          <>
            <AssignmentTurnedInIcon />{' '}
            <IntlMessages id='training_center_progress_report_combined.label' />
          </>
        }
        extra={[
          <Link
            key={1}
            href={'/training-center-combined-progress-report-create'}>
            <AddButton
              key={1}
              // isLoading={loading}
              tooltip={
                <IntlMessages
                  id={'common.add_new'}
                  values={{
                    subject:
                      messages[
                        'training_center_progress_report_combined.label'
                      ],
                  }}
                />
              }
            />
          </Link>,
          <Button
            key={1}
            onClick={() => {
              openDetailsModal(1);
            }}>
            Details
          </Button>,
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

        {isOpenDetailsModal && (
          <ProgressReportDetailsPopup
            key={1}
            itemId={itemId}
            onClose={closeDetailsModal}
          />
        )}
      </PageBlock>
    </>
  );
};

export default TrainersPage;
