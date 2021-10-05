import React from 'react';
import {Button, Container, Paper, Typography} from '@mui/material';
import {useIntl} from 'react-intl';
import useStyles from '../youth-verify-account-select/VerifyAccountSelect.style';
import {useForm} from 'react-hook-form';
import CustomTextInput from '../../@softbd/elements/input/CustomTextInput/CustomTextInput';

const YouthVerifyAccountMethod = () => {
  const {messages} = useIntl();
  const classes = useStyles();
  const text = messages['common.verify_text'];
  const titleText = messages['common.verify_account'];
  const send = messages['common.send'];
  const {
    register,
    formState: {errors},
  } = useForm<any>();
  return (
    <Container maxWidth={'sm'} style={{marginTop: '50px'}}>
      <Paper style={{padding: '40px'}}>
        <Typography variant={'h6'} style={{fontWeight: 'bold'}}>
          {titleText}
        </Typography>
        <Typography className={classes.text}>{text}</Typography>

        <form>
          <CustomTextInput
            id='phone_number'
            label={messages['common.phone_number']}
            register={register}
            errorInstance={errors}
          />
          <Button variant='contained' className={classes.btn}>
            {send}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default YouthVerifyAccountMethod;
