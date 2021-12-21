import React, {useMemo} from 'react';
import {Box, Button, Grid, Typography} from '@mui/material';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import yup from '../../../../@softbd/libs/yup';
import {useIntl} from 'react-intl';
import CustomTextInput from '../../../../@softbd/elements/input/CustomTextInput/CustomTextInput';

interface Props {
  onContinue: () => void;
}

const PrimaryJobInformation = ({onContinue}: Props) => {
  const {messages} = useIntl();

  const validationSchema = useMemo(() => {
    return yup.object().shape({});
  }, [messages]);
  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<any> = async (data: any) => {};
  return (
    <Box>
      <Typography>Primary Job Information</Typography>

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
        <Box display={'flex'} justifyContent={'flex-end'} mt={'15px'}>
          <Button
            sx={{marginLeft: 3}}
            disabled={isSubmitting}
            type={'submit'}
            variant={'contained'}
            onClick={onContinue}
            color={'primary'}>
            {messages['common.next']}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default PrimaryJobInformation;
