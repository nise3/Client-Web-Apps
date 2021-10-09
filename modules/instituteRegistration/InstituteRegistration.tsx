import React, {useMemo} from 'react';
import useStyles from '../youth/registration/Registration.style';
import {useIntl} from 'react-intl';
import {SubmitHandler, useForm} from 'react-hook-form';
import {Container, Grid, Link, Paper, Typography} from '@mui/material';
import CustomTextInput from '../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import SubmitButton from '../../@softbd/elements/button/SubmitButton/SubmitButton';
import yup from '../../@softbd/libs/yup';
import {MOBILE_NUMBER_REGEX} from '../../@softbd/common/patternRegex';
import {yupResolver} from '@hookform/resolvers/yup';
import {
  isResponseSuccess,
  isValidationError,
} from '../../@softbd/utilities/helpers';
import IntlMessages from '../../@crema/utility/IntlMessages';
import {setServerValidationErrors} from '../../@softbd/utilities/validationErrorHandler';
import useNotiStack from '../../@softbd/hooks/useNotifyStack';
import {createRegistration} from '../../services/instituteManagement/RegistrationService';
import FormRadioButtons from '../../@softbd/elements/input/CustomRadioButtonGroup/FormRadioButtons';

const InstituteRegistration = () => {
  const classes = useStyles();
  const {messages} = useIntl();
  const isLoading = false;
  const instituteInfoText = messages['common.instituteInfoText'];
  const userInfoText = messages['common.userInfoText'];
  const instituteRegistration = messages['common.institute_registration'];
  const alreadyHaveAccount = messages['common.alreadyHaveAccount'];
  const signInHere = messages['common.signInHere'];

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      institute_name: yup
        .string()
        .trim()
        .required()
        .label(messages['common.institute_name'] as string),
      institute_type: yup
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
        .label(messages['common.Head_of_office'] as string),
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
    setError,
    formState: {errors, isSubmitting},
  } = useForm<any>({resolver: yupResolver(validationSchema)});

  const {successStack} = useNotiStack();

  const onSubmit: SubmitHandler<any> = async (data) => {
    console.log('form data', data);
    const response = await createRegistration(data);
    if (isResponseSuccess(response)) {
      successStack(
        <IntlMessages
          id='common.subject_created_successfully'
          values={{
            subject: <IntlMessages id='common.institute_registration' />,
          }}
        />,
      );
    } else if (isValidationError(response)) {
      setServerValidationErrors(response.errors, setError, validationSchema);
    }
  };

  console.log(errors);
  return (
    <Container maxWidth={'md'} style={{marginTop: '50px'}}>
      <Paper className={classes.PaperBox}>
        <Typography
          align={'center'}
          variant={'h6'}
          style={{marginBottom: '10px'}}>
          {instituteRegistration}
        </Typography>
        <Typography variant={'h6'} style={{marginBottom: '10px'}}>
          {instituteInfoText}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
          <Grid container spacing={3} maxWidth={'md'}>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='institute_name'
                label={messages['common.institute_name']}
                register={register}
                errorInstance={errors}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormRadioButtons
                id='institute_type'
                label={'common.institute_type'}
                radios={[
                  {
                    key: '1',
                    label: messages['common.government'],
                  },
                  {
                    key: '2',
                    label: messages['common.non_government'],
                  },
                ]}
                control={control}
                defaultValue={'1'}
                isLoading={isLoading}
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
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='institute_address'
                label={messages['common.institute_address']}
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
                id='retype_password'
                label={messages['common.retype_password']}
                register={register}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container justifyContent={'flex-end'}>
                <SubmitButton
                  isSubmitting={isSubmitting}
                  isLoading={isLoading}
                />
              </Grid>
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

export default InstituteRegistration;
