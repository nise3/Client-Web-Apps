import {useIntl} from 'react-intl';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import React, {useMemo} from 'react';
import yup from '../../../@softbd/libs/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {candidateStepMarkAsInterviewed} from '../../../services/IndustryAssociationManagement/IndustryAssociationService';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import {Grid} from '@mui/material';
import FormRadioButtons from '../../../@softbd/elements/input/CustomRadioButtonGroup/FormRadioButtons';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';

interface IProps {
  onClose: () => void;
  appliedCandidateId: any;
}

const MarksAsInterviewedFromPopup = ({
  appliedCandidateId,
  ...props
}: IProps) => {
  const {messages} = useIntl();

  const {errorStack} = useNotiStack();
  const {createSuccessMessage} = useSuccessMessage();

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      interview_score: yup
        .string()
        .required()
        .label(messages['common.interview_schedule'] as string),
      is_candidate_present: yup
        .string()
        .required()
        .label(messages['common.interview_schedule'] as string),
    });
  }, [messages]);

  const {
    control,
    register,
    setError,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<any> = async (formData: any) => {
    try {
      await candidateStepMarkAsInterviewed(appliedCandidateId, formData);
      createSuccessMessage('common.interview_schedule_hire_invite');
      props.onClose();
    } catch (error: any) {
      processServerSideErrors({
        error,
        errorStack,
        setError,
      });
    }
  };

  const applicantPresent = useMemo(
    () => [
      {
        key: '1',
        label: messages['common.yes'],
      },
      {
        key: '2',
        label: messages['common.no'],
      },
    ],
    [messages],
  );

  return (
    <HookFormMuiModal
      open={true}
      {...props}
      title={
        <>
          <IntlMessages
            id='common.add_new'
            values={{
              subject: <IntlMessages id='common.mark_as_interview' />,
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
          <FormRadioButtons
            id='is_candidate_present'
            label={'common.candidate_present'}
            required={true}
            radios={applicantPresent}
            defaultValue={1}
            control={control}
            isLoading={false}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            required
            id='interview_score'
            label={messages['common.interview_score']}
            register={register}
            errorInstance={errors}
          />
        </Grid>
      </Grid>
    </HookFormMuiModal>
  );
};

export default MarksAsInterviewedFromPopup;
