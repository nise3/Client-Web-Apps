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
import {
  isResponseSuccess,
  isValidationError,
} from '../../@softbd/utilities/helpers';
import IntlMessages from '../../@crema/utility/IntlMessages';
import {setServerValidationErrors} from '../../@softbd/utilities/validationErrorHandler';
import useNotiStack from '../../@softbd/hooks/useNotifyStack';
import {organizationRegistration} from '../../services/organaizationManagement/OrganizationRegistrationService';
const OrganizationRegistration = () => {
  const classes = useStyles();
  const {messages} = useIntl();
  const {successStack} = useNotiStack();
  const isLoading = false;
  const organizationTypes = useMemo(
    () => [
      {
        id: 1,
        label: 'private',
      },
      {
        id: 2,
        label: 'Govt',
      },
    ],
    [],
  );
  const validationSchema = useMemo(() => {
    return yup.object().shape({
      title_en: yup
        .string()
        .title('en')
        .label(messages['common.title_en'] as string),
      title: yup
        .string()
        .title('bn')
        .label(messages['common.title_bn'] as string),
      organization_type_id: yup
        .string()
        .trim()
        .required()
        .label(messages['common.company_type'] as string),
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
        .matches(MOBILE_NUMBER_REGEX)
        .label(messages['common.mobile'] as string),
      name_of_the_office_head: yup
        .string()
        .trim()
        .required()
        .label(messages['common.head_of_office_bn'] as string),
      contact_person_name: yup
        .string()
        .trim()
        .required()
        .label(messages['common.contact_person_name_en'] as string),
      address: yup
        .string()
        .trim()
        .required()
        .label(messages['common.address_bn'] as string),
      address_en: yup
        .string()
        .trim()
        .required()
        .label(messages['common.address_en'] as string),
      contact_person_designation: yup
        .string()
        .trim()
        .required()
        .label(messages['common.contact_person_designation_bn'] as string),
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
      password_confirmation: yup
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

  const onSubmit: SubmitHandler<any> = async (data) => {
    const response = await organizationRegistration(data);
    if (isResponseSuccess(response)) {
      successStack(<IntlMessages id='youth_registration.success' />);
    } else if (isValidationError(response)) {
      setServerValidationErrors(response.errors, setError, validationSchema);
    }
  };

  return (
    <Container maxWidth={'md'} style={{marginTop: '50px'}}>
      <Paper className={classes.PaperBox}>
        <Typography
          align={'center'}
          variant={'h6'}
          style={{marginBottom: '10px'}}>
          {messages['common.organization_registration']}
        </Typography>
        <Typography variant={'h6'} style={{marginBottom: '10px'}}>
          {messages['common.organizationInfoText']}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
          <Grid container spacing={3} maxWidth={'md'}>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='title_en'
                label={messages['common.title_en']}
                register={register}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='title'
                label={messages['common.title_bn']}
                register={register}
                errorInstance={errors}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomFormSelect
                id='organization_type_id'
                isLoading={isLoading}
                label={messages['common.company_type']}
                control={control}
                options={organizationTypes}
                optionValueProp={'id'}
                optionTitleProp={['label']}
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
                id='name_of_the_office_head_en '
                label={messages['common.head_of_office_en']}
                register={register}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='name_of_the_office_head'
                label={messages['common.head_of_office_bn']}
                register={register}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='name_of_the_office_head_designation_en'
                label={messages['common.designation_en']}
                register={register}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='name_of_the_office_head_designation'
                label={messages['common.designation_bn']}
                register={register}
                errorInstance={errors}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='address_en'
                label={messages['common.address_en']}
                register={register}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='address'
                label={messages['common.address_bn']}
                register={register}
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
            <Grid item xs={12}>
              <Typography variant={'h6'}>
                {messages['common.userInfoText']}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='contact_person_name_en'
                label={messages['common.contact_person_name_en']}
                register={register}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='contact_person_name'
                label={messages['common.contact_person_name_bn']}
                register={register}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='contact_person_designation_en'
                label={messages['common.contact_person_designation_en']}
                register={register}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='contact_person_designation'
                label={messages['common.contact_person_designation_bn']}
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
                id='password_confirmation'
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
          {messages['common.alreadyHaveAccount']}{' '}
          <Link>{messages['common.signInHere']}</Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default OrganizationRegistration;
