import React from 'react';
import {Button, Container, Paper, Typography} from '@mui/material';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import {useForm} from 'react-hook-form';
import useStyles from './VerifyAccountSelect.style';
import {useIntl} from 'react-intl';

const YouthVerifyAccountSelect = () => {
  const {messages} = useIntl();
  const classes = useStyles();
  const text = messages['common.verify_text'];
  const titleText = messages['common.verify_account'];
  const next = messages['common.next'];
  const isLoading = false;
  const {
    control,
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
          <CustomFormSelect
            id='verify_method'
            isLoading={isLoading}
            label={messages['common.verify_method']}
            control={control}
            options={[]}
            optionValueProp={''}
            errorInstance={errors}
          />
          <Button variant='contained' className={classes.btn}>
            {next}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default YouthVerifyAccountSelect;
