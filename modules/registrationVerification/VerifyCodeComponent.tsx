import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {Box, Grid, Input, Link, Typography} from '@mui/material';
import CustomTextInput from '../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import SubmitButton from '../../@softbd/elements/button/SubmitButton/SubmitButton';

import {useIntl} from 'react-intl';
import yup from '../../@softbd/libs/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {youthRegistrationVerification} from '../../services/youthManagement/YouthRegistrationService';
import IntlMessages from '../../@crema/utility/IntlMessages';
import {processServerSideErrors} from '../../@softbd/utilities/validationErrorHandler';
import useNotiStack from '../../@softbd/hooks/useNotifyStack';
import {getSSOLoginUrl} from '../../@softbd/common/SSOConfig';
import {classes, StyledPaper} from './index.style';
import {createVerificationCode} from '../../services/youthManagement/RegistrationVerificationService';
import cookieInstance from '../../@softbd/libs/cookieInstance';
import {COOKIE_KEY_SEND_TIME} from '../../shared/constants/AppConst';
import {RESEND_CODE_RETRY_TIME_IN_MILLIS} from '../../@softbd/common/constants';
import {useRouter} from 'next/router';

const inputProps = {
  maxLength: 1,
  style: {
    textAlign: 'center',
  },
};

interface VerifyCodeComponentProps {
  userEmailAndMobile?: any;
}

const VerifyCodeComponent: FC<VerifyCodeComponentProps> = ({
  userEmailAndMobile,
}) => {
  const {messages} = useIntl();
  const router = useRouter();
  const {successStack, errorStack} = useNotiStack();
  const [resendTime, setResendTime] = useState<string | null>(null);
  const [resendCode, setResendCode] = useState<boolean>(false);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      codes: yup
        .string()
        .required()
        .length(4)
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
  const watchAllFields: any = watch(['code1', 'code2', 'code3', 'code4']);

  useEffect(() => {
    let resendDate = cookieInstance.get(COOKIE_KEY_SEND_TIME);
    if (resendCode || resendDate) {
      resendDate = resendDate ? Number(resendDate) : null;
      const currentDate = new Date();

      if (
        resendDate &&
        currentDate.getTime() - resendDate < RESEND_CODE_RETRY_TIME_IN_MILLIS
      ) {
        const expireTime = resendDate + RESEND_CODE_RETRY_TIME_IN_MILLIS;
        const timeout = expireTime - currentDate.getTime();

        if (timeout > 0) {
          const interval = setInterval(() => {
            const time = new Date();
            let remainingSec = Math.ceil((expireTime - time.getTime()) / 1000);
            let remainingMin = Math.floor(remainingSec / 60);
            remainingSec = remainingSec % 60;
            setResendTime(
              '0' +
                remainingMin +
                ':' +
                (remainingSec < 10 ? '0' + remainingSec : remainingSec),
            );

            if (remainingSec < 0) {
              clearInterval(interval);
              setResendTime(null);
              setResendCode(false);
            }
          }, 1000);
        }
      } else {
        setResendTime(null);
      }
    }
  }, [resendCode]);

  useEffect(() => {
    focusFiled();
    setValue('codes', watchAllFields.join(''));
  }, [watchAllFields]);

  const focusFiled = () => {
    const index = watchAllFields.indexOf('');
    if (index >= 0 && index < 4) setFocus('code' + (index + 1));
  };

  const redirectToSSO = () => {
    if (router.query?.redirected_from) {
      window.location.href = getSSOLoginUrl({
        redirected_from: router.query.redirected_from,
      });
    } else {
      window.location.href = getSSOLoginUrl();
    }
  };

  const resendVerificationCode = useCallback(
    () => async () => {
      try {
        await createVerificationCode(userEmailAndMobile);
        const successMsg = userEmailAndMobile.email ? (
          <IntlMessages
            id='common.verification_message_on_email'
            values={{subject: userEmailAndMobile.email}}
          />
        ) : (
          <IntlMessages
            id='common.verification_message_on_mobile'
            values={{subject: userEmailAndMobile.mobile}}
          />
        );

        successStack(successMsg);

        const current = new Date();
        let expireDate = new Date();
        const expireTime =
          expireDate.getTime() + RESEND_CODE_RETRY_TIME_IN_MILLIS;
        expireDate.setTime(expireTime);

        cookieInstance.set(COOKIE_KEY_SEND_TIME, current.getTime(), {
          expires: expireDate,
        });
        setResendTime('03:00');
        setResendCode(true);
      } catch (error: any) {
        processServerSideErrors({
          error,
          setError,
          validationSchema,
          errorStack,
        });
      }
    },
    [userEmailAndMobile],
  );

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      let requestData: any = {};
      requestData.verification_code =
        data.code1 + data.code2 + data.code3 + data.code4;

      if (userEmailAndMobile?.mobile)
        requestData.mobile = userEmailAndMobile.mobile;
      if (userEmailAndMobile?.email)
        requestData.email = userEmailAndMobile.email;
      await youthRegistrationVerification(requestData);
      successStack(
        <IntlMessages id='youth_registration.verification_success' />,
      );
      redirectToSSO();
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
  };

  return (
    <StyledPaper>
      <Typography
        tabIndex={0}
        variant={'h5'}
        style={{marginBottom: '10px', fontWeight: 'bold'}}>
        {messages['common.enter_verification_code']}
      </Typography>
      <Typography style={{marginBottom: '10px'}}>
        {userEmailAndMobile?.email && (
          <IntlMessages
            id='common.verification_message_on_email'
            values={{subject: userEmailAndMobile.email}}
          />
        )}
        {userEmailAndMobile?.mobile && (
          <IntlMessages
            id='common.verification_message_on_mobile'
            values={{subject: userEmailAndMobile.mobile}}
          />
        )}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <CustomTextInput
              id='code1'
              register={register}
              errorInstance={errors}
              isLoading={false}
              inputProps={inputProps}
            />
          </Grid>
          <Grid item xs={3}>
            <CustomTextInput
              id='code2'
              register={register}
              errorInstance={errors}
              isLoading={false}
              inputProps={inputProps}
            />
          </Grid>
          <Grid item xs={3}>
            <CustomTextInput
              id='code3'
              register={register}
              errorInstance={errors}
              isLoading={false}
              inputProps={inputProps}
            />
          </Grid>
          <Grid item xs={3}>
            <CustomTextInput
              id='code4'
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
        <Box className={classes.sendCode}>
          {resendTime ? (
            <Typography variant={'caption'}>
              Send code again in {resendTime} minute
            </Typography>
          ) : (
            <Link
              tabIndex={0}
              sx={{
                '&:hover': {
                  cursor: 'pointer',
                },
              }}
              onClick={resendVerificationCode()}>
              {messages['common.send_code_text']}
            </Link>
          )}
        </Box>

        <Grid item xs={12}>
          <SubmitButton
            isSubmitting={
              isSubmitting ||
              (!userEmailAndMobile?.mobile && !userEmailAndMobile?.email)
            }
            isLoading={false}
            label={messages['common.verify'] as string}
          />
        </Grid>
      </form>
    </StyledPaper>
  );
};

export default VerifyCodeComponent;
