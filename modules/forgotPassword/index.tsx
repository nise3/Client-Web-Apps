import React from 'react';
import {classes, StyledContainer} from '../signup/index.style';
import {Grid, Paper} from '@mui/material';
import {Body2, H6} from '../../@softbd/elements/common';
import CustomTextInput from '../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {SubmitHandler, useForm} from 'react-hook-form';
import {processServerSideErrors} from '../../@softbd/utilities/validationErrorHandler';
import useNotiStack from '../../@softbd/hooks/useNotifyStack';
import SubmitButton from '../../@softbd/elements/button/SubmitButton/SubmitButton';
import {sendForgetPasswordOTP} from '../../services/userManagement/UserService';
import {setBrowserCookie} from '../../@softbd/libs/cookieInstance';
import {COOKIE_KEY_FORGET_PASSWORD_USERNAME} from '../../shared/constants/AppConst';
import {useRouter} from 'next/router';
import {LINK_VERIFY_OTP_FORGOT_PASSWORD} from '../../@softbd/common/appLinks';
import {useIntl} from 'react-intl';

const ForgotPasswordPage = () => {
  const {messages} = useIntl();
  const router = useRouter();
  const {errorStack} = useNotiStack();
  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<any>();

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      console.log(data);
      await sendForgetPasswordOTP(data);
      let expireDate = new Date();
      expireDate.setTime(expireDate.getTime() + 30 * 60 * 1000);
      await setBrowserCookie(
        COOKIE_KEY_FORGET_PASSWORD_USERNAME,
        data?.username,
        {
          expires: expireDate,
        },
      );
      router.push(LINK_VERIFY_OTP_FORGOT_PASSWORD).then((r) => {});
    } catch (error: any) {
      processServerSideErrors({error, errorStack});
    }
  };
  return (
    <StyledContainer sx={{display: 'flex'}}>
      <Paper className={classes.paperBox}>
        <H6 align={'center'} mb={4} sx={{borderBottom: '1px solid #8888'}}>
          {messages['common.find_your_account']}
        </H6>
        <Body2 mb={2}>{messages['common.enter_username']}</Body2>{' '}
        <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <CustomTextInput
                id='username'
                label={messages['common.user_name']}
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
                size='large'
                isDisable={isSubmitting}
              />
            </Grid>
          </Grid>
        </form>
      </Paper>
    </StyledContainer>
  );
};

export default ForgotPasswordPage;
