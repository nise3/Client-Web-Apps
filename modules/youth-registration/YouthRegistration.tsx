import React from 'react';
import CustomTextInput from '../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import CustomFormSelect from '../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import SubmitButton from '../../@softbd/elements/button/SubmitButton/SubmitButton';
import useStyles from './Registration.style';
import {SubmitHandler, useForm} from 'react-hook-form';
import {Container, Grid, Paper, Typography} from '@mui/material';
import CustomDateTimeField from '../../@softbd/elements/input/CustomDateTimeField';
import {useIntl} from 'react-intl';

const YouthRegistration = () => {
  const classes = useStyles();
  const {messages} = useIntl();
  const isLoading = false;
  const {
    control,
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm();

  const onSubmit: SubmitHandler<any> = async () => {};
  return (
    <Container>
      <Paper className={classes.PaperBox}>
        <Typography variant={'h6'} style={{marginBottom: '10px'}}>
          Registration
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
          <Grid container spacing={3} maxWidth={'md'}>
            <Grid item xs={6}>
              <CustomTextInput
                id='firstName'
                label={messages['common.firstName']}
                register={register}
                isLoading={isLoading}
                errorInstance={errors}
              />
            </Grid>

            <Grid item xs={6}>
              <CustomTextInput
                id='lastName'
                label={messages['common.lastName']}
                register={register}
                isLoading={isLoading}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextInput
                id='board'
                label={messages['common.gender']}
                register={register}
                isLoading={isLoading}
                errorInstance={errors}
              />
            </Grid>

            <Grid item xs={6}>
              <CustomFormSelect
                id='skill'
                label={messages['common.gender']}
                isLoading={isLoading}
                control={control}
                options={[]}
                optionValueProp={''}
                errorInstance={errors}
              />
            </Grid>

            <Grid item xs={6}>
              <CustomTextInput
                id='physical_disabilities_status'
                label={messages['common.physical_disabilities_status']}
                register={register}
                isLoading={isLoading}
                errorInstance={errors}
              />
            </Grid>

            <Grid item xs={6}>
              <CustomDateTimeField
                id='date_of_birth'
                label={messages['common.date_of_birth']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomFormSelect
                id='physical_disabilities_status'
                label={messages['common.physical_disabilities_status']}
                isLoading={isLoading}
                control={control}
                options={[]}
                optionValueProp={''}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextInput
                id='email'
                label={messages['common.email']}
                register={register}
                isLoading={isLoading}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextInput
                id='mobile'
                label={messages['common.mobile']}
                register={register}
                isLoading={isLoading}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextInput
                id='password'
                label={messages['common.password']}
                register={register}
                isLoading={isLoading}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextInput
                id='retypePassword'
                label={messages['common.retypePassword']}
                register={register}
                isLoading={isLoading}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={12}>
              <SubmitButton isSubmitting={isSubmitting} isLoading={isLoading} />
            </Grid>
          </Grid>
        </form>
        <Typography style={{marginTop: '5px'}}>
          Already have an account? sing in here
        </Typography>
      </Paper>
    </Container>
  );
};

export default YouthRegistration;
