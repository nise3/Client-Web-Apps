import React, {useMemo} from 'react';
import {useIntl} from 'react-intl';
import yup from '../../../../@softbd/libs/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {Box, Button, Grid, Typography} from '@mui/material';
import CustomTextInput from '../../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {processServerSideErrors} from '../../../../@softbd/utilities/validationErrorHandler';
import useNotiStack from '../../../../@softbd/hooks/useNotifyStack';

interface Props {
  onBack: () => void;
  onContinue: () => void;
}

const MoreJobInformation = ({onBack, onContinue}: Props) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();

  const validationSchema = useMemo(() => {
    return yup.object().shape({});
  }, [messages]);
  const {
    register,
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
    <Box mt={3} mb={3}>
      <Typography mb={2} variant={'h5'} fontWeight={'bold'}>
        {messages['job_posting.more_job_info']}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <CustomTextInput
              id='last_name_en'
              label={messages['common.last_name_en']}
              register={register}
              errorInstance={errors}
              isLoading={false}
            />
          </Grid>
        </Grid>
        <Box display={'flex'} justifyContent={'space-between'} mt={'15px'}>
          <Button onClick={onBack} variant={'outlined'} color={'primary'}>
            {messages['common.previous']}
          </Button>
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

export default MoreJobInformation;
