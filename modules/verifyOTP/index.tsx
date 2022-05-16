import React, {useEffect, useMemo, useState} from 'react';
import {classes, StyledPaper} from './index.style';
import {Box, Grid, Input, Typography} from '@mui/material';
import CustomTextInput from '../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {SubmitHandler, useForm} from 'react-hook-form';
import {processServerSideErrors} from '../../@softbd/utilities/validationErrorHandler';
import useNotiStack from '../../@softbd/hooks/useNotifyStack';
import SubmitButton from '../../@softbd/elements/button/SubmitButton/SubmitButton';
import IntlMessages from '../../@crema/utility/IntlMessages';
import {useIntl} from 'react-intl';
import yup from '../../@softbd/libs/yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {
  getBrowserCookie,
  setBrowserCookie,
} from '../../@softbd/libs/cookieInstance';
import {
  COOKIE_KEY_FORGOT_PASSWORD_USERNAME,
  COOKIE_KEY_FORGOT_PASSWORD_VERIFY_OTP,
} from '../../shared/constants/AppConst';
import {verifyForgotPasswordOtp} from '../../services/userManagement/UserService';
import {LINK_RESET_PASSWORD} from '../../@softbd/common/appLinks';
import {useRouter} from 'next/router';
import {niseDomain} from '../../@softbd/common/constants';

const inputProps = {
  maxLength: 1,
  style: {
    textAlign: 'center',
  },
};
const OTPVerificationPage = () => {
  const {messages} = useIntl();
  const {errorStack, successStack} = useNotiStack();
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const router = useRouter();
  const validationSchema = useMemo(() => {
    return yup.object().shape({
      codes: yup
        .string()
        .required()
        .length(6)
        .label(messages['common.verification_code'] as string),
    });
  }, [messages]);

  const {
    handleSubmit,
    register,
    setError,
    setValue,
    setFocus,
    watch,
    formState: {errors, isSubmitting},
  } = useForm<any>({resolver: yupResolver(validationSchema)});

  const watchAllFields: any = watch([
    'code1',
    'code2',
    'code3',
    'code4',
    'code5',
    'code6',
  ]);
  useEffect(() => {
    const username = getBrowserCookie(COOKIE_KEY_FORGOT_PASSWORD_USERNAME);
    if (!username) {
      router.push(niseDomain()).then((r) => {});
    }
  }, []);
  useEffect(() => {
    focusFiled();
    setValue('codes', watchAllFields.join(''));
  }, [watchAllFields]);

  const focusFiled = () => {
    const index = watchAllFields.indexOf('');
    if (watchAllFields[0] == undefined) {
      setFocus('code1');
    } else if (index >= 0 && index < 6) {
      setFocus('code' + (index + 1));
    }
  };

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      let formData: any = {};
      formData.otp_code =
        data.code1 +
        data.code2 +
        data.code3 +
        data.code4 +
        data.code5 +
        data.code6;
      formData.username = getBrowserCookie(COOKIE_KEY_FORGOT_PASSWORD_USERNAME);

      await verifyForgotPasswordOtp(formData);
      setIsSubmitted(true);
      successStack(<IntlMessages id='forgot_password.otp_verification' />);
      let expireDate = new Date();
      expireDate.setTime(expireDate.getTime() + 30 * 60 * 1000);
      await setBrowserCookie(COOKIE_KEY_FORGOT_PASSWORD_VERIFY_OTP, 1, {
        expires: expireDate,
      });

      router.push(LINK_RESET_PASSWORD).then((r) => {});
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
  };
  return (
    <StyledPaper>
      <Typography
        variant={'h5'}
        style={{marginBottom: '10px', fontWeight: 'bold'}}>
        {messages['common.enter_verification_code']}
      </Typography>
      <Typography style={{marginBottom: '10px'}}>
        <IntlMessages id='common.validation_code_mobile' />
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
        <Grid container spacing={3}>
          <Grid item xs={2}>
            <CustomTextInput
              id='code1'
              register={register}
              errorInstance={errors}
              isLoading={false}
              inputProps={inputProps}
            />
          </Grid>
          <Grid item xs={2}>
            <CustomTextInput
              id='code2'
              register={register}
              errorInstance={errors}
              isLoading={false}
              inputProps={inputProps}
            />
          </Grid>
          <Grid item xs={2}>
            <CustomTextInput
              id='code3'
              register={register}
              errorInstance={errors}
              isLoading={false}
              inputProps={inputProps}
            />
          </Grid>
          <Grid item xs={2}>
            <CustomTextInput
              id='code4'
              register={register}
              errorInstance={errors}
              isLoading={false}
              inputProps={inputProps}
            />
          </Grid>
          <Grid item xs={2}>
            <CustomTextInput
              id='code5'
              register={register}
              errorInstance={errors}
              isLoading={false}
              inputProps={inputProps}
            />
          </Grid>
          <Grid item xs={2}>
            <CustomTextInput
              id='code6'
              register={register}
              errorInstance={errors}
              isLoading={false}
              inputProps={inputProps}
            />
            <Input type={'hidden'} id={'codes'} {...register('codes')} />
          </Grid>
        </Grid>
        <Box className={classes.errorMessage}>
          {errors?.['codes'] && Boolean(errors?.['codes']) && (
            <IntlMessages
              id={errors?.['codes'].message.key}
              values={errors?.['codes'].message?.values || {}}
            />
          )}
        </Box>
        {/*<Box className={classes.sendCode}>
          {resendTime ? (
            <Typography variant={'caption'}>
              Send code again in {resendTime} minute
            </Typography>
          ) : (
            <Link
              sx={{
                '&:hover': {
                  cursor: 'pointer',
                },
              }}
              onClick={resendVerificationCode()}>
              {messages['common.send_code_text']}
            </Link>
          )}
        </Box>*/}

        <Grid item xs={12} display={'flex'} justifyContent={'center'} mt={2}>
          <SubmitButton
            isSubmitting={isSubmitting}
            isLoading={false}
            label={messages['common.verify'] as string}
            sx={{marginTop: '10px'}}
            isDisable={isSubmitting || isSubmitted}
          />
        </Grid>
      </form>
    </StyledPaper>
  );
};

export default OTPVerificationPage;
