import React from 'react';
import {useIntl} from 'react-intl';
import useStyles from './index.style';
import {useForm} from 'react-hook-form';
import {Button, Container, Paper, Typography} from '@mui/material';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';

const ChoosePayment = () => {
  const {messages} = useIntl();
  const classes = useStyles();

  const {
    register,
    formState: {errors},
  } = useForm<any>();
  return (
    <Container maxWidth={'sm'} className={classes.rootContainer}>
      <Paper style={{padding: '20px'}} className={classes.paperBox}>
        <Typography variant={'h6'} style={{fontWeight: 'bold'}} mb={5}>
          {messages['common.enter_bkash_number']}
        </Typography>
        <form>
          <CustomTextInput
            id='phone_number'
            label={messages['common.phone_number']}
            register={register}
            errorInstance={errors}
          />
          <Button variant='contained' className={classes.btn}>
            {messages['common.next']}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default ChoosePayment;
