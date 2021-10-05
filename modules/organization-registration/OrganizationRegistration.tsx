import React, {useMemo} from 'react';
import useStyles from './Registration.style';
import {useIntl} from 'react-intl';
import {SubmitHandler, useForm} from 'react-hook-form';
import {Container, Grid, Link, Paper, Typography} from '@mui/material';
import CustomTextInput from '../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import CustomFormSelect from '../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import SubmitButton from '../../@softbd/elements/button/SubmitButton/SubmitButton';
import yup from '../../@softbd/libs/yup';
import {MOBILE_NUMBER_REGEX} from '../../@softbd/common/patternRegex';
import {yupResolver} from '@hookform/resolvers/yup';

const OrganizationRegistration = () => {
  const classes = useStyles();
  const {messages} = useIntl();
  const isLoading = false;
  const organizationInfoText = messages['common.organizationInfoText'];
  const userInfoText = messages['common.userInfoText'];
  const organizationRegistration = messages['common.organization_registration'];
  const alreadyHaveAccount = messages['common.alreadyHaveAccount'];
  const signInHere = messages['common.signInHere'];
  const validationSchema = useMemo(() => {
    return yup.object().shape({
      company_name: yup
        .string()
        .trim()
        .required()
        .label(messages['common.company_name'] as string),
      company_type: yup
        .string()
        .trim()
        .required()
        .label(messages['common.institute_type'] as string),
      email: yup
        .string()
        .trim()
        .required()
        .email()
        .label(messages['common.email'] as string),
      mobile: yup
        .string()
        .trim()
        .required()
        .label(messages['common.mobile'] as string),
      head_of_office: yup
        .string()
        .trim()
        .required()
        .label(messages['common.head_of_office'] as string),
      designation: yup
        .string()
        .trim()
        .required()
        .label(messages['common.designation'] as string),
      institute_address: yup
        .string()
        .trim()
        .required()
        .label(messages['common.institute_address'] as string),
      contact_person_name: yup
        .string()
        .trim()
        .required()
        .label(messages['common.contact_person_name'] as string),
      contact_person_designation: yup
        .string()
        .trim()
        .required()
        .label(messages['common.contact_person_designation'] as string),
      contact_person_email: yup
        .string()
        .trim()
        .required()
        .label(messages['common.contact_person_email'] as string),
      contact_person_mobile: yup
        .string()
        .trim()
        .required()
        .matches(MOBILE_NUMBER_REGEX)
        .label(messages['common.contact_person_mobile'] as string),
      password: yup
        .string()
        .trim()
        .required()
        .label(messages['common.password'] as string),
      retype_password: yup
        .string()
        .trim()
        .required()
        .label(messages['common.retype_password'] as string),
    });
  }, [messages]);
  const {
    control,
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<any>({resolver: yupResolver(validationSchema)});

  const onSubmit: SubmitHandler<any> = async () => {};

  return (
    <Container maxWidth={'md'} style={{marginTop: '100px'}}>
      <Paper className={classes.PaperBox}>
        <Typography
          align={'center'}
          variant={'h6'}
          style={{marginBottom: '10px'}}>
          {organizationRegistration}
        </Typography>
        <Typography variant={'h6'} style={{marginBottom: '10px'}}>
          {organizationInfoText}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
          <Grid container spacing={3} maxWidth={'md'}>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='company_name'
                label={messages['common.company_name']}
                register={register}
                errorInstance={errors}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomFormSelect
                id='company_type'
                isLoading={isLoading}
                label={messages['common.company_type']}
                control={control}
                options={[]}
                optionValueProp={''}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='email'
                label={messages['common.email']}
                register={register}
                errorInstance={errors}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='mobile'
                label={messages['common.mobile']}
                register={register}
                errorInstance={errors}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='head_of_office'
                label={messages['common.head_of_office']}
                register={register}
                errorInstance={errors}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='designation'
                label={messages['common.designation']}
                register={register}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextInput
                id='company_address'
                label={messages['common.company_address']}
                register={register}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant={'h6'}>{userInfoText}</Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='contact_person_name'
                label={messages['common.contact_person_name']}
                register={register}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='contact_person_designation'
                label={messages['common.contact_person_designation']}
                register={register}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='contact_person_email'
                label={messages['common.contact_person_email']}
                register={register}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='contact_person_mobile'
                label={messages['common.contact_person_mobile']}
                register={register}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='password'
                label={messages['common.password']}
                register={register}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='retype_assword'
                label={messages['common.retype_password']}
                register={register}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={12}>
              <SubmitButton isSubmitting={isSubmitting} isLoading={isLoading} />
            </Grid>
          </Grid>
        </form>
        <Typography style={{marginTop: '5px'}}>
          {alreadyHaveAccount} <Link>{signInHere}</Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default OrganizationRegistration;
