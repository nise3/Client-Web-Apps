import IntlMessages from '../../../@crema/utility/IntlMessages';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import {Grid} from '@mui/material';
import FormRadioButtons from '../../../@softbd/elements/input/CustomRadioButtonGroup/FormRadioButtons';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import React, {useMemo} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useIntl} from 'react-intl';
import {yupResolver} from '@hookform/resolvers/yup';
import yup from '../../../@softbd/libs/yup';
import CustomDateTimeField from '../../../@softbd/elements/input/CustomDateTimeField';
import CustomTimePicker from '../../../@softbd/elements/input/TimePicker';
import {
  createCandidateStepSchedule,
  updateCandidateStepSchedule,
} from '../../../services/IndustryManagement/IndustryAssociationService';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';

interface IScheduleCreateComponentPopupProps {
  onClose: () => void;
  jobId: string;
  currentStep?: any;
}

const ScheduleCreateComponentPopup = ({
  jobId,
  currentStep,
  ...props
}: IScheduleCreateComponentPopupProps) => {
  const {messages} = useIntl();

  const {errorStack} = useNotiStack();
  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();

  const isEdit = currentStep.step_no != null;

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
    // reset,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  console.log('erros->', errors);

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
    ],
    [messages],
  );

  const onSubmit: SubmitHandler<any> = async (formData: any) => {
    console.log('formData schedule->', formData);
    let scheduleId = 1;
    try {
      formData.job_id = jobId;

      if (scheduleId) {
        await updateCandidateStepSchedule(scheduleId, formData);
        updateSuccessMessage('common.interview_schedule');
        // mutateSteps();
      } else {
        await createCandidateStepSchedule(formData);
        createSuccessMessage('common.interview_schedule');
      }
      props.onClose();
      // mutateSteps();
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
          <CancelButton onClick={props.onClose} isLoading={false} />
          <SubmitButton isSubmitting={isSubmitting} isLoading={false} />
        </>
      }>
      <Grid container spacing={5}>
        <Grid item xs={6}>
          <CustomDateTimeField
            required
            id='date'
            label={messages['common.date']}
            register={register}
            errorInstance={errors}
            isLoading={false}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTimePicker
            id='time'
            label={messages['common.time']}
            register={register}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            required
            id='maximum_number_of_applicants'
            label={messages['common.maximum_number_of_applicants']}
            register={register}
            errorInstance={errors}
            isLoading={false}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomTextInput
            required
            id='interview_address'
            label={messages['common.venue']}
            register={register}
            errorInstance={errors}
            isLoading={false}
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
            isLoading={false}
          />
        </Grid>
      </Grid>
    </HookFormMuiModal>
  );
};

export default ScheduleCreateComponentPopup;
