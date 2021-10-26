import {Box, FormControlLabel, Grid, Switch, Zoom} from '@mui/material';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useEffect, useMemo, useState} from 'react';
import CustomTextInput from '../../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {getMomentDateFormat} from '../../../../@softbd/utilities/helpers';
import {processServerSideErrors} from '../../../../@softbd/utilities/validationErrorHandler';
import yup from '../../../../@softbd/libs/yup';
import useNotiStack from '../../../../@softbd/hooks/useNotifyStack';
import {useIntl} from 'react-intl';
import CustomDateTimeField from '../../../../@softbd/elements/input/CustomDateTimeField';
import SubmitButton from '../../../../@softbd/elements/button/SubmitButton/SubmitButton';
import CancelButton from '../../../../@softbd/elements/button/CancelButton/CancelButton';
import {useFetchJobExperience} from '../../../../services/youthManagement/hooks';
import {
  createJobExperience,
  updateJobExperience,
} from '../../../../services/youthManagement/JobExperienceService';
import CustomFormSelect from '../../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import {YouthJobExperience} from '../../../../services/youthManagement/typing';
import CustomHookForm from '../component/CustomHookForm';
import useSuccessMessage from '../../../../@softbd/hooks/useSuccessMessage';

interface JobExperienceAddEditProps {
  itemId: number | null;
  onClose: () => void;
}

const initialValues = {
  company_name: '',
  company_name_en: '',
  position: '',
  position_en: '',
  employment_type_id: '',
  location: '',
  location_en: '',
  job_responsibilities: '',
  job_responsibilities_en: '',
  start_date: '',
  end_date: '',
  is_currently_working: 0,
};

const employmentTypes = [
  {id: 1, title: 'Full-time'},
  {id: 2, title: 'Part-time'},
  {id: 3, title: 'Casual'},
  {id: 4, title: 'Apprentice/Trainee'},
];

const JobExperienceAddEditPage: FC<JobExperienceAddEditProps> = ({
  itemId,
  onClose: closeJobExperienceAddEditPage,
}: JobExperienceAddEditProps) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();

  const {
    data: itemData,
    mutate: jobExperienceMutate,
    isLoading,
  } = useFetchJobExperience(itemId);
  const [currentWorkStatus, setCurrentWorkStatus] = useState<number>(0);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      company_name: yup
        .string()
        .required()
        .label(messages['common.company_name_bn'] as string),
      position: yup
        .string()
        .required()
        .label(messages['common.position_bn'] as string),
      employment_type_id: yup
        .string()
        .required()
        .label(messages['common.type_of_employee'] as string),
      location: yup
        .string()
        .required()
        .label(messages['common.location_bn'] as string),
      start_date: yup
        .string()
        .required()
        .label(messages['common.start_date'] as string),
      end_date:
        currentWorkStatus == 0
          ? yup
              .string()
              .required()
              .label(messages['common.end_date'] as string)
          : yup.string(),
    });
  }, [messages, currentWorkStatus]);

  console.log('status', currentWorkStatus);

  const {
    control,
    handleSubmit,
    register,
    reset,
    setError,
    formState: {errors, isSubmitting},
  } = useForm<YouthJobExperience>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (itemData) {
      reset({
        company_name: itemData.company_name,
        company_name_en: itemData?.company_name_en,
        position: itemData.position,
        position_en: itemData?.position_en,
        location: itemData.location,
        location_en: itemData?.location_en,
        job_responsibilities: itemData?.job_responsibilities,
        job_responsibilities_en: itemData?.job_responsibilities_en,
        start_date: itemData?.start_date
          ? getMomentDateFormat(itemData.start_date, 'YYYY-MM-DD')
          : '',
        end_date: itemData?.end_date
          ? getMomentDateFormat(itemData?.end_date, 'YYYY-MM-DD')
          : '',
        employment_type_id: itemData?.employment_type_id,
      });
      setCurrentWorkStatus(itemData?.is_currently_working);
    } else {
      reset(initialValues);
      setCurrentWorkStatus(initialValues.is_currently_working);
    }
  }, [itemData]);

  const onSubmit: SubmitHandler<YouthJobExperience> = async (
    data: YouthJobExperience,
  ) => {
    data.is_currently_working = currentWorkStatus;

    try {
      if (itemId) {
        await updateJobExperience(itemId, data);
        updateSuccessMessage('job_experience.label');
      } else {
        await createJobExperience(data);
        createSuccessMessage('job_experience.label');
      }
      jobExperienceMutate();
      closeJobExperienceAddEditPage();
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
  };

  const handleCurrentWorkStatusChange = (event: any) => {
    setCurrentWorkStatus(event.target.checked ? 1 : 0);
  };

  return (
    <Zoom in={true}>
      <Box>
        <CustomHookForm
          title={messages['common.job_experience']}
          handleSubmit={handleSubmit(onSubmit)}
          actions={
            <React.Fragment>
              <CancelButton
                onClick={closeJobExperienceAddEditPage}
                isLoading={isLoading}
              />
              <SubmitButton isSubmitting={isSubmitting} isLoading={isLoading} />
            </React.Fragment>
          }
          onClose={closeJobExperienceAddEditPage}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='company_name'
                label={messages['common.company_name_bn']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='company_name_en'
                label={messages['common.company_name_en']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='position'
                label={messages['common.position_bn']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='position_en'
                label={messages['common.position_en']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='location'
                label={messages['common.location_bn']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='location_en'
                label={messages['common.location_en']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomFormSelect
                id={'employment_type_id'}
                label={messages['common.type_of_employee']}
                isLoading={isLoading}
                control={control}
                options={employmentTypes}
                optionValueProp={'id'}
                optionTitleProp={['title']}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomDateTimeField
                id='start_date'
                label={messages['job_experience.start_date']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomDateTimeField
                id='end_date'
                label={messages['job_experience.end_date']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='job_responsibilities'
                label={messages['common.job_responsibilities_bn']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
                multiline={true}
                rows={3}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='job_responsibilities_en'
                label={messages['common.job_responsibilities_en']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
                multiline={true}
                rows={3}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <FormControlLabel
                control={
                  <Switch
                    onChange={handleCurrentWorkStatusChange}
                    checked={currentWorkStatus == 1}
                  />
                }
                label='I currently work here'
              />
            </Grid>
          </Grid>
        </CustomHookForm>
      </Box>
    </Zoom>
  );
};

export default JobExperienceAddEditPage;
