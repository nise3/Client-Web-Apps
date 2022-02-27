import IntlMessages from '../../../@crema/utility/IntlMessages';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import {Grid} from '@mui/material';
import FormRadioButtons from '../../../@softbd/elements/input/CustomRadioButtonGroup/FormRadioButtons';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import React, {useEffect, useMemo} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useIntl} from 'react-intl';
import {yupResolver} from '@hookform/resolvers/yup';
import yup from '../../../@softbd/libs/yup';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import CustomDateTimePicker from '../../../@softbd/elements/input/CustomDateTimePicker';
import {useFetchCandidateStepSchedule} from '../../../services/IndustryManagement/hooks';
import {
  createCandidateStepSchedule,
  updateCandidateStepSchedule,
} from '../../../services/IndustryAssociationManagement/IndustryAssociationService';

const initialValues = {
  recruitment_step_id: '',
  interview_scheduled_at: '',
  maximum_number_of_applicants: '',
  interview_invite_type: '',
  interview_address: '',
};

interface IScheduleCreateComponentPopupProps {
  onClose: () => void;
  scheduleId?: any;
  jobId: string;
  currentStep: any;
  refreshDataTable?: () => void;
}

const ScheduleCreateComponentPopup = ({
  jobId,
  scheduleId,
  currentStep,
  refreshDataTable,
  ...props
}: IScheduleCreateComponentPopupProps) => {
  const {messages} = useIntl();

  const {errorStack} = useNotiStack();
  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();

  const isEdit = scheduleId != null;

  const {data: schedule, isLoading} = useFetchCandidateStepSchedule(scheduleId);

  useEffect(() => {
    if (schedule) {
      reset({
        recruitment_step_id: schedule?.recruitment_step_id,
        interview_scheduled_at: schedule?.interview_scheduled_at.replace(
          ' ',
          'T',
        ),
        maximum_number_of_applicants: schedule?.maximum_number_of_applicants,
        interview_invite_type: schedule?.interview_invite_type,
        interview_address: schedule?.interview_address,
      });
    } else {
      reset(initialValues);
    }
  }, [schedule]);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      interview_address: yup
        .string()
        .required()
        .label(messages['common.venue'] as string),
      maximum_number_of_applicants: yup
        .string()
        .required()
        .label(messages['common.venue'] as string),
    });
  }, [messages]);

  const {
    control,
    register,
    setError,
    reset,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  const notifyApplicant = useMemo(
    () => [
      {
        key: '1',
        label: messages['common.email'],
      },
      {
        key: '2',
        label: messages['common.sms'],
      },
      {
        key: '3',
        label: messages['common.email_sms'],
      },
      {
        key: '4',
        label: messages['common.dont_send'],
      },
    ],
    [messages],
  );

  const onSubmit: SubmitHandler<any> = async (formData: any) => {
    formData.interview_scheduled_at = formData.interview_scheduled_at
      .replace(/T(\d\d):(\d\d):\d\d/, 'T$1:$2')
      .replace('T', ' ');
    try {
      formData.job_id = jobId;
      formData.recruitment_step_id = currentStep?.id;

      if (scheduleId) {
        await updateCandidateStepSchedule(scheduleId, formData);
        updateSuccessMessage('common.interview_schedule');
      } else {
        await createCandidateStepSchedule(formData);
        createSuccessMessage('common.interview_schedule');
      }
      props.onClose();

      if (refreshDataTable) {
        refreshDataTable();
      }
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
          {isEdit ? (
            <IntlMessages
              id='common.edit'
              values={{
                subject: <IntlMessages id='common.interview_schedule' />,
              }}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{
                subject: <IntlMessages id='common.interview_schedule' />,
              }}
            />
          )}
        </>
      }
      maxWidth={isBreakPointUp('xl') ? 'lg' : 'md'}
      handleSubmit={handleSubmit(onSubmit)}
      actions={
        <>
          <CancelButton onClick={props.onClose} isLoading={isLoading} />
          <SubmitButton isSubmitting={isSubmitting} isLoading={isLoading} />
        </>
      }>
      <Grid container spacing={5}>
        <Grid item xs={6}>
          <CustomDateTimePicker
            id='interview_scheduled_at'
            label={messages['common.date']}
            register={register}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            required
            id='maximum_number_of_applicants'
            label={messages['common.maximum_number_of_applicants']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomTextInput
            required
            id='interview_address'
            label={messages['common.venue']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
            placeholder='Type a venue address'
          />
        </Grid>
        <Grid item xs={12}>
          <FormRadioButtons
            id='interview_invite_type'
            required
            label={'common.invite_type'}
            radios={notifyApplicant}
            control={control}
            isLoading={isLoading}
          />
        </Grid>
      </Grid>
    </HookFormMuiModal>
  );
};

export default ScheduleCreateComponentPopup;
