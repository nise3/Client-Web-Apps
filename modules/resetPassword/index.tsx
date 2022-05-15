import React, {useEffect, useMemo, useState} from 'react';
import {classes, StyledContainer} from './index.style';
import {Grid, Paper} from '@mui/material';
import {H6} from '../../@softbd/elements/common';
import CustomTextInput from '../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {SubmitHandler, useForm} from 'react-hook-form';
import {processServerSideErrors} from '../../@softbd/utilities/validationErrorHandler';
import useNotiStack from '../../@softbd/hooks/useNotifyStack';
import SubmitButton from '../../@softbd/elements/button/SubmitButton/SubmitButton';
import {resetPassword} from '../../services/userManagement/UserService';
import {useRouter} from 'next/router';
import {
  getBrowserCookie,
  removeBrowserCookie,
} from '../../@softbd/libs/cookieInstance';
import {niseDomain} from '../../@softbd/common/constants';
import {
  COOKIE_KEY_FORGET_PASSWORD_USERNAME,
  COOKIE_KEY_FORGET_PASSWORD_VERIFY_OTP,
} from '../../shared/constants/AppConst';
import {TEXT_REGEX_PASSWORD} from '../../@softbd/common/patternRegex';
import {yupResolver} from '@hookform/resolvers/yup';
import {useIntl} from 'react-intl';
import yup from '../../@softbd/libs/yup';
import IntlMessages from '../../@crema/utility/IntlMessages';
import {getSSOLoginUrl} from '../../@softbd/common/SSOConfig';

const ResetPasswordPage = () => {
  const {messages} = useIntl();
  const router = useRouter();
  const {errorStack, successStack} = useNotiStack();
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  useEffect(() => {
    const username = getBrowserCookie(COOKIE_KEY_FORGET_PASSWORD_USERNAME);
    const otpCode = getBrowserCookie(COOKIE_KEY_FORGET_PASSWORD_VERIFY_OTP);
    if (!otpCode || !username) {
      router.push(niseDomain()).then((r) => {});
    }
  }, []);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      new_password: yup
        .string()
        .trim()
        .min(8)
        .required()
        .matches(TEXT_REGEX_PASSWORD)
        .label(messages['common.password'] as string),
      password_confirmation: yup
        .string()
        .trim()
        .required()
        .oneOf(
          [yup.ref('new_password'), null],
          messages['common.password_must_match'] as string,
        )
        .label(messages['common.retype_password'] as string),
    });
  }, [messages]);

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<any>({resolver: yupResolver(validationSchema)});

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      console.log(data);
      data.username = getBrowserCookie(COOKIE_KEY_FORGET_PASSWORD_USERNAME);
      await resetPassword(data);
      setIsSubmitted(true);
      successStack(<IntlMessages id='forgot_password.reset_password' />);
      removeBrowserCookie(COOKIE_KEY_FORGET_PASSWORD_USERNAME);
      removeBrowserCookie(COOKIE_KEY_FORGET_PASSWORD_VERIFY_OTP);
      router.push(getSSOLoginUrl()).then((r) => {});
    } catch (error: any) {
      processServerSideErrors({error, errorStack});
    }
  };
  return (
    <StyledContainer sx={{display: 'flex'}}>
      <Paper className={classes.paperBox}>
        <H6 align={'center'} mb={4} sx={{borderBottom: '1px solid #8888'}}>
          {messages['common.reset_password']}
        </H6>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <CustomTextInput
                required
                id='new_password'
                type={'password'}
                helperText={messages['common.passwordHint']}
                label={messages['common.new_password']}
                register={register}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextInput
                required
                type={'password'}
                id='password_confirmation'
                label={messages['common.retype_password']}
                register={register}
                errorInstance={errors}
              />
            </Grid>
            <Grid
              item
              xs={12}
              display={'flex'}
              justifyContent={'center'}
              mt={2}>
              <SubmitButton
                startIcon={false}
                isSubmitting={isSubmitting}
                label={messages['common.submit'] as string}
                size='medium'
                isDisable={isSubmitting || isSubmitted}
              />
            </Grid>
          </Grid>
        </form>
      </Paper>
    </StyledContainer>
  );
};

export default ResetPasswordPage;
