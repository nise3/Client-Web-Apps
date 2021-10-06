import {Container, Grid} from '@mui/material';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useEffect, useMemo, useState} from 'react';
import CustomTextInput from '../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {
  isResponseSuccess,
  isValidationError,
} from '../../@softbd/utilities/helpers';
import IntlMessages from '../../@crema/utility/IntlMessages';
import {setServerValidationErrors} from '../../@softbd/utilities/validationErrorHandler';
import {
  createRankType,
  updateRankType,
} from '../../services/organaizationManagement/RankTypeService';
import yup from '../../@softbd/libs/yup';
import useNotiStack from '../../@softbd/hooks/useNotifyStack';
import {useIntl} from 'react-intl';
import CustomDateTimeField from '../../@softbd/elements/input/CustomDateTimeField';
import {
  Box,
  Card,
  CardContent,
  FormControlLabel,
  Switch,
  Typography,
} from '@mui/material';
import YouthProfileNavigationSidebar from './component/YouthProfileNavigationSidebar';
import SubmitButton from '../../@softbd/elements/button/SubmitButton/SubmitButton';
import {useRouter} from 'next/router';

interface JobExperienceAddEditProps {
  itemId: number | null;
  onClose: () => void;
}

const initialValues = {
  company_name: '',
  position: '',
  type_of_employee: '',
  location: '',
  job_description: '',
  start_date: '',
  end_date: '',
};

const JobExperienceAddEditPage: FC<JobExperienceAddEditProps> = () => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();

  const router = useRouter();
  const {jobExperienceId} = router.query;

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      company_name: yup
        .string()
        .label(messages['common.company_name'] as string),
      position: yup.string().label(messages['common.position'] as string),
      type_of_employee: yup
        .string()
        .label(messages['common.type_of_employee'] as string),
      location: yup.string().label(messages['common.location'] as string),
      job_description: yup
        .string()
        .label(messages['common.job_description'] as string),
      start_date: yup.string().label(messages['common.start_date'] as string),
      end_date: yup.string().label(messages['common.end_date'] as string),
    });
  }, [messages]);

  const {
    handleSubmit,
    register,
    reset,
    setError,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [itemData, setItemData] = useState<any>(null);
  const itemId = Number(jobExperienceId);
  const isEdit = itemId != null;

  useEffect(() => {
    if (Number(jobExperienceId)) {
      setItemData({
        company_name: 'softbd ltd',
        position: 'software engineer',
        type_of_employee: 'full time',
        location: 'dhaka 1232',
        job_description: 'building web apps',
        start_date: '2008-10-12',
        end_date: '2008-12-12',
      });
    }
  }, [jobExperienceId]);

  useEffect(() => {
    if (itemData) {
      reset({
        company_name: itemData.company_name,
        position: itemData?.position,
        type_of_employee: itemData?.type_of_employee,
        location: itemData?.location,
        job_description: itemData?.job_description,
        start_date: itemData?.start_date,
        end_date: itemData?.end_date,
      });
    } else {
      reset(initialValues);
    }
  }, [itemData]);

  const onSubmit: SubmitHandler<any> = async (data) => {
    const response = itemId
      ? await updateRankType(itemId, data)
      : await createRankType(data);
    if (isResponseSuccess(response) && isEdit) {
      successStack(
        <IntlMessages
          id='common.subject_updated_successfully'
          values={{subject: <IntlMessages id='rank_types.label' />}}
        />,
      );
    } else if (isResponseSuccess(response) && !isEdit) {
      successStack(
        <IntlMessages
          id='common.subject_created_successfully'
          values={{subject: <IntlMessages id='rank_types.label' />}}
        />,
      );
    } else if (isValidationError(response)) {
      setServerValidationErrors(response.errors, setError, validationSchema);
    }
  };

  return (
    <Container maxWidth={'lg'}>
      <Box mt={4} mb={2}>
        <Grid container justifyContent={'center'} spacing={2}>
          <Grid item md={4}>
            <YouthProfileNavigationSidebar />
          </Grid>
          <Grid item md={8}>
            <Card>
              <CardContent>
                <Typography variant={'h6'} mb={4}>
                  {messages['common.job_experience']}
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)} autoComplete={'off'}>
                  <Grid container spacing={5}>
                    <Grid item xs={12}>
                      <CustomTextInput
                        id='company_name'
                        label={messages['common.company_name']}
                        register={register}
                        errorInstance={errors}
                        isLoading={false}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <CustomTextInput
                        id='position'
                        label={messages['common.position']}
                        register={register}
                        errorInstance={errors}
                        isLoading={false}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <CustomTextInput
                        id='type_of_employee'
                        label={messages['common.type_of_employee']}
                        register={register}
                        errorInstance={errors}
                        isLoading={false}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <CustomTextInput
                        id='location'
                        label={messages['common.location']}
                        register={register}
                        errorInstance={errors}
                        isLoading={false}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <CustomTextInput
                        id='job_description'
                        label={messages['job_experience.job_description']}
                        register={register}
                        errorInstance={errors}
                        isLoading={false}
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
                        isLoading={false}
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <CustomDateTimeField
                        id='end_date'
                        label={messages['job_experience.end_date']}
                        register={register}
                        errorInstance={errors}
                        isLoading={false}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={<Switch defaultChecked />}
                        label='I currently work here'
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <SubmitButton
                        isSubmitting={isSubmitting}
                        isLoading={false}
                      />
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default JobExperienceAddEditPage;
