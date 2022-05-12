import IntlMessages from '../../../@crema/utility/IntlMessages';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import React, {useCallback, useMemo, useState} from 'react';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DeleteButton from '../../../@softbd/elements/button/DeleteButton/DeleteButton';
import {useIntl} from 'react-intl';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {API_RECRUITMENT_STEPS} from '../../../@softbd/common/apiRoutes';
import {
  getCalculatedSerialNo,
  isResponseSuccess,
} from '../../../@softbd/utilities/helpers';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import ScheduleCreateComponentPopup from './ScheduleCreateComponent';
import CustomChipInviteType from './CustomChipInviteType';
import {deleteCandidateStepSchedule} from '../../../services/IndustryAssociationManagement/IndustryAssociationService';

interface IScheduleListComponentPopupProps {
  onClose: () => void;
  jobId: string;
  currentStep?: any;
  onOpen?: () => void;
}

const ScheduleListComponentPopup = ({
  jobId,
  currentStep,
  ...props
}: IScheduleListComponentPopupProps) => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();

  const [openEditModal, setOpenEditModal] = useState(false);
  const [isToggleTable, setIsToggleTable] = useState<boolean>(false);
  const [scheduleId, setScheduleId] = useState<any>(null);

  const onOpenEditModal = useCallback((scheduleId: number | null = null) => {
    setOpenEditModal(true);
    setScheduleId(scheduleId);
  }, []);

  const closeEditModal = () => {
    setOpenEditModal(false);
  };

  const {data, loading, pageCount, totalCount, onFetchData} =
    useReactTableFetchData({
      urlPath: API_RECRUITMENT_STEPS + '/' + currentStep?.id + '/schedules',
    });

  const deleteSchedule = async (scheduleId: number) => {
    let response = await deleteCandidateStepSchedule(scheduleId);
    if (isResponseSuccess(response)) {
      successStack(
        <IntlMessages
          id='common.subject_deleted_successfully'
          values={{subject: <IntlMessages id='common.interview_schedule' />}}
        />,
      );
      await refreshDataTable();
    }
  };

  const refreshDataTable = useCallback(() => {
    setIsToggleTable((previousToggle) => !previousToggle);
  }, []);

  const columns = useMemo(() => {
    return [
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
        Header: messages['common.date'],
        accessor: 'interview_scheduled_at',
      },
      {
        Header: messages['common.maximum_number_of_applicants'],
        accessor: 'maximum_number_of_applicants',
        isVisible: true,
      },
      {
        Header: messages['common.invite_type'],
        accessor: 'interview_invite_type',
        Cell: (props: any) => {
          let data = props.row.original;
          return <CustomChipInviteType value={data?.interview_invite_type} />;
        },
        // CustomChipInviteType
      },
      {
        Header: messages['common.venue'],
        accessor: 'interview_address',
      },

      {
        Header: messages['common.actions'],
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <DatatableButtonGroup>
              <EditButton onClick={() => onOpenEditModal(data.id)} />
              <DeleteButton
                deleteAction={() => deleteSchedule(data.id)}
                deleteTitle='Are you sure?'
              />
            </DatatableButtonGroup>
          );
        },
        sortable: false,
      },
    ];
  }, [messages]);

  return (
    <HookFormMuiModal
      open={true}
      {...props}
      title={<>{messages['common.recruitment_step']}</>}
      maxWidth={isBreakPointUp('xl') ? 'lg' : 'md'}>
      <ReactTable
        columns={columns}
        data={data}
        loading={loading}
        toggleResetTable={isToggleTable}
        fetchData={onFetchData}
        pageCount={pageCount}
        totalCount={totalCount}
      />

      {openEditModal && (
        <ScheduleCreateComponentPopup
          onClose={closeEditModal}
          jobId={jobId}
          scheduleId={scheduleId}
          currentStep={currentStep}
          refreshDataTable={refreshDataTable}
        />
      )}
    </HookFormMuiModal>
  );
};

export default ScheduleListComponentPopup;
