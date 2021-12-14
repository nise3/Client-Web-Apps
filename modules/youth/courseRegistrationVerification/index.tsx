import React, {useCallback, useEffect, useMemo} from 'react';
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

const inputProps = {
  maxLength: 1,
  style: {
    textAlign: 'center',
  },
};

const CourseRegistrationVerification = () => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const router = useRouter();
  const {courseId, enrollment_id}: any = router.query;

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
      requestData.enrollment_id = enrollment_id;
      console.log('data', requestData);

      router
        .push({
          pathname:
            LINK_FRONTEND_YOUTH_COURSE_ENROLLMENT_CHOOSE_PAYMENT_METHOD +
            courseId,
          query: {enrollment_id: enrollment_id},
        })
        .then((r) => {});
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
          <Link
            sx={{
              '&:hover': {
                cursor: 'pointer',
              },
            }}
            onClick={resendVerificationCode()}>
            {messages['common.send_code_text']}
          </Link>
        </Box>

        <Grid item xs={12}>
          <SubmitButton
            isSubmitting={isSubmitting}
            isLoading={false}
            label={messages['common.verify'] as string}
          />
        </Grid>
      </form>
    </StyledPaper>
  );
};

export default CourseRegistrationVerification;
