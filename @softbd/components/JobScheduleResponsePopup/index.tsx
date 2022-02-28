import React, {FC, useMemo} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import HookFormMuiModal from '../../modals/HookFormMuiModal/HookFormMuiModal';
import CancelButton from '../../elements/button/CancelButton/CancelButton';
import SubmitButton from '../../elements/button/SubmitButton/SubmitButton';
import Grid from '@mui/material/Grid';
import {useIntl} from 'react-intl';
import IconJobSector from '../../icons/IconJobSector';
import yup from '../../libs/yup';
import {processServerSideErrors} from '../../utilities/validationErrorHandler';
import useSuccessMessage from '../../hooks/useSuccessMessage';
import useNotiStack from '../../hooks/useNotifyStack';
import FormRadioButtons from '../../elements/input/CustomRadioButtonGroup/FormRadioButtons';
import ConfirmationStatus from './ConfirmationStatus';
import {createJobResponse} from '../../../services/youthManagement/JobScheduleResponseService';

interface JobApplyPopupProps {
  job: any;
  onClose: () => void;
}

const JobApplyPopup: FC<JobApplyPopupProps> = ({job, ...props}) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const {createSuccessMessage} = useSuccessMessage();

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      expected_salary: yup
        .string()
        .label(messages['common.expected_salary'] as string),
    });
  }, [messages]);
  const {
    control,
    handleSubmit,
    setError,
    formState: {isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      data.job_id = job?.job_id;
      await createJobResponse(data);
      createSuccessMessage('common.confirmation');
      props.onClose();
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
  };

  return (
    <HookFormMuiModal
      {...props}
      open={true}
      title={
        <>
          <IconJobSector />
          {messages['common.confirmation']}
        </>
      }
      maxWidth={'sm'}
      handleSubmit={handleSubmit(onSubmit)}
      actions={
        <>
          <CancelButton onClick={props.onClose} />
          <SubmitButton isSubmitting={isSubmitting} />
        </>
      }>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <FormRadioButtons
            id='confirmation_status'
            label={'common.status'}
            radios={[
              {
                key: ConfirmationStatus.ACCEPTED,
                label: messages['common.accept'],
              },
              {
                key: ConfirmationStatus.REJECTED,
                label: messages['common.reject'],
              },
              {
                key: ConfirmationStatus.RESCHEDULED,
                label: messages['common.reschedule'],
              },
            ]}
            control={control}
            defaultValue={ConfirmationStatus.ACCEPTED}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </HookFormMuiModal>
  );
};

export default JobApplyPopup;
