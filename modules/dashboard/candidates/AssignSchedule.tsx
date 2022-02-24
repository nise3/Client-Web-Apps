import IntlMessages from '../../../@crema/utility/IntlMessages';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import {Grid} from '@mui/material';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import React, {useMemo} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useIntl} from 'react-intl';
import {yupResolver} from '@hookform/resolvers/yup';
import yup from '../../../@softbd/libs/yup';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import {useFetchInterviewSchedule} from '../../../services/IndustryManagement/hooks';
import {candidateStepScheduleAssign} from '../../../services/IndustryAssociationManagement/IndustryAssociationService';

interface IAssignSchedulePopupProps {
  onClose: () => void;
  appliedCandidateIds: any;
  currentStep: any;
}

const AssignSchedulePopup = ({
  appliedCandidateIds,
  currentStep,
  ...props
}: IAssignSchedulePopupProps) => {
  const {messages} = useIntl();

  const {errorStack} = useNotiStack();
  const {createSuccessMessage} = useSuccessMessage();

  const {data: schedule, isLoading} = useFetchInterviewSchedule(currentStep);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      scheduleId: yup
        .string()
        .required()
        .label(messages['common.interview_schedule'] as string),
    });
  }, [messages]);

  const {
    control,
    // register,
    setError,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<any> = async (formData: any) => {
    // Todo: this params is static for now, this data is required
    let params = {
      notify: 1,
      applied_job_ids: appliedCandidateIds,
      interview_invite_type: 3,
    };

    try {
      await candidateStepScheduleAssign(formData.scheduleId, params);
      createSuccessMessage('common.interview_schedule_assign');

      props.onClose();
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
  };

  return (
    <HookFormMuiModal
      open={true}
      {...props}
      title={
        <>
          <IntlMessages
            id='common.add_new'
            values={{
              subject: <IntlMessages id='common.interview_schedule' />,
            }}
          />
        </>
      }
      maxWidth={isBreakPointUp('xl') ? 'lg' : 'md'}
      handleSubmit={handleSubmit(onSubmit)}
      actions={
        <>
          <CancelButton onClick={props.onClose} isLoading={false} />
          <SubmitButton isSubmitting={isSubmitting} isLoading={false} />
        </>
      }>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <CustomFormSelect
            required
            id='scheduleId'
            label={messages['calendar.schedule']}
            isLoading={isLoading}
            control={control}
            options={schedule}
            optionValueProp='id'
            optionTitleProp={['interview_scheduled_at']}
            errorInstance={errors}
          />
        </Grid>
      </Grid>
    </HookFormMuiModal>
  );
};

export default AssignSchedulePopup;
