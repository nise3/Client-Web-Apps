import React, {useMemo} from 'react';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import useStyles from './Registration.style';
import {SubmitHandler, useForm} from 'react-hook-form';
import {
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Link,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import CustomDateTimeField from '../../../@softbd/elements/input/CustomDateTimeField';
import {useIntl} from 'react-intl';
import yup from '../../../@softbd/libs/yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {MOBILE_NUMBER_REGEX} from '../../../@softbd/common/patternRegex';

const YouthRegistration = () => {
  const classes = useStyles();
  const {messages} = useIntl();
  const isLoading = false;
  const validationSchema = useMemo(() => {
    return yup.object().shape({
      first_name: yup
        .string()
        .trim()
        .required()
        .label(messages['common.first_name'] as string),
      last_name: yup
        .string()
        .trim()
        .required()
        .label(messages['common.last_name'] as string),
      skill: yup
        .string()
        .trim()
        .required()
        .label(messages['common.skills'] as string),
      date_of_birth: yup
        .string()
        .trim()
        .required()
        .label(messages['common.date_of_birth'] as string),
      physical_disability: yup
        .string()
        .trim()
        .required()
        .label(messages['common.physical_disability'] as string),
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
      retype_password: yup
        .string()
        .trim()
        .required()
        .label(messages['common.retype_password'] as string),
      password: yup
        .string()
        .trim()
        .required()
        .label(messages['common.password'] as string),
    });
  }, [messages]);

  const {
    control,
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<any> = async () => {};
  return (
    <Container maxWidth={'md'} className={classes.root}>
      <Paper className={classes.PaperBox}>
        <Typography variant={'h6'} style={{marginBottom: '10px'}}>
          {messages['common.registration']}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
          <Grid container spacing={3} maxWidth={'md'}>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='first_name'
                label={messages['common.first_name']}
                register={register}
                errorInstance={errors}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='last_name'
                label={messages['common.last_name']}
                register={register}
                errorInstance={errors}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomFormSelect
                id='skill'
                label={messages['common.select_your_skills']}
                isLoading={isLoading}
                control={control}
                options={[]}
                optionValueProp={''}
                errorInstance={errors}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormLabel component='legend'>
                {messages['common.physical_disability']}
              </FormLabel>
              <RadioGroup
                row
                aria-label='position'
                name='position'
                defaultValue='No'>
                <FormControlLabel
                  value='Yes'
                  control={<Radio />}
                  label={messages['common.yes']}
                />
                <FormControlLabel
                  value='No'
                  control={<Radio />}
                  label={messages['common.no']}
                />
              </RadioGroup>
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomDateTimeField
                id='date_of_birth'
                label={messages['common.date_of_birth']}
                register={register}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomFormSelect
                id='physical_disability'
                label={messages['common.physical_disability']}
                isLoading={isLoading}
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
                id='retype_password'
                label={messages['common.retype_password']}
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
              <FormControl component='fieldset'>
                <FormLabel component='legend'>
                  {messages['common.gender']}
                </FormLabel>
                <RadioGroup
                  row
                  aria-label='position'
                  name='position'
                  defaultValue='male'>
                  <FormControlLabel
                    value='male'
                    control={<Radio />}
                    label={messages['common.male']}
                  />
                  <FormControlLabel
                    value='female'
                    control={<Radio />}
                    label={messages['common.female']}
                  />
                  <FormControlLabel
                    value='others'
                    control={<Radio />}
                    label={messages['common.others']}
                  />
                </RadioGroup>
              </FormControl>
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

export default YouthRegistration;
