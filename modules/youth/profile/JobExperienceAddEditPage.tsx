import {Grid, Zoom} from '@mui/material';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useEffect, useMemo, useState} from 'react';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {
  isResponseSuccess,
  isValidationError,
} from '../../../@softbd/utilities/helpers';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {setServerValidationErrors} from '../../../@softbd/utilities/validationErrorHandler';
import yup from '../../../@softbd/libs/yup';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {useIntl} from 'react-intl';
import CustomDateTimeField from '../../../@softbd/elements/input/CustomDateTimeField';
import {Card, CardContent, FormControlLabel, Switch} from '@mui/material';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import {DialogTitle} from '../../../@softbd/modals/CustomMuiModal/CustomMuiModal';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import {useFetchJobExperience} from '../../../services/youthManagement/hooks';
import {
  createJobExperience,
  updateJobExperience,
} from '../../../services/youthManagement/JobExperienceService';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import {YouthJobExperience} from '../../../services/youthManagement/typing';

interface JobExperienceAddEditProps {
  itemId: number | null;
  onClose: () => void;
}

const initialValues = {
  company_name: '',
  position: '',
  employment_type_id: '',
  location: '',
  description: '',
  start_date: '',
  end_date: '',
  is_currently_work: 0,
};

const employmentTypes = [
  {id: 1, title: 'Full-time'},
  {id: 2, title: 'Part-time'},
  {id: 3, title: 'Casual'},
  {id: 4, title: 'Apprentice/Trainee'},
];

const JobExperienceAddEditPage: FC<JobExperienceAddEditProps> = ({
  itemId,
  ...props
}: JobExperienceAddEditProps) => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      company_name: yup
        .string()
        .required()
        .label(messages['common.company_name'] as string),
      position: yup
        .string()
        .required()
        .label(messages['common.position'] as string),
      employment_type_id: yup
        .string()
        .required()
        .label(messages['common.type_of_employee'] as string),
      location: yup
        .string()
        .required()
        .label(messages['common.location'] as string),
      start_date: yup
        .string()
        .required()
        .label(messages['common.start_date'] as string),
    });
  }, [messages]);

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

  const isEdit = itemId != null;
  const {
    data: itemData,
    mutate: jobExperienceMutate,
    isLoading,
  } = useFetchJobExperience(itemId);

  const [currentWorkStatus, setCurrentWorkStatus] = useState<number>(0);

  useEffect(() => {
    if (itemData) {
      reset({
        company_name: itemData.company_name,
        position: itemData?.position,
        location: itemData?.location,
        description: itemData?.description,
        start_date: itemData?.start_date,
        end_date: itemData?.end_date,
        employment_type_id: itemData?.employment_type_id,
      });
      setCurrentWorkStatus(itemData?.is_currently_work);
    } else {
      reset(initialValues);
      setCurrentWorkStatus(initialValues.is_currently_work);
    }
  }, [itemData]);

  const onSubmit: SubmitHandler<YouthJobExperience> = async (
    data: YouthJobExperience,
  ) => {
    data.is_currently_work = currentWorkStatus;

    const response = itemId
      ? await updateJobExperience(itemId, data)
      : await createJobExperience(data);
    if (isResponseSuccess(response) && isEdit) {
      successStack(
        <IntlMessages
          id='common.subject_updated_successfully'
          values={{subject: <IntlMessages id='job_experience.label' />}}
        />,
      );
      jobExperienceMutate();
      props.onClose();
    } else if (isResponseSuccess(response) && !isEdit) {
      successStack(
        <IntlMessages
          id='common.subject_created_successfully'
          values={{subject: <IntlMessages id='job_experience.label' />}}
        />,
      );
      jobExperienceMutate();
      props.onClose();
    } else if (isValidationError(response)) {
      setServerValidationErrors(response.errors, setError, validationSchema);
    }
  };

  const handleCurrentWorkStatusChange = (event: any) => {
    setCurrentWorkStatus(event.target.checked ? 1 : 0);
  };

  return (
    <Zoom in={true}>
      <Grid container justifyContent={'center'} spacing={2}>
        <Grid item>
          <Card>
            <CardContent sx={{position: 'relative'}}>
              <DialogTitle onClose={props.onClose}>
                {messages['common.job_experience']}
              </DialogTitle>
              <form onSubmit={handleSubmit(onSubmit)} autoComplete={'off'}>
                <Grid container spacing={5}>
                  <Grid item xs={12} md={6}>
                    <CustomTextInput
                      id='company_name'
                      label={messages['common.company_name']}
                      register={register}
                      errorInstance={errors}
                      isLoading={isLoading}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CustomTextInput
                      id='position'
                      label={messages['common.position']}
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
                  <Grid item xs={12} md={6}>
                    <CustomTextInput
                      id='location'
                      label={messages['common.location']}
                      register={register}
                      errorInstance={errors}
                      isLoading={isLoading}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CustomTextInput
                      id='job_description'
                      label={messages['job_experience.job_description']}
                      register={register}
                      errorInstance={errors}
                      isLoading={isLoading}
                      multiline={true}
                      rows={3}
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

                  <Grid item xs={12} md={6}>
                    <CustomDateTimeField
                      id='end_date'
                      label={messages['job_experience.end_date']}
                      register={register}
                      errorInstance={errors}
                      isLoading={isLoading}
                    />
                  </Grid>
                  <Grid item xs={12}>
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
                  <Grid item xs={12}>
                    <Grid container spacing={4} justifyContent={'flex-end'}>
                      <Grid item>
                        <CancelButton
                          onClick={props.onClose}
                          isLoading={isLoading}
                        />
                      </Grid>
                      <Grid item>
                        <SubmitButton
                          isSubmitting={isSubmitting}
                          isLoading={isLoading}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Zoom>
  );
};

export default JobExperienceAddEditPage;
