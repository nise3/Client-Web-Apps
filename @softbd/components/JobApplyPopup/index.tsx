import React, {FC, useMemo} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import HookFormMuiModal from '../../modals/HookFormMuiModal/HookFormMuiModal';
import CancelButton from '../../elements/button/CancelButton/CancelButton';
import SubmitButton from '../../elements/button/SubmitButton/SubmitButton';
import Grid from '@mui/material/Grid';
import CustomTextInput from '../../elements/input/CustomTextInput/CustomTextInput';
import {useIntl} from 'react-intl';
import IconJobSector from '../../icons/IconJobSector';
import yup from '../../libs/yup';
import {processServerSideErrors} from '../../utilities/validationErrorHandler';
import useSuccessMessage from '../../hooks/useSuccessMessage';
import {createJobApplication} from '../../../services/youthManagement/JobApplicationService';
import useNotiStack from '../../hooks/useNotifyStack';

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
    register,
    handleSubmit,
    setError,
    formState: {errors, isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      data.job_id = job?.job_id;
      await createJobApplication(data);
      createSuccessMessage('common.job_apply');
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
          {messages['common.job_apply']}
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
          <CustomTextInput
            required
            id='expected_salary'
            label={messages['common.expected_salary']}
            register={register}
            errorInstance={errors}
          />
        </Grid>
      </Grid>
    </HookFormMuiModal>
  );
};

export default JobApplyPopup;
