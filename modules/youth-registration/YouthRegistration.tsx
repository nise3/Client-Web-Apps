import React, {useMemo} from 'react';
import CustomTextInput from '../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import CustomFormSelect from '../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import SubmitButton from '../../@softbd/elements/button/SubmitButton/SubmitButton';
import useStyles from './Registration.style';
import {SubmitHandler, useForm} from 'react-hook-form';
import {
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import CustomDateTimeField from '../../@softbd/elements/input/CustomDateTimeField';
import {useIntl} from 'react-intl';
import yup from '../../@softbd/libs/yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {MOBILE_NUMBER_REGEX} from '../../@softbd/common/patternRegex';

const YouthRegistration = () => {
  const classes = useStyles();
  const {messages} = useIntl();
  const isLoading = false;
  const gender = messages['common.gender'];
  const validationSchema = useMemo(() => {
    return yup.object().shape({
      firstName: yup
        .string()
        .trim()
        .required()
        .label(messages['common.firstName'] as string),
      lastName: yup
        .string()
        .trim()
        .required()
        .label(messages['common.lastName'] as string),
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
      retypePassword: yup
        .string()
        .trim()
        .required()
        .label(messages['common.retypePassword'] as string),
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
    <Container maxWidth={'md'} style={{marginTop: '100px'}}>
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

            <Grid item xs={6}>
              <FormLabel component='legend'>Disability</FormLabel>
              <RadioGroup
                row
                aria-label='position'
                name='position'
                defaultValue='No'>
                <FormControlLabel value='Yes' control={<Radio />} label='Yes' />
                <FormControlLabel value='No' control={<Radio />} label='No' />
              </RadioGroup>
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
                id='physical_disability'
                label={messages['common.physical_disability']}
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
                id='retypePassword'
                label={messages['common.retypePassword']}
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
              <FormControl component='fieldset'>
                <FormLabel component='legend'>{gender}</FormLabel>
                <RadioGroup
                  row
                  aria-label='position'
                  name='position'
                  defaultValue='Male'>
                  <FormControlLabel
                    value='Male'
                    control={<Radio />}
                    label='Male'
                  />
                  <FormControlLabel
                    value='Female'
                    control={<Radio />}
                    label='Female'
                  />
                  <FormControlLabel
                    value='others'
                    control={<Radio />}
                    label='others'
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
          Already have an account? sing in here
        </Typography>
      </Paper>
    </Container>
  );
};

export default YouthRegistration;
