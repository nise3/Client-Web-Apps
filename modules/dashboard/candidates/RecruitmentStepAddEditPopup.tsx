import React, {FC, useEffect, useMemo} from 'react';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import {Grid} from '@mui/material';
import FormRadioButtons from '../../../@softbd/elements/input/CustomRadioButtonGroup/FormRadioButtons';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import {SubmitHandler, useForm} from 'react-hook-form';
import {
  createRecruitmentStep,
  updateRecruitmentStep,
} from '../../../services/IndustryAssociationManagement/IndustryAssociationService';
import {yupResolver} from '@hookform/resolvers/yup';
import {useIntl} from 'react-intl';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import yup from '../../../@softbd/libs/yup';
import {useFetchJobRecruitmentStep} from '../../../services/IndustryAssociationManagement/hooks';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import RowStatus from '../../../@softbd/utilities/RowStatus';
import {RecruitmentSteps} from './RecruitmentSteps';

interface RecruitmentStepAddEditPopupProps {
  jobId: string;
  stepId: number | null;
  onClose: () => void;
  mutateSteps: () => void;
}

const initialValues = {
  title_en: '',
  title: '',
  step_type: '',
  is_interview_reschedule_allowed: '',
  interview_contact: '',
  row_status: RowStatus.ACTIVE,
};

const RecruitmentStepAddEditPopup: FC<RecruitmentStepAddEditPopupProps> = ({
  jobId,
  stepId,
  mutateSteps,
  ...props
}) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();
  const isEdit = stepId != null;

  const {data: stepData, isLoading} = useFetchJobRecruitmentStep(stepId);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      title: yup
        .string()
        .title('bn', true, messages['common.special_character_error'] as string)
        .required()
        .label(messages['common.title'] as string),
      title_en: yup
        .string()
        .title(
          'en',
          false,
          messages['common.special_character_error'] as string,
        )
        .label(messages['common.title_en'] as string),

      step_type: yup
        .string()
        .required()
        .label(messages['step.type'] as string),
      is_interview_reschedule_allowed: yup
        .string()
        .required()
        .label(messages['common.applicants_cat_reschedule'] as string),
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

  const shortLists = useMemo(
    () => [
      {
        key: RecruitmentSteps.STEP_TYPE_SHORTLIST,
        label: messages['common.only_short_list'],
      },
      {
        key: RecruitmentSteps.STEP_TYPE_WRITTEN,
        label: messages['common.short_list_written'],
      },
      {
        key: RecruitmentSteps.STEP_TYPE_INTERVIEW,
        label: messages['common.short_list_face_to_face'],
      },
      {
        key: RecruitmentSteps.STEP_TYPE_ONLINE_INTERVIEW,
        label: messages['common.short_list_live_interview'],
      },
      {
        key: RecruitmentSteps.STEP_TYPE_OTHERS,
        label: messages['common.short_list_other'],
      },
    ],
    [messages],
  );

  const applicantCanReschedule = useMemo(
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

  useEffect(() => {
    if (stepData) {
      reset({
        title_en: stepData?.title_en,
        title: stepData?.title,
        step_type: stepData?.step_type,
        is_interview_reschedule_allowed:
          stepData?.is_interview_reschedule_allowed,
        interview_contact: stepData?.interview_contact,
        row_status: String(stepData?.row_status),
      });
    } else {
      reset(initialValues);
    }
  }, [stepData]);

  const onSubmit: SubmitHandler<any> = async (formData: any) => {
    try {
      formData.job_id = jobId;

      if (stepId) {
        await updateRecruitmentStep(stepId, formData);
        updateSuccessMessage('common.recruitment_step');
        mutateSteps();
      } else {
        await createRecruitmentStep(formData);
        createSuccessMessage('common.recruitment_step');
      }
      props.onClose();
      mutateSteps();
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
                subject: <IntlMessages id='common.recruitment_step' />,
              }}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{
                subject: <IntlMessages id='common.recruitment_step' />,
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
        <Grid item xs={12}>
          <FormRadioButtons
            label={'step.type'}
            required
            id='step_type'
            radios={shortLists}
            control={control}
            isLoading={isLoading}
            styles={{
              border: '1px solid gray',
              padding: '10px',
              margin: '5px',
              borderRadius: '5px',
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            required
            id='title'
            label={messages['common.step_name']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
            placeholder='Type a test name'
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='title_en'
            label={messages['common.step_name_en']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
            placeholder='Type a test name'
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='interview_contact'
            label={messages['common.phone']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
            placeholder='Write a Contact Number'
          />
        </Grid>
        <Grid item xs={12}>
          <FormRadioButtons
            id='is_interview_reschedule_allowed'
            label={'common.applicants_cat_reschedule'}
            required={true}
            radios={applicantCanReschedule}
            control={control}
            isLoading={isLoading}
          />
        </Grid>
      </Grid>
    </HookFormMuiModal>
  );
};

export default RecruitmentStepAddEditPopup;
