import React, {FC, useEffect, useMemo} from 'react';
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
  const {successStack, errorStack} = useNotiStack();

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

  const redirectToSSO = () => {
    window.location.href = getSSOLoginUrl();
  };

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
          <Link>{messages['common.send_code_text']}</Link>
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
