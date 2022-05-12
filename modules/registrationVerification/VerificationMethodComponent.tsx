import React, {FC, useCallback, useMemo, useState} from 'react';

import {useIntl} from 'react-intl';
import yup from '../../@softbd/libs/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {Grid, Typography} from '@mui/material';
import CustomTextInput from '../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import SubmitButton from '../../@softbd/elements/button/SubmitButton/SubmitButton';
import CustomFormSelect from '../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import {MOBILE_NUMBER_REGEX} from '../../@softbd/common/patternRegex';
import {StyledPaper} from './index.style';

const VERIFICATION_METHOD = {
  MOBILE: '1',
  EMAIL: '2',
};
const verificationMethod = [
  {
    id: VERIFICATION_METHOD.MOBILE,
    label: 'Mobile',
  },
  {
    id: VERIFICATION_METHOD.EMAIL,
    label: 'Email',
  },
];

interface VerificationMethodComponentProps {
  onSendSuccess: (data: any) => void;
}

const VerificationMethodComponent: FC<VerificationMethodComponentProps> = ({
  onSendSuccess,
}) => {
  const {messages} = useIntl();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      verify_method: yup
        .string()
        .required()
        .label(messages['common.verify_method'] as string),
      mobile:
        selectedMethod && selectedMethod == VERIFICATION_METHOD.MOBILE
          ? yup
              .string()
              .trim()
              .required()
              .matches(MOBILE_NUMBER_REGEX)
              .label(messages['common.mobile'] as string)
          : yup.string().nullable(),
      email:
        selectedMethod && selectedMethod == VERIFICATION_METHOD.EMAIL
          ? yup
              .string()
              .trim()
              .required()
              .email()
              .label(messages['common.email'] as string)
          : yup.string().nullable(),
    });
  }, [messages, selectedMethod]);

  const {
    handleSubmit,
    register,
    control,
    formState: {errors, isSubmitting},
  } = useForm<any>({resolver: yupResolver(validationSchema)});

  const onVerifyMethodChange = useCallback((methodId: string | null) => {
    setSelectedMethod(methodId);
  }, []);

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    onSendSuccess(data);
  };

  return (
    <StyledPaper>
      <Typography
        tabIndex={0}
        variant={'h5'}
        style={{marginBottom: '10px', fontWeight: 'bold'}}>
        {messages['common.verify_text']}
      </Typography>
      <Typography style={{marginBottom: '10px'}}>
        {messages['common.verify_account']}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <CustomFormSelect
              id='verify_method'
              isLoading={false}
              label={messages['common.verify_method']}
              control={control}
              options={verificationMethod}
              optionValueProp={'id'}
              optionTitleProp={['label']}
              errorInstance={errors}
              onChange={onVerifyMethodChange}
            />
          </Grid>

          {selectedMethod && selectedMethod == VERIFICATION_METHOD.MOBILE && (
            <Grid item xs={12}>
              <CustomTextInput
                id='mobile'
                label={messages['common.mobile']}
                register={register}
                errorInstance={errors}
                isLoading={false}
              />
            </Grid>
          )}

          {selectedMethod && selectedMethod == VERIFICATION_METHOD.EMAIL && (
            <Grid item xs={12}>
              <CustomTextInput
                id='email'
                label={messages['common.email']}
                register={register}
                errorInstance={errors}
                isLoading={false}
              />
            </Grid>
          )}

          <Grid item xs={12}>
            <SubmitButton
              isSubmitting={isSubmitting}
              isLoading={false}
              label={messages['common.send'] as string}
            />
          </Grid>
        </Grid>
      </form>
    </StyledPaper>
  );
};

export default VerificationMethodComponent;
