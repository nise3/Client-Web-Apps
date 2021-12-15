import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Box, Grid, Input, Link, Typography} from '@mui/material';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {classes, StyledPaper} from '../../registrationVerification/index.style';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import yup from '../../../@softbd/libs/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import {useRouter} from 'next/router';
import {LINK_FRONTEND_YOUTH_COURSE_ENROLLMENT_CHOOSE_PAYMENT_METHOD} from '../../../@softbd/common/appLinks';
import {
  courseEnrollmentResendVerificationCode,
  courseEnrollmentVerification,
} from '../../../services/youthManagement/YouthService';
import cookieInstance from '../../../@softbd/libs/cookieInstance';
import {COOKIE_KEY_SEND_TIME} from '../../../shared/constants/AppConst';

const inputProps = {
  maxLength: 1,
  style: {
    textAlign: 'center',
  },
};

const CourseRegistrationVerification = () => {
  const {messages} = useIntl();
  const {errorStack, successStack} = useNotiStack();
  const router = useRouter();
  const {courseId, enrollment_id}: any = router.query;
  const [resendTime, setResendTime] = useState<string | null>(null);
  const [resendCode, setResendCode] = useState<boolean>(false);
  const [isSuccessSubmit, setIsSuccessSubmit] = useState<boolean>(false);

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

      if (resendDate && currentDate.getTime() - resendDate < 1000 * 30) {
        const expireTime = resendDate + 1000 * 30;
        const timeout = expireTime - currentDate.getTime();

        if (timeout > 0) {
          const interval = setInterval(() => {
            const time = new Date();
            let remainingSec = Math.ceil((expireTime - time.getTime()) / 1000);
            setResendTime(
              '00:' + (remainingSec < 10 ? '0' + remainingSec : remainingSec),
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

  const resendVerificationCode = useCallback(
    () => async () => {
      try {
        if (enrollment_id) {
          await courseEnrollmentResendVerificationCode(enrollment_id);
          successStack(
            <IntlMessages id={'common.resend_validation_code_success'} />,
          );

          const current = new Date();
          let expireDate = new Date();
          const expireTime = expireDate.getTime() + 1000 * 30;
          expireDate.setTime(expireTime);

          cookieInstance.set(COOKIE_KEY_SEND_TIME, current.getTime(), {
            expires: expireDate,
          });
          setResendTime('00:30');
          setResendCode(true);
        } else {
          errorStack(<IntlMessages id={'common.missing_enrollment_id'} />);
        }
      } catch (error: any) {
        processServerSideErrors({
          error,
          setError,
          validationSchema,
          errorStack,
        });
      }
    },
    [],
  );

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      let requestData: any = {};
      requestData.verification_code =
        data.code1 + data.code2 + data.code3 + data.code4;

      if (enrollment_id) {
        await courseEnrollmentVerification(enrollment_id, requestData);
        setIsSuccessSubmit(true);

        router
          .push({
            pathname:
              LINK_FRONTEND_YOUTH_COURSE_ENROLLMENT_CHOOSE_PAYMENT_METHOD +
              courseId,
            query: {enrollment_id: enrollment_id},
          })
          .then((r) => {});
      } else {
        errorStack(<IntlMessages id={'common.missing_enrollment_id'} />);
      }
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
  };

  return (
    <StyledPaper>
      <Typography
        variant={'h5'}
        style={{marginBottom: '10px', fontWeight: 'bold'}}>
        {messages['common.enter_validation_code']}
      </Typography>
      <Typography style={{marginBottom: '10px'}}>
        <IntlMessages id='common.validation_code_mobile' />
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
              Send code again in {resendTime}
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
        </Box>

        <Grid item xs={12}>
          <SubmitButton
            isSubmitting={isSubmitting || isSuccessSubmit || !enrollment_id}
            isLoading={false}
            label={messages['common.verify'] as string}
          />
        </Grid>
      </form>
    </StyledPaper>
  );
};

export default CourseRegistrationVerification;
