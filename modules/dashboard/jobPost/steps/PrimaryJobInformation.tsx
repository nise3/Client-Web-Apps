import React, {useMemo, useState} from 'react';
import {Box, Button, Grid, Typography} from '@mui/material';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import yup from '../../../../@softbd/libs/yup';
import {useIntl} from 'react-intl';
import CustomTextInput from '../../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {processServerSideErrors} from '../../../../@softbd/utilities/validationErrorHandler';
import useNotiStack from '../../../../@softbd/hooks/useNotifyStack';
import FormRadioButtons from '../../../../@softbd/elements/input/CustomRadioButtonGroup/FormRadioButtons';
import {ServiceTypes} from '../enums/ServiceTypes';
import CustomCheckbox from '../../../../@softbd/elements/input/CustomCheckbox/CustomCheckbox';

interface Props {
  onContinue: () => void;
}

const PrimaryJobInformation = ({onContinue}: Props) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const [isNotApplicable, setIsNotApplicable] = useState<boolean>(false);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      job_title: yup
        .string()
        .required()
        .label(messages['job_posting.job_title'] as string),
    });
  }, [messages]);
  const {
    register,
    control,
    setError,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      console.log('data', data);

      //do data save work here

      onContinue();
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
  };

  return (
    <Box mt={2} mb={3}>
      <Typography mb={3} variant={'h5'} fontWeight={'bold'}>
        {messages['job_posting.primary_job_info']}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormRadioButtons
              id='service_type'
              label={'job_posting.service_type'}
              radios={[
                {
                  key: ServiceTypes.BASIC_LISTING,
                  label: messages['job_posting.service_type_basic'],
                },
                {
                  key: ServiceTypes.STAND_OUT_LISTING,
                  label: messages['job_posting.service_type_st_out_listing'],
                },
                {
                  key: ServiceTypes.STAND_OUT_PREMIUM,
                  label: messages['job_posting.service_type_st_out_premium'],
                },
              ]}
              control={control}
              defaultValue={ServiceTypes.BASIC_LISTING}
              isLoading={false}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomTextInput
              required
              id='job_title'
              label={messages['job_posting.job_title']}
              register={register}
              errorInstance={errors}
              isLoading={false}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={5}>
                <CustomTextInput
                  required={!isNotApplicable}
                  id='vacancy'
                  type={'number'}
                  label={messages['job_posting.no_of_vacancy']}
                  register={register}
                  errorInstance={errors}
                  isLoading={false}
                  disabled={isNotApplicable}
                />
              </Grid>
              <Grid item xs={12} md={7} alignItems={'center'} display={'flex'}>
                <CustomCheckbox
                  id='not_applicable'
                  label={messages['job_posting.not_applicable']}
                  register={register}
                  errorInstance={errors}
                  checked={isNotApplicable}
                  onChange={() => {
                    setIsNotApplicable((prev) => !prev);
                  }}
                  isLoading={false}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box display={'flex'} justifyContent={'flex-end'} mt={'15px'}>
          <Button
            disabled={isSubmitting}
            type={'submit'}
            variant={'contained'}
            color={'primary'}>
            {messages['common.save_and_continue']}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default PrimaryJobInformation;
