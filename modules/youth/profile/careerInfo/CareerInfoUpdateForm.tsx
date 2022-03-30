import React, {FC, useEffect, useMemo} from 'react';
import {Box, Grid, Zoom} from '@mui/material';
import CustomHookForm from '../component/CustomHookForm';
import CancelButton from '../../../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../../../@softbd/elements/button/SubmitButton/SubmitButton';
import {useIntl} from 'react-intl';
import useNotiStack from '../../../../@softbd/hooks/useNotifyStack';
import useSuccessMessage from '../../../../@softbd/hooks/useSuccessMessage';
import yup from '../../../../@softbd/libs/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {processServerSideErrors} from '../../../../@softbd/utilities/validationErrorHandler';
import CustomTextInput from '../../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import CustomFormSelect from '../../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import {JobLevel} from '../../../dashboard/jobLists/jobPost/enums/JobPostEnums';
import {useAuthUser} from '../../../../@crema/utility/AppHooks';
import {YouthAuthUser} from '../../../../redux/types/models/CommonAuthUser';
import {updateJobApplicationInfo} from '../../../../services/youthManagement/YouthService';

interface CareerInfoUpdateFormProps {
  onUpdateFormClose: () => void;
}

const initialValues = {
  expected_salary: '',
  job_level: '',
};

const CareerInfoUpdateForm: FC<CareerInfoUpdateFormProps> = ({
  onUpdateFormClose,
}) => {
  const {messages} = useIntl();
  const authUser = useAuthUser<YouthAuthUser>();
  const {errorStack} = useNotiStack();
  const {updateSuccessMessage} = useSuccessMessage();

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      expected_salary: yup
        .string()
        .required()
        .label(messages['common.expected_salary'] as string),
      job_level: yup
        .string()
        .required()
        .label(messages['youth.job_level'] as string),
    });
  }, [messages]);

  const jobLevels = useMemo(
    () => [
      {
        id: JobLevel.ENTRY,
        title: messages['label.job_level_entry'],
      },
      {
        id: JobLevel.MID,
        title: messages['label.job_level_mid'],
      },
      {
        id: JobLevel.TOP,
        title: messages['label.job_level_top'],
      },
    ],
    [messages],
  );

  const {
    register,
    control,
    reset,
    setError,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (authUser) {
      reset({
        expected_salary: authUser?.expected_salary,
        job_level: authUser?.job_level,
      });
    } else {
      reset(initialValues);
    }
  }, [authUser]);

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      await updateJobApplicationInfo(data);
      updateSuccessMessage('youth.career_and_application_info');
      onUpdateFormClose();
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
  };

  return (
    <Zoom in={true}>
      <Box>
        <CustomHookForm
          title={messages['youth.career_and_application_info']}
          handleSubmit={handleSubmit(onSubmit)}
          actions={
            <React.Fragment>
              <CancelButton onClick={onUpdateFormClose} isLoading={false} />
              <SubmitButton isSubmitting={isSubmitting} isLoading={false} />
            </React.Fragment>
          }
          onClose={onUpdateFormClose}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                required
                id='expected_salary'
                label={messages['common.expected_salary']}
                type={'number'}
                register={register}
                errorInstance={errors}
                isLoading={false}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomFormSelect
                required
                id='job_level'
                label={messages['youth.job_level']}
                isLoading={false}
                control={control}
                options={jobLevels}
                optionValueProp={'id'}
                optionTitleProp={['title']}
                errorInstance={errors}
              />
            </Grid>
          </Grid>
        </CustomHookForm>
      </Box>
    </Zoom>
  );
};

export default CareerInfoUpdateForm;
